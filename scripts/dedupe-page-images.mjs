// Makes sure no photo appears twice on the same page. The first use of an image on a page is kept;
// any later repeat (usually a card in a grid) is swapped for a photo of that card's own place if we
// have one, otherwise for one of Surfbooker's own general surf photos not yet used on the page.
// Run after all page builders:  node scripts/dedupe-page-images.mjs [--dry]
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, posix } from "node:path";

const root = process.cwd();
const dry = process.argv.includes("--dry");
const SKIP = new Set(["node_modules", ".git", "img", "scripts", "data", "docs", "image-credits"]);

import { GENERIC, placeImages, slugFromHref } from "./lib/place-images.mjs";

const enc = (p) => "/" + p.split("/").map(encodeURIComponent).join("/").replace(/%21/g, "!");
const norm = (url, pageDir) => {
  let u = url.replace(/&amp;/g, "&").split(/[?#]/)[0];
  if (/^(https?:|data:)/.test(u)) return url;
  try { u = decodeURIComponent(u); } catch {}
  if (!u.startsWith("/")) u = posix.join("/", pageDir, u);
  return u.replace(/^\//, "");
};

const IMG_RE = /<img\b[^>]*?\bsrc="([^"]+)"[^>]*>|url\((['"]?)([^'")]+\.(?:jpe?g|png|webp|avif|JPE?G))\2\)/g;

function processPage(file) {
  const rel = file.slice(root.length + 1).replace(/\\/g, "/");
  // Business pages and the hand-built Westward Ho! guide use photos of specific businesses: never auto-swap those.
  if (/^(food-drink\/|surf-hire\/providers\/|surf-schools\/|guides\/westwardho!\/)/.test(rel)) return [];
  const pageDir = posix.dirname(rel);
  let html = readFileSync(file, "utf8");
  // Class-level CSS in <style>/<head> isn't a repeated tile, so only look at the page body markup.
  const skipRanges = [...html.matchAll(/<head[\s\S]*?<\/head>|<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>/g)].map((m) => [m.index, m.index + m[0].length]);
  const hits = [];
  for (const m of html.matchAll(IMG_RE)) {
    if (skipRanges.some(([a, b]) => m.index >= a && m.index < b)) continue;
    const raw = m[1] || m[3];
    if (!raw || /logo|favicon|icon|\.svg/i.test(raw)) continue;
    hits.push({ index: m.index, text: m[0], raw, key: norm(raw, pageDir), isImg: Boolean(m[1]) });
  }
  const used = new Set(hits.map((h) => h.key));
  for (const h of hits) {
    // Find the card this image belongs to and the place it links to.
    const start = Math.max(html.lastIndexOf("<a ", h.index), html.lastIndexOf("<article", h.index), html.lastIndexOf("<li", h.index), h.index - 600);
    const href = (html.slice(start, h.index + 900).match(/href="([^"]+)"/) || [])[1];
    h.slug = slugFromHref(href);
  }
  // For each repeated photo, keep it on the card it actually shows (or the first use), swap the rest.
  const keep = new Map();
  for (const h of hits) {
    if (!keep.has(h.key)) keep.set(h.key, h);
    else if (placeImages(h.slug).includes(h.key) && !placeImages(keep.get(h.key).slug).includes(h.key) && keep.get(h.key) !== hits[0]) keep.set(h.key, h);
  }
  const changes = [];
  for (const h of hits) {
    if (keep.get(h.key) === h || hits.filter((x) => x.key === h.key).length < 2) continue;
    const slug = h.slug;
    const pick = [...placeImages(slug), ...GENERIC].find((p) => !used.has(p));
    if (!pick) {
      // Out of unused photos: show the Surfbooker logo panel rather than repeat a photo on the page.
      const sectionStart = (i) => html.lastIndexOf("<section", i);
      const sameSectionEarlier = hits.some((o) => o !== h && o.key === h.key && o.index < h.index && sectionStart(o.index) === sectionStart(h.index) && !changes.some((c) => c.index === o.index));
      if (h.isImg) {
        const alt = (h.text.match(/\balt="([^"]*)"/) || [, ""])[1];
        changes.push({ index: h.index, from: h.text, to: `<img class="image-fallback-logo" src="/images/brand/logo-transparent-fbs.png" alt="${alt}" loading="lazy">`, was: h.key, now: "logo panel", slug });
      }
      continue;
    }
    used.add(pick);
    let replacement = h.text.replace(h.raw, enc(pick));
    if (h.isImg) replacement = replacement.replace(/\s(srcset|sizes)="[^"]*"/g, "");
    changes.push({ index: h.index, from: h.text, to: replacement, was: h.key, now: pick, slug });
  }
  if (!changes.length) return [];
  for (const c of changes.sort((a, b) => b.index - a.index)) {
    html = html.slice(0, c.index) + c.to + html.slice(c.index + c.from.length);
    // A <picture> wrapping a swapped <img> must not keep serving the old photo via <source srcset>.
    if (c.from.startsWith("<img")) {
      const before = html.slice(0, c.index);
      const pic = before.lastIndexOf("<picture");
      if (pic !== -1 && before.lastIndexOf("</picture>") < pic) {
        const cleaned = html.slice(pic, c.index).replace(/<source\b[^>]*>/g, "");
        html = html.slice(0, pic) + cleaned + html.slice(c.index);
      }
    }
  }
  if (!dry) writeFileSync(file, html);
  return changes.map((c) => ({ page: rel, ...c }));
}

const files = [];
(function walk(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) { if (!SKIP.has(n) && !n.startsWith(".")) walk(p); }
    else if (n.endsWith(".html")) files.push(p);
  }
})(root);

const all = files.flatMap(processPage);
const pages = new Set(all.map((c) => c.page));
console.log(`${dry ? "[dry] " : ""}Repeated images replaced: ${all.length} on ${pages.size} pages.`);
if (process.argv.includes("--list")) for (const c of all) console.log(`${c.page}: ${c.was} -> ${c.now} (${c.slug || "generic"})`);

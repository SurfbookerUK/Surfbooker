// Builds /image-credits/ from data/image-registry.json, listing every licensed third-party photo
// that a published page actually uses (directly or via a /img/ derivative), plus a note on
// Surfbooker's own photography. Run after all page builders.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registry = JSON.parse(fs.readFileSync(path.join(root, "data/image-registry.json"), "utf8")).images;
const derivatives = JSON.parse(fs.readFileSync(path.join(root, "data/image-derivatives.json"), "utf8"));
const esc = (v) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const SKIP = new Set(["node_modules", ".git", "img", "scripts", "data", "docs", "image-credits"]);
let corpus = "";
(function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) { if (!SKIP.has(name) && !name.startsWith(".")) walk(p); }
    else if (/\.(html|css|js)$/.test(name)) corpus += fs.readFileSync(p, "utf8");
  }
})(root);
try { corpus = decodeURIComponent(corpus.replace(/%(?![0-9A-Fa-f]{2})/g, "%25")); } catch { /* keep raw */ }

const isUsed = (rel) => corpus.includes(rel) || (derivatives[rel]?.files || []).some((f) => corpus.includes(f.file));
const commons = Object.entries(registry)
  .filter(([rel, r]) => r.status === "cleared" && r.sourceType === "wikimedia-commons" && isUsed(rel))
  .map(([rel, r]) => ({ rel, ...r }))
  .sort((a, b) => String(a.place || a.rel).localeCompare(String(b.place || b.rel)));
const ownCount = Object.entries(registry).filter(([rel, r]) => (r.sourceType === "own-photo" || r.sourceType === "assumed-own-photo") && isUsed(rel)).length;

const cards = commons.map((i) => `<article class="credit"><h2>${esc(i.place || path.basename(i.rel))}</h2><p>Photo by <strong>${esc(i.creator)}</strong>, licensed under <a href="${esc(i.licenceUrl)}" target="_blank" rel="noopener">${esc(i.licence)}</a>. <a href="${esc(i.sourceUrl)}" target="_blank" rel="noopener">Original on Wikimedia Commons</a>.</p><p><small>Resized, cropped and converted to WebP for the web.</small></p></article>`).join("\n");

const footer = `<footer class="sb-site-footer"><nav class="sb-footer-group" aria-label="Visitor links"><a href="/explore.html">Explore</a><a href="/surf-lessons/">Surf Lessons</a><a href="/surf-hire/">Surf Hire</a><a href="/guides/">Beach Guides</a><a href="/accommodation/">Accommodation</a><a href="/contact/">Contact</a></nav><nav class="sb-footer-group sb-footer-business" aria-label="Business links"><a href="/list-your-school/">List or upgrade your surf school</a><a href="/list-your-accommodation/">List your accommodation</a></nav><nav class="sb-footer-group" aria-label="Legal links"><a href="/privacy/">Privacy Policy</a><a href="/terms/">Terms &amp; Conditions</a><a href="/image-credits/">Image credits</a></nav><p class="sb-footer-meta">&copy; 2026 Surfbooker. All rights reserved. <a href="mailto:hello@surfbooker.com">hello@surfbooker.com</a></p></footer>`;

const html = `<!doctype html><html lang="en-GB"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Image Credits | Surfbooker</title><meta name="description" content="Photo credits and licences for the images used across Surfbooker's surf and beach guides."><meta name="robots" content="index,follow"><link rel="canonical" href="https://surfbooker.com/image-credits/"><link rel="icon" href="/favicon-48x48.png"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/utility-page.css"><link rel="stylesheet" href="/site-navigation.css"><style>main{width:min(960px,92%);margin:55px auto 80px}.credits{display:grid;gap:12px}.credit{background:#fff;border:1px solid #d8ddda;border-radius:16px;padding:18px}.credit h2{margin:0 0 8px;font-size:21px}.credit p{margin:5px 0;line-height:1.55}.credit a{text-decoration:underline}.intro{max-width:760px;line-height:1.7}</style></head><body><header class="site-header"><a class="brand" href="/" aria-label="Surfbooker home"><img class="brand-wordmark-image" src="/images/brand/logo-no-words-transparent.png" alt="Surfbooker"></a></header><main><p class="eyebrow">Licensing</p><h1>Image credits</h1>
<p class="intro">Most photographs on Surfbooker are our own. Where we don't yet have our own photo of a place, we use openly licensed photographs of that exact place from Wikimedia Commons, credited below and on the page where each appears. We never use a photo of one beach to illustrate another, and we don't use businesses' photos without their permission.</p>
<p class="intro"><strong>${commons.length} licensed photos</strong> from Wikimedia Commons are in use, alongside ${ownCount} Surfbooker photos. If you're a photographer and would like a credit changed, or a business with photos you'd like us to use, email <a href="mailto:hello@surfbooker.com">hello@surfbooker.com</a>.</p>
<div class="credits">${cards}</div></main>${footer}</body></html>`;
fs.writeFileSync(path.join(root, "image-credits", "index.html"), html);
console.log(`Image credits: ${commons.length} Commons photos, ${ownCount} Surfbooker photos.`);

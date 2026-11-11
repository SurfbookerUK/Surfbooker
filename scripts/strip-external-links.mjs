// Removes every link to another website from the built pages, site wide.
// Link text stays on the page; call-to-action links ("Visit website", "Official site") are removed entirely.
// Kept: surfbooker.com / surfbooker.co.uk, mailto:, tel:, and the licence and Wikimedia Commons credits on
// /image-credits/ (the Creative Commons licences require that attribution link).
// Safe to run repeatedly.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const SKIP_DIRS = new Set([".git", ".vscode", ".openai", "node_modules", "scripts", "data", "docs", "dist", "outputs", "netlify"]);
const KEEP_PAGES = new Set(["image-credits/index.html"]);
const OWN = /(^|\.)surfbooker\.(com|co\.uk)$/i;
const CTA = /(^|\s)(visit|view|see|check|book|open|go to|official|website|web site|on google maps|google maps|directions|get directions|find out more|read more|more info)(\s|$)|website|official site/i;
const ANCHOR = /<a\b([^>]*?)\shref=(["'])(https?:\/\/[^"']+|\/\/[^"']+)\2([^>]*)>([\s\S]*?)<\/a>/gi;

const files = [];
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(join(dir, e.name)); }
    else if (e.name.endsWith(".html")) files.push(join(dir, e.name));
  }
})(root);

let pages = 0, unwrapped = 0, removed = 0;
const domains = new Map();
for (const f of files) {
  const rel = relative(root, f).split("\\").join("/");
  if (KEEP_PAGES.has(rel) || rel === "404.html") continue;
  const html = readFileSync(f, "utf8");
  let changed = false;
  const out = html.replace(ANCHOR, (m, pre, q, href, post, inner) => {
    let host;
    try { host = new URL(href.startsWith("//") ? "https:" + href : href).hostname; } catch { return m; }
    if (OWN.test(host)) return m;
    changed = true;
    domains.set(host, (domains.get(host) || 0) + 1);
    const text = inner.replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
    if (!text || CTA.test(text)) { removed++; return ""; }
    unwrapped++;
    return inner;
  });
  if (changed && out !== html) { writeFileSync(f, out); pages++; }
}
const top = [...domains].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([d, n]) => `${d} (${n})`).join(", ");
console.log(`External links: ${unwrapped} unwrapped to plain text, ${removed} removed, across ${pages} pages.${top ? " Top: " + top : ""}`);

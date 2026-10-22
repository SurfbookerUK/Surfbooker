// Rewrites internal links that point at the mixed-case folders (/guides/Croyde/) to the
// canonical URLs (/guides/surfing-croyde-bay/) that _redirects serves. Safe to re-run.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const MAP = {
  Bantham: "surfing-bantham", "Bigbury-on-sea": "surfing-bigbury-on-sea", Challaborough: "surfing-challaborough",
  Croyde: "surfing-croyde-bay", Lynmouth: "surfing-lynmouth", Putsborough: "surfing-putsborough",
  Saunton: "surfing-saunton-sands", Woolacombe: "surfing-woolacombe",
};
const re = new RegExp(`(href=")((?:https://surfbooker\\.com)?)/guides/(${Object.keys(MAP).join("|")})/`, "g");
const skip = new Set(["node_modules", ".git", "images", "img", "data", "scripts", "netlify"]);
let files = 0, links = 0;
function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!skip.has(e.name)) walk(join(dir, e.name)); continue; }
    if (!e.name.endsWith(".html")) continue;
    const f = join(dir, e.name), h = readFileSync(f, "utf8");
    let c = 0;
    const out = h.replace(re, (_, a, b, k) => { c++; return `${a}${b}/guides/${MAP[k]}/`; });
    if (c) { writeFileSync(f, out); files++; links += c; }
  }
}
walk(process.cwd());
console.log(`Canonical guide links: ${links} rewritten in ${files} pages`);

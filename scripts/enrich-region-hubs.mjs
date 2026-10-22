// Adds a "compare the beaches" table to region index pages for lessons, hire, shops and
// accommodation (e.g. /surf-lessons/cornwall/), linking each beach's page in that section. Idempotent.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadDestinations } from "./build-destination-guides.mjs";
import { esc, md } from "./lib/guide-kit.mjs";
const root = process.cwd();
const ds = await loadDestinations();
const listings = JSON.parse(readFileSync(join(root, "data/location-listings.json"), "utf8"));
const REGIONS = { cornwall: ["cornwall"], devon: ["north-devon", "south-devon"], "north-devon": ["north-devon"], "south-devon": ["south-devon"], wales: ["wales"], scotland: ["scotland"], "northern-ireland": ["northern-ireland"], "northeast-england-yorkshire": ["northeast-england-yorkshire"], "southern-england": ["southern-england"] };
const SECTIONS = { "surf-lessons": ["Lessons", "surf lessons"], "surf-hire": ["Hire", "board and wetsuit hire"], "surf-shops": ["Shops", "surf shops"], accommodation: ["Stay", "accommodation"] };
const inline = (t) => md(t).replace(/<\/?p>/g, "");
const pageCache = new Map();
const read = (p) => { if (!pageCache.has(p)) pageCache.set(p, existsSync(join(root, p, "index.html")) ? readFileSync(join(root, p, "index.html"), "utf8") : ""); return pageCache.get(p); };
function sectionPage(sec, d) {
  if (sec === "accommodation") { const a = d.surfbooker?.accommodation; return a && existsSync(join(root, "accommodation", a, "index.html")) ? `/accommodation/${a}/` : null; }
  return Object.keys(listings).filter((p) => p.startsWith(`/${sec}/`) && read(p).includes(`href="${d.path}"`)).sort((a, b) => a.length - b.length)[0] || null;
}
let n = 0;
for (const [sec, [label, words]] of Object.entries(SECTIONS)) for (const [region, regs] of Object.entries(REGIONS)) {
  const file = join(root, sec, region, "index.html");
  if (!existsSync(file)) continue;
  let html = readFileSync(file, "utf8").replace(/<!--sb-hubtable-->[\s\S]*?<!--\/sb-hubtable-->\n?/, "");
  const rows = ds.filter((d) => regs.includes(d.region)).map((d) => ({ d, page: sectionPage(sec, d) }));
  if (rows.length >= 2) {
    const g = (d, re) => (d.glance?.find(([k]) => re.test(k)) || [])[1] || "—";
    const block = `<!--sb-hubtable--><section class="sb-hub-table" style="max-width:1180px;margin:40px auto;padding:0 20px" aria-labelledby="sb-hubtable-title">
<p class="section-label">Compare beaches</p><h2 id="sb-hubtable-title">Which beach suits your trip?</h2>
<p>Every beach we cover in this region, with who it suits and its lifeguard cover. Open a beach for ${esc(words)} there, or read its full guide. Conditions change daily, so check the forecast before you go.</p>
<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;min-width:640px;font-size:14.5px;background:#fff">
<thead><tr style="background:#0f2a33;color:#fff;text-align:left"><th style="padding:10px 12px">Beach</th><th style="padding:10px 12px">Best for</th><th style="padding:10px 12px">Lifeguards</th><th style="padding:10px 12px">${esc(label)}</th><th style="padding:10px 12px">Guide</th></tr></thead>
<tbody>${rows.map(({ d, page }) => `<tr style="border-bottom:1px solid #e3e6e4"><th scope="row" style="padding:10px 12px;text-align:left">${esc(d.name)}</th><td style="padding:10px 12px">${inline(g(d, /best for/i))}</td><td style="padding:10px 12px">${inline(g(d, /lifeguard/i))}</td><td style="padding:10px 12px">${page ? `<a href="${page}">${esc(label)} at ${esc(d.name)}</a>` : "—"}</td><td style="padding:10px 12px"><a href="${d.path}">Guide</a></td></tr>`).join("")}</tbody></table></div>
</section><!--/sb-hubtable-->\n`;
    const at = html.lastIndexOf("</main>");
    html = at > -1 ? html.slice(0, at) + block + html.slice(at) : html.replace(/<footer\b/, block + "<footer");
    n++;
  }
  writeFileSync(file, html);
}
console.log(`Region hubs enriched: ${n}`);

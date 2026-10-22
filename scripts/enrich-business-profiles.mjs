// Adds a researched "About" section to surf school and hire provider profiles from
// data/business-research/<kind>__<slug>.json (facts from each business's own website). Idempotent.
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const root = process.cwd();
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const dirFor = { "surf-schools": "surf-schools", "surf-hire": "surf-hire/providers" };
let n = 0;
for (const f of readdirSync(join(root, "data/business-research"))) {
  const r = JSON.parse(readFileSync(join(root, "data/business-research", f), "utf8"));
  const [kind, slug] = f.replace(/\.json$/, "").split("__");
  const file = join(root, dirFor[kind] || kind, slug, "index.html");
  if (!existsSync(file)) continue;
  let html = readFileSync(file, "utf8").replace(/<!--sb-about-->[\s\S]*?<!--\/sb-about-->\n?/, "");
  if (r.trading !== false && r.about) {
    const items = (a) => (a || []).filter(Boolean);
    const block = `<!--sb-about--><section class="sb-about-business" aria-labelledby="sb-about-title" style="max-width:1100px;margin:40px auto;padding:0 20px">
<p class="section-label">About the business</p><h2 id="sb-about-title">${kind === "surf-hire" ? "About this hire provider" : "About this surf school"}</h2>
<p>${esc(r.about)}</p>
${r.where ? `<p><strong>Where:</strong> ${esc(r.where)}</p>` : ""}
${items(r.offers).length ? `<h3>${kind === "surf-hire" ? "What you can hire" : "Lessons offered"}</h3><ul>${items(r.offers).map((o) => `<li>${esc(o)}</li>`).join("")}</ul>` : ""}
${items(r.goodToKnow).length ? `<h3>Good to know</h3><ul>${items(r.goodToKnow).map((o) => `<li>${esc(o)}</li>`).join("")}</ul>` : ""}
${r.season ? `<p><strong>Season:</strong> ${esc(r.season)}</p>` : ""}
<p style="font-size:.9em;opacity:.8">Researched from ${r.trading === true ? "the business's own website" : "public listings"} in October 2026 (${items(r.sources).map((s) => esc(s.label)).join("; ")}). Surfbooker hasn't reviewed this business in person; check times, ages, prices and what's included directly. <a href="/how-we-list-businesses/">How we list businesses</a>.</p>
</section><!--/sb-about-->\n`;
    const at = html.lastIndexOf("</main>");
    html = at > -1 ? html.slice(0, at) + block + html.slice(at) : html.replace(/<footer\b/, block + "<footer");
    n++;
  }
  writeFileSync(file, html);
}
console.log(`Business profiles enriched: ${n}`);

// Adds beach-specific planning content to each accommodation area page (/accommodation/<area>/):
// where to stay (from the destination guide's research), the beach at a glance, and links to the
// guide, lessons, hire and shops for that beach. Idempotent: replaces its own block on each run.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadDestinations } from "./build-destination-guides.mjs";
import { placeKey } from "./lib/site-places.mjs";
import { accommodationAreas } from "./build-accommodation.mjs";
import { esc, md } from "./lib/guide-kit.mjs";

const root = process.cwd();
const ds = await loadDestinations();
const byKey = new Map();
for (const d of ds) { byKey.set(placeKey(d.slug), d); if (d.fullName) byKey.set(placeKey(d.fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-")), d); }
const listings = JSON.parse(readFileSync(join(root, "data/location-listings.json"), "utf8"));
const pageFor = (sec, d) => Object.keys(listings).filter((p) => p.startsWith(`/${sec}/`) && readFileSync(join(root, p, "index.html"), "utf8").includes(`href="${d.path}"`)).sort((a, b) => a.length - b.length)[0];
const ALIAS = { newquay: "fistral-beach", "st-ives": "porthmeor-beach", gwithian: "gwithian-godrevy", hayle: "hayle-towans", sennen: "sennen-cove", bude: "summerleaze-beach", "st-agnes": "trevaunance-cove", braunton: "saunton-sands", mortehoe: "woolacombe", croyde: "croyde-bay", saunton: "saunton-sands" };
const plain = (t) => md(t).replace(/<\/?p>/g, "");
let n = 0;
for (const area of accommodationAreas) {
  const file = join(root, "accommodation", area.slug, "index.html");
  if (!existsSync(file)) continue;
  const d = ds.find((x) => x.slug === ALIAS[area.slug]) || byKey.get(placeKey(area.slug));
  let html = readFileSync(file, "utf8").replace(/<!--sb-area-->[\s\S]*?<!--\/sb-area-->/, "");
  if (!d) { writeFileSync(file, html); continue; }
  const stayAreas = d.stay?.areas || [];
  const stayText = d.stay?.text || [];
  const glance = (d.glance || []).slice(0, 6);
  const links = [
    ["Beach guide", d.path, `Surf, tides, parking, facilities and dog rules at ${d.name}.`],
    ...[["surf-lessons", "Surf lessons", "Schools and what learning here is like."], ["surf-hire", "Board & wetsuit hire", "Where to hire kit and what suits the conditions."], ["surf-shops", "Surf shops", "Where to buy or repair kit nearby."]]
      .map(([sec, t, c]) => { const p = pageFor(sec, d); return p ? [t, p, c] : null; }).filter(Boolean)
  ];
  const nearby = (d.nearby || []).slice(0, 4);
  const block = `<!--sb-area-->
<section class="accommodation-section"><div class="accommodation-section-heading"><p class="section-label">Choosing where to stay</p><h2>Where to base yourself for ${esc(d.name)}.</h2></div>
${stayText.map((t) => `<p>${plain(t)}</p>`).join("")}
${stayAreas.length ? `<div class="destination-decision-grid">${stayAreas.map((a) => `<article>${a.label ? `<p class="section-label">${esc(a.label)}</p>` : ""}<h3>${esc(a.title)}</h3><p>${plain([].concat(a.text).join(" "))}</p></article>`).join("")}</div>` : ""}
${!stayText.length && !stayAreas.length ? `<p>${plain(d.overview?.[0] || d.heroIntro || "")}</p>` : ""}
</section>
${glance.length ? `<section class="accommodation-section"><div class="accommodation-section-heading"><p class="section-label">The beach</p><h2>${esc(d.name)} at a glance.</h2></div><div class="destination-decision-grid">${glance.map(([k, v]) => `<article><h3>${esc(k)}</h3><p>${plain(v)}</p></article>`).join("")}</div>${(d.suits || []).length ? `<p><strong>Good for:</strong> ${d.suits.map(plain).join("; ")}.</p>` : ""}</section>` : ""}
${html.includes('class="plan-card-grid"') && !nearby.length ? "" : `<section class="accommodation-section"><div class="accommodation-section-heading"><p class="section-label">Plan the rest of the trip</p><h2>Nearby beaches to ${esc(d.name)}.</h2></div>
${html.includes('class="plan-card-grid"') ? "" : `<div class="plan-card-grid">${links.map(([t, h, c]) => `<a class="plan-card" href="${h}"><span class="plan-card-arrow" aria-hidden="true">↗</span><h3>${esc(t)}</h3><p>${esc(c)}</p></a>`).join("")}</div>`}
${nearby.length ? `<p><strong>Nearby beaches:</strong> ${nearby.map((x) => `<a href="${x.href}">${esc(x.name)}</a>${x.distance ? ` (${esc(x.distance.toLowerCase())})` : ""}`).join(", ")}.</p>` : ""}
</section>`}
<!--/sb-area-->`;
  const anchor = html.indexOf('<section class="accommodation-cta"');
  html = anchor > -1 ? html.slice(0, anchor) + block + "\n" + html.slice(anchor) : html.replace("</main>", block + "\n</main>");
  writeFileSync(file, html); n++;
}
console.log(`Accommodation area pages enriched: ${n}`);

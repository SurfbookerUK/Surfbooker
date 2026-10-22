import fs from "node:fs";
import path from "node:path";
import { cornwallSchools } from "../data/cornwall-expansion.mjs";

const root = process.cwd();

const groups = {
  bude: ["widemouth-bay", "summerleaze-beach"],
  newquay: ["fistral-beach", "great-western-beach", "towan-beach-newquay", "watergate-bay", "mawgan-porth", "crantock-beach", "holywell-bay"],
  padstow: ["polzeath", "harlyn-bay", "constantine-bay"],
  "st-agnes": ["perranporth", "porthtowan", "trevaunance-cove"],
  "st-ives": ["gwithian-godrevy", "hayle-towans", "porthmeor-beach"],
  west: ["sennen-cove", "praa-sands"],
  gowerWest: ["llangennith", "rhossili-bay"],
  gowerSwansea: ["caswell-bay", "langland-bay"],
  gowerSouth: ["oxwich-bay", "port-eynon"],
  pembsNorth: ["newgale", "whitesands", "broad-haven", "nolton-haven"],
  pembsSouth: ["freshwater-west", "freshwater-east", "manorbier", "marloes-sands"],
  northWales: ["rhosneigr", "hells-mouth-porth-neigwl"],
  porthcawl: ["rest-bay-porthcawl"]
};

const profiles = {
  bude: { base: "Bude", stay: "Bude is the useful all-round base: supermarkets, year-round food and several beaches are close enough to change plans after a morning beach check.", food: "Use Bude town for dependable breakfast and evening choices; beach cafés are convenient but more seasonal.", fallback: "Compare Summerleaze and Widemouth, then keep the canal, coast path and Bude town as the land-based plan." },
  newquay: { base: "Newquay", stay: "Newquay gives the widest choice of accommodation, food, surf shops and public transport. Confirm parking and board storage rather than paying solely for a sea view.", food: "Central Newquay has the most resilient year-round food choice; outlets directly above the beaches can be seasonal or close early.", fallback: "The town's multiple beaches have different shelter. Let a qualified provider choose between them, and use the aquarium, coast path or town when none is suitable." },
  padstow: { base: "Polzeath or Padstow", stay: "Polzeath minimises the equipment carry; Padstow offers a broader evening choice. Drivers should account for narrow roads and peak-season queues.", food: "Polzeath works for a quick post-surf meal, while Padstow has the larger restaurant choice. Book popular dinner venues well ahead.", fallback: "Harlyn can offer shelter when exposed beaches are too large; Constantine is for capable surfers. The Camel Trail and Padstow are reliable flat-day options." },
  "st-agnes": { base: "St Agnes or Perranporth", stay: "St Agnes is atmospheric and central to several coves; Perranporth is easier for a family wanting a broad beach and more immediate visitor facilities.", food: "Village pubs and cafés are a better year-round bet than relying on a single beachfront outlet. Check Sunday and winter opening.", fallback: "Compare Perranporth, Porthtowan and Trevaunance rather than assuming nearby beaches share the same wind and tide window." },
  "st-ives": { base: "St Ives, Hayle or Gwithian", stay: "St Ives suits car-light trips and evenings out; Hayle is practical for driving; Gwithian puts surf access first but has fewer services.", food: "St Ives has the deepest choice, while Hayle is easier for supplies and casual food. Reserve parking and restaurants during school holidays.", fallback: "Porthmeor is convenient, while the Towans offer more space and exposure. Use St Ives galleries, the coast path or Hayle estuary when flat." },
  west: { base: "Sennen or Penzance", stay: "Sennen is best for repeated dawn checks; Penzance gives stronger transport, shopping and wet-weather options for mixed groups.", food: "Sennen's beach and cove choices are convenient in season; Penzance and nearby villages are more dependable for evening meals.", fallback: "Compare Sennen with Praa Sands according to swell and wind. Land's End, the Minack area and west Cornwall's coast path suit a no-surf day." },
  gowerWest: { base: "Llangennith or Rhossili", stay: "Llangennith is the surf-logistics choice; Rhossili prioritises views and walking. Both are rural, so book food and accommodation instead of relying on late availability.", food: "Village pubs and cafés have limited, seasonal hours. Carry water and food to the beach and reserve dinner during busy periods.", fallback: "Caswell is easier for a coached family session; Oxwich and Port Eynon are more sheltered but often flat. Rhossili Down is the standout walk." },
  gowerSwansea: { base: "Mumbles", stay: "Mumbles is the most practical base for food, shops and access to several south Gower bays. A beachside stay only wins if parking and equipment storage are confirmed.", food: "Mumbles has the strongest all-day choice; check the individual bay café before depending on an early breakfast or late meal.", fallback: "Compare Caswell and Langland, then use Llangennith when more exposure is needed. Mumbles promenade and Oystermouth Castle work on a flat day." },
  gowerSouth: { base: "Oxwich, Port Eynon or Mumbles", stay: "Stay locally for a quiet family beach trip, or use Mumbles for a larger choice of food and rainy-day options. A car is normally the practical choice.", food: "Local service is concentrated in villages and changes seasonally. Plan evening food before driving onto the peninsula.", fallback: "These bays are sheltered and frequently flat; Llangennith is the principal exposed alternative. Coastal walks remain worthwhile in calm weather." },
  pembsNorth: { base: "St Davids, Newgale or Broad Haven", stay: "St Davids gives the best compact-town base; Newgale and Broad Haven reduce the morning drive. Confirm drying space and a realistic route to the sand.", food: "St Davids and Haverfordwest offer the broadest choice. Village and beach outlets may be seasonal, so check before a late return from the water.", fallback: "Compare Newgale, Whitesands and Broad Haven for different shelter. St Davids, the coast path and local heritage sites fill a flat day." },
  pembsSouth: { base: "Pembroke, Tenby or the relevant coastal village", stay: "A town base gives supplies and wet-weather options; a rural stay is quieter but makes a car and advance meal planning important.", food: "Use Pembroke or Tenby for the broadest dependable choice and treat remote beach facilities as a bonus rather than a guarantee.", fallback: "Freshwater East is the sheltered possibility; Freshwater West is powerful and exposed. Castles and the Pembrokeshire Coast Path support a non-surf itinerary." },
  northWales: { base: "Rhosneigr or Abersoch", stay: "Rhosneigr is the practical Anglesey watersports base. Abersoch is useful for Hell's Mouth, while Pwllheli has broader everyday services.", food: "Village opening hours change sharply outside the main season. Check dinner and breakfast plans before travelling around the peninsula.", fallback: "Rhosneigr and Hell's Mouth respond to different exposure. Do not chase a marginal forecast across the region without checking wind, tide and daylight." },
  porthcawl: { base: "Porthcawl", stay: "Porthcawl combines an established surf beach with town accommodation, supplies and food, making it one of the easiest South Wales trips to organise.", food: "The town gives more reliable choice than depending on beach facilities alone. Check seasonal seafront hours before an early or late session.", fallback: "Compare nearby bays only with local advice; use the coast path, harbour and town attractions when Rest Bay is unsuitable." }
};

const schoolAliases = {
  "fistral-beach": "fistral", "towan-beach-newquay": "towan-newquay", "great-western-beach": "great-western",
  "summerleaze-beach": "summerleaze", "crantock-beach": "crantock", "porthmeor-beach": "porthmeor"
};

for (const [group, slugs] of Object.entries(groups)) for (const slug of slugs) deepen(slug, profiles[group], group);

function deepen(slug, profile, group) {
  const file = path.join(root, "guides", `surfing-${slug}`, "index.html");
  if (!fs.existsSync(file)) throw new Error(`Missing guide ${slug}`);
  let html = fs.readFileSync(file, "utf8");
  html = html.replaceAll("https://www.cornwall.gov.uk/parks-leisure-and-culture/beaches-in-cornwall/dogs-on-beaches/", "https://www.cornwall.gov.uk/environment/animal-welfare-and-enforcement/dogs-on-beaches/");
  if (html.includes('id="trip-depth"')) { fs.writeFileSync(file, html); return; }
  const name = clean(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || slug);
  const isCornwall = ["bude", "newquay", "padstow", "st-agnes", "st-ives", "west"].includes(group);
  const providers = isCornwall ? providerNames(slug) : [];
  const providerCopy = providers.length
    ? `${providers.join(", ")} ${providers.length === 1 ? "is" : "are"} currently represented in Surfbooker's directory for this beach or its immediate operating area.`
    : `Use Surfbooker's lesson directory and confirm which qualified provider is operating at ${name} on the day; the meeting beach can change with conditions.`;
  const section = `<section class="section alt" id="trip-depth"><div class="shell"><div class="section-head"><p class="eyebrow">Complete trip planning</p><h2>Lessons, stays and local planning for ${esc(name)}</h2></div><div class="info-grid"><div class="info-card"><h3>Lessons and hire</h3><p>${esc(providerCopy)}</p><p>Before paying, confirm the meeting point, minimum age, group size, equipment included, changing arrangements and the cancellation policy. Beachside collection is only available when the provider explicitly says so.</p></div><div class="info-card"><h3>Best area to stay</h3><p><strong>${esc(profile.base)}.</strong> ${esc(profile.stay)}</p><p>Families benefit from parking and laundry; budget travellers should compare hostels, camping and self-catering; couples may prefer a quieter village once evening transport is understood.</p></div><div class="info-card"><h3>Food after surfing</h3><p>${esc(profile.food)}</p><p>Check dietary options, dog policy and outdoor seating directly. Pack a fallback meal on remote-coast days.</p></div><div class="info-card"><h3>Flat or unsafe day</h3><p>${esc(profile.fallback)}</p></div></div><div class="intro-grid"><div class="prose"><h3>A sensible day plan</h3><p>Check the exact beach forecast, tide, access notices and lifeguard listing before departure. Arrive early enough to inspect several sets before hiring or changing. Put the least experienced surfer's needs first, use the designated zone, and keep dry layers secured for afterwards.</p><p>For a weekend, keep the first session flexible and use the second day for the most suitable nearby beach rather than repeating a poor match. Build accommodation and meal bookings around that flexibility.</p></div><aside class="note-card"><h3>What this guide does not promise</h3><p>Named businesses, parking arrangements, patrols and opening hours can change. Follow the source links elsewhere on this page and reconfirm directly.</p><p><a class="btn btn-dark" href="/surf-lessons/">Compare surf lessons</a></p><p><a href="/accommodation/?destination=${encodeURIComponent(slug)}">Browse accommodation</a></p></aside></div></div></section>`;
  const before = html;
  html = html.replace(/<section class="section[^>]*id="sources"/, `${section}<section class="section" id="sources"`);
  if (html === before) html = html.replace(/<\/main>/, `${section}</main>`);
  fs.writeFileSync(file, html);
}

function providerNames(slug) {
  const key = schoolAliases[slug] || slug;
  return [...new Set(cornwallSchools.filter(s => s.locationSlug === key || (s.extraLocationSlugs || []).includes(key)).map(s => s.name))];
}
function clean(v) { return String(v).replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim(); }
function esc(v) { return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"); }

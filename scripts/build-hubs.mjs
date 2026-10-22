// Builds the beach-guide hub pages (/guides/ and every region / sub-region hub) from the same
// destination data as the guides, so hubs never drift out of date and only use licensed images.
// Run after scripts/build-destination-guides.mjs.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { BASE_URL, breadcrumbLd, esc, footer, head, heroBlock, heroPreload, md, picture } from "./lib/guide-kit.mjs";
import { loadDestinations } from "./build-destination-guides.mjs";

const root = process.cwd();
const all = await loadDestinations();
const bySlug = Object.fromEntries(all.map((d) => [d.slug, d]));

// Hand-built pages that sit outside the template but belong in the hubs.
const WESTWARD = {
  slug: "westward-ho", name: "Westward Ho!", path: "/guides/westwardho!/", region: "north-devon",
  heroIntro: "Surfbooker's home beach — two miles of sand, the pebble ridge, Northam Burrows and a choice of surf schools.",
  glance: [["Best for", "Lessons, families, longboards"]],
  images: { hero: "guides/westwardho!/beach-front.jpg" }, heroAlt: "Westward Ho! seafront and beach", reviewed: true
};
const CLEVEDON = {
  slug: "clevedon", name: "Clevedon", path: "/guides/clevedon/",
  heroIntro: "Leave the M5 at junction 20 for the Victorian pier, marine lake, cinema and a far better lunch stop than the services.",
  glance: [["Best for", "A break in the journey"]],
  images: { hero: "images/guides/clevedon/clevedon-pier.webp" }, heroAlt: "Clevedon Pier", reviewed: true
};

const pick = (...slugs) => slugs.map((s) => (s === "westward-ho" ? WESTWARD : bySlug[s])).filter(Boolean);
const bestFor = (d) => d.glance?.find(([k]) => k === "Best for")?.[1] || "";
const heroOf = (d) => d.images?.hero || d.images?.feature?.path || null;

function card(d) {
  const img = heroOf(d);
  const media = img
    ? `<div class="lc-media">${picture(img, { alt: d.heroAlt || d.images?.feature?.alt || d.name, sizes: "(max-width: 600px) 92vw, (max-width: 1100px) 45vw, 360px" })}</div>`
    : `<div class="lc-media lc-media-empty" aria-hidden="true"><span>${esc(d.name)}</span></div>`;
  const level = bestFor(d);
  return `<a class="listing-card hub-card" href="${d.path}">${media}<div class="lc-body">${level ? `<span class="lc-meta">${esc(level)}</span>` : ""}<h3>${esc(d.name)}</h3><p>${md(d.heroIntro || "")}</p><span class="lc-action">${d.reviewed ? "Read our guide" : "Read the guide"}</span></div></a>`;
}

const grid = (items) => `<div class="hub-grid">${items.map(card).join("")}</div>`;

const section = (id, { eyebrow, title, intro, alt }, body) => `
<section class="section${alt ? " alt" : ""}" id="${id}" aria-labelledby="${id}-title">
  <div class="shell">
    <div class="section-head">
      ${eyebrow ? `<p class="dg-eyebrow">${esc(eyebrow)}</p>` : ""}
      <h2 id="${id}-title">${esc(title)}</h2>
      ${intro ? `<p>${md(intro)}</p>` : ""}
    </div>
    ${body}
  </div>
</section>`;

// Side-by-side comparison of every beach in the hub, from each guide's at-a-glance facts,
// with links to its lessons and hire pages where they exist.
function compareTable(items, h1) {
  const rows = items.filter((d) => d.slug && d.glance?.length);
  if (rows.length < 2) return "";
  const g = (d, re) => (d.glance.find(([k]) => re.test(k)) || [])[1] || "—";
  const page = (sec, d) => {
    const slugs = [d.slug, d.slug.replace(/-(beach|bay|sands|cove|strand)$/, "")];
    for (const sl of slugs) for (const pre of [sec, `${sec}/cornwall`, `${sec}/wales`]) if (existsSync(join(root, pre, sl, "index.html"))) return `/${pre}/${sl}/`;
    return null;
  };
  return section("compare", { eyebrow: "Compare", title: "Which beach for which day?", intro: "Quick comparison from each guide's at-a-glance facts. Conditions change daily, so check the forecast and the full guide before you go.", alt: true }, `
<div class="hub-compare" role="region" aria-label="Beach comparison" tabindex="0"><table>
<thead><tr><th scope="col">Beach</th><th scope="col">Best for</th><th scope="col">Break</th><th scope="col">Lifeguards</th><th scope="col">Dogs</th><th scope="col">Plan</th></tr></thead>
<tbody>${rows.map((d) => {
    const l = page("surf-lessons", d), h = page("surf-hire", d);
    return `<tr><th scope="row"><a href="${d.path}">${esc(d.name)}</a></th><td>${md(g(d, /best for/i))}</td><td>${md(g(d, /break|wave/i))}</td><td>${md(g(d, /lifeguard/i))}</td><td>${md(g(d, /dog/i))}</td><td>${[l && `<a href="${l}">Lessons</a>`, h && `<a href="${h}">Hire</a>`].filter(Boolean).join(" · ") || "—"}</td></tr>`;
  }).join("")}</tbody></table></div>
<style>.hub-compare{overflow-x:auto;margin-top:8px}.hub-compare table{width:100%;border-collapse:collapse;min-width:720px;font-size:14.5px;background:#fff;border-radius:14px;overflow:hidden}.hub-compare th,.hub-compare td{text-align:left;padding:12px 14px;border-bottom:1px solid #e3e6e4;vertical-align:top}.hub-compare thead th{background:#0f2a33;color:#fff;font-weight:600;font-size:13px;letter-spacing:.02em}.hub-compare tbody th a{font-weight:600}</style>`);
}

function writeHub({ path, outFile, title, description, h1, eyebrow, intro, crumbs, heroSlug, groups, extraSections = "" }) {
  const heroD = heroSlug === "westward-ho" ? WESTWARD : bySlug[heroSlug];
  const heroImg = heroD ? heroOf(heroD) : null;
  const items = groups.flatMap((g) => g.items);
  const jsonLd = [
    breadcrumbLd(crumbs),
    { "@type": "CollectionPage", "@id": `${BASE_URL}${path}#page`, name: h1, url: `${BASE_URL}${path}`, description },
    { "@type": "ItemList", itemListElement: items.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: d.name, url: `${BASE_URL}${d.path}` })) }
  ];
  const body = groups.map((g, i) => section(g.id || `group-${i + 1}`, { eyebrow: g.eyebrow, title: g.title, intro: g.intro, alt: i % 2 === 1 }, grid(g.items))).join("\n");
  const html = `${head({ title, description, path, image: heroImg, imageAlt: heroD?.heroAlt || h1, jsonLd, preload: heroImg ? heroPreload(heroImg) : "" })}
<body class="destination-guide hub-page">
${heroBlock({ eyebrow, title: h1, intro, crumbs, image: heroImg, imageAlt: heroD?.heroAlt, actions: groups.length > 1 ? groups.slice(0, 4).map((g, i) => [g.short || g.title, `#${g.id || `group-${i + 1}`}`]) : [] })}
<main id="main">
${body}
${compareTable(items, h1)}
${extraSections}
<section class="section alt" aria-labelledby="how-title"><div class="shell"><div class="section-head"><p class="dg-eyebrow">About these guides</p><h2 id="how-title">How we put these guides together</h2></div>
<div class="prose"><p>Each guide is researched from official sources — councils, the RNLI, the National Trust and the businesses themselves — and says when it was last checked. Places Surfbooker has personally reviewed are marked as reviews; everything else is a researched listing. Photos are our own or openly licensed, and credited on every page and on our <a href="/image-credits/">image credits</a> page.</p></div></div></section>
</main>
${footer()}
</body>
</html>
`;
  const out = join(root, outFile);
  // The existing region index pages are David's own, with his photos. Only create hubs that don't exist yet.
  if (existsSync(out) && !process.argv.includes("--force")) {
    // Leave David's page as it is, but add (or refresh) the beach comparison table before </main>.
    const table = compareTable(items, h1);
    let page = readFileSync(out, "utf8").replace(/\n?<!--sb-compare-->[\s\S]*?<!--\/sb-compare-->/, "");
    if (table && page.includes("</main>")) page = page.replace("</main>", `<!--sb-compare-->${table}<!--/sb-compare-->\n</main>`);
    writeFileSync(out, page);
    return items.length;
  }
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html.replace(/\n\s*\n\s*\n+/g, "\n\n"));
  return items.length;
}

const home = ["Beach guides", "/guides/"];
const crumbsFor = (...extra) => [["Home", "/"], home, ...extra];

// ---- Region definitions --------------------------------------------------------------------
const northDevon = pick("westward-ho", "saunton-sands", "croyde-bay", "putsborough", "woolacombe", "lynmouth");
const southDevon = pick("bantham", "bigbury-on-sea", "challaborough");
const cornwall = {
  north: pick("summerleaze-beach", "widemouth-bay", "polzeath", "harlyn-bay", "constantine-bay", "mawgan-porth"),
  newquay: pick("watergate-bay", "fistral-beach", "towan-beach-newquay", "great-western-beach", "crantock-beach", "holywell-bay"),
  west: pick("perranporth", "trevaunance-cove", "porthtowan", "gwithian-godrevy", "hayle-towans", "porthmeor-beach", "sennen-cove", "praa-sands")
};
const walesSub = (sub) => all.filter((d) => d.region === "wales" && d.subRegion === sub);
const scotland = {
  north: pick("thurso-east", "thurso-beach", "dunnet-bay", "melvich"),
  east: pick("belhaven-bay", "pease-bay", "coldingham-bay", "fraserburgh", "lossiemouth"),
  west: pick("machrihanish", "balevullin-tiree", "dalmore-bay-lewis")
};
const ni = {
  portrush: pick("portrush-east-strand", "portrush-west-strand", "whiterocks", "portstewart-strand"),
  benone: pick("benone-strand", "downhill-beach", "castlerock"),
  antrim: pick("white-park-bay", "ballycastle-beach")
};
const ne = {
  northumberland: pick("bamburgh", "beadnell-bay", "druridge-bay"),
  tyne: pick("tynemouth-longsands", "south-shields"),
  tees: pick("saltburn", "redcar"),
  yorkshire: pick("runswick-bay", "sandsend", "whitby", "scarborough-north-bay", "cayton-bay", "filey-bay")
};
const south = {
  dorset: pick("bournemouth", "boscombe-pier", "southbourne", "highcliffe", "kimmeridge-bay", "swanage"),
  iow: pick("compton-bay", "freshwater-bay-isle-of-wight", "shanklin"),
  sussex: pick("west-wittering", "east-wittering", "bracklesham-bay", "shoreham", "brighton", "eastbourne"),
  kent: pick("joss-bay")
};

// Sanity check: every destination appears in at least one hub.
const covered = new Set([...northDevon, ...southDevon, ...Object.values(cornwall).flat(), ...all.filter((d) => d.region === "wales"),
  ...Object.values(scotland).flat(), ...Object.values(ni).flat(), ...Object.values(ne).flat(), ...Object.values(south).flat()].map((d) => d.slug));
const missing = all.filter((d) => !covered.has(d.slug)).map((d) => d.slug);
if (missing.length) throw new Error(`Destinations missing from hubs: ${missing.join(", ")}`);

let pages = 0;
const hub = (cfg) => { writeHub(cfg); pages++; };

hub({
  path: "/guides/devon/", outFile: "guides/devon/index.html",
  title: "Devon Surf & Beach Guides: North and South Devon | Surfbooker",
  description: "Devon surf and beach guides: Westward Ho!, Saunton, Croyde, Putsborough, Woolacombe and Lynmouth in North Devon, and Bantham, Bigbury and Challaborough in the South Hams.",
  h1: "Devon surf & beach guides", eyebrow: "9 destination guides",
  intro: "North Devon's Atlantic beaches — inside the World Surfing Reserve — and the South Hams' river-mouth breaks around Bigbury Bay.",
  crumbs: crumbsFor(["Devon", "/guides/devon/"]), heroSlug: "saunton-sands",
  groups: [
    { id: "north-devon", short: "North Devon", eyebrow: "North Devon", title: "North Devon", intro: "Big west-facing beaches from Westward Ho! to Woolacombe, plus Lynmouth's rare point break. [See the North Devon hub](/guides/north-devon/).", items: northDevon },
    { id: "south-devon", short: "South Devon", eyebrow: "South Devon", title: "South Devon", intro: "Three beaches around the Avon estuary and Burgh Island. [See the South Devon hub](/guides/south-devon/).", items: southDevon }
  ]
});
hub({
  path: "/guides/north-devon/", outFile: "guides/north-devon/index.html",
  title: "North Devon Surf & Beach Guides | Surfbooker",
  description: "North Devon surf guides: Westward Ho!, Saunton Sands, Croyde, Putsborough, Woolacombe and Lynmouth — lessons, parking, dog rules and which beach suits which day.",
  h1: "North Devon surf & beach guides", eyebrow: "6 destination guides",
  intro: "Six very different beaches within half an hour of each other — choose by wind, swell and ability.",
  crumbs: crumbsFor(["Devon", "/guides/devon/"], ["North Devon", "/guides/north-devon/"]), heroSlug: "croyde-bay",
  groups: [{ id: "beaches", title: "North Devon beaches", intro: "Saunton and Westward Ho! for learning and longboards, Croyde for punch, Putsborough in a south-westerly, Woolacombe for space, and Lynmouth for experienced surfers on big swells.", items: northDevon }]
});
hub({
  path: "/guides/south-devon/", outFile: "guides/south-devon/index.html",
  title: "South Devon Surf & Beach Guides: Bantham, Bigbury, Challaborough | Surfbooker",
  description: "South Devon surf guides: Bantham, Bigbury-on-Sea and Challaborough — lessons with Discovery Surf School, river-mouth safety, parking, lifeguards and Burgh Island.",
  h1: "South Devon surf & beach guides", eyebrow: "3 destination guides",
  intro: "Bantham, Bigbury-on-Sea and Challaborough share one swell window around the River Avon and Burgh Island.",
  crumbs: crumbsFor(["Devon", "/guides/devon/"], ["South Devon", "/guides/south-devon/"]), heroSlug: "bantham",
  groups: [{ id: "beaches", title: "South Devon beaches", items: southDevon }]
});
hub({
  path: "/guides/cornwall/", outFile: "guides/cornwall/index.html",
  title: "Cornwall Surf & Beach Guides: 20 Beaches from Bude to Praa Sands | Surfbooker",
  description: "Cornwall surf guides for 20 beaches — Bude, Polzeath, Newquay, Perranporth, St Ives, Sennen and Praa Sands — with lessons, parking, lifeguards and dog rules.",
  h1: "Cornwall surf & beach guides", eyebrow: "20 destination guides",
  intro: "From Bude's town beaches to Sennen at the end of the land — every guide checked against Cornwall Council's dog rules and RNLI patrols.",
  crumbs: crumbsFor(["Cornwall", "/guides/cornwall/"]), heroSlug: "fistral-beach",
  groups: [
    { id: "north-cornwall", short: "Bude to Padstow", eyebrow: "North Cornwall", title: "Bude to Padstow Bay", items: cornwall.north },
    { id: "newquay", short: "Newquay coast", eyebrow: "Newquay", title: "Newquay and its neighbours", items: cornwall.newquay },
    { id: "west-cornwall", short: "West Cornwall", eyebrow: "West Cornwall", title: "Perranporth to Land's End and Mount's Bay", items: cornwall.west }
  ]
});

const walesGroups = [
  { id: "pembrokeshire", sub: "pembrokeshire", short: "Pembrokeshire", title: "Pembrokeshire", intro: "National Park beaches from Whitesands to Freshwater West." },
  { id: "gower", sub: "gower", short: "Gower", title: "Gower", intro: "From exposed Llangennith and Rhossili to the bays near Swansea." },
  { id: "south-wales-coast", sub: "south-wales-coast", short: "South Wales coast", title: "South Wales coast", intro: "Rest Bay, Porthcawl — easy to reach from the M4." },
  { id: "north-wales", sub: "north-wales", short: "North Wales", title: "North Wales & Llŷn", intro: "Rhosneigr on Anglesey and Hell's Mouth on the Llŷn." }
];
hub({
  path: "/guides/wales/", outFile: "guides/wales/index.html",
  title: "Wales Surf & Beach Guides: Pembrokeshire, Gower & North Wales | Surfbooker",
  description: "Welsh surf guides for 17 beaches across Pembrokeshire, Gower, Porthcawl and North Wales — lessons, parking, dog rules, lifeguards and where to stay.",
  h1: "Wales surf & beach guides", eyebrow: "17 destination guides",
  intro: "Explore the Welsh surf coast region by region, then compare each beach by level, exposure, access and trip practicality.",
  crumbs: crumbsFor(["Wales", "/guides/wales/"]), heroSlug: "rhossili-bay",
  groups: walesGroups.map((g) => ({ ...g, eyebrow: "Wales", intro: `${g.intro} [Open the ${g.title} hub](/guides/wales/${g.sub}/).`, items: walesSub(g.sub) }))
});
for (const g of walesGroups) {
  const items = walesSub(g.sub);
  hub({
    path: `/guides/wales/${g.sub}/`, outFile: `guides/wales/${g.sub}/index.html`,
    title: `${g.title} Surf & Beach Guides | Surfbooker`,
    description: `${g.title} surf guides: ${items.map((d) => d.name).join(", ")} — lessons, parking, dog rules and where to stay.`,
    h1: `${g.title} surf & beach guides`, eyebrow: `${items.length} destination guide${items.length === 1 ? "" : "s"}`,
    intro: g.intro, crumbs: crumbsFor(["Wales", "/guides/wales/"], [g.title, `/guides/wales/${g.sub}/`]),
    heroSlug: items.find((d) => d.images?.hero)?.slug,
    groups: [{ id: "beaches", title: `${g.title} beaches`, items }]
  });
}
hub({
  path: "/guides/scotland/", outFile: "guides/scotland/index.html",
  title: "Scotland Surf & Beach Guides: North Coast, East Coast & Islands | Surfbooker",
  description: "Scottish surf guides: Thurso, Dunnet Bay, Melvich, Belhaven, Pease Bay, Coldingham, Fraserburgh, Lossiemouth, Machrihanish, Tiree and Lewis — lessons, safety and access.",
  h1: "Scotland surf & beach guides", eyebrow: "12 destination guides",
  intro: "Cold, uncrowded and often world-class — but most Scottish surf beaches have no lifeguards, so these guides are clear about who each one suits.",
  crumbs: crumbsFor(["Scotland", "/guides/scotland/"]), heroSlug: "dunnet-bay",
  groups: [
    { id: "north-coast", short: "North coast", eyebrow: "Caithness & Sutherland", title: "The north coast", items: scotland.north },
    { id: "east-coast", short: "East coast", eyebrow: "Lothian, Borders, Aberdeenshire, Moray", title: "The east coast", items: scotland.east },
    { id: "west-coast", short: "West & islands", eyebrow: "Kintyre & the Hebrides", title: "West coast and islands", items: scotland.west }
  ]
});
hub({
  path: "/guides/northern-ireland/", outFile: "guides/northern-ireland/index.html",
  title: "Northern Ireland Surf & Beach Guides: Causeway Coast | Surfbooker",
  description: "Northern Ireland surf guides for the Causeway Coast: Portrush, Whiterocks, Portstewart, Benone, Downhill, Castlerock, White Park Bay and Ballycastle.",
  h1: "Northern Ireland surf & beach guides", eyebrow: "9 destination guides",
  intro: "The Causeway Coast packs lifeguarded surf beaches, schools and spectacular scenery into a short drive.",
  crumbs: crumbsFor(["Northern Ireland", "/guides/northern-ireland/"]), heroSlug: "whiterocks",
  groups: [
    { id: "portrush", short: "Portrush & Portstewart", eyebrow: "Causeway Coast", title: "Portrush and Portstewart", items: ni.portrush },
    { id: "benone", short: "Benone to Castlerock", eyebrow: "Londonderry coast", title: "Benone to Castlerock", items: ni.benone },
    { id: "north-antrim", short: "North Antrim", eyebrow: "North Antrim", title: "North Antrim", items: ni.antrim }
  ]
});
hub({
  path: "/guides/northeast-england-yorkshire/", outFile: "guides/northeast-england-yorkshire/index.html",
  title: "Northeast England & Yorkshire Surf Guides | Surfbooker",
  description: "North Sea surf guides from Bamburgh to Filey: Tynemouth, South Shields, Saltburn, Redcar, Whitby, Scarborough and Cayton Bay — lessons, lifeguards and dog rules.",
  h1: "Northeast England & Yorkshire surf guides", eyebrow: "13 destination guides",
  intro: "North Sea surf from Northumberland's castle beaches to the Yorkshire coast — short-lived swells, cold water and some excellent surf towns.",
  crumbs: crumbsFor(["Northeast England & Yorkshire", "/guides/northeast-england-yorkshire/"]), heroSlug: "saltburn",
  groups: [
    { id: "northumberland", short: "Northumberland", eyebrow: "Northumberland", title: "Northumberland", items: ne.northumberland },
    { id: "tyneside", short: "Tyneside", eyebrow: "Tyne and Wear", title: "Tyneside", items: ne.tyne },
    { id: "teesside", short: "Teesside", eyebrow: "Redcar & Cleveland", title: "Saltburn and Redcar", items: ne.tees },
    { id: "yorkshire", short: "Yorkshire coast", eyebrow: "North Yorkshire", title: "The Yorkshire coast", items: ne.yorkshire }
  ]
});
hub({
  path: "/guides/southern-england/", outFile: "guides/southern-england/index.html",
  title: "Southern England & Isle of Wight Surf Guides | Surfbooker",
  description: "South coast surf guides: Bournemouth, Boscombe, Kimmeridge, the Isle of Wight, the Witterings, Brighton, Eastbourne and Joss Bay — honest about when the Channel works.",
  h1: "Southern England & Isle of Wight surf guides", eyebrow: "16 destination guides",
  intro: "Channel surf is small and inconsistent, but when it works there are good beaches from Dorset to Kent — and plenty to do when it doesn't.",
  crumbs: crumbsFor(["Southern England", "/guides/southern-england/"]), heroSlug: "compton-bay",
  groups: [
    { id: "dorset", short: "Dorset", eyebrow: "Dorset & Christchurch", title: "Dorset and Christchurch", items: south.dorset },
    { id: "isle-of-wight", short: "Isle of Wight", eyebrow: "Isle of Wight", title: "Isle of Wight", items: south.iow },
    { id: "sussex", short: "Sussex", eyebrow: "West & East Sussex", title: "Sussex", items: south.sussex },
    { id: "kent", short: "Kent", eyebrow: "Kent", title: "Kent", items: south.kent }
  ]
});

// ---- /guides/ index -------------------------------------------------------------------------
const regionCards = [
  { name: "Devon", path: "/guides/devon/", heroIntro: "North Devon's World Surfing Reserve and the South Hams' river-mouth beaches.", glance: [["Best for", `${northDevon.length + southDevon.length} guides`]], images: { hero: heroOf(bySlug["saunton-sands"]) }, heroAlt: bySlug["saunton-sands"].heroAlt },
  { name: "Cornwall", path: "/guides/cornwall/", heroIntro: "Twenty beaches from Bude to Praa Sands.", glance: [["Best for", "20 guides"]], images: { hero: heroOf(bySlug["fistral-beach"]) }, heroAlt: bySlug["fistral-beach"].heroAlt },
  { name: "Wales", path: "/guides/wales/", heroIntro: "Pembrokeshire, Gower, Porthcawl, Anglesey and the Llŷn.", glance: [["Best for", "17 guides"]], images: { hero: heroOf(bySlug["rhossili-bay"]) }, heroAlt: bySlug["rhossili-bay"].heroAlt },
  { name: "Scotland", path: "/guides/scotland/", heroIntro: "The north coast, the east coast, Kintyre and the islands.", glance: [["Best for", "12 guides"]], images: { hero: heroOf(bySlug["dunnet-bay"]) }, heroAlt: bySlug["dunnet-bay"].heroAlt },
  { name: "Northeast England & Yorkshire", path: "/guides/northeast-england-yorkshire/", heroIntro: "Northumberland to the Yorkshire coast.", glance: [["Best for", "13 guides"]], images: { hero: heroOf(bySlug["saltburn"]) }, heroAlt: bySlug["saltburn"].heroAlt },
  { name: "Northern Ireland", path: "/guides/northern-ireland/", heroIntro: "The Causeway Coast from Benone to Ballycastle.", glance: [["Best for", "9 guides"]], images: { hero: heroOf(bySlug["whiterocks"]) }, heroAlt: bySlug["whiterocks"].heroAlt },
  { name: "Southern England & Isle of Wight", path: "/guides/southern-england/", heroIntro: "Dorset, the Isle of Wight, Sussex and Kent.", glance: [["Best for", "16 guides"]], images: { hero: heroOf(bySlug["compton-bay"]) }, heroAlt: bySlug["compton-bay"].heroAlt }
];
const azList = [...all, WESTWARD].sort((a, b) => a.name.localeCompare(b.name));
const az = `<section class="section" id="a-z" aria-labelledby="a-z-title"><div class="shell"><div class="section-head"><p class="dg-eyebrow">Every guide</p><h2 id="a-z-title">All beach guides, A–Z</h2></div>
<ul class="hub-az">${azList.map((d) => `<li><a href="${d.path}">${esc(d.name)}</a></li>`).join("")}</ul></div></section>`;
const stops = section("on-the-way", { eyebrow: "Travel stops", title: "Worth stopping for on the way", intro: "Places that turn a necessary break into a good part of the journey.", alt: true }, grid([CLEVEDON]));
writeHub({
  path: "/guides/", outFile: "guides/index.html",
  title: "UK Surf & Beach Guides by Region | Surfbooker",
  description: `Surfbooker's ${all.length + 1} UK surf and beach guides — Devon, Cornwall, Wales, Scotland, Northern Ireland, the Northeast and the south coast — with lessons, parking, lifeguards and where to stay.`,
  h1: "UK surf & beach guides", eyebrow: `${all.length + 1} destination guides`,
  intro: "Pick a region, then compare beaches by ability, access and what's around them.",
  crumbs: [["Home", "/"], home], heroSlug: "croyde-bay",
  groups: [{ id: "regions", title: "Choose a region", items: regionCards }],
  extraSections: `${stops}\n${az}`
});
pages++;
console.log(`Hub pages written: ${pages}.`);

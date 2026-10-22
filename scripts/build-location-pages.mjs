// Surf lessons, surf hire and surf shop pages for each beach.
//
// build-site.mjs writes these pages with just the Surfbooker-listed providers (often none). This script
// rebuilds them as proper planning pages in the destination-guide design: Surfbooker-listed providers
// first, then researched providers (clearly labelled, with official links), what learning / hiring /
// shopping is like at that beach, practical information, and links to the rest of the trip.
//
// Inputs
//   data/destinations/*.mjs              base facts for each beach (via loadDestinations)
//   data/location-research/<slug>.json   researched schools / hire / shops + lesson & hire notes, with sources
//   data/location-listings.json          Surfbooker-listed providers and hero photo per page, captured from
//                                        build-site's output (refreshed whenever build-site has re-run)
//
// Run after build-site and build-destination-guides, before assign-site-images.
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { loadDestinations } from "./build-destination-guides.mjs";
import { placeKey } from "./lib/site-places.mjs";
import { BASE_URL, CHECKED_LABEL, breadcrumbLd, esc, faqLd, footer, head, heroBlock, imageInfo, md, plain } from "./lib/guide-kit.mjs";

const root = join(import.meta.dirname, "..");
const MARK = '<meta name="sb-page" content="location">';
const read = (rel) => (existsSync(join(root, rel)) ? readFileSync(join(root, rel), "utf8") : "");
const listingsFile = join(root, "data/location-listings.json");
const listings = existsSync(listingsFile) ? JSON.parse(readFileSync(listingsFile, "utf8")) : {};

const TYPES = {
  "surf-lessons": { kind: "lessons", label: "Surf lessons", providerRe: /href="\/(surf-schools)\/([^"/#?]+)\//g },
  "surf-hire": { kind: "hire", label: "Surf hire", providerRe: /href="\/(surf-hire\/providers)\/([^"/#?]+)\//g },
  "surf-shops": { kind: "shops", label: "Surf shops", providerRe: /href="\/(surf-shops\/[^"#?]+?\/[^"/#?]+\/[^"/#?]+)\//g }
};

// Duplicate URLs that 301 to another page (see _redirects) are not rebuilt.
const REDIRECTED = new Set();
for (const line of read("_redirects").split(/\r?\n/)) {
  const m = line.match(/^(\/surf-(?:lessons|hire|shops)\/\S+?)\/?\s+\S+\s+301/);
  if (m) REDIRECTED.add(m[1].replace(/\/?\*?$/, "/"));
}

function walk(dir, out = []) {
  for (const n of readdirSync(join(root, dir))) {
    const p = join(dir, n);
    if (statSync(join(root, p)).isDirectory()) walk(p, out); else if (n === "index.html") out.push(p);
  }
  return out;
}

const keyFromUrl = (u) => decodeURIComponent(u.replace(/^https?:\/\/[^/]+/, "").replace(/^\//, "").split(/[?#]/)[0]);
const textOf = (html) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

// Capture what build-site put on the page: hero photo, breadcrumbs and Surfbooker-listed providers.
function capture(rel, html, type) {
  const hero = (html.match(/--hero-image:url\('([^']+)'\)/) || html.match(/class="[^"]*(?:hero|lesson-hero)[^"]*"[^>]*>\s*<img[^>]+src="([^"]+)"/) || html.match(/<img[^>]+fetchpriority="high"[^>]*src="([^"]+)"|<img[^>]+src="([^"]+)"[^>]*fetchpriority="high"/) || [])
    .slice(1).find(Boolean);
  let crumbs = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const j = JSON.parse(m[1]);
      const nodes = [].concat(j["@graph"] || j);
      const bl = nodes.find((n) => n["@type"] === "BreadcrumbList");
      if (bl) crumbs = bl.itemListElement.map((i) => [i.name, (i.item?.["@id"] || i.item || "").replace(BASE_URL, "")]);
    } catch {}
  }
  const providers = [];
  for (const m of html.matchAll(TYPES[type].providerRe)) {
    const href = `/${m[1]}/${m[2]}/`;
    if (providers.some((p) => p.href === href) || !existsSync(join(root, href, "index.html"))) continue;
    // The card's own description (build-site writes a hand-written blurb per provider).
    const before = html.slice(Math.max(0, m.index - 2500), m.index);
    const cardStart = Math.max(before.lastIndexOf('<div class="provider-card'), before.lastIndexOf('<div class="listing-card'), before.lastIndexOf("<article"));
    const start = cardStart >= 0 ? cardStart : before.lastIndexOf('<a class="');
    const after = html.slice(m.index, m.index + 1500).split(/<div class="(?:provider|listing)-card|<article|<\/a>/)[0];
    const card = (start >= 0 ? before.slice(start) : "") + after;
    const blurb = [...card.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((x) => decode(textOf(x[1])))
      .filter((t) => t.length > 40 && !/Loading Google|^From £/.test(t)).sort((a, b) => b.length - a.length)[0] || "";
    const img = (card.match(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/) || [])[1];
    const imgAlt = decode((card.match(/<img\b[^>]*\balt="([^"]*)"/) || [])[1] || "");
    const image = img && img.startsWith("/") && !/Logo/.test(img) ? keyFromUrl(img) : null;
    providers.push({ href, blurb, ...(image ? { image, imageAlt: imgAlt } : {}) });
  }
  return { hero: hero ? keyFromUrl(hero) : null, crumbs, providers };
}

function providerInfo(entry) {
  const href = typeof entry === "string" ? entry : entry.href;
  const page = read(`${href.slice(1)}index.html`);
  const name = decode(textOf((page.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || "")) || href.split("/").slice(-2, -1)[0];
  const description = decode((page.match(/name="description" content="([^"]*)"/) || [])[1] || "");
  const generic = /^Compare surf lesson details for|^Send a Surfbooker|^Compare surf hire/i.test(description);
  return { href, name, description: entry.blurb || (generic ? "" : description), image: entry.image, imageAlt: entry.imageAlt };
}

// ---- small renderers (destination-guide.css) --------------------------------------------------
const section = (id, { eyebrow, title, intro, alt = false }, body) => `
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
const infoCards = (cards) => `<div class="info-grid">${cards.map((c) => `
  <div class="info-card">${c.label ? `<span class="small-label">${esc(c.label)}</span>` : ""}<h3>${esc(c.title)}</h3>${[].concat(c.text).map((t) => `<p>${md(t)}</p>`).join("")}</div>`).join("")}
</div>`;
const prose = (paras) => (paras?.length ? `<div class="prose">${paras.map((p) => `<p>${md(p)}</p>`).join("")}</div>` : "");
const badge = (kind) => kind === "listed" ? `<span class="badge listed">Listed on Surfbooker</span>` : "";
function rows(items) {
  return `<div class="dg-rows">${items.map((it) => `
  <div class="dg-row">
    <div><h3>${esc(it.name)}</h3>${it.type ? `<span class="dg-row-type">${esc(it.type)}</span>` : ""}</div>
    ${it.url ? `<a class="dg-row-link" href="${esc(it.url)}" rel="noopener" target="_blank">Official website<span class="visually-hidden"> for ${esc(it.name)}</span></a>` : "<span></span>"}
    ${it.note ? `<p>${md(it.note)}</p>` : ""}
  </div>`).join("")}
</div>`;
}
const listedCards = (items, action) => `<div class="listing-grid">${items.map((p) => `<a class="listing-card" href="${p.href}">${p.image && existsSync(join(root, p.image)) ? `<div class="lc-media"><img src="${"/" + p.image.split("/").map(encodeURIComponent).join("/")}" alt="${esc(p.imageAlt || p.name)}" loading="lazy" decoding="async"></div>` : ""}<div class="lc-body">${badge("listed")}<h3>${esc(p.name)}</h3>${p.description ? `<p>${esc(p.description.length > 170 ? p.description.slice(0, 167).replace(/\s+\S*$/, "") + "…" : p.description)}</p>` : ""}<span class="lc-action">${action}</span></div></a>`).join("")}</div>`;

const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\b(the|surf|school|ltd|limited|and|academy|hire|shop|co)\b/g, "").trim();

// ---- page assembly -----------------------------------------------------------------------------
function renderPage({ rel, type, d, research, captured, pages }) {
  const T = TYPES[type];
  const kind = T.kind;
  const path = "/" + rel.replace(/index\.html$/, "");
  const name = d.fullName || d.name;
  const short = d.name;
  const r = research || {};
  const listed = captured.providers.map(providerInfo);
  const listedNames = listed.map((p) => norm(p.name));
  const notListed = (it) => !listedNames.some((n) => n && (n === norm(it.name) || n.includes(norm(it.name)) || norm(it.name).includes(n)));

  const baseProviders = d.lessons?.providers || [];
  const pick = (re) => baseProviders.filter((p) => re.test(p.type || "")).map((p) => ({ ...p }));
  const researched = {
    lessons: [...(r.schools || []), ...pick(/school|lesson|coach/i)],
    hire: [...(r.hire || []), ...pick(/hire|rental|shop/i)],
    shops: [...(r.shops || []), ...pick(/shop|retail/i)]
  }[kind];
  const seen = new Set();
  const others = researched.filter((p) => p?.name && !seen.has(norm(p.name)) && seen.add(norm(p.name)) && notListed(p))
    .map((p) => ({ name: p.name, type: p.type || { lessons: "Surf school", hire: "Board & wetsuit hire", shops: "Surf shop" }[kind], url: p.url, note: [p.base || p.town, p.note].filter(Boolean).join(" — ") }));

  // Sibling pages for this beach.
  const lessonsPage = pages.lessons, hirePage = pages.hire, shopsPage = pages.shops;
  const guidePath = d.path;
  const accommodation = d.surfbooker?.accommodation && existsSync(join(root, `accommodation/${d.surfbooker.accommodation}/index.html`)) ? `/accommodation/${d.surfbooker.accommodation}/` : null;

  const sections = [];
  const jump = [];
  const add = (id, label, html) => { if (html) { sections.push(html); jump.push([id, label]); } };

  // 1. Providers
  const what = { lessons: "surf schools", hire: "board and wetsuit hire", shops: "surf shops" }[kind];
  const providerTitle = { lessons: `Surf schools at ${short}`, hire: `Where to hire a board at ${short}`, shops: `Surf shops for ${short}` }[kind];
  const providerBody = `
    ${listed.length ? listedCards(listed, { lessons: "Compare lessons", hire: "See hire details", shops: "View shop" }[kind]) : ""}
    ${others.length ? `${listed.length ? `<h3 style="margin:30px 0 12px">Other ${what} we found</h3>` : ""}${rows(others)}` : ""}
    ${!listed.length && !others.length ? `<p class="section-note">We haven't found ${what} that we can confirm for ${esc(short)} yet. ${kind === "lessons" ? "Schools from nearby beaches sometimes bring groups here when conditions suit — see nearby beaches below." : "Check the nearest town or the beaches below."}</p>` : ""}
    <p class="section-note">${listed.length ? "<strong>Listed on Surfbooker</strong> businesses have a profile on this site. " : ""}Check times, ages, prices and what's included directly before you go. <a href="/how-we-list-businesses/">How we list businesses</a>.</p>
    ${kind === "lessons" ? `<p class="section-note">Run a surf school here? <a href="/list-your-school/">Add or update your listing</a>.</p>` : ""}`;
  add("providers", { lessons: "Schools", hire: "Hire", shops: "Shops" }[kind], section("providers", {
    eyebrow: T.label, title: providerTitle,
    intro: { lessons: r.lessonsIntro, hire: r.hireIntro, shops: r.shopsIntro }[kind]
  }, providerBody));

  // 2. What it's like here (lessons/hire/shops specific)
  if (kind === "lessons") {
    const learn = r.learn || {};
    const body = `${prose(learn.text)}${learn.cards?.length ? infoCards(learn.cards) : ""}`;
    if (learn.text?.length || learn.cards?.length) add("learning", "Learning here", section("learning", { eyebrow: "For beginners", title: `Learning to surf at ${short}`, alt: true }, body));
  } else if (kind === "hire") {
    const kit = r.kit || {};
    const body = `${prose(kit.text)}${kit.cards?.length ? infoCards(kit.cards) : ""}`;
    if (kit.text?.length || kit.cards?.length) add("kit", "What to hire", section("kit", { eyebrow: "Boards & wetsuits", title: `What to hire for ${short}`, alt: true }, body));
  } else {
    const body = prose(r.shopsText);
    if (r.shopsText?.length) add("about", "About", section("about", { eyebrow: "Local surf shops", title: `Buying surf gear near ${short}`, alt: true }, body));
  }

  // 3. Conditions at a glance (short, from the guide's facts) + link to the full guide
  const cond = (d.surf?.cards || []).slice(0, 3);
  const practical = (d.practical || []).filter((p) => /lifeguard|parking|facilit|access|dog/i.test(p.label + " " + p.title)).slice(0, 4);
  const knowBody = `${cond.length ? infoCards(cond) : ""}${practical.length ? `<h3 style="margin:30px 0 12px">On the day</h3>${infoCards(practical)}` : ""}
    <div class="section-actions"><a class="btn btn-dark" href="${guidePath}">Full ${esc(short)} surf &amp; beach guide</a></div>`;
  if (cond.length || practical.length) add("know", "Know before you go", section("know", { eyebrow: "Conditions & practical", title: "Know before you go", intro: kind === "lessons" ? "Lessons only run when the sea suits beginners, and the school picks the spot on the day." : null }, knowBody));

  // 4. Plan the rest of the trip
  const plan = [];
  if (kind !== "lessons" && lessonsPage) plan.push({ label: "Lessons", title: `Surf lessons at ${short}`, text: `[Compare surf schools](${lessonsPage}) for ${short}.` });
  if (kind !== "hire" && hirePage) plan.push({ label: "Hire", title: `Board & wetsuit hire`, text: `[Where to hire kit](${hirePage}) at ${short}.` });
  if (kind !== "shops" && shopsPage) plan.push({ label: "Shops", title: "Surf shops", text: `[Surf shops](${shopsPage}) serving ${short}.` });
  plan.push({ label: "Guide", title: `${short} beach guide`, text: `[Surf, tides, parking and facilities](${guidePath}).` });
  if (accommodation) plan.push({ label: "Stay", title: `Where to stay`, text: `[Accommodation near ${short}](${accommodation}).` });
  const food = (d.food?.places || d.food?.picks || []).slice(0, 4).map((f) => f.name).filter(Boolean);
  if (food.length) plan.push({ label: "Eat", title: "Food & drink nearby", text: `${food.join(", ")}. [More in the guide](${guidePath}#food).` });
  const todo = (d.todo || d.things || []).filter((t) => !/did you know/i.test(t.label || "")).slice(0, 3).map((t) => t.title).filter(Boolean);
  if (todo.length) plan.push({ label: "Flat days", title: "If the surf is flat", text: `${todo.join(", ")}.` });
  const nearby = (d.nearby || []).slice(0, 4).map((n) => {
    const nk = n.href ? n.href.match(/\/guides\/surfing-([^/]+)\//)?.[1] : null;
    const sib = nk ? pageIndex[type]?.get(nk) : null;
    return `[${n.name}](${sib || n.href})${n.distance ? ` (${n.distance.toLowerCase()})` : ""}`;
  });
  if (nearby.length) plan.push({ label: "Nearby", title: "Nearby beaches", text: `${nearby.join(", ")}.` });
  add("plan", "Plan your trip", section("plan", { eyebrow: "Plan your trip", title: `Make a trip of it`, alt: true }, infoCards(plan)));

  // 5. FAQs
  const faqs = (r.faqs?.[kind] || []).filter((f) => f.q && f.a);
  if (faqs.length) add("faqs", "FAQs", section("faqs", { eyebrow: "Questions", title: `${T.label} at ${short}: quick answers` }, `<div class="faq-list">${faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${md(f.a)}</p></details>`).join("")}</div>`));

  // 6. Sources
  const sources = [...(r.sources || []), ...(d.sources || []).slice(0, 3)].filter((s, i, a) => s?.url && a.findIndex((x) => x.url === s.url) === i);
  add("sources", "Sources", section("sources", { eyebrow: "How we checked this page", title: "Sources", alt: true }, `
    <p>Surfbooker desk research, checked ${CHECKED_LABEL}. Business details come from each business's own website or the local tourism board; beach facts from the sources below. Lesson times, prices, lifeguard dates and parking change — check before you travel.</p>
    <ul class="source-list">${sources.map((s) => `<li><a href="${esc(s.url)}" rel="noopener" target="_blank"><span class="visually-hidden">Source: </span>${esc(s.label)}</a></li>`).join("")}</ul>`));

  // Head, hero, schema
  const titleText = { lessons: `Surf Lessons at ${short}: Schools & Beginner Tips | Surfbooker`, hire: `Surfboard & Wetsuit Hire at ${short} | Surfbooker`, shops: `Surf Shops near ${short} | Surfbooker` }[kind];
  const countText = (n, word) => (n ? `${n} ${word}${n > 1 ? "s" : ""}` : "");
  const descText = {
    lessons: `Surf lessons at ${name}: ${[countText(listed.length + others.length, "surf school"), "what learning here is like", "lifeguards, parking and where to stay"].filter(Boolean).join(", ")}.`,
    hire: `Hire a surfboard, bodyboard or wetsuit at ${name}: ${[countText(listed.length + others.length, "hire option"), "what to hire for the conditions", "parking and nearby beaches"].filter(Boolean).join(", ")}.`,
    shops: `Surf shops near ${name}: ${[countText(listed.length + others.length, "shop"), "where to buy or repair kit", "and links to lessons, hire and the beach guide"].filter(Boolean).join(", ")}.`
  }[kind];
  const crumbs = captured.crumbs.length ? captured.crumbs : [["Home", "/"], [T.label, `/${type}/`], [short, path]];
  crumbs[crumbs.length - 1] = [{ lessons: `Surf lessons at ${short}`, hire: `Surf hire at ${short}`, shops: `Surf shops near ${short}` }[kind], path];
  // Keep the page's own photo; pages that had none start from the beach's guide photo and
  // assign-site-images swaps in an unused photo of the same beach.
  const registered = (k) => { try { return k && existsSync(join(root, k)) && imageInfo(k); } catch { return false; } };
  const hero = [captured.hero, d.images?.hero].find((k) => k && /^(images|guides)\//.test(k) && registered(k)) || null;
  const heroIntro = { lessons: r.lessonsHero || `Surf schools, beginner conditions and practical tips for learning to surf at ${name}.`, hire: r.hireHero || `Where to hire a board and wetsuit at ${name}, and what suits the conditions.`, shops: r.shopsHero || `Surf shops serving ${name}, plus lessons, hire and the beach guide.` }[kind];
  const itemList = listed.length + others.length ? [{
    "@type": "ItemList", name: providerTitle,
    itemListElement: [...listed.map((p) => ({ name: p.name, url: BASE_URL + p.href })), ...others.map((p) => ({ name: p.name, url: p.url }))].map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, ...(it.url ? { url: it.url } : {}) }))
  }] : [];
  const jsonLd = [
    breadcrumbLd(crumbs),
    { "@type": "WebPage", name: plain(titleText.replace(/ \| Surfbooker$/, "")), url: BASE_URL + path, about: { "@type": "Beach", name, url: BASE_URL + guidePath, ...(d.geo ? { geo: { "@type": "GeoCoordinates", latitude: d.geo[0], longitude: d.geo[1] } } : {}) } },
    ...itemList,
    ...(faqs.length ? [faqLd(faqs)] : [])
  ];
  const jumpNav = `<nav class="dg-jump" aria-label="Page sections"><div class="shell">${jump.map(([id, label]) => `<a href="#${id}">${esc(label)}</a>`).join("")}</div></nav>`;
  const glance = d.glance?.length ? `<div class="dg-glance-wrap"><div class="shell"><dl class="dg-glance">${d.glance.slice(0, 4).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${md(v)}</dd></div>`).join("")}</dl></div></div>` : "";
  const stayLink = accommodation ? { href: accommodation, label: `Explore accommodation near ${short}` } : null;

  let html = `${head({ title: titleText, description: descText, path, image: hero, imageAlt: d.heroAlt || name, jsonLd })}
<body class="destination-guide location-page">
${heroBlock({ eyebrow: `${T.label} · ${d.area || ""}`.replace(/ · $/, ""), title: crumbs[crumbs.length - 1][0], intro: heroIntro, crumbs, image: hero, imageAlt: d.heroAlt || name, activeNav: `/${type === "surf-shops" ? "surf-hire" : type}/`, actions: [[{ lessons: "Compare schools", hire: "Hire options", shops: "Shops" }[kind], "#providers"], ["Beach guide", guidePath]] })}
<main id="main">
${glance}
${jumpNav}
${sections.join("\n")}
</main>
${footer({ stayLink })}
</body>
</html>
`;
  html = html.replace("<head>", `<head>\n  ${MARK}`).replace(/<script type="application\/ld\+json">/, (m) => m); // marker for idempotency
  return html.replace(/\n\s*\n\s*\n+/g, "\n\n");
}

// ---- main ----------------------------------------------------------------------------------------
const REGION_HUBS = new Set(["cornwall", "devon", "north-devon", "south-devon", "wales", "scotland", "northern-ireland", "northeast-england-yorkshire", "southern-england", "westward-ho"]);
const pageIndex = { "surf-lessons": new Map(), "surf-hire": new Map(), "surf-shops": new Map() };

export async function buildLocationPages() {
  const ds = await loadDestinations();
  const byKey = new Map();
  for (const d of ds) {
    byKey.set(placeKey(d.slug), d);
    if (d.fullName) byKey.set(placeKey(d.fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-")), d);
  }
  const ALIAS = { lynton: "lynmouth", "st-agnes": "trevaunance-cove", "towan-newquay": "towan-beach-newquay" };
  const targets = [];
  for (const type of Object.keys(TYPES)) {
    for (const rel of walk(type)) {
      const parts = rel.split("/");
      const leaf = parts[parts.length - 2];
      if (parts.length < 3 || ["surf-lessons", "surf-hire", "surf-shops", "providers"].includes(leaf) || rel.includes("/providers/")) continue;
      if (REGION_HUBS.has(leaf)) continue; // region hub pages
      const path = "/" + rel.replace(/index\.html$/, "");
      if (REDIRECTED.has(path)) continue;
      const html = read(rel);
      if (/name="robots" content="noindex/.test(html.slice(0, 4000))) continue;
      // Business pages (surf-shops/<region>/<place>/<shop>/) are not location pages.
      if (type === "surf-shops" && parts.length > 4) continue;
      const guideSlug = (html.match(/href="\/guides\/surfing-([^"/]+)\/"/) || [])[1];
      const d = (guideSlug && ds.find((x) => x.slug === guideSlug)) || byKey.get(placeKey(ALIAS[leaf] || leaf));
      if (!d) continue;
      // Hand-built Westward Ho! pages and region hubs are left alone.
      if (!html.includes(MARK)) listings[path] = capture(rel, html, type);
      if (!listings[path]) continue;
      targets.push({ rel, path, type, d });
      if (!pageIndex[type].has(d.slug) || pageIndex[type].get(d.slug).length > path.length) pageIndex[type].set(d.slug, path);
    }
  }
  let n = 0;
  for (const t of targets) {
    const researchFile = join(root, "data/location-research", `${t.d.slug}.json`);
    const research = existsSync(researchFile) ? JSON.parse(readFileSync(researchFile, "utf8")) : null;
    const pages = { lessons: pageIndex["surf-lessons"].get(t.d.slug), hire: pageIndex["surf-hire"].get(t.d.slug), shops: pageIndex["surf-shops"].get(t.d.slug) };
    writeFileSync(join(root, t.rel), renderPage({ ...t, research, captured: listings[t.path], pages }));
    n++;
  }
  writeFileSync(listingsFile, JSON.stringify(listings, null, 1));
  return n;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(`Location pages written: ${await buildLocationPages()}`);
}

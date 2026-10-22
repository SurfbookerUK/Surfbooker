// Renders every destination guide in data/destinations/*.mjs into its existing URL folder.
// Run after scripts/build-site.mjs (it reads generated surf-school, hire and accommodation pages
// so that guide cards always match what Surfbooker currently lists).
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import {
  BASE_URL, CHECKED_LABEL, breadcrumbLd, creditLine, esc, faqLd, footer, head, heroBlock, heroPreload,
  md, picture, plain, usedImages
} from "./lib/guide-kit.mjs";
import { regions } from "../data/destinations/regions.mjs";

const root = process.cwd();
const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7);

// Deeper researched copy for a guide lives in data/destination-research/<slug>.json (overview, surf,
// practical, FAQs and the sources each fact came from). It replaces the shorter base copy field by field.
function withResearch(d) {
  const file = join(root, "data/destination-research", `${d.slug}.json`);
  if (!existsSync(file)) return d;
  const r = JSON.parse(readFileSync(file, "utf8"));
  const out = { ...d };
  for (const k of ["overview", "suits", "notFor", "practical", "faqs"]) if (r[k]?.length) out[k] = r[k];
  if (r.surf) out.surf = { ...(d.surf || {}), ...r.surf };
  if (r.title) out.title = r.title;
  if (r.description) out.description = r.description;
  if (r.lessonsText) out.lessons = { ...(d.lessons || {}), text: r.lessonsText };
  const seen = new Set();
  out.sources = [...(r.sources || []), ...(d.sources || [])].filter((s) => s?.url && !seen.has(s.url) && seen.add(s.url));
  return out;
}

export async function loadDestinations() {
  const dir = join(root, "data/destinations");
  const all = [];
  for (const file of readdirSync(dir).sort()) {
    if (!file.endsWith(".mjs") || file === "regions.mjs") continue;
    const mod = await import(pathToFileURL(join(dir, file)).href);
    for (const d of mod.destinations || []) all.push(withResearch({ ...d, sourceFile: file }));
  }
  const seen = new Set();
  for (const d of all) {
    if (seen.has(d.slug)) throw new Error(`Duplicate destination slug ${d.slug}`);
    seen.add(d.slug);
    if (!regions[d.region]) throw new Error(`${d.slug}: unknown region ${d.region}`);
  }
  return all;
}

// ---- Read live Surfbooker listings from generated pages -------------------------------------
function readPage(rel) {
  const file = join(root, rel);
  return existsSync(file) ? readFileSync(file, "utf8") : "";
}
function pageMeta(rel) {
  const html = readPage(rel);
  if (!html) return null;
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, "").trim();
  const description = html.match(/name="description" content="([^"]*)"/)?.[1];
  return { name: decode(h1 || ""), description: decode(description || "") };
}
function decode(s) {
  return s.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
function stayCards(accommodationSlug, extra = []) {
  const html = accommodationSlug ? readPage(`accommodation/${accommodationSlug}/index.html`) : "";
  const slugs = [...new Set([...extra, ...[...html.matchAll(/href="\/accommodation\/stays\/([^"/?]+)/g)].map((m) => m[1])])]
    .filter((slug) => existsSync(join(root, `accommodation/stays/${slug}/index.html`)));
  return slugs.map((slug) => {
    const page = readPage(`accommodation/stays/${slug}/index.html`);
    const meta = pageMeta(`accommodation/stays/${slug}/index.html`);
    const verified = /Verified property information|Verified collection information|verified partner/i.test(page);
    const reviewed = /Surfbooker review|we stayed|Surfbooker stayed/i.test(page) && !/has not yet personally reviewed/i.test(page);
    // The area page's card already carries the stay type; directory listings have no other unique text.
    const card = html.split(`/accommodation/stays/${slug}/`)[1] || "";
    const kind = ((card.split("</a>")[0].match(/class="property-card-type">([^<]+)</) || [])[1] || "").trim();
    const directory = /listed for trips based around/i.test(meta?.description || "");
    return { slug, name: meta?.name || slug, description: meta?.description || "", verified, reviewed, meta: kind && kind !== "Accommodation option" ? kind : "", directory };
  });
}

// ---- Section renderers ---------------------------------------------------------------------
const section = (id, { eyebrow, title, intro, alt = false, dark = false }, body) => `
<section class="section${alt ? " alt" : ""}${dark ? " dark" : ""}" id="${id}" aria-labelledby="${id}-title">
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

const figure = (img, extraClass = "") => img ? `<figure class="dg-figure ${extraClass}">${picture(img.path, { alt: img.alt, sizes: img.sizes || "(max-width: 860px) 92vw, 1180px", position: img.position })}<figcaption>${img.caption ? md(img.caption) + " " : ""}${creditLine(img.path)}</figcaption></figure>` : "";

function badge(kind) {
  const map = {
    reviewed: ["reviewed", "Surfbooker review"],
    partner: ["partner", "Surfbooker partner"],
    listed: ["listed", "Listed on Surfbooker"],
    verified: ["listed", "Details verified by Surfbooker"],
    researched: ["researched", "Researched listing — not reviewed"]
  };
  const [cls, label] = map[kind] || map.researched;
  return `<span class="badge ${cls}">${label}</span>`;
}

function rows(items) {
  return `<div class="dg-rows">${items.map((it) => `
      <div class="dg-row">
        <div><h3>${esc(it.name)}</h3>${it.type ? `<span class="dg-row-type">${esc(it.type)}</span>` : ""}</div>
        ${it.url ? `<a class="dg-row-link" href="${esc(it.url)}"${/^https?:/.test(it.url) ? ' rel="noopener" target="_blank"' : ""}>${it.url.startsWith("/") ? "View on Surfbooker" : "Official website"}<span class="visually-hidden"> for ${esc(it.name)}</span></a>` : "<span></span>"}
        ${it.note ? `<p>${md(it.note)}</p>` : ""}
      </div>`).join("")}
    </div>`;
}

// Accommodation meta descriptions end with the same enquiry disclaimer; the section note already says it once.
function stayBlurb(desc) {
  return (desc || "").replace(/^(Send a Surfbooker accommodation enquiry about|Explore) /, "")
    .replace(/\s*No external booking links or unconfirmed availability\.?/i, "").replace(/\s*Enquiries? (?:are|is) passed on[^.]*\.?/i, "").slice(0, 160);
}

function schoolBlurb(desc) {
  const m = /^Compare surf lesson details for .+? in (.+?), including/.exec(desc || "");
  return m ? `Teaches at ${m[1]}.` : (desc || "").slice(0, 170);
}

function renderGuide(d) {
  const region = regions[d.region];
  const sub = d.subRegion ? region.subRegions?.[d.subRegion] : null;
  const crumbs = [["Home", "/"], ["Beach guides", "/guides/"], [region.name, region.hubPath]];
  if (sub) crumbs.push([sub.name, sub.hubPath]);
  crumbs.push([d.name, d.path]);
  const heroImg = d.images?.hero;
  const sections = [];
  const jump = [];
  const add = (id, label, html) => { if (html) { sections.push(html); jump.push([id, label]); } };

  // Overview
  const overviewBody = `
    <div class="intro-grid">
      <div class="prose">${d.overview.map((p) => `<p>${md(p)}</p>`).join("")}</div>
      <aside class="note-card">
        <h3>Who it suits</h3>
        <ul>${d.suits.map((s) => `<li>${md(s)}</li>`).join("")}</ul>
        ${d.notFor ? `<h3 style="margin-top:18px">Think twice if…</h3><ul>${d.notFor.map((s) => `<li>${md(s)}</li>`).join("")}</ul>` : ""}
      </aside>
    </div>
    ${d.images?.feature ? `<div class="dg-split">${figure(d.images.feature)}<div><h3>${esc(d.images.feature.heading || "The beach")}</h3><div class="prose">${[].concat(d.images.feature.text || []).map((p) => `<p>${md(p)}</p>`).join("")}</div></div></div>` : ""}`;
  add("overview", "Overview", section("overview", { eyebrow: d.eyebrow || `${region.name} beach guide`, title: `${d.name} at a glance`, intro: d.overviewIntro }, overviewBody));

  // Surf
  if (d.surf) {
    const body = `${d.surf.text ? `<div class="prose">${d.surf.text.map((p) => `<p>${md(p)}</p>`).join("")}</div>` : ""}
    ${d.surf.cards ? infoCards(d.surf.cards) : ""}
    ${d.surf.note ? `<p class="section-note">${md(d.surf.note)}</p>` : ""}`;
    add("surf", "Surf", section("surf", { eyebrow: "Surf guide", title: d.surf.title || `Surfing ${d.name}`, intro: d.surf.intro, alt: true }, body));
  }

  // Lessons & hire
  const schools = (d.surfbooker?.schools || []).map((slug) => ({ slug, ...pageMeta(`surf-schools/${slug}/index.html`) })).filter((s) => s.name);
  const hire = (d.surfbooker?.hireProviders || []).map((slug) => ({ slug, ...pageMeta(`surf-hire/providers/${slug}/index.html`) })).filter((s) => s.name);
  if (schools.length || hire.length || d.lessons) {
    const cards = [
      ...schools.map((s) => `<a class="listing-card" href="/surf-schools/${s.slug}/"><div class="lc-body">${badge("listed")}<h3>${esc(s.name)}</h3><p>${esc(schoolBlurb(s.description))}</p><span class="lc-action">Compare lessons</span></div></a>`),
      ...hire.map((s) => `<a class="listing-card" href="/surf-hire/providers/${s.slug}/"><div class="lc-body">${badge("listed")}<span class="lc-meta">Board &amp; wetsuit hire</span><h3>${esc(s.name)}</h3><p>Equipment, published prices and where to collect — see the full hire profile.</p><span class="lc-action">See hire details</span></div></a>`)
    ];
    const body = `${cards.length ? `<div class="listing-grid">${cards.join("")}</div>` : ""}
    ${d.lessons?.providers?.length ? `${cards.length ? `<h3 style="margin:30px 0 12px">Other providers we found</h3>` : ""}${rows(d.lessons.providers.map((p) => ({ ...p, type: p.type || "Surf school" })))}` : ""}
    ${d.lessons?.text ? `<div class="prose" style="margin-top:18px">${d.lessons.text.map((p) => `<p>${md(p)}</p>`).join("")}</div>` : ""}
    <p class="section-note">${md(d.lessons?.note || "Researched listings are businesses we found in public sources; Surfbooker has not reviewed them and has no partnership with them. Check lesson times, ages, prices and what is included directly with the provider.")}</p>
    ${d.surfbooker?.lessonsPage || d.surfbooker?.hirePage ? `<div class="section-actions">${d.surfbooker.lessonsPage ? `<a class="btn btn-dark" href="${d.surfbooker.lessonsPage}">Compare ${esc(d.name)} surf lessons</a>` : ""}${d.surfbooker.hirePage ? `<a class="btn btn-outline" href="${d.surfbooker.hirePage}">Surf hire in ${esc(d.name)}</a>` : ""}</div>` : ""}`;
    add("lessons", "Lessons & hire", section("lessons", { eyebrow: "Learn & hire", title: d.lessons?.title || `Surf lessons and hire at ${d.name}`, intro: d.lessons?.intro }, body));
  }

  // Practical
  if (d.practical?.length) {
    add("practical", "Know before you go", section("practical", { eyebrow: "Parking, facilities & safety", title: "Know before you go", intro: d.practicalIntro, alt: true },
      `${infoCards(d.practical)}${d.images?.practical ? figure(d.images.practical) : ""}`));
  }

  // Stay
  const stays = stayCards(d.surfbooker?.accommodation, d.surfbooker?.stays || []);
  const stayHubExists = d.surfbooker?.accommodation && Boolean(readPage(`accommodation/${d.surfbooker.accommodation}/index.html`));
  if (stays.length || d.stay) {
    const stayGrid = stays.length ? `<div class="listing-grid">${stays.slice(0, 8).map((s) => `<a class="listing-card" href="/accommodation/stays/${s.slug}/${d.surfbooker?.accommodation ? `?destination=${esc(d.surfbooker.accommodation)}` : ""}"><div class="lc-body">${badge(s.reviewed ? "reviewed" : s.verified ? "verified" : "listed")}${s.meta ? `<span class="lc-meta">${esc(s.meta)}</span>` : ""}<h3>${esc(s.name)}</h3>${s.directory ? "" : `<p>${esc(stayBlurb(s.description))}</p>`}<span class="lc-action">View accommodation</span></div></a>`).join("")}</div>` : "";
    const body = `${d.stay?.text ? `<div class="prose">${d.stay.text.map((p) => `<p>${md(p)}</p>`).join("")}</div>` : ""}
    ${d.stay?.areas ? infoCards(d.stay.areas) : ""}
    ${stayGrid ? `<h3 style="margin:30px 0 12px">On Surfbooker</h3>${stayGrid}` : ""}
    ${d.stay?.picks?.length ? `<h3 style="margin:30px 0 12px">Places to stay we found</h3>${rows(d.stay.picks)}` : ""}
    <p class="section-note">Surfbooker only marks a stay as reviewed when we have stayed there ourselves. Other listings are researched or owner-supplied; check rates, board storage and cancellation terms directly.</p>
    ${stayHubExists ? `<div class="section-actions"><a class="btn btn-dark" href="/accommodation/${d.surfbooker.accommodation}/">All accommodation near ${esc(d.name)}</a></div>` : ""}`;
    add("stay", "Where to stay", section("stay", { eyebrow: "Accommodation", title: `Where to stay near ${d.name}`, intro: d.stay?.intro }, body));
  }

  // Food
  if (d.food) {
    const reviewed = (d.food.reviewed || []).map((r) => `<a class="listing-card" href="${r.href}">${r.image ? `<div class="lc-media">${picture(r.image, { alt: r.alt, sizes: "(max-width: 600px) 92vw, 380px" })}</div>` : ""}<div class="lc-body">${badge("reviewed")}<h3>${esc(r.name)}</h3><p>${md(r.note)}</p><span class="lc-action">Read our review</span></div></a>`).join("");
    const body = `${d.food.text ? `<div class="prose">${d.food.text.map((p) => `<p>${md(p)}</p>`).join("")}</div>` : ""}
    ${reviewed ? `<div class="listing-grid" style="margin-bottom:26px">${reviewed}</div>` : ""}
    ${d.food.places?.length ? rows(d.food.places) : ""}
    <p class="section-note">${md(d.food.note || "Opening days and hours change with the season, especially outside school holidays — check before you go.")}</p>`;
    add("food", "Food & drink", section("food", { eyebrow: "Eat & drink", title: d.food.title || `Food and drink near ${d.name}`, intro: d.food.intro, alt: true }, body));
  }

  // Things to do
  if (d.todo?.length) {
    add("things-to-do", "Things to do", section("things-to-do", { eyebrow: "Beyond the surf", title: `Things to do around ${d.name}`, intro: d.todoIntro },
      `${infoCards(d.todo)}${d.images?.todo ? figure(d.images.todo) : ""}`));
  }

  // Getting here
  if (d.travel?.length) {
    add("getting-here", "Getting here", section("getting-here", { eyebrow: "Travel", title: `Getting to ${d.name}`, intro: d.travelIntro, alt: true }, infoCards(d.travel)));
  }

  // Nearby
  if (d.nearby?.length) {
    const body = `<div class="nearby-grid">${d.nearby.map((n) => {
      const inner = `${n.distance ? `<span class="nb-dist">${esc(n.distance)}</span>` : ""}<h3>${esc(n.name)}</h3><p>${md(n.text)}</p>`;
      return n.href ? `<a class="nearby-card" href="${n.href}">${inner}</a>` : `<div class="nearby-card">${inner}</div>`;
    }).join("")}</div>`;
    add("nearby", "Nearby", section("nearby", { eyebrow: "Worth the short drive", title: "Nearby beaches and places", intro: d.nearbyIntro, dark: true }, body));
  }

  // FAQs
  if (d.faqs?.length) {
    add("faq", "FAQs", section("faq", { eyebrow: "FAQs", title: `${d.name}: quick answers` },
      `<div class="faq-list">${d.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${md(f.a)}</p></details>`).join("")}</div>`));
  }

  // Sources + photo needs
  const credits = [...new Set([heroImg, d.images?.feature?.path, d.images?.practical?.path, d.images?.todo?.path].filter(Boolean))];
  const sourcesBody = `
    <div class="dg-sources">
      <p>${md(d.editorial || `Surfbooker desk research, checked ${CHECKED_LABEL}. This guide is based on official and operator sources listed below, not on a personal visit. Parking charges, lifeguard dates, dog rules and opening times change — always check the latest information before you travel.`)}</p>
      ${d.sources?.length ? `<ul>${d.sources.map((s) => `<li><a href="${esc(s.url)}" rel="noopener" target="_blank">${esc(s.label)}</a></li>`).join("")}</ul>` : ""}
      ${credits.length ? `<p class="dg-credits">${credits.map((p) => creditLine(p)).join(" · ")}. <a href="/image-credits/">All image credits</a>.</p>` : ""}
    </div>`;
  sections.push(section("sources", { eyebrow: "Sources", title: "How we checked this guide" }, sourcesBody));

  const glance = d.glance?.length ? `
<div class="dg-glance-wrap"><div class="shell"><dl class="dg-glance">${d.glance.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${md(v)}</dd></div>`).join("")}</dl></div></div>` : "";
  const jumpNav = `<nav class="dg-jump" aria-label="${esc(d.name)} sections"><div class="shell">${jump.map(([id, label]) => `<a href="#${id}">${esc(label)}</a>`).join("")}</div></nav>`;

  const jsonLd = [
    breadcrumbLd(crumbs),
    {
      "@type": d.schemaType || "Beach",
      name: d.fullName || d.name,
      description: plain(d.description),
      url: BASE_URL + d.path,
      ...(heroImg ? { image: BASE_URL + "/" + heroImg.split("/").map(encodeURIComponent).join("/") } : {}),
      ...(d.geo ? { geo: { "@type": "GeoCoordinates", latitude: d.geo[0], longitude: d.geo[1] } } : {}),
      containedInPlace: { "@type": "Place", name: d.area || region.name }
    },
    ...(d.faqs?.length ? [faqLd(d.faqs)] : [])
  ];

  const stayLink = (stayHubExists && stays.length) ? { href: `/accommodation/${d.surfbooker.accommodation}/`, label: `Explore accommodation near ${d.name}` } : null;
  return `${head({ title: d.title, description: d.description, path: d.path, image: heroImg, imageAlt: d.heroAlt, jsonLd, preload: heroImg ? heroPreload(heroImg) : "" })}
<body class="destination-guide">
${heroBlock({ eyebrow: d.heroEyebrow || `${d.area || region.name}`, title: d.name, intro: d.heroIntro, crumbs, image: heroImg, imageAlt: d.heroAlt, imagePosition: d.heroPosition, actions: d.heroActions || [["Surf & beach guide", "#overview"], ...(stays.length ? [["Where to stay", "#stay"]] : [])] })}
<main id="main">
${glance}
${jumpNav}
${sections.join("\n")}
</main>
${footer({ stayLink })}
</body>
</html>
`;
}

export async function buildDestinationGuides() {
  const destinations = await loadDestinations();
  let count = 0;
  for (const d of destinations) {
    if (only && d.slug !== only) continue;
    // Devon guides (Croyde, Saunton, Woolacombe…) are David's hand-built pages with his own photos;
    // devon.mjs only feeds the hubs and destination finder, so never overwrite those pages.
    if (d.sourceFile === "devon.mjs") continue;
    const html = renderGuide(d);
    const out = join(root, d.outFile);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html.replace(/\n\s*\n\s*\n+/g, "\n\n"));
    count++;
  }
  return { count, destinations };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { count } = await buildDestinationGuides();
  console.log(`Destination guides written: ${count}. Images used: ${usedImages.size}.`);
}

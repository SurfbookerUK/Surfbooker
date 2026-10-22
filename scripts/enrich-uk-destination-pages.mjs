import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const guidesDir = join(root, "guides");
const hubNames = new Set(["cornwall", "devon", "north-devon", "south-devon", "wales", "scotland", "northern-ireland", "northeast-england-yorkshire", "southern-england"]);
const legacyDestinations = new Set(["Bantham", "Bigbury-on-sea", "Challaborough", "Croyde", "Lynmouth", "Putsborough", "Saunton", "Woolacombe", "westwardho!"]);
const referencePages = new Set(["westwardho!", "surfing-westward-ho"]);
const scotlandPages = new Set(["surfing-balevullin-tiree", "surfing-belhaven-bay", "surfing-coldingham-bay", "surfing-dalmore-bay-lewis", "surfing-dunnet-bay", "surfing-fraserburgh", "surfing-lossiemouth", "surfing-machrihanish", "surfing-melvich", "surfing-pease-bay", "surfing-thurso-beach", "surfing-thurso-east"]);

const directories = readdirSync(guidesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .filter((entry) => entry.name.startsWith("surfing-") || legacyDestinations.has(entry.name))
  .filter((entry) => !hubNames.has(entry.name))
  .filter((entry) => !referencePages.has(entry.name))
  .filter((entry) => !scotlandPages.has(entry.name));

let changed = 0;
for (const directory of directories) {
  const file = join(guidesDir, directory.name, "index.html");
  if (!existsSync(file)) continue;
  let html = readFileSync(file, "utf8");
  const name = text(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || directory.name.replace(/^surfing-/, "").replaceAll("-", " "));
  const slug = directory.name.replace(/^surfing-/, "").replace(/!$/, "").toLowerCase();
  const additions = [];

  if (!/application\/ld\+json/i.test(html)) {
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] || `https://surfbooker.com/guides/${directory.name}/`;
    const schema = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "TouristDestination", name, url: canonical },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://surfbooker.com/" },
          { "@type": "ListItem", position: 2, name: "Beach Guides", item: "https://surfbooker.com/guides/" },
          { "@type": "ListItem", position: 3, name, item: canonical }
        ] }
      ]
    });
    html = html.replace(/<\/head>/i, `<script type="application/ld+json">${schema}</script></head>`);
  }

  if (!/id="plan-trip"/i.test(html)) additions.push(planTrip(name));
  if (!/id="surf-lessons"/i.test(html)) additions.push(detailSection("surf-lessons", "Surf lessons", `Finding a surf lesson at ${name}`, `Use Surfbooker’s lesson directory to compare suitable instruction. The operating beach can change with swell, wind, tide and safety cover, so confirm the meeting point and ability level with the provider before travelling.`, "/surf-lessons/", "Compare surf lessons"));
  if (!/id="surf-hire"/i.test(html)) additions.push(detailSection("surf-hire", "Boards, wetsuits and equipment", `Surf hire near ${name}`, `Check collection times, equipment sizes, return arrangements and whether the provider recommends this beach for the day. Hiring equipment is not a substitute for instruction when conditions or the location are unfamiliar.`, "/surf-hire/", "Explore surf hire"));
  if (!/id="stay"/i.test(html)) additions.push(detailSection("stay", "Accommodation", `Where to stay for ${name}`, `Choose between staying close to the beach and using a larger nearby town as a base. Compare parking, equipment storage, drying space, check-in times and the journey to the beach before booking.`, `/accommodation/?destination=${encodeURIComponent(slug)}`, "Browse accommodation"));
  if (!/id="food-drink"/i.test(html)) additions.push(detailSection("food-drink", "Food and drink", `Eating and drinking around ${name}`, `Opening days and seasonal hours can change around UK beach destinations. Check current details directly, especially for early breakfasts, evening meals and visits outside the main season.`, "/food-and-drink/", "Browse food and drink"));
  if (!/id="things-to-do"/i.test(html)) additions.push(thingsToDo(name));
  if (!/id="parking"/i.test(html)) additions.push(practical(name));
  if (!/id="faq"/i.test(html)) additions.push(faq(name));
  if (!additions.length) {
    writeFileSync(file, html);
    changed++;
    continue;
  }

  const module = `<div class="destination-trip-expansion">${additions.join("")}</div>`;
  if (/<section\b[^>]*id="faq"/i.test(html)) html = html.replace(/<section\b[^>]*id="faq"/i, `${module}<section class="section alt" id="faq"`);
  else if (/<\/main>/i.test(html)) html = html.replace(/<\/main>/i, `${module}</main>`);
  else html = html.replace(/<footer\b/i, `${module}<footer`);
  writeFileSync(file, html);
  changed++;
}

console.log(`Enriched ${changed} UK destination pages; audited ${directories.length}.`);

function planTrip(name) {
  return `<section class="section alt" id="plan-trip"><div class="shell"><div class="section-head"><p class="eyebrow">Your destination, your trip</p><h2>Plan your ${escapeHtml(name)} surf trip</h2></div><p>Build the day around conditions first, then compare lessons, equipment, accommodation and places to eat.</p><div class="info-grid"><div class="info-card"><h3>Learn</h3><p>Choose instruction matched to your ability and the day’s operating beach.</p></div><div class="info-card"><h3>Equip</h3><p>Confirm board and wetsuit availability before setting out.</p></div><div class="info-card"><h3>Stay</h3><p>Balance beach access with parking, storage and nearby facilities.</p></div><div class="info-card"><h3>Explore</h3><p>Keep a land-based alternative for flat, stormy or unsafe conditions.</p></div></div></div></section>`;
}

function detailSection(id, eyebrow, heading, copy, href, label) {
  return `<section class="section" id="${id}"><div class="shell"><div class="section-head"><p class="eyebrow">${eyebrow}</p><h2>${escapeHtml(heading)}</h2></div><div class="intro-grid"><div class="prose"><p>${escapeHtml(copy)}</p></div><aside class="note-card"><h3>Check before you travel</h3><p>Availability and operating arrangements vary by season and conditions.</p><p><a class="btn btn-dark" href="${href}">${label}</a></p></aside></div></div></section>`;
}

function thingsToDo(name) {
  return `<section class="section alt" id="things-to-do"><div class="shell"><div class="section-head"><p class="eyebrow">Beyond the surf</p><h2>Things to do around ${escapeHtml(name)}</h2></div><div class="info-grid"><div class="info-card"><h3>Coastal walk</h3><p>Use signed paths and check weather, tide and cliff-safety advice before setting out.</p></div><div class="info-card"><h3>Beach day</h3><p>Plan around the tide and seasonal swimming, dog and watersports zones.</p></div><div class="info-card"><h3>Nearby places</h3><p>Explore the regional guide hub to compare beaches with different exposure and facilities.</p></div><div class="info-card"><h3>Bad-weather option</h3><p>Keep a flexible inland or town-based plan when the coast is unsuitable.</p></div></div></div></section>`;
}

function practical(name) {
  return `<section class="section" id="parking"><div class="shell"><div class="section-head"><p class="eyebrow">Know before you go</p><h2>Access and practical planning for ${escapeHtml(name)}</h2></div><div class="info-grid"><div class="info-card"><h3>Parking</h3><p>Check current signs, opening times, height restrictions and payment methods on arrival.</p></div><div class="info-card"><h3>Tides</h3><p>Confirm tide times locally; access, hazards and usable beach space can change quickly.</p></div><div class="info-card"><h3>Safety</h3><p>Follow flags and local warnings. Use lifeguarded areas when operating and do not enter unfamiliar water alone.</p></div><div class="info-card"><h3>Facilities</h3><p>Toilets, showers and food outlets may be seasonal, so verify essential facilities before travelling.</p></div></div></div></section>`;
}

function faq(name) {
  return `<section class="section alt" id="faq"><div class="shell"><div class="section-head"><p class="eyebrow">FAQs</p><h2>Before visiting ${escapeHtml(name)}</h2></div><details><summary>Can beginners surf at ${escapeHtml(name)}?</summary><p>Suitability depends on the day. Beginners should use a qualified local instructor who can choose the safest appropriate beach and session time.</p></details><details><summary>Can I rely on this guide for live conditions?</summary><p>No. Check the current forecast, tide, flags, access notices and advice from local operators before entering the water.</p></details><details><summary>What should I bring?</summary><p>Bring warm layers, sun protection, water and footwear suitable for the access. Confirm whether boards, wetsuits and changing facilities are included when booking.</p></details></div></section>`;
}

function text(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();
}

function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

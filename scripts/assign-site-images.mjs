// Gives every photo slot on the site its own image: no photo appears twice anywhere on the site.
//
// Order of preference for each slot (as set by David, Oct 2026):
//   1. a photo of that exact place (Surfbooker's own photos, the guide folders, licensed images and the
//      licensed Wikimedia Commons / Geograph photos in images/commons/<place>/);
//   2. a generic UK beach photo with no recognisable landmark (images/commons/generic-beach/);
//   3. one of Surfbooker's own general surf photos.
// Photos of a specific business (food & drink reviews, school/hire profiles, property photos) stay on
// that business's own page and are never moved onto a different subject.
//
// Runs last in the build.  node scripts/assign-site-images.mjs [--demand] [--dry] [--list]
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, posix } from "node:path";
import { PLACES, placeFromHref, placeFromPage, placeKey } from "./lib/site-places.mjs";

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const SKIP = new Set(["node_modules", ".git", "img", "scripts", "data", "docs", "image-credits"]);
const registry = JSON.parse(readFileSync(join(root, "data/image-registry.json"), "utf8")).images;
const commonsMeta = existsSync(join(root, "data/commons-images.json")) ? JSON.parse(readFileSync(join(root, "data/commons-images.json"), "utf8")) : {};

const enc = (p) => "/" + p.split("/").map(encodeURIComponent).join("/").replace(/%21/g, "!");
const dec = (u) => { try { return decodeURIComponent(u); } catch { return u; } };
const OPTMAP = existsSync(join(root, "data/image-opt-map.json")) ? JSON.parse(readFileSync(join(root, "data/image-opt-map.json"), "utf8")) : {};
function norm(url, pageDir) {
  let u = url.replace(/&amp;/g, "&").split(/[?#]/)[0];
  if (/^(https?:|data:)/.test(u)) return null;
  u = dec(u);
  if (!u.startsWith("/")) u = posix.join("/", pageDir, u);
  u = u.replace(/^\//, "");
  if (OPTMAP[u]) return OPTMAP[u]; // light copy made by tidy-pages.py counts as its original
  // /img/<name>-<width>.webp derivatives count as their source photo.
  const m = u.match(/^img\/(.+)-\d{3,4}\.webp$/);
  if (m) return derivSource.get(m[1]) || u;
  return u;
}
const derivSource = new Map();
const derivName = (path) => path.replace(/\.[a-z0-9]+$/i, "").replace(/^guides\/_licensed-images\//, "lic-").replace(/^images\//, "")
  .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
for (const p of Object.keys(registry)) derivSource.set(derivName(p), p);

// ---- Photo pools -------------------------------------------------------------------------------
const isImg = (f) => /\.(jpe?g|png|webp|avif)$/i.test(f) && !/logo|favicon|icon/i.test(f);
const listDir = (dir) => existsSync(join(root, dir)) ? readdirSync(join(root, dir)).filter(isImg).sort().map((f) => `${dir}/${f}`) : [];
const usable = (p) => existsSync(join(root, p)) && registry[p]?.status !== "blocked";

// Business photos: tied to one subject, never reassigned.
const BUSINESS = (p) => /^images\/(food-drink|accommodation\/properties)\//.test(p)
  || /^guides\/westwardho!\/(main parking|toilets|check before|use lifeg|grass-area|amusements|Food and drink|beginner friendly)/i.test(p)
  || /^images\/(Cabana|cabana|tea on the green|Tea|Waterfront|waterfront|Instow Arms|Boathouse|Glorious Oyster|Kingsley|Crowbar|Memories|Apple Tree|Chickens|Orchard|Burger|Cider|cod goujon|prawn|coffee and cake|cakes cabana|northam coffee|teatro|stairs teatro|tuna toastie|main out front|crow main|The Pierhouse|Pierhouse|The Royal|Durrant|Surf Bay Holiday|Modern Apartment|Westward Ho Accomodation|westward ho accomodation|view from accomodation|North Devon Surf School|Westward Waves|Ho surf|ho-surf|north-devon-surf-school|westward-waves|Westward Ho Beach Front food)/i.test(p);

const GENERIC_OWN = ["Surfers on beach.avif", "generic wave.jpg", "Surfer on wave 2.avif", "Surfers in waves.jpg", "Beach Guides.jpg",
  "lineup.avif", "Sunset surfer sat in water.jpg", "generic surfer.jpeg", "sunset surfers on beach.jpg", "Surfer on water ariel.avif",
  "Surfer on wave.webp", "Surf lessons.jpg", "Surf Hire.jpg", "Things to do.jpg", "Accommodation.jpg", "Food and drink.jpg",
  "Parking and facilities.jpg", "seasonal restrictions.jpg", "help me decide.jpeg"].map((f) => `images/${f}`).filter(usable);
const GENERIC_BEACH = listDir("images/commons/generic-beach").filter(usable);

// Photos of each place, best first.
const placePool = new Map();
const addTo = (key, paths) => { if (!key) return; const a = placePool.get(key) || []; for (const p of paths) if (usable(p) && !a.includes(p)) a.push(p); placePool.set(key, a); };
for (const [path, info] of Object.entries(registry)) {
  if (!usable(path) || BUSINESS(path)) continue;
  let m = path.match(/^guides\/_licensed-images\/(?:uk-destinations|cornwall)\/([^/]+)\.jpg$/);
  if (m) addTo(placeKey(m[1]), [path]);
  m = path.match(/^guides\/(Croyde|Saunton|Woolacombe|Putsborough|Lynmouth|Bantham|Bigbury-on-sea|Challaborough|westwardho!)\//);
  if (m && !info.wrongPlace) addTo(placeKey(m[1]), [path]);
  m = path.match(/^images\/accommodation\/([a-z-]+)\//);
  if (m && m[1] !== "properties") addTo(placeKey(m[1]), [path]);
  if (info.place && /^images\/(IMG_|Instow|Northam|view of westard|westward ho from|Westward ho Beach|beach hut|Westward Ho mini|westward ho go)/i.test(path)) addTo(placeKey(info.placeKey || info.place), [path]);
}
for (const key of existsSync(join(root, "images/commons")) ? readdirSync(join(root, "images/commons")) : []) {
  if (key !== "generic-beach") addTo(key, listDir(`images/commons/${key}`));
}

// ---- Find every photo slot ---------------------------------------------------------------------
const SLOT_RE = /<img\b[^>]*?\bsrc="([^"]+)"[^>]*>|url\((?:&quot;|['"])?([^'")&]+?\.(?:jpe?g|png|webp|avif))(?:&quot;|['"])?\)/gi;
function pagesList() {
  const out = [];
  (function walk(d) {
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (statSync(p).isDirectory()) { if (!SKIP.has(n) && !n.startsWith(".")) walk(p); }
      else if (n.endsWith(".html")) out.push(p.slice(root.length + 1).replace(/\\/g, "/"));
    }
  })(root);
  // Pages about one subject claim photos first; listing/index pages fill in after.
  const handBuilt = (rel) => /^guides\/(westwardho!|Croyde|Saunton|Woolacombe|Putsborough|Lynmouth|Bantham|Bigbury-on-sea|Challaborough)\/index\.html$/.test(rel);
  // Destination guides come before business pages: businesses keep their own photos (claimed separately),
  // but the guide is the page people land on for a place, so it gets first pick of that place's photos.
  const weight = (rel) => handBuilt(rel) ? -2 : rel === "index.html" ? -1
    : /^guides\/[^/]+\/index\.html$/.test(rel) && placeFromPage(rel) ? -0.5
    : /^(food-drink|surf-hire\/providers|surf-schools|accommodation\/stays)\//.test(rel) ? 0
    : placeFromPage(rel) ? 2 : 3;
  return out.sort((a, b) => weight(a) - weight(b) || a.localeCompare(b));
}

function slotsOf(rel, html) {
  const pageDir = posix.dirname(rel);
  const ignore = [...html.matchAll(/<script\b[\s\S]*?<\/script>|<meta\b[^>]*>|<link\b[^>]*>|<noscript[\s\S]*?<\/noscript>/gi)].map((m) => [m.index, m.index + m[0].length]);
  let pagePlace = placeFromPage(rel);
  if (!pagePlace && /^(surf-schools|surf-hire\/providers|surf-shops)\//.test(rel)) {
    // Business profile: use the place named in its title (e.g. "... | Westward Ho!").
    const title = (((html.match(/<title>([^<]*)<\/title>/) || [])[1] || "") + " " + ((html.match(/name="description" content="([^"]*)"/) || [])[1] || "")).toLowerCase();
    let best = null;
    for (const [k, pl] of PLACES) {
      const names = [pl.name, k.replace(/-/g, " ")].filter(Boolean).map((n) => n.toLowerCase().replace(/!/g, "").split(",")[0].trim());
      if (names.some((n) => n.length > 3 && title.replace(/!/g, "").includes(n)) && (!best || k.length > best.length)) best = k;
    }
    pagePlace = best || ({ "ho-surf": "westward-ho" })[rel.split("/").slice(-2, -1)[0]] || null;
  }
  const slots = [];
  for (const m of html.matchAll(SLOT_RE)) {
    if (ignore.some(([a, b]) => m.index >= a && m.index < b)) continue;
    const raw = m[1] || m[2];
    if (/logo|favicon|icon|\.svg/i.test(raw)) continue;
    const key = norm(raw, pageDir);
    if (!key) continue;
    // The card (link) this photo sits in, if any.
    const before = html.slice(Math.max(0, m.index - 1500), m.index);
    const open = Math.max(before.lastIndexOf("<a "), before.lastIndexOf("<article"));
    let href = null;
    if (open !== -1) {
      const tail = before.slice(open);
      if (!/<\/a>|<\/article>/.test(tail)) {
        const win = tail + html.slice(m.index, m.index + 1500).split(/<\/a>|<\/article>/)[0];
        href = (win.match(/href="([^"]+)"/) || [])[1] || null;
      }
    }
    // Inside a <style> block, try the selector text for a place name.
    let cssPlace = null;
    if (!m[1] && !pagePlace) {
      const sel = html.slice(Math.max(0, m.index - 300), m.index).split("}").pop().toLowerCase();
      const tok = (sel.match(/\.(?:destination|guide|dest|place|spot)-([a-z-]+)/) || [])[1];
      if (tok) cssPlace = PLACES.has(placeKey(tok)) ? placeKey(tok) : [...PLACES.keys()].find((k) => k.startsWith(tok)) || null;
      if (!cssPlace) for (const [k] of PLACES) if (k.length > 3 && new RegExp(`[.-]${k}\\b`).test(sel)) { cssPlace = k; break; }
    }
    const place = placeFromHref(href) || cssPlace || pagePlace;
    slots.push({ index: m.index, text: m[0], raw, key, isImg: Boolean(m[1]), href, place });
  }
  return slots;
}

// ---- Assign --------------------------------------------------------------------------------------
const pages = pagesList();
const used = new Map(); // image path -> page that uses it
const demand = new Map();
const changes = [];
const shortfall = new Map();
const pageSlots = new Map();
for (const rel of pages) pageSlots.set(rel, slotsOf(rel, readFileSync(join(root, rel), "utf8")));

// Pass 1: photos already in the right place keep their slot (first page to use them wins).
// Business photos belong to the business's own page first.
const keep = new Set();
// The flagship Westward Ho! guide shows the businesses it features with their own photos.
for (const s of pageSlots.get("guides/westwardho!/index.html") || []) {
  if (BUSINESS(s.key) && !used.has(s.key) && usable(s.key)) { used.set(s.key, "guides/westwardho!/index.html"); keep.add(s); }
}
for (const rel of pages) if (/^(food-drink|surf-hire\/providers|surf-schools|accommodation\/stays)\//.test(rel)) for (const s of pageSlots.get(rel)) {
  if (BUSINESS(s.key) && !used.has(s.key) && usable(s.key)) { used.set(s.key, rel); keep.add(s); }
}
// David's own photos stay where he put them on business pages (schools, shops, hire, food & drink,
// list-your pages) and on the accommodation index hero, even if the same photo appears elsewhere.
const ownKept = [];
const OWN_KEEP_PAGES = /^(surf-schools|surf-shops|surf-hire\/providers|food-drink|food-and-drink|list-your-[^/]+)\//;
const isOwnImage = (k) => !/^images\/commons\//.test(k) && !/^guides\/_licensed-images\//.test(k);
for (const rel of pages) for (const s of pageSlots.get(rel)) {
  const HERO_KEEP = { "accommodation/index.html": "images/Accommodation.jpg", "guides/index.html": "images/Beach Guides.jpg",
    "surf-lessons/westward-ho/index.html": "guides/westwardho!/westward ho 1.jpeg", "surf-hire/westward-ho/index.html": "guides/westwardho!/westward ho 1.jpeg" };
  const heroOfAccommodationIndex = HERO_KEEP[rel] === s.key; // David's chosen top photos
  // A business's own photo stays on every card or page that is about that business.
  if ((OWN_KEEP_PAGES.test(rel) && isOwnImage(s.key)) || heroOfAccommodationIndex || BUSINESS(s.key)) {
    if (usable(s.key)) { keep.add(s); ownKept.push(s.key); }
  }
}
// Destination guides: every photo slot should show the place itself. If the place's photos are all
// taken, borrow one from a lower-priority page (an accommodation or listing page), which then falls
// back to the next unused photo in pass 2.
const isGenGuide = (rel) => /^guides\/surfing-[^/]+\/index\.html$/.test(rel) && placeFromPage(rel);
const priorityHolders = new Set();
for (const rel of pages) if (!/^(accommodation|surf-lessons|surf-hire|surf-shops|food-drink|food-and-drink|surf-schools)\//.test(rel)) for (const s of pageSlots.get(rel)) priorityHolders.add(s.key);
for (const rel of pages.filter(isGenGuide)) for (const s of pageSlots.get(rel)) {
  if (!s.isImg || !s.place || used.has(s.key)) continue;
  const pool = (placePool.get(s.place) || []).filter((p) => usable(p) && !BUSINESS(p));
  if (pool.includes(s.key)) { used.set(s.key, rel); keep.add(s); continue; }
  const pick = pool.find((p) => !used.has(p) && !priorityHolders.has(p));
  if (pick) { used.set(pick, rel); keep.add(s); changes.push({ rel, slot: s, pick, tier: 1 }); }
}
for (const rel of pages) for (const s of pageSlots.get(rel)) {
  if (used.has(s.key) || keep.has(s)) continue;
  const ownPlaced = registry[s.key]?.sourceType === "own-photo" && /^images\/(IMG_|own\/)/.test(s.key); // hand-placed Surfbooker photos
  const fits = BUSINESS(s.key) || ownPlaced || rel === "index.html" ? true : (placePool.get(s.place) || []).includes(s.key) || (!s.place && (GENERIC_BEACH.includes(s.key) || GENERIC_OWN.includes(s.key)));
  if (fits && usable(s.key)) { used.set(s.key, rel); keep.add(s); }
}
// Own photos kept on business pages are now taken, so pass 2 doesn't hand them out again.
for (const k of ownKept) if (!used.has(k)) used.set(k, "(business pages)");
// Pass 2: everything else gets the next unused photo, place first, then generic beach, then own generic.
for (const rel of pages) {
  for (const s of pageSlots.get(rel)) {
    if (keep.has(s)) continue;
    demand.set(s.place || "(generic)", (demand.get(s.place || "(generic)") || 0) + 1);
    const pick = [...(placePool.get(s.place) || []), ...GENERIC_BEACH, ...GENERIC_OWN].find((p) => !used.has(p));
    if (!pick) { shortfall.set(s.place || "(generic)", (shortfall.get(s.place || "(generic)") || 0) + 1); continue; }
    used.set(pick, rel);
    changes.push({ rel, slot: s, pick, tier: (placePool.get(s.place) || []).includes(pick) ? 1 : GENERIC_BEACH.includes(pick) ? 2 : 3 });
  }
}

if (args.has("--demand")) {
  const rows = [...demand].sort((a, b) => b[1] - a[1]);
  const have = (k) => (placePool.get(k) || []).length;
  console.log("place\tslots needing a new photo\tphotos of place in pool");
  for (const [k, n] of rows) console.log(`${k}\t${n}\t${have(k)}`);
  console.log(`total slots ${[...pageSlots.values()].reduce((a, s) => a + s.length, 0)}, kept ${keep.size}, to assign ${[...demand.values()].reduce((a, b) => a + b, 0)}`);
}
const tiers = [1, 2, 3].map((t) => changes.filter((c) => c.tier === t).length);
console.log(`assigned: place ${tiers[0]}, generic beach ${tiers[1]}, own generic ${tiers[2]}; short ${[...shortfall.values()].reduce((a, b) => a + b, 0)}`);
if (shortfall.size) console.log("shortfall by place:", JSON.stringify(Object.fromEntries([...shortfall].sort((a, b) => b[1] - a[1]))));
if (args.has("--list")) for (const c of changes) console.log(`${c.rel}\t${c.slot.key} -> ${c.pick}\t(${c.slot.place || "generic"}, tier ${c.tier})`);

if (!args.has("--dry") && !args.has("--demand")) {
  const human = (p) => p.split("/").pop().replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ").replace(/\bariel\b/gi, "aerial").replace(/\s+\d+$/, "").trim();
  const placeName = (p) => { const m = p.match(/^guides\/([^/_][^/]*)\//); return m ? ({ "westwardho!": "Westward Ho!", "Bigbury-on-sea": "Bigbury-on-Sea" }[m[1]] || m[1]) : null; };
  const altFor = (p) => commonsMeta[p]?.alt || registry[p]?.alt
    || (placeName(p) ? `${human(p).replace(/^./, (c) => c.toUpperCase())}, ${placeName(p)}` : null)
    || (registry[p]?.place && !/surfbooker/i.test(registry[p].place) ? registry[p].place : null)
    || (/^images\/IMG_/.test(p) ? null : human(p).replace(/^./, (c) => c.toUpperCase()));
  const byPage = new Map();
  for (const c of changes) byPage.set(c.rel, [...(byPage.get(c.rel) || []), c]);
  for (const [rel, list] of byPage) {
    let html = readFileSync(join(root, rel), "utf8");
    for (const c of list.sort((a, b) => b.slot.index - a.slot.index)) {
      let to = c.slot.text.replace(c.slot.raw, enc(c.pick));
      if (c.slot.isImg) {
        to = to.replace(/\s(srcset|sizes)="[^"]*"/g, "").replace(/\sstyle="object-position:[^"]*"/, "");
        const alt = altFor(c.pick);
        if (alt) to = /\balt="/.test(to) ? to.replace(/\balt="[^"]*"/, `alt="${alt.replace(/"/g, "&quot;")}"`) : to.replace(/<img\b/, `<img alt="${alt.replace(/"/g, "&quot;")}"`);
      }
      html = html.slice(0, c.slot.index) + to + html.slice(c.slot.index + c.slot.text.length);
      if (c.slot.isImg) {
        const before = html.slice(0, c.slot.index);
        const pic = before.lastIndexOf("<picture");
        if (pic !== -1 && before.lastIndexOf("</picture>") < pic) html = html.slice(0, pic) + html.slice(pic, c.slot.index).replace(/<source\b[^>]*>/g, "") + html.slice(c.slot.index);
      }
    }
    writeFileSync(join(root, rel), html);
  }
  console.log(`updated ${byPage.size} pages`);
}

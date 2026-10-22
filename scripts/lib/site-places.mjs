// Works out which place each page (and each card on a page) is about, so photos can be matched to
// the right beach, village or town. Places are keyed by a normalised name so that "croyde",
// "croyde-bay" and "/guides/Croyde/" all resolve to the same key.
import { loadDestinations } from "../build-destination-guides.mjs";
import { accommodationAreas, publicAccommodationProperties } from "../build-accommodation.mjs";

export const placeKey = (slug) => {
  if (!slug) return null;
  let s = String(slug).toLowerCase().replace(/!/g, "").replace(/_/g, "-");
  const fixed = { "westwardho": "westward-ho", "porth-neigwl": "hells-mouth", "towan-newquay": "towan", "towan-beach-newquay": "towan",
    "great-western": "great-western", "st-ives": "porthmeor", "bigbury": "bigbury-on-sea", "bude": "summerleaze", "newquay": "fistral",
    "hells-mouth-porth-neigwl": "hells-mouth", "rest-bay-porthcawl": "rest-bay", "freshwater-bay-isle-of-wight": "freshwater-bay",
    "portrush-west-strand": "portrush-west", "portrush-east-strand": "portrush-east", "tynemouth-longsands": "tynemouth",
    "dalmore-bay-lewis": "dalmore", "balevullin-tiree": "balevullin", "scarborough-north-bay": "scarborough", "boscombe-pier": "boscombe",
    "gwithian-godrevy": "gwithian", "sennen": "sennen-cove", "st-agnes": "trevaunance", "lynton": "lynmouth" };
  if (fixed[s]) return fixed[s];
  s = s.replace(/-(beach|bay|sands|sand|strand|cove)$/, "");
  return fixed[s] || s;
};

const dests = await loadDestinations();
export const PLACES = new Map(); // key -> { key, name, region, geo, slugs:Set }
function add(slug, name, region, geo) {
  const k = placeKey(slug);
  if (!k) return;
  const p = PLACES.get(k) || { key: k, name, region, geo: null, slugs: new Set() };
  p.slugs.add(slug);
  if (!p.geo && geo) p.geo = geo;
  if (!p.region && region) p.region = region;
  if (!p.name && name) p.name = name;
  PLACES.set(k, p);
}
for (const d of dests) add(d.slug, d.fullName || d.name, d.region, d.geo);
for (const a of accommodationAreas) add(a.slug, a.name, a.regionSlug, null);
add("westward-ho", "Westward Ho!", "north-devon", [51.0402, -4.2373]);
add("clevedon", "Clevedon", "southern-england", [51.4430, -2.8590]);

const propertyArea = new Map(publicAccommodationProperties.map((p) => [p.slug, p.areaSlug]));

// Place a URL path or link points at.
export function placeFromHref(href) {
  if (!href) return null;
  const dest = href.match(/[?&]destination=([a-z0-9-]+)/i);
  if (dest) return placeKey(dest[1]);
  const path = href.split(/[?#]/)[0];
  let m = path.match(/^\/accommodation\/stays\/([^/]+)/);
  if (m) return placeKey(propertyArea.get(m[1]));
  m = path.match(/^\/food-drink\/([^/]+)\//);
  if (m) return placeKey(m[1]);
  m = path.match(/^\/surf-shops\/[^/]+\/([^/]+)\//);
  if (m) return placeKey(m[1]);
  m = path.match(/^\/(?:guides\/surfing-|guides\/|surf-lessons\/|surf-hire\/|accommodation\/)([A-Za-z0-9!-]+)\/?$/);
  if (m && !["stays", "providers"].includes(m[1])) {
    const k = placeKey(m[1]);
    return PLACES.has(k) ? k : null;
  }
  return null;
}

// Place a page is about (from its own path).
export function placeFromPage(rel) {
  const href = "/" + rel.replace(/index\.html$/, "");
  return placeFromHref(href);
}

export function regionOf(key) {
  return PLACES.get(key)?.region || null;
}

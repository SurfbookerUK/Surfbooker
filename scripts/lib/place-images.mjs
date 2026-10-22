// Photos Surfbooker can use for a given place, and a pool of general surf photos.
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const lic = (s) => `guides/_licensed-images/uk-destinations/${s}.jpg`;
const cw = (s) => `guides/_licensed-images/cornwall/${s}.jpg`;
const folder = (dir) => existsSync(join(root, dir))
  ? readdirSync(join(root, dir)).filter((f) => /\.(jpe?g|avif|webp|png)$/i.test(f) && !/heif?$/i.test(f)).sort().map((f) => `${dir}/${f}`)
  : [];

// Extra names a place goes by in URLs.
const ALIAS = {
  sennen: ["sennen-cove"], "sennen-cove": ["sennen-cove"], "summerleaze-beach": ["summerleaze"], bude: ["summerleaze", "widemouth-bay"],
  "towan-beach-newquay": ["towan-beach"], "towan-newquay": ["towan-beach"], "great-western": ["great-western-beach"],
  porthmeor: ["porthmeor-beach"], "st-ives": ["porthmeor-beach"], crantock: ["crantock-beach"], fistral: ["fistral-beach"],
  newquay: ["fistral-beach", "towan-beach", "great-western-beach"], gwithian: ["gwithian-godrevy"], hayle: ["hayle-towans"],
  "st-agnes": ["trevaunance-cove"],
  salcombe: ["bantham"], "kingsbridge-south-hams": ["bantham"], abersoch: ["hells-mouth-porth-neigwl"], "chale-isle-of-wight": ["compton-bay"],
  "trebarwith-strand": ["polzeath"], "mullion-lizard": ["praa-sands"], "praa-sands": ["praa-sands"], "freshwater-bay-isle-of-wight": ["freshwater-bay-isle-of-wight"]
};
const DEVON = {
  "westward-ho": folder("guides/westwardho!"), westwardho: folder("guides/westwardho!"),
  northam: ["guides/westwardho!/Northam Burrows.jpg", "guides/westwardho!/northam-burrows.jpg", "images/view of westard ho across northam burrows.jpg"],
  croyde: folder("guides/Croyde"), saunton: folder("guides/Saunton"), braunton: folder("guides/Saunton"),
  woolacombe: folder("guides/Woolacombe"), mortehoe: folder("guides/Woolacombe"), putsborough: folder("guides/Putsborough"),
  lynmouth: folder("guides/Lynmouth"), lynton: folder("guides/Lynmouth"), bantham: folder("guides/Bantham"),
  "bigbury-on-sea": folder("guides/Bigbury-on-sea"), challaborough: folder("guides/Challaborough"),
  instow: ["images/Instow Sunset 3.JPEG"]
};
export const GENERIC = [...["Surfers on beach.avif", "generic wave.jpg", "Surfer on wave 2.avif", "Surfers in waves.jpg", "Beach Guides.jpg",
  "lineup.avif", "Sunset surfer sat in water.jpg", "generic surfer.jpeg", "sunset surfers on beach.jpg", "Surfer on water ariel.avif",
  "Surfer on wave.webp", "Surf lessons.jpg", "Surf Hire.jpg", "Things to do.jpg"].map((f) => `images/${f}`).filter((p) => existsSync(join(root, p))),
  ...folder("images/commons/generic-beach")];

// Cleared, credited Wikimedia Commons photos kept in images/commons/<place>/ (see data/image-registry.json).
// A place's folder is any folder whose name is the start of its slug (fistral -> fistral-beach, rest-bay -> rest-bay-porthcawl).
const COMMONS_DIRS = existsSync(join(root, "images/commons"))
  ? readdirSync(join(root, "images/commons"), { withFileTypes: true }).filter((d) => d.isDirectory() && d.name !== "generic-beach").map((d) => d.name)
  : [];
function commonsFor(k) {
  const matches = COMMONS_DIRS.filter((d) => k === d || k.startsWith(d + "-"));
  return matches.flatMap((d) => folder(`images/commons/${d}`));
}

export function placeImages(slug) {
  if (!slug) return [];
  const keys = [slug, ...(ALIAS[slug] || [])];
  const out = [];
  for (const k of keys) {
    for (const p of [lic(k), cw(k)]) if (existsSync(join(root, p))) out.push(p);
    if (DEVON[k]) out.push(...DEVON[k]);
    out.push(...commonsFor(k));
  }
  return [...new Set(out)];
}

export function slugFromHref(href) {
  if (!href) return null;
  const dest = href.match(/[?&]destination=([a-z0-9-]+)/);
  if (dest) return dest[1];
  const m = href.match(/^\/(?:guides\/surfing-|surf-lessons\/|surf-hire\/|accommodation\/|surf-shops\/[a-z-]+\/|guides\/)([A-Za-z0-9!-]+)\/?$/);
  if (!m) return null;
  const s = m[1].toLowerCase();
  if (["stays", "providers", "index"].includes(s)) return null;
  return s === "westwardho!" ? "westward-ho" : s;
}


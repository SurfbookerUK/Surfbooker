// Image-rights guard shared by the page builders. Every image a page references must be in
// data/image-registry.json with status "cleared" or "confirm". Blocked images (no licence, stock,
// or the wrong place) are swapped for a licensed photo of the SAME place where one exists.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const registry = JSON.parse(readFileSync(join(root, "data/image-registry.json"), "utf8")).images;
const lic = (slug) => `guides/_licensed-images/uk-destinations/${slug}.jpg`;

// Same-place replacements, keyed by folder or exact file.
const SAME_PLACE = [
  [/^guides\/Croyde\//, lic("croyde")],
  [/^guides\/Saunton\//, lic("saunton")],
  [/^guides\/Woolacombe\//, lic("woolacombe")],
  [/^guides\/Putsborough\//, lic("putsborough")],
  [/^guides\/Lynmouth\//, lic("lynmouth")],
  [/^guides\/Bantham\//, lic("bantham")],
  [/^guides\/Bigbury-on-sea\//, lic("bigbury-on-sea")],
  [/^guides\/Challaborough\//, lic("challaborough")],
  [/^guides\/westwardho!\/Northam Burrows\.jpg$/, "guides/westwardho!/northam-burrows.jpg"],
  [/^guides\/westwardho!\//, "guides/westwardho!/beach-front.jpg"],
  [/^guides\/_licensed-images\/saunton\.jpg$/, lic("saunton")],
  [/^guides\/_licensed-images\/woolacombe\.jpg$/, lic("woolacombe")]
];

export function registryStatus(relPath) {
  return registry[relPath]?.status || null;
}

const isImage = (p) => /\.(jpe?g|png|webp|avif|gif|heic|heif)$/i.test(p);

// Accepts "/guides/Croyde/Croyde%204.jpg" style URLs. Returns a safe URL path or null.
export function safeImageUrl(url) {
  if (!url || /^(https?:|data:)/.test(url)) return url;
  const rel = decodeURIComponent(url.replace(/^\//, "").split(/[?#]/)[0]);
  if (!isImage(rel)) return url;
  if (rel.startsWith("img/")) return url; // generated derivatives of registered images
  const status = registryStatus(rel);
  if (status === "cleared" || status === "confirm" || status === "brand") return url;
  for (const [pattern, replacement] of SAME_PLACE) {
    if (pattern.test(rel) && registryStatus(replacement) === "cleared" && existsSync(join(root, replacement))) {
      return "/" + replacement.split("/").map(encodeURIComponent).join("/");
    }
  }
  return null;
}

// Rewrites <img src>, og/twitter image meta and CSS url() references in a finished HTML page.
export function sanitizeHtmlImages(html, onUnresolved = () => {}) {
  const fix = (url) => {
    const safe = safeImageUrl(url);
    if (safe === null) onUnresolved(url);
    return safe;
  };
  return html
    .replace(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/g, (tag, src) => {
      const safe = fix(src);
      if (safe === null) return "";
      return safe === src ? tag : tag.replace(`src="${src}"`, `src="${safe}"`).replace(/\s(srcset|sizes)="[^"]*"/g, "");
    })
    .replace(/(<meta\s+(?:property|name)="(?:og:image|twitter:image)"\s+content=")https:\/\/surfbooker\.com(\/[^"]+)"/g, (m, pre, path) => {
      const safe = fix(path);
      return `${pre}https://surfbooker.com${safe ?? "/images/brand/logo-background.png"}"`;
    })
    .replace(/url\((['"]?)(\/[^'")]+)\1\)/g, (m, q, path) => {
      const safe = fix(path);
      return safe === null ? "none" : `url(${q}${safe}${q})`;
    });
}

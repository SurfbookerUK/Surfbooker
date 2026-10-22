import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const guides = path.join(root, "guides");
const outputDir = path.join(guides, "_licensed-images", "uk-destinations");
const manifestPath = path.join(root, "data", "uk-destination-image-licenses.json");
fs.mkdirSync(outputDir, { recursive: true });
const forceSlugs = new Set();
const legacyDirectories = new Map([
  ["Bantham", "bantham"], ["Bigbury-on-sea", "bigbury-on-sea"], ["Challaborough", "challaborough"],
  ["Croyde", "croyde"], ["Lynmouth", "lynmouth"], ["Putsborough", "putsborough"],
  ["Saunton", "saunton"], ["Woolacombe", "woolacombe"]
]);
const legacyHeroes = {
  bantham: "beach too.jpeg", "bigbury-on-sea": "zoomed out view.jpeg", challaborough: "ariel beach and town.jpg",
  croyde: "/guides/Croyde/Croyde%20beach%20and%20cliff%20view.jpg", lynmouth: "town street.jpeg",
  putsborough: "beach wide shot main.jpeg", saunton: "Cliff top view.jpg", woolacombe: "ariel whole beach.avif",
  rhosneigr: "/images/guides/rhosneigr-user-large.jpg"
};

const genericHeroes = [
  "/images/lineup.avif",
  "/images/generic%20wave.jpg",
  "/images/generic%20surfer.jpeg",
  "/images/Sunset%20surfer%20sat%20in%20water.jpg",
  "/images/sunset%20surfers%20on%20beach.jpg",
  "/images/Beach%20Guides.jpg",
  "/images/Surfers%20in%20waves.jpg",
  "/images/Surfers%20on%20beach.avif",
  "/images/Surfer%20on%20wave%202.avif",
  "/images/Surfer%20on%20water%20ariel.avif"
];
const pages = fs.readdirSync(guides, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && (entry.name.startsWith("surfing-") || legacyDirectories.has(entry.name)))
  .map((entry) => ({ slug: legacyDirectories.get(entry.name) || entry.name.slice(8), file: path.join(guides, entry.name, "index.html") }))
  .filter(({ file }) => fs.existsSync(file))
  .map((item) => ({ ...item, html: fs.readFileSync(item.file, "utf8") }))
  .filter(({ html, slug }) => genericHeroes.some((hero) => html.includes(hero)) || html.includes(legacyHeroes[slug] || "\0") || forceSlugs.has(slug))
  .map((item) => ({ ...item, name: strip(item.html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || item.slug) }));

const existing = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : { manifestVersion: 1, checkedOn: "2026-09-11", images: [] };
const bySlug = new Map(existing.images.map((item) => [item.slug, item]));

for (const page of pages) {
  if (!forceSlugs.has(page.slug) && bySlug.has(page.slug) && fs.existsSync(path.join(root, bySlug.get(page.slug).localPath.slice(1)))) {
    applyHero(page, bySlug.get(page.slug).localPath);
    continue;
  }
  const candidate = await findCandidate(page.name);
  if (!candidate) {
    console.warn(`No reusable image found: ${page.name}`);
    continue;
  }
  const extension = candidate.mime === "image/png" ? ".png" : ".jpg";
  const localPath = `/guides/_licensed-images/uk-destinations/${page.slug}${extension}`;
  const response = await fetchWithRetry(candidate.thumburl || candidate.url);
  if (!response.ok) throw new Error(`${page.name}: image download failed ${response.status}`);
  fs.writeFileSync(path.join(root, localPath.slice(1)), Buffer.from(await response.arrayBuffer()));
  const record = {
    slug: page.slug,
    location: page.name,
    localPath,
    source: candidate.descriptionurl,
    creator: candidate.artist,
    license: candidate.license,
    licenseUrl: candidate.licenseUrl,
    downloadedOn: "2026-09-11",
    modified: "Downloaded from Wikimedia Commons at a maximum 1600px derivative width; displayed with responsive CSS cropping"
  };
  bySlug.set(page.slug, record);
  applyHero(page, localPath);
  console.log(`Added ${page.name}: ${candidate.title}`);
  await delay(450);
}

existing.images = [...bySlug.values()].sort((a, b) => a.location.localeCompare(b.location));
fs.writeFileSync(manifestPath, JSON.stringify(existing, null, 2) + "\n");
console.log(`Licensed destination images: ${existing.images.length}/${pages.length}`);

async function findCandidate(name) {
  const query = `${name.replace(/&amp;/g, "and")} beach United Kingdom`;
  const params = new URLSearchParams({ action: "query", generator: "search", gsrsearch: query, gsrnamespace: "6", gsrlimit: "12", prop: "imageinfo", iiprop: "url|mime|extmetadata", iiurlwidth: "1600", format: "json", origin: "*" });
  const response = await fetchWithRetry(`https://commons.wikimedia.org/w/api.php?${params}`);
  if (!response.ok) throw new Error(`${name}: Commons search failed ${response.status}`);
  const json = await response.json();
  const candidates = Object.values(json.query?.pages || {}).sort((a, b) => (a.index || 99) - (b.index || 99));
  const tokens = name.toLowerCase().replace(/&amp;/g, "and").split(/[^a-z]+/).filter((token) => token.length > 3 && !["beach","strand","surfing"].includes(token));
  for (const page of candidates) {
    const info = page.imageinfo?.[0], meta = info?.extmetadata || {};
    const license = strip(meta.LicenseShortName?.value || meta.UsageTerms?.value || "");
    const haystack = `${page.title} ${strip(meta.ImageDescription?.value || "")}`.toLowerCase();
    if (!info || !/^image\/(jpeg|png)$/.test(info.mime || "")) continue;
    if (!/(CC|Creative Commons|Public domain|PD)/i.test(license)) continue;
    if (/new zealand|australia|united states|canada/.test(haystack)) continue;
    if (tokens.length && !tokens.some((token) => haystack.includes(token))) continue;
    return { title: page.title, url: info.url, thumburl: info.thumburl, mime: info.mime, descriptionurl: info.descriptionurl, artist: strip(meta.Artist?.value || "Unknown creator"), license, licenseUrl: meta.LicenseUrl?.value || "https://commons.wikimedia.org/wiki/Commons:Licensing" };
  }
  return null;
}

async function fetchWithRetry(url) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(url, { headers: { "User-Agent": "Surfbooker destination research/1.0 (hello@surfbooker.com)" } });
    if (response.status !== 429) return response;
    await delay(1500 * (attempt + 1));
  }
  return fetch(url, { headers: { "User-Agent": "Surfbooker destination research/1.0 (hello@surfbooker.com)" } });
}

function delay(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

function applyHero(page, localPath) {
  let html = fs.readFileSync(page.file, "utf8");
  for (const hero of genericHeroes) html = html.replaceAll(hero, localPath);
  if (legacyHeroes[page.slug]) html = html.replaceAll(legacyHeroes[page.slug], localPath);
  fs.writeFileSync(page.file, html);
}

function strip(value) {
  return String(value).replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
}

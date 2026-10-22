import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const guides = path.join(root, "guides");
const legacy = new Set(["Bantham", "Bigbury-on-sea", "Challaborough", "Croyde", "Lynmouth", "Putsborough", "Saunton", "Woolacombe", "westwardho!"]);
const protectedPages = new Set(["westwardho!", "surfing-westward-ho"]);
const directories = fs.readdirSync(guides, { withFileTypes: true })
  .filter(e => e.isDirectory() && (e.name.startsWith("surfing-") || legacy.has(e.name)))
  .filter(e => fs.existsSync(path.join(guides, e.name, "index.html")));

const manifests = ["data/image-licenses.json", "data/uk-destination-image-licenses.json"].map(file => JSON.parse(fs.readFileSync(path.join(root, file), "utf8")));
const licensedPaths = new Set(manifests.flatMap(m => m.images || m).map(i => decodeURIComponent(i.localPath)));
const failures = [];
const titles = new Map();
const descriptions = new Map();

if (directories.length !== 97) failures.push(`Expected 97 destination pages; found ${directories.length}`);

for (const directory of directories) {
  const file = path.join(guides, directory.name, "index.html");
  const html = fs.readFileSync(file, "utf8");
  const title = capture(html, /<title>([\s\S]*?)<\/title>/i);
  const description = capture(html, /<meta name="description" content="([^"]+)"/i);
  add(titles, title, directory.name);
  add(descriptions, description, directory.name);
  const sections = (html.match(/<section\b/gi) || []).length;
  const words = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  if (words < 700 && !protectedPages.has(directory.name)) failures.push(`${directory.name}: only ${words} visible words`);
  if (sections < 8 && !protectedPages.has(directory.name)) failures.push(`${directory.name}: only ${sections} sections`);
  if (!protectedPages.has(directory.name) && !/id="sources"|Planning sources|Sources consulted/i.test(html)) failures.push(`${directory.name}: no visible research/source section`);
  if (/TODO|\bTBC\b|lorem ipsum|Availability and operating arrangements vary by season/i.test(html)) failures.push(`${directory.name}: unfinished placeholder text`);
  if (!/application\/ld\+json/i.test(html)) failures.push(`${directory.name}: missing JSON-LD`);
  for (const tag of html.match(/<img\b[^>]*>/gi) || []) if (!/\balt\s*=\s*"[^"]*"/i.test(tag)) failures.push(`${directory.name}: image without alt attribute`);
  for (const tag of html.match(/<a\b[^>]*target="_blank"[^>]*>/gi) || []) if (!/\brel="[^"]*noopener/i.test(tag)) failures.push(`${directory.name}: target=_blank link without noopener`);
  if (!protectedPages.has(directory.name)) {
    const hero = capture(html, /--hero-image:url\(['"]?([^'")]+)/i) || capture(html, /\.destination-hero\{[^}]*?url\(["']?([^"')]+)/i);
    const normalized = normalizeHero(hero, file);
    if (!normalized || !licensedPaths.has(normalized)) failures.push(`${directory.name}: hero lacks a matching licence record (${hero || "not found"})`);
  }
}

for (const [value, pages] of titles) if (value && pages.length > 1) failures.push(`Duplicate title on ${pages.join(", ")}`);
for (const [value, pages] of descriptions) if (value && pages.length > 1) failures.push(`Duplicate meta description on ${pages.join(", ")}`);

if (failures.length) {
  console.error(`Destination quality verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Verified destination quality for ${directories.length} UK guides.`);
console.log("Every non-reference guide has 700+ visible words, 8+ sections, sources, schema, safe links, image alt text and a licensed hero.");
console.log("No duplicate destination titles/descriptions or unfinished placeholder text found.");

function capture(html, regex) { return html.match(regex)?.[1]?.trim() || ""; }
function add(map, key, value) { map.set(key, [...(map.get(key) || []), value]); }
function normalizeHero(hero, file) {
  if (!hero) return "";
  if (hero.startsWith("/")) return decodeURIComponent(hero);
  return "/" + path.relative(root, path.resolve(path.dirname(file), decodeURIComponent(hero))).replaceAll("\\", "/");
}

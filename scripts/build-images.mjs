// Generates responsive WebP derivatives for every image listed in data/image-registry.json
// that is cleared for publication. Output: /img/<name>-<width>.webp plus data/image-derivatives.json.
// Requires `sharp` (npm i -D sharp). Derivatives are committed, so the HTML build does not need sharp.
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

const root = process.cwd();
const require = createRequire(import.meta.url);
let sharp;
for (const candidate of ["sharp", "/opt/npm-tools/node_modules/sharp"]) {
  try { sharp = require(candidate); break; } catch { /* try next */ }
}
if (!sharp) {
  console.error("sharp is not installed. Run `npm i -D sharp` then re-run this script.");
  process.exit(1);
}

const registry = JSON.parse(readFileSync(join(root, "data/image-registry.json"), "utf8"));
const outDir = join(root, "img");
mkdirSync(outDir, { recursive: true });
const manifestPath = join(root, "data/image-derivatives.json");
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
const WIDTHS = [480, 800, 1200, 1800];
const force = process.argv.includes("--force");
const only = process.argv.find((arg) => arg.startsWith("--only="))?.slice(7);

export function derivativeName(path) {
  return path
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/^guides\/_licensed-images\//, "lic-")
    .replace(/^images\//, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

let made = 0;
for (const [path, info] of Object.entries(registry.images)) {
  if (info.status === "blocked" || info.sourceType === "surfbooker-brand") continue;
  if (only && !path.includes(only)) continue;
  const src = join(root, path);
  if (!existsSync(src)) { console.warn(`missing ${path}`); continue; }
  const name = derivativeName(path);
  const mtime = statSync(src).mtimeMs;
  const prior = manifest[path];
  if (!force && prior && prior.srcMtime === mtime && prior.files.every((f) => existsSync(join(root, f.file.slice(1))))) continue;
  const base = sharp(src, { failOn: "none" }).rotate();
  const meta = await base.metadata();
  const srcWidth = (meta.orientation >= 5 ? meta.height : meta.width) || 0;
  const srcHeight = (meta.orientation >= 5 ? meta.width : meta.height) || 0;
  const widths = WIDTHS.filter((w) => w < srcWidth * 1.05);
  if (!widths.length || widths[widths.length - 1] < Math.min(srcWidth, 1800) * 0.9) widths.push(Math.min(srcWidth, 1800));
  const files = [];
  try {
  for (const width of [...new Set(widths)]) {
    const file = `/img/${name}-${width}.webp`;
    await sharp(src, { failOn: "none" }).rotate().resize({ width, withoutEnlargement: true })
      .webp({ quality: width >= 1200 ? 72 : 76, effort: 5 }).toFile(join(root, file.slice(1)));
    files.push({ width, file, bytes: statSync(join(root, file.slice(1))).size });
  }
  } catch (error) { console.warn(`failed ${path}: ${error.message.split("\n")[0]}`); continue; }
  manifest[path] = { srcMtime: mtime, width: srcWidth, height: srcHeight, files };
  made++;
}
writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
console.log(`Image derivatives: ${made} source images processed, ${Object.keys(manifest).length} in manifest.`);

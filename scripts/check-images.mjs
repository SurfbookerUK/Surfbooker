// Fails if any published HTML page references an image that is blocked in data/image-registry.json,
// is not in the registry at all, or does not exist on disk. Run after all build steps.
//   node scripts/check-images.mjs            -> summary + non-zero exit on problems
//   node scripts/check-images.mjs --list     -> every problem reference
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const registry = JSON.parse(readFileSync(join(root, "data/image-registry.json"), "utf8")).images;
const assetRedirects = new Map(readFileSync(join(root, "_redirects"), "utf8")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"))
  .map((line) => line.split(/\s+/))
  .filter((parts) => parts.length >= 3 && /^30[1278]!?$/.test(parts[2]))
  .map(([from, to]) => [decodeURIComponent(from).replace(/^\//, ""), decodeURIComponent(to).replace(/^\//, "")]));
const list = process.argv.includes("--list");
const SKIP_DIRS = new Set(["node_modules", ".git", "img", "scripts", "data", "docs", "_backup"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) { if (!SKIP_DIRS.has(name) && !name.startsWith(".")) walk(p, out); }
    else if (/\.(html|css|js)$/.test(name)) out.push(p);
  }
  return out;
}

const IMG = /\.(jpe?g|png|webp|avif|gif|heic|heif|svg)$/i;
const refRe = /(src|href|content|srcset)="([^"]+)"|url\((['"]?)([^'")]+)\3\)|['"](\/[^'"\s]+\.(?:jpe?g|png|webp|avif|gif|heic|heif|JPE?G))['"]/g;
const problems = { blocked: [], unregistered: [], missing: [] };

for (const file of walk(root)) {
  const html = readFileSync(file, "utf8");
  const page = "/" + relative(root, file).replace(/\\/g, "/");
  for (const m of html.matchAll(refRe)) {
    const raw = m[2] || m[4] || m[5];
    for (const part of (m[1] === "srcset" ? raw.split(",") : [raw])) {
      let url = part.trim().split(/\s+/)[0];
      if (!url || !IMG.test(url.split(/[?#]/)[0])) continue;
      if (url.startsWith("https://surfbooker.com/")) url = url.slice("https://surfbooker.com".length);
      if (/^(https?:|data:|\/\/)/.test(url)) continue;
      let rel;
      try { rel = decodeURIComponent(url.split(/[?#]/)[0]); } catch { rel = url; }
      if (!rel.startsWith("/")) rel = join(page.slice(1, page.lastIndexOf("/") + 1), rel).replace(/\\/g, "/");
      rel = rel.replace(/^\//, "");
      if (!existsSync(join(root, rel)) && assetRedirects.has(rel)) rel = assetRedirects.get(rel);
      if (!existsSync(join(root, rel))) { problems.missing.push(`${page} -> ${rel}`); continue; }
      if (rel.startsWith("img/") || /\.svg$/i.test(rel)) continue;
      const status = registry[rel]?.status;
      if (!status) problems.unregistered.push(`${page} -> ${rel}`);
      else if (status === "blocked") problems.blocked.push(`${page} -> ${rel}`);
    }
  }
}

let total = 0;
for (const [kind, items] of Object.entries(problems)) {
  const uniq = [...new Set(items)];
  total += uniq.length;
  console.log(`${kind}: ${uniq.length}`);
  if (list) uniq.forEach((x) => console.log(`  ${x}`));
}
process.exit(total ? 1 : 0);

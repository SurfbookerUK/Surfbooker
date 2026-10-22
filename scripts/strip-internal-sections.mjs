// Removes internal-only sections ("Image rights and outstanding checks", "Sources consulted")
// from any published guide page. Safe to run repeatedly.
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
const root = process.cwd(), base = join(root, "guides");
const re = /<section class="section(?: alt)?" id="(?:photographs|sources)">[\s\S]*?<\/section>\s*/g;
let n = 0;
for (const d of readdirSync(base, { withFileTypes: true })) {
  if (!d.isDirectory()) continue;
  const f = join(base, d.name, "index.html");
  if (!existsSync(f)) continue;
  const h = readFileSync(f, "utf8");
  if (!/Image rights and outstanding checks|>Sources consulted</.test(h)) continue;
  const out = h.replace(re, "");
  if (out !== h) { writeFileSync(f, out); n++; }
}
console.log(`Internal sections removed from ${n} guide pages`);

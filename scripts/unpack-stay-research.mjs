import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
const b = JSON.parse(readFileSync("data/stay-research-bundle.json", "utf8"));
mkdirSync("data/stay-research", { recursive: true });
for (const [f, v] of Object.entries(b)) writeFileSync(`data/stay-research/${f}`, JSON.stringify(v, null, 2) + "\n");
console.log(`Unpacked ${Object.keys(b).length} research files`);

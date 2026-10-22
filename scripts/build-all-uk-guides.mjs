import { spawnSync } from "node:child_process";

const scripts = [
  "build-wales-guides.mjs",
  "build-scotland-guides.mjs",
  "build-northeast-guides.mjs",
  "build-northern-ireland-guides.mjs",
  "build-southern-england-guides.mjs",
  "enrich-uk-destination-pages.mjs",
  "finalise-england-guides.mjs",
  "deepen-western-guides.mjs",
  "source-destination-images.mjs",
  "build-image-credits.mjs",
  "build-sitemap.mjs",
  "verify-destination-quality.mjs",
  "verify-site.mjs"
];

for (const script of scripts) {
  console.log(`Running ${script}`);
  const result = spawnSync(process.execPath, [`scripts/${script}`], {
    cwd: process.cwd(),
    stdio: "inherit"
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log("All UK destination guides built and verified.");

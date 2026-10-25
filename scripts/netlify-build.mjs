// Runs on every Netlify deploy (see netlify.toml) - does what build-all.bat does by hand.
// Generation steps run first, then the checks. If a step fails the deploy stops and
// the previous live version of the site stays up.
import { spawnSync } from "node:child_process";

const steps = [
  "unpack-stay-research",
  "run-accommodation",
  "strip-internal-sections",
  "normalise-guide-links",
  "enrich-hub-intros",
  "build-sitemap",
  "build-image-credits",
  "check-images",
  "verify-site",
];

for (const s of steps) {
  console.log(`\n===== ${s} =====`);
  const r = spawnSync(process.execPath, [`scripts/${s}.mjs`], { stdio: "inherit" });
  if (r.status !== 0) {
    console.error(`\nSTOPPED: ${s} failed - deploy cancelled, live site unchanged.`);
    process.exit(1);
  }
}

// Optional polish (needs Python + Pillow); never blocks a deploy.
for (const py of ["python3", "python"]) {
  const probe = spawnSync(py, ["-c", "import PIL"], { stdio: "ignore" });
  if (probe.status === 0) {
    console.log("\n===== tidy-pages =====");
    const r = spawnSync(py, ["scripts/tidy-pages.py"], { stdio: "inherit" });
    if (r.status !== 0) console.warn("tidy-pages failed - continuing without it.");
    break;
  }
}
console.log("\nALL DONE - everything passed.");

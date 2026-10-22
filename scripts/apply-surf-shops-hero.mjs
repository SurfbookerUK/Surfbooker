import { readFileSync, writeFileSync } from "fs";

const pages = [
  { file: "surf-shops/index.html" },
  { file: "surf-shops/devon/index.html" },
  { file: "surf-shops/north-devon/index.html" },
  { file: "surf-shops/south-devon/index.html" },
  { file: "surf-shops/cornwall/index.html" },
  { file: "surf-shops/north-devon/westward-ho/index.html" },
  { file: "surf-shops/north-devon/saunton/index.html" },
  { file: "surf-shops/north-devon/woolacombe/index.html" },
  { file: "surf-shops/north-devon/croyde/index.html" },
  { file: "surf-shops/north-devon/putsborough/index.html" },
  { file: "surf-shops/south-devon/bigbury-on-sea/index.html" },
  { file: "surf-shops/south-devon/bantham/index.html" }
];

const heroPattern = /<section class="simple-hero">[\s\S]*?<\/section>/;

function titleFromHtml(html) {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  return match ? match[1].replace(/\s*\|\s*Surfbooker$/i, "") : "Surf Shops";
}

for (const { file } of pages) {
  const current = readFileSync(file, "utf8");
  const pageTitle = titleFromHtml(current);
  const hero = `<section class="utility-hero">
        <div class="utility-hero__content">
          <p class="utility-hero__eyebrow">Surf shops</p>
          <h1>${pageTitle}</h1>
          <p>Compare the verified surf-shop pages for this part of the coast.</p>
        </div>
      </section>`;

  if (!heroPattern.test(current)) {
    throw new Error(`No hero block found in ${file}`);
  }

  let updated = current
    .replace(/<link rel="stylesheet" href="\/site-navigation\.css">/, '<link rel="stylesheet" href="/utility-page.css">\n  <link rel="stylesheet" href="/site-navigation.css">')
    .replace(/\s*<nav class="breadcrumbs"[\s\S]*?<\/nav>/, "")
    .replace(heroPattern, hero);

  if (updated === current) {
    throw new Error(`No changes applied to ${file}`);
  }

  writeFileSync(file, updated);
}

console.log(`Updated ${pages.length} surf-shop pages.`);

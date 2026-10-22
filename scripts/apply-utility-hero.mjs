import { readFileSync, writeFileSync } from "fs";

const pages = [
  {
    file: "contact/index.html",
    hero: `<section class="utility-hero">
        <div class="utility-hero__content">
          <p class="utility-hero__eyebrow">Contact Surfbooker</p>
          <h1>Contact Surfbooker</h1>
          <p>Have a question about Surfbooker, a listed surf school or working with us? Send us a message and we&#39;ll get back to you as soon as possible.</p>
        </div>
      </section>`
  },
  {
    file: "claim-or-update-a-listing/index.html",
    hero: `<section class="utility-hero">
        <div class="utility-hero__content">
          <p class="utility-hero__eyebrow">Listing updates</p>
          <h1>Claim or update a listing</h1>
          <p>Use this page to correct Surfbooker listing details, claim a business profile or send updated pricing and practical information.</p>
        </div>
      </section>`
  },
  {
    file: "list-your-school/index.html",
    hero: `<section class="utility-hero">
        <div class="utility-hero__content">
          <p class="utility-hero__eyebrow">For surf schools</p>
          <h1>List or upgrade your surf school</h1>
          <p>Keep your Surfbooker listing accurate and explore options for a more detailed profile.</p>
        </div>
      </section>`
  },
  {
    file: "list-your-surf-school/index.html",
    hero: `<section class="utility-hero">
        <div class="utility-hero__content">
          <p class="utility-hero__eyebrow">Providers</p>
          <h1>List your surf business</h1>
          <p>Use this page if your surf school, surf-hire business or related surf operation is not yet listed on Surfbooker.</p>
        </div>
      </section>`
  },
  {
    file: "privacy/index.html",
    hero: `<section class="utility-hero">
        <div class="utility-hero__content">
          <p class="utility-hero__eyebrow">Privacy</p>
          <h1>Privacy</h1>
          <p>Surfbooker uses form submissions to respond to surf lesson enquiries, provider requests and listing updates.</p>
        </div>
      </section>`
  },
  {
    file: "terms/index.html",
    hero: `<section class="utility-hero">
        <div class="utility-hero__content">
          <p class="utility-hero__eyebrow">Terms</p>
          <h1>Terms</h1>
          <p>Surfbooker is a comparison and enquiry site, not the lesson operator.</p>
        </div>
      </section>`
  },
  {
    file: "image-credits/index.html",
    hero: `<section class="utility-hero">
        <div class="utility-hero__content">
          <p class="utility-hero__eyebrow">Licensing</p>
          <h1>Image credits</h1>
          <p>Creative Commons image credits and licence information for Surfbooker Cornwall guides.</p>
        </div>
      </section>`
  },
  {
    file: "404.html",
    hero: `<section class="utility-hero">
        <div class="utility-hero__content">
          <p class="utility-hero__eyebrow">404</p>
          <h1>Page not found</h1>
          <p>The page you requested is not in the current Surfbooker production site.</p>
          <div class="utility-hero__actions">
            <a class="button button-primary" href="/explore.html">Explore</a>
            <a class="button button-secondary" href="/surf-lessons/">Surf Lessons</a>
            <a class="button button-secondary" href="/surf-hire/">Surf Hire</a>
            <a class="button button-secondary" href="/guides/">Beach Guides</a>
          </div>
        </div>
      </section>`
  }
];

for (const { file, hero } of pages) {
  const current = readFileSync(file, "utf8");
  const updated = current
    .replace(/<link rel="stylesheet" href="\/site-navigation\.css">/, '<link rel="stylesheet" href="/utility-page.css">\n  <link rel="stylesheet" href="/site-navigation.css">')
    .replace(/\s*<nav class="breadcrumbs"[\s\S]*?<\/nav>/, "")
    .replace(/<section class="simple-hero">[\s\S]*?<\/section>/, hero);

  if (updated === current) {
    throw new Error(`No hero block replaced in ${file}`);
  }

  writeFileSync(file, updated);
}

console.log(`Updated ${pages.length} utility pages.`);

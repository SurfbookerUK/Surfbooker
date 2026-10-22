// "How we list businesses" page: explains every label used on Surfbooker listings.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { breadcrumbLd, footer, head, heroBlock } from "./lib/guide-kit.mjs";
const root = join(import.meta.dirname, "..");
const path = "/how-we-list-businesses/";
const crumbs = [["Home", "/"], ["How we list businesses", path]];
const labels = [
  ["reviewed", "Surfbooker review", "We have stayed, eaten, had a lesson or hired kit there ourselves, and the review describes what we found. Reviews are never paid for."],
  ["listed", "Details verified by Surfbooker", "We've checked the business's details directly with the business or from official sources, but haven't reviewed it in person."],
  ["listed", "Listed on Surfbooker", "The business has a profile on Surfbooker, built from its own published information or details it supplied. Not a review."],
  ["researched", "Researched listing — not reviewed", "A business we found in public sources (its own website or the local tourism board) that we think is useful to know about. We haven't reviewed it and have no relationship with it."],
  ["partner", "Surfbooker partner", "A business with a commercial arrangement with Surfbooker, such as a featured profile or an off-season offer. Partners are always labelled, and being a partner never changes what a review says."]
];
const html = `${head({ title: "How We List Businesses | Surfbooker", description: "How Surfbooker chooses and labels surf schools, hire, shops, accommodation, cafés and pubs: reviews, verified details, researched listings and partners.", path, image: null, jsonLd: [breadcrumbLd(crumbs)] })}
<body class="destination-guide">
${heroBlock({ eyebrow: "Trust & transparency", title: "How we list businesses", intro: "Surfbooker is an independent surf travel guide. Here's how we decide what goes on the site and what each label means.", crumbs, image: null, activeNav: "" })}
<main id="main">
<section class="section" id="labels" aria-labelledby="labels-title"><div class="shell">
<div class="section-head"><p class="dg-eyebrow">Labels</p><h2 id="labels-title">What the labels mean</h2></div>
<div class="dg-rows">${labels.map(([cls, name, text]) => `<div class="dg-row"><div><h3><span class="badge ${cls}">${name}</span></h3></div><span></span><p>${text}</p></div>`).join("")}</div>
</div></section>
<section class="section alt" id="principles" aria-labelledby="principles-title"><div class="shell">
<div class="section-head"><p class="dg-eyebrow">Principles</p><h2 id="principles-title">How we work</h2></div>
<div class="info-grid">
<div class="info-card"><h3>Facts come from sources</h3><p>Beach, safety and business details come from the RNLI, councils, the National Trust, tourism boards and businesses' own websites. Each guide lists its sources and the month we checked them.</p></div>
<div class="info-card"><h3>No made-up experiences</h3><p>We only say we've been somewhere when we have. Everything else is clearly marked as researched.</p></div>
<div class="info-card"><h3>Prices and times change</h3><p>We avoid quoting prices and opening hours unless a business publishes them, and we always suggest checking directly before you travel.</p></div>
<div class="info-card"><h3>Enquiries stay with us</h3><p>Accommodation enquiries go through Surfbooker's own forms rather than third-party booking sites, so we can pass them straight to the business.</p></div>
<div class="info-card"><h3>Photos are credited</h3><p>We use our own photos and openly licensed photos, credited on the <a href="/image-credits/">image credits</a> page.</p></div>
<div class="info-card"><h3>Spotted something wrong?</h3><p>Businesses can <a href="/claim-or-update-a-listing/">claim or update a listing</a>, and anyone can <a href="/contact/">tell us about a mistake</a>.</p></div>
</div></div></section>
</main>
${footer()}
</body>
</html>
`;
mkdirSync(join(root, "how-we-list-businesses"), { recursive: true });
writeFileSync(join(root, "how-we-list-businesses/index.html"), html);
console.log("Wrote", path);

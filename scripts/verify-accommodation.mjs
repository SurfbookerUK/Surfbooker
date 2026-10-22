import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  accommodationAreas,
  publicAccommodationProperties
} from "./build-accommodation.mjs";
import {
  accommodationCandidates,
  allAccommodationCandidates,
  unmatchedAccommodationCandidates
} from "../data/accommodation-candidates.mjs";

const rootDir = process.cwd();
const failures = [];
const accommodationDir = join(rootDir, "accommodation");
const htmlFiles = walkHtml(accommodationDir);
const publicNames = new Set(publicAccommodationProperties.map((property) => property.name));
const sourceCandidateAssociations = accommodationCandidates.length + unmatchedAccommodationCandidates.length;

if (sourceCandidateAssociations !== 241) {
  failures.push(`internal queue has ${sourceCandidateAssociations} supplied associations; expected 241`);
}

const actualPropertySlugs = htmlFiles
  .filter((file) => file.replaceAll("\\", "/").includes("/accommodation/stays/"))
  .map((file) => file.replaceAll("\\", "/").match(/\/accommodation\/stays\/([^/]+)\/index\.html$/)?.[1])
  .filter(Boolean)
  .sort();
const expectedPropertySlugs = publicAccommodationProperties.map((property) => property.slug).sort();
if (JSON.stringify(actualPropertySlugs) !== JSON.stringify(expectedPropertySlugs)) {
  failures.push("public property routes do not exactly match page-eligible accommodation records");
}

const allPublicHtml = htmlFiles.map((file) => readFileSync(file, "utf8")).join("\n");
if (/<a\b[^>]*href="https?:\/\//i.test(allPublicHtml)) {
  failures.push("an external anchor appears on a public accommodation page");
}
if (/Accommodation enquiries for [^<]+ through Surfbooker\./i.test(allPublicHtml)) {
  failures.push("generic accommodation-enquiry hero wording appears on a public accommodation page");
}
for (const removedCopy of [
  "The image on this page is a royalty-free or Surfbooker-owned representative location image",
  "Why consider it for a surf trip?",
  "Real properties with practical details limited to information that has been supplied or verified."
]) {
  if (allPublicHtml.includes(removedCopy)) failures.push(`removed accommodation copy is still public: ${removedCopy}`);
}
for (const match of allPublicHtml.matchAll(/<div class="accommodation-hero-content">([\s\S]*?)<\/div>/g)) {
  if (match[1].includes('class="section-label"')) {
    failures.push("an accommodation eyebrow appears inside a public accommodation hero");
    break;
  }
}

const accommodationIndexHtml = readFileSync(join(accommodationDir, "index.html"), "utf8");
const journeyFragments = [
  'id="accommodation-destination-search"',
  'data-destination-filter="all"',
  'data-destination-filter="devon"',
  'data-destination-filter="north-devon"',
  'data-destination-filter="south-devon"',
  'data-destination-filter="cornwall"',
  'class="location-card-grid location-card-grid-large accommodation-direct-destination-grid"'
];
for (const fragment of journeyFragments) {
  if (!accommodationIndexHtml.includes(fragment)) {
    failures.push(`accommodation index is missing direct-destination journey control: ${fragment}`);
  }
}
if (accommodationIndexHtml.includes('id="destination-result-count"') || /\d+ accommodation options?/.test(accommodationIndexHtml)) {
  failures.push("accommodation index still displays destination or accommodation-option counts");
}
for (const area of accommodationAreas) {
  const regionName = area.regionSlug === "cornwall" ? "Cornwall" : area.regionSlug === "south-devon" ? "South Devon" : "North Devon";
  if (area.placeholder || !accommodationIndexHtml.includes(`src="${area.image}"`)) {
    failures.push(`${area.slug}: accommodation index destination card is missing its relevant image`);
  }
  if (!accommodationIndexHtml.includes(`<span class="location-card-region">${regionName}</span>`)) {
    failures.push(`${area.slug}: accommodation index destination card is missing region label ${regionName}`);
  }
}
const accommodationCss = readFileSync(join(rootDir, "accommodation.css"), "utf8");
if (!/\.location-card\[hidden\]\s*\{\s*display:\s*none;\s*\}/.test(accommodationCss)) {
  failures.push("destination filtering does not explicitly hide non-matching cards");
}
if (!/\.accommodation-hero-index\s*>\s*img\s*\{[\s\S]*?height:\s*143%;[\s\S]*?object-position:\s*center top;[\s\S]*?\}/.test(accommodationCss)) {
  failures.push("accommodation index is missing its mobile bottom-30-percent hero crop");
}

for (const area of accommodationAreas) {
  const filePath = join(rootDir, "accommodation", area.slug, "index.html");
  const html = readFileSync(filePath, "utf8");
  const cardImages = [...html.matchAll(/<div class="property-card-image"><img src="([^"]+)"/g)].map((match) => match[1]);
  if (cardImages.length > 1 && new Set(cardImages).size !== cardImages.length) {
    failures.push(`${area.slug}: accommodation tiles reuse the same representative image`);
  }
  const hasProperties = publicAccommodationProperties.some((property) =>
    (property.destinationSlugs || [property.areaSlug]).includes(area.slug)
  );
  const firstPropertyCard = html.indexOf('class="property-card"');
  const planningSummary = html.indexOf('class="accommodation-section destination-stay-summary"');
  if (hasProperties && (firstPropertyCard === -1 || planningSummary === -1 || firstPropertyCard > planningSummary)) {
    failures.push(`${area.slug}: accommodation cards must appear before destination planning content`);
  }
}

for (const candidate of allAccommodationCandidates) {
  if (candidate.status !== "verified" && candidate.pageEligible) {
    failures.push(`${candidate.name} is page eligible without verified status`);
  }
}

for (const candidateName of new Set(accommodationCandidates.map((candidate) => candidate.name))) {
  if (!publicNames.has(candidateName)) failures.push(`mapped supplied candidate has no public accommodation page: ${candidateName}`);
}

for (const match of allPublicHtml.matchAll(/<a class="property-card" href="([^"]+)">([\s\S]*?)<\/a>/g)) {
  const [, href, cardHtml] = match;
  const target = new URL(href, "https://surfbooker.com");
  const slug = target.pathname.match(/^\/accommodation\/stays\/([^/]+)\/$/)?.[1];
  const property = publicAccommodationProperties.find((candidate) => candidate.slug === slug);
  const destination = target.searchParams.get("destination");
  if (!property || target.hash !== "#enquiry" || (destination && !(property.destinationSlugs || [property.areaSlug]).includes(destination))) {
    failures.push(`property card does not target a valid internal enquiry form: ${href}`);
  }
  if (!cardHtml.includes('<span class="property-card-action">Send enquiry</span>')) {
    failures.push(`property card does not use the Send enquiry CTA: ${href}`);
  }
}

for (const property of publicAccommodationProperties) {
  const area = accommodationAreas.find((candidate) => candidate.slug === property.areaSlug);
  const region = area?.regionSlug === "cornwall"
    ? "Cornwall"
    : area?.regionSlug === "south-devon"
      ? "South Devon"
      : "North Devon";
  const pagePath = `/accommodation/stays/${property.slug}/`;
  const filePath = join(rootDir, "accommodation", "stays", property.slug, "index.html");
  if (!existsSync(filePath)) {
    failures.push(`missing public property page: ${property.slug}`);
    continue;
  }
  const html = readFileSync(filePath, "utf8");
  const requiredContext = [
    `name="propertyName" value="${escapeHtml(property.name)}"`,
    `name="propertySlug" value="${property.slug}"`,
    `name="destination" value="${escapeHtml(area?.name || "")}"`,
    `name="region" value="${region}"`,
    'name="enquiryType" value="accommodation"'
  ];
  for (const fragment of requiredContext) {
    if (!html.includes(fragment)) failures.push(`${property.slug}: missing enquiry context (${fragment})`);
  }
  if (!new RegExp(`<form[^>]+name="accommodation-property-enquiry"[^>]+method="POST"[^>]+action="${pagePath}"`, "i").test(html)) {
    failures.push(`${property.slug}: form action is not its internal property route`);
  }
  if (!html.includes("Send an enquiry and Surfbooker will help you check availability directly with the property.")) {
    failures.push(`${property.slug}: required availability wording is missing`);
  }
  const propertyDetailsPosition = html.indexOf("Practical property details.");
  const enquiryPosition = html.indexOf('class="accommodation-section property-enquiry-section"');
  const surfPlanningPosition = html.indexOf("Surfing from here");
  if (propertyDetailsPosition === -1 || enquiryPosition < propertyDetailsPosition || surfPlanningPosition < enquiryPosition) {
    failures.push(`${property.slug}: enquiry form must appear after property details and before surf-planning content`);
  }
  if (!html.includes(`class="property-back-row"><a href="/accommodation/${property.areaSlug}/"`)) {
    failures.push(`${property.slug}: missing direct back link to its destination stays page`);
  }
  if (html.includes('class="accommodation-section property-overview"') || html.includes('<p class="section-label">Surf-trip fit</p>')) {
    failures.push(`${property.slug}: removed property overview or surf-trip-fit block is still public`);
  }
  if ((property.destinationSlugs || [property.areaSlug]).length > 1 && !html.includes("section.dataset.relatedDestination !== requestedDestination")) {
    failures.push(`${property.slug}: shared-destination related stays do not follow enquiry context`);
  }
  for (const destinationSlug of property.destinationSlugs || [property.areaSlug]) {
    const destinationHasAlternatives = publicAccommodationProperties.some((candidate) =>
      candidate.slug !== property.slug && (candidate.destinationSlugs || [candidate.areaSlug]).includes(destinationSlug)
    );
    if (destinationHasAlternatives && !html.includes(`data-related-destination="${destinationSlug}"`)) {
      failures.push(`${property.slug}: missing related-stay collection for ${destinationSlug}`);
    }
  }
  if (property.status === "directory-listed") {
    if (/"@type":"(?:LodgingBusiness|BedAndBreakfast|VacationRental)"/.test(html)) {
      failures.push(`${property.slug}: directory-only page must not publish lodging schema`);
    }
  }
  for (const destinationSlug of property.destinationSlugs || [property.areaSlug]) {
    if (!html.includes(`&quot;${destinationSlug}&quot;`) && !html.includes(`"${destinationSlug}"`)) {
      failures.push(`${property.slug}: enquiry script is missing allowed destination context ${destinationSlug}`);
    }
  }
}

const sitemap = readFileSync(join(rootDir, "sitemap.xml"), "utf8");
for (const property of publicAccommodationProperties) {
  if (!sitemap.includes(`<loc>https://surfbooker.com/accommodation/stays/${property.slug}/</loc>`)) {
    failures.push(`${property.slug}: verified property is missing from sitemap.xml`);
  }
}
if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  const verified = publicAccommodationProperties.filter((property) => property.status === "verified");
  const directoryListed = publicAccommodationProperties.filter((property) => property.status === "directory-listed");
  console.log(`Verified ${verified.length} detailed accommodation properties and ${directoryListed.length} supplied-directory property pages.`);
  console.log(`Checked ${sourceCandidateAssociations} supplied candidate associations (${new Set([...accommodationCandidates, ...unmatchedAccommodationCandidates].map((candidate) => candidate.name)).size} unique names).`);
  console.log("All property-card CTAs and property forms use internal Surfbooker enquiry routes with complete context.");
  console.log("No external links appear on public accommodation pages; representative-image licensing remains recorded centrally.");
}

function walkHtml(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkHtml(path));
    else if (entry.name === "index.html") files.push(path);
  }
  return files;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

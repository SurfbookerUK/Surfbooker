import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { accommodationAreas, publicAccommodationProperties } from "./build-accommodation.mjs";

const rootDir = process.cwd();
const baseUrl = "https://surfbooker.com";
const siteFiles = walk(rootDir);
const htmlFiles = siteFiles.filter((file) => file.endsWith(".html"));
const cssFiles = siteFiles.filter((file) => file.endsWith(".css"));
const indexableHtml = htmlFiles.filter((file) => !file.endsWith("404.html"));
const redirectRules = readRedirectRules();

const failures = [];
const titles = new Map();
const descriptions = new Map();
const h1s = new Map();
const expectedUrls = new Set(["/"]);
const lessonPricingProfiles = new Set([
  "barefoot-surf-school",
  "big-blue-surf-school",
  "big-green-adventures",
  "breakers-surf-school",
  "bude-surfing-experience",
  "cornish-wave",
  "cornwall-surfing-academy",
  "discovery-surf-school",
  "fistral-beach-surf-school",
  "global-boarders",
  "gwithian-academy-of-surfing",
  "hayle-surf-school",
  "harlyn-surf-school",
  "ho-surf",
  "lords-of-down-end",
  "newquay-activity-centre",
  "newquay-surfing-school",
  "nick-thorn-surf-coaching",
  "north-devon-surf-school",
  "oa-surf-club",
  "perranporth-surf-school",
  "quiksilver-surf-school-newquay",
  "sennen-surfing-centre",
  "st-ives-surf-school",
  "stoked-surf-school",
  "surf-sanctuary",
  "surf-saunton",
  "surf-south-west",
  "surfing-croyde-bay",
  "surfing-woolacombe",
  "surfs-up-surf-school",
  "tris-surf-shop",
  "walking-on-waves",
  "wavehunters",
  "westward-waves-surf-school",
  "westcountry-surf-school",
  "woolacombe-surf-centre"
]);

for (const file of htmlFiles) {
  const rel = normalisePath(relative(rootDir, file));
  const html = readFileSync(file, "utf8");
  const pagePath = rel === "index.html" ? "/" : `/${rel.replace(/index\.html$/, "")}`;
  const title = matchFirst(html, /<title>([^<]+)<\/title>/i);
  const description = matchFirst(html, /<meta name="description" content="([^"]+)"/i);
  const canonical = matchFirst(html, /<link rel="canonical" href="([^"]+)"/i);
  const h1 = matchFirst(html, /<h1\b[^>]*>(.*?)<\/h1>/i);
  const lang = matchFirst(html, /<html lang="([^"]+)"/i);
  const robots = matchFirst(html, /<meta name="robots" content="([^"]+)"/i);
  const canonicalPath = canonical.startsWith(baseUrl) ? canonical.replace(baseUrl, "") || "/" : "";

  const navCount = (html.match(/class="sb-primary-nav"/g) || []).length;
  if (pagePath === "/") {
    if (navCount !== 1) {
      failures.push(`${rel}: homepage should contain exactly one primary visitor navigation`);
    }
  } else if (navCount !== 0) {
    failures.push(`${rel}: primary visitor navigation should not appear outside the homepage`);
  }
  if ((html.match(/class="sb-site-footer"/g) || []).length !== 1) {
    failures.push(`${rel}: expected exactly one shared site footer`);
  }
  if ((html.match(/class="sb-footer-group/g) || []).length !== 3) {
    failures.push(`${rel}: shared footer should contain exactly three link groups`);
  }
  if ((html.match(/class="sb-footer-credit"/g) || []).length > 1) {
    failures.push(`${rel}: shared footer contains duplicated photo credits`);
  }
  for (const href of ["/explore.html", "/surf-lessons/", "/surf-hire/", "/guides/", "/accommodation/", "/contact/", "/list-your-school/", "/list-your-accommodation/", "/privacy/", "/terms/"]) {
    if (!new RegExp(`<footer class="sb-site-footer"[\\s\\S]*?href="${href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`, "i").test(html)) {
      failures.push(`${rel}: shared footer is missing ${href}`);
    }
  }

  if (lang !== "en-GB") {
    failures.push(`${rel}: missing or incorrect lang="en-GB"`);
  }

  if (!title) {
    failures.push(`${rel}: missing <title>`);
  }

  if (!description) {
    failures.push(`${rel}: missing meta description`);
  }

  if (!h1) {
    failures.push(`${rel}: missing H1`);
  }

  if (!canonical) {
    failures.push(`${rel}: missing canonical tag`);
  }

  if (
    html.includes('href="/guides/cornwall-guide.css"')
    && /<header class="destination-hero">[\s\S]*?<p class="hero-intro">/i.test(html)
  ) {
    failures.push(`${rel}: Cornwall guide intro copy must sit below the image hero`);
  }

  // David's rule: Surfbooker never links to other websites.
  // The image-credits page must link to each photo's source and licence (a condition of the Creative Commons licences).
  for (const m of html.matchAll(/<a\b[^>]*\bhref="(https?:\/\/[^"]+)"/g)) {
    if (rel.replace(/\\/g, "/").startsWith("image-credits/")) continue;
    if (!/^https?:\/\/(www\.)?surfbooker\.com/.test(m[1])) failures.push(`${rel}: links to another website: ${m[1]}`);
  }
  for (const anchor of extractAnchors(html)) {
    const linksToSchoolOrLesson = /^\/surf-(?:schools|lessons)\//i.test(anchor.href);
    const isHireLabel = anchor.label.length <= 60 && /\b(?:surf|board|wetsuit|equipment)?\s*hire\b/i.test(anchor.label); // long labels are descriptive tiles, not hire CTAs
    const isProviderHireAction = /^(?:View hire details|View Surfbooker hire profile|View dedicated surf-hire page|View shop details)$/i.test(anchor.label)
      || /\b(?:surf|board|wetsuit|equipment)[ -]?(?:hire|rental)\b/i.test(anchor.label);
    const isAllowedExternalEvidence = /^(?:Official|Source:)/i.test(anchor.label) || /^Visit provider website$/i.test(anchor.label);
    if (linksToSchoolOrLesson && isHireLabel) {
      failures.push(`${rel}: hire link points to a school or lesson page: ${anchor.href}`);
    }
    if (rel.startsWith("surf-hire/") && /^\/surf-schools\//i.test(anchor.href)) {
      failures.push(`${rel}: surf-hire page links to a school profile: ${anchor.href}`);
    }
    if (/^https?:\/\//i.test(anchor.href) && isProviderHireAction && !isAllowedExternalEvidence) {
      failures.push(`${rel}: hire action must link to an internal Surfbooker page: ${anchor.href}`);
    }
    if (/^(?:View hire details|View Surfbooker hire profile|View shop details)$/i.test(anchor.label)
      && !/^\/surf-hire\/providers\/[^/]+\/$/i.test(anchor.href)) {
      failures.push(`${rel}: provider hire action has a non-provider destination: ${anchor.href}`);
    }
  }

  for (const article of html.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/gi)) {
    const articleHtml = article[0];
    const articleText = articleHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    if (/\b(?:surf|board|wetsuit|equipment)?\s*hire\b|\brental\b/i.test(articleText)
      && /href="\/surf-(?:schools|lessons)\//i.test(articleHtml)) {
      failures.push(`${rel}: hire-related card links to a school or lesson page`);
    }
  }

  if (rel.startsWith("surf-hire/providers/")) {
    const requiredHireProfileFragments = [
      "<h2>Surf hire prices</h2>",
      "Prices checked August 2026. Availability and final prices should be confirmed directly with the provider.",
      "<h2>Send an enquiry</h2>",
      "We usually reply within 48 hours.",
      'name="surf-hire-enquiry"',
      'name="form-name" value="surf-hire-enquiry"',
      'name="full_name"',
      'name="email"',
      'name="mobile"',
      'name="preferred_hire_date"',
      'name="number_of_people"',
      'name="hire_item"',
      'name="hire_duration"',
      'name="experience_level"',
      'name="message_requirements"',
      'data-netlify="true"',
      'netlify-honeypot="bot-field"',
      '<option>Surfboard</option>',
      '<option>Surfboard and wetsuit</option>',
      '<option>Wetsuit</option>',
      '<option>Bodyboard</option>',
      '<option>SUP</option>',
      '<option>Other / not sure</option>',
      '<option>2 hours</option>',
      '<option>Half day</option>',
      '<option>Full day</option>',
      '<option>Multiple days</option>',
      '<option>Not sure yet</option>',
      "Send hire enquiry</button>",
      "Thanks — your surf hire enquiry has been received. We’ll be in touch as soon as possible.",
      'href="/privacy/"'
    ];
    for (const fragment of requiredHireProfileFragments) {
      if (!html.includes(fragment)) {
        failures.push(`${rel}: incomplete Surf Hire pricing or enquiry form (${fragment})`);
      }
    }
    const pricingSection = matchFirst(html, /(<section class="simple-card simple-copy hire-pricing-section"[\s\S]*?<\/section>)/i);
    if (/href="https?:\/\//i.test(pricingSection) || /\/surf-(?:schools|lessons)\//i.test(pricingSection)) {
      failures.push(`${rel}: Surf Hire pricing section contains a non-internal provider link`);
    }
    for (const fieldName of ["full_name", "email", "mobile", "preferred_hire_date", "number_of_people", "hire_item", "hire_duration"]) {
      if (!new RegExp(`name="${fieldName}"[^>]*required`, "i").test(html)) {
        failures.push(`${rel}: required Surf Hire enquiry field is not required (${fieldName})`);
      }
    }
    if (!new RegExp(`<form[^>]+method="POST"[^>]+action="${pagePath}"`, "i").test(html)) {
      failures.push(`${rel}: Surf Hire enquiry form does not post to its internal provider page`);
    }
    if (extractAnchors(html).some((anchor) => /^https?:\/\//i.test(anchor.href))) {
      failures.push(`${rel}: individual Surf Hire provider page contains an external link`);
    }
    const enquiryScript = matchFirst(html, /(<script>\s*\(\(\) => \{[\s\S]*?encodeHireEnquiry[\s\S]*?<\/script>)/i)
      .replace(/^<script>|<\/script>$/gi, "");
    if (enquiryScript) {
      try {
        new Function(enquiryScript);
      } catch (error) {
        failures.push(`${rel}: Surf Hire enquiry script does not compile (${error.message})`);
      }
    }
  }

  const schoolProfileMatch = rel.match(/^surf-schools\/([^/]+)\/index\.html$/);
  if (schoolProfileMatch && lessonPricingProfiles.has(schoolProfileMatch[1])) {
    for (const fragment of [
      "<h2>Surf lesson prices</h2>",
      "Prices checked August 2026. Availability and final prices should be confirmed directly with the provider.",
      "<h2>Send an enquiry</h2>",
      "We usually reply within 48 hours.",
      'name="lesson-enquiry"',
      'name="form-name" value="lesson-enquiry"',
      'netlify-honeypot="bot-field"',
      'data-netlify="true"'
    ]) {
      if (!html.includes(fragment)) {
        failures.push(`${rel}: incomplete verified lesson pricing or enquiry form (${fragment})`);
      }
    }
    if ((html.match(/class="pricing-section lesson-pricing-section"/g) || []).length !== 1) {
      failures.push(`${rel}: expected exactly one verified lesson pricing section`);
    }
    if (/class="price-card"/.test(html)) {
      failures.push(`${rel}: legacy lesson price cards remain outside the standard pricing section`);
    }
    if (!new RegExp(`<form[^>]+name="lesson-enquiry"[^>]+method="POST"[^>]+action="${pagePath}"`, "i").test(html)) {
      failures.push(`${rel}: lesson enquiry form does not post to its existing internal profile path`);
    }
    const inlineScripts = [...html.matchAll(/<script(?![^>]*(?:\bsrc=|application\/ld\+json))[^>]*>([\s\S]*?)<\/script>/gi)];
    for (const script of inlineScripts) {
      try {
        new Function(script[1]);
      } catch (error) {
        failures.push(`${rel}: inline lesson enquiry script does not compile (${error.message})`);
      }
    }
  }

  if (rel === "list-your-school/index.html") {
    for (const fragment of [
      '<form class="provider-form" id="school-listing-enquiry-form" name="school-listing-enquiry" method="POST" action="/list-your-school/" data-netlify="true" netlify-honeypot="bot-field">',
      '<input type="hidden" name="form-name" value="school-listing-enquiry">',
      'name="name"',
      'name="school_name"',
      'name="email"',
      'name="phone"',
      'name="website"',
      'name="message"',
      'event_type: eventType',
      'track("school_listing_enquiry")'
    ]) {
      if (!html.includes(fragment)) failures.push(`${rel}: incomplete school listing enquiry form or tracking (${fragment})`);
    }
  }

  if (rel === "list-your-accommodation/index.html") {
    for (const fragment of [
      'name="accommodation-listing-enquiry"',
      'name="form-name" value="accommodation-listing-enquiry"',
      'data-netlify="true"',
      'netlify-honeypot="bot-field"',
      'name="property_location"',
      'name="accommodation_type"',
      'name="useful_features"',
      'name="consent"',
      'href="/privacy/"',
      'Thanks — we’ve received your accommodation details and will be in touch.'
    ]) {
      if (!html.includes(fragment)) failures.push(`${rel}: incomplete accommodation listing enquiry form (${fragment})`);
    }
  }

  if (rel.startsWith("accommodation/stays/")) {
    const propertySlug = rel.split("/")[2];
    const property = publicAccommodationProperties.find((candidate) => candidate.slug === propertySlug);
    const area = accommodationAreas.find((candidate) => candidate.slug === property?.areaSlug);
    const expectedRegion = ({ cornwall: "Cornwall", "south-devon": "South Devon", "north-devon": "North Devon", wales: "Wales", scotland: "Scotland", "northern-ireland": "Northern Ireland", "northeast-england-yorkshire": "Northeast England &amp; Yorkshire", "southern-england": "Southern England" })[area?.regionSlug] || "North Devon";
    // Hand-built property pages kept outside the generated data set (linked from destination guides).
    const handBuilt = ["rwts-rooms-and-resto"].includes(propertySlug);
    if ((!property || !area) && !handBuilt) {
      failures.push(`${rel}: public property page has no verified, page-eligible data record`);
    }
    for (const fragment of [
      'name="accommodation-property-enquiry"',
      'name="form-name" value="accommodation-property-enquiry"',
      'name="propertyName"',
      'name="propertySlug"',
      'name="destination"',
      'name="region"',
      'name="enquiryType" value="accommodation"',
      'name="name"',
      'name="email"',
      'name="message"',
      'name="consent"',
      'href="/privacy/"',
      ...(handBuilt ? [] : ['Send an enquiry and Surfbooker will help you check availability directly with the property.']),
      'Send enquiry'
    ]) {
      if (!html.includes(fragment)) failures.push(`${rel}: incomplete property enquiry form (${fragment})`);
    }
    for (const fragment of property && area ? [
      `name="propertyName" value="${escapeForHtmlCheck(property.name)}"`,
      `name="propertySlug" value="${property.slug}"`,
      `name="destination" value="${escapeForHtmlCheck(area.name)}"`,
      `name="region" value="${expectedRegion}"`,
      'name="enquiryType" value="accommodation"'
    ] : []) {
      if (!html.includes(fragment)) failures.push(`${rel}: property enquiry context is incorrect (${fragment})`);
    }
    if (!new RegExp(`<form[^>]+name="accommodation-property-enquiry"[^>]+method="POST"[^>]+action="${pagePath}"`, "i").test(html)) {
      failures.push(`${rel}: property enquiry form does not post to its internal property page`);
    }
  }

  if ((rel.startsWith("accommodation/") || rel === "list-your-accommodation/index.html") && /<a\b[^>]*href="https?:\/\//i.test(html)) {
    failures.push(`${rel}: external links must not appear on public accommodation pages`);
  }

  if (rel.startsWith("accommodation/")) {
    for (const match of html.matchAll(/<a class="property-card" href="([^"]+)">([\s\S]*?)<\/a>/g)) {
      const [, href, cardHtml] = match;
      const target = new URL(href, baseUrl);
      const slug = target.pathname.match(/^\/accommodation\/stays\/([^/]+)\/$/)?.[1];
      const property = publicAccommodationProperties.find((candidate) => candidate.slug === slug);
      const destination = target.searchParams.get("destination");
      const handBuiltStay = slug === "rwts-rooms-and-resto"; // hand-built page with its own enquiry form
      if ((!property && !handBuiltStay) || (destination && property && !(property.destinationSlugs || [property.areaSlug]).includes(destination))) {
        failures.push(`${rel}: property card does not open a valid internal enquiry form (${href})`);
      }
      if (!/<span class="property-card-action">(?:Send enquiry|View stay)<\/span>/.test(cardHtml)) {
        failures.push(`${rel}: property card is missing its Send enquiry CTA`);
      }
    }
  }

  if (canonical && !canonical.startsWith(baseUrl)) {
    failures.push(`${rel}: canonical ${canonical} is not on ${baseUrl}`);
  }

  if (rel !== "404.html" && !robots.toLowerCase().includes("noindex")) {
    expectedUrls.add(canonicalPath || pagePath);
    collectUnique(titles, title, rel, failures, "title");
    collectUnique(descriptions, description, rel, failures, "meta description");
    collectUnique(h1s, h1, rel, failures, "H1");
  }

  for (const href of extractHrefs(html)) {
    if (!href.startsWith("/") || href.startsWith("//")) {
      continue;
    }

    if (href.includes("://") || href.startsWith("/Logo%20") || href === "/styles.css" || href === "/robots.txt" || href === "/sitemap.xml") {
      continue;
    }

    const cleanHref = href.split("#")[0].split("?")[0];
    if (!cleanHref) {
      continue;
    }

    if (/\.(?:avif|css|ico|png|jpg|jpeg|webp|svg|js)$/i.test(cleanHref)) {
      const assetPath = join(rootDir, cleanHref.slice(1));
      if (!existsSync(assetPath)) {
        failures.push(`${rel}: broken internal asset ${href}`);
      }
      continue;
    }

    const target = resolveInternalPath(cleanHref);
    if (!target) {
      failures.push(`${rel}: internal link ${href} resolves outside expected page structure`);
      continue;
    }

    if (!htmlFiles.includes(target)) {
      failures.push(`${rel}: broken internal link ${href}`);
    }
  }

  checkLocalAssets(html, file, rel);
}

const actualPropertyPageSlugs = htmlFiles
  .map((file) => normalisePath(relative(rootDir, file)))
  .filter((rel) => rel.startsWith("accommodation/stays/"))
  .map((rel) => rel.split("/")[2])
  .filter((slug) => slug !== "rwts-rooms-and-resto") // hand-built page, see above
  .sort();
const expectedPropertyPageSlugs = publicAccommodationProperties.map((property) => property.slug).sort();
if (JSON.stringify(actualPropertyPageSlugs) !== JSON.stringify(expectedPropertyPageSlugs)) {
  failures.push("public accommodation property pages do not exactly match verified, page-eligible records");
}

for (const file of cssFiles) {
  const rel = normalisePath(relative(rootDir, file));
  checkLocalAssets(readFileSync(file, "utf8"), file, rel);
}

const robots = readFileSync(join(rootDir, "robots.txt"), "utf8").trim();
if (robots !== "User-agent: *\nAllow: /\nDisallow: /scripts/\nDisallow: /data/\nDisallow: /docs/\nSitemap: https://surfbooker.com/sitemap.xml") {
  failures.push("robots.txt content does not match the required production directives");
}

const sitemap = readFileSync(join(rootDir, "sitemap.xml"), "utf8");
const sitemapUrls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)).map((match) => match[1].replace(baseUrl, "") || "/");
const expectedSitemapUrls = Array.from(expectedUrls).sort();
const actualSitemapUrls = [...sitemapUrls].sort();

if (JSON.stringify(expectedSitemapUrls) !== JSON.stringify(actualSitemapUrls)) {
  failures.push(`sitemap.xml URLs do not match the current production page set`);
}

for (const sitemapPath of sitemapUrls) {
  const directTarget = resolveInternalPath(sitemapPath);
  if (directTarget && htmlFiles.includes(directTarget)) {
    continue;
  }

  const rewrittenPath = applyStaticRewrite(sitemapPath);
  const rewrittenTarget = rewrittenPath ? resolveInternalPath(rewrittenPath) : null;
  if (!rewrittenTarget || !htmlFiles.includes(rewrittenTarget)) {
    failures.push(`sitemap.xml URL ${sitemapPath} has no page or static rewrite target`);
  }
}

if (failures.length) {
  console.error("Verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Verified ${indexableHtml.length} indexable HTML pages plus 404.`);
console.log(`All checked pages have lang, title, meta description, canonical and H1.`);
console.log(`Internal links, robots.txt and sitemap.xml passed static verification.`);

function walk(dir) {
  const entries = readdirSync(dir).map((name) => join(dir, name));
  const files = [];

  for (const entry of entries) {
    const stats = statSync(entry);
    if (stats.isDirectory()) {
      if (entry.endsWith(".git")) {
        continue;
      }
      files.push(...walk(entry));
      continue;
    }
    files.push(entry);
  }

  return files;
}

function matchFirst(text, pattern) {
  const match = text.match(pattern);
  return match ? stripTags(decodeEntity(match[1]).trim()) : "";
}

function extractHrefs(text) {
  return Array.from(text.matchAll(/href="([^"]+)"/g)).map((match) => match[1]);
}

function extractAnchors(text) {
  return Array.from(text.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)).map((match) => ({
    href: match[1],
    label: match[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
  }));
}

function checkLocalAssets(text, sourceFile, sourceRel) {
  for (const reference of extractLocalAssetReferences(text)) {
    const assetPath = resolveAssetPath(reference, sourceFile);
    if (!assetPath) {
      continue;
    }

    if (!existsWithExactCase(assetPath) && !hasValidAssetRedirect(reference, sourceFile)) {
      failures.push(`${sourceRel}: missing or incorrectly cased local asset ${reference}`);
    }
  }
}

function hasValidAssetRedirect(reference, sourceFile) {
  const sourceUrl = reference.startsWith("/")
    ? reference
    : `/${normalisePath(relative(rootDir, resolve(dirname(sourceFile), reference)))}`;
  const rules = readFileSync(join(rootDir, "_redirects"), "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => line.split(/\s+/));
  const rule = rules.find(([from, , status]) => from === sourceUrl && /^30[1278]!?$/.test(status || ""));
  if (!rule) return false;
  return existsWithExactCase(join(rootDir, decodeURIComponent(rule[1]).replace(/^\//, "")));
}

function extractLocalAssetReferences(text) {
  const references = new Set();
  const attributePattern = /\b(?:src|poster)=["']([^"']+)["']/gi;
  const urlPattern = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;
  const srcsetPattern = /\bsrcset=["']([^"']+)["']/gi;
  const metaImagePattern = /<meta\b[^>]*(?:property|name)=["'](?:og:image|twitter:image)["'][^>]*content=["']([^"']+)["'][^>]*>/gi;

  for (const match of text.matchAll(attributePattern)) {
    references.add(match[1].trim());
  }

  for (const match of text.matchAll(urlPattern)) {
    references.add(match[1].trim());
  }

  for (const match of text.matchAll(srcsetPattern)) {
    for (const candidate of match[1].split(",")) {
      const reference = candidate.trim().split(/\s+/)[0];
      if (reference) {
        references.add(reference);
      }
    }
  }

  for (const match of text.matchAll(metaImagePattern)) {
    references.add(match[1].trim());
  }

  return references;
}

function resolveAssetPath(reference, sourceFile) {
  if (reference.startsWith(`${baseUrl}/`)) {
    reference = new URL(reference).pathname;
  }

  if (
    !reference
    || reference.startsWith("#")
    || reference.startsWith("//")
    || /^(?:https?:|data:|blob:|mailto:|tel:|javascript:)/i.test(reference)
  ) {
    return null;
  }

  const cleanReference = reference.split("#")[0].split("?")[0];
  if (!cleanReference) {
    return null;
  }

  let decoded;
  try {
    decoded = decodeURIComponent(cleanReference);
  } catch {
    decoded = cleanReference;
  }

  const assetPath = decoded.startsWith("/")
    ? resolve(rootDir, decoded.slice(1))
    : resolve(dirname(sourceFile), decoded);
  const rel = relative(rootDir, assetPath);

  return rel.startsWith("..") ? null : assetPath;
}

function existsWithExactCase(filePath) {
  const rel = relative(rootDir, filePath);
  if (!rel || rel.startsWith("..")) {
    return false;
  }

  let current = rootDir;
  for (const segment of rel.split(/[\\/]+/)) {
    let entries;
    try {
      entries = readdirSync(current);
    } catch {
      return false;
    }

    if (!entries.includes(segment)) {
      return false;
    }
    current = join(current, segment);
  }

  return existsSync(current);
}

// Netlify rewrites (status 200) such as /guides/surfing-croyde-bay/* -> /guides/Croyde/:splat
function loadRewriteRules() { return existsSync(join(rootDir, "_redirects"))
  ? readFileSync(join(rootDir, "_redirects"), "utf8").split(/\r?\n/)
    .map((line) => line.trim().split(/\s+/))
    .filter((parts) => parts.length >= 3 && parts[2] === "200" && parts[0].endsWith("/*") && parts[1].endsWith("/:splat"))
    .map(([from, to]) => [from.slice(0, -1), to.slice(0, -":splat".length)])
  : []; }
var rewriteRules;

function resolveInternalPath(href) {
  rewriteRules ??= loadRewriteRules();
  for (const [from, to] of rewriteRules) {
    if (href.startsWith(from)) { href = to + href.slice(from.length); break; }
  }
  if (href === "/") {
    return join(rootDir, "index.html");
  }

  if (href.endsWith("/")) {
    return join(rootDir, href.slice(1), "index.html");
  }

  if (href.endsWith(".html")) {
    return join(rootDir, href.slice(1));
  }

  return join(rootDir, href.slice(1), "index.html");
}

function readRedirectRules() {
  const redirectsPath = join(rootDir, "_redirects");
  if (!existsSync(redirectsPath)) {
    return [];
  }

  return readFileSync(redirectsPath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => line.split(/\s+/))
    .filter((parts) => parts.length >= 3 && parts[2] === "200")
    .map(([source, target]) => ({ source, target }));
}

function applyStaticRewrite(pagePath) {
  for (const rule of redirectRules) {
    if (rule.source.endsWith("*")) {
      const prefix = rule.source.slice(0, -1);
      if (pagePath.startsWith(prefix)) {
        return rule.target.replace(":splat", pagePath.slice(prefix.length));
      }
      continue;
    }

    if (rule.source === pagePath) {
      return rule.target;
    }
  }

  return "";
}

function collectUnique(map, value, rel, problems, label) {
  if (!value) {
    return;
  }

  if (map.has(value)) {
    problems.push(`${rel}: duplicate ${label} also used by ${map.get(value)}`);
    return;
  }

  map.set(value, rel);
}

function decodeEntity(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function escapeForHtmlCheck(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function normalisePath(value) {
  return value.replace(/\\/g, "/");
}

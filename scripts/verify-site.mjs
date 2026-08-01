import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const rootDir = process.cwd();
const baseUrl = "https://surfbooker.com";
const htmlFiles = walk(rootDir).filter((file) => file.endsWith(".html"));
const indexableHtml = htmlFiles.filter((file) => !file.endsWith("404.html"));

const failures = [];
const titles = new Map();
const descriptions = new Map();
const h1s = new Map();
const expectedUrls = new Set(["/"]);

for (const file of htmlFiles) {
  const rel = normalisePath(relative(rootDir, file));
  const html = readFileSync(file, "utf8");
  const pagePath = rel === "index.html" ? "/" : `/${rel.replace(/index\.html$/, "")}`;
  const title = matchFirst(html, /<title>([^<]+)<\/title>/i);
  const description = matchFirst(html, /<meta name="description" content="([^"]+)"/i);
  const canonical = matchFirst(html, /<link rel="canonical" href="([^"]+)"/i);
  const h1 = matchFirst(html, /<h1>([^<]+)<\/h1>/i);
  const lang = matchFirst(html, /<html lang="([^"]+)"/i);

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

  if (canonical && canonical !== `${baseUrl}${pagePath}`) {
    failures.push(`${rel}: canonical ${canonical} does not match expected ${baseUrl}${pagePath}`);
  }

  if (rel !== "404.html") {
    expectedUrls.add(pagePath);
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

    const target = resolveInternalPath(cleanHref);
    if (!target) {
      failures.push(`${rel}: internal link ${href} resolves outside expected page structure`);
      continue;
    }

    if (!htmlFiles.includes(target)) {
      failures.push(`${rel}: broken internal link ${href}`);
    }
  }
}

const robots = readFileSync(join(rootDir, "robots.txt"), "utf8").trim();
if (robots !== "User-agent: *\nAllow: /\nSitemap: https://surfbooker.com/sitemap.xml") {
  failures.push("robots.txt content does not match the required production directives");
}

const sitemap = readFileSync(join(rootDir, "sitemap.xml"), "utf8");
const sitemapUrls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)).map((match) => match[1].replace(baseUrl, "") || "/");
const expectedSitemapUrls = Array.from(expectedUrls).sort();
const actualSitemapUrls = [...sitemapUrls].sort();

if (JSON.stringify(expectedSitemapUrls) !== JSON.stringify(actualSitemapUrls)) {
  failures.push(`sitemap.xml URLs do not match the current production page set`);
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
  return match ? decodeEntity(match[1]).trim() : "";
}

function extractHrefs(text) {
  return Array.from(text.matchAll(/href="([^"]+)"/g)).map((match) => match[1]);
}

function resolveInternalPath(href) {
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

function normalisePath(value) {
  return value.replace(/\\/g, "/");
}

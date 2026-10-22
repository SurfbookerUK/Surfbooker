import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { accommodationAreas } from "./build-accommodation.mjs";

const visitorLinks = [
  { label: "Explore", href: "/explore.html", section: "explore" },
  { label: "Surf Lessons", href: "/surf-lessons/", section: "lessons" },
  { label: "Surf Hire", href: "/surf-hire/", section: "hire" },
  { label: "Beach Guides", href: "/guides/", section: "guides" },
  { label: "Accommodation", href: "/accommodation/", section: "accommodation" },
  { label: "Contact", href: "/contact/", section: "contact" }
];

const accommodationCrosslinks = new Map();
for (const area of accommodationAreas) {
  const candidates = [area.guidePath, ...(area.surfLinks || []).map(([, href]) => href)].filter(Boolean);
  for (const href of candidates) {
    if (/\/(?:devon|north-devon|south-devon|cornwall)\/$/.test(href)) continue;
    if (!accommodationCrosslinks.has(href)) accommodationCrosslinks.set(href, area);
  }
}

// Hand-built guides live in folders like /guides/Croyde/ but are served at their canonical
// /guides/surfing-croyde-bay/ address (see _redirects), so match crosslinks on either.
const guideRewrites = new Map();
try {
  for (const line of readFileSync(new URL("../_redirects", import.meta.url), "utf8").split(/\r?\n/)) {
    const m = line.match(/^(\/guides\/[^\s*]+\/)\*\s+(\/guides\/[^\s:]+\/):splat\s+200/);
    if (m) guideRewrites.set(m[2], m[1]);
  }
} catch {}

export function applyVisitorChrome(rootDir) {
  for (const file of walkHtml(rootDir)) {
    const pagePath = pagePathFor(rootDir, file);
    let html = readFileSync(file, "utf8");

    if (!html.includes('href="/site-navigation.css"')) {
      html = html.replace(/<\/head>/i, '  <link rel="stylesheet" href="/site-navigation.css">\n</head>');
    }

    if (pagePath !== "/") {
      html = html.replace(/\s*<nav class="breadcrumbs"[\s\S]*?<\/nav>/, "");
    }

    if (pagePath === "/") {
      html = html.replace(/\s*<div\b[^>]*class="[^"]*\bmobile-nav-links\b[^"]*"[^>]*>[\s\S]*?<\/div>/i, "");
      const primaryNavPattern = /<nav\b[^>]*class="[^"]*\b(?:sb-primary-nav|home-nav|site-nav|topnav)\b[^"]*"[^>]*>[\s\S]*?<\/nav>/i;
      html = html.replace(primaryNavPattern, "");
      const primaryNav = `<nav class="sb-primary-nav" aria-label="Primary navigation">${visitorLinks.map((link) => `<a href="${link.href}">${link.label}</a>`).join("")}</nav>`;
      html = html.replace(/<\/header>/i, `${primaryNav}\n    </header>`);
    } else if (pagePath !== "/") {
      html = html.replace(/\s*<nav\b[^>]*class="sb-primary-nav"[^>]*>[\s\S]*?<\/nav>/i, "");
      html = html.replace(/\s*<header\b[^>]*class="sb-nav-header"[^>]*>[\s\S]*?<\/header>/i, "");
    }

    if (html.includes('class="sb-site-footer"')) {
      html = html.replace(/<footer\b[^>]*class="[^"]*\bsb-site-footer\b[^"]*"[^>]*>[\s\S]*?<\/footer>/gi, (footer) => renderFooter(footer));
    } else {
      html = html.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi, (footer) => renderFooter(footer));
    }
    html = html.replace(/\s*<aside class="sb-accommodation-crosslink"[\s\S]*?<\/aside>/i, "");
    const accommodationArea = accommodationCrosslinks.get(pagePath) || accommodationCrosslinks.get(guideRewrites.get(pagePath));
    if (accommodationArea && !pagePath.startsWith("/accommodation/")) {
      const crosslink = `<aside class="sb-accommodation-crosslink" aria-label="Accommodation planning"><span>Plan where to stay</span><a href="/accommodation/${accommodationArea.slug}/">Explore accommodation in ${escapeHtml(accommodationArea.name)}</a></aside>`;
      html = html.replace(/(<footer\b)/i, `${crosslink}\n$1`);
    }
    html = html.replace(/(<footer class="sb-site-footer">)\s+(<nav class="sb-footer-group")/g, "$1\n    $2");
    writeFileSync(file, html, "utf8");
  }
}

function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function renderFooter(previousFooter) {
  const creditMatch = previousFooter.match(/(Photo:[\s\S]*?<a\b[^>]*href="\/image-credits\/"[^>]*>Full image credits<\/a>)/i);
  const credit = creditMatch ? `<p class="sb-footer-credit">${creditMatch[1]}</p>` : "";
  return `<footer class="sb-site-footer">${credit ? `\n    ${credit}` : ""}
    <nav class="sb-footer-group" aria-label="Visitor links">
      <a href="/explore.html">Explore</a>
      <a href="/surf-lessons/">Surf Lessons</a>
      <a href="/surf-hire/">Surf Hire</a>
      <a href="/guides/">Beach Guides</a>
      <a href="/accommodation/">Accommodation</a>
      <a href="/contact/">Contact</a>
    </nav>
    <nav class="sb-footer-group sb-footer-business" aria-label="Business links">
      <a href="/list-your-school/">List or upgrade your surf school</a>
      <a href="/list-your-accommodation/">List your accommodation</a>
    </nav>
    <nav class="sb-footer-group" aria-label="Legal links">
      <a href="/privacy/">Privacy Policy</a>
      <a href="/terms/">Terms &amp; Conditions</a>
      <a href="/image-credits/">Image credits</a>
    </nav>
    <p class="sb-footer-meta">&copy; 2026 Surfbooker. All rights reserved. <a href="mailto:hello@surfbooker.com">hello@surfbooker.com</a></p>
  </footer>`;
}

function activeSection(pagePath) {
  if (pagePath === "/" || pagePath === "/explore.html") return "explore";
  if (pagePath.startsWith("/surf-lessons/") || pagePath.startsWith("/surf-schools/")) return "lessons";
  if (pagePath.startsWith("/surf-hire/")) return "hire";
  if (pagePath.startsWith("/guides/")) return "guides";
  if (pagePath.startsWith("/accommodation/")) return "accommodation";
  if (pagePath.startsWith("/contact/")) return "contact";
  return "";
}

function pagePathFor(rootDir, file) {
  const rel = relative(rootDir, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  return `/${rel.replace(/index\.html$/, "")}`;
}

function walkHtml(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    if (name === ".git" || name === "node_modules") continue;
    const entry = join(dir, name);
    const stats = statSync(entry);
    if (stats.isDirectory()) files.push(...walkHtml(entry));
    else if (entry.endsWith(".html")) files.push(entry);
  }
  return files;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  applyVisitorChrome(process.cwd());
}

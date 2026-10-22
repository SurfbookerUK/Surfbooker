// Shared helpers for Surfbooker guide and hub pages: escaping, images (registry-checked, responsive),
// page shell (head, hero, footer) and structured data.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const BASE_URL = "https://surfbooker.com";
export const CHECKED_LABEL = "October 2026";
const root = process.cwd();

export const esc = (value) => String(value ?? "")
  .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

// Inline markup allowed in content strings: **bold** and [text](url). Everything else is escaped.
export function md(text) {
  let out = esc(text);
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    const url = href.replaceAll("&amp;", "&");
    const external = /^https?:/.test(url);
    return `<a href="${esc(url)}"${external ? ' rel="noopener" target="_blank"' : ""}>${label}</a>`;
  });
  return out;
}

const registry = JSON.parse(readFileSync(join(root, "data/image-registry.json"), "utf8")).images;
const derivatives = existsSync(join(root, "data/image-derivatives.json"))
  ? JSON.parse(readFileSync(join(root, "data/image-derivatives.json"), "utf8")) : {};

export const usedImages = new Set();

export function imageInfo(path) {
  const info = registry[path];
  if (!info) throw new Error(`Image not in data/image-registry.json: ${path}`);
  if (info.status === "blocked") throw new Error(`Blocked image (no cleared rights) referenced: ${path}`);
  return info;
}

export function encodePath(path) {
  return "/" + path.split("/").map(encodeURIComponent).join("/");
}

// Responsive <img>. sizes defaults to full width.
export function picture(path, { alt, sizes = "100vw", className = "", loading = "lazy", fetchpriority = "", position = "", ratio = "" } = {}) {
  imageInfo(path);
  usedImages.add(path);
  const d = derivatives[path];
  const style = [position ? `object-position:${position}` : "", ratio ? `aspect-ratio:${ratio}` : ""].filter(Boolean).join(";");
  const attrs = [
    className ? `class="${className}"` : "",
    `alt="${esc(alt)}"`,
    `loading="${loading}"`,
    `decoding="async"`,
    fetchpriority ? `fetchpriority="${fetchpriority}"` : "",
    style ? `style="${style}"` : ""
  ].filter(Boolean).join(" ");
  if (d && d.files?.length) {
    const largest = d.files[d.files.length - 1];
    const fallback = d.files.find((f) => f.width >= 1200) || largest;
    const height = Math.round(d.height * (fallback.width / d.width));
    return `<img src="${fallback.file}" srcset="${d.files.map((f) => `${f.file} ${f.width}w`).join(", ")}" sizes="${sizes}" width="${fallback.width}" height="${height}" ${attrs}>`;
  }
  return `<img src="${encodePath(path)}" ${attrs}>`;
}

export function heroPreload(path) {
  const d = derivatives[path];
  if (!d || !d.files?.length) return "";
  return `<link rel="preload" as="image" imagesrcset="${d.files.map((f) => `${f.file} ${f.width}w`).join(", ")}" imagesizes="100vw" fetchpriority="high">`;
}

export function ogImage(path) {
  if (!path) return `${BASE_URL}/images/brand/logo-background.png`;
  const d = derivatives[path];
  const file = d?.files?.find((f) => f.width >= 1200)?.file || encodePath(path);
  return BASE_URL + file;
}

export function creditLine(path) {
  const info = imageInfo(path);
  if (info.sourceType === "wikimedia-commons") {
    return `Photo: <a href="${esc(info.sourceUrl)}" rel="noopener" target="_blank">${esc(info.creator)}</a>, <a href="${esc(info.licenceUrl)}" rel="noopener" target="_blank">${esc(info.licence)}</a>, via Wikimedia Commons`;
  }
  if (info.sourceType === "own-photo" || info.sourceType === "assumed-own-photo") return "Photo: Surfbooker";
  return info.credit ? `Photo: ${esc(info.credit)}` : "";
}

export const NAV = [
  ["Beach guides", "/guides/"],
  ["Surf lessons", "/surf-lessons/"],
  ["Surf hire", "/surf-hire/"],
  ["Accommodation", "/accommodation/"],
  ["Contact", "/contact/"]
];

export function head({ title, description, path, image, imageAlt = "", jsonLd = [], preload = "", extraCss = [] }) {
  const url = BASE_URL + path;
  return `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${esc(url)}">
  <meta name="theme-color" content="#0f2a33">
  <meta property="og:locale" content="en_GB">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Surfbooker">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${esc(url)}">
  <meta property="og:image" content="${esc(ogImage(image))}">
  ${imageAlt ? `<meta property="og:image:alt" content="${esc(imageAlt)}">` : ""}
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Serif&display=swap" rel="stylesheet">
  ${preload}
  <link rel="stylesheet" href="/destination-guide.css">
  <link rel="stylesheet" href="/site-navigation.css">
  ${extraCss.map((href) => `<link rel="stylesheet" href="${href}">`).join("\n  ")}
  ${jsonLd.length ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": jsonLd })}</script>` : ""}
</head>`;
}

export function heroBlock({ eyebrow, title, intro, crumbs, image, imageAlt, imagePosition, actions = [], activeNav = "/guides/" }) {
  const media = image
    ? `<figure class="dg-hero-media">${picture(image, { alt: imageAlt, loading: "eager", fetchpriority: "high", position: imagePosition })}</figure>`
    : "";
  return `<a class="skip-link" href="#main">Skip to content</a>
<header class="dg-hero${image ? "" : " no-photo"}">
  ${media}
  <div class="dg-topbar">
    <a class="dg-brand" href="/" aria-label="Surfbooker home"><img src="/images/brand/logo-transparent-fbs.png" alt="Surfbooker" width="168" height="84"></a>
    <nav class="dg-nav" aria-label="Main">${NAV.map(([label, href]) => `<a href="${href}"${href === activeNav ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</nav>
  </div>
  <div class="dg-hero-inner">
    <ol class="dg-crumbs" aria-label="Breadcrumb">${crumbs.map(([label, href], i) => `<li>${href && i < crumbs.length - 1 ? `<a href="${href}">${esc(label)}</a>` : `<span aria-current="page">${esc(label)}</span>`}</li>`).join("")}</ol>
    ${eyebrow ? `<p class="dg-eyebrow">${esc(eyebrow)}</p>` : ""}
    <h1>${esc(title)}</h1>
    ${intro ? `<p class="dg-hero-intro">${md(intro)}</p>` : ""}
    ${actions.length ? `<div class="dg-hero-actions">${actions.map(([label, href], i) => `<a class="btn ${i === 0 ? "btn-light" : "btn-ghost"}" href="${href}">${esc(label)}</a>`).join("")}</div>` : ""}
  </div>
  ${image ? `<p class="dg-hero-credit">${creditLine(image)}</p>` : ""}
</header>`;
}

export function footer({ stayLink } = {}) {
  return `${stayLink ? `<aside class="sb-accommodation-crosslink" aria-label="Accommodation planning"><span>Plan where to stay</span><a href="${stayLink.href}">${esc(stayLink.label)}</a></aside>\n` : ""}<footer class="sb-site-footer">
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
      <a href="/how-we-list-businesses/">How we list businesses</a>
    </nav>
    <p class="sb-footer-meta">&copy; 2026 Surfbooker. All rights reserved. <a href="mailto:hello@surfbooker.com">hello@surfbooker.com</a></p>
  </footer>`;
}

export function breadcrumbLd(crumbs) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(([name, href], i) => ({ "@type": "ListItem", position: i + 1, name, item: BASE_URL + href }))
  };
}

export function faqLd(faqs) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") } }))
  };
}

export const plain = (text) => String(text ?? "").replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

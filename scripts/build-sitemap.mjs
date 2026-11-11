import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const rootDir = process.cwd();
const baseUrl = "https://surfbooker.com";
const buildDate = new Date().toISOString().slice(0, 10);

function walkHtmlFiles(directory) {
  const files = [];
  for (const name of readdirSync(directory)) {
    if (name === ".git" || name === "node_modules") continue;
    const entry = join(directory, name);
    const stats = statSync(entry);
    if (stats.isDirectory()) files.push(...walkHtmlFiles(entry));
    else if (entry.endsWith(".html")) files.push(entry);
  }
  return files;
}

// Pages that 301 somewhere else must not be listed: read the redirect sources from _redirects.
const redirected = new Set();
try {
  for (const line of readFileSync(join(rootDir, "_redirects"), "utf8").split(/\r?\n/)) {
    const [from, , status] = line.trim().split(/\s+/);
    if (!from || from.startsWith("#") || !from.startsWith("/") || !/^30[12]/.test(status || "")) continue;
    redirected.add(from.replace(/\/\*$/, "").replace(/\/$/, "") || "/");
  }
} catch {}

const urls = new Set();
for (const file of walkHtmlFiles(rootDir)) {
  if (file.endsWith("404.html")) continue;
  const html = readFileSync(file, "utf8");
  if (/name="robots"\s+content="[^"]*noindex/i.test(html)) continue;
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  if (!canonical?.startsWith(baseUrl)) continue;
  const path = canonical.slice(baseUrl.length).replace(/\/$/, "") || "/";
  if (redirected.has(path)) continue;
  urls.add(canonical);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...urls].sort().map((url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${buildDate}</lastmod>
  </url>`).join("\n")}
</urlset>
`;

writeFileSync(join(rootDir, "sitemap.xml"), sitemap);
console.log(`Wrote ${urls.size} canonical URLs to sitemap.xml`);

// Search polish for beach guide pages, run on every Netlify deploy. Safe to run repeatedly.
//   1. Guide titles: "<Beach> Surf Guide, Lessons & Local Guide" becomes "<Beach> Surfing: Conditions, Lessons & Hire",
//      matching how people search ("bantham surfing", "croyde bay surfing", "saunton surf").
//   2. Titles over 65 characters are shortened so Google does not cut them off mid-word.
//   3. FAQ rich results: adds FAQPage structured data built from the visible "Quick answers" questions on each guide.
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const base = join(process.cwd(), "guides");
const esc = (s) => s.replace(/&/g, "&amp;");
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&nbsp;/g, " ");
const text = (s) => decode(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

// Where the page name is shorter than the way people search for the place.
const NAMES = { Croyde: "Croyde Bay" };

let titles = 0, faqs = 0, scanned = 0;
for (const d of readdirSync(base, { withFileTypes: true })) {
  if (!d.isDirectory()) continue;
  const f = join(base, d.name, "index.html");
  if (!existsSync(f)) continue;
  let h = readFileSync(f, "utf8");
  const before = h;
  scanned++;

  // 1. title
  const tm = h.match(/<title>([^<]*?) Surf Guide, Lessons (?:&amp;|&) Local Guide \| Surfbooker<\/title>/);
  if (tm) {
    const beach = NAMES[tm[1]] || tm[1];
    const title = `${beach} Surfing: Conditions, Lessons &amp; Hire | Surfbooker`;
    h = h.replace(tm[0], `<title>${title}</title>`);
    h = h.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${beach} Surfing: Conditions, Lessons &amp; Hire$2`);
    h = h.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${beach} Surfing: Conditions, Lessons &amp; Hire$2`);
    titles++;
  }

  // 2. FAQPage schema from the visible FAQ section
  if (!/"@type"\s*:\s*"FAQPage"/.test(h)) {
    const sec = h.match(/<section[^>]*id="faq"[^>]*>([\s\S]*?)<\/section>/);
    if (sec) {
      const items = [...sec[1].matchAll(/<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>\s*([\s\S]*?)<\/details>/g)]
        .map((m) => ({ q: text(m[1]), a: text(m[2]) }))
        .filter((x) => x.q && x.a);
      if (items.length >= 2) {
        const ld = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
        };
        const tag = `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>\n`;
        if (h.includes("</head>")) { h = h.replace("</head>", tag + "</head>"); faqs++; }
      }
    }
  }

  if (h !== before) writeFileSync(f, h);
}

// ---- long titles (guides, accommodation hubs and stay pages) ----
const MAX = 65;
const SUFFIX = " | Surfbooker";
function fitTitle(raw) {
  const plain = decode(raw);
  if (plain.length <= MAX) return null;
  let parts = plain.split(" | ").map((s) => s.trim());
  if (parts[parts.length - 1] !== "Surfbooker") return null;
  parts.pop();
  while (parts.length > 1 && (parts.join(" | ") + SUFFIX).length > MAX) parts.splice(parts.length - 1, 1);
  let main = parts.join(" | ");
  if ((main + SUFFIX).length > MAX && main.includes(": ")) {
    const [head, rest] = [main.slice(0, main.indexOf(": ")), main.slice(main.indexOf(": ") + 2)];
    const items = rest.split(/,\s*|\s+&\s+/);
    while (items.length && (`${head}: ${items.join(", ")}` + SUFFIX).length > MAX) items.pop();
    main = items.length ? `${head}: ${items.join(", ")}` : head;
  }
  while ((main + SUFFIX).length > MAX && /(, | and )[^,]*$/.test(main)) main = main.replace(/(, | and )[^,]*$/, "").trim();
  const out = main + SUFFIX;
  return out.length < plain.length ? esc(out) : null;
}
let shortened = 0;
function walkTitles(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { walkTitles(p); continue; }
    if (e.name !== "index.html") continue;
    const h = readFileSync(p, "utf8");
    const m = h.match(/<title>([^<]*)<\/title>/);
    if (!m) continue;
    const next = fitTitle(m[1]);
    if (next && next !== m[1]) { writeFileSync(p, h.replace(m[0], `<title>${next}</title>`)); shortened++; }
  }
}
for (const root of ["guides", "accommodation"]) if (existsSync(join(process.cwd(), root))) walkTitles(join(process.cwd(), root));
console.log(`SEO polish: ${titles} guide titles updated, ${faqs} FAQ schemas added (${scanned} guide folders checked), ${shortened} long titles shortened.`);

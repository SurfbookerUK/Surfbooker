"""Final tidy pass over every page (run last, after assign-site-images):
- meta descriptions longer than 160 characters are cut back to the last full sentence (or word) that fits;
- local <img> tags without width/height get an aspect-ratio style from the real image size, so the
  browser reserves the space and the page doesn't jump while photos load."""
import os, re, json, html, urllib.parse
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cache_file = os.path.join(ROOT, "data/image-sizes.json")
sizes = json.load(open(cache_file)) if os.path.exists(cache_file) else {}

def size(src):
    k = urllib.parse.unquote(src.split("?")[0].split("#")[0]).lstrip("/")
    if k not in sizes:
        p = os.path.join(ROOT, k)
        try:
            with Image.open(p) as im: sizes[k] = im.size
        except Exception: sizes[k] = None
    return sizes[k]

def trim(desc):
    d = html.unescape(desc)
    if len(d) <= 160: return desc
    cut = d[:160]
    m = max(cut.rfind(". "), cut.rfind("! "), cut.rfind("? "))
    if m >= 90: out = cut[:m + 1]
    else: out = re.sub(r"[\s,;:–—-]+\S*$", "", cut).rstrip(" ,;:–—-") + "."
    return html.escape(out, quote=True).replace("&#x27;", "&#39;")

IMG = re.compile(r"<img\b[^>]*>")
def fix_img(tag):
    if re.search(r"\bwidth=", tag) and re.search(r"\bheight=", tag): return tag
    if "aspect-ratio" in tag: return tag
    src = (re.search(r'\bsrc="([^"]+)"', tag) or [None, ""])[1]
    if not src.startswith("/") or "Logo" in src: return tag
    wh = size(src)
    if not wh: return tag
    ar = f"aspect-ratio:{wh[0]}/{wh[1]}"
    if re.search(r'\bstyle="', tag): return re.sub(r'\bstyle="', f'style="{ar};', tag, 1)
    return tag[:-1].rstrip("/").rstrip() + f' style="{ar}">'

# David's rule: no links from Surfbooker to other websites. External <a> tags become plain text
# (an "Official website" link becomes the site's domain written out, so visitors can still find it).
EXT = re.compile(r'<a\b[^>]*\bhref="(https?://[^"]+)"[^>]*>(.*?)</a>', re.S)
def unlink(m):
    url, inner = m.group(1), m.group(2)
    host = re.sub(r"^https?://(www\.)?", "", url).split("/")[0]
    if host.endswith("surfbooker.com"): return m.group(0)
    text = re.sub(r"<[^>]+>", "", inner).strip()
    if re.match(r"(?i)official website|visit (provider )?website|website", text):
        return f'<span class="sb-domain">{host}</span>'
    return f"<span>{inner}</span>"

# Heavy original photos (over 400 KB) are served as a 1600px WebP copy in img/opt/ instead;
# the originals stay untouched for the image registry and future edits.
os.makedirs(os.path.join(ROOT, "img/opt"), exist_ok=True)
optmap_file = os.path.join(ROOT, "data/image-opt-map.json")
optmap = json.load(open(optmap_file)) if os.path.exists(optmap_file) else {}
def light(src):
    k = urllib.parse.unquote(src).lstrip("/")
    f = os.path.join(ROOT, k)
    if k.startswith("img/") or not os.path.isfile(f) or os.path.getsize(f) <= 400_000: return src
    name = re.sub(r"[^a-z0-9]+", "-", k.lower().rsplit(".", 1)[0]).strip("-") + ".webp"
    out = os.path.join(ROOT, "img/opt", name)
    if not os.path.exists(out) or os.path.getmtime(out) < os.path.getmtime(f):
        with Image.open(f) as im:
            from PIL import ImageOps
            im = ImageOps.exif_transpose(im).convert("RGB"); im.thumbnail((1600, 1600)); im.save(out, quality=76)
            sizes[f"img/opt/{name}"] = im.size
    optmap[f"img/opt/{name}"] = k
    return "/img/opt/" + name
REF = re.compile(r'(src="|url\(\'|url\(")(/[^"\')]+\.(?:jpe?g|png|webp|avif|JPE?G|PNG))')

nd = ni = 0
for r, d, f in os.walk(ROOT):
    if any(x in r for x in ("/node_modules", "/.git", "/scripts", "/docs")): continue
    for x in f:
        if not x.endswith(".html"): continue
        p = os.path.join(r, x); s = open(p, encoding="utf8").read(); t = s
        t = re.sub(r'(<meta name="description" content=")([^"]*)(")', lambda m: m.group(1) + trim(m.group(2)) + m.group(3), t, 1)
        t = EXT.sub(unlink, t)
        t = REF.sub(lambda m: m.group(1) + light(m.group(2)), t)
        t2 = IMG.sub(lambda m: fix_img(m.group(0)), t)
        ni += t2 != t; t = t2
        if t != s: open(p, "w", encoding="utf8").write(t); nd += 1
json.dump(sizes, open(cache_file, "w"))
json.dump(optmap, open(optmap_file, "w"), indent=1)
print(f"tidy-pages: updated {nd} pages ({ni} with image sizes)")

# Keep GA4 on pages created by future rebuilds.
GA4_ID = "G-VTE8HWZG0S"
GA4_TAG = """<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-VTE8HWZG0S"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-VTE8HWZG0S');
</script>"""
GA4_EXCLUDED_DIRS = {"scripts", "data", "docs", "netlify", "node_modules", ".git", ".vscode", "img"}
ga4_updated = 0
ga4_skipped = []
for r, d, f in os.walk(ROOT):
    d[:] = [name for name in d if name not in GA4_EXCLUDED_DIRS]
    for x in f:
        if not x.endswith(".html"): continue
        p = os.path.join(r, x)
        s = open(p, encoding="utf8").read()
        if GA4_ID in s: continue
        head = re.search(r"<head>", s, re.I)
        if not head:
            ga4_skipped.append(os.path.relpath(p, ROOT).replace(os.sep, "/"))
            continue
        t = s[:head.end()] + "\n" + GA4_TAG + "\n" + s[head.end():]
        open(p, "w", encoding="utf8").write(t)
        ga4_updated += 1
print(f"tidy-pages: added GA4 to {ga4_updated} pages; skipped {len(ga4_skipped)} without <head>")

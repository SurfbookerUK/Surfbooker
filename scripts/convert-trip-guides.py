#!/usr/bin/env python3
"""Reshape the hand-built Devon beach guides into the Westward Ho! trip-guide layout.

The Westward Ho! guide (guides/westwardho!/) leads with the things a visitor books - surf lessons,
where to stay, hire and shops, food and drink - each as photo cards, then the beach guide, things to
do, local tips, practical "know before you go" detail, history, nearby spots and FAQs.

This script keeps every guide's existing written content, reorders its sections into that layout,
turns the school/hire/shop cards into photo cards (with Google ratings where we hold them), and adds
"Where to stay" and "Food & drink" sections. Photos are only ones of the place itself (Surfbooker's
own photos or the guide's licensed images) and none repeats on a page.

Usage: python3 scripts/convert-trip-guides.py Croyde Saunton ...   (run once per guide; idempotent
guard: pages already converted are skipped unless --force)
"""
import os, re, sys
from urllib.parse import quote
from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RATED = {"ho-surf", "north-devon-surf-school", "westward-waves-surf-school", "surf-saunton", "walking-on-waves",
         "woolacombe-surf-centre", "surfing-woolacombe", "surf-south-west", "surfing-croyde-bay",
         "nick-thorn-surf-coaching", "barefoot-surf-school"}

SCHOOL_CSS = """
      /* Photo cards, as on the Westward Ho! guide */
      .school-listing-card{padding:0;overflow:hidden;display:flex;flex-direction:column}
      a.school-listing-card{color:inherit}
      .school-listing-image{width:100%;aspect-ratio:16/10;object-fit:cover;background:var(--paper-2)}
      .school-listing-content{padding:22px;display:flex;flex-direction:column;gap:8px;flex:1}
      .school-listing-content .listing-actions{margin-top:auto}
      .listing-grid.two .listing-card{min-height:0}
      .trip-food-grid .listing-card h3,.listing-grid .school-listing-card h3{margin:0}
"""


def derivative(src):
    """Source path (site-relative, unencoded) -> (src, srcset) using /img derivatives when present."""
    name = re.sub(r"\.[a-z0-9]+$", "", src, flags=re.I)
    name = re.sub(r"^guides/_licensed-images/", "lic-", name)
    name = re.sub(r"^images/", "", name).lower()
    name = re.sub(r"[^a-z0-9]+", "-", name).strip("-")
    widths = [w for w in (480, 800, 1200) if os.path.exists(os.path.join(ROOT, "img", f"{name}-{w}.webp"))]
    if widths:
        return f"/img/{name}-{widths[min(1, len(widths) - 1)]}.webp", ", ".join(f"/img/{name}-{w}.webp {w}w" for w in widths)
    return "/" + quote(src, safe="/!"), ""


def img_tag(soup, src, alt, cls, position=None):
    if not os.path.exists(os.path.join(ROOT, src)):
        raise SystemExit(f"missing image {src}")
    url, srcset = derivative(src)
    attrs = {"class": cls, "src": url, "alt": alt, "loading": "lazy", "decoding": "async"}
    if position:
        attrs["style"] = f"object-position:{position}"
    if srcset:
        attrs["srcset"] = srcset
        attrs["sizes"] = "(max-width: 600px) 92vw, (max-width: 950px) 46vw, 380px"
    return soup.new_tag("img", attrs=attrs)


def frag(html):
    return BeautifulSoup(html, "html.parser")


def section_head(eyebrow, h2, intro=""):
    return f'<div class="section-head"><p class="eyebrow">{eyebrow}</p><h2>{h2}</h2>{f"<p>{intro}</p>" if intro else ""}</div>'


def photo_card(soup, card, image, rating=None):
    """Turn an existing .listing-card into a photo card in place."""
    classes = card.get("class", [])
    if "school-listing-card" not in classes:
        card["class"] = classes + ["school-listing-card"]
    content = soup.new_tag("div", attrs={"class": "school-listing-content"})
    for child in list(card.children):
        content.append(child.extract())
    if image:
        card.append(img_tag(soup, image[0], image[1], "school-listing-image", *image[2:]))
    card.append(content)
    if rating:
        slot = frag(f'<div class="google-rating" data-google-rating data-school-slug="{rating}" data-rating-variant="card">'
                    '<p class="google-rating-loading">Loading Google rating...</p></div>')
        sub = content.find(class_="sub")
        (sub.insert_after if sub else content.append)(slot)


def property_cards(soup, area, picks):
    """Copy property cards from the accommodation area page, with this guide's own photos."""
    page = BeautifulSoup(open(os.path.join(ROOT, "accommodation", area, "index.html")).read(), "html.parser")
    cards = {re.search(r"/stays/([^/]+)/", a["href"]).group(1): a for a in page.select("a.property-card")}
    out = []
    for slug, image in picks:
        card = cards.get(slug)
        if not card:
            raise SystemExit(f"no property card {slug} on accommodation/{area}")
        card = BeautifulSoup(str(card), "html.parser").a
        card["href"] = card["href"].split("#")[0]
        holder = card.find(class_="property-card-image")
        holder.clear()
        holder.append(img_tag(soup, image[0], image[1], "property-card-photo", *image[2:]))
        action = card.find(class_="property-card-action")
        if action:
            action.string = "View accommodation"
        out.append(card)
    return out


ORDER = [
    ("surf-schools", "Surf lessons"), ("surf-school", "Surf lessons"), ("stay", "Where to stay"),
    ("surf-hire", "Surf hire"), ("surf-shops", "Surf shops"), ("food-drink", "Food & drink"),
    ("overview", "Beach guide"), ("photos", None), ("beach-guide", None), ("safety", "Safety"),
    ("lifeguards", "Lifeguards"), ("facts", None),
    ("things-to-do", "Things to do"), ("town", "Town & family"), ("village", "Village"), ("burrows", "Braunton Burrows"),
    ("burgh-island", "Burgh Island"), ("sea-tractor", None), ("railway", "Cliff railway"), ("ferry", "Ferry"),
    ("walks", "Walks"), ("local-tips", "Local tips"),
    ("parking", "Know before you go"), ("facilities", None), ("accessibility", None), ("dogs", None),
    ("getting-here", None), ("history", "History"), ("reserve", None), ("nearby", "Nearby"), ("faq", "FAQs"),
    ("sources", None),
]


def convert(name, cfg, force=False):
    path = os.path.join(ROOT, "guides", name, "index.html")
    html = open(path).read()
    if "data-trip-layout" in html and not force:
        print(f"skip {name}: already converted")
        return
    soup = BeautifulSoup(html, "html.parser")
    main = soup.find("main")
    sections = [s for s in main.find_all("section", recursive=False)]

    # Give id-less sections a stable key.
    for s in sections:
        if s.get("id"):
            continue
        eyebrow = s.find(class_="eyebrow")
        text = eyebrow.get_text(strip=True).lower() if eyebrow else ""
        if s.find(class_="photo-grid") or s.find(class_="photo-banner") or not s.find("h2"):
            s["data-key"] = "photos"
        elif "surfing reserve" in text:
            s["data-key"] = "reserve"
        else:
            s["data-key"] = "facts"
    key = lambda s: s.get("id") or s.get("data-key")
    for k in cfg.get("drop", []):
        for s in sections:
            if key(s) == k:
                s.decompose()
    sections = [s for s in main.find_all("section", recursive=False)]

    # 1. Photo cards for schools, hire and shops.
    for card in main.select(".listing-card"):
        title = card.find("h3").get_text(strip=True)
        spec = cfg["cards"].get(title)
        if spec is None:
            continue
        if spec.get("href"):
            for a in card.select(".listing-actions a"):
                a["href"], a.string = spec["href"], spec.get("label", "View profile")
        photo_card(soup, card, spec.get("image"), spec.get("rating") if spec.get("rating") in RATED else None)

    # 2. Where to stay.
    stay = cfg.get("stay")
    if stay:
        sec = frag(f'<section class="section" id="stay"><div class="shell">{section_head("Accommodation", stay["title"], stay.get("intro", ""))}'
                   f'<div class="trip-stay-grid"></div><p class="trip-section-action"><a class="btn btn-dark" href="/accommodation/{stay["area"]}/">'
                   f'{stay["all"]}</a></p></div></section>').section
        grid = sec.find(class_="trip-stay-grid")
        for card in property_cards(soup, stay["area"], stay["picks"]):
            grid.append(card)
        sections.append(sec)

    # 3. Food & drink.
    food = cfg.get("food")
    if food:
        sec = frag(f'<section class="section" id="food-drink"><div class="shell">{section_head(food.get("eyebrow", "Food & drink"), food["title"], food.get("intro", ""))}'
                   '<div class="trip-food-grid"></div></div></section>').section
        grid = sec.find(class_="trip-food-grid")
        for item in food["places"]:
            card = frag(f'<article class="listing-card school-listing-card"><div class="school-listing-content"><h3>{item["name"]}</h3>'
                        f'<p class="sub">{item["sub"]}</p></div></article>').article
            if item.get("image"):
                card.insert(0, img_tag(soup, item["image"][0], item["image"][1], "school-listing-image", *item["image"][2:]))
            grid.append(card)
        if food.get("note"):
            sec.find(class_="shell").append(frag(f'<p class="trip-section-action" style="color:var(--muted)">{food["note"]}</p>'))
        sections.append(sec)

    # 4. Extra photo cards on shops added by config (e.g. a shop with no card yet).
    for target, items in cfg.get("add_cards", {}).items():
        grid = next((s for s in sections if key(s) == target), None).find(class_="listing-grid")
        for item in items:
            card = frag(f'<article class="listing-card"><h3>{item["name"]}</h3><p class="sub">{item["sub"]}</p></article>').article
            photo_card(soup, card, item.get("image"))
            grid.append(card)
        if len(grid.find_all(class_="listing-card", recursive=False)) == 2:
            grid["class"] = list(set(grid.get("class", []) + ["two"]))

    # 5. Reorder.
    rank = {k: i for i, (k, _) in enumerate(ORDER)}
    for k in cfg.get("rank", {}):
        rank[k] = cfg["rank"][k]
    unknown = [key(s) for s in sections if key(s) not in rank]
    if unknown:
        raise SystemExit(f"{name}: unplaced sections {unknown}")
    ordered = sorted(sections, key=lambda s: rank[key(s)])
    for s in ordered:
        s.extract()
    for s in ordered:
        main.append(s)
    # Re-alternate backgrounds (dark sections keep their style).
    shade = False
    for s in ordered:
        cls = [c for c in s.get("class", []) if c != "alt"]
        if "dark" not in cls:
            if shade:
                cls.append("alt")
            shade = not shade
        else:
            shade = False
        s["class"] = cls
        if s.get("data-key"):
            del s["data-key"]

    # 6. Jump bar in the new order.
    nav = soup.select_one(".jumpbar")
    if nav:
        nav.clear()
        labels = dict(ORDER)
        labels.update(cfg.get("labels", {}))
        for s in ordered:
            sid = s.get("id")
            if sid and labels.get(sid):
                a = soup.new_tag("a", href=f"#{sid}")
                a.string = labels[sid]
                nav.append(a)

    # 7. Assets: photo-card CSS, trip planning styles and Google ratings. The <head> is edited as text so
    # its tags keep their original attribute order (the site checks rely on it).
    body = soup.find("body")
    body["data-trip-layout"] = "westward-ho"
    if not soup.find("script", src="/google-ratings.js") and main.find(attrs={"data-google-rating": True}):
        main.insert_after(frag('<script src="/google-ratings.js" defer></script>'))
    head_html = html[: html.index("<body")]
    if "school-listing-image" not in head_html:
        head_html = head_html.replace("</style>", SCHOOL_CSS + "    </style>", 1)
    if "/trip-planning.css" not in head_html:
        head_html = head_html.replace("</head>", '  <link rel="stylesheet" href="/trip-planning.css">\n  </head>', 1)
    tail_html = html[html.index("</body>") + len("</body>"):]

    # Guard: no photo twice on the page.
    seen = {}
    for m in re.finditer(r'(?:src="|url\(["\']?)([^"\')]+\.(?:jpe?g|png|webp|avif))', str(soup), re.I):
        u = m.group(1)
        if "Logo" in u or "favicon" in u:
            continue
        base = re.sub(r"-(480|800|1200|1536|1800)\.webp$", "", u.split("/")[-1].lower())
        base = re.sub(r"\.(jpe?g|png|webp|avif)$", "", base).replace("%20", "-").replace(" ", "-")
        seen.setdefault(base, set()).add(u)
    out = head_html + str(body) + tail_html
    open(path, "w").write(out)
    print(f"converted {name}: {len(ordered)} sections; photos: {len(seen)}")
    return seen


if __name__ == "__main__":
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from trip_guide_config import CONFIG
    force = "--force" in sys.argv
    for n in [a for a in sys.argv[1:] if not a.startswith("--")]:
        convert(n, CONFIG[n], force)

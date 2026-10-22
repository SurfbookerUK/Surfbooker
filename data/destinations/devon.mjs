// Devon destination guides (excluding the Westward Ho! benchmark page, which stays hand-built).
// Content carried over from Surfbooker's September 2026 hand-built pages, moved into the shared
// template so they use licensed images only. Output files stay in the original folders, which
// Netlify serves at the canonical /guides/surfing-*/ URLs via _redirects rewrites.
const lic = (slug) => `guides/_licensed-images/uk-destinations/${slug}.jpg`;
const own = (n) => `images/IMG_${n}.JPEG`;
const base = (slug, dir, region, extra) => ({
  region,
  path: `/guides/surfing-${slug}/`,
  outFile: `guides/${dir}/index.html`,
  slug,
  ...extra
});
const RNLI = { label: "RNLI — find a lifeguarded beach", url: "https://rnli.org/find-my-nearest/lifeguarded-beaches" };
const WSR = { label: "North Devon World Surfing Reserve", url: "https://www.northdevonworldsurfingreserve.org/" };
const devonEditorial = "Written by Surfbooker in September 2026 and moved to this layout in October 2026. Surf schools and hire companies marked 'Listed on Surfbooker' have profiles on this site; unless a page says 'Surfbooker review', we haven't reviewed them in person. Recheck parking, flags, tide and lifeguard cover before travelling.";
const lessonsNote = "Schools marked 'Listed on Surfbooker' have profiles on this site with lesson details. Surfbooker passes on enquiries but hasn't reviewed them in person.";

export const destinations = [
  base("croyde-bay", "Croyde", "north-devon", {
    name: "Croyde",
    fullName: "Croyde Bay",
    area: "Croyde, North Devon",
    geo: [51.1310, -4.2370],
    title: "Croyde Surf Guide: Surf Schools, Hire, Tides, Parking & Dogs | Surfbooker",
    description: "Croyde Bay surf guide: three surf schools, board hire, how the tide changes the waves, parking, the summer dog ban, where to eat and stay, Baggy Point and nearby beaches.",
    heroIntro: "One of North Devon's best-known surf beaches — a compact sandy bay with powerful waves, a proper surf-village atmosphere and Baggy Point right next door.",
    heroAlt: "Croyde Bay beach with dunes and the headland beyond",
    images: {
      hero: lic("croyde"),
      feature: { path: own(7577), position: "75% 55%", alt: "The Thatch pub in Croyde village with flower boxes outside", caption: "The Thatch in Croyde village.", heading: "A real surf village", text: "Croyde has pubs, cafés, surf shops and accommodation within walking distance of the beach — and the South West Coast Path starts at the end of the lane." }
    },
    glance: [
      ["Best for", "Intermediates; learners with a school"],
      ["Break", "Powerful sandy beach break"],
      ["Lifeguards", "Seasonal patrol"],
      ["Dogs", "Not allowed 1 May–30 Sep"],
      ["Schools", "Three on Surfbooker"],
      ["Wind", "East to south-east is offshore"]
    ],
    overview: [
      "Croyde sits on the west-facing North Devon coast between Saunton Sands and Baggy Point. Its compact sandy bay, dunes and traditional village make it one of the most distinctive surf destinations in the country.",
      "The beach can produce fast, hollow and powerful waves, particularly as the tide drops. Smaller summer conditions are much more approachable, but tide, swell, wind and crowds can completely change the experience.",
      "For a more forgiving beach day, Saunton Sands and Woolacombe are both close by."
    ],
    suits: ["Intermediate and experienced surfers", "Learners with a surf school on small days", "Surf trips with a village atmosphere"],
    notFor: ["Dogs on the beach in summer", "Quiet line-ups in peak season"],
    surf: {
      intro: "A compact, powerful beach break.",
      text: [
        "Croyde is a west-facing sandy bay framed by Down End to the south and Baggy Point to the north. It produces lefts and rights and becomes fast, hollow and powerful as the tide drops.",
        "Mid tide is often the most manageable. Low tide can produce heavy barrels, and high tide can bring a strong shore break. It's highly exposed to west and south-west Atlantic swell; east to south-east winds are offshore and westerlies make it messy quickly."
      ],
      cards: [
        { label: "Tide", title: "Not every tide is the same", text: "Mid tide is usually the easiest window; low tide is steeper and heavier." },
        { label: "Hazards", title: "Rips and crowds", text: "Strong rips, powerful low-tide surf and busy line-ups. Use the lifeguarded area." },
        { label: "Plan B", title: "Too much? Move", text: "Saunton is more forgiving; Putsborough gives shelter from south and south-westerly winds." }
      ]
    },
    surfbooker: {
      schools: ["surf-south-west", "surfing-croyde-bay", "lords-of-down-end"],
      hireProviders: ["croyde-surf-hire", "walking-on-waves"],
      lessonsPage: "/surf-lessons/croyde/",
      accommodation: "croyde"
    },
    lessons: {
      intro: "Three lesson providers operate around different parts of the bay: Surf South West at Croyde Burrows car park, Surfing Croyde Bay at Baggy Lodge, and Lords of Down End at the southern end.",
      providers: [
        { name: "Saltrock", type: "Surf clothing shop", note: "Surf and coastal clothing, footwear and accessories in the village." },
        { name: "Ralphs Surf Shop", type: "Surf shop", note: "Local surf shop for gear, clothing and beach essentials." }
      ],
      note: lessonsNote + " Walking on Waves has a Croyde hire location; its lessons run from Saunton."
    },
    practical: [
      { label: "Parking", title: "Paid beach parking", text: "Paid parking close to the beach, including disabled spaces. In summer allow extra time — the village gets very busy." },
      { label: "Facilities", title: "Toilets and first aid", text: "Toilets, disabled facilities, first aid, food and shops nearby." },
      { label: "Lifeguards", title: "Seasonal", text: "Swim between the red and yellow flags when patrols are operating." },
      { label: "Dogs", title: "Summer ban", text: "Dogs are not allowed on Croyde Beach from 1 May to 30 September; allowed 1 October–30 April. Check signs." }
    ],
    stay: {
      intro: "Choose between beach access and village atmosphere.",
      areas: [
        { label: "Beach access", title: "Ruda Holiday Park", text: "Immediately behind the bay — practical for families." },
        { label: "Camping", title: "Bay View Farm", text: "Camping and touring close to the beach and village." }
      ]
    },
    food: {
      places: [{ name: "The Thatch", type: "Pub, Croyde village", note: "The village's best-known pub, a short walk from the beach." }],
      text: ["Cafés, pubs and surf-shop coffee are all within the village."]
    },
    todo: [
      { label: "Walk", title: "Baggy Point", text: "National Trust headland with views back over Croyde and along the coast." },
      { label: "Walk", title: "South West Coast Path", text: "Walk straight from Croyde in either direction." },
      { label: "Festival", title: "Oceanfest", text: "Croyde's surf and music festival, held since 1999." },
      { label: "History", title: "D-Day training", text: "American troops trained along this coast before the D-Day landings." }
    ],
    travel: [
      { label: "By car", title: "Via the A361 and Braunton", text: "Summer traffic can be slow on the final roads into Croyde." },
      { label: "Rail", title: "Barnstaple", text: "The nearest station, about 10 miles away." },
      { label: "Bus", title: "From Barnstaple", text: "Buses connect Barnstaple and the coastal villages — check timetables." }
    ],
    nearby: [
      { name: "Saunton Sands", href: "/guides/surfing-saunton-sands/", distance: "Just south", text: "Huge beach with gentler, longer waves." },
      { name: "Putsborough", href: "/guides/surfing-putsborough/", distance: "Around Baggy Point", text: "Shelter from south-westerly winds." },
      { name: "Woolacombe", href: "/guides/surfing-woolacombe/", distance: "Further north", text: "Three miles of sand and plenty of peaks." },
      { name: "Westward Ho!", href: "/guides/westwardho!/", text: "Surfbooker's home beach across the estuary." }
    ],
    faqs: [
      { q: "Is Croyde good for beginner surfers?", a: "It can be on small, suitable days with a surf school, but rips, powerful low-tide waves and crowds make it challenging. Saunton is often more forgiving." },
      { q: "What tide is best at Croyde?", a: "Mid tide is often the most manageable. Low tide can be steep, hollow and powerful; high tide can bring a heavy shore break." },
      { q: "Can dogs go on Croyde beach?", a: "Not from 1 May to 30 September." },
      { q: "Does Walking on Waves teach at Croyde?", a: "It has a Croyde hire location, but its lessons run from Saunton Sands." }
    ],
    sources: [RNLI, WSR, { label: "National Trust — Baggy Point", url: "https://www.nationaltrust.org.uk/visit/devon/baggy-point" }],
    editorial: devonEditorial
  }),

  base("saunton-sands", "Saunton", "north-devon", {
    name: "Saunton Sands",
    area: "Saunton, North Devon",
    geo: [51.1150, -4.2240],
    title: "Saunton Sands Surf Guide: Longboarding, Lessons, Parking & Access | Surfbooker",
    description: "Saunton Sands surf guide: long rolling waves for learners and longboarders, Walking on Waves and Surf Saunton, ANPR parking, beach wheelchairs, dog zones and Braunton Burrows.",
    heroIntro: "Three miles of dune-backed sand with long, rolling waves — North Devon's longboarding beach, and one of its best places to learn.",
    heroAlt: "Saunton Sands with the dunes of Braunton Burrows behind",
    images: {
      hero: lic("saunton"),
      feature: { path: own(7552), position: "50% 60%", alt: "The coast road down to Saunton Sands with dunes and the sea beyond", caption: "The road down to Saunton, with the sands and Braunton Burrows ahead.", heading: "Space, long walls and a different feel to Croyde", text: "There's no village directly behind the beach — just dunes, the coast path, surf facilities and a large car park." }
    },
    glance: [
      ["Best for", "Learners and longboarders"],
      ["Break", "Long, gentle sandy beach break"],
      ["Tidal range", "Around 8.5 metres"],
      ["Parking", "Barrierless ANPR — pay before leaving"],
      ["Access", "Ramp, 7 disabled bays, beach wheelchairs"],
      ["Dogs", "Year-round — turn left at the slipway"]
    ],
    overview: [
      "Saunton Sands runs for around three miles between Croyde and the Taw–Torridge estuary, backed by Braunton Burrows — England's largest sand-dune system and the heart of the North Devon UNESCO Biosphere.",
      "For surfers it's best known for long, slower-breaking waves on a wide sandy beach, which makes it particularly good for beginners and longboarders. Larger winter swells still produce demanding conditions and tiring paddles.",
      "Saunton has a tidal range of around 8.5 metres and shelves very gently, so at low tide the sea can be a long way from the car park."
    ],
    suits: ["Learners and longboarders", "Dog walkers year-round", "Visitors needing good beach access"],
    notFor: ["Short, punchy waves — try Croyde", "Village atmosphere"],
    surf: {
      text: [
        "The gentle gradient produces slower, rolling waves. The inside gives forgiving white water on suitable days, while experienced surfers look for longer walls further out.",
        "It works through a wide range of tides, but the character changes significantly — low tide exposes a vast amount of sand."
      ],
      cards: [
        { label: "Longboarding", title: "A local favourite", text: "Long, rolling shoulders on the right day." },
        { label: "Winter", title: "Can still get serious", text: "Bigger swells bring powerful surf and long paddle-outs." },
        { label: "Low tide", title: "A long walk", text: "Allow time to reach the water." }
      ]
    },
    surfbooker: { schools: ["walking-on-waves", "surf-saunton"], hireProviders: ["croyde-surf-hire"], accommodation: "saunton" },
    lessons: { note: lessonsNote + " Croyde Surf Hire serves Saunton, with equipment collected from its Croyde base and free soft roof racks." },
    practical: [
      { label: "Parking", title: "Barrierless ANPR", text: "Saunton Beach car park switched to ANPR in November 2025 — pay for the chargeable part of your stay before leaving. No overnight parking." },
      { label: "Accessibility", title: "Better than most", text: "Seven disabled spaces, a 25m concrete ramp, two RADAR-key accessible toilets and all-terrain beach wheelchairs to hire from the Beach Shop." },
      { label: "Facilities", title: "Toilets and showers", text: "Public and accessible toilets and open-air showers by the main access." },
      { label: "Dogs", title: "Welcome all year", text: "Turn left at the bottom of the slipway and follow the zoning signs; use leads near fenced dune areas." }
    ],
    stay: { areas: [{ label: "Village", title: "Braunton", text: "Pubs, cafés and shops a few minutes inland." }, { label: "Surf village", title: "Croyde", text: "Just north, with holiday parks and lets." }] },
    food: { text: ["There's a beach café and shop at Saunton; Braunton has a wider choice of cafés and pubs."] },
    todo: [
      { label: "Nature", title: "Braunton Burrows", text: "England's largest dune system — a Special Area of Conservation and SSSI. Stick to permitted access." },
      { label: "History", title: "D-Day training", text: "American troops trained in the Burrows during the Second World War; military training still takes place." },
      { label: "Walk", title: "Beach walk", text: "Three miles of sand — a full coastal walk without leaving the beach." }
    ],
    travel: [
      { label: "By car", title: "B3231 from Braunton", text: "The beach entrance is on the coast road before Croyde." },
      { label: "Rail", title: "Barnstaple", text: "Then bus or taxi." }
    ],
    nearby: [
      { name: "Croyde", href: "/guides/surfing-croyde-bay/", distance: "Just north", text: "Punchier, more powerful beach break." },
      { name: "Putsborough", href: "/guides/surfing-putsborough/", text: "Sheltered from south-westerly winds." },
      { name: "Westward Ho!", href: "/guides/westwardho!/", text: "Across the estuary." }
    ],
    faqs: [
      { q: "Is Saunton good for beginners?", a: "Yes, on suitable days — sandy bottom, broad beach and slower waves. Larger winter surf can still be demanding." },
      { q: "How does parking work?", a: "Barrierless ANPR: your registration is recorded and you pay for the chargeable portion before leaving. No overnight parking." },
      { q: "Are dogs allowed?", a: "Yes, all year, using the zone to the left of the slipway." },
      { q: "Is Saunton accessible?", a: "Seven disabled spaces, a concrete ramp, RADAR-key toilets and all-terrain beach wheelchairs to hire." }
    ],
    sources: [RNLI, WSR, { label: "North Devon UNESCO Biosphere — Braunton Burrows", url: "https://www.northdevonbiosphere.org.uk/" }],
    editorial: devonEditorial
  }),

  base("woolacombe", "Woolacombe", "north-devon", {
    name: "Woolacombe",
    area: "Woolacombe, North Devon",
    geo: [51.1700, -4.2100],
    title: "Woolacombe Surf Guide: Surf Schools, Parking, Dog Zones & Family Days | Surfbooker",
    description: "Woolacombe surf guide: three miles of sand and peaks, Surfing Woolacombe and Woolacombe Surf Centre, parking, seasonal dog zones, lifeguards, family things to do and Putsborough nearby.",
    heroIntro: "Three miles of exposed sand, peak after peak and a proper surf-town atmosphere — easy-going on the right day and seriously powerful when the Atlantic wakes up.",
    heroAlt: "Woolacombe beach stretching south towards Baggy Point",
    images: { hero: lic("woolacombe") },
    glance: [
      ["Best for", "All levels — choose your day"],
      ["Break", "Sandy beach break, many peaks"],
      ["Lifeguards", "Seasonal patrol"],
      ["Dogs", "Zoned, 9am–6pm in season"],
      ["Schools", "Two on Surfbooker"],
      ["Weakness", "Onshore wind"]
    ],
    overview: [
      "Woolacombe's broad sandy beach stretches about three miles south towards Putsborough, with Atlantic swell producing peak after peak. Smaller summer days suit learners, longboarders and families; winter swells turn the same beach into a powerful, demanding spot.",
      "The village is geared heavily towards visitors, with food, surf shops and family entertainment close to the beach. In peak summer that convenience comes with crowds — but the beach is big enough to walk away from them."
    ],
    suits: ["Families with mixed interests", "Surfers who'll walk for space", "Dog owners — part of the beach is open all year"],
    notFor: ["Onshore days — check Putsborough"],
    surf: {
      text: [
        "A mostly sandy beach break with no single fixed line-up — banks move, and the best peak changes with tide, swell and season. Longboards work well, but there's enough punch for shorter boards when banks and swell line up.",
        "The exposed beach deteriorates quickly in onshore wind; easterlies can transform it."
      ],
      cards: [
        { label: "Summer", title: "Often accessible", text: "Smaller swells and forgiving white water." },
        { label: "Winter", title: "Can get heavy", text: "Powerful sets and demanding paddle-outs." },
        { label: "Crowds", title: "Walk for space", text: "Busiest at the village access; quieter along Marine Drive." }
      ]
    },
    surfbooker: { schools: ["surfing-woolacombe", "woolacombe-surf-centre"], hireProviders: ["surfing-woolacombe", "woolacombe-surf-centre"], lessonsPage: "/surf-lessons/woolacombe/", accommodation: "woolacombe" },
    lessons: { note: lessonsNote },
    practical: [
      { label: "Parking", title: "Esplanade, Sandy Burrows, Marine Drive", text: "Esplanade and Sandy Burrows are closest to the village; Marine Drive runs behind the dunes for the wider beach. Prices vary seasonally; no overnight parking." },
      { label: "Dogs", title: "Seasonal zones", text: "From Good Friday or 1 April (whichever is first) to 30 September, 9am–6pm: Zone A near the village no dogs, Zone B dogs on leads, Zone C south of Mill Rock unrestricted." },
      { label: "Lifeguards", title: "Seasonal", text: "No flags means no lifeguard cover." },
      { label: "Traffic", title: "Arrive early", text: "Coastal roads get congested on sunny weekends and holidays." }
    ],
    stay: { areas: [{ label: "Village", title: "Woolacombe", text: "Hotels, holiday parks and lets close to the beach." }, { label: "Quieter", title: "Mortehoe", text: "Just above Woolacombe, close to the coast path." }] },
    food: { text: ["Lots of cafés, pubs and places to eat around the village. For more choice and value, Ilfracombe is a short drive."] },
    todo: [
      { label: "Family", title: "Beach huts, arcades and shops", text: "Plenty for non-surfers." },
      { label: "Rainy day", title: "Cinema", text: "The Woolacombe Bay Hotel has a cinema." },
      { label: "Sunset", title: "Stay late", text: "The west-facing bay has brilliant sunsets." }
    ],
    travel: [{ label: "By car", title: "Via the A361", text: "Allow extra time in summer." }, { label: "Rail", title: "Barnstaple", text: "Then bus." }],
    nearby: [
      { name: "Putsborough", href: "/guides/surfing-putsborough/", distance: "Southern end of the bay", text: "Shelter in south-westerly winds." },
      { name: "Croyde", href: "/guides/surfing-croyde-bay/", text: "Compact, powerful beach break." },
      { name: "Saunton Sands", href: "/guides/surfing-saunton-sands/", text: "Long, rolling waves." },
      { name: "Lynmouth", href: "/guides/surfing-lynmouth/", text: "Rare point break up the coast." }
    ],
    faqs: [
      { q: "Is Woolacombe good for beginners?", a: "Yes, when conditions are suitable — larger surf can make it unsuitable." },
      { q: "Are dogs allowed on Woolacombe beach?", a: "Yes, all year, but seasonal zoning creates dog-free and leads-only sections near the village end." },
      { q: "Where should I surf if Woolacombe is blown out?", a: "Putsborough, at the southern end, is often cleaner in south or south-westerly winds." }
    ],
    sources: [RNLI, WSR],
    editorial: devonEditorial
  }),

  base("putsborough", "Putsborough", "north-devon", {
    name: "Putsborough",
    fullName: "Putsborough Sands",
    area: "Near Georgeham, North Devon",
    geo: [51.1430, -4.2240],
    title: "Putsborough Surf Guide: Wind Shelter, Surf Schools, Parking & Dogs | Surfbooker",
    description: "Putsborough Sands: the sheltered southern end of Woolacombe Bay under Baggy Point. Nick Thorn and Barefoot surf schools and hire, beachside parking, dog zones and coast-path walks.",
    heroIntro: "The sheltered southern end of Woolacombe Bay, tucked beneath Baggy Point — often the place to check when south-westerly winds are making nearby beaches messy.",
    heroAlt: "Putsborough Sands beneath Baggy Point",
    images: { hero: lic("putsborough") },
    glance: [
      ["Best for", "Longboards, improvers, windy days"],
      ["Break", "Sandy beach break"],
      ["Shelter", "From south and south-west wind"],
      ["Parking", "Private car park behind the beach"],
      ["Schools", "Nick Thorn, Barefoot"],
      ["Sat nav", "EX33 1LB"]
    ],
    overview: [
      "Putsborough Sands forms the southern end of the bay that runs north to Woolacombe. Baggy Point rises immediately to the south, protecting this end from south and south-westerly winds — so when exposed beaches nearby are blown out, Putsborough can stay clean.",
      "The trade-off is that the headland can also block swell with a lot of south in it, so Putsborough can be smaller than Woolacombe or Croyde. Ashore, it's much quieter: sand, cliffs, countryside and a beachside car park."
    ],
    suits: ["South-westerly wind days", "Longboarders and improvers", "Families who want to park by the sand"],
    notFor: ["Big swell days for beginners", "Large vans on narrow lanes"],
    surf: {
      text: ["A sandy beach break with shifting banks. Smaller days give mellow walls for longboards and progressing surfers; with size, the paddle, currents and the rocks at the southern end matter more. No single tide rule guarantees the best session."],
      cards: [
        { label: "Hazards", title: "Rocks and rip", text: "The southern end is rocky and a rip can run near the rocks — don't use it as a shortcut." },
        { label: "Wind", title: "SW shelter", text: "Its defining feature." },
        { label: "Lifeguards", title: "Don't assume cover", text: "Check current beach information on the day." }
      ]
    },
    surfbooker: { schools: ["nick-thorn-surf-coaching", "barefoot-surf-school"], hireProviders: ["nick-thorn-surf-coaching", "barefoot-surf-school"], lessonsPage: "/surf-lessons/putsborough/", hirePage: "/surf-hire/putsborough/", accommodation: "putsborough" },
    lessons: { note: lessonsNote },
    practical: [
      { label: "Parking", title: "Right behind the sand", text: "Substantial paid private parking, including disabled spaces. Check the tariff at the entrance." },
      { label: "Access", title: "Narrow lanes", text: "Expect passing places; take vans slowly." },
      { label: "Dogs", title: "Zoned", text: "Seasonal restrictions on the southern section by the access from 1 April (ending between 30 September and 31 October); a section further north stays open to dogs." },
      { label: "Facilities", title: "Toilets, café, shop", text: "Toilets, a seasonal café and a beach shop by the car park." }
    ],
    stay: { areas: [{ label: "Villages", title: "Georgeham and Croyde", text: "Holiday lets and pubs a short drive away." }, { label: "Town", title: "Woolacombe", text: "More choice at the other end of the bay." }] },
    food: { text: ["A seasonal café at the beach; pubs in Georgeham and Croyde."] },
    todo: [
      { label: "Walk", title: "Baggy Point", text: "National Trust headland on the South West Coast Path towards Croyde." },
      { label: "Sunset", title: "Stay on", text: "The open, west-facing bay is a great place to finish the day." }
    ],
    travel: [{ label: "Sat nav", title: "EX33 1LB", text: "Between Woolacombe and Croyde; narrow final lanes." }],
    nearby: [
      { name: "Woolacombe", href: "/guides/surfing-woolacombe/", distance: "Same bay, north", text: "More exposed, more swell." },
      { name: "Croyde", href: "/guides/surfing-croyde-bay/", distance: "Around Baggy Point", text: "Punchier beach break." },
      { name: "Saunton Sands", href: "/guides/surfing-saunton-sands/", text: "Long, slow waves." }
    ],
    faqs: [
      { q: "Why is Putsborough good in south-westerly winds?", a: "Baggy Point shelters the southern end of the bay." },
      { q: "Is Putsborough good for beginners?", a: "On smaller days, with a lesson. Bigger surf, currents and the rocks make it more demanding." },
      { q: "Is Putsborough dog-friendly?", a: "Yes, but part of the beach near the access has seasonal restrictions." }
    ],
    sources: [RNLI, WSR, { label: "National Trust — Baggy Point", url: "https://www.nationaltrust.org.uk/visit/devon/baggy-point" }],
    editorial: devonEditorial
  }),

  base("lynmouth", "Lynmouth", "north-devon", {
    name: "Lynmouth",
    area: "Lynmouth, Exmoor",
    geo: [51.2310, -3.8290],
    title: "Lynmouth Surf Guide: The Point Break, Safety, Parking & Flat-Day Plans | Surfbooker",
    description: "Lynmouth surf guide: a rare, long left-hand point break over boulders for experienced surfers. What swell it needs, safety, parking, the cliff railway, Watersmeet and the 1952 flood.",
    heroIntro: "One of England's most respected point breaks — rare, rocky and only for experienced surfers — in an Exmoor harbour village that's worth the trip even when it's flat.",
    heroAlt: "Lynmouth harbour and village beneath the Exmoor cliffs",
    images: { hero: lic("lynmouth") },
    glance: [
      ["Best for", "Experienced surfers only"],
      ["Break", "Left-hand point over cobbles and boulders"],
      ["Swell", "Large W–NW Atlantic swell"],
      ["Wind", "Light south or south-east"],
      ["Lifeguards", "No regular patrol"],
      ["Lessons/hire", "None — bring everything"]
    ],
    overview: [
      "Lynmouth sits where the East and West Lyn rivers meet the Bristol Channel, beneath the steep wooded cliffs of Exmoor. It needs a large Atlantic swell to wrap far into the Channel — and when that happens, long left-hand walls peel across the bay.",
      "It's fickle, rocky, current-affected and unforgiving. This is a spot to wait for, not to book a beginner surf weekend around. If you're unsure whether you're experienced enough, watch from shore."
    ],
    suits: ["Experienced surfers on big swells", "Walkers and day-trippers when it's flat"],
    notFor: ["Beginners and improvers", "Anyone needing hire or lessons"],
    surf: {
      text: [
        "The headline wave is a long left that peels across the bay on a big west or north-west swell. The point is sheltered from much raw Atlantic energy, so it can be clean here while exposed beaches further west are huge.",
        "It's generally associated with lower tides, but river flow and swell angle matter too. Autumn and winter give the best chance."
      ],
      cards: [
        { label: "Bottom", title: "Cobbles and boulders", text: "Boots are sensible; wipeouts, entry and exit carry consequences." },
        { label: "Hazards", title: "River currents", text: "River flow, tide and swell create strong, confusing water movement." },
        { label: "Line-up", title: "Small take-off", text: "Good days draw experienced surfers quickly — know priority." }
      ]
    },
    surfbooker: { accommodation: "lynmouth" },
    practical: [
      { label: "Parking", title: "Village car parks", text: "North Devon Council car parks near the harbour, with RingGo and pay stations. The council's 7-day rover permit covers most Lynton and Lynmouth car parks (not Lower Lyndale)." },
      { label: "Facilities", title: "Village", text: "Pubs, cafés, shops and public toilets within walking distance — no surf hire or schools." },
      { label: "Safety", title: "No regular lifeguards", text: "Don't expect a lifeguarded surf zone." }
    ],
    stay: { areas: [{ label: "Villages", title: "Lynmouth and Lynton", text: "Harbour-side inns and clifftop hotels linked by the cliff railway." }] },
    food: { text: ["Pubs and cafés around the harbour and in Lynton at the top of the cliff railway."] },
    todo: [
      { label: "Railway", title: "Lynton & Lynmouth Cliff Railway", text: "Opened in 1890 and powered entirely by water from the West Lyn." },
      { label: "Walk", title: "Watersmeet", text: "National Trust circular walks through the East Lyn valley (5.5–6.5 miles)." },
      { label: "History", title: "Flood Memorial Hall", text: "The 1952 flood killed 34 people, 17 of them in Lynmouth; the hall tells the story." }
    ],
    travel: [{ label: "By car", title: "A39", text: "Steep hills on both approaches — Countisbury and Lynton." }],
    nearby: [
      { name: "Woolacombe", href: "/guides/surfing-woolacombe/", text: "Far more exposed; surf most days." },
      { name: "Putsborough", href: "/guides/surfing-putsborough/", text: "Sheltered beach break." },
      { name: "Croyde", href: "/guides/surfing-croyde-bay/", text: "Powerful, consistent beach break." }
    ],
    faqs: [
      { q: "Is Lynmouth good for beginners?", a: "No. It's a rocky point and river-mouth break with strong currents and no learner setup." },
      { q: "Why is Lynmouth so inconsistent?", a: "The north-facing bay is sheltered from normal Atlantic swell and needs a very large W–NW swell to wrap into the Bristol Channel." },
      { q: "Is there surf hire in Lynmouth?", a: "No — bring everything you need." }
    ],
    sources: [WSR, { label: "Lynton & Lynmouth Cliff Railway", url: "https://www.cliffrailwaylynton.co.uk/" }, { label: "National Trust — Watersmeet", url: "https://www.nationaltrust.org.uk/visit/devon/watersmeet" }],
    editorial: devonEditorial
  }),

  base("bantham", "Bantham", "south-devon", {
    name: "Bantham",
    area: "Bantham, South Hams",
    geo: [50.2800, -3.8820],
    title: "Bantham Surf Guide: Discovery Surf School, River Currents, Parking & Dogs | Surfbooker",
    description: "Bantham surf guide: one of South Devon's most dependable surf beaches. Discovery Surf School and hire, Avon river-mouth currents, 1,000-space car park, dog rules, beach wheelchair and the Avon ferry.",
    heroIntro: "One of South Devon's most dependable surf beaches, with shifting sandbanks, a long surf history and a river mouth that deserves proper respect.",
    heroAlt: "Bantham beach at the mouth of the River Avon with Burgh Island beyond",
    images: { hero: lic("bantham") },
    glance: [
      ["Best for", "Learners with a school; experienced on good banks"],
      ["Break", "Sandy beach break and river mouth"],
      ["Lifeguards", "Seasonal RNLI"],
      ["Parking", "1,000+ spaces, ~75m from beach"],
      ["Dogs", "Main beach banned 1 May–30 Sep; River Beach open"],
      ["Wind", "North-east is offshore"]
    ],
    overview: [
      "Bantham sits at the mouth of the River Avon in the South Hams, looking across Bigbury Bay to Burgh Island. Its exposure to Atlantic swell gives it one of the strongest surfing reputations in South Devon.",
      "The surf is shaped by moving sandbanks and the Avon. One tide can produce mellow learner-friendly white water and another fast, hollow waves and powerful currents. Bantham Surf Life Saving Club dates back to 1960."
    ],
    suits: ["Lessons with Discovery", "Experienced surfers on good banks", "Coast-path walkers"],
    notFor: ["Inexperienced surfers near the river mouth"],
    surf: {
      text: [
        "A sandy beach break with lefts and rights; the river mouth can produce longer, faster waves but brings the strongest current. North-easterly winds are offshore.",
        "Don't take old advice to 'let the rip carry you out' — river-mouth water can take you somewhere you don't want to be very quickly."
      ],
      cards: [
        { label: "Hazards", title: "The River Avon", text: "Strong outgoing and cross-beach currents. Use the black-and-white surf zone when patrols run." },
        { label: "Banks", title: "Always moving", text: "Another tide can make a completely different beach." },
        { label: "Crowds", title: "A proper line-up", text: "Good days attract experienced surfers — give space and know priority." }
      ]
    },
    surfbooker: { schools: ["discovery-surf-school"], hireProviders: ["discovery-surf-school"], accommodation: "bantham" },
    lessons: { note: lessonsNote + " Discovery teaches at both Bantham and Bigbury-on-Sea, depending on conditions." },
    practical: [
      { label: "Parking", title: "Bantham Estate car park", text: "More than 1,000 spaces about 75m from the beach; paid, contactless, no overnight stays. Narrow lanes — arrive early in summer." },
      { label: "Dogs", title: "Use River Beach in summer", text: "No dogs on the main beach 1 May–30 September; River Beach (through the Ham) is open all year." },
      { label: "Access", title: "Beach wheelchair", text: "Blue Badge parking, an accessible toilet and a free specialist beach wheelchair to book." },
      { label: "Facilities", title: "Showers and food", text: "Outdoor showers and seasonal food around the car park." }
    ],
    stay: { areas: [{ label: "South Hams", title: "Bantham, Thurlestone, Kingsbridge", text: "Village inns, cottages and lets." }] },
    food: { places: [{ name: "The Sloop Inn", type: "Pub, Bantham village", note: "Historic village pub — the post-surf option away from the car park." }] },
    todo: [
      { label: "Ferry", title: "Avon passenger ferry", text: "Seasonal, tide-dependent crossing to the Bigbury side for coast-path walkers." },
      { label: "Walk", title: "Bantham to Thurlestone", text: "Easy coast-path walk east." },
      { label: "Nature", title: "Bantham Ham", text: "Dunes and saltmarsh behind the beach." }
    ],
    travel: [{ label: "By car", title: "Via Kingsbridge", text: "Narrow lanes on the final approach." }, { label: "Rail", title: "Totnes or Ivybridge", text: "Then a taxi or bus." }],
    nearby: [
      { name: "Bigbury-on-Sea", href: "/guides/surfing-bigbury-on-sea/", distance: "Across the Avon", text: "Softer waves and another Discovery base." },
      { name: "Challaborough", href: "/guides/surfing-challaborough/", text: "Compact cove with a reef." }
    ],
    faqs: [
      { q: "Is Bantham good for beginners?", a: "Yes on suitable days with a lesson, but strong Avon currents and bigger surf make parts of the beach unsuitable." },
      { q: "Are dogs allowed on Bantham Beach?", a: "Not on the main beach 1 May–30 September; River Beach is open all year." },
      { q: "Is Bantham lifeguarded?", a: "Yes, seasonally — check the RNLI page and the flags." }
    ],
    sources: [RNLI, { label: "Bantham Estate", url: "https://www.banthamestate.co.uk/" }],
    editorial: devonEditorial
  }),

  base("bigbury-on-sea", "Bigbury-on-sea", "south-devon", {
    name: "Bigbury-on-Sea",
    area: "Bigbury-on-Sea, South Hams",
    geo: [50.2830, -3.8960],
    title: "Bigbury-on-Sea Surf Guide: Lessons, Hire, Parking & Burgh Island | Surfbooker",
    description: "Bigbury-on-Sea surf guide: mellow sandy peaks for learners, Discovery Surf School and hire, 2026 RNLI patrol dates, Marine Drive parking, dog zones and Burgh Island's causeway and sea tractor.",
    heroIntro: "A gentler South Devon surf beach with mellow sandy peaks and Burgh Island sitting right in front of you.",
    heroAlt: "Bigbury-on-Sea beach with Burgh Island",
    images: { hero: lic("bigbury-on-sea") },
    glance: [
      ["Best for", "Learners, families, longboards"],
      ["Break", "Sandy beach break"],
      ["Lifeguards", "Main beach 11 Jul–6 Sep 2026"],
      ["Parking", "Marine Drive, 315 spaces"],
      ["Dogs", "Year-round west of the causeway"],
      ["School", "Discovery, in the car park"]
    ],
    overview: [
      "Bigbury-on-Sea sits on the western side of the River Avon, opposite Bantham and facing Burgh Island. The broad sandy beach and facilities close to the sand make it practical for families and first surf trips.",
      "The surf is generally softer and less consistent than Bantham — which can be exactly the attraction. The exception is the Avon side, where river currents can become strong."
    ],
    suits: ["First lessons", "Families", "Mixed groups — someone surfs, someone walks the island"],
    notFor: ["Small swells — it needs more than Bantham"],
    surf: {
      text: ["Shifting sandy peaks with lefts and rights. Smaller days suit softboards and longboards; a good bank with swell gives steeper, faster walls. Mid tide often works well. The Avon side has more power and more current; the causeway side feels more sheltered."],
      cards: [
        { label: "Hazards", title: "Avon currents and rocks", text: "Currents strengthen near the river channel." },
        { label: "Swell", title: "Needs more than Bantham", text: "Can stay flat when Bantham is surfable." },
        { label: "Lifeguards", title: "RNLI 2026", text: "Main beach daily 11 July–6 September; Sedgewell Cove daily 16 May–27 September; 10am–6pm." }
      ]
    },
    surfbooker: { schools: ["discovery-surf-school"], hireProviders: ["discovery-surf-school"], accommodation: "bigbury-on-sea" },
    lessons: { note: lessonsNote + " Discovery hires surfboards, wetsuits, bodyboards, SUPs and kayaks from the lower level of the main car park, and provides a free beach wheelchair (call ahead)." },
    practical: [
      { label: "Parking", title: "Marine Drive", text: "315 spaces above the beach, 24 hours, card/contactless or app — no cash. Published 2026 tariff up to £14.50 all day." },
      { label: "Signal", title: "Unreliable", text: "Use the card machines rather than relying on an app." },
      { label: "Dogs", title: "West of the causeway", text: "Seasonal restrictions on the main bathing beach; the beach west of the Burgh Island causeway is open all year." },
      { label: "Facilities", title: "Everything close", text: "Toilets, showers, a café and disabled parking." }
    ],
    stay: { areas: [{ label: "South Hams", title: "Bigbury, Ringmore, Kingsbridge", text: "Cottages and lets." }] },
    food: { text: ["A café by the beach; on Burgh Island, the historic Pilchard Inn."] },
    todo: [
      { label: "Island", title: "Burgh Island", text: "Walk the causeway at low tide — check the tide before crossing. The sea tractor is mainly for hotel guests." },
      { label: "Walk", title: "Ringmore and Bigbury loop", text: "About 6.5 miles via the Avon estuary and clifftops." }
    ],
    travel: [{ label: "By car", title: "Via Modbury or Kingsbridge", text: "Narrow lanes." }],
    nearby: [
      { name: "Bantham", href: "/guides/surfing-bantham/", distance: "Across the Avon", text: "More consistent and powerful." },
      { name: "Challaborough", href: "/guides/surfing-challaborough/", distance: "Short drive west", text: "Punchier cove with a reef." }
    ],
    faqs: [
      { q: "Is Bigbury good for beginners?", a: "Yes, on suitable days — stay away from the Avon currents and use the flagged surf area." },
      { q: "Can anyone walk to Burgh Island?", a: "Yes, across the causeway at low tide. Check the tide first." },
      { q: "How much is parking?", a: "The published 2026 Marine Drive tariff runs up to £14.50 for a full day." }
    ],
    sources: [RNLI],
    editorial: devonEditorial
  }),

  base("challaborough", "Challaborough", "south-devon", {
    name: "Challaborough",
    area: "Challaborough, South Hams",
    geo: [50.2860, -3.9040],
    title: "Challaborough Surf Guide: Beach Break, Reef, Lifeguards & Parking | Surfbooker",
    description: "Challaborough Bay: a compact South Devon cove with a punchy sandy beach break and a technical right-hand reef. 2026 RNLI patrol dates, limited parking, summer dog ban and nearby lessons.",
    heroIntro: "A compact cove with a fun sandy beach break, a serious low-tide reef on the right, and a very different feel from the big open beaches.",
    heroAlt: "Challaborough cove with its sandy beach and cliffs",
    images: { hero: lic("challaborough") },
    glance: [
      ["Best for", "Improvers on the sand; experienced on the reef"],
      ["Break", "Beach break plus right-hand reef"],
      ["Lifeguards", "RNLI daily 16 May–27 Sep 2026"],
      ["Parking", "Small car park — fills early"],
      ["Dogs", "Not allowed 1 May–30 Sep"],
      ["Width", "About 350 metres"]
    ],
    overview: [
      "Challaborough is a compact sandy cove immediately west of Bigbury-on-Sea, about 350 metres wide and surrounded by cliffs and dunes, with a holiday park behind it.",
      "The sandy beach can produce fast, punchy waves; the reef on the right-hand side becomes much more technical as the tide drops. Treat the two as different breaks."
    ],
    suits: ["Improvers and bodyboarders on the sand", "Experienced surfers on the reef"],
    notFor: ["Beginners on the reef", "Dogs in summer"],
    surf: {
      text: ["The centre is a sandy beach break with short, punchy rides. The right-hand reef can produce a faster, hollower wave over submerged rock. Easterly and north-easterly winds are cleanest; winter brings more consistency."],
      cards: [
        { label: "Reef", title: "The serious bit", text: "Submerged rock — watch first if you don't know the line or the tide." },
        { label: "Crowds", title: "Small cove", text: "Feels busy quickly when it's working." },
        { label: "After rain", title: "Check water quality", text: "A stream enters the sea here." }
      ]
    },
    surfbooker: { hireProviders: ["discovery-surf-school"], schools: ["discovery-surf-school"], accommodation: "challaborough" },
    lessons: { note: lessonsNote + " There's no permanent school at Challaborough; Discovery teaches from Bigbury-on-Sea and Bantham." },
    practical: [
      { label: "Lifeguards", title: "RNLI", text: "Daily 16 May–27 September 2026, 10am–6pm." },
      { label: "Parking", title: "Limited", text: "A small private car park near the sand plus holiday-park parking. If it's full, Bigbury has more — but the walk is steep." },
      { label: "Dogs", title: "Summer ban", text: "Not allowed 1 May–30 September." },
      { label: "Facilities", title: "Holiday park", text: "Toilets, a convenience shop, food and drink and an arcade." }
    ],
    stay: { areas: [{ label: "On the beach", title: "Challaborough Bay holiday park", text: "Directly behind the cove." }] },
    food: { text: ["Food and drink at the holiday park; more at Bigbury and on Burgh Island."] },
    todo: [
      { label: "Walk", title: "Ayrmer Cove and Ringmore", text: "West along the coast path." },
      { label: "History", title: "Ringmore's old port", text: "The bay once landed fish and coal." },
      { label: "Island", title: "Burgh Island", text: "A short walk east to Bigbury and the causeway." }
    ],
    travel: [{ label: "By car", title: "Via Ringmore", text: "Narrow approach lane." }],
    nearby: [
      { name: "Bigbury-on-Sea", href: "/guides/surfing-bigbury-on-sea/", distance: "Next bay east", text: "More parking, school and hire." },
      { name: "Bantham", href: "/guides/surfing-bantham/", text: "Across the Avon." }
    ],
    faqs: [
      { q: "Is Challaborough good for beginners?", a: "The sandy beach can be on smaller days with instruction nearby. The reef isn't a beginner break." },
      { q: "When is Challaborough lifeguarded?", a: "Daily 16 May–27 September 2026, 10am–6pm." },
      { q: "Are dogs allowed?", a: "Not from 1 May to 30 September." }
    ],
    sources: [RNLI, { label: "Environment Agency — Swimfo bathing water (Challaborough)", url: "https://environment.data.gov.uk/bwq/profiles/" }],
    editorial: devonEditorial
  })
];

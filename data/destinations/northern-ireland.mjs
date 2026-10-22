// Northern Ireland destination guides. Built October 2026 from Surfbooker's September 2026 research
// (data/northern-ireland-research.mjs), which used Causeway Coast and Glens Borough Council,
// National Trust, RNLI, Discover Northern Ireland and operator pages.
const lic = (slug) => `guides/_licensed-images/uk-destinations/${slug}.jpg`;
const base = (slug, extra) => ({
  region: "northern-ireland",
  path: `/guides/surfing-${slug}/`,
  outFile: `guides/surfing-${slug}/index.html`,
  slug,
  ...extra
});
const council = (page) => ({ label: "Causeway Coast and Glens Borough Council — beach information", url: `https://causewaycoastandglens.gov.uk/see-do/beaches/${page}` });
const RNLI = { label: "RNLI — find a lifeguarded beach", url: "https://rnli.org/find-my-nearest/lifeguarded-beaches" };
const DNI = { label: "Discover Northern Ireland — surfing", url: "https://discovernorthernireland.com/things-to-do/recreation/water-activities/surfing/" };
const TROGGS = { name: "Troggs Surf School", type: "Surf school & hire, East Strand, Portrush", url: "https://troggssurfschool.co.uk/", note: "Operates from East Strand Watersports Centre year-round by booking, with lessons, soft boards and cold-water kit." };
const PSS = { name: "Portrush Surf School", type: "Surf school, Portrush Yacht Club", url: "https://portrushsurfschool.com/", note: "Based at Portrush Yacht Club near West Strand, with changing rooms and hot showers." };
const LONGLINE = { name: "Long Line Surf School", type: "Surf school & hire, Benone", url: "https://longlinesurfschool.co.uk/", note: "Cabin beside Benone Tourist Complex: lessons, children's sessions, inclusive surfing and hire from Sea Shed Coffee & Surf." };
const niEditorial = "Researched by Surfbooker from council, National Trust, RNLI, Discover Northern Ireland and operator sources; Surfbooker has not reviewed these businesses in person. Lifeguard dates, dog and horse restrictions and parking charges are seasonal — check the council page for the current year.";
const lifeguardsCard = { label: "Lifeguards", title: "Seasonal RNLI patrol", text: "Surf between the black-and-white flags and swim between the red-and-yellow flags. Check the RNLI page for this year's dates." };
const causeway = { label: "Day trip", title: "Giant's Causeway and Dunluce Castle", text: "The Causeway Coast's best-known sights are a short drive east of Portrush." };

export const destinations = [
  base("portrush-east-strand", {
    name: "Portrush East Strand",
    area: "Portrush, County Antrim",
    geo: [55.2050, -6.6400],
    title: "Portrush East Strand Surf Guide: Lessons, Parking & Lifeguards | Surfbooker",
    description: "Surfing Portrush East Strand: Troggs and Portrush Surf School, Causeway Street car park, toilets and showers, seasonal RNLI lifeguards, dog and horse rules, and where to stay in Portrush.",
    heroIntro: "Portrush's long town beach — 2.5km of sand running east from the town to Whiterocks, with surf schools, a big car park and the rest of the Causeway Coast on the doorstep.",
    heroAlt: "Portrush East Strand beach curving east from the town towards the dunes",
    images: { hero: lic("portrush-east-strand") },
    glance: [
      ["Best for", "All-round: lessons to experienced"],
      ["Break", "Sandy beach break"],
      ["Lifeguards", "Seasonal RNLI patrol"],
      ["Parking", "Causeway Street, ~637 spaces (charged)"],
      ["Facilities", "Toilets, accessible toilets, cold showers"],
      ["Rail", "Portrush station in town"]
    ],
    overview: [
      "East Strand sweeps east from Portrush past Royal Portrush Golf Club to Curran Strand and the Whiterocks cliffs. A promenade and dunes back the town end, and the whole beach is long enough to find space.",
      "It's the most practical all-round surf beach in Northern Ireland: two established schools in town, a large car park, showers, seasonal lifeguards and a railway station a few minutes' walk away."
    ],
    suits: ["First lessons and families", "Car-free trips by train", "Improvers who want room to spread out"],
    notFor: ["Dogs and horses on summer days (restrictions apply)", "Quiet beach days in peak summer"],
    surf: {
      text: [
        "An exposed sandy beach break. North-west swell and south-westerly winds are the commonly favoured combination, but the banks and tide move the peaks around. Autumn and winter are more dependable than summer."
      ],
      cards: [
        { label: "Level", title: "All abilities", text: "Lessons on the gentler banks; more size for experienced surfers in winter." },
        { label: "Hazards", title: "Flash rips", text: "RNLI reports include rescues involving rip currents and offshore wind. Also watch for horses and other water users." },
        lifeguardsCard
      ]
    },
    lessons: { providers: [TROGGS, PSS] },
    practical: [
      { label: "Parking", title: "Causeway Street car park", text: "Roughly 637 spaces, charged 8:30am–6:30pm daily. Concrete ramps at both ends of the promenade." },
      { label: "Facilities", title: "Toilets and showers", text: "Toilets, accessible toilets and parking, outdoor cold showers and pre-bookable beach-access equipment." },
      { label: "Dogs & horses", title: "Seasonal restrictions", text: "The council applies summer dog and horse restrictions — check its beach page for current dates." },
      { label: "Lifeguards", title: "Seasonal RNLI", text: "Use the flagged zones when lifeguards are on duty." }
    ],
    stay: {
      intro: "Portrush is the obvious base: walk to the beach, station, harbour and restaurants.",
      picks: [
        { name: "Royal Court Hotel", type: "Hotel", note: "Highlighted by Discover Northern Ireland; clifftop views towards Whiterocks. Researched listing." },
        { name: "Portrush Adelphi", type: "Hotel, town centre", note: "Researched listing." },
        { name: "Blackrock House", type: "Guesthouse", note: "Researched listing." }
      ]
    },
    food: { text: ["Portrush has the widest year-round choice on this coast. Use the town centre for breakfast, lunch and evening meals rather than relying on seasonal beach kiosks."] },
    todo: [
      { label: "Walk", title: "Along the sand to Whiterocks", text: "The beach runs continuously east to the limestone cliffs." },
      { label: "Town", title: "Portrush harbour", text: "Harbour, promenade and Ramore Head." },
      causeway
    ],
    travel: [
      { label: "Rail", title: "Portrush station", text: "Branch line from Coleraine, with connections to Belfast and Derry~Londonderry." },
      { label: "By car", title: "Causeway Coastal Route", text: "Around an hour and a quarter from Belfast." }
    ],
    nearby: [
      { name: "Whiterocks", href: "/guides/surfing-whiterocks/", distance: "Same stretch of sand", text: "The scenic, more exposed eastern end." },
      { name: "Portrush West Strand", href: "/guides/surfing-portrush-west-strand/", distance: "Walking distance", text: "The town's other beach, facing a different way." },
      { name: "Portstewart Strand", href: "/guides/surfing-portstewart-strand/", distance: "About 15 minutes", text: "Two miles of National Trust sand." }
    ],
    faqs: [
      { q: "Is Portrush East Strand good for beginners?", a: "Yes — with a lesson from Troggs or Portrush Surf School, and in the flagged zone when lifeguards are on duty." },
      { q: "Where do you park?", a: "Causeway Street car park, roughly 637 spaces, charged 8:30am–6:30pm daily." },
      { q: "Are there showers?", a: "Yes, outdoor cold showers, plus toilets and accessible toilets." }
    ],
    sources: [council("east-strand-portrush"), { label: "RNLI — Portrush East Strand", url: "https://rnli.org/find-my-nearest/lifeguarded-beaches/portrush-east-strand-beach" }, { label: "Troggs Surf School", url: "https://troggssurfschool.co.uk/" }, DNI],
    editorial: niEditorial
  }),

  base("portrush-west-strand", {
    name: "Portrush West Strand",
    area: "Portrush, County Antrim",
    geo: [55.2010, -6.6600],
    title: "Portrush West Strand Surf Guide: Lessons, Parking & Facilities | Surfbooker",
    description: "Portrush West Strand (West Bay / Mill Strand): a town beach between the harbour and promenade, with Portrush Surf School, seasonal parking charges, accessible toilets, lifeguards and food nearby.",
    heroIntro: "Portrush's west-facing town beach, between the harbour and the promenade — the easiest place on the coast to combine a surf with food and a night out.",
    heroAlt: "Portrush West Strand with the promenade and town behind",
    images: { hero: lic("portrush-west-strand") },
    glance: [
      ["Best for", "Lessons, improvers, convenience"],
      ["Break", "Sandy beach break, lefts and rights"],
      ["Lifeguards", "Seasonal RNLI patrol"],
      ["Parking", "Charged 1 Apr–30 Sep, 8:30am–6:30pm"],
      ["Facilities", "Accessible toilets and parking"],
      ["Also called", "West Bay, Mill Strand"]
    ],
    overview: [
      "West Strand — also called West Bay or Mill Strand — runs from Portrush harbour along a pedestrian and cycle promenade, a few minutes' walk from the town centre.",
      "It's a little more sheltered than the open eastern beaches and has everything close by: cafés, restaurants, shops, amusements and Portrush Surf School at the yacht club."
    ],
    suits: ["Lessons and families", "Surf plus food and evenings out", "A different swell angle from East Strand"],
    notFor: ["Lots of space at high tide — the beach narrows"],
    surf: {
      text: ["A sandy beach break with lefts and rights. It can be more consistent than East Strand on some swells, but quality depends on the banks, wind and tide — check both beaches and Whiterocks before committing."],
      cards: [
        { label: "Level", title: "Beginners to intermediates", text: "Good for lessons when small." },
        { label: "Hazards", title: "Rips and harbour", text: "Rips, harbour structures, swimmers and a narrow beach at high tide." },
        lifeguardsCard
      ]
    },
    lessons: { providers: [PSS, TROGGS] },
    practical: [
      { label: "Parking", title: "Seasonal charges", text: "Parking is charged from 1 April to 30 September, 8:30am–6:30pm." },
      { label: "Facilities", title: "Accessible toilets", text: "Accessible toilets and parking, cycle parking, and town facilities on the promenade." },
      { label: "Dogs", title: "Seasonal restrictions", text: "Summer dog restrictions apply — check the council page." },
      { label: "Lifeguards", title: "Seasonal RNLI", text: "Stay within the marked watersports zones when lifeguards are on duty." }
    ],
    stay: {
      areas: [
        { label: "Walkable", title: "Portrush", text: "Easiest for a car-free trip." },
        { label: "Alternatives", title: "Portstewart or Coleraine", text: "Quieter, or more choice and transport links." }
      ]
    },
    food: { text: ["The harbour and town centre are right behind the beach — cafés, restaurants and pubs within a few minutes' walk."] },
    todo: [
      { label: "Walk", title: "Promenade and harbour", text: "Easy walking along the seafront." },
      causeway
    ],
    travel: [{ label: "Rail", title: "Portrush station", text: "A short walk from the beach." }],
    nearby: [
      { name: "Portrush East Strand", href: "/guides/surfing-portrush-east-strand/", distance: "Walking distance", text: "The long town beach to the east." },
      { name: "Whiterocks", href: "/guides/surfing-whiterocks/", distance: "A few minutes' drive", text: "Scenic, more exposed beach under limestone cliffs." },
      { name: "Portstewart Strand", href: "/guides/surfing-portstewart-strand/", text: "National Trust strand to the west." }
    ],
    faqs: [
      { q: "Is West Strand the same as West Bay?", a: "Yes — it's also called West Bay or Mill Strand." },
      { q: "Where's the nearest surf school?", a: "Portrush Surf School is at Portrush Yacht Club, beside the beach." },
      { q: "Is parking charged?", a: "From 1 April to 30 September, 8:30am–6:30pm." }
    ],
    sources: [council("west-strand-portrush"), { label: "Portrush Surf School", url: "https://portrushsurfschool.com/" }, DNI, RNLI],
    editorial: niEditorial
  }),

  base("whiterocks", {
    name: "Whiterocks",
    fullName: "Whiterocks Beach",
    area: "Near Portrush, County Antrim",
    geo: [55.2070, -6.6050],
    title: "Whiterocks Beach Surf Guide: Parking, Showers, Lifeguards & Walks | Surfbooker",
    description: "Whiterocks Beach near Portrush: free parking, toilets, cold showers and seasonal RNLI lifeguards beneath limestone cliffs. Lessons nearby with Troggs, and the cliff walk to Magheracross.",
    heroIntro: "A long sandy beach beneath sculpted white limestone cliffs, caves and arches — the most scenic surf beach near Portrush, with free parking and good facilities.",
    heroAlt: "Whiterocks beach with white limestone cliffs and arches",
    images: { hero: lic("whiterocks") },
    glance: [
      ["Best for", "Improvers to experienced; lessons via schools"],
      ["Break", "Beach break, reef near the east end"],
      ["Lifeguards", "Seasonal RNLI patrol"],
      ["Parking", "Free main and overflow car parks"],
      ["Facilities", "Toilets, accessible toilets, cold showers"],
      ["Scenery", "Limestone cliffs, caves and arches"]
    ],
    overview: [
      "Whiterocks is the eastern end of the sand that runs from Portrush via Curran Strand — but it feels very different, with chalky white limestone cliffs, caves and arches behind the beach.",
      "It's more open to the Atlantic than the town beaches, with free parking, boardwalk access, showers and a seasonal lifeguard patrol."
    ],
    suits: ["Improvers and intermediates", "Scenery and cliff walks", "Groups with a mix of surfers and walkers"],
    notFor: ["Beginners without a school", "Horse-free mornings in winter — riders use the strand"],
    surf: {
      text: ["Mostly beach-break peaks, with reef influence near the rocky eastern end. It suits a broad range of surfers only when size and currents match their ability."],
      cards: [
        { label: "Level", title: "Improvers to experienced", text: "Beginners should go with a school." },
        { label: "Hazards", title: "Rips, rocks and cliffs", text: "Rocks at the east end, cliff and cave hazards, changing tide and horses on the strand." },
        lifeguardsCard
      ]
    },
    lessons: {
      providers: [TROGGS],
      text: ["A seasonal outlet at the beach offers hire. Confirm the day's lesson beach with the school before travelling."]
    },
    practical: [
      { label: "Parking", title: "Free", text: "Main and overflow car parks beside the beach, with boardwalk access. Horse riders should use the upper car park and bridle path." },
      { label: "Facilities", title: "Showers and toilets", text: "Toilets, accessible toilets and parking, and covered outdoor cold showers." },
      { label: "Dogs & horses", title: "Summer restrictions", text: "Check the council page for the current dates." },
      { label: "Cliffs", title: "Caves and arches", text: "Watch the tide if exploring the caves." }
    ],
    stay: {
      intro: "Portrush is the easiest base, a few minutes' drive away.",
      picks: [{ name: "Royal Court Hotel", type: "Hotel", note: "Close to Whiterocks with views over this stretch of coast. Researched listing." }]
    },
    food: { text: ["Beach services are seasonal; Portrush has dependable cafés and evening venues."] },
    todo: [
      { label: "Walk", title: "Cliff path to Magheracross", text: "Viewpoint over Dunluce Castle and the coast." },
      { label: "Explore", title: "Limestone arches", text: "The cliffs and caves at the beach." },
      causeway
    ],
    travel: [{ label: "By car", title: "A2 Causeway Coastal Route", text: "Just east of Portrush." }],
    nearby: [
      { name: "Portrush East Strand", href: "/guides/surfing-portrush-east-strand/", distance: "Same stretch of sand", text: "The simplest fallback, with schools in town." },
      { name: "Portrush West Strand", href: "/guides/surfing-portrush-west-strand/", text: "Town beach facing a different way." },
      { name: "White Park Bay", href: "/guides/surfing-white-park-bay/", text: "Wild, unlifeguarded bay further east." }
    ],
    faqs: [
      { q: "Is parking free at Whiterocks?", a: "Yes, in the main and overflow car parks." },
      { q: "Are there lifeguards?", a: "Yes, a seasonal RNLI patrol. Check the RNLI page for this year's dates." },
      { q: "Can I hire a board at Whiterocks?", a: "A seasonal outlet offers hire at the beach; Troggs in Portrush hires year-round by booking." }
    ],
    sources: [council("whiterocks-portrush"), { label: "RNLI — Whiterocks", url: "https://rnli.org/find-my-nearest/lifeguarded-beaches/portrush-whiterocks-beach" }, { label: "Troggs Surf School", url: "https://troggssurfschool.co.uk/" }],
    editorial: niEditorial
  }),

  base("portstewart-strand", {
    name: "Portstewart Strand",
    area: "Portstewart, County Londonderry",
    geo: [55.1700, -6.7300],
    title: "Portstewart Strand Surf Guide: Beach Parking, Facilities & Safety | Surfbooker",
    description: "Portstewart Strand: two miles of National Trust sand with drive-on beach parking (£8.50, card only), Changing Places toilet, beach wheelchairs, lifeguard zones, Harry's Shack and dune walks.",
    heroIntro: "Two miles of National Trust sand backed by ancient dunes, where you can park on the beach itself — spacious, family-friendly and full of shifting peaks.",
    heroAlt: "Portstewart Strand with cars parked on the sand and dunes behind",
    images: { hero: lic("portstewart-strand") },
    glance: [
      ["Best for", "Families, beginners on small days"],
      ["Break", "Open sandy beach break"],
      ["Managed by", "National Trust"],
      ["Parking", "On the beach, £8.50, card only"],
      ["Facilities", "Toilets, Changing Places, beach wheelchairs"],
      ["Food", "Harry's Shack at the entrance"]
    ],
    overview: [
      "Portstewart Strand is a two-mile National Trust beach running west from Portstewart to the mouth of the River Bann, backed by dunes up to 6,000 years old. Cars can drive onto managed parts of the sand, which makes it unusually easy to unload boards.",
      "There are many peaks along the strand and plenty of space, but vehicles, soft sand and the estuary all need attention."
    ],
    suits: ["Families who want to park by the sand", "Accessible beach days", "Spreading out on a busy summer day"],
    notFor: ["Surfing near the estuary at the Barmouth", "Cash-only visitors — parking is card only"],
    surf: {
      text: ["An open sandy beach break with multiple shifting peaks; conditions vary along the strand. Beginners should stick to modest surf and supervised areas. Use the black-and-white flagged zone for non-powered craft when it's set out."],
      cards: [
        { label: "Level", title: "Beginners to intermediates", text: "On small days; more demanding as size builds." },
        { label: "Hazards", title: "Rips, cars and estuary", text: "Rip currents, moving vehicles on the sand, soft sand and estuary currents towards the Barmouth." },
        lifeguardsCard
      ]
    },
    lessons: {
      text: ["No permanent on-beach surf school was confirmed in the official sources. Portrush schools are 15 minutes away — confirm where they're running each session."],
      providers: [TROGGS, PSS]
    },
    practical: [
      { label: "Parking", title: "On the beach", text: "National Trust lists £8.50 per car, card only, capacity-limited; members park free. Last vehicle entry is one hour before closing." },
      { label: "Facilities", title: "Inclusive facilities", text: "Toilets, accessible toilet, a Changing Places facility, blue-badge parking and pre-bookable beach wheelchairs." },
      { label: "Signal", title: "Variable", text: "The National Trust describes mobile reception as variable." },
      { label: "Safety", title: "Read the beach safety page", text: "The National Trust publishes specific beach-safety guidance for the strand." }
    ],
    stay: {
      areas: [
        { label: "Town", title: "Portstewart", text: "The natural base, with promenade cafés." },
        { label: "Alternatives", title: "Portrush or Coleraine", text: "More accommodation and transport." }
      ]
    },
    food: {
      places: [{ name: "Harry's Shack", type: "Restaurant at the strand entrance", note: "Highlighted by Discover Northern Ireland for coffee, local food and post-surf drinks." }]
    },
    todo: [
      { label: "Walk", title: "Dunes and estuary trail", text: "A 3.5-mile National Trust walk through the dunes to the Bann estuary." },
      { label: "Town", title: "Portstewart promenade", text: "Victorian seafront and ice cream." },
      causeway
    ],
    travel: [{ label: "Rail", title: "Coleraine", text: "The nearest station, with buses to Portstewart." }],
    nearby: [
      { name: "Portrush West Strand", href: "/guides/surfing-portrush-west-strand/", distance: "About 15 minutes", text: "The closest town alternative." },
      { name: "Castlerock", href: "/guides/surfing-castlerock/", text: "Across the Bann — by road via Coleraine." },
      { name: "Benone Strand", href: "/guides/surfing-benone-strand/", text: "Long, beginner-friendly beach further west." }
    ],
    faqs: [
      { q: "Can you drive on Portstewart Strand?", a: "Yes, onto managed parts of the beach. The National Trust charges £8.50 per car (card only); members park free." },
      { q: "Is there a surf school at Portstewart?", a: "None is permanently based on the strand. Portrush schools are 15 minutes away." },
      { q: "Is it accessible?", a: "There's a Changing Places facility, blue-badge parking and pre-bookable beach wheelchairs." }
    ],
    sources: [
      { label: "National Trust — Portstewart Strand", url: "https://www.nationaltrust.org.uk/visit/northern-ireland/portstewart-strand" },
      { label: "National Trust — beach safety at Portstewart Strand", url: "https://www.nationaltrust.org.uk/visit/northern-ireland/portstewart-strand/beach-safety-when-visiting-portstewart-strand" },
      DNI
    ],
    editorial: niEditorial
  }),

  base("benone-strand", {
    name: "Benone Strand",
    area: "Near Limavady, County Londonderry",
    geo: [55.1650, -6.8800],
    title: "Benone Strand Surf Guide: Long Line Surf School, Parking & Facilities | Surfbooker",
    description: "Benone Strand: seven miles of firm sand under Binevenagh with Long Line Surf School, free parking, showers at the Ark, inclusive beach equipment, seasonal lifeguards and Mussenden Temple nearby.",
    heroIntro: "Seven miles of firm, mostly rock-free sand beneath Binevenagh — Northern Ireland's best beach for a first lesson or a mixed family surf day.",
    images: { hero: "guides/_licensed-images/uk-destinations/benone-strand.jpg" },
    heroAlt: "Benone Strand, County Londonderry",
    glance: [
      ["Best for", "First lessons, families, inclusive surfing"],
      ["Break", "Sandy beach break, many peaks"],
      ["Lifeguards", "Seasonal RNLI patrol and zones"],
      ["Parking", "Free, at the entrance and on the beach"],
      ["Facilities", "Toilets, showers and changing at the Ark"],
      ["Surf school", "Long Line, on site"]
    ],
    overview: [
      "Benone Strand is part of a seven-mile beach that runs from the Magilligan peninsula to Downhill, beneath the cliffs of Binevenagh, with views across to Donegal. The sand is firm and largely rock-free.",
      "The managed entrance has the Ark (toilets, showers and changing), a surf school, a café and one of Northern Ireland's leading inclusive-beach setups. That makes it the strongest choice in Northern Ireland for a first lesson."
    ],
    suits: ["First lessons", "Families", "Inclusive and adaptive surfing", "Camping holidays"],
    notFor: ["Experienced surfers wanting power — Downhill end is more exposed"],
    surf: {
      text: ["A sandy beach break with many peaks and usually approachable small waves. It's still an exposed Atlantic beach and becomes demanding as size builds — respect the activity zones."],
      cards: [
        { label: "Level", title: "Beginners to intermediates", text: "The best learner beach in Northern Ireland." },
        { label: "Hazards", title: "Rips and vehicles", text: "Rips, changing banks, cars on the beach and isolation away from the entrance." },
        lifeguardsCard
      ]
    },
    lessons: { providers: [LONGLINE] },
    practical: [
      { label: "Parking", title: "Free", text: "At the entrance and on the beach. Check the sand and tide before driving onto the strand." },
      { label: "Facilities", title: "The Ark", text: "Toilets, showers and changing facilities, accessible parking and pre-booked specialist beach equipment." },
      { label: "Lifeguards", title: "Seasonal RNLI", text: "Patrols and activity zones in season." },
      { label: "Dogs", title: "Seasonal restrictions", text: "Check the council page for current dates." }
    ],
    stay: {
      picks: [{ name: "Benone Holiday and Leisure Park", type: "Council-run holiday park", url: "https://causewaycoastandglens.gov.uk/see-do/caravan-parks/benone-caravan-park", note: "Touring pitches, camping and glamping lodges beside the strand. Researched listing." }],
      areas: [{ label: "Alternatives", title: "Castlerock and Limavady", text: "Village and town bases nearby." }]
    },
    food: {
      places: [
        { name: "Sea Shed Coffee & Surf", type: "Coffee and surf hire", note: "Beside the surf school." },
        { name: "The Ark coffee dock", type: "Café", note: "At the beach facilities." },
        { name: "Waves Bistro", type: "Bistro", note: "At the neighbouring leisure park." }
      ]
    },
    todo: [
      { label: "Heritage", title: "Mussenden Temple and Downhill Demesne", text: "National Trust clifftop temple at the eastern end of the strand." },
      { label: "Viewpoint", title: "Binevenagh", text: "The escarpment above the beach." }
    ],
    travel: [{ label: "By car", title: "A2 coast road", text: "Between Limavady and Coleraine." }],
    nearby: [
      { name: "Downhill Beach", href: "/guides/surfing-downhill-beach/", distance: "Same strand, eastern end", text: "More exposed, under Mussenden Temple." },
      { name: "Castlerock", href: "/guides/surfing-castlerock/", text: "Village-backed beach to the east." },
      { name: "Portstewart Strand", href: "/guides/surfing-portstewart-strand/", text: "National Trust strand across the Bann." }
    ],
    faqs: [
      { q: "Is Benone good for learning to surf?", a: "Yes — it's the best first-lesson beach in Northern Ireland, with Long Line Surf School on site and lifeguards in season." },
      { q: "Is parking free?", a: "Yes, at the entrance and on the beach." },
      { q: "Are there showers?", a: "Yes, at the Ark, along with toilets and changing facilities." }
    ],
    sources: [council("benone-strand"), { label: "Long Line Surf School", url: "https://longlinesurfschool.co.uk/" }, { label: "Benone Holiday and Leisure Park", url: "https://causewaycoastandglens.gov.uk/see-do/caravan-parks/benone-caravan-park" }, RNLI],
    editorial: niEditorial
  }),

  base("downhill-beach", {
    name: "Downhill Beach",
    area: "Near Castlerock, County Londonderry",
    geo: [55.1680, -6.8150],
    title: "Downhill Beach Surf Guide: Parking, Lifeguards & Mussenden Temple | Surfbooker",
    description: "Downhill Beach beneath Mussenden Temple: the more exposed eastern end of the Benone strand. Free on-beach parking, toilets, seasonal lifeguards, lessons at Benone and the Castlerock walk.",
    heroIntro: "The dramatic eastern end of the seven-mile strand, directly beneath Mussenden Temple — more exposed than Benone and better for confident surfers.",
    heroAlt: "Downhill Beach with Mussenden Temple on the cliff above",
    images: { hero: lic("downhill-beach") },
    glance: [
      ["Best for", "Confident surfers"],
      ["Break", "Exposed sandy beach break"],
      ["Lifeguards", "Seasonal RNLI patrol"],
      ["Parking", "Free on the beach (outside restricted area)"],
      ["Facilities", "Toilets and accessible toilets at entrance"],
      ["Lessons", "Long Line at Benone"]
    ],
    overview: [
      "Downhill is the eastern end of the long strand that starts at Benone, overlooked by Mussenden Temple on its clifftop. It catches more swell than the Benone end and has fewer facilities, so treat it as a choice for the day's conditions rather than the default learner beach."
    ],
    suits: ["Confident surfers on smaller swells", "Combining surf with Mussenden Temple"],
    notFor: ["First lessons — go to Benone"],
    surf: {
      text: ["An exposed sandy beach break that can hold more size than Benone."],
      cards: [
        { label: "Level", title: "Intermediates+", text: "Beginners should book at Benone." },
        { label: "Hazards", title: "Rips and soft sand", text: "Stronger surf, rips, soft sand and tide risk for cars." },
        lifeguardsCard
      ]
    },
    lessons: { providers: [LONGLINE] },
    practical: [
      { label: "Parking", title: "On the beach", text: "Free year-round outside the restricted area east of the entrance posts. Wind-blown sand can make access difficult — check the route back." },
      { label: "Facilities", title: "Toilets", text: "Toilets, accessible toilets and parking at the entrance." },
      { label: "Dogs & horses", title: "Summer restrictions", text: "Check the council page." }
    ],
    stay: {
      areas: [
        { label: "Family base", title: "Benone Holiday and Leisure Park", text: "Camping, touring and lodges at the Benone end." },
        { label: "Village", title: "Castlerock", text: "Self-catering cottages close by." }
      ]
    },
    food: { text: ["Use Benone's Sea Shed and Waves Bistro, or Castlerock's cafés. Don't assume anything on the strand is open year-round."] },
    todo: [
      { label: "Heritage", title: "Mussenden Temple and Downhill Demesne", text: "National Trust temple and ruined mansion above the beach." },
      { label: "Walk", title: "Castlerock to Mussenden Temple", text: "A 4.2-mile signature walk." }
    ],
    travel: [{ label: "Rail", title: "Castlerock station", text: "On the Coleraine–Derry line." }],
    nearby: [
      { name: "Benone Strand", href: "/guides/surfing-benone-strand/", distance: "Same strand", text: "Better for learners, with a school and the Ark." },
      { name: "Castlerock", href: "/guides/surfing-castlerock/", distance: "Next beach east", text: "Village-backed beach." }
    ],
    faqs: [
      { q: "Can you park on Downhill Beach?", a: "Yes, free year-round outside the restricted area east of the entrance posts." },
      { q: "Is Downhill good for beginners?", a: "Benone, at the other end of the strand, is better — that's where Long Line Surf School is based." }
    ],
    sources: [council("downhill-beach/"), { label: "Discover NI — Castlerock to Mussenden Temple walk", url: "https://discovernorthernireland.com/listing/castlerock-to-mussenden-temple-signature-walk/102807101/" }, { label: "Long Line Surf School", url: "https://longlinesurfschool.co.uk/" }],
    editorial: niEditorial
  }),

  base("castlerock", {
    name: "Castlerock",
    fullName: "Castlerock Beach",
    area: "Castlerock, County Londonderry",
    geo: [55.1650, -6.7900],
    title: "Castlerock Surf Guide: Beach, Parking, Lifeguards & Where to Stay | Surfbooker",
    description: "Castlerock beach between Downhill and the River Bann: free promenade parking, accessible toilets, seasonal lifeguards, estuary current safety, self-catering stays and the Mussenden Temple walk.",
    heroIntro: "A quiet village beach between the Downhill cliffs and the River Bann, with a railway station, a promenade and dunes behind.",
    heroAlt: "Castlerock beach with dunes and the village behind",
    images: { hero: lic("castlerock") },
    glance: [
      ["Best for", "Quieter village surf trips"],
      ["Break", "Sandy beach break"],
      ["Lifeguards", "Seasonal RNLI patrol"],
      ["Parking", "Free on the promenade"],
      ["Facilities", "Accessible toilets and parking"],
      ["Rail", "Castlerock station"]
    ],
    overview: [
      "Castlerock's beach runs for about a kilometre from the Downhill cliffs to the Barmouth, where the River Bann reaches the sea. Dunes and a golf course sit behind it, and the village has its own railway station.",
      "It's a calmer, quieter base than Portrush. The estuary is the main thing to understand — keep well clear of its currents."
    ],
    suits: ["Quiet trips by train", "Self-catering stays", "Surfers who bring their own kit"],
    notFor: ["Walk-up lessons or hire — book ahead elsewhere"],
    surf: {
      text: ["Sandy beach break with shifting lefts and rights. Moderate swell and southerly wind are commonly preferred."],
      cards: [
        { label: "Hazards", title: "Bann estuary", text: "Strong river and tidal currents near the Barmouth, plus rips, cars and soft sand." },
        lifeguardsCard
      ]
    },
    lessons: {
      text: ["No permanent Castlerock surf school was verified. Long Line operates at Benone and Portrush has several schools — book before you travel."],
      providers: [LONGLINE]
    },
    practical: [
      { label: "Parking", title: "Promenade", text: "Free promenade parking and four boardwalks to the beach. Cars are allowed on the eastern beach year-round, but wind-blown sand can make access difficult." },
      { label: "Facilities", title: "Accessible toilets", text: "Accessible toilets and parking on the promenade." },
      { label: "Dogs & horses", title: "Summer restrictions", text: "Check the council page." }
    ],
    stay: {
      picks: [
        { name: "Sandy Feet Retreat", type: "Self-catering", url: "https://discovernorthernireland.com/listing/sandy-feet-retreat/85163101/", note: "Listed by Discover Northern Ireland. Researched listing." },
        { name: "The Cowshed at Mussenden", type: "Self-catering", note: "Researched listing." },
        { name: "Windrose", type: "Self-catering", note: "Researched listing." }
      ]
    },
    food: { text: ["Village cafés cluster near the station and promenade."] },
    todo: [
      { label: "Walk", title: "Castlerock to Mussenden Temple", text: "The 4.2-mile signature walk." },
      { label: "Heritage", title: "Hezlett House", text: "National Trust thatched house near the village." },
      { label: "Rail", title: "Coast line", text: "The scenic train towards Derry~Londonderry or Coleraine." }
    ],
    travel: [{ label: "Rail", title: "Castlerock station", text: "On the Belfast/Coleraine–Derry~Londonderry line." }],
    nearby: [
      { name: "Downhill Beach", href: "/guides/surfing-downhill-beach/", distance: "Next beach west", text: "More exposed, below Mussenden Temple." },
      { name: "Benone Strand", href: "/guides/surfing-benone-strand/", text: "Learner beach with a surf school." },
      { name: "Portstewart Strand", href: "/guides/surfing-portstewart-strand/", text: "Across the Bann — drive via Coleraine." }
    ],
    faqs: [
      { q: "Is there a surf school in Castlerock?", a: "No permanent one was verified. Book with Long Line at Benone or a Portrush school." },
      { q: "Is it safe near the river mouth?", a: "Keep well clear — the Bann estuary has strong river and tidal currents." }
    ],
    sources: [council("castlerock-beach/"), { label: "Discover NI — Castlerock to Mussenden Temple walk", url: "https://discovernorthernireland.com/listing/castlerock-to-mussenden-temple-signature-walk/102807101/" }],
    editorial: niEditorial
  }),

  base("white-park-bay", {
    name: "White Park Bay",
    area: "Near Ballintoy, County Antrim",
    geo: [55.2360, -6.4140],
    title: "White Park Bay: Beach Guide, Rip Warning, Parking & Walks | Surfbooker",
    description: "White Park Bay on the Causeway Coast: a beautiful National Trust beach with a dangerous rip-current warning, no lifeguards or toilets, steep access, and walks to Ballintoy Harbour.",
    heroIntro: "A secluded arc of sand and ancient dunes between two North Antrim headlands — a beautiful walk, but not a place to swim or learn to surf.",
    heroAlt: "White Park Bay's curve of sand between headlands on the North Antrim coast",
    images: { hero: lic("white-park-bay") },
    eyebrow: "Northern Ireland beach guide",
    glance: [
      ["Best for", "Walks and wildlife"],
      ["Surf", "Expert, locally informed only"],
      ["Lifeguards", "None"],
      ["Safety", "National Trust: dangerous rips"],
      ["Parking", "Small, free car park on the B146"],
      ["Toilets", "None"]
    ],
    overview: [
      "White Park Bay is a National Trust beach on the North Antrim coast, between Ballintoy and Portbraddan, with a wide sweep of sand and old dunes — often shared with grazing cattle.",
      "The National Trust says swimming here is unsafe because of dangerous rip currents. There are no lifeguards, toilets or surf services, and the access is steep. Surfbooker lists it as a coastal walk and wildlife stop, not a surf beach."
    ],
    suits: ["Coastal walks", "Wildlife and fossil hunting"],
    notFor: ["Swimming", "Beginner or unaccompanied surfing", "Wheelchairs and pushchairs"],
    surf: {
      title: "Surf and safety",
      text: ["White Park Bay is exposed and remote with no managed surf infrastructure. Any surfing here is for experienced, locally informed surfers only."],
      note: "For lessons, go to Portrush East Strand or Benone Strand."
    },
    practical: [
      { label: "Parking", title: "Very limited", text: "A small free car park on the B146." },
      { label: "Access", title: "Steep", text: "Steps, slopes and kissing gates down to the beach — not suitable for wheelchairs or pushchairs." },
      { label: "Facilities", title: "None", text: "No toilets." },
      { label: "Dogs", title: "Leads around livestock", text: "Cattle graze the dunes." }
    ],
    stay: {
      picks: [{ name: "Portbraddan Cottage", type: "National Trust holiday cottage", note: "At the western end of the bay. Researched listing." }],
      areas: [{ label: "Bases", title: "Ballycastle, Bushmills and Ballintoy", text: "More practical for services." }]
    },
    food: { text: ["Bothy, near the top of the access road, is highlighted by Discover Northern Ireland — check opening days."] },
    todo: [
      { label: "Harbour", title: "Ballintoy Harbour", text: "A short walk west." },
      { label: "Bridge", title: "Carrick-a-Rede", text: "National Trust rope bridge nearby." },
      causeway
    ],
    travel: [{ label: "By car", title: "B146 off the A2", text: "Between Ballintoy and Bushmills." }],
    nearby: [
      { name: "Ballycastle Beach", href: "/guides/surfing-ballycastle-beach/", text: "Lifeguarded town beach in summer." },
      { name: "Whiterocks", href: "/guides/surfing-whiterocks/", text: "Lifeguarded surf beach near Portrush." }
    ],
    faqs: [
      { q: "Can you swim at White Park Bay?", a: "The National Trust says swimming is unsafe because of dangerous rip currents. There are no lifeguards." },
      { q: "Are there toilets?", a: "No." }
    ],
    sources: [{ label: "National Trust — White Park Bay", url: "https://www.nationaltrust.org.uk/visit/northern-ireland/white-park-bay" }],
    editorial: niEditorial
  }),

  base("ballycastle-beach", {
    name: "Ballycastle Beach",
    area: "Ballycastle, County Antrim",
    geo: [55.2050, -6.2400],
    title: "Ballycastle Beach Guide: Surf, Lifeguards, Parking & Rathlin Island | Surfbooker",
    description: "Ballycastle Beach: an accessible town beach from the marina to Pans Rock with seasonal lifeguards, accessible facilities, inconsistent surf, and where to stay, eat and explore including Rathlin Island.",
    heroIntro: "A sand-and-shingle town beach facing Rathlin Island and Fair Head — a great family base, but an occasional surf spot that needs the right swell.",
    heroAlt: "Ballycastle beach with Fair Head in the distance",
    images: { hero: lic("ballycastle-beach") },
    glance: [
      ["Best for", "Family beach days; occasional surf"],
      ["Break", "Sand and shingle, rocks at ends"],
      ["Lifeguards", "Seasonal RNLI patrol"],
      ["Parking", "Town and harbour parking"],
      ["Facilities", "Accessible toilets and parking"],
      ["Nearby", "Rathlin Island ferry"]
    ],
    overview: [
      "Ballycastle's beach runs for 1.2km from the marina to Pans Rock, with Fair Head and Rathlin Island framing the view. A promenade, footbridge and boardwalk make it easy to reach from town.",
      "It's less exposed than Portrush, so it only works on the right swell direction. Treat it as an occasional surf and a reliable family beach."
    ],
    suits: ["Families staying in Ballycastle", "Flexible surfers who can check the forecast"],
    notFor: ["Dependable surf", "Lessons — none based here"],
    surf: {
      text: ["Mostly sandy, with shingle and rocks towards the ends. A big offshore swell forecast doesn't mean the bay will work — it needs the right direction."],
      cards: [
        { label: "Hazards", title: "Rocks and harbour", text: "Rips, rocks near Pans Rock, harbour activity and fast-changing weather." },
        lifeguardsCard
      ]
    },
    lessons: { text: ["No permanent Ballycastle surf school was verified. For a first lesson, use Portrush or Benone schools."] },
    practical: [
      { label: "Parking", title: "Town and harbour", text: "Serves the western end of the beach." },
      { label: "Facilities", title: "Accessible", text: "Visitor information, accessible parking and toilets, wheelchair access and a viewing platform." },
      { label: "Dogs", title: "Seasonal restrictions", text: "Check the council page." }
    ],
    stay: {
      picks: [
        { name: "Marine Hotel", type: "Hotel, seafront", note: "Researched listing." },
        { name: "Ocean View Chalets", type: "Self-catering", note: "Family option. Researched listing." },
        { name: "Stay Indigo", type: "Self-catering, town centre", url: "https://discovernorthernireland.com/listing/stay-indigo/78745101/", note: "Listed by Discover Northern Ireland. Researched listing." }
      ]
    },
    food: { text: ["The harbour and town centre have cafés, seafood, pubs and restaurants within walking distance — check seasonal hours."] },
    todo: [
      { label: "Island", title: "Rathlin Island", text: "Ferry from Ballycastle harbour — seabirds and puffins in season." },
      { label: "Walk", title: "Fair Head", text: "Dramatic cliffs east of town." },
      { label: "Day trip", title: "Carrick-a-Rede and Giant's Causeway", text: "West along the coast." }
    ],
    travel: [{ label: "By car", title: "A2 / A44", text: "About an hour and a quarter from Belfast." }],
    nearby: [
      { name: "White Park Bay", href: "/guides/surfing-white-park-bay/", text: "Scenic but with a National Trust rip warning." },
      { name: "Portrush East Strand", href: "/guides/surfing-portrush-east-strand/", text: "Dependable surf and lessons." }
    ],
    faqs: [
      { q: "Is Ballycastle good for surfing?", a: "Only on the right swell direction. It's a great family beach but an occasional surf spot." },
      { q: "Is Ballycastle beach lifeguarded?", a: "Yes, in the main summer season." }
    ],
    sources: [council("ballycastle-beach/"), { label: "Discover NI — beaches and seaside towns", url: "https://discovernorthernireland.com/plan-your-trip/trip-inspiration/seasonal-inspiration/beaches-and-seaside-towns/" }, RNLI],
    editorial: niEditorial
  })
];

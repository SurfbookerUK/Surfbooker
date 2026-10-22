// Northeast England & Yorkshire destination guides. Researched October 2026 from RNLI, council,
// National Park and operator pages. Lifeguard dates are the RNLI's published 2026 season.
const lic = (slug) => `guides/_licensed-images/uk-destinations/${slug}.jpg`;
const base = (slug, extra) => ({
  region: "northeast-england-yorkshire",
  path: `/guides/surfing-${slug}/`,
  outFile: `guides/surfing-${slug}/index.html`,
  slug,
  ...extra
});
const RNLI = { label: "RNLI — find a lifeguarded beach", url: "https://rnli.org/find-my-nearest/lifeguarded-beaches" };
const RNLI_NY = { label: "RNLI — 2026 North Yorkshire lifeguard patrols", url: "https://rnli.org/news-and-media/2026/april/27/rnli-lifeguards-start-daily-beach-patrols-in-north-yorkshire" };
const RNLI_TEES = { label: "RNLI — 2026 Redcar and Saltburn patrols", url: "https://rnli.org/news-and-media/2026/may/20/rnli-lifeguards-start-daily-beach-patrols-at-redcar-and-saltburn" };
const NYC_DOGS = { label: "North Yorkshire Council — dog control, Scarborough area", url: "https://www.northyorks.gov.uk/environment-and-neighbourhoods/animals/dogs/dog-control-scarborough-area" };
const NYM = { label: "North York Moors National Park — surfing and paddleboarding", url: "https://www.northyorkmoors.org.uk/things-to-do/coast/surfing-and-paddle-boarding" };
const RC = { label: "Redcar & Cleveland Council — visitor information", url: "https://www.redcar-cleveland.gov.uk/things-to-see-and-do/visitors-information" };
const neEditorial = "Researched by Surfbooker from RNLI, council, National Park and operator sources; Surfbooker has not reviewed these businesses in person. North Sea surf comes and goes quickly — treat this as planning information, not a conditions report.";
const NY_SHORT = "Seasonal RNLI patrol";
const NY_FAQ = "Yes, in season. RNLI lifeguards patrol in summer; the 2026 dates are in the Lifeguards section above.";
const NY_SEASON = "RNLI lifeguards patrolled weekends from 2 May and then daily to 6 September in 2026, 10am–6pm. Check the RNLI page for the current year.";
const NY_DOGS = "North Yorkshire Council restricts dogs on parts of the Scarborough, Filey and Whitby beaches from 1 May to 30 September — check the council's map for the exact zones.";
const northSea = { label: "Season", title: "Autumn to spring", text: "North Sea swell is most reliable outside summer; summer is often small but good for lessons." };
const SCARBOROUGH_SS = { name: "Scarborough Surf School & Secret Spot Surf Shop", type: "Surf school & shop, Cayton Bay", url: "https://scarboroughsurfschool.co.uk/", note: "Teaches year-round, seven days a week from its clifftop base at Cayton Bay, with kids' clubs and junior courses." };
const DEXTERS = { name: "Dexters Surf Shop, School & Hire Centre", type: "Surf school & hire, Scarborough", note: "Listed by the North York Moors National Park as a Scarborough surf school and hire centre." };
const WHITBY_SS = { name: "Whitby Surf School", type: "Surf school & hire, West Cliff Beach", note: "Based on West Cliff Beach; lessons for children aged 8+ and adults, plus hire (YHA and National Park listings)." };

export const destinations = [
  base("tynemouth-longsands", {
    name: "Tynemouth Longsands",
    area: "Tynemouth, Tyne and Wear",
    geo: [55.0250, -1.4240],
    title: "Tynemouth Longsands Surf Guide: Lessons, Hire, Lifeguards & Metro | Surfbooker",
    description: "Surfing Tynemouth Longsands: Tynemouth Surf Co and Longsands Surf School, 2026 RNLI lifeguard dates, summer dog restrictions, parking, the Metro and where to eat in Tynemouth.",
    heroIntro: "The north-east's best-known surf beach — half a mile of sand below Tynemouth's seafront, with two surf schools, lifeguards in summer and a Metro station up the road.",
    images: { hero: "guides/_licensed-images/uk-destinations/tynemouth-longsands.jpg" },
    heroAlt: "Tynemouth Longsands",
    glance: [
      ["Best for", "Lessons through to experienced"],
      ["Break", "Sandy beach break, reef at north end"],
      ["Lifeguards", "RNLI daily 23 May–6 Sep 2026"],
      ["Dogs", "South end restricted 1 May–30 Sep"],
      ["Schools", "Tynemouth Surf Co, Longsands Surf School"],
      ["Transport", "Tyne and Wear Metro"]
    ],
    overview: [
      "Longsands runs north from Tynemouth towards Cullercoats, a broad sandy beach backed by dunes and the Grand Parade. It's the heart of north-east surfing, with a lifeguard station, surf schools and the cafés of Tynemouth Front Street a short walk away.",
      "Beginners use the central sand with a school; the rockier north end is for more experienced surfers."
    ],
    suits: ["First lessons", "Car-free trips from Newcastle by Metro", "Surf-and-café weekends"],
    notFor: ["Dogs on the south end in summer", "Space on hot summer weekends"],
    surf: {
      text: ["Longsands picks up North Sea swell from the north-east and east; westerly winds are offshore. Several peaks shift along the beach with the sandbanks. North Sea swell can arrive and disappear within hours, so check the beach rather than a regional headline."],
      cards: [
        { label: "Level", title: "All levels", text: "Learners in the middle with a school; reef at the north end for experienced surfers." },
        { label: "Hazards", title: "Rips and rocks", text: "Rip currents, cold water, crowds in summer and rocks at the ends." },
        northSea
      ]
    },
    lessons: {
      providers: [
        { name: "Tynemouth Surf Co", type: "Surf school, hire & shop", url: "https://tynemouthsurf.co.uk/surf-school/surf-lessons-at-longsands/", note: "Group lessons next to the lifeguard station at weekends and daily in the summer holidays; ages 12+ (under-12s with an adult). Shop at street level." },
        { name: "Longsands Surf School", type: "Surf school & hire, South Promenade", url: "https://www.longsandsurf.com/", note: "Kids' and adult lessons and year-round board and wetsuit hire without booking." }
      ]
    },
    practical: [
      { label: "Lifeguards", title: "RNLI patrol", text: "Daily 23 May–6 September 2026, 10am–6pm. No flags means no lifeguards." },
      { label: "Dogs", title: "Seasonal restriction", text: "North Tyneside restricts dogs on the southern end of Longsands from 1 May to 30 September. Signs show the zone." },
      { label: "Parking", title: "Seafront pay and display", text: "Pay-and-display parking along Grand Parade and the car parks above the beach. Busy on sunny weekends — the Metro is easier." },
      { label: "Facilities", title: "Seafront", text: "Toilets, cafés and the surf schools' shops are along the promenade." }
    ],
    stay: {
      areas: [
        { label: "Seaside", title: "Tynemouth and Cullercoats", text: "Walk to the beach and Front Street." },
        { label: "City", title: "Newcastle", text: "Around 25 minutes by Metro, with far more accommodation." }
      ]
    },
    food: { text: ["Tynemouth's Front Street, the station market and the promenade have plenty of cafés, pubs and restaurants."] },
    todo: [
      { label: "Heritage", title: "Tynemouth Priory and Castle", text: "English Heritage ruins on the headland." },
      { label: "Market", title: "Tynemouth station market", text: "Weekend market in the Victorian station." },
      { label: "Beach", title: "King Edward's Bay", text: "Small sheltered bay below the priory." },
      { label: "Food", title: "North Shields Fish Quay", text: "Fish and chips by the river mouth." }
    ],
    travel: [{ label: "Metro", title: "Tynemouth station", text: "Direct Metro from Newcastle city centre; the beach is a short walk." }],
    nearby: [
      { name: "South Shields", href: "/guides/surfing-south-shields/", text: "Across the Tyne — Sandhaven Beach." },
      { name: "Druridge Bay", href: "/guides/surfing-druridge-bay/", text: "Long, quiet Northumberland beach." },
      { name: "Saltburn", href: "/guides/surfing-saltburn/", text: "Teesside's surf town." }
    ],
    faqs: [
      { q: "Is Tynemouth Longsands lifeguarded?", a: "Yes, daily from 23 May to 6 September in 2026, 10am–6pm." },
      { q: "Can dogs go on Longsands?", a: "Not on the southern end from 1 May to 30 September. Signs show the restricted zone." },
      { q: "Can I hire a surfboard without a lesson?", a: "Yes — Longsands Surf School offers year-round hire without booking; Tynemouth Surf Co also has a shop." }
    ],
    sources: [
      { label: "RNLI — Tynemouth Longsands", url: "https://rnli.org/find-my-nearest/lifeguarded-beaches/tynemouth-longsands-beach" },
      { label: "North Tyneside Council — Longsands Beach", url: "https://www.northtyneside.gov.uk/sport-and-leisure/outdoor-spaces/find-beaches-and-open-water/longsands-beach" },
      { label: "Tynemouth Surf Co — lessons", url: "https://tynemouthsurf.co.uk/surf-school/surf-lessons-at-longsands/" },
      { label: "Longsands Surf School", url: "https://www.longsandsurf.com/" }
    ],
    editorial: neEditorial
  }),

  base("south-shields", {
    name: "South Shields",
    fullName: "Sandhaven Beach, South Shields",
    area: "South Shields, Tyne and Wear",
    geo: [55.0050, -1.4150],
    title: "South Shields Surf Guide: Sandhaven Beach, Lessons & Lifeguards | Surfbooker",
    description: "Surfing Sandhaven Beach, South Shields: South Shields Surf School, two RNLI lifeguard stations in summer, the seafront parks and fairground, and Tynemouth across the river.",
    heroIntro: "South Shields' big town beach at the mouth of the Tyne, with a community surf school, summer lifeguards and a seafront full of family attractions.",
    heroAlt: "Sandhaven Beach at South Shields with the seafront behind",
    images: { hero: lic("south-shields") },
    glance: [
      ["Best for", "Beginners and improvers"],
      ["Break", "Sandy beach break"],
      ["Lifeguards", "Two RNLI stations in season"],
      ["School", "South Shields Surf School"],
      ["Family", "Parks, fairground, miniature railway"],
      ["Transport", "Metro to South Shields"]
    ],
    overview: [
      "Sandhaven is the long sandy beach on South Shields seafront, south of the Tyne piers and Littlehaven. Behind it are Ocean Beach Pleasure Park, the Dunes and South Marine Park with its miniature steam railway, so it suits families with a mix of surfers and non-surfers.",
      "South Shields Surf School is based on the beach and runs surfing and paddleboarding."
    ],
    suits: ["First lessons", "Families with non-surfers", "Car-free trips by Metro"],
    notFor: ["Quiet, wild beach days"],
    surf: {
      text: ["Sandhaven is a sandy beach break picking up north-east to east North Sea swell; westerly winds are offshore. The Tyne pier gives some shelter at the north end."],
      cards: [
        { label: "Level", title: "Beginners to improvers", text: "Good for lessons on small days." },
        { label: "Zones", title: "Shared water", text: "South Tyneside Council notes surfers and kayakers can occasionally be found inside the beach safety zone — give swimmers room." },
        northSea
      ]
    },
    lessons: {
      providers: [{ name: "South Shields Surf School", type: "Surf school & hire, Sandhaven Beach", url: "https://www.southshieldsurf.co.uk/", note: "Surfing and paddleboarding lessons, family rockpooling sessions and equipment hire." }]
    },
    practical: [
      { label: "Lifeguards", title: "Two RNLI stations", text: "South Tyneside Council says there are two RNLI lifeguard stations on Sandhaven in the high season, usually May to September." },
      { label: "Dogs", title: "Seasonal rules", text: "Dog restrictions apply on parts of the beach in season — see the council's 'visiting our beaches' page." },
      { label: "Facilities", title: "Seafront", text: "Restaurants, cafés and pubs along the seafront." }
    ],
    stay: { areas: [{ label: "Town", title: "South Shields seafront", text: "Hotels and guesthouses near the beach." }, { label: "Across the river", title: "Tynemouth", text: "By the Shields Ferry and Metro." }] },
    food: { text: ["The seafront has a number of restaurants, cafés and pubs, plus the town's well-known fish and chip shops."] },
    todo: [
      { label: "Family", title: "Ocean Beach Pleasure Park", text: "Seafront fairground." },
      { label: "Park", title: "South Marine Park", text: "Lake and miniature steam railway." },
      { label: "Heritage", title: "Arbeia Roman Fort", text: "Reconstructed Roman fort in the town." },
      { label: "Walk", title: "Groyne and South Pier", text: "Walk out towards the river mouth." }
    ],
    travel: [{ label: "Metro", title: "South Shields", text: "Direct Metro from Newcastle; the Shields Ferry crosses to North Shields." }],
    nearby: [
      { name: "Tynemouth Longsands", href: "/guides/surfing-tynemouth-longsands/", text: "The north-east's best-known surf beach." },
      { name: "Saltburn", href: "/guides/surfing-saltburn/", text: "Teesside surf town." }
    ],
    faqs: [
      { q: "Is there a surf school in South Shields?", a: "Yes — South Shields Surf School is based on Sandhaven Beach." },
      { q: "Are there lifeguards?", a: "Yes, two RNLI stations in the high season, usually May to September." }
    ],
    sources: [
      { label: "Visit South Tyneside — Sandhaven Beach", url: "https://www.visitsouthtyneside.co.uk/article/11257/Sandhaven-Beach" },
      { label: "South Tyneside Council — staying safe at the coast", url: "https://southtyneside.gov.uk/article/6216/Staying-safe-at-the-coast" },
      { label: "Visit South Tyneside — South Shields Surf School", url: "https://www.visitsouthtyneside.co.uk/article/11521/South-Shields-Surf-School" },
      RNLI
    ],
    editorial: neEditorial
  }),

  base("bamburgh", {
    name: "Bamburgh",
    fullName: "Bamburgh Beach",
    area: "Bamburgh, Northumberland",
    geo: [55.6100, -1.7130],
    title: "Bamburgh Surf Guide: Castle Beach, Parking, Lessons & Safety | Surfbooker",
    description: "Surfing Bamburgh beach below the castle: a consistent Northumberland break with a left at the north end, North Car Park on The Wynding, seasonal surf schools, rips and no lifeguards.",
    heroIntro: "Wide white sand below Bamburgh Castle — one of Northumberland's most consistent and most beautiful breaks, with a gentle sandy slope and a left off the rocks at the north end.",
    heroAlt: "Bamburgh Castle above the beach and dunes",
    images: { hero: lic("bamburgh") },
    glance: [
      ["Best for", "All levels on suitable days"],
      ["Break", "Beach break; left at north end"],
      ["Lifeguards", "None — unlifeguarded"],
      ["Parking", "North Car Park, The Wynding"],
      ["Lessons", "Seasonal schools (spring–autumn)"],
      ["Dogs", "No seasonal ban on Northumberland beaches"]
    ],
    overview: [
      "Bamburgh beach stretches for miles beneath the castle, backed by dunes, with the Farne Islands offshore. The sand shelves gently, so it suits a wide range of surfers, and a rocky outcrop at the north end produces left-handers on a northerly swell.",
      "Surf schools work from the North Car Park area on The Wynding in spring, summer and autumn. There are no lifeguards."
    ],
    suits: ["Mixed-ability groups", "Scenic surf trips", "Dog walkers year-round"],
    notFor: ["Lifeguarded swimming", "Big town facilities"],
    surf: {
      text: ["A consistent beach break by Northumberland standards. Northerly swell lights up the north-end left; westerly winds are offshore. Rips develop in bigger surf."],
      cards: [
        { label: "Level", title: "All levels", text: "The gentle sandy gradient suits learners on small days." },
        { label: "Hazards", title: "Rips in bigger surf", text: "No lifeguards — call 999 and ask for the Coastguard in an emergency." },
        northSea
      ]
    },
    lessons: {
      providers: [{ name: "Northside Surf School", type: "Surf school, Northumberland", url: "https://www.northside-surf-school.co.uk/", note: "Teaches at Bamburgh, Cresswell and Druridge Bay, seven days a week from April to October; kids' surf club and hire." }],
      text: ["Other schools also operate from the North Car Park area in season."]
    },
    practical: [
      { label: "Parking", title: "North Car Park", text: "On The Wynding, with a short walk through the dunes to the beach." },
      { label: "Lifeguards", title: "None", text: "Bamburgh isn't RNLI-lifeguarded." },
      { label: "Dogs", title: "Year-round", text: "Northumberland's beaches haven't had seasonal dog bans — keep dogs under control near nesting birds in the dunes." },
      { label: "Facilities", title: "In the village", text: "Toilets, cafés and pubs are in Bamburgh village." }
    ],
    stay: { areas: [{ label: "Village", title: "Bamburgh", text: "Inns, B&Bs and holiday lets around the castle." }, { label: "Nearby", title: "Seahouses and Beadnell", text: "More choice a few minutes south." }] },
    food: { text: ["Bamburgh village has pubs, cafés and a butcher known for pies; Seahouses has more choice."] },
    todo: [
      { label: "Castle", title: "Bamburgh Castle", text: "Open to visitors — check opening times." },
      { label: "Boat trip", title: "Farne Islands", text: "Seabird and seal trips from Seahouses." },
      { label: "Island", title: "Holy Island (Lindisfarne)", text: "Check the causeway safe-crossing times." },
      { label: "Museum", title: "Grace Darling Museum", text: "RNLI museum in the village." }
    ],
    travel: [{ label: "By car", title: "B1340 off the A1", text: "About an hour north of Newcastle; the nearest stations are Chathill and Berwick." }],
    nearby: [
      { name: "Beadnell Bay", href: "/guides/surfing-beadnell-bay/", text: "Broad watersports bay to the south." },
      { name: "Druridge Bay", href: "/guides/surfing-druridge-bay/", text: "Long, open bay further south." }
    ],
    faqs: [
      { q: "Is Bamburgh good for surfing?", a: "Yes — it's one of Northumberland's most consistent breaks, with a gentle sandy slope and a left at the north end on a northerly swell." },
      { q: "Is Bamburgh beach lifeguarded?", a: "No." },
      { q: "Where do surfers park?", a: "The North Car Park on The Wynding, a short walk through the dunes." }
    ],
    sources: [
      { label: "Bamburgh.org.uk — surfing", url: "https://www.bamburgh.org.uk/sport-and-leisure/surfing/" },
      { label: "Northside Surf School", url: "https://www.northside-surf-school.co.uk/" },
      { label: "NewcastleWorld — North East beach dog rules", url: "https://www.newcastleworld.com/lifestyle/outdoors/when-does-the-annual-dog-beach-ban-begin-and-which-north-tyneside-northumberland-sites-can-dogs-be-walked-on-3626368" }
    ],
    editorial: neEditorial
  }),

  base("beadnell-bay", {
    name: "Beadnell Bay",
    area: "Beadnell, Northumberland",
    geo: [55.5470, -1.6370],
    title: "Beadnell Bay Surf Guide: Watersports, Harbour & Where to Stay | Surfbooker",
    description: "Beadnell Bay in Northumberland: a broad sandy watersports bay with surf, kitesurfing and windsurfing, Boards and Bikes lessons and hire, the lime kilns, pubs and holiday lets.",
    heroIntro: "A long, curving sandy bay south of Beadnell's tiny harbour — one of Northumberland's best-equipped watersports beaches when the North Sea delivers.",
    heroAlt: "Beadnell Bay's curve of sand and dunes",
    images: { hero: lic("beadnell-bay") },
    glance: [
      ["Best for", "Mixed abilities on suitable days"],
      ["Break", "Sandy beach break"],
      ["Lifeguards", "None — unlifeguarded"],
      ["Watersports", "Surf, kite, windsurf, sailing"],
      ["Harbour", "18th-century lime kilns"],
      ["Village", "Pubs, chippy, holiday lets"]
    ],
    overview: [
      "Beadnell Bay sweeps south from the village towards Low Newton, with dunes behind. The village harbour — said to be the only west-facing harbour on England's east coast — has 18th-century lime kilns.",
      "Local guides describe it as one of the best-equipped places in Northumberland for watersports, with surfing, kitesurfing, windsurfing and sailing all popular."
    ],
    suits: ["Watersports holidays", "Families in holiday lets", "Mixed-ability surfers"],
    notFor: ["Lifeguarded swimming", "Guaranteed surf — needs swell"],
    surf: {
      text: ["A sandy beach break that works on north-easterly to easterly swell with westerly winds. It's condition-dependent — check the forecast and the beach."],
      cards: [
        { label: "Level", title: "Mixed", text: "Learners on small days; better surfers when swell builds." },
        { label: "Shared water", title: "Kites and boards", text: "Give kitesurfers and windsurfers room." },
        northSea
      ]
    },
    lessons: {
      providers: [
        { name: "Boards and Bikes", type: "Watersports hire and lessons, Beadnell", note: "Equipment hire and lessons, listed by Your Northumberland." },
        { name: "Northside Surf School", type: "Surf school, Northumberland", url: "https://www.northside-surf-school.co.uk/", note: "Surf lessons on the Northumberland coast, April to October." }
      ]
    },
    practical: [
      { label: "Lifeguards", title: "None", text: "Call 999 and ask for the Coastguard in an emergency." },
      { label: "Dogs", title: "Year-round", text: "No seasonal dog ban on Northumberland beaches, but follow any signs near nesting birds." },
      { label: "Parking", title: "Village and dunes", text: "Park in the signed car parks — check local signs for charges." }
    ],
    stay: { intro: "Beadnell has lots of holiday lettings and caravan parks.", areas: [{ label: "Village", title: "Beadnell", text: "Holiday lets and caravan parks close to the bay." }, { label: "Nearby", title: "Seahouses and Bamburgh", text: "More hotels and inns." }] },
    food: {
      places: [
        { name: "The Craster Arms", type: "Pub, Beadnell", note: "15th-century pub with a beer garden." },
        { name: "Beadnell Towers Hotel", type: "Hotel restaurant", note: "Restaurant in the village." }
      ],
      text: ["There's also a fish and chip shop on Harbour Road."]
    },
    todo: [
      { label: "Heritage", title: "Beadnell lime kilns", text: "18th-century kilns on the harbour." },
      { label: "Walk", title: "To Low Newton and Dunstanburgh", text: "Coastal walk south to the castle ruins." },
      { label: "Boat trip", title: "Farne Islands", text: "From Seahouses, a few minutes north." }
    ],
    travel: [{ label: "By car", title: "B1340", text: "Off the A1 between Alnwick and Belford." }],
    nearby: [
      { name: "Bamburgh", href: "/guides/surfing-bamburgh/", text: "Castle beach a short drive north." },
      { name: "Druridge Bay", href: "/guides/surfing-druridge-bay/", text: "Long bay to the south." }
    ],
    faqs: [
      { q: "Can you surf at Beadnell Bay?", a: "Yes, on a north-east to east swell with westerly winds. It's also popular for kitesurfing and windsurfing." },
      { q: "Is Beadnell lifeguarded?", a: "No." }
    ],
    sources: [
      { label: "Your Northumberland — Beadnell guide", url: "https://www.yournorthumberland.co.uk/area-guides/beadnell-guide" },
      { label: "Northside Surf School", url: "https://www.northside-surf-school.co.uk/" }
    ],
    editorial: neEditorial
  }),

  base("druridge-bay", {
    name: "Druridge Bay",
    area: "Near Amble, Northumberland",
    geo: [55.2900, -1.5700],
    title: "Druridge Bay Surf Guide: Country Park, Parking, Café & Lessons | Surfbooker",
    description: "Druridge Bay in Northumberland: seven miles of open sand and dunes, Druridge Bay Country Park car parks, toilets and café, Northside Surf School lessons and no lifeguards.",
    heroIntro: "Seven miles of empty sand and dunes between Amble and Cresswell — space and solitude, with a country park, café and toilets at its centre.",
    heroAlt: "Druridge Bay's long empty beach and dunes",
    images: { hero: lic("druridge-bay") },
    glance: [
      ["Best for", "Improvers and experienced surfers"],
      ["Break", "Long, exposed beach break"],
      ["Lifeguards", "None — unlifeguarded"],
      ["Parking", "Country park: 1st hour free, £3/2h, £5 all day"],
      ["Facilities", "Toilets 9am–5pm, café"],
      ["Lessons", "Northside Surf School"]
    ],
    overview: [
      "Druridge Bay is a seven-mile curve of sand on the Northumberland coast. Druridge Bay Country Park, just off the A1068 three miles south of Amble, gives access to the middle of the bay, with a visitor centre, café, Ladyburn Lake and three car parks.",
      "The beach is exposed with little shelter, so it suits surfers who can read conditions."
    ],
    suits: ["Surfers wanting space", "Dog walkers", "Families using the country park"],
    notFor: ["Lifeguarded swimming", "Shelter from wind"],
    surf: {
      text: ["A long, open beach break picking up north-east to east swell; westerly winds are offshore. The banks change along the bay."],
      cards: [
        { label: "Level", title: "Improvers+", text: "Learners should come with a school." },
        { label: "Hazards", title: "Exposure", text: "Rips, cold water and long empty stretches — don't surf alone." },
        northSea
      ]
    },
    lessons: { providers: [{ name: "Northside Surf School", type: "Surf school, Northumberland", url: "https://www.northside-surf-school.co.uk/", note: "Teaches at Druridge Bay, Cresswell and Bamburgh from April to October." }] },
    practical: [
      { label: "Parking", title: "Country park", text: "Three car parks: first hour free, up to 2 hours £3, over 2 hours £5 (Northumberland County Council). Blue Badge holders park free." },
      { label: "Facilities", title: "Visitor centre", text: "Toilets 9am–5pm daily and a café with seasonal hours." },
      { label: "Lifeguards", title: "None", text: "Call 999 and ask for the Coastguard in an emergency." },
      { label: "Access", title: "Paths", text: "Many park paths are accessible; the beach is reached through the dunes." }
    ],
    stay: { areas: [{ label: "Town", title: "Amble", text: "Harbour town three miles north." }, { label: "Village", title: "Warkworth", text: "Castle village nearby." }] },
    food: { text: ["The country park café is open daily (hours vary by season); Amble has more choice."] },
    todo: [
      { label: "Lake", title: "Ladyburn Lake", text: "Sailing, canoeing and paddleboarding with permits." },
      { label: "Castle", title: "Warkworth Castle", text: "English Heritage castle a short drive north." },
      { label: "Boat trip", title: "Coquet Island", text: "Puffin trips from Amble in season." }
    ],
    travel: [{ label: "By car", title: "A1068", text: "Postcode NE61 5BX for the country park." }],
    nearby: [
      { name: "Tynemouth Longsands", href: "/guides/surfing-tynemouth-longsands/", text: "Surf schools and lifeguards in summer." },
      { name: "Beadnell Bay", href: "/guides/surfing-beadnell-bay/", text: "Watersports bay further north." }
    ],
    faqs: [
      { q: "How much is parking at Druridge Bay?", a: "First hour free, up to 2 hours £3, over 2 hours £5, according to Northumberland County Council." },
      { q: "Is Druridge Bay lifeguarded?", a: "No." }
    ],
    sources: [
      { label: "Northumberland County Council — Druridge Bay Country Park", url: "https://www.northumberland.gov.uk/parks/country-parks-visitor-centres-coastal-sites/druridge-bay-country-park-and-cafe" },
      { label: "Northside Surf School", url: "https://www.northside-surf-school.co.uk/" }
    ],
    editorial: neEditorial
  }),

  base("saltburn", {
    name: "Saltburn",
    fullName: "Saltburn-by-the-Sea",
    area: "Saltburn, North Yorkshire",
    geo: [54.5850, -0.9670],
    title: "Saltburn Surf Guide: Pier, Lessons, Parking, Lifeguards & Dog Rules | Surfbooker",
    description: "Surfing Saltburn-by-the-Sea: beach breaks either side of the pier, Saltburn Surf School and Flow Surf School, Cat Nab parking, 2026 RNLI lifeguard dates, summer dog zone and the cliff tramway.",
    heroIntro: "The north-east's classic surf town — beach breaks either side of a Victorian pier, a surf school on the lower promenade since 1983, and a cliff tramway up to town.",
    heroAlt: "Saltburn pier and beach below the cliffs",
    images: { hero: lic("saltburn") },
    glance: [
      ["Best for", "Beginners to experienced"],
      ["Break", "Beach breaks either side of the pier"],
      ["Lifeguards", "RNLI daily 23 May–6 Sep 2026"],
      ["Dogs", "Zone banned 1 May–30 Sep"],
      ["Parking", "Cat Nab (long stay), The Pier (short)"],
      ["Also", "Victorian cliff tramway"]
    ],
    overview: [
      "Saltburn-by-the-Sea is a Victorian resort on the Teesside coast, with a 208m Grade II listed pier, a water-balanced cliff tramway and a long sandy beach below. It has the longest-established surf scene in the north-east.",
      "Waves break either side of the pier, often best around high tide, with more powerful breaks further south for experienced surfers."
    ],
    suits: ["Lessons and improvers", "Surf weekends with a town to explore", "Experienced surfers on winter swells"],
    notFor: ["Dogs left of the pier in summer"],
    surf: {
      text: ["The North York Moors National Park describes beach breaks either side of the pier that are best at high tide, with more powerful breaks south of Saltburn suited to experienced surfers, especially in winter and spring. North-east to easterly swell and south-westerly winds are the usual combination."],
      cards: [
        { label: "Level", title: "All levels", text: "Lessons on the beach; more powerful waves to the south." },
        { label: "Hazards", title: "Pier and rips", text: "Keep clear of the pier legs and follow the flags." },
        { label: "Lifeguards", title: "RNLI daily", text: "23 May–6 September 2026, 10am–6pm." }
      ]
    },
    lessons: {
      providers: [
        { name: "Saltburn Surf School", type: "Surf school & hire, lower promenade", url: "https://www.saltburn-surf.co.uk/", note: "Coaching for beginners, improvers and advanced surfers since 1983; wide range of hire." },
        { name: "Flow Surf School & Drift Surf Shop", type: "Surf school & shop, Saltburn", note: "Listed by the North York Moors National Park." }
      ]
    },
    practical: [
      { label: "Parking", title: "Cat Nab and The Pier", text: "Council car parks: Cat Nab for long stay and The Pier for short stay (pay and display; see the council page for current tariffs)." },
      { label: "Dogs", title: "Summer exclusion zone", text: "Dogs are banned from the beach to the left of the pier through to Hazelgrove access, 1 May–30 September. Dogs on leads are welcome on the promenade." },
      { label: "Toilets", title: "Three locations", text: "Station Square, Cat Nab car park and the lower promenade." },
      { label: "Lifeguards", title: "RNLI", text: "Daily 23 May–6 September 2026, 10am–6pm." }
    ],
    stay: { areas: [{ label: "Town", title: "Saltburn", text: "Victorian town with guesthouses and holiday lets above the beach." }] },
    food: { text: ["Cafés on the lower promenade and plenty more in town at the top of the cliff tramway."] },
    todo: [
      { label: "Heritage", title: "Cliff Tramway", text: "Victorian funicular from the pier to town." },
      { label: "Walk", title: "Valley Gardens and the Cleveland Way", text: "Woodland gardens and the clifftop national trail." },
      { label: "Pier", title: "Saltburn Pier", text: "Grade II listed Victorian pier." }
    ],
    travel: [{ label: "Rail", title: "Saltburn station", text: "Trains from Middlesbrough and Darlington; the beach is a short walk downhill." }],
    nearby: [
      { name: "Redcar", href: "/guides/surfing-redcar/", text: "Town beach with several peaks to the north." },
      { name: "Runswick Bay", href: "/guides/surfing-runswick-bay/", text: "Picturesque bay further south." },
      { name: "Sandsend", href: "/guides/surfing-sandsend/", text: "Beginner-friendly beach near Whitby." }
    ],
    faqs: [
      { q: "Can dogs go on Saltburn beach?", a: "Not to the left of the pier through to Hazelgrove from 1 May to 30 September. Elsewhere and outside those dates, yes." },
      { q: "Is Saltburn lifeguarded?", a: "Yes — daily from 23 May to 6 September in 2026, 10am–6pm." },
      { q: "Where's the best surf at Saltburn?", a: "Either side of the pier, often best around high tide. Experienced surfers also look south of the town in winter." }
    ],
    sources: [RNLI_TEES, NYM, RC, { label: "Enjoy Redcar & Cleveland — dog-friendly Saltburn", url: "https://redcarcleveland.co.uk/enjoy/dog-friendly-places-to-visit-in-saltburn/" }, { label: "Saltburn Surf School", url: "https://www.saltburn-surf.co.uk/" }],
    editorial: neEditorial
  }),

  base("redcar", {
    name: "Redcar",
    area: "Redcar, North Yorkshire",
    geo: [54.6200, -1.0560],
    title: "Redcar Surf Guide: Seafront Peaks, Parking & Lifeguards | Surfbooker",
    description: "Surfing Redcar: condition-dependent peaks along the seafront and Coatham, cheap council parking, 2026 RNLI lifeguard dates, the Redcar Beacon and Saltburn nearby for lessons.",
    heroIntro: "A long Teesside seafront with several reef- and sand-influenced peaks — a convenient local option when the swell lines up, with Saltburn's surf schools ten minutes away.",
    heroAlt: "Redcar beach and seafront",
    images: { hero: lic("redcar") },
    glance: [
      ["Best for", "Improvers on suitable days"],
      ["Break", "Beach and reef-influenced peaks"],
      ["Lifeguards", "RNLI: daily 18 Jul–6 Sep 2026"],
      ["Parking", "Council pay and display, some free"],
      ["Lessons", "Saltburn, 10 minutes"],
      ["Rail", "Redcar Central and East"]
    ],
    overview: [
      "Redcar's beach runs along the town seafront from Coatham towards Marske, with rock scars at low tide creating several peaks. It's a convenient local surf, but quality varies a lot with swell direction and tide.",
      "The seafront has the Redcar Beacon viewing tower, cafés and parking close to the sand."
    ],
    suits: ["Local sessions", "Improvers checking several peaks"],
    notFor: ["Guaranteed surf", "First lessons — go to Saltburn"],
    surf: {
      text: ["Several peaks along the seafront; low-tide rock scars shape some of them. North-east to easterly swell with south-westerly wind is the usual combination. Check the rocks at low tide before paddling out."],
      cards: [
        { label: "Level", title: "Improvers+", text: "Learners should book in Saltburn." },
        { label: "Hazards", title: "Rock scars", text: "Rocks exposed at low tide, rips and cold water." },
        northSea
      ]
    },
    lessons: { text: ["No surf school is listed in Redcar by the official sources we checked. Saltburn Surf School and Flow Surf School are about ten minutes away."] },
    practical: [
      { label: "Parking", title: "Council car parks", text: "Long stay at Turner Street and West Dyke Road South; free two-hour parking at Muriel Street, King Street and Graffenberg Street (council visitor information)." },
      { label: "Lifeguards", title: "RNLI 2026", text: "Daily 23–31 May, weekends from June to 18 July, then daily to 6 September, 10am–6pm." },
      { label: "Toilets", title: "Several", text: "Locke Park, Moore Street, Zetland Park and The Stray." }
    ],
    stay: { areas: [{ label: "Town", title: "Redcar", text: "Seafront hotels and guesthouses." }, { label: "Nearby", title: "Saltburn", text: "Victorian resort ten minutes south." }] },
    food: { text: ["Cafés and fish and chips along the Esplanade and High Street."] },
    todo: [
      { label: "Viewpoint", title: "Redcar Beacon", text: "80ft tower with a lift and 360° views." },
      { label: "Museum", title: "Kirkleatham Museum", text: "Local history near Redcar." },
      { label: "Lifeboat", title: "Zetland Lifeboat Museum", text: "One of the oldest surviving lifeboats." }
    ],
    travel: [{ label: "Rail", title: "Redcar Central", text: "Trains from Middlesbrough and Darlington." }],
    nearby: [
      { name: "Saltburn", href: "/guides/surfing-saltburn/", distance: "About 10 minutes", text: "Surf schools and the pier." },
      { name: "Tynemouth Longsands", href: "/guides/surfing-tynemouth-longsands/", text: "Tyneside's busy surf beach." }
    ],
    faqs: [
      { q: "Is Redcar lifeguarded?", a: "In 2026: daily 23–31 May, weekends until 18 July, then daily to 6 September, 10am–6pm." },
      { q: "Can I learn to surf at Redcar?", a: "Saltburn, ten minutes away, has the established surf schools." }
    ],
    sources: [RNLI_TEES, RC, { label: "RNLI — Redcar Beach", url: "https://rnli.org/find-my-nearest/lifeguarded-beaches/redcar-beach" }],
    editorial: neEditorial
  }),

  base("scarborough-north-bay", {
    name: "Scarborough North Bay",
    area: "Scarborough, North Yorkshire",
    geo: [54.2920, -0.4040],
    title: "Scarborough North Bay Surf Guide: Lessons, Lifeguards & Dog Rules | Surfbooker",
    description: "Surfing Scarborough North Bay: gentle waves for learners, Scarborough surf schools and hire, 2026 RNLI lifeguards, summer dog zones, and the castle, Peasholm Park and South Bay nearby.",
    heroIntro: "Scarborough's quieter bay, below the castle headland — gentle enough for learners, with surf schools in town and a classic seaside resort around it.",
    heroAlt: "Scarborough North Bay with the castle headland",
    images: { hero: lic("scarborough-north-bay") },
    glance: [
      ["Best for", "Beginners to experienced"],
      ["Break", "Sandy beach break"],
      ["Lifeguards", "RNLI 2 May–6 Sep 2026"],
      ["Dogs", "Zones restricted 1 May–30 Sep"],
      ["Lessons", "Scarborough schools"],
      ["Rail", "Scarborough station"]
    ],
    overview: [
      "North Bay curves north from the castle headland past Peasholm Park, with a promenade, beach huts and the Sea Life centre behind. It's quieter than South Bay and has long been Scarborough's surf beach.",
      "The National Park describes Scarborough's bays as gentle enough for learners, and there are several surf schools and hire centres in and around town."
    ],
    suits: ["Learners", "Families on a resort holiday", "Car-free trips by train"],
    notFor: ["Dogs in restricted zones in summer"],
    surf: {
      text: ["A sandy beach break that picks up north-east to easterly swell; westerly winds are offshore. The bay is more sheltered than Cayton Bay to the south, which suits learners."],
      cards: [
        { label: "Level", title: "Beginners up", text: "Gentle on small days." },
        { label: "Hazards", title: "Rips and sea wall", text: "Rips and a sea wall at high tide." },
        { label: "Lifeguards", title: "RNLI", text: NY_SHORT }
      ]
    },
    lessons: { providers: [DEXTERS, SCARBOROUGH_SS] },
    practical: [
      { label: "Lifeguards", title: "RNLI patrol", text: NY_SEASON },
      { label: "Dogs", title: "Seasonal zones", text: NY_DOGS },
      { label: "Facilities", title: "Seafront", text: "Toilets, cafés and beach huts along the North Bay promenade." }
    ],
    stay: { areas: [{ label: "North side", title: "North Bay", text: "Hotels and guesthouses above the bay." }, { label: "Town", title: "Scarborough centre", text: "Shops, station and South Bay." }] },
    food: { text: ["Cafés along the North Bay promenade; the town centre and South Bay harbour have much more."] },
    todo: [
      { label: "Castle", title: "Scarborough Castle", text: "English Heritage castle on the headland between the bays." },
      { label: "Park", title: "Peasholm Park", text: "Japanese-style park with boating lake." },
      { label: "Rainy day", title: "Rotunda Museum", text: "Geology museum in the town." }
    ],
    travel: [{ label: "Rail", title: "Scarborough station", text: "Trains from York and Hull." }],
    nearby: [
      { name: "Cayton Bay", href: "/guides/surfing-cayton-bay/", distance: "About 10 minutes", text: "More powerful bay with a surf school." },
      { name: "Filey Bay", href: "/guides/surfing-filey-bay/", text: "Long sandy bay south." },
      { name: "Whitby", href: "/guides/surfing-whitby/", text: "West Cliff Beach." }
    ],
    faqs: [
      { q: "Is Scarborough North Bay good for beginners?", a: "Yes — it's gentle enough for learners on small days, and there are surf schools in Scarborough." },
      { q: "Are there lifeguards?", a: NY_FAQ },
      { q: "Can dogs go on North Bay?", a: NY_DOGS }
    ],
    sources: [RNLI_NY, NYC_DOGS, NYM],
    editorial: neEditorial
  }),

  base("cayton-bay", {
    name: "Cayton Bay",
    area: "Near Scarborough, North Yorkshire",
    geo: [54.2440, -0.3630],
    title: "Cayton Bay Surf Guide: Surf School, Parking, Lifeguards & Access | Surfbooker",
    description: "Surfing Cayton Bay near Scarborough: Scarborough Surf School and Secret Spot Surf Shop on the clifftop, pay-and-display parking, a steep path down, 2026 lifeguards and powerful breaks.",
    heroIntro: "A wide wooded bay just south of Scarborough with several breaks, a year-round surf school on the clifftop and a reputation for the most powerful waves on this stretch.",
    heroAlt: "Cayton Bay beach below wooded cliffs",
    images: { hero: lic("cayton-bay") },
    glance: [
      ["Best for", "Improvers and experienced; lessons"],
      ["Break", "Several beach and reef breaks"],
      ["Lifeguards", "RNLI 2 May–6 Sep 2026"],
      ["Parking", "Clifftop pay and display (grass)"],
      ["Access", "Steep path — not wheelchair accessible"],
      ["School", "Scarborough Surf School, year-round"]
    ],
    overview: [
      "Cayton Bay sits between Scarborough and Filey, backed by wooded cliffs and a caravan park. The beach has several breaks that the National Park describes as powerful, suited to experienced surfers and surfable at low and high tide.",
      "Scarborough Surf School and the Secret Spot Surf Shop operate from the clifftop at Killerby Cliff all year."
    ],
    suits: ["Experienced surfers", "Lessons with the clifftop school", "Surfers who don't mind a walk"],
    notFor: ["Wheelchair or easy pushchair access", "Beginners surfing alone"],
    surf: {
      text: ["Cayton picks up more swell than the town beaches and has several breaks across the bay, working at different tides. North-east to east swell with westerly winds is the usual recipe."],
      cards: [
        { label: "Level", title: "Improvers to experienced", text: "Beginners with the school only." },
        { label: "Hazards", title: "Power and rocks", text: "Stronger waves, rocky sections and rips." },
        { label: "Lifeguards", title: "RNLI", text: NY_SHORT }
      ]
    },
    lessons: { providers: [SCARBOROUGH_SS] },
    practical: [
      { label: "Parking", title: "Clifftop car park", text: "Pay and display at Killerby Cliff (YO11 3NR), on grass that can get muddy." },
      { label: "Access", title: "Steep descent", text: "The path down to the beach is steep and not wheelchair accessible." },
      { label: "Toilets", title: "By the car park", text: "Toilets next to the clifftop car park." },
      { label: "Lifeguards", title: "RNLI", text: NY_SHORT }
    ],
    stay: { areas: [{ label: "On the cliffs", title: "Cayton Bay holiday parks", text: "Caravan parks above the bay." }, { label: "Town", title: "Scarborough", text: "About ten minutes north." }] },
    food: { text: ["Bring food or head into Scarborough or Filey — there's little at the beach itself."] },
    todo: [
      { label: "Walk", title: "Cleveland Way", text: "The clifftop trail passes the bay towards Filey." },
      { label: "Town", title: "Scarborough", text: "Castle, harbour and two bays." }
    ],
    travel: [{ label: "By car", title: "A165", text: "Between Scarborough and Filey." }],
    nearby: [
      { name: "Scarborough North Bay", href: "/guides/surfing-scarborough-north-bay/", text: "Gentler waves for learners." },
      { name: "Filey Bay", href: "/guides/surfing-filey-bay/", text: "Long sandy bay to the south." }
    ],
    faqs: [
      { q: "Is Cayton Bay good for beginners?", a: "With Scarborough Surf School, yes. Otherwise it's better suited to improvers and experienced surfers." },
      { q: "Is the beach accessible?", a: "The path down is steep and not wheelchair accessible." }
    ],
    sources: [RNLI_NY, NYM, { label: "Scarborough Surf School", url: "https://scarboroughsurfschool.co.uk/" }, { label: "Yorkshire.com — Cayton Bay beach car park", url: "https://www.yorkshire.com/cayton/parking/cayton-bay-beach-car-park" }],
    editorial: neEditorial
  }),

  base("filey-bay", {
    name: "Filey Bay",
    area: "Filey, North Yorkshire",
    geo: [54.2050, -0.2810],
    title: "Filey Bay Surf Guide: Beach, Lifeguards, Dog Rules & Filey Brigg | Surfbooker",
    description: "Filey Bay in North Yorkshire: a five-mile sandy bay with approachable surf on suitable days, 2026 RNLI lifeguards, summer dog zones, the Coble Landing and Filey Brigg.",
    heroIntro: "Five miles of sand curving south from Filey Brigg — a family resort beach that can produce approachable surf when the North Sea cooperates.",
    heroAlt: "Filey Bay's long sandy beach",
    images: { hero: lic("filey-bay") },
    glance: [
      ["Best for", "Beginners and improvers"],
      ["Break", "Sandy beach break"],
      ["Lifeguards", "RNLI 2 May–6 Sep 2026"],
      ["Dogs", "Zones restricted 1 May–30 Sep"],
      ["Shelter", "Filey Brigg to the north"],
      ["Lessons", "Scarborough schools nearby"]
    ],
    overview: [
      "Filey Bay runs from the rocky Filey Brigg south towards Bempton and Flamborough. The town end has the Coble Landing, where fishing boats are still launched, and a gently shelving sandy beach.",
      "The Brigg gives some shelter from northerly winds, so Filey can be cleaner when beaches further north are messy — but it needs a decent swell."
    ],
    suits: ["Families", "Learners on small days", "A sheltered option in northerly wind"],
    notFor: ["Reliable surf", "Dogs in restricted zones in summer"],
    surf: {
      text: ["A sandy beach break. The Brigg shelters the north end; easterly swell is needed to get in. Check before you drive — it's often flat."],
      cards: [
        { label: "Level", title: "Beginners to improvers", text: "Gentle when it works." },
        { label: "Hazards", title: "The Brigg and tides", text: "Don't get cut off on the Brigg by the incoming tide." },
        { label: "Lifeguards", title: "RNLI", text: NY_SHORT }
      ]
    },
    lessons: { text: ["No surf school is verified in Filey itself. Scarborough Surf School at Cayton Bay is around ten minutes north."], providers: [SCARBOROUGH_SS] },
    practical: [
      { label: "Lifeguards", title: "RNLI patrol", text: NY_SEASON },
      { label: "Dogs", title: "Seasonal zones", text: NY_DOGS },
      { label: "Access", title: "Coble Landing", text: "The slipway at the Coble Landing gives easy access to the sand." }
    ],
    stay: { areas: [{ label: "Town", title: "Filey", text: "Guesthouses and holiday lets above the bay." }, { label: "Holiday parks", title: "Around Filey", text: "Several large parks nearby." }] },
    food: { text: ["Cafés and fish and chips by the Coble Landing and in the town centre."] },
    todo: [
      { label: "Walk", title: "Filey Brigg", text: "Rocky headland and nature reserve — check tides." },
      { label: "Nature", title: "RSPB Bempton Cliffs", text: "Seabird cliffs to the south." }
    ],
    travel: [{ label: "Rail", title: "Filey station", text: "On the Scarborough–Hull line." }],
    nearby: [
      { name: "Cayton Bay", href: "/guides/surfing-cayton-bay/", text: "More powerful waves and a surf school." },
      { name: "Scarborough North Bay", href: "/guides/surfing-scarborough-north-bay/", text: "Resort bay for learners." }
    ],
    faqs: [
      { q: "Is Filey good for surfing?", a: "On suitable days it offers approachable waves, and the Brigg gives shelter from northerlies — but it's often flat." },
      { q: "Is Filey lifeguarded?", a: NY_FAQ }
    ],
    sources: [RNLI_NY, NYC_DOGS, { label: "RNLI — Filey Beach", url: "https://rnli.org/find-my-nearest/lifeguarded-beaches/filey-beach" }],
    editorial: neEditorial
  }),

  base("whitby", {
    name: "Whitby",
    fullName: "Whitby West Cliff Beach",
    area: "Whitby, North Yorkshire",
    geo: [54.4920, -0.6270],
    title: "Whitby Surf Guide: West Cliff Beach, Surf School, Lifeguards & Dogs | Surfbooker",
    description: "Surfing Whitby's West Cliff Beach: a large, gently shelving sandy beach with Whitby Surf School, 2026 RNLI lifeguards, summer dog zones, and Whitby Abbey and the harbour nearby.",
    heroIntro: "A big, gently shelving sandy beach below Whitby's West Cliff, with a surf school on the sand, beach huts and the abbey across the harbour.",
    images: { hero: "guides/_licensed-images/uk-destinations/whitby.jpg" },
    heroAlt: "West Beach, Whitby",
    glance: [
      ["Best for", "Beginners and intermediates"],
      ["Break", "Sandy beach break"],
      ["Lifeguards", "RNLI 2 May–6 Sep 2026"],
      ["Dogs", "Zones restricted 1 May–30 Sep"],
      ["School", "Whitby Surf School, West Cliff Beach"],
      ["Walk", "Sandsend is 1–1.5 hours along the sand"]
    ],
    overview: [
      "West Cliff Beach runs north-west from Whitby's harbour piers towards Sandsend. The National Park describes it as a large, shallow-gradient sandy beach with great beginner and intermediate waves, RNLI lifeguards in summer and facilities.",
      "Whitby Surf School is on the beach, and the town's harbour, abbey and fish and chips are a few minutes away."
    ],
    suits: ["Beginners and intermediates", "Families", "Combining surf with a classic seaside town"],
    notFor: ["Dogs in restricted zones in summer"],
    surf: {
      text: ["A sandy beach break that works on north-east to easterly swell with south-westerly winds. The harbour piers give some shelter at the town end."],
      cards: [
        { label: "Level", title: "Beginners to intermediates", text: "A gentle, shallow gradient." },
        { label: "Hazards", title: "Piers and rips", text: "Keep away from the harbour entrance." },
        { label: "Lifeguards", title: "RNLI", text: NY_SHORT }
      ]
    },
    lessons: { providers: [WHITBY_SS] },
    practical: [
      { label: "Lifeguards", title: "RNLI patrol", text: NY_SEASON },
      { label: "Dogs", title: "Seasonal zones", text: NY_DOGS },
      { label: "Facilities", title: "West Cliff", text: "Beach huts, cafés and toilets on the West Cliff side." }
    ],
    stay: { areas: [{ label: "West Cliff", title: "Above the beach", text: "Guesthouses and hotels on the West Cliff." }, { label: "Nearby", title: "Sandsend", text: "Quieter village up the coast." }] },
    food: { text: ["Whitby is famous for fish and chips; the harbour and old town are full of cafés and pubs."] },
    todo: [
      { label: "Heritage", title: "Whitby Abbey", text: "English Heritage ruins above the 199 steps." },
      { label: "Museum", title: "Captain Cook Memorial Museum", text: "In the old town." },
      { label: "Walk", title: "Beach walk to Sandsend", text: "1–1.5 hours along the sand at low tide." }
    ],
    travel: [{ label: "Rail", title: "Whitby station", text: "Esk Valley line from Middlesbrough; North Yorkshire Moors Railway in season." }],
    nearby: [
      { name: "Sandsend", href: "/guides/surfing-sandsend/", distance: "10–15 minutes by car", text: "Beginner-friendly breaks." },
      { name: "Runswick Bay", href: "/guides/surfing-runswick-bay/", text: "Picturesque bay to the north." },
      { name: "Scarborough North Bay", href: "/guides/surfing-scarborough-north-bay/", text: "Resort beach to the south." }
    ],
    faqs: [
      { q: "Can you learn to surf in Whitby?", a: "Yes — Whitby Surf School teaches on West Cliff Beach (children 8+ and adults)." },
      { q: "Is Whitby beach lifeguarded?", a: NY_FAQ }
    ],
    sources: [RNLI_NY, NYC_DOGS, NYM, { label: "YHA — watersports in Whitby", url: "https://www.yha.org.uk/experience/watersports-in-whitby" }],
    editorial: neEditorial
  }),

  base("sandsend", {
    name: "Sandsend",
    area: "Near Whitby, North Yorkshire",
    geo: [54.5020, -0.6700],
    title: "Sandsend Surf Guide: Beginner Waves, Parking & Lifeguards | Surfbooker",
    description: "Sandsend near Whitby: beginner-friendly beach breaks, 2026 RNLI lifeguards, Lythe Bank parking, seasonal hire, cafés and the beach walk to Whitby.",
    heroIntro: "A pretty village beach where two streams meet the sea, at the north end of the long sands from Whitby — with beginner-friendly breaks and summer lifeguards.",
    heroAlt: "Sandsend beach and village",
    images: { hero: lic("sandsend") },
    glance: [
      ["Best for", "Beginners"],
      ["Break", "Sandy beach break"],
      ["Lifeguards", "RNLI 2 May–6 Sep 2026"],
      ["Parking", "Village and Lythe Bank car parks"],
      ["Dogs", "Check North Yorkshire Council zones"],
      ["Lessons", "Whitby, 10–15 minutes"]
    ],
    overview: [
      "Sandsend is a small village at the foot of Lythe Bank, where the sands from Whitby end against the cliffs. Cafés and a pub sit by the beach, and two becks run across the sand.",
      "The National Park lists it as having good beach breaks for beginners."
    ],
    suits: ["Beginners", "Quieter alternative to Whitby", "Families"],
    notFor: ["Experienced surfers seeking power"],
    surf: {
      text: ["Gentle beach breaks on north-east to easterly swell; the cliffs give some shelter from northerly winds."],
      cards: [
        { label: "Level", title: "Beginners", text: "Good on small days." },
        { label: "Hazards", title: "Becks and tides", text: "Streams cross the beach; check tide times for the walk to Whitby." },
        { label: "Lifeguards", title: "RNLI", text: NY_SHORT }
      ]
    },
    lessons: {
      text: ["Lessons run from Whitby rather than Sandsend; a seasonal hire trailer has operated by the beck in summer — check current availability."],
      providers: [WHITBY_SS]
    },
    practical: [
      { label: "Lifeguards", title: "RNLI patrol", text: NY_SEASON },
      { label: "Parking", title: "Village and Lythe Bank", text: "Car parks in the village and at Lythe Bank by the cliffs." },
      { label: "Dogs", title: "Seasonal zones", text: NY_DOGS }
    ],
    stay: { areas: [{ label: "Village", title: "Sandsend", text: "Holiday cottages and an inn." }, { label: "Town", title: "Whitby", text: "Wider choice 10–15 minutes away." }] },
    food: { text: ["Cafés, a pub and shops in the village by the beach."] },
    todo: [
      { label: "Walk", title: "Cleveland Way and old railway", text: "Clifftop walks north towards Runswick." },
      { label: "Estate", title: "Mulgrave Woods", text: "Woodland walks behind the village (check opening days)." }
    ],
    travel: [{ label: "By car", title: "A174", text: "Three miles north of Whitby." }],
    nearby: [
      { name: "Whitby", href: "/guides/surfing-whitby/", distance: "10–15 minutes", text: "Surf school on West Cliff Beach." },
      { name: "Runswick Bay", href: "/guides/surfing-runswick-bay/", text: "Picturesque bay north." }
    ],
    faqs: [
      { q: "Is Sandsend good for beginners?", a: "Yes — the National Park lists it as having good beach breaks for beginners, and there are lifeguards in summer." },
      { q: "Can I walk from Whitby to Sandsend?", a: "Yes, along the sand in about 1–1.5 hours — check the tide times." }
    ],
    sources: [RNLI_NY, NYM, NYC_DOGS],
    editorial: neEditorial
  }),

  base("runswick-bay", {
    name: "Runswick Bay",
    area: "Runswick, North Yorkshire",
    geo: [54.5310, -0.7410],
    title: "Runswick Bay Surf Guide: Parking, Lifeguards, Café & Walks | Surfbooker",
    description: "Runswick Bay: a sheltered sandy bay below a fishing village, with pay-and-display parking, toilets by Sandside Café, RNLI lifeguards from July 2026, Hob Holes and the Cleveland Way.",
    heroIntro: "A curved, sheltered sandy bay below a tumble of red-roofed cottages — more of a picture-postcard beach than a surf spot, with occasional waves when swell wraps in.",
    heroAlt: "Runswick Bay with the village cottages above the beach",
    images: { hero: lic("runswick-bay") },
    glance: [
      ["Best for", "Families; occasional surf"],
      ["Break", "Sheltered sandy bay"],
      ["Lifeguards", "RNLI from 11 Jul 2026"],
      ["Parking", "Bank Bottom and Bank Top (pay & display)"],
      ["Facilities", "Toilets above Sandside Café"],
      ["Walks", "Cleveland Way"]
    ],
    overview: [
      "Runswick Bay is a former fishing village on the North York Moors coast, with cottages clinging to the cliff above a sandy bay. Sandside Café marks the entrance to the beach.",
      "The bay faces away from much of the North Sea swell, so it's a sheltered option on rough days and a lovely family beach in summer."
    ],
    suits: ["Families", "Sheltered sessions in big swell", "Walkers"],
    notFor: ["Reliable surf"],
    surf: {
      text: ["Usually sheltered and small. It can produce waves when a big swell wraps in or when exposed beaches are too big."],
      cards: [
        { label: "Hazards", title: "Rockfalls", text: "Look at the Hob Holes caves from a distance — there's a risk of rockfalls." },
        { label: "Lifeguards", title: "RNLI from 11 July 2026", text: "Added to the North Yorkshire patrol rota from July to early September in 2026." }
      ]
    },
    practical: [
      { label: "Parking", title: "Two car parks", text: "Bank Bottom (TS13 5HT) and Bank Top (TS13 5JF), both pay and display." },
      { label: "Toilets", title: "Above the beach", text: "Just above Sandside Café." },
      { label: "Tides", title: "Check first", text: "Arrive at least an hour before low tide if you're beachcombing." }
    ],
    stay: { areas: [{ label: "Village", title: "Runswick Bay", text: "Holiday cottages and a hotel in the village." }] },
    food: { places: [{ name: "Sandside Café", type: "Café", note: "At the entrance to the beach." }], text: ["More cafés and pubs in the village."] },
    todo: [
      { label: "Walk", title: "Cleveland Way", text: "Staithes (2.5 miles) and Sandsend (5 miles) along the national trail." },
      { label: "Explore", title: "Hob Holes", text: "Small caves at the far headland — view from a distance." }
    ],
    travel: [{ label: "By car", title: "A174", text: "Between Whitby and Staithes." }],
    nearby: [
      { name: "Sandsend", href: "/guides/surfing-sandsend/", text: "Beginner breaks near Whitby." },
      { name: "Saltburn", href: "/guides/surfing-saltburn/", text: "Surf town to the north." }
    ],
    faqs: [
      { q: "Can you surf at Runswick Bay?", a: "Occasionally — it's sheltered, so it only works when a big swell wraps in." },
      { q: "Where do you park?", a: "Bank Bottom or Bank Top car parks, both pay and display." }
    ],
    sources: [{ label: "North York Moors National Park — Runswick Bay", url: "https://www.northyorkmoors.org.uk/places-to-go/runswick-bay" }, RNLI_NY],
    editorial: neEditorial
  })
];

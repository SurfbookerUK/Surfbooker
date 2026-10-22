// Scotland destination guides. Built October 2026 from Surfbooker's August–September 2026
// research notes (data/scotland-destinations-research.txt), keeping only facts that came from
// official, operator or tourism-body sources. Items the research flagged as unverified are left out
// or phrased as "check on arrival".
const lic = (slug) => `guides/_licensed-images/uk-destinations/${slug}.jpg`;
const base = (slug, extra) => ({
  region: "scotland",
  path: `/guides/surfing-${slug}/`,
  outFile: `guides/surfing-${slug}/index.html`,
  slug,
  ...extra
});
const RNLI = { label: "RNLI — find a lifeguarded beach", url: "https://rnli.org/find-my-nearest/lifeguarded-beaches" };
const NCW = { name: "North Coast Watersports", type: "Surf school & hire, Dunnet Bay", url: "https://www.northcoastwatersports.com/" };
const scotEditorial = "Researched by Surfbooker from official, tourism-body and operator sources; Surfbooker has not reviewed these businesses in person. Scottish surf beaches change quickly with swell and wind, so treat this as planning information, not a conditions report.";

export const destinations = [
  base("balevullin-tiree", {
    name: "Balevullin",
    fullName: "Balevullin, Isle of Tiree",
    area: "Isle of Tiree, Inner Hebrides",
    geo: [56.5130, -6.9600],
    title: "Balevullin, Tiree Surf Guide: Lessons, Hire, Ferries & Where to Stay | Surfbooker",
    description: "Surfing Balevullin on the Isle of Tiree: Blackhouse Watersports lessons and hire on the beach, how swell and wind work around the island, parking, facilities, food and places to stay.",
    heroIntro: "A west-facing Atlantic beach on Tiree with a surf school's beach hut right on the sand — and, because the island has beaches facing every direction, somewhere else to go when it doesn't work.",
    heroAlt: "Balevullin beach on Tiree with sand dunes, machair and the Atlantic beyond",
    images: { hero: lic("balevullin-tiree") },
    glance: [
      ["Best for", "Lessons, improvers, island surf trips"],
      ["Break", "Exposed beach break with some reef"],
      ["Lifeguards", "None — unlifeguarded"],
      ["Surf school", "Blackhouse Watersports, on the beach"],
      ["Getting there", "CalMac ferry from Oban or flights"],
      ["Water", "Cold — 5/4 most of the year"]
    ],
    overview: [
      "Balevullin is a sandy bay on the north-west corner of Tiree, the low, windswept island at the outer edge of the Inner Hebrides. It faces straight into the Atlantic and is the island's main surf-school base, with Blackhouse Watersports running lessons and hire from a hut by the beach.",
      "The island's real advantage for surfers is its shape. Tiree has sandy beaches facing almost every direction, and nowhere is more than a short drive away, so when Balevullin is blown out or too big there is usually a cleaner option on another coast.",
      "It is not a resort. Services are spread across small townships, shops and cafés keep island hours, and there are no beach lifeguards — part of the appeal, but it means planning ahead."
    ],
    suits: ["Learners with a lesson booked", "Improvers wanting uncrowded Atlantic waves", "Families happy with simple, outdoor holidays", "Surfers who like to move with the wind"],
    notFor: ["Anyone wanting lifeguarded beaches", "Last-minute trips in peak season — ferries and beds fill up"],
    surf: {
      text: [
        "Balevullin picks up west to north-north-west swell, with north-west usually the best direction. East to south-east winds are offshore. Most of the bay is sand, with some reef and rock influence, and the banks move — so the best tide varies. Forecast sites disagree on tide, which tells you to ask the school on the day rather than follow a fixed rule.",
        "Surf is possible year-round. Autumn to spring brings more swell; summer is often smaller and better for beginners."
      ],
      cards: [
        { label: "Level", title: "Beginners to experienced", text: "Learners should be in a lesson; experienced surfers will find quality on the right day." },
        { label: "Hazards", title: "Rips, cold and remoteness", text: "Moving banks, rip currents, strong wind and fast weather changes, with no lifeguards." },
        { label: "Crowds", title: "Usually quiet", text: "Busier near the school in summer, but rarely crowded by mainland standards." }
      ]
    },
    lessons: {
      intro: "Lessons and hire are run from the beach itself.",
      providers: [
        { name: "Blackhouse Watersports", type: "Surf school & hire, Balevullin", url: "https://www.blackhouse-watersports.co.uk/surf-tiree/", note: "Beginner to advanced coaching from the Balevullin beach hut; hires soft-tops, shortboards, mid-lengths, longboards and wetsuits." },
        { name: "Wild Diamond", type: "Watersports centre, Cornaig", url: "https://wilddiamond.co.uk/", note: "Established Tiree watersports operator with a base at Loch Bhasapol; runs activities around the island depending on conditions and hires equipment." }
      ],
      note: "Island shops have limited surf supplies — bring spare fins, a leash and a ding-repair kit."
    },
    practical: [
      { label: "Parking", title: "Use the permitted parking", text: "Park where signed near the beach and the surf hut. Don't park on the machair, croft access or passing places." },
      { label: "Facilities", title: "Plan for very little", text: "Public toilets on Tiree are mainly in Scarinish and Crossapol, and there's no public beach shower at Balevullin. Ask Blackhouse what changing space is available at the hut." },
      { label: "Lifeguards", title: "None", text: "Balevullin isn't on the RNLI's lifeguarded beach list. In an emergency call 999 or 112 and ask for the Coastguard." },
      { label: "Dogs", title: "Close control", text: "Tiree is a working crofting island with livestock and ground-nesting birds — keep dogs under close control and follow any seasonal notices." },
      { label: "Signal", title: "Patchy", text: "Mobile reception can be unreliable. Tell someone where you're surfing." },
      { label: "Check first", title: "Ferry and flight status", text: "Bad weather can disrupt CalMac sailings and flights — check on the day you travel." }
    ],
    stay: {
      intro: "Accommodation on Tiree is limited and books up early for summer and the autumn surf season.",
      areas: [
        { label: "Surf-first", title: "West Tiree and Balevullin", text: "Closest to the surf hut and the north-west coast." },
        { label: "Central", title: "Scarinish and Crossapol", text: "Nearer shops, cafés and the ferry, and only a short drive to any coast — practical for mixed groups." }
      ],
      picks: [
        { name: "The Reef Inn", type: "Inn with rooms", url: "https://www.reef-tiree.com/", note: "Rooms and food on the island. Researched listing — check dates and storage for boards." },
        { name: "Sunset Croft", type: "Camping, Balevullin", note: "Croft camping near the surf beach. Researched listing — confirm current season directly." }
      ]
    },
    food: {
      text: ["Food is spread across the island and opening times vary by season, so check before you set off."],
      places: [
        { name: "Hebridean Roast", type: "Coffee, Scarinish", note: "Listed in the island's visitor food guide." },
        { name: "The Farmhouse Cafe", type: "Café, Balemartine", note: "Breakfast and light lunches — seasonal hours." },
        { name: "The Reef Inn", type: "Pub and restaurant", url: "https://www.reef-tiree.com/", note: "The obvious place for a meal after a session." },
        { name: "Ceabhar Restaurant & Brewery", type: "Restaurant", note: "Booking-led with limited opening." }
      ]
    },
    todo: [
      { label: "Walk", title: "Balevullin and the Maze", text: "The obvious local walk from the beach along the north-west coast." },
      { label: "Heritage", title: "The Ringing Stone", text: "A huge boulder covered in prehistoric cup marks on the north coast." },
      { label: "Island", title: "Hynish and Balephuil", text: "Lighthouse heritage at Hynish and the beaches of the island's south-west." },
      { label: "Rainy day", title: "Island drive", text: "Rain on Tiree often comes in bands — a drive between coasts can find a clear window." }
    ],
    travel: [
      { label: "Ferry", title: "CalMac from Oban", text: "Ferries sail from Oban to Scarinish. Book vehicles well ahead in summer." },
      { label: "Air", title: "Flights from Glasgow", text: "Scheduled flights land at Tiree airport, a short drive from Balevullin." },
      { label: "On the island", title: "Car or bike", text: "Tiree is small enough that most beaches are 10–25 minutes apart by car; allow for single-track roads and livestock." }
    ],
    nearby: [
      { name: "Machrihanish", href: "/guides/surfing-machrihanish/", text: "Kintyre's long Atlantic beach on the mainland." },
      { name: "Scotland surf guide", href: "/guides/scotland/", text: "Compare every Scottish beach on Surfbooker." }
    ],
    faqs: [
      { q: "Is Balevullin good for beginners?", a: "Yes, with a lesson. Blackhouse Watersports teaches from the beach and will move to a more suitable bay when Balevullin is too big. There are no lifeguards." },
      { q: "What's the best tide at Balevullin?", a: "It depends on the banks at the time, and surf forecasts disagree. Ask the school on the day." },
      { q: "What if Balevullin is blown out?", a: "Tiree has beaches facing many directions. Check another coast — most are within a 10–25 minute drive." },
      { q: "Do I need a car on Tiree?", a: "It helps for chasing conditions, though the island is also good for cycling." }
    ],
    sources: [
      { label: "Blackhouse Watersports — Surf Tiree", url: "https://www.blackhouse-watersports.co.uk/surf-tiree/" },
      { label: "Visit Tiree", url: "https://www.visittiree.com/" },
      { label: "Visit Tiree — food and drink", url: "https://www.visittiree.com/food-and-drink" },
      { label: "Tiree Trust", url: "https://www.tireetrust.org.uk/" },
      RNLI
    ],
    editorial: scotEditorial
  }),

  base("belhaven-bay", {
    name: "Belhaven Bay",
    fullName: "Belhaven Bay, Dunbar",
    area: "Dunbar, East Lothian",
    geo: [56.0040, -2.5450],
    title: "Belhaven Bay Surf Guide, Dunbar: Lessons, Parking & Facilities | Surfbooker",
    description: "Belhaven Bay near Dunbar: Coast to Coast Surf School at Belhaven Surf Centre, £3 day parking, showers, no lifeguards, tidal safety, food in Dunbar and the Bridge to Nowhere.",
    heroIntro: "A broad sandy bay inside John Muir Country Park, a minute from Dunbar — with a purpose-built surf centre, parking and showers, and one of Scotland's easiest places to learn.",
    heroAlt: "Belhaven Bay at low tide with the estuary and the hills of East Lothian behind",
    images: { hero: lic("belhaven-bay") },
    glance: [
      ["Best for", "Beginners, families, longboarders"],
      ["Break", "Sandy beach break"],
      ["Lifeguards", "None — unlifeguarded"],
      ["Parking", "Shore Road car park, £3/day"],
      ["Facilities", "Toilets, accessible toilet, showers"],
      ["Rail", "Dunbar station is nearby"]
    ],
    overview: [
      "Belhaven Bay sits at the western edge of Dunbar, inside John Muir Country Park. It's a wide sandy beach with an estuary, salt marsh and the famous 'Bridge to Nowhere' crossing the Biel Water — a footbridge that becomes an island at high tide.",
      "For surfers the big asset is Belhaven Surf Centre, a community building by the car park where Coast to Coast Surf School is based. It has changing rooms and showers, and Dunbar's cafés and train station are minutes away.",
      "The surf is mostly gentle and forgiving, which is why it is such a good learning beach. It is a North Sea break, though, so it needs swell from the north-east and there can be long flat spells."
    ],
    suits: ["First lessons and family surf days", "Longboarders and improvers", "Car-free trips by train to Dunbar"],
    notFor: ["Powerful, high-performance surf", "Reliable waves in long flat spells"],
    surf: {
      text: [
        "Belhaven needs north-east to east swell. West to south-west winds are offshore; strong easterlies make it messy. Most of the bay is sand, with some rock towards the edges, and the estuary moves the banks around.",
        "No single tide is best — the banks decide. What changes most with the tide is the walk: at low tide the water can be a long way out across the flats."
      ],
      cards: [
        { label: "Level", title: "Beginners to intermediates", text: "Forgiving most days; more fun for intermediates on bigger swells." },
        { label: "Hazards", title: "Fast tides and channels", text: "The tide comes in fast across the flats and estuary. Don't wander far out without checking it." },
        { label: "Season", title: "Winter and spring", text: "Most dependable for swell; lessons run roughly March to November." }
      ]
    },
    lessons: {
      providers: [
        { name: "Coast to Coast Surf School", type: "Surf school & hire, Belhaven Surf Centre", url: "https://c2csurfschool.com/", note: "Teaches at Belhaven from the surf centre on Back Road. Beginner lessons from age 7 (with a swim requirement); hires foam and hard boards and wetsuits." }
      ],
      text: ["Belhaven Surf Centre also hosts community surf activity, including The Wave Project."]
    },
    practical: [
      { label: "Parking", title: "Shore Road car park", text: "East Lothian Council lists £3 per day, valid at participating coastal car parks that day." },
      { label: "Facilities", title: "Toilets and showers", text: "Toilets and an accessible toilet by the car park. Belhaven Surf Centre has hot showers (coin-operated) and changing rooms." },
      { label: "Lifeguards", title: "None", text: "There are no lifeguarded beaches in East Lothian. Call 999 or 112 and ask for the Coastguard in a coastal emergency." },
      { label: "Dogs", title: "Country park rules", text: "Dogs are welcome in the country park but follow wildlife signs and keep them away from nesting birds." },
      { label: "Access", title: "Short walk", text: "A few minutes from the car park to the beach edge; much further to the water at low tide. Soft sand limits wheelchair access beyond the car park area." },
      { label: "Tides", title: "Check before walking out", text: "Don't get cut off by the incoming tide in the estuary channels." }
    ],
    stay: {
      intro: "Dunbar is the natural base — the beach is minutes away and you get the town's food, shops and railway station.",
      areas: [
        { label: "Town", title: "Dunbar", text: "Hotels, guesthouses and self-catering; walk or cycle to Belhaven." },
        { label: "Beachside", title: "Belhaven Bay", text: "A holiday park beside the bay suits families and early starts." }
      ],
      picks: [
        { name: "Belhaven Bay Caravan Park", type: "Holiday park", note: "Next to the bay and country park. Researched listing — check current availability." },
        { name: "Bayswell Park Hotel", type: "Hotel, Dunbar", note: "Clifftop hotel in Dunbar with sea views. Researched listing." }
      ]
    },
    food: {
      text: ["Dunbar has the choice; West Barns is right next to the bay for a pub meal."],
      places: [
        { name: "The Dukes of West Barns", type: "Pub", note: "Close to Belhaven for a post-surf meal." },
        { name: "Graze Coffee and Chocolate House", type: "Café, Dunbar", note: "Town-centre coffee and breakfast." },
        { name: "Dunbar Community Bakery", type: "Bakery, Dunbar", note: "Community-owned bakery in the high street." }
      ]
    },
    todo: [
      { label: "Walk", title: "John Muir Country Park", text: "Dunes, salt marsh and the estuary; the Bridge to Nowhere is the classic photo." },
      { label: "Heritage", title: "John Muir's Birthplace", text: "Museum in Dunbar High Street about the conservationist born here." },
      { label: "Town", title: "Dunbar harbour and castle", text: "Harbours and the ruins of Dunbar Castle above them." },
      { label: "Rainy day", title: "Dunbar Leisure Pool", text: "An indoor fallback for families." }
    ],
    travel: [
      { label: "Rail", title: "Dunbar station", text: "On the East Coast Main Line, with trains from Edinburgh and Newcastle." },
      { label: "By car", title: "A1", text: "Belhaven is just off the A1 at Dunbar; follow signs for John Muir Country Park." }
    ],
    nearby: [
      { name: "Pease Bay", href: "/guides/surfing-pease-bay/", distance: "About 20–25 minutes", text: "A more defined wave for intermediates on a north-east swell." },
      { name: "Coldingham Bay", href: "/guides/surfing-coldingham-bay/", distance: "About 30–35 minutes", text: "Small bay with a surf shop and seasonal lifeguards." },
      { name: "Scotland surf guide", href: "/guides/scotland/", text: "Every Scottish beach on Surfbooker." }
    ],
    faqs: [
      { q: "Is Belhaven Bay good for beginners?", a: "It's one of the best places in Scotland to learn, especially with Coast to Coast Surf School. There are no lifeguards, so beginners should surf in a lesson." },
      { q: "How much is parking at Belhaven?", a: "East Lothian Council lists £3 per day for the Shore Road car park." },
      { q: "Are there showers?", a: "Yes — Belhaven Surf Centre has coin-operated hot showers and changing rooms." },
      { q: "Can you get to Belhaven by train?", a: "Yes. Dunbar station is on the East Coast Main Line, and the beach is a short walk or cycle away." }
    ],
    sources: [
      { label: "Visit East Lothian — Belhaven Bay", url: "https://visiteastlothian.org/things-to-see-do/beaches/belhaven-bay/" },
      { label: "Coast to Coast Surf School — beginner lessons", url: "https://c2csurfschool.com/surf/beginner-surf-lessons/" },
      { label: "Coast to Coast — hire", url: "https://c2csurfschool.com/hire/" },
      { label: "Belhaven Surf Centre — facilities", url: "https://belhavensurfcentre.org/the-centre/the-facilities/" },
      { label: "RNLI — North Berwick news, July 2026 (East Lothian has no lifeguarded beaches)", url: "https://rnli.org/news-and-media/2026/july/23/north-berwick-rnli-crew-member-saves-three-whilst-surfing" }
    ],
    editorial: scotEditorial
  }),

  base("coldingham-bay", {
    name: "Coldingham Bay",
    area: "Coldingham, Scottish Borders",
    geo: [55.8920, -2.1390],
    title: "Coldingham Bay Surf Guide: St Vedas Surf School, Lifeguards & Parking | Surfbooker",
    description: "Coldingham Bay in the Scottish Borders: St Vedas surf school and shop on the beach, seasonal RNLI lifeguards, parking and accessible spaces, beach huts, St Abbs and the coastal path.",
    heroIntro: "A small sandy cove with beach huts, rocky headlands and a surf school on the sand — and, unusually for Scotland, a seasonal RNLI lifeguard patrol.",
    heroAlt: "Coldingham Bay with its sandy beach, beach huts and rocky headland",
    images: { hero: lic("coldingham-bay") },
    glance: [
      ["Best for", "Families, lessons, small-bay surf"],
      ["Break", "Beach break between headlands"],
      ["Lifeguards", "Seasonal RNLI patrol"],
      ["Surf school", "St Vedas, on the beach"],
      ["Facilities", "Toilets; showers at St Vedas"],
      ["Nearby", "St Abbs and the marine reserve"]
    ],
    overview: [
      "Coldingham Bay is a compact sandy cove just below Coldingham village, a mile from the fishing harbour of St Abbs. Colourful beach huts line the back of the beach, rocky headlands close it off at each end, and it sits within the Berwickshire marine reserve.",
      "St Vedas Surf School runs lessons, hire and a surf shop right on the beach, and the RNLI patrols in summer — which makes it one of the most complete family surf beaches in south-east Scotland.",
      "Because the bay is small, the surf changes character quickly. On a big swell it becomes a much more serious place than its family feel suggests."
    ],
    suits: ["Families who want lifeguards in summer", "Beginners booking a lesson", "Intermediates on an ordinary North Sea swell"],
    notFor: ["Space to spread out on busy summer days", "Beginners on big swells"],
    surf: {
      text: [
        "North-east and east swells are the main directions, and St Vedas says the bay can also pick up a big north-west swell wrapping round. Westerly winds are offshore. Because the sandbar moves, it can work on any tide — ask St Vedas or the lifeguards where the best bank is.",
        "Autumn to spring is the main swell season; summer still produces small waves that suit lessons."
      ],
      cards: [
        { label: "Level", title: "Beginners to experienced", text: "Beginners when small; experienced surfers on a solid swell." },
        { label: "Hazards", title: "Rips and rocks", text: "Strong rips, rocky headlands and a lot of people in a small space." },
        { label: "Zones", title: "Follow the flags", text: "During patrols, surf between the black-and-white flags and swim between the red-and-yellow." }
      ]
    },
    lessons: {
      providers: [
        { name: "St Vedas Surf School & Shop", type: "Surf school, hire & shop, on the beach", url: "https://www.stvedas.co.uk/", note: "Group lessons, one-to-one coaching, hire of boards, bodyboards, wetsuits, boots, hoods and gloves, plus a beachfront surf shop. Changing rooms and showers for customers." }
      ]
    },
    practical: [
      { label: "Parking", title: "Car park above the bay", text: "A small public car park opposite the bay, with two disabled spaces down at beach level. Check signs for current charges." },
      { label: "Facilities", title: "Toilets", text: "Scottish Borders Council lists public toilets at the bay. St Vedas has changing rooms and showers for customers." },
      { label: "Lifeguards", title: "Seasonal RNLI patrol", text: "In 2026 the RNLI patrolled daily from late May to early September and at weekends into late September, 10am–6pm. Check the RNLI page for the current year." },
      { label: "Access", title: "Steep road down", text: "A few minutes' walk down a steep road; beach wheelchairs are available through the Sea The Change initiative." },
      { label: "Signal", title: "Weaker in the bay", text: "Reception can drop at beach level — in an emergency call 999 or 112 and ask for the Coastguard." },
      { label: "Busy days", title: "Arrive early", text: "The car park is small and fills on summer days." }
    ],
    stay: {
      intro: "There's no big beach hotel — stay in Coldingham village, St Abbs or Eyemouth.",
      areas: [
        { label: "Village", title: "Coldingham and St Abbs", text: "Quiet bases a short walk or drive from the bay." },
        { label: "Town", title: "Eyemouth", text: "More shops, food and wet-weather options, 10–15 minutes away." }
      ]
    },
    food: {
      text: ["A beach café opens in season. For a proper meal, head to Coldingham, St Abbs or Eyemouth — check opening times outside the summer holidays."]
    },
    todo: [
      { label: "Walk", title: "Berwickshire Coastal Path to St Abbs", text: "A cliff-top walk from the bay to St Abbs harbour." },
      { label: "Nature", title: "St Abbs Head", text: "National Nature Reserve with seabird cliffs and a lighthouse." },
      { label: "Heritage", title: "Coldingham Priory", text: "The village's medieval priory church." },
      { label: "Rainy day", title: "Eyemouth", text: "Harbour, museum and cafés nearby." }
    ],
    travel: [
      { label: "By car", title: "A1107 from the A1", text: "Coldingham is just off the A1 between Dunbar and Berwick." },
      { label: "Rail", title: "Berwick-upon-Tweed", text: "The nearest mainline station; buses run to Coldingham — check current timetables." }
    ],
    nearby: [
      { name: "Pease Bay", href: "/guides/surfing-pease-bay/", distance: "About 15–20 minutes", text: "A stronger wave on a north-east swell." },
      { name: "Belhaven Bay", href: "/guides/surfing-belhaven-bay/", distance: "About 30–35 minutes", text: "Big sandy bay and surf centre — good for learners." },
      { name: "Scotland surf guide", href: "/guides/scotland/", text: "Every Scottish beach on Surfbooker." }
    ],
    faqs: [
      { q: "Is Coldingham Bay lifeguarded?", a: "Yes, in summer. The RNLI patrols daily from late May to early September, with some weekends after that. Check the RNLI page for the current dates." },
      { q: "Can I hire a surfboard at Coldingham?", a: "Yes. St Vedas hires boards, bodyboards and wetsuits from the beach and runs lessons." },
      { q: "Is Coldingham good for beginners?", a: "On small days, especially in a lesson and when lifeguards are on duty. The small bay can get rippy on bigger swells." }
    ],
    sources: [
      { label: "Scottish Borders Council — Coldingham Bay", url: "https://www.scotborders.gov.uk/parks-outdoors/countryside-sites/2" },
      { label: "RNLI — Coldingham Bay", url: "https://rnli.org/find-my-nearest/lifeguarded-beaches/coldingham-bay-beach" },
      { label: "St Vedas — surf lessons", url: "https://www.stvedas.co.uk/surfing-lessons-scotland.htm" },
      { label: "St Vedas — hire", url: "https://www.stvedas.co.uk/surfboard-bodyboard-wetsuit-kayak-hire.htm" }
    ],
    editorial: scotEditorial
  }),

  base("dalmore-bay-lewis", {
    name: "Dalmore",
    fullName: "Dalmore Bay, Isle of Lewis",
    area: "West Side, Isle of Lewis",
    geo: [58.3050, -6.7580],
    title: "Dalmore Bay, Lewis Surf Guide: Conditions, Lessons & Where to Stay | Surfbooker",
    description: "Surfing Dalmore Bay on the Isle of Lewis: a powerful, unlifeguarded Atlantic beach. Surf Lewis lessons and hire, parking and toilets, safety, Callanish and Gearrannan nearby.",
    heroIntro: "A dramatic west-coast Lewis beach with dunes, sea stacks and the full force of the Atlantic — a beautiful place to visit and a serious place to surf.",
    heroAlt: "Dalmore beach on the Isle of Lewis with dunes and rocky headlands",
    images: { hero: lic("dalmore-bay-lewis") },
    glance: [
      ["Best for", "Intermediate and experienced surfers"],
      ["Break", "Sandy bay with reef-influenced peaks"],
      ["Lifeguards", "None — unlifeguarded"],
      ["Parking", "Car park by the beach and toilets"],
      ["Lessons", "Surf Lewis (teaching beach varies)"],
      ["Warning", "Strong currents in windy weather"]
    ],
    overview: [
      "Dalmore (Dail Mòr) is a sandy bay near Carloway on the west side of Lewis, backed by dunes and a cemetery and framed by sea stacks. It faces straight into the Atlantic and has almost no commercial surf infrastructure — just a car park and toilets.",
      "The beach looks inviting, but Visit Outer Hebrides warns of strong currents and huge waves in windy weather and advises swimming only in gentle conditions. It's a place for competent surfers; beginners should go with Surf Lewis to whichever beach they choose that day."
    ],
    suits: ["Intermediate and experienced surfers", "Scenery and sunsets", "Combining surf with Callanish and the West Side"],
    notFor: ["Unaccompanied beginners", "Anyone wanting facilities or lifeguards"],
    surf: {
      text: [
        "Dalmore picks up west to north-west swell, with north-west the most-cited ideal. North-east to easterly winds are offshore. The bay is mostly sand, but rock and reef shape the peaks. There's no reliable fixed best tide — check the forecast and local advice.",
        "Autumn to spring is the main swell season; summer can be quieter or flat, though storms still bring dangerous days."
      ],
      cards: [
        { label: "Level", title: "Intermediate+", text: "Powerful Atlantic surf. Not a beginner beach." },
        { label: "Hazards", title: "Rips and power", text: "Strong currents, big surf, rocks, cold water and isolation." },
        { label: "Crowds", title: "Usually quiet", text: "Good forecasts bring local surfers, but it's rarely busy." }
      ]
    },
    lessons: {
      providers: [
        { name: "Surf Lewis", type: "Surf school & hire, Lewis and Harris", url: "https://www.surflewis.com/", note: "The main coaching operator on Lewis. Teaches at whichever beach suits the conditions — often not Dalmore. Hire (boards, wetsuits, boots, gloves, hoods, soft racks) must be booked in advance." }
      ],
      note: "There's no surf shop at Dalmore; Stornoway has the island's main shops."
    },
    practical: [
      { label: "Parking", title: "Beach car park", text: "Follow the signed road towards Dalmore and the cemetery. Keep the cemetery access clear." },
      { label: "Facilities", title: "Toilets only", text: "Visit Outer Hebrides lists toilets by the car park. No showers — change at the car." },
      { label: "Lifeguards", title: "None", text: "Call 999 or 112 and ask for the Coastguard in an emergency." },
      { label: "Signal", title: "Patchy", text: "Download an offline map and save your location before going in." },
      { label: "Check first", title: "Forecast and ferries", text: "Check swell, wind, Met Office warnings and CalMac or flight status if you're travelling that day." }
    ],
    stay: {
      intro: "There's no hotel at Dalmore. Stay on the West Side for surf, or in Stornoway for services.",
      areas: [
        { label: "Surf-first", title: "Carloway and the West Side", text: "Self-catering cottages, cabins and community hostels within a short drive." },
        { label: "Town", title: "Stornoway", text: "Hotels, restaurants and shops — 35–45 minutes away." }
      ],
      picks: [
        { name: "Grinneabhat", type: "Community hostel and café, Bragar", note: "Community-run venue on the West Side. Researched listing — check current opening." }
      ]
    },
    food: {
      text: ["Food on the West Side is seasonal and limited — pack lunch. Community venues and the café at Gearrannan Blackhouse Village are useful when open; Stornoway has the most choice."]
    },
    todo: [
      { label: "Heritage", title: "Callanish Stones", text: "The famous standing stones, around 20 minutes away." },
      { label: "Heritage", title: "Gearrannan Blackhouse Village", text: "Restored thatched blackhouses near Carloway." },
      { label: "Heritage", title: "Dun Carloway Broch", text: "One of the best-preserved Iron Age brochs in Scotland." },
      { label: "Walk", title: "West Side Coastal Path", text: "Passes Dalmore on its way towards Gearrannan." }
    ],
    travel: [
      { label: "Ferry", title: "Ullapool to Stornoway", text: "CalMac sails from Ullapool; Dalmore is about 35–45 minutes' drive from Stornoway." },
      { label: "Air", title: "Stornoway airport", text: "Flights from mainland Scottish airports." }
    ],
    nearby: [
      { name: "Balevullin, Tiree", href: "/guides/surfing-balevullin-tiree/", text: "Another Hebridean surf island, with a surf school on the beach." },
      { name: "Scotland surf guide", href: "/guides/scotland/", text: "Every Scottish beach on Surfbooker." }
    ],
    faqs: [
      { q: "Is Dalmore safe for swimming?", a: "Only in gentle conditions. Visit Outer Hebrides warns of strong currents and huge waves in windy weather, and there are no lifeguards." },
      { q: "Can beginners surf Dalmore?", a: "It isn't recommended without a coach. Surf Lewis picks a suitable teaching beach for the day." },
      { q: "Are there toilets at Dalmore?", a: "Yes, by the car park. There are no showers." }
    ],
    sources: [
      { label: "Visit Outer Hebrides", url: "https://www.visitouterhebrides.co.uk/" },
      { label: "Surf Lewis — lessons", url: "https://www.surflewis.com/surf-lessons-lewis-harris" },
      { label: "Surf Lewis — hire", url: "https://www.surflewis.com/surf-hire-lewis-harris" },
      RNLI
    ],
    editorial: scotEditorial
  }),

  base("dunnet-bay", {
    name: "Dunnet Bay",
    area: "Caithness, north coast",
    geo: [58.6150, -3.3500],
    title: "Dunnet Bay Surf Guide: Lessons, Hire, Parking & Where to Stay | Surfbooker",
    description: "Dunnet Bay in Caithness: North Coast Watersports lessons and hire, the beach car park, no showers or lifeguards, Northern Sands Hotel, Dunnet Head and Castle of Mey.",
    heroIntro: "A two-mile sweep of sand on Scotland's north coast near Thurso — the best place on this coast to learn, with a surf school on the beach and the cliffs of Dunnet Head at the end.",
    heroAlt: "Dunnet Bay beach and dunes on the north coast of Caithness",
    images: { hero: lic("dunnet-bay") },
    glance: [
      ["Best for", "Beginners, families, intermediates"],
      ["Break", "Beach break with a reef section"],
      ["Lifeguards", "None — unlifeguarded"],
      ["Surf school", "North Coast Watersports"],
      ["Facilities", "Toilets; no showers or changing"],
      ["Thurso", "About 15 minutes' drive"]
    ],
    overview: [
      "Dunnet Bay is a long, north-west-facing beach between Castletown and Dunnet village, backed by high dunes and a forest. It's the beginner-friendly heart of the north coast, while the famous reefs around Thurso are for experienced surfers.",
      "North Coast Watersports runs lessons and hire from the beach car park beside the caravan site. There are two wood-fired saunas around the bay, but no public showers or changing rooms."
    ],
    suits: ["First lessons on the north coast", "Families on an NC500 trip", "Intermediates wanting space"],
    notFor: ["Hot showers and changing rooms", "Lifeguarded swimming"],
    surf: {
      text: [
        "Dunnet picks up north-west swell well, and northerly swell generally works. South-east winds are offshore. It's mostly sand with a right-hand reef section, and it can work on all tides — the banks change, so ask the school where's best.",
        "Surf is possible year-round. Autumn and winter bring bigger swell; summer suits lessons on smaller days."
      ],
      cards: [
        { label: "Level", title: "Beginners to intermediates", text: "The north coast's best teaching beach." },
        { label: "Hazards", title: "Rips and reef", text: "Rip currents, rocky sections, cold water and swell that builds fast." },
        { label: "Crowds", title: "Spacious", text: "Plenty of room even in NC500 season." }
      ]
    },
    lessons: {
      providers: [
        { ...NCW, url: "https://www.northcoastwatersports.com/surf", note: "Lessons from Dunnet Bay, private and group coaching, kids' programmes and guided surf trips. Hires 5/4 wetsuits, boots and gloves, foam and hard boards, bodyboards, SUPs and kayaks." }
      ]
    },
    practical: [
      { label: "Parking", title: "Beach car park", text: "Next to the Dunnet Bay Caravan and Motorhome Club site — also the school's meeting point. Check signs for any charges." },
      { label: "Facilities", title: "Toilets only", text: "Public toilets near the car park. North Coast Watersports says there are no changing or shower facilities at the beach." },
      { label: "Lifeguards", title: "None", text: "Call 999 or 112 and ask for the Coastguard in an emergency." },
      { label: "Access", title: "Short walk", text: "A few minutes from car park to sand; soft sand beyond." },
      { label: "Winter", title: "Short days", text: "Check daylight as well as the forecast between November and February." }
    ],
    stay: {
      areas: [
        { label: "Surf-first", title: "Dunnet and Castletown", text: "Closest to the beach for dawn sessions." },
        { label: "Town", title: "Thurso", text: "About 15 minutes, with more food, shops and transport." }
      ],
      picks: [
        { name: "Northern Sands Hotel", type: "Hotel, Dunnet", url: "https://www.northernsands.co.uk/", note: "Hotel and restaurant in Dunnet village. Researched listing." },
        { name: "Dunnet Bay Caravan and Motorhome Club Site", type: "Campsite", note: "Right behind the beach. Researched listing — book through the club." }
      ]
    },
    food: {
      text: ["Northern Sands is the easiest place to eat in Dunnet; Thurso has much more choice 15 minutes away."]
    },
    todo: [
      { label: "Viewpoint", title: "Dunnet Head", text: "The most northerly point of mainland Britain, with an RSPB reserve and seabird cliffs." },
      { label: "Heritage", title: "Castle & Gardens of Mey", text: "The late Queen Mother's Caithness home — seasonal opening." },
      { label: "Relax", title: "Beach saunas", text: "Two wood-fired saunas operate around the bay — book directly." },
      { label: "Day trip", title: "John o' Groats and Duncansby Stacks", text: "Sea stacks and cliffs at the north-east tip." }
    ],
    travel: [
      { label: "By car", title: "A836 / NC500", text: "Dunnet is on the North Coast 500 between Thurso and John o' Groats." },
      { label: "Rail", title: "Thurso station", text: "The Far North Line runs from Inverness to Thurso." }
    ],
    nearby: [
      { name: "Thurso Beach", href: "/guides/surfing-thurso-beach/", distance: "About 15 minutes", text: "Town beach break with food on the doorstep." },
      { name: "Thurso East", href: "/guides/surfing-thurso-east/", distance: "About 15 minutes", text: "World-class reef — for experienced surfers only." },
      { name: "Melvich", href: "/guides/surfing-melvich/", distance: "About 45–55 minutes", text: "Quiet river-mouth bay to the west." }
    ],
    faqs: [
      { q: "Is Dunnet Bay good for beginners?", a: "Yes — it's the best beginner beach on the north coast, and North Coast Watersports teaches there. There are no lifeguards." },
      { q: "Are there showers at Dunnet Bay?", a: "No. There are toilets near the car park but no showers or changing rooms." },
      { q: "Where can I hire a board?", a: "North Coast Watersports hires boards and 5/4 wetsuits from the beach car park." }
    ],
    sources: [
      { label: "North Coast Watersports", url: "https://www.northcoastwatersports.com/" },
      { label: "North Coast Watersports — equipment page", url: "https://www.northcoastwatersports.com/equipment-hire" },
      { label: "Northern Sands Hotel", url: "https://www.northernsands.co.uk/" },
      { label: "RNLI — lifeguarding in Scotland, July 2026", url: "https://rnli.org/news-and-media/2026/july/31/rnli-celebrates-lifeguard-anniversary-in-scotland" }
    ],
    editorial: scotEditorial
  }),

  base("fraserburgh", {
    name: "Fraserburgh",
    fullName: "Fraserburgh Beach",
    area: "Fraserburgh, Aberdeenshire",
    geo: [57.6880, -1.9900],
    title: "Fraserburgh Surf Guide: Beach, Lessons, Parking & Lighthouses | Surfbooker",
    description: "Surfing Fraserburgh beach in Aberdeenshire: sandy beach peaks and a harbour point, free council parking, toilets, Scot Surf School lessons, food and the Museum of Scottish Lighthouses.",
    heroIntro: "A long sandy beach right beside a working fishing town, with peaks along the sand for learners and a harbour-end point for better surfers.",
    heroAlt: "Fraserburgh beach curving away from the town towards the dunes",
    images: { hero: lic("fraserburgh") },
    glance: [
      ["Best for", "Beginners to experienced"],
      ["Break", "Beach break and harbour point"],
      ["Lifeguards", "None — unlifeguarded"],
      ["Parking", "Free council car park nearby"],
      ["Facilities", "Toilets with disabled access"],
      ["Lessons", "Scot Surf School (weekends)"]
    ],
    overview: [
      "Fraserburgh beach curves for around three miles east of the harbour towards the Waters of Philorth nature reserve. The town is right behind it, so food, toilets and parking are all close at hand — more than most Scottish surf spots offer.",
      "It's really two different places to surf: the open sandy beach, with peaks that suit learners and intermediates, and the harbour-end point, a rockier, more demanding wave. Decide which you mean before reading a forecast."
    ],
    suits: ["Learners and intermediates on the open beach", "Experienced surfers at the harbour point", "Trips combining surf and town"],
    notFor: ["Beginners at the harbour end", "Lifeguarded swimming"],
    surf: {
      text: [
        "North and north-east swells work on this east-facing coast; southerly winds are offshore. The open beach can work on any tide; the harbour point is more tide-sensitive.",
        "Winter and spring are the most dependable seasons, with good autumn spells when North Sea storms line up."
      ],
      cards: [
        { label: "Beach", title: "Learners to intermediates", text: "Sandy peaks spread along the bay." },
        { label: "Harbour point", title: "Experienced only", text: "Rock and boulders, working-harbour traffic, more consequence." },
        { label: "Hazards", title: "Rips and cold", text: "Rip currents, changing banks, strong wind and cold water." }
      ]
    },
    lessons: {
      providers: [
        { name: "Scot Surf School", type: "Surf school, Aberdeen & Fraserburgh", url: "https://www.scotsurfschool.com/", note: "Advertises weekend lessons in Fraserburgh and can arrange board and wetsuit hire by email — confirm the meeting point when you book." }
      ]
    },
    practical: [
      { label: "Parking", title: "Seaforth Street South", text: "Aberdeenshire Council lists 144 free spaces here. Don't block access to the working harbour." },
      { label: "Facilities", title: "Toilets", text: "Aberdeenshire Council lists public toilets at the beach with disabled access." },
      { label: "Lifeguards", title: "None", text: "Fraserburgh has an RNLI lifeboat station, but no beach lifeguards. Call 999 or 112 and ask for the Coastguard in an emergency." },
      { label: "Access", title: "Promenade", text: "The promenade and toilets are relatively accessible; soft sand limits access beyond." },
      { label: "Weather", title: "Exposed in northerlies", text: "Strong northerly winds make the promenade very exposed." }
    ],
    stay: {
      intro: "Stay in town — the beach is part of Fraserburgh.",
      areas: [
        { label: "Town", title: "Fraserburgh", text: "Walk to the beach, harbour and museum." },
        { label: "Beachside", title: "Esplanade caravan park", text: "Fraserburgh Caravan Park sits on the esplanade behind the beach — handy for families." },
        { label: "Coast", title: "Rosehearty and rural lodges", text: "Quieter bases a short drive west." }
      ]
    },
    food: {
      places: [
        { name: "Beach Cafe", type: "Café, by the beach", note: "The closest stop for coffee and breakfast — daytime hours." },
        { name: "Café 1909", type: "Café, town", note: "Listed by VisitAberdeenshire." }
      ],
      text: ["Head into town for a pub or restaurant in the evening; don't rely on the beach café opening late or out of season."]
    },
    todo: [
      { label: "Museum", title: "Museum of Scottish Lighthouses", text: "At Kinnaird Head — Scotland's first mainland lighthouse. The best wet-day option." },
      { label: "Nature", title: "Waters of Philorth", text: "Local nature reserve at the east end of the beach, with paths and boardwalks." },
      { label: "Coast", title: "Pennan and Gardenstown", text: "Clifftop fishing villages to the west." }
    ],
    travel: [
      { label: "By car", title: "A90 / A952", text: "About an hour north of Aberdeen." },
      { label: "Bus", title: "From Aberdeen", text: "Regular buses run from Aberdeen — check current timetables." }
    ],
    nearby: [
      { name: "Lossiemouth", href: "/guides/surfing-lossiemouth/", text: "Moray's beginner-friendly surf town." },
      { name: "Scotland surf guide", href: "/guides/scotland/", text: "Every Scottish beach on Surfbooker." }
    ],
    faqs: [
      { q: "Is Fraserburgh good for surfing?", a: "Yes — the beach has peaks for learners and intermediates, and the harbour-end point suits experienced surfers on a north or north-east swell." },
      { q: "Is parking free?", a: "Aberdeenshire Council lists the Seaforth Street South car park (144 spaces) as free." },
      { q: "Are there lifeguards?", a: "No. Fraserburgh has an RNLI lifeboat but no beach lifeguards." }
    ],
    sources: [
      { label: "Aberdeenshire Council — car parks", url: "https://www.aberdeenshire.gov.uk/roads-and-travel/car-parking/car-parks" },
      { label: "Aberdeenshire Council — public toilets", url: "https://www.aberdeenshire.gov.uk/local/public-toilets" },
      { label: "Aberdeenshire Council — local nature reserves", url: "https://www.aberdeenshire.gov.uk/environment/natural-heritage/local-nature-reserves/" },
      { label: "Scot Surf School", url: "https://www.scotsurfschool.com/" },
      RNLI
    ],
    editorial: scotEditorial
  }),
  base("lossiemouth", {
    name: "Lossiemouth",
    fullName: "Lossiemouth East Beach",
    area: "Lossiemouth, Moray",
    geo: [57.7230, -3.2780],
    title: "Lossiemouth Surf Guide: East Beach Lessons, Parking & Food | Surfbooker",
    description: "Surfing Lossiemouth East Beach in Moray: New Wave Surf School, free parking at Gregory Place, the footbridge, no lifeguards, places to eat and stay, and West Beach sunsets.",
    heroIntro: "A friendly Moray surf town with a broad sandy East Beach reached by a footbridge, a surf school on the sand and cafés a few minutes away.",
    heroAlt: "Lossiemouth East Beach with the footbridge over the River Lossie",
    images: { hero: lic("lossiemouth") },
    glance: [
      ["Best for", "Beginners, families, intermediates"],
      ["Break", "Sandy beach break"],
      ["Lifeguards", "None — unlifeguarded"],
      ["Parking", "Gregory Place (East Beach), free"],
      ["Surf school", "New Wave, East Beach"],
      ["Also here", "West Beach and Covesea Lighthouse"]
    ],
    overview: [
      "Lossiemouth has two beaches. East Beach, across the footbridge over the River Lossie, is the surf beach: a long stretch of sand and dunes with New Wave Surf School's hut at the town end. West Beach runs past the golf course to Covesea Lighthouse and is the place for sunsets.",
      "It's one of the easiest Scottish surf trips — a real town with hotels, cafés and ice cream right behind the beach, so it suits families and weekenders as much as surfers."
    ],
    suits: ["Beginners and families", "Weekend trips without remote driving", "Intermediates on bigger swells"],
    notFor: ["High-performance waves — other Moray breaks do that better", "Lifeguarded swimming"],
    surf: {
      text: [
        "East Beach works on north to north-east swell; southerly winds are offshore. It's sand, and surfable on all tides, but the river mouth and breakwater create currents — stay clear of them.",
        "Winter and spring are the most reliable; summer is often small but good for lessons."
      ],
      cards: [
        { label: "Level", title: "Beginners to intermediates", text: "Forgiving sand-bottom waves most days." },
        { label: "Hazards", title: "River-mouth currents", text: "Keep away from the river and breakwater." },
        { label: "Crowds", title: "Usually manageable", text: "The beach can be busy with visitors even when the line-up isn't." }
      ]
    },
    lessons: {
      providers: [
        { name: "New Wave Surf School", type: "Surf school & hire, East Beach", url: "https://www.newwavesurf.com/", note: "Based at East Beach with a surf hut, changing rooms and board store. Lessons and hire — check the timetable." }
      ],
      text: ["SurfABLE runs adaptive surfing sessions in the wider Moray area."]
    },
    practical: [
      { label: "Parking", title: "Gregory Place", text: "Known as East Beach car park, by the footbridge. Lossiemouth's tourism site lists it as free." },
      { label: "Access", title: "Over the footbridge", text: "A few minutes across the bridge to the sand. The approach is far easier than a dune-only beach; soft sand beyond." },
      { label: "Facilities", title: "Toilets in town", text: "Moray Council public toilets are close to East Beach. New Wave has changing rooms for customers." },
      { label: "Lifeguards", title: "None", text: "Call 999 or 112 and ask for the Coastguard in an emergency." },
      { label: "Water quality", title: "SEPA", text: "Check SEPA bathing-water information if you're concerned after heavy rain." }
    ],
    stay: {
      intro: "Lossiemouth itself is the best base — you get two beaches and no commute.",
      areas: [
        { label: "Surf-first", title: "East Beach and Seatown", text: "Closest to the footbridge and surf school." },
        { label: "Harbour and Stotfield", text: "Restaurants, West Beach and views.", title: "West of town" }
      ],
      picks: [
        { name: "Firth Hotel & Restaurant", type: "Hotel", url: "https://www.fhlossie.com/", note: "The most East Beach-oriented hotel in town. Researched listing." },
        { name: "Silver Sands Holiday Park", type: "Holiday park", note: "Family holiday park west of town. Researched listing." }
      ]
    },
    food: {
      places: [
        { name: "Harbour Lights", type: "Café, harbour", note: "Breakfast and coffee by the marina." },
        { name: "The Salt Cellar", type: "Café-restaurant", note: "Suggested by local tourism after a morning at East Beach." },
        { name: "Firth Hotel", type: "Hotel restaurant", url: "https://www.fhlossie.com/", note: "Convenient after a surf." }
      ]
    },
    todo: [
      { label: "Sunset", title: "West Beach and Covesea Lighthouse", text: "Lossiemouth's sunset beach — also promoted for Northern Lights viewing." },
      { label: "Museum", title: "Fisheries & Community Museum", text: "Local fishing heritage by the harbour." },
      { label: "Wildlife", title: "Dolphins", text: "The Moray Firth is known for bottlenose dolphins." },
      { label: "Day trip", title: "Elgin and Duffus Castle", text: "Cathedral town 10–15 minutes away; motte-and-bailey castle nearby." }
    ],
    travel: [
      { label: "By car", title: "A941 from Elgin", text: "About 10–15 minutes from Elgin." },
      { label: "Rail", title: "Elgin station", text: "On the Aberdeen–Inverness line; buses connect to Lossiemouth." }
    ],
    nearby: [
      { name: "Fraserburgh", href: "/guides/surfing-fraserburgh/", text: "Aberdeenshire's long beach and harbour point." },
      { name: "Scotland surf guide", href: "/guides/scotland/", text: "Every Scottish beach on Surfbooker." }
    ],
    faqs: [
      { q: "Is Lossiemouth good for beginners?", a: "Yes — East Beach is one of the best beginner beaches in Moray, especially with New Wave Surf School. There are no lifeguards." },
      { q: "Where do you park for East Beach?", a: "Gregory Place, by the footbridge — listed as free by local tourism." },
      { q: "Which beach is best for sunset?", a: "West Beach, with Covesea Lighthouse in view." }
    ],
    sources: [
      { label: "New Wave Surf School", url: "https://www.newwavesurf.com/" },
      { label: "Lossiemouth — beaches", url: "https://www.lossiemouth.org/inspire/beaches/" },
      { label: "Lossiemouth — where to stay", url: "https://www.lossiemouth.org/stay/" },
      { label: "Visit Moray Speyside — Lossiemouth", url: "https://morayspeyside.com/location/lossiemouth/" },
      { label: "Moray Council — public toilets", url: "https://www.moray.gov.uk/roads-and-transport/street-cleaning/public-toilets/" }
    ],
    editorial: scotEditorial
  }),

  base("machrihanish", {
    name: "Machrihanish",
    area: "Kintyre, Argyll",
    geo: [55.4320, -5.7300],
    title: "Machrihanish Surf Guide: Westport, Parking, Lessons & Stays | Surfbooker",
    description: "Surfing Machrihanish and Westport on the Kintyre peninsula: swell and wind, free council parking, 24-hour toilets, Pete's Surf School at Westport, the Ugadale Hotel and Campbeltown.",
    heroIntro: "Miles of Atlantic-facing sand on the Kintyre peninsula, with a village and golf links at the south end and Westport's surf school at the north.",
    heroAlt: "Machrihanish Bay beach stretching north towards Westport",
    images: { hero: lic("machrihanish") },
    glance: [
      ["Best for", "Intermediates; beginners at Westport"],
      ["Break", "Beach, point and rivermouth"],
      ["Lifeguards", "None — unlifeguarded"],
      ["Parking", "Free council car parks"],
      ["Toilets", "Open 24 hours, all year"],
      ["Best season", "Autumn (September–November)"]
    ],
    overview: [
      "Machrihanish Bay is a long sweep of sand on the west coast of Kintyre, with Machrihanish village and its famous golf links at the southern end and Westport at the northern end. Behind it, Campbeltown is 15 minutes away.",
      "It looks straight at the Atlantic, but Islay and Ireland block a lot of swell, so it needs the right angle — usually a clean westerly groundswell. When that arrives it can be excellent; when it misses, it's flat. Checking both Machrihanish and Westport is the local habit."
    ],
    suits: ["Intermediates on a west swell", "Beginners in a lesson at Westport", "Surf-and-golf weekends"],
    notFor: ["Guaranteed surf — it's fickle", "Lifeguarded swimming"],
    surf: {
      text: [
        "West swell is the key; west to north-west works. East to east-south-east winds are offshore. Mid tide, especially a rising tide, is the most-cited window, though the beach can work across more of the tide.",
        "Autumn is the best time to target, especially September to November."
      ],
      cards: [
        { label: "Level", title: "Intermediates", text: "Competent beginners on small days; the point suits experienced surfers." },
        { label: "Hazards", title: "Rips and isolation", text: "Strong currents, rocky outcrops and long empty stretches of beach. Surf with someone." },
        { label: "Crowds", title: "Room to spread out", text: "The beach is vast; the point gets busier." }
      ]
    },
    lessons: {
      providers: [
        { name: "Pete's Surf School & Hire", type: "Surf school & hire, Westport Beach", note: "Lessons and board/wetsuit hire at Westport, a short drive north. Check current contact details and seasonal hours before travelling." }
      ]
    },
    practical: [
      { label: "Parking", title: "Machrihanish village", text: "Council car park opposite the Old Post Office on the B843 (PA28 6PZ), 20 spaces — free." },
      { label: "Parking", title: "Westport", text: "Westport Beach car park on the A83 (PA28 6QD), 70 spaces — free." },
      { label: "Toilets", title: "Open 24 hours", text: "Argyll and Bute Council lists the Machrihanish public toilets as open 24 hours, all year." },
      { label: "Lifeguards", title: "None", text: "Neither Machrihanish nor Westport is lifeguarded. Call 999 or 112 and ask for the Coastguard." },
      { label: "Check first", title: "Swell angle and A83", text: "Big Atlantic swell can still be the wrong direction here. Check the A83 road status too." }
    ],
    stay: {
      areas: [
        { label: "Village", title: "Machrihanish", text: "Beach and golf atmosphere — good for a surf/golf weekend." },
        { label: "Town", title: "Campbeltown", text: "Supermarkets, restaurants and more accommodation, 15 minutes away." }
      ],
      picks: [
        { name: "The Ugadale Hotel & Cottages", type: "Hotel and self-catering", url: "https://machrihanishdunes.com/stay/", note: "Hotel with Atlantic views and two-bedroom cottages in Machrihanish. Researched listing." },
        { name: "The Royal Hotel, Campbeltown", type: "Hotel", url: "https://machrihanishdunes.com/stay/", note: "Town-centre alternative from the same resort group. Researched listing." }
      ]
    },
    food: {
      text: ["The Machrihanish Dunes resort runs restaurants and a pub in the village; Campbeltown has the widest choice. Don't count on a beach café at Westport — bring food."]
    },
    todo: [
      { label: "Golf", title: "Machrihanish links", text: "Historic links courses beside the beach." },
      { label: "Whisky", title: "Campbeltown distilleries", text: "One of Scotland's whisky regions — tours for adults." },
      { label: "Viewpoint", title: "Mull of Kintyre", text: "The peninsula's southern tip, looking towards Ireland." },
      { label: "Walk", title: "Kintyre Way", text: "Long-distance route with sections near the bay." }
    ],
    travel: [
      { label: "By car", title: "A83 via Inveraray", text: "Around three and a half to four hours from Glasgow." },
      { label: "Air", title: "Campbeltown airport", text: "Flights from Glasgow land right next to Machrihanish." },
      { label: "Ferry", title: "Seasonal links", text: "Check current CalMac services if combining with Arran or Islay." }
    ],
    nearby: [
      { name: "Balevullin, Tiree", href: "/guides/surfing-balevullin-tiree/", text: "Island surf with an on-beach school." },
      { name: "Scotland surf guide", href: "/guides/scotland/", text: "Every Scottish beach on Surfbooker." }
    ],
    faqs: [
      { q: "Why is Machrihanish flat when the Atlantic is big?", a: "Islay and Ireland block a lot of swell. It needs a clean westerly groundswell; check Westport as well before giving up." },
      { q: "Is parking free?", a: "Argyll and Bute Council lists both the Machrihanish village and Westport car parks as free." },
      { q: "Where can beginners surf?", a: "Westport, with Pete's Surf School & Hire choosing the safest part of the beach." }
    ],
    sources: [
      { label: "Argyll and Bute Council — car parks (Mid Argyll, Kintyre and Islay)", url: "https://www.argyll-bute.gov.uk/roads-and-travel/car-parks-and-parking/car-parks-mid-argyll-kintyre-and-islay" },
      { label: "Argyll and Bute Council — public toilets", url: "https://www.argyll-bute.gov.uk/my-community/public-toilets-argyll-and-bute" },
      { label: "Machrihanish Dunes — stay", url: "https://machrihanishdunes.com/stay/" },
      { label: "Wild About Argyll — Ugadale Hotel and Cottages", url: "https://www.wildaboutargyll.co.uk/accommodation-listings/ugadale-hotel-and-cottages/" },
      RNLI
    ],
    editorial: scotEditorial
  }),

  base("melvich", {
    name: "Melvich",
    fullName: "Melvich Bay",
    area: "Sutherland, north coast",
    geo: [58.5600, -3.9200],
    title: "Melvich Surf Guide: River-Mouth Waves, Parking & the Halladale Inn | Surfbooker",
    description: "Melvich Bay on Scotland's north coast: a quiet river-mouth beach break for intermediates. Parking, toilets, no lifeguards, hire from North Coast Watersports and food at the Halladale Inn.",
    heroIntro: "A quiet north-coast bay where the Halladale River meets the sea, with long waves over a river-fed sandbar for intermediates — and very little else around.",
    heroAlt: "Melvich Bay with the Halladale River and dunes on Scotland's north coast",
    images: { hero: lic("melvich") },
    glance: [
      ["Best for", "Intermediate surfers"],
      ["Break", "River-mouth beach break"],
      ["Lifeguards", "None — unlifeguarded"],
      ["Parking", "Melvich Beach car park"],
      ["Toilets", "Public toilets in Melvich"],
      ["Lessons", "None on site — Dunnet is 45–55 min"]
    ],
    overview: [
      "Melvich Bay sits where the Halladale River reaches the north coast, with dunes behind and the village on the hill above. It's a stop on the North Coast 500, but most of the year it's very quiet.",
      "The river feeds a sandbar that can produce long, good-quality waves. That same river creates currents that change with rainfall and tide, so it's a beach for confident intermediates rather than first-timers."
    ],
    suits: ["Intermediates wanting quiet waves", "NC500 road-trippers with their own boards"],
    notFor: ["Complete beginners", "Anyone needing showers, shops or lifeguards"],
    surf: {
      text: [
        "North-west to north swell works best, and bigger swells may be needed to wrap fully into the bay. Southerly winds are offshore. It works through the tide, with the river bank often better on a rising-to-high tide.",
        "Autumn is a strong time to go; winter brings storms and short daylight."
      ],
      cards: [
        { label: "Level", title: "Intermediates", text: "Confident beginners only on small, clean days." },
        { label: "Hazards", title: "River currents", text: "The river-mouth current changes with rain and tide. Look before you paddle out." },
        { label: "Crowds", title: "Quiet", text: "Busier in NC500 season, but rarely crowded." }
      ]
    },
    lessons: {
      providers: [
        { ...NCW, note: "No surf school is based at Melvich. North Coast Watersports at Dunnet hires boards and 5/4 wetsuits and runs guided trips; lessons at Strathy or Farr can be arranged on demand." }
      ],
      note: "There's no surf shop at Melvich — bring spare fins and a leash."
    },
    practical: [
      { label: "Parking", title: "Melvich Beach car park", text: "Public parking behind the dunes, a few minutes' walk from the sand. Check signs for current charges and overnight rules." },
      { label: "Toilets", title: "Public toilets", text: "Highland Council lists public toilets at Melvich. No public showers." },
      { label: "Lifeguards", title: "None", text: "Call 999 or 112 and ask for the Coastguard in an emergency." },
      { label: "Access", title: "Dunes and sand", text: "The path from the caravan park is steeper; wheelchair access to the beach is difficult." },
      { label: "Check first", title: "Recent rain", text: "Heavy rain changes the river flow and the bank." }
    ],
    stay: {
      areas: [
        { label: "Local", title: "Melvich", text: "Stay locally for early and late sessions without NC500 driving." },
        { label: "Further", title: "Bettyhill or Thurso", text: "More services, but you'll drive to surf." }
      ],
      picks: [
        { name: "The Halladale Inn & North Coast Touring Park", type: "Inn, camping, pods and bunkhouse", url: "https://thehalladaleinn.co.uk/", note: "Food, bar, camping, motorhome pitches and glamping pods in Melvich. Researched listing." }
      ]
    },
    food: {
      places: [
        { name: "The Halladale Inn", type: "Inn", url: "https://thehalladaleinn.co.uk/food-menu-restaurant-bar/", note: "Breakfast, lunch, dinner and a bar during its food season — the obvious local stop." }
      ],
      note: "Outside the inn's season, food is sparse — plan ahead or drive to Thurso or Bettyhill."
    },
    todo: [
      { label: "Viewpoint", title: "Strathy Point", text: "Lighthouse headland a short drive west." },
      { label: "Museum", title: "Strathnaver Museum, Bettyhill", text: "The story of the Highland Clearances in Strathnaver." },
      { label: "Beach", title: "Farr Bay", text: "Another beautiful north-coast bay near Bettyhill." }
    ],
    travel: [
      { label: "By car", title: "A836 / NC500", text: "About 35–45 minutes west of Thurso." },
      { label: "Rail", title: "Forsinard", text: "The Far North Line stops at Forsinard, inland up the Halladale valley." }
    ],
    nearby: [
      { name: "Dunnet Bay", href: "/guides/surfing-dunnet-bay/", distance: "About 45–55 minutes", text: "Lessons and hire, and the north coast's best learning beach." },
      { name: "Thurso Beach", href: "/guides/surfing-thurso-beach/", distance: "About 35–45 minutes", text: "Town beach break." },
      { name: "Thurso East", href: "/guides/surfing-thurso-east/", text: "The famous reef — experienced surfers only." }
    ],
    faqs: [
      { q: "Is Melvich good for beginners?", a: "Not really — the river-mouth currents make it better for intermediates. Beginners should book a lesson at Dunnet Bay." },
      { q: "Where can I hire a board near Melvich?", a: "North Coast Watersports in Dunnet hires boards and wetsuits." },
      { q: "Is there food at Melvich?", a: "The Halladale Inn serves food in season. Outside that, plan ahead." }
    ],
    sources: [
      { label: "North Coast Watersports", url: "https://www.northcoastwatersports.com/" },
      { label: "The Halladale Inn", url: "https://thehalladaleinn.co.uk/" },
      RNLI
    ],
    editorial: scotEditorial
  }),

  base("pease-bay", {
    name: "Pease Bay",
    area: "Cockburnspath, Scottish Borders",
    geo: [55.9330, -2.3350],
    title: "Pease Bay Surf Guide: Waves, Parking, Lessons Nearby & Where to Stay | Surfbooker",
    description: "Pease Bay near Cockburnspath: one of south-east Scotland's best beach breaks for intermediates. Holiday-park access and parking, no lifeguards, lessons at Belhaven or Coldingham, and Siccar Point.",
    heroIntro: "A compact, steep-sided bay with red-rock headlands and a holiday park behind the sand — and some of the most defined beach-break peaks on Scotland's east coast.",
    heroAlt: "Pease Bay with its sandy beach, holiday park and red sandstone headlands",
    images: { hero: lic("pease-bay") },
    glance: [
      ["Best for", "Intermediates and experienced surfers"],
      ["Break", "Beach break with rocky ends"],
      ["Lifeguards", "None — unlifeguarded"],
      ["Access", "Through Pease Bay Holiday Park"],
      ["Lessons", "Nearby at Belhaven or Coldingham"],
      ["Nearby", "Siccar Point geology"]
    ],
    overview: [
      "Pease Bay is a small, enclosed bay just off the A1 near Cockburnspath. A holiday park fills the valley behind the beach, and red Devonian sandstone headlands close the bay at each end.",
      "It's more surf-focused than broad Belhaven, with several defined peaks and rock at either end. That makes it good for intermediates on a clean swell — and means it can feel busy, because everyone sits on the same few peaks."
    ],
    suits: ["Intermediates on a north-east swell", "Surf-first family stays at the holiday park", "Geology walkers"],
    notFor: ["First lessons — go to Belhaven or Coldingham", "Space to spread out on a good day"],
    surf: {
      text: [
        "North-east swell is the key direction. South-west winds are offshore. It can work through the tide, so check where the bank is rather than chasing a fixed time.",
        "Autumn to spring is the North Sea surf season, with winter usually the most dependable."
      ],
      cards: [
        { label: "Level", title: "Intermediate+", text: "Beginners only on small days; lessons are better elsewhere." },
        { label: "Hazards", title: "Rocks, rips, crowd", text: "Rocky ends, rip currents, close-packed peaks and cliffs that can be unstable after heavy rain." },
        { label: "Etiquette", title: "Wait your turn", text: "The line-up is compact — no snaking or back-paddling, and give learners room." }
      ]
    },
    lessons: {
      providers: [
        { name: "Coast to Coast Surf School", type: "Surf school, Belhaven (20–25 min)", url: "https://c2csurfschool.com/", note: "Beginner lessons from age 7 at Belhaven Bay." },
        { name: "St Vedas Surf School", type: "Surf school, Coldingham (15–20 min)", url: "https://www.stvedas.co.uk/", note: "Lessons and hire at Coldingham Bay." }
      ],
      text: ["No surf school is based at Pease Bay, and the holiday park isn't a surf-hire centre — collect boards from one of the schools nearby."]
    },
    practical: [
      { label: "Parking", title: "Holiday-park visitor car park", text: "Use the car park just inside the entrance to Pease Bay Holiday Park, on the right, and follow park signs. No reliable public day-parking price was found — check on arrival." },
      { label: "Access", title: "Through the park", text: "A short walk through the park to the sand. Don't cut across private pitches." },
      { label: "Facilities", title: "Toilets", text: "Toilets at the holiday park. Guest showers aren't automatically open to day visitors." },
      { label: "Lifeguards", title: "None", text: "Pease Bay isn't on the RNLI lifeguarded list. Call 999 or 112 and ask for the Coastguard." },
      { label: "Cliffs", title: "After heavy rain", text: "Stay away from the bottom of the cliffs after heavy rain or frost." }
    ],
    stay: {
      areas: [
        { label: "On the beach", title: "Pease Bay Holiday Park", text: "Holiday homes and caravans with a bar, shop and play area — the obvious family surf base." },
        { label: "Town", title: "Dunbar", text: "Hotels, restaurants and a railway station, 20–25 minutes away." }
      ],
      picks: [
        { name: "Pease Bay Holiday Park", type: "Holiday park (Verdant Leisure)", url: "https://www.verdantleisure.co.uk/south-east-scotland/berwickshire/pease-bay/", note: "Open year-round, with holiday homes behind the beach. Researched listing." }
      ]
    },
    food: {
      places: [
        { name: "Smugglers Bar", type: "Bar, in the holiday park", url: "https://www.verdantleisure.co.uk/south-east-scotland/berwickshire/pease-bay/", note: "The convenient on-site option, with a dog-friendly area. Check current hours." }
      ],
      text: ["Dunbar and Coldingham have more choice."]
    },
    todo: [
      { label: "Geology", title: "Siccar Point", text: "Where James Hutton's unconformity helped found modern geology — a short drive and walk." },
      { label: "Walk", title: "Berwickshire coast", text: "Coastal routes towards Cove; take care on cliffs." },
      { label: "Heritage", title: "St Helen's Church", text: "Ruined church on the cliffs near Siccar Point." }
    ],
    travel: [
      { label: "By car", title: "A1 at Cockburnspath", text: "Pease Bay is signed off the A1 between Dunbar and Berwick." }
    ],
    nearby: [
      { name: "Coldingham Bay", href: "/guides/surfing-coldingham-bay/", distance: "About 15–20 minutes", text: "Surf school, shop and seasonal lifeguards." },
      { name: "Belhaven Bay", href: "/guides/surfing-belhaven-bay/", distance: "About 20–25 minutes", text: "Wide, forgiving bay for learners." }
    ],
    faqs: [
      { q: "Is Pease Bay good for beginners?", a: "Only on small days. Beginners are better off with a lesson at Belhaven or Coldingham." },
      { q: "Where do you park at Pease Bay?", a: "In the visitor car park just inside the holiday park entrance. Check signs for any charge." },
      { q: "Is Pease Bay lifeguarded?", a: "No." }
    ],
    sources: [
      { label: "Pease Bay Holiday Park (Verdant Leisure)", url: "https://www.verdantleisure.co.uk/south-east-scotland/berwickshire/pease-bay/" },
      { label: "Berwickshire Rocks — Pease Bay geology leaflet (PDF)", url: "https://berwickshirerocks.org.uk/pdf/Pease%20Bay.pdf" },
      { label: "Coast to Coast Surf School", url: "https://c2csurfschool.com/" },
      { label: "St Vedas Surf School", url: "https://www.stvedas.co.uk/" },
      RNLI
    ],
    editorial: scotEditorial
  }),

  base("thurso-beach", {
    name: "Thurso Beach",
    area: "Thurso, Caithness",
    geo: [58.5960, -3.5250],
    title: "Thurso Beach Surf Guide: Town Beach, Parking, Food & Stays | Surfbooker",
    description: "Thurso's town beach: a sandy beach break below the promenade, a gentler alternative to Thurso East. Parking, seasonal toilets, no lifeguards, lessons at Dunnet, and where to eat and stay.",
    heroIntro: "Thurso's sandy town beach, right below the promenade — a much gentler option than the famous reef round the corner, with the town's cafés and hotels behind you.",
    heroAlt: "Thurso Beach and promenade with the town behind",
    images: {
      hero: lic("thurso-beach"),
      feature: { path: lic("thurso-east"), alt: "Thurso's beach and seafront", caption: "Thurso's seafront — the promenade runs right behind the sand.", heading: "A beach in the middle of town", text: "Stay in Thurso and you can check the town beach, Thurso East and the wind from the seafront before deciding where to go." }
    },
    glance: [
      ["Best for", "Intermediates and improvers"],
      ["Break", "Sandy beach break"],
      ["Lifeguards", "None — unlifeguarded"],
      ["Parking", "Pentland Crescent area"],
      ["Toilets", "Thurso Harbour (closed in winter)"],
      ["Lessons", "At Dunnet Bay, 15 minutes"]
    ],
    overview: [
      "Thurso Beach is the sandy beach in front of the town, backed by the promenade. On a clean north or north-west swell it produces lefts and rights over sand — fun, and far less consequential than the shallow slab at Thurso East.",
      "It's rarely the reason surfers travel to Thurso, but it's a useful beach, and the promenade is good for families and non-surfers. For first lessons, Dunnet Bay is the better choice."
    ],
    suits: ["Intermediates and improvers", "Families using the promenade", "Surfers basing themselves in town"],
    notFor: ["First-ever lessons", "Lifeguarded swimming"],
    surf: {
      text: [
        "North-west swell is ideal; north and north-east can also work. Southerly winds are offshore. It works through most of the tide — the banks decide.",
        "Winter is the most consistent season for clean surf."
      ],
      cards: [
        { label: "Level", title: "Improvers to intermediates", text: "Competent beginners on small clean days." },
        { label: "Hazards", title: "Rips and cold", text: "Currents, rocky edges, cold water and fast-changing weather." }
      ]
    },
    lessons: {
      providers: [
        { ...NCW, note: "Regular lessons run at Dunnet Beach, about 15 minutes east, not at Thurso Beach. Hires 5/4 wetsuits, foam boards and hardboards." }
      ]
    },
    practical: [
      { label: "Parking", title: "Near the beach", text: "Parking around Pentland Crescent and near the Salvation Army hall. Check signs and don't block residential or harbour access." },
      { label: "Toilets", title: "Thurso Harbour", text: "Highland Council lists toilets with disabled access and baby changing at the harbour — closed in winter." },
      { label: "Lifeguards", title: "None", text: "Thurso isn't on the RNLI's list of Scottish lifeguarded beaches." },
      { label: "Access", title: "Promenade", text: "The promenade suits pushchairs and there's a ramp at the western end, but getting onto the sand isn't fully wheelchair-friendly." }
    ],
    stay: {
      intro: "Stay in town — you can walk to food and check several breaks in minutes.",
      picks: [
        { name: "Pentland Hotel", type: "Hotel, town centre", url: "https://www.pentlandhotel.co.uk/", note: "Central and family-friendly. Researched listing." },
        { name: "The Park Hotel", type: "Hotel", url: "https://www.parkhotelthurso.co.uk/bar-and-restaurant-thurso/", note: "Town hotel with a bar and restaurant. Researched listing." },
        { name: "Forss House", type: "Country-house hotel", url: "https://www.forsshousehotel.co.uk/", note: "Higher-end option west of town. Researched listing." }
      ]
    },
    food: {
      places: [
        { name: "Caffe Cardosi", type: "Café", url: "https://www.thursocdt.co.uk/caffe-cardosi", note: "Independent café in the centre — check opening days." },
        { name: "The Park Hotel", type: "Bar and restaurant", url: "https://www.parkhotelthurso.co.uk/bar-and-restaurant-thurso/", note: "Pub-style food." },
        { name: "Bydand", type: "Restaurant", url: "https://bydandthurso.com/", note: "Locally sourced dinner — book ahead." }
      ]
    },
    todo: [
      { label: "Walk", title: "Victoria Walk and the riverside", text: "From the harbour past the beach towards Thurso Castle ruins." },
      { label: "Nature", title: "RSPB Dunnet Head", text: "Seabird cliffs with an all-abilities path to the viewpoints.", href: "https://www.rspb.org.uk/days-out/reserves/dunnet-head" },
      { label: "Whisky", title: "Wolfburn Distillery", text: "Bookable tours — a good flat-day option for adults." },
      { label: "Heritage", title: "Castle & Gardens of Mey", text: "Seasonal opening, with an animal centre for children." }
    ],
    travel: [
      { label: "Rail", title: "Far North Line", text: "Trains from Inverness to Thurso." },
      { label: "Ferry", title: "Scrabster", text: "Ferries to Orkney sail from Scrabster, next to Thurso." }
    ],
    nearby: [
      { name: "Thurso East", href: "/guides/surfing-thurso-east/", distance: "Minutes away", text: "World-class reef — experienced surfers only." },
      { name: "Dunnet Bay", href: "/guides/surfing-dunnet-bay/", distance: "About 15 minutes", text: "Lessons, hire and the best beginner beach nearby." },
      { name: "Melvich", href: "/guides/surfing-melvich/", distance: "About 35–45 minutes", text: "Quiet river-mouth bay to the west." }
    ],
    faqs: [
      { q: "Is Thurso Beach the same as Thurso East?", a: "No. Thurso Beach is the sandy town beach; Thurso East is the shallow reef on the other side of the river, for experienced surfers only." },
      { q: "Can I learn to surf at Thurso?", a: "Book a lesson at Dunnet Bay, 15 minutes away, where North Coast Watersports teaches." },
      { q: "Are there toilets?", a: "Yes, at Thurso Harbour — but they close for winter." }
    ],
    sources: [
      { label: "Highland Council — Thurso Harbour toilets", url: "https://www.highland.gov.uk/directory-record/11746/thurso-harbour" },
      { label: "North Coast Watersports", url: "https://www.northcoastwatersports.com/" },
      { label: "Caffe Cardosi (Thurso Community Development Trust)", url: "https://www.thursocdt.co.uk/caffe-cardosi" },
      { label: "Wolfburn Distillery", url: "https://wolfburn.com/" },
      { label: "Castle of Mey", url: "https://www.castleofmey.org.uk/" },
      RNLI
    ],
    editorial: scotEditorial
  }),

  base("thurso-east", {
    name: "Thurso East",
    area: "Thurso, Caithness",
    geo: [58.5960, -3.5050],
    title: "Thurso East Surf Guide: Reef, Conditions, Access & Where to Stay | Surfbooker",
    description: "Thurso East: one of Europe's best cold-water reef waves, for experienced surfers only. Swell, wind and tide, the shallow slab reef, access, no lifeguards, and where to stay in Thurso.",
    heroIntro: "A powerful right-hand reef break over flat slab stone at the mouth of the River Thurso — one of Europe's great cold-water waves, and strictly for experienced reef surfers.",
    images: { hero: "guides/_licensed-images/uk-destinations/thurso-east.jpg" },
    heroAlt: "Thurso, Caithness",
    glance: [
      ["Best for", "Advanced and expert surfers"],
      ["Break", "Right-hand reef over slab stone"],
      ["Lifeguards", "None — unlifeguarded"],
      ["Season", "September to February"],
      ["Crowds", "Busy whenever it breaks"],
      ["Lessons", "No — learn at Dunnet Bay"]
    ],
    overview: [
      "Thurso East breaks on the east side of the River Thurso, below the ruins of Thurso Castle. A north or north-west groundswell wraps onto a shelf of flat slab stone and kelp and peels right — long, powerful and, on the right swell, hollow.",
      "It's a destination wave and should be approached that way: a shallow reef, a small take-off zone and a dedicated local crowd. Good reef experience is essential. Families and learners should head to Thurso Beach or Dunnet Bay instead."
    ],
    suits: ["Advanced and expert surfers with reef experience", "Strong intermediates on smaller days"],
    notFor: ["Beginners or improvers", "Children or swimming"],
    surf: {
      text: [
        "A north to north-west swell is essential; west-north-west can make it especially hollow, while more north gives a more tapered wall. Pure west swell often needs some north to wrap in. South to south-east winds are offshore, though strong south-westerlies can chop up the face.",
        "It breaks through much of the tide, with the rising tide around mid the key window. September to February is the core season."
      ],
      cards: [
        { label: "Level", title: "Advanced / expert", text: "Reef experience essential." },
        { label: "Hazards", title: "Shallow slab reef", text: "Wipeouts over rock, powerful hollow waves, river currents, cold water and short winter days." },
        { label: "Etiquette", title: "Tight take-off", text: "Even a moderate crowd feels busy. Watch where people sit and wait your turn." }
      ]
    },
    lessons: {
      providers: [
        { ...NCW, note: "Hires 5/4 wetsuits and a range of hardboards from Dunnet. Its lessons run at Dunnet Beach, not here." }
      ]
    },
    practical: [
      { label: "Access", title: "Check the current arrangement", text: "Surfers have traditionally parked respectfully by the farm on the castle side, or used town and harbour parking and paddled across the river. The farm side is private, working land — follow any signs and don't block access." },
      { label: "Toilets", title: "In town", text: "There are no facilities at the reef. Highland Council lists toilets at Thurso Harbour, closed in winter." },
      { label: "Lifeguards", title: "None", text: "Call 999 or 112 and ask for the Coastguard in an emergency." },
      { label: "Accessibility", title: "Not accessible", text: "The rocky shore isn't suitable for wheelchairs or pushchairs; watch from the town side." },
      { label: "Before you paddle out", title: "Watch first", text: "Watch several sets from the shore to see how the wave draws off the slab and how the current returns you to the peak." }
    ],
    stay: {
      intro: "Stay in Thurso town. You can see the break, walk to food, and switch quickly to Dunnet or other spots if the East isn't working.",
      picks: [
        { name: "Pentland Hotel", type: "Hotel, town centre", url: "https://www.pentlandhotel.co.uk/", note: "Researched listing." },
        { name: "The Park Hotel", type: "Hotel", url: "https://www.parkhotelthurso.co.uk/bar-and-restaurant-thurso/", note: "Researched listing." },
        { name: "Forss House", type: "Country-house hotel", url: "https://www.forsshousehotel.co.uk/", note: "West of town. Researched listing." }
      ],
      text: ["For longer stays, self-catering with somewhere to dry wetsuits is often more practical than a hotel room."]
    },
    food: {
      text: ["Food is in Thurso town, not at the reef — Caffe Cardosi for coffee, The Park Hotel for pub food and Bydand for a booked dinner. See the Thurso Beach guide for details."]
    },
    todo: [
      { label: "Heritage", title: "Thurso Castle ruins", text: "Frame the break — view from the shore without blocking farm access." },
      { label: "Nature", title: "RSPB Dunnet Head", text: "Seabird cliffs on the most northerly point of mainland Britain." },
      { label: "Whisky", title: "Wolfburn Distillery", text: "Bookable tours." }
    ],
    travel: [
      { label: "Rail", title: "Far North Line", text: "Trains from Inverness to Thurso." },
      { label: "By car", title: "A9 / NC500", text: "Thurso is at the top of the A9." }
    ],
    nearby: [
      { name: "Thurso Beach", href: "/guides/surfing-thurso-beach/", distance: "Minutes away", text: "The sandy town beach — gentler waves." },
      { name: "Dunnet Bay", href: "/guides/surfing-dunnet-bay/", distance: "About 15 minutes", text: "Beach break with lessons and hire." },
      { name: "Melvich", href: "/guides/surfing-melvich/", text: "River-mouth bay to the west." }
    ],
    faqs: [
      { q: "Can beginners surf Thurso East?", a: "No. It's a shallow, powerful reef for experienced surfers. Learn at Dunnet Bay." },
      { q: "When is the best time to surf Thurso East?", a: "September to February, on a north or north-west groundswell with southerly winds." },
      { q: "Where do you park for Thurso East?", a: "Access has traditionally been from the farm side or from town via the river. It's private land — follow current signs." }
    ],
    sources: [
      { label: "Surfline — Thurso East spot guide", url: "https://www.surfline.com/surf-report/thurso-east/5842041f4e65fad6a7708caf/spot-guide" },
      { label: "Surf-Forecast — Thurso East", url: "https://www.surf-forecast.com/breaks/Thurso-East" },
      { label: "Highland Council — Thurso Harbour toilets", url: "https://www.highland.gov.uk/directory-record/11746/thurso-harbour" },
      { label: "North Coast Watersports — equipment page", url: "https://www.northcoastwatersports.com/equipment-hire" },
      RNLI
    ],
    editorial: scotEditorial
  }),
];

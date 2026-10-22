// Wales destination guides. Content researched October 2026 from the sources listed per guide.
// Markup allowed in strings: **bold** and [label](url).
const lic = (slug) => `guides/_licensed-images/uk-destinations/${slug}.jpg`;

export const destinations = [
  {
    slug: "broad-haven",
    name: "Broad Haven",
    fullName: "Broad Haven (North)",
    region: "wales",
    subRegion: "pembrokeshire",
    area: "St Brides Bay, Pembrokeshire",
    path: "/guides/surfing-broad-haven/",
    outFile: "guides/surfing-broad-haven/index.html",
    geo: [51.7816, -5.1036],
    title: "Broad Haven Beach Guide: Surf, Parking, Dogs & Where to Stay | Surfbooker",
    description: "Broad Haven in Pembrokeshire: a family-friendly village beach on St Brides Bay. Surf conditions, parking, dog rules, lifeguards, food, places to stay and nearby beaches.",
    heroIntro: "A sandy village beach on St Brides Bay with cafés, a pub and a surf shop on the seafront — the easy, family-friendly alternative to Newgale.",
    heroAlt: "Broad Haven beach at low tide in soft evening light, with the headland of St Brides Bay behind",
    images: { hero: lic("broad-haven"), heroPosition: "50% 55%" },
    glance: [
      ["Best for", "Families, beginners on small days, mixed groups"],
      ["Break", "West-facing beach break, more sheltered than Newgale"],
      ["Lifeguards", "Seasonal (check RNLI dates)"],
      ["Dogs", "Restricted on the northern part, 1 May–30 Sep"],
      ["Parking", "Two car parks with seasonal charges"],
      ["Facilities", "Toilets, cafés, pub, surf shop, YHA"]
    ],
    overview: [
      "Broad Haven (Aberllydan in Welsh) is a small seaside village halfway down St Brides Bay, about 7 miles west of Haverfordwest. The beach runs the length of the village: at high tide it is a fairly narrow strip of sand and pebbles below the esplanade, and at low tide it opens into a wide expanse of firm sand that stretches towards the cliffs at both ends.",
      "Everything is close together — two car parks, toilets, cafés, a pub, a small shop, a surf and watersports shop and a youth hostel all sit on or just behind the seafront. That makes it one of the easiest beaches in Pembrokeshire for a mixed group or a family day where not everyone is surfing.",
      "The surf is less consistent than at exposed Newgale, a few miles north, but that same shelter makes Broad Haven friendlier on bigger days and a sensible place to learn when Newgale is too big. The cliffs here are around 300 million years old and popular with geologists — look for the rock arch known as Den's Door and the Sleek Stone at the north end."
    ],
    suits: [
      "Families who want toilets, food and the car close to the sand",
      "Beginners and improvers on small to moderate days",
      "Groups where some people surf and others walk, swim or rock-pool",
      "Anyone wanting a coast-path walk to Little Haven"
    ],
    notFor: [
      "Quiet, empty sand in peak summer — it is a popular village beach",
      "Surfers chasing the most swell — check Newgale first"
    ],
    surf: {
      intro: "A gentle, sandy beach break that needs a decent west or south-west swell to wake up.",
      text: [
        "Broad Haven sits further inside St Brides Bay than Newgale, so swell has to wrap in and arrives smaller. On average days that means softer, more manageable waves that suit beginners and longboards; on big days it can be the place that is still surfable when exposed beaches are closed out.",
        "The beach is at its best on the mid to lower tide when the sand is exposed. Light easterly winds are offshore; westerlies blow straight in."
      ],
      cards: [
        { label: "Level", title: "Beginner to intermediate", text: "Usually gentler than Newgale. Learners should still use the lifeguarded area or go with a qualified instructor." },
        { label: "Conditions", title: "Needs a solid west/south-west swell", text: "Sheltered from smaller swells. Best in light easterly winds around mid to low tide." },
        { label: "Hazards", title: "Tides around the headlands", text: "The incoming tide can cut off routes beneath the cliffs and around to Little Haven — check tide times before walking." },
        { label: "Other sports", title: "Paddleboarding, kayaking, windsurfing", text: "Calm days are good for paddlesports; windsurfers use the bay when the wind is up." }
      ]
    },
    surfbooker: { accommodation: "broad-haven", stays: ["rwts-rooms-and-resto"] },
    lessons: {
      intro: "Haven Sports on the seafront is the village's watersports shop.",
      providers: [
        { name: "Haven Sports", type: "Watersports shop", url: "https://www.coastalcottages.co.uk/pembrokeshire/towns-and-villages/broad-haven/broad-haven-guide/", note: "Seafront watersports shop that can point you to the surf schools visiting Broad Haven. Ask in store about current hire and lessons." }
      ],
      text: ["Surf schools in this part of Pembrokeshire often choose between Broad Haven and Newgale on the day depending on the swell, so check the meeting beach when you book."]
    },
    practical: [
      { label: "Parking", title: "Two car parks, seasonal charges", text: "A large car park at the northern end has toilets and a tarmac path to the beach. A smaller car park at the southern end fills quickly in summer. Charges apply in season — check the signs." },
      { label: "Toilets", title: "At both car parks", text: "Toilets with accessible facilities at both car parks; the southern block also has baby changing. Opening times are set by Pembrokeshire County Council." },
      { label: "Lifeguards", title: "Seasonal patrol", text: "Lifeguards patrol in the summer season. Check the RNLI website for this year's dates and always use the flagged areas." },
      { label: "Dogs", title: "Seasonal restriction at the north end", text: "Dogs are restricted on the northern part of the beach from 1 May to 30 September. The rest of the beach is open to dogs; follow the signs at each access point." },
      { label: "Access", title: "Slipway and ramps", text: "A concrete slipway and a northern ramp lead onto the sand, and an esplanade runs along most of the seafront — one of the more accessible beaches on this coast." },
      { label: "Safety", title: "Don't get cut off", text: "Low tide lets you walk around the headlands towards Little Haven, but the tide comes back fast. Leave plenty of margin." }
    ],
    stay: {
      intro: "Staying in the village means you can walk to the sand, the pub and the cafés.",
      areas: [
        { label: "In the village", title: "Broad Haven", text: "Self-catering lets, B&Bs, a youth hostel and nearby campsites. Rwts Rooms and Resto is a small seafront stay with its own restaurant." },
        { label: "Quieter", title: "Little Haven", text: "A tiny harbour village about a mile south with pubs right by the slipway — lovely for couples." },
        { label: "Budget & groups", title: "YHA Broad Haven", text: "A purpose-built youth hostel just back from the beach, useful for groups and families on a budget." }
      ],
      picks: [
        { name: "YHA Broad Haven", type: "Youth hostel", url: "https://www.yha.org.uk/hostel/yha-broad-haven", note: "Hostel near the beach with private rooms and dorms. Researched listing — check room types and dates with YHA." }
      ]
    },
    food: {
      intro: "The seafront has more choice than most Pembrokeshire beaches.",
      places: [
        { name: "The Galleon Inn", type: "Pub", note: "Seafront pub with a full menu; dogs welcome on the ground floor according to local listings." },
        { name: "The Ocean Cafe Bar & Restaurant", type: "Café bar", note: "Breakfast through to evening meals, tea and cakes." },
        { name: "Haven's Beach Cafe", type: "Café", url: "https://www.visitpembrokeshire.com/attraction-listing/havens-beach-cafe", note: "Beachside café listed by Visit Pembrokeshire." },
        { name: "Off The Hook Bistro", type: "Fish & chips", note: "Fish and chips in the village." },
        { name: "Rwts Rooms and Resto", type: "Restaurant with rooms", url: "/accommodation/stays/rwts-rooms-and-resto/", note: "Seafront restaurant attached to the guest rooms." }
      ]
    },
    todo: [
      { label: "Walk", title: "Coast path to Little Haven", text: "A short, steep section of the Pembrokeshire Coast Path links Broad Haven with Little Haven — or walk round on the sand at low tide if the tide allows." },
      { label: "Nature", title: "Haroldston Woods & the boardwalk", text: "A woodland circular walk and a boardwalk behind the Galleon Inn are good for wildlife and a quieter hour." },
      { label: "Views", title: "Haroldston Chins", text: "An accessible viewpoint above the bay just north of the village." },
      { label: "Geology", title: "Den's Door and the Sleek Stone", text: "Look for the sea arch and dramatically folded rocks at the northern end of the beach at low tide." }
    ],
    travel: [
      { label: "By car", title: "From Haverfordwest", text: "About 7 miles west of Haverfordwest on the B4341. Roads into the village are narrow in summer." },
      { label: "By bus", title: "Puffin Shuttle", text: "The Puffin Shuttle coastal bus stops at Broad Haven in season. Check Pembrokeshire County Council for the current timetable." },
      { label: "By train", title: "Haverfordwest", text: "The nearest station is Haverfordwest, then bus or taxi." }
    ],
    nearby: [
      { name: "Newgale", href: "/guides/surfing-newgale/", distance: "About 15 minutes' drive", text: "The most exposed beach in St Brides Bay — check here first if Broad Haven is flat." },
      { name: "Nolton Haven", href: "/guides/surfing-nolton-haven/", distance: "About 15 minutes' drive", text: "A small sandy cove with a pub between Broad Haven and Newgale." },
      { name: "Little Haven", distance: "About 1 mile", text: "A pretty harbour village with pubs and a small beach." },
      { name: "Marloes Sands", href: "/guides/surfing-marloes-sands/", distance: "About 25 minutes' drive", text: "A wild National Trust beach on the far side of the bay." }
    ],
    faqs: [
      { q: "Is Broad Haven good for beginner surfers?", a: "Often, yes. It is more sheltered than Newgale so waves are usually smaller and softer, and there is a seasonal lifeguard patrol. On bigger days, take a lesson and stay inside the flagged area." },
      { q: "Can dogs go on Broad Haven beach?", a: "Yes, except on the restricted northern section between 1 May and 30 September. Follow the signs at the access points." },
      { q: "Is Broad Haven the same as Broad Haven South?", a: "No. This is the village beach on St Brides Bay. Broad Haven South is a separate National Trust beach near Bosherston on the south coast of Pembrokeshire." },
      { q: "Where should I park?", a: "There are two car parks: a large one at the northern end and a smaller one at the southern end. Both have toilets; seasonal charges apply." },
      { q: "Can I get to Broad Haven by bus?", a: "Yes, the seasonal Puffin Shuttle coastal bus stops at Broad Haven. Check the current timetable before you travel." }
    ],
    sources: [
      { label: "Pembrokeshire Coast National Park — Broad Haven North", url: "https://www.pembrokeshirecoast.wales/things-to-do/outdoor-activities/beaches/find-a-beach/broad-haven-north/" },
      { label: "Pembrokeshire County Council — summer beach dog bans", url: "https://www.pembrokeshire.gov.uk/dog-control/summer-beach-bans" },
      { label: "Coastal Cottages — Broad Haven village guide", url: "https://www.coastalcottages.co.uk/pembrokeshire/towns-and-villages/broad-haven/broad-haven-guide/" },
      { label: "YHA Broad Haven", url: "https://www.yha.org.uk/hostel/yha-broad-haven" },
      { label: "RNLI — find a lifeguarded beach", url: "https://rnli.org/find-my-nearest/lifeguarded-beaches" }
    ]
  },
  {
    slug: "newgale",
    name: "Newgale",
    fullName: "Newgale Sands",
    region: "wales",
    subRegion: "pembrokeshire",
    area: "St Brides Bay, Pembrokeshire",
    path: "/guides/surfing-newgale/",
    outFile: "guides/surfing-newgale/index.html",
    geo: [51.8526, -5.1259],
    title: "Newgale Surf & Beach Guide: Parking, Lessons, Stays | Surfbooker",
    description: "Plan a trip to Newgale Sands in Pembrokeshire: who the surf suits, parking and facilities, dog rules, surf hire, places to stay, food and nearby beaches.",
    heroIntro: "Two miles of open sand on St Brides Bay, backed by a huge pebble bank — Pembrokeshire's most exposed and dependable surf beach.",
    heroAlt: "Wide, wet sand at Newgale Sands at low tide with the Pembrokeshire cliffs behind",
    images: { hero: lic("newgale"), heroPosition: "50% 60%" },
    glance: [
      ["Best for", "Improvers, confident beginners with a school, kitesurfers"],
      ["Break", "Exposed west-facing beach break"],
      ["Lifeguards", "Seasonal RNLI patrol (check dates)"],
      ["Dogs", "Not allowed on the central third, 1 May–30 Sep"],
      ["Parking", "Three car parks beside the beach"],
      ["Nearest town", "Haverfordwest, about 8 miles"]
    ],
    overview: [
      "Newgale is the long beach you see from the A487 as it drops down to sea level between Haverfordwest and St Davids. Nearly two miles of flat sand face west into St Brides Bay, and a high bank of rounded pebbles — thrown up by a great storm in October 1859 — separates the beach from the road, a pub, a surf shop and a scatter of campsites.",
      "Because it faces straight out to the Atlantic, Newgale usually has more swell than the more sheltered beaches further round the bay, which makes it the default surf check for this part of Pembrokeshire. The flip side is wind: on a westerly day it is blown out, while on a calm or easterly day it can be very good.",
      "There is very little village — the Duke of Edinburgh Inn, Newsurf's beachfront hire shop, a café, toilets and parking — so most people treat Newgale as a beach day and stay in Solva, St Davids, Broad Haven or one of the holiday parks nearby."
    ],
    suits: [
      "Surfers who want the most consistent beach in St Brides Bay",
      "Beginners on small days, ideally with lessons or between the flags",
      "Families who like a huge beach and simple, close-to-the-car facilities",
      "Kitesurfers and windsurfers when the wind is right"
    ],
    notFor: [
      "Sheltered paddling on a big swell day — Broad Haven or Nolton Haven are calmer",
      "Anyone wanting a village with shops and restaurants on the doorstep"
    ],
    surf: {
      intro: "A straightforward, exposed beach break that picks up almost any west or south-west swell.",
      text: [
        "Newgale faces almost due west, so it sees more of the Atlantic than any other beach in St Brides Bay. Sandbanks shift along the length of the beach; the waves are usually better defined on the lower half of the tide, and the shore break against the pebbles can be heavy at high tide.",
        "It works best with light winds from the east or north-east. Anything with west in it quickly makes the surface choppy, which is why local surfers often move to more sheltered spots when the wind is onshore."
      ],
      cards: [
        { label: "Level", title: "Small days for learners, bigger days for improvers", text: "On a small, clean day the inside whitewater is a good learning environment. When the swell builds, rips form between the banks and it becomes a beach for competent surfers only." },
        { label: "Conditions", title: "West to south-west swell, easterly wind", text: "Exposed to most swell. Offshore winds are from the east. Check a beach-level forecast and the tide before you go." },
        { label: "Hazards", title: "Rips, wind and a steep pebble bank", text: "Rip currents form between sandbanks on bigger days. Strong onshore wind is common. The pebble bank is steep — take care carrying boards." },
        { label: "Other sports", title: "Kite and windsurfing", text: "The open beach is popular with kitesurfers, windsurfers and power-kiters. Give each other space and keep away from the bathing area." }
      ]
    },
    surfbooker: { accommodation: "newgale" },
    lessons: {
      intro: "Newsurf, on the beachfront beside the Duke of Edinburgh pub, is the main place to hire boards and wetsuits.",
      providers: [
        { name: "Newsurf", type: "Surf shop & hire", url: "https://www.visitpembrokeshire.com/activity-listing/newsurf", note: "Beachfront hire and retail for surfboards, bodyboards, ocean kayaks, stand-up paddleboards and wetsuits, with hot showers and changing rooms listed. Ask them directly about current lesson availability." },
        { name: "Outer Reef Surf School", type: "Surf school", url: "https://www.outerreefsurfschool.com/surf-lessons/", note: "Pembroke-based school that lists Newgale among the beaches it teaches at depending on conditions. Children aged 7+." }
      ],
      note: "These are researched listings from public sources; Surfbooker has not reviewed them and has no partnership with them. Check opening times, prices and lesson options directly."
    },
    practical: [
      { label: "Parking", title: "Three car parks behind the beach", text: "There are three car parks alongside the beach, with disabled parking in the main car park. Charges and payment methods change — check the signs when you arrive. Postcode SA62 6AS." },
      { label: "Toilets", title: "Toilets in the middle car park", text: "Public toilets, including accessible facilities, are in the middle car park area. Hot showers are offered at Newsurf." },
      { label: "Lifeguards", title: "Seasonal RNLI cover", text: "RNLI lifeguards patrol a section of Newgale during the summer season. Swim and bodyboard between the red and yellow flags; surf between the black and white flags." },
      { label: "Dogs", title: "Seasonal ban on the central third", text: "Dogs are not allowed on the central third of the beach from 1 May to 30 September. The northern and southern ends are dog-friendly all year — follow the signs on the beach." },
      { label: "Access", title: "Over the pebble bank", text: "Reaching the sand means crossing the pebble bank, which is steep in places. The slipway area by the main car park is the easiest route with a pushchair or heavy kit." },
      { label: "Safety", title: "Tides at the north end", text: "At low tide you can walk north towards Pwll March, but the tide cuts this route off. Check tide times and allow plenty of time to get back." }
    ],
    stay: {
      intro: "Newgale itself is mostly campsites and holiday lets. For more choice, look at Solva, St Davids or Broad Haven.",
      areas: [
        { label: "On the beach", title: "Newgale campsites and lets", text: "Camping and caravan sites sit right behind the pebble bank. Wikipedia notes that pitches on the lowest ground can flood in heavy summer rain, so ask which pitch you are getting." },
        { label: "Village base", title: "Solva", text: "A small harbour village about 3 miles west with pubs, cafés and galleries. A good base for couples who want evenings out without driving far." },
        { label: "City base", title: "St Davids", text: "Britain's smallest city, about 7 miles west. Hotels, B&Bs and restaurants, and close to Whitesands for a second surf option." },
        { label: "Family base", title: "Broad Haven", text: "About 7 miles south by road. A gentler, more sheltered beach with shops and cafés — handy when Newgale is too big." }
      ]
    },
    food: {
      intro: "Food at the beach is simple. For a proper meal, Solva and St Davids have far more choice.",
      places: [
        { name: "The Duke of Edinburgh Inn", type: "Pub", note: "The beachfront pub at Newgale, next to Newsurf — the obvious place for a drink after a surf." },
        { name: "Solva harbour", type: "Village", note: "Pubs and cafés around the harbour, about 3 miles west." }
      ]
    },
    todo: [
      { label: "Walk", title: "Pembrokeshire Coast Path", text: "The National Trail runs right past Newgale. Walk north over the headland towards Solva, or south to Nolton Haven." },
      { label: "Village", title: "Solva", text: "A sheltered harbour inlet with galleries and cafés, and a short climb to the Gribin headland for views." },
      { label: "History", title: "St Davids Cathedral", text: "The medieval cathedral and the ruins of the Bishop's Palace are about 7 miles west." },
      { label: "Did you know?", title: "The Landsker line", text: "The Brandy Brook, which reaches the sea at Newgale, is traditionally seen as the line between Welsh-speaking north Pembrokeshire and English-speaking south Pembrokeshire." }
    ],
    travel: [
      { label: "By car", title: "On the A487", text: "Newgale is on the A487 between Haverfordwest (about 8 miles) and St Davids. The road runs right along the back of the beach and can close in severe storms; Pembrokeshire County Council is developing a scheme to move it inland." },
      { label: "By bus", title: "TrawsCymru T11", text: "The T11 between Haverfordwest and Fishguard via St Davids stops at Newgale. Check current timetables on Traveline Cymru." },
      { label: "By train", title: "Haverfordwest", text: "The nearest railway station is Haverfordwest, then the T11 bus or a taxi." }
    ],
    nearby: [
      { name: "Broad Haven", href: "/guides/surfing-broad-haven/", distance: "About 7 miles by road", text: "A more sheltered St Brides Bay beach with a small village — a good alternative when Newgale is big or windy." },
      { name: "Nolton Haven", href: "/guides/surfing-nolton-haven/", distance: "About 2 miles south", text: "A small sandy cove with a pub, best on lower tides." },
      { name: "Whitesands", href: "/guides/surfing-whitesands/", distance: "About 9 miles west", text: "St Davids' beach, with a different swell window and a busier summer scene." },
      { name: "Pembrokeshire guide", href: "/guides/wales/pembrokeshire/", text: "Compare all of Surfbooker's Pembrokeshire beaches." }
    ],
    faqs: [
      { q: "Is Newgale good for beginners?", a: "On small, clean days the whitewater close to shore is good for learning, and lifeguards patrol in summer. When the swell is bigger, rips form and it is better suited to experienced surfers — take a lesson or choose a calmer beach such as Broad Haven." },
      { q: "Can I take my dog to Newgale?", a: "Yes, but not on the central third of the beach between 1 May and 30 September. The north and south sections are dog-friendly all year." },
      { q: "Where do I park at Newgale?", a: "There are three car parks beside the beach on the A487, with disabled parking in the main car park. Check the signs for current charges." },
      { q: "Is there surf hire at Newgale?", a: "Yes. Newsurf, beside the Duke of Edinburgh pub, hires surfboards, bodyboards, wetsuits, kayaks and paddleboards." },
      { q: "When is Newgale at its best for surfing?", a: "With a west or south-west swell and light easterly winds. Westerly winds blow straight onshore and make it messy." }
    ],
    sources: [
      { label: "The Beach Guide — Newgale Sands (facilities, dog rules, lifeguards)", url: "https://www.thebeachguide.co.uk/south-wales/pembrokeshire/newgale-sands.htm" },
      { label: "Visit Pembrokeshire — Newsurf listing", url: "https://www.visitpembrokeshire.com/activity-listing/newsurf" },
      { label: "Traveline Cymru — T11 timetable", url: "https://www.traveline.cymru/timetables/?routeNum=T11&direction_id=0&timetable_key=T11MFTCA1" },
      { label: "Pembrokeshire County Council — Newgale coastal adaptation project", url: "https://newsroom.pembrokeshire.gov.uk/news/find-out-more-about-coastal-adaptation-project-as-plans-for-newgale-progress" },
      { label: "Wikipedia — Newgale, Pembrokeshire (history)", url: "https://en.wikipedia.org/wiki/Newgale,_Pembrokeshire" },
      { label: "RNLI — find a lifeguarded beach", url: "https://rnli.org/find-my-nearest/lifeguarded-beaches" }
    ]
  },
  {
    slug: "whitesands",
    name: "Whitesands",
    fullName: "Whitesands Bay (Porth Mawr)",
    region: "wales", subRegion: "pembrokeshire",
    area: "St Davids, Pembrokeshire",
    path: "/guides/surfing-whitesands/", outFile: "guides/surfing-whitesands/index.html",
    geo: [51.8960, -5.2960],
    title: "Whitesands Bay Surf Guide, St Davids: Lessons, Parking & Rules | Surfbooker",
    description: "Whitesands Bay near St Davids: the surf, Ma Simes surf school and hire, parking, the summer dog ban, lifeguards, food and the best walks around St Davids Head.",
    heroIntro: "St Davids' own surf beach — a sandy bay beneath Carn Llidi with a surf school on the sand and the cathedral city ten minutes away.",
    heroAlt: "Whitesands Bay on a grey day with Carn Llidi rising behind the beach",
    images: { hero: lic("whitesands") },
    glance: [
      ["Best for", "Lessons, families, improvers"],
      ["Break", "Beach break with rocky edges"],
      ["Lifeguards", "Seasonal (check RNLI dates)"],
      ["Dogs", "Banned 1 May–30 Sep"],
      ["Parking", "Pay car park, ~100 spaces, fills early"],
      ["Nearest town", "St Davids, about 2 miles"]
    ],
    overview: [
      "Whitesands Bay — Porth Mawr in Welsh — is the big sandy beach on the St Davids peninsula, tucked under the rocky hill of Carn Llidi at the far western tip of Pembrokeshire. It faces west towards Ramsey Island and the reefs of the Bishops and Clerks, so it picks up Atlantic swell while the headlands give some shape and shelter.",
      "It is a classic summer surf beach: a car park right behind the sand, a café and shop, a surf school working from the beach, lifeguards in season and the city of St Davids a short drive away. That popularity is the main drawback — in school holidays the car park can be full by late morning.",
      "Out of season it is a different place: quieter, with the coast path to St Davids Head and Porthmelgan right on the doorstep."
    ],
    suits: [
      "First lessons and improving surfers on small to moderate days",
      "Families who want a lifeguarded beach with a café and toilets",
      "Walkers combining a surf with St Davids Head and the coast path",
      "Visitors staying in St Davids"
    ],
    notFor: ["Dog walkers between May and September — there is a full ban", "Late arrivals in peak summer — the car park fills up"],
    surf: {
      intro: "A sandy bay break that is more sheltered than it looks on a map.",
      text: [
        "Whitesands faces west-south-west and works on Atlantic swells from the west and south-west. The north end, near the lifeboat slipway and rocks, and the middle of the bay can have different banks, so it pays to walk the beach before you paddle out.",
        "It is usually smaller than exposed Newgale on the same day, which helps beginners. Light winds from the east are offshore; rocks at both ends and around the stream need care at higher tides."
      ],
      cards: [
        { label: "Level", title: "Beginner to intermediate", text: "A good learning beach in summer with lessons and lifeguards. Bigger winter swells suit experienced surfers." },
        { label: "Conditions", title: "West/south-west swell, east wind", text: "Check the tide — the beach shrinks noticeably at high tide." },
        { label: "Hazards", title: "Rocks and rips", text: "Rocky outcrops at each end and rip currents on bigger days. Offshore, the Bishops and Clerks reefs are notorious for shipwrecks." },
        { label: "Crowds", title: "Busy in summer", text: "Lessons, bodyboarders and swimmers share the water — give the flagged areas a wide berth." }
      ]
    },
    lessons: {
      intro: "Ma Simes Surf School works from the beach front, by the ice cream van.",
      providers: [
        { name: "Ma Simes Surf School & hire", type: "Surf school & hire", url: "https://masimes.co.uk/surf-school-hire", note: "Two-hour beginner and improver lessons and private coaching at Whitesands, run by ASI/ISA instructors who are also qualified beach lifeguards. Minimum age 8 and able to swim 50 m. Surfboard and wetsuit hire on the beach must be pre-booked; the shop is at 28 High Street, St Davids." }
      ]
    },
    practical: [
      { label: "Parking", title: "Pay car park behind the beach", text: "About 100 spaces including disabled bays, with a daily charge. In summer holidays aim to arrive well before late morning." },
      { label: "Facilities", title: "Toilets, café and shop", text: "Toilets with accessible facilities, a café and shop by the beach, a slipway and a seasonal first aid post." },
      { label: "Lifeguards", title: "Seasonal RNLI patrol", text: "Lifeguards patrol in the summer season. Swim between the red and yellow flags; surf between the black and white flags." },
      { label: "Dogs", title: "Full summer ban", text: "Pembrokeshire County Council bans dogs from Whitesands from 1 May to 30 September." }
    ],
    stay: {
      intro: "St Davids has the widest choice; there are also campsites and holiday parks on the peninsula.",
      areas: [
        { label: "City", title: "St Davids", text: "Hotels, B&Bs, pubs and restaurants about 2 miles away. The best base if you want evenings out." },
        { label: "Close to the sand", title: "Peninsula campsites and cottages", text: "Several camping and caravan sites and holiday cottages sit between St Davids and the beach — handy for dawn surfs." },
        { label: "Alternative", title: "Solva or Newgale", text: "Twenty minutes east, with Newgale's more exposed surf as a second option." }
      ]
    },
    food: {
      intro: "There's a café and shop at the beach; St Davids has plenty more.",
      text: ["For a proper meal or a pub, head into St Davids, where the High Street and Cross Square have cafés, pubs and restaurants within a few minutes' walk of each other."]
    },
    todo: [
      { label: "Walk", title: "St Davids Head and Porthmelgan", text: "Follow the coast path north from the beach to the small cove of Porthmelgan and the rocky headland of St Davids Head." },
      { label: "Hill", title: "Carn Llidi", text: "A short, steep climb above the beach for views over Ramsey Island and the Bishops and Clerks." },
      { label: "Culture", title: "St Davids Cathedral", text: "The medieval cathedral and Bishop's Palace in Britain's smallest city." },
      { label: "Boats", title: "Ramsey Island trips", text: "Boat trips around Ramsey Island run from St Justinian's in season — seals, seabirds and tidal races." }
    ],
    travel: [
      { label: "By car", title: "From St Davids", text: "Follow the B4583 west out of St Davids; the beach is about 2 miles away. Lanes are narrow." },
      { label: "By bus", title: "Celtic Coaster", text: "A seasonal shuttle links St Davids with Whitesands and St Justinian's. Check current Pembrokeshire coastal bus timetables." },
      { label: "By train", title: "Haverfordwest or Fishguard", text: "The nearest stations are Haverfordwest and Fishguard; the T11 bus runs to St Davids." }
    ],
    nearby: [
      { name: "Newgale", href: "/guides/surfing-newgale/", distance: "About 20 minutes' drive", text: "More exposed and usually bigger — the check if Whitesands is small." },
      { name: "Broad Haven", href: "/guides/surfing-broad-haven/", distance: "About 30 minutes' drive", text: "A sheltered village beach on St Brides Bay." },
      { name: "Pembrokeshire guide", href: "/guides/wales/pembrokeshire/", text: "All of Surfbooker's Pembrokeshire beaches." }
    ],
    faqs: [
      { q: "Can dogs go on Whitesands beach?", a: "Not in summer. Dogs are banned from 1 May to 30 September. Outside those dates they are welcome." },
      { q: "Is there a surf school at Whitesands?", a: "Yes. Ma Simes Surf School runs lessons and pre-booked hire from the beach front. Minimum age is 8 and you need to be able to swim 50 metres." },
      { q: "How early should I arrive to park?", a: "In the summer holidays the car park can fill by late morning, so arrive early or use the seasonal shuttle bus from St Davids." },
      { q: "Is Whitesands good for beginners?", a: "Yes on small to moderate days, especially with a lesson and when lifeguards are on duty. Watch out for rocks at each end." }
    ],
    sources: [
      { label: "The Beach Guide — Whitesands", url: "https://www.thebeachguide.co.uk/south-wales/pembrokeshire/whitesands.htm" },
      { label: "Ma Simes — surf school and hire", url: "https://masimes.co.uk/surf-school-hire" },
      { label: "Pembrokeshire County Council — summer beach dog bans", url: "https://www.pembrokeshire.gov.uk/dog-control/summer-beach-bans" },
      { label: "Pembrokeshire Coast National Park — Whitesands to Solva walk", url: "https://www.pembrokeshirecoast.wales/coast-path/planning-your-walk/whitesands-to-solva/" },
      { label: "RNLI — find a lifeguarded beach", url: "https://rnli.org/find-my-nearest/lifeguarded-beaches" }
    ]
  },
  {
    slug: "nolton-haven",
    name: "Nolton Haven",
    region: "wales", subRegion: "pembrokeshire",
    area: "St Brides Bay, Pembrokeshire",
    path: "/guides/surfing-nolton-haven/", outFile: "guides/surfing-nolton-haven/index.html",
    geo: [51.8166, -5.1062],
    title: "Nolton Haven Beach Guide: Parking, Dogs, Surf & Pub | Surfbooker",
    description: "Nolton Haven is a small sheltered cove on St Brides Bay with a pub, slipway access and seasonal lifeguards. What to expect for surf, swimming, parking and dogs.",
    heroIntro: "A small, sheltered cove between Newgale and Broad Haven, with a pub, a slipway and dogs welcome all year.",
    heroAlt: "Nolton Haven cove at low tide with rocks in the foreground and houses above the beach",
    images: { hero: lic("nolton-haven") },
    glance: [
      ["Best for", "Families, paddling, kayaking, a calm swim"],
      ["Break", "Small cove; surf only on bigger swells"],
      ["Lifeguards", "Seasonal"],
      ["Dogs", "Allowed all year"],
      ["Parking", "National Park car park opposite the beach"],
      ["Access", "Easy slipway — an Easy Access Beach"]
    ],
    overview: [
      "Nolton Haven is a little south-west-facing inlet of sand and shingle, framed by cliffs, a couple of miles south of Newgale. The flat grassy terrace above the beach was once a yard for storing coal before it was shipped out — a reminder of the small Pembrokeshire coalfield that reached the coast here.",
      "Today it is a quiet, family-friendly cove with a pub, holiday cottages and an easy slipway onto the sand. It is a lovely place to swim, rock-pool, launch a kayak or watch the sunset, but it is not a destination surf beach: the headlands block most swell, so it only has waves when Newgale is big."
    ],
    suits: ["Families wanting a small, easy beach with a pub", "Kayakers and paddleboarders on calm days", "Dog owners — dogs are allowed year-round", "Sunset photographers"],
    notFor: ["Regular surf — head to Newgale instead"],
    surf: {
      intro: "Occasional waves only.",
      text: ["Nolton Haven is well tucked in. On a big west or south-west swell, small waves can wrap into the cove when exposed beaches are too large, but most days it is flat or very small. The currents can be unpredictable, especially at low tide."],
      cards: [
        { label: "Level", title: "Gentle days for paddling", text: "Ideal for swimming and paddlesports when it is calm; not a reliable surf spot." },
        { label: "Hazards", title: "Currents at low tide", text: "The National Park warns that currents can be unpredictable at low tide. Swim between the flags when lifeguards are on duty." }
      ]
    },
    practical: [
      { label: "Parking", title: "Car park opposite the beach", text: "Run by the Pembrokeshire Coast National Park Authority, with seasonal charges." },
      { label: "Toilets", title: "In the car park", text: "Public toilets are in the car park; there are no accessible or baby-changing facilities." },
      { label: "Lifeguards", title: "Seasonal", text: "Lifeguards patrol in the summer season — check RNLI dates." },
      { label: "Dogs", title: "Welcome all year", text: "Dogs are allowed all year round. Please clean up after them." },
      { label: "Access", title: "Slipway", text: "A slipway gives easy access to the beach; the National Park lists Nolton Haven as an Easy Access Beach." }
    ],
    stay: {
      intro: "Nolton Haven has holiday cottages and the pub; Broad Haven and Newgale are each about 10 minutes away.",
      areas: [
        { label: "In the cove", title: "Holiday cottages", text: "A handful of self-catering cottages overlook the beach — book early for summer." },
        { label: "Nearby", title: "Broad Haven or Newgale", text: "More accommodation, shops and food a short drive away." }
      ]
    },
    food: {
      places: [ { name: "The Mariners Inn", type: "Pub", note: "The pub above the beach at Nolton Haven." } ],
      note: "Check opening hours directly, particularly outside the summer holidays."
    },
    todo: [
      { label: "Walk", title: "Coast path to Newgale", text: "Walk north over the cliffs to Newgale — about 2 miles — and look for remains of old coal workings along the way." },
      { label: "Paddle", title: "Kayak launch", text: "The sheltered cove is a good spot to launch a kayak on calm days." }
    ],
    travel: [
      { label: "By car", title: "Off the A487", text: "Reached by narrow lanes from the A487 near Newgale or from Broad Haven." },
      { label: "By bus", title: "Puffin Shuttle", text: "The seasonal Puffin Shuttle coastal bus stops at Nolton Haven." }
    ],
    nearby: [
      { name: "Newgale", href: "/guides/surfing-newgale/", distance: "About 2 miles north", text: "The surf beach for this part of the bay." },
      { name: "Broad Haven", href: "/guides/surfing-broad-haven/", distance: "About 10 minutes' drive", text: "Village beach with cafés and a surf shop." }
    ],
    faqs: [
      { q: "Can you surf at Nolton Haven?", a: "Only occasionally. The cove is sheltered and needs a big swell to have waves. Newgale, two miles north, is the better surf beach." },
      { q: "Are dogs allowed at Nolton Haven?", a: "Yes, all year round." },
      { q: "Is there a pub at Nolton Haven?", a: "Yes, the Mariners Inn sits above the beach." }
    ],
    sources: [
      { label: "Pembrokeshire Coast National Park — Nolton Haven", url: "https://www.pembrokeshirecoast.wales/things-to-do/outdoor-activities/beaches/find-a-beach/nolton-haven/" },
      { label: "The Beach Guide — Nolton Haven", url: "https://www.thebeachguide.co.uk/south-wales/pembrokeshire/nolton-haven.htm" },
      { label: "RNLI — find a lifeguarded beach", url: "https://rnli.org/find-my-nearest/lifeguarded-beaches" }
    ]
  },
  {
    slug: "freshwater-west",
    name: "Freshwater West",
    region: "wales", subRegion: "pembrokeshire",
    area: "Castlemartin peninsula, south Pembrokeshire",
    path: "/guides/surfing-freshwater-west/", outFile: "guides/surfing-freshwater-west/index.html",
    geo: [51.6563, -5.0617],
    title: "Freshwater West Surf Guide: Wales' Most Powerful Beach Break | Surfbooker",
    description: "Freshwater West in Pembrokeshire: powerful, consistent surf, strong rips, free parking, Café Môr, dog rules and film locations. Who it suits and safer alternatives nearby.",
    heroIntro: "Wild, dune-backed and fully open to the Atlantic — Wales' most consistent and powerful beach break, and no place for a casual swim.",
    heroAlt: "Long sandy beach and dunes at Freshwater West, Pembrokeshire, on a bright day",
    images: { hero: lic("freshwater-west") },
    glance: [
      ["Best for", "Experienced surfers"],
      ["Break", "Exposed beach break with rocky reefs"],
      ["Lifeguards", "Seasonal (check RNLI dates)"],
      ["Dogs", "Allowed all year"],
      ["Parking", "Free car parks above the beach"],
      ["Warning", "Strong rips — swimming is dangerous"]
    ],
    overview: [
      "Freshwater West is a long sweep of sand and dunes on the west-facing coast of the Castlemartin peninsula, south of Milford Haven. It catches almost every Atlantic swell that reaches Wales and is widely regarded as the country's most consistent surf beach, hosting national competitions over the years.",
      "It is also genuinely dangerous: rip currents are strong and the waves can be powerful, so it is a beach for competent surfers rather than learners or swimmers. There is no village — just car parks, toilets and, from spring to early autumn, Café Môr's seaweed-inspired food in the southern car park.",
      "Film fans may recognise it: the dunes and beach appeared in Ridley Scott's *Robin Hood* and in *Harry Potter and the Deathly Hallows* as the site of Shell Cottage."
    ],
    suits: ["Experienced surfers looking for the most consistent waves in Wales", "Walkers and photographers who want a wild, undeveloped beach", "Dog owners — dogs are allowed all year"],
    notFor: ["Beginners without an instructor", "Swimmers and young children in the water — rips are strong", "Anyone wanting cafés, shops or a village"],
    surf: {
      intro: "Powerful, consistent and exposed.",
      text: [
        "Freshwater West faces west-south-west and picks up all the Atlantic swells, so when other Pembrokeshire beaches are flat there is usually something here. Sandbanks, plus rocky reef sections at the ends of the beach, create a variety of peaks.",
        "That exposure means it is frequently too big and too windy. It is best in light easterly winds and on the smaller days of a swell. Local surf schools sometimes use it for coaching when conditions are right, but they also choose calmer beaches when it is heavy."
      ],
      cards: [
        { label: "Level", title: "Intermediate to advanced", text: "Not a beginner beach on its own. Learners should only go with a school that chooses the day and the spot." },
        { label: "Conditions", title: "Any west/south-west swell", text: "Works on most swells. Light easterly winds are offshore." },
        { label: "Hazards", title: "Strong rips and heavy shorebreak", text: "Rip currents are strong and waves can be fierce. Stay out of the water unless you are a competent surfer, and swim only between the flags when lifeguards are on duty." },
        { label: "Nearby range", title: "Castlemartin firing range", text: "The MoD range lies just to the south. Follow all warning signs and red flags when walking the coast path." }
      ]
    },
    lessons: {
      providers: [
        { name: "Outer Reef Surf School", type: "Surf school", url: "https://www.outerreefsurfschool.com/surf-lessons/", note: "Pembroke-based school (established 1999) that teaches at Freshwater West, Manorbier, Newgale, Tenby and Saundersfoot depending on conditions. Children aged 7+ welcome." }
      ]
    },
    practical: [
      { label: "Parking", title: "Free car parks", text: "Free parking above the beach, but it gets crowded when the surf is good. Postcode SA71 5AH." },
      { label: "Facilities", title: "Toilets and Café Môr", text: "Toilets on site. Café Môr trades from the southern car park from spring to early autumn." },
      { label: "Lifeguards", title: "Seasonal service", text: "There is a seasonal lifeguard service — always use the flags and check RNLI dates." },
      { label: "Dogs", title: "Allowed all year", text: "Dogs are allowed on the beach all year." }
    ],
    stay: {
      intro: "There's nothing at the beach itself, so base yourself nearby.",
      areas: [
        { label: "Villages", title: "Angle and Castlemartin", text: "Small villages on the peninsula with cottages and a pub or two — quiet and close to the surf." },
        { label: "Town", title: "Pembroke", text: "The historic castle town, about 20 minutes away, with the widest choice of B&Bs and pubs." },
        { label: "Seaside", title: "Tenby", text: "Further (about 40 minutes) but a lively harbour town with plenty of accommodation." }
      ]
    },
    food: { places: [{ name: "Café Môr", type: "Food van", note: "Seaweed-inspired street food from the southern car park, spring to early autumn." }] },
    todo: [
      { label: "Walk", title: "Coast path to Angle", text: "The Pembrokeshire Coast Path heads north from Freshwater West towards the village of Angle." },
      { label: "Film location", title: "Shell Cottage", text: "Fans visit the dunes where Dobby's grave was filmed for *Harry Potter and the Deathly Hallows*. Please leave no trace." },
      { label: "History", title: "Pembroke Castle", text: "The birthplace of Henry VII, about 20 minutes' drive away." }
    ],
    travel: [
      { label: "By car", title: "B4319", text: "Freshwater West is on the B4319 between Pembroke and Castlemartin. The road crosses the MoD range — follow signage." },
      { label: "By train", title: "Pembroke", text: "The nearest station is Pembroke, about 8 miles away. Public transport to the beach is limited." }
    ],
    nearby: [
      { name: "Freshwater East", href: "/guides/surfing-freshwater-east/", distance: "About 20 minutes' drive", text: "A gentler south-east-facing bay — a good contrast on west-wind days." },
      { name: "Manorbier", href: "/guides/surfing-manorbier/", distance: "About 30 minutes' drive", text: "A castle-backed bay that works on bigger south-west swells." },
      { name: "Pembrokeshire guide", href: "/guides/wales/pembrokeshire/", text: "All of Surfbooker's Pembrokeshire beaches." }
    ],
    faqs: [
      { q: "Is Freshwater West safe for swimming?", a: "It is one of the more dangerous beaches in Pembrokeshire. Rip currents are strong and waves can be powerful. Only swim between the red and yellow flags when lifeguards are on duty." },
      { q: "Can beginners surf at Freshwater West?", a: "Only with a qualified surf school that chooses suitable conditions. On most days beginners are better off at a more sheltered beach." },
      { q: "Is parking free at Freshwater West?", a: "Yes, but it fills when the surf is good." },
      { q: "Where was Harry Potter filmed at Freshwater West?", a: "The dunes were the setting for Shell Cottage in *Harry Potter and the Deathly Hallows*." }
    ],
    sources: [
      { label: "The Beach Guide — Freshwater West", url: "https://www.thebeachguide.co.uk/south-wales/pembrokeshire/freshwater-west.htm" },
      { label: "Wikipedia — Freshwater West", url: "https://en.wikipedia.org/wiki/Freshwater_West" },
      { label: "Outer Reef Surf School — lessons and beaches", url: "https://www.outerreefsurfschool.com/surf-lessons/" },
      { label: "RNLI — find a lifeguarded beach", url: "https://rnli.org/find-my-nearest/lifeguarded-beaches" }
    ]
  },
  {
    slug: "freshwater-east",
    name: "Freshwater East",
    region: "wales", subRegion: "pembrokeshire",
    area: "Near Pembroke, south Pembrokeshire",
    path: "/guides/surfing-freshwater-east/", outFile: "guides/surfing-freshwater-east/index.html",
    geo: [51.6455, -4.8694],
    title: "Freshwater East Beach Guide: Surf, Parking, Dogs | Surfbooker",
    description: "Freshwater East near Pembroke: a dune-backed sandy bay sheltered by Trewent Point. When it gets surf, parking, facilities, no lifeguards, dogs and nearby beaches.",
    heroIntro: "A dune-backed bay sheltered by Trewent Point — calm on most days, with occasional waves when the wind and swell turn east or south.",
    heroAlt: "Freshwater East beach with a stream crossing the sand and Trewent Point headland behind",
    images: { hero: lic("freshwater-east") },
    glance: [
      ["Best for", "Families, paddling, walkers"],
      ["Break", "Sheltered south-east-facing bay"],
      ["Lifeguards", "None"],
      ["Dogs", "Allowed"],
      ["Parking", "Pay car park"],
      ["Facilities", "Toilets, café, pub nearby"]
    ],
    overview: [
      "Freshwater East is a wide sandy bay on the south coast of Pembrokeshire, a few miles south-east of Pembroke, backed by dunes and sheltered on its southern side by Trewent Point. Despite the name it has very little in common with its wild namesake on the west coast.",
      "Facing south-east, it is protected from the prevailing westerly swell and wind, so most days it is calm — good for swimming, paddling and kayaking. There is no lifeguard service, so take extra care in the water."
    ],
    suits: ["Families wanting a quieter sandy bay", "Kayakers and swimmers on calm days", "Walkers on the coast path towards Stackpole"],
    notFor: ["Reliable surf — the bay is usually flat", "Anyone wanting lifeguard cover"],
    surf: {
      intro: "An occasional, conditions-dependent spot.",
      text: ["Because it faces south-east, Freshwater East only has surf when a big swell wraps around the coast or when easterly or south-easterly winds generate local waves. When the prevailing south-westerlies are blowing, it can be sheltered and offshore — so it is worth a look when Freshwater West is blown out."],
      cards: [
        { label: "Level", title: "Usually calm", text: "Most days are better for paddling than surfing." },
        { label: "Hazards", title: "No lifeguards", text: "There is no lifeguard service. A small stream crosses the southern end of the beach." }
      ]
    },
    practical: [
      { label: "Parking", title: "Pay car park", text: "Parking is available with charges. Postcode SA71 5LZ." },
      { label: "Facilities", title: "Toilets, café, shop", text: "Toilets including accessible facilities, a café and shop, and a pub nearby." },
      { label: "Lifeguards", title: "None", text: "There is no lifeguard service — take extra care and never swim alone." },
      { label: "Dogs", title: "Allowed", text: "Dogs are allowed on the beach." },
      { label: "Access", title: "Slipway", text: "A slipway leads onto the sand." }
    ],
    stay: {
      areas: [
        { label: "At the bay", title: "Holiday parks and chalets", text: "Holiday parks and chalets sit behind the dunes." },
        { label: "Town", title: "Pembroke", text: "About 10 minutes' drive, with B&Bs, pubs and the castle." }
      ]
    },
    todo: [
      { label: "Walk", title: "Coast path to Stackpole", text: "Walk west along the coast path towards Stackpole Quay and Barafundle Bay." },
      { label: "History", title: "Lamphey Bishop's Palace & Pembroke Castle", text: "Two historic sites within a short drive." }
    ],
    travel: [
      { label: "By car", title: "From Pembroke", text: "Follow the B4584 south-east from Pembroke via Lamphey." },
      { label: "By train", title: "Lamphey or Pembroke", text: "Lamphey station is the nearest, about 2 miles away; Pembroke is slightly further." }
    ],
    nearby: [
      { name: "Manorbier", href: "/guides/surfing-manorbier/", distance: "About 15 minutes' drive", text: "A castle-backed bay that picks up more south-west swell." },
      { name: "Freshwater West", href: "/guides/surfing-freshwater-west/", distance: "About 20 minutes' drive", text: "Wales' most powerful beach break." }
    ],
    faqs: [
      { q: "Does Freshwater East get surf?", a: "Sometimes, but it is sheltered and faces south-east, so it needs a large swell or an easterly wind. Freshwater West and Manorbier are more reliable." },
      { q: "Are there lifeguards at Freshwater East?", a: "No. There is no lifeguard service." },
      { q: "Can dogs go on the beach?", a: "Yes, dogs are allowed." }
    ],
    sources: [
      { label: "The Beach Guide — Freshwater East", url: "https://www.thebeachguide.co.uk/south-wales/pembrokeshire/freshwater-east.htm" },
      { label: "Visit Pembrokeshire — Freshwater East", url: "https://www.visitpembrokeshire.com/explore-pembrokeshire/beaches/freshwater-east" },
      { label: "Pembrokeshire Coast National Park — easy access beaches", url: "https://www.pembrokeshirecoast.wales/things-to-do/access-for-all/easy-access-beaches/" }
    ]
  },
  {
    slug: "manorbier",
    name: "Manorbier",
    region: "wales", subRegion: "pembrokeshire",
    area: "Between Tenby and Pembroke",
    path: "/guides/surfing-manorbier/", outFile: "guides/surfing-manorbier/index.html",
    geo: [51.6431, -4.8023],
    title: "Manorbier Beach Surf Guide: Castle, Parking & Lessons | Surfbooker",
    description: "Manorbier Bay below its Norman castle: reef and beach surf on south-west swells, National Park car park, no lifeguards, dogs, lessons nearby and things to do.",
    heroIntro: "A small sand-and-pebble bay guarded by a Norman castle, with surf over sand and reef when a south-westerly swell rolls in.",
    heroAlt: "A lone figure at the water's edge on Manorbier beach on a calm grey day",
    images: { hero: lic("manorbier") },
    glance: [
      ["Best for", "Improvers and intermediates"],
      ["Break", "Beach and reef, south-west facing"],
      ["Lifeguards", "None"],
      ["Dogs", "Allowed"],
      ["Parking", "National Park pay car park (~160 spaces)"],
      ["Rail", "Manorbier station nearby"]
    ],
    overview: [
      "Manorbier is a village between Tenby and Pembroke, best known for its Norman castle — which Gerald of Wales, born here in the 12th century, called the pleasantest spot in Wales. The bay below the castle has sand, pebbles and rock shelves, with the Church of St James on the opposite slope and the Neolithic King's Quoit burial chamber on the headland.",
      "It faces south-west, so it is one of the more reliable surf spots on the south Pembrokeshire coast when the westerly swells are running. There are no lifeguards, so it is better suited to people who already surf."
    ],
    suits: ["Improving and intermediate surfers", "History lovers — castle, church and King's Quoit", "Families on calm days (no lifeguards, so supervise closely)"],
    notFor: ["Unsupervised beginners", "Those needing lifeguard cover"],
    surf: {
      text: ["Manorbier picks up south-westerly swell. There is a beach break over sand and rocky reef sections that can produce better-shaped waves on the right tide. Northerly winds are offshore. Rocks are exposed around low tide."],
      cards: [
        { label: "Level", title: "Improvers upwards", text: "Rocky sections and no lifeguards make it best for surfers with some experience." },
        { label: "Conditions", title: "South-west swell, northerly wind", text: "Check the tide — reef sections and rocks change the beach significantly." },
        { label: "Hazards", title: "Rocks and no lifeguards", text: "Take care entering and exiting over rocks, and never surf alone." }
      ]
    },
    lessons: {
      providers: [
        { name: "Outer Reef Surf School", type: "Surf school", url: "https://www.outerreefsurfschool.com/surf-lessons/", note: "Pembroke-based school that lists Manorbier among the beaches it uses depending on conditions. Children aged 7+." }
      ]
    },
    practical: [
      { label: "Parking", title: "National Park car park", text: "Pay-and-display car park run by the National Park Authority, free out of season, with about 160 spaces and disabled bays. Postcode SA70 8QR." },
      { label: "Facilities", title: "Toilets", text: "Toilets with accessible facilities. Shops and pubs are in the village a short walk up the hill." },
      { label: "Lifeguards", title: "None", text: "There is no lifeguard service — take extra care." },
      { label: "Access", title: "Wheelchair viewing platform", text: "There is wheelchair access between the car park and the beach head, plus a viewing platform." },
      { label: "Dogs", title: "Allowed", text: "Dogs are allowed on the beach." }
    ],
    stay: {
      areas: [
        { label: "Village", title: "Manorbier", text: "Cottages, B&Bs and a youth hostel on the edge of the village (YHA Manorbier)." },
        { label: "Town", title: "Tenby", text: "About 15 minutes away, with the biggest choice of hotels, restaurants and nightlife in south Pembrokeshire." }
      ]
    },
    todo: [
      { label: "History", title: "Manorbier Castle", text: "A Norman castle directly above the beach; check seasonal opening." },
      { label: "Walk", title: "King's Quoit", text: "A Neolithic chambered tomb on the headland, reached via the coast path." },
      { label: "Day out", title: "Tenby", text: "Walled harbour town with several beaches, about 15 minutes east." }
    ],
    travel: [
      { label: "By train", title: "Manorbier station", text: "On the Pembroke Dock line, about a mile from the beach." },
      { label: "By car", title: "A4139", text: "Manorbier is just off the A4139 between Tenby and Pembroke." }
    ],
    nearby: [
      { name: "Freshwater East", href: "/guides/surfing-freshwater-east/", distance: "About 15 minutes' drive", text: "A sheltered bay that can work when it's blowing west." },
      { name: "Freshwater West", href: "/guides/surfing-freshwater-west/", distance: "About 30 minutes' drive", text: "The most powerful surf in Wales." }
    ],
    faqs: [
      { q: "Are there lifeguards at Manorbier?", a: "No, there is no lifeguard service at Manorbier Bay." },
      { q: "Can I get to Manorbier by train?", a: "Yes. Manorbier station is on the Pembroke Dock line, about a mile from the beach." },
      { q: "Is Manorbier good for beginners?", a: "It has rocks and no lifeguards, so beginners should go with a surf school such as Outer Reef, which uses Manorbier when conditions suit." }
    ],
    sources: [
      { label: "The Beach Guide — Manorbier Bay", url: "https://www.thebeachguide.co.uk/south-wales/pembrokeshire/manorbier-bay.htm" },
      { label: "Visit Pembrokeshire — Manorbier", url: "https://www.visitpembrokeshire.com/explore-pembrokeshire/beaches/manorbier" },
      { label: "Outer Reef Surf School", url: "https://www.outerreefsurfschool.com/surf-lessons/" }
    ]
  },
  {
    slug: "marloes-sands",
    name: "Marloes Sands",
    region: "wales", subRegion: "pembrokeshire",
    area: "Marloes peninsula, Pembrokeshire",
    path: "/guides/surfing-marloes-sands/", outFile: "guides/surfing-marloes-sands/index.html",
    geo: [51.7255, -5.2187],
    title: "Marloes Sands Guide: National Trust Beach, Walk & Surf | Surfbooker",
    description: "Marloes Sands on Pembrokeshire's Marloes peninsula: National Trust parking and the half-mile walk, tides, no lifeguards, dogs, surf notes, Gateholm and Skomer boat trips.",
    heroIntro: "A wild National Trust beach of sand and rock fins, reached on foot and best enjoyed at low tide with the islands on the horizon.",
    heroAlt: "Path down the valley to Marloes Sands with Gateholm island in the distance",
    images: { hero: lic("marloes-sands") },
    glance: [
      ["Best for", "Walkers, photographers, experienced surfers"],
      ["Break", "Exposed beach break with rocks"],
      ["Lifeguards", "None"],
      ["Dogs", "Allowed (no bins)"],
      ["Parking", "National Trust car park, ½ mile walk"],
      ["Tide", "Beach nearly disappears at high tide"]
    ],
    overview: [
      "Marloes Sands is a long south-west-facing beach on the Marloes peninsula, owned by the National Trust and reached by a half-mile walk down a valley from the car park. Upended fins of layered sandstone and shale run across the sand, with the tidal island of Gateholm at the western end and Skokholm on the horizon.",
      "There are no facilities on the beach itself, which keeps it feeling remote even in summer. The beach can all but disappear at high tide, so plan your visit around low tide."
    ],
    suits: ["Walkers and photographers", "Experienced surfers comfortable with rocks and no lifeguards", "Wildlife watchers combining the beach with Skomer"],
    notFor: ["Families needing toilets on the beach", "Beginner surfers — there are no lifeguards and plenty of rocks", "High-tide visits"],
    surf: {
      text: ["Marloes picks up south-westerly swell and can have good waves, but it is rocky, remote and unlifeguarded. Most visitors come to walk, swim at low tide and explore — surf here only if you are experienced and with others."],
      cards: [
        { label: "Hazards", title: "Rocks, tides and remoteness", text: "Rock fins run across the beach, the tide comes up to the cliffs, and help is a long walk away." },
        { label: "Gateholm", title: "Tidal island", text: "Gateholm can be reached at low tide but the climb is tricky; Jack Sound, further west, has rough tidal races." }
      ]
    },
    practical: [
      { label: "Parking", title: "National Trust car park", text: "A National Trust car park about half a mile from the beach, with a charge (free for members)." },
      { label: "Facilities", title: "None on the beach", text: "No toilets on the beach. There is a café with toilets at Runwayskiln near the path, and more in Marloes village." },
      { label: "Lifeguards", title: "None", text: "There is no lifeguard service." },
      { label: "Dogs", title: "Allowed", text: "Dogs are allowed on the beach, but there are no dog bins — take waste home." }
    ],
    stay: {
      areas: [
        { label: "Village", title: "Marloes and Dale", text: "Small villages with cottages, a pub and campsites. Dale is a sailing village on the Milford Haven side." },
        { label: "Hostel", title: "YHA Marloes Sands", text: "A simple hostel in old farm buildings near the beach path." }
      ]
    },
    todo: [
      { label: "Wildlife", title: "Skomer Island", text: "Boats to Skomer and Skokholm leave from Martin's Haven in season; book through the Wildlife Trust of South and West Wales." },
      { label: "Walk", title: "Marloes Peninsula coastal walk", text: "A National Trust circular walk around the peninsula with seals, choughs and views of the islands." },
      { label: "Nature", title: "Marloes Mere", text: "A wetland behind the beach for marsh harriers and other birds." }
    ],
    travel: [
      { label: "By car", title: "Via Marloes village", text: "Follow the lanes west from Haverfordwest through Marloes village to the National Trust car park." },
      { label: "By bus", title: "Puffin Shuttle", text: "The seasonal Puffin Shuttle serves Marloes — check current timetables." }
    ],
    nearby: [
      { name: "Broad Haven", href: "/guides/surfing-broad-haven/", distance: "About 25 minutes' drive", text: "A village beach with facilities on St Brides Bay." },
      { name: "Pembrokeshire guide", href: "/guides/wales/pembrokeshire/", text: "All Pembrokeshire beaches." }
    ],
    faqs: [
      { q: "How far is Marloes Sands from the car park?", a: "About half a mile, down a valley path from the National Trust car park." },
      { q: "Are there toilets at Marloes Sands?", a: "Not on the beach. There's a café with toilets at Runwayskiln near the path and more facilities in Marloes village." },
      { q: "When is the best time to visit?", a: "Around low tide. At high tide the beach can almost disappear." }
    ],
    sources: [
      { label: "National Trust — visiting Marloes Sands and Mere", url: "https://www.nationaltrust.org.uk/visit/wales/marloes-sands-and-mere/visiting-marloes-sands-and-mere" },
      { label: "National Trust — Marloes Peninsula walk", url: "https://www.nationaltrust.org.uk/visit/wales/marloes-sands-and-mere/marloes-peninsula-coastal-walk" },
      { label: "The Beach Guide — Marloes Sands", url: "https://www.thebeachguide.co.uk/south-wales/pembrokeshire/marloes-sands.htm" }
    ]
  },
  {
    slug: "llangennith",
    name: "Llangennith",
    fullName: "Llangennith Sands",
    region: "wales", subRegion: "gower",
    area: "North-west Gower, near Swansea",
    path: "/guides/surfing-llangennith/", outFile: "guides/surfing-llangennith/index.html",
    geo: [51.6008, -4.2903],
    title: "Llangennith Surf Guide: Gower's Most Consistent Beach | Surfbooker",
    description: "Llangennith on the Gower: three miles of surf beach, Hillend parking, PJ's Surf Shop, surf schools, no lifeguards, dogs welcome in summer, Burry Holms tides and where to stay.",
    heroIntro: "The north end of Rhossili Bay's three-mile sweep of sand — Gower's go-to surf beach, with a surf village and campsite behind the dunes.",
    heroAlt: "Sandy path through marram-covered dunes leading to Llangennith beach under a stormy sky",
    images: { hero: lic("llangennith") },
    glance: [
      ["Best for", "All levels — learners to experienced"],
      ["Break", "Long, exposed west-facing beach break"],
      ["Lifeguards", "None"],
      ["Dogs", "Allowed all year"],
      ["Parking", "Hillend car park (fills on busy days)"],
      ["Surf shop", "PJ's Surf Shop, Llangennith village"]
    ],
    overview: [
      "Llangennith is the name surfers use for the northern part of the great west-facing beach that runs for over three miles from Rhossili to the tidal island of Burry Holms. Behind it are the dunes of Rhossili Down, the large Hillend campsite and car park, and the village of Llangennith with its pub and surf shop.",
      "It is the most consistent surf beach on the Gower and often has a rideable wave when the south-facing bays are flat. The beach shelves gently, which makes for forgiving waves and a good learning environment on small days — but there is no lifeguard patrol."
    ],
    suits: ["Beginners with a surf school on small days", "Improvers and experienced surfers looking for consistency", "Campers and van-lifers using Hillend", "Dog owners — dogs are welcome all year"],
    notFor: ["Anyone wanting lifeguard cover — choose Caswell, Langland or Port Eynon in summer", "Busy bank-holiday arrivals expecting easy parking"],
    surf: {
      intro: "Gower's swell magnet.",
      text: [
        "Facing west into the Bristol Channel's open end, Llangennith picks up Atlantic swell that the south Gower bays miss. Banks shift along three miles of sand, so there is usually room to find your own peak. Light easterly winds are offshore; it is quickly blown out by westerlies.",
        "On spring low tides the engines of the paddle steamer *City of Bristol*, wrecked here in 1840, can be exposed on the sand."
      ],
      cards: [
        { label: "Level", title: "Good for learning on small days", text: "The gently sloping beach produces gentle waves. Bigger days bring rips between the banks." },
        { label: "Conditions", title: "West swell, easterly wind", text: "Often surfable when the south coast is flat." },
        { label: "Hazards", title: "No lifeguards; Burry Holms tides", text: "There is no lifeguard patrol. Burry Holms at the north end is cut off at high tide — check tide times before walking out." }
      ]
    },
    lessons: {
      intro: "Several surf schools operate from the Hillend area, and PJ's in the village handles hire.",
      providers: [
        { name: "PJ's Surf Shop", type: "Surf shop & hire", note: "Long-established surf shop in Llangennith village with surfboard and wetsuit hire and surf gear sales." },
        { name: "Llangennith Surf School", type: "Surf school", url: "https://www.llangennithsurfschool.com/", note: "Lessons on Llangennith beach with wetsuit, board and boots included. Children from 7; under-10s must be chaperoned by a parent." }
      ],
      text: ["Other schools also use the beach — check who is operating and where they meet before you travel."]
    },
    practical: [
      { label: "Parking", title: "Hillend", text: "A large parking area at Hillend near the beach. It fills quickly at weekends and in school holidays." },
      { label: "Facilities", title: "Toilets and café at Hillend", text: "Public toilets at the car park and Eddie's Diner at Hillend Caravan Park." },
      { label: "Lifeguards", title: "None", text: "There is no lifeguard patrol on this beach." },
      { label: "Dogs", title: "Welcome all year", text: "Swansea Council lists Llangennith as a dog-friendly beach through the summer." }
    ],
    stay: {
      areas: [
        { label: "On the beach", title: "Hillend camping", text: "The big campsite behind the dunes is the classic Gower surf-trip base; book early for summer weekends." },
        { label: "Village", title: "Llangennith", text: "Cottages and a pub, about a mile from the beach." },
        { label: "South Gower", title: "Rhossili and Port Eynon", text: "More pubs, cafés and holiday lets, 15–20 minutes away." }
      ]
    },
    food: {
      places: [
        { name: "The King's Head", type: "Pub", note: "Pub with food in Llangennith village." },
        { name: "Eddie's Diner", type: "Café", note: "At Hillend Caravan Park, close to the beach." }
      ]
    },
    todo: [
      { label: "Walk", title: "Rhossili Down", text: "Climb the ridge behind the beach for views over the whole bay to Worm's Head." },
      { label: "Island", title: "Burry Holms", text: "A tidal island at the north end of the beach with Iron Age and medieval remains. Only cross with plenty of tide in hand." }
    ],
    travel: [
      { label: "By car", title: "From Swansea", text: "About 45 minutes from Swansea via the B4295 and narrow lanes to Llangennith and Hillend." },
      { label: "By bus", title: "From Swansea", text: "Buses run from Swansea to the west Gower villages; services are limited, so check the latest timetable." }
    ],
    nearby: [
      { name: "Rhossili Bay", href: "/guides/surfing-rhossili-bay/", distance: "Same beach, south end", text: "Walk or drive round to the Rhossili end for Worm's Head and the village." },
      { name: "Port Eynon", href: "/guides/surfing-port-eynon/", distance: "About 20 minutes' drive", text: "Lifeguarded summer beach on the south coast." },
      { name: "Gower guide", href: "/guides/wales/gower/", text: "Compare all of Surfbooker's Gower beaches." }
    ],
    faqs: [
      { q: "Are there lifeguards at Llangennith?", a: "No, there is no lifeguard patrol. Beginners should go with a surf school." },
      { q: "Can dogs go on Llangennith beach in summer?", a: "Yes. Swansea Council lists Llangennith among its dog-friendly beaches through the summer." },
      { q: "Where do I park?", a: "At Hillend, behind the dunes. It fills quickly on busy days." },
      { q: "Is Llangennith the same beach as Rhossili?", a: "Yes — it is the northern part of the same three-mile beach. Rhossili village and Worm's Head are at the southern end." }
    ],
    sources: [
      { label: "The Beach Guide — Llangennith Sands", url: "https://www.thebeachguide.co.uk/south-wales/glamorgan/llangennith-sands.htm" },
      { label: "Enjoy Gower — Llangennith", url: "https://enjoygower.com/llangennith" },
      { label: "Swansea Council — dog-friendly beaches", url: "https://www.swansea.gov.uk/article/29164/Dog-friendly-beaches-in-Swansea-from-May-1" },
      { label: "Llangennith Surf School", url: "https://www.llangennithsurfschool.com/" }
    ]
  },
  {
    slug: "rhossili-bay",
    name: "Rhossili Bay",
    region: "wales", subRegion: "gower",
    area: "West Gower, near Swansea",
    path: "/guides/surfing-rhossili-bay/", outFile: "guides/surfing-rhossili-bay/index.html",
    geo: [51.5690, -4.2905],
    title: "Rhossili Bay Guide: Worm's Head, Surf, Parking & Dogs | Surfbooker",
    description: "Rhossili Bay on the Gower: the steep path down, Worm's Head tides, the Helvetia wreck, surf conditions, no lifeguards, dogs, parking, food and where to stay.",
    heroIntro: "One of Britain's most photographed beaches — three miles of sand beneath Rhossili Down, with Worm's Head at the end and the Atlantic on its doorstep.",
    heroAlt: "Rhossili Bay seen from the cliffs, with the long sandy beach and Rhossili Down beyond",
    images: { hero: lic("rhossili-bay"), heroPosition: "50% 40%" },
    glance: [
      ["Best for", "Walkers, families, experienced surfers"],
      ["Break", "Exposed west-facing beach break"],
      ["Lifeguards", "None"],
      ["Dogs", "Allowed all year"],
      ["Access", "Steep path and steps from the village"],
      ["Highlight", "Worm's Head tidal island"]
    ],
    overview: [
      "Rhossili sits at the south-western tip of the Gower, where the village ends at a clifftop and the land drops away to a vast, west-facing beach. The sand runs north for three miles to Llangennith and Burry Holms, under the heather slopes of Rhossili Down, while the serpent-shaped tidal island of Worm's Head stretches out to sea to the south.",
      "From the village it is a steep walk down the path and steps to the beach, which keeps the southern end quieter than you might expect. At low tide the ribs of the *Helvetia*, wrecked here in 1887, poke out of the sand."
    ],
    suits: ["Walkers and photographers", "Families happy with a steep walk down", "Experienced surfers looking for space", "Dog owners — dogs are allowed all year"],
    notFor: ["Pushchairs and limited mobility — the access is steep", "Beginner surfers without supervision — there are no lifeguards"],
    surf: {
      text: ["Rhossili is one of the most exposed beaches in Wales and picks up any Atlantic swell. The southern end, closest to the village, gets some shelter from Worm's Head; most surfers park at Hillend and surf the Llangennith end, which is closer to the car."],
      cards: [
        { label: "Level", title: "Experienced, or with a school", text: "There is no lifeguard service, and it is a long way back up to the village." },
        { label: "Hazards", title: "Worm's Head tides", text: "The causeway to Worm's Head is only open around low tide. Check the crossing times posted at the Coastguard lookout and never be tempted to swim back." }
      ]
    },
    practical: [
      { label: "Parking", title: "Pay car park in the village", text: "Parking at the end of Rhossili village is charged and fills on sunny weekends." },
      { label: "Access", title: "Steep path and steps", text: "The route to the beach is a steep path with several flights of steps." },
      { label: "Facilities", title: "Village, not beach", text: "A shop, pub, hotel and National Trust visitor centre are at the top of the path; there is nothing on the beach itself." },
      { label: "Lifeguards", title: "None", text: "There is no lifeguard service at Rhossili Bay." },
      { label: "Dogs", title: "Allowed", text: "Rhossili Bay is listed by Swansea Council among its dog-friendly beaches in summer. Keep dogs under control near livestock on the Down." }
    ],
    stay: {
      areas: [
        { label: "Village", title: "Rhossili", text: "A hotel and cottages on the clifftop, with sunset views over the bay." },
        { label: "Camping", title: "Hillend (Llangennith end)", text: "The big campsite at the north end of the beach." }
      ]
    },
    food: {
      places: [
        { name: "Worm's Head Hotel", type: "Hotel bar & restaurant", note: "On the clifftop above the beach." },
        { name: "Village café and shop", type: "Café", note: "There is a café and shop near the car park; hours are seasonal." }
      ]
    },
    todo: [
      { label: "Walk", title: "Worm's Head", text: "Cross the causeway at low tide to the outer head — allow plenty of time and follow the posted safe crossing times." },
      { label: "Walk", title: "Rhossili Down", text: "Gower's highest point, with views over the bay and to Pembrokeshire on a clear day." },
      { label: "History", title: "The Helvetia wreck", text: "The timber ribs of the 1887 wreck are visible on the beach at low tide." }
    ],
    travel: [
      { label: "By car", title: "From Swansea", text: "About 45 minutes via the A4118 and B4247 — the road ends at Rhossili." },
      { label: "By bus", title: "From Swansea", text: "Buses run from Swansea to Rhossili; check current timetables." }
    ],
    nearby: [
      { name: "Llangennith", href: "/guides/surfing-llangennith/", distance: "Same beach, north end", text: "Easier surf access from Hillend." },
      { name: "Port Eynon", href: "/guides/surfing-port-eynon/", distance: "About 15 minutes' drive", text: "A south-facing village beach with lifeguards in summer." }
    ],
    faqs: [
      { q: "Can you surf at Rhossili?", a: "Yes, it is very exposed and picks up plenty of swell, but there are no lifeguards. Most surfers use the Llangennith end, which is closer to parking at Hillend." },
      { q: "When can I walk to Worm's Head?", a: "Only around low tide. Safe crossing times are posted at the Coastguard lookout above the causeway." },
      { q: "Are dogs allowed on Rhossili beach?", a: "Yes, it is one of Swansea's dog-friendly beaches in summer." }
    ],
    sources: [
      { label: "The Beach Guide — Rhossili Bay", url: "https://www.thebeachguide.co.uk/south-wales/glamorgan/rhossili-bay.htm" },
      { label: "Swansea Council — dog-friendly beaches", url: "https://www.swansea.gov.uk/article/29164/Dog-friendly-beaches-in-Swansea-from-May-1" },
      { label: "Visit Wales — Rhossili Bay", url: "https://www.visitwales.com/attraction/beach/rhossili-bay-beach-557651" }
    ]
  },
  {
    slug: "caswell-bay",
    name: "Caswell Bay",
    region: "wales", subRegion: "gower",
    area: "South Gower, near Swansea",
    path: "/guides/surfing-caswell-bay/", outFile: "guides/surfing-caswell-bay/index.html",
    geo: [51.5695, -4.0310],
    title: "Caswell Bay Guide: Lifeguarded Gower Surf Beach | Surfbooker",
    description: "Caswell Bay near Swansea: a sheltered, lifeguarded sandy bay with a surf school, year-round café, showers and a summer dog ban. Parking tips, surf conditions and nearby beaches.",
    heroIntro: "A compact, sandy bay a few minutes from Swansea, with lifeguards in summer, a surf school, showers and a café open all year.",
    heroAlt: "Caswell Bay with green cliffs and the beach on an overcast day",
    images: { hero: lic("caswell-bay") },
    glance: [
      ["Best for", "Beginners, families"],
      ["Break", "South-facing bay break"],
      ["Lifeguards", "Seasonal, May to early September"],
      ["Dogs", "Not allowed 1 May–30 Sep"],
      ["Parking", "One car park — arrive before 10am"],
      ["Facilities", "Toilets, showers, café, shop"]
    ],
    overview: [
      "Caswell Bay is a small, south-facing sandy bay on the south Gower coast, about 20 minutes from Swansea city centre. Wooded valleys and cliffs frame the beach, and everything you need — toilets, outdoor showers, a café that opens year-round, a beach shop and a first aid point — is at the back of the sand.",
      "That combination, plus a seasonal lifeguard service, makes it one of the best beaches on the Gower for families and first surf lessons. The catch is parking: there is a single car park, and on sunny days it is often full by mid-morning."
    ],
    suits: ["First surf lessons", "Families with young children", "Swansea day-trippers using the bus"],
    notFor: ["Dog walkers in summer", "Late arrivals on hot days — the car park fills"],
    surf: {
      text: ["Caswell faces south and needs a decent south-west swell to work, but when it does it produces friendly waves that suit learners. The beach shrinks considerably at high tide, so lower tides are usually better for both surfing and space."],
      cards: [
        { label: "Level", title: "Beginner friendly", text: "A surf school runs lessons year-round, and lifeguards patrol in season." },
        { label: "Conditions", title: "South-west swell, northerly wind", text: "Sheltered from westerly winds compared with exposed west Gower." },
        { label: "Hazards", title: "High tide", text: "At high tide the beach is much smaller and rocks become more of a factor." }
      ]
    },
    lessons: { text: ["A surf school operates from the beach and runs lessons year-round for beginners — check who is operating when you book."] },
    practical: [
      { label: "Parking", title: "One car park", text: "There's one car park with reasonable capacity; once it's full there is nowhere else, so arrive before 10am on busy days." },
      { label: "Facilities", title: "Showers, toilets, café", text: "Public toilets, outdoor showers, a first aid point, a year-round café and beach shop." },
      { label: "Lifeguards", title: "May to early September", text: "Seasonal lifeguard service; swim between the red and yellow flags." },
      { label: "Dogs", title: "Summer ban", text: "Dogs are not permitted on the beach from 1 May to 30 September and must be on leads on the promenade." }
    ],
    stay: {
      areas: [
        { label: "Village", title: "Mumbles", text: "About 10 minutes away, with hotels, B&Bs, restaurants and bars." },
        { label: "City", title: "Swansea", text: "The biggest choice of accommodation, about 20 minutes away." }
      ]
    },
    todo: [
      { label: "Walk", title: "Coast path to Langland", text: "A clifftop path links Caswell with Langland Bay and on to Mumbles." },
      { label: "Day out", title: "Mumbles", text: "Pier, ice cream, Oystermouth Castle and the seafront promenade." }
    ],
    travel: [
      { label: "By bus", title: "From Swansea", text: "Caswell is reachable by bus from Swansea." },
      { label: "By car", title: "Via Bishopston", text: "About 20 minutes from Swansea city centre." }
    ],
    nearby: [
      { name: "Langland Bay", href: "/guides/surfing-langland-bay/", distance: "Coast path walk", text: "Swansea's best-known surf bay, with beach huts and a brasserie." },
      { name: "Oxwich Bay", href: "/guides/surfing-oxwich-bay/", distance: "About 20 minutes' drive", text: "A huge, sheltered bay that works in big storms." }
    ],
    faqs: [
      { q: "Are dogs allowed at Caswell Bay?", a: "Not between 1 May and 30 September. Outside those dates they are welcome; dogs must be on leads on the promenade." },
      { q: "Is Caswell Bay good for beginners?", a: "Yes — it is sheltered, has seasonal lifeguards and a surf school runs lessons year-round." },
      { q: "What time should I arrive to park?", a: "Before 10am on busy days. There is only one car park." }
    ],
    sources: [
      { label: "The Beach Guide — Caswell Bay", url: "https://www.thebeachguide.co.uk/south-wales/glamorgan/caswell-bay.htm" },
      { label: "Swansea Council — dogs on beaches", url: "https://www.swansea.gov.uk/dogsonbeaches" },
      { label: "Enjoy Gower — Caswell Bay", url: "https://enjoygower.com/caswell-bay" }
    ]
  },
  {
    slug: "langland-bay",
    name: "Langland Bay",
    region: "wales", subRegion: "gower",
    area: "Mumbles, Swansea",
    path: "/guides/surfing-langland-bay/", outFile: "guides/surfing-langland-bay/index.html",
    geo: [51.5672, -4.0118],
    title: "Langland Bay Surf Guide: Swansea's Local Break | Surfbooker",
    description: "Langland Bay near Mumbles: Swansea's busiest surf spot, with beach huts, Langland Brasserie, lifeguards in summer and a dog ban May–September. Parking, surf and nearby beaches.",
    heroIntro: "Swansea's local surf beach — green-and-white beach huts, a busy line-up and a clifftop path to Caswell.",
    heroAlt: "The row of beach huts above the sand at Langland Bay",
    images: { hero: lic("langland-bay") },
    glance: [
      ["Best for", "Improvers, families"],
      ["Break", "Bay break with reef sections"],
      ["Lifeguards", "May Day bank holiday–early Sept, 10am–6pm"],
      ["Dogs", "Not allowed 1 May–30 Sep"],
      ["Parking", "Two large car parks"],
      ["Facilities", "Brasserie, showers, toilets, huts"]
    ],
    overview: [
      "Langland Bay sits just west of Mumbles at the start of the Gower, a short drive from Swansea. A promenade lined with traditional beach huts runs behind the sand, with the Langland Brasserie, toilets, showers and even tennis courts for hire.",
      "It is Swansea's local surf beach, so when the waves are good the line-up gets busy. At high tide the beach splits from neighbouring Rotherslade."
    ],
    suits: ["Improving surfers", "Families wanting facilities and lifeguards", "Walkers on the Mumbles–Caswell coast path"],
    notFor: ["Quiet surf sessions on good days", "Dog walkers in summer"],
    surf: {
      text: ["Langland picks up south-westerly swell and has several waves across the bay, including reef sections. The quality is good but the line-up can be crowded, so beginners should stick to the inside and the lifeguarded area."],
      cards: [
        { label: "Level", title: "Improvers and locals", text: "Learners can use the inside on small days; the reef sections are for experienced surfers." },
        { label: "Etiquette", title: "Busy local break", text: "Respect priority and avoid dropping in — it's a community spot." }
      ]
    },
    practical: [
      { label: "Parking", title: "Two large car parks", text: "Reached by winding roads from Mumbles." },
      { label: "Facilities", title: "Plenty", text: "Toilets with accessible facilities, outdoor showers, first aid post, lost child centre, shops and the Langland Brasserie." },
      { label: "Lifeguards", title: "Seasonal", text: "From the May Day bank holiday to early September, 10am–6pm." },
      { label: "Dogs", title: "Summer ban", text: "Not permitted 1 May–30 September; on leads on the promenade." }
    ],
    stay: { areas: [{ label: "Village", title: "Mumbles", text: "Hotels, B&Bs and restaurants a few minutes away." }, { label: "City", title: "Swansea", text: "The widest choice, about 15 minutes away." }] },
    food: { places: [{ name: "Langland Brasserie", type: "Restaurant", note: "At the back of the beach." }] },
    todo: [
      { label: "Walk", title: "Clifftop path", text: "Walk east to Mumbles Head or west to Caswell Bay." },
      { label: "Day out", title: "Mumbles", text: "Pier, castle and seafront cafés." }
    ],
    travel: [{ label: "By car", title: "From Mumbles", text: "Follow signs from Mumbles; roads are narrow and winding." }],
    nearby: [
      { name: "Caswell Bay", href: "/guides/surfing-caswell-bay/", distance: "Coast path walk", text: "A beginner-friendly bay with a surf school." },
      { name: "Gower guide", href: "/guides/wales/gower/", text: "All Gower beaches." }
    ],
    faqs: [
      { q: "Are there lifeguards at Langland?", a: "Yes, from the May Day bank holiday to early September, 10am–6pm." },
      { q: "Can I take my dog to Langland Bay?", a: "Not between 1 May and 30 September." }
    ],
    sources: [
      { label: "The Beach Guide — Langland Bay", url: "https://www.thebeachguide.co.uk/south-wales/glamorgan/langland-bay.htm" },
      { label: "Swansea Council — dogs on beaches", url: "https://www.swansea.gov.uk/dogsonbeaches" }
    ]
  },
  {
    slug: "oxwich-bay",
    name: "Oxwich Bay",
    region: "wales", subRegion: "gower",
    area: "South Gower",
    path: "/guides/surfing-oxwich-bay/", outFile: "guides/surfing-oxwich-bay/index.html",
    geo: [51.5570, -4.1605],
    title: "Oxwich Bay Guide: Sheltered Gower Beach, Parking & Surf | Surfbooker",
    description: "Oxwich Bay on the Gower: a huge sheltered bay with dunes and a nature reserve, private beach car park, watersports, no lifeguards and occasional storm-swell surf.",
    heroIntro: "Two and a half miles of sand and dunes in a sheltered south Gower bay — a family and watersports beach that only surfs in big storms.",
    heroAlt: "Rocky foreshore and sandy beach of Oxwich Bay under cloud",
    images: { hero: lic("oxwich-bay") },
    glance: [
      ["Best for", "Families, paddlesports, walkers"],
      ["Break", "Sheltered bay — surf only in big swells"],
      ["Lifeguards", "None"],
      ["Dogs", "Seasonal restrictions apply — check signs"],
      ["Parking", "Large private car park at the beach"],
      ["Nature", "Dunes and national nature reserve"]
    ],
    overview: [
      "Oxwich Bay is one of the biggest beaches on the Gower, a long curve of sand backed by dunes, salt marsh and woodland that form part of a national nature reserve. A private car park sits right behind the beach, with a café, restaurant and toilets.",
      "Because it faces south-east, Oxwich is well sheltered from the prevailing swell. It is a favourite for families, kayaks, paddleboards and sailing, and only has surf when a big south-west storm wraps in — at which point it can be busy."
    ],
    suits: ["Families on calm days", "Kayaking, SUP and sailing", "Walkers exploring the dunes and Oxwich Castle"],
    notFor: ["Regular surf", "Lifeguarded swimming — there is no lifeguard service", "High-top vans (banned from the car park)"],
    surf: { text: ["When a big south-west swell hits and other beaches are huge or blown out, Oxwich can produce a sheltered, popular wave. Most of the time it is flat."] },
    practical: [
      { label: "Parking", title: "Private beach car park", text: "A large car park right behind the beach with a daily charge. High-top vans are not allowed; pop-tops are permitted." },
      { label: "Facilities", title: "Café, restaurant, toilets", text: "A beachside café and restaurant/bar, plus toilets." },
      { label: "Lifeguards", title: "None", text: "There is no lifeguard service at Oxwich Bay." },
      { label: "Dogs", title: "Check the signs", text: "Swansea Council applies seasonal restrictions on some beaches — follow the signs at the car park entrance to the beach." }
    ],
    stay: { areas: [{ label: "On the bay", title: "Oxwich Bay Hotel and campsites", text: "A hotel and camping close to the beach." }, { label: "Nearby", title: "Port Eynon and Reynoldston", text: "Holiday lets and pubs within 15 minutes." }] },
    food: { places: [{ name: "The Beach House", type: "Restaurant", note: "Restaurant at Oxwich beach that has been recognised by the Michelin Guide — book ahead." }, { name: "Beach café", type: "Café", note: "Snacks and drinks by the car park." }] },
    todo: [
      { label: "History", title: "Oxwich Castle", text: "A Tudor courtyard house managed by Cadw, above the village." },
      { label: "Nature", title: "Oxwich National Nature Reserve", text: "Dunes, marsh and woodland behind the beach." }
    ],
    travel: [{ label: "By car", title: "From Swansea", text: "About 35 minutes via the A4118." }],
    nearby: [
      { name: "Port Eynon", href: "/guides/surfing-port-eynon/", distance: "About 10 minutes' drive", text: "A lifeguarded summer beach with a village." },
      { name: "Caswell Bay", href: "/guides/surfing-caswell-bay/", distance: "About 20 minutes' drive", text: "Beginner-friendly with lessons." }
    ],
    faqs: [
      { q: "Can you surf at Oxwich?", a: "Only when a big south-west swell wraps into the bay. It is usually flat, which suits families and paddlesports." },
      { q: "Are there lifeguards at Oxwich Bay?", a: "No." },
      { q: "Can I park a high-top van at Oxwich?", a: "No — high-top vans are banned from the beach car park, though pop-top campers are allowed." }
    ],
    sources: [
      { label: "The Beach Guide — Oxwich Bay", url: "https://www.thebeachguide.co.uk/south-wales/glamorgan/oxwich-bay.htm" },
      { label: "Wikipedia — Oxwich Bay", url: "https://en.wikipedia.org/wiki/Oxwich_Bay" },
      { label: "Swansea Council — dogs on beaches", url: "https://www.swansea.gov.uk/dogsonbeaches" }
    ]
  },
  {
    slug: "port-eynon",
    name: "Port Eynon",
    region: "wales", subRegion: "gower",
    area: "South Gower",
    path: "/guides/surfing-port-eynon/", outFile: "guides/surfing-port-eynon/index.html",
    geo: [51.5440, -4.2105],
    title: "Port Eynon Beach Guide: Lifeguards, Surf, Dogs & Parking | Surfbooker",
    description: "Port Eynon on the Gower: a lifeguarded village beach joined to Horton, with surf on south-west swells, a slipway, campsite, pub and seasonal dog zones.",
    heroIntro: "A cheerful village beach on the south Gower, joined to Horton at low tide, with lifeguards in summer and a slipway for boats.",
    heroAlt: "Families and a beach kite on the sand at Port Eynon, with the village above",
    images: { hero: lic("port-eynon") },
    glance: [
      ["Best for", "Families, beginners on small days"],
      ["Break", "South-facing bay break"],
      ["Lifeguards", "Seasonal"],
      ["Dogs", "Allowed except a summer zone — check signs"],
      ["Parking", "Pay car park with disabled bays"],
      ["Facilities", "Toilets, café, pub, campsite"]
    ],
    overview: [
      "Port Eynon is a small village at the end of the road on the south Gower, where a sandy bay curves round to the neighbouring village of Horton. Behind the beach are a pay car park, toilets, cafés, a campsite and a pub, and a small slipway is used to launch diving and sailing boats.",
      "It is one of the Gower's most family-friendly beaches, with a seasonal lifeguard service and first aid post. At the western end are the ruined Salt House and, further along the coast path, the sea cave of Culver Hole."
    ],
    suits: ["Families", "Beginners on small days", "Divers, kayakers and sailors"],
    notFor: ["Big, consistent surf — west Gower is more exposed"],
    surf: { text: ["Port Eynon faces south and needs a solid south-west swell. When it works, the waves are gentle and good for learners and longboarders; when Llangennith is too big, it can be the sensible option."] },
    practical: [
      { label: "Parking", title: "Pay car park", text: "With disabled spaces, behind the beach." },
      { label: "Facilities", title: "Toilets and first aid", text: "Toilets with accessible facilities, lifeguard station and first aid post, cafés and restaurants." },
      { label: "Lifeguards", title: "Seasonal", text: "Port Eynon has a seasonal lifeguard service — check RNLI dates." },
      { label: "Dogs", title: "Summer zone", text: "Dogs are restricted on part of the beach between 1 May and 30 September. Follow the zone signs at the steps." }
    ],
    stay: { areas: [{ label: "Village", title: "Campsite and holiday lets", text: "A campsite is close to the beach, and there's a youth hostel in the old lifeboat station." }, { label: "Nearby", title: "Horton and Oxwich", text: "More cottages within walking or short driving distance." }] },
    food: { places: [{ name: "The Ship Inn", type: "Pub", note: "The village pub, a short walk from the beach." }] },
    todo: [
      { label: "Walk", title: "Culver Hole and the Salt House", text: "Follow the coast path west from the beach to the ruins of the Salt House and the walled sea cave of Culver Hole (reach it only at low tide)." },
      { label: "Walk", title: "Horton", text: "Walk east along the sand to the neighbouring village of Horton." }
    ],
    travel: [{ label: "By car", title: "From Swansea", text: "About 40 minutes via the A4118, which ends at the village." }, { label: "By bus", title: "From Swansea", text: "Buses run from Swansea to Port Eynon; check current times." }],
    nearby: [
      { name: "Oxwich Bay", href: "/guides/surfing-oxwich-bay/", distance: "About 10 minutes' drive", text: "A huge sheltered bay with a nature reserve." },
      { name: "Rhossili Bay", href: "/guides/surfing-rhossili-bay/", distance: "About 15 minutes' drive", text: "Worm's Head and Gower's most famous view." }
    ],
    faqs: [
      { q: "Are there lifeguards at Port Eynon?", a: "Yes, there is a seasonal lifeguard service." },
      { q: "Can I take my dog to Port Eynon?", a: "Yes, outside the signed restricted zone between 1 May and 30 September." }
    ],
    sources: [
      { label: "The Beach Guide — Port Eynon", url: "https://www.thebeachguide.co.uk/south-wales/glamorgan/port-eynon.htm" },
      { label: "Swansea Council — dogs on beaches", url: "https://www.swansea.gov.uk/dogsonbeaches" },
      { label: "Wikipedia — Port Eynon", url: "https://en.wikipedia.org/wiki/Port_Eynon" }
    ]
  },
  {
    slug: "rest-bay-porthcawl",
    name: "Rest Bay",
    fullName: "Rest Bay, Porthcawl",
    region: "wales", subRegion: "south-wales-coast",
    area: "Porthcawl, Bridgend",
    path: "/guides/surfing-rest-bay-porthcawl/", outFile: "guides/surfing-rest-bay-porthcawl/index.html",
    geo: [51.4890, -3.7240],
    title: "Rest Bay Porthcawl Surf Guide: Lessons, Parking & Facilities | Surfbooker",
    description: "Rest Bay in Porthcawl: a west-facing Blue Flag surf beach with a council watersports centre, Porthcawl Surf School, changing cubicles, café and pay parking. Surf notes and tips.",
    heroIntro: "South Wales' most accessible surf beach — west-facing sand beside a watersports centre with showers, changing, hire, lessons and a café.",
    heroAlt: "Rest Bay seen from the coastal path, with rocky foreshore, grassland and the watersports centre",
    images: { hero: lic("rest-bay-porthcawl") },
    glance: [
      ["Best for", "Beginners to experienced"],
      ["Break", "West-facing beach break with rocky reefs"],
      ["Lifeguards", "Seasonal (check RNLI dates)"],
      ["Facilities", "Watersports centre, café, changing, showers"],
      ["Parking", "Pay and display at the beach"],
      ["Status", "Blue Flag beach"]
    ],
    overview: [
      "Rest Bay is a long, west-facing sandy beach on the western edge of Porthcawl, the seaside town halfway between Swansea and Cardiff. It is the most popular surf beach in south Wales for good reason: it picks up swell from the Bristol Channel's open end and has better facilities than almost anywhere else on this coast.",
      "Bridgend County Borough Council runs the Rest Bay Watersports Centre at the back of the beach, with changing cubicles, outdoor showers, a café/bistro, cycle storage, surf hire and year-round lessons from Porthcawl Surf School. Royal Porthcawl Golf Club's links sit just inland."
    ],
    suits: ["First surf lessons, with hire and changing on site", "Day trips from Cardiff, Swansea and Bristol", "Improvers wanting consistent waves", "Families who value showers and a café"],
    notFor: ["Quiet sessions on summer weekends", "Swimming at low tide over the rocks"],
    surf: {
      text: [
        "Rest Bay faces west and catches Atlantic swell funnelling up the Bristol Channel, making it one of the more consistent spots between the Gower and Cardiff. There are rocky reefs and shelves among the sand, especially towards low tide, which give shape to the waves but need care.",
        "The Bristol Channel's big tidal range changes the beach dramatically through the day — check tide times and watch where the rocks are before you paddle out."
      ],
      cards: [
        { label: "Level", title: "All levels", text: "Lessons on the inside on small days; more experienced surfers on the outer banks and reefs." },
        { label: "Conditions", title: "West swell, light easterly wind", text: "Tide matters a lot here — the beach changes quickly with the large tidal range." },
        { label: "Hazards", title: "Rocks and a big tidal range", text: "Rocky ledges are exposed on lower tides. Swim and surf within the flagged areas when lifeguards are on duty." }
      ]
    },
    lessons: {
      providers: [
        { name: "Porthcawl Surf School", type: "Surf school & hire", url: "https://www.visitwales.com/activity/activity/porthcawl-surf-school-556451", note: "Runs surf hire and year-round classes from the Rest Bay Watersports Centre, according to Bridgend Council." }
      ]
    },
    practical: [
      { label: "Parking", title: "Pay and display", text: "A pay-and-display car park sits behind the beach." },
      { label: "Facilities", title: "Watersports centre", text: "Changing cubicles, external showers, cycle storage and the Rest Bay Café Bar/bistro, run by Bridgend County Borough Council." },
      { label: "Lifeguards", title: "Seasonal", text: "Lifeguards patrol in the summer season — check RNLI dates and use the flags." },
      { label: "Dogs", title: "Check the signs", text: "Seasonal dog restrictions apply on some Bridgend beaches. Follow the signs at the beach entrance." }
    ],
    stay: { areas: [{ label: "Town", title: "Porthcawl", text: "Hotels, B&Bs and holiday parks within a mile of the beach, plus pubs and restaurants in town." }] },
    food: { places: [{ name: "Rest Bay Café Bar", type: "Café bar", url: "https://www.bridgend.gov.uk/residents/leisure-culture-and-libraries/rest-bay-watersports-centre", note: "In the Watersports Centre, with views over the bay." }] },
    todo: [
      { label: "Walk", title: "Wales Coast Path", text: "Walk north along the coast towards Sker and Kenfig National Nature Reserve's dunes." },
      { label: "Town", title: "Porthcawl seafront", text: "Promenade, harbour and Coney Beach." }
    ],
    travel: [
      { label: "By car", title: "M4 junction 37", text: "Porthcawl is about 10 minutes from junction 37 of the M4." },
      { label: "By train", title: "Pyle or Bridgend", text: "The nearest stations are Pyle and Bridgend, then bus or taxi." }
    ],
    nearby: [
      { name: "Caswell Bay", href: "/guides/surfing-caswell-bay/", distance: "About 45 minutes' drive", text: "Gower's beginner-friendly bay." },
      { name: "South Wales coast guide", href: "/guides/wales/south-wales-coast/", text: "More south Wales beaches." }
    ],
    faqs: [
      { q: "Can I hire a board at Rest Bay?", a: "Yes. Surf hire and year-round lessons run from the Rest Bay Watersports Centre with Porthcawl Surf School." },
      { q: "Are there showers at Rest Bay?", a: "Yes — external showers and changing cubicles at the Watersports Centre." },
      { q: "Is Rest Bay good for beginners?", a: "Yes, with a lesson and on suitable days. Watch for rocks on lower tides." }
    ],
    sources: [
      { label: "Bridgend Council — Rest Bay Watersports Centre", url: "https://www.bridgend.gov.uk/residents/leisure-culture-and-libraries/rest-bay-watersports-centre" },
      { label: "Wikipedia — Rest Bay", url: "https://en.wikipedia.org/wiki/Rest_Bay" },
      { label: "Visit Wales — Porthcawl Surf School", url: "https://www.visitwales.com/activity/activity/porthcawl-surf-school-556451" }
    ]
  },
  {
    slug: "rhosneigr",
    name: "Rhosneigr",
    region: "wales", subRegion: "north-wales",
    area: "West Anglesey",
    path: "/guides/surfing-rhosneigr/", outFile: "guides/surfing-rhosneigr/index.html",
    geo: [53.2280, -4.5080],
    title: "Rhosneigr Surf & Kitesurf Guide, Anglesey | Surfbooker",
    description: "Rhosneigr on Anglesey: two sandy beaches for surf, kitesurfing and windsurfing, free village parking, no lifeguards, dogs welcome, cafés and getting there by train.",
    heroIntro: "Anglesey's watersports village — two west-facing beaches, wind and swell from the Irish Sea, and cafés a short walk from the sand.",
    heroAlt: "Windsurfers off the rocky shore at Rhosneigr, Anglesey",
    images: { hero: lic("rhosneigr") },
    glance: [
      ["Best for", "Kite/windsurfers, improvers"],
      ["Break", "Beach break with rocky ends"],
      ["Lifeguards", "None"],
      ["Dogs", "Allowed all year (Traeth Llydan)"],
      ["Parking", "Free village car park"],
      ["Rail", "Rhosneigr station on the Holyhead line"]
    ],
    overview: [
      "Rhosneigr is a small seaside village on the west coast of Anglesey, best known as one of the UK's top spots for windsurfing and kitesurfing. Two sandy beaches meet at the village: Traeth Llydan (Broad Beach) to the south and Traeth Crigyll to the north, with rocky outcrops between.",
      "The village has cafés, shops, a pub and watersports shops. Surfers come when a south-westerly or westerly swell pushes into the Irish Sea; when it is windy, the kites take over. RAF Valley is next door, so expect the occasional fast jet overhead."
    ],
    suits: ["Kitesurfers and windsurfers", "Surfers chasing Irish Sea swell", "Families on calm days, with dogs welcome"],
    notFor: ["Anyone wanting lifeguard cover", "Glassy surf on windy days"],
    surf: {
      text: ["Rhosneigr needs a decent south-westerly or westerly swell, which is less frequent in the Irish Sea than on Atlantic coasts. It is best with light easterly winds. Rocks at each end of the beaches need care, and the water-sports zoning includes a marked boat lane."],
      cards: [
        { label: "Level", title: "Improvers and above", text: "No lifeguards — beginners should go with a school." },
        { label: "Zoning", title: "Marked lanes", text: "Water sports are zoned and a boat lane is marked out; follow the signs." },
        { label: "Hazards", title: "Rocky outcrops", text: "Rocks at either end of the beach." }
      ]
    },
    lessons: { text: ["Boards can be hired at the beach, and the village has watersports shops offering kit, hire and tuition — particularly for windsurfing and kitesurfing. Check current operators locally."] },
    practical: [
      { label: "Parking", title: "Free in the village", text: "Free parking for about 100 cars in the village centre, plus roadside parking on roads to the beach. There are no disabled bays and it is busy at peak times." },
      { label: "Lifeguards", title: "None", text: "There is no lifeguard service at Traeth Llydan." },
      { label: "Dogs", title: "Welcome", text: "Dogs are allowed on Traeth Llydan all year." }
    ],
    stay: { areas: [{ label: "Village", title: "Rhosneigr", text: "Holiday lets, B&Bs and nearby caravan parks; book early for summer and kite events." }] },
    todo: [
      { label: "Walk", title: "Anglesey Coast Path", text: "The coast path runs through Rhosneigr — head south towards Aberffraw's dunes." },
      { label: "Nature", title: "Llyn Maelog", text: "A lake right behind the village with walks and birdlife." }
    ],
    travel: [
      { label: "By train", title: "Rhosneigr station", text: "On the North Wales Coast line towards Holyhead, a short walk from the beach." },
      { label: "By car", title: "A55", text: "Leave the A55 for the A4080 to Rhosneigr." }
    ],
    nearby: [
      { name: "Hell's Mouth", href: "/guides/surfing-hells-mouth-porth-neigwl/", distance: "About 1 hour 30 minutes' drive", text: "Llŷn Peninsula's most consistent surf beach." },
      { name: "North Wales guide", href: "/guides/wales/north-wales/", text: "More North Wales beaches." }
    ],
    faqs: [
      { q: "Are there lifeguards at Rhosneigr?", a: "No, there is no lifeguard service." },
      { q: "Can I get to Rhosneigr by train?", a: "Yes, Rhosneigr station is on the line to Holyhead, a short walk from the beach." },
      { q: "Is parking free?", a: "The village-centre car park is free, but it fills at peak times." }
    ],
    sources: [
      { label: "The Beach Guide — Rhosneigr (Traeth Llydan)", url: "https://www.thebeachguide.co.uk/north-wales/anglesey/rhosneigr.htm" },
      { label: "The Beach Guide — Traeth Crigyll", url: "https://www.thebeachguide.co.uk/north-wales/anglesey/treath-crigyll-rhosneigr.htm" },
      { label: "Go North Wales — Rhosneigr Beach", url: "https://www.gonorthwales.co.uk/things-to-do/rhosneigr-beach-p376911" }
    ]
  },
  {
    slug: "hells-mouth-porth-neigwl",
    name: "Hell's Mouth",
    fullName: "Porth Neigwl (Hell's Mouth)",
    region: "wales", subRegion: "north-wales",
    area: "Llŷn Peninsula, near Abersoch",
    path: "/guides/surfing-hells-mouth-porth-neigwl/", outFile: "guides/surfing-hells-mouth-porth-neigwl/index.html",
    geo: [52.8020, -4.5500],
    title: "Hell's Mouth (Porth Neigwl) Surf Guide, Llŷn | Surfbooker",
    description: "Hell's Mouth / Porth Neigwl near Abersoch: four miles of surf beach, small free car park, no toilets or lifeguards, strong rips, dogs welcome and where to stay on the Llŷn.",
    heroIntro: "Four miles of open sand on the Llŷn Peninsula, facing straight into the south-west swell — North Wales' most consistent surf beach.",
    heroAlt: "Porth Neigwl (Hell's Mouth), Llŷn Peninsula",
    images: { hero: "guides/_licensed-images/uk-destinations/hells-mouth-porth-neigwl.jpg" },
    glance: [
      ["Best for", "Intermediate to experienced surfers"],
      ["Break", "Exposed south-west-facing beach break"],
      ["Lifeguards", "None"],
      ["Dogs", "Allowed all year"],
      ["Facilities", "None — bring what you need"],
      ["Nearest village", "Abersoch, about 10 minutes"]
    ],
    overview: [
      "Porth Neigwl — better known as Hell's Mouth, a name earned from the ships it wrecked in the age of sail — is a four-mile bay of sand and stones on the south coast of the Llŷn Peninsula. It faces south-west, straight into the swell, which makes it the most consistent surf beach in North Wales.",
      "It is also completely undeveloped: a small free car park near Llanengan, no toilets, no food and no lifeguards. Abersoch, ten minutes away, has the shops, cafés, surf shops and accommodation."
    ],
    suits: ["Surfers who want the most reliable waves in North Wales", "Dog walkers — dogs are welcome all year", "Walkers looking for space and views towards Bardsey Island"],
    notFor: ["Swimming — undertows, cross-currents and rips are strong", "Families needing toilets or food", "Unsupervised beginners"],
    surf: {
      text: ["Hell's Mouth picks up south-westerly swell with renowned consistency, and surf schools use it regularly. Tides are large here, so check them before you go. The cliffs behind the beach are unstable — keep away from their base."],
      cards: [
        { label: "Level", title: "Intermediate upwards", text: "Learners should go with a surf school that knows the beach." },
        { label: "Hazards", title: "Rips and unstable cliffs", text: "The council warns of strong undertows, cross-currents and rips; there is a warning sign at the entrance." }
      ]
    },
    lessons: { text: ["Surf schools operate at the beach and there are surf shops in Abersoch for hire and kit — check current providers locally."] },
    practical: [
      { label: "Parking", title: "Small free car park", text: "About half a mile from Llanengan village; congested in summer." },
      { label: "Facilities", title: "None", text: "No toilets or food at the beach." },
      { label: "Lifeguards", title: "None", text: "There are no lifeguards." },
      { label: "Dogs", title: "Welcome", text: "Dog friendly all year round." }
    ],
    stay: { areas: [{ label: "Village", title: "Abersoch", text: "Holiday lets, hotels, campsites and the main shops and cafés, about 10 minutes away." }, { label: "Camping", title: "Farm campsites", text: "Several campsites near Llanengan and around the bay." }] },
    todo: [
      { label: "Village", title: "Abersoch", text: "A sailing village with cafés and a harbour beach." },
      { label: "Walk", title: "Wales Coast Path", text: "Views towards Bardsey Island from the headlands of the Llŷn." }
    ],
    travel: [{ label: "By car", title: "Via Abersoch", text: "Follow lanes west from Abersoch towards Llanengan; the car park is about 10 minutes' drive." }],
    nearby: [{ name: "Rhosneigr", href: "/guides/surfing-rhosneigr/", distance: "About 1 hour 30 minutes' drive", text: "Anglesey's kite and surf village." }, { name: "North Wales guide", href: "/guides/wales/north-wales/", text: "More North Wales beaches." }],
    faqs: [
      { q: "Why is it called Hell's Mouth?", a: "The English name comes from its reputation for wrecking sailing ships driven into the bay by south-westerly gales." },
      { q: "Are there toilets at Hell's Mouth?", a: "No. There are no facilities, so bring what you need or plan around Abersoch." },
      { q: "Is it safe to swim?", a: "Swimming is hazardous because of strong undertows, cross-currents and rips. There are no lifeguards." }
    ],
    sources: [
      { label: "Abersoch.com — Porth Neigwl", url: "https://abersoch.com/porth-neigwl/" },
      { label: "Visit Wales — Porth Neigwl (Hell's Mouth)", url: "https://www.visitwales.com/attraction/beach/porth-neigwl-hells-mouth-beach-556341" }
    ]
  }
];

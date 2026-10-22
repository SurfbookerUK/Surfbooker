// Cornwall destination guides. Researched October 2026; facts carried over from Surfbooker's
// August–September 2026 checks were re-used only where they came from official/operator sources.
const img = (file) => `guides/_licensed-images/cornwall/${file}.jpg`;
const base = (slug, extra) => ({
  region: "cornwall",
  path: `/guides/surfing-${slug}/`,
  outFile: `guides/surfing-${slug}/index.html`,
  slug,
  ...extra
});
const RNLI = { label: "RNLI — find a lifeguarded beach", url: "https://rnli.org/find-my-nearest/lifeguarded-beaches" };
const DOGS = { label: "Cornwall Council — dogs on beaches (restrictions table)", url: "https://www.cornwall.gov.uk/environment/animal-welfare-and-enforcement/dogs-on-beaches/" };
const lessonsNote = "Surf schools marked 'Listed on Surfbooker' have profiles on this site with lesson formats and current-price guidance; Surfbooker passes enquiries on but has not reviewed them in person.";

export const destinations = [
  base("summerleaze-beach", {
    name: "Summerleaze",
    fullName: "Summerleaze Beach, Bude",
    area: "Bude, north Cornwall",
    geo: [50.8310, -4.5530],
    title: "Summerleaze Beach, Bude: Surf Lessons, Sea Pool & Parking | Surfbooker",
    description: "Summerleaze Beach in Bude: surf lessons with Big Blue and Bude Surfing Experience, the sea pool, parking and park-and-ride, dog lead rules, food and where to stay.",
    heroIntro: "Bude's town beach — a wide sandy bay at the mouth of the river and canal, with surf schools, the famous sea pool and the town a short walk away.",
    heroAlt: "Summerleaze Beach in Bude at low tide with houses and the breakwater behind",
    images: { hero: img("summerleaze") },
    glance: [
      ["Best for", "First lessons, families, town convenience"],
      ["Break", "Sandy beach break beside a river mouth"],
      ["Lifeguards", "Seasonal RNLI patrol"],
      ["Dogs", "On leads 21 May–30 Sep, 10am–6pm"],
      ["Parking", "Beach car park, Wharf, summer park & ride"],
      ["Also here", "Bude Sea Pool"]
    ],
    overview: [
      "Summerleaze is the beach right in front of Bude, at the point where the River Neet and the Bude Canal meet the sea. At low tide it is a huge expanse of sand stretching out past the breakwater; at high tide it shrinks back towards the sea pool and the beach huts.",
      "It is the easiest beach in north Cornwall to combine a surf lesson with a full family day: the town's cafés, shops and toilets are within a few minutes' walk, and Bude Sea Pool — a partly natural tidal pool built into the rocks — gives sheltered swimming when the sea is rough.",
      "The river mouth, the breakwater and moving sandbanks mean the surf changes a lot through the tide, so use the lifeguarded zones and let a school pick the spot if you are new."
    ],
    suits: ["Families mixing surf, sea-pool swimming and town", "First and second surf lessons", "Car-free visits within Bude"],
    notFor: ["Dog walkers wanting off-lead space in summer daytime", "Crowd-free surf on summer weekends"],
    surf: {
      text: [
        "Summerleaze faces west and picks up Atlantic swell, but the breakwater and Compass Point give the northern side some shelter. Banks form around the river channel and along the beach, so the best spot changes from week to week.",
        "Light easterly winds are offshore. On bigger days the river mouth can create strong currents — keep within the flagged areas."
      ],
      cards: [
        { label: "Level", title: "Beginners to improvers", text: "Two established schools teach here on suitable days." },
        { label: "Hazards", title: "River mouth and breakwater", text: "Keep clear of the channel and harbour activity, especially on an outgoing tide." },
        { label: "Swimming", title: "Bude Sea Pool", text: "A separate tidal pool in the rocks — check its own opening and safety information." }
      ]
    },
    surfbooker: { schools: ["big-blue-surf-school", "bude-surfing-experience"], lessonsPage: "/surf-lessons/summerleaze/", accommodation: "bude" },
    lessons: { note: lessonsNote },
    practical: [
      { label: "Parking", title: "Summerleaze car park & alternatives", text: "Summerleaze car park is right beside the beach; the Wharf car park and Bude's seasonal park-and-ride (which stops at Summerleaze and Crooklets) help on busy days." },
      { label: "Facilities", title: "Town on the doorstep", text: "Public toilets with accessible facilities, cafés and shops are close to the beach." },
      { label: "Lifeguards", title: "Seasonal RNLI patrol", text: "Swim between the red and yellow flags and surf between the black and white flags." },
      { label: "Dogs", title: "On leads in summer daytime", text: "Cornwall Council requires dogs on leads from 21 May to 30 September, 10am–6pm." }
    ],
    stay: {
      intro: "Bude has hotels, guesthouses, holiday parks and campsites within walking or short driving distance of the beach.",
      areas: [
        { label: "Town", title: "Bude", text: "Walk to the beach, sea pool and canal from central guesthouses and hotels." },
        { label: "Surf-first", title: "Widemouth Bay", text: "Ten minutes south, for a quieter base right by a bigger surf beach." }
      ]
    },
    food: { text: ["Cafés and takeaways are around the beach and canal, with more restaurants and pubs in the town centre a few minutes' walk away."] },
    todo: [
      { label: "Swim", title: "Bude Sea Pool", text: "A 1930s tidal pool built into the rocks below the cliffs, run by a community trust." },
      { label: "Walk", title: "Bude Canal", text: "A flat towpath walk inland from the sea lock — easy with a pushchair." },
      { label: "Walk", title: "Compass Point", text: "The coast path climbs to the Storm Tower for views over Summerleaze and the breakwater." }
    ],
    travel: [
      { label: "By car", title: "A39 Atlantic Highway", text: "Bude is just off the A39. Use the park-and-ride in summer." },
      { label: "By bus/rail", title: "Via Exeter or Bodmin Parkway", text: "There's no railway in Bude; buses connect with mainline stations — check current timetables." }
    ],
    nearby: [
      { name: "Widemouth Bay", href: "/guides/surfing-widemouth-bay/", distance: "About 10 minutes' drive", text: "Bude's bigger, more open surf beach." },
      { name: "Cornwall guide", href: "/guides/cornwall/", text: "Compare every Cornwall beach on Surfbooker." }
    ],
    faqs: [
      { q: "Can dogs go on Summerleaze beach?", a: "Yes, but they must be on leads between 10am and 6pm from 21 May to 30 September." },
      { q: "Is Summerleaze good for learning to surf?", a: "Yes on suitable days — Big Blue Surf School and Bude Surfing Experience both teach here, and there's a seasonal lifeguard patrol." },
      { q: "Where should I park?", a: "Summerleaze car park is beside the beach. On busy summer days the park-and-ride is the easier option." }
    ],
    sources: [DOGS, RNLI, { label: "Visit Bude", url: "https://www.visitbude.info/" }]
  }),
  base("widemouth-bay", {
    name: "Widemouth Bay",
    area: "Near Bude, north Cornwall",
    geo: [50.7930, -4.5610],
    title: "Widemouth Bay Surf Guide: Lessons, Parking & Dog Rules | Surfbooker",
    description: "Widemouth Bay near Bude: a long surf beach with OA Surf Club and Bude Surfing Experience, ramp access, large car park, summer dog ban and places to stay and eat.",
    heroIntro: "A long, open surf beach a few miles south of Bude, with reefs at either end, sandbanks in between and a ramp straight onto the sand.",
    heroAlt: "Waves breaking along Widemouth Bay with low cliffs and farmland behind",
    images: { hero: img("widemouth-bay") },
    glance: [
      ["Best for", "Lessons, improvers, surf-focused days"],
      ["Break", "Beach break between rocky reefs"],
      ["Lifeguards", "Seasonal RNLI patrol"],
      ["Dogs", "Not allowed 15 May–30 Sep, 10am–6pm"],
      ["Parking", "Large pay & display by the beach"],
      ["Access", "Level access with a ramp"]
    ],
    overview: [
      "Widemouth Bay (locals say 'Widmouth') is a wide sandy beach about three miles south of Bude, backed by low cliffs and farmland rather than a town. Rocky reefs at each end create rock pools at low tide, and the sand in between holds several shifting peaks.",
      "Everything is concentrated at the main access: a big car park, a ramp onto the sand, toilets, showers, a beach café, surf hire and two surf schools. It is a beach you come to for the surf rather than a resort day out."
    ],
    suits: ["Learners with a school", "Improvers wanting space and several peaks", "Accessible beach visits — level access and a ramp"],
    notFor: ["Daytime summer dog walks", "Town facilities — Bude is a short drive away"],
    surf: {
      text: ["Widemouth faces west and picks up plenty of Atlantic swell. The reefs at each end produce better-shaped waves for experienced surfers, while the central sandbanks suit lessons. Easterly winds are offshore; westerlies blow it out quickly."],
      cards: [
        { label: "Level", title: "All levels", text: "Schools teach on the central banks; reefs are for experienced surfers." },
        { label: "Hazards", title: "Reefs and rips", text: "Keep children away from reefs and surf craft and stay within the flags." }
      ]
    },
    surfbooker: { schools: ["oa-surf-club", "bude-surfing-experience"], lessonsPage: "/surf-lessons/widemouth-bay/", accommodation: "widemouth-bay" },
    lessons: { note: lessonsNote },
    practical: [
      { label: "Parking", title: "Large car park", text: "A large pay-and-display car park serves the main beach; Visit Bude lists cash, card and app payment." },
      { label: "Facilities", title: "Café, toilets, showers", text: "Toilets, showers, a beach café, surf hire and a hotel are around the main access; Visit Bude lists an accessible café and toilets." },
      { label: "Lifeguards", title: "Seasonal RNLI patrol", text: "Use the flags — the long beach invites a walk away from supervision, but the zone is the safe choice." },
      { label: "Dogs", title: "Summer daytime ban", text: "Dogs are prohibited 10am–6pm from 15 May to 30 September." }
    ],
    stay: { areas: [{ label: "At the beach", title: "Holiday parks and lets", text: "Several holiday parks and self-catering lets are a short walk from the sand." }, { label: "Town", title: "Bude", text: "About ten minutes away, with more choice and evening options." }] },
    todo: [
      { label: "Walk", title: "South West Coast Path", text: "Walk north towards Bude or south over the cliffs towards Millook and Crackington Haven." },
      { label: "Rock pools", title: "Low-tide reefs", text: "The reefs at each end are good for rock-pooling at low tide." }
    ],
    travel: [{ label: "By car", title: "From Bude", text: "Follow the coast road south from Bude, or turn off the A39." }],
    nearby: [
      { name: "Summerleaze", href: "/guides/surfing-summerleaze-beach/", distance: "About 10 minutes' drive", text: "Bude's town beach with the sea pool." },
      { name: "Polzeath", href: "/guides/surfing-polzeath/", distance: "About 50 minutes' drive", text: "North Cornwall's classic learner bay." }
    ],
    faqs: [
      { q: "Can I take a dog to Widemouth Bay?", a: "Not between 10am and 6pm from 15 May to 30 September. Outside those times dogs are welcome." },
      { q: "Is there wheelchair access?", a: "Visit Bude lists level access with a ramp onto the sand, plus accessible toilets and café at the main beach." }
    ],
    sources: [DOGS, RNLI, { label: "Visit Bude — Widemouth Bay", url: "https://www.visitbude.info/" }]
  }),
  base("polzeath", {
    name: "Polzeath",
    area: "Camel estuary, north Cornwall",
    geo: [50.5740, -4.9180],
    title: "Polzeath Surf Guide: Lessons, Parking, Dogs & Village | Surfbooker",
    description: "Polzeath in north Cornwall: a classic learner surf bay with Surf's Up and Wavehunters, a tide-dependent beach car park, summer dog ban, cafés and coast-path walks.",
    heroIntro: "One of Cornwall's best-known places to learn — a broad sandy bay with surf schools, shops and cafés a few steps from the sand.",
    heroAlt: "Families on the wide sands of Polzeath beach under a deep blue sky",
    images: { hero: img("polzeath") },
    glance: [
      ["Best for", "Beginners, families, longboarders"],
      ["Break", "Gentle, west-facing bay break"],
      ["Lifeguards", "Seasonal RNLI patrol"],
      ["Dogs", "Not allowed 15 May–30 Sep, 10am–6pm"],
      ["Parking", "Beach car park (tide-dependent) + village car parks"],
      ["Bus", "Route 96"]
    ],
    overview: [
      "Polzeath sits just outside the mouth of the Camel estuary, opposite Padstow. Its wide, west-facing bay has slow, rolling waves on most days, which is why it has been a favourite learning beach for decades. Surf shops, hire, cafés and the surf schools are all within a short walk of the sand.",
      "That popularity is the trade-off: the RNLI notes it can become very crowded, especially around high tide. Rock pools appear around the edges as the tide drops, and the coast path heads off in both directions towards Pentire Point and Daymer Bay."
    ],
    suits: ["Complete beginners and families", "Longboarders on small, clean days", "Park-once days with everything on foot"],
    notFor: ["Quiet water at high tide in summer", "Dog walks in summer daytime"],
    surf: {
      text: ["The bay faces west and the sand slopes gently, producing slower-breaking waves that suit learners. Banks shift with the seasons; rocky edges at each side need care. Light easterly winds are offshore."],
      cards: [
        { label: "Level", title: "Classic learner beach", text: "Surf's Up has taught here since 1995; Wavehunters also runs lessons." },
        { label: "Crowds", title: "Busiest around high tide", text: "Give lesson groups and families room, and follow the surf and swim zones." }
      ]
    },
    surfbooker: { schools: ["surfs-up-surf-school", "wavehunters"], hireProviders: ["wavehunters"], lessonsPage: "/surf-lessons/polzeath/", hirePage: "/surf-hire/polzeath/", accommodation: "polzeath" },
    lessons: { note: lessonsNote },
    practical: [
      { label: "Parking", title: "Beach car park", text: "Cornwall Council's beach car park is open 24 hours with a sand surface and tide-dependent capacity of up to about 260 spaces. Other village car parks help when it's full." },
      { label: "Facilities", title: "Village on the beach", text: "Public toilets in the village, cafés, restaurants and surf shops a short walk from the sand." },
      { label: "Lifeguards", title: "Seasonal RNLI patrol", text: "Surf between the black and white flags; swim between the red and yellow flags." },
      { label: "Dogs", title: "Summer daytime ban", text: "Dogs prohibited 10am–6pm from 15 May to 30 September." }
    ],
    stay: { areas: [{ label: "Village", title: "Polzeath & New Polzeath", text: "Holiday lets and a hotel overlooking the bay." }, { label: "Nearby", title: "Rock and Padstow", text: "Rock is a few minutes away; Padstow is across the estuary by ferry from Rock." }] },
    todo: [
      { label: "Walk", title: "Pentire Point and The Rumps", text: "A spectacular National Trust headland walk from New Polzeath." },
      { label: "Walk", title: "Daymer Bay and St Enodoc", text: "Walk round the estuary to Daymer Bay and the little church in the dunes." },
      { label: "Ferry", title: "Rock to Padstow", text: "The passenger ferry links Rock with Padstow's harbour." }
    ],
    travel: [{ label: "By bus", title: "Route 96", text: "The 96 bus serves Polzeath — check the current timetable." }, { label: "By car", title: "Via Wadebridge", text: "About 20 minutes from Wadebridge on the B3314; narrow lanes in summer." }],
    nearby: [
      { name: "Harlyn Bay", href: "/guides/surfing-harlyn-bay/", distance: "Across the estuary", text: "A more sheltered lesson beach west of Padstow." },
      { name: "Constantine Bay", href: "/guides/surfing-constantine-bay/", distance: "About 40 minutes by road", text: "Exposed and powerful — for experienced surfers." }
    ],
    faqs: [
      { q: "Is Polzeath good for beginners?", a: "It's one of Cornwall's classic learner beaches, with gentle waves on most days, two surf schools and a seasonal lifeguard patrol." },
      { q: "Can dogs go on Polzeath beach?", a: "Not between 10am and 6pm from 15 May to 30 September." },
      { q: "Can you park on the beach at Polzeath?", a: "Yes — the council beach car park has a sand surface. Its capacity depends on the tide." }
    ],
    sources: [DOGS, RNLI]
  }),
  base("harlyn-bay", {
    name: "Harlyn Bay",
    area: "Near Padstow, north Cornwall",
    geo: [50.5410, -4.9960],
    title: "Harlyn Bay Surf Guide: Lessons, Parking & Family Beach | Surfbooker",
    description: "Harlyn Bay near Padstow: a broad, comparatively sheltered sandy bay with Harlyn Surf School, seasonal lifeguards, close parking and nearby beaches for every condition.",
    heroIntro: "A broad sandy bay west of Padstow that is often calmer than its neighbours — a favourite for families and first lessons.",
    heroAlt: "Waves rolling into Harlyn Bay under a sky of white clouds",
    images: { hero: img("harlyn-bay") },
    glance: [
      ["Best for", "Families, beginners"],
      ["Break", "North-facing bay — more sheltered"],
      ["Lifeguards", "Seasonal"],
      ["Dogs", "Check entrance signs"],
      ["Parking", "Close to the beach"],
      ["Nearest town", "Padstow, about 3 miles"]
    ],
    overview: [
      "Harlyn Bay is a wide sandy beach on the coast west of Padstow, between Trevone and Trevose Head. Facing north, it is tucked away from the prevailing south-westerly winds and some of the swell, so it is often the calmer option when Constantine and Treyarnon round the headland are big and messy.",
      "Harlyn Surf School works from a permanent base here, and there is parking and seasonal food close to the sand. The flat sands and rock pools make it a good family beach even when you are not surfing."
    ],
    suits: ["Families and first-time surfers", "Days when south-westerly winds blow out the west-facing beaches"],
    notFor: ["Big-wave days for experienced surfers — try Constantine"],
    surf: {
      text: ["Because it faces north, Harlyn needs a decent swell to get waves, and it can be clean when south or south-westerly winds are blowing offshore. On big swells it becomes a sheltered alternative to the open beaches."],
      cards: [{ label: "Level", title: "Beginners and improvers", text: "Harlyn Surf School can confirm whether the bay is suitable on the day." }]
    },
    surfbooker: { schools: ["harlyn-surf-school"], lessonsPage: "/surf-lessons/harlyn-bay/" },
    lessons: { note: lessonsNote },
    practical: [
      { label: "Parking", title: "Close to the sand", text: "Parking is close to the beach; follow the operator's signs and keep lanes clear." },
      { label: "Facilities", title: "Seasonal food and toilets", text: "Seasonal food and toilets support a full beach day — check opening out of season." },
      { label: "Lifeguards", title: "Seasonal", text: "Check RNLI dates and swim between the flags." },
      { label: "Dogs", title: "Check signs", text: "Harlyn isn't in Cornwall Council's restrictions table — check the signs at the entrance for local rules." }
    ],
    stay: { areas: [{ label: "Town", title: "Padstow", text: "About 3 miles away — hotels, B&Bs and Padstow's famous food scene." }, { label: "Bay", title: "Harlyn and Trevone", text: "Holiday lets and campsites within walking distance of the beach." }] },
    todo: [
      { label: "Walk", title: "Trevose Head", text: "Walk west to the lighthouse on Trevose Head." },
      { label: "Town", title: "Padstow harbour", text: "Fishing harbour, food and the Camel Trail cycle route." }
    ],
    travel: [{ label: "By car", title: "From Padstow", text: "About 10 minutes west of Padstow on the B3276." }],
    nearby: [
      { name: "Constantine Bay", href: "/guides/surfing-constantine-bay/", distance: "About 10 minutes' drive", text: "More exposed — more swell, more power." },
      { name: "Polzeath", href: "/guides/surfing-polzeath/", distance: "Across the estuary", text: "Another classic learner bay." }
    ],
    faqs: [{ q: "Is Harlyn Bay sheltered?", a: "Comparatively — it faces north, so it's often calmer than the west-facing beaches nearby, but it still gets surf on bigger swells. Always check the day's conditions." }],
    sources: [DOGS, RNLI]
  }),
  base("constantine-bay", {
    name: "Constantine Bay",
    area: "Near Padstow, north Cornwall",
    geo: [50.5330, -5.0230],
    title: "Constantine Bay Surf Guide: Exposed North Cornwall Beach | Surfbooker",
    description: "Constantine Bay near Padstow: an exposed, powerful surf beach with dunes, seasonal lifeguards, limited parking and Treyarnon next door. Who it suits and safer alternatives.",
    heroIntro: "A wide, dune-backed bay three miles west of Padstow, fully open to the Atlantic — beautiful, powerful and not a default beginner beach.",
    heroAlt: "Panoramic view of Constantine Bay's dunes, sand and rocky foreshore",
    images: { hero: img("constantine-bay"), heroPosition: "50% 50%" },
    glance: [
      ["Best for", "Intermediate and experienced surfers"],
      ["Break", "Exposed beach break with rocks"],
      ["Lifeguards", "Seasonal"],
      ["Dogs", "Allowed all year (check signs)"],
      ["Parking", "Limited — arrive early or walk from Treyarnon"],
      ["Nearest town", "Padstow, about 3 miles"]
    ],
    overview: [
      "Constantine Bay is a wide sandy beach backed by dunes, with rocky reefs at its edges and Trevose Head to the north. It faces west into the Atlantic, so it gets more swell — and more powerful waves — than sheltered Harlyn round the corner.",
      "Facilities are limited compared with resort beaches: there are toilets, but parking is tight in summer. If the car park is full, the beach is about a ten-minute walk from Treyarnon Bay."
    ],
    suits: ["Intermediate and experienced surfers", "Walkers exploring the dunes and Trevose Head"],
    notFor: ["Beginners without an instructor — use Harlyn or Polzeath", "Visitors wanting cafés and shops on the beach"],
    surf: {
      text: ["Constantine picks up most west and north-west swells. Sandbanks between the rocks produce punchy waves, and rip currents form on bigger days. Easterly winds are offshore."],
      cards: [{ label: "Hazards", title: "Rips and rocks", text: "Stay within the flags when lifeguards are on duty and keep away from the rocky edges." }]
    },
    practical: [
      { label: "Parking", title: "Limited", text: "Parking is limited relative to summer demand. If full, walk ten minutes from Treyarnon." },
      { label: "Facilities", title: "Toilets", text: "Toilets at the beach; plan food and supplies yourself." },
      { label: "Lifeguards", title: "Seasonal", text: "Constantine has a seasonal lifeguard service." },
      { label: "Dogs", title: "Allowed", text: "Dogs are allowed all year according to The Beach Guide; Cornwall Council lists no restriction here. Check entrance signs." }
    ],
    stay: { areas: [{ label: "Nearby", title: "Treyarnon & Trevose", text: "Holiday lets, campsites and a youth hostel at Treyarnon Bay." }, { label: "Town", title: "Padstow", text: "The main base for hotels and restaurants." }] },
    todo: [{ label: "Walk", title: "Trevose Head lighthouse", text: "Follow the coast path north to the headland." }],
    travel: [{ label: "By car", title: "From Padstow", text: "About 3 miles west via St Merryn." }],
    nearby: [
      { name: "Harlyn Bay", href: "/guides/surfing-harlyn-bay/", distance: "About 10 minutes' drive", text: "More sheltered, with a surf school." },
      { name: "Mawgan Porth", href: "/guides/surfing-mawgan-porth/", distance: "About 20 minutes' drive", text: "A compact surf village bay." }
    ],
    faqs: [{ q: "Is Constantine Bay good for beginners?", a: "Not as a default. It's exposed and can be powerful. Beginners are better at Harlyn or Polzeath with a surf school." }],
    sources: [{ label: "The Beach Guide — Constantine Bay", url: "https://www.thebeachguide.co.uk/south-west-england/cornwall/constantine-bay.htm" }, RNLI, DOGS]
  }),
  base("mawgan-porth", {
    name: "Mawgan Porth",
    area: "Between Newquay and Padstow",
    geo: [50.4660, -5.0360],
    title: "Mawgan Porth Beach Guide: Surf, Parking & Places to Stay | Surfbooker",
    description: "Mawgan Porth near Newquay: a compact surf bay in its own valley with seasonal lifeguards, village parking, food and well-known hotels nearby.",
    heroIntro: "A compact sandy bay in its own valley between Newquay and Padstow, with the village, food and parking right by the beach.",
    heroAlt: "Mawgan Porth beach at low tide with the headland beyond",
    images: { hero: img("mawgan-porth") },
    glance: [
      ["Best for", "Families, improvers"],
      ["Break", "West-facing bay break"],
      ["Lifeguards", "Seasonal RNLI patrol"],
      ["Dogs", "Check entrance signs"],
      ["Parking", "Village car park by the beach"],
      ["Nearby", "Watergate Bay 5 minutes south"]
    ],
    overview: [
      "Mawgan Porth is a small village at the mouth of the Vale of Lanherne, with a sandy beach between grassy headlands. The village, parking and food are right at the back of the sand, so it is an easy park-and-beach day.",
      "It feels more self-contained than nearby Watergate Bay, and is known for its design-led hotels on the cliffs above. A stream crosses the beach — keep an eye on younger children around it."
    ],
    suits: ["Families wanting a simple beach day", "Improvers on suitable days", "Couples staying at the clifftop hotels"],
    surf: { text: ["Mawgan Porth picks up west swells and has several peaks across the bay when the banks are good. It's smaller than Watergate on most days. Beginners should arrange a lesson with a Newquay or Watergate school."] },
    surfbooker: { accommodation: "mawgan-porth" },
    practical: [
      { label: "Parking", title: "Village car park", text: "Parking sits right behind the beach — arrive early in summer." },
      { label: "Lifeguards", title: "Seasonal", text: "Follow the flags." },
      { label: "Dogs", title: "Check signs", text: "Mawgan Porth isn't in Cornwall Council's restrictions table; check entrance signs for local rules." }
    ],
    stay: { intro: "Several hotels and holiday lets overlook the bay — see Surfbooker's listings below." },
    todo: [
      { label: "Walk", title: "Bedruthan Steps", text: "The National Trust's Carnewas and Bedruthan Steps clifftop is a short drive or coast-path walk north." },
      { label: "Village", title: "St Mawgan", text: "A quiet village up the valley with a pub and church." }
    ],
    travel: [{ label: "By car", title: "B3276 coast road", text: "About 15 minutes north of Newquay; Newquay Airport is nearby." }],
    nearby: [
      { name: "Watergate Bay", href: "/guides/surfing-watergate-bay/", distance: "About 5 minutes' drive", text: "Two miles of sand with two surf schools." },
      { name: "Constantine Bay", href: "/guides/surfing-constantine-bay/", distance: "About 20 minutes' drive", text: "An exposed beach for experienced surfers." }
    ],
    faqs: [{ q: "Is there a surf school at Mawgan Porth?", a: "Surfbooker doesn't currently list a school based here; nearby Watergate Bay has two." }],
    sources: [RNLI, DOGS]
  }),
  base("watergate-bay", {
    name: "Watergate Bay",
    area: "Near Newquay",
    geo: [50.4430, -5.0440],
    title: "Watergate Bay Surf Guide: Lessons, Hire & Parking | Surfbooker",
    description: "Watergate Bay near Newquay: two miles of sand at low tide, Wavehunters and Westcountry Surf School, seasonal lifeguards, dogs welcome, central car park and food.",
    heroIntro: "Two miles of open sand at low tide, three miles north of Newquay, with surf schools, hire and food clustered at the central valley.",
    heroAlt: "The long beach at Watergate Bay seen from the clifftop on a bright day",
    images: { hero: img("watergate-bay") },
    glance: [
      ["Best for", "All levels, groups mixing surf and food"],
      ["Break", "Exposed north-west-facing beach break"],
      ["Lifeguards", "Seasonal"],
      ["Dogs", "Allowed all year"],
      ["Parking", "Main car park by the hotel"],
      ["Watch out", "Much of the beach disappears at high tide"]
    ],
    overview: [
      "Watergate Bay is a long, cliff-backed beach about three miles north of Newquay. At low tide the sand stretches for more than two miles; at high tide much of it disappears, so plan around the tide.",
      "The easiest access is from the central valley, where the Watergate Bay Hotel, beach cafés, toilets, a shop and the surf schools are all clustered. It is popular for surfing, kitesurfing and windsurfing."
    ],
    suits: ["Lessons and progression", "Groups wanting good food after the surf", "Kitesurfers on the right wind"],
    notFor: ["High-tide visits — little sand is left"],
    surf: {
      text: ["Facing north-west, Watergate picks up most Atlantic swells. Banks move along its length, so there are usually several peaks. It can be breezy — light easterly winds are offshore."],
      cards: [{ label: "Hazards", title: "High tide and cliffs", text: "The tide comes up to the cliffs along much of the bay — don't get cut off away from the central access." }]
    },
    surfbooker: { schools: ["wavehunters", "westcountry-surf-school"], hireProviders: ["wavehunters"], lessonsPage: "/surf-lessons/watergate-bay/", hirePage: "/surf-hire/watergate-bay/", accommodation: "watergate-bay" },
    lessons: { note: lessonsNote },
    practical: [
      { label: "Parking", title: "Central car park", text: "The main car park is in front of the Watergate Bay Hotel, by the valley access." },
      { label: "Facilities", title: "Cafés, toilets, shop", text: "Café/restaurants, toilets with accessible facilities, a shop and deckchair hire." },
      { label: "Lifeguards", title: "Seasonal", text: "Swim between the red and yellow flags." },
      { label: "Dogs", title: "Allowed", text: "Dogs are allowed all year according to The Beach Guide." }
    ],
    stay: { areas: [{ label: "On the beach", title: "Watergate Bay Hotel", text: "The surf-and-spa hotel right on the sand." }, { label: "Town", title: "Newquay", text: "Ten minutes away with every type of accommodation." }] },
    todo: [{ label: "Walk", title: "Coast path", text: "Walk north to Mawgan Porth or south towards Newquay along the cliffs." }],
    travel: [{ label: "By car", title: "B3276", text: "About 10 minutes north of Newquay. Postcode TR8 4AA." }, { label: "By plane", title: "Newquay Airport", text: "A few minutes' drive away." }],
    nearby: [
      { name: "Mawgan Porth", href: "/guides/surfing-mawgan-porth/", distance: "About 5 minutes' drive", text: "A compact village bay." },
      { name: "Fistral", href: "/guides/surfing-fistral-beach/", distance: "About 15 minutes' drive", text: "Newquay's famous surf beach." }
    ],
    faqs: [{ q: "Can I take my dog to Watergate Bay?", a: "Yes, dogs are allowed all year." }, { q: "When is the best time to visit?", a: "Around mid to low tide — at high tide much of the beach disappears." }],
    sources: [{ label: "The Beach Guide — Watergate Bay", url: "https://www.thebeachguide.co.uk/south-west-england/cornwall/watergate-bay.htm" }, RNLI]
  }),
  base("fistral-beach", {
    name: "Fistral",
    fullName: "Fistral Beach, Newquay",
    area: "Newquay",
    geo: [50.4165, -5.1010],
    title: "Fistral Beach Surf Guide, Newquay: Lessons, Parking & Tips | Surfbooker",
    description: "Fistral Beach, Newquay: Britain's best-known surf beach. Compare six surf schools and hire, RNLI patrol dates, parking, dogs, food and the other Newquay beaches.",
    heroIntro: "Britain's best-known surf beach — Atlantic-facing, competition-tested and lined with surf schools, hire and food.",
    heroAlt: "Bodyboarders and families in the shallow water at Fistral Beach",
    images: { hero: img("fistral-beach"), heroPosition: "50% 35%" },
    glance: [
      ["Best for", "Every level, with the right day and school"],
      ["Break", "Exposed beach break, north/central/south peaks"],
      ["Lifeguards", "RNLI daily 10am–6pm, Apr–Nov (check dates)"],
      ["Dogs", "Allowed (no council restriction listed)"],
      ["Parking", "Car parks at both ends"],
      ["Schools", "Six listed on Surfbooker"]
    ],
    overview: [
      "Fistral faces the Atlantic on the western side of Newquay, between Towan Head and Pentire Point East. It has hosted major international surf competitions and is the heart of British surf culture, with surf schools, hire shops, cafés and restaurants clustered around the beach complex.",
      "For a first lesson, the real advantage is choice: six schools are listed here on Surfbooker. But Fistral is exposed — small days suit learners, while a bigger swell makes it powerful and demanding. The Cribbar, a famous big-wave reef, breaks off Towan Head on the largest winter swells."
    ],
    suits: ["Learners with a school", "Improvers who want lots of coaching choice", "Experienced surfers on bigger days"],
    notFor: ["Quiet surf on summer weekends or event days"],
    surf: {
      text: ["Several shifting peaks run along North, Central and South Fistral. The banks move, so the best spot changes. Easterly winds are offshore; the headlands give a little shelter at each end."],
      cards: [
        { label: "Level", title: "All levels, conditions permitting", text: "Stay in the lesson area on bigger days; Fistral can become powerful quickly." },
        { label: "Patrol", title: "Long RNLI season", text: "The RNLI listed daily 10am–6pm cover from 3 April to 1 November for 2026 — check this year's dates." }
      ]
    },
    surfbooker: { schools: ["fistral-beach-surf-school", "quiksilver-surf-school-newquay", "newquay-activity-centre", "cornish-wave", "surf-sanctuary", "cornwall-surfing-academy"], hireProviders: ["fistral-beach-surf-school"], lessonsPage: "/surf-lessons/fistral/", hirePage: "/surf-hire/fistral/", accommodation: "newquay" },
    lessons: { note: lessonsNote },
    practical: [
      { label: "Parking", title: "Match the car park to your school", text: "Car parks serve both ends of the beach. Schools are based at North, Central and South Fistral — check your booking before you park to avoid a long carry." },
      { label: "Facilities", title: "Beach complex", text: "Toilets, showers, surf shops and food around the beach complex." },
      { label: "Lifeguards", title: "Long patrol season", text: "Use the surf and swim zones every time." },
      { label: "Dogs", title: "Allowed", text: "Fistral isn't in Cornwall Council's restriction table; check signs on the day." }
    ],
    stay: { areas: [{ label: "Pentire", title: "Fistral side of Newquay", text: "Hotels and apartments above the beach, including the Headland Hotel on Towan Head." }, { label: "Town", title: "Central Newquay", text: "A ten-minute walk, with the most choice." }] },
    todo: [
      { label: "Walk", title: "Towan Head", text: "Walk to the Huer's Hut and the headland for views over Fistral." },
      { label: "Family", title: "Blue Reef Aquarium and Newquay Zoo", text: "Rainy-day options in town." }
    ],
    travel: [{ label: "By train", title: "Newquay station", text: "Newquay has a branch-line station from Par; Fistral is about a 20-minute walk." }, { label: "By plane", title: "Newquay Airport", text: "About 15 minutes' drive." }],
    nearby: [
      { name: "Towan Beach", href: "/guides/surfing-towan-beach-newquay/", distance: "Central Newquay", text: "Harbour-side town beach." },
      { name: "Great Western", href: "/guides/surfing-great-western-beach/", distance: "Central Newquay", text: "Town beach near the station." },
      { name: "Crantock", href: "/guides/surfing-crantock-beach/", distance: "Across the Gannel", text: "National Trust beach south of Newquay." }
    ],
    faqs: [
      { q: "Is Fistral good for beginners?", a: "Yes on small days with a school — there are six to choose from. On bigger days it's powerful; stay in the lesson area or choose a sheltered town beach." },
      { q: "When are lifeguards on Fistral?", a: "The RNLI listed daily 10am–6pm cover from 3 April to 1 November for 2026. Check this year's dates." }
    ],
    sources: [RNLI, DOGS]
  }),
  base("towan-beach-newquay", {
    name: "Towan Beach",
    fullName: "Towan Beach, Newquay",
    area: "Central Newquay",
    geo: [50.4170, -5.0860],
    title: "Towan Beach, Newquay: Town Surf Beach by the Harbour | Surfbooker",
    description: "Towan Beach in central Newquay: a town beach beside the harbour and The Island, seasonal lifeguards, Cornish Wave lessons, dogs allowed and car-free access.",
    heroIntro: "Newquay's central beach beside the harbour and The Island's suspension bridge — the easiest surf beach to reach on foot from town.",
    heroAlt: "Towan Beach in Newquay with turquoise water and the town above",
    images: { hero: img("towan-beach") },
    glance: [
      ["Best for", "Families, lessons on suitable days"],
      ["Break", "Town beach, more sheltered than Fistral"],
      ["Lifeguards", "Seasonal"],
      ["Dogs", "Allowed all year (local guide)"],
      ["Parking", "Town car parks, then walk"],
      ["Landmark", "The Island and its bridge"]
    ],
    overview: [
      "Towan is the westernmost of Newquay's four town beaches, right below the centre and next to the harbour. A private house on The Island is linked to the mainland by a short suspension bridge — one of Newquay's most photographed sights.",
      "It's a walk-in beach: park in town or arrive on foot. Cafés, shops, toilets and a first aid post are close, and boogie boards can be hired. Its setting gives it a different character from exposed Fistral."
    ],
    suits: ["Families staying in central Newquay", "Lessons when the school chooses this side of town"],
    surf: { text: ["Towan is more sheltered than Fistral, so it can have smaller, cleaner waves when Fistral is big — but it is still condition-dependent. Rocks surround parts of the beach."] },
    surfbooker: { schools: ["cornish-wave"], lessonsPage: "/surf-lessons/towan-newquay/", accommodation: "newquay" },
    lessons: { note: lessonsNote },
    practical: [
      { label: "Parking", title: "Park in town", text: "No parking on the sloping road down to the beach — use central car parks and walk." },
      { label: "Facilities", title: "All in town", text: "Cafés, shops, toilets and a first aid post." },
      { label: "Lifeguards", title: "Seasonal", text: "Swim between the flags." },
      { label: "Dogs", title: "Allowed", text: "The Cornwall Beach Guide notes dogs are allowed all year on Towan and Great Western beaches; check signs." }
    ],
    stay: { areas: [{ label: "Town", title: "Central Newquay", text: "Hotels, guesthouses and apartments within walking distance." }] },
    todo: [{ label: "Harbour", title: "Newquay harbour", text: "Fishing boats, boat trips and seafood stalls next to the beach." }],
    travel: [{ label: "By train", title: "Newquay station", text: "A short walk from the station." }],
    nearby: [
      { name: "Great Western", href: "/guides/surfing-great-western-beach/", distance: "Next beach east", text: "Another town beach near the station." },
      { name: "Fistral", href: "/guides/surfing-fistral-beach/", distance: "About 15 minutes' walk", text: "The big Atlantic surf beach." }
    ],
    faqs: [{ q: "Can you surf at Towan Beach?", a: "Yes, it's used for lessons when conditions suit, and it's often smaller than Fistral." }],
    sources: [{ label: "The Beach Guide — Towan Beach", url: "https://www.thebeachguide.co.uk/south-west-england/cornwall/towan-newquay.htm" }, { label: "Cornwall Beach Guide — Newquay beaches", url: "https://www.cornwallbeachguide.co.uk/northcornwall/newquay/newquay.htm" }, RNLI]
  }),
  base("great-western-beach", {
    name: "Great Western Beach",
    area: "Central Newquay",
    geo: [50.4160, -5.0790],
    title: "Great Western Beach, Newquay: Lessons & Car-Free Access | Surfbooker",
    description: "Great Western Beach in Newquay: a sandy town beach near the railway station with NQY Surf School and Newquay Activity Centre, steep access, dogs allowed and seasonal lifeguards.",
    heroIntro: "A sandy town beach below Newquay's station side, with established surf schools and a steep walk back up.",
    heroAlt: "Great Western Beach in Newquay seen from the cliff path at low tide",
    images: { hero: img("great-western-beach") },
    glance: [
      ["Best for", "Lessons, car-free visits"],
      ["Break", "Town beach between headlands"],
      ["Lifeguards", "Check RNLI dates"],
      ["Dogs", "Allowed all year (local guide)"],
      ["Access", "Sloping road — no parking on it"],
      ["Rail", "Newquay station nearby"]
    ],
    overview: [
      "Great Western sits below the town centre, next to Towan, and is reached down a sloping road (closed to cars). It's one of the most practical beaches for car-free visitors because Newquay station is close by.",
      "NQY Surf School has its base here and Newquay Activity Centre also teaches here. Pack light — the walk back up with wet kit is steep."
    ],
    suits: ["Lessons", "Visitors arriving by train"],
    surf: { text: ["Like Towan, Great Western is a town beach between headlands; it can be smaller than Fistral and is used for lessons on suitable days. The tide changes how the town beaches connect."] },
    surfbooker: { schools: ["newquay-surfing-school", "newquay-activity-centre"], lessonsPage: "/surf-lessons/great-western/", accommodation: "newquay" },
    lessons: { note: lessonsNote },
    practical: [
      { label: "Parking", title: "Town car parks", text: "No parking on the access road; use central Newquay car parks." },
      { label: "Facilities", title: "Toilets by the beach", text: "Toilets by the beach and food in town." },
      { label: "Dogs", title: "Allowed", text: "Dogs are allowed all year according to the Cornwall Beach Guide; check signs." }
    ],
    stay: { areas: [{ label: "Town", title: "Central Newquay", text: "Plenty within a short walk." }] },
    travel: [{ label: "By train", title: "Newquay station", text: "A few minutes' walk." }],
    nearby: [{ name: "Towan Beach", href: "/guides/surfing-towan-beach-newquay/", distance: "Next beach west", text: "Harbour-side beach." }, { name: "Fistral", href: "/guides/surfing-fistral-beach/", distance: "About 20 minutes' walk", text: "Newquay's main surf beach." }],
    faqs: [{ q: "Which surf schools use Great Western?", a: "NQY Surf School has its base here, and Newquay Activity Centre also teaches here." }],
    sources: [{ label: "Cornwall Beach Guide — Newquay beaches", url: "https://www.cornwallbeachguide.co.uk/northcornwall/newquay/newquay.htm" }, RNLI]
  }),
  base("crantock-beach", {
    name: "Crantock",
    fullName: "Crantock Beach",
    area: "South of Newquay across the Gannel",
    geo: [50.4070, -5.1150],
    title: "Crantock Beach Guide: National Trust Parking, Gannel & Surf | Surfbooker",
    description: "Crantock Beach near Newquay: a big National Trust beach beside the Gannel estuary, Big Green Adventures lessons, 2.1 m car park barrier, dogs welcome and estuary safety.",
    heroIntro: "A long National Trust beach across the Gannel estuary from Newquay — dunes, a sandy bay and a river channel that demands respect.",
    heroAlt: "Crantock Beach with the Gannel channel, wet sand and rocky headland under a blue sky",
    images: { hero: img("crantock-beach") },
    glance: [
      ["Best for", "Lessons, families, dog walkers"],
      ["Break", "West-facing beach break by an estuary"],
      ["Lifeguards", "Seasonal"],
      ["Dogs", "Welcome all year under control (National Trust)"],
      ["Parking", "National Trust car park, 2.1 m height barrier"],
      ["Hazard", "The Gannel estuary"]
    ],
    overview: [
      "Crantock is a big sandy beach owned by the National Trust, separated from Newquay's Pentire headland by the Gannel estuary. Backed by dunes and framed by West Pentire, it feels far wilder than its distance from Newquay suggests.",
      "The Gannel is the key safety point: the channel fills fast and has strong currents on the tide. Use signed access, follow lifeguard and National Trust advice, and never assume a crossing is safe because others are doing it."
    ],
    suits: ["Small-group lessons with Big Green Adventures", "Dog owners", "Walkers exploring West Pentire"],
    notFor: ["Anyone planning to wade or swim the Gannel"],
    surf: { text: ["Crantock faces west and picks up good Atlantic swell, with moving banks across a broad beach. The estuary end can have strong currents, especially on a dropping tide."] },
    surfbooker: { schools: ["big-green-adventures"], lessonsPage: "/surf-lessons/crantock/", accommodation: "newquay" },
    lessons: { note: lessonsNote },
    practical: [
      { label: "Parking", title: "National Trust car park", text: "Charges, a 2.1 m height barrier and seasonal gate hours. Mobile reception is patchy, so the National Trust suggests having its parking app ready or using the cash machines." },
      { label: "Facilities", title: "Kiosk and toilets", text: "A kiosk and toilets at the main access; service can be seasonal." },
      { label: "Lifeguards", title: "Seasonal", text: "Stay in the flagged zone." },
      { label: "Dogs", title: "Welcome", text: "The National Trust welcomes dogs year-round under control." }
    ],
    stay: { areas: [{ label: "Village", title: "Crantock", text: "A pretty village with pubs and holiday lets a short walk from the beach." }, { label: "Town", title: "Newquay", text: "Five minutes' drive round the Gannel." }] },
    todo: [{ label: "Walk", title: "West Pentire", text: "Clifftop walks with wildflower fields in summer and views to Porth Joke." }],
    travel: [{ label: "By car", title: "Via Crantock village", text: "About 10 minutes from Newquay by road." }],
    nearby: [{ name: "Holywell Bay", href: "/guides/surfing-holywell-bay/", distance: "About 10 minutes' drive", text: "Dune-backed surf beach to the south." }, { name: "Fistral", href: "/guides/surfing-fistral-beach/", distance: "Across the Gannel", text: "Newquay's main surf beach." }],
    faqs: [{ q: "Can you cross the Gannel to Newquay?", a: "Only at low tide by the footbridges or ferry, following current official advice. The channel fills quickly and has strong currents — never improvise a crossing." }, { q: "Are dogs allowed?", a: "Yes, the National Trust welcomes dogs year-round under control." }],
    sources: [{ label: "National Trust — Crantock", url: "https://www.nationaltrust.org.uk/visit/cornwall/crantock" }, RNLI]
  }),
  base("holywell-bay", {
    name: "Holywell Bay",
    area: "Between Newquay and Perranporth",
    geo: [50.3920, -5.1470],
    title: "Holywell Bay Guide: Dunes, Surf Lessons & National Trust Parking | Surfbooker",
    description: "Holywell Bay near Newquay: a big dune-backed surf beach with Gull Rocks offshore, Cornwall Surfing Academy lessons, National Trust parking, seasonal lifeguards and dog-friendly sand.",
    heroIntro: "A big sandy bay reached through the dunes, with the twin Gull Rocks offshore and a surf school on the sand.",
    heroAlt: "Holywell Bay from the clifftop, with golden sand, the dunes and Gull Rocks offshore",
    images: { hero: img("holywell-bay") },
    glance: [
      ["Best for", "Lessons, families, a full beach day"],
      ["Break", "West-facing beach break"],
      ["Lifeguards", "Seasonal"],
      ["Dogs", "No beach restriction (National Trust)"],
      ["Parking", "National Trust car park"],
      ["Access", "Soft sand through the dunes"]
    ],
    overview: [
      "Holywell Bay is a wide sandy beach between Crantock and Perranporth, reached by a walk through high dunes from the village. Gull Rocks sit just offshore, and a stream runs across the sand.",
      "Cornwall Surfing Academy teaches here, the National Trust runs the main car park, and the village has a pub and seasonal food. The dune walk is soft and uneven, so pack with the board carry in mind."
    ],
    suits: ["Groups who want lessons, dunes and a long beach day", "Dog owners"],
    notFor: ["Step-free access — the dune route is soft and uneven"],
    surf: { text: ["Holywell is exposed to Atlantic swell with moving banks; it can be a good alternative when Newquay's beaches are crowded."] },
    surfbooker: { schools: ["cornwall-surfing-academy"], lessonsPage: "/surf-lessons/holywell-bay/" },
    lessons: { note: lessonsNote },
    practical: [
      { label: "Parking", title: "National Trust car park", text: "Signed before the road ends; free for National Trust members." },
      { label: "Facilities", title: "Toilets, pub, seasonal food", text: "Toilets at Holywell and food in the village." },
      { label: "Lifeguards", title: "Seasonal", text: "Follow the flags." },
      { label: "Dogs", title: "Welcome on the beach", text: "The National Trust states there's no beach restriction, but dogs need close control around livestock and nesting birds on the surrounding common." }
    ],
    stay: { areas: [{ label: "Village", title: "Holywell", text: "Holiday parks and lets near the beach." }, { label: "Nearby", title: "Crantock or Perranporth", text: "More choice within 15 minutes." }] },
    todo: [{ label: "Walk", title: "Penhale and Kelsey Head", text: "Coast-path walks in both directions with big views." }],
    travel: [{ label: "By car", title: "From Newquay", text: "About 15 minutes via Cubert." }],
    nearby: [{ name: "Crantock", href: "/guides/surfing-crantock-beach/", distance: "About 10 minutes' drive", text: "National Trust beach by the Gannel." }, { name: "Perranporth", href: "/guides/surfing-perranporth/", distance: "About 15 minutes' drive", text: "Long beach with a town behind it." }],
    faqs: [{ q: "How far is the walk to the beach?", a: "A few minutes through soft dunes from the National Trust car park — uneven, with slopes and steps." }],
    sources: [{ label: "National Trust — Holywell", url: "https://www.nationaltrust.org.uk/visit/cornwall/holywell" }, RNLI]
  }),
  base("perranporth", {
    name: "Perranporth",
    area: "North coast, between Newquay and St Agnes",
    geo: [50.3480, -5.1530],
    title: "Perranporth Surf Guide: Lessons, Parking, Dogs & Town | Surfbooker",
    description: "Perranporth in Cornwall: a long surf beach joining Perran Sands, with Stoked and Perranporth Surf School, promenade parking, hot showers, U1 bus, dog rules and food.",
    heroIntro: "A long Atlantic beach that runs straight out of a seaside town — lessons, cafés, showers and miles of sand at low tide.",
    heroAlt: "Perranporth beach at low tide with the rock arch and Chapel Rock area",
    images: { hero: img("perranporth") },
    glance: [
      ["Best for", "Families with lessons, improvers"],
      ["Break", "Long, exposed beach break"],
      ["Lifeguards", "Seasonal RNLI patrol"],
      ["Dogs", "Allowed; short-lead rules in July–Aug on the main beach"],
      ["Parking", "Promenade car park, Wheal Leisure"],
      ["Bus", "U1"]
    ],
    overview: [
      "Perranporth's beach starts right at the end of the town and, at low tide, joins Perran Sands to run for around three miles north. Rock arches and Chapel Rock — with its tidal swimming pool — sit at the southern end near the town.",
      "Two surf schools teach here, and cafés, public toilets, paid hot showers and shops are on the doorstep. The scale gives you options, but Atlantic exposure can produce demanding surf, so stay near the flags rather than wandering off for space."
    ],
    suits: ["Families who want lessons and town facilities", "Improvers wanting room", "Car-free visits by bus"],
    surf: { text: ["Perranporth faces west-north-west into the Atlantic. Peaks move with the banks along the beach. Light easterly winds are offshore."] },
    surfbooker: { schools: ["stoked-surf-school", "perranporth-surf-school"], hireProviders: ["stoked-surf-school"], lessonsPage: "/surf-lessons/perranporth/", hirePage: "/surf-hire/perranporth/", accommodation: "perranporth" },
    lessons: { text: ["Perranporth Surf School uses a summer beach base, moves for spring tides and runs from Piran Surf in winter; Stoked meets at its Beach Road base near the promenade car park. Both recommend allowing about three hours for a two-hour lesson."], note: lessonsNote },
    practical: [
      { label: "Parking", title: "Promenade car park", text: "The promenade pay-and-display is closest to the main entrance; Wheal Leisure is the town alternative." },
      { label: "Facilities", title: "Toilets & hot showers", text: "Public toilets and paid hot showers on the promenade." },
      { label: "Lifeguards", title: "Seasonal RNLI patrol", text: "Stay in the flagged zones." },
      { label: "Dogs", title: "Allowed with summer lead rules", text: "Visit Cornwall notes dogs are allowed year-round with short-lead controls on the main beach in July and August; read the entrance signs." }
    ],
    stay: { intro: "The town has hotels, guesthouses, holiday parks and campsites close to the beach." },
    food: { places: [{ name: "The Watering Hole", type: "Beach bar", note: "The well-known bar right on the sand." }], text: ["Cafés, pubs and takeaways cluster at the south end of the beach and along the main street."] },
    todo: [{ label: "Swim", title: "Chapel Rock pool", text: "A tidal pool on Chapel Rock at the south end of the beach." }, { label: "History", title: "St Piran's Oratory", text: "Walk through the dunes on Penhale Sands to the site of Cornwall's patron saint." }],
    travel: [{ label: "By bus", title: "U1", text: "The U1 serves Perranporth from Newquay and Truro." }],
    nearby: [{ name: "Trevaunance Cove", href: "/guides/surfing-trevaunance-cove/", distance: "About 10 minutes' drive", text: "St Agnes' surf cove." }, { name: "Holywell Bay", href: "/guides/surfing-holywell-bay/", distance: "About 15 minutes' drive", text: "Dune-backed surf beach." }],
    faqs: [{ q: "Are there showers at Perranporth?", a: "Yes, paid hot showers on the promenade." }, { q: "Can dogs go on Perranporth beach?", a: "Yes, with short-lead controls on the main beach in July and August. Read the signs at the entrance." }],
    sources: [RNLI, { label: "Visit Cornwall — Perranporth", url: "https://www.visitcornwall.com/places/perranporth" }]
  }),
  base("trevaunance-cove", {
    name: "Trevaunance Cove",
    area: "St Agnes, north Cornwall",
    geo: [50.3200, -5.1990],
    title: "Trevaunance Cove, St Agnes: Surf, Parking & Pubs | Surfbooker",
    description: "Trevaunance Cove below St Agnes: a compact surf cove with Breakers Surf School, limited parking, a steep approach, the Driftwood Spars and walks to Wheal Coates.",
    heroIntro: "St Agnes' surf cove — a compact beach below a steep village valley, with a surf school, pubs and mining-heritage cliffs.",
    heroAlt: "Trevaunance Cove seen from the coast path, with houses on the valley sides",
    images: { hero: img("trevaunance-cove") },
    glance: [
      ["Best for", "Improvers, lessons on suitable days"],
      ["Break", "Cove break, sand with rocks"],
      ["Lifeguards", "Check RNLI dates"],
      ["Parking", "Very limited near the cove"],
      ["Access", "Steep road from the village"],
      ["After-surf", "Pubs and cafés at the cove"]
    ],
    overview: [
      "Trevaunance Cove sits at the bottom of a steep valley below St Agnes, a village with a strong surf community and a long mining history. The cove is compact, framed by cliffs and rocks, and changes a lot with the tide.",
      "Breakers Surf School teaches here, and the cove has pub food and cafés close to the water. Parking near the beach is very limited — walking down from the village is often easier."
    ],
    suits: ["Improvers", "Surfers who like a village with character"],
    notFor: ["Easy access with lots of kit"],
    surf: { text: ["A cove break over sand with rocky edges; banks and available sand vary with the tide. It needs a decent swell and is best with south-easterly winds."] },
    surfbooker: { schools: ["breakers-surf-school"], lessonsPage: "/surf-lessons/st-agnes/", accommodation: "st-agnes" },
    lessons: { note: lessonsNote },
    practical: [
      { label: "Parking", title: "Limited", text: "Spaces near the cove are limited; use legal village parking and walk down." },
      { label: "Access", title: "Steep", text: "The road and paths down to the cove are steep." },
      { label: "Lifeguards", title: "Check cover", text: "Check RNLI dates and signs on arrival." }
    ],
    stay: { intro: "St Agnes has B&Bs, inns with rooms and holiday lets." },
    food: { places: [{ name: "Driftwood Spars", type: "Pub with rooms", url: "/accommodation/stays/the-driftwood-spars-rooms/", note: "A long-established pub and brewery just up from the cove." }] },
    todo: [{ label: "Walk", title: "Wheal Coates", text: "The engine houses on the cliffs south of St Agnes are among Cornwall's most photographed mining remains." }, { label: "Hill", title: "St Agnes Beacon", text: "A short climb for 360-degree views." }],
    travel: [{ label: "By car", title: "Via St Agnes", text: "Follow the B3285 to St Agnes and down Quay Road." }],
    nearby: [{ name: "Porthtowan", href: "/guides/surfing-porthtowan/", distance: "About 10 minutes' drive", text: "Compact surf village to the west." }, { name: "Perranporth", href: "/guides/surfing-perranporth/", distance: "About 10 minutes' drive", text: "Long surf beach with a town." }],
    faqs: [{ q: "Is there parking at Trevaunance Cove?", a: "Only a little. Park legally in St Agnes and walk down." }],
    sources: [RNLI, { label: "Wikipedia — Trevaunance Cove", url: "https://en.wikipedia.org/wiki/Trevaunance_Cove" }]
  }),
  base("porthtowan", {
    name: "Porthtowan",
    area: "North coast near St Agnes",
    geo: [50.2870, -5.2430],
    title: "Porthtowan Surf Guide: Lessons, Parking & Dog Rules | Surfbooker",
    description: "Porthtowan in Cornwall: a compact surf village with Tris Surf Shop lessons, seasonal lifeguards, village parking, a summer daytime dog ban, beach bars and cafés.",
    heroIntro: "A small surf village wrapped around a sandy beach, with the surf shop, cafés and a beach bar all a few steps from the water.",
    heroAlt: "Porthtowan beach with dunes, the clifftop and buildings above",
    images: { hero: img("porthtowan") },
    glance: [
      ["Best for", "Improvers, lessons in season"],
      ["Break", "Exposed cove break"],
      ["Lifeguards", "Seasonal"],
      ["Dogs", "Not allowed 15 May–30 Sep, 10am–6pm"],
      ["Parking", "Village car park"],
      ["After-surf", "Bars and cafés on the beach"]
    ],
    overview: [
      "Porthtowan is a compact surf village between St Agnes and Portreath, where the beach, parking, surf shop and cafés all sit together. Cliffs and the tide give it a very different feel from long beaches like Perranporth.",
      "Beach space and access change a lot with the tide; only walk towards Chapel Porth with current tide information."
    ],
    suits: ["Surf trips where everything is on foot", "Improvers"],
    surf: { text: ["Porthtowan faces north-west and picks up good swell; the bottom is mostly sand with rocks near the edges."] },
    surfbooker: { schools: ["tris-surf-shop"], lessonsPage: "/surf-lessons/porthtowan/", accommodation: "porthtowan" },
    lessons: { note: lessonsNote },
    practical: [
      { label: "Parking", title: "Village car park", text: "Close but finite; avoid roadside obstruction." },
      { label: "Facilities", title: "Everything by the beach", text: "Toilets, food and surf services cluster by the beach." },
      { label: "Dogs", title: "Summer daytime ban", text: "Dogs prohibited 10am–6pm from 15 May to 30 September." }
    ],
    stay: { intro: "Holiday lets and an eco campsite are close to the village." },
    todo: [{ label: "Walk", title: "Chapel Porth & Wheal Coates", text: "Walk the coast path north to the National Trust cove and engine houses." }],
    travel: [{ label: "By car", title: "From the A30", text: "About 10 minutes from the A30 near Redruth." }],
    nearby: [{ name: "Trevaunance Cove", href: "/guides/surfing-trevaunance-cove/", distance: "About 10 minutes' drive", text: "St Agnes' cove." }, { name: "Gwithian & Godrevy", href: "/guides/surfing-gwithian-godrevy/", distance: "About 25 minutes' drive", text: "St Ives Bay's surf zone." }],
    faqs: [{ q: "Can dogs go on Porthtowan beach?", a: "Not between 10am and 6pm from 15 May to 30 September." }],
    sources: [DOGS, RNLI]
  }),
  base("gwithian-godrevy", {
    name: "Gwithian & Godrevy",
    area: "St Ives Bay, west Cornwall",
    geo: [50.2290, -5.3910],
    title: "Gwithian & Godrevy Surf Guide: Lessons, Parking & Seals | Surfbooker",
    description: "Gwithian and Godrevy on St Ives Bay: an exposed surf zone with Gwithian Academy of Surfing and Global Boarders, National Trust parking at Godrevy, dog sections and seal-watching.",
    heroIntro: "The eastern end of St Ives Bay — miles of surf-facing sand running up to Godrevy Lighthouse, with two surf schools and seals on the headland.",
    heroAlt: "Gwithian beach with Godrevy Lighthouse in the distance",
    images: { hero: img("gwithian-godrevy") },
    glance: [
      ["Best for", "Lessons, improvers, experienced surfers"],
      ["Break", "Exposed beach break with rock near the headland"],
      ["Lifeguards", "Seasonal"],
      ["Dogs", "Seasonal restrictions on parts — check the map"],
      ["Parking", "Gwithian and National Trust Godrevy"],
      ["Wildlife", "Seals at Mutton Cove"]
    ],
    overview: [
      "Gwithian and Godrevy share the north-eastern end of St Ives Bay, where the long sands of the Towans run up to Godrevy Point and its lighthouse — the one that inspired Virginia Woolf's *To the Lighthouse*. The open aspect picks up Atlantic swell, making this one of west Cornwall's most consistent surf zones.",
      "Gwithian and the National Trust's Godrevy access have different parking, walking routes and facilities, even though the sand joins at lower tides. Choose your access before you set off."
    ],
    suits: ["Lessons with two established schools", "Surfers wanting consistent swell in west Cornwall", "Wildlife watchers"],
    surf: { text: ["Exposed beach break with changing peaks; rock influence increases near Godrevy. Wind direction matters a lot here."] },
    surfbooker: { schools: ["gwithian-academy-of-surfing", "global-boarders"], hireProviders: ["global-boarders"], lessonsPage: "/surf-lessons/gwithian-godrevy/", hirePage: "/surf-hire/gwithian-godrevy/", accommodation: "gwithian" },
    lessons: { note: lessonsNote },
    practical: [
      { label: "Parking", title: "Two access points", text: "Gwithian and Godrevy have separate parking; National Trust capacity at Godrevy can change with weather and ground conditions." },
      { label: "Lifeguards", title: "Seasonal", text: "Swim and surf only in the designated zones when lifeguards operate." },
      { label: "Dogs", title: "Sections vary", text: "Seasonal restrictions apply to parts of the Hayle–Godrevy coastline. Check the current council map and signs." },
      { label: "Wildlife", title: "Seals", text: "Grey seals haul out in Mutton Cove below Godrevy — watch from the clifftop and never approach." }
    ],
    stay: { intro: "Campsites, holiday parks and cottages sit behind the Towans, with Hayle and St Ives nearby." },
    todo: [{ label: "Wildlife", title: "Mutton Cove seals", text: "A National Trust viewpoint above the cove." }, { label: "Walk", title: "Godrevy Point", text: "Views of Godrevy Lighthouse on its island." }],
    travel: [{ label: "By car", title: "From Hayle", text: "About 10 minutes via the B3301." }],
    nearby: [{ name: "Hayle Towans", href: "/guides/surfing-hayle-towans/", distance: "Same bay, west", text: "Dune-backed beaches towards Hayle." }, { name: "Porthmeor", href: "/guides/surfing-porthmeor-beach/", distance: "About 20 minutes' drive", text: "St Ives' surf beach." }],
    faqs: [{ q: "Can I see seals at Godrevy?", a: "Yes, from the clifftop above Mutton Cove. Keep your distance and keep dogs on leads." }],
    sources: [{ label: "National Trust — Godrevy", url: "https://www.nationaltrust.org.uk/visit/cornwall/godrevy" }, DOGS, RNLI]
  }),
  base("hayle-towans", {
    name: "Hayle Towans",
    area: "St Ives Bay, west Cornwall",
    geo: [50.1990, -5.4230],
    title: "Hayle Towans Surf Guide: Lessons, Dunes & Estuary Safety | Surfbooker",
    description: "Hayle Towans on St Ives Bay: dune-backed surf beaches with Hayle Surf School, varying access, estuary safety, dog rules by section, and places to stay in Hayle.",
    heroIntro: "Dune-backed sands on the western side of St Ives Bay — open surf, room to spread out, and a busy estuary to stay well clear of.",
    heroAlt: "Hayle Towans beach seen from the dunes, with St Ives Bay beyond",
    images: { hero: img("hayle-towans") },
    glance: [
      ["Best for", "Lessons, families"],
      ["Break", "Open beach break"],
      ["Lifeguards", "Seasonal on some sections"],
      ["Dogs", "Rules vary by beach section"],
      ["Parking", "Varies by access point"],
      ["Hazard", "Hayle estuary channel"]
    ],
    overview: [
      "The Towans (Cornish for dunes) stretch from the Hayle estuary mouth to Gwithian. Hayle Towans, Mexico Towans and Upton Towans each have their own access, parking and facilities, so a map pin for 'Hayle' is not enough.",
      "The bathing beach is not the estuary channel: keep clear of the harbour mouth and channels, which have strong tidal currents."
    ],
    suits: ["Lessons with Hayle Surf School", "Families on lifeguarded sections"],
    notFor: ["Swimming near the estuary mouth"],
    surf: { text: ["An open beach break with moving banks; wind direction across St Ives Bay reshapes conditions quickly."] },
    surfbooker: { schools: ["hayle-surf-school"], lessonsPage: "/surf-lessons/hayle-towans/", accommodation: "hayle" },
    lessons: { note: lessonsNote },
    practical: [
      { label: "Parking", title: "Depends on access", text: "Hayle Surf School advertises private parking for customers; other access points have their own restrictions and walking distances." },
      { label: "Access", title: "Dunes", text: "Allow for soft sand and a longer board carry." },
      { label: "Dogs", title: "Varies by section", text: "Check the Cornwall Council map and signs at your access." }
    ],
    stay: { intro: "Holiday parks fill the Towans, and Hayle town has guesthouses and inns." },
    todo: [{ label: "Nature", title: "RSPB Hayle Estuary", text: "Birdwatching on the estuary." }, { label: "Food", title: "Hayle pasties", text: "Hayle is famous for its traditional pasty bakers." }],
    travel: [{ label: "By train", title: "Hayle station", text: "On the main line to Penzance." }],
    nearby: [{ name: "Gwithian & Godrevy", href: "/guides/surfing-gwithian-godrevy/", distance: "Same bay, east", text: "More exposed surf." }, { name: "Porthmeor", href: "/guides/surfing-porthmeor-beach/", distance: "About 15 minutes' drive", text: "St Ives' surf beach." }],
    faqs: [{ q: "Can I swim near the Hayle estuary?", a: "No — keep clear of the harbour mouth and channels, which have strong tidal currents. Use recognised bathing and surfing areas." }],
    sources: [DOGS, RNLI]
  }),
  base("porthmeor-beach", {
    name: "Porthmeor",
    fullName: "Porthmeor Beach, St Ives",
    area: "St Ives",
    geo: [50.2150, -5.4840],
    title: "Porthmeor Beach, St Ives: Surf Lessons, Parking & Tate | Surfbooker",
    description: "Porthmeor Beach in St Ives: west-facing surf below Tate St Ives, St Ives Surf School on the sand, tide-dependent lessons, parking at Trenwith and the summer dog ban.",
    heroIntro: "St Ives' Atlantic-side beach — a compact surf break below Tate St Ives, with a surf school on the sand and the town on foot.",
    heroAlt: "Porthmeor Beach, St Ives, at low tide with The Island headland beyond",
    images: { hero: img("porthmeor-beach") },
    glance: [
      ["Best for", "Lessons, a surf-and-town day"],
      ["Break", "West-facing beach break, rocky edges"],
      ["Lifeguards", "Seasonal"],
      ["Dogs", "Not allowed 15 May–30 Sep, 10am–6pm"],
      ["Parking", "Porthmeor (short stay, 30 spaces) or Trenwith"],
      ["Tide", "Waves can stop breaking at high water"]
    ],
    overview: [
      "Porthmeor sits on the Atlantic side of St Ives, below Tate St Ives and a short walk from the harbour. It gets more swell than sheltered Porthminster on the other side of town, and St Ives Surf School runs lessons and hire from a permanent base on the sand.",
      "Rocks frame the beach, and around high water the waves can stop breaking — lesson times move with the tide rather than following a fixed timetable."
    ],
    suits: ["Lessons with town convenience", "Families combining surf, Tate and the harbour"],
    surf: { text: ["Porthmeor faces west-north-west. The school teaches first-timers in waist-deep water and runs five lesson levels from whitewater to unbroken waves. Best with southerly winds."] },
    surfbooker: { schools: ["st-ives-surf-school"], hireProviders: ["st-ives-surf-school"], lessonsPage: "/surf-lessons/porthmeor/", hirePage: "/surf-hire/porthmeor/", accommodation: "st-ives" },
    lessons: { text: ["St Ives Surf School asks guests to arrive 30 minutes before the lesson."], note: lessonsNote },
    practical: [
      { label: "Parking", title: "Trenwith for longer stays", text: "Porthmeor car park is short-stay with about 30 spaces. Trenwith is the largest council car park, with a seasonal shuttle to the centre." },
      { label: "Lifeguards", title: "Seasonal RNLI", text: "Follow the flags and give the rock edges room as the beach narrows." },
      { label: "Dogs", title: "Summer daytime ban", text: "Cornwall Council lists dogs as prohibited 10am–6pm from 15 May to 30 September; St Ives Town Council publishes local updates." }
    ],
    stay: { intro: "St Ives has hotels, B&Bs and cottages, many within walking distance." },
    todo: [{ label: "Art", title: "Tate St Ives", text: "The gallery overlooks Porthmeor beach." }, { label: "Art", title: "Barbara Hepworth Museum", text: "The sculptor's studio and garden." }, { label: "Walk", title: "The Island", text: "Walk round St Nicholas Chapel on the headland." }],
    travel: [{ label: "By train", title: "St Ives branch line", text: "A scenic line from St Erth; St Ives station is a short walk from the beaches." }],
    nearby: [{ name: "Hayle Towans", href: "/guides/surfing-hayle-towans/", distance: "About 15 minutes' drive", text: "Dune-backed beaches across the bay." }, { name: "Sennen Cove", href: "/guides/surfing-sennen-cove/", distance: "About 35 minutes' drive", text: "Far-west Atlantic surf." }],
    faqs: [{ q: "Why do lesson times change at Porthmeor?", a: "Around high tide the waves can stop breaking on the beach, so the school moves sessions with the tide." }],
    sources: [DOGS, { label: "St Ives Town Council — dogs on beaches", url: "https://stivestowncouncil-cornwall.gov.uk/info-page/dogs-on-st-ives-beaches/" }, RNLI]
  }),
  base("sennen-cove", {
    name: "Sennen Cove",
    area: "Near Land's End, west Cornwall",
    geo: [50.0780, -5.6960],
    title: "Sennen Cove Surf Guide: Lessons, Parking & Land's End | Surfbooker",
    description: "Sennen Cove near Land's End: a broad, exposed Atlantic beach with Sennen Surfing Centre, a harbour village, seasonal lifeguards, a summer daytime dog ban and coast-path walks.",
    heroIntro: "A broad Atlantic beach in Whitesand Bay, a mile from Land's End — reliable surf, turquoise water and a little harbour village.",
    heroAlt: "Aerial view of the long sandy beach at Sennen and the turquoise sea",
    images: { hero: img("sennen-cove"), heroPosition: "50% 40%" },
    glance: [
      ["Best for", "Lessons on small days, experienced surfers"],
      ["Break", "Exposed beach break"],
      ["Lifeguards", "Seasonal"],
      ["Dogs", "Not allowed 15 May–30 Sep, 10am–6pm"],
      ["Parking", "Village car parks — fill in peak season"],
      ["Nearby", "Land's End, about a mile"]
    ],
    overview: [
      "Sennen is the most westerly surf beach in mainland Britain, a long arc of sand in Whitesand Bay with a harbour, lifeboat station and village at its southern end. It picks up swell when most of Cornwall is flat.",
      "The postcard setting doesn't make every day beginner-friendly — size, wind and currents decide who should go in. Sennen Surfing Centre provides lessons."
    ],
    suits: ["Surfers chasing swell", "Lessons on small days", "Coast-path walkers"],
    surf: { text: ["Very exposed to Atlantic swell with shifting peaks and rocks at the ends. North or north-easterly winds are favourable."] },
    surfbooker: { schools: ["sennen-surfing-centre"], lessonsPage: "/surf-lessons/sennen-cove/", accommodation: "sennen" },
    lessons: { note: lessonsNote },
    practical: [
      { label: "Parking", title: "Village car parks", text: "Shared by beach and village — slow in peak season." },
      { label: "Lifeguards", title: "Seasonal", text: "Keep surf craft away from swimmer zones." },
      { label: "Dogs", title: "Summer daytime ban", text: "Dogs prohibited 10am–6pm from 15 May to 30 September." }
    ],
    stay: { intro: "Sennen has inns, a campsite and cottages; St Just and Penzance are nearby." },
    food: { places: [{ name: "The Old Success Inn", type: "Inn", url: "/accommodation/stays/the-old-success-inn-rooms/", note: "Historic inn by the harbour." }] },
    todo: [{ label: "Walk", title: "Land's End", text: "Walk the coast path about a mile south-west to Land's End." }, { label: "Theatre", title: "Minack Theatre", text: "Open-air theatre on the cliffs at Porthcurno, about 15 minutes away." }],
    travel: [{ label: "By car", title: "A30", text: "Follow the A30 to its end; Sennen is just before Land's End." }],
    nearby: [{ name: "Porthmeor", href: "/guides/surfing-porthmeor-beach/", distance: "About 35 minutes' drive", text: "St Ives' surf beach." }, { name: "Praa Sands", href: "/guides/surfing-praa-sands/", distance: "About 35 minutes' drive", text: "South-coast alternative." }],
    faqs: [{ q: "Can dogs go on Sennen beach?", a: "Not between 10am and 6pm from 15 May to 30 September." }],
    sources: [DOGS, RNLI]
  }),
  base("praa-sands", {
    name: "Praa Sands",
    area: "Mount's Bay, south Cornwall",
    geo: [50.1010, -5.3930],
    title: "Praa Sands Surf Guide: South Cornwall Beach & Lessons | Surfbooker",
    description: "Praa Sands on Mount's Bay: a south-coast surf beach with seasonal Global Boarders lessons, parking at the main access, a July–August daytime dog ban and nearby walks.",
    heroIntro: "A mile of sand in Mount's Bay — south Cornwall's best-known surf beach, at its best when the north coast is blown out.",
    heroAlt: "Praa Sands beach with rock armour in the foreground and the bay beyond",
    images: { hero: img("praa-sands") },
    glance: [
      ["Best for", "Small-day lessons, improvers"],
      ["Break", "South-facing beach break"],
      ["Lifeguards", "Seasonal"],
      ["Dogs", "Not allowed 1 Jul–31 Aug, 10am–6pm"],
      ["Parking", "Near the main access"],
      ["Swell window", "Different from the north coast"]
    ],
    overview: [
      "Praa Sands (pronounced 'pray') is a long sandy beach between Penzance and Porthleven, backed by dunes and holiday homes. Facing south into Mount's Bay, it gets surf from a different swell window than the north coast — and it can be clean when northerly winds are blowing.",
      "Global Boarders runs seasonal lessons here; confirm the Praa operation is running before you travel."
    ],
    suits: ["Lessons on suitable days", "Surfers looking for a south-coast option"],
    surf: { text: ["Needs a south-westerly swell to reach Mount's Bay. Best in light northerly winds. Rocks near the headlands."] },
    surfbooker: { schools: ["global-boarders"], hireProviders: ["global-boarders"], lessonsPage: "/surf-lessons/praa-sands/", hirePage: "/surf-hire/praa-sands/", accommodation: "praa-sands" },
    lessons: { text: ["The provider doesn't advertise a dedicated changing facility at Praa Sands — plan how you'll change."], note: lessonsNote },
    practical: [
      { label: "Parking", title: "Main access", text: "Parking near the main beach access; check tariffs and capacity." },
      { label: "Facilities", title: "Food and toilets", text: "Food and public facilities cluster near the main access; hours can be seasonal." },
      { label: "Dogs", title: "Peak-summer daytime ban", text: "Dogs prohibited 10am–6pm from 1 July to 31 August." }
    ],
    stay: { intro: "Holiday parks and lets sit behind the beach; Porthleven and Penzance are close." },
    todo: [{ label: "Castle", title: "St Michael's Mount", text: "The tidal island at Marazion, about 15 minutes away." }, { label: "Harbour", title: "Porthleven", text: "A working harbour town with restaurants." }],
    travel: [{ label: "By car", title: "A394", text: "Between Penzance and Helston." }],
    nearby: [{ name: "Sennen Cove", href: "/guides/surfing-sennen-cove/", distance: "About 35 minutes' drive", text: "Exposed Atlantic surf." }, { name: "Porthmeor", href: "/guides/surfing-porthmeor-beach/", distance: "About 25 minutes' drive", text: "St Ives' surf beach." }],
    faqs: [{ q: "When can dogs go on Praa Sands?", a: "All year except 10am–6pm from 1 July to 31 August." }],
    sources: [DOGS, RNLI]
  })
];

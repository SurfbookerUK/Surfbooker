// Southern England destination guides. Researched October 2026 from RNLI, council, National Trust,
// estate and operator pages. Channel surf is far less consistent than the Atlantic coast, and these
// guides say so.
const lic = (slug) => `guides/_licensed-images/uk-destinations/${slug}.jpg`;
const base = (slug, extra) => ({
  region: "southern-england",
  path: `/guides/surfing-${slug}/`,
  outFile: `guides/surfing-${slug}/index.html`,
  slug,
  ...extra
});
const RNLI = { label: "RNLI — find a lifeguarded beach", url: "https://rnli.org/find-my-nearest/lifeguarded-beaches" };
const RNLI_BCP = { label: "RNLI — 2026 lifeguard season at Bournemouth, Christchurch and Poole", url: "https://rnli.org/news-and-media/2026/may/20/rnli-lifeguards-set-for-main-season-at-bournemouth-christchurch-and-poole" };
const BCP_DOGS = { label: "BCP Council — where and when you can bring your dog to the beach", url: "https://www.bcpcouncil.gov.uk/beaches-and-seafront/what-you-need-to-know-before-visiting-one-of-our-beaches/where-and-when-you-can-bring-your-dog-to-the-beach" };
const IOW = { label: "Wightlink — surfing on the Isle of Wight", url: "https://www.wightlink.co.uk/things-to-do-on-the-isle-of-wight/watersports/surfing" };
const WITT = { label: "The Great Sussex Way — surfing in the Witterings", url: "https://www.thegreatsussexway.org/listing/surfing-in-the-witterings/207586101/" };
const soEditorial = "Researched by Surfbooker from RNLI, council, National Trust, estate and operator sources; Surfbooker has not reviewed these businesses in person. Channel surf is inconsistent — use this to plan, then check the live forecast and the beach.";
const channel = { label: "Season", title: "Autumn and winter", text: "Channel swell is most likely from autumn to early spring; summer is usually small and much busier." };
const SURFSTEPS = { name: "Surf Steps (Bournemouth Surf School)", type: "Surf school & hire, Undercliff Drive", url: "https://www.visitbournemouth.com/attractions/surf-steps-bournemouth-surf-school", note: "On Bournemouth beach about five minutes west of Boscombe Pier; surf and SUP courses for all levels and hire, year-round by booking." };
const BCP_DOG_TEXT = "Dogs are banned from BCP's Blue Flag and Seaside Award beaches from 1 May to 30 September, with some year-round dog-friendly stretches — check the council's map.";
const IOW_SCHOOLS = [
  { name: "iSurf", type: "Mobile surf school, Isle of Wight", note: "Teaches at the beach that suits the day — book ahead in summer." },
  { name: "Eddie's Surf Academy", type: "Surf school, Isle of Wight", note: "Listed by Wightlink." },
  { name: "Wight Water Adventure Watersports", type: "Watersports, Isle of Wight", url: "https://wightwaters.com/", note: "Lessons with boards and wetsuits supplied." }
];

export const destinations = [
  base("boscombe-pier", {
    name: "Boscombe Pier",
    fullName: "Boscombe Pier beach",
    area: "Boscombe, Bournemouth",
    geo: [50.7190, -1.8430],
    title: "Boscombe Pier Surf Guide: Lessons, Lifeguards & Dog Rules | Surfbooker",
    description: "Surfing beside Boscombe Pier in Bournemouth: small Channel waves, Surf Steps lessons and hire nearby, RNLI lifeguards from March to September, summer dog ban, and seafront food.",
    heroIntro: "Bournemouth's surf hub beside Boscombe Pier — small, inconsistent Channel waves, but surf schools, lifeguards and seafront cafés all within a few minutes' walk.",
    heroAlt: "Boscombe Pier stretching out over the beach",
    images: { hero: lic("boscombe-pier") },
    glance: [
      ["Best for", "Lessons and improvers on small days"],
      ["Break", "Sandy beach break beside a pier"],
      ["Lifeguards", "RNLI (Boscombe East 28 Mar–27 Sep 2026)"],
      ["Dogs", "Banned 1 May–30 Sep"],
      ["Lessons", "Surf Steps, nearby"],
      ["Season", "Autumn and winter swell"]
    ],
    overview: [
      "The beach either side of Boscombe Pier has long been the centre of Bournemouth's surf scene, with surf schools on the promenade and a sandy beach backed by the cliffs and zig-zags.",
      "An artificial surf reef was built off Boscombe in 2009 but never delivered the waves that were promised; it isn't a reason to visit. The surf here depends on Channel swell, which is small and inconsistent."
    ],
    suits: ["First lessons on small days", "Families on a seaside break", "Car-free trips"],
    notFor: ["Reliable surf", "Dogs in summer"],
    surf: {
      text: ["A sandy beach break that needs a south-westerly swell pushing up the Channel; northerly winds are offshore. Most days in summer are flat or tiny."],
      cards: [
        { label: "Level", title: "Beginners to improvers", text: "Gentle when there is swell." },
        { label: "Hazards", title: "Pier and groynes", text: "Keep clear of the pier legs and follow the flags." },
        channel
      ]
    },
    lessons: { providers: [SURFSTEPS] },
    practical: [
      { label: "Lifeguards", title: "RNLI", text: "Boscombe East was patrolled 28 March–27 September and Boscombe West 23 May–6 September in 2026, 10am–6pm." },
      { label: "Dogs", title: "Summer ban", text: BCP_DOG_TEXT },
      { label: "Facilities", title: "Promenade", text: "Toilets, cafés, beach huts and the Boscombe zig-zags." }
    ],
    stay: { areas: [{ label: "Seafront", title: "Boscombe and East Cliff", text: "Hotels and apartments above the beach." }, { label: "Town", title: "Bournemouth", text: "Wider choice a short walk west." }] },
    food: { text: ["Cafés and restaurants line the promenade around the pier, with more in Boscombe and Bournemouth."] },
    todo: [
      { label: "Walk", title: "Promenade to Hengistbury Head", text: "Flat seafront path east past Southbourne." },
      { label: "Gardens", title: "Boscombe Chine Gardens", text: "Gardens running down to the pier." }
    ],
    travel: [{ label: "Rail", title: "Pokesdown or Bournemouth", text: "Then walk or bus to the seafront." }],
    nearby: [
      { name: "Bournemouth", href: "/guides/surfing-bournemouth/", text: "The main pier beach to the west." },
      { name: "Southbourne", href: "/guides/surfing-southbourne/", text: "Quieter beach to the east." }
    ],
    faqs: [
      { q: "Does the Boscombe surf reef work?", a: "No — it never produced the waves promised and isn't a reason to visit. The surf depends on Channel swell." },
      { q: "Are there lifeguards at Boscombe?", a: "Yes. In 2026 Boscombe East was patrolled 28 March–27 September and Boscombe West 23 May–6 September, 10am–6pm." },
      { q: "Can dogs go on Boscombe beach?", a: "Not from 1 May to 30 September." }
    ],
    sources: [RNLI_BCP, BCP_DOGS, { label: "Visit Bournemouth — Surf Steps", url: "https://www.visitbournemouth.com/attractions/surf-steps-bournemouth-surf-school" }],
    editorial: soEditorial
  }),

  base("bournemouth", {
    name: "Bournemouth",
    fullName: "Bournemouth Pier beach",
    area: "Bournemouth, Dorset",
    geo: [50.7160, -1.8750],
    title: "Bournemouth Surf Guide: Beaches, Lessons, Lifeguards & Dogs | Surfbooker",
    description: "Surfing Bournemouth: miles of sandy beach, small Channel waves, Surf Steps lessons, RNLI lifeguards from March to September 2026, the summer dog ban and year-round dog zones.",
    heroIntro: "Seven miles of sandy beach between Poole and Hengistbury Head — sheltered, family-friendly and only occasionally surfy, with lifeguards and facilities everywhere.",
    heroAlt: "Bournemouth beach and pier from the cliffs",
    images: { hero: lic("bournemouth") },
    glance: [
      ["Best for", "Families; small-wave lessons"],
      ["Break", "Sandy beach break with groynes"],
      ["Lifeguards", "RNLI East and West 28 Mar–27 Sep 2026"],
      ["Dogs", "Banned on main beaches 1 May–30 Sep"],
      ["Lessons", "Surf Steps"],
      ["Rail", "Bournemouth station"]
    ],
    overview: [
      "Bournemouth's beach runs unbroken for miles beneath sandy cliffs and chines, with piers at Bournemouth and Boscombe. It's one of the UK's busiest resort beaches and well set up for families.",
      "Poole Bay is sheltered, so surf is occasional — it needs a decent south-westerly Channel swell. When it comes, Boscombe and Southbourne usually get more of it than the town-centre beach."
    ],
    suits: ["Families", "Lessons on small days", "Car-free trips"],
    notFor: ["Regular surf", "Dogs on main beaches in summer"],
    surf: {
      text: ["Small beach-break waves between groynes on a south-westerly swell; northerly winds are offshore."],
      cards: [
        { label: "Level", title: "Beginners", text: "Small and gentle when it works." },
        { label: "Hazards", title: "Groynes and crowds", text: "Groynes, piers and a lot of swimmers in summer." },
        channel
      ]
    },
    lessons: { providers: [SURFSTEPS] },
    practical: [
      { label: "Lifeguards", title: "RNLI", text: "Bournemouth East and West were patrolled 28 March–27 September 2026, with other BCP beaches from late May or mid-July — 10am–6pm." },
      { label: "Dogs", title: "Summer ban", text: BCP_DOG_TEXT + " Middle Chine to Durley Chine is dog-friendly all year." },
      { label: "Facilities", title: "Everywhere", text: "Toilets, cafés, beach huts and zig-zags or lifts down the cliffs." }
    ],
    stay: { areas: [{ label: "Town", title: "Bournemouth", text: "Hotels of every kind on the cliffs and in town." }] },
    food: { text: ["Endless choice on the seafront and in the town centre."] },
    todo: [
      { label: "Gardens", title: "Lower Gardens", text: "Victorian gardens from the pier into town." },
      { label: "Walk", title: "Hengistbury Head", text: "Nature reserve and viewpoint at the east end of the bay." }
    ],
    travel: [{ label: "Rail", title: "Bournemouth station", text: "Direct trains from London Waterloo." }],
    nearby: [
      { name: "Boscombe Pier", href: "/guides/surfing-boscombe-pier/", text: "The local surf hub." },
      { name: "Southbourne", href: "/guides/surfing-southbourne/", text: "Quieter beach further east." },
      { name: "Kimmeridge Bay", href: "/guides/surfing-kimmeridge-bay/", text: "Reef surf in Purbeck — experienced only." }
    ],
    faqs: [
      { q: "Is there surf in Bournemouth?", a: "Occasionally — it needs a south-westerly Channel swell. Boscombe and Southbourne usually pick up more." },
      { q: "Can dogs go on Bournemouth beach in summer?", a: "Not on the main beaches from 1 May to 30 September. Middle Chine to Durley Chine is dog-friendly all year." }
    ],
    sources: [RNLI_BCP, BCP_DOGS],
    editorial: soEditorial
  }),

  base("southbourne", {
    name: "Southbourne",
    fullName: "Southbourne Beach",
    area: "Southbourne, Bournemouth",
    geo: [50.7180, -1.7950],
    title: "Southbourne Surf Guide: Beach, Parking, Lifeguards & Dogs | Surfbooker",
    description: "Southbourne beach in Bournemouth: a quieter stretch towards Hengistbury Head, Warren Edge and Solent Beach car parks, accessible toilets, RNLI lifeguards in summer 2026 and dog rules.",
    heroIntro: "A quieter end of Bournemouth's long beach, below Southbourne's cliff-top high street and towards Hengistbury Head — often a little more swell than the town centre.",
    heroAlt: "Southbourne beach beneath the cliffs",
    images: { hero: lic("southbourne") },
    glance: [
      ["Best for", "Improvers on small swells"],
      ["Break", "Sandy beach break with groynes"],
      ["Lifeguards", "RNLI 23 May–6 Sep 2026"],
      ["Parking", "Warren Edge, Solent Beach"],
      ["Toilets", "Including accessible"],
      ["Dogs", "Zoned — check BCP map"]
    ],
    overview: [
      "Southbourne is the eastern end of Bournemouth's beach, reached from the high street through Fisherman's Walk or by the cliff paths. It's quieter than the pier beaches, with a kiosk, a bistro and a pub nearby.",
      "Being nearer Hengistbury Head, it tends to see a little more swell than the town centre when the Channel delivers."
    ],
    suits: ["Quieter beach days", "Surfers checking several BCP peaks"],
    notFor: ["Reliable surf"],
    surf: {
      text: ["A sandy beach break between groynes on a south-westerly swell; northerly winds are offshore."],
      cards: [
        { label: "Hazards", title: "Groynes", text: "Watch for groynes at higher tides." },
        channel
      ]
    },
    lessons: { providers: [SURFSTEPS] },
    practical: [
      { label: "Parking", title: "Two car parks", text: "Warren Edge and Solent Beach car parks are the nearest." },
      { label: "Toilets", title: "Accessible", text: "Accessible toilets at Gordon's Steps and near Bistro on the Beach." },
      { label: "Lifeguards", title: "RNLI", text: "Southbourne and Fisherman's Walk were patrolled 23 May–6 September 2026, 10am–6pm." },
      { label: "Dogs", title: "Check the zone", text: "Dog rules vary along this stretch in summer — BCP's beach page and dog map show where dogs can and can't go from 1 May to 30 September." }
    ],
    stay: { areas: [{ label: "Village", title: "Southbourne", text: "Guesthouses and holiday lets near the high street." }] },
    food: { text: ["A kiosk on the beach, Bistro on the Beach and a nearby pub; more on Southbourne Grove."] },
    todo: [
      { label: "Walk", title: "Hengistbury Head", text: "Heathland, viewpoints and the land train to Mudeford Sandbank." },
      { label: "Huts", title: "Mudeford Sandbank", text: "The famous beach huts at the end of the headland." }
    ],
    travel: [{ label: "Rail", title: "Pokesdown", text: "Closest station, about 15 minutes' walk." }],
    nearby: [
      { name: "Boscombe Pier", href: "/guides/surfing-boscombe-pier/", text: "Surf schools and lifeguards." },
      { name: "Highcliffe", href: "/guides/surfing-highcliffe/", text: "Across Christchurch Harbour." }
    ],
    faqs: [
      { q: "Where do you park for Southbourne beach?", a: "Warren Edge or Solent Beach car parks." },
      { q: "Is Southbourne lifeguarded?", a: "Yes, from 23 May to 6 September in 2026, 10am–6pm." }
    ],
    sources: [RNLI_BCP, { label: "BCP Council — Southbourne beach", url: "https://www.bcpcouncil.gov.uk/beaches-and-seafront/visit-a-beach/southbourne-beach" }, BCP_DOGS],
    editorial: soEditorial
  }),

  base("highcliffe", {
    name: "Highcliffe",
    fullName: "Highcliffe Beach",
    area: "Highcliffe, Christchurch",
    geo: [50.7370, -1.7000],
    title: "Highcliffe Beach Surf Guide: Parking, Café, Dogs & Access | Surfbooker",
    description: "Highcliffe beach near Christchurch: a Blue Flag shingle-and-sand beach below Highcliffe Castle, two big car parks, the Cliffhanger Café, zig-zag access and summer dog zones.",
    heroIntro: "A long shingle-and-sand beach below the cliffs at Highcliffe, with views to the Needles, two large car parks and a café at the top.",
    heroAlt: "Highcliffe beach with groynes and the Isle of Wight in the distance",
    images: { hero: lic("highcliffe") },
    glance: [
      ["Best for", "Occasional surf; beach walks"],
      ["Break", "Shingle and sand with groynes"],
      ["Parking", "Castle (100+) and Cliff Top (400+)"],
      ["Facilities", "Cliffhanger Café, toilets"],
      ["Dogs", "No dogs H4–H8, 1 May–30 Sep"],
      ["Award", "Blue Flag beach"]
    ],
    overview: [
      "Highcliffe beach runs east of Christchurch Harbour beneath wooded cliffs, with Highcliffe Castle above and the Isle of Wight and Needles across the water. It's mostly shingle with sand at lower tides, divided by groynes.",
      "Surf is occasional and small — it needs a good south-westerly swell. Most visitors come for the beach and walks."
    ],
    suits: ["Beach walks with views", "Families with easy parking"],
    notFor: ["Regular surf", "Sandy-beach learners"],
    surf: {
      text: ["Small, occasional waves on south-westerly swell; shingle and groynes make it less forgiving than sand."],
      cards: [{ label: "Hazards", title: "Groynes and shingle", text: "Steeply shelving shingle in places." }, channel]
    },
    practical: [
      { label: "Parking", title: "Two car parks", text: "Highcliffe Castle car park (100+ spaces, with a redeveloped zig-zag) and Cliff Top car park (400+ spaces, 26 disabled)." },
      { label: "Facilities", title: "Cliffhanger Café", text: "Toilets, baby change and a RADAR-key accessible toilet by the café." },
      { label: "Dogs", title: "Zoned", text: "No dogs between groynes H4 and H8 from 1 May to 30 September; allowed elsewhere." },
      { label: "Access", title: "Zig-zags and Chewton Bunny", text: "Eastern access via Chewton Bunny is mostly on tarmac paths." }
    ],
    stay: { areas: [{ label: "Town", title: "Christchurch and Highcliffe", text: "Hotels and guesthouses nearby." }] },
    food: { places: [{ name: "The Cliffhanger Café", type: "Café", note: "At the cliff-top car park." }] },
    todo: [
      { label: "Heritage", title: "Highcliffe Castle", text: "Gothic Revival mansion on the cliffs." },
      { label: "Nature", title: "Steamer Point Nature Reserve", text: "Woodland at the western end of the beach." }
    ],
    travel: [{ label: "Rail", title: "Hinton Admiral", text: "Nearest station on the Waterloo–Weymouth line." }],
    nearby: [
      { name: "Southbourne", href: "/guides/surfing-southbourne/", text: "Bournemouth's eastern beach." },
      { name: "Compton Bay", href: "/guides/surfing-compton-bay/", text: "Isle of Wight's most consistent surf." }
    ],
    faqs: [
      { q: "Can dogs go on Highcliffe beach?", a: "Yes, except between groynes H4 and H8 from 1 May to 30 September." },
      { q: "Is Highcliffe good for surfing?", a: "Only occasionally, on a good south-westerly swell." }
    ],
    sources: [{ label: "BCP Council — Highcliffe beach", url: "https://www.bcpcouncil.gov.uk/beaches-and-seafront/visit-a-beach/highcliffe-beach" }, BCP_DOGS],
    editorial: soEditorial
  }),

  base("kimmeridge-bay", {
    name: "Kimmeridge Bay",
    area: "Isle of Purbeck, Dorset",
    geo: [50.6100, -2.1300],
    title: "Kimmeridge Bay Surf Guide: Reef Breaks, Toll Road & Wild Seas Centre | Surfbooker",
    description: "Kimmeridge Bay on the Jurassic Coast: rocky ledges and reef breaks for experienced surfers, toll road with parking, toilets, the Wild Seas Centre, snorkel trail and Lulworth Ranges closures.",
    heroIntro: "A rocky bay on the Jurassic Coast with flat limestone ledges, Clavell Tower above, and reef breaks that work on a big Channel swell — strictly for experienced surfers.",
    heroAlt: "Kimmeridge Bay ledges and Clavell Tower",
    images: { hero: lic("kimmeridge-bay") },
    glance: [
      ["Best for", "Experienced surfers"],
      ["Break", "Reef breaks over shale ledges"],
      ["Lifeguards", "None"],
      ["Access", "Toll road from Kimmeridge (includes parking)"],
      ["Facilities", "Toilets incl. disabled"],
      ["Also", "Wild Seas Centre and snorkel trail"]
    ],
    overview: [
      "Kimmeridge Bay is a rock-ledged bay in the Isle of Purbeck, reached by a toll road from Kimmeridge village. Dorset Wildlife Trust's Fine Foundation Wild Seas Centre and a summer snorkel trail make it one of the best places in the south for marine life.",
      "For surfers it's a reef setup over shallow ledges that works on bigger south-westerly swells — consequential, often crowded when it's on, and no place to learn."
    ],
    suits: ["Experienced reef surfers", "Snorkelling and rock pooling", "Jurassic Coast walks"],
    notFor: ["Beginners", "Sandy beach days"],
    surf: {
      text: ["Several reef breaks over shallow shale ledges, best on a solid south-westerly swell with northerly or north-easterly winds. Tide changes the reefs a lot."],
      cards: [
        { label: "Level", title: "Experienced only", text: "Shallow ledges and rock." },
        { label: "Hazards", title: "Reef and ranges", text: "Shallow rock, sharp ledges and the Lulworth Ranges to the west." },
        channel
      ]
    },
    practical: [
      { label: "Access", title: "Toll road", text: "A toll road from Kimmeridge village; the fee includes parking." },
      { label: "Facilities", title: "Toilets", text: "Toilets including disabled facilities." },
      { label: "Ranges", title: "Military closures", text: "The coast to the west can close for Lulworth Ranges firing — check gov.uk access times." },
      { label: "Lifeguards", title: "None", text: "Call 999 and ask for the Coastguard in an emergency." }
    ],
    stay: { areas: [{ label: "Purbeck", title: "Corfe Castle, Swanage, Wareham", text: "Villages and towns within a short drive." }] },
    food: { text: ["Kimmeridge village has a tearoom; Corfe Castle and Swanage have more choice."] },
    todo: [
      { label: "Marine life", title: "Wild Seas Centre and snorkel trail", text: "Dorset Wildlife Trust centre (closed November–March); snorkel trail May–September on calm days." },
      { label: "Museum", title: "The Etches Collection", text: "Jurassic marine fossils in Kimmeridge village." },
      { label: "Landmark", title: "Clavell Tower", text: "Folly above the bay (not open to visitors)." }
    ],
    travel: [{ label: "By car", title: "Via Corfe Castle or Wareham", text: "Single-track lanes to Kimmeridge village." }],
    nearby: [
      { name: "Swanage", href: "/guides/surfing-swanage/", text: "Sheltered resort beach." },
      { name: "Bournemouth", href: "/guides/surfing-bournemouth/", text: "Across Poole Harbour." }
    ],
    faqs: [
      { q: "Can beginners surf Kimmeridge?", a: "No — it's shallow reef over rock ledges, for experienced surfers only." },
      { q: "Do you have to pay to get to Kimmeridge Bay?", a: "Yes, there's a toll road from the village; it includes parking." }
    ],
    sources: [{ label: "Dorset National Landscape — Kimmeridge Bay", url: "https://dorset-nl.org.uk/location/kimmeridge_bay/" }, { label: "Dorset Wildlife Trust — Wild Seas Centre", url: "https://www.dorsetwildlifetrust.org.uk/wild-seas-centre" }],
    editorial: soEditorial
  }),

  base("swanage", {
    name: "Swanage",
    fullName: "Swanage Beach",
    area: "Swanage, Dorset",
    geo: [50.6110, -1.9580],
    title: "Swanage Beach Guide: Surf, Lifeguards, Family Facilities & Walks | Surfbooker",
    description: "Swanage beach in Dorset: a sheltered, family-friendly sandy bay that only rarely has surf, with RNLI lifeguards (23 May–6 Sep 2026), the steam railway, Durlston and Old Harry Rocks.",
    heroIntro: "A sheltered, east-facing sandy bay below a classic Victorian resort — superb for families and swimming, and only rarely surfable.",
    heroAlt: "Swanage beach and bay",
    images: { hero: lic("swanage") },
    glance: [
      ["Best for", "Families, swimming; rare surf"],
      ["Break", "Sheltered sandy bay"],
      ["Lifeguards", "RNLI 23 May–6 Sep 2026"],
      ["Rail", "Swanage Railway (heritage)"],
      ["Walks", "Old Harry Rocks, Durlston"],
      ["Facilities", "Full resort seafront"]
    ],
    overview: [
      "Swanage sits in a sheltered east-facing bay at the end of the Purbeck hills, with a sandy beach, a Victorian pier and a heritage steam railway.",
      "That shelter makes it lovely for families but means surf is rare — it takes a big storm swell wrapping round or an easterly swell. Surfers looking for Purbeck waves usually check Kimmeridge."
    ],
    suits: ["Family holidays", "Swimming and paddling", "Walking the Jurassic Coast"],
    notFor: ["Surf trips"],
    surf: {
      title: "Surf and sea",
      text: ["Swanage only produces surfable waves in unusual conditions. Treat it as a family beach with an occasional bonus."],
      cards: [{ label: "Lifeguards", title: "RNLI daily", text: "23 May–6 September 2026, 10am–6pm." }]
    },
    practical: [
      { label: "Lifeguards", title: "RNLI", text: "Daily 23 May–6 September 2026, 10am–6pm." },
      { label: "Dogs", title: "Seasonal rules", text: "Dorset Council applies seasonal dog restrictions on the main beach — check signs." },
      { label: "Facilities", title: "Seafront", text: "Toilets, cafés and beach huts along the front." }
    ],
    stay: { areas: [{ label: "Town", title: "Swanage", text: "Hotels, B&Bs and holiday lets." }] },
    food: { text: ["Plenty of cafés, fish and chips and pubs on the seafront and high street."] },
    todo: [
      { label: "Walk", title: "Old Harry Rocks", text: "Chalk stacks a clifftop walk north." },
      { label: "Nature", title: "Durlston Country Park", text: "Castle, lighthouse and seabirds south of town." },
      { label: "Railway", title: "Swanage Railway", text: "Steam trains to Corfe Castle." }
    ],
    travel: [{ label: "Ferry", title: "Sandbanks chain ferry", text: "Shortcut from Bournemouth and Poole; otherwise via Wareham." }],
    nearby: [
      { name: "Kimmeridge Bay", href: "/guides/surfing-kimmeridge-bay/", text: "Purbeck's reef breaks." },
      { name: "Bournemouth", href: "/guides/surfing-bournemouth/", text: "Across Poole Harbour." }
    ],
    faqs: [
      { q: "Can you surf at Swanage?", a: "Rarely — the bay is sheltered. Kimmeridge is the Purbeck surf spot, for experienced surfers." },
      { q: "Is Swanage lifeguarded?", a: "Yes, daily from 23 May to 6 September in 2026." }
    ],
    sources: [{ label: "RNLI — Swanage lifeguards 2026", url: "https://rnli.org/news-and-media/2026/may/21/swanage-beach-welcomes-the-return-of-rnli-lifeguard-service" }],
    editorial: soEditorial
  }),

  base("compton-bay", {
    name: "Compton Bay",
    area: "West Wight, Isle of Wight",
    geo: [50.6580, -1.4700],
    title: "Compton Bay Surf Guide, Isle of Wight: Parking, Lessons & Fossils | Surfbooker",
    description: "Compton Bay: the Isle of Wight's most consistent surf beach. National Trust parking via JustPark, toilets at Hanover Point, wooden steps, seasonal dog rules, dinosaur footprints and surf schools.",
    heroIntro: "A long, south-west-facing sweep of sand below chalk downs and crumbling cliffs — the Isle of Wight's most consistent surf, with dinosaur footprints on the beach.",
    heroAlt: "Compton Bay beach below the cliffs and downs",
    images: { hero: lic("compton-bay") },
    glance: [
      ["Best for", "All levels on suitable days"],
      ["Break", "Beach breaks; Hanover Point"],
      ["Lifeguards", "None"],
      ["Parking", "National Trust (JustPark app)"],
      ["Facilities", "Toilets & Changing Places at Hanover Point"],
      ["Dogs", "Seasonal ban west of Compton car park"]
    ],
    overview: [
      "Compton Bay runs along the south-west coast of the Isle of Wight between Freshwater Bay and Brook, below Compton Down. The National Trust looks after the bay and three car parks along the Military Road.",
      "It faces into the prevailing south-westerly swell, so it's the island's most consistent surf, with peaks along the beach and at Hanover Point. The National Trust warns of strong surf and currents depending on the weather."
    ],
    suits: ["Island surf trips", "Improvers and learners with a school", "Fossil hunters"],
    notFor: ["Lifeguarded swimming", "Step-free beach access"],
    surf: {
      text: ["Beach breaks with several peaks, including 'Fields' and Hanover Point. South-westerly swell with north-easterly winds is the classic combination."],
      cards: [
        { label: "Level", title: "All levels", text: "On smaller days; it can get powerful." },
        { label: "Hazards", title: "Currents and cliffs", text: "Strong surf and currents, and eroding cliffs — don't sit below them." },
        channel
      ]
    },
    lessons: { providers: IOW_SCHOOLS },
    practical: [
      { label: "Parking", title: "National Trust car parks", text: "Brook, Hanover and Compton car parks, paid via the JustPark app; free for registered NT members. No overnight parking." },
      { label: "Facilities", title: "Hanover Point", text: "Accessible toilets, baby change and a Changing Places cubicle. A seasonal catering van." },
      { label: "Access", title: "Wooden steps", text: "Steps with handrails down to the beach." },
      { label: "Dogs", title: "Seasonal", text: "Dogs welcome all year between Hanover Point and Brook Chine; seasonal ban west of Compton Bay car park, 15 May–15 September." }
    ],
    stay: { areas: [{ label: "West Wight", title: "Freshwater and Totland", text: "Villages a few minutes away." }] },
    food: { text: ["Just a seasonal van at the beach; Freshwater has pubs and cafés."] },
    todo: [
      { label: "Fossils", title: "Dinosaur footprints", text: "Casts on the beach near Hanover Point; the NT runs guided fossil walks." },
      { label: "Walk", title: "Compton Down", text: "Steep downland walk with big views." },
      { label: "Landmark", title: "The Needles", text: "West along the coast." }
    ],
    travel: [{ label: "Ferry", title: "Lymington–Yarmouth", text: "The closest crossing; Compton is about 15 minutes' drive." }],
    nearby: [
      { name: "Freshwater Bay", href: "/guides/surfing-freshwater-bay-isle-of-wight/", text: "Reef break for experienced surfers." },
      { name: "Shanklin", href: "/guides/surfing-shanklin/", text: "East-coast resort beach." }
    ],
    faqs: [
      { q: "Is Compton Bay good for surfing?", a: "It's the Isle of Wight's most consistent surf beach, facing the south-westerly swell." },
      { q: "How do you pay for parking?", a: "Through the JustPark app; National Trust members park free once registered." },
      { q: "Can dogs go on Compton Bay?", a: "Yes, between Hanover Point and Brook Chine all year. West of the Compton car park, dogs are banned from 15 May to 15 September." }
    ],
    sources: [{ label: "National Trust — Compton Bay and Downs", url: "https://www.nationaltrust.org.uk/visit/isle-of-wight/compton-bay-and-downs" }, IOW],
    editorial: soEditorial
  }),

  base("freshwater-bay-isle-of-wight", {
    name: "Freshwater Bay",
    area: "Freshwater, Isle of Wight",
    geo: [50.6700, -1.5150],
    title: "Freshwater Bay Surf Guide, Isle of Wight: Reef, Parking & Walks | Surfbooker",
    description: "Freshwater Bay on the Isle of Wight: a small cove with a hollow, powerful reef break for experienced surfers, slipway access, parking, Tennyson Down and Compton Bay nearby.",
    heroIntro: "A small chalk-cliffed cove with a slipway and a rocky reef that can be hollow and powerful — one for experienced surfers.",
    heroAlt: "Freshwater Bay cove with chalk cliffs",
    images: { hero: lic("freshwater-bay-isle-of-wight") },
    glance: [
      ["Best for", "Experienced surfers"],
      ["Break", "Rocky reef"],
      ["Lifeguards", "None"],
      ["Access", "Slipway into the bay"],
      ["Walks", "Tennyson Down"],
      ["Nearby", "Compton Bay"]
    ],
    overview: [
      "Freshwater Bay is a small cove between chalk cliffs on the south-west of the Isle of Wight, with a slipway and car park. Wightlink's surf guide describes a rocky reef with hollow, powerful waves, especially at low tide.",
      "Most visitors come for the cove, the walks over Tennyson Down and the Needles — surfers come when the reef is working."
    ],
    suits: ["Experienced reef surfers", "Walkers"],
    notFor: ["Beginners"],
    surf: {
      text: ["A rocky reef break that can be hollow and powerful, especially at low tide. It needs a good swell — check Compton Bay too."],
      cards: [{ label: "Level", title: "Experienced", text: "Rock and shallow water." }, channel]
    },
    lessons: { text: ["Island surf schools usually teach at Compton Bay rather than here."], providers: IOW_SCHOOLS.slice(0, 1) },
    practical: [
      { label: "Parking", title: "By the bay", text: "Parking next to the cove." },
      { label: "Access", title: "Slipway", text: "A slipway leads into the bay." },
      { label: "Lifeguards", title: "None", text: "Call 999 and ask for the Coastguard in an emergency." }
    ],
    stay: { areas: [{ label: "West Wight", title: "Freshwater and Totland", text: "Hotels and holiday lets nearby." }] },
    food: { text: ["Cafés and a hotel overlook the bay; Freshwater village has more."] },
    todo: [
      { label: "Walk", title: "Tennyson Down", text: "Chalk ridge walk to the Needles." },
      { label: "Heritage", title: "Dimbola Museum", text: "Julia Margaret Cameron's home above the bay." }
    ],
    travel: [{ label: "Ferry", title: "Lymington–Yarmouth", text: "Then about 10 minutes' drive." }],
    nearby: [{ name: "Compton Bay", href: "/guides/surfing-compton-bay/", distance: "A few minutes' drive", text: "The island's most consistent beach break." }],
    faqs: [{ q: "Is Freshwater Bay suitable for beginners?", a: "No — it's a rocky reef break. Learners should go to Compton Bay with a school." }],
    sources: [IOW],
    editorial: soEditorial
  }),

  base("shanklin", {
    name: "Shanklin",
    fullName: "Shanklin Beach",
    area: "Shanklin, Isle of Wight",
    geo: [50.6300, -1.1720],
    title: "Shanklin Beach Guide, Isle of Wight: Surf, Facilities, Lift & Dogs | Surfbooker",
    description: "Shanklin beach on the Isle of Wight's east coast: a sandy resort beach with occasional small surf, toilets, cafés, the cliff lift, summer dog ban and Shanklin Chine.",
    heroIntro: "A long sandy resort beach on the Isle of Wight's sheltered east coast, with an esplanade, a cliff lift and only occasional small surf.",
    heroAlt: "Shanklin beach and esplanade",
    images: { hero: lic("shanklin") },
    glance: [
      ["Best for", "Families; occasional small surf"],
      ["Break", "Sandy beach break"],
      ["Dogs", "Not on the beach May–September"],
      ["Facilities", "Three toilet blocks, cafés"],
      ["Access", "Cliff lift and slipways"],
      ["Nearby", "Sandown — gentle learner waves"]
    ],
    overview: [
      "Shanklin's beach and esplanade run beneath the cliffs on the east side of the island, with Shanklin Chine and the Old Village above. It's a classic family resort beach.",
      "The east coast is sheltered from the prevailing swell, so surf is occasional and small — Sandown, next door, is listed by Wightlink as a gentle beginner beach on small swells."
    ],
    suits: ["Family holidays", "Learners on small days"],
    notFor: ["Regular surf"],
    surf: { text: ["Small, occasional waves. Check Compton Bay on the other side of the island for more consistent surf."], cards: [channel] },
    lessons: { providers: IOW_SCHOOLS.slice(0, 1) },
    practical: [
      { label: "Facilities", title: "Esplanade", text: "Toilets in three places (including accessible), kiosks, cafés and play areas." },
      { label: "Access", title: "Cliff lift", text: "A public lift near Shanklin Theatre links the cliff top and esplanade; slipways and steps to the sand." },
      { label: "Dogs", title: "Summer ban", text: "Dogs aren't allowed on the beach from May to September." }
    ],
    stay: { areas: [{ label: "Town", title: "Shanklin", text: "Hotels and guesthouses on the cliffs and in the Old Village." }] },
    food: { text: ["Kiosks and cafés along the esplanade; pubs and tearooms in the Old Village."] },
    todo: [
      { label: "Gorge", title: "Shanklin Chine", text: "Wooded ravine down to the beach." },
      { label: "Village", title: "Shanklin Old Village", text: "Thatched cottages and tearooms." }
    ],
    travel: [{ label: "Rail", title: "Island Line", text: "Trains from Ryde Pier Head (for the Portsmouth fast cat) to Shanklin." }],
    nearby: [{ name: "Compton Bay", href: "/guides/surfing-compton-bay/", text: "The island's most consistent surf." }],
    faqs: [
      { q: "Can you surf at Shanklin?", a: "Occasionally, and it's usually small. Compton Bay is more consistent." },
      { q: "Can dogs go on Shanklin beach?", a: "Not from May to September." }
    ],
    sources: [{ label: "Isle of Wight Council — Shanklin beach information", url: "https://digitalservices.iow.gov.uk/documents/download/shanklin-revised-and-updated-2018-v1" }, IOW],
    editorial: soEditorial
  }),

  base("west-wittering", {
    name: "West Wittering",
    fullName: "West Wittering Beach",
    area: "West Wittering, West Sussex",
    geo: [50.7760, -0.8950],
    title: "West Wittering Surf Guide: Parking, Lifeguards, Dogs & 2XS | Surfbooker",
    description: "West Wittering beach: privately run sandy beach with pre-bookable parking, estate lifeguards, cold showers, a café, dog zones, 2XS surf and watersports centre, and East Head.",
    heroIntro: "A huge, privately managed sandy beach at the mouth of Chichester Harbour — immensely popular in summer, with a watersports centre and surf in autumn and winter.",
    heroAlt: "West Wittering beach and dunes",
    images: { hero: lic("west-wittering") },
    glance: [
      ["Best for", "Families; learners on small days"],
      ["Break", "Sandy beach break"],
      ["Lifeguards", "Estate lifeguards mid-May–mid-Sep"],
      ["Parking", "Pre-book on busy days"],
      ["Dogs", "Not on main beach May–14 Sep 2026"],
      ["Watersports", "2XS centre"]
    ],
    overview: [
      "West Wittering is run by the West Wittering Estate, with a big grass car park behind the dunes and East Head sand spit at the harbour mouth. On hot weekends it fills up — pre-booking parking is strongly advised and essential on sold-out days.",
      "The Witterings' surf is best in autumn and winter, when the waves are uncrowded. In summer the beach is all about families and swimming."
    ],
    suits: ["Families", "Watersports", "Off-season surf"],
    notFor: ["Turning up without booking on summer weekends", "Swimming at The Hinge"],
    surf: {
      text: ["A sandy beach break on south-westerly Channel swell. Autumn and winter are by far the best seasons."],
      cards: [
        { label: "Hazards", title: "The Hinge", text: "Swimming is prohibited at The Hinge because of dangerous currents and sandbars." },
        channel
      ]
    },
    lessons: { providers: [{ name: "2XS West Wittering", type: "Watersports centre", note: "Hire and club membership, tuition, hot showers and a hire/demo centre." }] },
    practical: [
      { label: "Parking", title: "Book ahead", text: "Car park open 06:30–20:30; on sold-out days you must book in advance." },
      { label: "Lifeguards", title: "Estate lifeguards", text: "Mid-May to mid-September, 10am–5pm daily." },
      { label: "Dogs", title: "Main beach restriction", text: "No dogs on the main swimming beach (groynes 14a–18) from May to 14 September in 2026; allowed elsewhere." },
      { label: "Facilities", title: "Toilets and showers", text: "Three toilet blocks (accessible with RADAR key), two cold showers and drinking water." }
    ],
    stay: { areas: [{ label: "Villages", title: "The Witterings", text: "Holiday lets and B&Bs." }, { label: "City", title: "Chichester", text: "Hotels about 20 minutes away." }] },
    food: { places: [{ name: "West Wittering Beach Café", type: "Café", note: "9am–4pm, with a takeaway window." }] },
    todo: [
      { label: "Walk", title: "East Head", text: "National Trust sand spit at the harbour mouth." },
      { label: "Boat", title: "Chichester Harbour", text: "Boat trips from Itchenor." }
    ],
    travel: [{ label: "By car", title: "A286 from Chichester", text: "Traffic queues on summer weekends." }],
    nearby: [
      { name: "East Wittering", href: "/guides/surfing-east-wittering/", text: "Village beach with a surf shop." },
      { name: "Bracklesham Bay", href: "/guides/surfing-bracklesham-bay/", text: "Next beach east." }
    ],
    faqs: [
      { q: "Do I need to book parking at West Wittering?", a: "It's strongly advised, and on sold-out days you can only park with a booking." },
      { q: "Can dogs go on West Wittering beach?", a: "Not on the main swimming beach (groynes 14a–18) from May to 14 September in 2026. Elsewhere, yes." }
    ],
    sources: [{ label: "West Wittering Estate — FAQs", url: "https://www.westwitteringestate.co.uk/faqs/" }, WITT],
    editorial: soEditorial
  }),

  base("east-wittering", {
    name: "East Wittering",
    area: "East Wittering, West Sussex",
    geo: [50.7690, -0.8700],
    title: "East Wittering Surf Guide: Shore Surf Shop, Parking & Season | Surfbooker",
    description: "East Wittering: a shingle-and-sand village beach with Channel surf in autumn and winter, Shore surf shop, public parking and village cafés and pubs.",
    heroIntro: "A shingle-and-sand village beach between West Wittering and Bracklesham, with a surf shop in the village and its best waves in autumn and winter.",
    heroAlt: "East Wittering beach with groynes",
    images: { hero: lic("east-wittering") },
    glance: [
      ["Best for", "Improvers in autumn/winter"],
      ["Break", "Shingle and sand with groynes"],
      ["Lifeguards", "None"],
      ["Surf shop", "Shore, East Wittering"],
      ["Parking", "Public car parks in the village"],
      ["Season", "Autumn and winter"]
    ],
    overview: [
      "East Wittering's beach is steeper shingle at high tide and sand at low, divided by groynes. The village behind it has shops, cafés and pubs, and Shore — one of the area's established surf shops."
    ],
    suits: ["Local surf sessions", "Village base"],
    notFor: ["Summer surf", "Lifeguarded swimming"],
    surf: { text: ["Beach-break waves on south-westerly swell, best at lower tides when the sand is exposed."], cards: [{ label: "Hazards", title: "Groynes and shingle", text: "Steep shingle and groynes at high tide." }, channel] },
    lessons: { providers: [{ name: "Shore", type: "Surf shop, East Wittering", note: "Established surf and watersports shop in the village." }] },
    practical: [
      { label: "Parking", title: "Public car parks", text: "In the village, a short walk from the beach." },
      { label: "Lifeguards", title: "None", text: "Call 999 and ask for the Coastguard in an emergency." }
    ],
    stay: { areas: [{ label: "Village", title: "East Wittering", text: "Holiday lets and B&Bs." }] },
    food: { text: ["Village cafés, shops and pubs close to the beach."] },
    todo: [{ label: "City", title: "Chichester", text: "Cathedral city 20 minutes away." }],
    travel: [{ label: "By car", title: "B2198", text: "From the A286 south of Chichester." }],
    nearby: [
      { name: "West Wittering", href: "/guides/surfing-west-wittering/", text: "Big sandy beach with lifeguards." },
      { name: "Bracklesham Bay", href: "/guides/surfing-bracklesham-bay/", text: "Next beach east." }
    ],
    faqs: [{ q: "When is the best time to surf East Wittering?", a: "Autumn and winter, when Channel swell is most likely and the beach is quiet." }],
    sources: [WITT],
    editorial: soEditorial
  }),

  base("bracklesham-bay", {
    name: "Bracklesham Bay",
    area: "Bracklesham, West Sussex",
    geo: [50.7650, -0.8450],
    title: "Bracklesham Bay Surf Guide: Waves, Watersports & Parking | Surfbooker",
    description: "Bracklesham Bay in West Sussex: shingle-and-sand beach with Channel surf in autumn and winter, The Beach Watersports, public parking, fossils and village amenities.",
    heroIntro: "A shingle-and-sand bay east of the Witterings — known for fossils and, in autumn and winter, Channel surf.",
    heroAlt: "Bracklesham Bay beach",
    images: { hero: lic("bracklesham-bay") },
    glance: [
      ["Best for", "Improvers in autumn/winter"],
      ["Break", "Shingle and sand"],
      ["Lifeguards", "None"],
      ["Watersports", "The Beach Watersports"],
      ["Parking", "Public parking"],
      ["Also", "Fossil beach at low tide"]
    ],
    overview: ["Bracklesham Bay continues east from East Wittering, with shingle above and sand at low tide. It's known for fossils exposed at low tide and has a watersports centre and village amenities."],
    suits: ["Off-season surf", "Fossil hunting"],
    notFor: ["Summer surf"],
    surf: { text: ["Beach-break waves on south-westerly swell; best at lower tides."], cards: [channel] },
    lessons: { providers: [{ name: "The Beach Watersports", type: "Watersports, Bracklesham Bay", note: "Listed by The Great Sussex Way for tuition and hire." }] },
    practical: [
      { label: "Parking", title: "Public parking", text: "Near the beach and village amenities." },
      { label: "Lifeguards", title: "None", text: "Call 999 and ask for the Coastguard in an emergency." }
    ],
    stay: { areas: [{ label: "Villages", title: "Bracklesham and the Witterings", text: "Holiday parks and lets." }] },
    food: { text: ["Cafés and shops in the village."] },
    todo: [{ label: "Fossils", title: "Low-tide fossils", text: "Fossil sharks' teeth and shells wash out at low tide." }],
    travel: [{ label: "By car", title: "B2198", text: "From Chichester." }],
    nearby: [{ name: "East Wittering", href: "/guides/surfing-east-wittering/", text: "Next beach west." }],
    faqs: [{ q: "Can you surf Bracklesham Bay?", a: "Yes, mainly in autumn and winter on a south-westerly swell." }],
    sources: [WITT],
    editorial: soEditorial
  }),

  base("shoreham", {
    name: "Shoreham",
    fullName: "Shoreham Beach",
    area: "Shoreham-by-Sea, West Sussex",
    geo: [50.8270, -0.2730],
    title: "Shoreham Beach Guide: Surf, Nature Reserve, Boardwalk & Safety | Surfbooker",
    description: "Shoreham Beach: a shingle Local Nature Reserve with a boardwalk, occasional Channel surf, the River Adur harbour mouth hazards, Shoreham Fort and Widewater Lagoon.",
    heroIntro: "A long shingle beach and Local Nature Reserve beside the River Adur's harbour mouth — occasional surf, and a lot of nature.",
    heroAlt: "Shoreham Beach shingle and sea",
    images: { hero: lic("shoreham") },
    glance: [
      ["Best for", "Occasional surf; walks"],
      ["Break", "Shingle beach"],
      ["Status", "Local Nature Reserve"],
      ["Access", "1.2km boardwalk"],
      ["Hazards", "Harbour mouth and currents"],
      ["Nearby", "Shoreham Fort, Widewater"]
    ],
    overview: [
      "Shoreham Beach is a shingle spit between the River Adur and the sea. It's a Local Nature Reserve for its vegetated shingle — yellow horned poppy and sea kale — with a boardwalk running across the stones. Barbecues aren't allowed.",
      "The beach picks up Channel swell occasionally. Stay well away from the harbour entrance and its currents and boat traffic."
    ],
    suits: ["Walks and wildlife", "Occasional local surf"],
    notFor: ["Beginners", "Sandy beach days"],
    surf: { text: ["Shingle beach waves on a south-westerly swell. Avoid the harbour mouth."], cards: [{ label: "Hazards", title: "Harbour mouth", text: "Strong currents and boats at the Adur entrance." }, channel] },
    practical: [
      { label: "Access", title: "Boardwalk", text: "A 1.2km boardwalk across the shingle improves access to the shoreline." },
      { label: "Rules", title: "Nature reserve", text: "No barbecues; keep to paths to protect the shingle plants." }
    ],
    stay: { areas: [{ label: "Town", title: "Shoreham-by-Sea", text: "Small town across the Adur Ferry Bridge." }, { label: "City", title: "Brighton", text: "15 minutes east." }] },
    food: { text: ["Cafés on the beach and in Shoreham town across the footbridge."] },
    todo: [
      { label: "Heritage", title: "Shoreham Fort", text: "Victorian fort at the harbour mouth." },
      { label: "Nature", title: "Widewater Lagoon", text: "Saline lagoon at the eastern end." }
    ],
    travel: [{ label: "Rail", title: "Shoreham-by-Sea", text: "Then walk over the Adur Ferry Bridge." }],
    nearby: [{ name: "Brighton", href: "/guides/surfing-brighton/", text: "City surf when the swell arrives." }],
    faqs: [{ q: "Is Shoreham Beach good for beginners?", a: "No — it's steep shingle near a harbour mouth. Look for a sandy beach with a school instead." }],
    sources: [{ label: "Adur & Worthing Councils — beaches", url: "https://www.adur-worthing.gov.uk/beaches/" }],
    editorial: soEditorial
  }),

  base("brighton", {
    name: "Brighton",
    fullName: "Brighton seafront",
    area: "Brighton, East Sussex",
    geo: [50.8190, -0.1370],
    title: "Brighton Surf Guide: When It Works, Dog Rules & Seafront Safety | Surfbooker",
    description: "Surfing in Brighton: an urban shingle seafront with occasional Channel waves around the piers and groynes, Brighton & Hove dog rules (1 May–30 Sep), lifeguards and what to do when it's flat.",
    heroIntro: "An urban shingle seafront where the waves are rare and fickle — but when the Channel delivers, Brighton's surfers are out around the groynes and the old West Pier.",
    heroAlt: "Brighton seafront and pier",
    images: { hero: lic("brighton") },
    glance: [
      ["Best for", "Locals on rare swells"],
      ["Break", "Shingle beach, groynes and piers"],
      ["Dogs", "Only on dog-friendly beaches 1 May–30 Sep"],
      ["Rail", "Brighton station"],
      ["Season", "Autumn and winter"],
      ["Flat days", "The Lanes, Royal Pavilion"]
    ],
    overview: [
      "Brighton's seafront is steep shingle with groynes, the Palace Pier and the ruins of the West Pier. It's not a surf destination in the usual sense — but on a good south-westerly swell, waves break around the structures and the local surf scene turns out.",
      "Convenience is the draw: trains from London, the city behind you, and plenty to do when it's flat, which is most of the time."
    ],
    suits: ["Experienced locals on the right day", "City breaks with a board in the car"],
    notFor: ["Beginners", "Planning a trip around surf"],
    surf: {
      text: ["Waves need a strong south-westerly swell; shingle, groynes and pier structures shape them. Runoff after heavy rain can affect water quality — check before going in."],
      cards: [
        { label: "Level", title: "Experienced", text: "Steep shingle shorebreak and structures." },
        { label: "Hazards", title: "Groynes, piers, shorebreak", text: "Plus crowded water in summer." },
        channel
      ]
    },
    practical: [
      { label: "Dogs", title: "Seasonal", text: "From 1 May to 30 September dogs are allowed only on designated dog-friendly beaches; all beaches from 1 October to 30 April." },
      { label: "Lifeguards", title: "Seasonal", text: "Brighton & Hove runs a seasonal seafront lifeguard service on the busiest beaches — check the council site for dates." },
      { label: "Getting there", title: "Train, not car", text: "Seafront parking is expensive and limited." }
    ],
    stay: { areas: [{ label: "City", title: "Brighton and Hove", text: "Everything from hostels to seafront hotels." }] },
    food: { text: ["Endless choice across the city, from the seafront arches to the Lanes."] },
    todo: [
      { label: "Heritage", title: "Royal Pavilion", text: "George IV's extravagant palace." },
      { label: "Shopping", title: "The Lanes and North Laine", text: "Independent shops and cafés." },
      { label: "Walk", title: "Undercliff Walk", text: "Flat cliff-foot path east from the marina." }
    ],
    travel: [{ label: "Rail", title: "Brighton station", text: "Fast trains from London; the seafront is a 15-minute walk." }],
    nearby: [
      { name: "Shoreham", href: "/guides/surfing-shoreham/", text: "Shingle nature reserve to the west." },
      { name: "East Wittering", href: "/guides/surfing-east-wittering/", text: "Sussex's more surf-focused coast." }
    ],
    faqs: [
      { q: "Is there surf in Brighton?", a: "Rarely. It needs a strong south-westerly swell, and it's best for experienced surfers." },
      { q: "Can dogs go on Brighton beach?", a: "Between 1 May and 30 September only on designated dog-friendly beaches; any beach from October to April." }
    ],
    sources: [{ label: "Brighton & Hove City Council — dog-friendly beaches", url: "https://www.brighton-hove.gov.uk/libraries-leisure-and-arts/seafront/dog-friendly-beaches" }],
    editorial: soEditorial
  }),

  base("eastbourne", {
    name: "Eastbourne",
    fullName: "Eastbourne seafront",
    area: "Eastbourne, East Sussex",
    geo: [50.7650, 0.2900],
    title: "Eastbourne Beach Guide: Surf, Lifeguards, Dog Rules & Watersports | Surfbooker",
    description: "Eastbourne seafront: a sheltered shingle resort beach with rare surf, a seasonal council lifeguard patrol (Wish Tower to Pier), summer dog rules, watersports providers and Beachy Head.",
    heroIntro: "A sheltered shingle resort beach in the lee of Beachy Head — good for swimming, paddleboarding and kayaking, rarely for surfing.",
    heroAlt: "Eastbourne beach and pier",
    images: { hero: lic("eastbourne") },
    glance: [
      ["Best for", "Watersports and swimming"],
      ["Break", "Sheltered shingle; rare surf"],
      ["Lifeguards", "Council patrol, Wish Tower–Pier"],
      ["Dogs", "Banned Wish Tower–Pier 1 May–30 Sep"],
      ["Watersports", "Kayak, SUP, sailing"],
      ["Walk", "Beachy Head"]
    ],
    overview: [
      "Eastbourne's seafront curves north-east from the foot of the South Downs, sheltered by Beachy Head from the prevailing south-westerlies. The beach is shingle with sand at low tide.",
      "That shelter makes it calm for swimming and paddle sports, and means surfable waves are rare."
    ],
    suits: ["Swimmers and paddleboarders", "Family seaside holidays"],
    notFor: ["Surf trips"],
    surf: { title: "Surf and sea", text: ["Surf is rare here — Beachy Head blocks most swell. Watersports providers on the seafront offer kayaking, paddleboarding, sailing and windsurfing."] },
    practical: [
      { label: "Lifeguards", title: "Council patrol", text: "In 2025 the lifeguard patrol covered Wish Tower to the Pier from late May to early September (hours vary by month). Station on Grand Parade." },
      { label: "Dogs", title: "Seasonal", text: "1 May–30 September: no dogs on the main resort beach (Wish Tower to Pier); on leads on other seafront areas, with off-lead allowed on Western and Middle Parades if under control." },
      { label: "Children", title: "Kidzsafe wristbands", text: "Free wristbands from the lifeguards for parents' phone numbers." }
    ],
    stay: { areas: [{ label: "Seafront", title: "Grand Parade", text: "Large seafront hotels." }] },
    food: { text: ["Seafront cafés, the pier and the town centre."] },
    todo: [
      { label: "Walk", title: "Beachy Head and the Seven Sisters", text: "Chalk cliffs west of town." },
      { label: "Watersports", title: "Seafront providers", text: "Kayak and SUP hire and lessons in summer." }
    ],
    travel: [{ label: "Rail", title: "Eastbourne station", text: "Trains from London Victoria and Brighton." }],
    nearby: [{ name: "Brighton", href: "/guides/surfing-brighton/", text: "City seafront along the coast." }],
    faqs: [
      { q: "Can you surf in Eastbourne?", a: "Rarely — Beachy Head shelters the bay from most swell." },
      { q: "Can dogs go on Eastbourne beach?", a: "Not between Wish Tower and the Pier from 1 May to 30 September." }
    ],
    sources: [{ label: "Visit Eastbourne — lifeguards and seafront", url: "https://www.visiteastbourne.com/seafront/lifeguards.aspx" }],
    editorial: soEditorial
  }),

  base("joss-bay", {
    name: "Joss Bay",
    area: "Broadstairs, Kent",
    geo: [51.3730, 1.4400],
    title: "Joss Bay Surf Guide, Broadstairs: Kent Surf School, Lifeguards & Dogs | Surfbooker",
    description: "Joss Bay near Broadstairs: Thanet's surf beach with Kent Surf School, seasonal lifeguards (23 May–6 Sep), a summer daytime dog ban, toilets, café and Kingsgate Bay nearby.",
    heroIntro: "A small sandy bay between chalk cliffs near Broadstairs — Kent's best-known surf beach, with a surf school, lifeguards and a café.",
    heroAlt: "Joss Bay between chalk cliffs",
    images: { hero: lic("joss-bay") },
    glance: [
      ["Best for", "Lessons and improvers"],
      ["Break", "Sandy beach break"],
      ["Lifeguards", "Daily 23 May–6 Sep"],
      ["Dogs", "Banned 10am–6pm, 1 May–30 Sep"],
      ["School", "Kent Surf School"],
      ["Facilities", "Seasonal toilets, café"]
    ],
    overview: [
      "Joss Bay is a 200-metre sandy bay between chalk cliffs on the Isle of Thanet, just north of Broadstairs. Visit Kent calls it Thanet's best surfing beach.",
      "It needs an easterly or north-easterly swell from the North Sea or a big wrap from the Channel, so surf is occasional, but when it's on it's the place in Kent."
    ],
    suits: ["Learners with Kent Surf School", "Families", "London day trips"],
    notFor: ["Reliable surf", "Dogs in summer daytime"],
    surf: {
      text: ["A sandy beach break, small most of the time. Easterly swells and westerly winds are the combination to look for."],
      cards: [{ label: "Level", title: "Beginners to improvers", text: "Gentle when there's swell." }, { label: "Hazards", title: "Chalk reefs", text: "Chalk ledges at the edges of the bay." }]
    },
    lessons: { providers: [{ name: "Kent Surf School", type: "Surf school & hire, Joss Bay", note: "Surfing and SUP lessons plus equipment hire at the bay (Visit Kent)." }] },
    practical: [
      { label: "Lifeguards", title: "Seasonal", text: "Daily from 23 May to 6 September." },
      { label: "Dogs", title: "Summer daytime ban", text: "No dogs 10am–6pm, 1 May–30 September." },
      { label: "Facilities", title: "Toilets and café", text: "Seasonal toilets, disabled toilets, and a beach shop and café." }
    ],
    stay: { areas: [{ label: "Town", title: "Broadstairs", text: "Seaside town a short walk south." }, { label: "Town", title: "Margate", text: "Galleries and nightlife to the west." }] },
    food: { text: ["A beach shop and café at the bay; Broadstairs has plenty more."] },
    todo: [
      { label: "Bay", title: "Kingsgate Bay", text: "Calm, secluded bay with sea caves next door." },
      { label: "Lighthouse", title: "North Foreland", text: "Lighthouse above the bay." },
      { label: "Gallery", title: "Turner Contemporary, Margate", text: "15 minutes away." }
    ],
    travel: [{ label: "Rail", title: "Broadstairs station", text: "High-speed trains from London St Pancras." }],
    nearby: [{ name: "Brighton", href: "/guides/surfing-brighton/", text: "Sussex city seafront." }],
    faqs: [
      { q: "Is Joss Bay good for learning to surf?", a: "Yes, on suitable days — Kent Surf School teaches there and lifeguards patrol in summer." },
      { q: "Can dogs go on Joss Bay?", a: "Not between 10am and 6pm from 1 May to 30 September." }
    ],
    sources: [{ label: "Visit Kent — Joss Bay", url: "https://www.visitkent.co.uk/businesses/joss-bay" }, RNLI],
    editorial: soEditorial
  })
];

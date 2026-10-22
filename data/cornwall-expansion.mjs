const cornwallImage = (fileName) => `/guides/_licensed-images/cornwall/${fileName}`;

function school({
  slug,
  name,
  area,
  locationSlug,
  extraLocationSlugs = [],
  locationLabel,
  website,
  image,
  subtitle,
  summary,
  priceLabel = "Check current pricing",
  minPrice = null,
  durationLabel = "Confirm with the provider",
  sortDurationMinutes = 999,
  formats = ["Group", "Private"],
  audience = ["Adults", "Children", "Family"],
  audienceLabel = "Adults, children and families",
  minAge = null,
  levels = ["Beginner", "Intermediate"],
  facts = [],
  websiteFacts = [],
  lessonPriceSummary = "",
  lessonPriceGroups = [],
  lessonPriceNote = ""
}) {
  return {
    slug,
    name,
    area,
    regionSlug: "cornwall",
    locationSlug,
    extraLocationSlugs,
    locationLabel,
    beachOrder: 20,
    website,
    image: cornwallImage(image),
    imageAlt: `${area} beach used to illustrate ${name}`,
    imageWidth: 1600,
    imageHeight: 1067,
    subtitle,
    priceLabel,
    minPrice,
    durationLabel,
    sortDurationMinutes,
    formats,
    audience,
    audienceLabel,
    minAge,
    levels,
    summary,
    pageIntro: [
      summary,
      "Surfbooker checked the provider's public information in August 2026. Confirm current prices, ages, lesson times, facilities and availability directly with the school before travelling."
    ],
    facts: [
      { label: "Locations served", value: locationLabel },
      { label: "Lesson format", value: formats.join(" and ") + " lessons" },
      ...(durationLabel === "Confirm with the provider" ? [] : [{ label: "Published duration", value: durationLabel }]),
      { label: "Current pricing", value: minPrice === null ? "Check current pricing with the provider" : priceLabel },
      ...facts
    ],
    websiteFacts,
    lessonPriceSummary,
    lessonPriceGroups,
    lessonPriceNote,
    claimMailto: `mailto:hello@surfbooker.com?subject=${encodeURIComponent(`Claim or update ${name}`)}`
  };
}

export const cornwallSchools = [
  school({
    slug: "oa-surf-club", name: "OA Surf Club", area: "Widemouth Bay", locationSlug: "widemouth-bay",
    locationLabel: "Widemouth Bay, Cornwall", website: "https://www.oasurfclub.co.uk/", image: "widemouth-bay.jpg",
    subtitle: "Established Widemouth Bay surf lessons from a dedicated beach base",
    summary: "OA Surf Club offers public surf lessons at Widemouth Bay, including group, private, family and children's options with equipment supplied.",
    priceLabel: "From £42 per person", minPrice: 42, durationLabel: "2 hours", sortDurationMinutes: 120,
    lessonPriceSummary: "Two-hour lessons from £42 per person",
    lessonPriceGroups: [{
      rows: [
        { item: "Group surf lesson", price: "£42 per person" },
        { item: "Duration", price: "2 hours" },
        { item: "Includes", price: "Surfboard and wetsuit" }
      ]
    }],
    facts: [{ label: "Base", value: "Dedicated Widemouth Bay operation" }],
    websiteFacts: ["Group, private and family lesson options", "Equipment is supplied for lessons", "Confirm the current timetable in the live booking flow"]
  }),
  school({
    slug: "big-blue-surf-school", name: "Big Blue Surf School", area: "Summerleaze", locationSlug: "summerleaze",
    locationLabel: "Summerleaze Beach, Bude", website: "https://www.bigbluesurfschool.com/book-now/", image: "summerleaze.jpg",
    subtitle: "Long-established surf lessons from Summerleaze Beach in Bude",
    summary: "Big Blue Surf School runs public surf lessons from Summerleaze Beach for beginners, groups and families.",
    priceLabel: "From £42 per person", minPrice: 42,
    lessonPriceSummary: "Lessons from £42 per person",
    lessonPriceGroups: [
      {
        title: "Group lessons and packages",
        rows: [
          { item: "Group surf lesson", price: "£42 per person" },
          { item: "Two lesson package", price: "£80 per person" },
          { item: "Three lesson package", price: "£115 per person" },
          { item: "Private lesson, September to March", price: "from £90" },
          { item: "Private lesson, April to August", price: "from £120" }
        ]
      },
      {
        title: "Private lesson prices",
        rows: [
          { item: "1 person", price: "£90 Sept–Mar / £120 Apr–Aug" },
          { item: "2 people", price: "£130 Sept–Mar / £160 Apr–Aug" },
          { item: "3 people", price: "£170 Sept–Mar / £200 Apr–Aug" },
          { item: "4 people", price: "£210 Sept–Mar / £240 Apr–Aug" },
          { item: "5 people", price: "£250 Sept–Mar / £280 Apr–Aug" },
          { item: "6 people", price: "£290 Sept–Mar / £320 Apr–Aug" }
        ]
      }
    ],
    facts: [{ label: "Base", value: "Summerleaze Beach" }],
    websiteFacts: ["Established Summerleaze lesson base", "Public group and family lesson options", "Confirm how the OA partnership affects booking before travelling"]
  }),
  school({
    slug: "bude-surfing-experience", name: "Bude Surfing Experience", area: "Summerleaze", locationSlug: "summerleaze",
    extraLocationSlugs: ["widemouth-bay"], locationLabel: "Summerleaze Beach and Widemouth Bay, Bude",
    website: "https://budesurfingexperience.co.uk/", image: "summerleaze.jpg",
    subtitle: "Year-round Bude surf coaching across Summerleaze and Widemouth",
    summary: "Bude Surfing Experience provides group, private and family surf instruction across Summerleaze Beach and Widemouth Bay.",
    priceLabel: "From £45 per person", minPrice: 45,
    lessonPriceSummary: "Group lessons from £45 per person",
    lessonPriceGroups: [{
      rows: [
        { item: "Group surf lesson", price: "£45 per person" },
        { item: "Additional group lessons", price: "£40 per person" },
        { item: "Private 1:1", price: "£120" },
        { item: "Private 1:2", price: "£180" },
        { item: "Private 1:3", price: "£230" },
        { item: "Private 1:4", price: "£260" },
        { item: "Private 1:5", price: "£290" }
      ]
    }],
    websiteFacts: ["Serves two Bude beaches", "Private, family and group coaching", "Check the meeting beach when booking"]
  }),
  school({
    slug: "wavehunters", name: "Wavehunters", area: "Polzeath", locationSlug: "polzeath",
    extraLocationSlugs: ["watergate-bay"], locationLabel: "Polzeath and Watergate Bay, Cornwall",
    website: "https://www.wavehunters.co.uk/surf-lessons-cornwall/", image: "polzeath.jpg",
    subtitle: "One established Cornwall surf-school operation serving Polzeath and Watergate Bay",
    summary: "Wavehunters offers public surf lessons at Polzeath and Watergate Bay from one multi-location operation.",
    priceLabel: "From £45", minPrice: 45, durationLabel: "2 hours", sortDurationMinutes: 120, minAge: 7,
    lessonPriceSummary: "Lessons from £45 per person",
    lessonPriceGroups: [{ rows: [{ item: "Surf lesson", price: "from £45 per person" }] }],
    facts: [{ label: "Minimum age", value: "Group lessons from age 7 on the checked public information" }, { label: "Watergate facilities", value: "Changing, showers and lockers advertised" }],
    websiteFacts: ["Surfing England Centre of Excellence claim", "Equipment included", "One canonical Surfbooker profile covers both locations"]
  }),
  school({
    slug: "surfs-up-surf-school", name: "Surf's Up Surf School", area: "Polzeath", locationSlug: "polzeath",
    locationLabel: "Polzeath, Cornwall", website: "https://surfsupsurfschool.com/", image: "polzeath.jpg",
    subtitle: "Polzeath surf lessons from a specialist school established in 1995",
    summary: "Surf's Up Surf School provides group and private coaching at Polzeath for beginners, improvers and intermediate surfers.",
    priceLabel: "From £45 per person", minPrice: 45,
    lessonPriceSummary: "Group lessons from £45 per person",
    lessonPriceGroups: [{
      rows: [
        { item: "Group lesson", price: "£45 per person" },
        { item: "3 lessons", price: "£125 per person" },
        { item: "4 lessons", price: "£160 per person" },
        { item: "5 lessons", price: "£190 per person" },
        { item: "Private lesson", price: "£100 for the first person" },
        { item: "Additional private-lesson participants", price: "£40 per person, up to six people" }
      ]
    }],
    websiteFacts: ["Operating since 1995", "Beginner, improver and intermediate coaching", "Check current price and age limits with the provider"]
  }),
  school({
    slug: "harlyn-surf-school", name: "Harlyn Surf School", area: "Harlyn Bay", locationSlug: "harlyn-bay",
    locationLabel: "Harlyn Bay, Cornwall", website: "https://www.harlynsurfschool.co.uk/surf-lessons/", image: "harlyn-bay.jpg",
    subtitle: "Group, private and family lessons from a permanent Harlyn Bay base",
    summary: "Harlyn Surf School runs group, private and family lessons from its established base at Harlyn Bay.",
    priceLabel: "From £50 per person", minPrice: 50,
    lessonPriceSummary: "Lessons from £50 per person",
    lessonPriceGroups: [{
      rows: [
        { item: "Beginner and refresher group lesson", price: "from £50 per person" },
        { item: "Private 1:1 lesson", price: "£120" },
        { item: "Private lesson for two", price: "£100 per person" },
        { item: "Family lesson for four", price: "£180" },
        { item: "Additional family member", price: "£45 per person" }
      ]
    }],
    durationLabel: "1.5 hours for the checked family product", sortDurationMinutes: 90,
    websiteFacts: ["Permanent Harlyn Bay base", "Family and private formats", "Suitable for beginners on appropriate days"]
  }),
  school({
    slug: "westcountry-surf-school", name: "Westcountry Surf School", area: "Watergate Bay", locationSlug: "watergate-bay",
    extraLocationSlugs: ["fistral"], locationLabel: "Watergate Bay and private Fistral sessions, Newquay",
    website: "https://surfingschool.co.uk/west-country-surf-school", image: "watergate-bay.jpg",
    subtitle: "Small-group Watergate Bay lessons with selected private Fistral coaching",
    summary: "Westcountry Surf School operates from its Watergate Bay base and advertises small-group instruction plus selected private Fistral options.",
    priceLabel: "From £35 per person", minPrice: 35, durationLabel: "2 hours", sortDurationMinutes: 120,
    lessonPriceSummary: "Two-hour group lessons from £35 per person",
    lessonPriceGroups: [{
      rows: [
        { item: "Standard two-hour beginner group lesson", price: "from £35 per person" },
        { item: "Private two-hour lesson", price: "from £110 per person" },
        { item: "Early or late coaching", price: "£50 per person" }
      ]
    }],
    lessonPriceNote: "The standard group price is supplied by Westcountry Surf School’s current booking partner rather than the school’s own public page.",
    facts: [{ label: "Facilities", value: "Changing and parking advertised at the Watergate base" }],
    websiteFacts: ["Dedicated Watergate base", "Small-group coaching", "Private Fistral options should be confirmed when booking"]
  }),
  school({
    slug: "fistral-beach-surf-school", name: "Fistral Beach Surf School", area: "Fistral", locationSlug: "fistral",
    locationLabel: "Fistral Beach, Newquay", website: "https://www.fistralbeachsurfschool.co.uk/home/", image: "fistral-beach.jpg",
    subtitle: "Public surf lessons from the International Surfing Centre at Fistral",
    summary: "Fistral Beach Surf School runs public lessons from the International Surfing Centre on Cornwall's best-known surf beach.",
    priceLabel: "From £50 per person", minPrice: 50,
    lessonPriceSummary: "Group lessons from £50 per person",
    lessonPriceGroups: [
      {
        title: "Group prices",
        rows: [
          { item: "1 lesson", price: "£50 per person" },
          { item: "2 lessons", price: "£95 per person" },
          { item: "3 lessons", price: "£135 per person" },
          { item: "4 lessons", price: "£175 per person" },
          { item: "5 lessons", price: "£215 per person" },
          { item: "6 lessons", price: "£255 per person" },
          { item: "7 lessons", price: "£295 per person" },
          { item: "Extra equipment hire after the lesson", price: "£15 per person" }
        ]
      },
      {
        title: "Private prices",
        rows: [
          { item: "1 person", price: "£120" },
          { item: "2 people", price: "£85 per person, £170 total" },
          { item: "3 people", price: "£75 per person, £225 total" },
          { item: "4 people", price: "£70 per person, £280 total" },
          { item: "5 people", price: "£60 per person, £300 total" },
          { item: "6 people", price: "£55 per person, £330 total" },
          { item: "7 people", price: "£50 per person, £350 total" },
          { item: "8 people", price: "£45 per person, £360 total" }
        ]
      }
    ],
    websiteFacts: ["International Surfing Centre base", "Public beginner and progression lessons", "Use the provider's live booking page for current prices"]
  }),
  school({
    slug: "quiksilver-surf-school-newquay", name: "Quiksilver Surf School Newquay", area: "Fistral", locationSlug: "fistral",
    locationLabel: "South Fistral, Newquay", website: "http://www.quiksilversurfschoolnewquay.com/", image: "fistral-beach.jpg",
    subtitle: "Established South Fistral surf coaching from the Esplanade side",
    summary: "Quiksilver Surf School Newquay offers group, private and family surf instruction from South Fistral.",
    priceLabel: "From £45 per person", minPrice: 45, durationLabel: "2 hours", sortDurationMinutes: 120,
    lessonPriceSummary: "Two-hour group lessons from £45 per person",
    lessonPriceGroups: [{
      rows: [
        { item: "Two-hour group lesson", price: "£45 per person" },
        { item: "Private lesson", price: "£105" },
        { item: "Two group lessons", price: "£85 per person" },
        { item: "Three group lessons", price: "£120 per person" },
        { item: "Four group lessons", price: "£155 per person" },
        { item: "Five group lessons", price: "£180 per person" },
        { item: "Six group lessons", price: "£210 per person" },
        { item: "Seven group lessons", price: "£230 per person" }
      ]
    }],
    websiteFacts: ["South Fistral operation", "Group, private and family formats", "Check current facilities and prices directly"]
  }),
  school({
    slug: "newquay-activity-centre", name: "Newquay Activity Centre", area: "Fistral", locationSlug: "fistral",
    extraLocationSlugs: ["great-western"], locationLabel: "Fistral Beach and Great Western Beach, Newquay",
    website: "https://newquayactivitycentre.co.uk/surf-lessons/", image: "great-western-beach.jpg",
    subtitle: "Two-hour Newquay surf lessons with group, family and private formats",
    summary: "Newquay Activity Centre provides a large public surf-lesson programme at Fistral and Great Western, with equipment included.",
    priceLabel: "From £52.50", minPrice: 52.5, durationLabel: "2 hours", sortDurationMinutes: 120, minAge: 8,
    lessonPriceSummary: "Lessons from £52.50 per person",
    lessonPriceGroups: [{
      rows: [
        { item: "Group lesson", price: "£52.50" },
        { item: "Family lesson", price: "£240" },
        { item: "Private lesson", price: "£140" }
      ]
    }],
    facts: [{ label: "Group lesson", value: "£52.50 when checked" }, { label: "Family lesson", value: "£240 when checked" }, { label: "Private lesson", value: "£140 when checked" }],
    websiteFacts: ["Group lessons from age 8", "Equipment included", "Do not conflate combined company reviews with the Google school listing"]
  }),
  school({
    slug: "cornish-wave", name: "Cornish Wave", area: "Towan Beach", locationSlug: "towan-newquay",
    extraLocationSlugs: ["fistral"], locationLabel: "Towan Beach and Fistral Beach, Newquay",
    website: "https://cornishwave.com/surf-lessons/", image: "towan-beach.jpg",
    subtitle: "Newquay group, private, couple and family surf lessons",
    summary: "Cornish Wave offers public surf lessons at Towan and Fistral, selecting the appropriate Newquay beach for the booking and conditions.",
    priceLabel: "From £40", minPrice: 40, durationLabel: "2 hours", sortDurationMinutes: 120, minAge: 5,
    lessonPriceSummary: "Lessons from £40 per person",
    lessonPriceGroups: [{ rows: [{ item: "Surf lesson", price: "from £40 per person" }] }],
    facts: [{ label: "Minimum age", value: "Group lessons from age 8; private lessons from age 5 when checked" }, { label: "Facilities", value: "Changing and hot showers advertised" }],
    websiteFacts: ["Group, private, couple and family formats", "Confirm the meeting beach", "Equipment included in the checked lesson information"]
  }),
  school({
    slug: "surf-sanctuary", name: "Surf Sanctuary", area: "Fistral", locationSlug: "fistral",
    locationLabel: "Fistral Beach, Newquay", website: "https://www.surfsanctuary.co.uk/bespoke-surf", image: "fistral-beach.jpg",
    subtitle: "Bespoke private Fistral coaching from the Headland Hotel",
    summary: "Surf Sanctuary specialises in bespoke private surf coaching at Fistral rather than high-volume group lessons.",
    priceLabel: "From £120", minPrice: 120, formats: ["Private"], audience: ["Adults", "Children", "Family"],
    lessonPriceSummary: "Private coaching from £120",
    lessonPriceGroups: [{ rows: [{ item: "Private 1:1 coaching", price: "from £120" }] }],
    facts: [{ label: "1:1 coaching", value: "From £120 when checked" }],
    websiteFacts: ["Headland Hotel base", "Private and bespoke coaching", "Best suited to visitors prioritising individual attention"]
  }),
  school({
    slug: "newquay-surfing-school", name: "NQY Surf School", area: "Great Western", locationSlug: "great-western",
    locationLabel: "Great Western Beach, Newquay", website: "https://www.newquaysurfingschool.com/surf-lessons/", image: "great-western-beach.jpg",
    subtitle: "Long-established on-beach surf school at Great Western",
    summary: "NQY Surf School provides group, private, family and junior lessons from its dedicated Great Western Beach base.",
    priceLabel: "From £40", minPrice: 40, durationLabel: "2 hours", sortDurationMinutes: 120, minAge: 7,
    lessonPriceSummary: "Lessons from £40 per person",
    lessonPriceGroups: [{ rows: [{ item: "Surf lesson", price: "from £40 per person" }] }],
    facts: [{ label: "Facilities", value: "Equipment, changing and lockers advertised" }, { label: "Minimum age", value: "Group lessons from age 7 when checked" }],
    websiteFacts: ["Dedicated Great Western base", "Surfing England and AALA accreditation claimed", "Current Google count was not relied upon for inclusion"]
  }),
  school({
    slug: "big-green-adventures", name: "Big Green Adventures", area: "Crantock", locationSlug: "crantock",
    locationLabel: "Crantock Beach, Cornwall", website: "https://www.biggreenadventures.co.uk/surf-lessons-crantock-cornwall", image: "crantock-beach.jpg",
    subtitle: "Small-group and private lessons from Crantock's dedicated provider",
    summary: "Big Green Adventures offers public surf lessons at Crantock with small group sizes, private options and equipment included.",
    priceLabel: "From £48", minPrice: 48, durationLabel: "2 hours", sortDurationMinutes: 120, minAge: 8,
    lessonPriceSummary: "Lessons from £48 per person",
    lessonPriceGroups: [{
      rows: [
        { item: "Group lesson", price: "from £48 per person" },
        { item: "Private lesson", price: "from £95" }
      ]
    }],
    facts: [{ label: "Group size", value: "Maximum six advertised" }, { label: "Private lesson", value: "From £95 when checked" }],
    websiteFacts: ["Dedicated Crantock provider", "Equipment included", "Group lessons from age 8 when checked"]
  }),
  school({
    slug: "cornwall-surfing-academy", name: "Cornwall Surfing Academy", area: "Holywell Bay", locationSlug: "holywell-bay",
    extraLocationSlugs: ["fistral"], locationLabel: "Holywell Bay and Fistral Beach, Cornwall",
    website: "https://cornwallsurfingacademy.co.uk/", image: "holywell-bay.jpg",
    subtitle: "Established surf coaching across Holywell Bay and Fistral",
    summary: "Cornwall Surfing Academy offers group, private and family lessons through its Holywell Bay and Fistral operations.",
    priceLabel: "From £45 per person", minPrice: 45,
    lessonPriceSummary: "Group lessons from £45 per person",
    lessonPriceGroups: [{
      rows: [{ item: "Group surf lesson", price: "£45 per person" }]
    }],
    lessonPriceNote: "Holywell Bay group lesson bookings include free surf hire for the rest of the day.",
    websiteFacts: ["Two Cornwall bases", "Long-established operation", "Confirm current accreditation, prices and the meeting beach"]
  }),
  school({
    slug: "stoked-surf-school", name: "Stoked Surf School", area: "Perranporth", locationSlug: "perranporth",
    locationLabel: "Perranporth, Cornwall", website: "https://stokedsurfschool.co.uk/surf-lessons/", image: "perranporth.jpg",
    subtitle: "Two-hour Perranporth lessons from an established beach base",
    summary: "Stoked Surf School offers group, private and family instruction from its Perranporth operation with equipment included.",
    priceLabel: "From £45", minPrice: 45, durationLabel: "2 hours", sortDurationMinutes: 120,
    lessonPriceSummary: "Lessons from £45 per person",
    lessonPriceGroups: [{ rows: [{ item: "Surf lesson", price: "from £45 per person" }] }],
    websiteFacts: ["Established Perranporth base", "Equipment included", "Use current local updates for planning but follow RNLI flags on the beach"]
  }),
  school({
    slug: "perranporth-surf-school", name: "Perranporth Surf School", area: "Perranporth", locationSlug: "perranporth",
    locationLabel: "Perranporth, Cornwall", website: "https://www.perranporthsurfschool.co.uk/", image: "perranporth.jpg",
    subtitle: "Specialist Perranporth surf instruction operating since 2004",
    summary: "Perranporth Surf School provides public lessons for beginners and developing surfers from its seasonal beach operation.",
    priceLabel: "From £40 per person", minPrice: 40,
    lessonPriceSummary: "Lessons from £40 per person",
    lessonPriceGroups: [{
      rows: [
        { item: "1 lesson", price: "£40" },
        { item: "2 lessons", price: "£75" },
        { item: "3 lessons", price: "£105" },
        { item: "4 lessons", price: "£130" },
        { item: "5 lessons", price: "£155" },
        { item: "Additional lessons", price: "£25 each" }
      ]
    }],
    durationLabel: "2 hours", sortDurationMinutes: 120, minAge: 7,
    facts: [{ label: "Minimum age", value: "Age 7 and over on the checked public information" }],
    websiteFacts: ["Operating since 2004", "Equipment included", "Winter activity may use the related Piran Surf operation"]
  }),
  school({
    slug: "tris-surf-shop", name: "Tris Surf Shop", area: "Porthtowan", locationSlug: "porthtowan",
    locationLabel: "Porthtowan, Cornwall", website: "https://www.trissurfshop.com/service-page/surf-lesson", image: "porthtowan.jpg",
    subtitle: "Seasonal Porthtowan surf lessons from the established local surf shop",
    summary: "Tris Surf Shop provides seasonal public surf lessons at Porthtowan with equipment included.",
    priceLabel: "From £35", minPrice: 35,
    lessonPriceSummary: "Lessons from £35 per person",
    lessonPriceGroups: [{ rows: [{ item: "Surf lesson", price: "from £35 per person" }] }],
    facts: [{ label: "Group size", value: "Maximum eight advertised" }],
    websiteFacts: ["Established local surf business", "Equipment included", "Reconfirm the 2026 lesson price and accreditation"]
  }),
  school({
    slug: "breakers-surf-school", name: "Breakers Surf School", area: "St Agnes", locationSlug: "st-agnes",
    locationLabel: "Trevaunance Cove, St Agnes", website: "https://surf-lessons.co.uk/", image: "trevaunance-cove.jpg",
    subtitle: "Group, private and children's surf lessons at Trevaunance Cove",
    summary: "Breakers Surf School offers public group, private and children's surf instruction at Trevaunance Cove with equipment supplied.",
    lessonPriceSummary: "Contact Breakers Surf School for current group lesson pricing and availability.",
    lessonPriceGroups: [{
      rows: [{ item: "Private one-to-one lessons", price: "from £90 to £110" }]
    }],
    durationLabel: "Usually 1.5 to 2 hours", sortDurationMinutes: 105,
    websiteFacts: ["Trevaunance Cove specialist", "Equipment supplied", "Current accreditation should be confirmed directly"]
  }),
  school({
    slug: "global-boarders", name: "Global Boarders", area: "Gwithian & Godrevy", locationSlug: "gwithian-godrevy",
    extraLocationSlugs: ["praa-sands"], locationLabel: "Gwithian and Praa Sands, Cornwall",
    website: "https://globalboarders.com/gwithian-surf-school/", image: "gwithian-godrevy.jpg",
    subtitle: "One established Cornwall surf school serving Gwithian and Praa Sands",
    summary: "Global Boarders operates seasonal public surf-school bases at Gwithian and Praa Sands under one canonical business identity.",
    priceLabel: "From £45", minPrice: 45, durationLabel: "2 hours plus 1-hour practice hire on the checked product", sortDurationMinutes: 120,
    lessonPriceSummary: "Lessons from £45 per person",
    lessonPriceGroups: [{ rows: [{ item: "Surf lesson", price: "from £45 per person" }] }],
    facts: [{ label: "Gwithian facilities", value: "Heated changing advertised" }, { label: "Praa facilities", value: "No changing facility advertised when checked" }],
    websiteFacts: ["Operating since 2005", "Surfing England Centre of Excellence claim", "One profile covers both seasonal bases"]
  }),
  school({
    slug: "gwithian-academy-of-surfing", name: "Gwithian Academy of Surfing", area: "Gwithian & Godrevy", locationSlug: "gwithian-godrevy",
    locationLabel: "Gwithian and Godrevy, Cornwall", website: "https://www.surfacademy.co.uk/", image: "gwithian-godrevy.jpg",
    subtitle: "Beginner-to-advanced coaching from a fixed Gwithian base",
    summary: "Gwithian Academy of Surfing provides public lessons and progression coaching from its established St Ives Bay base.",
    priceLabel: "From £45 per person", minPrice: 45,
    lessonPriceSummary: "Beginner and improver lessons from £45 per person",
    lessonPriceGroups: [{
      rows: [{ item: "First beginner or improver lesson", price: "£45 per person" }]
    }],
    lessonPriceNote: "Equipment is included and can be kept for extra practice afterwards.",
    levels: ["Beginner", "Intermediate", "Advanced"],
    facts: [{ label: "Facilities", value: "Changing, parking and video analysis advertised" }],
    websiteFacts: ["Fixed Gwithian base", "Beginner through advanced development", "Video analysis available on selected coaching"]
  }),
  school({
    slug: "hayle-surf-school", name: "Hayle Surf School", area: "Hayle Towans", locationSlug: "hayle-towans",
    locationLabel: "Hayle Towans, Cornwall", website: "https://www.haylesurfschool.co.uk/contact", image: "hayle-towans.jpg",
    subtitle: "Two-hour St Ives Bay surf lessons with private parking",
    summary: "Hayle Surf School provides public surf lessons at Hayle Towans with equipment and private parking advertised.",
    priceLabel: "From £45", minPrice: 45, durationLabel: "2 hours", sortDurationMinutes: 120,
    lessonPriceSummary: "Lessons from £45 per person",
    lessonPriceGroups: [{ rows: [{ item: "Surf lesson", price: "from £45 per person" }] }],
    facts: [{ label: "Young children", value: "Under-8s require a non-surfing adult under the checked policy" }, { label: "Parking", value: "Private parking advertised" }],
    websiteFacts: ["Equipment included", "Dedicated Hayle operation", "Confirm the exact meeting point before travelling"]
  }),
  school({
    slug: "st-ives-surf-school", name: "St Ives Surf School", area: "Porthmeor", locationSlug: "porthmeor",
    locationLabel: "Porthmeor Beach, St Ives", website: "https://www.stivessurfschool.co.uk/", image: "porthmeor-beach.jpg",
    subtitle: "Beginner-to-advanced surf instruction from a permanent Porthmeor HQ",
    summary: "St Ives Surf School offers public surf lessons and progression coaching from its permanent Porthmeor Beach headquarters.",
    priceLabel: "From £45 per person", minPrice: 45,
    lessonPriceSummary: "Group lessons from £45 per person",
    lessonPriceGroups: [{
      rows: [
        { item: "Group surf lesson", price: "£45 per person" },
        { item: "Group surf lesson for groups of four or more", price: "£40 per person" }
      ]
    }],
    levels: ["Beginner", "Intermediate", "Advanced"],
    websiteFacts: ["Permanent Porthmeor HQ", "Surfing England Centre of Excellence claim", "Check current prices with the provider"]
  }),
  school({
    slug: "sennen-surfing-centre", name: "Sennen Surfing Centre", area: "Sennen Cove", locationSlug: "sennen-cove",
    locationLabel: "Sennen Cove, Cornwall", website: "https://sennensurfingcentre.co.uk/", image: "sennen-cove.jpg",
    subtitle: "Long-established public surf lessons from Sennen Beach",
    summary: "Sennen Surfing Centre provides public surf instruction from its established on-beach operation at Sennen Cove.",
    priceLabel: "From £35 per person", minPrice: 35,
    lessonPriceSummary: "Group lessons from £35 per person",
    lessonPriceGroups: [
      {
        title: "Standard lesson prices",
        rows: [
          { item: "1 lesson", price: "£35" },
          { item: "2 lessons", price: "£70" },
          { item: "3 lessons", price: "£100" },
          { item: "4 lessons", price: "£125" },
          { item: "5 lessons", price: "£145" }
        ]
      },
      {
        title: "Private lesson prices",
        rows: [
          { item: "1:1 private lesson", price: "£90" },
          { item: "1:2 private lesson", price: "£120" },
          { item: "Private group of 3 to 5", price: "£45 per person" }
        ]
      }
    ],
    durationLabel: "1.5 hours", sortDurationMinutes: 90,
    facts: [{ label: "Group size", value: "Maximum ten advertised" }],
    websiteFacts: ["Long-established Sennen operation", "Public beginner lessons", "Check current pricing with the provider"]
  })
];

export const cornwallLessonRegion = {
  slug: "cornwall",
  name: "Cornwall",
  label: "Surf lessons",
  pageTitle: "Cornwall Surf Lessons",
  intro: [
    "Compare verified Cornwall surf schools by beach, from Bude and Polzeath through Newquay, Perranporth, St Ives Bay, Sennen and Praa Sands.",
    "Each location page links to one canonical profile per business. Operators with more than one base are listed wherever their verified public coverage applies without duplicating their profile."
  ],
  metaDescription: "Compare verified Cornwall surf lessons by beach, with location pages for Bude, Polzeath, Newquay, Perranporth, St Ives Bay, Sennen and Praa Sands.",
  heroImage: cornwallImage("fistral-beach.jpg"),
  relatedRegions: ["devon", "north-devon", "south-devon"]
};

function location(slug, name, intro, image, relatedAreas) {
  return {
    slug,
    name,
    label: `${name} surf lessons`,
    pageTitle: `Surf lessons in ${name}`,
    intro,
    metaDescription: `Compare verified surf lessons in ${name}, Cornwall, with canonical Surfbooker profiles and links to each provider's official lesson information.`,
    regionSlug: "cornwall",
    image: cornwallImage(image),
    relatedAreas
  };
}

export const cornwallLessonLocations = [
  location("summerleaze", "Summerleaze", ["Summerleaze is Bude's town surf beach, with Big Blue Surf School and Bude Surfing Experience serving public lessons.", "Compare the two verified operators, then confirm the meeting point and current conditions directly."], "summerleaze.jpg", ["Cornwall", "Widemouth Bay", "Polzeath"]),
  location("widemouth-bay", "Widemouth Bay", ["Widemouth Bay has two verified lesson operators: OA Surf Club and Bude Surfing Experience.", "Both serve the wider Bude market, but their bases and lesson formats differ."], "widemouth-bay.jpg", ["Cornwall", "Summerleaze", "Polzeath"]),
  location("polzeath", "Polzeath", ["Polzeath is one of Cornwall's best-established beginner lesson beaches, with Wavehunters and Surf's Up.", "Use the school profiles to compare a multi-location operator with a long-running Polzeath specialist."], "polzeath.jpg", ["Cornwall", "Harlyn Bay", "Watergate Bay"]),
  location("harlyn-bay", "Harlyn Bay", ["Harlyn Surf School provides verified public lessons from its established bay-side base.", "Confirm the current family, group or private format directly before travelling."], "harlyn-bay.jpg", ["Cornwall", "Polzeath", "Watergate Bay"]),
  location("watergate-bay", "Watergate Bay", ["Watergate Bay has verified coverage from Wavehunters and Westcountry Surf School.", "Only providers with confirmed current beach coverage are included."], "watergate-bay.jpg", ["Cornwall", "Mawgan Porth", "Fistral"]),
  location("fistral", "Fistral Beach", ["Fistral has Cornwall's largest verified lesson cluster, ranging from group beginner lessons to bespoke private coaching.", "Compare the provider bases and formats carefully because not every operator uses the same end of the beach."], "fistral-beach.jpg", ["Cornwall", "Towan Beach", "Great Western"]),
  location("towan-newquay", "Towan Beach", ["Cornish Wave provides verified public lesson coverage at Towan as part of its Newquay operation.", "Towan is kept separate from Fistral because its central setting and lesson use are genuinely different."], "towan-beach.jpg", ["Cornwall", "Fistral", "Great Western"]),
  location("great-western", "Great Western Beach", ["Great Western has a dedicated NQY Surf School base and verified lesson coverage from Newquay Activity Centre.", "It deserves its own comparison page rather than being folded into a generic Newquay listing."], "great-western-beach.jpg", ["Cornwall", "Towan Beach", "Fistral"]),
  location("crantock", "Crantock", ["Big Green Adventures is the verified dedicated surf-lesson provider at Crantock.", "Check National Trust parking details and the provider's current meeting instructions before travelling."], "crantock-beach.jpg", ["Cornwall", "Fistral", "Holywell Bay"]),
  location("holywell-bay", "Holywell Bay", ["Cornwall Surfing Academy provides verified public lesson coverage at Holywell Bay.", "The academy also serves Fistral, but receives one canonical Surfbooker profile."], "holywell-bay.jpg", ["Cornwall", "Crantock", "Perranporth"]),
  location("perranporth", "Perranporth", ["Stoked Surf School and Perranporth Surf School provide the verified comparison set for Perranporth.", "Only providers with confirmed current beach coverage are included."], "perranporth.jpg", ["Cornwall", "Holywell Bay", "Porthtowan"]),
  location("porthtowan", "Porthtowan", ["Tris Surf Shop provides verified seasonal public surf lessons at Porthtowan.", "Confirm the live seasonal timetable and current accreditation directly."], "porthtowan.jpg", ["Cornwall", "Perranporth", "St Agnes"]),
  location("st-agnes", "St Agnes", ["Breakers Surf School provides the verified public lesson option at Trevaunance Cove.", "Current accreditation and the day's meeting details should be confirmed directly."], "trevaunance-cove.jpg", ["Cornwall", "Porthtowan", "Gwithian & Godrevy"]),
  location("gwithian-godrevy", "Gwithian & Godrevy", ["Global Boarders and Gwithian Academy of Surfing form the verified comparison set for Gwithian and Godrevy.", "Only providers with a confirmed identity and operating label are included."], "gwithian-godrevy.jpg", ["Cornwall", "Hayle Towans", "Porthmeor"]),
  location("hayle-towans", "Hayle Towans", ["Hayle Surf School is the verified public lesson provider for this initial page.", "Only providers with a confirmed identity and operating coverage are included."], "hayle-towans.jpg", ["Cornwall", "Gwithian & Godrevy", "Porthmeor"]),
  location("porthmeor", "Porthmeor Beach", ["St Ives Surf School provides verified public surf lessons from its permanent Porthmeor headquarters.", "Use the provider profile for current lesson formats and direct booking information."], "porthmeor-beach.jpg", ["Cornwall", "Hayle Towans", "Sennen Cove"]),
  location("sennen-cove", "Sennen Cove", ["Sennen Surfing Centre provides the verified public lesson option at Sennen Cove.", "Confirm current prices, age limits and the day's conditions directly with the centre."], "sennen-cove.jpg", ["Cornwall", "Porthmeor", "Praa Sands"]),
  location("praa-sands", "Praa Sands", ["Global Boarders provides verified seasonal lesson coverage at Praa Sands under the same canonical profile as its Gwithian operation.", "Confirm which base is operating and suitable for the booking before travelling."], "praa-sands.jpg", ["Cornwall", "Sennen Cove", "Gwithian & Godrevy"])
];

export const cornwallAreas = cornwallLessonLocations.map((item) => item.name);

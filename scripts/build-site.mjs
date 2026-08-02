import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const rootDir = process.cwd();
const forceGuideBuild = process.argv.includes("--force-guides");
const buildDate = "2026-08-01";
const baseUrl = "https://surfbooker.com";
const email = "hello@surfbooker.com";
const logoIcon = "/Logo%20no%20words%20transparent.png";
const logoWordmark = "/Logo%20transparent.png";
const logoBackground = "/Logo%20background.png";
const faviconIco = "/favicon.ico";
const favicon48 = "/favicon-48x48.png";
const favicon96 = "/favicon-96x96.png";
const appleTouchIcon = "/apple-touch-icon.png";
const googleRatingsScript = "/google-ratings.js";
const analyticsComment = "<!-- Optional analytics: add Google Analytics 4 or Microsoft Clarity here when ready. -->";
const sharedDisclaimer = "Surfbooker lists surf schools independently, compares details found on provider websites and passes availability requests to the Surfbooker inbox. Prices, lesson times, booking terms and final availability are confirmed by each school. Surfbooker does not take payment at this stage.";
const listingNote = "Independent listings.";
const pricingCheckedNote = "Prices checked against provider websites on 1 August 2026. Final prices and availability are confirmed when you enquire.";
const ogImageAlt = "Surfbooker branding for Devon surf lessons";
const surfGuidesPath = "/guides/";
const westwardHoGuidePath = "/guides/surfing-westward-ho/";
const rnliWestwardHoUrl = "https://rnli.org/find-my-nearest/lifeguarded-beaches/westward-ho-beach";
const northamBurrowsAccessUrl = "https://www.torridge.gov.uk/parks-leisure-and-lifestyle/northam-burrows-country-park/opening-times-entry-fees-and-how-find-us";
const westwardHoWhatsappUrl = "https://wa.me/447853362904?text=Hi%20Surfbooker%2C%20I%27m%20looking%20for%20a%20surf%20lesson%20in%20Westward%20Ho!";

const allAreas = ["Westward Ho!", "Saunton", "Woolacombe", "Croyde", "Putsborough"];
const levelOptions = ["Beginner", "Intermediate", "Advanced", "Family"];
const audienceOptions = [
  { value: "", label: "Any party" },
  { value: "Adults", label: "Adults only" },
  { value: "Children", label: "Children only" },
  { value: "Family", label: "Adults and children" }
];
const formatOptions = [
  { value: "", label: "Any lesson format" },
  { value: "Group", label: "Group lessons" },
  { value: "Private", label: "Private lessons" }
];

const schools = [
  {
    slug: "ho-surf",
    name: "Ho! Surf",
    area: "Westward Ho!",
    locationSlug: "westward-ho",
    locationLabel: "Westward Ho!, Devon",
    beachOrder: 1,
    website: "https://www.surfandkiteshop.co.uk/learn-to-surf",
    image: "https://images.pexels.com/photos/19756565/pexels-photo-19756565.jpeg?cs=srgb&dl=pexels-sergk1-19756565.jpg&fm=jpg",
    imageAlt: "Adult beginner surf lesson with instructor support used to illustrate Ho! Surf in Westward Ho!",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Westward Ho! surf lessons with Ho! Surf and SurfSUP Academy",
    priceLabel: "Check availability",
    minPrice: null,
    durationLabel: "2 hours",
    sortDurationMinutes: 120,
    formats: ["Group"],
    audience: [],
    audienceLabel: "Ask the school about party fit",
    minAge: null,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "The official Ho! Surf lesson page describes two-hour Westward Ho! surf lessons with wetsuit fitting, changing rooms, safety briefing and board allocation before heading to the water.",
    pageIntro: [
      "Ho! Surf is Surfbooker's first Westward Ho! listing. On the official Surf and Kite Shop lesson page, Surfbooker found two-hour surf lessons promoted for beginners through to more experienced surfers, with booking handled on the provider side.",
      "The same page says lessons start from the shop on the village green, where surfers meet the instructor, get fitted with a quality wetsuit, use the on-site changing rooms and leave clothes safely before heading to the beach."
    ],
    facts: [
      { label: "Lesson format", value: "Group lessons" },
      { label: "Duration", value: "2 hours" },
      { label: "Ability levels", value: "Beginner to advanced" },
      { label: "Equipment", value: "Quality wetsuit and board allocation described on the lesson page" },
      { label: "Changing", value: "On-site changing rooms and clothes storage" },
      { label: "Safety", value: "Safety briefing before going to the water" },
      { label: "Instructor note", value: "Instructors hold current beach lifeguard qualifications" },
      { label: "Weather policy", value: "Lessons are rebooked or refunded if conditions are unsafe" }
    ],
    websiteFacts: [
      "Based in the centre of Westward Ho!, around 30 metres from the sea",
      "Two-hour lesson length called out on the official page",
      "Official page says the beach is beginner-friendly and suitable for improving surfers"
    ],
    claimMailto: mailtoForSchool("Ho! Surf")
  },
  {
    slug: "north-devon-surf-school",
    name: "North Devon Surf School",
    area: "Westward Ho!",
    locationSlug: "westward-ho",
    locationLabel: "Westward Ho!, Devon",
    beachOrder: 1,
    website: "https://www.northdevonsurfschool.co.uk/courses-lessons.php",
    image: "https://images.pexels.com/photos/31494099/pexels-photo-31494099.jpeg?cs=srgb&dl=pexels-danielfloresphoto-31494099.jpg&fm=jpg",
    imageAlt: "Young surfer receiving coaching in shallow water used to illustrate North Devon Surf School in Westward Ho!",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Westward Ho! surf school with group and private lessons",
    priceLabel: "From \u00A339",
    minPrice: 39,
    durationLabel: "2 hours",
    sortDurationMinutes: 120,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: null,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "North Devon Surf School publishes two-hour group and private surf lessons at Westward Ho!, with equipment included and heated changing rooms, storage and hot showers listed on the official site.",
    pageIntro: [
      "North Devon Surf School publishes a wide range of surf lessons from \u00A339 and private tuition with a senior coach working exclusively with the booking.",
      "Surfbooker could also verify a purpose-built surf school close to the beach, plus heated changing rooms, secure storage, toilets and hot showers on the provider's own website."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "2 hours" },
      { label: "Public starting price", value: "\u00A339 for 1 x 2 hour group lesson" },
      { label: "Equipment", value: "All equipment included" },
      { label: "Changing", value: "Heated changing rooms, storage, toilets and hot showers" },
      { label: "Parking", value: "Public parking next to the surf school" },
      { label: "Accreditation", value: "Surfing England Centre of Excellence" },
      { label: "Coaching", value: "Suitable for complete beginners through to more experienced surfers" }
    ],
    websiteFacts: [
      "Purpose-built surf school just 50 metres from Westward Ho! beach",
      "Group lessons, multi-lesson packs and private lessons on the official lesson pages",
      "Booking page says visitors should check availability before completing a booking"
    ],
    claimMailto: mailtoForSchool("North Devon Surf School")
  },
  {
    slug: "westward-waves-surf-school",
    name: "Westward Waves Surf School",
    area: "Westward Ho!",
    locationSlug: "westward-ho",
    locationLabel: "Westward Ho!, Devon",
    beachOrder: 1,
    website: "https://www.westwardwavessurfschool.co.uk/prices",
    image: "https://images.pexels.com/photos/6299947/pexels-photo-6299947.jpeg?cs=srgb&dl=pexels-kampus-6299947.jpg&fm=jpg",
    imageAlt: "Young surfer learning with instructor on a gentle wave used to illustrate Westward Waves Surf School in Westward Ho!",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Westward Ho! lessons from a beachside Northam Burrows base",
    priceLabel: "From \u00A335",
    minPrice: 35,
    durationLabel: "2 hours",
    sortDurationMinutes: 120,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Mixed ages and abilities",
    minAge: 6,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "Westward Waves publishes two-hour group lessons from \u00A335 and private coaching from its Northam Burrows base, with winter wetsuits, surfboards and changing facilities listed on the official prices page.",
    pageIntro: [
      "Westward Waves Surf School is based on Northam Burrows in Westward Ho! and promotes both group and private lessons on its official site. The public prices page currently shows group lessons from \u00A335 per person for a two-hour session.",
      "Surfbooker could also verify winter wetsuits, surfboards, winter accessories, changing facilities and minimum age guidance from the school's own FAQs and pricing pages."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "2 hours" },
      { label: "Public starting price", value: "\u00A335 per person for a group lesson" },
      { label: "Equipment", value: "Winter wetsuits, surfboards, boots, gloves and hoods" },
      { label: "Changing", value: "Changing facilities included" },
      { label: "Meeting point", value: "Sandymere Car Park on Northam Burrows" },
      { label: "Minimum age", value: "Group lessons from age 8, private lessons from age 6" },
      { label: "Instructor note", value: "Team pages reference qualified RLLSS beach lifeguards and BSA surf coaches" }
    ],
    websiteFacts: [
      "Westward Ho! lessons for complete beginners through to intermediate surfers",
      "Lessons include a 20 minute beach talk and around 90 minutes in the water",
      "Official site says times are adjusted around the tide and visitors can call if online availability looks full"
    ],
    claimMailto: mailtoForSchool("Westward Waves Surf School")
  },
  {
    slug: "surf-saunton",
    name: "Surf Saunton",
    area: "Saunton",
    locationSlug: "saunton",
    locationLabel: "Saunton Sands, Devon",
    beachOrder: 2,
    website: "https://www.surf-saunton.co.uk/surf-lesson/surf-lesson/",
    image: "https://unsplash.com/photos/LBa-ae7pl3A/download?force=true&w=1400",
    imageAlt: "Recreational surfers in small waves used to illustrate Surf Saunton at Saunton Sands",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Saunton Sands surf school with group, private and kids options",
    priceLabel: "From \u00A345",
    minPrice: 45,
    durationLabel: "2 hours",
    sortDurationMinutes: 120,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 8,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "Surf Saunton publishes two-hour surf lessons from \u00A345 per person at Saunton Sands, alongside private sessions, school groups and kids products on the official website.",
    pageIntro: [
      "Surf Saunton promotes group surf lessons, private one-to-one coaching, private group lessons and dedicated children's products from its base at Saunton Sands. The public lesson page currently shows a two-hour surf lesson from \u00A345 per person.",
      "The official site also describes grouped sessions by experience level, large car parking, toilets, a dry indoor changing option in poor weather and equipment included in the lesson price."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "2 hours" },
      { label: "Public starting price", value: "\u00A345 per person" },
      { label: "Equipment", value: "Board, wetsuit, plus boots and gloves when needed" },
      { label: "Changing", value: "Dry indoor changing available in adverse weather" },
      { label: "Parking", value: "Large car park at Saunton Sands" },
      { label: "Minimum age", value: "Children under 8 need a parent in the water or a private lesson" },
      { label: "Instructor note", value: "Official site references ISA instruction and beach lifeguard qualifications" }
    ],
    websiteFacts: [
      "Morning and afternoon lesson slots are listed on the public surf lesson page",
      "Kids club and school group products are listed separately on the provider website",
      "Official pages say weather and sea conditions are monitored and sessions may be rearranged if needed"
    ],
    claimMailto: mailtoForSchool("Surf Saunton")
  },
  {
    slug: "walking-on-waves",
    name: "Walking on Waves",
    area: "Saunton",
    locationSlug: "saunton",
    locationLabel: "Saunton Sands, Devon",
    beachOrder: 2,
    website: "https://walking-on-waves.com/all-surf-lessons-saunton",
    image: "https://unsplash.com/photos/LWtB-UD9nOM/download?force=true&w=1400",
    imageAlt: "Group of everyday surfers in the sea used to illustrate Walking on Waves at Saunton Sands",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Saunton Sands surf coaching with group, private and kids sessions",
    priceLabel: "From \u00A335 per lesson",
    minPrice: 35,
    durationLabel: "1 to 2 hours",
    sortDurationMinutes: 60,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 4,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "Walking on Waves lists group, private, kids and course-based surf lessons at Saunton Sands, with public pricing from \u00A335 per lesson on multi-session surf courses and ISA-qualified coaching across one-hour to two-hour products.",
    pageIntro: [
      "Walking on Waves is one of the longest-running surf schools in Surfbooker's Saunton set, with public surf lesson pages covering group lessons, private sessions, kids lessons, surf courses and coach-and-ride products.",
      "Surfbooker could verify a maximum 6:1 lesson ratio, indoor changing and storage, on-site toilets and a spread of lesson lengths from one hour to two hours on the provider's own site."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "1 hour to 2 hours depending on session type" },
      { label: "Public starting price", value: "From \u00A335 per lesson on multi-session surf courses" },
      { label: "Equipment", value: "All equipment included" },
      { label: "Changing", value: "Indoor changing and storage available" },
      { label: "Parking", value: "Saunton Sands car park" },
      { label: "Minimum age", value: "Private and kids products from age 4; group lessons from age 8" },
      { label: "Group size", value: "Maximum 6 surfers per instructor" },
      { label: "Accreditation", value: "ISA-qualified instructors with beach lifeguard qualifications" }
    ],
    websiteFacts: [
      "Group lessons run for two hours unless only one or two surfers are booked",
      "Private lessons are listed at 1.5 hours and kids sessions at 1 hour",
      "Walking on Waves describes itself as Saunton's original surf school and says it has delivered lessons since 2003"
    ],
    claimMailto: mailtoForSchool("Walking on Waves")
  },
  {
    slug: "woolacombe-surf-centre",
    name: "Woolacombe Surf Centre",
    area: "Woolacombe",
    locationSlug: "woolacombe",
    locationLabel: "Woolacombe, Devon",
    beachOrder: 3,
    website: "https://www.woolacombesurfcentre.com/activities/surf-lessons/",
    image: "https://unsplash.com/photos/wSofRERMyas/download?force=true&w=1400",
    imageAlt: "People learning to surf close to shore used to illustrate Woolacombe Surf Centre",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Woolacombe village surf school with group, private and one-to-one sessions",
    priceLabel: "From \u00A340",
    minPrice: 40,
    durationLabel: "2 hours",
    sortDurationMinutes: 120,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 8,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "Woolacombe Surf Centre lists two-hour group, private and one-to-one surf sessions, with equipment included and a public group lesson price from \u00A340 on the official surf lessons page.",
    pageIntro: [
      "Woolacombe Surf Centre publishes two-hour surf sessions for all abilities, with separate sections for group lessons, private lessons, one-to-one coaching and larger group bookings.",
      "The official surf lessons page currently shows a single two-hour surf session from \u00A340 and says all required equipment and coaching are included throughout."
    ],
    facts: [
      { label: "Lesson format", value: "Group, private and one-to-one lessons" },
      { label: "Duration", value: "2 hours" },
      { label: "Public starting price", value: "\u00A340 for 1 surf session" },
      { label: "Equipment", value: "All required equipment included" },
      { label: "Coaching", value: "Suitable for first-timers through to more experienced surfers" },
      { label: "Accreditation", value: "Surfing England accredited Centre of Excellence" },
      { label: "Instructor note", value: "Official site says instructors are fully qualified beach lifeguards" },
      { label: "Minimum age", value: "Group lessons from age 8, private lessons for younger surfers" }
    ],
    websiteFacts: [
      "Woolacombe Surf Centre says it provides free session photos on most surf lessons",
      "One-to-one coaching is listed separately at \u00A3120 per session",
      "The school describes itself as village-based, with surf lessons centred around the Atlantic coastline"
    ],
    claimMailto: mailtoForSchool("Woolacombe Surf Centre")
  },
  {
    slug: "surfing-woolacombe",
    name: "Surfing Woolacombe",
    area: "Woolacombe",
    locationSlug: "woolacombe",
    locationLabel: "Woolacombe, Devon",
    beachOrder: 3,
    website: "https://www.surfingwoolacombe.co.uk/surf-lessons",
    image: "https://images.pexels.com/photos/19641766/pexels-photo-19641766.jpeg?cs=srgb&dl=pexels-jonathanborba-19641766.jpg&fm=jpg",
    imageAlt: "Young surfer carrying a surfboard towards the sea used to illustrate Surfing Woolacombe",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Beach slipway surf school with showers, changing and private family options",
    priceLabel: "From \u00A340",
    minPrice: 40,
    durationLabel: "1 to 2 hours",
    sortDurationMinutes: 60,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 8,
    levels: ["Beginner", "Intermediate", "Advanced", "Family"],
    summary: "Surfing Woolacombe lists taster group lessons from \u00A340, longer course bundles and a wide range of private surf lesson formats from its beach slipway base in Woolacombe.",
    pageIntro: [
      "Surfing Woolacombe is positioned directly on the Woolacombe beach slipway and publishes group, private and family-oriented lesson options on its official surf lessons page.",
      "Surfbooker could verify showers, changing facilities, lockers, storage, four-season wetsuits and winter accessories from the school's own surf lesson copy."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "1 hour to 2 hours depending on session type" },
      { label: "Public starting price", value: "\u00A340 for a 2 hour taster group session" },
      { label: "Equipment", value: "Four-season wetsuits, plus boots, gloves and hoods in winter" },
      { label: "Changing", value: "Showers, changing facilities, lockers and storage" },
      { label: "Location note", value: "Based on the Woolacombe beach slipway" },
      { label: "Minimum age", value: "Group lessons from age 8, younger children through private options" },
      { label: "Coaching", value: "Suitable for beginner, intermediate and advanced surfers" }
    ],
    websiteFacts: [
      "Public lesson menu includes course bundles up to five sessions",
      "Private formats range from 1:1 sessions to larger private family groups",
      "Official site says the school has been part of local surf culture since 2002"
    ],
    claimMailto: mailtoForSchool("Surfing Woolacombe")
  },
  {
    slug: "surf-south-west",
    name: "Surf South West",
    area: "Croyde",
    locationSlug: "croyde",
    locationLabel: "Croyde Bay, Devon",
    beachOrder: 4,
    website: "https://www.surfsouthwest.com/learn-to-surf/half-day-surf-lesson/",
    image: "https://unsplash.com/photos/G5kEtnlSmeg/download?force=true&w=1400",
    imageAlt: "Learners and instructors in the water used to illustrate Surf South West in Croyde",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Croyde Bay surf school with group, private and adaptive options",
    priceLabel: "From \u00A345",
    minPrice: 45,
    durationLabel: "2 hours",
    sortDurationMinutes: 120,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: null,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "Surf South West publishes two-hour half-day group surf lessons from \u00A345 and separate private lesson pricing from its Croyde Bay base, while also advertising adaptive and performance products.",
    pageIntro: [
      "Surf South West says it has been running surf lessons at Croyde Bay since 1996 and lists half-day, two-day, weekend, five-day, private and adaptive options on its official site.",
      "The public half-day lesson page shows a two-hour session from \u00A345 per person with all equipment included, while the broader school pages describe changing rooms, storage and specialist adaptive instruction."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "2 hours" },
      { label: "Public starting price", value: "\u00A345 per person for the half-day lesson" },
      { label: "Equipment", value: "All equipment included" },
      { label: "Changing", value: "Changing rooms, toilet and storage area" },
      { label: "Parking", value: "Croyde Burrows Car Park, Moore Lane" },
      { label: "Accreditation", value: "Surfing England Training Centre of Excellence" },
      { label: "Specialist note", value: "Adaptive and performance surf coaching are listed on the official site" }
    ],
    websiteFacts: [
      "Private lesson pricing varies by group size, with younger children able to arrange one-hour sessions",
      "Official site says group lessons suit complete beginners through to intermediate surfers",
      "Surf South West also lists corporate, school and stag or hen group products"
    ],
    claimMailto: mailtoForSchool("Surf South West")
  },
  {
    slug: "surfing-croyde-bay",
    name: "Surfing Croyde Bay",
    area: "Croyde",
    locationSlug: "croyde",
    locationLabel: "Croyde Bay, Devon",
    beachOrder: 4,
    website: "https://surfingcroydebay.co.uk/half-day-surf-lesson/",
    image: "https://unsplash.com/photos/7M3C8KjCEIQ/download?force=true&w=1400",
    imageAlt: "Beginner surfer riding a small wave used to illustrate Surfing Croyde Bay",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "",
    priceLabel: "From \u00A330",
    minPrice: 30,
    durationLabel: "2.5 hours",
    sortDurationMinutes: 150,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 5,
    levels: ["Beginner", "Intermediate", "Advanced", "Family"],
    summary: "Surfing Croyde Bay publishes 2.5 hour half-day surf lessons from \u00A330, private tuition and family options, with all equipment included and a 6:1 coaching ratio described on the official site.",
    pageIntro: [
      "Surfing Croyde Bay is one of the more detailed public lesson sites in the Surfbooker set. The official half-day page shows 2.5 hour group lessons from \u00A330, private lessons, all equipment included and a maximum 6 students to 1 coach ratio.",
      "Surfbooker could also verify warm indoor changing, hot showers and family-focused lesson options from the provider's public lesson pages."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "2.5 hours" },
      { label: "Public starting price", value: "From \u00A330 on the half-day surf lesson page" },
      { label: "Equipment", value: "All equipment included" },
      { label: "Changing", value: "Warm indoor changing and hot showers" },
      { label: "Group size", value: "Maximum 6 students to 1 coach" },
      { label: "Minimum age", value: "Lessons available from age 5" },
      { label: "Accreditation", value: "Official pages reference a Surfing England Centre of Excellence" }
    ],
    websiteFacts: [
      "Beginner surf lesson pages also show a \u00A335 single lesson and \u00A3130 beginner private lesson",
      "Official copy says lessons cater for complete beginners through to competitive surfers",
      "Family lessons are listed separately on the provider website"
    ],
    claimMailto: mailtoForSchool("Surfing Croyde Bay")
  },
  {
    slug: "nick-thorn-surf-coaching",
    name: "Nick Thorn Surf Coaching",
    area: "Putsborough",
    locationSlug: "putsborough",
    locationLabel: "Putsborough, Devon",
    beachOrder: 5,
    website: "https://nickthorn.com/surf-school/",
    image: "https://unsplash.com/photos/VEmX6t4_MCQ/download?force=true&w=1400",
    imageAlt: "Casual surfer on a small wave used to illustrate Nick Thorn Surf Coaching at Putsborough",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Putsborough surf school with group, private and family sessions",
    priceLabel: "From \u00A338",
    minPrice: 38,
    durationLabel: "1.5 to 2 hours",
    sortDurationMinutes: 90,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 8,
    levels: ["Beginner", "Intermediate", "Advanced", "Family"],
    summary: "Nick Thorn Surf Coaching runs surf sessions from \u00A338, private coaching, family sessions and Surfing England accreditation on the official site.",
    pageIntro: [
      "Nick Thorn Surf Coaching describes itself as a Putsborough-based Devon surf school and lifeguard training centre, with public surf school pricing for group sessions, private tuition and family sessions on the official page.",
      "Surfbooker could verify two-hour group lessons from \u00A338, private coaching from 1.5 hours, family sessions and a broad age range around the Putsborough surf school offer."
    ],
    facts: [
      { label: "Lesson format", value: "Group, private and family sessions" },
      { label: "Duration", value: "1.5 hours to 2 hours" },
      { label: "Public starting price", value: "\u00A338 for 1 group session" },
      { label: "Equipment", value: "Wetsuits, surfboards, boots, gloves and hoods available through the school" },
      { label: "Minimum age", value: "Surf school page says lessons are for ages 8 and above" },
      { label: "Accreditation", value: "Surfing England accredited and described as a lifeguard training centre" },
      { label: "Beach base", value: "Sessions run from Putsborough beach" },
      { label: "Facilities", value: "Putsborough beach facilities and cafe are highlighted on the official site" }
    ],
    websiteFacts: [
      "Group sessions, private tuition and family sessions all have public pricing on the school page",
      "Official copy says the team caters for individuals, groups, schools and corporate training days",
      "The provider also lists surf hire and paddleboarding from the same Devon base"
    ],
    claimMailto: mailtoForSchool("Nick Thorn Surf Coaching")
  },
  {
    slug: "barefoot-surf-school",
    name: "Barefoot Surf School",
    area: "Putsborough",
    locationSlug: "putsborough",
    locationLabel: "Putsborough Sands, Devon",
    beachOrder: 5,
    website: "https://www.barefootsurf.com/surf%20lessons.html",
    image: "https://images.pexels.com/photos/33384835/pexels-photo-33384835.jpeg?cs=srgb&dl=pexels-dark-astraal-1074241714-33384835.jpg&fm=jpg",
    imageAlt: "Surfers preparing on the sand used to illustrate Barefoot Surf School at Putsborough Sands",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Putsborough Sands private and family surf school",
    priceLabel: "From \u00A3100",
    minPrice: 100,
    durationLabel: "90 minutes",
    sortDurationMinutes: 90,
    formats: ["Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: null,
    levels: ["Beginner", "Intermediate", "Advanced", "Family"],
    summary: "Barefoot Surf School focuses on private 1:1 or 2:1 coaching and family surf lessons at Putsborough Sands, with public prices from \u00A3100 and 90-minute sessions described on the official site.",
    pageIntro: [
      "Barefoot Surf School is a family-run, accredited surf school based at Putsborough. Its public lesson pages focus on private 1:1 or 2:1 tuition plus family surf lessons held at Putsborough Sands.",
      "Surfbooker could verify 90-minute lesson lengths, a \u00A3100 starting price for 1:1 lessons, board and wetsuit hire included in lesson pricing and a dedicated private instructor format from the provider's own pages."
    ],
    facts: [
      { label: "Lesson format", value: "Private and family lessons" },
      { label: "Duration", value: "90 minutes" },
      { label: "Public starting price", value: "\u00A3100 for a 1:1 lesson" },
      { label: "Equipment", value: "Board and wetsuit hire included in lesson prices" },
      { label: "Meeting point", value: "Putsborough car park meeting point is described on the family lesson page" },
      { label: "Group size", value: "1:1, 2:1 and family session formats" },
      { label: "Accreditation", value: "Official site describes Barefoot as an accredited surf school" },
      { label: "Coaching note", value: "Private tuition is promoted for beginners through to surfers refining technique" }
    ],
    websiteFacts: [
      "Family sessions are priced for four people with extra members added separately",
      "Official copy says the school specialises in beginners but also supports progression in private coaching",
      "Lessons are held at Putsborough Sands rather than in Woolacombe village or Croyde"
    ],
    claimMailto: mailtoForSchool("Barefoot Surf School")
  }
];

const locations = [
  {
    slug: "north-devon",
    name: "Devon",
    label: "Devon surf lessons",
    pageTitle: "Devon Surf Lessons",
    intro: [
      "Surfbooker currently covers five Devon surf lesson areas: Westward Ho!, Saunton Sands, Woolacombe, Croyde Bay and Putsborough. Across those beaches, the current production listing set covers 11 surf schools with public lesson pages.",
      "Use this page to move from the wider Devon picture into the individual beach pages, then into each school page before you enquire or click through to the provider website."
    ],
    metaDescription: "Compare Devon surf lessons across Westward Ho!, Saunton, Woolacombe, Croyde and Putsborough. Browse beach pages, public lesson details and individual surf school pages on Surfbooker.",
    relatedAreas: ["Westward Ho!", "Saunton", "Woolacombe", "Croyde", "Putsborough"]
  },
  {
    slug: "westward-ho",
    name: "Westward Ho!",
    label: "Westward Ho! surf lessons",
    pageTitle: "Surf lessons in Westward Ho!",
    intro: [
      "Westward Ho! is Surfbooker's largest single beach cluster right now, with Ho! Surf, North Devon Surf School and Westward Waves Surf School all publishing surf lesson information for the area.",
      "Between them, Surfbooker could verify two-hour lesson products, wetsuit and equipment notes, and a mix of group or private coaching formats from each provider's official pages."
    ],
    metaDescription: "Compare surf lessons in Westward Ho!, Devon. Browse Ho! Surf, North Devon Surf School and Westward Waves with public lesson details and internal school pages.",
    relatedAreas: ["Devon", "Saunton", "Woolacombe"]
  },
  {
    slug: "saunton",
    name: "Saunton",
    label: "Saunton surf lessons",
    pageTitle: "Surf lessons in Saunton",
    intro: [
      "Surfbooker's Saunton pages currently cover Surf Saunton and Walking on Waves, two schools with detailed public lesson pages centred on Saunton Sands.",
      "The official websites in this area show a strong mix of group lessons, private coaching, kids products and progression-focused surf courses, plus practical details such as parking, changing and equipment."
    ],
    metaDescription: "Compare surf lessons in Saunton Sands, Devon. Browse Surf Saunton and Walking on Waves with public lesson prices, formats and internal Surfbooker school pages.",
    relatedAreas: ["Devon", "Westward Ho!", "Woolacombe"]
  },
  {
    slug: "woolacombe",
    name: "Woolacombe",
    label: "Woolacombe surf lessons",
    pageTitle: "Surf lessons in Woolacombe",
    intro: [
      "Woolacombe gives Surfbooker two distinct listing styles: Woolacombe Surf Centre from the village side and Surfing Woolacombe directly from the beach slipway.",
      "Both providers publish public lesson information, but they position themselves differently, so the internal school pages are useful before you decide which Woolacombe base fits your day."
    ],
    metaDescription: "Compare surf lessons in Woolacombe, Devon. Browse Woolacombe Surf Centre and Surfing Woolacombe with public lesson details and internal Surfbooker pages.",
    relatedAreas: ["Devon", "Saunton", "Croyde"]
  },
  {
    slug: "croyde",
    name: "Croyde",
    label: "Croyde surf lessons",
    pageTitle: "Surf lessons in Croyde",
    intro: [
      "Surfbooker's Croyde pages currently compare Surf South West and Surfing Croyde Bay. Both schools publish substantial surf lesson information, but their public lesson formats and pricing structure differ.",
      "If you want the clearest comparison, use this page first, then move into the individual school pages to compare 2-hour versus 2.5-hour lesson formats, public prices and facilities."
    ],
    metaDescription: "Compare surf lessons in Croyde Bay, Devon. Browse Surf South West and Surfing Croyde Bay with public lesson prices, facilities and internal school pages.",
    relatedAreas: ["Devon", "Woolacombe", "Putsborough"]
  },
  {
    slug: "putsborough",
    name: "Putsborough",
    label: "Putsborough surf lessons",
    pageTitle: "Surf lessons in Putsborough",
    intro: [
      "Putsborough is Surfbooker's more private-coaching-led location set, with Nick Thorn Surf Coaching and Barefoot Surf School both publishing surf lesson information tied directly to Putsborough beach.",
      "These schools present different teaching styles and pricing structures, so Surfbooker's internal pages help you compare group-friendly surf school products against private and family-focused coaching."
    ],
    metaDescription: "Compare surf lessons in Putsborough, Devon. Browse Nick Thorn Surf Coaching and Barefoot Surf School with public lesson details and internal Surfbooker pages.",
    relatedAreas: ["Devon", "Croyde", "Woolacombe"]
  }
];

const utilityPages = [
  {
    path: "contact/index.html",
    title: "Contact Surfbooker | General Questions and Surf School Enquiries",
    description: "Contact Surfbooker with a general question, surf lesson enquiry, listing update or surf school partnership request.",
    h1: "How can we help?",
    label: "Contact Surfbooker",
    intro: "Have a question about Surfbooker, a listed surf school or working with us? Send us a message and we'll get back to you as soon as possible.",
    body: `
      <section class="simple-card simple-copy">
        <div class="simple-grid contact-options-grid">
          <div class="simple-card-content">
            <p class="section-label">General message form</p>
            <h2>Send a general message</h2>
            <p>Use this form for general questions, help finding a surf lesson, listing issues, partnership requests or website problems.</p>
            <div class="simple-facts">
              <div><span>Email</span><strong><a class="text-link" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></strong></div>
            </div>
          </div>
        </div>
      </section>
      <section class="simple-card">
        <form class="contact-form" id="general-contact-form" name="general-contact" method="POST" action="/contact/" data-netlify="true" netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="general-contact">
          <p class="sr-only"><label>Do not fill this out if you're human: <input name="bot-field"></label></p>
          <label><span>Name</span><input type="text" name="name" required></label>
          <label><span>Email address</span><input type="email" name="email" required></label>
          <label><span>Phone number</span><input type="tel" name="phone"></label>
          <label>
            <span>Subject</span>
            <select name="subject" required>
              <option value="">Select a subject</option>
              <option value="General question">General question</option>
              <option value="Help finding a surf lesson">Help finding a surf lesson</option>
              <option value="Question about a listing">Question about a listing</option>
              <option value="Surf school partnership">Surf school partnership</option>
              <option value="Update or remove a listing">Update or remove a listing</option>
              <option value="Website problem">Website problem</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label><span>Message</span><textarea name="message" rows="6" required></textarea></label>
          <label class="consent-row">
            <input type="checkbox" name="consent" value="yes" required>
            <span>I agree that Surfbooker may use these details to respond to my message.</span>
          </label>
          <p class="field-note">We'll only use your details to respond to your enquiry.</p>
          <button type="submit">Send message</button>
          <p class="form-status" id="general-contact-status" aria-live="polite"></p>
        </form>
        <script>
          const generalContactForm = document.getElementById("general-contact-form");
          const generalContactStatus = document.getElementById("general-contact-status");

          function encodeGeneralContact(data) {
            return Object.keys(data).map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join("&");
          }

          generalContactForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            generalContactStatus.textContent = "Sending your message...";

            const payload = {
              "form-name": generalContactForm.getAttribute("name"),
              "bot-field": generalContactForm.elements["bot-field"].value,
              name: generalContactForm.elements["name"].value,
              email: generalContactForm.elements["email"].value,
              phone: generalContactForm.elements["phone"].value,
              subject: generalContactForm.elements["subject"].value,
              message: generalContactForm.elements["message"].value,
              consent: generalContactForm.elements["consent"].checked ? "yes" : "no"
            };

            try {
              const response = await fetch("/contact/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encodeGeneralContact(payload)
              });

              if (!response.ok) {
                throw new Error("Submission failed");
              }

              generalContactStatus.textContent = "Message sent. Surfbooker will get back to you as soon as possible.";
              generalContactForm.reset();
            } catch (error) {
              generalContactStatus.textContent = "Your message could not be sent just now. Please try again or email hello@surfbooker.com.";
            }
          });
        </script>
      </section>
    `,
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Contact", url: "/contact/" }
    ]
  },
  {
    path: "privacy/index.html",
    title: "Privacy | Surfbooker",
    description: "Privacy information for Surfbooker enquiry forms, provider forms and basic site activity tracking.",
    h1: "Privacy",
    label: "Privacy",
    intro: "Surfbooker uses form submissions to respond to surf lesson enquiries, provider requests and listing updates.",
    body: `
      <section class="simple-card simple-copy">
        <h2>What Surfbooker collects</h2>
        <p>Surfbooker currently collects the details you submit through the lesson enquiry form, contact form, list-your-surf-school form and claim or update form. That typically includes names, email addresses, preferred lesson dates, party details and the message you choose to send.</p>
        <p>Surfbooker also includes a lightweight Netlify-backed activity form used for basic event tracking such as listing views, searches and enquiries. No live Google Analytics or Microsoft Clarity script is installed on the production files generated in this repository.</p>
      </section>
      <section class="simple-card simple-copy">
        <h2>How the information is used</h2>
        <p>Surfbooker uses the data to respond to your request, improve listing quality, understand which pages are being used and route provider or consumer follow-up through ${escapeHtml(email)}.</p>
        <p>If you want a listing corrected, a provider message removed or a request handled manually, email <a class="text-link" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>.</p>
      </section>
    `,
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Privacy", url: "/privacy/" }
    ]
  },
  {
    path: "terms/index.html",
    title: "Terms | Surfbooker",
    description: "Terms for using Surfbooker to compare surf schools, review public lesson details and send enquiries.",
    h1: "Terms",
    label: "Terms",
    intro: "Surfbooker is a comparison and enquiry site, not the lesson operator.",
    body: `
      <section class="simple-card simple-copy">
        <h2>What Surfbooker does</h2>
        <p>Surfbooker compares public lesson information, creates internal school and location pages, and forwards enquiries to the Surfbooker inbox. Surfbooker does not currently process live lesson availability, confirm bookings or take direct payment on the production files in this repository.</p>
      </section>
      <section class="simple-card simple-copy">
        <h2>What the surf school confirms</h2>
        <p>Each school remains responsible for lesson delivery, availability, final pricing, waivers, refunds, cancellations, safety procedures and booking confirmation. You should confirm final lesson details directly with the provider before attending.</p>
      </section>
    `,
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Terms", url: "/terms/" }
    ]
  },
  {
    path: "list-your-surf-school/index.html",
    title: "List your surf school | Surfbooker",
    description: "Ask Surfbooker to add a new surf school listing for Devon or send provider details for review.",
    h1: "List your surf school",
    label: "Providers",
    intro: "Use this page if your surf school is not yet listed on Surfbooker or if you want to submit a new provider profile for review.",
    body: `
      <section class="simple-card simple-copy">
        <p>Surfbooker currently focuses on surf lesson comparison pages. If you run a surf school and want to appear in the production listing set, send the core lesson page, your location, the lesson formats you want surfaced and any practical notes you want checked.</p>
      </section>
      <section class="simple-card">
        <form class="provider-form" name="provider-listing" method="POST" action="/list-your-surf-school/" data-netlify="true" netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="provider-listing">
          <p class="sr-only"><label>Do not fill this out if you're human: <input name="bot-field"></label></p>
          <label><span>Surf school</span><input type="text" name="school" required></label>
          <label><span>Contact name</span><input type="text" name="contact_name" required></label>
          <label><span>Email</span><input type="email" name="email" required></label>
          <label><span>Website</span><input type="url" name="website" placeholder="https://"></label>
          <label><span>Beach or area</span><input type="text" name="area" placeholder="Westward Ho!, Saunton, Woolacombe, Croyde or Putsborough"></label>
          <label><span>Message</span><textarea name="message" rows="5" required></textarea></label>
          <button type="submit">Send provider request</button>
        </form>
      </section>
    `,
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "List your surf school", url: "/list-your-surf-school/" }
    ]
  },
];

const westwardHoGuideImage = schools.find((school) => school.slug === "westward-waves-surf-school");

const guidePages = [
  {
    slug: "surfing-westward-ho",
    path: westwardHoGuidePath,
    title: "Surfing Westward Ho!: Honest Surf Spot Review | Surfbooker",
    description: "An honest review of surfing at Westward Ho!, including waves, tides, beginner suitability, parking, facilities and Northam Burrows access.",
    h1: "Surfing at Westward Ho!: an honest Surfbooker review",
    label: "Surfbooker beach review",
    intro: "Wave conditions, beginner suitability, parking, facilities and what to know before you surf.",
    updatedLabel: "Updated 1 August 2026",
    image: westwardHoGuideImage.image,
    imageAlt: "Beginner surfer riding a small wave on a wide sandy beach in an illustrative Surfbooker editorial image",
    imageWidth: westwardHoGuideImage.imageWidth,
    imageHeight: westwardHoGuideImage.imageHeight,
    compareHref: buildAreaCompareHref("Westward Ho!"),
    schoolSlugs: ["ho-surf", "north-devon-surf-school", "westward-waves-surf-school"],
    officialLinks: [
      {
        href: rnliWestwardHoUrl,
        label: "RNLI Westward Ho! beach information (opens in a new tab)"
      },
      {
        href: northamBurrowsAccessUrl,
        label: "Torridge District Council Northam Burrows access information (opens in a new tab)"
      }
    ]
  }
];

build();

function build() {
  write("index.html", renderHomePage());

  for (const page of utilityPages) {
    write(page.path, renderUtilityPage(page));
  }

  write("guides/index.html", renderGuidesIndexPage(), { preserveExisting: !forceGuideBuild });

  for (const guide of guidePages) {
    write(join("guides", guide.slug, "index.html"), renderGuidePage(guide), { preserveExisting: !forceGuideBuild });
  }

  for (const location of locations) {
    write(join("surf-lessons", location.slug, "index.html"), renderLocationPage(location));
  }

  for (const school of schools) {
    write(join("surf-schools", school.slug, "index.html"), renderSchoolPage(school));
  }

  write("404.html", renderNotFoundPage());
  write("robots.txt", renderRobots());
  write("sitemap.xml", renderSitemap());
}

function renderHomePage() {
  const title = "Compare Devon Surf Lessons | Surfbooker";
  const description = "Compare Devon surf schools in one place.";
  const homeListings = schools.map(toListingData);
  const northDevonUrl = "/surf-lessons/north-devon/";
  const homepageFaqs = [
    {
      question: "How much does a surf lesson in Devon cost?",
      answer: "Public starting prices in Surfbooker's current Devon listings range from \u00A330 for Surfing Croyde Bay's half-day lesson to \u00A3100 for Barefoot Surf School's private 1:1 session. Several listed group lessons start between \u00A335 and \u00A345 per person."
    },
    {
      question: "Is surf equipment included?",
      answer: "Most listed schools say a surfboard and wetsuit are included. Some also publish extra equipment such as boots, gloves, hoods, changing facilities or storage, which you can compare on each listing and school page."
    },
    {
      question: "Which Devon beach is best for beginners?",
      answer: "Surfbooker lists beginner lesson options across Westward Ho!, Saunton, Woolacombe, Croyde and Putsborough. The right beach depends on the school, lesson format and the day's conditions, so compare the school pages and then enquire."
    },
    {
      question: "Can children take surf lessons?",
      answer: "Yes. Several listed schools publish children, family or younger-surfer options, but the published age guidance varies by provider. Use the adults and children filter together with the minimum age filter, then confirm the fit with the school."
    },
    {
      question: "Should I choose a group or private lesson?",
      answer: "Group lessons usually show the lowest public starting prices, while private lessons can suit families, younger children or surfers who want more focused coaching. Compare the format, duration and facilities on each listing before you enquire."
    },
    {
      question: "How is lesson availability confirmed?",
      answer: "Your preferred lesson date is sent with your Surfbooker availability request. The provider then confirms final lesson times, spaces and pricing."
    },
    {
      question: "Does Surfbooker take payment?",
      answer: "No. Surfbooker does not take payment at this stage. The school confirms next steps and any payment directly."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: `${baseUrl}/`,
        name: "Surfbooker",
        description: "Compare Devon surf lessons and request availability through Surfbooker."
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "Surfbooker",
        url: `${baseUrl}/`,
        logo: `${baseUrl}/Logo%20no%20words%20transparent.png`,
        email
      },
      {
        "@type": "CollectionPage",
        "@id": `${baseUrl}/#page`,
        url: `${baseUrl}/`,
        name: title,
        description,
        isPartOf: { "@id": `${baseUrl}/#website` },
        publisher: { "@id": `${baseUrl}/#organization` },
        inLanguage: "en-GB"
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/#schools`,
        name: "Devon surf schools on Surfbooker",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: schools.length,
        itemListElement: schools.map((school, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: school.name,
          url: `${baseUrl}${comparePathForSchool(school)}`
        }))
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/#faq`,
        mainEntity: homepageFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <link rel="canonical" href="${baseUrl}/">
  <link rel="alternate" hreflang="en-GB" href="${baseUrl}/">
  <meta name="theme-color" content="#0f2a33">
  <meta property="og:locale" content="en_GB">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Surfbooker">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${baseUrl}/">
  <meta property="og:image" content="${baseUrl}${logoBackground}">
  <meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${baseUrl}${logoBackground}">
  <link rel="icon" href="${faviconIco}" sizes="any">
  <link rel="icon" type="image/png" sizes="48x48" href="${favicon48}">
  <link rel="icon" type="image/png" sizes="96x96" href="${favicon96}">
  <link rel="apple-touch-icon" sizes="180x180" href="${appleTouchIcon}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://images.pexels.com" crossorigin>
  <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
  ${analyticsComment}
  <script src="${googleRatingsScript}" defer></script>
  <script type="application/ld+json">${escapeScript(JSON.stringify(jsonLd, null, 2))}</script>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <div class="page-shell">
    ${renderHeader()}
    <main id="top">
      <section class="hero hero-home">
        <div class="hero-logo-banner">
          <img src="/Logo%20transparent.png" alt="Surfbooker" width="1774" height="887">
          <nav class="hero-logo-links" aria-label="Homepage links">
            <a href="/guides/">Devon Beaches</a>
            <a href="/surf-lessons/north-devon/">Surf Hire</a>
            <a href="/contact/">Contact</a>
          </nav>
        </div>
        <div class="hero-intro">
          <div class="hero-copy">
            <h1 class="hero-title">Explore surf lessons by beach.</h1>
            <p class="hero-text">See prices, lesson formats and reviews in one place before you book.</p>
            <div class="hero-actions">
              <a class="button button-primary" href="#lessons">Compare lessons</a>
            </div>
          </div>
        </div>
      </section>

      <section class="listings-section" id="lessons">
        <div class="filters-bar">
          <label>
            <span>Beach / area</span>
            <select id="filter-area">
              <option value="">All areas</option>
              ${allAreas.map((area) => `<option value="${escapeHtml(area)}">${escapeHtml(area)}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>Lesson format</span>
            <select id="filter-format">
              ${formatOptions.map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>Adults / children</span>
            <select id="filter-audience">
              ${audienceOptions.map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>Minimum age</span>
            <select id="filter-age">
              <option value="">Any minimum age</option>
              <option value="4">4 or under</option>
              <option value="6">6 or under</option>
              <option value="8">8 or under</option>
              <option value="10">10 or under</option>
            </select>
          </label>
          <label>
            <span>Price</span>
            <select id="filter-price">
              <option value="">Any price</option>
              <option value="35">Up to \u00A335</option>
              <option value="40">Up to \u00A340</option>
              <option value="45">Up to \u00A345</option>
              <option value="50">Up to \u00A350</option>
              <option value="100">Up to \u00A3100</option>
            </select>
          </label>
          <label>
            <span>Ability level</span>
            <select id="filter-level">
              <option value="">Any ability</option>
              ${levelOptions.map((level) => `<option value="${escapeHtml(level)}">${escapeHtml(level)}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>Sort by</span>
            <select id="sort-listings">
              <option value="recommended">Recommended</option>
              <option value="lowest-price">Lowest price</option>
              <option value="shortest-duration">Lesson duration</option>
              <option value="location">Location</option>
            </select>
          </label>
          <label>
            <span>Search listings</span>
            <input id="filter-query" type="search" placeholder="School, beach, equipment or facilities">
          </label>
        </div>
        <div class="filters-action">
          <button class="button button-primary" id="search-listings-button" type="button">Search</button>
        </div>

        <div class="results-summary" id="school-results" aria-live="polite"></div>
        <div class="listings-grid" id="listings-grid"></div>
      </section>


      <section class="faq-section" id="faq">
        <div class="section-heading">
          <p class="section-label">Frequently asked questions</p>
          <h2>Useful questions before you enquire.</h2>
        </div>
        <div class="faq-grid">
          ${homepageFaqs.map((faq) => `
            <article class="faq-card">
              <h3>${escapeHtml(faq.question)}</h3>
              <p>${escapeHtml(faq.answer)}</p>
            </article>
          `).join("")}
        </div>
      </section>
    </main>

    ${renderFooter()}
  </div>

  ${renderTrackingForm()}

  <script>
    const listings = ${escapeScript(JSON.stringify(homeListings))};
    const listingsGrid = document.getElementById("listings-grid");
    const resultsSummary = document.getElementById("school-results");
    const searchListingsButton = document.getElementById("search-listings-button");
    const filters = {
      area: document.getElementById("filter-area"),
      format: document.getElementById("filter-format"),
      audience: document.getElementById("filter-audience"),
      age: document.getElementById("filter-age"),
      price: document.getElementById("filter-price"),
      level: document.getElementById("filter-level"),
      query: document.getElementById("filter-query"),
      sort: document.getElementById("sort-listings")
    };
    const sortLabels = {
      recommended: "Recommended",
      "lowest-price": "Lowest price",
      "shortest-duration": "Lesson duration",
      location: "Location"
    };

    function encodeForm(data) {
      return Object.keys(data)
        .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
    }

    function trackEvent(eventType, eventTarget, eventDetail) {
      const payload = encodeForm({
        "form-name": "site-activity",
        event_type: eventType,
        event_target: eventTarget,
        event_detail: eventDetail || "",
        page_url: window.location.pathname + window.location.hash,
        timestamp: new Date().toISOString()
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon("/", new Blob([payload], { type: "application/x-www-form-urlencoded" }));
        return;
      }

      fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: payload,
        keepalive: true
      }).catch(() => {});
    }

    function getPriceSortValue(listing) {
      return typeof listing.minPrice === "number" ? listing.minPrice : Number.POSITIVE_INFINITY;
    }

    function getDurationSortValue(listing) {
      return typeof listing.sortDurationMinutes === "number" ? listing.sortDurationMinutes : Number.POSITIVE_INFINITY;
    }

    function partyPrefillValue(value) {
      if (value === "Family") {
        return "2 adults, 1 child";
      }
      if (value === "Adults") {
        return "Adults only";
      }
      if (value === "Children") {
        return "Children only";
      }
      return value || "";
    }

    function buildSchoolHref(listing) {
      const params = new URLSearchParams();
      const abilityLevel = filters.level.value;
      const party = partyPrefillValue(filters.audience.value);

      if (abilityLevel) {
        params.set("ability_level", abilityLevel);
      }
      if (party) {
        params.set("party", party);
      }

      const query = params.toString();
      return query ? listing.detailUrl + "?" + query : listing.detailUrl;
    }

    function matchesFilters(listing) {
      const area = filters.area.value;
      const format = filters.format.value;
      const audience = filters.audience.value;
      const age = filters.age.value ? Number(filters.age.value) : null;
      const price = filters.price.value ? Number(filters.price.value) : null;
      const level = filters.level.value;
      const query = filters.query.value.trim().toLowerCase();

      if (area && listing.area !== area) {
        return false;
      }

      if (format && !listing.formats.includes(format)) {
        return false;
      }

      if (audience && !listing.audience.includes(audience)) {
        return false;
      }

      if (age !== null && (typeof listing.minAge !== "number" || listing.minAge > age)) {
        return false;
      }

      if (price !== null && (typeof listing.minPrice !== "number" || listing.minPrice > price)) {
        return false;
      }

      if (level && !listing.levels.includes(level)) {
        return false;
      }

      const haystack = [
        listing.name,
        listing.subtitle,
        listing.area,
        listing.locationLabel,
        listing.summary,
        listing.specAudience,
        ...listing.cardHighlights,
        ...listing.facts.map((fact) => fact.value)
      ].join(" ").toLowerCase();

      return !query || haystack.includes(query);
    }

    function sortListings(items) {
      const sorted = [...items];

      if (filters.sort.value === "lowest-price") {
        sorted.sort((a, b) => getPriceSortValue(a) - getPriceSortValue(b) || a.beachOrder - b.beachOrder || a.name.localeCompare(b.name));
        return sorted;
      }

      if (filters.sort.value === "shortest-duration") {
        sorted.sort((a, b) => getDurationSortValue(a) - getDurationSortValue(b) || getPriceSortValue(a) - getPriceSortValue(b) || a.name.localeCompare(b.name));
        return sorted;
      }

      if (filters.sort.value === "location") {
        sorted.sort((a, b) => a.area.localeCompare(b.area) || a.name.localeCompare(b.name));
        return sorted;
      }

      sorted.sort((a, b) => a.beachOrder - b.beachOrder || a.name.localeCompare(b.name));
      return sorted;
    }

    function hasActiveFilters() {
      return Object.entries(filters).some(([key, field]) => key !== "sort" && field.value);
    }

    function renderListings(forceVisible = false) {
      const shouldShowResults = forceVisible || hasActiveFilters();

      if (!shouldShowResults) {
        resultsSummary.textContent = "";
        listingsGrid.innerHTML = "";
        return;
      }

      const visibleListings = sortListings(listings.filter(matchesFilters));
      resultsSummary.textContent = visibleListings.length + " surf school" + (visibleListings.length === 1 ? "" : "s") + " shown. Sorted by " + sortLabels[filters.sort.value] + ".";

      if (!visibleListings.length) {
        listingsGrid.innerHTML = '<article class="empty-state"><h3>No matching surf schools</h3><p>Adjust the filters to widen the Devon lesson shortlist.</p></article>';
        return;
      }

      listingsGrid.innerHTML = visibleListings.map((listing) => {
        return [
          '<article class="listing-card">',
          '<div class="listing-image-wrap">',
          '<img src="' + listing.image + '" alt="' + listing.imageAlt + '" width="' + listing.imageWidth + '" height="' + listing.imageHeight + '" loading="lazy" decoding="async">',
          '</div>',
          '<div class="listing-card-body">',
          '<div class="listing-topline">',
          '<p>' + listing.locationLabel + '</p>',
          '<span class="listing-badge">${escapeHtml(listingNote)}</span>',
          '</div>',
          '<h3>' + listing.name + '</h3>',
          listing.subtitle ? '<p class="listing-subtitle">' + listing.subtitle + '</p>' : '',
          '<div class="google-rating" data-google-rating data-school-slug="' + listing.slug + '" data-rating-variant="card">',
          '<p class="google-rating-loading">Loading Google rating...</p>',
          '</div>',
          '<div class="listing-meta">',
          '<strong>' + listing.priceLabel + '</strong>',
          '<span>' + listing.durationLabel + '</span>',
          '</div>',
          '<div class="listing-actions">',
          '<a class="button button-primary listing-detail-link" href="' + buildSchoolHref(listing) + '" data-school="' + listing.slug + '">View lesson details</a>',
          '</div>',
          '</div>',
          '</article>'
        ].join("");
      }).join("");

      document.querySelectorAll(".listing-detail-link").forEach((link) => {
        link.addEventListener("click", () => {
          trackEvent("listing_view", link.dataset.school, "compare-link");
        });
      });
    }

    Object.values(filters).forEach((field) => {
      field.addEventListener("input", () => renderListings());
      field.addEventListener("change", () => renderListings());
    });

    searchListingsButton.addEventListener("click", () => {
      renderListings(true);
      document.getElementById("lessons").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    const listingParams = new URLSearchParams(window.location.search);
    const requestedArea = listingParams.get("area");

    if (requestedArea && Array.from(filters.area.options).some((option) => option.value === requestedArea)) {
      filters.area.value = requestedArea;
    }

    renderListings(Boolean(requestedArea));
  </script>
</body>
</html>`;
}
function renderLocationPage(location) {
  const areaSchools = getSchoolsForLocation(location.slug);
  const title = location.slug === "north-devon"
    ? `${location.pageTitle} | Surfbooker`
    : `${location.pageTitle}, Devon | Surfbooker`;
  const description = location.metaDescription;
  const path = `/surf-lessons/${location.slug}/`;
  const breadcrumbs = location.slug === "north-devon"
    ? [
        { name: "Home", url: "/" },
        { name: location.pageTitle, url: path }
      ]
    : [
        { name: "Home", url: "/" },
        { name: "Devon surf lessons", url: "/surf-lessons/north-devon/" },
        { name: location.pageTitle, url: path }
      ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems(breadcrumbs)
      },
      {
        "@type": "ItemList",
        name: `${location.pageTitle} on Surfbooker`,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: areaSchools.length,
        itemListElement: areaSchools.map((school, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: school.name,
          url: `${baseUrl}${comparePathForSchool(school)}`
        }))
      }
    ]
  };

  return renderStandardPage({
    title,
    description,
    path,
    h1: location.pageTitle,
    label: location.label,
    intro: location.intro[0],
    heroChildren: `
      <p>${escapeHtml(location.intro[1])}</p>
      <div class="simple-actions">
        <a class="button button-primary" href="#lessons">Compare lessons</a>
        <a class="button button-secondary" href="${location.slug === "north-devon" ? "#nearby-pages" : "/surf-lessons/north-devon/"}">${location.slug === "north-devon" ? "Browse beach pages" : "View Devon overview"}</a>
      </div>
      <p class="page-note">Prices and availability are confirmed by each school when you enquire.</p>
    `,
    breadcrumbs,
    jsonLd,
    mainContent: `
      <section class="simple-card">
        <div class="simple-facts">
          <div><span>Listed schools</span><strong>${areaSchools.length}</strong></div>
          <div><span>Lesson formats</span><strong>${summariseFormats(areaSchools)}</strong></div>
          <div><span>Lowest public starting price</span><strong>${lowestPriceLabel(areaSchools)}</strong></div>
          <div><span>Internal pages</span><strong>${areaSchools.length} school pages plus this location page</strong></div>
        </div>
      </section>
      ${location.slug === "north-devon" ? `
      <section class="coverage-section" id="nearby-pages">
        <div class="section-heading">
          <p class="section-label">Beach pages</p>
          <h2>Move from the Devon overview into individual beach pages.</h2>
        </div>
        <div class="coverage-grid coverage-grid-six">
          ${locations.filter((item) => item.slug !== "north-devon").map((item) => `
            <a class="coverage-card" href="/surf-lessons/${item.slug}/">
              <h3>${escapeHtml(item.name)}</h3>
              <p>${escapeHtml(locationSummary(item))}</p>
            </a>
          `).join("")}
        </div>
      </section>
      ` : ""}
      <section class="listings-section listings-section-static">
        <div class="section-heading">
          <p class="section-label">Schools in this area</p>
          <h2>${location.slug === "north-devon" ? "Compare Devon surf schools." : `Compare surf schools in ${escapeHtml(location.name)}.`}</h2>
          <p class="section-note">Prices and details are checked against provider websites, but final availability is confirmed when you enquire.</p>
        </div>
        <div class="listings-grid static-listings-grid">
          ${areaSchools.map((school) => renderStaticListingCard(school)).join("")}
        </div>
      </section>
      <section class="simple-card simple-copy">
        <h2>Explore nearby pages</h2>
        <div class="footer-links">
          ${location.relatedAreas.map((area) => {
            const related = locations.find((item) => item.name === area);
            if (!related) {
              return "";
            }
            return `<a href="/surf-lessons/${related.slug}/">${escapeHtml(related.pageTitle)}</a>`;
          }).join("")}
        </div>
      </section>
    `
  });
}

function renderSchoolPage(school) {
  const location = locations.find((item) => item.slug === school.locationSlug);
  const title = `${school.name} | ${school.area} Surf Lessons | Surfbooker`;
  const description = `Compare public surf lesson details for ${school.name} in ${school.locationLabel}. Review lesson format, duration, price information and practical notes before you request availability.`;
  const path = `/surf-schools/${school.slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems([
          { name: "Home", url: "/" },
          { name: "Devon surf lessons", url: "/surf-lessons/north-devon/" },
          { name: location.pageTitle, url: `/surf-lessons/${location.slug}/` },
          { name: school.name, url: path }
        ])
      }
    ]
  };

  return renderStandardPage({
    title,
    description,
    path,
    h1: school.name,
    label: "Surf school listing",
    intro: school.pageIntro[0],
    heroChildren: `
      ${school.subtitle ? `<p class="simple-kicker">${escapeHtml(school.subtitle)}</p>` : ""}
      <p>${escapeHtml(school.pageIntro[1])}</p>
      <div class="simple-actions">
        <a class="button button-primary" href="#availability-request">Request availability</a>
      </div>
      <p class="page-note">Prices and lesson details are checked against the provider website. Final availability is confirmed when you enquire.</p>
    `,
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Devon surf lessons", url: "/surf-lessons/north-devon/" },
      { name: location.pageTitle, url: `/surf-lessons/${location.slug}/` },
      { name: school.name, url: path }
    ],
    jsonLd,
    mainContent: `
      <section class="detail-card detail-card-static">
        <div class="detail-image-column">
          <div class="detail-image-wrap">
            <img src="${escapeHtml(school.image)}" alt="${escapeHtml(school.imageAlt)}" width="${school.imageWidth}" height="${school.imageHeight}">
          </div>
        </div>
        <div class="detail-copy">
          <div class="detail-meta">
            <p class="detail-location">${escapeHtml(school.locationLabel)}</p>
            <p class="detail-status">${typeof school.minPrice === "number" ? `${escapeHtml(school.priceLabel)} public starting price.` : "Price confirmed by the provider."}</p>
          </div>
          ${renderGoogleRatingSlot(school.slug, "detail")}
          <h2>Lesson details</h2>
          <p class="detail-description">${escapeHtml(school.summary)}</p>
          <div class="detail-specs">
            <div><span>Lesson format</span><strong>${escapeHtml(specFormatLabel(school))}</strong></div>
            <div><span>Duration</span><strong>${escapeHtml(school.durationLabel)}</strong></div>
            <div><span>Audience</span><strong>${escapeHtml(specAudienceLabel(school))}</strong></div>
            <div><span>Price</span><strong>${escapeHtml(school.priceLabel)}</strong></div>
          </div>
          <div class="detail-facts">
            ${school.facts.map((fact) => `<div><span>${escapeHtml(fact.label)}</span><strong>${escapeHtml(fact.value)}</strong></div>`).join("")}
          </div>
          <div class="detail-levels">
            <h4>Ability levels</h4>
            <div class="chip-row">
              ${school.levels.map((level) => `<span>${escapeHtml(level)}</span>`).join("")}
            </div>
          </div>
          <div class="detail-actions">
            <a class="button button-primary" href="#availability-request">Request availability</a>
          </div>
        </div>
      </section>
      <section class="simple-card simple-copy">
        <h2>Key notes from the official school pages</h2>
        <ul class="simple-list">
          ${school.websiteFacts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join("")}
        </ul>
      </section>
      <section class="booking-panel availability-panel" id="availability-request">
        <div class="booking-copy">
          <p class="section-label">Availability request</p>
          <h3>Request availability</h3>
          <p>Send us your preferred date, ability level and group details. Surfbooker will use this information to help check the lesson with your selected school. No payment is taken at this stage.</p>
          <p class="field-note">Final prices and lesson availability are confirmed by the provider.</p>
        </div>
        <form class="booking-form" id="availability-form" name="lesson-enquiry" method="POST" action="${path}" data-netlify="true" netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="lesson-enquiry">
          <input type="hidden" name="submission_type" value="Surfbooker availability request">
          <p class="sr-only"><label>Do not fill this out if you're human: <input name="bot-field"></label></p>
          <input type="hidden" name="school" value="${escapeHtml(school.name)}">
          <input type="hidden" name="school_slug" value="${escapeHtml(school.slug)}">
          <input type="hidden" name="lesson_location" value="${escapeHtml(school.locationLabel)}">
          <input type="hidden" name="provider_url" value="${escapeHtml(school.website)}">
          <input type="hidden" name="source_page" value="${escapeHtml(path)}">
          <label>
            <span>Your name</span>
            <input type="text" name="name" placeholder="Full name" required>
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" placeholder="you@example.com" required>
          </label>
          <label>
            <span>Preferred lesson date</span>
            <input type="date" name="preferred_date" required>
            <small class="field-note">This date is sent with your request. It does not check live availability.</small>
          </label>
          <label>
            <span>Adults and children</span>
            <input type="text" name="party" placeholder="2 adults, 1 child" required>
          </label>
          <label>
            <span>Ability level</span>
            <select name="ability_level" required>
              <option value="">Select ability</option>
              ${levelOptions.map((level) => `<option value="${escapeHtml(level)}">${escapeHtml(level)}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>Extra notes</span>
            <textarea name="notes" rows="4" placeholder="Anything Surfbooker should know before following up with the school."></textarea>
          </label>
          <button type="submit">Send availability request</button>
          <p class="form-status" id="availability-status" aria-live="polite"></p>
        </form>
      </section>
      <section class="simple-card simple-copy">
        <h2>Related Surfbooker pages</h2>
        <div class="footer-links">
          <a href="/surf-lessons/${location.slug}/">${escapeHtml(location.pageTitle)}</a>
          <a href="/surf-lessons/north-devon/">Devon surf lessons</a>
          <a href="/contact/">Contact Surfbooker</a>
        </div>
      </section>
      ${renderTrackingForm()}
      <script>
        ${trackingScript("listing_view", school.slug, "school-page")}
        const availabilityForm = document.getElementById("availability-form");
        const availabilityStatus = document.getElementById("availability-status");
        const schoolPageParams = new URLSearchParams(window.location.search);
        const preferredDate = schoolPageParams.get("preferred_date");
        const abilityLevel = schoolPageParams.get("ability_level");
        const party = schoolPageParams.get("party");

        if (preferredDate) {
          availabilityForm.elements["preferred_date"].value = preferredDate;
        }
        if (abilityLevel) {
          availabilityForm.elements["ability_level"].value = abilityLevel;
        }
        if (party) {
          availabilityForm.elements["party"].value = party;
        }

        availabilityForm.addEventListener("submit", async (event) => {
          event.preventDefault();
          availabilityStatus.textContent = "Sending availability request...";

          const payload = {
            "form-name": availabilityForm.getAttribute("name"),
            submission_type: availabilityForm.elements["submission_type"].value,
            "bot-field": availabilityForm.elements["bot-field"].value,
            school: availabilityForm.elements["school"].value,
            school_slug: availabilityForm.elements["school_slug"].value,
            lesson_location: availabilityForm.elements["lesson_location"].value,
            provider_url: availabilityForm.elements["provider_url"].value,
            source_page: availabilityForm.elements["source_page"].value,
            name: availabilityForm.elements["name"].value,
            email: availabilityForm.elements["email"].value,
            preferred_date: availabilityForm.elements["preferred_date"].value,
            party: availabilityForm.elements["party"].value,
            ability_level: availabilityForm.elements["ability_level"].value,
            notes: availabilityForm.elements["notes"].value
          };

          try {
            const response = await fetch("/", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: encodeForm(payload)
            });

            if (!response.ok) {
              throw new Error("Submission failed");
            }

            availabilityStatus.textContent = "Availability request sent. Surfbooker will use these details to help check the lesson with ${escapeScript(school.name)}.";
            trackEvent("enquiry", "${escapeScript(school.slug)}", availabilityForm.elements["preferred_date"].value);
            availabilityForm.reset();
          } catch (error) {
            availabilityStatus.textContent = "The request could not be sent just now. Please try again or email hello@surfbooker.com.";
          }
        });
      </script>
    `
  });
}

function renderUtilityPage(page) {
  return renderStandardPage({
    title: page.title,
    description: page.description,
    path: `/${page.path.replace(/index\.html$/, "")}`,
    h1: page.h1,
    label: page.label,
    intro: page.intro,
    heroChildren: "",
    breadcrumbs: page.breadcrumbs,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems(page.breadcrumbs)
        }
      ]
    },
    mainContent: page.body
  });
}

function buildAreaCompareHref(area) {
  const params = new URLSearchParams();
  params.set("area", area);
  return `/?${params.toString()}#school-results`;
}

function renderGuidesIndexPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" }
  ];

  return renderStandardPage({
    title: "Our Devon Beach Guides | Surfbooker",
    description: "Honest Surfbooker beach guides covering Devon surf spots, beginner suitability, parking, facilities and practical planning before you book.",
    path: surfGuidesPath,
    h1: "Our Devon Beach Guides",
    label: "Beach guides",
    intro: "",
    heroChildren: ``,
    breadcrumbs,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems(breadcrumbs)
        }
      ]
    },
    mainContent: `
      <section class="guides-list">
        <a class="guide-list-card" href="${westwardHoGuidePath}">
          <h2>Westward Ho!</h2>
          <p>Waves, parking and beginner guide</p>
        </a>
        <a class="guide-list-card" href="/guides/surfing-saunton-sands/">
          <h2>Saunton Sands</h2>
          <p>Waves, facilities and surf guide</p>
        </a>
      </section>
    `
  });
}

function renderGuidePage(guide) {
  const guideSchools = guide.schoolSlugs
    .map((slug) => schools.find((school) => school.slug === slug))
    .filter(Boolean);
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Surfing Westward Ho!", url: guide.path }
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems(breadcrumbs)
      },
      {
        "@type": "Article",
        headline: guide.h1,
        description: guide.description,
        datePublished: buildDate,
        dateModified: buildDate,
        inLanguage: "en-GB",
        mainEntityOfPage: `${baseUrl}${guide.path}`,
        image: [guide.image],
        articleSection: ["Surf guides", "Westward Ho!", "Devon"],
        author: {
          "@type": "Organization",
          name: "Surfbooker",
          url: baseUrl
        },
        publisher: {
          "@type": "Organization",
          name: "Surfbooker",
          url: baseUrl,
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}${logoIcon}`
          }
        }
      }
    ]
  };

  return renderStandardPage({
    title: guide.title,
    description: guide.description,
    path: guide.path,
    h1: guide.h1,
    label: guide.label,
    intro: guide.intro,
    ogType: "article",
    heroChildren: `
      <p class="page-note">${escapeHtml(guide.updatedLabel)}</p>
      <div class="simple-actions">
        <a class="button button-primary" href="${guide.compareHref}">Compare Westward Ho! surf lessons</a>
        <a class="button button-secondary" href="${westwardHoWhatsappUrl}" target="_blank" rel="noopener noreferrer" aria-label="Message Surfbooker on WhatsApp about Westward Ho! surf lessons">Message Surfbooker on WhatsApp</a>
      </div>
    `,
    breadcrumbs,
    jsonLd,
    mainContent: `
      <section class="simple-card">
        <div class="simple-grid guide-overview-grid">
          <figure class="guide-figure">
            <img src="${escapeHtml(guide.image)}" alt="${escapeHtml(guide.imageAlt)}" width="${guide.imageWidth}" height="${guide.imageHeight}" decoding="async">
            <figcaption class="guide-caption">Illustrative stock surfing image used by Surfbooker for this editorial beach guide.</figcaption>
          </figure>
          <div class="simple-card-content">
            <p class="section-label">Quick verdict</p>
            <h2>One of the easiest places in Devon to start surfing.</h2>
            <p>Westward Ho! is one of Devon's most accessible places to learn to surf. Its long, open beach catches plenty of Atlantic swell, while the wide sandy area gives beginners plenty of room to practise in the white water.</p>
            <p>It also has a relaxed vibe. Surf schools, cafes, equipment hire and other practical facilities sit close to the beach, so it works well for a full day out rather than a quick in-and-out lesson.</p>
            <div class="simple-actions">
              <a class="button button-primary" href="${guide.compareHref}">Compare Westward Ho! surf lessons</a>
              <a class="button button-secondary" href="/surf-lessons/westward-ho/">View the Westward Ho! lesson page</a>
            </div>
          </div>
        </div>
      </section>
      <section class="simple-card">
        <p class="section-label">Quick facts</p>
        <div class="simple-facts">
          <div><span>Best for</span><strong>Beginners, improvers, families and group lessons</strong></div>
          <div><span>Surf style</span><strong>Open sandy beach break</strong></div>
          <div><span>Parking</span><strong>Several car parks, limited side-street options and seasonal Northam Burrows access</strong></div>
          <div><span>Facilities</span><strong>Very good</strong></div>
          <div><span>Overall</span><strong>A friendly and convenient Devon surf destination</strong></div>
        </div>
      </section>
      <section class="simple-card simple-copy">
        <h2>What is the surfing like?</h2>
        <p>Westward Ho! works particularly well for beginners and improving surfers. On smaller days, the broken waves create repeated chances to practise standing, turning and building confidence. More experienced surfers can also find enjoyable waves when the swell, wind and tide line up.</p>
        <p>Because the beach is open and exposed, conditions can change quickly. Wind can affect wave quality, and a promising forecast does not always guarantee clean surf. Check conditions before travelling and speak to a local surf school if you are unsure what the sea state will feel like on the day.</p>
        <p>Always follow the lifeguard flags and local safety advice. The RNLI has highlighted risks around the slipway during an incoming tide, so it is worth paying attention to your exit route while you are in the water.</p>
      </section>
      <section class="simple-card simple-copy">
        <h2>Is Westward Ho! suitable for beginners?</h2>
        <p>Yes. The sandy bottom, long beach and choice of established Westward Ho! surf schools make it a strong option for a first lesson. For anyone interested in beginner surfing in Devon, it is one of the more practical starting points because access is straightforward and there is usually enough beach to spread out.</p>
        <p>Booking a lesson is still worthwhile if you have never surfed before. An instructor can choose the safest part of the beach, explain the tide and conditions, and help you avoid picking up bad habits early on.</p>
        <p>Westward Ho! can be busy in summer, but the length of the beach usually makes it possible to find more space away from the busiest lesson zones.</p>
      </section>
      <section class="simple-card simple-copy">
        <h2>Parking at Westward Ho!</h2>
        <p>Parking is one of the location's biggest advantages. There are several official car parks, including the main long-stay car park, the Slipway car park, Wilkey's Field and Sandymere on Northam Burrows. You may also find quieter side-street spaces, provided you check the signs, park legally and leave enough room for residents and other visitors.</p>
        <p>Sandymere on Northam Burrows is another useful option. Torridge District Council says the vehicle gates open from 7am to 10pm between March and October, and from 7am to 6pm between November and February.</p>
        <p>Torridge District Council also says a vehicle toll normally applies from 3 April until 1 November. Outside that charging period, vehicle access is normally free. Check the latest access times and charges before you travel because free access to the Burrows can be a real advantage during quieter months.</p>
      </section>
      <section class="simple-card simple-copy">
        <h2>Facilities and atmosphere</h2>
        <p>Westward Ho! feels welcoming without losing its surf-town character. Cafes, pubs, takeaways, toilets, shops, surf schools and equipment-hire businesses are all within easy reach of the water.</p>
        <p>That convenience makes surfing in Devon easier for families and mixed groups. One person can take a lesson while others walk along the promenade, explore Northam Burrows or stop for food nearby.</p>
      </section>
      <section class="simple-card simple-copy">
        <h2>What are the drawbacks?</h2>
        <p>The main disadvantage is exposure. Wind can make the waves messy, and summer weekends can be busy both in the water and around the village.</p>
        <p>At low tide, the walk to the water can be longer than some first-time visitors expect. At higher tide, the available beach space reduces, so it is sensible to keep an eye on the tide and avoid leaving belongings too close to the water.</p>
      </section>
      <section class="simple-card simple-copy">
        <p class="section-label">Westward Ho! surf schools</p>
        <h2>Compare local lesson pages on Surfbooker.</h2>
        <p>If you want to compare Westward Ho! surf lessons before you enquire, start with these internal Surfbooker pages for local schools and the location overview.</p>
        <ul class="simple-list">
          ${guideSchools.map((school) => `<li><a class="text-link" href="${comparePathForSchool(school)}">${escapeHtml(school.name)}</a> - ${escapeHtml(school.durationLabel)} ${escapeHtml(specFormatLabel(school).toLowerCase())} listed on Surfbooker.</li>`).join("")}
          <li><a class="text-link" href="/surf-lessons/westward-ho/">Westward Ho! surf lessons</a> - Surfbooker's beach-level comparison page for surfing Westward Ho!.</li>
        </ul>
      </section>
      <section class="simple-card simple-copy">
        <p class="section-label">Useful official information</p>
        <h2>Check the latest official guidance before you travel.</h2>
        <ul class="simple-list">
          ${guide.officialLinks.map((item) => `<li><a class="text-link" href="${escapeHtml(item.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.label)}</a></li>`).join("")}
        </ul>
        <p class="page-note">Editorial note: conditions, parking charges and access times can change, so check official updates before you travel.</p>
      </section>
      <section class="simple-card simple-copy">
        <h2>Surfbooker verdict</h2>
        <p>Westward Ho! is an excellent choice for beginners, families and improving surfers who value convenience as much as wave quality.</p>
        <p>It may not always produce the cleanest or most powerful waves in Devon, but its reliable swell exposure, established surf schools, easy access, parking choices and relaxed atmosphere make it one of the most practical places in the area to learn.</p>
        <div class="simple-actions">
          <a class="button button-primary" href="${guide.compareHref}">Compare Westward Ho! surf lessons</a>
          <a class="button button-secondary" href="${westwardHoWhatsappUrl}" target="_blank" rel="noopener noreferrer" aria-label="Message Surfbooker on WhatsApp about Westward Ho! surf lessons">Message Surfbooker on WhatsApp</a>
        </div>
      </section>
      ${renderTrackingForm()}
      <script>
        ${trackingScript("guide_view", guide.slug, "westward-ho")}
      </script>
    `
  });
}

function renderNotFoundPage() {
  const title = "Page not found | Surfbooker";
  const description = "The page you were looking for does not exist. Return to the Surfbooker homepage or one of the Devon surf lesson pages.";

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="noindex,follow">
  <link rel="canonical" href="${baseUrl}/404.html">
  <meta property="og:locale" content="en_GB">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Surfbooker">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${baseUrl}/404.html">
  <meta property="og:image" content="${baseUrl}${logoBackground}">
  <meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${baseUrl}${logoBackground}">
  <link rel="icon" href="${faviconIco}" sizes="any">
  <link rel="icon" type="image/png" sizes="48x48" href="${favicon48}">
  <link rel="icon" type="image/png" sizes="96x96" href="${favicon96}">
  <link rel="apple-touch-icon" sizes="180x180" href="${appleTouchIcon}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
  ${analyticsComment}
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <div class="simple-shell">
    ${renderHeader()}
    <main>
      ${renderBreadcrumbs([
        { name: "Home", url: "/" },
        { name: "404", url: "/404.html" }
      ])}
      <section class="simple-hero">
        <p class="section-label">404</p>
        <h1>Page not found</h1>
        <p>The page you requested is not in the current Surfbooker production site. Use the links below to get back to the main lesson pages.</p>
        <div class="simple-actions">
          <a class="button button-primary" href="/">Go to homepage</a>
          <a class="button button-secondary" href="/surf-lessons/north-devon/">View Devon overview</a>
        </div>
      </section>
      <section class="simple-card simple-copy">
        <div class="footer-links footer-links-column">
          <a href="/surf-lessons/westward-ho/">Surf lessons in Westward Ho!</a>
          <a href="/surf-lessons/saunton/">Surf lessons in Saunton</a>
          <a href="/surf-lessons/woolacombe/">Surf lessons in Woolacombe</a>
          <a href="/surf-lessons/croyde/">Surf lessons in Croyde</a>
          <a href="/surf-lessons/putsborough/">Surf lessons in Putsborough</a>
        </div>
      </section>
    </main>
    ${renderFooter()}
  </div>
</body>
</html>`;
}

function renderStandardPage({ title, description, path, h1, label, intro, heroChildren, breadcrumbs, jsonLd, mainContent, ogType = "website" }) {
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <link rel="canonical" href="${baseUrl}${path}">
  <link rel="alternate" hreflang="en-GB" href="${baseUrl}${path}">
  <meta name="theme-color" content="#0f2a33">
  <meta property="og:locale" content="en_GB">
  <meta property="og:type" content="${escapeHtml(ogType)}">
  <meta property="og:site_name" content="Surfbooker">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${baseUrl}${path}">
  <meta property="og:image" content="${baseUrl}${logoBackground}">
  <meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${baseUrl}${logoBackground}">
  <link rel="icon" href="${faviconIco}" sizes="any">
  <link rel="icon" type="image/png" sizes="48x48" href="${favicon48}">
  <link rel="icon" type="image/png" sizes="96x96" href="${favicon96}">
  <link rel="apple-touch-icon" sizes="180x180" href="${appleTouchIcon}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://images.pexels.com" crossorigin>
  <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
  ${analyticsComment}
  <script src="${googleRatingsScript}" defer></script>
  <script type="application/ld+json">${escapeScript(JSON.stringify(jsonLd, null, 2))}</script>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <div class="simple-shell">
    ${renderHeader()}
    <main>
      ${renderBreadcrumbs(breadcrumbs)}
      <section class="simple-hero">
        <p class="section-label">${escapeHtml(label)}</p>
        <h1>${escapeHtml(h1)}</h1>
        <p>${escapeHtml(intro)}</p>
        ${heroChildren}
      </section>
      ${mainContent}
    </main>
    ${renderFooter()}
  </div>
</body>
</html>`;
}

function renderStaticListingCard(school) {
  const highlights = cardHighlightsForSchool(school);
  return `
    <article class="listing-card static-listing-card">
      <div class="listing-image-wrap">
        <img src="${escapeHtml(school.image)}" alt="${escapeHtml(school.imageAlt)}" width="${school.imageWidth}" height="${school.imageHeight}" loading="lazy" decoding="async">
      </div>
      <div class="listing-card-body">
        <div class="listing-topline">
          <p>${escapeHtml(school.locationLabel)}</p>
          <span class="listing-badge">${escapeHtml(listingNote)}</span>
        </div>
        <h3>${escapeHtml(school.name)}</h3>
        ${school.subtitle ? `<p class="listing-subtitle">${escapeHtml(school.subtitle)}</p>` : ""}
        ${renderGoogleRatingSlot(school.slug)}
        <div class="listing-meta">
          <strong>${escapeHtml(school.priceLabel)}</strong>
          <span>${escapeHtml(school.durationLabel)}</span>
        </div>
        <p class="listing-format-line"><strong>Lesson formats:</strong> ${escapeHtml(specFormatLabel(school))}</p>
        <div class="chip-row">
          ${school.levels.map((level) => `<span>${escapeHtml(level)}</span>`).join("")}
        </div>
        ${highlights.length ? `
        <ul class="card-highlights">
          ${highlights.map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join("")}
        </ul>
        ` : ""}
        <div class="listing-actions">
          <a class="button button-primary" href="${escapeHtml(comparePathForSchool(school))}">View lesson details</a>
        </div>
      </div>
    </article>
  `;
}

function renderHeader() {
  return `
    <header class="site-header">
      <a class="brand" href="/">
        <img class="brand-wordmark-image" src="${logoWordmark}" alt="Surfbooker" width="1774" height="887">
      </a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="/surf-lessons/north-devon/">Devon</a>
        <a href="/#lessons">Schools</a>
        <a href="/list-your-surf-school/">List your surf school</a>
        <a href="/contact/">Contact</a>
      </nav>
      <div class="mobile-nav-links" aria-label="Mobile contact links">
        <a href="/contact/">Contact</a>
      </div>
    </header>
  `;
}

function renderGoogleRatingSlot(schoolSlug, variant = "card", id = "") {
  const idAttribute = id ? ` id="${escapeHtml(id)}"` : "";
  return `<div${idAttribute} class="google-rating" data-google-rating data-school-slug="${escapeHtml(schoolSlug)}" data-rating-variant="${escapeHtml(variant)}"><p class="google-rating-loading">Loading Google rating...</p></div>`;
}

function renderFooter() {
  return `
    <footer class="site-footer" id="site-footer">
      <div class="footer-links"></div>
      <p class="footer-meta">&copy; 2026 Surfbooker. All rights reserved. <a class="text-link" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    </footer>
  `;
}

function renderBreadcrumbs(items) {
  return `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        ${items.map((item, index) => {
          const isLast = index === items.length - 1;
          return `<li>${isLast ? `<span aria-current="page">${escapeHtml(item.name)}</span>` : `<a href="${escapeHtml(item.url)}">${escapeHtml(item.name)}</a>`}</li>`;
        }).join("")}
      </ol>
    </nav>
  `;
}

function renderTrackingForm() {
  return `
    <form name="site-activity" hidden data-netlify="true">
      <input type="hidden" name="form-name" value="site-activity">
      <input type="text" name="event_type">
      <input type="text" name="event_target">
      <input type="text" name="event_detail">
      <input type="text" name="page_url">
      <input type="text" name="timestamp">
    </form>
  `;
}

function trackingScript(defaultType, defaultTarget, defaultDetail) {
  return `
    function encodeForm(data) {
      return Object.keys(data).map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join("&");
    }
    function trackEvent(eventType, eventTarget, eventDetail) {
      const payload = encodeForm({
        "form-name": "site-activity",
        event_type: eventType,
        event_target: eventTarget,
        event_detail: eventDetail || "",
        page_url: window.location.pathname,
        timestamp: new Date().toISOString()
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/", new Blob([payload], { type: "application/x-www-form-urlencoded" }));
        return;
      }
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload,
        keepalive: true
      }).catch(() => {});
    }
    trackEvent("${escapeScript(defaultType)}", "${escapeScript(defaultTarget)}", "${escapeScript(defaultDetail)}");
  `;
}

function renderRobots() {
  return `User-agent: *
Allow: /
Sitemap: https://surfbooker.com/sitemap.xml
`;
}

function renderSitemap() {
  const urls = [
    "/",
    surfGuidesPath,
    westwardHoGuidePath,
    "/contact/",
    "/privacy/",
    "/terms/",
    "/list-your-surf-school/",
    ...locations.map((location) => `/surf-lessons/${location.slug}/`),
    ...schools.map((school) => `/surf-schools/${school.slug}/`)
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${buildDate}</lastmod>
  </url>`).join("\n")}
</urlset>
`;
}

function getSchoolsForLocation(locationSlug) {
  if (locationSlug === "north-devon") {
    return [...schools];
  }
  return schools.filter((school) => school.locationSlug === locationSlug);
}

function locationSummary(location) {
  const areaSchools = getSchoolsForLocation(location.slug);
  if (!areaSchools.length) {
    return "No current school listings.";
  }

  const countLabel = `${areaSchools.length} surf school${areaSchools.length === 1 ? "" : "s"}`;
  const formatLabel = summariseFormats(areaSchools).toLowerCase();
  return `${countLabel}. ${lowestPriceLabel(areaSchools)}. ${formatLabel} lessons.`;
}

function summariseFormats(areaSchools) {
  const formats = new Set();
  for (const school of areaSchools) {
    for (const format of school.formats) {
      formats.add(format);
    }
  }
  return Array.from(formats).join(" and ");
}

function lowestPriceLabel(areaSchools) {
  const prices = areaSchools.filter((school) => typeof school.minPrice === "number").map((school) => school.minPrice);
  if (!prices.length) {
    return "Check availability";
  }
  return `From \u00A3${Math.min(...prices)}`;
}

function specFormatLabel(school) {
  return school.formats.length ? school.formats.join(" / ") : "Ask the school";
}

function specAudienceLabel(school) {
  return school.audience.length ? school.audienceLabel : "Ask the school";
}

function breadcrumbItems(items) {
  return items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${baseUrl}${item.url}`
  }));
}

function comparePathForSchool(school) {
  return `/surf-schools/${school.slug}/`;
}

function toListingData(school) {
  return {
    slug: school.slug,
    name: school.name,
    subtitle: school.subtitle,
    area: school.area,
    locationSlug: school.locationSlug,
    locationLabel: school.locationLabel,
    beachOrder: school.beachOrder,
    website: school.website,
    detailUrl: comparePathForSchool(school),
    image: school.image,
    imageAlt: school.imageAlt,
    imageWidth: school.imageWidth,
    imageHeight: school.imageHeight,
    priceLabel: school.priceLabel,
    minPrice: school.minPrice,
    durationLabel: school.durationLabel,
    sortDurationMinutes: school.sortDurationMinutes,
    formats: school.formats,
    specFormats: specFormatLabel(school),
    audience: school.audience,
    specAudience: specAudienceLabel(school),
    levels: school.levels,
    minAge: school.minAge,
    summary: school.summary,
    facts: school.facts,
    cardHighlights: cardHighlightsForSchool(school),
    claimMailto: school.claimMailto
  };
}

function cardHighlightsForSchool(school) {
  const preferredLabels = [
    "Equipment",
    "Changing",
    "Group size",
    "Accreditation",
    "Parking",
    "Minimum age",
    "Meeting point",
    "Facilities",
    "Safety",
    "Location note",
    "Beach base",
    "Instructor note"
  ];
  const picks = [];

  for (const label of preferredLabels) {
    const match = school.facts.find((fact) => fact.label === label);
    if (match && !picks.includes(match.value)) {
      picks.push(match.value);
    }
    if (picks.length === 3) {
      break;
    }
  }

  if (picks.length < 3) {
    for (const fact of school.facts) {
      if (!picks.includes(fact.value)) {
        picks.push(fact.value);
      }
      if (picks.length === 3) {
        break;
      }
    }
  }

  return picks;
}

function mailtoForSchool(schoolName) {
  const subject = `Claim or update listing: ${schoolName}`;
  const body = `Hi Surfbooker,%0D%0A%0D%0AI want to claim or update the listing for ${schoolName}.%0D%0A%0D%0AThanks`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
}

function write(relativePath, content, options = {}) {
  const filePath = join(rootDir, relativePath);
  if (options.preserveExisting && existsSync(filePath)) {
    console.log(`Preserved existing file: ${relativePath}`);
    return;
  }
  mkdirSync(dirname(filePath), { recursive: true });
  const normalised = normaliseGeneratedText(content);
  const output = /\.html$/i.test(relativePath) ? "\ufeff" + normalised : normalised;
  writeFileSync(filePath, output);
}

function normaliseGeneratedText(value) {
  return String(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeScript(value) {
  return String(value).replace(/<\//g, "<\\/");
}















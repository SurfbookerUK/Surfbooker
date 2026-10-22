import { loadDestinations } from "./build-destination-guides.mjs";
import { GENERIC, placeImages } from "./lib/place-images.mjs";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  cornwallAreas,
  cornwallLessonLocations,
  cornwallLessonRegion,
  cornwallSchools
} from "../data/cornwall-expansion.mjs";
import { applyVisitorChrome } from "./apply-visitor-chrome.mjs";
import { accommodationAreas, buildAccommodationPages } from "./build-accommodation.mjs";

const destinationIntros = new Map((await loadDestinations()).map((d) => [d.slug, d.heroIntro]));
const rootDir = process.cwd();
const forceGuideBuild = process.argv.includes("--force-guides");
const lessonLocationsOnly = process.argv.includes("--lesson-locations-only");
const schoolProfilesOnly = process.argv.includes("--school-profiles-only");
const surfHireOnly = process.argv.includes("--surf-hire-only");
const cornwallOnly = process.argv.includes("--cornwall-only");
const schoolListingOnly = process.argv.includes("--school-listing-only");
const buildDate = "2026-08-18";
const baseUrl = "https://surfbooker.com";
const email = "hello@surfbooker.com";
const logoIcon = "/images/brand/logo-no-words-transparent.png";
const logoWordmark = "/images/brand/logo-no-words-transparent.png";
const logoBackground = "/images/brand/logo-background.png";
const faviconIco = "/favicon.ico";
const favicon48 = "/favicon-48x48.png";
const favicon96 = "/favicon-96x96.png";
const appleTouchIcon = "/apple-touch-icon.png";
const googleRatingsScript = "/google-ratings.js";
const analyticsComment = "<!-- Optional analytics: add Google Analytics 4 or Microsoft Clarity here when ready. -->";
const sharedDisclaimer = "Surfbooker lists surf schools independently and passes availability requests to the Surfbooker inbox. Prices, lesson times, booking terms and final availability are confirmed by each school. Surfbooker does not take payment at this stage.";
const pricingCheckedNote = "Final prices and availability are confirmed when you enquire.";
const verifiedPricingCheckedNote = "Prices checked August 2026. Availability and final prices should be confirmed directly with the provider.";
const ogImageAlt = "Surfbooker branding for Devon surf lessons";
const surfGuidesPath = "/guides/";
const westwardHoGuidePath = "/guides/surfing-westward-ho/";
const rnliWestwardHoUrl = "https://rnli.org/find-my-nearest/lifeguarded-beaches/westward-ho-beach";
const northamBurrowsAccessUrl = "https://www.torridge.gov.uk/article/19876/Northam-Burrows-opening-times-and-access";
const allAreas = ["Westward Ho!", "Saunton", "Woolacombe", "Croyde", "Putsborough", "Bigbury-on-Sea", ...cornwallAreas];
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
    name: "Ho! Surf / SurfSUP Academy",
    area: "Westward Ho!",
    locationSlug: "westward-ho",
    locationLabel: "Westward Ho!, Devon",
    beachOrder: 1,
    website: "https://www.surfandkiteshop.co.uk/learn-to-surf",
    image: "/images/ho-surf.webp",
    imageAlt: "Ho! Surf shopfront overlooking Westward Ho! Beach",
    imageWidth: 2400,
    imageHeight: 1350,
    subtitle: "Westward Ho! surf lessons with Ho! Surf and SurfSUP Academy",
    priceLabel: "From \u00A340.28",
    minPrice: 40.28,
    lessonPriceSummary: "Lessons from \u00A340.28 per person",
    lessonPriceGroups: [
      {
        title: "Group lessons",
        rows: [
          { item: "1 lesson", price: "\u00A340.28" },
          { item: "2 lessons", price: "\u00A376.32" },
          { item: "3 lessons", price: "\u00A3108.12" },
          { item: "4 lessons", price: "\u00A3135.68" },
          { item: "5 lessons", price: "\u00A3159" }
        ]
      },
      {
        title: "Private lessons",
        rows: [
          { item: "Private lesson", price: "\u00A395.40" },
          { item: "Each additional person", price: "\u00A336.04" }
        ]
      }
    ],
    durationLabel: "2 hours",
    sortDurationMinutes: 120,
    formats: ["Group", "Private"],
    audience: [],
    audienceLabel: "Ask the school about party fit",
    minAge: 6,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "Ho! Surf / SurfSUP Academy offers two-hour surf lessons, multi-lesson bundles and private lessons, with wetsuit fitting, changing rooms, safety briefing and board allocation before heading to the water.",
    pageIntro: [
      "",
      ""
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "2 hours" },
      { label: "Group lesson \u00A340.28", value: "2 lessons \u00A376.32\n3 lessons \u00A3108.12\n4 lessons \u00A3135.68\n5 lessons \u00A3159" },
      { label: "Private lesson \u00A395.40", value: "\u00A336.04 per extra person" },
      { label: "Ability levels", value: "Beginner to advanced" },
      { label: "Equipment", value: "Quality wetsuit and board allocation" },
      { label: "Changing", value: "On-site changing rooms and clothes storage" },
      { label: "Safety", value: "Safety briefing before going to the water" },
      { label: "Minimum age", value: "Group lessons from age 8\nPrivate lessons from age 6" },
      { label: "Instructor note", value: "Instructors hold current beach lifeguard qualifications" },
      { label: "Weather policy", value: "Lessons are rebooked or refunded if conditions are unsafe" }
    ],
    websiteFacts: [],
    claimMailto: mailtoForSchool("Ho! Surf / SurfSUP Academy")
  },
  {
    slug: "north-devon-surf-school",
    name: "North Devon Surf School",
    area: "Westward Ho!",
    locationSlug: "westward-ho",
    locationLabel: "Westward Ho!, Devon",
    beachOrder: 1,
    website: "https://www.northdevonsurfschool.co.uk/courses-lessons.php",
    image: "/images/north-devon-surf-school.webp",
    imageAlt: "North Devon Surf School premises beside Northam Burrows in Westward Ho!",
    imageWidth: 2048,
    imageHeight: 1536,
    subtitle: "Westward Ho! surf school with group and private lessons",
    priceLabel: "From \u00A339",
    minPrice: 39,
    lessonPriceSummary: "Lessons from \u00A339 per person",
    lessonPriceGroups: [
      {
        title: "Group lessons",
        rows: [
          { item: "1 lesson", price: "\u00A339" },
          { item: "2 lessons", price: "\u00A375" },
          { item: "3 lessons", price: "\u00A3110" },
          { item: "4 lessons", price: "\u00A3140" },
          { item: "5 lessons", price: "\u00A3170" },
          { item: "6 lessons", price: "\u00A3200" },
          { item: "10 lessons", price: "\u00A3270" }
        ]
      },
      {
        title: "Private lessons",
        rows: [
          { item: "Private lesson", price: "\u00A3105" },
          { item: "Each additional person", price: "\u00A330" }
        ]
      }
    ],
    durationLabel: "2 hours",
    sortDurationMinutes: 120,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: null,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "North Devon Surf School offers two-hour group and private surf lessons at Westward Ho!, with equipment included and heated changing rooms, storage and hot showers.",
    pageIntro: [
      "North Devon Surf School offers a wide range of surf lessons from \u00A339 and private tuition with a senior coach working exclusively with the booking.",
      "The school has a purpose-built base close to the beach, plus heated changing rooms, secure storage, toilets and hot showers."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "2 hours" },
      { label: "Group lesson \u00A339", value: "2 lessons \u00A375\n3 lessons \u00A3110\n4 lessons \u00A3140\n5 lessons \u00A3170\n6 lessons \u00A3200\n10 lessons \u00A3270" },
      { label: "Private lesson \u00A3105", value: "\u00A330 per extra person" },
      { label: "Equipment", value: "All equipment included" },
      { label: "Changing", value: "Heated changing rooms, storage, toilets and hot showers" },
      { label: "Parking", value: "Public parking next to the surf school" },
      { label: "Accreditation", value: "Surfing England Centre of Excellence" },
      { label: "Coaching", value: "Suitable for complete beginners through to more experienced surfers" }
    ],
    websiteFacts: [
      "Purpose-built surf school just 50 metres from Westward Ho! beach",
      "Group lessons, multi-lesson packs and private lessons",
      "Check availability before completing a booking"
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
    image: "/images/westward-waves-surf-school.webp",
    imageAlt: "Westward Waves Surf School beachside van at Westward Ho!",
    imageWidth: 1550,
    imageHeight: 1328,
    subtitle: "Westward Ho! lessons from a beachside Northam Burrows base",
    priceLabel: "From \u00A335",
    minPrice: 35,
    lessonPriceSummary: "Lessons from \u00A335 per person",
    lessonPriceGroups: [
      {
        title: "Group lessons",
        rows: [
          { item: "1 lesson", price: "\u00A335" },
          { item: "2 lessons", price: "\u00A365" },
          { item: "3 lessons", price: "\u00A390" },
          { item: "4 lessons", price: "\u00A3110" },
          { item: "5 lessons", price: "\u00A3130" }
        ]
      },
      {
        title: "Private lessons",
        rows: [
          { item: "1 person", price: "\u00A385" },
          { item: "2 people", price: "\u00A3115" },
          { item: "3 people", price: "\u00A3145" },
          { item: "4 people", price: "\u00A3175" },
          { item: "5 people", price: "\u00A3205" },
          { item: "Each additional person", price: "\u00A330" }
        ]
      }
    ],
    durationLabel: "2 hours",
    sortDurationMinutes: 120,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Mixed ages and abilities",
    minAge: null,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "Westward Waves publishes two-hour group lessons from \u00A335 and private coaching from its Northam Burrows base, with winter wetsuits, surfboards and changing facilities.",
    pageIntro: [
      "Westward Waves Surf School is based on Northam Burrows in Westward Ho! and offers both group and private lessons. Group lessons start from \u00A335 per person.",
      "Winter wetsuits, surfboards, winter accessories and changing facilities are all part of the current lesson setup."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "2 hours" },
      { label: "Group lesson \u00A335", value: "2 lessons \u00A365\n3 lessons \u00A390\n4 lessons \u00A3110\n5 lessons \u00A3130" },
      { label: "Private lesson \u00A385", value: "1:2 \u00A3115\n1:3 \u00A3145\n1:4 \u00A3175\n1:5 \u00A3205\n+\u00A330 per person thereafter" },
      { label: "Equipment", value: "Winter wetsuits, surfboards, boots, gloves and hoods" },
      { label: "Changing", value: "Changing facilities included" },
      { label: "Meeting point", value: "Sandymere Car Park on Northam Burrows" },
      { label: "Instructor note", value: "Qualified RLLSS beach lifeguards and BSA surf coaches" }
    ],
    websiteFacts: [
      "Westward Ho! lessons for complete beginners through to intermediate surfers",
      "Lessons include a 20 minute beach talk and around 90 minutes in the water",
      "Lesson times are adjusted around the tide, and visitors can call if online availability looks full"
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
    image: "/guides/Saunton/Saunton%20from%20beach.jpg",
    imageAlt: "Beach photo for Surf Saunton at Saunton Sands",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Saunton Sands surf school with group, private and kids options",
    priceLabel: "From \u00A345",
    minPrice: 45,
    lessonPriceSummary: "Lessons from \u00A345 per person",
    lessonPriceGroups: [
      {
        title: "Group lessons",
        rows: [
          { item: "Group lesson", price: "\u00A345 per person" },
          { item: "Group of 8 surfers", price: "\u00A342.50 per person" }
        ]
      },
      {
        title: "Private lessons",
        rows: [
          { item: "1 surfer", price: "\u00A3110" },
          { item: "2 surfers", price: "\u00A370 per surfer" },
          { item: "3 surfers", price: "\u00A360 per surfer" },
          { item: "4 surfers", price: "\u00A355 per surfer" },
          { item: "5 surfers", price: "\u00A350 per surfer" },
          { item: "6 surfers", price: "\u00A345 per surfer" },
          { item: "7 surfers", price: "\u00A345 per surfer" },
          { item: "8 surfers", price: "\u00A342.50 per surfer" }
        ]
      }
    ],
    durationLabel: "2 hours",
    sortDurationMinutes: 120,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 8,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "Surf Saunton offers two-hour surf lessons from \u00A345 per person at Saunton Sands, alongside private sessions, school groups and kids products.",
    pageIntro: [
      "Surf Saunton offers group surf lessons, private one-to-one coaching, private group lessons and dedicated children's products from its base at Saunton Sands. Two-hour surf lessons start from \u00A345 per person.",
      "Sessions are grouped by experience level, with large car parking, toilets, a dry indoor changing option in poor weather and equipment included in the lesson price."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "2 hours" },
      { label: "Group lesson \u00A345", value: "8 surfers \u00A342.50 per person" },
      { label: "Private lesson \u00A3110", value: "2 surfers \u00A370 per surfer\n3 surfers \u00A360 per surfer\n4 surfers \u00A355 per surfer\n5 surfers \u00A350 per surfer\n6 surfers \u00A345 per surfer\n7 surfers \u00A345 per surfer\n8 surfers \u00A342.50 per surfer" },
      { label: "Equipment", value: "Board, wetsuit, plus boots and gloves when needed" },
      { label: "Changing", value: "Dry indoor changing available in adverse weather" },
      { label: "Parking", value: "Large car park at Saunton Sands" },
      { label: "Minimum age", value: "Children under 8 need a parent in the water or a private lesson" },
      { label: "Instructor note", value: "ISA instruction and beach lifeguard qualifications" }
    ],
    websiteFacts: [
      "Morning and afternoon lesson slots",
      "Kids club and school group products",
      "Weather and sea conditions are monitored and sessions may be rearranged if needed"
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
    image: "/guides/Croyde/Croyde%20water%20and%20sand%203.jpg",
    imageAlt: "Beach photo for Walking on Waves at Saunton Sands",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Saunton Sands surf coaching with group, private and kids sessions",
    priceLabel: "From \u00A335 per lesson",
    minPrice: 35,
    lessonPriceSummary: "Lessons from \u00A335 per lesson",
    lessonPriceGroups: [{
      rows: [
        { item: "Group lesson", price: "\u00A345 per surfer" },
        { item: "Private lesson", price: "from \u00A343.33 per surfer" },
        { item: "Surf course", price: "from \u00A335 per lesson" }
      ]
    }],
    durationLabel: "1 to 2 hours",
    sortDurationMinutes: 60,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 4,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "Walking on Waves lists group, private, kids and course-based surf lessons at Saunton Sands, with public pricing from \u00A335 per lesson on multi-session surf courses and ISA-qualified coaching across one-hour to two-hour products.",
    pageIntro: [
      "Walking on Waves is one of the longest-running surf schools in Surfbooker's Saunton set, with group lessons, private sessions, kids lessons, surf courses and coach-and-ride products.",
      "The school offers a maximum 6:1 lesson ratio, indoor changing and storage, on-site toilets and lesson lengths from one hour to two hours."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "1 hour to 2 hours depending on session type" },
      { label: "Group lesson \u00A345 per surfer", value: "2 hours\n1.5 hours if only 1 or 2 surfers are booked" },
      { label: "Private lesson from \u00A343.33 per surfer", value: "1.5 hours\nAges 4+" },
      { label: "Surf course", value: "From \u00A335 per lesson" },
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
      "Established in 2003"
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
    image: "/guides/Woolacombe/ariel%20whole%20beach.avif",
    imageAlt: "Beach photo for Woolacombe Surf Centre",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Woolacombe village surf school with group, private and one-to-one sessions",
    priceLabel: "From \u00A340",
    minPrice: 40,
    lessonPriceSummary: "Lessons from \u00A340 per person",
    lessonPriceGroups: [
      {
        title: "Group lessons",
        rows: [
          { item: "1 session", price: "\u00A340" },
          { item: "2 sessions", price: "\u00A374" },
          { item: "3 sessions", price: "\u00A3110" },
          { item: "5 sessions", price: "\u00A3160" }
        ]
      },
      {
        title: "Private lessons",
        rows: [{ item: "One-to-one lesson", price: "\u00A3120" }]
      }
    ],
    durationLabel: "2 hours",
    sortDurationMinutes: 120,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 8,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "Woolacombe Surf Centre offers two-hour group, private and one-to-one surf sessions, with equipment included and a public group lesson price from \u00A340.",
    pageIntro: [
      "Woolacombe Surf Centre offers two-hour surf sessions for all abilities, with separate sections for group lessons, private lessons, one-to-one coaching and larger group bookings.",
      "A single two-hour surf session starts from \u00A340, with all required equipment and coaching included."
    ],
    facts: [
      { label: "Lesson format", value: "Group, private and one-to-one lessons" },
      { label: "Duration", value: "2 hours" },
      { label: "Group lesson \u00A340", value: "2 sessions \u00A374\n3 sessions \u00A3110\n5 sessions \u00A3160" },
      { label: "One-to-one lesson \u00A3120", value: "Private group pricing varies by group size" },
      { label: "Equipment", value: "All required equipment included" },
      { label: "Coaching", value: "Suitable for first-timers through to more experienced surfers" },
      { label: "Accreditation", value: "Surfing England accredited Centre of Excellence" },
      { label: "Instructor note", value: "Instructors are fully qualified beach lifeguards" },
      { label: "Minimum age", value: "Group lessons from age 8, private lessons for younger surfers" }
    ],
    websiteFacts: [
      "Free session photos on most surf lessons",
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
    image: "/guides/Woolacombe/ariel%20whole%20beach.avif",
    imageAlt: "Beach photo for Surfing Woolacombe",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Beach slipway surf school with showers, changing and private family options",
    priceLabel: "From \u00A340",
    minPrice: 40,
    lessonPriceSummary: "Lessons from \u00A340 per person",
    lessonPriceGroups: [
      {
        title: "Group lessons",
        rows: [
          { item: "1 lesson", price: "\u00A340" },
          { item: "2 lessons", price: "\u00A374" },
          { item: "3 lessons", price: "\u00A3110" },
          { item: "4 lessons", price: "\u00A3130" },
          { item: "5 lessons", price: "\u00A3160" }
        ]
      },
      {
        title: "Private lessons",
        rows: [
          { item: "1 surfer", price: "\u00A3120" },
          { item: "2 surfers", price: "\u00A3150" },
          { item: "3 surfers", price: "\u00A3170" },
          { item: "5 surfers", price: "\u00A3210" },
          { item: "7 surfers", price: "\u00A3240" }
        ]
      }
    ],
    durationLabel: "1 to 2 hours",
    sortDurationMinutes: 60,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 8,
    levels: ["Beginner", "Intermediate", "Advanced", "Family"],
    summary: "Surfing Woolacombe lists taster group lessons from \u00A340, longer course bundles and a wide range of private surf lesson formats from its beach slipway base in Woolacombe.",
    pageIntro: [
      "Surfing Woolacombe is positioned directly on the Woolacombe beach slipway and offers group, private and family-oriented lesson options.",
      "The school includes showers, changing facilities, lockers, storage, four-season wetsuits and winter accessories."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "1 hour to 2 hours depending on session type" },
      { label: "Group lesson \u00A340", value: "2 lessons \u00A374\n3 lessons \u00A3110\n4 lessons \u00A3130\n5 lessons \u00A3160" },
      { label: "Private lesson \u00A3120", value: "2 surfers \u00A3150\n3 surfers \u00A3170\n5 surfers \u00A3210\n7 surfers \u00A3240" },
      { label: "Equipment", value: "Four-season wetsuits, plus boots, gloves and hoods in winter" },
      { label: "Changing", value: "Showers, changing facilities, lockers and storage" },
      { label: "Location note", value: "Based on the Woolacombe beach slipway" },
      { label: "Minimum age", value: "Group lessons from age 8, younger children through private options" },
      { label: "Coaching", value: "Suitable for beginner, intermediate and advanced surfers" }
    ],
    websiteFacts: [
      "Public lesson menu includes course bundles up to five sessions",
      "Private formats range from 1:1 sessions to larger private family groups",
      "Part of local surf culture since 2002"
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
    image: "/guides/Croyde/Croyde%20water%20and%20sand%203.jpg",
    imageAlt: "Beach photo for Surf South West in Croyde",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Croyde Bay surf school with group, private and adaptive options",
    priceLabel: "From \u00A345",
    minPrice: 45,
    lessonPriceSummary: "Lessons from \u00A345 per person",
    lessonPriceGroups: [
      {
        title: "Group lessons",
        rows: [
          { item: "1 lesson", price: "\u00A345" },
          { item: "2 lessons", price: "\u00A385" }
        ]
      },
      {
        title: "Private lessons",
        rows: [
          { item: "1 person", price: "\u00A3130" },
          { item: "2 people", price: "\u00A390 per person" },
          { item: "3 people", price: "\u00A385 per person" },
          { item: "4 people", price: "\u00A375 per person" },
          { item: "5 people", price: "\u00A365 per person" },
          { item: "6 people", price: "\u00A355 per person" },
          { item: "7 people", price: "\u00A345 per person" },
          { item: "8 people", price: "\u00A339 per person" }
        ]
      }
    ],
    durationLabel: "2 hours",
    sortDurationMinutes: 120,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: null,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "Surf South West publishes two-hour half-day group surf lessons from \u00A345 and separate private lesson pricing from its Croyde Bay base, while also advertising adaptive and performance products.",
    pageIntro: [
      "Surf South West has been running surf lessons at Croyde Bay since 1996 and offers half-day, two-day, weekend, five-day, private and adaptive options.",
      "The two-hour half-day session starts from \u00A345 per person with all equipment included, alongside changing rooms, storage and specialist adaptive instruction."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "2 hours" },
      { label: "Group lesson \u00A345", value: "2 lessons \u00A385" },
      { label: "Private lesson \u00A3130", value: "2 people \u00A390pp\n3 people \u00A385pp\n4 people \u00A375pp\n5 people \u00A365pp\n6 people \u00A355pp\n7 people \u00A345pp\n8 people \u00A339pp" },
      { label: "Equipment", value: "All equipment included" },
      { label: "Changing", value: "Changing rooms, toilet and storage area" },
      { label: "Parking", value: "Croyde Burrows Car Park, Moore Lane" },
      { label: "Accreditation", value: "Surfing England Training Centre of Excellence" },
      { label: "Specialist note", value: "Adaptive and performance surf coaching available" }
    ],
    websiteFacts: [
      "Private lesson pricing varies by group size, with younger children able to arrange one-hour sessions",
      "Group lessons suit complete beginners through to intermediate surfers",
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
    image: "/guides/Croyde/Croyde%20water%20and%20sand%203.jpg",
    imageAlt: "Beach photo for Surfing Croyde Bay",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "",
    priceLabel: "From \u00A330",
    minPrice: 30,
    lessonPriceSummary: "Lessons from \u00A330 per person",
    lessonPriceGroups: [
      {
        title: "Group lessons",
        rows: [
          { item: "Group lesson", price: "\u00A330" },
          { item: "3-lesson pack", price: "from \u00A330" },
          { item: "5-lesson pack", price: "from \u00A330" },
          { item: "Beginner single lesson", price: "\u00A335" }
        ]
      },
      {
        title: "Private lessons",
        rows: [
          { item: "One-to-one half-day lesson", price: "\u00A3140" },
          { item: "Beginner private lesson", price: "\u00A3130" }
        ]
      }
    ],
    lessonPriceNote: "The existing source information lists both a \u00A330 group starting price and a separate \u00A335 beginner single lesson.",
    durationLabel: "2.5 hours",
    sortDurationMinutes: 150,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 5,
    levels: ["Beginner", "Intermediate", "Advanced", "Family"],
    summary: "Surfing Croyde Bay offers 2.5 hour half-day surf lessons from \u00A330, private tuition and family options, with all equipment included and a 6:1 coaching ratio.",
    pageIntro: [
      "Surfing Croyde Bay offers 2.5 hour group lessons from \u00A330, private lessons, all equipment included and a maximum 6 students to 1 coach ratio.",
      "Warm indoor changing, hot showers and family-focused lesson options are also available."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "2.5 hours" },
      { label: "Group lesson \u00A330", value: "3 lesson pack from \u00A330\n5 lesson pack from \u00A330" },
      { label: "Private lesson \u00A3140", value: "1 to 1 half-day surf lesson" },
      { label: "Equipment", value: "All equipment included" },
      { label: "Changing", value: "Warm indoor changing and hot showers" },
      { label: "Group size", value: "Maximum 6 students to 1 coach" },
      { label: "Minimum age", value: "Lessons available from age 5" },
      { label: "Accreditation", value: "Surfing England Centre of Excellence" }
    ],
    websiteFacts: [
      "Beginner surf lesson pages also show a \u00A335 single lesson and \u00A3130 beginner private lesson",
      "Lessons cater for complete beginners through to competitive surfers",
      "Family lessons available separately"
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
    image: "/guides/Putsborough/beach%20wide%20shot%20main.jpeg",
    imageAlt: "Beach photo for Nick Thorn Surf Coaching at Putsborough",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Putsborough surf school with group, private and family sessions",
    priceLabel: "From \u00A338",
    minPrice: 38,
    lessonPriceSummary: "Lessons from \u00A338 per person",
    lessonPriceGroups: [
      {
        title: "Group lessons",
        rows: [
          { item: "1 session", price: "\u00A338" },
          { item: "2 sessions", price: "\u00A370" },
          { item: "3 sessions", price: "\u00A3105" },
          { item: "4 sessions", price: "\u00A3128" },
          { item: "5 sessions", price: "\u00A3155" }
        ]
      },
      {
        title: "Private and family lessons",
        rows: [
          { item: "Private lesson", price: "\u00A380" },
          { item: "Private 1:2, 1.5 hours", price: "\u00A3150" },
          { item: "Private 1:3, 2 hours", price: "\u00A365 per person" },
          { item: "Private 1:4, 2 hours", price: "\u00A355 per person" },
          { item: "Family session", price: "\u00A3140" },
          { item: "Each additional family member", price: "\u00A325" }
        ]
      }
    ],
    durationLabel: "1.5 to 2 hours",
    sortDurationMinutes: 90,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 8,
    levels: ["Beginner", "Intermediate", "Advanced", "Family"],
    summary: "Nick Thorn Surf Coaching runs surf sessions from \u00A338, private coaching, family sessions and Surfing England accreditation.",
    pageIntro: [
      "Nick Thorn Surf Coaching is a Putsborough-based Devon surf school and lifeguard training centre, with public pricing for group sessions, private tuition and family sessions.",
      "Two-hour group lessons start from \u00A338, with private coaching from 1.5 hours, family sessions and a broad age range."
    ],
    facts: [
      { label: "Lesson format", value: "Group, private and family sessions" },
      { label: "Duration", value: "1.5 hours to 2 hours" },
      { label: "Group lesson \u00A338", value: "2 sessions \u00A370\n3 sessions \u00A3105\n4 sessions \u00A3128\n5 sessions \u00A3155" },
      { label: "Private lesson \u00A380", value: "1:2 \u00A3150 / 1.5h\n1:3 \u00A365pp / 2h\n1:4 \u00A355pp / 2h" },
      { label: "Family session \u00A3140", value: "\u00A325 per extra member" },
      { label: "Equipment", value: "Wetsuits, surfboards, boots, gloves and hoods available through the school" },
      { label: "Minimum age", value: "Lessons are for ages 8 and above" },
      { label: "Accreditation", value: "Surfing England accredited and described as a lifeguard training centre" },
      { label: "Beach base", value: "Sessions run from Putsborough beach" },
      { label: "Facilities", value: "Putsborough beach facilities and cafe nearby" }
    ],
    websiteFacts: [
      "Group sessions, private tuition and family sessions all have public pricing",
      "The team caters for individuals, groups, schools and corporate training days",
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
    image: "/guides/Putsborough/beach%20wide%20shot%20main.jpeg",
    imageAlt: "Beach photo for Barefoot Surf School at Putsborough Sands",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Putsborough Sands private and family surf school",
    priceLabel: "From \u00A3100",
    minPrice: 100,
    lessonPriceSummary: "Private lessons from \u00A3100",
    lessonPriceGroups: [{
      rows: [
        { item: "Private 1:1 lesson", price: "from \u00A3100" },
        { item: "Family session", price: "\u00A3150" },
        { item: "Each additional family member", price: "\u00A325" }
      ]
    }],
    durationLabel: "90 minutes",
    sortDurationMinutes: 90,
    formats: ["Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: null,
    levels: ["Beginner", "Intermediate", "Advanced", "Family"],
    summary: "Barefoot Surf School focuses on private 1:1 or 2:1 coaching and family surf lessons at Putsborough Sands, with public prices from \u00A3100 and 90-minute sessions.",
    pageIntro: [
      "Barefoot Surf School is a family-run, accredited surf school based at Putsborough, focused on private 1:1 or 2:1 tuition plus family surf lessons held at Putsborough Sands.",
      "Lessons run for 90 minutes, start from \u00A3100 for 1:1 sessions, include board and wetsuit hire and use a dedicated private instructor format."
    ],
    facts: [
      { label: "Lesson format", value: "Private and family lessons" },
      { label: "Duration", value: "90 minutes" },
      { label: "Family session \u00A3150", value: "\u00A325 additional person" },
      { label: "Equipment", value: "Board and wetsuit hire included in lesson prices" },
      { label: "Meeting point", value: "Putsborough car park meeting point" },
      { label: "Group size", value: "1:1, 2:1 and family session formats" },
      { label: "Accreditation", value: "Accredited surf school" },
      { label: "Coaching note", value: "Private tuition is promoted for beginners through to surfers refining technique" }
    ],
    websiteFacts: [
      "Family sessions are priced for four people with extra members added separately",
      "Specialises in beginners and also supports progression in private coaching",
      "Lessons are held at Putsborough Sands rather than in Woolacombe village or Croyde"
    ],
    claimMailto: mailtoForSchool("Barefoot Surf School")
  },
  {
    slug: "discovery-surf-school",
    name: "Discovery Surf School",
    area: "Bigbury-on-Sea",
    locationSlug: "bigbury-on-sea",
    locationLabel: "Bigbury-on-Sea & Bantham, Devon",
    beachOrder: 6,
    website: "https://discoverysurf.com/pages/surf-lessons-and-courses",
    image: "/guides/Bigbury-on-sea/zoomed%20out%20view.jpeg",
    imageAlt: "Beach photo for Surfbooker's Discovery Surf School profile",
    imageWidth: 1600,
    imageHeight: 900,
    subtitle: "South Devon surf lessons at Bigbury-on-Sea and Bantham",
    priceLabel: "From £48",
    minPrice: 48,
    lessonPriceSummary: "Lessons from £48 per person",
    lessonPriceGroups: [
      {
        title: "Beginner group lessons",
        rows: [
          { item: "1 lesson", price: "£48" },
          { item: "2 lessons", price: "£92" },
          { item: "3 lessons", price: "£135" },
          { item: "4 lessons", price: "£180" }
        ]
      },
      {
        title: "Private lessons",
        rows: [
          { item: "1:1, 1 hour", price: "£95" },
          { item: "1:1, 1.5 hours", price: "£125" },
          { item: "1:1, 2 hours", price: "£145" },
          { item: "2:1, 1 hour", price: "£120" }
        ]
      }
    ],
    durationLabel: "1 hour to 1.5 hours",
    sortDurationMinutes: 60,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 6,
    levels: ["Beginner", "Intermediate", "Advanced", "Family"],
    summary: "Discovery Surf School runs South Devon surf lessons from Bigbury-on-Sea and Bantham, with beginner groups, private coaching, family sessions, special-needs sessions and equipment included.",
    pageIntro: [
      "Discovery Surf School serves both Bigbury-on-Sea and Bantham and is one of the clearest South Devon options if you want lessons and surf hire from the same operation.",
      "Its public lesson page publishes beginner group prices, private 1:1 pricing, age guidance, small teaching ratios and the beaches it uses."
    ],
    facts: [
      { label: "Lesson format", value: "Group, private and family-oriented sessions" },
      { label: "Duration", value: "1 hour to 1.5 hours depending on session type" },
      { label: "Beginner group lesson £48", value: "2 lessons £92\n3 lessons £135\n4 lessons £180" },
      { label: "Private lesson £95", value: "1:1 1 hour £95\n1:1 1.5 hours £125\n1:1 2 hours £145\n2:1 1 hour £120" },
      { label: "Equipment", value: "All equipment included" },
      { label: "Minimum age", value: "Group lessons from age 6" },
      { label: "Group size", value: "Maximum 6 pupils per instructor on group lessons" },
      { label: "Locations", value: "Bigbury-on-Sea and Bantham" },
      { label: "Swimming", value: "Participants should be able to confidently swim 50 metres for group lessons" },
      { label: "Accreditation", value: "Surfing England accredited; ASI or Surfing England qualified instructors" }
    ],
    websiteFacts: [
      "Beginner group lessons are listed at 1.5 hours",
      "Private sessions and special-needs sessions have separate published pricing",
      "The provider states that all equipment is included and that lessons run at Bigbury-on-Sea or Bantham"
    ],
    claimMailto: mailtoForSchool("Discovery Surf School")
  },
  {
    slug: "lords-of-down-end",
    name: "Lords of Down End",
    area: "Croyde",
    locationSlug: "croyde",
    locationLabel: "Croyde Bay, Devon",
    beachOrder: 4,
    website: "https://lordsofdownend.co.uk/",
    image: "/guides/Croyde/Croyde%20water%20and%20sand%203.jpg",
    imageAlt: "Beach photo for Lords of Down End in Croyde",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Croyde Bay surf lessons from the southern end of the beach",
    priceLabel: "From \u00A340 per person",
    minPrice: 40,
    durationLabel: "Contact provider",
    sortDurationMinutes: 999,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Confirm directly with the provider",
    minAge: null,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "Lords of Down End is a Croyde surf school based at the southern end of the bay. Confirm current lesson formats, meeting points, equipment and pricing directly with the provider before booking.",
    lessonPriceSummary: "Lessons from \u00A340 per person",
    lessonPriceGroups: [{
      rows: [
        { item: "Group and children\u2019s lessons", price: "from \u00A340 per person" },
        { item: "Private 1:1 lesson", price: "\u00A399" },
        { item: "Private lesson for two", price: "\u00A385 per person" }
      ]
    }],
    pageIntro: [
      "A Croyde surf school operating from the Down End side of the bay.",
      "Use this profile to compare it with the other local lesson options before you enquire."
    ],
    facts: [
      { label: "Lesson format", value: "Check directly with provider" },
      { label: "Duration", value: "Check directly with provider" },
      { label: "Location", value: "Down End side of Croyde Bay" },
      { label: "Best for", value: "Local Croyde surf sessions" },
      { label: "Equipment", value: "Confirm with provider" },
      { label: "Ability levels", value: "Check directly with provider" }
    ],
    websiteFacts: [
      "Positioned at the southern end of Croyde Bay, which can feel different from the Baggy Point side",
      "Use this page as a quick reference when comparing Croyde lesson options",
      "Always confirm meeting point, timing and inclusions before travelling"
    ],
    googleRating: false,
    claimMailto: mailtoForSchool("Lords of Down End")
  },
  ...cornwallSchools
];

const lessonRegions = [
  {
    slug: "devon",
    name: "Devon",
    label: "Surf lessons",
    pageTitle: "Devon Surf Lessons",
    intro: [
      "Use Surfbooker's Devon surf lessons pages when you have not chosen a beach yet and want the broad county view first.",
      "This page routes you into North Devon and South Devon, then down into beach-specific lesson comparisons and individual provider profiles."
    ],
    metaDescription: "Compare Devon surf lessons with separate Devon, North Devon and South Devon beach-level comparison pages and individual provider profiles.",
    heroImage: "/images/Surfers%20in%20waves.jpg",
    image: "/images/Surf%20Hire.jpg",
    childRegions: ["north-devon", "south-devon"]
  },
  {
    slug: "north-devon",
    name: "North Devon",
    label: "Surf lessons",
    pageTitle: "North Devon Surf Lessons",
    intro: [
      "North Devon is Surfbooker's strongest current lesson set, covering Westward Ho!, Saunton Sands, Woolacombe, Croyde Bay, Putsborough and Lynton.",
      "Use this page to compare the six places first, then move into the beach-level lesson pages and individual provider profiles."
    ],
    metaDescription: "Compare North Devon surf lessons across Westward Ho!, Saunton, Woolacombe, Croyde, Putsborough and Lynton, then move into place pages and provider profiles.",
    heroImage: "/guides/Croyde/Croyde%20water%20and%20sand%203.jpg",
    image: "/guides/Woolacombe/ariel%20whole%20beach.avif"
  },
  {
    slug: "south-devon",
    name: "South Devon",
    label: "Surf lessons",
    pageTitle: "South Devon Surf Lessons",
    intro: [
      "South Devon works differently from North Devon, with fewer lesson operators and more dependence on the beach, tide and day's conditions.",
      "This page keeps the South Devon discovery layer separate from North Devon, and routes users into the relevant beach guides and verified provider pages."
    ],
    metaDescription: "Explore South Devon surf lessons on Surfbooker with verified providers, beach context for Bantham, Bigbury-on-Sea and Challaborough, and links into detailed provider pages.",
    heroImage: "/guides/Bigbury-on-sea/zoomed%20out%20view.jpeg",
    relatedRegions: ["devon", "north-devon"]
  },
  cornwallLessonRegion
];

lessonRegions.push(
  {
    slug: "wales", name: "Wales", label: "Surf lessons", pageTitle: "Wales Surf Lessons",
    intro: ["Explore surf lesson destinations across Gower, Pembrokeshire, Anglesey, Llŷn and the South Wales coast.", "Open a destination page to see verified schools where available and honest coverage where research is still needed."],
    metaDescription: "Compare surf lesson destinations across Wales, including Gower, Pembrokeshire, Anglesey, Llŷn and Porthcawl.", heroImage: "/images/Surfers%20on%20beach.avif"
  },
  {
    slug: "scotland", name: "Scotland", label: "Surf lessons", pageTitle: "Scotland Surf Lessons",
    intro: ["Explore surf lesson destinations across Scotland's north, east, northeast, island and Atlantic coasts.", "Use the destination pages to find verified schools where available and plan around the local beach guide."],
    metaDescription: "Compare surf lesson destinations across Scotland's varied surf coast.", heroImage: "/images/generic%20wave.jpg"
  },
  {
    slug: "northern-ireland", name: "Northern Ireland", label: "Surf lessons", pageTitle: "Northern Ireland Surf Lessons",
    intro: ["Explore surf lesson destinations around the Causeway Coast and north Antrim.", "Each destination page clearly separates verified school listings from locations still awaiting researched providers."],
    metaDescription: "Compare surf lesson destinations across Northern Ireland's north coast.", heroImage: "/images/Surfer%20on%20wave%202.avif"
  },
  {
    slug: "northeast-england-yorkshire", name: "Northeast England & Yorkshire", label: "Surf lessons", pageTitle: "Northeast England & Yorkshire Surf Lessons",
    intro: ["Explore lesson destinations from Tynemouth and Northumberland to Teesside and Yorkshire.", "Open each destination to compare verified schools or see where listings are still being researched."],
    metaDescription: "Compare surf lesson destinations across northeast England and Yorkshire.", heroImage: "/images/Surfers%20in%20waves.jpg"
  },
  {
    slug: "southern-england", name: "Southern England", label: "Surf lessons", pageTitle: "Southern England Surf Lessons",
    intro: ["Explore surf lesson destinations across Dorset, Sussex, Kent and the Isle of Wight.", "Use each destination page alongside its beach guide before choosing a lesson location."],
    metaDescription: "Compare surf lesson destinations across southern England.", heroImage: "/images/Beach%20Guides.jpg"
  }
);

const locations = [
  {
    slug: "westward-ho",
    name: "Westward Ho!",
    label: "Westward Ho! surf lessons",
    pageTitle: "Surf lessons in Westward Ho!",
    intro: [
      "Westward Ho! is Surfbooker's largest single beach cluster right now, with Ho! Surf / SurfSUP Academy, North Devon Surf School and Westward Waves Surf School all publishing surf lesson information for the area.",
      "Across the area there is a strong mix of two-hour lesson products, wetsuit and equipment options, and both group and private coaching formats."
    ],
    metaDescription: "Compare surf lessons in Westward Ho!, Devon. Browse Ho! Surf / SurfSUP Academy, North Devon Surf School and Westward Waves with public lesson details and internal school pages.",
    regionSlug: "north-devon",
    image: "/guides/westwardho!/westward%20ho%201.jpeg",
    relatedAreas: ["Devon", "Saunton", "Woolacombe"]
  },
  {
    slug: "saunton",
    name: "Saunton",
    label: "Saunton surf lessons",
    pageTitle: "Surf lessons in Saunton",
    intro: [
      "Surfbooker's Saunton pages currently cover Surf Saunton and Walking on Waves, two schools with detailed public lesson pages centred on Saunton Sands.",
      "This area has a strong mix of group lessons, private coaching, kids products and progression-focused surf courses, plus practical details such as parking, changing and equipment."
    ],
    metaDescription: "Compare surf lessons in Saunton Sands, Devon. Browse Surf Saunton and Walking on Waves with public lesson prices, formats and internal Surfbooker school pages.",
    regionSlug: "north-devon",
    image: "/guides/Saunton/Saunton%20from%20beach.jpg",
    relatedAreas: ["Devon", "Westward Ho!", "Woolacombe"]
  },
  {
    slug: "woolacombe",
    name: "Woolacombe",
    label: "Woolacombe surf lessons",
    pageTitle: "Surf lessons in Woolacombe",
    intro: [
      "Woolacombe gives Surfbooker two surf schools to compare: Woolacombe Surf Centre from the village side and Surfing Woolacombe directly from the beach slipway.",
      "Both providers publish public lesson information, but they position themselves differently, so the internal school pages are useful before you decide which Woolacombe base fits your day."
    ],
    metaDescription: "Compare surf lessons in Woolacombe, Devon. Browse Woolacombe Surf Centre and Surfing Woolacombe with public lesson details and internal Surfbooker pages.",
    regionSlug: "north-devon",
    image: "/guides/Woolacombe/ariel%20whole%20beach.avif",
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
    regionSlug: "north-devon",
    image: "/guides/Croyde/Croyde%20water%20and%20sand%203.jpg",
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
    regionSlug: "north-devon",
    image: "/guides/Putsborough/beach%20wide%20shot%20main.jpeg",
    relatedAreas: ["Devon", "Croyde", "Woolacombe"]
  },
  {
    slug: "bigbury-on-sea",
    name: "Bigbury-on-Sea",
    label: "Bigbury-on-Sea surf lessons",
    pageTitle: "Surf lessons in Bigbury-on-Sea",
    intro: [
      "Bigbury-on-Sea gives Surfbooker a South Devon lesson page with direct links into Discovery Surf School's South Hams setup.",
      "The provider works across Bigbury-on-Sea and Bantham, so this page is useful if you want a South Devon lesson option without being forced into the North Devon model."
    ],
    metaDescription: "Compare surf lessons in Bigbury-on-Sea, Devon. Browse Discovery Surf School's South Devon lesson details and Surfbooker provider profile.",
    regionSlug: "south-devon",
    image: "/guides/Bigbury-on-sea/zoomed%20out%20view.jpeg",
    relatedAreas: ["Devon", "Putsborough", "Saunton"]
  },
  {
    slug: "lynton",
    name: "Lynton",
    label: "Lynton surf lessons",
    pageTitle: "Surf lessons in Lynton",
    intro: [
      "Lynton sits on the Exmoor coast at the eastern end of North Devon, close to Lynmouth's distinctive coastline.",
      "Surfbooker does not currently list a verified Lynton lesson provider, but the place is included in the North Devon lesson structure for browsing and future coverage."
    ],
    metaDescription: "Explore the Lynton surf lesson area in North Devon, with nearby Surfbooker lesson pages and coastal guide links.",
    regionSlug: "north-devon",
    image: "/guides/Lynmouth/waves%20from%20road.jpeg",
    relatedAreas: ["Devon", "Westward Ho!", "Woolacombe"]
  },
  ...cornwallLessonLocations
];

const lessonLocationSlugs = new Set(locations.map((location) => location.slug));
for (const area of accommodationAreas) {
  const destinationGuidePath = area.guidePath || (existsSync(join(rootDir, "guides", `surfing-${area.slug}`, "index.html")) ? `/guides/surfing-${area.slug}/` : "");
  if (!destinationGuidePath || lessonLocationSlugs.has(area.slug)) continue;
  locations.push({
    slug: area.slug,
    name: area.name,
    label: `${area.name} surf lessons`,
    pageTitle: `Surf lessons in ${area.name}`,
    seoTitle: `Surf Schools Near ${area.name} | Surfbooker`,
    h1: `Surf schools near ${area.name}`,
    intro: [
      `Use this page to find verified surf schools serving ${area.name}.`,
      `No provider is shown unless Surfbooker has enough trustworthy information to publish it; use the linked destination guide to plan beach access and suitability.`
    ],
    metaDescription: `Find surf lessons in ${area.name}. Check verified Surfbooker school listings and use the local destination guide to plan your session.`,
    regionSlug: area.regionSlug,
    image: area.image,
    guidePath: destinationGuidePath,
    relatedAreas: []
  });
  lessonLocationSlugs.add(area.slug);
}

const hireRegions = [
  {
    slug: "devon",
    name: "Devon",
    label: "Surf hire",
    pageTitle: "Devon Surf Hire",
    intro: [
      "Browse every verified Devon surf-hire destination, from Westward Ho! and Woolacombe to Bigbury-on-Sea and Bantham.",
      "Choose a beach to compare its surf-hire providers, equipment and collection details."
    ],
    metaDescription: "Compare surf hire across every verified Devon destination, including Westward Ho!, Saunton, Woolacombe, Croyde, Putsborough, Bigbury-on-Sea and Bantham.",
    heroImage: "/images/Surf%20Hire.jpg",
    image: "/images/Surf%20Hire.jpg",
    childRegions: ["north-devon", "south-devon"],
    relatedRegions: ["north-devon", "south-devon"]
  },
  {
    slug: "north-devon",
    name: "North Devon",
    label: "Surf hire",
    pageTitle: "North Devon Surf Hire",
    intro: [
      "North Devon has the broadest Surfbooker surf-hire coverage, from Westward Ho! through Saunton, Woolacombe, Croyde and Putsborough.",
      "Use this page to compare providers by beach, then check the provider pages for pricing structure, equipment list, pickup arrangements and any deposit or ID requirement."
    ],
    metaDescription: "Compare North Devon surf hire across Westward Ho!, Saunton, Woolacombe, Croyde and Putsborough on Surfbooker.",
    heroImage: "/guides/Woolacombe/ariel%20whole%20beach.avif",
    image: "/guides/Woolacombe/ariel%20whole%20beach.avif",
    relatedRegions: ["devon", "south-devon"]
  },
  {
    slug: "south-devon",
    name: "South Devon",
    label: "Surf hire",
    pageTitle: "South Devon Surf Hire",
    intro: [
      "South Devon surf hire is more concentrated, with a smaller number of providers serving Bigbury-on-Sea, Bantham and nearby beaches.",
      "Use this page to understand where collection points actually are before committing to a hire plan."
    ],
    metaDescription: "Compare South Devon surf hire on Surfbooker with verified providers serving Bigbury-on-Sea, Bantham and nearby beaches.",
    heroImage: "/guides/Bantham/beach%20too.jpeg",
    image: "/guides/Bantham/beach%20too.jpeg"
  },
  {
    slug: "cornwall",
    name: "Cornwall",
    label: "Surf hire",
    pageTitle: "Cornwall Surf Hire",
    intro: [
      "Compare verified Cornwall surf-hire locations across the north coast, Newquay area and west to St Ives Bay.",
      "Only beaches with hire confirmed on an official provider website are included."
    ],
    metaDescription: "Compare verified Cornwall surf hire at Fistral, Polzeath, Watergate Bay, Perranporth, Gwithian, Praa Sands and Porthmeor.",
    heroImage: "/guides/_licensed-images/cornwall/fistral-beach.jpg",
    image: "/guides/_licensed-images/cornwall/fistral-beach.jpg"
  }
];

hireRegions.push(
  {
    slug: "wales", name: "Wales", label: "Surf hire", pageTitle: "Wales Surf Hire",
    intro: ["Explore surf-hire destinations across Gower, Pembrokeshire, Anglesey, Llŷn and the South Wales coast.", "Destination pages only show providers when Surfbooker has enough trustworthy information to publish them."],
    metaDescription: "Find surfboard and wetsuit hire destinations around the Wales surf coast.", heroImage: "/images/Surfers%20on%20beach.avif", image: "/images/Surfers%20on%20beach.avif"
  },
  {
    slug: "scotland", name: "Scotland", label: "Surf hire", pageTitle: "Scotland Surf Hire",
    intro: ["Explore equipment-hire coverage around Scotland's north, east, northeast, island and Atlantic surf destinations.", "Use each destination page to check verified availability before travelling."],
    metaDescription: "Find surfboard and wetsuit hire destinations around Scotland's surf coast.", heroImage: "/images/generic%20wave.jpg", image: "/images/generic%20wave.jpg"
  },
  {
    slug: "northern-ireland", name: "Northern Ireland", label: "Surf hire", pageTitle: "Northern Ireland Surf Hire",
    intro: ["Explore surf-hire destinations around the Causeway Coast and north Antrim.", "Pages clearly show where no verified equipment provider is currently listed."],
    metaDescription: "Find surfboard and wetsuit hire destinations around Northern Ireland's north coast.", heroImage: "/images/Surfer%20on%20wave%202.avif", image: "/images/Surfer%20on%20wave%202.avif"
  },
  {
    slug: "northeast-england-yorkshire", name: "Northeast England & Yorkshire", label: "Surf hire", pageTitle: "Northeast England & Yorkshire Surf Hire",
    intro: ["Explore surf-hire destinations from Tynemouth and Northumberland to Teesside and Yorkshire.", "Check individual destination pages for researched provider coverage."],
    metaDescription: "Find surfboard and wetsuit hire destinations across northeast England and Yorkshire.", heroImage: "/images/Surfers%20in%20waves.jpg", image: "/images/Surfers%20in%20waves.jpg"
  },
  {
    slug: "southern-england", name: "Southern England", label: "Surf hire", pageTitle: "Southern England Surf Hire",
    intro: ["Explore surf-hire destinations across Dorset, Sussex, Kent and the Isle of Wight.", "Use the destination guide alongside verified hire information before choosing equipment."],
    metaDescription: "Find surfboard and wetsuit hire destinations across southern England.", heroImage: "/images/Beach%20Guides.jpg", image: "/images/Beach%20Guides.jpg"
  }
);

const hireLocations = [
  {
    slug: "westward-ho",
    name: "Westward Ho!",
    pageTitle: "Surf Hire in Westward Ho!",
    label: "Westward Ho! surf hire",
    regionSlug: "north-devon",
    guidePath: "/guides/westwardho!/",
    image: "/guides/westwardho!/westward%20ho%201.jpeg",
    metaDescription: "Compare surf hire in Westward Ho!, Devon. Check boards, wetsuits, multi-day options and pickup notes before you travel.",
    intro: [
      "Westward Ho! combines surf schools, beach access and hire-friendly logistics better than most Devon beach towns.",
      "Use this page to compare verified hire options and understand whether you are booking from a surf school, a hire desk or a surf shop."
    ]
  },
  {
    slug: "saunton",
    name: "Saunton",
    pageTitle: "Surf Hire in Saunton",
    label: "Saunton surf hire",
    regionSlug: "north-devon",
    guidePath: "/guides/surfing-saunton-sands/",
    image: "/guides/Saunton/Saunton%20from%20beach.jpg",
    metaDescription: "Compare verified surf hire serving Saunton Sands, including board and wetsuit options collected from nearby Croyde.",
    intro: [
      "Surfbooker's verified hire option serving Saunton is collected from nearby Croyde rather than from a permanent Saunton beach-hire base.",
      "Check the collection point and transport arrangements before travelling; free soft roof racks are available from the listed provider."
    ]
  },
  {
    slug: "woolacombe",
    name: "Woolacombe",
    pageTitle: "Surf Hire in Woolacombe",
    label: "Woolacombe surf hire",
    regionSlug: "north-devon",
    guidePath: "/guides/surfing-woolacombe/",
    image: "/guides/Woolacombe/ariel%20whole%20beach.avif",
    metaDescription: "Compare surf hire in Woolacombe, Devon. Review pickup locations, equipment types and practical beach access notes.",
    intro: [
      "Woolacombe has enough surf traffic that where you collect your kit can change how easy the day feels.",
      "Use this page to compare beachside and village-side hire options rather than assuming every provider works the same way."
    ]
  },
  {
    slug: "croyde",
    name: "Croyde",
    pageTitle: "Surf Hire in Croyde",
    label: "Croyde surf hire",
    regionSlug: "north-devon",
    guidePath: "/guides/surfing-croyde-bay/",
    image: "/guides/Croyde/Croyde%20water%20and%20sand%203.jpg",
    metaDescription: "Compare surf hire in Croyde Bay, Devon. Check board and wetsuit options, collection context and key practical details before you hire.",
    intro: [
      "Croyde is one of the easiest places to assume hire will be simple when conditions, crowds and parking can make it less straightforward than expected.",
      "Use this page to compare Croyde hire providers by equipment, pricing model and pickup context."
    ]
  },
  {
    slug: "putsborough",
    name: "Putsborough",
    pageTitle: "Surf Hire in Putsborough",
    label: "Putsborough surf hire",
    regionSlug: "north-devon",
    guidePath: "/guides/surfing-putsborough/",
    image: "/guides/Putsborough/beach%20wide%20shot%20main.jpeg",
    metaDescription: "Compare surf hire in Putsborough, Devon. Review on-site board and wetsuit options, provider notes and practical access details.",
    intro: [
      "Putsborough surf hire is useful when you want to stay at the quieter end of the bay rather than detouring into Woolacombe or Croyde first.",
      "Use this page to compare on-site providers and check what is actually available before you drive down."
    ]
  },
  {
    slug: "bigbury-on-sea",
    name: "Bigbury-on-Sea",
    pageTitle: "Surf Hire in Bigbury-on-Sea",
    label: "Bigbury-on-Sea surf hire",
    regionSlug: "south-devon",
    guidePath: "/guides/surfing-bigbury-on-sea/",
    image: "/guides/Bigbury-on-sea/zoomed%20out%20view.jpeg",
    metaDescription: "Compare surf hire in Bigbury-on-Sea, Devon. Check surfboard, wetsuit, bodyboard, SUP and kayak options with practical collection notes.",
    intro: [
      "Bigbury-on-Sea is one of South Devon's most practical surf-hire bases because the collection point is tied closely to the main beach parking and lower beach area.",
      "Use this page to compare what can actually be hired here and what requires suitable weather or advance contact."
    ]
  },
  {
    slug: "bantham",
    name: "Bantham",
    pageTitle: "Surf Hire in Bantham",
    label: "Bantham surf hire",
    regionSlug: "south-devon",
    guidePath: "/guides/surfing-bantham/",
    image: "/guides/Bantham/beach%20too.jpeg",
    metaDescription: "Compare surf hire in Bantham, Devon. Check current provider details, beach car park collection notes and equipment availability.",
    intro: [
      "Bantham can be one of the best surf days in South Devon, but the logistics are different from a beach-town hire setup.",
      "Use this page to check who is actually operating on the beach and what hire structure is clearly published."
    ]
  },
  {
    slug: "fistral",
    name: "Fistral Beach",
    pageTitle: "Surf Hire at Fistral Beach",
    label: "Fistral Beach surf hire",
    regionSlug: "cornwall",
    guidePath: "/guides/surfing-fistral-beach/",
    image: "/guides/_licensed-images/cornwall/fistral-beach.jpg",
    metaDescription: "Compare verified surf hire at Fistral Beach, Newquay, including boards, wetsuits, bodyboards, SUPs and practical collection details.",
    intro: [
      "Fistral has a dedicated year-round hire base directly on the beach, with equipment for beginners through to experienced surfers.",
      "Use the provider details below to compare board type, hire period and whether you need to reserve before travelling."
    ]
  },
  {
    slug: "polzeath",
    name: "Polzeath",
    pageTitle: "Surf Hire in Polzeath",
    label: "Polzeath surf hire",
    regionSlug: "cornwall",
    guidePath: "/guides/surfing-polzeath/",
    image: "/guides/_licensed-images/cornwall/polzeath.jpg",
    metaDescription: "Compare verified surf hire in Polzeath, Cornwall, with on-beach boards, wetsuits, bodyboards and cold-water accessories.",
    intro: [
      "Polzeath has on-beach hire for foam and hard surfboards, wetsuits, bodyboards and cold-water accessories.",
      "The verified provider states that standard beach hire is available without advance booking, subject to stock and conditions."
    ]
  },
  {
    slug: "watergate-bay",
    name: "Watergate Bay",
    pageTitle: "Surf Hire at Watergate Bay",
    label: "Watergate Bay surf hire",
    regionSlug: "cornwall",
    guidePath: "/guides/surfing-watergate-bay/",
    image: "/guides/_licensed-images/cornwall/watergate-bay.jpg",
    metaDescription: "Compare verified surf hire at Watergate Bay, Cornwall, including surfboards, wetsuits, bodyboards and beach facilities.",
    intro: [
      "Watergate Bay has a verified on-beach Wavehunters hire base offering the same core surf equipment as its Polzeath operation.",
      "Check the current conditions and stock with the beach team before choosing a board for the session."
    ]
  },
  {
    slug: "perranporth",
    name: "Perranporth",
    pageTitle: "Surf Hire in Perranporth",
    label: "Perranporth surf hire",
    regionSlug: "cornwall",
    guidePath: "/guides/surfing-perranporth/",
    image: "/guides/_licensed-images/cornwall/perranporth.jpg",
    metaDescription: "Compare verified surf hire in Perranporth, Cornwall, including softboards, hardboards, bodyboards, wetsuits and storage.",
    intro: [
      "Perranporth's verified hire base sits beside the main beach car park and offers boards for different ability levels plus wetsuits and bodyboards.",
      "Walk-ins are published as available in season, although booking ahead is sensible during busy summer periods."
    ]
  },
  {
    slug: "gwithian-godrevy",
    name: "Gwithian & Godrevy",
    pageTitle: "Surf Hire at Gwithian & Godrevy",
    label: "Gwithian surf hire",
    regionSlug: "cornwall",
    guidePath: "/guides/surfing-gwithian-godrevy/",
    image: "/guides/_licensed-images/cornwall/gwithian-godrevy.jpg",
    metaDescription: "Compare verified surf hire at Gwithian and Godrevy, including surfboards, wetsuits, bodyboards, SUPs and kayaks.",
    intro: [
      "Global Boarders runs a seasonal hire centre at the Sunset Surf Cafe base in Gwithian Towans.",
      "Its published range covers surfboards, wetsuits and bodyboards as well as paddleboards and kayaks."
    ]
  },
  {
    slug: "praa-sands",
    name: "Praa Sands",
    pageTitle: "Surf Hire at Praa Sands",
    label: "Praa Sands surf hire",
    regionSlug: "cornwall",
    guidePath: "/guides/surfing-praa-sands/",
    image: "/guides/_licensed-images/cornwall/praa-sands.jpg",
    metaDescription: "Compare verified surf hire at Praa Sands, Cornwall, with pre-booked boards, wetsuits, bodyboards, SUPs and kayaks.",
    intro: [
      "Global Boarders offers hire from its Praa Sands beach base, with the same published equipment menu as Gwithian.",
      "The provider specifically asks customers to pre-book Praa Sands hire because local surf conditions vary."
    ]
  },
  {
    slug: "porthmeor",
    name: "Porthmeor Beach",
    pageTitle: "Surf Hire at Porthmeor Beach",
    label: "Porthmeor surf hire",
    regionSlug: "cornwall",
    guidePath: "/guides/surfing-porthmeor-beach/",
    image: "/guides/_licensed-images/cornwall/porthmeor-beach.jpg",
    metaDescription: "Compare verified surf hire at Porthmeor Beach, St Ives, including softboards, hardboards, wetsuits and bodyboards.",
    intro: [
      "St Ives Surf School's Porthmeor base carries surfboards, wetsuits and bodyboards close to the water.",
      "Long-term reservations are available for three days or more, while the provider recommends mornings for the broadest walk-in choice."
    ]
  }
];

const hireLocationSlugs = new Set(hireLocations.map((location) => location.slug));
for (const area of accommodationAreas) {
  const destinationGuidePath = area.guidePath || (existsSync(join(rootDir, "guides", `surfing-${area.slug}`, "index.html")) ? `/guides/surfing-${area.slug}/` : "");
  if (!destinationGuidePath || hireLocationSlugs.has(area.slug)) continue;
  hireLocations.push({
    slug: area.slug,
    name: area.name,
    pageTitle: `Surf Equipment Hire Near ${area.name}`,
    label: `${area.name} surf hire`,
    regionSlug: area.regionSlug,
    guidePath: destinationGuidePath,
    image: area.image,
    metaDescription: `Find surfboard and wetsuit hire near ${area.name}. Check verified Surfbooker provider listings and practical equipment advice before travelling.`,
    intro: [
      `Use this page to find verified surfboard and wetsuit hire serving ${area.name}.`,
      `No provider is shown unless Surfbooker has enough trustworthy information to publish it; check availability directly before travelling.`
    ],
    coveragePending: true
  });
  hireLocationSlugs.add(area.slug);
}

// Canonical surf-hire inventory. This is the only collection used by the page
// renderers; every entry below was checked against the provider's official site.
const hireProviders = [
  {
    slug: "ho-surf",
    linkedSchoolSlug: "ho-surf",
    name: "Ho! Surf / SurfSUP Academy",
    locationSlug: "westward-ho",
    shopPlaceSlug: "westward-ho",
    regionSlug: "north-devon",
    providerPath: "/surf-hire/providers/ho-surf/",
    website: "https://www.surfandkiteshop.co.uk/surf-hire",
    image: "/images/ho-surf.webp",
    imageAlt: "Ho! Surf shopfront overlooking Westward Ho! Beach",
    equipment: ["Surfboards", "Wetsuits", "Bodyboards", "SUPs"],
    pricingSummary: "Contact the provider for current prices",
    hirePriceGroups: [{
      summary: "Surfboards from \u00A312 for 2 hours",
      rows: [
        { item: "Surfboard", price: "\u00A312 for 2 hours, \u00A315 for 4 hours, \u00A325 for 1 day, \u00A350 for 3 days, \u00A375 for 1 week" },
        { item: "Bodyboard", price: "\u00A35 for 2 hours, \u00A37 for 4 hours, \u00A310 for 1 day, \u00A315 for 3 days, \u00A320 for 1 week" },
        { item: "Stand-up paddleboard and paddle", price: "\u00A320 for 2 hours, \u00A330 for 4 hours; not available for 1-day, 3-day or 1-week hire" },
        { item: "Wetsuit \u2014 men\u2019s, ladies\u2019 and youth", price: "\u00A310 for 2 hours, \u00A312 for 4 hours, \u00A315 for 1 day, \u00A330 for 3 days, \u00A345 for 1 week" },
        { item: "Boots, gloves or hood", price: "\u00A33 each for 2 hours, \u00A34 each for 4 hours, \u00A35 each for 1 day, \u00A310 each for 3 days, \u00A315 each for 1 week" },
        { item: "Wooden bellyboard", price: "\u00A35 for 2 hours, \u00A37 for 4 hours, \u00A310 for 1 day, \u00A315 for 3 days, \u00A325 for 1 week" }
      ]
    }],
    intro: "Westward Ho! surf-school and shop operation with a dedicated equipment-hire service.",
    practicalNotes: [
      "Small groups can normally walk in; groups of more than ten should arrange hire in advance.",
      "Availability can change with tides, conditions and lifeguard restrictions."
    ],
    sources: [{ label: "Official surf-hire page", href: "https://www.surfandkiteshop.co.uk/surf-hire", checked: "2026-08-18" }]
  },
  {
    slug: "north-devon-surf-school",
    linkedSchoolSlug: "north-devon-surf-school",
    name: "North Devon Surf School",
    locationSlug: "westward-ho",
    regionSlug: "north-devon",
    providerPath: "/surf-hire/providers/north-devon-surf-school/",
    website: "https://northdevonsurfschool.co.uk/surf-hire/",
    equipment: ["Surfboards", "Wetsuits", "Bodyboards", "Boots", "Gloves", "Hoods"],
    pricingSummary: "Board and wetsuit from \u00A325 for two hours",
    hirePriceGroups: [{
      summary: "Surfboards from \u00A320 for 2 hours",
      rows: [
        { item: "Surfboard", price: "\u00A320 for 2 hours, then \u00A33 per additional hour" },
        { item: "Surfboard and wetsuit", price: "\u00A330 for 2 hours, then \u00A35 per additional hour" },
        { item: "Wetsuit", price: "\u00A315 for 2 hours, then \u00A32 per additional hour" },
        { item: "Bodyboard", price: "\u00A310 for 2 hours, then \u00A32 per additional hour" },
        { item: "Boots, gloves and hoods", price: "\u00A35 per item" }
      ]
    }],
    intro: "Established Westward Ho! surf school with board, wetsuit, bodyboard and cold-water accessory hire.",
    practicalNotes: [
      "Published rates include two-hour board, wetsuit and bodyboard options.",
      "The official page publishes damage, loss and late-return terms; check them before collection."
    ],
    sources: [{ label: "Official surf-hire page", href: "https://northdevonsurfschool.co.uk/surf-hire/", checked: "2026-08-18" }]
  },
  {
    slug: "westward-waves-surf-school",
    linkedSchoolSlug: "westward-waves-surf-school",
    name: "Westward Waves Surf School",
    locationSlug: "westward-ho",
    regionSlug: "north-devon",
    providerPath: "/surf-hire/providers/westward-waves-surf-school/",
    website: "https://www.westwardwavessurfschool.co.uk/hire",
    equipment: ["Surfboards", "Bodyboards", "Wetsuits", "Boots", "Gloves", "Hoods", "SUPs", "Roof racks"],
    pricingSummary: "Surfboards from \u00A312 for two hours; wetsuits from \u00A310",
    hirePriceGroups: [{
      summary: "Surfboards from \u00A312 for 2 hours",
      rows: [
        { item: "Surfboard or bodyboard", price: "\u00A312 for 2 hours, \u00A315 for 4 hours, \u00A325 for 1 day, \u00A350 for 3 days, \u00A375 for 1 week" },
        { item: "Wetsuit", price: "\u00A310 for 2 hours, \u00A312 for 4 hours, \u00A315 for 1 day, \u00A330 for 3 days, \u00A345 for 1 week" },
        { item: "Boots, gloves and hoods", price: "from \u00A33 per item" },
        { item: "Paddleboard", price: "Contact Westward Waves for current paddleboard hire prices and availability." }
      ]
    }],
    intro: "Westward Ho! provider offering core surf kit, cold-water accessories, SUPs and soft roof racks.",
    practicalNotes: [
      "Some equipment is available at the beach, with the full range published at the Livit Adventures base in Abbotsham.",
      "SUP hire is condition-dependent and currently priced by direct enquiry."
    ],
    sources: [{ label: "Official hire page", href: "https://www.westwardwavessurfschool.co.uk/hire", checked: "2026-08-18" }]
  },
  {
    slug: "woolacombe-surf-centre",
    linkedSchoolSlug: "woolacombe-surf-centre",
    name: "Woolacombe Surf Centre",
    locationSlug: "woolacombe",
    regionSlug: "north-devon",
    providerPath: "/surf-hire/providers/woolacombe-surf-centre/",
    website: "https://www.woolacombesurfcentre.com/hire/",
    equipment: ["Soft surfboards", "Hard surfboards", "Wetsuits", "Bodyboards", "SUPs"],
    pricingSummary: "Surfboards from \u00A315 for three hours; wetsuits from \u00A310",
    hirePriceGroups: [{
      summary: "Surfboards from \u00A315 for 3 hours",
      rows: [
        { item: "Surfboard", price: "\u00A315 for 3 hours, \u00A320 for 6 hours, \u00A325 for 24 hours" },
        { item: "Bodyboard", price: "\u00A310 for 3 hours, \u00A315 for 6 hours, \u00A320 for 24 hours" },
        { item: "SUP", price: "\u00A330 for 3 hours, \u00A355 for 6 hours" },
        { item: "Wetsuit", price: "\u00A310 for 3 hours, \u00A315 for 6 hours, \u00A320 for 24 hours" },
        { item: "Boots, gloves or hood", price: "\u00A33 for 3 hours, \u00A35 for 6 hours, \u00A310 for 24 hours" }
      ]
    }],
    intro: "Village-side Woolacombe surf centre with surfboard, wetsuit, bodyboard and SUP hire.",
    practicalNotes: [
      "The official site publishes short, day and multi-day hire periods.",
      "Customers can call, visit the centre or use the provider's online booking route."
    ],
    sources: [{ label: "Official hire page", href: "https://www.woolacombesurfcentre.com/hire/", checked: "2026-08-18" }]
  },
  {
    slug: "surfing-woolacombe",
    linkedSchoolSlug: "surfing-woolacombe",
    name: "Surfing Woolacombe",
    locationSlug: "woolacombe",
    regionSlug: "north-devon",
    providerPath: "/surf-hire/providers/surfing-woolacombe/",
    website: "https://www.surfingwoolacombe.co.uk/surf-hire",
    equipment: ["Surfboards", "Wetsuits", "Bodyboards", "SUPs"],
    pricingSummary: "Board and wetsuit from \u00A318 for two hours",
    hirePriceGroups: [{
      summary: "Surfboards from \u00A312 for 2 hours",
      rows: [
        { item: "Surfboard", price: "\u00A312 for 2 hours, \u00A316 for 4 hours, \u00A318 for 6 hours, \u00A320 for 1 day, \u00A332 for 2 days, then \u00A312 per extra day" },
        { item: "Wetsuit", price: "\u00A310 for 2 hours, \u00A316 for 4 hours, \u00A318 for 6 hours, \u00A320 for 1 day, \u00A332 for 2 days, then \u00A310 per extra day" },
        { item: "Bodyboard", price: "\u00A310 for 2 hours, \u00A312 for 4 hours, \u00A314 for 6 hours, \u00A318 for 1 day, \u00A324 for 2 days, then \u00A312 per extra day" },
        { item: "Bodyboard and wetsuit", price: "\u00A314 for 2 hours, \u00A316 for 4 hours, \u00A320 for 6 hours, \u00A324 for 1 day, \u00A334 for 2 days, then \u00A318 per extra day" },
        { item: "Surfboard and wetsuit", price: "\u00A318 for 2 hours, \u00A322 for 4 hours, \u00A324 for 6 hours, \u00A326 for 1 day, \u00A344 for 2 days, then \u00A318 per extra day" },
        { item: "SUP", price: "\u00A325 for 1 hour, \u00A335 for 2 hours, \u00A345 for 3 hours, \u00A350 for 4 hours, \u00A355 for 6 hours, \u00A360 for 8 hours, then \u00A350 per extra day" }
      ]
    }],
    intro: "Beach-slipway provider with surfboard, wetsuit, bodyboard and SUP hire close to the sand.",
    practicalNotes: [
      "The slipway base reduces the distance equipment needs to be carried.",
      "Check current stock directly during busy periods."
    ],
    sources: [{ label: "Official surf-hire page", href: "https://www.surfingwoolacombe.co.uk/surf-hire", checked: "2026-08-18" }]
  },
  {
    slug: "surfing-croyde-bay",
    linkedSchoolSlug: "surfing-croyde-bay",
    name: "Surfing Croyde Bay",
    locationSlug: "croyde",
    regionSlug: "north-devon",
    providerPath: "/surf-hire/providers/surfing-croyde-bay/",
    website: "https://surfingcroydebay.co.uk/surfboard-and-wetsuit-hire/",
    equipment: ["Surfboards", "Wetsuits", "Bodyboards", "Boots", "Gloves", "Hoods"],
    pricingSummary: "Surfboards from \u00A318 for four hours; wetsuits from \u00A312",
    hirePriceGroups: [{
      summary: "Surfboards from \u00A318 for 4 hours",
      rows: [
        { item: "Surfboard", price: "\u00A318 for 4 hours, \u00A330 per day, \u00A390 per week" },
        { item: "Wetsuit", price: "\u00A312 for 4 hours, \u00A320 per day, \u00A380 per week" },
        { item: "Bodyboard", price: "\u00A310 for 4 hours, \u00A315 per day, \u00A355 per week" }
      ]
    }],
    intro: "Croyde provider offering half-day, full-day and multi-day surf equipment hire.",
    practicalNotes: [
      "The base advertises hot showers and changing facilities for customers.",
      "Cold-water accessories are available alongside boards, wetsuits and bodyboards."
    ],
    sources: [{ label: "Official hire page", href: "https://surfingcroydebay.co.uk/surfboard-and-wetsuit-hire/", checked: "2026-08-18" }]
  },
  {
    slug: "croyde-surf-hire",
    hireOnly: true,
    name: "Croyde Surf Hire",
    locationSlug: "croyde",
    extraLocationSlugs: ["saunton", "putsborough"],
    regionSlug: "north-devon",
    providerPath: "/surf-hire/providers/croyde-surf-hire/",
    website: "https://www.croyde-surf-hire.co.uk/surf-hire/",
    image: "/guides/Croyde/Croyde%20water%20and%20sand%203.jpg",
    equipment: ["Soft surfboards", "Hard surfboards", "Longboards", "Wetsuits", "Bodyboards", "Boots", "Gloves", "Hoods", "Roof racks"],
    pricingSummary: "Contact the provider for current prices",
    hirePriceGroups: [{
      summary: "Surfboards from \u00A320 per day",
      rows: [
        { item: "Softboard", price: "\u00A320 per day" },
        { item: "Torq hardboard", price: "\u00A330 per day" },
        { item: "Wetsuit", price: "\u00A315 per day" },
        { item: "Softboard and wetsuit", price: "\u00A330 per day" },
        { item: "Torq hardboard and wetsuit", price: "\u00A335 per day" },
        { item: "Bodyboard and wetsuit", price: "\u00A325 per day" }
      ]
    }],
    intro: "Dedicated Croyde shop and hire business serving Croyde, Saunton and Putsborough.",
    practicalNotes: [
      "The provider advertises no deposit and free fitting of soft roof racks.",
      "Pre-booking is advised at busy times, and late returns may incur a fee."
    ],
    sources: [
      { label: "Official surf-hire page", href: "https://www.croyde-surf-hire.co.uk/surf-hire/", checked: "2026-08-18" },
      { label: "Official location page", href: "https://www.croyde-surf-hire.co.uk/location-croyde-surf-shop/", checked: "2026-08-18" },
      { label: "Official Putsborough information", href: "https://www.croyde-surf-hire.co.uk/croyde-surf-hire-putsborough-beach/", checked: "2026-08-18" }
    ]
  },
  {
    slug: "walking-on-waves",
    linkedSchoolSlug: "walking-on-waves",
    name: "Walking on Waves",
    locationSlug: "croyde",
    regionSlug: "north-devon",
    providerPath: "/surf-hire/providers/walking-on-waves/",
    website: "https://walking-on-waves.com/croyde-surf-hire/",
    equipment: ["Surfboards", "Wetsuits"],
    pricingSummary: "Contact the provider for current prices",
    hirePriceGroups: [{
      summary: "Contact Walking on Waves for current surf hire prices and availability.",
      services: ["Surfboards", "Wetsuits"]
    }],
    intro: "Dedicated Croyde surf-hire and beach-shop service for surfers with previous experience in the water.",
    practicalNotes: [
      "Hire operates at Croyde Bay; Walking on Waves surf lessons operate at Saunton Sands.",
      "The provider advertises free on-site parking and easy beach access at its Croyde hire shop."
    ],
    sources: [{ label: "Official Croyde surf-hire page", href: "https://walking-on-waves.com/croyde-surf-hire/", checked: "2026-08-18" }]
  },
  {
    slug: "nick-thorn-surf-coaching",
    linkedSchoolSlug: "nick-thorn-surf-coaching",
    name: "Nick Thorn Surf Coaching",
    locationSlug: "putsborough",
    regionSlug: "north-devon",
    providerPath: "/surf-hire/providers/nick-thorn-surf-coaching/",
    website: "https://nickthorn.com/surf-hire/",
    equipment: ["Surfboards", "Wetsuits", "Bodyboards", "SUPs", "Boots", "Gloves", "Hoods"],
    pricingSummary: "Surfboards from \u00A316 for two hours; board and wetsuit from \u00A322",
    hirePriceGroups: [{
      summary: "Surf hire from \u00A318",
      rows: [
        { item: "Surf-hire packages", price: "from \u00A318 to \u00A328, depending on kit and duration" },
        { item: "Duration options", price: "2 hours to 1 day" }
      ]
    }],
    intro: "Putsborough-based school and coaching operation with on-site surf equipment hire.",
    practicalNotes: [
      "Collection is published at the Putsborough beach car park.",
      "The official hire page lists board, bodyboard, wetsuit, SUP and accessory rates."
    ],
    sources: [{ label: "Official surf-hire page", href: "https://nickthorn.com/surf-hire/", checked: "2026-08-18" }]
  },
  {
    slug: "barefoot-surf-school",
    linkedSchoolSlug: "barefoot-surf-school",
    name: "Barefoot Surf School",
    locationSlug: "putsborough",
    regionSlug: "north-devon",
    providerPath: "/surf-hire/providers/barefoot-surf-school/",
    website: "https://www.barefootsurf.com/surf%20hire.html",
    equipment: ["Surfboards", "Wetsuits", "SUPs", "Sandboards"],
    pricingSummary: "Published 24-hour and weekly rates; eligibility restriction applies",
    hirePriceGroups: [{
      summary: "Surfboards from \u00A320 per day",
      rows: [
        { item: "Wetsuit", price: "\u00A310 for 24 hours, \u00A350 for 7 days" },
        { item: "Boots, gloves or hood", price: "\u00A34 per item for 24 hours, \u00A320 for 7 days" },
        { item: "Beginner soft surfboard", price: "\u00A320 for 24 hours, \u00A3100 for 7 days" },
        { item: "Intermediate semi-soft surfboard", price: "\u00A320 for 24 hours, \u00A3100 for 7 days" },
        { item: "Fibreglass shortboard or minimal", price: "\u00A325 for 24 hours, \u00A3140 for 7 days" },
        { item: "Fibreglass longboard or mal", price: "\u00A325 for 24 hours, \u00A3140 for 7 days" },
        { item: "SUP with paddle", price: "\u00A335 for 24 hours, \u00A3175 for 7 days" },
        { item: "Surf mat", price: "\u00A310 for 24 hours, \u00A350 for 7 days" },
        { item: "Pod body-surfing tool", price: "\u00A35 for 24 hours, \u00A325 for 7 days" }
      ]
    }],
    intro: "Putsborough school offering equipment hire to eligible previous lesson customers.",
    practicalNotes: [
      "Hire is only offered to customers who have completed a beginner lesson with Barefoot Surf School.",
      "The official page publishes 24-hour and seven-day hire options."
    ],
    sources: [{ label: "Official surf-hire page", href: "https://www.barefootsurf.com/surf%20hire.html", checked: "2026-08-18" }]
  },
  {
    slug: "discovery-surf-school",
    linkedSchoolSlug: "discovery-surf-school",
    name: "Discovery Surf School",
    locationSlug: "bigbury-on-sea",
    extraLocationSlugs: ["bantham"],
    regionSlug: "south-devon",
    providerPath: "/surf-hire/providers/discovery-surf-school/",
    website: "https://discoverysurf.com/pages/hire",
    equipment: ["Surfboards", "Wetsuits", "Bodyboards", "SUPs", "Kayaks", "XL SUPs", "Cold-water accessories"],
    pricingSummary: "Surfboard day hire \u00A326; wetsuit day hire \u00A316; bodyboard day hire \u00A311",
    hirePriceGroups: [{
      summary: "Surfboards from \u00A317 for one hour",
      rows: [
        { item: "Surfboard", price: "\u00A317 for 1 hour, \u00A320 for 2 hours, \u00A323 for 3 hours, \u00A326 per day, \u00A379 per week" },
        { item: "Wetsuit", price: "\u00A39 for 1 hour, \u00A311 for 2 hours, \u00A312 for 3 hours, \u00A316 per day, \u00A345 per week" },
        { item: "Shorty wetsuit", price: "\u00A35 per day" },
        { item: "Boots", price: "\u00A35 per day" },
        { item: "Gloves", price: "\u00A34 per day" },
        { item: "Hood", price: "\u00A34 per day" },
        { item: "Bodyboard", price: "\u00A38 for 1 hour, \u00A39 for 2 hours, \u00A310 for 3 hours, \u00A311 per day, \u00A335 per week" },
        { item: "SUP", price: "\u00A324 for 1 hour, \u00A330 for 2 hours, \u00A335 for 3 hours, \u00A349 per day" },
        { item: "Single kayak", price: "\u00A329 for 1 hour, \u00A335 for 2 hours, \u00A342 for 3 hours, \u00A355 per day" },
        { item: "Double kayak", price: "\u00A339 for 1 hour, \u00A345 for 2 hours, \u00A355 for 3 hours, \u00A368 per day" },
        { item: "XL Mega SUP", price: "\u00A380 per hour" }
      ]
    }],
    intro: "South Devon surf school with equipment hire serving Bigbury-on-Sea and Bantham.",
    practicalNotes: [
      "Bigbury collection is at the lower beach car park; Bantham operates from the beach car park.",
      "Photo ID is preferred as a deposit and some activities are condition-dependent."
    ],
    sources: [
      { label: "Official hire page", href: "https://discoverysurf.com/pages/hire", checked: "2026-08-18" },
      { label: "Official surfboard-hire page", href: "https://discoverysurf.com/pages/surfboard-hire", checked: "2026-08-18" },
      { label: "Official FAQ", href: "https://discoverysurf.com/pages/faq", checked: "2026-08-18" },
      { label: "Official Bigbury shop page", href: "https://discoverysurf.com/pages/bigbury-shop", checked: "2026-08-18" }
    ]
  },
  {
    slug: "fistral-beach-surf-school",
    linkedSchoolSlug: "fistral-beach-surf-school",
    name: "Fistral Beach Surf School & Hire",
    locationSlug: "fistral",
    regionSlug: "cornwall",
    providerPath: "/surf-hire/providers/fistral-beach-surf-school/",
    website: "https://www.fistralbeachsurfschool.co.uk/surf-hire/",
    equipment: ["Beginner surfboards", "Performance surfboards", "Wetsuits", "Bodyboards", "SUPs", "Boots", "Gloves", "Hoods"],
    pricingSummary: "Beginner surfboards from \u00A310 for one hour; wetsuits from \u00A312 per day",
    hirePriceGroups: [{
      summary: "Contact Fistral Beach Surf School & Hire for current surf hire prices and availability.",
      services: ["Wetsuits", "Bodyboards", "Beginner, improver, intermediate and advanced surfboards", "SUPs", "Beach equipment", "Multi-day surf hire"]
    }],
    intro: "Year-round on-beach Fistral hire base with equipment for beginners and experienced surfers.",
    practicalNotes: [
      "The provider advertises secure storage for belongings and multi-day hire.",
      "Its official prices page separates hire periods and equipment types."
    ],
    sources: [
      { label: "Official surf-hire page", href: "https://www.fistralbeachsurfschool.co.uk/surf-hire/", checked: "2026-08-18" },
      { label: "Official prices page", href: "https://www.fistralbeachsurfschool.co.uk/prices/", checked: "2026-08-18" }
    ]
  },
  {
    slug: "wavehunters",
    linkedSchoolSlug: "wavehunters",
    name: "Wavehunters",
    locationSlug: "polzeath",
    extraLocationSlugs: ["watergate-bay"],
    regionSlug: "cornwall",
    providerPath: "/surf-hire/providers/wavehunters/",
    website: "https://www.wavehunters.co.uk/surf-hire-cornwall/",
    equipment: ["Foam surfboards", "Hard surfboards", "Wetsuits", "Bodyboards", "Boots", "Gloves", "Hoods"],
    pricingSummary: "Foam surfboards from \u00A320 per day; wetsuits from \u00A315 per day",
    hirePriceGroups: [
      {
        title: "Polzeath",
        summary: "Surfboards from \u00A320 per day",
        rows: [
          { item: "Foam surfboard", price: "from \u00A320 per day" },
          { item: "Hard surfboard", price: "from \u00A325 per day" },
          { item: "Bodyboard", price: "from \u00A315 per day" },
          { item: "Wetsuit", price: "from \u00A315 per day" },
          { item: "Boots, gloves or surf hat", price: "from \u00A36 per day" }
        ]
      },
      {
        title: "Watergate Bay",
        summary: "Surfboards from \u00A320 per day",
        rows: [
          { item: "Foam surfboard", price: "from \u00A320 per day" },
          { item: "Hard surfboard", price: "from \u00A325 per day" },
          { item: "Bodyboard", price: "from \u00A315 per day" },
          { item: "Wetsuit", price: "from \u00A315 per day" },
          { item: "Boots, gloves or surf hat", price: "from \u00A36 per day" }
        ]
      }
    ],
    intro: "On-beach surf hire at Polzeath and Watergate Bay with softboards, hardboards and cold-water kit.",
    practicalNotes: [
      "The provider says standard beach hire is available without advance booking.",
      "Equipment remains subject to stock, sea conditions and the beach team's advice."
    ],
    sources: [
      { label: "Official Cornwall surf-hire page", href: "https://www.wavehunters.co.uk/surf-hire-cornwall/", checked: "2026-08-18" },
      { label: "Official locations page", href: "https://www.wavehunters.co.uk/locations/", checked: "2026-08-18" }
    ]
  },
  {
    slug: "stoked-surf-school",
    linkedSchoolSlug: "stoked-surf-school",
    name: "Stoked Surf School",
    locationSlug: "perranporth",
    regionSlug: "cornwall",
    providerPath: "/surf-hire/providers/stoked-surf-school/",
    website: "https://stokedsurfschool.co.uk/surf-hire/",
    equipment: ["Soft surfboards", "Intermediate surfboards", "Hard surfboards", "Bodyboards", "Wetsuits", "Boots", "Gloves", "Hoods"],
    pricingSummary: "Published hourly, daily and multi-day prices",
    hirePriceGroups: [{
      summary: "Softboards from \u00A315 per day",
      rows: [
        { item: "Softboard", price: "\u00A315 for 1 day, \u00A325 for 2 days, \u00A335 for 3 days, \u00A345 for 4 days, \u00A355 for 5 days, \u00A365 for 6 days, \u00A370 for 7 days, then \u00A310 per extra day" },
        { item: "Intermediate surfboard", price: "\u00A320 for 1 day, \u00A335 for 2 days, \u00A345 for 3 days, \u00A355 for 4 days, \u00A365 for 5 days, \u00A375 for 6 days, \u00A380 for 7 days, then \u00A310 per extra day" },
        { item: "Custom hardboard", price: "\u00A325 for 1 day, \u00A340 for 2 days, \u00A355 for 3 days, \u00A370 for 4 days, \u00A380 for 5 days, \u00A390 for 6 days, \u00A3100 for 7 days, then \u00A310 per extra day" },
        { item: "Bodyboard", price: "\u00A310 for 1 day, \u00A315 for 2 days, \u00A320 for 3 days, \u00A325 for 4 days, \u00A330 for 5 days, \u00A335 for 6 days, \u00A340 for 7 days, then \u00A35 per extra day" },
        { item: "Kids wetsuit", price: "\u00A35 for 1 day, \u00A310 for 2 days, \u00A315 for 3 days, \u00A320 for 4 days, \u00A323 for 5 days, \u00A325 for 6 days, \u00A328 for 7 days, then \u00A33 per extra day" },
        { item: "Boots or hood", price: "same pricing as kids wetsuit above" }
      ]
    }],
    intro: "Perranporth hire base beside the main beach car park with equipment for several ability levels.",
    practicalNotes: [
      "Changing and storage facilities are published as available.",
      "Seasonal walk-ins are accepted, but advance booking is advised during busy summer periods."
    ],
    sources: [{ label: "Official surf-hire page", href: "https://stokedsurfschool.co.uk/surf-hire/", checked: "2026-08-18" }]
  },
  {
    slug: "global-boarders",
    linkedSchoolSlug: "global-boarders",
    name: "Global Boarders",
    locationSlug: "gwithian-godrevy",
    extraLocationSlugs: ["praa-sands"],
    regionSlug: "cornwall",
    providerPath: "/surf-hire/providers/global-boarders/",
    website: "https://globalboarders.com/hire/",
    equipment: ["Surfboards", "Wetsuits", "Bodyboards", "SUPs", "Kayaks", "Mega SUPs", "Cold-water accessories"],
    pricingSummary: "Surfboards from \u00A320 per day; board and wetsuit from \u00A330",
    hirePriceGroups: [
      {
        title: "Gwithian",
        summary: "Surfboards from \u00A320 per day",
        rows: [
          { item: "Beginner or improver surfboard", price: "\u00A320 per day" },
          { item: "Surfboard and wetsuit", price: "\u00A330 per day" },
          { item: "Winter wetsuit", price: "\u00A315 per day" },
          { item: "Boots and gloves", price: "\u00A35 per day" },
          { item: "SUP", price: "\u00A330 per day" },
          { item: "Bodyboard with fins", price: "\u00A315 per day" },
          { item: "Mega SUP", price: "\u00A360 for 2 hours" },
          { item: "Kayak", price: "\u00A330 for 2 hours" },
          { item: "Two days", price: "10% discount" },
          { item: "Three or more days", price: "20% discount" }
        ]
      },
      {
        title: "Praa Sands",
        summary: "Surfboards from \u00A320 per day",
        rows: [
          { item: "Beginner or improver surfboard", price: "\u00A320 per day" },
          { item: "Surfboard and wetsuit", price: "\u00A330 per day" },
          { item: "Winter wetsuit", price: "\u00A315 per day" },
          { item: "Boots and gloves", price: "\u00A35 per day" },
          { item: "SUP", price: "\u00A330 per day" },
          { item: "Bodyboard with fins", price: "\u00A315 per day" },
          { item: "Mega SUP", price: "\u00A360 for 2 hours" },
          { item: "Kayak", price: "\u00A330 for 2 hours" },
          { item: "Two days", price: "10% discount" },
          { item: "Three or more days", price: "20% discount" }
        ],
        note: "Pre-booking is required for surf hire at Praa Sands."
      }
    ],
    intro: "Seasonal Gwithian hire centre and pre-booked Praa Sands service with surf and paddle equipment.",
    practicalNotes: [
      "The Gwithian base operates from Sunset Surf Cafe in Gwithian Towans.",
      "Praa Sands hire should be pre-booked because local conditions vary."
    ],
    sources: [
      { label: "Official hire page", href: "https://globalboarders.com/hire/", checked: "2026-08-18" },
      { label: "Official Gwithian hire page", href: "https://globalboarders.com/surf-hire-gwithian/", checked: "2026-08-18" }
    ]
  },
  {
    slug: "st-ives-surf-school",
    linkedSchoolSlug: "st-ives-surf-school",
    name: "St Ives Surf School",
    locationSlug: "porthmeor",
    regionSlug: "cornwall",
    providerPath: "/surf-hire/providers/st-ives-surf-school/",
    website: "https://www.stivessurfschool.co.uk/hire",
    equipment: ["Soft surfboards", "Hard surfboards", "Wetsuits", "Bodyboards"],
    pricingSummary: "Published hourly, daily and multi-day prices",
    hirePriceGroups: [
      {
        title: "Porthmeor",
        summary: "Softboards from \u00A314 for 2 hours",
        rows: [
          { item: "Wetsuit", price: "\u00A312 for 2 hours, \u00A314 for 4 hours, \u00A316 per day" },
          { item: "Softboard", price: "\u00A314 for 2 hours, \u00A318 for 4 hours, \u00A322 per day" },
          { item: "Hardboard", price: "\u00A316 for 2 hours, \u00A322 for 4 hours, \u00A326 per day" },
          { item: "Boots and gloves", price: "\u00A33 for 2 hours, \u00A35 for 4 hours, \u00A37 per day" },
          { item: "Bodyboard", price: "\u00A312 for 2 hours, \u00A314 for 4 hours, \u00A316 per day" },
          { item: "Deckchair or windbreak", price: "\u00A34 for 2 hours, \u00A36 for 4 hours, \u00A38 per day" }
        ]
      },
      {
        title: "Porthminster",
        summary: "SUPs from \u00A317 per hour",
        rows: [
          { item: "Paddleboard", price: "\u00A317 for 1 hour, \u00A328 for 2 hours" },
          { item: "Single kayak", price: "\u00A317 for 1 hour, \u00A328 for 2 hours" },
          { item: "Double kayak", price: "\u00A325 for 1 hour, \u00A340 for 2 hours" },
          { item: "Bodyboard", price: "\u00A38 for 1 hour, \u00A312 for 2 hours, \u00A314 for 4 hours, \u00A316 per day" },
          { item: "Wetsuit", price: "\u00A38 for 1 hour, \u00A312 for 2 hours, \u00A314 for 4 hours, \u00A316 per day" }
        ]
      }
    ],
    intro: "Porthmeor Beach hire base with surfboards, wetsuits and bodyboards close to the water.",
    practicalNotes: [
      "Photo ID is required and under-16s need parental consent.",
      "Reservations are available for hires of three days or more; mornings offer the broadest walk-in choice."
    ],
    sources: [{ label: "Official hire page", href: "https://www.stivessurfschool.co.uk/hire", checked: "2026-08-18" }]
  }
];

const surfShopRegions = [
  {
    slug: "devon",
    name: "Devon",
    label: "Surf shops",
    pageTitle: "Devon Surf Shops",
    intro: [
      "Start with the county view, then move into North Devon, South Devon or Cornwall for the regional shop pages.",
      "The surf-shop index keeps the browsing flow location first, then individual place pages second."
    ],
    metaDescription: "Compare Devon surf shops on Surfbooker, then move into North Devon, South Devon and Cornwall surf-shop pages.",
    placeSummary: "Choose a regional surf-shop page first, then compare the individual places underneath it.",
    childRegions: ["north-devon", "south-devon", "cornwall"]
  },
  {
    slug: "north-devon",
    name: "North Devon",
    label: "Surf shops",
    pageTitle: "North Devon Surf Shops",
    intro: [
      "North Devon is the area with the clearest current surf-shop coverage on Surfbooker.",
      "Use the place pages to compare shop-based surf businesses beach by beach before opening the individual business pages."
    ],
    metaDescription: "Compare North Devon surf shops across Westward Ho!, Saunton, Woolacombe, Croyde and Putsborough on Surfbooker.",
    placeSummary: "Compare the North Devon beach and village shop pages first, then open the business cards from each place.",
    childRegions: [],
    placeSlugs: ["westward-ho", "saunton", "woolacombe", "croyde", "putsborough"]
  },
  {
    slug: "south-devon",
    name: "South Devon",
    label: "Surf shops",
    pageTitle: "South Devon Surf Shops",
    intro: [
      "South Devon surf-shop coverage is narrower, so the place pages keep the small set of verified businesses easy to compare.",
      "At the moment the region is centred on Bigbury-on-Sea and Bantham."
    ],
    metaDescription: "Compare South Devon surf shops on Surfbooker with place pages for Bigbury-on-Sea and Bantham.",
    placeSummary: "Use the place pages to compare verified surf-shop businesses in South Devon.",
    childRegions: [],
    placeSlugs: ["bigbury-on-sea", "bantham"]
  },
  {
    slug: "cornwall",
    name: "Cornwall",
    label: "Surf shops",
    pageTitle: "Cornwall Surf Shops",
    intro: [
      "Cornwall is included as a surf-shop region so the structure is ready as more verified businesses are added.",
      "There are no verified Cornwall surf-shop businesses listed yet."
    ],
    metaDescription: "Browse Cornwall surf shops on Surfbooker when verified businesses are added.",
    placeSummary: "No verified Cornwall surf shops are currently listed.",
    childRegions: [],
    placeSlugs: []
  }
];

surfShopRegions.push(
  {
    slug: "wales", name: "Wales", label: "Surf shops", pageTitle: "Wales Surf Shops",
    intro: ["Explore surf-shop coverage across Gower, Pembrokeshire, Anglesey, Llŷn and the South Wales coast.", "Each destination page shows verified businesses where available and a clear empty state where research is still needed."],
    metaDescription: "Find surf shops around Wales's surf destinations on Surfbooker.", placeSummary: "Browse surf-shop destination pages across Wales.", childRegions: []
  },
  {
    slug: "scotland", name: "Scotland", label: "Surf shops", pageTitle: "Scotland Surf Shops",
    intro: ["Explore surf-shop coverage around Scotland's north, east, northeast, island and Atlantic coasts.", "Only researched shop businesses are shown as listings."],
    metaDescription: "Find surf shops around Scotland's surf destinations on Surfbooker.", placeSummary: "Browse surf-shop destination pages across Scotland.", childRegions: []
  },
  {
    slug: "northern-ireland", name: "Northern Ireland", label: "Surf shops", pageTitle: "Northern Ireland Surf Shops",
    intro: ["Explore surf-shop coverage around the Causeway Coast and north Antrim.", "Destination pages remain useful even where no verified business is currently listed."],
    metaDescription: "Find surf shops around Northern Ireland's north-coast destinations.", placeSummary: "Browse surf-shop destination pages across Northern Ireland.", childRegions: []
  },
  {
    slug: "northeast-england-yorkshire", name: "Northeast England & Yorkshire", label: "Surf shops", pageTitle: "Northeast England & Yorkshire Surf Shops",
    intro: ["Explore surf-shop coverage from Tynemouth and Northumberland to Teesside and Yorkshire.", "Open a destination page to see current verified listings."],
    metaDescription: "Find surf shops across northeast England and Yorkshire on Surfbooker.", placeSummary: "Browse surf-shop destination pages across northeast England and Yorkshire.", childRegions: []
  },
  {
    slug: "southern-england", name: "Southern England", label: "Surf shops", pageTitle: "Southern England Surf Shops",
    intro: ["Explore surf-shop coverage across Dorset, Sussex, Kent and the Isle of Wight.", "Only businesses supported by trustworthy information are published."],
    metaDescription: "Find surf shops around southern England's surf destinations.", placeSummary: "Browse surf-shop destination pages across southern England.", childRegions: []
  }
);

const surfShopPlaces = [
  {
    slug: "westward-ho",
    name: "Westward Ho!",
    regionSlug: "north-devon",
    pageTitle: "Westward Ho! Surf Shops",
    label: "Westward Ho! surf shops",
    intro: [
      "Westward Ho! currently carries the strongest surf-shop-style base on Surfbooker, because the main business mixes lessons, boards, wetsuits and hire from the same location.",
      "Use this page to open the individual business page and check the hire and lesson details together."
    ],
    metaDescription: "Compare surf shops in Westward Ho!, Devon, and open the individual business page for the verified shop-based provider.",
    businessSlugs: ["ho-surf"]
  },
  {
    slug: "saunton",
    name: "Saunton",
    regionSlug: "north-devon",
    pageTitle: "Saunton Surf Shops",
    label: "Saunton surf shops",
    intro: [
      "Saunton is included as a place page so the North Devon structure stays consistent.",
      "There are no verified shop-based surf businesses listed here yet."
    ],
    metaDescription: "Compare surf shops in Saunton, Devon, and check whether new verified businesses have been added.",
    businessSlugs: []
  },
  {
    slug: "woolacombe",
    name: "Woolacombe",
    regionSlug: "north-devon",
    pageTitle: "Woolacombe Surf Shops",
    label: "Woolacombe surf shops",
    intro: [
      "Woolacombe is listed as a place page so shop-based coverage can be expanded without changing the structure.",
      "No verified surf shops are currently listed for Woolacombe."
    ],
    metaDescription: "Compare surf shops in Woolacombe, Devon, and check whether new verified businesses have been added.",
    businessSlugs: []
  },
  {
    slug: "croyde",
    name: "Croyde",
    regionSlug: "north-devon",
    pageTitle: "Croyde Surf Shops",
    label: "Croyde surf shops",
    intro: [
      "Croyde is included as a place page to keep the North Devon browsing path consistent.",
      "There are no verified surf shops currently listed for Croyde."
    ],
    metaDescription: "Compare surf shops in Croyde Bay, Devon, and check whether new verified businesses have been added.",
    businessSlugs: []
  },
  {
    slug: "putsborough",
    name: "Putsborough",
    regionSlug: "north-devon",
    pageTitle: "Putsborough Surf Shops",
    label: "Putsborough surf shops",
    intro: [
      "Putsborough is included as a place page so the North Devon surf-shop path stays complete.",
      "No verified surf shops are currently listed for Putsborough."
    ],
    metaDescription: "Compare surf shops in Putsborough, Devon, and check whether new verified businesses have been added.",
    businessSlugs: []
  },
  {
    slug: "bigbury-on-sea",
    name: "Bigbury-on-Sea",
    regionSlug: "south-devon",
    pageTitle: "Bigbury-on-Sea Surf Shops",
    label: "Bigbury-on-Sea surf shops",
    intro: [
      "Bigbury-on-Sea is the South Devon place page that currently connects to the verified shop-style business on Surfbooker.",
      "Open the business page to compare lessons, hire and shop details together."
    ],
    metaDescription: "Compare surf shops in Bigbury-on-Sea, Devon, and open the individual business page for the verified provider.",
    businessSlugs: ["discovery-surf-school"]
  },
  {
    slug: "bantham",
    name: "Bantham",
    regionSlug: "south-devon",
    pageTitle: "Bantham Surf Shops",
    label: "Bantham surf shops",
    intro: [
      "Bantham is included to keep the South Devon place structure consistent.",
      "No verified surf shops are currently listed for Bantham."
    ],
    metaDescription: "Compare surf shops in Bantham, Devon, and check whether new verified businesses have been added.",
    businessSlugs: []
  }
];

const surfShopPlaceKeys = new Set(surfShopPlaces.map((place) => `${place.regionSlug}:${place.slug}`));
for (const area of accommodationAreas) {
  const destinationGuidePath = area.guidePath || (existsSync(join(rootDir, "guides", `surfing-${area.slug}`, "index.html")) ? `/guides/surfing-${area.slug}/` : "");
  const key = `${area.regionSlug}:${area.slug}`;
  if (!destinationGuidePath || surfShopPlaceKeys.has(key)) continue;
  surfShopPlaces.push({
    slug: area.slug,
    name: area.name,
    regionSlug: area.regionSlug,
    pageTitle: `Surf Shops Near ${area.name}`,
    label: `${area.name} surf shops`,
    intro: [
      `Use this page to find verified surf shops serving ${area.name}.`,
      `No business is listed unless Surfbooker has enough trustworthy information to publish it.`
    ],
    metaDescription: `Find surf shops near ${area.name}. Check verified Surfbooker business listings and use the local destination guide before travelling.`,
    guidePath: destinationGuidePath,
    businessSlugs: []
  });
  surfShopPlaceKeys.add(key);
}

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
              <option value="Accommodation partnership">Accommodation partnership</option>
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
        <p>Surfbooker currently collects the details you submit through the lesson enquiry form, contact form, list-your-surf-school form, accommodation listing form and claim or update form. That typically includes names, email addresses, preferred lesson dates, party details, property details and the message you choose to send.</p>
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
    title: "List your surf business | Surfbooker",
    description: "Ask Surfbooker to add or review a surf school, surf-hire business or related surf listing for Surfbooker.",
    h1: "List your surf business",
    label: "Providers",
    intro: "Use this page if your surf school, surf-hire business or related surf operation is not yet listed on Surfbooker.",
    body: `
      <section class="simple-card simple-copy">
        <p>Surfbooker now covers surf lessons, surf hire and beach guides. If you run a surf school, surf-hire business or related surf operation and want to appear in the production listing set, send the main service page, your location and the practical details you want checked.</p>
      </section>
      <section class="simple-card">
        <form class="provider-form" name="provider-listing" method="POST" action="/list-your-school/" data-netlify="true" netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="provider-listing">
          <p class="sr-only"><label>Do not fill this out if you're human: <input name="bot-field"></label></p>
          <label><span>Business name</span><input type="text" name="school" required></label>
          <label>
            <span>Business type</span>
            <select name="business_type" required>
              <option value="">Select a type</option>
              <option value="Surf school">Surf school</option>
              <option value="Surf hire">Surf hire</option>
              <option value="Surf shop">Surf shop</option>
              <option value="Mixed surf business">Mixed surf business</option>
            </select>
          </label>
          <label><span>Contact name</span><input type="text" name="contact_name" required></label>
          <label><span>Email</span><input type="email" name="email" required></label>
          <label><span>Website</span><input type="url" name="website"></label>
          <label><span>Beach or area</span><input type="text" name="area"></label>
          <label><span>Message</span><textarea name="message" rows="5" required></textarea></label>
          <button type="submit">Send provider request</button>
        </form>
      </section>
    `,
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "List your surf business", url: "/list-your-school/" }
    ]
  },
  {
    path: "list-your-school/index.html",
    title: "List or upgrade your surf school | Surfbooker",
    description: "Keep your Surfbooker surf school listing accurate or ask about a more detailed profile.",
    h1: "List or upgrade your surf school",
    label: "For surf schools",
    intro: "Keep your Surfbooker listing accurate and explore options for a more detailed profile.",
    body: `
      <section class="simple-card simple-copy">
        <h2>How we can help</h2>
        <ul class="simple-list">
          <li>Update your school details</li>
          <li>Correct lesson prices and availability information</li>
          <li>Add photos and useful local information</li>
          <li>Ask about a premium Surfbooker profile</li>
        </ul>
      </section>
      <section class="simple-card">
        <form class="provider-form" id="school-listing-enquiry-form" name="school-listing-enquiry" method="POST" action="/list-your-school/" data-netlify="true" netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="school-listing-enquiry">
          <p class="sr-only"><label>Do not fill this out if you're human: <input name="bot-field"></label></p>
          <label><span>Name</span><input type="text" name="name" autocomplete="name" required></label>
          <label><span>School name</span><input type="text" name="school_name" required></label>
          <label><span>Email address</span><input type="email" name="email" autocomplete="email" required></label>
          <label><span>Phone number <small>(optional)</small></span><input type="tel" name="phone" autocomplete="tel"></label>
          <label><span>Website <small>(optional)</small></span><input type="url" name="website" autocomplete="url"></label>
          <label><span>Message</span><textarea name="message" rows="6" required></textarea></label>
          <button type="submit">Send listing enquiry</button>
          <p class="form-status" id="school-listing-enquiry-status" aria-live="polite"></p>
        </form>
      </section>
      ${renderTrackingForm()}
      <script>
        (() => {
          const form = document.getElementById("school-listing-enquiry-form");
          const status = document.getElementById("school-listing-enquiry-status");
          const encode = (data) => Object.keys(data).map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join("&");
          const track = (eventType) => {
            const payload = encode({
              "form-name": "site-activity",
              event_type: eventType,
              event_target: "school-listing-enquiry",
              event_detail: "",
              page_url: window.location.pathname,
              timestamp: new Date().toISOString()
            });
            if (navigator.sendBeacon) navigator.sendBeacon("/", new Blob([payload], { type: "application/x-www-form-urlencoded" }));
            else fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: payload, keepalive: true }).catch(() => {});
          };
          track("listing_view");
          form.addEventListener("submit", async (event) => {
            event.preventDefault();
            status.textContent = "Sending your enquiry...";
            try {
              const response = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: encode(Object.fromEntries(new FormData(form).entries())) });
              if (!response.ok) throw new Error("Submission failed");
              status.textContent = "Thanks. Your listing enquiry has been received.";
              track("school_listing_enquiry");
              form.reset();
            } catch (error) {
              status.textContent = "Your enquiry could not be sent just now. Please try again or email hello@surfbooker.com.";
            }
          });
        })();
      </script>
    `,
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "List or upgrade your surf school", url: "/list-your-school/" }
    ]
  },
  {
    path: "claim-or-update-a-listing/index.html",
    title: "Claim or update a listing | Surfbooker",
    description: "Ask Surfbooker to claim, correct or update a surf school, surf-hire business or related listing.",
    h1: "Claim or update a listing",
    label: "Listing updates",
    intro: "Use this page to correct Surfbooker listing details, claim a business profile or send updated pricing and practical information.",
    body: `
      <section class="simple-card simple-copy">
        <p>Surfbooker independently lists providers, so the quickest way to correct a listing is to send the exact page, the information that needs changing and the source you want us to check.</p>
      </section>
      <section class="simple-card">
        <form class="provider-form" name="listing-update" method="POST" action="/claim-or-update-a-listing/" data-netlify="true" netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="listing-update">
          <p class="sr-only"><label>Do not fill this out if you're human: <input name="bot-field"></label></p>
          <label><span>Business name</span><input type="text" name="business_name" required></label>
          <label><span>Listing URL</span><input type="url" name="listing_url"></label>
          <label><span>Contact name</span><input type="text" name="contact_name" required></label>
          <label><span>Email</span><input type="email" name="email" required></label>
          <label><span>Website or source URL</span><input type="url" name="source_url"></label>
          <label><span>What needs updating?</span><textarea name="message" rows="6" required></textarea></label>
          <button type="submit">Send update request</button>
        </form>
      </section>
    `,
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Claim or update a listing", url: "/claim-or-update-a-listing/" }
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

if (surfHireOnly) {
  buildSurfHirePages();
} else if (schoolProfilesOnly) {
  buildSchoolProfilePages();
} else if (schoolListingOnly) {
  buildSchoolListingPage();
} else if (lessonLocationsOnly) {
  buildLessonLocationPages();
} else {
  build();
}

applyVisitorChrome(rootDir);

function buildSchoolListingPage() {
  const page = utilityPages.find((item) => item.path === "list-your-school/index.html");
  write(page.path, renderUtilityPage(page));
  write("sitemap.xml", renderSitemap());
}

function buildSchoolProfilePages() {
  const targetSchools = cornwallOnly ? schools.filter((school) => school.regionSlug === "cornwall") : schools;
  for (const school of targetSchools) {
    write(join("surf-schools", school.slug, "index.html"), renderSchoolProfilePage(school));
  }
}

function buildLessonLocationPages() {
  const targetLocations = cornwallOnly ? locations.filter((location) => location.regionSlug === "cornwall") : locations;
  for (const location of targetLocations) {
    write(join("surf-lessons", location.slug, "index.html"), renderLocationPage(location));
  }
}

function buildSurfHirePages() {
  validateHireData();
  write("surf-hire/index.html", renderSurfHireIndexPage());
  for (const region of hireRegions) {
    write(join("surf-hire", region.slug, "index.html"), renderHireRegionPage(region));
  }
  for (const location of hireLocations) {
    write(join("surf-hire", location.slug, "index.html"), renderHireLocationPage(location));
  }
  for (const provider of hireProviders) {
    write(join(provider.providerPath.replace(/^\//, "").replace(/\/$/, ""), "index.html"), renderHireProviderPage(provider));
  }
  write("sitemap.xml", renderSitemap());
}

function validateHireData() {
  const expectedRegions = ["devon", "north-devon", "south-devon", "cornwall", "wales", "scotland", "northern-ireland", "northeast-england-yorkshire", "southern-england"];
  const actualRegions = hireRegions.map((region) => region.slug);
  if (actualRegions.length !== expectedRegions.length || expectedRegions.some((slug) => !actualRegions.includes(slug))) {
    throw new Error(`Surf hire must expose exactly these four regions: ${expectedRegions.join(", ")}`);
  }

  for (const location of hireLocations) {
    if (!hireRegions.some((region) => region.slug === location.regionSlug)) {
      throw new Error(`Unknown hire region for ${location.slug}: ${location.regionSlug}`);
    }
    if (!location.coveragePending && !getHireProvidersForLocation(location.slug).length) {
      throw new Error(`Hire location has no verified provider: ${location.slug}`);
    }
  }

  const providerPaths = new Set();
  for (const provider of hireProviders) {
    if (!provider.equipment?.length || !provider.sources?.length) {
      throw new Error(`Hire provider is missing equipment or sources: ${provider.slug}`);
    }
    if (!provider.hirePriceGroups?.length) {
      throw new Error(`Hire provider is missing its pricing section data: ${provider.slug}`);
    }
    for (const group of provider.hirePriceGroups) {
      if (!group.summary || (!group.rows?.length && !group.services?.length)) {
        throw new Error(`Hire provider has an incomplete pricing group: ${provider.slug}`);
      }
      if (group.rows?.some((row) => !row.item || !row.price)) {
        throw new Error(`Hire provider has an incomplete pricing row: ${provider.slug}`);
      }
    }
    if (!hireLocations.some((location) => location.slug === provider.locationSlug)) {
      throw new Error(`Unknown primary hire location for ${provider.slug}: ${provider.locationSlug}`);
    }
    for (const slug of provider.extraLocationSlugs || []) {
      if (!hireLocations.some((location) => location.slug === slug)) {
        throw new Error(`Unknown extra hire location for ${provider.slug}: ${slug}`);
      }
    }
    if (provider.linkedSchoolSlug && !schools.some((school) => school.slug === provider.linkedSchoolSlug)) {
      throw new Error(`Unknown linked school for ${provider.slug}: ${provider.linkedSchoolSlug}`);
    }
    if (provider.hireOnly === Boolean(provider.linkedSchoolSlug)) {
      throw new Error(`Provider must be either hire-only or linked to one school: ${provider.slug}`);
    }
    if (/^\/surf-(?:schools|lessons)\//i.test(provider.providerPath)) {
      throw new Error(`Hire provider must not link to a school or lesson page: ${provider.slug}`);
    }
    if (!/^\/surf-hire\/providers\/[^/]+\/$/i.test(provider.providerPath)) {
      throw new Error(`Hire provider must link to an internal Surfbooker provider page: ${provider.slug}`);
    }
    if (providerPaths.has(provider.providerPath)) {
      throw new Error(`Duplicate hire provider path: ${provider.providerPath}`);
    }
    providerPaths.add(provider.providerPath);
  }
}

function build() {
  validateHireData();
  write("index.html", renderHomePage(), { preserveExisting: true });

  for (const page of utilityPages) {
    write(page.path, renderUtilityPage(page));
  }

  write("surf-lessons/index.html", renderSurfLessonsIndexPage());
  for (const region of lessonRegions) {
    write(join("surf-lessons", region.slug, "index.html"), renderLessonRegionPage(region));
  }

  write("guides/index.html", renderGuidesIndexPage(), { preserveExisting: !forceGuideBuild });

  for (const guide of guidePages) {
    // /guides/surfing-westward-ho/ is a 301 to /guides/westwardho!/ in _redirects; writing a file there would shadow it.
    if (guide.path === westwardHoGuidePath) continue;
    write(join("guides", guide.slug, "index.html"), renderGuidePage(guide), { preserveExisting: !forceGuideBuild });
  }

  for (const location of locations) {
    write(join("surf-lessons", location.slug, "index.html"), renderLocationPage(location));
  }

  for (const school of schools) {
    write(join("surf-schools", school.slug, "index.html"), renderSchoolProfilePage(school));
  }

  write("surf-hire/index.html", renderSurfHireIndexPage());
  for (const region of hireRegions) {
    write(join("surf-hire", region.slug, "index.html"), renderHireRegionPage(region));
  }
  for (const location of hireLocations) {
    write(join("surf-hire", location.slug, "index.html"), renderHireLocationPage(location));
  }
  for (const provider of hireProviders) {
    write(join(provider.providerPath.replace(/^\//, "").replace(/\/$/, ""), "index.html"), renderHireProviderPage(provider));
  }

  write("surf-shops/index.html", renderSurfShopsIndexPage());
  for (const region of surfShopRegions) {
    write(join("surf-shops", region.slug, "index.html"), renderSurfShopRegionPage(region));
  }
  for (const place of surfShopPlaces) {
    write(join("surf-shops", place.regionSlug, place.slug, "index.html"), renderSurfShopPlacePage(place));
  }

  buildAccommodationPages(rootDir);

  write("404.html", renderNotFoundPage());
  write("robots.txt", renderRobots());
  write("sitemap.xml", renderSitemap());
}

function renderHomePage() {
  const title = "Surfbooker | Surf Lessons, Surf Hire and Devon Beach Guides";
  const description = "Compare surf lessons, explore surf hire, browse Devon beach guides and plan practical surf days with Surfbooker.";
  const homeListings = schools.map(toListingData);
  const surfShops = [
    {
      name: "Surf shops",
      summary: "Browse Devon, North Devon, South Devon and Cornwall surf-shop pages, then open the individual place pages.",
      href: "/surf-shops/"
    }
  ];
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
        logo: `${baseUrl}/images/brand/logo-transparent-fbs.png`,
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
          <img src="/images/brand/logo-transparent-fbs.png" alt="Surfbooker" width="1774" height="887">
          <nav class="hero-logo-links" aria-label="Homepage links">
            <a href="/guides/">Beach guides</a>
            <a href="/surf-hire/">Surf hire</a>
            <a href="/contact/">Contact</a>
          </nav>
        </div>
        <div class="hero-intro">
          <div class="hero-copy">
            <h1 class="hero-title">Explore surf lessons, hire and beach guides by coast.</h1>
            <p class="hero-text">Use Surfbooker to compare providers, understand the beach and choose the right setup before you travel.</p>
            <div class="hero-actions">
              <a class="button button-primary" href="/surf-lessons/">Compare lessons</a>
              <a class="button button-secondary" href="/surf-hire/">Explore surf hire</a>
            </div>
          </div>
        </div>
      </section>

      <section class="coverage-section" id="surf-shops">
        <div class="section-heading">
          <p class="section-label">Surf shops</p>
          <h2>Local surf shops and shop-based bases.</h2>
        </div>
        <div class="coverage-grid">
          ${surfShops.map((shop) => `
            <a class="coverage-card" href="${shop.href}">
              <h3>${escapeHtml(shop.name)}</h3>
              <p>${escapeHtml(shop.summary)}</p>
            </a>
          `).join("")}
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
    const filters = {
      area: document.getElementById("filter-area"),
      format: document.getElementById("filter-format"),
      audience: document.getElementById("filter-audience"),
      age: document.getElementById("filter-age"),
      price: document.getElementById("filter-price"),
      level: document.getElementById("filter-level"),
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

      return true;
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

    function renderListings(forceVisible = false) {
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

    const listingParams = new URLSearchParams(window.location.search);
    const requestedArea = listingParams.get("area");

    if (requestedArea && Array.from(filters.area.options).some((option) => option.value === requestedArea)) {
      filters.area.value = requestedArea;
    }

    renderListings(true);
  </script>
</body>
</html>`;
}
function renderLocationPage(location) {
  const areaSchools = getSchoolsForLocation(location.slug);
  const region = lessonRegions.find((item) => item.slug === location.regionSlug);
  const title = location.seoTitle || `${location.name} Surf Lessons | Surfbooker`;
  const description = location.metaDescription;
  const path = `/surf-lessons/${location.slug}/`;
  const heroPositions = {
    "westward-ho": "center 78%",
    saunton: "center 68%",
    woolacombe: "center 58%",
    croyde: "center 58%",
    putsborough: "center 60%",
    "bigbury-on-sea": "center 58%",
    lynton: "center 62%"
  };
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Surf lessons", url: "/surf-lessons/" },
    { name: region.pageTitle, url: `/surf-lessons/${region.slug}/` },
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
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Surfbooker">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${baseUrl}${path}">
  <meta property="og:image" content="${baseUrl}${location.image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${baseUrl}${location.image}">
  <link rel="icon" href="${faviconIco}" sizes="any">
  <link rel="icon" type="image/png" sizes="48x48" href="${favicon48}">
  <link rel="apple-touch-icon" sizes="180x180" href="${appleTouchIcon}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/lesson-location.css">
  <script type="application/ld+json">${escapeScript(JSON.stringify(jsonLd))}</script>
</head>
<body>
  <header class="lesson-hero" style="--hero-image:url('${location.image}');--hero-position:${heroPositions[location.slug] || "center"}">
    <div class="shell">
      <a class="hero-logo" href="/" aria-label="Surfbooker home"><img src="/images/brand/logo-transparent-fbs.png" alt="Surfbooker"></a>
      <div class="hero-copy"><p class="eyebrow">Surf lessons</p><h1>${escapeHtml(location.h1 || location.name)}${location.h1 ? "" : '<span class="sr-only"> surf lessons</span>'}</h1></div>
    </div>
  </header>
  <main>
    <section class="providers">
      <div class="shell">
        <div class="section-heading"><h2>${areaSchools.length ? `Compare surf schools in ${escapeHtml(location.name)}` : `Surf lessons in ${escapeHtml(location.name)}`}</h2></div>
        ${areaSchools.length ? `<div class="provider-grid">${areaSchools.map((school) => renderLessonLocationProviderCard(school)).join("")}</div>` : `<div class="empty-state"><p>No verified surf lesson providers are listed here yet.</p>${location.guidePath ? `<p><a class="button button-secondary" href="${escapeHtml(location.guidePath)}">Read the ${escapeHtml(location.name)} surf guide</a></p>` : ""}</div>`}
      </div>
    </section>
  </main>
  <footer class="site-footer">&copy; 2026 Surfbooker. All rights reserved. <a href="/image-credits/">Image credits</a><a href="mailto:${email}">${email}</a></footer>
</body>
</html>`;
}

function renderLessonLocationProviderCard(school) {
  return `
    <div class="provider-card">
      <img class="provider-image" src="${escapeHtml(school.image)}" alt="${escapeHtml(school.imageAlt)}" width="${school.imageWidth}" height="${school.imageHeight}" loading="lazy" decoding="async">
      <div class="provider-body">
        <h2>${escapeHtml(school.name)}</h2>
        <p>${escapeHtml(school.summary)}</p>
        <a class="provider-link" href="${escapeHtml(comparePathForSchool(school))}">View lesson details</a>
      </div>
    </div>
  `;
}

function renderLessonPricingSection(school) {
  if (!school.lessonPriceSummary) return "";
  const groups = school.lessonPriceGroups || [];
  return `<section class="pricing-section lesson-pricing-section"><div class="shell">
    <div class="section-heading"><p class="eyebrow">Pricing</p><h2>Surf lesson prices</h2></div>
    <p class="lesson-price-summary"><strong>${escapeHtml(school.lessonPriceSummary)}</strong></p>
    ${groups.some((group) => group.rows?.length) ? `<div class="lesson-pricing-groups">
      ${groups.filter((group) => group.rows?.length).map((group) => `<article class="lesson-price-group">
        ${group.title ? `<h3>${escapeHtml(group.title)}</h3>` : ""}
        <div class="lesson-price-list" role="list">
          ${group.rows.map((row) => `<div class="lesson-price-row" role="listitem"><strong>${escapeHtml(row.item)}</strong><span>${escapeHtml(row.price)}</span></div>`).join("")}
        </div>
      </article>`).join("")}
    </div>` : ""}
    ${school.lessonPriceNote ? `<p class="lesson-price-provider-note"><strong>${escapeHtml(school.lessonPriceNote)}</strong></p>` : ""}
    <p class="lesson-price-checked">${escapeHtml(verifiedPricingCheckedNote)}</p>
  </div></section>`;
}

function renderSchoolProfilePage(school) {
  const location = locations.find((item) => item.slug === school.locationSlug);
  const region = lessonRegions.find((item) => item.slug === location.regionSlug);
  const hireProvider = hireProviders.find((item) => item.linkedSchoolSlug === school.slug);
  const title = `${school.name} | ${school.area} Surf Lessons | Surfbooker`;
  const description = `Compare surf lesson details for ${school.name} in ${school.locationLabel}, including formats, duration, prices and practical information before requesting availability.`;
  const path = `/surf-schools/${school.slug}/`;
  const heroImage = school.image.includes("unsplash.com/photos/") ? location.image : school.image;
  const imageUrl = /^https?:\/\//.test(heroImage) ? heroImage : `${baseUrl}${heroImage}`;
  const hasVerifiedLessonPricing = Boolean(school.lessonPriceSummary);
  const priceFacts = hasVerifiedLessonPricing ? [] : school.facts.filter((fact) => /\u00A3/.test(fact.label) || /^surf course$/i.test(fact.label));
  const detailFacts = school.facts.filter((fact) => !priceFacts.includes(fact)
    && !["Lesson format", "Duration", "Ability levels"].includes(fact.label)
    && !(hasVerifiedLessonPricing && (fact.label === "Current pricing" || /\u00A3/.test(`${fact.label} ${fact.value}`))));
  const providerFacts = hasVerifiedLessonPricing
    ? school.websiteFacts.filter((fact) => !/\u00A3/.test(fact))
    : school.websiteFacts;
  const abilityFact = school.facts.find((fact) => fact.label === "Ability levels");
  const quickPrice = school.priceLabel.replace(/^From\s+/i, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems([
          { name: "Home", url: "/" },
          { name: "Surf lessons", url: "/surf-lessons/" },
          { name: region.pageTitle, url: `/surf-lessons/${region.slug}/` },
          { name: location.pageTitle, url: `/surf-lessons/${location.slug}/` },
          { name: school.name, url: path }
        ])
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
  <link rel="canonical" href="${baseUrl}${path}">
  <link rel="alternate" hreflang="en-GB" href="${baseUrl}${path}">
  <meta name="theme-color" content="#0f2a33">
  <meta property="og:locale" content="en_GB">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Surfbooker">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${baseUrl}${path}">
  <meta property="og:image" content="${escapeHtml(imageUrl)}">
  <meta property="og:image:alt" content="${escapeHtml(school.imageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(imageUrl)}">
  <link rel="icon" href="${faviconIco}" sizes="any">
  <link rel="icon" type="image/png" sizes="48x48" href="${favicon48}">
  <link rel="apple-touch-icon" sizes="180x180" href="${appleTouchIcon}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/school-profile.css">
  ${school.googleRating === false ? "" : `<script src="${googleRatingsScript}" defer></script>`}
  <script type="application/ld+json">${escapeScript(JSON.stringify(jsonLd))}</script>
</head>
<body>
  <header class="school-hero" style="--school-hero-image:url('${escapeHtml(heroImage)}')">
    <a class="hero-logo" href="/" aria-label="Surfbooker home"><img src="/images/brand/logo-transparent-fbs.png" alt="Surfbooker"></a>
    <div class="school-hero-inner"><div class="shell">
      <p class="eyebrow">Surf school &middot; ${escapeHtml(school.area)}</p>
      <h1>${escapeHtml(school.name)}</h1>
      <p class="hero-location">${escapeHtml(school.locationLabel)}</p>
      ${school.googleRating === false ? "" : `<div class="hero-rating">${renderGoogleRatingSlot(school.slug, "detail")}</div>`}
    </div></div>
  </header>

  <main>
    <section class="shell"><div class="intro-grid">
      <div class="school-intro">
        <p>${escapeHtml(school.summary)}</p>
      </div>
      <aside class="quick-book">
        <span class="quick-book-label">${typeof school.minPrice === "number" ? "Lessons from" : "Current prices"}</span>
        <strong class="quick-book-price">${escapeHtml(quickPrice)}</strong>
        <a class="button" href="#availability-request">Request availability</a>
      </aside>
    </div></section>

    <section class="details-section"><div class="shell">
      <div class="section-heading"><p class="eyebrow">What to know</p><h2>Lesson details.</h2></div>
      <div class="fact-grid">
        <div class="fact"><span>Lesson format</span><strong>${escapeHtml(specFormatLabel(school))}</strong></div>
        <div class="fact"><span>Duration</span><strong>${escapeHtml(school.durationLabel)}</strong></div>
        <div class="fact"><span>Ability levels</span><strong>${escapeHtml(abilityFact?.value || school.levels.join(" to "))}</strong></div>
        ${detailFacts.map((fact) => `<div class="fact"><span>${escapeHtml(fact.label)}</span><strong>${escapeHtml(fact.value).replace(/\n/g, "<br>")}</strong></div>`).join("")}
        ${providerFacts.map((fact, index) => `<div class="fact"><span>Provider note ${index + 1}</span><strong>${escapeHtml(fact)}</strong></div>`).join("")}
      </div>
    </div></section>

    ${renderLessonPricingSection(school)}

    ${priceFacts.length ? `<section class="pricing-section"><div class="shell">
      <div class="section-heading"><p class="eyebrow">Pricing</p><h2>Lesson prices.</h2></div>
      <div class="pricing-grid">${priceFacts.map((fact) => renderSchoolPriceCard(fact)).join("")}</div>
    </div></section>` : ""}

    <section class="availability-section" id="availability-request"><div class="shell"><div class="availability-grid">
      <div class="availability-copy">
        <p class="eyebrow">Surfbooker enquiry</p>
        <h2>Send an enquiry</h2>
        <p>Tell us when you&rsquo;d like to surf and we&rsquo;ll pass your enquiry to the relevant provider. The provider confirms availability, final pricing and payment directly; Surfbooker does not complete the booking. We usually reply within 48 hours.</p>
      </div>
      ${renderSchoolAvailabilityForm(school, path)}
    </div></section>
    ${renderTrackingForm()}
  </main>

  <footer class="site-footer">&copy; 2026 Surfbooker. All rights reserved. <a href="/image-credits/">Image credits</a><a href="mailto:${email}">${email}</a></footer>
  <script>${renderSchoolAvailabilityScript(school)}</script>
</body>
</html>`;
}

function renderSchoolPriceCard(fact) {
  const labelMatch = fact.label.match(/^(.*?)(\u00A3[\d.]+.*)$/);
  const valueLines = fact.value.split("\n");
  const label = labelMatch ? labelMatch[1].trim() : fact.label;
  const price = labelMatch ? labelMatch[2].trim() : valueLines.shift();
  const detail = labelMatch ? fact.value : valueLines.join("\n");
  return `<article class="price-card"><span>${escapeHtml(label)}</span><h3>${escapeHtml(price)}</h3>${detail ? `<p>${escapeHtml(detail).replace(/\n/g, "<br>")}</p>` : ""}</article>`;
}

function renderSchoolAvailabilityForm(school, path) {
  return `<form class="booking-form" id="availability-form" name="lesson-enquiry" method="POST" action="${path}" data-netlify="true" netlify-honeypot="bot-field">
    <input type="hidden" name="form-name" value="lesson-enquiry">
    <input type="hidden" name="submission_type" value="Surfbooker availability request">
    <p class="sr-only"><label>Do not fill this out if you're human: <input name="bot-field"></label></p>
    <input type="hidden" name="school" value="${escapeHtml(school.name)}">
    <input type="hidden" name="school_slug" value="${escapeHtml(school.slug)}">
    <input type="hidden" name="lesson_location" value="${escapeHtml(school.locationLabel)}">
    <input type="hidden" name="provider_url" value="${escapeHtml(school.website)}">
    <input type="hidden" name="source_page" value="${escapeHtml(path)}">
    <label><span>Your name</span><input type="text" name="name" required></label>
    <label><span>Email</span><input type="email" name="email" required></label>
    <label><span>Preferred lesson date</span><input type="date" name="preferred_date" required><small class="field-note">This date is sent with your request. It does not check live availability.</small></label>
    <label><span>Ability level</span><select name="ability_level" required><option value="">Select ability</option>${levelOptions.map((level) => `<option value="${escapeHtml(level)}">${escapeHtml(level)}</option>`).join("")}</select></label>
    <label class="party-field"><span>Adults and children</span><input type="hidden" name="party" value="0 adults, 0 children"><div class="party-counter-grid">
      <div class="party-counter"><span class="party-counter-label">Adults</span><div class="party-counter-controls"><button type="button" class="party-counter-button" data-party-action="decrease" data-party-target="adults" aria-label="Decrease adults">-</button><input type="number" name="adults_count" value="0" min="0" inputmode="numeric" readonly aria-label="Adults count"><button type="button" class="party-counter-button" data-party-action="increase" data-party-target="adults" aria-label="Increase adults">+</button></div></div>
      <div class="party-counter"><span class="party-counter-label">Children</span><div class="party-counter-controls"><button type="button" class="party-counter-button" data-party-action="decrease" data-party-target="children" aria-label="Decrease children">-</button><input type="number" name="children_count" value="0" min="0" inputmode="numeric" readonly aria-label="Children count"><button type="button" class="party-counter-button" data-party-action="increase" data-party-target="children" aria-label="Increase children">+</button></div></div>
    </div></label>
    <label><span>Extra notes</span><textarea name="notes" rows="4"></textarea></label>
    <div class="submit-wrap"><button type="submit">Send availability request</button></div>
    <p class="form-status" id="availability-status" aria-live="polite"></p>
  </form>`;
}

function renderSchoolAvailabilityScript(school) {
  return `${trackingScript("listing_view", school.slug, "school-page")}
    const availabilityForm = document.getElementById("availability-form");
    const availabilityStatus = document.getElementById("availability-status");
    const params = new URLSearchParams(window.location.search);
    const adultsField = availabilityForm.elements["adults_count"];
    const childrenField = availabilityForm.elements["children_count"];
    const partyField = availabilityForm.elements["party"];
    function syncPartyField() { partyField.value = adultsField.value + " adults, " + childrenField.value + " children"; }
    if (params.get("preferred_date")) availabilityForm.elements["preferred_date"].value = params.get("preferred_date");
    if (params.get("ability_level")) availabilityForm.elements["ability_level"].value = params.get("ability_level");
    const partyMatch = (params.get("party") || "").match(/(\d+)\s*adults?.*?(\d+)\s*children?/i);
    if (partyMatch) { adultsField.value = partyMatch[1]; childrenField.value = partyMatch[2]; }
    syncPartyField();
    availabilityForm.querySelectorAll("[data-party-action]").forEach((button) => button.addEventListener("click", () => {
      const field = availabilityForm.elements[button.dataset.partyTarget + "_count"];
      const adjustment = button.dataset.partyAction === "increase" ? 1 : -1;
      field.value = String(Math.max(0, Number(field.value) + adjustment));
      syncPartyField();
    }));
    availabilityForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      availabilityStatus.textContent = "Sending availability request...";
      const payload = Object.fromEntries(new FormData(availabilityForm).entries());
      try {
        const response = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: encodeForm(payload) });
        if (!response.ok) throw new Error("Submission failed");
        availabilityStatus.textContent = "Availability request sent. Surfbooker will use these details to help check the lesson with ${escapeScript(school.name)}.";
        trackEvent("enquiry", "${escapeScript(school.slug)}", availabilityForm.elements["preferred_date"].value);
        availabilityForm.reset();
        syncPartyField();
      } catch (error) {
        availabilityStatus.textContent = "The request could not be sent just now. Please try again or email hello@surfbooker.com.";
      }
    });`;
}

function renderSchoolPage(school) {
  const location = locations.find((item) => item.slug === school.locationSlug);
  const region = lessonRegions.find((item) => item.slug === location.regionSlug);
  const hireProvider = hireProviders.find((item) => item.linkedSchoolSlug === school.slug);
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
          { name: "Surf lessons", url: "/surf-lessons/" },
          { name: region.pageTitle, url: `/surf-lessons/${region.slug}/` },
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
    label: "",
    intro: school.slug === "ho-surf" ? "" : school.pageIntro[0],
    heroChildren: school.slug === "ho-surf" ? "" : `
      ${school.subtitle ? `<p class="simple-kicker">${escapeHtml(school.subtitle)}</p>` : ""}
      <p>${escapeHtml(school.pageIntro[1])}</p>
      <div class="simple-actions">
        <a class="button button-primary" href="#availability-request">Request availability</a>
      </div>
    `,
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Surf lessons", url: "/surf-lessons/" },
      { name: region.pageTitle, url: `/surf-lessons/${region.slug}/` },
      { name: location.pageTitle, url: `/surf-lessons/${location.slug}/` },
      { name: school.name, url: path }
    ],
    breadcrumbsClass: "breadcrumbs-school-detail",
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
            <p class="detail-status">${typeof school.minPrice === "number" ? escapeHtml(school.priceLabel) : "Price confirmed by the provider."}</p>
          </div>
          ${renderGoogleRatingSlot(school.slug, "detail")}
          ${school.slug === "ho-surf" ? "" : "<h2>Lesson details</h2>"}
          <p class="detail-description">${escapeHtml(school.summary)}</p>
          ${school.slug === "ho-surf" ? `
          <div class="detail-actions">
            <a class="button button-primary" href="#availability-request">Request availability</a>
          </div>` : ""}
          <div class="detail-specs">
            <div><span>Lesson format</span><strong>${escapeHtml(specFormatLabel(school))}</strong></div>
            <div><span>Duration</span><strong>${escapeHtml(school.durationLabel)}</strong></div>
            ${school.slug === "ho-surf" ? "" : `<div><span>Price</span><strong>${escapeHtml(school.priceLabel)}</strong></div>`}
          </div>
          <div class="detail-facts">
            ${school.facts.filter((fact) => !["Lesson format", "Duration"].includes(fact.label)).map((fact) => `<div><span>${escapeHtml(fact.label)}</span><strong>${escapeHtml(fact.value).replace(/\n/g, "<br>")}</strong></div>`).join("")}
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
      ${school.websiteFacts.length ? `
      <section class="simple-card simple-copy">
        <h2>Key notes</h2>
        <ul class="simple-list">
          ${school.websiteFacts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join("")}
        </ul>
      </section>` : ""}
      ${hireProvider ? `
      <section class="simple-card simple-copy">
        <h2>Surf hire at this provider</h2>
        <p>${escapeHtml(hireProvider.intro)}</p>
        <div class="chip-row">
          ${hireProvider.equipment.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
        <p class="page-note">${escapeHtml(hireProvider.pricingSummary)}. Prices checked August 2026 where published; final pricing is confirmed by the provider.</p>
        <ul class="simple-list">
          ${hireProvider.practicalNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
        </ul>
        <div class="simple-actions">
          <a class="button button-primary" href="${escapeHtml(getHireProviderHref(hireProvider))}">View Surfbooker hire profile</a>
          <a class="button button-secondary" href="${escapeHtml(hireProvider.website)}" target="_blank" rel="noopener noreferrer">Visit provider website</a>
        </div>
        <p class="page-note">Sources: ${hireProvider.sources.map((source) => `<a class="text-link" href="${escapeHtml(source.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a>`).join("; ")}.</p>
      </section>` : ""}
      <section class="booking-panel availability-panel" id="availability-request">
        <div class="booking-copy">
          <h3>Request availability</h3>
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
            <input type="text" name="name" required>
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" required>
          </label>
          <label>
            <span>Preferred lesson date</span>
            <input type="date" name="preferred_date" required>
            <small class="field-note">This date is sent with your request. It does not check live availability.</small>
          </label>
          <label>
            <span>Adults and children</span>
            <input type="hidden" name="party" value="0 adults, 0 children">
            <div class="party-counter-grid">
              <div class="party-counter" data-party-counter="adults">
                <span class="party-counter-label">Adults</span>
                <div class="party-counter-controls">
                  <button type="button" class="party-counter-button" data-party-action="decrease" data-party-target="adults" aria-label="Decrease adults">-</button>
                  <input type="number" name="adults_count" value="0" min="0" inputmode="numeric" readonly aria-label="Adults count">
                  <button type="button" class="party-counter-button" data-party-action="increase" data-party-target="adults" aria-label="Increase adults">+</button>
                </div>
              </div>
              <div class="party-counter" data-party-counter="children">
                <span class="party-counter-label">Children</span>
                <div class="party-counter-controls">
                  <button type="button" class="party-counter-button" data-party-action="decrease" data-party-target="children" aria-label="Decrease children">-</button>
                  <input type="number" name="children_count" value="0" min="0" inputmode="numeric" readonly aria-label="Children count">
                  <button type="button" class="party-counter-button" data-party-action="increase" data-party-target="children" aria-label="Increase children">+</button>
                </div>
              </div>
            </div>
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
            <textarea name="notes" rows="4"></textarea>
          </label>
          <button type="submit">Send availability request</button>
          <p class="form-status" id="availability-status" aria-live="polite"></p>
        </form>
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
        const adultsField = availabilityForm.elements["adults_count"];
        const childrenField = availabilityForm.elements["children_count"];
        const partyField = availabilityForm.elements["party"];

        function syncPartyField() {
          partyField.value = adultsField.value + " adults, " + childrenField.value + " children";
        }

        function setPartyCounts(adults, children) {
          adultsField.value = String(Math.max(0, adults));
          childrenField.value = String(Math.max(0, children));
          syncPartyField();
        }

        if (preferredDate) {
          availabilityForm.elements["preferred_date"].value = preferredDate;
        }
        if (abilityLevel) {
          availabilityForm.elements["ability_level"].value = abilityLevel;
        }
        if (party) {
          const match = party.match(/(\d+)\s*adults?.*?(\d+)\s*children?/i);
          if (match) {
            setPartyCounts(Number(match[1]), Number(match[2]));
          }
        }

        syncPartyField();

        availabilityForm.querySelectorAll("[data-party-action]").forEach((button) => {
          button.addEventListener("click", () => {
            const target = button.getAttribute("data-party-target");
            const field = availabilityForm.elements[target + "_count"];
            const currentValue = Number(field.value || 0);
            const nextValue = button.getAttribute("data-party-action") === "increase"
              ? currentValue + 1
              : Math.max(0, currentValue - 1);
            field.value = String(nextValue);
            syncPartyField();
          });
        });

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
            adults_count: availabilityForm.elements["adults_count"].value,
            children_count: availabilityForm.elements["children_count"].value,
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

function renderSurfLessonsIndexPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Surf lessons", url: "/surf-lessons/" }
  ];

  // Same layout as the surf hire index: full-width photo hero and an image tile per region.
  return renderHireAreaIndexPage({
    title: "Surf Lessons | Surfbooker",
    description: "Choose a surf lesson region on Surfbooker. Compare surf schools across Devon, Cornwall, Wales, Scotland, Northern Ireland, the northeast and southern England.",
    path: "/surf-lessons/",
    h1: "Choose your surf lesson region",
    heroImage: "/images/Surf%20lessons.jpg",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "BreadcrumbList", itemListElement: breadcrumbItems(breadcrumbs) },
        {
          "@type": "ItemList",
          name: "Surfbooker surf lesson regions",
          itemListElement: lessonRegions.map((region, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${baseUrl}/surf-lessons/${region.slug}/`,
            name: region.name
          }))
        }
      ]
    },
    cards: lessonRegions.map((region) => ({
      href: `/surf-lessons/${region.slug}/`,
      image: region.image || region.heroImage || "/images/Surf%20lessons.jpg",
      name: region.name,
      summary: region.intro[0]
    }))
  });
}

function renderLessonRegionPage(region) {
  const regionLocations = getLessonLocationsForRegion(region.slug)
    .filter((location) => region.slug !== "devon" || location.slug !== "lynton");
  const regionSchools = getSchoolsForRegion(region.slug);
  const additionalPlaces = ["devon", "south-devon"].includes(region.slug)
    ? [
        {
          name: "Bantham",
          href: "/guides/surfing-bantham/",
          image: "/guides/Bantham/beach%20too.jpeg",
          summary: "Popular South Devon surf beside the Avon estuary."
        },
        {
          name: "Challaborough",
          href: "/guides/surfing-challaborough/",
          image: "/guides/Challaborough/ariel%20beach%20and%20town.jpg",
          summary: "Compact South Devon beach beside Bigbury."
        }
      ]
    : [];
  const regionPlaces = [
    ...regionLocations.map((location) => ({
      name: location.name,
      href: `/surf-lessons/${location.slug}/`,
      image: location.image,
      summary: locationSummary(location)
    })),
    ...additionalPlaces
  ];
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Surf lessons", url: "/surf-lessons/" },
    { name: region.pageTitle, url: `/surf-lessons/${region.slug}/` }
  ];
  const guideLinks = region.slug === "south-devon"
    ? [
        { title: "Bigbury-on-Sea guide", href: "/guides/surfing-bigbury-on-sea/" },
        { title: "Bantham guide", href: "/guides/surfing-bantham/" },
        { title: "Challaborough guide", href: "/guides/surfing-challaborough/" }
      ]
    : [];

  return renderStandardPage({
    title: `${region.pageTitle} | Surfbooker`,
    description: region.metaDescription,
    path: `/surf-lessons/${region.slug}/`,
    h1: region.pageTitle,
    label: region.label,
    intro: "",
    heroChildren: "",
    breadcrumbs,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "BreadcrumbList", itemListElement: breadcrumbItems(breadcrumbs) }
      ]
    },
    mainContent: `
      ${regionPlaces.length ? `
      <section class="coverage-section" id="beaches">
        <div class="section-heading">
          <p class="section-label">Places</p>
          <h2>${escapeHtml(region.name)} surf lesson places.</h2>
        </div>
        <div class="place-grid">
          ${regionPlaces.map((place) => `
            <a class="place-card" href="${place.href}" style="background-image:url('${place.image}')">
              <div class="place-card-content">
                <h3>${escapeHtml(place.name)}</h3>
                <p>${escapeHtml(place.summary)}</p>
              </div>
            </a>
          `).join("")}
        </div>
      </section>
      ` : ""}
      ${regionSchools.length ? `
      <section class="listings-section listings-section-static">
        <div class="section-heading">
          <p class="section-label">Providers</p>
          <h2>Compare verified lesson providers in ${escapeHtml(region.name)}.</h2>
        </div>
        <div class="listings-grid static-listings-grid">
          ${regionSchools.map((school) => renderStaticListingCard(school)).join("")}
        </div>
      </section>
      ` : ""}
      ${guideLinks.length ? `
      <section class="simple-card simple-copy">
        <h2>South Devon beach context</h2>
        <div class="footer-links footer-links-column">
          ${guideLinks.map((guide) => `<a href="${guide.href}">${escapeHtml(guide.title)}</a>`).join("")}
        </div>
        <p class="page-note">South Devon remains a smaller lesson ecosystem than North Devon, so beach context matters before you choose a provider.</p>
      </section>
      ` : ""}
    `
  });
}

function renderHireAreaIndexPage({ title, description, path, h1, heroImage, jsonLd, cards }) {
  const shareImage = heroImage.startsWith("http") ? heroImage : `${baseUrl}${heroImage}`;
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
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Surfbooker">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${baseUrl}${path}">
  <meta property="og:image" content="${escapeHtml(shareImage)}">
  <meta property="og:image:alt" content="${escapeHtml(h1)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(shareImage)}">
  <link rel="icon" href="${faviconIco}" sizes="any">
  <link rel="icon" type="image/png" sizes="48x48" href="${favicon48}">
  <link rel="icon" type="image/png" sizes="96x96" href="${favicon96}">
  <link rel="apple-touch-icon" sizes="180x180" href="${appleTouchIcon}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
  ${analyticsComment}
  <script type="application/ld+json">${escapeScript(JSON.stringify(jsonLd, null, 2))}</script>
  <link rel="stylesheet" href="/surf-hire-index.css">
</head>
<body>
  <header class="hire-hero" style="--hire-hero-image: url('${escapeHtml(heroImage)}')">
    <div class="shell">
      <div class="hero-top"><a href="/" aria-label="Surfbooker home"><img src="/images/brand/logo-transparent-fbs.png" alt="Surfbooker"></a></div>
      <div class="hero-copy"><h1>${escapeHtml(h1)}</h1></div>
    </div>
  </header>
  <main>
    <section class="hire-section">
      <div class="shell hire-grid">
        ${cards.map((card) => `
        <a class="hire-card" href="${escapeHtml(card.href)}" style="background-image: url('${escapeHtml(card.image)}')">
          <div><h2>${escapeHtml(card.name)}</h2><p>${escapeHtml(card.summary)}</p></div>
        </a>`).join("")}
      </div>
    </section>
  </main>
  <footer class="footer">&copy; 2026 Surfbooker. All rights reserved. <a href="/image-credits/">Image credits</a><a href="mailto:${email}">${email}</a></footer>
</body>
</html>`;
}

function renderSurfHireIndexPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Surf hire", url: "/surf-hire/" }
  ];

  return renderHireAreaIndexPage({
    title: "Surf Hire | Surfbooker",
    description: "Choose a surf hire region on Surfbooker. Compare verified hire in Devon, North Devon, South Devon and Cornwall before you travel.",
    path: "/surf-hire/",
    h1: "Choose your surf hire region",
    heroImage: "/images/Surf%20Hire.jpg",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "BreadcrumbList", itemListElement: breadcrumbItems(breadcrumbs) },
        {
          "@type": "ItemList",
          name: "Surfbooker surf-hire regions",
          itemListElement: hireRegions.map((region, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${baseUrl}/surf-hire/${region.slug}/`,
            name: region.name
          }))
        }
      ]
    },
    cards: hireRegions.map((region) => ({
      href: `/surf-hire/${region.slug}/`,
      image: region.image,
      name: region.name,
      summary: region.intro[0]
    }))
  });
}

function renderHireRegionPage(region) {
  const hasChildRegions = Boolean(region.childRegions?.length);
  const regionCards = hasChildRegions
    ? hireLocations.filter((location) => region.childRegions.includes(location.regionSlug))
    : getHireLocationsForRegion(region.slug);
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Surf hire", url: "/surf-hire/" },
    { name: region.pageTitle, url: `/surf-hire/${region.slug}/` }
  ];
  return renderHireAreaIndexPage({
    title: `${region.pageTitle} | Surfbooker`,
    description: region.metaDescription,
    path: `/surf-hire/${region.slug}/`,
    h1: region.pageTitle,
    heroImage: region.heroImage || region.image,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "BreadcrumbList", itemListElement: breadcrumbItems(breadcrumbs) }
      ]
    },
    cards: regionCards.map((item) => ({
      href: `/surf-hire/${item.slug}/`,
      image: item.image,
      name: item.name,
      summary: getHireLocationSummary(item.slug)
    }))
  });
}

function renderHireLocationShowcasePage(location, providers, breadcrumbs) {
  const title = `${location.pageTitle} | Surfbooker`;
  const path = `/surf-hire/${location.slug}/`;
  const shareImage = `${baseUrl}${location.image}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: breadcrumbItems(breadcrumbs) }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(location.metaDescription)}">
  <meta name="robots" content="${providers.length ? "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" : "noindex,follow"}">
  <link rel="canonical" href="${baseUrl}${path}">
  <link rel="alternate" hreflang="en-GB" href="${baseUrl}${path}">
  <meta name="theme-color" content="#0f2a33">
  <meta property="og:locale" content="en_GB">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Surfbooker">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(location.metaDescription)}">
  <meta property="og:url" content="${baseUrl}${path}">
  <meta property="og:image" content="${escapeHtml(shareImage)}">
  <meta property="og:image:alt" content="${escapeHtml(location.pageTitle)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(location.metaDescription)}">
  <meta name="twitter:image" content="${escapeHtml(shareImage)}">
  <link rel="icon" href="${faviconIco}" sizes="any">
  <link rel="icon" type="image/png" sizes="48x48" href="${favicon48}">
  <link rel="icon" type="image/png" sizes="96x96" href="${favicon96}">
  <link rel="apple-touch-icon" sizes="180x180" href="${appleTouchIcon}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
  ${analyticsComment}
  <script type="application/ld+json">${escapeScript(JSON.stringify(jsonLd, null, 2))}</script>
  <link rel="stylesheet" href="/styles.css">
  <link rel="stylesheet" href="/surf-hire-index.css">
</head>
<body>
  <header class="hire-hero" style="--hire-hero-image: url('${escapeHtml(location.image)}')">
    <div class="shell">
      <div class="hero-top"><a href="/" aria-label="Surfbooker home"><img src="/images/brand/logo-transparent-fbs.png" alt="Surfbooker"></a></div>
      <div class="hero-copy"><h1>${escapeHtml(location.pageTitle)}</h1></div>
    </div>
  </header>
  <main>
    <section class="hire-provider-section" id="providers">
      <div class="shell">
        ${providers.length ? `<div class="listings-grid static-listings-grid">${providers.map((provider) => renderHireProviderCard(provider)).join("")}</div>` : `<div class="empty-state"><p>No verified surf-hire providers are listed here yet.</p><p>Use the destination guide to plan the beach, and do not assume equipment will be available without checking first.</p></div>`}
        <section class="simple-card simple-copy">
          <h2>Surfbooker hire tips</h2>
          <ul class="simple-list">
            <li>A foam board is usually the sensible choice for a beginner unless the provider advises otherwise.</li>
            <li>Check whether the wetsuit is included or hired separately before assuming the day price covers both.</li>
            <li>Ask whether overnight or multi-day use is permitted if you are not returning the kit the same day.</li>
            <li>Hiring equipment is not a substitute for a lesson if you still need instruction or water-safety guidance.</li>
          </ul>
        </section>
      </div>
    </section>
  </main>
  <footer class="footer">&copy; 2026 Surfbooker. All rights reserved. <a href="/image-credits/">Image credits</a><a href="mailto:${email}">${email}</a></footer>
</body>
</html>`;
}

function renderHireLocationPage(location) {
  const region = hireRegions.find((item) => item.slug === location.regionSlug);
  const providers = getHireProvidersForLocation(location.slug);
  const isWestwardHo = location.slug === "westward-ho";
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Surf hire", url: "/surf-hire/" },
    { name: region.pageTitle, url: `/surf-hire/${region.slug}/` },
    { name: location.pageTitle, url: `/surf-hire/${location.slug}/` }
  ];

  if (isWestwardHo) {
    return renderHireLocationShowcasePage(location, providers, breadcrumbs);
  }

  return renderStandardPage({
    title: `${location.pageTitle} | Surfbooker`,
    description: location.metaDescription,
    path: `/surf-hire/${location.slug}/`,
    h1: location.pageTitle,
    label: location.label,
    intro: location.intro[0],
    heroImage: location.image,
    heroChildren: `
      <p>${escapeHtml(location.intro[1])}</p>
      <div class="simple-actions">
        <a class="button button-primary" href="#providers">Compare providers</a>
        <a class="button button-secondary" href="${location.guidePath}">Read the ${escapeHtml(location.name)} guide</a>
      </div>
      <p class="page-note">Check whether overnight hire, multi-day use and transport away from the beach are permitted before you commit.</p>
    `,
    breadcrumbs,
    showHeader: false,
    heroLogo: true,
    shellClass: "hire-image-first-page",
    showBreadcrumbs: false,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "BreadcrumbList", itemListElement: breadcrumbItems(breadcrumbs) }
      ]
    },
    mainContent: `
      <section class="listings-section listings-section-static" id="providers">
        <div class="section-heading">
          <p class="section-label">Providers</p>
          <h2>Surf-hire providers serving ${escapeHtml(location.name)}.</h2>
        </div>
        <div class="listings-grid static-listings-grid">
          ${providers.map((provider) => renderHireProviderCard(provider)).join("")}
        </div>
      </section>
      <section class="simple-card simple-copy">
        <h2>Surfbooker hire tips</h2>
        <ul class="simple-list">
          <li>A foam board is usually the sensible choice for a beginner unless the provider advises otherwise.</li>
          <li>Check whether the wetsuit is included or hired separately before assuming the day price covers both.</li>
          <li>Ask whether overnight or multi-day use is permitted if you are not returning the kit the same day.</li>
          <li>Hiring equipment is not a substitute for a lesson if you still need instruction or water-safety guidance.</li>
        </ul>
      </section>
    `
  });
}

function renderHirePricingSection(provider) {
  const groups = provider.hirePriceGroups || [{
    summary: `Contact ${provider.name} for current surf hire prices and availability.`,
    services: provider.equipment
  }];

  return `
    <section class="simple-card simple-copy hire-pricing-section" id="surf-hire-prices">
      <h2>Surf hire prices</h2>
      <div class="hire-price-groups">
        ${groups.map((group) => `
          <article class="hire-price-group">
            ${group.title ? `<h3>${escapeHtml(group.title)}</h3>` : ""}
            <p class="hire-price-summary"><strong>${escapeHtml(group.summary)}</strong></p>
            ${group.services?.length ? `<div class="chip-row hire-service-list">${group.services.map((service) => `<span>${escapeHtml(service)}</span>`).join("")}</div>` : ""}
            ${group.rows?.length ? `
              <div class="hire-price-list" role="list">
                ${group.rows.map((row) => `
                  <div class="hire-price-row" role="listitem">
                    <strong>${escapeHtml(row.item)}</strong>
                    <span>${escapeHtml(row.price)}</span>
                  </div>
                `).join("")}
              </div>
            ` : ""}
            ${group.note ? `<p class="hire-price-note"><strong>${escapeHtml(group.note)}</strong></p>` : ""}
          </article>
        `).join("")}
      </div>
      <p class="page-note hire-price-checked">${escapeHtml(verifiedPricingCheckedNote)}</p>
    </section>
  `;
}

function getHireProfileEquipment(provider) {
  const explicitlyVerifiedServices = (provider.hirePriceGroups || [])
    .flatMap((group) => group.services || []);
  return explicitlyVerifiedServices.length ? explicitlyVerifiedServices : provider.equipment;
}

function getHireCardPricingSummary(provider) {
  const summaries = [...new Set((provider.hirePriceGroups || []).map((group) => group.summary).filter(Boolean))];
  if (summaries.length <= 1) return summaries[0] || provider.pricingSummary;
  return provider.hirePriceGroups
    .map((group) => `${group.title ? `${group.title}: ` : ""}${group.summary}`)
    .join("; ");
}

function renderHireEnquirySection(provider) {
  const formId = `hire-enquiry-${provider.slug}`;
  const statusId = `${formId}-status`;
  const pricedLocations = (provider.hirePriceGroups || []).map((group) => group.title).filter(Boolean);
  const formLocation = pricedLocations.length
    ? pricedLocations.join(" / ")
    : hireLocations.find((location) => location.slug === provider.locationSlug)?.name || provider.locationSlug;
  return `
    <section class="simple-card simple-copy hire-enquiry-section" id="hire-enquiry">
      <h2>Send an enquiry</h2>
      <p>Tell us when you&rsquo;d like to surf and we&rsquo;ll help connect you with the right option. We usually reply within 48 hours.</p>
      <form class="booking-form hire-enquiry-form" id="${formId}" name="surf-hire-enquiry" method="POST" action="${escapeHtml(provider.providerPath)}" data-netlify="true" netlify-honeypot="bot-field">
        <input type="hidden" name="form-name" value="surf-hire-enquiry">
        <input type="hidden" name="submission_type" value="Surfbooker surf hire enquiry">
        <input type="hidden" name="provider" value="${escapeHtml(provider.name)}">
        <input type="hidden" name="provider_slug" value="${escapeHtml(provider.slug)}">
        <input type="hidden" name="hire_location" value="${escapeHtml(formLocation)}">
        <input type="hidden" name="source_page" value="${escapeHtml(provider.providerPath)}">
        <p class="sr-only"><label>Do not fill this out if you&rsquo;re human: <input name="bot-field"></label></p>
        <label><span>Full name</span><input type="text" name="full_name" autocomplete="name" required></label>
        <label><span>Email address</span><input type="email" name="email" autocomplete="email" required></label>
        <label><span>Mobile number</span><input type="tel" name="mobile" autocomplete="tel" required></label>
        <label><span>Preferred hire date</span><input type="date" name="preferred_hire_date" required><small class="field-note">This is an enquiry and does not confirm availability.</small></label>
        <label><span>Number of people</span><input type="number" name="number_of_people" min="1" step="1" inputmode="numeric" required></label>
        <label><span>What would you like to hire?</span><select name="hire_item" required><option value="">Select equipment</option><option>Surfboard</option><option>Surfboard and wetsuit</option><option>Wetsuit</option><option>Bodyboard</option><option>SUP</option><option>Other / not sure</option></select></label>
        <label><span>Hire duration</span><select name="hire_duration" required><option value="">Select duration</option><option>2 hours</option><option>Half day</option><option>Full day</option><option>Multiple days</option><option>Not sure yet</option></select></label>
        <label><span>Experience level <small>(optional)</small></span><select name="experience_level"><option value="">Select experience</option><option>Complete beginner</option><option>Beginner</option><option>Improver</option><option>Intermediate</option><option>Advanced</option></select></label>
        <label class="form-wide"><span>Message / requirements <small>(optional)</small></span><textarea name="message_requirements" rows="5"></textarea></label>
        <div class="submit-wrap form-wide"><button type="submit">Send hire enquiry</button></div>
        <p class="field-note form-wide">Surfbooker will use your details to handle this enquiry. Read our <a class="text-link" href="/privacy/">privacy information</a>.</p>
        <p class="form-status form-wide" id="${statusId}" aria-live="polite"></p>
      </form>
      <script>
        (() => {
          const form = document.getElementById(${escapeScript(JSON.stringify(formId))});
          const status = document.getElementById(${escapeScript(JSON.stringify(statusId))});
          const encodeHireEnquiry = (data) => Object.keys(data).map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join("&");
          form.addEventListener("submit", async (event) => {
            event.preventDefault();
            status.textContent = "Sending hire enquiry...";
            const payload = Object.fromEntries(new FormData(form).entries());
            try {
              const response = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: encodeHireEnquiry(payload) });
              if (!response.ok) throw new Error("Submission failed");
              status.textContent = "Thanks — your surf hire enquiry has been received. We’ll be in touch as soon as possible.";
              const activityPayload = encodeHireEnquiry({
                "form-name": "site-activity",
                event_type: "enquiry",
                event_target: ${escapeScript(JSON.stringify(provider.slug))},
                event_detail: form.elements["preferred_hire_date"].value,
                page_url: window.location.pathname,
                timestamp: new Date().toISOString()
              });
              if (navigator.sendBeacon) navigator.sendBeacon("/", new Blob([activityPayload], { type: "application/x-www-form-urlencoded" }));
              else fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: activityPayload, keepalive: true }).catch(() => {});
              form.reset();
            } catch (error) {
              status.textContent = "The enquiry could not be sent just now. Please try again or email hello@surfbooker.com.";
            }
          });
        })();
      </script>
    </section>
  `;
}

function renderHireProviderPage(provider) {
  const region = hireRegions.find((item) => item.slug === provider.regionSlug);
  const primaryLocation = hireLocations.find((item) => item.slug === provider.locationSlug);
  const providerHireTitle = /surf hire$/i.test(provider.name) ? provider.name : `${provider.name} Surf Hire`;
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Surf hire", url: "/surf-hire/" },
    { name: region.pageTitle, url: `/surf-hire/${region.slug}/` },
    { name: primaryLocation.pageTitle, url: `/surf-hire/${primaryLocation.slug}/` },
    { name: provider.name, url: provider.providerPath }
  ];
  const profileEquipment = getHireProfileEquipment(provider);

  return renderStandardPage({
    title: `${providerHireTitle} | Surfbooker`,
    description: `${provider.name} surf-hire details on Surfbooker, including equipment, published pricing, collection context and source links.`,
    path: provider.providerPath,
    h1: providerHireTitle,
    label: "",
    intro: provider.intro,
    heroImage: provider.image || primaryLocation.image,
    heroChildren: "",
    breadcrumbs,
    showHeader: false,
    heroLogo: true,
    shellClass: "hire-image-first-page",
    showBreadcrumbs: false,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "BreadcrumbList", itemListElement: breadcrumbItems(breadcrumbs) }
      ]
    },
    mainContent: `
      <section class="simple-card simple-copy">
        <h2>What you can hire</h2>
        <div class="chip-row">
          ${profileEquipment.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
      </section>
      ${renderHirePricingSection(provider)}
      ${renderHireEnquirySection(provider)}
      ${renderTrackingForm()}
    `
  });
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
        <p>Because the beach is open and exposed, conditions can change quickly. Wind can affect wave quality, and a promising swell does not always guarantee clean surf. Check conditions before travelling and speak to a local surf school if you are unsure what the sea state will feel like on the day.</p>
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

function renderStandardPage({ title, description, path, h1, label, intro, heroChildren, heroImage = "", breadcrumbs, breadcrumbsClass = "", jsonLd, mainContent, ogType = "website", logoOnlyHeader = false, showHeader = true, heroLogo = false, shellClass = "", showBreadcrumbs = true, showHero = true }) {
  // Every public page with a header and hero gets the full-width photo hero used on the hire and
  // guide pages. Pages without their own photo use one of the place's photos, or a general surf photo.
  const photoHero = showHeader && showHero && !logoOnlyHeader && !heroLogo ? (heroImage || defaultHeroImage(path)) : "";
  const shareImage = (heroImage || photoHero)
    ? ((heroImage || photoHero).startsWith("http") ? (heroImage || photoHero) : `${baseUrl}${heroImage || photoHero}`)
    : `${baseUrl}${logoBackground}`;
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
  <meta property="og:image" content="${escapeHtml(shareImage)}">
  <meta property="og:image:alt" content="${escapeHtml(heroImage ? h1 : ogImageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(shareImage)}">
  <link rel="icon" href="${faviconIco}" sizes="any">
  <link rel="icon" type="image/png" sizes="48x48" href="${favicon48}">
  <link rel="icon" type="image/png" sizes="96x96" href="${favicon96}">
  <link rel="apple-touch-icon" sizes="180x180" href="${appleTouchIcon}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
  ${analyticsComment}
  <script src="${googleRatingsScript}" defer></script>
  <script type="application/ld+json">${escapeScript(JSON.stringify(jsonLd, null, 2))}</script>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  ${photoHero ? renderPhotoHero({ h1, label, intro, heroChildren, heroImage: photoHero, breadcrumbs: showBreadcrumbs ? renderBreadcrumbs(breadcrumbs, breadcrumbsClass) : "" }) : ""}
  <div class="simple-shell${shellClass ? ` ${escapeHtml(shellClass)}` : ""}${photoHero ? " has-photo-hero" : ""}">
    ${!photoHero && showHeader ? (logoOnlyHeader ? renderLogoOnlyHeader() : renderHeader()) : ""}
    <main>
      ${!photoHero && showBreadcrumbs ? renderBreadcrumbs(breadcrumbs, breadcrumbsClass) : ""}
      ${photoHero ? "" : showHero ? `
      <section class="simple-hero${heroImage ? " simple-hero-image" : ""}"${heroImage ? ` style="--simple-hero-image: url('${escapeHtml(heroImage)}')"` : ""}>
        ${heroLogo ? `<a class="simple-hero-overlay-logo" href="/" aria-label="Surfbooker home"><img src="/images/brand/logo-transparent-fbs.png" alt="Surfbooker"></a>` : ""}
        ${label ? `<p class="section-label">${escapeHtml(label)}</p>` : ""}
        <h1>${escapeHtml(h1)}</h1>
        ${intro ? `<p>${escapeHtml(intro)}</p>` : ""}
        ${heroChildren}
      </section>
      ` : `<h1 class="sr-only">${escapeHtml(h1)}</h1>`}
      ${mainContent}
    </main>
    ${renderFooter()}
  </div>
</body>
</html>`;
}

function defaultHeroImage(path) {
  const parts = path.split("/").filter(Boolean);
  for (const part of parts.slice().reverse()) {
    const own = placeImages(part.replace(/^surfing-/, ""));
    if (own.length) return "/" + own[0].split("/").map(encodeURIComponent).join("/").replace(/%21/g, "!");
  }
  // Spread the general photos across pages so neighbouring pages don't all share one image.
  let hash = 0;
  for (const ch of path) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const pick = GENERIC[hash % GENERIC.length];
  return "/" + pick.split("/").map(encodeURIComponent).join("/");
}

function renderPhotoHero({ h1, label, intro, heroChildren, heroImage, breadcrumbs }) {
  return `
  <header class="photo-hero" style="--photo-hero-image: url('${escapeHtml(heroImage)}')">
    <div class="photo-hero-inner">
      <div class="photo-hero-top">
        <a href="/" aria-label="Surfbooker home"><img src="/images/brand/logo-transparent-fbs.png" alt="Surfbooker"></a>
        <nav class="photo-hero-nav" aria-label="Primary navigation">
          <a href="/guides/">Beach guides</a><a href="/surf-lessons/">Surf lessons</a><a href="/surf-hire/">Surf hire</a><a href="/accommodation/">Accommodation</a><a href="/contact/">Contact</a>
        </nav>
      </div>
      <div class="photo-hero-copy">
        ${breadcrumbs}
        ${label ? `<p class="photo-hero-label">${escapeHtml(label)}</p>` : ""}
        <h1>${escapeHtml(h1)}</h1>
        ${intro ? `<p class="photo-hero-intro">${escapeHtml(intro)}</p>` : ""}
        ${heroChildren || ""}
      </div>
    </div>
  </header>`;
}

function renderStaticListingCard(school) {
  const highlights = cardHighlightsForSchool(school);
  return `
    <div class="listing-card static-listing-card">
      <div class="listing-image-wrap">
        <img src="${escapeHtml(school.image)}" alt="${escapeHtml(school.imageAlt)}" width="${school.imageWidth}" height="${school.imageHeight}" loading="lazy" decoding="async">
      </div>
      <div class="listing-card-body">
        <div class="listing-topline">
          <p>${escapeHtml(school.locationLabel)}</p>
        </div>
        <h3>${escapeHtml(school.name)}</h3>
        ${school.subtitle ? `<p class="listing-subtitle">${escapeHtml(school.subtitle)}</p>` : ""}
        ${renderGoogleRatingSlot(school.slug)}
        <div class="listing-meta">
          <strong>${escapeHtml(school.priceLabel)}</strong>
          ${school.durationLabel && school.durationLabel !== "Confirm with the provider" ? `<span>${escapeHtml(school.durationLabel)}</span>` : ""}
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
    </div>
  `;
}

function renderHireProviderCard(provider, buttonLabel = "View hire details") {
  const location = hireLocations.find((item) => item.slug === provider.locationSlug);
  const linkedSchool = schools.find((school) => school.slug === provider.linkedSchoolSlug);
  const image = provider.image || linkedSchool?.image || location?.image;
  const imageAlt = provider.imageAlt || linkedSchool?.imageAlt || `${provider.name} surf hire in ${location?.name || provider.regionSlug}`;
  const extraLocations = (provider.extraLocationSlugs || [])
    .map((slug) => hireLocations.find((item) => item.slug === slug))
    .filter(Boolean)
    .map((item) => item.name);
  const allLocations = [location?.name, ...extraLocations].filter(Boolean).join(" and ");
  const hireHref = getHireProviderHref(provider);
  const externalAttributes = /^https?:\/\//i.test(hireHref) ? ' target="_blank" rel="noopener noreferrer"' : "";
  const hirePricingSummary = getHireCardPricingSummary(provider);

  return `
    <article class="listing-card static-listing-card">
      <div class="listing-image-wrap">
        <img src="${escapeHtml(image)}" alt="${escapeHtml(imageAlt)}" loading="lazy" decoding="async">
      </div>
      <div class="listing-card-body">
        <div class="listing-topline">
          <p>${escapeHtml(allLocations || "Devon")}</p>
        </div>
        <h3>${escapeHtml(provider.name)}</h3>
        <p class="listing-subtitle">${escapeHtml(provider.intro)}</p>
        <div class="listing-meta">
          <strong>${escapeHtml(hirePricingSummary)}</strong>
        </div>
        <div class="chip-row">
          ${provider.equipment.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
        <ul class="card-highlights">
          ${provider.practicalNotes.slice(0, 3).map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
        </ul>
        <div class="listing-actions">
          <a class="button button-primary" href="${escapeHtml(hireHref)}"${externalAttributes}>${escapeHtml(buttonLabel)}</a>
        </div>
      </div>
    </article>
  `;
}

function renderSurfShopBusinessCard(provider) {
  return renderHireProviderCard(provider, "View shop details");
}

function renderSurfShopsIndexPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Surf shops", url: "/surf-shops/" }
  ];

  return renderStandardPage({
    title: "Surf Shops | Surfbooker",
    description: "Choose a UK surf-shop region on Surfbooker, then check destination pages for verified local businesses before you travel.",
    path: "/surf-shops/",
    h1: "Surf shops",
    label: "Surf shops",
    intro: "",
    heroChildren: "",
    breadcrumbs,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "BreadcrumbList", itemListElement: breadcrumbItems(breadcrumbs) }
      ]
    },
    mainContent: `
      <section class="coverage-section">
        <div class="section-heading">
          <p class="section-label">Regions</p>
          <h2>Start with the right part of the coast.</h2>
          <div class="simple-actions">
            <a class="button button-secondary" href="/surf-hire/">Need surf hire instead?</a>
          </div>
        </div>
        <div class="coverage-grid">
          ${surfShopRegions.map((region) => `
            <a class="coverage-card" href="/surf-shops/${region.slug}/">
              <h3>${escapeHtml(region.name)}</h3>
              <p>${escapeHtml(region.intro[0])}</p>
            </a>
          `).join("")}
        </div>
      </section>
    `
  });
}

function renderSurfShopRegionPage(region) {
  const isDevon = region.slug === "devon";
  const regionCards = isDevon
    ? surfShopRegions.filter((item) => item.slug !== region.slug)
    : getSurfShopPlacesForRegion(region.slug);
  const cardLabel = isDevon ? "Regions" : "Places";
  const cardHeading = isDevon
    ? "Choose a regional surf-shop directory."
    : `${region.name} surf-shop places.`;
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Surf shops", url: "/surf-shops/" },
    { name: region.pageTitle, url: `/surf-shops/${region.slug}/` }
  ];

  return renderStandardPage({
    title: `${region.pageTitle} | Surfbooker`,
    description: region.metaDescription,
    path: `/surf-shops/${region.slug}/`,
    h1: region.pageTitle,
    label: region.label,
    intro: region.intro[0],
    heroChildren: `
      <p>${escapeHtml(region.intro[1])}</p>
      ${region.childRegions?.length ? `
      <div class="simple-actions">
        ${region.childRegions.map((slug, index) => {
          const childRegion = surfShopRegions.find((item) => item.slug === slug);
          return `<a class="button ${index === 0 ? "button-primary" : "button-secondary"}" href="/surf-shops/${slug}/">Open ${escapeHtml(childRegion.name)} shops</a>`;
        }).join("")}
      </div>
      ` : ""}
    `,
    breadcrumbs,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "BreadcrumbList", itemListElement: breadcrumbItems(breadcrumbs) }
      ]
    },
    mainContent: `
      <section class="coverage-section" id="shop-places">
        <div class="section-heading">
          <p class="section-label">${escapeHtml(cardLabel)}</p>
          <h2>${escapeHtml(cardHeading)}</h2>
        </div>
        <div class="coverage-grid">
          ${regionCards.map((item) => `
            <a class="coverage-card" href="/surf-shops/${isDevon ? item.slug : `${region.slug}/${item.slug}`}/">
              <h3>${escapeHtml(item.name)}</h3>
              <p>${escapeHtml(isDevon ? (item.placeSummary || item.intro[0]) : (item.intro[0] || "No verified surf shops currently listed."))}</p>
            </a>
          `).join("")}
        </div>
      </section>
    `
  });
}

function renderSurfShopPlacePage(place) {
  const region = surfShopRegions.find((item) => item.slug === place.regionSlug);
  const businesses = getSurfShopBusinessesForPlace(place.slug);
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Surf shops", url: "/surf-shops/" },
    { name: region.pageTitle, url: `/surf-shops/${region.slug}/` },
    { name: place.pageTitle, url: `/surf-shops/${region.slug}/${place.slug}/` }
  ];

  return renderStandardPage({
    title: `${place.pageTitle} | Surfbooker`,
    description: place.metaDescription,
    path: `/surf-shops/${region.slug}/${place.slug}/`,
    h1: place.pageTitle,
    label: place.label,
    intro: place.intro[0],
    heroChildren: `
      <p>${escapeHtml(place.intro[1])}</p>
      ${place.guidePath ? `<div class="simple-actions"><a class="button button-secondary" href="${escapeHtml(place.guidePath)}">Read the ${escapeHtml(place.name)} guide</a></div>` : ""}
      <p class="page-note">Open the individual business page once you know which shop you want to compare.</p>
    `,
    breadcrumbs,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "BreadcrumbList", itemListElement: breadcrumbItems(breadcrumbs) }
      ]
    },
    mainContent: `
      <section class="coverage-section">
        <div class="section-heading">
          <p class="section-label">Businesses</p>
          <h2>Verified surf-shop businesses in ${escapeHtml(place.name)}.</h2>
        </div>
        <div class="listings-grid static-listings-grid">
          ${businesses.length ? businesses.map((provider) => renderSurfShopBusinessCard(provider)).join("") : `
            <article class="simple-card simple-copy">
              <h3>No verified surf shops currently listed.</h3>
              <p>Surfbooker has the place page ready, but there are no verified shop businesses for this location yet.</p>
            </article>
          `}
        </div>
      </section>
    `
  });
}

function renderHeader() {
  return `
    <header class="site-header">
      <a class="brand" href="/">
        <img class="brand-wordmark-image" src="${logoWordmark}" alt="Surfbooker" width="1774" height="887">
      </a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="/surf-lessons/">Surf lessons</a>
        <a href="/surf-hire/">Surf hire</a>
        <a href="/guides/">Beach guides</a>
        <a href="/accommodation/">Accommodation</a>
        <a href="/list-your-school/">List your surf business</a>
        <a href="/contact/">Contact</a>
      </nav>
      <div class="mobile-nav-links" aria-label="Mobile contact links">
        <a href="/surf-lessons/">Surf lessons</a>
        <a href="/surf-hire/">Surf hire</a>
        <a href="/guides/">Beach guides</a>
        <a href="/accommodation/">Accommodation</a>
        <a href="/contact/">Contact</a>
      </div>
    </header>
  `;
}

function renderLogoOnlyHeader() {
  return `
    <header class="site-header">
      <a class="brand" href="/" aria-label="Surfbooker home">
        <img class="brand-wordmark-image" src="${logoWordmark}" alt="Surfbooker" width="1774" height="887">
      </a>
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
      <p class="footer-meta">&copy; 2026 Surfbooker. All rights reserved. <a class="text-link" href="/image-credits/">Image credits</a> <a class="text-link" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    </footer>
  `;
}

function renderBreadcrumbs(items, className = "") {
  const navClass = ["breadcrumbs", className].filter(Boolean).join(" ");
  return `
    <nav class="${navClass}" aria-label="Breadcrumb">
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
  const urls = collectIndexableCanonicalPaths();

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${buildDate}</lastmod>
  </url>`).join("\n")}
</urlset>
`;
}

function collectIndexableCanonicalPaths() {
  const htmlFiles = walkHtmlFiles(rootDir);
  const urls = new Set();

  for (const filePath of htmlFiles) {
    if (filePath.endsWith("404.html")) {
      continue;
    }

    const html = readFileSync(filePath, "utf8");
    if (/name="robots"\s+content="[^"]*noindex/i.test(html)) {
      continue;
    }

    const canonical = matchFirstGroup(html, /<link rel="canonical" href="([^"]+)"/i);
    if (!canonical || !canonical.startsWith(baseUrl)) {
      continue;
    }

    const path = canonical.replace(baseUrl, "") || "/";
    urls.add(path);
  }

  return Array.from(urls).sort();
}

function getSchoolsForLocation(locationSlug) {
  return schools.filter((school) => school.locationSlug === locationSlug || (school.extraLocationSlugs || []).includes(locationSlug));
}

function getLessonLocationsForRegion(regionSlug) {
  if (regionSlug === "devon") {
    return locations.filter((location) => ["north-devon", "south-devon"].includes(location.regionSlug));
  }
  return locations.filter((location) => location.regionSlug === regionSlug);
}

function getSchoolsForRegion(regionSlug) {
  if (regionSlug === "devon") {
    return [...schools];
  }
  const locationSlugs = new Set(getLessonLocationsForRegion(regionSlug).map((location) => location.slug));
  return schools.filter((school) => locationSlugs.has(school.locationSlug) || (school.extraLocationSlugs || []).some((slug) => locationSlugs.has(slug)));
}

function getHireLocationsForRegion(regionSlug) {
  return hireLocations.filter((location) => location.regionSlug === regionSlug);
}

function getHireProvidersForLocation(locationSlug) {
  return hireProviders.filter((provider) => provider.locationSlug === locationSlug || (provider.extraLocationSlugs || []).includes(locationSlug));
}

function getHireProvidersForRegion(regionSlug) {
  return hireProviders.filter((provider) => provider.regionSlug === regionSlug);
}

// Short, place-specific line for destination cards that have no listings yet, so a grid of cards
// doesn't repeat the same "nothing listed" sentence over and over.
function destinationIntro(slug) {
  for (const key of [slug, `${slug}-beach`, slug.replace(/-beach$/, ""), slug.replace(/^towan-newquay$/, "towan-beach-newquay"), slug === "porthmeor" ? "porthmeor-beach" : "", slug === "sennen" ? "sennen-cove" : ""]) {
    if (key && destinationIntros.get(key)) return destinationIntros.get(key);
  }
  return "";
}

function getHireLocationSummary(locationSlug) {
  const providers = getHireProvidersForLocation(locationSlug);
  if (!providers.length) {
    return destinationIntro(locationSlug) || "No verified hire providers currently listed.";
  }

  const equipment = new Set();
  for (const provider of providers) {
    for (const item of provider.equipment) {
      equipment.add(item);
    }
  }

  const equipmentLabel = Array.from(equipment).slice(0, 4).join(", ");
  return `${providers.length} provider${providers.length === 1 ? "" : "s"}. ${equipmentLabel}.`;
}

function getHireProviderHref(provider) {
  return provider.providerPath;
}

function getSurfShopPlacesForRegion(regionSlug) {
  return surfShopPlaces.filter((place) => place.regionSlug === regionSlug);
}

function getSurfShopBusinessesForPlace(placeSlug) {
  return hireProviders.filter((provider) => provider.shopPlaceSlug === placeSlug);
}

function locationSummary(location) {
  const areaSchools = getSchoolsForLocation(location.slug);
  if (!areaSchools.length) {
    return destinationIntro(location.slug) || "No current school listings.";
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
  if (!school.formats.length) {
    return "Ask the school";
  }
  if (school.formats.length === 1) {
    return school.formats[0];
  }
  if (school.formats.length === 2) {
    return `${school.formats[0]} and ${school.formats[1].toLowerCase()}`;
  }
  return `${school.formats.slice(0, -1).join(", ")} and ${school.formats.at(-1)?.toLowerCase()}`;
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

function walkHtmlFiles(dir) {
  const entries = readdirSync(dir).map((name) => join(dir, name));
  const files = [];

  for (const entry of entries) {
    const stats = statSync(entry);
    if (stats.isDirectory()) {
      if (entry.endsWith(".git")) {
        continue;
      }
      files.push(...walkHtmlFiles(entry));
      continue;
    }

    if (entry.endsWith(".html")) {
      files.push(entry);
    }
  }

  return files;
}

function matchFirstGroup(text, pattern) {
  const match = text.match(pattern);
  return match ? decodeHtmlEntity(match[1]).trim() : "";
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

function decodeHtmlEntity(value) {
  return String(value)
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const rootDir = process.cwd();
const buildDate = "2026-08-01";
const baseUrl = "https://surfbooker.com";
const email = "hello@surfbooker.com";
const logoIcon = "/Logo%20no%20words%20transparent.png";
const logoBackground = "/Logo%20background.png";
const googleRatingsScript = "/google-ratings.js";
const analyticsComment = "<!-- Optional analytics: add Google Analytics 4 or Microsoft Clarity here when ready. -->";
const sharedDisclaimer = "Surfbooker compares public surf lesson information and passes enquiries to the Surfbooker inbox. Final prices, availability, lesson times, booking terms and lesson delivery are confirmed by each surf school.";
const listingNote = "Prices shown are the latest public starting prices Surfbooker found on official school websites where available. Final prices and availability are confirmed by the provider.";
const ogImageAlt = "Surfbooker branding for North Devon surf lessons";

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
    locationLabel: "Westward Ho!, North Devon",
    beachOrder: 1,
    website: "https://www.surfandkiteshop.co.uk/learn-to-surf",
    image: "https://images.pexels.com/photos/19756565/pexels-photo-19756565.jpeg?cs=srgb&dl=pexels-sergk1-19756565.jpg&fm=jpg",
    imageAlt: "Adult beginner surf lesson with instructor support used to illustrate Ho! Surf in Westward Ho!",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Westward Ho! surf lessons with Ho! Surf and SurfSUP Academy",
    priceLabel: "Check school website",
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
      "Ho! Surf is Surfbooker’s first Westward Ho! listing. On the official Surf and Kite Shop lesson page, Surfbooker found two-hour surf lessons promoted for beginners through to more experienced surfers, with booking handled on the provider side.",
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
    locationLabel: "Westward Ho!, North Devon",
    beachOrder: 1,
    website: "https://www.northdevonsurfschool.co.uk/courses-lessons.php",
    image: "https://images.pexels.com/photos/31494099/pexels-photo-31494099.jpeg?cs=srgb&dl=pexels-danielfloresphoto-31494099.jpg&fm=jpg",
    imageAlt: "Young surfer receiving coaching in shallow water used to illustrate North Devon Surf School in Westward Ho!",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Westward Ho! surf school with group and private lessons",
    priceLabel: "From £39",
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
      "North Devon Surf School publishes a wide range of surf lessons from its Westward Ho! base. The official lessons page includes a two-hour group lesson from £39 and private tuition with a senior coach working exclusively with the booking.",
      "Surfbooker could also verify a purpose-built surf school close to the beach, plus heated changing rooms, secure storage, toilets and hot showers on the provider’s own website."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "2 hours" },
      { label: "Public starting price", value: "£39 for 1 x 2 hour group lesson" },
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
    locationLabel: "Westward Ho!, North Devon",
    beachOrder: 1,
    website: "https://www.westwardwavessurfschool.co.uk/prices",
    image: "https://images.pexels.com/photos/6299947/pexels-photo-6299947.jpeg?cs=srgb&dl=pexels-kampus-6299947.jpg&fm=jpg",
    imageAlt: "Young surfer learning with instructor on a gentle wave used to illustrate Westward Waves Surf School in Westward Ho!",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Westward Ho! lessons from a beachside Northam Burrows base",
    priceLabel: "From £35",
    minPrice: 35,
    durationLabel: "2 hours",
    sortDurationMinutes: 120,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Mixed ages and abilities",
    minAge: 6,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "Westward Waves publishes two-hour group lessons from £35 and private coaching from its Northam Burrows base, with winter wetsuits, surfboards and changing facilities listed on the official prices page.",
    pageIntro: [
      "Westward Waves Surf School is based on Northam Burrows in Westward Ho! and promotes both group and private lessons on its official site. The public prices page currently shows group lessons from £35 per person for a two-hour session.",
      "Surfbooker could also verify winter wetsuits, surfboards, winter accessories, changing facilities and minimum age guidance from the school’s own FAQs and pricing pages."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "2 hours" },
      { label: "Public starting price", value: "£35 per person for a group lesson" },
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
    locationLabel: "Saunton Sands, North Devon",
    beachOrder: 2,
    website: "https://www.surf-saunton.co.uk/surf-lesson/surf-lesson/",
    image: "https://unsplash.com/photos/LBa-ae7pl3A/download?force=true&w=1400",
    imageAlt: "Recreational surfers in small waves used to illustrate Surf Saunton at Saunton Sands",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Saunton Sands surf school with group, private and kids options",
    priceLabel: "From £45",
    minPrice: 45,
    durationLabel: "2 hours",
    sortDurationMinutes: 120,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 8,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "Surf Saunton publishes two-hour surf lessons from £45 per person at Saunton Sands, alongside private sessions, school groups and kids products on the official website.",
    pageIntro: [
      "Surf Saunton promotes group surf lessons, private one-to-one coaching, private group lessons and dedicated children’s products from its base at Saunton Sands. The public lesson page currently shows a two-hour surf lesson from £45 per person.",
      "The official site also describes grouped sessions by experience level, large car parking, toilets, a dry indoor changing option in poor weather and equipment included in the lesson price."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "2 hours" },
      { label: "Public starting price", value: "£45 per person" },
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
    locationLabel: "Saunton Sands, North Devon",
    beachOrder: 2,
    website: "https://walking-on-waves.com/all-surf-lessons-saunton",
    image: "https://unsplash.com/photos/LWtB-UD9nOM/download?force=true&w=1400",
    imageAlt: "Group of everyday surfers in the sea used to illustrate Walking on Waves at Saunton Sands",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Saunton Sands surf coaching with group, private and kids sessions",
    priceLabel: "From £35 per lesson",
    minPrice: 35,
    durationLabel: "1 to 2 hours",
    sortDurationMinutes: 60,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 4,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "Walking on Waves lists group, private, kids and course-based surf lessons at Saunton Sands, with public pricing from £35 per lesson on multi-session surf courses and ISA-qualified coaching across one-hour to two-hour products.",
    pageIntro: [
      "Walking on Waves is one of the longest-running surf schools in Surfbooker’s Saunton set, with public surf lesson pages covering group lessons, private sessions, kids lessons, surf courses and coach-and-ride products.",
      "Surfbooker could verify a maximum 6:1 lesson ratio, indoor changing and storage, on-site toilets and a spread of lesson lengths from one hour to two hours on the provider’s own site."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "1 hour to 2 hours depending on session type" },
      { label: "Public starting price", value: "From £35 per lesson on multi-session surf courses" },
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
      "Walking on Waves describes itself as Saunton’s original surf school and says it has delivered lessons since 2003"
    ],
    claimMailto: mailtoForSchool("Walking on Waves")
  },
  {
    slug: "woolacombe-surf-centre",
    name: "Woolacombe Surf Centre",
    area: "Woolacombe",
    locationSlug: "woolacombe",
    locationLabel: "Woolacombe, North Devon",
    beachOrder: 3,
    website: "https://www.woolacombesurfcentre.com/activities/surf-lessons/",
    image: "https://unsplash.com/photos/wSofRERMyas/download?force=true&w=1400",
    imageAlt: "People learning to surf close to shore used to illustrate Woolacombe Surf Centre",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Woolacombe village surf school with group, private and one-to-one sessions",
    priceLabel: "From £40",
    minPrice: 40,
    durationLabel: "2 hours",
    sortDurationMinutes: 120,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 8,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "Woolacombe Surf Centre lists two-hour group, private and one-to-one surf sessions, with equipment included and a public group lesson price from £40 on the official surf lessons page.",
    pageIntro: [
      "Woolacombe Surf Centre publishes two-hour surf sessions for all abilities, with separate sections for group lessons, private lessons, one-to-one coaching and larger group bookings.",
      "The official surf lessons page currently shows a single two-hour surf session from £40 and says all required equipment and coaching are included throughout."
    ],
    facts: [
      { label: "Lesson format", value: "Group, private and one-to-one lessons" },
      { label: "Duration", value: "2 hours" },
      { label: "Public starting price", value: "£40 for 1 surf session" },
      { label: "Equipment", value: "All required equipment included" },
      { label: "Coaching", value: "Suitable for first-timers through to more experienced surfers" },
      { label: "Accreditation", value: "Surfing England accredited Centre of Excellence" },
      { label: "Instructor note", value: "Official site says instructors are fully qualified beach lifeguards" },
      { label: "Minimum age", value: "Group lessons from age 8, private lessons for younger surfers" }
    ],
    websiteFacts: [
      "Woolacombe Surf Centre says it provides free session photos on most surf lessons",
      "One-to-one coaching is listed separately at £120 per session",
      "The school describes itself as village-based, with surf lessons centred around the Atlantic coastline"
    ],
    claimMailto: mailtoForSchool("Woolacombe Surf Centre")
  },
  {
    slug: "surfing-woolacombe",
    name: "Surfing Woolacombe",
    area: "Woolacombe",
    locationSlug: "woolacombe",
    locationLabel: "Woolacombe, North Devon",
    beachOrder: 3,
    website: "https://www.surfingwoolacombe.co.uk/surf-lessons",
    image: "https://images.pexels.com/photos/19641766/pexels-photo-19641766.jpeg?cs=srgb&dl=pexels-jonathanborba-19641766.jpg&fm=jpg",
    imageAlt: "Young surfer carrying a surfboard towards the sea used to illustrate Surfing Woolacombe",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Beach slipway surf school with showers, changing and private family options",
    priceLabel: "From £40",
    minPrice: 40,
    durationLabel: "1 to 2 hours",
    sortDurationMinutes: 60,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 8,
    levels: ["Beginner", "Intermediate", "Advanced", "Family"],
    summary: "Surfing Woolacombe lists taster group lessons from £40, longer course bundles and a wide range of private surf lesson formats from its beach slipway base in Woolacombe.",
    pageIntro: [
      "Surfing Woolacombe is positioned directly on the Woolacombe beach slipway and publishes group, private and family-oriented lesson options on its official surf lessons page.",
      "Surfbooker could verify showers, changing facilities, lockers, storage, four-season wetsuits and winter accessories from the school’s own surf lesson copy."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "1 hour to 2 hours depending on session type" },
      { label: "Public starting price", value: "£40 for a 2 hour taster group session" },
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
    locationLabel: "Croyde Bay, North Devon",
    beachOrder: 4,
    website: "https://www.surfsouthwest.com/learn-to-surf/half-day-surf-lesson/",
    image: "https://unsplash.com/photos/G5kEtnlSmeg/download?force=true&w=1400",
    imageAlt: "Learners and instructors in the water used to illustrate Surf South West in Croyde",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Croyde Bay surf school with group, private and adaptive options",
    priceLabel: "From £45",
    minPrice: 45,
    durationLabel: "2 hours",
    sortDurationMinutes: 120,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: null,
    levels: ["Beginner", "Intermediate", "Advanced"],
    summary: "Surf South West publishes two-hour half-day group surf lessons from £45 and separate private lesson pricing from its Croyde Bay base, while also advertising adaptive and performance products.",
    pageIntro: [
      "Surf South West says it has been running surf lessons at Croyde Bay since 1996 and lists half-day, two-day, weekend, five-day, private and adaptive options on its official site.",
      "The public half-day lesson page shows a two-hour session from £45 per person with all equipment included, while the broader school pages describe changing rooms, storage and specialist adaptive instruction."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "2 hours" },
      { label: "Public starting price", value: "£45 per person for the half-day lesson" },
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
    locationLabel: "Croyde Bay, North Devon",
    beachOrder: 4,
    website: "https://surfingcroydebay.co.uk/half-day-surf-lesson/",
    image: "https://unsplash.com/photos/7M3C8KjCEIQ/download?force=true&w=1400",
    imageAlt: "Beginner surfer riding a small wave used to illustrate Surfing Croyde Bay",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Croyde lesson hub with 2.5 hour group and private sessions",
    priceLabel: "From £30",
    minPrice: 30,
    durationLabel: "2.5 hours",
    sortDurationMinutes: 150,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 5,
    levels: ["Beginner", "Intermediate", "Advanced", "Family"],
    summary: "Surfing Croyde Bay publishes 2.5 hour half-day surf lessons from £30, private tuition and family options, with all equipment included and a 6:1 coaching ratio described on the official site.",
    pageIntro: [
      "Surfing Croyde Bay is one of the more detailed public lesson sites in the Surfbooker set. The official half-day page shows 2.5 hour group lessons from £30, private lessons, all equipment included and a maximum 6 students to 1 coach ratio.",
      "Surfbooker could also verify warm indoor changing, hot showers and family-focused lesson options from the provider’s public lesson pages."
    ],
    facts: [
      { label: "Lesson format", value: "Group and private lessons" },
      { label: "Duration", value: "2.5 hours" },
      { label: "Public starting price", value: "From £30 on the half-day surf lesson page" },
      { label: "Equipment", value: "All equipment included" },
      { label: "Changing", value: "Warm indoor changing and hot showers" },
      { label: "Group size", value: "Maximum 6 students to 1 coach" },
      { label: "Minimum age", value: "Lessons available from age 5" },
      { label: "Accreditation", value: "Official pages reference a Surfing England Centre of Excellence" }
    ],
    websiteFacts: [
      "Beginner surf lesson pages also show a £35 single lesson and £130 beginner private lesson",
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
    locationLabel: "Putsborough, North Devon",
    beachOrder: 5,
    website: "https://nickthorn.com/surf-school/",
    image: "https://unsplash.com/photos/VEmX6t4_MCQ/download?force=true&w=1400",
    imageAlt: "Casual surfer on a small wave used to illustrate Nick Thorn Surf Coaching at Putsborough",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Putsborough surf school with group, private and family sessions",
    priceLabel: "From £38",
    minPrice: 38,
    durationLabel: "1.5 to 2 hours",
    sortDurationMinutes: 90,
    formats: ["Group", "Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: 8,
    levels: ["Beginner", "Intermediate", "Advanced", "Family"],
    summary: "Nick Thorn Surf Coaching runs surf sessions from Putsborough beach and publishes public group pricing from £38, private coaching, family sessions and Surfing England accreditation on the official site.",
    pageIntro: [
      "Nick Thorn Surf Coaching describes itself as a Putsborough-based North Devon surf school and lifeguard training centre, with public surf school pricing for group sessions, private tuition and family sessions on the official page.",
      "Surfbooker could verify two-hour group lessons from £38, private coaching from 1.5 hours, family sessions and a broad age range around the Putsborough surf school offer."
    ],
    facts: [
      { label: "Lesson format", value: "Group, private and family sessions" },
      { label: "Duration", value: "1.5 hours to 2 hours" },
      { label: "Public starting price", value: "£38 for 1 group session" },
      { label: "Equipment", value: "Wetsuits, surfboards, boots, gloves and hoods available through the school" },
      { label: "Minimum age", value: "Surf school page says lessons are for ages 8 and above" },
      { label: "Accreditation", value: "Surfing England accredited and described as a lifeguard training centre" },
      { label: "Beach base", value: "Sessions run from Putsborough beach" },
      { label: "Facilities", value: "Putsborough beach facilities and cafe are highlighted on the official site" }
    ],
    websiteFacts: [
      "Group sessions, private tuition and family sessions all have public pricing on the school page",
      "Official copy says the team caters for individuals, groups, schools and corporate training days",
      "The provider also lists surf hire and paddleboarding from the same North Devon base"
    ],
    claimMailto: mailtoForSchool("Nick Thorn Surf Coaching")
  },
  {
    slug: "barefoot-surf-school",
    name: "Barefoot Surf School",
    area: "Putsborough",
    locationSlug: "putsborough",
    locationLabel: "Putsborough Sands, North Devon",
    beachOrder: 5,
    website: "https://www.barefootsurf.com/surf%20lessons.html",
    image: "https://images.pexels.com/photos/33384835/pexels-photo-33384835.jpeg?cs=srgb&dl=pexels-dark-astraal-1074241714-33384835.jpg&fm=jpg",
    imageAlt: "Surfers preparing on the sand used to illustrate Barefoot Surf School at Putsborough Sands",
    imageWidth: 1400,
    imageHeight: 933,
    subtitle: "Putsborough Sands private and family surf school",
    priceLabel: "From £100",
    minPrice: 100,
    durationLabel: "90 minutes",
    sortDurationMinutes: 90,
    formats: ["Private"],
    audience: ["Adults", "Children", "Family"],
    audienceLabel: "Adults, children and families",
    minAge: null,
    levels: ["Beginner", "Intermediate", "Advanced", "Family"],
    summary: "Barefoot Surf School focuses on private 1:1 or 2:1 coaching and family surf lessons at Putsborough Sands, with public prices from £100 and 90-minute sessions described on the official site.",
    pageIntro: [
      "Barefoot Surf School is a family-run, accredited surf school based at Putsborough. Its public lesson pages focus on private 1:1 or 2:1 tuition plus family surf lessons held at Putsborough Sands.",
      "Surfbooker could verify 90-minute lesson lengths, a £100 starting price for 1:1 lessons, board and wetsuit hire included in lesson pricing and a dedicated private instructor format from the provider’s own pages."
    ],
    facts: [
      { label: "Lesson format", value: "Private and family lessons" },
      { label: "Duration", value: "90 minutes" },
      { label: "Public starting price", value: "£100 for a 1:1 lesson" },
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
    name: "North Devon",
    label: "North Devon surf lessons",
    pageTitle: "North Devon Surf Lessons",
    intro: [
      "Surfbooker currently covers five North Devon surf lesson areas: Westward Ho!, Saunton Sands, Woolacombe, Croyde Bay and Putsborough. Across those beaches, the current production listing set covers 11 surf schools with public lesson pages.",
      "Use this page to move from the wider North Devon picture into the individual beach pages, then into each school page before you enquire or click through to the provider website."
    ],
    metaDescription: "Compare North Devon surf lessons across Westward Ho!, Saunton, Woolacombe, Croyde and Putsborough. Browse beach pages, public lesson details and individual surf school pages on Surfbooker.",
    relatedAreas: ["Westward Ho!", "Saunton", "Woolacombe", "Croyde", "Putsborough"]
  },
  {
    slug: "westward-ho",
    name: "Westward Ho!",
    label: "Westward Ho! surf lessons",
    pageTitle: "Surf lessons in Westward Ho!",
    intro: [
      "Westward Ho! is Surfbooker’s largest single beach cluster right now, with Ho! Surf, North Devon Surf School and Westward Waves Surf School all publishing surf lesson information for the area.",
      "Between them, Surfbooker could verify two-hour lesson products, wetsuit and equipment notes, and a mix of group or private coaching formats from each provider’s official pages."
    ],
    metaDescription: "Compare surf lessons in Westward Ho!, North Devon. Browse Ho! Surf, North Devon Surf School and Westward Waves with public lesson details and internal school pages.",
    relatedAreas: ["North Devon", "Saunton", "Woolacombe"]
  },
  {
    slug: "saunton",
    name: "Saunton",
    label: "Saunton surf lessons",
    pageTitle: "Surf lessons in Saunton",
    intro: [
      "Surfbooker’s Saunton pages currently cover Surf Saunton and Walking on Waves, two schools with detailed public lesson pages centred on Saunton Sands.",
      "The official websites in this area show a strong mix of group lessons, private coaching, kids products and progression-focused surf courses, plus practical details such as parking, changing and equipment."
    ],
    metaDescription: "Compare surf lessons in Saunton Sands, North Devon. Browse Surf Saunton and Walking on Waves with public lesson prices, formats and internal Surfbooker school pages.",
    relatedAreas: ["North Devon", "Westward Ho!", "Woolacombe"]
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
    metaDescription: "Compare surf lessons in Woolacombe, North Devon. Browse Woolacombe Surf Centre and Surfing Woolacombe with public lesson details and internal Surfbooker pages.",
    relatedAreas: ["North Devon", "Saunton", "Croyde"]
  },
  {
    slug: "croyde",
    name: "Croyde",
    label: "Croyde surf lessons",
    pageTitle: "Surf lessons in Croyde",
    intro: [
      "Surfbooker’s Croyde pages currently compare Surf South West and Surfing Croyde Bay. Both schools publish substantial surf lesson information, but their public lesson formats and pricing structure differ.",
      "If you want the clearest comparison, use this page first, then move into the individual school pages to compare 2-hour versus 2.5-hour lesson formats, public prices and facilities."
    ],
    metaDescription: "Compare surf lessons in Croyde Bay, North Devon. Browse Surf South West and Surfing Croyde Bay with public lesson prices, facilities and internal school pages.",
    relatedAreas: ["North Devon", "Woolacombe", "Putsborough"]
  },
  {
    slug: "putsborough",
    name: "Putsborough",
    label: "Putsborough surf lessons",
    pageTitle: "Surf lessons in Putsborough",
    intro: [
      "Putsborough is Surfbooker’s more private-coaching-led location set, with Nick Thorn Surf Coaching and Barefoot Surf School both publishing surf lesson information tied directly to Putsborough beach.",
      "These schools present different teaching styles and pricing structures, so Surfbooker’s internal pages help you compare group-friendly surf school products against private and family-focused coaching."
    ],
    metaDescription: "Compare surf lessons in Putsborough, North Devon. Browse Nick Thorn Surf Coaching and Barefoot Surf School with public lesson details and internal Surfbooker pages.",
    relatedAreas: ["North Devon", "Croyde", "Woolacombe"]
  }
];

const utilityPages = [
  {
    path: "contact/index.html",
    title: "Contact Surfbooker | Lesson and listing enquiries",
    description: "Contact Surfbooker about lesson enquiries, provider listings, claim requests or general product questions.",
    h1: "Contact Surfbooker",
    label: "Contact",
    intro: "Email hello@surfbooker.com or use the contact form for lesson questions, listing issues or provider enquiries.",
    body: `
      <section class="simple-card simple-copy">
        <div class="simple-grid">
          <div class="simple-card-content">
            <p>For direct contact you can email <a class="text-link" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>.</p>
            <p>Use the form if you want Surfbooker to follow up about an enquiry, a provider listing, a claim request or a page update.</p>
          </div>
          <div class="simple-card-content">
            <div class="simple-facts">
              <div><span>Email</span><strong>${escapeHtml(email)}</strong></div>
              <div><span>Use cases</span><strong>Enquiries, listings, claims and product questions</strong></div>
            </div>
          </div>
        </div>
      </section>
      <section class="simple-card">
        <form class="contact-form" name="contact-form" method="POST" action="/contact/" data-netlify="true" netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="contact-form">
          <p class="sr-only"><label>Do not fill this out if you're human: <input name="bot-field"></label></p>
          <label><span>Your name</span><input type="text" name="name" required></label>
          <label><span>Email</span><input type="email" name="email" required></label>
          <label>
            <span>Reason</span>
            <select name="reason">
              <option value="General question">General question</option>
              <option value="Lesson enquiry follow-up">Lesson enquiry follow-up</option>
              <option value="Claim or update a listing">Claim or update a listing</option>
              <option value="List a new surf school">List a new surf school</option>
            </select>
          </label>
          <label><span>Message</span><textarea name="message" rows="5" required></textarea></label>
          <button type="submit">Send message</button>
        </form>
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
        <p>Surfbooker also includes a lightweight Netlify-backed activity form used for basic event tracking such as listing views, school website clicks, searches and enquiries. No live Google Analytics or Microsoft Clarity script is installed on the production files generated in this repository.</p>
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
    description: "Ask Surfbooker to add a new surf school listing for North Devon or send provider details for review.",
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
  {
    path: "claim-or-update-a-listing/index.html",
    title: "Claim or update a listing | Surfbooker",
    description: "Claim an existing Surfbooker school page or send updated public lesson details to hello@surfbooker.com.",
    h1: "Claim or update a listing",
    label: "Providers",
    intro: "Use this page if your surf school is already listed on Surfbooker and you want to claim the page or correct the public details Surfbooker is using.",
    body: `
      <section class="simple-card simple-copy">
        <p>You can email <a class="text-link" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a> directly, or send the update through the form below. Surfbooker will use the information to review the page and update the listing where appropriate.</p>
      </section>
      <section class="simple-card">
        <form class="provider-form" name="claim-listing" method="POST" action="/claim-or-update-a-listing/" data-netlify="true" netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="claim-listing">
          <p class="sr-only"><label>Do not fill this out if you're human: <input name="bot-field"></label></p>
          <label><span>Surf school</span><input id="claim-school" type="text" name="school" required></label>
          <label><span>Contact name</span><input type="text" name="contact_name" required></label>
          <label><span>Email</span><input type="email" name="email" required></label>
          <label>
            <span>Request type</span>
            <select name="request_type">
              <option value="Claim listing">Claim listing</option>
              <option value="Update listing">Update listing</option>
              <option value="Remove incorrect detail">Remove incorrect detail</option>
            </select>
          </label>
          <label><span>Official page or evidence URL</span><input type="url" name="reference_url" placeholder="https://"></label>
          <label><span>Message</span><textarea name="message" rows="5" required></textarea></label>
          <button type="submit">Send claim request</button>
        </form>
      </section>
      <script>
        const params = new URLSearchParams(window.location.search);
        const school = params.get("school");
        if (school) {
          document.getElementById("claim-school").value = school.replace(/-/g, " ");
        }
      </script>
    `,
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Claim or update a listing", url: "/claim-or-update-a-listing/" }
    ]
  }
];

build();

function build() {
  write("index.html", renderHomePage());

  for (const page of utilityPages) {
    write(page.path, renderUtilityPage(page));
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
  const title = "Surf Lessons in North Devon | Compare and Enquire | Surfbooker";
  const description = "Compare surf lessons across Westward Ho!, Saunton, Woolacombe, Croyde and Putsborough. Filter by beach, lesson format, audience, public pricing and duration before you enquire.";
  const homeListings = schools.map(toListingData);
  const northDevonUrl = "/surf-lessons/north-devon/";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: `${baseUrl}/`,
        name: "Surfbooker",
        description: "Compare surf lessons and send lesson enquiries through Surfbooker."
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
        name: "North Devon surf schools on Surfbooker",
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
        mainEntity: [
          {
            "@type": "Question",
            name: "Does Surfbooker check live lesson availability?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Surfbooker sends your preferred lesson date with the enquiry, but each provider confirms availability directly."
            }
          },
          {
            "@type": "Question",
            name: "Can I compare group and private surf lessons?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Surfbooker lets you filter the production listing set by lesson format, audience, public price signals and duration."
            }
          },
          {
            "@type": "Question",
            name: "How do I claim or update a listing?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Each listing includes a direct claim or update route to hello@surfbooker.com and Surfbooker also provides a dedicated claim page."
            }
          }
        ]
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
  <link rel="icon" href="${logoIcon}" type="image/png">
  <link rel="apple-touch-icon" href="${logoIcon}">
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
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">North Devon surf lesson comparison</p>
          <h1>Find the right surf lesson.</h1>
          <p class="hero-text">Compare surf schools by beach, lesson format, public price signals, ability level and key practical details before you enquire.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#search-panel">Compare and enquire</a>
            <a class="button button-secondary" href="${northDevonUrl}">Browse North Devon pages</a>
          </div>
          <ul class="hero-stats" aria-label="Surfbooker overview">
            <li><strong>11 surf schools</strong><span>Current production listings across five North Devon beaches.</span></li>
            <li><strong>Lessons from £30</strong><span>Lowest verified public starting price found on a listed provider page.</span></li>
            <li><strong>5 North Devon beaches</strong><span>Westward Ho!, Saunton, Woolacombe, Croyde and Putsborough.</span></li>
          </ul>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <div class="wave-card wave-card-main">
            <span class="wave-chip">Compare first</span>
            <h2>Stay on Surfbooker long enough to compare the lesson fit properly.</h2>
            <p>Move from the North Devon overview into beach pages, then into each school page before you click out.</p>
          </div>
          <div class="wave-card wave-card-secondary">
            <span class="wave-chip">Enquiry workflow</span>
            <p>Preferred lesson dates are sent with your enquiry. Final times and spaces are confirmed by the school.</p>
          </div>
          <div class="forecast-orb"></div>
        </div>
      </section>

      <section class="search-panel" id="search-panel">
        <div class="section-heading">
          <p class="section-label">Lesson search</p>
          <h2>Compare and enquire in one place.</h2>
        </div>
        <form class="search-form" id="lesson-search-form">
          <label>
            <span>Beach / location</span>
            <select id="search-location" name="location">
              <option value="">Any North Devon beach</option>
              ${allAreas.map((area) => `<option value="${escapeHtml(area)}">${escapeHtml(area)}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>Preferred lesson date</span>
            <input id="search-date" name="date" type="date">
            <small class="field-note">This date is sent with your enquiry. It does not check live availability.</small>
          </label>
          <label>
            <span>Lesson format</span>
            <select id="search-format" name="format">
              ${formatOptions.map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>Ability level</span>
            <select id="search-ability" name="ability">
              <option value="">Any level</option>
              ${levelOptions.map((level) => `<option value="${escapeHtml(level)}">${escapeHtml(level)}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>Adults and children</span>
            <select id="search-party" name="party">
              ${audienceOptions.map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join("")}
            </select>
          </label>
          <button type="submit">Search lessons</button>
        </form>
      </section>

      <section class="section-grid" id="proof">
        <article class="feature-panel feature-panel-dark">
          <p class="section-label">How Surfbooker is built</p>
          <h2>Surfbooker compares public lesson pages before you enquire.</h2>
          <p>Use Surfbooker to move from location comparison to school pages, then send a lesson enquiry without losing the context you built during the comparison.</p>
        </article>
        <article class="feature-panel">
          <p class="section-label">Search and filter</p>
          <h3>Format, beach and duration</h3>
          <p>Filter the production listing set by lesson format, party fit, public pricing, minimum age, ability level and duration.</p>
        </article>
        <article class="feature-panel">
          <p class="section-label">Provider route</p>
          <h3>Claim or update pathway</h3>
          <p>Every listing includes a direct provider claim route to ${escapeHtml(email)} plus a dedicated claim page in the footer.</p>
        </article>
      </section>

      <section class="coverage-section" id="beaches">
        <div class="section-heading">
          <p class="section-label">North Devon pages</p>
          <h2>Move from the region to the beach, then to the school.</h2>
          <p class="section-note">Every school and beach in the current production set has its own static page with server-delivered HTML.</p>
        </div>
        <div class="coverage-grid coverage-grid-six">
          <a class="coverage-card" href="${northDevonUrl}">
            <h3>North Devon</h3>
            <p>Overview page covering all five surf lesson areas and the full school set.</p>
          </a>
          ${locations.filter((location) => location.slug !== "north-devon").map((location) => `
            <a class="coverage-card" href="/surf-lessons/${location.slug}/">
              <h3>${escapeHtml(location.name)}</h3>
              <p>${escapeHtml(locationSummary(location))}</p>
            </a>
          `).join("")}
        </div>
      </section>

      <section class="listings-section" id="lessons">
        <div class="section-heading">
          <p class="section-label">Surf school listings</p>
          <h2>Compare North Devon surf schools and lesson formats.</h2>
          <p class="section-note">Use the filters below to narrow by beach, lesson format, public price signals, minimum age, ability level and lesson duration.</p>
        </div>
        <div class="listing-note">${escapeHtml(listingNote)}</div>
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
              <option value="35">Up to £35</option>
              <option value="40">Up to £40</option>
              <option value="45">Up to £45</option>
              <option value="50">Up to £50</option>
              <option value="100">Up to £100</option>
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

        <div class="results-summary" id="results-summary" aria-live="polite"></div>
        <div class="listings-grid" id="listings-grid"></div>
      </section>

      <section class="process" id="how-it-works">
        <div class="section-heading">
          <p class="section-label">How it works</p>
          <h2>Compare, shortlist, then enquire.</h2>
        </div>
        <div class="process-grid">
          <article>
            <span class="step-number">01</span>
            <h3>Start with beach and format</h3>
            <p>Choose Westward Ho!, Saunton, Woolacombe, Croyde or Putsborough, then narrow the school set by group or private format.</p>
          </article>
          <article>
            <span class="step-number">02</span>
            <h3>Read the internal school pages</h3>
            <p>Use the internal Surfbooker pages to compare lesson length, public price signals, facilities and practical notes before you click away.</p>
          </article>
          <article>
            <span class="step-number">03</span>
            <h3>Send your preferred date</h3>
            <p>Surfbooker sends your preferred lesson date and party details with the enquiry, but the school confirms the final price and availability.</p>
          </article>
        </div>
      </section>

      <section class="faq-section" id="faq">
        <div class="section-heading">
          <p class="section-label">Frequently asked questions</p>
          <h2>Practical questions about the current Surfbooker flow.</h2>
        </div>
        <div class="faq-grid">
          <article class="faq-card">
            <h3>Does Surfbooker check live lesson availability?</h3>
            <p>No. The preferred lesson date is an enquiry field only. The provider confirms final availability and lesson times.</p>
          </article>
          <article class="faq-card">
            <h3>What does the price filter use?</h3>
            <p>Surfbooker uses verified public starting prices where they are clearly shown on an official school page. If a school does not publish a clear public starting price, it stays outside price filtering.</p>
          </article>
          <article class="faq-card">
            <h3>Can I compare lesson duration?</h3>
            <p>Yes. Use the duration sort to bring shorter or longer published lesson formats to the top of the current result set.</p>
          </article>
          <article class="faq-card">
            <h3>How do providers correct a listing?</h3>
            <p>Providers can use the mailto link on each listing or the footer claim page to send an update to ${escapeHtml(email)}.</p>
          </article>
        </div>
      </section>

      <section class="detail-section" id="listing-detail">
        <div class="section-heading">
          <p class="section-label">Selected surf school</p>
          <h2>Lesson details and enquiry panel.</h2>
        </div>
        <div class="detail-layout">
          <article class="detail-card">
            <div class="detail-image-column">
              <div class="detail-image-wrap">
                <img id="detail-image" alt="" width="1400" height="933">
              </div>
            </div>
            <div class="detail-copy">
              <div class="detail-meta">
                <p class="detail-location" id="detail-location"></p>
                <p class="detail-status" id="detail-status"></p>
              </div>
              ${renderGoogleRatingSlot(homeListings[0].slug, "detail", "detail-google-rating")}
              <h3 id="detail-name"></h3>
              <p class="detail-subtitle" id="detail-subtitle" hidden></p>
              <p class="detail-description" id="detail-description"></p>
              <div class="detail-specs" id="detail-specs"></div>
              <div class="detail-facts" id="detail-facts"></div>
              <div class="detail-levels">
                <h4>Ability levels</h4>
                <div class="chip-row" id="detail-levels-list"></div>
              </div>
              <div class="detail-actions">
                <a class="button button-primary detail-link" id="detail-page-link" href="#">View lesson details</a>
                <a class="text-link" id="detail-website" href="#" target="_blank" rel="noopener noreferrer">Visit school website</a>
              </div>
              <a class="claim-link" id="detail-claim-link" href="#">Own this surf school? Claim or update this listing</a>
            </div>
          </article>

          <aside class="booking-panel">
            <div class="booking-copy">
              <p class="section-label">Surfbooker enquiry</p>
              <h3>Send a lesson enquiry</h3>
              <p>Choose a school, add your preferred lesson date and party details, and Surfbooker will send the enquiry to ${escapeHtml(email)}.</p>
            </div>
            <form class="booking-form" id="booking-form" name="lesson-enquiry" method="POST" action="/" data-netlify="true" netlify-honeypot="bot-field">
              <input type="hidden" name="form-name" value="lesson-enquiry">
              <input type="hidden" name="submission_type" value="Surfbooker lesson enquiry">
              <p class="sr-only">
                <label>Do not fill this out if you're human: <input name="bot-field"></label>
              </p>
              <input id="booking-school" name="school" type="hidden">
              <input id="booking-school-slug" name="school_slug" type="hidden">
              <input id="booking-location" name="lesson_location" type="hidden">
              <input id="booking-provider-url" name="provider_url" type="hidden">
              <input id="booking-page" name="source_page" type="hidden" value="/#listing-detail">
              <label>
                <span>Your name</span>
                <input name="name" type="text" placeholder="Full name" required>
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" placeholder="you@example.com" required>
              </label>
              <label>
                <span>Preferred lesson date</span>
                <input id="booking-date" name="preferred_date" type="date" required>
                <small class="field-note">This date is sent with your enquiry. It does not check live availability.</small>
              </label>
              <label>
                <span>Adults and children</span>
                <input id="booking-party" name="party" type="text" placeholder="2 adults, 1 child" required>
              </label>
              <label>
                <span>Ability level</span>
                <select id="booking-level" name="ability_level" required>
                  <option value="">Select ability</option>
                  ${levelOptions.map((level) => `<option value="${escapeHtml(level)}">${escapeHtml(level)}</option>`).join("")}
                </select>
              </label>
              <label>
                <span>Extra notes</span>
                <textarea name="notes" rows="4" placeholder="Add anything the school should know before they reply."></textarea>
              </label>
              <button type="submit" id="booking-submit">Send enquiry</button>
              <p class="form-status" id="form-status" aria-live="polite"></p>
            </form>
          </aside>
        </div>
      </section>
    </main>

    ${renderFooter()}
  </div>

  <form name="site-activity" hidden data-netlify="true">
    <input type="hidden" name="form-name" value="site-activity">
    <input type="text" name="event_type">
    <input type="text" name="event_target">
    <input type="text" name="event_detail">
    <input type="text" name="page_url">
    <input type="text" name="timestamp">
  </form>

  <script>
    const listings = ${escapeScript(JSON.stringify(homeListings))};
    const listingsGrid = document.getElementById("listings-grid");
    const resultsSummary = document.getElementById("results-summary");
    const formStatus = document.getElementById("form-status");
    const searchForm = document.getElementById("lesson-search-form");
    const bookingForm = document.getElementById("booking-form");
    const bookingSubmit = document.getElementById("booking-submit");
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
    const searchFields = {
      location: document.getElementById("search-location"),
      date: document.getElementById("search-date"),
      format: document.getElementById("search-format"),
      ability: document.getElementById("search-ability"),
      party: document.getElementById("search-party")
    };
    const detailRefs = {
      image: document.getElementById("detail-image"),
      location: document.getElementById("detail-location"),
      status: document.getElementById("detail-status"),
      name: document.getElementById("detail-name"),
      subtitle: document.getElementById("detail-subtitle"),
      description: document.getElementById("detail-description"),
      specs: document.getElementById("detail-specs"),
      facts: document.getElementById("detail-facts"),
      levels: document.getElementById("detail-levels-list"),
      rating: document.getElementById("detail-google-rating"),
      pageLink: document.getElementById("detail-page-link"),
      websiteLink: document.getElementById("detail-website"),
      claimLink: document.getElementById("detail-claim-link"),
      schoolInput: document.getElementById("booking-school"),
      schoolSlugInput: document.getElementById("booking-school-slug"),
      locationInput: document.getElementById("booking-location"),
      providerUrlInput: document.getElementById("booking-provider-url")
    };

    const sortLabels = {
      recommended: "Recommended",
      "lowest-price": "Lowest price",
      "shortest-duration": "Lesson duration",
      location: "Location"
    };

    let activeListing = listings[0];

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
      }).catch(() => {
        // Best effort only.
      });
    }

    function getPriceSortValue(listing) {
      return typeof listing.minPrice === "number" ? listing.minPrice : Number.POSITIVE_INFINITY;
    }

    function getDurationSortValue(listing) {
      return typeof listing.sortDurationMinutes === "number" ? listing.sortDurationMinutes : Number.POSITIVE_INFINITY;
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

      if (age !== null) {
        if (typeof listing.minAge !== "number" || listing.minAge > age) {
          return false;
        }
      }

      if (price !== null) {
        if (typeof listing.minPrice !== "number" || listing.minPrice > price) {
          return false;
        }
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

    function renderDetail(listing) {
      activeListing = listing;
      detailRefs.image.src = listing.image;
      detailRefs.image.alt = listing.imageAlt;
      detailRefs.image.width = listing.imageWidth;
      detailRefs.image.height = listing.imageHeight;
      detailRefs.location.textContent = listing.locationLabel;
      detailRefs.status.textContent = typeof listing.minPrice === "number"
        ? listing.priceLabel + " public starting price. Final price and availability are confirmed by the school."
        : "Final price and availability are confirmed by the school.";
      detailRefs.name.textContent = listing.name;
      detailRefs.subtitle.textContent = listing.subtitle || "";
      detailRefs.subtitle.hidden = !listing.subtitle;
      detailRefs.description.textContent = listing.summary;
      detailRefs.specs.innerHTML = [
        "<div><span>Lesson format</span><strong>" + listing.specFormats + "</strong></div>",
        "<div><span>Duration</span><strong>" + listing.durationLabel + "</strong></div>",
        "<div><span>Audience</span><strong>" + listing.specAudience + "</strong></div>",
        "<div><span>Price</span><strong>" + listing.priceLabel + "</strong></div>"
      ].join("");
      detailRefs.facts.innerHTML = listing.facts.map((fact) => {
        return "<div><span>" + fact.label + "</span><strong>" + fact.value + "</strong></div>";
      }).join("");
      detailRefs.levels.innerHTML = listing.levels.map((level) => "<span>" + level + "</span>").join("");
      detailRefs.rating.dataset.schoolSlug = listing.slug;
      detailRefs.pageLink.href = listing.detailUrl;
      detailRefs.websiteLink.href = listing.website;
      detailRefs.claimLink.href = listing.claimMailto;
      detailRefs.schoolInput.value = listing.name;
      detailRefs.schoolSlugInput.value = listing.slug;
      detailRefs.locationInput.value = listing.locationLabel;
      detailRefs.providerUrlInput.value = listing.website;
    }

    function renderListings() {
      const visibleListings = sortListings(listings.filter(matchesFilters));
      resultsSummary.textContent = visibleListings.length + " surf school" + (visibleListings.length === 1 ? "" : "s") + " shown. Sorted by " + sortLabels[filters.sort.value] + ".";

      if (!visibleListings.length) {
        listingsGrid.innerHTML = "<article class=\\"empty-state\\"><h3>No matching surf schools</h3><p>Adjust the filters to widen the North Devon lesson shortlist.</p></article>";
        return;
      }

      if (!visibleListings.some((listing) => listing.slug === activeListing.slug)) {
        renderDetail(visibleListings[0]);
      }

      listingsGrid.innerHTML = visibleListings.map((listing) => {
        return \`
          <article class="listing-card" data-slug="\${listing.slug}">
            <div class="listing-image-wrap">
              <img src="\${listing.image}" alt="\${listing.imageAlt}" width="\${listing.imageWidth}" height="\${listing.imageHeight}" loading="lazy" decoding="async">
            </div>
            <div class="listing-card-body">
              <div class="listing-topline">
                <p>\${listing.locationLabel}</p>
                <span>\${listing.specFormats}</span>
              </div>
              <h3>\${listing.name}</h3>
              \${listing.subtitle ? "<p class=\\"listing-subtitle\\">" + listing.subtitle + "</p>" : ""}
              <div class="listing-meta">
                <strong>\${listing.priceLabel}</strong>
                <span>\${listing.durationLabel}</span>
              </div>
              <div class="google-rating" data-google-rating data-school-slug="\${listing.slug}" data-rating-variant="card">
                <p class="google-rating-loading">Loading Google rating...</p>
              </div>
              <div class="chip-row">
                \${listing.levels.map((level) => "<span>" + level + "</span>").join("")}
              </div>
              <p class="listing-copy">\${listing.summary}</p>
              <div class="facts-grid">
                \${listing.facts.map((fact) => "<div><span>" + fact.label + "</span><strong>" + fact.value + "</strong></div>").join("")}
              </div>
              <div class="listing-actions">
                <a class="button button-primary listing-detail-link" href="\${listing.detailUrl}" data-school="\${listing.slug}">View lesson details</a>
                <a class="text-link listing-website" href="\${listing.website}" target="_blank" rel="noopener noreferrer" data-school="\${listing.slug}">Visit school website</a>
              </div>
              <a class="claim-link" href="\${listing.claimMailto}">Own this surf school? Claim or update this listing</a>
            </div>
          </article>
        \`;
      }).join("");

      document.querySelectorAll(".listing-card").forEach((card) => {
        card.addEventListener("click", (event) => {
          if (event.target.closest("a, button")) {
            return;
          }

          const listing = listings.find((item) => item.slug === card.dataset.slug);
          if (!listing) {
            return;
          }

          renderDetail(listing);
          trackEvent("listing_view", listing.slug, "homepage-card");
          document.getElementById("listing-detail").scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });

      document.querySelectorAll(".listing-detail-link").forEach((link) => {
        link.addEventListener("click", () => {
          trackEvent("listing_view", link.dataset.school, "compare-link");
        });
      });

      document.querySelectorAll(".listing-website").forEach((link) => {
        link.addEventListener("click", () => {
          trackEvent("website_click", link.dataset.school, link.href);
        });
      });
    }

    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      filters.area.value = searchFields.location.value;
      filters.format.value = searchFields.format.value;
      filters.level.value = searchFields.ability.value;
      filters.audience.value = searchFields.party.value;
      renderListings();
      document.getElementById("lessons").scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("booking-date").value = searchFields.date.value;
      document.getElementById("booking-level").value = searchFields.ability.value;
      document.getElementById("booking-party").value = searchFields.party.value === "Family" ? "2 adults, 1 child" : searchFields.party.value;
      trackEvent("search", filters.area.value || "all-beaches", JSON.stringify({
        area: filters.area.value,
        format: filters.format.value,
        level: filters.level.value,
        audience: filters.audience.value,
        preferred_date: searchFields.date.value
      }));
    });

    Object.values(filters).forEach((field) => {
      field.addEventListener("input", renderListings);
      field.addEventListener("change", renderListings);
    });

    detailRefs.websiteLink.addEventListener("click", () => {
      trackEvent("website_click", activeListing.slug, activeListing.website);
    });

    detailRefs.pageLink.addEventListener("click", () => {
      trackEvent("listing_view", activeListing.slug, "detail-panel-link");
    });

    bookingForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      formStatus.textContent = "Sending enquiry...";
      bookingSubmit.disabled = true;

      const payload = {
        "form-name": bookingForm.getAttribute("name"),
        submission_type: bookingForm.elements["submission_type"].value,
        "bot-field": bookingForm.elements["bot-field"].value,
        school: detailRefs.schoolInput.value,
        school_slug: detailRefs.schoolSlugInput.value,
        lesson_location: detailRefs.locationInput.value,
        provider_url: detailRefs.providerUrlInput.value,
        source_page: bookingForm.elements["source_page"].value,
        name: bookingForm.elements["name"].value,
        email: bookingForm.elements["email"].value,
        preferred_date: bookingForm.elements["preferred_date"].value,
        party: bookingForm.elements["party"].value,
        ability_level: bookingForm.elements["ability_level"].value,
        notes: bookingForm.elements["notes"].value
      };

      try {
        const response = await fetch("/", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: encodeForm(payload)
        });

        if (!response.ok) {
          throw new Error("Submission failed");
        }

        formStatus.textContent = "Enquiry sent. Check your inbox for follow-up and confirm final lesson availability with the school.";
        trackEvent("enquiry", activeListing.slug, bookingForm.elements["preferred_date"].value);
        bookingForm.reset();
        detailRefs.schoolInput.value = activeListing.name;
        detailRefs.schoolSlugInput.value = activeListing.slug;
        detailRefs.locationInput.value = activeListing.locationLabel;
        detailRefs.providerUrlInput.value = activeListing.website;
      } catch (error) {
        formStatus.textContent = "The enquiry could not be sent just now. Try again, or use the school website directly.";
      } finally {
        bookingSubmit.disabled = false;
      }
    });

    const requestedSchool = new URLSearchParams(window.location.search).get("school");
    const requestedListing = requestedSchool ? listings.find((listing) => listing.slug === requestedSchool) : null;
    if (requestedListing) {
      activeListing = requestedListing;
      renderDetail(requestedListing);
      document.getElementById("listing-detail").scrollIntoView({ behavior: "auto", block: "start" });
    } else {
      renderDetail(activeListing);
    }
    renderListings();
  </script>
</body>
</html>`;
}

function renderLocationPage(location) {
  const areaSchools = getSchoolsForLocation(location.slug);
  const title = location.slug === "north-devon"
    ? `${location.pageTitle} | Compare and Enquire | Surfbooker`
    : `${location.pageTitle}, North Devon | Compare and Enquire | Surfbooker`;
  const description = location.metaDescription;
  const path = `/surf-lessons/${location.slug}/`;
  const breadcrumbs = location.slug === "north-devon"
    ? [
        { name: "Home", url: "/" },
        { name: location.pageTitle, url: path }
      ]
    : [
        { name: "Home", url: "/" },
        { name: "North Devon surf lessons", url: "/surf-lessons/north-devon/" },
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
        <a class="button button-primary" href="/#lessons">Compare and enquire</a>
        <a class="button button-secondary" href="${location.slug === "north-devon" ? "#nearby-pages" : "/surf-lessons/north-devon/"}">${location.slug === "north-devon" ? "Browse beach pages" : "View North Devon overview"}</a>
      </div>
      <p class="page-note">${escapeHtml(listingNote)}</p>
    `,
    breadcrumbs,
    jsonLd,
    mainContent: `
      <section class="simple-card">
        <div class="simple-facts">
          <div><span>Listed schools</span><strong>${areaSchools.length}</strong></div>
          <div><span>Lesson formats</span><strong>${summariseFormats(areaSchools)}</strong></div>
          <div><span>Lowest verified price</span><strong>${lowestPriceLabel(areaSchools)}</strong></div>
          <div><span>Internal pages</span><strong>${areaSchools.length} school pages plus this location page</strong></div>
        </div>
      </section>
      ${location.slug === "north-devon" ? `
      <section class="coverage-section" id="nearby-pages">
        <div class="section-heading">
          <p class="section-label">Beach pages</p>
          <h2>Move from the North Devon overview into individual beach pages.</h2>
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
          <h2>${location.slug === "north-devon" ? "Static comparison cards for the full North Devon school set." : `Static comparison cards for ${escapeHtml(location.pageTitle.toLowerCase())}.`}</h2>
          <p class="section-note">${escapeHtml(listingNote)}</p>
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
  const description = `Compare public surf lesson details for ${school.name} in ${school.locationLabel}. Review lesson format, duration, verified price signals and practical notes before you enquire.`;
  const path = `/surf-schools/${school.slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems([
          { name: "Home", url: "/" },
          { name: "North Devon surf lessons", url: "/surf-lessons/north-devon/" },
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
    label: "Surf school page",
    intro: school.pageIntro[0],
    heroChildren: `
      ${school.subtitle ? `<p class="simple-kicker">${escapeHtml(school.subtitle)}</p>` : ""}
      <p>${escapeHtml(school.pageIntro[1])}</p>
      <div class="simple-actions">
        <a class="button button-primary" href="/?school=${escapeHtml(school.slug)}#listing-detail">Compare and enquire via Surfbooker</a>
        <a class="button button-secondary" href="${escapeHtml(school.website)}" target="_blank" rel="noopener noreferrer" data-track-website="${escapeHtml(school.slug)}">Visit school website</a>
      </div>
      <p class="page-note">Preferred lesson dates are sent with your Surfbooker enquiry. Final times, prices and availability are confirmed by the school.</p>
    `,
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "North Devon surf lessons", url: "/surf-lessons/north-devon/" },
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
            <p class="detail-status">${typeof school.minPrice === "number" ? `${escapeHtml(school.priceLabel)} public starting price.` : "Price should be confirmed on the school website."}</p>
          </div>
          ${renderGoogleRatingSlot(school.slug, "detail")}
          <h2>What Surfbooker could verify</h2>
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
            <a class="button button-primary" href="/?school=${escapeHtml(school.slug)}#listing-detail">Compare and enquire via Surfbooker</a>
            <a class="text-link" href="${escapeHtml(school.website)}" target="_blank" rel="noopener noreferrer" data-track-website="${escapeHtml(school.slug)}">Visit school website</a>
          </div>
          <a class="claim-link" href="${escapeHtml(school.claimMailto)}">Own this surf school? Claim or update this listing</a>
        </div>
      </section>
      <section class="simple-card simple-copy">
        <h2>Key notes from the official school pages</h2>
        <ul class="simple-list">
          ${school.websiteFacts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join("")}
        </ul>
      </section>
      <section class="simple-card simple-copy">
        <h2>Related Surfbooker pages</h2>
        <div class="footer-links">
          <a href="/surf-lessons/${location.slug}/">${escapeHtml(location.pageTitle)}</a>
          <a href="/surf-lessons/north-devon/">North Devon surf lessons</a>
          <a href="/claim-or-update-a-listing/?school=${escapeHtml(school.slug)}">Claim or update this listing</a>
        </div>
      </section>
      ${renderTrackingForm()}
      <script>
        ${trackingScript("listing_view", school.slug, "school-page")}
        document.querySelectorAll("[data-track-website]").forEach((link) => {
          link.addEventListener("click", () => trackEvent("website_click", "${escapeScript(school.slug)}", link.href));
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

function renderNotFoundPage() {
  const title = "Page not found | Surfbooker";
  const description = "The page you were looking for does not exist. Return to the Surfbooker homepage or one of the North Devon surf lesson pages.";

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
  <link rel="icon" href="${logoIcon}" type="image/png">
  <link rel="apple-touch-icon" href="${logoIcon}">
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
          <a class="button button-secondary" href="/surf-lessons/north-devon/">View North Devon overview</a>
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

function renderStandardPage({ title, description, path, h1, label, intro, heroChildren, breadcrumbs, jsonLd, mainContent }) {
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
  <meta property="og:image" content="${baseUrl}${logoBackground}">
  <meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${baseUrl}${logoBackground}">
  <link rel="icon" href="${logoIcon}" type="image/png">
  <link rel="apple-touch-icon" href="${logoIcon}">
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
  return `
    <article class="listing-card static-listing-card">
      <div class="listing-image-wrap">
        <img src="${escapeHtml(school.image)}" alt="${escapeHtml(school.imageAlt)}" width="${school.imageWidth}" height="${school.imageHeight}" loading="lazy" decoding="async">
      </div>
      <div class="listing-card-body">
        <div class="listing-topline">
          <p>${escapeHtml(school.locationLabel)}</p>
          <span>${escapeHtml(specFormatLabel(school))}</span>
        </div>
        <h3>${escapeHtml(school.name)}</h3>
        ${school.subtitle ? `<p class="listing-subtitle">${escapeHtml(school.subtitle)}</p>` : ""}
        <div class="listing-meta">
          <strong>${escapeHtml(school.priceLabel)}</strong>
          <span>${escapeHtml(school.durationLabel)}</span>
        </div>
        ${renderGoogleRatingSlot(school.slug)}
        <div class="chip-row">
          ${school.levels.map((level) => `<span>${escapeHtml(level)}</span>`).join("")}
        </div>
        <p class="listing-copy">${escapeHtml(school.summary)}</p>
        <div class="facts-grid">
          ${school.facts.slice(0, 4).map((fact) => `<div><span>${escapeHtml(fact.label)}</span><strong>${escapeHtml(fact.value)}</strong></div>`).join("")}
        </div>
        <div class="listing-actions">
          <a class="button button-primary" href="${escapeHtml(comparePathForSchool(school))}">View lesson details</a>
          <a class="text-link" href="${escapeHtml(school.website)}" target="_blank" rel="noopener noreferrer">Visit school website</a>
        </div>
        <a class="claim-link" href="${escapeHtml(school.claimMailto)}">Own this surf school? Claim or update this listing</a>
      </div>
    </article>
  `;
}

function renderHeader() {
  return `
    <header class="site-header">
      <a class="brand" href="/">
        <img class="brand-logo" src="${logoIcon}" alt="" width="1254" height="1254">
        <span class="brand-wordmark">Surfbooker</span>
      </a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="/surf-lessons/north-devon/">North Devon</a>
        <a href="/#lessons">Schools</a>
        <a href="/list-your-surf-school/">List your surf school</a>
        <a href="/contact/">Contact</a>
      </nav>
      <a class="header-cta" href="/#search-panel">Compare and enquire</a>
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
      <p class="footer-disclaimer">${escapeHtml(sharedDisclaimer)}</p>
      <div class="footer-links">
        <a href="/contact/">Contact</a>
        <a href="/privacy/">Privacy</a>
        <a href="/terms/">Terms</a>
        <a href="/list-your-surf-school/">List your surf school</a>
        <a href="/claim-or-update-a-listing/">Claim or update a listing</a>
      </div>
      <p class="footer-meta"><a class="text-link" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
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
    "/contact/",
    "/privacy/",
    "/terms/",
    "/list-your-surf-school/",
    "/claim-or-update-a-listing/",
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
  return areaSchools.map((school) => school.name).join(", ");
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
    return "Check school websites";
  }
  return `From £${Math.min(...prices)}`;
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
  return `/?school=${school.slug}#listing-detail`;
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
    claimMailto: school.claimMailto
  };
}

function mailtoForSchool(schoolName) {
  const subject = `Claim or update listing: ${schoolName}`;
  const body = `Hi Surfbooker,%0D%0A%0D%0AI want to claim or update the listing for ${schoolName}.%0D%0A%0D%0AThanks`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
}

function write(relativePath, content) {
  const filePath = join(rootDir, relativePath);
  mkdirSync(dirname(filePath), { recursive: true });
  const output = /\.html$/i.test(relativePath) ? "\ufeff" + content : content;
  writeFileSync(filePath, output);
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

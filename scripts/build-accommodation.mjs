import { placeImages } from "./lib/place-images.mjs";
import { loadDestinations } from "./build-destination-guides.mjs";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { accommodationCandidates, allAccommodationCandidates } from "../data/accommodation-candidates.mjs";
import { southernEnglandSpots } from "../data/southern-england-expansion.mjs";
import { scotlandSpots } from "../data/scotland-expansion.mjs";
import { northernIrelandSpots } from "../data/northern-ireland-expansion.mjs";
import { northeastSpots } from "../data/northeast-expansion.mjs";

const baseUrl = "https://surfbooker.com";
const westwardImage = "/images/accommodation/westward-ho/Westward%20Ho%20Accommodation.jpg";

const representativeImagePools = {
  generic: [
    "/images/generic surfer.jpeg",
    "/images/generic wave.jpg",
    "/images/lineup.avif",
    "/images/Sunset surfer sat in water.jpg",
    "/images/sunset surfers on beach.jpg",
    "/images/Surfer on water ariel.avif",
    "/images/Surfer on wave 2.avif",
    "/images/Surfer on wave.webp",
    "/images/Surfers in waves.jpg",
    "/images/Surfers on beach.avif"
  ],
  "north-devon": [
    "/guides/westwardho!/beach-front.jpg",
    "/guides/westwardho!/board-on-beach.jpg",
    "/guides/westwardho!/grass-area.jpg",
    "/guides/westwardho!/Northam Burrows.jpg",
    "/guides/westwardho!/northam-burrows.jpg",
    "/guides/westwardho!/westward ho 1.jpeg",
    "/guides/westwardho!/Westward ho slipway.jpg",
    "/guides/Croyde/Croyde 4.jpg",
    "/guides/Croyde/Croyde beach and cliff view.jpg",
    "/guides/Croyde/Croyde clifftop view.jpg",
    "/guides/Croyde/Croyde Clifftop.jpg",
    "/guides/Croyde/Croyde Seafront.jpg",
    "/guides/Croyde/Croyde town.jpg",
    "/guides/Croyde/Croyde water and sand 2.jpg",
    "/guides/Croyde/Croyde water and sand 3.jpg",
    "/guides/Croyde/Croyde water and sand ariel.jpg",
    "/guides/Croyde/Croyde water and sand.jpg",
    "/guides/Saunton/Cliff top view.jpg",
    "/guides/Saunton/clifftop ariel 2.jpg",
    "/guides/Saunton/clifftop ariel.jpg",
    "/guides/Saunton/pexels-tobi-4721583.jpg",
    "/guides/Saunton/Saunton from beach.jpg",
    "/guides/Putsborough/beach from sea.jpg",
    "/guides/Putsborough/beach surfer.jpeg",
    "/guides/Putsborough/beach wide shot main.jpeg",
    "/guides/Putsborough/beach.jpeg",
    "/guides/Putsborough/clifftop.avif",
    "/guides/Putsborough/surfer on beach sunset.avif",
    "/guides/Woolacombe/ariel of area.avif",
    "/guides/Woolacombe/ariel whole beach.avif",
    "/guides/Woolacombe/Beach huts.jpg",
    "/guides/Woolacombe/clifftop sign.avif",
    "/guides/Woolacombe/road into town.avif",
    "/guides/Woolacombe/sunset.avif",
    "/guides/Lynmouth/ariel.jpeg",
    "/guides/Lynmouth/surfer on wave.jpg",
    "/guides/Lynmouth/town street.jpeg",
    "/guides/Lynmouth/waves from road.jpeg",
    "/images/Instow Sunset 3.JPEG",
    "/images/view of westard ho across northam burrows.jpg"
  ],
  "south-devon": [
    "/guides/Bantham/beach too.jpeg",
    "/guides/Bantham/holiday makers on beach.jpeg",
    "/guides/Bantham/Sunset waves.jpeg",
    "/guides/Bantham/surfers on wave.jpeg",
    "/guides/Bigbury-on-sea/ariel.jpeg",
    "/guides/Bigbury-on-sea/beach rocks.jpeg",
    "/guides/Bigbury-on-sea/clifftop sign.jpeg",
    "/guides/Bigbury-on-sea/zoomed out view.jpeg",
    "/guides/Challaborough/ariel beach and town.jpg",
    "/guides/Challaborough/beach and town.jpg",
    "/guides/Challaborough/surfer on wve 2.jpeg",
    "/guides/Challaborough/wave.jpeg"
  ],
  cornwall: [
    "/guides/_licensed-images/cornwall/summerleaze.jpg",
    "/guides/_licensed-images/cornwall/widemouth-bay.jpg",
    "/guides/_licensed-images/cornwall/polzeath.jpg",
    "/guides/_licensed-images/cornwall/harlyn-bay.jpg",
    "/guides/_licensed-images/cornwall/constantine-bay.jpg",
    "/guides/_licensed-images/cornwall/mawgan-porth.jpg",
    "/guides/_licensed-images/cornwall/watergate-bay.jpg",
    "/guides/_licensed-images/cornwall/fistral-beach.jpg",
    "/guides/_licensed-images/cornwall/towan-beach.jpg",
    "/guides/_licensed-images/cornwall/great-western-beach.jpg",
    "/guides/_licensed-images/cornwall/crantock-beach.jpg",
    "/guides/_licensed-images/cornwall/holywell-bay.jpg",
    "/guides/_licensed-images/cornwall/perranporth.jpg",
    "/guides/_licensed-images/cornwall/porthtowan.jpg",
    "/guides/_licensed-images/cornwall/trevaunance-cove.jpg",
    "/guides/_licensed-images/cornwall/gwithian-godrevy.jpg",
    "/guides/_licensed-images/cornwall/hayle-towans.jpg",
    "/guides/_licensed-images/cornwall/porthmeor-beach.jpg",
    "/guides/_licensed-images/cornwall/sennen-cove.jpg",
    "/guides/_licensed-images/cornwall/praa-sands.jpg"
  ]
};

const nearImage = (slug, fallback) => placeImages(slug)[0] ? "/" + placeImages(slug)[0].split("/").map(encodeURIComponent).join("/").replace(/%21/g, "!") : fallback;
const existingAccommodationAreas = [
  {
    slug: "westward-ho",
    regionSlug: "north-devon",
    name: "Westward Ho!",
    eyebrow: "Westward Ho! accommodation",
    h1: "Where to stay in Westward Ho!",
    intro: "Find a surf-friendly base near the beach, surf schools, Northam Burrows and everything needed for a relaxed North Devon break.",
    summary: "Stay close to the beach, surf schools, cafés and a lively seafront.",
    bestFor: "Surf weekends, families and first-time surf trips",
    surfAccess: "Much of the village is walkable to Westward Ho! beach",
    localFeel: "Beachfront, practical and easy-going",
    nearby: "Northam Burrows, Appledore, Instow and Bideford",
    why: "Westward Ho! is a straightforward choice for surf weekends, family breaks and first-time surf trips. The beach, surf lessons, equipment hire, cafés, places to eat and evening drinks are close together, so it is easy to spend less time driving and more time by the water.",
    image: westwardImage,
    imageAlt: "Westward Ho! beach and seafront in North Devon",
    placeholder: false
  },
  {
    slug: "northam",
    regionSlug: "north-devon",
    name: "Northam",
    eyebrow: "Northam accommodation",
    h1: "Where to stay in Northam",
    intro: "A quieter North Devon base beside Northam Burrows, with easy access to Westward Ho! beach and more room to slow down.",
    summary: "A quieter base beside Northam Burrows, with more space and easy beach access.",
    bestFor: "Quieter stays, dog walks, families and outdoor time",
    surfAccess: "Short walk or drive to Westward Ho! depending on the property",
    localFeel: "Residential, open and close to the Burrows",
    nearby: "Westward Ho!, Bideford and Appledore",
    why: "Northam suits visitors who want a calmer residential base, open space and easy access to Northam Burrows. Westward Ho! beach, surf lessons and hire remain close, while the village offers a quieter place to return to after a day outside.",
    image: "/images/accommodation/northam/Northam%20Accommodation.jpg",
    imageAlt: "View across Northam Burrows towards Westward Ho!, North Devon",
    placeholder: false
  },
  {
    slug: "instow",
    regionSlug: "north-devon",
    name: "Instow",
    eyebrow: "Instow accommodation",
    h1: "Where to stay in Instow",
    intro: "An estuary-front base for relaxed coastal stays, family beach walks, local food and easy day trips to Westward Ho!.",
    summary: "An estuary-front village for relaxed stays, family beach walks and excellent local food.",
    bestFor: "Families, couples, dog-friendly breaks and food-focused stays",
    surfAccess: "A short drive to Westward Ho! for surf",
    localFeel: "Relaxed estuary village with waterfront views",
    nearby: "Appledore, Bideford and Westward Ho!",
    why: "Instow works well for visitors who value relaxed waterfront walks, family time and good local food as much as time in the surf. It has an easy estuary-village pace, with Westward Ho! close enough for lessons, hire and surf sessions by car.",
    image: "/images/accommodation/instow/Instow%20Accommodation.JPEG",
    imageAlt: "Sunset over the estuary at Instow, North Devon",
    placeholder: false
  },
  {
    slug: "appledore",
    regionSlug: "north-devon",
    name: "Appledore",
    eyebrow: "Appledore accommodation",
    h1: "Where to stay in Appledore",
    intro: "Stay in a historic North Devon fishing village with characterful streets, independent food, pubs and an easy drive to Westward Ho!.",
    summary: "A characterful fishing village with independent places to eat, pubs and a slower coastal feel.",
    bestFor: "Couples, food lovers, character stays and slower coastal weekends",
    surfAccess: "A short drive to Westward Ho! for surf",
    localFeel: "Historic, independent and village-focused",
    nearby: "Instow, Bideford and Westward Ho!",
    why: "Appledore is a good match for visitors who want character, independent places to eat and a slower village atmosphere between surf sessions. Westward Ho! is an easy drive away, while Appledore itself is best enjoyed on foot.",
    image: "/images/accommodation/appledore/Appledore%20from%20Instow.jpg",
    imageAlt: "Appledore village viewed across the Torridge estuary from Instow",
    placeholder: false
  },
  {
    slug: "bideford",
    regionSlug: "north-devon",
    name: "Bideford",
    eyebrow: "Bideford accommodation",
    h1: "Where to stay in Bideford",
    intro: "A practical North Devon base with a wider choice of accommodation, shops and services, well placed for exploring the coast.",
    summary: "A practical, better-value base with more shops, services and easy access to the wider North Devon coast.",
    bestFor: "Better-value stays, families, longer trips and exploring",
    surfAccess: "Short drive to Westward Ho! and other North Devon beaches",
    localFeel: "Town base with more everyday convenience",
    nearby: "Westward Ho!, Instow and Appledore",
    why: "Bideford is a practical option for longer trips, families and visitors comparing a wider range of places to stay. Its shops and everyday services make planning simple, and Westward Ho!, the estuary villages and the wider North Devon coast are all within easy reach by car.",
    image: "/images/accommodation/bideford/Bideford%20Bridge.jpg",
    imageAlt: "Bideford Long Bridge crossing the River Torridge in North Devon",
    surfLinks: [["Westward Ho! surf guide", "/guides/westwardho!/", "Plan the primary nearby surf option."], ["North Devon surf guides", "/guides/north-devon/", "Compare Westward Ho!, Saunton, Croyde and Woolacombe."], ["Food and drink near Westward Ho!", "/guides/westwardho!/#food", "Browse Surfbooker's local food and drink reviews."]],
    placeholder: false
  },
  {
    slug: "croyde",
    regionSlug: "north-devon",
    name: "Croyde",
    eyebrow: "Croyde accommodation",
    h1: "Where to stay in Croyde",
    intro: "Choose a base around Croyde for beach days and surf trips on the North Devon coast.",
    summary: "A North Devon village base beside Croyde Bay and its surf beach.",
    bestFor: "Surf trips, beach breaks and village stays",
    surfAccess: "Use the Croyde beach guide to plan access and conditions",
    localFeel: "Coastal village close to the beach",
    nearby: "Saunton, Putsborough and Woolacombe",
    why: "Croyde is a practical base for visitors planning their stay around the beach and North Devon surf. Surfbooker’s local beach, lesson and hire information can help you organise the practical details before choosing a property.",
    image: "/guides/Croyde/Croyde%20beach%20and%20cliff%20view.jpg",
    imageAlt: "Croyde beach and cliffs in North Devon",
    guidePath: "/guides/surfing-croyde-bay/",
    placeholder: false
  },
  {
    slug: "woolacombe",
    regionSlug: "north-devon",
    name: "Woolacombe",
    eyebrow: "Woolacombe accommodation",
    h1: "Where to stay in Woolacombe",
    intro: "Choose a Woolacombe base for beach days and surf trips on the North Devon coast.",
    summary: "A coastal village base beside Woolacombe’s long sandy beach.",
    bestFor: "Beach breaks, surf trips and coastal stays",
    surfAccess: "Use the Woolacombe beach guide to plan access and conditions",
    localFeel: "Lively coastal village beside the beach",
    nearby: "Putsborough, Croyde and Ilfracombe",
    why: "Woolacombe works well for visitors who want their North Devon trip centred on the coast. Use Surfbooker’s local beach, lesson and hire information to compare the practical setup before selecting accommodation.",
    image: "/guides/Woolacombe/ariel%20whole%20beach.avif",
    imageAlt: "Aerial view of Woolacombe beach in North Devon",
    guidePath: "/guides/surfing-woolacombe/",
    placeholder: false
  },
  {
    slug: "saunton",
    regionSlug: "north-devon",
    name: "Saunton",
    eyebrow: "Saunton accommodation",
    h1: "Where to stay near Saunton",
    intro: "Choose a base near Saunton for beach days and surf trips on the North Devon coast.",
    summary: "A beach-focused North Devon base near Saunton Sands.",
    bestFor: "Beach days, surf trips and exploring the coast",
    surfAccess: "Use the Saunton beach guide to plan access and conditions",
    localFeel: "Open coastline beside a broad sandy beach",
    nearby: "Croyde, Braunton and Northam Burrows",
    why: "A stay near Saunton suits visitors who want to organise their trip around the beach and the wider North Devon coast. Check Surfbooker’s beach, lesson and hire information before choosing the most practical base.",
    image: "/guides/Saunton/Saunton%20from%20beach.jpg",
    imageAlt: "Saunton Sands viewed from the beach in North Devon",
    guidePath: "/guides/surfing-saunton-sands/",
    placeholder: false
  },
  {
    slug: "putsborough",
    regionSlug: "north-devon",
    name: "Putsborough",
    eyebrow: "Putsborough accommodation",
    h1: "Where to stay near Putsborough",
    intro: "Choose a base near Putsborough for quieter beach days and North Devon surf trips.",
    summary: "A quieter coastal base near Putsborough Sands.",
    bestFor: "Quieter beach stays and surf trips",
    surfAccess: "Use the Putsborough beach guide to plan access and conditions",
    localFeel: "Open coast with a quieter beach focus",
    nearby: "Croyde, Woolacombe and Georgeham",
    why: "Putsborough is a useful place to consider when the beach is the focus of the trip. Surfbooker’s local guide and regional lesson and hire pages can help you plan access before selecting accommodation.",
    image: "/guides/Putsborough/beach%20wide%20shot%20main.jpeg",
    imageAlt: "Wide view of Putsborough beach in North Devon",
    guidePath: "/guides/surfing-putsborough/",
    placeholder: false
  },
  {
    slug: "lynmouth",
    regionSlug: "north-devon",
    name: "Lynmouth",
    eyebrow: "Lynmouth accommodation",
    h1: "Where to stay in Lynmouth",
    intro: "Choose a Lynmouth base for a coastal stay on the Exmoor edge of North Devon.",
    summary: "A harbour village base on the Exmoor coast in North Devon.",
    bestFor: "Coastal exploring and village stays",
    surfAccess: "Check the Lynmouth guide before planning any surf session",
    localFeel: "Harbour village beneath the Exmoor coast",
    nearby: "Lynton, Exmoor and the North Devon coast",
    why: "Lynmouth offers a different North Devon base, with a harbour-village setting on the edge of Exmoor. Use the local Surfbooker guide to understand the coast before choosing accommodation or planning time in the water.",
    image: "/guides/Lynmouth/ariel.jpeg",
    imageAlt: "Aerial view of Lynmouth on the North Devon coast",
    guidePath: "/guides/surfing-lynmouth/",
    placeholder: false
  },
  {
    slug: "bigbury-on-sea",
    regionSlug: "south-devon",
    name: "Bigbury-on-Sea",
    eyebrow: "Bigbury-on-Sea accommodation",
    h1: "Where to stay in Bigbury-on-Sea",
    intro: "Choose a base around Bigbury-on-Sea for beach days and South Devon surf trips.",
    summary: "A South Devon beach base overlooking Burgh Island.",
    bestFor: "Beach breaks, families and South Devon surf trips",
    surfAccess: "Use the Bigbury-on-Sea guide to plan access and conditions",
    localFeel: "Beach-focused South Devon coast",
    nearby: "Bantham, Challaborough and the South Hams",
    why: "Bigbury-on-Sea is a practical South Devon choice when the beach is central to the trip. Use Surfbooker’s local guide plus lesson and hire pages to compare the setup before choosing accommodation.",
    image: "/guides/Bigbury-on-sea/zoomed%20out%20view.jpeg",
    imageAlt: "Bigbury-on-Sea and Burgh Island in South Devon",
    guidePath: "/guides/surfing-bigbury-on-sea/",
    placeholder: false
  },
  {
    slug: "bantham",
    regionSlug: "south-devon",
    name: "Bantham",
    eyebrow: "Bantham accommodation",
    h1: "Where to stay near Bantham",
    intro: "Choose a base near Bantham for beach days and South Devon surf trips.",
    summary: "A South Devon village base near Bantham beach and the Avon estuary.",
    bestFor: "Beach breaks and South Devon surf trips",
    surfAccess: "Use the Bantham guide to plan access and conditions",
    localFeel: "Rural coastal village near the beach",
    nearby: "Bigbury-on-Sea, the Avon estuary and the South Hams",
    why: "Bantham is a useful South Devon base for visitors planning their trip around the coast. Surfbooker’s beach, lesson and hire information can help with the practical planning before a property is selected.",
    image: "/guides/Bantham/Sunset%20waves.jpeg",
    imageAlt: "Waves at sunset near Bantham in South Devon",
    guidePath: "/guides/surfing-bantham/",
    placeholder: false
  },
  {
    slug: "challaborough",
    regionSlug: "south-devon",
    name: "Challaborough",
    eyebrow: "Challaborough accommodation",
    h1: "Where to stay near Challaborough",
    intro: "Choose a base near Challaborough for beach days and South Devon surf trips.",
    summary: "A compact South Devon beach base close to Bigbury-on-Sea.",
    bestFor: "Beach stays and exploring the South Hams coast",
    surfAccess: "Use the Challaborough guide to plan access and conditions",
    localFeel: "Small beach-focused coastal settlement",
    nearby: "Bigbury-on-Sea, Burgh Island and the South Hams",
    why: "Challaborough gives visitors another beach-focused option on the South Devon coast. Check Surfbooker’s local guide and regional surf information before deciding where to stay.",
    image: "/guides/Challaborough/ariel%20beach%20and%20town.jpg",
    imageAlt: "Aerial view of Challaborough beach in South Devon",
    guidePath: "/guides/surfing-challaborough/",
    placeholder: false
  },
  {
    slug: 'salcombe', regionSlug: 'south-devon',
    name: 'Salcombe', eyebrow: 'Salcombe accommodation', h1: 'Where to stay in Salcombe',
    intro: 'Use Salcombe as an estuary-side base for the South Hams coast, with Bantham and Bigbury-on-Sea within reach by road.',
    summary: 'An estuary town base for South Devon beaches and coast.',
    bestFor: 'Estuary stays and South Hams beach trips', surfAccess: 'Bantham and Bigbury-on-Sea are the nearest surf beaches, reached by road', localFeel: 'Busy harbour town on the Kingsbridge Estuary', nearby: 'Bantham, Bigbury-on-Sea and the South Hams',
    why: 'Salcombe is not itself a surf beach, but it is a popular South Hams base for visitors who want hotels, restaurants and the estuary close at hand. Check journey times to Bantham or Bigbury before choosing where to stay.',
    accommodationMix: 'The area includes hotels, holiday cottages and letting agencies serving the wider South Hams.',
    image: nearImage('bantham', '/guides/Bantham/Sunset%20waves.jpeg'), imageAlt: 'Waves at sunset near Bantham, a short drive from Salcombe',
    guidePath: '/guides/surfing-bantham/', relatedSlugs: ['bantham', 'bigbury-on-sea', 'kingsbridge-south-hams'],
    placeholder: false
  },
  {
    slug: 'kingsbridge-south-hams', regionSlug: 'south-devon',
    name: 'Kingsbridge and South Hams', eyebrow: 'Kingsbridge and South Hams accommodation', h1: 'Where to stay around Kingsbridge and the South Hams',
    intro: 'Choose a base around Kingsbridge, Beesands or Slapton for quieter South Hams stays within reach of Bantham and Bigbury-on-Sea.',
    summary: 'Quiet South Hams bases within reach of the Bantham surf.',
    bestFor: 'Quieter countryside and village stays', surfAccess: 'Bantham and Bigbury-on-Sea are a drive away; check journey times', localFeel: 'Rural villages, shingle beaches and farm estates', nearby: 'Beesands, Slapton, Salcombe and Bantham',
    why: 'The Kingsbridge area suits visitors who want a quieter South Hams base rather than staying on a surf beach. Beaches such as Beesands and Slapton are shingle, so the surf beaches are a drive away.',
    accommodationMix: 'Expect village pubs with rooms, estates and holiday cottage agencies.',
    image: nearImage('bantham', '/guides/Bantham/Sunset%20waves.jpeg'), imageAlt: 'Waves at sunset near Bantham in South Devon',
    guidePath: '/guides/surfing-bantham/', relatedSlugs: ['bantham', 'salcombe', 'bigbury-on-sea'],
    placeholder: false
  },
  {
    slug: 'abersoch', regionSlug: 'wales',
    name: 'Abersoch', eyebrow: 'Abersoch accommodation', h1: 'Where to stay in Abersoch',
    intro: 'Use Abersoch as a Llyn Peninsula base for Hell’s Mouth (Porth Neigwl) and the surrounding coast.',
    summary: 'A Llyn Peninsula resort base near Hell’s Mouth.',
    bestFor: 'Surf and watersports trips on the Llyn Peninsula', surfAccess: 'Hell’s Mouth is a short drive from the village; check conditions before travelling', localFeel: 'Busy seaside village with a harbour and watersports', nearby: 'Hell’s Mouth, Porth Neigwl and the Llyn Peninsula',
    why: 'Abersoch is the main base for visitors heading to Hell’s Mouth. The village has its own sheltered beaches and watersports, while the open surf beach is a short drive away.',
    accommodationMix: 'The area includes holiday parks, holiday cottages, farm stays and small hotels.',
    image: nearImage('hells-mouth-porth-neigwl', '/images/Beach%20Guides.jpg'), imageAlt: 'Hell’s Mouth (Porth Neigwl) on the Llyn Peninsula',
    guidePath: '/guides/surfing-hells-mouth-porth-neigwl/', relatedSlugs: ['rhosneigr'],
    placeholder: false
  },
  {
    slug: 'mullion-lizard', regionSlug: 'cornwall',
    name: 'Mullion and the Lizard', eyebrow: 'Mullion and the Lizard accommodation', h1: 'Where to stay around Mullion and the Lizard',
    intro: 'Choose Mullion, Poldhu or Polurrian for a Lizard Peninsula stay on the Cornish coast.',
    summary: 'Lizard Peninsula bases around Mullion, Poldhu and Polurrian.',
    bestFor: 'Coastal walking and quieter Cornish breaks', surfAccess: 'Poldhu and Polurrian are the local beaches; check Surfbooker’s Cornwall guide for wider surf options', localFeel: 'Clifftop hotels and coves on the Lizard', nearby: 'Poldhu, Polurrian and Mullion Cove',
    why: 'The Lizard is a quieter alternative to the busier north Cornwall coast. Stays here suit visitors who want coves and coast-path walking, with surf beaches further north and west.',
    accommodationMix: 'Expect clifftop hotels and holiday cottages.',
    image: nearImage('praa-sands', '/images/Beach%20Guides.jpg'), imageAlt: 'Cornish coast on the Lizard Peninsula',
    guidePath: '/guides/cornwall/', relatedSlugs: ['praa-sands'],
    placeholder: false
  },
  {
    slug: 'trebarwith-strand', regionSlug: 'cornwall',
    name: 'Trebarwith Strand', eyebrow: 'Trebarwith Strand accommodation', h1: 'Where to stay near Trebarwith Strand',
    intro: 'Use Trebarwith Strand as a north Cornwall base between Boscastle and Port Isaac, with Polzeath and Widemouth Bay within driving distance.',
    summary: 'A north Cornwall cliff-top base near Tintagel.',
    bestFor: 'Dramatic coastline and quiet stays', surfAccess: 'Trebarwith Strand is a tidal beach; other surf beaches are a drive away', localFeel: 'Small cliff-top settlement near Tintagel', nearby: 'Tintagel, Port Isaac and Polzeath',
    why: 'Trebarwith Strand is a rugged north Cornwall beach rather than a main surf base, but it is a good quiet base for visitors who want to reach several beaches along this stretch of coast.',
    accommodationMix: 'Expect inns and hotels close to the cove.',
    image: nearImage('polzeath', '/images/Beach%20Guides.jpg'), imageAlt: 'The north Cornwall coast near Trebarwith Strand',
    guidePath: '/guides/cornwall/', relatedSlugs: ['polzeath', 'bude'],
    placeholder: false
  },
  {
    slug: 'chale-isle-of-wight', regionSlug: 'southern-england',
    name: 'Chale', eyebrow: 'Chale accommodation', h1: 'Where to stay around Chale, Isle of Wight',
    intro: 'Use Chale as a south-west Isle of Wight base for Compton Bay and the coast.',
    summary: 'A rural south-west Isle of Wight base near Compton Bay.',
    bestFor: 'Quiet coast stays and farm holidays', surfAccess: 'Compton Bay is the nearest guide on this coast; check journey times', localFeel: 'Rural farmland and cliffs on the island’s south-west coast', nearby: 'Compton Bay and Freshwater Bay',
    why: 'Chale sits on the Isle of Wight’s south-west coast, away from the main resort towns. It suits visitors who want a quiet base with Compton Bay within driving distance.',
    accommodationMix: 'Expect farm stays and holiday cottages.',
    image: nearImage('compton-bay', '/images/Beach%20Guides.jpg'), imageAlt: 'The Isle of Wight south-west coast',
    guidePath: '/guides/surfing-compton-bay/', relatedSlugs: ['compton-bay', 'freshwater-bay-isle-of-wight'],
    placeholder: false
  }
];

const additionalAccommodationAreas = [
  {
    slug: "braunton", regionSlug: "north-devon", cluster: "croyde",
    name: "Braunton", eyebrow: "Braunton accommodation", h1: "Accommodation in Braunton",
    intro: "Use Braunton as an inland village base for reaching Saunton, Croyde and Putsborough by road.",
    summary: "A practical inland base for several North Devon surf beaches.",
    bestFor: "Visitors comparing several North Devon beaches", surfAccess: "Driving is the practical way to reach the main surf beaches", localFeel: "Busy village with everyday shops and services", nearby: "Saunton, Croyde and Putsborough",
    why: "Braunton is not a beach resort, but it is a useful base for a trip split between Saunton, Croyde and Putsborough. Its village shops and services can suit longer stays, while a car gives the flexibility needed to choose a beach around the conditions.",
    accommodationMix: "The area includes village stays and self-catering options rather than accommodation directly on a surf beach.",
    image: "/guides/Saunton/clifftop%20ariel.jpg", imageAlt: "Saunton coastline near Braunton in North Devon", placeholder: false,
    surfLinks: [["Saunton beach guide", "/guides/surfing-saunton-sands/", "Plan beach access and surf days at Saunton."], ["Croyde beach guide", "/guides/surfing-croyde-bay/", "Compare Croyde with the other beaches reached from Braunton."], ["North Devon surf lessons", "/surf-lessons/north-devon/", "Compare lesson locations across the region."]],
    relatedSlugs: ["saunton", "croyde", "putsborough"]
  },
  {
    slug: "mortehoe", regionSlug: "north-devon", cluster: "woolacombe",
    name: "Mortehoe", eyebrow: "Mortehoe accommodation", h1: "Accommodation in Mortehoe",
    intro: "Choose Mortehoe for a quieter village stay above the coast, with Woolacombe and its surf beach nearby.",
    summary: "A quieter village base close to Woolacombe and the North Devon coast.",
    bestFor: "Quieter village stays and coastal walking", surfAccess: "Plan on travelling to Woolacombe or another patrolled surf beach", localFeel: "Historic hillside village above the coast", nearby: "Woolacombe, Combesgate and Putsborough",
    why: "Mortehoe suits visitors who prefer a smaller village atmosphere to staying in central Woolacombe. It remains connected to Woolacombe’s beach and surf services, but the exact journey and walkability depend on the property and route.",
    accommodationMix: "Expect village-based self-catering stays, guest accommodation and properties serving the wider Woolacombe area.",
    image: "/guides/Woolacombe/clifftop%20sign.avif", imageAlt: "North Devon coast near Mortehoe and Woolacombe", placeholder: false,
    surfLinks: [["Woolacombe beach guide", "/guides/surfing-woolacombe/", "Check beach access and practical details for Woolacombe."], ["Woolacombe surf lessons", "/surf-lessons/woolacombe/", "Compare published lesson options."], ["Woolacombe surf hire", "/surf-hire/woolacombe/", "Find local board and wetsuit hire information."]],
    relatedSlugs: ["woolacombe", "putsborough"]
  },
  {
    slug: "bude", regionSlug: "cornwall", cluster: "bude", name: "Bude", eyebrow: "Bude accommodation", h1: "Accommodation in Bude",
    intro: "Use Bude as a north Cornwall town base for Summerleaze, Crooklets and trips south to Widemouth Bay.", summary: "A practical north Cornwall town base with several nearby beaches.",
    bestFor: "Longer stays and visitors comparing north Cornwall beaches", surfAccess: "Summerleaze is in town; other beaches are easier by road", localFeel: "Coastal town with everyday services", nearby: "Summerleaze, Crooklets and Widemouth Bay",
    why: "Bude combines town facilities with access to several north Cornwall beaches. It can work well for visitors who want food, shops and services close to their accommodation while retaining the option to choose between Summerleaze and Widemouth Bay.", accommodationMix: "The town and surrounding area support hotels, guest accommodation, cottages, apartments and holiday parks.",
    image: "/guides/_licensed-images/cornwall/summerleaze.jpg", imageAlt: "Summerleaze Beach in Bude, Cornwall", placeholder: false,
    surfLinks: [["Summerleaze Beach guide", "/guides/surfing-summerleaze-beach/", "Read Surfbooker’s guide to Bude’s town beach."], ["Widemouth Bay guide", "/guides/surfing-widemouth-bay/", "Compare a more exposed beach south of town."], ["Bude surf lessons", "/surf-lessons/summerleaze/", "Compare published lesson information for Summerleaze."]], relatedSlugs: ["widemouth-bay"]
  },
  {
    slug: "widemouth-bay", regionSlug: "cornwall", cluster: "bude", name: "Widemouth Bay", eyebrow: "Widemouth Bay accommodation", h1: "Accommodation in Widemouth Bay",
    intro: "Stay near Widemouth Bay for a beach-focused north Cornwall trip, with Bude available for wider shops and services.", summary: "A beach-focused base south of Bude on the north Cornwall coast.",
    bestFor: "Beach stays and north Cornwall surf trips", surfAccess: "Use the beach guide and local schools to plan suitable sessions", localFeel: "Open coastal settlement centred on the bay", nearby: "Bude and Summerleaze",
    why: "Widemouth Bay puts the beach at the centre of the trip. Compared with staying in Bude, local facilities are more dispersed, so visitors should check the exact property setting and decide whether they want the flexibility of a car.", accommodationMix: "Accommodation is spread around the bay and surrounding countryside, including self-catering and holiday-park options.",
    image: "/guides/_licensed-images/cornwall/widemouth-bay.jpg", imageAlt: "Widemouth Bay on the north Cornwall coast", placeholder: false,
    surfLinks: [["Widemouth Bay surf guide", "/guides/surfing-widemouth-bay/", "Check access, conditions and beach information."], ["Widemouth Bay surf lessons", "/surf-lessons/widemouth-bay/", "Compare published lesson options."], ["Cornwall surf hire", "/surf-hire/cornwall/", "Find verified hire locations across Cornwall."]], relatedSlugs: ["bude"]
  },
  {
    slug: "polzeath", regionSlug: "cornwall", cluster: "north-cornwall", name: "Polzeath", eyebrow: "Polzeath accommodation", h1: "Accommodation in Polzeath",
    intro: "Choose Polzeath for a village stay organised around its sandy surf beach and local lesson and hire options.", summary: "A north Cornwall surf village with the beach at its centre.",
    bestFor: "Surf-focused breaks and family beach trips", surfAccess: "Local lessons and hire serve Polzeath beach", localFeel: "Seasonal surf village around the bay", nearby: "Daymer Bay, Rock and the Camel estuary",
    why: "Polzeath is one of the clearest Cornwall choices for visitors who want accommodation and surf services in the same village. Summer traffic and parking demand make the exact property location worth checking before booking.", accommodationMix: "The village and surrounding coast include cottages, apartments, guest accommodation, campsites and holiday parks.",
    image: "/guides/_licensed-images/cornwall/polzeath.jpg", imageAlt: "Polzeath beach in Cornwall", placeholder: false,
    surfLinks: [["Polzeath surf guide", "/guides/surfing-polzeath/", "Plan access and understand the beach."], ["Polzeath surf lessons", "/surf-lessons/polzeath/", "Compare verified lesson providers."], ["Polzeath surf hire", "/surf-hire/polzeath/", "Find board and wetsuit hire information."]], relatedSlugs: []
  },
  {
    slug: "newquay", regionSlug: "cornwall", cluster: "newquay", name: "Newquay", eyebrow: "Newquay accommodation", h1: "Accommodation in Newquay",
    intro: "Use Newquay as a flexible town base for Fistral, Towan, Great Western and other north Cornwall beaches.", summary: "A lively Cornwall base with several surf beaches and the widest local service choice.",
    bestFor: "Surf trips, groups, nightlife and trips without relying entirely on one beach", surfAccess: "Several beaches sit around town; the practical route depends on where you stay", localFeel: "Lively coastal town with year-round services", nearby: "Fistral, Towan, Great Western, Crantock and Watergate Bay",
    why: "Newquay gives visitors a larger choice of accommodation, food, lessons and hire than a small surf village. It is useful when a group wants several beaches or evening options, but the town is spread out enough that property location matters.", accommodationMix: "Newquay has the broadest mix in the current Cornwall structure, including hotels, guest houses, hostels, apartments and self-catering stays.",
    image: "/guides/_licensed-images/cornwall/fistral-beach.jpg", imageAlt: "Fistral Beach in Newquay, Cornwall", placeholder: false,
    surfLinks: [["Fistral Beach surf guide", "/guides/surfing-fistral-beach/", "Plan a session at Newquay’s best-known surf beach."], ["Towan Beach surf guide", "/guides/surfing-towan-beach-newquay/", "Compare a central town-beach option."], ["Fistral surf lessons", "/surf-lessons/fistral/", "Compare published Fistral lesson providers."], ["Fistral surf hire", "/surf-hire/fistral/", "Find board and wetsuit hire information."]], relatedSlugs: ["watergate-bay", "mawgan-porth"]
  },
  {
    slug: "watergate-bay", regionSlug: "cornwall", cluster: "newquay", name: "Watergate Bay", eyebrow: "Watergate Bay accommodation", h1: "Accommodation at Watergate Bay",
    intro: "Choose Watergate Bay for a beach-led stay north of Newquay with local surf lessons and hire.", summary: "A destination beach base north of Newquay.",
    bestFor: "Beach-focused stays and surf trips", surfAccess: "Lessons and hire operate at the bay", localFeel: "Open bay with destination facilities", nearby: "Newquay and Mawgan Porth",
    why: "Watergate Bay works best for visitors who want the beach to define the stay. Newquay provides a wider choice of shops and nightlife, while the bay itself offers a more concentrated coastal setting.", accommodationMix: "Stays around the bay range from hotel accommodation to nearby self-catering properties.",
    image: "/guides/_licensed-images/cornwall/watergate-bay.jpg", imageAlt: "Watergate Bay in Cornwall", placeholder: false,
    surfLinks: [["Watergate Bay surf guide", "/guides/surfing-watergate-bay/", "Check beach access and surf context."], ["Watergate Bay surf lessons", "/surf-lessons/watergate-bay/", "Compare published lesson options."], ["Watergate Bay surf hire", "/surf-hire/watergate-bay/", "Find verified local hire information."]], relatedSlugs: ["newquay", "mawgan-porth"]
  },
  {
    slug: "mawgan-porth", regionSlug: "cornwall", cluster: "newquay", name: "Mawgan Porth", eyebrow: "Mawgan Porth accommodation", h1: "Accommodation in Mawgan Porth",
    intro: "Stay in Mawgan Porth for a smaller beach-village base between Newquay and the north Cornwall coast.", summary: "A smaller beach settlement north of Watergate Bay.",
    bestFor: "Quieter coastal stays and beach trips", surfAccess: "Check the local guide and current conditions before entering the water", localFeel: "Compact valley and beach settlement", nearby: "Watergate Bay and Newquay",
    why: "Mawgan Porth offers a smaller-scale alternative to Newquay while keeping Watergate Bay and the town within the same part of the coast. Visitors should check where a property sits in relation to the beach and local services.", accommodationMix: "The surrounding valley includes self-catering stays, guest accommodation and holiday parks.",
    image: "/guides/_licensed-images/cornwall/mawgan-porth.jpg", imageAlt: "Mawgan Porth beach in Cornwall", placeholder: false,
    surfLinks: [["Mawgan Porth surf guide", "/guides/surfing-mawgan-porth/", "Read the local beach and surf guide."], ["Cornwall surf lessons", "/surf-lessons/cornwall/", "Compare verified lesson destinations."], ["Cornwall surf hire", "/surf-hire/cornwall/", "Find verified hire destinations."]], relatedSlugs: ["watergate-bay", "newquay"]
  },
  {
    slug: "perranporth", regionSlug: "cornwall", cluster: "st-agnes", name: "Perranporth", eyebrow: "Perranporth accommodation", h1: "Accommodation in Perranporth",
    intro: "Choose Perranporth for a town-and-beach base with local surf lessons, hire and a long sandy coastline.", summary: "A Cornwall beach town with surf services close to the sand.",
    bestFor: "Beach breaks, families and surf trips", surfAccess: "Local lesson and hire options serve Perranporth beach", localFeel: "Busy beach town with seasonal energy", nearby: "St Agnes and Porthtowan",
    why: "Perranporth combines a large beach with a town centre and established surf services. It can suit visitors who want more facilities than a small village while staying in a place where the beach remains central.", accommodationMix: "The local mix includes guest accommodation, apartments, cottages, campsites and holiday parks.",
    image: "/guides/_licensed-images/cornwall/perranporth.jpg", imageAlt: "Perranporth beach in Cornwall", placeholder: false,
    surfLinks: [["Perranporth surf guide", "/guides/surfing-perranporth/", "Check beach access and local surf context."], ["Perranporth surf lessons", "/surf-lessons/perranporth/", "Compare published lesson options."], ["Perranporth surf hire", "/surf-hire/perranporth/", "Find local board and wetsuit hire."]], relatedSlugs: ["st-agnes", "porthtowan"]
  },
  {
    slug: "st-agnes", regionSlug: "cornwall", cluster: "st-agnes", name: "St Agnes", eyebrow: "St Agnes accommodation", h1: "Accommodation in St Agnes",
    intro: "Use St Agnes as a characterful village base for Trevaunance Cove and the surrounding north Cornwall coast.", summary: "A historic north Cornwall village connected to Trevaunance Cove.",
    bestFor: "Village stays, couples and coastal exploring", surfAccess: "Trevaunance Cove is the local surf beach; suitability changes with conditions", localFeel: "Independent village set inland from the cove", nearby: "Perranporth and Porthtowan",
    why: "St Agnes suits visitors who value village character and access to the wider coast rather than accommodation directly beside a large resort beach. The village and cove are distinct, so check the exact location before assuming the beach is walkable.", accommodationMix: "Stays include cottages, guest accommodation, campsites and self-catering properties around the village and cove.",
    image: "/guides/_licensed-images/cornwall/trevaunance-cove.jpg", imageAlt: "Trevaunance Cove near St Agnes in Cornwall", placeholder: false,
    surfLinks: [["Trevaunance Cove surf guide", "/guides/surfing-trevaunance-cove/", "Understand St Agnes’s local surf beach."], ["St Agnes surf lessons", "/surf-lessons/st-agnes/", "Compare published lesson information."], ["Cornwall surf hire", "/surf-hire/cornwall/", "Find verified hire destinations across Cornwall."]], relatedSlugs: ["perranporth", "porthtowan"]
  },
  {
    slug: "porthtowan", regionSlug: "cornwall", cluster: "st-agnes", name: "Porthtowan", eyebrow: "Porthtowan accommodation", h1: "Accommodation in Porthtowan",
    intro: "Choose Porthtowan for a compact beach-village stay between St Agnes and the west Cornwall coast.", summary: "A compact north-coast beach village with direct Atlantic exposure.",
    bestFor: "Surf-focused stays and coastal breaks", surfAccess: "Use the beach guide and local instruction for suitable conditions", localFeel: "Small settlement focused on the beach", nearby: "St Agnes, Chapel Porth and Perranporth",
    why: "Porthtowan is a more beach-focused base than nearby St Agnes. Local services are limited compared with a town, making property facilities and transport plans more important for longer stays.", accommodationMix: "Accommodation around Porthtowan is mainly self-catering, with nearby campsites and guest options.",
    image: "/guides/_licensed-images/cornwall/porthtowan.jpg", imageAlt: "Porthtowan beach in Cornwall", placeholder: false,
    surfLinks: [["Porthtowan surf guide", "/guides/surfing-porthtowan/", "Check access and beach-specific surf information."], ["Porthtowan surf lessons", "/surf-lessons/porthtowan/", "Compare published lesson options."], ["Cornwall surf hire", "/surf-hire/cornwall/", "Find verified hire destinations."]], relatedSlugs: ["st-agnes", "perranporth"]
  },
  {
    slug: "hayle", regionSlug: "cornwall", cluster: "st-ives-bay", name: "Hayle", eyebrow: "Hayle accommodation", h1: "Accommodation in Hayle",
    intro: "Use Hayle as a practical town base for Hayle Towans, Gwithian and the wider St Ives Bay coastline.", summary: "A practical west Cornwall base for the beaches of St Ives Bay.",
    bestFor: "Families, longer stays and exploring several beaches", surfAccess: "The bay is extensive; a car helps visitors choose between access points", localFeel: "Working town beside an estuary and dune-backed coast", nearby: "Hayle Towans, Gwithian and St Ives",
    why: "Hayle is useful for visitors who want town services and access to several parts of St Ives Bay. It should be treated as a broad base rather than a single beach resort because accommodation and beach entrances are spread across the area.", accommodationMix: "The area includes town guest accommodation, cottages, apartments, campsites and large holiday parks.",
    image: "/guides/_licensed-images/cornwall/hayle-towans.jpg", imageAlt: "Hayle Towans on St Ives Bay in Cornwall", placeholder: false,
    surfLinks: [["Hayle Towans surf guide", "/guides/surfing-hayle-towans/", "Plan access to the Hayle side of St Ives Bay."], ["Gwithian and Godrevy guide", "/guides/surfing-gwithian-godrevy/", "Compare another part of the bay."], ["Hayle surf lessons", "/surf-lessons/hayle-towans/", "Compare published lesson information."]], relatedSlugs: ["gwithian", "st-ives"]
  },
  {
    slug: "st-ives", regionSlug: "cornwall", cluster: "st-ives-bay", name: "St Ives", eyebrow: "St Ives accommodation", h1: "Accommodation in St Ives",
    intro: "Choose St Ives for a lively coastal-town stay with Porthmeor surf access, galleries, food and several beaches.", summary: "A west Cornwall town base centred on Porthmeor and several nearby beaches.",
    bestFor: "Couples, families, food, culture and surf trips", surfAccess: "Porthmeor is the main local surf beach", localFeel: "Popular harbour and arts town", nearby: "Porthmeor, Carbis Bay, Hayle and Gwithian",
    why: "St Ives combines a recognised surf beach at Porthmeor with a much broader town break. It works for mixed-interest groups, although parking and the exact position of accommodation can strongly affect how easy it is to reach the beach.", accommodationMix: "The town offers hotels, guest houses, apartments and cottages across the harbour, Porthmeor and surrounding neighbourhoods.",
    image: "/guides/_licensed-images/cornwall/porthmeor-beach.jpg", imageAlt: "Porthmeor Beach in St Ives, Cornwall", placeholder: false,
    surfLinks: [["Porthmeor Beach surf guide", "/guides/surfing-porthmeor-beach/", "Read the local surf and access guide."], ["Porthmeor surf lessons", "/surf-lessons/porthmeor/", "Compare published lesson providers."], ["Porthmeor surf hire", "/surf-hire/porthmeor/", "Find board and wetsuit hire information."]], relatedSlugs: ["hayle", "gwithian"]
  },
  {
    slug: "gwithian", regionSlug: "cornwall", cluster: "st-ives-bay", name: "Gwithian", eyebrow: "Gwithian accommodation", h1: "Accommodation near Gwithian",
    intro: "Choose Gwithian for a quieter base near the eastern side of St Ives Bay and the Gwithian–Godrevy coastline.", summary: "A quieter west Cornwall base near Gwithian and Godrevy beaches.",
    bestFor: "Quieter surf trips and coastal stays", surfAccess: "Different access points serve the long bay; check the guide before travelling", localFeel: "Small village and rural coast", nearby: "Godrevy, Hayle and St Ives",
    why: "Gwithian suits visitors who want the open coast without staying in a larger town. Services and accommodation are spread out, so a car is normally the practical way to reach beach access points and neighbouring destinations.", accommodationMix: "Expect cottages, campsites, guest accommodation and rural self-catering stays around the village and bay.",
    image: "/guides/_licensed-images/cornwall/gwithian-godrevy.jpg", imageAlt: "Gwithian and Godrevy coast in Cornwall", placeholder: false,
    surfLinks: [["Gwithian and Godrevy surf guide", "/guides/surfing-gwithian-godrevy/", "Plan access along this part of St Ives Bay."], ["Gwithian surf lessons", "/surf-lessons/gwithian-godrevy/", "Compare published lesson options."], ["Gwithian surf hire", "/surf-hire/gwithian-godrevy/", "Find verified hire information."]], relatedSlugs: ["hayle", "st-ives"]
  },
  {
    slug: "praa-sands", regionSlug: "cornwall", cluster: "west-cornwall", name: "Praa Sands", eyebrow: "Praa Sands accommodation", h1: "Accommodation in Praa Sands",
    intro: "Stay near Praa Sands for a beach-focused west Cornwall break between Mount’s Bay and the Lizard side of the coast.", summary: "A west Cornwall beach base between Penzance and Helston.",
    bestFor: "Beach stays and west Cornwall surf trips", surfAccess: "Use the local guide and instruction to judge suitable conditions", localFeel: "Coastal settlement stretched behind the beach", nearby: "Penzance, Marazion and the west Cornwall coast",
    why: "Praa Sands is suited to visitors who want a broad sandy beach close to their base. The settlement is spread along the coast, so check property position and transport rather than assuming every stay sits beside the main access.", accommodationMix: "Local stays include self-catering properties, guest accommodation, campsites and holiday-park options.",
    image: "/guides/_licensed-images/cornwall/praa-sands.jpg", imageAlt: "Praa Sands beach in Cornwall", placeholder: false,
    surfLinks: [["Praa Sands surf guide", "/guides/surfing-praa-sands/", "Check beach access and surf context."], ["Praa Sands surf lessons", "/surf-lessons/praa-sands/", "Compare published lesson options."], ["Praa Sands surf hire", "/surf-hire/praa-sands/", "Find verified local hire information."]], relatedSlugs: ["st-ives", "sennen"]
  },
  {
    slug: "sennen", regionSlug: "cornwall", cluster: "west-cornwall", name: "Sennen", eyebrow: "Sennen accommodation", h1: "Accommodation near Sennen Cove",
    intro: "Choose Sennen for a far-west Cornwall stay organised around Sennen Cove and the Land’s End coastline.", summary: "A far-west Cornwall beach village with a recognised surf beach.",
    bestFor: "Surf-focused stays and exploring far-west Cornwall", surfAccess: "Local instruction serves Sennen Cove; conditions still need checking", localFeel: "Small cove settlement at the far west of Cornwall", nearby: "Land’s End, Porthcurno and west Penwith",
    why: "Sennen is a strong choice when the cove and far-west coast are the focus of the trip. It is a long way from Cornwall’s central surf clusters, so visitors should choose it deliberately rather than treating it as a base for the whole county.", accommodationMix: "The cove and surrounding villages offer cottages, guest accommodation, campsites and self-catering stays.",
    image: "/guides/_licensed-images/cornwall/sennen-cove.jpg", imageAlt: "Sennen Cove in west Cornwall", placeholder: false,
    surfLinks: [["Sennen Cove surf guide", "/guides/surfing-sennen-cove/", "Read the local access and surf guide."], ["Sennen surf lessons", "/surf-lessons/sennen-cove/", "Compare published lesson information."], ["Cornwall surf hire", "/surf-hire/cornwall/", "Find verified hire destinations across Cornwall."]], relatedSlugs: ["praa-sands"]
  }
];

const walesSpots = [
  ["llangennith", "Llangennith", "Gower"], ["rhossili-bay", "Rhossili Bay", "Gower"],
  ["caswell-bay", "Caswell Bay", "Gower"], ["langland-bay", "Langland Bay", "Gower"],
  ["oxwich-bay", "Oxwich Bay", "Gower"], ["port-eynon", "Port Eynon", "Gower"],
  ["newgale", "Newgale", "Pembrokeshire"], ["freshwater-west", "Freshwater West", "Pembrokeshire"],
  ["whitesands", "Whitesands", "Pembrokeshire"], ["broad-haven", "Broad Haven", "Pembrokeshire"],
  ["manorbier", "Manorbier", "Pembrokeshire"], ["freshwater-east", "Freshwater East", "Pembrokeshire"],
  ["marloes-sands", "Marloes Sands", "Pembrokeshire"], ["nolton-haven", "Nolton Haven", "Pembrokeshire"],
  ["rhosneigr", "Rhosneigr", "Anglesey"], ["hells-mouth-porth-neigwl", "Hell's Mouth (Porth Neigwl)", "Llŷn Peninsula"],
  ["rest-bay-porthcawl", "Rest Bay, Porthcawl", "South Wales coast"]
].map(([slug, name, area]) => ({ slug, name, area }));

const expansionGroups = [
  { spots: [
      ["constantine-bay", "Constantine Bay", "North Cornwall"], ["crantock-beach", "Crantock Beach", "Newquay coast"],
      ["fistral-beach", "Fistral Beach", "Newquay"], ["great-western-beach", "Great Western Beach", "Newquay"],
      ["gwithian-godrevy", "Gwithian and Godrevy", "St Ives Bay"], ["harlyn-bay", "Harlyn Bay", "North Cornwall"],
      ["hayle-towans", "Hayle Towans", "St Ives Bay"], ["holywell-bay", "Holywell Bay", "Newquay coast"],
      ["porthmeor-beach", "Porthmeor Beach", "St Ives"], ["sennen-cove", "Sennen Cove Beach", "West Cornwall"],
      ["summerleaze-beach", "Summerleaze Beach", "Bude"], ["towan-beach-newquay", "Towan Beach", "Newquay"],
      ["trevaunance-cove", "Trevaunance Cove", "St Agnes"]
    ].map(([slug, name, area]) => ({ slug, name, area })), regionSlug: "cornwall", regionName: "Cornwall", image: "/guides/_licensed-images/cornwall/fistral-beach.jpg" },
  { spots: walesSpots, regionSlug: "wales", regionName: "Wales", image: "/images/Surfers%20on%20beach.avif" },
  { spots: scotlandSpots, regionSlug: "scotland", regionName: "Scotland", image: "/images/generic%20wave.jpg" },
  { spots: northernIrelandSpots, regionSlug: "northern-ireland", regionName: "Northern Ireland", image: "/images/Surfer%20on%20wave%202.avif" },
  { spots: northeastSpots, regionSlug: "northeast-england-yorkshire", regionName: "Northeast England & Yorkshire", image: "/images/Surfers%20in%20waves.jpg" },
  { spots: southernEnglandSpots, regionSlug: "southern-england", regionName: "Southern England", image: "/images/Beach%20Guides.jpg" }
];

// Per-destination copy from the beach guides, so area pages don't all repeat the same template text.
const guideDestinations = await loadDestinations();
function guideFor(slug) {
  const keys = [slug, `${slug}-beach`, slug.replace(/-beach$/, ""), slug.replace(/-newquay$/, "-beach-newquay")];
  return keys.map((k) => guideDestinations.find((d) => d.slug === k)).find(Boolean)
    || guideDestinations.find((d) => d.slug.startsWith(`${slug}-`));
}
const plain = (t) => String(t || "").replace(/<[^>]+>/g, "").trim();
function stayCopy(spot) {
  const g = guideFor(spot.slug);
  const stay = g?.stay || {};
  const areas = (stay.areas || []).map((a) => `${plain(a.title)}: ${plain(a.text).replace(/\.$/, "")}`);
  const extra = Array.isArray(stay.text) ? plain(stay.text[0]) : plain(stay.text);
  return {
    intro: plain(g?.heroIntro),
    why: [plain(stay.intro), extra].filter(Boolean).join(" ") || plain((g?.overview || [])[0]),
    mix: areas.length ? `Places to base yourself — ${areas.join(". ")}.`
      : (stay.picks || []).length ? `Researched options nearby include ${stay.picks.slice(0, 4).map((p) => `${plain(p.name)} (${plain(p.type).toLowerCase()})`).join(", ")}. These are not Surfbooker-reviewed stays.` : ""
  };
}

function expansionAccommodationArea(spot, group) {
  const copy = stayCopy(spot);
  return {
    slug: spot.slug,
    regionSlug: group.regionSlug,
    cluster: `${group.regionSlug}-${spot.area}`,
    name: spot.name,
    eyebrow: `${spot.name} accommodation`,
    h1: `Accommodation near ${spot.name}`,
    intro: copy.intro || `Choose a practical base for visiting ${spot.name} and exploring the surrounding ${group.regionName} coast.`,
    summary: `Plan a coastal stay around ${spot.name} and nearby surf destinations.`,
    bestFor: spot.best || "Surf trips, coastal breaks and flexible beach days",
    surfAccess: `Check the ${spot.name} guide before choosing how close to the beach you need to stay`,
    localFeel: `${spot.area} coastal base`,
    nearby: `Other destinations around ${spot.area}`,
    why: copy.why ? copy.why : `${spot.name} can be a useful base for a surf-led visit to ${spot.area}. Compare the exact property location with beach access, local facilities and the conditions described in Surfbooker's destination guide before deciding where to stay.`,
    accommodationMix: copy.mix || `Accommodation may include hotels, guest houses, self-catering stays, campsites and holiday parks in ${spot.area}.`,
    // Use a photo of this place where we have one, so area, lesson and hire pages don't all share the region photo.
    image: placeImages(spot.slug)[0] ? "/" + placeImages(spot.slug)[0].split("/").map(encodeURIComponent).join("/").replace(/%21/g, "!") : group.image,
    imageAlt: placeImages(spot.slug)[0] ? `${spot.name}, ${spot.area}` : `${group.regionName} coast near ${spot.name}`,
    guidePath: `/guides/surfing-${spot.slug}/`,
    surfLinks: [
      [`${spot.name} beach guide`, `/guides/surfing-${spot.slug}/`, "Check beach access, conditions and practical local detail."],
      ["Find surf lessons", "/surf-lessons/", "Compare Surfbooker lesson destinations and providers."],
      ["Find surf hire", "/surf-hire/", "Browse board and wetsuit hire information."]
    ],
    placeholder: false
  };
}

const currentAreaSlugs = new Set([...existingAccommodationAreas, ...additionalAccommodationAreas].map((area) => area.slug));
const expansionAccommodationAreas = expansionGroups.flatMap((group) => group.spots
  .filter((spot) => !currentAreaSlugs.has(spot.slug))
  .map((spot) => expansionAccommodationArea(spot, group)));

export const accommodationAreas = [...existingAccommodationAreas, ...additionalAccommodationAreas, ...expansionAccommodationAreas];

Object.assign(accommodationAreas.find((area) => area.slug === "newgale"), {
  h1: "Where to stay in Newgale",
  intro: "Curated accommodation for surf trips built around Newgale Beach and the Pembrokeshire Coast Path.",
  summary: "Stay close to Newgale Beach or choose a countryside base within easy reach of the surf.",
  bestFor: "Surf trips, families, couples and coast-path breaks",
  surfAccess: "Options range from about 100 metres from the beach to roughly one mile inland",
  localFeel: "Long beach, open coast and small settlements",
  nearby: "Roch, Nolton Haven, Broad Haven and St Davids",
  why: "Newgale works particularly well as a surf base because staying nearby makes early beach checks and changing conditions easier to manage. The choices below are researched accommodation guides rather than personal Surfbooker reviews.",
  accommodationMix: "Current choices include a beach-close studio, a larger cottage and four small countryside cottages at Rainbolts Hill Farm.",
  image: "/guides/_licensed-images/uk-destinations/newgale.jpg",
  imageAlt: "Newgale Beach on the Pembrokeshire coast",
  relatedSlugs: ["broad-haven", "nolton-haven", "whitesands"],
  surfLinks: [["Newgale surf guide", "/guides/surfing-newgale/", "Check access, conditions and practical beach information."], ["Newgale surf lessons", "/surf-lessons/newgale/", "Review current lesson information for Newgale."], ["Newgale surf hire", "/surf-hire/newgale/", "Plan board and wetsuit hire near the beach."]]
});

const destinationClusters = {
  "westward-ho": ["westward-ho", "northam", "appledore", "instow", "bideford"],
  croyde: ["croyde", "saunton", "braunton", "putsborough"],
  woolacombe: ["woolacombe", "mortehoe", "putsborough"],
  "south-devon": ["bantham", "bigbury-on-sea", "challaborough"]
};

function clusterForArea(area) {
  if (area.cluster) return area.cluster;
  for (const [cluster, slugs] of Object.entries(destinationClusters)) {
    if (slugs.includes(area.slug)) return cluster;
  }
  return area.regionSlug;
}

function relatedAreasFor(area, limit = 4) {
  const preferred = area.relatedSlugs?.length
    ? area.relatedSlugs
    : (destinationClusters[clusterForArea(area)] || []);
  return preferred
    .filter((slug) => slug !== area.slug)
    .map((slug) => accommodationAreas.find((candidate) => candidate.slug === slug))
    .filter(Boolean)
    .slice(0, limit);
}

const accommodationRegions = [
  {
    slug: "devon",
    name: "Devon",
    h1: "Where to stay for a Devon surf trip",
    eyebrow: "Devon accommodation",
    intro: "Browse accommodation bases across Devon, with North and South Devon places together on one page.",
    summary: "Browse every current Devon accommodation place in one county-wide directory.",
    image: "/images/Beach%20Guides.jpg",
    imageAlt: "Devon coastline and beach"
  },
  {
    slug: "north-devon",
    name: "North Devon",
    h1: "Where to stay in North Devon",
    eyebrow: "North Devon accommodation",
    intro: "Compare practical beach, village, estuary and town bases around the North Devon coast.",
    summary: "Explore beach, village, estuary and town bases across North Devon.",
    image: "/guides/Croyde/Croyde%20water%20and%20sand%203.jpg",
    imageAlt: "North Devon coastline at Croyde"
  },
  {
    slug: "south-devon",
    name: "South Devon",
    h1: "Where to stay in South Devon",
    eyebrow: "South Devon accommodation",
    intro: "Use Surfbooker’s beach, lesson and hire guides to choose a practical South Devon base for your trip.",
    summary: "Plan a stay around South Devon’s beaches, villages and surf options.",
    image: "/guides/Bigbury-on-sea/zoomed%20out%20view.jpeg",
    imageAlt: "South Devon coastline at Bigbury-on-Sea"
  },
  {
    slug: "cornwall",
    name: "Cornwall",
    h1: "Where to stay for a Cornwall surf trip",
    eyebrow: "Cornwall accommodation",
    intro: "Use Surfbooker’s Cornwall beach, lesson and hire guides to narrow down the right part of the coast.",
    summary: "Choose a Cornwall base using local beach, lesson and hire information.",
    image: "/guides/_licensed-images/cornwall/fistral-beach.jpg",
    imageAlt: "Fistral Beach on the Cornwall coast"
  },
  {
    slug: "wales", name: "Wales", h1: "Where to stay for a Wales surf trip", eyebrow: "Wales accommodation",
    intro: "Compare coastal bases across Gower, Pembrokeshire, Anglesey, Llŷn and the South Wales coast.", summary: "Explore accommodation bases around Wales's surf coast.",
    image: "/images/Surfers%20on%20beach.avif", imageAlt: "Surfers on the Welsh coast"
  },
  {
    slug: "scotland", name: "Scotland", h1: "Where to stay for a Scotland surf trip", eyebrow: "Scotland accommodation",
    intro: "Compare bases for Scotland's north, east, northeast, island and Atlantic surf coasts.", summary: "Plan stays around Scotland's varied surf coast.",
    image: "/images/generic%20wave.jpg", imageAlt: "Surf on the Scottish coast"
  },
  {
    slug: "northern-ireland", name: "Northern Ireland", h1: "Where to stay for a Northern Ireland surf trip", eyebrow: "Northern Ireland accommodation",
    intro: "Compare practical bases around the Causeway Coast and north Antrim surf destinations.", summary: "Find a base for Northern Ireland's north coast.",
    image: "/images/Surfer%20on%20wave%202.avif", imageAlt: "Surfer on the Northern Ireland coast"
  },
  {
    slug: "northeast-england-yorkshire", name: "Northeast England & Yorkshire", h1: "Where to stay for a northeast England surf trip", eyebrow: "Northeast England accommodation",
    intro: "Compare coastal bases from Tynemouth and Northumberland to Teesside and Yorkshire.", summary: "Explore stays around northeast England and Yorkshire surf beaches.",
    image: "/images/Surfers%20in%20waves.jpg", imageAlt: "Surfers on England's northeast coast"
  },
  {
    slug: "southern-england", name: "Southern England", h1: "Where to stay for a southern England surf trip", eyebrow: "Southern England accommodation",
    intro: "Compare surf-trip bases across Dorset, Sussex, Kent and the Isle of Wight.", summary: "Plan a stay around southern England's surf destinations.",
    image: "/images/Beach%20Guides.jpg", imageAlt: "Southern England coastline"
  }
];

export const accommodationProperties = [
  {
    slug: "the-royal-hotel-bideford", name: "The Royal Hotel", pageTitle: "The Royal Hotel Bideford | Stay Near Westward Ho! | Surfbooker",
    metaDescription: "The Royal Hotel is a historic riverside Bideford hotel with 32 rooms, free guest parking and on-site dining, a practical base for surfing Westward Ho!.",
    areaSlug: "bideford", destinationSlugs: ["bideford"], enquiryDestination: "Bideford", location: "Bideford, North Devon",
    streetAddress: "Barnstaple Street", postalCode: "EX39 4AE", operator: "Brend Collection", stayType: "Historic riverside hotel", schemaType: "Hotel",
    accommodation: "32 rooms with single, couple, family and river-view options", suitableFor: "Solo travellers, couples, families, dog owners and surfers who prefer hotel service",
    sleepsOrRooms: "Rooms sleep from one to four guests", roomTypes: "Kingsley Suite, Royal River View, Refined Royal, Classic Comforts, Cosy and Single rooms",
    roomFeatures: "En-suite bath or shower, tea and coffee facilities, toiletries and hairdryer", parking: "Two free barrier-operated guest car parks",
    dogs: "Dog-friendly room options; an additional nightly charge applies", beachAccess: "Westward Ho! is roughly 3.5 miles away by road",
    checkIn: "From 3pm", checkOut: "By 11am",
    confirmedFeatures: "Free Wi-Fi, lift, bike storage, restaurant, lounge, room service and direct access or close proximity to the Tarka Trail",
    overview: "A historic riverside hotel and comfortable base for exploring Bideford, Westward Ho! and the North Devon coast.",
    overviewDetail: "The Royal Hotel is a historic riverside hotel with 32 rooms beside Bideford Bridge and the River Torridge, with free guest parking and on-site dining.",
    surfTripFit: "A proper Bideford hotel base with parking, breakfast and dining, while Westward Ho!'s long sandy surfing beach is a short drive away.",
    heroImage: "/images/accommodation/bideford/Bideford%20Bridge.jpg", heroImageAlt: "Bideford Long Bridge and the River Torridge near The Royal Hotel", representativeImage: true, gallery: [],
    reviewStatus: "Accommodation review", reviewStatusHeading: "Review pending.", reviewStatusCopy: "Our independent review will be added after we visit.",
    hideOperatorFact: true, hideReviewStatusFact: true, hideStayTypeFact: true, hideRoomsFact: true,
    sections: [
      ["Why it works for a surf trip", "The Royal is not a surf-front hotel. It gives you a Bideford base with free parking, breakfast, a restaurant and comfortable rooms, while Westward Ho!'s long sandy beach and surf are a short drive away. No surfboard storage, wetsuit-drying area, surf shower, hire or surf transport is currently confirmed."],
      ["Parking", "The hotel has two free barrier-operated guest car parks. One is directly opposite and an overflow car park is approximately 20 yards up the hill; guests collect a token from reception when required. Free parking is useful when boards, wetsuits and beach gear are travelling in the car, but it does not imply equipment can be stored inside the hotel."],
      ["Eat and drink at The Royal", "Merchants Brasserie serves lunch and dinner and permits well-behaved dogs on leads; non-residents can also dine there. The Kingsley Lounge overlooks the River Torridge and serves drinks, coffee and lighter food. Palm Court is used for Sunday carvery and events. Breakfast, afternoon tea, a children's menu and room service are also available."],
      ["Breakfast", "Breakfast is available each morning. If you're planning an early surf, check the current breakfast times with the hotel when booking."],
      ["A little history", "Parts of The Royal date to the 17th century. The hotel traces the property to a Colonial House established in 1688; it later served as Bideford's jail. Historic panelling and an ornate ceiling remain in the Kingsley Lounge, where author Charles Kingsley stayed."],
      ["When you're not surfing", "The hotel is well placed for Bideford quayside and the Tarka Trail. Westward Ho!, Appledore and Instow add beach, estuary and village options elsewhere around the Torridge area."]
    ],
    collectionLabel: "Rooms", collectionHeading: "Choose the room type that fits the trip.",
    collectionChoices: [
      ["Kingsley Suite", "Sleeps 2–4", "River view, family-friendly layout, seating and dining areas, with king, double or twin configuration depending on booking."],
      ["Royal River View Rooms", "Sleeps 2", "River Torridge views with king, double or twin options and an en-suite bath or shower."],
      ["Refined Royal Rooms", "Sleeps 2–4", "Modernised family-friendly rooms with king, double or twin options."],
      ["Classic Comforts", "Sleeps 2–4", "Family-friendly rooms with dog-friendly options and king, double or twin configurations."],
      ["Cosy Rooms", "Sleeps 2", "Smaller en-suite rooms with dog-friendly options."],
      ["Single Rooms", "Sleeps 1", "Dedicated en-suite rooms for solo travellers, with dog-friendly options."]
    ],
    cardSections: [{ label: "Best for", heading: "Who the hotel may suit.", cards: [
      ["Couples", "A hotel base with on-site dining and river-view room options."], ["Families", "Rooms sleeping up to four, a children's menu and access to North Devon day trips. Ask about current family offers."],
      ["Surfers who want a hotel", "An alternative to self-catering when breakfast, a restaurant, parking and hotel service matter."], ["Dog owners", "Dog-friendly room options, dog-friendly dining in Merchants Brasserie and access to the Tarka Trail."],
      ["Solo travellers", "Dedicated single rooms are available."]
    ] }],
    faqItems: [
      ["How far is The Royal Hotel from Westward Ho!?", "The hotel is in Bideford and Westward Ho! is roughly 3.5 miles away by road. It is a driving base, not beachfront accommodation."],
      ["Is The Royal Hotel practical for a surf trip?", "It can be a practical option for surfers who prefer a hotel with parking, breakfast and on-site dining. Dedicated surf storage, drying facilities and surf transport are not currently confirmed."],
      ["Does The Royal Hotel have free parking?", "Yes. It has two free barrier-operated guest car parks, one opposite the hotel and an overflow car park approximately 20 yards up the hill."],
      ["Is The Royal Hotel dog friendly?", "Dog-friendly rooms are available with an additional nightly charge. Well-behaved dogs on leads are also permitted in Merchants Brasserie."],
      ["Does The Royal Hotel have a restaurant?", "Yes. Merchants Brasserie serves lunch and dinner, and the hotel also offers breakfast, Sunday carvery, afternoon tea, drinks, a children's menu and room service."],
      ["Does The Royal Hotel have family rooms?", "Yes. Several room categories sleep up to four. Ask about current family rates and packages when enquiring."],
      ["What time is check-in at The Royal Hotel?", "Standard check-in is from 3pm and check-out is by 11am. Guests may use hotel facilities before or after those times under the hotel's current policy."]
    ],
    futureOffer: { enabled: false, title: "Surfbooker offer", rate: "", promoCode: "", applicableDates: "", exclusions: "", terms: "", expiryDate: "" },
    postVisitQuestions: ["Which room did we stay in?", "How comfortable and quiet was it?", "How good was breakfast and how practical were its times for an early surf?", "How easy was parking with a surfboard?", "Will the hotel allow boards inside or provide secure storage?", "Is there anywhere to hang or dry wetsuits, or an outside tap or shower?", "How long did the actual drive to Westward Ho! take and where was best to park?", "How good was Merchants Brasserie and what would we order again?", "What local places did hotel staff recommend?", "Did it work for a non-surfing partner or family?", "What was Bideford like in the evening?", "Would we return, which room would we choose and what could be improved?"],
    status: "verified", pageEligible: true, approvedImage: true, sourceUrls: ["owner-supplied verified partner information"], lastVerified: "2026-09-29",
    verificationNotes: "Verified information supplied by the Surfbooker owner during current partner discussions. Authorised hotel imagery and breakfast-time confirmation are outstanding.",
    tags: ["32 rooms", "Free guest parking", "Restaurant", "Dog-friendly rooms", "Family rooms", "Near Tarka Trail"]
  },
  {
    slug: "ocean-view-studio-newgale", name: "Ocean View Studio", pageTitle: "Ocean View Studio Newgale | Surf Accommodation Guide | Surfbooker",
    metaDescription: "Ocean View Studio is a dog-friendly self-catering stay for two around 100 metres from Newgale Beach, with sea views, roof terrace and parking.",
    areaSlug: "newgale", location: "Newgale, Pembrokeshire", operator: "Coastal Holidays Pembrokeshire", stayType: "Self-catering studio apartment",
    accommodation: "King-size bed, shower room and equipped kitchen", suitableFor: "Two guests; couples and solo surf trips", sleepsOrRooms: "Sleeps 2",
    roomFeatures: "King-size bed, shower room, Smart TV and washing machine", parking: "Private parking for one car", dogs: "Dog friendly",
    beachAccess: "Approximately 100 metres from Newgale Beach", confirmedFeatures: "Sea views, roof terrace, equipped kitchen, travel cot and highchair available on request",
    overview: "A self-catering studio for two overlooking the coast and around 100 metres from Newgale Beach.",
    overviewDetail: "Ocean View Studio is a dog-friendly self-catering studio for two in Newgale, approximately 100 metres from the beach, with sea views, roof terrace and private parking.",
    surfTripFit: "About as convenient as it gets for a Newgale surf trip: a compact self-catering base around 100 metres from the beach.",
    heroImage: "/guides/_licensed-images/uk-destinations/newgale.jpg", heroImageAlt: "Newgale Beach, used as a location image for Ocean View Studio", gallery: [],
    reviewStatus: "Accommodation guide", reviewStatusCopy: "Verified property information; Surfbooker has not yet personally reviewed this stay.",
    sections: [
      ["Why it works for a Newgale surf trip", "The short walk to the beach makes early surf checks and changes in wind or tide easier to respond to. No dedicated board storage or wetsuit-drying facilities are currently confirmed."],
      ["Who it is best for", "Best suited to one or two guests who value proximity to the beach over extra bedrooms or group space."],
      ["Nearby surf", "Newgale is the immediate option. Broad Haven and Whitesands provide useful alternatives elsewhere on the Pembrokeshire coast when conditions suggest a change of beach."]
    ],
    status: "verified", pageEligible: true, approvedImage: true, sourceUrls: ["owner-supplied verified research"], lastVerified: "2026-09-29",
    verificationNotes: "Facts supplied and identified as verified by the Surfbooker owner. Authorised property imagery is still required.", tags: ["Sleeps 2", "~100m from beach", "Dog friendly", "Sea views", "Roof terrace", "Private parking"]
  },
  {
    slug: "southwood-cottage-newgale", name: "Southwood Cottage", pageTitle: "Southwood Cottage Newgale | Accommodation Guide | Surfbooker",
    metaDescription: "Southwood Cottage is a dog-friendly three-bedroom Newgale stay for up to six, around a five-minute walk from the beach, with sea views and a hot tub.",
    areaSlug: "newgale", location: "Overlooking Newgale and St Brides Bay, Pembrokeshire", operator: "Coastal Holidays Pembrokeshire", stayType: "Three-bedroom self-catering cottage",
    accommodation: "Three bedrooms, well-equipped kitchen and wood burner", suitableFor: "Families, friends and small surf groups", sleepsOrRooms: "Sleeps up to 6",
    parking: "Parking details should be confirmed through the enquiry", dogs: "Dog friendly", beachAccess: "Approximately a five-minute walk to Newgale Beach",
    confirmedFeatures: "Sea and coastal views, hot tub, spacious private garden, wood burner and well-equipped kitchen",
    overview: "A larger self-catering option overlooking Newgale and St Brides Bay, suited to families and groups.",
    overviewDetail: "Southwood Cottage is a dog-friendly three-bedroom cottage for up to six, approximately a five-minute walk from Newgale Beach, with coastal views, a hot tub and spacious garden.",
    surfTripFit: "The stronger choice for families, friends or a small surf group needing considerably more space than a studio.",
    heroImage: "/guides/_licensed-images/uk-destinations/newgale.jpg", heroImageAlt: "Newgale Beach and coast, used as a location image for Southwood Cottage", gallery: [],
    reviewStatus: "Accommodation guide", reviewStatusCopy: "Verified property information; Surfbooker has not yet personally reviewed this stay.",
    sections: [
      ["Why it works for a Newgale surf trip", "A five-minute walk keeps the beach practical while three bedrooms, a garden and shared living space better suit families or several surfers travelling together. The Pembrokeshire Coast Path runs close to the property."],
      ["Who it is best for", "A practical choice for up to six guests who need more room than Ocean View Studio and want to remain within walking distance of Newgale Beach."],
      ["Nearby surf", "Newgale is the closest beach. Broad Haven and Whitesands are useful comparison points when swell, wind or group ability calls for another option."]
    ],
    status: "verified", pageEligible: true, approvedImage: true, sourceUrls: ["owner-supplied verified research"], lastVerified: "2026-09-29",
    verificationNotes: "Facts supplied and identified as verified by the Surfbooker owner. Authorised property imagery is still required.", tags: ["Sleeps up to 6", "~5-minute walk", "Dog friendly", "Sea views", "Hot tub", "Private garden"]
  },
  {
    slug: "newgale-holidays", name: "Newgale Holidays", pageTitle: "Newgale Holidays | Places to Stay Near Newgale Beach | Surfbooker",
    metaDescription: "Guide to four dog-friendly Newgale Holidays cottages at Rainbolts Hill Farm, around a mile from Newgale Beach, with parking and a local shuttle service.",
    areaSlug: "newgale", location: "Rainbolts Hill Farm, Roch, Pembrokeshire, SA62 6AF", operator: "Newgale Holidays", stayType: "Collection of four self-catering cottages",
    accommodation: "Caldey, Grassholm, Ramsey and Skomer cottages", suitableFor: "Two adults and one child in each cottage", sleepsOrRooms: "Each cottage sleeps 2 adults + 1 child",
    parking: "Private parking and EV charging", dogs: "All four cottages are dog friendly", beachAccess: "Approximately one mile from Newgale Beach",
    confirmedFeatures: "Wi-Fi, equipped kitchens, private patios or terraces, towels and linen, laundry facilities, dog exercise area and coastal outlook",
    overview: "Four small self-catering cottages at Rainbolts Hill Farm, around a mile from Newgale Beach.",
    overviewDetail: "Newgale Holidays operates four dog-friendly self-catering cottages at Rainbolts Hill Farm, around a mile from Newgale Beach, within approximately 143 acres of countryside.",
    surfTripFit: "A countryside option for couples or small families who want to remain close to Newgale and the Pembrokeshire Coast Path.",
    heroImage: "/guides/_licensed-images/uk-destinations/newgale.jpg", heroImageAlt: "Newgale Beach, used as a location image for the Newgale Holidays cottages", gallery: [],
    reviewStatus: "Accommodation guide", reviewStatusCopy: "Verified collection information; Surfbooker has not yet personally reviewed these cottages.",
    sections: [
      ["Beach shuttle", "Newgale Holidays advertises a shuttle service to Newgale Beach, Nolton Haven and the Pembrokeshire Coast Path. Confirm times, capacity and luggage arrangements directly; carriage of surfboards is not currently verified."],
      ["Accessibility", "Three of the four cottages are described by the operator as single-level and wheelchair accessible. Ramsey is specifically confirmed as wheelchair accessible; confirm the most suitable cottage directly before booking."],
      ["Why it works for a Newgale surf trip", "The site trades immediate beach access for countryside space, parking and a dog exercise area while keeping Newgale roughly one mile away."]
    ],
    collectionChoices: [
      ["Caldey Cottage", "Sleeps 2 adults + 1 child", "Two-storey former grain store with private patio, hot tub, underfloor heating, Wi-Fi, parking and EV charging."],
      ["Grassholm Cottage", "Sleeps 2 adults + 1 child", "Dog-friendly cottage. Only collection-wide verified facilities are stated here until individual details are confirmed."],
      ["Ramsey Cottage", "Sleeps 2 adults + 1 child", "One-bedroom, wheelchair-accessible cottage with private terrace, underfloor heating and views towards St Brides Bay and Ramsey Island."],
      ["Skomer Cottage", "Sleeps 2 adults + 1 child", "Single-level one-bedroom barn conversion with hot tub, private patio, underfloor heating, Wi-Fi, parking and EV charging."]
    ],
    status: "verified", pageEligible: true, approvedImage: true, sourceUrls: ["https://www.newgaleholidays.co.uk/", "https://www.newgaleholidays.co.uk/cottages/", "https://www.newgaleholidays.co.uk/facilities/"], lastVerified: "2026-09-29",
    verificationNotes: "Official Newgale Holidays pages and owner-supplied verified research. Campsite deliberately excluded as a separate operation.", tags: ["Four cottages", "~1 mile from beach", "Dog friendly", "Beach shuttle", "EV charging", "Private parking"]
  },
  {
    slug: "westbeach-holiday-apartments",
    name: "Westbeach Holiday Apartments",
    pageTitle: "Westbeach Holiday Apartments | Westward Ho! Accommodation | Surfbooker",
    metaDescription: "Westbeach Holiday Apartments in Westward Ho!: self-catering coastal stays with kitchens, private balconies and a flexible base for North Devon surf trips.",
    areaSlug: "westward-ho",
    location: "Westward Ho!, North Devon",
    stayType: "Self-catering holiday apartments",
    accommodation: "Fully equipped kitchens, private balconies, Smart TVs and super-fast Wi-Fi",
    suitableFor: "Couples, families and guests travelling with dogs",
    overview: "Self-catering apartments for couples, families and coastal breaks in Westward Ho!.",
    overviewDetail: "Westbeach Holiday Apartments provides self-catering stays with fully equipped kitchens, private balconies, Smart TVs and super-fast Wi-Fi. The apartments are suitable for couples, families and guests travelling with dogs.",
    surfTripFit: "Flexible self-catering stays for beach days, surf sessions and exploring North Devon.",
    heroImage: "/images/Westward Ho Accomodation.jpg",
    heroImageAlt: "Westward Ho! beach in North Devon, representing the location of Westbeach Holiday Apartments",
    heroPlaceholder: false,
    gallery: [],
    status: "verified",
    pageEligible: true,
    approvedImage: true,
    sourceUrls: ["https://westbeachholidayapartments.com/", "https://westbeachholidayapartments.com/contact/"],
    lastVerified: "2026-08-23",
    verificationNotes: "Official property pages verify the public facts. The image is a clearly identified Surfbooker-owned designed placeholder, not a property photograph.",
    tags: ["Self-catering", "Private balconies", "Dog-friendly stay"]
  },
  {
    slug: "the-waterfront-inn",
    name: "The Waterfront Inn",
    pageTitle: "The Waterfront Inn | Westward Ho! Accommodation | Surfbooker",
    metaDescription: "The Waterfront Inn is a beachside Westward Ho! B&B with en-suite rooms and family suites, well placed for a North Devon surf break.",
    areaSlug: "westward-ho",
    location: "Westward Ho!, North Devon",
    stayType: "Bed and breakfast / inn",
    accommodation: "11 en-suite rooms",
    roomTypes: "Double rooms and family suites",
    roomFeatures: "Tea and coffee facilities, flat-screen TVs and hairdryers",
    overview: "Beachside bed and breakfast accommodation in Westward Ho!.",
    overviewDetail: "The Waterfront Inn provides 11 en-suite rooms, including double rooms and family suites. Confirmed room features are tea and coffee facilities, flat-screen TVs and hairdryers.",
    surfTripFit: "A beachside overnight base close to Westward Ho! beach and village.",
    heroImage: "/images/accommodation/properties/the-waterfront-inn/Waterfront%20Inn.JPEG",
    heroImageAlt: "The Waterfront Inn in Westward Ho!, North Devon",
    gallery: [],
    status: "verified",
    pageEligible: true,
    approvedImage: true,
    sourceUrls: ["https://www.waterfrontinn.co.uk/", "https://www.waterfrontinn.co.uk/accommodation/"],
    lastVerified: "2026-08-23",
    verificationNotes: "Official property pages verify the Westward Ho! location, B&B type, room count, room types and public highlights. Surfbooker-owned local image supplied by the site owner.",
    suitableFor: "Solo travellers, families and groups",
    tags: ["Beachside B&B", "En-suite rooms", "Family suites"]
  },
  {
    slug: "surf-bay-holiday-park",
    name: "Surf Bay Holiday Park",
    pageTitle: "Surf Bay Holiday Park | Westward Ho! Accommodation | Surfbooker",
    metaDescription: "Surf Bay Holiday Park offers self-catering apartments and static caravans in Westward Ho!, a flexible base for North Devon beach and surf breaks.",
    areaSlug: "westward-ho",
    location: "Westward Ho!, North Devon",
    stayType: "Holiday park",
    accommodation: "Self-catering holiday apartments and static caravans",
    suitableFor: "Couples, families and groups",
    overview: "Self-catering holiday-park stays for North Devon beach and surf breaks.",
    overviewDetail: "Surf Bay Holiday Park offers self-catering holiday apartments and static caravans in Westward Ho!, suitable for couples, families and groups.",
    surfTripFit: "A flexible self-catering base near Westward Ho! village and beach.",
    heroImage: "/images/accommodation/properties/surf-bay-holiday-park/Surf%20Bay%20Holiday%20Park.jpg",
    heroImageAlt: "Surf Bay Holiday Park in Westward Ho!, North Devon",
    gallery: [],
    status: "verified",
    pageEligible: true,
    approvedImage: true,
    sourceUrls: ["https://www.surfbay.co.uk/", "https://www.surfbay.co.uk/accommodation"],
    lastVerified: "2026-08-23",
    verificationNotes: "Official property pages verify the Westward Ho! holiday park and apartment accommodation. Surfbooker-owned local image supplied by the site owner.",
    tags: ["Holiday park", "Self-catering", "Family stays"]
  },
  {
    slug: "modern-apartment-westward-ho",
    name: "Spacious 2 Bedroom Apartment with Fantastic View, Westward Ho!",
    pageTitle: "Spacious 2 Bedroom Apartment with Fantastic View, Westward Ho! | Surfbooker",
    metaDescription: "Surfbooker reviews Westward Lookout, a spacious two-bedroom Westward Ho! apartment for four guests with beach access and fantastic ocean views.",
    areaSlug: "westward-ho",
    location: "Westward Ho!, North Devon",
    listingName: "Westward Lookout",
    stayType: "Entire self-catering apartment",
    accommodation: "Two bedrooms, two beds and 1.5 bathrooms",
    suitableFor: "Up to four guests",
    sleepsOrRooms: "King-size master bedroom and double second bedroom",
    roomFeatures: "Sea views from both bedrooms and a half bathroom en suite to the master bedroom",
    parking: "Free on-street parking",
    checkIn: "After 4pm, with self check-in by smart lock",
    checkOut: "Before 10am",
    guestRating: "4.89 out of 5 from 96 reviews at the time checked",
    overview: "A spacious two-bedroom Westward Ho! stay for four guests with a fantastic outlook across the village, beach and North Devon coast.",
    overviewDetail: "Westward Lookout is an entire two-bedroom self-catering apartment for four guests in Westward Ho!, with a king-size bed, double bed, 1.5 bathrooms, full kitchen, private entrance, self check-in and ocean views.",
    surfTripFit: "A comfortable self-catering base with a standout view across Westward Ho! beach and the coastline.",
    confirmedFeatures: "Full kitchen, Wi-Fi, TV, washing machine, bath, private entrance and beach access",
    heroImage: "/images/accommodation/properties/modern-apartment-westward-ho/Westward-Ho-Sea-View.webp",
    heroImageAlt: "Wide view across Westward Ho! village, beach and the North Devon coast from the apartment",
    gallery: [
      {
        src: "/images/accommodation/properties/modern-apartment-westward-ho/Living-Room-Sea-View.webp",
        alt: "Comfortable living room with a large window overlooking Westward Ho! beach and coastline"
      },
      {
        src: "/images/accommodation/properties/modern-apartment-westward-ho/Kitchen.webp",
        alt: "Bright self-catering kitchen inside the spacious two-bedroom apartment in Westward Ho!"
      }
    ],
    reviewHeading: "A spacious stay built around an exceptional view.",
    review: [
      "The fantastic view is the first thing that stands out. From the living room, the large window looks across Westward Ho! towards the beach, the sea and the sweep of the North Devon coastline. It gives the apartment a real sense of place and makes time indoors feel connected to the coast.",
      "The living room feels comfortable and genuinely spacious, with a large sofa positioned beside the window. It is an easy room for relaxing after the beach while still enjoying the outlook. The separate kitchen is bright and fully equipped for a self-catering stay.",
      "The sleeping arrangement works well for a family or small group: the master bedroom has a king-size bed, sea views and a half bathroom en suite, while the second bedroom has a double bed and its own coastal outlook. Guests have the entire apartment, a private entrance and self check-in by smart lock.",
      "The beach, village centre, shops and restaurants are walkable, which makes this a practical base for a Westward Ho! surf trip. The return walk includes some hills, so it may be less convenient for guests with limited mobility. As an older converted property, it has more character than a newly built apartment and some floors may be uneven.",
      "Guest feedback strongly supports the photographs: at the time checked, Westward Lookout was rated 4.89 out of 5 from 96 reviews and marked as a Guest Favourite. Reviews repeatedly highlight the view, location, walkability, cleanliness, comfort and spacious interior."
    ],
    reviewVerdict: "The standout feature is the view: a spacious two-bedroom base for four with Westward Ho! and the coastline laid out in front of you.",
    status: "verified",
    pageEligible: true,
    approvedImage: true,
    ownerVerified: true,
    schemaType: "VacationRental",
    sourceUrls: [],
    lastVerified: "2026-09-01",
    verificationNotes: "The Surfbooker owner supplied the Airbnb listing details and local images on 2026-09-01, confirming the preferred public review title and permission to use the images.",
    tags: ["Sleeps four", "Ocean views", "Beach access"]
  }
];

// Researched facts for directory-listed stays (data/stay-research/<slug>.json, each fact from the
// property's own site or tourism board). Closed / not-accommodation entries are dropped and redirected;
// ones we couldn't verify stay listed but are kept out of search results until they are.
export const removedStays = [];
// Same business listed twice under different names: keep one page, redirect the other.
export const DUPLICATE_STAYS = {
  "great-western-hotel": "the-great-western-hotel",
  "haven-perran-sands-holiday-park": "perran-sands-holiday-park",
  "saunton-sands-hotel-source-spa-and-wellness": "saunton-sands-hotel",
  "the-porthtowan-eco-park": "mount-pleasant-eco-park",
  "golden-coast-leisure-park": "woolacombe-bay-holiday-park",
  "driftwood-spars-rooms": "the-driftwood-spars-rooms"
};
// Where the property actually is, when that's not the beach it's listed under.
const STAY_LOCATIONS = {
  "the-godolphin-arms-marazion": "Marazion, Cornwall (near Praa Sands)", "mount-haven-hotel": "Marazion, Cornwall (near Praa Sands)",
  "the-old-coastguard-mousehole": "Mousehole, Cornwall", "the-victoria-inn-perranuthnoe-rooms": "Perranuthnoe, Cornwall (near Praa Sands)",
  "gara-rock": "East Portlemouth, near Salcombe, South Devon", "marine-hotel-salcombe": "Salcombe, South Devon",
  "hope-and-anchor-inn-rooms": "Hope Cove, South Devon", "the-cottage-hotel-hope-cove": "Hope Cove, South Devon",
  "the-seagate-hotel": "Appledore, North Devon", "stowford-farm-meadows": "Combe Martin, North Devon",
  "lower-campscott-farm-holiday-cottages": "Lee, near Ilfracombe, North Devon", "the-driftwood-spars-rooms": "Trevaunance Cove, St Agnes, Cornwall",
  "trevornick-holiday-park": "Holywell Bay, Cornwall"
};
function withStayResearch(property) {
  if (STAY_LOCATIONS[property.slug]) property = { ...property, location: STAY_LOCATIONS[property.slug] };
  if (DUPLICATE_STAYS[property.slug]) { removedStays.push({ ...property, redirectTo: DUPLICATE_STAYS[property.slug] }); return null; }
  const file = join(import.meta.dirname, "..", "data/stay-research", `${property.slug}.json`);
  if (!existsSync(file)) return property;
  const r = JSON.parse(readFileSync(file, "utf8"));
  if (r.trading === false) { removedStays.push(property); return null; }
  if (r.trading !== true) return { ...property, noindex: true, researchStatus: "unverified" };
  const sources = (r.sources || []).filter((x) => x?.url);
  const extras = [r.confirmedFeatures, r.boardStorage].filter(Boolean).join(". ");
  return {
    ...property,
    stayType: r.stayType || property.stayType,
    accommodation: r.accommodation || property.accommodation,
    suitableFor: r.suitableFor || property.suitableFor,
    parking: r.parking || property.parking,
    dogs: r.dogs || property.dogs,
    beachAccess: r.beachAccess || property.beachAccess,
    confirmedFeatures: extras || property.confirmedFeatures,
    overviewDetail: r.overview || property.overviewDetail,
    surfTripFit: r.surfTripFit || property.surfTripFit,
    pageTitle: `${property.name}, ${property.location.split(",")[0]} | Surf Trip Stay | Surfbooker`,
    metaDescription: (r.overview || "").length > 60 ? r.overview.replace(/\s+\S*$/, "").slice(0, 155).replace(/[,;:\s]+\S*$/, "") + "." : property.metaDescription,
    sourceUrls: sources.map((x) => x.url),
    researchSources: sources,
    researchStatus: "researched",
    lastVerified: r.lastVerified || "2026-10-13",
    verificationNotes: r.verificationNote || "Details researched from the property's own website or the local tourism board in October 2026. Surfbooker has not stayed here; check facilities and policies directly when you enquire.",
    tags: [r.stayType && r.stayType.length < 28 ? r.stayType : property.stayType, ...(/dog/i.test(r.dogs || "") && !/no dogs|not allowed|no pets/i.test(r.dogs) ? ["Dog-friendly"] : []), ...(property.tags || []).slice(1)].filter(Boolean).slice(0, 4)
  };
}
const directoryAccommodationProperties = buildDirectoryAccommodationProperties().map(withStayResearch).filter(Boolean);

export const publicAccommodationProperties = [
  ...accommodationProperties.filter(isPublicProperty),
  ...directoryAccommodationProperties
];

const westwardFeaturedCards = publicAccommodationProperties.filter((property) => property.areaSlug === "westward-ho" && property.status === "verified").map((property) => ({
    name: property.name,
    image: property.heroImage,
    imageAlt: property.heroImageAlt,
    location: property.location,
    summary: property.surfTripFit,
    type: property.stayType,
    tags: property.tags,
    href: `/accommodation/stays/${property.slug}/`,
    placeholder: Boolean(property.heroPlaceholder)
  }));

export function buildAccommodationPages(rootDir) {
  validateAccommodationData();
  write(rootDir, "accommodation/index.html", renderAccommodationIndex());
  for (const region of accommodationRegions) {
    write(rootDir, `accommodation/${region.slug}/index.html`, renderAccommodationRegionPage(region));
  }
  for (const area of accommodationAreas) {
    write(rootDir, `accommodation/${area.slug}/index.html`, renderAreaPage(area));
  }
  write(rootDir, "list-your-accommodation/index.html", renderOwnerPage());
  for (const property of publicAccommodationProperties) {
    let page = renderAccommodationPropertyPage(property);
    if (property.noindex) page = page.replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex,follow">');
    write(rootDir, `accommodation/stays/${property.slug}/index.html`, page);
  }
  for (const property of removedStays) rmSync(join(rootDir, `accommodation/stays/${property.slug}/index.html`), { force: true });
  for (const property of accommodationProperties.filter((candidate) => !publicAccommodationProperties.includes(candidate))) {
    rmSync(join(rootDir, `accommodation/stays/${property.slug}/index.html`), { force: true });
  }
}

function renderAccommodationIndex() {
  const path = "/accommodation/";
  const title = "Surf Accommodation Across the UK | Surfbooker";
  const description = "Compare practical places to stay near Surfbooker destinations across England, Wales, Scotland and Northern Ireland.";
  const planLinks = [
    ["Beach guides", "/guides/north-devon/", "Understand the beaches, access and local area before you travel."],
    ["Surf lessons", "/surf-lessons/north-devon/", "Compare lesson locations and find a setup that suits your group."],
    ["Surf hire", "/surf-hire/north-devon/", "Find boards, wetsuits and practical hire information."],
    ["Food and drink", "/guides/westwardho!/#food", "Use the existing Westward Ho! local guide for nearby food and drink ideas."]
  ];
  const royalHotel = publicAccommodationProperties.find((property) => property.slug === "the-royal-hotel-bideford");
  return renderPage({
    path,
    title,
    description,
    h1: "Find the right place to stay.",
    eyebrow: "Surf-friendly stays",
    intro: "",
    image: "/images/Accommodation.jpg",
    imageAlt: "Coastal accommodation overlooking the sea",
    breadcrumbs: [["Home", "/"], ["Accommodation", path]],
    content: `
      <section class="accommodation-section accommodation-destination-finder">
        <p class="section-label">Choose your destination</p>
        <div class="destination-search-controls">
          <input id="accommodation-destination-search" type="search" aria-label="Search accommodation destinations" placeholder="Try Westward Ho!, Croyde or Newquay" autocomplete="off">
          <div class="destination-filter-row" aria-label="Filter accommodation destinations">
            ${[["all", "All destinations"], ...accommodationRegions.map((region) => [region.slug, region.name])].map(([value, label], index) => `<button type="button" data-destination-filter="${value}" aria-pressed="${index === 0 ? "true" : "false"}">${label}</button>`).join("")}
          </div>
        </div>
        <div class="location-card-grid location-card-grid-large accommodation-direct-destination-grid" id="accommodation-destination-grid">
          ${accommodationAreas.map(renderLocationCard).join("")}
        </div>
        <p class="county-overview-links">Prefer a wider overview? ${accommodationRegions.map((region) => `<a href="/accommodation/${region.slug}/">${escapeHtml(region.name)}</a>`).join(", ")}.</p>
      </section>
      ${royalHotel ? renderPropertyCollection([royalHotel], "Partner stay: The Royal Hotel, Bideford") : ""}
      <section class="accommodation-section">
        <div class="accommodation-section-heading">
          <p class="section-label">Plan your surf trip</p>
          <h2>Sort the practical details before you arrive.</h2>
        </div>
        ${renderPlanCards(planLinks)}
      </section>
      ${renderDarkCta("Accommodation owners", "Own a great place to stay near the surf?", "Tell us about your property and be considered for a Surfbooker accommodation listing.", "List your accommodation")}
      <script>
        (() => {
          const search = document.getElementById("accommodation-destination-search");
          const grid = document.getElementById("accommodation-destination-grid");
          const cards = [...grid.querySelectorAll(".location-card")];
          const filters = [...document.querySelectorAll("[data-destination-filter]")];
          let activeFilter = "all";
          const update = () => {
            const query = search.value.trim().toLowerCase();
            for (const card of cards) {
              const matchesText = !query || card.dataset.search.includes(query);
              const matchesRegion = activeFilter === "all"
                || (activeFilter === "devon" && ["north-devon", "south-devon"].includes(card.dataset.region))
                || card.dataset.region === activeFilter;
              card.hidden = !(matchesText && matchesRegion);
            }
          };
          search.addEventListener("input", update);
          for (const filter of filters) {
            filter.addEventListener("click", () => {
              activeFilter = filter.dataset.destinationFilter;
              for (const item of filters) item.setAttribute("aria-pressed", String(item === filter));
              update();
            });
          }
          update();
        })();
      </script>
    `
  });
}

function renderAccommodationRegionPage(region) {
  const path = `/accommodation/${region.slug}/`;
  let content;
  const places = region.slug === "devon"
    ? accommodationAreas.filter((area) => ["north-devon", "south-devon"].includes(area.regionSlug))
    : accommodationAreas.filter((area) => area.regionSlug === region.slug);
  const regionAdvice = region.slug === "cornwall"
    ? "Cornwall is too large for one accommodation market. Choose the beach cluster first, then decide whether a town, surf village or quieter coastal base best suits the trip."
    : region.slug === "south-devon"
      ? "South Devon’s current accommodation coverage follows the linked surf coast around Bantham, Bigbury-on-Sea and Challaborough. Compare the setting and beach access before choosing a property."
      : region.slug === "north-devon"
        ? "North Devon includes direct beach bases, quieter villages and practical inland or estuary towns. The right choice depends on whether one beach or several will shape the trip."
        : "This county-wide directory places North and South Devon destinations together without forcing visitors through an extra regional step.";
  const royalHotel = publicAccommodationProperties.find((property) => property.slug === "the-royal-hotel-bideford");
  const featuredPartner = region.slug === "north-devon" && royalHotel ? renderPropertyCollection([royalHotel], "Partner stay in Bideford") : "";
  const walesFeatured = region.slug === "wales" ? `<section class="accommodation-section split-copy region-accommodation-intro"><div><p class="section-label">Featured in Broad Haven</p><h2><a href="/accommodation/stays/rwts-rooms-and-resto/">Rwts Rooms and Resto</a></h2></div><div><p>Rwts Rooms and Resto – nine en-suite seafront rooms with an on-site restaurant in Broad Haven, Pembrokeshire.</p><p><a class="text-link" href="/accommodation/broad-haven/">Broad Haven accommodation</a> · <a class="text-link" href="/guides/surfing-broad-haven/">Broad Haven guide</a></p></div></section>` : "";
  content = `${walesFeatured}<section class="accommodation-section split-copy region-accommodation-intro"><div><p class="section-label">Choosing a base</p><h2>Match the location to the surf trip.</h2></div><p>${escapeHtml(regionAdvice)}</p></section>${featuredPartner}<section class="accommodation-section location-directory-section"><h2 class="sr-only">Accommodation places across ${escapeHtml(region.name)}</h2><div class="location-card-grid location-card-grid-large">${places.map(renderLocationCard).join("")}</div></section>${renderDarkCta("Accommodation recommendations", `Know a ${region.name} stay that could be a good fit?`, "Tell us about the property and why it works well for a surf trip.", "Contact us here")}`;
  return renderPage({
    path,
    title: `${region.h1} | Surfbooker`,
    description: `${region.intro} Plan accommodation around the coast with Surfbooker.`,
    h1: region.h1,
    eyebrow: region.eyebrow,
    intro: region.intro,
    image: region.image,
    imageAlt: region.imageAlt,
    breadcrumbs: [["Home", "/"], ["Accommodation", "/accommodation/"], [region.name, path]],
    content
  });
}

// Stays with hand-built pages (not in the property data) that still belong on their area page.
const HAND_BUILT_STAYS = {
  "broad-haven": [{
    name: "Rwts Rooms and Resto", href: "/accommodation/stays/rwts-rooms-and-resto/",
    image: "/guides/_licensed-images/uk-destinations/broad-haven.jpg", imageAlt: "Broad Haven beach near Rwts Rooms and Resto",
    type: "Seafront rooms and restaurant", tags: ["Nine en-suite rooms", "On-site restaurant", "Review pending"]
  }]
};

// Search-focused titles for priority area pages.
const AREA_SEO = {
  "broad-haven": {
    seoTitle: "Broad Haven Accommodation: Where to Stay near the Beach, Pembrokeshire | Surfbooker",
    metaDescription: "Broad Haven accommodation for surf and beach trips: seafront rooms, B&Bs, a YHA hostel and self-catering near Broad Haven beach on St Brides Bay, with the local surf guide."
  }
};

function renderAreaPage(area) {
  area = { ...area, ...(AREA_SEO[area.slug] || {}) };
  const path = `/accommodation/${area.slug}/`;
  const title = area.seoTitle || `${area.h1} | Surf Accommodation | Surfbooker`;
  const description = area.metaDescription || `${area.intro} Compare the local setting, nearby surf beaches and practical stay information with Surfbooker.`;
  const region = accommodationRegions.find((item) => item.slug === area.regionSlug);
  const regionalLabel = region?.name || "Devon";
  const planLinks = area.surfLinks || (area.guidePath
    ? [
        [`${area.name} beach guide`, area.guidePath, "Check beach access, conditions and practical local detail."],
        [`${regionalLabel} surf lessons`, `/surf-lessons/${area.regionSlug}/`, "Compare lesson locations and providers for the region."],
        [`${regionalLabel} surf hire`, `/surf-hire/${area.regionSlug}/`, "Find boards, wetsuits and regional hire information."]
      ]
    : [
        ["Westward Ho! beach guide", "/guides/westwardho!/", "Check the beach, access, tides, facilities and practical local detail."],
        ["Westward Ho! surf lessons", "/surf-lessons/westward-ho/", "Compare local lesson providers and choose the right format for your trip."],
        ["Westward Ho! surf hire", "/surf-hire/westward-ho/", "Find boards, wetsuits and hire details close to the beach."]
      ]);
  if (area.slug === "westward-ho") {
    planLinks.push(["Westward Ho! food and local guide", "/guides/westwardho!/#food", "Browse the existing local guide for food, parking and things to do."]);
  }
  const localProperties = publicAccommodationProperties.filter((property) => (property.destinationSlugs || [property.areaSlug]).includes(area.slug));
  const handBuilt = HAND_BUILT_STAYS[area.slug] || [];
  const featuredSection = localProperties.length
    ? renderPropertyCollection(localProperties, `Places to stay in ${area.name}`, area).replace(
        '<div class="property-card-grid">',
        `<div class="property-card-grid">${handBuilt.map(renderPropertyCard).join("")}`
      )
    : handBuilt.length
    ? `<section class="accommodation-section featured-stays-section"><div class="accommodation-section-heading"><p class="section-label">Accommodation options</p><h2>Places to stay in ${escapeHtml(area.name)}</h2></div><div class="property-card-grid">${handBuilt.map(renderPropertyCard).join("")}</div></section>`
    : `<section class="accommodation-section featured-empty">
        <div class="featured-empty-mark" aria-hidden="true">SB</div>
        <div>
          <p class="section-label">Accommodation options</p>
          <h2>Places to stay in ${escapeHtml(area.name)}</h2>
          <p>Use the local guidance on this page to choose the right part of ${escapeHtml(area.name)}. Surfbooker only adds individual properties when enough trustworthy information is available.</p>
          <a class="button button-primary" href="/list-your-accommodation/">Enquire about adding a property</a>
        </div>
      </section>`;
  const staySummarySection = `<section class="accommodation-section destination-stay-summary">
        <div class="split-copy destination-stay-intro">
          <div><p class="section-label">About this destination</p><h2>Planning a stay in ${escapeHtml(area.name)}.</h2></div>
          <p>${escapeHtml(area.why)}</p>
        </div>
        <div class="destination-decision-grid compact-destination-facts">
          <article><h3>Best for</h3><p>${escapeHtml(area.bestFor)}</p></article>
          <article><h3>Setting</h3><p>${escapeHtml(area.localFeel)}</p></article>
          <article><h3>Getting to the surf</h3><p>${escapeHtml(area.surfAccess)}</p></article>
        </div>
      </section>`;
  const relatedAreas = relatedAreasFor(area);
  const nearbySection = relatedAreas.length ? `<section class="accommodation-section">
        <div class="accommodation-section-heading">
          <p class="section-label">Nearby accommodation</p>
          <h2>Compare related places to stay.</h2>
          <p>These places belong to the same practical surf-trip cluster rather than an arbitrary distance list.</p>
        </div>
        <div class="base-link-grid">
          ${relatedAreas.map((item) => `<a class="base-link" href="/accommodation/${item.slug}/"><span>${escapeHtml(item.name)}</span><small>${escapeHtml(item.localFeel)}</small></a>`).join("")}
        </div>
      </section>` : "";
  const ownerCta = renderDarkCta("Accommodation owners", `Own accommodation in ${area.name} that could be a good fit?`, "Send the details to Surfbooker for consideration or update an existing listing.", "Send accommodation details");
  return renderPage({
    path,
    title,
    description,
    h1: area.h1,
    eyebrow: area.eyebrow,
    intro: area.intro,
    image: area.image,
    imageAlt: area.imageAlt,
    placeholder: area.placeholder,
    breadcrumbs: [["Home", "/"], ["Accommodation", "/accommodation/"], [regionalLabel, `/accommodation/${area.regionSlug}/`], [area.name, path]],
    content: `
      ${featuredSection}
      ${staySummarySection}
      <section class="accommodation-section">
        <div class="accommodation-section-heading">
          <p class="section-label">Plan your ${escapeHtml(area.name)} surf trip</p>
          <h2>Connect your stay with the beach.</h2>
        </div>
        ${renderPlanCards(planLinks)}
      </section>
      ${nearbySection}
      ${ownerCta}
    `
  });
}

function renderOwnerPage() {
  const path = "/list-your-accommodation/";
  return renderPage({
    path,
    title: "List Your Accommodation on Surfbooker",
    description: "Tell Surfbooker about surf-friendly accommodation in Devon or Cornwall and why it works for a coastal trip.",
    h1: "List your accommodation on Surfbooker",
    eyebrow: "For accommodation owners",
    intro: "Tell us about your stay, who it suits and what makes it useful for a Devon or Cornwall surf trip.",
    image: "/images/Accommodation.jpg",
    imageAlt: "Coastal accommodation overlooking the sea",
    breadcrumbs: [["Home", "/"], ["List your accommodation", path]],
    bodyClass: "accommodation-owner-page",
    content: `
      <section class="accommodation-section owner-intro">
        <p>Surfbooker is creating a curated collection of surf-friendly places to stay. We focus on useful, accurate information that helps visitors choose the right base for their trip.</p>
      </section>
      <section class="accommodation-section owner-form-card">
        <form class="provider-form accommodation-form" id="accommodation-listing-form" name="accommodation-listing-enquiry" method="POST" action="/list-your-accommodation/" data-netlify="true" netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="accommodation-listing-enquiry">
          <p class="sr-only"><label>Do not fill this out if you’re human: <input name="bot-field"></label></p>
          <label><span>Your name</span><input type="text" name="name" autocomplete="name" required></label>
          <label><span>Business / property name</span><input type="text" name="property_name" required></label>
          <label><span>Email address</span><input type="email" name="email" autocomplete="email" required></label>
          <label><span>Phone number <small>(optional)</small></span><input type="tel" name="phone" autocomplete="tel"></label>
          <label class="form-wide"><span>Website or booking link <small>(optional)</small></span><input type="url" name="website" autocomplete="url"></label>
          <label><span>Property location</span><select name="property_location" required><option value="">Select a location</option>${[...accommodationAreas.map((area) => area.name), "Another coastal location"].map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}</select></label>
          <label><span>Accommodation type</span><select name="accommodation_type" required><option value="">Select a type</option>${["Hotel", "B&B / Guesthouse", "Holiday cottage", "Holiday apartment", "Holiday park", "Campsite / Glamping", "Other"].map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}</select></label>
          <label class="form-wide"><span>Sleeps / room count <small>(optional)</small></span><input type="text" name="sleeps_or_rooms"></label>
          <label class="form-wide"><span>What makes the property good for surf trips?</span><textarea name="surf_trip_fit" rows="5"></textarea></label>
          <fieldset class="feature-fields form-wide"><legend>Useful features</legend><div class="feature-check-grid">${["Walkable to beach", "Parking", "Board storage", "Wetsuit drying space", "Outdoor shower / tap", "Dog-friendly", "Family-friendly", "Group-friendly", "Accessible stay"].map((value) => `<label><input type="checkbox" name="useful_features" value="${escapeHtml(value)}"><span>${escapeHtml(value)}</span></label>`).join("")}</div></fieldset>
          <label class="form-wide"><span>Message / anything else we should know</span><textarea name="message" rows="6"></textarea></label>
          <label class="consent-row form-wide"><input type="checkbox" name="consent" value="yes" required><span>I agree that Surfbooker may use these details to review this accommodation enquiry and contact me about the listing. Read our <a href="/privacy/">privacy information</a>.</span></label>
          <div class="form-wide form-submit-row"><button type="submit">Send accommodation details</button><p class="form-status" id="accommodation-listing-status" aria-live="polite"></p></div>
        </form>
      </section>
      <script>
        (() => {
          const form = document.getElementById("accommodation-listing-form");
          const status = document.getElementById("accommodation-listing-status");
          form.addEventListener("submit", async (event) => {
            event.preventDefault();
            status.textContent = "Sending your accommodation details...";
            try {
              const response = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(new FormData(form)).toString() });
              if (!response.ok) throw new Error("Submission failed");
              status.textContent = "Thanks — we’ve received your accommodation details and will be in touch.";
              form.reset();
            } catch (error) {
              status.textContent = "Your details could not be sent just now. Please try again or email hello@surfbooker.com.";
            }
          });
        })();
      </script>
    `
  });
}

function renderPage({ path, title, description, h1, eyebrow, intro, image, imageAlt, placeholder = false, heroPlaceholder = false, heroBadge = "", heroAddress = "", breadcrumbs, content, bodyClass = "", structuredData = [] }) {
  const absoluteImage = `${baseUrl}${image}`;
  const breadcrumbLd = {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map(([name, url], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${baseUrl}${url}`
    }))
  };
  const webPageLd = {
    "@type": "WebPage",
    "@id": `${baseUrl}${path}#webpage`,
    url: `${baseUrl}${path}`,
    name: title,
    description,
    inLanguage: "en-GB",
    primaryImageOfPage: { "@type": "ImageObject", url: absoluteImage },
    breadcrumb: { "@id": `${baseUrl}${path}#breadcrumb` }
  };
  breadcrumbLd["@id"] = `${baseUrl}${path}#breadcrumb`;
  const schemaGraph = { "@context": "https://schema.org", "@graph": [webPageLd, breadcrumbLd, ...structuredData] };
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
  <meta property="og:image" content="${escapeHtml(absoluteImage)}">
  <meta property="og:image:alt" content="${escapeHtml(imageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(absoluteImage)}">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
  <script type="application/ld+json">${JSON.stringify(schemaGraph)}</script>
  <link rel="stylesheet" href="/styles.css">
  <link rel="stylesheet" href="/accommodation.css">
</head>
<body class="accommodation-page ${escapeHtml(bodyClass)}">
  <main>
    <section class="accommodation-hero${placeholder ? " accommodation-hero-placeholder" : ""}${heroPlaceholder ? " accommodation-hero-designed-placeholder" : ""}${path === "/accommodation/" ? " accommodation-hero-index" : ""}${path === "/accommodation/westward-ho/" ? " accommodation-hero-westward-ho" : ""}">
      ${heroPlaceholder ? '<div class="accommodation-placeholder-art" aria-hidden="true"><span>Westbeach</span><span>Holiday Apartments</span></div>' : `<img src="${escapeHtml(image)}" alt="${escapeHtml(imageAlt)}" fetchpriority="high">`}
      <div class="accommodation-hero-overlay"></div>
      ${heroBadge ? `<aside class="property-review-status-note property-review-status-hero" aria-label="Independent review status"><strong>${escapeHtml(heroBadge)}</strong></aside>` : ""}
      <a class="accommodation-hero-logo" href="/" aria-label="Surfbooker home"><img src="/images/brand/logo-transparent-fbs.png" alt="Surfbooker"></a>
      <div class="accommodation-hero-content">
        ${placeholder ? '<span class="placeholder-badge">Surfbooker coastal guide image</span>' : ""}
        ${heroAddress ? `<p class="section-label property-hero-address">${escapeHtml(heroAddress)}</p>` : ""}
        <h1>${escapeHtml(h1)}</h1>
        ${intro ? `<p>${escapeHtml(intro)}</p>` : ""}
      </div>
    </section>
    <div class="accommodation-content">${content}</div>
  </main>
  <footer class="site-footer"></footer>
</body>
</html>`;
}

function renderLocationCard(area) {
  const image = !area.placeholder
    ? `<div class="location-card-image"><img src="${escapeHtml(area.image)}" alt="${escapeHtml(area.imageAlt)}" loading="lazy"></div>`
    : "";
  const searchText = `${area.name} ${regionNameForArea(area)} ${area.summary}`.toLowerCase();
  return `<a class="location-card${image ? "" : " location-card-no-image"}" href="/accommodation/${area.slug}/" data-region="${escapeHtml(area.regionSlug)}" data-search="${escapeHtml(searchText)}">${image}<div class="location-card-copy"><div class="location-card-title-row"><h3>${escapeHtml(area.name)}</h3><span class="location-card-region">${escapeHtml(regionNameForArea(area))}</span></div></div></a>`;
}

function renderAccommodationRegionCard(region) {
  return `<a class="accommodation-region-card" href="/accommodation/${region.slug}/"><img src="${escapeHtml(region.image)}" alt="${escapeHtml(region.imageAlt)}" loading="lazy"><span class="accommodation-region-overlay" aria-hidden="true"></span><div><h3>${escapeHtml(region.name)}</h3><p>${escapeHtml(region.summary)}</p><span class="accommodation-region-action">Explore accommodation</span></div></a>`;
}

function renderWestwardFeaturedSection() {
  return `<section class="accommodation-section featured-stays-section">
    <div class="accommodation-section-heading">
      <p class="section-label">Featured stays</p>
      <h2>Featured places to stay near Westward Ho!</h2>
      <p>A concise shortlist of real local stays, with practical detail added only when it has been confirmed.</p>
    </div>
    <div class="property-card-grid">
      ${westwardFeaturedCards.map(renderPropertyCard).join("")}
    </div>
  </section>`;
}

function renderPropertyCollection(properties, heading, contextArea = null, options = {}) {
  const cards = properties.map((property, index) => {
    const representative = property.status === "directory-listed"
      ? representativeImageFor(property, contextArea, index)
      : null;
    return {
      name: property.name,
      image: representative?.src || property.heroImage,
      imageAlt: representative ? `${representative.alt}, used as a representative image for ${property.name}` : property.heroImageAlt,
      location: contextArea ? "" : property.location, // every card on an area page is in that area, so the line would just repeat
      summary: property.surfTripFit,
      type: property.stayType,
      tags: property.tags,
      action: property.cardAction || (property.areaSlug === "newgale" ? "View stay" : "Send enquiry"),
      href: `/accommodation/stays/${property.slug}/${contextArea ? `?destination=${encodeURIComponent(contextArea.slug)}` : ""}`,
      placeholder: Boolean(property.heroPlaceholder)
    };
  });
  const relatedAttributes = options.destinationSlug
    ? ` data-related-destination="${escapeHtml(options.destinationSlug)}"${options.hidden ? " hidden" : ""}`
    : "";
  return `<section class="accommodation-section featured-stays-section${options.destinationSlug ? " related-property-section" : ""}"${relatedAttributes}><div class="accommodation-section-heading"><p class="section-label">Accommodation options</p><h2>${escapeHtml(heading)}</h2></div><div class="property-card-grid">${cards.map(renderPropertyCard).join("")}</div></section>`;
}

function renderPropertyCard(property) {
  const displayType = property.type === "Accommodation option" ? "Independent accommodation" : property.type;
  const image = property.placeholder
    ? `<div class="property-card-placeholder" aria-hidden="true"><span>Westbeach</span><small>Holiday Apartments</small></div>`
    : `<img src="${escapeHtml(property.image)}" alt="${escapeHtml(property.imageAlt)}" loading="lazy">`;
  const tags = property.tags?.length ? `<div class="property-card-tags">${property.tags.map((tag) => `<span>${escapeHtml(tag === "Accommodation option" ? "Independent accommodation" : tag)}</span>`).join("")}</div>` : "";
  const cardContent = `<div class="property-card-image">${image}</div><div class="property-card-copy">${property.location ? `<p class="property-card-location">${escapeHtml(property.location)}</p>` : ""}<h3>${escapeHtml(property.name)}</h3>${displayType ? `<span class="property-card-type">${escapeHtml(displayType)}</span>` : ""}${tags}${property.href ? `<span class="property-card-action">${escapeHtml(property.action || "Send enquiry")}</span>` : ""}</div>`;
  return property.href
    ? `<a class="property-card" href="${escapeHtml(property.href)}">${cardContent}</a>`
    : `<article class="property-card">${cardContent}</article>`;
}

function renderPlanCards(links) {
  return `<div class="plan-card-grid">${links.map(([title, href, copy]) => `<a class="plan-card" href="${href}"><span class="plan-card-arrow" aria-hidden="true">↗</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(copy)}</p></a>`).join("")}</div>`;
}

function renderFact(label, value) {
  return `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`;
}

function renderDarkCta(eyebrow, heading, copy, button) {
  return `<section class="accommodation-cta"><p class="section-label">${escapeHtml(eyebrow)}</p><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(copy)}</p><a class="button accommodation-light-button" href="/list-your-accommodation/">${escapeHtml(button)}</a></section>`;
}

function write(rootDir, relativePath, content) {
  const filePath = join(rootDir, relativePath);
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, `\ufeff${content}\n`, "utf8");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderRoyalHotelContent(property, enquirySection) {
  return `<div class="property-page-content">
    <section class="accommodation-section">
      <p class="section-label">Introduction</p>
      <h2>A Bideford hotel base for Westward Ho! surf trips.</h2>
      <p>The Royal sits beside Bideford Bridge and the River Torridge. It is the premium option for staying locally, combining free parking, breakfast and on-site dining with straightforward access to Westward Ho! and the North Devon coast. It is not beachfront.</p>
    </section>
    <section class="accommodation-section">
      <p class="section-label">At a glance</p>
      <dl class="fact-grid property-fact-grid">
        ${renderFact("Parking", property.parking)}
        ${renderFact("Check-in", property.checkIn)}
        ${renderFact("Check-out", property.checkOut)}
      </dl>
    </section>
    <section class="accommodation-section">
      <p class="section-label">Food and drink</p>
      <h2>Eat and drink at The Royal.</h2>
      <p>Merchants Brasserie serves lunch and dinner, while the Kingsley Lounge offers drinks, coffee and lighter food. Breakfast is available each morning; check current serving times if you are planning an early surf.</p>
    </section>
    <section class="accommodation-section property-information-note" aria-label="Surfbooker review status">
      <p class="section-label">Accommodation review</p>
      <h2>Review pending.</h2>
      <p>Our independent review will be added after we visit.</p>
    </section>
    <section class="accommodation-section">
      <p class="section-label">Surfing from here</p>
      <h2>Westward Ho! is the primary nearby surf beach.</h2>
      <p>Westward Ho!'s long sandy beach and surf are roughly 3.5 miles away by road. The Royal is a driving base rather than beachfront accommodation, and dedicated surf storage or drying facilities are not currently confirmed.</p>
      <p><a class="text-link" href="/guides/westwardho!/">Read our Westward Ho! Surf Guide →</a></p>
    </section>
    <section class="accommodation-section">
      <p class="section-label">Explore the local area</p>
      <h2>Plan more of North Devon.</h2>
      <div class="destination-decision-grid">
        <article><h3>Bideford and the Tarka Trail</h3><p>Explore the quayside or follow the traffic-free trail beside the Torridge.</p></article>
        <article><h3>Appledore and Instow</h3><p>Add estuary views and village stops to a day away from the surf.</p></article>
        <article><h3>North Devon surf guides</h3><p><a href="/guides/north-devon/">Compare more beaches and surf bases across North Devon.</a></p></article>
      </div>
    </section>
    ${enquirySection}
  </div>`;
}

/**
 * Internal reusable source template for verified property pages. Only properties in
 * accommodationProperties are rendered; empty template data never creates a route.
 */
export function renderAccommodationPropertyPage(property) {
  if (!property.pageEligible || !["verified", "directory-listed"].includes(property.status)) {
    throw new Error(`Accommodation property is not eligible for a public page: ${property.slug}`);
  }
  const path = `/accommodation/stays/${property.slug}/`;
  const area = accommodationAreas.find((candidate) => candidate.slug === property.areaSlug);
  const region = accommodationRegions.find((candidate) => candidate.slug === area?.regionSlug);
  const allowedDestinationContexts = Object.fromEntries((property.destinationSlugs || [property.areaSlug])
    .map((slug) => accommodationAreas.find((candidate) => candidate.slug === slug))
    .filter(Boolean)
    .map((candidate) => [candidate.slug, { destination: candidate.name, region: regionNameForArea(candidate) }]));
  const nearbyAreas = area ? relatedAreasFor(area, 3) : [];
  const uncertaintyPattern = /\b(?:not stated|not confirmed|unconfirmed|unknown|unclear|listings? (?:disagree|conflict)|sources? (?:disagree|conflict)|differs? between listings)\b/i;
  const publicFactValue = (value) => {
    if (typeof value !== "string") return value;
    const withoutCaveatParentheses = value.replace(/\s*\([^)]*(?:not stated|not confirmed|unconfirmed|unknown|unclear|listings? disagree)[^)]*\)/gi, "");
    const usefulClauses = withoutCaveatParentheses
      .split(";")
      .map((clause) => clause.trim())
      .filter((clause) => clause && !uncertaintyPattern.test(clause));
    const cleaned = usefulClauses.join("; ").replace(/[\s,;:-]+$/, "").trim();
    return cleaned && !uncertaintyPattern.test(cleaned) ? cleaned : "";
  };
  const detailRows = [
    ["Operator", property.hideOperatorFact ? "" : property.operator],
    ["Review status", property.hideReviewStatusFact ? "" : property.reviewStatus],
    ["Listing name", property.listingName],
    ["Type of stay", property.hideStayTypeFact ? "" : property.stayType],
    ["Location", property.location],
    ["Accommodation", property.accommodation],
    ["Suitable for", property.suitableFor],
    ["Rooms", property.hideRoomsFact ? "" : property.sleepsOrRooms],
    ["Room types", property.roomTypes],
    ["Room features", property.roomFeatures],
    ["Confirmed features", property.confirmedFeatures],
    ["Parking", property.parking],
    ["Beach access", property.beachAccess],
    ["Dogs", property.dogs],
    ["Check-in", property.checkIn],
    ["Check-out", property.checkOut],
    ["Guest rating", property.guestRating]
  ].map(([label, value]) => [label, publicFactValue(value)]).filter(([, value]) => value);
  const statusSection = property.reviewStatus ? `<section class="accommodation-section property-information-note" aria-label="Surfbooker review status"><p class="section-label">${escapeHtml(property.reviewStatus)}</p><h2>${escapeHtml(property.reviewStatusHeading || "Surfbooker review status.")}</h2>${property.reviewStatusCopy ? `<p>${escapeHtml(property.reviewStatusCopy)}</p>` : ""}</section>` : "";
  const editorialSections = property.sections?.length ? property.sections.map(([heading, copy]) => `<section class="accommodation-section"><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(copy)}</p></section>`).join("") : "";
  const collectionSection = property.collectionChoices?.length ? `<section class="accommodation-section"><p class="section-label">${escapeHtml(property.collectionLabel || "Cottage choices")}</p><h2>${escapeHtml(property.collectionHeading || "Choose a Rainbolts Hill cottage.")}</h2><div class="destination-decision-grid">${property.collectionChoices.map(([name, capacity, copy]) => `<article><h3>${escapeHtml(name)}</h3><p><strong>${escapeHtml(capacity)}</strong></p><p>${escapeHtml(copy)}</p></article>`).join("")}</div></section>` : "";
  const cardSections = property.cardSections?.length ? property.cardSections.map((section) => `<section class="accommodation-section"><p class="section-label">${escapeHtml(section.label)}</p><h2>${escapeHtml(section.heading)}</h2><div class="destination-decision-grid">${section.cards.map(([name, copy]) => `<article><h3>${escapeHtml(name)}</h3><p>${escapeHtml(copy)}</p></article>`).join("")}</div></section>`).join("") : "";
  const faqSection = property.faqItems?.length ? `<section class="accommodation-section"><p class="section-label">Questions answered</p><h2>Planning a stay at ${escapeHtml(property.name)}.</h2>${property.faqItems.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("")}</section>` : "";
  const gallerySection = property.gallery?.length
    ? `<section class="accommodation-section"><p class="section-label">Property gallery</p><h2>Inside the stay.</h2><div class="property-gallery">${property.gallery.map((item) => `<img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}" loading="lazy">`).join("")}</div></section>`
    : "";
  const reviewSection = property.review?.length
    ? `<section class="accommodation-section property-review-section"><div class="property-review-grid"><div><p class="section-label">Our review</p><h2>${escapeHtml(property.reviewHeading || `What ${property.name} is like.`)}</h2><div class="property-review-copy">${property.review.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div></div>${property.reviewVerdict ? `<aside class="property-review-verdict" aria-label="Surfbooker verdict"><p>${escapeHtml(property.reviewVerdict)}</p></aside>` : ""}</div></section>`
    : "";
  const lodgingSchema = {
    "@type": property.schemaType || (property.slug === "the-waterfront-inn" ? "BedAndBreakfast" : property.stayType.includes("apartment") ? "VacationRental" : "LodgingBusiness"),
    "@id": `${baseUrl}${path}#property`,
    name: property.name,
    url: `${baseUrl}${path}`,
    description: property.overviewDetail,
    address: {
      "@type": "PostalAddress",
      ...(property.streetAddress ? { streetAddress: property.streetAddress } : {}),
      addressLocality: area?.name || property.location,
      addressRegion: area?.regionSlug === "cornwall" ? "Cornwall" : area?.regionSlug === "wales" ? "Pembrokeshire" : "Devon",
      ...(property.postalCode ? { postalCode: property.postalCode } : {}),
      addressCountry: "GB"
    },
    ...(property.heroPlaceholder || property.representativeImage ? {} : { image: `${baseUrl}${property.heroImage}` })
  };
  const faqSchema = property.faqItems?.length ? { "@type": "FAQPage", mainEntity: property.faqItems.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) } : null;
  const formId = `property-enquiry-${property.slug}`;
  const statusId = `${formId}-status`;
  const tripDetailsFields = property.slug === "the-royal-hotel-bideford" ? `<label><span>Arrival date <small>(optional)</small></span><input type="date" name="arrivalDate"></label>
      <label><span>Departure date <small>(optional)</small></span><input type="date" name="departureDate"></label>
      <label><span>Adults <small>(optional)</small></span><input type="number" name="adults" min="1" inputmode="numeric"></label>
      <label><span>Children <small>(optional)</small></span><input type="number" name="children" min="0" inputmode="numeric"></label>
      <label class="form-wide"><span>Dogs <small>(optional)</small></span><input type="number" name="dogs" min="0" inputmode="numeric"></label>` : property.areaSlug === "newgale" ? `<label><span>Arrival date <small>(optional)</small></span><input type="date" name="arrivalDate"></label>
      <label><span>Departure date <small>(optional)</small></span><input type="date" name="departureDate"></label>
      <label class="form-wide"><span>Guest count <small>(optional)</small></span><input type="number" name="guestCount" min="1" inputmode="numeric"></label>` : "";
  const enquirySection = `<section class="accommodation-section property-enquiry-section" id="enquiry">
    <div class="accommodation-section-heading">
      <p class="section-label">Property enquiry</p>
      <h2>Enquire about ${escapeHtml(property.name)}.</h2>
      <p>Send an enquiry and Surfbooker will help you check availability directly with the property.</p>
    </div>
    <form class="provider-form accommodation-form property-enquiry-form" id="${formId}" name="accommodation-property-enquiry" method="POST" action="${path}" data-netlify="true" netlify-honeypot="bot-field">
      <input type="hidden" name="form-name" value="accommodation-property-enquiry">
      <input type="hidden" name="propertyName" value="${escapeHtml(property.name)}">
      <input type="hidden" name="propertySlug" value="${escapeHtml(property.slug)}">
      <input type="hidden" name="destination" value="${escapeHtml(property.enquiryDestination || area?.name || "")}">
      <input type="hidden" name="region" value="${escapeHtml(region?.name || "")}">
      <input type="hidden" name="enquiryType" value="accommodation">
      <p class="sr-only"><label>Do not fill this out if you’re human: <input type="text" name="bot-field" autocomplete="off" tabindex="-1"></label></p>
      <label><span>Your name</span><input type="text" name="name" autocomplete="name" required></label>
      <label><span>Email address</span><input type="email" name="email" autocomplete="email" required></label>
      <label class="form-wide"><span>Phone number <small>(optional)</small></span><input type="tel" name="phone" autocomplete="tel"></label>
      ${tripDetailsFields}
      <label class="form-wide"><span>Your enquiry</span><textarea name="message" rows="6" required></textarea></label>
      <label class="consent-row form-wide"><input type="checkbox" name="consent" value="yes" required><span>I agree that Surfbooker may use these details to handle this property enquiry and contact me. Read our <a href="/privacy/">privacy information</a>.</span></label>
      <div class="form-wide form-submit-row"><button type="submit">Send enquiry</button><p class="form-status" id="${statusId}" aria-live="polite"></p></div>
    </form>
  </section>
  <script>
    (() => {
      const form = document.getElementById("${formId}");
      const status = document.getElementById("${statusId}");
      const allowedDestinations = ${JSON.stringify(allowedDestinationContexts)};
      const requestedDestination = new URLSearchParams(window.location.search).get("destination");
      if (requestedDestination && allowedDestinations[requestedDestination]) {
        form.elements.destination.value = allowedDestinations[requestedDestination].destination;
        form.elements.region.value = allowedDestinations[requestedDestination].region;
        const backLink = document.querySelector(".property-back-row a");
        backLink.href = "/accommodation/" + requestedDestination + "/";
        backLink.textContent = "← Back to " + allowedDestinations[requestedDestination].destination + " stays";
        document.addEventListener("DOMContentLoaded", () => {
          for (const section of document.querySelectorAll(".related-property-section")) {
            section.hidden = section.dataset.relatedDestination !== requestedDestination;
          }
        });
      }
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        status.textContent = "Sending your enquiry...";
        try {
          const response = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(new FormData(form)).toString() });
          if (!response.ok) throw new Error("Submission failed");
          status.textContent = "Thanks — your property enquiry has been sent to Surfbooker.";
          form.reset();
        } catch (error) {
          status.textContent = "Your enquiry could not be sent just now. Please try again or email hello@surfbooker.com.";
        }
      });
    })();
  </script>`;
  const relatedPropertySection = Object.keys(allowedDestinationContexts).map((destinationSlug) => {
    const destinationArea = accommodationAreas.find((candidate) => candidate.slug === destinationSlug);
    const destinationProperties = publicAccommodationProperties.filter((candidate) =>
      (candidate.destinationSlugs || [candidate.areaSlug]).includes(destinationSlug) && candidate.slug !== property.slug
    );
    return destinationArea && destinationProperties.length
      ? renderPropertyCollection(destinationProperties.slice(0, 4), `More places to stay in ${destinationArea.name}`, destinationArea, { destinationSlug, hidden: destinationSlug !== property.areaSlug })
      : "";
  }).join("");
  const nearbyDestinationSection = nearbyAreas.length ? `<section class="accommodation-section"><div class="accommodation-section-heading"><p class="section-label">Nearby accommodation</p><h2>Compare neighbouring bases.</h2></div><div class="base-link-grid">${nearbyAreas.map((nearbyArea) => `<a class="base-link" href="/accommodation/${nearbyArea.slug}/"><span>${escapeHtml(nearbyArea.name)}</span><small>${escapeHtml(nearbyArea.localFeel)}</small></a>`).join("")}</div></section>` : "";
  const isRoyalHotel = property.slug === "the-royal-hotel-bideford";
  const page = renderPage({
    path,
    title: property.pageTitle,
    description: property.metaDescription || `${property.name} is a ${property.stayType.toLowerCase()} in ${property.location}. Read verified surf-trip details on Surfbooker.`,
    h1: property.name,
    eyebrow: `${area?.name || property.location} accommodation`,
    intro: property.overview,
    image: property.heroImage,
    imageAlt: property.heroImageAlt,
    heroPlaceholder: Boolean(property.heroPlaceholder),
    heroBadge: isRoyalHotel ? "Review pending" : "",
    heroAddress: isRoyalHotel ? "Barnstaple Street, Bideford, Devon EX39 4AE" : "",
    bodyClass: `accommodation-property-page${isRoyalHotel ? " rwts-property-page" : ""}`,
    breadcrumbs: [["Home", "/"], ["Accommodation", "/accommodation/"], [region?.name || "Accommodation", `/accommodation/${area?.regionSlug || "devon"}/`], [area?.name || property.location, `/accommodation/${property.areaSlug}/`], [property.name, path]],
    structuredData: property.status === "verified" ? [lodgingSchema, ...(faqSchema ? [faqSchema] : [])] : [],
    content: isRoyalHotel ? renderRoyalHotelContent(property, enquirySection) : `<div class="property-page-content"><div class="property-back-row"><a href="/accommodation/${property.areaSlug}/">← Back to ${escapeHtml(area?.name || property.location)} stays</a></div>${statusSection}<section class="accommodation-section"><p class="section-label">At a glance</p><h2>Practical property details.</h2><dl class="fact-grid property-fact-grid">${detailRows.map(([label, value]) => renderFact(label, value)).join("")}</dl></section>${editorialSections}${collectionSection}${cardSections}${faqSection}${reviewSection}${gallerySection}<section class="accommodation-section"><p class="section-label">Surf beaches nearby</p><h2>Connect the stay with local surf information.</h2>${renderPlanCards(propertyPlanLinks(area))}</section>${relatedPropertySection}${nearbyDestinationSection}${enquirySection}<section class="accommodation-section property-information-note" aria-label="Property information note"><p>${property.status === "verified" ? "Property details are based on verified source information." : property.researchStatus === "researched" ? "Please check facilities and policies directly with the property when you enquire." : ""} An enquiry does not confirm live availability, a booking or payment.</p></section></div>`
  });
  return page;
}

export const emptyPropertyTemplateData = Object.freeze({
  slug: "", areaSlug: "", regionSlug: "", cluster: "", name: "", location: "", stayType: "", tags: [],
  metaDescription: "", overview: "", surfTripFit: "", sleepsOrRooms: "",
  parking: "", dogPolicy: "", checkIn: "", surfAccess: "", heroImage: "",
  heroImageAlt: "", gallery: [], gettingToSurf: "", nearbySurfBeaches: [], relatedDestinations: [],
  enquiryEnabled: true, status: "needs-research", pageEligible: false, approvedImage: false,
  listingTier: "free", featured: false, sourceUrls: [], lastVerified: "", verificationNotes: "",
  schemaType: "LodgingBusiness", bookingStatus: "", planLinks: []
});

function buildDirectoryAccommodationProperties() {
  const destinationAssociationOverrides = {
    "The Seagate Hotel": ["appledore"],
    "Durrant House Hotel (Northam)": ["northam"],
    "Lobb Fields Caravan and Camping Park": ["braunton"],
    "Braunton Inn": ["braunton"],
    "Twitchen House Holiday Park": ["mortehoe"],
    "Easewell Farm Holiday Park": ["mortehoe"],
    "The Fortescue Arms": ["mortehoe"],
    "The Smugglers Rest": ["mortehoe"],
    // Corrected from research (Oct 2026): listed against the nearest surf beach Surfbooker covers.
    "Trevornick Holiday Park": ["holywell-bay"],
    "The Driftwood Spars (rooms)": ["st-agnes", "trevaunance-cove"],
    "Stowford Farm Meadows": ["woolacombe"],
    "Lower Campscott Farm Holiday Cottages": ["woolacombe", "mortehoe"]
  };
  const replaceAssociations = new Set(["Trevornick Holiday Park", "The Driftwood Spars (rooms)", "Stowford Farm Meadows", "Lower Campscott Farm Holiday Cottages"]);
  const checkedAssociationSources = {
    "The Seagate Hotel": ["https://www.theseagate.co.uk/"],
    "Durrant House Hotel (Northam)": ["https://durranthousehotel.com/guest-directory/"],
    "Lobb Fields Caravan and Camping Park": ["https://lobbfields.com/"],
    "Twitchen House Holiday Park": ["https://www.woolacombe.co.uk/devon-holiday-parks/twitchen-house"],
    "The Smugglers Rest": ["https://thesmugglersrest.co.uk/"]
  };
  const detailedNames = new Set(accommodationProperties.map((property) => property.name));
  const grouped = new Map();
  for (const candidate of accommodationCandidates) {
    if (detailedNames.has(candidate.name)) continue;
    const record = grouped.get(candidate.name) || { name: candidate.name, destinationSlugs: [] };
    if (!record.destinationSlugs.includes(candidate.destinationSlug)) record.destinationSlugs.push(candidate.destinationSlug);
    grouped.set(candidate.name, record);
  }

  // Researched additions (data/accommodation-additions.json, Oct 2026): real, trading places found
  // to give every area page at least four options. Facts live in data/stay-research/<slug>.json.
  const additionsFile = join(import.meta.dirname, "..", "data/accommodation-additions.json");
  if (existsSync(additionsFile)) {
    for (const { name, area } of JSON.parse(readFileSync(additionsFile, "utf8"))) {
      if (detailedNames.has(name)) continue;
      const record = grouped.get(name) || { name, destinationSlugs: [] };
      if (!record.destinationSlugs.includes(area)) record.destinationSlugs.push(area);
      grouped.set(name, record);
    }
  }
  const crosslistFile = join(import.meta.dirname, "..", "data/accommodation-crosslist.json");
  const crossListings = existsSync(crosslistFile) ? JSON.parse(readFileSync(crosslistFile, "utf8")) : {};
  const usedSlugs = new Set(accommodationProperties.map((property) => property.slug));
  return [...grouped.values()].map((record) => {
    let slug = slugifyPropertyName(record.name);
    let suffix = 2;
    while (usedSlugs.has(slug)) slug = `${slugifyPropertyName(record.name)}-${suffix++}`;
    usedSlugs.add(slug);
    const baseDestinationSlugs = replaceAssociations.has(record.name) ? destinationAssociationOverrides[record.name]
      : [...new Set([...record.destinationSlugs, ...(destinationAssociationOverrides[record.name] || [])])];
    // Nearby cross-listing (data/accommodation-crosslist.json, keyed by stay slug): also shows a stay on
    // neighbouring area pages so every area has at least four options. The first area stays primary.
    const destinationSlugs = [...new Set([...baseDestinationSlugs, ...(crossListings[slug] || [])])];
    const areas = destinationSlugs.map((areaSlug) => accommodationAreas.find((area) => area.slug === areaSlug)).filter(Boolean);
    const primaryArea = areas[0];
    const stayType = inferPropertyType(record.name);
    const destinationLabel = formatList(areas.map((area) => area.name));
    const representative = representativeImageFor({ slug }, primaryArea);
    return {
      slug,
      name: record.name,
      pageTitle: `${record.name} Accommodation Enquiry | Surfbooker`,
      metaDescription: `Send a Surfbooker accommodation enquiry about ${record.name}, listed for trips based around ${destinationLabel}. No external booking links or unconfirmed availability.`,
      areaSlug: primaryArea.slug,
      destinationSlugs,
      location: `${destinationLabel}, ${regionNameForArea(primaryArea)}`,
      stayType,
      accommodation: stayType,
      suitableFor: "Ask Surfbooker about suitability for your trip.",
      overview: "",
      overviewDetail: `${record.name} is a place to stay for visitors considering ${destinationLabel}.`,
      surfTripFit: `An accommodation option to consider when planning a surf trip based around ${destinationLabel}.`,
      heroImage: representative.src,
      heroImageAlt: `${representative.alt}, used as a representative location image for ${record.name}`,
      representativeImage: true,
      gallery: [],
      status: "directory-listed",
      researchStatus: "needs-research",
      pageEligible: true,
      approvedImage: true,
      sourceUrls: checkedAssociationSources[record.name] || [],
      lastVerified: "",
      verificationNotes: "Public name and destination associations are taken from the accommodation directory supplied by the Surfbooker owner. Detailed property facts still require official-source verification.",
      tags: [stayType, primaryArea.name, "Surfbooker enquiry"]
    };
  });
}

function slugifyPropertyName(name) {
  return String(name)
    .toLowerCase()
    .replaceAll("&", " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function inferPropertyType(name) {
  const value = name.toLowerCase();
  if (value.includes("bed and breakfast") || value.includes("b&b") || value.includes("guest house")) return "Bed and breakfast / guesthouse";
  if (value.includes("holiday park") || value.includes("holiday village") || value.includes("holiday resort")) return "Holiday park / resort";
  if (value.includes("camp") || value.includes("caravan") || value.includes("touring")) return "Camping / caravan accommodation";
  if (value.includes("cottage")) return "Self-catering cottage accommodation";
  if (value.includes("apartment")) return "Holiday apartment accommodation";
  if (value.includes("hostel") || value.startsWith("yha ")) return "Hostel accommodation";
  if (value.includes("hotel")) return "Hotel";
  if (value.includes(" inn") || value.startsWith("the inn ") || value.includes("arms")) return "Inn accommodation";
  if (value.includes("lodge")) return "Lodge accommodation";
  return "Independent accommodation";
}

function formatList(values) {
  if (values.length <= 1) return values[0] || "the local area";
  if (values.length === 2) return `${values[0]} and ${values[1]}`;
  return `${values.slice(0, -1).join(", ")} and ${values.at(-1)}`;
}

function representativeImageFor(property, contextArea = null, position = null) {
  const area = contextArea || accommodationAreas.find((candidate) => candidate.slug === property.areaSlug);
  // Prefer photos of the place itself (licensed or Surfbooker-owned) over the regional pool.
  const local = placeImages(area?.slug);
  if (local.length) {
    const picked = local[position === null ? stableHash(property.slug) % local.length : (stableHash(area.slug) + position) % local.length];
    return { src: encodeAssetPath("/" + picked), alt: `Coastal scene near ${area.name}` };
  }
  const poolKey = area?.regionSlug || "north-devon";
  const usesGenericPool = !representativeImagePools[poolKey];
  const pool = representativeImagePools[poolKey] || representativeImagePools.generic;
  const index = position === null
    ? stableHash(property.slug) % pool.length
    : (stableHash(area?.slug || poolKey) + position) % pool.length;
  return {
    src: encodeAssetPath(pool[index]),
    alt: usesGenericPool ? "Generic surfing scene" : `${regionNameForArea(area)} coastal scene`
  };
}

function stableHash(value) {
  let hash = 0;
  for (const character of String(value)) hash = ((hash << 5) - hash + character.charCodeAt(0)) >>> 0;
  return hash;
}

function encodeAssetPath(path) {
  return String(path).split("/").map((part, index) => index === 0 ? "" : encodeURIComponent(part)).join("/");
}

function regionNameForArea(area) {
  return accommodationRegions.find((region) => region.slug === area?.regionSlug)?.name || "UK coast";
}

function propertyPlanLinks(area) {
  if (area?.surfLinks?.length) return area.surfLinks.slice(0, 3);
  if (area?.guidePath) {
    return [
      [`${area.name} beach guide`, area.guidePath, "Check beach access, conditions and practical local information."],
      [`${regionNameForArea(area)} surf lessons`, `/surf-lessons/${area.regionSlug}/`, "Compare existing Surfbooker lesson information."],
      [`${regionNameForArea(area)} surf hire`, `/surf-hire/${area.regionSlug}/`, "Find existing board and wetsuit hire information."]
    ];
  }
  return [["Surfbooker beach guides", "/guides/", "Use Surfbooker’s internal guides to plan the beach part of your trip."]];
}

function isPublicProperty(property) {
  return property.status === "verified"
    && property.pageEligible === true
    && property.approvedImage === true
    && Boolean(property.heroImage)
    && (property.ownerVerified === true || (Array.isArray(property.sourceUrls) && property.sourceUrls.length > 0))
    && /^\d{4}-\d{2}-\d{2}$/.test(property.lastVerified || "");
}

function validateAccommodationData() {
  const destinationSlugs = new Set(accommodationAreas.map((area) => area.slug));
  for (const candidate of allAccommodationCandidates) {
    if (candidate.destinationSlug && !destinationSlugs.has(candidate.destinationSlug)) {
      throw new Error(`Accommodation candidate uses an unknown destination: ${candidate.name} (${candidate.destinationSlug})`);
    }
    if (candidate.status !== "verified" && candidate.pageEligible) {
      throw new Error(`Unverified accommodation candidate cannot be page eligible: ${candidate.name}`);
    }
  }
  for (const property of accommodationProperties) {
    if (!destinationSlugs.has(property.areaSlug)) {
      throw new Error(`Accommodation property uses an unknown destination: ${property.slug}`);
    }
    if (property.pageEligible && !isPublicProperty(property)) {
      throw new Error(`Accommodation property is incomplete but marked page eligible: ${property.slug}`);
    }
  }
  for (const property of directoryAccommodationProperties) {
    if (property.status !== "directory-listed" || !property.pageEligible || !property.representativeImage) {
      throw new Error(`Directory accommodation property is incomplete: ${property.slug}`);
    }
  }
}

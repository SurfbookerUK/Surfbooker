/**
 * Internal accommodation research queue.
 *
 * These records are never rendered directly. A candidate can only become public
 * after a separate, complete property record is marked verified and pageEligible.
 * Repeated names are intentional where the supplied research list associated one
 * property with more than one existing Surfbooker destination.
 */
const candidateGroups = {
  "westward-ho": [
    "Westbeach Holiday Apartments",
    "The Waterfront Inn",
    "Surf Bay Holiday Park",
    "Braddicks Holiday Park",
    "Golden Bay Holiday Village",
    "Morans Bed and Breakfast at Lower Lodge",
    "The Seagate Hotel",
    "Beachside Holiday Park",
    "Durrant House Hotel (Northam)"
  ],
  saunton: [
    "Saunton Sands Hotel",
    "Saunton Sands Hotel Source Spa & Wellness",
    "Croyde Bay Holiday Resort",
    "Saunton Sands Farm Holiday Cottages",
    "Sandy Hollow Bed and Breakfast",
    "Lower Campscott Farm Holiday Cottages",
    "Lobb Fields Caravan and Camping Park",
    "Braunton Inn"
  ],
  woolacombe: [
    "Woolacombe Bay Holiday Park",
    "Twitchen House Holiday Park",
    "Easewell Farm Holiday Park",
    "Woolacombe Sands Holiday Park",
    "Golden Coast Leisure Park",
    "Woolacombe Bay Hotel",
    "Watersmeet Hotel",
    "The Fortescue Arms",
    "The Granary",
    "The Smugglers Rest"
  ],
  croyde: [
    "Croyde Bay Holiday Resort",
    "Ruda Holiday Park",
    "Ocean Pitch",
    "Putsborough Manor Holiday Cottages",
    "Bay View Farm Caravan and Camping Park",
    "The Thatch Croyde",
    "The Whiteleaf",
    "Thistledoo Bed and Breakfast",
    "Croyde Holidays",
    "Stowford Farm Meadows"
  ],
  putsborough: [
    "Putsborough Manor Holiday Cottages",
    "Croyde Bay Holiday Resort",
    "Ruda Holiday Park",
    "Ocean Pitch",
    "The Thatch Croyde",
    "Bay View Farm Caravan and Camping Park",
    "Woolacombe Bay Holiday Park",
    "The Fortescue Arms"
  ],
  bantham: [
    "The Sloop Inn (rooms)",
    "Thurlestone Hotel",
    "Hope and Anchor Inn (rooms)",
    "The Cottage Hotel, Hope Cove",
    "Gara Rock",
    "Bantham Holiday Cottages",
    "Coastguards Cottage, Bantham",
    "The Old Forge, Bantham"
  ],
  "bigbury-on-sea": [
    "Burgh Island Hotel",
    "The Pilchard Inn (rooms, Burgh Island)",
    "The Cottage Hotel, Hope Cove",
    "Thurlestone Hotel",
    "Marine Hotel, Salcombe",
    "Bigbury-on-Sea Holiday Cottages",
    "Challaborough Bay Holiday Park",
    "Ringmore Holiday Cottages"
  ],
  challaborough: [
    "Challaborough Bay Holiday Park",
    "Burgh Island Hotel",
    "The Cottage Hotel, Hope Cove",
    "Thurlestone Hotel",
    "Bigbury-on-Sea Holiday Cottages",
    "Ringmore Holiday Cottages",
    "The Sloop Inn (rooms)",
    "Gara Rock"
  ],
  lynmouth: [
    "The Bath Hotel",
    "The Seawood Hotel",
    "Lynton Cottage Hotel",
    "Rock House Hotel",
    "The Rising Sun Hotel",
    "Sinai House",
    "Exmoor Manor Hotel",
    "The Blue Ball Inn, Countisbury"
  ],
  bude: [
    "The Beach at Bude",
    "The Falcon Hotel",
    "An Mor Hotel",
    "The Grosvenor Guest House",
    "Bude Holiday Resort",
    "Bude Camping and Caravanning Club Site",
    "The Edgcumbe Hotel",
    "The Brendon Arms (rooms)"
  ],
  "widemouth-bay": [
    "The Beach House, Widemouth Bay",
    "Widemouth Bay Caravan Park",
    "Widemouth Fields Holiday Park",
    "The Bay View Inn (rooms)",
    "The Weir Bistro and Hotel",
    "Bude Holiday Resort",
    "The Beach at Bude",
    "Gwel-an-Mor, Widemouth Bay"
  ],
  polzeath: [
    "The Oystercatcher",
    "St Moritz Hotel",
    "The Point at Polzeath",
    "The Mowhay, Polzeath",
    "Polzeath Beach House",
    "Pentire Hotel, New Polzeath",
    "Surfside, Polzeath",
    "The White House, Polzeath"
  ],
  "mawgan-porth": [
    "Bedruthan Hotel and Spa",
    "The Scarlet Hotel",
    "The Park Cornwall",
    "Mawgan Porth Apartments",
    "The Merrymoor Inn (rooms)",
    "Retallack Resort and Spa",
    "The Headland Hotel and Spa",
    "The Nook at Mawgan Porth"
  ],
  "watergate-bay": [
    "Watergate Bay Hotel",
    "SeaSpace, Newquay",
    "The Beachcomber",
    "The Headland Hotel and Spa",
    "Bedruthan Hotel and Spa",
    "The Scarlet Hotel",
    "The Traveller's Rest (rooms)",
    "Newquay Holiday Park"
  ],
  newquay: [
    "The Headland Hotel and Spa",
    "Fistral Beach Hotel and Spa",
    "The Esplanade Hotel",
    "Atlantic Hotel Newquay",
    "Pentire Hotel",
    "The Lewinnick Lodge (rooms)",
    "The Fort Inn (rooms)",
    "Newquay Beach Hotel",
    "Ocean Surf Lodge",
    "The Great Western Hotel",
    "Great Western Hotel",
    "The Legacy Hotel Victoria",
    "The Beresford Hotel",
    "The Harbour Hotel",
    "OYO Godolphin Arms Hotel",
    "Town Lodge, Newquay",
    // Repeated associations from the separate Fistral, Towan and Great Western
    // source groups are retained because repetition was intentional.
    "Atlantic Hotel Newquay",
    "Atlantic Hotel Newquay",
    "Great Western Hotel",
    "The Legacy Hotel Victoria",
    "The Beresford Hotel",
    "Newquay Beach Hotel",
    "Newquay Beach Hotel",
    "OYO Godolphin Arms Hotel",
    "The Headland Hotel and Spa",
    "The Esplanade Hotel"
  ],
  perranporth: [
    "The Seiners Arms (rooms)",
    "The Watering Hole (rooms / nearby stays)",
    "Perran Sands Holiday Park",
    "Haven Perran Sands Holiday Park",
    "The Summer House, Perranporth",
    "The Inn at Perranporth",
    "The Driftwood Spars (rooms)",
    "The Rose in Vale Country House Hotel"
  ],
  porthtowan: [
    "The Unicorn on the Beach (rooms)",
    "The Porthtowan Eco Park",
    "Mount Pleasant Eco Park",
    "The Driftwood Spars (rooms)",
    "The Rose in Vale Country House Hotel",
    "The Perranporth Inn (nearby)",
    "The Towan Valley holiday homes",
    "Chapel Porth Farm Campsite"
  ],
  "st-agnes": [
    "Driftwood Spars (rooms)",
    "Beacon Country House Hotel",
    "The Rose in Vale Country House Hotel",
    "The Perranporth Inn (nearby)",
    "The Cottage Hotel, St Agnes",
    "The Old School House, St Agnes",
    "Trevaunance Cove Holiday Cottages",
    "Mount Pleasant Eco Park"
  ],
  gwithian: [
    "The Godrevy Beach Hotel",
    "Gwithian Farm Campsite",
    "The Old Quay House, Hayle",
    "The White Hart Hotel, Hayle",
    "Trevornick Holiday Park",
    "Upton Towans holiday cottages",
    "The Beachcomber, Gwithian",
    "The Penellen Bed and Breakfast"
  ],
  hayle: [
    "The Old Quay House, Hayle",
    "The White Hart Hotel, Hayle",
    "Sandy Acres Lodge",
    "Riviere Sands Holiday Park",
    "Gwithian Farm Campsite",
    "Upton Towans holiday cottages",
    "The Penellen Bed and Breakfast",
    "The Godrevy Beach Hotel"
  ],
  "st-ives": [
    "The St Ives Harbour Hotel and Spa",
    "The Pedn-Olva Hotel",
    "The Western Hotel",
    "The Queens Hotel",
    "The Garrack Hotel",
    "Tregenna Castle Resort",
    "The Nook, St Ives",
    "The Atlantic, St Ives",
    "Primrose Valley Hotel",
    "27 The Terrace"
  ],
  sennen: [
    "The Old Success Inn (rooms)",
    "Sennen Cove Camping and Caravanning Club Site",
    "Lands End Hotel",
    "The Land's End Hostel and Camping",
    "The Cape Cornwall Club",
    "The Commercial Hotel, St Just",
    "The Wellington Hotel, Penzance",
    "Sennen Rise"
  ],
  "praa-sands": [
    "The Sand Bar (rooms / apartments)",
    "The Victoria Inn, Perranuthnoe (rooms)",
    "Praa Sands Holiday Park",
    "The Godolphin Arms, Marazion",
    "Mount Haven Hotel",
    "The Queens Arms, Breage (rooms)",
    "The Old Vicarage, Perranuthnoe",
    "The Old Coastguard, Mousehole"
  ]
};

const destinationNames = {
  "westward-ho": "Westward Ho!",
  saunton: "Saunton",
  woolacombe: "Woolacombe",
  croyde: "Croyde",
  putsborough: "Putsborough",
  bantham: "Bantham",
  "bigbury-on-sea": "Bigbury-on-Sea",
  challaborough: "Challaborough",
  lynmouth: "Lynmouth",
  bude: "Bude",
  "widemouth-bay": "Widemouth Bay",
  polzeath: "Polzeath",
  "mawgan-porth": "Mawgan Porth",
  "watergate-bay": "Watergate Bay",
  newquay: "Newquay",
  perranporth: "Perranporth",
  porthtowan: "Porthtowan",
  "st-agnes": "St Agnes",
  gwithian: "Gwithian",
  hayle: "Hayle",
  "st-ives": "St Ives",
  sennen: "Sennen",
  "praa-sands": "Praa Sands"
};

const northDevonSlugs = new Set(["westward-ho", "saunton", "woolacombe", "croyde", "putsborough", "lynmouth"]);
const southDevonSlugs = new Set(["bantham", "bigbury-on-sea", "challaborough"]);

const verifiedResearch = {
  "westward-ho::Westbeach Holiday Apartments": {
    status: "verified",
    pageEligible: true,
    sourceUrls: [
      "https://westbeachholidayapartments.com/",
      "https://westbeachholidayapartments.com/contact/"
    ],
    lastVerified: "2026-08-23",
    verificationNotes: "Official site confirms self-catering apartments in Westward Ho!, apartment types, kitchens, balconies and suitability for couples, families and guests travelling with dogs. Public page uses a Surfbooker-owned designed placeholder rather than an unlicensed property photograph."
  },
  "westward-ho::The Waterfront Inn": {
    status: "verified",
    pageEligible: true,
    sourceUrls: [
      "https://www.waterfrontinn.co.uk/",
      "https://www.waterfrontinn.co.uk/accommodation/"
    ],
    lastVerified: "2026-08-23",
    verificationNotes: "Official site confirms the Westward Ho! location, B&B operation, 11 en-suite rooms, double rooms and family suites, and the published in-room features used publicly. Surfbooker-owned local image is available."
  },
  "westward-ho::Surf Bay Holiday Park": {
    status: "verified",
    pageEligible: true,
    sourceUrls: [
      "https://www.surfbay.co.uk/",
      "https://www.surfbay.co.uk/accommodation"
    ],
    lastVerified: "2026-08-23",
    verificationNotes: "Official site confirms the Westward Ho! holiday park and self-catering apartment accommodation. User-supplied facts and a Surfbooker-owned local image support the public record."
  }
};

export const accommodationCandidates = Object.entries(candidateGroups).flatMap(([destinationSlug, names]) => {
  const region = northDevonSlugs.has(destinationSlug)
    ? "North Devon"
    : southDevonSlugs.has(destinationSlug)
      ? "South Devon"
      : "Cornwall";
  return names.map((name) => ({
    name,
    destinationSlug,
    destination: destinationNames[destinationSlug],
    region,
    status: "needs-research",
    pageEligible: false,
    sourceUrls: [],
    lastVerified: "",
    verificationNotes: "Awaiting complete official-source research and an approved local or licensed image.",
    ...(verifiedResearch[`${destinationSlug}::${name}`] || {})
  }));
});

// The supplied list also included these locations, but Surfbooker does not have
// matching accommodation destination pages. They stay internal and unmapped.
export const unmatchedAccommodationCandidates = [
  ["Harlyn Bay", ["The Pig at Harlyn Bay", "Harlyn Sands Holiday Park", "Harlyn Surf School Accommodation", "Treglos Hotel", "YHA Treyarnon Bay", "Trevone Farm Holiday Park", "Padstow Harbour Hotel", "The Metropole Hotel"]],
  ["Constantine Bay", ["Constantine Bay Cottages", "The Pig at Harlyn Bay", "Trevose Golf and Country Club accommodation", "Treglos Hotel", "YHA Treyarnon Bay", "Trevone Farm Holiday Park", "Harlyn Sands Holiday Park", "The Padstow Collection cottages"]],
  ["Crantock", ["The Bowgie Inn (rooms)", "The Old Vicarage, Crantock", "Trevelver Holiday Park", "Treloyhan Manor", "The Headland Hotel and Spa", "Fistral Beach Hotel and Spa", "The Esplanade Hotel", "Newquay Holiday Park"]],
  ["Holywell Bay", ["The Bowgie Inn (rooms)", "Holywell Bay Holiday Park", "Treguth Inn (rooms)", "Trevornick Holiday Park", "Perran Sands Holiday Park", "The Esplanade Hotel", "The Headland Hotel and Spa", "The Old School House, Holywell"]]
].flatMap(([sourceDestination, names]) => names.map((name) => ({
  name,
  sourceDestination,
  destinationSlug: null,
  destination: "",
  region: "Cornwall",
  status: "needs-research",
  pageEligible: false,
  sourceUrls: [],
  lastVerified: "",
  verificationNotes: "No matching existing Surfbooker accommodation destination page. Kept internal; no new destination or navigation level may be created."
})));

export const ownerAuthorisedAccommodation = [
  {
    name: "Modern Apartment, Private Parking, Walk to Beach!",
    displayName: "Spacious 2 Bedroom Apartment with Fantastic View, Westward Ho!",
    destinationSlug: "westward-ho",
    destination: "Westward Ho!",
    region: "North Devon",
    status: "verified",
    pageEligible: true,
    ownerVerified: true,
    sourceUrls: [],
    lastVerified: "2026-09-01",
    verificationNotes: "The Surfbooker owner personally confirmed authorisation, the preferred public title and permission to use the supplied local images."
  }
];

export const allAccommodationCandidates = [
  ...accommodationCandidates,
  ...unmatchedAccommodationCandidates,
  ...ownerAuthorisedAccommodation
];

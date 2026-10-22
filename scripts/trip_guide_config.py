"""Per-guide settings for convert-trip-guides.py.

Every photo here shows the place (or the named business) it is used for. images/IMG_75xx files are
Surfbooker's own photos from the 16 August 2026 North Devon trip (GPS-tagged); guides/<Place>/ files
are the photos supplied for that guide. Business descriptions only state what the sign or Surfbooker's
existing research shows - nothing here is a review.
"""

CONFIG = {
    "Croyde": {
        "drop": ["food"],  # the old "beach access or village atmosphere" block is replaced by Where to stay
        "cards": {
            "Surf South West": {"href": "/surf-schools/surf-south-west/", "rating": "surf-south-west",
                                "image": ("guides/Croyde/Croyde water and sand 2.jpg", "Surfers walking out into the sea at Croyde Bay", "50% 85%")},
            "Surfing Croyde Bay": {"href": "/surf-schools/surfing-croyde-bay/", "rating": "surfing-croyde-bay",
                                   "image": ("guides/Croyde/Croyde water and sand 3.jpg", "Surfers in the shallows at Croyde Bay")},
            "Lords of Down End": {"href": "/surf-schools/lords-of-down-end/",
                                  "image": ("guides/Croyde/Croyde water and sand ariel.jpg", "Aerial view of surfers in the water at Croyde Bay")},
            "Croyde Surf Hire": {"image": ("images/IMG_7559-croyde-bay.jpg", "Croyde Bay and the village from the road above Down End")},
            "Saltrock": {"image": ("guides/Croyde/Croyde Clifftop.jpg", "Coast path and dunes above Croyde")},
            "Ralphs Surf Shop": {"image": ("guides/Croyde/Croyde clifftop view.jpg", "The coastline seen from the clifftop at Croyde")},
        },
        "stay": {
            "area": "croyde", "title": "Where to stay in Croyde",
            "intro": "Choose between beach access and village atmosphere. These are researched listings rather than Surfbooker reviews.",
            "all": "View all accommodation in Croyde",
            "picks": [
                ("croyde-bay-holiday-resort", ("images/IMG_7568.JPEG", "Croyde Bay Holiday Resort entrance sign")),
                ("ruda-holiday-park", ("guides/Croyde/Croyde beach and cliff view.jpg", "Croyde Bay beach, which Ruda Holiday Park sits directly behind")),
                ("bay-view-farm-caravan-and-camping-park", ("images/IMG_7571.JPEG", "Bay View Farm caravan and camping park entrance sign, Croyde")),
                ("croyde-holidays", ("images/IMG_7580-croyde-village.jpg", "Shops and thatched cottages on the main street in Croyde village")),
            ],
        },
        "food": {
            "eyebrow": "Around the village", "title": "Food &amp; drink in Croyde",
            "intro": "Cafés, pubs and surf-shop coffee are all within the village.",
            "places": [
                {"name": "The Thatch", "sub": "The village's best-known pub, a short walk from the beach.",
                 "image": ("images/IMG_7577.JPEG", "The Thatch pub in Croyde village with flower boxes outside")},
                {"name": "The Beach Cafe", "sub": "Café with outdoor seating right by the sand at Croyde.",
                 "image": ("images/IMG_7562.JPEG", "The Beach Cafe and its outdoor seating beside the beach at Croyde")},
            ],
        },
        "labels": {"surf-shops": "Surf shops", "surf-hire": "Board hire", "dogs": None, "getting-here": "Getting here"},
    },
    "Saunton": {
        "cards": {
            "Walking on Waves": {"rating": "walking-on-waves",
                                 "image": ("images/IMG_7540.JPEG", "The road down to the Saunton Sands beach car park")},
            "Surf Saunton": {"rating": "surf-saunton",
                             "image": ("images/IMG_7550.JPEG", "Surf Saunton's Learn to Surf sign on the road to the beach")},
            "Croyde Surf Hire": {"image": ("images/IMG_7552.JPEG", "The coast road down to Saunton Sands with the dunes and sea beyond")},
        },
        "add_cards": {
            "surf-hire": [
                {"name": "Tiki", "sub": "Surf shop in Braunton, the village you pass through on the way to Saunton.",
                 "image": ("images/IMG_7538.JPEG", "Tiki surf shop on the high street in Braunton")},
            ],
        },
        "stay": {
            "area": "saunton", "title": "Where to stay near Saunton",
            "intro": "There's a hotel above the beach; Braunton and Croyde have the wider choice. These are researched listings rather than Surfbooker reviews.",
            "all": "View all accommodation near Saunton",
            "picks": [
                ("saunton-sands-hotel", ("guides/Saunton/Cliff top view.jpg", "Saunton Sands seen from the clifftop near the Saunton Sands Hotel")),
                ("saunton-sands-farm-holiday-cottages", ("guides/Saunton/clifftop ariel 2.jpg", "Aerial view along Saunton Sands")),
                ("croyde-bay-holiday-resort", ("images/IMG_7569.JPEG", "Croyde Bay Holiday Resort sign, a short drive north of Saunton")),
                ("lobb-fields-caravan-and-camping-park", ("guides/_licensed-images/saunton.jpg", "Saunton Sands and the dunes of Braunton Burrows")),
            ],
        },
        "food": {
            "eyebrow": "Beach café &amp; Braunton", "title": "Food &amp; drink near Saunton",
            "intro": "There's a beach café and shop at Saunton; Braunton, a few minutes inland, has a wider choice of cafés and pubs.",
            "places": [
                {"name": "Beach café &amp; shop", "sub": "Beach shop and café building at the main car park, right by the sand.",
                 "image": ("images/IMG_7545.JPEG", "The beach shop and café building at the Saunton Sands car park")},
                {"name": "Squires Fish Restaurant", "sub": "Fish restaurant in Braunton.",
                 "image": ("images/IMG_7533.JPEG", "Squires Fish Restaurant in Braunton")},
                {"name": "The George Inn", "sub": "Pub in the centre of Braunton.",
                 "image": ("images/IMG_7595.JPEG", "The George Inn, Braunton")},
                {"name": "Sandwich Club", "sub": "Sandwich shop in Braunton.",
                 "image": ("images/IMG_7529.JPEG", "Sandwich Club shopfront in Braunton")},
            ],
            "note": "Listed from Surfbooker's visit in August 2026 - not reviews. Check opening times before you travel.",
        },
        "labels": {"surf-hire": "Surf hire & shops", "accessibility": None, "getting-here": "Getting here", "burrows": "Braunton Burrows"},
    },
}

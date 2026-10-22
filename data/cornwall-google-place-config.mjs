function place(schoolName, searchText, names, addressTerms, hosts) {
  return {
    schoolName,
    placeId: null,
    googleMapsUri: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchText)}`,
    searchText,
    expectedDisplayNames: names,
    expectedAddressIncludes: addressTerms,
    acceptedWebsiteHosts: hosts
  };
}

export const cornwallGooglePlaceConfig = {
  "oa-surf-club": place("OA Surf Club", "OA Surf Club Widemouth Bay Bude", ["OA Surf Club", "OA Surf Club Surf School"], ["Widemouth", "Bude", "Cornwall"], ["oasurfclub.co.uk", "www.oasurfclub.co.uk"]),
  "big-blue-surf-school": place("Big Blue Surf School", "Big Blue Surf School Summerleaze Bude", ["Big Blue Surf School"], ["Summerleaze", "Bude", "Cornwall"], ["bigbluesurfschool.com", "www.bigbluesurfschool.com"]),
  "bude-surfing-experience": place("Bude Surfing Experience", "Bude Surfing Experience Cornwall", ["Bude Surfing Experience"], ["Bude", "Cornwall"], ["budesurfingexperience.co.uk", "www.budesurfingexperience.co.uk"]),
  "wavehunters": place("Wavehunters", "Wavehunters Polzeath Cornwall", ["Wavehunters", "Wavehunters Surf School"], ["Polzeath", "Watergate", "Cornwall"], ["wavehunters.co.uk", "www.wavehunters.co.uk"]),
  "surfs-up-surf-school": place("Surf's Up Surf School", "Surf's Up Surf School Polzeath", ["Surf's Up Surf School", "Surfs Up Surf School"], ["Polzeath", "Cornwall"], ["surfsupsurfschool.com", "www.surfsupsurfschool.com"]),
  "harlyn-surf-school": place("Harlyn Surf School", "Harlyn Surf School Cornwall", ["Harlyn Surf School"], ["Harlyn", "Cornwall"], ["harlynsurfschool.co.uk", "www.harlynsurfschool.co.uk"]),
  "westcountry-surf-school": place("Westcountry Surf School", "Westcountry Surf School Watergate Bay", ["Westcountry Surf School", "West Country Surf School"], ["Watergate", "Newquay", "Cornwall"], ["surfingschool.co.uk", "www.surfingschool.co.uk"]),
  "fistral-beach-surf-school": place("Fistral Beach Surf School", "Fistral Beach Surf School Newquay", ["Fistral Beach Surf School"], ["Fistral", "Newquay", "Cornwall"], ["fistralbeachsurfschool.co.uk", "www.fistralbeachsurfschool.co.uk"]),
  "quiksilver-surf-school-newquay": place("Quiksilver Surf School Newquay", "Quiksilver Surf School Newquay", ["Quiksilver Surf School Newquay", "Quiksilver Surf School"], ["Fistral", "Newquay", "Cornwall"], ["quiksilversurfschoolnewquay.com", "www.quiksilversurfschoolnewquay.com"]),
  "newquay-activity-centre": place("Newquay Activity Centre", "Newquay Activity Centre Surf School", ["Newquay Activity Centre", "Newquay Activity Centre Surf School"], ["Newquay", "Cornwall"], ["newquayactivitycentre.co.uk", "www.newquayactivitycentre.co.uk"]),
  "cornish-wave": place("Cornish Wave", "Cornish Wave Surf School Newquay", ["Cornish Wave", "Cornish Wave Surf School"], ["Newquay", "Cornwall"], ["cornishwave.com", "www.cornishwave.com"]),
  "surf-sanctuary": place("Surf Sanctuary", "Surf Sanctuary Fistral Newquay", ["Surf Sanctuary"], ["Fistral", "Newquay", "Cornwall"], ["surfsanctuary.co.uk", "www.surfsanctuary.co.uk"]),
  "newquay-surfing-school": place("NQY Surf School", "NQY Surf School Great Western Beach", ["NQY Surf School", "Newquay Surfing School"], ["Great Western", "Newquay", "Cornwall"], ["newquaysurfingschool.com", "www.newquaysurfingschool.com"]),
  "big-green-adventures": place("Big Green Adventures", "Big Green Adventures Crantock Surf School", ["Big Green Adventures", "Big Green Surf School"], ["Crantock", "Cornwall"], ["biggreenadventures.co.uk", "www.biggreenadventures.co.uk"]),
  "cornwall-surfing-academy": place("Cornwall Surfing Academy", "Cornwall Surfing Academy Holywell Bay", ["Cornwall Surfing Academy"], ["Holywell", "Fistral", "Cornwall"], ["cornwallsurfingacademy.co.uk", "www.cornwallsurfingacademy.co.uk"]),
  "stoked-surf-school": place("Stoked Surf School", "Stoked Surf School Perranporth", ["Stoked Surf School"], ["Perranporth", "Cornwall"], ["stokedsurfschool.co.uk", "www.stokedsurfschool.co.uk"]),
  "perranporth-surf-school": place("Perranporth Surf School", "Perranporth Surf School Cornwall", ["Perranporth Surf School"], ["Perranporth", "Cornwall"], ["perranporthsurfschool.co.uk", "www.perranporthsurfschool.co.uk"]),
  "tris-surf-shop": place("Tris Surf Shop", "Tris Surf Shop Porthtowan", ["Tris Surf Shop"], ["Porthtowan", "Cornwall"], ["trissurfshop.com", "www.trissurfshop.com"]),
  "breakers-surf-school": place("Breakers Surf School", "Breakers Surf School St Agnes Cornwall", ["Breakers Surf School"], ["St Agnes", "Trevaunance", "Cornwall"], ["surf-lessons.co.uk", "www.surf-lessons.co.uk"]),
  "global-boarders": place("Global Boarders", "Global Boarders Gwithian Surf School", ["Global Boarders", "Global Boarders Surf School"], ["Gwithian", "Praa Sands", "Cornwall"], ["globalboarders.com", "www.globalboarders.com"]),
  "gwithian-academy-of-surfing": place("Gwithian Academy of Surfing", "Gwithian Academy of Surfing", ["Gwithian Academy of Surfing"], ["Gwithian", "Hayle", "Cornwall"], ["surfacademy.co.uk", "www.surfacademy.co.uk"]),
  "hayle-surf-school": place("Hayle Surf School", "Hayle Surf School Cornwall", ["Hayle Surf School"], ["Hayle", "Cornwall"], ["haylesurfschool.co.uk", "www.haylesurfschool.co.uk"]),
  "st-ives-surf-school": place("St Ives Surf School", "St Ives Surf School Porthmeor", ["St Ives Surf School"], ["Porthmeor", "St Ives", "Cornwall"], ["stivessurfschool.co.uk", "www.stivessurfschool.co.uk"]),
  "sennen-surfing-centre": place("Sennen Surfing Centre", "Sennen Surfing Centre Cornwall", ["Sennen Surfing Centre"], ["Sennen", "Cornwall"], ["sennensurfingcentre.co.uk", "www.sennensurfingcentre.co.uk"])
};

# Surfbooker improvement — progress log

Started 5 Oct 2026. See `docs/site-audit-2026-10.md` for the audit.

## Status
- [x] Repo inventory and audit
- [x] Image registry + clearance rules (data/image-registry.json)
- [x] Destination template + generator (scripts/build-destination-guides.mjs)
- [x] Destination content (region by region) — 95 guides on the shared template
- [x] Accommodation imagery, hubs (14, scripts/build-hubs.mjs), links (113 mixed-case links fixed), redirects (stray /guides/surfing-westward-ho/ file removed so the 301 works)
- [x] Image optimisation (scripts/build-images.mjs → /img WebP derivatives; homepage/CSS use derivatives)
- [x] Checks + screenshots (verify-site: only the pre-existing rwts-rooms-and-resto mismatch remains; check-images: 0 blocked)
- [x] Completion report

## Destinations done (new template, researched content)
- Wales (17): newgale, broad-haven, whitesands, nolton-haven, freshwater-west, freshwater-east, manorbier, marloes-sands, llangennith, rhossili-bay, caswell-bay, langland-bay, oxwich-bay, port-eynon, rest-bay-porthcawl, rhosneigr, hells-mouth-porth-neigwl
- Cornwall (20): summerleaze-beach, widemouth-bay, polzeath, harlyn-bay, constantine-bay, mawgan-porth, watergate-bay, fistral-beach, towan-beach-newquay, great-western-beach, crantock-beach, holywell-bay, perranporth, trevaunance-cove, porthtowan, gwithian-godrevy, hayle-towans, porthmeor-beach, sennen-cove, praa-sands
- Scotland (12): balevullin-tiree, belhaven-bay, coldingham-bay, dalmore-bay-lewis, dunnet-bay, fraserburgh, lossiemouth, machrihanish, melvich, pease-bay, thurso-beach, thurso-east (no hero — photo needed)
- Northern Ireland (9): portrush-east-strand, portrush-west-strand, whiterocks, portstewart-strand, benone-strand (no hero), downhill-beach, castlerock, white-park-bay, ballycastle-beach
- Northeast & Yorkshire (13): tynemouth-longsands (no hero), south-shields, bamburgh, beadnell-bay, druridge-bay, saltburn, redcar, scarborough-north-bay, cayton-bay, filey-bay, whitby (no hero), sandsend, runswick-bay
- Southern England (16): boscombe-pier, bournemouth, southbourne, highcliffe, kimmeridge-bay, swanage, compton-bay, freshwater-bay-isle-of-wight, shanklin, west-wittering, east-wittering, bracklesham-bay, shoreham, brighton, eastbourne, joss-bay
- Devon (8, output kept in guides/<Name>/): croyde-bay, saunton-sands, woolacombe, putsborough, lynmouth, bantham, bigbury-on-sea, challaborough. Originals backed up outside repo.
- Not converted: Westward Ho! (benchmark, hand-built), Clevedon (first-person travel-stop guide, not a surf beach).

## Remaining (needs David)
See the completion report: photos needed, 'confirm' images, rwts-rooms-and-resto record.

## Previously remaining
Hubs, accommodation imagery, links/redirects, verify, commit.

## Notes for whoever continues
- Build order: `node scripts/build-images.mjs` (only when images change) → `node scripts/build-site.mjs` → `node scripts/build-destination-guides.mjs` → `node scripts/build-hubs.mjs` → `node scripts/build-destination-data.mjs` → `node scripts/build-image-credits.mjs` → `node scripts/build-sitemap.mjs` → `node scripts/verify-site.mjs` → `node scripts/check-images.mjs`.
- New images: add to data/image-registry.json first (status cleared/confirm), then run build-images. Blocked images are swapped or removed automatically by scripts/lib/image-safety.mjs.
- Do not re-run `scripts/build-all-uk-guides.mjs` (legacy chain, non-idempotent, needs Commons network access).

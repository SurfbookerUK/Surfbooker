#!/bin/sh
# Rebuild Surfbooker's generated pages in the right order (run from the site folder).
# build-site.mjs (full site, incl. accommodation) only needs running when its own data changes.
set -e
node scripts/build-destination-guides.mjs
node scripts/build-location-pages.mjs
node scripts/run-accommodation.mjs
node scripts/enrich-accommodation-areas.mjs
node scripts/enrich-business-profiles.mjs
node scripts/enrich-region-hubs.mjs
node scripts/build-listing-policy.mjs
node scripts/build-hubs.mjs
node scripts/build-sitemap.mjs
node scripts/assign-site-images.mjs
node scripts/dedupe-page-images.mjs
node scripts/build-image-credits.mjs
python3 scripts/tidy-pages.py
node scripts/check-images.mjs
node scripts/verify-site.mjs

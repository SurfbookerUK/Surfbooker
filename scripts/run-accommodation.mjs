// Rebuild only the accommodation pages (build-site.mjs also does this as part of a full build).
import { buildAccommodationPages, removedStays } from "./build-accommodation.mjs";
buildAccommodationPages(process.cwd());
console.log(`Accommodation pages rebuilt. Removed/redirected stays: ${removedStays.map((s) => s.slug + (s.redirectTo ? " -> " + s.redirectTo : "")).join(", ")}`);
const { applyVisitorChrome } = await import("./apply-visitor-chrome.mjs");
applyVisitorChrome(process.cwd()); // shared header/footer, as build-site does
await import("./dedupe-page-images.mjs");

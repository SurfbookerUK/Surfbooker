import { googlePlaceSlugs, googlePlaceConfigBySlug } from "../netlify/functions/lib/google-place-config.mjs";
import { fetchGooglePlacesForSlugs } from "../netlify/functions/lib/google-places-service.mjs";

const apiKey = process.env.GOOGLE_API_KEY || "";

if (!apiKey) {
  console.error("GOOGLE_API_KEY is not set.");
  process.exit(1);
}

const results = await fetchGooglePlacesForSlugs(googlePlaceSlugs, apiKey);
const lines = googlePlaceSlugs.map((slug) => {
  const config = googlePlaceConfigBySlug[slug];
  const result = results[slug];
  const summary = result.status === "ok"
    ? `${result.rating.toFixed(1)} (${result.userRatingCount} reviews)`
    : result.status;

  return {
    slug,
    school: config.schoolName,
    status: result.status,
    summary,
    placeId: result.placeId || "",
    maps: result.googleMapsUri || ""
  };
});

console.table(lines);

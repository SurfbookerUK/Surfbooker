import { googlePlaceConfigBySlug } from "./google-place-config.mjs";

const SEARCH_ENDPOINT = "https://places.googleapis.com/v1/places:searchText";
const DETAILS_ENDPOINT = "https://places.googleapis.com/v1/places";
const SEARCH_FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.googleMapsUri",
  "places.rating",
  "places.userRatingCount",
  "places.websiteUri",
  "places.photos"
].join(",");
const DETAILS_FIELD_MASK = [
  "id",
  "displayName",
  "formattedAddress",
  "googleMapsUri",
  "rating",
  "userRatingCount",
  "websiteUri",
  "photos"
].join(",");

export async function fetchGooglePlacesForSlugs(slugs, apiKey) {
  const uniqueSlugs = Array.from(new Set((Array.isArray(slugs) ? slugs : []).filter((slug) => slug in googlePlaceConfigBySlug)));
  const entries = await Promise.all(uniqueSlugs.map(async (slug) => {
    const config = googlePlaceConfigBySlug[slug];
    const result = await lookupPlaceForSchool(config, apiKey);
    return [slug, result];
  }));

  return Object.fromEntries(entries);
}

async function lookupPlaceForSchool(config, apiKey) {
  if (!apiKey) {
    return unavailableResult("missing_api_key", null, config.googleMapsUri || null);
  }

  try {
    const place = config.placeId
      ? await fetchPlaceDetails(config.placeId, apiKey)
      : await searchForPlace(config, apiKey);

    if (!place) {
      return unavailableResult("no_match", null, config.googleMapsUri || null);
    }

    if (!isConfidentMatch(place, config)) {
      return unavailableResult("uncertain_match", place, config.googleMapsUri || null);
    }

    const rating = typeof place.rating === "number" ? place.rating : null;
    const userRatingCount = Number.isInteger(place.userRatingCount) ? place.userRatingCount : null;
    const googleMapsUri = typeof place.googleMapsUri === "string" ? place.googleMapsUri : null;
    const placeId = typeof place.id === "string" ? place.id : config.placeId || null;

    if (!googleMapsUri || !placeId) {
      return unavailableResult("missing_required_fields", place, config.googleMapsUri || null);
    }

    return {
      status: rating !== null && userRatingCount !== null ? "ok" : "no_rating",
      placeId,
      displayName: place.displayName?.text || config.schoolName,
      googleMapsUri,
      rating,
      userRatingCount,
      attributionText: "Google Maps",
      photoAttributions: extractPhotoAttributions(place.photos)
    };
  } catch (error) {
    return unavailableResult("lookup_failed", null, config.googleMapsUri || null);
  }
}

async function fetchPlaceDetails(placeId, apiKey) {
  const response = await fetch(`${DETAILS_ENDPOINT}/${encodeURIComponent(placeId)}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": DETAILS_FIELD_MASK
    },
    signal: AbortSignal.timeout(10000)
  });

  const payload = await parseJsonResponse(response);
  if (!response.ok) {
    throw new Error(payload?.error?.status || `details_${response.status}`);
  }

  return payload;
}

async function searchForPlace(config, apiKey) {
  const response = await fetch(SEARCH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": SEARCH_FIELD_MASK
    },
    body: JSON.stringify({
      textQuery: config.searchText,
      languageCode: "en-GB",
      maxResultCount: 5
    }),
    signal: AbortSignal.timeout(10000)
  });

  const payload = await parseJsonResponse(response);
  if (!response.ok) {
    throw new Error(payload?.error?.status || `search_${response.status}`);
  }

  const places = Array.isArray(payload?.places) ? payload.places : [];
  return selectBestMatch(places, config);
}

function selectBestMatch(places, config) {
  const candidates = places
    .map((place) => ({ place, match: scoreMatch(place, config) }))
    .filter((item) => item.match.confident)
    .sort((a, b) => b.match.score - a.match.score);

  if (!candidates.length) {
    return null;
  }

  if (candidates.length > 1 && candidates[0].match.score === candidates[1].match.score) {
    return null;
  }

  return candidates[0].place;
}

function isConfidentMatch(place, config) {
  return scoreMatch(place, config).confident;
}

function scoreMatch(place, config) {
  const displayName = normalizeText(place.displayName?.text || "");
  const formattedAddress = normalizeText(place.formattedAddress || "");
  const websiteHost = normalizeHost(place.websiteUri);
  const acceptedHosts = new Set((config.acceptedWebsiteHosts || []).map(normalizeHost));
  const exactNameMatch = (config.expectedDisplayNames || []).some((name) => normalizeText(name) === displayName);
  const addressMatches = (config.expectedAddressIncludes || []).filter((token) => formattedAddress.includes(normalizeText(token))).length;
  const hostMatch = websiteHost ? acceptedHosts.has(websiteHost) : false;
  const score = (hostMatch ? 4 : 0) + (exactNameMatch ? 3 : 0) + Math.min(addressMatches, 2);
  const confident = (hostMatch && (exactNameMatch || addressMatches > 0)) || (exactNameMatch && addressMatches > 1);

  return { confident, score };
}

function extractPhotoAttributions(photos) {
  if (!Array.isArray(photos)) {
    return [];
  }

  const items = new Map();
  for (const photo of photos) {
    for (const attribution of photo.authorAttributions || []) {
      if (!attribution?.displayName) {
        continue;
      }

      items.set(`${attribution.displayName}|${attribution.uri || ""}`, {
        displayName: attribution.displayName,
        uri: attribution.uri || null
      });
    }
  }

  return Array.from(items.values());
}

function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeHost(value) {
  if (!value) {
    return "";
  }

  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return url.hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
}

function unavailableResult(reason, place = null, fallbackGoogleMapsUri = null) {
  return {
    status: "unavailable",
    reason,
    placeId: place?.id || null,
    displayName: place?.displayName?.text || null,
    googleMapsUri: typeof place?.googleMapsUri === "string" ? place.googleMapsUri : fallbackGoogleMapsUri,
    rating: null,
    userRatingCount: null,
    attributionText: "Google Maps",
    photoAttributions: extractPhotoAttributions(place?.photos)
  };
}

async function parseJsonResponse(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

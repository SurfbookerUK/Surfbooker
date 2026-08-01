import { fetchGooglePlacesForSlugs } from "./lib/google-places-service.mjs";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  let payload;
  try {
    payload = event.body ? JSON.parse(event.body) : {};
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body" });
  }

  const slugs = Array.isArray(payload?.slugs) ? payload.slugs : [];
  const results = await fetchGooglePlacesForSlugs(slugs, process.env.GOOGLE_API_KEY || "");

  return jsonResponse(200, {
    fetchedAt: new Date().toISOString(),
    schools: results
  });
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(body)
  };
}

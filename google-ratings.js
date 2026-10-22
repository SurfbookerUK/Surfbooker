(() => {
  const endpoint = window.SurfbookerGoogleRatingsEndpoint || "/.netlify/functions/google-places-school-data";
  const slotSelector = "[data-google-rating]";
  // Display the last manually checked Google rating when a live Places API
  // response is unavailable. These values link back to Google so visitors can
  // check the latest reviews for themselves.
  const allowStaticRatings = true;
  const staticRatings = {
    "ho-surf": { rating: 5.0, userRatingCount: 80, googleMapsUri: "https://www.google.com/search?q=SurfSUP+Academy&oq=SurfSUP+Academy&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yCAgCEAAYFhgeMggIAxAAGBYYHjIHCAQQABjvBTIHCAUQABjvBTIGCAYQRRg8MgYIBxBFGDzSAQc3NzFqMGo3qAIAsAIA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x486c3dc129b3d925:0xf222f70881ddc93f,1,,,," },
    "north-devon-surf-school": { rating: 4.9, userRatingCount: 344, googleMapsUri: "https://www.google.com/search?sca_esv=b3f2486425dbf702&sxsrf=APpeQnsnbZG0nTn8Dh6iS7LybfiQVP5GKg:1785680265302&q=North+Devon+Surf+School&si=APenkKn5T4YN59srr511wD6k6Pufj9DEzRUvB1XJSwUeeT5afrxU1kvGvX6dklqYmSYKCDsrSag3q4xJwD1YxBdms1eQz-9hV245nAdzolnugz1eOUkjdZ13GVKx1zk-sfdnhnTJwxc6OrgVtCbFx_XF2ubqTIPB2A%3D%3D&sa=X&ved=2ahUKEwiA4ZSvkYKWAxVgWkEAHf6sHw8QrrQLegQIMRAA&biw=1280&bih=551&dpr=1.5#lrd=0x486c3d8bba818ffb:0x7bd6665c3fb81696,1,,,," },
    "westward-waves-surf-school": { rating: 5.0, userRatingCount: null, googleMapsUri: "https://www.google.com/search?q=Westward+Waves+Surf+Schoolreviews&sca_esv=b3f2486425dbf702&biw=1280&bih=551&sxsrf=APpeQnvliWNb562qF_aG_Ny4HVQxvEB6Ag%3A1785680267909&ei=i1Fvas7_NrS3hbIP9L-42Ac&ved=0ahUKEwiO8bOwkYKWAxW0W0EAHfQfDnsQ4dUDCBA&uact=5&oq=Westward+Waves+Surf+Schoolreviews&gs_lp=Egxnd3Mtd2l6LXNlcnAiIVdlc3R3YXJkIFdhdmVzIFN1cmYgU2Nob29scmV2aWV3czIGEAAYBxgeMgsQABiABBiKBRiGAzILEAAYgAQYigUYhgMyCBAAGIkFGKIEMggQABiABBiiBDIFEAAY7wUyBRAAGO8FSIARUNINWNINcAN4AJABAJgBcKABcKoBAzAuMbgBA8gBAPgBAvgBAZgCBKACigHCAggQABiABBiwA8ICCBAAGO8FGLADmAMAiAYBkAYEkgcDMy4xoAeuBrIHAzAuMbgHesIHBzAuMi4xLjHIBxOACAE&sclient=gws-wiz-serp#lrd=0x486c15b5bed91bc9:0xe26d56de36128265,1,,,," },
    "surf-saunton": { rating: 5.0, userRatingCount: 214, googleMapsUri: "https://www.google.com/search?q=Surf+Saunton+reviews&oq=Surf+Saunton+reviews&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yDQgCEAAYhgMYgAQYigUyBwgDEAAY7wUyCggEEAAYgAQYogQyCggFEAAYgAQYogQyCggGEAAYogQYiQXSAQgxODQ0ajBqOagCALACAA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x486c22c6855520f9:0xa8e18de8c87e5daa,1,,,," },
    "walking-on-waves": { rating: 5.0, userRatingCount: 329, googleMapsUri: "https://www.google.com/search?q=Walking+on+Waves+reviews&oq=Walking+on+Waves+reviews&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yDQgCEAAYhgMYgAQYigUyBwgDEAAY7wUyCggEEAAYgAQYogQyCggFEAAYgAQYogQyCggGEAAYogQYiQXSAQgxODQ0ajBqOagCALACAA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x486c22c4e6256c3d:0xdabba9959fbb54b0,1,,,," },
    "woolacombe-surf-centre": { rating: 4.8, userRatingCount: 149, googleMapsUri: "https://www.google.com/search?q=woolacombe+surf+centre+reviews&oq=Woolacombe+Surf+Centre+reviews&gs_lcrp=EgZjaHJvbWUqBwgAEAAYgAQyBwgAEAAYgAQyDQgBEAAYhgMYgAQYigUyDQgCEAAYhgMYgAQYigUyDQgDEAAYhgMYgAQYigUyBwgEEAAY7wUyBwgFEAAY7wUyBwgGEAAY7wUyBwgHEAAY7wXSAQgxNjAxajBqOagCALACAA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x486c23cc82582c33:0x7e70e794754bc3b3,1,,,," },
    "surfing-woolacombe": { rating: 4.4, userRatingCount: 61, googleMapsUri: "https://www.google.com/search?q=Surfing+Woolacombe+reviews&sca_esv=b3f2486425dbf702&sxsrf=APpeQnvL2GGx2bx4bJZGekMi4DDvXAnYXw%3A1785680447082&ei=P1JvavnGBISchbIPg4fogAQ&biw=1280&bih=551&ved=0ahUKEwi54uuFkoKWAxUETkEAHYMDGkAQ4dUDCBA&uact=5&oq=Surfing+Woolacombe+reviews&gs_lp=Egxnd3Mtd2l6LXNlcnAiGlN1cmZpbmcgV29vbGFjb21iZSByZXZpZXdzMgcQABgeGLADMg4QABiABBiKBRiGAxiwAzIOEAAYgAQYigUYhgMYsAMyCBAAGO8FGLADMgsQABiABBiiBBiwAzILEAAYgAQYogQYsANI-QJQ0wFY0wFwAXgAkAEAmAEAoAEAqgEAuAEDyAEA-AEBmAIBoAIKmAMAiAYBkAYGkgcBMaAHALIHALgHAMIHAzItMcgHBoAIAQ&sclient=gws-wiz-serp#sv=CAESzQEKuQEStgEKd0FKaVQ0dEpfZnYwTUZDOENra2ViSFl6N1U1N3dpNmdvcnVxUFdOTTBrZERJd1JRSkU4WnRtUDRpeWZrWTZUYW10bHliX3hHTExpRnBrclFTdnNISzFVLVRfWDk0czJKZWtLU25RcUJjakdlM1haV2VGaFU3cWhNEhdURkp2YXZQZEdQdlBoYklQcThTNmdRRRoiQURzcjlmUVV2Rkt3eXJjaFRXdkxoREJGckpxVGZPUnN2QRIEODA1MRoBMyoAMAA4AUAAGAAgh6LmiAVKAhAC" },
    "surf-south-west": { rating: 4.9, userRatingCount: 240, googleMapsUri: "https://www.google.com/search?q=Surf+South+West+reviews&oq=Surf+South+West+reviews&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yCAgCEAAYFhgeMg0IAxAAGIYDGIAEGIoFMg0IBBAAGIYDGIAEGIoFMg0IBRAAGIYDGIAEGIoFMgcIBhAAGO8FMgoIBxAAGIAEGKIEMgoICBAAGKIEGIkF0gEIMTk3N2owajmoAgCwAgA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x486c3a9a829454d1:0x6c2ff823518bcac6,1,,,," },
    "surfing-croyde-bay": { rating: 5.0, userRatingCount: 821, googleMapsUri: "https://www.google.com/search?q=surfing+croyde+bay+reviews&oq=Surfing+Croyde+Bay+re&gs_lcrp=EgZjaHJvbWUqDQgAEAAYkQIYgAQYigUyDQgAEAAYkQIYgAQYigUyBggBEEUYOTINCAIQABiGAxiABBiKBTINCAMQABiGAxiABBiKBTIHCAQQABjvBTIHCAUQABjvBTIKCAYQABiiBBiJBTIHCAcQABjvBdIBCDM3MjVqMGo5qAIAsAIA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x486c22ec9682f76b:0xf6b70b9ff5470125,1,,,," },
    "nick-thorn-surf-coaching": { rating: 4.8, userRatingCount: 52, googleMapsUri: "https://www.google.com/search?q=Nick+Thorn+Surf+Coaching+reviews&oq=Nick+Thorn+Surf+Coaching+reviews&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIKCAEQABiABBiiBDIKCAIQABiABBiiBDIHCAMQABjvBdIBCDMxMThqMGo5qAIAsAIA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x486c2234c717e91b:0x82c2df823a8db4a8,1,,,," },
    "barefoot-surf-school": { rating: 5.0, userRatingCount: 21, googleMapsUri: "https://www.google.com/search?q=Barefoot+Surf+School+reviews&oq=Barefoot+Surf+School+reviews&gs_lcrp=EgZjaHJvbWUyCggAEEUYFhgeGDkyDQgBEAAYhgMYgAQYigUyDQgCEAAYhgMYgAQYigUyDQgDEAAYhgMYgAQYigUyDQgEEAAYhgMYgAQYigUyCggFEAAYgAQYogQyBwgGEAAY7wUyBwgHEAAY7wUyBwgIEAAY7wXSAQgxODQ1ajBqOagCALACAA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x486c22588fc95585:0x6832cda53fcd94e5,1,,,," }
  };
  const results = new Map();
  const pending = new Set();
  const queued = new Set();
  let activeRequest = null;

  function initialize() {
    if (!document.body) {
      return;
    }

    queueMissingSlots(document);
    observePage();
  }

  function observePage() {
    const observer = new MutationObserver((mutations) => {
      let shouldRender = false;

      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.target instanceof Element && mutation.target.matches(slotSelector)) {
          queueMissingSlots(mutation.target);
          renderSlot(mutation.target);
          continue;
        }

        if (mutation.type !== "childList") {
          continue;
        }

        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) {
            continue;
          }

          if (node.matches(slotSelector) || node.querySelector(slotSelector)) {
            queueMissingSlots(node);
            shouldRender = true;
          }
        }
      }

      if (shouldRender) {
        renderAll();
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-school-slug"],
      childList: true,
      subtree: true
    });
  }

  function queueMissingSlots(root) {
    const scope = root instanceof Element && root.matches(slotSelector) ? [root] : root.querySelectorAll ? root.querySelectorAll(slotSelector) : [];

    for (const slot of scope) {
      const slug = getSlug(slot);
      if (!slug || results.has(slug) || pending.has(slug)) {
        continue;
      }

      if (allowStaticRatings && staticRatings[slug]) {
        results.set(slug, {
          status: "ok",
          rating: staticRatings[slug].rating,
          userRatingCount: staticRatings[slug].userRatingCount,
          googleMapsUri: staticRatings[slug].googleMapsUri,
          attributionText: "Google reviews"
        });
        continue;
      }

      queued.add(slug);
    }

    flushQueue();
  }

  async function flushQueue() {
    if (activeRequest || !queued.size) {
      return;
    }

    const slugs = Array.from(queued);
    queued.clear();
    slugs.forEach((slug) => pending.add(slug));

    activeRequest = fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ slugs })
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("rating_request_failed");
        }

        const payload = await response.json();
        const schoolResults = payload && typeof payload === "object" ? payload.schools || {} : {};

        for (const slug of slugs) {
          results.set(slug, normalizeResult(schoolResults[slug]));
        }
      })
      .catch(() => {
        for (const slug of slugs) {
          results.set(slug, unavailableResult());
        }
      })
      .finally(() => {
        slugs.forEach((slug) => pending.delete(slug));
        activeRequest = null;
        renderAll();

        if (queued.size) {
          flushQueue();
        }
      });
  }

  function renderAll() {
    document.querySelectorAll(slotSelector).forEach((slot) => renderSlot(slot));
  }

  function renderSlot(slot) {
    const slug = getSlug(slot);
    if (!slug) {
      slot.hidden = true;
      return;
    }

    slot.hidden = false;

    const result = results.get(slug);
    if (!result) {
      const fallback = staticRatings[slug];
      if (allowStaticRatings && fallback) {
        slot.replaceChildren(createRatingContent({
          status: "ok",
          rating: fallback.rating,
          userRatingCount: fallback.userRatingCount,
          googleMapsUri: fallback.googleMapsUri,
          attributionText: "Google reviews"
        }));
        return;
      }
      slot.replaceChildren(createStatus("Loading Google rating...", "google-rating-loading"));
      return;
    }

    if (result.status === "ok") {
      slot.replaceChildren(createRatingContent(result));
      return;
    }

    const fallback = staticRatings[slug];
    if (allowStaticRatings && fallback) {
      slot.replaceChildren(createRatingContent({
        status: "ok",
        rating: fallback.rating,
        userRatingCount: fallback.userRatingCount,
        googleMapsUri: fallback.googleMapsUri,
        attributionText: "Google reviews"
      }));
      return;
    }

    slot.replaceChildren(createUnavailableContent(result));
  }

  function createRatingContent(result) {
    const wrapper = document.createElement("div");
    wrapper.className = "google-rating-display";

    const ratingBlock = document.createElement("div"); // no links to other sites
    ratingBlock.className = "google-rating-link";
    ratingBlock.setAttribute("aria-label", buildAccessibleText(result.rating, result.userRatingCount));

    if (ratingBlock instanceof HTMLAnchorElement) {
      ratingBlock.href = result.googleMapsUri;
      ratingBlock.target = "_blank";
      ratingBlock.rel = "noopener noreferrer";
    }

    ratingBlock.append(createStars(result.rating));

    const score = document.createElement("span");
    score.className = "google-rating-score";
    score.textContent = formatRating(result.rating);
    ratingBlock.append(score);

    const accessibleText = document.createElement("span");
    accessibleText.className = "sr-only";
    accessibleText.textContent = buildAccessibleText(result.rating, result.userRatingCount);
    ratingBlock.append(accessibleText);

    wrapper.append(ratingBlock);
    wrapper.append(createGoogleMapsLabel(result.attributionText || "Google Maps"));

    return wrapper;
  }

  function createUnavailableContent(result) {
    const wrapper = document.createElement("div");
    wrapper.className = "google-rating-display";

    wrapper.append(createStatus("No Google rating currently available", "google-rating-empty"));
    if (false && result.googleMapsUri) { // no links to other sites
      const link = document.createElement("a");
      link.className = "google-rating-link";
      link.href = result.googleMapsUri;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Google reviews";
      wrapper.append(link);
    }

    return wrapper;
  }

  function createStatus(text, className) {
    const paragraph = document.createElement("p");
    paragraph.className = className;
    paragraph.textContent = text;
    return paragraph;
  }

  function createGoogleMapsLabel(label) {
    const text = document.createElement("span");
    text.className = "google-maps-link";
    text.textContent = label;
    return text;
  }

  function createStars(rating) {
    const starFill = `${Math.max(0, Math.min(100, (rating / 5) * 100))}%`;
    const stars = document.createElement("span");
    stars.className = "google-stars";
    stars.setAttribute("aria-hidden", "true");
    stars.style.setProperty("--google-star-fill", starFill);

    const base = document.createElement("span");
    base.className = "google-stars-base";
    base.textContent = "\u2605\u2605\u2605\u2605\u2605";

    const fill = document.createElement("span");
    fill.className = "google-stars-fill";
    fill.textContent = "\u2605\u2605\u2605\u2605\u2605";

    stars.append(base, fill);
    return stars;
  }

  function normalizeResult(value) {
    if (!value || typeof value !== "object") {
      return unavailableResult();
    }

    const normalized = {
      status: value.status === "ok" ? "ok" : "unavailable",
      googleMapsUri: typeof value.googleMapsUri === "string" ? value.googleMapsUri : "",
      attributionText: typeof value.attributionText === "string" ? value.attributionText : "Google Maps",
      rating: typeof value.rating === "number" ? value.rating : null,
      userRatingCount: Number.isInteger(value.userRatingCount) ? value.userRatingCount : null
    };

    if (normalized.status === "ok" && normalized.rating === null) {
      return unavailableResult();
    }

    return normalized.status === "ok" ? normalized : {
      status: "unavailable",
      googleMapsUri: normalized.googleMapsUri,
      attributionText: normalized.attributionText,
      rating: null,
      userRatingCount: null
    };
  }

  function unavailableResult() {
    return {
      status: "unavailable",
      googleMapsUri: "",
      attributionText: "Google Maps",
      rating: null,
      userRatingCount: null
    };
  }

  function getSlug(slot) {
    return slot && slot.dataset ? String(slot.dataset.schoolSlug || "").trim() : "";
  }

  function formatRating(rating) {
    return rating.toFixed(1);
  }

  function formatCount(count) {
    return count.toLocaleString("en-GB");
  }

  function buildAccessibleText(rating, count) {
    if (!Number.isInteger(count)) {
      return `Rated ${formatRating(rating)} out of 5 on Google`;
    }
    return `Rated ${formatRating(rating)} out of 5 from ${formatCount(count)} Google review${count === 1 ? "" : "s"}`;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();

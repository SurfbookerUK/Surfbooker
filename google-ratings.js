(() => {
  const endpoint = window.SurfbookerGoogleRatingsEndpoint || "/.netlify/functions/google-places-school-data";
  const slotSelector = "[data-google-rating]";
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
      slot.replaceChildren(createStatus("Loading Google rating...", "google-rating-loading"));
      return;
    }

    if (result.status === "ok") {
      slot.replaceChildren(createRatingContent(result));
      return;
    }

    slot.replaceChildren(createUnavailableContent(result));
  }

  function createRatingContent(result) {
    const wrapper = document.createElement("div");
    wrapper.className = "google-rating-display";

    const ratingBlock = document.createElement("div");
    ratingBlock.className = "google-rating-link";
    ratingBlock.setAttribute("aria-label", buildAccessibleText(result.rating, result.userRatingCount));

    ratingBlock.append(createStars(result.rating));

    const score = document.createElement("span");
    score.className = "google-rating-score";
    score.textContent = formatRating(result.rating);
    ratingBlock.append(score);

    const count = document.createElement("span");
    count.className = "google-rating-count";
    count.textContent = `(${formatCount(result.userRatingCount)} Google review${result.userRatingCount === 1 ? "" : "s"})`;
    ratingBlock.append(count);

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

    wrapper.append(createGoogleMapsLabel(result.attributionText || "Google Maps"));

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
    base.textContent = "★★★★★";

    const fill = document.createElement("span");
    fill.className = "google-stars-fill";
    fill.textContent = "★★★★★";

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

    if (normalized.status === "ok" && (normalized.rating === null || normalized.userRatingCount === null)) {
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
    return `Rated ${formatRating(rating)} out of 5 from ${formatCount(count)} Google review${count === 1 ? "" : "s"}`;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();

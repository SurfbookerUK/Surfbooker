(() => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  document.querySelectorAll(".food-review-card[data-published]").forEach((card) => {
    const badge = card.querySelector(".review-new-badge");
    if (!badge) return;

    const parts = card.dataset.published.split("-").map(Number);
    if (parts.length !== 3 || parts.some((part) => !Number.isInteger(part))) {
      badge.remove();
      return;
    }

    const published = new Date(parts[0], parts[1] - 1, parts[2]);
    published.setHours(0, 0, 0, 0);
    const fullDaysSincePublication = Math.floor((today - published) / millisecondsPerDay);

    if (!Number.isFinite(fullDaysSincePublication) || fullDaysSincePublication >= 28) {
      badge.remove();
    }
  });
})();

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const root = process.cwd();

const guideTargets = new Map([
  ["guides/Bantham/index.html", { beach: "Bantham", lesson: "/surf-lessons/bigbury-on-sea/", hire: "/surf-hire/bantham/" }],
  ["guides/Bigbury-on-sea/index.html", { beach: "Bigbury-on-Sea", lesson: "/surf-lessons/bigbury-on-sea/", hire: "/surf-hire/bigbury-on-sea/" }],
  ["guides/Challaborough/index.html", { beach: "Challaborough", lesson: "/surf-lessons/south-devon/", hire: "/surf-hire/south-devon/" }],
  ["guides/Croyde/index.html", { beach: "Croyde", lesson: "/surf-lessons/croyde/", hire: "/surf-hire/croyde/" }],
  ["guides/Putsborough/index.html", { beach: "Putsborough", lesson: "/surf-lessons/putsborough/", hire: "/surf-hire/putsborough/" }],
  ["guides/Saunton/index.html", { beach: "Saunton", lesson: "/surf-lessons/saunton/", hire: "/surf-hire/saunton/" }],
  ["guides/Woolacombe/index.html", { beach: "Woolacombe", lesson: "/surf-lessons/woolacombe/", hire: "/surf-hire/woolacombe/" }],
  ["guides/westwardho!/index.html", { beach: "Westward Ho!", lesson: "/surf-lessons/westward-ho/", hire: "/surf-hire/westward-ho/" }],
  ["guides/surfing-fistral-beach/index.html", { beach: "Fistral Beach", lesson: "/surf-lessons/fistral/", hire: "/surf-hire/fistral/" }],
  ["guides/surfing-constantine-bay/index.html", { beach: "Constantine Bay", lesson: "/surf-lessons/harlyn-bay/", hire: "/surf-hire/cornwall/" }],
  ["guides/surfing-crantock-beach/index.html", { beach: "Crantock Beach", lesson: "/surf-lessons/crantock/", hire: "/surf-hire/cornwall/" }],
  ["guides/surfing-great-western-beach/index.html", { beach: "Great Western Beach", lesson: "/surf-lessons/great-western/", hire: "/surf-hire/cornwall/" }],
  ["guides/surfing-gwithian-godrevy/index.html", { beach: "Gwithian & Godrevy", lesson: "/surf-lessons/gwithian-godrevy/", hire: "/surf-hire/gwithian-godrevy/" }],
  ["guides/surfing-harlyn-bay/index.html", { beach: "Harlyn Bay", lesson: "/surf-lessons/harlyn-bay/", hire: "/surf-hire/cornwall/" }],
  ["guides/surfing-hayle-towans/index.html", { beach: "Hayle Towans", lesson: "/surf-lessons/hayle-towans/", hire: "/surf-hire/cornwall/" }],
  ["guides/surfing-holywell-bay/index.html", { beach: "Holywell Bay", lesson: "/surf-lessons/holywell-bay/", hire: "/surf-hire/cornwall/" }],
  ["guides/surfing-mawgan-porth/index.html", { beach: "Mawgan Porth", lesson: "/surf-lessons/cornwall/", hire: "/surf-hire/cornwall/" }],
  ["guides/surfing-perranporth/index.html", { beach: "Perranporth", lesson: "/surf-lessons/perranporth/", hire: "/surf-hire/perranporth/" }],
  ["guides/surfing-polzeath/index.html", { beach: "Polzeath", lesson: "/surf-lessons/polzeath/", hire: "/surf-hire/polzeath/" }],
  ["guides/surfing-porthmeor-beach/index.html", { beach: "Porthmeor Beach", lesson: "/surf-lessons/porthmeor/", hire: "/surf-hire/porthmeor/" }],
  ["guides/surfing-porthtowan/index.html", { beach: "Porthtowan", lesson: "/surf-lessons/porthtowan/", hire: "/surf-hire/cornwall/" }],
  ["guides/surfing-praa-sands/index.html", { beach: "Praa Sands", lesson: "/surf-lessons/praa-sands/", hire: "/surf-hire/praa-sands/" }],
  ["guides/surfing-sennen-cove/index.html", { beach: "Sennen Cove", lesson: "/surf-lessons/sennen-cove/", hire: "/surf-hire/cornwall/" }],
  ["guides/surfing-summerleaze-beach/index.html", { beach: "Summerleaze Beach", lesson: "/surf-lessons/summerleaze/", hire: "/surf-hire/cornwall/" }],
  ["guides/surfing-towan-beach-newquay/index.html", { beach: "Towan Beach", lesson: "/surf-lessons/towan-newquay/", hire: "/surf-hire/cornwall/" }],
  ["guides/surfing-trevaunance-cove/index.html", { beach: "Trevaunance Cove", lesson: "/surf-lessons/st-agnes/", hire: "/surf-hire/cornwall/" }],
  ["guides/surfing-watergate-bay/index.html", { beach: "Watergate Bay", lesson: "/surf-lessons/watergate-bay/", hire: "/surf-hire/watergate-bay/" }],
  ["guides/surfing-westward-ho/index.html", { beach: "Westward Ho!", lesson: "/surf-lessons/westward-ho/", hire: "/surf-hire/westward-ho/" }],
  ["guides/surfing-widemouth-bay/index.html", { beach: "Widemouth Bay", lesson: "/surf-lessons/widemouth-bay/", hire: "/surf-hire/cornwall/" }],
  ["guides/Lynmouth/index.html", null]
]);

function buildSection({ beach, lesson, hire }) {
  const cards = [
    `<article class="listing-card"><h3>Find surf lessons near ${beach}</h3><p><a class="btn btn-dark" href="${lesson}">Open lesson page</a></p></article>`
  ];
  if (hire) {
    cards.push(`<article class="listing-card"><h3>Find surf hire near ${beach}</h3><p><a class="btn btn-dark" href="${hire}">Open hire page</a></p></article>`);
  }
  return `
      <section class="section alt" id="plan-your-session">
        <div class="shell">
          <div class="section-head">
            <p class="eyebrow">Plan your session</p>
            <h2>Move from the beach guide to the nearest Surfbooker options.</h2>
          </div>
          <div class="listing-grid">
            ${cards.join("")}
          </div>
        </div>
      </section>`;
}

function updateFile(relPath, target) {
  const absPath = join(root, relPath);
  const input = readFileSync(absPath, "utf8");
  const sectionPattern = /<section class="section alt" id="plan-your-session">[\s\S]*?<\/section>\s*/;
  const replacement = target ? buildSection(target) + "\n" : "";
  let output = input.replace(sectionPattern, replacement);

  if (target && !sectionPattern.test(input)) {
    output = output.replace(/<\/main>/, `${buildSection(target)}\n</main>`);
  }

  if (!target) {
    output = input.replace(sectionPattern, "");
  }

  if (output !== input) {
    writeFileSync(absPath, output);
    return true;
  }
  return false;
}

let changed = 0;
for (const [relPath, target] of guideTargets.entries()) {
  if (updateFile(relPath, target)) changed += 1;
}

console.log(`Updated ${changed} guide pages.`);

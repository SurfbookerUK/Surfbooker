// Adds an introductory editorial section to the North Devon and South Devon guide hubs.
// Idempotent: replaces its own block on every run.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const root = process.cwd();
const INTROS = {
  "north-devon": {
    eyebrow: "North Devon surf",
    title: "Where to surf in North Devon",
    body: [
      "North Devon faces the Atlantic across the Bristol Channel, and it is the most reliable place in England for learners to find waves within an hour of each other. Beaches here are mostly sandy, so a fall is soft, and the cluster around Braunton Burrows and Baggy Point means you can usually find a spot that suits the day's wind and swell.",
      "<strong>Croyde Bay</strong> is the best known: a powerful, busy beach break that rewards confident surfers and can be unforgiving for beginners at the wrong stage of the tide. <strong>Saunton Sands</strong> is the opposite: a long, gentle beach that suits longboards and learners. <strong>Putsborough</strong> and <strong>Woolacombe</strong> sit together on the open coast beneath Baggy Point, with Putsborough picking up shelter from the headland. Further west, <strong>Westward Ho!</strong> has a wide beach, a pebble ridge and several surf schools, while <strong>Lynmouth</strong> on the Exmoor coast is a rare, serious point break for experienced surfers only.",
      "The Bristol Channel has a very large tidal range, so the time of high and low water matters as much as the swell forecast. Many North Devon beaches work best on a mid tide, and rip currents can strengthen as the tide moves. Surf where lifeguards are on duty and check the flags before you paddle out.",
      "Use the table below to compare beaches at a glance, then open a guide for parking, lessons, hire and places to stay. If you are travelling for a weekend, pick a base first: Croyde and Braunton put you closest to the best breaks, Woolacombe suits families, and Westward Ho! and Bideford are good value bases with easy access to the Torridge estuary."
    ],
    links: [["Surf lessons in North Devon", "/surf-lessons/north-devon/"], ["Surf hire in North Devon", "/surf-hire/north-devon/"], ["Where to stay in North Devon", "/accommodation/north-devon/"]]
  },
  "south-devon": {
    eyebrow: "South Devon surf",
    title: "Where to surf in South Devon",
    body: [
      "South Devon is a different kind of surf trip. The coast faces south and south-west, so it is sheltered from small north Atlantic swells and comes alive when a good south-west swell pushes up the Channel, usually in autumn and winter. In summer it can be flat for days, so treat it as a place to surf when the forecast lines up rather than a guaranteed daily surf.",
      "<strong>Bantham</strong> is the headline break, a sandy beach at the mouth of the River Avon with a peaky wave that attracts surfers from across the South West. <strong>Bigbury-on-Sea</strong> sits beside Burgh Island and offers a wide beach with space on a mid-size swell, and <strong>Challaborough</strong> is a smaller, quieter bay close by that is useful when the bigger beaches are busy.",
      "Offshore winds from the north and north-east are what make these beaches work, so a cold, clear winter day with a south-westerly swell is often the best of the year. Check the tide as well, because several beaches handle only certain stages of it. Always check the flags and surf where lifeguards are on duty in season.",
      "The surrounding area, with Salcombe, Kingsbridge and the South Hams, gives you plenty to do on flat days: coast path walks, estuary boat trips, cafes and pubs. Use the table below to compare the beaches, then open a guide for parking, lessons, hire and where to stay."
    ],
    links: [["Surf lessons in South Devon", "/surf-lessons/south-devon/"], ["Surf hire in South Devon", "/surf-hire/south-devon/"], ["Where to stay in South Devon", "/accommodation/south-devon/"]]
  }
};
let n = 0;
for (const [region, c] of Object.entries(INTROS)) {
  const file = join(root, "guides", region, "index.html");
  if (!existsSync(file)) continue;
  let h = readFileSync(file, "utf8").replace(/<!--sb-hubintro-->[\s\S]*?<!--\/sb-hubintro-->\n?/, "");
  const links = c.links.filter(([, href]) => existsSync(join(root, href.replace(/^\//, ""), "index.html")))
    .map(([t, href]) => `<a class="text-link" href="${href}">${t}</a>`).join(" · ");
  const block = `<!--sb-hubintro--><section class="section" aria-labelledby="sb-hubintro-title"><div class="shell"><div class="section-head"><p class="eyebrow">${c.eyebrow}</p><h2 id="sb-hubintro-title">${c.title}</h2></div><div class="prose" style="max-width:760px">${c.body.map((p) => `<p>${p}</p>`).join("")}${links ? `<p>${links}</p>` : ""}</div></div></section><!--/sb-hubintro-->\n`;
  const at = h.indexOf("<main>");
  if (at < 0) continue;
  const end = at + "<main>".length;
  h = h.slice(0, end) + "\n" + block + h.slice(end);
  writeFileSync(file, h); n++;
}
console.log(`Hub intros added: ${n}`);

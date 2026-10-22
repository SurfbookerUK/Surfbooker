import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "data", "scotland-destinations-research.txt");
const input = fs.readFileSync(file, "utf8");
const aliases = {
  "Belhaven Bay, Dunbar": "belhaven-bay",
  "Balevullin, Tiree": "balevullin-tiree",
  "Coldingham Bay": "coldingham-bay",
  "Dalmore Bay, Lewis": "dalmore-bay-lewis",
  "Dunnet Bay": "dunnet-bay",
  Fraserburgh: "fraserburgh",
  Lossiemouth: "lossiemouth",
  Machrihanish: "machrihanish",
  Melvich: "melvich",
  "Pease Bay": "pease-bay",
  "Thurso Beach": "thurso-beach",
  "Thurso East": "thurso-east"
};

export const scotlandResearch = {};
for (const chunk of input.split(/\n={20,}\n/)) {
  const title = chunk.trim().split(/\r?\n/)[0];
  const slug = aliases[title];
  if (!slug) continue;
  const answers = {};
  for (const match of chunk.matchAll(/(?:^|\n)(\d{1,2})\. ([^\n]+)\n\s*\n([\s\S]*?)(?=\n(?:\d{1,2}\. |(?:Surf destination|Lessons and equipment|Access and facilities|Accommodation|Food and drink|Beyond surfing|Alternatives and local advice|Photographs and sources|Sources consulted|Final publication check)\s*$))/gm)) {
    answers[Number(match[1])] = { question: clean(match[2]), answer: clean(match[3]) };
  }
  const sourceBlock = chunk.match(/\nSources consulted\s*\n([\s\S]*?)\nFinal publication check/)?.[1] || "";
  const sources = [...sourceBlock.matchAll(/https?:\/\/[^\s]+/g)].map((match) => match[0].replace(/[.,;)]+$/, ""));
  if (Object.keys(answers).length !== 72) throw new Error(`${title}: expected 72 answers`);
  scotlandResearch[slug] = { title, answers, sources: [...new Set(sources)] };
}

function clean(value) {
  return String(value).trim()
    .replaceAll("â€œ", "“").replaceAll("â€", "”").replaceAll("â€™", "’")
    .replaceAll("â€“", "–").replaceAll("â€”", "—").replaceAll("Â£", "£")
    .replaceAll("Ã©", "é").replaceAll("â€¢", "•").replace(/\s+/g, " ");
}

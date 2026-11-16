# Pasujki: level design

Owner: the levels agent. Files: `src/game/levels.ts`, `src/game/item-attributes.ts`, `scripts/validate-levels.ts`, this document.

## 1. What toddlers can do (short research summary)

| Skill | Typical age | What it means for Pasujki |
|---|---|---|
| **Identical matching** (picture → same picture) | from ~2 y | The easiest perceptual task. It starts the game (W1) with only 2 active corners. |
| **Sorting by shape and colour** | CDC lists "begins to sort shapes, colors" at 2 y; most children sort by shape and colour by 3 y | Colour (W2) comes right after identical matching, and shapes (W3) follow. Both start with 2 corners. |
| **Colour matching vs colour naming** | Children perceive, match and categorise colours long before they name them. In recent studies about half of 21-month-olds understand the 4 basic colour words, and production of colour terms becomes stable around 2–3 y ("slow mapping") | Colour rounds are **matching** tasks (colour blob → item of that colour), so they work before the child can name the colour. The narrator's word is a bonus. W2 starts with red/yellow/blue/green and adds orange, pink, purple, brown, white, black and grey later. Early levels never show hues that are easy to mix up (red/pink, orange/yellow, blue/purple, white/grey). |
| **Shape recognition** | Over 60 % of 3-year-olds name circle, square and triangle; about 80 % by 5 y. Atypical shapes (stretched, rotated) stay hard through the preschool years | Circle, star and heart (very distinct) come first. Triangle and crescent come next, then oval and rectangle. Circle vs oval as lures only appears in the last shape level (4+). Every shape answer is a *typical* exemplar (a ball, an egg, a banana). |
| **Thematic association** (dog → bone, bee → hive) | 34-month-olds recognise more thematic links than 26-month-olds. At 3–4 y thematic grouping is the most common spontaneous strategy (about 45 % in a free-sorting study). Taxonomic and flexible sorting grows at 4–5 y | Food, home and mother→baby (W5) start at 3+ with 3 corners and go to 4+ with 4 corners. Mother→baby comes first because the baby looks like its mother, so there is a perceptual cue. |
| **Context switching and resisting a salient cue** | Flexibility between relations is still weak at 4 y and better at 5 y | W6 ends with **lures**: the distractors share the answer's colour, so the child has to use the relation and not the colour. These levels are marked 5+. |
| **Working memory and screen load** | Learning from a touchscreen is demanding for toddlers and depends on working memory. App usability has to match the child's ability | The number of choices grows slowly: **2 → 3 → 4** active corners. Empty corners "sleep" (`null`). The same pattern repeats inside every world: 2 or 3 corners at the start, 4 at the end. Levels have **6 rounds** (about 2–3 min, per docs/CALM_DESIGN_RESEARCH.md). |
| **Pretend / imaginative play** | Rich from 2–3 y | W7 "Wymyślanki" has no right answer: every choice is celebrated. It is a low-pressure world that any child can play. |

Sources:
- [CDC milestone checklists (2 y and 3 y), archived](https://webarchive.library.unt.edu/web/20121006203616/http://www.cdc.gov/ncbddd/actearly/milestones/milestones-2yr.html) · [3 y](https://webarchive.library.unt.edu/eot2008/20090813124336/http://cdc.gov/ncbddd/actearly/milestones/milestones-3yr.html) · [CDC "Milestones Matter" poster](https://www.cdc.gov/ncbddd/actearly/documents/LTSAE_MilestonesMatter_English_Customizable_24x36.pdf) · [Michigan Medicine: milestones for 3-year-olds](https://uofmhealth.org/health-library/ue5314)
- Colour terms: [Pitchford & Mullen 2006](https://www.mvr.mcgill.ca/Kathy/PDF-05-09/Pitchford-Mullen-2006.pdf) · [Davidoff & Roberson, development of colour categories](https://eprints.goldsmiths.ac.uk/410/1/PSY_davidoff-robertson-dev-color-categories_2002.pdf) · [O'Hanlon & Roberson](https://repository.essex.ac.uk/12973/1/O%26%2339%3BHanlon%2520%2526%2520Roberson.pdf) · [Frontiers in Dev. Psych. 2025 (slow mapping, cross-language)](https://public-pages-files-2025.frontiersin.org/journals/developmental-psychology/articles/10.3389/fdpys.2025.1641593/pdf)
- Shapes: [Three- to six-year-old children's recognition of geometric shapes](https://bvbvf1.bib-bvb.de/vufind/PrimoRecord/cdi_eric_primary_EJ763461) · [PMC5676522 (citing Fuson & Murray 1978; Klein, Starkey & Wakeley 1999)](https://pmc.ncbi.nlm.nih.gov/articles/PMC5676522) · [NAEYC: shapes and space in preschool](https://www.naeyc.org/node/658)
- Thematic vs taxonomic: [Fenson, Vella & Kennedy 1989, relations at two years](https://bvbvf1.bib-bvb.de/vufind/PrimoRecord/cdi_proquest_miscellaneous_79132571) · [Blaye & Bonthoux 2001](https://lpc.univ-amu.fr/doc/hal-01441408/_5) · [cross-classification of foods by 3–7-year-olds](https://pmc.ncbi.nlm.nih.gov/articles/PMC2442888) · [free-sorting study, 3–4 y](https://www.atlantis-press.com/article/125966938.pdf)
- Screens and working memory: [Frontiers in Psychology 2021, touchscreens and WM in 24–36-month-olds](https://www.frontiersin.org/articles/10.3389/fpsyg.2021.621372/text) · [Haptics and hotspots: usable apps for children](https://pure.uva.nl/ws/files/109603573/Haptics_and_hotspots_creating_usable_and_educational_apps_for_children_in_the_Netherlands.pdf)

Caveat: no study gives an exact "best number of choices per age". The 2 → 3 → 4 ramp is a design decision based on the working-memory and usability findings above. The data should be tuned with real play-testing (watch for random tapping, which means the level is too hard).

## 2. Worlds and the difficulty curve

7 worlds, 34 levels, 204 rounds. Every level has 6 rounds.

| World | Title (PL / EN) | Levels | Age | Corners | What changes |
|---|---|---|---|---|---|
| 1 | Takie same / The same | 5 | 2+ | 2 → 2 → 3 → 3 → 4 | Identical picture. Distractors come from another category and have a different colour; from L4 the category can be the same. |
| 2 | Kolory / Colours | 5 | 2+ → 3+ | 2 → 2 → 3 → 3 → 4 | Red/yellow/blue/green, then orange, then pink/purple/brown/white, then black/grey. Every corner has a different colour, and early levels never use confusable hues. |
| 3 | Kształty / Shapes | 4 | 3+ → 4+ | 2 → 3 → 3 → 4 | Circle/star/heart vs shapeless animals. Then triangle and crescent, then oval and rectangle. The last level uses other clear shapes as distractors (4+). |
| 4 | Wzorki / Patterns | 4 | 3+ → 4+ | 2 → 3 → 4 → 4 | Stripes, spots, wool and scales. Then feathers and fur. Then materials (wood, waves, bricks, ice, honeycomb). The last level has same-colour lures (stripes → tiger next to an orange squirrel). |
| 5 | Kto z kim? / Who goes with whom? | 6 | 3+ → 4+ | 3 → 3 → 3 → 4 → 4 → 4 | Mother & baby (easy distractors are wild animals), who eats what, where it lives. Then the same relations with 4 corners: other farm mothers, other animals, other homes. |
| 6 | Pogoda i pary / Weather and pairs | 6 | 4+ → 5+ | 3 → 4 → 3 → 4 → 4 → 4 | Weather → what we need. Things that go together. Then **lures**: distractors share the answer's colour. The finale mixes all rules. |
| 7 | Wymyślanki / Make-believe | 4 | 3+ (all ages) | 4 | Rule `free`, answer `null`. A colour, pattern, shape or present next to four animals, none of which truly fits ("Kto lubi kolor fioletowy?"). Every choice is celebrated. |

Distractor difficulty is set per level in `levels.ts` (`diff`):
- **easy**: clearly wrong. A different category where it makes sense, a different and non-confusable colour from the answer, and every corner a different colour.
- **medium**: same domain (other homes, other mothers, other clothes), still a different colour from the answer.
- **hard**: colour lures. In relation rounds, up to 2 distractors share the answer's colour. In colour rounds they have a confusable hue.

General rules (enforced by the generator and checked by the validator):
- Answer corners are balanced per level (counts differ by at most 1) and never the same corner twice in a row.
- A prompt is never repeated in consecutive rounds. Pinned answers are not repeated consecutively either.
- Every distractor is **implausible**, not just "not the official answer". The relation maps are deliberately generous (a horse also eats carrots, a hen also lives in a nest, a pig eats nearly everything), and look-alikes are blocked: two-tone items in colour rounds, roundish items in shape rounds, "also has" textures, a hat in the sun, a cat next to a kitten.
- Two-tone items (cow, zebra, penguin, calf, watermelon, house) never appear in colour rounds.

## 3. Data model

- `src/game/item-attributes.ts`
  - `ITEM_ATTRS[id]`: dominant `color` (the illustrator's contract, see the table at the top of the file and `src/art/dominant.ts`), `colorFair`, `color2`, `outline` (ShapeId or null), `shapeAmbiguous`, category `tags`, and the Polish name with gender, genitive and accusative forms for hints, plus the English name.
  - Relation maps: `EATS`, `LIVES_IN`, `BABY_OF`, `TEXTURE_OF` (`owners` + `alsoHas`), `WEATHER_NEEDS` (+ `WEATHER_MAYBE` look-alikes), `PAIRS` (symmetric).
  - `satisfies(rule, prompt, item)` (the intended answer), `plausible(...)` (answer or look-alike, never allowed as a distractor), `relatesUnderAnyRule(...)` (for the abstract world).
- `src/game/levels.ts`: a declarative `WORLD_SPECS` table plus a small deterministic generator. A seeded shuffle per level id picks the distractors, corners and order, and `WORLDS` is plain data. To add a level, add an entry to `WORLD_SPECS` (pin an `answer` when several are possible and one is the iconic one, e.g. acorn → squirrel), then run the validator.
- Hints: short Polish, child-directed lines ("Co jest żółte?", "Gdzie jest mama kurczaczka?", "Kto lubi marchewkę?", "Pada deszczyk! Co się przyda?") with English equivalents.

## 4. Validation

```
npx tsx scripts/validate-levels.ts
```

The validator checks: 4 targets per round; every id exists in the contract; graded rounds point to a non-null corner whose item satisfies the rule; no other corner is plausible (unambiguous); `free` rounds have `answer: null`, 4 targets and nothing that truly fits; no duplicate targets; no identical consecutive rounds; 5–6 rounds per level; balanced answer corners; hints and titles are present; `ITEM_ATTRS` colours agree with the illustrator's `src/art/dominant.ts`. It exits with code 1 on any error.

## 5. Known gaps / proposals for the contract

- **No clean square item.** The pillow and the book are drawn as rounded or near-square rectangles, so `square` is only used in the abstract world. Proposal: add a `gift` (square present box) or `block` (toy cube) item, or draw `pillow` as a clear square.
- **Only one clean triangle (`carrot`).** The cheese is a 3-D wedge and the watermelon is drawn as a half-round slice. Proposal: add `party_hat` or `sandwich` (triangle half), or draw `cheese` as a flat triangle.
- **Black has a single fair item (`sunglasses`).** The penguin is two-tone. Proposal: add a black item such as `cat_black`, `crow` or `top_hat`, if colour levels need more variety.
- **Nice-to-have for relations:** `grass`/`hay` as an item (cow, sheep and horse food), `nuts`, and a generic `bird` (nest owner).

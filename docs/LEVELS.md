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
| **Silhouette matching** (shadow → picture) | Recognising objects from outline alone develops through the preschool years; matching a silhouette to its picture is a classic 3–4 y puzzle activity | W4 "Cienie" sits after shapes: the same "outline" skill, applied to real objects. Early levels use outlines from different families (animal vs vehicle); later levels use similar outlines (four-legged animals together). Only items on the art agent's `SILHOUETTE_CLEAR` list are used. |
| **Pretend / imaginative play** | Rich from 2–3 y | W7 "Wymyślanki" has no right answer: every choice is celebrated. It is a low-pressure world that any child can play. |

Sources:
- [CDC milestone checklists (2 y and 3 y), archived](https://webarchive.library.unt.edu/web/20121006203616/http://www.cdc.gov/ncbddd/actearly/milestones/milestones-2yr.html) · [3 y](https://webarchive.library.unt.edu/eot2008/20090813124336/http://cdc.gov/ncbddd/actearly/milestones/milestones-3yr.html) · [CDC "Milestones Matter" poster](https://www.cdc.gov/ncbddd/actearly/documents/LTSAE_MilestonesMatter_English_Customizable_24x36.pdf) · [Michigan Medicine: milestones for 3-year-olds](https://uofmhealth.org/health-library/ue5314)
- Colour terms: [Pitchford & Mullen 2006](https://www.mvr.mcgill.ca/Kathy/PDF-05-09/Pitchford-Mullen-2006.pdf) · [Davidoff & Roberson, development of colour categories](https://eprints.goldsmiths.ac.uk/410/1/PSY_davidoff-robertson-dev-color-categories_2002.pdf) · [O'Hanlon & Roberson](https://repository.essex.ac.uk/12973/1/O%26%2339%3BHanlon%2520%2526%2520Roberson.pdf) · [Frontiers in Dev. Psych. 2025 (slow mapping, cross-language)](https://public-pages-files-2025.frontiersin.org/journals/developmental-psychology/articles/10.3389/fdpys.2025.1641593/pdf)
- Shapes: [Three- to six-year-old children's recognition of geometric shapes](https://bvbvf1.bib-bvb.de/vufind/PrimoRecord/cdi_eric_primary_EJ763461) · [PMC5676522 (citing Fuson & Murray 1978; Klein, Starkey & Wakeley 1999)](https://pmc.ncbi.nlm.nih.gov/articles/PMC5676522) · [NAEYC: shapes and space in preschool](https://www.naeyc.org/node/658)
- Thematic vs taxonomic: [Fenson, Vella & Kennedy 1989, relations at two years](https://bvbvf1.bib-bvb.de/vufind/PrimoRecord/cdi_proquest_miscellaneous_79132571) · [Blaye & Bonthoux 2001](https://lpc.univ-amu.fr/doc/hal-01441408/_5) · [cross-classification of foods by 3–7-year-olds](https://pmc.ncbi.nlm.nih.gov/articles/PMC2442888) · [free-sorting study, 3–4 y](https://www.atlantis-press.com/article/125966938.pdf)
- Screens and working memory: [Frontiers in Psychology 2021, touchscreens and WM in 24–36-month-olds](https://www.frontiersin.org/articles/10.3389/fpsyg.2021.621372/text) · [Haptics and hotspots: usable apps for children](https://pure.uva.nl/ws/files/109603573/Haptics_and_hotspots_creating_usable_and_educational_apps_for_children_in_the_Netherlands.pdf)

Caveat: no study gives an exact "best number of choices per age". The 2 → 3 → 4 ramp is a design decision based on the working-memory and usability findings above. The data should be tuned with real play-testing (watch for random tapping, which means the level is too hard).

## 2. Worlds and the difficulty curve (v0.2)

8 worlds, 68 levels, 408 rounds. Every level has 6 rounds.

| World | Title (PL / EN) | Levels | Age | Corners | What changes |
|---|---|---|---|---|---|
| 1 | Takie same / The same | 8 | 2+ | 2,2,2 → 3,3,3 → 4,4 | Identical picture. Distractors come from another category with a clearly different colour; from L6 the category can be the same. 48 different pictures, none repeated in the world. |
| 2 | Kolory / Colours | 8 | 2+ → 3+ → 4+ | 2,2 → 3,3,3 → 4,4,4 | Six different colours per level. Easy levels never show confusable hues, and every corner has a different colour. The last level uses confusable hues as lures (4+). |
| 3 | Kształty / Shapes | 7 | 3+ → 4+ | 2,2 → 3,3,3 → 4,4 | Six different shapes per level (square via gift/block, triangle via carrot/party hat). Shapeless animals as distractors first, then other clear shapes. |
| 4 | **Cienie / Shadows** (new) | 6 | 3+ → 4+ | 2 → 3,3 → 4,4,4 | Dark silhouette → the item in colour. Easy levels use other silhouette families; hard levels use the same family (cat among horse and mouse). Look-alike outlines (ball/orange, sock/boot, cat/fox…) are never shown together. |
| 5 | Wzorki / Patterns | 8 | 3+ → 4+ | 2,2 → 3,3,3 → 4,4,4 | Stripes, spots, wool, scales, feathers, fur, then materials (wood, waves, bricks, ice, honeycomb). The last two levels add same-colour lures. |
| 6 | Kto z kim? / Who goes with whom? | 12 | 3+ → 4+ | 3 ×6 → 4 ×6 | Every level mixes mother & baby, food and homes (2–4 rounds of each), so the six mother/baby pairs never fill a level on their own. Easy → medium (same domain) → hard (colour lures). |
| 7 | Pogoda i pary / Weather and pairs | 10 | 4+ → 5+ | 3 ×4 → 4 ×6 | Weather (max. 3 per level, since there are only 4 weather prompts) mixed with pairs (party set, beach set, bedtime, bathroom, clothes). Then lures, then a finale that mixes all rules. |
| 8 | Wymyślanki / Make-believe | 9 | 3+ (all ages) | 4 | Rule `free`, answer `null`, themed: "Kto lubi ten kolor?", "Czyje wzorki?", "Komu prezent?", "Co zje dinozaur?", "Kto by tu zamieszkał?", "Wymyśl sam", "Co założymy?", "Komu ten kolor?", "Pobawmy się!". Nothing truly fits, and every choice is celebrated. |

Distractor difficulty is set per level in `levels.ts` (`diff`):
- **easy**: clearly wrong. Another category or silhouette family, a different and non-confusable colour from the answer, and every corner a different colour.
- **medium**: same domain (other homes, other farm animals, other clothes), still a different colour from the answer.
- **hard**: lures. Up to 2 distractors share the answer's colour; in colour rounds they have a confusable hue, and in shadow rounds they come from the same silhouette family.

### Variety rules (v0.2, enforced by the validator)
- Within a level an item appears **at most 2×** in total across prompts and targets. A `same` or `shadow` round already uses both slots for its item.
- An answer item is never reused as an answer in the same level, and **no prompt repeats** within a level.
- Consecutive levels (in play order, across world borders too) share **at most 50 %** of their answer items. Currently the maximum is 33 %.
- The generator prefers items shown least often in the current world and avoids the previous level's answers.

Spread per world (all appearances, prompts + targets):

| World | Distinct items | Max appearances of one item in the world |
|---|---|---|
| W1 Takie same | 117 | 3 |
| W2 Kolory | 119 | 2 |
| W3 Kształty | 58 | 5 (heart_toy: the only heart) |
| W4 Cienie | 80 | 3 |
| W5 Wzorki | 74 | 4 |
| W6 Kto z kim? | 68 | 10 (sheep/cow/hen: 6 mothers × 12 levels) |
| W7 Pogoda i pary | 105 | 7 (snowflake: one of 4 weather prompts) |
| W8 Wymyślanki | 81 | 7 |

General rules:
- Answer corners are balanced per level (counts differ by at most 1) and never the same corner twice in a row.
- Every distractor is **implausible**, not just "not the official answer". The relation maps are deliberately generous (a horse also eats carrots and hay, a duck also nests, a pig eats nearly everything), and look-alikes are blocked: two-tone items in colour rounds, roundish items in shape rounds, "also has" textures, a hat in the sun, a cat next to a kitten, near-identical silhouettes.
- Two-tone items (cow, zebra, penguin, calf, watermelon, house, rainbow) never appear in colour rounds.
- No food appears as a distractor in pair rounds (fruit next to a cake or a spoon would read as "goes together").

## 3. Data model

- `src/game/item-attributes.ts`
  - `ITEM_ATTRS[id]`: dominant `color` (the illustrator's contract, see the table at the top of the file and `src/art/dominant.ts`), `colorFair`, `color2`, `outline` (ShapeId or null), `shapeAmbiguous`, category `tags`, and the Polish name with gender, genitive and accusative forms for hints, plus the English name.
  - Relation maps: `EATS`, `LIVES_IN`, `BABY_OF`, `TEXTURE_OF` (`owners` + `alsoHas`), `WEATHER_NEEDS` (+ `WEATHER_MAYBE` look-alikes), `PAIRS` (symmetric).
  - Silhouettes: `SIL_FAMILY` (similar outlines, used as hard lures) and `silhouetteTwins()` (near-identical outlines, never together).
  - `satisfies(rule, prompt, item)` (the intended answer), `plausible(...)` (answer or look-alike, never allowed as a distractor), `relatesUnderAnyRule(...)` (for the abstract world).
- `src/game/levels.ts`: a declarative `WORLD_SPECS` table plus a small deterministic generator. A seeded shuffle per level id picks the distractors, corners and order, plus the shadow items (from `SILHOUETTE_CLEAR`). It keeps per-level and per-world usage counts for variety, and `WORLDS` is plain data. To add a level, add an entry to `WORLD_SPECS` (pin an `answer` when several are possible and one is the iconic one, e.g. acorn → squirrel), then run the validator.
- Hints: short Polish, child-directed lines ("Co jest żółte?", "Czyj to cień?", "Gdzie jest mama kurczaczka?", "Kto lubi marchewkę?", "Pada deszczyk! Co się przyda?", "Co zje dinozaur?") with English equivalents.

## 4. Validation

```
npx tsx scripts/validate-levels.ts
```

Correctness checks: 4 targets per round; every id exists in the contract; graded rounds point to a non-null corner whose item satisfies the rule; no other corner is plausible (unambiguous); `free` rounds have `answer: null`, 4 targets and nothing that truly fits; shadow rounds use only `SILHOUETTE_CLEAR` items; no duplicate targets; 5–6 rounds per level; balanced answer corners; hints and titles are present; `ITEM_ATTRS` colours agree with `src/art/dominant.ts`.

Variety checks: the rules above. The validator also prints spread statistics per world and exits with code 1 on any error.

## 5. Known gaps / proposals for the contract

- Done in v0.2: square (gift, block), triangle (party_hat), a second black item (crow), grass food (hay), a generic bird.
- Only one heart (`heart_toy`), one star (`star`) and one rectangle (`soap`) answer exist, so these items recur across shape levels. A second heart (e.g. `cookie_heart`) and rectangle (e.g. `domino`, `brick`) would spread W3 further.
- Weather has only 4 prompts (sun, rain, cloud, snow). Adding `wind` (→ kite) and `rainbow`-related needs would allow pure weather levels.
- Mother/baby has only 6 pairs, so mothers recur across W6. More pairs (`horse` → `foal`, `pig` → `piglet`, `rabbit` → `bunny`) would help.

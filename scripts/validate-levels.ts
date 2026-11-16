/**
 * Validates src/game/levels.ts against the contract (src/game/types.ts) and the truth tables
 * (src/game/item-attributes.ts). Run: npx tsx scripts/validate-levels.ts   (exit code 1 on errors)
 *
 * Checks: 4 targets per round; ids exist in the contract; graded rounds have a non-null answer whose
 * item satisfies the rule and NO other target is plausible (unambiguous); 'free' rounds have answer
 * null, 4 targets and nothing that truly fits; balanced answer quadrants per level; no identical
 * consecutive rounds; 5–6 rounds per level; hints present; dominant colours agree with the art table.
 */
import { ITEM_DOMINANT } from '../src/art/dominant';
import { ITEM_ATTRS, plausible, relatesUnderAnyRule, satisfies } from '../src/game/item-attributes';
import { WORLDS } from '../src/game/levels';
import { COLOR_IDS, ITEM_IDS, SHAPE_IDS, TEXTURE_IDS, type Prompt, type Round } from '../src/game/types';

const errors: string[] = [];
const warnings: string[] = [];
const err = (where: string, msg: string) => errors.push(`${where}: ${msg}`);

const itemSet = new Set<string>(ITEM_IDS);
const promptOk = (p: Prompt) =>
  (p.kind === 'item' && itemSet.has(p.id)) ||
  (p.kind === 'color' && (COLOR_IDS as readonly string[]).includes(p.id)) ||
  (p.kind === 'texture' && (TEXTURE_IDS as readonly string[]).includes(p.id)) ||
  (p.kind === 'shape' && (SHAPE_IDS as readonly string[]).includes(p.id) && (!p.color || (COLOR_IDS as readonly string[]).includes(p.color)));

const roundKey = (r: Round) => JSON.stringify([r.prompt, r.targets, r.rule]);

let nLevels = 0;
let nRounds = 0;
const levelIds = new Set<string>();
const ages: string[] = [];

for (const w of WORLDS) {
  if (!/^#[0-9A-Fa-f]{6}$/.test(w.tint)) err(`world ${w.id}`, `bad tint ${w.tint}`);
  if (!w.title_pl || !w.title_en) err(`world ${w.id}`, 'missing title');
  for (const l of w.levels) {
    nLevels++;
    const L = l.id;
    if (levelIds.has(L)) err(L, 'duplicate level id');
    levelIds.add(L);
    if (l.world !== w.id) err(L, `world mismatch ${l.world} != ${w.id}`);
    if (!l.title_pl || !l.title_en) err(L, 'missing title');
    if (l.rounds.length < 5 || l.rounds.length > 6) err(L, `has ${l.rounds.length} rounds (want 5–6)`);
    ages.push(`${L}:${l.age}`);
    const quad = [0, 0, 0, 0];

    l.rounds.forEach((r, ri) => {
      nRounds++;
      const R = `${L} r${ri + 1}`;
      if (!Array.isArray(r.targets) || r.targets.length !== 4) {
        err(R, 'targets must have exactly 4 entries');
        return;
      }
      if (!promptOk(r.prompt)) err(R, `unknown prompt ${JSON.stringify(r.prompt)}`);
      for (const t of r.targets) if (t && !itemSet.has(t.id)) err(R, `unknown target id ${t.id}`);
      if (!r.hint_pl || !r.hint_en) err(R, 'missing hint');
      const ids = r.targets.filter((t) => t).map((t) => t!.id);
      if (new Set(ids).size !== ids.length) err(R, 'duplicate target');
      if (ids.length < 2) err(R, 'fewer than 2 active corners');

      if (ri > 0 && roundKey(r) === roundKey(l.rounds[ri - 1])) err(R, 'same round as previous');
      if (ri > 0 && JSON.stringify(r.prompt) === JSON.stringify(l.rounds[ri - 1].prompt)) err(R, 'same prompt as previous round');

      if (r.rule === 'free') {
        if (r.answer !== null) err(R, "'free' round must have answer null");
        if (ids.length !== 4) err(R, "'free' round should have 4 targets");
        for (const id of ids) if (relatesUnderAnyRule(r.prompt, id)) err(R, `free round: ${id} actually fits ${JSON.stringify(r.prompt)}`);
        return;
      }
      if (r.answer === null || r.answer === undefined || r.answer < 0 || r.answer > 3) {
        err(R, `bad answer ${r.answer}`);
        return;
      }
      const at = r.targets[r.answer];
      if (!at) {
        err(R, `answer ${r.answer} points to an empty corner`);
        return;
      }
      quad[r.answer]++;
      if (!satisfies(r.rule, r.prompt, at.id)) err(R, `answer ${at.id} does not satisfy ${r.rule} ${JSON.stringify(r.prompt)}`);
      r.targets.forEach((t, k) => {
        if (!t || k === r.answer) return;
        if (plausible(r.rule, r.prompt, t.id)) err(R, `ambiguous: ${t.id} also fits ${r.rule} ${JSON.stringify(r.prompt)}`);
        if (r.rule !== 'same' && r.prompt.kind === 'item' && r.prompt.id === t.id) err(R, `prompt item ${t.id} repeated as a target`);
      });
      if (r.rule === 'color') for (const id of ids) if (!ITEM_ATTRS[id as keyof typeof ITEM_ATTRS].colorFair) err(R, `two-tone ${id} in a colour round`);
    });

    const graded = quad.reduce((a, b) => a + b, 0);
    if (graded > 0 && Math.max(...quad) - Math.min(...quad) > 1) err(L, `unbalanced answer quadrants ${quad.join('/')}`);
    for (let i = 1; i < l.rounds.length; i++) {
      const a = l.rounds[i - 1].answer;
      if (a !== null && a === l.rounds[i].answer) warnings.push(`${L}: answer in the same corner twice in a row (r${i}, r${i + 1})`);
    }
  }
}

// dominant colours must agree with the illustrator's table (src/art/dominant.ts)
function checkArt() {
  for (const id of ITEM_IDS) {
    const a = (ITEM_DOMINANT as Partial<Record<string, string>>)[id];
    if (!a) warnings.push(`art: ${id} missing from ITEM_DOMINANT`);
    else if (a !== ITEM_ATTRS[id].color) err('art', `${id}: art paints ${a}, item-attributes says ${ITEM_ATTRS[id].color}`);
  }
}

checkArt();
{
  console.log(`Worlds: ${WORLDS.length}  Levels: ${nLevels}  Rounds: ${nRounds}`);
  for (const w of WORLDS)
    console.log(`  W${w.id} ${w.title_pl.padEnd(16)} ${w.levels.map((l) => `${l.id}(${l.age},${l.rounds.length})`).join(' ')}`);
  for (const wmsg of warnings) console.log(`WARN  ${wmsg}`);
  if (errors.length) {
    for (const e of errors) console.log(`ERROR ${e}`);
    console.log(`\n${errors.length} error(s).`);
    process.exit(1);
  }
  console.log('\nOK: all levels valid.');
}

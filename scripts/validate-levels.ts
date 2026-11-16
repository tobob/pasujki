/**
 * Validates src/game/levels.ts against the contract (src/game/types.ts) and the truth tables
 * (src/game/item-attributes.ts). Run: npx tsx scripts/validate-levels.ts   (exit code 1 on errors)
 *
 * Correctness: 4 targets per round; ids exist in the contract; graded rounds have a non-null answer
 * whose item satisfies the rule and NO other target is plausible (unambiguous); 'free' rounds have
 * answer null, 4 targets and nothing that truly fits; 'shadow' rounds only use SILHOUETTE_CLEAR items;
 * balanced answer quadrants per level; 5–6 rounds per level; hints present; dominant colours agree
 * with the art table.
 * Variety: an item appears at most 2× per level (prompts + targets); an answer item is never reused
 * as an answer in the same level; no prompt repeats within a level; consecutive levels share at most
 * 50 % of their answer items. Prints per-world spread statistics.
 */
import { ITEM_DOMINANT } from '../src/art/dominant';
import { SILHOUETTE_CLEAR } from '../src/art/silhouette-ok';
import { ITEM_ATTRS, plausible, relatesUnderAnyRule, satisfies } from '../src/game/item-attributes';
import { WORLDS } from '../src/game/levels';
import { COLOR_IDS, ITEM_IDS, SHAPE_IDS, TEXTURE_IDS, type ItemId, type Prompt } from '../src/game/types';

const errors: string[] = [];
const warnings: string[] = [];
const err = (where: string, msg: string) => errors.push(`${where}: ${msg}`);

const itemSet = new Set<string>(ITEM_IDS);
const silSet = new Set<string>(SILHOUETTE_CLEAR);
const isColor = (x: string) => (COLOR_IDS as readonly string[]).includes(x);
const promptOk = (p: Prompt) =>
  ((p.kind === 'item' || p.kind === 'shadow') && itemSet.has(p.id)) ||
  (p.kind === 'color' && isColor(p.id)) ||
  (p.kind === 'texture' && (TEXTURE_IDS as readonly string[]).includes(p.id)) ||
  (p.kind === 'shape' && (SHAPE_IDS as readonly string[]).includes(p.id) && (!p.color || isColor(p.color)));
const promptKey = (p: Prompt) => `${p.kind}:${p.id}${p.kind === 'shape' && p.color ? ':' + p.color : ''}`;
const promptItem = (p: Prompt): ItemId | null => (p.kind === 'item' || p.kind === 'shadow' ? p.id : null);

const MAX_PER_LEVEL = 2;
const MAX_ANSWER_OVERLAP = 0.5;

let nLevels = 0;
let nRounds = 0;
const levelIds = new Set<string>();
let prevAnswers: { id: string; set: Set<ItemId> } | null = null;
let worstOverlap = { pct: 0, where: '' };
let worstLevelCount = { n: 0, where: '' };
const worldStats: string[] = [];

for (const w of WORLDS) {
  if (!/^#[0-9A-Fa-f]{6}$/.test(w.tint)) err(`world ${w.id}`, `bad tint ${w.tint}`);
  if (!w.title_pl || !w.title_en) err(`world ${w.id}`, 'missing title');
  const worldCount = new Map<ItemId, number>();

  for (const l of w.levels) {
    nLevels++;
    const L = l.id;
    if (levelIds.has(L)) err(L, 'duplicate level id');
    levelIds.add(L);
    if (l.world !== w.id) err(L, `world mismatch ${l.world} != ${w.id}`);
    if (!l.title_pl || !l.title_en) err(L, 'missing title');
    if (l.rounds.length < 5 || l.rounds.length > 6) err(L, `has ${l.rounds.length} rounds (want 5–6)`);
    const quad = [0, 0, 0, 0];
    const levelCount = new Map<ItemId, number>();
    const seenPrompts = new Set<string>();
    const answerItems = new Set<ItemId>();
    const bump = (i: ItemId) => levelCount.set(i, (levelCount.get(i) ?? 0) + 1);

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

      // variety bookkeeping
      const key = promptKey(r.prompt);
      if (seenPrompts.has(key)) err(R, `prompt ${key} repeats within the level`);
      seenPrompts.add(key);
      const pi = promptItem(r.prompt);
      if (pi) bump(pi);
      ids.forEach(bump);

      if (r.rule === 'shadow' || r.prompt.kind === 'shadow') {
        if (r.rule !== 'shadow' || r.prompt.kind !== 'shadow') err(R, "'shadow' rule and prompt kind must go together");
        for (const id of [...ids, ...(pi ? [pi] : [])]) if (!silSet.has(id)) err(R, `${id} is not in SILHOUETTE_CLEAR`);
      }

      if (r.rule === 'free') {
        if (r.answer !== null) err(R, "'free' round must have answer null");
        if (ids.length !== 4) err(R, "'free' round should have 4 targets");
        for (const id of ids) if (relatesUnderAnyRule(r.prompt, id)) err(R, `free round: ${id} actually fits ${key}`);
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
      if (answerItems.has(at.id)) err(R, `answer item ${at.id} already used as an answer in this level`);
      answerItems.add(at.id);
      if (!satisfies(r.rule, r.prompt, at.id)) err(R, `answer ${at.id} does not satisfy ${r.rule} ${key}`);
      r.targets.forEach((t, k) => {
        if (!t || k === r.answer) return;
        if (plausible(r.rule, r.prompt, t.id)) err(R, `ambiguous: ${t.id} also fits ${r.rule} ${key}`);
        if (r.rule !== 'same' && r.rule !== 'shadow' && pi === t.id) err(R, `prompt item ${t.id} repeated as a target`);
      });
      if (r.rule === 'color') for (const id of ids) if (!ITEM_ATTRS[id].colorFair) err(R, `two-tone ${id} in a colour round`);
    });

    // per-level variety
    for (const [i, c] of levelCount) {
      if (c > MAX_PER_LEVEL) err(L, `${i} appears ${c}× (max ${MAX_PER_LEVEL})`);
      if (c > worstLevelCount.n) worstLevelCount = { n: c, where: `${L} ${i}` };
      worldCount.set(i, (worldCount.get(i) ?? 0) + c);
    }
    const graded = quad.reduce((a, b) => a + b, 0);
    if (graded > 0 && Math.max(...quad) - Math.min(...quad) > 1) err(L, `unbalanced answer quadrants ${quad.join('/')}`);
    for (let i = 1; i < l.rounds.length; i++) {
      const a = l.rounds[i - 1].answer;
      if (a !== null && a === l.rounds[i].answer) warnings.push(`${L}: answer in the same corner twice in a row (r${i}, r${i + 1})`);
    }
    // consecutive levels (in play order, across worlds too): ≥ 50 % different answer items
    if (answerItems.size > 0) {
      if (prevAnswers) {
        const shared = [...answerItems].filter((i) => prevAnswers!.set.has(i));
        const pct = shared.length / answerItems.size;
        if (pct > worstOverlap.pct) worstOverlap = { pct, where: `${prevAnswers.id}→${L}` };
        if (pct > MAX_ANSWER_OVERLAP) err(L, `shares ${shared.length}/${answerItems.size} answers with ${prevAnswers.id} (${shared.join(', ')})`);
      }
      prevAnswers = { id: L, set: answerItems };
    }
  }

  const sorted = [...worldCount.entries()].sort((a, b) => b[1] - a[1]);
  const total = sorted.reduce((a, [, c]) => a + c, 0);
  worldStats.push(
    `  W${w.id} ${w.title_pl.padEnd(14)} levels ${String(w.levels.length).padStart(2)}  distinct items ${String(sorted.length).padStart(3)}  ` +
      `appearances ${String(total).padStart(3)}  max/item ${sorted[0]?.[1] ?? 0} (${sorted.slice(0, 3).map(([i, c]) => `${i} ${c}`).join(', ')})`,
  );
}

// dominant colours must agree with the illustrator's table (src/art/dominant.ts)
const missingArt: string[] = [];
for (const id of ITEM_IDS) {
  const a = (ITEM_DOMINANT as Partial<Record<string, string>>)[id];
  if (!a) missingArt.push(id);
  else if (a !== ITEM_ATTRS[id].color) err('art', `${id}: art paints ${a}, item-attributes says ${ITEM_ATTRS[id].color}`);
}
if (missingArt.length) warnings.push(`art: ${missingArt.length} item(s) missing from ITEM_DOMINANT: ${missingArt.join(', ')}`);

console.log(`Worlds: ${WORLDS.length}  Levels: ${nLevels}  Rounds: ${nRounds}`);
for (const w of WORLDS)
  console.log(`  W${w.id} ${w.title_pl.padEnd(14)} ${w.levels.map((l) => `${l.id.split('-')[1]}(${l.age})`).join(' ')}`);
console.log('\nVariety:');
for (const s of worldStats) console.log(s);
console.log(`  max appearances of one item in one level: ${worstLevelCount.n} (${worstLevelCount.where})`);
console.log(`  max answer overlap between consecutive levels: ${Math.round(worstOverlap.pct * 100)}% (${worstOverlap.where})`);
for (const wmsg of warnings) console.log(`WARN  ${wmsg}`);
if (errors.length) {
  for (const e of errors) console.log(`ERROR ${e}`);
  console.log(`\n${errors.length} error(s).`);
  process.exit(1);
}
console.log('\nOK: all levels valid.');

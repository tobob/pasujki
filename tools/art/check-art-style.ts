/**
 * Static checks for the illustration style rules in docs/ART_STYLE.md that can be checked from source.
 * Run: npx tsx tools/art/check-art-style.ts   (part of `npm run check`)
 *
 * - Beaked animals: the beak IS the mouth. No <Smile>, and every <Face> passes mouth={false}.
 * - Patterned animals (stripes/spots on the head): pattern shapes must be clipped to the head
 *   (<ClipPath>) so they can never spill over the outline; keep them off the face zone by design.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join(__dirname, '../../src/art/items');
const BEAKED = ['hen', 'chick', 'duck', 'duckling', 'crow', 'bird', 'owl', 'penguin', 'parrot', 'flamingo'];
const CLIPPED_PATTERN = ['zebra'];

const errors: string[] = [];
for (const id of BEAKED) {
  const src = readFileSync(join(DIR, `${id}.tsx`), 'utf8');
  if (/<Smile\b/.test(src)) errors.push(`${id}: beaked animal draws a <Smile> (the beak is the mouth)`);
  for (const face of src.match(/<Face\b[^>]*>/g) ?? []) {
    if (!/mouth=\{false\}/.test(face)) errors.push(`${id}: <Face> without mouth={false}`);
  }
}
for (const id of CLIPPED_PATTERN) {
  const src = readFileSync(join(DIR, `${id}.tsx`), 'utf8');
  if (!/<ClipPath\b/.test(src)) errors.push(`${id}: head pattern is not clipped to the head (<ClipPath>)`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`art style OK (${BEAKED.length} beaked, ${CLIPPED_PATTERN.length} clipped-pattern items)`);

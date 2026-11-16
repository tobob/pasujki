#!/usr/bin/env node
/**
 * Renders every Pasujki drawing to standalone SVG and a contact sheet PNG, and checks that each
 * item contains its dominant COLORS hex. Needs `esbuild` and `@resvg/resvg-js` resolvable via
 * NODE_PATH (they are NOT app dependencies), e.g.:
 *   NODE_PATH=/path/to/scratch/node_modules node tools/art/render.mjs [outDir]
 * Writes tools/art/contact-sheet.png (+ per-section sheets into outDir if given).
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(path.join(process.env.NODE_PATH ?? '.', 'x.js'));
const esbuild = require('esbuild');
const { Resvg } = require('@resvg/resvg-js');

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const outDir = process.argv[2] ? path.resolve(process.argv[2]) : path.join(os.tmpdir(), 'pasujki-art');
fs.mkdirSync(outDir, { recursive: true });

const items = fs.readdirSync(path.join(root, 'src/art/items')).filter((f) => /^[a-z_]+\.tsx$/.test(f)).map((f) => f.replace('.tsx', ''));
const textures = fs.existsSync(path.join(root, 'src/art/textures'))
  ? fs.readdirSync(path.join(root, 'src/art/textures')).filter((f) => /^[a-z_]+\.tsx$/.test(f)).map((f) => f.replace('.tsx', ''))
  : [];
const hasShapes = fs.existsSync(path.join(root, 'src/art/shapes.tsx'));

const entry = `
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ITEM_IDS, TEXTURE_IDS, SHAPE_IDS } from '@/game/types';
import { COLORS, UI } from '@/game/palette';
import { ITEM_DOMINANT } from '@/art/dominant';
${items.map((id) => `import I_${id} from '@/art/items/${id}';`).join('\n')}
${textures.map((id) => `import T_${id} from '@/art/textures/${id}';`).join('\n')}
${hasShapes ? `import * as SH from '@/art/shapes';` : 'const SH = null;'}
const r = (C, p) => renderToStaticMarkup(createElement(C, { size: 100, ...p }));
export const data = {
  ITEM_IDS, TEXTURE_IDS, SHAPE_IDS, COLORS, UI, ITEM_DOMINANT,
  items: { ${items.map((id) => `${JSON.stringify(id)}: r(I_${id})`).join(',')} },
  textures: { ${textures.map((id) => `${JSON.stringify(id)}: r(T_${id})`).join(',')} },
  shapes: SH ? Object.fromEntries(SHAPE_IDS.map((id, i) => [id, r(SH.ShapeArt, { id, color: Object.keys(COLORS)[i % 9] })])) : {},
};
`;
const bundle = path.join(outDir, '_bundle.cjs');
await esbuild.build({
  stdin: { contents: entry, resolveDir: root, loader: 'tsx', sourcefile: 'entry.tsx' },
  bundle: true, format: 'cjs', platform: 'node', outfile: bundle, jsx: 'automatic', logLevel: 'error',
  alias: { 'react-native-svg': path.join(here, 'rnsvg-mock.mjs') },
  tsconfig: path.join(root, 'tsconfig.json'),
});
const { data } = createRequire(import.meta.url)(bundle);

// --- checks ---
const problems = [];
for (const id of data.ITEM_IDS) {
  const svg = data.items[id];
  if (!svg) { problems.push(`missing item: ${id}`); continue; }
  const hex = data.COLORS[data.ITEM_DOMINANT[id]];
  if (!svg.toUpperCase().includes(`FILL="${hex}"`)) problems.push(`item ${id}: dominant ${data.ITEM_DOMINANT[id]} ${hex} not used as fill`);
}
for (const id of data.TEXTURE_IDS) if (!data.textures[id]) problems.push(`missing texture: ${id}`);
for (const id of data.SHAPE_IDS) if (!data.shapes[id]) problems.push(`missing shape: ${id}`);
const unknown = items.filter((id) => !data.ITEM_IDS.includes(id));
if (unknown.length) problems.push(`unknown item files: ${unknown.join(', ')}`);

// --- standalone svgs ---
for (const [kind, map] of [['items', data.items], ['textures', data.textures], ['shapes', data.shapes]]) {
  fs.mkdirSync(path.join(outDir, kind), { recursive: true });
  for (const [id, svg] of Object.entries(map)) fs.writeFileSync(path.join(outDir, kind, `${id}.svg`), svg);
}

// --- contact sheets ---
const embed = (svg, x, y, s) => svg.replace(/^<svg([^>]*)width="100" height="100"/, `<svg$1x="${x}" y="${y}" width="${s}" height="${s}"`);
function sheet(entries, cols, cell = 150, title = '') {
  const rows = Math.ceil(entries.length / cols);
  const W = cols * cell, top = title ? 40 : 0, H = rows * (cell + 22) + top;
  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="100%" height="100%" fill="${data.UI.bg}"/>`;
  if (title) out += `<text x="12" y="28" font-family="Helvetica" font-size="22" fill="#4B4453">${title}</text>`;
  entries.forEach(([label, svg, swatch], i) => {
    const x = (i % cols) * cell, y = top + Math.floor(i / cols) * (cell + 22);
    out += `<rect x="${x + 4}" y="${y + 4}" width="${cell - 8}" height="${cell - 8}" rx="14" fill="${data.UI.quadrant[i % 4]}"/>`;
    if (svg) out += embed(svg, x + 10, y + 10, cell - 20);
    if (swatch) out += `<circle cx="${x + 12}" cy="${y + cell + 8}" r="7" fill="${swatch}" stroke="#4B4453" stroke-width="1.5"/>`;
    out += `<text x="${x + 24}" y="${y + cell + 13}" font-family="Helvetica" font-size="14" fill="#4B4453">${label}</text>`;
  });
  return out + '</svg>';
}
const png = (svg, file, width) => {
  const r = new Resvg(svg, { fitTo: width ? { mode: 'width', value: width } : { mode: 'original' }, font: { loadSystemFonts: true, defaultFontFamily: 'Helvetica' } });
  fs.writeFileSync(file, r.render().asPng());
};
const itemEntries = data.ITEM_IDS.map((id) => [id, data.items[id], data.COLORS[data.ITEM_DOMINANT[id]]]);
const texEntries = data.TEXTURE_IDS.map((id) => [id, data.textures[id]]);
const shapeEntries = data.SHAPE_IDS.map((id) => [id, data.shapes[id]]);
const all = [...itemEntries, ...texEntries, ...shapeEntries];
png(sheet(all, 15, 120, 'Pasujki — items, textures, shapes'), path.join(here, 'contact-sheet.png'));
// zoomed section sheets for review
const chunk = 30;
for (let i = 0; i < itemEntries.length; i += chunk) png(sheet(itemEntries.slice(i, i + chunk), 6, 170), path.join(outDir, `items-${i / chunk + 1}.png`));
png(sheet([...texEntries, ...shapeEntries], 6, 170), path.join(outDir, 'textures-shapes.png'));

console.log(`items ${Object.keys(data.items).length}/${data.ITEM_IDS.length}, textures ${Object.keys(data.textures).length}/${data.TEXTURE_IDS.length}, shapes ${Object.keys(data.shapes).length}/${data.SHAPE_IDS.length}`);
if (problems.length) { console.log('PROBLEMS:\n  ' + problems.join('\n  ')); process.exitCode = 1; } else console.log('all checks OK');
console.log('sheets:', path.join(here, 'contact-sheet.png'), outDir);

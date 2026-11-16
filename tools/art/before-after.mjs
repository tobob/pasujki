#!/usr/bin/env node
/**
 * Before/after comparison sheet from two folders of standalone SVGs (as written by render.mjs).
 *   NODE_PATH=<dir with @resvg/resvg-js> node tools/art/before-after.mjs <beforeDir> <afterDir> <out.png> id...
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(path.join(process.env.NODE_PATH ?? '.', 'x.js'));
const { Resvg } = require('@resvg/resvg-js');
const [before, after, out, ...ids] = process.argv.slice(2);
const c = 150, top = 34, labelW = 80;
const W = labelW + ids.length * c, H = top + 2 * (c + 6) + 24;
const embed = (file, x, y) =>
  fs.readFileSync(file, 'utf8').replace(/^<svg([^>]*)width="100" height="100"/, `<svg$1x="${x}" y="${y}" width="${c - 16}" height="${c - 16}"`);
let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="#FFF8EC"/>`;
s += `<text x="12" y="24" font-family="Helvetica" font-size="18" fill="#4B4453">Pasujki — before (top) / after (bottom)</text>`;
['before', 'after'].forEach((row, r) => {
  const y = top + r * (c + 6);
  s += `<text x="12" y="${y + c / 2}" font-family="Helvetica" font-size="15" fill="#4B4453">${row}</text>`;
  ids.forEach((id, i) => {
    const x = labelW + i * c;
    s += `<rect x="${x + 3}" y="${y + 3}" width="${c - 6}" height="${c - 6}" rx="14" fill="#FFFDF8" stroke="#EDE4D6" stroke-width="2"/>`;
    const f = path.join(r ? after : before, `${id}.svg`);
    if (fs.existsSync(f)) s += embed(f, x + 8, y + 8);
  });
});
ids.forEach((id, i) => (s += `<text x="${labelW + i * c + c / 2}" y="${H - 8}" text-anchor="middle" font-family="Helvetica" font-size="14" fill="#4B4453">${id}</text>`));
fs.writeFileSync(out, new Resvg(s + '</svg>', { font: { loadSystemFonts: true } }).render().asPng());
console.log('wrote', out);

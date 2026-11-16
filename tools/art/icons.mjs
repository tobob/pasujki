#!/usr/bin/env node
/**
 * Generates the app icon family as SVG (tools/art/icons/*.svg) and rasterises them to
 * assets/images/*.png with resvg. Run: NODE_PATH=<dir with @resvg/resvg-js> node tools/art/icons.mjs
 */
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(path.join(process.env.NODE_PATH ?? '.', 'x.js'));
const { Resvg } = require('@resvg/resvg-js');
const here = path.dirname(fileURLToPath(import.meta.url));
const assets = path.resolve(here, '../../assets/images');
const svgDir = path.join(here, 'icons');
fs.mkdirSync(svgDir, { recursive: true });

const OUT = '#4B4453';
const CREAM = '#FFF8EC';
const Q = ['#FAD6D1', '#CFE6F7', '#D3EDD0', '#FDE6B4']; // UI.quadrant, one step deeper so it holds up small
const QD = ['#F3B3AB', '#A9D0EE', '#ADDBA8', '#F6D08A']; // slightly deeper motif tones
const PINK = '#F29BB8';
const RED = '#E5534B';

const HEART = 'M50 80 C34 70 18 58 18 41 C18 30 26 23 35 23 C42 23 47 27 50 33 C53 27 58 23 65 23 C74 23 82 30 82 41 C82 58 66 70 50 80 Z';

/** Heart character centred at 50,50 in a 100 box. */
function heart({ mono = false } = {}) {
  if (mono)
    return `<path d="${HEART}" fill="#000"/>`;
  return `
  <path d="${HEART}" fill="${PINK}" stroke="${OUT}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M27 40 C27 34 31 30 36 29.5" fill="none" stroke="#F8C6D7" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="34.5" cy="52" rx="4.2" ry="2.8" fill="${RED}" opacity="0.35"/>
  <ellipse cx="65.5" cy="52" rx="4.2" ry="2.8" fill="${RED}" opacity="0.35"/>
  <circle cx="41" cy="45" r="3.6" fill="${OUT}"/><circle cx="59" cy="45" r="3.6" fill="${OUT}"/>
  <circle cx="42.2" cy="43.8" r="1.2" fill="#fff"/><circle cx="60.2" cy="43.8" r="1.2" fill="#fff"/>
  <path d="M45 53 Q50 58 55 53" fill="none" stroke="${OUT}" stroke-width="3" stroke-linecap="round"/>`;
}

/** Four soft quadrant tiles filling box (x,y,s) with a gap, each holding a tiny calm motif. */
function quadrants(x, y, s, { gap = 3, r = 9, motifs = true } = {}) {
  const h = (s - gap) / 2;
  const cells = [
    [x, y], [x + h + gap, y], [x, y + h + gap], [x + h + gap, y + h + gap],
  ];
  let o = '';
  cells.forEach(([cx, cy], i) => {
    o += `<rect x="${cx}" y="${cy}" width="${h}" height="${h}" rx="${r}" fill="${Q[i]}"/>`;
  });
  if (motifs) {
    // tiny shapes tucked into the outer corners (circle, star, triangle, square) — low contrast
    const m = s * 0.075;
    const c = (i, dx, dy) => [cells[i][0] + (dx ? h - h * 0.3 : h * 0.3), cells[i][1] + (dy ? h - h * 0.3 : h * 0.3)];
    const [a1, a2] = c(0, 0, 0);
    o += `<circle cx="${a1}" cy="${a2}" r="${m}" fill="${QD[0]}"/>`;
    const [b1, b2] = c(1, 1, 0);
    const star = Array.from({ length: 10 }, (_, k) => {
      const ang = -Math.PI / 2 + (k * Math.PI) / 5;
      const rad = k % 2 ? m * 0.55 : m * 1.25;
      return `${(b1 + Math.cos(ang) * rad).toFixed(2)},${(b2 + Math.sin(ang) * rad).toFixed(2)}`;
    }).join(' ');
    o += `<polygon points="${star}" fill="${QD[1]}" stroke="${QD[1]}" stroke-width="${m * 0.3}" stroke-linejoin="round"/>`;
    const [c1, c2] = c(2, 0, 1);
    o += `<polygon points="${c1},${c2 - m} ${c1 + m * 1.1},${c2 + m * 0.8} ${c1 - m * 1.1},${c2 + m * 0.8}" fill="${QD[2]}" stroke="${QD[2]}" stroke-width="${m * 0.4}" stroke-linejoin="round"/>`;
    const [d1, d2] = c(3, 1, 1);
    o += `<rect x="${d1 - m * 0.9}" y="${d2 - m * 0.9}" width="${m * 1.8}" height="${m * 1.8}" rx="${m * 0.35}" fill="${QD[3]}"/>`;
  }
  return o;
}

/** Centre: white disc with the heart character, scaled to `s` (diameter of disc). */
function centre(cx, cy, s) {
  const k = s / 100;
  const hs = s * 1.05; // heart artwork box (heart itself spans ~64% of it)
  return `<circle cx="${cx}" cy="${cy}" r="${s / 2}" fill="#FFFFFF" stroke="${OUT}" stroke-width="${2.2 * k * 100 / 46}" />
  <g transform="translate(${cx - hs / 2} ${cy - hs / 2 - s * 0.02}) scale(${hs / 100})">${heart()}</g>`;
}

const svg = (w, body, bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${w}" viewBox="0 0 100 100">${bg ? `<rect width="100" height="100" fill="${bg}"/>` : ''}${body}</svg>`;

const files = {
  // iOS: full bleed, opaque; system applies its own corner mask
  icon: [1024, svg(1024, quadrants(5, 5, 90, { gap: 3, r: 10 }) + centre(50, 50, 46), CREAM)],
  // splash: transparent, the rounded 4-tile badge only (shown on cream at 160pt)
  'splash-icon': [1024, svg(1024, quadrants(2, 2, 96, { gap: 3.5, r: 12 }) + centre(50, 50, 50))],
  // Android adaptive: background = quadrants full bleed; foreground = centre disc inside 66% safe zone
  'android-icon-background': [512, svg(512, quadrants(0, 0, 100, { gap: 3, r: 0, motifs: false }) +
    `<rect x="0" y="48.5" width="100" height="3" fill="${CREAM}"/><rect x="48.5" y="0" width="3" height="100" fill="${CREAM}"/>`, CREAM)],
  'android-icon-foreground': [512, svg(512, centre(50, 50, 44))],
  'android-icon-monochrome': [432, svg(432, `<g transform="translate(25 25) scale(0.5)">${heart({ mono: true })}</g>`)],
  favicon: [48, svg(48, quadrants(2, 2, 96, { gap: 4, r: 14, motifs: false }) +
    `<g transform="translate(18 18) scale(0.64)">${heart()}</g>`)],
};

for (const [name, [w, s]] of Object.entries(files)) {
  fs.writeFileSync(path.join(svgDir, `${name}.svg`), s);
  const png = new Resvg(s, { fitTo: { mode: 'width', value: w } }).render().asPng();
  fs.writeFileSync(path.join(assets, `${name}.png`), png);
  // iOS rejects icons with an alpha channel: flatten opaque files to RGB with ImageMagick if present
  if (name === 'icon' || name === 'android-icon-background') {
    try {
      execFileSync('magick', [path.join(assets, `${name}.png`), '-background', CREAM, '-alpha', 'remove', '-alpha', 'off', 'PNG24:' + path.join(assets, `${name}.png`)]);
    } catch {
      console.warn('magick not found: flatten', name, 'manually');
    }
  }
  console.log('wrote', name, w);
}

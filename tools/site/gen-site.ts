/**
 * Generates the static support site (index = support/FAQ, privacy/ = policy) in all app languages.
 * Run: npx tsx tools/site/gen-site.ts <out-dir>
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { CONTACT, PRIVACY_BY_LANG } from '../../src/constants/privacy';
import { LOCALES } from '../../src/i18n/core';
import { type Lang, type Policy } from '../../src/i18n/types';
import { SUPPORT } from './support';

const out = process.argv[2];
if (!out) throw new Error('usage: gen-site.ts <out-dir>');

/** Site order: English first (store reviewers), then Polish, then the rest. */
const ORDER: Lang[] = ['en', 'pl', 'de', 'fr', 'it', 'es', 'pt', 'nl'];
const ISSUES = `https://${CONTACT}`;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const issuesLink = `<a href="${ISSUES}">${CONTACT}</a>`;
const linkify = (html: string) => html.replace(CONTACT, issuesLink);
const css = `body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#FFF8EC;color:#4B4453;max-width:720px;margin:0 auto;padding:24px 16px 64px;line-height:1.55}h1{font-size:28px}h2{font-size:21px;margin-top:36px}h3{font-size:17px;margin:18px 0 4px}a{color:#3D7BC4}.card{background:#fff;border-radius:20px;padding:4px 20px 16px;margin:18px 0}nav a{margin-right:16px}.langs a{margin-right:10px;white-space:nowrap}`;
const page = (title: string, body: string, root: string) =>
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>${css}</style></head><body><nav><a href="${root}">Pasujki</a><a href="${root}privacy/">Privacy</a></nav>${body}</body></html>`;
const langNav = () => `<p class="langs">${ORDER.map((l) => `<a href="#${l}">${esc(LOCALES[l].name)}</a>`).join(' ')}</p>`;

const policy = (p: Policy, lang: Lang) =>
  `<div class="card" id="${lang}" lang="${lang}"><h2>${esc(p.title)}</h2>${p.sections
    .map((s) => `${s.heading ? `<h3>${esc(s.heading)}</h3>` : ''}<p>${linkify(esc(s.body))}</p>`)
    .join('')}</div>`;

const support = (lang: Lang) => {
  const s = SUPPORT[lang];
  return `<div class="card" id="${lang}" lang="${lang}"><h2>${esc(s.title)}</h2><p>${esc(s.intro)}</p>
<h3>${esc(s.askTitle)}</h3><p>${esc(s.ask).replace('{link}', issuesLink)}</p>
<h3>${esc(s.faqTitle)}</h3>${s
    .faq(LOCALES[lang].strings)
    .map(([q, a]) => `<p><b>${esc(q)}</b> ${esc(a)}</p>`)
    .join('\n')}
<p><a href="privacy/#${lang}">${esc(s.privacy)}</a></p></div>`;
};

mkdirSync(`${out}/privacy`, { recursive: true });
writeFileSync(
  `${out}/privacy/index.html`,
  page('Pasujki — Privacy Policy', `<h1>Pasujki — Privacy Policy</h1>${langNav()}${ORDER.map((l) => policy(PRIVACY_BY_LANG[l], l)).join('')}`, '../'),
);
writeFileSync(`${out}/index.html`, page('Pasujki — Support', `<h1>Pasujki</h1>${langNav()}\n${ORDER.map(support).join('\n')}`, './'));
console.log('ok');

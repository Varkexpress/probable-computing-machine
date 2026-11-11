// Content pack format.
//
// A prompt is written as
//   { id, text, cat, emoji, a: `band1 | band2 | band3 | band4 | band5` }
// Bands are separated by "|" and run from the reflexive first answers (band 1)
// to genuine deep cuts (band 5). Inside a band, answers are separated by ";".
// An answer may list aliases with "=": the first name is the display name.
//   e.g.  `Egypt; Democratic Republic of the Congo=DRC=DR Congo | ...`
// The band sets the answer's prior weight: an estimate of how often players
// would give it before any real submission data exists.

import { norm, squash } from './normalize.js';

export const BAND_WEIGHTS = [40, 12, 4, 1, 0.25];

/** Parse one prompt's answer DSL into [{display, aliases:[norm...], band, weight}]. */
export function parseAnswers(src) {
  const bands = String(src).split('|');
  const out = [];
  bands.forEach((band, bi) => {
    for (const raw of band.split(';')) {
      const names = raw.split('=').map((x) => x.trim()).filter(Boolean);
      if (!names.length) continue;
      const aliases = [...new Set(names.flatMap((x) => [norm(x), squash(x)]).filter(Boolean))];
      out.push({
        display: names[0],
        aliases,
        band: Math.min(bi, BAND_WEIGHTS.length - 1) + 1,
        weight: BAND_WEIGHTS[Math.min(bi, BAND_WEIGHTS.length - 1)],
      });
    }
  });
  return out;
}

/** Parse a whole pack and report problems (duplicate aliases, missing fields). */
export function compilePack(prompts) {
  const errors = [];
  const ids = new Set();
  const compiled = prompts.map((p) => {
    if (!p.id || !p.text || !p.a) errors.push(`prompt missing id/text/a: ${JSON.stringify(p).slice(0, 80)}`);
    if (ids.has(p.id)) errors.push(`duplicate prompt id ${p.id}`);
    ids.add(p.id);
    const answers = parseAnswers(p.a);
    const seen = new Map();
    for (const a of answers) {
      for (const al of a.aliases) {
        if (seen.has(al) && seen.get(al) !== a.display) {
          errors.push(`${p.id}: alias "${al}" used by both "${seen.get(al)}" and "${a.display}"`);
        }
        seen.set(al, a.display);
      }
    }
    const bandCount = String(p.a).split('|').length;
    if (bandCount !== 5) errors.push(`${p.id}: expected 5 bands, found ${bandCount}`);
    if (answers.length < 15) errors.push(`${p.id}: only ${answers.length} answers`);
    return { id: p.id, text: p.text, cat: p.cat || 'General', emoji: p.emoji || '❓', answers };
  });
  return { prompts: compiled, errors };
}

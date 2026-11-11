// Deterministic daily schedule: every player worldwide gets the same 7 prompts for a calendar date.

export const EPOCH = '2026-11-01'; // puzzle #1

export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function shuffle(arr, rand) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const DAY = 86400000;
export function dayIndex(date) {
  return Math.round((Date.parse(date + 'T00:00:00Z') - Date.parse(EPOCH + 'T00:00:00Z')) / DAY);
}
export function puzzleNumber(date) {
  return dayIndex(date) + 1;
}
export function localDate(d = new Date()) {
  const z = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
}
export function isValidDate(s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s + 'T00:00:00Z'));
}

/**
 * Prompts for a date. The bank is walked in seeded "cycles": each cycle is a shuffle of every
 * prompt, so the whole bank rotates before prompts come back, and a day avoids repeating a category.
 */
export function dailyPromptIds(date, prompts, count = 7) {
  const ids = prompts.map((p) => p.id).sort();
  const cat = Object.fromEntries(prompts.map((p) => [p.id, p.cat]));
  const n = ids.length;
  const idx = Math.max(0, dayIndex(date));
  const start = idx * count;
  const out = [];
  const cycleCache = new Map();
  const cycle = (k) => {
    if (!cycleCache.has(k)) cycleCache.set(k, shuffle(ids, mulberry32(hashString('deepcut-cycle-' + k))));
    return cycleCache.get(k);
  };
  let pos = start;
  const pool = [];
  while (pool.length < count * 3) {
    pool.push(cycle(Math.floor(pos / n))[pos % n]);
    pos++;
  }
  // Prefer category variety, while keeping the cycle order.
  for (const id of pool) {
    if (out.length === count) break;
    if (!out.includes(id) && !out.some((o) => cat[o] === cat[id])) out.push(id);
  }
  for (const id of pool) {
    if (out.length === count) break;
    if (!out.includes(id)) out.push(id);
  }
  return out;
}

/** Random prompt ids for Endless mode / duels, seeded so they are reproducible. */
export function seededPromptIds(seed, prompts, count, exclude = []) {
  const ids = prompts.map((p) => p.id).filter((id) => !exclude.includes(id)).sort();
  return shuffle(ids, mulberry32(hashString(String(seed)))).slice(0, count);
}

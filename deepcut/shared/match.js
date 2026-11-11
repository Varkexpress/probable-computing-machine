// Answer matching: exact alias -> singular/squashed forms -> bounded fuzzy match.
import { norm, squash, singulars } from './normalize.js';

/** Optimal-string-alignment distance (Levenshtein + adjacent transpositions), with early exit. */
export function editDistance(a, b, max = Infinity) {
  if (a === b) return 0;
  const la = a.length, lb = b.length;
  if (Math.abs(la - lb) > max) return max + 1;
  let prev2 = null, prev = Array.from({ length: lb + 1 }, (_, j) => j);
  for (let i = 1; i <= la; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (prev2 && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
      cur[j] = v;
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    prev2 = prev; prev = cur;
  }
  return prev[lb];
}

/** How many typos we forgive for a word of this length. Short words must be exact. */
export function tolerance(len) {
  if (len <= 4) return 0;
  if (len <= 7) return 1;
  if (len <= 12) return 2;
  return 3;
}

/**
 * Build a lookup index for one prompt.
 * answers: [{ id, display, aliases: [normalized strings] }]
 */
export function buildIndex(answers) {
  const exact = new Map();
  const list = [];
  for (const a of answers) {
    for (const al of a.aliases) {
      if (!exact.has(al)) exact.set(al, a);
      list.push([al, a]);
    }
  }
  return { exact, list };
}

/**
 * Match raw player input against an index.
 * Returns { answer, how: 'exact'|'plural'|'fuzzy', distance } or null.
 */
export function matchAnswer(index, raw) {
  const n = norm(raw);
  if (!n || n.length > 60) return null;
  const s = n.replace(/ /g, '');
  const tries = new Set([n, s, ...singulars(n), ...singulars(n).map((x) => x.replace(/ /g, ''))]);
  for (const t of tries) {
    const hit = index.exact.get(t);
    if (hit) return { answer: hit, how: t === n || t === s ? 'exact' : 'plural', distance: 0 };
  }
  // Fuzzy: compare spaceless forms, keep the best unique candidate.
  const tol = tolerance(s.length);
  if (!tol) return null;
  let best = null, bestD = tol + 1, tie = false;
  for (const [al, a] of index.list) {
    const alS = al.replace(/ /g, '');
    if (Math.abs(alS.length - s.length) > tol) continue;
    const d = editDistance(s, alS, Math.min(tol, tolerance(alS.length)));
    if (d < bestD) { bestD = d; best = a; tie = false; }
    else if (d === bestD && best && a !== best) tie = true;
  }
  // Ambiguous typo (two different answers equally close) is rejected rather than guessed.
  if (!best || tie || bestD > tol) return null;
  return { answer: best, how: 'fuzzy', distance: bestD };
}

export { norm, squash };

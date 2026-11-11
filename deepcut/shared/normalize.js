// Text normalization shared by the server, the offline engine and the content tools.
// Everything that compares answers goes through norm() first.

const LEADING = /^(the|a|an)\s+/;

/** Lowercase, strip accents and punctuation, collapse whitespace, drop a leading article. */
export function norm(s) {
  return String(s ?? '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\+\+/g, ' plus plus ')          // C++ -> c plus plus
    .replace(/([a-z])#/g, '$1 sharp ')        // C#, F# -> c sharp
    .replace(/['’`]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(LEADING, '')
    .trim();
}

/** Same as norm() but with all spaces removed: "sea horse" == "seahorse". */
export function squash(s) {
  return norm(s).replace(/ /g, '');
}

/** Candidate singular forms of the last word, so "bananas" and "cherries" match "banana", "cherry". */
export function singulars(n) {
  const out = new Set([n]);
  const m = /^(.*?)([a-z0-9]+)$/.exec(n);
  if (!m) return [...out];
  const [, head, w] = m;
  const add = (x) => x.length > 1 && out.add(head + x);
  if (w.endsWith('ies') && w.length > 4) add(w.slice(0, -3) + 'y');
  if (w.endsWith('ves') && w.length > 4) { add(w.slice(0, -3) + 'f'); add(w.slice(0, -3) + 'fe'); }
  if (/(ch|sh|ss|x|z|o)es$/.test(w)) add(w.slice(0, -2));
  if (w.endsWith('s') && !w.endsWith('ss') && w.length > 3) add(w.slice(0, -1));
  if (w.endsWith('i') && w.length > 4) add(w.slice(0, -1) + 'us'); // cacti -> cactus
  return [...out];
}

// Rarity scoring, tiers, depth layers and share text. Pure functions, used on server and client.

/** Pseudo-submissions the prior is worth. Higher = real data takes longer to override the seed bands. */
export const PRIOR_STRENGTH = 150;
/** Prior weight given to a valid answer that was not in the seed list (found by the LLM or a moderator). */
export const DISCOVERED_WEIGHT = 0.1;
export const ROUND_SECONDS = 25;
export const ROUNDS = 7;
export const MAX_POINTS = 1000;

/**
 * Estimated share of players who give this answer.
 *   prior  = this answer's seed weight / sum of seed weights for the prompt
 *   p      = (count + PRIOR_STRENGTH * prior) / (total + PRIOR_STRENGTH)
 * With no data p equals the prior; with lots of data p converges to the observed share.
 */
export function rarityShare({ count = 0, total = 0, weight, weightSum }) {
  const prior = weight / Math.max(weightSum, 1e-9);
  return (count + PRIOR_STRENGTH * prior) / (total + PRIOR_STRENGTH);
}

/**
 * Points for an answer with estimated share p.
 * Log scale: an answer one in 5 people give is worth ~5, one in 1,000 is worth ~500,
 * one in 10,000 or rarer hits the 1,000 cap.
 */
export function pointsFor(p) {
  const bits = Math.log10(1 / Math.max(p, 1e-9));
  const x = Math.min(1, Math.max(0, (bits - 0.7) / 3.3));
  return Math.max(5, Math.round(MAX_POINTS * Math.pow(x, 1.6)));
}

export const TIERS = [
  { key: 'legendary', name: 'Legendary', blurb: '1-in-a-million', emoji: '🟨', max: 0.0005 },
  { key: 'epic', name: 'Epic', blurb: 'Deep cut', emoji: '🟪', max: 0.0025 },
  { key: 'rare', name: 'Rare', blurb: 'Off the beaten path', emoji: '🟦', max: 0.01 },
  { key: 'uncommon', name: 'Uncommon', blurb: 'Nice one', emoji: '🟩', max: 0.03 },
  { key: 'common', name: 'Common', blurb: 'Crowd favorite', emoji: '⬜', max: Infinity },
];
export const MISS = { key: 'miss', name: 'Miss', blurb: 'No valid answer', emoji: '⬛' };
export const VOID = { key: 'void', name: 'Voided', blurb: 'Left the tab mid-round', emoji: '🚫' };

export function tierFor(p) {
  return TIERS.find((t) => p <= t.max) || TIERS[TIERS.length - 1];
}

export function tierByKey(key) {
  return TIERS.find((t) => t.key === key) || (key === 'void' ? VOID : MISS);
}

/** Score one accepted answer. */
export function scoreAnswer(stats) {
  const p = rarityShare(stats);
  const tier = tierFor(p);
  return { share: p, points: pointsFor(p), tier: tier.key };
}

// --- Depth metaphor: 1 point = 1 km dug. Real Earth layer boundaries. ---
export const LAYERS = [
  { key: 'crust', name: 'Crust', top: 0, color: '#8a6a4a' },
  { key: 'upper-mantle', name: 'Upper Mantle', top: 35, color: '#a8522e' },
  { key: 'lower-mantle', name: 'Lower Mantle', top: 670, color: '#c2421f' },
  { key: 'outer-core', name: 'Outer Core', top: 2890, color: '#e8771c' },
  { key: 'inner-core', name: 'Inner Core', top: 5150, color: '#ffc93c' },
  { key: 'through', name: 'Out the Other Side', top: 6371, color: '#7fd1ff' },
];
export const EARTH_CENTER_KM = 6371;

export const LANDMARKS = [
  { km: 4, label: 'Deepest mine' },
  { km: 12, label: 'Kola Superdeep Borehole' },
  { km: 35, label: 'Moho boundary' },
  { km: 410, label: 'Olivine turns to wadsleyite' },
  { km: 670, label: 'Lower mantle' },
  { km: 2890, label: 'Core-mantle boundary' },
  { km: 5150, label: 'Solid iron inner core' },
  { km: 6371, label: 'Center of the Earth' },
];

export function layerAt(km) {
  let cur = LAYERS[0];
  for (const l of LAYERS) if (km >= l.top) cur = l;
  return cur;
}

/** Piecewise visual scale so the thin crust is still visible on the track. Returns 0..1. */
export function depthToTrack(km) {
  const stops = [[0, 0], [35, 0.12], [670, 0.35], [2890, 0.62], [5150, 0.85], [6371, 0.97], [7000, 1]];
  const k = Math.max(0, Math.min(km, 7000));
  for (let i = 1; i < stops.length; i++) {
    const [k0, t0] = stops[i - 1], [k1, t1] = stops[i];
    if (k <= k1) return t0 + ((k - k0) / (k1 - k0)) * (t1 - t0);
  }
  return 1;
}

/** Offline percentile estimate (log-normal around a typical score) when no server data exists. */
export function estimatePercentile(total, { median = 900, sigma = 0.65 } = {}) {
  if (total <= 0) return 1;
  const z = Math.log(total / median) / sigma;
  // Abramowitz-Stegun normal CDF approximation
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  let cdf = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (z > 0) cdf = 1 - cdf;
  return Math.round(cdf * 100);
}

export function formatKm(km) {
  return `${Math.round(km).toLocaleString('en-US')} km`;
}

/**
 * Spoiler-free share text.
 * rounds: [{ tier }], meta: { puzzleNo, total, percentile, mode, url, streak, duel }
 */
export function shareText(rounds, meta) {
  const grid = rounds.map((r) => tierByKey(r.tier).emoji).join('');
  const layer = layerAt(meta.total);
  const title = meta.mode === 'duel' ? `⛏️ Deep Cut Duel` : meta.mode === 'endless' ? `⛏️ Deep Cut Endless` : `⛏️ Deep Cut #${meta.puzzleNo}`;
  const lines = [
    title,
    `${grid}`,
    `${formatKm(meta.total)} down · ${layer.name}`,
  ];
  if (meta.percentile != null) lines.push(`Deeper than ${meta.percentile}% of diggers`);
  if (meta.duel) lines.push(meta.duel);
  if (meta.streak > 1) lines.push(`🔥 ${meta.streak}-day streak`);
  if (meta.url) lines.push(meta.url);
  return lines.join('\n');
}

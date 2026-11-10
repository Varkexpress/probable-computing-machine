// Mint Blockwise license keys. Run on your own machine or server, never in the browser.
//   node tools/mint-blockwise-key.mjs <salt> [pro|team|lifetime] [count]
// The salt must match CONFIG.licenseSalt in blockwise.html.
const [salt, tier = 'pro', count = '1'] = process.argv.slice(2);
if (!salt) { console.error('usage: node tools/mint-blockwise-key.mjs <salt> [pro|team|lifetime] [count]'); process.exit(1); }
const B32 = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const hash32 = s => { let h = 0x811c9dc5; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 0x01000193) >>> 0; } return h >>> 0; };
const enc = (n, len) => { let s = ''; for (let i = 0; i < len; i++) { s += B32[n % 32]; n = Math.floor(n / 32); } return s; };
const rand = len => Array.from({ length: len }, () => B32[Math.floor(Math.random() * 32)]).join('');
for (let i = 0; i < +count; i++) {
  const a = ({ lifetime: 'L', team: 'T' }[tier] || 'P') + rand(3);
  const b = rand(4);
  console.log(`BW-${a}-${b}-${enc(hash32(a + b + salt), 4)}`);
}

// Tiny synthesized sound kit (WebAudio, no files to download).
let ctx = null;
let muted = false;
try { muted = localStorage.getItem('dc_mute') === '1'; } catch { /* ignore */ }

export const isMuted = () => muted;
export function setMuted(m) {
  muted = m;
  try { localStorage.setItem('dc_mute', m ? '1' : '0'); } catch { /* ignore */ }
}

function ac() {
  if (!ctx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    ctx = new C();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, { at = 0, dur = 0.12, type = 'sine', vol = 0.18, slide = 0 } = {}) {
  if (muted) return;
  const a = ac();
  if (!a) return;
  const t = a.currentTime + at;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(a.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function noise({ at = 0, dur = 0.18, vol = 0.25, freq = 900 } = {}) {
  if (muted) return;
  const a = ac();
  if (!a) return;
  const t = a.currentTime + at;
  const buf = a.createBuffer(1, Math.floor(a.sampleRate * dur), a.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const src = a.createBufferSource();
  const f = a.createBiquadFilter();
  const g = a.createGain();
  f.type = 'lowpass';
  f.frequency.value = freq;
  g.gain.value = vol;
  src.buffer = buf;
  src.connect(f).connect(g).connect(a.destination);
  src.start(t);
}

const SCALE = { common: [330], uncommon: [392, 523], rare: [392, 523, 659], epic: [392, 523, 659, 784], legendary: [523, 659, 784, 1047, 1319] };

export const sfx = {
  unlock() { ac(); },
  click() { tone(660, { dur: 0.05, type: 'triangle', vol: 0.08 }); },
  key() { tone(1200 + Math.random() * 300, { dur: 0.02, type: 'square', vol: 0.015 }); },
  tick(urgent) { tone(urgent ? 1046 : 880, { dur: 0.05, type: 'square', vol: urgent ? 0.06 : 0.035 }); },
  wrong() { tone(220, { dur: 0.16, type: 'sawtooth', vol: 0.08, slide: -80 }); },
  miss() { tone(196, { dur: 0.35, type: 'sawtooth', vol: 0.1, slide: -120 }); noise({ dur: 0.3, vol: 0.12, freq: 400 }); },
  dig() { noise({ dur: 0.22, vol: 0.3, freq: 700 }); tone(90, { dur: 0.2, type: 'sine', vol: 0.25, slide: -40 }); },
  tier(key) {
    const notes = SCALE[key] || SCALE.common;
    notes.forEach((f, i) => tone(f, { at: 0.08 + i * 0.09, dur: 0.22, type: key === 'legendary' ? 'triangle' : 'sine', vol: 0.14 }));
    if (key === 'legendary') notes.forEach((f, i) => tone(f * 2, { at: 0.5 + i * 0.06, dur: 0.3, type: 'sine', vol: 0.06 }));
  },
  fanfare() { [523, 659, 784, 1047].forEach((f, i) => tone(f, { at: i * 0.12, dur: 0.3, type: 'triangle', vol: 0.12 })); },
};

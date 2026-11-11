// Deep Cut client. Vanilla JS, no build step: the whole app is ~40 KB before gzip.
import { connect, LS } from './api.js';
import { sfx, isMuted, setMuted } from './sound.js';
import {
  ROUND_SECONDS, ROUNDS, TIERS, MISS, VOID, tierByKey, LAYERS, LANDMARKS, layerAt, depthToTrack, formatKm, shareText,
} from './shared/scoring.js';
import { localDate, puzzleNumber } from './shared/daily.js';

const $ = (s, el = document) => el.querySelector(s);
const app = $('#app');
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let api;
const S = {
  view: 'home', game: null, round: null, results: null, depth: 0,
  timer: null, busy: false, blurCount: 0, flags: new Set(), pendingDuel: null,
};

// ------------------------------------------------------------------ profile (guest, localStorage)
const blankProfile = () => ({ v: 1, streak: 0, maxStreak: 0, lastDaily: null, endlessBest: 0, duels: { w: 0, l: 0, t: 0 }, tiers: {}, history: {}, syncCode: null, updatedAt: 0 });
let profile = { ...blankProfile(), ...LS.get('dc_profile', {}) };
const saveProfile = () => { profile.updatedAt = Date.now(); LS.set('dc_profile', profile); pushSync(); };

function dayShift(date, n) {
  const d = new Date(date + 'T12:00:00');
  d.setDate(d.getDate() + n);
  return localDate(d);
}

function recomputeStreak(p) {
  const days = Object.keys(p.history).sort();
  let best = 0, run = 0, prev = null;
  for (const d of days) {
    run = prev && dayShift(prev, 1) === d ? run + 1 : 1;
    best = Math.max(best, run);
    prev = d;
  }
  const today = localDate();
  p.lastDaily = prev;
  p.streak = prev === today || prev === dayShift(today, -1) ? run : 0;
  p.maxStreak = Math.max(p.maxStreak || 0, best);
}

function recordDaily(res) {
  const g = res.game;
  if (profile.history[g.date]) return;
  profile.history[g.date] = { n: g.puzzleNo, total: g.total, tiers: res.rounds.map((r) => r.tier || 'miss'), pct: res.percentile };
  for (const r of res.rounds) profile.tiers[r.tier || 'miss'] = (profile.tiers[r.tier || 'miss'] || 0) + 1;
  recomputeStreak(profile);
  saveProfile();
}

function mergeProfiles(a, b) {
  const m = blankProfile();
  m.history = { ...b.history, ...a.history };
  m.endlessBest = Math.max(a.endlessBest || 0, b.endlessBest || 0);
  m.maxStreak = Math.max(a.maxStreak || 0, b.maxStreak || 0);
  for (const k of ['w', 'l', 't']) m.duels[k] = Math.max(a.duels?.[k] || 0, b.duels?.[k] || 0);
  for (const k of new Set([...Object.keys(a.tiers || {}), ...Object.keys(b.tiers || {})])) m.tiers[k] = Math.max(a.tiers?.[k] || 0, b.tiers?.[k] || 0);
  m.syncCode = a.syncCode || b.syncCode;
  recomputeStreak(m);
  return m;
}

let syncTimer = null;
function pushSync() {
  if (!profile.syncCode || !api || api.mode !== 'server') return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => api.saveAccount(profile.syncCode, profile).catch(() => {}), 800);
}

// ------------------------------------------------------------------ UI helpers
function toast(msg, warn = false, ms = 2200) {
  const t = $('#toast');
  t.textContent = msg;
  t.className = 'on' + (warn ? ' warn' : '');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => (t.className = ''), ms);
}

function render(html, view) {
  S.view = view;
  app.innerHTML = `<section class="screen">${html}</section>`;
  window.scrollTo({ top: 0 });
}

function burst(el, color, n = 26) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + 40;
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i');
    p.className = 'burst';
    p.style.cssText = `left:${cx}px;top:${cy}px;background:${color}`;
    document.body.appendChild(p);
    const a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 140;
    p.animate([
      { transform: 'translate(0,0) rotate(0)', opacity: 1 },
      { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d + 80}px) rotate(${Math.random() * 720}deg)`, opacity: 0 },
    ], { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => p.remove();
  }
}

const TIER_COLOR = { common: '#a99f91', uncommon: '#4cc38a', rare: '#4ea1ff', epic: '#b16cff', legendary: '#ffd23f' };

// ------------------------------------------------------------------ the shaft (score as depth)
function buildShaft() {
  const layers = $('#shaft .layers');
  const html = [];
  LAYERS.forEach((l, i) => {
    const top = depthToTrack(l.top) * 100;
    const next = LAYERS[i + 1];
    const bottom = next ? depthToTrack(next.top) * 100 : 100;
    html.push(`<div class="layer" style="top:${top}%;height:${bottom - top}%;background:linear-gradient(${l.color}, ${next ? next.color : l.color})"><span>${l.name}</span></div>`);
  });
  html.push('<div class="dug"></div>');
  layers.innerHTML = html.join('');
  $('#shaft .marks').innerHTML = LANDMARKS.map((m) => `<div title="${esc(m.label)}" style="top:${depthToTrack(m.km) * 100}%"></div>`).join('');
  setDepth(0, false);
}

function setDepth(km, animate = true) {
  S.depth = km;
  const h = $('#shaft').clientHeight;
  const y = Math.max(0, depthToTrack(km) * h - 34);
  const drill = $('#driller');
  drill.style.transition = animate ? '' : 'none';
  drill.style.transform = `translateY(${y}px)`;
  const dug = $('#shaft .dug');
  dug.style.height = '1px';
  dug.style.transform = `scaleY(${Math.max(1, y + 20)})`;
  if (animate && km > 0) {
    drill.classList.add('spin');
    setTimeout(() => drill.classList.remove('spin'), 1100);
  }
}
window.addEventListener('resize', () => setDepth(S.depth, false));

// ------------------------------------------------------------------ home
function nextPuzzleIn() {
  const now = new Date();
  const mid = new Date(now);
  mid.setHours(24, 0, 0, 0);
  const s = Math.floor((mid - now) / 1000);
  return `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
let clockTimer = null;
function startClock() {
  clearInterval(clockTimer);
  clockTimer = setInterval(() => { const el = $('#nextIn'); if (el) el.textContent = nextPuzzleIn(); else clearInterval(clockTimer); }, 1000);
}

function legendHTML() {
  return `<div class="legend">${[...TIERS].reverse().map((t) => `<div class="t-${t.key}"><i></i>${t.name}</div>`).join('')}</div>`;
}

function home() {
  stopTimer();
  setDepth(0);
  const today = localDate();
  const done = profile.history[today];
  const n = puzzleNumber(today);
  const daily = done
    ? `<div class="card stack">
         <div class="row"><span class="pill">#${n} complete</span>${profile.streak > 0 ? `<span class="pill streak">🔥 ${profile.streak}-day streak</span>` : ''}</div>
         <div class="grid-emoji">${done.tiers.map((t) => tierByKey(t).emoji).join('')}</div>
         <div><b>${formatKm(done.total)}</b> <span class="muted">· ${layerAt(done.total).name}${done.pct != null ? ` · deeper than ${done.pct}%` : ''}</span></div>
         <button class="btn primary" data-act="todayResults">See today's results &amp; share</button>
         <div class="next-in">Next dig in <b id="nextIn">${nextPuzzleIn()}</b></div>
       </div>`
    : `<div class="btns">
         <button class="btn primary" data-act="daily" autofocus>Start today's dig <small>#${n}</small></button>
       </div>
       <div class="row" style="margin-top:10px;gap:6px;flex-wrap:wrap">
         <span class="pill">7 prompts</span><span class="pill">${ROUND_SECONDS}s each</span><span class="pill">same for everyone</span>
         ${profile.streak > 0 ? `<span class="pill streak">🔥 ${profile.streak}-day streak</span>` : ''}
       </div>`;
  render(`
    <h1>Obvious answers barely<br>scratch the <em>surface.</em></h1>
    <p class="lede">Name things nobody else will. Every rare-but-right answer digs you deeper toward the Earth's core.</p>
    ${daily}
    <h2>More ways to dig</h2>
    <div class="btns two">
      <button class="btn" data-act="endless">♾️ Endless <small>${profile.endlessBest ? 'best ' + formatKm(profile.endlessBest) : '3 lives'}</small></button>
      <button class="btn" data-act="duelNew">⚔️ Duel a friend <small>same 7 prompts</small></button>
    </div>
    <h2>How scoring works</h2>
    <div class="card small">
      <p style="margin-top:0">Each answer is ranked by how many players gave it. 1 point = 1 km of depth.</p>
      ${legendHTML()}
      <p class="muted" style="margin-bottom:0">“Name a fruit” → <b>Apple</b> ≈ 5 km. <b>Rambutan</b> ≈ 400 km. <b>Salak</b> ≈ 700 km.
      Typos are forgiven. Leaving the tab mid-round voids it.</p>
    </div>
    ${api.mode === 'offline' ? '<p class="muted small">Playing offline: scores are ranked against built-in estimates instead of live players.</p>' : ''}
  `, 'home');
  if (done) startClock();
}

// ------------------------------------------------------------------ game flow
async function startMode(mode, extra = {}) {
  sfx.unlock();
  try {
    const game = await api.startGame({ mode, date: localDate(), ...extra });
    S.game = game;
    S.blurCount = 0;
    if (game.finished) return showResults();
    const total = game.rounds.reduce((s, r) => s + (r.points || 0), 0);
    setDepth(total, false);
    const open = game.rounds.find((r) => r.status === 'active');
    if (open) return beginRound(open.idx); // resume (timer keeps running server-side)
    readyScreen(game.rounds.length);
  } catch (e) {
    toast(e.message || 'Could not start', true, 3500);
    home();
  }
}

function hudHTML(idx) {
  const g = S.game;
  const total = g.rounds.reduce((s, r) => s + (r.points || 0), 0);
  const dots = g.mode === 'endless'
    ? `<span class="pill">Round ${idx + 1}</span> <span class="lives" aria-label="${g.lives} lives">${'♥'.repeat(g.lives)}${'♡'.repeat(3 - g.lives)}</span>`
    : `<div class="dots">${Array.from({ length: ROUNDS }, (_, i) => {
      const r = g.rounds[i];
      return `<i class="${r && r.status === 'done' ? 't-' + r.tier : ''} ${i === idx ? 'cur' : ''}"></i>`;
    }).join('')}</div>`;
  return `<div class="hud">${dots}<div class="depth">${formatKm(total)}<small>${layerAt(total).name}</small></div></div>`;
}

function readyScreen(idx) {
  const g = S.game;
  const label = g.mode === 'endless' ? `Round ${idx + 1}` : `Prompt ${idx + 1} of ${ROUNDS}`;
  const tip = idx === 0
    ? `<p class="muted">You'll have ${ROUND_SECONDS} seconds. Wrong guesses are free, so keep typing. Skip the obvious.</p>`
    : `<p class="muted">${['Think sideways.', 'The crowd zigs. You zag.', 'Deep cuts only.', 'What would a specialist say?', 'Obscure but correct wins.', 'Last chance to go deep.'][Math.min(idx - 1, 5)]}</p>`;
  render(`${hudHTML(idx)}
    <div class="card ready">
      <div class="muted small" style="letter-spacing:.14em;text-transform:uppercase;font-weight:800">${label}</div>
      <div class="big">${g.mode === 'duel' ? '⚔️' : '⛏'}</div>
      ${tip}
      <button class="btn primary" data-act="reveal" data-idx="${idx}" autofocus>Reveal prompt <small>Enter</small></button>
    </div>`, 'ready');
  $('[data-act="reveal"]').focus();
}

async function beginRound(idx) {
  if (S.busy) return;
  S.busy = true;
  try {
    const r = await api.startRound(S.game.id, idx);
    S.game = r.game;
    S.round = { idx, prompt: r.prompt, endAt: performance.now() + r.remainingMs, wrong: r.round.wrong || [], done: false };
    S.flags = new Set();
    if (r.round.status === 'done') return showRoundResult(r.round);
    roundScreen();
    sfx.click();
    startTimer();
  } catch (e) {
    if (e.code === 'over') return showResults();
    toast(e.message, true);
  } finally {
    S.busy = false;
  }
}

function roundScreen() {
  const { idx, prompt, wrong } = S.round;
  render(`${hudHTML(idx)}
    <div class="card prompt-card">
      <span class="emoji" aria-hidden="true">${esc(prompt.emoji)}</span>
      <div class="cat">${esc(prompt.cat)}</div>
      <p class="q">${esc(prompt.text)}</p>
    </div>
    <div class="timer" id="timer"><div></div></div>
    <div class="timer-row" id="timerRow"><span>Rarer = deeper</span><b id="secs">${ROUND_SECONDS}</b></div>
    <form class="answer-form" id="answerForm" autocomplete="off">
      <input id="answer" name="answer" type="text" inputmode="text" enterkeyhint="go" maxlength="60"
        autocomplete="off" autocorrect="off" autocapitalize="words" spellcheck="false" placeholder="Your rarest answer…" aria-label="Your answer">
      <button class="btn primary" type="submit">Dig</button>
    </form>
    <div class="wrongs" id="wrongs">${wrong.map((w) => `<span>${esc(w)}</span>`).join('')}</div>
    <div class="hint">Not recognized? Try another — only a valid answer ends the round.</div>
  `, 'round');
  const input = $('#answer');
  input.focus();
  input.addEventListener('paste', (e) => { e.preventDefault(); toast('Pasting is disabled during a round', true); });
  input.addEventListener('drop', (e) => e.preventDefault());
  input.addEventListener('beforeinput', (e) => {
    if (e.inputType === 'insertFromPaste' || e.inputType === 'insertFromDrop' || e.inputType === 'insertFromPasteAsQuotation') e.preventDefault();
  });
  input.addEventListener('keydown', (e) => { if (e.key.length === 1) sfx.key(); });
  $('#answerForm').addEventListener('submit', (e) => { e.preventDefault(); submitAnswer(); });
}

function startTimer() {
  stopTimer();
  let lastSec = null;
  const bar = $('#timer > div');
  const loop = () => {
    if (!S.round || S.round.done || S.view !== 'round') return;
    const left = Math.max(0, S.round.endAt - performance.now());
    const frac = left / (ROUND_SECONDS * 1000);
    bar.style.transform = `scaleX(${frac})`;
    const sec = Math.ceil(left / 1000);
    if (sec !== lastSec) {
      lastSec = sec;
      $('#secs').textContent = sec;
      const low = sec <= 5;
      $('#timer').classList.toggle('low', low);
      $('#timerRow').classList.toggle('low', low);
      if (low && sec > 0) sfx.tick(sec <= 3);
    }
    if (left <= 0) return timeUp();
    S.timer = requestAnimationFrame(loop);
  };
  S.timer = requestAnimationFrame(loop);
}
function stopTimer() { if (S.timer) cancelAnimationFrame(S.timer); S.timer = null; }

async function submitAnswer() {
  const input = $('#answer');
  const text = input.value.trim();
  if (!text || S.busy || !S.round || S.round.done) return;
  S.busy = true;
  try {
    const r = await api.submit(S.game.id, S.round.idx, text, [...S.flags]);
    if (r.done) {
      S.game = r.game;
      return finishRound(r.round);
    }
    sfx.wrong();
    S.round.wrong.push(text);
    $('#wrongs').insertAdjacentHTML('beforeend', `<span>${esc(text)}</span>`);
    const form = $('#answerForm');
    form.classList.remove('shake');
    void form.offsetWidth;
    form.classList.add('shake');
    input.value = '';
    input.focus();
  } catch (e) {
    toast(e.message, true);
  } finally {
    S.busy = false;
  }
}

async function timeUp() {
  if (!S.round || S.round.done) return;
  while (S.busy) await sleep(50); // let an in-flight submit land first
  if (S.round.done) return;
  S.busy = true;
  try {
    const r = await api.endRound(S.game.id, S.round.idx, 'timeout', [...S.flags]);
    S.game = r.game;
    finishRound(r.round);
  } catch (e) {
    toast(e.message, true);
  } finally {
    S.busy = false;
  }
}

async function voidRound() {
  if (!S.round || S.round.done) return;
  while (S.busy) await sleep(50);
  if (S.round.done) return;
  S.busy = true;
  try {
    const r = await api.endRound(S.game.id, S.round.idx, 'void', [...S.flags]);
    S.game = r.game;
    finishRound(r.round);
    toast('Round voided: you left the tab', true, 3500);
  } finally {
    S.busy = false;
  }
}

function finishRound(round) {
  S.round.done = true;
  stopTimer();
  showRoundResult(round);
}

function showRoundResult(round) {
  const g = S.game;
  const total = g.rounds.reduce((s, r) => s + (r.points || 0), 0);
  const tier = tierByKey(round.tier);
  const hit = round.tier && round.tier !== 'miss' && round.tier !== 'void';
  const odds = hit && round.share ? `About 1 in ${Math.max(2, Math.round(1 / round.share)).toLocaleString('en-US')} diggers give this answer` : '';
  const last = g.finished;
  const missLine = round.reason === 'void' ? 'Voided for leaving the tab' : round.reason === 'skip' ? 'Skipped' : 'Time ran out';
  render(`${hudHTML(round.idx)}
    <div class="card reveal t-${round.tier}" id="reveal">
      <div class="tier-name">${hit ? tier.name : tier === VOID ? 'Voided' : 'Miss'}</div>
      <div class="ans">${hit ? esc(round.display) : '—'}</div>
      <div class="pts">+${formatKm(round.points)}</div>
      <div class="odds">${hit ? esc(tier.blurb) + ' · ' + odds : missLine}</div>
    </div>
    <div class="btns" style="margin-top:14px">
      <button class="btn primary" data-act="${last ? 'results' : 'next'}" autofocus>${last ? 'See how deep you got' : 'Next prompt'} <small>Enter</small></button>
    </div>`, 'roundResult');
  $('[data-act]').focus();
  if (hit) {
    sfx.dig();
    setTimeout(() => sfx.tier(round.tier), 120);
    if (['rare', 'epic', 'legendary'].includes(round.tier)) burst($('#reveal'), TIER_COLOR[round.tier], round.tier === 'legendary' ? 60 : 28);
    if (navigator.vibrate && round.tier === 'legendary') navigator.vibrate([30, 40, 60]);
  } else {
    sfx.miss();
  }
  setDepth(total);
}

// ------------------------------------------------------------------ anti-cheat: leaving the tab
function onLeave() {
  if (S.view !== 'round' || !S.round || S.round.done) return;
  S.blurCount++;
  S.flags.add('blur');
  if (S.blurCount === 1) toast('No tab-switching! Next time the round is voided.', true, 3500);
  else voidRound();
}
document.addEventListener('visibilitychange', () => { if (document.hidden) onLeave(); });
let blurT = null;
window.addEventListener('blur', () => { clearTimeout(blurT); blurT = setTimeout(() => { if (!document.hasFocus()) onLeave(); }, 1500); });
window.addEventListener('focus', () => clearTimeout(blurT));

// ------------------------------------------------------------------ results
async function showResults() {
  stopTimer();
  render('<div class="boot">Measuring your shaft…</div>', 'loading');
  let res;
  try {
    res = await api.results(S.game.id);
  } catch (e) {
    toast(e.message, true);
    return home();
  }
  S.results = res;
  const g = res.game;
  if (g.mode === 'daily') recordDaily(res);
  if (g.mode === 'endless' && g.total > (profile.endlessBest || 0)) { profile.endlessBest = g.total; saveProfile(); }
  const matchup = res.duel?.matchups?.[0];
  if (g.mode === 'duel' && matchup && matchup.outcome !== 'waiting') {
    const key = 'duel:' + g.id;
    if (!profile[key]) { profile[key] = 1; profile.duels[{ win: 'w', loss: 'l', tie: 't' }[matchup.outcome]]++; saveProfile(); }
  }
  setDepth(g.total, false);
  sfx.fanfare();
  renderResults();
}

function shareFor(res) {
  const g = res.game;
  const m = res.duel?.matchups?.[0];
  let duelLine = null, url = location.origin + location.pathname;
  if (g.mode === 'duel') {
    url = api.duelLink(res);
    if (m && m.outcome !== 'waiting') duelLine = `${m.outcome === 'win' ? '🏆 Won' : m.outcome === 'loss' ? '💀 Lost' : '🤝 Tied'} ${m.mine.toLocaleString()}–${m.theirs.toLocaleString()} km`;
    else duelLine = `Beat ${formatKm(g.total)}. Match my answer and we both lose half.`;
  }
  return shareText(res.rounds, { puzzleNo: g.puzzleNo, total: g.total, percentile: res.percentile, mode: g.mode, url, streak: g.mode === 'daily' ? profile.streak : 0, duel: duelLine });
}

function revealHTML(rv) {
  const y = rv.yours;
  const pct = (x) => `<span class="pct">${x.pct}%</span>`;
  return `<div class="card rv">
    <div class="row"><span>${esc(rv.prompt.emoji)}</span><div class="q grow">${esc(rv.prompt.text)}</div></div>
    <dl>
      <dt>You</dt><dd>${y ? `<b>${esc(y.display)}</b> <span class="tier-chip t-${y.tier}">${tierByKey(y.tier).name}</span> +${y.points}` : '<span class="muted">no answer</span>'}</dd>
      <dt>Most common</dt><dd><b>${esc(rv.common.display)}</b> ${pct(rv.common)}</dd>
      ${rv.rarest ? `<dt>Rarest found</dt><dd><b>${esc(rv.rarest.display)}</b> ${pct(rv.rarest)}</dd>` : ''}
      ${rv.unclaimed ? `<dt>Nobody's said</dt><dd><b>${esc(rv.unclaimed)}</b> <span class="pct">of ${rv.answerCount} known answers</span></dd>` : ''}
      ${rv.funnyMiss ? `<dt>Top miss</dt><dd>“${esc(rv.funnyMiss.text)}” <span class="pct">×${rv.funnyMiss.count}</span></dd>` : ''}
    </dl>
  </div>`;
}

function duelHTML(res) {
  const d = res.duel;
  if (!d) return '';
  const link = api.duelLink(res);
  const m = d.matchups[0];
  const invite = `<div class="card stack">
      <b>${d.isCreator ? 'Now send the challenge' : 'Rematch?'}</b>
      <p class="muted small" style="margin:0">Your friend gets the same 7 prompts. Any round where you both typed the same answer, you both lose half of it.</p>
      <button class="btn primary" data-act="shareDuel">⚔️ Send duel link</button>
      <div class="share-box" style="margin:0;word-break:break-all">${esc(link)}</div>
    </div>`;
  if (!m || m.outcome === 'waiting') return `<h2>Duel</h2>${invite}<p class="muted small">Come back to this link to see the head-to-head once they've played.</p>`;
  const rows = m.rows.map((r) => {
    const rv = res.reveal[r.idx];
    return `<tr class="${r.clash ? 'clash' : ''}"><td>${esc(rv?.prompt.emoji || '')} ${esc(r.mine.display || '—')}${r.clash ? ' <b style="color:var(--bad)">½</b>' : ''}</td><td>${r.mine.points}</td><td>${r.theirs?.points ?? ''}</td><td>${esc(r.theirs?.display || '—')}</td></tr>`;
  }).join('');
  return `<h2>Duel</h2>
    <div class="card stack">
      <div class="vs"><div><div class="n">${m.mine.toLocaleString()}</div><span class="muted small">you</span></div>
        <div class="pill">${m.outcome === 'win' ? '🏆 You win' : m.outcome === 'loss' ? '💀 They win' : '🤝 Tie'}</div>
        <div><div class="n">${m.theirs.toLocaleString()}</div><span class="muted small">${d.isCreator ? 'challenger' : 'challenger who sent it'}</span></div></div>
      <table class="duel-table"><tbody>${rows}</tbody></table>
      <p class="muted small" style="margin:0">Red rows: you both said the same thing, so both lost half.</p>
    </div>
    ${d.isCreator && d.matchups.length > 1 ? `<p class="muted small">${d.matchups.length} friends have taken this duel.</p>` : ''}
    ${invite}`;
}

function renderResults() {
  const res = S.results;
  const g = res.game;
  const text = shareFor(res);
  const title = g.mode === 'daily' ? `Deep Cut #${g.puzzleNo}` : g.mode === 'endless' ? 'Endless run over' : 'Duel complete';
  render(`
    <div class="card score-hero">
      <div class="muted small" style="letter-spacing:.14em;text-transform:uppercase;font-weight:800">${esc(title)}</div>
      <div class="km" id="km">0 km</div>
      <div class="layer">${esc(res.layer)}${g.total >= 6371 ? ' — you dug through the planet!' : ''}</div>
      <div class="grid-emoji">${res.rounds.map((r) => tierByKey(r.tier).emoji).join('')}</div>
      ${res.percentile != null ? `<div class="muted">Deeper than <b style="color:var(--text)">${res.percentile}%</b> of today's diggers${res.players ? ` (${res.players.toLocaleString()} played)` : ''}</div>` : ''}
      ${g.mode === 'endless' ? `<div class="muted">${res.rounds.length} prompts · best ${formatKm(profile.endlessBest)}</div>` : ''}
      ${g.suspicious ? '<p class="small" style="color:var(--bad)">This run was flagged by anti-cheat and does not count toward global ranks.</p>' : ''}
      <div class="share-box">${esc(text)}</div>
      <div class="btns two">
        <button class="btn primary" data-act="share">${navigator.share ? 'Share' : 'Copy result'}</button>
        <button class="btn" data-act="copy">Copy text</button>
      </div>
      <div class="btns two" style="margin-top:10px">
        <a class="btn ghost" target="_blank" rel="noopener" href="https://x.com/intent/post?text=${encodeURIComponent(text)}">Post on X</a>
        <a class="btn ghost" target="_blank" rel="noopener" href="https://www.reddit.com/submit?title=${encodeURIComponent(title + ' — ' + formatKm(g.total))}&text=${encodeURIComponent(text)}">Reddit</a>
      </div>
    </div>
    ${duelHTML(res)}
    <h2>The reveal</h2>
    <p class="muted small" style="margin-top:-4px">What everyone else said. Learn the deep cuts for next time.</p>
    ${res.reveal.map(revealHTML).join('')}
    ${g.mode === 'daily' ? `<div class="next-in">Next dig in <b id="nextIn">${nextPuzzleIn()}</b></div>` : ''}
    <div class="btns two" style="margin-top:16px">
      <button class="btn" data-act="endless">♾️ Endless</button>
      <button class="btn" data-act="duelNew">⚔️ Duel a friend</button>
    </div>
    <div class="btns" style="margin-top:10px"><button class="btn ghost" data-act="home">Home</button></div>
  `, 'results');
  countUp($('#km'), g.total);
  startClock();
}

function countUp(el, target) {
  const t0 = performance.now(), dur = 1200;
  const step = (t) => {
    const k = Math.min(1, (t - t0) / dur);
    el.textContent = formatKm(target * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

async function copy(text) {
  try { await navigator.clipboard.writeText(text); toast('Copied! Paste it anywhere.'); }
  catch {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast('Copied!'); } catch { toast('Copy failed', true); }
    ta.remove();
  }
}
async function share(text) {
  if (navigator.share) {
    try { await navigator.share({ text }); return; } catch (e) { if (e.name === 'AbortError') return; }
  }
  copy(text);
}

// ------------------------------------------------------------------ duels
function duelIntro({ duelId = null } = {}) {
  render(`
    <h1>${duelId ? 'You have been <em>challenged.</em>' : 'Duel a <em>friend.</em>'}</h1>
    <p class="lede">${duelId
      ? 'A friend dug through 7 prompts and wants to see you go deeper. You get the exact same 7.'
      : "You'll play 7 fresh prompts (not today's daily). Then send the link: your friend gets the same 7."}</p>
    <div class="card stack small">
      <div>⏱️ ${ROUND_SECONDS} seconds per prompt, rarer answers dig deeper.</div>
      <div>🪞 <b>The twist:</b> any round where you both typed the same answer, you <b>both lose half</b> of it. Out-think each other.</div>
      <div>🏆 Deepest total wins.</div>
    </div>
    <div class="btns" style="margin-top:16px">
      <button class="btn primary" data-act="${duelId ? 'duelAccept' : 'duelStart'}" autofocus>${duelId ? 'Accept the duel' : 'Start the duel'}</button>
      <button class="btn ghost" data-act="home">Back</button>
    </div>`, 'duelIntro');
}

// ------------------------------------------------------------------ modals
function openModal(html) {
  const m = $('#modal');
  $('.modal-body', m).innerHTML = html + '<div class="btns" style="margin-top:16px"><button class="btn" data-act="closeModal">Close</button></div>';
  if (!m.open) m.showModal();
}

function statsModal() {
  const h = Object.values(profile.history);
  const played = h.length;
  const best = h.reduce((m, x) => Math.max(m, x.total), 0);
  const avg = played ? Math.round(h.reduce((s, x) => s + x.total, 0) / played) : 0;
  const counts = [...TIERS.map((t) => [t, profile.tiers[t.key] || 0]), [MISS, (profile.tiers.miss || 0) + (profile.tiers.void || 0)]];
  const maxC = Math.max(1, ...counts.map(([, c]) => c));
  const sync = api.mode !== 'server'
    ? '<p class="muted small">Cross-device sync is available when playing on the online server.</p>'
    : profile.syncCode
      ? `<p class="small">Your sync code (enter it on another device):</p><div class="code">${esc(profile.syncCode)}</div>
         <p class="muted small">Anyone with this code can load your stats, so keep it to yourself.</p>`
      : `<p class="small muted">Your stats live on this device. Save them to an account to keep your streak across devices. No email needed.</p>
         <button class="btn primary" data-act="syncCreate">Create sync code</button>`;
  openModal(`
    <h2 style="margin-top:0">Your dig log</h2>
    <div class="stat-grid">
      <div><b>${played}</b><span>Daily digs</span></div>
      <div><b>${profile.streak}</b><span>Streak</span></div>
      <div><b>${profile.maxStreak}</b><span>Best streak</span></div>
      <div><b>${best.toLocaleString()}</b><span>Deepest km</span></div>
    </div>
    <p class="muted small">Average ${avg.toLocaleString()} km · Endless best ${formatKm(profile.endlessBest || 0)} · Duels ${profile.duels.w}W ${profile.duels.l}L ${profile.duels.t}T</p>
    <h2>Answers by rarity</h2>
    <div class="bars">${counts.map(([t, c]) => `<div class="t-${t.key}"><span style="width:84px">${t.emoji} ${t.name}</span><i style="width:${(c / maxC) * 60}%"></i><b>${c}</b></div>`).join('')}</div>
    <h2>Sync across devices</h2>
    ${sync}
    ${api.mode === 'server' ? `<div class="row" style="margin-top:10px"><input class="text grow" id="codeIn" placeholder="ENTER-A-CODE-0000" aria-label="Sync code"><button class="btn" style="width:auto" data-act="syncLoad">Load</button></div>` : ''}
  `);
}

function helpModal() {
  openModal(`
    <h2 style="margin-top:0">How to play Deep Cut</h2>
    <div class="stack small">
      <div>⛏ Every day, everyone gets the same <b>7 open-ended prompts</b> like “Name a bird”.</div>
      <div>⏱️ You have <b>${ROUND_SECONDS} seconds</b> per prompt. Wrong guesses are free: keep typing until one counts.</div>
      <div>💎 Valid answers score by <b>how rare they are</b>. The answer everyone gives is worth almost nothing; the answer nobody thought of is worth up to 1,000.</div>
      <div>🌍 Points are kilometres. Dig through the crust and mantle toward the core, 6,371 km down.</div>
      <div>✍️ Typos, plurals and alternate names are forgiven.</div>
      <div>🚫 Pasting is blocked, and leaving the tab mid-round voids it.</div>
    </div>
    ${legendHTML()}
    <div class="small muted">${TIERS.map((t) => `${t.emoji} ${t.name}: ${t.blurb}`).join('<br>')}<br>${MISS.emoji} Miss</div>
  `);
}

// ------------------------------------------------------------------ events
document.addEventListener('click', async (e) => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const act = el.dataset.act;
  sfx.unlock();
  if (act !== 'share' && act !== 'copy') sfx.click();
  switch (act) {
    case 'home': history.replaceState(null, '', location.pathname); return home();
    case 'daily': return startMode('daily');
    case 'todayResults': {
      const g = await api.startGame({ mode: 'daily', date: localDate() }).catch(() => null);
      if (g) { S.game = g; return showResults(); }
      return;
    }
    case 'endless': return startMode('endless');
    case 'duelNew': return duelIntro();
    case 'duelStart': return startMode('duel');
    case 'duelAccept': return startMode('duel', { duelId: S.pendingDuel });
    case 'reveal': return beginRound(Number(el.dataset.idx));
    case 'next': return readyScreen(S.game.rounds.length);
    case 'results': return showResults();
    case 'share': return share(shareFor(S.results));
    case 'copy': return copy(shareFor(S.results));
    case 'shareDuel': return share(shareFor(S.results));
    case 'closeModal': return $('#modal').close();
    case 'syncCreate': {
      try {
        const { code } = await api.createAccount(profile);
        profile.syncCode = code; saveProfile(); statsModal();
      } catch (err) { toast(err.message, true); }
      return;
    }
    case 'syncLoad': {
      const code = $('#codeIn').value.trim().toUpperCase();
      if (!code) return;
      try {
        const acct = await api.getAccount(code);
        profile = mergeProfiles(profile, acct.profile || {});
        profile.syncCode = code; saveProfile(); statsModal(); toast('Synced!');
        if (S.view === 'home') home();
      } catch (err) { toast(err.message, true); }
    }
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' || $('#modal').open) return;
  if (S.view === 'ready' || S.view === 'roundResult') {
    const b = $('[data-act="reveal"], [data-act="next"], [data-act="results"]');
    if (b && document.activeElement !== b) { e.preventDefault(); b.click(); }
  }
});

$('#homeBtn').addEventListener('click', () => {
  if (S.view === 'round' && !confirm('Leave this round? The timer keeps running.')) return;
  history.replaceState(null, '', location.pathname);
  home();
});
$('#statsBtn').addEventListener('click', statsModal);
$('#helpBtn').addEventListener('click', helpModal);
const muteBtn = $('#muteBtn');
const syncMute = () => { muteBtn.textContent = isMuted() ? '🔇' : '🔊'; muteBtn.setAttribute('aria-pressed', String(isMuted())); muteBtn.setAttribute('aria-label', isMuted() ? 'Unmute sounds' : 'Mute sounds'); };
muteBtn.addEventListener('click', () => { setMuted(!isMuted()); syncMute(); if (!isMuted()) sfx.click(); });
syncMute();

// ------------------------------------------------------------------ boot
(async function boot() {
  buildShaft();
  recomputeStreak(profile);
  api = await connect();
  if (profile.syncCode && api.mode === 'server') {
    api.getAccount(profile.syncCode).then((a) => { profile = mergeProfiles(profile, a.profile || {}); profile.syncCode = a.code; LS.set('dc_profile', profile); if (S.view === 'home') home(); }).catch(() => {});
  }
  const params = new URLSearchParams(location.search);
  const duel = params.get('duel');
  if (duel) {
    S.pendingDuel = duel;
    // Already played this duel (e.g. the creator checking back)? Go straight to the head-to-head.
    if (api.mode === 'server') {
      const info = await api.duelInfo(duel).catch(() => null);
      if (info && info.mine) { S.game = await api.startGame({ mode: 'duel', duelId: duel }).catch(() => null); if (S.game?.finished) return showResults(); }
    }
    return duelIntro({ duelId: duel });
  }
  home();
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();

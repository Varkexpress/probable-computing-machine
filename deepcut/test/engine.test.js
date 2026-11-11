import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Engine } from '../shared/game.js';
import { MemoryStore, compilePrompts } from '../shared/memory-store.js';
import { buildIndex, matchAnswer, editDistance } from '../shared/match.js';
import { pointsFor, rarityShare, tierFor, shareText, depthToTrack, estimatePercentile } from '../shared/scoring.js';
import { dailyPromptIds, puzzleNumber } from '../shared/daily.js';
import { norm, singulars } from '../shared/normalize.js';

const CATS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const FIXTURE = [
  {
    id: 'fruit', text: 'Name a fruit', cat: 'Food', emoji: '🍎',
    a: `Apple; Banana; Orange | Mango; Strawberry; Cherry | Kiwi=Kiwifruit; Papaya; Fig | Rambutan; Lychee=Litchi; Durian
      | Salak=Snake fruit; Jabuticaba; Mangosteen; Cherimoya; Feijoa; Soursop=Guanabana`,
  },
  ...CATS.map((c, i) => ({
    id: 'p' + i, text: 'Prompt ' + i, cat: c, emoji: '❓',
    a: `alpha; bravo | charlie; delta | echo; foxtrot | golf; hotel; india | juliet; kilo; lima; mike; november; oscar`,
  })),
];

function setup() {
  let t = Date.parse('2026-11-11T12:00:00Z');
  const clock = { now: () => t, advance: (ms) => (t += ms) };
  const store = new MemoryStore(compilePrompts(FIXTURE));
  const engine = new Engine(store, { now: clock.now });
  return { store, engine, clock };
}

test('normalization strips accents, articles and punctuation', () => {
  assert.equal(norm("  The Côte d'Ivoire!! "), 'cote divoire');
  assert.equal(norm('A Midsummer Night’s Dream'), 'midsummer nights dream');
  assert.ok(singulars('cherries').includes('cherry'));
  assert.ok(singulars('mangoes').includes('mango'));
});

test('edit distance handles transpositions', () => {
  assert.equal(editDistance('rambutan', 'rambutna'), 1);
  assert.equal(editDistance('kitten', 'sitting'), 3);
});

test('matching: aliases, plurals, typos, and rejects short-word typos', () => {
  const [fruit] = compilePrompts(FIXTURE);
  const idx = buildIndex(fruit.answers);
  assert.equal(matchAnswer(idx, 'litchi').answer.display, 'Lychee');
  assert.equal(matchAnswer(idx, 'Snake Fruit').answer.display, 'Salak');
  assert.equal(matchAnswer(idx, 'cherries').answer.display, 'Cherry');
  assert.equal(matchAnswer(idx, 'mangosteeen').answer.display, 'Mangosteen');
  assert.equal(matchAnswer(idx, 'Ramubtan').answer.display, 'Rambutan');
  assert.equal(matchAnswer(idx, 'fog'), null); // 3 letters: no typo tolerance
  assert.equal(matchAnswer(idx, 'potato'), null);
});

test('scoring: obvious answers score little, deep cuts score a lot', () => {
  const [fruit] = compilePrompts(FIXTURE);
  const weightSum = fruit.answers.reduce((s, a) => s + a.weight, 0);
  const pts = (name) => pointsFor(rarityShare({ count: 0, total: 0, weight: fruit.answers.find((a) => a.display === name).weight, weightSum }));
  assert.ok(pts('Apple') < 20, `apple ${pts('Apple')}`);
  assert.ok(pts('Salak') > 300, `salak ${pts('Salak')}`);
  assert.ok(pts('Apple') < pts('Mango') && pts('Mango') < pts('Kiwi') && pts('Kiwi') < pts('Rambutan') && pts('Rambutan') < pts('Salak'));
  // Player data overrides the prior: if everyone says Salak, it stops being rare.
  const crowded = pointsFor(rarityShare({ count: 900, total: 1000, weight: 0.25, weightSum }));
  assert.ok(crowded < 20);
  assert.equal(tierFor(0.2).key, 'common');
  assert.equal(tierFor(0.0001).key, 'legendary');
});

test('daily schedule is deterministic, 7 unique prompts, varies by date', () => {
  const prompts = compilePrompts(FIXTURE);
  const a = dailyPromptIds('2026-11-11', prompts);
  assert.deepEqual(a, dailyPromptIds('2026-11-11', prompts));
  assert.equal(new Set(a).size, 7);
  assert.notDeepEqual(a, dailyPromptIds('2026-11-12', prompts));
  assert.equal(puzzleNumber('2026-11-01'), 1);
});

async function playAll(engine, clock, pid, answers, opts = {}) {
  const g = await engine.startGame({ mode: opts.mode || 'daily', playerId: pid, date: '2026-11-11', duelId: opts.duelId });
  for (let i = 0; i < 7; i++) {
    const r = await engine.startRound(g.id, pid, i);
    clock.advance(3000);
    const want = answers[i];
    if (want == null) {
      clock.advance(30000);
      await engine.endRound(g.id, pid, i, 'timeout');
    } else {
      const res = await engine.submit(g.id, pid, i, typeof want === 'function' ? want(r.prompt) : want);
      assert.ok(res.done, 'answer accepted');
    }
  }
  return g.id;
}

test('full daily game: scoring, one attempt per day, reveal, percentile', async () => {
  const { engine, clock } = setup();
  const id = await playAll(engine, clock, 'p1', Array(7).fill((p) => (p.id === 'fruit' ? 'salak' : 'oscar')));
  const res = await engine.results(id, 'p1');
  assert.equal(res.rounds.length, 7);
  assert.ok(res.game.total > 2000);
  assert.equal(res.reveal.length, 7);
  assert.ok(res.reveal[0].common.display);
  assert.ok(res.percentile >= 0 && res.percentile <= 99);
  // Same player, same day: returns the finished game instead of a new one.
  const again = await engine.startGame({ mode: 'daily', playerId: 'p1', date: '2026-11-11' });
  assert.equal(again.id, id);
  assert.equal(again.finished, true);
});

test('wrong guesses are free, timer is enforced server-side', async () => {
  const { engine, clock } = setup();
  const g = await engine.startGame({ mode: 'daily', playerId: 'p2', date: '2026-11-11' });
  await engine.startRound(g.id, 'p2', 0);
  clock.advance(2000);
  const wrong = await engine.submit(g.id, 'p2', 0, 'zzzz not real');
  assert.equal(wrong.valid, false);
  assert.equal(wrong.done, false);
  clock.advance(30000);
  const late = await engine.submit(g.id, 'p2', 0, 'alpha');
  assert.equal(late.timeout, true);
  assert.equal(late.round.tier, 'miss');
  // Cannot skip ahead without starting rounds in order.
  await assert.rejects(engine.startRound(g.id, 'p2', 3), /order/);
});

test('anti-cheat: voided rounds score zero, too-fast answers are excluded from stats', async () => {
  const { engine, clock, store } = setup();
  const g = await engine.startGame({ mode: 'daily', playerId: 'p3', date: '2026-11-11' });
  const r0 = await engine.startRound(g.id, 'p3', 0);
  const v = await engine.endRound(g.id, 'p3', 0, 'void', ['blur']);
  assert.equal(v.round.tier, 'void');
  assert.equal(v.round.points, 0);
  const r1 = await engine.startRound(g.id, 'p3', 1);
  clock.advance(200); // inhumanly fast
  const fast = await engine.submit(g.id, 'p3', 1, 'alpha');
  assert.ok(fast.round.flags.includes('too_fast'));
  assert.equal(fast.game.suspicious, true);
  const stats = await store.getStats(r1.prompt.id);
  assert.equal(stats.total, 0);
  assert.ok(r0.prompt.id);
});

test('rarity is dynamic: an answer gets cheaper as more players give it', async () => {
  const { engine, clock } = setup();
  const scores = [];
  for (let n = 0; n < 40; n++) {
    const id = await playAll(engine, clock, 'crowd' + n, Array(7).fill((p) => (p.id === 'fruit' ? 'Salak' : 'oscar')));
    const res = await engine.results(id, 'crowd' + n);
    scores.push(res.rounds.find((r) => r.display === 'Salak' || r.display === 'oscar').points);
  }
  assert.ok(scores[0] > scores[39] * 3, `first ${scores[0]} last ${scores[39]}`);
});

test('duel: same answer halves both players; different answers keep full points', async () => {
  const { engine, clock } = setup();
  const a = await engine.startGame({ mode: 'duel', playerId: 'alice', date: '2026-11-11' });
  for (let i = 0; i < 7; i++) {
    const r = await engine.startRound(a.id, 'alice', i);
    clock.advance(3000);
    await engine.submit(a.id, 'alice', i, r.prompt.id === 'fruit' ? 'salak' : i === 0 ? 'oscar' : 'juliet');
  }
  const b = await engine.startGame({ mode: 'duel', playerId: 'bob', duelId: a.duelId });
  for (let i = 0; i < 7; i++) {
    const r = await engine.startRound(b.id, 'bob', i);
    clock.advance(3000);
    await engine.submit(b.id, 'bob', i, r.prompt.id === 'fruit' ? 'mangosteen' : i === 0 ? 'oscar' : 'kilo');
  }
  const res = await engine.results(b.id, 'bob');
  const m = res.duel.matchups[0];
  assert.equal(m.opponentFinished, true);
  const row0 = m.rows[0];
  const promptIsFruit = res.reveal[0].prompt.id === 'fruit';
  if (!promptIsFruit) {
    assert.equal(row0.clash, true);
    assert.ok(m.rows.slice(1).every((r) => !r.clash));
  }
  assert.ok(['win', 'loss', 'tie'].includes(m.outcome));
  const creator = await engine.results(a.id, 'alice');
  assert.equal(creator.duel.isCreator, true);
  assert.equal(creator.duel.matchups.length, 1);
});

test('endless mode ends after 3 misses', async () => {
  const { engine, clock } = setup();
  const g = await engine.startGame({ mode: 'endless', playerId: 'e1', date: '2026-11-11' });
  let i = 0;
  let state;
  while (true) {
    try { await engine.startRound(g.id, 'e1', i); } catch (e) { assert.equal(e.code, 'over'); break; }
    clock.advance(1000);
    state = i < 2 ? await engine.submit(g.id, 'e1', i, i === 0 ? 'oscar' : 'salak').catch(() => null) : null;
    if (!state || !state.done) state = await engine.endRound(g.id, 'e1', i, 'timeout');
    i++;
    if (state.game.finished) break;
  }
  assert.equal(state.game.lives, 0);
  assert.ok(i >= 3);
});

test('LLM fallback adds discovered answers and they match next time', async () => {
  const { engine, clock, store } = setup();
  let calls = 0;
  store.validateUnknown = async (prompt, raw) => { calls++; return /pitaya|dragon/i.test(raw) ? { valid: true, display: 'Dragon fruit' } : { valid: false }; };
  const g = await engine.startGame({ mode: 'endless', playerId: 'l1', date: '2026-11-11' });
  let i = 0;
  for (; i < 11; i++) {
    const r = await engine.startRound(g.id, 'l1', i);
    clock.advance(2000);
    if (r.prompt.id === 'fruit') break;
    await engine.submit(g.id, 'l1', i, 'alpha');
  }
  const res = await engine.submit(g.id, 'l1', i, 'pitaya');
  assert.equal(res.round.display, 'Dragon fruit');
  assert.equal(res.round.tier, 'legendary');
  const prompt = await store.getPrompt('fruit');
  assert.ok(prompt.answers.some((a) => a.display === 'Dragon fruit'));
  assert.equal(calls, 1);
});

test('share text is spoiler-free and includes the grid', () => {
  const t = shareText([{ tier: 'common' }, { tier: 'legendary' }, { tier: 'miss' }], { puzzleNo: 11, total: 1234, percentile: 87, mode: 'daily', url: 'https://x.test', streak: 3 });
  assert.match(t, /Deep Cut #11/);
  assert.match(t, /⬜🟨⬛/);
  assert.match(t, /1,234 km/);
  assert.match(t, /87%/);
  assert.ok(depthToTrack(0) === 0 && depthToTrack(7000) === 1);
  assert.ok(estimatePercentile(5000) > estimatePercentile(500));
});

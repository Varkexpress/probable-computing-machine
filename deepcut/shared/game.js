// The game engine. It owns every rule (timers, matching, scoring, duels, anti-cheat) and talks
// to storage through a small async Store interface, so the same code runs on the Node server
// (SQLite store) and in the browser when no server is reachable (localStorage store).
//
// Store interface (all async):
//   getPrompt(id) -> { id, text, cat, emoji, answers: [{ id, display, aliases, weight, band, source }] }
//   allPrompts() -> [{ id, cat }]
//   getStats(promptId) -> { total, counts: { [answerId]: n } }
//   recordAnswer(promptId, answerId) / recordMiss(promptId, normText)
//   topMisses(promptId, limit) -> [{ text, count }]
//   validateUnknown(prompt, raw) -> { valid, display } | null     (optional, e.g. LLM)
//   addAnswer(promptId, { display, aliases, weight, source }) -> answer
//   createGame(game) / getGame(id) / saveGame(game)
//   findDailyGame(playerId, date) -> game | null
//   addDailyScore(date, total, gameId) / scoresFor(date) -> number[]
//   createDuel(duel) / getDuel(id) / saveDuel(duel)

import { buildIndex, matchAnswer } from './match.js';
import { norm, squash } from './normalize.js';
import {
  ROUND_SECONDS, ROUNDS, scoreAnswer, rarityShare, tierFor, estimatePercentile, layerAt, DISCOVERED_WEIGHT,
} from './scoring.js';
import { dailyPromptIds, seededPromptIds, puzzleNumber, isValidDate } from './daily.js';

export const GRACE_MS = 1500;          // network slack after the visible deadline
export const MIN_HUMAN_MS = 900;       // faster than this from prompt reveal to answer is flagged
export const MAX_ATTEMPTS = 15;        // wrong guesses allowed per round
export const ENDLESS_LIVES = 3;

const BLOCKED_MISSES = /\b(fuck|shit|cunt|nigg|fag|rape|porn|cock|dick|pussy|whore|slut|retard)/;

export class GameError extends Error {
  constructor(code, message, status = 400) { super(message); this.code = code; this.status = status; }
}

export function newId(len = 10) {
  const abc = 'abcdefghijkmnpqrstuvwxyz23456789';
  let s = '';
  const buf = new Uint32Array(len);
  globalThis.crypto.getRandomValues(buf);
  for (const n of buf) s += abc[n % abc.length];
  return s;
}

export class Engine {
  constructor(store, { now = () => Date.now(), roundSeconds = ROUND_SECONDS } = {}) {
    this.store = store;
    this.now = now;
    this.roundMs = roundSeconds * 1000;
    this.indexCache = new Map();
  }

  async index(promptId) {
    const prompt = await this.store.getPrompt(promptId);
    if (!prompt) throw new GameError('no_prompt', 'Unknown prompt', 404);
    const key = promptId + ':' + prompt.answers.length;
    let idx = this.indexCache.get(key);
    if (!idx) {
      idx = buildIndex(prompt.answers);
      this.indexCache.set(key, idx);
    }
    const weightSum = prompt.answers.reduce((s, a) => s + a.weight, 0);
    return { prompt, idx, weightSum };
  }

  // ---------------------------------------------------------------- games

  async startGame({ mode = 'daily', playerId, date, duelId } = {}) {
    if (!playerId || typeof playerId !== 'string' || playerId.length > 64) throw new GameError('bad_player', 'Missing player id');
    const all = await this.store.allPrompts();
    let promptIds, duel = null, seed = null;
    if (mode === 'daily') {
      if (!isValidDate(date)) throw new GameError('bad_date', 'Bad date');
      const drift = Math.abs(Date.parse(date + 'T12:00:00Z') - this.now());
      if (drift > 40 * 3600 * 1000) throw new GameError('bad_date', 'That puzzle is not open right now');
      const existing = await this.store.findDailyGame(playerId, date);
      if (existing) return this.publicGame(existing);
      promptIds = (this.store.dailyOverride && await this.store.dailyOverride(date)) || dailyPromptIds(date, all, ROUNDS);
    } else if (mode === 'endless') {
      seed = newId(8);
      promptIds = seededPromptIds(seed, all, all.length, this.spoilers(date, all, 20));
    } else if (mode === 'duel') {
      if (duelId) {
        duel = await this.store.getDuel(duelId);
        if (!duel) throw new GameError('no_duel', 'That duel link has expired or never existed', 404);
        const mine = (duel.games || []).find((g) => g.playerId === playerId);
        if (mine) {
          const g = await this.store.getGame(mine.gameId);
          if (g) return this.publicGame(g);
        }
        promptIds = duel.promptIds;
      } else {
        seed = newId(8);
        promptIds = seededPromptIds(seed, all, ROUNDS, this.spoilers(date, all, ROUNDS));
        duel = { id: newId(8), seed, promptIds, createdAt: this.now(), creatorGameId: null, games: [] };
        await this.store.createDuel(duel);
      }
    } else {
      throw new GameError('bad_mode', 'Unknown mode');
    }
    const game = {
      id: newId(12),
      mode,
      playerId,
      date: mode === 'daily' ? date : (isValidDate(date) ? date : null),
      puzzleNo: mode === 'daily' ? puzzleNumber(date) : null,
      duelId: duel ? duel.id : null,
      promptIds,
      rounds: [],
      lives: mode === 'endless' ? ENDLESS_LIVES : null,
      total: 0,
      createdAt: this.now(),
      finishedAt: null,
      flags: [],
      suspicious: false,
    };
    await this.store.createGame(game);
    if (duel) {
      duel.games = duel.games || [];
      if (!duel.creatorGameId) duel.creatorGameId = game.id;
      duel.games.push({ gameId: game.id, playerId });
      await this.store.saveDuel(duel);
    }
    return this.publicGame(game);
  }

  /** Today's daily prompts, kept out of other modes so they are not spoiled, if the bank is big enough. */
  spoilers(date, all, need) {
    if (!isValidDate(date)) return [];
    const today = dailyPromptIds(date, all, ROUNDS);
    return all.length - today.length >= need ? today : [];
  }

  async loadGame(gameId, playerId) {
    const game = await this.store.getGame(gameId);
    if (!game) throw new GameError('no_game', 'Game not found', 404);
    if (playerId && game.playerId !== playerId) throw new GameError('not_yours', 'Not your game', 403);
    return game;
  }

  roundLimit(game) {
    return game.mode === 'endless' ? game.promptIds.length : ROUNDS;
  }

  isOver(game) {
    if (game.finishedAt) return true;
    if (game.mode === 'endless') return game.lives <= 0 || game.rounds.filter((r) => r.status === 'done').length >= game.promptIds.length;
    return game.rounds.filter((r) => r.status === 'done').length >= ROUNDS;
  }

  /** Close a round whose time ran out. Returns true if something changed. */
  async expire(game, round) {
    if (round.status !== 'active') return false;
    if (this.now() <= round.deadline + GRACE_MS) return false;
    this.closeMiss(game, round, 'timeout');
    return true;
  }

  closeMiss(game, round, reason) {
    round.status = 'done';
    round.tier = reason === 'void' ? 'void' : 'miss';
    round.points = 0;
    round.endedAt = this.now();
    round.reason = reason;
    if (game.mode === 'endless') game.lives = Math.max(0, game.lives - 1);
  }

  async startRound(gameId, playerId, idx) {
    const game = await this.loadGame(gameId, playerId);
    if (this.isOver(game)) throw new GameError('over', 'Game is over');
    if (!Number.isInteger(idx) || idx < 0 || idx >= this.roundLimit(game)) throw new GameError('bad_round', 'Bad round');
    // Expire whatever was running so the timer cannot be dodged by skipping ahead.
    for (const r of game.rounds) await this.expire(game, r);
    if (this.isOver(game)) {
      await this.finishIfOver(game);
      await this.store.saveGame(game);
      throw new GameError('over', 'Game is over');
    }
    let round = game.rounds[idx];
    if (!round) {
      if (idx !== game.rounds.length) throw new GameError('bad_round', 'Play rounds in order');
      const prev = game.rounds[idx - 1];
      if (prev && prev.status !== 'done') throw new GameError('round_open', 'Finish the current round first');
      const start = this.now();
      round = { idx, promptId: game.promptIds[idx], startedAt: start, deadline: start + this.roundMs, status: 'active', attempts: [], flags: [] };
      game.rounds.push(round);
      await this.store.saveGame(game);
    }
    const { prompt } = await this.index(round.promptId);
    return {
      idx,
      prompt: { id: prompt.id, text: prompt.text, cat: prompt.cat, emoji: prompt.emoji },
      deadline: round.deadline,
      serverNow: this.now(),
      remainingMs: Math.max(0, round.deadline - this.now()),
      round: this.publicRound(round),
      game: this.publicGame(game),
    };
  }

  async submit(gameId, playerId, idx, raw, clientFlags = []) {
    const game = await this.loadGame(gameId, playerId);
    const round = game.rounds[idx];
    if (!round) throw new GameError('bad_round', 'Round not started');
    if (round.status === 'done') return { done: true, round: this.publicRound(round), game: this.publicGame(game) };
    if (await this.expire(game, round)) {
      await this.finishIfOver(game);
      await this.store.saveGame(game);
      return { done: true, timeout: true, round: this.publicRound(round), game: this.publicGame(game) };
    }
    const text = String(raw ?? '').slice(0, 80).trim();
    if (!text) throw new GameError('empty', 'Type an answer');
    this.applyFlags(game, round, clientFlags);
    if (round.attempts.length >= MAX_ATTEMPTS) throw new GameError('too_many', 'Out of guesses for this round', 429);

    const { prompt, idx: index, weightSum } = await this.index(round.promptId);
    let match = matchAnswer(index, text);

    if (!match && this.store.validateUnknown) {
      const n = norm(text);
      if (n.length >= 2) {
        const verdict = await this.store.validateUnknown(prompt, text).catch(() => null);
        if (verdict && verdict.valid) {
          // The validator may map the input onto an answer we already know.
          const known = verdict.display ? matchAnswer(index, verdict.display) : null;
          if (known) match = { answer: known.answer, how: 'llm-alias', distance: 0 };
          else {
            const display = verdict.display || text;
            const answer = await this.store.addAnswer(prompt.id, {
              display, aliases: [...new Set([norm(display), squash(display), n, squash(text)])], weight: DISCOVERED_WEIGHT, source: 'llm',
            });
            match = { answer, how: 'llm', distance: 0 };
          }
        }
      }
    }

    if (!match) {
      round.attempts.push({ text, at: this.now(), ok: false });
      if (!game.suspicious) await this.store.recordMiss(round.promptId, norm(text));
      await this.store.saveGame(game);
      return { done: false, valid: false, attemptsLeft: MAX_ATTEMPTS - round.attempts.length, round: this.publicRound(round) };
    }

    // Accepted.
    const elapsed = this.now() - round.startedAt;
    if (elapsed < MIN_HUMAN_MS) this.flag(game, round, 'too_fast');
    const stats = await this.store.getStats(round.promptId);
    const scored = scoreAnswer({ count: stats.counts[match.answer.id] || 0, total: stats.total, weight: match.answer.weight, weightSum });
    round.status = 'done';
    round.answerId = match.answer.id;
    round.display = match.answer.display;
    round.typed = text;
    round.how = match.how;
    round.points = scored.points;
    round.tier = scored.tier;
    round.share = scored.share;
    round.endedAt = this.now();
    round.attempts.push({ text, at: this.now(), ok: true });
    game.total = game.rounds.reduce((s, r) => s + (r.points || 0), 0);
    if (!game.suspicious) await this.store.recordAnswer(round.promptId, match.answer.id);
    await this.finishIfOver(game);
    await this.store.saveGame(game);
    return { done: true, valid: true, round: this.publicRound(round), game: this.publicGame(game) };
  }

  /** The client gave up on the round: time ran out on screen, or anti-cheat voided it. */
  async endRound(gameId, playerId, idx, reason = 'timeout', clientFlags = []) {
    const game = await this.loadGame(gameId, playerId);
    const round = game.rounds[idx];
    if (!round) throw new GameError('bad_round', 'Round not started');
    if (round.status !== 'done') {
      this.applyFlags(game, round, clientFlags);
      this.closeMiss(game, round, reason === 'void' ? 'void' : reason === 'skip' ? 'skip' : 'timeout');
      game.total = game.rounds.reduce((s, r) => s + (r.points || 0), 0);
      await this.finishIfOver(game);
      await this.store.saveGame(game);
    }
    return { done: true, round: this.publicRound(round), game: this.publicGame(game) };
  }

  applyFlags(game, round, flags) {
    const allowed = ['paste', 'blur', 'devtools', 'autofill'];
    for (const f of Array.isArray(flags) ? flags : []) if (allowed.includes(f)) this.flag(game, round, f);
  }

  flag(game, round, f) {
    if (!round.flags.includes(f)) round.flags.push(f);
    if (!game.flags.includes(f)) game.flags.push(f);
    // Paste or inhumanly fast answers keep the score but are excluded from global stats and ranks.
    if (f === 'paste' || f === 'too_fast') game.suspicious = true;
  }

  async finishIfOver(game) {
    if (game.finishedAt || !this.isOver(game)) return;
    game.finishedAt = this.now();
    game.total = game.rounds.reduce((s, r) => s + (r.points || 0), 0);
    if (game.mode === 'daily' && !game.suspicious) await this.store.addDailyScore(game.date, game.total, game.id);
  }

  // ---------------------------------------------------------------- results

  async results(gameId, playerId) {
    const game = await this.loadGame(gameId, playerId);
    for (const r of game.rounds) await this.expire(game, r);
    await this.finishIfOver(game);
    await this.store.saveGame(game);
    if (!game.finishedAt) throw new GameError('not_over', 'Game still in progress');

    const reveal = [];
    for (const r of game.rounds) reveal.push(await this.reveal(r));

    let percentile = null, players = null;
    if (game.mode === 'daily') {
      const scores = await this.store.scoresFor(game.date);
      players = scores.length;
      percentile = this.percentile(scores, game.total);
    } else if (game.mode === 'endless') {
      percentile = null;
    }
    const out = {
      game: this.publicGame(game),
      rounds: game.rounds.map((r) => this.publicRound(r)),
      reveal,
      percentile,
      players,
      layer: layerAt(game.total).name,
    };
    if (game.mode === 'duel') out.duel = await this.duelStatus(game.duelId, game.id);
    return out;
  }

  percentile(scores, total) {
    const model = estimatePercentile(total);
    if (!scores.length) return model;
    let below = 0, equal = 0;
    for (const s of scores) { if (s < total) below++; else if (s === total) equal++; }
    const real = Math.round(((below + equal * 0.5) / scores.length) * 100);
    const w = Math.min(1, scores.length / 50); // blend toward real data as players arrive
    return Math.max(0, Math.min(99, Math.round(w * real + (1 - w) * model)));
  }

  /** Post-game reveal for one prompt: most common answer, rarest answer anyone found, top funny miss. */
  async reveal(round) {
    const { prompt, weightSum } = await this.index(round.promptId);
    const stats = await this.store.getStats(prompt.id);
    const scored = prompt.answers.map((a) => {
      const count = stats.counts[a.id] || 0;
      return { a, count, share: rarityShare({ count, total: stats.total, weight: a.weight, weightSum }) };
    });
    scored.sort((x, y) => y.share - x.share);
    const common = scored[0];
    const found = scored.filter((s) => s.count > 0 && s.a.id !== common.a.id);
    const rarest = found.length ? found[found.length - 1] : null;
    // A deep cut nobody has played yet: teaches players how deep the list goes.
    const untouched = scored.filter((s) => s.count === 0 && s.a.band >= 4);
    const unclaimed = untouched.length ? untouched[(round.idx * 7 + prompt.id.length) % untouched.length] : null;
    const misses = (await this.store.topMisses(prompt.id, 8)).filter((m) => m.count >= 2 && !BLOCKED_MISSES.test(m.text));
    const pick = (s) => s && { display: s.a.display, pct: +(s.share * 100).toFixed(s.share < 0.01 ? 2 : 1), count: s.count, tier: tierFor(s.share).key };
    return {
      idx: round.idx,
      prompt: { id: prompt.id, text: prompt.text, emoji: prompt.emoji, cat: prompt.cat },
      players: stats.total,
      answerCount: prompt.answers.length,
      common: pick(common),
      rarest: pick(rarest),
      unclaimed: unclaimed ? unclaimed.a.display : null,
      funnyMiss: misses[0] ? { text: misses[0].text, count: misses[0].count } : null,
      yours: round.display ? { display: round.display, typed: round.typed, points: round.points, tier: round.tier } : null,
    };
  }

  // ---------------------------------------------------------------- duels

  /**
   * Duel scoring: for each round where both players gave the same answer, both lose half
   * that round's points. Compared against the duel creator (or, for the creator, the latest challenger).
   */
  async duelStatus(duelId, myGameId) {
    const duel = await this.store.getDuel(duelId);
    if (!duel) return null;
    const me = await this.store.getGame(myGameId);
    const others = [];
    for (const g of duel.games || []) {
      if (g.gameId === myGameId) continue;
      const og = await this.store.getGame(g.gameId);
      if (og) others.push(og);
    }
    const isCreator = duel.creatorGameId === myGameId;
    const opponents = isCreator ? others : others.filter((o) => o.id === duel.creatorGameId);
    const matchups = opponents.map((opp) => this.compare(me, opp));
    return { id: duel.id, isCreator, waiting: matchups.length === 0 || matchups.every((m) => !m.opponentFinished), matchups };
  }

  compare(a, b) {
    const rows = [];
    let mine = 0, theirs = 0;
    const done = !!b.finishedAt;
    for (let i = 0; i < ROUNDS; i++) {
      const ra = a.rounds[i] || {}, rb = b.rounds[i] || {};
      const clash = done && ra.answerId != null && ra.answerId === rb.answerId;
      const pa = (ra.points || 0) * (clash ? 0.5 : 1);
      const pb = (rb.points || 0) * (clash ? 0.5 : 1);
      mine += pa; theirs += pb;
      rows.push({
        idx: i, clash,
        mine: { display: ra.display || null, points: Math.round(pa), tier: ra.tier || 'miss' },
        theirs: done ? { display: rb.display || null, points: Math.round(pb), tier: rb.tier || 'miss' } : null,
      });
    }
    mine = Math.round(mine); theirs = Math.round(theirs);
    return {
      opponentFinished: done,
      rows,
      mine,
      theirs: done ? theirs : null,
      outcome: !done ? 'waiting' : mine > theirs ? 'win' : mine < theirs ? 'loss' : 'tie',
    };
  }

  // ---------------------------------------------------------------- views

  publicRound(r) {
    return {
      idx: r.idx,
      status: r.status,
      deadline: r.deadline,
      display: r.display || null,
      points: r.points || 0,
      tier: r.tier || null,
      share: r.share != null ? +r.share.toFixed(5) : null,
      reason: r.reason || null,
      wrong: (r.attempts || []).filter((a) => !a.ok).map((a) => a.text),
      flags: r.flags || [],
    };
  }

  publicGame(g) {
    return {
      id: g.id,
      mode: g.mode,
      date: g.date,
      puzzleNo: g.puzzleNo,
      duelId: g.duelId,
      roundCount: g.mode === 'endless' ? null : ROUNDS,
      rounds: g.rounds.map((r) => this.publicRound(r)),
      lives: g.lives,
      total: g.total,
      finished: !!g.finishedAt,
      suspicious: !!g.suspicious,
    };
  }
}

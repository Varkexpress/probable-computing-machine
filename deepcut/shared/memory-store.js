// In-memory Store for the Engine. Used by tests and, with snapshot()/restore(), by the
// browser's offline mode (persisted to localStorage).
import { compilePack } from './pack.js';
import { squash } from './normalize.js';

/** Turn raw content packs into engine prompts with stable answer ids. */
export function compilePrompts(rawPrompts) {
  const { prompts } = compilePack(rawPrompts);
  return prompts.map((p) => ({
    ...p,
    answers: p.answers.map((a) => ({ ...a, id: squash(a.display), source: 'seed' })),
  }));
}

export class MemoryStore {
  constructor(prompts) {
    this.prompts = new Map(prompts.map((p) => [p.id, { ...p, answers: [...p.answers] }]));
    this.data = { stats: {}, misses: {}, games: {}, daily: {}, scores: {}, duels: {}, added: {} };
  }

  snapshot() { return this.data; }
  restore(data) {
    if (!data) return;
    this.data = { stats: {}, misses: {}, games: {}, daily: {}, scores: {}, duels: {}, added: {}, ...data };
    for (const [pid, list] of Object.entries(this.data.added)) {
      const p = this.prompts.get(pid);
      if (p) for (const a of list) if (!p.answers.some((x) => x.id === a.id)) p.answers.push(a);
    }
  }

  async allPrompts() { return [...this.prompts.values()].map((p) => ({ id: p.id, cat: p.cat })); }
  async getPrompt(id) { return this.prompts.get(id) || null; }

  async getStats(pid) {
    const s = this.data.stats[pid] || { total: 0, counts: {} };
    return { total: s.total, counts: { ...s.counts } };
  }
  async recordAnswer(pid, aid) {
    const s = (this.data.stats[pid] ||= { total: 0, counts: {} });
    s.total++;
    s.counts[aid] = (s.counts[aid] || 0) + 1;
  }
  async recordMiss(pid, text) {
    if (!text) return;
    const m = (this.data.misses[pid] ||= {});
    m[text] = (m[text] || 0) + 1;
  }
  async topMisses(pid, limit = 5) {
    return Object.entries(this.data.misses[pid] || {})
      .map(([text, count]) => ({ text, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }
  async addAnswer(pid, { display, aliases, weight, source }) {
    const p = this.prompts.get(pid);
    const a = { id: 'x-' + squash(display), display, aliases, weight, band: 6, source };
    const existing = p.answers.find((x) => x.id === a.id);
    if (existing) return existing;
    p.answers.push(a);
    (this.data.added[pid] ||= []).push(a);
    return a;
  }

  async createGame(g) { this.data.games[g.id] = g; if (g.mode === 'daily') this.data.daily[g.playerId + '|' + g.date] = g.id; }
  async getGame(id) { return this.data.games[id] || null; }
  async saveGame(g) { this.data.games[g.id] = g; }
  async findDailyGame(playerId, date) {
    const id = this.data.daily[playerId + '|' + date];
    return id ? this.data.games[id] || null : null;
  }
  async addDailyScore(date, total) { (this.data.scores[date] ||= []).push(total); }
  async scoresFor(date) { return this.data.scores[date] || []; }

  async createDuel(d) { this.data.duels[d.id] = d; }
  async getDuel(id) { return this.data.duels[id] || null; }
  async saveDuel(d) { this.data.duels[d.id] = d; }
}

// SQLite implementation of the Engine Store (node:sqlite, Node >= 22.5, no npm dependencies).
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { norm, squash } from '../shared/normalize.js';

const here = path.dirname(fileURLToPath(import.meta.url));

export class SqliteStore {
  /**
   * @param {string} file  database path or ':memory:'
   * @param {Array} prompts compiled prompts (shared/memory-store.js compilePrompts)
   * @param {object} opts  { validator } optional async (prompt, raw) => {valid, display}
   */
  constructor(file, prompts, { validator = null } = {}) {
    this.db = new DatabaseSync(file);
    this.db.exec(readFileSync(path.join(here, 'schema.sql'), 'utf8'));
    this.validator = validator;
    this.q = {};
    this.seed(prompts);
    this.load();
  }

  stmt(sql) {
    return (this.q[sql] ||= this.db.prepare(sql));
  }

  tx(fn) {
    this.db.exec('BEGIN');
    try { const r = fn(); this.db.exec('COMMIT'); return r; } catch (e) { this.db.exec('ROLLBACK'); throw e; }
  }

  /** Upsert content packs. Seed answers are re-synced on every boot; discovered answers are kept. */
  seed(prompts) {
    const now = Date.now();
    this.tx(() => {
      for (const p of prompts) {
        this.stmt(`INSERT INTO prompts(id,text,category,emoji,updated_at) VALUES(?,?,?,?,?)
          ON CONFLICT(id) DO UPDATE SET text=excluded.text, category=excluded.category, emoji=excluded.emoji, updated_at=excluded.updated_at`)
          .run(p.id, p.text, p.cat, p.emoji, now);
        this.stmt(`DELETE FROM aliases WHERE prompt_id=? AND answer_id IN (SELECT id FROM answers WHERE prompt_id=? AND source='seed')`).run(p.id, p.id);
        for (const a of p.answers) {
          this.stmt(`INSERT INTO answers(prompt_id,id,display,band,weight,source,created_at) VALUES(?,?,?,?,?,'seed',?)
            ON CONFLICT(prompt_id,id) DO UPDATE SET display=excluded.display, band=excluded.band, weight=excluded.weight`)
            .run(p.id, a.id, a.display, a.band, a.weight, now);
          for (const al of a.aliases) this.stmt(`INSERT OR REPLACE INTO aliases(prompt_id,alias,answer_id) VALUES(?,?,?)`).run(p.id, al, a.id);
        }
      }
    });
  }

  /** Cache prompts + approved answers in memory; they change rarely and are read on every submit. */
  load() {
    this.prompts = new Map();
    for (const p of this.stmt(`SELECT * FROM prompts WHERE active=1`).all()) {
      this.prompts.set(p.id, { id: p.id, text: p.text, cat: p.category, emoji: p.emoji, answers: [] });
    }
    const byKey = new Map();
    for (const a of this.stmt(`SELECT * FROM answers WHERE status='approved'`).all()) {
      const p = this.prompts.get(a.prompt_id);
      if (!p) continue;
      const ans = { id: a.id, display: a.display, band: a.band, weight: a.weight, source: a.source, aliases: [] };
      p.answers.push(ans);
      byKey.set(a.prompt_id + '|' + a.id, ans);
    }
    for (const r of this.stmt(`SELECT * FROM aliases`).all()) {
      const a = byKey.get(r.prompt_id + '|' + r.answer_id);
      if (a) a.aliases.push(r.alias);
    }
  }

  async allPrompts() { return [...this.prompts.values()].map((p) => ({ id: p.id, cat: p.cat })); }
  async getPrompt(id) { return this.prompts.get(id) || null; }

  async dailyOverride(date) {
    const row = this.stmt(`SELECT prompt_ids FROM daily_schedule WHERE date=?`).get(date);
    if (!row) return null;
    const ids = JSON.parse(row.prompt_ids).filter((id) => this.prompts.has(id));
    return ids.length === 7 ? ids : null;
  }

  async getStats(pid) {
    const total = this.stmt(`SELECT total FROM prompt_totals WHERE prompt_id=?`).get(pid)?.total || 0;
    const counts = {};
    for (const r of this.stmt(`SELECT answer_id, count FROM answer_stats WHERE prompt_id=?`).all(pid)) counts[r.answer_id] = r.count;
    return { total, counts };
  }
  async recordAnswer(pid, aid) {
    this.tx(() => {
      this.stmt(`INSERT INTO answer_stats(prompt_id,answer_id,count) VALUES(?,?,1) ON CONFLICT DO UPDATE SET count=count+1`).run(pid, aid);
      this.stmt(`INSERT INTO prompt_totals(prompt_id,total) VALUES(?,1) ON CONFLICT DO UPDATE SET total=total+1`).run(pid);
    });
  }
  async recordMiss(pid, text) {
    if (!text || text.length > 60) return;
    this.stmt(`INSERT INTO misses(prompt_id,text,count) VALUES(?,?,1) ON CONFLICT DO UPDATE SET count=count+1`).run(pid, text);
  }
  async topMisses(pid, limit = 5) {
    return this.stmt(`SELECT text, count FROM misses WHERE prompt_id=? ORDER BY count DESC LIMIT ?`).all(pid, limit);
  }

  /** Validator hook with a per-(prompt, input) cache so each unknown answer is judged once. */
  async validateUnknown(prompt, raw) {
    if (!this.validator) return null;
    const key = norm(raw);
    const hit = this.stmt(`SELECT valid, display FROM llm_cache WHERE prompt_id=? AND input=?`).get(prompt.id, key);
    if (hit) return { valid: !!hit.valid, display: hit.display };
    const verdict = await this.validator(prompt, raw);
    if (!verdict) return null; // validator unavailable: do not cache
    this.stmt(`INSERT OR REPLACE INTO llm_cache(prompt_id,input,valid,display,model,created_at) VALUES(?,?,?,?,?,?)`)
      .run(prompt.id, key, verdict.valid ? 1 : 0, verdict.display || null, verdict.model || null, Date.now());
    return verdict;
  }

  async addAnswer(pid, { display, aliases, weight, source }) {
    const p = this.prompts.get(pid);
    const id = 'x-' + squash(display);
    const existing = p.answers.find((a) => a.id === id);
    if (existing) return existing;
    const a = { id, display, aliases: [...new Set(aliases.filter(Boolean))], weight, band: 6, source };
    this.tx(() => {
      this.stmt(`INSERT OR IGNORE INTO answers(prompt_id,id,display,band,weight,source,created_at) VALUES(?,?,?,6,?,?,?)`)
        .run(pid, id, display, weight, source, Date.now());
      for (const al of a.aliases) this.stmt(`INSERT OR IGNORE INTO aliases(prompt_id,alias,answer_id) VALUES(?,?,?)`).run(pid, al, id);
    });
    p.answers.push(a);
    return a;
  }

  // ----- games
  rowToGame(row) { return row ? JSON.parse(row.state) : null; }
  async createGame(g) {
    this.stmt(`INSERT INTO games(id,player_id,mode,date,duel_id,total,suspicious,finished_at,state,created_at) VALUES(?,?,?,?,?,?,?,?,?,?)`)
      .run(g.id, g.playerId, g.mode, g.date, g.duelId, g.total, g.suspicious ? 1 : 0, g.finishedAt, JSON.stringify(g), g.createdAt);
    this.stmt(`INSERT OR IGNORE INTO players(id,created_at) VALUES(?,?)`).run(g.playerId, Date.now());
  }
  async getGame(id) { return this.rowToGame(this.stmt(`SELECT state FROM games WHERE id=?`).get(id)); }
  async saveGame(g) {
    this.stmt(`UPDATE games SET total=?, suspicious=?, finished_at=?, state=? WHERE id=?`)
      .run(g.total, g.suspicious ? 1 : 0, g.finishedAt, JSON.stringify(g), g.id);
  }
  async findDailyGame(playerId, date) {
    return this.rowToGame(this.stmt(`SELECT state FROM games WHERE player_id=? AND date=? AND mode='daily'`).get(playerId, date));
  }
  async addDailyScore(date, total, gameId) {
    this.stmt(`INSERT OR IGNORE INTO daily_scores(date,game_id,total) VALUES(?,?,?)`).run(date, gameId, total);
  }
  async scoresFor(date) {
    return this.stmt(`SELECT total FROM daily_scores WHERE date=?`).all(date).map((r) => r.total);
  }
  async dailyStats(date) {
    return this.stmt(`SELECT COUNT(*) AS players, AVG(total) AS avg, MAX(total) AS best FROM daily_scores WHERE date=?`).get(date);
  }

  // ----- duels
  async createDuel(d) {
    this.stmt(`INSERT INTO duels(id,seed,prompt_ids,creator_game_id,games,created_at) VALUES(?,?,?,?,?,?)`)
      .run(d.id, d.seed, JSON.stringify(d.promptIds), d.creatorGameId, JSON.stringify(d.games || []), d.createdAt);
  }
  async getDuel(id) {
    const r = this.stmt(`SELECT * FROM duels WHERE id=?`).get(id);
    return r && { id: r.id, seed: r.seed, promptIds: JSON.parse(r.prompt_ids), creatorGameId: r.creator_game_id, games: JSON.parse(r.games), createdAt: r.created_at };
  }
  async saveDuel(d) {
    this.stmt(`UPDATE duels SET creator_game_id=?, games=? WHERE id=?`).run(d.creatorGameId, JSON.stringify(d.games || []), d.id);
  }

  // ----- optional accounts (cross-device sync by code)
  async createAccount(id, code, profile) {
    this.stmt(`INSERT INTO accounts(id,sync_code,profile,updated_at) VALUES(?,?,?,?)`).run(id, code, JSON.stringify(profile || {}), Date.now());
  }
  async getAccountByCode(code) {
    const r = this.stmt(`SELECT * FROM accounts WHERE sync_code=?`).get(code);
    return r && { id: r.id, code: r.sync_code, profile: JSON.parse(r.profile), updatedAt: r.updated_at };
  }
  async saveAccountProfile(code, profile) {
    this.stmt(`UPDATE accounts SET profile=?, updated_at=? WHERE sync_code=?`).run(JSON.stringify(profile), Date.now(), code);
  }
  async linkPlayer(playerId, accountId) {
    this.stmt(`INSERT INTO players(id,account_id,created_at) VALUES(?,?,?) ON CONFLICT(id) DO UPDATE SET account_id=excluded.account_id`)
      .run(playerId, accountId, Date.now());
  }
}

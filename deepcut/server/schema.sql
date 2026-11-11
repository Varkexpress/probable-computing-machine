-- Deep Cut database schema (SQLite; ports to Postgres with type changes only).
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- One open-ended prompt ("Name a country in Africa").
CREATE TABLE IF NOT EXISTS prompts (
  id          TEXT PRIMARY KEY,
  text        TEXT NOT NULL,
  category    TEXT NOT NULL,
  emoji       TEXT NOT NULL DEFAULT '❓',
  active      INTEGER NOT NULL DEFAULT 1,
  updated_at  INTEGER NOT NULL
);

-- Every accepted answer for a prompt. Seed answers come from the content packs with a prior
-- weight by popularity band; 'llm' answers were discovered by the validator; 'mod' by a human.
CREATE TABLE IF NOT EXISTS answers (
  prompt_id   TEXT NOT NULL REFERENCES prompts(id),
  id          TEXT NOT NULL,              -- stable slug, e.g. 'burkinafaso' or 'x-<slug>' for discovered
  display     TEXT NOT NULL,
  band        INTEGER NOT NULL,           -- 1 reflexive .. 5 deep cut, 6 discovered
  weight      REAL NOT NULL,              -- prior popularity weight
  source      TEXT NOT NULL DEFAULT 'seed' CHECK (source IN ('seed','llm','mod')),
  status      TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('approved','rejected')),
  created_at  INTEGER NOT NULL,
  PRIMARY KEY (prompt_id, id)
);

-- Synonym / alternate-spelling groups. alias is normalized (see shared/normalize.js).
CREATE TABLE IF NOT EXISTS aliases (
  prompt_id   TEXT NOT NULL,
  alias       TEXT NOT NULL,
  answer_id   TEXT NOT NULL,
  PRIMARY KEY (prompt_id, alias),
  FOREIGN KEY (prompt_id, answer_id) REFERENCES answers(prompt_id, id)
);

-- Live submission counters that drive dynamic rarity. total = all accepted answers for the prompt.
CREATE TABLE IF NOT EXISTS answer_stats (
  prompt_id   TEXT NOT NULL,
  answer_id   TEXT NOT NULL,
  count       INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (prompt_id, answer_id)
);
CREATE TABLE IF NOT EXISTS prompt_totals (
  prompt_id   TEXT PRIMARY KEY,
  total       INTEGER NOT NULL DEFAULT 0
);

-- Rejected inputs, for the "funniest miss" reveal and for moderators to find valid answers to add.
CREATE TABLE IF NOT EXISTS misses (
  prompt_id   TEXT NOT NULL,
  text        TEXT NOT NULL,
  count       INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (prompt_id, text)
);

-- Cached validator verdicts so each unknown answer costs at most one LLM call.
CREATE TABLE IF NOT EXISTS llm_cache (
  prompt_id   TEXT NOT NULL,
  input       TEXT NOT NULL,              -- normalized input
  valid       INTEGER NOT NULL,
  display     TEXT,
  model       TEXT,
  created_at  INTEGER NOT NULL,
  PRIMARY KEY (prompt_id, input)
);

-- Optional editorial override of the generated daily schedule.
CREATE TABLE IF NOT EXISTS daily_schedule (
  date        TEXT PRIMARY KEY,           -- YYYY-MM-DD
  prompt_ids  TEXT NOT NULL               -- JSON array of 7 prompt ids
);

-- Guest players are a random id kept in localStorage. Accounts are optional sync codes.
CREATE TABLE IF NOT EXISTS players (
  id          TEXT PRIMARY KEY,
  account_id  TEXT,
  created_at  INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS accounts (
  id          TEXT PRIMARY KEY,
  sync_code   TEXT NOT NULL UNIQUE,       -- e.g. AMBER-OTTER-4821, the only credential
  handle      TEXT,
  profile     TEXT NOT NULL DEFAULT '{}', -- JSON: streaks, best scores, history
  updated_at  INTEGER NOT NULL
);

-- Games and rounds. The full game state is kept as JSON; hot fields are columns for queries.
CREATE TABLE IF NOT EXISTS games (
  id          TEXT PRIMARY KEY,
  player_id   TEXT NOT NULL,
  mode        TEXT NOT NULL CHECK (mode IN ('daily','endless','duel')),
  date        TEXT,
  duel_id     TEXT,
  total       INTEGER NOT NULL DEFAULT 0,
  suspicious  INTEGER NOT NULL DEFAULT 0,
  finished_at INTEGER,
  state       TEXT NOT NULL,
  created_at  INTEGER NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS games_one_daily ON games(player_id, date) WHERE mode = 'daily';
CREATE INDEX IF NOT EXISTS games_duel ON games(duel_id);

-- Finished, clean daily scores for percentile ranks.
CREATE TABLE IF NOT EXISTS daily_scores (
  date        TEXT NOT NULL,
  game_id     TEXT NOT NULL PRIMARY KEY,
  total       INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS daily_scores_date ON daily_scores(date, total);

CREATE TABLE IF NOT EXISTS duels (
  id              TEXT PRIMARY KEY,
  seed            TEXT NOT NULL,
  prompt_ids      TEXT NOT NULL,          -- JSON array
  creator_game_id TEXT,
  games           TEXT NOT NULL DEFAULT '[]', -- JSON [{gameId, playerId}]
  created_at      INTEGER NOT NULL
);

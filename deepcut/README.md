# ⛏ Deep Cut

**The daily game where the obvious answer is worth almost nothing.**

Everyone in the world gets the same 7 open-ended prompts each day ("Name a bird", "Name a bone in the human
body"). You have 25 seconds per prompt. Valid answers score by how *few* players give them: "Apple" barely
scratches the surface, "Salak" digs you hundreds of kilometres toward the Earth's core. 1 point = 1 km, and the
layers are real geology: crust, upper mantle, lower mantle, outer core, inner core at 6,371 km.

No sign-up, no install: open the page and play.

```bash
cd deepcut
npm install          # optional: only installs @anthropic-ai/sdk for LLM validation
npm start            # http://localhost:8787
npm test
```

Requires Node 22.5+ (uses the built-in `node:sqlite`; no other runtime dependencies).

---

## 1. Architecture

```
            ┌───────────────────────── browser (vanilla ES modules, no build, ~45 KB gzipped) ─┐
            │ app.js   screens, timer (rAF), shaft animation, share card, anti-cheat listeners   │
            │ api.js   server adapter ──────────┐   offline adapter: same Engine in-browser    │
            │ sound.js WebAudio synth sfx        │   (MemoryStore persisted to localStorage)     │
            └────────────────────────────────────┼─────────────────────────────────────────────┘
                                                 │ JSON over HTTPS
            ┌────────────────────────────────────▼─────────────────────────────────────────────┐
            │ server/server.js  node:http, static files pre-gzipped + ETag, rate limit, CSP     │
            │      │                                                                            │
            │      ▼                                                                            │
            │ shared/game.js  Engine: rounds, deadlines, matching, scoring, duels, anti-cheat   │
            │      │   uses shared/match.js · scoring.js · daily.js · normalize.js              │
            │      ▼                                                                            │
            │ server/db.js  SqliteStore ── server/schema.sql (prompts, answers, aliases, stats) │
            │      │                                                                            │
            │      └── server/llm.js  optional Claude validator for unknown answers (cached)    │
            └──────────────────────────────────────────────────────────────────────────────────┘
```

Key decisions:

- **One engine, two stores.** Every rule lives in `shared/game.js` and talks to an async Store interface.
  The server uses SQLite; the browser falls back to an in-memory store saved to `localStorage` when no
  server answers (static hosting, offline). Tests run the engine directly.
- **Server-authoritative timing.** The prompt text is only sent when a round starts, the deadline is set
  server-side, and late answers are rejected. Refreshing doesn't reset the clock.
- **Answers never reach the client in server mode.** `/shared/content/` is not served; the client only gets
  the reveal after the round. (In the static build, answers ship to the browser by necessity.)
- **Zero-friction identity.** A random guest id in `localStorage`. Optional "sync code"
  (`MAGMA-WOMBAT-4821`) links devices without email or passwords.
- **Fast.** No framework, no web fonts, no images; static assets are pre-gzipped in memory with ETags, plus
  a service worker for instant repeat visits. Progress animations use `transform` only.

## 2. Gameplay

| Mode | What it is |
|---|---|
| **Daily** | 7 prompts, same for everyone on a calendar date, one attempt per player per day. Drives streaks. |
| **Endless** | Random prompts (never today's daily), 3 lives; a miss costs a life. Personal best depth. |
| **Duel** | 7 fresh prompts; send a link and your friend gets the same 7. Any round where you both typed the same answer, **both lose half** of it. |

Per round: 25 s countdown, unlimited free wrong guesses (each shown struck through), the first valid answer
ends the round. Then the tier reveal (Common / Uncommon / Rare / Epic / Legendary), the drill animates down
the shaft, and you move on when ready (the next prompt is hidden until you click).

After 7 rounds: total depth, layer, global percentile, emoji share card, and the **reveal** for each prompt:
your answer, the most common answer, the rarest answer anyone found, a deep cut nobody has said yet, and the
most popular wrong answer.

Share card (spoiler-free):

```
⛏️ Deep Cut #11
⬜🟦🟪⬛🟨🟩🟦
2,481 km down · Lower Mantle
Deeper than 87% of diggers
🔥 4-day streak
https://deepcut.example
```

## 3. Answer validation

1. **Normalize** (`shared/normalize.js`): lowercase, strip accents/punctuation, `&`→`and`, drop a leading
   "the/a/an". A spaceless form is indexed too (`sea horse` = `seahorse`).
2. **Exact alias lookup** against synonym groups (`Côte d'Ivoire` = `Ivory Coast`, `Litchi` = `Lychee`).
3. **Plurals**: candidate singulars (`cherries`→`cherry`, `mangoes`→`mango`, `cacti`→`cactus`).
4. **Typos** (`shared/match.js`): optimal-string-alignment distance with a length-based budget
   (0 typos up to 4 letters, 1 up to 7, 2 up to 12, 3 beyond). If two different answers are equally close
   the input is rejected rather than guessed.
5. **LLM fallback** (`server/llm.js`, optional): an input not in the database is sent to Claude with a
   strict JSON schema (`valid`, `canonical`, `confidence`). Only high-confidence "valid" verdicts count.
   Every verdict is cached in `llm_cache`, so each unknown string costs at most one call, and accepted
   answers are inserted into `answers`/`aliases` with source `llm` so later players match them instantly.
   Player input is length-capped and wrapped as data; refusals and API errors fall back to "not recognized".
   Enable with `ANTHROPIC_API_KEY`; set `DEEPCUT_LLM=off` to disable, `DEEPCUT_LLM_MODEL` to change model.

## 4. Dynamic rarity scoring

Each answer has a **prior weight** from its popularity band in the content pack
(band 1 reflexive = 40, 2 = 12, 3 = 4, 4 = 1, 5 deep cut = 0.25, LLM-discovered = 0.1). Live submissions then
take over with Bayesian smoothing:

```
prior  = weight / Σ weights for the prompt
share  = (count + K · prior) / (total + K)          K = 150 pseudo-submissions
points = 1000 · clamp((log10(1/share) − 0.7) / 3.3, 0, 1) ^ 1.6     (min 5)
```

| share of players | points | tier |
|---|---|---|
| 20 % | 5 | Common ⬜ |
| 3 % | ~110 | Uncommon 🟩 |
| 1 % | ~225 | Rare 🟦 |
| 0.25 % | ~410 | Epic 🟪 |
| < 0.05 % | 680–1000 | Legendary 🟨 |

On day one the prior alone ranks answers; as players arrive, an answer everyone guesses quickly loses value
(tested: the 40th player to say "Salak" scores a fraction of the first). Answers are scored at submit time.

Percentile = share of today's clean daily scores below yours, blended with a log-normal model until 50
players have finished, so the first players still get a sensible rank.

## 5. Anti-cheat

| Threat | Measure |
|---|---|
| Googling | 25 s server-enforced deadline (+1.5 s network grace); prompt hidden until the round starts. |
| Tab switching | `visibilitychange` + sustained window blur: first time a warning, second time the round is voided (🚫, 0 points). |
| Pasting | `paste`, `drop`, and `beforeinput` paste events blocked in the answer box. |
| Bots / scripts | Answers faster than 900 ms after reveal flag the run; flagged runs keep their score but are excluded from global stats and percentiles. Per-IP token-bucket rate limit, 15 guesses per round. |
| Replaying the daily | One daily game per player per date (unique index); revisiting returns the finished game. |
| Peeking at answers | Answer lists stay server-side; prompts are only revealed per round. |
| Skipping rounds | Rounds must be started in order; starting a new one expires the old one. |

These raise the bar; a determined cheater with a second device can still look things up in 25 s. Flagged
behaviour is logged per round (`flags`) for review.

## 6. Database schema

Full DDL: [`server/schema.sql`](server/schema.sql).

| Table | Purpose |
|---|---|
| `prompts(id, text, category, emoji, active)` | The prompt bank. |
| `answers(prompt_id, id, display, band, weight, source, status)` | Accepted answers with prior weight; `source` = seed / llm / mod. |
| `aliases(prompt_id, alias, answer_id)` | Normalized synonyms and alternate spellings → answer. |
| `answer_stats(prompt_id, answer_id, count)`, `prompt_totals(prompt_id, total)` | Live counters for rarity. |
| `misses(prompt_id, text, count)` | Rejected inputs: "top miss" reveal and a queue for moderators. |
| `llm_cache(prompt_id, input, valid, display, model)` | One validator call per unknown input, ever. |
| `daily_schedule(date, prompt_ids)` | Optional editorial override of the generated schedule. |
| `players(id, account_id)`, `accounts(id, sync_code, profile)` | Guests and optional sync accounts. |
| `games(id, player_id, mode, date, duel_id, total, suspicious, state)` | Game state (JSON) + query columns. Unique `(player_id, date)` for daily. |
| `daily_scores(date, game_id, total)` | Clean finished dailies for percentiles. |
| `duels(id, seed, prompt_ids, creator_game_id, games)` | Duel prompts and participants. |

Content lives in `shared/content/pack-*.js` in a compact format (see `shared/pack.js`):

```js
{ id: 'fruit', text: 'Name a fruit', cat: 'Food', emoji: '🍎',
  a: `Apple; Banana | Mango; Cherry | Kiwi=Kiwifruit; Fig | Rambutan; Lychee=Litchi | Salak=Snake fruit` }
```

Bands are separated by `|` (most to least common), answers by `;`, aliases by `=`.
`npm run check-content` validates every pack (duplicate aliases, band count, size).

The daily schedule is generated deterministically (`shared/daily.js`): seeded shuffles of the whole bank,
7 per day, avoiding repeated categories within a day. Puzzle #1 is 2026-11-01.

## 7. HTTP API

All bodies are JSON and carry `playerId` (GET: query string).

| Method & path | Body | Returns |
|---|---|---|
| `POST /api/game` | `{mode: daily\|endless\|duel, date, duelId?}` | game (existing one for a played daily/duel) |
| `POST /api/game/:id/round/:n/start` | – | prompt text, deadline, remaining ms |
| `POST /api/game/:id/round/:n/answer` | `{answer, flags[]}` | `{valid:false}` or scored round |
| `POST /api/game/:id/round/:n/end` | `{reason: timeout\|void\|skip, flags[]}` | closed round |
| `GET /api/game/:id/results` | – | rounds, reveal, percentile, duel head-to-head |
| `GET /api/duel/:id` | – | duel summary and your matchup |
| `GET /api/daily/:date` | – | players, average, best |
| `POST /api/account` | `{profile}` | `{code}` sync code |
| `GET/PUT /api/account/:code` | `{profile}` | load / save synced profile |
| `GET /api/health`, `GET /api/config` | – | liveness; server mode + whether LLM is on |

## 8. Deploying

- **Server** (recommended): any Node 22.5+ host. `PORT`, `DEEPCUT_DB` (default `data/deepcut.db`),
  `ANTHROPIC_API_KEY` (optional). Put it behind a CDN/proxy that sets `x-forwarded-for`. SQLite in WAL
  mode handles thousands of writes per second on one box; the Store interface is small enough to port to
  Postgres + Redis counters for multi-region scale.
- **Static** (`npm run build-static` → `dist/`): the whole game runs in the browser with built-in rarity
  estimates. Good for demos; no global ranks, no server-side anti-cheat.

## 9. Files

```
deepcut/
  public/           index.html, styles.css, app.js, api.js, sound.js, sw.js, manifest, icon
  shared/           engine + pure logic used by both server and browser
    content/        prompt packs (56 prompts)
  server/           server.js (HTTP), db.js (SQLite store), llm.js (Claude validator), schema.sql
  scripts/          check-content.js, build-static.js
  test/             engine and HTTP tests (node --test)
```

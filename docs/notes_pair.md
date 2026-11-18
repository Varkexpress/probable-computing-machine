# V and Misaki: the through-line (kc58)

All in `src/kc58.js`. One line for the two of them across the whole game, from both POVs. It rests on two things they
build before the kidnapping, which the kidnapping then takes from them:

1. **The seventh step.** Misaki designed V's security. The seventh tread of the back stair (kitchen up to the bedrooms)
   is loose on purpose; everyone who belongs in the house steps over it. She asks V to be the one person who steps on
   it, so that a noise at three in the morning means him. In the infirmary she did not know him: he was "the tall one".
   Afterwards the step means nothing, and she points a gun at him when he brings up the water.
2. **The notebook.** V keeps her quotes in a leather notebook (canon: kc44, kc47, kc48, kc52). Nothing exists on paper
   about her before nine; this is the only record anyone keeps because they want to. After the kidnapping she says
   nothing worth writing down, and the pages stay empty.

The aftermath scenes it connects to: the tall one and Friday (kc46/kc49: `kdDelivered` raises the rebuild score,
because she knows who the tall one was), the shatter (kc53, `kd_shards` already says he starts saying her name at
corners; `k58_creak` is the night that starts it), her hardening and V unable to stop it (kc55: `kd_hard_work` and
`kd_v_cant` gate the cup scenes; the texting rule is dropped or kept).

## Beats, in order

| id | when | POV | what | flags |
|---|---|---|---|---|
| `k58_stair` | normal, day ≥ 2, moved in or tier ≥ 1 | both | the seventh step; step on it, or she learns his step instead | `k58Stair` = `his` / `over` |
| `k58_book` | normal, day ≥ 4, after the stair, tier ≥ 1 | both | she finds the notebook: read it / keep going / (M) write "I WAS HERE" | `k58Book` = `read` / `keep` / `wrote` |
| `k58_first` | normal, day ≥ 6, tier ≥ 2 | both | she falls asleep first for the first time in her life; (V) write it down or do not move | `k58First` |
| `tx_k58_late` | normal, after the stair | M | "It has been fifty-one minutes. You said forty." | `k58Late` |
| `tx_k58_kettle` | normal, after the stair | V | "going in. 40 min" | – |
| `k58_creak` | aftermath, kdD ≥ 3 | both | three in the morning, the stair, the gun on him; ask "…V?" / make him say her name (M); say her name / stand in the light and let her look (V) | `k58Name` = `name` / `look` |
| `k58_pages` | aftermath, kdD ≥ 6 | both | the notebook since: nothing to write; (V) write the date every evening, or put it away | `k58Date` |
| `tx_k58_rule` / `tx_k58_before` | aftermath, after `kd_hard_first` or kdD ≥ 8 | M / V | she stopped texting before jobs; kept or dropped | `k58Rule` = `kept` / `dropped` |
| `k58_cups` | aftermath, after `kd_hard_work` or kdD ≥ 12 | M | V's cold second cup (kc55); drink it, or make one for him | `k58Cup` |
| `k58_cupv` | aftermath, after `kd_v_cant` | V | she leaves him one if the rebuild has started; otherwise keep leaving his, or stop | `k58Cup`, `k58CupKeep` |
| side: **Sit on the back stair** | after `k58_creak`, any post phase, evening/night, every 2 days, 3 times | both | grams; "what did I used to sound like"; she sits on the seventh step | `k58Sit` (0–3) |
| `k58_read` | Act II on | both | the notebook left on the island; (M) write "Still here. Not the same one." / read one aloud / put it back in his coat; (V) leave it out (her response follows the score) or keep it | `k58Read` = `wrote` / `read` / `closed` / `kept` |
| `k58_test` | Act II day 3 on | both | "come up the stair some night, don't say my name"; whether she knows him comes from the score (≥ 5). M can put it off once (comes back three days later). V can break and say her name at the turn | `k58Knew`, `k58Broke`, `k58Wait` |
| `k58_steps` | Act III day 5 on | both | her numbered steps out loud before the yacht; three is left to him only if she knew him on the stair or wrote in the book | `k58Three` = `his` / `hers` |
| `k58_end` | epilogue | both | where they end: `mended` / `kept` / `apart` | `k58End` |

Topics: `k58_t_step` and `k58_t_last` (Misaki asks V), `k58_t_corner` (V asks Misaki; sets `k58Asked`) and
`k58_t_first` (V asks, normal phase). All are pushed to `TDTOP_*` and spliced into `TOPICS_*`.

## The rebuild score (`k58Score()`)

+1 each: a stair arrangement, `k58Book` read or wrote, `k58First`, `k58Name==='look'` (he waits to be recognised),
`k58Rule==='kept'`, `k58CupKeep`, `k58Read==='read'`, `k58Asked`, `kdDelivered`, tier 3.
+2 each: `k58Cup`, `k58Read==='wrote'`. +1 per stair sit (max 3). −1 for `k58Rule==='dropped'`.
Severity of the stay (`S.kd.sev0`): −1 at 4+, −2 at 6+.

- `k58_test`: she knows him if the score is ≥ 5.
- `k58_end`: `mended` if she knew him on the stair and the score is ≥ 7; `kept` if the score is ≥ 3; `apart` otherwise.
  - **mended**: she says "V" into the pillow without opening her eyes; she hums one bar some mornings.
  - **kept**: he says her name at every corner, she knows him because he tells her, the house runs like a safe house.
  - **apart**: she is the best there has ever been at the work; a year-long column of dates with nothing under them.

## Variants

- **Set** (no romance, not married): "a set, like a knife and a fork" (kc44's line), with or without the notebook.
- **Married** (`S.f.married`): the rings on the bedside table by the water; in `apart` she takes hers off for work.
- **Misaki with Ronin/Angel** (`S.rom`, or `k28pair` led by Misaki): the partner is in the bed in `k58_creak` and the
  epilogue; Ronin and Angel each react to not getting the step in `k58_stair`.
- **V with Ronin/Angel** (`S.vrom`, or `k28pair` led by V): the partner is not given the step; in the epilogue asks
  V, half asleep, whether she knew him tonight.
- **Heartbreak** (`S.f.heartbreak`): she no longer lives there; she stays on Sundays and the water still comes up.
- Both aftermath settings: nothing here refers to the hours, the examination or the photographs.
- The lone routes are excluded (`isLone()`); `k58_creak` and later wait for discharge (`kdPost()`).

## Scheduling

- Normal phase: `morningEvent` is wrapped (outermost); at most one `k58_*` beat every other morning, in order. The
  same events are also in `EVENTS`, so the ordinary picker can draw them.
- After the kidnapping: `kdEv` + `KD_ORDER` (appended after kc55), so the aftermath scheduler plays them in story
  order. They keep playing through Act II, Act III and the epilogue as their own conditions allow.
- Ending lines through `extraEnding` (end state, the stair, the broken test, the cup).

## Testing

A Playwright script (kept outside the repo) runs every event with every option on both POVs, all partner/marriage
variants, all three endings, the deferral and V's break in the stair test, both sides of every thread (walked node
by node and once through the real phone), the side option three times plus its gating, every topic, the normal-phase
scheduler and `kdNext()` choosing `k58_creak`.

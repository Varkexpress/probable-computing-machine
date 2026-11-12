# Killer Chat! Off Hours + Mirror Protocol — handoff notes

Repo: varkexpress/probable-computing-machine · branch `claude/game-interactions-sar2ec`
Published: Killer Chat https://claude.ai/artifact/MnV6pegwS3EnxwNsdFiqbk (index.html, published with `files: {"mirror-protocol.html": ".pub/mirror-protocol.html"}`)
Mirror Protocol standalone (private) https://claude.ai/artifact/PYHmmvPdLM33Asj4tNc3rp (mirror-protocol.html)

## Files
- `index.html` (~9k lines, single file): the main game. 320×180 pixel canvas engine. Content is appended as blocks just before the final `requestAnimationFrame(frame);splash();` line. Modify by wrapping function declarations (`const _x=fn; fn=function(){...}`); never reassign `toRoom` (const). Never touch `S` at top level (null at load).
- `mirror-protocol.html`: separate 3D (three.js r128 from cdnjs) Chapter 4 study game + Study hall. Embedded in the main game by an iframe overlay (`mpOpen(view)`), postMessage `mp-progress`/`mp-close` → `mpSync(G)` pays rewards.
- `.pub/mirror-protocol.html`: gitignored publish copy = doctype/head prefix + mirror-protocol.html. Recreate before each publish:
  `{ printf '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'; cat mirror-protocol.html; } > .pub/mirror-protocol.html`

## Main game (index.html) systems
Story: Misaki (hitmeuppp, contract killer, nonbinary, she/they) and V (K9, billionaire vigilante), friends Angel (Angelic) and Ronin (ronin.beaufort), Inspector Hara, the Cartographer.
Phases: normal → taken (kidnapping when rent paid twice, S.f.kidnapSet) → after → act2 (copycat case) → act3 (The Ledger, 10 days, 6 endings) → epilogue.
Key APIs: say, ask, cut, panel, hub, sideHub, epiOpts, EVENTS (morning), QUESTS/qStart/qAdv, ROOMS + PLACES (areas), TOPICS_V/TOPICS_M (talk), ACH, apply/fr/frT/tier/calm, ME2/ME3/isM/isV/isLone, mVoice/MV.
Added content: Act III, interludes, years-later, endgame talks, Act II interviews; 5 areas (harbour, park, laundromat, shrine, last train) + Misaki detachment arc (pall block); Chapter 4 geometry woven in (GEO module, geoAsk overlays on contracts/lockpick/simon/stealth, talk topics, morning problems, Geo HUD); 3D sniper contracts (`snipeContract`, modes lead/water/turn/drone); wardrobe/outfits (palette swaps on MIS.P/VSP.P, `wardrobe()`), backstory topics (fencing, St. Aldric’s, drama club, track, nonbinary/leaving home), 6 new recipes with DISH sprites, train destinations (aldric, oldtrack, coast) with épée and 400m minigames; Study hall hub entry (`mpOpen('prep')`); **Benchmark saves** on the title screen (`benchPanel`, `BENCH`: day-before-kidnapping M/V, Act II M/V, Act III M/V, Epilogue M/V; all relationships maxed via `benchMax`).

## Mirror Protocol (mirror-protocol.html)
- Chapter 4 cases (all unlocked): lessons, mastery practice, 3D missions, final Ledger + 20-question exam.
- Study hall (`prepHome`): shared item engine (`TYPES*` generators → `{skill,prompt,fig,parts,steps}`; part kinds pt/num/sel/mc/multi/graph/rule; `gradeItem`, `custom13`, `custom18`), `startTest(order,key,label)`, `startQuiz`, `moduleView`.
  - Proof toolbox (TOOLS, 63 entries; reference/search, flashcards, test x1–x6, MODS6)
  - Set 1 Ch.4 transformations (TYPES t1–t20, MODS m1–m17, 20-q test)
  - Set 2 coordinate plane (c1–c16, MODS2)
  - Set 3 Ch.5 congruent triangles (p1–p17, MODS3 q1–q10) + expansion (p18–p27, q11–q16, Proof exam), PROOFS/THM_PROOFS templates with dependency arrays `d` (any valid order accepted), proof diagrams (`geoPic`, `PICS`, `proofPic`)
  - Chapter 5 test walkthrough (TYPES5 w*, MODS5 z*, WALK_ORDER retake)
  - Set 4 AMC training (`amcHome`): bank `AB` of 1877 original verified problems (779 + 599 in round 5, b21-b25, + 499 in round 6, b26-b30; rounds 5-6 written with full walkthrough solutions) (rounds: 84 + 168 + 176 + 176 + 176, one duplicate removed at load) (84 + 168 added in the expansion block; checkers in the scratchpad were not committed) across 17 `UNITS` (AMC 12 units A4 logs, T1 trig/complex, A5 polynomials/conics, C2 advanced counting, G4 advanced geometry), `amcRebuild()`, real past-contest links (`pastView`, AoPS wiki); `HANDBOOK` (12 chapters, 81 sections; `handbookView`), 3D visual lab (`VIS`, `visualLab`, 20 models), mistake notebook (`G.prep.amc.miss`), daily five, speed round, topic tests, MODS4 rebuilt as r_<unit> with worked-problem lessons; generators TYPES4; `amcContest(10|12)`, hard drill, formula sheet
  - Game layer (`G.prep.game`): XP and levels (`xpNeed`, `RANKS`), combo multiplier up to 2x, daily goal/streak, daily quests, 19 `BADGES`, unit mastery stars, boss battles per unit (`bossStart`, 3 hearts, 3D boss), Arena view, hints at half XP (`addHint`), interactive step reveal (overridden `stepsHTML`), WebAudio sfx (`gsfx`), level-up overlay. Wraps `gradeItem`, `quizQ`, `amcEnd`, `amcHome`.
  - Game modes (`G.prep.game` fields `survBest`, `gauntlet`, `chestDay`, `bzBest`, `coins`, `inv`, `theme`, `title`, `dayXP`, `rivalDay`): Survival (`survStart`), the Gauntlet (`gauntStart`), daily chest (`chestOpen`), Blitz 60-second mental math (`blitzStart`, generators `BZG`), shop (`shopView`: power-ups `PU` 50/50, combo shield, Double XP; accent `THEMES` via `--tape`; `TITLES`), loot drops, daily rival XP target (`rivalTarget`), boss taunts (`TAUNT`), confetti/shake/combo banner, keyboard (A-E or 1-5 pick, Enter submit/next). All wrap `gmAward`, `addHint`, `bossQ`, `gauntQ`, `arenaView`, `gmHud`.
  - Case files campaign (`CASES`, 9 story cases of 4 problems, `casesView`, `caseStart`, progress in `GM.cases`), progress report (`reportView`, per-unit accuracy in `GM.ua`), grouped AMC home with a recommended next step (`gmRecommend`), mute toggle (`GM.mute`).
  - 2022 AMC 10A anatomy (user-supplied PDF used only as a style model; official text not included): `TWIN_BP` blueprint (topic + technique per problem in our words), 75 original twin problems in `AB` with `tw` (problem number) and `src:'2022A'`, views `twinView`, `twinMock` (25 problems, one twin per number). AMC bank now 1952.
  - Trainer shell (standalone view only, `TRAINER=!EMBED`): top nav Home/AMC/BMT 2026/Arena/Progress (`trainerHome`, `progressView`), full-width pages, 3D canvas shown only in the visual lab (`show3d`), old chapter screens (`title`, `prepHome`) redirect to the dashboard. Killer Chat embed keeps the old Mirror Protocol layout.
  - BMT forecast (from the user's two BMT 2026 PDFs): `BMTF` data (slot forecasts, topic checklist, topic frequency, 1,058-row past-paper index), views `bmForecast`, `bmTopics`, `bmLog`; General = 25 problems no calculus; Guts points 10..25 (max 420) with estimation set `EST` scored by `estScore`; tiebreakers `bmTest('tb')`; focus tests pick slot-matched problems (`sl` field) via `bmPickSlot`. BMT bank now 588 problems + 24 estimation + 5 Power sets.
  - BMT 2026 training (separate Study hall card `#pBMT`, `bmtHome`): bank `BP` of 399 short-answer problems `{t:alg|dis|geo|calc,d,q,a,v,s,g?}` graded numerically by the safe parser `bmParse`/`bmCheck`; Power round sets `PW` (5 themes, 50 pts each, self-graded rubrics); modes `bmPractice`, `bmTest(focus|general)`, `bmGuts` (9 sets of 3, 75 min), `bmPowerList`; lessons `BMT_GUIDE`, `BMT_CALC`; progress in `G.prep.bmt`. Sources and checkers in the scratchpad `bmt/` folder (not committed).
  - `SOLX` block: every one of the 779 bank problems has an expanded solution (Key idea, 5-9 steps, Check, Answer), keyed by question text and applied to `AB` at load, then `amcRebuild()`. Keyed answers were re-verified in Python while writing them.
- Progress in localStorage `mirror_protocol_v1` (G).

## Testing
Playwright is installed globally (`require(execSync('npm root -g')+'/playwright')`). cdnjs is blocked in this container: route `**/three.min.js` to abort (or a local copy via `npm pack three@0.128.0`). Typical checks: generate each TYPE 600× and validate answer is in choices / no NaN; take each test answering from `window.__curItem`; random fuzz of the main game.

## Known gaps / honest status
- Main-game rooms are still 2D pixel art; 3D is in sniper jobs and Mirror Protocol.
- The five areas and the detachment arc (pall block) were never fully play-tested.
- Page references a `downloads` capability that is not declared (export button won’t work in the artifact).
- Chapter 5 problems are original, modeled on Big Ideas style (the online textbook was unreachable).

- The Killer Chat artifact was republished from another session (larger index.html, downloads capability declared, mirror-protocol.html removed). This session did not overwrite it; merge before republishing.

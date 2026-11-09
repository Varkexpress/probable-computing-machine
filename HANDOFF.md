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
  - Set 4 AMC training (`amcHome`): bank `AB` of 252 original verified problems (84 + 168 added in the expansion block; checkers in the scratchpad were not committed) across 17 `UNITS` (AMC 12 units A4 logs, T1 trig/complex, A5 polynomials/conics, C2 advanced counting, G4 advanced geometry), `amcRebuild()`, real past-contest links (`pastView`, AoPS wiki), MODS4 rebuilt as r_<unit> with worked-problem lessons; generators TYPES4; `amcContest(10|12)`, hard drill, formula sheet
- Progress in localStorage `mirror_protocol_v1` (G).

## Testing
Playwright is installed globally (`require(execSync('npm root -g')+'/playwright')`). cdnjs is blocked in this container: route `**/three.min.js` to abort (or a local copy via `npm pack three@0.128.0`). Typical checks: generate each TYPE 600× and validate answer is in choices / no NaN; take each test answering from `window.__curItem`; random fuzz of the main game.

## Known gaps / honest status
- Main-game rooms are still 2D pixel art; 3D is in sniper jobs and Mirror Protocol.
- The five areas and the detachment arc (pall block) were never fully play-tested.
- Page references a `downloads` capability that is not declared (export button won’t work in the artifact).
- Chapter 5 problems are original, modeled on Big Ideas style (the online textbook was unreachable).

- The Killer Chat artifact was republished from another session (larger index.html, downloads capability declared, mirror-protocol.html removed). This session did not overwrite it; merge before republishing.

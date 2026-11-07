# Killer Chat! Off Hours + Mirror Protocol — handoff notes

**Two separate builds.** `index.html` (Killer Chat) has no math in it any more. All math lives in `mirror-protocol.html` (Mirror Protocol): the Chapter 4 cases, Study hall, exam, AMC prep, proof toolbox, and the 3D rooftop sniper contracts (ported from Killer Chat; card on the case board, `snipeContract`, results in `G.snipe`). Killer Chat no longer embeds Mirror Protocol, no longer loads three.js, and the GEO/geoAsk/mpOpen/Cartographer-geometry block was replaced by a stub (`mpHub` returns [] so the wardrobe hook still works). Old saves keep harmless `S.f.mp`/`S.f.geo` fields.

Repo: varkexpress/probable-computing-machine · branch `claude/kind-hamilton-9u4jq0` (walkable-house overhaul; earlier work on `claude/game-interactions-sar2ec`)
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

## Walkable house (TD block in index.html, between `/* ===TD-BEGIN=== */` and `/* ===TD-END=== */`)
The trailer and all of V's base are no longer side-view backdrops: they are 3/4 top-down tile maps you walk through.
- Maps (`TD.maps`): `trailer` (interior, tiny bathroom, the lot, behind the trailer), `base` (atrium, archive behind the vault, greenhouse, training hall, east corridor + kennel, V's bathroom), `ewing` (hallway, bedroom, the 7 wing rooms; wing doors stay locked until `S.wing[k]`), `ops`, `roof`, `garage`, `cellar`. ASCII rows live in `TDROWS` (`#` wall, `w` window wall, `.` floor, `D` door, `_` threshold, `=` stairs, `g/G/a` gravel/grass/asphalt). Each zone maps to a legacy room id (`z.room`), so `S.room`, partner NPCs, music and every `toRoom(id,[x,y])` still work.
- Hook: `roomScene` is wrapped last; for any room in `TD.room` it returns `tdScene(...)`. `scene.pos()` answers in legacy side-view coordinates, so `toRoom(S.room,S.roomPos)` returns you to the exact tile (via `TD.resume`). Arrivals from the hub use `z.arrive`; legacy coordinates with a fixed meaning use `z.at['x,y']`.
- Props: `{id,x,y,w,d,h,draw,label,act(who,legacyFn,prop,scene),legacy:'Spot label',wall,flat,seat,clutter,push,exit,light,show}`. A prop with `legacy` claims that `ROOMS[room].spots` entry; unclaimed spots are auto-placed (side-view x/y → zone x/y) so new content added the old way still appears. `kind:'deco'` claims a spot without being interactive. `TDHIDE` hides legacy "→ room" transition spots (doors and stairs are physical now).
- Systems: collision + corner sliding, bump-to-open doors (`doorOpt`: `closed`, `locked`, `onLocked`, `noUse`, custom `draw`), tap-to-walk with BFS pathing, seats (`sc.sitOn`), clutter that slows you, pushable crates (garage), lights (`M.lights`, prop `light`) composited on a low-res light map, window light shafts with rain shadows, dust/steam/mist/drip particles, outdoor rain/snow/fog, blurred foreground layers for depth of field (`M.fg`), dog follower that trails you through doors.
- Story: `TDREACT` (companion barks/inner monologue triggered by where you stand, what you've touched, phase/weather), drawer "layers" (`tdLayer`), new talk topics `TDTOP_V`/`TDTOP_M` unlocked by finds (ceiling stars 49.8, coach's New Year cards, V's coat pocket clip, Persuasion underline, unsent "Stay." draft, the bike behind the crates, the keep-list). State in `S.td` (`l` lights, `door`, `dr` drawers, `f` flags, `seen`).
- Trailer puzzle: heater + kettle + main light trips the breaker; fix it at the post behind the trailer. Lights off at night + lie on the bed shows the stars.
- Voices: Misaki's speech gets more complex as the relationship deepens — the cheerful mask comes off. The original `mVoice` (slang expansion, sentence case) is kept and extended: from level 2 her performative tics drop (`:)`, lol, hehe, `!!`), at level 3 her ALL-CAPS shouting and `!` settle into plain sentences. Write her lines low-tier whimsical, high-tier sincere (use `MV(...)`). `vVoice` (wrapped into `showL`) lets V's contractions slip at close/ride-or-die, deterministically per line, never when `S.dark`.
- Pause menu → "Rooms: walkable/classic" toggles `META.classicRooms` (classic side view fallback).
- Performance: sprites are cached per palette in `TDSPR`; depth-of-field draws foreground shapes into a 1/3-res buffer and upscales (no `ctx.filter`). ~5 ms/frame in headless software rendering.
- Rebuild workflow used: the TD source was kept as separate files and spliced between the markers; editing in place inside the markers is fine too.

## UI 2 (block between `/* ===UI2-BEGIN=== */` and `/* ===UI2-END=== */`, last before the boot line)
- HUD: one row — menu, DAY + four time-of-day pips + phase tag, POV stats as labelled bars (energy/heat/edge or rep/conscience, plus composure when dark and "holding on" when alone), bond bar (trust/tension/morale in its tooltip), icon buttons with badges (bag new-items, phone unread). The key cheat-sheet under the stage is one line.
- Bag (`bagOpen`, key I, HUD 🎒, pause menu): tabs All/Gifts/Food/Tools/Keepsakes (keys 1–5, Shift cycles), pixel icons (`IICON` → `iconURL`, dishes get a bowl), detail pane with description (`IDESC`, recipe notes), eat effects (`IEAT`, recipe `eff`), gift tastes per person that show "? not given yet" until you give it, actions Eat / Give to <whoever is within reach> (reuses `giftMenu`/`friendGift`) / Inspect (an in-voice thought), sorting, new-item dots (`S.f.bagSeen`). Keepsakes are built from walkable-house finds (`S.td.f`), the floorboard photo and your photos. Runs as `ctrl`, so the world pauses and arrows/gamepad drive it.
- Dialogue: choices are numbered (keys 1–9), choices you picked before are dimmed with ✓ (`META.seenO`), SKIP button / hold Ctrl skips only lines already read (`META.seenL`) and stops at choices and unread lines, the dialogue box border takes the speaker's colour.
- Notifications: `toast` is a stacked feed (max 4) with item icons for "Got:" and colour per kind.
- Pause menu: grouped into Play / Settings / Leave with key hints; Bag added.

## The world instead of menus (td6 block, inside the UI2 markers after ui2)
- No list day-planner by default: `hub()` still builds every option (all story logic untouched), but `panel` is captured (`WH.cap`) and the player is put home instead (`whHome`: trailer, or V's bedroom/atrium; wakes by the bed in the morning). Options live on objects (`WHBIND`: contracts on the trailer laptop; ledger/trace/meeting on the ops terminal; kennel shift on the grooming table; sleep on beds; wardrobe on the bin bag / bedroom wardrobe; long drive on Misaki's truck) and everything else is a pin on the city map (`cityMap`, `WHPLACES` regex → place) or a sticky note under TODAY. Exits (lot edge, side door, elevator up, garage door, Esc "Head out") open the map. Pause menu toggle "Day planner: list menu" (`META.menuHub`) restores the old panel.
- The 1–9 choice hotkeys/badges are gone; seen-choice ✓ and read-line skip remain.
- Phone: `#phBtn`, a small phone in the bottom-left of the stage, buzzes with an unread badge.
- Underground base: every base zone except the atrium has `under:1` (constant artificial light, ceiling strip fixtures, bunker walls with pipes, light-well slit windows, no sun shafts). Ops is sub-level 1 (stairs go down); the roof is reached by a spiral stair in the atrium.
- Outfits: `FPATCH` row patches change silhouettes (rows <24 replaced, leg rows recoloured so walk frames still animate). New: Hood up, Black trench, Cardigan & pleats, Leather & denim, Star pyjamas, The black dress; rain gear gets a hood with ears.
- Plot fixes: Misaki no longer appears in her trailer while taken / gone / moved in / locked out; while she's taken V finds the trailer door open and her shoe in the gravel; during the after-phase lockout the trailer door won't open and she sleeps in the truck cab; keepsakes are per-POV.
- New interactions: Misaki's truck (+ glovebox layers), coin jar, intercom, grey locker go-bag (+ talk topic), fuse board, archive vent, daylight switch in the east wing, dog ramp, garage door.

## Bug-fix pass (td7, last in the UI2 markers)
- One of everyone: in house rooms (`HOUSE`) V only appears where `vWhere()` says, Misaki where `misWhereBase()` says, Angel/Ronin where `angWhere()`/`ronWhere()` say; Angel/Ronin aren't in their own flats while visiting the house. (The wing rooms used to all report V at once.)
- Ronin's apartment and Angel's studio are walkable maps now (`ronin`, `studio`), friends drawn natively and wandering.
- Side-facing sprites no longer overwrite half the face (`tdSide` removed); side view uses the front sprite.
- Legacy speech bubbles wrap and stay inside the zoomed camera view.
- Layout fixes found by an automated reachability audit: V's bathroom sink was in the doorway, trailer yarn basket nearly blocked the front door, lab bench blocked the lab door, trophy cases walled off the room, greenhouse "Fogged glass" was behind the tomatoes, stream setup boxed in the manga shelf. Wall items now have a longer reach (`p.reach`, default 24).
- Audit script approach (worth re-running after map edits): BFS every map from its arrival with doors open, flag walkable tiles that can't be reached and interactables with no reachable tile within 14px; then trigger every spot/prop/NPC in every room across benchmarks and catch errors. Last run: 0 unreachable, ~430 interactions per run × 4 benchmarks, 0 errors.

## Expression portraits (td8, last block)
- V and Misaki dialogue portraits come from the expression charts in `art/` (`v_expressions_source.webp`, `misaki_expressions_source.webp`), sliced 3×3, downscaled to 84px and quantized to 48 colours (`art/portraits/*.png`), embedded as `XPORT` data URLs.
- V: neutral, calm, angry, surprised, stern, smile, shout, fluster, content. Misaki: neutral, talk, annoyed, surprised, cry, smug, shout, fluster, content.
- `xPickExpr(k,text)` chooses per line (anger words, CAPS/!!, love words, grief words, short questions, thanks/home, laughter, dark mode), falling back to neutral/calm/talk. Phone uses today's mood. To force one, set `canvas.dataset.ex` before `drawPortrait`.

## Mirror Protocol (mirror-protocol.html)
- Chapter 4 cases (all unlocked): lessons, mastery practice, 3D missions, final Ledger + 20-question exam.
- Study hall (`prepHome`): shared item engine (`TYPES*` generators → `{skill,prompt,fig,parts,steps}`; part kinds pt/num/sel/mc/multi/graph/rule; `gradeItem`, `custom13`, `custom18`), `startTest(order,key,label)`, `startQuiz`, `moduleView`.
  - Proof toolbox (TOOLS, 63 entries; reference/search, flashcards, test x1–x6, MODS6)
  - Set 1 Ch.4 transformations (TYPES t1–t20, MODS m1–m17, 20-q test)
  - Set 2 coordinate plane (c1–c16, MODS2)
  - Set 3 Ch.5 congruent triangles (p1–p17, MODS3 q1–q10) + expansion (p18–p27, q11–q16, Proof exam), PROOFS/THM_PROOFS templates with dependency arrays `d` (any valid order accepted), proof diagrams (`geoPic`, `PICS`, `proofPic`)
  - Chapter 5 test walkthrough (TYPES5 w*, MODS5 z*, WALK_ORDER retake)
  - Set 4 AMC 10 (TYPES4 a/n/k/g*, MODS4 r0–r4, `amcContest` 25 q, 6/1.5/0 scoring)
- Progress in localStorage `mirror_protocol_v1` (G).

## Testing
Playwright is installed globally (`require(execSync('npm root -g')+'/playwright')`). cdnjs is blocked in this container: route `**/three.min.js` to abort (or a local copy via `npm pack three@0.128.0`). Typical checks: generate each TYPE 600× and validate answer is in choices / no NaN; take each test answering from `window.__curItem`; random fuzz of the main game.

## Known gaps / honest status
- The trailer and base are walkable top-down maps now; the city areas (mall, harbour, park, laundromat, shrine, station, Kyoto, train destinations, Ronin's and Angel's flats) are still side-view rooms. To convert one, add a `tdMap` with a zone whose `room` is that id.
- Two Wardrobe spots exist in the bedroom; `legacyN:1` picks the second.
- The five areas and the detachment arc (pall block) were never fully play-tested.
- Page references a `downloads` capability that is not declared (export button won’t work in the artifact).
- Chapter 5 problems are original, modeled on Big Ideas style (the online textbook was unreachable).

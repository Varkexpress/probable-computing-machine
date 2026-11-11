# Killer Chat! Off Hours + Mirror Protocol — handoff notes

**Two separate builds.** `index.html` is Killer Chat, the game. `mirror-protocol.html` is Mirror Protocol, the math/study build (Chapter 4 cases, Study hall, exam, AMC prep, proof toolbox, 3D rooftop sniper contracts). Killer Chat contains no math, does not load three.js, and does not embed Mirror Protocol. A stub (`mpHub` returns []) keeps old hooks working, and old saves keep harmless `S.f.mp`/`S.f.geo` fields.

- Repo: varkexpress/probable-computing-machine · branch `claude/pensive-darwin-liv1h1` (built on `claude/kind-hamilton-9u4jq0`)
- Killer Chat (shared by link): https://claude.ai/artifact/MnV6pegwS3EnxwNsdFiqbk. Publish `index.html` to this URL; it declares the `downloads` capability (save export).
- Mirror Protocol (private, current): https://claude.ai/artifact/28zaMP5DnkNWXGy949BPfJ. An older copy is at https://claude.ai/artifact/PYHmmvPdLM33Asj4tNc3rp.

## Read this first: two lineages were merged

This branch now contains **both** of the game's parallel lines of work, which had been built separately from the same commit (`f2dcb62`):

1. **The setting rework** (from `claude/pensive-darwin-liv1h1`): the unnamed city, the hounds, the four as frightening serial killers, B5 as V's experimental wings, Misaki after the kidnapping, the sanctuary, the black bath, Japan as an overseas trip. Its modules are `src/td19.js` … `td29.js`. Its rules are in "Setting and character rework — read this first" below and **override older notes**.
2. **The phone / voice / kidnapping line** (from `claude/kind-hamilton-9u4jq0` plus this session): Phone 2, Maria, the group chat, what it costs, the voice and tic passes, The Long Leash, the event picker, and the whole kidnapping arc. Because both lines had files named `td19.js` … `td29.js` with unrelated contents, **this line's modules were renamed `src/kc19.js` … `kc35.js`**. Every "kcNN" in this file used to be "tdNN" on the old branch.

How the merge was done, so it can be audited:
- `git merge -X theirs`: where both sides changed the same line, **the rework's version won**. That means some lines in the original region and in `td3`–`td18` lost the voice/tic pass and now read as the rework wrote them. Lines only one side touched kept that side's change.
- Build order (`tools/build.py`): `td…td18`, the rework's `td19`–`td29`, then `kc19`–`kc35`.
- Restored by hand after the merge: this session's `takenM` and `takenV` text (the rework had edited those lines).
- The rework's rules were then applied to the `kc` modules' text: hounds have no names in visible text ("the grey hound", "the old hound", "the black hound", "the pale hound"; she counts "grey, old, black, pale" in the chair); "dog" → "hound"; no konbini/onigiri/yen/shrine/pachinko; Inspector Hara → Hale. `kc25` (The Long Leash, a separate universe) was left alone.
- Removed for breaking the rework's rules: the sock scene (`g_pancake`), the stray cat and its thread (`g_cat`, `tx_g_receipt`), the dolls'-day birthday options, the "name the wing after the oldest dog" option. `tx_rjune` is disabled (June is no longer canon). The night market is under a flyover.
- Reconciled afterwards: V’s childhood in the lower floor is gone from the `kc` modules (the “hour 70” topic, the logbook lines, “since I was nine”); the Ferris-wheel promise is now just “I told you once that I would find out”; no coach, June, flower-room-as-exhibit or theme-park references remain in `kc` text. `docs/VOICE.md` is unchanged and still applies.

## The aftermath scheduler (kc35) — why scenes were not appearing

The scenes after the kidnapping (doctor, examination, photographs and the rest, about sixty of them) were registered as ordinary morning events, where one is drawn at random per morning. Most players never saw most of them. They are now marked `kd:1` and only eligible while the scheduler asks (`KD_RUN`): once she is out of the infirmary, `kdNext()` plays the next due scene **every morning and again the first time the day planner opens in the afternoon, evening and night**, in the order `KD_ORDER`. A simulated week shows four scenes a day in story order for both POVs. Each scene still needs its own conditions.

## Start here (state as of the last round)
- **Writing rules:** read `docs/VOICE.md` (voice per character + the author's ten-tic list) and `docs/voice_sample.md` (the author's own writing) before writing any line. Every line in the game has been through a voice pass and a tic pass.
- **Latest work:** the kidnapping arc rewritten end to end (`kc27`, `kc28` and the original functions; see the last two sections). Before that: the alternate-universe mode (title screen → Alternate universes → The Long Leash, `kc25`); night fixes (people asleep only some nights, fairer morning-event picker, `kc26`); city-map pins for Angel and Ronin moved out from under the TODAY notes panel (`td6` WHPLACES).
- **Open decisions for the author:**
  - V's history: the rewrite made him a practised killer who feeds his animals (see "V is now a practised killer"). Ask whether the old fall-from-grace arc (paper-only creed, conscience beats) should come back.
  - Ronin's backstory detail added by us: a shed back home he burned when he left town (kc24 `tx_rvdown`). Unconfirmed.
  - kc27 added canon about Misaki’s blank (see the list at the end of “The room with one bulb”). Confirm or revert.
  - Option labels the tic pass changed, e.g. "He looked back. Now you look back." → "Find him and kill him". Revert any the author dislikes.
- **Workflow:** after each round build, run the suite below, update this file, commit, `git push -u origin claude/peaceful-babbage-efje6m`, republish `index.html` to the Killer Chat artifact. Commit messages end with the attribution lines given by the session.
- **Big text passes:** split `index.html`'s original region into line ranges and have each worker produce `["old","new"]` JSON pairs, applied with `python3 tools/apply_pairs.py pairs.json START END --write` (pairs never add lines, so ranges stay valid). Edit `src/` files directly. Afterwards check structure with a token diff (strings masked) and compare menus/events before and after.

## Files
- `index.html`: the built game (one file, ~10k lines, 320×180 canvas). Two regions are generated by the build:
  - `/* ===TD-BEGIN=== */ … /* ===TD-END=== */`: the walkable top-down engine and the house.
  - `/* ===UI2-BEGIN=== */ … /* ===UI2-END=== */`: UI, world map, and every later content module.
  - Everything outside those markers is the original game, edited in place in `index.html`. Story beats like `takenM`, `afterBase` and `startAct2` live there.
- `src/`: the source of the two generated regions.
  - `td1_engine.js`, `td2_scene.js`, `td3_trailer.js`, `td4_base.js`, `td5_story.js` → TD block.
  - `ui2.js`, `td6.js` … `td29.js` → UI2 block. Load order is in `tools/build.py`; td12 loads before td11 on purpose.
  - `maps.json`: tile rows for every top-down map.
  - `deep_rooms.json`, `city_rooms.json`: room rectangles, emitted as `TD_DEEPROOMS` / `TD_CITYROOMS`.
- `tools/`:
  - `build.py`: rebuilds the generated regions of index.html from src/.
  - `gen2.py`: deep house B3–B5 and the forest. `gen3.py`: city districts. `gen4.py`: widens Ronin's/Angel's flats. Each rewrites its maps in `src/maps.json`.
  - `audit.js`: reachability of every tile and object, plus every interaction on four benchmark saves.
  - `fuzz2.js`: random play. `phone_test.js`: every phone thread path. `days_test.js`: 16-day scripted run per POV. `w24_test.js`: every kc24 scene/call/prop. `kd_test.js`: the kc27 captivity loop, V’s search, every `kd_` event option for both POVs, topics, ending lines. `au_test.js`: plays The Long Leash on both sides, checks every door/spot. `apply_pairs.py`: applies text replacement lists to a line range of index.html. `gfx_test.js`: enhanced vs classic screenshots. `mz.js`: offline render and level check of every music track. `bal.js`: bracket-balance finder. `aiscan.py`: lists dialogue using contrast-reveal constructions.
- `art/`: expression charts (`*_expressions_source.webp`), `art/portraits_build.py`, output `art/portraits/*.png`.
- `mirror-protocol.html`: separate three.js (r128, cdnjs) study game.
- `docs/`: `VOICE.md` (writing guide), `voice_sample.md` (author's sample).

## Build & check
```
python3 tools/build.py
node --check tools/main.js
node tools/audit.js
node tools/fuzz2.js
node tools/phone_test.js
node tools/w24_test.js
node tools/kd_test.js
node tools/au_test.js
node tools/days_test.js
```
- After changing a generator, run it first, e.g. `python3 tools/gen2.py`, then build.
- Rule of the codebase: add behaviour by wrapping (`const _x=fn; fn=function(){…_x()}`). Never reassign `toRoom` (const). Never touch `S` at top level (it is null at load).
- Props pushed onto a map after `tdMap()` need defaults (solid etc.). Modules normalise them at the end (see td11/td16/td18).
- Check new top-level names for collisions: the original game has thousands.

## Getting around (player-facing)
- **The house:** the atrium and wings are above ground. The ops deck, roof, garage, cellar and kennel connect through the base.
- **Deep house (B3):** the garage keypad door ("Service door"). As Misaki it opens from day 3 at tier ≥1 or any later phase; a sticky note has the code. Always open as V.
  - B3 rooms: depot (brass cinema key on the hooks), washrooms, gallery, cinema.
  - Cabinet of strange things: set the gallery globe to **Lisbon**. It holds the B4 key, the tunnel map, and canon cameos.
  - Work room: behind the west-washroom mirror (tier ≥2, V, or a later phase).
- **B4:** the steel door at the end of the B3 corridor. It opens from day 8, in a later phase, or with the B4 key.
  - Hall of doors: one door hides Misaki's storage.
  - Flower room: two days after she tells V about teamLab.
  - Firing range: the minigame.
  - Service tunnel to the forest: the hatch needs the survey map, or V. The forest stump starts the chase.
- **B5:** the stairwell at the bottom of the B4 range ("RESEARCH"). It needs the code: knock 3× on the hall-of-doors "door with no handle". Not needed as V, or from Act II on.
  - Rooms: library tower (north), seed vault, observation → wing B and chambers 1–4 (chamber 4 opens after reading the observation logbook), pump hall (south).
  - After the first visit, a freight lift links the garage and B5.
- **City:** the city map pins (hub options) lead to walkable districts: square, harbour/yard, Kururin Land and haunted house, laundromat/bathhouse, shrine/cemetery, station/last car, coast, old track, Kyoto/Uji.
- **Friends' flats:** Ronin's has a workshop and Angel's has a set & closet, each in a back room.

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
- Voices (rewritten in `src/td5_story.js`): Misaki's speech gets more complex as the relationship deepens. Below level 2 her texting style is left exactly as written. From level 2 the shorthand expands (`u`→you, `ur`→your/you’re by the next word, `i’m`→I’m) and tics drop (`:)`, lol, hehe, `!!`); names are capitalised (`MV_NAMES`). At level 3 ALL-CAPS words become ordinary lowercase (not Title Case; acronyms in `MV_CAPS_KEEP` stay), stretched letters settle, `!` becomes `.`. Ellipses always stay three dots; `hitmeuppp` and HTML tags are protected. Write her lines low-tier whimsical, high-tier sincere (use `MV(...)`).
- **V never uses contractions.** `vVoice` is a no-op now (it used to slip contractions in and produced lines like “what it’s”). Write V’s lines, including his POV choices and inner monologue, without contractions; quoting someone else inside “…” is fine.
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
- Dialogue portraits for V, Misaki, Ronin and Angel come from the expression charts in `art/*_expressions_source.webp`, built by `art/portraits_build.py`: 3×3 slice, 56px BOX downscale, then an eye pass (pixels in each character's eye band that differ from a sharper LANCZOS+unsharp downscale are taken from it, so lash lines, irises and catchlights survive), and a 32–40 colour palette sampled with the eye band weighted ×4 so eye colours aren't dropped. Output `art/portraits/*.png`, embedded as lossless WebP in `XPORT`. Neutral is the default face; other faces only on clear cues.
- V: neutral, calm, angry, surprised, stern, smile, shout, fluster, content. Misaki: neutral, talk, annoyed, surprised, cry, smug, shout, fluster, content.
- Ronin (`ronin_expressions_source.webp`, maroon background flood-filled to black from the cell edges so his hair is untouched): neutral, grin, angry, surprised, cry, smirk, shout, fluster, laugh. Angel (`angel_expressions_source.webp`, 96 colours so her blue eyes survive): neutral, flirt, annoyed, surprised, cry, smirk, shout, fluster, laugh. Speaker "Angel" also maps to her.
- `xPickExpr(k,text)` chooses per line (anger words, CAPS/!!, love words, grief words, short questions, thanks/home, laughter, dark mode), falling back to neutral/calm/talk. Phone uses today's mood. To force one, set `canvas.dataset.ex` before `drawPortrait`.

## The deep house (B3/B4), the forest, the work (td9)
- New `tdMap('deep')` (80×62, rows `TDROWS.DEEP`, room rects `TD_DEEPROOMS`): sterile grey halls winding through B3 and B4. Rooms: landing, supply depot, two washrooms, long gallery, cabinet of strange things, cinema, work room, flower room, hall of doors, service tunnel.
- Unlocking follows the plot:
  - Garage service door `ga_service` (`deepOpen()`): V's POV, tier≥1 && day≥3, any phase after normal, or flag `deepCode`. A morning text `dp_deepnote` announces it.
  - Cinema: the brass key on the depot hooks (`projKey`).
  - Cabinet of strange things: hidden door, opened by setting the gallery globe to Lisbon (`curioOpen`). Plaque riddle: "WHERE THE MONEY NEVER CLEARS".
  - Work room: hidden behind the WC2 mirror (`mirrorOpen`, needs tier≥2, V, or a later phase).
  - B4: `b4Open()`, a later phase, day≥8, or the B4 key in the cabinet.
  - Flower room (teamLab Planets copy): two days after Misaki tells V she misses it (topic `dp_teamlab` / `dp_tlV`, flag `domeAsked`).
  - Tunnel hatch: survey drawings in the cabinet (`tunnelMap`) or V's POV.
- False exits: painted elevator, EMERGENCY EXIT onto brick, welded manhole, hall of seven doors (one is Misaki's storage).
- Forest (`tdMap('forest')`) via the tunnel grate. The stump starts a chase (`chaseStart('run'|'hunt')`, 45 s, Shift to sprint with stamina). The pursuer or quarry uses BFS (`tdPathTo`). Works from both POVs. Engine hooks were added in td2: `M.tick(sc)`, `M.speedMul(sc)`.
- Logistics quests: `dp_restock` Clean Hands, `dp_alibi` Paper Alibis (Angel's studio camera), `dp_wash` Clean Money (V explains laundering at the ops desk), `dp_burn` The Furnace.
- Talk: `dp_auton`/`dp_autonV`, the autonomy conversation. At 16 the other offer was selling her body, so to Misaki killing costs less autonomy. V is angry with the world, not her. `dp_rulesV`.
- Canon cameos (no new characters on screen): Luca's surfboard, Felicie's scorched postcards, the Vince & Ai Hua photo, Vince's box set, the cinema newsreel, the professional-courtesy card on the board, and rotating server chat lines.

## The city, walkable (td10) and the deep house lived in (td11)
- Every city area is now a top-down map (rows in `TDROWS.*`, room rects in `TD_CITYROOMS`, generated by `gen3.py`):
  - `city` (mall square)
  - `harbour` (harbour + container yard, joined by a gate)
  - `park` (Kururin Land)
  - `haunt`
  - `laundro`
  - `sento`
  - `shrine` (shrine + cemetery, joined by a path)
  - `station`
  - `carriage`
  - `coast`
  - `oldtrack`
  - `kyoto` (machiya + Uji riverside, joined by a sliding door)
  - The Ferris wheel gondola (`wheel`) stays side-view.
- How the conversion works:
  - Legacy spots are claimed by props via `legacy:'Label'`. Spots whose route is now walked (gates, paths) are claimed by invisible `cyClaim` props.
  - Exits are `cyExit` props (to the city map).
  - Water `~` and rails `T` are painted in `cyBake`; water shimmer is drawn by `cyWater`.
  - New floors: paving, boards, sand, pebble, tatami, track, cyTile, bathTile, platform, carFloor. New walls: shop, harbourW, hedge, shoji, train, sentoW, shrineW, stationW, hauntW, laundW.
- Engine fix (end of td11): props pushed onto a map after `tdMap()` never got defaults, so they weren't solid. All maps are normalized now. The garage crate puzzle is the only intentionally unreachable spot in the audit (push the lower crate right to reach the bike).
- Deep-house company: `dpCompanion()` schedules V (Misaki's POV) or Misaki (V's POV) into work/dome/cinema/gallery/range/depot by slot and day. Each has a first-time scene (`DPC`), then normal conversation. Film and flower-room seating change when company is there.
- B4 firing range (`dp_range`, door 22,44): `dpRange` minigame. Paper targets score +2 (+3 head); pink bystander cards score −5 ("RULE 2"). Brass is counted back. Range log with best scores (`rangeBestV`/`rangeBestM`) and all-time bystanders hit.
- The artifact declares `downloads` so save export works.

## Two doors (td12): Misaki's dilemma
- `DP_AUTON_M` (td9) is kept short (15 lines): "neither" was never offered, so the question was which piece of herself to rent out, body or hands. Hands come back, and with hands she decides; behind the other door she can only wait. V: "you picked well, inside a room somebody else built". It records `autonDay`.
- Follow-up a day later, `dp_auton2` / `dp_auton2V` (9 lines): she still prices everything by which piece of her it costs, and the job was the cheapest thing on the menu. After the first job she cried about still owning all of herself. With V the math comes out zero, which scares her. V carries the weight; she carries what the other door was.
- Consequences:
  - Morning dream `dp_lockerdream`: the locker room has a third door.
  - `dp_third` in the hall of doors: a crooked wooden door, plate THREE, an empty room with a chair, a lamp and a lock only on her side.
  - THE RULES gains rule 6: she can say no.
  - V's notebook `dp_vnotes` in the work room: a tally of "things nobody asked her", which grows with days since.

## Score 2 (td13): the music
- Replaces the old `TRACKS`/`playStep`/`sched` with `mzStep` + a new `sched`. The old `tone()` is still used by sfx.
- Mix: music bus → compressor → `MG` (master volume/mute). Generated stereo reverb (`MZ.rvIn`) and a dotted-eighth delay with lowpass feedback (`MZ.dlIn`). Every gain node starts at 0, which matters: a default gain of 1 leaked waveshaper DC.
- Instruments (`mzVoice`): warm (detuned saw pad), glass, drone, ep (electric piano), pluck, koto, bell, mbox (music box), flute, shaku, trumpet, calliope, sq, sine, sub, pick, saw, dist. Drums: kick, snare, brush, hat/open hat, rim, shaker. Notes get small timing and velocity humanisation.
- Track spec: `{bpm, steps(16|12 waltz), swing, ch:[[root,type]], rev, dly, intro, pad, keys, bass, arp, lead:{mel:mzMel('bar.step note len|…'), every}, gen:[{scale,tonic,dens,lo,hi}], dr:{k,s,br,h,o,r,sh,fill}, amb}`.
  - Loop 0 is an intro (no drums or lead).
  - Leads come in on alternate loops.
  - Fills fall on the last bar of odd loops.
  - `gen` writes a seeded random-walk melody that lands on chord tones on downbeats, so ambient tracks never repeat exactly.
- Tracks: title, lofi, base, noir, ronin, angel, tense, dark, mall; deep, dome, work, cinema, curio, forest, chase; harbour, shrine, kyoto, station, coast, park. Rooms map to them via `ROOMTRACK`. `pickTrack` adds chase (forest only) and cinema (while a film runs).
- Track changes crossfade (about 1 s out, then a fade in). Music ducks to 62% under dialogue, and to 50% while a film plays outside the cinema.
- Ambience bed (`mzAmbWant`): waves, wind, rain (outdoor zones when raining), rumble (laundromat, train), water (bath, river, fountain, dome, tunnel), hum (deep house, ops). Events: crickets (night, outdoors, not in rain), train clacks, drips. Lofi has vinyl crackle.
- Offline level check: render each track in an `OfflineAudioContext` (`tools/mz.js`). RMS is about 0.008–0.02 and peaks stay under 0.18.

## Story overhaul (main beats) + aftermath threads (td14)
- The main beats were rewritten in place in the original functions, so every wrapper (playInter, lone route, glass interludes) still runs:
  - `newRun` intros (both POVs)
  - `takenM` (abduction, then waking in the cell), `takenV` (the empty trailer)
  - the first `failedEscape` (backup clip in the shoe)
  - `vRescueCut`, `escaped`, `rescued`
  - `afterBase` opening
  - `startAct2` opening and Act II `BEATS` 3/5/7/9
  - the gala opening (a brown coat on the rack that V didn't bring)
  - a pre-`finale` night scene
- Misaki's lines use `MV`, so her voice still changes with affection tier. V's lines use `byT`.
- Four consequence threads (EVENTS, phase 'after'):
  - `sub_receipt`: V paid her rent through March. Repay (`rentBack`) or let it stand (`rentLet`).
  - `sub_hallway`: Ronin cleaned up after V's rescue. Sets `ronHall`; only when not `selfEscape`.
  - `sub_angel`: if leaks≥1, tell Angel what she said (`toldAngel`) or keep it (`angelSecret`).
  - `sub_coat` (V): keep the river coat (`coatKept=1`) or fold it away (`coatKept=0`).
- Payoffs: Act II beats 7 and 9, the pre-finale scene, and the ending screen (`subEnd`, appended via `extraEnding`).

## Round: trims, V romance, B5, Ronin/Angel, late nights (td15–td18)
- The main-beat scenes and aftermath threads were trimmed by roughly 40% (edited in place in index.html, plus td14). Payoff hooks are unchanged.
- td15 V romance:
  - `S.vrom` ('a'/'r'), separate from Misaki's `S.rom`.
  - `vromOK` needs V POV, friendship tier ≥2, no other romance, and rivalry <60 for Ronin.
  - Flow: confession → 3 dates (`vromDate`) → key to the house (`vromKey`). If V and Misaki were close (`vromHurt`), there's a konbini scene telling Misaki, and she moves out if she had moved in.
  - Caps affection with Misaki at 74. Ending line via `extraEnding`.
- td16 Sub-level 5 (DEEP map now 80×100, `gen2.py`):
  - Rooms: b5land, b5h1, library (moss floor, overgrown shelves, the camphor tree in the light well, card catalogue, typewriter, the drowned stacks, 3 of his mother's ribboned books → `libMother`), seed vault, observation (monitors, logbooks: "Subject V, age 9" → `b5log`, `vChildKnown`), wing B with chambers 1–4 (kennel cell = where "K9" came from; dry sensory tank; the white room; chamber 4 = V's greenhouse lab, opens after the log), pump hall (welded sluice, a rowing boat of books).
  - Entry: stair door (11,63), `b5Open()`. The code comes from knocking 3× on the hall-of-doors "door with no handle". V or Misaki may be reading in the library. New tracks: library, white.
- td17: Ronin's flat gets a workshop and Angel's studio a set & closet (`gen4.py` widens RONIN/STUDIO). Each new activity is once per day.
  - Ronin: workbench (file a crowbar charm), arm-wrestling, heavy bag, fire-escape talks (5 rotating), June's photo.
  - Angel: green screen (4 trends), thrift flip, nails, lens-cap confessional (5 rotating), cleaning Beyoncé.
  - New events: soup night, 3am voice notes, blanket fort.
  - The kitchen counter (Ronin) and oven (Angel) moved off the new doorways.
- td18 late night (`S.slot>=3`):
  - V sleeps in the east-wing bed (`vWhere`→'bedroom'). Misaki sleeps in the trailer, or in V's bed if moved in. Ronin sleeps on his couch, Angel on the new daybed. Each sleeper has a "X is sleeping. Best not wake him/her." menu with options specific to that person.
  - `sleep` sometimes runs `nightWake` (30%): branches by POV, moved-in, and Misaki's or V's romance.
  - Angel and Ronin 3am events.

## The four, as they are (td29)
- `k29_code`: V and Ronin clash over codes (the file vs. the joy); V threatens him, Ronin asks him to say it again, slower.
- `k29_pew`: Ronin in the back pew every Sunday; grew up front row; “not today, Father”; gave the Devil a front-row seat.
- `k29_bday`: Angel picks Misaki a birthday because Misaki never had one; `k29_angelwhy`: she gives the quarter’s sponsorship money away and asks to have her rifle taken if she ever kills for herself.
- `k29_files`: V keeps a file on each of them, updated every January, including one on himself.
- `k29_drawing`: Misaki draws the four of them (backs only after the kidnapping; chibi with horns, halo and sinister-cloud hounds before).
- Topics: `k29_code_m` (V’s actual rules), `k29_contract` (how Misaki chooses contracts).

## Partners, the package deal, the other pairing (td28)
- With a partner (`S.rom` as Misaki, `S.vrom` as V), the partner takes over the black bath (`k25_bath` re-routed: Ronin’s salvaged clawfoot tub and gospel radio; Angel’s rose-gold bath and the “after” playlist). V and Misaki’s kiss/heart affection options go platonic with each other unless married.
- The package deal: `k28_set1` (partner puts the blanket over both of them: “I dated the whole terrible set” / “two-for-one deal”), `k28_set2` (they never need to call; nobody ever asked them to choose).
- The other pairing: if the player is with Ronin or Angel, the other lead can end up with whoever is left (`k28_pair1` noticing + nudge choice, `k28_pair2` together, `k28_pair3` four people two pairs one table). Ending lines added.

## Angel's quirk, the ceiling stream, the tea (td27)
- `k27_narrate`: Angel narrates her own life in vlog voice when nervous, including on rooftops before a shot (“and she breathes in…”); only the four have heard it.
- `k27_ceiling`: she went live on a job by accident; 200k people watched a parking-garage ceiling for forty minutes, one quiet “cork”; her third most viewed video.
- `k27_tea` (V POV, `S.vrom==='r'`, after the first date): V once swore to kill Ronin; Ronin drank V’s tea (V’s sleep aid, an ungodly amount), decided V had finally done it, climbed onto his lap and made a twisted confession, passed out; woke alive under V’s coat; V heard everything.

## The pool, Ronin and Angel after the job, the flower room back (td26, td9)
- **The pool** (B5, the old seed vault, zone `dp_seeds`): it was a hydroponics grow room meant to feed the house through anything; it devolved into a pool. Interactive `k26_pool` (go under / swim lengths, float, sit on the edge), the old seed drawers, a rusted nutrient tank.
- **Ronin after a job** (`k26_ronin`): four-in-the-morning breakfast, gospel radio (he cannot sleep without it), apron over the shirt; he runs hot and has never owned a winter coat. **The ice bath** (`k26_ice`): Angel found him grey in a tub of ice with the crowbar on his chest; “you’re lettin’ the cold out.”
- **Angel after a job** (`k26_angel`): an hour of total silence; she cleans her face and then the rifle with the same pads; only the four may stay for the quiet part. **The setting spray** (`k26_spray`): Ronin used her gold-bottle spray on the crowbar; nothing sticks to it now; she orders six more.
- **All four in the pool** (`k26_poolfour`): Misaki under for four minutes ten.
- **The flower room is back** (td9): no longer a copy of an exhibit. Misaki once said every room she has had was for something, and she had never been in one that was just pretty; V built a room for nothing under the house. Her line: it is soft of him.
- **Tone:** the killing is a fact, not a refrain. The daily killer thoughts and the morning reminder lines are gone (the † body count stays); the per-place thoughts and night rumours are trimmed to the understated ones; the “an outsider would be sick” sentences are cut.

## The black bath (td25)
- `k25_bath` (scheduled via K22EV): after a job, V washes Misaki’s hair in the blackstone bath, navy silk pyjamas, both half asleep, red water; she goes under and stays under and never drowns; he sleeps three and a half hours. Variants for the red streak or the post-haircut layers, and for after the kidnapping (she lets only him behind her).
- `k25_hotel`: the hotel last winter: Ronin walks in on the red water and her stillness, raises the crowbar over V; “hi ronin. shampoo’s on the left.” Then the call the next day (on speaker).
- Topics: `k25_sleep` (V needs three and a half hours), `k25_water` (why she stays under).

## The sanctuary (td24)
- Tone target: nothing can hurt the four of them here, and anything here would send anyone else to hell. Calm and domestic on the surface; the horror is what is normal to them.
- Per-place thoughts (`K24_THINK`, TDREACT `k24_think`, once per visit) in the house, the deep house, the trailer, Ronin’s and Angel’s.
- Ordinary-pool mornings: knife Sunday, laundry (cold water), the wrong delivery van, the breakfast debrief, the storm the house does not notice, Angel’s nail poll, a quiet day.
- Night card: anonymous city rumours about the four (`K24_RUMOUR`), no named people.
- Activities (both POVs, sideHub): family dinner (weekly), sit in the pens with the hounds, help Ronin clean up, the night drive.
- The house steadies you: first arrival home each day restores a little composure.
- Topics: `k24_safe` (“why do i feel safe here”), `k24_others` (“What would other people see, if they lived here?”).

## Abroad, anatomy, darker, faster (td23 + td20)
- The user’s rule now: keep everything you can do, reframe it. **Japan is real, it is just not home.** The Japanese places (Kururin Land, haunted house, hillside shrine + cemetery, the rented machiya + Uji river, the last train, the coast, Kita High’s old track, the bathhouse, and the harbour/container yard and the 24h laundromat) are reachable only on an overseas trip (td23): city option “Overseas contract: Kyoto” (Misaki) / “Overseas hunt: Kyoto” (V), two days, `S.f.abroad`. While abroad `hub`/`cityMap` show the trip menu (`jpMenu`), mornings are quiet, exits inside those maps return to the menu, the job adds a body, and the last morning flies you home (`jpEnd`). Locals there have no lines (npcs filtered to V/Misaki, and only if the partner came). The Kyoto wedding job is the together version. St. Aldric’s stays at home.
- **You are a killer:** the HUD shows † body count (`S.bodies`), some mornings open with a cold line (`K23_MORN`), and once a day a passing thought (`k23_think`). Title blurb rewritten.
- **Sprites:** an anatomy pass on people (td20 `anat`): one hair row and one cheek row removed, torso and legs lengthened, head trimmed; same height and feet line; back views reuse the front view’s rows. Off with “Visual polish”.
- **Lag:** canvas resolution capped at 4× (was up to 8×, i.e. 2560×1440 on big screens); the screen grade/vignette is one pre-rendered overlay per mood instead of full-screen blend modes each frame; light shafts only loop over visible tiles.
- **Darker:** the overlay darkens every time of day a little more, more at night and while `S.dark`.

## Setting and character rework (this round) — read this first
The direction from the user, which overrides older notes in this file:
- **The four are serial killers and should frighten.** The game is about Misaki, V, Ronin and Angel; no random side characters with emotional weight, no whimsical “strange places”. Background people and places carry no significance.
- **Canon (Killer Chat! by rosesrot):** Ronin is the most unhinged, enjoys killing, obsessed with the Devil and satanic imagery, sarcastic (the invented sister “June” is gone). Angel is sweet, mature, selfless, and never misses. V has a strict code and clashes with Ronin; never uses contractions.
- **The city is not Japan and is never named.** Money shows through `money(n)` (stored units /100 → “$400”). No konbini/onigiri/shrines/Japanese places or surnames. Inspector Hara is Inspector Hale.
- **The hounds** (keys Biscuit/Sergeant/Mochi/Pancake stay internal): no cute names or business; visible text uses `houndN(k)`/`HOUND`. Big, silent, surgically remade by V to save them; the city's killers treat them like something from under the water. New sprite (td src).
- **B5 is V's experimental wings** (td16): theatre, recovery pens, a cold room for the eleven that did not live, his surgical notes, and pen four with something under a blanket. No childhood experiments, no sensory tank, no father.
- **Misaki** (td22): after the kidnapping the whimsy drains (`mvTier` makes `MV` pick plainer lines, `mLevel` forced to 3), she dresses androgynously (`MIS_A`), later Angel cuts the red streak out for a layered cut (`MIS_B`, `S.f.k22hair`; portrait reds recoloured). V counts four days she never accounts for (`k22_sus1/2`). She keeps no places, only what each city she worked in believed (`K22BEL`, topic `k22_cities`). She used to do digital art commissions (city option; after the kidnapping she cannot draw faces). In the lower base: “if we were anybody else, we’d have killed ourselves out of terror by now” (`TDREACT k22_terror`).
- **Removed from play** (code kept, unreachable): Kururin Land, haunted house, bathhouse/sento, shrine/cemetery, Kyoto, last train, old track, coast trips, harbour boat area (`WH_CUT` filter, `PLACES` emptied); deep-house flower room, cabinet of curiosities/globe, hall of seven doors (now Stores), painted elevator/false exits, cameo props; td19's coach / June / commenter arcs; Through Glass mornings centred on strangers. The disabled area blocks in index.html (~lines 4324–7170) still contain old text; they are dead code.
- Shared style guide used for the rework: see the bullets above; renamed targets/suspects (e.g. Tanabe → Tanner, Ishikawa → Isherwood, Aoki → Avery) are read through `susN`/`a3nm` helpers.

## Grief, closeness, small kindnesses (td19, last module)
- Tragedy arcs run as priority morning events (`T19EV`, wrapped `morningEvent`), in order, at least three days apart:
  1. Coach Hamada (`t19_coach1/2`): his daughter writes that he died; whether Misaki wrote back (`tdF('coach')`) changes the letter. Go to the service or not (`S.f.t19coachGo`); either way she gets his stopwatch (58.31, never cleared). Then a city option: run one 400 at the old track (`t19Run`).
  2. The man who killed June (`t19_whistle1/2`): he died peacefully in a hospice; Ronin waits at the station all night. Then the crowbar marked J, thrown into the harbour together (`t19Harbour`).
  3. Mrs. Kanemoto (`t19_oda1/2`): Angel's oldest commenter died in a hospice; her last comment was never sent. Angel does a live with no face, no filter.
  4. The voicemail (`t19_vm1/2`): Maman's last voicemail (the afternoon before she was taken) is on a phone that dies; Ronin or Angel tries; it is gone; Misaki records V describing her voice instead.
- Keepsakes for each (wrapped `keepList`), journal notes. Scenes call `t19Mood('grief')` → `mzForce` if the music module provides it.
- Closeness: AFFX (V ↔ Misaki “Affection…” menu) gains: sit without talking, tea, lean on a shoulder, blanket, pinky promise, kitchen dance, nap together, scars, heartbeat (married) / hands under the table. Touch asks consent first while Misaki is in the dark state (`t19Touch`). Affection from each is once per day (`t19Day`).
- Ronin and Angel: their talk menus get “Spend time together…” (platonic, by friendship tier) or “Be close…” when you are romancing them (`S.rom` as Misaki, `S.vrom` as V). Injected by wrapping `ask` when the hint reads “Ronin · ”/“Angelic · ”. Friendship gain once per day.
- Warm route events in the normal pool: film-night shoulder (V/Misaki platonic), Sunday morning (married), laundromat dance (Misaki/Ronin), hair washing (Misaki/Angel), stitches (V/Ronin), audit reports in bed (V/Angel), everyone asleep after movie night.

## Score 3, bug fixes, visual pass (this round)
- Music (td13): chords voice-lead to the nearest inversion; basslines walk into the next chord; generated melodies are phrased (call and answer, cadence on chord tones); tracks move through sections (intro → groove → lead → breakdown). New voices: piano, cello, strings. Per-voice stereo, kick ducking on beat tracks, low end kept out of reverb/delay.
  - New sad tracks: `grief`, `loss`, `requiem`. Force a track from story code with `mzForce(name)` / `mzForce(name, secs)`, release with `mzForce(null)`; `mzScene(name, lines, cb)` wraps a `say`. td19 uses `t19Mood('grief')`.
- Bugs fixed:
  - The focus “blip” fired every frame when standing near wall items (target compared by object identity). Now compared by label+rect, rate-limited, and the blip is a soft sine.
  - Quitting to title or reaching an ending from a walkable room crashed (`leaveTD` read `S.room` after `S` was nulled).
  - `toRoom` into zones without an arrival could drop the player into a sealed pocket; V/Misaki/Angel/Ronin could spawn on blocked tiles. Both now use `tdFreeReach` (reachable free tile).
  - The 3am night wake-up no longer fires on the night of the kidnapping.
- Visual pass (td20, plus outline support in `tdPx`): baked contact shadows where floors meet walls/solids (`vfxAO`), vignette, time-of-day colour grade (drained while `S.dark`), a warm rim on the player at night. Character and dog sprites get soft shading in `tdPx` (shadow-side edge darker, lit edge a touch brighter; `TD.shade`, `TDSH`). The 1px outlines tried earlier were removed. Pause menu → “Visual polish” toggles it all (`META.fxOff`). The new-run opening text is back to the original short version. Cost ≈0.6 ms/frame.

## Past Tense (td21): the far end of Misaki's detachment
- Continues Through Glass (gl_) toward something like Cotard's: on bad days she is fairly sure she is already dead, and she is very good at making evidence agree. Her POV narration is sometimes wrong and gets corrected a line later.
- Priority mornings (`PT_EV`), every other day at most counting td19's arcs too (shared spacing via `S.f.ptLast` / `S.f.t19last`): `pt_pulse` (checks the wrong side of her wrist), `pt_door` (broken konbini sensor as “evidence”), `pt_food` (feeds rice to crows that are not there; the three-words rule), `pt_obit` (“bio (final)” in the past tense; someone changes the verbs), `pt_count` (counts herself as furniture in a group photo), `pt_air` (opens every window in November; the smell is the lilies), `pt_proofs` (V’s 23 proofs, all refuted; he stops arguing and sets up “boo”), `pt_cell` (after the kidnapping: “out here it’s easier to be dead”).
- Past-tense days (`S.f.ptDay===S.day`): in her POV her sprite draws at half opacity (wrapped `tdActor`); walking-around thoughts in trailer/base (`TDREACT` pt_r1/pt_r2). After `pt_proofs`, 22% of mornings can be a “boo” day (`pt_ghostDay`): she texts “boo”, someone gives her a chore with a body in it (`PT_CHORES`).
- Talk topics: `pt_here` (Misaki asks V “do i look like i’m here to you?”), `pt_tense` (V asks “Which tense is it today?”).
- Cliché pass on td19: stock phrases (“neither of you says anything for a long time”, “like it weighs more than anything”, “a hand finds a hand”, comments going viral) replaced with specific details.

## B5 library → the library tower
- `gen2.py` carves the library as a disc (centre 22,83, r≈10.5). Doors: north (22,72) from the corridor, east (42,88) to observation, south (22,95) to the pump hall. Zone floor `lab`, wall `glass`.
- Drawing (td16, `lib_vis` section):
  - under: floor rings, the shelf band at the rim, planter-trough arcs, the glass core.
  - over: six upper galleries, hydroponic helices up the core and the walls, a light column, the watering drone BISCUIT II, rising motes.
- Interactables:
  - the core (spiral lift to the top: nine galleries, the camphor tree under the skylight)
  - 8 curved-shelf points (`LIBQ`)
  - 4 grow towers: strawberry (+energy), moonflower, herb, and dragonfruit ("attempt 12, it took")
  - 2 reading pods, the holo-catalogue, the typewriter desk, the drone dock
  - his mother's 3 ribboned books → `libMother`
- The planter ring is solid via invisible segments, with gaps at the four compass points.
- Freight-lift shortcut: once you've reached B5 (`b5seen`, set by `deep.tick`), a lift appears in the garage (to B5), and the B5 landing has a lift back up.

## Phone 2, Angel's two masks, glasses, graphics (kc19–kc21)
- kc19 Phone 2 (`S.tx`):
  - Each contact (V/Misaki/Angel/Ronin) has a thread. Replies are queued and arrive later (`phQueue`/`phDeliver`, on hub).
  - Branching threads: `txDef(id,{with,pov,prio,when,nodes:{start:{in,opts,expire,onExpire}}})`. Options take `fx`, `reply`, `next`, `ok`. Ignoring a thread past `expire` runs `onExpire`.
  - At most one new thread a day (`txTick`). Incoming calls (`call({...answer,miss})`) ring at most once a day and can be declined. Outgoing calls: one per contact a day (`outcall`).
  - Threads: `tx_vjob`, `tx_mrent`, `tx_rpick`, `tx_rjune`, `tx_ahurt`, `tx_vroof`, `tx_amaria`, `tx_avhouse`. Calls: `c_angel3am`, `c_vjob`, `c_ronlift`, `c_mlate`.
  - Payoff events: `pay_vdrove`, `pay_ronalone`, `pay_rondrive`, `pay_angellie`, `pay_roof`. Ending lines via `extraEnding`.
  - `tools/phone_test.js` walks every option path and checks expiry.
- kc20 Angel's two masks: **Maria de la Rosa** (the channel and modelling; her livestreams are timestamped alibis) and **the Heartsick Angel** (the press's name for her killer side). "Angel" is just for the server.
  - Content:
    - the studio neon (`mariaKnown`)
    - `tx_amaria` → `mariaShoot` (rooftop shoot, 3 ways to help)
    - the `heartsick_news` event
    - `maria_crack` (recognised at 3am: cover / let her answer / shield)
    - `maria_end` (kill Maria / keep her as armour / introduce them; the last needs `mariaReal` + the shoot)
    - V's `tx_avhouse` (shoot at his house, the keypad-door scare)
    - a feed view in Messages
- kc21: V's reading glasses exist **in text only** (no sprite or portrait changes): the nightstand prop (wear / steal / freezer), the `gl_first` and `gl_found` events.
- kc21 graphics:
  - Sprite outlines via cached silhouettes in a `tdPx` wrapper.
  - Screen-space pass after `tdWeatherFX`: additive light glow, per-place soft-light grade (`fxGrade`), vignette, film grain (off with reduce motion).
  - **G** toggles `META.fx` between enhanced and classic.

## More messages: the group chat, and Misaki's luck (kc22)
- Theme: Misaki expected to be dead within about five years of starting. Then Angel corrected her wind maths on a sniping forum, sent her a server invite, and everyone kept her. "I really didn't expect to be lucky."
- New threads:
  - `tx_lucky` (Angel's forum-versary)
  - `tx_vlucky` (Misaki to V: the odds, the five years)
  - `tx_rhow` (Ronin: how'd you end up with us)
  - `tx_tarps`
  - `tx_vgroc` (V's grocery list: one lime, bleach)
  - `tx_aalibi` (walk through Maria's live at 9: a timestamp alibi for the Heartsick Angel)
  - `tx_mcontact` (emergency contact)
  - `tx_rangel` (the "heartsick face", bring the bad snacks)
- Also:
  - About a dozen new server pings.
  - `DRIFT` one-off texts per contact (repeatable morning event `drift_txt`).
  - `lucky_morning` inner monologue (once).
  - V talk topic `lucky`.
  - Extra `chatLog` lines.
- Flags: `luckyTold`, `vLucky`, `vEmergency`.

## Dialogue de-AI pass
- Rewrote about 320 lines across `index.html` and `src/` that used contrast-reveal tics:
  - "X. It's not Y. It's Z."
  - "Not X. Y."
  - "That's the point / the whole thing / the trick / the worst part"
  - "both are true", "which is how…", "somehow", "that's new", "That's all. You just…"
- Each was rewritten as a plain statement in the character's own voice. No mechanics changed.
- `tools/aiscan.py` lists strings that still match the first set of patterns. What it reports now is ordinary speech ("Not today", "Not bad"). When writing new lines, state the thing directly; don't negate a framing nobody raised, and don't end on a summarising "that's the X".

## Refinement pass
- **Fixed a crash:** reaching any ending while standing in a walkable room threw in `leaveTD` (S was already null). Guarded.
- **Performance:**
  - The library's static floor art (rings, about 1,000 book spines, troughs, core) is baked once in `libBake`; only the plants animate.
  - The graphics-pass light glow is capped at 10 lights.
  - `tools/perf_test.js` prints frame cost per area, enhanced vs classic. Headless numbers are relative only.
- **UI:** interaction prompts no longer sit on top of the objective banner (minimum y is 40).
- **Writing:** varied or cut about 80 uses of "for a long time" and "very carefully/quietly/slowly/gently". Similes were left alone on purpose.
- **`tools/days_test.js`:** plays 16 days as each POV (answers texts, takes calls, wanders, pokes things, sleeps) and reports errors. Misaki pays rent on days 2 and 4, so her run goes normal → taken → after; V's reaches Act II. Misaki's run then parks in the finale's stealth minigame, which the script can't play. It found the ending crash.
- **kc23:** the help panel covers the phone, late nights and the G toggle. A toast warns before a text expires unanswered, and a one-time hint points to Messages.

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
  - `SOLX` block: every one of the 779 bank problems has an expanded solution (Key idea, 5-9 steps, Check, Answer), keyed by question text and applied to `AB` at load, then `amcRebuild()`. Keyed answers were re-verified in Python while writing them.
- Progress in localStorage `mirror_protocol_v1` (G).

## Testing
See Build & check above. Playwright is installed globally (`require(execSync('npm root -g')+'/playwright')`). cdnjs is blocked in this container: route `**/three.min.js` to abort (or a local copy via `npm pack three@0.128.0`). Typical checks: generate each TYPE 600× and validate answer is in choices / no NaN; take each test answering from `window.__curItem`; random fuzz of the main game.

## Known gaps / honest status
- Only the Ferris-wheel gondola and minigame screens remain side-view. The cell and the infirmary are walkable maps (`tdMap('cell')`, `tdMap('medbay')` at the end of `kc28.js`, rows `CELL`/`MEDBAY` in `maps.json`); they share one floor plan on purpose, and the infirmary is lit and drawn like the cell until `med.clar` reaches 2.
- Two Wardrobe spots exist in the bedroom; `legacyN:1` picks the second.
- The five areas and the detachment arc (pall block) were never fully play-tested.
- Chapter 5 problems are original, modeled on Big Ideas style (the online textbook was unreachable).
- `tools/audit.js` always reports the garage bike as unreachable. That's intended: it sits behind a crate-push puzzle (push the lower crate right).
- At late night (slot 3) each of V, Misaki, Angel and Ronin is asleep on roughly two nights in five (`sleepNight` in td18); otherwise they are awake and talkable. Night wake-ups fire on about 30% of sleeps.
- All city-map options are greyed out at night (slot 3); that is original design.
- The tic pass covered character dialogue in index.html lines 2450–3700 by search rather than line-by-line reading; a few tics may remain there.
- The Long Leash is bot-tested only; balance (V side easy, Misaki side harder) not confirmed by hand.
- Recent rounds were checked by the audit, fuzz, scripted playthroughs of each new scene, and screenshots. They have not been hand-played start to finish.

## Phone-layout pass

- **Portrait phones** (`kc23`, CSS under `@media (orientation:portrait) and (max-width:640px)`): panels and the pause menu are `position:fixed` and fill the space under the HUD; the dialogue box sits below the game frame instead of over it (choices used to be cut off); touch buttons move to the bottom of the screen; the hint line is hidden. `--uitop` / `--uibot` are set from `#stage`'s rect on resize.
- **Graphics toggle** is now in the pause menu's Settings group (`kc21`), so touch players can switch enhanced/classic. G still works.
- Fixed a broken sentence in the Act II gala ending ("$Xk. , a little short").
- Layout check script pattern: Playwright with `{viewport:{width:390,height:844},hasTouch:true,isMobile:true}`; remove `.splash`, `benchLoad(BENCH[1])`, then `pauseMenu()` / `openPhone('dm')` / `ask(...)` and screenshot.

## What it costs (kc24)

Short scenes about what the work and the years before it left behind. All in `src/kc24.js`; test with `node tools/w24_test.js` (runs every event option, call, prop and topic for both POVs).

- **The date** (Misaki gave herself five years): `five_eve` → `five_day` (bench / work / show V, or Angel if alone) → `five_after`; V's side is `five_v`. Flags `fiveDay`, `fiveDone`, `fiveV`, `fiveTold`.
- **Hour 70** (V, locked rooms, the dogs): `v_bowls` (repeats up to 3), `m_bowls`, `m_door` / `v_latch` (`doorAsk`), topic `hour70` (needs `vChildKnown`), thread `tx_m4am`, call `c_vfour`, prop `bd_wedge`.
- **Hands** (Misaki's three washes): `m_hands`, `m_frogs` (V pov), thread `tx_vhands`, call `c_mtap`, topics `sleeping`, `menu`. `m_bento`: V stocks her after-job bento.
- **Angel / Ronin**: `tx_aceil`, `tx_avface` (watching herself from the ceiling), `tx_roven`, `tx_rvdown` (the oven; the shed back home).
- **Lighter threads**: `tx_aquiz`, `tx_rname`, `tx_vcactus` (Prickles), `tx_mbiscuit`.
- **Props**: `tr_box` (trailer shoebox, "THINGS THAT ARE MINE", one line can be added at tier 2), `bd_wedge`.
- 12 new server pings, 12 drift texts, 3 chat-log lines, 8 conditional ending lines.
- Gotcha: `v_door` was already an event id; the new one is `v_latch`. Check ids with grep before adding events.

## Voice pass (author's sample)

- `docs/voice_sample.md` is the author's own writing (one piece per killer); `docs/VOICE.md` is the guide distilled from it. Read both before writing any dialogue.
- About 1,150 strings re-voiced across `src/td3…kc24` and Ronin/Angel lines in the original region of `index.html`. Ronin no longer says "darlin'" (his `nick()` pool changed too). Profanity now exists for Ronin, Misaki and narration; never V.
- V's and Misaki's lines in the original region were done in a follow-up round: about 1,390 replacements, produced as JSON pair lists and applied with `tools/apply_pairs.py <pairs.json> START END --write` (checks each old string is in the line range and the new one has no raw quote/backtick). Use that tool for any parallel edit of `index.html`.
- **Open canon question:** the old plot treats V as a philanthropist with a conscience meter who has barely killed; the sample V is a practised butcher who feeds his animals. New lines lean toward the sample ("my animals ate well", the metal table); the old plot beats (the river, "You killed a man to keep me alive", kc19's job deal) still assume the softer V.
- Three `VARY` keys were updated because they match dialogue by prefix. If you reword a line, grep `VARY` for its opening words.
- Watch for catchphrase pile-up when several people edit at once ("Sucks t'be you" hit 17 uses and was cut to 4).

## Alternate universes (kc25)

- Title screen → **Alternate universes** (added by wrapping `panel` when the title panel is drawn). Runs with `S` null and never touches a run; results in `META.au[id]`. `AUON` is true while inside; `pauseMenu` is a no-op without a run, and `helpPanel` shows AU help (and now toggles closed on a second H everywhere, which also fixed duplicated help lines).
- Add a universe: `AUS.push({id,name,sub,run(back)})`.
- **The Long Leash** (`llRun`): Misaki as a loose-mouthed genius researcher with a living scarf, V as the sergeant ordered to keep her on station. The premise follows the user's brief (the Mitya/Valeriy dynamic from Genshin: "Sarge", the scarf gagging classified leaks, the smokehouse food run and picnic, the prototype test, the theatre and the blizzard) but uses no names, places or lore from that game; keep it that way.
- Structure: seven days, a hub (`hub()`) with two picks a day from `SC` (scenes: `radio`, `radio2`, `lunch`, `bench`, `inspect`, `gen`, `cards`, `frost`, `scarfrun`, `origin`, `cook`, `letter`, `fever`, `sarge`, `wash`, `report`, `chair`, `leak`, `theatre`), then a night (`night()`), then `finale()` and `end()`. State `R={side,day,slot,out,in,coat,slack,leaks,data,done}`. `slack` (the bond) unlocks walking out together at night and staying put in the theatre. Endings Escort / Gone / Leash, plus epilogue lines from `R.done` and `R.leaks`.
- Minigames: `llNight(side,n,cb,mapKey)` chase on `LL.MAPS` (station, yard, theatre; add a map with rows, start tiles, pickups, palette); `llHush(cb)` (you are the scarf: E on red words); `llBench(side,cb)` (E in the green band). `llInspect(side,cb)` (hide four things in nine spots, or search with five tries; watch where she glances). `llGen(cb)` (repeat the valve sequence). `llScarf(side,cb)` (the scarf runs off; corner it). `llHush(cb,1)` is the faster second report.
- **Walkable station** (`walk()`, `AR`, `wTile()`): the day hub is now eight areas you walk around (corridor, lab, mess, quarters, plant room, yard, roof, and the ridge marker for night walks). Each area is a 20×10 tile map; any character other than `.` `,` `D` blocks (`llBlk` was generalised). `doors` map 'x,y' → [area, spawn]; `sp` maps a map character to {lab, sc:[scene ids], ex:()=>lines, sleep:'v'|'m'}. A yellow ! marks spots with something to do. E on the companion offers `sarge`/`origin`/`frost` or banter (`BM`/`BV`). Esc opens a menu with the old list (`menu()`), turn in, or leave. After a door, movement is held until keys are released, so you don't bounce back through.
- New scenes: `stars` (roof), `snow` (yard), `bday` (his desk, day 6+). The night walk (`ridgeWalk`) is walkable: go to the marker, come back through the door.
- `LL.AR`, `LL.wk`, `LL.walkTo(area,[x,y])` exist for tests; `au_test.js` checks every door and spawn, that every spot is reachable and does something when used, and walks through a real door.
- Gotcha: never store a minigame score in `R.done[sceneId]` — a score of 0 makes the scene available again. Scores live in `R.bh`, `R.gk`. `gag(pre,word,then)` is the reusable scarf-chokes-her beat.
- `LL.game`, `LL.dbg`, `LL.hush()`, `LL.bench()` exist for `node tools/au_test.js`, which plays six full weeks with different policies (trying, idle, mashing, quitting) and checks map reachability.

## V is now a practised killer (decision pending with the author)

The V/Misaki pass resolved the open canon question toward the author's sample. Facts that changed, all revertible by editing the lines:
- V says outright that he killed Misaki's kidnappers and fed them to the dogs (laundry TV, wheel "ledger" lines, shrine prayer, gate).
- His creed is now "paper for most of them, the knife for the ones who have earned worse"; the old premise was paper-only, with violence as a fall on the dark path. The paper options and conscience stat still work as before.
- The training-hall weapon wall now has knives (was "batons, no blades"). The care-home man at the laundry sink is dead (was beaten). Sergeant the dog was retired for biting a superior officer (was "too gentle with suspects").
- Two conscience beats were removed: V's doubt after killing the guard who brought water, and "the old V would have been horrified" at the errand boy's hand.
- V is still vegan in the original scenes; the meat is for the dogs.

## Night fixes and the tic pass

- **Night bug:** td18 put Angel, Ronin and V to bed every night (slot 3), which hid their talk/affection options. Now `sleepNight(k)` puts each person to sleep about two nights in five; waking Ronin or Angel leads into `talkRonin`/`talkAngel`.
- **Morning events:** the pool passed thirty, so one-at-random starved scenes (the hotel door, the wet roof). `evRun`/`evPick` (kc26) weight by how many mornings an event was passed over, favour the original vignettes (`EV_ORIG`, snapshotted at the top of td1) and short-window `phase==='normal'` events, and a big pool can give a second scene. `x_wrong_door` now fires from day 3 and also after the rescue.
- **Tic pass:** the author's ten-tic list is in `docs/VOICE.md`. About 1,300 strings were rewritten across `index.html` and `src/`; code was token-checked unchanged and menus/events compared identical before and after.
- Biscuit is she/her.

## The room with one bulb (kc27): harder kidnapping, longer shadow, the blank

All in `src/kc27.js`, plus small in-place edits to the original region (V's taken hub, `lockpick`, `escapeRun`, `vRescue`, `theList`). Test with `node tools/kd_test.js`. State lives in `S.kd = {hrs, ses, said, clock, dose, anc, lost, shake, t0, days}`; `kdPost()` is true once she is out. Saves made before this module get a modest record from `kdEnsure()` (on `hub`).

**Captivity is harder (Misaki):**
- The sedative: `kdWoozy()` (0–2) narrows the lockpick window and raises stealth sensitivity (`kdEscapeCfg`). It wears off as cell actions pass. A second escape attempt meets one more guard.
- The cell has a clock (`S.kd.clock`). Every action that is not a ready escape costs one; at six, they come for another session (`kdTheyCome`), take the tray, and the guard rhythm has to be learned again. The vent now needs the tray *and* having listened at the door.
- Sessions: `interrogate` is wrapped. Resolve starts lower each session. After the original questions comes a question about her life before nine (`kdBlankQ`): the truth costs nothing in resolve and is written down as "uncooperative"; in session two the boss offers her a mother he invented. Later sessions are `kdShort`. Every session ends with a dose (`kdDose`): hours go missing (`hrs`), and if her resolve was low she talks without knowing it (`said`, 0–3; unlike `S.leaks`, the player is never shown what).
- New cell spots: "Your arm" (punctures she doesn't remember), "The radio down the hall" (counting the bank jingle is a clock; each dose then takes two fewer hours).

**The search is harder (V):** the trace is one round longer and only gives the district. A third lead is required, "Hunt along the river" (`kdScout`, `S.f.kdBldg`): pick the right warehouse of three (the fourth; the clue is the tyre ruts and the bank jingle), or Angel's fans find it if he has called them. A wrong door sets `S.f.kdAlert` (one more guard). Each night she is gone raises rescue sensitivity; two or more adds a guard (`kdRescueGuards`). Morning event `kd_tape` (the 40-second voicemail).

**After (the after-phase is now six days, `kdSettle`):**
- `kd_count`: she thinks it was two days; it was `days`, with `hrs` missing. V's POV can round it down (`kdRound`), which comes back in `kd_round`.
- `kd_card`: no blood type, no allergies, a birthday she made up. V writes her first true medical card.
- **The notebook** (`kd_book`, fires once the note-taker on the list is handled): read it / have V hold it / burn it (`S.f.kdBook` = `read|v|vsolo|burn`). If the note-taker is never handled, a page arrives in Act II (`kd_bookout`, `out`).
- `kd_knock1..3`: what she said under the needle is acted on (her trailer, Ronin's blue door, Biscuit at the gate), one per `said`. If somebody read the notebook, each is an ambush on the visitors; otherwise she loses money, Ronin gets stitches, Biscuit spends a night at the vet (`S.f.kdHit` counts unwarned hits).
- **Keep it or let it go blank** (`kd_blank`, `S.f.kdKeep`): keeping costs composure and adds a fifth name to the list ("The one behind the chair", so one fewer guard in the finale if handled). Letting go gives composure, ends flashbacks, hides the "third day" topic, and blanks one list entry (`x.gone`; it can no longer be chosen, so that guard stays). `kd_van` (Act II onward) shows her body still reacting when she let it go.
- `kd_lost` (repeating): lost afternoons cost Misaki the morning slot until she has three anchors (`S.kd.anc`: writing it down, V's timestamps, the medical card, Angel's album, the backup promise).
- Hands: `stealth` is wrapped; her sensitivity is up 6% per `S.kd.shake` (max 3) after the rescue and drops one per clean stealth job.
- Topics: `kd_file` (both POVs: V looked for chapter one), `kd_backup`, `kd_shoes`. Threads: `tx_kd_ron` (he lies about a debt to see if she can tell), `tx_kd_angel` (the "misaki was here" album), `tx_kd_mv`. Act II: `kd_hara` (the truth, "don't remember", or Maria's timestamps). Epilogue: `kd_epi`. Ending lines via `extraEnding`.

**Canon this round added about the blank (confirm with the author, all in kc27 text):**
- Nothing on paper exists for Misaki before age nine (no school, clinic or birth record); V thinks somebody removed it professionally.
- The earliest document is a school enrolment form where she wrote "March" in the birthday box herself.
- She reacts badly to the sedative, which nobody could have known because she has no medical history.
- She asks for the first time whether the missing nine years were done to her. Nothing answers it; V is still looking.
- The captor's "mother in Saitama" is a lie inside the story. No new character exists.

## The long way out, and the room that says LAUNDRY (kc28)

`src/kc28.js` plus in-place edits to the original region. `node tools/kd_test.js` covers it (set `globalThis.KD_AUTO=1` to make the new minigames resolve instantly; `days_test.js` does this too).

**Original kidnapping text was replaced** (in `index.html`, not in `src/`): `takenM` (now in the trailer lot; her left hand is broken in the van), `takenV` (the fence post, the fingernails), `failedEscape` (the radio man stands on the hand), the last-chance passage, `vRescueCut`, `escaped`, `rescued`, the cell spots and the session intros. The "Things are different after" paragraph is gone from `after()`; `afterBase` (dead code) was deleted. Friends' reactions to leaks now arrive as texts on Misaki's phone (`kdTell`), and stay as narration in V's POV.

**Captivity takes longer:**
- `kdHoldOn` ("the chair"): hold E to stay level while the band narrows; runs inside every full session before the before-nine question. Success +8 resolve, failure −10 and an hour lost.
- The vent needs four screws worked loose with the tray (`kdTurn`, one per cell action, `S.f.kdScrews`; they persist across sessions). The door needs the guards' steps learned first (`simon`, `S.f.kdSteps`).
- Every way out has a second stage: `kdDock` (the loading dock, a mirrored warehouse map) for her; `kdCarry` for V (no takedowns while carrying her; being seen falls back to the fight).
- `kdPick()` replaces `kdWoozy()` in `lockpick`: one-handed from the second session.
- Event `kd_omen` (before the kidnapping, once rent has been paid once): the man from the canal floats.

**Misaki is an unreliable narrator of her own injuries.** Her lines say asleep / stiff / fine (`KD_INJ` after each dose, the escape text, every "i'm fine"). The facts are in `KD_CHART` (left hand broken twice and pinned, shoulder, three ribs, the foot she walked on, wrists to the tendon, 14 sutures, two molars, −7 kg, "Back: see photographs. Do not show patient"), in the mirror, and in other people (`kd_konbini`, `kd_angelsees`, Ronin's and Angel's texts). The older "third day" topic line ("They were careful not to leave marks") now reads as her being wrong; it was left as is.

**The adjustment period** (`S.kd.med = {d, clar, run}`, three days, `kdMed()`):
- `after()` now hands over to `kdMedStart`. She wakes in V's infirmary on sublevel two (door marked LAUNDRY, never seen before) and takes it for another cell. Misaki's hub is the side-view room `medbay`; V keeps his hub and gets "The infirmary" (`kdSit`).
- Clarity `med.clar` 0–3 rises each morning and from the chart, texts and failed escapes. Below 2 the room is drawn as the cell and the spots carry her reading of them (Cot, The line in your hand, The eye in the ceiling, Their notes, Tray, Something covered up, Door); from 2 they become Bed, The drip, Smoke detector, Your chart, Soup, The mirror, The door, plus the foam-ball physio.
- She can run (`kdMedRun`, stealth; the "guards" are V and the doctor). Caught: V kneels and tells her the day. Out clean: Biscuit in the garage. Out with a takedown: she has put the drip needle in V's arm (`S.f.kdStab`).
- `kdMedMorning` replaces morning events for the three days (both POVs), ends with the walk upstairs, resets `S.kd.t0`, then shows the short after-text. All kc27 scenes wait for discharge (`kdPost()` is false during it). The after-phase is nine days in total.
- For three days after discharge she starts each morning 20 energy down.

**Phone:** the backlog of messages sent while she was gone, with day stamps (`kdBacklog`, delivered when V slides her phone under the door); threads `tx_kd_help`, `tx_kd_fine` (one line of the list, all of it, or no), `tx_kd_selfie`, `tx_kd_rvis` for Misaki; `tx_kd_mdoor`, `tx_kd_adoc`, `tx_kd_rhand` for V. The phone is blocked on her first infirmary day.

## Bug fix: things missing from the city map

The TODAY notes column on the city map (`cityMap` in `td6.js`) drew one note every 15 px with no limit. Past about nine notes the rest were drawn under the bottom card or off the screen and could not be tapped, so late-game entries (the anniversary, "Design a new wing", the last page of the ledger, "Watch Misaki watch the street", Act II interviews in V's POV) disappeared for anyone using the world map. Rows now shrink to fit, and beyond twelve the rest fold into a "More…" note that opens a list.

A comparison of the build from before the voice and tic passes (commit `89ca4cd`) with the current one found no other loss: same event ids, functions, threads, spot labels, hub options, topics and places on all eight benchmark saves, and every morning event runs to completion on every benchmark in both. If something else is missing, it needs a specific example to chase.

## Her condition on screen (end of kc28)

`kdCond()` returns 0–4. In the cell it is the session count plus one for a failed escape; in the infirmary it runs 4, 3, 3, 2 by day; it is 2 for three days after discharge and 1 for the rest of the after-phase. It applies to Misaki wherever she is drawn in walkable rooms (as the player, and as an NPC in V's POV) and in the interrogation screen.
- **Sprite:** `kdRag(a,n,care)` edits the sprite grid and caches the result. In the cell: one shoe missing from the start, red at the wrists, the clip gone after the first failed escape, then a swollen arm, a shut eye, blood at the mouth, on the shirt and in the hair. `kdGrime` darkens her palette with each level. In care: the grime is gone and she has a cast and a head dressing. `tdActor` is wrapped to set the flag `KDF`, which the `tdPx` and `spr` wrappers read.
- **Movement:** `kdSpeed()` multiplies walking speed in `td2_scene.js` (about 13% slower per level, a little more while sedated, never below 45%). She also drops a pixel on one step in four, and stands a pixel lower from level 3.

## The sum she won't do (kc29)

About the hours Misaki cannot remember. She has enough to work out what probably happened in them and refuses to. `src/kc29.js`; covered by `tools/kd_test.js`.

**Rules for writing in this module (keep them):**
- What happened is never named, by her, by anyone else, or by the narration. The evidence is shown (the hours, the photographs of her back, clothes that were not hers, the examination she declines, a cologne) and she explains each piece away.
- She knows. Tier-3 lines say so ("I know what that comes to. I've known since the car."). So does V.
- The honest option is always on the menu and always greyed out (`KD_NO(label)`). Nothing in the game lets her say it. V can decline to force it; he cannot make her.
- Each pretence calls `kdDeny()` (`S.kd.deny`). From then on she starts every morning with less energy (2 per point, up to 14), and in the after-phase her composure is capped at 100 − 4 × deny (floor 60).

**Scenes** (all after discharge, staggered by day; each has a V-side version unless noted): `kd_math` (the sum), `kd_clothes` (the paper bag), `kd_exam` (the form with two boxes), `kd_photos` (the envelope marked "do not show patient"), `kd_wash` (Misaki only: the fifth wash), `kd_smell` (the konbini queue), `kd_notask` (Angel asks to ask), `kd_vknows` (V only), `kd_later` (Act II onward, deny ≥ 3).
**Drafts:** `kd_draft` repeats over four nights. Misaki's thread with V shows system lines "draft, not sent" that get shorter each night; V's side shows "is typing… stopped". On the fourth night she sends a question about the cactus.
**Talk:** `kd_second` in both directions (the doctor's second page). **Threads:** `tx_kd_sleep`, `tx_kd_ask`, `tx_kd_vdots`. **Ending:** one line by `deny`.

## More of the arc (kc30)

- **Cell:** "A cup of water" appears after every dose (`S.f.kdCup`). Drinking clears the sedative faster; thanking the man through the slot twice (`S.f.kdThanks`) means he looks at the floor on the dock stairs and that stage has one guard fewer. The radio spot now also gives three overheard exchanges (`S.f.kdHear`; the buyer comes Friday, the driver sings, the photograph for "the dog man").
- **V while she is gone:** `kd_vphoto` (her hand on a table: study it for the guard schedule, reply and warn them, or show Ronin, who claims the man who did it: `S.f.kdRonCall`), `kd_vfloor` (Ronin and Angel on the atrium floor).
- **After:** `kd_home` (the first trip back to the trailer: sleep there, move it three metres, or leave), `kd_parcel` (her star clip posted back, cleaned: wear it for one extra smoke in the finale, file it, or the river), `kd_ronradio` (if Ronin called the radio man and nobody has handled him by day three, Ronin does, which crosses him off the list) and `kd_ronmad` (if somebody else got there first).
- **The cast:** `kd_cast` at the start of Act II. If she did the foam ball at least twice in the infirmary (`S.f.kdGripN`) the hand works. If not, `S.f.kdHandBad` makes lockpicking one step harder for the rest of the game (`kdPick`).

**How to reach the drip-needle scene:** play as Misaki, and in the infirmary use the Door while she still believes it is a cell (the door is labelled "Door", not "The door": the first day, or the second if she has not read the chart or been talked round by text). Choose "Go. Now, while you can stand.", take down either figure in the corridor from behind with E, and reach the exit. Reaching the exit without touching anyone gives the Biscuit scene instead; being seen gives V kneeling.

## What she says she doesn't remember (kc31)

Same rules as kc29 (never named; honest option greyed with `KD_NO`; each pretence is a `kdDeny()`). The new idea: **the missing hours are not all missing.** She has pieces (a ceiling, the radio being turned up first) and files them under "gone", because nobody can ask her about a thing she cannot remember. `S.f.kdHas` marks that the player has been shown this.

- `kd_recount`: the receipt says N hours; the true number is smaller, and she leaves it or rounds it up.
- `kd_slip`: at dinner she uses a detail from the hours she claims to have slept through. Everyone hears it.
- `kd_sleeptalk`: what she says asleep. V tells her she counted the dogs, which is true as far as it goes.
- `kd_bank` (Misaki): she closes the account she swore at in the cell; the lobby plays the jingle. `kd_jacket`: Angel helps her out of a coat from behind (adds a journal note). `kd_shop`: no more shorts. (The shoebox scene `kd_box` was removed at the author's request.)
- Other people catching on without being told: `tx_kd_ronsoft` (Ronin is nice to her, which is how she knows he has guessed).
- The bill: `kd_crash` (deny ≥ 6, Act II on: she collapses on the stairs and loses most of a day) and `kd_crash2` (deny ≥ 9: her trigger finger doesn't close on a windless roof; heat +8).
- Relief: `kd_march` (needs the enrolment form opened): Angel makes her pick a day for the birthday she invented at nine. The 3rd, the 14th, or all thirty-one.

## What it would prove (kc32)

The author's correction: the medical horror is **not** the wounds (she dislikes acknowledging those too, but that is kc28's unreliable narration). It is the doctor's examination and the photographs, which she denies loudly, because she knows exactly what they would prove. An earlier version of this module invented a surgical mystery (old stitches, clips on an X-ray, an unidentified drug, extracted molars, the note-taker as an anaesthetist); **all of that was removed** and is not canon.

The doctor is correct and kind throughout. The horror is the procedure: a required question, a form, a kit with a time limit, a ruler and a date card in every photograph, a sealed numbered envelope, follow-up dates. kc29's rules hold (never named; honest option greyed with `KD_NO`; `kdDeny()` per pretence), and here she is vehement.

- `kd_ask`: the doctor is required to ask one question a day until Saturday. "NOTHING HAPPENED. Write it down." The doctor writes it with quotation marks.
- `kd_window`: the examination is only useful for a few more days. She has the day and hour worked out, and marks Saturday "FREE".
- `kd_bodymap`: the printed outline in the chart, marked and numbered in red to match the photographs. She draws a moustache on it or tears it up; it can be redrawn.
- `kd_photodeny`: "that's not my back." Ripping them up changes nothing: the originals are sealed and numbered. She says in one breath that it is hers to burn and that it is not her.
- `kd_cup`: a second cup of tablets, "as a precaution". She, who reads every leaflet, takes them without asking what for (`S.f.kdCupTook`), or flushes them and takes them on the third morning.
- `kd_results`: the lab envelope for the addressee only; the repeat dates go in the kitchen calendar as "dentist" (`S.f.kdRes`).
- `kd_dentist` (Act II on): the six-week date. Sit in the car park and report no cavities, or go up under a false name and never ring for the result (`S.f.kdBloodGiven`, the nearest she comes).
- `kd_vdoc` (V): the doctor may not say what she thinks, has no doubt, and leaves a leaflet that says "do not push".
- Thread: `tx_kd_docstop` (Misaki to V about the doctor).
- Kept from the earlier version: `kd_pins`, `kd_wrists`, `kd_vtable` and the infirmary cabinet (treatment without sedation).
- Related scenes elsewhere: `kd_exam` and `kd_photos` (kc29), the sealed box in the fridge and `kd_kitgone` (kc33).

## The ward round (kc33): the infirmary as a system

- **Treatment** (`S.kd.rx = {heal, pills, palmed}`): once she knows where she is (`med.clar >= 2`) the "Treatment trolley" offers up to two treatments a day (flags `S.done.kdRx_*`, count `S.done.kdRxN`): dressings, the pin sites (`kdTurn`, hold still), breathing on three broken ribs (`ground`), and the painkillers, which she can take or hide in the bed frame (a `kdDeny()`). While she still thinks it is a cell the same spot is "A tray of instruments" and she will not be treated, so refusing to recognise the room slows her recovery.
- **What `heal` does:** `kdCond` is wrapped. `heal >= 6` takes a level off her condition after discharge (she walks faster sooner); `heal <= 1` adds one for five days. In V's POV she gains 2 per infirmary morning once her head is clear.
- **Readouts:** "The monitor" (pulse and temperature improve with `heal`; she reports 2 out of 10), `kd_discharge` (the doctor's note the morning after discharge: compliant / partly / refused, and how many tablets were found in the bed frame), `kd_checkup` (monthly check from Act II).
- **The small fridge:** soup by day, and a sealed white box with her name and COLLECT WITHIN 5 DAYS (`S.f.kdKit`). Asking what it is for is greyed out. `kd_kitgone`: the shelf is wiped the day after the date.
- New props drawn in the room: `mb_cab`, `mb_mon`, `mb_trolley`, `mb_fridge` (added after `tdMap`, with defaults set by hand).
- **Other scenes:** `kd_maria` (V, while she is gone: Maria asks two million viewers for leads, then picks up the shotgun; sets `angelHelp`), `kd_vod` (Misaki watches it afterwards), `kd_roncrow` (Ronin wants one name off the list: the driver, none, or a lucky dip; `S.f.kdRonGot`).

**Voice pass on Angel and Ronin (this session's lines):** Ronin's reassuring lines were made ruder ("I'll lie to you too, but I'm funnier about it"; the soup is from a can and he spat in it), a narrated closer inside a text bubble was cut, and he no longer types "u". Angel lost filler ("cute!! 💕", stray "babe") and gained appetite ("who did the eye. asking for a friend. the friend is a shotgun"; "i go and have a night out"). On camera she is Maria, in full soft sentences; off it she is the Angel.

## The one who knows, and ordinary days (kc34)

**Nobody tells Angel or Ronin.** The threads where they were told outright were removed (`tx_kd_ronknows`, where V answered "Yes"; `tx_kd_leaflet`, where the doctor gave Angel a leaflet). What they have, they worked out: the slip at dinner, the jacket, the shopping, Ronin being nice. Keep it that way.

**The hidden route** (`kd_last`, Misaki's POV only). On the last Saturday the examination would still show, with V out walking the dogs, the doctor asks for the last time. "Answer the question." is greyed out as usual unless `kdCanTell()` is true, which needs all five:
1. she kept the room and wrote it down (`S.f.kdKeep === 1`, from `kd_blank`);
2. she read the note-taker's notebook herself (`S.f.kdBook === 'read'`, so the note-taker must be dealt with on the list first);
3. she looked at the photographs and did not later tear them up (`S.f.kdPhotos === 'seen'`: "Look." in `kd_photos`, then "Hand them back" in `kd_photodeny`);
4. she took the "precaution" tablets without asking (`S.f.kdCupTook === 1`);
5. she found the white box in the infirmary fridge (`S.f.kdKit`), which means recognising the infirmary before discharge.
`kd_window` must also have fired. `kd_kitgone` now waits for `kd_last`, so the window cannot close first.

On that route she breaks down, allows the examination and the questions, and makes the doctor promise that nobody ever learns she admitted it, V included. It is still never named. Sets `S.f.kdTold`. After it: `deny` is halved and only one pretence in three counts; the collapse scenes (`kd_crash`, `kd_crash2`) do not happen; `kd_told_box`, `kd_told_dentist` (she keeps the appointment under her own name, reads the result at a post-office box, and still tells V "no cavities") and `kd_told_sleep` replace the usual ones; the ending says one person knows. **To everyone else she behaves exactly as before, and no text in V's POV may show that he knows she said it.**

**Ordinary days** (nothing to do with the kidnapping; gated by `G34()`: not dark, not taken, not the after-phase, not Act III):
- Morning scenes: `g_pancake`, `g_review` (4.4 stars, docked for humming), `g_board` (V), `g_couch` (Ronin), `g_brand` (Maria's knife sponsorship), `g_cat` (V; Misaki names him Receipt, `S.f.gCat`), `g_leak` (rain, trailer), `g_book` (the group reads Persuasion).
- Threads: `tx_g_bet`, `tx_g_knife`, `tx_g_stars`, `tx_g_receipt`.
- **Night market at the shrine:** an evening option every third day (`gMarket`): shooting gallery (Misaki clears the shelf; V loses to a seven-year-old), takoyaki, a fortune.

## Story setting: the aftermath (kc36)

Settings (title screen) and the pause menu have **Kidnapping aftermath: full story / injuries only** (`META.kdFull`, default full; `kdSA()`). The settings panel explains it in one sentence.
- **Full story:** as before.
- **Injuries only:** removes everything about what may have been done to her in the hours she cannot remember. Gated off: the events in `KD_SA_EV` (the sum, the clothes, the exam form, the photographs envelope, the fifth wash, the cologne, Angel asking, V knowing, the drafts, the recount, the slip, sleep-talk, the shopping, the doctor's question, the window, the body map, photo denial, the precaution cup, the results, the dentist, V and the doctor, the box in the fridge, the hidden route and its follow-ups), the threads in `KD_SA_TX`, the `kd_second` topics, the white box (the fridge shows soup and dressings instead) and the matching ending lines.
- **Injuries only has no denial and no doctor.** She has no reason to hide physical injuries: she names them flatly and does not care. The horror is that none of it is new to her (the hand is "third time"; old, unset fractures on the films from before she was nine; old stitch scars under the new ones; she knows how to dress wrists and do the physio without being taught). V does the treatment. Gated off in this mode as well: `kd_konbini`, `kd_angelsees`, `kd_card`, `kd_discharge`, `kd_checkup`, `kd_pins`, `kd_wrists`, threads `tx_kd_fine`, `tx_kd_selfie`, `tx_kd_adoc`. The cell's dose lines use `KD_INJ_OFF` (kc28).
- Infirmary in this mode: the chart, mirror, monitor and treatment trolley have plain versions; new spots "The lightbox" (the old fractures) and "Walk the corridor" (laps, healing).
- Recovery scenes (`kd_rec_*`, after `kd_count`): the injury list given like a job report, her own stitches out with nail scissors, Ronin's get-well basket, Angel's haircut ("a normal amount"), V taking the pins out on the kitchen island, eating weight back on, the first job back one-handed (Misaki).
- Recovery activities (side menu, after-phase, once a day each, six sessions): "Physio: the hand" (`kdTurn`, `S.f.kdGripN`) and "Walk the hounds, a bit further" (`S.f.kdWalk`; the limp goes after four). Both add healing, which `kdCond` turns into a faster walk.
- Flipping the setting mid-run takes effect from the next scene; scenes already played stay played.


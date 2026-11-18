# Minigames: inventory, fixes, known issues

Pass over every minigame in `index.html`: each one was started headlessly and played with four input
policies (no input, Esc, random keys, random touch), screenshotted, and read through. The harness is
`tools/mg_test.js` (new): `node tools/mg_test.js [nameFilter] [--shots] [--shotsonly] [--at=40]`.
It steps frames by hand, reports whether each game finishes and what it returns, fails on page errors,
broken Esc (Esc must end a game within 10 s), and checks the frame-rate cap. Screenshots go to
`$MG_SHOTS` (default: the OS temp dir). Story text was not changed.

## Changes that apply to every minigame

- **Frame rate.** Every minigame, timer, chase and dialogue counts frames, so on 120/144 Hz screens the
  whole game ran 2–2.4× fast (the forest chaser moved per frame while the player moved by `DT`, so on fast
  screens the chaser was also twice as fast relative to you). The `DT` wrapper on `frame` (original region,
  next to `let DT`) now skips animation frames so the game steps 60 times a second at any refresh rate.
  Slow devices are unchanged (no catch-up steps). Checked by `mg_test.js` (30/60/120/144/240 Hz → 30/60/60/60/60).
- **Instructions in the title bar.** `hudBar(title,right,hint)` takes an optional hint. When a title does not
  fit, it is split at its first ` — ` / ` · ` and the second half (nearly always the instruction: "keep all
  three in the green", "E when the needle hits the gold", "E up close…") is shown as a yellow hint line under
  the bar for the first 7 seconds (and again whenever the hint changes). Previously those instructions were
  cut off with "…" in hydroponics, baking, pottery, knitting, kennel shift, CRT duel, night fishing, the
  trick trainer, the 400, the dark ride, the duck derby, sweeping, the last train, Catch the scarf.
- **Long messages wrap.** `txt` used to shrink overlong text down to 7 px (unreadable, and still cut off in
  Spot the tail). It now shrinks at most 2 px, then wraps onto two lines (upwards for text in the bottom
  part of the screen).
- **Phone button / bag / saves during a minigame.** The phone icon sat on top of every minigame's bottom-left
  text, and tapping it (or the ♥ pill, 🎒, 💾, I, pause → Phone/Saves) opened the phone, bag or save panel in
  the middle of a minigame, abandoning it without its callback. `mgOn()` (original region, after `hudBar`)
  is true while a minigame screen is up; the phone button is hidden and those entry points do nothing then.
- **Touch overlay labels** ("drag: move / tap / hold: act", drawn for minigames without their own touch
  handling) moved from the bottom line, where they overlapped every game's message, to the top.
- **Incoming phone calls** no longer ring in the middle of a minigame, and no longer throw if you quit to
  the title in the 0.7 s before the ring (`phCallTick`, kc19).

## Per game

| Game (function) | Where | What changed |
|---|---|---|
| Rooftop shot (`snipe`) | contracts | Opening line now says E fires. |
| Infiltration (`stealth`) | contracts, gala, escape, rescue, finale | Long hints wrap; message band grows to two lines when needed. |
| The drink (`poison`) | contracts | Vial/suspicion bars moved up; they overlapped the message line. |
| Decrypt (`simon`) | ops terminal, cell door | "Repeat it" now says arrow keys or tap the pads. |
| Hydroponics (`hydro`) | greenhouse | Instruction visible (title split). |
| Spar / karaoke (`rhythm`) | training hall, karaoke | Hint line (keys or tap the lane); result card (Great set / Not bad / Off the beat + %) before returning. |
| Kennel shift (`kennelShift`) | kennel | Instruction visible. |
| Lockpick (`lockpick`) | cell door | With the sedative, the bad hand and two sessions the window could shrink to under 2 frames (impossible). The green gap is now never narrower than 4 frames of pin travel. |
| Cooking with V (`cook`) | atrium | Ingredient labels overlapped each other; now staggered on two rows, selected one highlighted, hidden while stirring. Touch: tap an ingredient to add it, tap anywhere to stir. Result card (Delicious … Burnt, score). |
| Kitchen (`kitchen`) | recipe book | Checked; no change needed. |
| CRT showdown (`duel`) | trailer, games room | Instruction visible. |
| Fetch (`fetchGame`) | kennel | Checked; no change. |
| Breathing (`ground`) | flashbacks (after phase) | Esc now ends it (counts as not steadied) instead of being ignored for 22 s; touch: hold a finger down (the old touch path also worked, now explicit); short result ("Steadier." / "Still shaking.") before returning. |
| Knitting (`knitGame` / `knitSession`) | trailer basket, gala auction | Tap = E; instruction visible; result line (n of 6 stitches clean). |
| Pottery (`pottery`) | Angel's studio, Ronin's tattoo, Maria's reflector | Could be won with no input (started centred with no drift for the first second). Now starts off-centre with drift from frame one. Touch: hold the left/right half. Result line. |
| Baking (`bakeGame`) | studio oven | Same idle-win problem (started at the edge of the band); now starts outside it with drift, and needs a little longer in the band. Timer shown; result card. |
| Claw / capsule / photo booth | mall, games room | Checked; no change. |
| Accident / disguise jobs | contracts | Checked; message wraps. |
| Fishing / night fishing / stones | Uji, harbour | Checked; instruction visible. |
| Snake (`snakeGame`) | Ronin's Gameboy | Started moving immediately and died in 4 s before the player had read anything. Now waits for the first arrow/tap, with a start prompt. |
| Record dig (`recordDig`) | Ronin's | Touch: tap a sleeve. Hint line; result card (all pairs / out of moves). |
| Clean the scene (`cleanup`) | after kills | Instruction only mentioned tapping; now "walk to it and press E (or tap it)". |
| Trick training, piano, rehearse, stamp | kennel, atrium, studio, wedding | Checked; no change. |
| Duck derby, dark ride, socks, blood out, lanterns, sweeping | Kururin Land, laundromat, shrine | Instructions visible; blood out: the "E" peroxide label sat on the stain bar, now under the bottles with the count. |
| Last train (`st_rushGame`) | station | Touch had no way to press E (excuse yourself): tapping your own character now does. |
| Spot the tail (`st_tailGame`) | last car | Touch had no way to skip ahead; tap now skips. Stop description no longer runs off both edges. |
| Épée (`fenceGame`), the 400 (`trackGame`) | St Aldric's, old track | Instructions visible. |
| Firing range (`dpRange`, td11) | B4 range | Had no title or instructions at all. Title bar with rounds left, hint (arrows aim, E fires or tap, never the pink cards), result card with score, hits and bystanders. |
| The chair (`kdHoldOn`, kc28) | interrogation | Touch did nothing (empty `onTap`): holding a finger now holds. Esc gives up (counts as losing count). Mild damping so a person with normal reaction time can learn it (simulated: with 200 ms reaction and a little anticipation it went from ~0–15 % to 55–100 %; with no input it still fails). Short "level / lost it" result. `KD_AUTO` still resolves it instantly. |
| Vent screw / foam ball (`kdTurn`, kc28) | cell, infirmary | Shows misses (✗ n/2), since two misses end it. `KD_AUTO` unchanged. |
| Forest chase (`chaseStart`, td9) | forest stump | Chase state was kept if you left the forest mid-chase (the torii stayed dead and the chase resumed on return); entering the forest clears it. HUD moved from mid-right (where the other runner often is) to the top right; the "SHIFT · sprint" label was 5 px and is now readable (and says the ⇧ button on touch). Frame-rate fix above also fixes the chaser being faster on 120 Hz. |
| The Long Leash (`llNight`, `llHush`, `llBench`, `llInspect`, `llGen`, `llScarf`, kc25) | AU mode | Checked with the harness and `au_test.js`; all finish, Esc works, touch works. "Catch the scarf · E up close…" instruction now visible. |
| Gondola seven (`ROOMS.wheel`) | Kururin Land | Not a minigame; every spot checked, climbs down correctly. |

## Known remaining issues

- Hydroponics and the last train were never won by the random bots; both are winnable by reasoning about
  the numbers (hydro: drift ≤ 0.66/frame total vs 0.9/frame correction; last train: ~260 frames of walking
  in a 1200-frame limit) but were not verified by a scripted player.
- The épée's last lunges give a ~4-frame parry window; hard but possible. Left as is.
- Pottery is reused for the tattoo and Maria's reflector, and still says "Pottery with Angelic" there.
- Kitchen seasoning jars: long names ("smoked paprika") are a little wider than the jar at 7 px.
- The H (controls) overlay does not pause a minigame underneath it.
- Slow devices (under 60 fps) still run the game slower than real time; no catch-up steps were added.

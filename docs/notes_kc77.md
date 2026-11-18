# The war, the rest of it (kc77)

All in `src/kc77.js`; tested by `tools/k77_test.js`; reading copy in `docs/kc77_text.md`. It needs kc73 and kc76.

kc74 gave the enemies-to-lovers route a full early game. After the kidnapping the route had one beat in the after
phase, four in Act II, one in Act III and one in the epilogue. This module fills chapters II to V, so every phase has
beats, something to do daily, and scenes with Ronin and Angel.

## Beats

Spliced into kc73's order (`K73B`), each behind kc76's chapter card, each with a line on the war page.

| Chapter | Beat | What happens | Choice → flag |
|---|---|---|---|
| II | `e2l_rifle` | After the kitchen. V gives Misaki's rifle back, cleaned of the river, with a new firing pin and one round stood on its end. “I would not be shot by a dirty one.” | Misaki loads it and puts it on him, and the left hand cannot hold it still (“In a month it will hold still. I will stand here again then”) / the round goes in a pocket → `e2lRifle` `aimed`/`kept` |
| II | `e2l_fork` | Only if V answered “be mean to me” with the oath (“when you can hold a fork in both hands”). Dinner, all four. The fork stays in the left hand. | hands flat on the table, and V cannot fix a date / the last potato off his plate, left-handed → `e2lFork` `waited`/`potato`. Free. |
| III | `e2l_list` | After the car. The Mimic's fourth body: Misaki's shot copied well, V's cutting copied badly, K9 on the wall. Each is insulted on the other's behalf. | the shot (“he has watched you for longer than I have”, “Territorial”) / the cutting (“you would have got the grain right”) → `e2lList` `shot`/`cut`. Free. |
| IV | `e2l_will` | From day 1 of Act III, before the boat. Angel's “list (final) (3)”. | Misaki: the bullet / nothing; V: the hounds / their page → `e2lWill` `bullet`/`nothing`, `hounds`/`page`. Each then hears what the other left. Free. |
| IV | `e2l_book` | Rivals only, the day after the boat. Ronin closes the book and gives the pot to the old priest. They read the server through a scope and field glasses. | – |
| V | `e2l_page` | The day after the anniversary. Lovers: V hands over the page, with a date where the total goes. Rivals: the yearly showing; this year's line is NOTHING. | burn / keep; write STILL COULD / hand it back → `e2lPage` `burned`/`kept`/`wrote`/`unread` |

“Free” beats need a new day but do not use up the day's move (as kc76's cold room), so Act II still fits: the
day-using beats there are rifle, car, stitch, pair and spar.

Order now: eye → show → lift → kennel → sab → dinner → truce → after → **rifle → fork** → car → **list** → stitch →
pair → spar → **will** → boat → **book** → epi → **page**.

## The case menu (Act II)

`⚔ The case: with him / with them`, once the car has happened; one action a day, costs time. It is the Act II
counterpart of kc74's war menu. Each action has a first scene with a choice, then rotating variants.

- **Walk the old list.** Eleven names Misaki was paid for and never collected on. First: the pawnbroker (“client died
  before he paid” / “She has been on my list for two years. I had not reached her”). Then: the one who moved to the
  coast, the one who died in a hospital bed, the one who bolts the door.
- **The ops table.** V's forty-page file on Misaki. They correct the doorman's hotel; he initials the change. They can
  go on and correct all of it (`e2lFileFix`: two dates, a street, and one job that was never theirs). Then: the page he
  will not show, page thirty-one (the photograph or the parking ticket, by `e2lCar`), the lamp.
- **Sleep in shifts.** Whoever sleeps does it a metre from an armed person who swore to kill them. The pistol or the
  scalpel goes on the dash. `S.f.e2lSlept {m,v}` counts the nights; the war page shows the count, and so does an
  ending line.

## Ronin and Angel, later

Location scenes in kc73's pool (one a day, the cap shared with kc64/kc68):

- `l77_ronin` (after, Act II): THE WAR wiped off the fridge. To Misaki: “He been right with you, in his house?” To V:
  “You think about it?” / “Once. I was sick in the kitchen sink.”
- `l77_stairs` (after): the hounds across the infirmary stairs. They get up for Misaki and not for V.
- `l77_crepe` (Act II): the crêpe stand again; he has it cut in two. “Mine is the poisoned half. Eat.”
- `l77_safe` (Act II/III, until the boat): Angel's safe, the envelope, and what she says to each of them.

Threads: `tx_e2l_lock` (V to Misaki: the new lock, four minutes) and `tx_e2l_thu` (Misaki to V: Thursday, the
rifle). Server lines for the after phase (3) and Act III (2). Ten ending lines.

## kc76 changes

`K76CH`, `K76NAME`, `k76Line`, `k76Has` and `k76Next` know the new beats; the page gains “Nights slept beside the
other, armed”. `k76Next` now says “tomorrow” in every phase where that is the reason nothing is on offer.

## Coexistence and tests

- Everything is gated on `K77()` (the route is on). Off the route there is no menu, no scene, no thread, no server
  line and no ending line; `k77_test` checks each.
- `tools/k73_test.js` and `tools/k76_test.js` were updated for the new order.
- `k77_test`: 228 checks, both POVs, every option of every beat and menu action, repeats, location scenes, threads,
  server lines, endings, and the text rules.

## New facts to confirm with the author

- V kept Misaki's rifle on the ops deck after the river and replaced the firing pin.
- Misaki's old list has eleven uncollected names; the pawnbroker on the east side is one, and is also on V's list.
- V's file on Misaki is forty pages and had the doorman's hotel wrong (it was the one by the station).
- V's will had never named a person; Angel's note is now “list (final) (3)”; on this route the cactus goes to
  “whoever remembers to water it”.
- Ronin gives the pot from the book to the old priest (rivals).
- V fitted a new lock on the trailer and kept no key.

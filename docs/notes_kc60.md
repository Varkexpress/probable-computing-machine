# kc60: the arrangement, flight school, more of the infirmary

All in `src/kc60.js`. Test: `node tools/k60_test.js` (takes the repo root as an optional argument).

## 1. The four, and the rule

The four have a rule, made in the server one night (`a60_server`): if one of them dies, nobody goes back for the body;
within forty-eight hours the others clear anything at that person's place that leads to the rest; then everybody moves
on. They mean it, they are as cool about each other's deaths as anybody's, and they are all any of them has. Every one
of them broke it during the kidnapping, and Misaki is the one who wants it kept.

Delivery: the beats (`A60B`, registered with `a60B`) play **one every other morning** before every other morning scene
(outermost `morningEvent` wrapper), and the next due one is also offered **once a day in the side menu** under its own
label with the sub-line "costs time · the four of you". Not while lone, dark, abroad, taken, in the infirmary or in the
after-phase (the aftermath scheduler owns that).

| id | phase | what |
|---|---|---|
| `a60_server` | normal, day 2+ | the rule voted on in the server at 2am; V's thumb comes four minutes late; wings in Ronin's car. Sets `S.f.a60Rule`, journal note. |
| `a60_list` | normal, day 3+ | who gets what at the Sunday table, with a man on it: Ronin (river, crowbar, say nothing), V (the hounds go to Misaki, with a lawyer), Misaki (rifle, truck and chainsaw, Prickles, clips in the bin), Angel (delete Maria). Saved as “list (final) (2)”. Choice → `S.f.a60Hounds` (`said`/`quiet`). |
| `a60_quiet` | normal or Act II, day 6+ | Ronin goes quiet on a job; Angel calls the rule at 4:40; V schedules the flat for noon; a burger at dawn. |
| `a60_hurt` | Act II / III | Angel shot through the arm: “would you all have finished the noodles.” Yes. |
| `a60_body` | Act II | what V does with their bodies: the hounds; each picks a hound; V has notes on the joints; the old hound has had his name the longest. |
| `a60_hounds` | Act III, day 2+ | envelope “If I am dead. Hounds.”: the old hound to be put down inside the week. Misaki's “and if it's me?” adds “week one, move her bed” (the grey hound). `S.f.a60Env` (`ok`/`bed`). |
| `a60_epi` | epilogue | the yearly list review; Misaki's list is longer now; burn the stool; “(nobody has ever followed this)”. |

Threads: `tx_a60_body` (Ronin → Misaki), `tx_a60_bodyv` (Ronin → V), `tx_a60_will` (Angel → Misaki, after the list),
`tx_a60_willv` (Angel → V: “she keeps saying ‘my hounds’ and then ‘if’”), `tx_a60_after` (Misaki → V, after
`kd60_rule`: 48h then move on), `tx_a60_grey` (V → Misaki: whether her line stays grey).
Also four server pings and three apathy notes (pushed onto `PINGS` and `AP_NOTES`).

## 2. Misaki lore: the dresses and flight school (also in docs/VOICE.md)

- `lp60_listing` (any of normal/Act II/III/epilogue, day 4+, Angel ≥ 1, tier ≥ 1; both POVs): Angel finds the dead seller
  page. Thirteen to sixteen, queueing for drops, triple markup, $4,112 in a biscuit tin, the birth certificate, “March”,
  rent and then a scope. She kept one dress. Misaki chooses whether to show it (`S.f.lp60Dress` `show`/`keep`; V's POV
  always `show`).
- `lp60_dress` (two days later): the dress on the Sunday table; it is far too small; Angel buys it for Maria at the
  pencilled price ($290, `S.f.lp60Sold`). Ronin: “Scalper.”
- `lp60_fly` (epilogue): V finds an airfield that takes cash for a trial lesson; she banks twice over the house; “$78 an
  hour. I had it at fifteen.” `S.f.lp60Fly` `more`/`once`.
- Topics: `lp60_t_why` (V asks “Why a pilot?”; one door that locks from your side; ties to the architect's “NOT A CELL”
  room if that was seen; “a careers fair nobody turned up to”), `lp60_t_now` (Misaki asks whether they'd let her fly now).
- Thread `tx_lp60_v` (Angel → V: the plane on the packing slip).

## 3. The infirmary, and after (both settings)

Misaki's POV, spots in `medbay` once she knows where she is:
- **The server** (from her second day, once): it kept going without her, which is the rule; V posted once, “Has anyone
  seen hitmeuppp,” and then nothing for the number of days she was gone.
- Full story only (`kdSA()`): **V's shirt**: eleven buttons, checked before she opens her eyes, done up again. Nothing named.
- Injuries only: **Count the stitches**: twenty-four new, and old ones under them that somebody put in, she doesn't know who.
- Worst route only (`kdWR()`, still deluded, after that day's state-of-mind scene): **the rule as comfort**: by now they
  have all moved on, as voted; she does not let herself wonder about the tall one. `S.f.a60WR`.

V's POV, side menu while she is in the infirmary: **The kennel corridor, at night** (three nights, once a day):
1. Ronin and Angel on the corridor floor with a bottle. “Rule’s for when you’re dead. She ain’t dead. Technicality.”
2. Full story: the shower at 4am, forty minutes; he turns the boiler up and doesn't ask. Injuries only: she changes her
   own wrist dressings in the dark, faster than the doctor.
3. Worst stays (`kdWorstOf()`): she tells the tall one nobody is coming because they have a rule, and he answers in the
   tall one's voice. Otherwise: she recites her will in her sleep, and he moves Prickles to the kitchen windowsill.

Aftermath (`kdEv`, placed in `KD_ORDER`):
- `kd60_rule` (both POVs, after `kd_hard_angel`): “You broke the rule. All three of you.” Angel greyed her line and
  un-greyed it the same night.
- `kd60_vpage` (V, after `kd_v_ledger`): the page he wrote the night before the river, listing where her things go. Tear it
  out or keep it (`S.f.kd60Page`).
- `kd60_wr` (both POVs, only if the stay's severity was 8+): “In there I counted on the rule.” Ronin and Angel call it off;
  she makes Angel put it back. V: he voted for it four minutes late, knowing he would not keep it.

Ending lines for the list, the envelope, the kept page and the flying.

## Not done / for the author
- The scalping years (13–16) sit between school ending at about thirteen and the work starting at sixteen; confirm.
- The cactus is Prickles (existing canon); the will gives him to V.

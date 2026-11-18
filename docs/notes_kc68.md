# V and Ronin, off hours (kc68)

All in `src/kc68.js`; tested by `tools/k68_test.js`; reading copy in `docs/kc68_text.md`. A general, slice-of-life
expansion for the V × Ronin route (`S.pov==='v' && S.vrom==='r'`), written to the kc66 guidelines: more whimsy, fewer
lists and less procedure, flirting and funny scenes that are adult but not explicit (innuendo, teasing, fade-outs,
mornings after). There is no plot and there are no sequenced act beats; kc67 has those. Nothing here reads or writes
kc67's state.

## Gate
`K68()`: V's POV, `S.vrom==='r'`, not lone, dark or abroad, not in the infirmary (`S.kd.med`), and the phase is normal,
act2, act3 or epilogue. Nothing plays in `taken` or `after`, and nothing mentions the kidnapping, so `kdSA()` needs no
switch. Act II material is kept light and does not touch Misaki's recovery.

## Delivery
- **Location events** (`L68`, `l68(id,rooms,p,when,run)`): wrap `ROOMS[id].enter` the way kc64 does. On entering a room
  there is a chance (0.35–0.4) that an unseen event plays, after whatever else the room opened has closed. Each plays once
  (`S.seen[id]`). They share kc64's one-a-day cap (`S.f.k64LDay`), so a day has at most one location scene from either
  module. Ronin's apartment events wait for him to be home (`ronWhere()`).
- **Mornings** (`M68`): one every other morning at most (`S.f.k68MLast`), in order, through the shared `mbOk()`/`mbUse()`
  cap. Not in `EVENTS`, so the random morning pool never picks them.
- **Side activity**: "Spend the evening with Ronin", once a day (`S.done.k68Eve`), costs a slot, rotates five scenes
  (`S.f.k68EveN`).
- **Threads**: `tx_k68_heat`, `tx_k68_dog` (Ronin), `tx_k68_mi` (Misaki), `tx_k68_an` (Angel). Server pings (`G68S`) at
  0.3 of `serverPing` calls while `K68()`.
- Wrappers: `ROOMS[*].enter`, `morningEvent`, `sideHub`, `serverPing`, `extraEnding`. New names are all `*68*`, `vr68_*`,
  `m68_*`, `tx_k68_*`; grepped, no collisions.

## Scenes
| Where | Id | What | Choice → flag |
|---|---|---|---|
| atrium | `vr68_brolly` | the crowbar in the umbrella stand; "That’s a lease, Vee" | "Then he pays rent" (kiss against the coat hooks) / move the umbrellas out → `k68Brolly` `rent`/`stand` |
| Ronin’s apartment | `vr68_suit` | V irons Ronin’s one suit on the workbench for court (41 parking tickets); "Do the other leg slower" | |
| kennel | `vr68_boots` | the grey and pale hounds adopt Ronin’s boots as puppies | new pair / "Give." (returned wet; "It’s the spit") → `k68Boots` `new`/`back` |
| archive | `vr68_glasses` | Ronin in V’s reading glasses, reading a file; "Mister Foundation’s got a thing for specs" | |
| ops deck | `vr68_heat` | the thermostat turned all the way up, code 666 | turn it down (he wears V’s coat) / split the difference → `k68Heat` |
| Ronin’s workshop | `vr68_carve` | Ronin whittles the old hound for V | desk / coat pocket → `k68Carve` |
| garage | `vr68_truck` | Ronin teaches V to drive his truck badly; the horn plays a hymn | take the kerb / indicate (round the roundabout on two wheels) → `k68Truck` |
| laundromat | `vr68_pink` | V’s shirts come out pink | wear it to the board / wash again in cold → `k68Pink` |
| city square | `vr68_arcade` | the zombie gun game; V puts in "V", Ronin "HIS" | |
| city square | `vr68_sing` | karaoke: V refuses the duet, Ronin sings both parts in V’s voice, then V sings | pick up the mic / take it home and sing in the kitchen → `k68Sing` |
| the range | `vr68_range` | V fixes Ronin’s stance ("Hips."); Ronin throws the crowbar instead | |
| roof | `vr68_coat` | Ronin inside V’s coat; asleep on him till morning; Misaki finds them | |
| V’s bathroom | `vr68_bath` | the bath is full of Ronin; "Physics, Vee"; fade on the sponge | |

Mornings: `m68_cook` (Ronin cooks from the hounds’ shelf, the landlord, crumble for breakfast), `m68_bingo` (church
bingo, the lilac cardigan, a ham; → `k68Bingo` `table`/`hounds`), `m68_shirt` (morning after at Ronin’s, the tie on the
fan, his T-shirt under V’s suit, Angel texts), `m68_choir` (the hounds howl along with the gospel radio; Misaki at six).

Evenings: the crime show; Revelation in voices; chess (the king in his pocket); the haircut with the straight razor;
dancing in the workshop sawdust.

Ending lines: the umbrella stand (any `k68Brolly`), the wooden hound (desk / pocket), three parking tickets (`kerb`),
the karaoke video (`sang`) or the microphone in the drawer (`home`), the lilac scarf (`table`), the old boots (`new`).

## New facts to confirm with the author
- Ronin has 41 unpaid parking tickets and went to court for them in his one suit; the magistrate halved the fine.
- V had eleven years of piano lessons and sings the low part in tune.
- The horn on Ronin’s truck plays the first line of a hymn.
- Ronin goes to Tuesday bingo in the hall behind his church; his own red dabber, his own chair; the women at his table call
  him "the young man". One wears a lilac cardigan.
- Ronin keeps one record that is not gospel, and a record player in the workshop. He owns a Bible stolen from a hotel.
- Ronin’s bed at his apartment is a mattress on the floor; there is a church across the road with bells.
- The hounds’ meat is on the second shelf of the big fridge. The old hound is the one with one ear up.
- V’s glasses are gold wire (existing); V’s long coat is the one Ronin borrows.

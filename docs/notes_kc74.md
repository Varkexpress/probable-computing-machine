# Enemies to lovers from day one (kc74)

All in `src/kc74.js`; tested by `tools/k74_test.js`; reading copy in `docs/kc74_text.md`. kc74 builds on kc73 (see
`docs/notes_kc73.md`). The author asked for the route's early game to share essentially none of the normal route's
V–Misaki interactions. kc73 had made the route a layer you entered on days 1–4, and the early game was otherwise still
the normal route. kc74 moves the entry to new game, gates or swaps every normal-phase V–Misaki interaction, and fills
the early game with its own content.

`K74N()` is true when the route is on (`E2L()`) and the phase is `normal`. Every gate checks it. After the kidnapping
kc73's plan stands unchanged, except that its after and boat beats now open with callbacks to kc74's choices.

## 1. How you enter

- **Title screen → "Enemies to lovers: V × Misaki" → Misaki or V.** This option was added to `title()` in the original
  region of index.html, and it is the only edit there. The existing "Play as Misaki / Play as V / Play as both" buttons
  are unchanged and remain the default, so the normal route stays what you get unless you choose this option.
- `k74Begin(p)` makes the run (`NEW(p)`, with `S.f.e2l=1` set before day 1). It plays a short route intro (Misaki: rent,
  plus the billionaire who has started taking her marks; V: his file on her) and then kc73's card-man night as the
  opening (`k73Entry(true)`): the alley, the carpet with shoes on, and “I did. You were next.”
- **The in-fiction choice is the oath.** Both options start the war, and each sets `S.f.e2lOath`:
  - Misaki: *swear it back* (`loud`), or *say nothing and strip the rifle on the roof under his camera* (`quiet`).
  - V: *write her name in the ledger* (`ledger`), or *send her the file, so she knows the charges* (`file`).
- **Why a route choice at new game, not a branch at the first exchange.** In this game V and Misaki have no scripted first
  meeting. They know each other from the server before day 1, and the first normal-route V–Misaki interaction can fire
  on any of a dozen paths (a morning event, a thread, a visit, the mall, the talk menu). An in-fiction branch on day 1
  would either play after one of those, or add a new scene to the normal route's opening. Choosing at the title keeps the
  normal opening identical, and the route's own opening is still a choice made inside the story.
- **kc73's day 1–4 side entry (⚔ “Somebody took your mark”) is retired** (`k73EntryOk()` returns false). A mid-week entry
  would mean the early game had already run the normal route's scenes. `k73Entry()` without the flag keeps the old
  swear / let-go pair, so old saves and kc73's test still work.

## 2. The gate: inventory

The route caps affection at 24 in the normal phase (kc73), which already keeps the tier-gated scenes asleep. kc74 gates
every one of them explicitly as well. The test forces affection to 80 to prove the explicit gates hold. The lists live
at the top of `kc74.js` (`K74G_*`). The test prints them, so the counts below are the build's own.

| What | Count | Ids / how |
|---|---|---|
| Morning events (EVENTS, td22's `K22EV`, td19's `T19EV`) | 67 | the thermos and sticker gifts, `confess`, the laundromat text, the garden, `vtold_v`, 3am texts, the dog book in the post, St. Aldric’s, the school ID and maths sheet, the deep-house note, film night, movie pile, td19 V/M, the glasses, the five-year reminder, the bowls, the door latch, the frog plasters, the bentos, every Through Glass V/M event (`gl_first`, `gl_e_*` news/season/forecast/dinner/kennel/scope/ronin/hara), the sanctuary (`k24_laundry/breakfast/knives`, `k24_delivery`/`k24_storm` in Misaki’s POV), shirtless at home, the paper puzzle, brunch in V’s POV, the kennel table, the tally, the stitched paw, V’s file on the four, alibis, the news, the power cut, the scream, the hose, the set, book club, the doorbell at seven, kc58’s stair, book and first, kc60’s Sunday list, quiet server, dress listing and dress, the V contract, Angel’s “are u gonna be at V’s” (Misaki), the architect, the stream, the wrong man, the steady hands, the vote, the black bath and the hotel (`k25_bath`, `k25_hotel`) |
| Phone threads | 19 | `tx_vjob tx_mrent tx_vroof tx_vlucky tx_vgroc tx_mcontact tx_vhands tx_m4am tx_vcactus tx_mbiscuit tx_g_stars tx_mw_door tx_k58_late tx_k58_kettle tx_w59_vq tx_w59_vm tx_c64_v tx_k66_m tx_k66_v` |
| Calls | 4 | `c_vjob c_mlate c_vfour c_mtap` |
| kc64 location scenes | 12 | `c64_parab c64_book x64_wash x64_spar f64_shelf f64_roof f64_kitchen`, and per POV `c64_bed c64_env c64_skin` (V), `x64_car x64_hound` (Misaki) |
| Angel’s gacha arc (kc64) | 8 | the whole arc waits until after the normal phase: it is set on V’s couch with the four of them as a household, and its beats run in order |
| House barks (TDREACT) | 24 | every bark said *by* the other one (`by:'v'`/`by:'m'`), plus `v_gate t_trFirstV t_aloneV t_vbedroom k24_think k22_terrorV dp_domeReveal v_vault v_fridge v_piano v_train`, and her trailer barks at him in V’s POV |
| Side menu | 10 patterns | `♥` dates (kc66 break-in night and the rest), “Watch Misaki watch the street”, the night drive, “Sit in the pens with the hounds” (Misaki), Sunday at the table, drinks at V’s, “Ask V to make the heat go away”, the last page of the ledger, Sunday at V’s table, “Do nothing (everyone)” |
| Server lines | 17 patterns | the seating chart, the basement board, the group photo, “did you eat today”, “Inform me when you are home”, the shirtless meeting call, the day-off banter |
| Talk | all | `convo('v'|'m')` → `k74Talk`: TOPICS_V/M, TDTOP_*, gifts (`giftMenu`) and affection (`affectionMenu`) are reached only through that menu |
| Functions | 12 | `sleep` (bed menu: her trailer, Angel’s, Ronin’s; never his couch or bed), `afterBed` peach night (`k71Ok`), `nightWake`, `moveInReady`, `morningEventM` (moving in, the wing, home life), `wingOfferThen`, `partnerHere` (no cooking together), `dpCompanion` (no deep-house company), `vGiftShop`, `mallV` and the mall NPCs, the wheel NPC, the td18 sleepers |
| Room props | 4 + 2 | the atrium couch (with V there), the archive letter (+10 and the postcard CG), the greenhouse sketchbook, the trailer bills (V’s cash envelope); the atrium’s first-visit line and V’s first trailer visit get route lines |

**Swapped for counterparts** (same slot, same plot flags):
- kc60's `a60_server` keeps the rule (`S.f.a60Rule`, which the infirmary and Act II use). On the route Misaki says “if
  ur standing over my body i’d better be the one who put it there”, V says “I will be the reason”, and nobody goes for
  wings together.
- kc59's `w59_v_ask` and `w59_v_circle` keep the war foreshadowing and their state (`F.st`, `F.lever`, `F.watched`).
  The friendly options are gone (“tell her tonight”, “ask her to move in now”). V now answers “She is in my ledger”, or
  pencils the outfit onto her page, or sits outside her lot as a hunter.
- kc56's `k56_file` in Misaki's POV: V's folder is left on her step instead of him visiting (`S.f.k56File='m'` kept).
- `kd_omen` in V's POV: the canal body becomes a line on her page, and he does not like the shape it makes next to the
  firm's name. `drift_txt`: drift texts from V or Misaki are dropped; Ronin and Angel still drift.

**Kept shared, and why:**
- **Plot machinery:** jobs, contracts, rent, the landlord, the kidnapping trigger, Hale, kc56's backbone (except the
  trailer visit), kc59's war (Misaki's notice, warn, Hale and circle beats, and V's ledger, Hale, hunted and glimpses).
  These are about the outfit closing in, and V and Misaki read that war separately. The “tell V” option in
  `w59_m_warn` stays tier-gated (“not close enough”), which is true on this route.
- **Ronin and Angel:** their arcs (kc57), their threads, the gacha arc once it can start, rel/dk scenes with only one of
  V or Misaki, server lines that do not assume friendship, and the karaoke and drinks options gated by their own rules.
- **Exploring V's house:** “Sneak into V’s base” stays; on the route it is casing. Props that are about learning him (the
  shelves, the vault, the corkboard) stay, because they are not interactions with him. Anything that has him in the room
  is hostile (talk, the couch, the sleepers).
- **kc58** after the kidnapping, **kc66** `vm_codes` (kc73 already limits kc66 to that), **the Kyoto trip** (no partner
  below tier 2), the deep house (opens for Misaki at tier ≥ 1, which the cap prevents).

## 3. The new early game

- **The war menu** (⚔ *The war: him* / *The war: her*): one action a day, and each action costs time. The first time
  through, each action has a choice. Later visits rotate through variants.
  - Misaki: *Surveil him* (the water tower; shoot his mug or raise the flask → `e2lMug`), *Case his house* (leave the side
    door open, or leave nothing → `e2lCase`), *Intercept his mark* (the vet who sells fighting dogs; open the van or
    don't → `e2lVan`), *Leave a threat* (twenty-four photographs; the twenty-fifth is the grey hound asleep in the sun →
    `e2lPhotos`).
  - V: *Study her* (write the cactus down, or leave it out → `e2lCactus`), *File her collateral* (the doorman's widow,
    the Tuesday girl's maths prize → `e2lFile`), *Plan the kill* (SLOW or QUICK → `e2lPlan`; needs Study first),
    *Follow her home* (the candle, the bowling shoes; go or wait → `e2lFollow`).
- **Set pieces** spliced into kc73's order, one ⚔ beat a day: eye → **lift** → **kennel** → sab → **dinner** → truce.
  - **The customs-house lift** (`e2l_lift`): the papers seller on the ninth floor, the porter's power cut, forty minutes
    in the dark with a pistol under his chin and a scalpel at her ribs. Misaki can cut his jaw, V can take her pistol,
    or they hold → `e2lLift m|v|held`.
  - **The kennel at three** (`e2l_kennel`): her rifle is on the hounds to draw him down. Misaki feeds the old hound or
    keeps the rifle on them; V tells them to stay or sets them on her, and they refuse → `e2lKennel`, `e2lHound`. This
    explains why the hounds let her past the stairwell in kc73's foundation dinner.
  - **Angel's table** (`e2l_dinner`): the weapons go in the salad bowl. Misaki tips the fold in (Ronin drinks it) or
    doesn't; V drinks his glass, or pours it into Angel's fern → `e2lDinner`.
- **Ronin and Angel in the middle** (location events, sharing kc64's one-a-day cap): Ronin takes her rifle and asks
  her to promise “not in his sleep” (promise, or he sleeps in his truck outside V's gate), or asks V to show him the
  page (“Vee. This is a fuckin' diary.”) or to choose → `e2lRon`. Angel does Misaki's nails and asks the real reason
  (the shelter, or a lie), or loads her shotgun at V (“if she dies i'll kill you”) → `e2lAng`.
- **Running into each other** (location events): the laundromat at three (“Since April.”), the last train (the man in
  the suit; “that doesn't count”), the harbour (he reties a granny knot underwater), the greenhouse (hemlock), the mall,
  and gondola seven on the wheel, forty metres up, where either could tip the other.
- **Hostile talk** (`k74Talk`, three things a day): his house (who he killed for it, why not Hale, the ham, ballpark,
  the knife and the kettle, “say one nice thing”), her trailer (the doorman's shift, the foundation, the lock, the money,
  who taught her to shoot, both of them shooting Prickles, “one true thing”). The banter topics open after a few talks
  or after the lift.
- **Mornings** (`mbOk()`/`mbUse()`, one a morning): the parking ticket in fountain pen, Hale at the trailer (give him
  the car or not), the deadbolt on the step (fit it or canal it), the laser dot on his toast, Hale at the foundation
  (give him her file or not).
- **Threads:** the lift aftermath (V), the old hound's hip (Misaki), Ronin's book at $340, Angel's dresses. **Server:**
  seven route exchanges, in rotation, some depending on flags.
- **The swaps above**, plus the lock (vGiftShop), the mall, the wheel and the sleepers (four steps to the bed; she leaves
  a bullet on his nightstand, he locks her door from outside with her own pick).

### What it feeds

- **kc73's beats:** before `e2l_after` and `e2l_boat`, `k74Echo()` plays up to four lines from the player's choices: the
  scar on his jaw or the round in his pocket, the old hound at the gate, Angel's new fern, Ronin pouring his own, the
  two holes in Prickles, the near-attempt count (`e2lTally`), the brass plate gone from the shelter door, the
  twenty-fifth photograph, and what his plan says at the top.
- **Endings** (`extraEnding`): the jaw or the round, the old hound, the fern or Ronin's glass, the shelter rule, Prickles,
  and Hale.
- **Lone routes:** `isLone()` already turns the route off (`E2L()`). If the run was on the route, `loneIntro` swaps the
  “he still pours two cups” line for a route line (V: the total somebody else wrote on her page; Misaki: he came into
  the river although he had sworn to kill her, and it killed him) and records `S.f.e2lLone`.
- **kdSA() and sugOn():** nothing in kc74 touches the hours or anything suggestive, so it reads the same with either
  setting.

## Word count

About 10,000 words of strings, counting both POVs and every variant (`docs/kc74_text.md` is the reading copy). One
playthrough in one POV sees about half.

## Tests

`node tools/k74_test.js`:
- (a) Plays seven days on the route in both POVs, from the real opening, with real affection and with affection forced
  to 80. It checks every gated list, the talk menu, the bed menu, the redirected functions, three real morning draws a
  day, the threads that actually start, and a real hub call.
- (b) Plays 176 scenes, options and paths, and checks 2,500+ lines: V never contracts, no hound names, nothing
  undefined.
- (c) Builds a copy of index.html with kc74 cut out (between `/* ===KC74-BEGIN=== */` and `/* ===KC74-END=== */`) and
  compares 192 seeded states off the route: side menu (and late), eligible events and the one actually drawn, threads,
  calls, kc64 scenes, barks, server, talk menu, bed menu, cooking partner, moving in, the mall and the wheel, kc73. All
  are identical.

`tools/k73_test.js` was updated for the retired entry (it now calls `k73Entry()`) and for the new beat order.

## New facts to confirm with the author

- The shelter on the north side turned Misaki away at fourteen for having no papers, in the snow. V's rule about papers
  is there to stop children being collected by men claiming to be family. On the route the brass plate comes off the
  door, and the ending says the shelters no longer turn children away.
- V owns the old customs house on the river. A tenant on the ninth floor sells people's papers. The night porter cuts
  the power from two to a quarter to three.
- V has watched Misaki do her laundry since April. She leaves her truck keys on the front tyre and the spare trailer key
  in the cactus pot.
- The old hound is fourteen, with a bad hip (back left leg).
- V carries a scalpel and a garrotte in his collar. Misaki buys a fold of poison at the station.
- The doorman she shot had swapped a shift to pay for his wife's teeth. The Tuesday man's daughter is eleven and won a
  maths prize. V pays her school fees through a trust.
- The vet on the ring road who sold fighting dogs (two of the six lived and are at V's house).
- Angel's fern (six years old) and the “okayest vigilante” mug, which Misaki may shoot.
- Angel keeps a black dress for each of them.

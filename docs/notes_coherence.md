# Story coherence pass (kc56)

The arcs read as disconnected because each phase introduced its own villain and none of them caused the next one.
The fix gives the whole run one spine: **a man in a grey suit, working for the Chairman, who keeps V's father's
second ledger.** He sells Misaki's address to the organisation she hurt most, lends the note-taker's pages to the
Mimic, and wants V to inherit the book. Each phase now plants the next one and pays off the one before.

## The throughline, arc by arc

**Act I (normal).** Misaki takes contracts; whichever organisation she hurts most (`captorOrg()`) is also the one V's
foundation is building a file on (`k56_file`). That gives them two grudges and one target they can find. A polite man
in a grey suit pays the lot manager to read the tenant register (`k56_grey`, Misaki), and a company with a ship for a
logo, Constance Holdings, sends the shelters forty-one thousand dollars (`k56_grey`, V). The existing grey-sedan,
"stranger in a suit" and "detective who looked back" mornings now point the same way.

**The kidnapping (taken).** In the van the first question is about K9 (`takenM`), so the interrogation's focus on K9
follows from the set-up. V runs the partial plate and finds Constance Holdings (`k56_plate`; the interlude's
"probably nothing" folder now names it).

**After, and the finale vs the boss.** In the kitchen they work out why her: her contracts, his file, and somebody who
sold them which trailer (`k56_why`). Inspector Hale and Ren Avery are introduced here, before the case that needs them
(`k56_hale`, `k56_avery`). When the boss falls, is ruined or escapes, the last word is the same: the address was
bought from a man who keeps a book (`k56_boss`, wrapped around `ending('final')`). The friends' chat no longer says V
already killed "him" while the boss is still alive.

**Act II (the Mimic).** The three suspects are laid out on day 2 with motives that were set up in Act I (`k56_a2sus`;
lone routes get `k56_lone2`). The Mimic knows Misaki's list because the note-taker made copies (`k56_a2pages`, which
follows the notebook choice from kc27). Angel finds the grey suit at two scenes (`k56_a2grey`). V admits he burned his
father's ledger at nineteen and never asked who people went on paying (`k56_a2burn`), which is what Keller and the
Act III card refer to. **The default culprit is now Ren Avery** (the captor's accountant), so the case grows out of
the kidnapping; Hale is the Mimic only if V ruined the boss on paper, and Isherwood only on the stalker route. The Act
II ending lines say where each culprit's pages came from.

**Act II into Act III.** Before the November interlude, the Mimic (if caught) says he was sent by a man with a ship on
his card; if not caught, a box of unused tags arrives, paid for by Constance Holdings (`k56_a3why`).

**Act III (the Ledger).** Opening the box, Misaki recognises the note-taker's crossed sevens in the ledger's hand, and V
connects Constance to the car, the cheque and the tags (`k56BoxLines`). The river page shows the Chairman sold her
address to the captor "through K." and had the warehouse cleaned "through T." (`k56_a3river`); those are Kessler and
Tully, names five and three. Hale, if he was not the Mimic, calls to say who took his file pages and why he is now on
their side (`k56_a3hale`). The blank "Valentin" page is a vacancy: the Mimic was a job interview (`k56_a3heir`). Once
Kessler and Tully are dealt with, Misaki writes their whole names into the margin (`k56_a3kt`). The Chairman's face-off
now states the motive: he sold her address, and lent the pages to the man who wore V's name.

**Epilogue.** With Act III done, V checks who buys the trailer lot, and the list from the kitchen table gets its last
line according to the ending (`k56_epi`). Without Act III, the ship card arrives and goes in a drawer.

**Lone routes.** Unchanged in shape; `lateV`/`lateM`/the kc50 `self` route still go to the lone Act II with Avery as
culprit. They get the suspect set-up in one voice (`k56_lone2`).

## What changed and why

### New: `src/kc56.js` (~4,500 words of player-facing text)
- A one-scene-per-morning scheduler (`K56`, `k56Due`, wrapped `morningEvent`); `k56Play(id,cb)` runs a scene directly.
- Scenes: `k56_file`, `k56_grey` (two options each in V's POV), `k56_plate`, `k56_why`, `k56_hale`, `k56_avery`,
  `k56_a2sus`, `k56_lone2`, `k56_a2pages`, `k56_a2grey`, `k56_a2burn`, `k56_a3river`, `k56_a3hale`, `k56_a3heir`,
  `k56_a3kt`, `k56_epi`; `k56BossScene` (wrapped `ending`), `k56WhyScene` (wrapped `startAct3`), `k56BoxLines`
  (spliced into `A3_BOX_OPEN`).
- `k56HaleOut()`: if Hale was the Mimic, his Act III lines (beat 8, the last night, the paper ending, the fall ending,
  Tully's arrest, Oakes's note, Fern's option label) go to a harbour sergeant, airport officers or the prosecutors.
- Test: `tools/k56_test.js` plays every scene and option from both POVs, the boss/why variants, the culprit mapping,
  the Hale replacements, and the scheduler.

### Edited in place (original region of `index.html`)
- `newRun`: "three dogs" → four hounds. Interrogation: "tokyo. his name is pochi." → "the moon. his name is spot."
- `takenM`: the last line now says the first question in the van is who K9 is (motive for the interrogation).
- `vRescue`: "nothing K9 would do" contradicted V being a practised killer; now "not how he likes to do it".
- `finale`: "a rifle he hasn't fired in nine years" contradicted the same; now "the rifle he keeps for one kind of night".
- `chatLog` (after): Angel and Ronin no longer say V killed "him" while the boss is alive; Ronin claims the boss.
- `startAct2`: culprit mapping (see above). `SUS().heir` description no longer says he survived a massacre that may not
  have happened. `act2Ending`: one clause per culprit on where the pages came from.
- `INTER.after`: Misaki's half was set in a guest room the night she actually wakes in the infirmary; it is now the
  car from the river. V's half now happens outside the LAUNDRY door. `INTER.act2` (V) no longer claims every name on
  the list was crossed out. `INTER.taken` (V) names Constance Holdings on the plate.
- Act III, Japan removed: Ginza/Harrow Trust, Odaiba → Pier Nine (which A3_NIGHTS already used), Setagaya, Narita,
  Sapporo, Shinagawa, Kasumigaseki, "2004 Miwa", "kita", the "hello kitty keychain"; "Shiro" and "Sayuri" dropped.
- Act III, contradictions: Kessler "knocked on the trailer door" only if the `police` morning fired, otherwise he drove
  past it; his daughter's "cat named the black hound" (a bad find-replace) is a black cat; Angel's invented "sister" is
  gone; Fern's page now explains why the archive file said a man V's father ruined hired Maas; the quiet-night ledger
  entry names the captor organisation; the Chairman states his motive.
- Act III ending "fall" (one of them dies) no longer appends the couple's coda or offers "Keep living (epilogue)".
- Coda: the grey hound no longer steals socks (removed canon).
- Removed canon elsewhere: Ronin's sister June (romance "tell me something true" now tells the church/shed story the
  rework kept), Kamakura (Maas lives up the coast), Okinawa, Uji, "Ten Million Yen", "three dogs" in four places,
  June in two Through Glass lines.
- Misaki's school years (backstory topics, `bk_coach`, `bk_ending`, `e2_stage`, `e2_run`): drama club, the track team,
  a coach and a family who "wanted a daughter" contradicted the current lore (nothing on paper before nine, school from
  nine to thirteen, no clubs, timed maths competitions, the trophy pawned). Rewritten to that lore; the coach card is now
  the photocopied maths results sheet.

### Edited in `src/`
- `td3_trailer.js`: the Kita High Twelfth Night script in her drawer → the carbon of the enrolment form where she wrote
  MARCH herself (kc27 canon). `td6.js`: the KITA HIGH RELAY cassette → an unlabelled tape that came with the truck.
- `td19.js`: the knee scar was a track fall at a prefecture final with a coach; now a fire escape at eleven.
- `td15.js`: "Biscuit" and "all three dogs" in visible text. `kc19.js`: "the Shinjuku contract".

## Left alone, or for someone else
- `kc25` (The Long Leash, a separate universe) still uses "the Sergeant" as V's rank there; left as is.
- `trCoach`, `td_coachV` and the "A card to Coach" keepsake are unreachable (nothing calls `trCoach`); left in place.
- V's fencing coach and the St. Aldric's backstory are V's and do not conflict with the rework, so they stay.
- The Misaki surname "Katsuo" (a topic is built on it) was not changed.
- The 'Coach Kerr' contract target is an unrelated villain.

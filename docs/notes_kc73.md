# Enemies to lovers: V × Misaki (kc73)

**Revamped by kc76** (`docs/notes_kc76.md`): chapters, the war page, two new beats (`e2l_show`, `e2l_pair`), and the
foundation dinner's cake replaced by the glass in V's hand.

All in `src/kc73.js`; tested by `tools/k73_test.js`; reading copy in `docs/kc73_text.md`. This is an optional route
layer on the main V/Misaki route. They start the run sworn to kill each other. The kidnapping, the infirmary and the
Mimic force them together, and on the boat they either declare it (lovers) or shake on a truce with knives under the
table (rivals). No existing scene was edited. Everything is added by wrapping, and every gate checks `E2L()`.

## The direction (author)

This is the second pass. The author asked for more darkness, so the hostility is ideological and lethal, not a playful
rivalry.

- **V** starts with no empathy for her at all. By his law she is one of the wanton, deranged killers: she has no code
  and kills for rent, and she leaves collateral (a driver at a gala, a doorman, a man shot in front of his daughter
  because the contract said Tuesday). He swears formally, in his ledger, to kill her: “MISAKI (hitmeuppp). WANTON.
  COLLATERAL: SEVERAL. TO BE KILLED.” He studies her as he studies any mark.
- **Misaki** despises him as a “morally righteous” vigilante and a billionaire hypocrite. In her view he launders his
  killing through a foundation and calls a rich man's hobby law, while she kills because the landlord does not take
  morals. She swears it back.
- **The early beats** are near-attempts, with the contempt said to each other's faces. Angel and Ronin are frightened
  for them. Ronin runs a book “so I don't have to drive over there”. Angel will not bet on which friend dies; she seals
  a single envelope instead.
- **Humour** stays dark and in the characters' mouths. The banter only grows as the hatred wears down.
- **Neither of them ever stops believing what they said.** By the boat they have stopped being able to act on it: “I
  still believe every word I wrote about you. I have not been able to act on one of them since the river.”

## How you enter

**Superseded by kc74** (`docs/notes_kc74.md`). The route is now chosen at new game: title → “Enemies to lovers: V ×
Misaki” → Misaki or V. The opening is this module's card-man night, `k73Entry(true)`, where both answers are oaths
(`S.f.e2lOath`: Misaki `loud`/`quiet`, V `ledger`/`file`). The day 1–4 side entry described below is retired
(`k73EntryOk()` returns false); `k73Entry()` without the flag still has the old pair for old saves.

Formerly: on days 1–4 of the normal phase, the side menu showed one free entry, **⚔ Somebody took your mark** (Misaki)
or **⚔ Take the card man off her roof** (V). It costs no time.

The scene: V takes the card man behind the bowling alley (forty percent to people at the shelters, a finger when they
are late). Misaki has lain on the laundromat roof for three nights on a $900 contract for him. V tells the server she
was next.

- **Swear it back** (“i’ll kill u first, grandpa”) or **Write her name in the ledger** sets `S.f.e2l=1` and drops
  affection to at most 10.
- **Let it go** or **Leave her page blank** (old flow only) sets `S.f.e2lAsk=1` and `S.f.e2l=0`.

kc74 also splices three set pieces into the normal-phase beats below (eye → lift → kennel → sab → dinner → truce), and
gates or swaps the normal route's V–Misaki interactions while the route is in its normal phase.

## Beats

Beats come from the side menu one at a time (⚔, costs time), at most one a day (`S.f.e2lLast`), and each plays once
(`S.f.e2ld[id]`). Normal-phase beats missed before the kidnapping are skipped, and later text reads their flags as
absent.

| Phase | Beat | What happens | Choice → flag |
|---|---|---|---|
| normal | `e2l_mark` (entry) | the card man; “You were next”; the file on her; “says the billionaire who launders murder through a charity”; Angel and Ronin step in | swear it / let it go → `e2l` |
| normal | `e2l_eye` | She shot the shelter landlord to show him she could. V comes to her trailer at 4am with plastic sheeting to kill her, and she wakes with a pistol at his temple. Lex talionis: he came for all of her, and takes an eye on account. | the scope (she stands a bullet on his desk where his four pairs of reading glasses were) / the IOU on her electricity bill, “OWED: ONE EYE, AND THE REST” → `e2lEye` `scope`/`note` |
| normal | `e2l_sab` | V's foundation dinner. She has two names tonight: the mark, and the man giving the speech. She puts rounds through the place cards to show him how close she is. He has two hounds waiting at the foot of her stairwell. He stands in the window and puts his own head in her scope, to find out what she is. | the round past his ear / the glass shot out of his hand, nine stitches (a dead billionaire at his own dinner is a martyr: “i want u to bleed first … and die later somewhere stupid”); the hounds let her past, and he did not tell them to → `e2lSab` `m`/`v` |
| normal | `e2l_truce` | Angel: “you are scaring people. ronin hasn't slept.” The bowling alley accords: nobody kills anybody for seven days, nobody enters anybody's home, and each says one true thing about the other by Sunday. | she breaks it on Tuesday (the car-wash dogfight; “the accords are about us”) / he puts a camera in her smoke alarm and Ronin finds it → `e2lTruce` `m`/`v`. Sunday: “waiting for it to do something i can shoot him for”, “That is why her name is first in my ledger.” |
| taken (V) | `e2l_come` | the river; “thought u swore to kill her. it's in ur fuckin' book” | “She is mine to kill. Nobody else does it.” / say nothing → `e2lPride` `debt`/`true` |
| taken→after (both) | `e2l_door` | escaped: why his door; rescued: “the only one who wanted you dead badly enough to come and check”; V: the door, or the speed limit | – |
| infirmary | see below | | `e2lLedger` `kept`/`torn` |
| after | `e2l_after` | Everybody is being nice to her. “Be mean to me.” | he insults her properly (“Your name is still in my ledger. I will kill you when you can hold a fork in both hands, and not before”), and she laughs for the first time since the river / he is kind, and she learns from it how bad it was → `e2lAfter` `war`/`soft` |
| act2 | `e2l_car` | Angel pairs them, because the Mimic is signing K9 to her list. Eight hours in his car. They say “the third roof” at the same moment. “I still think you should be dead.” / “pass the flask” | a bet on a parking ticket / she sleeps two hours under his coat → `e2lCar` `bet`/`watch` |
| act2 | `e2l_stitch` | A hired boy with a box cutter. V will not go through the LAUNDRY door, so she stitches him with her right hand and her teeth. | neat / crooked, with a hook like an M → `e2lScar` |
| act2 | `e2l_spar` | The training hall, her cast off, first to three. She pins him: “say Misaki wins” / “a confession made under duress”. | the kiss (V's option: “If you are going to do it, do it.”) / he taps the mat → `e2lSpar` `kiss`/`pin` |
| act3 | `e2l_boat` | Pier Nine, two nights before the auction. They put a hide in the Constance's port lifeboat and lie forty minutes under the tarp while a guard smokes. Callbacks: the camera, the hook of the scar, three to one, the ledger page with no total. | **declare it** (“I am declaring war. On you.” Terms; her counteroffer, “I win”) / **keep the war**: a truce with knives under the table (her name stays in his ledger, and each keeps a hand off the trigger unless the other moves; they shake with their other hands on a pistol and a knife) → `e2lEnd` `lovers`/`rivals` |
| act3/epilogue | `e2l_morn` (lovers) | The morning after: both phones go off, Angel opens the envelope, Ronin pays out. | – |
| epilogue | `e2l_epi` | Lovers: WAR DAY; they still race for marks, and the loser cooks. Rivals: no attempts since the Constance, though both still could. They settle marks with a coin on a roof and leave down the stairwell side by side, because neither will turn their back. Once a year a bullet stands on his pillow, and he sleeps. | – |

### The infirmary (author's direction: genuinely conflicted, not romantic)

These scenes are delivered through the hub (`k73MedScene`), only while `kdMed()`, and only after kc61, kc62 and kc63
have played their scene for that slot. V gets at most two a day, from slot 1, in order. Misaki gets one a day, in the
evening, chosen by clarity. A run through the real scene chain gives V all four scenes in two days and Misaki all
three on an ordinary stay.

V despises her. He swore to kill her, and his code says he could close the account now. The thought of doing it makes
him sick, and he does not understand why. Seeing her take him for her captor makes him sick as well. All of this is
shown in what he does:
1. **The door frame and the ledger.** He stands with his hand on the frame. She thanks the soup, the doctor and him in
   the voice people use for whoever holds the keys. Upstairs, her page opens with the oath; he writes the date under
   the last line. *Write the total* is greyed (his hand will not do it). He can close the ledger, or tear the page out
   → `e2lLedger`.
2. **Dinner.** The thought arrives whole and lawful. He gets as far as the back stair in his head, and is sick in the
   sink with the tap running: “I would sooner put my hand in the mincer.” The old hound watches him.
3. **The hounds at night.** Through the vent she asks the door, politely, to keep the light on; in her head the door
   is him. He takes all four hounds out in the rain to the far wall until three. On the worst route he does it every
   night after.
4. **The dressing.** He changes it coldly and exactly. She reads his care as technique (“you're the careful one, so I
   talk to you; it's a good system”). He washes his hands long after they are clean and tells himself it keeps the
   debt collectable. In the `gone` band she does not speak at all.

Misaki, while the room is a cell:
1. The man who swore to kill her runs it, and it fits together like a rifle: he wrote it down, he is the most patient
   man in the city, he sat in her trailer with sheeting and decided she deserved worse than quick. *Throw the tray*
   is greyed.
2. She hears the hounds go out and counts them back.
3. Once clear: it was never him, and she cannot make that come out either way.

Nothing resolves in the infirmary. The turn starts at `e2l_after` and is earned in Act II (the car, the stitches, the
mat). Nothing names or hints at what happened in the hours, and nothing shows a method. The text touches only injuries
(the hand, the ribs), so it is identical with `kdSA()` on or off. The worst route changes scenes 3 and 4.

### Threads, server, location events

- **Threads:**
  - `tx_e2l_m` (V → Misaki): the shell casing with her thumbprint, filed next to an unsent letter to Hale; “You would be
    very easy. Lock your door.”
  - `tx_e2l_v` (Misaki → V): she is on the water tower with a rifle, and he is behind her; “u had the shot. i had the
    shot. nobody took it”.
  - `tx_e2l_pool` (Angel, either POV): “are you actually going to kill each other”.
  - `tx_e2l_a2m` and `tx_e2l_a2v` (Act II): the stitches.
- **Server** (`chatLog` wrapper):
  - Normal phase: the ledger, billionaire against rent, Ronin's book as a way of coping, the envelope.
  - Act II: the book is frozen.
  - Epilogue: WAR DAY (lovers), or “it's been a year. nobody's dead” (rivals).
- **Location events** (a one-a-day cap shared with kc64 and kc68 through `S.f.k64LDay`):
  - `l73_crepe`: the last crêpe, with a family in the queue. Both their hands go for weapons and stop. “It is the whole
    of my complaint against you.”
  - `l73_base`: she learns his house and stands a bullet on his pillow. He tapes it into the ledger and sleeps in the
    chair facing the door.
  - `l73_board`: Ronin's whiteboard. “Numbers move, somethin' happened.” He has not picked a side.
  - `l73_range` (Act II/III): the range, with banter now that it has started to grow.

### Outcomes and endings

- **Lovers**: affection is uncapped. The morning after plays (with META.sug on, in his bed; with it off, on his study
  couch with her boots on, both dressed). The epilogue is WAR DAY, and Angel wins the envelope.
- **Rivals**: affection is capped at 49 for good, so no romance anywhere fires. The truce has knives under the table:
  no attempts since the Constance, though both are still able; her name is still in his ledger; a bullet stands on his
  pillow once a year. The envelope stays sealed.
- **`extraEnding` lines**: lovers, rivals, or no decision (“swore to kill each other over a carpet, and neither of them
  has managed it”); the eye; the crooked scar; the ledger page; who broke the accords (the camera, or three days).

## Coexistence with the normal route

The rule is to add a layer and change nothing in place.

- **Affection cap** (`k73Cap`): normal 24, taken/after 49, Act II/III 74 until the boat, lovers 100, rivals 49. The
  `apply` wrapper enforces it by trimming the delta, so no misleading toast appears, and `hub` enforces it silently.
  This keeps every tier-gated friendly scene asleep while they are enemies: the thermos and sticker mornings (`v_gift`,
  `mi_gift`), `confess`, “did you eat today” in the server, moving in, kc58's stair and notebook (tier ≥ 1), kc64's
  flirting (tier ≥ 2) and kc66's romantic register. The tier-0/1 lines in the rescue (“…took u long enough.”) already
  read right.
- **Still plays as written:** the kidnapping, the rescue or escape, every kd/kc61–63 infirmary and aftermath scene,
  kc58's aftermath beats (the creak, the pages, the rule), the Act II and III plot, kc56/kc59/kc60 and the friends'
  beats. These are about trauma and plot, and V caring for someone he swore to kill is the point of the route.
- **kc66 on this route:** `k66Due` is wrapped so that only `vm_codes` (the security room; aftermath, never romantic)
  plays. Break-in night, the trophy, the house tour and the year-on epilogue assume a long, easy romance, so they are
  skipped. Its threads and its morning after need break-in night, so they are skipped too.
- **Other romances:** if `S.rom`, `S.vrom` or `k28pair` is set later, `E2L()` is false and the route goes quiet,
  including its ending lines.
- **Wrapped functions:** `sideHub`, `vRescue` (V's river scene first), `after` (the door scene first), `hub` (the
  infirmary scenes and the cap), `apply` (the cap), `morningEvent` (the morning after, with `mbOk()`/`mbUse()`),
  `chatLog`, `extraEnding`, `k66Due`, and `ROOMS[id].enter` for mall, atrium, ronin, dp_range and training.
- **Names:** all new names are `k73*`, `K73*`, `l73*`, `e2l*`, `tx_e2l_*` or `E2L`, and each is checked to be declared
  once in the build. kc72 is untouched.

## Suggestive setting

These scenes branch on `sugOn()`:
- The end of the boat confession. On: they do not get back to the dinghy until dawn, and she rows home in his coat with
  not much on under it. Off: her head on his chest, listening to the harbour, then she rows home in his coat.
- The morning after. On: his bed, shirtless, “You won. Repeatedly.”, the scar. Off: the study couch, boots on, “I was
  there for all of it”.
- Angel's envelope. On: “in bed by the boat”. Off: “together by the boat”.

Off keeps the flirting and the romance and implies nothing happened. The test checks that state is the same both ways
and that the off text implies nothing.

## Word count

The reading copy has about 9,400 words of player-facing text (top tier, both POVs). The module's strings, counting
every tier and variant, come to about 11,000 words.

## New facts to confirm with the author

- The card man behind the bowling alley (forty percent, fingers); Misaki's contract on him was $900.
- V's file on her: a driver at a gala, a doorman, a man shot in front of his daughter because the contract said
  Tuesday.
- The shelter landlord; the man from the hospital fund at the foundation dinner, taken out by Hale's officers in
  handcuffs; the man who runs a dogfight in a car wash.
- V keeps a ledger of people he has sworn to kill, with an entry for Misaki. He brings plastic sheeting to a kill so as
  not to leave a mess.
- V owns the water tower near his house.
- The hounds let Misaki past on the stairwell without being told.
- V took Misaki's scope (she took all four pairs of his reading glasses and left a bullet), or he wrote an IOU for “one
  eye, and the rest” on her electricity bill. Angel lent her a spare scope.
- Angel's bowling alley accords and her sealed envelope (“they end up together by the boat”); WAR DAY in the server
  calendar; Ronin's whiteboard on his fridge.
- On this route, V will not go through the LAUNDRY door after she comes out of it. Misaki stitched his left forearm
  (with a crooked hook like an M, if chosen).

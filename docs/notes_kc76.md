# The war, made plain (kc76)

All in `src/kc76.js`; tested by `tools/k76_test.js`; reading copy in `docs/kc76_text.md`. This is a revamp layer on the
enemies-to-lovers route (kc73, kc74, kc75). The author asked for two things: the darkness clearer, and the progression
clearer. Everything is added by wrapping and gated on `K76()` (the route is on), except three text edits in kc73 and one
pronoun fix in kc74, listed below.

## Progression

The route had fourteen beats delivered one at a time from a ⚔ side-menu line, with nothing to say how many there were,
which part of the story you were in, or why nothing was on offer today. Now:

- **Five chapters.** I · THE OATH (normal phase), II · THE DEBT (taken, the infirmary, after), III · THE CASE (Act II),
  IV · THE TERMS (Act III), V · A YEAR ON (epilogue). `K76CH` lists the beats of each. Beats that only exist for one POV
  or one outcome (`e2l_come` is V's; `e2l_morn` is lovers only) are counted only where they exist (`k76Has`).
- **A chapter card before every beat** (`k76Card`, wrapped round every `K73B` run, kc75's yard, and kc73's river and door
  scenes): `THE WAR / I · THE OATH / The cold room · 3 of 9`, and one plain sentence on where the oath stands
  (`k76Stand`), which changes with the phase, the attempts count and the boat's outcome.
- **⚔ The war so far** (free; side menu, and the pause menu outside conversations) opens the page (`k76Page`):
  where it stands, what unlocks the next move (`k76Next`), every chapter with its count, one line per move made that
  reads the player's own choice (`k76Line`), moves that were missed (“It never happened.”), how many are left in the
  chapter, the attempts count, blood drawn, and the dead. In V's POV the lines are in his ledger hand and the page ends
  on the total he cannot write; in Misaki's they are second person (“You do not keep a ledger”).
- **The due beat's sub line** now reads `costs time · the war · I · 3 of 9`, and **the hub line** ends
  `⚔ The war · I · The oath · 3 of 9.`
- `k76Next` says the things the game never said: one move a day; chapter I closes when the second rent is paid and
  moves not made by then are lost; nothing moves while Misaki is held; the infirmary scenes come on their own; the
  kitchen comes a few days after the infirmary; the boat is two nights before the auction.

## Darkness

- **`e2l_show`, the cold room** (chapter I, straight after the trailer; it needs a new day but leaves the day's move
  free, so chapter I is no tighter than before). V takes the card man's fingers, one for each he took from people at
  the shelters, and lets Misaki see it on a feed: “This is what the word slow means when I write it. Your page says the
  same word.” Misaki watches all of it, or answers with V's bedroom window through a scope; V sends all of it, or one
  minute → `S.f.e2lShow` `watched|answered` (Misaki), `all|minute` (V). This is the first time the oath is shown as a
  method and not a word.
- **`e2l_pair`, the first one together** (chapter III, between the stitches and the mat; the mat now waits for it). They
  take the man who hired the boy with the box cutter, and argue over him while he listens: a week downstairs by V's law,
  or one round once he has said the name. → `S.f.e2lPair` `quick|slow`. Quick: V does not enter the man on Misaki's
  page. Slow: Misaki holds his head, and their hands are steady. The turn in Act II is no longer only banter; they find
  out they work well together over a body.
- **The page keeps the damage in view**: `k76Blood` (V's jaw, V's hand, Misaki under four hounds, Ronin poisoned in
  V's place, Misaki's hand and ribs, V's forearm) and `k76Dead` (the card man, the shelter landlord, the vet, the
  councilman's nephew, the man from the hospital fund, the car-wash man, the man who hired the boy). Both are derived
  from existing flags.
- **Edits in kc73** (in place):
  - The foundation dinner's second option was “Shoot the cake” (buttercream, slapstick). It is now “Shoot the glass out
    of his hand”: glass standing in his palm, blood in his cuff, nine stitches; “You had my head. You took my hand.” The
    flag is unchanged (`e2lSab='v'`: he keeps the mark). The three later callbacks (the kitchen insult, the garage, the
    server) now refer to the glass.
  - The 4am trailer scene: “with a SHOWER CURTAIN?” is gone. Misaki asks what the plastic is for and V tells them: “It
    is for you. You would have gone out of here rolled in it, and down to the cold room under my house.”
  - Three lines that still called Misaki she/her now use they/them (and one of Ronin's in kc74).
- **Ending lines** for `e2lShow` and `e2lPair`.

## State

New flags: `e2lShow`, `e2lPair`, `e2lCh` (which chapter cards have opened a chapter). Everything else is read from
kc73/kc74/kc75's flags. Old saves on the route work: the page fills in from what they already did.

## Coexistence

- Off the route nothing changes: no side entry, no pause button, no hub-line suffix, no cards (`k76_test` checks each).
  kc74's test still finds the normal route identical to a build without kc74.
- kc76 guards every reference to kc74/kc75 with `typeof`, so the build with kc74 cut out (used by `k74_test`) loads.
- `tools/k73_test.js` and `tools/k74_test.js` were updated for the new beat order (eye → show → lift → kennel → sab →
  dinner → truce; car → stitch → pair → spar).

## New facts to confirm with the author

- The card man is kept alive in the cold room and loses a finger for each of the eight he took; V finishes him the
  night of the feed and the hounds get the bucket.
- The boy with the box cutter was hired, for forty dollars, by a man who runs a minicab office behind the station.
- V hums the cello piece from the car while he works.
- V's hand took nine stitches at the foundation dinner (only if the player chose the glass).

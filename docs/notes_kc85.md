# More of the room (kc85), and Misaki's top tier

`src/kc85.js`; tested in `tools/k80_test.js`; reading copy `docs/kc85_text.md`. Needs kc73, kc76–kc84.

## Sixteen more infirmary scenes, opened by the player

kc84's scheduler already fills every slot of the stay, so these are not scheduled. While `kdMed()`, the side menu has
one free entry: **⚔ The room** (Misaki) or **⚔ Outside the room** (V). It lists the scenes for the current setting,
POV and clarity; each plays once; two a day (`S.f.e2l85`, `e2l85Day`, `e2l85N`).

**Full story** (kc29's rules: never named; the honest option greyed with `KD_NO`; each pretence a `kdDeny()`; nobody
tells Ronin or Angel):
- Misaki, cell: `x_radio` (four seconds of a choir; “you can put it back on, I love a choir”), `x_water` (the cup of
  water that used to come after; they drink it and wait for the rest, and nothing comes).
- Misaki, clear: `x_ceiling` (rating ceilings; V's is a six; the other one does not get its number; he has the crack
  filled the same day), `x_fridge` (he fitted the lock, gave the doctor the only key, and told her not to hand it to
  him even if he asked).
- V: `x_radioV` (Ronin's radio; Ronin guesses, is told to keep his guess, and sits awake in the chair every night
  after without complaining), `x_owed` (a ledger page for the men from the river; the charge is not his to name; →
  `e2lOwed` `word`: “OWED TO M. AMOUNT NOT STATED. TO BE COLLECTED AT THEIR WORD”, or `blank`: one empty line).

**Injuries only** (kc36's rules: no denial, no doctor, V does the treatment; V's disgust, despite himself):
- Misaki, cell: `y_report` (the injuries given as a job report; “I’ve had worse off a ladder”; his pen goes through
  the paper), `y_ties` (he comes in with scissors and they hold both wrists out, crossed, before they have thought).
- Misaki, clear: `y_floss` (the old stitches, done at twelve with mint dental floss; “It is a competent stitch”),
  `y_stars` (they make him rate the injuries: two, one, nought; his own plan, nine, withdrawn).
- V: `y_boot` (the boot print on the hoodie, and the scuff where the sole was cleaned: “I have never in my life wiped
  my feet on one”), `y_sleep` (they do not wake when three broken ribs are re-strapped; “the body was taught not to
  report”; he covers the open hand so as not to see it).

**Either setting:** `z_name` (Misaki hears how he says their name in the corridor, and tests him), `z_line` (V chalks
a line four steps from the door because he does not trust his feet; the black hound lies down on it, on their side).

## Misaki's top tier

The author noticed that Misaki had begun to sound like V at the highest tier, then asked for a light fix: keep some
contractions at that tier, and change nothing else. `tools/mv_loosen.py` contracts the common pairs (I am, do not, it
is, you are, cannot…) in the fourth variant of every `K7xMV(...)` call in kc76–kc85 (84 lines) and leaves wording, the
third variant and V alone. `k80_test` checks that no top-tier line in those modules has an uncontracted “do not / is
not / cannot / will not / I am not”. A heavier rewrite was tried first and reverted at the author's request.

## New facts to confirm with the author

- Ronin gives up his radio in the kennel corridor and sits awake there every night.
- V fits the lock on the infirmary fridge and gives the doctor the only key.
- At about ten Misaki fell off a ladder on somebody else's roof; at about twelve they stitched their own side with
  mint dental floss and a hotel sewing kit.
- The man with the boot takes a size eleven and wears his heels down on the outside.

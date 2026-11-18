# What was done, and how (kc84)

`src/kc84.js`; tested in `tools/k80_test.js` (section a); reading copy `docs/kc84_text.md`. Needs kc73, kc76–kc83.

The author asked for more infirmary scenes on the enemies route: material for the strand that the injuries-only
setting hides (the full story), and more for injuries only, in particular V finding the injuries and the manner in
which they were inflicted disgusting, despite himself.

Twelve new infirmary scenes (six per setting), one chapter II beat with a version for each setting, and a new
scheduler. With kc73, kc80 and kc83 the route now has 25 infirmary scenes of its own, of which a stay shows up to
19 (full story) or 17 (injuries only), on top of kc73's seven.

## Full story (`kdSA()` on)

kc29's rules, kept without exception: what happened in the hours is never named, by Misaki, V, the doctor or the
narration. Misaki knows, and V knows. The honest option is on every menu and is always greyed (`KD_NO`). Every pretence
is a `kdDeny()`. V can decline to force it and cannot make them. Nobody tells Angel or Ronin, and nothing shows V
knowing anything Misaki has said to the doctor.

The route's own edge: the man who knows is the man with forty pages on them who swore to kill them slowly.

- **Misaki, cell.** `s_clothes`: the tall one brings clothes, shuts the door and walks to the far end of the corridor,
  loudly; “they don’t leave when you—”; the sum is stopped. `s_asks`: he will do the hand and nothing else, and asks
  before he moves the blanket by the width of a hand. “The ones who ask are the ones who want to hear you say yes.”
  Saying yes turns out to be the wrong answer.
- **Misaki, clear.** `s_book`: he carried them out, he saw what they had on, and he writes everything down. They ask
  him, sideways, what he wrote. “The date. The address. That you were recovered alive… The rest does not belong to my
  book. It is yours, and I have no claim on it.”
- **V.** `s_table`: the doctor's list (a camera, a ruler, a date card, a white box that seals, a lock for the small
  fridge) and what he knows it is for; he keeps a steel table for that kind of man and had meant to put Misaki on it.
  He burns the plan, which is not the book. `s_voice`: the pleasant voice is a method and not cowardice, and he does
  not know when it was learned; “the book is for eyes and for hands. It has no column for this.” `s_vent`:
  “NOTHING HAPPENED. Write it down”, the first thing in their own voice since the river, heard through the vent. He
  screws the vent shut, or is in the kennel with the hose running at that hour every day (`e2lVent`).
- **Beat `e2l_marks`, full story:** the hot water runs out in V's house for the first time in eleven years. Towels
  outside the door; V loud at the far end of the house, so that they know where he is. → `e2lMarks` `boiler`/`towels`.

## Injuries only (`kdSA()` off)

kc36's rules: no denial and no doctor; V does the treatment; Misaki names each injury flatly and does not care,
because none of it is new. What is new is V's disgust.

- **V.** `i_manner`: he knows how a hand is broken, in order and for cause. This was a heel, a boot from the left, and
  cable ties left until they went through. “There is no order in it. There is no charge… I jointed the card man, and
  I am standing over a kicked rib and I find it obscene.” His own plan was worse, and he is no longer sure the one on
  the table would have known the difference. `i_third`: “Third time for that one. It sets fine. Do the thumb first.”
  The old unset breaks on the lightbox, from before nine; he took in four used animals and wrote nothing against
  them, and forty pages against this one. `i_scale`: they weigh less than the grey hound; they were not even starved
  on purpose, only forgotten. He objects as a tradesman objects to bad work, and it does not stop there. “I did not
  ask to be made sick on behalf of something in my own book.”
- **Misaki, cell.** `i_wrists`: they tell the “guard” how to clean a wrist properly, and cannot see why he looks ill.
  `i_careful`: they take his disgust for professional annoyance at the other shift's sloppy work, and apologise for it.
- **Misaki, clear.** `i_snob`: “so you’re a snob about it” – “Yes. It appears that I am.” Nobody has been disgusted
  on their account before.
- **Beat `e2l_marks`, injuries only:** the pins come out on the kitchen island. V intends to find the man with the
  boot and will not have it said that it is one trade. → `e2lMarks` `same`/`differ`.

## The scheduler

kc84 replaces `k80MedScene`. Scenes have ids and an optional setting; the order is in `K84_POOLS`; seen scenes are in
`S.f.e2l84`. Misaki now also gets the late-night slot (kc73 keeps the evening). kc80's doctor lines have
injuries-only variants (Ronin's canned soup; “for the exercise”), and the consent form and the doctor's last-day scene
are full story only. Some later lines in kc81–kc83 still mention the doctor in the injuries-only setting (the war
page's Thursday line among them).

## New facts to confirm with the author

- V has had four men of that kind on his table, and has sat with people it was done to.
- V's ledger entry for the river is the date, the address and “recovered alive”, and nothing else.
- V's house gets a second boiler; the vent over his desk may be boarded shut.
- In injuries only: a back tooth is gone on the left; six pins; the old unset fractures include an arm, two ribs and a
  collarbone.

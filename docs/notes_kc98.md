# How the worst route ends, on the enemies route (kc98)

`src/kc98.js`; test `tools/k98_test.js` (17 checks); reading copy `docs/kc98_text.md`. Needs kc50–kc52, kc73,
kc76–kc97. About 2,400 words.

## The direction (author)

After kc97 I left the worst route's ending unchanged and asked: write an enemies-route version, or keep the worst
route off this route. The answer was to write it.

## What the worst route is

Infirmary severity 8+, Misaki's POV (kc49–kc52). The delusion does not clear by itself. Composure falls each
morning; at 3 or less, at bedtime, Misaki decides before the people holding them can. On the normal route the tall
one is somebody they love and do not recognise, and the ending turns on recognising him a moment too late.

## What is different here

On this route Misaki has known all along who the tall one is: K9, who swore to kill them. What they have wrong is
what he means to do. So the recognition at the end is of his intention, and it is made out of the things the earlier
scenes put in the room: the sign that reads LAUNDRY backwards, the toothbrush with a frog on it, the pillows, the
splint, the door that was never bolted, and soup that somebody made himself, badly, three times a day. “A man who is
getting you ready does not learn to cook.”

What they are losing, through kc97's daily scenes and into this one, is the war. By the last night the hatred has
gone and they cannot find the door to it.

## What is the same, and must stay so

- **No method is shown or implied, anywhere.** The test checks the module's text for it.
- **It is not written as a victory.** The line “not when he says” parallels the original's “Not Friday. Not them.” It
  comes from exhaustion, from days of the bag, and from a mistake about a man, and the scene that follows at once
  shows it to have been a mistake.
- The structure, flags and conditions are the original's: `S.f.kdSpiral`, `kdSpiralSecret()`, `S.f.kdInterrupted`,
  `S.f.lateRoute='self'`, `startLone('v')`, `kdShapeLines()` from the bright turn.

## The parts

1. **The dark thought** (`K98_WARN`, an outer wrap of `hub`, in place of `KD_SPIRAL_WARN`): three lines about “the
   when”.
2. **The last night** (`k98Spiral`, called by a wrap of `kdSpiral` when the route is on). What they still have; a
   paragraph that differs by aftermath setting, as the original's does; the war gone; Ronin and Angel as a photograph
   of a town they used to live in; “i was gonna do him somewhere stupid. i said. i’m sorry about that one.”
   **After:** YRDNUAL; he had them nine days and he made soup; they want to tell him to his face that it is bad, and
   cannot. **V:** too late by minutes. He swore it, in ink, and it was the one thing about him on which they relied.
   Ronin: “Tell me it wasn’t you.” Under the mattress, the spoon, and the case against him on a soup label, five
   lines crossed out, the sixth (“nobody asked him.”) not, and under it “came anyway.” `S.f.e2l98='late'`.
3. **Interrupted** (`k98Interrupted`; same condition as the original: two clues found, and a goodbye given for V,
   which on this route is the message for K9). He has sat at the door every night since. “I am K9. I swore to kill
   you, and I have not, and I am not going to, and neither are you.” “u made the soup” / “I made the soup.” / “it’s
   so BAD”. Towards morning they tell him that they are still going to kill him, and he says that he will hold them
   to it. Misaki lives. `S.f.e2l98='heard'`. The following morning has a route version (`kd_interrupted_after_e2l`).
4. **V, after** (`K98_AFTER`, seven mornings on his lone route, in place of `KD_AFTER`): “Not collected.” · Ronin
   closes the book and leaves the crowbar standing in the kitchen table · Angel brings the cactus (“so don’t water
   it”) · he pays the trailer's rent to himself and has the receipt made out in their name · the four, done exactly,
   and it does not help · he has been making the soup for nine days without noticing, and it is bad · on War Day he
   stands for an hour in the bowling-alley car park with his back to the laundromat roof, and nothing happens.

## Unchanged

- The bright turn (kc52). It has only “the tall one” in it, and plays as written; its three choices still shape what
  V finds.
- The uncanny moments (kc52) and the clue scenes (kc50), which are neutral.
- The side-menu option on V's lone route, “Sit in the infirmary doorway” (kc52), still has the normal route's text.

## To confirm with the author

- Angel says that V is not in Misaki's will on this route. The normal route's will leaves him the cactus.
- V fits no key to the trailer after; he pays its rent to his own holding company (this rests on kc95's fact that he
  bought the lot).
- On the worst route V's count stays at forty-one.

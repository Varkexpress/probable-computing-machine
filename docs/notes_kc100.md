# Up close (kc100)

`src/kc100.js`; test `tools/k100_test.js` (200 checks); reading copy `docs/kc100_text.md` (`node tools/k100_dump.js`).
Needs kc73 and kc76–kc98. About 6,100 words.

## The direction (author)

“add some more in general, especially for the platonic/romantic actions for the enemies to lovers route.”

## The gap it fills

In the early game the route has its own talk menu (kc74). After that, talking to the other one fell back to the
normal route's topics, and the normal “Affection…” menu offered hugs, hand-holding and a compliment that slips out as
“i love you” (kept in check only by the route's affection cap). None of that is these two.

On the route, that menu is now **⚔ Up close…**, with the route's own actions. They change with where the two of them
are. Each has a first version and one or two for repeats; affection rises a little each time.

| Stage | When | Misaki, to V | V, to Misaki |
|---|---|---|---|
| wary | out of the infirmary, before `e2l_know` | take his glasses off his face; pat him down; boots on his desk; fall asleep where he can see you; throw something at him | re-tie their sling; correct their grip; hand them a knife, handle first; the other end of the couch; leave the hall light on |
| know | after `e2l_know`, before the corridor | straighten his collar (the scalpel under it); take his coat; take his wrist; lean on him; sit on the counter while he cooks | put your coat over them; fix their star clip; stand between them and the door; let them have the last word; count their breathing |
| cold | after the corridor, until the boat | leave something on his step; drive past his gate; test his window lock | sit at the end of their lane; slide something under their door; listen for the bolts |
| lovers | after the boat | kiss him somewhere stupid; take the scalpel out of his collar; cold feet; read him his charges; your hand over his on the range; try to call him something | kiss their left hand; lie behind them, facing the door; read them their page; ask them to do the onion; give them the chair facing the door; play the piano |
| rivals | after the boat | shake on the terms; spar; share his flask; call the wind for him; four steps | clean their rifle while they sleep; spar; hold your flask out; keep watch; four steps |

Romantic actions stay enemies' actions: the kiss keeps the promise to do him somewhere stupid; the scalpel is taken
out and put back; the charges are read as the thing that cannot be said. Rivals stay platonic, and the four steps of
the terms keep shrinking.

Misaki's names: “ur honour” throughout. In “try to call him something” a pet name will not come out, which keeps
kc95's rule that the first one slips out a year on.

Under the suggestive-scenes setting off (`sugOn()`), “lie behind them” plays on a roof, back to back, instead of in
bed.

Not in the normal phase (kc74's menu covers it), not in the infirmary, and not off the route. “Never mind” returns
the talk.

## Build change

The build loaded `kc19`–`kc99` with kc99 (the topic sync) last. It now loads `kc19`–`kc98`, then `kc100`–`kc199`,
then `kc99`, so new modules can go above 99 and kc99 stays last.

## New facts to confirm with the author

- V learned the piano as a boy and knows one hymn, which Ronin also sings (with other words).
- V's reading glasses: he cannot read without them (already in Misaki's file on him in kc95).
- Angel has a rug at her place exactly four steps across.

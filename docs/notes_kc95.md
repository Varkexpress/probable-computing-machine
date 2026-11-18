# Talking, after (kc95)

`src/kc95.js`; test `tools/k95_test.js` (96 checks). Needs kc73 and kc76–kc94. About 3,700 words. A general
expansion of the enemies route outside the infirmary.

## Talk

kc74 replaced the talk menu with a hostile one for the early game only. From the kidnapping on, talking to the other
one fell back to the normal route's topics, which assume a friendship. On the route, until the boat, `convo('v'|'m')`
now opens a route menu (`k95Talk`; not in the infirmary). Three things a day. The topics follow where the two of them
are (`k95Stage`):

- **wary**: out of the infirmary, before the realisation. “Am I still in the book?” / “Yes… I have never killed a
  thing that was not well.” The place laid at table. Hale. Nineteen pistols to clean. “You have not insulted me today.”
- **know**: each has found out alone that they will not do it, and is sure the other would. Every exchange is two
  people fishing: “What’s the date, in the book, for me?” / “There is no date.” “Have you had any offers of work?” /
  “I don’t ask who.” The boots. The rifle zeroed at chest height on a lane where he hung the targets.
- **cold**: after the corridor, until the boat. The file slid across the island. The old hound standing in the empty
  room. A conversation entirely about doors. The manifest under the trailer door, taken before he lets go of it.

Five topics a stage, each way: thirty exchanges. `S.talks['k95_'+id]`.

## A year on

Two more scenes for kc83's epilogue menu, each with lovers and rivals versions: **the trailer** (he sleeps in it, a
foot too long for the bed; or he fits a better lock every year and keeps no key) and **the number on Ronin's fridge**
(days nobody has tried to kill anybody; “it’s the same number”).

## Mornings

`m95_rent` (after phase): V paid the rent through to the spring. “A debtor’s property is kept in order until the debt
is collected.” `m95_coffee` (Act II, before the corridor): “It is not poisoned. —K9.” / “prove it.”

## New facts to confirm with the author

- V owns nineteen pistols. On this route V pays Misaki's rent on the second day they are missing (the normal route
  has its own version, `sub_receipt`).
- Misaki has turned down two contracts: one was a child, one did not pay enough.

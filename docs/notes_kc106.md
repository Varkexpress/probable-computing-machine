# The infirmary, again (kc106)

`src/kc106.js`; tests `tools/k106_test.js` (125 checks), `tools/k86_test.js` (the pool) and `tools/k80_test.js` (the
scheduler); reading copy `docs/kc106_text.md`. About 9,000 words.

## The direction (author)

“undo most of the infirmary expansions, and write them again with proper characterization and new concepts.”
Asked to choose, the author picked: keep the route's original infirmary scenes (kc73) and the two newest delusion
rounds (kc104, kc105); remove and rewrite everything in between; lean the voice towards the author's own sample; a
tighter, stronger set rather than the same number.

## What was removed

From the source files, not just switched off (git has the old text):
- kc80: the scheduled infirmary scenes (`K80_MC/MX/V` are empty).
- kc84: its twelve setting-specific scheduled scenes; `K84_POOLS` starts empty and kc106 fills it.
- kc85–kc89, kc90, kc91, kc92, kc93, kc96, kc101, kc102: every player-opened scene (185), including kc85's own.
- kc90: the three nights (`k90Night` returns null). kc91: the drip opening. kc94: “The thought” / “What you want”
  (its arrays are empty, so its side entry never shows).

Kept in those files: the helpers (`k86`, `N`, `M2`, `Ms`, `k84No`…), the menu and scheduler code, the gating chain
(`K80()`…`K105()`), and everything outside the infirmary: kc84's `e2l_marks`, kc90's `e2l_bucket` and `e2l_table`,
kc91's green book, kc101 and kc102's mornings and worst-route scenes. Ending lines that refer to removed scenes stay in
the code but can no longer fire.

Tests: `k92`, `k93` and `k94` were deleted (all their subjects are gone); `k80`, `k86`, `k90`, `k91`, `k101` and
`k102` were cut down to what remains.

## The voice

The author's sample (`docs/voice_sample.md`): killers who enjoy the work and are good at it, funny because they are
dangerous. Misaki is loud, profane and unserious even hurt, counts fear in numbered steps and puts the bravado on top
(“one: alive. great. love that for me.”). V is formal and dry with menace in it, keeps the law of an eye for an eye,
and is tender only about his own, stated as fact. The pain shows through the jokes; nobody explains it. Canon kept:
the drip; in the cell stage Misaki takes the tall one for K9, who has bought them, and only taunts and tests him;
V's chart says no sedatives.

## What it adds

**Scheduled, in order** (kc84 delivers them): Misaki in the cell: waking up (“he outbid four guys with a van”),
terms (“two for one, this week only”), the drip (“the stuff they give senators”), feeding time (“i’m like nine stone
wet, that’s a bad meal”). Once clear: the fifth day (“fuck u” / “Ah. You are yourself again.”), a two-star review of
the infirmary that he has framed, a contract to repay him that he returns amended (“Party B was collecting his own
property”). V: the river and the bitten collar; the four men's bad work; their page, “Collection deferred”; Ronin at
the gate; Angel at the gate (“the claim’s THEIRS, you pompous fuck”).

**The pool** (47; with kc104's and kc105's 28 the pool is 75):
- Misaki, cell (18): rating the weapons in the room; the drip line as a garrote, attached to them; grading his
  visits; “eighteen kilos, cubed”; a faked fit to time him (nine seconds); the rottweiler joke; the soup and lex
  talionis; the carpet jingle (“There is a second verse.”); his glasses; pain by calibre; nearly warning him of a
  shadow; ivory walls and clean grout; the good-patient con; “when”; a pistol with no firing pin to strip; calling
  wind on a roof; the last thing they said to Angel; a word in crackers.
- Misaki, clear (12): the rifle; trading scars with Ronin; Angel's stream; “i’m a TAX DEDUCTION”; planning the four
  with him; off the drip, insulting everyone; the hounds inspect the cast; fourteen sandwiches; forty-one against six
  hundred metres; the caught punch; Ronin's book at twenty to one; trying to thank him (“i’ll gut u”).
- V (17): the whetstone; the first of the four, and going home; cards with Ronin in the passage; resetting the finger;
  cancelling the gala; the four pages; “mine”; lying to Hale; being graded; the faked fit; the rottweiler; calling the
  wind back; the crackers; the insults notebook and the cufflinks; Angel, “warden”; one line a night; the coat with the
  bite in the collar.

## New facts to confirm with the author

- V has a housekeeper of nine years; he has never been short with her until now.
- V cancels the foundation gala, the one public engagement of his year, while Misaki is in the infirmary.
- Misaki once put a man to sleep with a syringe in a lift; was shot with a nail gun at sixteen; bought their truck at
  nineteen. Ronin was shot with a sawn-off at nineteen.
- V's hounds are fed beef from a butcher on the ring road, eighteen kilos a Thursday.

# V and Misaki, longer (kc66)

All in `src/kc66.js`; tested by `tools/k66_test.js`. The kc65 treatment for the main route (no `S.rom`, no `S.vrom`,
no `k28pair`; affection through `S.aff`/`tier()`): a beat per phase, a morning-after event, a phone thread per POV and
ending lines, in both POVs. It builds on kc58 (the seventh step, the notebook, the water at three, the `apart` ending),
kc60 (the dresses, flight school, Thursdays), kc42/kc64 (regionals, the calculus book in the go-bag) and kc44 (the
set), and does not repeat them.

## Registers
`k66Mode()` is read at play time:
- **wed** (`S.f.married`): romantic; the rings go on the bedside table by the water (kc58's detail).
- **rom** (unmarried, tier ≥ 2, not chosen the set): romantic.
- **set** (unmarried and chose to stay a set in the audit beat, `S.f.k66Set`; or tier < 2; or kc58 ended `apart`, even
  when married): warm and platonic. Nothing romantic plays or is offered after kc58's `apart`: the morning event is off,
  the romantic thread options are gone, and the epilogue and ending lines have their own apart versions.

## Delivery
- **Side menu.** The next due beat is listed with a ♥ (one at a time). Each plays once (`S.f.k66d[id]`). Gate `K66()`:
  main route only; not lone, dark, abroad or taken; never while she is in the infirmary (`S.kd.med`).
- The after beat waits for discharge (`kdPost()`) and `kdD() ≥ 3`; if missed in `after` it is offered in Act II before
  the Act II beat. Act II waits one day; Act III waits for day 2 of the Ledger; the epilogue beat waits for kc58's
  ending to be decided (`k58End`) when kc58's aftermath has started.
- No morning scheduler, so the shared cap (`mbOk`/`mbUse`) is untouched. The morning event is an ordinary `EVENTS` entry.
- Wrappers: `sideHub`, `extraEnding`. New ids are all `k66*` / `vm_*` / `tx_k66_*`; no collisions.

## Beats

Second pass (author's note: more whimsy, less list jargon, flirting as the backbone). Alarm logs, lock counts, camera
overlaps, the doses folder, numbered report items and the physician's list are gone; the one procedural joke kept is the
bedroom sensor's "false alarms", marked in red.

| Phase | Beat | Choice → flag | Comes back in |
|---|---|---|---|
| normal (tier ≥ 2) | `vm_audit` break-in night: she gets stuck in the hounds' door and the black hound shoves her through; V has it on film (and a copy in the safe). "By that law I am owed an entry." | collect (date) / score first in bed (wed) or cereal on the kitchen floor (unmarried) → `k66Audit` `date`/`report`; report while unmarried also sets `k66Set` (the set) | morning after, epilogue, threads, ending |
| after (not romantic) | `vm_codes` three in the morning in the security room, counting doors; V gives her the master card and apologises; the old hound lies on her feet | change every code, his too / all but his → `k66Codes` `hers`/`both` | Act III, ending |
| act2 | `vm_troph` V bought back the regionals trophy from the stall under the flyover; she sits the paper from that year on the kitchen island with a wager (rom/wed: a prize, "later, here, on the island"; set: he does the washing up for a month in an apron she picks) | shelf in the security room / pawn it again for dinner → `k66Troph` | epilogue, ending |
| act3 | `vm_house` the tour before the boat, with the hounds following like a coach party: the house and the hounds are hers; lex talionis "I would not stop at the eye"; 0311; rom/wed: "This is the bedroom. I believe you are familiar with it", then she watches the door and he sleeps till six; set: rifle on the end of the bed, two cups | | |
| epilogue | `vm_epi` break-in night a year on, the black hound holding the dog-door flap: the chalked MINUS TWO and the card (date), or the framed cereal box (report), or "Noted." (apart); the trophy; Thursdays over the roof (`lp60Fly`); the married key | | |

Morning event `k66_morn` (rom/wed, after `k66Audit==='date'`, normal phase or the epilogue after `vm_epi`): noon, both
hounds on the bed, his arm and then the other arm, the crossed-out line in the notebook, one physician's question in the
board-meeting voice and "born that way or sold".
Threads: `tx_k66_m` (V → Misaki: rom/wed the red pen under his pillow and 7/10 on his shoulder; set the pen in the cereal
box and the black hound's appeal; branches on the scale or where the house lost points) and `tx_k66_v` (Misaki → V: "round
2, i'm in ur house, guess where"; the back stair reply follows `k58Stair`). "7 is generous", "wash it off" and "My bed"
are rom/wed only.

## Care
- The after beat gives her control of the house and is not romantic in any register. It is gentle (the old hound, V
  knocking on his own door) and does not joke about what happened. V asks for nothing or asks once, politely; she counts
  doors in numbered steps. It follows kc58's corner rule (`k58Name`: says her name, waits in the light, or knocks).
  Nothing here touches the hours or the full-story strand, so `kdSA()` needs no switch.
- Suggestive scenes fade out (break-in night, the island, the tour, the epilogue) or are told the morning after.

## New facts to confirm with the author
- Break-in night, once a year: she wired the alarms and has until four to get from the street to his bedroom; stepping on
  the seventh tread is an automatic fail; the prize has never been agreed. She goes in by the hounds' door in the kitchen
  (big enough for most of a person); the black hound shoved her through, and V keeps the clip, with a copy in the safe.
- The unmarried "report" is the score on the back of a cereal box (7/10; the black hound always marked down); V frames one
  a year on the kitchen wall. Married, the house gets 9/10, a point off for his own door.
- A security room off the kitchen, which she drew, with a master card. After the code change every lock is 0311 (third,
  at eleven), or V's door alone is.
- The regionals pawn ticket was in her calculus book; the shop closed years ago and a man with a stall under the flyover
  kept the trophy (a plastic figure holding a protractor). V paid $400. On the paper from that year she gets one wrong
  (question seventeen, the same mistake as at eleven); the winner that year got three wrong.
- The lobster apron (set register: V does the washing up for a month after the trophy paper).
- The house has been in her name since the spring; the old hound will not eat from a bowl someone is holding.
- There is one crossed-out line in V's notebook, which he knows by heart.

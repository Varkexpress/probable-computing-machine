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

| Phase | Beat | Choice → flag | Comes back in |
|---|---|---|---|
| normal (tier ≥ 2) | `vm_audit` audit night: she breaks into the house she secured, by four. "By that law I am owed an entry." | collect (date) / clipboard (report) → `k66Audit`; report while unmarried also sets `k66Set` (the set) | morning after, epilogue, threads, ending |
| after (not romantic) | `vm_codes` three in the morning in the security room, counting doors; V gives her the master card and apologises | change every code, his too / all but his → `k66Codes` `hers`/`both` | Act III, ending |
| act2 | `vm_troph` V bought back the regionals trophy from the stall under the flyover; the paper from that year | shelf in the security room / pawn it again for dinner → `k66Troph` | epilogue, ending |
| act3 | `vm_house` the walk-round before the boat: the house and the hounds are hers; lex talionis "I would not stop at the eye"; 0311; she watches the door while he sleeps (rom/wed: in bed, he sleeps till six; set: rifle on the end of the bed, two cups) | | |
| epilogue | `vm_epi` audit night a year on: the chalked MINUS TWO and the card (date), or the AUDITS binder (report), or "Noted." (apart); the trophy; Thursdays over the roof (`lp60Fly`); the married key | | |

Morning event `k66_morn` (rom/wed, after `k66Audit==='date'`, normal phase or the epilogue after `vm_epi`): noon,
his arm, the crossed-out line in the notebook, V's physician's list, item three and "born that way or sold".
Threads: `tx_k66_m` (V → Misaki: the red pen under his pillow, 7/10 on his shoulder; branches on the scale or the
house's breakdown) and `tx_k66_v` (Misaki → V: "round 2, i'm in ur house, guess where"; the back stair reply follows
`k58Stair`). The "7 is generous" and "My bed" options are rom/wed only.

## Care
- The after beat gives her control of the house and is not romantic in any register. V asks for nothing or asks once,
  politely; she counts doors in numbered steps. It follows kc58's corner rule (`k58Name`: says her name, waits in the
  light, or knocks). Nothing here touches the hours or the full-story strand, so `kdSA()` needs no switch.
- Suggestive scenes fade out (the audit, the epilogue) or are told the morning after (sensor alerts marked as false
  alarms).

## New facts to confirm with the author
- Audit night, once a year: she has until four to get from the street to his bedroom; the cameras on the back wall
  overlap by eleven centimetres on purpose; stepping on the seventh tread is an automatic fail; the house scores 7/10;
  the black hound is always marked down.
- A security room off the kitchen, which she drew: eight screens, forty-one locks, a master card. After the code
  change every lock is 0311 (third, at eleven), or V's door alone is.
- The regionals pawn ticket was in the calculus book in her go-bag; the shop closed nine years ago and a man with a
  stall under the flyover kept the trophy (a plastic figure holding a protractor). V paid $400. She scores 29/30 on the
  paper from that year; first place scored 27; question seventeen is the same mistake.
- The house has been in her name since the spring; the hounds' weights and doses are in a blue folder by the kettle;
  the old hound will not eat from a bowl someone is holding.
- V has a physician's list of eleven items. There is one crossed-out line in his notebook, which he knows by heart.

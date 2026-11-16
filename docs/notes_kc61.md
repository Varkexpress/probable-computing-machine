# kc61: what she keeps (the infirmary, sadder)

All in `src/kc61.js`. Test: `node tools/k61_test.js` (takes the repo root as an optional argument).

The author asked for more sadness and tragedy in the infirmary. This module adds about 4,000 words a playthrough can
reach across both POVs. It covers what Misaki has lost and is trying to keep, the gap between how hurt she is and how
little of it she notices, V beside her and unable to reach her, and household details. The scenes are short and
concrete: a rent receipt, a cactus alarm, a chipped mug, soup tubs, cereal, one trainer.
Nothing names what happened in the hours she cannot remember, and nothing shows a method.

## Misaki's POV, in the infirmary

Spots in `ROOMS.medbay` (placed automatically in the walkable room):

| label | when | what | flags |
|---|---|---|---|
| A drawer | while she thinks it is a cell, once | her things in a clear bag; she hides the rent receipt inside her cast | `S.f.k61Rcpt='cast'` |
| The drawer | once she knows the room | V dried the receipt in his tax history at chapter six; she works out the rent instead of looking at her hand. If she hid it, it is still in the cast | `k61Rcpt='book'` |
| Hair tie | knows the room | one-handed (forty minutes), leave it down, or ask V (tier 2; he ties it like a suture) | `k61Hair` = `one`/`down`/`v` |
| The things by the door | knows the room, day 1+, once | the pile V left after she said she needed nothing: take it all, take only the rifle-cleaning kit, or leave it | `k61Pile` = `all`/`kit`/`none` |
| A black bag on the chair | **full story only** (`kdSA()`), knows the room, once | the doctor's bag with a ruler and date cards. Honest option greyed (`KD_NO`); both pretences call `kdDeny()` | `k61Cam` = `chair`/`v` |

One scene each afternoon (`hub` wrapper, `S.slot >= 1`, at most one a day, `S.f.k61Day`), by band:
- **Clear** (knows the room and the shatter has happened): the WATER PRICKLES alarm on Sunday (text V, who watered him
  a week early, or let it snooze all morning), then her teeth. Full story: she decides the gap was always there.
  Injuries only: two new gaps and an old one she has had for as long as she can remember. No doctor appears.
- **Extended delusion** (`m.xd >= 1`, still deluded, not the worst route): the green mug with the chip and which side the
  chip was on; going over the trailer lot number, the rent day and the hounds so they cannot have them, and losing the
  lot number. V says "fourteen" through the door and she does not trust it.
- **Worst route** (`kdWR()`, still deluded, after that day's state-of-mind scene): she pushes her bread roll under the
  door for the hound she thinks they are starving, and Angel's chipped polish, which she stops picking at.

**After the morning shatter** (the normal stay, kc53's `morning` lines): the bin. Soup tubs, full and cold, one for each
day she would not eat. Eat today's, or keep the lids (`k61Lids`). This runs by intercepting the shatter callback's
`say` once (`kdShatterFx` wrapper). It does not follow the logic, caught or late shatters.

## V's POV, in the infirmary

Side menu while she is in the infirmary (under kc28's "Sublevel two" heading, once a day each):
- **Her things, from the river** (three days): the one trainer (washed and lined up by the front door, `k61Shoe`); the
  receipt pressed in chapter six and the rubber frog (`k61VRcpt`); her phone's cactus alarm, the trailer, her kettle.
- **Her file** (once). Full story: the sealed envelope marked DO NOT SHOW PATIENT goes into the safe unopened.
  Injuries only: he weighs her on the kennel scale; "at eleven I was twenty-six kilos… somebody weighed me for something."
- **Ask what she needs** (once she knows him): "nothing, I'm good"; he lays everything out in the corridor and she takes
  only the cleaning kit. Then he carries it back upstairs or leaves it there (`k61AskR`).

One scene a day through V's hub, by band:
- **Clear**: "Did you eat today?", the first thing she says once she knows him, and half a hound biscuit. Then the things
  from her pockets: with a cast, pins, a boot and fourteen stitches, she asks about the rent. "I have paid it"
  (`k61VPaid=1`) or "You have until the first".
- **Extended**: the green mug. She drinks from the side without the chip, and he drinks from the left of the other mug.
- **Worst** (`kdWorstOf()`): the bread nosed into a line on his side of the door; he feeds it to the grey hound.

## After discharge (aftermath order, `kdEv`)

- `kd61_home` (both POVs, right after `kd_discharge`): the first evening upstairs. Her stool, hoodie and dry toothbrush,
  and two to four boxes of her cereal (by `kdDays()`) that he kept buying. V's side: if he washed the trainer, he
  moves it into the cupboard under the stairs so that she will not see there is only one.
- `kd61_rent` (both POVs, after `kd_count`, kdD ≥ 5): Misaki loses the first of the month, pays a day late, says she fell
  off a ladder and argues about the $25 fee (−$25). The new receipt goes into the cast if the old one is there. V's
  side: if he paid it, she pays him back to the cent and he writes a receipt from the house ledger. Otherwise she
  contests the fee in writing.
- Ending lines: the cast kept for the receipts, the torn ledger page, or the one late payment; the stack of lids.

## Rules kept
- V uses no contractions. Every Misaki line goes through `MV` with four tiers. The hounds are named only by colour.
- Full-story-only material (the camera bag and the sealed envelope) is gated by `kdSA()`. Injuries-only variants have no
  doctor and no denial, only the injuries, her indifference to them and the old ones underneath.
- `tools/aiscan.py` reports nothing in kc61.

## Not done / for the author
- New small facts: her trailer is lot fourteen; a green mug with a chip at V's island; a rubber frog on her key ring;
  Angel did her nails with a pink star before the van; she has paid rent on time since sixteen; she weighed 26 kg at
  eleven (injuries-only text). Confirm or change.
- The date "the twelfth" follows kc48's door conversation ("Thursday. The twelfth.").

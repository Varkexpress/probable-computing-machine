# The war before the van (kc59)

`src/kc59.js`. Purpose: make the abduction earned. The outfit Misaki hurts most is the one that takes her
(`captorOrg()`, the highest `S.orgs[k]`; fixed into `S.captor` by `takenM`/`takenV`). This module makes that outfit
visibly notice, warn and circle beforehand, puts the four men from the list in front of her (and V) before the van,
gives Inspector Hale one want that runs through every phase, and ties V's ledgers, meetings and hunts to the same war.

Rules kept: unnamed city, dollars, hounds unnamed, no new named characters (underlings unnamed; only `ORG` bosses
speak), V without contractions, Misaki through `MV(...)`. Everything is skipped in lone routes (`isLone()`).

## State
All in `S.f.w59` (`w59F()`):

| key | meaning |
|---|---|
| `st['m:syn']`, `st['v:syn']` | stage reached with an outfit per POV (1 noticed / ledger, 2 warned / approached) |
| `nOrg`, `nDay`, `wOrg` | which outfit noticed her first, when, and which one sent the warning (Misaki) |
| `lOrg`, `lDay`, `lease` | the outfit V read in his ledger (van + river room) |
| `g.driver/radio/notes/water` | glimpses seen, value `'m'` or `'v'` (who saw him) |
| `gl` | day of the last glimpse (one per day) |
| `pend` | a glimpse is due on the next `hub()` after a job |
| `toldV` / `vTold` / `asked` / `watched` | warnings passed between them; V asked her to move in; V sat outside the lot |
| `sent` | she posted the warning back with a bullet (+1 to that outfit) |
| `lever` | V told the boss what she is to him (+2 to that outfit; "the photograph for the hound man") |
| `haleCard` | Misaki kept Hale's card |
| `haleFile` | V gave Hale a file on the boss |
| `hp`, `got`, `gotSeen`, `phone` | V's war hunt: pending, succeeded, aftermath shown, whose phone he took |
| `deal` | Hale's price: `'promise'` (boss breathing, in court) or `'no'` |
| `mHale` | Misaki's answer to Hale after: `'yes'` / `'no'` |
| `faces` | she looked at "Their faces" in the cell |
| `rec[id]` | recognition line shown on the list for that man |
| `ask` | day of the last side-menu enquiry |
| `day` | last morning a beat played (one per morning) |

`S.f.w59_know`, `S.f.w59_hale_after`: after-phase scenes done.

## The scheduler
`morningEvent` is wrapped (outermost at load): each morning, the first eligible beat in `W59B` plays, then the normal
morning continues. One beat per morning. Beats are ordered by priority: Misaki's, then V's, then the glimpse fallbacks,
then Act II. In a simulated run each side fires 8 beats inside the normal phase.

## Beats (normal phase)
Each outfit has its own texture (`W59ORG`): the Kinsella syndicate's loan book, Pike Property's copied keys, Grant's
cameras and drone, Morrow's inspectors and the beat cop, Sutton's scouts and comp card, Reyes breaking the noodle
seller's fingers, Lark's opened sleep tonic and the blood-type survey, the Fellowship praying for her by name. Where
the text names a man she killed, it checks `S.f['done_'+target]` (`w59Did`); otherwise it falls back on the man in the
canal (every captor lost one there, per `takenM`).

Misaki (`S.pov!=='v'`):
- `w59_m_notice` day ≥ 2 and lead outfit ≥ 1 (or day ≥ 4): they notice her.
- `w59_m_warn` a day after notice, lead ≥ 2 (or day ≥ 6): the warning. Options: tell V (tier ≥ 1), post it back with a
  bullet (+edge, outfit +1), ignore it, rent first. If the lead outfit changed since the notice, a line says so.
- `w59_m_hale` day ≥ 3 and a body / a done contract (or day ≥ 5): Hale at the noodle stand; his motive. Take the card or
  drown it in the broth.
- `w59_m_circle` rent paid once, after the warning: four shapes in the grey van; she will never take the gun off her
  hip (the night she pays rent twice she does).

V (`S.pov==='v'`):
- `w59_v_ledger` day ≥ 2: the outfit buys a van and a river room in his ledger (journal note).
- `w59_v_ask` the day after: the boss asks about her. Deny / tell her tonight (she says after rent) / threaten them
  (`lever`, outfit +2).
- `w59_v_hale` day ≥ 3: Hale at the foundation; give him the file on the boss or not.
- `w59_v_circle` rent paid once: the outfit goes quiet in the books. Sit outside the lot / ask her to move in now /
  read the accounts again.
- `w59_v_hunted` morning after a successful war hunt: the phone (trailer photos, the shift rota). "They will think it
  was her."

## The four, before
`W59G` (both POVs, `w59Glimpse`): the driver singing the bank jingle in the grey van at her fence; the radio man at the
laundromat door, boot and radio, laughing at the jingle; the note-taker on a bench writing down "star clip,
left-handed bag" (V: the visitors' book, a name that does not exist); the water man at a bus stop who never looks at
her (V: the one man who will not look at the hounds). Order fixed; one per day. For Misaki the next glimpse comes on
the way home from a contract (`jobResult` sets `pend`, the next `hub()` shows it); otherwise as a morning beat
(`w59_g_*`, day ≥ 2/3/4/5). V's radio glimpse is Misaki in the server chat.

## Payoffs
- Cell spot **Their faces** (free, once, if she saw any of them): she recognises the ones she saw.
- `listTarget` wrapper: the first time a man is chosen from the list, one line of where he was seen before (her
  memory or V's notes).
- `w59_know` (kd scene, after `kd_card`): both lay out the timeline; she saw all of them, he read the van in a ledger.
- Taken phase, V, `w59_v_halecall` (first morning after she is taken): V connects the ledger, the rota and what he
  told the boss. If he took the captor's phone, `S.f.schedule=1` (guard rota, one guard fewer in the rescue). Hale
  has the back plate off a cereal box and the part of the river. **Promise** him the boss breathing → `S.f.traced=1`
  (skips the phone trace) or, if already traced, `S.f.schedule=1`. **Refuse** → nothing.
- `w59_hale_after` (kd scene, after `kd_math`): Hale on the step, asking for the boss alive. V: promise or not.
  Misaki: "they're all yours, what's left" (+composure) or "fuck off" (+edge).
- `w59_a2_hale` (Act II, day 2, if promised): if V ruined them the K9 way (`S.f.finalRuin`), a postcard from the
  courthouse; otherwise Hale at the gate with the newspaper ("You promised me breathing") and +6 heat: this is why his
  Act II K9 file is personal.
- Ending lines: Hale's arrest on the courthouse steps / the clipping in the K9 file; "told them every week"; V's
  `lever`; she still waves at vans.

## V's hunts
Eight war hunts are added to `HUNTS` (one per outfit, `h.w59`). `vHuntMenu` is wrapped so that in the normal phase the
current lead outfit's hunt is always offered with two ordinary files, and war hunts never appear otherwise (HUNTS is
restored after the menu is built). `vHunt` marks it pending; `dispose('v',…)` on success records `got`/`phone` and
raises that outfit by 1 (they blame her).

## Side options (normal phase)
- Misaki: **Ask around: who's asking about you** (every 3 days, costs time): names the lead outfit and how close they
  are. Lie low (−heat, outfit −1) / make a point (+edge, outfit +1) / go home. This lets the player see, and nudge,
  who will take her.
- V: **The street file** (every 3 days): a page per outfit, quiet → annoyed → asking questions → circling → hunting.

## Threads
`tx_w59_ron` (Ronin: somebody asked at his bar), `tx_w59_ang` (Angel: a fan's photo of the grey van, after the driver
glimpse), `tx_w59_vq` (V asks who paid the man she worked against last), `tx_w59_vm` (V's POV: Misaki found a
"reminder" on her step).

## Not changed
`takenM`, `takenV`, the list, `finale` and the kidnapping trigger (`afterRent`, `S.f.kidnapSet`) are untouched; the
kidnapping fires on the same day it did before (days_test: Misaki day 5, V day 8–9, which varies with the random rent).

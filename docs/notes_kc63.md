# kc63: what her head does (more angst in the infirmary)

All in `src/kc63.js`. Test: `node tools/k63_test.js`.

The author asked for more angst in the infirmary, following the kc62 direction: psychological rather than
conversational, almost all of it inside Misaki, with V at a distance. Her mind is the thing she cannot search. She
tests her own head with questions only she can answer, keeps instruments she trusts (a pulse, a plastic band with her
name on it), and on the extended and worst stays finds that her head can build a room round her, so it can build bars.
On the surface she is flat, funny and competent; the narration and greyed options show what is under it. No clinical
labels. Nothing names what happened in the hours she cannot remember, and nothing shows a method.

About 3,400 words of scene text (both POVs, one `MV` tier), plus option labels and ending lines.

## Delivery

One hub wrapper (`k63Scene`, flag `k63Day`, one a day from `S.slot>=1`). It waits while kc61's or kc62's scene for
that day is still due (`k63Busy()` asks `k61Scene()`/`k62Scene()`), so the three modules do not stack on one hub call.
The worst-route clarity scene ignores that wait, because it belongs to the moment.

| band | Misaki | V |
|---|---|---|
| ordinary (clear, after the shatter) | spot "Your wristband" (once; who wrote it splits by setting); hub: the questions only she knows (the tin, regionals, four clicks; full story: hours the questions fence off, injuries only: a van), the high note and the hound's claws | first day she knows him: she goes back through the days; the numbers through the door |
| extended (`m.xd>=1`, still a cell) | which day was real; the order she would give them people in (put herself at the top, or leave it) | the list through the door, his name left off |
| extended, clarity back on an extra day | it comes back without breaking; she keeps still inside it | the date said at intervals, through the door |
| worst (`kdWR()`, after that day's state of mind) | the pulse she can't get to agree with itself; her own name into the pillow, and the tall one saying it back | her name forty times; he writes 40 on the chart (`kdWorstOf()`) |

## The moment clarity returns (`kdShatterFx` wrapper)

- Morning shatter (normal stays): after the shatter lines and kc61's bin, `k63After`: her body has not been told, and
  every day in the cell turns over with his face on the other side. Get up before he comes in / stay on the floor /
  greyed "Call him in". Variant line by setting.
- Logic and caught shatters (worst route) set `S.f.k63ShW=1`; the next hub plays `k63WBack`: she knows, and the
  certainty she had was her own head's. Variant by `kdInterrupted`. The dark (late) shatter is left alone.

## After discharge (aftermath order, `kdEv`)

- `kd63_boots` (after `kd61_home`, kdD ≥ 1): sleeping in her boots. V: changes the sheets (buys dark ones) or stands
  his own boots by the bed, and she turns his to face the door.
- `kd63_alarms` (after `kd63_boots`, kdD ≥ 2): an alarm every forty minutes all night (reason splits by setting).
- `kd63_card` (after `kd62_file`, kdD ≥ 4): she gets five clicks instead of four and checks the dope card in the
  glovebox; index cards of facts, or put it back. V watches from the kitchen window.
- Ending lines for the boots, the alarms and the index cards.

## Flags
`k63Band`, `k63MC`, `k63MX`, `k63MW`, `k63Day`, `k63Sh`, `k63ShW` (1 pending, 2 played), `k63XB`, `k63XBa`, `k63WB`,
`k63Up`, `k63Quiz`, `k63Note`, `k63Yday`, `k63Ord`, `k63Pulse`, `k63Name`, `k63VC`, `k63VX`, `k63VW`, `k63VB`,
`k63Boots`, `k63Alarm`, `k63Card`.

## Rules kept
- V uses no contractions. Every Misaki line goes through `MV`. Hounds by colour only. No new characters; the only
  doctor reference is behind `kdSA()`.
- Avoided images already in the arc (soup tubs, the bin, the mug, lot fourteen, bread under the door, the napkin hound,
  counting doors, handle and slot, the 4am file, the truck, the hair tie, the drawer, the kennel scale).
- `python3 tools/aiscan.py` and `python3 tools/aiscan2.py -v 'src/kc63.js'` report nothing for kc63.
- `tools/kd_script.js` includes kc63 (scenes placed in 3.1, 3.3, 3.4, 3.7 and 3.9; events through the order); 0 unplaced.

## For the author
New small facts: the wristband with the made-up date of birth; the dope card in her glovebox (four clicks at 900 m);
the index cards; the alarms every forty minutes; V's second set of dark grey sheets.

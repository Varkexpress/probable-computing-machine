# kc62: the good one (inside her head)

All in `src/kc62.js`. Test: `node tools/k62_test.js`.

Second version. The author asked for less interaction between V and Misaki, more psychological angst, more of the
side where her mind does this to her, and more of her well-hidden fear. Almost all of it now happens inside Misaki,
alone. While the room is a cell her mind keeps a file on V as "the good one", the guard you are meant to like. The file
is a symptom: it runs at four in the morning instead of sleep, it turns every kind thing he does into technique, and she
can partly see her head doing it and cannot stop it. Under it is fear she hides completely. On the surface she is flat,
joking and competent. The narration shows what is underneath, and so do greyed options she cannot take ("Let go of
the tray": your hand won't open; "Tell him you're frightened": it doesn't come out; "Go in and tell him": not him).
No clinical labels appear in visible text. Nothing names what happened in the hours she cannot remember, and nothing
shows a method.

What is left of V and Misaki together is short and hurts: "sorry, sir" in the kitchen, and the napkin with the hound.
V's side is three infirmary scenes and the V half of each aftermath scene, all from a distance. He sees her rituals
and how flat she is, and he sees that she hides it from him most of all.

## Misaki, in the infirmary

| where | when | what | flags |
|---|---|---|---|
| spot "Listen for the tall one" | cell reading (`kdClar()<2`), once per time of day, four in order | 1. nine steps, then nine more that are not him (the boiler, her pulse); she can't tell which were real (variant: the seventh tread, `k58Stair`). 2. Her hand closes on the tray and won't open; her face stays bored (full story: her reason for watching hands is filed with the hours that are gone; injuries only: broken three times). 3. The coat smell, and an intrusive picture of V on a table in the other building. 4. The file at 4am, seen from up by the light (variant by `kdThanks`). | `k62Th` 0–4, `k62Pic`, `k62Rule` = `add`/`watch` |
| hub, evening (`S.slot>=2`) | cell reading, one a day (`k62Day`), four in order | sleep she won't allow (sums, pinching, watching herself from the corner); the napkin (fold it / keep it); the joke over the tray while her fingers tap the eleven doors of the other building; the handle she touches three times and the slot she checks, knowing it is her head | `k62MP`, `k62Nap` |
| hub | worst route (`sev>=8`) after `logicOut` (kc50's reasoning or the interrupted night), once | she knows it is V, and the counting carries on behind the knowing | `k62Fl`, `k62FlC` = `name`/`eat` |

## V, in the infirmary (one a day through the hub, `S.slot>=1`, day 1+)

- Worst stay (`kdWorstOf()`): the light under her door on for three nights, the counting and the pinching; he does
  not go in, and writes the hours on the chart. `k62VW`.
- While she does not know him: through the gap in the door, her ritual at the handle; when he knocks she is cheerful.
  "She hides it from me first." `k62VR`.
- Clear after a bad stay (`sev>=4`): ten out of ten for the soup, eyes on the door, working her fingers open under the
  tray while she tells him the priest joke. `k62VC`.

## After discharge (aftermath order, `kdEv`)

- `kd62_sir` (after `kd61_home`, kdD ≥ 1): his hand past her shoulder; "sorry, sir"; then the joke and the shut hand
  under the island. Misaki: make a joke / say nothing (count the doors) / greyed "Tell him what just happened".
  Worst stays: it was the second time that morning. `k62Sir`.
- `kd62_file` (after `kd61_rent`, kdD ≥ 4, needs `kd62_sir`): 4am at his island, the file still writing itself, and new
  pages of kindness turned into technique (fuller if she built the file in the infirmary). Write it in the newspaper
  margin, or lie awake. V sees it from the stair and goes back up unseen. `k62File`.
- `kd62_clock` (after `k58_creak`, kdD ≥ 6, needs `k58_creak`): she counts doors, and she has his whole day; the stair
  line follows `k58Stair`. Count them, or try not to. V writes his day on the fridge without a word, or keeps to it to
  the minute. Worst stays: afternoons when the file opens by itself. `k62Clock`.
- `kd62_truck` (after `kd_v_sees`, kdD ≥ 11, needs `kd_hard_work` for Misaki or `kd_v_sees` for V): a clean job, and in his
  garage her hands won't come off the wheel. Greyed "Go in and tell him" (not him); wait it out, or head on the wheel;
  she goes in cheerful. V hears the engine stop and the door not open for forty minutes, and never lets her know.
  `k62Truck`.
- Ending lines: the doors she still counts (or the timetable on the fridge), the truck in the garage, the torn margin.

## Rules kept
- V uses no contractions. Every Misaki line goes through `MV` with four tiers. Hounds by colour only. No new characters.
- Injuries only: the one full-story reference (the hand entry) has a plain variant; no doctor and no denial in kc62.
- `python3 tools/aiscan.py` and `python3 tools/aiscan2.py -v 'src/kc62.js'` report nothing.
- About 3,500 words counting both POVs with one `MV` tier (the first version was about 4,300).

## For the author
- New small facts: nine steps from the infirmary stairs to the door; eleven doors from the van to the cell; a cactus
  fridge magnet; V's timetable on the fridge.

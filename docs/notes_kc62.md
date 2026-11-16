# kc62: the good one (V as one of them)

All in `src/kc62.js`. Test: `node tools/k62_test.js`.

The author asked for more angst about Misaki being unable to see V as anything but another captor during the
infirmary period and after it. While she believes the room is a cell, every true thing about him (his steps, his hands,
the smell of his coat, his kindness) is read as technique, and she keeps a file on him as "the good one", the guard you
are meant to like. She is polite to him the way you are polite to a guard and plans around him. On V's side, the one
person who never looked at him the way his victims do now does, and he keeps going in without explaining himself.
Nothing names what happened in the hours she cannot remember, and nothing shows a method.

How it fits the existing pieces: "the tall one" (kc46/kc49) is still what she calls him; "the good one" is the role
she gives him in her file, after the one who brought water (kc30, the list entry `water`). The steps tie to kc58's
seventh step (`S.f.k58Stair`) and the timetable scene waits for kc58's `k58_creak`. The worst-route flash follows
kc50's `logicOut` and kc53's shatter (`kdShatterFx`, `KD_SHATTER_LINES`). The report waits for kc55's hardening.

## Misaki, in the infirmary

| where | when | what | flags |
|---|---|---|---|
| spot "Listen for the tall one" | cell reading (`kdClar()<2`), once per time of day, four in order | the file: nine steps heel first (variant if `k58Stair==='his'`), hands shown at the door (full story: filed with the hours that are gone; injuries only: broken three times), the smell of his coat, the good one (variant by `kdThanks`). Each has "file it" or a choice where the true thing nearly gets through and is filed anyway | `k62Th` 0–4, `k62Mouth`, `k62Rule` = `polite`/`name` |
| hub, evening (`S.slot>=2`) | cell reading, one a day (`k62Day`) | asking permission to use "your sink"; the napkin with the grey hound drawn badly (fold it away, or keep it "as evidence") | `k62MP`, `k62Nap` = `fold`/`keep` |
| hub | worst route (`sev>=8`) after `logicOut` (reasoned out, or kc50's interrupted night), once | she knows, and still says "thank you, sir" when he walks in; say his name, or eat and don't correct it | `k62Fl`, `k62FlC` = `name`/`eat` |

## V, in the infirmary

- Side menu **Go in anyway** (once a day, while `clar<2`, three in order): her eyes on his hands, the look men on his
  table give him; the sink ("It is your sink." or "It is V", which she answers with "sir"); her plan for him heard
  through the door (walk the nine steps the same, or stop on six and say her name). `k62Go`, `k62VSink`, `k62VPlan`.
- One scene a day through the hub (`S.slot>=1`, shares `k62Day`): worst stay (`kdWorstOf()`, day 1+): she tells the
  good one, politely, not to waste his time (`k62VW`). Extended delusion (`xd>=1`): she breathes through her mouth; he
  tries a clean shirt, then puts the coat back on (`k62VX`). Clear after a bad stay (`sev>=4`): she knows him and still
  says sir; he goes out and knocks again, or sits on the floor (`k62VC`, `k62VKnock`).

## After discharge (aftermath order, `kdEv`)

- `kd62_sir` (after `kd61_home`, kdD ≥ 1): the second morning, his hand past her shoulder for the tea; "sorry, sir".
  Misaki: say his name, or say nothing. V: "Good morning", or "You are welcome" (he would rather be sir). Worst stays
  (`sev0>=8`): it was the second time that morning. `k62Sir` = `name`/`left`.
- `kd62_good` (after `kd61_rent`, kdD ≥ 4, needs `kd62_sir`): on the sofa she tells him the file, built from how much
  of it she made (`k62Th`). Misaki: ask him to walk differently (he says no) or pull the blanket over. V: keep it, or
  ask which page she is on (the coat; he takes it off). `k62Walk`.
- `kd62_clock` (after `k58_creak`, kdD ≥ 6, needs `k58_creak`): she has his whole day, like guard shifts. Tell him and
  he writes it on the fridge (the last line follows `k58Stair`), or keep it. Worst stays get the afternoons when the
  file opens by itself. `k62Clock` = `told`/`kept`.
- `kd62_report` (after `kd_v_sees`, kdD ≥ 11, needs `kd_hard_work` for Misaki or `kd_v_sees` for V): she reports a job
  at the island like a guard's shift report and waits to be dismissed. Misaki: wait to be told, or sit unasked (tier 2).
  V: "Sit down." or sit on the floor first. `k62Rep`.
- Ending lines: sir still answered to, or once; the timetable on the fridge; the file recited at the Sunday table.

## Rules kept
- V uses no contractions. Every Misaki line goes through `MV` with four tiers. Hounds by colour only. No new characters.
- Injuries only: the one full-story reference (the hands entry, "filed with the hours that are gone") has a plain
  variant; there is no doctor and no denial anywhere in kc62.
- `python3 tools/aiscan.py | grep kc62` reports nothing.

## For the author
- New small facts: nine steps from the infirmary stairs to the door; a cactus fridge magnet; V's timetable on the fridge.
- "The good one" is Misaki's word; she ties it to the one who brought water. Confirm that link.

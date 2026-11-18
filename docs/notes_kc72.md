# Small hours (kc72)

All in `src/kc72.js`; tested by `tools/k72_test.js`; reading copy in `docs/kc72_text.md`. The peach night (kc71) for the
other four romance routes: something odd with the partner in the small hours after a working day, a short choice,
someone falls asleep, and a wake-up in one of five places by how far the route has gone, warmest at the top, each with
a note or an object.

## Routes
| Route | Night | Choice → `S.f.k72<r>How` | Who sleeps |
|---|---|---|---|
| Misaki × Ronin (`mr`) | 3:20, Ronin texts "workshop. bring the boots that slip". Toasties pressed in the bench vice and grilled with the blowtorch; he cuts up his truck's spare tyre to resole her boots | off the pliers / make him blow on it / take the torch → `pliers`/`blow`/`torch` | Misaki, on the car bench seat, while he explains herringbone tread |
| Misaki × Angel (`ma`) | 3:50, Maria's sponsored "sleep with me 🌙 8 hrs" stream; Angel has never slept on camera and mouths "help" | hold her hand out of frame / whisper the comments / talk her through an integral → `hand`/`chat`/`maths` | Angel for real, on stream; then Misaki on the floor |
| V × Ronin (`vr`) | 4:00, Ronin in his truck in V's garage, radio on the battery, on hold to the four a.m. gospel request line, where he calls in every night as somebody else | request a hymn as V / let him do the voice / dedicate it to the hounds → `own`/`voice`/`hounds` | V, against the cab window, before the song plays |
| V × Angel (`va`) | 4:00, Angel's ring light in the kennel; she is painting the hounds' claws Saint Ottilie Pink for her private folder, in Maria's voice | hold the paw / choose the black hound's colour / "Do mine." → `paw`/`colour`/`mine` | V, against the kennel wall; she paints his nails |

## Wake places (5 warmest)
| Lvl | mr | ma | vr | va |
|---|---|---|---|---|
| 1 | the car bench seat, boots resoled; note on a tyre offcut | studio floor in a sheet mask; lipstick on the sponsor card | the truck cab, belted in, battery flat; parking ticket under the wiper | kennel straw, one hand painted; eyeliner on a makeup wipe |
| 2 | his truck cab in the yard; "BACK IN 10" in the windscreen fog | her spare room, phone on charge; eyeliner sticky note | atrium couch, carried up; parking ticket in his shirt pocket | atrium couch, ring light as a lamp, panda mask; sticky note |
| 3 | his couch, Heathers paused, the Gameboy high score; takeaway menu | the pink sofa in her bonnet; a "good morning, beautiful" voice memo | the bench under the library tree ("this place is a maze"); parking ticket | study sofa, glasses cleaned, ten pink nails; a text |
| 4 | his mattress; he slept in the doorway with the crowbar; sticky note on it | her bed, she has gone to a shoot; eyeliner on the tea contract | his own bed, Ronin jump-starting the truck below; ticket on the pillow | his bed, her lashes on his pillow; lipstick on the mirror |
| 5 | his mattress with him, rings on the sill, KISS burned into both heels; note on her hand | her bed with her asleep, a lash on Misaki's cheek; her 6:58 text | his bed with Ronin asleep on him; the 4:52 recording on his phone | his bed, her face bare, Maria's alarm; ten pink nails and a white heart |

`S.f.k72<r>W` stores the level. Effects: `fr(partner, 2+lvl)`, energy −12 (−5 at level 5).

## How close (`k72Lvl`)
Score = dates (to 3; `S.romDates`/`S.vromDates`) + friendship tier `frT` + route beats done (kc65's `S.f.k65d`
for that route, plus kc67's `S.f.k67d` on V × Ronin; to 3) + 1 for the bond (Misaki: engaged, `qst('romwed')>=0`, or
married; V: `S.f.vromKey`). Level 1 below 3, 2 from 3, 3 from 5, 4 from 7, 5 from 9 (8 in the epilogue). Level 5 needs
the bond; Misaki married to the partner (`S.f.romMarried`) is always 5.

## Suggestive setting
Nothing is implied to have happened at any level; level 5 is sleep. With `sugOn()` off, level 5 has them on top of the
covers, both still dressed (the only lines that change).

## Delivery and gates
- Misaki's routes wrap `afterBed` and, when they play, continue with kc71's `_afterBed71`, so kc71 cannot play the same
  night. V's routes wrap `sleepJ` (the V-side sleep path; `sleep` sends V straight there) in V's POV only. 0.4 chance
  each night (`K72_FORCE` for tests).
- `k72Ok()`: the route matches the POV (`S.pov!=='v'&&S.rom` / `S.pov==='v'&&S.vrom`), not yet played this game
  (`S.f.k72<r>`), phase normal/act2/act3/epilogue (never `taken` or `after`), not dark, lone or abroad, not the night
  before the kidnapping (`normal` with `kidnapSet`), not while Misaki is in the infirmary (`S.kd.med`), at least one
  date, and a working day: `S.done.job` for Misaki; a hunt (`S.f.lastVHunt`/`S.f.lastHunt` today) or a meeting
  (`S.done.meet`) for V.
- `nightWake` is wrapped to mark the night (`S.done.k72nw`), so a 3am wake-up and this never share a night.
- Ending lines (one per played route) via `extraEnding`.
- New names: `k72*`, `K72*`, `_afterBed72`, `_sleepJ72`, `_nw72`, `_xe72`; grepped, no collisions.

## New facts to confirm with the author
- Ronin's workshop is down the back stairs from his apartment, with a car bench seat against the wall and a radio that
  only gets the gospel station. He makes toasties in the bench vice with the blowtorch.
- Misaki's boots have truck-tread soles cut from Ronin's spare tyre (herringbone).
- Maria takes sponsored "sleep with me" streams; a sleep-tea brand ("the tea people", the tea tastes of hay). Angel
  could never sleep on camera before this.
- A four a.m. gospel request hour on the radio; Ronin calls in nightly under made-up names (a widow from across town, a
  trucker). The host is unnamed.
- Ronin parks his truck in V's garage; he keeps parking tickets on him and writes notes on the backs.
- Angel paints the hounds' claws; the colour is called Saint Ottilie Pink (after her Ninefold Chapel saint). She keeps
  a private "folder" of videos that are never posted.

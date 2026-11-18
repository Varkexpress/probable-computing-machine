# The nights, and an edit pass on the infirmary (kc90)

`src/kc90.js`; tests `tools/k90_test.js` (88 checks) and `tools/k86_test.js` (the pool, 209 checks); reading copy
`docs/kc90_text.md` (made with `node tools/room_dump.js 90`). Needs kc73 and kc76–kc89.

The author asked for four things: make the recent infirmary scenes read less like filler; make Misaki less friendly
with the tall one; add horror; and add about 10k words of new infirmary material with weight, about more than the
tray, with a focus on horror and disgust. And more for the route in general.

## The edit pass

**Cut** (22 scenes, all from the player-opened pool):
- kc86: `g_steps`, `g_hands`, `g_notsorry`, `g_tab`, `g_soup`, `g_server`, `g_count`, `g_cactus`
- kc87: `x2_pockets`, `x2_tall`, `x2_mirror`
- kc88: `y2_bet`, `y2_work`, `y2_basket`, `y2_wall`, `y2_ham`, `y2_splint`, `y2_two`, `y2_water`, `y2_slow`, `y2_sorrymess`
- kc89: `g_cards`

They repeated a beat another scene already had, or were light. The pool is 102 scenes.

**Misaki and the tall one.** In the cell stage they believe what kc73 set up: the tall one is K9, who swore to kill
them slowly and has had them all along. They had drifted into chatting with him. Rewritten so that they comply, watch
his hands, speak only when silence would cost more, and wait:
- kc84 `i_wrists`: correcting him is now a risk they weigh for a minute (“you never correct them”), said with two
  apologies and eyes shut for the blow. `i_careful`: his anger is read as anger at them, with nothing left to fix.
- kc85 `y_report`: no longer a cheerful job report. They declare everything, because a thing found later is a thing
  hidden; “lists are for working down”. `x_radio`: the pretence is flat (“it’s fine. leave it on”).
- kc86 `g_number`: they no longer offer him a nickname. He says their name, which nobody in the other building had,
  and they will not answer to it. `g_spoon`, `g_shoe`: the jokes at his expense are gone.
- The five cut kc88 cell scenes are replaced by three guarded ones here (`y3_splint`, `y3_number`, `y3_blood`).
- kc84's scheduler now plays the message for K9 (`ask`) first, on the first morning. It has to come before kc73's
  evening scene, in which they decide that the tall one is K9.

## The nights (about 4,500 words)

Three long scenes per POV, one a night, delivered by `hub` in the late slot ahead of this route's other infirmary
scenes (`k90Night`; `S.f.e2l90N`, `e2l90Day`).

- **I, through the wall.** The infirmary shares one course of brick with the kennel passage. Misaki hears the bucket
  set down and the hounds eat, knows what he is said to feed them, and remembers the meat in the broth. They bring it
  up into the bowl and cannot tell what they are looking at, or keep it down for the whole night. V hears somebody
  being sick with a cloth in their mouth and sees the bucket as it looks from the other side of the wall. It was
  chicken, and there is no sentence he can put through the brick to say so. He takes the feeding to the far yard for
  good, or eats a bowl of the same broth at the glass. → `e2lN1`.
- **II, full story: the camera.** The doctor brings a camera, a ruler and a date card for the hand and wrists.
  Misaki's hand lays itself flat on the tray table, fingers spread, wrist to the light: it was posed like that once
  and told to stay. “Is there anything else that ought to be in the record?” is greyed; the pretence is a denial. V,
  forty feet off, recognises the pose from the photograph the captors sent him, which he studied under a loupe for
  the building. He deletes it or has it sealed with the doctor's four. Never named. → `e2lN2`.
- **II, injuries only: the wrists.** The left wrist has gone bad. V comes with a dish, a lamp and a blade; Misaki
  takes it for the start of SLOW and goes to the roof by the bowling alley in their head, counting what falls in the
  dish. He takes only the dead tissue. It is the same hand, steel and motion as his trade, and his gorge rises twice.
  Misaki hides the wrist under the blanket to spare him the sight. → `e2lN2`.
- **III, the drain** (Misaki must be clear). The infirmary is the room above the cold room; V built the same room
  twice, on one drain. Misaki, with an ear to the grating, hears a wire brush on steel and a man being sick. V, below,
  works out what has been washed past under their bed for four days. → `e2lN3` (`ear`/`shirt`; `chain`/`scrub`).

## The pool: fifteen more (about 3,300 words)

Each is about something other than a tray arriving.
- Misaki, cell: `h_mouth` (the mouth says thank you by itself; they bite the cheek to get it back; he crosses the
  room fast and they go flat), `h_limp` (going limp to be put down sooner), and for injuries only `y3_splint`,
  `y3_number`, `y3_blood`.
- Misaki, clear: `h_hand` (what is under the cast), `h_log` (the green book of every animal treated on that bed, and
  the last entry, laid out the same way, with their name), `h_narrate` (Angel narrating herself, as she does before a
  shot).
- V: `h_smell` (the sickroom smells of the cold room on the fourth night of a man), `h_cast`, `h_fast`, `h_ronin`
  (Ronin, who likes it, cannot look at two inches of wrist), `h_eleven` (the fever on the third night, and the eleven
  that did not live), `h_carry`, `h_glass` (he supplied the picture himself, on the feed).

## The route: two beats (about 1,400 words)

- `e2l_bucket` (chapter I, free, after the kennel): what the hounds are fed, seen from behind the feed bins. The piece
  with the anchor on it. → `e2lBucket` `fed`/`left` (Misaki), `in`/`out` (V).
- `e2l_table` (chapter III, free, after the first one together; the mat now follows it): the cold room in person, with
  the straps gone and a patch worn bright. Misaki lies where he says the head would have gone, or stays on the sill
  and tells him he missed a bit. → `e2lTable` `lay`/`stood`.

## New facts to confirm with the author

- The infirmary shares a wall with the kennel passage and sits directly over the cold room, on one drain stack.
- The card man had an anchor tattooed on his forearm.
- V keeps a green record book of every animal treated on the infirmary bed; eleven are ruled off “Lost”.
- V says he has had forty-one on the table; Misaki has killed forty.
- V chains the cold room, or wears a patch into the table (by choice in night III; `e2l_table` mentions both).

# The room: ninety-five more infirmary scenes (kc86–kc89)

`src/kc86.js` … `src/kc89.js`; tested by `tools/k86_test.js` (213 checks); reading copies `docs/kc86_text.md` …
`docs/kc89_text.md`. About 15,100 words of scene text. Needs kc73 and kc76–kc85.

The author asked for another 15k words or so of infirmary content on the enemies route.

## Where they play

All of them join kc85's player-opened pool (`K85S`), which now holds 109 scenes: while `kdMed()`, the side menu's free
entry **⚔ The room** (Misaki) / **⚔ Outside the room** (V). The menu lists six at a time and allows three a slot
(it was two a day); it costs no time. Each scene plays once. A player sees the scenes for their POV, their aftermath
setting and, for Misaki, whether the room is still a cell: between 13 and 24 in a list. One stay cannot show all of
them, which is intended; the two settings, the two POVs and the worst route each show different ones.

`k86(id, pov, mode, stage, title, lines, option)` registers a scene. `N` is narration, `M2(low, full)` is Misaki in
two registers, `Ms(low, full, hands)` gives what the hands do when the voice is gone (the `gone` band).

## kc86: either setting (28)

Nothing here touches the hours, and no doctor appears, so the text is the same under both settings.

- **Misaki, cell** (the tall one is a captor): finding north without a window; the metal spoon nobody counts; one
  shoe, then three; “you can call me nine”; the door handle with no second sound; four steps where three would do;
  practising the good voice; six hours of performed sleep for a smoke detector.
- **Misaki, clear:** YRDNUAL; Ronin and the chair in the corridor; Angel and the nails; “am I still in it”; “grandpa”
  coming out thin, and V taking the hit anyway; the tab that will not come out in their favour; his hands; rehearsing
  not apologising.
- **V:** kneeling to put the tray down; hard-soled shoes so that they hear him coming; Hale on the telephone, and the
  truth told so as to do the work of a lie; four soups; the hounds refusing the bucket; what to type in the server;
  the shoe from the gravel; reading the page aloud and failing at one word; Angel handing him her shotgun; “not this
  week”; counting their breathing; the cactus flowers.

## kc87: full story (26)

kc29's rules, kept: never named by anybody or by the narration; Misaki knows and V knows; the honest option is on the
menu and greyed (`k87Pick` builds the menu from `k84No` and one pretence, which calls `kdDeny()`); nobody tells Ronin
or Angel; nothing shows V knowing what Misaki has said to the doctor.

- **Misaki, cell:** sleeping sitting up in the corner; the light; where he keeps his hands (“or he’s showing me that
  he’s not yet”); the woman in the cardigan and “any part of it”; the paper bag; the drip moved so that they need not
  turn over; the door that stays open while he is in the room.
- **Misaki, clear:** the cedar soap; the mirror, to the collar; Angel sitting on the floor; making Ronin say something
  gross; the two numbers on the chart; the joke nobody laughs at; what they said asleep; what a man who swore to kill
  them could do with it, and that he does nothing.
- **V:** the paper bag, sealed and handed over; the doctor's leaflet, read eleven times; Ronin asking him straight
  (“I have been told nothing” / “That ain’t what I asked”); “Nobody asks”; no pockets; three names, and why he does
  not go tonight; the sheeting cut up for the recovery pens; the dream in which they do not wake; a tall man with
  keys; every bar of cedar soap out of the house; the two sentences that are left.

## kc88: injuries only (26)

kc36's rules, kept: no denial, no doctor, V does the treatment. Misaki is flat and funny about every injury, and means
it. V is disgusted, despite himself.

- **Misaki, cell:** their own fingers splinted with a spoon; two out of ten; breathing exercises nobody taught them
  here; the bit of tooth left tidily on the tray; the kidney, and the will at eleven; eating slowly; apologising for
  the state they were left in.
- **Misaki, clear:** the tour of their own films; working out how to shoot one-handed in two weeks; Ronin's hubcap;
  “wasn’t even being mean”; a bet on the ribs; integrals on the wall (and one corrected sign); “you’re doing the face”,
  and his apology; what a ten is.
- **V:** the spoon; what a scale is made by; they were right about the kidney to the day; a door; wanting to do it
  badly, as they did (“it was never a distinction of nature”); the shears; “I am disgusted by the workmanship… it
  does not stop at the workmanship”; felt-lined straps against cable ties; pressing on a strap to get one honest
  sound, and stopping; the list of reasons with a second line under each; the good ham.

## kc89: the last of it (15)

Either setting: the late tray; cards with Ronin; walking to the door (“boo”); the cache in the bed, put back; the old
hound on the stone. Full story: the bolt on the inside, from both sides; the haircut; the doctor's question from
Misaki's side; Ronin's chair at three. Injuries only: the sneeze; their own stitches out; what they weigh; forty scars
and a file with no heading for them; what a laugh costs.

## Tests

`k86_test`: the pool has 109 unique scenes; each list is exactly the scenes that belong to that setting, POV and
clarity; every scene plays to the end (cell scenes also with composure gone); full-story pretences count as denials
and injuries-only scenes never do; no doctor in the injuries-only text; the menu's six, three a slot, free.

## New facts to confirm with the author

- V has not told Hale a lie in eleven years; he takes the unsent letter with the thumbprint out of the safe.
- The cedar soap V used for twenty years is gone from the house (full story).
- A bolt on the inside of the infirmary washroom, which V cannot open (full story).
- Misaki's hair is cut short by Angel in the infirmary (full story); the red streak goes in Angel's bag. This overlaps
  the existing later haircut (`k22hair`); the author should decide which stands.
- Thirty-one old scars; an unset spiral fracture of the forearm from about six (“a door”); a will written at eleven
  that left their shoes to a cat; a ten at nine that they do not remember (injuries only).
- V's table straps are felt-lined leather; V vomited in a flower bed; integrals stay on the infirmary wall.

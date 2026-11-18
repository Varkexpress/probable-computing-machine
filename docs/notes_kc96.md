# The quarrel, downstairs (kc96)

`src/kc96.js`; tested in `tools/k86_test.js` (every pool scene is listed for the right POV and stage, played, and
text-checked); reading copy `docs/kc96_text.md` (`node tools/room_dump.js 96`). Needs kc73 and kc76–kc95.
Fourteen scenes in kc85's player-opened infirmary pool (now 166), about 4,500 words.

## The direction (author)

“now, with this characterization and tone, write the infirmary expansion again.” The characterization and tone are
kc95's (`docs/notes_kc95.md`): they enjoy the work and are good at it; the argument between them (his law, their
rent) is carried on in what they do; nobody explains their feelings at length; Misaki is loud and counts fear in
steps, V is exact and dry.

## What that means in the infirmary

The earlier infirmary rounds are about what the other building did to Misaki. These are about who is in the room: a
contract killer and the man who has sworn to kill them. Neither has changed what they believe.

**While the room is a cell** (the standing rule: Misaki takes the tall one for K9, who has them and means to kill
them; no banter with him, no warmth). They treat him as they would treat any job.
- `q_case` They case the room like a professional and have to give it eight out of ten. There is a drain.
- `q_alive` Why they are not dead: he has never killed a thing that was not well. “i’m a goose in a basement.” They
  decide to be a bad goose.
- `q_collar` They find where he keeps the scalpel. He sees them look, and does up the button.
- `q_charge` They ask for the speech. “This is for the hand.” Nobody does this for free; he does; he cannot be bribed.
- `q_free` What they would have fetched on the market: six thousand. They are going for nothing, to a volunteer.

**Once clear.**
- `q_rep` “u tell ANYONE i said please…” / “I do not blackmail. I kill.”
- `q_book` Ronin's book has them at eleven-to-one. They put their last ninety dollars on themself, out of a boot.
- `q_four` Angel, Ronin, V and Misaki share out the four men from the river on the back of the chart.
- `q_owe` They try to pay for the river. He will not be paid. “that’s not saving someone. that’s stock-taking.”

**V.**
- `q_thread` The cold room at eleven, the infirmary at one, the same reel of thread. By his book they belong on the
  same table.
- `q_botched` He assesses the kidnappers' work and finds it very poor: no method, no reason, nothing asked.
- `q_asleep` Misaki reads the case against him out to the ceiling, drugged. He corrects two points and initials it.
- `q_share` Ronin wants to hold the lamp. “Proportion.”
- `q_cactus` He has the run of the trailer and the client list, and takes the cereal. He waters the cactus.

The same text under both aftermath settings: nothing touches the hours, and the doctor does not appear.

## New facts to confirm with the author

- V had a key to the trailer cut in April.
- Misaki keeps a client list on the trailer fridge, and ninety dollars in the lining of a boot.
- Ronin's book: Misaki was six-to-four on before the river and eleven-to-one in the infirmary. (kc95 has V at
  four-to-one to do it; the two are different bets.)
- The four from the river: one used a boot, one drove, one kept the books, one is bald (the last was already Misaki's).

## The delusion, redone (same voice)

The author then asked for the delusion parts to be redone with this characterization. Twenty-one scenes were
rewritten in place (same ids, so flags and old saves hold); reading copy `docs/delusion_redo_text.md`.

What changed in all of them: Misaki meets the room as a professional and as K9's enemy. The fear is still there, in
numbered steps, with the bravado on top; what went is the obedience (the good voice, the open hands, “what did i
do”). The tall one is K9 throughout, as the standing rule says, and Misaki never banters with him or warms to him;
every line addressed to him is a test or an offer.

| Scene | Was | Now |
|---|---|---|
| `g_spoon` | metal cutlery as a test they cannot read | an insult: he is not afraid of them with a knife. They sharpen the spoon |
| `g_number` | the name they kept back, sold to him | he says it like a charge; of course he has it, he has a file |
| `g_handle` | too frightened to try an unbolted door | they work out the play: it is open for the hounds. “i’d have thought of that” |
| `g_voice` | practising the good voice | getting the story straight (“i do deliveries”), so as to go out lying |
| `g_eye` | performing sleep for a camera | the same, with the finger; he did put a camera in their smoke alarm in April |
| `g_late` | “what did i do” | a change of routine is the job starting; they get the spoon up their sleeve |
| `h_mouth` | the mouth says thank you; they go flat | they bite the cheek to stay awake, and go for his eyes when he comes fast |
| `h_limp` | limp so as to be put down sooner | dead weight on purpose, and two knuckles on the scalpel in his collar |
| `d_skip` `d_three` `d_light` | the drip, with the body checked after each gap | the drip, with the kit and the plan checked; the finger at the ceiling |
| `d_taste` | he is the one the four answer to | he HIRED it: “mr ‘u kill for whoever pays.’” They would have done it for nine hundred, clean |
| `k_offer` | their life for their work | a contractor's quote to clear his backlog; his “No” proves it is a hobby |
| `p_grateful` | glad of the cup of water | it is only him: the one person in this who has been straight with them |
| `p_spoon` | the hand finishes the soup | the soup is not drugged, only terrible; he made it himself, so he thinks he has weeks |
| `p_days` | lost time | lost time, and what he may have told Ronin |
| `p_table` | how to behave on the table | the same plan, with “yawn during the speech” and last words |
| `p_error` | eleven mistakes, all theirs | they were not sloppy; somebody gave the four page twelve. “i got DOSSIERED” |
| `g_north` | smiling at a wall | grinning at it: the truck is north, the rifle is north |

V's two counterparts were changed to match: `h_fast` (they came up at his eyes, and he is glad of it) and `h_carry`
(“They are attempting, while I carry them, to cut my throat with my own knife”).

**Not redone**, and why:
- The sixteen cell scenes that exist only under one aftermath setting (`x2_*`, `x_*`, `y2_*`, `y3_*`, `y_*`). Those
  follow kc29's and kc36's rules line by line (never named; the honest option greyed; a denial counted), and a
  change of tone there risks breaking them. They want a separate, careful pass.
- `k_knife`, `k_ran`, `k_wash`, `p_under` (choices, flags and a per-setting version), `k_hound`, `d_two`, `d_late`,
  `p_name`, `g_shoe`: already in this register, or tied to V scenes that read correctly as they stand.
- The base infirmary scenes in kc73, kc80 and kc84, the three nights (kc90), the drip's opening (kc91) and “What you
  want” (kc94).

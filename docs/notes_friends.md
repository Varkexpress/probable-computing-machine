# Ronin and Angel: their own arcs (kc57)

All in `src/kc57.js`. Both arcs follow the same shape: a set-up in normal play, a complication in Act II, a payoff in
Act III and the epilogue. **The backbone beats are side-menu entries**, not random morning events, so a player always
gets them: when a beat is due, the side menu lists it (at most one Ronin beat and one Angel beat at a time), and it plays
once (`S.f.k57d[id]`). Morning events and phone threads add texture around them. Everything is gated by `K57()`: not
the lone route, not dark, not abroad, not the taken phase. Every beat has both POVs.

## Ronin: two streets over

**Motivation.** Ronin grew up in the front pew being told the Devil was always watching, so he gave him a show (canon:
`k29_pew`). He came in late to church once, at nine, at ten forty; he got the belt and a year in the front row, and has
not been late to anything since. The one night it mattered, the kidnapping, he was two streets over (canon: kc48,
kc49, kc55). Since she came home he parks two streets from every one of her jobs, on purpose. The arc is about what the
others do with that, and where he ends up standing.

| Beat | Phase | How it appears | Choices → flags |
|---|---|---|---|
| `r_clock` "Ronin: c'mere. bring nothin'" | normal or after, Ronin tier ≥1, day ≥3 | side menu | The church clock in his workshop, stopped at twenty to eleven. Ask why he kept it / try to wind it / leave it → `S.f.k57rClock` = `asked`/`wound`/`left` (referenced in the truck scene) |
| `k57r_minute` | normal, act2 | morning event | Sunday dinner: he arrives at seven exactly, every week |
| `tx_k57r_watch` (Misaki) | normal/after/act2 | thread | "talkin to the devil again. he says hi" → `k57rWatch` |
| `tx_k57r_watch_v` (V) | normal/after/act2 | thread | photo of the back pew, "10:40. on time" → `k57rWatchV` |
| `r_truck` "A black pickup, two streets over" | Act II from its second day, tier ≥1 | side menu | **Misaki:** finds the truck and the tally on the visor. Get in (`let`) / tell him to fuck off home (`stop`) / "park at one" (`closer`). **V:** finds the truck in the traffic footage and confronts him on the garage roof. Tell her (`stop`) / tear up the stills (`let`, she doesn't know) / give him her schedule (`closer`, she doesn't know). Sets `S.f.k57rStreets`, `k57rBy` (who found it), `k57rKnow` (whether Misaki knows). Starts the follow-up thread. |
| `tx_k57r_two` / `tx_k57r_two_v` | after the truck | thread (started by the beat) | Text and options depend on `k57rStreets`. Misaki can let him come back after `stop` (`k57rStreets`→`let`, `k57rBack`); in V's `closer` thread Misaki has seen him and waved (`k57rKnow`=1) |
| `k57r_visor` | act2, act3 | morning event | Varies with `k57rStreets`: wrestling and salt / a burger with a 1 on it / two more fives and a crossed-out "10:40" |
| `k57r_tv` (topic, Misaki to V) | after the truck, Misaki found it | talk topic | V watches the footage of every job; "you are both freaks; keep doing it" |
| `r_boat` "Ronin comes in at ten forty" | Act III from day 2 | side menu | "Boat night. Where d'you want me." His pitch depends on `k57rStreets`/`k57rKnow`. On the boat next to her (`on`) / two streets over (`two`) / stay home so someone is left (`home`) → `S.f.k57rBoat` |
| `r_pew` "Sunday with Ronin" | epilogue | side menu | `on`: he sits in the **front row** for the first time since he was nine ("Devil can sit in the back"). `two`: back pew, arm along the top. `home`: back pew, no "not today, Father", eyes on the clock. No boat beat: the usual back pew. Then sit next to him (`with`) / "you can stop counting now" (`stop`: the visor goes on the workshop wall under the clock) → `S.f.k57rPew` |
| `tx_k57_epi_r` / `tx_k57_epi_rv` | epilogue, after the boat beat | thread | Front row or back pew, by `k57rBoat` |

Ending lines (in order of priority): `k57rPew==='stop'` (the visor under the clock), then by `k57rBoat`, then a fallback
if only the truck happened.

## Angel: my somebody

**Motivation.** Angel's licence to kill is the rule ("none of them can say they didn't have it coming") and that every
target is sent to her: a tip, a client, a comment. She gives the money away and asked her friends to take her rifle the
day she kills for herself (canon: `k29_angelwhy`). Her tips once sent her the wrong man (canon: `dk_a_wrong`, which
she never raises again; this arc never has her raise it, the account does). In Act II the same account sends her a tip
about the copycat. He feeds strangers' faces to true-crime channels on purpose and keeps a folder of the ones where
something happened; hers is in it. He has it coming, and she would want him anyway. That is the day she asked about.

| Beat | Phase | How it appears | Choices → flags |
|---|---|---|---|
| `a_safe` "Angelic: come to the studio. alone." | normal or after, Angel tier ≥1, day ≥4 | side menu | The blush-pink gun safe behind the dresses (Maria's shotgun "doesn't count"; the rifle is hers). The code is the birthday she picked for Misaki if `k29_bday` was seen. Learn the code (`took`) / look at the dresses (`away`, she changes it) / "how would I know it was for you?" (`took` + `k57aAsk`: "i'd be happy. actually happy. not maria happy") → `S.f.k57aCode`. Starts the code thread. |
| `tx_k57a_code` / `tx_k57a_code_v` | after the safe | thread | Keep it in your head / "what if I want you to do one for yourself" (Misaki); "It is filed" / "Why me?" (V: "ronin would give it back the first time i cried. misaki would come with me") |
| `k57a_tips` | normal/after/act2 | morning event | 2am, Maria's DMs, the spreadsheet with the HAD IT COMING column |
| `a_tip` "Maria goes live about the copycat" | Act II from day 3 | side menu | The live stream asking for leads, then the account. Starts the 3am thread. |
| `tx_k57a_rifle` / `tx_k57a_rifle_v` | after `a_tip` | thread, **expires after one slot** | "i'm coming to get it" (`taken`) / "wait for me. i'll spot" (`went`) / "does he have it coming?" (`rule`). Ignoring it sets `alone`. → `S.f.k57aRifle` |
| `a_night` (label varies) | act2 or act3 once `k57aRifle` is set | side menu | `taken`: you take the rifle at half three; Misaki puts it on V's wardrobe, V puts it in the vault between the deed and the hounds' records (`k57aHeld`). `went`: the roof, the vlog voice "she isn't doing it for anybody", "cork", she laughs in the rain. `rule`/`alone`: the morning news and Maria's online-safety video; "it counted" (`k57aHungry`). Sets `k57aNight`. |
| `k57a_after` | act2/act3/epilogue after the night | morning event | She says hi to the rifle / the deleted selfie / a second man at his desk |
| `k57a_tm` (topic, V to Misaki) | after the 3am thread | talk topic | "Where is Angelic's rifle?" by `k57aRifle` |
| `a_boat` "Angelic, a garment bag and a box of shells" | Act III from day 2, after the night | side menu | `taken`: she asks for it back for the boat; give it (`gave`) / keep it, Maria's shotgun goes instead (`kept`). `went`: she has a list now; "you held the scope, so who's my somebody?"; still me (`still`) / nobody, do your list (`none`). `rule`/`alone`: everyone in the ledger has it coming, she has done two more; open the safe at last (`late`) / then the boat's yours (`fed`). → `S.f.k57aBack` |
| `a_epi` "Angelic's studio, a Sunday" | epilogue, if the safe or the 3am thread happened | side menu | The pink safe by `k57aBack` |
| `tx_k57_epi_a` / `tx_k57_epi_av` | epilogue, after the boat beat | thread | "got a tip tonight... tell me i'm good" / "is it still in the file. the code" |

Ending lines: one per `k57aBack`, with a fallback for `k57aRifle==='taken'` if the boat beat never happened.

## Notes

- No new named characters. The account holder and the men at their desks are unnamed; Ronin's parent is "the belt".
- New canon this module adds (confirm with the author): the stopped church clock (ten forty, age nine) in Ronin's
  workshop; the truck and the visor tally; Angel's pink gun safe and its code; the tipster account.
- Wrapped: `sideHub`, `extraEnding`. Pushed: `EVENTS` (4), `TDTOP_V` (1), `TDTOP_M` (1), 12 `txDef` threads (four with
  `when:()=>false` that are started by the beats).
- Tested with a Playwright script that runs every beat with every option and every upstream flag state in both POVs,
  every morning event in each phase, every thread option in every state, the rifle thread's expiry, both topics, and
  the ending lines (no page errors).

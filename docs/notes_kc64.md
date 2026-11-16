# kc64 — off hours

Lighter days for the four, in both POVs. They are still killers and still indifferent to the city; the humour comes
from them being at ease with each other. Source: `src/kc64.js`. Test: `node tools/k64_test.js`.

## Gate
`K64()`: not alone, not dark, not abroad, not in the infirmary, phase normal / act2 / act3 / epilogue. Nothing in the
module mentions the kidnapping, and nothing runs in `taken` or `after`.
Flirting (`fl64()`): V/Misaki route only (`!S.rom && !S.vrom`), tier ≥ 2, normal phase (before the van) or epilogue,
and not on the kc58 `apart` ending. Angel/Ronin routes are left to kc65.

## 1. Angel and Ninefold Chapel (the gacha arc)
An original phone game about saints. A ten-pull is "a tithe", the currency is candles, a five-star is "haloed", pity
is ninety prayers. Angel wants Saint Ottilie of the Shears ("who prunes the wicked"); the man with a lantern is the
common pull she hates; Misaki's luck gets Saint Gall the Patient (a bald saint with bread); Ronin ends up with a demon
priest with a bell made of teeth.

Eight beats in order, one every other morning (`S.f.g64` = beats done, `S.f.g64Last`), from day 5, Angel tier ≥ 1:

| id | beat | choice / flag |
|---|---|---|
| `g64_pull` | Maria is paid $800 to stream it; the first pull | |
| `g64_3am` | 3:12am in the server: "a second opinion on a woman" | 2 options |
| `g64_money` | V finds 14 × $99.99 on her statement ($1,399.86) | 2 options |
| `g64_hide` | YOUR TITHE IS READY on stream; "that's my assistant's phone" | `g64Hide` |
| `g64_luck` | Misaki pulls with "the luckiest hands"; wrong saint | `g64Luck` more/back |
| `g64_whale` | last night of the banner, three cathedral packs, $2,860 | `g64Whale` hug/sum |
| `g64_quit` | deletes it on a video call; reinstalled 38 minutes later | `g64Quit` |
| `g64_inter` | V's intervention: folders, Ronin's bedsheet banner, Misaki's graph; Ronin's phone goes off | `g64End` limit/keep |

Delivery: kc64 wraps `morningEvent` and uses the shared kc56 cap (`mbOk()`/`mbUse()`), one kc64 beat a morning
(`S.f.k64Day`). If nothing played it in the morning, the side menu offers it once a day ("costs time · the four of
you"). Titles containing "Angel" land on the city map's Angelic's studio pin.

Also: server pings while the arc runs (`G64P`, via a `serverPing` wrapper and, on entering a room with no event, a
12% chance of `g64Ping()`); the location scene `g64_couch` (atrium, at 89 pity); the atrium spot "Angel's phone, face
down" (some days, stages 2–7, once a day; turn it over or leave it); topic `g64_t_angel` (Misaki asks V; he has a
pink folder); threads `tx_g64_3am` (Angel → Misaki), `tx_g64_v` (Angel → V, "a small loan … for a saint"),
`tx_g64_ron` (Ronin → Misaki, what is a pity counter). Ending lines for `limit` and `keep`.

## 2. Misaki and calculus
Ties into the competition-maths lore (kc42) and the wasted-talents note. New facts, for the author to confirm:
- The competitions were "tricks and counting"; calculus they found themself, at fifteen, in a textbook thrown in a
  skip behind a college. They did the whole book in a year in the cab of a truck with a torch, then started again.
  The coverless, water-stained book is in the go-bag.
- They do integrals to relax after work ("like folding laundry"), keep notebooks of solved problems headed FOR FUN,
  write derivatives on the backs of contract envelopes while clients talk, and rate shots as parabolas (V's are
  straight lines and do not count; Ronin's crowbar "isn't even a parabola").
- V did calculus at university and has forgotten it on purpose, to make room for the hounds' weights, dosages and
  the names.
- Angel thinks Calculus is a skincare brand with an eye cream in a frosted pot. Nobody corrects her.

Location scenes `c64_bed` (trailer), `c64_env` (ops/trailer), `c64_limits` (Ronin's flat: "that's my whole fuckin'
love life"), `c64_parab` (B4 range), `c64_book` (bedroom/atrium; sets `c64Book`), `c64_skin` (Angel's studio),
`c64_hole` (the forest: the volume of a man, by cross-sections). Topics `c64_t_why` (V asks) and `c64_t_teach`
(Misaki offers; flirtier on the V/Misaki route). Side activity "Integrals on the couch" / "Sit with Misaki while she
does integrals" once a day after any calculus scene (four rotating texts; calm for Misaki, affection for V). Threads
`tx_c64_ron` (Zeno at the bar) and `tx_c64_v` (an integral on a napkin). Ending line for `c64Book`.

## 3. Ordinary epilogue days
One a morning in the epilogue (same scheduler and cap; the gacha beat goes first when due), or from the side menu.
`e64_quiz` (pub quiz as Book Club, meat raffle), `e64_store` (the furniture store; plastic knives; a bath mat for the
pale hound), `e64_board` (Misaki charges market rate on the red streets; options), `e64_selfie` (V's first selfie,
printed and put on the piano), `e64_cold` (Ronin's cold and his will in "list (final) (2)"; options), `e64_letter`
(the residents' association; the chairman moves to the coast "for unrelated reasons").

## 4. Location events
`K64L`: each entry has rooms, a chance `p` (0.3–0.5) and a condition. kc64 wraps `ROOMS[id].enter` for those rooms,
the same way the original `gl_amb` ambient lines do: on entering, if no kc64 location scene has played today
(`S.f.k64LDay`), it picks one unseen eligible scene for the room, rolls its chance, and plays it a second later if
nothing else has opened a dialogue. Each plays once.

| id | room(s) | notes |
|---|---|---|
| `x64_hound` | kennel | Ronin teaching the black hound to shake; it eats the bag |
| `x64_claw` | city square | the claw machine; Misaki times the swing |
| `x64_wash` | laundromat | cold wash for blood; the frog lucky socks |
| `x64_green` | greenhouse | Maria's plant tour; hemlock is "wild parsley" |
| `x64_spar` | training hall | Ronin on his back: "buy me dinner" |
| `x64_car` | garage | Ronin and Angel have been living in V's car since Tuesday |
| `f64_shelf` | V's bathroom | flirting (route): the forty-dollar serum |
| `f64_roof` | roof | flirting (route): calculus pick-up lines; V answers in kind |
| `f64_kitchen` | atrium | flirting (route): tasting the sauce; Ronin can hear |

## Small facts added (please confirm or cut)
- Misaki's lucky socks have frogs on them (fits the frog sock in kc60's seller photos).
- A pub on the ring road; the four's quiz team is Book Club (from the kc24 group-chat rename joke).
- V's bathroom shelf has eleven bottles; one is a forty-dollar serum.
- V's selfie, framed, is on the piano nobody plays.
- Ronin also plays the game, for a demon priest.

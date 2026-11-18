# V × Ronin: the Butcher's balance (kc67)

All in `src/kc67.js`; tested by `tools/k67_test.js`; reading copy in `docs/kc67_text.md`. A plot thread of its own for
the V × Ronin route (`S.pov==='v' && S.vrom==='r'`), running from normal play to the epilogue, with the romance and
jokes carried on it. It builds on the tea (`k27_tea`), kc57 (the stopped clock, ten forty, the truck, the pew) and kc65
(the mugs, the gala, the second skull ring, Ronin reading his file), and does not repeat them.

## The plot
The winter Ronin came to the city he slept in the boiler room of the church across town. The old priest found him and
let him stay, with soup and the side-door key (the key kc65 never explains). The parish had borrowed for the roof from a
private lender: a firm V's father owned. One February night the lender's collector came for the payment and broke the
old priest's fingers in the vestry, counting; Ronin took the boiler-hatch crowbar off its hook and killed him. That
collector is the second man, whose name is inside the second skull ring (kc65). The old priest told the police he had
found a burglar; the body was never identified.

V's father wrote it in the ledger as an open balance under "the Butcher". The Chairman, who keeps the book now, has
priced it and sold it to the collector's son, one of his men in grey: "forty-one thousand, or the Butcher. The son
accepts the second. Collection: the boiler room, ten forty." Under it: "Valentin may close the balance himself. See his
page." The man in grey sends the photograph and the old case to Hale and the newspapers to flush Ronin out, and to
see whether V will keep Ronin out of it the way his father would have.

The question the thread asks is the one Ronin puts to V in the kitchen: is V his father with a nicer haircut? Keeping
Ronin out (money, burning files, going alone) is what V's father did. Giving Ronin the page lets Ronin settle his own
balance, with V's law as the ruling.

## Beats (one ♥ at a time, after kc65's)

| Phase | Beat | What happens | Choice → flag | Comes back in |
|---|---|---|---|---|
| normal (≥1 date) | `vr67_church` | Sunday in the back pew; the bucket under the leaking roof; Ronin's whispered filth through the hymns; a man in grey sits in the Devil's pew and leaves a ledger slip: "For the roof. Received: nil. Balance outstanding." | "What roof?" / pocket the slip / hold his hand in the front pew → `k67Pew` | the photograph, Angel's text, ending line |
| act2 (day 2+) | `vr67_photo` | Hale (coffee shop, eleven minutes in the lavatory) has a photo of the two of them from the organ loft and the old boiler-room case. If Hale is the Mimic, the folder arrives at the foundation and Hale never speaks. | take it to Ronin / keep it and buy the newspaper's advertising / burn it → `k67Photo`, `k67PhotoDay` | the next beat, threads, boat |
| act2 (a day later; or act3 if missed) | `vr67_row` | **told:** the boiler room with a torch; the story; "By my law you gave him a discount." **kept/burn:** Ronin forty minutes late to Sunday dinner with a copy of the photo; Misaki takes the hounds for a hike; the argument ("your daddy with a nicer haircut"). | told: sit down with him / "tell it again, in order" → `kiss`/`file`; kept/burn: "I will not do it again" / "I would do it again" → `sorry`/`stand` (`k67Row`) | the page, the epilogue |
| act3 (a3d ≥ 2, box open) | `vr67_page` | The page folded into the back cover behind V's blank page; the collector's name is the name inside the ring (on V's finger or chain, kc65); the price and "See his page." | "It is his balance" / "It is my father's book" (Angel babysits Ronin at karaoke) → `k67Page`, `k67PageDay` | ten forty, boat, epilogue |
| act3 (a day later) | `vr67_ten` | Ten forty in the boiler room; the son with a pistol. **his:** Ronin tells him the truth, shows him the ring, and asks V for a ruling. **out:** V alone. | nod / take him → `end`; shake your head / let him go → `walk` (`k67Ten`) | boat, epilogue, ending |
| epilogue | `vr67_epi` | **his:** February, the roof fixed by an anonymous donor who signs with his initials; the crowbar back on its hook. **out:** Ronin found the page in the back of his file (he read the file in January, kc65) and texts "down". | his: say it in your words / in his (the tea speech) → `own`/`quote`; out: "I should have brought it to you" / "I would do it again" → `sorry`/`again` (`k67Epi`) | ending line |

**Boat night** (wrapped `a3Climax`, `a3Choice`, `a3Boat`; once each, flags `k67Boat`, `k67Ch`):
- Before the plan: Ronin on the line ("Boiler room's square, Vee" or, kept out, "You got a fella?"), placed by kc57's
  `k57rBoat` (home with the wrestling on, two streets over). If the son walked, he leaves the service door unlocked.
- On the deck, the Chairman's remark: "Your father would have done precisely that" (out) or "never let anyone else hold
  anything" (his), plus the missing man if the son walked.
- If the son walked, the stealth run has one guard fewer (a placeholder ally key for the length of the `a3Boat` call;
  removed straight after, so ally counts and achievements are unchanged).

Mornings (ordinary `EVENTS`): `k67vr_morn` (normal: V rehangs Ronin's crowbars by length; "they were in order of who"),
`k67vr_loft` (act2: Angel tells a features editor she has never seen either of them), `k67vr_morn2` (epilogue: coal dust,
the board meeting, "restoring a church"). No morning scheduler, so `mbOk`/`mbUse` are untouched.

Threads (V's phone): `tx_k67_eyes` (Ronin has V's reading glasses on a hymn book; hymn forty-one), `tx_k67_week` /
`tx_k67_weird` (started by the photo: "talk to me about your shelter accounts" or "you got a fella?"), `tx_k67_mis` /
`tx_k67_torch` (Misaki, started by the page: the inside pocket, in numbered steps, or her borrowed torch),
`tx_k67_epi` (no bucket in the aisle).

Ending lines (one, by priority): `k67Epi`, then `k67Ten`, then the organ-loft photo if they held hands.

## Delivery and care
- Gate `K67()`: V's POV, `S.vrom==='r'`, not lone, dark, abroad, `taken` or `after`. Nothing runs in the kidnapping's
  after-phase, so the after-phase and `kdSA()` are untouched.
- `k67Due()` returns nothing while `k65Due()` has a V × Ronin beat due, so the side menu never lists two ♥ beats for the
  route. The wrapped `vromDate` (after three dates) defers to kc65's wrapper when kc65 has a beat due.
- Wrapped: `sideHub`, `vromDate`, `extraEnding`, `a3Climax`, `a3Choice`, `a3Boat`. All ids are `k67*`, `vr67_*`,
  `tx_k67_*`; no collisions.
- Violence is in the narration's register (the hounds eat well that week); the son is never named; the collector's name
  is never printed.

## New facts to confirm with the author
- Ronin slept in the boiler room of the church across town his first winter in the city; the old priest gave him the
  side-door key. The church roof leaked for years; a bucket stood in the aisle. The parish loan was from a firm of V's
  father's.
- The second man (the second skull ring) was that lender's collector; Ronin killed him with the boiler-hatch crowbar
  after he broke four of the old priest's fingers. The police file says "burglar", unidentified.
- The Chairman's ledger holds a folded page in V's father's hand about it, with the Chairman's price (forty-one
  thousand, or Ronin) and an offer that V can close it by signing his own blank page.
- The collector's son is one of the Chairman's men in grey; he sat in the front pew one Sunday.
- Ronin sings gospel well enough to win over a karaoke room of accountants. Angel hates karaoke.
- On the `his` path V pays off the church roof anonymously and signs the cheque with his initials.

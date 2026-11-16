# The routes, longer (kc65)

All in `src/kc65.js`; tested by `tools/k65_test.js`. More of the four romance routes: a beat per phase, a
morning-after event, a phone thread and ending lines for each. It extends the existing romance content (td15 dates and
key, td19 small scenes, td27 tea, kc44 lore, kc57 safe) and does not repeat it.

## Delivery
- **Side menu.** When a route beat is due, the side menu lists it with a ♥ (one at a time per route). Each plays once
  (`S.f.k65d[id]`). Gate `K65()`: not lone, not dark, not abroad, not the taken phase. The route is read from
  `S.rom` in Misaki's POV and `S.vrom` in V's (`k65R()` → `mr`/`ma`/`vr`/`va`).
- **Date night.** `romDate`/`vromDate` are wrapped: once the first three dates are done, "Date night" plays the due
  kc65 beat instead of repeating the third date, and still advances the date counter.
- Normal beats need at least one date. After beats need her out of the infirmary (`kdPost()`) for Misaki's routes; V's
  play in `after` or Act II. An after beat missed in `after` is still offered in Act II, before the Act II beat. Act II
  beats wait one day; Act III beats wait for day 2 of the Ledger (like kc57).
- No morning scheduler, so the morning cap (`mbOk`) is untouched. The four morning events are ordinary `EVENTS`.

## Beats

| Route | Phase | Beat | Choice → flag | Comes back in |
|---|---|---|---|---|
| Misaki × Ronin | normal | `mr_booth` the confessional, after midnight | true / filthy / make him swap → `k65mrBooth` | epilogue, ending line |
| | after | `mr_after` "where can I put my hands", rings on the sill | lie on top / stay and talk → `k65mrAfter` | |
| | act2 | `mr_radio` job on the radio; "say red" | red, shut up / talk back → `k65mrRadio` | Act III roof |
| | act3 | `mr_boat` up the back stairs of Heaven with the crowbar | | |
| | epilogue | `mr_epi` the booth again | | |
| Misaki × Angel | normal | `ma_bet` roof, cherries, loser does what winner says | win / miss on purpose / draw → `k65maBet` | epilogue, ending line |
| | after | `ma_after` the pink pads; she asks in Maria's voice | bed / floor by the door → `k65maAfter` | |
| | act2 | `ma_live` Maria's Q&A, you off camera | behave / misbehave → `k65maLive` | Act III roof, ending line |
| | act3 | `ma_boat` she narrates you; the will in "list final two" | | |
| | epilogue | `ma_epi` collecting on the bet | | |
| V × Ronin | normal+ (after `k27_tea`) | `vr_mugs` VEE'S. DO NOT. (POISON) | say it again / filed / say something back → `k65vrTea` | epilogue file, ending line |
| | after | `vr_after` Ronin takes the landing | | |
| | act2 | `vr_gala` the foundation gala, the tie | let him / send him to the car → `k65vrGala` | epilogue file |
| | act3 | `vr_ring` the second skull ring, at four, over eggs | wear it / chain → `k65vrRing` | epilogue file, ending line |
| | epilogue | `vr_epi` Ronin reads his file | | |
| V × Angel | normal+ | `va_theatre` the theatre table in a satin slip | get off / stay there → `k65vaTable` | epilogue |
| | after | `va_after` the kennel; she narrates the door | | |
| | act2 | `va_launch` soft-launching his hand | post / keep (taped in the pink safe) → `k65vaHand` | eyeliner, epilogue, ending line |
| | act3 | `va_boat` his eyeliner wings for the boat | | |
| | epilogue | `va_epi` "hand guy", or the photo in the safe | | |

Morning events: `k65mr_morn` (nine rings on the nightstand, Angel's text), `k65ma_morn` ("the right ceiling", the
watermark), `k65vr_morn` (V sleeps eight hours), `k65va_morn` (V answers Maria's alarm). Threads: `tx_k65_mr`
("what're you wearin"), `tx_k65_ma` (rate the dress), `tx_k65_vr` (the board meeting), `tx_k65_va` ("read to me").

## Care
- After-phase beats are about asking first: Ronin's job brief and his rings coming off one at a time; Angel asking in
  Maria's voice so Misaki can say no to Maria; on V's routes the partner takes the watch so V sleeps. Nothing in kc65
  touches the "full story" strand, so `kdSA()` needs no switch. Act II radio talk comes with a stop word.
- The suggestive scenes fade out (the booth, the theatre door, the mug off the desk).

## New facts to confirm with the author
- Ronin has a key to the side door of the church across town; the confessional and what he wrote in it.
- Ronin's second skull ring has the name of the second man he killed; on V's route he gives it to V, sized for V's
  ring finger.
- The foundation holds an autumn gala, and V has given the speech there nine years running. Ronin owns one suit.
- V's surgical theatre table has adjustable straps (theatre is canon in B5).
- Angel's alarm is Maria saying "good morning, beautiful".
- Maria's channel: a clip called "the flush"; on V's route a "hand guy" fan account.
- Angel keeps Misaki's will in her notes app as "list final two" (the lore has "list (final) (2)").

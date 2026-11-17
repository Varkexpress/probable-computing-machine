# Suggestive-scenes setting, part A (kc70 `sugOn()`)

Scope: the original region of `index.html`, `src/td*.js` and `src/kc19.js`–`src/kc64.js`. kc65–kc68 are done separately.

The rule, from the author: with the setting off, flirting, teasing, innuendo and romance stay as they are. Only lines that
imply sex has happened or is about to happen are replaced: fade-outs, mornings after, cut-aways behind a door. The off
version is still romantic (kisses, holding, sleeping beside each other) and keeps the pairing's own texture. On text is
unchanged. Flags, ids and choices are unchanged.

## Branched

| File | Scene / id | Off version |
|---|---|---|
| index.html | `weddingNight()` (V × Misaki, the Kyoto job) | Instead of the screen sliding shut and "the rest of the night belongs to them": he puts his coat round her on the veranda, kisses her with the screen open, they eat two station egg sandwiches in their wedding clothes, and she falls asleep against his arm mid-sentence about the hounds. Angel's text is "photos??????" instead of "well??????". |
| index.html | `romAfter()` (Misaki × Ronin) | Misaki wakes on Ronin's couch in her wedding clothes under his jacket, where they fell asleep halfway through Heathers. The burning breakfast and the lines after it are unchanged. |
| index.html | `romAfter()` (Misaki × Angel) | They fell asleep on the studio floor in their wedding clothes with the cake box between them; Angel bare-faced, her hand on yours. The rest is unchanged. |
| index.html | `romWedHub` option and `QUESTS.romwed.steps[3]` | "The morning after" reads "The next morning" (the step text is a getter). |
| src/td15.js | `vromConfess('a')`, the yes | Instead of "get behind that rack… the lipstick does not survive it": she kisses him under the ring light, then sits him on the floor among the cables and takes her face off one wipe at a time while he holds the bin. The lipstick print on his collar stays. |
| src/td28.js | `k28_pair2` (Angel's dinner date with the other lead) | Instead of hearing about it "in detail, the next morning": you hear about the dinner, the long walk after, and who fell asleep on whose shoulder in the taxi home. |
| src/kc64.js | `f64_shelf` (V/Misaki, the bath) | Instead of "He shuts the door. He stays on the inside of it.": he shuts the door and sits on the bath mat with his back to the tub, her wet hand on his head, telling her what each of the eleven bottles is for. |

## Read and left as they are (flirting or affection, nothing implied)

- index.html: the `flirt`/`mflirt` topics, the murder-board "that's kinda hot" option, the "Short Circuit" lipstick lines,
  the romance novel gift, the Kyoto beds pushed together, `romConfess`, `romDate`, the ceremony and vows, `MARRIED_R/A`,
  `ROM_P`, the gondola talks, the armory wing line, `MORNING.vbed`.
- src/td15.js: Ronin's confession kiss, the dates, `vrom_chat`, `vrom_morn`, ending lines.
- src/td14.js: nothing suggestive.
- src/td18.js: night waking (sleeping beside, texts).
- src/td19.js: route events and the affection/friend actions (kisses, palm reading, knife sharpening).
- src/td25.js / td28.js bath: aftercare, not sexual. td28 "very hot person", "i like the view": flirting.
- src/td27.js `k27_tea`: Ronin climbs on V's lap and confesses, then falls asleep; nothing happens and the scene does not cut away.
- src/kc37.js drinks: the missing-at-midnight setup already resolves as Pokémon under a pile of hounds.
- src/kc38.js shirtless lore; kc44 romance lore; kc57; kc58 (the stair, the tail lines); kc64 `f64_roof`, `f64_kitchen`, `c64_t_teach`.
- kc19 phone threads, kc21 glasses, td5/td11 "hot" lines: flirting.
- No suggestive ending (`extraEnding`) lines or phone threads were found in this scope.

## Test

`node tools/sug_test.js` runs every branched scene with `META.sug=1` and `META.sug=0` from the same saved state and the
same random numbers, and checks: no page errors, the off text differs, and `S` ends up identical.

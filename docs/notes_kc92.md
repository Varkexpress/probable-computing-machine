# What they do in the room (kc92)

`src/kc92.js`; tests `tools/k92_test.js` (39 checks) and `tools/k86_test.js` (every pool scene); reading copy
`docs/kc92_text.md` (`node tools/room_dump.js 92`). Needs kc73 and kc76–kc91. About 4,700 words, fifteen scenes, all
in kc85's player-opened pool (now 133).

The author asked for more infirmary content, true to the characters. These are scenes in which somebody acts.

## Who they are in these

- **Misaki** is an assassin on a great deal of pain relief who believes the tall one is K9 and means to kill them.
  They are not broken; they are working. They case the room. They try him with a knife. When that fails they offer
  him the one thing they have ever had to sell.
- **V** does not explain himself. He keeps still under a knife and tells them where the vessel is. He writes down
  what he did.
- **Ronin** bargains with the Devil, and is rude to him. **Angel** never misses, and here she does. **Hale** is not
  in a hurry.

## Scenes

- **Misaki, cell**
  - `k_knife`: he leaves a real knife at every meal, and he kneels to put the tray down. They put it to his neck,
    slowly, through the drip. “It happens.” (What he said in the trailer at four, when they woke with a pistol at
    his head.) He tells them where to cut. The hand opens. He lays the knife back on the tray, handle towards them.
    Or the hand lies on the knife and will not close, and he sees it and leaves the tray in reach. → `e2lKnife`.
  - `k_offer`: “i shoot. i’m the best there is… whoever you want, no fee… for as long as you want.” He says no.
    They work out what else a man keeps a person for when he has turned down their work.
  - `k_hound`: the grey hound opens the door herself and lies along their back for six hours. They take it for the
    execution arriving, then for a guard.
  - `k_wash`: full story, the doctor, a sheet held up, and forty minutes one-handed; injuries only, V, each thing
    said first, and Misaki gone to the roof while “he’s cleaning his equipment”.
  - `k_ran` (only after an escape attempt in the existing infirmary run, `S.kd.med.run`): he washes the gravel out
    of the foot that bled and leaves the door a hand’s width open. “That’s so much worse.”
- **Misaki, clear**
  - `k_pray`: Ronin, in the corridor at three, offering the Devil two men off his list and himself on account.
  - `k_pistol`: V brings their pistol, loaded. They count the magazine, or put it on him: “not in the laundry.” →
    `e2lPistol`.
- **V**
  - `k_knifeV`: the same knife from his side. “(There they are.)” → `e2lKnifeV`.
  - `k_offerV`: the offer is the first line of his charge against them, tendered as rent on their own life.
  - `k_houndV`: the grey hound refuses him for the second time in her life; he is jealous of her.
  - `k_washV` (injuries only): what comes off them is the building.
  - `k_ranV` (after an escape attempt): forty feet, barefoot, with three ribs loose; “I can only read it as praise.”
  - `k_miss`: Angel on the range, eleven shots and no paper.
  - `k_hale`: Hale at the gate, on foot. “Then I have not seen them.”
  - `k_empty`: he says “I am not going to kill them” aloud, to the kennel, because he cannot find a way to say it in
    the room that the worst man alive would not also say.

## Code

Pool scenes can now carry a condition: `k92When(fn)` sets `when` on the scene just registered, and `k85List` honours
it. The two escape scenes use it.

## New facts to confirm with the author

- V leaves a real table knife on every tray and kneels on the left knee.
- The grey hound can open door handles; V has never fitted a lock against her.
- V returns Misaki's pistol in the infirmary, loaded (this precedes kc77's return of the rifle with one round).
- Angel missed eleven shots in a row that week. Hale has a daughter.

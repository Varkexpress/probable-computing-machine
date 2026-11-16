# Killer Chat! Off Hours — the kidnapping arc, the infirmary and the recovery

Every line of the arc’s text, compiled from the game source by `tools/kd_script.js` (regenerate with `node tools/kd_script.js`). Lines are quoted as written; `[placeholders]` stand for text the game fills in (the captor organisation, the boss, numbers). Where Misaki’s line changes with closeness, all four tiers are shown (tier 0 = least close; after the kidnapping the voice is pushed toward the plainer tiers). Branches show which condition or choice leads where; ▸ marks a choice the player makes; greyed-out options are marked.

**Speakers:** Misaki (hitmeuppp), V (K9), Angel (Angelic), Ronin (ronin.beaufort); *italic lines are narration*.

_Scheduler order and setting lists were read from the running game._

## Contents

- [Route map](#route-map)
- [1. Before: the war and the warnings](#1-before-the-war-and-the-warnings)
  - [1.1 The man from the canal, the man in grey, the circling](#11-the-man-from-the-canal-the-man-in-grey-the-circling)
- [2. The abduction and captivity](#2-the-abduction-and-captivity)
  - [2.1 Misaki: the van](#21-misaki-the-van)
  - [2.2 Misaki: the interrogation](#22-misaki-the-interrogation)
  - [2.3 Misaki: the cell](#23-misaki-the-cell)
  - [2.4 Misaki: escape, failure, the last chance, the late route](#24-misaki-escape-failure-the-last-chance-the-late-route)
  - [2.5 V: the search](#25-v-the-search)
  - [2.6 V: the rescue](#26-v-the-rescue)
  - [2.7 Out](#27-out)
  - [2.8 The list and the finale](#28-the-list-and-the-finale)
- [3. The infirmary](#3-the-infirmary)
  - [3.1 Waking, and the ordinary stay (Misaki)](#31-waking-and-the-ordinary-stay-misaki)
  - [3.2 The infirmary phone threads](#32-the-infirmary-phone-threads)
  - [3.3 V’s side of the stay](#33-vs-side-of-the-stay)
  - [3.4 The extended delusion](#34-the-extended-delusion)
  - [3.5 The file: V read as one of them](#35-the-file-v-read-as-one-of-them)
  - [3.6 The worst route: Friday](#36-the-worst-route-friday)
  - [3.7 The worst route: the room, her mind, the clues](#37-the-worst-route-the-room-her-mind-the-clues)
  - [3.8 The worst route: the bright turn, the spiral, lucid too late, the interrupted secret](#38-the-worst-route-the-bright-turn-the-spiral-lucid-too-late-the-interrupted-secret)
  - [3.9 The shatter](#39-the-shatter)
  - [3.10 Full story only: the examination, the photographs, the denial, the hidden route](#310-full-story-only-the-examination-the-photographs-the-denial-the-hidden-route)
  - [3.11 Injuries only: the recovery](#311-injuries-only-the-recovery)
- [4. Recovery and aftermath](#4-recovery-and-aftermath)
  - [4.1 The aftermath scenes, in scheduler order](#41-the-aftermath-scenes-in-scheduler-order)
  - [4.2 Other after-phase scenes (not scheduled)](#42-other-after-phase-scenes-not-scheduled)
  - [4.3 Phone threads](#43-phone-threads)
  - [4.4 Talk topics](#44-talk-topics)
- [5. Endings and the lone routes](#5-endings-and-the-lone-routes)
  - [5.1 V alone after the spiral](#51-v-alone-after-the-spiral)
  - [5.2 The lone routes after the late routes (Act II alone)](#52-the-lone-routes-after-the-late-routes-act-ii-alone)
  - [5.3 Ending lines](#53-ending-lines)

## Route map

**When it starts.** The kidnapping is set the night Misaki pays the rent for the second time (or, if she has moved in, on the day she would otherwise be evicted) and happens at the next night card. In Misaki’s POV you play the cell; in V’s POV you play the search; in the joint POV both run.

**Misaki: getting out (section 2.4)**
- *Escape*: the vent (needs the tray, listening at the door, and four screws worked loose) or the door (the star clip or the boot pick, once the guards’ steps are learned) → the stealth run → the loading dock → **she walks to V’s door** (`escaped`).
- *First failed escape*: back to the cell; they stand on her hand.
- *Second failed escape*: closeness tier 2+ (or the joint POV) → **V comes** (`vRescueCut`). Below tier 2 → **the last chance**: the cell again and a short third session. Failing again → **the late route** (`lateM`): V carries her out and dies by the car → Misaki’s lone route (5.2).

**V: getting her out (sections 2.5–2.6)**
- *Find her*: trace the phone, shake down one of their people, call Ronin and Angel, hunt along the river (the fourth warehouse; Angel’s fans find it if he called her) → “Go get her”: the rescue run → carrying her out → **he reaches her cell** (`rescued`). Being seen means the fight; same ending.
- Each night she is missing makes the rescue harder; at **four nights** → **the late route** (`lateV`): he is too late → V’s lone route (5.2).

**The infirmary: severity (section 3).** When she is carried in, the stay is scored: +1 for each session beyond the first, +1 at 16+ lost hours, +1 at 24+, +1 for two failed escapes, +1 for the last-chance route, +1 for composure under 35, +1 if she said two or more things under the needle, +1 for three or more nights missing; +2 with the code *thetallone*. The code *fridaycomes* starts at 14.
- **Under 4 — the ordinary stay** (3.1): clears by the first morning; the shatter is the *morning* version; the bin of soup tubs.
- **4+ — the extended delusion** (3.4): one extra day in the cell; **6+**: two extra days, and on an extra night **Friday** (3.6): she leaves goodbyes with “the tall one”, who is V. Tier 3 can look at the guard’s face and end it early.
- **8+ — the worst route** (Misaki POV, 3.6–3.8): it never clears by itself. Each deluded morning costs 7 composure; each day brings a state-of-mind scene by composure band.
  - *Think it through*: five clues in the room. **Four clues → she reasons it out**, opens the door and finds V (shatter: *logic*).
  - *Composure 3 or less at bedtime* → **the bright turn** (three choices: what she hums, what she leaves out, where she sits) → **the spiral** the same night:
    - with **2+ clues and a goodbye left for V** at Friday → **the secret, interrupted**: V is listening at the door and gets there in time; she lives (shatter: *caught*; `kd_interrupted_after`).
    - otherwise → **lucid too late**: she knows it is V’s house and Tuesday, and cannot call out (shatter: *late*); the bright-turn choices decide what V finds → **V alone** (5.1, `KD_AFTER`).

**The setting** (title screen or pause menu: *Kidnapping aftermath: full story / injuries only*).
- **Full story**: adds the strand about the hours she cannot remember: the doctor’s question, the examination window, the photographs, the precaution cup, the white box, the denial (3.10). Never named.
- **Injuries only**: removes that strand and these scenes: `kd_konbini`, `kd_angelsees`, `kd_card`, `kd_discharge`, `kd_checkup`, `kd_pins`, `kd_wrists`, threads `tx_kd_fine`, `tx_kd_selfie`, `tx_kd_adoc`. Adds the plain room spots and the `kd_rec_*` recovery (3.11). Scenes that branch on the setting show both versions below.

**The hidden route** (`kd_last`, full story, Misaki POV). On the last Saturday the examination would still show, “Answer the question.” is enabled only if all five hold: she **kept the room** (`kd_blank`), **read the note-taker’s notebook herself** (`kd_book`), **looked at the photographs and handed them back** (`kd_photos` then `kd_photodeny`), **took the precaution tablets** (`kd_cup`), and **found the white box** in the infirmary fridge. Then `kd_told_box`, `kd_told_dentist` and `kd_told_sleep` replace the usual scenes, and the collapses (`kd_crash`, `kd_crash2`) do not happen.

**After discharge (section 4).** One scheduled scene every morning and once each in the afternoon, evening and night, in the order of 4.1. The big choices: the notebook (read it / V holds it / burn it), keep the room or let it go blank, the clip (wear it / file it / the river), the trailer (sleep there / move it / leave), and the many small pretences that raise *denial* (full story).

## 1. Before: the war and the warnings

Only the scenes that lead straight into the van. The wider war (eight hunts, one per organisation) is left out.

### 1.1 The man from the canal, the man in grey, the circling

> Normal phase.

#### kd\_omen

> Plays when: before the kidnapping, rent paid 1+ times.

**⟨If Misaki POV⟩**

> *The canal gives a man back, down by the pumping station. The news says “unidentified.” She identifies him from the shoes.*
>
> **Misaki:** 
> - *tier 0:* oops.
> - *tier 1:* should’ve weighted him. lazy.
> - *tier 2:* I should have weighted him. That was lazy.
> - *tier 3:* I should’ve weighted him. I was in a hurry, there was a sale on. That’s going to be a problem, isn’t it.
>
> *On the way home there is a grey van at the end of her road with no front plate. It is gone when she looks again, and she decides that settles it.*
>
**⟨Otherwise (V POV)⟩**

> *The evening news has a body out of the canal by the pumping station. V knows the tailoring. A certain firm dresses all its men at the same shop.*
>
> **V:** (She told me about a canal, in the spring. She was proud of the knot.)
>
> *He sends “Did you eat today?” an hour early. She sends back a photograph of a corn dog.*
>

#### The man in grey

> Before the kidnapping, day 4+: the man in the grey suit buys her address. Plays when: before the kidnapping, `S.day>=4`, after k56_file, `S.f.k56.k56_file<S.day`.

**⟨If V POV⟩**

> *An anonymous donation lands in the shelter fund overnight: forty-one thousand dollars, one for each city, from a company called Constance Holdings.*
>
> *The covering note is a single card with a small ship for a watermark. There is no signature.*
>
> **V:** (Nobody gives forty-one of anything by accident. Somebody has read the brochure very carefully.)
>
> **V — choice:** *Forty-one thousand dollars, from a ship.*
>
> ▸ **Keep it for the shelters** — *(\+$41k)*
>
> > *The money goes to the shelters in the north. He puts the card in the drawer of things he does not yet understand, and it sits on top of the pile.*
> >
> ▸ **Send it back** — *(\+conscience)*
>
> > *The cheque comes back a week later in a fresh envelope, uncashed. On the back somebody has written, in a small slanted hand: “It was a gift. Your father always kept gifts.”*
> >
> > **V:** (He reads it at the kitchen counter, standing up, and then he reads it again.)
> >
**⟨Otherwise (Misaki POV)⟩**

> *The lot manager stops her by the bins. In four years he has never once asked her anything.*
>
> **Lot manager:** Fella came by yesterday. Grey suit, nice shoes. Paid cash to look at the register.
>
> the TENANT register? u have a register??
>
> You keep a register of tenants? And you showed it to him?
>
> You keep a list of who sleeps in which trailer, and you let a man in a grey suit read it for cash. Okay. Just checking I heard the whole sentence.
>
> **Lot manager:** Didn’t write nothing down. Just looked at your line a while. Said it was a lovely lot.
>
> *She checks the trailer that night: the windows, the hinges, the gap under the floor. Nobody has touched anything. Whoever he was, he only wanted to know which door.*
>
> (one: grey suit. two: cash. three: rifle under the bed.)
>
> (one: grey suit. two: cash. three: rifle under the bed tonight.)
>
> (One: a grey suit. Two: cash. Three: the rifle sleeps under the bed tonight.)
>
> (One: a grey suit with nice shoes. Two: he paid cash, so he’s done this before. Three: the rifle sleeps under the bed, and I sleep on top of it.)
>

#### w59\_m\_circle

> Plays when: before the kidnapping, Misaki POV, rent paid 1+ times, after w59_m_warn.

*Eleven at night, coming home. The grey van is back by the fence, with no front plate and the engine off. Four shapes are sitting in it in the dark, and nobody is smoking.*

*Somebody inside it laughs at something on the radio. She stands at her door with the key out for a long time.*

**Misaki:** 
- *tier 0:* (nope.)
- *tier 1:* (nope. not tonight. i have a gun on my hip and they know it.)
- *tier 2:* (One: there’s a gun on my hip. Two: they can see it. Three: so not tonight.)
- *tier 3:* (One: gun on my hip. Two: they can see it. Three: they’re waiting for a night it isn’t there, and I’m not stupid, I’ll just never take it off. Easy.)

*In the morning the van has gone and there is a cigarette end by her step that wasn’t there before. It is [captor org]’s brand, or it is anybody’s.*

#### w59\_v\_circle

> Plays when: before the kidnapping, V POV, rent paid 1+ times, after w59_v_ledger.

*Every outfit in the city is noisy in the ledgers. [captor org] has gone quiet: no new debts, no new hires, no payments, nothing for three days.*

**V:** (An outfit goes quiet when it has finished buying what it needs and is only waiting for the right night.)

**V — choice:** *(The right night.)*

▸ **Sit outside her lot tonight** — *(−energy)*

> *He sits in the car with the lights off from ten until four. Nothing comes. At four she opens the trailer door to put the rubbish out, sees the car, and waves with the bin bag.*
>
> *Nothing comes the next night either. He has a board meeting the night after that.*
>
▸ **Ask her to move in now** — *(she already has / ♥)* `greyed out when she has moved in`

> **V:** I would like you to stay at the house. Starting tonight. For no reason I am prepared to explain.
>
> **Misaki:** 
> - *tier 0:* who is this
> - *tier 1:* after rent. i’m paying it MYSELF. one more week
> - *tier 2:* After rent. I want to pay it myself once, V. Then I’ll come and let your hounds sit on me.
> - *tier 3:* After rent. I need to pay it once, myself, with my own money. Then I’m yours. Don’t make the face. I can hear the face.
>
▸ **Read the accounts again**

> *He reads them until three in the morning. They are still quiet, and he knows exactly what that means.*
>

#### Glimpses

> Before the kidnapping (normal phase), one glimpse on some mornings after a job: the four men later on the list, seen beforehand without knowing who they are. Misaki and V see different ones.

`driver`

> `m`
>
> > *A grey van idles by the fence of the trailer lot with no front plate and the driver’s window down. The man behind the wheel is singing along to the radio, the bank jingle, and he knows every word.*
> >
> > *He has a nice voice. He sees her looking and lifts two fingers off the wheel, the way drivers do on country roads.*
> >
> > **Misaki:** 
> > - *tier 0:* (cute.)
> > - *tier 1:* (guy’s got pipes. wasted on a bank.)
> > - *tier 2:* (He’s got a good voice, honestly, wasted on a bank.)
> > - *tier 3:* (Good voice. Wasted on a bank. I wave back, because I’m a fucking idiot who waves at vans.)
> >
> `v`
>
> > *Two in the morning. V sits in the car at the end of her road with the lights off. He does this some nights, and he does not call it anything.*
> >
> > *A grey van with no front plate goes past the lot twice and stops the third time, by her fence. The driver has his window down and is singing the bank jingle to himself, very well.*
> >
> > *It drives off at half past. V writes the time down, and the half of the rear plate he could see.*
> >
`radio`

> `m`
>
> > *The laundromat by the lot. A big man holds the door with his boot and a cheap radio in his other hand, playing the bank jingle.*
> >
> > *When it ends he winds the dial back and plays it again, and laughs, every time, as if he has never heard it before. He watches her fold a shirt. He watches the whole time.*
> >
> `v`
>
> > **Misaki (in chat):** there is a guy in my laundromat with a RADIO
> >
> > **Misaki (in chat):** he plays the bank jingle. the whole jingle. then he rewinds it. then he LAUGHS. eleven times so far
> >
> > ronin.beaufort (in chat)
> >
> > kill him
> >
> > **V:** Describe him.
> >
> > **Misaki (in chat):** big. boots. why
> >
> > **V:** No reason. Fold quickly.
> >
`notes`

> `m`
>
> > *On the bench across from the job, when she comes out, a man in a clean coat is writing in a notebook.*
> >
> > *His handwriting is very small and very neat. As she passes he looks at his watch, and writes something down, and she reads it upside down: the time, and then “star clip, left-handed bag.”*
> >
> > **Misaki:** 
> > - *tier 0:* (nerd.)
> > - *tier 1:* (birdwatcher. or a cop. or a birdwatcher cop.)
> > - *tier 2:* (Birdwatcher, or a cop, or both. Something with a notebook.)
> > - *tier 3:* (A man with a notebook is either a poet or a problem, and he isn’t a poet.)
> >
> `v`
>
> > *The foundation’s lobby. A man in a clean coat waits two hours on the leather bench for nobody, writing in a notebook.*
> >
> > *The receptionist says he asked, very politely, for the list of volunteers, and wrote down that she would not give it to him. V reads the visitors’ book afterwards. The man signed it in tiny, perfect handwriting, with a name that does not exist.*
> >
`water`

> `m`
>
> > *The bus stop after the job. She drops her change, and a man picks it up and holds it out to her.*
> >
> > *He doesn’t look at her once. He looks at the pavement between their shoes until she has taken it, and then he gets on a bus going the wrong way.*
> >
> > **Misaki:** 
> > - *tier 0:* (weird.)
> > - *tier 1:* (nice. weird. nice.)
> > - *tier 2:* (That was nice. Strange, but nice.)
> > - *tier 3:* (Nice guy. Shy. I hope nobody ever ruins him.)
> >
> `v`
>
> > *Walking the hounds past the bus stop opposite the gate. Everyone looks at the hounds. People look at them the way they would look at something that came out of the river.*
> >
> > *One man on the bench looks only at the ground, and goes on looking at it until all four of them have passed. V notices him because he is the only one who doesn’t look.*
> >

## 2. The abduction and captivity

The kidnapping happens the night after she pays the rent for the second time. Which POV you play decides which half you see; in the joint POV both run.

### 2.1 Misaki: the van

#### The van (Misaki)

> Misaki POV. Plays the night the rent has been paid twice (the kidnapping is set when she pays the second time and fires at the next night card).

*Nine-forty at night, in the trailer lot, forty metres from her own door. The rent receipt is in her back pocket, and she has taken it out twice to look at it.*

*There is a grey van by the fence with no front plate and its engine running. She has parked vans like that herself, and for the same reason.*

**Misaki:** (One: don’t run, running says i know. Two: there’s nothing on my hip tonight, because i was CELEBRATING. Three: oh, fuck.)

*The side door goes back on her third step. There are four of them, and they have done this before. She breaks one man’s nose on the fence post and gets a thumb into another one’s eye. Then somebody has her left hand, and bends it the wrong way until it stops being any use to her.*

**Misaki:** ow. OW. ok, rude—

*A hood, and a needle under the jaw. Her phone lies face up in the gravel, buzzing. Ronin has sent a raccoon in a tiny hat.*

*[captor org]. She put one of their men in a canal in the spring, and he has floated. In the van, before the needle, the man in front asks her one thing, politely: who is K9.*

<small>→ the interrogation</small>

*They put you back in the cell. Down the hall a radio plays a jingle for a bank, and when it ends it starts again.*

**Misaki:** (ok. inventory. clip in my hair, clip in my shoe. left hand’s asleep, that’s fine, i pick locks with the right. vent. door. tray. go.)

### 2.2 Misaki: the interrogation

> Every session runs the original questions, the chair, the question about before nine, and the dose. Later sessions are shorter.

#### The interrogation (original questions)

> Misaki POV. Every interrogation session. Session 1 questions, then later sessions; each answer costs resolve or leaks something. kc27 wraps it (below).

**⟨If n = 1 (session or count)⟩**

> **[boss]:** You know who I work for, Miss Misaki. You cost [captor org] a great deal.
>
> **[boss]:** Who sent you?
>
> ▸ **“a guy. at a bar. he had a hat.”** — *(resolve −8)*
>
> > **[boss]:** Funny. You’re funny.
> >
> ▸ **[Stare at the wall. Say nothing.]** — *(resolve −14)*
>
> > **[boss]:** We have time.
> >
> ▸ **“nobody. you’re just that hateable.”** — *(resolve −10)*
>
> > **[boss]:** (He smiles. It doesn’t reach anything.)
> >
> ▸ **“...someone online pointed me at you.”** — *(they get what they want)*
>
> > **[boss]:** Online. Good. Where online?
> >
> **[boss]:** Your phone was very chatty before we turned it off. “hitmeuppp.” You talk to people. Who?
>
> ▸ **“my mom. she’s very proud of me.”** — *(resolve −10)*
>
> > **[boss]:** I doubt that.
> >
> ▸ **“a mango forum. i review mangoes.”** — *(resolve −8)*
>
> > **[boss]:** ...Mangoes.
> >
> > **Misaki:** 4.4 out of 5. very juicy.
> >
> ▸ **[Silence.]** — *(resolve −15)*
>
> > **[boss]:** Silence is an answer too.
> >
> ▸ **“a chat server. slaughterhouse something.”** — *(they get what they want)*
>
> > **[boss]:** There it is.
> >
> **[boss]:** Someone calls himself K9. He pays for things. Charities. And you. Who is he to you?
>
> ▸ **[Think about the dogs. Say nothing.]** — *(resolve −0)*
>
> > *You think about Max the dog, and the neat little notes in the margins. You can breathe a bit easier.*
> >
> > **[boss]:** ...Hm.
> >
> ▸ **“never heard of him. sounds like a dog.”** — *(resolve −12)*
>
> > **[boss]:** Lying is tiring. You’ll get tired.
> >
> ▸ **“my landlord. evil guy. kill him for me?”** — *(resolve −10)*
>
> > **[boss]:** Cute.
> >
> ▸ **“...he’s rich. he does charity stuff. please—”** — *(they get what they want)*
>
> > **[boss]:** Thank you, Misaki. That’s all I wanted.
> >
**⟨Otherwise⟩**

> **[boss]:** We found your trailer. The stash under the bed. The sticky note on the fridge. “Eat. —V.”
>
> **[boss]:** V. Is that K9?
>
> ▸ **“V for Vendetta. i’m a big fan.”** — *(resolve −12)*
>
> > **[boss]:** (He doesn’t laugh. You laugh enough for both of you.)
> >
> ▸ **[Spit.]** — *(resolve −18)*
>
> > **[boss]:** (He wipes his cheek. Slowly.)
> >
> ▸ **[He’s coming. You know he’s coming.]** — *(resolve −0)*
>
> > *You don’t say it. You just smile.*
> >
> > **[boss]:** ...Why are you smiling?
> >
> ▸ **“yes. it’s him. please just let me sleep.”** — *(they get what they want)*
>
> > **[boss]:** Sleep, then.
> >
> **[boss]:** One name. Anyone from your little server. Give me one and you walk out of here.
>
> ▸ **“big steve. he lives in a sewer.”** — *(resolve −12)*
>
> > **[boss]:** There is no Big Steve.
> >
> > **Misaki:** not with that attitude
> >
> ▸ **“no.”** — *(resolve −18)*
>
> > **[boss]:** That’s a shame.
> >
> ▸ **“…ask for the Butcher. he’ll come to you.”** — *(they get what they want)*
>
> > **[boss]:** (For the first time, he looks uncertain.)
> >
> ▸ **“Angelic. she’s a vlogger. please.”** — *(they get what they want)*
>
> > **[boss]:** See? Easy.
> >
> > *You hate yourself immediately.*
> >
> **[boss]:** Last time I ask nicely. K9. Name. City.
>
> ▸ **“the moon. his name is spot.”** — *(resolve −15)*
>
> > **[boss]:** (He writes it down. You almost feel bad.)
> >
> ▸ **[Nothing. You have nothing left but nothing.]** — *(resolve −20)*
>
> > *Nobody says anything for a very long time.*
> >
> ▸ **[Tell him everything.]** — *(they get what they want)*
>
> > **[boss]:** Good girl.
> >

- *if n = 1 (session or count):* *There is a metal table under the bulb. The man who sits down across it has very clean hands, and he lays them flat on the table for you to look at.*
- *otherwise:* *Nobody lets you sleep. The bulb buzzes. He comes back with the same clean hands and a different tie, so it must be another day.*

`option note` 
- *if `x.leak`:* (they get what they want)
- *otherwise; if `x.gain`:* resolve +[x.gain]
- *otherwise; otherwise:* resolve −[x.c]

<small>(then the same passage as above)</small>

**⟨If every option left is a leak (resolve too low)⟩**

> *You’re too tired. Your mouth opens on its own.*
>
> **Misaki — choice:** *(resolve: [resolve])*
>
**⟨Otherwise⟩**

> **Misaki — choice:** *(resolve: [resolve])*
>

#### Waking in the cell; the session wrapper

> Misaki POV. The wrapper on every session: session 1 opens with her waking; from session 2 the shorter session (kdShort) is used.

*She comes up in pieces: the concrete, then the bulb, then her own hands. She got into that van at nine-forty at night, and there is daylight in the slot of window now.*

**Misaki:** (One: i’m awake. Two: i’ve lost a whole night and i wasn’t even there for it. Three: fuck.)

<small>→ the question about before nine</small>

<small>→ the dose</small>

#### Before nine

> Misaki POV. After the original questions in every full session: the question about her life before nine. Session 1: where did she grow up. Session 2: the invented mother.

**⟨If n = 1 (session or count)⟩**

> **[boss]:** Before the trailer, Miss Misaki. Where did you grow up? I like to know where to send the fingers.
>
> ▸ **“no clue. honest to god.”** — *(the truth · +edge)*
>
> > **[boss]:** Everyone knows where they are from.
> >
> > *It is the only true thing you have said to him all night, and he writes “uncooperative” beside it.*
> >
> ▸ **“osaka. six brothers. all cops.”** — *(resolve −8)*
>
> > **[boss]:** There is no school record for you before the age of nine. No clinic. No mother on any form. I had a man look for two days.
> >
> ▸ **[Say nothing.]** — *(resolve −12)*
>
> > **[boss]:** We have time.
> >
> **[boss]:** So there is nobody. That leaves me your friends on that server, and we will talk about them until you run out.
>
> **Misaki:** (nine years of nothing and it finally did me a favour. there’s no mom for him to go visit. so he’s going to visit them.)
>
**⟨Otherwise⟩**

> **[boss]:** I did find one thing. A woman two towns over who had a daughter your age, and lost her. She would like a telephone call.
>
> **[boss]:** One name from your server and I will dial it for you.
>
> ▸ **“you’re lying.”** — *(resolve −10)*
>
> > **[boss]:** Perhaps. How would you know?
> >
> > *You wouldn’t. He could hand you any mother he liked and you would have nothing to check her against.*
> >
> ▸ **[Want it. Say nothing.]** — *(resolve −16)*
>
> > *You want it for about four seconds, which is four seconds longer than you would have bet on.*
> >
> ▸ **“what’s her name.”** — *(costs you the asking)*
>
> > **[boss]:** Keiko.
> >
> > *No bell rings. You can’t tell whether he made her up, or whether there is nothing left in you for her to ring.*
> >
> ▸ **“…the butcher’s called ronin.”** — *(they get what they want)*
>
> > **[boss]:** Thank you.
> >
> > *He dials. It rings out in the back office of a betting shop, and he holds the phone to your ear for all of it.*
> >

#### The chair

> Misaki POV. Wrapped around the before-nine question: the chair minigame (hold steady while counting the hounds).

*He leaves. Somebody else comes in and stands behind the chair, and then for a while there are no questions at all.*

<small>→ the chair (hold-steady minigame)</small>

- *if success:* *You stay in your own head the whole time. You get to the pale one forty times.*
- *otherwise:* *You lose count somewhere after the black one. When it comes back you are not sure it is the same day.*

**Misaki:** 
- *if success:* (still here. didn’t even hurt.)
- *otherwise:* (didn’t hurt. i just got bored and left for a bit.)

#### The chair (on-screen words)

> The words shown on screen during the chair minigame.

Count the hounds.

Grey. Old. Black. Pale.

Again. From the grey one.

Don’t listen to the radio. Count.

#### Later sessions

> Misaki POV. Sessions after the second: no table, standing; resolve starts lower each time.

*No table this time. He stands, and somebody you can’t see stands behind the chair.*

**[boss]:** 
- *one of:* Again. K9. A street, a gate, anything.
- *one of:* You are very tired. Give me one small true thing and you may sleep.
- *one of:* Who feeds his hounds when he is away? Start there.

▸ **[Nothing.]** — *(resolve −14)*

> **[boss]:** Then we will try the other way.
>
▸ **[Tell him about one of the hounds. Only that.]** — *(it is small. it is still his)*

> **Misaki:** ...the grey one. she’s the biggest.
>
> **[boss]:** The grey one. Good. You see how little it costs?
>
▸ **[Tell him which side of the river.]** — *(they get what they want)*

> **[boss]:** Thank you, Misaki.
>
<small>→ the dose</small>

#### The dose

> Misaki POV. The end of every session: the needle, the lost hours, and whether she talks without knowing it.

*A hand turns your head to one side. The needle goes in on top of the last one.*

**⟨If flag kdLoops set⟩**

> *The bank jingle was on loop [a] when you went under, and it is on loop [number] now. Forty loops to the hour. They had you for [hours] hours and you were there for none of them.*
>
**⟨Otherwise⟩**

> *You come up on the cot and cannot tell whether it has been an hour or a day. Nothing in the room will say.*
>
**⟨If `IR.R<30` or `S.kd.ses>=3`⟩**

> *Your throat is raw, the way it gets when you have been talking for a long time. You don’t remember talking.*
>

#### After the dose: what she says about her injuries (full story)

> Misaki POV, full story: one of these after each dose, in turn (she reports her injuries wrongly).

*Your wrists itch under the cable ties. You don’t look at them. Itching means healing.*

*Your left hand has gone to sleep. You tuck it inside your hoodie and let it.*

**Misaki:** (nothing’s broken. i’d know. i’ve had broken.)

*There is a tooth on the floor by the drain. You wonder whose it is, and nudge it under the cot with your shoe so nobody steps on it.*

**Misaki:** (honestly? feeling pretty good. bit tired.)

#### After the dose (injuries only)

> Misaki POV, injuries-only setting: used in place of the lines above (she names her injuries flatly).

*The cable ties have gone through the skin on both wrists. You know what that looks like in a week if it isn’t cleaned. You spit on it, which is what there is.*

*Your left hand is broken: the two outside bones, behind the ring finger. You know because you felt them go, and because it is the third time.*

**Misaki:** (it’ll set crooked if they leave it. they’ll leave it. ok. done that before too.)

*There is a tooth on the floor by the drain. It’s yours; you can feel the gap with your tongue. You put it in your pocket, because you don’t leave things of yours lying around for other people.*

**Misaki:** (ribs, hand, tooth, wrists, foot. that’s five. i’ve had a worse week. i can’t remember which one, but i have.)

#### What the note-taker wrote

> What the note-taker wrote down while she was under, one line per thing she said (S.kd.said 1–3). Read later if she reads the notebook.

“03:10 subject gives the row and lot number of a trailer, and where the spare key is kept.”

“04:40 subject says the Butcher’s building has a blue door, by the tracks.”

“05:55 subject describes a man’s hounds, one at a time. Says which gate they are kept behind.”

#### They come for another session

> Misaki POV. When the cell clock runs out (six actions), they come for another session.

- *if `S.kd.ses>=2`:* *Boots in the hall. They stop at your door, and nobody bothers with the hood any more.*
- *otherwise:* *Boots in the hall, stopping at your door. You had hours, and you spent them on the floor.*

**Misaki:** (One: it’s only questions. Two: i’ve had worse dates. Three: ...shit, there’s no three.)

<small>→ the interrogation</small>

*They put you back on the cot. The tray is gone, and so is whatever you had worked out about the hall.*

### 2.3 Misaki: the cell

> The room is “Somewhere owned by [captor org]”; the way back is labelled “there is no leaving”. Every action that is not a ready escape uses up the clock; at six they come for another session.

#### Spot: Cot

**⟨If (an internal state check passes)⟩**

> *Under the mattress there is a bent spoon, somebody’s fingernail, and a tally scratched into the frame. Forty-one marks. The forty-second stops halfway down.*
>
> **Misaki:** forty-one. and then what, buddy. ...no. not asking.
>
**⟨Otherwise⟩**

> **Misaki:** not lying down on that. lying down is how they get you used to it.
>

#### Spot: Meal tray

**Misaki:** steel tray, one good edge. it’ll take a screw head. or the bridge of a nose.

*(Got: tray. Also counts as one distraction on the way out.)*

#### Spot: Vent

**⟨If (an internal state check passes)⟩**

> **Misaki:** four screws and no driver. i need something flat. (the left hand won’t close on anything. it’s asleep.)
>
**⟨Otherwise⟩**

> **Misaki — choice:** *The tray edge fits the screws. The vent looks like it goes somewhere.*
>
> ▸ **Crawl out through the vent** — *(fewer guards, tighter routes)*
>
> > <small>→ escape run (stealth minigame)</small>
> >
> ▸ **Not yet**
>

#### Spot: Door

**⟨If (an internal state check passes)⟩**

> *Two of them walk the hall, eleven steps each way. One stops on every pass to look at his phone. The other hums the bank jingle and doesn’t know he is doing it.*
>
> **Misaki:** sloppy. love that for me.
>
**⟨Otherwise⟩**

> **Misaki — choice:** *An old pin tumbler. You have opened worse drunk.*
>
> ▸ 
> - *if `S.pick`:* **Use the pick from your boot**
> - *otherwise:* **Pick it with your star hair clip** — *(lockpick → escape)*
>
> > <small>→ lockpick minigame</small>
> >
> > **⟨If success⟩**
> >
> > > <small>→ escape run (stealth minigame)</small>
> > >
> > **⟨Otherwise⟩**
> >
> > > <small>→ the failed escape</small>
> > >
> > > The clip snaps. A guard hears it.
> > >
> ▸ **Not yet**
>

#### The cell: two more spots

> Misaki POV, in the cell: two spots added by kc27.

**⟨If `k.clock>=6`⟩**

> <small>→ they come for another session</small>
>
**⟨Otherwise⟩**

> **⟨If `s.label==='Vent'`, flag tray set⟩**
>
> > **Misaki:** four screws, and every one of them is going to squeal. i need to know when the hall’s empty first.
> >
> **⟨Otherwise⟩**
>
> > **⟨If not (`s.label==='Vent'`, flag tray set or `s.label==='Door'`, flag listened set)⟩**
> >
> > > **⟨If `k.clock===5`⟩**
> > >
> > > > `on screen` Boots at the far end of the hall. Not long.
> > > >

#### Spot: Your arm

*Under your jaw, where the van needle went, there is one scab. Inside your left elbow there {if `S.kd.ses===1`: is one more | otherwise: are [k.ses] more}, in a neat row.*

*You remember the van. You don’t remember any of the arm ones going in.*

**Misaki:** 
- *if flag kdLoops set:* (that’s [hours] hours where somebody else had the wheel. i hate knowing the number. i’d hate not knowing more.)
- *otherwise:* (no idea how long. somebody else had the wheel, and i don’t even know for how far.)

**⟨If `kdWoozy()`⟩**

> *Your hands are slow. Whatever it is takes a while to leave. If you can stand to wait, they will be better.*
>
**⟨Otherwise⟩**

> *Your hands are your own again, for now.*
>

#### Spot: The radio down the hall

**⟨If kdLoops not set⟩**

> *The bank jingle runs ninety seconds and starts again. Forty loops make an hour.*
>
> **Misaki:** (ok. that’s a clock. One: count. Two: don’t stop counting. Three: when i’m out, i’m closing my account.)
>
> *(Counting the loops means the next dose takes less from you.)*
>
**⟨Otherwise⟩**

> **Misaki:** (loop [S.f.kdLoopN]. still here. still counting.)
>

#### The cell: the screws and the steps

> Misaki POV, in the cell: the vent now needs four screws worked loose with the tray, and the door needs the guards’ steps learned (the Vent and Door spots).

**⟨If `k.clock<6`, flag tray set, flag listened set, `(S.f.kdScrews||0)<4`⟩**

> <small>→ hold-still minigame</small>
>
> **⟨If success⟩**
>
> > *Screw [screw count] of four comes out. You put it in your mouth so it can’t roll.*
> >
> > **⟨If kdScrews ≥ 4⟩**
> >
> > > **Misaki:** (four. it’s open. go.)
> > >
> > **⟨Otherwise⟩**
> >
> > > **Misaki:** (next.)
> > >
> **⟨Otherwise⟩**
>
> > *The tray skids off the screw head. Down the hall, a chair scrapes.*
> >
> > **Misaki:** (shit. wait. wait for him to sit back down.)
> >
**⟨If `k.clock<6`, flag listened set⟩**

> <small>→ step-memory minigame</small>
>
> **⟨If success⟩**
>
> > *Eleven steps down, a turn, eleven back. The one with the phone stops on the seventh every time.*
> >
> > **Misaki:** (seven. i go on seven.)
> >
> **⟨Otherwise⟩**
>
> > **Misaki:** (lost count. the radio keeps eating the steps. again.)
> >

#### Spot: A cup of water

> Shown when: flag kdCup set.

**⟨If `k.clock>=6`⟩**

> <small>→ they come for another session</small>
>
**⟨Otherwise⟩**

> **Misaki — choice:** 
> - *if flag kdWaterN set or `0`:* *The cup is inside the door again. He put it down so that it wouldn’t spill.*
> - *otherwise:* *There is a paper cup of water just inside the door. Somebody pushed it through the slot while you were under.*
>
> ▸ **Drink it.**
>
> > *It is only water. Your head clears a little quicker for it.*
> >
> > **Misaki:** (ok. one of them isn’t a total asshole. or he’s the one who doses it. guess i’ll find out.)
> >
> ▸ **Say “thanks” through the slot.**
>
> > *Nobody answers. A pair of shoes on the other side of the door stays where it is for a moment longer than it needs to, and then goes.*
> >
> > **Misaki:** 
> > - *if `S.f.kdThanks>1`:* (he heard that. he’s the only one who never looks at me. i’m keeping him.)
> > - *otherwise:* (he heard that.)
> >
> ▸ **Pour it down the drain. It could be anything.**
>
> > *You pour it down the drain and put the cup back by the door, upside down, so that they know.*
> >

#### The radio: overheard

> Misaki POV, in the cell: the radio spot also gives three overheard exchanges, one per visit.

The radio down the hall

*Under the jingle, two of them are talking. “Friday. The buyer comes Friday.” “For her?” “For what she knows.”*

**Misaki:** (friday. ok. so i’m out before friday.)

*One of them is singing along with the bank jingle. He knows all the words, and he has a nice voice.*

**Misaki:** (that’s the driver. he sang the whole way here. i’m going to remember that voice.)

*“Clean Hands says not the face. He wants the face for the photograph.” “What photograph?” “The one we send the hound man.”*

**Misaki:** (the hound man. they mean V. ...they’re going to send him a picture of me. oh, he’s going to be so fucking calm about it.)

#### Spot: Their faces

> Misaki POV, in the cell, if she glimpsed any of the men before the van. Shown when: Misaki POV, `W59G_ORDER.some(id=>w59G(id,'m'))`.

*You know them. That is the worst part, and you make yourself look at it.*

**⟨If `s('driver')`⟩**

> *The driver sang the whole way here, and you had heard that voice before, by your own fence, when he lifted two fingers off the wheel at you and you waved back.*
>
**⟨If `s('radio')`⟩**

> *The big one with the radio is the man who held the laundromat door with his boot and watched you fold your shirts.*
>
**⟨If `s('notes')`⟩**

> *You read the note-taker’s handwriting once already, upside down, on a bench outside a job. He wrote down your bag.*
>
**⟨If `s('water')`⟩**

> *And the water. He picked your change up at a bus stop and handed it back without looking at you, and you decided he was shy.*
>
**Misaki:** 
- *tier 0:* (they were there the whole time.)
- *tier 1:* (they were there the whole time. weeks.)
- *tier 2:* (They were there for weeks. I saw every one of them and I filed them all under nothing.)
- *tier 3:* (Weeks. They were in my life for weeks, and I clocked every single one, and I filed them under “weird guy.” One: I am good at noticing. Two: I am bad at believing it. Three: fuck.)

### 2.4 Misaki: escape, failure, the last chance, the late route

#### The escape run

> Misaki POV. The escape attempt itself (stealth through the warehouse or the vents).

`on a takedown` Star clip to the throat. Quiet.

**⟨If success⟩**

> <small>→ the loading dock (stealth minigame)</small>
>
**⟨Otherwise⟩**

> <small>→ the failed escape</small>
>
> A flashlight in your face. Hands on your shoulders.
>

#### The loading dock

> Misaki POV. Second stage of every escape: the loading dock.

*That was the inside. Between you and the river there is still the loading dock, lit like a football pitch.*

**Misaki:** (One: don’t run. Two: the foot’s just asleep. Three: run when it wakes up.)

`on a takedown` The screw from your mouth, in his neck.

**⟨If success⟩**

> <small>→ she gets out on her own</small>
>
**⟨Otherwise⟩**

> <small>→ the failed escape</small>
>
> The roller door was right there. You could smell the river.
>

#### The dock stairs

> Misaki POV. On the dock stairs, if she thanked the man with the water twice.

**⟨If kdThanks ≥ 2⟩**

> *On the dock stairs you come round the corner straight into one of them. He has a paper cup in each hand.*
>
> *He looks at the floor. He goes on looking at it until you are past him.*
>

#### She gets out

> Misaki POV. She gets out on her own (escape and dock stages both succeed) and walks to V’s door.

*The roller door gives. Cold air, the river, diesel.*

*You walk until walking stops looking like prey, and then you run. It is two kilometres to his door. Your left foot makes a noise on every step, and you decide that it is the shoe.*

*V opens the door before you knock. He has his coat on and his keys in his hand, and behind him the car is running.*

**V:** ...Misaki.

**Misaki:** 
- *tier 0:* hi. sorry. didn’t know where else to
- *tier 1:* hi. sorry. i didn’t know where else to go. i’m fine
- *tier 2:* Hi. Sorry. I didn’t know where else to— I’m fine.
- *tier 3:* I didn’t think, I just walked. I’m fine. Why are you looking at me like that? I’m fine.

*He does not answer. He is looking at her hand, then at her wrists, then at the foot, and his own hands have started to shake. She has never seen them do that.*

**V:** Who.

**Misaki:** [captor org]. [boss].

**V:** Thank you. You are going to sit down now.

*She says she would rather stand, and she is on the hall floor before she has finished saying it.*

<small>→ after: into the infirmary</small>

#### A failed escape

> Misaki POV. A failed escape. First failure: back to the cell, the hand. Second failure in the joint POV (“both”): V comes.

**⟨If `S.tries===1`⟩**

> *They don’t hit you anywhere that shows. One of them takes the star clip out of your hair and puts it in his own, and the others laugh.*
>
> *Then two of them hold your left hand flat on the concrete, and the one with the radio stands on it. You hear it more than you feel it.*
>
> **Misaki:** (it’s fine. it was asleep anyway.)
>
> **Misaki:** 
> - *tier 0:* (backup clip’s in my shoe. since i was fifteen. idiots.)
> - *tier 1:* (there’s a backup clip in my shoe. since i was fifteen. always two exits, idiots.)
> - *tier 2:* (There’s a second clip in my shoe. Since I was fifteen. They never check the shoe.)
> - *tier 3:* (Second clip, in the shoe, since I was fifteen. Paranoid little freak. I could kiss her.)
>
> <small>→ the interrogation</small>
>
> *Back in the cell. Your legs are slow to answer, and you tell them twice.*
>
**⟨If both POVs⟩**

> <small>→ V’s rescue (stealth minigame)</small>
>
> *This time nobody takes you back to the cell. They leave you where you fell and go to fetch the man with clean hands.*
>
> *Across the city, a man in a brown coat shuts the boot of a car.*
>
**⟨Otherwise⟩**

> <small>→ V arrives at the loading bay</small>
>

#### V at the loading bay

> Misaki POV. After a failed escape where V comes for her (second failure with closeness tier 2+).

*This time they leave you on the loading-bay floor, and somebody goes to fetch the man with clean hands. Then every light in the building goes out.*

*In the dark a man starts to shout and stops. You hear that four more times, and each time it is nearer.*

*The emergency lights come up red. V is in the doorway, wet to the knee from the river and to the elbow from something else.*

**V:** Misaki.

**Misaki:** 
- *tier 0:* ...took u long enough.
- *tier 1:* took u long enough. i’m fine btw.
- *tier 2:* You took long enough. I’m fine, by the way.
- *tier 3:* I told them you’d come. I told them what you’d do, in detail. I’m fine, by the way, don’t make a thing of it.

*He looks at her for longer than he needs in order to know her. Then he asks whether he may lift her, and waits for the nod.*

**V:** 
- *tier 0:* I apologise. I am late.
- *tier 1:* There were several of them in the way. There are none now.
- *tier 2:* I was always coming. I am sorry for the hours.
- *tier 3:* I would have taken this city apart down to the pipes.

<small>→ after: into the infirmary</small>

#### The second failure: the last chance

> Misaki POV. The wrapper for the second failure: with closeness tier 2+ (or the joint POV) V comes (above); with lower closeness, the last chance (the cell again, then a short third session); a further failure is the late route (lateM, below).

**⟨If `t===2`⟩**

> *Nobody hurries you back. Two of them walk you, one on each side, like aunts at a wedding.*
>
> *After that you can’t count days. The bulb never goes off, and the meals stop keeping hours. You count the jingle, and lose the count, and start again from one.*
>
> *At some point you stop thinking his name, so that it isn’t lying around in your head where they could find it.*
>
> **Misaki:** (he isn’t coming. that’s fine. i never asked him to. i never ask anybody for shit.)
>
> *One screw in the cot frame turns under your thumbnail. You hadn’t noticed it before.*
>

#### The third session

> Misaki POV, the last-chance route: the third, shorter session.

*The third session is shorter. They’re running out of patience, which is worse than when they had a lot of it.*

**[boss]:** We know who K9 is now. We don’t need you to tell us. We just want to see if you will.

**Misaki — choice:** *(...)*

▸ **[Say nothing. Keep his name somewhere they can’t reach.]**

> *You keep it. It’s the only thing you’ve kept.*
>
▸ **[Tell them anything. Just make it stop.]**

> *You tell them. It doesn’t make it stop.*
>

#### The late route (Misaki)

> Misaki POV, the late route: after the last chance fails. V gets her out and dies by the car. Leads to Misaki’s lone route.

*After that there isn’t really a cell anymore. There’s a floor. There’s the bulb.*

*You hear it before you understand it: the alarm, the shouting, a sound you’ve heard in your own work. Doors, one after another.*

*The door opens. The bulb’s behind him so you can’t see his face. You know the coat.*

**V:** Misaki.

**Misaki:** ...you came.

**V:** I am late. Forgive me. I am very late.

*He carries you out through the river door. He’s breathing wrong. You don’t notice, at first, because you’re looking at the sky. You haven’t seen the sky in eleven days.*

*He sets you down by the car. He sits down next to you, very carefully, the way he sits down for the old hound.*

**V:** The side door is unlocked. It always will be. Tell the grey hound—

*He doesn’t finish. Sirens, somewhere far away, getting closer much too slowly.*

*The funeral is small. You don’t go inside. You sit in the trailer in the car park with the engine running, and Angel sits with you, and neither of you says a word for three hours.*

<small>→ V’s lone route</small>

### 2.5 V: the search

> V POV. Each night she is missing raises the rescue’s difficulty; from two nights, one more guard; at four nights, the late route.

#### Delivered (V)

> V POV. The first morning she is gone.

*At seven in the morning he sends “Did you eat today?” At noon he sends it again, and at six. She answers the six o’clock one within four minutes, every day, usually with a photograph of something fried.*

*At 18:40 he sends her name. It says Delivered, and it goes on saying Delivered.*

*He tells the grey hound that he is going for a drive. The grey hound is in the car before he is.*

*The trailer door is banging in the wind. The noodles on the counter have a skin on them. Her phone is in the gravel, and four of the unread messages are his. One white platform shoe lies by the step. The other is under the fence, where it came off while she was being dragged.*

*There is blood on the fence post at the height of a man’s face, and that is not hers. The blood lower down, in the gravel, with two fingernails in it, is.*

**V:** Someone has taken her.

**V:** 
- *tier 0:* I will find them.
- *tier 1:* I will find them, and I will be thorough.
- *tier 2:* I will find them. I will not be kind about it.
- *tier 3:* I will find every one of them. The hounds will eat well.

#### Find her (V’s menu)

> V POV, during captivity: the “Find her” menu. Trace the phone (ops minigame), shake down one of their people, call Ronin and Angel, hunt along the river (needs the trace), go get her (needs the district, the building and a way in).

`h` Find her

▸ **Trace her phone** — *(done — warehouse district / ops deck · decrypt)* `greyed out when it is too late in the day or flag traced set`

> <small>→ step-memory minigame</small>
>
> **⟨If success⟩**
>
> > *The signal pings once, from the warehouse row on the east bank of the river. There are nine warehouses in that row. Then nothing.*
> >
> > **V:** There. One of nine.
> >
> **⟨Otherwise⟩**
>
> > **V:** Again.
> >
▸ **Shake down one of their people** — *(done / costs time)* `greyed out when it is too late in the day or flag informant set`

▸ **Call Ronin and Angelic** — *(done / )* `greyed out when it is too late in the day or flag called set`

> **Ronin:** Took ya long enough, Vee. Point me at the fuckers. All of ’em.
>
> **Angel:** i’m pulling every CCTV account i have. fans are everywhere, V. FANS ARE EVERYWHERE.
>
> **V:** Thank you. Both of you.
>
> **Ronin:** Don’t thank me yet, pal. Thank me after, when I’m wipin’ him off my boots.
>
▸ **Hunt along the river** — *(done — the fourth building / trace her phone first / which of the nine · a wrong door warns them)* `greyed out when it is too late in the day or flag kdBldg set or traced not set`

> <small>→ hunt along the river</small>
>
▸ **Go get her** — *(rescue mission / need the district, the building and a way in)* `greyed out when it is too late in the day or `!(S.f.traced&&S.f.informant&&S.f.kdBldg)``

> <small>→ V’s rescue (stealth minigame)</small>
>

#### Shake down one of their people

> V POV. “Shake down one of their people”.

*One of [captor org]’s errand boys, smoking alone. He sees V and drops the cigarette.*

**Errand boy:** I-I don’t know anything—

**V — choice:** *(He knows where she is.)*

▸ **Pay him** — *(−$50k)*

> **Errand boy:** R-river warehouse. Back entrance. Two shifts of guards.
>
> **V:** Thank you. Leave the city.
>
▸ **Threaten him** — *(−conscience)*

> **V:** You will tell me where she is. Then you will forget my face.
>
> **Errand boy:** River warehouse! Back entrance! Please!
>
▸ **Break his hand** — *(−−conscience · learns the guard schedule)*

> *V does not raise his voice. He does not need to. Afterwards, the boy tells him everything, including when the guards change.*
>
> **V:** (A year ago he would have paid. He no longer spends money on things like this one.)
>
▸ **Let him go, then follow him** — *(\+conscience · slower)*

> *V lets him run. The boy runs straight to the warehouse by the river, like a dog going home.*
>

#### Hunt along the river

> V POV. “Hunt along the river”: which of the warehouses. The right one is the fourth. Angel’s fans find it if he has called her.

**⟨If flag angelHelp set⟩**

> **Angel:** ok. a fan who works nights at the fish market filmed a grey van with no plates going into the FOURTH one. tuesday, 9:58pm. she thought it was a drama shoot.
>
> **V:** The fourth.
>
> **Angel:** she wants a follow back. i said after. go.
>
**⟨Otherwise⟩**

> *Nine warehouses on the east bank. V walks the row in the rain with the tyre pattern from her fence in his head.*
>
> **⟨If flag kdTape set⟩**
>
> > *(The voicemail had a radio in it, and a bank jingle that started again as soon as it ended.)*
> >
> **V — choice:** *(Which one.)*
>
> ▸ **The second: a lit office, forklifts, a night shift**
>
> > *It is a real business. The foreman asks who he is looking for, and by morning the whole row has heard that a tall man in a brown coat was asking.*
> >
> > **V:** (That was an hour of hers, and I spent it.)
> >
> ▸ **The fourth: dark, twin-tyre ruts in the mud, a radio somewhere inside**
>
> > *The ruts match the ones by her fence. Through the wall a radio is playing a jingle for a bank, and it starts again as soon as it ends.*
> >
> > **V:** (She is behind that wall.)
> >
> > *He makes himself walk away from it, because he has no way in yet.*
> >
> ▸ **The seventh: two men smoking out front, a new padlock**
>
> > *They are guarding stolen outboard motors. One of them knows the coat, and makes a telephone call while V is still in sight.*
> >
> > **V:** (They will be expecting me now.)
> >

#### kd\_tape

> Plays when: during captivity, V POV, 1+ nights missing.

*There is a voicemail from her number at 04:10, forty seconds long. Nobody speaks. A radio plays a jingle for a bank, twice through, and under it somebody is breathing slowly, the way people breathe when they have been put to sleep.*

*They wanted him to hear that she is alive and that they can do this whenever they like.*

**V — choice:** *(Forty seconds.)*

▸ **Play it again. Listen to the room, and leave her out of it.**

> *On the ninth listen he has it: the jingle, a roller door, gulls. He writes all three down and does not play it a tenth time.*
>
▸ **Send it to Ronin.**

> **Ronin:** Yeah. I heard it. Stop playin’ it, Vee, you ain’t gonna hear her better the twentieth time.
>
> **Ronin:** I’m bringin’ the crowbar and a thermos. Tell me where.
>
▸ **Put the phone in the freezer.**

> *He puts it in the freezer, shuts the door, and stands with his hand flat on it until the old hound leans on his leg.*
>

#### kd\_vphoto

> Plays when: during captivity, V POV, 2+ nights missing.

*A photograph arrives from her number. It shows a metal table, today’s newspaper, and her left hand laid flat beside it. The hand is the wrong shape.*

*Under it, one line: “She is very funny. We have time.”*

**V — choice:** *(He does not put the telephone down.)*

▸ **Study it. The table is polished.**

> *There is a wall clock reflected in the table top, and a duty sheet pinned beside it. He can read the shift changes. It takes him two hours with a mirror.*
>
> **V:** (Thank you for sending this.)
>
▸ **Reply: “I am coming.”**

> *It says Delivered, and then Read. They will be ready for him now. They will also have read it out to her.*
>
▸ **Show Ronin.**

> *Ronin looks at the photograph for a long time without saying anything, which is not like him.*
>
> **Ronin:** Whoever did that hand is mine t’kill. I’m askin’ you nice, Vee. One time.
>
> **V:** Granted.
>

#### kd\_vfloor

> Plays when: during captivity, V POV, 1+ nights missing, flag called set.

*Ronin and Angel are on the atrium floor when he comes down at five. Nobody asked them over. Angel has the big makeup case for a pillow, and Ronin is asleep sitting up with the crowbar across his knees and the pale hound on his boots.*

**Angel:** don’t. we’re not leaving. make coffee.

*He makes coffee for three. It is the first thing he has made since Tuesday that anybody drank.*

#### kd\_maria

> Plays when: during captivity, V POV, flag called set.

*At nine Maria de la Rosa goes live to two million people in a cream cardigan, with her hair done.*

**Angel:** “This is a little different from what I usually do on this channel. Someone very important to me is missing. I’d appreciate it if you could give me any leads.”

*She tries for a smile, because the channel has only ever seen her happy. It shakes. The tips come in by the minute: a grey van, no plates, the east bank.*

*When the stream ends she takes the cardigan off, picks the shotgun up from behind the ring light, and checks that it is loaded.*

**Angel:** i’ve got forty sightings and a fish market. none of them can say they didn’t have it coming. which warehouse, V.

#### k56\_plate

> Plays when: during captivity, V POV.

*At four in the morning he runs the partial plate from the lot camera: the car that idled under the broken streetlight two nights before she went.*

*Eleven possible matches. Ten are delivery firms and a funeral home. The third car on the list is registered to Constance Holdings, a company with a small ship for a logo and no directors anyone can name.*

**⟨If flag k56Ship set⟩**

> **V:** (The same ship was on the card that came with the forty-one thousand dollars.)
>
**V:** (The people who took her are [captor org]. The car that watched her door belongs to somebody else.)

*He writes CONSTANCE on the inside of his wrist in biro, so that he cannot lose it, and goes back to the river map.*

#### w59\_v\_halecall

> Plays when: during captivity, V POV, from the second day.

**⟨If `F.lease`⟩**

> *He has the folder open before he is awake. A van, a room on the river: [captor org] bought the whole thing in front of him, and he read it with his coffee.*
>
**⟨If `F.phone===k`⟩**

> *And the rota he copied from the phone. Four initials, the hours each man stands in a hall. He knows when they change now.*
>
**⟨If `F.vTold` or `F.asked`⟩**

> **V:** (I asked her. She said after rent.)
>
**⟨If `F.lever`⟩**

> **V:** (I told them what she was to me. They wrote it down.)
>
*The phone. A withheld number, at seven.*

**Hale:** It’s Hale. Don’t say anything. A van with no front plate left the trailer lot at nine fifty-two the night before last. A woman in the end trailer wrote the back plate down on a cereal box.

**Hale:** The plate belongs to [org]. At noon my captain told me to lose the cereal box.

**Hale:** I can tell you which part of the river that company rents on. You’ll find her before I’m allowed to. When you find them, leave me [boss]. Breathing, and in a room with a lawyer. That is my price.

**V — choice:** *(A policeman wants a promise.)*

▸ **Promise him** — *(the unit, not just the district / skips the trace)*

> **V:** You will have your courtroom.
>
> **Hale:** East bank, the warehouse row. I don’t know which. I didn’t call you.
>
> *He hangs up. V writes “Hale: the boss, breathing” on the inside of his wrist in biro, so that he will see it.*
>
▸ **Refuse** — *(no deal)*

> **V:** I do not make promises about that man.
>
> **Hale:** Then I never called. Good luck, Mr. V. I mean that, which is the unprofessional part.
>

#### Two cups

> Plays when: during captivity, V POV.

*V makes tea at six in the morning. He pours two cups before he notices.*

*He drinks his. He leaves the other one on the counter until it goes cold, and then he doesn’t pour it out.*

#### At a window

> V POV during captivity, at certain places in the city (one of these at random).

- *one of:* *You stand at a window. Somewhere out there, behind some other glass, she is waiting. You hope she has a window. You hope she has anything at all to watch.*
- *one of:* *You catch yourself doing what she does: staring at the street as if it is a programme that might, any second, show you her face.*
- *one of:* *The glass is cold. You put your hand flat against it. On the other side, the city goes on not knowing her name.*

#### The server chat

> The server chat (group channel), during captivity and in the after-phase.

**Angel (server chat):** misaki?? you didn’t answer my vlog poll. you ALWAYS answer my vlog poll

**Ronin (server chat):** she ain’t readin’ shit. phone’s been dead since yesterday. somebody’s gonna fuckin’ answer for that

**Angel (server chat):** V. V are you there

**⟨If V POV⟩**

> **V (server chat):** I am handling it.
>
**⟨Otherwise (Misaki POV)⟩**

> **V (server chat):** ...
>
**Angel (server chat):** misaki!!!!! you’re back. are you ok. i can bring snacks. i’m furious nobody has let me shoot anyone yet

**Ronin (server chat):** heard some asshole took our little killer on a trip. heard the asshole’s boss is still breathin’. vee, that one’s mine, i’m callin’ it

**V (server chat):** 
- *tier 0:* Rest, Misaki.
- *tier 1:* Rest. I mean it.
- *tier 2:* Rest. I will be awake regardless; the work is not finished.
- *tier 3:* I am outside your door. Nothing reaches it.

#### Nights missing

> V POV. Each night she is missing. At four nights the late route starts (lateV).

**⟨If 2+ nights missing⟩**

> *Somewhere, Misaki is very tired. Somewhere, a man with clean hands writes something down.*
>
<small>→ the finale</small>

- *if V POV:* *V has waited long enough.*
- *otherwise:* *Misaki has waited long enough.*

#### The late route (V)

> V POV, the late route: four nights missing. He is too late. Leads to V’s lone route.

*On day four, the trace finally resolves at three in the morning: a warehouse on the river, east side.*

*V doesn’t wait for Ronin. He doesn’t wait for anyone.*

*The door is unlocked, and it shouldn’t be.*

*He finds the room with one lightbulb. It’s still on.*

*He’s too late by hours, not days. The chair is still warm, and the water glass beside it is full.*

*There’s a single white star clip on the concrete. He picks it up. He doesn’t remember picking it up.*

**V:** ...

*He doesn’t remember the rest of that night. Ronin does. Ronin never talks about it.*

*The funeral is small. Angel does Misaki’s eyeliner one last time. Her hands shake the whole time and she doesn’t stop until it’s perfect.*

<small>→ V’s lone route</small>

### 2.6 V: the rescue

#### The rescue run

> V POV. The rescue (stealth through the river warehouse). Being seen means the fight.

`on a takedown` 
- *normal:* He goes down without a sound.
- *dark:* He goes down. He does not get up. V does not check.

**⟨If failure⟩**

> *A guard shouts. V does not run. He walks through them instead.*
>
> *It is loud, ugly work, which is not how he likes to do it, and it works.*
>
> <small>→ V reaches her cell</small>
>
**⟨Otherwise⟩**

> <small>→ carrying her out (stealth minigame)</small>
>
> <small>→ V reaches her cell</small>
>
> *A guard shouts. V puts her down behind a pallet, and then he walks through them.*
>
> *It is loud, ugly work, which is not how he likes to do it, and it works.*
>
> <small>→ V reaches her cell</small>
>

#### Carrying her out

> V POV. Second stage of the rescue: carrying her out.

*He has her. She weighs less than she did on Tuesday, and she tells him twice that she can walk.*

*She cannot. He has no hands free now, and the way out is the way he came in.*

#### The cell door

> V POV. He reaches her cell.

*The cell door hangs off one hinge. She is in the corner with a meal tray held edge-out in her right hand, and she has it at the height of his throat before she knows him.*

**Misaki:** ...V?

**V:** I am here.

*He crouches out of reach of the tray. He does not look at the rest of her yet. He looks at her eyes until the tray comes down.*

**Misaki:** you’re covered in—

**V:** Yes.

**Misaki:** 
- *tier 0:* ok. i’m fine. can we go.
- *tier 1:* ok. i’m fine btw. can we go.
- *tier 2:* I knew you’d come. I told them. I’m fine, can we go?
- *tier 3:* Took you long enough. I’m fine. Come here. Mind the hand, it’s asleep.

*He lifts her. She weighs less than the tray made her look. On the way out she counts [number] shapes in the hallway, out loud, the way people count sheep.*

<small>→ after: into the infirmary</small>

### 2.7 Out

> Every way out ends here. What she leaked under questioning reaches her friends: as texts on her phone in her POV, as narration in his.

#### After

> Both POVs, once she is out (escape, rescue, or V arriving). Hands over to the infirmary.

`name` The driver

`description` He drove the van. He sang along to the radio the whole way.

`name` The man with the radio

`description` He kept the same song playing down the hall, on a loop, for days. He thought it was funny.

`name` The note-taker

`description` He wrote down everything she said, and everything she didn’t, in very neat handwriting.

`name` The one who brought water

`description` He never looked at her. He never spoke. He always brought the water anyway.

*Three days after the river she is upstairs in daylight, in one of his shirts with the left sleeve cut off to fit over the cast.*

**Misaki:** 
- *if she got out on her own; tier 0:* i got out. that’s all.
- *if she got out on her own; tier 1:* i got myself out. i want that on the record.
- *if she got out on her own; tier 2:* I got myself out. I want that on the record. I also want to never be in a room with one lightbulb again.
- *if she got out on her own; tier 3:* I got myself out. Before anything else: me, a hair clip and a meal tray. Write that down.
- *otherwise; tier 0:* …
- *otherwise; tier 1:* i owe you. i hate owing people.
- *otherwise; tier 2:* I owe you. Big. I don’t even have an invoice template for this.
- *otherwise; tier 3:* You came. I told them you would. I told them exactly what you’d do, too, and they laughed. Who’s laughing now, seriously.

**V:** 
- *tier 0:* Rest. I will handle the rest.
- *tier 1:* Rest. Then we will talk about [boss].
- *tier 2:* I have a file on [boss]. I have had it for two days. It is very thick, and it is getting thicker.
- *tier 3:* I am done being K9 for them, and done with paper. They get me.

*That night V writes four lines on a fresh page and shows them to nobody. He calls it the list.*

**⟨If Angel friendship 2+, she leaked something under questioning⟩**

> <small>Sent as texts on her phone in Misaki’s POV; shown as narration-speech in V’s POV.</small>
>
> **Angel:** i scrubbed the server logs. every message. whatever they got out of you is worth a lot less now
>
> **Angel:** you owe me a brunch. a long one
>
**⟨If `S.leaks>=2`⟩**

> <small>Sent as texts on her phone in Misaki’s POV; shown as narration-speech in V’s POV.</small>
>
> **Angel:** someone came to my building asking for “the vlogger from the server.” i’m fine. i answered the door with the shotgun. misaki i’m not mad.
>
> <small>Sent as texts on her phone in Misaki’s POV; shown as narration-speech in V’s POV.</small>
>
> **Ronin:** somebody came askin’ for the butcher. they found him. i’m keepin’ a couple pieces of the conversation in the freezer
>
**⟨If `S.leaks===1`⟩**

> <small>Sent as texts on her phone in Misaki’s POV; shown as narration-speech in V’s POV.</small>
>
> **Ronin:** heard ya held out, little killer. mostly. i’ve seen grown men give up their mothers faster. don’t cha make it weird
>
**⟨Otherwise⟩**

> <small>Sent as texts on her phone in Misaki’s POV; shown as narration-speech in V’s POV.</small>
>
> **Angel:** you didn’t give them ANYTHING?? misaki. you’re my hero. i’m— i’m not doing a bit. you’re actually my hero.
>
**⟨If (an internal state check passes)⟩**

> <small>→ waking in the infirmary</small>
>

#### Shaking hands

> After the rescue: her hands on stealth jobs (one line while they shake).

**⟨If `S.kd.shake>0`, `cfg.actor==='m'`, not during captivity, `S.phase!=='normal'`⟩**

> `on screen` Her hands are not steady yet.
>
> **⟨If `r`, success⟩**
>
> > **⟨If `!S.kd.shake`⟩**
> >
> > > `on screen` Steady hands again.
> > >

### 2.8 The list and the finale

> After the infirmary, through the after-phase: the men who held her, one at a time; then the boss.

#### The list

> After the infirmary: the list of the men who held her, as a menu.

The list {if V POV: Four lines, in V’s neat hand. One is crossed out in a different pen — hers. | otherwise: V’s list. He left it on the table where she’d find it. She thinks that was on purpose.} [one entry per name]Each name you deal with means fewer guards around [boss]. Each costs time.

> {if `x.st`: | otherwise: }[list name] — {if `x.gone`, `!x.st`: She cannot describe him any more. The line stays on the page with nothing under it. | otherwise: (nothing)}{if `x.st`; if `x.st===2`: spared | if `x.st`; otherwise: handled | otherwise; if `x.gone`: gone blank | otherwise; otherwise: }
>
`option note` 
- *if `S.slot>=3`:* too late tonight
- *otherwise:* costs time

<small>→ a name on the list</small>

▸ **Close**

#### A name on the list

> Going after one name on the list.

▸ 
- *if Misaki POV:* **Hunt him**
- *otherwise:* **Deal with him personally** — *(stealth · +edge / stealth · −conscience +vengeance)*

> `on a kill` Done.
>
> **⟨If failure⟩**
>
> > **Misaki / V:** He got away. Next time.
> >
> **⟨Otherwise⟩**
>
> > **⟨If `x.id==='water'`⟩**
> >
> > > *He looked at her, at the end. For the first time. She thought it would help.*
> > >
> > > **Misaki / V:** 
> > > - *if Misaki POV; tier 0:* it didn’t.
> > > - *if Misaki POV; tier 1:* it didn’t help.
> > > - *if Misaki POV; tier 2:* It didn’t help. He was the only one who never— It didn’t help.
> > > - *if Misaki POV; tier 3:* He brought me water every day and I— It didn’t help, V. It didn’t help at all.
> > > - *otherwise:* He brought her water. I knew that, so I made it quick. That was all the reward he got.
> > >
> > **⟨Otherwise⟩**
> >
> > > **Misaki / V:** 
> > > - *if Misaki POV; tier 0:* one less.
> > > - *if Misaki POV; tier 1:* one less. it’s quieter in my head.
> > > - *if Misaki POV; tier 2:* One less. It’s a little quieter in my head. Just a little.
> > > - *if Misaki POV; tier 3:* One less. The song’s a little quieter now. I can almost hear past it.
> > > - *otherwise; one of:* He sang along to the radio, she told me. He is not singing now.
> > > - *otherwise; one of:* It took a little under three hours. Next name.
> > > - *otherwise; one of:* That one is finished. The dogs are fed.
> > >
**⟨If V POV⟩**

> ▸ **Ruin him on paper** — *(\+conscience · slower, permanent / needs conscience 40)* `greyed out when `S.heart<40``
>
> > **V:** His bank accounts, his lease and his name will all be gone by Friday, legally and irreversibly. He will spend the rest of his life wondering who he offended. He will never find out.
> >
**⟨If `x.id==='water'`⟩**

> ▸ **Let him go** — *(\+composure / +conscience)*
>
> > The man who brought the water was let go. He looked at the floor the whole time. He was the only one in that place who was ever kind to her.
> >
> > 
> > - *if Misaki POV:* *She finds him at a bus stop. He sees her and doesn’t run. He just looks at the ground, the way he always did.*
> > - *otherwise:* *V finds him at a bus stop. The man looks at the ground, the way Misaki said he always did.*
> >
> > **Misaki / V:** 
> > - *if Misaki POV; tier 0:* go.
> > - *if Misaki POV; tier 1:* go. don’t come back.
> > - *if Misaki POV; tier 2:* Go. Get on the bus. Don’t ever come back to this city.
> > - *if Misaki POV; tier 3:* You brought me water. Every day. That’s the only reason you’ve still got a head. Go. Far. Now.
> > - *otherwise:* Leave the city tonight. You were kind to her when kindness cost you something. That is why you are still breathing.
> >
▸ **Not tonight**

**Misaki / V — choice:** *[list name]. [x.d]*

#### The list: recognition lines

> Recognition lines when a list name is one of the men glimpsed before the kidnapping (Misaki’s line / V’s line).

`driver`

> He sang the bank jingle by her fence, weeks before, and lifted two fingers off the wheel at her.
>
> V has the time he parked by her fence, and half of his rear plate, in a notebook from before.
>
`radio`

> He held the laundromat door with his boot and laughed at the jingle eleven times while she folded her shirts.
>
> She told the server about him from the laundromat. “Big. Boots.” V asked her to fold quickly.
>
`notes`

> He sat on a bench outside one of her jobs and wrote down her bag.
>
> He signed the foundation’s visitors’ book in tiny, perfect handwriting, with a name that does not exist.
>
`water`

> He picked her change up at a bus stop and gave it back without looking at her.
>
> He sat at the bus stop opposite the gate and was the only man in the city who would not look at the hounds.
>

#### The finale

> End of the after-phase (“has waited long enough”): going after the boss.

**⟨If (an internal state check passes)⟩**

> ▸ **Misaki goes after [boss]** — *(infiltration)*
>
> > <small>→ Misaki’s infiltration (stealth minigame)</small>
> >
**⟨If V POV⟩**

> ▸ **V ruins them — the K9 way** — *(leaks, lawyers, frozen accounts / needs conscience 45 — that man is gone)* `greyed out when `S.heart<45``
>
> > *V spends one night and four million dollars. By morning, [captor org]’s accounts are frozen, their lawyers have quit, and three newspapers have the same file.*
> >
> > **V:** You will not be permitted to disappear. Everyone is going to look at you.
> >
> ▸ **V kills [boss]** — *(infiltration with takedowns)*
>
> > <small>→ V’s infiltration (stealth minigame)</small>
> >
*The night before, V sits at the kitchen table cleaning the rifle he keeps for one kind of night. Misaki eats cereal out of the box across from him.*

**Misaki:** 
- *tier 0:* u do the frown when u clean things
- *tier 1:* you’re doing the frown.
- *tier 2:* You frown when you clean things.
- *tier 3:* You frowned like that at me the first night. I thought it meant you hated me.

**V:** It means I am concentrating.

**⟨If flag ronHall set⟩**

> *Ronin texts at midnight: “hallway’s on me again if u need it. don’t need it.”*
>
**⟨If toldAngel = 1⟩**

> *Angel texts at one: “come back with all your fingers. i did your nails.”*
>
**⟨Otherwise⟩**

> **⟨If flag angelSecret set⟩**
>
> > *Angel texts at one: a single panda emoji.*
> >
**⟨If flag rentBack set⟩**

> **Misaki:** (the trailer’s mine through march. whatever happens, that stays true.)
>
**⟨Otherwise⟩**

> **⟨If flag rentLet set⟩**
>
> > **Misaki:** (through march, on his money. so don’t let it go wrong.)
> >
**⟨If coatKept = 0⟩**

> *At dawn he wears a black jacket instead of the coat. It fits badly, and he wants it to.*
>
**V:** Whatever happens, you walk out first.

**Misaki:** 
- *tier 0:* whatever u say grandpa
- *tier 1:* no. we go together.
- *tier 2:* No. Together, or I’m not going.
- *tier 3:* No. I already walked out of one room alone and it sucked. Together.

**V / Misaki — choice:** 
- *if V POV:* *[boss]. [captor org]. It ends tonight.*
- *otherwise:* *[boss]. it ends tonight.*

#### Misaki goes after the boss

> Misaki’s infiltration of the boss.

`on a kill` 
- *normal:* Done.
- *dark:* For the forty-one marks on the cot.

**⟨If failure⟩**

> **⟨If both POVs or closeness tier 2+⟩**
>
> > *They have her pinned. Then the lights die, and someone tall walks in from the dark.*
> >
> > **V:** Get behind me.
> >
> **⟨Otherwise⟩**
>
> > *She gets out. Barely. [boss] gets out too.*
> >
> > **Misaki:** next time.
> >

#### V goes after the boss

> V’s infiltration of the boss.

`on a kill` V does not say anything to him. There is nothing left to say.

**⟨If failure⟩**

> *V stops sneaking. It is louder after that, and shorter.*
>

#### k56\_why

> Plays when: in the after-phase, after discharge from the infirmary.

*The kitchen, late. The list is on the table between them.*

why me. like actually. i’m one guy with a rifle

Why me? Out of everyone who’s ever hurt them. I’m one person with a rifle and a trailer.

I keep doing the sum and it doesn’t come out, babe. I’ve hit a lot of people. Why me, why that week, and why did they already know which trailer?

**V:** You cost [captor org] [number of hits] of their people. I put their accounts in a file with my name on the cover.

**V:** They could not find K9. They could find you, and they thought you would know where I sleep.

**⟨If she leaked something under questioning⟩**

> i did know. that’s the bad part
>
> I did know. That’s the bit I keep landing on.
>
> I did know, and I don’t remember what I told them. That’s the bit I keep landing on.
>
**⟨Otherwise⟩**

> i didn’t tell them shit
>
> i didn’t tell them. for the record
>
> I didn’t tell them. For the record. For the list.
>
> I didn’t tell them anything, and they kept asking politely, like they had all week. They did have all week.
>
**V:** There is a third thing. The lot has forty trailers, and they walked straight to yours.

**⟨If flag k56Grey set⟩**

> the grey suit. the register
>
> The man in the grey suit. He read my line in the register.
>
> The grey suit. He stood by the bins and read my line in a book, and a week later there was a van.
>
**⟨Otherwise⟩**

> someone sold the door
>
> somebody sold them the door
>
> Somebody sold them which door.
>
> Somebody sold them my door, and I want to know what I went for.
>
**⟨If flag k56Plate set⟩**

> **V:** A car belonging to a company with a ship on its letterhead sat outside your lot two nights before. The company has no directors. I am still looking.
>
**⟨Otherwise⟩**

> **V:** I do not know who yet. I am looking.
>
*He adds a line under the names on the list and leaves it blank.*

ok. look faster

Then look faster. I’ll help when my hand works.

Then we look together, when my hand works. And when we find the seller I pick the method. That’s my one condition.

They took her for two reasons: her contracts, and his file on [captor org]. Somebody sold them which trailer.

#### The address was bought

> After the finale: the boss says the address was bought (lawyer version if V ruined them; otherwise the boss himself).

**⟨If flag finalRuin set⟩**

> *Four days after the accounts freeze, a lawyer for [captor org] asks for ten minutes with V and gets six.*
>
> **Lawyer:** My client wishes you to know it was never personal. The address was bought. It was not cheap, and the man who sold it keeps very good books.
>
> **V:** Who?
>
> **Lawyer:** My client would rather go to prison than say that name, Mr. V. I would draw my own conclusions.
>
**⟨If flag bossLives set⟩**

> *A text arrives from a number that stops working an hour later.*
>
> **???:** you think this was my idea. i PAID for your address. ask the man with the ship who sold it. he keeps a book.
>
> **Misaki / V:** 
> - *if `me==='K9'`:* (He forwards it to himself three times, so it cannot be lost.)
> - *otherwise; tier 0:* ...a book.
> - *otherwise; tier 1:* a book. great. a BOOK
> - *otherwise; tier 2:* A book. Somebody has me in a book.
> - *otherwise; tier 3:* A book. There’s a man somewhere with my address in a book, and he got paid for it.
>
**⟨Otherwise⟩**

> *At the end, [boss] does not beg. There is one thing left to say, and it comes out calmly, from somebody who has already been paid for it.*
>
> **[boss]:** You think this was my idea? I bought your address. Ask who sold it to me. He keeps a book.
>
> **Misaki / V:** 
> - *if `me==='K9'`:* Who?
> - *otherwise; tier 0:* who
> - *otherwise; tier 1:* who sold it
> - *otherwise; tier 2:* Who sold it?
> - *otherwise; tier 3:* Who sold it? Say the name and I’ll make this quick.
>
> *[boss] laughs once, and that is the last thing anybody gets.*
>
**⟨If flag k56Plate set⟩**

> **V:** (A book. He writes it on the inside of his wrist, under the other word.)
>

## 3. The infirmary

V’s infirmary on sublevel two, behind a door marked LAUNDRY. In Misaki’s POV the room is drawn as the cell until her clarity reaches 2, and the spots carry her reading of them. How long the delusion lasts depends on how bad the captivity was (severity: see the route map).

### 3.1 Waking, and the ordinary stay (Misaki)

> All stays. A mild stay (severity under 4) clears by the first morning. In the room, kc28’s spots have two labels: what she thinks it is while it is a cell (clarity under 2), and what it is.

#### The room that says LAUNDRY

> Both POVs: the first night in V’s infirmary on sublevel two (the door says LAUNDRY). Misaki takes it for another cell.

**⟨If V POV⟩**

> *The infirmary is on sublevel two, behind a door marked LAUNDRY. V had it built four years ago for the hounds and for himself. No other person has ever been in it.*
>
> *The doctor works on her for six hours and V holds the lamp. He learns that the left hand was broken on the first day and again on the third, and that she walked out of that building on a foot that should not have taken weight.*
>
> **V:** She told me in the car that she was fine. She said it twice.
>
> *She will wake in a room she has never seen, with a needle in her and one light on. He takes the bulb out of its cage and fits a lampshade from the east wing.*
>
**⟨Otherwise (Misaki POV)⟩**

> *She comes up in pieces again: a ceiling, a bulb, a needle taped into the back of her hand.*
>
> *There is a door. Her shoes are gone, and the clip was in the shoe.*
>
> **Misaki:** (no. no no no. i got OUT. i remember getting out.)
>
> **Misaki:** (...do i? One: a river. Two: a coat. Three: nothing. shit. they moved me.)
>
> *She takes an inventory and finds everything where she left it. She feels fine, a bit stiff. She does the whole inventory without once looking at her left hand.*
>

#### The chart

> Full story: the chart on the end of the bed (shown when she reads it).

*The clipboard is in fountain pen. “L hand: 3rd and 4th metacarpals fractured, healed crooked, re-broken and pinned. R shoulder: dislocated, reduced. Ribs 6–8 L: fractured.”*

*“L foot: fracture, walked on. Wrists: ligature burns, both, to the tendon. Scalp: 14 sutures. Two molars. Weight: minus 7 kg. Back: see photographs. Do not show patient.”*

#### No leaving

`leaveText`

> 
> - *if during captivity:* There is no leaving. Not through the front.
> - *otherwise; if she still thinks it is a cell (clarity under 2):* (They’d hear the door.)
> - *otherwise; otherwise:* You’re supposed to stay in bed.
>

#### Spot: Cot / Bed

> Shown when: infirmary room spot.

**⟨While she still thinks it is a cell (clarity under 2): “Cot”⟩**

> **Misaki — choice:** 
> - *if she still thinks it is a cell (clarity under 2):* *(if i sleep, they come while i’m under.)*
> - *otherwise:* *(the sheets smell like his laundry.)*
>
> ▸ **Sleep** — *(ends the day)*
>
> ▸ **Not yet**
>
**⟨Once she knows where she is (clarity 2+): “Bed” (same as above)⟩**

#### Spot: The line in your hand / The drip

> Shown when: infirmary room spot.

**⟨While she still thinks it is a cell (clarity under 2): “The line in your hand”⟩**

> **Misaki — choice:** *(whatever’s in the bag is going into me.)*
>
> ▸ **Pull it out.**
>
> > *She pulls it with her teeth, because her left hand won’t close on the tape. It bleeds more than a needle should.*
> >
> > **Misaki:** (barely a scratch.)
> >
> > *When she next wakes it is back in, in the other hand, with twice as much tape.*
> >
> ▸ **Leave it. Find out what it is first.**
>
> > *The bag has a label, in handwriting. She can’t make her eyes hold the letters still.*
> >
**⟨Once she knows where she is (clarity 2+): “The drip”⟩**

> *“Saline. Cefazolin. NO sedatives — she reacts.” The last part is underlined twice, in fountain pen.*
>
> **Misaki:** 
> - *tier 0:* (his handwriting.)
> - *tier 1:* (that’s V’s handwriting. he labelled my DRIP.)
> - *tier 2:* (That’s his handwriting. He underlined it twice.)
> - *tier 3:* (He wrote “no sedatives” and underlined it twice. He’d have stood over the doctor until she agreed.)
>

#### Spot: The eye in the ceiling / Smoke detector

> Shown when: infirmary room spot.

**⟨While she still thinks it is a cell (clarity under 2): “The eye in the ceiling”⟩**

> *A red light in the ceiling blinks every eight seconds.*
>
> **Misaki:** (camera. hi, assholes. get my good side.)
>
**⟨Once she knows where she is (clarity 2+): “Smoke detector”⟩**

> *It’s a smoke detector. Somebody has written the date of its last battery on it, in fountain pen.*
>

#### Spot: Their notes / Your chart

> Shown when: infirmary room spot.

**⟨While she still thinks it is a cell (clarity under 2): “Their notes”⟩**

> **Misaki:** (somebody had a rough week.)
>
> **Misaki:** (...why’s my name at the top. that’s not right. i walked out. i’m FINE. the hand’s just stiff.)
>
> *She hangs the clipboard back up with her right hand. The left one is in a cast to the elbow, and she has not looked at it yet.*
>
**⟨Once she knows where she is (clarity 2+): “Your chart”⟩**

> **Misaki:** 
> - *tier 0:* (that’s a lot of words for “fine.”)
> - *tier 1:* (ok that’s. that’s a lot. i still feel fine tho??)
> - *tier 2:* (That’s a long list. I don’t feel any of it. Is that the drip, or is that me?)
> - *tier 3:* (That’s two pages, and I’d have told you I had a stiff hand and a bad night. So either the doctor’s lying or I am, and I’m the one who lost [hours] hours.)
>

#### Spot: Tray / Soup

> Shown when: infirmary room spot.

**⟨While she still thinks it is a cell (clarity under 2): “Tray”⟩**

> *A covered bowl. Still warm.*
>
> **Misaki:** (not eating anything i didn’t watch get made. nice try.)
>
**⟨Once she knows where she is (clarity 2+): “Soup”⟩**

> **⟨If already done today⟩**
>
> > **Misaki:** (had it. there’s ten more in the fridge down the hall. he labelled them by day.)
> >
> **⟨Otherwise⟩**
>
> > *There is a note under the bowl: “I made this. I watched myself make it. —V.”*
> >
> > *She eats it with the spoon in her right fist. Two of the teeth on the left side aren’t there to help, and she chews on the other side without wondering why.*
> >

#### Spot: Something covered up / The mirror

> Shown when: infirmary room spot.

**⟨While she still thinks it is a cell (clarity under 2): “Something covered up”⟩**

> *A towel has been taped over something on the wall.*
>
> **Misaki:** (they don’t want me to see something. psychological. cute.)
>
**⟨Once she knows where she is (clarity 2+): “The mirror”⟩**

> **⟨If flag kdMirror set⟩**
>
> > **Misaki:** (seen it. it’s a face. it’s fine.)
> >
> **⟨Otherwise⟩**
>
> > **Misaki — choice:** *(He taped a towel over the mirror.)*
> >
> > ▸ **Take the towel down.**
> >
> > > **Misaki:** 
> > > - *tier 0:* see? fine.
> > > - *tier 1:* see? fine. bit tired.
> > > - *tier 2:* There. Fine. A bit tired.
> > > - *tier 3:* There, see? Fine. I’ve looked worse after karaoke.
> > >
> > > *The person in the mirror has a shaved patch above one ear with fourteen stitches in it, an eye that does not open all the way, and a jaw the colour of a plum.*
> > >
> > > *She fixes her fringe with one hand and hangs the towel back up, to be polite.*
> > >
> > ▸ **Leave it.**
> >

#### Spot: Door / The door

> Shown when: infirmary room spot.

**⟨While she still thinks it is a cell (clarity under 2): “Door”⟩**

> **Misaki — choice:** *(No lock I can see. So somebody’s on it.)*
>
> ▸ **Listen.**
>
> > *Somebody is breathing on the other side, low down, as if he were sitting on the floor. There is a second set of lungs with him, much bigger.*
> >
> > **Misaki:** (guard. and a hound. fuck. they’ve got a hound now.)
> >
> ▸ **Go. Now, while you can stand.** — *(stealth)*
>
> ▸ **Not yet**
>
**⟨Once she knows where she is (clarity 2+): “The door”⟩**

> *The door has a handle. It has had one the whole time.*
>
> *Outside, V is asleep sitting up against the corridor wall, in the coat, with the old hound across his shins. There is a thermos and a romance novel beside him.*
>
> **Misaki:** 
> - *tier 0:* (...)
> - *tier 1:* (he’s been out here the whole time.)
> - *tier 2:* (He’s been out here the whole time. That was the breathing.)
> - *tier 3:* (That’s the guard I’ve been listening to for two days. He brought a book.)
>

#### Spot: Foam ball

> Shown when: she knows where she is (clarity 2+).

**⟨If already done today⟩**

> **Misaki:** (did my reps. the hand says no more today.)
>
**⟨Otherwise⟩**

> <small>→ hold-still minigame</small>
>
> 
> - *if success:* *Three squeezes with the left hand. The pins move when she does it, and she watches them move with interest.*
> - *otherwise:* *The ball rolls under the bed. She tells it that it’s a stupid ball.*
>
> **Misaki:** 
> - *if success:* (easy. doesn’t even hurt.)
> - *otherwise:* (whatever. hand’s just stiff.)
>
> `bad` It gets away from her.
>

#### Spot: Steel cabinet

> Misaki POV, infirmary, while it is a cell. Shown when: she still thinks it is a cell (clarity under 2).

*A steel cabinet with glass doors. There are instruments in it, laid out in rows on green cloth.*

**Misaki:** (of course there’s instruments. there’s always a room with instruments.)

#### Spot: Supply cabinet

> Misaki POV, infirmary, once she knows. Shown when: she knows where she is (clarity 2+).

*Every shelf is labelled in fountain pen. Most of the labels say things like “THE GREY HOUND — 40 kg” and “THE PALE HOUND — ears.”*

*On the top shelf the word HOUNDS has been crossed out and “MISAKI — see card. NO sedatives.” written under it. Half of what is in her drip was bought for a mastiff.*

**Misaki:** 
- *tier 0:* lol.
- *tier 1:* i’m on hound medicine. LMAO.
- *tier 2:* I’m on hound medicine. Fantastic.
- *tier 3:* I’m being treated out of the hound cupboard. I’ve never felt so included.

#### Spot: A tray of instruments

> Shown when: she still thinks it is a cell (clarity under 2).

**Misaki — choice:** *(Scissors. Forceps. Something with a hook. All laid out in a row.)*

▸ **Take the scissors.**

> *She takes the scissors and puts them under the mattress with the blades open. Whoever comes for her next gets them.*
>
> *They are bandage scissors. The ends are rounded, so that they can’t cut the patient.*
>
▸ **Tip the tray over.**

> *It makes a great deal of noise. Nobody comes running. After a while somebody on the other side of the door says, “I will bring another.”*
>
▸ **Leave it.**

#### Spot: Treatment trolley

> Shown when: she knows where she is (clarity 2+).

**⟨If `(S.done.kdRxN||0)>=2`⟩**

> **Misaki:** (that’s enough being poked for one day. the doctor said two. i heard her.)
>
**⟨Otherwise⟩**

> **⟨If `!did('dress')`⟩**
>
> > ▸ **Dressings: wrists and back** — *(healing)*
> >
> > > *The doctor does her wrists and then asks her to turn round. Misaki looks at the wall and tells it about a pigeon she once saw eat a whole chip.*
> > >
> > > **Misaki:** 
> > > - *tier 0:* doesn’t hurt.
> > > - *tier 1:* doesn’t hurt. is it meant to?
> > > - *tier 2:* It doesn’t hurt. Is it supposed to?
> > > - *tier 3:* It doesn’t hurt. I keep waiting for it to, and it just doesn’t. Is that good? Don’t answer.
> > >
> > > *The doctor says that it is supposed to. She writes something down.*
> > >
> **⟨If `!did('pins')`⟩**
>
> > ▸ **The hand: clean the pin sites** — *(hold still · healing)*
> >
> > > <small>→ hold-still minigame</small>
> > >
> > > 
> > > - *if success:* *She holds the hand flat on the towel and does not move it while the doctor works round each pin with a swab.*
> > > - *otherwise:* *The hand jumps. The swab catches a pin, and the pin moves, and she watches it move.*
> > >
> > > **Misaki:** 
> > > - *if success:* (see. easy. it’s not even mine, it’s just a hand on a towel.)
> > > - *otherwise:* (huh. that went all the way up my arm. interesting.)
> > >
> > > `bad` It catches.
> > >
> **⟨If `!did('ribs')`⟩**
>
> > ▸ **Breathe. All the way in, on three broken ribs.** — *(healing)*
> >
> > > 
> > > - *if success:* *Ten full breaths, and she gets to the top of every one. The doctor says most people stop at four.*
> > > - *otherwise:* *She stops at four. The doctor says most people do.*
> > >
> > > **Misaki:** 
> > > - *if success:* (most people are babies.)
> > > - *otherwise:* (got bored. it didn’t hurt. i got bored.)
> > >
> **⟨If `!did('pills')`⟩**
>
> > ▸ **The painkillers** — *(two white tablets in a paper cup)*
> >
> > > **Misaki — choice:** *(The cup has “not a sedative — V.” written on it.)*
> > >
> > > ▸ **Take them.**
> > >
> > > > *She takes them with the soup. Twenty minutes later the room is the same room, and she understands that she had been holding every muscle she owns.*
> > > >
> > > > **Misaki:** (oh. ...that’s what not hurting is. ok. so the other thing was hurting.)
> > > >
> > > ▸ **Palm them. You don’t need them.**
> > >
> > > > *She puts them in her cheek and then under the mattress, in the bed frame, the way she kept the screw.*
> > > >
> > > > **Misaki:** (don’t need them. nothing hurts.)
> > > >
> **⟨If `!o.length`⟩**
>
> > **Misaki:** (done all of it. i’m a model patient. write that down.)
> >
> **⟨Otherwise⟩**
>
> > **Misaki — choice:** *(The doctor will do two things a day and no more.)*
> >
> > ▸ **Not now**
> >

#### Spot: A machine that beeps

> Shown when: she still thinks it is a cell (clarity under 2).

*A screen with a green line on it. It beeps each time the line jumps.*

**Misaki:** (it’s counting something. me, probably. hope i’m expensive.)

#### Spot: The monitor

> Shown when: she knows where she is (clarity 2+).

*Pulse [number], sitting still. Temperature 38.[number]. The doctor asked her this morning for a number out of ten, and she said two.*

- *if she hid tablets:* *The machine has no line for tablets. There {if `rx.palmed>1`: are [number] | otherwise: are two} under the mattress.*
- *otherwise:* *On the clipboard beside it somebody has written “pt reports 2” and, next to that, in fountain pen, a question mark.*

**Misaki:** 
- *tier 0:* two’s generous.
- *tier 1:* it’s a two. maybe a one.
- *tier 2:* It’s a two. I said two. I’d know.
- *tier 3:* Two. I’ve been shot, I know what a seven is. This is a two with a cast on.

#### Spot: The small fridge

> Shown when: she knows where she is (clarity 2+).

**⟨If flag kdKit set⟩**

> 
> - *if kdKit = 'turned':* *Soup, labelled by day. The white box is still on the bottom shelf, with its label to the back.*
> - *otherwise:* *Soup, labelled by day. The white box is still on the bottom shelf.*
>
**⟨Otherwise⟩**

> *Soup, in eleven tubs, labelled by day in fountain pen. On the bottom shelf there is a sealed white box with her name on it, a date, and COLLECT WITHIN 5 DAYS.*
>
> **Misaki — choice:** *(A box with your name on it.)*
>
> ▸ **Ask what the box is for.** — *(she is not going to)* `always greyed out`
>
> ▸ **Take Thursday’s soup. Shut the door.**
>
> > **Misaki:** (it’s for the hounds. everything down here’s for the hounds.)
> >
> ▸ **Turn the box so the label faces the back.**
>
> > *She turns it round. Now it is a white box. The date is still on the lid, and she has read it, and she can count to five.*
> >

#### Running

> Misaki POV. Running from the infirmary (Door, “Go. Now”). Caught: V kneels. Out clean: Biscuit in the garage. Out with a takedown: the drip needle in V’s arm.

`on a takedown` The drip needle, into his forearm. He doesn’t make a sound.

**⟨If success, `r.kills>0`⟩**

> *She comes out into a garage. Her own truck is parked in it. Beside it is a black sedan with a hound blanket on the back seat.*
>
> *Behind her, the guard she put the needle in is sitting on the corridor floor holding his forearm. He is wearing a brown coat.*
>
> **V:** Misaki. It is Thursday. You are in my house.
>
> **Misaki:** 
> - *tier 0:* ...V?
> - *tier 1:* V? ...i stabbed u.
> - *tier 2:* V. I stabbed you. I thought— there was a bulb.
> - *tier 3:* Oh, fuck. I stabbed you. I looked right at you and I saw the radio guy. I saw his fucking shoes, V.
>
> **V:** It is a small needle. The pale hound has done worse.
>
**⟨Otherwise⟩**

> **⟨If success⟩**
>
> > *She comes out into a garage. The grey hound is lying across the big door. It lifts its head and looks at her. It does not get up, and it does not make a sound. Nothing in the other building ever looked at her and stayed where it was.*
> >
> > **Misaki:** 
> > - *tier 0:* ...oh.
> > - *tier 1:* that’s HIS. the grey one. why do they have—
> > - *tier 2:* That’s his. The grey one. Why would they have— oh.
> > - *tier 3:* That’s the grey one. That’s his, nobody else has one of those, he made her. So why would they have— oh. Oh, I’m an idiot. I’m in his fucking basement.
> >
> > *She sits down on the concrete, and it takes a while. Her foot has been trying to tell her something since the corridor.*
> >
> > **Misaki:** (it’s asleep. it’s been asleep all week.)
> >
> **⟨Otherwise⟩**
>
> > *Hands on her shoulders, from the front. The guard kneels until his face is lower than hers. None of the others ever did that.*
> >
> > **V:** It is Thursday. You are on sublevel two of my house. I am going to carry you back, and I am telling you before I do.
> >
> > **Misaki:** 
> > - *if she knows where she is (clarity 2+); tier 0:* ...V?
> > - *if she knows where she is (clarity 2+); tier 1:* V? is that—
> > - *if she knows where she is (clarity 2+); tier 2:* V? Is that you?
> > - *if she knows where she is (clarity 2+); tier 3:* V? ...Say something only you’d say.
> > - *otherwise:* (the tall one knows my name. they all know my name.)
> >

#### No phone

> Misaki POV, first infirmary day: the phone is blocked.

**⟨If Misaki in the infirmary, `S.kd.med.d<1`⟩**

> `on screen` No phone. They took it.
>

#### The backlog

> Misaki POV: the backlog of messages sent while she was gone, delivered when V slides her phone under the door.

**Misaki (text):** — while you were gone —

**Misaki / V (text):** — while you were gone —

**Misaki / V (text):** — while you were gone —

**V (text):** [tue 07:00] Did you eat today?

**V (text):** [tue 12:00] Did you eat today?

**V (text):** [tue 18:00] Did you eat today?

**V (text):** [tue 18:40] Misaki.

**V (text):** [wed 07:00] Did you eat today?

**V (text):** [wed 03:12] I am looking. I will not stop.

**V (text):** [thu 07:00] Did you eat today?

**Angel (text):** [tue] misaki?? you didn’t answer my vlog poll. you ALWAYS answer my vlog poll

**Angel (text):** [wed] ok this isn’t funny

**Angel (text):** [wed] answer or i post the bad photo to two million people. i mean it

**Angel (text):** [thu] please

**Ronin (text):** [tue 21:41] (a raccoon in a tiny hat)

**Ronin (text):** [wed] phone’s goin’ straight t’nothin’. you dead or rude

**Ronin (text):** [thu] don’t be dead. I’d have t’be nice at a funeral and I ain’t got the suit

#### Infirmary mornings

> Both POVs: each infirmary morning (day 1, day 2, and the walk upstairs on day 3).

**⟨If `m.d>=3`⟩**

> **⟨If Misaki POV⟩**
>
> > *V walks her up the stairs himself, one at a time, with a hand under her elbow. She lets him.*
> >
> > *The infirmary door is on the kennel corridor. It says LAUNDRY. She has walked past it forty times.*
> >
> > **Misaki:** 
> > - *tier 0:* u have a hospital.
> > - *tier 1:* u have a HOSPITAL. in the BASEMENT.
> > - *tier 2:* You have a hospital in your basement, and the sign says “laundry.”
> > - *tier 3:* You’ve got a whole hospital behind a door that says “laundry.” I thought I was back in it, V. For two days. You could’ve put up a fucking poster.
> >
> > **V:** There is a poster now.
> >
> **⟨Otherwise (V POV)⟩**
>
> > *On the third morning she knows the house. She asks why the door says LAUNDRY, and he tells her that nobody ever opens a laundry.*
> >
> > **Misaki:** 
> > - *tier 0:* i thought i was back there.
> > - *tier 1:* i thought i was back in it. for two days.
> > - *tier 2:* I thought I was back in it. For two days, in your house.
> > - *tier 3:* For two days I thought I was back in it, and you were the guard. You could’ve put up a fucking poster.
> >
> > **V:** There is a poster now.
> >
> *She is upstairs again, in daylight.*
>
**⟨Otherwise⟩**

> **⟨If Misaki POV⟩**
>
> > **⟨If `m.d===1`⟩**
> >
> > > *Somebody is changing the bag on the stand. She keeps her eyes shut and her breathing slow, the way she did for the others.*
> > >
> > > *This guard is new. He says “I apologise” to her hand before he touches the tape. He smells of hound.*
> > >
> > > **Misaki:** (good cop. ok. they’ve got a good cop now. don’t fall for it.)
> > >
> > > *When she looks, her phone is on the floor just inside the door, face up and charged.*
> > >
> > **⟨Otherwise⟩**
> >
> > > *There is a weight across her legs that was not there last night. It is warm, and it snores.*
> > >
> > > **Misaki:** 
> > > - *tier 0:* (hound.)
> > > - *tier 1:* (they brought a HOUND in. to soften me up. good trick.)
> > > - *tier 2:* (They’ve brought in a hound. It’s a good trick. It’s the weight of the grey one.)
> > > - *tier 3:* (A hound, to soften me up. It weighs what the grey one weighs and it’s got her seam down the shoulder, the one he sewed. ...Oh.)
> > >
> > > *Her left hand goes to rest on its neck and doesn’t arrive. She looks at it properly for the first time. It is in a cast to the elbow, and two steel pins stand out of the back of it.*
> > >
> > > **Misaki:** (huh. when did that happen.)
> > >
> **⟨Otherwise (V POV)⟩**
>
> > **⟨If `m.d===1`⟩**
> >
> > > *At six the infirmary bed is empty. The drip stand is gone, and a line of blood drops leads to the door.*
> > >
> > > **V — choice:** *(Where would she go.)*
> > >
> > > ▸ **The garage. She will go for the biggest door.**
> > >
> > > > 
> > > > - *if it is too late in the day:* *Ten minutes lost in the kennel corridor. By the time he reaches the garage she has the big door up by a hand’s width.*
> > > > - *otherwise:* *She is where he thought she would be.*
> > > >
> > > > *She is holding the drip stand like a spear, on a foot she should not be standing on. She does not know him.*
> > > >
> > > > **V — choice:** *(She believes she is still in that building.)*
> > > >
> > > > ▸ **Sit down on the floor.**
> > > >
> > > > > **Misaki:** i’m fine. i was just leaving.
> > > > >
> > > > > *She says it pleasantly, as if he had met her on the way out of a shop. There is blood down the hand where the needle was, and she has not noticed that either.*
> > > > >
> > > > > **V:** (She is not lying to me. She believes it.)
> > > > >
> > > > ▸ **Say the day and the place.**
> > > >
> > > > > <small>(then the same passage as above)</small>
> > > > >
> > > > ▸ **Let the grey hound through.**
> > > >
> > > > > <small>(then the same passage as above)</small>
> > > > >
> > > ▸ **The kennel corridor.**
> > >
> > > > <small>(then the same passage as above)</small>
> > > >
> > **⟨Otherwise⟩**
> >
> > > *She asks for a mirror. The doctor has said not yet.*
> > >
> > > **V — choice:** *(She has not seen her face.)*
> > >
> > > ▸ **Give her the mirror.**
> > >
> > > > **Misaki:** 
> > > > - *tier 0:* see? fine.
> > > > - *tier 1:* see? fine. told u.
> > > > - *tier 2:* See? Fine. I told you.
> > > > - *tier 3:* See? Fine. I’ve looked worse after karaoke. You’re all so dramatic.
> > > >
> > > > *She is looking straight at fourteen stitches and an eye that will not open. He watches her do it, and she hands the mirror back and asks what’s for lunch.*
> > > >
> > > ▸ **“Not yet.”**
> > >
> > > > **Misaki:** 
> > > > - *tier 0:* why.
> > > > - *tier 1:* u think i can’t handle a bruise?
> > > > - *tier 2:* You think I can’t handle a bruise?
> > > > - *tier 3:* What, you think I’ll faint at a bruise? I’ve seen what I do to other people, V.
> > > >
> > > > **V:** I think that you would look at it and tell me it was nothing. I am not ready to hear that.
> > > >

#### Nights

> Misaki POV: one scene each infirmary night, by night.

*The first night she does not sleep. She lies on her side facing the door with her eyes open, the way animals do, and watches the gap under it for feet.*

*At two the light under the door goes dark: somebody has sat down against it. At three the somebody starts to read aloud, under his breath, something about land tax in the eighteen-seventies. At four the voice stops in the middle of a sentence, and she realises he has fallen asleep sitting up.*

*She listens to him breathe until it gets light. She does not know who he is. She knows his breathing better than her own by morning.*

*She dreams the van. Not the inside, only the door, the side door, sliding back on its track, over and over, the sound it makes.*

*She wakes up with her good hand already round the drip stand and the needle out of her other hand, and blood on the sheet, and the room dark.*

*There is a voice on the other side of the door, ordinary, close to the floor: “Misaki. It is three in the morning. You are on sublevel two. Nobody is coming in. I am going to stay where I am.”*

*She doesn’t answer. She puts the stand down, very slowly, so it won’t clatter. After a long time she lies down on the floor herself, on her side of the door, with her back against it. They sleep like that, back to back through two inches of wood.*

*Third night. She can’t sleep with the light off and she can’t sleep with it on. She turns it on and off fifty-one times. She counts.*

*At the fifty-second the door opens a hand’s width, and something big comes through the gap low down and lies across her feet. It is warm and very heavy and it sighs.*

*The grey hound. She knows it’s the grey hound because of the seam down the shoulder, under her palm, where V sewed her back together when she was a pup.*

**Misaki:** 
- *tier 0:* (...hi.)
- *tier 1:* (hi. ok. hi. you can stay.)
- *tier 2:* (Hi. You can stay. You can stay.)
- *tier 3:* (Hi, baby. Hi. You can stay. You can absolutely stay. I’ll leave the light however you want it.)

*She sleeps with her hand on the seam and the light off. It is the first time since the van that the dark has been just dark.*

*She wakes at four with her face wet and doesn’t know why. She checks the room in order, the way she checks a roof: door, corners, bed, ceiling, her own hands.*

*It isn’t the cell. She knows it isn’t. She cried anyway, in her sleep, about something she can’t reach, and she lies there furious about it, as though somebody had gone through her pockets.*

**Misaki:** 
- *tier 0:* (stupid.)
- *tier 1:* (stupid. nothing happened. it was a dream about nothing.)
- *tier 2:* (Stupid. It was a dream about nothing.)
- *tier 3:* (Crying in my sleep. Over what? Some dream I don’t even get to keep. If I’m going to cry I want to at least know what it was about. That’s the deal. That’s the bare minimum.)

#### The fifth night

> Misaki POV: the fifth night (only on long stays).

*Fifth night. She has started to know the sounds of the house: the boiler at one, a hound turning over at two, the lift somewhere above going up and down for no reason anybody has ever explained to her.*

*She lies there cataloguing them, the way she catalogued the building with the radio.*

**Misaki:** 
- *tier 0:* (boiler. hound. lift.)
- *tier 1:* (boiler, hound, lift. that’s his house. that’s his house breathing.)
- *tier 2:* (Boiler. Hound. Lift. His house, breathing.)
- *tier 3:* (Boiler at one. Hound at two. Lift at whenever it likes. It’s a house. It’s a house breathing in its sleep. I’m in a house that breathes and nobody in it wants anything from me.)

*She falls asleep before three for the first time. In the morning she will not remember deciding to.*

#### Spot: The light-well

> Shown when: Misaki in the infirmary, she knows where she is (clarity 2+).

*High up in the ceiling there is a slot of thick glass, a light-well, that goes up through four floors of house to the garden. A little grey daylight comes down it. Nothing else does.*

**⟨If `d>=2`⟩**

> *Today a leaf is stuck on the glass at the top, very small, very far up. You watch it for a long time. It is the only thing from outside you’ve seen in a week that nobody brought in to you on a tray.*
>
**⟨Otherwise⟩**

> *You can’t see sky through it. Only light, and it changes. You find you are timing it: brighter at eleven, gone by five.*
>
**Misaki:** 
- *tier 0:* (outside.)
- *tier 1:* (that’s outside. it’s still there.)
- *tier 2:* (That’s outside. It’s still there.)
- *tier 3:* (It’s still out there, then. The whole city. Nobody turned it off while I was gone. That’s nice of it. That’s honestly really rude of it.)

#### Spot: Talk to V through the door

> Shown when: Misaki in the infirmary, she knows where she is (clarity 2+), a door topic is left.

`option note` 
- *if `i===4`, `used.length<3`:* not yet
- *otherwise:* 

**Misaki — choice:** *(He is on the other side. He always is.)*

▸ **Not now**

#### Spot: The sink

> Shown when: Misaki in the infirmary, she knows where she is (clarity 2+).

**⟨If flag kdSink set⟩**

> **Misaki:** (hair’s clean. first time in days. still smells like his shampoo. which i hate. and don’t.)
>
**⟨Otherwise⟩**

> **Misaki — choice:** *(Your hair has the cell in it. You can smell it. You can’t lift your left arm above your shoulder.)*
>
> ▸ **Do it yourself, one-handed.**
>
> > *It takes forty minutes. The water runs grey, then clear. You get shampoo in the stitches above your ear and stand there with your forehead against the cold mirror until the sting stops.*
> >
> > **Misaki:** 
> > - *tier 0:* (done.)
> > - *tier 1:* (done. alone. good.)
> > - *tier 2:* (Done. On my own.)
> > - *tier 3:* (Done, on my own. I needed one thing in here to be mine.)
> >
> ▸ **Ask V. He’s the only one allowed behind you.** — *(you can’t make yourself / )* `greyed out when closeness tier below 2`
>
> > *He comes in when you call, which is the first time he has come all the way in. He stands where you can see him in the mirror the whole time, and asks before each thing: the tap, the jug, his hands.*
> >
> > *He wraps the cast in a bread bag and tapes it. He washes your hair the way he washes the hounds, thoroughly, without hurrying, talking the whole time about nothing, about the weather he can’t see.*
> >
> > *The water goes grey. He keeps going until it doesn’t. You watch his face in the mirror. It is very calm. His hands are not, quite, and he keeps them moving so that you won’t notice.*
> >
> > **Misaki:** 
> > - *tier 0:* ...thanks.
> > - *tier 1:* thank u. nobody’s ever.
> > - *tier 2:* Thank you. That’s the cleanest my hair’s been in years.
> > - *tier 3:* Thank you. I don’t think anyone’s ever done that for me. Not ever. Not even before nine, probably. I think I’d remember that. Even I’d remember that.
> >
> > **V:** Then I will do it again on Thursday.
> >
> ▸ **Leave it.**
>

#### Spot: Open the door. All the way.

> Shown when: Misaki in the infirmary, full clarity.

*You open the door all the way, for the first time, on your own, and look out.*

*The corridor is long and white and lit, and in it, lying down in a row, spaced exactly evenly, facing the door, are the four hounds. They don’t get up. They have been told not to rush you, and they don’t.*

*V is at the far end, sitting on the floor with his back to the wall and a book face down on his knee. He doesn’t get up either.*

**Misaki:** 
- *tier 0:* ...hi.
- *tier 1:* hi. hi guys. hi.
- *tier 2:* Hi. Hi, all of you.
- *tier 3:* Hi. Hi, babies. Hi. I’m okay. I’m okay. Look at you all lying down like a guard of honour, oh my god, who taught you that.

**V:** Nobody. They worked it out.

*You sit down in the doorway. One at a time, in order, oldest first, they get up and come and lie down against you, until you are under four hounds and can’t see the corridor at all, and you don’t want to.*

#### Talk through the door: the five topics

> Misaki POV, once she knows where she is: “Talk to V through the door”, five topics, one each.

“what day is it.”

**V:** Thursday. The twelfth. It is ten past four in the afternoon. It is raining, which you cannot hear down here, so I am telling you.

**Misaki:** 
- *tier 0:* thursday.
- *tier 1:* thursday. ok. what was it when i came in.
- *tier 2:* Thursday. What day was it when I came in?
- *tier 3:* Thursday. Okay. And when I came in, what was it? Don’t do the kind voice. Just the day.

**V:** Monday night. Before that, you were gone for days I will tell you the number of when you ask for it, and not before.

**Misaki:** 
- *tier 0:* k.
- *tier 1:* ok. not yet.
- *tier 2:* Not yet.
- *tier 3:* Not yet. Ask me again on Saturday. If I don’t ask, tell me anyway.

“who else knows i’m here.”

**V:** Ronin. Angel. The doctor. The four hounds. Nobody else in the world.

**Misaki:** 
- *tier 0:* the server?
- *tier 1:* does the server know.
- *tier 2:* Does the server know?
- *tier 3:* Does the server know? Did somebody post about it? Tell me nobody posted.

**V:** Angel told the server that you have food poisoning and are being insufferable about it. There have been forty messages since about soup.

**Misaki:** 
- *tier 0:* lol.
- *tier 1:* lmao. ok. good. food poisoning.
- *tier 2:* Food poisoning. Good. That’s good.
- *tier 3:* Food poisoning. That’s perfect. That’s exactly what I’d want them to think. Tell her thank you. Tell her I said the soup was bad.

“where’s my phone.”

**V:** In my pocket. It was in the gravel at the trailer. It has four hundred unread messages and a cracked corner.

**Misaki:** 
- *tier 0:* don’t give it to me yet.
- *tier 1:* don’t give it to me yet.
- *tier 2:* Don’t give it to me yet.
- *tier 3:* Keep it. I don’t want to see four hundred people asking where I was. I don’t want to read the ones from you. Not yet. I know what they say.

**V:** What do they say?

**Misaki:** 
- *tier 0:* did u eat today.
- *tier 1:* “did you eat today.” three times a day. then just my name.
- *tier 2:* “Did you eat today,” three times a day, and then just my name.
- *tier 3:* “Did you eat today,” at seven, twelve and six. And then on the Tuesday, at twenty to seven, just my name. I know because it’s what you’d send. I don’t need to read it to know.

“tell me about the hounds.”

**V:** The grey one has slept outside this door every night. She will not eat unless I put her bowl next to it. The old one guards the stairs. The black one is sulking because you have not thrown anything for him. The pale one has eaten one of your socks, which I found in the laundry.

**Misaki:** 
- *tier 0:* which sock.
- *tier 1:* which sock. was it the frog one.
- *tier 2:* Which sock?
- *tier 3:* Which sock? If it was the frog one I’m going to kill her, and then I’m going to be very nice to her for a week.

**V:** The frog one.

**Misaki:** 
- *tier 0:* ...good girl.
- *tier 1:* good girl. tell her good girl.
- *tier 2:* Tell her she’s a good girl.
- *tier 3:* Tell her she’s a good girl. Tell her that exactly. She ate my sock while I was gone, she kept a bit of me in the house. That’s loyalty.

“are you okay.”

*There is a long pause on the other side of the door.*

**V:** Nobody has asked me that since you went.

**Misaki:** 
- *tier 0:* i’m asking.
- *tier 1:* well i’m asking. are u.
- *tier 2:* I’m asking. Are you?
- *tier 3:* I’m asking. You’ve been on the floor outside this door for three days, reading to someone who called you the guard. Are you okay, V.

**V:** No. I will be. I would like to be okay in the same room as you, when you are ready, and not before.

*She puts her hand flat on the door. On the other side, a few seconds later, so does he. Neither of them can tell, through two inches of wood, but both of them are sure.*

#### Visitors

> Misaki POV, an afternoon or evening once she knows where she is: Ronin, then Angel.

**⟨If Misaki in the infirmary, she knows where she is (clarity 2+)⟩**

> **⟨If Ronin friendship 1+⟩**
>
> > *Ronin comes down the stairs at two in the afternoon. You can hear him from the top: he is incapable of being quiet on stairs.*
> >
> > **Ronin:** Brought you some hospital jelly. Stole it from a hospital. Real one. They had a whole cart.
> >
> > *He stands in the door for a second too long before he comes in. He has never once in his life stood in a doorway before coming in.*
> >
> > **Misaki:** 
> > - *tier 0:* u can come in.
> > - *tier 1:* come in. i won’t bite. probably.
> > - *tier 2:* You can come in. I won’t bite.
> > - *tier 3:* Come in. Jesus. You’re letting the cold in. I won’t bite you. I might bite you. Get in here.
> >
> > **Ronin:** Yeah. Course. I knew that.
> >
> > *He sits on the end of the bed and eats most of the jelly himself, red and green, talking about a man he did on Tuesday with great and loving detail. You laugh twice. Both times he looks at you like he’s checking that it was real.*
> >
> > *When he goes, he stops at the door with his back to you.*
> >
> > **Ronin:** Shoulda been me that found you. I was two streets over. I keep doin’ the math on it.
> >
> > **Misaki:** 
> > - *tier 0:* don’t.
> > - *tier 1:* don’t do the math. i’m the math one.
> > - *tier 2:* Don’t do the math. I’m the maths one.
> > - *tier 3:* Don’t do the maths. That’s my job. And the answer’s that you’d have done it messier and I’d have had to wash you off. Go home, Ronin.
> >
> > **Ronin:** Sucks t’be you.
> >
> > *He goes. On the stairs going up he is, for the first time anyone can remember, perfectly quiet.*
> >
> **⟨Otherwise⟩**
>
> > **⟨If Angel friendship 1+, infirmary day 3+⟩**
> >
> > > *Angel comes with the big makeup case and doesn’t open it. She sits in the chair by the bed with it on her lap, both hands flat on the lid, and looks at you for a long time without saying anything, which she has never once done.*
> > >
> > > **Angel:** i had a whole plan. i was going to do your nails. i had a bit ready. it was funny.
> > >
> > > **Misaki:** 
> > > - *tier 0:* do the bit.
> > > - *tier 1:* do the bit. i want the bit.
> > > - *tier 2:* Do the bit. I want the bit.
> > > - *tier 3:* Do the bit. Please. I’ve been in here four days with a man who reads tax history. I want the bit.
> > >
> > > *She does the bit. It is about a man at a perfume counter, and it is very funny, and halfway through her voice goes and she has to stop and look at the ceiling for a while, which is what she does instead of crying, because it doesn’t ruin the eyeliner.*
> > >
> > > **Angel:** sorry. the ending’s good. hang on.
> > >
> > > *She finishes it. You laugh at the ending, properly, and hurt your ribs, and she does your nails after all, on the right hand only, black, with a tiny knife on the thumb, and a tiny pink heart on the cast where the left thumb would be.*
> > >
> > > **Angel:** none of them can say they didn’t have it coming. i’m going to be so thorough about this, babe. you have no idea.
> > >
> > > **Misaki:** 
> > > - *tier 0:* i know.
> > > - *tier 1:* i know. save me one.
> > > - *tier 2:* I know. Save me one.
> > > - *tier 3:* I know. Save me one. The radio one. And film it. Not for the channel. For me.
> > >

#### Spot: The server

> Shown when: Misaki in the infirmary, she knows where she is (clarity 2+), infirmary day 2+.

*Your phone has the server on it. You scroll up to the day you went quiet and read forward.*

*It kept going. Somebody asked where to get tarps. Ronin posted a burger. Angel posted a Maria video about lip liner and forty people said “slay.” There was an argument about a parking space that went on for most of a day.*

**Misaki:** 
- *tier 0:* (good.)
- *tier 1:* (good. that’s the rule. u keep posting)
- *tier 2:* (Good. That’s the rule. You keep it normal so nobody asks.)
- *tier 3:* (Good. That’s right. That’s the rule: you keep it normal so nobody on the server asks where the sniper went. They did it properly. I’m proud of them. I’m so proud of them.)

*You scroll back to find V in it. He posted once, the first night, at twenty to seven: “Has anyone seen hitmeuppp.” Somebody you don’t know asked if that was a band. After that there is nothing from K9 for [n] days, in a server where he has never once gone a day without correcting somebody’s grammar.*

**Misaki:** 
- *tier 0:* (...idiot.)
- *tier 1:* (he broke it. idiot)
- *tier 2:* (He broke the rule. Idiot.)
- *tier 3:* (He broke it. He didn’t even try to keep it. He just stopped. Idiot. Idiot.)

*You put the phone face down on your chest and lie there with it for the rest of the afternoon, while somewhere above it the server goes on about tarps.*

#### Spot: V’s shirt

> Shown when: Misaki in the infirmary, she knows where she is (clarity 2+), full-story setting.

*You are sleeping in one of V’s shirts. It is too big, it buttons all the way to the throat, and it is the only thing in the room you chose.*

*Every time you wake you check the buttons before you open your eyes, top to bottom, by feel. They are all done up. You did them up yourself. You do them up again anyway, all eleven, and lie still.*

**Misaki:** 
- *tier 0:* (eleven.)
- *tier 1:* (eleven. all done)
- *tier 2:* (Eleven. All done up.)
- *tier 3:* (Eleven. All done up. It’s a nice shirt. It smells like the hounds. I just like it done up, it’s cold, it’s a basement.)

**⟨If `d>=2`⟩**

> *When V brings the soup he sees you check them once, while he is in the doorway. He looks at the soup until you have finished.*
>

#### Spot: Count the stitches

> Shown when: Misaki in the infirmary, she knows where she is (clarity 2+), injuries-only setting.

*You count the stitches with your good hand, by feel, the way you count rounds. There are fourteen in your scalp, six on the left wrist and four by your eye.*

*Under the new ones your fingers keep finding old ones, flat and shiny, that somebody put in a long time ago. You have no idea who.*

**Misaki:** 
- *tier 0:* (24 new.)
- *tier 1:* (24 new. dunno how many old)
- *tier 2:* (Twenty-four new. I don’t know how many old.)
- *tier 3:* (Twenty-four new. I can’t count the old ones, they run into each other. Somebody sewed me up before, more than once, and I don’t remember a single time. Fine. Same as now.)

*You do it again before you sleep, and get the same number for the new ones and a different one for the old.*

#### Spot: A drawer

> Shown when: Misaki in the infirmary, she still thinks it is a cell (clarity under 2).

*There is a metal drawer under the cot. Somebody has put your things in it, in a clear bag with a label: the trailer key on its rubber frog, a lip balm with no lid, two hair ties, and the rent receipt from your back pocket, gone soft as cloth. The red stamp still says PAID.*

**Misaki:** 
- *tier 0:* (they went thru my pockets.)
- *tier 1:* (they went through my pockets. they’ve got my RECEIPT.)
- *tier 2:* (They went through my pockets. They’ve got my rent receipt.)
- *tier 3:* (They went through my pockets and bagged it all up like evidence. The receipt too. I paid that. That receipt is the only thing in here that says I live somewhere.)

*You fold the receipt very small and push it down inside the cast, against your wrist, where they won’t think to look. It itches straight away. You leave the key; they know where you live anyway.*

#### Spot: The drawer

> Shown when: Misaki in the infirmary, she knows where she is (clarity 2+).

**⟨If k61Rcpt = 'cast'⟩**

> *The bag is still in the drawer, with the key on its frog. The receipt is still inside your cast. You can feel the fold of it every time you bend your wrist.*
>
> **Misaki:** 
> - *tier 0:* (leaving it.)
> - *tier 1:* (could take it out. leaving it.)
> - *tier 2:* (I could take it out now. I’m leaving it where it is.)
> - *tier 3:* (It’s his drawer. It was always his drawer. I could take the receipt out and put it back in the bag. I’m leaving it in the cast. It’s fine where it is.)
>
**⟨Otherwise⟩**

> **⟨If flag k61Rcpt set⟩**
>
> > **Misaki:** 
> > - *tier 0:* (rent’s paid.)
> > - *tier 1:* (rent’s paid til the 1st.)
> > - *tier 2:* (Rent’s paid until the first.)
> > - *tier 3:* (Rent’s paid until the first. I’ve checked four times. It’s still paid.)
> >
> **⟨Otherwise⟩**
>
> > *In the drawer under the bed there is a clear bag with your name on it in fountain pen: the trailer key on its rubber frog, a lip balm with no lid, two hair ties, and his tax history.*
> >
> > *Pressed flat in chapter six is your rent receipt. It has been dried out and flattened under something heavy, and the landlord’s red PAID has run pink at the edges.*
> >
> > **Misaki:** 
> > - *tier 0:* (he kept my receipt.)
> > - *tier 1:* (he dried my receipt. in a BOOK.)
> > - *tier 2:* (He dried my receipt out in a book, under a chapter about land tax.)
> > - *tier 3:* (He pressed my rent receipt like a flower. In chapter six. He must have found it in my jeans and sat there doing that while I was down here thinking he was one of them.)
> >
> > *You read the date three times. The rent’s paid to the end of the month. You lie there working out whether you’ll be out by then, and whether the lot office will take a signature from your right hand. You do the sum twice. You don’t look at the left hand, which is the reason for the sum.*
> >

#### Spot: Hair tie

> Shown when: Misaki in the infirmary, she knows where she is (clarity 2+).

**⟨If flag k61Hair set⟩**

> **Misaki:** 
> - *if k61Hair = 'v'; tier 0:* (still up.)
> - *if k61Hair = 'v'; tier 1:* (still up. too tight. not touching it.)
> - *if k61Hair = 'v'; tier 2:* (It’s still up. Too tight. I’m not touching it.)
> - *if k61Hair = 'v'; tier 3:* (It’s still up, too tight, and I’m not touching it. He did it like a stitch.)
> - *otherwise; tier 0:* (it’s just hair.)
> - *otherwise; tier 1:* (it’s just hair.)
> - *otherwise; tier 2:* (It’s just hair.)
> - *otherwise; tier 3:* (It’s just hair. Everybody has hair in their face sometimes.)
>
**⟨Otherwise⟩**

> **Misaki — choice:** *(Your hair is in your eyes. You have put it up before every job for years, one twist and the tie, in two seconds, usually in the dark.)*
>
> ▸ **Do it one-handed.**
>
> > *You get the twist. The tie is the problem. You try it with your teeth, and it snaps back against your lip, and the next go pulls at the stitches over your ear until your eyes water.*
> >
> > *It takes forty minutes. In the end it is up, crooked, with a piece hanging over the stitches. You don’t take it down for two days, because you don’t know if you could do it again.*
> >
> > **Misaki:** 
> > - *tier 0:* (done.)
> > - *tier 1:* (done. fine. it’s fine.)
> > - *tier 2:* (Done. It’s fine.)
> > - *tier 3:* (Done. It took forty minutes and it looks like I did it in a car, and it’s fine.)
> >
> ▸ **Leave it down.**
>
> > 
> > - *if k61Rcpt = 'cast':* *You leave it. It hangs in the soup. You keep pushing it back with the cast, where the receipt is, and it keeps coming down, and you keep pushing it back.*
> > - *otherwise:* *You leave it. It hangs in the soup. You keep pushing it back with the back of your right wrist, and it keeps coming down, and you keep pushing it back.*
> >
> ▸ **Ask V. He’s the only one allowed behind you.** — *(you can’t make yourself / )* `greyed out when closeness tier below 2`
>
> > *He stands where you can see him in the mirror. He has never put up anybody’s hair in his life, and he does it the way he would tie off a suture, slowly and much too tight.*
> >
> > *It pulls on the stitches. You don’t tell him, because he is concentrating so hard that he has forgotten to breathe.*
> >
> > **Misaki:** 
> > - *tier 0:* ...thx.
> > - *tier 1:* thanks. never touch my hair again.
> > - *tier 2:* Thank you. Never touch my hair again.
> > - *tier 3:* It’s perfect. Thank you. Never touch my hair again as long as you live.
> >
> > **V:** Noted.
> >
> ▸ **Not now**
>

#### Spot: The things by the door

> Shown when: Misaki in the infirmary, she knows where she is (clarity 2+), infirmary day 2+.

*When you open the door a hand’s width, there is a pile on the corridor floor that was not there last night: your hoodie, the Switch, Prickles in his pot, the frog sock the pale hound didn’t eat, your rifle-cleaning kit in its tin, a box of your cereal and the pillow from your side of his bed.*

*Yesterday he asked through the door what you needed, and you said nothing, you were good. He has brought everything he could think of and gone away again, so that you won’t have to say thank you.*

**Misaki — choice:** *(It’s all your stuff.)*

▸ **Take it all in.**

> *It takes six trips in the boot. You line it all up along the wall in the order it was in the corridor, and put Prickles where the light-well lands at eleven.*
>
> **Misaki:** 
> - *tier 0:* (ok. ok.)
> - *tier 1:* (ok. it’s my stuff. ok.)
> - *tier 2:* (It’s my stuff. Okay.)
> - *tier 3:* (It’s all my stuff. He carried my cactus down four floors. Okay. I’m sleeping on my own pillow.)
>
▸ **Take the cleaning kit. Only that.**

> *You take the tin and shut the door. You strip the kit down on the blanket and clean all of it, the rods and the brushes and the jag and the little bottle of oil, with your right hand and your teeth.*
>
> *There is no rifle. You clean the kit anyway, for an hour, because your hands want a job they already know.*
>
> *Later you hear him come back down the corridor and stop at the pile, and pick it up one piece at a time, and carry it away.*
>
▸ **Leave all of it there.**

> *You shut the door. In the morning the pile is still there. Somebody has turned Prickles so that his good side faces the door.*
>

#### Spot: A black bag on the chair

> Shown when: Misaki in the infirmary, she knows where she is (clarity 2+), full-story setting.

*The doctor has left her black bag on the chair by the sink. A folding ruler sticks out of the side pocket, and there is a clip of small white cards, each with the same date written on it in her hand: the night you came in.*

*You have seen photographs with a ruler and a date in the corner before. They were never of anything good.*

**Misaki — choice:** *(The bag.)*

▸ **Ask her what the photographs were for.** — *(she is not going to)* `always greyed out`

▸ **Turn the chair to face the wall.**

> *You turn the chair round so the bag faces the wall. Then you lie down facing the other way, and all afternoon you know exactly which way the bag is facing.*
>
> **Misaki:** 
> - *tier 0:* (clutter.)
> - *tier 1:* (it’s clutter. i hate clutter.)
> - *tier 2:* (It’s clutter. I don’t like clutter where I sleep.)
> - *tier 3:* (It’s the doctor’s stuff, and it’s untidy, and I don’t like clutter in a room I’m sleeping in. That’s all it is.)
>
▸ **Tell V to move it. It’s untidy.**

> **Misaki:** 
> - *tier 0:* her bag’s in the way.
> - *tier 1:* the doctor left her bag. it’s in the way.
> - *tier 2:* The doctor left her bag. It’s in the way.
> - *tier 3:* The doctor left her bag on the chair. It’s really in the way, V. I can’t sleep with clutter, you know I can’t.
>
> **V:** I will take it upstairs.
>
> *He comes in and picks it up without looking at it or at you, and carries it out by the handle, at arm’s length, the way he would carry something for a hound that has to go to the vet. Neither of you mentions the side pocket.*
>

#### Afternoons, clear

> Misaki POV, infirmary, once she knows the room and the shatter has happened: one scene each afternoon.

*At nine your phone goes off on the blanket, very loud: the alarm you set months ago. WATER PRICKLES (every other sun, NOT MORE).*

*You lie there and look at it. It is Sunday. Across the city a cactus on a trailer windowsill is due a quarter of a cup of water, and nobody is home to give it to him.*

**Misaki:** 
- *tier 0:* (prickles.)
- *tier 1:* (prickles. shit. it’s sunday.)
- *tier 2:* (Prickles. It’s Sunday. He’s due.)
- *tier 3:* (It’s Sunday and Prickles is due. That’s my job. I’m in charge of exactly one living thing, and it’s a cactus, and I’m in a basement with a broken hand.)

**Misaki — choice:** *(The alarm.)*

▸ **Text V: “prickles is due”**

> *You text it to the man on the other side of the door. The answer comes after a minute.*
>
> **V:** I watered him last Sunday, a week early. I apologise. I did not know what else to do with him. He looks well. I have set an alarm.
>
> *You turn your alarm off. Then you turn it back on, because it is yours, and set it again for every other Sunday, and lie with the phone on your chest until the soup comes.*
>
▸ **Snooze it.**

> *You snooze it. It goes off again at nine minutes past, and at eighteen minutes past, and every nine minutes after that, all morning.*
>
> *You could turn it off with one thumb. You keep not turning it off.*
>
**⟨If full-story setting⟩**

> *You run your tongue along your teeth while you eat the soup, the way you’d run a thumb along a blade. On the left, at the back, there is a gap where two teeth should be. The gum is sore and new.*
>
> *You think about it for a second and decide it has always been like that. You chew on the right, like you always have.*
>
> **Misaki:** 
> - *tier 0:* (always been like that.)
> - *tier 1:* (always been like that. i’d know.)
> - *tier 2:* (It’s always been like that. I’d know. They’re my teeth.)
> - *tier 3:* (It’s always been like that. I’d know. They’re my teeth, I’ve had them my whole life, I know what’s in my own mouth.)
>
> *The chart at the end of the bed says something else, in fountain pen. You don’t go and read it again.*
>
**⟨Otherwise (injuries-only setting)⟩**

> *You run your tongue along your teeth while you eat the soup. Two are gone on the left at the back, this week’s, the gum still sore.*
>
> *Further back on the right there is another gap, smooth and closed over a long time ago. You have had it for as long as you have had a tongue to find it with. You don’t know who took that one either.*
>
> **Misaki:** 
> - *tier 0:* (2 new 1 old.)
> - *tier 1:* (two new, one old. old one healed nice.)
> - *tier 2:* (Two new, one old. The old one healed nicely.)
> - *tier 3:* (Two new, one old. The old one’s healed lovely. Give these a few years and you won’t be able to tell them apart.)
>
> *You chew in the middle, the way you did when you were small, and you notice that you still know how.*
>

#### The bin

> Misaki POV: the bin, right after the morning shatter (normal stays only).

*The first thing you do, now that it is a room, is the first thing you would do in any room. You look in the bin.*

- *if `n>1`:* *There are soup tubs in it. [number, in words] of them, full, with the lids on, cold. Every lid has a day written on it in fountain pen, in order.*
- *otherwise:* *There are soup tubs in it. [number, in words], full, with the lid on, cold. Every lid has a day written on it in fountain pen, in order.*

*He made it every day and you wouldn’t touch it, and every evening he took the full tub away without a word and made another.*

**Misaki:** 
- *tier 0:* (he kept making it.)
- *tier 1:* (he just kept making it.)
- *tier 2:* (He just kept making it, and throwing it away, and making it.)
- *tier 3:* (He just kept making it. Every day. He kept making it and throwing it out and making it again, and he never once said eat.)

**Misaki — choice:** *(Today’s is on the tray.)*

▸ **Eat today’s.**

> *It has gone cold while you stood at the bin. You eat all of it, cold, standing up, with the spoon in your right fist.*
>
▸ **Take the lids out of the bin.**

> *You fish the lids out and wipe them on the sheet, one at a time, and stack them under your pillow in order, because you want to have them.*
>

### 3.2 The infirmary phone threads

#### Thread: Misaki and V (tx\_kd\_help)

> Plays when: during the infirmary stay, infirmary day 2+, clarity under 3.

`message start`

**V:** Misaki. You have your telephone back.

**V:** Where do you believe you are?

▸ **Misaki:** **“don’t come. room w a bulb. they moved me”**

> **V:** You are on sublevel two of my house. I am four metres from you, on the other side of that door.
>
> **V:** I am going to knock twice.
>
> **V:** (two knocks, from the door)
>
> <small>→ goes to “two”</small>
>
▸ **Misaki:** **“who is this”**

> **V:** It is V. You have this number saved as “tall problem.” I have seen your telephone.
>
> <small>→ goes to “two”</small>
>
▸ **Misaki:** **[Don’t answer. It’s a trick.]**

> **V:** I will ask again in an hour. I will ask every hour.
>
`message two`

**V:** The door is not locked. Open it or leave it shut. I will be here in either case.

▸ **Misaki:** **“prove it. what’s my cactus called”**

> **V:** Prickles. He is on your windowsill, and I have not watered him.
>
▸ **Misaki:** **“ok”**

> **V:** Good. Eat the soup. I made it, and I watched myself make it.
>

#### Thread: V and Misaki (tx\_kd\_mdoor)

> Plays when: during the infirmary stay, infirmary day 2+, clarity under 3.

`message start`

**V:** im in another one. room, bulb, needle in my hand

**Misaki:** dont come. its what they want. just telling u so u know i didnt leave on purpose

▸ **V:** **“You are in my house. Sublevel two.”**

> **Misaki:** thats what theyd say
>
> <small>→ goes to “knock”</small>
>
▸ **V:** **“Describe the door.”**

> **Misaki:** grey. no handle i can see. theres a guy outside it, i can hear him breathe
>
> <small>→ goes to “knock”</small>
>
`message knock`

**Misaki:** if ur really V whats seven down

▸ **V:** **“I do not know. I have left it blank on purpose.”**

> **Misaki:** only V would say that like its a flex
>
> **Misaki:** ok its u
>
> **Misaki:** theres a handle isnt there. theres been a handle the whole time
>
▸ **V:** **“I am the one breathing. I will knock twice.”**

> **Misaki:** (two knocks)
>
> **Misaki:** ...ok. dont come in yet. but dont go
>

#### Thread: Misaki and Angel (tx\_kd\_selfie)

> Plays when: (during the infirmary stay, infirmary day 2+ or after discharge from the infirmary), Angel friendship 1+. Full-story setting only (cut from injuries-only).

`message start`

**Angel:** proof of life. selfie. NOW

▸ **Misaki:** **[Send one. Thumbs up.]**

> **Angel:** (typing for four minutes)
>
> **Angel:** cute. who did the eye. asking for a friend. the friend is a shotgun
>
> **Angel:** i’m coming over. don’t look in any mirrors til i get there. i’m bringing the BIG palette and i need u to not ask why
>
▸ **Misaki:** **“i look fine, i’ll send one later”**

> **Angel:** V told me about the hand
>
> **Angel:** u don’t have to send one. i’m coming anyway. i just wanted to hear u say “fine” so i could be mad at somebody
>

#### Thread: Misaki and Ronin (tx\_kd\_rvis)

> Plays when: (during the infirmary stay, infirmary day 2+ or after discharge from the infirmary), Ronin friendship 1+.

`message start`

**Ronin:** came by Vee’s basement hospital. you were out cold

**Ronin:** left you a thing on the chair. don’t make it weird

▸ **Misaki:** **“why didn’t u wake me”**

> **Ronin:** ’cause you looked like somethin’ I’d leave in a ditch. I’m the one who makes people look like that. didn’t care for seein’ it on you
>
> **Ronin:** had t’go stand in the yard a minute. Vee’s hounds came and stood with me. fuckin’ embarrassing
>
▸ **Misaki:** **“i look FINE”**

> **Ronin:** sure. yeah. you look fine
>
> **Ronin:** (nothing for six minutes)
>
> **Ronin:** whoever did the hand is mine t’kill. tell Vee I called it
>

#### Thread: V and Angel (tx\_kd\_adoc)

> Plays when: (during the infirmary stay or after discharge from the infirmary), Angel friendship 1+. Full-story setting only (cut from injuries-only).

`message start`

**Angel:** how bad. and don’t do the calm voice in text, i can hear it

▸ **V:** **“The left hand, twice. Three ribs. The foot. Seven kilograms.”**

> **Angel:** ok
>
> **Angel:** ok. i’m outside ur gate. i have the big makeup case and the shotgun and i don’t know yet which one i need
>
> **Angel:** she’s going to say she’s fine, isn’t she
>
> <small>→ goes to “fine”</small>
>
▸ **V:** **“She is alive.”**

> **Angel:** that’s not what i asked and u know it
>
> **Angel:** i’m outside ur gate. open it
>
> <small>→ goes to “fine”</small>
>
`message fine`

**Angel:** when she says she’s fine. do we tell her?

▸ **V:** **“We answer what she asks. Nothing she has not asked.”**

> **Angel:** ok. i can do that. i’ll do her eyebrows and say nothing. i’m so good at saying nothing
>
▸ **V:** **“She should be told.”**

> **Angel:** then u do it. i’ll hold the hand that isn’t in a cast
>

#### Thread: V and Ronin (tx\_kd\_rhand)

> Plays when: (during the infirmary stay or after discharge from the infirmary), Ronin friendship 1+.

`message start`

**Ronin:** which one did the hand

▸ **V:** **“The man with the radio stood on it. It was already broken.”**

> **Ronin:** mine
>
> **Ronin:** you get the rest. that one’s mine t’kill. I’m askin’ nice
>
▸ **V:** **“She does not know that it is broken.”**

> **Ronin:** ...the fuck d’you mean she don’t know
>
> **Ronin:** (typing for a long time)
>
> **Ronin:** okay. then nobody tells her it was him. she finds out when he’s already in my freezer
>

### 3.3 V’s side of the stay

> V POV.

#### Sublevel two (V’s menu)

> V POV: the side-menu entry while she is in the infirmary.

`h` Sublevel two

▸ **The infirmary** — *(done today / costs time · sit with her)* `greyed out when it is too late in the day or already done today`

#### Sit with her

> V POV: “The infirmary” (sit with her), once a day.

*She is asleep, or pretending to be. The chart on the end of the bed runs to two pages.*

**V — choice:** *(He has read it eleven times.)*

▸ **Sit on the floor outside the door.**

> *He sits where she will hear a person breathing and not have to see one. The old hound lies down across his shins.*
>
▸ **Read to her through the door.**

> **V:** Chapter four. The land tax reform of 1873.
>
> *After twenty minutes something hits the inside of the door, lightly. It is a foam ball. He takes it for a request to continue.*
>
▸ **Go in and sit by the bed.**

> **⟨If clarity under 2⟩**
>
> > *She has the soup tray up edge-out before he is through the door, in the hand that works.*
> >
> > **V:** (I am the guard. Of course I am. I am the right height.)
> >
> > *He backs out and shuts the door, and sits down against it.*
> >
> **⟨Otherwise⟩**
>
> > *She moves her feet to make room on the bed for a hound, and then a little more room than a hound needs.*
> >
> > **Misaki:** 
> > - *tier 0:* hi.
> > - *tier 1:* hi. i’m fine btw.
> > - *tier 2:* Hi. I’m fine, by the way.
> > - *tier 3:* Hi. I’m fine, before you ask. Stop looking at my hand like that, it’s a hand.
> >

#### Sit with her: three more

> V POV: three more ways to sit with her (Persuasion; changing the dressings; the list of things he didn’t do in time).

*She knows him now, mostly. He sits on the chair by the door rather than the floor, and she watches him decide that, and nods once, which is permission.*

**Misaki:** 
- *tier 0:* read me something.
- *tier 1:* read me something. not tax.
- *tier 2:* Read me something. Not tax.
- *tier 3:* Read me something. Anything but tax. I swear to God, if I hear the word “assessment” again I’m going to climb out the light-well.

*He reads her the only other book he has in his coat, which is Persuasion. She is asleep by chapter two. He keeps reading to the end of chapter three in case stopping wakes her.*

*He changes the wrist dressings with her awake, for the first time. She watches every movement. He narrates each one before he makes it, the way you would for an animal that has been hurt by people.*

**V:** I am going to lift the tape now. This will pull. I am going to clean it with saline. That will sting for four seconds. One. Two. Three. Four.

**Misaki:** 
- *tier 0:* ...u counted.
- *tier 1:* u counted for me.
- *tier 2:* You counted. For me.
- *tier 3:* You counted the four seconds out loud. I always have to do my own counting.

**V:** You may do mine, then, when it is my turn.

*She laughs, and then she doesn’t, and then she lets him finish. When he’s done she doesn’t let go of his sleeve for a while, and he doesn’t ask her to.*

*She is asleep. He isn’t needed. He stays anyway, because he cannot think of anywhere in the house that would be bearable instead.*

*He makes a list, in the notebook where he keeps her quotes, of things he did not do in time. It is long. It is precise. Every item has a date and an hour.*

*At the bottom he writes the one thing he did in time, which is carry her up the river stairs. Then he crosses out the whole list above it, line by line, because she would hate it, and she would be right.*

#### The kennel corridor (menu)

> V POV, infirmary: the side-menu entry for the kennel corridor at night.

▸ **The kennel corridor, at night** — *(done today / costs time · outside the door marked LAUNDRY)* `greyed out when it is too late in the day or already done today`

#### The kennel corridor, at night

> V POV, infirmary: the kennel corridor at night (Ronin and Angel with a bottle), one per night.

*Midnight. Ronin and Angel come down the kennel stairs with a bottle and sit on the corridor floor beside him, opposite the door that says LAUNDRY.*

**Ronin:** Forty-eight hours, we said. Then move on.

**Angel:** we did say that

**V:** We did.

*Nobody gets up. The bottle goes round. On the other side of the door Misaki turns over, and all three of them stop to listen until she settles.*

**Ronin:** Anyway. Rule’s for when you’re dead. She ain’t dead. Technicality.

**Angel:** technicality. yeah

*At six they are still there, Angel asleep on Ronin’s shoulder and the crowbar across his knees. V steps over his legs to put the kettle on.*

**⟨If full-story setting⟩**

> *At four in the morning the shower in the infirmary runs. It runs for forty minutes.*
>
> *He does not knock. He goes to the boiler room and turns the hot water up as far as it will go, so that it will not run cold on her, and sits on the floor by the boiler until he hears the water stop.*
>
> **V:** (If I ask, she will tell me it is the cell she is washing off. So I do not ask.)
>
> *The next night it runs for an hour. He turns the boiler up again, and does not write it in the ledger.*
>
**⟨Otherwise (injuries-only setting)⟩**

> *At three he hears tape tear on the other side of the door, one strip and then another. She is changing her own wrist dressings in the dark.*
>
> *He listens to her do it. She is faster than the doctor, in the right order, and she makes no sound at all when the saline goes on.*
>
> **V:** (Somebody taught her this. Or nobody did, and she learned it alone, which is worse.)
>
> *In the morning the old dressings are in the bin, folded very small, the way a person folds them who has always had to hide them.*
>
**⟨If worst stay (severity 8+, not reasoned out)⟩**

> *Two in the morning. Through the door, she starts talking to the tall one, which she has never done before.*
>
> **Misaki:** You can stop waiting for somebody to come for me. Nobody’s coming. We have a rule.
>
> **Misaki:** Forty-eight hours, then you move on. It’s a good rule. I voted for it. So did he. They’ll have done my list by now. You should tell your boss not to expect anybody.
>
> *He sits on the other side of the door and listens to the rule he voted for explained to him, kindly, as the reason he is not there.*
>
> *He says “I see” in the tall one’s voice, because it is the only voice she will answer. She says “yeah,” and turns over.*
>
**⟨Otherwise⟩**

> *At two in the morning she talks in her sleep, clear as anything.*
>
> **Misaki:** Rifle to Angel. Truck and the chainsaw to Ronin. Prickles to V. The clips in the bin.
>
> *She says it twice, the way she goes over a list before a job. Then she says “forty-eight hours” and is quiet.*
>
> *He sits with his back to the door until the boiler comes on at six. Then he goes upstairs and moves Prickles to the kitchen windowsill, where she will see him when she comes up.*
>

#### V’s infirmary menu (kc61)

> V POV, infirmary: the side-menu entries for the scenes above.

**⟨If `n<KD61_THINGS.length`⟩**

> ▸ **Her things, from the river** — *(done today / costs time · what came back with her)* `greyed out when it is too late in the day or already done today`
>
**⟨If (an internal state check passes)⟩**

> ▸ **Her file** — *(done today / costs time · in his study)* `greyed out when it is too late in the day or already done today`
>
**⟨If `(S.kd.med.clar||0)>=2`⟩**

> ▸ **Ask what she needs** — *(done today / costs time · through the door)* `greyed out when it is too late in the day or already done today`
>
> > **V — choice:** *(The rest of it is still on the floor.)*
> >
> > ▸ **Carry it all back upstairs.**
> >
> > > *He carries it back one thing at a time and puts every piece exactly where she left it, so that the house will be the same when she comes up.*
> > >
> > ▸ **Leave it where it is.**
> >
> > > *He leaves it. In the morning nothing has moved, except that Prickles has been turned in the night so that his good side faces the door.*
> > >

#### Her things, from the river

> V POV, infirmary: “Her things, from the river”, three days.

*One trainer came back with her, the left. The right was never found. There is river water in it, a stone in the toe, something from the cell floor dried into the laces, and her name in biro inside the tongue, the way a child’s shoes are labelled for school.*

*He washes it in the kennel sink with the hounds’ brush and dries it on the boiler.*

*Then he stands in the hall holding one clean shoe and finds that he does not know where it goes. In the end he puts it by the front door beside his own, where she kicks hers off when she comes in, and lines it up straight.*

**V:** (She will want the other one. I will go back to the river on Thursday and look again.)

*In her back pocket, the rent receipt, soaked through. The landlord’s PAID has run pink across the paper.*

*He lays it flat in his tax history at chapter six and puts the book under a sack of hound food in the kennel room. The key is on a ring with a rubber frog. He washes the frog.*

*Two days later he takes the receipt out, dry and flat, and reads it. Rent paid to the end of the month. She paid it two days before the van. She texted him about it at the time, in capitals.*

**V:** (The rent is due on the first. She will ask about the rent before she asks about her hand. I would put money on it.)

*Her phone is in his inside pocket. At nine on Sunday it goes off against his ribs: WATER PRICKLES (every other sun, NOT MORE).*

*He cannot unlock it and does not know how to stop it. It goes off every nine minutes until ten while he sits on the floor outside her door.*

*At noon he drives to the trailer and gives the cactus a quarter of a cup of water, measured. Her kettle still has water in it from the morning of the van.*

*He pours it out. Then he stands there holding the empty kettle and cannot think why he did that, and fills it again, and leaves it on the hob for her.*

#### Her file

> V POV, infirmary: “Her file” (once). Full story: the sealed envelope. Injuries only: the kennel scale.

**⟨If full-story setting⟩**

> *The doctor has left the file on his desk. He has read every page of it eleven times: the hand, the ribs, the foot, the wrists.*
>
> *At the back there is a brown envelope, sealed and numbered in the corner, with a strip across the flap that says DO NOT SHOW PATIENT.*
>
> *He leaves it sealed. He puts it in the safe behind the vaccination records, face down, turns the dial, and stands with his hand flat on the safe door for some time.*
>
> **V:** (It is hers. If she ever wants it, it will be here. She will not want it. It will be here.)
>
**⟨Otherwise (injuries-only setting)⟩**

> *He weighs her on the scale in the kennel room, because it is the only scale in the house. He weighs the hounds on it at five every morning.*
>
> *She stands on it in his shirt and the boot, holding the rail, and reads the number before he can.*
>
> **Misaki:** 
> - *tier 0:* winter weight.
> - *tier 1:* winter weight. been lighter.
> - *tier 2:* Winter weight. I’ve been lighter than that.
> - *tier 3:* Winter weight. Don’t write it down like that, I’ve been way lighter. At eleven I was twenty-six kilos. I remember because somebody weighed me for something.
>
> **V:** Who weighed you?
>
> **Misaki:** 
> - *tier 0:* dunno.
> - *tier 1:* dunno. somebody w a clipboard.
> - *tier 2:* I don’t know. Somebody with a clipboard.
> - *tier 3:* Don’t know. Somebody with a clipboard. It was ages ago. Can I go back to bed?
>
> *She steps off and goes back to bed. He writes the number down. Under it he writes “age 11: 26 kg?”, and looks at it for a long time. The grey hound weighed more than that at six months.*
>

#### Ask what she needs

> V POV, infirmary, once she knows him: “Ask what she needs”.

*He knocks twice and asks, through the door, what she needs.*

**Misaki:** 
- *tier 0:* nothing. i’m good.
- *tier 1:* nothing! i’m good. thx.
- *tier 2:* Nothing. I’m good. Thank you.
- *tier 3:* Nothing, honestly. I’m good. I’ve got soup, I’ve got a light-well. Go to bed, V.

*He asks again in the evening, with the same knock, and gets the same answer in the same cheerful voice.*

*So he makes a list of everything she has ever wanted in his house, which is not long, and brings all of it down and lays it out on the corridor floor: the hoodie, the Switch, Prickles, the other frog sock, the rifle-cleaning kit, the cereal, the pillow from her side of the bed. Then he goes to the far end of the corridor and sits down.*

*After an hour the door opens a hand’s width. One hand comes out and takes the cleaning kit and nothing else, and the door shuts.*

**V:** (She took the only thing on the floor that is for work.)

#### V’s days, clear

> V POV, infirmary, once she knows him: one scene a day.

*She knows him this morning. He can tell from the doorway: she looks at his face first and then at his hands.*

*The first thing she says to him, once she knows who he is, is the message he sent her three times a day for the whole of the time she was gone.*

**Misaki:** 
- *tier 0:* did u eat today.
- *tier 1:* did u eat today.
- *tier 2:* Did you eat today?
- *tier 3:* Did you eat today? Don’t lie. You look like a coat somebody left on a chair.

*He thinks about it honestly. He has had coffee. At four this morning, in the kennel room, he ate half of a hound biscuit without noticing that he was doing it.*

**V:** No.

**Misaki:** 
- *tier 0:* sit.
- *tier 1:* sit down. have my soup.
- *tier 2:* Sit down. You can have half my soup.
- *tier 3:* Then sit down. You can have half of my soup. It’s your soup anyway. Sit.

*He sits on the end of the bed. She pushes the tray at him with her good hand and watches him eat every spoonful, the way he has been watching her not eat for days, and does not say anything about it.*

*She asks for the things from her pockets. He has already given her the phone.*

- *if flag k61VRcpt set:* *He brings the bag, and the tax history. The receipt comes out of chapter six flat and dry, and she reads it all the way through.*
- *otherwise:* *He brings the bag. The receipt is still in it, a soft grey lump, and she unfolds it on her knee one-handed, very slowly, so that it will not tear.*

**Misaki:** 
- *tier 0:* rent’s due the 1st.
- *tier 1:* rent’s due on the 1st. what’s the date.
- *tier 2:* The rent’s due on the first. What’s the date?
- *tier 3:* The rent’s due on the first. What’s today? Don’t do the careful voice, just tell me the date.

*She has a cast to the elbow, two pins through the back of her hand, a boot on her left foot and fourteen stitches in her scalp. She is asking about the rent.*

**V — choice:** *(The rent.)*

▸ **“I have paid it.”**

> **Misaki:** 
> - *tier 0:* u WHAT.
> - *tier 1:* u WHAT. i pay my rent.
> - *tier 2:* You what? I pay my rent.
> - *tier 3:* You what? V. I pay my rent. I’ve paid it every month since I was sixteen. I’ve never been late once. That’s mine.
>
> **V:** Then you may pay me back.
>
> **Misaki:** 
> - *tier 0:* i will.
> - *tier 1:* i will. to the cent.
> - *tier 2:* I will. To the cent.
> - *tier 3:* I will. To the cent. I want a receipt.
>
> *She puts the receipt back in the bag and the bag under her pillow, and turns over, and is angry with him for the rest of the afternoon. It is the best afternoon he has had since the river.*
>
▸ **“It is the twelfth. You have until the first.”**

> **Misaki:** 
> - *tier 0:* til the 1st. ok.
> - *tier 1:* til the 1st. ok. i can sign w my right. right?
> - *tier 2:* The first. I can sign with my right hand, can’t I?
> - *tier 3:* The first. Okay. That’s fine, that’s loads of time. I can sign with my right. I can sign with my right hand, can’t I?
>
> **V:** Yes.
>
> *She practises her signature on the back of a soup label with her right hand for an hour. It looks like a child’s. She keeps going until it looks like hers.*
>

### 3.4 The extended delusion

> Severity 4+ gives one extra day in the cell, 6+ two. On those mornings the room is a cell again, whatever she worked out the day before.

#### A cell again (Misaki)

> Misaki POV, extended delusion (severity 4+ gives one extra day, 6+ two): the morning it is a cell again, three escalating versions.

*You wake up and it is a cell again.*

*You knew yesterday, you’re nearly sure you knew, that it was a room in a house. You remember a handle, and a hound with a seam down her shoulder, and somebody reading about tax law. In the morning the handle isn’t there, and the bulb is, and you can hear the radio down the hall even though there isn’t one.*

*Your wrist has a new dressing on it that you don’t remember being put on. Somebody had their hands on you while you slept. That is the part that makes you sit up with your back to the wall.*

**Misaki:** 
- *tier 0:* (they moved me back.)
- *tier 1:* (they moved me back while i slept. clever.)
- *tier 2:* (They moved me back while I was asleep. That was clever of them.)
- *tier 3:* (They let me think I was out. That’s a technique. I’ve read about it. You let them think they’re out and then you take it back. Okay. I know what this is. I can do this one. I did the other one.)

*The tall one comes in with soup. He kneels down so his face is lower than yours, which none of the others ever did, and that is how you know he’s the clever one.*

*He says your name. He says the date. He says a word that sounds like “hounds.” He says a name that you know is important and can’t place, and every time he says it something in your chest goes tight, and you hate him for knowing it.*

*You count the loops of a jingle that is not playing, and you don’t answer, because that is the rule. Say nothing. They can only take what you say.*

*Third morning in the cell. You have started making a tally on the wall with the edge of a spoon, the way the girl before you did on the cot frame. Three marks.*

*The tall one sees it when he brings the water. He looks at it for a long time. Then he sits down on the floor under it and puts his face in his hands, and stays like that, and doesn’t say anything at all.*

**Misaki:** 
- *tier 0:* (...)
- *tier 1:* (why is HE upset.)
- *tier 2:* (Why is he the one who’s upset?)
- *tier 3:* (Why is the guard upset. Guards don’t get upset. That’s not in the script. Why does he look like that.)

*You don’t ask. It feels like a trap. It also feels like the worst thing you’ve seen in here, and you don’t know why.*

#### She does not know him (V)

> V POV, extended delusion: she does not know him this morning, three escalating versions.

*She does not know him this morning.*

*Yesterday she asked him what seven down was. Today she is under the bed with the tray held edge-out, and when he says her name she counts, under her breath, the loops of a radio that has never been in this house.*

*He changed her dressings at four while she slept, because she would not let him while she was awake. He knows that was a mistake as soon as she wakes and sees them, and goes white, and backs into the corner.*

**V:** (It came back in the night. It will come back again. I am going to be here each time it does, and each time I am going to be one of them.)

*She calls him the tall one. She is polite to him, the way she is polite to landlords and men she is about to kill. She thanks him for the soup and doesn’t eat it.*

*He sits on the floor, lower than her, and reads the tax history aloud through all of it, in the same voice, at the same speed, so that one thing in the room is always the same.*

*Halfway through chapter six she says, to nobody, “there’s a man called V. if he comes looking, he’s not with me. leave him out of it.” She says it to the tall one. She is asking him to protect himself, from himself.*

**V:** (I will.)

*He says it out loud, to the room, and she nods, satisfied, and goes back to counting.*

*There are three scratches on the wall above the bed this morning, made with the edge of a spoon. A tally. She has started counting days in his house as days in that one.*

*He sits down under it. He does not know what to do with his face, so he puts it in his hands.*

*When he looks up she is watching him, from the corner, with an expression he has never seen on her. It takes him a moment to place it. It is pity. She feels sorry for the guard.*

#### Extended-delusion mornings: the choice

> Misaki POV, extended-delusion mornings: count the loops, test the door, or (tier 3 only) look at the guard’s face properly, which breaks it early.

**⟨If Misaki POV⟩**

> **Misaki — choice:** *(The cell.)*
>
> ▸ **Count the loops. Say nothing.**
>
> > *You count to four hundred. Somewhere around three hundred the tall one stops reading and just sits.*
> >
> ▸ **Test the door.**
>
> > *It opens. That is wrong. Doors don’t open. You shut it again, very carefully, and go back to the corner, because an open door is a trick.*
> >
> ▸ **Look at the guard’s face. Properly.** — *(you can’t make yourself / )* `greyed out when closeness tier below 3`
>
> > *You make yourself look at him. Properly, the whole face, the way you look down a scope.*
> >
> > *The coat. The glasses he’s forgotten are on his head. A dog hair on his collar, grey, from the grey one.*
> >
> > **Misaki:** 
> > - *tier 0:* ...V?
> > - *tier 1:* ...V? it’s u. it’s been u.
> > - *tier 2:* V? It’s you. It’s been you the whole time.
> > - *tier 3:* V. It’s you. It’s been you. I’ve been calling you the tall one for— how long have I been calling you that?
> >
> > **V:** Two days. You may call me anything you like.
> >
**⟨Otherwise (V POV)⟩**

> **V — choice:** *(She is under the bed.)*
>
> ▸ **Read to her. The same book, the same page.**
>
> > *He reads. She does not come out. At the end of the chapter her hand comes out from under the bed and stays there, flat on the floor, palm down, where he can see it.*
> >
> ▸ **Let the grey hound in.**
>
> > *The grey hound walks in, lies down beside the bed, and puts her chin on the floor next to the tray. After an hour the tray goes down. After two, a hand comes out and rests on the hound’s neck.*
> >
> ▸ **Leave the door open and go.**
>
> > *He leaves it open. When he comes back at noon it is shut again, from the inside, and the tray is against it.*
> >

#### Spot: Tray (extended delusion)

> Shown when: This infirmary spot on an extended-delusion morning (it is a cell again)..

*Soup, still warm. The tall one made it. You watched him through the gap in the door making it in a kitchen you can’t see, which means there’s a kitchen, which means it’s a house, which means—*

**Misaki:** (no. that’s what they want. eat it and you start believing the kitchen.)

*You don’t eat it. Your stomach makes a noise loud enough that the hound outside the door lifts her head.*

#### Spot: Door (extended delusion)

> Shown when: This infirmary spot on an extended-delusion morning (it is a cell again)..

**Misaki — choice:** *(Somebody is breathing on the other side. Low down. Sitting on the floor.)*

▸ **Listen.**

> *The breathing is very even. Under it, a page turns. Then a voice, not to you, to something big that sighs: “Yes. I know. She will come out when she is ready.”*
>
> **Misaki:** (he talks to the dog like it’s a person. ...who does that. who’s that soft with a dog in a place like this.)
>
▸ **Go. Now, while you can stand.** — *(stealth)*

▸ **Not yet**

#### Spot: Cot (extended delusion)

> Shown when: This infirmary spot on an extended-delusion morning (it is a cell again)..

**Misaki — choice:** 
- *if `KD().med.xd>1`:* *(Three marks on the wall above it. Yours.)*
- *otherwise:* *(If you sleep, they come while you’re under.)*

▸ **Sleep** — *(ends the day)*

▸ **Not yet**

#### On the stairs

> Misaki POV: on the stairs out after an extended stay.

**⟨If `k`, `k.med`, `!m.ext`, `m.sev>=4`, `m.d+1>=3`, `!m.stairs`⟩**

> **⟨If Misaki POV⟩**
>
> > *On the stairs, with his hand under your elbow, you stop.*
> >
> > **Misaki:** 
> > - *tier 0:* how many days.
> > - *tier 1:* how many days did i think i was there.
> > - *tier 2:* How many days did I think I was still there?
> > - *tier 3:* How many days. In there. How many days did I think you were one of them? Don’t round it.
> >
> > **V:** [number]. You knew me for part of the first.
> >
> > **Misaki:** 
> > - *tier 0:* ...sorry.
> > - *tier 1:* i called u the tall one. sorry.
> > - *tier 2:* I called you the tall one. I’m sorry.
> > - *tier 3:* I called you the tall one. I didn’t eat your soup. I told you to keep V away from me, to your face. I’m— fuck. I’m so sorry.
> >
> > **V:** You were polite to me throughout. You are polite to men you are about to kill. I have decided to take it as a compliment.
> >
> > *You laugh, and it hurts your ribs, and you keep laughing anyway because the alternative is the other thing, and he stands one step below you so his face is lower than yours until you’re done.*
> >
> **⟨Otherwise (V POV)⟩**
>
> > *On the stairs she stops and asks how many days she thought she was still there. He tells her the real number.*
> >
> > **Misaki:** 
> > - *tier 0:* ...sorry.
> > - *tier 1:* i called u the tall one. sorry.
> > - *tier 2:* I called you the tall one. I’m sorry.
> > - *tier 3:* I called you the tall one. I told you to keep yourself away from me. I didn’t eat your soup for two days. I’m so sorry, V.
> >
> > **V:** You were polite to me throughout. You are polite to men you are about to kill. I took it as a compliment.
> >
> > *She laughs, and it hurts her ribs, and she keeps going. He stands one step below her until she is done. He will remember the scratches on the wall for the rest of his life, and he does not tell her that.*
> >

#### Afternoons, extended (Misaki)

> Misaki POV, extended delusion (not the worst route): one scene each afternoon.

*They have started bringing the water in a mug instead of the paper cup. It is a green mug with a chip in the rim.*

*You know this mug. You have drunk out of a mug like this every morning for a year, at an island in a kitchen, with a hound’s chin on your foot. You can’t remember which side the chip was on in that kitchen.*

**Misaki:** 
- *tier 0:* (which side.)
- *tier 1:* (which side was it. left. right. which side.)
- *tier 2:* (Which side was the chip on? Left? Which side?)
- *tier 3:* (Which side was it on. I drank out of it every single day. Left. Right. I had it every morning and I can’t remember which side.)

*You turn it round and round, and you can’t remember, and you cry for the first time since the van, face to the wall so the tall one won’t hear.*

*(When you drink, your mouth goes to the side without the chip.)*

*You go through it all again, so that they can’t have it. The trailer is lot fourteen. Rent is due on the first. Prickles gets a quarter of a cup every other Sunday. The hounds, by colour: grey, old, black, pale. V takes his tea with nothing in it.*

*You get to the end and start again, and the second time round you can’t remember the lot number. Fourteen, or forty.*

**Misaki:** 
- *tier 0:* (14. or 40.)
- *tier 1:* (fourteen. or forty. it’s fourteen. is it.)
- *tier 2:* (Fourteen. Or forty. It’s fourteen. Isn’t it?)
- *tier 3:* (Fourteen. It’s fourteen. It’s forty. I’ve lived there for years, I’ve given that number to a hundred delivery men, it’s— which is it.)

*You start counting up from one, under your breath, to see which number looks like home. On the other side of the door somebody says “fourteen,” and you stop, and don’t trust it, and start again from one.*

#### Extended (V)

> V POV, extended delusion: one scene a day.

*He brings her water in her own mug, the green one with the chip, because she has not drunk from the paper cup in two days and he has run out of other ideas.*

*She waits until he has gone before she touches the tray, as she does with everything. He watches through the gap in the door.*

*She turns the mug round in her hands for a long time. Then she drinks, and her mouth goes to the left, the side without the chip, the way it has every morning for a year at his island.*

**V:** (She thinks that I am the guard, and she drinks from the left side of my cup.)

*He sits down on the floor outside the door with the other green mug, the one with no chip, and drinks from the left as well, so that it will be the same.*

### 3.5 The file: V read as one of them

> While she believes the room is a cell, every true thing about V (his steps, his hands, his coat, his kindness) is read as a captor’s technique, and she keeps a file on him that she can watch herself writing and cannot stop. Both POVs.

#### The file on him

> Misaki POV, while the infirmary is a cell: the spot “Listen for the tall one”, once per time of day, gives one of these four entries of her file on him.

*You lie with your ear to the lino by the door. He comes nine steps from the stairs, heel first, heavy, so that you hear every one.*

*Then you hear nine more, and he isn’t there. The boiler does nine. Your own pulse in the ear on the floor does nine. By the afternoon you can’t say which of the steps were him and which your head made, and you count all of them anyway.*

**Misaki:** 
- *tier 0:* (9. 9. 9.)
- *tier 1:* (nine. that was real. that one was real.)
- *tier 2:* (Nine. That was real. I think that one was real.)
- *tier 3:* (Nine. That was him. That was the boiler. That was him. I can hear it doing this. I can hear my head make up a man on the stairs and I still have to count him.)

`prompt` (Nine.)

▸ **Count again from one.**

> *You count again from one. You get to nine, and start again, because you weren’t sure about the fourth.*
>
▸ **Decide which ones were real.**

> 
> - *if k58Stair = 'his':* *You try. What comes back instead is a back stair in a house, and a man putting his weight on the seventh tread at night because you asked him to. You put that in the file as well: they must have studied him.*
> - *otherwise:* *You try. What comes back instead is a back stair in a house, and a man coming up it heel first at night so as not to frighten anybody. You put that in the file as well: they must have studied him.*
>
*When the tray comes your right hand goes to the edge of it and closes, and stays closed after he has gone.*

- *if full-story setting:* *You watch hands now. You have a reason, and you have filed the reason with the hours that are gone, where you don’t have to look at it.*
- *otherwise:* *You watch hands now. Hands are what break things. Yours has been broken three times, and the hand knows that better than you do.*

*Your face is fine the whole time. You check it in the dark of the window: bored, a bit tired. Your knuckles have gone white on the tray.*

`prompt` (Your hand.)

Let go of the tray.

your hand won’t open

▸ **Wait for it to open on its own.**

> *It takes twenty minutes. You talk to it the whole time, very reasonably, like a hound on a ledge, and when it opens you put it under your thigh so it can’t do it again.*
>
▸ **Open it with the other hand, one finger at a time.**

> *The left is in a cast, so you do it with your teeth and the cast. Four fingers. The thumb last. It hurts in a way you decide not to have noticed.*
>
*He kneels to put the water down and you get the smell of him: hound and coffee, laundry soap, ink. A coat on a hook by a back door.*

*Your head goes straight past “that’s V” to the next thing, the way it always goes now. If they have his coat, they took it off him. You see where. A metal table in the other building, and his hands under the straps.*

*You don’t want the picture. It plays anyway, all the way through, in colour, while you sit on the cot and say “thanks” to the guard about the water in a perfectly ordinary voice.*

`prompt` (The picture.)

▸ **Count the hounds until it goes.**

> **Misaki:** 
> - *tier 0:* (grey old black pale.)
> - *tier 1:* (grey. old. black. pale. again.)
> - *tier 2:* (Grey, old, black, pale. Again. From the grey one.)
> - *tier 3:* (Grey, old, black, pale. Again. Grey, old, black, pale. Don’t look at the table. Grey.)
>
> *It goes on the fortieth time round. It comes back at two in the morning, at the same place, with the radio.*
>
▸ **Let it play to the end.**

> *You let it. It has an end, and you see the end, and afterwards you lie very flat and breathe through your mouth until the guard has gone.*
>
> **Misaki:** 
> - *tier 0:* (not real.)
> - *tier 1:* (not real. it’s not real. i made it.)
> - *tier 2:* (It isn’t real. I made it up. I know I made it up.)
> - *tier 3:* (I made that up. My head made that, by itself, and showed it to me. Knowing that doesn’t do anything at all.)
>
*At four in the morning you notice that you have been writing a file on the tall one in your head for hours, instead of sleeping. His steps are in it, and his hands, and the coat, and that he never raises his voice and says “I apologise” to the tape on your hand.*

- *if flag kdThanks set:* *Every set has one of these. In the other place it was the one who brought the water. You said thanks through the slot and you started keeping him, and the file says that was how they got in.*
- *otherwise:* *Every set has one of these. In the other place it was the one who brought the water, who never once looked at you. The file says that is how they get in: you like one of them.*

*You can see your head doing this. You can see it the way you would watch somebody else do it, from up near the light: a girl on a cot, eyes open, adding to a list about a man who brings soup. It doesn’t stop when you see it.*

**Misaki:** 
- *tier 0:* (write it down.)
- *tier 1:* (write it down. all of it.)
- *tier 2:* (Write it down. All of him.)
- *tier 3:* (Write it down. All of him. I don’t know who I’m writing it down for.)

`prompt` (The file.)

▸ **Add to it.**

> *You add the soup. Then the way he knelt. Then the fact that you added the soup. It is light at the top of the light-well before you stop, and you didn’t stop, you just ran out of him.*
>
▸ **Watch yourself from the corner.**

> *You stay up by the light and watch the girl on the cot for the rest of the night. She doesn’t sleep either. Once she laughs at something, and you can’t think what.*
>
Close the file.

it opens again on its own

#### Evenings in the cell

> Misaki POV, evenings while it is a cell: sleep she won’t allow, the napkin, the joke over the tray, the handle.

*The rule is that if you sleep, they come while you are under. So you don’t.*

*You do sums. Wind at eight knots across six hundred metres. The rent divided by thirty-one. You pinch the inside of your wrist above the dressing until there is a mark like a fingernail moon, and then another next to it.*

*Around three the room goes thin. You are up in the corner by the light, looking down at somebody on a cot with her eyes open, pinching her own wrist, and you think, quite calmly, that she looks tired and should probably sleep, and that you won’t let her.*

**Misaki:** 
- *tier 0:* (awake. still awake.)
- *tier 1:* (still awake. good. good girl.)
- *tier 2:* (Still awake. Good.)
- *tier 3:* (Still awake. Good. They can’t do anything to somebody who’s watching. I’m watching. Somebody’s watching.)

*On the tray tonight, under the spoon, there is a paper napkin folded in four. Inside it somebody has drawn a hound in fountain pen, badly. It is the grey one. You can tell from the seam.*

*Somebody has drawn you hounds before, on napkins and once on a parking ticket. Whoever it was could never draw either.*

**Misaki — choice:** *(The hound.)*

▸ **Fold it over so you can’t see it.**

> **Misaki:** 
> - *tier 0:* (they know about her.)
> - *tier 1:* (they know about the grey one. i must’ve told them.)
> - *tier 2:* (They know about the grey one. I must have told them, under the needle.)
> - *tier 3:* (They know about her seam. I told them. I must have, under the needle, with everything else, and now they draw it on napkins.)
>
> *You put it under the tray, hound side down. Your hand goes back to it every few minutes to check it is still face down.*
>
▸ **Keep it under the pillow.**

> *You put it under the pillow and lie on it, and tell yourself it is evidence of how much they know.*
>
> **Misaki:** 
> - *tier 0:* (evidence.)
> - *tier 1:* (evidence. that’s all.)
> - *tier 2:* (Evidence. That’s all.)
> - *tier 3:* (It’s evidence. I’m keeping it as evidence. Shut up.)
>
*When the tray comes you are sitting up with your legs crossed and your hair pushed back, and you tell the guard the soup smells amazing, compliments to the chef, you’d leave five stars if you had a phone.*

*Your voice is fine. It is your usual voice, the one for clients. Under the blanket the fingers of your right hand are tapping the doors of the other building in order, from the van to the cell, eleven of them, and starting again.*

*Your heart is going so hard that you can see the blanket move with it. You keep your face pointed at the soup.*

**Misaki — choice:** *(He is in the doorway.)*

▸ **Make another joke.**

> **Misaki:** 
> - *tier 0:* ur soup’s great btw.
> - *tier 1:* ur soup is honestly so good. tell ur boss.
> - *tier 2:* Honestly, the soup is great. Tell your boss.
> - *tier 3:* Honestly, best soup I’ve had in any cell, and I’ve been in a few. Tell your boss I said so.
>
> *He goes. You keep tapping until the boiler comes on.*
>
▸ **Say nothing. Smile.**

> *You smile at him until the door shuts. Then you stop, and your face doesn’t know what to do instead.*
>
Tell him you’re frightened.

it doesn’t come out

*The door has a handle this evening. You saw it this morning too, and you decided then that your eyes were lying, because cells don’t have handles.*

*So you check. You touch the handle three times, and then the bottom of the door, where the slot was in the other place, and there isn’t a slot, so you check again. Three and the slot, and again.*

**Misaki:** 
- *tier 0:* (it’s my head.)
- *tier 1:* (it’s my head doing this. i KNOW that.)
- *tier 2:* (It’s my head doing this. I know it is.)
- *tier 3:* (It’s my head. I can tell it’s my head. There’s a handle, and my head says there isn’t, and I believe my head, and I’ve never been so scared of anything in my life as I am of the inside of it.)

*You do it eleven times. Then you sit down on the floor with your back to the door, and when you hear his steps you get up and are on the cot with your hands in your lap before the ninth.*

#### It comes back

> Worst route, after she has reasoned it out or been talked out: it comes back the next time he walks in.

- *if flag kdInterrupted set:* *You know where you are. He held your wrists and told you, the menu and the bed and Tuesday and his house, until it came back.*
- *otherwise:* *You know where you are. You worked it out yourself, a piece at a time.*

*At noon you hear him on the stairs, and you are counting. Nine steps. Your back finds the wall. You know it is V, and the knowing sits in the front of your head, and the counting goes on behind it as if nobody had told it anything.*

*When he comes in you say “thanks” to the soup in the voice from the slot. Then you hear yourself.*

**Misaki — choice:** *(It’s still counting.)*

▸ **Say his name to yourself until it stops.**

> **Misaki:** 
> - *tier 0:* (V. V. V.)
> - *tier 1:* (V. it’s V. V.)
> - *tier 2:* (V. It’s V. It’s his house.)
> - *tier 3:* (V. It’s V. It’s his house. V.)
>
> *It takes an hour. It doesn’t stop. It gets quieter, so that you can eat with it going on.*
>
▸ **Let it count. Eat.**

> *You eat with your eyes on his hands and the count going. You know who he is the whole time. It doesn’t make any difference to your hands.*
>

#### Through the gap (V)

> V POV, once a day: the ritual through the gap in the door.

*He sees it through the gap in the door, before he knocks. She is at the door on her side, touching the handle three times, then crouching to run her fingers along the bottom edge, then the handle again. Her lips are moving.*

*He knocks twice. By the time the door is open she is on the bed with her legs crossed, and she tells him the soup smells amazing.*

**V:** (She stops when I am there. Whatever she is doing, she hides it from me first.)

*He goes back to the corridor and sits down where the gap shows him nothing, so that she can start again.*

#### The light under the door (V)

> V POV, worst stay, once a day: the light under her door.

*The light under her door stays on all night. It has for three nights.*

*At four he hears her through the wood, counting, very steadily, and then a small sound he takes a long time to place: a fingernail, pinching. Then the counting again from one.*

*He does not go in. Going in is the thing she is staying awake for. He writes the hours on the chart, three nights of them, in a column nobody asked for.*

#### The tray (V)

> V POV, clear after a bad stay, once a day: her hand under the tray.

*She knows him today. She says his name at breakfast and rates the soup ten out of ten.*

*She sits where she can see the door. Every time it moves her eyes go to it and come back, and her face does not change. Her right hand has closed on the spoon and stayed closed, and under the tray she is working the fingers open with her thumb, one at a time, while she tells him a joke about a priest.*

**V:** (She is most cheerful when I am in the room.)

*He laughs at the end of the joke, in the right place, and goes out so that she can stop.*

### 3.6 The worst route: Friday

> Severity 6+ (worst stays). At 8+ the stay never clears by itself (the code fridaycomes starts here).

#### Eleven days

> Misaki POV, severity 8+ (the code fridaycomes starts here): the extra opening scene, “Eleven days”.

**⟨If kdWorstOpen = 1, Misaki in the infirmary⟩**

> *Eleven days. That is what it was, in the end. Nobody tells you. You won’t know for a week.*
>
> *What you know is the floor, and the bulb, and that you can’t feel two of your fingers, and that the sky you saw for a second when they carried you out must have been a dream, because you are back on a floor under a bulb.*
>
> **Misaki:** (it was a nice dream. there was a coat in it.)
>
> *You have stopped counting the radio. You lost count somewhere in the second week and you were too tired to start again. That frightens you more than anything else in the room.*
>

#### The goodbyes

> The goodbyes she can leave with the tall one (V, Angel, Ronin, the hounds).

`v` “Tell V— tell him it wasn’t his fault. Tell him I didn’t say anything. Tell him to eat. Tell him he can stop counting now.”

`a` “Tell Angel the lighting was always good. Tell her she never missed. Tell her she can have my rifle, the good one, it’s under the trailer floor, and she has to name it something stupid.”

`r` “Tell Ronin he can have the ring back. Tell him the joke about the priest was never funny and I laughed every time. Tell him he was two streets over and it doesn’t matter.”

`h` “Tell the grey one she’s good. Tell all of them they’re good. Somebody has to tell them every day or they forget, they’re hounds, they forget, so somebody has to tell them every day.”

#### Friday

> Misaki POV, worst stays (severity 6+), on an extra night, while the room is still a cell: Friday. She leaves goodbyes with the tall one.

*It is the second night, or the third. You have lost the count again. Somewhere in the losing it you worked out what day it must be.*

*Friday. The buyer comes Friday. You heard them say it under the radio, the first night, before anything. Tomorrow is Friday.*

*You do the sums the way you always do the sums. You don’t get a Saturday. That’s fine. You had five years and then some extra. You were lucky. You always said you were lucky.*

*The tall one is on the other side of the door. He always is. He breathes like somebody trying not to be heard.*

**Misaki:** 
- *tier 0:* ...hey.
- *tier 1:* hey. tall guy. u awake.
- *tier 2:* Hey. You. Are you awake?
- *tier 3:* Hey. Tall one. I know you’re there, you breathe like a radiator. Are you awake?

*A pause. Then: “Yes.”*

**Misaki:** 
- *tier 0:* i need u to pass some stuff on.
- *tier 1:* i need you to pass some stuff on. after. you don’t have to. but you’re the only one here.
- *tier 2:* I need you to pass some things on. After. You don’t have to. You’re just the only one here.
- *tier 3:* I need you to do something for me. After Friday. You don’t have to, you don’t owe me, but you’re the only person in this whole building who ever knelt down, so it’s you. I need you to pass some things on.

*A longer pause. Then: “Tell me.”*

For V.

For Angel.

For Ronin.

For the hounds.

- *if `k==='v'`:* *On the other side of the door, nothing. Then, after a while: “I will tell them.” The voice does something on the last word that a guard’s voice wouldn’t.*
- *otherwise:* *On the other side of the door, nothing. Then, after a while: “I will tell them.”*

**Misaki — choice:** *(Who else.)*

▸ **That’s everyone.**

<small>→ after: into the infirmary</small>

**Misaki:** 
- *tier 0:* ok. thanks.
- *tier 1:* ok. that’s it. thanks. sorry about the soup.
- *tier 2:* That’s all. Thank you. I’m sorry about the soup.
- *tier 3:* That’s everyone. That’s all of them. Thank you. Sorry I never ate your soup, it smelled really good. Sorry I called you the tall one. You were the only nice thing in here.

*You lie down with your back against the door. On the other side somebody lies down too. You can tell from the sound, a long slow slide down the wood, the way somebody sits down when their legs stop working.*

*Through two inches of door, the tall one starts to read aloud. It is tax history. It is the most boring book in the world. You are asleep in four minutes.*

*He reads until it gets light. He doesn’t stop once, because if he stops she will hear what his voice is doing.*

#### Friday, from V’s side

> V POV: the second extra morning, the night he heard the goodbyes.

**⟨If V POV, `m.sev>=6`, `(m.xd||0)>=1`, `m.ext>0`⟩**

> *Three in the morning. He is on the floor outside the infirmary door, where he has been every night. Her voice comes through it, low, close to the floor on her side.*
>
> **Misaki:** hey. tall guy. u awake.
>
> **V:** Yes.
>
> **Misaki:** i need you to pass some stuff on. after friday. the buyer comes friday. you’re the only one here.
>
> *She thinks it is Thursday. She thinks she will be sold in the morning. She is asking the guard to deliver her last words to V.*
>
> *He says “I will tell them” after each one. He manages it every time. He does not manage anything after that for some minutes.*
>
> **Misaki:** sorry about the soup. you were the only nice thing in here.
>
> *He reads to her through the door until it is light, the tax history, at the same speed, in the same voice. He does not stop once. If he stops she will hear what his voice is doing.*
>

#### kd\_delivered

> Plays when: day 2+ after discharge, flag kdBye set. Aftermath order: 6 of 104.

- *if Misaki POV:* *Angel is strange with you at lunch. She keeps touching your arm. Ronin comes by at three with nothing to say and stays until nine.*
- *otherwise:* *He delivers them the morning she comes upstairs, in person, word for word, standing in a doorway each time, the way you would deliver news of a death.*

**⟨If `b.includes('a')`⟩**

> **⟨If Misaki POV⟩**
>
> > **Angel:** babe. i named it. the rifle. it’s called “lighting was always good.” it’s engraved. i’m never using it. it’s on the wall.
> >
> **⟨Otherwise (V POV)⟩**
>
> > *Angel listens to hers with both hands over her mouth. Then she goes and gets the rifle from under the trailer floor and has the name engraved on it before the end of the day.*
> >
**⟨If `b.includes('r')`⟩**

> **⟨If Misaki POV⟩**
>
> > **Ronin:** Ain’t takin’ the ring back. Priest joke stays. And it fuckin’ matters, two streets. It matters. Don’t tell me what matters.
> >
> **⟨Otherwise (V POV)⟩**
>
> > *Ronin listens to his in the yard, with his back to V, smoking. He says “two streets” once, and nothing else, and puts the cigarette out on his own hand.*
> >
**⟨If `b.includes('h')`⟩**

> 
> - *if Misaki POV:* *Every morning now, V goes down the row of hounds and tells each one she’s good. Out loud. By name, the grey, the old, the black, the pale. You hear him through the floor.*
> - *otherwise:* *He does the hounds that evening. He goes down the row and tells each one she is good, out loud. He does it every morning after that and never misses one.*
>
**⟨If Misaki POV⟩**

> *You work it out at dinner. Nobody delivered anything. You never sent anything. There was only the tall one, and the tall one was—*
>
**⟨Otherwise (V POV)⟩**

> *He saves his own until last, and doesn’t deliver it. She sent it to him. It arrived.*
>
**⟨If Misaki POV⟩**

> **Misaki:** 
> - *tier 0:* ...it was u.
> - *tier 1:* it was you. at the door. i told YOU.
> - *tier 2:* That was you at the door. I said all of it to you.
> - *tier 3:* That was you. Behind the door. I said goodbye to you, to you, and asked you to tell yourself, and you said “I will tell them” four times and then read me tax law until it got light. V. V, look at me.
>
> **V:** It was not my fault. You did not say anything. I am eating. I have stopped counting.
>
> *He has learned it by heart. He says it back to her exactly. Then he goes and stands at the sink with his back to the room, and she lets him, because she would want the same.*
>

### 3.7 The worst route: the room, her mind, the clues

> Severity 8+, Misaki POV, still deluded.

#### The room, described

> Worst route: the main things in the room, described by day and by state of mind (clear / cell / dark, dark = composure under 15).

`Cot`

> `dark`
>
> > The cot. You lie on it and think about how long the night is. That’s all you think about now.
> >
> > The cot. You haven’t slept on it, you’ve waited on it. There’s a difference and you know it.
> >
> `cell`
>
> > The cot is too soft for a cot. You file that and don’t look at it.
> >
> > The cot. Somebody changed the sheet while you were under. You don’t know which is worse, that they did or that it smells clean.
> >
> `clear`
>
> > The bed. His sheets. They smell like the laundry room upstairs and like the grey hound.
> >
> > The bed. Somebody has put a second pillow on it, the way you like, without asking how you like it.
> >
`Bed`

> `dark`
>
> > The bed.
> >
> > The bed.
> >
> `cell`
>
> > The bed.
> >
> > The bed.
> >
> `clear`
>
> > The bed. His sheets. They smell like the laundry room upstairs and like the grey hound.
> >
> > The bed. Somebody has put a second pillow on it, the way you like, without asking how you like it.
> >
`Their notes`

> `dark`
>
> > Their notes. You don’t want to know what they write about you any more.
> >
> > Their notes. Every line is something they know and you don’t.
> >
> `cell`
>
> > Their notes. Neat writing. Too neat. Like someone who cares.
> >
> > Their notes. There’s more ink on the page today. They watched you all night.
> >
> `clear`
>
> > Your chart. You read it like a weather report.
> >
> > Your chart. Somebody has started writing your quotes in the margin.
> >
`Door`

> `dark`
>
> > The door. You don’t look at it any more. Looking at it is what hope feels like and you can’t afford that.
> >
> > The door. On the other side, the tall one, breathing. Always the tall one.
> >
> `cell`
>
> > The door. It has a handle on your side. You’ve decided not to think about that.
> >
> > The door. Someone sits against it all night. You can hear the pages turn.
> >
> `clear`
>
> > The door. Open a hand’s width. Out there, four hounds, and a man with a book.
> >
> > The door. You open and close it a few times, just because you can.
> >
`Tray`

> `dark`
>
> > The tray. You don’t eat. Not eating is the one thing in here that’s yours.
> >
> > The tray. Soup again. You let it go cold like the others.
> >
> `cell`
>
> > The tray. The soup smells like somebody’s kitchen. Somebody you know’s kitchen.
> >
> > The tray. There is a note under the bowl that you won’t read.
> >
> `clear`
>
> > Soup. “I watched myself make it.”
> >
> > Soup. Day four. He’s run out of ideas and gone back to day one.
> >
`The line in your hand`

> `dark`
>
> > The line in your hand. Whatever’s in it, it’s theirs. Everything in here is theirs.
> >
> > The line in your hand. You could pull it out. You don’t see the point of pulling it out.
> >
> `cell`
>
> > The line in your hand. Green cap. You’ve seen green caps somewhere.
> >
> > The line in your hand. They put it in the other hand this time. Someone gentle did it.
> >
> `clear`
>
> > The drip. Saline and something for the wrist. He labelled it.
> >
> > The drip. Nearly empty. You’re nearly done with it.
> >
`A machine that beeps`

> `dark`
>
> > The machine counts you. Soon there won’t be anything for it to count.
> >
> > The machine. You’ve stopped listening to it.
> >
> `cell`
>
> > The machine. It beeps like an oven timer. Whose oven.
> >
> > The machine. You count the beeps instead of the radio.
> >
> `clear`
>
> > The monitor. The numbers are better than yesterday. You don’t tell anyone you checked.
> >
> > The monitor. Steady. Steadier than you.
> >

#### State of mind

> Worst route, still deluded: the first time each day the planner opens, one scene from inside her head by composure band (hold 22+, fray 14+, thin 7+, gone).

`hold`

> *You wake up and do your inventory before you open your eyes. Hands. Feet. Name. You have all three. That’s a good morning, in here.*
>
> **Misaki:** (One: I’m alive. Two: they haven’t come yet. Three: the tall one is outside and he has not hurt me once. I don’t know what to do with Three.)
>
> *You make yourself do the exercises you did at fourteen, in the first room with a lock on the outside: name five things you can see. Bulb. Door. Tray. Your own knees. A crack in the ceiling shaped like a hound.*
>
> **Misaki:** (A hound. Why does everything in here look like a hound.)
>
`fray`

> *You lose time in the afternoon. One minute the light-well is bright, the next it’s dark, and the soup on the tray has a skin on it. You don’t know where the hours went. You know exactly where the hours went. You’ve been here before.*
>
> **Misaki:** (It’s happening again. It’s the van again. They’re doing the needle again and I didn’t feel it.)
>
> *Nobody has given you a needle. You are losing the hours all by yourself now. That’s worse, and you know it’s worse, and you can’t make it stop.*
>
> *You catch yourself apologising out loud to nobody. Sorry. Sorry. In the voice you use for clients.*
>
> **Misaki:** (Who am I saying sorry to.)
>
> *You think it might be V. You think you might be saying sorry to V for not being there when he comes, for making him find whatever is left. You don’t know you are already in his house. You are saying sorry to the right man through two inches of door.*
>
`thin`

> *You can’t remember what his voice sounds like. V’s. You try, and you get the tall one’s instead, the slow reading voice, and you panic, because they’ve taken that too, they’ve swapped it out.*
>
> **Misaki:** (I had it. I had it this morning. I had his voice and they’ve put the guard’s in its place.)
>
> *It is the same voice. It was always the same voice. You are grieving a man who is sitting four feet away.*
>
> *You don’t eat. Not to make a point any more. You just can’t remember the reason people do it.*
>
> *You think about the trailer. The rent receipt in your back pocket, PAID. You were so proud of that receipt. You were going to frame it. You can’t remember now why it mattered that much, and that frightens you more than the bulb.*
>
`gone`

> *You don’t do the inventory. There isn’t any point counting things they’re going to take on Friday.*
>
> *You lie on your side facing the wall instead of the door, which you have never done in your life, in any room, ever. You have always faced the door. You don’t care which way you face.*
>
> *On the other side of the door the tall one stops reading for a long time. He has noticed which way you are facing.*
>
> *You think about the girl who did the sums on a station bench at sixteen and gave herself five years. You think she’d be disappointed, and then you think she wouldn’t, she’d nod, because she always knew. She was so sure. You spent years proving her wrong. You’re so tired of proving her wrong.*
>
> **Misaki:** (She was right. Five years and some extra. She was right all along and I made everybody love me anyway. That wasn’t fair of me. That wasn’t fair on them.)
>

#### State of mind: a third scene per band

> Worst route: a third state-of-mind scene per band.

**⟨If (an internal state check passes)⟩**

> *You practise his name under your breath. V. V. V. In case they take it. You keep it in your mouth like a sweet you’re saving.*
>
> **Misaki:** (V. Still got it. Still mine.)
>
> *You count the hounds by their breathing through the door. Four. You count again. Five. You count again and get five, and the fifth is slow and shallow and very close, and it takes you a long time to understand that the fifth one is you.*
>
> *The tall one reads to you from a notebook today instead of the tax book. Every line is something you’ve said. Your jokes. The thing about the mangoes. The bit about the knife and the fork.*
>
> **Misaki:** (They’ve been listening to me for years. They wrote it all down. They know every stupid thing I ever said to anyone I loved.)
>
> *It is V’s notebook. It is the most loving thing anyone has ever kept. You hear it as a file.*
>
> *You dream of the kitchen island. Cereal, the hounds, Angel laughing at something Ronin said, V doing the crossword and leaving seven down. It’s so real. You laugh in the dream.*
>
> *You wake up laughing, in the cell, and the laugh stops in your mouth, and the tall one on the other side of the door says, very softly, “Misaki?” and you think: they’ve learned to do his voice now. They’ve even got his voice.*
>

#### Uncanny moments

> Worst route, evenings, composure under 14: uncanny moments.

*You look at the door. It has a handle. You look away, and back. It hasn’t. You look away and back. It has. You stop looking.*

*The mirror under the towel. You lift the corner. The girl in it is a second late, lifting the corner of her own towel. You put it down very carefully, the way you’d put down something live.*

*You count the tiles in the floor. Forty-one. You count again. Forty-one. You count again and it’s forty-two, and there is a forty-second tile right under your foot that wasn’t there, and you stand on it all night so it can’t go anywhere.*

#### Dark thoughts

> Worst route, composure under 15: one dark thought a day.

(If they come Friday, they come. You’ve done the sums.)

(You keep thinking about Friday. Not about getting out. About Friday.)

(There’s one thing they can’t take, and it’s the when.)

#### The rule

> Misaki POV, worst route: the four’s rule (if one dies, nobody goes back), as she lies on the cot.

**⟨If worst route (severity 8+, still deluded), she still thinks it is a cell (clarity under 2), `S.f.kdMindDay===S.day`, infirmary day 2+⟩**

> *You lie on the cot and work it out, the way you work out a drop, because it is something to do with your head that is not the door.*
>
> *Day one, they would have noticed. Day two, they would have looked. The rule is forty-eight hours. So by now Angel has greyed your line in the spreadsheet. Ronin has the truck and has already put the seat back. V has taken Prickles off your windowsill and is watering him every two weeks, like you told him a hundred times, and is not looking for you, because that is the rule, and you voted for it.*
>
> **Misaki:** (Good. That’s good. That’s what we said. Nobody comes. Nobody does anything stupid.)
>
> *It is the most comforting thing you have thought in days. You hold onto it like a rail, and you do not once let yourself wonder about the man outside the door who has been there every night, who reads, and who is the right height.*
>
> **Misaki:** (They moved on. Good. I’d have moved on. I’d have—)
>

#### Worst (Misaki)

> Misaki POV, worst route, still deluded: after that day’s state-of-mind scene.

*There is a bread roll with the soup now, still warm. You leave it on the tray with everything else they bring.*

*At night you have heard a hound in the corridor. They have a hound out there, a big one, and sometimes she whines very low and scratches once at the door, the way a hound does when somebody has told her no. You know what places like this do to animals.*

*You tear the roll into pieces and push them under the door one at a time, flat on the lino, as far as your fingers reach.*

*For a long time nothing comes. Then something does, very gently, a big muzzle so careful that it never touches your fingers.*

**Misaki:** 
- *tier 0:* (good girl.)
- *tier 1:* (good girl. good girl. quick.)
- *tier 2:* (Good girl. Eat it quick, before they see.)
- *tier 3:* (Good girl. Good girl. Eat it quick, before they see. Somebody in here should get fed.)

*You do it with every roll after that. You lie with your fingertips under the door until the hound’s breath comes back to them.*

*There is black polish on the nails of your right hand, chipped down to half-moons. Angel did them on a Sunday, before, with a little pink star on the thumb.*

*Every time you have been frightened in here you have picked at it. Today you look down and see how little is left, and you stop.*

**Misaki:** 
- *tier 0:* (sorry babe.)
- *tier 1:* (sorry babe. i’ll stop. keeping the star.)
- *tier 2:* (Sorry, babe. I’ll stop. I’m keeping the star.)
- *tier 3:* (Sorry, babe. Sorry. I’ll stop. That’s all of you I’ve got in here and I’ve been dropping it on their floor a flake at a time. I’m keeping the star.)

*You sit on the hand so you can’t pick at it. You keep it under you all afternoon, and when you sleep, you sleep on it.*

#### Worst (V)

> V POV, worst stay (severity 8+): one scene a day.

*Every evening he puts a bread roll on her tray beside the soup. Every morning the roll is gone and the soup has not been touched.*

*On the third morning he finds the roll on his side of the door, torn into pieces and pushed under one at a time, and nosed into a straight line along the lino. The grey hound is lying beside the line with her chin on her paws. She has not eaten one.*

*He understands it slowly. Misaki has heard a hound in the corridor and decided that the people holding her are starving it. She is giving it her bread. She has not eaten in four days.*

*He picks the pieces up and does not know what to do with them. In the end he feeds them to the grey hound one at a time, from his hand, telling her each time that she is good, and the hound eats them because he asks her to.*

**V:** (Tonight I will put two rolls on the tray. She will push both of them under the door. I will still put two.)

#### The five clues

> Worst route (severity 8+, Misaki): the five things she can “think through”. Each is the spot it belongs to; each gives +3 composure. Four of them is the logic-out.

`Cot`

> A cell cot is a board on a frame. You know; you slept on one for eleven days. This one has springs. The sheet has been ironed. Somebody ironed a sheet for you.
>
> (Nobody irons a sheet for something they’re selling on Friday.)
>
> You run your good hand over it. It’s been ironed with the corners folded under, hospital corners, the way somebody was taught in a kitchen by a mother who also folded tea towels in thirds.
>
`The line in your hand`

> The cannula in the back of your hand has a green cap, the wide-gauge kind. Veterinary. You’ve handed somebody a hundred of these, in a kennel, holding a hound’s leg while he talked to her.
>
> (The green ones. He buys them by the box. You’ve seen the box.)
>
> The box was on the second shelf, behind the worming tablets, and it had a label in fountain pen: “For the big ones. Do not use the blue.” You laughed at that label. You remember laughing.
>
`Their notes`

> The notes on the clipboard are in fountain pen. Nobody writes in fountain pen. One person does. He writes the M in Misaki the way you’ve seen it on soup labels, on sticky notes, on a list of things you’ve said.
>
> (That M. You know that M.)
>
> There is a line at the bottom of the page, in the same pen, that isn’t medical: “Asked for the light off. Then on. Then off. Left it on.” Nobody in the other building ever wrote down what you asked for.
>
`Door`

> The door opens inward and hinges on the right. The bed is set so nobody can stand behind it. The light-well is where the sightline from the bed lands. You drew a room exactly like this once. On the back of a takeaway menu, at two in the morning, eating cereal, for a man who asked for a room nobody could get into.
>
> (You designed this room. That’s not possible. Unless it is.)
>
> You remember the menu. Pizza place on the corner, the one with the dog on the sign. You drew the room on the back of the pepperoni section and he asked why the bed was at that angle, and you said so nobody can ever stand behind me, and he didn’t ask anything else.
>
`A machine that beeps`

> The machine beeps on the same note as an oven timer you know. You’ve heard this exact machine before: the night the grey hound had surgery, in a room off a kennel, while somebody tall held a lamp and you held the hound’s head.
>
> (You have been in this room before. You held a hound in this room.)
>
> She had her head in your lap the whole time. Afterwards you sat on this floor, in that corner, with your back against that wall, and somebody brought you tea and said “thank you” in a voice like a filing cabinet.
>

#### Think it through

> Worst route: what each of those spots asks.

**Misaki — choice:** 
- *if composure under 15:* *(You can hardly make yourself look at it.)*
- *otherwise:* *(Look at it the way you look down a scope.)*

▸ **Look**

▸ **Think it through** — *(you already did / )* `greyed out when `(m.clues||[]).includes(c[0])``

> **⟨If `m.clues.length>=4`⟩**
>
> > <small>→ she reasons it out</small>
> >
▸ **Leave it**

#### The logic-out

> Worst route: four clues thought through. She opens the door and finds V.

**Misaki:** (Okay. Okay. Do it like a job. One thing at a time.)

**Misaki:** (One: the bed’s been ironed. Two: the line’s from his box. Three: that’s his M. Four: I drew this room. Five, if I want it: I’ve held a hound’s head in here.)

**Misaki:** (So either they built a perfect copy of V’s infirmary, with his handwriting and my floor plan and his needles, to fool one girl they were selling on Friday—)

**Misaki:** (—or it’s his. And the tall one is—)

*You don’t finish it. You get up, on the foot that’s broken, and go to the door, and open it, which you could have done at any time, and look out.*

*The corridor. The four hounds lying in a row. At the end of it, on the floor, a man in a coat with a book face down on his knee, who looks up, and does not get up, and does not say anything at all.*

**Misaki:** 
- *tier 0:* ...V.
- *tier 1:* V. it’s u. it was always u.
- *tier 2:* V. It’s you. It’s been you.
- *tier 3:* V. I worked it out. Nobody told me, I worked it out. You ironed the sheet, you idiot. Who irons a sheet in a cell.

**V:** I did not know what else to do with my hands.

### 3.8 The worst route: the bright turn, the spiral, lucid too late, the interrupted secret

> Composure 3 or less at bedtime. The bright turn plays first, then the spiral the same night.

#### The bright turn

> Worst route, at the bedtime the spiral would come (composure 3 or less), the first time: the bright turn. The three choices shape the ending.

*You wake up and you feel better. That’s the first thing. You feel so much better.*

*The bulb looks warm, for once. Like a kitchen light. The soup on the tray smells of somebody’s home, and you eat all of it, and it is the best thing you have ever tasted.*

**Misaki:** 
- *tier 0:* (oh. i feel ok.)
- *tier 1:* (oh. i feel ok. i feel really ok actually.)
- *tier 2:* (Oh. I feel all right. I feel completely all right.)
- *tier 3:* (Oh. I feel good. I feel lighter than I have in— I can’t remember. Everything’s so clear. I know exactly what to do now. It’s such a relief to know what to do.)

*You hum. You fold the blanket. You tidy the tray. You say “good morning” through the door, brightly, and on the other side the tall one goes completely silent, and stays silent, and you don’t understand why he doesn’t say it back.*

**Misaki — choice:** *(What should you hum?)*

▸ **The bank jingle. It’s catchy, honestly.**

▸ **Ronin’s hymn, the one the man knew.**

▸ **Nothing. Just listen to the house.**

*You hum it all the way through. It sounds lovely in here. The room has good acoustics; you’d never noticed.*

**Misaki:** 
- *tier 0:* (should i tidy up?)
- *tier 1:* (i should leave it nice. for whoever.)
- *tier 2:* (I should leave the room nice. For whoever comes in.)
- *tier 3:* (I want to leave everything nice. Tidy. You don’t leave a mess for people. That’s just manners.)

**Misaki — choice:** *(What should you leave out, neatly, where someone will see it?)*

▸ **The paper cup. Washed. In the middle of the tray.**

▸ **The soup label. Write something nice on it.**

▸ **Nothing. Just the blanket, folded.**

*It looks so tidy. You feel proud of it. You feel proud of everything today.*

*The light-well is very bright this afternoon. There’s a leaf on the glass at the top, very small and very far up. You could look at it forever.*

**Misaki — choice:** *(Where do you want to sit tonight? Somewhere nice.)*

▸ **Under the light-well, where you can see the leaf.**

▸ **With your back to the door. The tall one’s on the other side; it’s warm there.**

▸ **On the bed, facing the wall, with the light off. Just for once.**

▸ **On the floor by the door. Maybe a hound will come.**

#### What she hummed

> Spiral ending: what he heard her humming (by what she hummed).

`jingle` Somewhere in the room, still, there’s a tune he can’t place, and then he can: a jingle for a bank. She was humming it. He heard her humming it all afternoon and thought she was getting better.

`hymn` All afternoon she hummed Ronin’s hymn, the one the man on the floor knew. He heard it through the door and thought she was getting better. He wrote it down: “Humming. Better?”

`quiet` All afternoon it was quiet in there. A good quiet, he thought. The first good quiet in nine days. He wrote it down: “Quiet. Resting. Better?”

#### What she left out

> Spiral ending: what he finds on the tray (by what she left out).

`cup`

> *On the tray, in the middle, washed and set straight, the paper cup. Tidy. She left it tidy for whoever came in.*
>
`label`

> *On the tray, a soup label, written on in her best handwriting, very neat: “thank u for the soup. sorry. it was good.” It is addressed to the tall one.*
>
`blanket`

> *The blanket is folded into a perfect square at the end of the bed, corners under, the way he folds them.*
>

#### Where she sat

> Spiral ending: where V finds her (by where she chose to sit).

`light`

> *He finds her under the light-well, sitting, her face turned up. The leaf is still on the glass four floors up. She was looking at it.*
>
> **V:** (She chose the only window in the room. She wanted to see something from outside. I built her a room with one window and it was a slot in the ceiling.)
>
`door`

> *He finds her sitting against the door, on her side of it. Her back was against the wood, exactly where his had been, all night, through two inches. They were back to back. He was reading. He did not stop.*
>
> **V:** (I was right there. I was against the same door. I was reading about land tax.)
>
`dark`

> *He finds her on the bed, facing the wall, in the dark. The light is off. In nine days she has never once turned the light off. She has never once faced a wall.*
>
> **V:** (She turned away from the door. She has never turned away from a door in her life. I heard her do it, at midnight. I heard the bed and I did not understand what it meant.)
>
`hound`

> *He finds her on the floor by the door, and the grey hound is already there, lying along her, chin on her shoulder. The hound had pushed the door open in the night. She had come anyway. She was just too late, too.*
>
> **V:** (The hound was in time to lie beside her. Only the hound.)
>

#### The spiral, and lucid too late

> Worst route: composure 3 or less at bedtime (after the bright turn, the same night). If she has thought through 2+ clues and left a goodbye for V, it is interrupted (below). Otherwise: lucid too late, and V’s lone route.

*Night. The bulb. The radio that isn’t there. The tall one breathing on the other side of the door, slow, the way he breathes when he is reading to himself.*

*You have done the sums. You always do the sums. Tomorrow is Friday, and on Friday somebody comes and takes the rest of you away, and there is not much rest left.*

*You go through what you still have, the way you’d go through a bag before a job. You have very little. You have your hands, which are broken. You have your name, which you had to go looking for on the third day. You have a paper cup, washed, that you don’t know why you kept.*

**⟨If full-story setting⟩**

> *You don’t have the hours. They took the hours, and whatever happened in them, and you will never have those back and never know. You kept one thing out of everything, all your life. You became what you became, you learned the wind and the drop and the price of a man’s kidneys, so that nobody would ever own any part of you again. And they did, for days, and you weren’t even there for it.*
>
**⟨Otherwise (injuries-only setting)⟩**

> *They broke what they wanted to break. Some of it will set crooked. Some of it was crooked already, from before you were nine, from people you don’t remember doing things you can’t remember. You are so tired of being something people do things to.*
>
*The worst part is that it doesn’t hurt. You keep waiting for it to hurt, the way a hand hurts when the cold goes out of it, and nothing comes. You feel like a room somebody has moved out of. Everything is still where it was. Nobody lives there.*

*You think about the four of them at the table on a Sunday, the bread and the salt and the week laid out between them. You think about the grey hound’s seam under your palm. You hold the thought up and look at it, and it is lovely, and it is somebody else’s, a photograph of a town you used to live in.*

**Misaki:** (They’ll be okay. They were okay before me. Angel will cry on main. Ronin will break something. V will make tea for two for a while and then he’ll stop.)

**Misaki:** (He won’t stop. I know he won’t. I know exactly what he’s like. I’m sorry. I’m so sorry. I’m so tired.)

*You have always decided when. Nobody took that off you before nine, or in the cell, and nobody here is going to.*

**Misaki:** (Not Friday. Not them.)

*The light is on. You leave it on.*

**⟨If the secret is caught in time (2+ clues and a goodbye left for V)⟩**

> <small>→ the secret, interrupted</small>
>
**⟨Otherwise⟩**

> *And then, after, in the little space after, with nothing left to decide—*
>
> *The sheet is ironed. The corners are folded under. The cannula has a green cap. The M on the clipboard. The bed at the angle you drew on a pizza menu so that nobody could ever stand behind you.*
>
> *The breathing on the other side of the door. You know that breathing. You have fallen asleep to that breathing on a couch, in a car, on a roof under a blanket with a hound on it.*
>
> **Misaki:** (...oh.)
>
> **Misaki:** (oh, no. oh, V. it’s his house. it was always his house. it’s Tuesday, and I’m in his house, and I’ve—)
>
> *You try to call out. You want to say his name. You want, more than you have ever wanted anything, to say sorry to the tall one for the soup.*
>
> *It is too late for your voice to work. It is not too late for you to know. That is the last thing they took, and they didn’t even have to be there for it.*
>
> *The tall one stops reading at four, because the breathing on the other side of the door has changed, and he knows that breathing better than his own.*
>
> *He is through the door before the book hits the floor. He has the bag. He has the light. He is fast, and he is very good, and he is too late by minutes, not hours.*
>
> *She is looking at the door. Her face is not afraid. It is the face she makes when she has worked something out a second too late, on a roof, when the wind has changed. He has seen it a hundred times. He knows exactly what it means.*
>
> *The grey hound lies down across the threshold and will not move for anyone for two days.*
>
> *The funeral is small. Angel does the eyeliner one last time, and her hands shake the whole way through, and she does not stop until it is perfect. Ronin stands at the back with his crowbar and does not sing.*
>
> **⟨If (an internal state check passes)⟩**
>
> > *Later, under the mattress, he finds one more soup label, one word on it in biro, very small, written after everything else: “V?”*
> >
> **⟨Otherwise⟩**
>
> > *Under the mattress, V finds a paper cup, washed, and a soup label with one word on it in biro, written very small, the last thing she wrote: “V?”*
> >
> **V:** (She knew. At the end, she knew where she was. She was in my house the whole time.)
>
> <small>→ V’s lone route</small>
>

#### The secret, interrupted

> Worst route: the secret, interrupted (2+ clues and a goodbye for V). She lives.

*The tall one is not reading tonight. He has not read since the night she gave him her goodbyes to pass on. He has been sitting against the door listening, every night, because of what she said for V.*

*So he hears it the second it changes. Not the breathing. Before that. The small sound of somebody deciding.*

*The door comes off its top hinge. He doesn’t slow down for it.*

*He has her wrists, both of them, in one hand, very gently, the broken one and the other one, and his face is lower than hers, the way he always kneels, and he is saying something over and over that she can’t hear yet.*

*“—Tuesday. It is Tuesday. It is my house. You drew this room. You drew it on a menu. The bed is at that angle because you said nobody should stand behind you. It is my house. It is Tuesday. You drew this room.”*

**Misaki:** (...the menu.)

**Misaki:** (the pizza place with the dog on the sign. the pepperoni side. i drew the bed at an angle.)

*The ironed sheet. The green cap. The M. The breathing she has fallen asleep to on a couch, in a car, on a roof. It comes at her all at once, the way a room comes back when somebody turns the light on, and it is so much worse and so much better than the cell that she can’t breathe.*

**Misaki:** V.

**V:** Yes.

**Misaki:** V, i nearly— i was going to— it’s Tuesday?

**V:** It is Tuesday. You are in my house. I am not letting go of your hands until you tell me to, and I would rather you did not tell me to.

*She doesn’t tell him to. They sit on the infirmary floor with the door hanging off its hinge until it gets light, and the grey hound comes in over the broken door and lies down across both of them, and nobody says anything else at all.*

The night in the infirmary when the tall one was V, and he was listening. Neither of them talks about it. He sleeps against the door for a month afterwards.

#### kd\_interrupted\_after

> Plays when: flag kdInterrupted set, day 1+ after discharge. Aftermath order: 2 of 104.

**⟨If Misaki POV⟩**

> *The infirmary door has a new hinge. V fitted it himself. He did not replace the door. There is a dent in it at the height of a man’s shoulder.*
>
> *He sleeps against your bedroom door now, on the floor, on a dog bed. You found out on the second night. You haven’t said anything. Neither has he.*
>
> **Misaki:** 
> - *tier 0:* (he heard me.)
> - *tier 1:* (he was listening. every night. because i said goodbye to him by name.)
> - *tier 2:* (He was listening because I said goodbye to him by name. That’s why he was in time.)
> - *tier 3:* (I said goodbye to the guard and asked him to tell V, and V was the guard, and he listened to it, and then he sat by the door every night after just in case. That’s the only reason. That’s the whole reason I’m here.)
>
**⟨Otherwise (V POV)⟩**

> *He fits a new hinge on the infirmary door. He does not replace the door. He leaves the dent.*
>
> *He sleeps on a dog bed outside her room for a month. On the first night the grey hound comes and lies down beside him, and on the second the other three, and nobody in the house mentions it.*
>
> **V:** (I was listening because she said goodbye to me. If she had not, I would have been reading, and I would not have heard. I have thought about that every night since. I will not stop.)
>

### 3.9 The shatter

> How the cell drawing breaks away when clarity returns, by route; and the pieces that don’t go.

#### The shatter lines

> Whenever her clarity returns, the cell drawing breaks away; then the lines for how it came back: morning (a normal stay), logic (reasoning it out), caught (the interrupted route), late (the spiral).

`morning`

> *You look at the door and it has a handle, and this time, when you look away and back, it still has a handle.*
>
> *And the cell cracks. Not the walls. The idea of it. It goes from the middle outwards, the way a windscreen goes when a stone hits it, and for one second all of it is still standing, held together by nothing, every bar and bulb and radio, and then it falls.*
>
> *Underneath it there was a room. There was always a room. Pale green walls. A lamp with a shade on it. A clipboard in fountain pen. A light-well with a leaf on it.*
>
> **Misaki:** 
> - *tier 0:* (oh.)
> - *tier 1:* (oh. oh, it’s a room. it’s just a room.)
> - *tier 2:* (Oh. It’s a room. It’s just a room. It was always a room.)
> - *tier 3:* (Oh. Oh, it’s a room. It’s a hospital room in a house. It’s been a room the whole time and I was so scared of it.)
>
> *You sit down on the floor, because your legs have decided to, and you don’t cry, and then you do.*
>
`logic`

> *The last piece goes into place, and the cell doesn’t so much break as stop being able to stand up.*
>
> *It comes down around you in pieces the size of hands. The bulb goes, and is a lamp. The radio goes, and is the boiler. The cot goes, and is a bed with ironed sheets. The guard’s chair outside the door goes, and is a man on the floor with a book.*
>
> *You stand in the middle of it while it falls, the way you’d stand in snow, and none of it hurts you.*
>
`caught`

> *He says the menu. He says the angle of the bed. He says Tuesday. And it breaks.*
>
> *The whole cell goes at once, all of it, bars and bulb and nine days, in pieces, falling away from you like something dropped down a stairwell, and underneath it is his face, very close, lower than yours, wet, which you have never seen.*
>
`late`

> *It breaks.*
>
> *Now, of all the times. Every piece of the cell comes away at once and underneath, too clear, too bright, there is the room you drew on a menu, and his sheets, and his breathing on the other side of the door.*
>
> *You can see all of it. You can see exactly where you are. There is nothing left you can do with it.*
>

#### kd\_shards

> Plays when: day 1+ after discharge, stay severity 4+. Aftermath order: 1 of 104.

**⟨If Misaki POV⟩**

> *Not all of it went. Pieces stay, the way glass stays in a carpet for years after the glass broke.*
>
> *The bulb over the kitchen island is the bulb, some mornings, for the length of a breath. The boiler at one in the morning is the radio. V, coming down the stairs in the dark, is the tall one, and your hand is already on the knife before your eyes catch up.*
>
> **Misaki:** 
> - *tier 0:* (it’s a piece. it’s just a piece.)
> - *tier 1:* (it’s a piece. it’s glass in the carpet. it’s not the room.)
> - *tier 2:* (It’s just a piece. Glass in the carpet. It isn’t the room.)
> - *tier 3:* (It’s a piece. It’s just a piece of it, still lying around. You step on them sometimes. Everyone steps on them sometimes. I’m going to be stepping on these for years, aren’t I.)
>
> *You don’t tell him about the knife. He knows anyway. He has started saying your name on the stairs, before he comes round the corner, every time.*
>
**⟨Otherwise (V POV)⟩**

> *Pieces of it stay in her. He can see them land.*
>
> *Some mornings, for a breath, he is the tall one again: she goes still when he comes down the stairs, and her hand goes to the knife block, and then her eyes catch up and she takes it away and says good morning a little too brightly.*
>
> **V:** (I will say her name on the stairs before I come round the corner. Every time. For as long as it takes. If it is for ever, it is for ever.)
>

### 3.10 Full story only: the examination, the photographs, the denial, the hidden route

> These scenes exist only in the full-story setting. They play after discharge, in the aftermath order. What happened is never named. The honest option is always on the menu and always greyed out, except once (kd_last).

#### The setting, as the Settings panel explains it

> The setting’s explanation on the Settings panel.

Kidnapping aftermath — full story includes a strand about what may have been done to Misaki during the hours she cannot remember: a doctor’s examination she refuses, photographs she denies, and what that implies. It is never shown or named. Injuries only removes that strand entirely; the aftermath is about her injuries and her treatment. In either setting, the worst version of the kidnapping can end in Misaki’s suicide in the infirmary (not shown).

#### kd\_ask

> Plays when: day 1+ after discharge, flag kdCard set or flag kdCount set. Aftermath order: 19 of 104. Full-story setting only.

I am required to ask you one question. I will ask it once a day until Saturday, and after Saturday I will stop, because the answer will no longer change what I can do.

*She asks it. It is one sentence long and has been worded by a committee so that it cannot be misunderstood.*

**Misaki:** 
- *tier 0:* no.
- *tier 1:* NO. nothing happened.
- *tier 2:* No. Nothing happened. Write that down.
- *tier 3:* NOTHING HAPPENED. Write it down. Write “patient says nothing happened” and sign it, and put the date.

*The doctor writes it down exactly, with the quotation marks. On a medical record, quotation marks mean “this is what she said.”*

**Misaki / V — choice:** 
- *if Misaki POV:* *(She’ll ask again tomorrow.)*
- *otherwise:* *(He is not supposed to be in the room for this. Misaki told him to stay.)*

**⟨If Misaki POV⟩**

> ▸ **Answer the question.** — *(she is not going to)* `always greyed out`
>
> ▸ **Throw the foam ball at the clipboard.**
>
> > *It bounces off. The doctor picks it up and puts it back on the bed within reach of the left hand, because of the physio.*
> >
> > Tomorrow, then.
> >
> ▸ **Laugh. “do i LOOK like something happened?”**
>
> > *The doctor does not answer that one. She has the photographs in her bag.*
> >
**⟨Otherwise (V POV)⟩**

> ▸ **Stay where he is. Look at the floor.**
>
> > *He looks at the floor through the question and through the answer. When it is over she says “see?” to him, brightly, and he says that he does.*
> >
> ▸ **Leave the room before the question.**
>
> > **Misaki:** 
> > - *tier 0:* where u going.
> > - *tier 1:* where are u going. stay. it’s nothing.
> > - *tier 2:* Where are you going? Stay. It’s nothing, she just has to ask.
> > - *tier 3:* Don’t leave. If you leave it looks like there’s something to leave for. Sit down.
> >
> > *He sits down.*
> >

#### kd\_math

> Plays when: day 1+ after discharge, flag kdCount set. Aftermath order: 20 of 104. Full-story setting only.

**⟨If Misaki POV⟩**

> *She has the figures. [hours] hours she was not awake for. One needle each time. Four men on the day shift and she never did see the night shift.*
>
> *She is good at sums. A contract is nothing but a sum: distance, wind, how long a man stands still. She has all the terms of this one written on a receipt in her shoe.*
>
> **Misaki:** 
> - *tier 0:* (nope.)
> - *tier 1:* (not doing that one.)
> - *tier 2:* (I’m not adding that up.)
> - *tier 3:* (I know what that comes to. I’ve known since the car. I’m not writing the answer down.)
>
> **Misaki — choice:** *(The receipt.)*
>
> ▸ **Do the sum. Say the answer out loud.** — *(she is not going to)* `always greyed out`
>
> ▸ **Count something else. The hounds.**
>
> > **Misaki:** (grey. old. black. pale. four. see? i can count fine.)
> >
> ▸ **Clean the rifle. All of it, twice.**
>
> > *She strips it and cleans it and puts it together, and does it again. Her left hand can’t hold the bolt, so she holds it in her teeth.*
> >
**⟨Otherwise (V POV)⟩**

> *V has the same figures she has: [hours] hours, the needle, the number of men. He also has the doctor’s second page, which she has not asked to see.*
>
> *He watches her fold a receipt very small and put it in her shoe. She catches him watching and asks if he wants a go on the fighting game.*
>
> **V:** (She knows. She has known since the car. She is going to act as though she does not, and she is very good at acting.)
>
> **V — choice:** *(She is holding out the second controller.)*
>
> ▸ **Take the controller.**
>
> > *He loses four rounds. She does the victory dance with one arm.*
> >
> ▸ **“Misaki. The hours you cannot remember—”**
>
> > **Misaki:** 
> > - *tier 0:* nothing happened.
> > - *tier 1:* nothing happened in them. i’d remember.
> > - *tier 2:* Nothing happened in them. I’d remember.
> > - *tier 3:* Nothing happened. I’d remember if it had. Pick your character, V.
> >
> > *She has just told him that she would remember something from the hours she cannot remember. Neither of them points it out.*
> >

#### kd\_window

> Plays when: day 2+ after discharge, flag kd_ask set. Aftermath order: 23 of 104. Full-story setting only.

The examination is only worth doing for a few more days. I want you to know there is a time limit, so that if you let it run out you are choosing that, and it is not just happening to you.

**Misaki:** 
- *tier 0:* good.
- *tier 1:* good. let it run out.
- *tier 2:* Good. Then let it run out.
- *tier 3:* Good. Saturday can’t come fast enough. Then you’ll have to find another hobby.

- *if Misaki POV:* *She has worked out the day and the hour. She did it the first time the doctor said “window,” without meaning to, the way she works out a range.*
- *otherwise:* *She has the day and the hour worked out. He can tell from how she looks at the kitchen clock, which she has never done before.*

**Misaki / V — choice:** 
- *if Misaki POV:* *(Saturday, about four in the afternoon.)*
- *otherwise:* *(Saturday.)*

**⟨If Misaki POV⟩**

> ▸ **Have it done. While it would still show.** — *(she is not going to)* `always greyed out`
>
> ▸ **Mark Saturday on the calendar. Draw a star.**
>
> > *She draws a star on Saturday and writes “FREE” under it. Anybody reading the calendar would think it was a day off.*
> >
> ▸ **Be out of the house every day until then.**
>
> > *She walks the hounds for six hours a day on a broken foot. The doctor comes at ten and at four and finds an empty bed both times.*
> >
**⟨Otherwise (V POV)⟩**

> ▸ **Do not mention Saturday.**
>
> > *He does not mention it. On Friday night he does not sleep, and neither does she, and at four on Saturday afternoon she comes downstairs and asks what’s for dinner in a voice like a door closing.*
> >
> ▸ **“There is still time. I would drive you.”**
>
> > **Misaki:** 
> > - *tier 0:* for WHAT.
> > - *tier 1:* drive me WHERE. for WHAT.
> > - *tier 2:* Drive me where? For what? Nothing happened.
> > - *tier 3:* For WHAT, V? Say it. Go on. Say what you think happened, out loud, in your kitchen.
> >
> > *He cannot say it. That is the answer she wanted. She nods and goes to walk the hounds.*
> >

#### kd\_cup

> Plays when: day 3+ after discharge, flag kd_ask set. Aftermath order: 24 of 104. Full-story setting only.

*There is a second paper cup on the tray this morning. Three small tablets and one large one. The label, in the doctor’s hand, says “as a precaution.” It does not say against what.*

- *if Misaki POV:* *She has never taken a pill in her life without reading the whole box and the leaflet. Poison is a thing she knows about.*
- *otherwise:* *She reads every label. She once made him read her the leaflet for an antihistamine.*

**Misaki / V — choice:** 
- *if Misaki POV:* *(“As a precaution.”)*
- *otherwise:* *(He watches from the doorway.)*

**⟨If Misaki POV⟩**

> ▸ **Ask what they are a precaution against.** — *(she is not going to)* `always greyed out`
>
> ▸ **Take all four. Don’t ask.**
>
> > *She takes them one after another with the soup, without a word, and without looking at the label a second time.*
> >
> > *Anyone who believed that nothing had happened would have asked what they were for.*
> >
> > **Misaki:** (vitamins. she’s got me on vitamins.)
> >
> ▸ **Flush them. “don’t need precautions.”**
>
> > **Misaki:** 
> > - *tier 0:* nothing to be careful OF.
> > - *tier 1:* precaution for WHAT. nothing happened.
> > - *tier 2:* A precaution against what? Nothing happened.
> > - *tier 3:* A precaution against what? You take precautions when something’s happened. Nothing happened. So I don’t need them, do I.
> >
> > *There is another cup on the tray the next morning, and the one after. On the third morning she takes it, fast, with her back to the door.*
> >
**⟨Otherwise (V POV)⟩**

> ▸ **Say nothing.**
>
> > *She takes all four without reading the label or asking what they are. He has never seen her do that with so much as an aspirin.*
> >
> > **V:** (She knows what they are for. She would have asked, otherwise.)
> >
> ▸ **“Do you want me to read you the leaflet?”**
>
> > **Misaki:** 
> > - *tier 0:* no.
> > - *tier 1:* no. they’re vitamins.
> > - *tier 2:* No. They’re vitamins. I don’t need a leaflet for vitamins.
> > - *tier 3:* No! They’re vitamins. She said precaution. Vitamins are a precaution. Don’t read me anything.
> >
> > *She swallows them dry and holds his eye while she does it.*
> >

#### kd\_bodymap

> Plays when: day 2+ after discharge, flag kdChart set or flag kdChartV set. Aftermath order: 25 of 104. Full-story setting only.

*There is a page in the chart she hadn’t turned to. It is a printed outline of a person, front and back, with nothing on the face. The doctor has marked it in red biro, and numbered each mark, and the numbers match the photographs.*

- *if Misaki POV:* *She knows how to read a diagram. She reads floor plans for money. She sees where the red is and how the marks are grouped, and what kind of thing leaves marks grouped like that.*
- *otherwise:* *She has the page in her right hand. She reads diagrams for a living, and he watches her read this one in about a second.*

**Misaki / V — choice:** 
- *if Misaki POV:* *(Twenty-three numbered marks on a paper person.)*
- *otherwise:* *(She has gone very still.)*

**⟨If Misaki POV⟩**

> ▸ **Count the marks. Look at where they are.** — *(she is not going to)* `always greyed out`
>
> ▸ **Draw a moustache and a hat on it.**
>
> > *She gives the outline a moustache, a top hat and a speech bubble that says “hello, i’m fine.” The doctor leaves them on. The numbers are still legible underneath.*
> >
> ▸ **Tear the page out. Eat it if you have to.**
>
> > **Misaki:** 
> > - *tier 0:* that’s not me.
> > - *tier 1:* that’s not ME. that’s a drawing.
> > - *tier 2:* That isn’t me. That’s a drawing of nobody.
> > - *tier 3:* That’s not me! That’s a gingerbread man with a rash. You can’t put a gingerbread man in my file.
> >
> > *She tears it into strips. The doctor watches her do it and then says, kindly, that it can be redrawn. That is what the photographs are for.*
> >
**⟨Otherwise (V POV)⟩**

> ▸ **Take the page from her and put it back.**
>
> > *He turns the chart to the page before. She lets him. She asks whether the black hound has had her ear drops, and listens carefully to the answer.*
> >
> ▸ **Let her tear it up.**
>
> > **Misaki:** 
> > - *tier 0:* not me.
> > - *tier 1:* that’s not me. it’s a drawing.
> > - *tier 2:* That isn’t me. It’s a drawing.
> > - *tier 3:* That’s not me. It hasn’t even got a face. Anyone could be that.
> >
> > *She tears it into strips and gives him the strips, to be rid of them. He puts them in his pocket. The doctor will redraw it from the photographs.*
> >

#### kd\_photos

> Plays when: day 3+ after discharge, flag kdChart set or flag kdChartV set or flag kdCount set. Aftermath order: 28 of 104. Full-story setting only.

**⟨If Misaki POV⟩**

> *The chart said: “Back: see photographs. Do not show patient.” The envelope is in his desk, second drawer, where he keeps things he hasn’t decided about.*
>
> *She has not looked at her own back. She gets dressed facing the wall and has told herself that this is how she has always done it.*
>
> **Misaki — choice:** *(A brown envelope. Not sealed.)*
>
> ▸ **Look.**
>
> > *There are eleven photographs. She goes through all eleven the way she goes through a floor plan, and puts them back in the order she found them.*
> >
> > **Misaki:** 
> > - *tier 0:* (huh.)
> > - *tier 1:* (huh. somebody was thorough.)
> > - *tier 2:* (Somebody was thorough. That’s from the van, probably. Lot of corners in a van.)
> > - *tier 3:* (Okay. So that’s from the van. Vans have corners. Eleven photos of a girl who got thrown around in a van. That’s all that is.)
> >
> > *Three of them are not the kind of mark a van leaves, and she knows a great deal about what leaves which marks. She shuts the drawer with her hip.*
> >
> ▸ **Look, and then ask him what he thinks they are.** — *(she is not going to)* `always greyed out`
>
> ▸ **Leave it in the drawer.**
>
> > *She squares the envelope with the edge of the drawer so that he won’t know she touched it. He will know anyway.*
> >
**⟨Otherwise (V POV)⟩**

> *There are eleven photographs of her back in his desk. The doctor wrote “do not show patient.” He has looked at them once, for long enough to be sure what he was looking at.*
>
> *This morning the envelope is square with the edge of the drawer. He did not leave it square.*
>
> **V — choice:** *(She has been in the drawer.)*
>
> ▸ **Leave it where it is.**
>
> > *He leaves it. At lunch she tells him a long story about a pigeon, and watches his face the whole way through it for something she is afraid of finding.*
> >
> ▸ **Move it to the archive, where she will not come across it.**
>
> > *He files it under M. She notices that the drawer is empty and says nothing, and he notices her noticing.*
> >

#### kd\_clothes

> Plays when: day 2+ after discharge, flag kd_math set. Aftermath order: 31 of 104. Full-story setting only.

- *if Misaki POV:* *V has kept what she was wearing when she came out of that building. It is in a paper bag on the dryer, folded, with a note: “Yours to keep or burn.”*
- *otherwise:* *He has kept what she was wearing, folded, in a paper bag. He should have burned it. He puts it on the dryer with a note and leaves the room before she comes in.*

*The hoodie is hers. The shorts are not the ones she left the trailer in. They are a size too big and somebody else’s.*

▸ **Ask whose shorts they are.** — *(she is not going to)* `always greyed out`

▸ **Burn the bag.**

> *She burns it in the incinerator off the kennel corridor, hoodie and all, and stays to see that the elastic goes.*
>
> **Misaki:** 
> - *tier 0:* (it was an old hoodie.)
> - *tier 1:* (old hoodie. had a hole in it anyway.)
> - *tier 2:* (It was an old hoodie. It had a hole in the cuff.)
> - *tier 3:* (I liked that hoodie. It had a hole in the cuff I’d been meaning to fix. Whatever. It’s a hoodie.)
>
▸ **Wash the hoodie and wear it. Bin the rest.**

> *She washes it four times. On the fourth the star on the back starts to come off, and she stops.*
>
> **Misaki:** (they must’ve lost mine. it’s a warehouse. people lose stuff.)
>
**Misaki / V — choice:** 
- *if Misaki POV:* *(Not mine.)*
- *otherwise:* *(She has opened the bag. He can hear the paper.)*

**⟨Unless Misaki POV⟩**

> ▸ **Stay in the next room. Let her deal with the bag.**
>
> > *The incinerator door opens and shuts. She comes out smelling of smoke and tells him his laundry room is depressing.*
> >
> ▸ **Go in.**
>
> > **Misaki:** 
> > - *tier 0:* what.
> > - *tier 1:* what. it’s laundry.
> > - *tier 2:* What? It’s laundry. I’m doing laundry.
> > - *tier 3:* What? I’m doing laundry. They lost my shorts, V, it’s a warehouse, they’re not exactly a dry cleaner.
> >
> > **V:** (I did not ask her anything.)
> >

#### kd\_exam

> Plays when: day 2+ after discharge, flag kdCard set. Aftermath order: 32 of 104. Full-story setting only.

*The doctor comes back with one more form. It is short. There is an examination she has not done, and it needs a signature either way.*

*She explains what it would look for. Misaki listens to all of it with the face she uses for landlords.*

**Misaki / V — choice:** 
- *if Misaki POV:* *(Two boxes. Consent. Decline.)*
- *otherwise:* *(He is in the doorway. It is not his form.)*

**⟨If Misaki POV⟩**

> ▸ **Tick “consent.” Find out.** — *(she is not going to)* `always greyed out`
>
> ▸ **Tick “decline.”**
>
> > *She ticks it and signs with her right hand, slowly, and draws a small star after her name.*
> >
> > **Misaki:** 
> > - *tier 0:* no need.
> > - *tier 1:* no need. nothing to find.
> > - *tier 2:* No need. There’s nothing to find.
> > - *tier 3:* No need. Nothing happened, so there’s nothing to find, so it’s a waste of your gloves.
> >
> > *The doctor says that the form doesn’t expire. Misaki tells her that’s nice.*
> >
> ▸ **Tick “decline” and ask about her parking.**
>
> > **Misaki:** 
> > - *tier 0:* where’d u park
> > - *tier 1:* did u park on the gravel. the hounds piss on that side.
> > - *tier 2:* Did you park on the gravel? The hounds go on that side.
> > - *tier 3:* Did you park on the gravel side? The black one stands by cars it doesn’t know. Just stands. I’d go and look.
> >
> > *The doctor goes to look. The form goes into the folder with “declined” on it and a star.*
> >
**⟨Otherwise (V POV)⟩**

> ▸ **Say nothing. It is hers to sign.**
>
> > *She ticks “decline” and draws a star after her name. He files it himself, in the drawer with her medical card.*
> >
> > **V:** (She has asked me to believe that nothing happened. I can do the first half of that. I can behave as though I believe it.)
> >
> ▸ **“The form does not expire.”**
>
> > **Misaki:** 
> > - *tier 0:* ok.
> > - *tier 1:* ok. cool. don’t need it.
> > - *tier 2:* Okay. I don’t need it.
> > - *tier 3:* Okay. Good to know. I don’t need it, but good to know.
> >
> > *She ticks “decline.” She does not look at him while she does it, and she thanks him afterwards for something else.*
> >

#### kd\_recount

> Plays when: day 2+ after discharge, flag kd_math set. Aftermath order: 34 of 104. Full-story setting only.

**⟨If Misaki POV⟩**

> *The receipt in her shoe says [hours] hours. She wrote that in the kitchen with him watching.*
>
> *It isn’t [hours]. Some of those hours she has. She knows what the ceiling in the second room looked like, and she was only ever in the second room after the needle. She knows the radio got turned up first, every time.*
>
> **Misaki:** 
> - *tier 0:* (doesn’t count.)
> - *tier 1:* (that’s not remembering. that’s just. stuff.)
> - *tier 2:* (That’s not remembering. That’s just things I know.)
> - *tier 3:* (That isn’t remembering. Remembering is when you can tell it in order. I’ve got a ceiling and a volume knob. That’s nothing. That’s décor.)
>
> **Misaki — choice:** *([hours], on the receipt.)*
>
> ▸ **Cross it out. Write the real number.** — *(she is not going to)* `always greyed out`
>
> ▸ **Leave it at [hours].**
>
> > *She leaves it. “I don’t remember” is a door with a lock on her side, and she has been short of those.*
> >
> ▸ **Round it up.**
>
> > *She writes a bigger number over it, so that there is more room in there for things to not have happened in.*
> >
**⟨Otherwise (V POV)⟩**

> *She told the doctor [hours] hours. He was in the room. He has since read the note-taker’s times against what she says she was asleep for, and they do not agree: she was awake for some of it.*
>
> **V:** (She has it. Part of it. She has decided that she does not, and I am the only one who knows that she decided.)
>

#### kd\_photodeny

> Plays when: day 4+ after discharge, flag kd_photos set or flag kdPhotos set. Aftermath order: 35 of 104. Full-story setting only.

*The photographs again. Each one has a paper ruler along the bottom edge and a card with the date, the time, and a number. The doctor took them the first night, with a second person in the room to witness it, as the procedure says.*

**Misaki:** 
- *tier 0:* that’s not me.
- *tier 1:* that’s not my back. i’d know my own back.
- *tier 2:* That is not my back. I’d know.
- *tier 3:* That’s not my back. I haven’t got that mole. That could be anybody, she could have got those off the internet.

- *if Misaki POV:* *She has not seen her own back in years. She has seen it now, eleven times, and she has the mole.*
- *otherwise:* *It is her back. She has a mole there. He has seen it, once, when she fell asleep at the pool.*

**Misaki / V — choice:** 
- *if Misaki POV:* *(A ruler in every one.)*
- *otherwise:* *(She is holding them out to him to agree.)*

**⟨If Misaki POV⟩**

> ▸ **Ask why there is a ruler in every one.** — *(she is not going to)* `always greyed out`
>
> ▸ **Rip them up. All eleven.**
>
> > *She rips them across and across until the pieces are too small to tear with one hand, and then uses her teeth.*
> >
> > Those are prints. The originals are in a sealed envelope with a number on it. I am sorry. That is how it is done, so that nobody can do what you have just done.
> >
> > **Misaki:** 
> > - *tier 0:* then burn it.
> > - *tier 1:* then burn the envelope. it’s MINE. it’s my back, i say burn it.
> > - *tier 2:* Then burn it. It’s mine, isn’t it? If it’s my back, I say burn it.
> > - *tier 3:* Then burn the envelope! If it’s my back like you keep saying then it’s mine, and I say burn it — and it’s not my back, so there’s nothing to burn, so burn it.
> >
> > *She has said in one breath that it is hers and that it is not. Nobody in the room points that out.*
> >
> ▸ **Hand them back. “nice photos. wrong girl.”**
>
> > *The doctor takes them. She squares the edges and puts them in the envelope and writes the time on the flap. Everything about this has a time written on it.*
> >
**⟨Otherwise (V POV)⟩**

> ▸ **“They are in a sealed envelope. Nobody will open it unless you ask.”**
>
> > **Misaki:** 
> > - *tier 0:* i won’t ask.
> > - *tier 1:* i’m not gonna ask. bc it’s not me.
> > - *tier 2:* I won’t ask. Because it isn’t me.
> > - *tier 3:* I’m never going to ask, because it isn’t me, so you can keep your envelope till it rots.
> >
> > **V:** Then it will keep until it rots.
> >
> ▸ **“It is not your back.”**
>
> > *She lets her breath go. He has lied to her face, for her, and she thanks him for it by asking what he wants for lunch.*
> >
> > **V:** (I said it. I would say it again. I do not know any longer which of us I am protecting.)
> >
> ▸ **Tell her what the ruler is for.** — *(he is not going to do that to her)* `always greyed out`
>

#### kd\_results

> Plays when: day 5+ after discharge, flag kd_cup set. Aftermath order: 37 of 104. Full-story setting only.

*An envelope comes from the laboratory, addressed to her, marked for the addressee only. It is the standard set of tests. The doctor ran them the first night, from blood she already had to take.*

*There is a second sheet clipped to it: the same tests again in six weeks, and again in three months. Somebody has to put those dates somewhere.*

**Misaki / V — choice:** 
- *if Misaki POV:* *(It isn’t thick. One page, maybe two.)*
- *otherwise:* *(She has pushed it across the table to him with one finger.)*

**⟨If Misaki POV⟩**

> ▸ **Open it.** — *(she is not going to)* `always greyed out`
>
> ▸ **Bin it unopened.**
>
> > *She puts it in the kitchen bin under the coffee grounds. V takes the bin out that night, which he never does, and the envelope is not in the bag that goes to the kerb.*
> >
> ▸ **“u open it. tell me if i’m dying. nothing else.”** — *(not close enough / )* `greyed out when closeness tier below 2`
>
> > *He reads it standing up.*
> >
> > **V:** You are not dying.
> >
> > **Misaki:** 
> > - *tier 0:* k.
> > - *tier 1:* k. that’s all i wanted.
> > - *tier 2:* Good. That’s all I asked.
> > - *tier 3:* Good. That’s all I asked for, so that’s all you say. Not one more word off that page, ever.
> >
> > *He folds it along its own creases. The dates for six weeks and three months go into the kitchen calendar in his handwriting. He writes “dentist.”*
> >
**⟨Otherwise (V POV)⟩**

> ▸ **Read it. Tell her only whether she is dying.**
>
> > **V:** You are not dying.
> >
> > **Misaki:** 
> > - *tier 0:* k.
> > - *tier 1:* k. good. shred it.
> > - *tier 2:* Good. Shred it.
> > - *tier 3:* Good. That’s the only thing on that page I’m interested in. Shred the rest.
> >
> > *He does not shred it. He writes two dates in the kitchen calendar, six weeks and three months, and beside each he writes “dentist.”*
> >
> ▸ **Put it in the archive, sealed.**
>
> > *It goes under M, unopened, with the photographs. He writes the two follow-up dates in the calendar himself, and writes “dentist” beside them.*
> >

#### kd\_vdoc

> Plays when: day 3+ after discharge, V POV, flag kd_ask set. Aftermath order: 39 of 104. Full-story setting only.

Without her consent I can record only what is on the outside of her, and that she refused. I have done both. I cannot tell you what I think.

**V:** Is there any doubt?

I am not permitted to answer that. I have done this work for twenty years, and I do not have any doubt. I did not say so.

*She closes her bag. She has left a leaflet on the table, face down, in case he wants to know how to be useful. He reads it four times in the night.*

**V — choice:** *(The leaflet says, in bold: do not push.)*

▸ **Do as the leaflet says.**

> *He does not push. It is the hardest thing the leaflet could have asked of a man like him, and it is the only thing it asks.*
>
▸ **Go downstairs and sharpen every knife on the table.**

> *There are forty-one. He does them by hand, to the same angle. When he comes up at dawn she asks why he smells of oil, and he says that he was restless.*
>

#### kd\_last

> Plays when: Misaki POV, flag kd_window set, day 3+ after discharge. Aftermath order: 40 of 104. Full-story setting only.

*Saturday. V has taken all four hounds to the river, because she told him they were getting fat. The house is empty apart from the doctor, who has come to ask for the last time.*

After today it would not show, and I stop asking. So: once more.

**Misaki — choice:** *(Nobody else is in the house.)*

**⟨If `kdCanTell()`⟩**

> ▸ **Answer the question.** — *(the house is empty)*
>
> > One person knows. It is in a file with a number on it and no name, and it is not in his house.
> >
> > *She opens her mouth to say that nothing happened. She has said it nine times, and it has come out every time.*
> >
> > *It does not come out. Her face does a thing she has not let it do since she was sixteen on a station bench. Then she is bent over the side of the bed with her good hand across her eyes, making a noise she did not know she had.*
> >
> > I am here. Take as long as it takes. I have nowhere to be.
> >
> > **Misaki:** i know what they did. i’ve known since the car. i can do a fucking sum, i’m not stupid, i know EXACTLY what—
> >
> > **Misaki:** he doesn’t find out. V. nobody does. not the chart he reads, not his archive, not angel. if he ever knows i said it— it’s the one thing left that’s only mine. promise me or get out.
> >
> > He pays my fee. You are my patient. Those are two different things, and I have never confused them. There will be a second file with a number on it and no name. It will not be kept in this house.
> >
> > **Misaki:** ...ok. then yes. the answer’s yes. do it. all of it. then ask me the rest.
> >
> > *It takes fifty minutes. She counts the hounds through it, out loud this time. Afterwards she answers eleven questions, and the doctor writes down what she says without putting it in quotation marks.*
> >
> > *The white box leaves the house in the doctor’s bag, under two tubs of soup.*
> >
> > *When V comes back with the hounds, she has washed her face and is on the couch with the controller. She asks what’s for dinner. He sees that her eyes are red. She says it is the hound hair, and he has no reason to think otherwise.*
> >
**⟨Otherwise⟩**

> ▸ **Answer the question.** — *(she is not going to)* `always greyed out`
>
▸ **“nothing happened.” One more time.**

> *It comes out, the tenth time, as easily as the first. The doctor writes it down in quotation marks and closes the folder.*
>
> Then I have finished asking. The form does not expire. I mean that.
>
▸ **Look at the kitchen clock until it’s four.**

> *She watches the minute hand for an hour and ten minutes and does not speak. At four the doctor stands up, and Misaki says “well,” and that is all either of them says.*
>

#### kd\_told\_box

> Plays when: she told the doctor (hidden route), flag kdKit set. Aftermath order: 41 of 104. Full-story setting only.

*The white box is gone from the infirmary fridge a day before its date. V notices the gap, and decides that the doctor must have wanted the shelf.*

**Misaki:** 
- *tier 0:* more room for soup.
- *tier 1:* more room for soup. finally.
- *tier 2:* Good. More room for soup.
- *tier 3:* Good. More room for soup. I told her that shelf was wasted.

*She says it exactly as she would have said it. That is the hard part, and she is good at it.*

#### kd\_kitgone

> Plays when: day 3+ after discharge, flag kdKit set, she has not told the doctor, (flag kd_last set or V POV). Aftermath order: 42 of 104. Full-story setting only.

*The white box has gone from the bottom shelf of the infirmary fridge. The date on it was yesterday. Somebody has wiped the shelf.*

**Misaki:** 
- *tier 0:* more room for soup.
- *tier 1:* more room for soup. good.
- *tier 2:* Good. More room for soup.
- *tier 3:* Good. That shelf was wasted. You can get four tubs on there now.

- *if Misaki POV:* *She counted the five days. She could tell anyone the hour that it ran out, and she isn’t going to.*
- *otherwise:* *She counted the five days. He watched her do it, a finger at a time, on the hand that works.*

#### kd\_wash

> Plays when: day 3+ after discharge, flag kd_math set, Misaki POV. Aftermath order: 44 of 104. Full-story setting only.

*She has three washes: one for the job, one for the walk home, one for luck. Tonight she is on the fifth, and the water has gone cold, and she is still under it.*

**Misaki:** 
- *tier 0:* (just cold. i like it cold.)
- *tier 1:* (i like it cold. it’s good for u. athletes do it.)
- *tier 2:* (I like it cold. Athletes do it. It’s good for you.)
- *tier 3:* (It’s cold therapy. Athletes pay for this. I’m not scrubbing anything off, there’s nothing on me, I’m doing sports science.)

*V has turned the boiler up twice from the hall without saying so. The towel outside the door is warm when she gets to it.*

#### kd\_smell

> Plays when: day 4+ after discharge, flag kd_math set. Aftermath order: 45 of 104. Full-story setting only.

- *if Misaki POV:* *The man ahead of her in the corner shop queue is wearing a cologne. She doesn’t know it. Her stomach does.*
- *otherwise:* *She is beside him in the corner shop queue when the man ahead of them turns round. He is nobody. He smells of some cologne.*

- *if Misaki POV:* *She is outside, being sick into the bin by the ashtray, before she has decided to leave the queue.*
- *otherwise:* *She is outside before the door chime has finished, being sick into the bin by the ashtray.*

**Misaki:** 
- *tier 0:* bad sandwich.
- *tier 1:* bad sandwich. the tuna’s off. tell them.
- *tier 2:* Bad sandwich. The tuna’s off. Somebody should tell them.
- *tier 3:* It’s the tuna. I’m telling you, the tuna’s off, they leave it out. I’m fine, get off, it’s food poisoning.

- *if Misaki POV:* *She had not eaten the sandwich yet. It is still in her pocket, in its wrapper.*
- *otherwise:* *She has not eaten anything today. He has been counting. He buys a bottle of water and agrees that it was the tuna.*

#### kd\_notask

> Plays when: day 4+ after discharge, flag kdAngelSees set or Angel friendship 2+. Aftermath order: 46 of 104. Full-story setting only.

**Angel:** babe. can i ask you one thing. just one, and then never again.

**Misaki:** 
- *tier 0:* no.
- *tier 1:* nope. do my nails instead.
- *tier 2:* No. Do my nails instead.
- *tier 3:* No. Whatever it is, no. Do my nails. The right hand, the left one’s booked.

**Angel:** ...okay. your way. give me the hand.

- *if Misaki POV:* *Angel does the nails in pink, with a small knife on the thumb. She doesn’t ask. Her own hands shake for the first two fingers and then they stop.*
- *otherwise:* *V watches from the kitchen. Angel looks up at him once over Misaki’s head, and he shakes his head, and she goes back to the thumb.*

#### kd\_vknows

> Plays when: day 5+ after discharge, V POV, flag kd_math set. Aftermath order: 47 of 104. Full-story setting only.

*He knows what the second page says. He has known for a week. She knows that he knows, and has arranged every conversation since so that it cannot come up.*

**V — choice:** *(She is on the roof with a hound on each foot.)*

▸ **Sit down beside her and talk about the hounds.**

> *They talk about the black hound’s jaw, and the plate he put in it, for forty minutes. It is the conversation she wants. He gives it to her, and hates how well it works.*
>
▸ **“I will not ask you. I want you to know that I would hear it.”**

> **Misaki:** 
> - *tier 0:* hear what.
> - *tier 1:* hear what? there’s nothing.
> - *tier 2:* Hear what? There’s nothing to hear.
> - *tier 3:* Hear what? Nothing happened, V. I’d tell you. I tell you everything, I told you about the pigeon.
>
> **V:** Then I have misunderstood. Tell me about the pigeon again.
>
> *She tells him about the pigeon again. Her good hand is holding the old hound’s collar so hard that the hound looks up at her.*
>
▸ **Say what the second page says.** — *(he is not going to do that to her)* `always greyed out`

#### kd\_slip

> Plays when: day 4+ after discharge, flag kdHas set. Aftermath order: 48 of 104. Full-story setting only.

*The four of them are at the table. Ronin is telling a story about a man who kept his radio on while he worked.*

**Misaki:** 
- *tier 0:* they always turn it up first.
- *tier 1:* oh yeah they always turn it up first, so nobody—
- *tier 2:* They always turn it up first, so that nobody down the hall—
- *tier 3:* Oh, they always turn it up first. So that the ones down the hall can say they didn’t—

*She stops. Angel’s fork has stopped as well. It is a detail from the hours she has told every person at this table she was asleep for.*

**Misaki / V — choice:** 
- *if Misaki POV:* *(Three people are not looking at you.)*
- *otherwise:* *(She is looking at her plate.)*

**⟨If Misaki POV⟩**

> ▸ **Finish the sentence.** — *(she is not going to)* `always greyed out`
>
> ▸ **“...in movies. they do that in movies.”**
>
> > **Ronin:** Yeah. Movies. Sure.
> >
> > *Ronin finishes his story with a different ending from the one it had. Under the table, a hound puts its whole head on her foot.*
> >
> ▸ **Get up. The hounds need walking.**
>
> > *She walks all four hounds at once, at eleven at night, in the rain. When she comes back the dishes are done and nobody is in the kitchen, by arrangement.*
> >
**⟨Otherwise (V POV)⟩**

> ▸ **Ask Ronin to pass the rice.**
>
> > **V:** Ronin. The rice.
> >
> > **Ronin:** ...Yeah. Rice. Catch.
> >
> > *She breathes out. She finds his foot under the table and stands on it, lightly. It is the nearest she will come to thanking him.*
> >
> ▸ **Say nothing.**
>
> > **Misaki:** 
> > - *tier 0:* what.
> > - *tier 1:* what. it’s a thing people do. in movies.
> > - *tier 2:* What? It’s a thing people do. In films.
> > - *tier 3:* What? Everybody knows that. It’s in every film. Stop looking at me, all of you, eat.
> >
> > *They eat.*
> >
> ▸ **Ask her how she knows that.** — *(he is not going to do that to her)* `always greyed out`
>

#### kd\_sleeptalk

> Plays when: day 5+ after discharge, flag kd_math set, closeness tier 2+. Aftermath order: 49 of 104. Full-story setting only.

**⟨If Misaki POV⟩**

> *She wakes at four with her throat sore, the way it was in the cell after she’d been talking. V is in the chair by the door with a book he isn’t reading.*
>
> **Misaki:** 
> - *tier 0:* did i say anything.
> - *tier 1:* did i say anything. in my sleep.
> - *tier 2:* Did I say anything? In my sleep?
> - *tier 3:* Did I say anything? Just now. Whatever it was, I didn’t mean it, I was asleep.
>
> **V:** You counted. The grey hound, the old hound, the black hound, the pale hound.
>
> *It’s true. He has left out what came between the names.*
>
> **Misaki — choice:** *(He is being careful.)*
>
> ▸ **“and what else.”** — *(she is not going to)* `always greyed out`
>
> ▸ **“lol. classic.”**
>
> > *She turns over. He stays in the chair until it is light, and then makes a noise with the door so that she can pretend he has just come in.*
> >
> ▸ **“go to bed, creep.”**
>
> > **V:** Presently.
> >
> > *He does not go to bed. She did not want him to.*
> >
**⟨Otherwise (V POV)⟩**

> *At four she is talking in her sleep. He sits in the chair by the door and hears all of it. Between the hounds’ names there are other words, and she says them politely, the way she talks to landlords.*
>
> **Misaki:** 
> - *tier 0:* did i say anything.
> - *tier 1:* did i say anything. in my sleep.
> - *tier 2:* Did I say anything? In my sleep?
> - *tier 3:* Did I say anything? Whatever it was, I didn’t mean it.
>
> **V — choice:** *(She wants one answer.)*
>
> ▸ **“You counted the hounds.”**
>
> > **Misaki:** 
> > - *tier 0:* lol.
> > - *tier 1:* lol. classic me.
> > - *tier 2:* Classic.
> > - *tier 3:* Classic. I’m very consistent.
> >
> > *It is true, as far as it goes. He writes the rest on no page at all.*
> >
> ▸ **“Nothing that I could make out.”**
>
> > *That one is a lie, and she takes it gratefully. He is surprised how easily he said it.*
> >
> ▸ **Repeat it to her.** — *(he is not going to do that to her)* `always greyed out`
>

#### kd\_shop

> Plays when: day 5+ after discharge, flag kd_clothes set, Angel friendship 1+. Aftermath order: 55 of 104. Full-story setting only.

*Angel takes her shopping. She had six pairs of shorts and wore them in February. She walks past the shorts.*

- *if Misaki POV:* *Everything she picks is two sizes too big and has a drawstring she can knot.*
- *otherwise:* *She comes home with four bags. Everything in them is two sizes too big and ties at the waist with a knot.*

**Misaki:** 
- *tier 0:* new look.
- *tier 1:* new look. it’s called comfort. look it up.
- *tier 2:* It’s a new look. It’s called being comfortable.
- *tier 3:* It’s a look. Oversized is in. I read it somewhere. You wouldn’t know, you’ve worn the same coat since the war.

**Angel:** 
- *if Misaki POV:* it’s a great look. i’m paying. don’t argue, i’m armed.
- *otherwise:* (to V, later, in the kitchen) i didn’t ask. i paid and i didn’t ask. i want a medal.

#### kd\_dentist

> Plays when: Act II or later, she has not told the doctor, flag kdRes set, day 10+ after discharge. Aftermath order: 73 of 104. Full-story setting only.

*The kitchen calendar says “dentist” today, in his handwriting. It is the six-week date.*

- *if Misaki POV:* *She drives herself. The clinic is on the second floor, above a pharmacy.*
- *otherwise:* *She says she will drive herself. He lets her.*

**Misaki / V — choice:** 
- *if Misaki POV:* *(The car park. Engine off.)*
- *otherwise:* *(She has been gone three hours for a twenty-minute appointment.)*

**⟨If Misaki POV⟩**

> ▸ **Go up.** — *(she is not going to)* `always greyed out`
>
> ▸ **Sit in the car for the length of an appointment. Go home.**
>
> > *She sits in the car park for fifty minutes with her hands on the wheel. Then she drives home and tells him: no cavities.*
> >
> > **V:** I am glad.
> >
> > *He rings the clinic at six to move the appointment to next week. He will move it every week.*
> >
> ▸ **Go up. Give the blood. Don’t collect the result.**
>
> > *She goes up. She gives a false name at the desk and the nurse, who has her real one, writes down the false one. It takes four minutes.*
> >
> > **Misaki:** 
> > - *tier 0:* (done. dentist. done.)
> > - *tier 1:* (that’s done. i went to the dentist.)
> > - *tier 2:* (That’s done. I’ve been to the dentist.)
> > - *tier 3:* (Done. I went to the dentist. I’m never ringing for the result, but I went, and nobody can say I didn’t.)
> >
> > *It is the nearest she has come. The result is posted to the house, and she lets it go in the archive without touching it.*
> >
**⟨Otherwise (V POV)⟩**

> ▸ **Ask her how the dentist was.**
>
> > **Misaki:** 
> > - *tier 0:* no cavities.
> > - *tier 1:* no cavities. flawless.
> > - *tier 2:* No cavities. She was impressed.
> > - *tier 3:* No cavities. She said I’ve got the teeth of a much younger woman. Well. Most of them.
> >
> > *Her appointment was never checked in. He knows, because the clinic rang him. He says that he is glad about the cavities.*
> >
> ▸ **Do not ask.**
>
> > *He does not ask. She tells him anyway, about the cavities, in more detail than a person would who had been.*
> >

#### kd\_told\_dentist

> Plays when: she told the doctor (hidden route), Act II or later, flag kdRes set, day 10+ after discharge. Aftermath order: 74 of 104. Full-story setting only.

*The calendar says “dentist.” She drives herself, goes up the stairs above the pharmacy, and gives her own name at the desk.*

*The result goes to a post-office box the doctor rents. She reads it standing at the box, once, and burns it in the car ashtray.*

**Misaki:** (ok. ...ok.)

*At home she tells V: no cavities. He says that he is glad. Both things are true, and he only knows about one of them.*

#### kd\_told\_sleep

> Plays when: she told the doctor (hidden route), Act II or later, day 8+ after discharge. Aftermath order: 75 of 104. Full-story setting only.

*She sleeps six hours and tells people six.*

*She still says “fine.” She still walks round it like the low beam in the trailer. Once a month she is forty minutes late back from walking the hounds, and smells faintly of a waiting room, and V puts it down to the weather.*

#### kd\_later

> Plays when: day 9+ after discharge, Act II or later, denial 3+. Aftermath order: 76 of 104. Full-story setting only.

- *if Misaki POV:* *It has been weeks. She hasn’t said it, and by now there is a way of walking round it that she does without thinking, like the low beam in the trailer.*
- *otherwise:* *It has been weeks. She has not said it. She goes round it the way she goes round the low beam in her trailer, without looking.*

- *if Misaki POV:* *She sleeps four hours and tells people six. She laughs at the right places a quarter of a second late. Nobody but V could time it.*
- *otherwise:* *She sleeps four hours and tells him six. She laughs at the right places a quarter of a second late. He has timed it.*

**Misaki:** 
- *tier 0:* i’m fine.
- *tier 1:* i’m FINE. ask me again and i’ll bite.
- *tier 2:* I’m fine. Ask again and I’ll bite you.
- *tier 3:* I’m fine. I’m great, actually. I’m thriving. Ask me again and I’ll bite you, and I’ve got two teeth fewer to do it with, so it’ll be personal.

**V:** (She will carry on like this until it kills her. It is on no list of mine, and there is nobody I can take it out of.)

#### kd\_draft

> Plays when: after discharge from the infirmary, flag kd_math set, fewer than four drafts so far, once a day, closeness tier 1+. Full-story setting only.

**⟨If `n<3`⟩**

> **Misaki / V (text):** 
> - *if Misaki POV:* 03:[number] · draft, not sent: “[KD\_DRAFT[n]]”
> - *otherwise:* 03:[number] · hitmeuppp is typing… · stopped
>
> 
> - *if Misaki POV; 1 of 3 (by n):* *At twenty to four she types half a sentence to him and looks at it until the screen dims. Then she holds the delete key down.*
> - *if Misaki POV; 2 of 3 (by n):* *The next night she gets three words in.*
> - *if Misaki POV; 3 of 3 (by n):* *Tonight it is his initial and a full stop.*
> - *otherwise; 1 of 3 (by n):* *At twenty to four the three dots come up under her name. They stay for six minutes. Then they go, and nothing arrives.*
> - *otherwise; 2 of 3 (by n):* *The dots again, at the same hour, for less time.*
> - *otherwise; 3 of 3 (by n):* *The dots come up and go at once. He has started keeping the telephone face up on his chest.*
>
**⟨Otherwise⟩**

> **Misaki (text):** did u feed prickles
>
> **V (text):** I do not water Prickles. That is why he is alive. Go to sleep.
>
> 
> - *if Misaki POV:* *On the fourth night she sends him something. It is about the cactus.*
> - *otherwise:* *On the fourth night a message arrives. It is about the cactus. He answers it as if it were the message she meant.*
>

#### (kd\_draft, continued) The drafts

> Part of kd_draft: the unsent drafts, shorter each night.

V. i think when i was under they

V. i think

#### Topic: “what’d the doctor tell u” (kd\_second)

> Offered when: after discharge from the infirmary, closeness tier 2+, flag kd_math set. Talk topic: Misaki talks to V (Misaki’s POV). Full-story setting only.

**V:** She told me what is on the first page. There is a second page. I have read it. I will tell you what is on it if you ask me to.

**Misaki — choice:** *(The second page.)*

▸ **“tell me.”** — *(she is not going to)* `always greyed out`

▸ **“nah. bet it’s boring.”**

> **V:** It is not boring.
>
> **Misaki:** 
> - *tier 0:* ok well.
> - *tier 1:* ok well. keep it then.
> - *tier 2:* Okay. Well. Keep it, then.
> - *tier 3:* Okay. Well. Hang on to it for me, then. Somewhere I won’t trip over it.
>
> *He puts his hand flat on the table, near hers, and leaves it there.*
>
▸ **“is there soup left”**

> **V:** There is soup left.
>
> *He heats it. She eats it standing up at the counter with her back to the wall, and he does the crossword and does not fill in seven down.*
>

#### Topic: “Do you want to know what I know?” (kd\_second)

> Offered when: after discharge from the infirmary, closeness tier 2+, flag kd_math set. Talk topic: V talks to Misaki (V’s POV). Full-story setting only.

**Misaki:** 
- *tier 0:* no.
- *tier 1:* no. about what. no.
- *tier 2:* No. About what? No.
- *tier 3:* No. I don’t even know what you mean, and no.

**V:** Very well. It will keep.

**Misaki:** 
- *tier 0:* k.
- *tier 1:* k. good. ...don’t write it in the notebook.
- *tier 2:* Good. Don’t put it in the notebook.
- *tier 3:* Good. And don’t write it in the notebook with my quotes. That one’s for the stuff I said on purpose.

**V:** It is not in the notebook.

#### Thread: Misaki and V (tx\_kd\_sleep)

> Plays when: after discharge from the infirmary, denial 2+, closeness tier 1+. Full-story setting only.

`message start`

**V:** You slept from 02:10 to 05:50. That is three hours and forty minutes.

**V:** You told Angel that you slept eight.

▸ **Misaki:** **“creep”**

> **V:** Yes.
>
> **V:** There is tea on the stairs outside your door. I am not outside your door. I am on the stairs.
>
▸ **Misaki:** **“i sleep fine”**

> **V:** You sleep for three hours and forty minutes and you are fine. I have written both down.
>
▸ **Misaki:** **“come sit on the stairs then”**

> **V:** I am already on the stairs.
>
> **V:** You need not talk. I have the crossword.
>

#### Thread: Misaki and Angel (tx\_kd\_ask)

> Plays when: after discharge from the infirmary, flag kd_notask set, Angel friendship 1+. Full-story setting only.

`message start`

**Angel:** not asking. i said i wouldn’t and i’m not

**Angel:** but if there’s ever a 3am where u want to say a thing to someone who’ll forget it by breakfast

**Angel:** i’m very stupid at 3am. famously. i retain nothing

▸ **Misaki:** **“nothing to say”**

> **Angel:** ok
>
> **Angel:** offer’s got no expiry. like the heartsick angel’s grudges
>
▸ **Misaki:** **“...ok. noted”**

> **Angel:** noted is fine
>
> **Angel:** noted is the most i’ve ever got out of u. i’m framing it
>
▸ **Misaki:** **“can u bring the bad snacks”**

> **Angel:** already in the car. ronin’s driving. he has a list of men and a list of snacks and he’s doing the snacks first, which i think is growth
>

#### Thread: V and Misaki (tx\_kd\_vdots)

> Plays when: after discharge from the infirmary, kdDraft ≥ 2, closeness tier 1+. Full-story setting only.

`message start`

**Misaki:** hey

**Misaki:** do u ever start typing smth and then its like. why

▸ **V:** **“Often. I have a draft that says only ‘Stay.’”**

> **Misaki:** lol
>
> **Misaki:** who was that for
>
> **Misaki:** dont answer. i know who that was for
>
> <small>→ goes to “two”</small>
>
▸ **V:** **“What were you typing?”**

> **Misaki:** nothing. cactus stuff
>
> <small>→ goes to “two”</small>
>
`message two`

**Misaki:** if i ever sent u half a sentence. would u be normal about it

▸ **V:** **“I would read the half that arrived.”**

> **Misaki:** ok
>
> **Misaki:** ok. good
>
> **Misaki:** im not sending one. just checking
>
▸ **V:** **“I would not be normal. I would be on the stairs.”**

> **Misaki:** ur always on the stairs
>
> **Misaki:** ...its fine. i like knowing where the stairs are
>

#### Thread: Misaki and Ronin (tx\_kd\_ronsoft)

> Plays when: after discharge from the infirmary, Ronin friendship 1+, denial 3+. Full-story setting only.

`message start`

**Ronin:** left soup on your step. it’s from a can, don’t get ideas

**Ronin:** fixed the step too. it was loose and it was pissin’ me off

▸ **Misaki:** **“why are u being nice. stop it. who told u”**

> **Ronin:** nobody told me shit
>
> **Ronin:** ain’t nothin’ t’tell. right
>
> **Ronin:** right?
>
> <small>→ goes to “two”</small>
>
▸ **Misaki:** **“thanks”**

> **Ronin:** don’t make it weird
>
> **Ronin:** ain’t nothin’ t’tell anyway. right
>
> <small>→ goes to “two”</small>
>
`message two`

**Ronin:** right?

▸ **Misaki:** **“right”**

> **Ronin:** right
>
> **Ronin:** good
>
> **Ronin:** you look like shit and you owe me twenty dollars
>
▸ **Misaki:** **“right. now be an asshole again”**

> **Ronin:** you look like shit, you owe me twenty dollars, and I spat in the soup
>
> **Ronin:** better?
>
> **Ronin:** there she is
>

#### Thread: Misaki and V (tx\_kd\_docstop)

> Plays when: after discharge from the infirmary, flag kd_ask set, closeness tier 1+. Full-story setting only.

`message start`

**V:** The doctor will be here at ten.

▸ **Misaki:** **“tell her to stop ASKING”**

> **V:** She is required to ask. She will stop on Saturday.
>
> **V:** I can be in the room or out of it. Tell me which.
>
> <small>→ goes to “two”</small>
>
▸ **Misaki:** **“i’ll be out”**

> **V:** On that foot.
>
> **V:** Very well. I will tell her you are walking the hounds. She will leave the cup.
>
> <small>→ goes to “two”</small>
>
`message two`

**V:** Is there anything you want me to tell her?

▸ **Misaki:** **“tell her nothing happened”**

> **V:** I will tell her that you said so.
>
> **V:** (he has put it in quotation marks, the way she did)
>
▸ **Misaki:** **“tell her thanks for the vitamins”**

> **V:** I will tell her.
>
> **V:** They are working. You may take that as you like.
>

### 3.11 Injuries only: the recovery

> These exist only in the injuries-only setting. No doctor, no denial.

#### The small fridge (injuries only)

> Injuries-only setting: the small fridge (no white box).

The small fridge

*Soup, in eleven tubs, labelled by day in fountain pen. Two bags of saline. A box of the dressings for her wrists, half used, and a note on it: “Order more. She goes through them.”*

#### Spot: Their notes (injuries only)

> Shown when: The injuries-only setting’s version of this infirmary spot..

*“Back: lacerations, see photographs. L foot: fracture. Wrists: ligature wounds, both, to the tendon. Scalp: 14 sutures. Two molars. Weight: minus 7 kg.”*

**Misaki:** (that’s me. that’s my week. ok.)

*She reads it the way she reads a contract: what is broken, what it costs, how long. She adds a line at the bottom in pencil: “L hand: 3rd time.”*

#### Spot: Your chart (injuries only)

> Shown when: The injuries-only setting’s version of this infirmary spot..

*Her own pencil note is still at the bottom: “L hand: 3rd time.” Under it, in fountain pen, V has written: “When were the first two?”*

*Under that, in pencil: “dunno. before i was counting.”*

#### Spot: The mirror (injuries only)

> Shown when: The injuries-only setting’s version of this infirmary spot..

**⟨If flag kdMirror set⟩**

> **Misaki:** (swelling’s down on the eye. jaw’s going yellow. yellow’s the good colour.)
>
**⟨Otherwise⟩**

> *She takes the towel down herself and has a proper look: the shaved patch and the fourteen stitches, the eye, the jaw, the gap where two teeth were.*
>
> **Misaki:** 
> - *tier 0:* (could be worse.)
> - *tier 1:* (could be worse. has been.)
> - *tier 2:* (It could be worse. It has been.)
> - *tier 3:* (I’ve looked worse. I don’t remember when, but I know the face I make at it. That’s the face. I’ve made it before.)
>
> *She puts the towel in the laundry. She doesn’t need it.*
>

#### Spot: Treatment trolley (injuries only)

> Shown when: The injuries-only setting’s version of this infirmary spot..

**⟨If `(S.done.kdRxN||0)>=2`⟩**

> **Misaki:** (two’s the limit. he says more is showing off.)
>
**⟨Otherwise⟩**

> **⟨If `!did('dress')`⟩**
>
> > ▸ **Dressings: wrists and back** — *(healing)*
> >
> > > *V does the wrists. She talks him through it, because she has dressed wrists before: “not that tape, it pulls. the paper one.”*
> > >
> > > **V:** Who taught you this?
> > >
> > > **Misaki:** 
> > > - *tier 0:* nobody.
> > > - *tier 1:* nobody. u figure it out.
> > > - *tier 2:* Nobody. You work it out.
> > > - *tier 3:* Nobody taught me. You do it wrong a few times and then you do it right. I was probably eight. Hand me the paper one.
> > >
> **⟨If `!did('pins')`⟩**
>
> > ▸ **Clean the pin sites** — *(hold still · healing)*
> >
> > > <small>→ hold-still minigame</small>
> > >
> > > 
> > > - *if success:* *She keeps the hand flat and still and watches him swab round each pin, with interest, like it’s somebody else’s homework.*
> > > - *otherwise:* *The hand jumps when the swab catches. She says “ow, fuck,” in a normal voice, and holds it still for the rest.*
> > >
> > > `bad` It catches.
> > >
> **⟨If `!did('pills')`⟩**
>
> > ▸ **Painkillers** — *(two white tablets)*
> >
> > > *She takes them and says thank you. She takes painkillers when she is in pain.*
> > >
> **⟨If `!o.length`⟩**
>
> > **Misaki:** (done for today.)
> >
> **⟨Otherwise⟩**
>
> > **Misaki — choice:** *(V does the dressings. Two things a day.)*
> >
> > ▸ **Not now**
> >

#### Spot: The monitor (injuries only)

> Shown when: The injuries-only setting’s version of this infirmary spot..

*Pulse [number], temperature 38.[number]. When V asks for a number out of ten she says six, and then, because he waits, seven.*

**Misaki:** (it’s a seven. sevens are fine. sevens go down.)

#### Spot: The lightbox

> Shown when: injuries-only setting, she knows where she is (clarity 2+).

**⟨If flag kdOld set⟩**

> *The films are still up. Five breaks from this week, and four older ones, already healed, that nobody ever set.*
>
**⟨Otherwise⟩**

> *V has put her films up on the lightbox: the hand, the ribs, the foot. The breaks from this week are bright and new.*
>
> *There are others. The same hand, broken twice before and healed crooked without a cast. Two ribs on the right that knitted lumpy. A line in the left forearm. None of them was ever set. All of them happened before she was old enough to have a medical record, because she doesn’t have one.*
>
> **V:** Misaki. How old were you?
>
> **Misaki:** 
> - *tier 0:* dunno.
> - *tier 1:* dunno. small.
> - *tier 2:* I don’t know. Small.
> - *tier 3:* Don’t know. Little. They’re from before. I don’t have before. It’s fine, they healed, look, they’re all healed.
>
> *She is right: they all healed. He looks at them for the rest of the afternoon, after she has gone to sleep.*
>

#### Spot: Walk the corridor

> Shown when: injuries-only setting, she knows where she is (clarity 2+).

**⟨If already done today⟩**

> **Misaki:** (did my laps. foot says that’s it.)
>
**⟨Otherwise⟩**

> *Laps of the sublevel-two corridor in the boot, one hand on the rail. [number] today.*
>
> **Misaki:** 
> - *if kdLaps ≥ 3:* (faster than yesterday. the foot’s doing its job. good foot.)
> - *otherwise:* (slow. it’s fine. slow is how it goes for the first bit. i know how it goes.)
>

#### kd\_rec\_list

> Plays when: day 1+ after discharge. Aftermath order: 10 of 104. Injuries-only setting only.

- *if Misaki POV:* *V asks how she is. She tells him, in order, the way she would report a job.*
- *otherwise:* *He asks how she is. She tells him, in order, the way she reports a job.*

**Misaki:** 
- *tier 0:* hand, ribs, foot, wrists, teeth.
- *tier 1:* hand’s broken, ribs are broken, foot’s broken, wrists are cut up, two teeth gone. eating’s fine.
- *tier 2:* Hand, three ribs, foot, both wrists, two teeth. I’m eating fine. Sleeping fine.
- *tier 3:* Left hand, third time. Three ribs, second time I think. Foot, first time, so that’s new. Wrists, teeth. Eating, sleeping, fine. Any questions.

**V:** “Third time.”

**Misaki:** 
- *tier 0:* ya.
- *tier 1:* yeah. it’s a bad hand.
- *tier 2:* Yes. It’s an unlucky hand.
- *tier 3:* Yeah. It’s a bad hand. It goes. It’s gone before. You set it this time, so it’s already doing better than the other two.

- *if Misaki POV:* *She says it the way you’d say it was going to rain. He writes it down, and his pen goes through the paper on “third.”*
- *otherwise:* *She says it the way you would say it was going to rain. He writes it down, and his pen goes through the paper on “third.”*

#### kd\_rec\_stitches

> Plays when: day 2+ after discharge. Aftermath order: 11 of 104. Injuries-only setting only.

- *if Misaki POV:* *The scalp stitches are ready. She takes them out herself in the bathroom with nail scissors and tweezers, by feel, in about four minutes.*
- *otherwise:* *He finds her in the bathroom with nail scissors, taking out her own scalp stitches by feel. She has done eleven of the fourteen.*

*Under the new line, along the hairline, there are three old ones. Thin, white, years old, and badly done, as if somebody had closed them in a hurry with whatever was there.*

**Misaki:** 
- *tier 0:* done.
- *tier 1:* done. easy.
- *tier 2:* Done. Easy.
- *tier 3:* Done. I’m quick at these. I’ve done my own before, I think. My hands know where the knots are.

**Misaki / V — choice:** 
- *if Misaki POV:* *(Three old ones, under the new one.)*
- *otherwise:* *(Three old scars, under the new one.)*

**⟨If Misaki POV⟩**

> ▸ **Show V how fast you are.**
>
> > *She shows him the last three. He watches the scissors and not her face, and asks, carefully, who did the old ones.*
> >
> > **Misaki:** 
> > - *tier 0:* me probably.
> > - *tier 1:* me, probably. they’re bad enough.
> > - *tier 2:* Me, probably. They’re bad enough to be mine.
> > - *tier 3:* Me, probably. They’re bad enough to be mine. Or someone who didn’t care. Same result.
> >
> ▸ **Put the scissors away and keep it to yourself.**
>
> > *She drops the stitches in the bin. Nobody asked, and she doesn’t think of it as something anyone would ask about.*
> >
**⟨Otherwise (V POV)⟩**

> ▸ **Hold the mirror for the last three.**
>
> > *He holds the mirror. She does the last three without hurrying. He keeps his eyes on the old scars, and she lets him.*
> >
> ▸ **Ask who did the old ones.**
>
> > **Misaki:** 
> > - *tier 0:* dunno.
> > - *tier 1:* dunno. before.
> > - *tier 2:* I don’t know. Before.
> > - *tier 3:* Before. Somebody who was in a hurry, or me. It doesn’t matter. They closed.
> >
> > **V:** (It matters to me.)
> >

#### kd\_rec\_ronin

> Plays when: day 2+ after discharge, Ronin friendship 1+. Aftermath order: 12 of 104. Injuries-only setting only.

**Ronin:** Brought you a get-well basket. Vet painkillers, three beers, a cookie shaped like a crowbar. Don’t cha cry.

**Misaki:** what’d the cookie cost

**Ronin:** A guy. So, what’s the damage? Gimme the tally.

**Misaki:** 
- *tier 0:* hand ribs foot wrists teeth.
- *tier 1:* hand, three ribs, foot, wrists, two teeth.
- *tier 2:* Hand, three ribs, foot, both wrists, two teeth.
- *tier 3:* Hand, three ribs, foot, wrists to the tendon, two teeth. And the hand’s the third time, so it doesn’t count, it’s a repeat.

**Ronin:** Aw, that’s nothin’. I had a broken back once. Sat up the next day, had a cigarette. Third time for the hand, what, since when?

**Misaki:** 
- *tier 0:* since before.
- *tier 1:* since before. little.
- *tier 2:* Since I was little.
- *tier 3:* Since before I was counting. I was little. It heals funny now, it’s used to it.

*Ronin opens one of the beers and doesn’t drink it. He tells a story about the broken back instead, and the story gets longer and stupider the whole way through, until she is laughing through her nose and holding her ribs.*

#### kd\_rec\_angel

> Plays when: day 3+ after discharge, Angel friendship 1+. Aftermath order: 13 of 104. Injuries-only setting only.

*Angel cuts her hair around the shaved patch, so that it looks like she meant it.*

**Angel:** does it hurt

**Misaki:** 
- *tier 0:* yeah. normal amount.
- *tier 1:* yeah. a normal amount.
- *tier 2:* Yes. A normal amount.
- *tier 3:* Yeah. It hurts a normal amount. The head’s nothing, it’s the ribs, every time I breathe in. That’s normal for ribs.

**Angel:** what’s a normal amount for you

**Misaki:** 
- *tier 0:* ...more than u.
- *tier 1:* more than for you probably.
- *tier 2:* More than for you, probably.
- *tier 3:* More than yours, I think. I didn’t know that until I said it. Is that bad? Don’t answer, cut.

*Angel cuts. Her hands are perfectly steady, and she doesn’t speak again until it’s finished, and then she says it’s the best she has ever looked, which is true.*

#### kd\_rec\_vpins

> Plays when: day 3+ after discharge. Aftermath order: 14 of 104. Injuries-only setting only.

*The pins come out. V does it on the kitchen island with a pair of pliers he boiled, because he has taken pins out of hounds and the procedure is the same.*

**Misaki:** 
- *tier 0:* k go.
- *tier 1:* ok. go. one, two—
- *tier 2:* Go on. I’m ready.
- *tier 3:* Go. Don’t count, just go. Counting’s worse. I know that one from somewhere.

*He goes. She makes one sound on the first pin and none on the second. Then she flexes the hand, watches the two small holes, and asks whether she can keep the pins.*

#### kd\_rec\_eat

> Plays when: day 4+ after discharge. Aftermath order: 15 of 104. Injuries-only setting only.

*She is seven kilos down. V cooks four times a day, small, and leaves it where she will pass it.*

- *if Misaki POV:* *She eats all of it, steadily, without enjoying any of it, like filling a car. She has done this before. Putting weight back on after a bad few weeks is a thing she knows how to do.*
- *otherwise:* *She eats all of it, steadily, like filling a car. She is good at this. Somebody has had to get good at putting weight back on.*

**Misaki:** 
- *tier 0:* two kilos back.
- *tier 1:* two kilos back. five to go.
- *tier 2:* Two kilos back. Five to go.
- *tier 3:* Two kilos in four days. That’s good going. The first time I did this I didn’t have someone cooking.

#### kd\_rec\_job

> Plays when: day 6+ after discharge, Misaki POV. Aftermath order: 16 of 104. Injuries-only setting only.

*First contract since. One hand and a boot. She sets up on a roof she knows, with the rifle on a bag because she can’t hold the fore-end.*

*It goes clean. On the way home she stops at a pharmacy and buys dressings and tape, the paper kind, without having to think about which aisle.*

**Misaki:** 
- *tier 0:* (easy.)
- *tier 1:* (easy. easier than some.)
- *tier 2:* (That was easy. I’ve worked worse hurt.)
- *tier 3:* (Easy. I’ve worked with worse than this, I think. Hands remember. Hands always remember.)

#### Physio and walking (injuries only)

> Injuries-only setting, after discharge: the recovery activities (once a day each, six sessions).

**⟨If `g<6`⟩**

> ▸ **Physio: the hand** — *(done today / session [number] of 6 · costs time)* `greyed out when it is too late in the day or already done today`
>
> > <small>→ hold-still minigame</small>
> >
> > 
> > - *if success; if `g+1>=6`:* *She makes a full fist. It takes everything she has, and she holds it for a count of three.*
> > - *if success; otherwise:* *The ball, the putty, the rubber band. Ten of each. She does them while watching television, with the face she uses for tax forms.*
> > - *otherwise:* *The hand won’t do it today. She tries twice more and then stops, because she knows when to stop.*
> >
> > **⟨If V POV⟩**
> >
> > > **V:** 
> > > - *if success:* (She is doing them correctly. Nobody taught her.)
> > > - *otherwise:* (She stopped at the right point. Nobody taught her that either.)
> > >
> > **⟨Otherwise (Misaki POV)⟩**
> >
> > > **Misaki:** 
> > > - *if success:* (getting there.)
> > > - *otherwise:* (tomorrow.)
> > >
> > `bad` Not today.
> >
**⟨If `w<6`⟩**

> ▸ **Walk the hounds, a bit further** — *(done today / walk [number] of 6 · costs time)* `greyed out when it is too late in the day or already done today`
>
> > *{1 of 6 (by w): To the gate and back. | 2 of 6 (by w): To the end of the drive. | 3 of 6 (by w): Round the yard twice. | 4 of 6 (by w): Down to the road. | 5 of 6 (by w): The long loop, with one stop. | 6 of 6 (by w): The long loop. No stops. The boot comes off for good tomorrow.} The four hounds keep to her pace without being told.*
> >
> > **⟨If `w>=4`⟩**
> >
> > > **Misaki:** (foot’s back. it always comes back.)
> > >
> > **⟨Otherwise⟩**
> >
> > > **Misaki:** (slow. fine.)
> > >

## 4. Recovery and aftermath

Once she is out of the infirmary the scheduler (kc35) plays the next due scene every morning and the first time the planner opens in the afternoon, evening and night, in KD_ORDER. Each scene still needs its own conditions. Scenes already printed in section 3 are listed here by name only, so the order stays readable.

### 4.1 The aftermath scenes, in scheduler order

- *1. `kd_shards` — printed in 3.9.*

- *2. `kd_interrupted_after` — printed in 3.8.*

#### kd\_discharge

> Plays when: flag kdNoteDue set. Aftermath order: 3 of 104. Full-story setting only (cut from injuries-only).

*The doctor leaves a discharge note on the kitchen table, one page.*

- *if `rx.heal>=6`:* *“Compliant. Dressings daily, pin care daily, full breaths. Ahead of where I would expect.”*
- *otherwise; if `rx.heal>=3`:* *“Partly compliant. Refused treatment on the first day; believed herself to be elsewhere. Has made up some of the ground.”*
- *otherwise; otherwise:* *“Refused most treatment. For the first two days she did not know where she was and would not be touched. Walking will be slow. Do not let her tell you otherwise.”*

**⟨If she hid tablets⟩**

> *“Analgesia: [number] tablets recovered from the bed frame, in a row. She reports no pain. I do not believe her and I would like someone to count them out to her.”*
>
**⟨Otherwise⟩**

> *“Analgesia taken as given. Reports pain 2/10. See monitor record.”*
>
**Misaki:** 
- *if she hid tablets; tier 0:* snitch.
- *if she hid tablets; tier 1:* she went through my BED. snitch.
- *if she hid tablets; tier 2:* She went through my bed. That’s a violation.
- *if she hid tablets; tier 3:* She searched my bed frame. I hid a screw in one of those for three days and nobody found it. She’s better than they were.
- *otherwise; tier 0:* model patient.
- *otherwise; tier 1:* “compliant.” that’s me. frame it.
- *otherwise; tier 2:* “Compliant.” Put that on the fridge.
- *otherwise; tier 3:* “Compliant.” Nobody has ever called me that. Put it on the fridge next to March.

**⟨Unless Misaki POV⟩**

> **V:** 
> - *if she hid tablets:* (I will count them out to her. She will take them if a hound is watching.)
> - *otherwise:* (She let herself be looked after. I had not been sure that she would.)
>

#### kd61\_home

> Plays when: day 0+ after discharge. Aftermath order: 4 of 104.

**⟨If Misaki POV⟩**

> *The first evening upstairs. You go round the house the way you went round the cell, checking each room from the doorway before you go in.*
>
> *Your stool is at the island and your hoodie is on the hook by the back door, where you left it. In his bathroom your toothbrush is in the cup, bone dry, the bristles splayed out the way you splay them.*
>
> *In the cupboard where your cereal goes there are [nw] boxes of it, the same kind, unopened, in a row. He went to the shop while you were gone, and every time he came back with a box.*
>
> **Misaki:** 
> - *tier 0:* ([n] boxes.)
> - *tier 1:* ([n] boxes. he kept buying my cereal.)
> - *tier 2:* ([number, in words] boxes. He kept buying my cereal.)
> - *tier 3:* ([number, in words] boxes. He kept buying my cereal. He kept buying it, in case.)
>
> *You open the oldest one, because it will go stale first, and eat a bowl standing at the island in the dark with your back to the wall. He comes in, sees you, and goes out again without turning on the light.*
>
**⟨Otherwise (V POV)⟩**

> *The first evening upstairs, she goes round the house the way she went round the infirmary on her worst day, checking each room from the doorway before she goes in.*
>
> *In the cupboard she finds the cereal: [nw] boxes of it, unopened, in a row. He had not counted them until he watched her count them.*
>
> **V:** (I bought one every time I went to the shop. Not buying it would have meant deciding something.)
>
> *She opens the oldest box and eats a bowl at the island in the dark, standing, with her back to the wall, and does not look at him. He goes out again without turning on the light.*
>
> **⟨If flag k61Shoe set⟩**
>
> > *In the hall he takes the one clean trainer from beside the front door and puts it in the cupboard under the stairs, so that she will not have to see that there is only one.*
> >

#### kd\_book

> Plays when: kdBook not set, the notes man has been dealt with (list). Aftermath order: 5 of 104.

**⟨Unless she said something under the needle⟩**

> *“02:15 subject counts hounds: grey, old, black, pale. 02:30 the same. 03:00 the same. 05:00 the same. No use.”*
>
*The note-taker’s notebook is on the kitchen table in a freezer bag. He kept a line for every quarter of an hour, in very neat handwriting, and that includes the hours she can’t remember.*

**⟨If Misaki POV⟩**

> **Misaki — choice:** 
> - *tier 0:* *(that’s my night in there.)*
> - *tier 1:* *(my whole night’s in there. he’s got more of it than i do.)*
> - *tier 2:* *(He has more of those days than I do. It’s all in there.)*
> - *tier 3:* *(That prick wrote down more of my life than I can remember living. And it’s right there, in a freezer bag.)*
>
> ▸ **Read it.** — *(−composure · you will know what they know)*
>
> > 
> > - *if she said something under the needle; if `n>1`:* She read the notebook. [n] things she said under the needle, and the people they touch have been warned.
> > - *if she said something under the needle; otherwise:* She read the notebook. [n] thing she said under the needle, and the people they touch have been warned.
> > - *otherwise:* She read the notebook. Under the needle she gave them four hound names, on a loop, and nothing else.
> >
> > *She reads the missing hours with her thumb pressed over her mouth.*
> >
> > **Misaki:** 
> > - *if she said something under the needle; tier 0:* (i don’t remember any of it.)
> > - *if she said something under the needle; tier 1:* (that’s how i talk. i don’t remember saying one word of it.)
> > - *if she said something under the needle; tier 2:* (It sounds like me. I wasn’t there for a word of it.)
> > - *if she said something under the needle; tier 3:* (That’s me. That’s exactly how I talk, and I wasn’t there. Okay. One: warn them. Two: today. Three: then throw up.)
> > - *otherwise; tier 0:* (lol.)
> > - *otherwise; tier 1:* (i did the HOUNDS. unconscious. lmao.)
> > - *otherwise; tier 2:* (I did the hounds in my sleep. That’s all they got.)
> > - *otherwise; tier 3:* (Out cold with a needle in my arm, and I counted his hounds at them for five hours, grey, old, black, pale. I’m fucking incredible.)
> >
> ▸ **Have V read it. He tells you only what you ask for.** — *(he will carry it / not close enough)* `greyed out when closeness tier below 2`
>
> > *He reads it standing up with his glasses on, and turns each page by its corner.*
> >
> > **V:** 
> > - *if she said something under the needle:* There {if `n>1`: are [n] things | otherwise: is one thing} in here that people must be told today. I will tell them. Do you want to know what {if `n>1`: they are | otherwise: it is}?
> > - *otherwise:* You gave them the count of my hounds, over and over, for five hours. There is nothing else in here.
> >
> > **Misaki:** 
> > - *if she said something under the needle; tier 0:* no.
> > - *if she said something under the needle; tier 1:* no. yes. no. just fix it.
> > - *if she said something under the needle; tier 2:* Not today. Fix it, and tell me when I ask.
> > - *if she said something under the needle; tier 3:* Not today. You hold it. I’ll ask when I can stand to, and you’ll tell me straight, and you won’t do the face.
> > - *otherwise; tier 0:* lol.
> > - *otherwise; tier 1:* LMAO. the hounds. ok.
> > - *otherwise; tier 2:* The hounds. I did the hounds.
> > - *otherwise; tier 3:* I named your hounds at them for five hours. Frame that page, I’m serious.
> >
> ▸ **Burn it unread.** — *(\+composure · whatever is in it stays out there)*
>
> > *She lights it on the stove ring and holds it over the sink by one corner until it is her fingers or the page.*
> >
> > **Misaki:** 
> > - *tier 0:* (done.)
> > - *tier 1:* (whatever i said, i said it. reading it won’t unsay it.)
> > - *tier 2:* (Whatever I said is said. I don’t need to watch myself say it.)
> > - *tier 3:* (Whatever’s in there already happened to everybody but me. I’m not going to sit and watch it happen to me too.)
> >
**⟨Otherwise (V POV)⟩**

> **V — choice:** *(Her hours, in another man’s handwriting.)*
>
> ▸ **Read it alone, tonight.** — *(−conscience +vengeance · she is not asked)*
>
> > *He reads it in the archive with the door shut.*
> >
> > **V:** 
> > - *if she said something under the needle:* (She does not know she said this. She will have to be told, and people will have to be warned before that.)
> > - *otherwise:* (My hounds. For five hours she gave them my hounds.)
> >
> ▸ **Put it in front of her, unopened.** — *(it is hers)*
>
> > *She reads it at the table. He stands where she can see him and does not read over her shoulder.*
> >
> > **Misaki:** 
> > - *if she said something under the needle; tier 0:* ...i said that?
> > - *if she said something under the needle; tier 1:* i don’t remember saying any of this.
> > - *if she said something under the needle; tier 2:* I don’t remember a word of this. It sounds like me.
> > - *if she said something under the needle; tier 3:* That’s me, and I wasn’t there. Okay. We warn them today. Then I’m going to go and be sick, and you’re going to pretend you can’t hear it.
> > - *otherwise; tier 0:* lol. hounds.
> > - *otherwise; tier 1:* the HOUNDS. i did the hounds, V.
> > - *otherwise; tier 2:* I did your hounds. In order. For five hours.
> > - *otherwise; tier 3:* Five hours of grey, old, black, pale. They must have wanted to die. Good.
> >
> ▸ **Burn it.** — *(nobody reads it)*
>
> > *He burns it in the incinerator off the kennel corridor and stays until the wire binding is the only thing left.*
> >
> > **V:** (Whatever she said in there, I have decided not to know. I hope that I can afford it.)
> >

#### (kd\_book, continued) The warnings

> Part of kd_book: what V says when he holds or reads the notebook and warns the people on it.

**⟨If `n>=1`⟩**

> 
> - *if Misaki POV:* The stash is in my garage. The spare key has been replaced with a fish hook. I thought you would enjoy that.
> - *otherwise:* moved my stuff to ur garage. left them a fish hook where the key was :)
>

- *6. `kd_delivered` — printed in 3.6.*

#### kd\_count

> Plays when: day 1+ after discharge. Aftermath order: 7 of 104.

Misaki cannot account for about [hours] hours of the [days] days she was held. The man who kept the notes could.

*She tells him two days, because it felt like two. He turns his phone round on the counter so she can read the date.*

**V:** It was [days]. I counted each of them.

**Misaki:** 
- *tier 0:* no. two. i counted meals.
- *tier 1:* no it was two. i counted. ...i counted the ones i was awake for.
- *tier 2:* It was two. I counted meals, and— oh. I counted the ones I was awake for.
- *tier 3:* Two. I’d have sworn on your dogs. So they had me for [hours] hours I wasn’t even in the room for, and I don’t get those back.

*She works it out on the back of a receipt. About [hours] hours are missing. She folds the receipt and puts it in her shoe, with the clip.*

**⟨If Misaki POV⟩**

> **Misaki — choice:** *([hours] hours.)*
>
> ▸ **Ask him who would know what happened in them.**
>
> > **V:** One man. He wrote down every quarter of an hour in a notebook. He is on the list.
> >
> > **Misaki:** 
> > - *tier 0:* ok.
> > - *tier 1:* ok. him first.
> > - *tier 2:* Him first, then.
> > - *tier 3:* Him first. I want to read my own night, V. Even if it’s shit.
> >
> ▸ **Don’t ask. Eat the eggs.**
>
> > *She eats the eggs. He doesn’t offer the number again, and he doesn’t put the phone away either.*
> >
**⟨Otherwise (V POV)⟩**

> **V — choice:** *(It was [days] days. She believes it was two.)*
>
> ▸ **Tell her the number.**
>
> ▸ **“A few days.”** — *(kinder today)*
>
> > **V:** A few days.
> >
> > *She nods and goes on believing two. He has now told her something untrue about her own life, and he is the second man this month to do it.*
> >

#### kd61\_rent

> Plays when: day 5+ after discharge. Aftermath order: 8 of 104.

**⟨If `!me`, flag k61VPaid set⟩**

> *On the first of the month she puts an envelope on the kitchen island in front of him, with RENT on it in capitals and the exact amount inside, counted twice.*
>
> **Misaki:** 
> - *tier 0:* rent. to the cent.
> - *tier 1:* rent. to the cent. receipt pls.
> - *tier 2:* Rent. To the cent. I want a receipt.
> - *tier 3:* Rent. To the cent, count it. I want a receipt. A proper one, with the date.
>
> *He writes her one on a page of the house ledger, in fountain pen, with the date and the amount and PAID, and tears it out along the spine. She reads it all the way through before she puts it in her back pocket.*
>
> **V:** (Her left hand is broken in two places and pinned. She has checked my arithmetic.)
>
**⟨Otherwise⟩**

> **⟨If V POV⟩**
>
> > *She loses the first of the month somewhere. On the second she drives to the lot office one-handed, which she is not allowed to do, to pay her rent a day late.*
> >
> > *She comes back angrier about the twenty-five dollar late fee than he has seen her about anything since the river, and writes to the lot office to contest it, with her right hand, three drafts.*
> >
> > **V:** (She cannot hold a fork in her left hand. She has asked me to check the spelling of “unprecedented.”)
> >
> **⟨Otherwise (Misaki POV)⟩**
>
> > *The rent was due on the first. You were sure all day that the first was the thirtieth, and you find out it wasn’t on the second, from the date on V’s newspaper. You drive to the lot office one-handed, which you are not allowed to do, and stand at the window.*
> >
> > *The man behind the glass looks at the cast, and the eye, and the stitches, and asks what happened.*
> >
> > **Misaki:** 
> > - *tier 0:* ladder.
> > - *tier 1:* fell off a ladder lol.
> > - *tier 2:* I fell off a ladder.
> > - *tier 3:* Ladder. Fell off a ladder, hanging fairy lights. Very festive, very stupid. Can I pay my rent?
> >
> > *He stamps it PAID. Then he says it is a day late and there is a twenty-five dollar fee, and it will go on the account.*
> >
> > *You stand at the window with fourteen stitches in your head and argue about twenty-five dollars for ten minutes. You have never been late. You have paid on time every month since you were sixteen, and you want somebody to write that down.*
> >
> > **Misaki:** 
> > - *tier 0:* (never late. till now.)
> > - *tier 1:* (never late. not once. now there’s a line.)
> > - *tier 2:* (Never late, not once. Now there’s a line on it that says late.)
> > - *tier 3:* (Never late. Never once in all those years. And now there’s a line on my account that says late, and it’ll be there forever.)
> >
> > 
> > - *if k61Rcpt = 'cast':* *You pay the fee. In the truck you put the new receipt in your back pocket, where the last one was, and then you take it out again and push it down inside the cast, next to the other one.*
> > - *otherwise:* *You pay the fee. You hold the new receipt flat on your knee all the way home, at every red light, so that it won’t crease.*
> >

#### kd62\_file

> Plays when: day 3+ after discharge. Aftermath order: 9 of 104.

**⟨If Misaki POV⟩**

> *Four in the morning in his kitchen. You are home, and you know it, and you are adding to the file.*
>
> 
> - *if flag k62Th set or `0`:* *It still has his steps in it, and his hands, and now new pages: he leaves the bathroom door open so you can hear the tap; he says your name on the stairs; he buys your cereal. Every kind thing he does goes in, and comes out the other end as technique.*
> - *otherwise:* *It has his steps in it, and his hands, and new pages: he says your name on the stairs; he buys your cereal. Every kind thing he does goes in, and comes out the other end as technique.*
>
> *You watch yourself do it from the doorway. A girl at an island in a hoodie, very still, thinking hard. It looks like a person deciding what to have for breakfast.*
>
> **Misaki:** 
> - *tier 0:* (stop it.)
> - *tier 1:* (it’s V. stop it. it’s V.)
> - *tier 2:* (It’s V. Stop it. Stop doing this.)
> - *tier 3:* (It’s V. It’s V, it’s his kitchen, I know that. Stop putting him in it. Please stop putting him in it.)
>
> **Misaki — choice:** *(The file.)*
>
> ▸ **Write it down so it stops.**
>
> > *You write it in the margin of his newspaper, small, in biro, with times. It doesn’t stop. In the morning you tear the margin off in strips and run them down the sink.*
> >
> ▸ **Go back to bed and lie there.**
>
> > *You lie beside him with your eyes open and your back to the wall, and the file goes on writing itself until the hounds want feeding.*
> >
**⟨Otherwise (V POV)⟩**

> *Four in the morning. He comes down for water and stops on the stair, because the kitchen light is on.*
>
> *She is at the island, very still, writing in the margin of his newspaper in small biro capitals. Times. A column of times. He reads one upside down from the stair: “4:10 tap. bathroom door open. why.”*
>
> *He goes back up without being seen. In the morning the margin has been torn off the paper, neatly, and she is cheerful at breakfast, and asks if he slept.*
>

- *10. `kd_rec_list` — printed in 3.11.*

- *11. `kd_rec_stitches` — printed in 3.11.*

- *12. `kd_rec_ronin` — printed in 3.11.*

- *13. `kd_rec_angel` — printed in 3.11.*

- *14. `kd_rec_vpins` — printed in 3.11.*

- *15. `kd_rec_eat` — printed in 3.11.*

- *16. `kd_rec_job` — printed in 3.11.*

#### kd\_card

> Plays when: day 2+ after discharge, flag kdCount set, closeness tier 1+. Aftermath order: 17 of 104. Full-story setting only (cut from injuries-only).

*V’s doctor comes to the house with a clipboard: blood type, allergies, childhood illnesses, date of birth.*

**Misaki:** 
- *tier 0:* idk. idk. idk. march. probably.
- *tier 1:* no clue, no clue, no clue, and march. i put march on a form once and it stuck.
- *tier 2:* I don’t know, I don’t know, I don’t know, and March, which I made up for a form.
- *tier 3:* Pass, pass, pass, and March, which I invented. I’m a blank form with a gun, doc. Write whatever.

*The doctor says some people take that sedative badly, and she is one of them. Nobody could have known that, and she couldn’t have told them. It is why the hours went the way they did.*

**V:** Then it will be written down: the drug, the dose, the reaction. The next person who needs it will not have to ask you.

*He writes the card himself in fountain pen. It is the first document about her body with anything true on it, and she puts it behind her train pass.*

#### w59\_know

> Plays when: one of the list men was glimpsed before the van. Aftermath order: 18 of 104.

**⟨If Misaki POV⟩**

> *You sit at V’s kitchen table with the list and a pen, and you write next to each line where you saw him first.*
>
> *You can date most of them by the job you were coming home from.*
>
> **⟨If `F.wOrg` or `F.nOrg`⟩**
>
> > *Then you write down what [captor org] sent you before that, in order, and it reads like a timetable. They told you, more or less, every week.*
> >
> **Misaki:** 
> - *tier 0:* (i saw them.)
> - *tier 1:* (i saw all of them. i just didn’t look.)
> - *tier 2:* (I saw all of them. I clocked all of them. I just never added them up, because then I’d have had to do something.)
> - *tier 3:* (I’m good at sums. Regionals, third place, age eleven. And I left this one on the desk for a month because I didn’t like what it came to.)
>
> **V:** 
> - *if `F.lease`:* I read about the van in a ledger, Misaki, and about the room on the river, and then I put the folder on top of the pile and went to a board meeting.
> - *otherwise:* I sat outside your lot and wrote down half a number plate. I should have written down the other half.
>
**⟨Otherwise (V POV)⟩**

> 
> - *if `F.lease`:* *V lays it out on the ops deck in order: the ledger lines, his notes from the car, her messages from the laundromat, the visitors’ book with the name that does not exist.*
> - *otherwise:* *V lays it out on the ops deck in order: his notes from the car, her messages from the laundromat, the visitors’ book with the name that does not exist.*
>
> *It makes a straight line to the van, with a date on every point. Every point on it is something he saw.*
>
> **V:** (I watched it come for her. I wrote it down very neatly. The note-taker and I have that in common.)
>
> **Misaki:** 
> - *tier 0:* stop
> - *tier 1:* don’t. i saw them too
> - *tier 2:* Don’t do that. I saw them too, V. I waved at one of them.
> - *tier 3:* Stop it. I waved at the driver. I took change from the water guy. If we’re doing blame I’m winning, so put the folder down and come and eat.
>

- *19. `kd_ask` — printed in 3.10.*

- *20. `kd_math` — printed in 3.10.*

#### w59\_hale\_after

> Plays when: day 2+ after discharge. Aftermath order: 21 of 104.

*Inspector Hale comes to the house in daylight and stands on the step, because he hasn’t been asked in and won’t ask.*

**⟨If `F.deal==='promise'`⟩**

> **Hale:** I read the incident log for the river. A power failure, and several men who slipped. I am here about the one who didn’t slip yet.
>
**⟨Otherwise⟩**

> **Hale:** I’ll be honest, since nobody else in this is. I want [boss]. In a courtroom, alive, on the news, with a lawyer who has to stand up and say it in front of a judge.
>
**Hale:** Whatever is going to happen to them, I want it to happen there. I have waited twenty-two years.

**⟨If Misaki POV⟩**

> **Misaki — choice:** *(He is asking you, not V.)*
>
> ▸ **“they’re all yours. what’s left of them.”** — *(\+composure)*
>
> > **Hale:** That’s all I ask. Thank you, miss.
> >
> > *He leaves. You sit on the step for a while afterwards, because it is the first decision about them that has been yours.*
> >
> ▸ **“fuck off, inspector.”** — *(\+edge)*
>
> > **Hale:** Understood.
> >
> > *He goes. He leaves a card on the step, and you leave it there in the rain until it is pulp.*
> >
**⟨Otherwise (V POV)⟩**

> **V — choice:** *(Hale wants the boss breathing.)*
>
> ▸ **He will have his courtroom** — *(the K9 way, if you can)*
>
> > **V:** You will have it. I keep files on everyone, Inspector. This one is going to be very thick.
> >
> > **Hale:** Thick enough to hold?
> >
> > **V:** Thick enough to bury.
> >
> ▸ **Make no promise**
>
> > **V:** I cannot promise you anything about that man. I am being honest with you, which I would like noted.
> >
> > **Hale:** Noted. I’ll be reading the papers, then.
> >

#### kd\_konbini

> Plays when: day 1+ after discharge, Misaki POV. Aftermath order: 22 of 104. Full-story setting only (cut from injuries-only).

*At the corner shop the clerk rings up her noodles, looks at her, and voids the sale. He pushes the bag across the counter with two fingers and looks at the cigarette display until she leaves.*

**Misaki:** 
- *tier 0:* free noodles??
- *tier 1:* free noodles. nice guy. weird, but nice.
- *tier 2:* Free noodles. Nice of him. Odd man.
- *tier 3:* Free noodles! He didn’t even want to chat. People are so nice in this neighbourhood when you’re not robbing them.

*On the way out a child points at her and is turned around by the shoulders.*

- *23. `kd_window` — printed in 3.10.*

- *24. `kd_cup` — printed in 3.10.*

- *25. `kd_bodymap` — printed in 3.10.*

#### kd\_still\_relapse

> Plays when: after discharge from the infirmary, day 4+ after discharge, stay severity 4+. Aftermath order: 26 of 104.

**⟨If Misaki POV⟩**

> *You wake at three in the morning and you are in the cell. The bulb. The radio. The breathing at the door.*
>
> *It lasts about a minute. Then a hound sighs at the end of the bed, a big tired sigh, and you know the sigh, and the cell comes apart like wet paper and it’s his ceiling, his room, the door open a hand’s width.*
>
> *You don’t wake him. You lie there and count the hounds by their breathing until it’s light. Four. All four. You count them about a thousand times.*
>
> **Misaki:** 
> - *tier 0:* (still here.)
> - *tier 1:* (it’ll keep coming back. ok.)
> - *tier 2:* (It’ll keep coming back. Okay. I can do a minute.)
> - *tier 3:* (It’s going to keep coming back, isn’t it. For a minute at a time, at three in the morning, for years. Okay. I can do a minute. I did eleven days.)
>
**⟨Otherwise (V POV)⟩**

> *At three in the morning he hears her in the dark: very quiet, very fast, counting loops of a radio that isn’t there.*
>
> *He does not turn the light on, because of what the light would look like. He says, from where he lies, in an ordinary voice: “It is Tuesday. It is my house. The grey one is on your feet.”*
>
> *The counting stops. After a long time a hand finds his sleeve in the dark and holds it, and stays holding it until morning, and neither of them mentions it at breakfast.*
>

#### kd\_blank

> Plays when: day 3+ after discharge, kdKeep = undefined. Aftermath order: 27 of 104.

*She is a few days out and the third session has already gone soft at the edges, the way everything before she was nine did. She knows the feeling. If she leaves the room alone for a month, it will be gone.*

**⟨If Misaki POV⟩**

> **Misaki — choice:** 
> - *tier 0:* *(i could just let it.)*
> - *tier 1:* *(i could let it go. i’m so good at that.)*
> - *tier 2:* *(I could let it go. I lost nine years without trying. Three days would be nothing.)*
> - *tier 3:* *(I could let the whole room go where chapter one went. I wouldn’t even have to try. I want to, and that scares the shit out of me.)*
>
> ▸ **Keep it. Write the room down tonight, every face.** — *(−composure · a fifth name for the list)*
>
> > <small>→ keep the room</small>
> >
> ▸ **Let it go blank.** — *(\+composure · no more flashbacks · she loses a name off the list)*
>
> > <small>→ let it go blank</small>
> >
> ▸ **Ask V what he would do.** — *(not close enough / )* `greyed out when closeness tier below 2`
>
> > **V:** I keep everything. Every file, every face, every one I have had on the table. I do not recommend it, and I would not give one of them back.
> >
> > **V:** It is yours to keep or to lose. If you lose it, I will have it.
> >
> > **Misaki — choice:** *(So.)*
> >
> > <small>(then the same passage as above)</small>
> >
**⟨Otherwise (V POV)⟩**

> **Misaki:** 
> - *tier 0:* do i keep it.
> - *tier 1:* do i keep it or not. u pick.
> - *tier 2:* Do I keep it? Tell me what you’d do.
> - *tier 3:* I can feel it going, V. I could let it. Tell me what you’d do, and don’t be careful about it.
>
> **V — choice:** *(She is asking.)*
>
> ▸ **“Keep it. Write it down tonight.”**
>
> > <small>→ keep the room</small>
> >
> ▸ **“Let it go. I will keep it for you.”**
>
> > <small>→ let it go blank</small>
> >
> ▸ **“It is yours to decide.”**
>
> > **⟨If composure under 45⟩**
> >
> > > <small>→ let it go blank</small>
> > >
> > **⟨Otherwise⟩**
> >
> > > <small>→ keep the room</small>
> > >

#### (kd\_blank, continued) Keep it

> Part of kd_blank: the journal note if she keeps the room.

**⟨If `!S.list.some(x=>x.id==='voice')`⟩**

> `name` The one behind the chair
>
> `description` He never asked a question. He stood behind her through every session and breathed.
>
Misaki wrote the room down, all of it, so it cannot go the way chapter one went. There is a fifth name on the list now.

*She fills eleven pages: the driver’s singing voice, the radio man’s shoes. One of them she had already half lost, the man who stood behind her chair and never came round to the front.*

**Misaki:** 
- *tier 0:* five names now.
- *tier 1:* five. there’s five of them. i nearly dropped one.
- *tier 2:* There are five of them. I’d nearly dropped one already.
- *tier 3:* Five. I was four days out and my head had already binned one of them for me. It doesn’t get to do that again.

#### (kd\_blank, continued) Let it go

> Part of kd_blank: the journal note if she lets it go blank.

Misaki let the room go blank. V has it now. One name on the list has nothing under it.

*She stops going back for it. By the weekend the bulb is something she knows about and can’t picture, like a town she has only heard named.*

- *if `left.length?pk(left):null`:* *V notices when she cannot tell him anything about [list name]. He writes what he knows on his own page. Her line on the list stays empty.*
- *otherwise:* *V notices the first time she can’t answer him about it. He writes what he knows on his own page.*

**Misaki:** 
- *tier 0:* (quiet.)
- *tier 1:* (it’s quiet. i’m not asking why.)
- *tier 2:* (It’s quiet in here. I’m not going to ask what that cost.)
- *tier 3:* (It’s quiet, and I slept. Somebody’s still carrying it, and it isn’t me. Sucks to be him.)

- *28. `kd_photos` — printed in 3.10.*

#### kd\_angelsees

> Plays when: day 1+ after discharge, Angel friendship 1+. Aftermath order: 29 of 104. Full-story setting only (cut from injuries-only).

*Angel comes through the door already talking and stops in the middle of a word.*

**Misaki:** 
- *tier 0:* hi. what.
- *tier 1:* what. i’m fine. what’s that face.
- *tier 2:* What? I’m fine. Why are you making that face?
- *tier 3:* What? I’m fine. Babe. You’re doing a face. It’s a stiff hand and a bad haircut.

**Angel:** no face. there’s no face. sit down, i’m doing your eyebrows.

*She does the eyebrows. It takes an hour, and she does it with the big makeup case open and her back to the shotgun, and twice she has to stop and look at the ceiling.*

#### kd\_wrists

> Plays when: day 2+ after discharge, in the after-phase. Aftermath order: 30 of 104. Full-story setting only (cut from injuries-only).

*The wrist dressings are changed every morning. The cable ties went in a long way. On the left one there is a pale cord at the bottom of it that moves when she moves her thumb.*

**Misaki:** 
- *tier 0:* whoa.
- *tier 1:* whoa. u can see the string.
- *tier 2:* You can see the string that does my thumb. Look.
- *tier 3:* Look at that. That’s the string that works my thumb. I’m a puppet. Angel, come and look, I’m a puppet.

**Angel:** 
- *if Misaki POV:* i’m good. i’m just going to. stand over here. by the window. and look at the window.
- *otherwise:* (from the corridor) i’m good out here. i love this corridor.

- *if Misaki POV:* *She moves the thumb for the doctor on request, four times, and watches it work with real interest. It doesn’t occur to her that this ought to hurt.*
- *otherwise:* *She moves the thumb on request and watches the cord slide, pleased with it. V finds he is holding the bed rail and lets go of it.*

- *31. `kd_clothes` — printed in 3.10.*

- *32. `kd_exam` — printed in 3.10.*

#### kd\_practice

> Plays when: day 2+ after discharge, flag kdCount set. Aftermath order: 33 of 104.

*About [hours] hours are gone and it bothers her less than it should, because she has had practice. Everything before she was nine is gone too, and she has never once gone looking for it.*

*Tonight she looks. A room with one bulb took hours out of her in a few days. She had always called the first nine years a chapter she skipped. She has never asked what kind of room takes nine years.*

**⟨If Misaki POV⟩**

> **Misaki — choice:** 
> - *tier 0:* *(huh.)*
> - *tier 1:* *(huh. don’t like that.)*
> - *tier 2:* *(I don’t like that thought. I can’t put it back, either.)*
> - *tier 3:* *(Oh, fuck. I can’t un-think that one.)*
>
> ▸ **Say it to V, out loud.** — *(not close enough / )* `greyed out when closeness tier below 1`
>
> > **V:** I told you once that I would find out. I have been looking since then. I will look harder.
> >
> > **Misaki:** 
> > - *tier 0:* and if it’s bad.
> > - *tier 1:* and if it’s bad?
> > - *tier 2:* And if it’s bad?
> > - *tier 3:* And if it’s bad? If somebody did it?
> >
> > **V:** Then somebody did it, and somebody can be found.
> >
> ▸ **Text Angel at 3am.**
>
> > **Angel (text):** then somebody owes u nine years. good. i collect for sport
> >
> > **Angel (text):** come over. i’m making u a childhood, remember. we’re on year two. it’s the year u get a hamster
> >
> > *She types it with her thumbs and sends it before she can read it back. Three dots come up at once.*
> >
> ▸ **Put it back where it was.**
>
> > *She can’t. It stays out on the floor of her head like something the hound dragged in.*
> >
**⟨Otherwise (V POV)⟩**

> **Misaki:** 
> - *tier 0:* what if somebody did it.
> - *tier 1:* what if the nine years is the same thing. what if somebody did it.
> - *tier 2:* What if the nine years went the same way? What if somebody did that?
> - *tier 3:* What if chapter one went the same way, V? What if I didn’t skip it, and somebody took it out with a bulb and a chair?
>
> **V — choice:** *(She has never asked that before.)*
>
> ▸ **“I will find out.”**
>
> > **V:** I said that I would. I have been looking. I will look harder.
> >
> > *She nods and goes back to drying the same plate.*
> >
> ▸ **“Do you want me to stop looking?”**
>
> > **Misaki:** 
> > - *tier 0:* no. look.
> > - *tier 1:* no. look. just tell me first.
> > - *tier 2:* No. Look. Tell me before you tell anyone else.
> > - *tier 3:* No. Look. But I hear it first, before Ronin, before the fucking archive. Me first.
> >
> > **V:** You first.
> >

- *34. `kd_recount` — printed in 3.10.*

- *35. `kd_photodeny` — printed in 3.10.*

#### kd\_home

> Plays when: day 1+ after discharge, she has not moved in. Aftermath order: 36 of 104.

- *if Misaki POV:* *She goes back to the trailer. The fence post has been scrubbed. Somebody has raked the gravel, and she can tell from the rake marks that it was him.*
- *otherwise:* *He has scrubbed the fence post and raked the gravel. She sees it in the first second and says nothing about it.*

*Inside, the noodles are gone and the counter has been wiped. Her other shoe is on the step, beside its pair.*

**Misaki / V — choice:** 
- *if Misaki POV:* *(Forty metres from the door. That’s all it was.)*
- *otherwise:* *(She is standing where the van stood.)*

**⟨If Misaki POV⟩**

> ▸ **Sleep here tonight. It’s your trailer.**
>
> > *She sleeps in the bath with the door locked and the tray from his kitchen across her knees. She tells him in the morning that she slept great.*
> >
> ▸ **Move the trailer. Three metres. Away from the fence.**
>
> > *It takes the truck, a tow strap and four hours, one-handed. Three metres. The fence post is no longer the first thing in the window.*
> >
> > **Misaki:** 
> > - *tier 0:* better.
> > - *tier 1:* better. feng shui.
> > - *tier 2:* Better. It’s feng shui.
> > - *tier 3:* Better. It’s feng shui, I read about it. Nothing to do with anything.
> >
> ▸ **Get the cactus and go back to his.**
>
> > *She takes Prickles and the shoebox and nothing else. She leaves the door unlocked, because locking it didn’t help.*
> >
**⟨Otherwise (V POV)⟩**

> ▸ **Wait by the car.**
>
> > *She is inside for nine minutes. She comes out with the cactus and the shoebox and gets into the car without looking at the fence.*
> >
> ▸ **Offer to have the trailer moved.**
>
> > **V:** I can have it moved. Three metres would do it.
> >
> > **Misaki:** 
> > - *tier 0:* ...ok.
> > - *tier 1:* ok. yeah. three metres.
> > - *tier 2:* Yes. Three metres. Away from the fence.
> > - *tier 3:* Yeah. Three metres. And don’t say why to the tow guy, just say feng shui.
> >

- *37. `kd_results` — printed in 3.10.*

#### kd\_vtable

> Plays when: day 3+ after discharge, V POV, in the after-phase. Aftermath order: 38 of 104.

*The doctor needed a steel surface, a drain and a strong light to redo the hand. There is one in the house. It is his, downstairs, and he has taken a great many people apart on it.*

*He scrubbed it for an hour and changed the bulbs. She was on it for six. She was awake for most of that, and told the doctor about a pigeon.*

**Misaki:** 
- *tier 0:* where’d they fix my hand.
- *tier 1:* where’d the doc do my hand btw. the room was cold.
- *tier 2:* Where did the doctor do my hand? The room was cold.
- *tier 3:* Where did she do the hand, by the way? It was freezing, and there was a drain in the floor. Is that the hound-washing room?

**V — choice:** *(She thinks it was the hound-washing room.)*

▸ **“Yes. The hound-washing room.”**

> **Misaki:** 
> - *tier 0:* knew it.
> - *tier 1:* knew it. smelled like hound.
> - *tier 2:* I knew it. It smelled of hound.
> - *tier 3:* Knew it. It smelled of hound and bleach. Tell the grey hound I borrowed her table.
>
> *It smelled of bleach because of what he had spent the hour getting out of the grooves.*
>
▸ **“It was my table. The one I work at.”**

> *She thinks about that.*
>
> **Misaki:** 
> - *tier 0:* ...ok.
> - *tier 1:* huh. ok. it’s a good table.
> - *tier 2:* Huh. Well. It’s a good table.
> - *tier 3:* Huh. So I’m the only one who ever got up off it. That’s— I’m choosing to find that romantic. Don’t say anything.
>

- *39. `kd_vdoc` — printed in 3.10.*

- *40. `kd_last` — printed in 3.10.*

- *41. `kd_told_box` — printed in 3.10.*

- *42. `kd_kitgone` — printed in 3.10.*

#### kd\_pins

> Plays when: in the after-phase, day 4+ after discharge. Aftermath order: 43 of 104. Full-story setting only (cut from injuries-only).

*The pins come out today. There is a pair of pliers for it. There is no sedation, because of how she reacts, and the local only does the skin.*

I need the hand flat and still for about two minutes. You may shout. You may not move.

**Misaki:** 
- *tier 0:* k.
- *tier 1:* k. i’m good at still.
- *tier 2:* Fine. I’m good at keeping still.
- *tier 3:* Two minutes. I’ve held a scope on a man for six hours. Go on, I’ll tell you about a pigeon.

**⟨If Misaki POV⟩**

> <small>→ the chair (hold-steady minigame)</small>
>
> <small>→ after: into the infirmary</small>
>
> 
> - *if success:* *Both pins come out. She has talked the whole way through, about a pigeon she knows, and has not moved the hand a millimetre.*
> - *otherwise:* *The first pin comes out. She stops in the middle of a sentence about a pigeon and puts her head down on the pillow, very neatly.*
>
> **Misaki:** 
> - *if success; tier 0:* ez.
> - *if success; tier 1:* easy. didn’t feel it.
> - *if success; tier 2:* Easy. Didn’t feel a thing.
> - *if success; tier 3:* Easy. Didn’t feel a thing. Can I keep them? I’m keeping them.
> - *otherwise; tier 0:* took a nap.
> - *otherwise; tier 1:* sorry. took a nap. long week.
> - *otherwise; tier 2:* Sorry. I took a little nap.
> - *otherwise; tier 3:* I didn’t faint. I took a nap. It was boring and I took a nap, write that down.
>
> 
> - *if Misaki POV:* *V’s hand, the one she was holding, has four white marks across the back of it that take an hour to go.*
> - *otherwise:* *She was holding his hand. There are four white marks across the back of it, and he would not have asked her to let go for anything.*
>
> Tell her about the pigeon.
>
> It had one foot. It did fine.
>
> Don’t look at the pliers.
>
> Nearly. Keep talking.
>
**⟨Otherwise (V POV)⟩**

> **V — choice:** *(She has held out her other hand without looking at him.)*
>
> ▸ **Take it. Do not let go.**
>
> > <small>→ after: into the infirmary</small>
> >
> > <small>(then the same passage as above)</small>
> >
> ▸ **Stand at the foot of the bed.**
>
> > <small>→ after: into the infirmary</small>
> >
> > <small>(then the same passage as above)</small>
> >

- *44. `kd_wash` — printed in 3.10.*

- *45. `kd_smell` — printed in 3.10.*

- *46. `kd_notask` — printed in 3.10.*

- *47. `kd_vknows` — printed in 3.10.*

- *48. `kd_slip` — printed in 3.10.*

- *49. `kd_sleeptalk` — printed in 3.10.*

#### kd\_parcel

> Plays when: day 3+ after discharge. Aftermath order: 50 of 104.

*A parcel comes with no return address. Inside is a ring box, and in the ring box is her star clip, cleaned.*

*The card says, in very neat handwriting: “You left this. We still have time.”*

**Misaki / V — choice:** 
- *if Misaki POV:* *(He washed it.)*
- *otherwise:* *(It is addressed to her. He has opened it.)*

**⟨If Misaki POV⟩**

> ▸ **Put it back in your hair.**
>
> > **Misaki:** 
> > - *tier 0:* mine.
> > - *tier 1:* mine. thanks for the delivery, asshole.
> > - *tier 2:* Mine. Thanks for the delivery.
> > - *tier 3:* Mine. He posted me my own lockpick. I’m going to open his front door with it and I’m going to tell him so.
> >
> > *(She goes in with one more trick than they expect.)*
> >
> ▸ **Give it to V. For the file.**
>
> > *He photographs the card under a lamp and has the handwriting matched by lunch. It is the note-taker’s.*
> >
> > **V:** He will not need his hands for much longer.
> >
> ▸ **Throw it in the river.**
>
> > *She throws it off the bridge left-handed, out of habit, and it goes about four metres. She watches it sink anyway.*
> >
**⟨Otherwise (V POV)⟩**

> ▸ **Give it to her.**
>
> > *She turns it over twice and puts it in her hair without a word. Then she asks him for the list.*
> >
> ▸ **Keep it from her. Match the handwriting.**
>
> > *The handwriting is the note-taker’s. He has kept something from her for the second time, and he writes that down as well.*
> >

#### kd\_roncrow

> Plays when: day 3+ after discharge, Ronin friendship 1+, a name is left on the list. Aftermath order: 51 of 104.

**Ronin:** So there’s a list. Vee showed me. Real neat handwriting, like a fuckin’ wedding invite.

**Ronin:** 
- *if Misaki POV:* I want one. Pick. I’ll even let you watch, I’m generous like that.
- *otherwise:* I want one of ’em, Vee. I ain’t askin’ which. I’m askin’ if you’re gonna be a prick about it.

**Misaki / V — choice:** 
- *if Misaki POV:* *(He’s swinging the crowbar by its hook.)*
- *otherwise:* *(He is swinging the crowbar by its hook, in the atrium, near a Monet.)*

▸ 
- *if Misaki POV:* **“the driver. he sang.”**
- *otherwise:* **“The driver. He sang the whole way.”** `greyed out when `!left.some(x=>x.id==='driver')``

> **Ronin:** A singer. Aw. I’ll have him do a number first.
>
> *Two days later a voice note arrives. It is forty seconds of a man trying to sing a bank jingle and not being allowed to finish it.*
>
> **Ronin:** Purgatory, please and thank you. One less on your list.
>
▸ 
- *if Misaki POV:* **“none. they’re mine.”**
- *otherwise:* **“None. They are hers and mine.”**

> **Ronin:** Selfish. Fine. You got yourself in this fuckin’ mess, you get t’clean it.
>
> **Ronin:** I’m still comin’ to watch. Bringin’ a chair.
>
▸ 
- *if Misaki POV:* **“surprise me.”**
- *otherwise:* **“Take whichever you find first.”** `greyed out when `!left.length``

> **Ronin:** Oh, I like that. I like a lucky dip.
>
> *He takes [list name]. Nobody hears how. The line on the list is crossed out in something that isn’t ink.*
>

#### kd\_vod

> Plays when: day 2+ after discharge, Misaki POV, Angel friendship 1+. Aftermath order: 52 of 104.

*She finds the stream from the Wednesday she was gone. Maria is in a cream cardigan, asking two million people for leads in a voice Misaki has never heard her use on anyone.*

*At forty-one minutes Maria stops talking and looks at something off camera for nine seconds. The chat fills with hearts. Misaki knows that look. It is the one Angel has before she goes out with the shotgun.*

**Misaki:** 
- *tier 0:* she cried on MAIN.
- *tier 1:* she cried on main. for me. on a monetised stream.
- *tier 2:* She cried on her main channel. For me. With ads on.
- *tier 3:* She cried on main, with the ads on, in the good cardigan. And then she went and killed somebody. I’ve never been so flattered.

**Misaki — choice:** *(1.2 million views.)*

▸ **Text her: “nice cardigan”**

> **Angel (text):** don’t
>
> **Angel (text):** i looked SO sad. sad doesn’t get engagement. rage does
>
> **Angel (text):** ...it did numbers though. u were good for the channel. never do it again or i’ll kill u myself
>
▸ **Watch all forty-one minutes again.**

> *She watches it twice more.*
>

#### kd\_bank

> Plays when: day 3+ after discharge, Misaki POV, flag kdLoops set. Aftermath order: 53 of 104.

*She goes to close her bank account, as promised. The branch plays the jingle in the lobby, on a loop, at a tasteful volume.*

*It is ninety seconds long. She knows where every note is.*

**Misaki — choice:** *(Queue number 41. Now serving 36.)*

▸ **Stay in the queue. Count the loops.**

> *Five people is eleven loops. She gets to the counter grey in the face, closes the account, and takes the balance in cash.*
>
> **Misaki:** 
> - *tier 0:* ur music sucks.
> - *tier 1:* your lobby music sucks. i’m going to another bank. a quiet one.
> - *tier 2:* Your lobby music is terrible. I’m going to a different bank.
> - *tier 3:* Tell head office the jingle’s shit. I’m serious, put it on the form. “Reason for leaving: the jingle.”
>
> *The teller writes it on the form.*
>
▸ **Wait outside. Go in when your number’s called.**

> *She watches the number board through the glass with her back against a vending machine. When 41 comes up she is in and out in under one loop.*
>
▸ **Leave. Do it online.**

> *The website plays the jingle when it loads. She shuts the laptop on it and tells V the site was down.*
>

#### kd\_jacket

> Plays when: day 4+ after discharge, Angel friendship 1+. Aftermath order: 54 of 104.

- *if Misaki POV:* *Angel reaches round from behind to help her out of her jacket. It is what Angel has done at every door for four years.*
- *otherwise:* *Angel reaches round from behind to help her out of her jacket, as she always has.*

*She has Angel’s wrist turned and Angel’s face against the wall before either of them has decided anything. It takes under a second. She is very good.*

**Angel:** ...ow. okay. it’s me. nice hold, actually.

**Misaki:** 
- *tier 0:* sorry. sorry.
- *tier 1:* sorry. shit. reflex. u startled me.
- *tier 2:* Sorry. Reflex. You startled me, that’s all.
- *tier 3:* Shit. Sorry. You startled me. It’s the cast, it’s made me jumpy, casts do that.

**Angel:** casts do that. sure. new rule, i help from the front. i’ll announce myself. like a butler.

- *if Misaki POV:* *From then on Angel says “jacket” before she touches the jacket. She never once says why.*
- *otherwise:* *From then on Angel says “jacket” before she touches the jacket. V adds it to the page that already says “never from behind.”*

Nobody helps Misaki out of a coat from behind. Angel says “jacket” first.

- *55. `kd_shop` — printed in 3.10.*

#### kd\_round

> Plays when: kdRound = 1, day 3+ after discharge. Aftermath order: 56 of 104.

*Angel says “the whole [days] days” on a voice note, in passing, and Misaki plays it four times.*

**Misaki:** 
- *tier 0:* u said a few.
- *tier 1:* you said “a few days.” you rounded me.
- *tier 2:* You said “a few.” You rounded it, like I’m a bill.
- *tier 3:* You rounded it. He lied to me about my own life for days in that room, and then I came home and you did it to be nice.

**V:** I did. I will not do it again.

*He writes the real number on the fridge pad, with the date, and leaves it there.*

#### kd\_knock1 – kd\_knock3: the knocks

> Part of kd_knock1–3: what happens at each place she gave away, one per thing she said (warned or not).

**⟨If n = 1 (session or count)⟩**

> **⟨If the people in the notebook were warned⟩**
>
> > *Somebody goes through the trailer while she is out. The spare key was where she told them it would be, and it is a fish hook now. The stash went to V’s garage two days ago.*
> >
> > **Misaki:** 
> > - *tier 0:* they took my NOODLES.
> > - *tier 1:* they got noodles and a hook in the thumb. worth it.
> > - *tier 2:* They got a box of noodles and a fish hook through the thumb. I’m calling that a win.
> > - *tier 3:* There’s blood on my step and none of it’s mine. Somebody’s having a worse week than me, and I love that for them.
> >
> **⟨Otherwise⟩**
>
> > *Somebody goes through the trailer while she is out. They used the spare key, and they knew which floorboard.*
> >
> > *The cash under the bed is gone. The shoebox is upside down on the floor with its lid trodden flat.*
> >
> > **Misaki:** 
> > - *tier 0:* how did they KNOW.
> > - *tier 1:* how did they know about the key. nobody knows about the key.
> > - *tier 2:* Nobody knows about that key. I never told anyone about that key.
> > - *tier 3:* Nobody knows about that key. I never told a living soul, V included. ...So when did I say it?
> >
**⟨Otherwise⟩**

> **⟨If n = 2 (session or count)⟩**
>
> > **⟨If the people in the notebook were warned⟩**
> >
> > > **Ronin:** Two guys at the blue door at 4am. I’d been sat behind it since midnight like it was fuckin’ Christmas.
> > >
> > > **Ronin:** Tell her thanks for the heads up. Ain’t had that much fun since the dentist.
> > >
> > **⟨Otherwise⟩**
> >
> > > **Ronin:** So two guys knew my door’s the blue one. Funny, that. I got eleven stitches and a full freezer out of it.
> > >
> > > **Misaki:** 
> > > - *tier 0:* ...i don’t remember telling them.
> > > - *tier 1:* i don’t remember saying it. i swear.
> > > - *tier 2:* I don’t remember saying it. I’m not saying I didn’t.
> > > - *tier 3:* I don’t remember it, and I must have said it, and I can’t even be sorry properly for something I wasn’t there for. Send me the bill.
> > >
> > > **Ronin:** Yeah, yeah. Sucks t’be you, you’re payin’ for the stitches. Bring beer.
> > >
> **⟨Otherwise⟩**
>
> > **⟨If the people in the notebook were warned⟩**
> >
> > > *A man comes to V’s gate at dusk with a bag of meat and a whistle. The gate code changed on Tuesday and the hounds are in the east run.*
> > >
> > > **V:** He knew there were four. He knows nothing now, and the hounds have eaten.
> > >
> > **⟨Otherwise⟩**
> >
> > > *A man comes to V’s gate at dusk and throws a bag of meat over it, where he had been told the grey hound sleeps. The grey hound eats it. Nobody has ever fed her but V.*
> > >
> > > *The vet keeps her overnight on a drip. V sits on the clinic floor in his coat until they let him in to see her.*
> > >
> > > **V:** She will live. I would like to know who told them where she sleeps.
> > >
> > > **Misaki:** 
> > > - *tier 0:* ...
> > > - *tier 1:* ...i think it was me.
> > > - *tier 2:* I think it was me. I don’t remember it. I think it was me.
> > > - *tier 3:* It was me. There’s nothing there when I look for it, and it was still me. Don’t be nice about it.
> > >

- *58. kd_knock2: the same scene as above, for the next thing she said*

- *59. kd_knock3: the same scene as above, for the next thing she said*

#### kd\_ronradio

> Plays when: in the after-phase, day 3+ after discharge, flag kdRonCall set, the radio man is still on the list. Aftermath order: 60 of 104.

**Ronin:** So I went and found your radio fella. He had the bank song for a ringtone. Swear t’God.

**Ronin:** He’s in my freezer in about nine bags. I kept the shoes, figured somebody’d want t’see ’em. Brown. Resoled twice.

**Misaki:** 
- *tier 0:* ...thanks.
- *tier 1:* u didn’t have to. ...thanks.
- *tier 2:* You didn’t have to do that. Thank you.
- *tier 3:* You absolute psycho. That was mine. ...Thank you. Don’t tell me what you did with the hand, I want to guess.

**Ronin:** Sucks t’be him. One less on your list. Bring beer.

#### kd\_ronmad

> Plays when: in the after-phase, flag kdRonCall set, the radio man has been dealt with (list). Aftermath order: 61 of 104.

**Ronin:** Heard the radio guy’s done. Heard it wasn’t me that did it.

**Ronin:** I called that one. I called it out loud. You’re an asshole, and I’m takin’ the next one without askin’.

#### kd\_reh\_fist

> Plays when: kdGripN ≥ 6 or flag kdCast set. Aftermath order: 62 of 104.

**⟨If Misaki POV⟩**

> *You make a full fist with the left hand. All the way. It takes everything you’ve got and you hold it for a count of three, and you did it, you actually did it.*
>
> *You open it and look at it and wait to feel the thing you were waiting for, all those weeks of foam ball and putty and rubber bands. Proud. Relieved. Something.*
>
> *Nothing comes. You made a fist. It’s a hand. You hold it out in front of you and there is nothing in the whole world you want to pick up with it.*
>
> **Misaki:** 
> - *tier 0:* (cool.)
> - *tier 1:* (cool. it works. great.)
> - *tier 2:* (It works. Great. That’s great.)
> - *tier 3:* (It works. I worked so hard for it to work. I don’t know what I wanted it to work for.)
>
**⟨Otherwise (V POV)⟩**

> *She makes a full fist at the kitchen island and holds it for three seconds. He has been waiting for this for six weeks. He had planned what to say.*
>
> *She opens it, looks at it, and goes back to her cereal with the same face she had before, and he does not say any of it.*
>
> **V:** (The hand came back. I had thought that she would come back with it.)
>

#### kd\_reh\_dark

> Plays when: day 4+ after discharge. Aftermath order: 63 of 104.

**⟨If Misaki POV⟩**

> *You practise turning the light off. It’s a thing you have to practise now, like the physio. Thirty seconds the first night. A minute the second.*
>
> *On the ninth night you get to four minutes and then you’re on the floor with the light back on and your back against the wall and you don’t remember the part in between.*
>
> *You write the times in your notes app like a training log. 0:30. 1:00. 1:40. 2:10. 3:00. 4:00. Then a gap. Then 0:30 again.*
>
> **Misaki:** 
> - *tier 0:* (back to start.)
> - *tier 1:* (back to the start. ok. ok.)
> - *tier 2:* (Back to the start. That’s fine. That’s how training goes.)
> - *tier 3:* (Back to thirty seconds. That’s how training goes, you go backwards sometimes, everybody knows that. I’ve trained for things my whole life. I never had to train to be in the dark.)
>
**⟨Otherwise (V POV)⟩**

> *She is practising the light. He knows because the strip under her door goes dark at eleven every night, for a few seconds, then a minute, then four.*
>
> *On the ninth night it goes dark for four minutes and then back on, very suddenly, and stays on, and he hears her on the other side of the door doing the counting.*
>
> *The next night it goes dark for thirty seconds. He realises she has started again from the beginning. He sits down in the corridor and does not go to bed.*
>

#### kd\_reh\_rifle

> Plays when: Misaki POV, day 5+ after discharge. Aftermath order: 64 of 104.

*First time on the range since. The rifle comes out of its case and it’s yours, it’s the one you know best in the world, and it feels like somebody else’s.*

*You settle. You breathe. The hand is fine. The hand is steady. Under the steady, very small, at full draw, there is a tremble that wasn’t there before, the width of a hair.*

*You miss. Eight hundred metres, no wind, a paper target. You have not missed a paper target since you were seventeen.*

**Misaki:** 
- *tier 0:* (again.)
- *tier 1:* (again. it was the scope.)
- *tier 2:* (Again. It was the scope.)
- *tier 3:* (It was the scope. It was the light. I’ll go again. I’ll go again until it isn’t the scope.)

*You go again forty times. You hit thirty-eight. Thirty-eight is better than almost anyone alive. You drive home and sit in the truck in V’s garage for an hour, because thirty-eight is not forty, and you used to be forty, and now you’re a person who used to be forty.*

#### kd\_reh\_adapt

> Plays when: day 6+ after discharge, Angel friendship 1+, Ronin friendship 1+. Aftermath order: 65 of 104.

*Everyone has learned. That’s the worst part, if you had to choose one.*

*Angel says “jacket” before she touches a jacket. Ronin knocks before he comes into a room, Ronin, who has never knocked on anything except to break it. V says her name on the stairs. Nobody laughs too loud. Nobody stands behind her. Nobody turns the light off.*

- *if Misaki POV:* *They do it so well. They do it without being asked, without ever mentioning it, so smoothly that you would hardly notice, and you notice every time. People walk round you now. They never used to.*
- *otherwise:* *They do it so well. And she notices every time. He watches her notice: the little stillness when Ronin knocks, when Angel says “jacket.” Every kindness is a reminder. There is no way to be kind to her that does not tell her what happened.*

**Misaki:** 
- *tier 0:* (they’re being so nice.)
- *tier 1:* (they’re all being so nice. i hate it. i love them. i hate it.)
- *tier 2:* (They’re being so careful with me. I love them for it. I hate it.)
- *tier 3:* (They’re being so careful. They’re being so good. I want to scream at them to stop it and I want them never to stop and I can’t say either one.)

#### kd\_reh\_perform

> Plays when: day 7+ after discharge, closeness tier 1+. Aftermath order: 66 of 104.

**⟨If Misaki POV⟩**

> *You get good at seeming better. It’s just a job, and you’re good at jobs. You laugh at the right times. You eat at the island with your back to the wall and nobody mentions the wall. You say “fine” in a voice that sounds like fine.*
>
> *And it works. That’s the thing. It works so well that they start to believe it. Angel stops texting at three in the morning. Ronin goes back to the bad jokes. V stops sleeping outside your door.*
>
> *You did that. You got exactly what you were working for. You lie in bed at three in the morning with the light on, very well, and nobody texts, because you did such a good job of being fine.*
>
> **Misaki:** 
> - *tier 0:* (nailed it.)
> - *tier 1:* (nailed it. nobody’s worried. that’s good.)
> - *tier 2:* (It worked. Nobody’s worried any more. That’s what I wanted.)
> - *tier 3:* (It worked. I fooled all three of them. The best I’ve ever done anything, and the prize is that I’m on my own with it now.)
>
**⟨Otherwise (V POV)⟩**

> *She is better. Everybody says so. She laughs at the right times and eats at the island and says she’s fine in a voice that sounds like fine.*
>
> *He stops sleeping outside her door because she asks him to, kindly, with a joke about his back. He goes to his own bed, and lies awake, and at three in the morning he can see the strip of light under her door from the end of the corridor, on, every night.*
>
> **V:** (She is better at seeming better than anyone I have ever met. I taught her nothing; she was always this good. I am the only one who can see the light under the door. I do not know how to tell her I can see it without taking from her the one thing she has managed.)
>

#### kd\_reh\_laugh

> Plays when: day 8+ after discharge, Ronin friendship 1+. Aftermath order: 67 of 104.

*Ronin tells the priest joke. It’s the first time since. Everybody goes still for a second, waiting, the way people wait to see if a dropped glass is going to break.*

*Misaki laughs. A real one, the big one, head back.*

*The whole table breathes out. Angel actually claps. Ronin looks like he’s won something. V puts his hand flat on the table, which is the most he does.*

- *if Misaki POV:* *And you sit there laughing, and you can hear yourself, and it sounds exactly right, and it sounds like somebody in the next room. You did the laugh perfectly. You can’t remember what the joke was. You haven’t been able to remember the end of it since the cell.*
- *otherwise:* *She laughs, and it is exactly right, and he watches her face while she does it, and her eyes are not doing anything at all. She is doing the laugh from memory. She is doing it so they will all breathe out.*

#### kd\_reh\_who

> Plays when: day 10+ after discharge. Aftermath order: 68 of 104.

**⟨If Misaki POV⟩**

> *Six weeks. The cast is off. The foot is fine. The stitches are a pale line under your fringe. The doctor, or V, or whoever it is that writes these things down, has written “recovered” on the last page.*
>
> *You stand in front of the mirror, the one you had a towel over, and look at the person in it. Same face. Same fringe. Healed.*
>
> **Misaki:** 
> - *tier 0:* (who’s that.)
> - *tier 1:* (i know who that is. i do. i just. hm.)
> - *tier 2:* (I know who that is. I do. She looks well.)
> - *tier 3:* (She looks really well. She looks recovered. She looks exactly like the girl who got into the van, and I would give anything to be either one of them.)
>
> *You went into that building one person and came out a different one, and everybody spent six weeks getting the first one back. They did a very good job. She’s right there. You just aren’t her.*
>
**⟨Otherwise (V POV)⟩**

> *Six weeks. He writes “recovered” on the last page of the file, because medically it is true. Cast off, foot sound, stitches faded, weight back.*
>
> *He looks at the word for a long time. Then he adds, underneath, smaller: “Not the same.” Then he crosses that out, because it is not a medical observation, and because she would read it one day, and because it is true.*
>

#### kd\_cast

> Plays when: Act II or later, kdCast not set. Aftermath order: 69 of 104.

*The cast comes off. The hand under it is thinner than the other one, and there are two small round scars on the back of it where the pins were.*

- *if `g>=2`:* *She makes a fist and opens it. It does both. She did the foam ball every day in that basement and complained every time.*
- *otherwise:* *She makes a fist, and it stops at three quarters. She did not do the foam ball. She said the hand was only stiff.*

**Misaki:** 
- *if `g>=2`; tier 0:* works.
- *if `g>=2`; tier 1:* it works. told u. fine.
- *if `g>=2`; tier 2:* It works. I told you it was fine.
- *if `g>=2`; tier 3:* Look at that. Works. I told every one of you it was fine and none of you listened.
- *otherwise; tier 0:* it’s fine.
- *otherwise; tier 1:* it’s fine. it’s just stiff.
- *otherwise; tier 2:* It’s fine. It’s only stiff.
- *otherwise; tier 3:* It’s fine. It’s stiff, that’s all. I pick with the right anyway.

**⟨Unless `g>=2`⟩**

> 
> - *if Misaki POV:* *(Lockpicking is harder from now on.)*
> - *otherwise:* *(He watches her try a pen, and looks at the wall when it drops.)*
>

#### kd\_bookout

> Plays when: Act II or later, kdBook not set. Aftermath order: 70 of 104.

**⟨If not (she said something under the needle)⟩**

> *A photocopied page arrives in the post with no return address. “02:15 subject counts hounds: grey, old, black, pale. No use.” Somebody has written “???” across it in red.*
>
> **Misaki:** 
> - *tier 0:* lol.
> - *tier 1:* they’re MAD. good.
> - *tier 2:* They’re angry about it. Good.
> - *tier 3:* Somebody paid for that notebook and got four hound names. I hope it was expensive.
>
**⟨Otherwise⟩**

> *A photocopied page arrives in the post with no return address.*
>
> *The note-taker was never dealt with. His notebook is still out there, with all the hours she can’t remember in it, and now somebody is posting her the pages.*
>
> **Misaki:** 
> - *tier 0:* i said that?
> - *tier 1:* i don’t remember saying that. when did i say that.
> - *tier 2:* I don’t remember saying that. How much more is in there?
> - *tier 3:* I don’t remember it. So there’s a book of things I said, and everybody gets to read it except me.
>

#### kd\_van

> Plays when: Act II or later, kdKeep decided. Aftermath order: 71 of 104.

*A grey van idles outside the corner shop with its side door open. She is on the roof of the bike shelter before the shop doors have finished closing behind her.*

**⟨If she let it go blank⟩**

> *She crouches up there with a carrier bag in her teeth and cannot think why. She reaches for the reason and nothing comes. Her hands are shaking as though somebody had told them something and left her out.*
>
> *It is a florist. He unloads chrysanthemums and doesn’t look up.*
>
> **Misaki:** 
> - *tier 0:* (what the fuck was that.)
> - *tier 1:* (what was THAT. why am i on a roof.)
> - *tier 2:* (Why am I on a roof? I don’t know why I’m on a roof.)
> - *tier 3:* (So my head let it go and my legs kept a copy. Nobody asked the legs.)
>
**⟨Otherwise⟩**

> *She knows exactly why: grey, no front plate, side door on the kerb side. She counts loops of a bank jingle that isn’t playing until the driver gets out with a bucket of chrysanthemums.*
>
> **Misaki:** 
> - *tier 0:* (florist. ok.)
> - *tier 1:* (florist. it’s a florist. get down.)
> - *tier 2:* (Florist. One: get down. Two: buy the noodles.)
> - *tier 3:* (A florist. One: get down. Two: buy the noodles. Three: nobody saw that, and if they did, I was checking the gutter.)
>

#### kd\_hara

> Plays when: Act II, Misaki POV. Aftermath order: 72 of 104.

**Hale:** One question, off the record. There are [days] days last month when nobody saw you. No purchases, no trains, no phone. Where were you?

**Misaki — choice:** *(He has his pen out.)*

▸ **“in a room with one lightbulb. ask the river.”**

> **Hale:** ...I see. I will write “unavailable.” If you ever want it on paper as what it was, you know where my office is.
>
▸ **“don’t remember.”** — *(it is true)*

> **Hale:** People say that when they remember very well.
>
> *It is the most honest answer she has ever given a policeman. He underlines it twice.*
>
▸ **“with Maria. it’s on her channel, timestamped.”** — *(Angel will cover / Angel isn’t close enough to lie for you)* `greyed out when `!(S.f.mariaKnown||frT('a')>=2)``

> *Angel uploads the “archive footage” within the hour. Hale watches forty minutes of a nail tutorial and closes the file.*
>

- *73. `kd_dentist` — printed in 3.10.*

- *74. `kd_told_dentist` — printed in 3.10.*

- *75. `kd_told_sleep` — printed in 3.10.*

- *76. `kd_later` — printed in 3.10.*

#### kd\_crash

> Plays when: Act II or later, she has not told the doctor, denial 6+. Aftermath order: 77 of 104.

- *if Misaki POV:* *She goes down on the stairs at V’s. There is no warning. She is carrying a bowl, and then she is looking at the underside of the banister and the bowl is in four pieces.*
- *otherwise:* *She goes down on the stairs with a bowl in her hand. He hears the bowl. He is there before it has stopped moving.*

*She has slept eleven hours in four days.*

**Misaki:** 
- *tier 0:* low blood sugar.
- *tier 1:* low blood sugar. it’s a thing. i skipped lunch.
- *tier 2:* Low blood sugar. I skipped lunch, that’s all.
- *tier 3:* Blood sugar. I skipped lunch. Don’t carry me, V, I’m — fine, carry me, but it’s blood sugar.

**V:** (It is not her blood sugar. I made her lunch and watched her eat it.)

- *if Misaki POV:* *(Most of the day is gone.)*
- *otherwise:* *He carries her to the couch and agrees about the blood sugar, and brings her a second lunch.*

#### kd\_crash2

> Plays when: Act II or later, she has not told the doctor, denial 9+, flag kdCrash set, two days after the first collapse. Aftermath order: 78 of 104.

- *if Misaki POV:* *She is on a roof with a man in the scope, four hundred metres, no wind. Her finger does not close. She tells it to, and nothing happens, and he walks out of the frame with his coffee.*
- *otherwise:* *She comes back from a job at noon with the rifle clean. It has not been fired. She has never once come back with it clean.*

**Misaki:** 
- *tier 0:* wind.
- *tier 1:* wind. bad wind. called it off.
- *tier 2:* The wind was wrong. I called it off.
- *tier 3:* The wind was wrong. I called it. It’s professional judgement, people pay extra for that.

- *if Misaki POV:* *There was no wind. She checked three times, the way she checks everything now.*
- *otherwise:* *There was no wind today. He looked.*

**V:** (Her hands are how she decides things. She told me that once. This is the first time they have decided without her.)

#### kd\_march

> Plays when: day 8+ after discharge, kdFile = 'open', Act II or later, Angel friendship 1+. Aftermath order: 79 of 104.

**Angel:** ok so. march. u picked the month when u were nine, which, iconic. but nobody ever picked a DAY.

**Angel:** so pick one. i’ve got a cake on hold and the bakery lady’s scared of me.

**Misaki / V — choice:** 
- *if Misaki POV:* *(A day in March.)*
- *otherwise:* *(She looks at him. She wants him to pick.)*

▸ 
- *if Misaki POV:* **“the 3rd. three’s lucky.”**
- *otherwise:* **“The third.”**

> *Angel shows up with a cake with three candles on it. Each candle is a different calibre.*
>
▸ 
- *if Misaki POV:* **“the 14th. middle of the month. hedging.”**
- *otherwise:* **“The fourteenth.”**

> *V gives her a card on the fourteenth, in fountain pen. It says “Returned with thanks: one year.” She doesn’t understand it until the evening, and then she has to go and sit in the truck.*
>
▸ 
- *if Misaki POV:* **“all of them. i’m owed like twenty.”**
- *otherwise:* **“All thirty-one. She is owed arrears.”**

> **Angel:** THIRTY-ONE CAKES. finally somebody in this house with ambition.
>
> *By the ninth of March the hounds have learned the song.*
>

#### kd\_checkup

> Plays when: Act II or later, flag kdNote set. Aftermath order: 80 of 104. Full-story setting only (cut from injuries-only).

- *if `d>=6`:* *The doctor comes for the monthly check. Weight: up three kilos of the seven. Pulse at rest: 104.*
- *otherwise:* *The doctor comes for the monthly check. Weight: up three kilos of the seven. Pulse at rest: 82.*

*She asks for a number out of ten.*

**Misaki:** 
- *tier 0:* two.
- *tier 1:* two. same as always.
- *tier 2:* Two. It’s always two.
- *tier 3:* Two. It’s been two since March. Write two.

- *if `d>=6`:* *The doctor writes “2” and, beside it, the resting pulse. She underlines the pulse.*
- *otherwise; if `rx.heal>=6`:* *The doctor writes “2.” For the first time she does not put a question mark after it.*
- *otherwise; otherwise:* *The doctor writes “2?” and asks to see her make a fist.*

#### kd\_epi

> Plays when: epilogue. Aftermath order: 81 of 104.

- *if flag kdCard set:* *The medical card is still in her wallet, behind the train pass. The date of birth on it says March, and she knows now who chose that.*
- *otherwise:* *She still writes March on forms.*

- *if flag kdBackup set:* *She still loses an afternoon now and then. When it happens she asks him, and he turns to the page and reads her the time.*
- *otherwise; if flag kdAlbum set:* *She still loses an afternoon now and then. When it happens she opens Angel’s album and scrolls back until she finds herself.*
- *otherwise; otherwise:* *She still loses an afternoon now and then. When it happens she checks her arm for biro.*

**Misaki:** 
- *tier 0:* still here.
- *tier 1:* angel’s album hit 400. i’m asleep in like 30 of them.
- *tier 2:* Angel’s album has four hundred photos in it. I’m asleep in thirty of them.
- *tier 3:* Angel’s album hit four hundred. In three of them I’m asleep with my mouth open, and Ronin’s drawn on one. I’m suing.

#### kd\_v\_ledger

> Plays when: V POV, day 3+ after discharge. Aftermath order: 82 of 104.

*He keeps a ledger of her recovery in the same book he keeps the house accounts in, because it is the only book he trusts. Weight. Sleep. Composure, his estimate. Light off, in seconds.*

*The weight goes up. The hand improves. Every column he can measure is better than the week before.*

*There is no column for the thing that is wrong. He has tried to draw one three times. He does not know what to head it.*

**V:** (I can measure everything about her except whether she is still in there.)

#### kd60\_vpage

> Plays when: V POV, day 6+ after discharge. Aftermath order: 83 of 104.

*He is looking for the vet’s number in the back of the house ledger and finds a page he wrote on the night before the river.*

*It is in his ordinary hand. “Trailer: give notice to the lot, end of month. Truck and chainsaw: Ronin. Rifle: Angel. Prickles: kitchen windowsill, water fortnightly. The hounds: tell them nothing. They will know.”*

*He wrote it at two in the morning on the floor of the kennel corridor. At six he went out again to look for her, and found her, and he had forgotten until now that he ever wrote it.*

**V:** (I kept the rule for one night. I did it neatly. I listed her cactus.)

**V — choice:** *(The page.)*

▸ **Tear it out.**

> *He tears it out along the spine and puts it in the stove, and watches it go. Then he finds the vet’s number, on the next page, where it always was.*
>
▸ **Leave it where it is.**

> *He leaves it. He turns over to the vet’s number, which is on the next page, where it always was, and rings about the black hound’s ear.*
>

#### kd\_v\_kitchen

> Plays when: V POV, day 5+ after discharge. Aftermath order: 84 of 104.

*Four in the morning. He is in the kitchen with the light off, because she sleeps badly with light coming under the door, and he cannot sleep at all.*

*The grey hound comes and leans on his leg. He puts his hand on the seam down her shoulder, the one he sewed when she was a pup, and for a long time he does not move.*

**V:** (I know how to fix a hound. You open it and close it and it lives or it does not. I do not know how to fix the thing I am looking at, and I am the one who was four feet away for nine days.)

*He goes back to bed at six and lies there until seven, so that when she comes down he will have been asleep.*

#### kd\_v\_nobody

> Plays when: V POV, day 7+ after discharge, Ronin friendship 1+. Aftermath order: 85 of 104.

*Ronin asks him, on the roof, how he is doing. Nobody else has.*

**V:** I am well.

**Ronin:** Yeah. Me too. I’m great. Sleepin’ like a baby. Ain’t thought about two streets once.

*They stand there not looking at each other. Below them the city is loud about something.*

**Ronin:** You can’t tell her, can you. That you’re fucked up about it. ’Cause then it’s about you.

**V:** No.

**Ronin:** Yeah. Same.

*That is the whole conversation. It is the only one he will have about it with anybody, and it lasted under a minute.*

#### kd\_v\_tally

> Plays when: V POV, day 9+ after discharge. Aftermath order: 86 of 104.

*He is cleaning the infirmary, finally, after. Under the bed, scratched into the floor near the wall with something small and sharp, there is a tally. Short lines, in groups of five.*

*He counts them. More than the nights she was there. She was marking something else. He doesn’t know what. Hours, maybe. Loops of the radio. Times the tall one spoke.*

*He does not sand it out. He does not tell her it is there. He puts the bed back exactly where it was, over it, and shuts the door, and it is the only thing in his house he has ever kept from her on purpose.*

#### kd\_hard\_first

> Plays when: day 8+ after discharge, Misaki POV. Aftermath order: 87 of 104.

*You decide, one morning, very clearly, the way you decide on a roof: you are not going to be less.*

*They took eleven days or nine days or however many it was, and some hours, and some of your hand. They don’t get anything else. They don’t get the way you work. They don’t get to have made you careful.*

**Misaki:** 
- *tier 0:* (not less. more.)
- *tier 1:* (not less. if anything, more.)
- *tier 2:* (Not less. If anything, I’m going to be more.)
- *tier 3:* (Not less. I refuse. If they took something, I’ll make it back somewhere else, with interest. I’m going to be so much better at this than I was. I’m going to be terrifying.)

*You take three contracts that week. You haven’t taken three in a week since you were nineteen.*

#### kd\_hard\_work

> Plays when: day 10+ after discharge, Misaki POV. Aftermath order: 88 of 104.

*You’re better than you were. That’s the frightening thing. Quicker on the setup, colder on the trigger, nothing wasted. You don’t talk to them any more before. You used to talk to them, do a bit, call them sugar. Now you just do it.*

*A client tells you, on the way out, that you’re the best he’s ever hired. You say thanks. You don’t feel anything about that either. You count the money twice, which you’ve never done.*

**Misaki:** 
- *tier 0:* (efficient.)
- *tier 1:* (efficient. that’s the word.)
- *tier 2:* (Efficient. That’s what I am now.)
- *tier 3:* (I’m so good now. I don’t even hum. I used to hum. When did I stop humming.)

#### kd\_hard\_angel

> Plays when: day 11+ after discharge, Angel friendship 1+. Aftermath order: 89 of 104.

**Angel:** babe. you took the job on the man with the kid. you never take those. you have a rule.

**Misaki:** 
- *tier 0:* had.
- *tier 1:* had a rule.
- *tier 2:* I had a rule.
- *tier 3:* I had a rule. Rules are weight. I’m travelling light now.

**Angel:** that’s not light. that’s—

*She stops. She looks at Misaki for a while, the way she looks down a scope, and decides not to finish.*

**Angel:** ok. ok. your call. you know i’d never tell you how to work.

- *if Misaki POV:* *She hugs you on the way out, harder than usual. Over your shoulder, she looks at V, and V looks back, and neither of them says anything, and you notice, and you pretend you didn’t.*
- *otherwise:* *She hugs Misaki on the way out, too hard. Over Misaki’s shoulder she looks at him. He looks back. Misaki notices, and pretends she did not.*

#### kd60\_rule

> Plays when: day 4+ after discharge, Angel friendship 1+, Ronin friendship 1+. Aftermath order: 90 of 104.

*The first Sunday since. Nobody has put anybody on the table. They are eating takeaway out of the cartons, and the hounds are under it.*

**⟨Unless flag a60Rule set⟩**

> *There is a rule. They made it in the server one night, half asleep: nobody goes back for the body, forty-eight hours to clear anything that leads to the others, then move on.*
>
**Misaki:** 
- *tier 0:* u broke the rule.
- *tier 1:* u broke the rule. all of u
- *tier 2:* You broke the rule. All three of you.
- *tier 3:* You broke the rule. All three of you. Forty-eight hours, then move on. I counted. I had a lot of time to count, and you were way over.

**Angel:** i didn’t break anything. it was content. my viewers love a missing person

**Ronin:** I was bored. Went for some drives.

**V:** I was walking the hounds by the river.

**Misaki:** 
- *tier 0:* for how long
- *tier 1:* for how many days, V
- *tier 2:* For how many days?
- *tier 3:* For how many days, V?

**V:** [number, in words].

**Angel:** 
- *if `n>=3`:* i did grey your line on the list though. on the third day. like you’re supposed to
- *otherwise:* i did grey your line on the list though. on the second day. like you’re supposed to

**Misaki:** 
- *tier 0:* good.
- *tier 1:* good. that’s the rule
- *tier 2:* Good. That’s the rule.
- *tier 3:* Good. That’s correct. That’s what you’re supposed to do.

**Angel:** and then i un-greyed it that night. it looked stupid grey

- *if Misaki POV:* *You tell them that next time they follow it. Ronin and Angel both say sure. V eats his noodles. Under the table the grey hound has her chin on your foot and will not move it.*
- *otherwise:* *She tells them that next time they are to follow it. Ronin and Angel both say sure. V does not answer, and she does not make him. Under the table the grey hound has her chin on Misaki’s foot and will not move it.*

#### kd60\_wr

> Plays when: day 6+ after discharge, stay severity 8+, Angel friendship 1+, Ronin friendship 1+. Aftermath order: 91 of 104.

*Late, on V’s roof. Ronin has brought beer nobody is drinking.*

**Misaki:** 
- *tier 0:* in there i counted on the rule.
- *tier 1:* in there i counted on the rule. that u’d moved on
- *tier 2:* In there I counted on the rule. I thought you’d all moved on, and it helped.
- *tier 3:* In there I counted on the rule. I worked it all out: day three, Angel greys me. Day four, Ronin moves the seat back. Day five, somebody clears the trailer, and V puts Prickles on his windowsill and waters him every two weeks. It was the only thing in that room that made it all right.

**Ronin:** Rule’s off.

**Angel:** off. i deleted the sheet

**Misaki:** 
- *tier 0:* put it back.
- *tier 1:* put it back
- *tier 2:* Put it back.
- *tier 3:* Put it back. I mean it. I need it to be there. I’m the one who used it.

*Angel looks at her for a long moment, and then gets her phone out and types it in again from memory, word for word, and turns the screen round to show her.*

**V:** I voted for it four minutes late. I was thinking about it.

**Misaki:** 
- *tier 0:* and?
- *tier 1:* and?
- *tier 2:* And?
- *tier 3:* And? What did you think?

**V:** That I would vote for it, and not keep it.

- *if Misaki POV:* *Ronin opens the beer, in the end, and hands you the first one.*
- *otherwise:* *Ronin opens the beer, in the end, and hands her the first one.*

#### kd\_v\_sees

> Plays when: V POV, day 10+ after discharge. Aftermath order: 92 of 104.

*She took three contracts this week. She came back from all three without a mark on her and without a word, and ate, and went to bed at nine, and slept, which she has not done since.*

*He knows exactly what he is looking at. He has looked at it in the mirror. It is what he did after his mother: decided that nothing would ever make him less, and became something nothing could touch, and called it competence, and it was.*

**V:** (She is turning into me. She is doing it on purpose, and very well, and faster than I did.)

**V — choice:** *(He could say something.)*

▸ **Say something.**

> **V:** You took the car-seat job.
>
> **Misaki:** 
> - *tier 0:* so?
> - *tier 1:* so? it was a job.
> - *tier 2:* So? It was a job.
> - *tier 3:* So? It was a job. A good one. Clean. Since when do you care about my rules, V, you don’t even let me pick the music.
>
> **V:** Since always.
>
> **Misaki:** 
> - *tier 0:* ...
> - *tier 1:* don’t. don’t do the careful thing.
> - *tier 2:* Don’t. Don’t do the careful voice.
> - *tier 3:* Don’t. Don’t do the careful voice at me. Everybody does the careful voice. I’m fine. I’m better than fine. I’m the best I’ve ever been. Look at me.
>
> *He looks at her. She is the best she has ever been. He can’t find the sentence that says what is wrong with that without saying she is broken, and she will never forgive him for that sentence, and she would be right.*
>
> **V:** I am looking.
>
> *He doesn’t say anything else. That night he writes the sentence down, the one he couldn’t say, and burns the page.*
>
▸ **Say nothing. Make her dinner.**

> *He makes her dinner. She eats all of it. She says it’s good. It is good. He watches her eat and thinks about every person he has ever seen go cold on purpose, and how none of them came back, and how he never once asked them to.*
>
> **V:** (If I stop her I am telling her she is less. If I do not stop her I am watching her become nothing anyone can touch. I cannot do either. So I am doing nothing, carefully, which is the one thing I promised I would never do to her again.)
>

#### kd62\_truck

> Plays when: day 11+ after discharge, `S.pov!=='v'?!!S.f.kd_hard_work:!!S.f.kd_v_sees`. Aftermath order: 93 of 104.

**⟨If Misaki POV⟩**

> *The job is clean. One shot at eleven fifty-two, no witnesses, casings in your pocket, home by two. You drive back under the limit with the radio off.*
>
> *In his garage you turn the engine off, and your hands stay on the wheel.*
>
> *Nothing is wrong. You are fine. You were fine on the roof; you were better than fine. Your heart is going like it did in the van and your hands will not come off the wheel, and the house is right there, with the kitchen light on.*
>
> **Misaki — choice:** *(The wheel.)*
>
> Go in and tell him.
>
> ▸ **Wait it out.**
>
> > *You count the hounds. Then the doors of the van. It takes forty minutes. When your hands come off you check your face in the mirror, wipe it, and go in, and you tell him it went great and you want toast.*
> >
> ▸ **Put your head on the wheel until it passes.**
>
> > *You put your forehead on the wheel, very carefully, so the horn doesn’t go. When it passes you go in. You tell him about the job with voices, like before, and he laughs in the right places.*
> >
**⟨Otherwise (V POV)⟩**

> *He hears her truck come into the garage at two. He hears the engine stop.*
>
> *The garage door into the house does not open until twenty to three. In between there is no sound at all, and he stands at the kitchen island with his hand on the kettle and does not go down.*
>
> *When she comes in she is cheerful. It went great, and she wants toast. Her face has been wiped.*
>
> **V:** (She sat in the dark for forty minutes so that I would not see it. I will not let her know that I heard.)
>
> *He makes the toast, and laughs in the right places.*
>

#### kd\_hard\_rule

> Plays when: day 12+ after discharge, Misaki POV. Aftermath order: 94 of 104.

*A man on his knees in a car park. He has a kid’s car seat in the back of his car. You see it. You used to have a thing about car seats: you’d pass, or wait, or do it somewhere the kid would never have to see.*

*You don’t pass. You don’t wait. It’s faster this way, and the car seat is empty, and the job is the job.*

*On the drive home you try to remember why you ever had the rule about car seats. You know you had a reason. You can’t find it. It’s gone, the same place the hours went.*

**Misaki:** 
- *tier 0:* (whatever.)
- *tier 1:* (whatever. it was a stupid rule.)
- *tier 2:* (It was a soft rule. I don’t need soft rules.)
- *tier 3:* (It was a soft rule. Soft rules are how you end up in a van. I’m not ending up in a van again.)

#### kd\_v\_cant

> Plays when: V POV, day 14+ after discharge, flag kd_v_sees set. Aftermath order: 95 of 104.

*She comes home at three in the morning from a job and walks past him in the kitchen without seeing him, and washes her hands once. Once. She used to wash them three times: one for the job, one for the walk home, one for luck.*

*He stands there with the kettle. He thinks about saying her name. He thinks about the careful voice. He thinks about her face when she said “look at me.”*

*He does not say anything. He makes two cups. He drinks one. He leaves the other on the island where she will find it in the morning, and she finds it in the morning, and drinks it cold, and says thanks, and goes to work.*

**V:** (I could not keep them from taking her. Now I cannot keep her from taking herself, a little at a time, in a direction I know all the way to the end. I am very good at a great many things. I am no good at all at this.)

#### k58\_creak

> Plays when: day 3+ after discharge. Aftermath order: 96 of 104.

`his` The seventh step goes. The seventh step means V. It has meant V every night since you asked it to, and you’ve slept through it fifty times.

`over` Somebody steps over the seventh tread, so it’s somebody who knows the house. You used to know the rest from the weight on the eighth. You listen for it. The step you hear belongs to the man who sat outside your door and read to you, and that man was the tall one.

`none` You used to know which noises in this house were his. You listen. You can’t tell.

`his` He puts his weight on the seventh step, as he has every night since she asked him to.

`over` He steps over the seventh tread, as everyone who belongs does, and leans on the eighth the way she once told him he did.

`none` He comes up the back stair in his socks.

**⟨If `k58MP()`⟩**

> 
> - *if `p==='r'`; if Misaki POV:* *Ronin is awake beside you and has not moved, because he knows better than to move.*
> - *if `p==='r'`; otherwise:* *Ronin is awake beside her and has not moved a muscle. He knows better.*
> - *otherwise; if Misaki POV:* *Angel is awake beside you with her hand flat on your back, not holding, just there.*
> - *otherwise; otherwise:* *Angel is awake beside her, one hand flat on her back, watching the door down the same line.*
>
**Misaki:** 
- *tier 0:* one. door. two. window. three—
- *tier 1:* one. door. two. window. three—
- *tier 2:* One: door. Two: window, four floors. Three—
- *tier 3:* One: door. Two: window, four floors, no. Three: it’s V. Three is it’s V. Say three.

**⟨If Misaki POV⟩**

> *Three in the morning. Something on the back stair.*
>
> *Your hand is under the pillow before you’ve decided anything. The pistol’s up and on the door, and you’re sitting with your back to the headboard, counting out loud in a whisper.*
>
> *The door opens. It’s V with a glass of water, which he brings up at three because you wake at three. He stops in the doorway with the gun on him. He doesn’t put the glass down.*
>
**⟨Otherwise (V POV)⟩**

> *Three in the morning. He takes her a glass of water, because she wakes at three, and has since the infirmary.*
>
> *When he opens the door she is sitting against the headboard with the pistol on the middle of his chest, and she is whispering numbers.*
>
> 
> - *if `st==='his'`:* *She does not get to three. Three would be his name. The step she gave him means nothing to her tonight. On the stair, in his own house, he was the tall one.*
> - *otherwise:* *She does not get to three. Three would be his name. In his own house, in a room she designed, she does not know him, and he understands that on the stair tonight he was the tall one.*
>
**Misaki / V — choice:** 
- *if Misaki POV:* *(The gun is on him.)*
- *otherwise:* *(He has a glass of water and a gun on him.)*

**⟨If Misaki POV⟩**

> ▸ **“...V?”**
>
> > **V:** Yes.
> >
> > *You lower it. Your hands are fine; your hands are always fine. He puts the water on the table and goes, and you sit up until it’s light.*
> >
> > *After that night he never says his name first. When he comes in at night he stops in the light from the corridor and stands still with the water until you’ve looked at him properly. It takes you a minute every time. He has never once hurried you.*
> >
> ▸ **Keep it on him until he says your name.**
>
> > **V:** Misaki.
> >
> > *You don’t move.*
> >
> > **V:** Misaki. It is V. It is three in the morning. You are at home.
> >
> > *You put it down on the second time. From then on he says your name before he comes round a corner. Every corner in the house. He never asks why.*
> >
**⟨Otherwise (V POV)⟩**

> ▸ **Say her name.**
>
> > **V:** Misaki. It is V. It is three in the morning. You are at home.
> >
> > *She puts it down on the second time. After that night he says her name before every corner in the house, and on the stairs, and outside every door. She has never asked him to stop.*
> >
> ▸ **Say nothing. Stand in the light and let her look.**
>
> > *He steps into the light from the corridor and stands still with the glass. It takes her most of a minute. Her eyes go over his face like a checklist. Then the pistol goes down and she says “oh,” and he puts the water on the table.*
> >
> > **V:** (I will not tell her who I am. She will have to know it. I could not bear it if she only believed me.)
> >

#### kd62\_clock

> Plays when: day 6+ after discharge, flag k58_creak set. Aftermath order: 97 of 104.

**⟨If Misaki POV⟩**

> *Since the night on the back stair with the pistol, you count. Doors, every time you go into a room. His steps, wherever he is in the house.*
>
> 
> - *if k58Stair = 'his':* *You have his whole day without trying to: the hounds at five, coffee at seven with his back to the room, the study until noon, and the back stair at three with water. The seventh step goes, and you have the pistol in your hand before you remember what the seventh step means.*
> - *otherwise:* *You have his whole day without trying to: the hounds at five, coffee at seven with his back to the room, the study until noon, and the back stair at three with water. You know his weight on the eighth step, and you have the pistol in your hand before you remember whose weight it is.*
>
> **⟨If `k62Sev0()>=8`⟩**
>
> > *Some afternoons the file opens by itself for an hour while he reads across the island from you, and you add to it, and nothing shows on your face at all.*
> >
> *Ronin asks how you are and you say “fine, bored, want a job,” and it is the truest-sounding thing you have ever said.*
>
> **Misaki — choice:** *(The doors.)*
>
> ▸ **Count them.**
>
> > *Four in the hall. Two in the kitchen. You count them again from the hall. You get the same number, and it doesn’t help, and you count them again.*
> >
> ▸ **Walk in without counting.**
>
> > *You walk into the kitchen without counting. You get as far as the island. Then you go back out and count them from the hall, and your hands are wet, and you dry them on your jeans before anyone can see.*
> >
**⟨Otherwise (V POV)⟩**

> *Since the night on the back stair, she counts. He can see her do it: a small turn of the head at every doorway, the eyes going round the room once before she comes in.*
>
> *She knows where he is at every minute. She is at the island before he comes down at seven, in the chair that faces the study door at noon, and awake at three before he reaches the stair.*
>
> **⟨If `k62Sev0()>=8`⟩**
>
> > *Some afternoons she is polite to him again for an hour, in the voice from the infirmary, and he answers in the tall one’s voice, because it is the one she can hear.*
> >
> **V — choice:** *(She has his day.)*
>
> ▸ **Write his day on the fridge. Say nothing about it.**
>
> > *He writes it out in fountain pen and puts it on the fridge under the cactus magnet: the hounds at five, coffee at seven, the study until noon, and at the bottom, “3:00, back stair, water.”*
> >
> > *She never mentions it. He sees her check it, though, every hour or so, on her way past, as she checks her watch before a shot.*
> >
> ▸ **Keep to it to the minute.**
>
> > *He comes down at seven exactly, and out of the study at noon, and up the stair at three, so that whatever she has worked out will always be right.*
> >

#### k58\_pages

> Plays when: day 6+ after discharge, flag k58_creak set. Aftermath order: 98 of 104.

- *if k58Book = 'wrote':* “I WAS HERE,” in her capitals, with his time beside it.
- *otherwise:* “I don’t do quiet. I do loud with breaks.”

**⟨If Misaki POV⟩**

> *V doesn’t write anything down at dinner any more. The notebook’s in his jacket; you can see the corner of it. The pen stays capped.*
>
> *You know why. You haven’t said anything worth writing down in weeks. You say “fine” and “thanks” and “pass the salt.” You don’t do bits. You don’t hum.*
>
> **Misaki:** 
> - *tier 0:* (good.)
> - *tier 1:* (good. nothing to write.)
> - *tier 2:* (Good. There’s nothing to write.)
> - *tier 3:* (Good. Nothing to write. I’d rather be a blank page than a file somebody reads out to me through a door.)
>
**⟨Otherwise (V POV)⟩**

> *He has not written anything in her notebook for [number] days. The last entry before is [last]*
>
> *At the back there is the page headed with the dates she was gone, with nothing under them. In between there is nothing at all.*
>
> *She does not say things any more. She says “fine” and “thanks.” He tried writing down “fine” once. On the page it read like a diagnosis, and he tore it out.*
>
> **V — choice:** *(The notebook.)*
>
> ▸ **Write the date anyway, every evening.**
>
> > *He writes the date every evening and nothing under it. It makes a column with no heading. The column gets longer.*
> >
> ▸ **Put it away until she says something.**
>
> > *He puts it in the drawer of the bedside table. Some nights he opens the drawer and looks at it and closes the drawer.*
> >

#### k58\_cups

> Plays when: Misaki POV, (flag kd_hard_work set or day 12+ after discharge). Aftermath order: 99 of 104.

*Every night you work, V leaves a second cup of tea on the island. You find it in the morning, cold, with a skin on it. You drink it cold and say thanks and go.*

*This morning you stand there holding it. He’s never once said anything about it.*

**Misaki:** 
- *tier 0:* (it’s a soft thing.)
- *tier 1:* (it’s a soft thing. soft things r how u end up in a van.)
- *tier 2:* (It’s a soft thing. Soft things are how you end up in a van.)
- *tier 3:* (It’s a soft thing. Soft things are how you end up in a van. I know that. I know that better than anyone alive.)

**Misaki — choice:** *(The cup.)*

▸ **Drink it cold, like always.**

> *You drink it cold. It’s fine. You rinse the cup and put it upside down on the rack so he’ll see it’s gone, and that’s all he gets.*
>
▸ **Make one for him, and leave it.**

> *You put the kettle on. It takes four minutes. For the whole four minutes some part of you that keeps the rules stands at your shoulder and tells you to stop, and you don’t.*
>
> *You make his the way he has it, which you know without thinking about it, and leave it on the island where yours was, with the handle turned toward his stool.*
>
> *That night the notebook comes out at dinner again. He writes something down. You didn’t say anything all evening, so you know exactly what he wrote, and it was the cup.*
>

#### k58\_cupv

> Plays when: V POV, flag kd_v_cant set. Aftermath order: 100 of 104.

**⟨If k58Name = 'look' or k58Rule = 'kept' or `k58Score()>=5`⟩**

> *He comes down at six. His own cup from last night is gone from the island, rinsed and upside down on the rack.*
>
> *In its place there is another one. Tea, the way he has it, still warm, with the handle turned toward his stool.*
>
> *She has already left for work. He stands at the island and drinks it, slowly, and then he gets out the notebook and writes the date and “Tea.”*
>
**⟨Otherwise⟩**

> *He comes down at six. His cup from last night is gone from the island, rinsed, upside down on the rack. She has drunk it cold, as she does every time, and said nothing, as she does every time.*
>
> **V — choice:** *(The rack.)*
>
> ▸ **Keep leaving it.**
>
> > *He keeps leaving it. Every night she works, a second cup on the island. It is the only thing he has found that he can give her without her having to thank him for it.*
> >
> ▸ **Stop. She has noticed, and she would rather he did not.**
>
> > *He stops. The island is clean in the mornings. She does not mention it, which tells him nothing, and he writes nothing down about it.*
> >

#### k58\_read

> Plays when: phase: act2 / act3 / epilogue, flag k58_creak set. Aftermath order: 101 of 104.

**⟨If flag k58Date set⟩**

> *After the last thing she said there’s a column of dates, one for every evening since you came upstairs, with nothing under any of them. He wrote the date every day, in case.*
>
**⟨Otherwise⟩**

> *After the last thing she said there are blank pages, and at the very back a page headed with the days you were gone, with nothing under them.*
>
**⟨If Misaki POV⟩**

> *The notebook is on the island. V doesn’t leave anything anywhere by accident.*
>
> 
> - *if flag k58\_book set:* *You open it at the front. The toenail moon. NOT SNACKS. Loud with breaks. The person who said those things is funny and loud, and you read her like a file on a target. You could pick her out of a crowd. You couldn’t do what she did.*
> - *otherwise:* *You’ve never seen it before. It’s you, page after page, in his fountain pen, things you said before. You read her like a file on a target. You could pick her out of a crowd. You couldn’t do what she did.*
>
> **Misaki — choice:** *(The pen is clipped to the cover.)*
>
> ▸ **Write something under today’s date.**
>
> > **Misaki:** 
> > - *tier 0:* still here.
> > - *tier 1:* still here. kinda.
> > - *tier 2:* Still here. Different.
> > - *tier 3:* Still here. Not the same one. Write her down anyway.
> >
> > *Your handwriting is neater than it used to be. You don’t like that either.*
> >
> > *V comes in from the kennel, sees it open, reads it upside down from across the island, and goes back out to the kennel and stays there a while.*
> >
> ▸ **Read one out loud, to see what it sounds like now.**
>
> > **Misaki:** “I don’t do quiet. I do loud with breaks.”
> >
> > *In your voice now it sounds like a quote, like something off a poster. You read the freezer one. On the third, the one about the grey hound, something happens at the corner of your mouth that used to be a laugh, nearly.*
> >
> > *You close the book before it gets there.*
> >
> ▸ **Close it and put it back in his coat.**
>
> > *You close it and put it back in the inside pocket of his coat on the hook, where it lives, and smooth the coat flat. He finds it there that night. He doesn’t know whether you read it. He doesn’t ask.*
> >
**⟨Otherwise (V POV)⟩**

> *He leaves the notebook on the island before he goes down to the kennel. He has never left it anywhere by accident, and she knows that.*
>
> **V — choice:** *(Leave it out?)*
>
> ▸ **Leave it where she will see it.**
>
> > **⟨If `k58Score()>=4`⟩**
> >
> > > *Through the kennel glass he watches her open it at the front and read the old pages the way she reads a file on a target. Then she takes the pen off the cover and writes something under today’s date.*
> > >
> > > *When he comes back up it is still open. “Still here. Not the same one. Write her down anyway.” Her handwriting is neater than it used to be.*
> > >
> > > *He goes back to the kennel and stays there a while.*
> > >
> > **⟨Otherwise⟩**
> >
> > > *Through the kennel glass he watches her open it, read for a minute with no expression at all, close it, and put it back in the inside pocket of his coat on the hook, and smooth the coat flat.*
> > >
> > > *He does not ask whether she read it. He finds he cannot tell from the coat.*
> > >
> ▸ **Keep it in your jacket. She has not asked.**
>
> > *He puts it back in his jacket and takes it down to the kennel with him, and writes the date in it, and nothing under it.*
> >

#### k58\_test

> Plays when: phase: act2 / act3 / epilogue, flag k58_creak set, (`S.phase!=='act2'` or `S.day>=(S.act2Start||0)+2`), (`S.day-S.f.k58Wait>=3`). Aftermath order: 102 of 104.

**Misaki:** 
- *tier 0:* come up the stairs some night. don’t say my name.
- *tier 1:* some night this week come up the back stairs. don’t say my name. don’t tell me which night.
- *tier 2:* Some night this week, come up the back stair. Don’t say my name. Don’t tell me which night. I want to see if I know.
- *tier 3:* Some night this week, come up the back stair at three. Don’t say my name at the corner. Don’t tell me which night. I want to find out if I still know you, or if I only know what you tell me.

**V:** And if you do not know?

**Misaki:** 
- *tier 0:* then i point a gun at u again.
- *tier 1:* then i point a gun at u again. u lived last time.
- *tier 2:* Then I’ll have a gun on you again. You lived last time.
- *tier 3:* Then I’ll have a gun on you again, and you’ll stand there with the water like last time, and we’ll know. You lived through it once.

**V:** ...Very well.

- *if `st==='his'`:* the seventh step goes
- *otherwise:* somebody steps over the seventh tread and leans on the eighth

**⟨If Misaki POV⟩**

> *You ask him at dinner, flatly, the way you’d ask for a lift.*
>
> **Misaki — choice:** *(Do you ask?)*
>
> ▸ **Ask him.**
>
> > 
> > - *if `k58Knows()`:* Thursday, three in the morning: she knew it was him on the stair without being told.
> > - *otherwise:* Thursday, three in the morning: she did not know it was him on the stair. Again next week.
> >
> ▸ **Don’t. Not yet.** — *(you already put it off once / )* `greyed out when flag k58Waited set`
>
> > *You don’t ask. You eat your dinner. You’ll ask next week, when you’re better at this.*
> >
**⟨Otherwise (V POV)⟩**

> *She asks him at dinner, flatly, the way she would ask for a lift.*
>
> *Thursday. Three in the morning. He stands at the bottom of the back stair with a glass of water for eleven minutes before he goes up.*
>
> **V — choice:** *(He promised not to say it.)*
>
> ▸ **Go up without a word.**
>
> > <small>(then the same passage as above)</small>
> >
> ▸ **You cannot be the tall one on that stair again. Say her name.**
>
> > *Halfway up he says her name. He does not decide to. It comes out of him at the turn, like something he has stepped on.*
> >
> > *Through the door, flat: “that’s cheating.”*
> >
> > **V:** It is.
> >
> > *He does not tell her that he could not stand on that landing one more time and be the man she did not know. He puts the water on the table and says goodnight, and the next week, when she asks again, he says yes again.*
> >
**⟨If Misaki POV⟩**

> *It’s Thursday. You know because you look at the clock after. At three, [step], and the man on the landing stops for one second to listen, the way he always has. You know who stops like that.*
>
> **Misaki:** 
> - *tier 0:* ...v.
> - *tier 1:* ...v.
> - *tier 2:* ...V.
> - *tier 3:* V.
>
> **V:** Yes.
>
> *You don’t open your eyes. He stands on the landing a long time, much longer than one second, and then the water goes down on the table, and you’re asleep before the step on the way down.*
>
**⟨Otherwise (V POV)⟩**

> *He goes up without a word. At the landing he stops for a second, the way she says he always does.*
>
> *Through the door, before he has touched the handle, not even awake: “V.”*
>
> **V:** Yes.
>
> *He puts the water on the table. He does not remember coming back down the stair. He finds himself in the kitchen at half past three with both hands flat on the island, and the grey hound looking at him.*
>
**⟨If Misaki POV⟩**

> *It’s Thursday. Something on the stair at three. Your hand is under the pillow and the gun is up and you’re counting, and you get to two. You don’t get to three, because three is his name and you don’t know if it’s him.*
>
> *He doesn’t say it. He promised. He stands in the doorway in the light with the water and lets you look, and it takes you most of a minute, and when you lower it he says nothing at all, which is exactly what you asked for and the worst thing anybody’s done for you all year.*
>
> **Misaki:** 
> - *tier 0:* ...again next week.
> - *tier 1:* again next week.
> - *tier 2:* Again next week.
> - *tier 3:* Again next week. And the week after. Don’t look at me like that, it’s training.
>
**⟨Otherwise (V POV)⟩**

> *He goes up without a word. When he opens the door the pistol is on him and she is at two.*
>
> *He does not say it. He stands in the light with the water and lets her look, and it takes her most of a minute, and he keeps his face exactly still for all of it, because she asked.*
>
> **Misaki:** 
> - *tier 0:* ...again next week.
> - *tier 1:* again next week.
> - *tier 2:* Again next week.
> - *tier 3:* Again next week. Don’t look at me like that. It’s training.
>

#### k58\_steps

> Plays when: Act III, Act III day 5+. Aftermath order: 103 of 104.

**Misaki:** 
- *tier 0:* one. two ways off the deck. two. four of us.
- *tier 1:* one: two ways off the deck. two: there’s four of us.
- *tier 2:* One: the deck has two ways off, and the second one’s the water. Two: there are four of us.
- *tier 3:* One: the deck has two ways off, and the second one’s the water, and I can stay under for four minutes. Two: there are four of us, and nobody on that boat has ever met four of us.

**V:** Three: I will be on the deck. You will know where I am without looking.

**Misaki:** 
- *tier 0:* three. they got it coming.
- *tier 1:* three: they’ve got it coming.
- *tier 2:* Three: they’ve got it coming.
- *tier 3:* Three: they’ve got it coming. They’ve all got it coming.

**⟨If Misaki POV⟩**

> *Late, in the kitchen, with the yacht drawn on the back of a takeaway menu between you.*
>
> *You do the steps out loud. You haven’t done them out loud since the cell. In there you did them in your head, all of them, every time the door went.*
>
> *Three was always the one you said last, because it was the one you needed to believe.*
>
**⟨Otherwise (V POV)⟩**

> *Late, in the kitchen, with the yacht drawn on the back of a takeaway menu between them. She does her steps out loud. He has not heard her do that since before.*
>
**⟨If Misaki POV⟩**

> **Misaki — choice:** *(Three.)*
>
> ▸ **Leave three to him.** — *( / not yet. you don’t trust it yet)* `greyed out when not (flag k58Knew set or k58Read = 'wrote')`
>
> > *Three used to be something else. You take his pen and write it down in his notebook yourself, under the date, in your neat new handwriting, and he lets you.*
> >
> ▸ **Say it yourself.**
>
> > *V nods, as if you’ve given him a time and an exit. He doesn’t write it down. You notice that he doesn’t, and you’re grateful, and you don’t say so.*
> >
**⟨Otherwise (V POV)⟩**

> **⟨If not (flag k58Knew set or k58Read = 'wrote')⟩**
>
> > *She says three herself, without looking at him, and folds the menu in half. He does not write it down. He was not asked.*
> >
> **⟨Otherwise⟩**
>
> > *At three she stops, and looks at him, and waits.*
> >
> > **V — choice:** *(She is leaving three to him.)*
> >
> > ▸ **Say three.**
> >
> > > *She takes the pen off his notebook and writes it down herself, under the date, in her neat new handwriting. He lets her.*
> > >
> > ▸ **Wait for her to say it.**
> >
> > > *He nods, as if she has given him a time and an exit, and does not write it down.*
> > >

#### k58\_end

> Plays when: epilogue, flag k58_creak set. Aftermath order: 104 of 104.

- *if `st==='his'`:* The seventh step goes.
- *otherwise:* Somebody steps over the seventh tread and leans on the eighth.

*Some months after the boat. Three in the morning. The back stair.*

**⟨If `k==='mended'`⟩**

> 
> - *if Misaki POV:* *You don’t move. You don’t reach under the pillow. You know who stops on the landing for one second to listen, and you say “V” into the pillow, and he says “Yes,” and the water goes down on the table. It took most of a year.*
> - *otherwise:* *She does not move. Her hand stays where it is. He stops on the landing for one second, and through the door she says “V” into the pillow, and he says “Yes,” and puts the water down. It took most of a year.*
>
> 
> - *if Misaki POV:* *He still says your name at corners sometimes, by accident. Some mornings you catch yourself humming over the cereal, one bar of something, and stop. He never once looks up when you do, which is how you know he heard.*
> - *otherwise:* *He still says her name at corners sometimes, by accident. Some mornings she hums one bar of something over the cereal and stops. He never looks up when she does, and writes it down later, and the notebook has a new page most weeks.*
>
**⟨If `k==='kept'`⟩**

> 
> - *if Misaki POV:* *V comes up the back stair and says your name at the turn, the way he has every night since the infirmary, and you take your hand off the gun under the pillow.*
> - *otherwise:* *He comes up the back stair and says her name at the turn, the way he has every night since the infirmary, and hears her hand come off the gun under the pillow.*
>
> 
> - *if Misaki POV:* *You know it’s him because he tells you. It works. Everything in the house works: the two cups, the name at every corner, the water at three. You run it like a safe house, and you’re both very good at it.*
> - *otherwise:* *She knows it is him because he tells her. It works. The two cups, the name at every corner, the water at three. They run the house like a safe house, and they are both very good at it.*
>
> 
> - *if Misaki POV:* *Some nights you lie there after and try to hear the step under the name, and you can’t, and you go back to sleep anyway, because he said so.*
> - *otherwise:* *Some nights he stays on the landing after and listens to her not sleep, trying to hear the step under his own name.*
>
**⟨Otherwise⟩**

> 
> - *if Misaki POV:* *You don’t text before and you don’t text after. You come home at three and wash your hands once. Clients wait three weeks for you. You’re the best there’s ever been.*
> - *otherwise:* *She does not text before and she does not text after. She comes home at three and washes her hands once. Clients wait three weeks for her. She is the best there has ever been.*
>
> 
> - *if Misaki POV:* *V still says your name at every corner. He still writes the date in the notebook every evening, a column of them going back a year, nothing underneath. You saw it once. You didn’t say anything. Neither did he.*
> - *otherwise:* *He still says her name at every corner. He still writes the date in the notebook every evening, a column of them going back a year with nothing underneath. She saw it once and put it back.*
>
> 
> - *if Misaki POV:* *The seventh step goes at three, and your hand comes up with the gun, and he says your name, and you put it down, and you lie there doing sums until it’s light.*
> - *otherwise:* *At three he says her name on the stair, and hears the gun come up and go down again, and puts the water on the table, and she does sums in the dark until it is light.*
>
**⟨If flag married set⟩**

> 
> - *if `k==='apart'`; if Misaki POV:* *Your ring is on the bedside table, by the water. You take it off for work now. He hasn’t asked.*
> - *if `k==='apart'`; otherwise:* *Her ring is on the bedside table, by the water. She takes it off for work now. He has not asked.*
> - *otherwise; if Misaki POV:* *The rings are on the bedside table, next to the water, where they go at night. He writes down that you hummed. As far as you can tell that’s what being married is: a man writing down that you hummed.*
> - *otherwise; otherwise:* *The rings are on the bedside table next to the water, where they go at night. He writes down that she hummed. As far as he can tell, that is what being married is for.*
>
**⟨If `k58MP()`⟩**

> 
> - *if `p==='r'`; if `k==='mended'`:* *Ronin sleeps through it now. He claims he learned the step too. He hasn’t. He only ever wakes up for strangers.*
> - *if `p==='r'`; otherwise; if Misaki POV:* *Ronin wakes every time and pretends he didn’t, and puts his arm over you, and says something filthy about V’s timing into your hair.*
> - *if `p==='r'`; otherwise; otherwise:* *Ronin wakes every time and pretends he did not, and puts his arm over her, and says something filthy about V’s timing into her hair.*
> - *otherwise; if `k==='mended'`; if Misaki POV:* *Angel stays asleep against your back. She learned V’s step before you relearned it, and never said, so you’d get to do it yourself.*
> - *otherwise; if `k==='mended'`; otherwise:* *Angel stays asleep against Misaki’s back. She learned his step before Misaki relearned it, and never said, so Misaki would get to do it herself.*
> - *otherwise; otherwise:* *Angel is awake every time, watching the door down the same line, and never says a word to V about it in the morning.*
>
**⟨If `k58VP()`⟩**

> 
> - *if `vp==='r'`; if `k==='mended'`:* *Ronin is asleep in V’s bed when he comes back down the hall, and asks without waking up whether she knew him tonight. He says yes.*
> - *if `vp==='r'`; otherwise:* *Ronin is asleep in V’s bed when he comes back down the hall, and asks without waking up whether she knew him tonight. He says not yet.*
> - *otherwise; if `k==='mended'`:* *Angel is asleep in V’s bed when he comes back down the hall, and asks without waking up whether she knew him tonight. He says yes.*
> - *otherwise; otherwise:* *Angel is asleep in V’s bed when he comes back down the hall, and asks without waking up whether she knew him tonight. He says not yet.*
>
**⟨Otherwise⟩**

> 
> - *if `k==='apart'`:* *People still ask whether the two of them are together. Misaki says they’re a set. V says that is accurate, and does not write it down.*
> - *otherwise:* *People still ask whether the two of them are together. Misaki says they’re a set, like a knife and a fork. V says that is accurate, and writes something down under the table.*
>
**⟨If flag heartbreak set⟩**

> *She does not live in the house any more. She stays on Sundays, after the table, and the water still comes up at three.*
>

### 4.2 Other after-phase scenes (not scheduled)

> Ordinary morning events, one-off notes and activities in the after-phase.

#### kd\_lost

> Plays when: after discharge from the infirmary, day 1+ after discharge, fewer than three anchors, at random.

**⟨If Misaki POV⟩**

> *The kettle has boiled dry and switched itself off. She is standing at the counter with a teabag in her hand, and the light in the window has gone from morning to afternoon.*
>
> *She is on the 14 bus with no idea where she got on. Her phone says she bought an sandwich forty minutes ago. It is in her pocket with one bite out of it.*
>
> *She comes back in the middle of a sentence. Angel is looking at her, waiting for the rest of it.*
>
> **Angel:** babe. u stopped.
>
> **Misaki — choice:** 
> - *tier 0:* *(again.)*
> - *tier 1:* *(that’s another one. how long.)*
> - *tier 2:* *(Another one. How long this time?)*
> - *tier 3:* *(Another one. Okay. One: where am I. Two: what’s in my pockets. Three: how long.)*
>
> ▸ **Write it down: the time, the place, what’s in your pockets.** — *(an anchor)*
>
> > **⟨If `S.kd.anc>=3`⟩**
> >
> > > *That makes three times she has caught it and pinned it down. She reads the three entries in a row. They are all in her handwriting, and none of them is missing a line.*
> > >
> > *She writes it on her arm in biro, because the receipt is in her other shoe.*
> >
> ▸ **Text V: “what time did i leave”** — *(an anchor / not close enough)* `greyed out when closeness tier below 1`
>
> > <small>(then the same passage as above)</small>
> >
> > **V:** 09:12. You took the green umbrella and said “back in ten.” It is 13:40.
> >
> > **Misaki:** 
> > - *tier 0:* ok.
> > - *tier 1:* ok. thx. creep.
> > - *tier 2:* Thanks. That’s weirdly exact. Thanks.
> > - *tier 3:* Thank you. Keep doing that. Don’t tell me you’re doing it, just keep doing it.
> >
> ▸ **Act like nothing happened.** — *(−composure)*
>
> > <small>(then the same passage as above)</small>
> >
> > *She puts the kettle back on and gets on with the day that’s left. Nobody saw, so it isn’t on any record, including hers.*
> >
**⟨Otherwise (V POV)⟩**

> *V finds her standing in the hall with one boot on. She has been there long enough for the black hound to lie down across the doorway and wait.*
>
> **V — choice:** *(She is not here.)*
>
> ▸ **Say the time and the day, and wait.** — *(an anchor)*
>
> > <small>(then the same passage as above)</small>
> >
> > **V:** It is Thursday. It is ten past two. You are in the east hall and you have one boot on.
> >
> > **Misaki:** 
> > - *tier 0:* ...ok.
> > - *tier 1:* ok. thursday. ok.
> > - *tier 2:* Thursday. Okay. How long was I—
> > - *tier 3:* Thursday. Ten past two. Okay. How long have I been standing here? Tell me the real number.
> >
> > **V:** Twenty-five minutes.
> >
> ▸ **Say her name.**
>
> > <small>(then the same passage as above)</small>
> >
> > *She comes back fast and hard, with her shoulders up, and it takes her a second to work out who said it.*
> >
> ▸ **Put the kettle on. Say nothing.**
>
> > <small>(then the same passage as above)</small>
> >
> > *The kettle clicks off and she looks round at it. He pours two cups and reads out the time off the oven clock as though to himself.*
> >

#### Tired mornings

> The first few mornings after discharge.

**⟨If out of the infirmary, in the after-phase, `S.kd.tiredDay!==S.day`, `S.day-S.kd.t0<4`⟩**

> **⟨If `S.slot===0`⟩**
>
> > `on screen` 
> > - *if V POV:* She says she slept well. She did not.
> > - *otherwise:* Slept great. (Energy is low.)
> >

#### Small sad things

> After the kidnapping: one quiet line on some mornings, each used once, chosen from what happened.

A shop plays the bank jingle. Misaki finishes paying, says thank you, and walks out with no change and no shopping, and sits in the truck for a while.

There are three scratches on the infirmary wall above the bed. V has had every other wall in the house repainted this year. He has not touched those.

V has not used the word “tall” about anything since. Not doors, not trees, not men. He says “high,” and nobody remarks on it.

Misaki still eats every meal with her back to a wall. At the kitchen island she has moved her stool round to the end, and the dent it has left in the floor is already permanent.

The grey hound slept outside the infirmary door for a week after Misaki left it. Then she started sleeping outside Misaki’s door instead, and has never stopped.

Misaki walks every hallway in the house once before bed, the whole length, like laps. V has noticed, and noticed that she counts them, and leaves the lights on along the route.

There is a paper cup in Misaki’s trailer, on the shelf, washed. It is the one the water came in, the first morning in the cell. She doesn’t know why she kept it.

Some nights V hears counting through the wall, very quiet. He says the day and the place out loud from his own bed. The counting stops. Neither of them ever mentions it.

Misaki has started leaving her phone on, face up, all night, every night, on the pillow next to her. In case. She has never said in case of what.

The note-taker’s handwriting turns up on a delivery slip, or something close to it. Misaki signs for the parcel with her left hand, badly, and then washes both hands three times.

V keeps a page at the back of his notebook headed with the dates she was gone. There is nothing written under them. He has never been able to decide what to write.

Every so often Misaki says “i’m fine” in answer to a question nobody asked.

#### Progress

> A physio or walking session that makes progress: one of these lines.

**⟨If (an internal state check passes)⟩**

> <small>→ after: into the infirmary</small>
>
> Better than yesterday. You write it down. It doesn’t feel like better. It feels like a number.
>
> The hounds keep pace. You keep pace. Nobody can tell from the outside.
>
> Progress. That’s the word the sheet uses. You keep waiting for it to mean you.
>
> Nearly there, V says. Nearly where.
>
> Almost all the way back. To what, you don’t ask.
>
> Done. Six sessions. You did everything right. It didn’t put anything back that mattered.
>

#### clip

> Plays when: in the after-phase, Misaki POV.

*She only wears one star clip now. The other one stayed in that building. She hasn’t bought a replacement.*

**Misaki:** 
- *tier 0:* ...
- *tier 1:* looks better asymmetrical anyway
- *tier 2:* It looks fine with one.
- *tier 3:* I’m not replacing it. One clip stayed in that building, and I didn’t. I win.

#### brac\_off

> Plays when: in the after-phase, flag brac_v set.

*The bracelet she made V sits on her nightstand instead of her wrist.*

*She tried to put it on. The cord against her wrist felt like something else. She’ll try again next week.*

#### mirror

> Plays when: in the after-phase, Misaki POV, from day 2 after her return.

*At a red light she catches herself watching the mirror for a grey van. There isn’t one. She watches for the whole drive anyway.*

#### angel\_sleeves

> Plays when: in the after-phase, Angel friendship 1+, Misaki POV.

**Angel:** hey. i noticed the sleeves.

**Angel:** i’m not gonna ask. i just— i wore long sleeves for a whole summer once. after miguel. so. i know.

**Angel:** that’s all. wear what you want around me.

#### ronin\_bulb

> Plays when: in the after-phase, Ronin friendship 1+, Misaki POV.

**Ronin:** Hey. Little killer. You ever want somebody to break every lightbulb in a building, you call me.

**Ronin:** I’m serious. I know what one fuckin’ lightbulb does to a person. Don’t ask.

#### v\_door

> Plays when: in the after-phase, V POV, closeness tier 2+.

*V has started sleeping in the chair by the front door. He tells the dogs it’s for the view.*

*There isn’t a view. There’s a door.*

#### shower\_door

> Plays when: in the after-phase, flag vShower set, Misaki POV.

*At V’s, she showers with the bathroom door open a crack.*

*He sits in the hallway with his back to the wall and reads out loud, something boring about tax law, so the whole time she can hear that someone is there and that it’s him.*

#### v\_notice\_bed

> Plays when: in the after-phase, flag vbedBefore set, V POV, within 7 days of her return.

*She stays over. She stops outside his door, hand half raised, and then she takes the couch.*

*He hears her stop. He doesn’t open the door. In the morning there are two blankets on her, and he doesn’t mention it, and neither does she.*

#### nightmareV

> Plays when: (in the after-phase or Act II), closeness tier 2+, Misaki POV, no romance with Angel or Ronin.

*She falls asleep on V’s couch and wakes up at 3am, gasping, not sure where she is.*

*V is in the doorway before she’s fully upright. There’s a knife in his hand. He grabbed it before he was awake.*

**V:** What is it? Who—

*He sees there’s no one to fight. He sets the knife down on the shelf, slowly, where she can see it.*

**V:** A nightmare. May I sit with you? Or hold you? You may refuse both.

**Misaki:** 
- *tier 0:* ...sit.
- *tier 1:* sit. just sit.
- *tier 2:* Hold me. Please. Just for a minute.
- *tier 3:* Both. Hold me, and don’t go anywhere after.

*He does exactly what she asks and nothing more. She hasn’t felt that safe in weeks.*

#### gl\_ph\_after

> Plays when: in the after-phase.

**⟨If `ME3()`⟩**

> *Four in the morning. You come down for water and she is at the window again, wrapped in a blanket, watching the empty drive.*
>
> **V:** You should sleep.
>
> **Misaki:** there were no windows. where they had me. not one. i didn’t know that would be the worst part.
>
> **Misaki:** i kept thinking, if i could just see a street. any street. a guy walking a dog. i’d know it was all still out there. i’d know i was still somewhere.
>
> **V:** It was all still out there. I was out there. Looking.
>
> **Misaki:** i know. i know that now.
>
> *She moves the blanket so there is room for you. You sit. The two of you watch the empty drive until the first delivery van comes up it, at six, and the driver yawns, and the morning starts happening again.*
>
**⟨Otherwise⟩**

> *Your first night back, you can’t sleep. You go to the window and stand there with your forehead against the cold glass, watching nothing much: a lamp, a wet road, a moth.*
>
> **Misaki:** there you are.
>
> *In the cell there were no windows at all. You didn’t know until then how much you needed them: the street, the show, the proof it was all still running without you.*
>
> *A delivery van comes up the road at six. The driver yawns. You have never been so glad to see a stranger yawn in your life.*
>
> **Misaki:** hi. hi. ok. still on. everything’s still on.
>

#### Flashbacks

> After-phase, Misaki: a flashback in some rooms.

- *one of:* *Count the tiles. Forty-one. Count them again.*
- *one of:* *Your name. What is your name. What is—*
- *one of:* *The water is there. Don’t look at him. Drink the water.*

<small>→ breathing minigame</small>

**⟨If `misWhereBase===undefined?false:(vWhere()===id)`⟩**

> **V:** 
> - *if success:* Misaki. You are in my house. The door is behind me, and it is open. You are safe, and you are here, and I am not going anywhere.
> - *otherwise:* Misaki. Misaki. Look at me, away from the light. You are here. Say your name. Good. Again.
>
**Misaki:** 
- *if success; tier 0:* ...ok. ok. i’m here.
- *if success; tier 1:* ok. ok ok. i’m here. i’m fine.
- *if success; tier 2:* I’m here. I’m here. It’s just the light. It’s just a light.
- *if success; tier 3:* One: that was then. Two: this is V’s house. Three: I know where every door is.
- *otherwise; tier 0:* ...
- *otherwise; tier 1:* sorry. give me a second. give me a minute.
- *otherwise; tier 2:* I need a minute. I’m sorry. I need a minute.
- *otherwise; tier 3:* Give me a minute. It passes. It always fucking passes, I just hate waiting.

#### Breathing

> The breathing minigame (on-screen text).

- *if `isTouch()`:* Hold a finger down to breathe in as the circle grows.
- *otherwise:* Hold E to breathe in as the circle grows.

`on screen`

> **⟨If `t>=L[ph]`⟩**
>
> > 
> > - *if `ph==='in'`:* In…
> > - *otherwise; if `ph==='hold'`:* Hold it… (keep holding)
> > - *otherwise; otherwise:* Let go. Out…
> >
> > **⟨If `ph==='in'`⟩**
> >
> > > **⟨If `cyc>=4`⟩**
> > >
> > > > 
> > > > - *if `good/f>.7`:* Steadier.
> > > > - *otherwise:* Still shaking.
> > > >

#### After-phase nights

> Each night in the after-phase.

**⟨If Misaki POV⟩**

> **Misaki — choice:** 
> - *tier 0:* *the lamp.*
> - *tier 1:* *the lamp. on or off.*
> - *tier 2:* *The lamp. On, or off.*
> - *tier 3:* *The lamp. I keep looking at the switch.*
>
> ▸ **Leave it on. Sleep sitting up, back to the wall.** — *(\+composure)*
>
> > *She sleeps in pieces. Twenty minutes. Ten. Twenty. The light stays on.*
> >
> ▸ **Turn it off.** — *(she might be ready / risky)*
>
> > **⟨If composure 65+⟩**
> >
> > > *The dark is just dark. A room. A ceiling. Her own breathing. She lies awake for an hour, and then, impossibly, she sleeps.*
> > >
> > > **Misaki:** 
> > > - *tier 0:* 
> > > - *tier 1:* huh.
> > > - *tier 2:* First night in the dark. I did it. I actually did it.
> > > - *tier 3:* I did it. I’m telling V in the morning. He’s going to pretend not to be proud and do a terrible job.
> > >
> > **⟨Otherwise⟩**
> >
> > > *She turns it off. The dark comes down like a hood.*
> > >
> > > *She’s on the floor with the lamp back on before she knows she moved. She doesn’t try again.*
> > >
> ▸ **Call V.** — *(they took your phone / not close enough / +composure ♥)* `greyed out when closeness tier below 1 or Misaki in the infirmary, she still thinks it is a cell (clarity under 2)`
>
> > **V:** Misaki. I am here. You do not need to say anything. I will simply talk, and you will listen, and at some point you will fall asleep, and I will stay on the line until I hear that you have.
> >
> > **V:** Tonight’s topic is the history of tax law, from the first income tax onward. It is extraordinarily dull. I have prepared notes.
> >
> > *She falls asleep somewhere around 1873. He stays on the line until morning.*
> >
> ▸ **Don’t sleep.** — *(−energy)*
>
> > *She sits up and watches the door until the sky goes grey. Some nights that’s easier than closing her eyes.*
> >
**⟨Otherwise (V POV)⟩**

> **V — choice:** *3:12 AM. The phone lights up: hitmeuppp is calling.*
>
> ▸ **Answer, and talk until she sleeps** — *(\+composure)*
>
> > **Misaki:** 
> > - *tier 0:* ...
> > - *tier 1:* hey. sorry. couldn’t sleep.
> > - *tier 2:* Sorry, I know it’s late. I need a voice that isn’t in my head, and yours is the most boring one I know.
> > - *tier 3:* I had the dream again. Fuck. Can you just talk? Anything. Tax law. I don’t care.
> >
> > **V:** I am here. Tonight I will tell you about every dog I have ever rescued, in chronological order, with full veterinary histories.
> >
> > *She falls asleep somewhere around the fourth dog. He stays on the line until morning.*
> >
> ▸ **Drive over** — *(\+composure ♥♥)*
>
> > *He’s there in nineteen minutes. He doesn’t knock; he texts “Outside.” She opens the door and stands back to let him in, so he’s never behind her.*
> >
> > *He sits on the floor by the door until she falls asleep, and stays awake all night without minding.*
> >
> ▸ **Text: “I am here.”** — *(\+composure)*
>
> > *“I am here.” Three dots appear and disappear for twenty minutes. Then: “ok.” Then, later: “thank you.”*
> >
> ▸ **Work on the list instead** — *(\+vengeance)*
>
> > *V lets it ring. He has a file open and three names highlighted, and he tells himself this is how he is helping. In the morning there is one missed call. He thinks about it all day.*
> >

### 4.3 Phone threads

#### Thread: Misaki and Ronin (tx\_kd\_ron)

> Plays when: after discharge from the infirmary, Ronin friendship 1+, day 1+ after discharge.

`message start`

**Ronin:** you owe me twenty dollars from tuesday

**Ronin:** and don’t cha try “I was kidnapped tuesday” either. it was the tuesday before

▸ **Misaki:** **“…did i? ok. sending it”**

> **Ronin:** fuck. you actually paid
>
> **Ronin:** you didn’t owe me shit. I was checkin’ somethin’. you can’t tell anymore, can you
>
> **Ronin:** keepin’ the 2000 though. finder’s fee
>
> <small>→ goes to “two”</small>
>
▸ **Misaki:** **“bullshit. i’d remember”**

> **Ronin:** yeah you would. good
>
> **Ronin:** that asshole with the clean hands lied to you about your own life for days. figured I’d see if it stuck
>
> **Ronin:** it didn’t. buy me a beer anyway
>
> <small>→ goes to “two”</small>
>
▸ **Misaki:** **“ask V. he writes everything down”**

> **Ronin:** already did. he sent a fuckin’ spreadsheet. you owe me nothin’, I owe you six for noodles
>
> **Ronin:** he’s a creep. useful creep
>
> <small>→ goes to “two”</small>
>
`message two`

**Ronin:** anybody tells you shit about yourself that you can’t check, you run it past me or Vee first. I’ll lie to you too, but I’m funnier about it

**Ronin:** even if it’s nice. especially if it’s fuckin’ nice

▸ **Misaki:** **“…ok”**

> **Ronin:** good. now fuck off, I’m watchin’ Heathers
>
▸ **Misaki:** **“that’s almost sweet”**

> **Ronin:** say that again and it’s forty
>

#### Thread: Misaki and Angel (tx\_kd\_angel)

> Plays when: after discharge from the infirmary, Angel friendship 1+, she has lost an afternoon.

`message start`

**Angel:** ok be honest. do u remember the photo booth. last month. the one where u bit the strip

▸ **Misaki:** **“obviously”**

> **Angel:** good. bc i have the strip and u look feral
>
> **Angel:** new rule tho. i timestamp everything now. u, me, lunch, all of it
>
> <small>→ goes to “album”</small>
>
▸ **Misaki:** **“...no”**

> **Angel:** fine. i have it. i have everything, i’m a hoarder with a ring light
>
> **Angel:** it was a tuesday, 4:12pm. u bit the strip, the machine ate ur five dollars and u threatened it
>
> **Angel:** i timestamp everything now. u, me, lunch, all of it
>
> <small>→ goes to “album”</small>
>
`message album`

**Angel:** i made an album. it’s called “misaki was here.” it’s shared and it’s already got 40 things in it

**Angel:** alibis are my whole job. anybody ever tells u where u were, u check the album first. then u give me the name of whoever lied, and i go and have a night out

▸ **Misaki:** **“add the one where i’m asleep on ronin’s couch”**

> **Angel:** already in. three angles
>
▸ **Misaki:** **“this is surveillance”**

> **Angel:** yes. with a filter. ur welcome
>

#### Thread: V and Misaki (tx\_kd\_mv)

> Plays when: after discharge from the infirmary, closeness tier 1+, day 2+ after discharge.

`message start`

**Misaki:** what did i have for breakfast

**Misaki:** it’s not a test for u. it’s a test for me. i wrote my answer down first

▸ **V:** **“Rice. One egg. You left the yolk.”**

> **Misaki:** ok good. same as mine
>
> **Misaki:** ...which mug
>
> <small>→ goes to “mug”</small>
>
▸ **V:** **“I was not watching.”**

> **Misaki:** liar. u watch everything. it’s fine. i need u to
>
> **Misaki:** rice and an egg. i left the yolk. which mug
>
> <small>→ goes to “mug”</small>
>
`message mug`

**Misaki:** i wrote the blue one

▸ **V:** **“The green one. The blue one is still in the sink.”**

> **Misaki:** ok. so i’m off by one mug
>
> **Misaki:** i’ll take one mug. yesterday i was off by a whole afternoon
>
▸ **V:** **“Does it matter which mug?”**

> **Misaki:** yes. it matters which mug
>
> **Misaki:** if i can be wrong about the mug i can be wrong about the room. tell me which mug, V
>

#### Thread: Misaki and V (tx\_kd\_fine)

> Plays when: after discharge from the infirmary, closeness tier 1+. Full-story setting only (cut from injuries-only).

`message start`

**V:** The doctor says you told her that you are fine.

▸ **Misaki:** **“i AM fine”**

> **V:** This morning you asked me to pass the salt with a hand that has two steel pins in it.
>
> **V:** You have not looked at that hand since Tuesday. I have been counting.
>
> <small>→ goes to “list”</small>
>
▸ **Misaki:** **“it’s just stiff”**

> **V:** It was broken on the first day and again on the third. “Stiff” is your word for it. I am not correcting you. I am telling you that there is another word.
>
> <small>→ goes to “list”</small>
>
`message list`

**V:** Do you want the list? I can send one line of it or all of it. You may also say no.

▸ **Misaki:** **“one line”**

> **V:** Left foot: fractured, then walked on for roughly two kilometres.
>
> **V:** That is the distance to my door. You told me that you ran part of it.
>
▸ **Misaki:** **“all of it”**

> **V:** Left hand, twice. Right shoulder. Three ribs. The foot. Both wrists, to the tendon. Fourteen sutures. Two teeth. Seven kilograms.
>
> **V:** Your back, which I will describe if you ask and not otherwise.
>
> **V:** You said “fine” in the car. I believe that you meant it. That is the part that frightens me.
>
▸ **Misaki:** **“no”**

> **V:** Then I will keep it. Ask when you want it.
>

#### Thread: V and Misaki (tx\_a60\_after)

> Plays when: not in the dark stretch, phase: act2 / act3 / epilogue, flag kd60_rule set.

`message start`

**Misaki:** if it happens again. i mean it. 48h then move on

**Misaki:** write it down so u have to

▸ **V:** **“I have written it down.”**

> **Misaki:** did u
>
> **Misaki:** send a photo
>
▸ **V:** **“No.”**

> **Misaki:** V.
>
> **Misaki:** ok. noted. i’m noting that ur a liar
>

#### Thread: Misaki and V (tx\_a60\_grey)

> Plays when: not in the dark stretch, phase: act2 / act3 / epilogue, flag kd60_rule set.

`message start`

**V:** Angel has asked whether your line on the list should stay grey. I told her it was your decision.

▸ **Misaki:** **“leave it grey a bit”**

> **V:** Understood.
>
▸ **Misaki:** **“un-grey it. i’m back”**

> **V:** I will tell her. She will make it pink.
>

### 4.4 Talk topics

#### Topic: “what are you going to do to them?” (them)

> Offered when: after the kidnapping (dark). Talk topic: Misaki talks to V (Misaki’s POV).

**V:** 
- *tier 0:* What is necessary. I am not holding back anymore.
- *tier 1:* What they did to you, Misaki. Twice. With interest. My father taught me a great deal about interest.
- *tier 2:* I stopped keeping the ledger. I do not write their names down anymore. I just go.
- *tier 3:* Everything I once promised myself I would never do. I have reread the promise. I no longer recognise the man who made it.

**Misaki:** 
- *tier 0:* …ok
- *tier 1:* good
- *tier 2:* good. i want to watch
- *tier 3:* then i’m coming with you.

#### Topic: “Will you tell me what they asked you?” (mtaken)

> Offered when: after the kidnapping (dark). Talk topic: V talks to Misaki (V’s POV).

**Misaki:** 
- *tier 0:* nothing. drop it.
- *tier 1:* about the server. i didn’t tell them. mostly.
- *tier 2:* they asked who K9 was. i named ur dogs in my head, in order, like forty times. told them jack shit
- *tier 3:* they asked about you. every time. i said nothing every time. put that on my tombstone.

**V:** 
- *tier 0:* ...Of course.
- *tier 1:* Thank you. It will be repaid, on them.
- *tier 2:* I will think about the dogs, too, then. When it is my turn to ask questions.
- *tier 3:* I will carve it myself. In marble. Very large letters.

#### Topic: “Do you think you will go back to it? The work?” (mafter)

> Offered when: after the kidnapping (dark). Talk topic: V talks to Misaki (V’s POV).

**Misaki:** 
- *tier 0:* dunno.
- *tier 1:* my hands shake now. not a lot. enough.
- *tier 2:* I don’t know if I can hold a rifle steady anymore. Me! Straightest shot in the city. It’s fucking humiliating.
- *tier 3:* Oh, I’m going back. Rent, sure, but first: everybody who runs a room with one lightbulb. I know what that room’s like now. They’ve got it coming.

**V:** 
- *tier 0:* Then do not decide yet.
- *tier 1:* Hands heal. I have set enough of them to know.
- *tier 2:* Then we will find out. The training hall is yours when you want it.
- *tier 3:* Then there will be fewer of those rooms. I will bring you the addresses.

#### Topic: [Sit with her. Say nothing at all.] (quiet)

> Offered when: after the kidnapping (dark). Talk topic: V talks to Misaki (V’s POV).

*You sit on the floor, an arm’s length away, facing the same direction. Neither of you speaks. After a while her breathing slows to match yours.*

**Misaki:** 
- *tier 0:* ...
- *tier 1:* ...thanks.
- *tier 2:* Thanks. Everyone else wants me to talk about it. Angel sent a worksheet.
- *tier 3:* You never make me talk. Everyone else wants the story, with details, like it’s a fucking podcast. You just sit there.

#### Topic: Tell her about your day in exhaustive, deliberately boring detail (boring)

> Offered when: after the kidnapping (dark). Talk topic: V talks to Misaki (V’s POV).

**V:** The board convened at nine. There were pastries. The chairman selected a cruller, which I believe to be a statement. We then spent forty minutes on the precise shade of beige for the new clinic signage.

**Misaki:** 
- *tier 0:* ...keep going.
- *tier 1:* keep going. what shade of beige.
- *tier 2:* Keep going. Which beige. I need to know which beige, V, this is the most important thing in my life.
- *tier 3:* Keep going. I’m serious. When you do the boring voice the room gets bigger. Beige. Go.

**V:** Ecru. They chose ecru. I opposed ecru. I lost.

#### Topic: Comfort her (touch)

> Offered when: after the kidnapping (dark). Talk topic: V talks to Misaki (V’s POV).

- *if `S.learn`, `S.learn.behind`:* you’ve learned
- *otherwise:* careful

▸ **Ask first: “May I take your hand?”**

> **⟨If composure 30+⟩**
>
> > **Misaki:** 
> > - *tier 0:* ...ok.
> > - *tier 1:* yeah. ok.
> > - *tier 2:* Yes. Thanks for asking. Nobody in that place asked me shit, they just did it.
> > - *tier 3:* Yes. Obviously yes, it’s you. Keep asking anyway. I like that you ask, okay, shut up.
> >
> > *Her hand is cold. She holds on tight.*
> >
> **⟨Otherwise⟩**
>
> > **Misaki:** 
> > - *tier 0:* no.
> > - *tier 1:* not yet. sorry.
> > - *tier 2:* Not yet. Sorry. Fuck. The asking’s good, though. Keep the asking.
> > - *tier 3:* Not yet. Ask me again tomorrow. Please ask again tomorrow.
> >
> > **V:** There is nothing to apologise for. I will ask again tomorrow.
> >
**⟨If `!(S.learn&&S.learn.behind)`⟩**

> ▸ **[Step behind her and rest a hand on her shoulder]**
>
> > Misaki can’t have anyone behind her anymore. Approach from the front. Always.
> >
> > *She’s across the room before you’ve finished the motion, back against the wall, breathing like she’s been running. Her eyes don’t see you for a long second.*
> >
> > **Misaki:** don’t— not from behind. not ever. not from behind.
> >
> > **V:** That was my error. It will not happen again.
> >
> > *It takes her a long time to come back to the middle of the room.*
> >
**V — choice:** *(She is sitting very still.)*

#### Topic: “Will you tell me about the third day?” (third)

> Offered when: after the kidnapping (dark), closeness tier 3+. Talk topic: V talks to Misaki (V’s POV).

she may not be ready

On the third day, Misaki forgot her own name for a minute. She found it again by remembering how V says it.

**Misaki:** It wasn’t— it isn’t what you’re thinking. Nothing like that. They were careful not to leave marks anyone could photograph.

**Misaki:** It was just so fucking long. The light never went off. Same question, same voice, until the words were just noise.

**Misaki:** And at the end of it, I couldn’t remember my own name. Just for a minute. I had to go looking for it.

**Misaki:** I got it back by thinking about how you say it. Slow, like you’re filing it. Don’t make a face.

**V:** ...

*V says nothing for most of a minute. When he finally stands, he very carefully does not let her see his face. Later, she will notice a new line written at the bottom of his list.*

#### Topic: “Will you tell me what they asked you?” (mtaken)

> Offered when: after the kidnapping (dark). Talk topic: V talks to Misaki (V’s POV).

**Misaki:** 
- *tier 0:* nothing. drop it.
- *tier 1:* about the server. i didn’t tell them. mostly.
- *tier 2:* They asked who K9 was. Over and over. I thought about the dogs instead. The old hound, mostly. It helped more than I can explain.
- *tier 3:* They asked about you. Every time. I said nothing every time. I want that on my tombstone, V. Not my name. That.

**V:** 
- *tier 0:* ...Of course.
- *tier 1:* Thank you. That is more than anyone should have had to carry.
- *tier 2:* I will think about the dogs, too, then. When it is my turn to ask questions.
- *tier 3:* Then I will carve it myself. In marble. And then I will go and find every person who asked.

#### Topic: “stand where i can see u.” / “can u stand where i can see you?” / “Can you stand in front of me? Where I can see you?” / “Stay in front of me. Where I can see your hands. ...Sorry. I know that’s weird.” (stay)

> Offered when: after the kidnapping (dark). Talk topic: Misaki talks to V (Misaki’s POV).

*V moves without a word, to the middle of the room, in her line of sight. He keeps his hands visible, open, resting on the table.*

**V:** Here. You will not have me behind you again.

#### Topic: “What colour were his shoes?” (kd\_shoes)

> Offered when: after discharge from the infirmary, she let it go blank. Talk topic: V talks to Misaki (V’s POV).

**Misaki:** 
- *tier 0:* whose.
- *tier 1:* whose shoes.
- *tier 2:* Whose shoes?
- *tier 3:* Whose? ...Oh. I had that. I had that last week.

**V:** The man with the radio. Brown, resoled twice. It does not matter.

**Misaki:** 
- *tier 0:* ok.
- *tier 1:* ok. so u have it and i don’t.
- *tier 2:* So you have it now and I don’t.
- *tier 3:* So it’s all in your head now and none of it’s in mine. You look like shit, by the way. Are you sleeping?

*He says that he is. She watches him wash the same cup twice.*

#### Topic: “did you look? chapter one.” (kd\_file)

> Offered when: the chapter-one file is open to talk about. Talk topic: Misaki talks to V (Misaki’s POV).

**V:** I did. I told you that I would, and I prefer to say so in advance.

**V:** There is nothing before you were nine: no school, no clinic, no birth registered under any spelling. I am good at finding things. Somebody was better at removing them.

*He puts an envelope on the table. The earliest paper with her on it is a school enrolment form, and a child has filled in the date-of-birth box.*

**Misaki — choice:** *(The envelope.)*

▸ **Open it.**

▸ **“you keep it.”**

> **V:** It will be in the archive, filed under M. You need only ask.
>
> *She pushes it back across the table with one finger and goes to find a hound.*
>
▸ **Burn it.**

> *She burns it in the sink. He opens the window and says nothing about the smoke alarm.*
>

#### (kd\_file, continued) The invented mother

> Part of the kd_file topic: if the invented mother came up in the cell.

**⟨If flag kdMother set⟩**

> **V:** The woman two towns over does not exist. The number he dialled is a fax machine in a betting shop. I checked that first.
>
> **Misaki:** 
> - *tier 0:* knew that.
> - *tier 1:* i knew that. obviously.
> - *tier 2:* I knew that. I wanted it for about four seconds.
> - *tier 3:* I knew that. I wanted her for four seconds, and I’d like those four seconds back with interest.
>

#### (kd\_file, continued) The enrolment form

> Part of the kd_file topic: the enrolment form, if opened.

*“March,” in pencil, in her own nine-year-old handwriting, with the M the wrong way round. She had always thought somebody told her. She picked it herself.*

**Misaki:** 
- *tier 0:* i made it up. lol.
- *tier 1:* i made up my own birthday. at nine. iconic.
- *tier 2:* I made up my own birthday. Nobody gave it to me. I chose March.
- *tier 3:* So nobody ever told me. I was nine, I looked at a box on a form, and I picked March. That’s the oldest thing I own.

**V:** Whoever took a child off paper that completely did it for a living. I would like to meet them.

#### Topic: “I looked for chapter one.” (kd\_file)

> Offered when: the chapter-one file is open to talk about. Talk topic: V talks to Misaki (V’s POV).

**V:** I said that I would find out. There is nothing before you were nine: no school, no clinic, no birth under any spelling. Somebody removed it, and they were good.

**Misaki:** 
- *tier 0:* ok.
- *tier 1:* so my head lost it AND the paper lost it. cool.
- *tier 2:* So it isn’t only my head. Somebody did the paper as well.
- *tier 3:* So my head and the city records lost the same nine years. That’s two of us who can’t find me, and one of us is a filing cabinet.

**V — choice:** *(The envelope with the enrolment form is in his coat.)*

▸ **Give it to her.**

▸ **Keep it until she asks.**

> *He leaves it in his coat. She has had enough paper about herself this month.*
>

#### Topic: “if i lose more. will u tell me.” (kd\_backup)

> Offered when: after discharge from the infirmary, closeness tier 1+, she has lost an afternoon. Talk topic: Misaki talks to V (Misaki’s POV).

**Misaki:** 
- *tier 0:* if i lose stuff. u tell me. ok?
- *tier 1:* if i start losing days again. u tell me what’s missing. deal?
- *tier 2:* If I lose more. Days, people. You tell me what’s gone. Deal?
- *tier 3:* If I can drop nine years and then [hours] hours, I can drop you. If that happens you walk up and tell me who you are. Promise me. I’m serious.

**V:** 
- *tier 0:* Yes.
- *tier 1:* Yes. I will tell you what I saw, and nothing that I did not see.
- *tier 2:* Yes. What I saw, with the time and the date. I will not tidy it.
- *tier 3:* Then I will introduce myself. I am told I make a poor first impression, and you stayed regardless.

*He takes out the notebook he keeps her quotes in, turns to a clean page, and writes the date at the top.*

#### Topic: “do you still step on it? the seventh one.” (k58\_t\_step)

> Offered when: not in the dark stretch, flag k58_creak set, after discharge from the infirmary. Talk topic: Misaki talks to V (Misaki’s POV).

**V:** 
- *if `k58St()==='his'`:* Every time. It is the only promise I have kept without having to think about it.
- *otherwise:* I step over it, and lean on the eighth, as you told me I do. I have not changed how I walk. I would not know how.

**V:** 
- *if k58Name = 'name':* I say your name as well, now. I can stop either one, if you ask me.
- *otherwise:* I stand in the light as well, now, until you have looked. I can stop, if you ask me.

**Misaki:** 
- *tier 0:* don’t stop.
- *tier 1:* don’t stop. not yet.
- *tier 2:* Don’t stop. Not yet.
- *tier 3:* Don’t stop. Not yet. I’ll tell you when. I want to be the one who tells you.

#### Topic: “Shall I keep saying your name at corners?” (k58\_t\_corner)

> Offered when: not in the dark stretch, flag k58_creak set, after discharge from the infirmary. Talk topic: V talks to Misaki (V’s POV).

**Misaki:** 
- *if flag k58Knew set; tier 0:* ...sometimes.
- *if flag k58Knew set; tier 1:* sometimes. when i’m asleep.
- *if flag k58Knew set; tier 2:* Only when I’m asleep. I’ve got the rest.
- *if flag k58Knew set; tier 3:* Only at three. The rest of the time I’d rather know it’s you. I can now. Mostly.
- *otherwise; tier 0:* yes.
- *otherwise; tier 1:* yes. keep saying it.
- *otherwise; tier 2:* Yes. Keep saying it.
- *otherwise; tier 3:* Yes. Keep saying it. Not forever. Until I tell you to stop. I want it to be me who says stop.

**V:** Then I will keep saying it until you tell me.

**Misaki:** 
- *tier 0:* ok.
- *tier 1:* ok. don’t make it weird.
- *tier 2:* Okay. Don’t make it a whole thing.
- *tier 3:* Okay. Don’t write that down either. You’re writing it down. I can see the pen.

## 5. Endings and the lone routes

### 5.1 V alone after the spiral

> lateRoute = self (Misaki died in the infirmary). V’s lone route.

#### After the spiral

> V’s lone route after the spiral (lateRoute = self): one per morning.

*He closes the infirmary. He doesn’t lock it; she never liked a locked door. He takes the door off its hinges and leans it against the wall of the corridor, so that the room can never be shut again, and then he doesn’t go down to sublevel two for a month.*

*The grey hound goes down every night. He hears her claws on the stairs at two in the morning. He doesn’t stop her. In the morning she comes up and lies across his feet and does not eat until he puts her bowl beside the empty doorway.*

*Angel comes on the fourth day with no makeup on. He has never seen her without it. She sits on the kitchen floor with her back against the island where Misaki ate cereal, and doesn’t say anything for an hour.*

**Angel:** she said goodbye to you. through the door. i know, i heard you tell ronin. she said goodbye to you and you said you’d pass it on.

**Angel:** did you pass it on, V. did you tell her yourself what she said. did you tell her it wasn’t your fault.

*He doesn’t answer. She takes his hand, the left one, and holds it in her lap, and they sit there until the light goes.*

*Ronin doesn’t come for nine days. On the tenth, V finds him in the garage at four in the morning with the crowbar, taking Misaki’s truck apart very slowly, one bolt at a time, laying every part out on a tarp in rows.*

**Ronin:** I keep thinkin’ I can put it back together better. Y’know. If I do it right this time.

**Ronin:** Two streets over, Vee. And then four feet. You were four feet away. Through a fuckin’ door.

**V:** I know.

**Ronin:** Yeah. Yeah, you do. Fuck. Sorry. Pass me the eleven.

*V passes him the eleven. They take the truck down to its frame together without speaking, and in the morning they put it back, every bolt, exactly as it was, because neither of them could stand it being any different.*

*He makes tea at six in the morning and pours two cups before he notices. He does not pour the second one out. He leaves it on the island, where her stool used to be, until it goes cold, every day.*

*Somewhere in the second month he realises he has started saying the date out loud when he wakes up. It is Tuesday. It is my house. Nobody is listening. He keeps doing it.*

**V:** (I said it to her for four days through a door. She could not hear it. I will say it for the rest of my life to a room where she cannot hear it either. It is the same thing. It was always the same thing.)

*In her trailer, on the shelf, he finds a paper cup, washed, and next to it the rent receipt she was so proud of, PAID, pinned to the wall with a star clip.*

*He sits down on the trailer floor with his back to the bed. It is the first time since the infirmary that he cries, and he does it the way he does everything, thoroughly, without hurrying, until it is finished, and then he gets up and feeds the hounds.*

#### After the spiral, more

> Continues the list above (KD_AFTER): V alone after the spiral.

**⟨If (an internal state check passes)⟩**

> *Her name on the server goes grey. Hours become days under it: last online 9 days ago, 2 weeks ago, a month ago. Angel cannot make herself remove her. Nobody can.*
>
> *At three in the morning, once, the grey name shows as typing. It is Angel, logged into Misaki’s account from the trailer laptop, typing nothing, just to see the dots. V watches the dots for twenty minutes. Then they stop.*
>
> *He finishes the list. Every name on it. The driver, the radio man, the note-taker, the one behind the chair. He does them slowly and thoroughly and there is nothing left of any of them.*
>
> *He waits to feel it, afterwards, at the kitchen island. He waits a long time. The list is finished and she is still dead, and the hounds are fed, and it is Tuesday.*
>
> *On her trailer fridge there is still a sticky note in his handwriting: “Eat. —V.” He wrote it the week they met. She never took it down.*
>
> *He stands in front of it for a long time. He does not take it down either. He adds one underneath, in the same pen, and leaves before he can read it back: “I did. —V.”*
>
> *January. He updates the files. He gets to hers and cannot write the word. He sits with the pen over the page for an hour, and the ink dries on the nib, and he puts the file back unfinished. It stays unfinished. He never closes it.*
>
> *He goes to the station bench, the one she did the sums on at sixteen. He sits where she sat. A train comes and goes. Another.*
>
> **V:** (Five years, she gave herself. She got a little over that. I was there for one of them. She said it was the best one. She was being kind, or she was being honest, and I would give anything to know which.)
>
> *Every morning he goes down the row of hounds and tells each one she is good, out loud, by colour. The grey, the old, the black, the pale. Somebody has to tell them every day, or they forget. Somebody told him that once, through a door.*
>
> *He has not missed a day. He will not miss a day. It is the one instruction he was given that he can still follow.*
>

#### Sit in the infirmary doorway

> V’s lone route after the spiral: “Sit in the infirmary doorway”, once a day.

▸ **Sit in the infirmary doorway** — *(done today / costs time)* `greyed out when it is too late in the day or already done today`

> *He sits in the doorway where the door used to be. The bed is made, hospital corners. He made it the morning after and has not touched it since.*
>
> **V:** It is Tuesday. It is my house.
>
> *He reads aloud to the empty room. Tax history, chapter six. He reads until his voice goes, and then he sits, and the grey hound comes down the stairs and lies across the threshold beside him.*
>
> *He sits in the doorway and does the crossword, and fills in seven down, which he has always left for her.*
>
> *He tells the empty room what the hounds did today, who ate what, who was sick on the stairs, the way he would have told her through the door. It takes four minutes. Then there is nothing else to say, and he sits there for an hour anyway.*
>

### 5.2 The lone routes after the late routes (Act II alone)

> After lateV (V too late, Misaki POV gone) or lateM (V dies), and after the spiral: Act II is played alone.

#### Six weeks later

> Six weeks later, the lone route (Act II alone).

**⟨If V’s lone route⟩**

> *Six weeks later.*
>
> *V goes back to work, because the alternative is the chair by the door.*
>
> *He still pours two cups. He’s stopped noticing that he does it.*
>
> *Then, on a Tuesday, a man V ruined on paper is found dead in an alley with a K9 dog tag in his hand.*
>
> **V:** Good. Let them come. I have nothing left that they can take.
>
> *ACT II — THE MIMIC (ALONE)*
>
**⟨Otherwise⟩**

> *Six weeks later.*
>
> *Misaki lives in the trailer, parked behind his greenhouse. Somebody has to feed the dogs. Angel says that’s why. It isn’t why.*
>
> *The foundation is planning a memorial gala in his name. Nobody asked her to help. She helps anyway.*
>
> *Then, on a Tuesday, a man V ruined on paper is found dead with a K9 dog tag in his hand.*
>
> **Misaki:** no. fuck no. you don’t get to use his name.
>
> *ACT II — THE MIMIC (ALONE)*
>

#### Lone beats

> Lone route: beats by Act II day.

`1`

> **⟨If V’s lone route⟩**
>
> > *He sets the table for two without thinking. The grey hound sits in the empty chair. He lets her.*
> >
> **⟨Otherwise⟩**
>
> > *She wakes up reaching for her phone to text him. She types “did u eat”. She doesn’t delete it. She doesn’t send it.*
> >
`3`

> *A second body. Another tag.*
>
> **⟨If V’s lone route⟩**
>
> > **V:** They are wearing my name like a coat. I would burn it, if it were still mine.
> >
> **⟨Otherwise⟩**
>
> > **Misaki:** stop. stop using his name. he’s not here to stop you, so i will.
> >
`5`

> *The next target is found dead before anyone gets there. Tag in his pocket.*
>
> **⟨If V’s lone route⟩**
>
> > **V:** Whoever this is knows the server. Knows her contracts. Knew her.
> >
> **⟨Otherwise⟩**
>
> > **Misaki:** that was mine. that was my job. they know my list.
> >
`7`

> **Angel:** 
> - *if V’s lone route:* V, someone left a tag on my car with a bow on it. i’m staying at ronin’s. please eat something. please.
> - *otherwise:* misaki someone left a tag on my car. i’m at ronin’s. come stay too? please? i can’t lose anyone else.
>
`9`

> *A message in the server from an account nobody recognises.*
>
> **???:** 
> - *if V’s lone route:* see you at the gala, K9. it’s a shame she won’t be there.
> - *otherwise; if `S.rom`:* see you at the gala, hitmeuppp. shame about your friend.
> - *otherwise; otherwise:* see you at the gala, hitmeuppp. shame about your boyfriend.
>
> **⟨If V’s lone route⟩**
>
> > **V:** ...
> >
> **⟨Otherwise⟩**
>
> > **Misaki:** i’m going to find you.
> >

#### Lone mornings

> Lone route mornings: one at random.

*You lose an afternoon. One minute it’s noon; the next it’s dark and you’re standing in the kennel holding a lead and you don’t know for how long.*

**⟨If V’s lone route⟩**

> *The phone buzzes. For one second it’s her. It’s a delivery notification.*
>
**⟨Otherwise⟩**

> *His number is still in your phone. You call it to hear the voicemail. “This is V. Leave a message. Please be concise.” You call it four more times.*
>
**Ronin:** Hey. Brought soup. Real soup, asshole. It’s on the step. Eat it or I’ll know.

**Angel:** i’m not gonna ask how you are. i’m just gonna sit in your doorway and do my nails and you can come out whenever.

**⟨If V’s lone route⟩**

> *He finds one of her socks under the couch. The grey hound stole it months ago. He doesn’t move it.*
>
**⟨Otherwise⟩**

> *There’s a sticky note on his fridge in his handwriting. “Eat.” You leave it there. You don’t eat.*
>

#### Lost mornings

> Lone route mornings.

**⟨If `S.hold<30`, at random⟩**

> *(You lost the morning. You don’t know where it went.)*
>

#### Lost mornings

> Lone route mornings.

**⟨If epilogue⟩**

> **⟨If `HOLI[S.eday%12]`⟩**
>
> > **⟨If `S.eday%12===7`⟩**
> >
> > > `picture card` Christmas.
> > >

#### Where tonight

> Lone route bedtime (Misaki’s lone route chooses where to sleep).

▸ 
- *if she has moved in:* **The trailer out back**
- *otherwise:* **My trailer** — *(they knew where you lived / for old times’ sake / home)*

> **⟨If `trailerLocked()`⟩**
>
> > *She gets as far as the trailer door. Her keys are in her hand. She stands there until the porch light times out.*
> >
> > *She sleeps in the driver’s seat with the doors locked and the engine running for the heat.*
> >
**⟨If she has moved in⟩**

> ▸ **Home — with V** — *(♥ · you live here)*
>
**⟨If `vbedLocked()`⟩**

> `h` (Not his room. Not yet.)
>
▸ **V’s couch** — *(\+energy · morning at V’s / needs close)* `greyed out when closeness tier below 2`

> **V:** 
> - *tier 0:* 
> - *tier 1:* 
> - *tier 2:* The couch is yours. There is a blanket. The old hound will sleep on your feet. He has decided this.
> - *tier 3:* The couch is yours. There is a blanket, and the old hound. If you get cold, the door to my room is not locked.
>
> **Misaki:** 
> - *tier 0:* 
> - *tier 1:* 
> - *tier 2:* Thanks. Night, V.
> - *tier 3:* Night. Leave your door open a crack? Just so I can hear you.
>
▸ **With V** — *(not yet. she doesn’t say why. / ♥ · morning together / needs ride-or-die)* `greyed out when closeness tier below 3 or `vbedLocked()``

> *He doesn’t say anything when you knock. He just moves over.*
>
> **V:** I snore, apparently. The grey hound has filed complaints.
>
> **Misaki:** i’ll file my own. go to sleep, V.
>
▸ **Angel’s spare room** — *(\+energy · face masks / needs sister)* `greyed out when `frT('a')<2``

> **Angel:** Sleepover!! I have sheet masks, a terrible rom-com, and a rule: no talking about work. Either kind of work.
>
▸ **Ronin’s couch** — *(questionable · free breakfast / needs partner in crime)* `greyed out when `frT('r')<2``

> **Ronin:** Couch is yours. Don’t cha open the freezer, don’t touch the Gameboy. Blanket smells like smoke, deal with it.
>
**Misaki — choice:** *Where are you sleeping tonight?*

#### Where tonight

> Lone route bedtime (Misaki’s lone route chooses where to sleep).

**⟨If lone route⟩**

> **⟨If Misaki’s lone route⟩**
>
> > **Misaki — choice:** *Where tonight?*
> >
> > ▸ **The trailer**
> >
> > ▸ **His chair by the front door** — *(\+stability · −energy)*
> >
> > > *You sleep sitting up in his chair, facing the door, the way he used to. The grey hound sleeps on your feet. The door doesn’t open.*
> > >
> > ▸ **His bed** — *(his side is still made)*
> >
> > > *You lie on your side. His side is still made. You don’t touch it. You don’t sleep.*
> > >

#### Grief

> Lone route day menu: the grief options.

`h` The Mimic · victims [S.victims] · clues [S.case.found.length] · gala $[S.gala]k/$[S.galaGoal]k

▸ **Visit the latest scene** — *(costs time · search for clues / nothing yet)* `greyed out when it is too late in the day or `!S.victims` or already done today`

▸ **Ask Angelic to pull CCTV** — *(costs time · clue / needs bestie or morale 40)* `greyed out when it is too late in the day or already done today or `!(frT('a')>=1||S.morale>=40)``

> **Angel:** Okay, I asked my fans to send me any footage from that block. Two hundred videos. One of them has something. Look.
>
> *Angel freezes a frame. It doesn’t show much, but it shows enough.*
>
▸ **Have Ronin work the street** — *(costs time · clue / needs pal or morale 40)* `greyed out when it is too late in the day or already done today or `!(frT('r')>=1||S.morale>=40)``

> **Ronin:** Asked ’round. Nicely. Kinda. Folks talk real fast with a crowbar under their chin. Here’s what they said.
>
▸ **Run forensics on the evidence** — *(costs time · decrypt)* `greyed out when it is too late in the day or already done today`

> <small>→ step-memory minigame</small>
>
> **V / Misaki:** 
> - *if success:* There. That is something.
> - *otherwise:* Nothing. The data won’t hold still.
>
**⟨If Misaki POV⟩**

> ▸ **Pitch in for the gala** — *(done today / costs time · livestream, crochet, or… other means)* `greyed out when it is too late in the day or already done today`
>
**⟨If V POV⟩**

> ▸ **Donor calls for the gala** — *(costs time · pitch game)* `greyed out when it is too late in the day or already done today`
>
**⟨If already done today⟩**

> ▸ **Case board** — *(review clues & suspects)*
>

#### Grief

> Lone route day menu: the grief options.

**⟨If `/CCTV/.test(x.t||'')`⟩**

> 
> - *if Angel friendship 2+ or `S.morale>=50`:* costs time · clue
> - *otherwise:* Angel can’t face it yet · needs sister or morale 50
>
**⟨If `/Roninwork/.test(x.t||'')`⟩**

> 
> - *if Ronin friendship 2+ or `S.morale>=50`:* costs time · clue
> - *otherwise:* Ronin’s gone quiet · needs partner or morale 50
>
`h` Grief · stability [S.hold|0]

▸ 
- *if V’s lone route:* **Sit in her trailer**
- *otherwise:* **Sit in his chair by the door** — *(done today / costs time · it hurts, then it helps)* `greyed out when it is too late in the day or already done today`

> **⟨If V’s lone route⟩**
>
> > **⟨If (an internal state check passes)⟩**
> >
> > > *Her trailer still smells like vanilla and gun oil. The noodles are still in the cupboard. The bed isn’t made.*
> > >
> > > *On the fridge: a photo of the dogs he sent her, printed at a convenience store. A sticky note in his own handwriting. “Eat. —V.” She laminated it.*
> > >
> > > **V:** You laminated it.
> > >
> > **⟨Otherwise⟩**
> >
> > > *He sits on her bed for an hour. It doesn’t get easier. It gets familiar.*
> > >
> **⟨Otherwise⟩**
>
> > **⟨If (an internal state check passes)⟩**
> >
> > > *The chair still has the dent where he sat every night after she came back. There’s a book on the arm. Persuasion. A ribbon at the letter.*
> > >
> > > *She reads the letter. Then she reads it again.*
> > >
> > **⟨Otherwise⟩**
> >
> > > *She sits in his chair until the light changes. The grey hound puts her head on her knee.*
> > >
▸ **Answer Angel and Ronin** — *(done today / +morale · +stability)* `greyed out when it is too late in the day or already done today`

> **Angel:** you answered. oh thank god. okay. okay. i’m coming over. don’t argue.
>
> **Ronin:** Me too. Bringin’ the good crowbar. For moral support. Not for anything else. Probably.
>

#### Floating words

> Lone route: the words that float by the player.

**⟨If V’s lone route⟩**

> ur doing the frown again
>
> v. eat something
>
> i’m right here. kidding. i’m not.
>
> the grey one misses me huh
>
**⟨Otherwise⟩**

> Eat something, Misaki.
>
> You telegraph your left.
>
> Lock it behind you. Both bolts.
>
> Noted.
>
italic 9px VT323, monospace

#### Delivered

> Lone route: the DM thread to the one who died.

No messages yet.

`on screen` [thread] {if already done today: You’ve messaged today. They’ll reply when they reply. | otherwise: Send one message today.}

**⟨Unless already done today⟩**

> ▸ **“[t]”**
>

#### Delivered

> Lone route: the DM thread to the one who died.

**⟨Unless already done today⟩**

> 
> - *if V’s lone route:* I fed the dogs.
> - *otherwise:* fed the dogs. the grey one says hi
>
> 
> - *if V’s lone route:* The gala is on the 31st. You would have hated the swan.
> - *otherwise:* they’re doing a gala for u. there’s a swan. u would’ve hated it
>
> 
> - *if V’s lone route:* I miss you.
> - *otherwise:* i miss you. please be concise. i can’t.
>
> ▸ **“[t]”**
>
> > **(phone):** Delivered.
> >
`on screen` [thread.replace(/Deliver…] {if already done today: Delivered. It will always just say delivered. | otherwise: }

#### The Chair By The Door

> Lone route ending if stability reaches zero: The Chair By The Door.

**⟨If `k==='v'`⟩**

> One morning V doesn’t come down to feed the dogs.
>
> Angel finds them fed anyway, the door unlocked, the house empty. Two mugs on the counter. A note: “Take care of them.”
>
> The foundation keeps running. The money keeps arriving, anonymous, from cities all over the world.
>
> Ronin swears he saw him once, in Prague, standing on a bridge in the rain, just looking at the water. He says he didn’t go over to him. He says he wishes he had.
>
**⟨Otherwise⟩**

> She leaves the city one night in the trailer and doesn’t tell anyone where.
>
> Postcards arrive for the grey hound, from towns nobody can find on a map. No return address. A star sticker on every one.
>
> Angel keeps them in a box. Ronin keeps the dogs.
>
> The last postcard just says: “i’m okay. mostly. tell the dogs.”
>
Ending — The Chair By The Door [one entry per name]Stability reached zero. Day [run.day].

▸ **Back to title**

#### Lone endings

> Lone route endings at the end of Act II.

- *if `C.wrong`:* Nobody Left To Blame
- *otherwise; if `C.escaped`:* A Name, And Nothing Else
- *otherwise; otherwise; if `C.end==='police'`; if `k==='v'`:* Paper Over A Grave
- *otherwise; otherwise; if `C.end==='police'`; otherwise:* His Way
- *otherwise; otherwise; otherwise; if `C.end==='ronin'`:* The Devil Keeps Score
- *otherwise; otherwise; otherwise; otherwise:* Ink Of Another Colour

- *if `C.wrong`:* The Mimic was never caught. [sus[C.cul].n] left the city. {if `k==='v'`: V found out who it was a year later and did nothing at all, which frightened Ronin more than anything else he could have done. | otherwise: Misaki found out who it was a year later. She thought about it for most of a winter. She let it go, because he would have.}
- *otherwise:* The Mimic was [sus[C.cul].n], [captor org]’s accountant. The last loose thread from the warehouse.

- *if `S.gala>=S.galaGoal`; if `k==='v'`:* The gala raised $[S.gala]k. V gave a speech. It was four sentences long. The last one was her name.
- *if `S.gala>=S.galaGoal`; otherwise:* The memorial gala raised $[S.gala]k in his name. Misaki read his letter from the archive out loud. She made it all the way through.
- *otherwise; if `k==='v'`:* The gala fell short. V covered the difference without a word, the way he always had.
- *otherwise; otherwise:* The gala fell short. The next morning, an anonymous donation in used bills covered the rest.

- *if `k==='v'`; if `S.hold>=50`:* He still pours two cups. Some mornings now, he drinks both.
- *if `k==='v'`; otherwise:* He still sleeps in the chair by the door. The dogs have stopped expecting him to move.
- *otherwise; if `S.hold>=50`:* She moves the trailer to the clearing behind the greenhouse and plants dragonfruit there. It doesn’t grow. She keeps planting it.
- *otherwise; otherwise:* She still calls his voicemail, sometimes. “Please be concise.” She never is.

- *if `k==='v'`:* The server keeps a channel nobody posts in. It’s called #hitmeuppp. Ronin checks it every day.
- *otherwise:* Angel and Ronin come by every Sunday with food Misaki doesn’t eat until they leave. They never stop coming.

Ending — [name] [one entry per name]Alone route · stability [run.hold] · gala $[run.gala]k/$[run.galaGoal]k

▸ **Back to title**

### 5.3 Ending lines

> Added to the ending screen when they apply. In the injuries-only setting, lines about the sum, the doctor’s second page, saying yes, the window, the false name, the “dentist” and the ceiling/radio are filtered out (kc36).

#### Ending lines (index.html)

> Ending lines that depend on the kidnapping arc (shown on any ending screen that applies).

**⟨If `S.list.find(x=>x.id==='water')`, `sp.st===2`⟩**

> Somewhere far away, a man who used to bring water to a locked room works at a dog shelter. He doesn’t know why he chose it. He never looks anyone in the eye. He is very gentle with the old dogs.
>
**⟨If composure 70+⟩**

> Misaki turns the lamp off most nights now, though not all. She counts it as a win every single time.
>
**⟨If composure under 35⟩**

> The lamp stays on. Some nights V sits by the door until morning. Neither of them calls it anything.
>
**⟨If `S.veng>=70`⟩**

> V’s list ran out of names. He started a new page.
>
**⟨If `S.learn`, `S.learn.behind`⟩**

> V never stands behind her again, for the rest of their lives.
>

#### Ending lines (kc27.js)

> Ending lines (kc27.js).

- *if she kept the room:* About [hours] hours of that year never came back to her. She kept the rest on eleven pages, in a shoebox, and can still tell you the colour of every pair of shoes in that building.
- *otherwise; if she let it go blank:* About [hours] hours of that year never came back to her. She let the room go blank as well. V has it, all of it, and has never once made her take it back.
- *otherwise; otherwise:* About [hours] hours of that year never came back to her.

**⟨If kdBook = 'burn'⟩**

> 
> - *if flag kdHit set:* She never read the notebook. What was in it found her friends anyway, one door at a time.
> - *otherwise:* She never read the notebook. Nothing in it ever came looking.
>
**⟨If she read the notebook or kdBook = 'v' or kdBook = 'vsolo'⟩**

> 
> - *if she said something under the needle:* Somebody read the notebook in time. Everyone she named under the needle was waiting when the knock came.
> - *otherwise:* The notebook had four hound names in it, on a loop, for five hours. V had the page framed.
>
**⟨If kdBook = 'out'⟩**

> The note-taker’s notebook was never found. A page of it still turns up in the post now and then.
>
**⟨If kdFile = 'open'⟩**

> The enrolment form is on her fridge: “March,” in a nine-year-old’s pencil, with the M backwards. Nothing older than that has ever turned up. V is still looking.
>
**⟨If flag kdSuspect set⟩**

> Nobody has found chapter one. V is still looking, and he has promised she will hear it first.
>

#### Ending lines (kc28.js)

> Ending lines (kc28.js).

**⟨If she put the drip needle in V’s arm⟩**

> V has a small round scar on his left forearm from a drip needle. He says a hound did it, and the hound he names changes each time.
>
**⟨If kdTruth = 2⟩**

> She asked for the whole list once, by text, and read all of it. She still says “fine.” She says it differently now.
>
**⟨Otherwise⟩**

> She never did ask for the list. The left hand aches before rain, and she tells people it is just stiff.
>

#### Ending lines (kc29.js)

> Ending lines (kc29.js).

**⟨If `d>=3`⟩**

> She never did the sum. The people who love her have each guessed at part of the answer, and none of them has said so. She sleeps four hours a night and says six, and it is the thing most likely to kill her, and it is on nobody’s list.
>
**⟨If `d>0`⟩**

> There is a second page of the doctor’s notes that she has not read. It is in the archive under M, and it will keep.
>

#### Ending lines (kc30.js)

> Ending lines (kc30.js).

**⟨If kdClip = 'worn'⟩**

> She wears the star clip they posted back to her. She has opened eleven doors with it since.
>
**⟨If flag kdHandBad set⟩**

> The left hand closes three quarters of the way. She says it is stiff.
>
**⟨If flag kdRonRadio set⟩**

> Ronin still has a pair of brown shoes, resoled twice, on a shelf in his workshop. Nobody asks.
>

#### Ending lines (kc31.js)

> Ending lines (kc31.js).

**⟨If flag kdHas set⟩**

> She still says she remembers none of it. She remembers a ceiling, and that the radio was turned up first. She has never told anyone.
>
**⟨If flag kdCrash2 set⟩**

> There are jobs she turns down now, on windless days, and she blames the wind.
>
**⟨If flag kdBday set⟩**

> 
> - *if kdBday = 31:* She has thirty-one birthdays a year, all in March. Angel keeps a spreadsheet of cakes.
> - *otherwise; if kdBday = 3:* Her birthday is the third of March. She picked the month at nine and the day at twenty-two.
> - *otherwise; otherwise:* Her birthday is the fourteenth of March. She picked the month at nine and the day at twenty-two.
>

#### Ending lines (kc32.js)

> Ending lines (kc32.js).

**⟨If flag kd\_window set⟩**

> The window closed on a Saturday at about four in the afternoon. She had it marked. There is a sealed envelope in the archive with a number on it, and eleven photographs of a back she says is not hers.
>
**⟨If flag kdBloodGiven set⟩**

> She went to the six-week appointment under a false name and never rang for the result. It is the only time she came near it.
>
**⟨If flag kd\_dentist set⟩**

> The kitchen calendar still says “dentist” every few weeks. She has no cavities. She has never been.
>
**⟨If kdTable = 'told'⟩**

> She knows whose table her hand was mended on. She is the only one who ever got up off it.
>

#### Ending lines (kc33.js)

> Ending lines (kc33.js).

**⟨If she hid tablets⟩**

> She never took a painkiller that she could hide instead. V counts them out to her in front of a hound, which works about half the time.
>
**⟨If flag kdRonGot set⟩**

> One name on the list was crossed out by Ronin. He has never said how, and he tells the story at every brunch.
>

#### Ending lines (kc34.js)

> Ending lines (kc34.js).

On the last Saturday, with the house empty, she said yes. One person knows. V never found out that she said it, and he was meant not to.

#### Ending lines (kc36.js)

> Ending lines (kc36.js).

**⟨If flag kdOld set⟩**

> Nine breaks on her films: five from that week, and four from before she was old enough to remember. V has a file on the first four. It is empty, and he keeps it anyway.
>

- *if kdGripN ≥ 6:* The hand came back. She did the physio every day and never once complained, and she never asked who had taught her how.
- *otherwise:* The hand closes most of the way. She works around it. She has worked around worse.

#### Ending lines (kc49.js)

> Ending lines (kc49.js).

There is a rifle on Angel’s wall engraved “lighting was always good.” It has never been fired. Every morning V tells each of the hounds that she is good, by colour, out loud, and has never missed a day.

#### Ending lines (kc51.js)

> Ending lines (kc51.js).

**⟨If after the spiral (V alone)⟩**

> The infirmary has no door. It leans against the corridor wall where V left it. Every night at two the grey hound goes down the stairs to lie in the doorway, and every morning V says the date out loud to a room where nobody is listening.
>
**⟨If flag kdInterrupted set⟩**

> There is a dent in the infirmary door at the height of a man’s shoulder. V never fixed it. Some nights Misaki gets up and puts her hand on it, and goes back to bed.
>

#### Ending lines (kc54.js)

> Ending lines (kc54.js).

- *if `/^Thehandcameback/.test(x)`:* The hand came back. Every exercise, every day, she never once complained. The hand came back, and she didn’t, not all the way, and nobody can tell but V.
- *otherwise:* (nothing)

**⟨If flag kd\_reh\_rifle set⟩**

> She still shoots thirty-eight out of forty. It is better than almost anyone alive. She used to be forty.
>
**⟨If flag kd\_reh\_who set⟩**

> Her file says “recovered.” Under it, crossed out so that only he can read it, it says “not the same.”
>

#### Ending lines (kc55.js)

> Ending lines (kc55.js).

**⟨If flag kd\_hard\_first set⟩**

> She is the best she has ever been. Faster, colder, nothing wasted. She doesn’t hum on jobs any more, and she washes her hands once.
>
**⟨If flag kd\_v\_sees set⟩**

> V knows exactly what she is turning into; he turned into it himself. He has never once found the sentence that would stop her without telling her she was broken. He makes two cups every night she works.
>

#### Ending lines (kc58.js)

> Ending lines (kc58.js).

**⟨If k58End = 'mended'⟩**

> The seventh step on V’s back stair goes at three in the morning, and Misaki says “V” into the pillow without opening her eyes. It took most of a year.
>
**⟨If k58End = 'kept'⟩**

> V says Misaki’s name at every corner of the house, and she knows it is him because he tells her. They are both very good at it.
>
**⟨If k58End = 'apart'⟩**

> There is a column of dates at the back of V’s notebook, one for every evening since the infirmary, with nothing written under any of them.
>
**⟨If flag k58Stair set⟩**

> 
> - *if k58Stair = 'his':* The seventh step on V’s back stair is loose on purpose. V is the only one who steps on it.
> - *otherwise:* The seventh step on V’s back stair is loose on purpose. Everybody steps over it, and Misaki knows V by the eighth.
>
**⟨If flag k58Broke set⟩**

> Once, V was asked not to say her name on the stairs, and could not do it.
>
**⟨If flag k58Cup set⟩**

> Some mornings there are two cups on the island, and he did not make the second one.
>

#### Ending lines (kc59.js)

> Ending lines (kc59.js).

**⟨If `S.captor?w59O(S.captor):null`, `F.deal==='promise'` or `F.mHale==='yes'`, flag finalRuin set⟩**

> Inspector Hale made the arrest himself, on the courthouse steps, in front of the cameras. [boss] had a very good lawyer. It did not help this time.
>
**⟨If `S.captor?w59O(S.captor):null`, `F.deal==='promise'` or `F.mHale==='yes'`, `S.phase!=='normal'`, not during captivity⟩**

> Hale got his newspaper instead of his courtroom. He keeps the clipping in the K9 file.
>
**⟨If `S.captor?w59O(S.captor):null`, (`F.wOrg` or `F.lOrg`)⟩**

> [captor org] told them, more or less, every week. Afterwards both of them could recite the dates.
>
**⟨If `F.lever`⟩**

> V told [boss] what she was to him. He has not said it to anyone outside the house since.
>
**⟨If `F.faces` or flag w59\_know set⟩**

> She still waves at vans. She makes herself do it, so that they do not get to keep that as well.
>

#### Ending lines (kc60.js)

> Ending lines (kc60.js).

**⟨If flag a60\_list set⟩**

> 
> - *if flag kd60\_rule set:* Angel’s list is saved as “list (final) (2)”. The rule is at the top: nobody goes back, forty-eight hours, move on. All four of them have broken it once, and Misaki made Angel put it back.
> - *otherwise:* Angel’s list is saved as “list (final) (2)”. The rule is at the top: nobody goes back, forty-eight hours, move on.
>
**⟨If a60Env = 'bed'⟩**

> There is an envelope in the drawer with the takeaway menus that says “If I am dead. Hounds.” On the back, in a second hand: “week one, move her bed.”
>
**⟨If kd60Page = 'keep'⟩**

> In the back of V’s house ledger there is a page he wrote the night before the river, saying where her things should go. He has never torn it out.
>
**⟨If lp60Fly = 'more'⟩**

> Misaki flies on Thursdays, for cash, an hour out of the city. She banks twice over V’s house every time, and the old hound barks once.
>
**⟨If flag lp60\_listing set⟩**

> There is a dead seller page with four hundred reviews and a frog sock in every photo. Angel left the last review.
>

#### Ending lines (kc61.js)

> Ending lines (kc61.js).

**⟨If flag kd61\_rent set, k61Rcpt = 'cast'⟩**

> When the cast came off she kept it, because there were two rent receipts inside. It is in a drawer at V’s. Nobody is allowed to throw it out.
>
**⟨If flag kd61\_rent set, flag k61VPaid set, V POV⟩**

> In the back of V’s house ledger there is a torn edge where a page came out. It was a receipt for one month’s rent, and she still has it.
>
**⟨If flag kd61\_rent set⟩**

> The lot office has one late payment on her account, from the month after the river. She has asked twice to have it removed.
>
**⟨If flag k61Lids set⟩**

> Under the pillow on her side of V’s bed there is a stack of plastic lids, each with a day on it in fountain pen.
>

#### Ending lines (kc62.js)

> Ending lines (kc62.js).

**⟨If flag kd62\_clock set, (k62Clock = 'count' or k62Clock = 'tried')⟩**

> She still counts the doors when she walks into a room. She has got quick at it. Nobody but V has ever seen her do it.
>
**⟨If k62Clock = 'told'⟩**

> V’s day is still on the fridge under the cactus magnet, in fountain pen. He keeps to it to the minute.
>
**⟨If flag kd62\_truck set⟩**

> Some nights her truck sits in the garage for a while after the engine stops. V never goes down. She has never told him, and he has never let her know that he hears.
>
**⟨If flag kd62\_file set⟩**

> At four in the morning, some nights, there is a strip torn off the margin of his newspaper.
>


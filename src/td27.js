/* ===================== td27: Angel's quirk and mishap; the tea (V × Ronin) =====================
   - Angel narrates her own life under her breath, in vlog voice, when she is nervous. Mishap: the ceiling stream.
   - V × Ronin route: V once swore to kill Ronin. Ronin, at V's house, tasted something strange in his tea, decided
     V had finally done it, and went out dramatically: climbed on top of him, made a twisted confession, passed out.
     The tea was V's, with an ungodly amount of sleep aid in it. Ronin woke up alive. V heard everything.
   Voices: V never contracts. Ronin drawls. Angel texts in lowercase. */
const k27Ok=()=>S&&S.phase!=='taken'&&!isLone()&&!(S.f&&S.f.abroad);
K22EV.push(
 {id:'k27_narrate',when:()=>k27Ok()&&frT('a')>=1&&S.day>=8,run:done=>{const m=S.pov!=='v';
  say([['','Angel is nervous. You can tell because she has started narrating.'],
   [AN,'(very quietly) and here we see angel, in the waiting room, she’s fine, she’s totally fine, she’s holding the paper cup like it’s a grenade, which, side note, is a very valid way to hold a paper cup—'],
   [m?'hitmeuppp':'K9',m?MV('angel','angel. you’re doing the voice.','Angel. You are doing the voice.','Angel. You’re doing the voice.'):'Angelic. You are doing the voice.'],
   [AN,'(normal) i know. i KNOW. i can’t stop. if i’m the camera then it’s happening to the girl in the video and not to me. it’s a whole thing. my therapist calls it “a whole thing.”'],
   ['','She does it on rooftops too, before a shot. Under her breath, in the bright, sweet voice she uses for skincare: “and she breathes in, and she breathes out, and she’s so steady, look how steady she is.” She has never missed. Nobody has ever heard her do it but the three of you.']],()=>{fr('a',3);done()})}},
 {id:'k27_ceiling',when:()=>k27Ok()&&frT('a')>=1&&!!S.seen.k27_narrate,run:done=>say([
   [RN,'(server) Angel. Darlin’. Tell ’em about the ceilin’.'],
   [AN,'(server) i will END you'],
   [RN,'(server) She went live on a job. By accident. Phone in her jacket, face down, camera up.'],
   [AN,'(server) the app updated and moved the button ok. it MOVED THE BUTTON'],
   [RN,'(server) Two hundred thousand folks watched forty minutes of a ceilin’ in a parkin’ garage. Breathin’. Somebody hummin’. One real quiet pop, like a cork.'],
   [AN,'(server) the comments were all “so calming” and “asmr queen” and “what was that noise” and “a cork i think”'],
   [AN,'(server) it’s my third most viewed video of all time. brands keep asking me to do another “ceiling stream.” i keep saying i don’t have the right ceiling.'],
   ['K9','(server) Please never do another ceiling stream.'],
   [AN,'(server) i am NEVER doing another ceiling stream. ...it did really well though.']],()=>{fr('a',2);fr('r',1);done()})},
 {id:'k27_tea',when:()=>k27Ok()&&S.pov==='v'&&S.vrom==='r'&&(S.vromDates||0)>=1,run:done=>say([
   ['','You still think about the tea.'],
   ['','Early on, before any of this had a name, you told Ronin to his face that one day you would kill him. You meant it. He thanked you, warmly, and asked if he could watch you do it in the mirror.'],
   ['','Months later he was in your study at one in the morning, waiting out a storm, with two cups of tea on the desk. One was his. One was yours, with the sleep aid you use on the nights three and a half hours will not come, in an amount your doctor would describe as “ungodly”.'],
   ['','He picked up the wrong cup. He drank half of it. He stopped. He looked into it, then at you, with an expression of enormous, tender betrayal.'],
   [RN,'...Vee. This tastes funny.'],
   ['K9','Does it?'],
   [RN,'Oh. Oh, I see. You did it. You finally did it. In tea. In TEA, Vee. Like a duchess.'],
   ['','Before you could correct him, he set the cup down, stood, crossed the room with great ceremony, and climbed onto your lap in the desk chair, knees either side, arms around your neck, with the full intention of being as disgusting to you as possible in his final moments.'],
   [RN,'Well. If I’m goin’ to Hell, I’m goin’ the long way round.'],
   [RN,'Listen here. I been thinkin’ about you every night for a year. I think about the way you say “no”. I think about killin’ you, and then I think about the way you’d look at me while I did it, and then I ain’t thinkin’ about killin’ no more.'],
   [RN,'If the Devil asks, I’m gonna tell him I loved somebody with a moral code. He ain’t gonna believe me. He’s gonna laugh so hard he lets me out early.'],
   [RN,'You got real nice hands, Vee. I hope they’re the ones that bury me.'],
   ['','And then he went limp, face in your collar, and started to snore.'],
   ['','You sat there for some time. You did not move him. You told yourself it was because moving a sedated man is dangerous.'],
   ['','He woke up at ten the next morning on your couch, under your coat, with a glass of water and two aspirin beside him, extremely alive. You were at the desk, reading.'],
   [RN,'...I ain’t dead.'],
   ['K9','You drank my tea. It had my sleep aid in it. Rather a lot of it.'],
   [RN,'...Your tea.'],
   ['K9','Mine.'],
   [RN,'So you didn’t— ...So I— ...How much of last night did you—'],
   ['K9','All of it. Including the part about my hands.'],
   ['','Ronin pulled your coat over his head and stayed under it for a long time.'],
   [RN,'(from under the coat) Kill me now, Vee. For real this time. Please.'],
   ['K9','No. I would like you alive. You have a great deal to repeat to me while you are awake.']],()=>{fr('r',6);if(typeof relApply==='function')relApply({rivalry:-6});done()})});

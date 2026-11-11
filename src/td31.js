/* ===================== WHAT SHE SAYS SHE DOESN'T REMEMBER (td31) =====================
   Builds on td27–td30. The missing hours are not all missing. Some of them she has, and files under "gone" with the
   rest, because a thing she can't remember is a thing nobody can ask her about. The same rules as td29: it is never
   named, the honest option is greyed out (KD_NO), every pretence is a kdDeny(). New here: slips (she uses a detail
   she claims not to have), what her body does, other people finding out without being told, and the bill coming due. */
/* she has some of it */
kdEv2('kd_recount',2,()=>S.f.kd_math,done=>{const h=kdHrs(),m=kdMe();
 if(m)return say([['',`The receipt in her shoe says ${h} hours. She wrote that in the kitchen with him watching.`],
   ['',`It isn’t ${h}. Some of those hours she has. She knows what the ceiling in the second room looked like, and she was only ever in the second room after the needle. She knows the radio got turned up first, every time.`],
   ['hitmeuppp',MV('(doesn’t count.)','(that’s not remembering. that’s just. stuff.)','(That’s not remembering. That’s just things I know.)','(That isn’t remembering. Remembering is when you can tell it in order. I’ve got a ceiling and a volume knob. That’s nothing. That’s décor.)')]],()=>ask('hitmeuppp',`(${h}, on the receipt.)`,[
    KD_NO('Cross it out. Write the real number.'),
    {t:`Leave it at ${h}.`,fn:()=>{kdDeny();S.f.kdHas=1;save();say([['',`She leaves it. “I don’t remember” is a door with a lock on her side, and she has been short of those.`]],done)}},
    {t:'Round it up.',fn:()=>{kdDeny(2);S.f.kdHas=1;S.kd.hrs+=5;save();say([['','She writes a bigger number over it, so that there is more room in there for things to not have happened in.']],done)}}]));
 say([['',`She told the doctor ${h} hours. He was in the room. He has since read the note-taker’s times against what she says she was asleep for, and they do not agree: she was awake for some of it.`],
  ['K9','(She has it. Part of it. She has decided that she does not, and I am the only one who knows that she decided.)']],()=>{kdDeny();S.f.kdHas=1;save();done()})});
/* the slip */
kdEv2('kd_slip',4,()=>S.f.kdHas,done=>{const m=kdMe();say([
 ['','The four of them are at the table. Ronin is telling a story about a man who kept his radio on while he worked.'],
 ['hitmeuppp',MV('they always turn it up first.','oh yeah they always turn it up first, so nobody—','They always turn it up first, so that nobody down the hall—','Oh, they always turn it up first. So that the ones down the hall can say they didn’t—')],
 ['','She stops. Angel’s fork has stopped as well. It is a detail from the hours she has told every person at this table she was asleep for.']],()=>ask(m?'hitmeuppp':'K9',m?'(Three people are not looking at you.)':'(She is looking at her plate.)',m?[
   KD_NO('Finish the sentence.'),
   {t:'“...in movies. they do that in movies.”',fn:()=>{kdDeny();say([[RN,'Yeah. Movies. Sure.'],['','Ronin finishes his story with a different ending from the one it had. Under the table, a dog puts its whole head on her foot.']],done)}},
   {t:'Get up. The dogs need walking.',fn:()=>{kdDeny();calm(-3);say([['','She walks all four dogs at once, at eleven at night, in the rain. When she comes back the dishes are done and nobody is in the kitchen, by arrangement.']],done)}}]:[
   {t:'Ask Ronin to pass the rice.',fn:()=>{kdDeny();apply({aff:3});say([['K9','Ronin. The rice.'],[RN,'...Yeah. Rice. Catch.'],['','She breathes out. She finds his foot under the table and stands on it, lightly. It is the nearest she will come to thanking him.']],done)}},
   {t:'Let the silence stand.',fn:()=>{kdDeny();apply({tension:3});say([['hitmeuppp',MV('what.','what. it’s a thing people do. in movies.','What? It’s a thing people do. In films.','What? Everybody knows that. It’s in every film. Stop looking at me, all of you, eat.')],['','They eat.']],done)}},
   KD_NO('Ask her how she knows that.','he is not going to do that to her')]))});
/* what she says asleep */
kdEv2('kd_sleeptalk',5,()=>S.f.kd_math&&tier()>=2,done=>{const m=kdMe();
 if(m)return say([['','She wakes at four with her throat sore, the way it was in the cell after she’d been talking. V is in the chair by the door with a book he isn’t reading.'],
   ['hitmeuppp',MV('did i say anything.','did i say anything. in my sleep.','Did I say anything? In my sleep?','Did I say anything? Just now. Whatever it was, I didn’t mean it, I was asleep.')],
   ['K9','You counted. Biscuit, Sergeant, Mochi, Pancake.'],
   ['','It’s true. He has left out what came between the names.']],()=>ask('hitmeuppp','(He is being careful.)',[
    KD_NO('“and what else.”'),
    {t:'“lol. classic.”',fn:()=>{kdDeny();say([['','She turns over. He stays in the chair until it is light, and then makes a noise with the door so that she can pretend he has just come in.']],done)}},
    {t:'“go to bed, creep.”',fn:()=>{kdDeny();apply({aff:1});say([['K9','Presently.'],['','He does not go to bed. She did not want him to.']],done)}}]));
 say([['','At four she is talking in her sleep. He sits in the chair by the door and hears all of it. Between the dogs’ names there are other words, and she says them politely, the way she talks to landlords.'],
  ['hitmeuppp',MV('did i say anything.','did i say anything. in my sleep.','Did I say anything? In my sleep?','Did I say anything? Whatever it was, I didn’t mean it.')]],()=>ask('K9','(She wants one answer.)',[
   {t:'“You counted the dogs.”',fn:()=>{kdDeny();apply({aff:2});say([['hitmeuppp',MV('lol.','lol. classic me.','Classic.','Classic. I’m very consistent.')],['','It is true, as far as it goes. He writes the rest on no page at all.']],done)}},
   {t:'“Nothing that I could make out.”',fn:()=>{kdDeny();apply({heart:-1});say([['','That one is a lie, and she takes it gratefully. He is surprised how easily he said it.']],done)}},
   KD_NO('Repeat it to her.','he is not going to do that to her')]))});
/* she promised herself, in the cell, that she'd close the account */
kdEv2('kd_bank',3,()=>kdMe()&&S.f.kdLoops,done=>say([
 ['','She goes to close her bank account, as promised. The branch plays the jingle in the lobby, on a loop, at a tasteful volume.'],
 ['','It is ninety seconds long. She knows where every note is.']],()=>ask('hitmeuppp','(Queue number 41. Now serving 36.)',[
  {t:'Stay in the queue. Count the loops.',fn:()=>{calm(-5);apply({yen:0});S.f.kdBank='closed';save();say([['','Five people is eleven loops. She gets to the counter grey in the face, closes the account, and takes the balance in cash.'],
    ['hitmeuppp',MV('ur music sucks.','your lobby music sucks. i’m going to another bank. a quiet one.','Your lobby music is terrible. I’m going to a different bank.','Tell head office the jingle’s shit. I’m serious, put it on the form. “Reason for leaving: the jingle.”')],['','The teller writes it on the form.']],done)}},
  {t:'Wait outside. Go in when your number’s called.',fn:()=>{calm(1);S.f.kdBank='closed';save();say([['','She watches the number board through the glass with her back against a vending machine. When 41 comes up she is in and out in under one loop.']],done)}},
  {t:'Leave. Do it online.',fn:()=>{kdDeny();S.f.kdBank='fled';save();say([['','The website plays the jingle when it loads. She shuts the laptop on it and tells V the site was down.']],done)}}])));
/* being helped out of a jacket */
kdEv2('kd_jacket',4,()=>frT('a')>=1,done=>{const m=kdMe();say([
 ['',m?'Angel reaches round from behind to help her out of her jacket. It is what Angel has done at every door for four years.':'Angel reaches round from behind to help her out of her jacket, as she always has.'],
 ['','She has Angel’s wrist turned and Angel’s face against the wall before either of them has decided anything. It takes under a second. She is very good.'],
 [AN,'...ow. okay. it’s me. nice hold, actually.'],
 ['hitmeuppp',MV('sorry. sorry.','sorry. shit. reflex. u startled me.','Sorry. Reflex. You startled me, that’s all.','Shit. Sorry. You startled me. It’s the cast, it’s made me jumpy, casts do that.')],
 [AN,'casts do that. sure. new rule, i help from the front. i’ll announce myself. like a butler.'],
 ['',m?'From then on Angel says “jacket” before she touches the jacket. She never once says why.':'From then on Angel says “jacket” before she touches the jacket. V adds it to the page that already says “never from behind.”']],()=>{kdDeny();fr('a',2);note('learn_jacket','Nobody helps Misaki out of a coat from behind. Angel says “jacket” first.');done()})});
/* clothes */
kdEv2('kd_shop',5,()=>S.f.kd_clothes&&frT('a')>=1,done=>{const m=kdMe();say([
 ['','Angel takes her shopping. She had six pairs of shorts and wore them in February. She walks past the shorts.'],
 ['',m?'Everything she picks is two sizes too big and has a drawstring she can knot.':'She comes home with four bags. Everything in them is two sizes too big and ties at the waist with a knot.'],
 ['hitmeuppp',MV('new look.','new look. it’s called comfort. look it up.','It’s a new look. It’s called being comfortable.','It’s a look. Oversized is in. I read it somewhere. You wouldn’t know, you’ve worn the same coat since the war.')],
 [AN,m?'it’s a great look. i’m paying. don’t argue, i’m armed.':'(to V, later, in the kitchen) i didn’t ask. i paid and i didn’t ask. i want a medal.']],()=>{kdDeny();fr('a',2);done()})});
/* Ronin being nice is how she knows that he knows */
txDef('tx_kd_ronsoft',{with:'r',pov:'m',prio:2,when:()=>kdPost()&&frT('r')>=1&&(S.kd.deny||0)>=3,nodes:{
 start:{in:()=>['left soup on your step. it’s from a can, don’t get ideas','fixed the step too. it was loose and it was pissin’ me off'],expire:3,
  opts:()=>[{t:'“why are u being nice. stop it. who told u”',reply:()=>['nobody told me shit','ain’t nothin’ t’tell. right','right?'],next:'two'},
   {t:'“thanks”',fx:()=>fr('r',1),reply:()=>['don’t make it weird','ain’t nothin’ t’tell anyway. right'],next:'two'}]},
 two:{in:()=>['right?'],
  opts:()=>[{t:'“right”',fx:()=>{kdDeny();fr('r',2)},reply:()=>['right','good','you look like shit and you owe me 2000 yen']},
   {t:'“right. now be an asshole again”',fx:()=>{kdDeny();fr('r',3)},reply:()=>['you look like shit, you owe me 2000 yen, and I spat in the soup','better?','there she is']}]}}});
txDef('tx_kd_ronknows',{with:'r',pov:'v',prio:2,when:()=>kdPost()&&frT('r')>=1&&S.f.kd_math,nodes:{
 start:{in:()=>['Vee','is it what I think it is'],expire:3,
  opts:()=>[{t:'“Yes.”',fx:()=>apply({veng:5}),reply:()=>['(nothing for eleven minutes)','which ones'],next:'which'},
   {t:'“It is hers to say.”',reply:()=>['that’s a yes','okay','which ones'],next:'which'}]},
 which:{in:()=>['all four? or we don’t know'],
  opts:()=>[{t:'“We do not know. She will not look.”',fx:()=>{S.f.kdRonAll=1;fr('r',2)},reply:()=>['then all four','I ain’t askin’ her. I ain’t ever gonna ask her','I’m just gonna be real fuckin’ thorough']},
   {t:'“Do not ask her.”',fx:()=>fr('r',1),reply:()=>['I look like I’d ask her?','I’m gonna go fix her fuckin’ step. then I’m gonna go find somebody and take my time']}]}}});
/* the bill */
kdEv('kd_crash',()=>S.phase!=='after'&&(S.kd.deny||0)>=6&&!S.f.kdCrash,done=>{S.f.kdCrash=S.day;const m=kdMe();if(m){S.slot=Math.max(S.slot,2);S.energy=clamp(S.energy-30)}save();say([
 ['',m?'She goes down on the stairs at V’s. There is no warning. She is carrying a bowl, and then she is looking at the underside of the banister and the bowl is in four pieces.':'She goes down on the stairs with a bowl in her hand. He hears the bowl. He is there before it has stopped moving.'],
 ['','She has slept eleven hours in four days.'],
 ['hitmeuppp',MV('low blood sugar.','low blood sugar. it’s a thing. i skipped lunch.','Low blood sugar. I skipped lunch, that’s all.','Blood sugar. I skipped lunch. Don’t carry me, V, I’m — fine, carry me, but it’s blood sugar.')],
 ['K9','(It is not her blood sugar. I made her lunch and watched her eat it.)'],
 ['',m?'(Most of the day is gone.)':'He carries her to the couch and agrees about the blood sugar, and brings her a second lunch.']],()=>{kdDeny();done()})});
kdEv('kd_crash2',()=>S.phase!=='after'&&(S.kd.deny||0)>=9&&S.f.kdCrash&&S.day>S.f.kdCrash+1&&!S.f.kdCrash2,done=>{S.f.kdCrash2=1;apply({heat:8,edge:4});save();const m=kdMe();say([
 ['',m?'She is on a roof with a man in the scope, four hundred metres, no wind. Her finger does not close. She tells it to, and nothing happens, and he walks out of the frame with his coffee.':'She comes back from a job at noon with the rifle clean. It has not been fired. She has never once come back with it clean.'],
 ['hitmeuppp',MV('wind.','wind. bad wind. called it off.','The wind was wrong. I called it off.','The wind was wrong. I called it. It’s professional judgement, people pay extra for that.')],
 ['',m?'There was no wind. She checked three times, the way she checks everything now.':'There was no wind today. He looked.'],
 ['K9','(Her hands are how she decides things. She told me that once. This is the first time they have decided without her.)']],done)});
/* March */
kdEv2('kd_march',8,()=>S.f.kdFile==='open'&&S.phase!=='after'&&frT('a')>=1,done=>{const m=kdMe();say([
 [AN,'ok so. march. u picked the month when u were nine, which, iconic. but nobody ever picked a DAY.'],
 [AN,'so pick one. i’ve got a cake on hold and the bakery lady’s scared of me.']],()=>ask(m?'hitmeuppp':'K9',m?'(A day in March.)':'(She looks at him. She wants him to pick.)',[
  {t:m?'“the 3rd. dolls’ day. i never had the dolls.”':'“The third. It is the dolls’ festival.”',fn:()=>{S.f.kdBday=3;fr('a',3);apply({aff:2});save();say([['','Angel shows up with a cake and a full tiered set of dolls. Every doll has been given a very small knife.']],done)}},
  {t:m?'“the 14th. it’s when u give stuff back.”':'“The fourteenth. One returns gifts on that day.”',fn:()=>{S.f.kdBday=14;fr('a',3);apply({aff:3});save();say([['','V gives her a card on the fourteenth, in fountain pen. It says “Returned with thanks: one year.” She doesn’t understand it until the evening, and then she has to go and sit in the truck.']],done)}},
  {t:m?'“all of them. i’m owed like twenty.”':'“All thirty-one. She is owed arrears.”',fn:()=>{S.f.kdBday=31;fr('a',4);apply({aff:2});save();say([[AN,'THIRTY-ONE CAKES. finally somebody in this house with ambition.'],['','By the ninth of March the dogs have learned the song.']],done)}}]))});
const _xeKD5=extraEnding;extraEnding=function(){const L=_xeKD5();if(!S||!S.f||!S.kd||!S.kd.t0)return L;const f=S.f;
 if(f.kdHas)L.push('She still says she remembers none of it. She remembers a ceiling, and that the radio was turned up first. She has never told anyone, and three people know.');
 if(f.kdCrash2)L.push('There are jobs she turns down now, on windless days, and she blames the wind.');
 if(f.kdBday)L.push(f.kdBday===31?'She has thirty-one birthdays a year, all in March. Angel keeps a spreadsheet of cakes.':'Her birthday is the '+(f.kdBday===3?'third':'fourteenth')+' of March. She picked the month at nine and the day at twenty-two.');
 return L};

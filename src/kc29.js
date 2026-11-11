/* ===================== THE SUM SHE WON'T DO (td29) =====================
   The hours Misaki can't remember. She has enough to work out what probably happened in them: the hours, the needle,
   the men, the photographs she is not to be shown, the clothes that were not hers. She can do the sum. She does not.
   Rule for every scene here: what happened is never named, by her or by the narration. The honest option is always on
   the menu, greyed out. Each time she pretends, S.kd.deny goes up, and it costs her sleep (energy each morning) and
   lowers the ceiling on her composure. Nothing in the game lets her say it. */
let kdDeny=n=>{const k=KD();k.deny=(k.deny||0)+(n||1);save()};
const KD_NO=(t,why)=>({t,sub:why||'she is not going to',dis:true,fn:()=>{}});
const kdEv2=(id,d,when,run)=>kdEv(id,()=>kdD()>=d&&!S.f[id]&&(!when||when()),done=>{S.f[id]=1;save();run(done)});
/* the cost: she sleeps badly and says she doesn't */
const _hubKD3=hub;hub=function(){try{const k=S&&S.kd;if(k&&k.deny&&k.t0&&!k.med&&!isLone()&&['after','act2','act3','epilogue'].includes(S.phase)){
  if(k.denyDay!==S.day&&S.slot===0){k.denyDay=S.day;apply({energy:-Math.min(14,k.deny*2)});if(S.phase==='after')S.comp=Math.min(S.comp,100-Math.min(40,k.deny*4));save()}}}catch(e){}return _hubKD3.apply(this,arguments)};

/* ---------- the sum ---------- */
kdEv2('kd_math',1,()=>S.f.kdCount,done=>{const h=kdHrs();
 if(kdMe())return say([['',`She has the figures. ${h} hours she was not awake for. One needle each time. Four men on the day shift and she never did see the night shift.`],
   ['','She is good at sums. A contract is nothing but a sum: distance, wind, how long a man stands still. She has all the terms of this one written on a receipt in her shoe.'],
   ['hitmeuppp',MV('(nope.)','(not doing that one.)','(I’m not adding that up.)','(I know what that comes to. I’ve known since the car. I’m not writing the answer down.)')]],()=>ask('hitmeuppp','(The receipt.)',[
    KD_NO('Do the sum. Say the answer out loud.'),
    {t:'Count something else. The hounds.',fn:()=>{kdDeny();calm(2);say([['hitmeuppp','(grey. old. black. pale. four. see? i can count fine.)']],done)}},
    {t:'Clean the rifle. All of it, twice.',fn:()=>{kdDeny();apply({edge:3});say([['','She strips it and cleans it and puts it together, and does it again. Her left hand can’t hold the bolt, so she holds it in her teeth.']],done)}}]));
 say([['',`V has the same figures she has: ${h} hours, the needle, the number of men. He also has the doctor’s second page, which she has not asked to see.`],
  ['','He watches her fold a receipt very small and put it in her shoe. She catches him watching and asks if he wants a go on the fighting game.'],
  ['K9','(She knows. She has known since the car. She is going to act as though she does not, and she is very good at acting.)']],()=>ask('K9','(She is holding out the second controller.)',[
   {t:'Take the controller.',fn:()=>{kdDeny();apply({aff:2});say([['','He loses four rounds. She does the victory dance with one arm.']],done)}},
   {t:'“Misaki. The hours you cannot remember—”',fn:()=>{kdDeny();apply({tension:4});say([['hitmeuppp',MV('nothing happened.','nothing happened in them. i’d remember.','Nothing happened in them. I’d remember.','Nothing happened. I’d remember if it had. Pick your character, V.')],['','She has just told him that she would remember something from the hours she cannot remember. Neither of them points it out.']],done)}}]))});
kdEv2('kd_clothes',2,()=>S.f.kd_math,done=>{const pre=[['',kdMe()?'V has kept what she was wearing when she came out of that building. It is in a paper bag on the dryer, folded, with a note: “Yours to keep or burn.”':'He has kept what she was wearing, folded, in a paper bag. He should have burned it. He puts it on the dryer with a note and leaves the room before she comes in.'],
  ['','The hoodie is hers. The shorts are not the ones she left the trailer in. They are a size too big and somebody else’s.']];
 const o=[KD_NO('Ask whose shorts they are.'),
  {t:'Burn the bag.',fn:()=>{kdDeny();calm(3);say([['','She burns it in the incinerator off the kennel corridor, hoodie and all, and stays to see that the elastic goes.'],['hitmeuppp',MV('(it was an old hoodie.)','(old hoodie. had a hole in it anyway.)','(It was an old hoodie. It had a hole in the cuff.)','(I liked that hoodie. It had a hole in the cuff I’d been meaning to fix. Whatever. It’s a hoodie.)')]],done)}},
  {t:'Wash the hoodie and wear it. Bin the rest.',fn:()=>{kdDeny();calm(-2);say([['','She washes it four times. On the fourth the star on the back starts to come off, and she stops.'],['hitmeuppp','(they must’ve lost mine. it’s a warehouse. people lose stuff.)']],done)}}];
 say(pre,()=>ask(kdMe()?'hitmeuppp':'K9',kdMe()?'(Not mine.)':'(She has opened the bag. He can hear the paper.)',kdMe()?o:[
  {t:'Stay in the next room. Let her deal with the bag.',fn:()=>{kdDeny();say([['','The incinerator door opens and shuts. She comes out smelling of smoke and tells him his laundry room is depressing.']],done)}},
  {t:'Go in.',fn:()=>{kdDeny();apply({tension:3});say([['hitmeuppp',MV('what.','what. it’s laundry.','What? It’s laundry. I’m doing laundry.','What? I’m doing laundry. They lost my shorts, V, it’s a warehouse, they’re not exactly a dry cleaner.')],['K9','(I did not ask her anything.)']],done)}}]))});
kdEv2('kd_exam',2,()=>S.f.kdCard,done=>{say([['','The doctor comes back with one more form. It is short. There is an examination she has not done, and it needs a signature either way.'],
  ['','She explains what it would look for. Misaki listens to all of it with the face she uses for landlords.']],()=>ask(kdMe()?'hitmeuppp':'K9',kdMe()?'(Two boxes. Consent. Decline.)':'(He is in the doorway. It is not his form.)',kdMe()?[
   KD_NO('Tick “consent.” Find out.'),
   {t:'Tick “decline.”',fn:()=>{kdDeny();say([['','She ticks it and signs with her right hand, slowly, and draws a small star after her name.'],['hitmeuppp',MV('no need.','no need. nothing to find.','No need. There’s nothing to find.','No need. Nothing happened, so there’s nothing to find, so it’s a waste of your gloves.')],['','The doctor says that the form doesn’t expire. Misaki tells her that’s nice.']],done)}},
   {t:'Tick “decline” and ask about her parking.',fn:()=>{kdDeny();calm(1);say([['hitmeuppp',MV('where’d u park','did u park on the gravel. the hounds piss on that side.','Did you park on the gravel? The hounds go on that side.','Did you park on the gravel side? The black one stands by cars it doesn’t know. Just stands. I’d go and look.')],['','The doctor goes to look. The form goes into the folder with “declined” on it and a star.']],done)}}]:[
   {t:'Say nothing. It is hers to sign.',fn:()=>{kdDeny();say([['','She ticks “decline” and draws a star after her name. He files it himself, in the drawer with her medical card.'],['K9','(She has asked me to believe that nothing happened. I can do the first half of that. I can behave as though I believe it.)']],done)}},
   {t:'“The form does not expire.”',fn:()=>{kdDeny();apply({aff:1});say([['hitmeuppp',MV('ok.','ok. cool. don’t need it.','Okay. I don’t need it.','Okay. Good to know. I don’t need it, but good to know.')],['','She ticks “decline.” She does not look at him while she does it, and she thanks him afterwards for something else.']],done)}}]))});
kdEv2('kd_photos',3,()=>S.f.kdChart||S.f.kdChartV||S.f.kdCount,done=>{
 if(kdMe())return say([['','The chart said: “Back: see photographs. Do not show patient.” The envelope is in his desk, second drawer, where he keeps things he hasn’t decided about.'],
   ['','She has not looked at her own back. She gets dressed facing the wall and has told herself that this is how she has always done it.']],()=>ask('hitmeuppp','(A brown envelope. Not sealed.)',[
    {t:'Look.',fn:()=>{kdDeny();calm(-6);S.f.kdPhotos='seen';save();say([['','There are eleven photographs. She goes through all eleven the way she goes through a floor plan, and puts them back in the order she found them.'],
      ['hitmeuppp',MV('(huh.)','(huh. somebody was thorough.)','(Somebody was thorough. That’s from the van, probably. Lot of corners in a van.)','(Okay. So that’s from the van. Vans have corners. Eleven photos of a girl who got thrown around in a van. That’s all that is.)')],
      ['','Three of them are not the kind of mark a van leaves, and she knows a great deal about what leaves which marks. She shuts the drawer with her hip.']],done)}},
    KD_NO('Look, and then ask him what he thinks they are.'),
    {t:'Leave it in the drawer.',fn:()=>{kdDeny();S.f.kdPhotos='left';save();say([['','She squares the envelope with the edge of the drawer so that he won’t know she touched it. He will know anyway.']],done)}}]));
 say([['','There are eleven photographs of her back in his desk. The doctor wrote “do not show patient.” He has looked at them once, for long enough to be sure what he was looking at.'],
  ['','This morning the envelope is square with the edge of the drawer. He did not leave it square.']],()=>ask('K9','(She has been in the drawer.)',[
   {t:'Leave it where it is.',fn:()=>{kdDeny();say([['','He leaves it. At lunch she tells him a long story about a pigeon, and watches his face the whole way through it for something she is afraid of finding.']],done)}},
   {t:'Move it to the archive, where she will not come across it.',fn:()=>{kdDeny();apply({heart:-1});say([['','He files it under M. She notices that the drawer is empty and says nothing, and he notices her noticing.']],done)}}]))});
kdEv2('kd_wash',3,()=>S.f.kd_math&&kdMe(),done=>say([
 ['','She has three washes: one for the job, one for the walk home, one for luck. Tonight she is on the fifth, and the water has gone cold, and she is still under it.'],
 ['hitmeuppp',MV('(just cold. i like it cold.)','(i like it cold. it’s good for u. athletes do it.)','(I like it cold. Athletes do it. It’s good for you.)','(It’s cold therapy. Athletes pay for this. I’m not scrubbing anything off, there’s nothing on me, I’m doing sports science.)')],
 ['','V has turned the boiler up twice from the hall without saying so. The towel outside the door is warm when she gets to it.']],()=>{kdDeny();apply({energy:-6});done()}));
kdEv2('kd_smell',4,()=>S.f.kd_math,done=>{const m=kdMe();say([
 ['',m?'The man ahead of her in the corner shop queue is wearing a cologne. She doesn’t know it. Her stomach does.':'She is beside him in the corner shop queue when the man ahead of them turns round. He is nobody. He smells of some cologne.'],
 ['',m?'She is outside, being sick into the bin by the ashtray, before she has decided to leave the queue.':'She is outside before the door chime has finished, being sick into the bin by the ashtray.'],
 ['hitmeuppp',MV('bad sandwich.','bad sandwich. the tuna’s off. tell them.','Bad sandwich. The tuna’s off. Somebody should tell them.','It’s the tuna. I’m telling you, the tuna’s off, they leave it out. I’m fine, get off, it’s food poisoning.')],
 ['',m?'She had not eaten the sandwich yet. It is still in her pocket, in its wrapper.':'She has not eaten anything today. He has been counting. He buys a bottle of water and agrees that it was the tuna.']],()=>{kdDeny();calm(-3);done()})});
kdEv2('kd_notask',4,()=>S.f.kdAngelSees||frT('a')>=2,done=>{const m=kdMe();say([
 [AN,'babe. can i ask you one thing. just one, and then never again.'],
 ['hitmeuppp',MV('no.','nope. do my nails instead.','No. Do my nails instead.','No. Whatever it is, no. Do my nails. The right hand, the left one’s booked.')],
 [AN,'...okay. your way. give me the hand.'],
 ['',m?'Angel does the nails in pink, with a small knife on the thumb. She doesn’t ask. Her own hands shake for the first two fingers and then they stop.':'V watches from the kitchen. Angel looks up at him once over Misaki’s head, and he shakes his head, and she goes back to the thumb.']],()=>{kdDeny();fr('a',2);done()})});
kdEv2('kd_vknows',5,()=>S.pov==='v'&&S.f.kd_math,done=>say([
 ['','He knows what the second page says. He has known for a week. She knows that he knows, and has arranged every conversation since so that it cannot come up.']],()=>ask('K9','(She is on the roof with a hound on each foot.)',[
  {t:'Sit down beside her and talk about the hounds.',fn:()=>{kdDeny();apply({aff:3});say([['','They talk about the black hound’s jaw, and the plate he put in it, for forty minutes. It is the conversation she wants. He gives it to her, and hates how well it works.']],done)}},
  {t:'“I will not ask you. I want you to know that I would hear it.”',fn:()=>{kdDeny();apply({aff:2});say([['hitmeuppp',MV('hear what.','hear what? there’s nothing.','Hear what? There’s nothing to hear.','Hear what? Nothing happened, V. I’d tell you. I tell you everything, I told you about the pigeon.')],['K9','Then I have misunderstood. Tell me about the pigeon again.'],['','She tells him about the pigeon again. Her good hand is holding the old hound’s collar so hard that the hound looks up at her.']],done)}},
  KD_NO('Say what the second page says.','he is not going to do that to her')])));
kdEv2('kd_later',9,()=>S.phase!=='after'&&(S.kd.deny||0)>=3,done=>{const m=kdMe();say([
 ['',m?'It has been weeks. She hasn’t said it, and by now there is a way of walking round it that she does without thinking, like the low beam in the trailer.':'It has been weeks. She has not said it. She goes round it the way she goes round the low beam in her trailer, without looking.'],
 ['',m?'She sleeps four hours and tells people six. She laughs at the right places a quarter of a second late. Nobody but V could time it.':'She sleeps four hours and tells him six. She laughs at the right places a quarter of a second late. He has timed it.'],
 ['hitmeuppp',MV('i’m fine.','i’m FINE. ask me again and i’ll bite.','I’m fine. Ask again and I’ll bite you.','I’m fine. I’m great, actually. I’m thriving. Ask me again and I’ll bite you, and I’ve got two teeth fewer to do it with, so it’ll be personal.')],
 ['K9','(She will carry on like this until it kills her. It is on no list of mine, and there is nobody I can take it out of.)']],done)});

/* ---------- drafts: what she types at 3am and does not send ---------- */
const KD_DRAFT=['V. i think when i was under they','V. i think','V.'];
EVENTS.push({id:'kd_draft',when:()=>{try{return kdPost()&&S.f.kd_math&&(S.f.kdDraft||0)<4&&S.f.kdDraftDay!==S.day&&tier()>=1}catch(e){return false}},run:done=>{S.seen.kd_draft=0;const n=S.f.kdDraft||0;S.f.kdDraft=n+1;S.f.kdDraftDay=S.day;save();const m=kdMe();
 if(n<3){phPush(m?'v':'m','sys',m?`03:${40+n*4} · draft, not sent: “${KD_DRAFT[n]}”`:`03:${40+n*4} · hitmeuppp is typing… · stopped`);kdDeny();
  return say([['',m?['At twenty to four she types half a sentence to him and looks at it until the screen dims. Then she holds the delete key down.','The next night she gets three words in.','Tonight it is his initial and a full stop.'][n]:['At twenty to four the three dots come up under her name. They stay for six minutes. Then they go, and nothing arrives.','The dots again, at the same hour, for less time.','The dots come up and go at once. He has started keeping the telephone face up on his chest.'][n]]],done)}
 phPush(m?'v':'m',m?'me':'t','did u feed prickles');phPush(m?'v':'m',m?'t':'me','I do not water Prickles. That is why he is alive. Go to sleep.');
 say([['',m?'On the fourth night she sends him something. It is about the cactus.':'On the fourth night a message arrives. It is about the cactus. He answers it as if it were the message she meant.']],done)}});
EV_REPEAT.add('kd_draft');

/* ---------- talk ---------- */
TDTOP_V.push({id:'kd_second',label:()=>'“what’d the doctor tell u”',show:()=>kdPost()&&tier()>=2&&S.f.kd_math&&!(S.talks&&S.talks.kd_second),run:b=>{S.talks=S.talks||{};S.talks.kd_second=1;warm('v','kd_second',3);
 say([['K9','She told me what is on the first page. There is a second page. I have read it. I will tell you what is on it if you ask me to.']],()=>ask('hitmeuppp','(The second page.)',[
  KD_NO('“tell me.”'),
  {t:'“nah. bet it’s boring.”',fn:()=>{kdDeny();say([['K9','It is not boring.'],['hitmeuppp',MV('ok well.','ok well. keep it then.','Okay. Well. Keep it, then.','Okay. Well. Hang on to it for me, then. Somewhere I won’t trip over it.')],['','He puts his hand flat on the table, near hers, and leaves it there.']],b)}},
  {t:'“is there soup left”',fn:()=>{kdDeny();apply({aff:1});say([['K9','There is soup left.'],['','He heats it. She eats it standing up at the counter with her back to the wall, and he does the crossword and does not fill in seven down.']],b)}}]))}});
TDTOP_M.push({id:'kd_second',label:()=>'“Do you want to know what I know?”',show:()=>kdPost()&&tier()>=2&&S.f.kd_math&&!(S.talks&&S.talks.kd_second),run:b=>{S.talks=S.talks||{};S.talks.kd_second=1;warm('m','kd_second',3);kdDeny();
 say([['hitmeuppp',MV('no.','no. about what. no.','No. About what? No.','No. I don’t even know what you mean, and no.')],['K9','Very well. It will keep.'],
  ['hitmeuppp',MV('k.','k. good. ...don’t write it in the notebook.','Good. Don’t put it in the notebook.','Good. And don’t write it in the notebook with my quotes. That one’s for the stuff I said on purpose.')],['K9','It is not in the notebook.']],b)}});

/* ---------- phone ---------- */
txDef('tx_kd_sleep',{with:'v',pov:'m',prio:2,when:()=>kdPost()&&(S.kd.deny||0)>=2&&tier()>=1,nodes:{
 start:{in:()=>['You slept from 02:10 to 05:50. That is three hours and forty minutes.','You told Angel that you slept eight.'],expire:3,
  opts:()=>[{t:'“creep”',fx:()=>kdDeny(),reply:()=>['Yes.','There is tea on the stairs outside your door. I am not outside your door. I am on the stairs.']},
   {t:'“i sleep fine”',fx:()=>kdDeny(),reply:()=>['You sleep for three hours and forty minutes and you are fine. I have written both down.']},
   {t:'“come sit on the stairs then”',fx:()=>{apply({aff:3});calm(3)},reply:()=>['I am already on the stairs.','You need not talk. I have the crossword.']}]}}});
txDef('tx_kd_ask',{with:'a',pov:'m',prio:2,when:()=>kdPost()&&S.f.kd_notask&&frT('a')>=1,nodes:{
 start:{in:()=>['not asking. i said i wouldn’t and i’m not','but if there’s ever a 3am where u want to say a thing to someone who’ll forget it by breakfast','i’m very stupid at 3am. famously. i retain nothing'],expire:3,
  opts:()=>[{t:'“nothing to say”',fx:()=>{kdDeny();fr('a',1)},reply:()=>['ok','offer’s got no expiry. like the heartsick angel’s grudges']},
   {t:'“...ok. noted”',fx:()=>fr('a',3),reply:()=>['noted is fine','noted is the most i’ve ever got out of u. i’m framing it']},
   {t:'“can u bring the bad snacks”',fx:()=>{kdDeny();fr('a',2)},reply:()=>['already in the car. ronin’s driving. he has a list of men and a list of snacks and he’s doing the snacks first, which i think is growth']}]}}});
txDef('tx_kd_vdots',{with:'m',pov:'v',prio:2,when:()=>kdPost()&&(S.f.kdDraft||0)>=2&&tier()>=1,nodes:{
 start:{in:()=>['hey','do u ever start typing smth and then its like. why'],expire:3,
  opts:()=>[{t:'“Often. I have a draft that says only ‘Stay.’”',fx:()=>apply({aff:3}),reply:()=>['lol','who was that for','dont answer. i know who that was for'],next:'two'},
   {t:'“What were you typing?”',fx:()=>kdDeny(),reply:()=>['nothing. cactus stuff'],next:'two'}]},
 two:{in:()=>['if i ever sent u half a sentence. would u be normal about it'],
  opts:()=>[{t:'“I would read the half that arrived.”',fx:()=>{apply({aff:3});calm(2)},reply:()=>['ok','ok. good','im not sending one. just checking']},
   {t:'“I would not be normal. I would be on the stairs.”',fx:()=>apply({aff:2}),reply:()=>['ur always on the stairs','...its fine. i like knowing where the stairs are']}]}}});
const _xeKD3=extraEnding;extraEnding=function(){const L=_xeKD3();if(!S||!S.kd||!S.kd.t0)return L;const d=S.kd.deny||0;
 if(d>=3)L.push('She never did the sum. The people who love her have each guessed at part of the answer, and none of them has said so. She sleeps four hours a night and says six, and it is the thing most likely to kill her, and it is on nobody’s list.');
 else if(d>0)L.push('There is a second page of the doctor’s notes that she has not read. It is in the archive under M, and it will keep.');
 return L};

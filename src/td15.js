/* ===================== V'S HEART: romancing Angel or Ronin ===================== */
const vromName=k=>(k||S.vrom)==='r'?'Ronin':'Angelic';
const vromWho=k=>(k||S.vrom)==='r'?RN:AN;
const vromHurt=()=>!!(S&&(S.f.movedIn||S.aff>=75||S.f.wasRide));
const vromOK=k=>S&&isV()&&S.pov!=='m'&&!isLone()&&!S.vrom&&!S.rom&&!S.f.married&&!S.f['vromNo'+k]&&frT(k)>=2&&S.phase!=='taken'&&!S.dark&&(k!=='r'||(S.rivalry||0)<60);
const _apVR=apply;apply=function(e){_apVR(e);if(S&&S.vrom&&S.aff>74){S.aff=74;save();drawHud()}};
const _moveVR=moveInReady;moveInReady=function(){return !(S&&S.vrom)&&_moveVR()};
function vromConfess(k){const N=vromWho(k);
 const L=k==='a'?[['','Her studio after a shoot. The ring lights tick as they cool. Angel is taking her lashes off one at a time and not looking at you.'],
  [AN,'can i ask you something weird. you never watch me. the way everyone watches me. you just… look.'],
  ['K9','I was not aware there was a difference.'],
  [AN,'there’s a huge difference, V. one of them i get paid for.'],
  [AN,'okay i’m just gonna say it and then hide behind the rack. i like you. not bestie like. redo-my-lipstick-before-you-come-over like.'],
  vromHurt()?[AN,'and i know about misaki. i’m not asking you to stop being that. i just couldn’t keep pretending the lipstick was for the camera.']:null]
 :[['','Ronin’s roof, three in the morning. He called you up to “settle somethin’.” You brought the baton out of habit. He noticed. He liked that.'],
  [RN,'Vee. Been thinkin’ about why you get under my skin so bad.'],
  ['K9','I assumed it was the crowbar wall.'],
  [RN,'Thought so too. Then I caught myself ironin’ the good shirt for your stupid gala. Ironin’, Vee.'],
  [RN,'So. Kiss or kill, Mister Foundation? Pick careful. Trouble is, I’d be happy either way.'],
  vromHurt()?[RN,'And yeah, I know about the little firecracker. Ain’t askin’ you to choose. Just puttin’ my name in the hat.']:null];
 say(L.filter(Boolean),()=>ask('K9','(...)',[
  {t:k==='a'?'“…I have noticed the lipstick.”':'“Kiss. Do not make me say it twice.”',fn:()=>{S.vrom=k;S.vromDates=0;if(vromHurt()&&S.aff>74)S.aff=74;save();toast('♥ Romance: '+vromName(k));
   say(k==='a'?[[AN,'you NOTICED?? oh my god. okay. i’m going behind the rack. come find me.'],['','You find her behind the rack. It takes a long time to come back out.']]
    :[[RN,'Twice? Darlin’, I’m gonna make you say it every day.'],['','He kisses the way he fights: no warning, all at once. Afterwards he straightens your collar, with great care.']],()=>vromAfterYes(k))}},
  {t:k==='a'?'“I treasure you. Not like that.”':'“Neither. You are my friend, Ronin. That is rarer.”',fn:()=>{S.f['vromNo'+k]=1;fr(k,2);save();say(k==='a'?[[AN,'okay! okay. that’s okay. you’re still my favourite rich weirdo. i’m going to cry a normal amount and then make you brunch.']]:[[RN,'Friend. Huh. Ain’t nobody called me that and meant it in a while.'],[RN,'...Fine. Get off my roof. Bring soup next time.']],hub)}}]))}
function vromAfterYes(k){if(!vromHurt())return hub();const N=vromName(k);const moved=!!S.f.movedIn;S.f.vhb=S.day;if(moved)S.f.movedIn=0;save();
 cut([['','You tell Misaki yourself. The konbini car park, four in the morning, two egg sandwiches.'],
  ['K9',`It is ${N}. I wanted you to hear it from me.`],
  ['hitmeuppp',MV('...oh.','oh. ok. ok.','Oh. Okay.','...Okay. Thank you for telling me first.')],
  ['','She eats her whole sandwich before she says anything else. You let her.'],
  moved?['hitmeuppp',MV('i’ll move the trailer back to the lot. it’s fine.','i’ll move the trailer back. it’s fine. it’s FINE.','I’ll move the trailer back to the lot this weekend.','I’ll move the trailer back. Leave the mailbox up. In case.')]:null,
  ['hitmeuppp',MV('ur still walking the dogs with me','you still walk the dogs with me. not negotiable.','We still walk the dogs. That part isn’t yours to take.','I’m happy for you. I’ll be happy properly next week. Tonight I’m only mostly happy.')],
  ['K9','The side door stays unlocked.']].filter(Boolean),()=>{if(typeof relApply==='function')relApply({tension:6});hub()},'#06050a')}
function vromDate(k){const n=S.vromDates||0;const D=k==='a'?[
  [['','The shelter’s adoption day. Angel shoots portraits of every dog. You hold the treats and the dogs’ dignity.'],[AN,'smile, mochi. no, the OTHER mochi. V, which one is the other mochi.'],['K9','On Tuesdays they are all Mochi. It is a long story.'],['','Every dog is adopted by Sunday. She posts the portraits. She keeps the one of you on the floor under eleven puppies.']],
  [['','A quarry outside the city, a crate of clay pigeons, and Angel’s shotgun, which she calls Beyoncé.'],[AN,'pull!'],['','She hits twenty-three of twenty-five. You hit twenty-five and apologise for it.'],[AN,'don’t apologise. that was hot. i’m saying that once.']],
  [['','Her apartment, no ring lights. She sits you on the edge of the bath and does your skincare like surgery.'],[AN,'you have the pores of a man who has never once moisturised.'],['K9','I have moisturised.'],[AN,'with what.'],['K9','...Soap.'],[AN,'okay. i’m keeping you. purely to fix this.']]]
 :[
  [['','A bowling alley at midnight. Ronin bowls like the pins owe him money. You bowl with perfect form and score a 74.'],[RN,'Seventy-four. Man can disarm a guy with a fountain pen.'],['K9','It is a very different motion.'],[RN,'C’mere. Hips. No— hips.'],['','You bowl a strike. He is unbearable about it for a week.']],
  [['','Your kitchen, two in the morning. Ronin is making his grandmother’s apple crumble and refusing to measure anything.'],['K9','That is not a tablespoon.'],[RN,'It’s a Ronin-spoon. Trust the process.'],['','It is the best thing you have ever eaten. When you say so, he has to go and stand on the balcony for a minute.']],
  [['','A hunting night, just the two of you. Afterwards he runs the tap warm and washes your hands in his sink, knuckle by knuckle.'],[RN,'Kiss or kill. Picked kiss a while back.'],['K9','You said it on the roof.'],[RN,'Said it. Didn’t SAY it. You know what I mean, Mister Foundation.']]];
 spend();S.vromDates=n+1;fr(k,4);save();cut(D[Math.min(n,2)],hub,k==='a'?'#2a1428':'#1a0408')}
function vromKey(){const k=S.vrom;S.f.vromKey=k;fr(k,8);save();
 cut(k==='a'?[['','You give Angel a key to the side door, on a ribbon, in a box that is far too large for it.'],[AN,'V. this is a KEY.'],['K9','It opens the side door. It does not open the deep house. Yet.'],[AN,'“yet.” he said yet. i’m screaming. i’m screaming quietly. biscuit, he said yet.']]
  :[['','You leave a key on Ronin’s crowbar wall, hung on its own hook, between the good crowbar and the sentimental one.'],[RN,'...Vee. What’s this.'],['K9','A key. To my house. Please do not come in through the roof any more.'],[RN,'I’ll use the door. ...Sometimes. Mostly the roof. It’s romantic, the roof.']],hub,'#0a0810')}
function vromHub(late){const o=[];['a','r'].forEach(k=>{if(vromOK(k))o.push({t:`Something’s different with ${k==='r'?'Ronin':'Angel'}…`,sub:'romance · V',dis:late,fn:()=>{spend();vromConfess(k)}})});
 if(S&&S.vrom){const N=vromName();o.push({t:`Date night with ${S.vrom==='r'?'Ronin':'Angel'}`,sub:(S.vromDates||0)>=3?'they’re yours':'date '+((S.vromDates||0)+1)+'/3',dis:late||S.done.vromDate,fn:()=>{S.done.vromDate=1;vromDate(S.vrom)}});
  if((S.vromDates||0)>=3&&!S.f.vromKey)o.push({t:`Give ${S.vrom==='r'?'Ronin':'Angel'} a key to the house`,sub:'it’s time',dis:late,fn:()=>{spend();vromKey()}})}
 return o.length?[{h:'♥ V'}].concat(o):[]}
const _rhVR=romHub;romHub=function(late){let o=_rhVR(late);if(S&&S.vrom)o=o.filter(x=>!/^Something’s different with (Ronin|Angelic)…/.test(x.t||''));return o.concat(vromHub(late))};
EVENTS.push({id:'vrom_chat',when:()=>S.vrom&&!S.f.vhb&&!S.seen.vrom_chat,run:done=>say(S.vrom==='a'?[['hitmeuppp','(in chat) WAIT. V. AND ANGEL??'],[RN,'(in chat) called it. pay up, nobody bet against me.'],[AN,'(in chat) we’re being very normal about it. i’m being so normal. 💅'],['K9','(in chat) Noted.']]:[[AN,'(in chat) V AND RONIN?????'],['hitmeuppp','(in chat) enemies to lovers is real and it happened in OUR server'],[RN,'(in chat) ain’t enemies. was never enemies. was foreplay with a crowbar.'],['K9','(in chat) Please never say that again.']],done)},
 {id:'vrom_morn',when:()=>S.vrom&&(S.vromDates||0)>=1&&!S.dark,run:done=>{S.seen.vrom_morn=0;const P=S.vrom==='a'?[[['','Angel leaves a lipstick print on your coffee cup and an apology note that is not, in any way, an apology.']],[[AN,'(text) good morning to you and to your pores specifically.']],[['','You find a ring light set up in the kennel. Biscuit has a skincare routine now.']]]:[[['','You come down to find Ronin asleep on the atrium couch with all three dogs on him. He claims they ambushed him.']],[[RN,'(text) your swan’s melting again. want me to put it out of its misery'],['K9','(text) Please do not touch the swan.']],[['','A crowbar appears on your crowbar-free wall, on its own hook. Neither of you mentions it.']]];say(pk(P),done)}});
const _xeVR=extraEnding;extraEnding=function(){const L=_xeVR();if(S&&S.vrom)L.push(S.vrom==='a'?(S.f.vromKey?'V gave Angelic a key, and later a ring light of her own in the atrium. She has never once posted the house. Some things are just hers.':'V and Angelic are a scandal the gossip pages never quite catch. She does his skincare. He does her taxes. Both are terrifying.'):(S.f.vromKey?'Ronin has a key to V’s house. He still comes in through the roof. V leaves the skylight unlocked, and the cereal out.':'V and Ronin argue every day and go home together every night. Angel says it’s the most romantic thing she has ever watched. Nobody else can tell the difference.'));return L};

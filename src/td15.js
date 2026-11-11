/* ===================== V'S HEART: romancing Angel or Ronin ===================== */
const vromName=k=>(k||S.vrom)==='r'?'Ronin':'Angelic';
const vromWho=k=>(k||S.vrom)==='r'?RN:AN;
const vromHurt=()=>!!(S&&(S.f.movedIn||S.aff>=75||S.f.wasRide));
const vromOK=k=>S&&isV()&&S.pov!=='m'&&!isLone()&&!S.vrom&&!S.rom&&!S.f.married&&!S.f['vromNo'+k]&&frT(k)>=2&&S.phase!=='taken'&&!S.dark&&(k!=='r'||(S.rivalry||0)<60);
const _apVR=apply;apply=function(e){_apVR(e);if(S&&S.vrom&&S.aff>74){S.aff=74;save();drawHud()}};
const _moveVR=moveInReady;moveInReady=function(){return !(S&&S.vrom)&&_moveVR()};
function vromConfess(k){const N=vromWho(k);
 const L=k==='a'?[['','Her studio after a shoot. The ring lights tick as they cool. Angel is taking her lashes off one at a time and not looking at you.'],
  [AN,'two million people watch me. you look at me like you’re checking i’m still in one piece.'],
  ['K9','I was not aware there was a difference.'],
  [AN,'i get paid for the watching. i’ve been getting greedy about the looking.'],
  [AN,'so i’m saying it once. i want you. i redo my lipstick before you come over and i’d like to see it ruined.'],
  vromHurt()?[AN,'and yes, i know about misaki. keep her. i’m greedy, i can share a little.']:null]
 :[['','Ronin’s roof, three in the morning. He called you up to “settle somethin’.” You brought the baton out of habit. He clocked it and grinned.'],
  [RN,'Vee. Been tryin’ t’work out why you piss me off so fuckin’ much.'],
  ['K9','I assumed it was the crowbar wall.'],
  [RN,'So did I. Then I caught myself ironin’ a shirt for your shitty gala. Ironin’, Vee. Fuck’s sake.'],
  [RN,'So. Kiss or kill, Mister Foundation? Pick quick. I’m gonna enjoy it either way.'],
  vromHurt()?[RN,'And yeah, I know about your little firecracker. Keep her, I ain’t fussy. Sucks t’be you, though: I don’t lose.']:null];
 say(L.filter(Boolean),()=>ask('K9','(...)',[
  {t:k==='a'?'“…I have noticed the lipstick.”':'“Kiss. Do not make me say it twice.”',fn:()=>{S.vrom=k;S.vromDates=0;if(vromHurt()&&S.aff>74)S.aff=74;save();toast('♥ Romance: '+vromName(k));
   say(k==='a'?[[AN,'you noticed and said NOTHING? for weeks? get behind that rack, V. now.'],['','You go. The lipstick does not survive it. (She leaves the print on your collar where it is.)']]
    :[[RN,'Twice? Nah. I’m gonna make you say it ’til you’re sick of it.'],['','He kisses the way he fights: no warning, all at once, teeth in it. Afterwards he flicks your collar straight and laughs at your face.']],()=>vromAfterYes(k))}},
  {t:k==='a'?'“You are dear to me. That is all it is.”':'“Neither. You are my friend, Ronin. I have few.”',fn:()=>{S.f['vromNo'+k]=1;fr(k,2);save();say(k==='a'?[[AN,'oh. okay. wow. nobody’s told me no in about four years. i’m going to go shoot something, and then you’re buying me brunch.']]:[[RN,'Friend. Fuck me, that’s worse. I’d’ve taken the baton.'],[RN,'Get off my roof, asshole. And you owe me soup.']],hub)}}]))}
function vromAfterYes(k){if(!vromHurt())return hub();const N=vromName(k);const moved=!!S.f.movedIn;S.f.vhb=S.day;if(moved)S.f.movedIn=0;save();
 cut([['','You tell Misaki yourself. The corner store car park, four in the morning, two egg sandwiches.'],
  ['K9',`It is ${N}. I wanted you to hear it from me.`],
  ['hitmeuppp',MV('oh. lol. ok','oh. ok. cool. COOL.','Oh. Okay. Wow. Seriously?','Oh, fuck. Okay. No, okay. At least you said it to my face.')],
  ['','She eats her whole sandwich before she says anything else. Then she eats yours.'],
  moved?['hitmeuppp',MV('moving the trailer back. its fine','i’ll move the trailer back. it’s fine. it’s FINE.','I’m towing the trailer back to the lot this weekend. Don’t help.','I’m towing the trailer back. The mailbox stays up. Touch it and I’ll take your fingers.')]:null,
  ['hitmeuppp',MV('ur still walking the dogs with me','you still walk the dogs with me. not negotiable.','We still walk the dogs, babe. I’m not losing Biscuit in the divorce.','I’m happy for you, totally, whatever. Ask me next week and I’ll mean it. Tonight I get to be a bitch about it.')],
  ['K9','The side door stays unlocked.']].filter(Boolean),()=>{if(typeof relApply==='function')relApply({tension:6});hub()},'#06050a')}
function vromDate(k){const n=S.vromDates||0;const D=k==='a'?[
  [['','The kennel, after midnight. Angel wanted to meet the hounds properly. You let her in and stand between her and the pens anyway.'],[AN,'they’re not looking at me. they’re looking at u. waiting for u to say if i’m food.'],['K9','You are not food.'],['','Four heads lower, at the same moment, like a decision passed down a line. Angel lets out a breath. Then she sits on the floor in her good coat and lets the pale one smell her hair, for a very long time, and does not move once.']],
  [['','A quarry outside the city, a crate of clay pigeons, and Angel’s shotgun, which she calls Beyoncé.'],[AN,'pull!'],['','She hits twenty-three of twenty-five. You hit twenty-five and apologise for it.'],[AN,'don’t apologise. that was hot. i’m saying that once.']],
  [['','Her apartment, no ring lights. She sits you on the edge of the bath and does your skincare like surgery.'],[AN,'you have the pores of a man who has never once moisturised.'],['K9','I have moisturised.'],[AN,'with what.'],['K9','...Soap.'],[AN,'okay. i’m keeping you. purely to fix this.']]]
 :[
  [['','A bowling alley at midnight. Ronin bowls like the pins owe him money. You bowl with perfect form and score a 74.'],[RN,'Seventy-four. I watched you open a guy’s throat with a fountain pen and you bowl a fuckin’ seventy-four.'],['K9','It is a very different motion.'],[RN,'C’mere. Hips. No— hips.'],['','You bowl a strike. He is unbearable about it for a week.']],
  [['','Your kitchen, two in the morning. Ronin is making his grandmother’s apple crumble and refusing to measure anything.'],['K9','That is not a tablespoon.'],[RN,'It’s a spoon and it’s on a table. Quit hoverin’ or I’ll measure you.'],['','It is the best thing you have ever eaten. You say so. He calls you a liar with his mouth full and makes you say it again.']],
  [['','A hunting night, just the two of you; the thing took a long time to stop moving. Afterwards he scrubs the red off your hands in his sink, knuckle by knuckle.'],[RN,'Kiss or kill. Still pickin’ kiss, f’you were wonderin’.'],['K9','I was not. You were clear on the roof.'],[RN,'Smug prick. Next one’s mine t’kill. You had the last two.']]];
 spend();S.vromDates=n+1;fr(k,4);save();cut(D[Math.min(n,2)],hub,k==='a'?'#2a1428':'#1a0408')}
function vromKey(){const k=S.vrom;S.f.vromKey=k;fr(k,8);save();
 cut(k==='a'?[['','You give Angel a key to the side door, on a ribbon, in a box that is far too large for it.'],[AN,'V. this is a KEY.'],['K9','It opens the side door. It does not open the deep house. Yet.'],[AN,'“yet.” oh, i’m getting in there, V. i get in everywhere. biscuit, you heard him.']]
  :[['','You leave a key on Ronin’s crowbar wall, hung on its own hook, between the good crowbar and the sentimental one.'],[RN,'Vee. The fuck’s this.'],['K9','It is a key to my house. You will stop coming in through the roof.'],[RN,'Nah. Roof’s mine. But I’m keepin’ this, and you ain’t gettin’ it back.']],hub,'#0a0810')}
function vromHub(late){const o=[];['a','r'].forEach(k=>{if(vromOK(k))o.push({t:`Something’s different with ${k==='r'?'Ronin':'Angel'}…`,sub:'romance · V',dis:late,fn:()=>{spend();vromConfess(k)}})});
 if(S&&S.vrom){const N=vromName();o.push({t:`Date night with ${S.vrom==='r'?'Ronin':'Angel'}`,sub:(S.vromDates||0)>=3?'they’re yours':'date '+((S.vromDates||0)+1)+'/3',dis:late||S.done.vromDate,fn:()=>{S.done.vromDate=1;vromDate(S.vrom)}});
  if((S.vromDates||0)>=3&&!S.f.vromKey)o.push({t:`Give ${S.vrom==='r'?'Ronin':'Angel'} a key to the house`,sub:'it’s time',dis:late,fn:()=>{spend();vromKey()}})}
 return o.length?[{h:'♥ V'}].concat(o):[]}
const _rhVR=romHub;romHub=function(late){let o=_rhVR(late);if(S&&S.vrom)o=o.filter(x=>!/^Something’s different with (Ronin|Angelic)…/.test(x.t||''));return o.concat(vromHub(late))};
EVENTS.push({id:'vrom_chat',when:()=>S.vrom&&!S.f.vhb&&!S.seen.vrom_chat,run:done=>say(S.vrom==='a'?[['hitmeuppp','(in chat) WAIT. V. AND ANGEL??'],[RN,'(in chat) called it. pay up, nobody bet against me.'],[AN,'(in chat) we’re being very normal about it. i’m being so normal. 💅'],['K9','(in chat) Noted.']]:[[AN,'(in chat) V AND RONIN?????'],['hitmeuppp','(in chat) enemies to lovers is real and it happened in OUR server'],[RN,'(in chat) ain’t enemies. was never enemies. was foreplay with a crowbar.'],['K9','(in chat) Please never say that again.']],done)},
 {id:'vrom_morn',when:()=>S.vrom&&(S.vromDates||0)>=1&&!S.dark,run:done=>{S.seen.vrom_morn=0;const P=S.vrom==='a'?[[['','Angel leaves a lipstick print on your coffee cup and an apology note that is not, in any way, an apology.']],[[AN,'(text) good morning to you and to your pores specifically.']],[['','You find a ring light set up outside the kennel door, pointed in. Nothing in the footage moves for forty minutes except the eyes. Angel deletes it without posting.']]]:[[['','You come down to find Ronin asleep on the atrium couch with all three dogs on him. They were lying with their heads up, watching the door, the way they watch for something to come through it.']],[[RN,'(text) your swan’s melting again. want me to put it out of its misery'],['K9','(text) Please do not touch the swan.']],[['','A crowbar appears on your crowbar-free wall, on its own hook. Neither of you mentions it.']]];say(pk(P),done)}});
const _xeVR=extraEnding;extraEnding=function(){const L=_xeVR();if(S&&S.vrom)L.push(S.vrom==='a'?(S.f.vromKey?'V gave Angelic a key, and later a ring light of her own in the atrium. She has never once posted the house. Some things are just hers.':'V and Angelic are a scandal the gossip pages never quite catch. She does his skincare. He does her taxes. Both are terrifying.'):(S.f.vromKey?'Ronin has a key to V’s house. He still comes in through the roof. V leaves the skylight unlocked, and the cereal out.':'V and Ronin argue every day and go home together every night. Angel says it’s the most romantic thing she has ever watched. Nobody else can tell the difference.'));return L};

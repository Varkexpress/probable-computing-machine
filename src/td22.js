/* ===================== td22: what they are, and what the kidnapping took =====================
   - These are serial killers. The four of them, the hounds, and what the rest of the city's killers think of them.
   - After the kidnapping Misaki loses most of the whimsy (voice drains; MV picks the plainer lines), dresses
     androgynously at once, and later cuts the red streak out for a layered, choppy cut (sprite + portrait).
   - V suspects worse was done to her than she has said.
   - Misaki keeps no places. She keeps what each city she has worked in believed.
   - She used to do digital art commissions for rent.
   Voices: V never contracts. Ronin: the Devil, joy in it. Angel: sweet, mature, selfless, and never misses. */
const k22Post=()=>!!S&&['after','act2','act3','epilogue'].includes(S.phase);
const k22M=()=>S.pov!=='v';
const k22Hair=()=>!!(S&&S.f&&S.f.k22hair);

/* ---------- the whimsy drains ---------- */
/* MV (index.html) picks its variant through mvTier(): after the kidnapping she reaches for the plain lines */
function mvTier(){if(!S)return 0;const t=tier();return k22Post()?Math.max(t,2):t}
const _ml22=mLevel;mLevel=function(){return k22Post()?3:_ml22()};

/* ---------- how she looks ---------- */
const MIS_A=mk3(["..................","..................",".....kkkkkkk......","....kKkkkkkkkw....","...kkKkkrkkkkww...","..kkkkkrrkkkkkw...","..kkkkrkkkkkkkkk..","..kkkrkkkkkkkkkk..","..kkkssssssskkkk..","..kkssesssesskkk..","...kssssssssskk...","...k.sssssss.kk...","......sSSSs.......","....gggggggggg....","...gggggggggggg...","...gggggggggggg...","...gggggggggggg...","...gggggggggggg...","...sggggggggggs...","...s.gggggggg.s...",".....gggggggg.....",".....LLLLLLLLL....",".....LLLL.LLLL....",".....LLLL.LLLL....","......LL...LL.....","......LL...LL.....","......LL...LL.....",".....LLL...LLL....",".....LLL...LLL....",".....LLL...LLL....","....bbbb...bbbb...","....bbbb...bbbb...","....bbbb...bbbb...",".................."],
 Object.assign({},MIS.P,{g:'#3a3644',L:'#24222c'}));
const MIS_B=mk3(["..................","..................",".....kkkkkkk......","....kKkkKkkkk.....","...kkKkkKkkKkk....","..kkKkkkKkkKkkk...","..kkkkkKkkkKkkkk..","..kKkkkkkkKkkkKk..","..kkkssssssskkkk..","..k.ssesssess.kk..","..k.sssssssss.k...","....sssssssss.....","......sSSSs.......","....gggggggggg....","...gggggggggggg...","...gggggggggggg...","...gggggggggggg...","...gggggggggggg...","...sggggggggggs...","...s.gggggggg.s...",".....gggggggg.....",".....LLLLLLLLL....",".....LLLL.LLLL....",".....LLLL.LLLL....","......LL...LL.....","......LL...LL.....","......LL...LL.....",".....LLL...LLL....",".....LLL...LLL....",".....LLL...LLL....","....bbbb...bbbb...","....bbbb...bbbb...","....bbbb...bbbb...",".................."],
 Object.assign({},MIS.P,{g:'#3a3644',L:'#24222c'}));
const MISW_A=mkWalk(MIS_A,24),MISW_B=mkWalk(MIS_B,24);
const _act22=tdActor;tdActor=function(k){if(k==='m'&&k22Post()){const a=MIS,aw=MISW;const B=k22Hair();MIS=B?MIS_B:MIS_A;MISW=B?MISW_B:MISW_A;try{return _act22.apply(this,arguments)}finally{MIS=a;MISW=aw}}return _act22.apply(this,arguments)};
/* the portrait loses the streak too: bright reds in the upper half of her portrait go to hair-black */
const _dp22=drawPortrait;drawPortrait=function(cv,k){const r=_dp22.apply(this,arguments);try{if(k==='m'&&k22Hair()&&cv&&cv.getContext){const g=cv.getContext('2d');const h=Math.floor(cv.height*.5);const im=g.getImageData(0,0,cv.width,h);const d=im.data;for(let i=0;i<d.length;i+=4){if(d[i]>150&&d[i+1]<90&&d[i+2]<100){d[i]=30;d[i+1]=26;d[i+2]=46}}g.putImageData(im,0,0)}}catch(e){}return r};

/* ---------- priority mornings ---------- */
const K22EV=[];
const _morn22=morningEvent;morningEvent=function(done){try{if(S&&!isLone()&&S.phase!=='taken'&&!(S.f.k22last>=S.day-1)&&!(S.f.ptLast>=S.day-1)&&!(S.f.t19last>=S.day-1)){const e=K22EV.find(e=>!S.seen[e.id]&&e.when());if(e){S.seen[e.id]=1;S.f.k22last=S.day;save();return e.run(done)}}}catch(err){}return _morn22(done)};
const k22Say=(L,cb,mood)=>{if(mood)try{mzForce(mood)}catch(e){}say(L.filter(Boolean),()=>{if(mood)try{mzForce(null)}catch(e){}cb&&cb()})};

/* the clothes, straight away */
K22EV.push({id:'k22_clothes',when:()=>k22Post(),run:done=>k22Say(k22M()?[
 ['','The skirt goes in a bin bag. Then the platform boots. Then the striped top. You do not decide to do it. Your hands do it and you watch.'],
 ['','You keep one hoodie, the grey one, two sizes too big. Black trousers. Flat boots you can run in. In the mirror there is a person you would walk past without looking at twice. That is the point.'],
 [AN,'(text) babe u left a bin bag of clothes outside my door. the GOOD clothes. are u ok'],
 ['M','(text) keep them. or burn them. either.'],
 [AN,'(text) i’m keeping them. i’m keeping them in a box with ur name on it. not because u want them back. just so they’re somewhere.']]
 :[['','She comes down to breakfast in a grey hoodie two sizes too big and black trousers. No skirt. No stripes. No platform boots. She has never once, in all the time you have known her, worn anything she could not be noticed in.'],
 ['','Now she is dressed to be nobody. She sits with her back to the wall and eats in silence, and the silence is the part you cannot stop noticing.'],
 ['K9','(to yourself) Noted.'],
 ['','You do not say anything to her about it. You go to the ops deck and open a new page in the notebook, and you write the date, and under it: clothes.']],done)});

/* V suspects */
K22EV.push({id:'k22_sus1',when:()=>k22Post()&&S.seen.k22_clothes&&S.day>=(S.f.returnDay||0)+3,run:done=>k22Say(k22M()?[
 ['','V watches you. He thinks you do not notice. You notice everything. It is the job, and it was the job before they took you.'],
 ['','He watches you check the room behind you before you sit. He watches you flinch at the sound of tape coming off a roll. He watches you not let anybody stand behind you, not even him.'],
 ['','You told him about the bulb and the radio. You told him about the door and the tray. You did not tell him about the four days you do not remember, because you do not remember them, and you are not going to guess out loud.'],
 ['','He is guessing. You can see it on him like weather. You let him. The version he is imagining is probably worse than whatever it was. Probably. You do not know. That is the whole problem.']]
 :[['','You lay it out the way you would lay out a case. She was gone eleven days. She has accounted for seven: the bulb, the radio, the tray, the door. Four days are missing, and she talks around them the way people talk around a hole in the floor.'],
 ['','The clothes. The tape: she left the room yesterday when Angel taped a box. The way she will not let anyone stand behind her, including you. The way she stopped laughing at things and started watching them.'],
 ['','Something was done to her that she has not said. Perhaps that she cannot say. You have seen this before, on other people, in rooms you got to too late.'],
 ['K9','(I will not ask. If I ask, she will give me an answer to stop me asking, and then that will be the answer forever.)'],
 ['','You write the four days on a page by themselves. You do not write anything under them. You leave the space.']],done,'dark')});

K22EV.push({id:'k22_sus2',when:()=>k22Post()&&S.seen.k22_sus1&&frT('r')>=1,run:done=>k22Say([
 ['','Ronin’s flat. The good crowbar is on the table between you, and Ronin is looking at it the way other men look at a drink.'],
 [RN,'You’ve got a face on you, Vee. The face of a man doin’ arithmetic he don’t like the answer to.'],
 ['K9','Four days. She does not account for them.'],
 [RN,'...Yeah. Yeah, I clocked that too.'],
 ['','He smiles. It is not a nice smile. It is the smile you have seen in crime-scene photographs, reflected in a window behind the body.'],
 [RN,'Here’s what I’m offerin’, and I want you to hear the whole thing. You find me the men who had her those four days. You give me the names. And then you go home, and you don’t ask, and you don’t read the paper for a week.'],
 [RN,'’Cause what I’ll do to ’em, Vee, the Devil himself’d tap me on the shoulder and ask me to take a break. And I wouldn’t.'],
 ['K9','You know my rules.'],
 [RN,'I know your rules. I respect your rules. Your rules ain’t got nothin’ to do with what I do on my own time.'],
 ['','You do not say yes. You do not say no. You leave the crowbar where it is, and on the drive home you realise you have been thinking about which names you would give him first.']],()=>{if(typeof relApply==='function')relApply({tension:4});fr('r',2);done()},'dark')});

K22EV.push({id:'k22_hair',when:()=>k22Post()&&S.seen.k22_clothes&&(S.day>=(S.f.returnDay||0)+6||['act2','act3','epilogue'].includes(S.phase)),run:done=>{S.f.k22hair=S.day;save();k22Say(k22M()?[
 ['','Angel’s bathroom, two in the morning. You sit on the edge of the bath with a towel round your shoulders and hand her the scissors.'],
 [AN,'what are we doing. tell me exactly. i’m not guessing with ur hair.'],
 ['M','the red. all of it. and shorter. layers. so it doesn’t look like anything.'],
 [AN,'...babe. that streak’s been ur whole thing since i met u.'],
 ['M','that’s why.'],
 ['','She does not argue. Angel never argues with the real reason once she has heard it. She cuts the red out first, one long piece, and puts it in an envelope instead of the bin, without asking. Then she cuts the rest into layers, choppy and uneven on purpose, so it falls over your eyes.'],
 [AN,'there. u look like u. a different u. a u that doesn’t want to be looked at.'],
 [AN,'i’ll fix the back next week. u flinched on the left. i won’t go near the left again.']]
 :[['','She comes back from Angel’s at four in the morning and the red is gone.'],
 ['','All of it. Her hair is shorter, cut in uneven layers that fall into her eyes. Black, nothing else. She looks younger, and older, and like nobody in particular, which you understand is exactly what she asked for.'],
 ['K9','It suits you.'],
 ['hitmeuppp','it doesn’t do anything. that’s the point.'],
 ['','Angel texts you an hour later: a photo of a white envelope, sealed, with MISAKI written on it in her round handwriting. “for if she ever wants it back. don’t tell her i kept it.”'],
 ['','You add a line to the page with the four days on it: the hair.']],()=>{toast('Misaki cut the red out of her hair');done()},'loss')}});

/* what they are */
K22EV.push({id:'k22_hounds',when:()=>S.day>=5,run:done=>k22Say([
 [RN,'(server) somebody tried the side gate at V’s last night. pro. good shoes.'],
 [AN,'(server) did he get in?? is everyone ok??'],
 [RN,'(server) everyone who matters is fine, angel. the hounds didn’t bark. they never bark.'],
 ['K9','(server) He left.'],
 [RN,'(server) He left on his own legs, which is more than most get. Folks in our line of work got a rule in this city, you know that, Vee? You hear V’s hounds not barkin’, you go home. You don’t finish the job. You don’t look back. You go home and you count yourself lucky the Devil’s dogs weren’t hungry.'],
 [k22M()?'M':'hitmeuppp','(server) they’re not the devil’s. they’re his.'],
 [RN,'(server) Darlin’, around here that’s a distinction without a difference.']],done)});

K22EV.push({id:'k22_angel',when:()=>S.day>=8&&frT('a')>=1,run:done=>k22Say([
 ['','Angel’s livestream is running in one tab. In the other, a building across town, a camera she has borrowed, a man who sold a child to another man.'],
 [AN,'(live, soft, perfect) ok so this is the serum i was telling u about, it’s so gentle, u pat it in, don’t rub—'],
 ['','In the other tab the man sits down at his kitchen table and does not stand up again. She did that from three streets away, an hour ago, before she put her face on. It took one shot. Angel has never needed two.'],
 [AN,'(live) —and that’s it! that’s the routine. drink water. be kind. bye my loves.'],
 ['','The stream ends. She takes her lashes off very slowly, one at a time, and then she cries, hard, for about four minutes. Not for him. For the kid, who is safe now and will still have to grow up remembering.'],
 [AN,'(text) done. the kid’s with the people we talked about. i’m ok. i’m always ok after. it’s the before i hate.'],
 ['','Everyone in the server reads it. Nobody makes a joke. The kindest of the four of you is the one who has never once missed.']],()=>{fr('a',2);done()},'dark')});

K22EV.push({id:'k22_ronin',when:()=>S.day>=11&&frT('r')>=1,run:done=>k22Say([
 [RN,'(server) [photo: a church pew, a hymnal open on it, something dark dried on the pages]'],
 [RN,'(server) Sunday service, y’all. Pastor won’t be preachin’ no more. Turns out he was real familiar with the choirboys. The Lord didn’t do nothin’ about it, so I figured I’d do the Lord’s work, the way the Lord’s cousin downstairs would do it.'],
 [AN,'(server) ronin. please don’t post the photos.'],
 [RN,'(server) Sorry, angel. I get excited.'],
 [k22M()?'M':'hitmeuppp','(server) did you have fun'],
 [RN,'(server) Darlin’, I had the best night of my whole year. I sang. I sang the whole hymnal. Backwards, a couple of ’em.'],
 ['',k22M()?'You believe him. That is the thing about Ronin. When he says he enjoyed it, he is never lying, and he never feels bad, and he will make you pancakes in the morning with the same hands.':'You believe him. That is the thing about Ronin. When he says he enjoyed it, he is never lying, and he is never sorry, and he will make pancakes in the morning with the same hands.']],done,'dark')});

K22EV.push({id:'k22_vwork',when:()=>S.day>=14&&S.pov==='m',run:done=>k22Say([
 ['','You are not supposed to be on the ops deck at three in the morning. The screens are on. One of them is a feed from a warehouse on the east side.'],
 ['','V is in it. In the coat, without hurrying. Three men in the room. The hounds come in after him, the four of them, low, silent, in a formation you have only ever seen soldiers use.'],
 ['','You watch for ninety seconds. You have done this work for ten years. You have never seen anyone do it so calmly, or so completely, or with so little left over.'],
 ['','When he comes home at five, he washes his hands in the kitchen sink, twice, and asks if you would like tea. You say yes. Your voice is perfectly normal. Your hands are not.']],done,'dark')});

/* ---------- the lower base: what they are, said plainly ---------- */
TDREACT.push({id:'k22_terror',map:'deep',once:true,say:1,when:()=>S.pov!=='v'&&S.phase!=='taken',line:()=>[
 ['','The corridor hums. Somewhere below you, in pens behind glass, the hounds are lying with their eyes open, listening to your heartbeat.'],
 ['hitmeuppp','(a man who rebuilt dying animals into things that don’t sleep. a man who sings hymns backwards over the bodies and means every word. a woman who has never once missed and cries afterwards for the right people. and me.)'],
 ['hitmeuppp','(if we were anybody else, we’d have killed ourselves out of terror by now. of each other. of this house. of what we do with our evenings.)'],
 ['hitmeuppp','(we’re not anybody else. tonight it’s ronin’s turn to cook.)']]},
 {id:'k22_terrorV',map:'deep',once:true,say:1,when:()=>S.pov==='v'&&S.phase!=='taken',line:()=>[
 ['','B3. You come down here most nights. You know exactly what you have built under your own house, and who you have let into it.'],
 ['K9','(A contract killer, a butcher who prays to the wrong side, a sniper with the kindest face in the city. And the hounds. And me, who made the hounds.)'],
 ['K9','(Any one of us, alone, the city would hunt. Together, the city has learned to look away.)']]});

/* ---------- the cities she keeps ---------- */
const K22BEL=[
 ['Prague','They say the man who built the astronomical clock was blinded afterwards, so he could never build a better one for anybody else.','so you never do your best work twice. you do it once, and you never let anyone see how.'],
 ['Naples','Under the city there is a cemetery of skulls. People adopt one, clean it, bring it flowers, and ask it for favours.','so i keep one name from every job. not theirs. someone they hurt. i bring it something, in my head. it’s stupid. it helps.'],
 ['Lisbon','They have a word for missing something so badly that the missing becomes the thing you keep.','so i don’t keep anything. if you don’t keep it you can’t miss it. (that’s not what the word means. i know.)'],
 ['Palermo','What you saw, you didn’t. Everybody there knows that rule, even the children.','so i didn’t see anything. ever. anywhere. that’s why i’m still alive.'],
 ['Mexico City','Some people there pray to a skeleton saint who doesn’t judge anybody. She just keeps the books.','i don’t pray. but i keep the books. every one. she’d approve.'],
 ['Istanbul','Praise draws bad luck. If somebody says something nice about you, you knock wood, or wear the blue eye, or you pay for it later.','so when V says something nice i flinch. i’m not being rude. i’m paying it off.'],
 ['New Orleans','The water gives back what you bury. So they bury their dead above the ground.','nothing stays buried. you plan for that. you plan for it coming back up.']];
function k22Bel(){if(!S)return[];const n=Math.min(K22BEL.length,Math.max(0,Math.floor((S.day-2)/3)));return K22BEL.slice(0,n)}
(function(){const vIns=o=>TOPICS_V.splice(TOPICS_V.length-1,0,o),mIns=o=>TOPICS_M.splice(TOPICS_M.length-1,0,o);
 mIns({id:'k22_cities',label:()=>'“You never talk about the cities you worked in.”',show:()=>k22Bel().length>0&&S.phase!=='taken',run:b=>{warm('m','k22_cities',3);const L=k22Bel();const x=L[(S.talks.k22_cities-1)%L.length];
  say([['hitmeuppp','i don’t remember the cities. streets, hotels, none of it. i couldn’t draw you a map of anywhere.'],['hitmeuppp','i remember what they believed. '+x[0].toLowerCase()+'.'],['','“'+x[1]+'”'],['hitmeuppp',x[2]],S.talks.k22_cities===1?['K9','You keep their beliefs instead of their streets.']:null,S.talks.k22_cities===1?['hitmeuppp','streets change. what people are scared of doesn’t.']:null].filter(Boolean),b)}});
 vIns({id:'k22_vcity',label:()=>'“what does your city believe?”',show:()=>k22Bel().length>=2&&S.phase!=='taken',run:b=>{warm('v','k22_vcity',3);
  say([['K9','This one? It believes that if you do not look at something, it is not your business.'],['K9','It is a very comfortable belief. I have built my whole life out of refusing it.'],['hitmeuppp','and the hounds'],['K9','The hounds are what happens when you look at something for long enough that it has to look back.']],b)}});
 mIns({id:'k22_art',label:()=>'“You used to draw?”',show:()=>!!S.f.k22art,run:b=>{warm('m','k22_art',3);
  say(k22Post()?[['hitmeuppp','commissions. digital. before the work paid, that paid the rent. ocs, couples, people’s dead pets.'],['hitmeuppp','i opened the tablet last week. i can still do hands. i can do backs, hair, coats.'],['hitmeuppp','i can’t do faces any more. every face i start comes out looking at the door.']]
   :[['hitmeuppp','commissions! digital. $40 a bust, $90 full body, extra for dogs. that was the rent for two years.'],['hitmeuppp','people’s ocs, couples, a LOT of dead pets. i was really good at eyes. people cried.'],['K9','Why did you stop?'],['hitmeuppp','the other work paid better. and nobody cried.']],b)}});})();
Object.assign(ITEMS,{k22env:'An envelope with a lock of red hair'});
const _side22=sideHub;sideHub=function(late){const o=_side22(late);try{if(S&&k22M()&&!isLone()&&S.phase!=='taken'){o.push({t:'Take a digital art commission',sub:k22Post()?'no faces':'$40–$90, a slot',dis:late||S.done.k22art,fn:()=>{spend();S.done.k22art=1;S.f.k22art=1;const pay=k22Post()?4000:6000;S.yen+=pay;save();drawHud();
   say(k22Post()?[['','A commission request: a couple, holding hands, faces turned toward each other.'],['','You draw the hands. You draw the coats, the rain, the street. You draw them from behind, walking away, and you send it with a note: “faces weren’t working. no charge for the faces.”'],['','They pay anyway. '+money(pay)+'. They say it is the saddest thing they have ever bought. You agree with them.']]
    :[['','A commission request: somebody’s dead cat, in a crown, on a cloud. You charge extra for the crown.'],['','Four hours. You do the eyes last, the way you always did. When you send it the client replies with eleven crying emojis.'],['','+'+money(pay)+'. Rent is rent.']],hub)}})}}catch(e){}return o};

/* ===KC76-BEGIN=== */
/* ===================== THE WAR, MADE PLAIN (kc76) =====================
   A revamp layer on the enemies-to-lovers route (kc73/kc74/kc75). It changes two things.
   1. PROGRESSION. The route is now five named chapters, and the player can always see where they are:
        I · THE OATH (normal)   II · THE DEBT (taken, infirmary, after)   III · THE CASE (act2)
        IV · THE TERMS (act3)   V · A YEAR ON (epilogue)
      - every beat opens on a chapter card (chapter, beat name, n of N) with one plain line on where the oath stands;
      - the side menu has a free entry, ⚔ The war so far, which opens the page: every move made so far in one line each
        (reading the player's own choices), the attempts count, blood drawn, the dead, and what unlocks the next move;
      - the due beat's sub line and the hub line carry the chapter and the count.
   2. DARKNESS. Two new beats put what the oath means on screen, and the page keeps the damage in view.
      - e2l_show (chapter I, after the trailer): the cold room. V takes the card man's fingers, one for each he took,
        and lets Misaki watch on a feed: "Your page says the same word." S.f.e2lShow: Misaki 'watched'|'answered',
        V 'all'|'minute'. It does not use up the day's move.
      - e2l_pair (chapter III, after the stitches): the first one together. They take the man who hired the boy, and
        argue over him, quick against slow. S.f.e2lPair 'quick'|'slow'.
      kc73's foundation dinner and 4am scene were also edited in place (the glass in his hand; what the sheeting is for).
   Everything is derived from existing flags; the only new state is e2lShow, e2lPair and e2lCh (chapter cards seen).
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc76.md. Test: node tools/k76_test.js */
const K76=()=>{try{return typeof E2L==='function'&&E2L()&&typeof K73B!=='undefined'}catch(e){return false}};
const k76M=()=>S.pov!=='v';
const k76H=(m,v)=>k76M()?m:v;
const k76Has=id=>{try{if(id==='e2l_yard')return typeof k75Loose==='function';if(id==='e2l_come')return !k76M();if(id==='e2l_gone')return !k76M()&&typeof k79Gone==='function';if(id==='e2l_morn')return S.f.e2lEnd==='lovers';if(id==='e2l_book')return S.f.e2lEnd==='rivals'&&K73B.some(b=>b.id===id);if(id==='e2l_fork')return S.f.e2lAfter!=='soft'&&K73B.some(b=>b.id===id);
 if(['e2l_mark','e2l_door','e2l_med'].includes(id))return true;return K73B.some(b=>b.id===id)}catch(e){return false}};
const k76Did=id=>{try{const f=S.f;if(id==='e2l_yard')return !!f.e2lLoose;if(id==='e2l_med')return k76M()?!!(f.e2lMM||f.e2lMC):!!f.e2lVM;if(id==='e2l_morn')return !!S.seen.e2l_morn;return k73Done(id)}catch(e){return false}};

/* ===================================== THE CHAPTERS ===================================== */
const K76CH=[
 {n:'I',t:'THE OATH',ph:['normal'],ids:['e2l_mark','e2l_eye','e2l_show','e2l_lift','e2l_kennel','e2l_yard','e2l_sab','e2l_dinner','e2l_truce']},
 {n:'II',t:'THE DEBT',ph:['taken','after'],ids:['e2l_gone','e2l_come','e2l_door','e2l_med','e2l_after','e2l_rifle','e2l_fork']},
 {n:'III',t:'THE CASE',ph:['act2'],ids:['e2l_car','e2l_list','e2l_stitch','e2l_pair','e2l_spar','e2l_know','e2l_test']},
 {n:'IV',t:'THE TERMS',ph:['act3'],ids:['e2l_row','e2l_cant','e2l_guard','e2l_night','e2l_dress','e2l_will','e2l_boat','e2l_book']},
 {n:'V',t:'A YEAR ON',ph:['epilogue'],ids:['e2l_morn','e2l_epi','e2l_page','e2l_last']}];
const K76NAME={e2l_mark:'The card man',e2l_eye:'The trailer, at four',e2l_show:'The cold room',e2l_lift:'The customs-house lift',e2l_kennel:'The kennel, at three',
 e2l_yard:'The warehouse yard',e2l_sab:'The foundation dinner',e2l_dinner:'Angel’s table',e2l_truce:'The bowling alley accords',e2l_come:'The river',e2l_door:'The door',
 e2l_med:'The room marked LAUNDRY',e2l_after:'The kitchen, at noon',e2l_car:'Eight hours in a car',e2l_stitch:'The garage, with a needle',e2l_pair:'The first one together',
 e2l_spar:'The training hall',e2l_boat:'The Constance',e2l_morn:'The morning after',e2l_epi:'The anniversary',e2l_rifle:'The rifle',e2l_fork:'The fork',e2l_list:'The fourth body',e2l_will:'The wills',e2l_book:'The book closes',e2l_page:'The page',e2l_know:'Nine minutes',e2l_test:'The parapet',e2l_row:'The corridor',e2l_guard:'Pier Six',e2l_gone:'The empty trailer',e2l_cant:'What you cannot do',e2l_night:'Three in the morning',e2l_dress:'Two garment bags',e2l_last:'The pillow'};
const k76Ids=c=>c.ids.filter(k76Has);
const k76ChOf=id=>K76CH.find(c=>c.ids.includes(id))||null;
const k76ChNow=()=>K76CH.find(c=>c.ph.includes(S.phase))||K76CH[0];
const k76Count=c=>{const ids=k76Ids(c);return {done:ids.filter(k76Did).length,of:ids.length}};
const k76Tal=()=>{const t=S.f.e2lTally||{};return {m:t.m||0,v:t.v||0}};
/* where the oath stands, in one plain sentence */
function k76Stand(){const f=S.f,m=k76M(),t=k76Tal(),p=S.phase;
 if(f.e2lEnd==='lovers')return m?'He declared it on the Constance and you accepted. His page on you is still in the ledger, and he has stopped trying to total it.':'You declared it on the Constance and they accepted. Their page is still in your ledger. You have stopped trying to total it.';
 if(f.e2lEnd==='rivals')return m?'The oath stands, under truce. Neither of you acts on it unless the other moves first, and both of you watch for it.':'The oath stands, under truce. Neither of you acts on it unless the other moves first. You watch for it daily.';
 if(f.e2lRow&&p!=='epilogue')return m?'You are not going to kill him. You are certain he would still kill you, on the day his book says. You sleep in the trailer with both bolts on, and he sleeps behind a locked door.':'You are not going to kill them. You are certain they would still kill you, on the day somebody pays. Your door is locked, and they are back in the trailer behind two bolts.';
 if(f.e2lKnow&&p!=='epilogue')return m?'You are not going to kill him. You are certain he would still kill you without a second thought; it is in his book in ink. He must not find out the first part.':'You are not going to kill them. You are certain they would still kill you without a second thought, for a price. They must not find out the first part.';
 if(p==='normal')return (m?'He has sworn in his ledger to kill you, slowly, and you have sworn it back. Both of you mean it. ':'You have sworn in your ledger to kill them, and they have sworn it back. Both of you mean it. ')+(t.m+t.v?'Attempts so far: Misaki '+t.m+', V '+t.v+'.':'Nobody has drawn blood yet.');
 if(p==='taken')return m?'Somebody else has you. The man who swore to kill you is the one looking.':'Somebody else has them. Their name is in your ledger, and you are the one looking.';
 if(S.kd&&S.kd.med)return m?'You are in his house and cannot close your left hand. By his law he could finish it tonight.':'They are under your roof and cannot close their left hand. By your own law you could close the account tonight.';
 if(p==='after')return m?'You owe your life to the man who swore to end it. He has not taken the oath back.':'They owe you their life. You have not taken the oath back, and you have not acted on it.';
 if(p==='act2')return m?'Somebody is killing in both your names, so you work together. The oath has not been withdrawn. Neither of you has acted on it since the river.':'Somebody is killing in both your names, so you work together. The oath has not been withdrawn. Neither of you has acted on it since the river.';
 if(p==='act3')return 'The oath is still written down and still unpaid. Before the auction one of you has to say what it is now.';
 return m?'A year on, and the oath was never settled on the Constance.':'A year on, and the oath was never settled on the Constance.'}
/* what unlocks the next move */
function k76Next(){const f=S.f,m=k76M(),p=S.phase;
 if(p==='taken'&&typeof k79GoneOk==='function'&&k79GoneOk())return 'Next move, today: their trailer. The door is open.';
 if(p==='taken')return m?'Nothing moves until you are out of that building.':'Nothing moves until they are out of that building.';
 if(S.kd&&S.kd.med)return m?'While you are in the room marked LAUNDRY, it comes to you in the evenings.':'While they are in the room marked LAUNDRY, it comes to you after noon, twice a day at most.';
 let b=null;try{b=k73Due()}catch(e){}
 let yard=false;try{yard=typeof k75LooseOk==='function'&&k75LooseOk()}catch(e){}
 if(b)return 'Next move, today: '+b.t()+'.'+(yard?' The warehouse yard is also open.':'');
 if(yard)return 'Next move, today: '+(m?'his yard by the river, at two.':'the warehouse yard, at two.');
 const left=c=>k76Ids(c).filter(id=>!k76Did(id)&&id!=='e2l_yard'&&id!=='e2l_morn').length;
 if(p==='normal')return left(K76CH[0])?'The next move is tomorrow. One a day. This chapter closes when the second rent is paid, and moves not made by then are lost.':'Every move of this chapter is made. It closes when the second rent is paid.';
 const fresh=(()=>{try{return k73Fresh()}catch(e){return true}})(),tom='The next move is tomorrow. One a day.';
 if(p==='after')return left(K76CH[1])?(k73Done('e2l_after')?(fresh?'The next move is not ready yet.':tom):(m?'The next move comes a few days after you are out of the infirmary.':'The next move comes a few days after they are out of the infirmary.')):'Nothing more until the case opens.';
 if(p==='act2')return left(K76CH[1])+left(K76CH[2])?'The next move is tomorrow. One a day, while the case runs.':'Every move of the case is made. Nothing more until Pier Nine.';
 if(p==='act3'&&!k73Done('e2l_boat')&&!fresh&&K73B.some(b=>!k73Done(b.id)&&['e2l_know','e2l_test','e2l_row','e2l_guard','e2l_cant','e2l_night','e2l_dress'].includes(b.id)&&k73Done('e2l_car')))return tom;
 if(p==='act3')return !k73Done('e2l_boat')?(k76Did('e2l_will')||!k76Has('e2l_will')?'The next move is at Pier Nine, two nights before the auction.':'The next move comes once the auction is a day nearer.'):(left(K76CH[3])?tom:(f.e2lEnd==='lovers'&&!S.seen.e2l_morn?'The morning after comes on its own.':'It is settled until the anniversary.'));
 return left(K76CH[4])?(fresh?'The anniversary comes on its own.':tom):'That is all of it.'}
const k76Short=()=>{const c=k76ChNow(),n=k76Count(c);return 'The war · '+c.n+' · '+c.t.charAt(0)+c.t.slice(1).toLowerCase()+' · '+n.done+' of '+n.of};

/* ===================================== THE CHAPTER CARD ===================================== */
function k76Card(id,cb){let c=null;try{c=K76()?k76ChOf(id):null}catch(e){}if(!c)return cb();
 const ids=k76Ids(c),pos=Math.max(1,ids.indexOf(id)+1),name=K76NAME[id]||'',f=S.f;f.e2lCh=f.e2lCh||{};const first=!f.e2lCh[c.n];f.e2lCh[c.n]=1;save();
 go({draw(){rect(0,0,W,H,'#060408');txt('THE WAR',160,58,'rgba(236,228,218,.45)',9,'center');txt(c.n+' · '+c.t,160,78,'#ece4da',16,'center');rect(40,84,240,1,'#d0283f');
  txt(name+' · '+pos+' of '+ids.length,160,100,'rgba(236,228,218,.6)',9,'center')}});
 say([['',(first?'Chapter '+c.n+'. ':'')+k76Stand()]],cb)}
(function(){try{if(typeof K73B==='undefined')return;
 /* the two new beats, in kc73's order: eye → show → …  and  stitch → pair → spar */
 const at=id=>K73B.findIndex(b=>b.id===id);
 K73B.splice(at('e2l_eye')+1,0,{id:'e2l_show',t:()=>k76H('A link from K9, at three in the morning','The cold room, at three in the morning'),sub:()=>'costs time · the war · what the word on the page means',
  when:()=>S.phase==='normal'&&k73Done('e2l_eye')&&k73Fresh(),run:k76Show});
 K73B.splice(at('e2l_spar'),0,{id:'e2l_pair',t:()=>'The minicab office behind the station',sub:()=>'costs time · the case · the man who hired the boy',
  when:()=>S.phase==='act2'&&k73Done('e2l_stitch')&&k73Fresh(),run:k76Pair});
 const spar=K73B[at('e2l_spar')],sw=spar.when;spar.when=function(){return k73Done('e2l_pair')&&sw.apply(this,arguments)};
 K73B.forEach(b=>{const r=b.run;b.run=function(){const a=arguments,self=this;return k76Card(b.id,()=>r.apply(self,a))}})}catch(e){}})();
if(typeof k75Loose==='function'){const _l76=k75Loose;k75Loose=function(){return k76Card('e2l_yard',()=>_l76())}}
if(typeof k73Come==='function'){const _c76=k73Come;k73Come=function(cb){return k76Card('e2l_come',()=>{go(cutBg('#03050a'));_c76(cb)})}}
if(typeof k73Door==='function'){const _d76=k73Door;k73Door=function(self,cb){return k76Card('e2l_door',()=>{go(cutBg('#000'));_d76(self,cb)})}}

/* ===================================== I · THE COLD ROOM ===================================== */
const K76V=t=>['K9',t];
const K76MV=(...a)=>['hitmeuppp',MV(...(a.length===1?[a[0],a[0],a[0],a[0]]:a.length===2?[a[0],a[0],a[1],a[1]]:a.length===3?[a[0],a[0],a[1],a[2]]:a))];
function k76Show(){go(cutBg('#0a0c0e'));k73Mark('e2l_show',1);const m=k76M();
 const L=m?[
  ['','Three in the morning. Your phone lights up on the pillow with a link from K9 and nothing else. You open it, because you would open anything he sent you.'],
  ['','It is a camera over a door, in a room under his house: white tile, a drain in the middle of the floor, a steel table. The card man is strapped to the table in his vest. He has been there since the night of the carpet, and somebody has been feeding him.'],
  ['','V comes into frame in a rubber apron with his sleeves rolled, and holds the card man’s left hand up to the lens. It has two fingers on it. The right one has none.'],
  K76V('He took eight fingers from people at my shelters when they were late. I have taken eight of his, one at a time. He has two left because I have not finished. This is what the word slow means when I write it.'),
  K76V('Your page says the same word. I wanted you to have seen it before you decide how hard to fight.'),
  ['','He picks up the shears. The card man starts saying please, and he has said it so many times this week that the P has worn off it.']]:[
  ['','The cold room, three in the morning. The card man took eight fingers from people at your shelters, over four years, when they were late. You have taken eight of his, one at a time, and tonight he has two left.'],
  ['','He stopped offering you money on the second night. He says please now, and has said it so many times that the P has worn off it.'],
  K76V('(Misaki would have shot him off a roof for nine hundred dollars without asking what he had done. He would have died without knowing why.)'),
  ['','There is a camera over the door. Their name is in your ledger under his, with the same word beside it, and they have never seen what the word means.']];
 const end=who=>[K76V('(text) You watched to the end.'),K76MV('(text) ur slow. i’d have been done in a second and had noodles'),K76V('(text) Yes. That is the charge against you.')];
 const shot=[K76MV('(text) this is quick. u won’t hear it. it’s the only nice thing i’ll ever do for u'),K76V('(text) I listened to him until he had nothing left to say. I would listen to you for longer.')];
 say(L,()=>ask(K73Who(),m?'(The shears.)':'(The camera over the door.)',m?[
  {t:'Watch all of it',sub:'you want to know exactly',fn:()=>{S.f.e2lShow='watched';save();say([
   ['','You watch all of it, forty minutes, with the sound on, eating cereal out of the box. He is neat and he never raises his voice. When the card man is finished, V hoses the table down himself and lets the hounds in for what is in the bucket.'],
   K76MV('(one: he means it. two: he’s done this a lot. three: i have to kill him somewhere he can’t get me down those stairs)')].concat(end()),hub)}},
  {t:'Shut it. Send him his own bedroom window, through the scope',sub:'your answer',fn:()=>{S.f.e2lShow='answered';save();say([
   ['','You shut the feed, go up the water tower with the rifle, and take a photograph through the scope of his bedroom window with the crosshair on the pillow. You send it at four.']].concat(shot,[
   ['','You do not sleep. At five the hounds go out along the wall as usual, and he walks behind them and does not look up once.']]),hub)}}]:[
  {t:'Send them the feed, and work',sub:'they should see all of it',fn:()=>{S.f.e2lShow='all';save();say([
   ['','You send the link and hold his left hand up to the lens, and tell them what the word on their page means. Then you pick up the shears. You do the ninth and the tenth without hurrying, hose the table down, and let the hounds in for the bucket.'],
   ['','The feed shows one viewer, from the first minute to the last.']].concat(end()),hub)}},
  {t:'Send them one minute of it',sub:'enough to understand',fn:()=>{S.f.e2lShow='minute';save();say([
   ['','You send the link, hold his left hand up to the lens, and tell them what the word on their page means. Then you cut the feed and finish alone.'],
   ['','At four they send you a photograph taken through a scope: your bedroom window, with the crosshair on the pillow.']].concat(shot),hub)}}]))}

/* ===================================== III · THE FIRST ONE TOGETHER ===================================== */
function k76Pair(){go(cutBg('#0a0808'));k73Mark('e2l_pair');const m=k76M();
 const L=[
  ['',m?'The boy with the box cutter was hired by a man who runs a minicab office behind the station, and that man knows who paid him. You go in at one in the morning, together. Neither of you would let the other go alone, and neither of you has said why.':'The boy with the box cutter was hired by a man who runs a minicab office behind the station, and that man knows who paid him. You go in at one in the morning, together. Neither of you would let the other go alone, and neither of you has said why.'],
  ['',m?'It takes ninety seconds. You put out the yard camera and the dispatcher’s radio with two rounds from the pistol, and V walks in at the front and has the man face down on his own desk with a hound lead round his neck before your second casing has landed.':'It takes ninety seconds. They put out the yard camera and the dispatcher’s radio with two rounds, and you walk in at the front and have the man face down on his own desk with a lead round his neck before their second casing has landed.'],
  ['',m?'You have always worked alone. Tonight he was standing where you needed him half a second before you needed it, twice.':'You have worked alone for eleven years. Tonight the yard light went out half a second before you needed it dark.'],
  K76V('He paid a child forty dollars to open a man’s throat. By my law he goes downstairs, and it takes a week.'),
  K76MV('we need the name tonight. he says it, i put one in his head. done','we need the name tonight. he says it, i put one in his head, we’re done','We need the name tonight. He says it, I put one in his head, and we’re done.','We need the name tonight, V. He says it, I put one in his head, and we go and eat.'),
  ['','The man on the desk has worked out that the two of you are arguing about him. He starts to cry, and offers the name to whichever of you is kinder.']];
 const quick=()=>{S.f.e2lPair='quick';apply({aff:3});save();say([
   ['',m?'He says the name. You shoot him through the ear, once, and V takes his hand off the lead a second before, as though you had counted him in.':'He says the name. They shoot him through the ear, once, and you find you have taken your hand off the lead a second before, as though they had counted you in.'],
   K76V('That was wanton.'),
   K76MV('that was work','that was work. he was done talking','That was work. He was done talking.','That was work, V. He was done talking, and so was I.'),
   ['',m?'In the car he writes the name down. He does not enter the minicab man on your page. You watch him decide.':'In the car you write the name down. The minicab man belongs on their page, under the rest, and you sit with the pen over the line and do not enter him.']],hub)};
 const slow=()=>{S.f.e2lPair='slow';apply({aff:4});save();say([
   ['',m?'You hold the man’s head against the desk with your good hand and your knee while V works on him with the scalpel from his collar. It takes eleven minutes to get a name. You learn that V hums while he does it, and that it is the cello piece from the car.':'They hold the man’s head against the desk with their good hand and a knee while you work on him with the scalpel from your collar. It takes eleven minutes to get a name. They do not look away at any point; you check.'],
   m?K76MV('(i’m not sick. i thought i’d be sick)','(i’m not sick. i thought i’d be sick. huh)','(I’m not sick. I thought I would be.)','(I’m not sick. I thought I would be. I’m holding a man down for him and my hands are steady.)'):K76V('(Their hands are steady. I had expected to despise them less for it, and I do, and I dislike that a great deal.)'),
   K76V('You held him well.'),
   ['',m?'He finishes the man himself, quickly, which you did not expect, and wipes the scalpel on the man’s tie.':'You finish the man yourself, quickly. You tell yourself there was no time for the week. They watch you wipe the scalpel on his tie and say nothing, which is worse.']],hub)};
 say(L,()=>ask(K73Who(),m?'(He is waiting to see what you do.)':'(They have the pistol out already.)',m?[
  {t:'Do it your way: the name, then one round',sub:'quick',fn:quick},{t:'Hold the man’s head and let V work',sub:'slow; you want to see it up close',fn:slow}]:[
  {t:'Let them shoot him once he has said it',sub:'quick',fn:quick},{t:'“Hold his head.”',sub:'slow; you want to see whether they can',fn:slow}]))}

/* ===================================== THE PAGE ===================================== */
/* one line per move made, reading the player's own choices */
function k76Line(id){const f=S.f,m=k76M(),self=!!f.selfEscape;switch(id){
 case 'e2l_mark':return m?'He carried your mark out of the alley in a carpet and told the server you were next. '+(f.e2lOath==='quiet'?'You said nothing, and stripped the rifle under his camera.':'You swore it back in front of everybody.')
  :'MISAKI (hitmeuppp). WANTON. COLLATERAL: SEVERAL. TO BE KILLED.'+(f.e2lOath==='file'?' The charges were sent to them, forty pages.':'');
 case 'e2l_eye':return (m?'He let himself into your trailer at four with plastic sheeting to carry you out in. You woke with a pistol at his head. ':'Entered their trailer at four, with sheeting. They woke. ')+
  (f.e2lEye==='note'?(m?'He left the debt in writing: one eye, and the rest.':'Left the debt in writing: one eye, and the rest.'):(m?'He took the scope off your rifle, on account.':'Took the scope from their rifle, on account.'));
 case 'e2l_show':return m?(f.e2lShow==='answered'?'He sent you the cold room, with the card man on the table. You sent back his bedroom window through a scope.':'He sent you the cold room, with the card man on the table. You watched all forty minutes, and now you know what he means by slow.')
  :(f.e2lShow==='minute'?'Showed them the cold room for one minute. They answered with my bedroom window, through a scope.':'Showed them the cold room, to the end. They watched all of it.');
 case 'e2l_lift':return (m?'Forty minutes in a dead lift, your pistol under his chin and his scalpel at your ribs. ':'Forty minutes without power, their pistol under my chin and my scalpel at their ribs. ')+
  (f.e2lLift==='m'?(m?'You opened his jaw to the bone.':'They opened my jaw to the bone.'):f.e2lLift==='v'?(m?'He took the pistol out of your hand.':'I took the pistol from their hand.'):(m?'Neither of you moved until the power came back.':'Nothing was done by either of us.'));
 case 'e2l_kennel':return m?('You went over his wall at three with the rifle on his hounds, to bring him down to you. '+(f.e2lKennel==='fed'?'You fed the old hound through the bars.':'You kept the rifle on them until he knelt in the straw in front of it.'))
  :('They came over the wall at three with a rifle on the hounds. '+(f.e2lKennel==='set'?'I set the hounds on them. The hounds stopped short of the gate.':'I told the hounds to stay.'));
 case 'e2l_yard':return m?('He set all four hounds on you in the yard behind the warehouse, and he meant it. They had you on the concrete. '+(f.e2lLoose==='hand'?'You held out an empty hand and they sat.':'You said his word in his voice and they sat.'))
  :('Set the hounds on them in the warehouse yard. The hounds brought them down, and then refused me. '+(f.e2lLoose==='called'?'I called them in.':'I said the word twice.'));
 case 'e2l_sab':return f.e2lSab==='m'?(m?'At his foundation dinner he put his own head in your scope. You put the round past his ear and through your mark, in front of a hundred and forty people.':'Put my head in their scope at the dinner. They killed their mark past my ear, in front of a hundred and forty people.')
  :(m?'At his foundation dinner he put his own head in your scope. You shot the glass out of his hand. Nine stitches.':'Stood in the window at the dinner, in their scope. They shot the glass out of my hand. Nine stitches. The mark went to Hale alive.');
 case 'e2l_dinner':return m?(f.e2lDinner==='glass'?'At Angel’s table you tipped the fold into his glass. Ronin drank it, and spent an hour on the bathroom floor.':'At Angel’s table you had the fold and his glass within reach, and you left the glass alone.')
  :(f.e2lDinner==='fern'?'Their hand passed over my glass at Angel’s table. I poured it into the fern.':'Their hand passed over my glass at Angel’s table. I drank it, looking at them.');
 case 'e2l_truce':return (m?'Angel made you both sign seven days without killing each other. ':'Signed Angel’s accords: seven days. ')+(f.e2lTruce==='v'?(m?'He broke it on Wednesday with a camera in your smoke alarm.':'I broke them on Wednesday, with a camera in their smoke alarm.'):(m?'You broke it on Tuesday, on his mark.':'They broke them on Tuesday, on my mark.'));
 case 'e2l_come':return 'Went into the building on the river for a name I had sworn to put down. '+(f.e2lPride==='true'?'Told Ronin nothing.':'Told Ronin they were mine to kill, and nobody else’s.');
 case 'e2l_door':return m?(self?'You got out on your own, and of every door in the city you walked to his.':'He came into that building and carried you out. You owe your life to the man who swore to end it.')
  :(self?'They got out alone and came to my door.':'Carried them out. Drove home at the speed limit.');
 case 'e2l_med':return m?(f.e2lMC?'For three days you were sure the tall one with the tray was the man who had kept you, and that he was V. He was V. He was never the other one.':'The tall one brings the tray, and you thank him. You have worked out who he is, and what he swore.')
  :(f.e2lLedger==='torn'?'Could not write the total. Tore the page out. It is inside my jacket.':f.e2lLedger==='kept'?'Dated the page. Could not write the total.':'They are downstairs in the room marked LAUNDRY. They thank me the way people thank whoever holds the keys.');
 case 'e2l_after':return f.e2lAfter==='soft'?(m?'You told him to be mean to you. He was kind, and that told you how bad it had been.':'They asked me to be cruel. I could not.')
  :(m?'You told him to be mean to you. He said he will kill you when you can hold a fork in both hands, and not before.':'They asked me to be cruel. I told them the oath waits until they can hold a fork in both hands.');
 case 'e2l_car':return f.e2lCar==='watch'?(m?'You slept two of the eight hours under his coat, with him awake beside you.':'They slept two of the eight hours under my coat. I did not move.')
  :(m?'You bet him dinner, in writing on a parking ticket, that you would see the Mimic first.':'A wager with them, in writing on a parking ticket, on who would see him first.');
 case 'e2l_stitch':return (m?'A box cutter opened his forearm. You sewed it shut with your right hand and your teeth':'A box cutter, left forearm. They stitched it, right-handed, with their teeth')+(f.e2lScar==='crooked'?(m?', and signed it with a hook.':'. The last three stitches make a hook, like an M.'):(m?', eleven stitches, straight.':'. Eleven, straight.'));
 case 'e2l_pair':return f.e2lPair==='slow'?(m?'You held a man down on his own desk while V took a name out of him with a scalpel. Your hands were steady.':'They held a man down while I took a name out of him. Their hands were steady.')
  :(m?'The two of you took the man who hired the boy. He said the name and you shot him through the ear. V did not enter him on your page.':'We took the man who hired the boy. They shot him once he had said the name. Not entered on their page.');
 case 'e2l_spar':return f.e2lSpar==='kiss'?(m?'First to three on the mat. You had the blade under his chin, and you kissed him.':'Three to one, theirs. They kissed me with the blade under my chin.')
  :(m?'First to three on the mat. You had the blade under his chin. He tapped out, and you walked.':'Three to one, theirs. I tapped the mat.');
 case 'e2l_boat':return f.e2lEnd==='lovers'?(m?'Under the tarp on the Constance he declared war on you for the rest of his life. You accepted, and won.':'Declared it, under the tarp on the Constance. Accepted.')
  :(m?'Under the tarp on the Constance you shook on it, with your other hand on your pistol. The war stands.':'Shook on it under the tarp, armed. The oath stands. I will not act on it unless they do.');
 case 'e2l_rifle':return f.e2lRifle==='aimed'?(m?'He gave the rifle back clean, with one round. You put it on his chest. Your left hand could not hold it still, and he said he would stand there again in a month.':'Returned their rifle, cleaned, with one round. Stood in front of it. Their left hand could not hold it still.')
  :(m?'He gave the rifle back clean, with one round. You put the round in your pocket.':'Returned their rifle, cleaned, with one round. They kept the round.');
 case 'e2l_fork':return f.e2lFork==='potato'?(m?'You held a fork in both hands at dinner, and took the last potato off his plate with it. He did not come round the table.':'They held a fork in both hands at dinner, and took a potato off my plate with it. I did not go round the table.')
  :(m?'You held a fork in both hands at dinner and waited for him to say when. He could not name a date.':'They held a fork in both hands at dinner. I could not fix a date.');
 case 'e2l_list':return f.e2lList==='cut'?(m?'The Mimic’s fourth: your shot, and V’s cutting done badly. Somebody has described his work to the man.':'The fourth body: their shot, and my cutting, across the grain. Somebody has described my work to him.')
  :(m?'The Mimic’s fourth: your shot, and V’s cutting done badly. He has watched you work. V did not like that.':'The fourth body: their shot, copied well. He has watched them work for longer than I have.');
 case 'e2l_will':return m?(f.e2lWill==='nothing'?'You left him nothing. He left you your own page.':'You left him the bullet you were saving. He left you the hounds.')
  :(f.e2lWill==='page'?'Will amended: their page is to go to them, unread. They left me nothing.':'Will amended: they are to have the hounds. They left me a bullet.');
 case 'e2l_book':return 'Ronin closed the book and gave the pot to the old priest. Nobody won.';
 case 'e2l_page':return f.e2lPage==='burned'?(m?'He gave you the page with a date where the total goes. You burned it in his sink.':'Gave them the page, dated where the total goes. Burned, in the sink.')
  :f.e2lPage==='kept'?(m?'He gave you the page with a date where the total goes. It is in the go-bag.':'Gave them the page, dated where the total goes. They kept it.')
  :f.e2lPage==='wrote'?(m?'This year’s line on your page said NOTHING. You wrote STILL COULD under it.':'This year’s line: NOTHING. They wrote under it, in their hand: STILL COULD.')
  :(m?'This year’s line on your page said NOTHING. You handed it back.':'This year’s line: NOTHING. The ledger was closed.');
 case 'e2l_know':return m?'You had his back in your scope for nine minutes and spent them keeping him alive. '+(f.e2lKnow==='watch'?'The pistol went back under your pillow that night.':'You were as horrible to him as ever, so that he would not know.')
  :'Stood nine minutes with my back to their rifle, and felt covered. '+(f.e2lKnow==='watch'?'Locked my bedroom door that night.':'Changed nothing that they could notice.');
 case 'e2l_test':return m?'You sat on a parapet with your back to him to find out. He pulled you off it. '+(f.e2lTest==='laughed'?'You laughed at him, so as not to ask.':'You came up with the pistol out, and he sounded relieved.')
  :'They sat on a parapet with their back to me, as a test. I pulled them off it. '+(f.e2lTest==='laughed'?'They saw that I was frightened.':'They drew on me. It was simpler.');
 case 'e2l_row':return f.e2lRow==='said'?(m?'Two in the morning, both armed. You told him you would not. He said it was what he would say. He will not cross the name out, and you will not hand over the rifle.':'Two in the morning, both armed. I told them I would not. They said it was what they would say. They will not give up the rifle, and I do not cross things out.')
  :(m?'Two in the morning, both armed. You let him think you would, and he nodded. You went back to the trailer.':'Two in the morning, both armed. I let them think I would. They went back to the trailer.');
 case 'e2l_guard':return m?'Pier Six. You were watching him and not the gantry, and a watchman put a boat hook through his shoulder. Your shot was a second late.':'Pier Six. I was watching the crane and not the gantry. A boat hook, left shoulder. Their shot was a second late.';
 case 'e2l_gone':return 'Their trailer, empty. Watered the cactus. Wrote: TAKEN BY OTHERS.'+(f.e2lGone==='recover'?' TO BE RECOVERED. AND THEN KILLED.':' Took the cactus home.');
 case 'e2l_cant':return m?(f.e2lCant==='angel'?'You typed “i wouldn’t” to him eleven times, and sent it to Angel.':'You typed “i wouldn’t” to him eleven times, and deleted it eleven times.')
  :(f.e2lCant==='pencil'?'Held the pen over their name and could not strike it. Wrote beside it, in pencil: NOT BY ME.':'Held the pen over their name and could not strike it. Capped the pen.');
 case 'e2l_night':return f.e2lNight==='opened'?(m?'You woke in the other building and your hand rang him. He stood four steps back in the rain. You opened the door, and he opened your fingers.':'They rang at three and could not speak. Stood four steps back from their door. They opened it. Opened the left hand, one finger at a time.')
  :(m?'You woke in the other building and your hand rang him. He sat on the step in the rain until it was light, and told the door what day it was.':'They rang at three and could not speak. Sat on their step until five. Did not ask for the door.');
 case 'e2l_dress':return f.e2lDress==='said'?(m?'Angel showed you the two black garment bags. You told Angel the money was wasted. You could not say it to him.':'Angel has a black dress for each of us. I told Angel that the money was wasted. I could not say it to them.')
  :(m?'Angel showed you the two black garment bags. Neither of you would tell Angel the money was wasted.':'Angel has a black dress for each of us. Neither of us told Angel that the money was wasted.');
 case 'e2l_last':return f.e2lPillow==='down'||f.e2lPillow==='held'?(m?'You woke in his bed with the pistol at his temple. He said “It happens”, and did not reach for it.':'Woke with their pistol at my temple. Did not reach for it. I will not.')
  :(m?'The anniversary. You typed “come up here” and deleted it. '+(f.e2lPillow==='nothing'?'No bullet this year. “Are you alive.” “yes.”':'You stood the bullet on his pillow as always.'):'The anniversary. Typed “Come down.” Did not send it. '+(f.e2lPillow==='nothing'?'No bullet. They are alive.':'A bullet on the pillow. Slept.'));
 case 'e2l_morn':return m?'The morning after. Angel opened the envelope.':'The morning after. Angel opened her envelope.';
 case 'e2l_epi':return f.e2lEnd==='lovers'?'A year on. You still race for the same marks, and the loser cooks.':'A year on. Nobody is dead. Both of you still could.'}
 return ''}
/* what the war has cost in bodies, his and theirs and other people's */
function k76Blood(){const f=S.f,L=[],d=id=>k76Did(id);
 if(f.e2lLift==='m')L.push('V: jaw, opened to the bone, in the lift.');
 if(d('e2l_sab')&&f.e2lSab!=='m')L.push('V: one hand, nine stitches, at the dinner.');
 if(f.e2lLoose)L.push('Misaki: brought down on concrete by four hounds, in the yard.');
 if(f.e2lDinner==='glass')L.push('Ronin: poisoned at Angel’s table, with what was meant for V.');
 if(d('e2l_door'))L.push('Misaki: the left hand and the ribs, in the building on the river. Neither of them did that.');
 if(d('e2l_stitch'))L.push('V: left forearm, a box cutter.');
 if(d('e2l_guard'))L.push('V: left shoulder, a boat hook, while each of them was watching the other.');
 return L}
function k76Dead(){const f=S.f,L=[],d=id=>k76Did(id),n=k=>{try{return (f.e2l74||{})[k]||0}catch(e){return 0}};
 if(d('e2l_show'))L.push('The card man, in the cold room, one finger at a time.');else if(d('e2l_mark'))L.push('The card man, who went under V’s house in a carpet and is still alive there.');
 if(d('e2l_eye'))L.push('The shelter landlord, shot off his own steps by Misaki to make a point to V.');
 if(n('intercept')>=1)L.push('The vet on the ring road, in his own car park, because he was on V’s list.');
 if(n('intercept')>=2)L.push('A councilman’s nephew, through his own windscreen at a red light.');
 if(d('e2l_sab')&&f.e2lSab==='m')L.push('The man from the hospital fund, shot dead at dinner a thumb’s width from V’s ear.');
 if(f.e2lTruce==='m')L.push('The man with the dogfight in the car wash, on the third day of the truce.');
 if(d('e2l_guard'))L.push('A watchman on Pier Six, shot a second late.');
 if(d('e2l_pair'))L.push(f.e2lPair==='slow'?'The man who hired the boy, on his own desk, with a scalpel.':'The man who hired the boy, through the ear, once he had said the name.');
 return L}
function k76Page(back){const f=S.f,m=k76M(),now=k76ChNow(),t=k76Tal(),esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
 const cur=K76CH.indexOf(now);let h='<h2>The war</h2><p>'+esc(m?'You do not keep a ledger. You keep it in your head, in order.':f.e2lLedger==='torn'?'Their page, in your hand. It is not in the ledger any more; it is inside your jacket.':'Their page in your ledger, in your hand.')+'</p>';
 h+='<p><b style="color:var(--teal)">Where it stands:</b> '+esc(k76Stand())+'</p><p><b style="color:var(--teal)">Next:</b> '+esc(k76Next())+'</p>';
 K76CH.forEach((c,i)=>{const ids=k76Ids(c),n=k76Count(c);if(!ids.length)return;
  if(i>cur){h+='<p style="opacity:.45"><b>'+c.n+' · '+c.t+'</b> · not yet</p>';return}
  h+='<p style="margin-top:8px"><b style="color:var(--blood)">'+c.n+' · '+c.t+'</b> · '+n.done+' of '+n.of+(i<cur?' · closed':'')+'</p>';
  ids.forEach(id=>{if(k76Did(id))h+='<p style="margin-left:1.2em">† <b>'+esc(K76NAME[id])+'.</b> '+esc(k76Line(id))+'</p>';
   else if(i<cur&&id!=='e2l_morn')h+='<p style="margin-left:1.2em;opacity:.45">– '+esc(K76NAME[id])+'. It never happened.</p>'});
  if(i===cur){const left=n.of-n.done;if(left>0)h+='<p style="margin-left:1.2em;opacity:.6">'+left+' more to come in this chapter.</p>'}});
 const B=k76Blood(),D=k76Dead();
 h+='<p style="margin-top:8px"><b style="color:var(--teal)">Attempts on each other:</b> Misaki '+t.m+' · V '+t.v+'</p>';
 const sl=f.e2lSlept||{};if((sl.m||0)+(sl.v||0))h+='<p><b style="color:var(--teal)">Nights slept beside the other, armed:</b> Misaki '+(sl.m||0)+' · V '+(sl.v||0)+'</p>';
 if(B.length)h+='<p><b style="color:var(--teal)">Blood drawn:</b> '+B.map(esc).join(' ')+'</p>';
 if(D.length)h+='<p><b style="color:var(--teal)">Dead of it so far ('+D.length+'):</b> '+D.map(esc).join(' ')+'</p>';
 if(!m&&!f.e2lEnd)h+='<p><b style="color:var(--teal)">Total:</b> '+(f.e2lLedger?'none. You could not write one.':'not yet written.')+'</p>';
 panel(h,[{t:'Close',fn:back||hub}]);const el=document.querySelector('.panel');if(el){el.scrollTop=0;setTimeout(()=>{try{el.scrollTop=0}catch(e){}},0)}}

/* ===================================== DELIVERY ===================================== */
const _sh76=sideHub;sideHub=function(late){let o=_sh76(late);try{if(!S||!K76()||!k73Done('e2l_mark'))return o;
 let b=null;try{b=k73Due()}catch(e){}
 if(b){const c=k76ChOf(b.id),ids=c?k76Ids(c):[],lab='⚔ '+b.t();o=o.map(x=>x&&x.t===lab?Object.assign({},x,{sub:'costs time · the war · '+c.n+' · '+(ids.indexOf(b.id)+1)+' of '+ids.length}):x)}
 const c=k76ChNow(),n=k76Count(c);
 o.push({t:'⚔ The war so far',sub:'free · '+c.n+' · '+c.t.toLowerCase()+' · '+n.done+' of '+n.of+' · '+k76Next(),fn:()=>k76Page()})}catch(e){}return o};
/* the pause menu: the page is one press away from anywhere outside a conversation */
if(typeof pauseMenu==='function'){const _pm76=pauseMenu;pauseMenu=function(){_pm76.apply(this,arguments);try{const box=document.querySelector('.pausebox .pbtns');if(!box||!S||!K76()||!k73Done('e2l_mark')||dlg)return;
 const b=document.createElement('button');b.textContent='⚔ The war so far';b.title=k76Short();
 b.onclick=e=>{e.stopPropagation();closePause();const room=scene&&scene.isRoom&&S.room;k76Page(room?()=>toRoom(S.room,S.roomPos):hub)};const sv=[...box.querySelectorAll('button')].find(x=>/Saves/.test(x.textContent));box.insertBefore(b,sv||box.lastElementChild)}catch(e){}}}
if(typeof hubLine0==='function'){const _hl76=hubLine0;hubLine0=function(){const s=_hl76.apply(this,arguments);try{if(S&&K76()&&k73Done('e2l_mark'))return s+' ⚔ '+k76Short()+'.'}catch(e){}return s}}

/* ===================================== ENDINGS ===================================== */
const _xe76=extraEnding;extraEnding=function(){const L=_xe76();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f;
 if(f.e2lShow==='watched'||f.e2lShow==='all')L.push('Misaki watched the card man die on a feed from under V’s house, to the end, eating cereal. They have known since then exactly what he meant by the word on their page.');
 else if(f.e2lShow)L.push('V once showed Misaki the cold room. Misaki answered with a photograph of his pillow through a scope. He keeps it in the ledger.');
 if(f.e2lPair==='quick')L.push('The first man they killed together died quickly, Misaki’s way. V never entered him in the ledger.');
 else if(f.e2lPair==='slow')L.push('Misaki once held a man down on his own desk for V, and their hands were steady. Neither of them has brought it up since.')}catch(e){}return L};
/* ===KC76-END=== */

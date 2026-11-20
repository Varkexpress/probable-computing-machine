/* ===================== THE SEVENTH STEP (kc58): V and Misaki, the whole way through =====================
   One through-line for the two of them, both POVs, built on two things they make together before the kidnapping
   and what the kidnapping does to each:
   - The seventh step of V's back stair. She designed it to creak. Either V is the one person who steps on it
     (S.f.k58Stair='his') or she learns his step instead ('over'). In the infirmary she did not know him: he was the
     tall one. Afterwards the step means nothing, and he starts saying her name at corners (kd_shards canon) or waits
     in the light to be seen (S.f.k58Name='name'|'look').
   - V's notebook of her quotes, the only paper anyone keeps on her. After, she says nothing worth writing down.
   Rebuild in act2/act3 (the cup, the notebook, the stair test), and an epilogue that lands on one of three places
   (S.f.k58End: mended / kept / apart) from what the player chose. See docs/notes_pair.md.
   Rules: never name what happened in the hours; no new characters; hounds unnamed; V never contracts. */
const k58M=()=>S.pov!=='v';
const k58Ok=()=>{try{return !!S&&!isLone()&&!jpAway()&&!(S.kd&&S.kd.med)&&S.phase!=='taken'}catch(e){return false}};
const k58Post=()=>{try{return !!(S&&S.kd&&S.kd.t0&&!S.kd.med&&['after','act2','act3','epilogue'].includes(S.phase)&&!isLone())}catch(e){return false}};
const k58MP=()=>S.rom||(S.f.k28pair&&S.f.k28pair.lead==='m'?S.f.k28pair.with:null)||null;   /* Misaki's partner, if any */
const k58VP=()=>S.vrom||(S.f.k28pair&&S.f.k28pair.lead==='v'?S.f.k28pair.with:null)||null;   /* V's partner, if any */
const k58Set=()=>!S.f.married&&!k58MP()&&!k58VP();
const k58St=()=>S.f.k58Stair||'none';
/* how much of the trust has been rebuilt; read by the stair test and the epilogue */
function k58Score(){const f=S.f;let s=0;
 if(f.k58Stair)s+=1;if(f.k58Book==='read'||f.k58Book==='wrote')s+=1;if(f.k58First)s+=1;
 if(f.k58Name==='look')s+=1;if(f.k58Rule==='kept')s+=1;else if(f.k58Rule==='dropped')s-=1;
 if(f.k58Cup)s+=2;if(f.k58CupKeep)s+=1;if(f.k58Read==='wrote')s+=2;else if(f.k58Read==='read')s+=1;
 s+=Math.min(3,f.k58Sit||0);if(f.k58Asked)s+=1;if(f.kdDelivered)s+=1;if(tier()>=3)s+=1;
 const sev=S.kd&&S.kd.sev0||0;if(sev>=6)s-=2;else if(sev>=4)s-=1;return s}
const k58Knows=()=>k58Score()>=5;

/* ---------- before: one beat every other morning, in order ---------- */
const K58N=[];
function k58N(id,when,run){const e={id,k58:1,when:()=>{try{return S.phase==='normal'&&k58Ok()&&!S.dark&&!S.f[id]&&when()}catch(x){return false}},run:done=>{S.f[id]=1;S.seen[id]=1;save();run(done)}};K58N.push(e);EVENTS.push(e)}
const _me58=morningEvent;morningEvent=function(done){try{if(S&&mbOk()&&S.phase==='normal'&&S.f.k58Day!==S.day&&S.day-(S.f.k58Last||-9)>=2){const e=K58N.find(e=>e.when());if(e){mbUse();S.f.k58Day=S.day;S.f.k58Last=S.day;return e.run(()=>_me58(done))}}}catch(x){}return _me58(done)};

k58N('k58_stair',()=>S.day>=2&&(S.f.movedIn||tier()>=1),done=>{const m=k58M();
 const L=[
  ['',m?'V’s back stair, the narrow one up from the kitchen to the bedrooms, has fourteen steps. The seventh one creaks. You made it creak.':'The back stair, the narrow one up from the kitchen to the bedrooms, has fourteen steps. The seventh creaks. Misaki made it creak.'],
  ['',m?'When he showed you the plans you went through his security in red pen, and on the stair you wrote “7th tread, loose on purpose, DO NOT FIX.” A house this quiet needs one noise in it that you’re expecting.':'When he showed them the plans they went through his security in red pen, and beside the stair they wrote: “7th tread, loose on purpose, DO NOT FIX.” He did not fix it.'],
  ['','Everybody who belongs in the house learns to step over it. Angel learned on her first visit, in heels, without being told. Ronin learned on his second, after '+(m?'you':'Misaki')+' came round the landing with a pistol and he said “fuck’s sake” and went back down and came up again properly.'],
  ['K9','I have stepped over it every night for a month. I assumed that was what you wanted.'],
  ['hitmeuppp',MV('it was. i’m changing it.','it was. i wanna change it. just for u.','It was. I want to change the rule. Just for you.','It was. I want to change it. Just for you. I want you to be the only person in this house who steps on it.')],
  ['K9','Then the step would mean me.'],
  ['hitmeuppp',MV('ya. that’s the idea.','yeah. then i’d know.','Yeah. Then I’d know it was you.','Yeah. Then if it goes at three in the morning I’d know it was you before I opened my eyes. I’ve never once known who was on the stairs. Not anywhere. Not in my whole life.')]];
 const tail=()=>{const p=k58MP(),vp=k58VP();const T=[];
  if(p)T.push(['',p==='r'?'Ronin wants to know why V gets the step and he doesn’t. “Because he’s up at three with water and you snore,” '+(m?'you tell him':'Misaki tells him')+'. Ronin says that’s fair, and steals '+(m?'your':'their')+' pillow.':'Angel says she doesn’t mind not getting the step. “i’d rather be the one u don’t hear coming,” she says, and kisses '+(m?'your':'Misaki’s')+' ear, and goes back to her phone.']);
  else if(vp)T.push(['',vp==='r'?'Ronin, who sleeps in V’s bed three nights a week, is not given the step. He says he is not offended and takes the whole duvet to prove it.':'Angel, who has a key and a side of V’s bed now, is not given the step. She says she will cope. She walks up it in heels at four in the morning and never once touches the seventh tread.']);
  return T};
 say(L,()=>ask(m?'hitmeuppp':'K9',m?'(Do you want him to step on it?)':'(They want the step to mean him.)',m?[
  {t:'“step on it. every time.”',fn:()=>{S.f.k58Stair='his';apply({aff:3,trust:3});note('k58_stair','The seventh step on V’s back stair creaks on purpose. He is the only one who steps on it.');save();say([['K9','Every time.'],
   ['','That night he comes up at two, and the seventh step goes, and you think “V,” and you’re asleep again before he gets to the top. You have never done that in your life. You lie there in the morning trying to work out how you did it.']].concat(tail()),done)}},
  {t:'“no. step over it. i’ll learn your step instead.”',fn:()=>{S.f.k58Stair='over';apply({aff:3,trust:4});note('k58_stair','Everybody steps over the seventh step on V’s back stair. Misaki learned V by the eighth.');save();say([['K9','That is harder.'],
   ['hitmeuppp',MV('i like hard.','harder’s better. u can fake a step.','Harder is better. Anyone can step on a plank.','Harder is better. Anybody can step on a plank. Nobody can fake how somebody walks.')],
   ['','It takes you nine nights. On the ninth, half asleep, you hear somebody step over the seventh tread, and you know from the weight on the eighth that it’s him, and you’re so pleased with yourself that you wake up properly to be pleased about it.']].concat(tail()),done)}}]:[
  {t:'Step on it. Every time.',fn:()=>{S.f.k58Stair='his';apply({aff:3,trust:3});note('k58_stair','The seventh step on the back stair creaks on purpose. You are the only one who steps on it.');save();say([['K9','Every time.'],
   ['','He comes up at two that night and puts his weight on the seventh step on purpose, and hears their breathing change through the door, and then go back to sleep. They have told him they have never once known who was on the stairs. He stands on the landing for some time.']].concat(tail()),done)}},
  {t:'“I would rather you knew my step.”',fn:()=>{S.f.k58Stair='over';apply({aff:3,trust:4});note('k58_stair','Everybody steps over the seventh step on the back stair. Misaki learned you by the eighth.');save();say([['K9','A tread can be counterfeited. A gait cannot. I would rather you knew me than the stair.'],
   ['hitmeuppp',MV('that’ll take ages.','ugh. that’ll take ages. fine.','That will take ages. ...Fine.','That’ll take me ages. ...Okay. Yes. I’d rather know you than a plank.')],
   ['','It takes their nine nights. On the tenth morning they tell him over cereal, without looking up, that he puts more weight on his left foot on the eighth step and stop on the landing for one second to listen. He did not know that he did that.']].concat(tail()),done)}}]))});

k58N('k58_book',()=>S.day>=4&&S.f.k58_stair&&tier()>=1,done=>{const m=k58M();
 const Q=[['K9','“If I die, put me in the freezer marked NOT SNACKS. Ronin owes me the space.”'],['K9','“The grey one looked at me like I was a person. Rude, honestly.”'],['K9','“I don’t do quiet. I do loud with breaks.”']];
 say(m?[
  ['','V’s leather notebook is on the arm of the couch, open, and he’s downstairs with the hounds. You’ve seen him write in it at dinner, quick, under the table, the way you’d palm a card.'],
  ['','It’s you. Page after page, dated, in fountain pen. Things you said. The moon looking like a toenail. NOT SNACKS. The first one is from the night you met on the server; he copied it out of the chat log by hand.'],
  ['','Nothing anywhere has your name on it before you were nine. Since nine there’s an enrolment form, a pawn ticket for a trophy and a lot of debts. This notebook is thicker than all of it put together.'],
  ['hitmeuppp',MV('(oh. oh no.)','(oh my god. he’s been writing me DOWN.)','(He’s been writing me down. All of it. Even the stupid stuff.)','(He’s been writing me down. On purpose. Every dumb thing I said.)')],
  ['',S.f.k58Stair==='his'?'The seventh step goes. He’s in the doorway.':'Somebody steps over the seventh tread and leans on the eighth. He’s in the doorway.'],
  ['K9','You found it.']]:[
  ['','He keeps them in a leather notebook, dated, in fountain pen. He left it on the arm of the couch when the black hound needed letting out. When he comes back up they have it open on their knees.'],
  ['','He does not know how to explain it without the thing about paper. Nothing exists with their name on it before they were nine, and very little after. He has been making some.'],
  ['hitmeuppp',MV('V. what is this.','V. what is this. is this ME?','Is this me? All of this is me?','This is me. You’ve been writing me down since the server. Since the toenail moon. V, what is this?')]],
 ()=>ask(m?'hitmeuppp':'K9',m?'(He’s waiting.)':'(They are waiting.)',m?[
  {t:'“read me some. out loud.”',fn:()=>{S.f.k58Book='read';apply({aff:4});save();say([['','He sits on the other end of the couch and reads them in his flat voice, the way he reads tax law.'],...Q,
    ['','You laugh at the freezer one. You laugh at all of them. They’re funny. The kid who said them is funny, and loud, and they had no idea anybody was listening.'],
    ['K9','I am always listening. I thought somebody ought to keep a record of you that was not a debt.']],done)}},
  {t:'“keep going. don’t ever show me again.”',fn:()=>{S.f.k58Book='keep';apply({aff:3});save();say([['hitmeuppp',MV('keep going. hide it.','keep going. don’t show me. i’ll start doing it on purpose.','Keep going. Don’t show me again. I’d start saying things on purpose.','Keep going. Hide it. If I know what I sound like I’ll start performing, and then it’s not me in there, it’s a bit.')],
    ['K9','Then I will put it where you will not find it.'],['','You find it the next week, in the same place on the same couch. You don’t open it. That night he writes down that you didn’t.']],done)}},
  {t:'Take his pen and write one line yourself.',fn:()=>{S.f.k58Book='wrote';apply({aff:4,trust:3});save();say([['','You take the pen off his jacket. On the next clean page, in capitals, you write the date and “I WAS HERE.”'],
    ['','He doesn’t say anything. He takes the pen back and writes the time beside it in his small hand, like a witness.'],
    ['hitmeuppp',MV('there. evidence.','there. proof of life.','There. Proof of life.','There. That’s the first thing I’ve ever written about myself that somebody’s going to keep. Don’t lose it.')],
    ['K9','I do not lose things.']],done)}}]:[
  {t:'Tell them what it is for.',fn:()=>{S.f.k58Book='read';apply({aff:4});save();say([['K9','You have no paper before you were nine and very little since. I thought somebody ought to keep a record of you that was not a debt or a contract.'],
    ['hitmeuppp',MV('...read me one.','...read me one. a good one.','Read me some. Out loud.','...Read me some. Out loud. I want to hear what I sound like from the outside.')],
    ['','He reads them in his flat voice, the way he reads tax law.'],...Q,['','They laugh at every one. They do not seem to know that they are laughing at themself, and he does not tell them.']],done)}},
  {t:'Hold out your hand for it.',fn:()=>{S.f.k58Book='keep';apply({aff:2});save();say([['hitmeuppp',MV('...here. keep going.','here. keep going. just don’t show me.','Here. Keep going. Just don’t show me.','Here. Keep going. Don’t show me again, I’d start saying things on purpose.')],
    ['','They give it back without reading further. A week later he watches them walk past the couch, see it there, and not touch it. That night he writes down that they did not touch it.']],done)}}]))});

k58N('k58_first',()=>S.day>=6&&S.f.k58_stair&&tier()>=2,done=>{const m=k58M();
 say(m?[
  ['','You have a rule you’ve never said out loud: you’re the last one awake. Every place you’ve slept, the trailer, the truck cab, the places before that, you lie still until everyone in earshot is breathing slow, and then you count the exits, and then you sleep.'],
  ['','Last night, on V’s couch, with the old hound across your shins and V reading in the armchair, you fell asleep first. In the middle of a sentence. Your own sentence.'],
  ['hitmeuppp',MV('(that’s never happened.)','(i fell asleep FIRST. that’s never happened.)','(I fell asleep first. That has never once happened.)','(I fell asleep first. Before him, before the hounds, mid-sentence. I didn’t count anything. I don’t know what that makes me. Safe, maybe. Gross.)')],
  ['',S.f.k58Book==='read'||S.f.k58Book==='wrote'?'When you come down he’s at the island with coffee and the notebook. He doesn’t look up. He turns the notebook round on the counter so you can read the line he’s just written: the date, and “They fell asleep first.”':'When you come down he doesn’t mention it. He hands you a coffee with the handle turned the right way for your hand, and smiles at the newspaper like it said something.']]:[
  ['','They fall asleep first. They are in the middle of telling him about a man who owed them money and a ferret, and they stop, and they are asleep.'],
  ['','He knows what that is. He has watched them in every room for months. They are always the last one awake: they wait until everyone in earshot breathes slowly, and then they count the doors.'],
  ['K9','(They did not count the doors.)']],()=>{S.f.k58First=1;apply({aff:3});save();if(m)return done();
  ask('K9','(The notebook is in his jacket.)',[
   {t:'Write it down.',fn:()=>say([['','He writes the date and “They fell asleep first,” and does not turn the page for a long time.']],done)},
   {t:'Do not move.',fn:()=>say([['','He does not turn a page, in case the paper wakes them. He sits in the armchair for two hours with a dead leg and the old hound’s chin on his shoe, until they wake up on their own and call him a creep.']],done)}])})});

/* ---------- before: the texts ---------- */
txDef('tx_k58_late',{with:'v',pov:'m',prio:2,when:()=>S.phase==='normal'&&!!S.f.k58_stair&&tier()>=1,nodes:{
 start:{in:()=>['It has been fifty-one minutes.','You said forty.'],expire:2,onExpire:()=>{S.f.k58Late='missed';relApply({tension:3})},
  opts:()=>[{t:'“sorry. traffic. alive.”',fx:()=>{S.f.k58Late='told';apply({aff:1})},reply:()=>['Noted.','I will put the kettle on for fifty-five.']},
   {t:'“u were COUNTING??”',fx:()=>{S.f.k58Late='told';apply({aff:2})},reply:()=>['I am always counting. It is the only thing I can do from here.']},
   {t:'“out. home in 20. step on the stair”',ok:()=>S.f.k58Stair==='his',fx:()=>{S.f.k58Late='told';apply({aff:3});relApply({trust:2})},reply:()=>['I always do.']}]}}});
txDef('tx_k58_kettle',{with:'m',pov:'v',prio:2,when:()=>S.phase==='normal'&&!!S.f.k58_stair&&tier()>=1,nodes:{
 start:{in:()=>['going in. 40 min','(that’s the rule right. i text before)'],expire:2,
  opts:()=>[{t:'“Noted.”',fx:()=>apply({aff:1}),reply:()=>['ok. if i’m not back in 40 come get me','that was a joke','mostly']},
   {t:'“Forty. I will be counting.”',fx:()=>{apply({aff:2});relApply({trust:2})},reply:()=>['i know. that’s why i text you','nobody else would count']}]}}});

/* ---------- after: in the aftermath order ---------- */
const k58Kd=(id,when,run)=>kdEv(id,()=>!S.f[id]&&!isLone()&&when(),done=>{S.f[id]=1;save();run(done)});
k58Kd('k58_creak',()=>kdD()>=3,done=>{const m=k58M(),st=k58St(),p=k58MP();
 const stepM={his:'The seventh step goes. The seventh step means V. It has meant V every night since you asked it to, and you’ve slept through it fifty times.',
  over:'Somebody steps over the seventh tread, so it’s somebody who knows the house. You used to know the rest from the weight on the eighth. You listen for it. The step you hear belongs to the man who sat outside your door and read to you, and that man was the tall one.',
  none:'You used to know which noises in this house were his. You listen. You can’t tell.'}[st];
 const stepV={his:'He puts his weight on the seventh step, as he has every night since they asked him to.',
  over:'He steps over the seventh tread, as everyone who belongs does, and leans on the eighth the way they once told him he did.',
  none:'He comes up the back stair in his socks.'}[st];
 const part=p?['',p==='r'?(m?'Ronin is awake beside you and has not moved, because he knows better than to move.':'Ronin is awake beside them and has not moved a muscle. He knows better.'):(m?'Angel is awake beside you with her hand flat on your back, not holding, just there.':'Angel is awake beside her, one hand flat on her back, watching the door down the same line.')]:null;
 const count=['hitmeuppp',MV('one. door. two. window. three—','one. door. two. window. three—','One: door. Two: window, four floors. Three—','One: door. Two: window, four floors, no. Three: it’s V. Three is it’s V. Say three.')];
 say(m?[
  ['','Three in the morning. Something on the back stair.'],['',stepM],
  ['','Your hand is under the pillow before you’ve decided anything. The pistol’s up and on the door, and you’re sitting with your back to the headboard, counting out loud in a whisper.'],part,count,
  ['','The door opens. It’s V with a glass of water, which he brings up at three because you wake at three. He stops in the doorway with the gun on him. He doesn’t put the glass down.']]:[
  ['','Three in the morning. He takes them a glass of water, because they wake at three, and has since the infirmary.'],['',stepV],
  ['','When he opens the door they are sitting against the headboard with the pistol on the middle of his chest, and they are whispering numbers.'],part,count,
  ['',st==='his'?'They do not get to three. Three would be his name. The step they gave him means nothing to them tonight. On the stair, in his own house, he was the tall one.':'They do not get to three. Three would be his name. In his own house, in a room they designed, they do not know him, and he understands that on the stair tonight he was the tall one.']],
 ()=>ask(m?'hitmeuppp':'K9',m?'(The gun is on him.)':'(He has a glass of water and a gun on him.)',m?[
  {t:'“...V?”',fn:()=>{S.f.k58Name='look';calm(-3);save();say([['K9','Yes.'],
   ['','You lower it. Your hands are fine; your hands are always fine. He puts the water on the table and goes, and you sit up until it’s light.'],
   ['','After that night he never says his name first. When he comes in at night he stops in the light from the corridor and stands still with the water until you’ve looked at him properly. It takes you a minute every time. He has never once hurried you.']],done)}},
  {t:'Keep it on him until he says your name.',fn:()=>{S.f.k58Name='name';calm(-3);save();say([['K9','Misaki.'],['','You don’t move.'],['K9','Misaki. It is V. It is three in the morning. You are at home.'],
   ['','You put it down on the second time. From then on he says your name before he comes round a corner. Every corner in the house. He never asks why.']],done)}}]:[
  {t:'Say their name.',fn:()=>{S.f.k58Name='name';save();say([['K9','Misaki. It is V. It is three in the morning. You are at home.'],
   ['','They put it down on the second time. After that night he says their name before every corner in the house, and on the stairs, and outside every door. They have never asked him to stop.']],done)}},
  {t:'Say nothing. Stand in the light and let them look.',fn:()=>{S.f.k58Name='look';save();say([['','He steps into the light from the corridor and stands still with the glass. It takes them most of a minute. Their eyes go over his face like a checklist. Then the pistol goes down and they say “oh,” and he puts the water on the table.'],
   ['K9','(I will not tell them who I am. They will have to know it. I could not bear it if they only believed me.)']],done)}}]))});

k58Kd('k58_pages',()=>kdD()>=6&&!!S.f.k58_creak,done=>{const m=k58M();const last=S.f.k58Book==='wrote'?'“I WAS HERE,” in their capitals, with his time beside it.':'“I don’t do quiet. I do loud with breaks.”';
 if(m)return say([
  ['','V doesn’t write anything down at dinner any more. The notebook’s in his jacket; you can see the corner of it. The pen stays capped.'],
  ['','You know why. You haven’t said anything worth writing down in weeks. You say “fine” and “thanks” and “pass the salt.” You don’t do bits. You don’t hum.'],
  ['hitmeuppp',MV('(good.)','(good. nothing to write.)','(Good. There’s nothing to write.)','(Good. Nothing to write. I’d rather be a blank page than a file somebody reads out to me through a door.)')]],()=>{save();done()});
 say([
  ['','He has not written anything in their notebook for '+Math.max(6,kdD())+' days. The last entry before is '+last],
  ['','At the back there is the page headed with the dates they were gone, with nothing under them. In between there is nothing at all.'],
  ['','They do not say things any more. They say “fine” and “thanks.” He tried writing down “fine” once. On the page it read like a diagnosis, and he tore it out.']],
 ()=>ask('K9','(The notebook.)',[
  {t:'Write the date anyway, every evening.',fn:()=>{S.f.k58Date=1;save();say([['','He writes the date every evening and nothing under it. It makes a column with no heading. The column gets longer.']],done)}},
  {t:'Put it away until they say something.',fn:()=>{S.f.k58Date=0;save();say([['','He puts it in the drawer of the bedside table. Some nights he opens the drawer and looks at it and closes the drawer.']],done)}}]))});

k58Kd('k58_cups',()=>k58M()&&(S.f.kd_hard_work||kdD()>=12),done=>say([
 ['','Every night you work, V leaves a second cup of tea on the island. You find it in the morning, cold, with a skin on it. You drink it cold and say thanks and go.'],
 ['','This morning you stand there holding it. He’s never once said anything about it.'],
 ['hitmeuppp',MV('(it’s a soft thing.)','(it’s a soft thing. soft things r how u end up in a van.)','(It’s a soft thing. Soft things are how you end up in a van.)','(It’s a soft thing. Soft things are how you end up in a van. I know that. I know that better than anyone alive.)')]],
 ()=>ask('hitmeuppp','(The cup.)',[
  {t:'Drink it cold, like always.',fn:()=>{S.f.k58Cup=0;apply({edge:1});save();say([['','You drink it cold. It’s fine. You rinse the cup and put it upside down on the rack so he’ll see it’s gone, and that’s all he gets.']],done)}},
  {t:'Make one for him, and leave it.',fn:()=>{S.f.k58Cup=1;apply({aff:3});calm(-2);save();say([
   ['','You put the kettle on. It takes four minutes. For the whole four minutes some part of you that keeps the rules stands at your shoulder and tells you to stop, and you don’t.'],
   ['','You make his the way he has it, which you know without thinking about it, and leave it on the island where yours was, with the handle turned toward his stool.'],
   ['','That night the notebook comes out at dinner again. He writes something down. You didn’t say anything all evening, so you know what he wrote, and it was the cup.']],done)}}])));
k58Kd('k58_cupv',()=>!k58M()&&!!S.f.kd_v_cant,done=>{const gave=S.f.k58Name==='look'||S.f.k58Rule==='kept'||k58Score()>=5;
 if(gave){S.f.k58Cup=1;save();return say([
  ['','He comes down at six. His own cup from last night is gone from the island, rinsed and upside down on the rack.'],
  ['','In its place there is another one. Tea, the way he has it, still warm, with the handle turned toward his stool.'],
  ['','They have already left for work. He stands at the island and drinks it, slowly, and then he gets out the notebook and writes the date and “Tea.”']],()=>{apply({aff:3});done()})}
 say([['','He comes down at six. His cup from last night is gone from the island, rinsed, upside down on the rack. They have drunk it cold, as they do every time, and said nothing, as they do every time.']],()=>ask('K9','(The rack.)',[
  {t:'Keep leaving it.',fn:()=>{S.f.k58CupKeep=1;save();say([['','He keeps leaving it, a second cup on the island every night they work, and they never have to thank him for it.']],done)}},
  {t:'Stop. They have noticed, and they would rather he did not.',fn:()=>{S.f.k58CupKeep=0;apply({heart:-1});save();say([['','He stops. The island is clean in the mornings. They do not mention it, which tells him nothing, and he writes nothing down about it.']],done)}}]))});

/* ---------- after: the rule about texting ---------- */
const k58RuleWhen=()=>k58Post()&&!S.f.k58Rule&&(!!S.f.kd_hard_first||kdD()>=8);
txDef('tx_k58_rule',{with:'v',pov:'m',prio:3,when:k58RuleWhen,nodes:{
 start:{in:()=>['You did not text before tonight.','I am not asking where. Only how long.'],expire:2,onExpire:()=>{S.f.k58Rule='dropped'},
  opts:()=>[{t:'“40.”',fx:()=>{S.f.k58Rule='kept';relApply({trust:3})},reply:()=>['Forty. I am counting.']},
   {t:'“don’t need to anymore”',fx:()=>{S.f.k58Rule='dropped';apply({edge:2})},reply:()=>['Noted.','I will count anyway. You do not have to know about it.']},
   {t:'“stop counting me, V”',fx:()=>{S.f.k58Rule='dropped';relApply({tension:4})},reply:()=>['No.']}]}}});
txDef('tx_k58_before',{with:'m',pov:'v',prio:3,when:k58RuleWhen,nodes:{
 start:{in:()=>['out. home in 20'],expire:2,onExpire:()=>{S.f.k58Rule='dropped'},
  opts:()=>[{t:'“You did not text before.”',reply:()=>['didn’t need to','it was nothing. i’m good at this now. better than before'],next:'rule'},
   {t:'“Noted. The kettle is on.”',fx:()=>{S.f.k58Rule='dropped'},reply:()=>['k']}]},
 rule:{in:()=>['you can stop counting'],opts:()=>[
   {t:'“I will keep counting regardless.”',fx:()=>{S.f.k58Rule='kept';relApply({trust:2})},reply:()=>['...fine. 40 next time. happy?']},
   {t:'“Very well.”',fx:()=>{S.f.k58Rule='dropped';apply({heart:-1})},reply:()=>['thanks']}]}}});

/* ---------- rebuilding (Act II onward) ---------- */
k58Kd('k58_read',()=>['act2','act3','epilogue'].includes(S.phase)&&!!S.f.k58_creak,done=>{const m=k58M(),seen=!!S.f.k58_book;
 const back=S.f.k58Date?['','After the last thing they said there’s a column of dates, one for every evening since you came upstairs, with nothing under any of them. He wrote the date every day, in case.']:['','After the last thing they said there are blank pages, and at the very back a page headed with the days you were gone, with nothing under them.'];
 if(m)return say([
  ['','The notebook is on the island. V doesn’t leave anything anywhere by accident.'],
  ['',seen?'You open it at the front. The toenail moon. NOT SNACKS. Loud with breaks. The person who said those things is funny and loud, and you read them like a file on a target. You could pick them out of a crowd. You couldn’t do what they did.':'You’ve never seen it before. It’s you, page after page, in his fountain pen, things you said before. You read them like a file on a target. You could pick them out of a crowd. You couldn’t do what they did.'],
  back],()=>ask('hitmeuppp','(The pen is clipped to the cover.)',[
  {t:'Write something under today’s date.',fn:()=>{S.f.k58Read='wrote';apply({aff:4});save();say([['hitmeuppp',MV('still here.','still here. kinda.','Still here. Different.','Still here. Not the same one. Write them down anyway.')],
    ['','Your handwriting is neater than it used to be. You don’t like that either.'],
    ['','V comes in from the kennel, sees it open, reads it upside down from across the island, and goes back out to the kennel and stays there a while.']],done)}},
  {t:'Read one out loud, to see what it sounds like now.',fn:()=>{S.f.k58Read='read';apply({aff:2});save();say([['hitmeuppp','“I don’t do quiet. I do loud with breaks.”'],
    ['','In your voice now it sounds like a quote, like something off a poster. You read the freezer one. On the third, the one about the grey hound, something happens at the corner of your mouth that used to be a laugh, nearly.'],
    ['','You close the book before it gets there.']],done)}},
  {t:'Close it and put it back in his coat.',fn:()=>{S.f.k58Read='closed';save();say([['','You close it and put it back in the inside pocket of his coat on the hook, where it lives, and smooth the coat flat. He finds it there that night. He doesn’t know whether you read it. He doesn’t ask.']],done)}}]));
 say([['','He leaves the notebook on the island before he goes down to the kennel. He has never left it anywhere by accident, and they know that.']],()=>ask('K9','(Leave it out?)',[
  {t:'Leave it where they will see it.',fn:()=>{const w=k58Score()>=4;S.f.k58Read=w?'wrote':'closed';save();say(w?[
    ['','Through the kennel glass he watches them open it at the front and read the old pages the way they read a file on a target. Then they take the pen off the cover and write something under today’s date.'],
    ['','When he comes back up it is still open. “Still here. Not the same one. Write them down anyway.” Their handwriting is neater than it used to be.'],
    ['','He goes back to the kennel and stays there a while.']]:[
    ['','Through the kennel glass he watches them open it, read for a minute with no expression at all, close it, and put it back in the inside pocket of his coat on the hook, and smooth the coat flat.'],
    ['','He does not ask whether they read it. He finds he cannot tell from the coat.']],()=>{apply({aff:w?4:1});done()})}},
  {t:'Keep it in your jacket. They have not asked.',fn:()=>{S.f.k58Read='kept';save();say([['','He puts it back in his jacket and takes it down to the kennel with him, and writes the date in it, and nothing under it.']],done)}}]))});

k58Kd('k58_test',()=>['act2','act3','epilogue'].includes(S.phase)&&!!S.f.k58_creak&&(S.phase!=='act2'||S.day>=(S.act2Start||0)+2)&&(!S.f.k58Wait||S.day-S.f.k58Wait>=3),done=>{const m=k58M(),st=k58St();
 const ask1=[['hitmeuppp',MV('come up the stairs some night. don’t say my name.','some night this week come up the back stairs. don’t say my name. don’t tell me which night.','Some night this week, come up the back stair. Don’t say my name. Don’t tell me which night. I want to see if I know.','Some night this week, come up the back stair at three. Don’t say my name at the corner. Don’t tell me which night. I want to find out if I still know you, or if I only know what you tell me.')],
  ['K9','And if you do not know?'],
  ['hitmeuppp',MV('then i point a gun at u again.','then i point a gun at u again. u lived last time.','Then I’ll have a gun on you again. You lived last time.','Then I’ll have a gun on you again, and you’ll stand there with the water like last time, and we’ll know. You lived through it once.')],['K9','...Very well.']];
 const step=st==='his'?'the seventh step goes':'somebody steps over the seventh tread and leans on the eighth';
 const knew=()=>m?[
  ['','It’s Thursday. You know because you look at the clock after. At three, '+step+', and the man on the landing stops for one second to listen, the way he always has. You know who stops like that.'],
  ['hitmeuppp',MV('...v.','...v.','...V.','V.')],['K9','Yes.'],
  ['','You don’t open your eyes. He stands on the landing a long time, much longer than one second, and then the water goes down on the table, and you’re asleep before the step on the way down.']]:[
  ['','He goes up without a word. At the landing he stops for a second, the way they say he always does.'],
  ['','Through the door, before he has touched the handle, not even awake: “V.”'],['K9','Yes.'],
  ['','He puts the water on the table. He does not remember coming back down the stair. He finds himself in the kitchen at half past three with both hands flat on the island, and the grey hound looking at him.']];
 const didnt=()=>m?[
  ['','It’s Thursday. Something on the stair at three. Your hand is under the pillow and the gun is up and you’re counting, and you get to two. You don’t get to three, because three is his name and you don’t know if it’s him.'],
  ['','He doesn’t say it. He promised. He stands in the doorway in the light with the water and lets you look, and it takes you most of a minute, and when you lower it he says nothing at all, which is exactly what you asked for and the worst thing anybody’s done for you all year.'],
  ['hitmeuppp',MV('...again next week.','again next week.','Again next week.','Again next week. And the week after. Don’t look at me like that, it’s training.')]]:[
  ['','He goes up without a word. When he opens the door the pistol is on him and they are at two.'],
  ['','He does not say it. He stands in the light with the water and lets them look, and it takes them most of a minute, and he keeps his face exactly still for all of it, because they asked.'],
  ['hitmeuppp',MV('...again next week.','again next week.','Again next week.','Again next week. Don’t look at me like that. It’s training.')]];
 const fin=(ok)=>{S.f.k58Knew=ok?1:0;apply(ok?{aff:5,trust:6}:{tension:3});if(ok)calm(6);note('k58_test',ok?'Thursday, three in the morning: they knew it was him on the stair without being told.':'Thursday, three in the morning: they did not know it was him on the stair. Again next week.');save();done()};
 if(m)return say([['','You ask him at dinner, flatly, the way you’d ask for a lift.']],()=>ask('hitmeuppp','(Do you ask?)',[
  {t:'Ask him.',fn:()=>say(ask1,()=>{const ok=k58Knows();say(ok?knew():didnt(),()=>fin(ok))})},
  {t:'Don’t. Not yet.',dis:!!S.f.k58Waited,sub:S.f.k58Waited?'you already put it off once':'',fn:()=>{S.f.k58Wait=S.day;S.f.k58Waited=1;S.f.k58_test=0;S.seen.k58_test=0;save();say([['','You don’t ask. You eat your dinner. You’ll ask next week, when you’re better at this.']],done)}}]));
 say([['','They ask him at dinner, flatly, the way they would ask for a lift.']].concat(ask1).concat([['','Thursday. Three in the morning. He stands at the bottom of the back stair with a glass of water for eleven minutes before he goes up.']]),()=>ask('K9','(He promised not to say it.)',[
  {t:'Go up without a word.',fn:()=>{const ok=k58Knows();say(ok?knew():didnt(),()=>fin(ok))}},
  {t:'You cannot be the tall one on that stair again. Say their name.',fn:()=>{S.f.k58Broke=1;S.f.k58Knew=0;apply({tension:4});save();say([
   ['','Halfway up he says their name. He does not decide to. It comes out of him at the turn, like something he has stepped on.'],
   ['','Through the door, flat: “that’s cheating.”'],['K9','It is.'],
   ['','He does not tell them that he could not stand on that landing one more time and be the man they did not know. He puts the water on the table and says goodnight, and the next week, when they ask again, he says yes again.']],done)}}]))});

k58Kd('k58_steps',()=>S.phase==='act3'&&a3d()>=5,done=>{const m=k58M(),can=!!S.f.k58Knew||S.f.k58Read==='wrote';
 const one=['hitmeuppp',MV('one. two ways off the deck. two. four of us.','one: two ways off the deck. two: there’s four of us.','One: the deck has two ways off, and the second one’s the water. Two: there are four of us.','One: the deck has two ways off, and the second one’s the water, and I can stay under for four minutes. Two: there are four of us, and nobody on that boat has ever met four of us.')];
 const vThree=['K9','Three: I will be on the deck. You will know where I am without looking.'];
 const mThree=['hitmeuppp',MV('three. they got it coming.','three: they’ve got it coming.','Three: they’ve got it coming.','Three: they’ve got it coming. They’ve all got it coming.')];
 const open=m?[
  ['','Late, in the kitchen, with the yacht drawn on the back of a takeaway menu between you.'],
  ['','You do the steps out loud. You haven’t done them out loud since the cell. In there you did them in your head, all of them, every time the door went.'],one,
  ['','Three was always the one you said last, because it was the one you needed to believe.']]:[
  ['','Late, in the kitchen, with the yacht drawn on the back of a takeaway menu between them. They do their steps out loud. He has not heard them do that since before.'],one];
 if(m)return say(open,()=>ask('hitmeuppp','(Three.)',[
  {t:'Leave three to him.',dis:!can,sub:can?'':'not yet. you don’t trust it yet',fn:()=>{S.f.k58Three='his';apply({aff:4});save();say([vThree,
   ['','Three used to be something else. You take his pen and write it down in his notebook yourself, under the date, in your neat new handwriting, and he lets you.']],done)}},
  {t:'Say it yourself.',fn:()=>{S.f.k58Three='hers';apply({edge:2});save();say([mThree,['','V nods, as if you’ve given him a time and an exit. He doesn’t write it down. You notice that he doesn’t, and you’re grateful, and you don’t say so.']],done)}}]));
 if(!can)return say(open.concat([mThree,['','They say three themself, without looking at him, and fold the menu in half. He does not write it down. He was not asked.']]),()=>{S.f.k58Three='hers';save();done()});
 say(open.concat([['','At three they stop, and look at him, and wait.']]),()=>ask('K9','(They are leaving three to him.)',[
  {t:'Say three.',fn:()=>{S.f.k58Three='his';apply({aff:4});save();say([vThree,['','They take the pen off his notebook and write it down themself, under the date, in their neat new handwriting. He lets them.']],done)}},
  {t:'Wait for them to say it.',fn:()=>{S.f.k58Three='hers';save();say([mThree,['','He nods, as if they have given him a time and an exit, and does not write it down.']],done)}}]))});

/* ---------- where they end ---------- */
function k58EndKind(){const s=k58Score();return S.f.k58Knew&&s>=7?'mended':s>=3?'kept':'apart'}
k58Kd('k58_end',()=>S.phase==='epilogue'&&!!S.f.k58_creak,done=>{const m=k58M(),k=k58EndKind(),st=k58St(),p=k58MP(),vp=k58VP();S.f.k58End=k;save();
 const step=st==='his'?'The seventh step goes.':'Somebody steps over the seventh tread and leans on the eighth.';
 const L=[['','Some months after the boat. Three in the morning. The back stair.']];
 if(k==='mended'){L.push(['',step],
  ['',m?'You don’t move. You don’t reach under the pillow. You know who stops on the landing for one second to listen, and you say “V” into the pillow, and he says “Yes,” and the water goes down on the table. It took most of a year.':'They do not move. Their hand stays where it is. He stops on the landing for one second, and through the door they say “V” into the pillow, and he says “Yes,” and puts the water down. It took most of a year.'],
  ['',m?'He still says your name at corners sometimes, by accident. Some mornings you catch yourself humming over the cereal, one bar of something, and stop. He never once looks up when you do, which is how you know he heard.':'He still says their name at corners sometimes, by accident. Some mornings they hum one bar of something over the cereal and stop. He never looks up when they do, and writes it down later, and the notebook has a new page most weeks.'])}
 else if(k==='kept'){L.push(['',m?'V comes up the back stair and says your name at the turn, the way he has every night since the infirmary, and you take your hand off the gun under the pillow.':'He comes up the back stair and says their name at the turn, the way he has every night since the infirmary, and hears their hand come off the gun under the pillow.'],
  ['',m?'You know it’s him because he tells you. It works. Everything in the house works: the two cups, the name at every corner, the water at three. You run it like a safe house, and you’re both very good at it.':'They know it is him because he tells them. It works. The two cups, the name at every corner, the water at three. They run the house like a safe house, and they are both very good at it.'],
  ['',m?'Some nights you lie there after and try to hear the step under the name, and you can’t, and you go back to sleep anyway, because he said so.':'Some nights he stays on the landing after and listens to them not sleep, trying to hear the step under his own name.'])}
 else{L.push(['',m?'You don’t text before and you don’t text after. You come home at three and wash your hands once. Clients wait three weeks for you. You’re the best there’s ever been.':'They do not text before and they do not text after. They come home at three and wash their hands once. Clients wait three weeks for them. They are the best there has ever been.'],
  ['',m?'V still says your name at every corner. He still writes the date in the notebook every evening, a column of them going back a year, nothing underneath. You saw it once. You didn’t say anything. Neither did he.':'He still says their name at every corner. He still writes the date in the notebook every evening, a column of them going back a year with nothing underneath. They saw it once and put it back.'],
  ['',m?'The seventh step goes at three, and your hand comes up with the gun, and he says your name, and you put it down, and you lie there doing sums until it’s light.':'At three he says their name on the stair, and hears the gun come up and go down again, and puts the water on the table, and they do sums in the dark until it is light.'])}
 if(S.f.married)L.push(['',k==='apart'?(m?'Your ring is on the bedside table, by the water. You take it off for work now. He hasn’t asked.':'Their ring is on the bedside table, by the water. They take it off for work now. He has not asked.'):(m?'The rings are on the bedside table, next to the water, where they go at night. He writes down that you hummed. As far as you can tell that’s what being married is: a man writing down that you hummed.':'The rings are on the bedside table next to the water, where they go at night. He writes down that they hummed. As far as he can tell, that is what being married is for.')]);
 else if(p)L.push(['',p==='r'?(k==='mended'?'Ronin sleeps through it now. He claims he learned the step too. He hasn’t. He only ever wakes up for strangers.':(m?'Ronin wakes every time and pretends he didn’t, and puts his arm over you, and says something filthy about V’s timing into your hair.':'Ronin wakes every time and pretends he did not, and puts his arm over them, and says something filthy about V’s timing into their hair.')):(k==='mended'?(m?'Angel stays asleep against your back. She learned V’s step before you relearned it, and never said, so you’d get to do it yourself.':'Angel stays asleep against Misaki’s back. She learned his step before Misaki relearned it, and never said, so Misaki would get to do it themself.'):'Angel is awake every time, watching the door down the same line, and never says a word to V about it in the morning.')]);
 else if(vp)L.push(['',(vp==='r'?'Ronin':'Angel')+' is asleep in V’s bed when he comes back down the hall, and asks without waking up whether they knew him tonight. '+(k==='mended'?'He says yes.':'He says not yet.')]);
 else L.push(['',k==='apart'?'People still ask whether the two of them are together. Misaki says they’re a set. V says that is accurate, and does not write it down.':'People still ask whether the two of them are together. Misaki says they’re a set, like a knife and a fork. V says that is accurate, and writes something down under the table.']);
 if(S.f.heartbreak)L.push(['','They do not live in the house any more. They stay on Sundays, after the table, and the water still comes up at three.']);
 say(L,()=>{apply(k==='mended'?{aff:4}:k==='kept'?{aff:2}:{edge:2});done()})});
(function(){if(typeof KD_ORDER==='undefined')return;KD_ORDER.push('k58_creak','k58_pages','k58_cups','k58_cupv','k58_read','k58_test','k58_steps','k58_end')})();

/* ---------- after: sitting on the back stair (side menu, three times) ---------- */
const K58_SIT=[
 m=>[['',m?'You sit on the back stair in the dark, you on the eighth step, him on the sixth, the seventh between you. Neither of you puts any weight on it. The hounds come and lie at the bottom in a row.':'They sit on the back stair in the dark, Misaki on the eighth step, V on the sixth, the seventh between them. Neither puts any weight on it. The hounds come and lie at the bottom in a row.'],
  ['hitmeuppp',MV('say something.','say something. anything.','Say something. Anything.','Say something. Anything boring. I want to hear you talk without it being about me.')],
  ['K9','The grey hound has put on two hundred grams.'],['hitmeuppp',MV('thrilling.','thrilling.','Thrilling.','Thrilling. Tell me more about the grams.')],['K9','I thought so.']],
 m=>[['hitmeuppp',MV('what did i used to sound like.','what did i used to sound like. before.','What did I used to sound like?','What did I used to sound like? Before. Don’t do the careful voice. Just tell me.')],
  ['','He takes the notebook out and reads them the night they said they wanted to be buried in the freezer marked NOT SNACKS.'],
  ['hitmeuppp',MV('that’s stupid.','that’s so stupid.','That’s stupid.','That’s so stupid. I was so stupid. Read it again.')],
  ['','He reads it again. '+(m?'Something happens at the corner of your mouth that used to be a laugh, and you let it.':'Something happens at the corner of their mouth that used to be a laugh, and they let it.')]],
 m=>[['',m?'You shift down onto the seventh step on purpose and sit on it. It creaks. You both listen to it go.':'They shift down onto the seventh step on purpose and sit on it. It creaks. They both listen to it go.'],
  ['K9','That is meant to be me.'],
  ['hitmeuppp',MV('ya.','yeah. just checking it still works.','Yeah. Just checking it still works.','Yeah. I know. Just checking it still works. It does. It’s me that’s broken. ...Don’t write that down.')],
  ['','He does not write it down. They sit on the stairs until the old hound gets up and goes to bed in disgust.']]];
const _sh58=sideHub;sideHub=function(late){const o=_sh58(late);try{if(!k58Post()||!S.f.k58_creak||(S.f.k58Sit||0)>=K58_SIT.length)return o;const wait=S.day-(S.f.k58SitDay||-9)<2,early=S.slot<2;
 return o.concat([{t:'Sit on the back stair',sub:wait?'not tonight':early?'after dark':'with '+(S.pov==='v'?'Misaki':'V')+' · the seventh step between you',dis:late||wait||early,fn:()=>{spend();const n=S.f.k58Sit||0;S.f.k58Sit=n+1;S.f.k58SitDay=S.day;save();go(cutBg('#06060c'));say(K58_SIT[n](k58M()),()=>{apply({aff:2});calm(3);hub()})}}])}catch(e){return o}};

/* ---------- talk ---------- */
const k58Top=(L,T,o)=>{L.push(o);if(typeof T!=='undefined'&&!T.find(x=>x.id===o.id))T.splice(Math.max(0,T.length-1),0,o)};
k58Top(TDTOP_V,TOPICS_V,{id:'k58_t_step',label:()=>'“do you still step on it? the seventh one.”',show:()=>!S.dark&&!!S.f.k58_creak&&k58Post()&&!(S.talks&&S.talks.k58_t_step>1),run:b=>{warm('v','k58_t_step',3);
 say([['K9',k58St()==='his'?'Every time. It is the only promise I have kept without having to think about it.':'I step over it, and lean on the eighth, as you told me I do. I have not changed how I walk. I would not know how.'],
  ['K9',S.f.k58Name==='name'?'I say your name as well, now. I can stop either one, if you ask me.':'I stand in the light as well, now, until you have looked. I can stop, if you ask me.'],
  ['hitmeuppp',MV('don’t stop.','don’t stop. not yet.','Don’t stop. Not yet.','Don’t stop. Not yet. I’ll tell you when. I want to be the one who tells you.')]],b)}});
k58Top(TDTOP_V,TOPICS_V,{id:'k58_t_last',label:()=>'“what’s the last thing you wrote down? about me.”',show:()=>!S.dark&&!!S.f.k58_book&&!(S.talks&&S.talks.k58_t_last>1),run:b=>{warm('v','k58_t_last',2);
 const post=k58Post();say(!post?[['K9','You said the moon looked like a toenail. Again. I wrote “again.”'],['hitmeuppp',MV('it DOES tho','it does though. it’s a gross moon.','It does, though. It’s a disgusting moon.','It does. It’s a disgusting moon. Write that down too.')],['','He writes it down.']]
  :S.f.k58Read==='wrote'?[['K9','You wrote the last one. I have not added to it. It seemed rude.'],['hitmeuppp',MV('add to it.','add to it. it’s ur book.','Add to it. It’s your book.','Add to it. It’s your book. I just borrowed a line.')]]
  :[['K9','The date.'],['hitmeuppp',MV('...just the date?','just the date?','Just the date?','Just the date? Every day?')],['K9','Every day. In case.']],b)}});
k58Top(TDTOP_M,TOPICS_M,{id:'k58_t_corner',label:()=>'“Shall I keep saying your name at corners?”',show:()=>!S.dark&&!!S.f.k58_creak&&k58Post()&&!(S.talks&&S.talks.k58_t_corner>1),run:b=>{warm('m','k58_t_corner',3);S.f.k58Asked=1;save();
 say([['hitmeuppp',S.f.k58Knew?MV('...sometimes.','sometimes. when i’m asleep.','Only when I’m asleep. I’ve got the rest.','Only at three. The rest of the time I’d rather know it’s you. I can now. Mostly.'):MV('yes.','yes. keep saying it.','Yes. Keep saying it.','Yes. Keep saying it. Not forever. Until I tell you to stop. I want it to be me who says stop.')],
  ['K9','Then I will keep saying it until you tell me.'],['hitmeuppp',MV('ok.','ok. don’t make it weird.','Okay. Don’t make it a whole thing.','Okay. Don’t write that down either. You’re writing it down. I can see the pen.')]],b)}});
k58Top(TDTOP_M,TOPICS_M,{id:'k58_t_first',label:()=>'“You fell asleep first.”',show:()=>!S.dark&&!!S.f.k58First&&S.phase==='normal'&&!(S.talks&&S.talks.k58_t_first>1),run:b=>{warm('m','k58_t_first',3);
 say([['hitmeuppp',MV('did not.','i did NOT. i was resting my eyes.','I did. Don’t make it a thing.','I did. First time in my life. Don’t write it down. ...You already wrote it down.')],['K9','I did.'],
  ['hitmeuppp',MV('creep.','creep. do it again tmrw.','Creep. ...Read the boring book again tonight.','Creep. Read me the tax book again tonight. I want to see if it happens twice.')]],b)}});

/* ---------- ending lines ---------- */
const _xe58=extraEnding;extraEnding=function(){const L=_xe58();try{if(!S||!S.f)return L;const f=S.f;
 if(f.k58End==='mended')L.push('The seventh step on V’s back stair goes at three in the morning, and Misaki says “V” into the pillow without opening their eyes. It took most of a year.');
 else if(f.k58End==='kept')L.push('V says Misaki’s name at every corner of the house, and they know it is him because he tells them. They are both very good at it.');
 else if(f.k58End==='apart')L.push('There is a column of dates at the back of V’s notebook, one for every evening since the infirmary, with nothing written under any of them.');
 else if(f.k58Stair)L.push('The seventh step on V’s back stair is loose on purpose. '+(f.k58Stair==='his'?'V is the only one who steps on it.':'Everybody steps over it, and Misaki knows V by the eighth.'));
 if(f.k58Broke)L.push('Once, V was asked not to say their name on the stairs, and could not do it.');
 if(f.k58Cup)L.push('Some mornings there are two cups on the island, and he did not make the second one.')}catch(e){}return L};

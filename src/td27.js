/* ===================== THE ROOM WITH ONE BULB, AND WHAT IT TOOK (td27) =====================
   A harder kidnapping, and a longer shadow from it.
   Captivity (Misaki): the sedative leaves her slow (kdWoozy) and takes hours she never gets back (S.kd.hrs). The cell has
   a clock: use it up and they come for another session. The boss asks about her life before nine, which she cannot answer,
   and he reads the truth as defiance. Under the needle she talks, and she does not know what she said (S.kd.said).
   Search (V): a third lead (which of nine warehouses), a longer trace, more guards for every night she is gone.
   After: the missing hours, the note-taker's notebook (read / let V hold it / burn), what she said coming home to roost,
   lost afternoons, shaky hands, and one choice: keep the room, or let it go blank the way chapter one went.
   The blank: nothing before she was nine. The kidnapping makes her ask, for the first time, whether that was done to her. */
const KD=()=>{if(!S.kd)S.kd={hrs:0,ses:0,said:0,clock:0,dose:0,anc:0,lost:0,shake:0};return S.kd};
const kdPost=()=>!!(S&&S.kd&&S.kd.t0&&!S.kd.med&&S.phase!=='taken'&&S.phase!=='normal'&&!isLone());
const kdD=()=>S.day-S.kd.t0;
const kdMe=()=>S.pov!=='v';
const kdHrs=()=>S.kd?S.kd.hrs:0,kdDays=()=>S.kd?S.kd.days:0;
const kdWarned=()=>['read','v','vsolo'].includes(S.f.kdBook);
function kdWoozy(){if(!S||S.phase!=='taken'||!S.kd)return 0;return Math.max(0,2-Math.floor((S.kd.clock-S.kd.dose)/2))}
function kdEscapeCfg(m){const wz=kdWoozy(),again=(S.tries||0)>=1;
 return{guards:m.guards.concat(again?[m.map===VENT?[[3,5],[6,5]]:[[13,5],[15,5]]]:[]),sens:1+wz*.12+(again?.06:0),title:m.title+(wz?' · your legs are a second behind you':'')}}
function kdRescueGuards(){const g=[];if((S.f.missing||0)>=2)g.push([[13,5],[15,5]]);if(S.f.kdAlert)g.push([[6,5],[8,5]]);return g}
/* saves from before this module: give anyone already past the kidnapping a modest record so the later scenes can run */
function kdEnsure(){if(!S||S.kd||isLone())return;if(!(S.list&&S.captor)||!['after','act2','act3','epilogue'].includes(S.phase))return;
 S.kd={hrs:16,ses:2,said:Math.min(3,S.leaks>=2?2:1),clock:0,dose:0,anc:0,lost:0,shake:0,t0:S.day,days:3}}
const _hubKD=hub;hub=function(){try{kdEnsure();kdSettle()}catch(e){}return _hubKD.apply(this,arguments)};

/* ---------- 1. CAPTIVITY ---------- */
const _tmKD=takenM;takenM=function(){S.kd=null;KD();S.f.kdQ2=0;S.f.kdLoops=0;return _tmKD()};
const _tvKD=takenV;takenV=function(){S.kd=null;KD();S.f.kdBldg=0;S.f.kdAlert=0;return _tvKD()};
const _feKD=failedEscape;failedEscape=function(msg){if(S.kd&&S.pov!=='v'){S.kd.hrs+=3;S.kd.clock=0;S.kd.dose=0}return _feKD(msg)};
const _intKD=interrogate;interrogate=function(n,cb){const k=KD();if(n>=2&&S.f.kdQ2)return kdShort(cb);if(n>=2)S.f.kdQ2=1;
 const run=()=>{_intKD(n,()=>kdBlankQ(n,()=>kdDose(cb)));IR.R=clamp(IR.R-6-k.ses*5,10,95)};
 if(n!==1)return run();
 go(cutBg('#000'));say([['','She comes up in pieces: the concrete, then the bulb, then her own hands. She got into that van at nine-forty at night, and there is daylight in the slot of window now.'],
  ['hitmeuppp','(One: i’m awake. Two: i’ve lost a whole night and i wasn’t even there for it. Three: fuck.)']],run)};
function kdAskIR(Q,cb){const B=ORG[S.captor].boss;say(Q.pre,()=>{
 const opts=Q.o.map(x=>({t:x.t,sub:x.leak?'(they get what they want)':x.c?`resolve −${x.c}`:(x.sub||'costs something else'),dis:!x.leak&&IR.R<(x.c||0),fn:()=>{
  if(x.leak)S.leaks+=x.leak;IR.R=clamp(IR.R-(x.c||0));if(x.e)apply(x.e);if(x.fx)x.fx();save();say(x.r.concat(Q.post||[]),cb)}}));
 ask('hitmeuppp','(resolve: '+IR.R+')',opts)})}
function kdBlankQ(n,cb){const B=ORG[S.captor].boss;S.f.kdBlankQ=1;
 if(n===1)return kdAskIR({pre:[[B,'Before the trailer, Miss Misaki. Where did you grow up? I like to know where to send the fingers.']],o:[
   {t:'“no clue. honest to god.”',sub:'the truth · +edge',e:{edge:4},r:[[B,'Everyone knows where they are from.'],['','It is the only true thing you have said to him all night, and he writes “uncooperative” beside it.']]},
   {t:'“osaka. six brothers. all cops.”',c:8,r:[[B,'There is no school record for you before the age of nine. No clinic. No mother on any form. I had a man look for two days.']]},
   {t:'[Say nothing.]',c:12,r:[[B,'We have time.']]}],
  post:[[B,'So there is nobody. That leaves me your friends on that server, and we will talk about them until you run out.'],
   ['hitmeuppp','(nine years of nothing and it finally did me a favour. there’s no mom for him to go visit. so he’s going to visit them.)']]},cb);
 kdAskIR({pre:[[B,'I did find one thing. A woman in Saitama who had a daughter your age, and lost her. She would like a telephone call.'],[B,'One name from your server and I will dial it for you.']],o:[
   {t:'“you’re lying.”',c:10,r:[[B,'Perhaps. How would you know?'],['','You wouldn’t. He could hand you any mother he liked and you would have nothing to check her against.']]},
   {t:'[Want it. Say nothing.]',c:16,fx:()=>{S.f.kdMother=1},r:[['','You want it for about four seconds, which is four seconds longer than you would have bet on.']]},
   {t:'“what’s her name.”',sub:'costs you the asking',e:{edge:5},fx:()=>{S.f.kdMother=2},r:[[B,'Keiko.'],['','No bell rings. You can’t tell whether he made her up, or whether there is nothing left in you for her to ring.']]},
   {t:'“…the butcher’s called ronin.”',leak:1,fx:()=>{S.f.kdMother=3},r:[[B,'Thank you.'],['','He dials. It rings out in the back office of a pachinko parlour, and he holds the phone to your ear for all of it.']]}]},cb)}
function kdShort(cb){const k=KD(),B=ORG[S.captor].boss;IR={R:clamp(32-k.ses*6,5,95),n:k.ses+1};go({draw(){drawInterro()}});
 kdAskIR({pre:[['','No table this time. He stands, and somebody you can’t see stands behind the chair.'],[B,pk(['Again. K9. A street, a gate, anything.','You are very tired. Give me one small true thing and you may sleep.','Who feeds his dogs when he is away? Start there.'])]],o:[
   {t:'[Nothing.]',c:14,r:[[B,'Then we will try the other way.']]},
   {t:'[Give him one dog’s name. Only that.]',sub:'it is small. it is still his',e:{aff:-2},fx:()=>{k.said++},r:[['hitmeuppp','...biscuit.'],[B,'Biscuit. Good. You see how little it costs?']]},
   {t:'[Tell him which side of the river.]',leak:1,r:[[B,'Thank you, Misaki.']]}]},()=>kdDose(cb))}
function kdDose(cb){const k=KD();const low=IR.R<30;const h=ri(5,8)-(S.f.kdLoops?2:0);k.hrs+=h;k.ses++;if(low||k.ses>=3)k.said++;k.clock=0;k.dose=0;
 const a=S.f.kdLoopN||0;S.f.kdLoopN=a+h*40;save();
 const L=[['','A hand turns your head to one side. The needle goes in on top of the last one.'],
  S.f.kdLoops?['',`The bank jingle was on loop ${a} when you went under, and it is on loop ${a+h*40} now. Forty loops to the hour. They had you for ${h} hours and you were there for none of them.`]:['','You come up on the cot and cannot tell whether it has been an hour or a day. Nothing in the room will say.']];
 if(low||k.ses>=3)L.push(['','Your throat is raw, the way it gets when you have been talking for a long time. You don’t remember talking.']);
 go(cutBg('#000'));say(L,cb)}
function kdTheyCome(){const k=KD();const back=()=>cut([['','They put you back on the cot. The tray is gone, and so is whatever you had worked out about the hall.']],()=>toRoom('cell',[120,150]),'#0c0a08');
 S.f.tray=0;S.f.listened=0;save();
 cut([['',k.ses>=2?'Boots in the hall. They stop at your door, and nobody bothers with the hood any more.':'Boots in the hall, stopping at your door. You had hours, and you spent them on the floor.'],
  ['hitmeuppp','(One: it’s only questions. Two: i’ve had worse dates. Three: ...shit, there’s no three.)']],()=>interrogate(2,back),'#000')}
(function(){const R=ROOMS.cell;
 R.spots.push({at:[104,160],mark:[104,150],label:'Your arm',act:()=>{const k=KD();say([
    ['',`Under your jaw, where the van needle went, there is one scab. Inside your left elbow there ${k.ses===1?'is one more':'are '+k.ses+' more'}, in a neat row.`],
    ['','You remember the van. You don’t remember any of the arm ones going in.'],
    ['hitmeuppp',S.f.kdLoops?`(that’s ${k.hrs} hours where somebody else had the wheel. i hate knowing the number. i’d hate not knowing more.)`:'(no idea how long. somebody else had the wheel, and i don’t even know for how far.)'],
    kdWoozy()?['','Your hands are slow. Whatever it is takes a while to leave. If you can stand to wait, they will be better.']:['','Your hands are your own again, for now.']])}},
  {at:[180,128],mark:[180,96],label:'The radio down the hall',act:()=>{const k=KD();if(!S.f.kdLoops){S.f.kdLoops=1;S.f.kdLoopN=S.f.kdLoopN||ri(60,90);save();return say([
     ['','The bank jingle runs ninety seconds and starts again. Forty loops make an hour.'],
     ['hitmeuppp','(ok. that’s a clock. One: count. Two: don’t stop counting. Three: when i’m out, i’m closing my account.)'],
     ['','(Counting the loops means the next dose takes less from you.)']])}
    S.f.kdLoopN+=ri(6,14);save();say([['hitmeuppp',`(loop ${S.f.kdLoopN}. still here. still counting.)`]])}});
 R.spots.forEach(s=>{const a=s.act;s.act=function(){const k=KD();
   if(k.clock>=6)return kdTheyCome();
   if(s.label==='Vent'&&S.f.tray&&!S.f.listened){k.clock++;save();return say([['hitmeuppp','four screws, and every one of them is going to squeal. i need to know when the hall’s empty first.']])}
   const ready=(s.label==='Vent'&&S.f.tray)||(s.label==='Door'&&S.f.listened);
   if(!ready){k.clock++;save();if(k.clock===5)toast('Boots at the far end of the hall. Not long.')}
   return a.apply(this,arguments)}});})();
/* V's search: which of the nine */
function kdScout(){const fin=(ok,L)=>()=>{if(ok)S.f.kdBldg=1;else S.f.kdAlert=(S.f.kdAlert||0)+1;save();cut(L,hub,'#031014')};
 if(S.f.angelHelp)return cut([[AN,'ok. a fan who works nights at the fish market filmed a grey van with no plates going into the FOURTH one. tuesday, 9:58pm. she thought it was a drama shoot.'],['K9','The fourth.'],[AN,'she wants a follow back. i said after. go.']],()=>{S.f.kdBldg=1;save();hub()},'#031014');
 go(cutBg('#070b10'));say([['','Nine warehouses on the east bank. V walks the row in the rain with the tyre pattern from her fence in his head.'],S.f.kdTape?['','(The voicemail had a radio in it, and a bank jingle that started again as soon as it ended.)']:null].filter(Boolean),()=>ask('K9','(Which one.)',[
  {t:'The second: a lit office, forklifts, a night shift',fn:fin(0,[['','It is a real business. The foreman asks who he is looking for, and by morning the whole row has heard that a tall man in a brown coat was asking.'],['K9','(That was an hour of hers, and I spent it.)']])},
  {t:'The fourth: dark, twin-tyre ruts in the mud, a radio somewhere inside',fn:fin(1,[['','The ruts match the ones by her fence. Through the wall a radio is playing a jingle for a bank, and it starts again as soon as it ends.'],['K9','(She is behind that wall.)'],['','He makes himself walk away from it, because he has no way in yet.']])},
  {t:'The seventh: two men smoking out front, a new padlock',fn:fin(0,[['','They are guarding stolen outboard motors. One of them knows the coat, and makes a telephone call while V is still in sight.'],['K9','(They will be expecting me now.)']])}]))}
EVENTS.push({id:'kd_tape',when:()=>S.phase==='taken'&&S.pov==='v'&&(S.f.missing||0)>=1&&!S.f.kdTape,run:done=>{S.f.kdTape=1;save();say([
 ['','There is a voicemail from her number at 04:10, forty seconds long. Nobody speaks. A radio plays a jingle for a bank, twice through, and under it somebody is breathing slowly, the way people breathe when they have been put to sleep.'],
 ['','They wanted him to hear that she is alive and that they can do this whenever they like.']],()=>ask('K9','(Forty seconds.)',[
  {t:'Play it again. Listen to the room, and leave her out of it.',fn:()=>{apply({edge:4});say([['','On the ninth listen he has it: the jingle, a roller door, gulls. He writes all three down and does not play it a tenth time.']],done)}},
  {t:'Send it to Ronin.',fn:()=>{S.f.roninOwes=1;save();say([[RN,'Yeah. I heard it. Stop playin’ it, Vee, you ain’t gonna hear her better the twentieth time.'],[RN,'I’m bringin’ the crowbar and a thermos. Tell me where.']],done)}},
  {t:'Put the phone in the freezer.',fn:()=>{apply({edge:8,heart:-2});say([['','He puts it in the freezer, shuts the door, and stands with his hand flat on it until Sergeant leans on his leg.']],done)}}]))}});

/* ---------- 2. COMING OUT: the hours, the card ---------- */
const _afterKD=after;after=function(self){const k=KD(),mis=S.f.missing||0;
 if(S.pov==='v'){k.ses=1+mis;k.hrs=7+mis*9;k.said=(mis>=1?1:0)+(mis>=2?1:0)+(S.leaks>=3?1:0)}
 k.said=Math.min(3,k.said);k.t0=S.day;k.days=S.pov==='v'?Math.max(2,mis+1):Math.max(2,Math.round(k.hrs/9)+1);k.shake=Math.min(3,k.ses);
 k.pend=1;_afterKD(self);kdSettle()};
/* earlier wrappers may play an interlude before the original after() runs, so the adjustment waits until it has */
function kdSettle(){const k=S&&S.kd;if(!k||!k.pend||S.phase!=='after'||!S.endDay)return;k.pend=0;S.endDay+=2;S.comp=clamp(S.comp-k.ses*3);save()}
const _flKD=flashCheck;flashCheck=function(id,p){if(S&&S.f&&S.f.kdKeep===0)return false;return _flKD(id,p)};
/* hands: her stealth is tighter until she has done a few clean jobs */
const _stKD=stealth;stealth=function(cfg,cb){if(S&&S.kd&&S.kd.shake>0&&cfg.actor==='m'&&S.phase!=='taken'&&S.phase!=='normal'){const n=S.kd.shake;
  toast('Her hands are not steady yet.');return _stKD(Object.assign({},cfg,{sens:(cfg.sens||1)*(1+.06*n)}),r=>{if(r&&r.ok&&S&&S.kd){S.kd.shake--;save();if(!S.kd.shake)toast('Steady hands again.')}cb(r)})}
 return _stKD(cfg,cb)};
const kdEv=(id,when,run)=>EVENTS.push({id,when:()=>{try{return kdPost()&&when()}catch(e){return false}},run});
kdEv('kd_count',()=>kdD()>=1&&!S.f.kdCount,done=>{S.f.kdCount=1;save();const h=kdHrs(),d=kdDays();
 note('kd_hours',`Misaki cannot account for about ${h} hours of the ${d} days she was held. The man who kept the notes could.`);
 const L=[['','She tells him two days, because it felt like two. He turns his phone round on the counter so she can read the date.'],
  ['K9',`It was ${d}. I counted each of them.`],
  ['hitmeuppp',MV('no. two. i counted meals.','no it was two. i counted. ...i counted the ones i was awake for.','It was two. I counted meals, and— oh. I counted the ones I was awake for.',`Two. I’d have sworn on your dogs. So they had me for ${h} hours I wasn’t even in the room for, and I don’t get those back.`)],
  ['',`She works it out on the back of a receipt. About ${h} hours are missing. She folds the receipt and puts it in her shoe, with the clip.`]];
 if(kdMe())return say(L,()=>ask('hitmeuppp',`(${h} hours.)`,[
  {t:'Ask him who would know what happened in them.',fn:()=>{apply({veng:3});say([['K9','One man. He wrote down every quarter of an hour in a notebook. He is on the list.'],['hitmeuppp',MV('ok.','ok. him first.','Him first, then.','Him first. I want to read my own night, V. Even if it’s shit.')]],done)}},
  {t:'Don’t ask. Eat the eggs.',fn:()=>{calm(3);say([['','She eats the eggs. He doesn’t offer the number again, and he doesn’t put the phone away either.']],done)}}]));
 say(L.slice(0,1),()=>ask('K9',`(It was ${d} days. She believes it was two.)`,[
  {t:'Tell her the number.',fn:()=>{apply({aff:2});calm(-2);say(L.slice(1),done)}},
  {t:'“A few days.”',sub:'kinder today',fn:()=>{S.f.kdRound=1;calm(2);say([['K9','A few days.'],['','She nods and goes on believing two. He has now told her something untrue about her own life, and he is the second man this month to do it.']],done)}}]))});
kdEv('kd_round',()=>S.f.kdRound===1&&kdD()>=3,done=>{S.f.kdRound=2;apply({aff:-4,tension:6});save();say([
 ['','Angel says “the whole '+kdDays()+' days” on a voice note, in passing, and Misaki plays it four times.'],
 ['hitmeuppp',MV('u said a few.','you said “a few days.” you rounded me.','You said “a few.” You rounded it, like I’m a bill.','You rounded it. He lied to me about my own life for days in that room, and then I came home and you did it to be nice.')],
 ['K9','I did. I will not do it again.'],['','He writes the real number on the fridge pad, with the date, and leaves it there.']],done)});
kdEv('kd_card',()=>kdD()>=2&&S.f.kdCount&&!S.f.kdCard&&tier()>=1,done=>{S.f.kdCard=1;S.kd.anc++;calm(4);apply({aff:2});say([
 ['','V’s doctor comes to the house with a clipboard: blood type, allergies, childhood illnesses, date of birth.'],
 ['hitmeuppp',MV('idk. idk. idk. march. probably.','no clue, no clue, no clue, and march. i put march on a form once and it stuck.','I don’t know, I don’t know, I don’t know, and March, which I made up for a form.','Pass, pass, pass, and March, which I invented. I’m a blank form with a gun, doc. Write whatever.')],
 ['','The doctor says some people take that sedative badly, and she is one of them. Nobody could have known that, and she couldn’t have told them. It is why the hours went the way they did.'],
 ['K9','Then it will be written down: the drug, the dose, the reaction. The next person who needs it will not have to ask you.'],
 ['','He writes the card himself in fountain pen. It is the first document about her body with anything true on it, and she puts it behind her train pass.']],done)});

/* ---------- 3. THE NOTEBOOK: the hours she was not there for ---------- */
const KD_SAID=['“03:10 subject gives the row and lot number of a trailer, and where the spare key is kept.”','“04:40 subject says the Butcher’s building has a blue door, by the tracks.”','“05:55 subject lists a man’s dogs by name. Says the gate knows their voices.”'];
function kdBookWarn(){const n=S.kd.said;if(n>=2)fr('r',2);if(n>=1)phQueue(kdMe()?'v':'m',[kdMe()?'The stash is in my garage. The spare key has been replaced with a fish hook. I thought you would enjoy that.':'moved my stuff to ur garage. left them a fish hook where the key was :)'],0)}
kdEv('kd_book',()=>!S.f.kdBook&&S.list&&S.list.some(x=>x.id==='notes'&&x.st),done=>{const n=S.kd.said;
 const page=n?KD_SAID.slice(0,n).map(t=>['',t]):[['','“02:15 subject recites names: Biscuit, Sergeant, Mochi, Pancake. 02:30 the same. 03:00 the same. 05:00 the same. No use.”']];
 const set=(v,fx)=>{S.f.kdBook=v;save();fx&&fx()};
 const pre=[['','The note-taker’s notebook is on the kitchen table in a freezer bag. He kept a line for every quarter of an hour, in very neat handwriting, and that includes the hours she can’t remember.']];
 if(kdMe())return say(pre,()=>ask('hitmeuppp',MV('(that’s my night in there.)','(my whole night’s in there. he’s got more of it than i do.)','(He has more of those days than I do. It’s all in there.)','(That prick wrote down more of my life than I can remember living. And it’s right there, in a freezer bag.)'),[
  {t:'Read it.',sub:'−composure · you will know what they know',fn:()=>{set('read',()=>{calm(-4-3*n);if(n)kdBookWarn()});note('kd_book',n?'She read the notebook. '+n+' thing'+(n>1?'s':'')+' she said under the needle, and the people they touch have been warned.':'She read the notebook. Under the needle she gave them four dog names, on a loop, and nothing else.');
    say([['','She reads the missing hours with her thumb pressed over her mouth.']].concat(page,[['hitmeuppp',n?MV('(i don’t remember any of it.)','(that’s how i talk. i don’t remember saying one word of it.)','(It sounds like me. I wasn’t there for a word of it.)','(That’s me. That’s exactly how I talk, and I wasn’t there. Okay. One: warn them. Two: today. Three: then throw up.)'):MV('(lol.)','(i did the DOGS. unconscious. lmao.)','(I did the dogs in my sleep. That’s all they got.)','(Out cold with a needle in my arm, and I gave them Biscuit, Sergeant, Mochi, Pancake for five hours. I’m fucking incredible.)')]]),done)}},
  {t:'Have V read it. He tells you only what you ask for.',sub:tier()>=2?'he will carry it':'not close enough',dis:tier()<2,fn:()=>{set('v',()=>{calm(-2);apply({aff:3,veng:6});if(n)kdBookWarn()});
    say([['','He reads it standing up with his glasses on, and turns each page by its corner.'],
     ['K9',n?`There ${n>1?'are '+n+' things':'is one thing'} in here that people must be told today. I will tell them. Do you want to know what ${n>1?'they are':'it is'}?`:'You gave them the names of my dogs, in order, for five hours. There is nothing else in here.'],
     ['hitmeuppp',n?MV('no.','no. yes. no. just fix it.','Not today. Fix it, and tell me when I ask.','Not today. You hold it. I’ll ask when I can stand to, and you’ll tell me straight, and you won’t do the face.'):MV('lol.','LMAO. the dogs. ok.','The dogs. I did the dogs.','I named your dogs at them for five hours. Frame that page, I’m serious.')]],done)}},
  {t:'Burn it unread.',sub:'+composure · whatever is in it stays out there',fn:()=>{set('burn',()=>calm(6));
    say([['','She lights it on the stove ring and holds it over the sink by one corner until it is her fingers or the page.'],
     ['hitmeuppp',MV('(done.)','(whatever i said, i said it. reading it won’t unsay it.)','(Whatever I said is said. I don’t need to watch myself say it.)','(Whatever’s in there already happened to everybody but me. I’m not going to sit and watch it happen to me too.)')]],done)}}]));
 say(pre,()=>ask('K9','(Her hours, in another man’s handwriting.)',[
  {t:'Read it alone, tonight.',sub:'−conscience +vengeance · she is not asked',fn:()=>{set('vsolo',()=>{apply({heart:-3,veng:8});if(n)kdBookWarn()});
    say([['','He reads it in the archive with the door shut.']].concat(page,[['K9',n?'(She does not know she said this. She will have to be told, and people will have to be warned before that.)':'(My dogs. For five hours she gave them my dogs.)']]),done)}},
  {t:'Put it in front of her, unopened.',sub:'it is hers',fn:()=>{set('read',()=>{apply({aff:3});calm(-3-2*n);if(n)kdBookWarn()});
    say([['','She reads it at the table. He stands where she can see him and does not read over her shoulder.']].concat(page,[['hitmeuppp',n?MV('...i said that?','i don’t remember saying any of this.','I don’t remember a word of this. It sounds like me.','That’s me, and I wasn’t there. Okay. We warn them today. Then I’m going to go and be sick, and you’re going to pretend you can’t hear it.'):MV('lol. dogs.','the DOGS. i did the dogs, V.','I did your dogs. In order. For five hours.','Five hours of Biscuit, Sergeant, Mochi, Pancake. They must have wanted to die. Good.')]]),done)}},
  {t:'Burn it.',sub:'nobody reads it',fn:()=>{set('burn',()=>apply({heart:1}));
    say([['','He burns it in the incinerator off the kennel corridor and stays until the wire binding is the only thing left.'],['K9','(Whatever she said in there, I have decided not to know. I hope that I can afford it.)']],done)}}]))});
kdEv('kd_bookout',()=>S.phase!=='after'&&!S.f.kdBook,done=>{const n=S.kd.said;S.f.kdBook=n?'out':'out0';save();
 if(!n)return say([['','A photocopied page arrives in the post with no return address. “02:15 subject recites names: Biscuit, Sergeant, Mochi, Pancake. No use.” Somebody has written “???” across it in red.'],['hitmeuppp',MV('lol.','they’re MAD. good.','They’re angry about it. Good.','Somebody paid for that notebook and got four dog names. I hope it was expensive.')]],done);
 apply({heat:6});calm(-6);say([['','A photocopied page arrives in the post with no return address.'],['',KD_SAID[0]],
  ['','The note-taker was never dealt with. His notebook is still out there, with all the hours she can’t remember in it, and now somebody is posting her the pages.'],
  ['hitmeuppp',MV('i said that?','i don’t remember saying that. when did i say that.','I don’t remember saying that. How much more is in there?','I don’t remember it. So there’s a book of things I said, and everybody gets to read it except me.')]],done)});
/* what she said comes home. Warned = somebody read the notebook in time. */
const kdKn=n=>kdEv('kd_knock'+n,()=>S.kd.said>=n&&S.f.kdBook&&S.day>=(S.f.kdKnockDay||0)+2&&!S.f['kdKnock'+n]&&(n===1||S.f['kdKnock'+(n-1)]),done=>{S.f['kdKnock'+n]=1;S.f.kdKnockDay=S.day;const w=kdWarned();S.f.kdHit=(S.f.kdHit||0)+(w?0:1);save();
 if(n===1){if(w){apply({heat:2});return say([['','Somebody goes through the trailer while she is out. The spare key was where she told them it would be, and it is a fish hook now. The stash went to V’s garage two days ago.'],
    ['hitmeuppp',MV('they took my NOODLES.','they got noodles and a hook in the thumb. worth it.','They got a box of noodles and a fish hook through the thumb. I’m calling that a win.','There’s blood on my step and none of it’s mine. Somebody’s having a worse week than me, and I love that for them.')]],done)}
  S.yen=Math.max(0,S.yen-25000);apply({heat:6});calm(-6);return say([['','Somebody goes through the trailer while she is out. They used the spare key, and they knew which floorboard.'],
   ['','The cash under the bed is gone. The shoebox is upside down on the floor with its lid trodden flat.'],
   ['hitmeuppp',MV('how did they KNOW.','how did they know about the key. nobody knows about the key.','Nobody knows about that key. I never told anyone about that key.','Nobody knows about that key. I never told a living soul, V included. ...So when did I say it?')]],done)}
 if(n===2){if(w){fr('r',4);return say([[RN,'Two guys at the blue door at 4am. I’d been sat behind it since midnight like it was fuckin’ Christmas.'],[RN,'Tell her thanks for the heads up. Ain’t had that much fun since the dentist.']],done)}
  fr('r',-5);S.yen=Math.max(0,S.yen-8000);return say([[RN,'So two guys knew my door’s the blue one. Funny, that. I got eleven stitches and a full freezer out of it.'],
   ['hitmeuppp',MV('...i don’t remember telling them.','i don’t remember saying it. i swear.','I don’t remember saying it. I’m not saying I didn’t.','I don’t remember it, and I must have said it, and I can’t even be sorry properly for something I wasn’t there for. Send me the bill.')],
   [RN,'Yeah, yeah. Sucks t’be you, you’re payin’ for the stitches. Bring beer.']],done)}
 if(w){apply({heart:-2});S.bodies=(S.bodies||0)+1;return say([['','A man comes to V’s gate at dusk with a bag of chicken, calling Biscuit by name. The gate code changed on Tuesday and the dogs are in the east run.'],['K9','He knew four names. He has no use for them now, and the dogs have eaten.']],done)}
 S.dogs.Biscuit=clamp(S.dogs.Biscuit-30);apply({aff:-3,heart:-3});calm(-5);say([['','A man comes to V’s gate at dusk with a bag of chicken, calling Biscuit by name. Biscuit goes to him, because she is Biscuit.'],
  ['','The vet keeps her overnight on a drip. V sits on the clinic floor in his coat until they let him in to see her.'],
  ['K9','She will live. I would like to know who gave them her name.'],
  ['hitmeuppp',MV('...','...i think it was me.','I think it was me. I don’t remember it. I think it was me.','It was me. There’s nothing there when I look for it, and it was still me. Don’t be nice about it.')]],done)});
[1,2,3].forEach(kdKn);

/* ---------- 4. KEEP IT, OR LET IT GO BLANK ---------- */
function kdKeepIt(done,byV){S.f.kdKeep=1;calm(-8);S.list=S.list||[];if(!S.list.some(x=>x.id==='voice'))S.list.push({id:'voice',n:'The one behind the chair',d:'He never asked a question. He stood behind her through every session and breathed.',st:0});save();
 note('kd_keep','Misaki wrote the room down, all of it, so it cannot go the way chapter one went. There is a fifth name on the list now.');
 say([['','She fills eleven pages: the driver’s singing voice, the radio man’s shoes. One of them she had already half lost, the man who stood behind her chair and never came round to the front.'],
  ['hitmeuppp',MV('five names now.','five. there’s five of them. i nearly dropped one.','There are five of them. I’d nearly dropped one already.','Five. I was four days out and my head had already binned one of them for me. It doesn’t get to do that again.')]],done)}
function kdLetGo(done){S.f.kdKeep=0;calm(15);apply({veng:8});const left=(S.list||[]).filter(x=>!x.st&&x.id!=='water');const x=left.length?pk(left):null;if(x)x.gone=1;S.kd.hrs=Math.max(S.kd.hrs,S.kd.days*24);save();
 note('kd_gone','Misaki let the room go blank. V has it now. One name on the list has nothing under it.');
 say([['','She stops going back for it. By the weekend the bulb is something she knows about and can’t picture, like a town she has only heard named.'],
  ['',x?`V notices when she cannot tell him anything about ${x.n.replace(/^T/,'t')}. He writes what he knows on his own page. Her line on the list stays empty.`:'V notices the first time she can’t answer him about it. He writes what he knows on his own page.'],
  ['hitmeuppp',MV('(quiet.)','(it’s quiet. i’m not asking why.)','(It’s quiet in here. I’m not going to ask what that cost.)','(It’s quiet, and I slept. Somebody’s still carrying it, and it isn’t me. Sucks to be him.)')]],done)}
kdEv('kd_blank',()=>kdD()>=3&&S.f.kdKeep===undefined,done=>{
 const pre=[['','She is a few days out and the third session has already gone soft at the edges, the way the theme park did. She knows the feeling. If she leaves the room alone for a month, it will be gone.']];
 const two=()=>[{t:'Keep it. Write the room down tonight, every face.',sub:'−composure · a fifth name for the list',fn:()=>kdKeepIt(done)},{t:'Let it go blank.',sub:'+composure · no more flashbacks · she loses a name off the list',fn:()=>kdLetGo(done)}];
 if(kdMe())return say(pre,()=>ask('hitmeuppp',MV('(i could just let it.)','(i could let it go. i’m so good at that.)','(I could let it go. I lost nine years without trying. Three days would be nothing.)','(I could let the whole room go where chapter one went. I wouldn’t even have to try. I want to, and that scares the shit out of me.)'),two().concat([
   {t:'Ask V what he would do.',dis:tier()<2,sub:tier()<2?'not close enough':'',fn:()=>say([['K9','I kept mine. I was nine, it was seventy hours, and I have every one of them. I do not recommend it and I would not give them back.'],['K9','It is yours to keep or to lose. If you lose it, I will have it.']],()=>ask('hitmeuppp','(So.)',two()))}])));
 say(pre.concat([['hitmeuppp',MV('do i keep it.','do i keep it or not. u pick.','Do I keep it? Tell me what you’d do.','I can feel it going, V. I could let it. Tell me what you’d do, and don’t be careful about it.')]]),()=>ask('K9','(She is asking.)',[
  {t:'“Keep it. Write it down tonight.”',fn:()=>kdKeepIt(done)},
  {t:'“Let it go. I will keep it for you.”',fn:()=>kdLetGo(done)},
  {t:'“It is yours to decide.”',fn:()=>S.comp<45?kdLetGo(done):kdKeepIt(done)}]))});
(function(){const t=TOPICS_M.find(x=>x.id==='third');if(t){const s=t.show;t.show=()=>s()&&S.f.kdKeep!==0}})();
TDTOP_M.push({id:'kd_shoes',label:()=>'“What colour were his shoes?”',show:()=>kdPost()&&S.f.kdKeep===0&&!(S.talks&&S.talks.kd_shoes),run:b=>{S.talks=S.talks||{};S.talks.kd_shoes=1;warm('m','kd_shoes',3);say([
 ['hitmeuppp',MV('whose.','whose shoes.','Whose shoes?','Whose? ...Oh. I had that. I had that last week.')],
 ['K9','The man with the radio. Brown, resoled twice. It does not matter.'],
 ['hitmeuppp',MV('ok.','ok. so u have it and i don’t.','So you have it now and I don’t.','So it’s all in your head now and none of it’s in mine. You look like shit, by the way. Are you sleeping?')],
 ['','He says that he is. She watches him wash the same cup twice.']],b)}});
/* the body keeps a copy */
kdEv('kd_van',()=>S.phase!=='after'&&S.f.kdKeep!==undefined&&!S.f.kdVan,done=>{S.f.kdVan=1;save();
 const a=[['','A grey van idles outside the konbini with its side door open. She is on the roof of the bike shelter before the shop doors have finished closing behind her.']];
 if(S.f.kdKeep===0){calm(-6);S.f.kdBody=1;save();return say(a.concat([['','She crouches up there with a carrier bag in her teeth and cannot think why. She reaches for the reason and nothing comes. Her hands are shaking as though somebody had told them something and left her out.'],
  ['','It is a florist. He unloads chrysanthemums and doesn’t look up.'],
  ['hitmeuppp',MV('(what the fuck was that.)','(what was THAT. why am i on a roof.)','(Why am I on a roof? I don’t know why I’m on a roof.)','(So my head let it go and my legs kept a copy. Nobody asked the legs.)')]]),done)}
 calm(2);say(a.concat([['','She knows exactly why: grey, no front plate, side door on the kerb side. She counts loops of a bank jingle that isn’t playing until the driver gets out with a bucket of chrysanthemums.'],
  ['hitmeuppp',MV('(florist. ok.)','(florist. it’s a florist. get down.)','(Florist. One: get down. Two: buy the noodles.)','(A florist. One: get down. Two: buy the noodles. Three: nobody saw that, and if they did, I was checking the gutter.)')]]),done)});

/* ---------- 5. LOST TIME (repeats until she has three anchors) ---------- */
EVENTS.push({id:'kd_lost',when:()=>{try{return kdPost()&&kdD()>=1&&S.kd.anc<3&&S.kd.lost<5&&S.kd.lostDay!==S.day&&Math.random()<clamp((115-S.comp)/220,.1,.45)}catch(e){return false}},run:done=>{S.seen.kd_lost=0;const k=S.kd,i=k.lost%3;k.lost++;k.lostDay=S.day;k.hrs+=3;
 const fin=L=>()=>{save();say(L.concat(k.anc>=3&&!S.f.kdSteady?(S.f.kdSteady=1,[['','That makes three times she has caught it and pinned it down. She reads the three entries in a row. They are all in her handwriting, and none of them is missing a line.']]):[]),done)};
 if(kdMe()){S.slot=Math.max(S.slot,1);apply({energy:-8});save();
  const sc=[[['','The kettle has boiled dry and switched itself off. She is standing at the counter with a teabag in her hand, and the light in the window has gone from morning to afternoon.']],
   [['','She is on the 14 bus with no idea where she got on. Her phone says she bought an onigiri forty minutes ago. It is in her pocket with one bite out of it.']],
   [['','She comes back in the middle of a sentence. Angel is looking at her, waiting for the rest of it.'],[AN,'babe. u stopped.']]][i];
  return say(sc,()=>ask('hitmeuppp',MV('(again.)','(that’s another one. how long.)','(Another one. How long this time?)','(Another one. Okay. One: where am I. Two: what’s in my pockets. Three: how long.)'),[
   {t:'Write it down: the time, the place, what’s in your pockets.',sub:'an anchor',fn:()=>{k.anc++;calm(2);fin([['','She writes it on her arm in biro, because the receipt is in her other shoe.']])()}},
   {t:'Text V: “what time did i leave”',sub:tier()>=1?'an anchor':'not close enough',dis:tier()<1,fn:()=>{k.anc++;apply({aff:1});fin([['K9','09:12. You took the green umbrella and said “back in ten.” It is 13:40.'],['hitmeuppp',MV('ok.','ok. thx. creep.','Thanks. That’s weirdly exact. Thanks.','Thank you. Keep doing that. Don’t tell me you’re doing it, just keep doing it.')]])()}},
   {t:'Act like nothing happened.',sub:'−composure',fn:()=>{calm(-3);apply({edge:2});fin([['','She puts the kettle back on and gets on with the day that’s left. Nobody saw, so it isn’t on any record, including hers.']])()}}]))}
 say([['','V finds her standing in the hall with one boot on. She has been there long enough for Mochi to fall asleep on the other boot.']],()=>ask('K9','(She is not here.)',[
  {t:'Say the time and the day, and wait.',sub:'an anchor',fn:()=>{k.anc++;calm(3);fin([['K9','It is Thursday. It is ten past two. You are in the east hall and you have one boot on.'],['hitmeuppp',MV('...ok.','ok. thursday. ok.','Thursday. Okay. How long was I—','Thursday. Ten past two. Okay. How long have I been standing here? Tell me the real number.')],['K9','Twenty-five minutes.']])()}},
  {t:'Say her name.',fn:()=>{calm(1);fin([['','She comes back fast and hard, with her shoulders up, and it takes her a second to work out who said it.']])()}},
  {t:'Put the kettle on. Say nothing.',fn:()=>{apply({aff:1});if(tier()>=2)k.anc++;fin([['','The kettle clicks off and she looks round at it. He pours two cups and reads out the time off the oven clock as though to himself.']])()}}]))}});

/* ---------- 6. CHAPTER ONE ---------- */
kdEv('kd_practice',()=>kdD()>=2&&S.f.kdCount&&!S.f.kdSuspect,done=>{const h=kdHrs();
 const pre=[['',`About ${h} hours are gone and it bothers her less than it should, because she has had practice. Everything before she was nine is gone too, and she has never once gone looking for it.`],
  ['','Tonight she looks. A room with one bulb took hours out of her in a few days. She had always called the first nine years a chapter she skipped. She has never asked what kind of room takes nine years.']];
 const set=v=>{S.f.kdSuspect=v;save()};
 if(kdMe())return say(pre,()=>ask('hitmeuppp',MV('(huh.)','(huh. don’t like that.)','(I don’t like that thought. I can’t put it back, either.)','(Oh, fuck. I can’t un-think that one.)'),[
  {t:'Say it to V, out loud.',dis:tier()<1,sub:tier()<1?'not close enough':'',fn:()=>{set(1);apply({aff:3,veng:4});say([['K9','I told you on the wheel that I would find out. I have been looking since then. I will look harder.'],['hitmeuppp',MV('and if it’s bad.','and if it’s bad?','And if it’s bad?','And if it’s bad? If somebody did it?')],['K9','Then somebody did it, and somebody can be found.']],done)}},
  {t:'Text Angel at 3am.',fn:()=>{set(2);fr('a',4);phQueue('a',['babe. then somebody owes u nine years, and i collect debts for fun','come over. i’m making u a childhood, remember. we’re on year two. it’s the year u get a hamster'],0);say([['','She types it with her thumbs and sends it before she can read it back. Three dots come up at once.']],done)}},
  {t:'Put it back where it was.',fn:()=>{set(3);calm(-3);apply({edge:3});say([['','She can’t. It stays out on the floor of her head like something the dog dragged in.']],done)}}]));
 say(pre.concat([['hitmeuppp',MV('what if somebody did it.','what if the nine years is the same thing. what if somebody did it.','What if the nine years went the same way? What if somebody did that?','What if chapter one went the same way, V? What if I didn’t skip it, and somebody took it out with a bulb and a chair?')]]),()=>ask('K9','(She has never asked that before.)',[
  {t:'“I will find out.”',fn:()=>{set(1);apply({veng:4,aff:2});say([['K9','I said so on the wheel. I have been looking. I will look harder.'],['','She nods and goes back to drying the same plate.']],done)}},
  {t:'“Do you want me to stop looking?”',fn:()=>{set(1);S.f.kdAskFirst=1;apply({aff:4});say([['hitmeuppp',MV('no. look.','no. look. just tell me first.','No. Look. Tell me before you tell anyone else.','No. Look. But I hear it first, before Ronin, before the fucking archive. Me first.')],['K9','You first.']],done)}}]))});
const kdFileShow=()=>kdPost()&&tier()>=2&&(S.f.kdBlankQ||S.f.kdSuspect)&&kdD()>=2&&!(S.talks&&S.talks.kd_file);
const kdMotherL=()=>S.f.kdMother?[['K9','The woman in Saitama does not exist. The number he dialled is a fax machine in a pachinko parlour. I checked that first.'],['hitmeuppp',MV('knew that.','i knew that. obviously.','I knew that. I wanted it for about four seconds.','I knew that. I wanted her for four seconds, and I’d like those four seconds back with interest.')]]:[];
const kdFileOpen=b=>()=>{S.f.kdFile='open';S.kd.anc++;apply({aff:3});save();say([['','“March,” in pencil, in her own nine-year-old handwriting, with the M the wrong way round. She had always thought somebody told her. She picked it herself.'],
 ['hitmeuppp',MV('i made it up. lol.','i made up my own birthday. at nine. iconic.','I made up my own birthday. Nobody gave it to me. I chose March.','So nobody ever told me. I was nine, I looked at a box on a form, and I picked March. That’s the oldest thing I own.')],
 ['K9','Whoever took a child off paper that completely did it for a living. I would like to meet them.']],b)};
TDTOP_V.push({id:'kd_file',label:()=>'“did you look? chapter one.”',show:()=>kdFileShow(),run:b=>{S.talks=S.talks||{};S.talks.kd_file=1;warm('v','kd_file',5);say([
 ['K9','I did. I told you on the wheel that I would, and I prefer to say so in advance.'],
 ['K9','There is nothing before you were nine: no school, no clinic, no birth registered under any spelling. I am good at finding things. Somebody was better at removing them.']].concat(kdMotherL(),[
 ['','He puts an envelope on the table. The earliest paper with her on it is a school enrolment form, and a child has filled in the date-of-birth box.']]),()=>ask('hitmeuppp','(The envelope.)',[
  {t:'Open it.',fn:kdFileOpen(b)},
  {t:'“you keep it.”',fn:()=>{S.f.kdFile='kept';apply({aff:2});save();say([['K9','It will be in the archive, filed under M. You need only ask.'],['','She pushes it back across the table with one finger and goes to find a dog.']],b)}},
  {t:'Burn it.',fn:()=>{S.f.kdFile='burn';calm(3);save();say([['','She burns it in the sink. He opens the window and says nothing about the smoke alarm.']],b)}}]))}});
TDTOP_M.push({id:'kd_file',label:()=>'“I looked for chapter one.”',show:()=>kdFileShow(),run:b=>{S.talks=S.talks||{};S.talks.kd_file=1;warm('m','kd_file',5);say([
 ['K9','I said on the wheel that I would find out. There is nothing before you were nine: no school, no clinic, no birth under any spelling. Somebody removed it, and they were good.'],
 ['hitmeuppp',MV('ok.','so my head lost it AND the paper lost it. cool.','So it isn’t only my head. Somebody did the paper as well.','So my head and the city records lost the same nine years. That’s two of us who can’t find me, and one of us is a filing cabinet.')]].concat(kdMotherL()),()=>ask('K9','(The envelope with the enrolment form is in his coat.)',[
  {t:'Give it to her.',fn:kdFileOpen(b)},
  {t:'Keep it until she asks.',fn:()=>{S.f.kdFile='vkept';apply({heart:1});save();say([['','He leaves it in his coat. She has had enough paper about herself this month.']],b)}}]))}});
TDTOP_V.push({id:'kd_backup',label:()=>'“if i lose more. will u tell me.”',show:()=>kdPost()&&tier()>=1&&S.kd.lost>=1&&!S.f.kdBackup,run:b=>{S.f.kdBackup=1;S.kd.anc++;apply({aff:3});warm('v','kd_backup',4);save();say([
 ['hitmeuppp',MV('if i lose stuff. u tell me. ok?','if i start losing days again. u tell me what’s missing. deal?','If I lose more. Days, people. You tell me what’s gone. Deal?','If I can drop nine years and then '+kdHrs()+' hours, I can drop you. If that happens you walk up and tell me who you are. Promise me. I’m serious.')],
 ['K9',byT('Yes.','Yes. I will tell you what I saw, and nothing that I did not see.','Yes. What I saw, with the time and the date. I will not tidy it.','Then I will introduce myself. I am told I make a poor first impression, and you stayed regardless.')],
 ['','He takes out the notebook he keeps her quotes in, turns to a clean page, and writes the date at the top.']],b)}});

/* ---------- 7. PHONE ---------- */
txDef('tx_kd_ron',{with:'r',pov:'m',prio:2,when:()=>kdPost()&&frT('r')>=1&&kdD()>=1,nodes:{
 start:{in:()=>['u owe me 2000 yen from tuesday','and don’t cha try “I was kidnapped tuesday” either. it was the tuesday before'],expire:3,
  opts:()=>[{t:'“…did i? ok. sending it”',fx:()=>{S.yen=Math.max(0,S.yen-2000);fr('r',1)},reply:()=>['fuck. you actually paid','you didn’t owe me shit. I was checkin’ somethin’. you can’t tell anymore, can you','keepin’ the 2000 though. finder’s fee'],next:'two'},
   {t:'“bullshit. i’d remember”',fx:()=>fr('r',3),reply:()=>['yeah you would. good','that asshole with the clean hands lied to you about your own life for days. figured I’d see if it stuck','it didn’t. buy me a beer anyway'],next:'two'},
   {t:'“ask V. he writes everything down”',fx:()=>fr('r',2),reply:()=>['already did. he sent a fuckin’ spreadsheet. you owe me nothin’, I owe you 600 for ramen','he’s a creep. useful creep'],next:'two'}]},
 two:{in:()=>['look. anybody tells you somethin’ about you that you can’t check, you ask me or Vee before you believe it','even if it’s nice. especially if it’s fuckin’ nice'],
  opts:()=>[{t:'“…ok”',fx:()=>{fr('r',2);S.f.kdRon=1},reply:()=>['good. now forget I said it. ha']},
   {t:'“that’s almost sweet”',fx:()=>{fr('r',1);S.f.kdRon=1},reply:()=>['say that again and it’s 4000']}]}}});
txDef('tx_kd_angel',{with:'a',pov:'m',prio:2,when:()=>kdPost()&&frT('a')>=1&&S.kd.lost>=1,nodes:{
 start:{in:()=>['ok be honest. do u remember the photo booth. last month. the one where u bit the strip'],expire:3,
  opts:()=>[{t:'“obviously”',reply:()=>['good. bc i have the strip and u look feral','new rule tho. i timestamp everything now. u, me, lunch, all of it'],next:'album'},
   {t:'“...no”',reply:()=>['ok. that’s what i’m for','it was a tuesday, 4:12pm. u bit the strip, the machine ate ur 500 yen and u threatened it','i timestamp everything now. u, me, lunch, all of it'],next:'album'}]},
 album:{in:()=>['i made an album. it’s called “misaki was here.” it’s shared and it’s already got 40 things in it','alibis are literally my job, babe. if anybody ever tells u where u were, u check the album. then u tell me who lied so i can go see them'],
  opts:()=>[{t:'“add the one where i’m asleep on ronin’s couch”',fx:()=>{fr('a',3);S.f.kdAlbum=1;KD().anc++},reply:()=>['already in. three angles']},
   {t:'“this is surveillance”',fx:()=>{fr('a',2);S.f.kdAlbum=1;KD().anc++},reply:()=>['yes. with a filter. ur welcome']}]}}});
txDef('tx_kd_mv',{with:'m',pov:'v',prio:2,when:()=>kdPost()&&tier()>=1&&kdD()>=2,nodes:{
 start:{in:()=>['what did i have for breakfast','it’s not a test for u. it’s a test for me. i wrote my answer down first'],expire:3,
  opts:()=>[{t:'“Rice. One egg. You gave the yolk to a dog.”',reply:()=>['ok good. same as mine','...which dog'],next:'dog'},
   {t:'“I was not watching.”',reply:()=>['liar. u watch everything. it’s fine. i need u to','rice and an egg. i gave the yolk away. which dog'],next:'dog'}]},
 dog:{in:()=>['i wrote pancake'],opts:()=>[{t:'“Mochi. Pancake was asleep on your coat.”',fx:()=>{apply({aff:2});KD().anc++},reply:()=>['ok. so i’m off by one dog','i’ll take one dog. yesterday i was off by a whole afternoon']},
   {t:'“Does it matter which dog?”',fx:()=>apply({aff:-1}),reply:()=>['yes. it matters which dog','if i can be wrong about the dog i can be wrong about the room. tell me which dog, V']}]}}});

/* ---------- 8. LATER: Hara, the epilogue, the ending ---------- */
kdEv('kd_hara',()=>S.phase==='act2'&&kdMe()&&!S.f.kdHara,done=>{const d=kdDays();say([
 ['Hara',`One question, off the record. There are ${d} days last month when nobody saw you. No purchases, no trains, no phone. Where were you?`]],()=>ask('hitmeuppp','(He has his pen out.)',[
  {t:'“in a room with one lightbulb. ask the river.”',fn:()=>{S.f.kdHara='truth';apply({heat:-4});say([['Hara','...I see. I will write “unavailable.” If you ever want it on paper as what it was, you know where my office is.']],done)}},
  {t:'“don’t remember.”',sub:'it is true',fn:()=>{S.f.kdHara='blank';apply({heat:6});say([['Hara','People say that when they remember very well.'],['','It is the most honest answer she has ever given a policeman. He underlines it twice.']],done)}},
  {t:'“with Maria. it’s on her channel, timestamped.”',dis:!(S.f.mariaKnown||frT('a')>=2),sub:S.f.mariaKnown||frT('a')>=2?'Angel will cover':'Angel isn’t close enough to lie for you',fn:()=>{S.f.kdHara='alibi';fr('a',2);say([['','Angel uploads the “archive footage” within the hour. Hara watches forty minutes of a nail tutorial and closes the file.']],done)}}]))});
kdEv('kd_epi',()=>S.phase==='epilogue'&&!S.f.kdEpi,done=>{S.f.kdEpi=1;save();say([
 ['',S.f.kdCard?'The medical card is still in her wallet, behind the train pass. The date of birth on it says March, and she knows now who chose that.':'She still writes March on forms. Nobody has ever checked.'],
 ['','She still loses an afternoon now and then. '+(S.f.kdBackup?'When it happens she asks him, and he turns to the page and reads her the time.':S.f.kdAlbum?'When it happens she opens Angel’s album and scrolls back until she finds herself.':'When it happens she checks her arm for biro.')],
 ['hitmeuppp',MV('still here.','angel’s album hit 400. i’m asleep in like 30 of them.','Angel’s album has four hundred photos in it. I’m asleep in thirty of them.','Angel’s album hit four hundred. In three of them I’m asleep with my mouth open, and Ronin’s drawn on one. I’m suing.')]],done)});
const _xeKD=extraEnding;extraEnding=function(){const L=_xeKD();if(!S||!S.f||!S.kd||!S.kd.t0)return L;const f=S.f,k=S.kd;
 L.push(`About ${k.hrs} hours of that year never came back to her.`+(f.kdKeep===1?' She kept the rest on eleven pages, in a shoebox, and can still tell you the colour of every pair of shoes in that building.':f.kdKeep===0?' She let the room go blank as well. V has it, all of it, and has never once made her take it back.':''));
 if(f.kdBook==='burn')L.push(f.kdHit?'She never read the notebook. What was in it found her friends anyway, one door at a time.':'She never read the notebook. Nothing in it ever came looking.');
 else if(f.kdBook==='read'||f.kdBook==='v'||f.kdBook==='vsolo')L.push(k.said?'Somebody read the notebook in time. Everyone she named under the needle was waiting when the knock came.':'The notebook had four dog names in it, on a loop, for five hours. V had the page framed.');
 else if(f.kdBook==='out')L.push('The note-taker’s notebook was never found. A page of it still turns up in the post now and then.');
 if(f.kdFile==='open')L.push('The enrolment form is on her fridge: “March,” in a nine-year-old’s pencil, with the M backwards. Nothing older than that has ever turned up. V is still looking.');
 else if(f.kdSuspect)L.push('Nobody has found chapter one. V is still looking, and he has promised she will hear it first.');
 return L};

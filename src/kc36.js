/* ===================== STORY SETTING: THE AFTERMATH (kc36) =====================
   META.kdFull (default on). "Full story" keeps the strand about what was done to her in the hours she cannot remember
   (the doctor's question, the examination window, the photographs she denies, the box in the fridge, the hidden route).
   "Injuries only" removes that strand completely; the aftermath is about her injuries, the treatment, and how badly
   she lies about them. The rest of the kidnapping arc is the same in both. */
const kdSA=()=>typeof META==='undefined'||META.kdFull!==0;
const KD_SA_EV=['kd_math','kd_clothes','kd_exam','kd_photos','kd_wash','kd_smell','kd_notask','kd_vknows','kd_later','kd_draft',
 'kd_recount','kd_slip','kd_sleeptalk','kd_shop','kd_ask','kd_window','kd_bodymap','kd_photodeny','kd_cup','kd_results','kd_dentist',
 'kd_vdoc','kd_kitgone','kd_last','kd_told_box','kd_told_dentist','kd_told_sleep'];
const KD_SA_TX=['tx_kd_sleep','tx_kd_ask','tx_kd_vdots','tx_kd_ronsoft','tx_kd_docstop'];
EVENTS.forEach(e=>{if(KD_SA_EV.includes(e.id)){const w=e.when;e.sa=1;e.when=()=>kdSA()&&w()}});
KD_SA_TX.forEach(id=>{const t=TXS[id];if(t){const w=t.when;t.when=()=>kdSA()&&w()}});
[TDTOP_V,TDTOP_M,TOPICS_V,TOPICS_M].forEach(L=>L.forEach(t=>{if(t&&t.id==='kd_second'&&!t.sa){const s=t.show;t.sa=1;t.show=()=>kdSA()&&s()}}));
(function(){const sp=ROOMS.medbay.spots.find(s=>s.label==='The small fridge');if(!sp)return;const a=sp.act;
 sp.act=function(){if(kdSA())return a.apply(this,arguments);say([['','Soup, in eleven tubs, labelled by day in fountain pen. Two bags of saline. A box of the dressings for her wrists, half used, and a note on it: “Order more. She goes through them.”']])}})();
const _xeSA=extraEnding;extraEnding=function(){const L=_xeSA();if(kdSA())return L;
 return L.filter(x=>!/did the sum|second page of the doctor|said yes|window closed|false name|“dentist”|remembers a ceiling|turned up first/.test(x))};

/* ---------- injuries only ----------
   No denial and no doctor. She knows exactly what is broken, says so in the tone she uses for a weather report, and
   does not care. The horror is that nothing about it is new to her: the old fractures on the films, the stitches she
   takes out herself, the exercises nobody taught her. V does the treatment. Recovery is something you play: physio and
   walking, once a day each, in the infirmary and after it. */
const kdOff=()=>!kdSA();
const KD_OFF_GONE=['kd_konbini','kd_angelsees','kd_card','kd_discharge','kd_checkup','kd_pins','kd_wrists'];
EVENTS.forEach(e=>{if(KD_OFF_GONE.includes(e.id)){const w=e.when;e.when=()=>kdSA()&&w()}});
['tx_kd_fine','tx_kd_selfie','tx_kd_adoc'].forEach(id=>{const t=TXS[id];if(t){const w=t.when;t.when=()=>kdSA()&&w()}});
const kdRec=(id,d,when,run)=>{kdEv2(id,d,()=>kdOff()&&(!when||when()),run);EVENTS[EVENTS.length-1].inj=1};
const kdHeal=n=>{const k=KD();k.rx=k.rx||{heal:0,pills:0,palmed:0};k.rx.heal+=(n||1);save()};
/* the infirmary, in this setting */
(function(){const R=ROOMS.medbay,hi=()=>kdClar()>=2,lo=()=>kdClar()<2;const wrap=(lab,fn)=>{const sp=R.spots.find(s=>s.label===lab);if(!sp)return;const a=sp.act;sp.act=function(){return kdOff()?fn.apply(this,arguments):a.apply(this,arguments)}};
 wrap('Their notes',()=>{S.f.kdChart=1;kdClarUp();save();say(KD_CHART.slice(0,1).concat([['','“Back: lacerations, see photographs. L foot: fracture. Wrists: ligature wounds, both, to the tendon. Scalp: 14 sutures. Two molars. Weight: minus 7 kg.”'],
   ['hitmeuppp','(that’s me. that’s my week. ok.)'],['','She reads it the way she reads a contract: what is broken, what it costs, how long. She adds a line at the bottom in pencil: “L hand: 3rd time.”']]))});
 wrap('Your chart',()=>{S.f.kdChart=1;save();say([['','Her own pencil note is still at the bottom: “L hand: 3rd time.” Under it, in fountain pen, V has written: “When were the first two?”'],['','Under that, in pencil: “dunno. before i was counting.”']])});
 wrap('The mirror',()=>{if(S.f.kdMirror)return say([['hitmeuppp','(swelling’s down on the eye. jaw’s going yellow. yellow’s the good colour.)']]);S.f.kdMirror=1;save();say([
   ['','She takes the towel down herself and has a proper look: the shaved patch and the fourteen stitches, the eye, the jaw, the gap where two teeth were.'],
   ['hitmeuppp',MV('(could be worse.)','(could be worse. has been.)','(It could be worse. It has been.)','(I’ve looked worse. I don’t remember when, but I know the face I make at it. That’s the face. I’ve made it before.)')],
   ['','She puts the towel in the laundry. She doesn’t need it.']])});
 wrap('Treatment trolley',()=>{const o=[],did=k=>S.done['kdRx_'+k],mark=k=>{S.done['kdRx_'+k]=1;S.done.kdRxN=(S.done.kdRxN||0)+1;save()};
  if((S.done.kdRxN||0)>=2)return say([['hitmeuppp','(two’s the limit. he says more is showing off.)']]);
  if(!did('dress'))o.push({t:'Dressings: wrists and back',sub:'healing',fn:()=>{mark('dress');kdHeal();say([['','V does the wrists. She talks him through it, because she has dressed wrists before: “not that tape, it pulls. the paper one.”'],['K9','Who taught you this?'],['hitmeuppp',MV('nobody.','nobody. u figure it out.','Nobody. You work it out.','Nobody taught me. You do it wrong a few times and then you do it right. I was probably eight. Hand me the paper one.')]])}});
  if(!did('pins'))o.push({t:'Clean the pin sites',sub:'hold still · healing',fn:()=>{mark('pins');kdTurn(ok=>{toRoom('medbay',[150,150]);if(ok)kdHeal();say([['',ok?'She keeps the hand flat and still and watches him swab round each pin, with interest, like it’s somebody else’s homework.':'The hand jumps when the swab catches. She says “ow, fuck,” in a normal voice, and holds it still for the rest.']])},{bg:kdDrawMed,title:'Left hand · pin sites',unit:'pins',hint:'Press E when the swab is clear of the pin.',ok:'Clean.',bad:'It catches.',fast:.2})}});
  if(!did('pills'))o.push({t:'Painkillers',sub:'two white tablets',fn:()=>{mark('pills');kdHeal();apply({energy:10});say([['','She takes them and says thank you. She takes painkillers when she is in pain. It is not complicated.']])}});
  if(!o.length)return say([['hitmeuppp','(done for today.)']]);ask('hitmeuppp','(V does the dressings. Two things a day.)',o.concat([{t:'Not now',fn:()=>{}}]))});
 wrap('The monitor',()=>{const h=(KD().rx||{heal:0}).heal;say([['',`Pulse ${118-Math.min(30,h*5)}, temperature 38.${Math.max(0,6-h)}. When V asks for a number out of ten she says six, and then, because he waits, seven.`],['hitmeuppp','(it’s a seven. sevens are fine. sevens go down.)']])});
 R.spots.push({at:[90,128],mark:[90,96],label:'The lightbox',show:()=>kdOff()&&hi(),act:()=>{if(S.f.kdOld)return say([['','The films are still up. Five breaks from this week, and four older ones, already healed, that nobody ever set.']]);S.f.kdOld=1;save();say([
   ['','V has put her films up on the lightbox: the hand, the ribs, the foot. The breaks from this week are bright and new.'],
   ['','There are others. The same hand, broken twice before and healed crooked without a cast. Two ribs on the right that knitted lumpy. A line in the left forearm. None of them was ever set. All of them happened before she was old enough to have a medical record, because she doesn’t have one.'],
   ['K9','Misaki. How old were you?'],
   ['hitmeuppp',MV('dunno.','dunno. small.','I don’t know. Small.','Don’t know. Little. They’re from before. I don’t have before. It’s fine, they healed, look, they’re all healed.')],
   ['','She is right: they all healed. He looks at them for the rest of the afternoon, after she has gone to sleep.']])}},
  {at:[200,150],mark:[200,140],label:'Walk the corridor',show:()=>kdOff()&&hi(),act:()=>{if(S.done.kdLap)return say([['hitmeuppp','(did my laps. foot says that’s it.)']]);S.done.kdLap=1;S.f.kdLaps=(S.f.kdLaps||0)+1;kdHeal();apply({energy:-6});save();
   say([['',`Laps of the sublevel-two corridor in the boot, one hand on the rail. ${[2,4,7,10,15][Math.min(4,S.f.kdLaps-1)]} today.`],['hitmeuppp',S.f.kdLaps>=3?'(faster than yesterday. the foot’s doing its job. good foot.)':'(slow. it’s fine. slow is how it goes for the first bit. i know how it goes.)']])}})})();
/* recovery, after the infirmary */
kdRec('kd_rec_list',1,null,done=>{const m=kdMe();say([
 ['',m?'V asks how she is. She tells him, in order, the way she would report a job.':'He asks how she is. She tells him, in order, the way she reports a job.'],
 ['hitmeuppp',MV('hand, ribs, foot, wrists, teeth.','hand’s broken, ribs are broken, foot’s broken, wrists are cut up, two teeth gone. eating’s fine.','Hand, three ribs, foot, both wrists, two teeth. I’m eating fine. Sleeping fine.','Left hand, third time. Three ribs, second time I think. Foot, first time, so that’s new. Wrists, teeth. Eating, sleeping, fine. Any questions.')],
 ['K9','“Third time.”'],
 ['hitmeuppp',MV('ya.','yeah. it’s a bad hand.','Yes. It’s an unlucky hand.','Yeah. It’s a bad hand. It goes. It’s gone before. You set it this time, so it’s already doing better than the other two.')],
 ['',m?'She says it the way you’d say it was going to rain. He writes it down, and his pen goes through the paper on “third.”':'She says it the way you would say it was going to rain. He writes it down, and his pen goes through the paper on “third.”']],()=>{kdHeal();done()})});
kdRec('kd_rec_stitches',2,null,done=>{const m=kdMe();say([
 ['',m?'The scalp stitches are ready. She takes them out herself in the bathroom with nail scissors and tweezers, by feel, in about four minutes.':'He finds her in the bathroom with nail scissors, taking out her own scalp stitches by feel. She has done eleven of the fourteen.'],
 ['','Under the new line, along the hairline, there are three old ones. Thin, white, years old, and badly done, as if somebody had closed them in a hurry with whatever was there.'],
 ['hitmeuppp',MV('done.','done. easy.','Done. Easy.','Done. I’m quick at these. I’ve done my own before, I think. My hands know where the knots are.')]],()=>ask(m?'hitmeuppp':'K9',m?'(Three old ones, under the new one.)':'(Three old scars, under the new one.)',m?[
  {t:'Show V how fast you are.',fn:()=>{apply({aff:1});kdHeal();say([['','She shows him the last three. He watches the scissors and not her face, and asks, carefully, who did the old ones.'],['hitmeuppp',MV('me probably.','me, probably. they’re bad enough.','Me, probably. They’re bad enough to be mine.','Me, probably. They’re bad enough to be mine. Or someone who didn’t care. Same result.')]],done)}},
  {t:'Put the scissors away and keep it to yourself.',fn:()=>{kdHeal();say([['','She drops the stitches in the bin. Nobody asked, and she doesn’t think of it as something anyone would ask about.']],done)}}]:[
  {t:'Hold the mirror for the last three.',fn:()=>{apply({aff:2});kdHeal();say([['','He holds the mirror. She does the last three without hurrying. He keeps his eyes on the old scars, and she lets him.']],done)}},
  {t:'Ask who did the old ones.',fn:()=>{apply({veng:4});say([['hitmeuppp',MV('dunno.','dunno. before.','I don’t know. Before.','Before. Somebody who was in a hurry, or me. It doesn’t matter. They closed.')],['K9','(It matters to me.)']],done)}}]))});
kdRec('kd_rec_ronin',2,()=>frT('r')>=1,done=>{say([
 [RN,'Brought you a get-well basket. Vet painkillers, three beers, a cookie shaped like a crowbar. Don’t cha cry.'],
 ['hitmeuppp','what’d the cookie cost'],
 [RN,'A guy. So, what’s the damage? Gimme the tally.'],
 ['hitmeuppp',MV('hand ribs foot wrists teeth.','hand, three ribs, foot, wrists, two teeth.','Hand, three ribs, foot, both wrists, two teeth.','Hand, three ribs, foot, wrists to the tendon, two teeth. And the hand’s the third time, so it doesn’t count, it’s a repeat.')],
 [RN,'Aw, that’s nothin’. I had a broken back once. Sat up the next day, had a cigarette. Third time for the hand, what, since when?'],
 ['hitmeuppp',MV('since before.','since before. little.','Since I was little.','Since before I was counting. I was little. It heals funny now, it’s used to it.')],
 ['','Ronin opens one of the beers and doesn’t drink it. He tells a story about the broken back instead, and the story gets longer and stupider the whole way through, until she is laughing through her nose and holding her ribs.']],()=>{fr('r',4);kdHeal();done()})});
kdRec('kd_rec_angel',3,()=>frT('a')>=1,done=>{say([
 ['','Angel cuts her hair around the shaved patch, so that it looks like she meant it.'],
 [AN,'does it hurt'],
 ['hitmeuppp',MV('yeah. normal amount.','yeah. a normal amount.','Yes. A normal amount.','Yeah. It hurts a normal amount. The head’s nothing, it’s the ribs, every time I breathe in. That’s normal for ribs.')],
 [AN,'what’s a normal amount for you'],
 ['hitmeuppp',MV('...more than u.','more than for you probably.','More than for you, probably.','More than yours, I think. I didn’t know that until I said it. Is that bad? Don’t answer, cut.')],
 ['','Angel cuts. Her hands are perfectly steady, and she doesn’t speak again until it’s finished, and then she says it’s the best she has ever looked, which is true.']],()=>{fr('a',4);done()})});
kdRec('kd_rec_vpins',3,null,done=>{const m=kdMe();say([
 ['','The pins come out. V does it on the kitchen island with a pair of pliers he boiled, because he has taken pins out of hounds and the procedure is the same.'],
 ['hitmeuppp',MV('k go.','ok. go. one, two—','Go on. I’m ready.','Go. Don’t count, just go. Counting’s worse. I know that one from somewhere.')],
 ['','He goes. She makes one sound on the first pin and none on the second. Then she flexes the hand, watches the two small holes, and asks whether she can keep the pins.']],()=>{kdHeal(2);if(KD().shake>0)KD().shake--;done()})});
kdRec('kd_rec_eat',4,null,done=>{const m=kdMe();say([
 ['','She is seven kilos down. V cooks four times a day, small, and leaves it where she will pass it.'],
 ['',m?'She eats all of it, steadily, without enjoying any of it, like filling a car. She has done this before. Putting weight back on after a bad few weeks is a thing she knows how to do.':'She eats all of it, steadily, like filling a car. She is good at this. Somebody has had to get good at putting weight back on.'],
 ['hitmeuppp',MV('two kilos back.','two kilos back. five to go.','Two kilos back. Five to go.','Two kilos in four days. That’s good going. The first time I did this I didn’t have someone cooking.')]],()=>{kdHeal();apply({energy:15});done()})});
kdRec('kd_rec_job',6,()=>kdMe(),done=>say([
 ['','First contract since. One hand and a boot. She sets up on a roof she knows, with the rifle on a bag because she can’t hold the fore-end.'],
 ['','It goes clean. On the way home she stops at a pharmacy and buys dressings and tape, the paper kind, without having to think about which aisle.'],
 ['hitmeuppp',MV('(easy.)','(easy. easier than some.)','(That was easy. I’ve worked worse hurt.)','(Easy. I’ve worked with worse than this, I think. Hands remember. Hands always remember.)')]],()=>{apply({edge:3,rep:1});done()}));
/* recovery as something to do: physio and walking, once a day each, until done */
const _shREC=sideHub;sideHub=function(late){const o=_shREC(late);if(!S||!kdOff()||!kdPost()||isLone()||S.phase!=='after')return o;const g=S.f.kdGripN||0,w=S.f.kdWalk||0;if(g>=6&&w>=6)return o;
 o.push({h:'Recovery'});
 if(g<6)o.push({t:'Physio: the hand',sub:S.done.kdPhys?'done today':`session ${g+1} of 6 · costs time`,dis:late||!!S.done.kdPhys,fn:()=>{spend();S.done.kdPhys=1;kdTurn(ok=>{if(ok){S.f.kdGripN=g+1;kdHeal()}save();go(cutBg('#0a0c0e'));
   say([['',ok?(g+1>=6?'She makes a full fist. It takes everything she has, and she holds it for a count of three.':'The ball, the putty, the rubber band. Ten of each. She does them while watching television, with the face she uses for tax forms.'):'The hand won’t do it today. She tries twice more and then stops, because she knows when to stop.'],
    S.pov==='v'?['K9',ok?'(She is doing them correctly. Nobody taught her.)':'(She stopped at the right point. Nobody taught her that either.)']:['hitmeuppp',ok?'(getting there.)':'(tomorrow.)']],hub)},{bg:()=>{rect(0,0,W,H,'#0e0c12')},title:'Left hand · physio',unit:'reps',hint:'Press E as the grip closes.',ok:'Good.',bad:'Not today.',fast:Math.max(0,.6-g*.1)})}});
 if(w<6)o.push({t:'Walk the hounds, a bit further',sub:S.done.kdWalk?'done today':`walk ${w+1} of 6 · costs time`,dis:late||!!S.done.kdWalk,fn:()=>{spend();S.done.kdWalk=1;S.f.kdWalk=w+1;kdHeal();if(w+1>=4&&KD().shake>0)KD().shake--;apply({energy:-8});save();go(cutBg('#0a0c0e'));
   say([['',`${['To the gate and back.','To the end of the drive.','Round the yard twice.','Down to the road.','The long loop, with one stop.','The long loop. No stops. The boot comes off for good tomorrow.'][w]} The four hounds keep to her pace without being told.`],w>=4?['hitmeuppp','(foot’s back. it always comes back.)']:['hitmeuppp','(slow. fine.)']],hub)}});
 return o};
const _xeINJ=extraEnding;extraEnding=function(){const L=_xeINJ();if(kdSA()||!S||!S.f||!S.kd||!S.kd.t0)return L;
 if(S.f.kdOld)L.push('Nine breaks on her films: five from that week, and four from before she was old enough to remember. V has a file on the first four. It is empty, and he keeps it anyway.');
 L.push((S.f.kdGripN||0)>=6?'The hand came back. She did the physio every day and never once complained, and she never asked who had taught her how.':'The hand closes most of the way. She works around it. She has worked around worse.');
 return L};
(function(){const i=KD_ORDER.indexOf('kd_count');KD_ORDER.splice(i+1,0,'kd_rec_list','kd_rec_stitches','kd_rec_ronin','kd_rec_angel','kd_rec_vpins','kd_rec_eat','kd_rec_job')})();

/* ---------- the setting itself ---------- */
const KD_SA_HELP='Kidnapping aftermath — <b>full story</b> includes a strand about what may have been done to Misaki during the hours she cannot remember: a doctor’s examination she refuses, photographs she denies, and what that implies. It is never shown or named. <b>Injuries only</b> removes that strand entirely; the aftermath is about her injuries and her treatment.';
const kdSALab=()=>'Kidnapping aftermath: '+(kdSA()?'full story':'injuries only');
const kdSAToggle=()=>{META.kdFull=kdSA()?0:1;saveMeta();toast(kdSALab())};
const _setSA=settings;settings=function(){_setSA.apply(this,arguments);const box=document.querySelector('.panel');if(!box)return;const p=document.createElement('p');p.innerHTML=kdSALab().replace(': ',': <b>')+'</b>';p.style.marginTop='6px';
 const h=document.createElement('p');h.className='hint';h.innerHTML=KD_SA_HELP;const first=box.querySelector('.opts');box.insertBefore(p,first);box.insertBefore(h,first);
 const opts=box.querySelector('.opts');if(opts){const o=document.createElement('div');o.className='opt';o.textContent='Kidnapping aftermath: switch to '+(kdSA()?'injuries only':'full story');o.onclick=()=>{kdSAToggle();settings()};opts.insertBefore(o,opts.lastElementChild)}};
const _pmSA=pauseMenu;pauseMenu=function(){_pmSA.apply(this,arguments);const box=document.querySelector('.pausebox .pbtns');if(!box)return;const b=document.createElement('button');b.textContent=kdSALab();b.title='Full story includes the strand about the hours she cannot remember. Injuries only removes it.';
 b.onclick=e=>{e.stopPropagation();kdSAToggle();b.textContent=kdSALab()};box.insertBefore(b,box.lastElementChild)};

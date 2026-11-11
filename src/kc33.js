/* ===================== THE WARD ROUND (td33) =====================
   The infirmary as a system, and a few more scenes around it.
   Treatment: S.kd.rx = {heal, pills, palmed}. Once she knows where she is (med.clar >= 2) the trolley offers up to two
   treatments a day: dressings, the pin sites (hold still), breathing on three broken ribs, and the painkillers she
   can take or hide in the bed frame. While she still thinks it is a cell the trolley is a tray of instruments and
   she will not let anyone near her with it, so a slow head means a slow body. heal sets how fast she walks after
   discharge (kdCond) and what the discharge note says. The monitor reads out what she will not. */
const kdRx=()=>{const k=KD();if(!k.rx)k.rx={heal:0,pills:0,palmed:0};return k.rx};
const _condKD=kdCond;kdCond=function(){const n=_condKD();if(!n||!S.kd||S.phase!=='after'||S.kd.med||!S.kd.rx)return n;const h=S.kd.rx.heal,d=S.day-S.kd.t0;
 if(h>=6)return Math.max(1,n-1);if(h<=1&&d<5)return Math.min(3,n+1);return n};
(function(){const R=ROOMS.medbay,lo=()=>kdClar()<2,hi=()=>kdClar()>=2,back=x=>toRoom('medbay',[x||150,150]);
 const did=k=>S.done['kdRx_'+k],mark=k=>{S.done['kdRx_'+k]=1;S.done.kdRxN=(S.done.kdRxN||0)+1;save()};
 R.spots.push({at:[150,170],mark:[150,160],label:'A tray of instruments',show:lo,act:()=>ask('hitmeuppp','(Scissors. Forceps. Something with a hook. All laid out in a row.)',[
   {t:'Take the scissors.',fn:()=>{S.f.kdScissors=1;save();say([['','She takes the scissors and puts them under the mattress with the blades open. Whoever comes for her next gets them.'],['','They are bandage scissors. The ends are rounded, so that they can’t cut the patient.']])}},
   {t:'Tip the tray over.',fn:()=>{calm(-2);say([['','It makes a great deal of noise. Nobody comes running. After a while somebody on the other side of the door says, quietly, “I will bring another.”']])}},
   {t:'Leave it.',fn:()=>{}}])},
  {at:[150,170],mark:[150,160],label:'Treatment trolley',show:hi,act:()=>{const rx=kdRx();if((S.done.kdRxN||0)>=2)return say([['hitmeuppp','(that’s enough being poked for one day. the doctor said two. i heard her.)']]);
   const o=[];
   if(!did('dress'))o.push({t:'Dressings: wrists and back',sub:'healing',fn:()=>{mark('dress');rx.heal++;save();say([['','The doctor does her wrists and then asks her to turn round. Misaki looks at the wall and tells it about a pigeon she once saw eat a whole chip.'],
     ['hitmeuppp',MV('doesn’t hurt.','doesn’t hurt. is it meant to?','It doesn’t hurt. Is it supposed to?','It doesn’t hurt. I keep waiting for it to, and it just doesn’t. Is that good? Don’t answer.')],
     ['','The doctor says that it is supposed to. She writes something down.']])}});
   if(!did('pins'))o.push({t:'The hand: clean the pin sites',sub:'hold still · healing',fn:()=>{mark('pins');kdTurn(ok=>{back(150);if(ok)rx.heal++;calm(ok?1:-2);save();say([['',ok?'She holds the hand flat on the towel and does not move it while the doctor works round each pin with a swab.':'The hand jumps. The swab catches a pin, and the pin moves, and she watches it move.'],
       ['hitmeuppp',ok?'(see. easy. it’s not even mine, it’s just a hand on a towel.)':'(huh. that went all the way up my arm. interesting.)']])},{bg:kdDrawMed,title:'Left hand · pin sites',unit:'pins',hint:'Press E when the swab is clear of the pin.',ok:'Clean.',bad:'It catches.',fast:.2})}});
   if(!did('ribs'))o.push({t:'Breathe. All the way in, on three broken ribs.',sub:'healing',fn:()=>{mark('ribs');(kdAuto()?f=>f(kdAuto()>0):ground)(ok=>{back(150);if(ok)rx.heal++;save();say([['',ok?'Ten full breaths, and she gets to the top of every one. The doctor says most people stop at four.':'She stops at four. The doctor says most people do.'],
       ['hitmeuppp',ok?'(most people are babies.)':'(got bored. it didn’t hurt. i got bored.)']])})}});
   if(!did('pills'))o.push({t:'The painkillers',sub:'two white tablets in a paper cup',fn:()=>ask('hitmeuppp','(The cup has “not a sedative — V.” written on it.)',[
     {t:'Take them.',fn:()=>{mark('pills');rx.pills++;rx.heal++;apply({energy:10});save();say([['','She takes them with the soup. Twenty minutes later the room is the same room, and she understands that she had been holding every muscle she owns.'],['hitmeuppp','(oh. ...that’s what not hurting is. ok. so the other thing was hurting.)']])}},
     {t:'Palm them. You don’t need them.',fn:()=>{mark('pills');rx.palmed++;kdDeny();save();say([['','She puts them in her cheek and then under the mattress, in the bed frame, the way she kept the screw.'],['hitmeuppp','(don’t need them. nothing hurts.)']])}}])});
   if(!o.length)return say([['hitmeuppp','(done all of it. i’m a model patient. write that down.)']]);
   ask('hitmeuppp','(The doctor will do two things a day and no more.)',o.concat([{t:'Not now',fn:()=>{}}]))}},
  {at:[40,140],mark:[40,128],label:'A machine that beeps',show:lo,act:()=>say([['','A screen with a green line on it. It beeps each time the line jumps.'],['hitmeuppp','(it’s counting something. me, probably. hope i’m expensive.)']])},
  {at:[40,140],mark:[40,128],label:'The monitor',show:hi,act:()=>{const rx=kdRx();say([['',`Pulse ${118-Math.min(30,rx.heal*5)}, sitting still. Temperature 38.${Math.max(0,6-rx.heal)}. The doctor asked her this morning for a number out of ten, and she said two.`],
    ['',rx.palmed?`The machine has no line for tablets. There ${rx.palmed>1?'are '+rx.palmed*2:'are two'} under the mattress.`:'On the clipboard beside it somebody has written “pt reports 2” and, next to that, in fountain pen, a question mark.'],
    ['hitmeuppp',MV('two’s generous.','it’s a two. maybe a one.','It’s a two. I said two. I’d know.','Two. I’ve been shot, I know what a seven is. This is a two with a cast on.')]])}},
  {at:[232,170],mark:[232,160],label:'The small fridge',show:hi,act:()=>{if(S.f.kdKit)return say([['','Soup, labelled by day. The white box is still on the bottom shelf'+(S.f.kdKit==='turned'?', with its label to the back.':'.')]]);
    say([['','Soup, in eleven tubs, labelled by day in fountain pen. On the bottom shelf there is a sealed white box with her name on it, a date, and COLLECT WITHIN 5 DAYS.']],()=>ask('hitmeuppp','(A box with your name on it.)',[
     KD_NO('Ask what the box is for.'),
     {t:'Take Thursday’s soup. Shut the door.',fn:()=>{kdDeny();S.f.kdKit='seen';save();say([['hitmeuppp','(it’s for the hounds. everything down here’s for the hounds.)']])}},
     {t:'Turn the box so the label faces the back.',fn:()=>{kdDeny();S.f.kdKit='turned';save();say([['','She turns it round. Now it is a white box. The date is still on the lid, and she has read it, and she can count to five.']])}}]))}});
})();
/* V's side: she is treated when she lets herself be */
const _mmKD=kdMedMorning;kdMedMorning=function(done){const k=S.kd;if(k&&k.med&&S.pov==='v'&&k.med.clar>=2){const rx=kdRx();rx.heal+=2;rx.pills++}
 if(k&&k.med&&k.med.d>=2&&!S.f.kdNoteDue){S.f.kdNoteDue=1}return _mmKD(done)};
kdEv('kd_discharge',()=>S.f.kdNoteDue&&!S.f.kdNote&&S.kd.rx,done=>{S.f.kdNote=1;save();const rx=S.kd.rx,m=kdMe();
 say([['','The doctor leaves a discharge note on the kitchen table, one page.'],
  ['',rx.heal>=6?'“Compliant. Dressings daily, pin care daily, full breaths. Ahead of where I would expect.”':rx.heal>=3?'“Partly compliant. Refused treatment on the first day; believed herself to be elsewhere. Has made up some of the ground.”':'“Refused most treatment. For the first two days she did not know where she was and would not be touched. Walking will be slow. Do not let her tell you otherwise.”'],
  rx.palmed?['',`“Analgesia: ${rx.palmed*2} tablets recovered from the bed frame, in a row. She reports no pain. I do not believe her and I would like someone to count them out to her.”`]:['','“Analgesia taken as given. Reports pain 2/10. See monitor record.”'],
  ['hitmeuppp',rx.palmed?MV('snitch.','she went through my BED. snitch.','She went through my bed. That’s a violation.','She searched my bed frame. I hid a screw in one of those for three days and nobody found it. She’s better than they were.'):MV('model patient.','“compliant.” that’s me. frame it.','“Compliant.” Put that on the fridge.','“Compliant.” Nobody has ever called me that. Put it on the fridge next to March.')],
  m?null:['K9',rx.palmed?'(I will count them out to her. She will take them if a hound is watching.)':'(She let herself be looked after. I had not been sure that she would.)']].filter(Boolean),done)});
kdEv2('kd_kitgone',3,()=>S.f.kdKit&&!S.f.kdTold&&(S.f.kd_last||!S.f.kd_window||!kdMe()),done=>{const m=kdMe();say([
 ['','The white box has gone from the bottom shelf of the infirmary fridge. The date on it was yesterday. Somebody has wiped the shelf.'],
 ['hitmeuppp',MV('more room for soup.','more room for soup. good.','Good. More room for soup.','Good. That shelf was wasted. You can get four tubs on there now.')],
 ['',m?'She counted the five days. She could tell anyone the hour that it ran out, and she isn’t going to.':'She counted the five days. He watched her do it, a finger at a time, on the hand that works.']],()=>{kdDeny();done()})});
/* ---------- more ---------- */
/* Maria, on camera, while she was gone */
EVENTS.push({id:'kd_maria',when:()=>S.phase==='taken'&&S.pov==='v'&&S.f.called&&!S.f.kdMaria,run:done=>{S.f.kdMaria=1;S.f.angelHelp=1;save();say([
 ['','At nine Maria de la Rosa goes live to two million people in a cream cardigan, with her hair done.'],
 ['Angelic','“This is a little different from what I usually do on this channel. Someone very important to me is missing. I’d appreciate it if you could give me any leads.”'],
 ['','She tries for a smile, because the channel has only ever seen her happy. It shakes. The tips come in by the minute: a grey van, no plates, the east bank.'],
 ['','When the stream ends she takes the cardigan off, picks the shotgun up from behind the ring light, and checks that it is loaded.'],
 [AN,'i’ve got forty sightings and a fish market. none of them can say they didn’t have it coming. which warehouse, V.']],done)}});
kdEv2('kd_vod',2,()=>kdMe()&&frT('a')>=1,done=>say([
 ['','She finds the stream from the Wednesday she was gone. Maria is in a cream cardigan, asking two million people for leads in a voice Misaki has never heard her use on anyone.'],
 ['','At forty-one minutes Maria stops talking and looks at something off camera for nine seconds. The chat fills with hearts. Misaki knows that look. It is the one Angel has before she goes out with the shotgun.'],
 ['hitmeuppp',MV('she cried on MAIN.','she cried on main. for me. on a monetised stream.','She cried on her main channel. For me. With ads on.','She cried on main, with the ads on, in the good cardigan. And then she went and killed somebody. I’ve never been so flattered.')]],()=>ask('hitmeuppp','(1.2 million views.)',[
  {t:'Text her: “nice cardigan”',fn:()=>{fr('a',4);phQueue('a',['don’t','i looked SO sad. sad doesn’t get engagement. rage does','...it did numbers though. u were good for the channel. never do it again or i’ll kill u myself'],0);done()}},
  {t:'Watch all forty-one minutes again.',fn:()=>{calm(3);fr('a',2);say([['','She watches it twice more. Nobody has ever looked for her on camera before.']],done)}}])));
/* Ronin wants one of them, and wants her to say which */
kdEv2('kd_roncrow',3,()=>frT('r')>=1&&S.list&&S.list.some(x=>!x.st&&!x.gone),done=>{const m=kdMe();const left=S.list.filter(x=>!x.st&&!x.gone&&x.id!=='water');
 say([[RN,'So there’s a list. Vee showed me. Real neat handwriting, like a fuckin’ wedding invite.'],
  [RN,m?'I want one. Pick. I’ll even let you watch, I’m generous like that.':'I want one of ’em, Vee. I ain’t askin’ which. I’m askin’ if you’re gonna be a prick about it.']],()=>ask(m?'hitmeuppp':'K9',m?'(He’s swinging the crowbar by its hook.)':'(He is swinging the crowbar by its hook, in the atrium, near a Monet.)',[
   {t:m?'“the driver. he sang.”':'“The driver. He sang the whole way.”',dis:!left.some(x=>x.id==='driver'),fn:()=>{const x=S.list.find(x=>x.id==='driver');x.st=1;S.f.kdRonGot='driver';fr('r',4);save();say([[RN,'A singer. Aw. I’ll have him do a number first.'],['','Two days later a voice note arrives. It is forty seconds of a man trying to sing a bank jingle and not being allowed to finish it.'],[RN,'Purgatory, please and thank you. One less on your list.']],done)}},
   {t:m?'“none. they’re mine.”':'“None. They are hers and mine.”',fn:()=>{fr('r',1);apply({veng:4});save();say([[RN,'Selfish. Fine. You got yourself in this fuckin’ mess, you get t’clean it.'],[RN,'I’m still comin’ to watch. Bringin’ a chair.']],done)}},
   {t:m?'“surprise me.”':'“Take whichever you find first.”',dis:!left.length,fn:()=>{const x=pk(left);x.st=1;S.f.kdRonGot=x.id;fr('r',3);save();say([[RN,'Oh, I like that. I like a lucky dip.'],['',`He takes ${x.n.replace(/^T/,'t')}. Nobody hears how. The line on the list is crossed out in something that isn’t ink.`]],done)}}]))});
kdEv('kd_checkup',()=>S.phase!=='after'&&!S.f.kdCheckup&&S.f.kdNote,done=>{S.f.kdCheckup=1;save();const rx=S.kd.rx||{heal:0},d=S.kd.deny||0;say([
 ['','The doctor comes for the monthly check. Weight: up three kilos of the seven. Pulse at rest: '+(d>=6?'104':'82')+'.'],
 ['','She asks for a number out of ten.'],
 ['hitmeuppp',MV('two.','two. same as always.','Two. It’s always two.','Two. It’s been two since March. Write two.')],
 ['',d>=6?'The doctor writes “2” and, beside it, the resting pulse. She underlines the pulse.':rx.heal>=6?'The doctor writes “2.” For the first time she does not put a question mark after it.':'The doctor writes “2?” and asks to see her make a fist.']],done)});
const _xeKD7=extraEnding;extraEnding=function(){const L=_xeKD7();if(!S||!S.f||!S.kd||!S.kd.t0)return L;const rx=S.kd.rx;
 if(rx&&rx.palmed)L.push('She never took a painkiller that she could hide instead. V counts them out to her in front of a hound, which works about half the time.');
 if(S.f.kdRonGot)L.push('One name on the list was crossed out by Ronin. He has never said how, and he tells the story at every brunch.');
 return L};
/* the new spots, drawn */
(function(){const M=TD.maps.medbay;if(!M)return;const lo=()=>kdClar()<2;const add=p=>{p.map=M;if(p.solid===undefined)p.solid=!p.flat&&!p.wall;M.props.push(p)};
 add({id:'mb_cab',x:36,y:102,w:14,d:18,h:24,legacy:['Steel cabinet','Supply cabinet'],draw:(x,y)=>{tdBox(x,y,14,18,24,lo()?'#4a4a50':'#d8d4c8',lo()?'#2a2a2e':'#a8a498');rect(x+2,y-4,10,18,lo()?'#1a2226':'#c8e0e8');for(let k=0;k<3;k++)rect(x+2,y+k*6,10,1,lo()?'#3a3a40':'#8a8478')}});
 add({id:'mb_mon',wall:1,x:62,y:20,w:16,d:26,legacy:['A machine that beeps','The monitor'],draw:(x,y)=>{rect(x,y+2,16,12,'#1a1a1e');rect(x+1,y+3,14,10,'#06120c');const t=(T>>1)%14;for(let i=0;i<14;i++)rect(x+1+i,y+8-(i===t?4:i===t+1?-2:0),1,1,'#5fd48a')}});
 add({id:'mb_trolley',x:116,y:110,w:18,d:9,h:11,legacy:['A tray of instruments','Treatment trolley'],draw:(x,y)=>{tdBox(x,y,18,9,11,'#b8b8c0','#6a6a74');rect(x+1,y+7,2,3,'#3a3a3a');rect(x+15,y+7,2,3,'#3a3a3a');rect(x+3,y-10,12,1,lo()?'#e8e8f0':'#ece4da');if(lo())for(let k=0;k<4;k++)rect(x+4+k*3,y-9,1,5,'#e8e8f0');else rect(x+4,y-9,6,4,'#ffffff')}});
 add({id:'mb_fridge',x:206,y:84,w:14,d:12,h:18,legacy:'The small fridge',show:()=>kdClar()>=2,draw:(x,y)=>{tdBox(x,y,14,12,18,'#ece4da','#c8c0b0');rect(x+11,y,1,8,'#8a8478')}});
 const ball=M.props.find(p=>p.id==='mb_ball');if(ball)ball.x=98})();

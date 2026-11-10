/* ===================== PHONE 2: threads that branch, calls you can miss ===================== */
const PNM={v:'V',m:'Misaki',a:'Angel',r:'Ronin'};
const PHONE={sel:null};
const phMe=()=>S&&S.pov==='v'?'v':'m';
const phNow=()=>S.day*4+S.slot;
function phS(){if(!S.tx)S.tx={th:{},un:{},q:[],run:{},calls:{},out:{},log:[]};return S.tx}
const phAlive=k=>!(S.phase==='taken'&&(k==='m'||phMe()==='m'))&&!(S.lone==='m'&&k==='v')&&!(S.lone==='v'&&k==='m');
const phContacts=()=>['v','m','a','r'].filter(k=>k!==phMe()&&phAlive(k));
function phPush(k,who,t){const P=phS();(P.th[k]=P.th[k]||[]).push([who,t,S.day]);if(P.th[k].length>60)P.th[k].shift();if(who==='t'){P.un[k]=(P.un[k]||0)+1}}
function phQueue(k,lines,delay,mark){const P=phS();let at=phNow()+(delay||0);lines.forEach(t=>P.q.push({k,t,at}));if(mark)P.q.push({k,at,mark})}
function phDeliver(){if(!S)return;const P=phS();const n=phNow();const due=P.q.filter(x=>x.at<=n);if(!due.length)return;P.q=P.q.filter(x=>x.at>n);let last=null;
 due.forEach(x=>{if(x.mark){const r=P.run[x.mark.tid];if(r){r.node=x.mark.node;r.await=1;const nd=TXS[x.mark.tid].nodes[x.mark.node];r.exp=nd.expire?n+nd.expire:null}return}phPush(x.k,'t',x.t);last=x});
 if(last){toast('✉ '+PNM[last.k]+': '+String(last.t).slice(0,34)+(String(last.t).length>34?'…':''));S.unread=Math.min(9,(S.unread||0)+1);sfx('chime');drawHud()}save()}
/* threads: data-driven, every option can change something that is checked later */
const TXS={};const TXSL=[];
function txDef(id,o){o.id=id;TXS[id]=o;TXSL.push(o)}
function txStart(id){const P=phS();P.run[id]={node:null,await:0};const nd=TXS[id].nodes.start;phQueue(TXS[id].with,nd.in(),nd.delay||0,{tid:id,node:'start'});save()}
function txChoose(id,opt){const P=phS(),T=TXS[id],r=P.run[id];r.await=0;phPush(T.with,'me',typeof opt.say==='function'?opt.say():opt.say||opt.t);if(opt.fx)opt.fx();
 const rep=opt.reply?opt.reply():[];if(opt.next){const nd=T.nodes[opt.next];phQueue(T.with,rep.concat(nd.in()),opt.delay||0,{tid:id,node:opt.next})}else{phQueue(T.with,rep,opt.delay||0);r.done=1}save();phDeliver()}
function txTick(){if(!S||S.dark&&S.phase==='taken')return;const P=phS(),n=phNow();
 for(const id in P.run){const r=P.run[id];if(r.await&&r.exp&&n>=r.exp){const nd=TXS[id].nodes[r.node];r.await=0;r.done=1;r.missed=1;if(nd.onExpire)nd.onExpire()}}
 if(P.lastStart===S.day)return;const cand=TXSL.filter(t=>!P.run[t.id]&&phAlive(t.with)&&t.with!==phMe()&&(!t.pov||t.pov===phMe())&&(()=>{try{return t.when()}catch(e){return false}})());
 if(cand.length&&Math.random()<.55){const t=cand.sort((a,b)=>(b.prio||0)-(a.prio||0))[0];P.lastStart=S.day;txStart(t.id)}}
/* calls */
const CALLS=[];function call(o){CALLS.push(o)}
function phRing(c){const P=phS();P.calls[c.id]=S.day;save();sfx('chime');setTimeout(()=>sfx('chime'),350);
 ask(PNM[c.from],`<b>📞 ${PNM[c.from]} is calling…</b>`+(c.hint?`<br><span class="hint">${c.hint()}</span>`:''),[
  {t:'Answer',fn:()=>{phPush(c.from,'sys','📞 Call · answered');c.answer(()=>{save();phAfterCall()})}},
  {t:'Decline',fn:()=>{phPush(c.from,'sys','📞 Missed call');if(c.miss)c.miss();save();phAfterCall()}}])}
function phAfterCall(){if(scene&&scene.td)return;hub()}
function phCallTick(){if(!S||dlg||ctrl)return;const P=phS();if(P.callDay===S.day)return;const c=CALLS.find(c=>phAlive(c.from)&&c.from!==phMe()&&P.calls[c.id]===undefined&&(()=>{try{return c.when()}catch(e){return false}})());if(!c||Math.random()>.5)return;P.callDay=S.day;setTimeout(()=>{if(!dlg&&!ctrl)phRing(c)},700)}
const OUT={};function outcall(k,list){OUT[k]=list}
function phCallOut(k){const P=phS();P.out[k+S.day]=1;save();phPush(k,'sys','📞 You called');const L=(OUT[k]||[]).find(o=>{try{return o.when()}catch(e){return false}});if(L)return L.run(()=>{save();phone('dm')});
 say([[k==='v'?'K9':k==='m'?'hitmeuppp':k==='a'?AN:RN,pk(k==='r'?['The fuck d’you want? ...Nah, I’m kidding. Kinda. Make it quick, I’m elbow-deep in somethin’.','You’re callin’ me? On the phone? Like a fuckin’ grandma? Shit, go on then.']:k==='a'?['i can’t move my face, i’m in a mask. so you talk. make it good, i’m starving.','mid-shoot. maria’s smiling at a lens and i’d rather be biting someone. call me in an hour.']:k==='v'?['Hello. Nothing is wrong? Good. Stay on the line; I am working, and I find I work better with you there.','You called. I was about to call you. Speak; I am merely cleaning up.']:['WHAT. who died. nobody? ok good. no ur not interrupting. ok u totally are. stay on.','oh fuck u CALLED. nobody calls unless someone’s dead. is someone dead. ok talk.'])]],()=>phone('dm'))}
/* the Messages tab */
function phThreadHTML(k){const P=phS();const me=phMe();const L=(P.th[k]||[]).slice(-14);
 return `<div class="thread">${L.map(([w,t,d])=>w==='sys'?`<div class="hint" style="align-self:center">${t}</div>`:`<div class="bub ${w==='me'?'me':'them'}">${t}</div>`).join('')||'<p class="hint">No messages yet.</p>'}</div>`}
const _dmLone=dmTab;dmTab=function(){if(isLone())return _dmLone();phDeliver();const P=phS();
 if(!PHONE.sel||!phContacts().includes(PHONE.sel)){PHONE.sel=null;const rows=phContacts().map(k=>{const L=P.th[k]||[];const last=L.filter(x=>x[0]!=='sys').slice(-1)[0];const pend=Object.keys(P.run).some(id=>TXS[id].with===k&&P.run[id].await);
   return `<div class="bub them" style="max-width:100%"><b>${PNM[k]}</b>${P.un[k]?` <b class="badge">${P.un[k]}</b>`:''}${pend?' <span style="color:var(--blood)">· needs a reply</span>':''}<br><span class="hint">${last?(last[0]==='me'?'you: ':'')+String(last[1]).slice(0,52):'—'}</span></div>`}).join('');
  return{html:`<div class="thread">${rows}</div>`,opts:phContacts().map(k=>({t:'Open '+PNM[k],sub:P.un[k]?P.un[k]+' new':'',fn:()=>{PHONE.sel=k;P.un[k]=0;save();phone('dm')}}))}}
 const k=PHONE.sel;P.un[k]=0;const opts=[];
 Object.keys(P.run).forEach(id=>{const r=P.run[id];if(TXS[id].with!==k||!r.await)return;const nd=TXS[id].nodes[r.node];(nd.opts().filter(o=>!o.ok||o.ok())).forEach(o=>opts.push({t:'↳ '+o.t,sub:o.sub||'',fn:()=>{txChoose(id,o);phone('dm')}}))});
 if(!P.out[k+S.day]&&!S.dark)opts.push({t:'📞 Call '+PNM[k],sub:'once a day',fn:()=>phCallOut(k)});
 if((k==='v'||k==='m')&&!S.done.dm&&!opts.some(o=>o.t.startsWith('↳'))){const side=phMe();(DMOPT[side]||[]).forEach(([kk,f])=>{const t=side==='m'?mVoice(f()):f();opts.push({t:'“'+t+'”',sub:'small talk · '+kk,fn:()=>{phPush(k,'me',t);S.done.dm=1;S.done.reply=1;const r=DMREP[side][kk]();phQueue(k,[side==='v'?mVoice(r):r],1);save();phone('dm')}})})}
 opts.push({t:'← All messages',fn:()=>{PHONE.sel=null;phone('dm')}});
 return{html:`<h3 style="margin:2px 0">${PNM[k]}</h3>`+phThreadHTML(k)+(opts.some(o=>o.t.startsWith('↳'))?'<p class="hint">They’re waiting on you.</p>':''),opts}};
const _hubPH=hub;hub=function(){if(S&&!isLone()){phDeliver();txTick()}_hubPH();if(S&&!isLone())phCallTick()};
/* ============ THE THREADS ============ */
const MEp=()=>phMe()==='v'?'K9':'hitmeuppp';
/* Misaki ↔ V: the job she didn't mention */
txDef('tx_vjob',{with:'v',pov:'m',prio:3,when:()=>tier()>=1&&S.phase==='normal'&&S.f&&Object.keys(S.f).some(f=>f.startsWith('done_')),nodes:{
 start:{in:()=>['You took the Shinjuku contract.'],expire:3,onExpire:()=>{S.f.vDrove=S.day;relApply&&relApply({tension:6})},
  opts:()=>[{t:'“yeah. and?”',fx:()=>{relApply({tension:5});S.f.vJob='cold'},reply:()=>['Nothing. Noted.']},
   {t:'“i was careful. want the details?”',fx:()=>{relApply({trust:4});S.f.vJob='open'},reply:()=>['Only the exit. The rest is your craft and I will not insult it.'],next:'exit'},
   {t:'“how the fuck do u know that”',reply:()=>['The police scanner. You were on it for four minutes. They did not have your face.'],next:'how'}]},
 how:{in:()=>['I was listening. It is a small trespass, set beside following you.'],opts:()=>[
   {t:'“it’s not small, v.”',fx:()=>{relApply({tension:3,trust:2});S.f.vJob='boundary'},reply:()=>['You are right. I will turn it off when you work. You will have to tell me when you work.'],next:'deal'},
   {t:'“...ok fine. creepy. kinda hot. carry on.”',fx:()=>{apply({aff:2});S.f.vJob='open'},reply:()=>['I intend to.']}]},
 deal:{in:()=>['Deal?'],opts:()=>[{t:'“deal. i’ll text u before.”',fx:()=>{S.f.vJobDeal=1;relApply({trust:6})},reply:()=>['Good. If you are late I will assume the worst, and I act on my assumptions.']},{t:'“no deal. trust me.”',fx:()=>{S.f.vJobDeal=0;relApply({tension:2})},reply:()=>['Then I will trust you. I find it difficult. I will do it regardless.']}]},
 exit:{in:()=>['Which way did you leave?'],opts:()=>[{t:'“roof. next roof. bakery. i got a melonpan, it was sick.”',fx:()=>{apply({aff:3});S.f.vJobShare=1},reply:()=>['Serviceable. Nobody looks twice at a woman carrying bread. Thank you for telling me.']},{t:'“front door, babe. nobody ever looks at the front door.”',fx:()=>{S.f.vJobShare=1;relApply({tension:2})},reply:()=>['Everybody looks at the front door, Misaki. I will show you three others tonight.']}]}}});
/* V ↔ Misaki: the rent, from his side */
txDef('tx_mrent',{with:'m',pov:'v',prio:3,when:()=>S.phase==='normal'&&S.day>=3&&(S.paid||0)<2,nodes:{
 start:{in:()=>['ok hypothetically. if someone was 6000 yen short. because a client is a lying fuck who doesn’t pay','asking for a friend','the friend is a cactus'],expire:2,onExpire:()=>{S.f.mRentIgnored=1},
  opts:()=>[{t:'“I will cover it.”',reply:()=>['NO. i said HYPOTHETICALLY. seriously!'],next:'pride'},
   {t:'“What do you require of me?”',fx:()=>{relApply({trust:4});S.f.mRent='listen'},reply:()=>['nothing. ugh. just say it’ll be fine so i can stop doing math.'],next:'fine'},
   {t:'“I could leave it under your mat.”',fx:()=>{relApply({tension:6});S.f.mRent='mat'},reply:()=>['if i find money under my mat i’m feeding it to the chainsaw. i’m serious v.']}]},
 pride:{in:()=>['i don’t take money from u. people who owe people end up on my list. i’m not going on urs.'],opts:()=>[
   {t:'“Then let me hire you. The foundation has a job.”',fx:()=>{S.f.mRent='job';S.yen=(S.yen||0)+6000;apply({aff:2})},reply:()=>['what kind of job. who’s the target','...there’s no target?? it’s just WATCHING a building?? for a whole night???','fine. FINE. boring as shit. i’m invoicing u. with a logo.']},
   {t:'“Understood. The rule stands.”',fx:()=>{relApply({trust:5});S.f.mRent='respect'},reply:()=>['good. i’ll figure it out. i’ll go shake down a debtor, whatever. life is so unfair.']}]},
 fine:{in:()=>[],opts:()=>[{t:'“It will be fine.”',fx:()=>apply({aff:2}),reply:()=>['ok. ok. totally buying it. tell anyone i asked and ur dead.']},{t:'“It will be fine. I will make sure.”',fx:()=>relApply({tension:2}),reply:()=>['NO. no making sure. u say it and then u do nothing. babe.']}]}}});
/* Ronin: a 2am pickup */
txDef('tx_rpick',{with:'r',prio:2,when:()=>frT('r')>=1&&!S.dark&&S.phase!=='taken'&&S.day>=4,nodes:{
 start:{in:()=>['need a driver tonight. 2am. no fuckin’ questions.','bring gloves. real ones. show up in dish gloves and you’re walkin’ home.'],expire:2,onExpire:()=>{S.f.ronAlone=S.day},
  opts:()=>[{t:'“i’ll drive.”',fx:()=>{S.f.ronDrive=S.day},reply:()=>['course you will. knew you couldn’t fuckin’ resist me.']},
   {t:'“can’t. be careful.”',fx:()=>{S.f.ronAlone=S.day;fr('r',-1)},reply:()=>['careful. sure. sucks t’be you, you’re gonna miss a hell of a show.']},
   {t:phMe()==='m'?'“i’m telling v.”':'“I am calling the police.”',ok:()=>phMe()==='v'||tier()>=1,fx:()=>{S.f.ronTold=S.day;fr('r',-3);if(phMe()==='v')relApply({rivalry:8});else relApply({trust:3})},reply:()=>phMe()==='v'?['you fuckin’ WOULDN’T.','...shit. you would. fine. i’m stayin’ in. you owe me a crumble, asshole.']:['SNITCH.','great. he just called. now he’s comin’ with me. like doin’ a job with a fuckin’ hall monitor. thanks a lot.']}]}}});
/* Ronin to V at 3am: June */
txDef('tx_rjune',{with:'r',pov:'v',prio:1,when:()=>frT('r')>=1&&(S.rivalry||0)<70,nodes:{
 start:{in:()=>['vee. you up. course you’re fuckin’ up.'],expire:2,
  opts:()=>[{t:'“I am working.”',reply:()=>['workin on what. charity. world domination. same shit w you.']},
   {t:'“What do you want, Ronin.”',reply:()=>['nothin. got june stuck in my head. it’s 3am, who else am i gonna bug.'],next:'june'}]},
 june:{in:()=>[],opts:()=>[{t:'“Tell me about her.”',fx:()=>{fr('r',4);relApply({rivalry:-6});S.f.vJune=1},reply:()=>['she bit a kid for callin’ me a freak. she was nine, he was twelve. took a fuckin’ chunk out of him.','she’d have liked you. she liked any weirdo in a coat in summer.']},{t:'“Go to sleep, Ronin.”',fx:()=>fr('r',-1),reply:()=>['yeah yeah. fuck you too. night.']}]}}});
/* Angel: did anyone ask about me (only if Misaki kept the secret) */
txDef('tx_ahurt',{with:'a',pov:'m',prio:4,when:()=>S.f.angelSecret&&S.phase!=='taken'&&!S.f.toldAngel,nodes:{
 start:{in:()=>['quick question and i want a real answer','did anyone ask about me. when they had u.'],expire:2,onExpire:()=>{S.f.angelGhosted=1;fr('a',-3)},
  opts:()=>[{t:'“yes. fuck. i gave them ur building. i’m sorry.”',fx:()=>{S.f.toldAngel=1;S.f.angelSecret=0;fr('a',2)},reply:()=>['...','ok.','i knew. i wanted to hear u say it. the man who came knocking is mine now, so don’t waste guilt on him.']},
   {t:'“no. why?”',fx:()=>{S.f.angelLie=1;fr('a',-1)},reply:()=>['no reason. forget i asked 💅']},
   {t:'“can i call u instead”',reply:()=>['call. now.'],fx:()=>{S.f.angelCallOwed=1}}]}}});
/* V to Misaki: the roof */
txDef('tx_vroof',{with:'v',pov:'m',prio:1,when:()=>tier()>=2&&S.slot>=2&&!S.dark,nodes:{
 start:{in:()=>['Are you awake.'],expire:1,opts:()=>[{t:'“yeah”',reply:()=>['Come up to the roof.'],next:'roof'},{t:'“why. who died”',reply:()=>['The moon is unusually large. I have looked at it alone for an hour and I find that insufficient.'],next:'roof'}]},
 roof:{in:()=>[],opts:()=>[{t:'“omw”',fx:()=>{S.f.roofTonight=S.day;apply({aff:3})},reply:()=>['I brought the blanket with the dog on it.']},{t:'“too tired. tmrw?”',reply:()=>['Tomorrow it will be smaller. Goodnight, Misaki.']}]}}});
/* ============ CALLS ============ */
call({id:'c_angel3am',from:'a',when:()=>frT('a')>=1&&S.slot>=2&&!S.dark&&S.phase!=='taken',hint:()=>'It’s very late.',
 answer:done=>say([[AN,'you’re awake. good. i had the dream again. the one with the comments.'],[AN,S.f.mariaKnown?'two million people love maria and not one of them would last a minute with me. i’m sick of wearing her at 3am.':'stay on the line while i make tea. i’m not asking.']],()=>ask(MEp(),'(...)',[
  {t:'Stay on the line until she falls asleep.',fn:()=>{fr('a',4);S.f.angelStayed=1;say([['','She makes tea and narrates it, then narrates what she’d do to her top commenter, in order, and somewhere around his teeth she falls asleep with the phone on the pillow.']],done)}},
  {t:'“want me to come over?”',fn:()=>{fr('a',5);apply({energy:-8});S.f.angelVisit=S.day;say([[AN,'yes. bring the bad snacks. hurry up.'],['','You sit on her kitchen floor until five eating the bad snacks. She doesn’t put her face on once.']],done)}},
  {t:'“tell me about the dream.”',fn:()=>{fr('a',3);say([[AN,'it’s the comments. read out loud in my mother’s voice. that’s the whole dream. it’s pathetic.'],[MEp(),phMe()==='v'?'Then it is two cruelties. Give me the usernames.':'babe ur mom’s voice is a fucking horror movie. want me to shoot the commenters. i do discounts.'],[AN,'don’t tempt me. i have a list.']],done)}}])),
 miss:()=>{S.f.angelMissed=S.day;phQueue('a',['never mind. go back to sleep 💤'],0)}});
call({id:'c_vjob',from:'v',when:()=>phMe()==='m'&&tier()>=1&&S.done&&S.done.job&&S.slot>=2&&S.f.vJobDeal!==0,hint:()=>'You just got home from a job.',
 answer:done=>say([['K9','Are you home.'],['hitmeuppp','yeah. how the fuck did u'],['K9',S.f.vJobDeal?'You texted before you went in. That was two hours and eleven minutes ago. I counted them.':'The scanner. I am aware. Are you hurt.']],()=>ask('hitmeuppp','(...)',[{t:'“i’m fine. totally fine. talk to me a sec.”',fn:()=>{apply({aff:3,heat:-3});say([['K9','About what?'],['hitmeuppp','anything. the dogs, whatever.'],['','He tells you about the dogs for forty minutes. Your hands stop shaking somewhere around Mochi.']],done)}},{t:'“i’m fine. goodnight.”',fn:()=>say([['K9','Goodnight, Misaki.']],done)}])),
 miss:()=>{relApply({tension:3});phQueue('v',['Answer. I do not enjoy assuming.'],0)}});
call({id:'c_ronlift',from:'r',when:()=>phMe()==='v'&&frT('r')>=1&&S.slot>=2,hint:()=>'Ronin never calls.',
 answer:done=>say([[RN,'Vee. Need a lift. Car park behind the bowlin’ alley. Leave the fuckin’ coat at home, whole city knows that coat.']],()=>ask('K9','(...)',[{t:'Go.',fn:()=>{fr('r',5);relApply({rivalry:-6});S.f.vRonLift=1;say([['','He’s sitting on the kerb with a split lip and a shit-eating grin, somebody else’s blood drying on his skull rings. He volunteers nothing and you let him. He falls asleep in your passenger seat and drools on the upholstery.']],done)}},{t:'“Call a taxi, Ronin.”',fn:()=>{fr('r',-2);say([[RN,'A taxi. Wow. Fuck you very much, Vee.']],done)}}])),
 miss:()=>{S.f.vRonMissed=S.day}});
call({id:'c_mlate',from:'m',when:()=>phMe()==='v'&&tier()>=2&&S.slot>=2&&!S.f.movedIn,hint:()=>'Misaki doesn’t call. She texts.',
 answer:done=>say([['hitmeuppp','hi. nobody’s dead. can’t sleep. talk at me.']],()=>ask('K9','(...)',[{t:'Read her something until she sleeps.',fn:()=>{apply({aff:4});say([['','You read her the first chapter of Persuasion. She falls asleep at “Sir Walter Elliot”. You keep reading anyway.']],done)}},{t:'“Do you want me to come over?”',fn:()=>{apply({aff:3});say([['hitmeuppp',MV('no. yes. NO. stay on the phone.','no. stay on the phone. if u come over i have to clean, seriously.','No. Stay there. You can’t see my face from there and it’s doing something stupid.','No. Stay right there. I’ve told you more about my day than I’ve told anyone, ever, and if you show up I’ll make a joke and wreck it.')]],done)}}])),
 miss:()=>{phQueue('m',['nvm. night'],0);relApply({tension:2})}});
/* outgoing calls with something to say */
outcall('a',[{when:()=>S.f.angelCallOwed&&!S.f.toldAngel,run:done=>{S.f.angelCallOwed=0;ask('hitmeuppp','Angel picks up on the first ring. She doesn’t say hello.',[{t:'Tell her the truth about the building.',fn:()=>{S.f.toldAngel=1;S.f.angelSecret=0;fr('a',3);say([[AN,'okay. you said it out loud. good. i’d have got it out of you eventually and you wouldn’t have liked how.'],[AN,'you’re still the panda.']],done)}},{t:'Hang up.',fn:()=>{S.f.angelLie=1;say([['','You hang up. She texts “??” and then nothing.']],done)}}])}}]);
outcall('v',[{when:()=>phMe()==='m'&&S.f.vDrove===S.day,run:done=>say([['hitmeuppp','ur car is outside my trailer.'],['K9','Yes.'],['hitmeuppp','go home v. seriously!'],['K9','I am going.']],()=>{relApply({tension:3});done()})}]);
/* ============ PAYOFFS ============ */
EVENTS.push(
 {id:'pay_vdrove',when:()=>S.f.vDrove&&S.day>S.f.vDrove&&!S.seen.pay_vdrove2&&isM(),run:done=>{S.seen.pay_vdrove2=1;say([['','You didn’t answer his text. Last night there was a car idling at the end of the lot until two. You know the engine.'],['hitmeuppp',MV('(he drove by. i ghost one text and he DROVE BY. wtf.)','(i didn’t answer so he came to look. creep. i slept like a baby, which is so fucked.)','(One unanswered text and he’s parked outside like a stalker. I’m pissed. I also slept great, so, whatever, fuck me I guess.)','(He came because I went quiet. I’m going to yell at him about it, seriously, and then I’m probably going to have to say thanks, which is totally unfair.)')]],done)}},
 {id:'pay_ronalone',when:()=>S.f.ronAlone&&S.day>S.f.ronAlone&&!S.seen.pay_ronalone2,run:done=>{S.seen.pay_ronalone2=1;const bad=frT('r')<2;fr('r',bad?-2:0);say(bad?[['','Ronin turns up at noon with eleven stitches over one eyebrow and a bag of oranges.'],[RN,'Went alone. Went fine. Other guy’s in a ditch, so who’s countin’ stitches. Oranges are mine, don’t fuckin’ touch ’em.']]:[[RN,'(text) went fine. didn’t need you. you missed a real pretty mess. bringin’ crumble anyway, don’t make it weird.']],done)}},
 {id:'pay_rondrive',when:()=>S.f.ronDrive&&S.day>S.f.ronDrive&&!S.seen.pay_rondrive2,run:done=>{S.seen.pay_rondrive2=1;fr('r',5);apply(isM()?{edge:2,heat:4}:{heart:-2});say([['','2am. You drive. Ronin goes into a warehouse with a crowbar and an empty duffel and comes out with a full one and a man’s car keys.'],[RN,'Don’t look in the bag. Or do, I don’t give a shit, but you’re cleanin’ your own puke outta the car.'],['','He tips you in apple crumble. It’s still warm.']],done)}},
 {id:'pay_angellie',when:()=>S.f.angelLie&&!S.seen.pay_angellie2&&S.day>=(S.f.angelLieDay||0),run:done=>{S.seen.pay_angellie2=1;fr('a',-2);say([['','Angel posts a story: her old building, the front door, a single word over it. “moved.” Nothing else. You watch it four times.']],done)}},
 {id:'pay_roof',when:()=>S.f.roofTonight===S.day-1&&!S.seen['pay_roof'+S.day],run:done=>{S.seen['pay_roof'+S.day]=1;say([['','Last night: the roof, the blanket with the dog on it, a moon so big it looked fake.'],['K9','(He didn’t say anything for an hour. Neither did you. Your leg went dead under the dog blanket and you left it there.)']],done)}});
const _xePH=extraEnding;extraEnding=function(){const L=_xePH();if(!S||!S.f)return L;
 if(S.f.vJobDeal===1)L.push('She texts him before every job: “going in.” He texts back “Noted.” and does not put the phone down until she is home.');
 if(S.f.angelLie)L.push('Misaki told Angel “no” when she asked. Angel never asked again. She moved buildings, bought a second lock, and still saves Misaki the panda mask.');
 if(S.f.angelStayed)L.push('Angel still calls at 3am sometimes. She doesn’t say why any more. The call just stays open until one of them falls asleep.');
 if(S.f.vJune)L.push('V knows about June now. Ronin has promised to break his jaw if he ever brings her up, and texts him about her at 3am anyway.');
 return L};

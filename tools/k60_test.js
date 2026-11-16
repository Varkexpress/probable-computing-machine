/* kc60: every event, option, thread, topic, spot and side option of the arrangement / flight school / infirmary module,
   both POVs. Usage: node tools/k60_test.js [repo root] */
const ROOT=process.argv[2]||require('path').resolve(__dirname,'..');
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];
p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+ROOT+'/index.html');await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);
await p.evaluate(()=>{globalThis.KD_AUTO=1;document.querySelectorAll('.splash').forEach(e=>e.remove())});
const ev=(f,a)=>p.evaluate(f,a);let bad=0,runs=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
/* drain dialogue, choosing option `pick` at the first menu and 0 after; spec.ev runs an EVENTS entry, spec.fn any code with cb */
await ev(()=>{window.__drain=(pick,lines,opts)=>{let first=1;for(let k=0;k<60;k++){for(let i=0;i<400&&dlg;i++){try{const t=document.querySelector('.dlg');if(t)lines.push(t.textContent.slice(0,60))}catch(e){}adv()}
  if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt')];const en=os.filter(o=>!o.classList.contains('dis'));if(!en.length)break;opts.push(os.map(o=>(o.classList.contains('dis')?'×':'')+o.textContent.slice(0,28)).join(' / '));
   const o=os[Math.min(first?pick:0,os.length-1)];(o.classList.contains('dis')?en[0]:o).click();first=0;continue}if(!dlg)break}}});
const play=(spec)=>ev(spec=>{const lines=[];const opts=[];window.__done=0;
 try{if(spec.setup)(new Function(spec.setup))();
  if(spec.ev){const e=EVENTS.find(e=>e.id===spec.ev);if(!e)return {err:'no event '+spec.ev};let w;KD_RUN=1;try{w=e.when()}finally{KD_RUN=0}
   S.seen[e.id]=1;e.run(()=>{window.__done=1});__drain(spec.pick||0,lines,opts);return {w,done:window.__done,opts,n:lines.length,f:spec.flags?spec.flags.map(k=>S.f[k]):null}}
  if(spec.fn){(new Function('cb',spec.fn))(()=>{window.__done=1});__drain(spec.pick||0,lines,opts);return {done:window.__done,opts,n:lines.length,f:spec.flags?spec.flags.map(k=>S.f[k]):null}}
 }catch(e){return {err:e.message+' '+(e.stack||'').split('\n')[1]}}},spec);
const load=i=>ev(i=>{benchLoad(BENCH[i]);for(let k=0;k<80&&dlg;k++)adv();if(ctrl&&ctrl.close)try{ctrl.close()}catch(e){}},i);
const R=async(label,spec,check)=>{runs++;const r=await play(spec);if(r.err)ok(0,label+' ERR '+r.err);else{ok(r.done,label+' not done '+JSON.stringify(r));if(check)ok(check(r),label+' check '+JSON.stringify(r))}if(process.env.V)console.log(label,JSON.stringify(r).slice(0,300));return r};
const clr='["a60_server","a60_list","a60_quiet","a60_hurt","a60_body","a60_hounds","a60_epi","lp60_listing","lp60_dress","lp60_fly"].forEach(k=>{S.f[k]=0;S.seen[k]=0});';
const base=clr+'S.dark=0;S.lone=null;S.f.abroad=0;if(S.kd)S.kd.med=null;S.fr={a:60,r:60};S.aff=100;S.talks={};';

/* ---------- normal phase ---------- */
for(const [bi,pov] of [[0,'m'],[1,'v']]){await load(bi);
 const nm=base+'S.phase="normal";S.day=8;';
 await R(`server ${pov}`,{ev:'a60_server',setup:nm,flags:['a60Rule']},r=>r.w&&r.f[0]===1);
 for(const pick of [0,1])await R(`list ${pov} pick${pick}`,{ev:'a60_list',pick,setup:nm+'S.f.a60Rule=1;',flags:['a60Hounds']},r=>r.w&&r.f[0]===(pick?'quiet':'said'));
 await R(`quiet ${pov} normal`,{ev:'a60_quiet',setup:nm+'S.f.a60Rule=1;'},r=>r.w);
 for(const pick of (pov==='m'?[0,1]:[0]))await R(`listing ${pov} pick${pick}`,{ev:'lp60_listing',pick,setup:nm,flags:['lp60Dress']},r=>r.w&&r.f[0]===(pick?'keep':'show'));
 await R(`dress ${pov}`,{ev:'lp60_dress',setup:nm+'S.f.lp60_listing=1;S.f.lp60Dress="show";S.f.lp60Day=S.day-3;',flags:['lp60Sold']},r=>r.w&&r.f[0]===1);
 /* not in the wrong phases */
 const gate=await ev(nm=>{(new Function(nm))();const id=['a60_hurt','a60_body','a60_hounds','a60_epi','lp60_fly'];return id.filter(i=>EVENTS.find(e=>e.id===i).when())},nm);ok(gate.length===0,'gated in normal '+gate);
 /* the scheduler: a morning plays the server beat, not again the next day; the side menu offers the next one */
 const sch=await ev(nm=>{(new Function(nm))();S.f.a60Last=-9;S.f.a60Day=0;S.f.k58Last=S.day;S.f.mbN=0;if(typeof W59B!=="undefined")W59B.forEach(b=>S.seen[b.id]=1);let ran=0;morningEvent(()=>{ran=1});const L=[],O=[];__drain(0,L,O);const a=!!S.f.a60_server;
  S.day+=1;const gap=S.day-(S.f.a60Last||-9)<2;S.slot=1;S.done={};S.f.a60Side=0;const nx=a60Next();const o=sideHub(false).filter(o=>nx&&o.t===nx.side&&o.sub==='costs time · the four of you');let side=null;
  if(o.length){o[0].fn();__drain(0,L,O);side=o[0].t}const again=sideHub(false).filter(o=>o.sub==='tomorrow'&&o.dis).length;return {a,gap,side,again,l:S.f.a60_list}},nm);
 ok(sch.a&&sch.gap&&sch.side&&sch.again===1,'scheduler '+pov+JSON.stringify(sch));
 /* infirmary-time and lone exclusions */
 const ex=await ev(nm=>{(new Function(nm))();S.f.a60_server=0;S.lone='v';const a=!!a60Next();S.lone=null;S.dark=1;const b=!!a60Next();S.dark=0;return [a,b]},nm);ok(!ex[0]&&!ex[1],'exclusions '+ex);
}
/* ---------- Act II ---------- */
for(const [bi,pov] of [[2,'m'],[3,'v']]){await load(bi);
 const a2=base+'S.phase="act2";S.day=(S.act2Start||15)+3;';
 await R(`quiet ${pov} act2`,{ev:'a60_quiet',setup:a2+'S.f.a60Rule=1;'},r=>r.w);
 await R(`hurt ${pov} act2`,{ev:'a60_hurt',setup:a2},r=>r.w);
 await R(`body ${pov}`,{ev:'a60_body',setup:a2},r=>r.w);
 await R(`listing ${pov} act2`,{ev:'lp60_listing',setup:a2,flags:['lp60Dress']},r=>r.w);
}
/* ---------- Act III ---------- */
for(const [bi,pov] of [[4,'m'],[5,'v']]){await load(bi);
 const a3=base+'S.phase="act3";S.day=S.a3.start+3;';
 for(const pick of [0,1])await R(`hounds ${pov} pick${pick}`,{ev:'a60_hounds',pick,setup:a3,flags:['a60Env']},r=>r.w&&r.f[0]===(pick?'bed':'ok'));
 await R(`hurt ${pov} act3`,{ev:'a60_hurt',setup:a3},r=>r.w);
}
/* ---------- epilogue ---------- */
for(const [bi,pov] of [[6,'m'],[7,'v']]){await load(bi);
 const ep=base+'S.phase="epilogue";';
 await R(`epi ${pov}`,{ev:'a60_epi',setup:ep},r=>r.w);
 for(const pick of [0,1])await R(`fly ${pov} pick${pick}`,{ev:'lp60_fly',pick,setup:ep+'S.f.lp60_listing=1;',flags:['lp60Fly']},r=>r.w&&r.f[0]===(pick?'once':'more'));
 /* topics, from both lists, after kc69's sync */
 for(const [id,list,who] of [['lp60_t_why','M','v'],['lp60_t_now','V','m']])for(const drew of [0,1]){const r=await ev(([id,list,who,drew,ep])=>{(new Function(ep))();S.pov=who;S.f.lp60_listing=1;S.seen.lore_architect=drew;const t=(list==='V'?TOPICS_V:TOPICS_M).find(t=>t.id===id);if(!t)return 'missing';const sh=t.show();let d=0;t.run(()=>{d=1});const L=[],O=[];__drain(0,L,O);const sh2=t.show();return sh&&d&&!sh2?'ok':'show'+sh+' d'+d+' after'+sh2},[id,list,who,drew,ep]);ok(r==='ok','topic '+id+drew+' '+r)}
 /* ending lines */
 const L=await ev(()=>{S.f.a60_list=1;S.f.kd60_rule=1;S.f.a60Env='bed';S.f.kd60Page='keep';S.f.lp60Fly='more';S.f.lp60_listing=1;const a=extraEnding().filter(x=>/list \(final\)|If I am dead|night before the river|Thursdays/.test(x)).length;S.f.lp60Fly=null;const b=extraEnding().some(x=>/dead seller page/.test(x));return [a,b]});
 ok(L[0]===4&&L[1],'ending lines '+L);
}
/* ---------- threads, every path ---------- */
await load(0);
const thr=await ev(()=>{const out=[];const walk=(id,node)=>{const nd=TXS[id].nodes[node];const L=nd.in();if(!L.length)out.push('empty '+id);nd.opts().forEach((o,i)=>{if(o.ok&&!o.ok()){out.push(id+'/'+node+i+':gated');return}if(o.fx)o.fx();const rep=o.reply?o.reply():[];out.push(id+'/'+node+i+':'+rep.length);if(o.next)walk(id,o.next)})};
 ['tx_a60_body','tx_a60_bodyv','tx_a60_will','tx_a60_willv','tx_lp60_v','tx_a60_after','tx_a60_grey'].forEach(id=>walk(id,'start'));return out});
console.log('threads',thr.join(' '));ok(!thr.some(x=>/gated|empty/.test(x))&&thr.length>=17,'threads');
const tw=await ev(()=>{const r={};S.dark=0;S.lone=null;S.f.abroad=0;if(S.kd)S.kd.med=null;S.fr={a:60,r:60};
 S.phase='normal';S.day=8;S.pov='m';r.body=TXS.tx_a60_body.when();S.f.a60_list=1;r.will=TXS.tx_a60_will.when();S.pov='v';r.bodyv=TXS.tx_a60_bodyv.when();r.willv=TXS.tx_a60_willv.when();S.f.lp60_listing=1;r.lp=TXS.tx_lp60_v.when();
 S.phase='act2';S.f.kd60_rule=1;r.after=TXS.tx_a60_after.when();r.grey=TXS.tx_a60_grey.when();return r});
ok(Object.values(tw).every(Boolean),'thread whens '+JSON.stringify(tw));
/* through the real phone, both sides */
for(const [bi,id,k] of [[0,'tx_a60_body','r'],[1,'tx_a60_bodyv','r'],[0,'tx_a60_grey','v'],[1,'tx_a60_after','m']]){await load(bi);const r=await ev(([id,k])=>{S.dark=0;S.lone=null;S.fr={a:60,r:60};S.f.kd60_rule=1;S.phase=/grey|after/.test(id)?'act2':'normal';S.day=8;S.slot=0;const w=TXS[id].when();txStart(id);S.slot=3;phDeliver();PHONE.sel=k;
  let n=0;for(let g=0;g<3;g++){const t=dmTab();const o=t.opts.filter(o=>o.t.startsWith('↳'));if(!o.length)break;n+=o.length;o[0].fn();S.slot++;phDeliver();for(let i=0;i<50&&dlg;i++)adv()}if(ctrl&&ctrl.close)try{ctrl.close()}catch(e){}return [w,n,phS().run[id].done]},[id,k]);ok(r[0]&&r[1]>=2&&r[2],'phone '+id+JSON.stringify(r))}

/* ---------- the infirmary, Misaki ---------- */
await load(0);
const med='S.captor=S.captor||captorOrg();S.takenDay=S.takenDay||S.day-6;S.pov="m";S.dark=0;S.lone=null;S.phase="after";if(!S.kd)KD();S.kd.days=6;S.kd.med={d:1,clar:2,run:0,sev:0};S.done={};S.f.a60Srv=0;S.f.a60WR=0;';
for(const full of [1,0]){
 const r=await ev(([med,full])=>{(new Function(med))();META.kdFull=full;const out={};for(const lab of ['The server','V’s shirt','Count the stitches']){const sp=ROOMS.medbay.spots.find(s=>s.label===lab);out[lab]=sp.show()?1:0;if(sp.show()){const L=[],O=[];sp.act();__drain(0,L,O);out[lab]+=':'+L.length+(sp.show()?':still':'')}}
  S.kd.med.clar=0;out.lo=['The server','V’s shirt','Count the stitches'].filter(l=>ROOMS.medbay.spots.find(s=>s.label===l).show()).length;return out},[med,full]);
 console.log('medbay full'+full,JSON.stringify(r));
 ok(/^1:\d+$/.test(String(r['The server']))||full===0,'server spot '+JSON.stringify(r));
 ok(full?(/^1:\d+$/.test(String(r['V’s shirt']))&&r['Count the stitches']===0):(/^1:\d+$/.test(String(r['Count the stitches']))&&r['V’s shirt']===0),'setting spots '+JSON.stringify(r));
 ok(r.lo===0,'spots hidden while deluded '+r.lo)}
await ev(()=>{META.kdFull=1});
/* worst route, still deluded: the rule, once, after the state-of-mind scene */
const wr=await ev(med=>{(new Function(med))();S.kd.med={d:2,clar:0,run:0,sev:9};S.comp=30;S.f.kdMindDay=S.day;const w=kdWR();const L=[],O=[];hub();__drain(0,L,O);const a=S.f.a60WR;const L2=[];try{hub()}catch(e){}__drain(0,L2,O);return {w,a,n:L.length,n2:L2.length,txt:L.slice(0,2)}},med);
console.log('wr',JSON.stringify(wr));ok(wr.w&&wr.a===1&&wr.n>=4,'worst-route rule '+JSON.stringify(wr));
/* not on a milder stay */
const wr2=await ev(med=>{(new Function(med))();S.kd.med={d:2,clar:0,run:0,sev:2};S.f.kdMindDay=S.day;const L=[],O=[];try{hub()}catch(e){}__drain(0,L,O);return S.f.a60WR},med);ok(!wr2,'no rule scene on a mild stay');
/* ---------- the infirmary, V: the kennel corridor, three nights, each variant ---------- */
await load(1);
for(const [full,sev] of [[1,0],[0,0],[1,9]]){const r=await ev(([full,sev])=>{S.captor=S.captor||captorOrg();S.pov='v';S.dark=0;S.lone=null;S.phase='after';if(!S.kd)KD();S.kd.med={d:1,clar:2,run:0,sev};META.kdFull=full;S.f.a60Cor=0;const out=[];
  for(let n=0;n<4;n++){S.done={};S.slot=1;const o=sideHub(false).find(o=>o.t==='The kennel corridor, at night');if(!o){out.push('none');continue}const L=[],O=[];o.fn();__drain(0,L,O);out.push(L.length+':'+A60COR[n]()[0][1].slice(0,14));
   if(n===0){const again=sideHub(false).find(o=>o.t==='The kennel corridor, at night');out.push(again&&again.dis?'dis':'?')}}return out},[full,sev]);
 console.log('corridor',full,sev,r.join(' | '));ok(r.length===5&&r[1]==='dis'&&r[4]==='none'&&!r.slice(0,4).some(x=>/^0:/.test(x)),'corridor '+full+sev+' '+r);
 const third=r[3]||'';ok(sev?/Two in the/.test(third):/At two in/.test(third),'corridor night three variant '+third);
 const second=r[2]||'';ok(full?/At four/.test(second):/At three/.test(second),'corridor night two variant '+second)}
await ev(()=>{META.kdFull=1});
const vNoM=await ev(()=>{S.pov='m';return sideHub(false).some(o=>o.t==='The kennel corridor, at night')});ok(!vNoM,'corridor is V only');

/* ---------- afterwards ---------- */
const post='S.phase="after";if(!S.kd)KD();S.kd.med=null;S.kd.t0=S.day-14;S.kd.days=6;S.dark=0;S.lone=null;S.fr={a:60,r:60};S.f.kd60_rule=0;S.f.kd60_vpage=0;S.f.kd60_wr=0;';
for(const [bi,pov] of [[2,'m'],[3,'v']]){await load(bi);
 for(const rule of [1,0])await R(`kd60_rule ${pov} rule${rule}`,{ev:'kd60_rule',setup:post+`S.f.a60Rule=${rule};`},r=>r.w&&r.n>=10);
 for(const sev of [9,2]){const r=await R(`kd60_wr ${pov} sev${sev}`,{ev:'kd60_wr',setup:post+`S.kd.sev0=${sev};`},r=>sev?true:true);ok(sev>=8?r.w:!r.w,'kd60_wr gate '+sev+' '+r.w)}
 if(pov==='v')for(const pick of [0,1])await R(`vpage pick${pick}`,{ev:'kd60_vpage',pick,setup:post,flags:['kd60Page']},r=>r.w&&r.f[0]===(pick?'keep':'burn'));
 else{const r=await ev(post=>{(new Function(post))();const e=EVENTS.find(e=>e.id==='kd60_vpage');KD_RUN=1;try{return e.when()}finally{KD_RUN=0}},post);ok(!r,'vpage V only')}
 /* the aftermath scheduler reaches them */
 const kn=await ev(post=>{(new Function(post))();S.kd.sev0=9;EVENTS.filter(e=>e.kd&&!/^kd60_/.test(e.id)).forEach(e=>S.seen[e.id]=1);['kd60_rule','kd60_vpage','kd60_wr'].forEach(k=>S.seen[k]=0);const a=kdNext();return a&&a.id},post);
 ok(kn===(pov==='v'?'kd60_vpage':'kd60_rule'),'kdNext '+pov+' '+kn);
}
const ord=await ev(()=>['kd60_vpage','kd60_rule','kd60_wr'].map(k=>KD_ORDER.indexOf(k)));ok(ord.every(i=>i>=0)&&ord[1]<ord[2],'KD_ORDER '+ord);
/* small things */
const sm=await ev(()=>[PINGS.filter(p=>/pilot btw|chainsaw if i die/.test(p[1])).length,AP_NOTES.filter(n=>/pink|WHO’S NEXT|unclaimed/.test(n[1])).length]);ok(sm[0]===2&&sm[1]===3,'pings/notes '+sm);
console.log('runs',runs,'page errors',errs.length);errs.slice(0,10).forEach(e=>console.log('  ',e));
console.log(bad||errs.length?'K60 FAIL '+bad:'K60 OK');await b.close();process.exit(bad||errs.length?1:0)})();

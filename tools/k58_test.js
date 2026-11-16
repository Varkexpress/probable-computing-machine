/* kc58: every event, option, thread, topic and side option of the V–Misaki through-line, both POVs. */
const ROOT=require('path').resolve(__dirname,'..');
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];
p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+ROOT+'/index.html');await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);
await p.evaluate(()=>{globalThis.KD_AUTO=1;document.querySelectorAll('.splash').forEach(e=>e.remove())});
const ev=(f,a)=>p.evaluate(f,a);let bad=0,runs=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
/* runs an event (or any function taking a callback), choosing option `pick` at the first menu and 0 after */
const play=(spec)=>ev(spec=>{const lines=[];const opts=[];window.__done=0;
 const drain=()=>{let first=1;for(let k=0;k<60;k++){for(let i=0;i<400&&dlg;i++){try{const t=document.querySelector('.dlg');if(t)lines.push(t.textContent.slice(0,40))}catch(e){}adv()}
   if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt')];const en=os.filter(o=>!o.classList.contains('dis'));if(!en.length)break;opts.push(os.map(o=>(o.classList.contains('dis')?'×':'')+o.textContent.slice(0,28)).join(' / '));
    const want=first?spec.pick:0;const o=os[Math.min(want,os.length-1)];(o.classList.contains('dis')?en[0]:o).click();first=0;continue}if(!dlg)break}};
 try{if(spec.setup)(new Function(spec.setup))();
  if(spec.ev){const e=EVENTS.find(e=>e.id===spec.ev);if(!e)return {err:'no event '+spec.ev};let w;KD_RUN=1;try{w=e.when()}finally{KD_RUN=0}
   S.seen[e.id]=1;e.run(()=>{window.__done=1});drain();return {w,done:window.__done,opts,f:spec.flags?spec.flags.map(k=>S.f[k]):null}}
  if(spec.fn){(new Function('cb',spec.fn))(()=>{window.__done=1});drain();return {done:window.__done,opts,f:spec.flags?spec.flags.map(k=>S.f[k]):null}}
 }catch(e){return {err:e.message+' '+(e.stack||'').split('\n')[1]}}},spec);
const load=i=>ev(i=>{benchLoad(BENCH[i]);for(let k=0;k<80&&dlg;k++)adv();if(ctrl&&ctrl.close)try{ctrl.close()}catch(e){}},i);
const R=async(label,spec,check)=>{runs++;const r=await play(spec);if(r.err)ok(0,label+' ERR '+r.err);else{ok(r.done,label+' not done '+JSON.stringify(r));if(check)ok(check(r),label+' check '+JSON.stringify(r))}if(process.env.V)console.log(label,JSON.stringify(r).slice(0,300));return r};
const base='S.f.k58_stair=0;S.f.k58_book=0;S.f.k58_first=0;S.dark=0;S.phase="normal";S.day=8;S.rom=null;S.vrom=null;S.f.k28pair=null;S.f.married=0;S.f.heartbreak=0;';

/* ---------- before ---------- */
for(const [bi,pov] of [[0,'m'],[1,'v']]){await load(bi);
 for(const part of ['', 'S.rom="r";', 'S.rom="a";', 'S.vrom="r";', 'S.vrom="a";'])for(const pick of [0,1])
  await R(`stair ${pov} ${part} pick${pick}`,{ev:'k58_stair',pick,setup:base+part,flags:['k58Stair']},r=>r.w&&r.f[0]===(pick?'over':'his'));
 for(const st of ['his','over'])for(const pick of [0,1,2])if(pov==='m'||pick<2)
  await R(`book ${pov} ${st} pick${pick}`,{ev:'k58_book',pick,setup:base+`S.f.k58_stair=1;S.f.k58Stair="${st}";`,flags:['k58Book']},r=>r.w&&r.f[0]===['read','keep','wrote'][pick]);
 for(const bk of ['read','keep'])for(const pick of [0,1])
  await R(`first ${pov} ${bk} pick${pick}`,{ev:'k58_first',pick,setup:base+`S.f.k58_stair=1;S.f.k58Book="${bk}";`,flags:['k58First']},r=>r.w&&r.f[0]===1);
 /* the scheduler: day 2 morning plays the stair first, not again the next day */
 const sch=await ev(base=>{(new Function(base))();S.day=2;S.f.k58Last=-9;S.f.k58Day=0;S.f.movedIn=1;let ran=0;morningEvent(()=>{ran=1});for(let i=0;i<400&&dlg;i++)adv();if(ctrl&&ctrl.box)ctrl.box.querySelector('.opt').click();for(let i=0;i<400&&dlg;i++)adv();
   const a=!!S.f.k58_stair;S.day=3;S.f.k58Day=0;const e=K58N.find(e=>e.when());return {a,gap:S.day-(S.f.k58Last||-9)<2,next:e&&e.id}},base);
 ok(sch.a&&sch.gap,'scheduler '+pov+JSON.stringify(sch));
 /* topics before */
 for(const id of ['k58_t_first','k58_t_last']){const r=await ev(([id,pov])=>{S.pov=pov;S.phase='normal';S.f.k58First=1;S.f.k58_book=1;S.dark=0;S.talks={};const L=id==='k58_t_first'?TOPICS_M:TOPICS_V;const t=L.find(t=>t.id===id);if(!t)return 'missing';const sh=t.show();let d=0;t.run(()=>{d=1});for(let i=0;i<200&&dlg;i++)adv();return sh&&d?'ok':'show'+sh+' d'+d},[id,pov]);ok(r==='ok','topic '+id+' '+r)}
}
/* threads before, every path */
await load(0);
const thr=await ev(()=>{const out=[];const walk=(id,node,path)=>{const nd=TXS[id].nodes[node];const L=nd.in();if(!L.length)out.push('empty '+id);nd.opts().forEach((o,i)=>{if(o.ok&&!o.ok()){out.push(id+'/'+node+i+':gated');return}S.f.k58Rule=null;if(o.fx)o.fx();const rep=o.reply?o.reply():[];out.push(id+'/'+node+i+':'+rep.length+(S.f.k58Rule?':'+S.f.k58Rule:''));if(o.next)walk(id,o.next)});if(nd.onExpire)nd.onExpire()};
 S.f.k58Stair='his';for(const id of ['tx_k58_late','tx_k58_kettle','tx_k58_rule','tx_k58_before'])walk(id,'start');return out});
console.log('threads',thr.join(' '));ok(!thr.some(x=>/gated|empty/.test(x)),'threads');
/* a thread through the real phone, both sides */
for(const [bi,id,k] of [[0,'tx_k58_late','v'],[1,'tx_k58_kettle','m']]){await load(bi);const r=await ev(([id,k])=>{S.phase='normal';S.f.k58_stair=1;S.f.k58Stair='his';S.day=8;S.slot=0;const w=TXS[id].when();txStart(id);S.slot=3;phDeliver();PHONE.sel=k;const t=dmTab();const o=t.opts.filter(o=>o.t.startsWith('↳'));if(o.length)o[o.length-1].fn();for(let i=0;i<50&&dlg;i++)adv();if(ctrl&&ctrl.close)try{ctrl.close()}catch(e){}return [w,o.length,phS().run[id].done]},[id,k]);ok(r[0]&&r[1]>=2&&r[2],'phone '+id+JSON.stringify(r))}

/* ---------- after ---------- */
const post='S.phase="after";if(!S.kd)KD();S.kd.med=null;S.kd.t0=S.day-14;S.dark=0;S.lone=null;S.rom=null;S.vrom=null;S.f.k28pair=null;S.f.married=0;S.f.heartbreak=0;';
for(const [bi,pov] of [[2,'m'],[3,'v']]){await load(bi);
 for(const st of ['his','over',''])for(const part of ['','S.rom="r";','S.rom="a";'])for(const pick of [0,1])
  await R(`creak ${pov} ${st||'none'} ${part} pick${pick}`,{ev:'k58_creak',pick,setup:post+`S.f.k58_creak=0;S.f.k58Stair=${st?'"'+st+'"':'null'};`+part,flags:['k58Name']},r=>r.w&&r.f[0]===(pov==='m'?(pick?'name':'look'):(pick?'look':'name')));
 for(const bk of ['wrote','read'])for(const pick of [0,1])if(pov==='v'||pick===0)
  await R(`pages ${pov} ${bk} pick${pick}`,{ev:'k58_pages',pick,setup:post+`S.f.k58_creak=1;S.f.k58_pages=0;S.f.k58Book="${bk}";`,flags:['k58Date']},r=>r.w);
 if(pov==='m')for(const pick of [0,1])await R(`cups m pick${pick}`,{ev:'k58_cups',pick,setup:post+'S.f.k58_cups=0;S.f.kd_hard_work=1;',flags:['k58Cup']},r=>r.w&&r.f[0]===(pick?1:0));
 if(pov==='v'){for(const [gv,pick] of [[1,0],[0,0],[0,1]])await R(`cupv gave${gv} pick${pick}`,{ev:'k58_cupv',pick,setup:post+`S.f.k58_cupv=0;S.f.kd_v_cant=1;S.f.k58Name=${gv?'"look"':'"name"'};S.f.k58Rule=null;S.f.k58Cup=0;S.aff=${gv?100:10};S.f.k58Sit=0;S.f.kdDelivered=0;S.f.k58Stair=null;S.f.k58Book=null;S.f.k58First=0;S.f.k58Read=null;S.f.k58Asked=0;S.f.k58CupKeep=0;`,flags:['k58Cup','k58CupKeep']},r=>r.w&&(gv?r.f[0]===1:r.f[1]===(pick?0:1)))}
 /* the scheduler picks k58_creak when nothing earlier is due */
 const kn=await ev(post=>{(new Function(post))();S.f.k58_creak=0;EVENTS.filter(e=>e.kd&&!/^k58_/.test(e.id)).forEach(e=>S.seen[e.id]=1);S.seen.k58_creak=0;const e=kdNext();return e&&e.id},post);ok(kn==='k58_creak','kdNext '+kn);
 /* sitting on the stair, three times */
 const sit=await ev(([post])=>{(new Function(post))();S.f.k58_creak=1;S.f.k58Sit=0;S.f.k58SitDay=-9;const out=[];for(let n=0;n<4;n++){S.slot=2;S.done={};S.day+=2;const o=sideHub(false).find(o=>o.t==='Sit on the back stair');if(!o){out.push('none');continue}out.push(o.dis?'dis':'ok');if(!o.dis){o.fn();for(let i=0;i<300&&dlg;i++)adv();if(ctrl&&ctrl.close)try{ctrl.close()}catch(e){}}}S.slot=0;S.f.k58Sit=0;S.f.k58SitDay=-9;const early=sideHub(false).find(o=>o.t==='Sit on the back stair');return out.concat([S.f.k58Sit,early&&early.dis?'early-dis':'early?'])},[post]);
 console.log('sit',pov,sit.join(' '));ok(sit[0]==='ok'&&sit[1]==='ok'&&sit[2]==='ok'&&sit[3]==='none','sit '+sit);
 /* topics after */
 for(const [id,list] of [['k58_t_step','V'],['k58_t_last','V'],['k58_t_corner','M']])for(const v of [0,1]){const r=await ev(([id,list,v,post])=>{(new Function(post))();S.f.k58_creak=1;S.f.k58_book=1;S.f.k58Stair=v?'his':'over';S.f.k58Name=v?'name':'look';S.f.k58Read=v?'wrote':null;S.f.k58Knew=v;S.talks={};const t=(list==='V'?TOPICS_V:TOPICS_M).find(t=>t.id===id);if(!t)return 'missing';const sh=t.show();let d=0;t.run(()=>{d=1});for(let i=0;i<200&&dlg;i++)adv();return sh&&d?'ok':'show'+sh+' d'+d},[id,list,v,post]);ok(r==='ok','topic '+id+v+' '+r)}
}
/* ---------- rebuilding ---------- */
const a2=post.replace('S.phase="after";','S.phase="act2";S.act2Start=S.day-5;');
for(const [bi,pov] of [[2,'m'],[3,'v']]){await load(bi);
 for(const seen of [1,0])for(const date of [1,0])for(const pick of [0,1,2])if(pov==='m'||pick<2)
  await R(`read ${pov} seen${seen} date${date} pick${pick}`,{ev:'k58_read',pick,setup:a2+`S.f.k58_creak=1;S.f.k58_read=0;S.f.k58_book=${seen};S.f.k58Date=${date};S.aff=${pick?10:100};`,flags:['k58Read']},r=>r.w&&!!r.f[0]);
 /* the stair test: knows / does not know; Misaki can put it off once; V can break */
 const hi='S.f.k58Stair="his";S.f.k58Book="wrote";S.f.k58First=1;S.f.k58Name="look";S.f.k58Cup=1;S.f.k58Read="wrote";S.aff=100;',lo='S.f.k58Stair=null;S.f.k58Book=null;S.f.k58First=0;S.f.k58Name="name";S.f.k58Cup=0;S.f.k58Read=null;S.f.k58Rule="dropped";S.f.k58Sit=0;S.f.kdDelivered=0;S.f.k58Asked=0;S.f.k58CupKeep=0;S.aff=10;';
 for(const [lab,st] of [['hi',hi],['lo',lo]])for(const pick of [0,1]){const r=await R(`test ${pov} ${lab} pick${pick}`,{ev:'k58_test',pick,setup:a2+'S.f.k58_creak=1;S.f.k58_test=0;S.f.k58Wait=0;S.f.k58Waited=0;S.f.k58Knew=null;S.f.k58Broke=0;'+st,flags:['k58Knew','k58Broke','k58Wait']},
   r=>r.w&&(pick===1?(pov==='m'?r.f[2]>0:r.f[1]===1&&r.f[0]===0):r.f[0]===(lab==='hi'?1:0)));
  if(pov==='m'&&pick===1){const again=await ev(()=>{const e=EVENTS.find(e=>e.id==='k58_test');KD_RUN=1;let a,b;try{a=e.when();S.day+=3;b=e.when()}finally{KD_RUN=0}return [a,b,S.seen.k58_test]});ok(!again[0]&&again[1],'test deferral '+again);
   await R('test m deferred again',{ev:'k58_test',pick:1,setup:'',flags:['k58Knew']},r=>r.opts[0].includes('×'))}}
 /* act3: the steps */
 for(const can of [1,0])for(const pick of [0,1]){await ev(()=>{if(S.phase!=='act3'){startAct3();for(let i=0;i<100&&dlg;i++)adv()}});
  await R(`steps ${pov} can${can} pick${pick}`,{ev:'k58_steps',pick,setup:`S.dark=0;S.lone=null;if(!S.kd)KD();S.kd.med=null;S.day=S.a3.start+5;S.f.k58_steps=0;S.f.k58Knew=${can};S.f.k58Read=null;`,flags:['k58Three']},r=>r.w&&(can?r.f[0]===(pick?'hers':'his'):r.f[0]==='hers'))}
}
/* ---------- the epilogue, every ending and variant ---------- */
for(const [bi,pov] of [[6,'m'],[7,'v']]){await load(bi);
 const ep=post.replace('S.phase="after";','S.phase="epilogue";');
 const kinds={mended:'S.f.k58Knew=1;S.f.k58Stair="his";S.f.k58Book="wrote";S.f.k58First=1;S.f.k58Name="look";S.f.k58Cup=1;S.f.k58Read="wrote";S.aff=100;',
  kept:'S.f.k58Knew=0;S.f.k58Stair="over";S.f.k58Book="read";S.f.k58First=1;S.f.k58Name="name";S.f.k58Cup=0;S.f.k58Read="read";S.f.k58Rule=null;S.f.k58Sit=0;S.f.kdDelivered=0;S.f.k58Asked=0;S.f.k58CupKeep=0;S.aff=10;',
  apart:'S.f.k58Knew=0;S.f.k58Stair=null;S.f.k58Book=null;S.f.k58First=0;S.f.k58Name="name";S.f.k58Cup=0;S.f.k58Read="closed";S.f.k58Rule="dropped";S.f.k58Sit=0;S.f.kdDelivered=0;S.f.k58Asked=0;S.f.k58CupKeep=0;S.aff=10;'};
 for(const k in kinds)for(const v of ['','S.f.married=1;','S.rom="r";','S.rom="a";','S.vrom="r";','S.f.heartbreak=3;S.rom="a";']){
  await R(`end ${pov} ${k} ${v}`,{ev:'k58_end',pick:0,setup:ep+'S.f.k58_creak=1;S.f.k58_end=0;'+kinds[k]+v,flags:['k58End']},r=>r.w&&r.f[0]===k)}
 const L=await ev(()=>{const out=[];for(const k of ['mended','kept','apart',null]){S.f.k58End=k;S.f.k58Stair='his';S.f.k58Broke=1;S.f.k58Cup=1;out.push(extraEnding().filter(x=>/seventh|corner|column|cups|Once, V/.test(x)).length)}return out});
 ok(L.every(n=>n>=3),'ending lines '+L)}
console.log('runs',runs,'page errors',errs.length);errs.slice(0,10).forEach(e=>console.log('  ',e));
console.log(bad||errs.length?'K58 FAIL '+bad:'K58 OK');await b.close();process.exit(bad||errs.length?1:0)})();

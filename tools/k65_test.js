/* kc65: the four romance routes. Every beat with every option and every upstream flag, both delivery paths (side menu
   and Date night), the side menu per phase, every morning event, every phone-thread path, and every ending line.
   Also checks V's lines for contractions and the visible text for hound names. Usage: node tools/k65_test.js */
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
const ROOT=path.resolve(__dirname,'..');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];
p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+path.join(ROOT,'index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);
const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{document.querySelectorAll('.splash').forEach(e=>e.remove());window.__realHub=hub;hub=function(){window.__hubbed=1};
 window.__lines=[];const _s=say;say=function(L,cb){try{(L||[]).forEach(x=>{if(x)window.__lines.push([x[0],String(x[1])])})}catch(e){}return _s.apply(this,arguments)}});
const drive=async(pick)=>{let first=true,n=0;for(let k=0;k<200;k++){const r=await ev(([pick,first])=>{for(let i=0;i<400&&dlg;i++)adv();if(window.__hubbed)return 'hub';
   if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){const o=os[first?Math.min(pick,os.length-1):0];o.click();return 'clicked'}}return dlg?'dlg':'idle'},[pick,first]);
  if(r==='hub')return 'hub';if(r==='clicked'){first=false;n++}if(r==='idle'){await p.waitForTimeout(20);if(++n>60)return 'idle'}await p.waitForTimeout(5)}return 'timeout'};
/* phases: n normal, f after (out of the infirmary), 2 act2, 3 act3, e epilogue */
const BI={n:0,f:2,2:2,3:4,e:6};
const load=async(ph,route,flags,dates)=>ev(([bi,ph,route,flags,dates])=>{benchLoad(BENCH[bi]);for(let k=0;k<80&&dlg;k++)adv();window.__hubbed=0;
  S.fr={a:80,r:80};S.tx=null;S.dark=0;S.lone=null;S.f.abroad=0;S.f.heartbreak=0;
  const v=route[0]==='v';S.pov=v?'v':'m';S.rom=v?null:route[1];S.vrom=v?route[1]:null;S.romDates=v?0:dates;S.vromDates=v?dates:0;
  if(ph==='f'){S.phase='after';KD();S.kd.t0=S.day-5;S.kd.med=0}
  if(S.phase==='act2')S.day=Math.max(S.day,(S.act2Start||0)+2);
  if(S.phase==='act3'&&S.a3)S.day=S.a3.start+3;
  S.seen=S.seen||{};S.f.k65d={};Object.assign(S.f,flags||{});save()},[BI[ph],ph,route,flags||{},dates===undefined?3:dates]);
const log=[];const fx=()=>ev(()=>JSON.stringify(Object.fromEntries(Object.entries(S.f).filter(([k])=>/^k65/.test(k)&&k!=='k65d'))));
const R={
 mr:[['n','k65mrBooth','mr_booth',3,[{}]],['f','k65mrAfter','mr_after',2,[{}]],['2','k65mrRadio','mr_radio',2,[{}]],
  ['3','k65mrBoat','mr_boat',1,[{},{k65mrRadio:'shut'},{k65mrRadio:'back'}]],['e','k65mrEpi','mr_epi',1,[{},{k65mrBooth:'true'},{k65mrBooth:'filthy'},{k65mrBooth:'his',romMarried:1}]]],
 ma:[['n','k65maBet','ma_bet',3,[{}]],['f','k65maAfter','ma_after',2,[{}]],['2','k65maLive','ma_live',2,[{}]],
  ['3','k65maBoat','ma_boat',1,[{},{k65maLive:'good'},{k65maLive:'bad'}]],['e','k65maEpi','ma_epi',1,[{},{k65maBet:'won'},{k65maBet:'lost',romMarried:1},{k65maBet:'draw'}]]],
 vr:[['n','k65vrMugs','vr_mugs',3,[{}]],['f','k65vrAfter','vr_after',1,[{}]],['2','k65vrGala','vr_gala',2,[{}]],
  ['3','k65vrRing','vr_ring',2,[{}]],['e','k65vrEpi','vr_epi',1,[{},{k65vrGala:'stay',k65vrRing:'on',k65vrTea:'filed'},{k65vrGala:'car',k65vrRing:'chain'}]]],
 va:[['n','k65vaTheatre','va_theatre',2,[{}]],['f','k65vaAfter','va_after',1,[{}]],['2','k65vaLaunch','va_launch',2,[{}]],
  ['3','k65vaBoat','va_boat',1,[{},{k65vaHand:'post'},{k65vaHand:'keep'}]],['e','k65vaEpi','va_epi',1,[{},{k65vaHand:'post',k65vaTable:'stay'},{k65vaHand:'keep'}]]]};
const want=new Set();const got=new Set();
/* 1. the side menu offers the right beat per phase, and Date night plays it */
const preMark=(route,id)=>ev(([ids])=>{ids.forEach(x=>S.f.k65d[x]=1);S.seen.k27_tea=1},[R[route].map(x=>x[2]).slice(0,R[route].findIndex(x=>x[2]===id))]);
for(const route in R)for(const [ph,fn,id] of R[route]){
 await load(ph,route,{},3);await preMark(route,id);
 const L=await ev(()=>sideHub(false).filter(o=>/^♥ /.test(o.t||'')).map(o=>o.t));const due=await ev(()=>{const b=k65Due();return b&&b.id});
 log.push(`side ${route} ${ph}: ${due} | ${L.join(' | ')}`);if(due!==id)errs.push(`side ${route} ${ph} expected ${id}, got ${due}`);
 /* date night path */
 await ev(([route])=>{window.__hubbed=0;if(route[0]==='v')vromDate(route[1]);else romDate(route[1])},[route]);const r=await drive(0);
 const marked=await ev(id=>k65Done(id),id);log.push(`  date night → ${r}, marked ${marked}`);if(r!=='hub'||!marked)errs.push('date night '+route+' '+ph);
 /* the side-menu option itself */
 await load(ph,route,{},3);await preMark(route,id);
 const r2=await ev(()=>{const o=sideHub(false).find(o=>/^♥ /.test(o.t||''));if(!o)return 'none';o.fn();return 'ok'});const r3=await drive(0);
 if(r2!=='ok'||r3!=='hub')errs.push('side option '+route+' '+ph+' '+r2+' '+r3);
 /* nothing offered once done */
 const after=await ev(id=>{const b=k65Due();return b?b.id:null},id);if(after===id)errs.push('beat repeats '+id)}
/* not offered without the route, or before the first date, or while dark/lone */
for(const [ph,route,patch] of [['n','mr',{dates:0}],['n','vr',{dates:0}],['2','ma',{dark:1}],['e','va',{lone:'v'}],['n','mr',{pov:'v'}]]){await load(ph,route,{},patch.dates===undefined?3:patch.dates);
 const d=await ev(patch=>{if(patch.dark)S.dark=1;if(patch.lone)S.lone=patch.lone;if(patch.pov)S.pov=patch.pov;const b=k65Due();return b?b.id:null},patch);log.push(`gate ${route} ${ph} ${JSON.stringify(patch)} → ${d}`);if(d)errs.push('gate leak '+route+' '+JSON.stringify(patch))}
/* the mugs need the tea */
await load('n','vr',{},3);{const d=await ev(()=>{S.seen.k27_tea=0;const b=k65Due();return b?b.id:null});log.push('vr without tea → '+d);if(d==='vr_mugs')errs.push('mugs without tea')}
/* 2. every beat, every option, every upstream flag */
for(const route in R)for(const [ph,fn,id,nopt,vars] of R[route])for(const v of vars)for(let o=0;o<nopt;o++){await load(ph,route,v,3);
 await ev(fn=>{window.__hubbed=0;window[fn]?window[fn]():eval(fn+'()')},fn);const r=await drive(o);const f=await fx();want.add(id+'#'+o);got.add(id+'#'+o);
 log.push(`${fn} ${JSON.stringify(v)} opt${o} → ${r} ${f}`);if(r!=='hub')errs.push('scene did not finish '+fn+' '+JSON.stringify(v)+' '+o)}
/* every option sets a distinct flag value */
const FL={k65mrBooth:['true','filthy','his'],k65mrAfter:['lie','talk'],k65mrRadio:['shut','back'],k65maBet:['won','lost','draw'],k65maAfter:['bed','door'],k65maLive:['good','bad'],
 k65vrTea:['again','filed','back'],k65vrGala:['stay','car'],k65vrRing:['on','chain'],k65vaTable:['off','stay'],k65vaHand:['post','keep']};
const FN={k65mrBooth:['n','mr','k65mrBooth'],k65mrAfter:['f','mr','k65mrAfter'],k65mrRadio:['2','mr','k65mrRadio'],k65maBet:['n','ma','k65maBet'],k65maAfter:['f','ma','k65maAfter'],k65maLive:['2','ma','k65maLive'],
 k65vrTea:['n','vr','k65vrMugs'],k65vrGala:['2','vr','k65vrGala'],k65vrRing:['3','vr','k65vrRing'],k65vaTable:['n','va','k65vaTheatre'],k65vaHand:['2','va','k65vaLaunch']};
for(const k in FL)for(let o=0;o<FL[k].length;o++){const [ph,route,fn]=FN[k];await load(ph,route,{},3);await ev(fn=>{window.__hubbed=0;eval(fn+'()')},fn);await drive(o);
 const val=await ev(k=>S.f[k],k);if(val!==FL[k][o])errs.push(`${k} opt${o}: ${val} != ${FL[k][o]}`)}
/* 3. morning events */
for(const [id,route,ph] of [['k65mr_morn','mr','n'],['k65ma_morn','ma','n'],['k65vr_morn','vr','n'],['k65vr_morn','vr','2'],['k65va_morn','va','n'],['k65va_morn','va','2']])for(const ring of [0,1]){await load(ph,route,{},2);
 const w=await ev(([id,ring])=>{S.seen.rom_r_ring=ring;const e=EVENTS.find(e=>e.id===id);const ok=e.when();window.__hubbed=0;e.run(()=>{window.__hubbed=1});return ok},[id,ring]);const r=await drive(0);
 log.push(`${id} ${ph} ring=${ring} when=${w} → ${r}`);if(!w||r!=='hub')errs.push('event '+id+' '+ph+' '+w+' '+r)}
for(const [id,route] of [['k65mr_morn','mr'],['k65ma_morn','ma'],['k65vr_morn','vr'],['k65va_morn','va']]){await load('n',route,{},1);const w=await ev(id=>EVENTS.find(e=>e.id===id).when(),id);if(w)errs.push('event too early '+id)}
/* 4. threads: every path through every node */
const TH={tx_k65_mr:'mr',tx_k65_ma:'ma',tx_k65_vr:'vr',tx_k65_va:'va'};
for(const id in TH){await load('n',TH[id],{},1);const w=await ev(id=>TXS[id].when(),id);if(!w)errs.push('thread not eligible '+id);
 const paths=await ev(id=>{const T=TXS[id];const out=[];T.nodes.start.opts().forEach((o,i)=>{if(o.next)T.nodes[o.next].opts().forEach((_,j)=>out.push([i,j]));else out.push([i])});return out},id);
 for(const path of paths){await load('n',TH[id],{},1);
  const r=await ev(([id,path])=>{const T=TXS[id];S.tx=null;txStart(id);S.slot++;phDeliver();let node='start';
   for(const i of path){const P=phS();const run=P.run[id];if(!run.await||run.node!==node)return 'not awaiting at '+node;const o=T.nodes[node].opts()[i];txChoose(id,o);S.slot++;phDeliver();node=o.next||null}
   const th=phS().th[T.with]||[];return th.length+' msgs, done '+!!phS().run[id].done},[id,path]);
  log.push(`${id} path ${path.join('>')}: ${r}`);if(!/done true/.test(r))errs.push('thread '+id+' '+path.join('>')+' '+r)}}
/* threads stay off for the other routes */
await load('n','mr',{},1);{const leak=await ev(()=>['tx_k65_ma','tx_k65_vr','tx_k65_va'].filter(id=>TXS[id].when()));if(leak.length)errs.push('thread leak '+leak)}
/* 5. ending lines */
const END=[['mr',{k65mrBooth:'true'},/silver pen/],['mr',{k65mrBooth:'filthy'},/eight screws/],['mr',{k65mrBooth:'his'},/kneels/],
 ['ma',{k65maBet:'won'},/says “bet”/],['ma',{k65maBet:'lost'},/still saving/],['ma',{k65maBet:'draw'},/spreadsheet/],['ma',{k65maLive:'bad'},/the flush/],
 ['vr',{k65vrRing:'on'},/ring finger/],['vr',{k65vrRing:'chain'},/on a chain/],['vr',{k65vrTea:'again'},/POISON/],
 ['va',{k65vaHand:'post'},/two hundred thousand/],['va',{k65vaHand:'keep'},/Taped inside/]];
for(const [route,f,rx] of END){await load('e',route,f,3);const L=await ev(()=>extraEnding());const hit=L.filter(x=>rx.test(x));log.push(`ending ${route} ${JSON.stringify(f)}: ${hit[0]||'MISSING'}`);if(!hit.length)errs.push('ending '+route+' '+JSON.stringify(f))}
await load('e','vr',{k65maBet:'won',k65mrBooth:'true'},3);{const L=await ev(()=>extraEnding());if(L.some(x=>/says “bet”|silver pen/.test(x)))errs.push('ending leak across routes')}
/* 6. text checks: V never contracts; no hound names */
const lines=await ev(()=>window.__lines);let vbad=[];for(const [w,t] of lines){if(w==='K9'&&/n[’']t\b|[’'](re|ll|ve|m|d)\b|\b(it|that|he|she|there|what|let|who|here)[’']s\b/i.test(t.replace(/“[^”]*”/g,'')))vbad.push(t);
 if(/\b(Biscuit|Sergeant|Mochi|Pancake|Elysium)\b/.test(t))errs.push('forbidden name: '+t)}
if(vbad.length)errs.push('V contractions: '+vbad.slice(0,5).join(' || '));
log.push('lines checked: '+lines.length);
console.log(log.join('\n'));console.log('COVERED options',got.size,'of',want.size);console.log('PAGE ERRORS',errs.length,errs.slice(0,30));await b.close();process.exit(errs.length?1:0)})();

/* kc67: V × Ronin, the Butcher's balance. Every beat with every option and every upstream flag, both delivery paths
   (side menu and Date night), the interleave with kc65 (never two ♥ beats at once), the gates, the boat-night wrappers
   (prelude, the Chairman's line, the open service door), every morning event, every phone-thread path, every ending
   line. Also checks V's lines for contractions and the visible text for hound names. Usage: node tools/k67_test.js */
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
const ROOT=path.resolve(__dirname,'..');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];
p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+path.join(ROOT,'index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);
const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{document.querySelectorAll('.splash').forEach(e=>e.remove());window.__realHub=hub;hub=function(){window.__hubbed=1};
 window.__lines=[];const _s=say;say=function(L,cb){try{(L||[]).forEach(x=>{if(x)window.__lines.push([x[0],String(x[1])])})}catch(e){}return _s.apply(this,arguments)};
 const _a=ask;ask=function(w,t,o){window.__ask=String(t);return _a.apply(this,arguments)}});
const drive=async(pick,stop)=>{let first=true,n=0;for(let k=0;k<300;k++){const r=await ev(([pick,first,stop])=>{for(let i=0;i<400&&dlg;i++)adv();if(window.__hubbed)return 'hub';
   if(ctrl&&ctrl.box){if(stop&&new RegExp(stop).test(window.__ask||''))return 'stop';const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){const o=os[first?Math.min(pick,os.length-1):0];o.click();return 'clicked'}}return dlg?'dlg':'idle'},[pick,first,stop||null]);
  if(r==='hub'||r==='stop')return r;if(r==='clicked'){first=false;n++}if(r==='idle'){await p.waitForTimeout(20);if(++n>60)return 'idle'}await p.waitForTimeout(5)}return 'timeout'};
const BI={n:0,2:2,3:4,e:6};
const VR=['vr_mugs','vr_after','vr_gala','vr_ring','vr_epi'];
/* load a bench in a phase on the V × Ronin route; kc65's beats are marked done unless k65 is given */
const load=async(ph,flags,o)=>ev(([bi,ph,flags,o])=>{benchLoad(BENCH[bi]);for(let k=0;k<80&&dlg;k++)adv();window.__hubbed=0;window.__ask='';
  S.fr={a:80,r:80};S.tx=null;S.dark=0;S.lone=null;S.f.abroad=0;S.f.heartbreak=0;
  S.pov='v';S.rom=null;S.vrom='r';S.romDates=0;S.vromDates=o.dates===undefined?3:o.dates;
  if(S.phase==='act2')S.day=Math.max(S.day,(S.act2Start||0)+2);
  if(S.phase==='act3'&&S.a3){S.day=S.a3.start+3;S.a3.box=1}
  if(o.after){S.phase='after';KD();S.kd.t0=S.day-5;S.kd.med=0}
  if(S.case)S.case.cul=o.hale?'hara':'avery';
  S.seen=S.seen||{};S.seen.k27_tea=1;S.f.k65d={};S.f.k67d={};(o.k65||['vr_mugs','vr_after','vr_gala','vr_ring','vr_epi']).forEach(x=>S.f.k65d[x]=1);
  ['k67Pew','k67Photo','k67Row','k67Page','k67Ten','k67Epi','k67Boat','k67Ch','k65vrRing','k57rBoat'].forEach(k=>delete S.f[k]);
  S.f.k67PhotoDay=S.day-1;S.f.k67PageDay=S.day-1;(o.done||[]).forEach(x=>S.f.k67d[x]=1);Object.assign(S.f,flags||{});save()},[BI[ph],ph,flags||{},o||{}]);
const log=[];const fx=()=>ev(()=>JSON.stringify(Object.fromEntries(Object.entries(S.f).filter(([k])=>/^k67/.test(k)&&k!=='k67d'))));
const want=new Set(),got=new Set();
/* the beats: [phase, function, id, options, upstream variants, beats done before it] */
const BEATS=[
 ['n','k67Church','vr67_church',3,[{}],[]],
 ['2','k67Photo','vr67_photo',3,[{},{k67Pew:'ask'},{k67Pew:'pocket'},{k67Pew:'hand'},{k67Pew:'hand',__hale:1},{__hale:1}],['vr67_church']],
 ['2','k67Row','vr67_row',2,[{k67Photo:'told'},{k67Photo:'kept'},{k67Photo:'burn'},{k67Photo:'burn',__hale:1},{k67Photo:'kept',__hale:1}],['vr67_church','vr67_photo']],
 ['3','k67Page','vr67_page',2,[{},{k65vrRing:'on'},{k65vrRing:'chain',k67Row:'sorry'},{k67Row:'stand'}],['vr67_church','vr67_photo','vr67_row']],
 ['3','k67Ten','vr67_ten',2,[{k67Page:'his'},{k67Page:'his',k65vrRing:'on'},{k67Page:'out'},{k67Page:'out',k65vrRing:'chain'}],['vr67_church','vr67_photo','vr67_row','vr67_page']],
 ['e','k67Epi','vr67_epi',2,[{k67Page:'his',k67Ten:'end',k67Row:'kiss'},{k67Page:'his',k67Ten:'walk',k67Row:'file'},{k67Page:'his'},{k67Page:'out',k67Ten:'end',k67Row:'sorry'},{k67Page:'out',k67Ten:'walk'},{k67Page:'out'}],['vr67_church','vr67_photo','vr67_row','vr67_page','vr67_ten']]];
const split=v=>{const f=Object.assign({},v),o={};if(f.__hale){o.hale=1;delete f.__hale}return [f,o]};
/* 1. side menu and Date night, per beat, with its upstream flags */
for(const [ph,fn,id,nopt,vars,before] of BEATS){const [f,o]=split(vars[0]);
 await load(ph,f,Object.assign({done:before},o));
 const L=await ev(()=>sideHub(false).filter(o=>/^♥ /.test(o.t||'')).map(o=>o.t));const due=await ev(()=>{const b=k67Due();return b&&b.id});
 log.push(`side ${ph}: ${due} | ${L.join(' | ')}`);if(due!==id)errs.push(`side ${ph} expected ${id}, got ${due}`);if(L.length!==1)errs.push(`side ${ph}: ${L.length} ♥ entries`);
 await ev(()=>{window.__hubbed=0;vromDate('r')});const r=await drive(0);const marked=await ev(id=>k67Done(id),id);const dn=await ev(()=>S.vromDates);
 log.push(`  date night → ${r}, marked ${marked}, dates ${dn}`);if(r!=='hub'||!marked||dn!==4)errs.push('date night '+id);
 await load(ph,f,Object.assign({done:before},o));
 const r2=await ev(()=>{const o=sideHub(false).find(o=>/^♥ /.test(o.t||''));if(!o)return 'none';o.fn();return 'ok'});const r3=await drive(0);
 if(r2!=='ok'||r3!=='hub')errs.push('side option '+id+' '+r2+' '+r3);
 const again=await ev(()=>{const b=k67Due();return b?b.id:null});if(again===id)errs.push('beat repeats '+id)}
/* 2. interleave with kc65: while a kc65 V × Ronin beat is due, this module offers nothing, and Date night plays kc65's */
for(const [ph,k65,exp] of [['n',['vr_after','vr_gala','vr_ring','vr_epi'],'vr_mugs'],['2',['vr_mugs','vr_ring','vr_epi'],'vr_after'],['2',['vr_mugs','vr_after','vr_ring','vr_epi'],'vr_gala'],['3',['vr_mugs','vr_after','vr_gala','vr_epi'],'vr_ring'],['e',['vr_mugs','vr_after','vr_gala','vr_ring'],'vr_epi']]){
 await load(ph,ph==='e'?{k67Page:'his'}:{},{k65,done:ph==='n'?[]:ph==='2'?['vr67_church']:ph==='3'?['vr67_church','vr67_photo','vr67_row']:['vr67_church','vr67_photo','vr67_row','vr67_page','vr67_ten']});
 const s=await ev(()=>({k65:(k65Due()||{}).id||null,k67:(k67Due()||{}).id||null,hearts:sideHub(false).filter(o=>/^♥ /.test(o.t||'')).map(o=>o.t)}));
 log.push(`interleave ${ph}: kc65 ${s.k65}, kc67 ${s.k67}, ♥ ${s.hearts.length}`);if(s.k65!==exp||s.k67||s.hearts.length!==1)errs.push('interleave '+ph+' '+JSON.stringify(s));
 await ev(()=>{window.__hubbed=0;vromDate('r')});await drive(0);const m=await ev(([e])=>({a:k65Done(e),b:Object.keys(S.f.k67d||{}).length}),[exp]);if(!m.a)errs.push('date night did not play kc65 '+exp)}
/* 3. gates */
for(const [ph,patch] of [['n',{dates:0}],['n',{dark:1}],['2',{lone:'v'}],['2',{pov:'m'}],['2',{vrom:'a'}],['2',{after:1}],['3',{abroad:1}],['e',{}]]){
 await load(ph,{},{dates:patch.dates,after:patch.after,done:ph==='n'?[]:['vr67_church']});
 const d=await ev(patch=>{if(patch.dark)S.dark=1;if(patch.lone)S.lone=patch.lone;if(patch.pov)S.pov=patch.pov;if(patch.vrom)S.vrom=patch.vrom;if(patch.abroad)S.f.abroad=1;const b=k67Due();return b?b.id:null},patch);
 log.push(`gate ${ph} ${JSON.stringify(patch)} → ${d}`);if(d)errs.push('gate leak '+ph+' '+JSON.stringify(patch))}
/* the row waits a day after the photo; ten forty waits a day after the page; the page needs the box */
await load('2',{k67Photo:'told'},{done:['vr67_church','vr67_photo']});{const d=await ev(()=>{S.f.k67PhotoDay=S.day;const b=k67Due();return b?b.id:null});if(d)errs.push('row same day: '+d)}
await load('3',{k67Page:'his'},{done:['vr67_church','vr67_photo','vr67_row','vr67_page']});{const d=await ev(()=>{S.f.k67PageDay=S.day;const b=k67Due();return b?b.id:null});if(d)errs.push('ten same day: '+d)}
await load('3',{},{done:['vr67_church','vr67_photo','vr67_row']});{const d=await ev(()=>{S.a3.box=0;const b=k67Due();return b?b.id:null});if(d)errs.push('page without the box: '+d)}
await load('3',{k67Photo:'kept'},{done:['vr67_church','vr67_photo']});{const d=await ev(()=>{const b=k67Due();return b?b.id:null});log.push('row missed in act2, act3 → '+d);if(d!=='vr67_row')errs.push('row not offered in act3')}
/* 4. every beat, every option, every upstream flag */
for(const [ph,fn,id,nopt,vars,before] of BEATS)for(const v of vars)for(let o=0;o<nopt;o++){const [f,oo]=split(v);await load(ph,f,Object.assign({done:before},oo));
 await ev(()=>{window.__lines=[]});await ev(fn=>{window.__hubbed=0;eval(fn+'()')},fn);const r=await drive(o);const fl=await fx();want.add(id+'#'+o);got.add(id+'#'+o);
 log.push(`${fn} ${JSON.stringify(v)} opt${o} → ${r} ${fl}`);if(r!=='hub')errs.push('scene did not finish '+fn+' '+JSON.stringify(v)+' '+o);
 if(oo.hale){const h=await ev(()=>window.__lines.filter(x=>x[0]==='Hale').length);if(h)errs.push('Hale speaks while he is the Mimic: '+fn)}}
const FL={k67Pew:['ask','pocket','hand'],k67Photo:['told','kept','burn'],k67Page:['his','out'],k67Ten:['end','walk']};
const FN={k67Pew:['n','k67Church',{},[]],k67Photo:['2','k67Photo',{},['vr67_church']],k67Page:['3','k67Page',{},[]],k67Ten:['3','k67Ten',{k67Page:'his'},[]]};
for(const k in FL)for(let o=0;o<FL[k].length;o++){const [ph,fn,f,d]=FN[k];await load(ph,f,{done:d});await ev(fn=>{window.__hubbed=0;eval(fn+'()')},fn);await drive(o);
 const val=await ev(k=>S.f[k],k);if(val!==FL[k][o])errs.push(`${k} opt${o}: ${val} != ${FL[k][o]}`)}
for(const [photo,vals] of [['told',['kiss','file']],['kept',['sorry','stand']]])for(let o=0;o<2;o++){await load('2',{k67Photo:photo},{});await ev(()=>{window.__hubbed=0;k67Row()});await drive(o);const v=await ev(()=>S.f.k67Row);if(v!==vals[o])errs.push(`k67Row ${photo} opt${o}: ${v}`)}
for(const [page,vals] of [['his',['own','quote']],['out',['sorry','again']]])for(let o=0;o<2;o++){await load('e',{k67Page:page},{});await ev(()=>{window.__hubbed=0;k67Epi()});await drive(o);const v=await ev(()=>S.f.k67Epi);if(v!==vals[o])errs.push(`k67Epi ${page} opt${o}: ${v}`)}
/* 5. boat night: the prelude before the plan, the Chairman's line, one guard fewer when the son walked */
const boat=async(f)=>{await load('3',f,{});return ev(()=>new Promise(res=>{window.__g=null;window.__lines=[];const _st=stealth;stealth=function(o,cb){window.__g=o.guards.length;stealth=_st;cb({ok:true,kills:0})};window.__hubbed=0;a3Climax();res(1)}))};
const boatRun=async(f,pick)=>{await boat(f);const r=await drive(pick,'The Chairman, on his knees|The deck is chaos');const s=await ev(()=>({g:window.__g,L:window.__lines.map(x=>x[1]),allies:Object.keys(S.a3.allies),b:S.f.k67Boat,c:S.f.k67Ch,plan:S.a3.plan}));return [r,s]};
for(const f of [{k67Page:'his',k67Ten:'end',k57rBoat:'home'},{k67Page:'his',k67Ten:'walk',k57rBoat:'two'},{k67Page:'out',k67Ten:'end'},{k67Page:'out',k67Ten:'walk',k57rBoat:'on'},{k67Page:'out'}]){
 const [r,s]=await boatRun(f,0);const pre=s.L.some(x=>/gangway/.test(x)),ch=s.L.some(x=>/the Chairman says/.test(x)),door=s.L.some(x=>/unlocked/.test(x));
 log.push(`boat ${JSON.stringify(f)} → ${r} guards ${s.g} plan ${s.plan} prelude ${pre} chairman ${ch} door ${door} allies ${s.allies}`);
 if(r!=='stop'||!pre||!ch||!s.b||!s.c)errs.push('boat '+JSON.stringify(f)+' '+r);if((f.k67Ten==='walk')!==door)errs.push('boat door line '+JSON.stringify(f));if(s.allies.includes('k67door'))errs.push('placeholder ally left behind')}
/* guard counts: same plan with and without the open door */
{const [r1,a]=await boatRun({k67Page:'his',k67Ten:'end'},0);const [r2,c]=await boatRun({k67Page:'his',k67Ten:'walk'},0);log.push(`guards end ${a.g} walk ${c.g} (plan ${a.plan})`);if(!(c.g<a.g||a.g===1))errs.push('open door did not remove a guard '+a.g+' '+c.g)}
{const [r,s]=await boatRun({},0);if(s.L.some(x=>/gangway|the Chairman says/.test(x)))errs.push('boat lines without the page');log.push('boat without the page → '+r)}
/* 6. morning events */
for(const [id,ph,f,d] of [['k67vr_morn','n',{},['vr67_church']],['k67vr_loft','2',{k67Photo:'told',k67Pew:'hand'},['vr67_church','vr67_photo']],['k67vr_loft','2',{k67Photo:'kept'},['vr67_church','vr67_photo']],['k67vr_morn2','e',{k67Page:'his'},['vr67_epi']]]){
 await load(ph,f,{done:d});const w=await ev(id=>{const e=EVENTS.find(e=>e.id===id);const ok=e.when();window.__hubbed=0;e.run(()=>{window.__hubbed=1});return ok},id);const r=await drive(0);
 log.push(`${id} ${ph} when=${w} → ${r}`);if(!w||r!=='hub')errs.push('event '+id+' '+w+' '+r)}
for(const [id,ph,f,d] of [['k67vr_morn','n',{},[]],['k67vr_loft','2',{},[]],['k67vr_morn2','e',{},[]]]){await load(ph,f,{done:d});const w=await ev(id=>EVENTS.find(e=>e.id===id).when(),id);if(w)errs.push('event too early '+id)}
/* 7. threads: every path through every node, in every variant */
const TH=[['tx_k67_eyes','n',{},['vr67_church'],1],['tx_k67_eyes','2',{},['vr67_church'],1],['tx_k67_week','2',{k67Photo:'told'},[],0],['tx_k67_weird','2',{k67Photo:'kept'},[],0],['tx_k67_weird','2',{k67Photo:'burn'},[],0],['tx_k67_weird','2',{k67Photo:'burn',__hale:1},[],0],
 ['tx_k67_mis','3',{k67Page:'out'},[],0],['tx_k67_torch','3',{k67Page:'his'},[],0],['tx_k67_epi','e',{k67Page:'his'},['vr67_epi'],1],['tx_k67_epi','e',{k67Page:'out'},['vr67_epi'],0]];
for(const [id,ph,v,d,elig] of TH){const [f,o]=split(v);await load(ph,f,Object.assign({done:d},o));const w=await ev(id=>!!TXS[id].when(),id);if(w!==!!elig)errs.push('thread eligibility '+id+' '+w);
 const paths=await ev(id=>{const T=TXS[id];const out=[];T.nodes.start.opts().forEach((o,i)=>{if(o.next)T.nodes[o.next].opts().forEach((_,j)=>out.push([i,j]));else out.push([i])});return out},id);
 for(const pth of paths){await load(ph,f,Object.assign({done:d},o));
  const r=await ev(([id,pth])=>{const T=TXS[id];S.tx=null;txStart(id);S.slot++;phDeliver();let node='start';
   for(const i of pth){const P=phS();const run=P.run[id];if(!run.await||run.node!==node)return 'not awaiting at '+node;const o=T.nodes[node].opts()[i];txChoose(id,o);S.slot++;phDeliver();node=o.next||null}
   const th=phS().th[T.with]||[];return th.length+' msgs, done '+!!phS().run[id].done},[id,pth]);
  log.push(`${id} ${JSON.stringify(v)} path ${pth.join('>')}: ${r}`);if(!/done true/.test(r))errs.push('thread '+id+' '+pth.join('>')+' '+r)}}
/* the beats start their threads */
for(const [ph,fn,o,id] of [['2','k67Photo',0,'tx_k67_week'],['2','k67Photo',1,'tx_k67_weird'],['2','k67Photo',2,'tx_k67_weird'],['3','k67Page',0,'tx_k67_torch'],['3','k67Page',1,'tx_k67_mis']]){await load(ph,{},{});await ev(fn=>{window.__hubbed=0;eval(fn+'()')},fn);await drive(o);
 const s=await ev(id=>Object.keys(phS().run).filter(k=>/^tx_k67/.test(k)),id);if(s.length!==1||s[0]!==id)errs.push(fn+' opt'+o+' started '+s+' not '+id)}
/* threads stay off other routes */
await load('2',{},{done:['vr67_church']});{const leak=await ev(()=>{S.vrom='a';return ['tx_k67_eyes','tx_k67_epi'].filter(id=>TXS[id].when())});if(leak.length)errs.push('thread leak '+leak)}
/* 8. ending lines */
const END=[[{k67Epi:'own'},/every heading/],[{k67Epi:'quote'},/dying speech/],[{k67Epi:'sorry'},/not to be kept out/],[{k67Epi:'again'},/boiler in February/],
 [{k67Ten:'walk'},/postcard/],[{k67Ten:'end'},/used twice/],[{k67Pew:'hand'},/organ loft/]];
for(const [f,rx] of END){await load('e',f,{});const L=await ev(()=>extraEnding());const hit=L.filter(x=>rx.test(x));log.push(`ending ${JSON.stringify(f)}: ${hit[0]||'MISSING'}`);if(!hit.length)errs.push('ending '+JSON.stringify(f))}
await load('e',{k67Epi:'own'},{});{const L=await ev(()=>{S.vrom='a';return extraEnding()});if(L.some(x=>/every heading/.test(x)))errs.push('ending leak across routes')}
/* 9. text checks: V never contracts; no hound names */
const lines=await ev(()=>window.__lines);let vbad=[];for(const [w,t] of lines){if(w==='K9'&&/n[’']t\b|[’'](re|ll|ve|m|d)\b|\b(it|that|he|she|there|what|let|who|here)[’']s\b/i.test(t.replace(/“[^”]*”/g,'')))vbad.push(t);
 if(/\b(Biscuit|Sergeant|Mochi|Pancake|Elysium)\b/.test(t))errs.push('forbidden name: '+t)}
const src=require('fs').readFileSync(path.join(ROOT,'src','kc67.js'),'utf8');
for(const m of src.matchAll(/\['K9','((?:[^'\\]|\\.)*)'\]/g)){const t=m[1].replace(/“[^”]*”/g,'');if(/n[’']t\b|[’'](re|ll|ve|m|d)\b|\b(it|that|he|she|there|what|let|who|here|i)[’']s\b/i.test(t))vbad.push(m[1])}
for(const m of src.matchAll(/\{t:'(“[^']*”)/g)){if(/n[’']t\b|[’'](re|ll|ve|m|d)\b|\b(it|that|he|she|there|what|let|who|here)[’']s\b/i.test(m[1]))vbad.push('option '+m[1])}
if(/\b(Biscuit|Sergeant|Mochi|Pancake|Elysium)\b/.test(src))errs.push('forbidden name in source');
if(vbad.length)errs.push('V contractions: '+vbad.slice(0,5).join(' || '));
log.push('lines checked: '+lines.length);
console.log(log.join('\n'));console.log('COVERED options',got.size,'of',want.size);console.log('PAGE ERRORS',errs.length,errs.slice(0,30));await b.close();process.exit(errs.length?1:0)})();

/* kc68: V × Ronin, off hours. Every location event and option in every phase it can play in, the room wrappers and
   the one-a-day cap shared with kc64 (plus a real walk into a room), every morning event and option and the morning
   scheduler, every evening scene of the side activity, every phone-thread path, the server pings, every ending line,
   and the gates (off route, Misaki POV, taken/after, infirmary, dark, lone, abroad). Also checks V's lines for
   contractions, the visible text for hound names and "undefined". Usage: node tools/k68_test.js */
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
const BI={n:0,2:2,3:4,e:6};
const load=async(ph,flags)=>ev(([bi,flags])=>{benchLoad(BENCH[bi]);for(let k=0;k<80&&dlg;k++)adv();ctrl=null;window.__hubbed=0;
  S.tx=null;S.dark=0;S.lone=null;S.f.abroad=0;S.f.heartbreak=0;S.pov='v';S.rom=null;S.vrom='r';S.vromDates=3;S.f.k28pair=null;S.f.married=0;S.aff=60;
  S.fr=Object.assign(S.fr||{},{a:60,r:60});if(S.kd)S.kd.med=0;S.done={};S.slot=0;
  if(S.phase==='act2')S.day=Math.max(S.day,(S.act2Start||0)+2);
  if(S.phase==='act3'&&S.a3)S.day=S.a3.start+3;
  S.seen=S.seen||{};L68.forEach(e=>S.seen[e.id]=0);M68.forEach(e=>S.seen[e.id]=0);S.f.k64LDay=0;S.f.k68MLast=0;S.f.mbN=0;S.f.mbDay=0;S.f.k68EveN=0;
  Object.keys(S.f).filter(k=>/^k68/.test(k)).forEach(k=>delete S.f[k]);Object.assign(S.f,flags||{});save()},[BI[ph],flags||{}]);
const log=[];const want=new Set(),got=new Set();
const run=async(label,code,pick)=>{want.add(label);await ev(code=>{window.__hubbed=0;const cb=()=>{window.__hubbed=1};(new Function('cb',code))(cb)},code);const r=await drive(pick);
 const f=await ev(()=>JSON.stringify(Object.fromEntries(Object.entries(S.f).filter(([k])=>/^k68/.test(k)))));log.push(`${label} → ${r} ${f}`);if(r!=='hub')errs.push('did not finish: '+label);else got.add(label);return f};
const phases=['n','2','3','e'];
const phaseName={n:'normal',2:'act2',3:'act3',e:'epilogue'};
/* 1. location events: every event, every option, every phase */
const L=await ev(()=>L68.map(e=>({id:e.id,rooms:e.rooms})));
const NOPT={vr68_brolly:2,vr68_boots:2,vr68_heat:2,vr68_carve:2,vr68_truck:2,vr68_pink:2,vr68_sing:2};
const FLAG={vr68_brolly:['k68Brolly','rent','stand'],vr68_boots:['k68Boots','new','back'],vr68_heat:['k68Heat','cold','split'],vr68_carve:['k68Carve','desk','pocket'],
 vr68_truck:['k68Truck','kerb','signal'],vr68_pink:['k68Pink','pink','cold'],vr68_sing:['k68Sing','sang','home']};
for(const ph of phases)for(const {id} of L){const n=NOPT[id]||1;for(let o=0;o<n;o++){await load(ph);
 const w=await ev(id=>{S.day=S.day%3===2?S.day+1:S.day;return L68.find(e=>e.id===id).when()},id);if(!w)errs.push(`loc when false ${id} ${ph}`);
 const f=await run(`loc ${id} ${phaseName[ph]} #${o}`,`l68Run(L68.find(e=>e.id==="${id}"),cb)`,o);
 if(FLAG[id]){const [k,...vals]=FLAG[id];if(JSON.parse(f)[k]!==vals[o])errs.push(`${id} opt${o}: ${k} ${f}`)}
 const seen=await ev(id=>[!!S.seen[id],S.f.k64LDay===S.day],id);if(!seen[0]||!seen[1])errs.push('loc did not mark seen/cap '+id)}}
/* the room wrappers, the force pick per room, and the shared one-a-day cap */
await load('n');{const r=await ev(()=>{S.day=S.day%3===2?S.day+1:S.day;const out={};K68ROOMS.forEach(id=>{out[id]=(l68Try(id,true)||{}).id||null});const wrapped=K68ROOMS.every(id=>typeof ROOMS[id].enter==='function');
 S.f.k64LDay=S.day;const cap=K68ROOMS.every(id=>!l68Try(id));S.f.k64LDay=0;L68.forEach(e=>S.seen[e.id]=1);const none=K68ROOMS.every(id=>!l68Try(id,true));return {out,wrapped,cap,none}});
 log.push('rooms '+JSON.stringify(r));if(!r.wrapped||!r.cap||!r.none)errs.push('room wrappers/cap '+JSON.stringify(r));Object.entries(r.out).forEach(([k,v])=>{if(!v)errs.push('no event for room '+k)})}
/* ronin's apartment events wait for Ronin to be home; carve plays once */
await load('n');{const r=await ev(()=>{S.day=S.day+((2-S.day%3)+3)%3;const a=L68.filter(e=>e.rooms.includes('ronin')).map(e=>e.when());S.day++;S.f.k68Carve='desk';const c=L68.find(e=>e.id==='vr68_carve').when();return [a,c]});
 if(r[0].some(x=>x)||r[1])errs.push('ronin room gates '+JSON.stringify(r))}
/* a real walk into the kennel fires the kc68 scene through the wrapper, once */
await load('n');await ev(()=>{S.day=S.day%3===2?S.day+1:S.day;K64L.forEach(e=>S.seen[e.id]=1);L68.forEach(e=>{if(!e.rooms.includes('kennel'))S.seen[e.id]=1});window.__rnd=Math.random;Math.random=()=>0.01;S.room='atrium';toRoom('kennel',[150,166]);Math.random=window.__rnd});
for(let t=0;t<4;t++){await p.waitForTimeout(1200);const busy=await ev(()=>{if(L68.some(e=>e.rooms.includes('kennel')&&S.seen[e.id]))return 0;let n=0;for(let i=0;i<200&&dlg;i++){adv();n++}if(ctrl&&ctrl.box){const o=ctrl.box.querySelector('.opt');if(o){o.click();n++}}return n});if(!busy)break}
{const r=await ev(()=>{for(let i=0;i<400&&dlg;i++)adv();if(ctrl&&ctrl.box){const o=ctrl.box.querySelector('.opt');if(o)o.click()}for(let i=0;i<400&&dlg;i++)adv();return L68.filter(e=>e.rooms.includes('kennel')&&S.seen[e.id]).map(e=>e.id)});
 log.push('walk into kennel fired: '+r.join(','));if(r.length!==1||r[0]!=='vr68_boots')errs.push('walk fired '+r.length+' scenes: '+r.join(','))}
await ev(()=>{for(let i=0;i<400&&dlg;i++)adv();ctrl=null;ui.innerHTML=''});
/* 2. mornings: every event and option in every phase, and the scheduler */
const MO=await ev(()=>M68.map(e=>e.id));const MN={m68_bingo:2};
for(const ph of phases)for(const id of MO)for(let o=0;o<(MN[id]||1);o++){await load(ph);const w=await ev(id=>M68.find(e=>e.id===id).when(),id);if(!w)errs.push('morning when false '+id+' '+ph);
 const f=await run(`morning ${id} ${phaseName[ph]} #${o}`,`M68.find(e=>e.id==="${id}").run(cb)`,o);if(id==='m68_bingo'&&JSON.parse(f).k68Bingo!==['table','hounds'][o])errs.push('bingo flag '+f)}
await load('n');{const r=await ev(()=>{const out=[];let ran=0;const d0=S.day;const a=m68Next();morningEvent(()=>{ran=1});for(let i=0;i<400&&dlg;i++)adv();if(ctrl&&ctrl.box){const o=ctrl.box.querySelector('.opt');if(o)o.click()}for(let i=0;i<400&&dlg;i++)adv();
 out.push(a&&a.id,!!S.seen[a&&a.id],S.f.k68MLast===d0,S.f.mbN);S.day++;out.push(m68Next());S.day++;const b=m68Next();out.push(b&&b.id);S.f.mbDay=S.day;S.f.mbN=2;out.push(!mbOk());return out});
 log.push('morning scheduler '+JSON.stringify(r));if(r[0]!=='m68_cook'||!r[1]||!r[2]||r[3]<1||r[4]!==null||r[5]!=='m68_bingo')errs.push('morning scheduler '+JSON.stringify(r))}
/* 3. the evening: every scene in rotation, once a day */
await load('n');{const E68N=await ev(()=>E68.length);const r=[];for(let n=0;n<=E68N;n++){const o=await ev(()=>{S.done={};S.slot=0;const o=sideHub(false).find(o=>o.t==='Spend the evening with Ronin');if(!o||o.dis)return 'none';window.__hubbed=0;window.__lines=[];o.fn();return 'ok'});
 const d=await drive(0);const first=await ev(()=>(window.__lines[0]||['',''])[1].slice(0,30));r.push(first);want.add('evening '+n);if(o!=='ok'||d!=='hub')errs.push('evening '+n+' '+o+' '+d);else got.add('evening '+n);
 const dis=await ev(()=>{const o=sideHub(false).find(o=>o.t==='Spend the evening with Ronin');return o&&o.dis});if(!dis)errs.push('evening not disabled after use')}
 log.push('evenings: '+r.join(' | '));if(new Set(r.slice(0,E68N)).size!==E68N||r[E68N]!==r[0])errs.push('evening rotation '+r.join('|'))}
for(const ph of ['2','3','e']){await load(ph);const ok=await ev(()=>!!sideHub(false).find(o=>o.t==='Spend the evening with Ronin'));if(!ok)errs.push('evening missing in '+ph)}
/* 4. threads: every path */
for(const id of ['tx_k68_heat','tx_k68_dog','tx_k68_mi','tx_k68_an']){await load('n');const w=await ev(id=>TXS[id].when(),id);if(!w)errs.push('thread not eligible '+id);
 const paths=await ev(id=>{const T=TXS[id];const out=[];T.nodes.start.opts().forEach((o,i)=>{if(o.next)T.nodes[o.next].opts().forEach((_,j)=>out.push([i,j]));else out.push([i])});return out},id);
 for(const path of paths){await load('n');want.add(id+' '+path.join('>'));
  const r=await ev(([id,path])=>{const T=TXS[id];S.tx=null;txStart(id);S.slot++;phDeliver();let node='start';
   for(const i of path){const P=phS();const run=P.run[id];if(!run.await||run.node!==node)return 'not awaiting at '+node;const o=T.nodes[node].opts()[i];txChoose(id,o);S.slot++;phDeliver();node=o.next||null}
   return (phS().th[T.with]||[]).length+' msgs, done '+!!phS().run[id].done},[id,path]);
  log.push(`${id} ${path.join('>')}: ${r}`);if(!/done true/.test(r))errs.push('thread '+id+' '+path.join('>')+' '+r);else got.add(id+' '+path.join('>'))}}
await load('n',{k68Carve:'desk'});if(await ev(()=>TXS.tx_k68_dog.when()))errs.push('dog thread after the carving');
await load('n',{k68Boots:'back'});if(await ev(()=>TXS.tx_k68_mi.when()))errs.push('boots thread after the boots went back');
/* 5. gates: nothing plays off the route or in the kidnapping phases */
const G=[['vrom a',s=>{S.vrom='a'}],['no vrom',s=>{S.vrom=null}],['misaki pov',s=>{S.pov='m'}],['taken',s=>{S.phase='taken'}],['after',s=>{S.phase='after'}],
 ['infirmary',s=>{S.kd=S.kd||{};S.kd.med={d:1}}],['dark',s=>{S.dark=1}],['lone',s=>{S.lone='v'}],['abroad',s=>{S.f.abroad=1}]];
for(const [name,patch] of G){await load('n');const r=await ev(src=>{(eval('('+src+')'))(S);return {k:K68(),loc:L68.some(e=>e.when()),mor:M68.some(e=>e.when()),eve:!!sideHub(false).find(o=>o.t==='Spend the evening with Ronin'),
  tx:['tx_k68_heat','tx_k68_dog','tx_k68_mi','tx_k68_an'].some(id=>TXS[id].when()),ping:g68Ping()}},patch.toString());log.push(`gate ${name} ${JSON.stringify(r)}`);if(Object.values(r).some(x=>x))errs.push('gate leak '+name+' '+JSON.stringify(r))}
await load('n');{const r=await ev(()=>g68Ping());if(!r)errs.push('ping did not show on route')}
/* 6. ending lines */
const END=[[{k68Brolly:'rent'},/umbrella stand/],[{k68Brolly:'stand'},/umbrella stand/],[{k68Carve:'desk'},/On V’s desk/],[{k68Carve:'pocket'},/coat pocket/],[{k68Truck:'kerb'},/parking tickets/],
 [{k68Sing:'sang'},/karaoke video/],[{k68Sing:'home'},/kitchen drawer/],[{k68Bingo:'table'},/lilac scarf/],[{k68Boots:'new'},/old boots/]];
for(const [f,rx] of END){await load('e',f);const L2=await ev(()=>extraEnding());const hit=L2.filter(x=>rx.test(x));want.add('ending '+JSON.stringify(f));log.push(`ending ${JSON.stringify(f)}: ${hit[0]||'MISSING'}`);if(!hit.length)errs.push('ending '+JSON.stringify(f));else got.add('ending '+JSON.stringify(f))}
await load('e',{k68Brolly:'rent',k68Carve:'desk',k68Truck:'kerb',k68Sing:'sang',k68Bingo:'table',k68Boots:'new'});{const L2=await ev(()=>{S.vrom='a';return extraEnding()});if(L2.some(x=>/umbrella stand|wooden hound|parking tickets|karaoke|lilac|old boots/.test(x)))errs.push('ending leak off route')}
/* 7. text checks */
const lines=await ev(()=>window.__lines);let vbad=[];for(const [w,t] of lines){if(w==='K9'&&/n[’']t\b|[’'](re|ll|ve|m|d)\b|\b(it|that|he|she|there|what|let|who|here)[’']s\b/i.test(t.replace(/“[^”]*”/g,'')))vbad.push(t);
 if(/\b(Biscuit|Sergeant|Mochi|Pancake|Elysium)\b/.test(t))errs.push('forbidden name: '+t);if(/undefined|NaN/.test(t))errs.push('bad text: '+t)}
const vopt=await ev(()=>{const out=[];['tx_k68_heat','tx_k68_dog','tx_k68_mi','tx_k68_an'].forEach(id=>Object.values(TXS[id].nodes).forEach(n=>n.opts().forEach(o=>out.push(o.t))));return out});
for(const t of vopt)if(/n[’']t\b|[’'](re|ll|ve|m|d)\b|\b(it|that|he|she|there|what|let|who|here)[’']s\b/i.test(t))vbad.push('(option) '+t);
const pings=await ev(()=>G68P.map(x=>x[1]).join(' '));if(/\b(Biscuit|Sergeant|Mochi|Pancake|Elysium)\b|undefined/.test(pings))errs.push('bad ping text');
if(vbad.length)errs.push('V contractions: '+vbad.slice(0,5).join(' || '));
log.push('lines checked: '+lines.length);
console.log(log.join('\n'));console.log('COVERED',got.size,'of',want.size);console.log('PAGE ERRORS',errs.length,errs.slice(0,30));await b.close();process.exit(errs.length?1:0)})();

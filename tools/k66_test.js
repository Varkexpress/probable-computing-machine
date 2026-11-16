/* kc66: V and Misaki, the main route. Every beat in both POVs and every register (rom / set / wed, plus low tier and
   kc58's apart ending), every option and upstream flag, the side menu per phase and its gates, the morning-after event,
   every phone-thread path in both POVs and registers, and every ending line. Also checks V's lines for contractions, the romantic markers in the platonic registers,
   the visible text for hound names and "undefined". Usage: node tools/k66_test.js */
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
const MODE={rom:{aff:80},set:{aff:80,flags:{k66Set:1}},wed:{aff:80,flags:{married:1}},low:{aff:30},apart:{aff:80,flags:{k58End:'apart'}}};
const load=async(ph,pov,mode,flags)=>ev(([bi,ph,pov,md,flags])=>{benchLoad(BENCH[bi]);for(let k=0;k<80&&dlg;k++)adv();window.__hubbed=0;
  S.tx=null;S.dark=0;S.lone=null;S.f.abroad=0;S.f.heartbreak=0;S.pov=pov;S.rom=null;S.vrom=null;S.f.k28pair=null;S.f.married=0;S.f.k66Set=0;
  S.aff=md.aff;if(S.kd)S.kd.med=0;
  if(ph==='f'){S.phase='after';KD();S.kd.t0=S.day-5;S.kd.med=0}
  if(S.phase==='act2')S.day=Math.max(S.day,(S.act2Start||0)+2);
  if(S.phase==='act3'&&S.a3)S.day=S.a3.start+3;
  if(S.phase==='epilogue')S.f.k58End=S.f.k58End||'kept';
  S.seen=S.seen||{};S.f.k66d={};['k66Audit','k66Codes','k66Troph'].forEach(k=>delete S.f[k]);Object.assign(S.f,md.flags||{},flags||{});save()},[BI[ph],ph,pov,MODE[mode],flags||{}]);
const log=[];const fx=()=>ev(()=>JSON.stringify(Object.fromEntries(Object.entries(S.f).filter(([k])=>/^k66/.test(k)&&k!=='k66d'))));
/* [phase, fn, id, options, upstream variants] */
const R=[['n','k66Audit','vm_audit',2,[{}]],['f','k66Codes','vm_codes',2,[{},{k58Name:'name'},{k58Name:'look'}]],['2','k66Troph','vm_troph',2,[{}]],
 ['3','k66House','vm_house',1,[{},{k66Codes:'hers'},{k66Codes:'both'}]],
 ['e','k66Epi','vm_epi',1,[{},{k66Audit:'date',k66Troph:'shelf'},{k66Audit:'report',k66Troph:'pawn',lp60Fly:'more'},{k66Audit:'date',k66Troph:'pawn',lp60Fly:'more'}]]];
const ids=R.map(x=>x[2]);
/* 1. the side menu offers the right beat per phase and POV, and the option plays it */
for(const pov of ['m','v'])for(const [ph,fn,id] of R){
 await load(ph,pov,'rom');await ev(ids=>{ids.forEach(x=>S.f.k66d[x]=1)},ids.slice(0,ids.indexOf(id)));
 const due=await ev(()=>{const b=k66Due();return b&&b.id});const L=await ev(()=>sideHub(false).filter(o=>/^♥ /.test(o.t||'')).map(o=>o.t));
 log.push(`side ${pov} ${ph}: ${due} | ${L.join(' | ')}`);if(due!==id)errs.push(`side ${pov} ${ph} expected ${id}, got ${due}`);
 const r2=await ev(()=>{const b=k66Due();const o=sideHub(false).find(o=>o.t==='♥ '+b.t());if(!o)return 'none';window.__hubbed=0;o.fn();return 'ok'});const r3=await drive(0);
 if(r2!=='ok'||r3!=='hub')errs.push('side option '+pov+' '+ph+' '+r2+' '+r3);
 const after=await ev(id=>{const b=k66Due();return b?b.id:null},id);if(after===id)errs.push('beat repeats '+id)}
/* an after beat missed in the after phase is still offered in Act II, before the trophy */
await load('2','m','rom');{const d=await ev(()=>{S.kd=S.kd||{};KD();S.kd.t0=S.day-6;S.kd.med=0;const b=k66Due();return b&&b.id});log.push('act2 with codes undone → '+d);if(d!=='vm_codes')errs.push('codes not carried into act2: '+d)}
/* gates */
const G=[['n','m','rom','rom',s=>{S.rom='r'}],['n','v','rom','vrom',s=>{S.vrom='a'}],['n','m','rom','pair',s=>{S.f.k28pair={lead:'v',with:'a'}}],['n','m','low','low tier',null],
 ['2','m','rom','dark',s=>{S.dark=1}],['e','v','rom','lone',s=>{S.lone='v'}],['e','m','rom','abroad',s=>{S.f.abroad=1}],
 ['f','m','rom','infirmary',s=>{S.kd.med={d:1}}],['f','m','rom','too soon',s=>{S.kd.t0=S.day-1}],['e','m','rom','k58 end pending',s=>{S.f.k58End=null;S.f.k58_creak=1}]];
for(const [ph,pov,mode,name,patch] of G){await load(ph,pov,mode);const d=await ev(src=>{if(src)(eval('('+src+')'))(S);const b=k66Due();return b?b.id:null},patch?patch.toString():null);
 log.push(`gate ${name} → ${d}`);if(d)errs.push('gate leak '+name+' '+d)}
/* 2. every beat, both POVs, every register, every option, every upstream flag */
const want=new Set(),got=new Set();
for(const pov of ['m','v'])for(const [ph,fn,id,nopt,vars] of R)for(const mode of ['rom','set','wed','low','apart'])for(const v of vars)for(let o=0;o<nopt;o++){
 if(mode==='apart'&&ph!=='e'&&ph!=='3')continue;if(mode==='low'&&ph==='n')continue;
 await load(ph,pov,mode,v);const k=pov+' '+id+' '+mode+' '+JSON.stringify(v)+' #'+o;want.add(k);
 await ev(fn=>{window.__hubbed=0;eval(fn+'()')},fn);const r=await drive(o);const f=await fx();
 log.push(`${pov} ${fn} ${mode} ${JSON.stringify(v)} opt${o} → ${r} ${f}`);if(r!=='hub')errs.push('scene did not finish '+k);else got.add(k)}
/* each option sets its flag; the audit's report sets the set only when unmarried */
const FL=[['n','k66Audit','k66Audit',['date','report']],['f','k66Codes','k66Codes',['hers','both']],['2','k66Troph','k66Troph',['shelf','pawn']]];
for(const pov of ['m','v'])for(const [ph,fn,k,vals] of FL)for(let o=0;o<vals.length;o++)for(const mode of ['rom','wed']){await load(ph,pov,mode);await ev(fn=>{window.__hubbed=0;eval(fn+'()')},fn);await drive(o);
 const r=await ev(k=>[S.f[k],!!S.f.k66Set],k);if(r[0]!==vals[o])errs.push(`${pov} ${k} opt${o}: ${r[0]} != ${vals[o]}`);
 if(k==='k66Audit'){const exp=vals[o]==='report'&&mode==='rom';if(r[1]!==exp)errs.push(`${pov} k66Set after ${vals[o]} ${mode}: ${r[1]}`)}}
/* the register is read from the flags */
for(const [mode,exp] of [['rom','rom'],['set','set'],['wed','wed'],['low','set'],['apart','set']]){await load('e','m',mode);const r=await ev(()=>k66Mode());log.push(`mode ${mode} → ${r}`);if(r!==exp)errs.push('mode '+mode+' '+r)}
await load('e','m','wed',{k58End:'apart'});{const r=await ev(()=>k66Mode());if(r!=='set')errs.push('married apart should be set: '+r)}
/* the platonic registers never show the romantic lines */
for(const pov of ['m','v'])for(const mode of ['set','low','apart'])for(const [ph,fn] of [['3','k66House'],['e','k66Epi'],['2','k66Troph']]){
 await load(ph,pov,mode,{k66Audit:'date',k66Troph:'pawn'});await ev(()=>{window.__lines=[]});await ev(fn=>{window.__hubbed=0;eval(fn+'()')},fn);await drive(1);
 const L=await ev(()=>window.__lines.map(x=>x[1]).join(' '));if(/hand flat on (his|your) chest|prize is waiting at home|collects? (your|her) prize|PREPARED|prepared to pay|goes off (eleven|fourteen) times|full tour|tour me|familiar with it/.test(L))errs.push('romance in '+mode+' '+pov+' '+fn)}
/* 3. the morning after */
for(const pov of ['m','v'])for(const [ph,mode,flags,exp] of [['n','rom',{k66Audit:'date'},true],['n','wed',{k66Audit:'date'},true],['e','rom',{k66Audit:'date',k66d:{vm_epi:1}},true],
 ['n','rom',{k66Audit:'report'},false],['n','set',{k66Audit:'date'},false],['e','apart',{k66Audit:'date',k66d:{vm_epi:1}},false],['e','rom',{k66Audit:'date'},false],['2','rom',{k66Audit:'date'},false]]){
 await load(ph,pov,mode,flags);const w=await ev(()=>EVENTS.find(e=>e.id==='k66_morn').when());log.push(`k66_morn ${pov} ${ph} ${mode} ${JSON.stringify(flags)} → ${w}`);
 if(w!==exp)errs.push('morning when '+pov+' '+ph+' '+mode+' '+JSON.stringify(flags)+' '+w);
 if(w){const r=await ev(()=>{window.__hubbed=0;EVENTS.find(e=>e.id==='k66_morn').run(()=>{window.__hubbed=1});return 1});const d=await drive(0);if(d!=='hub')errs.push('morning did not finish '+pov+' '+mode)}}
/* 4. threads: every path through every node, both registers */
const TH={tx_k66_m:'m',tx_k66_v:'v'};
for(const id in TH)for(const mode of ['rom','set','wed']){const pov=TH[id];await load('n',pov,mode,{k66d:{vm_audit:1}});
 const w=await ev(id=>TXS[id].when(),id);if(!w)errs.push('thread not eligible '+id+' '+mode);
 const paths=await ev(id=>{const T=TXS[id];const out=[];T.nodes.start.opts().forEach((o,i)=>{if(o.next)T.nodes[o.next].opts().forEach((_,j)=>out.push([i,j]));else out.push([i])});return out},id);
 for(const path of paths){for(const kv of [{},{k58Stair:'his'}]){await load('n',pov,mode,Object.assign({k66d:{vm_audit:1}},kv));
  const r=await ev(([id,path])=>{const T=TXS[id];S.tx=null;txStart(id);S.slot++;phDeliver();let node='start';
   for(const i of path){const P=phS();const run=P.run[id];if(!run.await||run.node!==node)return 'not awaiting at '+node;const o=T.nodes[node].opts()[i];txChoose(id,o);S.slot++;phDeliver();node=o.next||null}
   const th=phS().th[T.with]||[];return th.length+' msgs, done '+!!phS().run[id].done},[id,path]);
  log.push(`${id} ${mode} path ${path.join('>')} ${JSON.stringify(kv)}: ${r}`);if(!/done true/.test(r))errs.push('thread '+id+' '+mode+' '+path.join('>')+' '+r)}}
 const opts=await ev(id=>TXS[id].nodes.start.opts().map(o=>o.t),id);log.push(`${id} ${mode} start: ${opts.join(' / ')}`);
 if(mode==='set'&&opts.some(t=>/7 is generous|My bed|wash it off/.test(t)))errs.push('romantic thread option in set '+id);
 const ins=await ev(id=>TXS[id].nodes.start.in().join(' '),id);if(mode==='set'&&/pillow|shoulder/.test(ins))errs.push('romantic thread text in set '+id)}
for(const [id,pov,patch] of [['tx_k66_m','m',{}],['tx_k66_v','v',{}],['tx_k66_m','m',{rom:'r'}],['tx_k66_v','v',{vrom:'a'}]]){await load('n',pov,'rom',patch.rom||patch.vrom?{k66d:{vm_audit:1}}:{});
 const w=await ev(([id,patch])=>{if(patch.rom)S.rom=patch.rom;if(patch.vrom)S.vrom=patch.vrom;return TXS[id].when()},[id,patch]);if(w)errs.push('thread eligible too early or off-route '+id+' '+JSON.stringify(patch))}
/* 5. ending lines */
const END=[['rom',{k66Audit:'date'},/never been written/],['set',{k66Audit:'report'},/framed cereal boxes/],['apart',{k66Audit:'date'},/Noted/],
 ['rom',{k66Codes:'hers'},/knocks on his own/],['rom',{k66Codes:'both'},/answers only to Misaki except one/],['rom',{k66Troph:'shelf'},/glued protractor/],['rom',{k66Troph:'pawn'},/three-dollar trophy/]];
for(const [mode,f,rx] of END){await load('e','m',mode,f);const L=await ev(()=>extraEnding());const hit=L.filter(x=>rx.test(x));log.push(`ending ${mode} ${JSON.stringify(f)}: ${hit[0]||'MISSING'}`);if(!hit.length)errs.push('ending '+mode+' '+JSON.stringify(f))}
await load('e','m','rom',{});{const L=await ev(()=>{S.seen.k66_morn=1;return extraEnding()});if(!L.some(x=>/crossed-out line/.test(x)))errs.push('ending morning line')}
await load('e','m','apart',{});{const L=await ev(()=>{S.seen.k66_morn=1;return extraEnding()});if(L.some(x=>/crossed-out line/.test(x)))errs.push('ending morning line after apart')}
await load('e','m','rom',{k66Audit:'date',k66Codes:'hers'});{const L=await ev(()=>{S.rom='r';return extraEnding()});if(L.some(x=>/0311|never been written/.test(x)))errs.push('ending leak onto another route')}
/* 6. text checks */
const lines=await ev(()=>window.__lines);let vbad=[];for(const [w,t] of lines){if(w==='K9'&&/n[’']t\b|[’'](re|ll|ve|m|d)\b|\b(it|that|he|she|there|what|let|who|here)[’']s\b/i.test(t.replace(/“[^”]*”/g,'')))vbad.push(t);
 if(/\b(Biscuit|Sergeant|Mochi|Pancake|Elysium)\b/.test(t))errs.push('forbidden name: '+t);if(/undefined|NaN/.test(t))errs.push('bad text: '+t)}
const vtx=await ev(()=>{const out=[];['tx_k66_m'].forEach(id=>{const T=TXS[id];Object.values(T.nodes).forEach(n=>{(n.in?n.in():[]).forEach(x=>out.push(x));n.opts().forEach(o=>(o.reply?o.reply():[]).forEach(x=>out.push(x)))})});return out});
for(const t of vtx)if(/n[’']t\b|[’'](re|ll|ve|m|d)\b|\b(it|that|he|she|there|what|let|who|here)[’']s\b/i.test(t))vbad.push('(text) '+t);
if(vbad.length)errs.push('V contractions: '+vbad.slice(0,5).join(' || '));
log.push('lines checked: '+lines.length);
console.log(log.join('\n'));console.log('COVERED',got.size,'of',want.size);console.log('PAGE ERRORS',errs.length,errs.slice(0,30));await b.close();process.exit(errs.length?1:0)})();

/* kc77: the war, the rest of it. Usage: node tools/k77_test.js
   (a) the six new beats: due in order in the right phase, play in both POVs with every option, set their flag, play once;
       the fork needs e2lAfter 'war'; the book is rivals only; fork, list and will leave the day's move free.
   (b) the case menu: offered in Act II after the car, on the route only, once a day; every action, first time with each
       option and three repeats; the shifts count.
   (c) location scenes, threads, server lines, ending lines; nothing off the route.
   Text checks: V never contracts, no hound names, no she/herself for Misaki, nothing undefined. 0 page errors. */
const path=require('path');
const ROOT=path.resolve(__dirname,'..');
const pw=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
let runs=0,fails=0;const ok=(c,m)=>{runs++;if(!c){fails++;console.log('FAIL',m)}};
(async()=>{const b=await pw.chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const pe=[];p.on('pageerror',e=>pe.push(e.message));
 await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+path.join(ROOT,'index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(500);
 await p.evaluate(()=>{globalThis.KD_AUTO=1;document.querySelectorAll('.splash').forEach(e=>e.remove());
  window.__all=[];const _s=say;say=function(L,cb){try{(L||[]).forEach(x=>{if(x)window.__all.push([x[0],String(x[1])])})}catch(e){}return _s.apply(this,arguments)};
  window.__hubbed=0;hub=function(){window.__hubbed=1};
  /* benchmark saves give each phase its real state (as tools/k73_test.js does) */
  const BI={normal:0,after:2,act2:2,act3:4,epilogue:6};
  window.__set=(pov,ph,o)=>{o=o||{};benchLoad(BENCH[BI[ph]]);for(let k=0;k<80&&dlg;k++)adv();ctrl=null;dlg=null;
   S.tx=null;S.dark=0;S.lone=null;S.f.abroad=0;S.f.heartbreak=0;S.pov=pov;S.rom=null;S.vrom=null;S.f.k28pair=null;S.f.married=0;S.seen=S.seen||{};S.done={};
   Object.keys(S.f).filter(k=>/^e2l/.test(k)).forEach(k=>delete S.f[k]);delete S.f.k64LDay;delete S.f.mbDay;delete S.f.mbN;Object.keys(S.seen).filter(k=>/^l7[37]_/.test(k)).forEach(k=>delete S.seen[k]);
   if(ph==='normal'){S.phase='normal';S.day=2;S.f.kidnapSet=0;S.f.movedIn=0;S.paid=0;if(S.kd)S.kd.med=0}
   if(ph==='after'){S.phase='after';KD();S.kd.t0=S.day-5;S.kd.med=0}
   if(ph==='act2'){S.day=Math.max(S.day,(S.act2Start||0)+2);KD();S.kd.t0=S.day-9;S.kd.med=0}
   if(ph==='act3'&&S.a3)S.day=S.a3.start+3;
   if(o.day)S.day=o.day;S.slot=1;S.aff=Math.min(S.aff,40);
   if(o.e2l!==0){S.f.e2l=1;S.f.e2lAsk=1;S.f.e2ld={e2l_mark:1};(o.done||[]).forEach(x=>S.f.e2ld[x]=1);if(!o.raw90){if((o.done||[]).includes('e2l_kennel'))S.f.e2ld.e2l_bucket=1;if((o.done||[]).includes('e2l_pair'))S.f.e2ld.e2l_table=1}if((o.done||[]).includes('e2l_after')&&!o.raw){S.f.e2ld.e2l_room=1;S.f.e2ld.e2l_thurs=1;S.f.e2ld.e2l_marks=1;S.f.e2ld.e2l_green=1}if((o.done||[]).includes('e2l_boat')&&!o.raw)S.f.e2ld.e2l_eve=1;S.f.e2lLast=0;S.f.e2l74={}}Object.assign(S.f,o.f||{});save();window.__hubbed=0}});
 const ev=(f,a)=>p.evaluate(f,a);
 const drive=async picks=>{let i=0;for(let k=0;k<300;k++){const r=await ev(pk=>{for(let j=0;j<400&&dlg;j++)adv();if(window.__hubbed)return 'hub';
   if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){os[Math.min(pk,os.length-1)].click();return 'clicked'}}return dlg?'dlg':'idle'},picks[i]||0);
  if(r==='hub')return 'hub';if(r==='clicked')i++;if(r==='idle')await p.waitForTimeout(15);await p.waitForTimeout(3)}return 'timeout'};
 /* (a) */
 const A2=['e2l_after'];
 const B={e2l_rifle:{ph:'act2',done:A2,f:{e2lAfter:'war'},fl:'e2lRifle',m:['aimed','kept'],v:['aimed','kept'],free:0,ch:'II'},
  e2l_fork:{ph:'act2',done:A2.concat('e2l_rifle'),f:{e2lAfter:'war'},fl:'e2lFork',m:['waited','potato'],v:['waited','potato'],free:1,ch:'II'},
  e2l_list:{ph:'act2',done:A2.concat('e2l_rifle','e2l_fork','e2l_car'),f:{e2lAfter:'war'},fl:'e2lList',m:['shot','cut'],v:['shot','cut'],free:1,ch:'III'},
  e2l_will:{ph:'act3',done:[],f:{},fl:'e2lWill',m:['bullet','nothing'],v:['hounds','page'],free:1,ch:'IV'},
  e2l_book:{ph:'act3',done:['e2l_will','e2l_boat'],f:{e2lEnd:'rivals'},fl:null,m:[1],v:[1],free:0,ch:'IV'},
  e2l_page:{ph:'epilogue',done:['e2l_epi'],f:{e2lEnd:'lovers'},fl:'e2lPage',m:['burned','kept'],v:['burned','kept'],free:0,ch:'V'},
  e2l_page_r:{id:'e2l_page',ph:'epilogue',done:['e2l_epi','e2l_book'],f:{e2lEnd:'rivals'},fl:'e2lPage',m:['wrote','unread'],v:['wrote','unread'],free:0,ch:'V'}};
 for(const key of Object.keys(B))for(const pov of ['m','v'])for(let o=0;o<B[key][pov].length;o++)for(const extra of (key==='e2l_list'?[{},{e2lShow:'watched'}]:key==='e2l_will'?[{},{e2lLedger:'torn'}]:[{}])){
  const w=B[key],id=w.id||key;await ev(([pov,w,extra])=>__set(pov,w.ph,{done:w.done,f:Object.assign({},w.f,extra)}),[pov,w,extra]);
  const r0=await ev(()=>{const b=k73Due();const x=b&&sideHub(false).find(x=>x.t==='⚔ '+b.t());if(!x)return 'none:'+(b&&b.id);window.__sub=x.sub;x.fn();return b.id});const r=await drive([o]);
  const st=await ev(([fl,id])=>({f:fl?S.f[fl]:1,done:!!S.f.e2ld[id],last:S.f.e2lLast===S.day,again:(k73Due()||{}).id===id,sub:window.__sub,ch:Object.keys(S.f.e2lCh||{}).join('')}),[w.fl,id]);
  ok(r0===id&&r==='hub'&&st.f===w[pov][o]&&st.done&&!st.again,`${key} ${pov} #${o}: ${r0} ${r} ${JSON.stringify(st)}`);
  ok(st.last===!w.free,`${key} ${pov} day's move ${w.free?'left free':'used'}: ${st.last}`);ok(new RegExp('the war · '+w.ch+' · \\d+ of \\d+').test(st.sub||'')&&st.ch===w.ch,`${key} ${pov} chapter ${w.ch}: ${st.sub} ${st.ch}`)}
 for(const pov of ['m','v']){
  await ev(pov=>__set(pov,'act2',{done:['e2l_after','e2l_rifle'],f:{e2lAfter:'soft'}}),pov);ok(await ev(()=>(k73Due()||{}).id)==='e2l_car',pov+' no fork after the kind answer');
  await ev(pov=>__set(pov,'after',{done:['e2l_after'],f:{e2lAfter:'war'}}),pov);ok(await ev(()=>(k73Due()||{}).id)==='e2l_rifle',pov+' rifle is offered in the after phase too');
  await ev(pov=>__set(pov,'act3',{done:['e2l_will','e2l_boat'],f:{e2lEnd:'lovers'}}),pov);ok(await ev(()=>k73Due())===null,pov+' no book for lovers');
  await ev(pov=>__set(pov,'epilogue',{done:['e2l_epi'],f:{}}),pov);ok(await ev(()=>k73Due())===null,pov+' no page without an outcome')}
 /* (b) */
 const CASE='^⚔ The case: with';const side=rx=>ev(rx=>sideHub(false).filter(o=>new RegExp(rx).test(o.t||'')).length,rx);
 for(const pov of ['m','v']){
  await ev(pov=>__set(pov,'act2',{done:['e2l_after']}),pov);ok(await side(CASE)===0,pov+' case menu waits for the car');
  await ev(pov=>__set(pov,'act2',{done:['e2l_after','e2l_car'],e2l:0}),pov);ok(await side(CASE)===0,pov+' case menu hidden off the route');
  await ev(pov=>__set(pov,'normal',{done:['e2l_after','e2l_car']}),pov);ok(await side(CASE)===0,pov+' case menu is Act II only');
  for(let act=0;act<3;act++)for(const first of [0,1]){await ev(pov=>__set(pov,'act2',{done:['e2l_after','e2l_car'],f:{e2lCar:'watch'}}),pov);ok(await side(CASE)===1,pov+' case menu offered');
   const slot=await ev(()=>S.slot);await ev(rx=>sideHub(false).find(o=>new RegExp(rx).test(o.t||'')).fn(),CASE);const r=await drive([act,first]);
   const st=await ev(()=>({n:JSON.stringify(S.f.e2l77),slot:S.slot,dis:sideHub(false).find(o=>/^⚔ The case: with/.test(o.t||'')).dis,sl:JSON.stringify(S.f.e2lSlept||{})}));
   ok(r==='hub'&&st.slot===slot+1&&st.dis===true,`${pov} case ${act} first #${first}: ${r} ${JSON.stringify(st)}`);
   for(let rep=0;rep<3;rep++){await ev(()=>{S.done={};window.__hubbed=0;k77Case()});const r2=await drive([act,rep%2]);ok(r2==='hub',`${pov} case ${act} repeat ${rep}: ${r2}`)}
   if(act===2){const s=await ev(()=>k77Slept());ok(s.m+s.v===4,pov+' shifts counted: '+JSON.stringify(s))}}
  await ev(pov=>{__set(pov,'act2',{done:['e2l_after','e2l_car']});k77Case()},pov);ok(await drive([3])==='hub'&&await ev(()=>!S.done.k77act),pov+' “not tonight” spends nothing')}
 /* (c) */
 for(const pov of ['m','v'])for(const [id,ph,room] of [['l77_ronin','act2','ronin'],['l77_stairs','after','atrium'],['l77_crepe','act2','mall'],['l77_safe','act2','studio']]){
  await ev(([pov,ph])=>__set(pov,ph,{done:['e2l_after','e2l_car']}),[pov,ph]);
  const r=await ev(([id,room])=>{const pool=l73Pool(room).map(e=>e.id);const e=K73L.find(e=>e.id===id);if(!pool.includes(id))return 'not in pool '+pool;let d=0;l73Run(e,()=>{d=1});for(let j=0;j<60&&dlg;j++)adv();return d&&S.seen[id]&&S.f.k64LDay===S.day?'ok':'unfinished'},[id,room]);ok(r==='ok',`${id} ${pov}: ${r}`);
  ok(await ev(([pov,ph,id,room])=>{__set(pov,ph,{done:['e2l_after','e2l_car'],e2l:0});return !l73Pool(room).some(e=>e.id===id)},[pov,ph,id,room]),id+' '+pov+' off the route')}
 ok(await ev(()=>{__set('m','act2',{done:['e2l_after','e2l_car'],f:{e2lEnd:'lovers'}});return !l73Pool('studio').some(e=>e.id==='l77_safe')}),'the safe closes once the boat is decided');
 for(const [id,pov] of [['tx_e2l_lock','m'],['tx_e2l_thu','v']]){
  const r=await ev(([id,pov])=>{__set(pov,'after',{done:['e2l_after']});const t=TXS[id];const on=t.when();const n=t.nodes.start;const L=[].concat(n.in());const os=n.opts();os.forEach(o=>{L.push(o.t);[].concat(o.reply()).forEach(x=>L.push(x))});
   L.forEach(x=>window.__all.push([pov==='m'?'K9':'hitmeuppp',String(x)]));__set(pov,'after',{done:['e2l_after'],e2l:0});return {on,off:t.when(),n:os.length}},[id,pov]);ok(r.on&&!r.off&&r.n===3,id+': '+JSON.stringify(r))}
 for(const ph of ['after','act3']){const r=await ev(ph=>{const seen=new Set();for(let d=1;d<8;d++){__set('m',ph,{});S.slot=d%4;chatLog().forEach(x=>seen.add(String(x[1])))}const all=K77CHAT[ph].every(c=>c.every(x=>seen.has(x[1])));
   K77CHAT[ph].forEach(c=>c.forEach(x=>window.__all.push([x[0]==='k9'?'K9':x[0],x[1]])));__set('m',ph,{e2l:0});const off=chatLog().some(x=>K77CHAT[ph].some(c=>c.some(y=>y[1]===x[1])));return {all,off}},ph);ok(r.all&&!r.off,'server '+ph+': '+JSON.stringify(r))}
 const E=[[{e2lRifle:'aimed'},/stood in front of it/],[{e2lRifle:'kept'},/never been fired/],[{e2lFork:'waited'},/could not name a date/],[{e2lSlept:{m:2,v:1}},/slept 2 nights beside V, and V 1 beside/],[{e2lFileFix:1},/corrected V’s file/],
  [{e2lWill:'hounds'},/leaves Misaki the hounds/],[{e2lWill:'nothing'},/their own page/],[{e2lPage:'burned'},/by heart/],[{e2lPage:'kept'},/go-bag/],[{e2lPage:'wrote'},/STILL COULD/]];
 for(const [f,rx] of E){const L=await ev(f=>{__set('m','epilogue',{f});return extraEnding().join(' | ')},f);ok(rx.test(L),'ending '+JSON.stringify(f));
  const L0=await ev(f=>{__set('m','epilogue',{f,e2l:0});return extraEnding().join(' | ')},f);ok(!rx.test(L0),'ending off the route '+JSON.stringify(f))}
 /* text checks */
 const all=await ev(()=>window.__all);const hounds=await ev(()=>Object.keys(S.dogs||{}).concat(['Biscuit','Sergeant','Mochi','Pancake']));
 const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
 const vbad=all.filter(x=>x[0]==='K9'&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vbad.length,'V contractions: '+vbad.slice(0,3).map(x=>x[1]).join(' || '));
 const hb=all.filter(x=>hounds.some(h=>new RegExp('\\b'+h+'\\b').test(x[1])));ok(!hb.length,'hound names: '+hb.slice(0,3).map(x=>x[1]).join(' || '));
 const sb=all.filter(x=>/\b(she|herself)\b/i.test(x[1])&&!/pawnshop|Tonight’s name|She has been waiting|She buys|She is on my list|she hunts|She keeps them|on my list for two years|what she did|she’s exactly as alive|she is exactly as alive|She is alive|while she |She knew your face/.test(x[1]));ok(!sb.length,'she/herself: '+sb.slice(0,3).map(x=>x[1]).join(' || '));
 const ub=all.filter(x=>/undefined|NaN|\[object/.test(x[1]));ok(!ub.length,'undefined in text: '+ub.slice(0,3).map(x=>x[1]).join(' || '));
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${all.length} lines checked · page errors: ${pe.length}`);console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();

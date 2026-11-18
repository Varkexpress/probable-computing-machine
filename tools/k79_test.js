/* kc79: what it costs. Usage: node tools/k79_test.js
   (a) e2l_cant, e2l_night, e2l_dress (Act III, after the corridor) and e2l_last (epilogue, lovers and rivals): due in
       order, both POVs, every option, flags, which leave the day's move free.
   (b) e2l_gone: V only, while Misaki is held, from the second day, on the route only; both options, both variants.
   (c) ending lines; nothing off the route.
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
   if(o.e2l!==0){S.f.e2l=1;S.f.e2lAsk=1;S.f.e2ld={e2l_mark:1};(o.done||[]).forEach(x=>S.f.e2ld[x]=1);if((o.done||[]).includes('e2l_after')&&!o.raw){S.f.e2ld.e2l_room=1;S.f.e2ld.e2l_thurs=1}if((o.done||[]).includes('e2l_boat')&&!o.raw)S.f.e2ld.e2l_eve=1;S.f.e2lLast=0;S.f.e2l74={}}Object.assign(S.f,o.f||{});save();window.__hubbed=0}});
 const ev=(f,a)=>p.evaluate(f,a);
 const drive=async picks=>{let i=0;for(let k=0;k<300;k++){const r=await ev(pk=>{for(let j=0;j<400&&dlg;j++)adv();if(window.__hubbed)return 'hub';
   if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){os[Math.min(pk,os.length-1)].click();return 'clicked'}}return dlg?'dlg':'idle'},picks[i]||0);
  if(r==='hub')return 'hub';if(r==='clicked')i++;if(r==='idle')await p.waitForTimeout(15);await p.waitForTimeout(3)}return 'timeout'};


 const PRE=['e2l_after','e2l_rifle','e2l_fork','e2l_car','e2l_list','e2l_stitch','e2l_pair','e2l_spar','e2l_know','e2l_test','e2l_row'];
 /* (a) Act III and the epilogue */
 const B={e2l_cant:{ph:'act3',done:PRE,f:{e2lRow:'said'},fl:'e2lCant',m:['deleted','angel'],v:['capped','pencil'],free:1,ch:'IV'},
  e2l_night:{ph:'act3',done:PRE.concat('e2l_cant','e2l_guard'),f:{e2lRow:'said'},fl:'e2lNight',m:['opened','shut'],v:['opened','shut'],free:0,ch:'IV'},
  e2l_dress:{ph:'act3',done:PRE.concat('e2l_cant','e2l_guard','e2l_night'),f:{e2lRow:'said'},fl:'e2lDress',m:['said','quiet'],v:['said','quiet'],free:1,ch:'IV'},
  e2l_last:{ph:'epilogue',done:['e2l_epi','e2l_page'],f:{e2lEnd:'lovers'},fl:'e2lPillow',m:['down','held'],v:['down','held'],free:0,ch:'V'},
  e2l_last_r:{id:'e2l_last',ph:'epilogue',done:['e2l_epi','e2l_page','e2l_book'],f:{e2lEnd:'rivals'},fl:'e2lPillow',m:['bullet','nothing'],v:['bullet','nothing'],free:0,ch:'V'}};
 for(const key of Object.keys(B))for(const pov of ['m','v'])for(const o of [0,1]){const w=B[key],id=w.id||key;await ev(([pov,w])=>__set(pov,w.ph,{done:w.done,f:w.f}),[pov,w]);
  const r0=await ev(()=>{const b=k73Due();const x=b&&sideHub(false).find(x=>x.t==='⚔ '+b.t());if(!x)return 'none:'+(b&&b.id);window.__sub=x.sub;x.fn();return b.id});const r=await drive([o]);
  const st=await ev(([fl,id])=>({f:S.f[fl],done:!!S.f.e2ld[id],last:S.f.e2lLast===S.day,again:(k73Due()||{}).id===id,sub:window.__sub}),[w.fl,id]);
  ok(r0===id&&r==='hub'&&st.f===w[pov][o]&&st.done&&!st.again,`${key} ${pov} #${o}: ${r0} ${r} ${JSON.stringify(st)}`);ok(st.last===!w.free,`${key} ${pov} day's move: ${st.last}`);
  ok(new RegExp('the war · '+w.ch+' · \\d+ of \\d+').test(st.sub||''),`${key} ${pov} sub: ${st.sub}`)}
 for(const pov of ['m','v']){
  await ev(([pov,d])=>__set(pov,'act3',{done:d}),[pov,PRE.filter(x=>x!=='e2l_row')]);ok(await ev(()=>!['e2l_cant','e2l_night','e2l_dress'].includes((k73Due()||{}).id)),pov+' nothing before the corridor');
  await ev(([pov,d])=>__set(pov,'act3',{done:d,f:{e2lEnd:'rivals'}}),[pov,PRE.concat('e2l_will','e2l_boat','e2l_book')]);ok(await ev(()=>k73Due())===null,pov+' nothing of Act III after the boat');
  await ev(pov=>__set(pov,'epilogue',{done:['e2l_epi'],f:{e2lEnd:'lovers'}}),pov);ok(await ev(()=>(k73Due()||{}).id)==='e2l_page',pov+' the page comes before the pillow')}
 /* (b) the empty trailer: V only, while Misaki is held */
 const GONE='^⚔ Their trailer';const side=rx=>ev(rx=>sideHub(false).filter(o=>new RegExp(rx).test(o.t||'')).length,rx);
 const taken=(pov,o)=>ev(([pov,o])=>{__set(pov,'normal',o||{});S.phase='taken';S.dark=1;S.captor=S.captor||captorOrg();S.takenDay=S.day-1;save()},[pov,o]);
 await taken('v');ok(await side(GONE)===1,'trailer offered to V');ok(/their trailer/.test(await ev(()=>k76Next())),'next move names the trailer');
 await taken('m');ok(await side(GONE)===0,'not offered to Misaki');
 await taken('v',{e2l:0});ok(await side(GONE)===0,'not offered off the route');
 await taken('v');await ev(()=>{S.takenDay=S.day});ok(await side(GONE)===0,'not on the first day');
 for(const o of [0,1])for(const f of [{},{e2lEye:'note',e2lPrickles:1}]){await taken('v',{f});await ev(rx=>sideHub(false).find(o=>new RegExp(rx).test(o.t||'')).fn(),GONE);const r=await drive([o]);
  const st=await ev(()=>({g:S.f.e2lGone,again:sideHub(false).filter(o=>/^⚔ Their trailer/.test(o.t||'')).length,ch:(S.f.e2lCh||{}).II,pg:k76Line('e2l_gone')}));
  ok(r==='hub'&&st.g===['recover','cactus'][o]&&st.again===0&&st.ch===1&&/TAKEN BY OTHERS/.test(st.pg),`trailer #${o}: ${r} ${JSON.stringify(st)}`)}
 /* (c) endings */
 for(const [f,rx] of [[{e2lGone:'cactus'},/under his coat/],[{e2lGone:'recover'},/first half/],[{e2lCant:'pencil'},/NOT BY ME/],[{e2lCant:'angel'},/sent it to Angel/],[{e2lNight:'opened'},/four steps back/],[{e2lNight:'shut'},/bolted door/],
   [{e2lDress:'quiet'},/garment bags/],[{e2lPillow:'held'},/does not reach for it/],[{e2lPillow:'bullet'},/neither sent it\. The bullet/],[{e2lPillow:'nothing'},/Are you alive/]]){
  const L=await ev(f=>{__set('m','epilogue',{f});return extraEnding().join(' | ')},f);ok(rx.test(L),'ending '+JSON.stringify(f));const L0=await ev(f=>{__set('m','epilogue',{f,e2l:0});return extraEnding().join(' | ')},f);ok(!rx.test(L0),'ending off the route '+JSON.stringify(f))}
 /* text checks */
 const all=await ev(()=>window.__all);const hounds=await ev(()=>Object.keys(S.dogs||{}).concat(['Biscuit','Sergeant','Mochi','Pancake']));
 const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
 const vbad=all.filter(x=>x[0]==='K9'&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vbad.length,'V contractions: '+vbad.slice(0,3).map(x=>x[1]).join(' || '));
 const hb=all.filter(x=>hounds.some(h=>new RegExp('\\b'+h+'\\b').test(x[1])));ok(!hb.length,'hound names: '+hb.slice(0,3).map(x=>x[1]).join(' || '));
 const sb=all.filter(x=>/\b(she|herself)\b/i.test(x[1])&&!/pawnshop|Tonight’s name|She has been waiting|She buys|She is on my list|she hunts|She keeps them|on my list for two years|what she did|she’s exactly as alive|she is exactly as alive|She is alive|while she |She knew your face|while she hunts|She stays on the line|She has no make-up|she made me|she says it is about/.test(x[1]));ok(!sb.length,'she/herself: '+sb.slice(0,3).map(x=>x[1]).join(' || '));
 const ub=all.filter(x=>/undefined|NaN|\[object/.test(x[1]));ok(!ub.length,'undefined in text: '+ub.slice(0,3).map(x=>x[1]).join(' || '));
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${all.length} lines checked · page errors: ${pe.length}`);console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();

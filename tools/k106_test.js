/* kc106: the infirmary, again. Usage: node tools/k106_test.js
   The forty-seven pool scenes and twelve scheduled ones are listed for the right POV and stage (Misaki's only while the room is a cell), play, and
   leave their ending lines. Text checks on the module's own lines. */
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
   if(o.e2l!==0){S.f.e2l=1;S.f.e2lAsk=1;S.f.e2ld={e2l_mark:1};(o.done||[]).forEach(x=>S.f.e2ld[x]=1);if(!o.raw90){if((o.done||[]).includes('e2l_show')||(o.done||[]).includes('e2l_kennel'))S.f.e2ld.e2l_bucket=1;if((o.done||[]).includes('e2l_pair'))S.f.e2ld.e2l_table=1}if((o.done||[]).includes('e2l_after')&&!o.raw){S.f.e2ld.e2l_room=1;S.f.e2ld.e2l_thurs=1;S.f.e2ld.e2l_marks=1;S.f.e2ld.e2l_green=1}if((o.done||[]).includes('e2l_boat')&&!o.raw)S.f.e2ld.e2l_eve=1;S.f.e2lLast=0;S.f.e2l74={}}Object.assign(S.f,o.f||{});save();window.__hubbed=0}});
 const ev=(f,a)=>p.evaluate(f,a);
 const drive=async picks=>{let i=0;for(let k=0;k<300;k++){const r=await ev(pk=>{for(let j=0;j<400&&dlg;j++)adv();if(window.__hubbed)return 'hub';
   if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){os[Math.min(pk,os.length-1)].click();return 'clicked'}}return dlg?'dlg':'idle'},picks[i]||0);
  if(r==='hub')return 'hub';if(r==='clicked')i++;if(r==='idle')await p.waitForTimeout(15);await p.waitForTimeout(3)}return 'timeout'};



 const med=(pov,o)=>ev(([pov,o])=>{__set(pov,'after',Object.assign({done:['e2l_door']},o||{}));S.kd.t0=S.day;S.kd.med={d:1,clar:(o&&o.clar)||0,run:0,sev:2};S.comp=(o&&o.comp)??50;S.slot=(o&&o.slot)||0;save()},[pov,o]);
 const SRC6=require('fs').readFileSync(path.join(ROOT,'src/kc106.js'),'utf8');const ids=p=>[...SRC6.matchAll(new RegExp("k86\\('("+p+"\\w+)'",'g'))].map(m=>m[1]);
 const IDS={cell:ids('m6_'),clear:ids('x6_'),v:ids('v6_')};ok(IDS.cell.length===18&&IDS.clear.length===12&&IDS.v.length===17,'counts: '+IDS.cell.length+'/'+IDS.clear.length+'/'+IDS.v.length);
 for(const [k,ids] of Object.entries(IDS)){const pov=k==='v'?'v':'m';await med(pov,{clar:k==='clear'?2:0});const list=await ev(()=>k85List().map(e=>e.id));
  for(const id of ids){ok(list.includes(id),id+' listed');ok(await ev(id=>{let d=0;const e=K85S.find(e=>e.id===id);e.run(()=>{d=1});for(let j=0;j<400&&dlg;j++)adv();return d},id),id+' plays')}}
 await med('m',{clar:2});ok(await ev(()=>!k85List().some(e=>/^m6_/.test(e.id))),'the cell scenes are cell-only');await med('m',{clar:0});ok(await ev(()=>!k85List().some(e=>/^x6_/.test(e.id))),'the clear scenes are clear-only');
 for(const k of ['mc','mx','v']){const n=await ev(k=>K84_POOLS[k].length,k);ok(n===({mc:4,mx:3,v:5})[k],'scheduled '+k+': '+n);for(let i=0;i<n;i++)ok(await ev(([k,i])=>{let d=0;K84_POOLS[k][i].fn(()=>{d=1});for(let j=0;j<400&&dlg;j++)adv();return d},[k,i]),'scheduled '+k+' #'+i+' plays')}
 {const L=await ev(()=>{__set('m','epilogue',{f:{e2l85:{m6_jingle:1,m6_crackers:1,x6_sandwich:1,x6_withdrawal:1,m6_scale:1},e2l84:{b6_review:1,b6_contract:1,b6_river:1},e2lEnd:'lovers'}});return extraEnding().join(' | ')});
  for(const rx of [/Management regrets the soup/,/collecting his own property/,/a dog did it/,/second verse/,/eleven crackers/,/fourteen petrol station/,/cufflinks/,/by calibre/])ok(rx.test(L),'ending '+rx)}
 const SRC=require('fs').readFileSync(path.join(ROOT,'src/kc106.js'),'utf8');const all=(await ev(()=>window.__all)).filter(x=>SRC.includes(x[1].slice(0,30)));ok(all.length>300,'own lines: '+all.length);
 const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
 const vb=all.filter(x=>(x[0]==='K9'||x[0]==='')&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vb.length,'V and narration contractions: '+vb.slice(0,3).map(x=>x[1]).join(' || '));
 const sb=all.filter(x=>/\b(she|her)\b/i.test(x[1])&&!/Angel|the woman at the desk|she writes|she cannot|She sends|as if she|You sit with her until morning|The grey hound will not settle|sit down with her on the stone|She looks at you. She knows the voice|cleans her but me|Afterwards she turns|her stream|tell her|bring me fries|could have said|You go over it all night|she would think|she would know|Angel|She is right|She has been on camera|She smells the cast|The grey one|she licks|she’s gonna find|she is going to find|Your housekeeper|You look at her for a while/.test(x[1]));ok(!sb.length,'she/her: '+sb.slice(0,2).map(x=>x[1].slice(0,80)).join(' || '));
 ok(!all.some(x=>/grandpa/i.test(x[1])),'no “grandpa”');
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();

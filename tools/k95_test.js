/* kc95: the quarrel. Usage: node tools/k95_test.js
   (a) the sequence: by stage (war / bed / up / cold), in order, one a day, either POV; nothing off the route, while
       taken, in the delusion (Misaki), or after the boat; both choices set their flags.
   (b) three more a year on, lovers and rivals, either POV.   (c) ending lines.   (d) the nickname is gone.
   Text checks: V and the narration never contract, Misaki is never she/her, no hound names, nothing undefined. */
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
 const step=async pick=>{const had=await ev(()=>{window.__hubbed=0;const e=k95Next();if(!e)return null;const t='⚔ '+K95_T[e.p][e.st][e.i];const inMenu=sideHub(0).some(o=>o.t===t);k95Run();return e.st+':'+t+(inMenu?'':' (not in menu)')});if(!had)return null;const r=await drive([pick||0]);return r==='hub'?had:'timeout'};
 const SET={war:pov=>ev(pov=>__set(pov,'normal',{}),pov),bed:pov=>med(pov,{clar:2}),up:pov=>ev(pov=>__set(pov,'after',{done:['e2l_door']}),pov),cold:pov=>ev(pov=>__set(pov,'act3',{done:['e2l_door','e2l_know','e2l_row']}),pov)};
 const N={war:5,bed:3,up:5,cold:1};
 for(const pov of ['m','v'])for(const st of ['war','bed','up','cold']){await SET[st](pov);const T=[];
  for(let d=0;d<N[st]+1;d++){const t=await step(d%2);T.push(t);if(t)ok(await step()===null,`${pov} ${st} one a day`);await ev(()=>{S.day++;save()})}
  ok(T.slice(0,N[st]).every(t=>t&&t.startsWith(st+':')&&!/timeout|not in menu/.test(t))&&T[N[st]]===null,`${pov} ${st}: ${N[st]}, then none: `+T.join(' / '));
  ok(new Set(T.slice(0,N[st])).size===N[st],`${pov} ${st} titles differ`);ok(await ev(st=>S.f.e2l95[st],st)===N[st],`${pov} ${st} counted`)}
 for(const [pick,want] of [[0,'wait'],[1,'car']]){await ev(()=>__set('m','normal',{f:{e2l95:{war:2}}}));await step(pick);ok(await ev(()=>S.f.e2l95Driver)===want,'the driver: '+want)}
 for(const [pick,want] of [[0,'struck'],[1,'stands']]){await ev(()=>__set('v','after',{done:['e2l_door'],f:{e2l95:{up:2}}}));await step(pick);ok(await ev(()=>S.f.e2l95Mit)===want,'in mitigation: '+want)}
 await med('m',{clar:0});ok(await ev(()=>k95Next())===null,'Misaki: nothing while the room is a cell');await med('v',{clar:0});ok(await ev(()=>!!k95Next()),'V: in the infirmary throughout');
 await ev(()=>__set('m','normal',{e2l:0}));ok(await ev(()=>k95Next())===null,'nothing off the route');
 await ev(()=>{__set('m','after',{done:['e2l_door']});S.f.e2lEnd='lovers'});ok(await ev(()=>k95Next())===null,'nothing after the boat');
 await ev(()=>__set('m','after',{done:[]}));ok(await ev(()=>k95Next())===null,'nothing before the door');
 /* (b) a year on */
 for(const k of ['pet','work','charges'])for(const end of ['lov','riv'])for(const m of [true,false]){const n=await ev(([k,end,m])=>{const L=K83E[k][end](m).filter(Boolean);window.__cb=0;say(L,()=>{window.__cb=1});for(let j=0;j<400&&dlg;j++)adv();return L.length},[k,end,m]);ok(n>=6,k+' '+end+' '+(m?'m':'v')+': '+n)}
 ok(await ev(()=>Object.keys(K83E).length)===6,'the year-on menu has six');
 ok(await ev(()=>K83E.pet.lov(true).some(l=>/sugar honey dumpling/.test(l[1]))),'the pet name, at last');
 /* (c) endings */
 for(const [pov,rxs] of [['m',[/in quarters/,/“the angle was better.”/,/blamed the drip/,/peaches on V’s wallpaper/,/rang a client/,/worst fuckin’ wedding/]],['v',[/No inquiry made/,/forty-one dollars/,/four-to-one/,/quarter of a million/,/“was hungry/,/the smile did not come/]]]){
  const L=await ev(pov=>{__set(pov,'epilogue',{f:{e2l95:{war:5,bed:3,up:5,cold:1},e2l95Driver:'wait',e2l95Mit:'stands',e2l83:{pet:1,charges:1},e2lEnd:'rivals'}});return extraEnding().join(' | ')},pov);for(const rx of rxs)ok(rx.test(L),pov+' ending '+rx)}
 {const L0=await ev(()=>{__set('m','epilogue',{e2l:0,f:{e2l95:{war:5,up:5},e2l95Driver:'car'}});return extraEnding().join(' | ')});ok(!/quarters|did the car/.test(L0),'no endings off the route')}
 /* (d) the nickname */
 {const fs=require('fs');const bad=fs.readdirSync(path.join(ROOT,'src')).filter(f=>/^kc(7[3-9]|8\d|9\d)\.js$/.test(f)).filter(f=>/grandpa(?!')/i.test(fs.readFileSync(path.join(ROOT,'src',f),'utf8').replace(/\/\*[\s\S]*?\*\//g,'').replace(/g_grandpa/g,'')));ok(!bad.length,'“grandpa” is gone from the route: '+bad.join(','));
  ok(/ur honour/.test(fs.readFileSync(path.join(ROOT,'src/kc73.js'),'utf8')),'“ur honour” from the oath on')}
 /* text checks */
 const all=await ev(()=>window.__all);const hounds=await ev(()=>Object.keys(S.dogs||{}).concat(['Biscuit','Sergeant','Mochi','Pancake']));
 const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
 const vbad=all.filter(x=>(x[0]==='K9'||x[0]==='')&&!/sticker that says/.test(x[1])&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vbad.length,'V and narration contractions: '+vbad.slice(0,3).map(x=>x[1]).join(' || '));
 const hb=all.filter(x=>hounds.some(h=>new RegExp('\\b'+h+'\\b').test(x[1])));ok(!hb.length,'hound names: '+hb.slice(0,3).map(x=>x[1]).join(' || '));
 const sb=[...new Set(all.filter(x=>/\b(she|her|hers|herself)\b/i.test(x[1])&&!/Angel|hound|woman|widow|girl|child|sister|pupil|be there|good at maths/.test(x[1])).map(x=>x[1].slice(0,90)))];ok(!sb.length,'she/her for anybody but Angel, a hound or a bystander: '+sb.slice(0,4).join(' || '));
 const ub=all.filter(x=>/undefined|NaN|\[object/.test(x[1]));ok(!ub.length,'undefined in text: '+ub.slice(0,3).map(x=>x[1]).join(' || '));
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${all.length} lines checked · page errors: ${pe.length}`);console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();

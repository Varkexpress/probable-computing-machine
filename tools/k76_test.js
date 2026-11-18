/* kc76: the war, made plain. Usage: node tools/k76_test.js
   (a) STRUCTURE: the beat order with the two new beats; the cold room leaves the day's move free; the mat waits for the
       first one together; every beat sits in exactly one chapter.
   (b) NEW BEATS: e2l_show and e2l_pair play in both POVs with every option, set S.f.e2lShow / S.f.e2lPair, play once,
       and feed the ending lines.
   (c) PROGRESSION: every beat opens on a chapter card; ⚔ The war so far is offered on the route only and its sub line
       names the chapter and the next move; the page renders in every phase and POV with every flag combination tried,
       with no undefined text; the hub line carries the chapter.
   (d) DARKNESS EDITS: the foundation dinner has no cake left in it; the wounded hand shows on the page.
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
  window.__set=(pov,ph,o)=>{o=o||{};if(typeof wipeRun==='function'&&S)try{wipeRun()}catch(e){}newRun(pov);for(let k=0;k<80&&dlg;k++)adv();ctrl=null;dlg=null;
   S.day=o.day||4;S.slot=1;S.aff=20;S.fr={a:60,r:60};S.heart=40;S.done={};S.seen=S.seen||{};S.phase=ph;if(ph==='act2'){S.act2Start=S.day-3;S.act2End=S.day+8}
   if(o.e2l!==0){S.f.e2l=1;S.f.e2lAsk=1;S.f.e2ld={e2l_mark:1};(o.done||[]).forEach(x=>S.f.e2ld[x]=1);S.f.e2lLast=0;S.f.e2l74={}}Object.assign(S.f,o.f||{});save();window.__hubbed=0}});
 const ev=(f,a)=>p.evaluate(f,a);
 const drive=async picks=>{let i=0;for(let k=0;k<300;k++){const r=await ev(pk=>{for(let j=0;j<400&&dlg;j++)adv();if(window.__hubbed)return 'hub';
   if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt:not(.dis)')];if(os.length){os[Math.min(pk,os.length-1)].click();return 'clicked'}}return dlg?'dlg':'idle'},picks[i]||0);
  if(r==='hub')return 'hub';if(r==='clicked')i++;if(r==='idle')await p.waitForTimeout(15);await p.waitForTimeout(3)}return 'timeout'};
 /* (a) */
 const order=await ev(()=>K73B.map(b=>b.id).join(' '));
 ok(order==='e2l_eye e2l_show e2l_lift e2l_kennel e2l_sab e2l_dinner e2l_truce e2l_after e2l_rifle e2l_fork e2l_car e2l_list e2l_stitch e2l_pair e2l_spar e2l_know e2l_test e2l_row e2l_guard e2l_will e2l_boat e2l_book e2l_epi e2l_page','order: '+order);
 const ch=await ev(()=>K73B.map(b=>K76CH.filter(c=>c.ids.includes(b.id)).length).join(''));ok(/^1+$/.test(ch),'every beat in exactly one chapter: '+ch);
 const names=await ev(()=>K76CH.reduce((a,c)=>a.concat(c.ids),[]).filter(id=>!K76NAME[id]));ok(!names.length,'beat names: '+names);
 for(const pov of ['m','v']){
  await ev(pov=>__set(pov,'normal',{done:['e2l_eye']}),pov);ok(await ev(()=>(k73Due()||{}).id)==='e2l_show',pov+' show is due after the trailer');
  await ev(()=>{S.f.e2lLast=S.day});ok(await ev(()=>k73Due())===null,pov+' show waits for the next day');
  await ev(pov=>__set(pov,'act2',{done:['e2l_after','e2l_rifle','e2l_fork','e2l_car','e2l_list','e2l_stitch']}),pov);ok(await ev(()=>(k73Due()||{}).id)==='e2l_pair',pov+' pair is due after the stitches');
  await ev(pov=>__set(pov,'act2',{done:['e2l_after','e2l_rifle','e2l_fork','e2l_car','e2l_list','e2l_stitch','e2l_pair']}),pov);ok(await ev(()=>(k73Due()||{}).id)==='e2l_spar',pov+' the mat follows the pair')}
 /* (b) */
 const W={e2l_show:{m:['watched','answered'],v:['all','minute'],fl:'e2lShow',ph:'normal',done:['e2l_eye']},e2l_pair:{m:['quick','slow'],v:['quick','slow'],fl:'e2lPair',ph:'act2',done:['e2l_after','e2l_rifle','e2l_fork','e2l_car','e2l_list','e2l_stitch']}};
 for(const id of Object.keys(W))for(const pov of ['m','v'])for(const o of [0,1]){const w=W[id];await ev(([pov,ph,done])=>__set(pov,ph,{done}),[pov,w.ph,w.done]);
  await ev(()=>{window.__n0=window.__all.length});
  const r0=await ev(()=>{const b=k73Due();const x=b&&sideHub(false).find(x=>x.t==='⚔ '+b.t());if(!x)return 'none';window.__sub=x.sub;x.fn();return b.id});const r=await drive([o]);
  const st=await ev(([fl,id])=>({f:S.f[fl],done:!!S.f.e2ld[id],last:S.f.e2lLast===S.day,next:(k73Due()||{}).id||null,sub:window.__sub,card:window.__all.slice(window.__n0).some(x=>/^Chapter (I|III)\. /.test(x[1])),ch:JSON.stringify(S.f.e2lCh||{})}),[w.fl,id]);
  ok(r0===id&&r==='hub'&&st.f===w[pov][o]&&st.done,`${id} ${pov} #${o}: ${r0} ${r} ${JSON.stringify(st)}`);
  ok(/the war · (I|III) · \d of \d/.test(st.sub||''),`${id} ${pov} sub line: ${st.sub}`);ok(st.card,`${id} ${pov} chapter card line`);
  if(id==='e2l_show')ok(!st.last&&st.next==='e2l_lift',`${pov} show leaves the day free: ${JSON.stringify(st)}`);else ok(st.last&&st.next===null,`${pov} pair uses the day: ${JSON.stringify(st)}`)}
 for(const [fl,v,rx] of [['e2lShow','watched',/eating cereal/],['e2lShow','answered',/pillow through a scope/],['e2lPair','quick',/never entered him/],['e2lPair','slow',/hands were steady/]]){
  const L=await ev(([fl,v])=>{__set('m','act3',{f:{[fl]:v}});return extraEnding().join(' | ')},[fl,v]);ok(rx.test(L),'ending line '+fl+' '+v)}
 ok(!/cold room|held a man down|killed together/.test(await ev(()=>{__set('m','act3',{e2l:0,f:{e2lShow:'watched',e2lPair:'slow'}});return extraEnding().join(' | ')})),'no ending lines off the route');
 /* (c) cards on every beat */
 const cards=await ev(()=>{const out=[];for(const b of K73B){__set('m','normal',{});window.__n0=window.__all.length;let called=0;const c=K76CH.find(c=>c.ids.includes(b.id));S.phase=c.ph[c.ph.length-1];
   try{k76Card(b.id,()=>{called=1})}catch(e){out.push(b.id+' threw '+e.message)}for(let j=0;j<20&&dlg;j++)adv();if(!called)out.push(b.id+' card did not finish');
   if(!window.__all.slice(window.__n0).length)out.push(b.id+' no card line')}return out});ok(!cards.length,'cards: '+cards.join(', '));
 ok(await ev(()=>{__set('m','normal',{e2l:0});let c=0;k76Card('e2l_eye',()=>{c=1});return c===1&&!dlg}),'no card off the route');
 /* the side entry, the hub line, the page */
 for(const pov of ['m','v']){
  await ev(pov=>__set(pov,'normal',{e2l:0}),pov);ok(await ev(()=>!sideHub(false).some(o=>/^⚔ The war so far/.test(o.t||''))&&!/⚔/.test(hubLine0())),pov+' nothing off the route');
  await ev(pov=>__set(pov,'normal',{done:['e2l_eye','e2l_show'],f:{e2lEye:'note',e2lShow:pov==='m'?'watched':'all'}}),pov);
  const s=await ev(()=>{const o=sideHub(false).filter(o=>/^⚔ The war so far/.test(o.t||''));return {n:o.length,sub:o[0]&&o[0].sub,hl:hubLine0()}});
  ok(s.n===1&&/free · I · the oath · 3 of \d+ · Next move, today: /.test(s.sub),pov+' side entry: '+JSON.stringify(s));ok(/⚔ The war · I · The oath · 3 of \d+\./.test(s.hl),pov+' hub line: '+s.hl);
  await ev(()=>{S.f.e2lLast=S.day});ok(/tomorrow/.test(await ev(()=>k76Next())),pov+' next: tomorrow');
  await ev(()=>{sideHub(false).find(o=>/^⚔ The war so far/.test(o.t||'')).fn()});
  const pg=await ev(()=>{const el=document.querySelector('.panel');const t=el?el.innerText:'';const b=[...document.querySelectorAll('.panel .opt')].find(x=>/Close/.test(x.textContent));window.__hubbed=0;b&&b.click();return {t,closed:window.__hubbed}});
  ok(/I · THE OATH · 3 of/.test(pg.t)&&/II · THE DEBT · not yet/.test(pg.t)&&/The cold room\./.test(pg.t)&&/one eye, and the rest/.test(pg.t)&&/Dead of it so far \(2\)/.test(pg.t)&&pg.closed===1,pov+' page: '+pg.t.slice(0,300))}
 /* the page across phases and flags */
 const FL={e2lOath:['loud','quiet','ledger','file'],e2lEye:['scope','note'],e2lShow:['watched','answered','all','minute'],e2lLift:['m','v','held'],e2lKennel:['fed','rifle','stay','set'],e2lLoose:['word','hand','again','called',null],
  e2lSab:['m','v'],e2lDinner:['glass','clean','drank','fern'],e2lTruce:['m','v'],e2lPride:['debt','true'],e2lLedger:['kept','torn',null],e2lAfter:['war','soft'],e2lCar:['bet','watch'],e2lScar:['neat','crooked'],e2lPair:['quick','slow'],e2lSpar:['kiss','pin'],e2lRifle:['aimed','kept'],e2lFork:['waited','potato'],e2lList:['shot','cut'],e2lWill:['bullet','nothing','hounds','page'],e2lPage:['burned','kept','wrote','unread'],e2lSlept:[{m:1,v:2},null],e2lKnow:['hide','watch',null],e2lTest:['fought','laughed'],e2lRow:['said','silent',null,null],e2lGuard:['own','blame']};
 const ALL=await ev(()=>K76CH.reduce((a,c)=>a.concat(c.ids),[]).filter(id=>!['e2l_yard','e2l_med','e2l_morn'].includes(id)));
 let pages=0;const bad=[];
 for(const pov of ['m','v'])for(const [ph,end] of [['normal',null],['taken',null],['after',null],['act2',null],['act3',null],['act3','lovers'],['act3','rivals'],['epilogue','lovers'],['epilogue','rivals']])for(let k=0;k<4;k++){
  const f={};Object.keys(FL).forEach((key,i)=>{const v=FL[key][(k+i)%FL[key].length];if(v)f[key]=v});if(end)f.e2lEnd=end;f.e2lTally={m:k,v:k+1};f.e2lVM=k;f.e2lMM=k%3;f.e2lMC=k%2;f.selfEscape=k%2;
  const t=await ev(([pov,ph,f,ALL,k])=>{__set(pov,ph,{done:k===3?[]:ALL,f});if(ph==='epilogue'&&f.e2lEnd==='lovers')S.seen.e2l_morn=1;k76Page(()=>{});const el=document.querySelector('.panel');return (el?el.innerText:'NO PANEL')+' || '+k76Stand()+' || '+k76Next()+' || '+k76Short()},[pov,ph,f,ALL,k]);pages++;
  if(/undefined|NaN|\[object|NO PANEL|\.\.|  \./.test(t))bad.push(pov+' '+ph+' '+k+': '+(t.match(/.{40}(undefined|NaN|\[object|NO PANEL|\.\.|  \.).{40}/)||[t.slice(0,80)])[0]);
  if(pov==='v'&&/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|it|that|there)’(?:s|re|ve|ll|d|m)\b/i.test(t))bad.push('V page contraction '+ph+' '+k+': '+t.match(/.{30}’(?:t|s|re|ve|ll|d|m)\b.{20}/)[0]);
  if(/\b(she|herself)\b/i.test(t.replace(/Angel opened her envelope/g,'')))bad.push('she on page '+pov+' '+ph+' '+k)}
 ok(!bad.length,'pages: '+bad.slice(0,6).join(' || '));
 /* the kidnapping cards */
 ok(await ev(()=>{__set('v','taken',{});let c=0;k73Come(()=>{c=1});for(let j=0;j<3&&dlg;j++)adv();return !!(S.f.e2lCh||{}).II}),'the river opens chapter II');
 /* (d) */
 const src=require('fs').readFileSync(path.join(ROOT,'src/kc73.js'),'utf8');ok(!/cake|buttercream|SHOWER CURTAIN/i.test(src),'no cake or shower curtain left in kc73');
 for(const pov of ['m','v'])for(const o of [0,1]){await ev(pov=>{__set(pov,'normal',{});window.__hubbed=0;k73Sab()},pov);const r=await drive([o]);const st=await ev(()=>({sab:S.f.e2lSab,b:k76Blood().join(' ')}));
  ok(r==='hub'&&!!st.sab,`dinner ${pov} #${o}: ${r} ${JSON.stringify(st)}`)}
 ok(/nine stitches/.test(await ev(()=>{__set('m','normal',{done:['e2l_sab'],f:{e2lSab:'v'}});return k76Blood().join(' ')})),'the hand shows under blood drawn');
 /* text checks */
 const all=await ev(()=>window.__all);const hounds=await ev(()=>Object.keys(S.dogs||{}).concat(['Biscuit','Sergeant','Mochi','Pancake']));
 const contr=/\b(?:can|won|don|isn|aren|wasn|weren|doesn|didn|couldn|wouldn|shouldn|hasn|haven|hadn)’t\b|\b(?:I|you|we|they|he|she|it|that|there|what|who|here|let)’(?:s|re|ve|ll|d|m)\b/i;
 const vbad=all.filter(x=>x[0]==='K9'&&contr.test(x[1].replace(/“[^”]*”/g,'')));ok(!vbad.length,'V contractions: '+vbad.slice(0,3).map(x=>x[1]).join(' || '));
 const hb=all.filter(x=>hounds.some(h=>new RegExp('\\b'+h+'\\b').test(x[1])));ok(!hb.length,'hound names: '+hb.slice(0,3).map(x=>x[1]).join(' || '));
 const sb=all.filter(x=>/\b(she|herself)\b/i.test(x[1]));ok(!sb.length,'she/herself: '+sb.slice(0,3).map(x=>x[1]).join(' || '));
 const ub=all.filter(x=>/undefined|NaN|\[object/.test(x[1]));ok(!ub.length,'undefined in text: '+ub.slice(0,3).map(x=>x[1]).join(' || '));
 ok(!pe.length,'page errors: '+pe.slice(0,5).join(' | '));
 console.log(`${all.length} lines checked · ${pages} pages rendered · page errors: ${pe.length}`);console.log(`${runs-fails}/${runs} checks passed`);await b.close();process.exit(fails?1:0)})();

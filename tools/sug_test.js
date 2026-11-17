/* kc70 setting, part A: every scene branched on sugOn() outside kc65–kc68 is run with META.sug=1 and META.sug=0.
   Asserts no page errors, that the off text differs from the on text, and that both leave S in the same state.
   Usage: node tools/sug_test.js [repo root]   (V=1 for verbose) */
const ROOT=process.argv[2]||require('path').resolve(__dirname,'..');
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];
p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+ROOT+'/index.html');await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);
await p.evaluate(()=>{globalThis.KD_AUTO=1;document.querySelectorAll('.splash').forEach(e=>e.remove())});
const ev=(f,a)=>p.evaluate(f,a);let bad=0,runs=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
await ev(()=>{window.__drain=(pick,lines)=>{let first=1,lastD=null,lastI=-1;for(let k=0;k<60;k++){for(let i=0;i<400&&dlg;i++){try{if(dlg!==lastD||dlg.i!==lastI){lastD=dlg;lastI=dlg.i;lines.push(dlg.lines[dlg.i].join(': '))}}catch(e){}adv()}
  if(ctrl&&ctrl.box){const os=[...ctrl.box.querySelectorAll('.opt')];const en=os.filter(o=>!o.classList.contains('dis'));if(!en.length)break;lines.push('['+os.map(o=>o.textContent).join(' / ')+']');
   const o=os[Math.min(first?pick:0,os.length-1)];(o.classList.contains('dis')?en[0]:o).click();first=0;continue}if(!dlg)break}}});
/* a run per setting from the same saved state, with the same random numbers */
const both=async(label,code,pick,setup,povBench)=>{runs++;
 await ev(i=>{benchLoad(BENCH[i]);for(let k=0;k<80&&dlg;k++)adv();if(ctrl&&ctrl.close)try{ctrl.close()}catch(e){}},povBench||0);
 const r=await ev(([code,pick,setup])=>{const base='S.dark=0;S.lone=null;S.f.abroad=0;if(S.kd)S.kd.med=null;S.fr={a:60,r:60};S.aff=80;S.phase="normal";S.day=Math.max(S.day||0,9);S.talks={};S.rom=null;S.vrom=null;S.done={};S.slot=0;';
  (new Function(base+setup))();const snap=JSON.stringify(S);const out={};const rnd=Math.random;
  for(const sug of [1,0]){Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,JSON.parse(snap));META.sug=sug;let seed=7;Math.random=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
   const L=[];let d=0,err=null;try{(new Function('cb',code))(()=>{d=1});__drain(pick,L)}catch(e){err=e.message+' '+(e.stack||'').split('\n')[1]}
   Math.random=rnd;out[sug]={L:L.join('\n'),d,err,st:JSON.stringify(S)}}
  META.sug=1;return out},[code,pick,setup]);
 for(const s of [1,0]){if(r[s].err)ok(0,label+' sug'+s+' ERR '+r[s].err);ok(r[s].L.length>0,label+' sug'+s+' no text')}
 ok(r[1].L!==r[0].L,label+' off text is the same as on');
 ok(r[1].st===r[0].st,label+' state differs between settings');
 if(process.env.V)console.log('---',label,'\nON:',r[1].L.slice(0,400),'\nOFF:',r[0].L.slice(0,400));return r};
/* a plain value per setting */
const val=async(label,expr,setup)=>{runs++;const r=await ev(([expr,setup])=>{(new Function(setup||''))();const o={};for(const s of [1,0]){META.sug=s;o[s]=(new Function('return '+expr))()}META.sug=1;return o},[expr,setup]);
 ok(r[1]&&r[0]&&r[1]!==r[0],label+' '+JSON.stringify(r));if(process.env.V)console.log('---',label,JSON.stringify(r))};

/* index.html: the V x Misaki wedding night (fade-out) */
await both('weddingNight','weddingNight();cb()',0,'S.q.wedding=6;');
/* index.html: the morning after the wedding, Misaki x Ronin and Misaki x Angel */
for(const k of ['r','a'])await both('romAfter '+k,'romAfter();cb()',0,`S.rom="${k}";S.romDates=3;S.q.romwed=3;`);
await val('romwed hub label',`romWedHub(false).find(o=>o.fn===romAfter).t`,'S.rom="r";S.romDates=3;S.q.romwed=3;');
await val('romwed step',`QUESTS.romwed.steps[3]`);
/* td15: V and Angel, the confession's yes */
await both('vromConfess a','vromConfess("a");cb()',0,'S.f.movedIn=0;S.aff=40;S.f.wasRide=0;',1);
/* td28: V or Misaki and the other partner, the first date */
await both('k28_pair2 a','K22EV.find(e=>e.id==="k28_pair2").run(cb)',0,'S.rom="r";S.romDates=3;S.f.k28pair=null;');
/* kc64: the V/Misaki bath on the shelf */
for(const bi of [0,1])await both('f64_shelf '+bi,'const e=K64L.find(e=>e.id==="f64_shelf");l64Run(e,cb)',0,'S.seen.f64_shelf=0;S.f.k64LDay=0;',bi);

console.log(`sug_test: ${runs} checks, ${bad} failures, ${errs.length} page errors`);errs.slice(0,5).forEach(e=>console.log('  ',e));
await b.close();process.exit(bad||errs.length?1:0)})();

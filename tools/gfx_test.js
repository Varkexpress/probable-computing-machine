const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1100,height:700}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+require('path').resolve(__dirname,'../index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(600);
const ev=(f,a)=>p.evaluate(f,a);const clr=()=>ev(()=>{for(let i=0;i<60&&dlg;i++)adv();ctrl=null;ui.querySelectorAll('.panel,.dlg,.feed').forEach(e=>e.remove())});
await ev(()=>{document.querySelectorAll('.splash').forEach(e=>e.remove());benchLoad(BENCH[0]);for(let i=0;i<60&&dlg;i++)adv();S.slot=1});
const shots=[['atrium',()=>toRoom('atrium',[160,150])],['studio',()=>{TD.resume=null;toRoom('studio',[160,150])}],['harbour',()=>toRoom('harbour',[160,150])]];
for(const [n,f] of shots){for(const fx of [1,0]){await ev(fx=>{META.fx=fx},fx);await ev(f);await p.waitForTimeout(900);await clr();await p.waitForTimeout(300);await (await p.$('#stage')).screenshot({path:require('os').tmpdir()+'/g_'+n+fx+'.png'})}}
await ev(()=>{META.fx=1;S.f.mariaKnown=1;PHONE.sel='feed';S.f.mariaShootDone=3;phone('dm')});await p.waitForTimeout(300);await (await p.$('#stage')).screenshot({path:require('os').tmpdir()+'/g_feed.png'});
console.log('ERR',errs);await b.close()})();

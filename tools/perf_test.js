// Frame cost per area, enhanced vs classic graphics. Headless software rendering: compare relative numbers only.
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1100,height:700}});
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+require('path').resolve(__dirname,'../index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(500);
const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{document.querySelectorAll('.splash').forEach(e=>e.remove());benchLoad(BENCH[4]);for(let i=0;i<60&&dlg;i++)adv();const t=tdS();Object.assign(t.f,{curioOpen:1,mirrorOpen:1,projKey:1,tunnelMap:1,domeAsked:1,domeDay:-5,b4key:1,b5code:1})});
const spots=[['atrium',()=>toRoom('atrium',[160,150])],['library',()=>tdGo('deep',22,78,'d')],['dome',()=>tdGo('deep',48,52,'d')],['depot',()=>tdGo('deep',38,8,'d')],['forest',()=>tdGo('forest',20,22,'d')],['city',()=>tdGo('city',18,10,'d')],['harbour',()=>tdGo('harbour',12,8,'d')]];
for(const [n,f] of spots){const row=[];for(const fx of [1,0]){await ev(fx=>{META.fx=fx},fx);await ev(f);await p.waitForTimeout(700);await ev(()=>{for(let i=0;i<60&&dlg;i++)adv()});
  const ms=await ev(()=>{const t0=performance.now();for(let i=0;i<60;i++){T++;scene.update&&scene.update();scene.draw()}return (performance.now()-t0)/60});row.push(ms.toFixed(2))}
 console.log(n.padEnd(9),'enhanced',row[0],'ms  classic',row[1],'ms')}
await b.close()})();

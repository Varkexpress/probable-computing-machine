const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+require('path').resolve(__dirname,'../index.html'));await p.waitForTimeout(500);
const res=await p.evaluate(async()=>{const out=[];const SR=22050;
 for(const name of Object.keys(TRACKS)){const tr=TRACKS[name];const n=tr.steps||16;const steps=n*tr.ch.length*2;const dur=steps*60/tr.bpm/4+3;
  const off=new OfflineAudioContext(2,Math.ceil(SR*dur),SR);AC=off;MG=off.createGain();MG.gain.value=.3;MG.connect(off.destination);MZ.on=false;MZ.amb={};mzInit();curTrack=name;MZ.genPrev={};
  let errs=0;for(let st=0;st<steps;st++){try{mzStep(tr,st,.05+st*60/tr.bpm/4+(tr.swing&&st%2?tr.swing*60/tr.bpm/4:0))}catch(e){errs++;if(errs<2)out.push(name+' ERR '+e.message)}}
  const buf=await off.startRendering();const d=buf.getChannelData(0);let pk=0,ss=0;for(let i=0;i<d.length;i++){const v=Math.abs(d[i]);if(v>pk)pk=v;ss+=d[i]*d[i]}
  out.push(name.padEnd(8)+' peak '+pk.toFixed(3)+' rms '+Math.sqrt(ss/d.length).toFixed(4)+' secs '+dur.toFixed(1))}
 return out.join('\n')});
console.log(res);console.log('ERR',errs.slice(0,5));await b.close()})();

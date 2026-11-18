/* Offline render of every track: levels, NaN, stereo width, per-loop loudness (does the song have a shape?), and the force-track API.
   node tools/mz.js [loops=3] [track ...] */
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const LOOPS=+(process.argv[2]||3),ONLY=process.argv.slice(3);
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push(m.text())});
await p.route('**/fonts.g*/**',r=>r.abort());await p.goto('file://'+require('path').resolve(__dirname,'../index.html'));await p.waitForTimeout(500);
const res=await p.evaluate(async([LOOPS,ONLY])=>{const out=[];const SR=22050;let bad=0;
 for(const name of Object.keys(TRACKS)){if(ONLY.length&&!ONLY.includes(name))continue;const tr=TRACKS[name];const n=tr.steps||16,per=n*tr.ch.length,steps=per*LOOPS,sd=60/tr.bpm/4;const dur=steps*sd+3;
  const off=new OfflineAudioContext(2,Math.ceil(SR*dur),SR);AC=off;MG=off.createGain();MG.gain.value=.3;MG.connect(off.destination);MZ.on=false;MZ.amb={};mzInit();curTrack=name;MZ.genPrev={};MZ.vprev={};MZ.phr={};
  let errs=0;for(let st=0;st<steps;st++){try{mzStep(tr,st,.05+st*sd+(tr.swing&&st%2?tr.swing*sd:0))}catch(e){errs++;if(errs<2)out.push(name+' ERR '+e.message)}}
  const buf=await off.startRendering();const d=buf.getChannelData(0),d1=buf.getChannelData(1);let pk=0,ss=0,nan=0,side=0;
  for(let i=0;i<d.length;i++){const v=Math.abs(d[i]);if(!(v===v))nan++;else{if(v>pk)pk=v;ss+=d[i]*d[i];side+=(d[i]-d1[i])*(d[i]-d1[i])}}
  const rms=Math.sqrt(ss/d.length),lp=[];for(let l=0;l<LOOPS;l++){const a=Math.floor((.05+l*per*sd)*SR),z=Math.min(d.length,Math.floor((.05+(l+1)*per*sd)*SR));let q=0;for(let i=a;i<z;i++)q+=d[i]*d[i];lp.push(Math.sqrt(q/Math.max(1,z-a)).toFixed(4))}
  const flag=(nan||pk>=.18||(rms<.006&&name!=='white')||rms>.024)?'  <-- CHECK':'';if(flag)bad++;
  out.push(name.padEnd(8)+' peak '+pk.toFixed(3)+' rms '+rms.toFixed(4)+' width '+Math.sqrt(side/d.length).toFixed(4)+' loops ['+lp.join(' ')+'] secs '+dur.toFixed(0)+(nan?' NaN '+nan:'')+flag)}
 MZ.force=null;mzForce('grief');const a=pickTrack();mzForce(null);const b2=pickTrack();out.push('force api: forced='+a+' released='+b2+(a==='grief'&&b2!=='grief'?' OK':' FAIL'));
 out.push('flagged '+bad);return out.join('\n')},[LOOPS,ONLY]);
console.log(res);console.log('ERR',errs.slice(0,5));await b.close()})();

/* Minigame harness: starts every minigame headlessly and plays it with several input policies
   (idle, quit with Esc, random keys, random touch). Reports whether each one finishes, how long it
   takes, and any page errors. Frames are stepped by hand (the rAF loop is stopped) so runs are
   deterministic in length.  Usage: node tools/mg_test.js [nameFilter] [--shots] */
const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'),fs=require('fs');
const FILTER=process.argv.slice(2).find(a=>!a.startsWith('--'))||'';const SHOTS=process.argv.includes('--shots');
const SHOTDIR=process.env.MG_SHOTS||path.join(require('os').tmpdir(),'mg_shots');
/* [name, bench index, launcher source; the launcher must end the game by calling __cb(...)] */
const G=[
 ['snipe',0,`snipe(TARGETS[0],__cb)`],
 ['stealth',0,`stealth({map:GALA,guards:GALA_G,title:'Gala',hint:'Reach the white suit, press E.',takedown:1},__cb)`],
 ['poison',0,`poison(TARGETS[1],__cb)`],
 ['simon',0,`simon({title:'Decrypt',rounds:[3,4,5]},__cb)`],
 ['hydro',1,`hydro(__cb)`],
 ['rhythm',0,`rhythm('Spar with V',__cb)`],
 ['kennelShift',1,`kennelShift(__cb)`],
 ['lockpick',0,`lockpick(__cb)`],
 ['cook',1,`cook(__cb)`],
 ['duel',0,`duel(__cb)`],
 ['fetchGame',1,`fetchGame(__cb)`],
 ['ground',2,`ground(__cb)`],
 ['knitGame',0,`knitGame(__cb)`],
 ['pottery',0,`pottery(__cb)`],
 ['clawGame',0,`clawGame(__cb)`],
 ['disguiseJob',1,`disguiseJob(TARGETS[2],__cb)`],
 ['accidentJob',0,`accidentJob(TARGETS[2],__cb)`],
 ['fishing',0,`fishing(__cb)`],
 ['snakeGame',0,`snakeGame(__cb)`],
 ['bakeGame',0,`bakeGame(__cb)`],
 ['rehearse',0,`rehearse(__cb)`],
 ['recordDig',0,`recordDig(__cb)`],
 ['cleanup',0,`cleanup(__cb)`],
 ['trickGame',1,`trickGame('Biscuit',1,__cb)`],
 ['capsuleGame',0,`capsuleGame(__cb)`],
 ['boothGame',0,`boothGame(0,__cb)`],
 ['hb_fishGame',0,`hb_fishGame(__cb)`],
 ['hb_stones',0,`hb_stones(__cb)`],
 ['pk2_shootGame',0,`pk2_shootGame(__cb)`],
 ['pk2_scareGame',0,`pk2_scareGame(__cb)`],
 ['ld_sockGame',0,`ld_sockGame(__cb)`],
 ['ld_bloodGame',0,`ld_bloodGame(__cb)`],
 ['sh_lanternGame',0,`sh_lanternGame(__cb)`],
 ['sh_sweepGame',0,`sh_sweepGame(__cb)`],
 ['st_rushGame',0,`st_rushGame(__cb)`],
 ['st_tailGame',0,`st_tailGame(__cb)`],
 ['fenceGame',6,`fenceGame(__cb)`],
 ['trackGame',6,`trackGame(__cb)`],
 ['dpRange',1,`dpRange(__cb)`],
 ['kdHoldOn',0,`kdHoldOn(__cb)`],
 ['kdTurn',0,`kdTurn(__cb)`],
 ['llNight',-1,`llNight('v',1,__cb,'station')`],
 ['llNightM',-1,`llNight('m',1,__cb,'yard')`],
 ['llHush',-1,`llHush(__cb)`],
 ['llBench',-1,`llBench('v',__cb)`],
 ['llInspectV',-1,`llInspect('v',__cb)`],
 ['llInspectM',-1,`llInspect('m',__cb)`],
 ['llGen',-1,`llGen(__cb)`],
 ['llScarfV',-1,`llScarf('v',__cb)`],
 ['llScarfM',-1,`llScarf('m',__cb)`],
 ['kitchen',1,`kitchen(RECIPES[0],'atrium',null,()=>__cb('back'))`,1],
 ['pianoGame',1,`pianoGame()`],
 ['chaseRun',1,`tdGo('forest',8,18,'r');chaseStart('run');ui.innerHTML='';dlg=null;ctrl=null;(function w(){const sc=scene,u=sc.update.bind(sc);sc.update=function(){u();if(TDP.chase&&TDP.chase.done&&!window.__done)__cb('chase',TDP.chase.mode)}})()`],
 ['chaseHunt',1,`tdGo('forest',8,18,'r');chaseStart('hunt');ui.innerHTML='';dlg=null;ctrl=null;(function w(){const sc=scene,u=sc.update.bind(sc);sc.update=function(){u();if(TDP.chase&&TDP.chase.done&&!window.__done)__cb('chase',TDP.chase.mode)}})()`],
];
const POL=process.argv.includes('--shotsonly')?[]:['idle','quit','keys','touch'];const SHOTF=+((process.argv.find(a=>a.startsWith('--at='))||'--at=40').slice(5));
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:960,height:600}});const errs=[];
 p.on('pageerror',e=>errs.push(e.message+' @'+((e.stack||'').split('\n')[1]||'').trim().slice(0,90)));
 await p.route('**/three.min.js',r=>r.abort());await p.route('**/fonts.g*/**',r=>r.abort());
 await p.goto('file://'+path.resolve(__dirname,'../index.html'));await p.waitForTimeout(500);await p.keyboard.press('x');await p.waitForTimeout(500);
 await p.evaluate(()=>{document.querySelectorAll('.splash').forEach(e=>e.remove());window.requestAnimationFrame=()=>0;
  window.__run=function(src,bi,pol,maxF,seed,intro){let rs=seed|0;const R=()=>{rs=(rs*1103515245+12345)&0x7fffffff;return rs/0x7fffffff};
   for(const k in held)held[k]=0;for(const k in pressed)pressed[k]=0;ui.innerHTML='';dlg=null;ctrl=null;
   if(bi>=0){benchLoad(BENCH[bi]);ui.innerHTML='';dlg=null;ctrl=null}else{S=null;AUON=true}
   window.__done=null;window.__cb=function(){window.__done=[].slice.call(arguments).map(a=>typeof a==='object'?JSON.stringify(a):a)};
   (0,eval)(src);if(intro){let k=0;while(dlg&&k++<200)adv()}const s0=scene;let f=0,ended='',tapHeld=0,why='';
   const K=['up','down','left','right','act','alt'];
   for(;f<maxF;f++){T++;
    if(pol==='quit'&&f===90){pressed.back=1;held.back=1}if(pol==='quit'&&f===92)held.back=0;
    if(pol==='keys'){for(const k of K){if(R()<.06){held[k]=held[k]?0:1;if(held[k])pressed[k]=1}}}
    if(pol==='touch'&&scene===s0){if(tapHeld>0&&--tapHeld===0){if(scene.onRelease)scene.onRelease();held.act=0;['up','down','left','right'].forEach(k=>held[k]=0)}
     if(!tapHeld&&R()<.08){const x=R()*320,y=14+R()*166;tapHeld=1+Math.floor(R()*30);
      if(scene.onTap)scene.onTap(x,y);else if(x<120){const d=['up','down','left','right'][Math.floor(R()*4)];held[d]=1;pressed[d]=1}else{pressed.act=1;held.act=1}}}
    try{if(ctrl)ctrl.update();else if(dlg){if(hit('act'))adv()}else if(scene&&scene.update)scene.update()}catch(e){why='update error: '+e.message;break}
    try{c.setTransform(SC,0,0,SC,0,0);if(scene&&scene.draw)scene.draw()}catch(e){why='draw error: '+e.message;break}
    for(const k in pressed)pressed[k]=0;
    if(window.__done){ended='cb';break}if(scene!==s0||dlg||ctrl){ended='scene';break}}
   for(const k in held)held[k]=0;AUON=false;
   return {f,ended,why,res:window.__done};};
 });
 /* the game should step 60 times a second whatever the display refresh rate */
 const fr=await p.evaluate(()=>{const pn=performance.now.bind(performance);let fake=pn();performance.now=()=>fake;const res={};
  for(const hz of [30,60,120,144,240]){for(let i=0;i<30;i++){fake+=1000/hz;frame()}const t0=T;for(let i=0;i<hz;i++){fake+=1000/hz;frame()}res[hz]=T-t0}performance.now=pn;return res});
 console.log('steps per second at 30/60/120/144/240 Hz:',JSON.stringify(fr));if(fr[120]>66||fr[144]>66||fr[240]>66||fr[60]<54)console.log('FRAMERATE FAIL');
 const out=[];let fails=(fr[120]>66||fr[144]>66||fr[240]>66||fr[60]<54)?1:0;
 for(const [n,bi,src,intro] of G){if(FILTER&&!n.includes(FILTER))continue;const row=[n];
  for(const pol of POL){const e0=errs.length;let r;
   try{r=await p.evaluate(([s,bi,pol,intro])=>__run(s,bi,pol,60*150,7,intro),[src,bi,pol,intro||0])}catch(e){r={f:0,ended:'',why:'eval: '+e.message.split('\n')[0]}}
   const pe=errs.slice(e0);if(pe.length||r.why||(pol==='quit'&&(!r.ended||r.f>60*10))){fails++;row.push('FAIL')}
   row.push(`${pol}:${r.ended?r.ended+'@'+(r.f/60).toFixed(1)+'s':'NOEND'}${r.res?'='+JSON.stringify(r.res).slice(0,40):''}${r.why?' !'+r.why:''}${pe.length?' PAGEERR '+pe[0]:''}`);
  }
  if(SHOTS){fs.mkdirSync(SHOTDIR,{recursive:true});
    await p.evaluate(([s,bi,intro,f])=>{__run(s,bi,'idle',f,1,intro)},[src,bi,intro||0,SHOTF]);await (await p.$('#stage')).screenshot({path:path.join(SHOTDIR,n+'_'+SHOTF+'.png')})}
  console.log(row.join(' | '));out.push(row)}
 console.log('PAGE ERRORS',errs.length);[...new Set(errs)].slice(0,20).forEach(e=>console.log(' ',e));console.log('FAILS',fails);
 await b.close();process.exitCode=fails||errs.length?1:0})();

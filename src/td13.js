/* ===================== SCORE 3: voice-led chords, phrased melodies, songs with a shape ===================== */
/* Every track is original. Bars are chords; layers play over them; songs move through sections instead of looping flat.
   Story API (for sad scenes, endings, deaths):
     mzForce('grief'|'loss'|'requiem'|any TRACKS key [,seconds])  hold that track until released (or for N seconds)
     mzForce(null)                                                 release, the room's track comes back (1 s crossfade)
     mzScene('grief',lines,cb)                                     say(lines) scored with that track, released when it ends
   Tragic cues: grief (sparse piano over a cello, D minor, 3/4), loss (a music box that winds down and drops notes),
   requiem (low strings swelling, a bell, the melody arrives on the second pass).
   Track spec extras: form ('ABAD' with drums / 'AB' without; A = groove, B = melody, D = breakdown with a riser back in),
   bass.walk (approach notes into the next chord), bass.oct, bass.len:'bar', duck (pad/keys sidechain depth on the kick),
   wind (music box detunes and drops notes), toll ({v,m,vol,bars}). */
Object.assign(CH,{m9:[0,3,7,10,14],M9:[0,4,7,11,14],sus2:[0,2,7],sus4:[0,5,7],add9:[0,4,7,14],madd9:[0,3,7,14],lyd:[0,4,6,11],'6':[0,4,7,9],m6:[0,3,7,9],m11:[0,3,7,10,17],d7s4:[0,5,7,10]});
const MZ={on:false,fade:0,amb:{},ambT:0,genPrev:{},loop:0,vprev:{},phr:{},force:null};
function mzImpulse(sec,dec){const sr=AC.sampleRate,n=Math.floor(sr*sec),b=AC.createBuffer(2,n,sr);for(let ch=0;ch<2;ch++){const d=b.getChannelData(ch);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,dec)*(i<sr*.012?i/(sr*.012):1)*(i<sr*.08?.6+.4*Math.random():1)}return b}
function mzNoise(sec){const sr=AC.sampleRate,b=AC.createBuffer(1,Math.floor(sr*sec),sr),d=b.getChannelData(0);let last=0;for(let i=0;i<d.length;i++){const w=Math.random()*2-1;last=(last+.02*w)/1.02;d[i]=w*.6+last*3}return b}
function mzInit(){if(MZ.on||!AC||!MG)return;MZ.on=true;MZ.vprev={};MZ.phr={};
 const comp=AC.createDynamicsCompressor();comp.threshold.value=-18;comp.ratio.value=3;comp.attack.value=.01;comp.release.value=.25;
 const lo=AC.createBiquadFilter();lo.type='highpass';lo.frequency.value=32;/* keep sub rumble out of small speakers */
 MZ.bus=AC.createGain();MZ.bus.gain.value=1;MZ.bus.connect(lo);lo.connect(comp);comp.connect(MG);
 MZ.pbus=AC.createGain();MZ.pbus.gain.value=1;MZ.pbus.connect(MZ.bus);/* pads and keys: ducked by the kick on beat tracks */
 MZ.rvIn=AC.createGain();const rhp=mzF('highpass',240),rlp=mzF('lowpass',6500);const rv=AC.createConvolver();rv.buffer=mzImpulse(3,2.3);const rvo=AC.createGain();rvo.gain.value=.8;MZ.rvIn.connect(rhp);rhp.connect(rlp);rlp.connect(rv);rv.connect(rvo);rvo.connect(MZ.bus);
 MZ.dlIn=AC.createGain();MZ.dl=AC.createDelay(2);MZ.dl.delayTime.value=.45;const fb=AC.createGain();fb.gain.value=.33;const dlf=AC.createBiquadFilter();dlf.type='lowpass';dlf.frequency.value=2200;const dlh=mzF('highpass',300);
 MZ.dlIn.connect(dlh);dlh.connect(MZ.dl);MZ.dl.connect(dlf);dlf.connect(fb);fb.connect(MZ.dl);const dlo=AC.createGain();dlo.gain.value=.55;dlf.connect(dlo);dlo.connect(MZ.bus);const dlr=AC.createGain();dlr.gain.value=.3;dlo.connect(dlr);dlr.connect(MZ.rvIn);
 MZ.nb=mzNoise(4);mzAmbInit()}
/* ---------- instruments ---------- */
function mzOut(g,rv,dl,pan,bus){let o=g;if(pan&&AC.createStereoPanner){const p=AC.createStereoPanner();p.pan.value=clamp(pan,-1,1);g.connect(p);o=p}
 o.connect(bus||MZ.bus);if(rv){const s=AC.createGain();s.gain.value=rv;o.connect(s);s.connect(MZ.rvIn)}if(dl){const s=AC.createGain();s.gain.value=dl;o.connect(s);s.connect(MZ.dlIn)}}
function mzO(type,f,t,end,dest,det){const o=AC.createOscillator();o.type=type;o.frequency.value=f;if(det)o.detune.value=det;o.connect(dest);o.start(t);o.stop(end+.1);return o}
function mzEnv(t,end,vol,a,r){const g=AC.createGain();g.gain.value=0;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+a);if(end-r>t+a)g.gain.setValueAtTime(vol,end-r);g.gain.linearRampToValueAtTime(0,Math.max(end,t+a+.01));return g}
function mzPerc(t,vol,dec,a){const g=AC.createGain();g.gain.value=0;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(Math.max(vol,.0002),t+(a||.004));g.gain.exponentialRampToValueAtTime(.0001,t+dec);return g}
function mzF(type,fq,q){const f=AC.createBiquadFilter();f.type=type;f.frequency.value=fq;if(q)f.Q.value=q;return f}
function mzNz(t,dur,dest){const s=AC.createBufferSource();s.buffer=MZ.nb;s.connect(dest);s.start(t,Math.random()*3);s.stop(t+dur+.05);return s}
function mzVib(o,t,f,rate,depth,delay){const l=AC.createOscillator(),lg=AC.createGain();l.frequency.value=rate*(.94+Math.random()*.12);lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(f*depth,t+(delay||.25));l.connect(lg);lg.connect(o.frequency);l.start(t);l.stop(t+8)}
/* o: {pan, bus, br (brightness, ~0.85–1.15)} */
function mzVoice(k,t,m,dur,vol,rv,dl,o){o=o||{};const F=mtof(m),end=t+dur,br=o.br||1;let g,f;
 switch(k){
 case'warm':{g=mzEnv(t,end,vol,Math.min(.9,dur*.35),Math.min(.8,dur*.35));f=mzF('lowpass',900,.7);f.frequency.setValueAtTime(420,t);f.frequency.linearRampToValueAtTime(1000*br,t+dur*.5);f.frequency.linearRampToValueAtTime(600,end);const hp=mzF('highpass',150);f.connect(hp);hp.connect(g);mzO('sawtooth',F,t,end,f,-8);mzO('sawtooth',F,t,end,f,8);mzO('triangle',F/2,t,end,f);break}
 case'glass':{g=mzEnv(t,end,vol,Math.min(.9,dur*.35),Math.min(.8,dur*.35));mzO('sine',F,t,end,g);const h=AC.createGain();h.gain.value=.24;h.connect(g);mzO('triangle',F*2,t,end,h,5);break}
 case'drone':{g=mzEnv(t,end,vol,Math.min(1.2,dur*.4),Math.min(1,dur*.4));f=mzF('lowpass',600);f.connect(g);mzO('triangle',F,t,end,f);mzO('sine',F/2,t,end,g);mzO('sawtooth',F,t,end,f,4);break}
 case'ep':{/* tine + body: a bright bell-like attack that fades into a round sine */
  const dec=Math.max(.7,dur+.8);g=mzPerc(t,vol,dec);f=mzF('lowpass',2000);f.frequency.setValueAtTime((1700+F*2)*br,t);f.frequency.exponentialRampToValueAtTime(600+F,t+dec*.6);f.connect(g);mzO('sine',F,t,t+dec,f);mzO('triangle',F,t,t+dec,f,4);
  const tn=mzPerc(t,vol*.3*br,.22);tn.connect(g);mzO('sine',F*4,t,t+.3,tn);const bk=mzPerc(t,vol*.12*br,.06);bk.connect(g);mzO('sine',F*7.03,t,t+.1,bk);break}
 case'piano':{/* hammered strings: fast-decaying upper partials, long body, a felt thump */
  const dec=Math.max(1.8,dur+1.4)*(F<260?1.35:1);g=mzPerc(t,vol,dec,.003);f=mzF('lowpass',2400);f.frequency.setValueAtTime((2600+F*2.5)*br,t);f.frequency.exponentialRampToValueAtTime(500+F,t+dec*.45);f.connect(g);
  mzO('triangle',F,t,t+dec,f);mzO('sine',F,t,t+dec,f,-3);const p2=mzPerc(t,vol*.35*br,dec*.35);p2.connect(g);mzO('sine',F*2.003,t,t+dec,p2);const p3=mzPerc(t,vol*.12*br,dec*.15);p3.connect(g);mzO('sine',F*3.01,t,t+dec,p3);
  const hm=mzPerc(t,vol*.25,.035),hf=mzF('bandpass',Math.min(4000,F*3),1.2);hf.connect(hm);hm.connect(g);mzNz(t,.05,hf);break}
 case'cello':case'strings':{/* bowed: detuned saws, a body resonance, delayed vibrato, slow bow */
  const st=k==='strings',a=st?Math.min(1.4,dur*.45):Math.min(.35,dur*.3),r=st?Math.min(1.2,dur*.4):Math.min(.5,dur*.3);g=mzEnv(t,end,vol,a,r);
  f=mzF('lowpass',st?1500:F*4+350,.6);f.frequency.setValueAtTime(st?500:F*2+200,t);f.frequency.linearRampToValueAtTime((st?1700:F*5+500)*br,t+a+.1);f.frequency.linearRampToValueAtTime(st?900:F*3+300,end);
  const bd=mzF('peaking',st?900:600,1.1);bd.gain.value=4;const hp=mzF('highpass',st?170:55);f.connect(bd);bd.connect(hp);hp.connect(g);
  const dets=st?[-11,0,10]:[-4,5];dets.forEach((d,i)=>{const oo=mzO('sawtooth',F,t,end,f,d);if(i===0)mzVib(oo,t,F,st?5.2:5.6,st?.004:.006,st?.6:.35)});break}
 case'pluck':{g=mzPerc(t,vol,Math.min(1.1,dur+.3));f=mzF('lowpass',3600,1.6);f.frequency.setValueAtTime(3400*br,t);f.frequency.exponentialRampToValueAtTime(520,t+.28);f.connect(g);mzO('triangle',F,t,end+.4,f);mzO('sawtooth',F,t,end+.4,f,6);break}
 case'koto':{g=mzPerc(t,vol,Math.min(1.6,dur*2+.4));f=mzF('lowpass',4000,3);f.frequency.setValueAtTime(4000*br,t);f.frequency.exponentialRampToValueAtTime(700,t+.35);f.connect(g);const oo=mzO('sawtooth',F*1.03,t,t+2,f);oo.frequency.setValueAtTime(F*1.03,t);oo.frequency.exponentialRampToValueAtTime(F,t+.05);break}
 case'bell':{g=mzPerc(t,vol,2.4);mzO('sine',F,t,t+2.5,g);const h=mzPerc(t,vol*.3,.9);h.connect(g);mzO('sine',F*2.76,t,t+1,h);const h2=mzPerc(t,vol*.12,.4);h2.connect(g);mzO('sine',F*5.4,t,t+.5,h2);break}
 case'mbox':{g=mzPerc(t,vol,1.3);mzO('sine',F,t,t+1.4,g);const h=mzPerc(t,vol*.22,.45);h.connect(g);mzO('sine',F*4,t,t+.5,h);const h2=mzPerc(t,vol*.06,.18);h2.connect(g);mzO('sine',F*6.9,t,t+.2,h2);break}
 case'flute':case'shaku':{const sh=k==='shaku';g=mzEnv(t,end,vol,sh?.14:.08,.14);const oo=mzO('sine',F,t,end,g);if(sh){oo.frequency.setValueAtTime(F*.95,t);oo.frequency.exponentialRampToValueAtTime(F,t+.16)}else{oo.frequency.setValueAtTime(F*.993,t);oo.frequency.linearRampToValueAtTime(F,t+.06)}
  mzVib(oo,t,F,sh?4.5:5.2,sh?.007:.0045,dur>.5?.32:.6);const tr=AC.createGain();tr.gain.value=.1;tr.connect(g);mzO('triangle',F*2,t,end,tr);
  const bg=mzPerc(t,vol*(sh?.9:.35),sh?.35:.12,.02),bf=mzF('bandpass',F*(sh?1:2),sh?2:4);bf.connect(bg);mzNz(t,.4,bf);mzOut(bg,rv,0,o.pan);break}
 case'trumpet':{g=mzEnv(t,end,vol,.05,.12);f=mzF('lowpass',700,1.2);f.frequency.setValueAtTime(650,t);f.frequency.linearRampToValueAtTime(1600*br,t+.07);f.frequency.linearRampToValueAtTime(1000,t+.3);f.connect(g);const oo=mzO('sawtooth',F,t,end,f);mzVib(oo,t,F,5,.005,.35);break}
 case'calliope':{g=mzEnv(t,end,vol,.02,.08);f=mzF('lowpass',2100);f.connect(g);const oo=mzO('square',F,t,end,f);const o2=mzO('triangle',F,t,end,f,14);mzVib(oo,t,F,.7,.006,.05);mzVib(o2,t,F,.9,.008,.05);break}
 case'sq':{/* softened chip voice: square into a closing filter, a triangle underneath */
  g=mzEnv(t,end,vol,.008,.08);f=mzF('lowpass',2400,1);f.frequency.setValueAtTime(3000*br,t);f.frequency.exponentialRampToValueAtTime(1100,t+.12);f.connect(g);mzO('square',F,t,end,f);const tg=AC.createGain();tg.gain.value=.6;tg.connect(g);mzO('triangle',F,t,end,tg);break}
 case'sine':{g=mzEnv(t,end,vol,.02,.1);mzO('sine',F,t,end,g);break}
 case'sub':{g=mzEnv(t,end,vol,.012,.08);mzO('sine',F,t,end,g);const h=AC.createGain();h.gain.value=.18;h.connect(g);mzO('triangle',F*2,t,end,h);break}
 case'pick':{g=mzPerc(t,vol,Math.max(.25,dur));f=mzF('lowpass',1400);f.frequency.setValueAtTime(1400*br,t);f.frequency.exponentialRampToValueAtTime(360,t+.18);f.connect(g);mzO('triangle',F,t,end+.2,f);mzO('sawtooth',F,t,end+.2,f);break}
 case'saw':{g=mzEnv(t,end,vol,.006,.05);f=mzF('lowpass',1500,4);f.frequency.setValueAtTime(1500*br,t);f.frequency.exponentialRampToValueAtTime(380,t+.16);f.connect(g);mzO('sawtooth',F,t,end,f);mzO('square',F/2,t,end,f);break}
 case'dist':{g=mzEnv(t,end,vol,.004,.04);const ws=AC.createWaveShaper(),cv2=MZ.dcurve||(MZ.dcurve=(()=>{const c=new Float32Array(257);for(let i=0;i<257;i++){const x=i/128-1;c[i]=Math.tanh(x*4)}return c})());ws.curve=cv2;f=mzF('lowpass',1300);ws.connect(f);f.connect(g);mzO('sawtooth',F,t,end,ws);mzO('sawtooth',F*1.005,t,end,ws);break}
 default:{g=mzEnv(t,end,vol,.02,.1);mzO('triangle',F,t,end,g)}}
 mzOut(g,rv,dl,o.pan,o.bus)}
/* drums */
function mzKick(t,v,duck){const g=mzPerc(t,v,.34,.002),o=AC.createOscillator();o.frequency.setValueAtTime(160,t);o.frequency.exponentialRampToValueAtTime(42,t+.13);o.connect(g);o.start(t);o.stop(t+.4);mzOut(g,.04);const c=mzPerc(t,v*.25,.015),f=mzF('highpass',2500);f.connect(c);mzNz(t,.03,f);c.connect(MZ.bus);
 if(duck&&MZ.pbus){const p=MZ.pbus.gain;p.setValueAtTime(1,t);p.linearRampToValueAtTime(duck,t+.012);p.setTargetAtTime(1,t+.03,.09)}}
function mzSnare(t,v,rv){const g=mzPerc(t,v,.17),f=mzF('bandpass',1900,.7);f.connect(g);mzNz(t,.2,f);mzOut(g,rv||.12,0,.06);const b=mzPerc(t,v*.5,.09),o=AC.createOscillator();o.type='triangle';o.frequency.setValueAtTime(200,t);o.frequency.exponentialRampToValueAtTime(150,t+.08);o.connect(b);o.start(t);o.stop(t+.12);mzOut(b,.05)}
function mzBrush(t,v){const g=mzEnv(t,t+.2,v,.03,.12),f=mzF('lowpass',4500);f.connect(g);mzNz(t,.25,f);mzOut(g,.15,0,-.1)}
function mzHat(t,v,open){const g=mzPerc(t,v,open?.28:.045),f=mzF('highpass',7600);f.connect(g);mzNz(t,open?.3:.06,f);mzOut(g,.05,0,.25)}
function mzRim(t,v){const g=mzPerc(t,v,.035);mzO('square',1750,t,t+.05,g);mzOut(g,.15,0,-.2)}
function mzShaker(t,v){const g=mzEnv(t,t+.07,v,.02,.04),f=mzF('bandpass',6500,1.5);f.connect(g);mzNz(t,.09,f);mzOut(g,.03,0,-.3)}
/* a filtered-noise riser into the next section */
function mzSwell(t,dur,v){const g=AC.createGain();g.gain.value=0;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+dur);g.gain.linearRampToValueAtTime(0,t+dur+.05);const f=mzF('bandpass',400,1.4);f.frequency.setValueAtTime(400,t);f.frequency.exponentialRampToValueAtTime(5200,t+dur);f.connect(g);mzNz(t,dur+.06,f);mzOut(g,.3)}
/* melodies written as "bar.step note len|..." */
function mzMel(s){const o={};s.split('|').forEach(e=>{const [p,n,l]=e.trim().split(/\s+/);const [b,st]=p.split('.').map(Number);o[b+':'+st]=[+n,+l]});return o}
/* ---------- harmony helpers ---------- */
const mzPc=m=>((m%12)+12)%12;
function mzH(s){let h=7;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return h}
/* choose the inversion of this chord nearest to the last one this layer played (smooth voice leading); keep the third */
function mzVoicing(key,root,ty,lo,n){const ints=CH[ty]||CH.M;if(ty==='p5')return ints.map(i=>root+i+12);
 const pcs=[];(n<ints.length?ints.filter(i=>i<12):ints).forEach(i=>{const p=mzPc(root+i);if(!pcs.includes(p))pcs.push(p)});const third=pcs[1],N=Math.min(n,pcs.length),prev=MZ.vprev[key];let best=null,bc=1e9;
 for(let r=0;r<pcs.length;r++){const base=[];let cur=lo-1;for(let k=0;k<N;k++){const pc=pcs[(r+k)%pcs.length];let m=cur+1;while(mzPc(m)!==pc)m++;base.push(m);cur=m}
  if(!base.some(m=>mzPc(m)===third))continue;
  for(const sh of [-12,0,12]){const v=base.map(x=>x+sh);if(v[0]<lo-6||v[v.length-1]>lo+20)continue;const mean=v.reduce((a,b)=>a+b,0)/v.length;
   let c=Math.abs(mean-(lo+7))*.35;if(prev)v.forEach((x,i)=>{c+=Math.min(...prev.map(p=>Math.abs(p-x)))});if(c<bc){bc=c;best=v}}}
 if(!best)best=ints.slice(0,n).map(i=>root+i+12);MZ.vprev[key]=best;return best}
/* a phrase for a generated melody layer: one rhythm per bar pair (call / answer), a contour that repeats, downbeats on chord tones, a cadence at the end */
function mzPhrase(tr,g,gi,loop){const key=curTrack+':'+gi+':'+loop;if(MZ.phr[key])return MZ.phr[key];
 const n=tr.steps||16,bars=tr.ch.length,r=mzRng(mzH(curTrack||'x')*31+gi*7919+Math.floor(loop/2)*104729);
 const notes=[];for(let m=g.lo;m<=g.hi;m++)if(g.scale.includes(mzPc(m-g.tonic)))notes.push(m);if(!notes.length)return(MZ.phr[key]={});
 const rhy=[0,1].map(h=>{const on=[];for(let s=0;s<n;s+=2){const p=g.dens*(s===0?2.6:s%4===0?1.6:1)*1.8*(h&&s>=n/2?.55:1);if(r()<p)on.push(s)}if(!on.length||on[0]!==0&&r()<.5)on.unshift(0);return on});
 const contour=[];for(let i=0;i<24;i++){const x=r();contour.push(x<.12?-2:x<.42?-1:x<.55?0:x<.85?1:2)}
 const chordPcs=b=>{const [rt,ty]=tr.ch[b%bars];return(CH[ty]||CH.M).map(i=>mzPc(rt+i))};
 const snap=(i,b,pref)=>{const pcs=chordPcs(b),cand=notes.map((m,j)=>[m,j]).filter(([m])=>pref?mzPc(m)===pref(b):pcs.includes(mzPc(m)));if(!cand.length)return i;return cand.reduce((a,c)=>Math.abs(c[1]-i)<Math.abs(a[1]-i)?c:a)[1]};
 const out={};let i=Math.floor(notes.length*(.35+r()*.3)),ci=0;const ev=[];
 for(let b=0;b<bars;b++){let on=rhy[b%2];const last=b===bars-1&&bars>1;if(last)on=on.filter(s=>s<n/2).slice(0,3);if(!on.length)on=[0];
  if(b%2===0)ci=(b>=2&&bars>=4)?0:ci;/* the second half repeats the first half's contour */
  on.forEach((s,j)=>{i=clamp(i+contour[ci++%contour.length]*(b>=2&&bars>=4&&loop%2?-1:1),0,notes.length-1);if(s===0)i=snap(i,b);ev.push([b*n+s,i,b])})}
 if(ev.length){const e=ev[ev.length-1],rt=tr.ch[e[2]%bars][0];e[1]=snap(e[1],e[2],loop%2?()=>mzPc(rt):null)}
 ev.forEach((e,j)=>{const nx=j+1<ev.length?ev[j+1][0]:bars*n;let len=Math.min(nx-e[0],g.len||4);if(j===ev.length-1)len=Math.max(len,Math.min(nx-e[0],n));out[e[0]]=[notes[e[1]],len]});
 const ks=Object.keys(MZ.phr);if(ks.length>40)delete MZ.phr[ks[0]];return(MZ.phr[key]=out)}
/* ---------- the tracks ---------- */
Object.keys(TRACKS).forEach(k=>delete TRACKS[k]);
Object.assign(TRACKS,{
 title:{bpm:70,ch:[[57,'m9'],[53,'M7'],[48,'add9'],[55,'6']],rev:.45,dly:.18,intro:1,
  pad:{v:'warm',vol:.02},arp:{v:'ep',vol:.028,oct:12,pat:[0,null,2,null,1,null,3,null,0,null,2,null,4,null,3,null]},bass:{v:'sub',vol:.07,pat:[0,10],walk:1},
  lead:{v:'flute',vol:.045,every:2,mel:mzMel('0.0 76 6|0.6 74 2|0.8 72 4|0.12 71 4|1.0 69 8|1.8 72 4|1.12 74 4|2.0 76 6|2.6 79 2|2.8 76 4|2.12 74 4|3.0 74 8|3.8 71 4|3.12 72 4')}},
 lofi:{bpm:82,swing:.14,ch:[[50,'m9'],[55,'d7'],[48,'M9'],[57,'m7']],rev:.3,dly:.12,intro:1,amb:'vinyl',duck:.72,
  keys:{v:'ep',vol:.024,oct:12,pat:[0,6,10]},bass:{v:'pick',vol:.085,pat:[[0,0],[7,0],[10,7]],walk:1},
  dr:{k:[0,7,10],s:[4,12],h:[0,2,4,6,8,10,12,14],fill:1,v:.8},
  lead:{v:'flute',vol:.04,every:2,mel:mzMel('0.2 74 2|0.4 77 4|0.10 76 2|0.12 72 4|1.4 71 2|1.6 74 6|2.0 76 4|2.6 79 2|2.8 76 6|3.4 72 2|3.6 74 8')}},
 base:{bpm:64,ch:[[52,'m9'],[48,'M7'],[55,'6'],[50,'sus2']],rev:.5,dly:.2,intro:1,
  pad:{v:'glass',vol:.026},arp:{v:'bell',vol:.018,oct:12,pat:[0,null,null,1,null,null,2,null,3,null,null,2,null,null,1,null]},bass:{v:'sub',vol:.065,pat:[0,8],walk:1},
  lead:{v:'flute',vol:.035,every:2,mel:mzMel('0.8 79 2|0.10 78 2|0.12 76 4|1.8 74 4|1.12 71 4|2.8 79 2|2.10 81 2|2.12 79 4|3.8 74 8')}},
 noir:{bpm:76,swing:.1,ch:[[50,'m9'],[50,'m9'],[46,'M7'],[45,'d7']],rev:.4,dly:.2,intro:1,
  keys:{v:'ep',vol:.024,oct:12,pat:[0,10]},bass:{v:'pick',vol:.08,pat:[[0,0],[4,3],[8,7],[12,10]]},
  dr:{k:[0,10],br:[4,12],h:[2,6,10,14],v:.55},
  lead:{v:'trumpet',vol:.035,every:2,mel:mzMel('0.0 74 3|0.3 77 3|0.6 76 2|0.8 74 8|1.6 72 2|1.8 74 2|1.10 69 6|2.0 77 4|2.4 76 2|2.6 74 2|2.8 72 6|3.0 73 4|3.4 76 4|3.8 79 8')}},
 ronin:{bpm:112,ch:[[40,'p5'],[40,'p5'],[43,'p5'],[38,'p5']],rev:.15,
  bass:{v:'dist',vol:.05,pat:[0,2,3,6,8,10,11,14],len:.16},arp:{v:'dist',vol:.03,oct:12,len:.13,pat:[0,0,null,0,1,null,0,2,0,0,null,0,1,null,2,1]},
  dr:{k:[0,3,8,11],s:[4,12],h:[0,2,4,6,8,10,12,14],o:[14],fill:1,v:1}},
 angel:{bpm:118,ch:[[53,'M7'],[55,'add9'],[52,'m7'],[57,'m9']],rev:.25,dly:.22,intro:1,duck:.55,
  arp:{v:'sq',vol:.018,oct:12,len:.12,pat:[0,1,2,3,2,1,0,1,0,1,2,3,4,3,2,1]},keys:{v:'ep',vol:.02,oct:12,pat:[0,3,6,10]},bass:{v:'sub',vol:.07,pat:[0,6,8,14]},
  dr:{k:[0,8],s:[4,12],h:[2,6,10,14],sh:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],fill:1,v:.85},
  lead:{v:'flute',vol:.04,every:2,mel:mzMel('0.0 81 2|0.2 79 2|0.4 77 2|0.6 79 4|0.10 76 6|1.0 81 2|1.2 83 2|1.4 84 2|1.6 83 2|1.8 81 4|1.12 79 4|2.0 76 4|2.4 79 4|2.8 77 8|3.0 81 4|3.4 84 4|3.8 83 8')}},
 tense:{bpm:96,ch:[[45,'m'],[45,'m'],[46,'M'],[45,'m']],rev:.3,form:'A',
  pad:{v:'warm',vol:.016},bass:{v:'saw',vol:.05,pat:[0,2,4,6,8,10,12,14],len:.12},dr:{k:[0,8],h:[0,4,8,12],r:[2,6,10,14],v:.6}},
 dark:{bpm:56,ch:[[45,'m'],[46,'M'],[45,'m'],[44,'dim']],rev:.65,dly:.25,
  pad:{v:'drone',vol:.026},arp:{v:'bell',vol:.016,oct:24,pat:[0,null,null,null,null,null,2,null,null,null,null,null,1,null,null,null]},bass:{v:'sub',vol:.05,pat:[0]},
  gen:[{v:'cello',vol:.022,tonic:45,scale:[0,2,3,5,7,8,10],dens:.06,lo:50,hi:64,len:10,from:1}]},
 mall:{bpm:104,ch:[[48,'M9'],[57,'m9'],[53,'M7'],[55,'d7']],rev:.25,dly:.15,intro:1,duck:.62,
  keys:{v:'ep',vol:.022,oct:12,pat:[0,3,6,10,13]},arp:{v:'sq',vol:.011,oct:24,len:.1,pat:[0,2,1,3,0,2,1,3,0,2,1,3,2,1,0,1]},
  bass:{v:'pick',vol:.08,pat:[[0,0],[3,12],[6,0],[8,7],[11,12],[14,10]]},dr:{k:[0,8],s:[4,12],h:[2,6,10,14],o:[6,14],fill:1,v:.8},
  lead:{v:'flute',vol:.035,every:2,mel:mzMel('0.0 76 2|0.2 79 2|0.4 83 4|0.10 81 6|1.0 79 2|1.2 81 2|1.4 79 2|1.6 76 6|2.0 77 2|2.2 81 2|2.4 84 4|2.10 83 6|3.0 81 4|3.4 79 4|3.8 74 8')}},
 /* the deep house */
 deep:{bpm:58,ch:[[50,'sus2'],[46,'lyd'],[53,'sus2'],[48,'sus2']],rev:.75,dly:.3,
  pad:{v:'glass',vol:.02,oct:0},bass:{v:'sub',vol:.045,pat:[0]},gen:[{v:'bell',vol:.022,tonic:62,scale:[0,2,4,6,7,9,11],dens:.1,lo:74,hi:88,len:6}]},
 dome:{bpm:52,ch:[[53,'lyd'],[50,'m9'],[57,'sus4'],[55,'add9']],rev:.85,dly:.4,
  pad:{v:'glass',vol:.028},arp:{v:'bell',vol:.011,oct:24,pat:[0,1,2,3,4,3,2,1,0,1,2,3,4,3,2,1]},bass:{v:'sub',vol:.045,pat:[0]},
  gen:[{v:'flute',vol:.03,tonic:65,scale:[0,2,4,6,7,9,11],dens:.09,lo:77,hi:89,len:6,from:1}]},
 work:{bpm:88,ch:[[45,'m'],[41,'M7'],[43,'sus2'],[45,'m']],rev:.3,dly:.15,intro:1,duck:.75,
  keys:{v:'ep',vol:.03,oct:0,pat:[0]},bass:{v:'sub',vol:.062,pat:[0,2,4,6,8,10,12,14],len:.16},arp:{v:'pluck',vol:.034,oct:12,pat:[null,null,null,null,0,null,null,null,null,null,1,null,null,null,2,null]},
  dr:{k:[0,8],h:[2,6,10,14],v:.45}},
 cinema:{bpm:92,steps:12,ch:[[48,'M'],[57,'m'],[53,'M'],[55,'d7']],rev:.35,intro:1,
  bass:{v:'pick',vol:.095,pat:[0]},keys:{v:'ep',vol:.032,oct:12,pat:[4,8]},
  lead:{v:'flute',vol:.05,every:1,mel:mzMel('0.0 76 4|0.4 79 4|0.8 84 4|1.0 81 8|1.8 76 4|2.0 77 4|2.4 81 4|2.8 84 4|3.0 83 8|3.8 79 4')}},
 curio:{bpm:80,steps:12,ch:[[57,'m'],[52,'M'],[57,'m'],[50,'m']],rev:.5,
  bass:{v:'sub',vol:.06,pat:[0]},arp:{v:'mbox',vol:.024,oct:24,pat:[null,null,null,null,1,null,null,null,2,null,null,null]},
  lead:{v:'mbox',vol:.052,every:1,mel:mzMel('0.0 81 2|0.2 84 2|0.4 88 4|0.8 86 4|1.0 83 4|1.4 80 4|1.8 83 4|2.0 84 2|2.2 88 2|2.4 93 4|2.8 91 4|3.0 89 6|3.6 86 6')}},
 forest:{bpm:66,ch:[[57,'m'],[53,'M'],[55,'sus2'],[57,'m']],rev:.55,dly:.25,
  pad:{v:'glass',vol:.016},bass:{v:'sub',vol:.04,pat:[0]},gen:[{v:'koto',vol:.05,tonic:57,scale:[0,3,5,7,10],dens:.22,lo:64,hi:81,len:4},{v:'shaku',vol:.04,tonic:57,scale:[0,3,5,7,10],dens:.035,lo:69,hi:84,len:10,from:1}]},
 chase:{bpm:150,ch:[[45,'m'],[48,'M'],[43,'M'],[45,'m']],rev:.15,form:'AB',duck:.6,
  pad:{v:'strings',vol:.008},bass:{v:'saw',vol:.05,pat:[0,2,4,6,8,10,12,14],len:.11},arp:{v:'pluck',vol:.024,oct:12,len:.1,pat:[0,1,2,1,0,1,2,1,0,1,2,1,3,2,1,2]},
  dr:{k:[0,4,8,12],s:[4,12],h:[1,3,5,7,9,11,13,15],o:[14],fill:1,v:.88}},
 /* the city */
 harbour:{bpm:70,ch:[[52,'m9'],[48,'M9'],[55,'6'],[50,'sus2']],rev:.5,dly:.2,intro:1,amb:'waves',
  pad:{v:'warm',vol:.016},arp:{v:'pluck',vol:.03,oct:12,pat:[0,null,1,null,2,null,3,null,4,null,3,null,2,null,1,null]},bass:{v:'sub',vol:.06,pat:[0,10],walk:1},
  lead:{v:'flute',vol:.035,every:2,mel:mzMel('0.4 76 4|0.8 74 4|0.12 71 4|1.0 72 12|2.4 79 4|2.8 78 4|2.12 74 4|3.0 76 12')}},
 shrine:{bpm:62,ch:[[52,'p5'],[52,'p5'],[45,'p5'],[47,'p5']],rev:.6,dly:.22,
  pad:{v:'drone',vol:.022},gen:[{v:'koto',vol:.042,tonic:64,scale:[0,1,5,7,8],dens:.2,lo:60,hi:79,len:4}],lead:{v:'bell',vol:.03,every:1,mel:mzMel('0.0 52 16')}},
 kyoto:{bpm:68,ch:[[52,'m'],[53,'M7'],[50,'m7'],[52,'m']],rev:.5,dly:.2,
  pad:{v:'glass',vol:.02},bass:{v:'sub',vol:.045,pat:[0]},gen:[{v:'koto',vol:.038,tonic:64,scale:[0,1,5,7,8],dens:.17,lo:64,hi:81,len:4}],
  lead:{v:'shaku',vol:.035,every:2,mel:mzMel('0.0 76 6|0.6 77 2|0.8 76 8|1.0 72 4|1.4 71 4|1.8 69 8|2.0 71 6|2.6 72 2|2.8 76 8|3.0 71 16')}},
 station:{bpm:78,swing:.08,ch:[[48,'M9'],[52,'m7'],[45,'m9'],[50,'d7']],rev:.45,dly:.25,intro:1,
  keys:{v:'ep',vol:.03,oct:12,pat:[0,7,10]},bass:{v:'pick',vol:.085,pat:[[0,0],[8,7]],walk:1},dr:{k:[0,9],br:[4,12],h:[2,6,10,14],v:.5},
  gen:[{v:'ep',vol:.04,tonic:72,scale:[0,2,4,5,7,9,11],dens:.1,lo:72,hi:86,len:3,from:1}]},
 coast:{bpm:70,ch:[[50,'sus2'],[55,'add9'],[57,'sus4'],[52,'m7']],rev:.55,dly:.2,intro:1,amb:'waves',
  pad:{v:'warm',vol:.016},arp:{v:'pluck',vol:.026,oct:12,pat:[0,null,1,2,null,1,3,null,0,null,1,2,null,1,3,null]},bass:{v:'sub',vol:.055,pat:[0,7],walk:1},
  lead:{v:'flute',vol:.035,every:2,mel:mzMel('0.0 74 8|0.8 76 4|0.12 78 4|1.0 79 12|2.0 81 6|2.6 79 2|2.8 76 8|3.0 74 16')}},
 park:{bpm:100,steps:12,ch:[[53,'M'],[48,'M'],[50,'m'],[46,'M']],rev:.45,
  bass:{v:'pick',vol:.07,pat:[0]},keys:{v:'calliope',vol:.014,oct:12,pat:[4,8]},
  lead:{v:'calliope',vol:.026,every:1,mel:mzMel('0.0 77 4|0.4 81 4|0.8 84 4|1.0 84 8|1.8 79 4|2.0 77 4|2.4 74 4|2.8 77 4|3.0 74 12')}},
 /* for the worst days. Story code reaches these through mzForce / mzScene. */
 grief:{bpm:56,steps:12,ch:[[50,'m9'],[46,'M7'],[43,'m9'],[45,'sus4'],[50,'m9'],[46,'M7'],[43,'m7'],[45,'M']],rev:.55,intro:1,form:'AB',
  keys:{v:'piano',vol:.026,oct:0,lo:53,n:3,pat:[0]},arp:{v:'piano',vol:.015,oct:12,pat:[null,null,null,null,1,null,null,null,2,null,null,null]},
  bass:{v:'cello',vol:.03,oct:-12,len:'bar',pat:[0]},pad:{v:'strings',vol:.007,oct:0},
  lead:{v:'piano',vol:.048,every:1,mel:mzMel('0.0 69 6|0.6 74 6|1.0 72 9|1.9 70 3|2.0 69 6|2.6 67 3|2.9 65 3|3.0 64 12|4.0 69 6|4.6 77 6|5.0 76 6|5.6 74 3|5.9 72 3|6.0 70 6|6.6 69 3|6.9 67 3|7.0 69 6|7.6 73 6')}},
 loss:{bpm:72,steps:12,ch:[[57,'m'],[53,'M7'],[48,'add9'],[52,'m7']],rev:.6,dly:.22,form:'AB',wind:1,
  pad:{v:'glass',vol:.011},bass:{v:'sub',vol:.04,pat:[0]},arp:{v:'mbox',vol:.017,oct:12,pat:[0,null,null,1,null,null,2,null,null,1,null,null]},
  lead:{v:'mbox',vol:.062,every:1,mel:mzMel('0.0 81 3|0.3 84 3|0.6 88 3|0.9 86 3|1.0 84 6|1.6 81 3|1.9 79 3|2.0 79 3|2.3 76 3|2.6 74 6|3.0 76 9|3.9 71 3')}},
 requiem:{bpm:48,ch:[[38,'m'],[46,'M'],[41,'M'],[45,'M'],[38,'m'],[43,'m'],[45,'sus4'],[45,'M']],rev:.7,form:'AB',
  pad:{v:'strings',vol:.017,oct:12},bass:{v:'cello',vol:.03,oct:0,len:'bar',pat:[0]},toll:{v:'bell',m:62,vol:.026,bars:[0,4]},
  lead:{v:'strings',vol:.03,every:2,mel:mzMel('0.0 74 12|0.12 72 4|1.0 70 16|2.0 69 8|2.8 72 8|3.0 73 16|4.0 74 8|4.8 77 8|5.0 74 12|5.12 70 4|6.0 69 16|7.0 69 8|7.8 73 8')}}});
/* where things sound like what */
Object.assign(ROOMTRACK,{harbour:'harbour',containers:'noir',coast:'coast',park:'park',haunt:'dark',shrine:'shrine',graves:'shrine',kyoto:'kyoto',uji:'kyoto',sento:'kyoto',station:'station',carriage:'station',oldtrack:'base',laundro:'lofi',mall:'mall',
 dp_land:'deep',dp_h1:'deep',dp_h2:'deep',dp_h3:'deep',dp_h4:'deep',dp_h5:'deep',dp_wc1:'deep',dp_wc2:'deep',dp_depot:'deep',dp_doors:'deep',dp_tunnel:'deep',dp_gallery:'curio',dp_curio:'curio',dp_cinema:'cinema',dp_work:'work',dp_range:'work',dp_dome:'dome',dp_forest:'forest'});
/* forcing a track: story scenes hold a mood over whatever room they happen in */
function mzForce(name,secs){if(!name||!TRACKS[name])MZ.force=null;else MZ.force={name,until:secs?Date.now()+secs*1000:0};try{wantTrack=pickTrack()}catch(e){}}
function mzScene(name,lines,cb){mzForce(name);say(lines,function(){mzForce(null);if(cb)cb.apply(this,arguments)})}
const _pickTrack=pickTrack;pickTrack=function(){const f=MZ.force;if(f){if(f.until&&Date.now()>f.until)MZ.force=null;else return f.name}
 if(S&&typeof TDP!=='undefined'&&TDP.chase&&!TDP.chase.done&&scene&&scene.td&&scene.M.id==='forest')return'chase';if(S&&typeof TDP!=='undefined'&&TDP.film>T&&S.room==='dp_cinema')return'cinema';return _pickTrack()};
/* ---------- the player ---------- */
function mzRng(seed){let a=seed|0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
/* which section of the song this loop is: I(ntro), A (groove), B (melody), D (breakdown) */
function mzSection(tr,loop){if(tr.intro&&loop===0)return'I';const form=tr.form||(tr.dr?'ABAD':'AB'),L=loop-(tr.intro?1:0);return form[L%form.length]}
function mzStep(tr,st,t){if(META.mute)return;const n=tr.steps||16,bars=tr.ch.length,bar=Math.floor(st/n)%bars,s=st%n,loop=Math.floor(st/(n*bars));const [root,ty]=tr.ch[bar],ints=CH[ty]||CH.M;
 const stepDur=60/tr.bpm/4,barLen=stepDur*n,hum=()=>Math.random()*.006,vr=()=>.88+Math.random()*.24;const sec=mzSection(tr,loop),intro=sec==='I',brk=sec==='D',lift=sec==='B'?1.1:1;
 const pb=tr.duck?MZ.pbus:null;
 /* a held wash under everything, voice-led so the chords glide instead of jumping */
 if(tr.pad&&s===0){const oc=tr.pad.oct===undefined?12:tr.pad.oct,v=mzVoicing('pad',root,ty,45+oc,4),pans=[-.35,.35,-.15,.15];v.forEach((m,i)=>mzVoice(tr.pad.v,t,m,barLen*1.02,tr.pad.vol*(brk?1.15:1),tr.rev,0,{pan:pans[i%4],bus:pb}))}
 if(tr.keys&&tr.keys.pat.includes(s)&&!(intro&&s!==0)){const v=mzVoicing('keys',root,ty,tr.keys.lo||(48+tr.keys.oct),tr.keys.n||4),b=vr();v.forEach((m,i)=>mzVoice(tr.keys.v,t+hum()+i*.009,m,stepDur*2.5,tr.keys.vol*b*lift*(s===0?1:.85),tr.rev*.8,tr.dly*.4,{pan:(i-(v.length-1)/2)*.14,bus:pb,br:b}))}
 if(tr.bass){const bo=tr.bass.oct===undefined?-12:tr.bass.oct,b=tr.bass.pat.find(x=>Array.isArray(x)?x[0]===s:x===s);const ln=tr.bass.len==='bar'?barLen*.98:tr.bass.len||stepDur*3;
  if(b!==undefined&&!(brk&&s%8)){const iv=Array.isArray(b)?b[1]:0;mzVoice(tr.bass.v,t,root+bo+iv,ln,tr.bass.vol*vr(),tr.rev*.15)}
  else if(tr.bass.walk&&s===n-2&&!brk&&!intro){/* approach the next chord: a half step below or a step above, or the fifth if the root stays */
   const nr=tr.ch[(bar+1)%bars][0];const ap=nr===root?root+7-12:(loop+bar)%2?nr-1:nr+2;mzVoice(tr.bass.v,t+hum(),ap+bo+(nr===root?12:0),stepDur*1.6,tr.bass.vol*.7*vr(),tr.rev*.15)}}
 if(tr.arp&&tr.arp.pat[s]!==null&&tr.arp.pat[s]!==undefined&&!(intro&&s%4)&&!(sec==='A'&&!tr.dr&&tr.arp.pat.filter(x=>x!==null).length>8&&s%4)){const k=tr.arp.pat[s];const iv=ints[k%ints.length]+(k>=ints.length?12:0),b=vr();
  mzVoice(tr.arp.v,t+hum(),root+iv+tr.arp.oct,tr.arp.len||stepDur*2,tr.arp.vol*b*lift,tr.rev,tr.dly,{pan:((s%4)-1.5)*.15,br:b})}
 if(tr.toll&&s===0&&tr.toll.bars.includes(bar))mzVoice(tr.toll.v,t,tr.toll.m,barLen,tr.toll.vol,tr.rev*1.2,0,{pan:-.1});
 /* the tune: every loop if every:1, otherwise in the B section and over the breakdown */
 if(tr.lead&&!intro){const ev=tr.lead.every||1;const on=ev===1||sec==='B'||sec==='D'||(tr.form==='A'&&loop%ev===ev-1);if(on){const e=tr.lead.mel[bar+':'+s];
  if(e){let m=e[0];if(tr.wind){/* the music box runs down: flatter as it goes, and it starts skipping teeth */m-=Math.min(.55,.04*loop+.12*(st%(n*bars))/(n*bars));if(Math.random()<Math.min(.3,.05*loop)&&s!==0)m=0}
   if(m)mzVoice(tr.lead.v,t+hum(),m,e[1]*stepDur,tr.lead.vol*vr(),tr.rev,tr.dly,{pan:.06})}}}
 if(tr.gen)tr.gen.forEach((g,gi)=>{if(g.from&&loop<g.from)return;const ph=mzPhrase(tr,g,gi,loop),e=ph[bar*n+s];if(!e)return;if(sec==='A'&&!tr.dr&&e[1]<3&&s%4)return;
  mzVoice(g.v,t+hum(),e[0],e[1]*stepDur,g.vol*vr()*(sec==='B'?1.08:1),tr.rev,tr.dly,{pan:gi?-.25:.2})});
 const d=tr.dr;if(d&&!intro){const v=(d.v||1)*(sec==='B'?1.06:1),last=bar===bars-1&&d.fill&&loop%2===1&&!brk;
  if(brk){/* breakdown: the kit drops to hats, and a riser leads back in on the last bar */
   if(d.h&&d.h.includes(s)&&s%4===2)mzHat(t+hum(),.022*v*vr());if(bar===bars-1&&s===0)mzSwell(t,barLen*.97,.035*v)}
  else{if(d.k&&d.k.includes(s))mzKick(t,.42*v,tr.duck);
   if(bar===0&&s===0&&loop>1&&mzSection(tr,loop-1)==='D')mzHat(t,.06*v,true);
   if(last&&s>=n-4)mzSnare(t+hum(),(.05+.03*(s-n+4))*v);else if(d.s&&d.s.includes(s))mzSnare(t+hum(),.13*v);
   if(d.br&&d.br.includes(s))mzBrush(t+hum(),.07*v);if(d.h&&d.h.includes(s))mzHat(t+hum(),(s%4===0?.045:.03)*v*vr());if(d.o&&d.o.includes(s))mzHat(t,.04*v,true);
   if(d.r&&d.r.includes(s))mzRim(t,.03*v);if(d.sh&&d.sh.includes(s))mzShaker(t+hum(),(s%2?.018:.028)*v)}}
 if(tr.amb==='vinyl'&&Math.random()<.35)mzCrackle(t+Math.random()*stepDur)}
function mzCrackle(t){const g=mzPerc(t,.02+Math.random()*.03,.01),f=mzF('highpass',2000);f.connect(g);mzNz(t,.02,f);g.connect(MZ.bus)}
/* scheduler: crossfades between tracks, ducks under dialogue, keeps the ambience in step with the room */
sched=function(){if(!AC||!MG)return;if(!MZ.on)mzInit();const now=AC.currentTime;
 if(wantTrack!==curTrack){if(!curTrack){curTrack=wantTrack;mstep=0;nextT=now+.05}else{if(!MZ.fade){MZ.fade=now;MZ.bus.gain.cancelScheduledValues(now);MZ.bus.gain.setTargetAtTime(0,now,.25)}
  if(now-MZ.fade>1){curTrack=wantTrack;mstep=0;nextT=now+.05;MZ.fade=0;MZ.genPrev={};MZ.vprev={};MZ.phr={};if(MZ.pbus){MZ.pbus.gain.cancelScheduledValues(now);MZ.pbus.gain.setValueAtTime(1,now)}const tr=TRACKS[curTrack];if(tr&&MZ.dl)MZ.dl.delayTime.setValueAtTime(60/tr.bpm*.75,now)}}}
 if(!MZ.fade){const want=(dlg?.62:1)*(typeof TDP!=='undefined'&&TDP.film>T&&S&&S.room!=='dp_cinema'?.5:1);if(Math.abs((MZ.duck||1)-want)>.01||MZ.bus.gain.value<.02){MZ.duck=want;MZ.bus.gain.cancelScheduledValues(now);MZ.bus.gain.setTargetAtTime(want,now,.5)}}
 const tr=TRACKS[curTrack];if(tr&&!MZ.fade)while(nextT<now+.15){const sw=tr.swing&&mstep%2?tr.swing*60/tr.bpm/4:0;try{mzStep(tr,mstep,nextT+sw)}catch(e){}nextT+=60/tr.bpm/4;mstep++}else if(MZ.fade)nextT=Math.max(nextT,now);
 if(now-MZ.ambT>.4){MZ.ambT=now;mzAmbUpdate(now)}mzAmbEvents(now)};
/* ---------- ambience: water, wind, rain, machines, insects ---------- */
function mzAmbInit(){const mk=(name,build)=>{const g=AC.createGain();g.gain.value=0;g.connect(MG);const src=AC.createBufferSource();src.buffer=MZ.nb;src.loop=true;build(src,g);src.start(0,Math.random()*3);MZ.amb[name]={g,v:0}};
 const lfo=(rate,depth,param,base)=>{const l=AC.createOscillator(),lg=AC.createGain();l.frequency.value=rate;lg.gain.value=depth;l.connect(lg);lg.connect(param);if(base!==undefined)param.value=base;l.start()};
 mk('waves',(s,g)=>{const f=mzF('lowpass',520,.4),a=AC.createGain();a.gain.value=.6;lfo(.085,.45,a.gain);s.connect(f);f.connect(a);a.connect(g)});
 mk('wind',(s,g)=>{const f=mzF('bandpass',650,.8),a=AC.createGain();a.gain.value=.6;lfo(.05,260,f.frequency);lfo(.13,.35,a.gain);s.connect(f);f.connect(a);a.connect(g)});
 mk('rain',(s,g)=>{const f=mzF('highpass',1400),f2=mzF('lowpass',7000);s.connect(f);f.connect(f2);f2.connect(g)});
 mk('rumble',(s,g)=>{const f=mzF('lowpass',150,1),a=AC.createGain();a.gain.value=1.4;lfo(.6,.25,a.gain);s.connect(f);f.connect(a);a.connect(g)});
 mk('water',(s,g)=>{const f=mzF('bandpass',1300,.6),a=AC.createGain();a.gain.value=.6;lfo(2.3,.25,a.gain);s.connect(f);f.connect(a);a.connect(g)});
 mk('hum',(s,g)=>{const f=mzF('lowpass',180),a=AC.createGain();a.gain.value=.4;s.connect(f);f.connect(a);a.connect(g);const o=AC.createOscillator();o.frequency.value=50;const og=AC.createGain();og.gain.value=.35;o.connect(og);og.connect(g);o.start();const o2=AC.createOscillator();o2.type='square';o2.frequency.value=100;const f3=mzF('lowpass',300),og2=AC.createGain();og2.gain.value=.05;o2.connect(f3);f3.connect(og2);og2.connect(g);o2.start()})}
function mzAmbWant(){const z={waves:0,wind:0,rain:0,rumble:0,water:0,hum:0};if(!S||T-RHINT.f>20||!scene)return z;const r=S.room||'',night=typeof tdNight==='function'&&tdNight();const zone=scene.td&&scene.zone;const out=zone?!!zone.out:false;
 if(out&&typeof weather==='function'&&weather()==='rain')z.rain=.13;
 if(r==='harbour'||r==='containers')z.waves=.1;if(r==='coast')z.waves=.17;
 if(['dp_forest','shrine','graves','park','oldtrack','roof','uji','coast'].includes(r))z.wind=r==='dp_forest'?.09:.05;
 if(r.startsWith('dp_')&&r!=='dp_forest'&&r!=='dp_dome')z.hum=r==='dp_tunnel'?.03:.045;if(r==='dp_dome'||r==='dp_tunnel')z.water=.025;
 if(r==='laundro')z.rumble=.07;if(r==='carriage')z.rumble=.13;if(r==='sento')z.water=.05;if(r==='uji')z.water=.045;if(r==='mall')z.water=.018;if(r==='ops'||r==='archive')z.hum=.025;
 MZ.ev={crickets:night&&!z.rain&&['dp_forest','park','shrine','graves','uji','trailer','oldtrack','coast'].includes(r)&&(!zone||zone.out),clack:r==='carriage',drip:['dp_tunnel','haunt','dp_dome','cellar'].includes(r)};return z}
function mzAmbUpdate(now){const w=mzAmbWant();for(const k in MZ.amb){const a=MZ.amb[k],v=META.sfx===0?0:w[k]||0;if(Math.abs(a.v-v)>.002){a.v=v;a.g.gain.cancelScheduledValues(now);a.g.gain.setTargetAtTime(v,now,1.2)}}}
function mzAmbEvents(now){const e=MZ.ev;if(!e||META.mute||META.sfx===0)return;
 if(e.crickets&&Math.random()<.035){const t=now+.05,f=4100+Math.random()*700;for(let k=0;k<3+Math.floor(Math.random()*3);k++){const g=mzPerc(t+k*.045,.012,.03);mzO('sine',f,t+k*.045,t+k*.045+.04,g);g.connect(MG)}}
 if(e.clack&&(!MZ.clackT||now>MZ.clackT)){MZ.clackT=now+1.15;for(const dt of [0,.13]){const g=mzPerc(now+.05+dt,.05,.08),f=mzF('bandpass',300,2);f.connect(g);mzNz(now+.05+dt,.1,f);g.connect(MG)}}
 if(e.drip&&Math.random()<.008){const t=now+.05,g=mzPerc(t,.03,.18),o=AC.createOscillator();o.frequency.setValueAtTime(1900,t);o.frequency.exponentialRampToValueAtTime(700,t+.12);o.connect(g);o.start(t);o.stop(t+.2);g.connect(MZ.rvIn);g.connect(MG)}}

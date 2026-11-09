/* ===================== V'S READING GLASSES ===================== */
const READROOMS=['dp_library','dp_gallery','dp_curio','archive','ops','dp_obs','dp_work','bedroom','dp_seeds'];
const vGlassesNow=()=>!!(S&&!S.dark&&!S.f.glassesHidden&&(S.f.vGlasses===1||(S.f.vGlasses!==0&&(READROOMS.includes(S.room)||S.slot>=3))));
/* the glasses live in the writing only: nothing is drawn on his sprite or portrait */
/* the glasses themselves, on his nightstand */
(function(){const bd=TD.maps.ewing.props.find(p=>p.id==='bd_bed');if(!bd)return;TD.maps.ewing.props.push({id:'gl_stand',x:bd.x+bd.w+4,y:bd.y+2,w:14,d:12,h:12,label:()=>S.f.glassesHidden?'Nightstand (something’s missing)':'Nightstand (his reading glasses)',
 draw:(x,y)=>tdBox(x,y,14,12,12,'#5a4030','#3a2a1e'),
 act:who=>{if(who==='v'){if(S.f.glassesHidden)return tdSay([['K9','They are not here. I put them here. I always put them here. ...Misaki.']]);ask('K9','Your reading glasses.',[{t:S.f.vGlasses===1?'Take them off for the day':'Wear them all day',fn:()=>{S.f.vGlasses=S.f.vGlasses===1?0:1;save();tdSay([['K9',S.f.vGlasses?'(They make the world very sharp and very close. I do not hate it.)':'(Off. The world goes back to being slightly soft at the edges. As it should be.)']])}},{t:'Only when reading',fn:()=>{S.f.vGlasses=undefined;save()}}]);return}
  if(S.f.glassesHidden)return tdSay([['hitmeuppp','(they’re in the freezer. behind the peas. he hasn’t found them. it’s been '+(S.day-S.f.glassesHidden)+' day(s).)']]);
  ask('hitmeuppp','His reading glasses. Gold wire. Fingerprint on the left lens, his.',[
   {t:'Try them on',fn:()=>{apply({aff:1});tdSay([['','Everything goes huge and swimmy. You look in his mirror. You look like a librarian who could kill a man.'],['hitmeuppp','(...i look good. i look SO good. putting them back.)']])}},
   {t:'Hide them in the freezer',fn:()=>{S.f.glassesHidden=S.day;save();tdSay([['hitmeuppp','(behind the peas. he’s going to lose his mind. i’m going to watch.)']])}},
   {t:'Clean the fingerprint off and put them back',fn:()=>{apply({aff:2});tdSay([['','You polish them on your sleeve and set them back exactly at the angle you found them.']])}}])}})})();
EVENTS.push({id:'gl_first',when:()=>isM()&&S.pov!=='v'&&tier()>=1&&!S.dark&&S.phase!=='taken',run:done=>say([['','He’s at the kitchen island with the foundation’s quarterly report and a pair of thin gold reading glasses pushed down his nose.'],['hitmeuppp',MV('u have GLASSES','you have GLASSES.','You wear glasses?','You wear glasses. How did I not know you wear glasses.')],['K9','Reading glasses. They are for reading.'],['hitmeuppp',MV('u look like a sexy librarian who could kill me','you look like a librarian who could kill me.','You look like a very dangerous librarian.','You look like you’re about to tell me my essay is late. I hate how much I like it.')],['K9','...I am taking them off.'],['hitmeuppp','NO.']],()=>{apply({aff:2});done()})},
 {id:'gl_found',when:()=>S.f.glassesHidden&&S.day>=S.f.glassesHidden+1,run:done=>{const d=S.day-S.f.glassesHidden;S.f.glassesHidden=0;save();say([['','V opens the freezer for ice and stops. Behind the peas: his reading glasses, frosted solid.'],['K9','...'],['K9',d>1?'Two days. I read the board report by holding it at arm’s length. I approved a budget for “swans” that I believe said “shelves.”':'I spent last night reading with a magnifying glass from the archive. Like a detective. Like an idiot.'],['hitmeuppp',isM()?MV('i don’t know what ur talking about','i have no idea what you mean','I have no idea how those got there.','...I wanted to see you squint. You squint like you’re angry at the words.'):'(from the other room, very innocently) whaaaat'],['K9','The glasses are cold, Misaki. My face is going to be cold.']],()=>{apply({aff:1});done()})}});
/* ===================== GRAPHICS PASS ===================== */
/* every pixel sprite gets a thin dark outline (cached silhouette), so characters read against busy floors */
const _pxOut=tdPx;tdPx=function(a,cx,fy,flip,ps=1,pal){if(META.fx===0)return _pxOut(a,cx,fy,flip,ps,pal);const n=a[0].length,h=a.length;
 let m=TDSIL.get(a);if(!m){m=new Map();TDSIL.set(a,m)}const P=pal||a.P||PAL;const key=(flip?1:0)+'|'+ps+'|'+SC+'|'+Object.values(P).join(',');let sil=m.get(key);
 if(!sil){const k=ps*SC;const o=document.createElement('canvas');o.width=Math.ceil(n*k);o.height=Math.ceil(h*k);const g=o.getContext('2d');if(g){g.fillStyle='rgba(10,6,16,.88)';for(let j=0;j<h;j++){const r=a[j];for(let i=0;i<n;i++){const ch=r[flip?n-1-i:i];if(ch==='.'||ch===undefined||!P[ch])continue;g.fillRect(Math.round(i*k),Math.round(j*k),Math.ceil(k),Math.ceil(k))}}}if(m.size>12)m.clear();m.set(key,o);sil=o}
 const sn=v=>Math.round(v*SC)/SC;const dx=sn(cx-n*ps/2),dy=sn(fy-h*ps),w=sil.width/SC,hh=sil.height/SC,d=.6;
 c.drawImage(sil,dx-d,dy,w,hh);c.drawImage(sil,dx+d,dy,w,hh);c.drawImage(sil,dx,dy-d,w,hh);c.drawImage(sil,dx,dy+d,w,hh);_pxOut(a,cx,fy,flip,ps,pal)};
const TDSIL=new WeakMap();
/* screen-space finish: per-place colour grade, glow on lights, vignette, a little film grain */
const FXC={};function fxCache(k,make){if(!FXC[k]||FXC[k].sc!==SC){FXC[k]=make();FXC[k].sc=SC}return FXC[k]}
function fxGrade(z){const id=(z&&(z.id||z.room))||'',r=S&&S.room||'';const night=tdNight();
 if(/dp_library/.test(id))return['rgba(80,220,200,1)',.16];if(/dp_dome/.test(id))return['rgba(255,120,200,1)',.18];if(/dp_cham|dp_wing|dp_obs|haunt|cell/.test(id))return['rgba(200,40,60,1)',.12];
 if(/^dp_/.test(id))return['rgba(120,170,230,1)',.14];if(z&&z.out)return night?['rgba(70,90,200,1)',.2]:['rgba(255,200,140,1)',.12];
 if(/ronin/.test(r))return['rgba(255,80,110,1)',.12];if(/studio/.test(r))return['rgba(255,150,200,1)',.12];return night?['rgba(120,100,220,1)',.12]:['rgba(255,190,120,1)',.1]}
function tdPost(z,cam){if(META.fx===0||!S)return;c.save();c.setTransform(1,0,0,1,0,0);c.scale(SC,SC);
 const M=scene&&scene.M;if(M&&M.lights&&cam){c.globalCompositeOperation='lighter';let n=0;for(const l of M.lights){if(n>40)break;if(l.on&&!l.on())continue;const sx=l.x-cam.x,sy=l.y-cam.y;if(sx<-60||sx>W+60||sy<-60||sy>H+60)continue;n++;const r=(l.r||50)*.55;c.globalAlpha=.09*(l.i||.6);c.drawImage(tdGrad(Math.round(r),l.col||'255,214,160'),sx-r,sy-r,r*2,r*2)}c.globalAlpha=1}
 const [col,a]=fxGrade(z);c.globalCompositeOperation='soft-light';c.globalAlpha=a;c.fillStyle=col;c.fillRect(0,0,W,H);c.globalAlpha=1;c.globalCompositeOperation='source-over';
 const vig=fxCache('vig',()=>{const o=document.createElement('canvas');o.width=W*2;o.height=H*2;const g=o.getContext('2d');if(g){const gr=g.createRadialGradient(W,H,H*.55,W,H,W*1.05);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(4,2,10,.62)');g.fillStyle=gr;g.fillRect(0,0,W*2,H*2)}return o});c.drawImage(vig,0,0,W,H);
 if(!META.reduceMotion){const gr=fxCache('grain',()=>{const o=document.createElement('canvas');o.width=o.height=96;const g=o.getContext('2d');if(g){const id=g.createImageData(96,96);for(let i=0;i<id.data.length;i+=4){const v=Math.random()*255;id.data[i]=id.data[i+1]=id.data[i+2]=v;id.data[i+3]=18}g.putImageData(id,0,0)}return o});
  const ox=(T*37)%96,oy=(T*53)%96;c.globalAlpha=.5;for(let x=-ox;x<W;x+=96)for(let y=-oy;y<H;y+=96)c.drawImage(gr,x,y);c.globalAlpha=1}
 c.restore()}
const _wfxPost=tdWeatherFX;tdWeatherFX=function(zone,cam){_wfxPost(zone,cam);try{tdPost(scene&&scene.zone,cam)}catch(e){}};
if(typeof window!=='undefined')addEventListener('keydown',e=>{if(e.key.toLowerCase()==='g'&&!dlg&&S){META.fx=META.fx===0?1:0;saveMeta();toast(META.fx===0?'Graphics: classic (G)':'Graphics: enhanced (G)')}});

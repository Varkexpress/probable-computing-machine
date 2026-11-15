/* ===================== THE SHATTER (kc53) =====================
   The moment the cell stops being a cell. Whenever her clarity crosses into knowing (the morning it clears on a
   normal stay, reasoning it out, the interrupted night, or too late), the cell drawing cracks across and falls away
   in pieces to show the infirmary underneath. Then what that feels like. And the pieces that don't go. */
function kdShatterFx(cb,o){o=o||{};let t=0;const N=150;const sh=[];for(let gy=0;gy<5;gy++)for(let gx=0;gx<8;gx++){const x=gx*40,y=gy*36;const j=()=>rnd(-6,6);
  sh.push({pts:[[x+j(),y+j()],[x+40+j(),y+j()],[x+40+j(),y+36+j()],[x+j(),y+36+j()]],cx:x+20,cy:y+18,vx:rnd(-.6,.6),vy:rnd(-.4,.2),vr:rnd(-.03,.03),delay:Math.floor(30+Math.hypot(x+20-160,y+18-90)/2+rnd(0,20)),fall:0})}
 const cracks=Array.from({length:9},(_,i)=>{const a=i/9*Math.PI*2+rnd(-.2,.2);return{a,len:0}});
 go({isFx:1,update(){t++;if(t>N+30||(t>20&&hit('act'))){cb();return}},draw(){
  const clear=()=>{const m=S.kd&&S.kd.med;if(o.dark){rect(0,0,W,H,'#000');return}if(m){const c0=m.clar;m.clar=3;try{kdDrawMed()}finally{m.clar=c0}}else kdDrawMed()};
  clear();if(o.dark){c.globalAlpha=1}
  sh.forEach(s=>{const k=Math.max(0,t-s.delay);if(k>0){s.fall=k;}const dy=s.fall*s.fall*.04+s.fall*s.vy,dx=s.fall*s.vx,r=s.fall*s.vr;if(dy>220)return;
   c.save();c.translate(s.cx+dx,s.cy+dy);c.rotate(r);c.translate(-s.cx,-s.cy);c.beginPath();c.moveTo(s.pts[0][0],s.pts[0][1]);for(let i=1;i<4;i++)c.lineTo(s.pts[i][0],s.pts[i][1]);c.closePath();c.clip();
   drawCell();if(o.dark){c.fillStyle='rgba(0,0,0,.35)';c.fillRect(0,0,W,H)}c.restore();
   if(s.fall>0&&s.fall<40){c.strokeStyle='rgba(255,255,255,'+(.6-s.fall/70)+')';c.lineWidth=.6;c.beginPath();c.moveTo(s.pts[0][0]+dx,s.pts[0][1]+dy);for(let i=1;i<4;i++)c.lineTo(s.pts[i][0]+dx,s.pts[i][1]+dy);c.closePath();c.stroke()}});
  if(t<40){cracks.forEach(cr=>{cr.len=Math.min(220,cr.len+6);c.strokeStyle='rgba(255,255,255,.85)';c.lineWidth=.8;c.beginPath();c.moveTo(160,90);let x=160,y=90;for(let s=0;s<cr.len;s+=12){x+=Math.cos(cr.a+Math.sin(s)*.3)*12;y+=Math.sin(cr.a+Math.cos(s)*.3)*12;c.lineTo(x,y)}c.stroke()})}
  if(t<8){c.fillStyle='rgba(255,255,255,'+(.5-t/16)+')';c.fillRect(0,0,W,H)}
  hudBar(o.title||'','')}})}
/* the words that go with it */
const KD_SHATTER_LINES={
 morning:[['','You look at the door and it has a handle, and this time, when you look away and back, it still has a handle.'],
  ['','And the cell cracks. Not the walls. The idea of it. It goes from the middle outwards, the way a windscreen goes when a stone hits it, and for one second all of it is still standing, held together by nothing, every bar and bulb and radio, and then it falls.'],
  ['','Underneath it there was a room. There was always a room. Pale green walls. A lamp with a shade on it. A clipboard in fountain pen. A light-well with a leaf on it.'],
  ['hitmeuppp',MV('(oh.)','(oh. oh, it’s a room. it’s just a room.)','(Oh. It’s a room. It’s just a room. It was always a room.)','(Oh. Oh, it’s a room. It’s a hospital room in a house. It’s been a room the whole time and I was so scared of it.)')],
  ['','You sit down on the floor, because your legs have decided to, and you don’t cry, and then you do.']],
 logic:[['','The last piece goes into place, and the cell doesn’t so much break as stop being able to stand up.'],
  ['','It comes down around you in pieces the size of hands. The bulb goes, and is a lamp. The radio goes, and is the boiler. The cot goes, and is a bed with ironed sheets. The guard’s chair outside the door goes, and is a man on the floor with a book.'],
  ['','You stand in the middle of it while it falls, the way you’d stand in snow, and none of it hurts you. It never could have. It was never there.']],
 caught:[['','He says the menu. He says the angle of the bed. He says Tuesday. And it breaks.'],
  ['','The whole cell goes at once, all of it, bars and bulb and nine days, in pieces, falling away from you like something dropped down a stairwell, and underneath it is his face, very close, lower than yours, wet, which you have never seen.']],
 late:[['','It breaks.'],['','Now, of all the times. Every piece of the cell comes away at once and underneath, too clear, too bright, there is the room you drew on a menu, and his sheets, and his breathing on the other side of the door.'],
  ['','You can see all of it. You can see exactly where you are. There is nothing left you can do with it.']]};
/* normal stays: the first time clarity reaches 2 */
const _hubKD53=hub;hub=function(){const a=arguments,self=this;try{const m=S&&S.kd&&S.kd.med;if(m&&S.pov!=='v'&&!m.shattered&&m.clar>=2&&!dlg&&kdMedM()){m.shattered=1;save();return kdShatterFx(()=>{go(cutBg('#1c2422'));say(KD_SHATTER_LINES.morning,()=>{calm(4);_hubKD53.apply(self,a)})},{title:''})}}catch(e){}return _hubKD53.apply(self,a)};
/* reasoning it out */
const _loKD53=kdLogicOut;kdLogicOut=function(){const m=S.kd.med;m.shattered=1;save();kdShatterFx(()=>{go(cutBg('#1c2422'));say(KD_SHATTER_LINES.logic,()=>_loKD53())})};
/* interrupted: shatter in the middle of his words */
const _intKD53=kdInterrupted;kdInterrupted=function(){const m=S.kd.med;m.shattered=1;save();kdShatterFx(()=>{go(cutBg('#000'));say(KD_SHATTER_LINES.caught,()=>_intKD53())},{})};
/* too late: the same break, with nothing to be done */
const _spKD53=kdSpiral;kdSpiral=function(){const m=S.kd&&S.kd.med;if(!m||m.shattered||kdSpiralSecret())return _spKD53();
 const _cut=cut;let n=0;cut=function(L,cb,bg){n++;if(n===2){cut=_cut;return kdShatterFx(()=>{go(cutBg('#000'));say(KD_SHATTER_LINES.late,()=>_cut.call(this,L,cb,bg))},{dark:1})}return _cut.apply(this,arguments)};
 try{return _spKD53()}finally{}};
/* the pieces that don't go */
kdEv('kd_shards',()=>kdD()>=1&&S.kd&&S.kd.sev0>=4&&!S.f.kdShards,done=>{S.f.kdShards=1;save();const me=S.pov!=='v';say(me?[
 ['','Not all of it went. Pieces stay, the way glass stays in a carpet for years after the glass broke.'],
 ['','The bulb over the kitchen island is the bulb, some mornings, for the length of a breath. The boiler at one in the morning is the radio. V, coming down the stairs in the dark, is the tall one, and your hand is already on the knife before your eyes catch up.'],
 ['hitmeuppp',MV('(it’s a piece. it’s just a piece.)','(it’s a piece. it’s glass in the carpet. it’s not the room.)','(It’s just a piece. Glass in the carpet. It isn’t the room.)','(It’s a piece. It’s just a piece of it, still lying around. You step on them sometimes. Everyone steps on them sometimes. I’m going to be stepping on these for years, aren’t I.)')],
 ['','You don’t tell him about the knife. He knows anyway. He has started saying your name on the stairs, before he comes round the corner, every time.']]:[
 ['','Pieces of it stay in her. He can see them land.'],
 ['','Some mornings, for a breath, he is the tall one again: she goes still when he comes down the stairs, and her hand goes to the knife block, and then her eyes catch up and she takes it away and says good morning a little too brightly.'],
 ['K9','(I will say her name on the stairs before I come round the corner. Every time. For as long as it takes. If it is for ever, it is for ever.)']],()=>{calm(-2);apply({aff:3});done()})});
if(typeof KD_ORDER!=='undefined')KD_ORDER.unshift('kd_shards');
/* remember how bad the stay was, for scenes after discharge */
const _mmKD53=kdMedMorning;kdMedMorning=function(done){const m=S.kd&&S.kd.med;if(m)S.kd.sev0=m.sev||0;return _mmKD53(done)};

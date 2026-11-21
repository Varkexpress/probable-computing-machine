/* ===KC85-BEGIN=== */
/* ===================== THE WAR: MORE OF THE ROOM (kc85) =====================
   More infirmary on the enemies-to-lovers route, for both aftermath settings. kc84's scheduler fills every slot of the
   stay already, so these are opened by the player: while kdMed(), the side menu has one free ⚔ entry (The room /
   Outside the room). Each scene plays once; three a slot at most, six listed at a time (S.f.e2l85 {id:1}, S.f.e2l85Day, S.f.e2l85N).
   Needs kc73, kc76–kc84.
   FULL STORY (kc29's rules: never named; the honest option greyed with KD_NO; each pretence a kdDeny(); nobody tells
   Ronin or Angel; V never shown knowing what Misaki has said to the doctor):
     Misaki, cell:  x_radio, x_water     Misaki, clear: x_ceiling, x_fridge      V: x_radioV, x_owed (S.f.e2lOwed word|blank)
   INJURIES ONLY (kc36's rules: no denial, no doctor, V does the treatment; V's disgust, despite himself):
     Misaki, cell:  y_report, y_ties    Misaki, clear: y_floss, y_stars         V: y_boot, y_sleep
   EITHER SETTING:  Misaki, clear: z_name (how he says it)     V: z_line (the chalk line, four steps from the door)
   Voice: Misaki keeps the swearing, the jokes and some contractions at every tier (tools/mv_loosen.py contracts the
   common pairs in the top tier of kc76–kc85 and changes nothing else).
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc85.md. Tested in tools/k80_test.js. */
const K85=()=>{try{return typeof K84==='function'&&K84()}catch(e){return false}};

const K85S=[];

const k85Key=()=>S.day+'/'+(S.slot||0);
const k85Day=()=>S.f.e2l85Day===k85Key()?(S.f.e2l85N||0):0;
const k85List=()=>{try{const sa=k84SA(),m=S.pov!=='v',st=m?(kdClar()<2?'cell':'clear'):null,F=S.f.e2l85||{};
 return K85S.filter(e=>(e.pov==='m')===m&&(!e.mode||(e.mode==='sa')===sa)&&(!e.st||e.st===st)&&(!e.when||e.when())&&!F[e.id])}catch(e){return []}};
const k85Ok=()=>{try{return K85()&&typeof kdMed==='function'&&kdMed()&&k85List().length>0}catch(e){return false}};
function k85Room(){const m=S.pov!=='v',all=k85List(),L=all.slice(0,6),full=k85Day()>=3;
 ask(K73Who(),m?(kdClar()<2?'(the room.)':'(the room marked laundry.)'):'(The corridor outside the door marked LAUNDRY.)',L.map(e=>({t:e.t,sub:full?'enough for now':'',dis:full,fn:()=>{const f=S.f;f.e2l85=f.e2l85||{};f.e2l85[e.id]=1;f.e2l85N=k85Day()+1;f.e2l85Day=k85Key();save();
   go(cutBg(m?(kdClar()<2?'#0c0a08':'#1c2422'):'#06060c'));e.run(hub)}})).concat([{t:all.length>6?'Not now ('+(all.length-6)+' more after these)':'Not now',fn:hub}]))}
const _sh85=sideHub;sideHub=function(late){const o=_sh85(late);try{if(S&&k85Ok())o.push({t:'⚔ '+(S.pov!=='v'?'The room':'Outside the room'),sub:'free · '+k85List().length+' left'+(k85Day()>=3?' · enough for now':''),fn:k85Room})}catch(e){}return o};

 /* ---------------- more: either setting ---------------- */
/* ===================================== ENDINGS ===================================== */
const _xe85=extraEnding;extraEnding=function(){const L=_xe85();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f,F=f.e2l85||{};
 if(k84SA()){
  if(F.x_radio||F.x_radioV)L.push('No radio has played in the kennel corridor since the infirmary. Ronin sat awake in that chair every night and never complained of it.');
  if(f.e2lOwed==='word')L.push('One entry in V’s ledger waits on somebody else’s say: OWED TO M. AMOUNT NOT STATED. TO BE COLLECTED AT THEIR WORD.');
  else if(f.e2lOwed==='blank')L.push('One page of V’s ledger has an empty line at the top, above the hand and the ribs. He has never left another line empty.');
  if(F.x_ceiling)L.push('Misaki told V his infirmary ceiling was a six, because of the crack. He had the crack filled that day.')}
 else{
  if(F.y_floss)L.push('At twelve Misaki stitched their own side with mint dental floss. V called it a competent stitch and had to stand in the corridor.');
  if(F.y_stars)L.push('V rated the work on Misaki’s injuries: two, one and nought. He gave his own plan a nine, and withdrew it from consideration.');
  if(F.y_boot)L.push('V has a bagged hoodie with a boot print on the back, size eleven, and a scuff where the sole was cleaned.')}}catch(e){}return L};
/* ===KC85-END=== */

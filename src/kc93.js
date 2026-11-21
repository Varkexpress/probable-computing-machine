/* ===KC93-BEGIN=== */
/* ===================== THE WAR: WHAT IT DID (kc93) =====================
   More infirmary for the enemies-to-lovers route, in kc85's player-opened pool. The subject here is the damage itself:
   what four days in the other building taught Misaki's body and judgement to do, which goes on working in a safe
   room; and what it does to V to stand where the men stood. Nothing in it is a twist. The horror is that the methods
   worked, on somebody who thought they could not be worked on, and that they keep working with nobody applying them.
   Needs kc73, kc76–kc92.
     Misaki, cell:   p_grateful  p_spoon  p_days  p_table  p_error  p_under (S.f.e2lUnder out|stayed)  p_name
     Misaki, clear:  p_real  p_voice  p_list  p_wake  p_good
     V:              p_orders  p_plan  p_underV  p_meat  p_day  p_leave  p_power
   Nothing here touches the hours, and the doctor does not appear, so the text is the same under both aftermath
   settings.
   Also: kc85's menu now rotates which six scenes it lists, by day and slot, so that a large pool is not always read
   from the top.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc93.md. Tested in tools/k86_test.js and tools/k93_test.js. */
const K93=()=>{try{return typeof K92==='function'&&K92()}catch(e){return false}};

/* ===================================== MISAKI: THE ROOM IS A CELL ===================================== */
/* ===================================== MISAKI: CLEAR ===================================== */
/* ===================================== V ===================================== */
/* ===================================== THE MENU ROTATES ===================================== */
if(typeof k85Room==='function'){const _r93=k85Room;k85Room=function(){try{const all=k85List();if(all.length>6){const off=((S.day||0)*5+(S.slot||0)*2+(S.f.e2l85?Object.keys(S.f.e2l85).length:0))%all.length;
  const _l=k85List;const m=S.pov!=='v',L=all.slice(off).concat(all.slice(0,off)).slice(0,6),full=k85Day()>=3;
  return ask(K73Who(),m?(kdClar()<2?'(the room.)':'(the room marked laundry.)'):'(The corridor outside the door marked LAUNDRY.)',L.map(e=>({t:e.t,sub:full?'enough for now':'',dis:full,fn:()=>{const f=S.f;f.e2l85=f.e2l85||{};f.e2l85[e.id]=1;f.e2l85N=k85Day()+1;f.e2l85Day=k85Key();save();
    go(cutBg(m?(kdClar()<2?'#0c0a08':'#1c2422'):'#06060c'));e.run(hub)}})).concat([{t:'Not now ('+(all.length-6)+' more after these)',fn:hub}]))}}catch(e){}return _r93.apply(this,arguments)}}

/* ===================================== ENDINGS ===================================== */
const _xe93=extraEnding;extraEnding=function(){const L=_xe93();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f,F=f.e2l85||{};
 if(f.e2lUnder)L.push('One night in the infirmary Misaki slept under the bed. V lay down on the stone of the corridor, forty feet off, with his cheek on the floor, and did not ask them to come out. There is a mat under that bed now.');
 if(F.p_orders)L.push('V has not used an imperative to Misaki since the day he said “sit up” and they did, on three broken ribs, before he had finished the second word.');
 if(F.p_real)L.push('Misaki asked V eleven questions that only he could answer, to prove that the room was real. He answered them all, and then told them that it could not be proved.');
 if(F.p_power)L.push('V wrote three aims for Misaki in April: to know, to fear, to understand. The infirmary taught him that the first two destroy the third, and that this was true of everybody he ever put on the table.');
 if(F.p_day)L.push('For a time V said “It is Tuesday. The door opens from both sides” to the hounds, to a red light, and once to the chair of his foundation.')}catch(e){}return L};
/* ===KC93-END=== */

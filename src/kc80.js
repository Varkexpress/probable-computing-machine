/* ===KC80-BEGIN=== */
/* ===================== THE WAR: THE ROOM MARKED LAUNDRY (kc80) =====================
   More of the infirmary on the enemies-to-lovers route. kc73 gave V four scenes and Misaki three; this adds eleven,
   in the same register: never romantic, nothing resolved, V despising them and unable to act, Misaki taking the tall
   one with the tray for a captor and being good for him. Nothing names or hints at what happened in the hours; the
   text touches only the hand and the ribs, so it reads the same with kdSA() on or off.
   Delivery: through hub(), only while kdMed(), only when kc73 (and kc61–63) have nothing for the slot, one a slot.
     Misaki, while the room is a cell (kdClar()<2), mornings and afternoons:  the rules · the message for K9 ·
       the hound at the door · the other hand                                   S.f.e2l80MC (index), S.f.e2lMedAsk
     Misaki, once clear:  what you said · forty-one thank-yous                  S.f.e2l80MX, S.f.e2lThanks told|soup
     V, any slot kc73 leaves free:  the message · the file · the form · the other hand · Ronin in the corridor
                                                                                S.f.e2l80V, S.f.e2lMedKey ronin|kept
   Rules: unnamed city, hounds unnamed, no new named characters (the doctor has no name), V never contracts,
   Misaki via MV and they/them. Notes: docs/notes_kc80.md. Test: node tools/k80_test.js */
const K80=()=>{try{return typeof K79==='function'&&K79()}catch(e){return false}};
const k80Gone=()=>{try{return typeof k73Gone==='function'&&k73Gone()}catch(e){return false}};

/* ===================================== MISAKI: THE ROOM IS A CELL ===================================== */
const K80_MC=[];

/* ===================================== MISAKI: CLEAR ===================================== */
const K80_MX=[];

/* ===================================== V ===================================== */
const K80_V=[];

/* ===================================== DELIVERY ===================================== */
function k80MedScene(){try{if(!S||!S.f||!K80()||dlg||typeof kdMed!=='function'||!kdMed())return null;
 if(typeof k73MedScene==='function'&&k73MedScene())return null;
 if((typeof k61Scene==='function'&&k61Scene())||(typeof k62Scene==='function'&&k62Scene())||(typeof k63Scene==='function'&&k63Scene()))return null;
 const cur=S.day+'/'+(S.slot||0),f=S.f;if(f.e2l80Slot===cur||f.e2lMedSlot===cur)return null;
 const run=(fn,bg,key,i)=>cb=>{f[key]=i+1;f.e2l80Slot=cur;save();go(cutBg(bg));fn(cb)};
 if(S.pov!=='v'){if((S.slot||0)>=2)return null;
  if(kdClar()<2){const i=f.e2l80MC||0;return i<K80_MC.length?run(K80_MC[i],'#0c0a08','e2l80MC',i):null}
  const i=f.e2l80MX||0;return i<K80_MX.length?run(K80_MX[i],'#1c2422','e2l80MX',i):null}
 const i=f.e2l80V||0;return i<K80_V.length?run(K80_V[i],'#06060c','e2l80V',i):null}catch(e){return null}}
const _hub80=hub;hub=function(){const a=arguments,self=this;try{const s=k80MedScene();if(s)return s(()=>_hub80.apply(self,a))}catch(e){}return _hub80.apply(self,a)};

/* ===================================== ENDINGS ===================================== */
const _xe80=extraEnding;extraEnding=function(){const L=_xe80();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f;
 if(f.e2lMedAsk)L.push('In the infirmary Misaki asked the tall one with the tray to tell K9 he could have them. V said that he would tell him. He burned the straps off his table that night.');
 if(f.e2lThanks==='told')L.push('Misaki thanked V forty-one times for soup while they took him for a captor. He says he did not keep them. They were not addressed to him.');
 if(f.e2lMedKey==='ronin')L.push('For the week Misaki was in the infirmary, Ronin held the only key. V put it in his hand himself.')}catch(e){}return L};
/* ===KC80-END=== */

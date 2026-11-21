/* ===KC86-BEGIN=== */
/* ===================== THE WAR: THE ROOM, EITHER SETTING (kc86) =====================
   Twenty more infirmary scenes for the enemies-to-lovers route that read the same under both aftermath settings
   (nothing here touches the hours, and the doctor does not appear). They join kc85's player-opened pool (K85S):
   ⚔ The room / ⚔ Outside the room, while kdMed(). kc86 also raises the pool's limit to three a slot and shows six
   at a time, since the pool is now large. Needs kc73, kc76–kc85.
     Misaki, cell (the tall one is a captor):  g_north g_spoon g_shoe g_number g_handle g_voice g_eye
     Misaki, clear:                            g_sign g_ronin g_nails g_book g_grandpa
     V:   g_kneel g_soles g_hale g_meat g_shoeV g_aloud g_shotgun g_asked
   (kc90's pass cut eight filler scenes from this module and made the cell scenes warier.)
   Helpers used by kc87 and kc88 as well: k86 (register a scene), N (narration), M2 (Misaki, text-speak / fuller),
   Ms (the same, with what the hands do when the voice is gone).
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc86_88.md. Tested in tools/k86_test.js. */
const K86=()=>{try{return typeof K85==='function'&&K85()}catch(e){return false}};
const N=t=>['',t];
const M2=(a,b)=>K76MV(a,a,b,b);
const Ms=(a,b,alt)=>k80Gone()?N(alt):M2(a,b);
const k86=(id,pov,mode,st,t,L,opt)=>{if(typeof K85S==='undefined')return;K85S.push({id,pov,mode,st,t,run:cb=>{const lines=(typeof L==='function'?L():L).filter(Boolean);opt?say(lines,()=>opt(cb)):say(lines,cb)}})};
/* ===================================== MISAKI: THE ROOM IS A CELL ===================================== */
/* ===================================== MISAKI: CLEAR ===================================== */
/* ===================================== V ===================================== */
/* ===KC86-END=== */

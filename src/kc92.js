/* ===KC92-BEGIN=== */
/* ===================== THE WAR: WHAT THEY DO IN THE ROOM (kc92) =====================
   More infirmary for the enemies-to-lovers route, in kc85's player-opened pool. These are scenes in which somebody
   does something, as against scenes in which a tray arrives. Needs kc73, kc76–kc91.
     Misaki, cell:   k_knife (S.f.e2lKnife tried|held)   k_offer   k_hound   k_wash (a version for each setting)
                     k_ran (only after an escape attempt: S.kd.med.run)
     Misaki, clear:  k_pray   k_pistol (S.f.e2lPistol checked|aimed)
     V:              k_knifeV (S.f.e2lKnifeV still|told)   k_offerV   k_houndV   k_washV (injuries only)
                     k_ranV (after an escape attempt)   k_miss   k_hale   k_empty
   Characters, as they are here:
     Misaki is an assassin on a great deal of pain relief who believes the tall one is K9 and means to kill them.
       They are not broken. They are working: they case the room, they try him with a knife, and when that fails
       they offer him the only thing they have ever had to sell.
     V does not explain himself and does not contract. He keeps still under a knife. He writes down what he did.
     Ronin bargains with the Devil, and is rude to him. Angel never misses, and here she does.
   Full-story text keeps kc29's rules; injuries-only text keeps kc36's (no doctor).
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc92.md. Tested in tools/k86_test.js and tools/k92_test.js. */
const K92=()=>{try{return typeof K91==='function'&&K91()}catch(e){return false}};
const k92When=fn=>{try{K85S[K85S.length-1].when=fn}catch(e){}};
const k92Ran=()=>{try{return !!(S.kd&&S.kd.med&&S.kd.med.run>0)}catch(e){return false}};

/* ===================================== MISAKI: THE ROOM IS A CELL ===================================== */
/* ===================================== MISAKI: CLEAR ===================================== */
/* ===================================== V ===================================== */
/* ===================================== ENDINGS ===================================== */
const _xe92=extraEnding;extraEnding=function(){const L=_xe92();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f,F=f.e2l85||{};
 if(f.e2lKnife==='tried'||f.e2lKnifeV)L.push('In the infirmary, drugged, Misaki put the tray knife to V’s neck. He kept still, said “It happens”, and laid it back on the tray with the handle towards them.');
 if(F.k_offer||F.k_offerV)L.push('In the infirmary Misaki offered to clear V’s list for him, four a month, for nothing. He said no, and could find nothing to put after it.');
 if(f.e2lPistol)L.push('V gave Misaki their pistol back in the infirmary, loaded, with nobody else in the house. They slept on their back that night.');
 if(F.k_pray)L.push('Ronin offered the Devil two men off his list, and himself on account, to leave Misaki alone. He ended the prayer by telling him to go fuck himself.');
 if(F.k_miss)L.push('Angel missed eleven shots in a row on the range under V’s house the week Misaki was in the infirmary. She has not missed one since.')}catch(e){}return L};
/* ===KC92-END=== */

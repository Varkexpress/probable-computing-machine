/* ===KC96-BEGIN=== */
/* ===================== THE WAR: THE QUARREL, DOWNSTAIRS (kc96) =====================
   The infirmary expansion again, at the author's direction, in kc95's characterization and tone. Needs kc73,
   kc76–kc95. Fourteen scenes in kc85's player-opened pool (now 166).
   The earlier infirmary rounds are about what the other building did. These are about who is in the room: a
   contract killer and the man who has sworn to kill them, both good at their work, neither changed in what they
   believe. Misaki's fear is still counted in steps, with the bravado on top. V still despises what they are, and
   nurses it exactly.
     Misaki, cell:   q_case  q_alive  q_collar  q_charge  q_free
     Misaki, clear:  q_rep  q_book  q_four  q_owe
     V:              q_thread  q_botched  q_asleep  q_share  q_cactus
   While the room is a cell (the standing rule): Misaki takes the tall one for K9, who has them and means to kill
   them. They do not banter with him or warm to him. They case him, as they would case any job.
   Nothing here touches the hours, and the doctor does not appear: the same text under both aftermath settings.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc96.md. Tested in tools/k86_test.js (every pool scene is listed, played and text-checked). */
const K96=()=>{try{return typeof K95==='function'&&K95()}catch(e){return false}};

/* ===================================== MISAKI: THE ROOM IS A CELL ===================================== */
/* ===================================== MISAKI: THE ROOM IS A ROOM ===================================== */
/* ===================================== V ===================================== */
/* ===================================== ENDINGS ===================================== */
const _xe96=extraEnding;extraEnding=function(){const L=_xe96();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const F=S.f.e2l85||{};
 if(F.q_alive)L.push('In the infirmary Misaki worked out why they were still alive: he has never killed a thing that was not well. “i’m a goose in a basement.”');
 if(F.q_free)L.push('Nobody had paid for it. Misaki would have quoted six thousand for themself, and was going for nothing, to a volunteer.');
 if(F.q_book)L.push('Ronin took Misaki’s last ninety dollars, out of the lining of a boot, at eleven-to-one, on Misaki killing V first.');
 if(F.q_four)L.push('The four men from the river were shared out on the back of a chart. Ronin got the boot, Angel the driver, V the one who kept the books. The bald one is Misaki’s.');
 if(F.q_owe)L.push('“that’s not saving someone. that’s stock-taking.” “Precisely. You owe me nothing whatever.”');
 if(F.q_asleep)L.push('Drugged, with a fever, Misaki read the case against V out to the ceiling. He wrote it at the back of the chart and initialled it as received.');
 if(F.q_cactus)L.push('V had the run of Misaki’s trailer, the rifle and the client list. He took the cereal and watered the cactus.')}catch(e){}return L};
/* ===KC96-END=== */

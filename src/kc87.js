/* ===KC87-BEGIN=== */
/* ===================== THE WAR: THE ROOM, FULL STORY (kc87) =====================
   Twenty-six more infirmary scenes for the enemies-to-lovers route under the full-story setting (kdSA()), in kc85's
   player-opened pool. Needs kc73, kc76–kc86.
   kc29's rules hold without exception:
     - what happened in the hours is never named, by Misaki, by V, by the doctor, by anybody, or by the narration;
     - Misaki knows, and so does V; the honest option is on the menu and always greyed (k84No → KD_NO);
     - every pretence is a kdDeny() (k84Deny); V can decline to force it and cannot make them;
     - nobody tells Angel or Ronin; what they have, they worked out;
     - no text shows V knowing anything Misaki has said to the doctor.
   Misaki, cell:  x2_corner x2_dark x2_palms x2_look x2_bag x2_back x2_gap
   Misaki, clear: x2_soap x2_mirror x2_floor x2_gross x2_hours x2_joke x2_asleep x2_weak
   V:             x2_bagV x2_leaflet x2_asked x2_noone x2_pockets x2_names x2_sheet x2_dream x2_tall x2_soapV x2_sentence
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc86_88.md. Tested in tools/k86_test.js. */
const k87Pick=(who,hint,no,why,yes,after)=>cb=>ask(who,hint,[k84No(no,why),{t:yes,fn:()=>{k84Deny();say(after.filter(Boolean),cb)}}]);

/* ===================================== MISAKI: THE ROOM IS A CELL ===================================== */
/* ===================================== MISAKI: CLEAR ===================================== */
/* ===================================== V ===================================== */
/* ===KC87-END=== */

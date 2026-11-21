/* ===KC94-BEGIN=== */
/* ===================== THE WAR: THE THOUGHT, AGAIN (kc94) =====================
   The author's direction: show that both of them are deeply conflicted during the infirmary, V above all. He thinks
   of killing them more than once, and each time the thought sickens him.
   kc73 has one such scene (the dinner, the sink). This module makes it a sequence. It is ordered, so it is not in the
   rotating pool: while kdMed(), the side menu has a second free entry, one scene a slot.
     V:      ⚔ The thought   seven scenes, in order (S.f.e2l94V counts them). It arrives by a different door each
             time: the law; mercy; anger; the hands, by habit; a throat offered; the tidy book; and once more when they
             are themselves again. Each time he gets a little way, and each time his body refuses before he does.
             He is never talked out of it and never reasons his way out. He despises them throughout.
             Choice in the sixth: S.f.e2lTotal blot|T.
     Misaki: ⚔ What you want   three scenes while the room is a cell, two once clear (S.f.e2l94M, S.f.e2l94X).
             They want him dead and need him alive. They want it over and do not want to die. They cannot find the
             hatred and cannot afford to lose it. Once clear: they owe him, and want him to go on wanting them dead,
             because the alternative is pity.
   The war page (kc76) shows the count for V.
   Nothing here touches the hours, and the doctor does not appear: the same text under both aftermath settings.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc94.md. Test: node tools/k94_test.js */
const K94=()=>{try{return typeof K93==='function'&&K93()}catch(e){return false}};

/* ===================================== V: THE THOUGHT ===================================== */
const K94_V=[];

/* ===================================== MISAKI: WHAT YOU WANT ===================================== */
const K94_M=[];
const K94_X=[];

/* ===================================== DELIVERY ===================================== */
const k94Key=()=>S.day+'/'+(S.slot||0);
const k94Next=()=>{try{if(!K94()||typeof kdMed!=='function'||!kdMed())return null;const f=S.f;if(f.e2l94Slot===k94Key())return null;
 if(S.pov==='v'){const i=f.e2l94V||0;if(i>=K94_V.length)return null;if(i===K94_V.length-1&&S.kd&&S.kd.med&&(S.kd.med.clar||0)<2&&(S.kd.med.d||0)<2)return null;return {fn:K94_V[i],key:'e2l94V',i,bg:'#050507'}}
 if(kdClar()<2){const i=f.e2l94M||0;return i<K94_M.length?{fn:K94_M[i],key:'e2l94M',i,bg:'#0b0908'}:null}
 const i=f.e2l94X||0;return i<K94_X.length?{fn:K94_X[i],key:'e2l94X',i,bg:'#1a211f'}:null}catch(e){return null}};
function k94Run(){const e=k94Next();if(!e)return hub();S.f[e.key]=e.i+1;S.f.e2l94Slot=k94Key();save();go(cutBg(e.bg));e.fn(hub)}
const k94Label=()=>{const f=S.f;if(S.pov==='v'){const n=f.e2l94V||0;return {t:'⚔ The thought'+(n?', again':''),sub:'free · '+(n?'it has come '+n+' time'+(n===1?'':'s'):'it is in your own handwriting')}}
 return {t:'⚔ What you want',sub:'free · '+(kdClar()<2?'in a room with one door':'now that you know whose room it is')}};
const _sh94=sideHub;sideHub=function(late){const o=_sh94(late);try{if(S&&k94Next()){const L=k94Label();o.push({t:L.t,sub:L.sub,fn:k94Run})}}catch(e){}return o};

/* ===================================== ENDINGS ===================================== */
const _xe94=extraEnding;extraEnding=function(){const L=_xe94();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f,n=f.e2l94V||0;
 if(n>=7)L.push('Seven times, while Misaki lay in the infirmary, V set out to do what was written in his book: for the law, for mercy, in anger, by habit, at an offered throat, to balance a page, and once when it would at last have been fair. Seven times his own body stopped him at the door.');
 else if(n>=2)L.push('While Misaki lay in the infirmary, V set out '+n+' times to do what was written in his book. Each time he was sick before he reached the door.');
 if(f.e2lTotal==='blot')L.push('There is one blot in V’s ledger, at the foot of Misaki’s page, the width of a thumb. He made it on purpose.');
 else if(f.e2lTotal==='T')L.push('At the foot of Misaki’s page in V’s ledger there is one upright stroke: the beginning of a word, with nothing after it.');
 if((f.e2l94M||0)>=3)L.push('In the room they took for a cell, Misaki said “I’m going to kill you somewhere stupid” forty times to a smoke detector, so as not to lose the wanting of it.');
 if((f.e2l94X||0)>=2)L.push('Misaki cannot run the car park job in their head any more. He kneels in it.')}catch(e){}return L};
/* ===KC94-END=== */

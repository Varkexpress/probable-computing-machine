/* ===KC74-BEGIN=== */
/* ===================== ENEMIES TO LOVERS FROM DAY ONE (kc74) =====================
   kc73 made V × Misaki an enemies-to-lovers layer that was entered on days 1–4 and otherwise still ran the normal
   route's early game. This module makes the early game its own thing.
   1. Entry: a route choice at new game (title → "Enemies to lovers: V × Misaki" → whose side), before any normal-route
      V–Misaki interaction can play. The opening is kc73's card-man night, with the oath as an in-fiction choice
      (S.f.e2lOath 'loud'|'quiet' for Misaki, 'ledger'|'file' for V). kc73's day 1–4 side entry is retired.
   2. Gate: on the route, in the normal phase (K74N), every normal-route V–Misaki interaction is gated off or swapped
      for a hostile counterpart: morning EVENTS, phone threads and calls, side-menu dates, talk topics (convo is
      redirected to k74Talk), gifts, the mall and the wheel, the sleepers, the bed menu, night wakes, the peach night,
      moving in, the deep-house company, house barks, kc58's stair and notebook, kc59's friendly choices, kc60's
      Sunday table, kc64's location scenes, kc56's trailer visit, and the friendly server lines. Lists: K74G_*.
   3. New early game: the war menu (⚔, four hostile hub actions per POV), three set pieces spliced into kc73's beat
      order (the customs-house lift, the kennel at three, Angel's table), Ronin and Angel caught in the middle, hostile
      talk, morning beats, location encounters (the laundromat, the last train, the harbour, the greenhouse, gondola
      seven), threads and server lines. Choices feed kc73's after and boat beats and the ending lines.
   Flags (S.f): e2lOath, e2lMug shot|flask, e2lCase door|clean, e2lVan open|shut, e2lPhotos, e2lCactus in|out,
     e2lPlan slow|quick, e2lFollow went|waited, e2lLift m|v|held, e2lKennel fed|rifle|stay|set, e2lHound,
     e2lDinner glass|clean|drank|fern, e2lRon promise|no|page|choose, e2lAng told|lied|charges|quick, e2lShelter,
     e2lPrickles, e2lHale m|mno|v|vno, e2lTruck moved|stays, e2lLock fit|canal|given, e2lDot tea|blind,
     e2lTally {m,v}, e2l74 {action counts}.
   Rules: unnamed city, hounds unnamed, Inspector Hale, no new named characters, V never contracts, Misaki via MV.
   Notes: docs/notes_kc74.md. */
const K74N=()=>{try{return !!S&&E2L()&&S.phase==='normal'}catch(e){return false}};
const k74M=()=>S.pov!=='v';
const k74H=(m,v)=>k74M()?m:v;
const K74V=t=>['K9',t];
const K74MV=(...a)=>['hitmeuppp',MV(...(a.length===1?[a[0],a[0],a[0],a[0]]:a.length===2?[a[0],a[0],a[1],a[1]]:a.length===3?[a[0],a[0],a[1],a[2]]:a))];
const k74F=()=>{S.f.e2l74=S.f.e2l74||{};return S.f.e2l74};
const k74N=k=>k74F()[k]||0;
const k74Inc=k=>{const F=k74F();F[k]=(F[k]||0)+1;save();return F[k]};
const k74Tally=w=>{S.f.e2lTally=S.f.e2lTally||{m:0,v:0};S.f.e2lTally[w]=(S.f.e2lTally[w]||0)+1;save()};
const k74Say=(L,cb)=>say(L.filter(Boolean),cb);

/* ===================================== 1 · THE WAY IN ===================================== */
/* The title screen offers the route; kc73's card-man night is the opening, and the oath is the choice. */
function k74Title(){ask('','Enemies to lovers. Whose side are you on?',[
 {t:'Misaki',sub:'contracts, rent, and a billionaire she has sworn to kill',fn:()=>k74Begin('m')},
 {t:'V',sub:'the ledger, the hounds, and an assassin he has sworn to kill',fn:()=>k74Begin('v')},
 {t:'Back',fn:title}])}
function k74Begin(p){S=NEW(p);S.f.e2l=1;S.f.e2lAsk=1;S.f.e2lDay0=1;S.f.e2lOpen=1;S.f.e2l74={};save();drawHud();
 const intro=p==='v'?[['','V has four hounds, a foundation in forty-one cities, and a server full of serial killers he did not ask to be in.'],
  ['','One of them is an assassin named Misaki. His file on her is thicker than the file on anyone he has put on the steel table this year.'],
  K74V('She is on my list. She has been on my list since the gala.')]
 :[['','Misaki has a trailer, a gun, a sticker that says DON’T, and $90.'],['','Rent is $400. Due day 5. Then again by day 10.'],
  ['','There is also a man on the server who calls himself K9, a billionaire with four hounds and a charity, who has started taking her marks.'],
  K74MV('ok. rent first. then him.')];
 cut(intro,()=>k73Entry(true))}

/* ===================================== 2 · THE GATE ===================================== */
/* Morning events that are V–Misaki interactions, or the four of them at home together. [id, pov] (pov null = both) */
const K74G_EV=[['v_gift'],['mi_gift'],['confess'],['laundry'],['garden'],['vtold_v'],['x_late_text'],['x_misaki_mail'],['bk_aldric'],['bk_name'],['bk_coach'],
 ['dp_deepnote'],['t19_shoulder'],['t19_pile'],['t19_vm1'],['t19_vm2'],['gl_first'],['five_v'],['m_bowls'],['m_door'],['v_latch'],['m_frogs'],['m_bento'],
 ['gl_e_news'],['gl_e_season'],['gl_e_forecast'],['gl_e_dinner'],['gl_e_kennel'],['gl_e_scope'],['gl_e_ronin'],['gl_e_hara'],
 ['k24_laundry'],['k24_breakfast'],['k24_knives'],['k24_delivery','m'],['k24_storm','m'],['lore_shirt'],['lore_maths'],['lore_sold','v'],
 ['dk_table'],['dk_tally'],['dk_v_thread'],['dk_v_self'],['rel_alibi'],['rel_news'],['rel_power'],['rel_scream'],['rel_hose'],['rom_vm_package'],['g_book'],
 ['k57r_minute'],['k58_stair'],['k58_book'],['k58_first'],['a60_list'],['a60_quiet'],['lp60_listing'],['lp60_dress'],['vcontract'],['angel_call','m'],['lore_architect'],['dk_stream'],['dk_a_wrong'],['dk_m_hands'],['rel_vote'],
 ['k25_bath'],['k25_hotel']];
/* events kept but swapped for a counterpart on the route: run → k74 version */
const K74S_EV={a60_server:()=>k74A60,kd_omen:()=>S.pov==='v'?k74Canal:null,drift_txt:()=>k74Drift};
/* phone threads and calls between them */
const K74G_TX=['tx_vjob','tx_mrent','tx_vroof','tx_vlucky','tx_vgroc','tx_mcontact','tx_vhands','tx_m4am','tx_vcactus','tx_mbiscuit','tx_g_stars','tx_mw_door',
 'tx_k58_late','tx_k58_kettle','tx_w59_vq','tx_w59_vm','tx_c64_v','tx_k66_m','tx_k66_v'];
const K74G_CALL=['c_vjob','c_mlate','c_vfour','c_mtap'];
/* kc64 location scenes with the two of them in them */
const K74G_LOC=[['c64_bed','v'],['c64_env','v'],['c64_parab'],['c64_book'],['c64_skin','v'],['x64_wash'],['x64_spar'],['x64_car','m'],['x64_hound','m'],['f64_shelf'],['f64_roof'],['f64_kitchen']];
/* Angel's gacha arc is set on V's couch with the four of them as a household: on the route it waits, and starts after the
   normal phase (the beats run in order, so the whole arc moves together) */
const K74G_G64=['g64_pull','g64_3am','g64_money','g64_hide','g64_luck','g64_whale','g64_quit','g64_inter'];
/* house barks about the other one */
const K74G_REACT=[['v_gate'],['t_trFirstV'],['t_aloneV'],['t_vbedroom'],['k24_think'],['k22_terrorV'],['dp_domeReveal'],['v_vault'],['v_fridge'],['v_piano'],['v_train'],
 ['m_drawer','v'],['m_fridge','v'],['m_laundry','v'],['m_bed','v'],['m_crt','v']];
/* side-menu options: dates, the sanctuary, the four at V's, his story, her favour; [regex, pov] */
const K74G_SIDE=[[/^♥/],[/^Watch Misaki watch the street/],[/^The night drive/],[/^Sit in the pens with the hounds/,'m'],[/^Sunday at the table/],[/^Drinks at V’s/],
 [/^Ask V to make the heat go away/],[/^The last page of the ledger/],[/^Sunday at V’s table/],[/^Do nothing \(everyone\)/]];
/* friendly server lines (dropped while the route is in its normal phase) */
const K74G_CHAT=[/V is being WEIRD/,/^he WHAT$/,/charity dinner seating chart/,/a seatin’ chart/,/his board’s in V’s basement/,/group photo: misaki/,/^Seconded\. Quietly\.$/,
 /someone ask me if i ate/,/shirtless in the background of Vee’s/,/^and\?\?$/,/the donor was starin/,/V do u ever take a day off/,/Justice does not take days off/,
 /justice should get a hobby/,/Justice has seven dogs/,/did you eat today/,/Inform me when you are home/];

(function(){
 const off=(o,pov)=>{const w=o.when;o.when=function(){if(K74N()&&(!pov||(pov==='v')===(S.pov==='v')))return false;return w.apply(this,arguments)}};
 const LISTS=[EVENTS].concat(typeof K22EV!=='undefined'?[K22EV]:[],typeof T19EV!=='undefined'?[T19EV]:[]);const seenE=new Set();
 K74G_EV.forEach(([id,pov])=>LISTS.forEach(Ls=>Ls.filter(e=>e.id===id&&!seenE.has(e)).forEach(e=>{seenE.add(e);off(e,pov)})));
 Object.keys(K74S_EV).forEach(id=>EVENTS.filter(e=>e.id===id).forEach(e=>{const r=e.run;e.run=function(done){let f=null;try{if(K74N())f=K74S_EV[id]()}catch(x){}
  if(f){if(id==='a60_server'){S.f[id]=1;S.seen[id]=1;S.f.a60Last=S.day;save()}return f(done)}return r.apply(this,arguments)}}));
 K74G_TX.forEach(id=>{if(TXS[id])off(TXS[id])});
 if(typeof CALLS!=='undefined')K74G_CALL.forEach(id=>CALLS.filter(c=>c.id===id).forEach(c=>off(c)));
 if(typeof G64!=='undefined')K74G_G64.forEach(id=>G64.filter(e=>e.id===id).forEach(e=>off(e)));
 if(typeof K64L!=='undefined')K74G_LOC.forEach(([id,pov])=>K64L.filter(e=>e.id===id).forEach(e=>off(e,pov)));
 TDREACT.filter(r=>(r.by==='v'||r.by==='m')&&!K74G_REACT.some(([id])=>id===r.id)).forEach(r=>K74G_REACT.push([r.id]));  /* every bark the other one says */
 K74G_REACT.forEach(([id,pov])=>TDREACT.filter(r=>r.id===id).forEach(r=>{const w=r.when;r.when=function(){if(K74N()&&(!pov||(pov==='v')===(S.pov==='v')))return false;return w?w.apply(this,arguments):true}}));
})();
const _sh74=sideHub;sideHub=function(late){let o=_sh74(late);try{if(!S||!K74N())return o;
 o=o.filter(x=>!(x&&x.t&&K74G_SIDE.some(([rx,pov])=>rx.test(x.t)&&(!pov||(pov==='v')===(S.pov==='v')))));
 o.push({t:'⚔ '+k74H('The war: him','The war: her'),sub:S.done.k74act?'done today':'costs time · '+k74H('surveil, case, intercept, threaten','study, file, plan, follow'),dis:!!late||!!S.done.k74act,fn:k74War})}catch(e){}return o};
const _chat74=chatLog;chatLog=function(){let L=_chat74();try{if(!S||!K74N())return L;L=L.filter(x=>!K74G_CHAT.some(rx=>rx.test(String(x[1]))));
 const P=K74CHAT.filter(c=>{try{return c.when()}catch(e){return false}});if(P.length)P[(S.day*3+S.slot)%P.length].l.forEach(x=>L.push(x))}catch(e){}return L};
/* talk: the whole topic menu (TOPICS_V/M, TDTOP_*, gifts, affection) is replaced by the hostile one */
const _convo74=convo;convo=function(w,where){if(K74N()&&(w==='v'||w==='m'))return k74Talk(w,where);return _convo74.apply(this,arguments)};
/* functions that open friendly scenes */
const _mi74=moveInReady;moveInReady=function(){if(K74N())return false;return _mi74.apply(this,arguments)};
const _k71Ok74=k71Ok;k71Ok=function(){if(K74N())return false;return _k71Ok74.apply(this,arguments)};
const _nw74=nightWake;nightWake=function(go){if(K74N())return go();return _nw74.apply(this,arguments)};
const _dpc74=dpCompanion;dpCompanion=function(){if(K74N())return null;return _dpc74.apply(this,arguments)};
const _ph74=partnerHere;partnerHere=function(where){const r=_ph74.apply(this,arguments);if((r==='v'||r==='m')&&K74N())return null;return r};  /* nobody cooks with the enemy */
const _mm74=morningEventM;morningEventM=function(done){if(K74N())return morningEventL(done);return _mm74.apply(this,arguments)};  /* moving in, the wing, home life */
const _wo74=wingOfferThen;wingOfferThen=function(done){if(K74N())return done();return _wo74.apply(this,arguments)};  /* no wing of her own in his house */
const _vg74=vGiftShop;vGiftShop=function(){if(K74N())return k74Lock();return _vg74.apply(this,arguments)};
const _mallV74=mallV;mallV=function(){if(K74N())return k74Mall();return _mallV74.apply(this,arguments)};
/* the bed menu: her trailer, or a friend's couch; never his */
const _sl74=sleep;sleep=function(){try{if(K74N()&&S.pov!=='v'&&!S.done.bedChosen)return k74Bed(()=>_sl74())}catch(e){}return _sl74.apply(this,arguments)};
function k74Bed(cont){const o=[{t:'My trailer',sub:'home · the good lock, or the bad one',fn:()=>{S.bed='trailer';S.done.bedChosen=1;cont()}}];
 o.push({t:'Angel’s spare room',sub:frT('a')>=2?'+energy · face masks':'needs sister',dis:frT('a')<2,fn:()=>{S.bed='angel';S.done.bedChosen=1;fr('a',3);apply({energy:8});say([[AN,'Sleepover. I have sheet masks, a terrible rom-com, and a rule: nobody says his name in this flat.']],afterBed)}});
 o.push({t:'Ronin’s couch',sub:frT('r')>=2?'questionable · free breakfast':'needs partner in crime',dis:frT('r')<2,fn:()=>{S.bed='ronin';S.done.bedChosen=1;fr('r',3);say([[RN,'Couch is yours. Rifle stays in the hall. I don’t want you wakin’ up and shootin’ the Gameboy thinkin’ it’s Vee.']],afterBed)}});
 ask('hitmeuppp','Where are you sleeping tonight?',o)}
/* the house and the trailer: friendly props swapped */
(function(){
 const sp=(room,label,fn)=>{const R=ROOMS[room];if(!R||!R.spots)return;R.spots.filter(s=>s.label===label).forEach(s=>{const a=s.act;s.act=function(){if(K74N()){const r=fn();if(r!==false)return r}return a.apply(this,arguments)}})};
 sp('atrium','Sit on the couch',()=>{if(!(typeof vWhere==='function'&&vWhere()==='atrium'&&S.visitAs!=='v'))return false;say([['','You sit on his couch with your boots on it. A minute later V comes in with a book and sits at the other end, and puts a pistol on the cushion between you like a bookmark.'],
  K74MV('…u gonna read or shoot'),K74V('I have not decided. It is a long chapter.'),['','You last eleven minutes. He turns four pages. You leave.']])});
 sp('archive','Letter on the desk',()=>say([['','“If you are reading this, you are either a very good thief or someone I trust. I hope it is both. —V”'],
  K74MV('(neither. i’m the one u wrote in the ledger)'),['','You turn it over and write on the back, in eyeliner: “THIEF. NOT THE OTHER ONE.” Then you put it back exactly where it was.']]));
 sp('green','Sketchbook on the bench',()=>say([['','Pencil sketches of hounds, drawn lovingly and badly. Near the back there is a page of a trailer lot from above, with the exits marked in red, and a small figure on the step with a cereal box.'],
  K74MV('(he drew me. as a floor plan)'),['','You tear the page out and take it with you. That night you tape it to your fridge, because it is the most accurate drawing of your life anybody has done.']]));
 sp('trailer','Bills',()=>{if(S.visitAs!=='v')return false;say([['','A stack of envelopes. The top one is red: '+money(S.rent)+', and a note from the landlord in capitals.'],
  K74V('(She is behind. A woman behind on rent will take any contract. I will write that down under motive.)'),['','You leave the envelope where it was, square to the edge of the table, so that she will know you read it.']])});
 /* the atrium's first-visit line, and V's trailer visit */
 const en=(room,fn)=>{const R=ROOMS[room];if(!R)return;const o=R.enter;R.enter=function(){try{if(K74N()&&fn())return}catch(e){}return o?o.apply(this,arguments):undefined}};
 en('atrium',()=>{if(S.visitAs==='v'||S.pov==='v'||S.done.visitIntro)return false;S.done.visitIntro=1;save();say([K74MV('(his house. count the cameras. count the hounds. count the doors. don’t touch anything u can’t carry out)')]);return false});
 en('trailer',()=>{if(S.visitAs!=='v'||S.done.k74trV)return false;S.done.k74trV=1;save();say([['','Her trailer, from the inside. It smells of gun oil and cereal. There is a cactus on the windowsill in a pot with a face drawn on it, facing the door, like a guard.'],
  K74V('(Two exits, if one counts the window. She would count the window.)')]);return false});
 /* the sleepers: a near-attempt instead of a blanket */
 if(typeof TD!=='undefined'&&TD.maps){const sw=(map,id,fn)=>{const M=TD.maps[map];if(!M||!M.props)return;M.props.filter(p=>p.id===id).forEach(p=>{const a=p.act;p.act=function(){if(K74N())return fn();return a.apply(this,arguments)}})};
  sw('ewing','sl_v',()=>k74Sleeper('v'));sw('trailer','sl_m_tr',()=>k74Sleeper('m'));sw('ewing','sl_m_bd',()=>k74Sleeper('m'))}
 /* the mall and the wheel: forced encounters */
 if(ROOMS.mall){const n0=ROOMS.mall.npcs;ROOMS.mall.npcs=function(){const L=n0?n0.apply(this,arguments):[];if(!K74N())return L;return L.map(x=>x&&/is that (V|Misaki)\?/.test(x.label||'')?Object.assign({},x,{act:k74Mall}):x)}}
 if(ROOMS.wheel){const n1=ROOMS.wheel.npcs;ROOMS.wheel.npcs=function(){const L=n1?n1.apply(this,arguments):[];if(!K74N())return L;return L.map(x=>x&&/^Sit with (V|Misaki)$/.test(x.label||'')?Object.assign({},x,{label:k74H('V is in gondola seven','Misaki is in gondola seven'),act:k74Wheel}):x)}}
})();
/* kc59: the war foreshadowing stays; the two choices that assume friendship are swapped */
if(typeof W59B!=='undefined'){const r59=(id,fn)=>W59B.filter(b=>b.id===id).forEach(b=>{const r=b.run;b.run=function(done){if(K74N())return fn(done);return r.apply(this,arguments)}});
 r59('w59_v_ask',k74W59Ask);r59('w59_v_circle',k74W59Circle)}
/* kc56: V's trailer visit in Misaki's POV becomes a folder on the step */
if(typeof K56!=='undefined')K56.filter(x=>x.id==='k56_file').forEach(x=>{const r=x.run;x.run=function(done){if(K74N()&&S.pov!=='v')return k74K56File(done);return r.apply(this,arguments)}});
/* kc58's notebook topic and stair beats are gated through EVENTS/TXS above; kc66 is already off in the normal phase (kc73) */

/* ===================================== 3 · THE WAR MENU ===================================== */
function k74War(){const m=k74M();const L=(id,t,sub,fn,dis)=>({t,sub:(k74N(id)?'×'+k74N(id)+' · ':'')+sub,dis,fn:()=>{spend();S.done.k74act=1;save();go(cutBg('#08070c'));fn()}});
 ask(k74H('hitmeuppp','K9'),k74H('(rent first. then him. today: what)','(Her page is open. Today:)'),m?[
  L('surveil','Surveil him','the water tower, five in the morning',k74Surveil),
  L('case','Case his house','the back wall, the ivy, the hounds',k74Case),
  L('intercept','Intercept his mark','his list is your list now',k74Intercept),
  L('threat','Leave a threat','so he knows you could',k74Threat),
  {t:'Not today',fn:hub}]:[
  L('study','Study her','from a distance, writing it down',k74Study),
  L('file','File her collateral','the people who were standing in the wrong place',k74File),
  L('plan','Plan the kill',k74N('study')?'the ops table, two in the morning':'study her first',k74Plan,!k74N('study')),
  L('follow','Follow her home','half a street back, with the black hound',k74Follow),
  {t:'Not today',fn:hub}])}
const k74Cyc=(k,arr)=>arr[(k74N(k)-2)%arr.length];

/* ---------- Misaki ---------- */
function k74Surveil(){const n=k74Inc('surveil');
 if(n>1)return k74Say(k74Cyc('surveil',[
  [['','Six hours on the water tower. He changes nothing about his morning, except that today he walks the hounds on the far side of the wall, where the tower cannot see.'],K74MV('(he’s learning me back. good. i like a mark who studies)')],
  [['','Rain. The hounds go out anyway. He holds an umbrella over the old hound and none over himself, and comes back in soaked to the knees.'],K74MV('(note: he’s soft on the old one. use it)')],
  [['','At five there is a cup of coffee standing at the foot of the water-tower ladder, still hot, with a sticky note on the lid: “It is poisoned. —K9”.'],K74MV('(i drink it to find out. it isn’t. i hate him so much)')]]),hub);
 say([['','Five in the morning on the water tower behind his street, with the rifle across your knees and a flask of something that was coffee at midnight.'],
  ['','His house wakes up in order. A light in the kitchen at ten to five. The four hounds out of the side door at five exactly, two and two, and him behind them in a long coat with a mug. He walks them the whole length of the wall and back, talking to them the entire way, and you are too far off to hear a word.'],
  ['','At six the light moves up to the ops deck. At half past seven a black car comes for him, and he gets in on the side away from your tower, as if somebody had told him where you would be.'],
  K74MV('(he talks to the hounds like they’re people. he talks to people like they’re hounds)'),
  ['','At the gate he stops, turns round, and raises his mug to the water tower.']],
 ()=>ask('hitmeuppp',K74MV('(…fuck)')[1],[
  {t:'Put a round through the mug',sub:'he will know exactly how close',fn:()=>{S.f.e2lMug='shot';save();say([['','The mug goes to pieces in his hand. He looks at the handle, which is all he has left of it, and puts it in his coat pocket, and gets into the car.'],
   K74V('(text) That was a gift from Angel.'),K74MV('(text) tell her it was in the way of ur face'),[AN,'(text) misaki did you SHOOT MY MUG']],hub)}},
  {t:'Raise the flask back',sub:'let him wonder',fn:()=>{S.f.e2lMug='flask';save();say([['','You raise the flask. He nods once, like a man at a graveside, and gets into the car.'],
   K74MV('(i had the shot. he knew i had the shot. he lifted a MUG at it)')],hub)}}]))}
function k74Case(){const n=k74Inc('case');
 if(n>1)return k74Say(k74Cyc('case',[
  [['','The garage this time. The keypad door has four worn buttons. You write the four numbers on the inside of your wrist and do not try them.'],K74MV('(i want him to find them on my wrist one day. on the table. and know i could have)')],
  [['','The kennel run, from outside the wire. The old hound comes to the gate and lays his chin on the bottom bar and looks at you. You have meat in your pocket for exactly this, and you do not give it to him.'],K74MV('(not yet. if i feed him i can’t shoot him)')],
  [['','His roof. There is a deckchair up here with a blanket folded on it and an ashtray with no ash in it. You lie in the deckchair for ten minutes with the rifle on your chest and look at the same sky he looks at.'],K74MV('(it’s a good chair. i’m going to kill him in it)')]]),hub);
 say([['','His house, at eleven in the morning, while he is at a board meeting on the other side of the city. You come over the back wall where the ivy is, because the front has a camera on every brick.'],
  ['','You count. There are cameras on the yard, the kitchen and the hall, and none in the study. Two doors lead in from the garage and only one of them has a keypad. A back stair groans if you put your weight on the left. Four hounds lie on the lawn and watch you the entire time, and none of them gets up.'],
  K74MV('(why aren’t they getting up. why aren’t they GETTING UP)','(why aren’t they getting up)'),
  ['','In his bedroom the bed is made tight enough to bounce a coin on. On the nightstand there is a pistol, a glass of water, and a paperback with a receipt for a bookmark. You read the page he is on. It is about a man who waits eight years for a woman.'],
  K74MV('(gross)')],
 ()=>ask('hitmeuppp',K74MV('(on the way out)')[1],[
  {t:'Leave the side door open behind you',sub:'so he knows',fn:()=>{S.f.e2lCase='door';save();say([['','You leave the side door standing open a hand’s width. At ten past one your phone buzzes.'],
   K74V('(text) You left my door open. The black hound has eaten a cushion.'),K74MV('(text) good. i hope it was an expensive one')],hub)}},
  {t:'Leave it exactly as you found it',sub:'so he doesn’t',fn:()=>{S.f.e2lCase='clean';save();say([['','You put the paperback back at the right page, with the receipt at the right angle, and go out over the wall. That night he texts you a photograph of the ivy, where three leaves are bent.'],
   K74V('(text) A size five boot. You were in my house for nineteen minutes.'),K74MV('(text) twenty two. ur cameras are slow')],hub)}}]))}
function k74Intercept(){const n=k74Inc('intercept');
 if(n>1){apply({yen:15000});return k74Say(k74Cyc('intercept',[
  [['','His next mark is a councilman’s nephew who drives drunk on purpose. You put him through his own windscreen at a red light with one round, and by the time the long black car pulls up beside the wreck you are three streets away eating noodles.'],
   K74V('(server) That is two.'),K74MV('(server) keeping count, grandpa?'),K74V('(server) I keep count of everything you do.'),['','(+'+money(15000)+', from the nephew’s glovebox.)']],
  [['','A man on his list who beats his wife in front of the neighbours. You get there first. She is standing in the kitchen doorway when you do it, and she screams, and you leave her screaming and do not look back at her.'],
   K74MV('(not my problem. nobody paid. still not my problem)'),['','That night his message is a single photograph of the kitchen doorframe, with her handprint on it in her husband’s blood.'],
   K74MV('(text) so?'),K74V('(text) You frightened her more than he ever did. She will see you in that doorway for the rest of her life.'),['','(+'+money(15000)+', from his wallet.)']]]),hub)}
 say([['','Angel lets it slip at brunch that K9 has a man on his list who sells fighting dogs out of the back of a veterinary clinic on the ring road. Nobody is paying you for him. On Wednesday you go anyway, because he is on V’s list.'],
  ['','You take the vet in his own car park at six in the evening, one round, and take his wallet: two hundred dollars and a coupon for wings. His van is parked beside him, with the engine still ticking. Something inside it is breathing.']],
 ()=>ask('hitmeuppp',K74MV('(the van)')[1],[
  {t:'Open the van',sub:'look at what’s in it',fn:()=>{S.f.e2lVan='open';apply({yen:20000});save();say([['','Six dogs in crates, the kind with cut ears, two of them too still. They look at you with no hope in them at all. You have seen that look in a mirror.'],
   K74MV('(server) @K9 ur mark is dead. there’s 6 dogs in his van. come get them before i change my mind'),K74V('(server) Stay with them.'),
   ['','You do not stay. You leave the van doors open a crack for the air and walk away with your hands in your pockets. The long black car passes you on the ring road ten minutes later, going very fast.'],
   K74V('(text) All six are at the house. Two will live. You looked.'),K74MV('(text) don’t make it a thing')],hub)}},
  {t:'Take the wallet and go',sub:'not your problem',fn:()=>{S.f.e2lVan='shut';apply({yen:20000});save();say([['','You take the wallet and go. It is not your problem what is in a van.'],
   K74V('(server) You took my mark.'),K74MV('(server) u were slow. took his wallet too. 200 bucks and a coupon for wings'),
   K74V('(server) There were six dogs in his van. You left the doors shut.'),K74MV('(server) …i didn’t look in the van'),K74V('(server) No. You never look.')],hub)}}]))}
function k74Threat(){const n=k74Inc('threat');
 if(n>1)return k74Say(k74Cyc('threat',[
  [['','A single bullet, stood on its end on his doormat, so that it falls over when he opens the door.'],K74V('(text) It fell over.'),K74MV('(text) yeah. it does that')],
  [['','You chalk a target on his garage door at about the height of his heart: three rings and a bull. By the evening somebody has written a score in each ring in fountain pen, and the bull says “Unlikely.”'],K74MV('(i’m going to kill him so hard)')]]),hub);
 S.f.e2lPhotos=1;save();
 say([['','You buy a disposable camera at the corner store and spend the whole roll on him: him at his gate, him getting into the car, him at a crossing with the grey hound, him at the window of the foundation tower forty floors up, from a roof across the street, which took four hours.'],
  ['','You have them developed at the one-hour place and post them through his letterbox in an envelope with a crosshair drawn on the front.'],
  K74MV('(twenty-four pictures. twenty-four times i didn’t)'),
  K74V('(server) I have your photographs.'),K74MV('(server) keep them. something to remember me by'),
  K74V('(server) There are twenty-four. The roll takes twenty-five. Where is the last one?'),K74MV('(server) …'),K74V('(server) Misaki.'),
  K74MV('(server) it’s of the grey one. she was asleep in the sun on ur lawn. it came out nice. ur not getting it'),[RN,'(server) jesus christ']],hub)}

/* ---------- V ---------- */
function k74Study(){const n=k74Inc('study');
 if(n>1)return k74Say(k74Cyc('study',[
  [['','Tonight she does a job on a man who sells fire insurance to the people he sets fire to. You watch it through your own scope from two roofs back. She makes the shot through a gap in a blind the width of a hand, at four hundred metres, in wind.'],
   K74V('(I would like to have seen that from a better seat.)'),['','You write down the wind and the distance. Under them you write the word that has been on her page all week.']],
  [['','She knows you are there. She waves at your car from the laundromat with a sock.'],K74V('(She is laughing at me.)'),['','You let her. You were under her truck an hour ago, and you know the make of her brakes.']],
  [['','At four in the morning you find where she keeps the spare key: inside the cactus pot, under the soil. You put it back exactly, with the soil pressed down.'],K74V('(She would come back into a fire for that cactus. I will write it down.)')]]),hub);
 say([['','You study her the way you study anyone who is going to end up on the steel table: from a distance, for a week, writing it down.'],
  ['','She sleeps until noon and works at night, and eats cereal out of the box at two in the morning with the trailer door open. She talks to her cactus. In every room she walks into she counts the exits under her breath, and if there are fewer than two she does not sit down.'],
  ['','She is the best shot you have ever watched, and she has no law at all: she took a contract on a man for nine hundred dollars and did not ask what he had done.'],
  K74V('(Wanton. I have written that word four times on this page. I will not need to write it a fifth.)')],
 ()=>ask('K9','(The cactus.)',[
  {t:'Write the cactus down',sub:'everything is useful',fn:()=>{S.f.e2lCactus='in';save();say([['','You write: TALKS TO A CACTUS. A person who talks to a plant will come back for it. You underline “come back”.']],hub)}},
  {t:'Leave the cactus out of it',sub:'you do not know why',fn:()=>{S.f.e2lCactus='out';save();say([['','You leave the cactus out. You put it down to tiredness, and you sleep your three and a half hours, and in the morning the page still does not have it on.']],hub)}}]))}
function k74File(){const n=k74Inc('file');S.f.e2lFile=n;save();
 if(n>2)return k74Say([['','You add the driver from the gala, who had a wife and a boat he was paying off. You add a man you are not sure of, and then you cross him out, because you are not sure, and you do not cross things out.'],
  K74V('(One crossing-out, on her page. I have looked at it for some time.)')],hub);
 if(n===2)return k74Say([['','The man she shot on a Tuesday had a daughter, who is eleven now. You pay her school fees through a trust with no name on it. Today is the prize-giving, and you sit at the back.'],
  ['','The girl wins the maths prize. She goes up for it on her own, and comes back, and holds the little cup in both hands for the rest of the afternoon.'],
  K74V('(Misaki came third at eleven, at regionals, and pawned the cup for two dinners. Angel told the server. I do not know why I am thinking about it now, in this hall.)'),
  ['','In the car you write the girl’s prize under the rest. The pen goes through the page.']],hub);
 k74Say([['','The doorman she shot on the hotel steps had a wife. She lives above a launderette on the east side and takes in mending. You climb her stairs with an envelope.'],
  ['','She does not know who you are. She thinks you are from the union, and you let her think it. She makes you tea in a cup with a chip in it and tells you he was only on the steps because the regular man was off sick. He had swapped the shift to pay for her teeth.'],
  K74V('(Collateral is the word the contract uses. It means a man who swapped a shift.)'),
  ['','You leave the envelope under the sugar bowl. In the car you open the ledger to her page and write under the oath, in small capitals: THE DOORMAN SWAPPED A SHIFT.']],hub)}
function k74Plan(){const n=k74Inc('plan');
 if(n>1)return k74Say(k74Cyc('plan',[
  [['','You go over the plan again on the ops table. It is still a very good plan. You change the date at the top, again, to next week, and put it back in the drawer under the ledger.']],
  [['','The old hound comes up to the ops deck at three in the morning, which he never does, and lies down on the plan.'],K74V('Off.'),['','He does not get off. You leave him there and go to bed.']]]),hub);
 say([['','The ops deck at two in the morning. You lay her out on the table the way you lay out anybody: the trailer plan from the council, the lot from the air, her week in columns, her truck, her rifle, her habits.'],
  ['','There are three ways to do it. One is quick and from a distance, while she eats cereal at two in the morning with the door open, and she would never know. One is at the laundromat, close, where machine six eats socks. The third is slow, and it happens in the cold room under the house, and it is what your law says she has earned.'],
  K74V('(She does not deserve quick. Quick is for things that did not choose.)')],
 ()=>ask('K9','(The top of the page.)',[
  {t:'Write SLOW',sub:'what the law says',fn:()=>{S.f.e2lPlan='slow';save();say([['','You write SLOW at the top of the page and underline it, and put the page in the ledger behind her name. The plan is very good.'],
   ['','You go to bed at four and lie awake until six thinking about the cold room, and about which of her habits would be the last to go.']],hub)}},
  {t:'Write QUICK, and do not ask yourself why',sub:'what your hand writes',fn:()=>{S.f.e2lPlan='quick';save();say([['','You write QUICK at the top and underline it, and sit for some time looking at the word, which is not the word your law gives you for her.'],
   ['','Then you put the pen down and go and stand in the kennel with the hounds until it is light.']],hub)}}]))}
function k74Follow(){const n=k74Inc('follow');
 if(n>1)return k74Say(k74Cyc('follow',[
  [['','She takes you to the harbour this time, and sits on a bollard eating chips, and throws one to the black hound. It catches it, and then looks at you as though you have caught it doing something.'],K74V('(I will be speaking to him.)')],
  [['','She loses you in the market under the flyover, which nobody has managed in eleven years. When you get home there is a text.'],K74MV('(text) where’d u go grandpa'),K74V('(text) Where did you go?'),K74MV('(text) into a bin. ur dog walked right past me. hi dog')]]),hub);
 say([['','You pick her up after a job at the station and follow her on foot, half a street back, with the black hound on a short lead.'],
  ['','She knows inside two minutes, and instead of running she gives you a tour: the noodle stand, the laundromat, a church where she lights a candle without kneeling, the arcade, where she plays the claw machine once and loses, a bridge, another bridge, and the bowling alley, where she buys a pair of bowling shoes in your size and leaves them on the counter.'],
  K74MV('(text) ur feet are huge. it’s like being followed by a boat'),K74V('(text) You lit a candle. For whom?'),K74MV('(text) for me. in advance. somebody should'),
  ['','At the gate of the trailer lot she turns round under the light and stands there with her hands in her hoodie pocket, one of them on a pistol, until you go.']],
 ()=>ask('K9','(She is waiting for you to go.)',[
  {t:'Go',fn:()=>{S.f.e2lFollow='went';save();say([['','You go. The black hound looks back at her the whole way to the car.']],hub)}},
  {t:'Stand there until she goes in',fn:()=>{S.f.e2lFollow='waited';save();say([['','You stand there. She stands there. At ten past three the black hound lies down on the pavement out of boredom, and she laughs once, a short ugly sound, and goes inside, and locks the door with both bolts loudly enough for you to hear.']],hub)}}]))}

/* ===================================== 4 · TALK (forced encounters) ===================================== */
/* w==='v': Misaki is talking to V (his house). w==='m': V is talking to Misaki (her trailer). Three things to say a day. */
function k74Talk(w,where){const tk='k74tok_'+w;if(S.done[tk]===undefined)S.done[tk]=3;const me=w==='v'?'hitmeuppp':'K9';
 if(S.done[tk]<=0)return say([w==='v'?K74V('You have said what you came to say. The door is behind you. The hounds will see you to it.'):K74MV('ur done. get out of my trailer before i decide something')]);
 const T=(w==='v'?K74T_V:K74T_M).filter(t=>!t.show||t.show());
 const menu=()=>ask(me,`<span class="hint">${S.done[tk]} things left to say · ${w==='v'?'V':'Misaki'} is armed</span>`,T.map(t=>({t:t.t,sub:S.talks&&S.talks['k74_'+t.id]?'said ×'+S.talks['k74_'+t.id]:'✦',fn:()=>{S.done[tk]--;S.talks=S.talks||{};S.talks['k74_'+t.id]=(S.talks['k74_'+t.id]||0)+1;save();k74Say(t.L(),()=>{if(t.after)t.after();if(S.done[tk]>0)menu()})}})).concat([{t:'Leave',fn:()=>{}}]));
 if(S.done['k74open_'+w+where])return menu();S.done['k74open_'+w+where]=1;save();
 say([w==='v'?K74V(pk(['You are in my house. The hounds let you in. I will be speaking to them.','Sit where I can see your hands. Or stand. Either way, I can see your hands.','You came in through the ivy again. It is a listed wall.'])):K74MV(pk(['get out of my trailer','u have three seconds','touch the cactus and i end u']))],menu)}
const K74T_V=[
 {id:'house',t:'“nice house. who’d u kill for it”',L:()=>[K74V('My father, by outliving him. The money was his. I have spent eleven years giving it back to the people he took it from, and it does not run out.'),K74MV('boo hoo. rich man’s money won’t leave him alone'),K74V('No. It will not.')]},
 {id:'hale',t:'“why don’t u give me to hale”',L:()=>[K74V('Inspector Hale would give you a trial. Trials are quick, and then you would be fed in a cell for thirty years at the city’s expense. The doorman did not get thirty years.'),K74MV('the doorman was in the way'),K74V('He was at work.')]},
 {id:'feed',t:'“what do u feed them. the hounds”',L:()=>[K74V('Whatever I do not waste.'),K74MV('that’s disgusting'),K74V('You are standing in my kitchen eating my ham.'),K74MV('…it’s good ham')]},
 {id:'count',t:'“how many have u killed. ballpark”',L:()=>[K74V('Everyone in my ledger who has a total. I do not keep a ballpark. I keep the names.'),K74MV('i don’t learn names. u learn names and they follow u home'),K74V('Then I will follow you home on their behalf.')]},
 {id:'knife',t:'Put your hand on the knife',L:()=>[['','You put your hand on the knife at the small of your back. He lays his hand flat on the counter, very slowly, next to his teacup, and leaves it there with the fingers spread.'],
  K74V('If you are going to do it in my kitchen, do it before the kettle boils. I would like my tea.'),['','The kettle boils and you still have not done it. He makes one cup and drinks it looking at you.']],after:()=>k74Tally('m')},
 {id:'nice',t:'“say one nice thing about me. i dare u”',show:()=>k74Talked()>=3||k73Done('e2l_lift'),L:()=>[K74V('You are punctual. You have been on time for every attempt on my life.'),K74MV('ur ugly when ur honest'),K74V('I am told I am ugly most of the time.'),K74MV('…not MOST of the time')],after:()=>apply({aff:1})},
 {id:'shelter',t:'“ur shelter on the north side has ur name on the door”',show:()=>!S.f.e2lShelter,L:()=>k74ShelterL(),after:()=>{S.f.e2lShelter=1;save()}}];
const K74T_M=[
 {id:'doorman',t:'“How much was the doorman worth?”',L:()=>[K74MV('he wasn’t on the invoice. so nothing'),K74V('His name was on a rota. He swapped a shift to pay for his wife’s teeth.'),K74MV('…why the fuck do u know that'),K74V('Because one of us has to.')]},
 {id:'found',t:'“Why do you hate the foundation?”',show:()=>!S.f.e2lShelter,L:()=>k74ShelterL(),after:()=>{S.f.e2lShelter=1;save()}},
 {id:'lock',t:'“Your lock is still poor.”',L:()=>[K74MV('come and try it'),K74V('I have. Twice this week. I did not come in.'),K74MV('that’s so much creepier than coming in')]},
 {id:'money',t:'“What do you spend it on?”',L:()=>[K74MV('rent. a scope. cereal. i’m not buying a WING for a HOSPITAL so they put my name on it'),K74V('Nobody would put your name on anything.'),K74MV('u will. in ur book. with a line through it')]},
 {id:'shoot',t:'“Who taught you to shoot?”',L:()=>[K74MV('a forum. and wind. and being hungry. u learn fast when the other option is not eating'),K74V('(You write that down later, and then tear the page out, because it is not useful.)')]},
 {id:'coat',t:'Put your hand inside your coat',L:()=>[['','You put your hand inside your coat. She already has the pistol out under the table, and you hear the safety come off.'],K74MV('go on'),K74V('After you.'),
  ['','Neither of you moves for the length of an advert on the CRT. Then the cactus on the windowsill tips over in a draught, and you both fire at it.'],
  ['','The pot is in pieces. The cactus lies on the lino with two new holes in it, still green, still upright in a fist of soil.'],K74MV('U SHOT PRICKLES'),K74V('We both shot Prickles.'),K74MV('get. out.')],after:()=>{S.f.e2lPrickles=1;k74Tally('v');save()}},
 {id:'nicem',t:'“Say one true thing about me.”',show:()=>k74Talked()>=3||k73Done('e2l_lift'),L:()=>[K74MV('ur hounds like me better than u'),K74V('That is true.'),K74MV('one more. free of charge. u have a nice voice when ur threatening people'),K74V('Thank you. I use it a great deal.')],after:()=>apply({aff:1})}];
const k74Talked=()=>Object.keys(S.talks||{}).filter(k=>/^k74_/.test(k)).reduce((a,k)=>a+S.talks[k],0);
function k74ShelterL(){return [K74MV('ur shelter on the north side. brass plate on the door. they turned me away at fourteen because i didn’t have a birth certificate. it was snowing. i slept in the bus depot. ur name was on the door'),
 K74V('The rule about papers is mine. I made it so that nobody could be taken out of a bed by a man who said he was family.'),
 K74MV('congrats. it worked. nobody took me anywhere'),
 ['',k74M()?'He does not say anything for a while. It is the first time you have seen him have nothing ready.':'You have nothing to say to that. You have never once thought about who the rule kept out in the snow.']]}

/* ===================================== 5 · SET PIECES (spliced into kc73's order) ===================================== */
function k74Lift(){go(cutBg('#06060a'));k73Mark('e2l_lift');const m=k74M();
 const L=(m?[
  ['','The old customs house on the river at two in the morning: eleven floors of empty offices and, on the ninth, a man who sells other people’s papers. A passport, a birth certificate, a whole life for three thousand dollars, and the life back for six if you try to leave him.'],
  ['','You have a contract on him for twelve hundred. You would have done him for less. You never had a birth certificate either.'],
  ['','The stairs are alarmed, so you take the service lift, the old kind with a folding gate. At the third floor it stops, the gate opens, and V gets in, in his long coat, with a hound lead wrapped round his fist and no hound on the end of it.']]:[
  ['','The old customs house on the river at two in the morning. You own it. On the ninth floor a tenant sells the papers of people in your shelters to men who want somebody nobody will look for.'],
  ['','You take the service lift because the stairs are alarmed. At the third floor you open the gate, and Misaki is standing in the cage in her hoodie with a rifle case on her back, and she looks at you as though you have walked into her bathroom.']]).concat([
  K74V('Ninth floor.'),K74MV('get out of my lift'),K74V('It is not your lift. I own the building.'),K74MV('of COURSE u own the building'),
  ['','Between the sixth floor and the seventh the lift stops, and the light goes out. In the dark '+(m?'you have your pistol under his chin, and he has something cold and very sharp against your ribs, just under the left arm, where it would go in without stopping.':'she has her pistol under your chin, and you have the scalpel against her ribs, under the left arm, where it would go in without stopping.')],
  K74V('The night porter cuts the power at two to save on the bill. It comes back at a quarter to three. I had meant to be on the ninth floor by then.'),
  K74MV('u cheap fuck'),K74V('It is my building. I like it run properly.'),
  ['','Forty minutes in a box a metre and a half wide. '+(m?'You can feel him breathe. You can feel the muzzle move against his throat every time he swallows.':'You can feel her breathe. You can feel the muzzle move against your throat every time you swallow.')],
  K74MV('the guy upstairs. what’s he in ur book for'),K74V('He sells the papers of people in my shelters.'),
  K74MV('mine’s twelve hundred. somebody he cheated'),K74V('Then we want the same man for different reasons, and one of the reasons is money.'),
  K74MV('money’s a reason. money’s the BEST reason. it doesn’t lie to u'),K74V('It does not care who else is standing on the step.'),
  ['','Above you a door bangs, footsteps cross the floor, and a car starts in the yard. The man from the ninth floor is going home. Neither of you can move to stop him without the other one moving too.'],
  K74MV('(that was my rent)','(that was my rent. that was my RENT)'),
  ['','At a quarter to three the light comes back, very bright.']]);
 const cut1=()=>{S.f.e2lLift='m';k74Tally('m');save();say([['',m?'You turn your wrist as the light flares and open his jaw along the bone, a cut as long as a finger, before he can close the gap. He does not make a sound. The scalpel at your ribs goes in the width of a fingernail and stops.':'She turns her wrist as the light flares and opens your jaw along the bone, a cut as long as a finger. You do not make a sound. The scalpel goes into her the width of a fingernail and stops there, because you stop it.'],
   K74V('That is one.'),K74MV('one what'),K74V('One of yours. I am keeping count.'),
   ['',m?'The gate opens at the seventh floor. He gets out first, bleeding into his collar, and holds the gate open for you, and you go down in it alone.':'The gate opens at the seventh floor. You get out first, bleeding into your collar, and hold the gate for her, and she goes down in it alone.']],hub)};
 const take=()=>{S.f.e2lLift='v';k74Tally('v');save();say([['',m?'The light flares. His hand closes on your pistol and turns it out of your grip before you can blink, and the scalpel never moves from your ribs.':'The light flares. Your hand closes on the pistol and turns it out of her grip before she can blink, and the scalpel never moves from her ribs. She goes very still.'],
   K74V('That is one.'),K74MV('one what'),K74V('One of mine. I am keeping count.'),
   ['',m?'At the seventh floor he takes the magazine out, and the round from the chamber, and hands you the empty pistol through the gate as it closes.':'At the seventh floor you take the magazine out, and the round from the chamber, and hand her the empty pistol through the gate as it closes.'],
   K74MV('ur dead. ur SO dead')],hub)};
 const hold=()=>{S.f.e2lLift='held';save();say([['','Nobody moves. The gate opens at the seventh floor and you back out of the lift together, very slowly, with your hands where they were, and walk to opposite ends of the corridor.'],
   K74MV('next time i take the stairs'),K74V('The stairs are alarmed.'),K74MV('GOOD')],hub)};
 say(L,()=>ask(K73Who(),'(The light.)',m?[{t:'Cut him when the light comes on',sub:'first blood',fn:cut1},{t:'Hold still until the gate opens',fn:hold}]
  :[{t:'Take her pistol when the light comes on',sub:'first blood is not the only kind',fn:take},{t:'Hold still until the gate opens',fn:hold}]))}

function k74Kennel(){go(cutBg('#08080a'));k73Mark('e2l_kennel');const m=k74M();
 const L=(m?[
  ['','Three in the morning. You come over his back wall into the kennel run with the rifle on a sling and a piece of the hounds’ meat in your pocket, from the time you cased his kitchen.'],
  ['','The plan is ugly and you know it is ugly. You put the rifle on the hounds and wait for the security light to wake him, and when he comes down for them you take him in the doorway, in his own light.'],
  ['','The four of them stand up in the straw and look at you. None of them barks. The old hound walks over stiffly, favouring a back leg, and puts his chin on the bottom bar of the gate a foot from the muzzle.'],
  K74MV('(one: he comes down. two: i take the shot. three: i don’t touch the hounds. three: i don’t touch the hounds)'),
  ['','The security light comes on. The side door opens. V comes down the kennel steps in his shirtsleeves with a pistol at his side, and stops when he sees where the rifle is pointing.']]:[
  ['','Three in the morning. Camera six, the kennel run: a small figure in a hoodie in the straw with a rifle, and four hounds on their feet looking at her.'],
  ['','You are on the steps in your shirtsleeves with a pistol before you have finished waking up. The rifle is pointed at the hounds, and away from the door.'],
  K74V('(She means to make me come down for them, and take me in the doorway.)'),
  ['','You come down anyway.']]).concat([
  K74V('Put it on me.'),K74MV('make me'),K74V('They have not done anything to you, Misaki. Put it on me.'),
  ['',m?'His voice does something on “they”. You have never heard it do anything before.':'Your voice does something on “they”. She hears it. You hear her hear it.']]);
 const fed=()=>{S.f.e2lKennel='fed';S.f.e2lHound=1;save();say([['','You take your left hand off the rifle, slowly, and push the meat through the bars. The old hound takes it from your fingers without touching your skin.'],
   ['','When you look up, V has lowered the pistol by about an inch. You put the rifle back on him, and he lets you, and you walk backwards out of the run and over the wall with it on him the whole way.'],
   K74V('(text) He liked you.'),K74MV('(text) he has bad taste. he likes u')],hub)};
 const rifle=()=>{S.f.e2lKennel='rifle';k74Tally('m');save();say([['','You keep it on the hounds. He looks at you for a long time. Then he crouches, puts the pistol on the concrete, slides it away with two fingers, and kneels in the straw between your rifle and the hounds.'],
   K74V('Now me.'),
   ['','You find that you cannot do it, and you have no idea why. You back out of the run with the rifle on him and go over the wall, and you are sick in the alley behind his house, where the hounds will not hear it.']],hub)};
 const stay=()=>{S.f.e2lKennel='stay';S.f.e2lHound=1;save();say([['','You say it once. They stay, except the old hound, who has never in his life done what he was told when he could get away with it. He limps to the gate and puts his chin on the bottom bar a foot from her muzzle.'],
   ['','She looks at him for a long time. Then she takes something out of her pocket with her left hand and pushes it through the bars, and he takes it from her without touching her skin.'],
   ['','When she looks up you have lowered the pistol by an inch. She puts the rifle back on you, and you let her, and she walks backwards out of the run and over the wall.'],
   K74MV('(text) he has bad taste. he likes u')],hub)};
 const set=()=>{S.f.e2lKennel='set';k74Tally('v');save();say([['','You say the word. The black hound goes for the gate and stops a foot short of it, and looks back at you. The other three do not move at all.'],
   ['','They have never once refused you. She sees it. You see her see it.'],
   K74MV('…even ur hounds think ur full of shit'),
   ['','She backs out of the run with the rifle on you and goes over the wall. In the morning the old hound will not eat. He lies by the gate all day, where she stood.']],hub)};
 say(L,()=>ask(K73Who(),m?'(The old hound is still at the gate.)':'(Four hounds. One rifle.)',m?[
  {t:'Feed the old hound the meat in your pocket',fn:fed},{t:'Keep the rifle on the hounds until he puts the pistol down',fn:rifle}]:[
  {t:'Tell the hounds to stay',fn:stay},{t:'Set them on her',fn:set}]))}

function k74Dinner(){go(cutBg('#0e0a0c'));k73Mark('e2l_dinner');const m=k74M();
 const L=[['','Angel’s studio, Sunday night. She has cleared the set and put a tablecloth over the makeup table and lit candles, and she is wearing the face she wears for funerals.'],
  [AN,'sit. both of you. opposite ends. weapons in the bowl'],
  ['','There is a salad bowl in the middle of the table. Ronin puts his crowbar in it first, to show willing. '+(m?'You put in a pistol, a knife and a second pistol. V puts in a knife.':'Misaki puts in a pistol, a knife and a second pistol. You put in a knife.')],
  [AN,'all of it, V'],
  ['',m?'V takes a second knife out of his sleeve and a garrotte out of his collar and lays them in the salad.':'You take the second knife out of your sleeve and the garrotte out of your collar, and lay them in the salad.'],
  [RN,'Jesus. Vee. In your COLLAR'],
  [AN,'ok. good. we’re eating. nobody kills anybody at my table. ronin, pour'],
  ['','Ronin pours. Angel talks about her brand deal for twenty minutes without stopping for breath, because if she stops somebody else will start. Under the table '+(m?'your boot is braced against his chair leg, and his is braced against yours.':'her boot is braced against your chair leg, and yours against hers.')]];
 const end=[[AN,'i can’t do this. i can’t sleep. ronin is sleeping in his truck outside V’s gate. one of you is going to be dead by christmas and i am going to have to choose a dress'],
  [RN,'Black, princess. You always look good in black.'],[AN,'that’s not FUNNY']];
 const glass=()=>{S.f.e2lDinner='glass';k74Tally('m');save();say([['','You tip it in. Your hand is back on your fork before he turns round.'],
   ['','Then Ronin, reaching over to steal V’s bread roll, knocks your glass into V’s, swears, sets them both upright, and hands V yours.'],['','You watch Ronin drink.'],
   ['','He is on Angel’s bathroom floor for an hour. You hold his head. V holds a wet towel to the back of his neck and does not look at you once. Angel stands in the doorway with her shotgun broken over her arm and her mascara all down her face.'],
   [AN,'at my table. at MY TABLE'],[RN,'(from the floor) ’s fine. i’m fine. i’m gonna be sick on your rug, angel. that one’s on her'],
   K74V('(to you, very low) That was meant for me.'),K74MV('(very low) yeah'),K74V('Thank you for the honesty.')].concat(end),hub)};
 const clean=()=>{S.f.e2lDinner='clean';save();say([['','You leave it. You watch his glass all through dessert instead, and he watches you watch it.'],
   K74V('Did you?'),K74MV('no'),K74V('Then I will drink it.'),['','He drinks it in one go, looking at you over the rim. Angel puts her face in her hands.'],
   K74MV('i would never do it at angel’s table. i’d do it somewhere stupid'),K74V('I know. You have told me where. A car park.')].concat(end),hub)};
 const drank=()=>{S.f.e2lDinner='drank';save();say([['','You drink it in one, looking at her over the rim. She goes white, and then red, and then she throws her fork at you.'],
   K74MV('u DRANK it. u fucking DRANK it'),K74V('Was there something in it?'),K74MV('…no'),K74V('Then I do not know what you are upset about.'),
   ['','There was nothing in it. You find that out in the car an hour later, when you are still alive, and the relief makes you so angry that you drive the long way home.']].concat(end),hub)};
 const fern=()=>{S.f.e2lDinner='fern';k74Tally('v');save();say([['','You wait until Angel is laughing at something and tip the glass into the fern on the windowsill behind you. Misaki watches you do it and says nothing at all.'],
   ['','By the morning the fern is brown to the roots. Angel sends a photograph of it to the server without a caption.'],
   [AN,'(server) 🪴'],[RN,'(server) rip'],K74MV('(server) it was a bad fern'),K74V('(server) It was a very good fern.')].concat(end),hub)};
 say(L.concat([['',m?'When Angel gets up for the bread, V turns to answer Ronin. His glass is by your hand. You have a paper fold tucked in your bra that you bought from a man at the station: enough to make a big man very ill for a night and a small one dead.':'When Angel gets up for the bread you turn to answer Ronin, and at the edge of your eye her hand passes over your glass, and is back on her fork when you turn round.']]),
  ()=>ask(K73Who(),m?'(His glass.)':'(Your glass.)',m?[{t:'Tip it in',sub:'he is a big man',fn:glass},{t:'Leave his glass alone',sub:'not at Angel’s table',fn:clean}]:[{t:'Drink it, looking at her',fn:drank},{t:'Pour it into Angel’s fern',fn:fern}]))}

/* splice into kc73's order: eye → lift → kennel → sab → dinner → truce */
(function(){const at=id=>K73B.findIndex(b=>b.id===id);
 K73B.splice(at('e2l_sab'),0,
  {id:'e2l_lift',t:()=>k74H('The customs house, two in the morning','The customs house, two in the morning'),sub:()=>'costs time · the war · the service lift',when:()=>S.phase==='normal'&&k73Done('e2l_eye')&&k73Fresh(),run:k74Lift},
  {id:'e2l_kennel',t:()=>k74H('His kennel, at three','The kennel run, at three'),sub:()=>'costs time · the war · the hounds',when:()=>S.phase==='normal'&&k73Done('e2l_lift')&&k73Fresh(),run:k74Kennel});
 K73B.splice(at('e2l_truce'),0,
  {id:'e2l_dinner',t:()=>'Angel’s table, Sunday',sub:()=>'costs time · the war · weapons in the salad bowl',when:()=>S.phase==='normal'&&k73Done('e2l_sab')&&k73Fresh(),run:k74Dinner})})();

/* ===================================== 6 · MORNINGS ===================================== */
const K74MORN=[
 {id:'e2l74_ticket',pov:'m',when:()=>S.day>=2,run:done=>say([['','There is a parking ticket under your wiper. It is a real one, from the council, for the bus lane. Somebody has written on the back of it in fountain pen.'],
  ['','“Your truck: blue, a dent in the tailgate, the passenger door opened with a coat hanger. You park it on the same three streets and leave the keys on the front tyre. —K9”'],
  K74MV('(he’s telling me he could have. he could have)')],()=>ask('hitmeuppp',K74MV('(the truck)')[1],[
  {t:'Move the truck every night from now on',sub:'−energy',fn:()=>{S.f.e2lTruck='moved';apply({energy:-10});save();say([K74MV('(new street every night. new tyre for the keys. he can count those too)')],done)}},
  {t:'Leave it where it is. Let him come',fn:()=>{S.f.e2lTruck='stays';save();say([['','You leave the keys on the front tyre. You sleep in the cab that night with the rifle across your lap, waiting for him to come for them. He does not.']],done)}}]))},
 {id:'e2l74_hale_m',pov:'m',when:()=>S.day>=3,run:done=>say([['','A knock at eight in the morning. A man in a wet raincoat with a cheap coffee.'],
  ['Hale','Inspector Hale. A man in a long coat with large dogs has been seen near this lot at night. I wondered if he’d been bothering you, miss.']],()=>ask('hitmeuppp',K74MV('(he’s offering)')[1],[
  {t:'Give Hale the car',sub:'make, plate, and where it parks',fn:()=>{S.f.e2lHale='m';save();say([['','You give him the make of the long black car, the first four letters of the plate, and the time it parks under the bridge on Thursdays. Hale writes it all down in a little book.'],
   ['Hale','That’s very thorough.'],K74MV('i’m a very thorough citizen'),
   ['','On Thursday the long black car is not under the bridge. A police car is parked there instead, very neatly, with every window put in.'],
   K74V('(text) You spoke to Inspector Hale.'),K74MV('(text) i talk to lots of people'),K74V('(text) He is a decent man. Do not use him for this again.')],done)}},
  {t:'Tell him you’ve seen nothing',sub:'he’s yours',fn:()=>{S.f.e2lHale='mno';save();say([K74MV('i see nothing. i’m very short'),['','Hale looks at you, and at the rifle case behind the door, and puts his notebook away.'],['Hale','Course you didn’t.'],
   K74MV('(nobody else gets him. not the cops. not anybody)')],done)}}]))},
 {id:'e2l74_lock',pov:'m',when:()=>k73Done('e2l_eye'),run:done=>say([['','On the trailer step there is a box with a ribbon round it. Inside is a deadbolt, a good one, the kind they put on bank doors, with the screws and the right drill bit taped to the lid.'],
  ['','The card says: “Difficult, please. —K9”.']],()=>ask('hitmeuppp',K74MV('(a present. from HIM)')[1],[
  {t:'Fit it',fn:()=>{S.f.e2lLock='fit';save();say([['','It takes an hour. It is the best lock you have ever owned. You lie in bed that night listening to it be good.'],K74MV('(i’m going to kill him behind a door he paid for. that’s fair. that’s eye for an eye or whatever)')],done)}},
  {t:'Throw it in the canal',fn:()=>{S.f.e2lLock='canal';save();say([['','It goes into the canal with a satisfying sound. You keep the old lock, the one that opens with a hairpin, and sit up with the rifle every night that week.']],done)}}]))},
 {id:'e2l74_dot',pov:'v',when:()=>S.day>=2,run:done=>say([['','Breakfast. You are halfway down your tea when a small red dot appears on the tablecloth beside your saucer, walks up the sugar bowl and across the toast, and stops on your hand.'],
  ['','It is coming through the kitchen window from the water tower, a kilometre off. The hounds have seen it. The old hound puts his chin on your knee.'],
  K74V('(A laser sight is for amateurs and for showing off. She is not an amateur.)')],()=>ask('K9','(The dot is on your wrist.)',[
  {t:'Finish your tea',fn:()=>{S.f.e2lDot='tea';save();say([['','You finish your tea, and the toast with the dot on your wrist. Then you fold the paper, stand up, and put your face in the window for as long as it takes to read a headline, and go to work.'],
   K74MV('(text) u eat toast like a serial killer'),K74V('(text) Thank you.')],done)}},
  {t:'Close the blind',fn:()=>{S.f.e2lDot='blind';save();say([['','You get up and close the blind. Your phone buzzes before you sit back down.'],K74MV('(text) coward'),
   K74V('(text) I would like to eat breakfast without your company. It is the only meal I enjoy.'),K74MV('(text) noted. lunch then')],done)}}]))},
 {id:'e2l74_hale_v',pov:'v',when:()=>S.day>=3,run:done=>say([['','Inspector Hale at the foundation’s door, rain on his coat, on what he calls an unrelated matter.'],
  ['Hale','There’s a girl with a star clip who has been behind the tape at three of my scenes this month. I’m told she’s on that server of yours, Mr. V. I’d like a name.']],()=>ask('K9','(The grey folder is in the second drawer.)',[
  {t:'Give Hale her file',sub:'a courtroom is quick, and you would accept quick',fn:()=>{S.f.e2lHale='v';save();say([['','You give him the thick grey folder with her name on the tab. He weighs it in one hand and does not open it in front of you.'],
   ['Hale','You had this ready.'],K74V('I have one ready on everyone.'),
   ['','On Friday a photograph comes through your letterbox: Hale’s car outside the police station with all four tyres flat, and a star clip on the bonnet.'],
   K74MV('(text) snitch'),K74V('(text) Yes.')],done)}},
  {t:'Tell him there is no such person',sub:'she is in your ledger, and not in his',fn:()=>{S.f.e2lHale='vno';save();say([K74V('There is nobody like that on my server, Inspector.'),['Hale','Course there isn’t.'],
   K74V('(She is in my ledger. She is not going in his.)')],done)}}]))}];
const _me74=morningEvent;morningEvent=function(done){try{if(S&&K74N()&&!(S.kd&&S.kd.med)&&S.f.e2l74MDay!==S.day&&mbOk()){const me=S.pov==='v'?'v':'m';
 const b=K74MORN.find(b=>b.pov===me&&!S.seen[b.id]&&(()=>{try{return b.when()}catch(e){return false}})());
 if(b){mbUse();S.seen[b.id]=1;S.f.e2l74MDay=S.day;save();go(cutBg('#0a0a10'));return b.run(()=>_me74(done))}}}catch(e){}return _me74(done)};

/* ---------- swapped events ---------- */
function k74A60(done){const m=k74M();say([
 ['',m?'Two in the morning. Your phone goes on the nightstand, and again, and then it does not stop.':'Two in the morning. The server is busy. You read it in bed with your glasses on and the old hound across your feet.'],
 [RN,'(server) settle somethin. if one of us gets got on a job. do the rest come get the body or nah'],
 [AN,'(server) nah'],
 K74MV('(server) nah. leave me. especially u, grandpa. if ur standing over my body i’d better be the one who put it there'),
 K74V('(server) I will not come back for you. I will be the reason.'),
 [AN,'(server) STOP. ok. rule. nobody goes back. within 48h we clear out anything at their place that leads to the rest of us. no funerals, no visits, no stupid'],
 [AN,'(server) all in favour'],
 ['','Three thumbs come up under it. The fourth comes up four minutes later.'],
 [RN,'(server) cool. anyone want wings. place on ninth is open till four. NOT both of you'],
 ['',m?'You do want wings. You do not go, because he might. Ronin sends you a photograph of a box of bones on his dashboard and Angel asleep against the window.':'You do not want wings. You get dressed anyway, and then you do not go, because she might.']],
 ()=>{S.f.a60Rule=1;note('a60_rule','The rule, from the server: nobody goes back for the body. Forty-eight hours to clear anything that leads to the others. Then move on.');fr('a',1);fr('r',1);done()})}
function k74Canal(done){say([['','The evening news has a body out of the canal by the pumping station, unweighted. It is one of hers. You know her knots by now.'],
 K74V('(Sloppy. In a hurry. The firm that dressed him will have noticed whose knot it is.)'),
 ['','You write it on her page with the date, and under it the name of the firm, and for a while you look at the two lines together and do not like the shape they make.']],done)}
function k74Drift(done){S.seen.drift_txt=0;try{const ks=phContacts().filter(k=>k!=='v'&&k!=='m'&&frT(k)>=1);if(ks.length&&typeof DRIFT!=='undefined'){const k=pk(ks);if(DRIFT[k]){phQueue(k,[pk(DRIFT[k])],0);phDeliver()}}}catch(e){}done()}
function k74W59Ask(done){const k=w59Lead(),F=w59F(),o=w59O(k);F.st['v:'+k]=2;save();
 say(w59Org(k).vA(),()=>ask('K9','(They are asking about her.)',[
  {t:'She is nobody to me',fn:()=>say([K74V('I have a great many people on my server. I do not keep track of their hair.'),[o.boss,'We do.'],['','It is the only thing in the conversation you cannot answer, so you do not.']],done)},
  {t:'She is in your ledger, not theirs',sub:'−conscience · they learn something',fn:()=>{F.lever=1;w59Bump(k,2);apply({heart:-3});save();say([K74V('She is in my ledger. When she dies it will be because I wrote it. Tell your employer to keep his hands off what is mine to finish.'),[o.boss,'Thank you. That was what we needed to know.'],
   ['','You understand what you have given them about one second after you have given it, and you drive home at exactly the speed limit.']],done)}},
  {t:'Say nothing, and add them to her page',fn:()=>say([['','That night you write the outfit’s name on her page under the oath, in pencil, because you do not yet know what it means that somebody else wants her.']],done)}]))}
function k74W59Circle(done){const k=w59Lead(),o=w59O(k),F=w59F();
 say([['','Every outfit in the city is noisy in the ledgers. '+o.name+' has gone quiet: no new debts, no new hires, nothing paid for three days.'],
  K74V('(An outfit goes quiet when it has finished buying what it needs and is waiting for the right night.)')],
 ()=>ask('K9','(The right night.)',[
  {t:'Sit outside her lot tonight',sub:'−energy',fn:()=>{F.watched=1;apply({energy:-20});save();say([['','You sit in the car with the lights off from ten until four, with the ledger on the passenger seat. Nothing comes. At four she opens the trailer door to put the rubbish out, sees the car, and gives it the finger with the bin bag.'],
   K74V('(Whoever is buying vans may have anybody in this city but her. She is in my ledger.)')],done)}},
  {t:'Read the accounts again',fn:()=>say([['','You read them until three in the morning. They are still quiet, and you know exactly what that means.']],done)}]))}
function k74K56File(done){const o=k56Org();say([['','At eleven at night there is a folder on the trailer step with a stone on it to keep it from blowing away. It is from V. There is no note on the front.'],
 ['','Inside are forty pages on '+o.name+': the shell companies, the cash, and a list of their dead this year, '+k56Hits()+' of them, with your work highlighted in yellow. Some of the yellow has small notes beside it in fountain pen. One says “collateral”.'],
 K74MV('(he’s filing against them on paper. with MY bodies as his evidence)'),
 ['','On the last page, in the same hand: “Two kinds of trouble, from two directions. They will want to know who stands between them. It is not me. Lock your door.”'],
 K74MV('(i lock one. on principle)')],()=>{S.f.k56File='m';done()})}

/* ---------- swapped hub and house actions ---------- */
function k74Lock(){if(S.f.e2lLockBought){return say([K74V('(You do not buy presents for a name in your ledger. You bought her a lock. That was different.)')])}
 S.f.e2lLockBought=1;S.f.e2lLock=S.f.e2lLock||'given';save();
 say([['','The locksmith on the ring road has a deadbolt in the window that they put on bank doors. You buy it, and the screws, and the right drill bit, and tape the bit to the lid.'],
  ['','You leave it on her trailer step at four in the morning in a box with a ribbon. The card says: “Difficult, please. —K9”.'],
  K74V('(I would prefer her difficult. It makes for cleaner work.)')])}
function k74Mall(){S.done.mallV=1;S.done.mallM=1;save();const m=k74M();say([
 ['',m?'There is a very tall man in a long coat in front of the bookshop window, and he is holding a bag he does not want anyone to see. You know the coat. Your hand goes to the small of your back.':'Somebody is standing in front of the claw machine, furious at it. One star clip, checkered shorts, and a hand that goes to the small of her back the moment she sees your coat in the glass.'],
 K74MV('the fuck are u doing at the MALL'),K74V('Buying a book. You are following me.'),K74MV('i was HERE FIRST. i’m always here first. u follow ME'),
 K74V('Then we are both following each other, in a shopping centre, in front of a great many children.'),
 ['','Neither of you moves. A security guard looks at the two of you, decides he did not see anything, and goes on his break.'],
 K74MV('what’s in the bag'),K74V('Tax law.'),
 ['',m?'The bag is from the romance section. You tell nobody. You keep it to use against him later.':'The bag is from the romance section, and she has seen the receipt. She tells nobody. She is keeping it for later, and you know it.']])}
function k74Wheel(){const first=!S.f.e2lWheel;const m=k74M();
 if(!first)return say([['',m?'He is in gondola seven again, on the far bench, with his hands folded. You sit opposite him for an hour without a word, and the gondola moves every time one of you breathes.':'She is in gondola seven again, on the far bench, with her boots up. You sit opposite her for an hour without a word, and the gondola moves every time one of you breathes.']]);
 S.f.e2lWheel=1;save();say([
 ['',m?'When you reach the top, gondola seven is occupied. V is sitting on the far bench in his long coat with his hands folded, as if he is waiting for a train.':'When you reach the top, gondola seven is occupied. Misaki is on the far bench with her boots up and a rifle across her knees, as if she has been waiting for you, which she has.'],
 K74V('You climbed a condemned ladder with a rifle on your back.'),K74MV('u climbed it in a SUIT'),
 ['','The gondola is forty metres up on a spoke that is mostly rust. It shifts whenever either of you breathes. One shove at the right moment and the city would read about it tomorrow as an accident.'],
 K74MV('one of us could just. tip'),K74V('Yes.'),
 ['','Neither of you tips. You sit opposite each other for an hour and watch the city go to work: the buses, the cranes on the harbour, a fire somewhere in the north that nobody is putting out.'],
 K74MV('i come up here when i want everybody to be tiny'),K74V('I come up here to see which roof you are on.'),K74MV('…today?'),K74V('This one.'),
 ['',m?'He goes down first. The gondola lurches when he steps out onto the ladder, and for one second your hand is flat on the door, and then it is not, and then he is gone.':'You go down first. The gondola lurches when you step out onto the ladder, and for one second you feel her weight shift behind you, and then it does not, and you keep climbing down.']],()=>{k74Tally(m?'m':'v')})}
function k74Sleeper(w){const m=w==='v';say(m?[
 ['','He sleeps on his back like a man laid out for a viewing, one hand hanging off the bed. On the floor the grey hound lies with its head under that hand, awake, looking at you in the doorway.'],
 ['','You have the knife out. It is four steps to the bed. The grey hound does not move and does not take its eyes off you.'],
 K74MV('(four steps. he’d never know. he’d never even KNOW it was me)'),
 ['','You put the knife away and close the door to the width of a hound, and you leave a single bullet standing on his nightstand next to his water glass.']]:[
 ['','She sleeps curled round a gun case like a cat round a radiator, one star clip still in, the phone face-down beside her and still on the server.'],
 ['','You have your hands. It is three steps. She sleeps through small sounds and wakes at large ones; you have written that down. You could do it without a sound at all.'],
 K74V('(She would never know it was me. I want her to know.)'),
 ['','You stand there until the old hound, out in the car, barks once. Then you go out and lock her door behind you with her own pick, from the outside, so she will know.']],()=>k74Tally(w==='v'?'m':'v'))}

/* ===================================== 7 · RONIN AND ANGEL, IN THE MIDDLE (location events) ===================================== */
const K74L=[];const l74=(id,rooms,p,when,run)=>K74L.push({id,rooms,p,when:()=>{try{return K74N()&&!(S.kd&&S.kd.med)&&when()}catch(e){return false}},run});
l74('l74_ron',['ronin'],.6,()=>S.day>=2,done=>{const m=k74M();say(m?[
 ['','Ronin’s flat. He takes the rifle off your back before you have sat down, and works the bolt, and looks into the chamber, and puts it on top of the fridge where you cannot reach it without a chair.'],
 [RN,'Sit. I ain’t gonna lecture you. I’m gonna ask you for one thing and you’re gonna say yes.'],
 [RN,'Don’t do it in his house, and don’t do it in his sleep. You wanna kill him, you do it on a roof where he can see it comin’, like a fuckin’ professional. Promise me.']]:[
 ['','Ronin’s flat. He has the crowbar across his knees and he does not get up when you come in.'],
 [RN,'Sit down, Vee. I got a question and you’re gonna answer it.'],
 [RN,'That book of yours. The one with her in it. Show me the page.']],()=>ask(m?'hitmeuppp':'K9',m?K74MV('(he’s scared. ronin. scared)')[1]:'(He has never asked you for anything.)',m?[
 {t:'“…fine. i promise”',fn:()=>{S.f.e2lRon='promise';fr('r',3);save();say([K74MV('fine. on a roof, like a professional. happy?'),[RN,'Good girl. Gremlin, whatever. Good.'],['','He gets the rifle down off the fridge and gives it back to you stock first, and makes you a sandwich you did not ask for, and watches you eat all of it.']],done)}},
 {t:'“no.”',fn:()=>{S.f.e2lRon='no';save();say([K74MV('no. if he’s asleep that’s his problem'),[RN,'Then I’m sleepin’ in my truck outside his gate till one of you is dead.'],K74MV('u wouldn’t'),[RN,'Watch me, little killer.'],['','He does. From that night on the truck is outside V’s gate every night, with the engine running for the heat.']],done)}}]:[
 {t:'Show him the page',fn:()=>{S.f.e2lRon='page';fr('r',3);save();say([['','You open the ledger on his kitchen table. He reads the oath, and the date, and everything you have written under it since, and the doorman’s shift, and the girl’s maths prize.'],
  [RN,'Vee. This is a fuckin’ diary.'],K74V('It is a ledger.'),[RN,'Sure it is. I’m keepin’ my fifty on her anyway. She’s quicker.']],done)}},
 {t:'“Choose, Ronin.”',fn:()=>{S.f.e2lRon='choose';save();say([K74V('You said that if I touch her you are in it. Then choose now, so that I know where to stand.'),
  [RN,'I ain’t choosin’. I’m standin’ in the middle. Anybody shoots, they shoot through me.'],K74V('That is a very poor position.'),[RN,'Yeah. It’s mine though.']],done)}}]))});
l74('l74_ang',['studio'],.6,()=>S.day>=2,done=>{const m=k74M();say(m?[
 ['','Angel is doing your nails at the kitchen table. Halfway through the left hand she stops and smells your fingers, and makes a face.'],
 [AN,'gun oil. you’ve been cleaning it every night'],
 [AN,'tell me why you hate him. the real reason. not the charity. i can tell when it’s the charity']]:[
 ['','Angel is on her daybed with her shotgun broken open across her knees, loading it and unloading it, the way other people knit.'],
 [AN,'if she dies i’ll kill you. and if you die i’ll kill her. and then i’ll have nobody, V. do you understand that. nobody'],
 [AN,'so tell me why. what did she do that’s worth that']],()=>ask(m?'hitmeuppp':'K9',m?K74MV('(angel)')[1]:'(She has stopped loading the shotgun.)',m?[
 {t:'Tell her about the shelter',fn:()=>{S.f.e2lAng='told';S.f.e2lShelter=1;fr('a',3);save();say([K74MV('his shelter on the north side turned me away at fourteen bc i didn’t have papers. his name was on the door. brass. it was snowing'),
  [AN,'…oh, baby'],K74MV('don’t'),[AN,'i’m not. i’m doing your nails. hold still'],['','She does the rest of the left hand without saying anything, and paints the ring finger black, and does not explain why.']],done)}},
 {t:'“he’s rich. that’s it”',fn:()=>{S.f.e2lAng='lied';save();say([K74MV('he’s rich and he thinks that makes him right. that’s it'),[AN,'liar'],K74MV('ok'),[AN,'fine. lie to me. just don’t die lying to me']],done)}}]:[
 {t:'Tell her the charges',fn:()=>{S.f.e2lAng='charges';fr('a',2);save();say([K74V('A driver at a gala. A doorman who swapped a shift. A man shot in front of his daughter because the contract said Tuesday. She does not learn their names. I do.'),
  [AN,'i don’t learn their names either, V'],K74V('I know.'),[AN,'so what am i'],['','You do not have an answer. She closes the shotgun.']],done)}},
 {t:'Promise her it will be quick',fn:()=>{S.f.e2lAng='quick';save();say([K74V('If it comes to it, it will be quick. I will promise you that.'),[AN,'that’s WORSE. that’s so much worse. get out of my flat'],['','You go. At the door she says, to your back, “you’ve never once promised anyone quick.”']],done)}}]))});
/* running into each other */
l74('l74_laundro',['laundro'],.5,()=>true,done=>{const m=k74M();say([
 ['',m?'The laundromat at three in the morning. You have a hoodie in machine four on cold, because blood sets in hot water.':'The laundromat at three in the morning, two shirts with brown cuffs in your laundry bag. Misaki is on the bench with her knees up, watching machine four go round on cold.'],
 ['',m?'The door goes. V comes in with a laundry bag over his shoulder, looks at you and at machine four, and puts two shirts with brown cuffs into machine five, on cold.':'She looks at you, and at your bag. You put the shirts in machine five, on cold.'],
 K74MV('u do ur own laundry?'),K74V('I do not let anyone else wash these.'),K74MV('lol. same'),
 ['','You sit at opposite ends of the bench for forty minutes with your hands in your pockets on your weapons, watching the two drums go round side by side, and neither of you looks away from the other long enough to check a phone.'],
 K74MV('machine six eats socks btw'),K74V('I know. I have watched you lose four pairs to it.'),K74MV('…how long have u been watching me do laundry'),K74V('Since April.'),
 ['',m?'Machine four finishes first. You take the hoodie out wet and leave without drying it, backwards, with your hand in your pocket.':'Machine four finishes first. She takes the hoodie out wet and leaves without drying it, backwards, with her hand in her pocket.']],done)});
l74('l74_train',['carriage','station'],.5,()=>true,done=>{const m=k74M();say([
 ['',m?'The last train, the last car. V is at the far end reading, with the black hound lying across the doorway.':'The last train, the last car. Misaki gets on at the bridge stop and sits at the far end, facing you, with her hood up and her hand in the pocket of it.'],
 ['','Between the two of you a man in a good suit is standing much too close to a girl in a school blazer, who is pretending to be asleep against the window.'],
 ['',m?'At the next stop you stand up. So does V. You reach the man at the same moment.':'At the next stop you stand up. So does Misaki. You reach the man at the same moment.'],
 ['','The doors open. The man goes out through them face first onto the platform and does not get up, and the doors close.'],
 K74V('(to the girl) Your stop is the next one. Get off there.'),
 ['','She does. The two of you go back to opposite ends of the car and sit down, and do not look at each other until the end of the line.'],
 K74MV('(text) that doesn’t count'),K74V('(text) No. It does not count.')],()=>{apply({aff:1});done()})});
l74('l74_harbour',['harbour','containers'],.5,()=>true,done=>{const m=k74M();say([
 ['',m?'The harbour at dawn. You are on the pier with a rod you stole from a bait shop and no bait, because fishing is the only thing you can do on a pier at five in the morning that nobody asks about.':'The harbour at dawn. You are at the end of the east pier putting a long canvas bag into the water with chain round it. On the next pier Misaki is fishing with no bait, watching you.'],
 ['',m?'At the end of the next pier V is putting a long canvas bag into the water with chain round it, very neatly. The grey hound sits beside him watching it go down.':'The grey hound sits beside you, watching the bag go down.'],
 K74MV('ur knot’s wrong'),K74V('My knot is correct.'),K74MV('that’s a granny knot. he’ll be up by thursday. say hi to the fish'),
 ['',m?'He looks at the water for a long moment. Then he takes his coat off, rolls his sleeve to the shoulder, reaches in, and reties it under the water by feel while you watch.':'You look at the water for a long moment. Then you take your coat off, roll your sleeve to the shoulder, reach in, and retie it under the water by feel, while she watches.'],
 K74V('Thank you.'),K74MV('don’t thank me. i want u caught for the right thing')],done)});
l74('l74_green',['green'],.5,()=>true,done=>{const m=k74M();say([
 ['',m?'His greenhouse. You are meant to be counting cameras. Instead you are crouched in the back two rows, where nothing has a label, looking at a plant with little white umbrellas for flowers.':'Your greenhouse. Misaki is crouched in the back two rows, where nothing has a label, with a leaf of hemlock between her finger and thumb.'],
 ['',m?'V is in the doorway. You did not hear the door.':'She has not heard you come in. You let her know by speaking.'],
 K74V('Hemlock.'),K74MV('i know what it is'),K74V('Then you know it would be very slow, and that I would know whose it was.'),
 K74MV('who says it’s for u'),K74V('I am the only person you hate enough to garden for.'),
 ['',m?'You put the leaf down, wipe your fingers slowly on his good apron where it hangs by the door, and go out of the back hatch.':'She puts the leaf down, wipes her fingers slowly on your good apron where it hangs by the door, and goes out of the back hatch.']],done)});
const K74ROOMS=[...new Set(K74L.reduce((a,e)=>a.concat(e.rooms),[]))];
const l74Pool=id=>K74L.filter(e=>e.rooms.includes(id)&&!S.seen[e.id]&&e.when());
function l74Run(e,done){S.seen[e.id]=1;S.f.k64LDay=S.day;save();e.run(done||(()=>{}))}
function l74Try(id,force){if(!S||!K74N()||S.f.k64LDay===S.day&&!force)return null;const pool=l74Pool(id);if(!pool.length)return null;const e=pool[0];if(!force&&Math.random()>e.p)return null;return e}
function l74Wait(id,e,n){setTimeout(()=>{if(!S||!scene||!scene.isRoom||S.room!==id||S.seen[e.id]||S.f.k64LDay===S.day)return;if(dlg||ctrl||(typeof mgOn==='function'&&mgOn())){if(n<8)l74Wait(id,e,n+1);return}l74Run(e)},1000)}
K74ROOMS.forEach(id=>{const R=ROOMS[id];if(!R)return;const o=R.enter;R.enter=function(){const r=o?o.apply(this,arguments):undefined;try{const e=l74Try(id);if(e)l74Wait(id,e,0)}catch(x){}return r}});

/* ===================================== 8 · THREADS AND THE SERVER ===================================== */
txDef('tx_e2l74_lift',{with:'v',pov:'m',prio:2,when:()=>K74N()&&k73Done('e2l_lift'),nodes:{
 start:{in:()=>['The man from the ninth floor has left the city. Neither of us will have him now.'],expire:3,
  opts:()=>[{t:'“ur fault. u and ur stupid power bill”',reply:()=>['Yes.','I have had the porter’s hours changed. It will not happen again.'],next:'again'},
   {t:'“u owe me twelve hundred”',fx:()=>apply({aff:1}),reply:()=>['I will add it to what you owe me. It is a long column. Yours is shorter.']}]},
 again:{in:()=>['Your jaw, or my ribs. Which would you have chosen?'],
  opts:()=>[{t:'“ur throat”',reply:()=>['That was not one of the options.','It is noted anyway.']},{t:'“go to sleep v”',fx:()=>apply({aff:1}),reply:()=>['I sleep three and a half hours a night. You have had all of them this week.']}]}}});
txDef('tx_e2l74_hound',{with:'m',pov:'v',prio:2,when:()=>K74N()&&k73Done('e2l_kennel'),nodes:{
 start:{in:()=>['ur old hound has a bad back left leg','get it looked at','not bc i care. bc when i kill u i want him to be able to run away'],expire:3,
  opts:()=>[{t:'“It is his hip. He is fourteen.”',fx:()=>apply({aff:1}),reply:()=>['…ok','then get him a ramp for the kennel steps. a ramp. it’s not hard','u have a billion dollars and he’s doing STAIRS']},
   {t:'“Stay away from my hounds.”',reply:()=>['tell ur hounds to stay away from ME','the black one followed me to the bus stop yesterday']}]}}});
txDef('tx_e2l74_ron',{with:'r',prio:2,when:()=>K74N()&&k73Done('e2l_lift'),nodes:{
 start:{in:()=>['book’s at $340','angel ain’t eaten since sunday','y’all are scarin’ the shit outta her. me too if you’re askin, which you ain’t'],expire:3,
  opts:()=>[{t:k74M()?'“then close the book”':'“Then close the book.”',reply:()=>['can’t. the book’s the only thing keepin’ me in my chair']},
   {t:k74M()?'“who’s winning”':'“Who is winning?”',reply:()=>['nobody. that’s why i’m scared','somebody always wins, eventually. one shot. then it’s over and we gotta clear out the flat in 48 hours like the rule says and i don’t wanna']}]}}});
txDef('tx_e2l74_ang',{with:'a',prio:2,when:()=>K74N()&&k73Done('e2l_dinner'),nodes:{
 start:{in:()=>[S.f.e2lDinner==='glass'?'ronin is fine. he says the rug is not fine':S.f.e2lDinner==='fern'?'the fern is dead. i had it six years':'i haven’t slept since sunday','i want you both to know i keep a dress for each of you. black. i hate it'],expire:3,
  opts:()=>[{t:k74M()?'“sorry angel”':'“I am sorry, Angel.”',fx:()=>fr('a',1),reply:()=>['don’t be sorry. be alive. both of you, please']},
   {t:k74M()?'“which dress is mine”':'“Which dress is mine?”',reply:()=>['the one with the pockets','for the bullets. you’d want it']}]}}});
const K74CHAT=[
 {when:()=>true,l:[['ro','book’s at $340. little killer’s the favourite. vee’s got the reach'],['an','i hate this. i hate this so much'],['ro','i know, princess. that’s why there’s a book']]},
 {when:()=>true,l:[['an','can everybody confirm they are alive. it’s 6am. i do this every morning now'],['ro','alive'],['mi','alive. unfortunately for some'],['k9','Alive.'],['an','ok. going back to sleep for an hour. then i’m checking again']]},
 {when:()=>true,l:[['mi','V where were u at 3am'],['k9','Where were you at three in the morning, Misaki?'],['mi','none of ur business'],['k9','Then we were in the same place.']]},
 {when:()=>!!S.f.e2lShelter,l:[['mi','reminder that some of us were turned away from the shelters bc of a RULE'],['k9','The rule keeps children from being collected by men who say they are their uncles.'],['mi','it kept ME out in the snow'],['k9','…'],['ro','well this is fuckin’ fun']]},
 {when:()=>S.f.e2lMug==='shot',l:[['k9','Misaki shot my mug.'],['an','MY mug?? the okayest vigilante mug??'],['mi','it was in the way of his face']]},
 {when:()=>k73Done('e2l_dinner'),l:[['ro','new rule. nobody brings a weapon to angel’s. i’m searchin’ y’all at the door'],['k9','You will not find all of them.'],['ro','i know, vee. that’s what scares me'],['mi','he keeps one in his COLLAR']]},
 {when:()=>S.f.e2lRon==='no'||S.f.e2lRon==='choose',l:[['an','ronin is sleeping in his truck outside V’s gate'],['ro','i ain’t sleepin. i’m watchin’'],['k9','He has been there three nights. The hounds have adopted him.']]}];

/* ===================================== 9 · WHAT IT FEEDS: kc73's beats, the lone routes, the endings ===================================== */
function k74Echo(){const f=S.f,m=k74M(),L=[];const t=f.e2lTally||{};
 if(f.e2lLift==='m')L.push(['',m?'He still has the line along his jaw from the customs-house lift. You know exactly where it is without looking.':'You still have the line along your jaw from the customs-house lift. She looks at it before she looks at your hands.']);
 else if(f.e2lLift==='v')L.push(['',m?'He still has your pistol’s round from the customs-house lift in his coat pocket. You have seen him turn it over when he thinks.':'You still have her round from the customs-house lift in your coat pocket. You turn it over when you think.']);
 if(f.e2lKennel==='fed'||f.e2lKennel==='stay')L.push(['','The old hound has slept by the kennel gate every night since she fed him through the bars.']);
 if(f.e2lDinner==='fern')L.push(['','Angel has a new fern. She has put it out of reach of everybody’s glass.']);
 else if(f.e2lDinner==='glass')L.push(['','Ronin will not let anybody pour for him any more. He pours his own, and watches the bottle.']);
 if(f.e2lPrickles)L.push(['','The cactus on her windowsill has two holes in it, one from each of them, and it is still alive.']);
 if((t.m||0)+(t.v||0)>=3)L.push(['','The count stands at '+(t.m||0)+' to '+(t.v||0)+', and nobody has said it out loud.']);
 return L}
(function(){const pre=(id,fn)=>K73B.filter(b=>b.id===id).forEach(b=>{const r=b.run;b.run=function(){const L=fn();if(L.length&&S&&E2L()){go(cutBg('#060608'));return say(L,()=>r.apply(this,arguments))}return r.apply(this,arguments)}});
 pre('e2l_after',()=>{const L=k74Echo().slice(0,2);if(S.f.e2lShelter)L.push(['',k74M()?'Somebody has taken the brass plate off the door of the shelter on the north side. Nobody will say who.':'You had the brass plate taken off the door of the shelter on the north side. You have told nobody.']);return L});
 pre('e2l_boat',()=>{const L=k74Echo();if(S.f.e2lPhotos)L.push(['',k74M()?'The twenty-fifth photograph, the grey hound asleep in the sun, is in the inside pocket of your jacket. It has been there since the roll was developed.':'She has never given you the twenty-fifth photograph. You have stopped asking. You think it is in her jacket.']);
  if(S.f.e2lPlan)L.push(['',k74M()?'You never found out what he wrote at the top of his plan.':'At the top of your plan for her it still says '+(S.f.e2lPlan==='slow'?'SLOW':'QUICK')+'. You have never once changed it, and never once used it.']);return L.slice(0,4)})})();
const _li74=loneIntro;loneIntro=function(){const L=_li74.apply(this,arguments);try{if(S&&S.f&&S.f.e2l===1){S.f.e2lLone=S.lone;save();
 const x=S.lone==='v'?[['','He never wrote a total on her page. Somebody else did it for him, and he did not get to say whether it was allowed.'],K74V('(She was mine to kill. They took that as well.)')]
  :[['','He came for her. He swore in ink to kill her, and he came into the river anyway, and it killed him. She cannot make that come out either way, and she has stopped trying.'],K74MV('(i was going to kill u. u were supposed to let me)')];
 const K=L.filter(l=>!/pours two cups/.test(String(l&&l[1])));return K.slice(0,-1).concat(x,[K[K.length-1]])}}catch(e){}return L};
const _xe74=extraEnding;extraEnding=function(){const L=_xe74();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f;
 if(f.e2lLift==='m')L.push('V has a thin scar along his jaw from a lift in the customs house. He says he cut himself shaving, and nobody believes him.');
 else if(f.e2lLift==='v')L.push('V kept the round he took out of her pistol in the customs-house lift. It lives in his coat pocket.');
 if(f.e2lHound)L.push('The old hound has always gone to Misaki first.');
 if(f.e2lDinner==='fern')L.push('Angel’s fern did not survive the dinner. Angel has never served wine to both of them at once again.');
 else if(f.e2lDinner==='glass')L.push('Ronin drank what Misaki meant for V. He still brings it up at every dinner.');
 if(f.e2lShelter)L.push('The shelters no longer turn children away for having no papers. There is no brass plate on the north-side door.');
 if(f.e2lPrickles)L.push('Prickles has two bullet holes in it, one from each of them.');
 if(f.e2lHale==='m'||f.e2lHale==='v')L.push(f.e2lHale==='m'?'Misaki once gave Inspector Hale the plate of V’s car. V had the police car’s windows put in.':'V once gave Inspector Hale her file. She let down all four of his tyres.')}catch(e){}return L};
/* ===KC74-END=== */

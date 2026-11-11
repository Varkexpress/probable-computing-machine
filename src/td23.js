/* ===================== td23: abroad, and what you are =====================
   - The Japanese places (Kururin Land, the haunted house, the hillside shrine and its cemetery, the rented machiya and
     the Uji river, the last train, the coast, Kita High's old track, the bathhouse) are only reachable on an overseas
     job in Japan. Misaki goes on a contract; V goes on a hunt. Two days, then home. The locals there are scenery.
   - At home the harbour, the laundromat and St. Aldric's stay, with the locals stripped of importance.
   - Reminders that you are playing a killer: the body count on the HUD (ui2), a line some mornings, a thought once a day.
   Voices: V never contracts. */
const JP_ROOMS=['park','haunt','shrine','graves','kyoto','uji','carriage','coast','oldtrack','sento','harbour','containers','laundro'];
const HOME_QUIET=['station'];
const jpAway=()=>!!(S&&S.f&&S.f.abroad);
const jpV=()=>S.pov==='v';
const jpDest=[
 ['park','Kururin Land (abandoned)','the target used to own a share in it',[['','A dead amusement park on the edge of town. The target’s name is still on a brass plate by the ticket booth, as an investor. You photograph it for the file.']],[['','A dead amusement park. The man you are hunting laundered money through it for six years. The carousel horses have been painted over twice. You know the colours underneath.']]],
 ['haunt','The haunted house','a meeting point, once',[['','The target’s people used the haunted house for handovers: nobody looks twice at screaming. You walk the route they walked.']],[['','A haunted house. The real thing that happened in here is in a police file you are not supposed to have read.']]],
 ['shrine','The hillside shrine','the target prays here on Fridays',[['','The target comes here every Friday and pays for a fortune. You learn the steps, the blind corners, the lantern that never lights.']],[['','The target prays here. You stand where he stands and look at what he looks at. People who pray every week are very easy to find.']]],
 ['graves','The cemetery behind the shrine','quiet ground',[['','A cemetery on the hill. You are not here for anyone in it. You are here because it overlooks the road the target drives home on.']],[['','A cemetery overlooking the road. It is the best vantage point in the district. The dead do not mind being useful.']]],
 ['kyoto','The rented machiya','where you sleep',[['','The rented house. You check every sliding door twice before you put your bag down. It is not yours. Nothing is.']],[['','The rented house. You sweep it for listening devices, out of habit, and find one, out of luck. You leave it running and say nothing interesting near it.']]],
 ['uji','The Uji riverbank','the target walks here at dawn',[['','The river. The target walks his dog along it at dawn. You note the time, the dog, the bench he never sits on.']],[['','The river. Without the hounds you are only a man walking by water. It is enough.']]],
 ['carriage','The last train','the target’s commute',[['','The last train. The target rides it home three nights a week, last car, same seat. You ride it once, two seats behind him, and get off one stop early.']],[['','The last train. You ride the target’s route so that you will know what he hears at the end of his life.']]],
 ['coast','The coast','the drop-off point',[['','The coast. The car will go into the water here, after. You check the tide tables twice.']],[['','The coast. This is where the target’s people moved what they sold. The sea keeps no records. You do.']]],
 ['oldtrack','Kita High — the old track','your old school',[['','Kita High. You ran here once. It is just a track. The belief here was that if you trained hard enough nothing could catch you. It was wrong.']],[['','Her old school. She will not ask you to go. You go anyway, once, and stand at the start line, and leave.']]],
 ['harbour','The harbour','the boats',[['','A fishing harbour an hour out of the city. The target’s brother-in-law keeps a boat here. You buy bait you will not use so that you have a reason to stand on the pier.']],[['','The harbour. Somewhere in this row of boats is the one that moved the people your target sold. You walk the pier until you find the one with new paint.']]],
 ['containers','The container yard','where things are stored',[['','The container yard behind the harbour. Row F, where the target’s people keep what they do not want found. You learn the watchman’s route in one night.']],[['','The container yard. You open one container you should not, and close it again, and add four names to the file.']]],
 ['laundro','The 24-hour laundromat','somewhere warm at 3am',[['','A coin laundry near the rented house, open all night. You wash the clothes you wore. Twice.']],[['','A coin laundry, open all night. You sit with your back to the wall and watch the door, the way you would anywhere.']]],
 ['sento','The bathhouse','somewhere to wash it off',[['','A bathhouse. You wash for a long time. There is nothing on your hands. You wash them anyway.']],[['','A bathhouse. You sit in water hot enough to hurt, which is the point.']]]];
function jpGo(room){for(const id in TD.maps){const M=TD.maps[id];const z=M.zl.find(z=>z.room===room);if(z){const a=z.arrive?(typeof z.arrive==='function'?z.arrive():z.arrive):[z.r[0]+2,z.r[1]+2];TD.resume=null;tdGo(id,a[0],a[1],'d');return}}hub()}
function jpOK(){return S&&!isLone()&&!(S.phase==='normal'&&S.f.kidnapSet)&&['normal','after','act2','epilogue'].includes(S.phase)&&S.day>=5&&!jpAway()&&!(S.f.jpLast&&S.day<S.f.jpLast+6)}
function jpStart(){const v=jpV();S.f.abroad={d0:S.day,until:S.day+2,job:0,partner:(tier()>=2&&!S.dark)?1:0};S.f.jpLast=S.day;save();
 cut(v?[['','A file arrives through channels you do not discuss: a man who sold people out of your city has run to Kyoto, because he believes an ocean is far enough.'],
   ['','The hounds stay. They lie across the front door when you lift your bag, and do not look at you, which is how they say they know.'],
   ['','For three nights the city’s killers will notice that the hounds are not barking, and nobody will understand why that is worse.'],
   S.f.abroad.partner?['','Misaki is on the same flight, by a coincidence neither of you discusses. She sleeps through the whole of it with her hood up and her back to the window.']:null].filter(Boolean)
  :[['','A contract from Japan. Kyoto. The money is good and the client is careful, which means the target is dangerous.'],
   ['','You pack the way you always do: one bag, nothing you would mind leaving. On the plane you do not look out of the window. Japan is just a place you used to be.'],
   S.f.abroad.partner?['','V is on the same flight, by a coincidence neither of you discusses.']:null].filter(Boolean),()=>jpMenu(),'#070910')}
function jpEnd(cb){const v=jpV();const done=S.f.abroad&&S.f.abroad.job;S.f.abroad=null;save();
 cut([['',v?'The flight home. You sleep for forty minutes of it, which is more than usual.':'The flight home. Somewhere over the sea you realise you cannot remember the colour of the rented house’s door. That is normal for you. It is the target’s face you will keep.'],
  ['',done?(v?'At the front door the hounds stand up, all of them at once, and smell your hands for a long time.':'The city looks exactly the same. The trailer looks exactly the same. You are one person lighter.'):'You did not do the job. Someone else will. You will hear about it, and you will not feel anything, and that is the part that should worry you.']],cb||hub,'#070910')}
function jpMenu(){if(!jpAway())return hub();const A=S.f.abroad,v=jpV(),late=S.slot>=3;const left=A.until-S.day;
 const o=[{h:'Japan · day '+(S.day-A.d0+1)+' of '+(A.until-A.d0+1)}];
 if(!A.job)o.push({t:v?'The hunt':'The job',sub:'the reason you are here',dis:late&&false,fn:()=>{spend();jpJob()}});
 o.push({h:'Kyoto and around'});
 jpDest.forEach(([room,t,sub,Lm,Lv])=>o.push({t,sub,dis:late&&room!=='kyoto'&&room!=='sento',fn:()=>{if(room!=='kyoto')spend();say(v?Lv:Lm,()=>jpGo(room))}}));
 o.push({h:'Then'});
 o.push({t:'Sleep at the rented house',sub:left<=0?'tomorrow you fly home':'',fn:()=>{S.done.bedChosen=1;S.bed='trailer';save();if(typeof sleep==='function')sleep();else hub()}});
 if(A.job)o.push({t:'Fly home now',fn:()=>jpEnd()});
 panel(`<p class="hint">${v?'Kyoto. No foundation, no hounds, no name anyone here would know.':'Kyoto. Nobody here knows hitmeuppp. Nobody here knows Misaki, either.'}</p>`,o)}
function jpJob(){const v=jpV(),A=S.f.abroad;
 const L=v?[['','Four in the morning. The man’s apartment has two locks and a dog. You bring meat for the dog. You bring nothing for the man.'],
   ['','He wakes up to you sitting in the chair at the end of his bed, in the coat, with the file on your knee. You read him the names on the file, all of them, in order, so that he will know you know.'],
   ['','He offers money. He offers more money. He offers you names of his own.'],
   ['K9','I already have the names.'],
   ['','You leave before the sun is up. The police will find a man who appears to have died in his sleep, and a dog that has been fed, and nothing else at all.']]
  :[['','The target leaves the shrine at seven. The lantern by the third step never lights. You are standing beside it.'],
   ['','It takes four seconds. You have done it so many times that your hands do it while you think about whether the corner store near the house will still be open.'],
   ['','You walk down the steps at the same pace as everyone else. A woman nods at you. You nod back. Neither of you will remember the other.'],
   ['M','(text) done.'],
   A.partner?['K9','(text) Noted. I have tea.']:[AN,'(text) ur alive. good. bring me back a keychain. a stupid one.']];
 A.job=1;S.bodies=(S.bodies||0)+1;S.f.jpJobs=(S.f.jpJobs||0)+1;if(!v)S.yen+=60000;else S.funds=(S.funds||0)+5;save();drawHud();
 cut(L,()=>{toast(v?'The hunt is over':'Contract complete · '+money(60000));jpMenu()},'#0a0608')}
/* while abroad: hub and the city map lead to the Japan menu; mornings are quiet; the trip ends on its last morning */
const _hub23=hub;hub=function(){if(jpAway())return jpMenu();return _hub23.apply(this,arguments)};
const _cm23=cityMap;cityMap=function(){if(jpAway())return jpMenu();return _cm23.apply(this,arguments)};
const _morn23=morningEvent;morningEvent=function(done){if(jpAway()){if(S.day>=S.f.abroad.until)return jpEnd(done);return done()}return _morn23(done)};
const _side23=sideHub;sideHub=function(late){const o=_side23(late);try{if(jpOK())o.push({t:jpV()?'Overseas hunt: Kyoto':'Overseas contract: Kyoto',sub:'two days in Japan',dis:late,fn:()=>{spend();jpStart()}})}catch(e){}return o};
/* places: exits inside the Japanese maps lead back to the trip menu; the locals carry no weight */
(function(){const EXIT=/Train home|Steps down|Get off at the next stop|^Leave$|leave$/i;
 JP_ROOMS.forEach(r=>{const R=ROOMS[r];if(!R)return;(R.spots||[]).forEach(s=>{if(EXIT.test(s.label||'')){const a=s.act;s.act=function(){if(jpAway())return jpMenu();return a&&a.apply(this,arguments)}}if(/omikuji/i.test(s.label||'')){const sh=s.show;s.show=()=>jpAway()||(sh?sh():false)}});
  if(R.npcs){const n=R.npcs;R.npcs=function(){let L=[];try{L=n.apply(this,arguments)||[]}catch(e){}const wed=typeof qst==='function'&&qst('wedding')>=0&&qst('wedding')<QUESTS.wedding.steps.length;const with_=wed||(jpAway()&&S.f.abroad.partner);return with_?L.filter(x=>/(^| )V$|\bV\b|Misaki/.test(x.label||'')):[]}}});
 try{const P=TD.maps.laundro&&TD.maps.laundro.props.find(p=>p.id==='ld_noren');if(P){P.show=()=>jpAway();P.label='The bathhouse (through the curtain)'}}catch(e){}
 HOME_QUIET.forEach(r=>{const R=ROOMS[r];if(!R||!R.npcs)return;const n=R.npcs;R.npcs=function(){let L=[];try{L=n.apply(this,arguments)||[]}catch(e){}return L.filter(x=>/\bV\b|Misaki|Angel|Ronin|Hale/.test(x.label||''))}})})();
/* Kyoto belief, once you have worked there */
const _bel23=k22Bel;k22Bel=function(){const L=_bel23();if(S&&S.f&&S.f.jpJobs)L.push(['Kyoto','They say a thing that has been used for a hundred years grows a soul and starts to resent whoever used it.','so i never keep a gun for more than a year. i don’t want anything of mine to have opinions about me.']);return L};

/* ---------- what you are ---------- */
const K23_MORN={m:['You wake up and check your hands before your phone. Habit. There is never anything on them in the morning.','Somewhere in this city someone is planning their week, and you are in it, and they do not know.','Total so far: {n}. You do not keep the number on purpose. It keeps itself.','You dreamed about a hallway you have worked in. You did not dream about the man in it. You never do.','The radio says a man was found in the river. It is not one of yours. You are aware that you checked.'],
 v:['You wake at 5:38. The hounds are already awake. They are always already awake.','Total so far: {n}. Every one of them was on a list first. You keep telling yourself that matters.','Somebody in this city crossed the street last night when they saw your car. You did not see them do it. You did not need to.','The foundation sends its morning summary: three shelters, one hospital wing, a scholarship. Under it, in your own notes, three addresses that will not be on anyone’s summary.','You wash your hands before breakfast. You washed them last night. You will wash them again.']};
const _morn23b=morningEvent;morningEvent=function(done){try{if(S&&!jpAway()&&S.phase!=='taken'&&!isLone()&&Math.random()<.4){const P=K23_MORN[S.pov==='v'?'v':'m'];const t=P[(S.day*7+3)%P.length].replace('{n}',String(S.bodies||0));return say([['',t]],()=>_morn23b(done))}}catch(e){}return _morn23b(done)};
TDREACT.push({id:'k23_think',visit:1,when:()=>S&&S.f.k23think!==S.day&&S.phase!=='taken'&&!jpAway(),line:()=>{S.f.k23think=S.day;const m=S.pov!=='v';return pk(m?['(you count the exits. two. you always count the exits.)','(you could kill everyone in this room before they finished turning round. you don’t think it. it just sits there, like the time.)','(your hands are steady. they’re always steady. that’s the scary part, when you let it be.)','(somebody laughs in the next room and you’ve already placed them by the sound.)']:['(You note where everyone in the house is standing. You do it in every room. You have stopped pretending it is for their safety.)','(The hounds lift their heads when you pass. They are not checking on you. They are checking for permission.)','(Your conscience is a ledger. It balances. It is not supposed to balance this easily.)'])}});

const _sleep23=sleep;sleep=function(){if(jpAway()){S.done.bedChosen=1;S.bed='trailer'}return _sleep23.apply(this,arguments)};

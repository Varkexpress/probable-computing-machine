/* ===================== TWO DOORS: what the choice cost, and the third door ===================== */
const autonReady=()=>tdF('autonomy')&&!tdF('autonomy2')&&S.day>=(tdS().f.autonDay||0)+1&&!S.dark;
const DP_AUTON2=[['hitmeuppp','i still do the math, you know. every day.'],['K9','What math?'],
 ['hitmeuppp','who gets which piece of me, and for how long. body’s the most expensive. hands are the cheapest shit i own. that’s why the job never felt heavy, it was the cheapest thing on the menu.'],
 ['hitmeuppp','after the first one i threw up, ate a whole bento, slept twelve hours. woke up still owning all of me and cried about THAT. him i didn’t give a shit about.'],
 ['K9','You were sixteen and alone. I find nothing in that to forgive.'],
 ['hitmeuppp','i ran the math on us. it keeps coming out zero, nobody’s taking anything. and zero scares the shit out of me. worse than any number.'],
 ['K9','Then let it be zero. The door stays open. I built it to open from your side.'],
 ['hitmeuppp','i tried to make the job heavy last night. it won’t go. i think that part of me got spent at sixteen.'],
 ['K9','Then I will carry the weight, and you carry what the other door was. You will not be billed for anything in this house.']];
const DP_AUTON2_V=[['K9','Do you still do the math?'],['hitmeuppp','what the fuck. how do u know about the math.'],['K9','You read the menu at the café for four minutes and did not look at the prices once. You were pricing something else.']].concat(DP_AUTON2.slice(2));
function autonDone(b){tdSetF('autonomy2');apply({aff:4});if(S.dark&&typeof calm==='function')calm(8);note('td_auton2','Misaki still ranks everything by what it costs her and who gets which piece of her. With V the sum keeps coming out zero, and that frightens her more than any price. V built her a third door.');toast('Something new in the hall of doors');save();b&&b()}
TDTOP_V.push({id:'dp_auton2',label:()=>'“i still do the math, you know.”',tag:()=>'deepens',show:()=>autonReady()&&!dpV(),run:b=>{warm('v','dp_auton2',10);say(DP_AUTON2,()=>autonDone(b))}});
TDTOP_M.push({id:'dp_auton2V',label:()=>'“Do you still do the math?”',tag:()=>'deepens',show:()=>autonReady()&&dpV(),run:b=>{warm('m','dp_auton2V',10);say(DP_AUTON2_V,()=>autonDone(b))}});
if(!TOPICS_V.find(x=>x.id==='dp_auton2'))TOPICS_V.splice(TOPICS_V.length-1,0,TDTOP_V[TDTOP_V.length-1]);
if(!TOPICS_M.find(x=>x.id==='dp_auton2V'))TOPICS_M.splice(TOPICS_M.length-1,0,TDTOP_M[TDTOP_M.length-1]);
/* she dreams about the locker room the night after she tells him */
EVENTS.push({id:'dp_lockerdream',when:()=>isM()&&S.pov!=='v'&&tdF('autonomy')&&S.day>(tdS().f.autonDay||99)&&!S.seen.dp_lockerdream,run:done=>say([
 ['','You dream about the locker room. It is exactly the same: the bench, the strip light, the smell of someone else’s deodorant. There are two doors at the end, like there always are.'],
 ['','But this time there’s a third one, plain wood, slightly crooked, like somebody hung it themselves and wasn’t sure of the measurements.'],
 ['','You don’t go through it. You just look at it, for what feels like hours, until you wake up.'],
 ['hitmeuppp','ok, what the fuck. i usually wake up before i pick.']],done)});
/* the third door, in the hall of doors */
dp({id:'dp_third',x:TX(63)-2,y:TX(50),w:6,d:20,h:20,solid:false,flat:1,show:()=>tdF('autonomy2'),label:()=>tdF('thirdOpened')?'The third door':'A new door — brass plate: THREE',
 draw:(x,y)=>{rect(x-6,y-12,10,26,'#8a6a40');rect(x-5,y-11,8,24,'#a8804a');rect(x-4,y-14,6,2,'#c9a050');rect(x+2,y,2,3,'#c9a050')},
 act:who=>{const first=!tdF('thirdOpened');tdSetF('thirdOpened');
  if(who==='v')return tdSay([['','The door he hung himself. It is a little crooked. He measured three times and it is still a little crooked.'],['','Inside: a small warm room, empty except for a chair, a lamp, and a lock on the inside of the door. Only the inside.'],['K9',first?'I put nothing in it. Anything I chose would be my idea of what she wants. She may lock it, or never open it at all.':'She has been in. The chair has moved six inches toward the lamp.']]);
  tdSay(first?[['','A new door at the end of the hall, real wood among all the painted steel, hung a little crooked. A brass plate: THREE.'],['','Inside: a small warm room. A chair. A lamp. Nothing else. On the inside of the door, a lock, and the key is already in it, on your side.'],['','A card on the chair, in his small square capitals:'],['','“M. — This room is nothing yet. It owes me nothing, and neither do you. Lock it if you want. — V”'],['hitmeuppp','...'],['hitmeuppp','i locked it. i sat in the chair. nobody knocked.'],['hitmeuppp','i unlocked it again after a bit. nobody made me. i wanted to know what it felt like, picking that. (weird. it felt weird.)']]
   :[['','The third door. Inside, the chair, the lamp, the lock on your side. You’ve moved the chair closer to the lamp. You haven’t told him. He knows anyway.'],['hitmeuppp',pk(['sometimes i just come sit in here. nothing happens. it’s fucking great.','three doors. i have three doors now. that’s like. a 50% increase.','i locked it today for a bit. then i unlocked it. both felt fine. that’s new.'])]],()=>{if(first){apply({aff:3});if(S.dark&&typeof calm==='function')calm(10)}})}});
TD.maps.deep.props.push(DP[DP.length-1]);DP[DP.length-1].solid=false;DP[DP.length-1].map=TD.maps.deep;
/* the rules grow a sixth line */
const _dpRules=dpRules;dpRules=function(who){_dpRules(who);if(!tdF('autonomy2'))return;const L6=[['','At the bottom of THE RULES, newer than the rest, in V’s hand: “6. She can say no. To a job. To a night. To me. No reason needed.”'],[tdN(),dpV()?'She asked why I wrote it down when I already believed it. I have seen what men believe at two in the morning. I prefer it in writing.':'he LAMINATED it. i said no to a job last week just to see. he said “ok” and made dinner. i cried into the dinner like an idiot.']];if(dlg)dlg.lines.push(...L6);else tdSay(L6)};
/* V's notebook on the stool in the work room */
dp({id:'dp_vnotes',x:TX(40),y:TX(33),w:12,d:8,h:10,show:()=>tdF('autonomy'),label:'A notebook, left open',draw:(x,y)=>{tdBox(x,y,12,8,8,'#3a3e46','#2a2e36');rect(x+1,y-10,10,6,'#f4f0ea');rect(x+6,y-10,1,6,'#c8c4bc')},
 act:who=>tdSay(who==='v'?[['','Your notebook. A page you keep adding to and never show her.'],['K9','Things she has never been asked, and how many times I have asked them since.']].concat(dpNotes()):[['','His notebook, open on the stool. You shouldn’t. You do. A heading in his capitals: THINGS NOBODY ASKED HER.']].concat(dpNotes()).concat([['hitmeuppp','...he’s counting. he’s keeping a TALLY. of times somebody asked me what i wanted.'],['hitmeuppp','oh, fuck. ok. putting it back exactly how it was. he never finds out i saw this or i’ll literally die.']]))});
function dpNotes(){const n=(tdS().f.autonDay?Math.max(1,S.day-tdS().f.autonDay):1);return[['','“What she wants for dinner. Asked: '+(3+n)+' times.”'],['','“Whether she wants to take tonight’s job. Asked: '+(1+Math.floor(n/2))+'. She said no once. She has never said no to a job before. I did not say anything. I made soup.”'],['','“Whether she wants me to stay or go when she cannot sleep. Asked: '+(2+n)+'. Stay, every time, but she likes being asked.”'],['','“Which door. Not asked. I will not ask.”']]}
TD.maps.deep.props.push(DP[DP.length-1]);Object.assign(DP[DP.length-1],{solid:true,map:TD.maps.deep});

/* ===================== td24: the sanctuary =====================
   Tone: nothing can hurt the four of them here, and anything here would send anyone else to hell.
   Calm, domestic, unbothered; the horror is in what is normal to them.
   - Thoughts in each part of the house and the flats (once per visit, one per room).
   - Domestic mornings that would make an outsider run (priority-free, ordinary event pool).
   - What the city says about them at night: anonymous rumours on the night card.
   - Things to do, for both POVs: family dinner, the hounds' hour, the clean-up, the night drive, sitting in the pens.
   - The house steadies you: the first time each day you are home, composure comes back a little.
   The four only. Voices: V never contracts; Ronin is the Devil's own; Angel is sweet and never misses. */
const k24M=()=>S.pov!=='v';
const k24Ok=()=>S&&S.phase!=='taken'&&!isLone()&&!(S.f&&S.f.abroad);
const k24Me=()=>k24M()?'hitmeuppp':'K9';

/* ---------- thoughts, by place ---------- */
const K24_THINK={
 base:{m:['(the front door has four locks. none of them are for keeping people out. the hounds are for that. the locks are for manners.)','(somebody stood at the gate for six hours once, deciding whether to come in. he didn’t. nobody does.)','(in here nobody is looking for you. in here you are the thing people look for.)','(the house is quiet in a way only very safe places and very dangerous places are. it’s both.)'],
  v:['(Every lamp in the atrium is on a separate circuit. If one goes out, you will know why before it finishes going out.)','(Your house. The safest building in the city, for exactly four people.)','(Somewhere in the walls a hound changes position, and the whole house adjusts around it.)']},
 ewing:{m:['(he leaves the hall light on for you. it’s the kind of thing you’d find sweet if you didn’t know what he did with the rest of the night.)','(you sleep better here than anywhere. you don’t want to think about what that says.)'],
  v:['(Her door is shut. The chair is under the handle. You do not take it personally. You taught her the chair.)']},
 ops:{m:['(twelve screens. eleven of them are the city. one of them is the gate. he watches the gate more.)','(there’s a folder on the desktop called LATER. you don’t open it. you know what’s in it. it’s people.)'],
  v:['(The city at three in the morning, on twelve screens. Nobody on any of them knows they are being kept.)']},
 roof:{m:['(from up here the city looks like it’s asleep. it isn’t. it’s holding its breath. you’ve been on enough roofs to know the difference.)'],
  v:['(Every light down there is a person who has decided not to look at this house. You let them.)']},
 garage:{m:['(the cars are washed. all of them. inside too. especially inside.)','(there’s a tarp folded on the shelf with corners so sharp it looks ironed. it probably was.)'],
  v:['(The van is clean. You clean it after, and before, and sometimes in between, for the sake of the ritual.)']},
 cellar:{m:['(the wine is very old and very good and stored next to a drain that has no business being that large.)'],
  v:['(The drain was here when you bought the house. You only had it widened.)']},
 deep:{m:['(down here the air is so still you can hear the hounds breathing two floors below. they can hear you too. they always know who it is.)','(anyone else who found this staircase would spend the rest of their life wishing they hadn’t. you come down for snacks.)'],
  v:['(The deep house. Built for you, for them, for the work. Nobody who was not invited has ever reached the bottom.)']},
 trailer:{m:['(the trailer doesn’t lock properly. it’s fine. everyone who knows where you live also knows who you are.)','(the gun under the sink, the knife in the cereal box, the second knife in the other cereal box. home.)'],
  v:['(Her trailer. A child could break the door. Nobody has tried. The neighbourhood has learned some things without being told.)']},
 ronin:{m:['(ronin’s flat smells like incense and bleach. both are for the same reason.)','(there’s a bible on his nightstand with every page cut out except the ones about hell.)'],
  v:['(Ronin’s flat. The cross over the door hangs upside down, and he dusts it every morning.)']},
 studio:{m:['(angel’s ring light is the brightest thing in the city. her rifle case is under the bed it shines on.)','(she keeps a list of names on her mirror in lip liner. some of them are crossed out. you don’t ask which list it is.)'],
  v:['(Angelic’s studio. Two million people have watched her in this room. None of them has seen her work.)']}};
TDREACT.push({id:'k24_think',visit:1,when:sc=>k24Ok()&&!!K24_THINK[sc.M.id],line:sc=>{const P=K24_THINK[sc.M.id][k24M()?'m':'v'];return P&&P.length?P[(S.day+(S.slot||0)*3+sc.M.id.length)%P.length]:null}});

/* ---------- the house steadies you ---------- */
const K24_HOME=['base','ewing','ops','roof','garage','cellar','deep'];
const _go24=tdGo;tdGo=function(id){const r=_go24.apply(this,arguments);try{if(S&&K24_HOME.includes(id)&&S.f.k24home!==S.day){S.f.k24home=S.day;if(S.comp!==undefined&&typeof calm==='function')calm(3);save()}}catch(e){}return r};

/* ---------- mornings: what is normal here ---------- */
EVENTS.push(
 {id:'k24_knives',when:()=>k24Ok()&&frT('r')>=1,run:done=>say([['','Sunday. Ronin sharpens everybody’s knives at the kitchen table, whistling a hymn. Angel paints her nails beside him and asks him to do her letter opener too. V reads the paper and circles three obituaries without comment.'],[RN,'Y’all ever notice the paper never prints the good ones?'],['K9','The good ones are not found.'],['','Ronin laughs so hard he nearly loses a finger. Nobody at the table thinks this is a strange morning.']],done)},
 {id:'k24_laundry',when:()=>k24Ok(),run:done=>say([['',k24M()?'Laundry day. You sort by what needs cold water. V has a whole shelf of things that take stains out of things. He labels them by fabric and by what the stain was.':'Laundry day. Misaki sorts the whites from the things that need cold water without asking which is which. She knows. She has always known.'],['','Biology is very boring once you know it. Blood is just a protein. It comes out in cold water and patience.']],done)},
 {id:'k24_delivery',when:()=>k24Ok(),run:done=>say([['','A delivery van pulls into the drive by mistake. The driver gets out with a parcel and sees the hounds lying on the step.'],['','They do not stand up. They do not bark. They only look at him, all four, with their pale eyes, at once.'],['','He puts the parcel down very slowly, walks backwards to his van, and leaves it running in the road while he walks the rest of the way to the main street. Someone collects the van later.'],['',k24M()?'The parcel was for the house next door. You take it round. Nobody answers. Nobody ever answers next door.':'The parcel was for the house next door. Nobody has lived next door for some time. They moved when they understood who their neighbour was.']],done)},
 {id:'k24_breakfast',when:()=>k24Ok()&&tier()>=1,run:done=>say([['',k24M()?'Breakfast. V puts eggs in front of you and asks how the job went. You tell him: the stairwell, the angle, the four seconds. He nods and passes the salt.':'Breakfast. You put eggs in front of her and ask how the job went. She tells you: the stairwell, the angle, the four seconds. You pass the salt.'],['','It is the most ordinary conversation either of you has all week. That is what makes it the worst thing an outsider could overhear.']],done)},
 {id:'k24_storm',when:()=>k24Ok(),run:done=>say([['','A storm takes the power out across the north of the city. Hospitals on generators, traffic lights dead, sirens all night.'],['','The house does not notice. The generators come on before the lights finish flickering. The hounds do not lift their heads.'],[k24Me(),k24M()?MV('the whole city’s scared of the dark tonight','the whole city’s scared of the dark tonight. we’re what’s in it.','The whole city is afraid of the dark tonight. We are what is in it.','The whole city is afraid of the dark tonight, and the dark is sitting here eating soup.'):'Half the city is afraid of the dark tonight. It is a reasonable fear. We are out in it most nights.']],done)},
 {id:'k24_angelnails',when:()=>k24Ok()&&frT('a')>=1,run:done=>say([[AN,'(server) quick poll. which shade for tonight. “oxblood” or “communion”'],[RN,'(server) Communion, darlin’. Always communion.'],[k24M()?'hitmeuppp':'K9',k24M()?'(server) oxblood. it hides it better.':'(server) Oxblood. It is more forgiving.'],[AN,'(server) oxblood it is!! ty my loves. back by 2, don’t wait up 💅']],done)},
 {id:'k24_quiet',when:()=>k24Ok()&&S.phase!=='normal',run:done=>say([['','A quiet day. Nobody goes out. Ronin is asleep on the couch with a crowbar on his chest like a teddy bear. Angel is editing a video. V is reading. Misaki is watching the gate on the monitor, not because she is worried, but because it is restful.'],['','Nothing can get in. Everything out there knows it. For the four of you, that is what peace feels like.']],done)});

/* ---------- what the city says (on the night card) ---------- */
const K24_RUMOUR=['They say there is a house in the hills where the dogs do not bark, and a man went up the drive once to rob it, and the police found his car in the river with the seatbelt still done up.','They say if you sell a child in this city you get about a week. Nobody says who from.','They say there is a girl in a grey hoodie who does not show up on cameras. She does. Nobody watches the footage twice.','They say there is a man who sings in churches at night, and the next morning the priest does not come in.','They say a streamer with two million followers has never missed a shot, and the people who say it lower their voices, in case she is listening. She is.','They say the man who funds the shelters has a basement under his basement. They are wrong about the number of basements.','They say you should leave the city if you hear the dogs not barking. Some people have. They did not take their things.'];
const _nc24=nightCard;nightCard=function(L,cb){try{if(S&&S.phase!=='taken'&&!isLone()&&!(S.f&&S.f.abroad)&&Math.random()<.45){const t=K24_RUMOUR[(S.day*5+1)%K24_RUMOUR.length];L=(L||[]).concat([['','<i>'+t+'</i>']])}}catch(e){}return _nc24.call(this,L,cb)};

/* ---------- things to do, both POVs ---------- */
function k24Dinner(){spend();S.done.k24dinner=1;fr('r',3);fr('a',3);apply({aff:3});if(S.dark)calm(6);save();
 cut([['','Family dinner. Four plates, one long table, the hounds in a line by the wall like furniture that breathes.'],
  [RN,'Grace, y’all. Our Father who art downstairs, thank you for the meat, thank you for the work, thank you for the ones who had it comin’.'],
  [AN,'ronin.'],[RN,'Amen.'],
  ['','Angel talks about her week: a sponsorship deal, a fight with her editor, and a man on the east side who will not be bothering anyone. V asks which rifle. She tells him. He nods, the way you nod when someone tells you about a recipe.'],
  ['','Ronin talks about the choir. Misaki talks about a roof. V talks about a board meeting, and a cellar, in the same tone of voice.'],
  [k24Me(),k24M()?MV('this is the only table in the city where i don’t have to lie','this is the only table in the city where i don’t have to lie','This is the only table in the city where nobody has to lie.','This is the only table in the city where nobody lies, and if anybody else sat down at it they would never sleep again.'):'This is the only table in the city where nobody lies. I would not wish it on anyone else.'],
  ['','Dessert is Ronin’s crumble. Somebody laughs too loudly at something that would make a stranger be sick. The hounds lie down. It is the happiest hour of the week.']],hub,'#0c0806')}
function k24Hounds(){spend();S.done.k24hounds=1;if(S.dark)calm(8);apply({aff:1});save();
 cut(k24M()?[['','The pens, after midnight. You sit on the floor with your back to the wall and the hounds come, one at a time, and lie down around you in a ring, facing out.'],
  ['','Anything that came down those stairs now would have to come through them. Nothing ever would. That is the whole point of you sitting here.'],
  ['','The grey one puts her head on your boot. Her breathing is very slow. Yours slows to match it.'],
  ['hitmeuppp',MV('nobody can touch me here','nobody can touch me here. huh.','Nobody can touch me here.','Nobody can touch me here. I forgot what that felt like. I don’t think I ever knew.')]]
  :[['','The pens, after midnight. You sit with them the way you did in the first weeks, when they did not know yet whether they were going to live.'],
  ['','They do not need you to any more. They come anyway, all of them, and lie with their backs to you, facing the door.'],
  ['K9','(They are guarding you. You made them able to. You did not teach them to want to.)']],hub,'#06080a')}
function k24Clean(){spend();S.done.k24clean=1;fr('r',3);apply(k24M()?{edge:2}:{heart:-2});save();
 cut([['','Ronin calls at two. He needs a hand. He always says it like that: a hand.'],
  ['','His bathroom, the tiles already scrubbed once. Plastic sheeting, folded with care. Bleach in one bucket, enzyme cleaner in the other, a radio playing gospel at a respectful volume.'],
  [RN,'You get the grout, '+(k24M()?'darlin’':'Vee')+'. I’ll do the hard part. I like the hard part.'],
  ['','You do the grout. Ronin sings. It takes three hours. When you leave, the flat smells of lemons and nothing else, and Ronin makes you both a sandwich, and you eat it on his fire escape watching the sun come up.'],
  ['',k24M()?'You realise halfway through the sandwich that you are calm. Completely calm. Anyone else would still be throwing up.':'You notice that your hands do not shake. They have not shaken in years. You are not sure when you stopped needing them to.']],hub,'#0a0810')}
function k24Drive(){spend();S.done.k24drive=1;apply({aff:2});if(S.dark)calm(4);save();
 cut([['','The night drive. V at the wheel, the hounds in the back, the city sliding past the windows. '+(k24M()?'You ride shotgun with your hood up.':'Misaki rides shotgun with her hood up.')],
  ['','Down by the river a man in a good coat is talking to a girl who should be at home. He sees the van. He sees what is in the back of the van.'],
  ['','He walks away very fast. The girl stares after him. V slows down beside her and says, through the window, “Go home.” She goes.'],
  [k24Me(),k24M()?MV('we didn’t even stop','we didn’t even stop the car','We didn’t even stop the car.','We didn’t even stop the car. That’s what we are now. A shape that drives past.'):'We did not even stop. Sometimes the van is enough.'],
  ['','You drive until four. The city keeps its lights off where you pass.']],hub,'#05060c')}
const _side24=sideHub;sideHub=function(late){const o=_side24(late);try{if(k24Ok()){
  if(S.day%7===0||S.f.k24dinnerAny)o.push({t:'Family dinner at V’s',sub:'the four of you, the hounds by the wall',dis:S.done.k24dinner||(frT('r')<1&&frT('a')<1),fn:k24Dinner});
  o.push({t:'Sit in the pens with the hounds',sub:'after midnight',dis:S.slot<2||S.done.k24hounds,fn:k24Hounds});
  if(frT('r')>=1)o.push({t:'Help Ronin clean up',sub:'he needs a hand',dis:late||S.done.k24clean||S.slot<2,fn:k24Clean});
  if(tier()>=1)o.push({t:'The night drive',sub:'V, the hounds, the city',dis:S.slot<2||S.done.k24drive,fn:k24Drive})}}catch(e){}return o};
const _ds24=fr;fr=function(k,n){const r=_ds24.apply(this,arguments);try{if(S&&frT('r')>=1&&frT('a')>=1)S.f.k24dinnerAny=1}catch(e){}return r};

/* ---------- talk ---------- */
(function(){const vIns=o=>TOPICS_V.splice(TOPICS_V.length-1,0,o),mIns=o=>TOPICS_M.splice(TOPICS_M.length-1,0,o);
 vIns({id:'k24_safe',label:()=>'“why do i feel safe here”',show:()=>S.phase!=='taken'&&tier()>=1,run:b=>{warm('v','k24_safe',3);
  say([['K9','Because nothing in this city can reach you here. That is not a feeling. It is an arrangement I have spent eleven years making.'],['hitmeuppp','it should scare me. this house would scare anybody.'],['K9','It scares everybody. It was built to. You are simply not anybody.'],['hitmeuppp','...noted.']],b)}});
 mIns({id:'k24_others',label:()=>'“What do you think other people would see, if they lived here?”',show:()=>S.phase!=='taken'&&tier()>=1,run:b=>{warm('m','k24_others',3);
  say([['hitmeuppp',MV('a really nice kitchen','a nice kitchen and a lot of drains','A nice kitchen. Too many drains. Dogs that don’t sleep. A man who never raises his voice.','The nicest house they had ever seen, for about a week. Then they’d notice the drains. Then the dogs. Then us. They’d leave in the night and never tell anyone why.')],
   ['K9','And you?'],['hitmeuppp',MV('i see home','i see home. which is the scary part','I see home. That is the frightening part, if you think about it.','I see home. If I were anyone else, that would be the most frightening sentence I have ever said.')]],b)}})})();

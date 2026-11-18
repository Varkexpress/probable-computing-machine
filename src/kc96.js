/* ===KC96-BEGIN=== */
/* ===================== THE WAR: THE FOUR AT THE DOOR (kc96) =====================
   An infirmary expansion in a different form. Every other scene of the stay is told from inside Misaki's head or
   V's. These six are told from the kennel passage, by the hounds: what the stay is to four animals who were each
   brought to that bed once, who answer to two voices, and who can smell what neither of the two will say.
   The same text plays for either POV and under either aftermath setting. Needs kc73, kc76–kc95.

   How they are written:
     - third person, present tense, one hound at a time; no names (the grey hound, the black hound, the pale hound,
       the old hound);
     - a hound knows smell, sound, weight, heat and habit. It does not count past "many", read, or know what a book
       is. It has no word for why. It is never wrong about what is in front of it;
     - to the hounds V is "the tall one", which is what Misaki calls him in the delusion. To them it is the name of
       the one who cut the collar off. Misaki is "the small one";
     - what was done in the other building is never named. A hound smells "the other place" on the small one, and
       knows that place, because each of them came from one.
   Delivery: through hub(), while kdMed(), in the morning and afternoon slots, one a slot, ahead of this route's other
   infirmary scenes for that slot (S.f.e2l96 counts them; S.f.e2l96Slot). The sixth waits for the last day of the
   stay or for Misaki to be clear.
     1 the grey hound   the door handle
     2 the black hound  the stair
     3 the pale hound   under the bed
     4 all four         the bucket at the far wall
     5 the old hound    the tall one comes down at night
     6 the old hound    the door opens from the inside
   Rules: unnamed city, hounds unnamed, no new named characters. Notes: docs/notes_kc96.md. Test: node tools/k96_test.js */
const K96=()=>{try{return typeof K95==='function'&&K95()}catch(e){return false}};
const HN=t=>['',t];
const K96_T=['THE GREY HOUND','THE BLACK HOUND','THE PALE HOUND','ALL FOUR','THE OLD HOUND','THE OLD HOUND'];
const K96_S=[
 /* 1 · the grey hound */
 ()=>[
  HN('The grey hound is lying against the wall of the passage. On the other side of the wall there is somebody new.'),
  HN('She has had the smell since the tall one carried it in. Blood, some days old. Sweat that has dried and come again. Under those, a place. She knows the place. It has a hard floor, and men who laugh, and a van. She came out of a place like it with her jaw in two pieces.'),
  HN('The tall one has been at that door many times. He stands, and does not go in, and goes away. He smells of the room under the house, and of being sick. She does not understand a door that the tall one will not go through. There has never been one.'),
  HN('In the night a sound comes through the wall. It is very small. It is breath going in and being held, with nothing let out. She made that sound once, for many nights, on that bed. It is the sound of a thing that has learned that noise brings the men.'),
  HN('She gets up. The door has a handle. Handles go down if they are leaned on.'),
  HN('The small one is on the bed, in the corner of it, with its eyes open. It goes stiff when it sees her. She knows stiff. She was stiff when the tall one first put his hand out, and he kept his hand there, not moving, until her legs gave way from holding it.'),
  HN('She does not have hands. She has weight. She gets up onto the bed and lies down along the small one’s back, and lets all of it rest there.'),
  HN('The small one does not move. It is waiting to be bitten. That is right; she waited too. It takes as long as it takes. She shuts her eyes, so that it can see that they are shut, and breathes slowly, so that it has something to breathe against.'),
  HN('Much later the tall one’s voice comes through the gap of the door, low. “Come.” It is a word that she has never not answered.'),
  HN('She lifts one ear. She leaves her head where it is.')],
 /* 2 · the black hound */
 ()=>[
  HN('The black hound follows the tall one. That is what he is for. He has followed him since the day the chain came off his neck, to the door of every room, and waited outside it.'),
  HN('The tall one is wrong. He has been wrong for days. He walks loudly, who never made a sound. He kneels on stone. He stands at the glass of the small one’s door and his hands hang open, and the smell that comes off him is the smell that comes off a thing that is cornered.'),
  HN('Tonight the tall one gets up from the desk, and it is the old way of getting up. The black hound knows it. The coat. The key. The back stair. It is how the tall one goes when he is going down to the room with the steel in it, and the hound rises, pleased, because this at least he understands.'),
  HN('At the top of the stair the tall one stops.'),
  HN('He stops like something that has come to the end of a chain. He puts his hand on the rail. Then he folds, all the length of him, and sits down on the top step with his head hanging between his knees, and he smells of cold sweat and of the sink.'),
  HN('The black hound has never seen him sit on a floor. He does not know what is asked of him. He goes and stands against the tall one’s legs, close, so that the weight will hold him there. The tall one’s hand comes down on his neck, on the bare ring where the collar was, and stays.'),
  HN('He was sent at the small one once. In a yard, in the dark, with the others. He had its ankle in his mouth. Then it spoke, in the tall one’s own voice, and he let go, and sat. Since that night there have been two that he listens for.'),
  HN('They are on either side of a door now. One of them is afraid of the other. He can smell which. He cannot smell why.'),
  HN('He is a hound. It is not for him to choose. When the tall one can stand, the black hound goes down to the passage, and lies on the stone at the place where both of them can be heard, with his nose to the door and his tail to the stair.')],
 /* 3 · the pale hound */
 ()=>[
  HN('The pale hound does not like doors. She was kept behind one, in the dark, in a box inside a van, for longer than she had been alive before it. When the tall one opened the box she would not come out. He sat on the ground beside it for a day and a night.'),
  HN('So she watches the door of the small one’s room. It is not shut. It stands open by the width of a paw, and there is a light on behind it that is never put out. That is right. She approves of that. A room should have a way that the light comes in.'),
  HN('Tonight the bed is empty.'),
  HN('She can smell that the small one is still in there. It has gone low. She puts her head round the door and looks under the bed, and it is there on the floor, on its back, pressed up against the wall, with the steel of the frame just over its face.'),
  HN('She knows that, too. Under is good. Nothing can come down on a thing that is under. In the first days she lived beneath the bench in the kennel, and ate there, and the others walked round her.'),
  HN('Out in the passage the tall one is lying on the stone. All of him, flat, with his face turned sideways and his hands spread. He is looking under the bed from a long way off. He has made himself low. She has never seen him low. He smells of fear, and it is not for himself.'),
  HN('She looks at him. She looks under the bed. Nobody has told her anything.'),
  HN('She goes in, flat, on her belly, as she used to go under the bench. There is room. She fits herself in along the wall at the small one’s feet, where she is not touching it, and puts her chin on the tile.'),
  HN('The small one’s breath stops, and then goes on. After a time a foot moves, a little, until it is against her side. It is cold. She lets it stay.'),
  HN('There are three of them on the floor now: one under the bed, one beside it, and one out on the stone. Not one of them is making a sound. It is the quietest that the house has ever been, and she is not afraid in it.')],
 /* 4 · all four */
 ()=>[
  HN('The bucket has moved.'),
  HN('It has always come to the passage. At the end of the light the tall one brings it down and sets it on the stone, and they eat, and he stands over them. It has been so since each of them first could stand. It is the one thing in a day that is never different.'),
  HN('Now he carries it out. Through the yard door, in the rain, across all the grass to the far wall, where there is nothing. They go after him in a line. The grey hound keeps looking back at the house. The old hound is last, on three good legs and a bad one, and the wet grass pulls at him.'),
  HN('He sets it down by the wall. He says the word. They do not eat.'),
  HN('It is the right bucket. It is the right food; they can smell it, and it is the man with the anchor on his arm, who smelled of smoke. But it is in the wrong place, and the tall one is standing in the rain with water running off his face, and he does not smell as he smells when he feeds them. He smells as he did on the stair.'),
  HN('The black hound looks at the bucket and at him. The pale hound has sat down. They are waiting to be told what has gone wrong, so that they can not do it again.'),
  HN('“Eat,” he says. And then, which he has never said, “Please.”'),
  HN('They do not know that word. They know the voice. It is the one he used over the eleven, at the end, on the table, with his hand on their ribs.'),
  HN('The old hound goes forward and puts his head in the bucket. He is not hungry. He eats so that the others will. One by one they come, and eat in the rain, quickly, without pleasure, because the tall one needs it of them and none of them can tell what for.'),
  HN('Across the grass, in the house, a light is on in a room with no window. They can all hear, very faintly, that the one in it has stopped being sick.')],
 /* 5 · the old hound */
 ()=>[
  HN('The old hound sleeps across the door. He has done it every night since the small one was carried in. The stone is bad for his hip, and they have brought him a blanket, and he lies on the stone beside it.'),
  HN('He is the oldest thing in the house but the tall one. He was the first to lie on that bed. He has smelled every one that came after him: the grey with her jaw, the black with his neck, the pale one who would not come out of the box. And the eleven.'),
  HN('He knows the smell that the eleven had. It comes on the third night. It is sweet, and flat, and it is under the breath. When it comes, there is nothing that the tall one can do, though he sits up and does all of it.'),
  HN('He has had his nose to the gap under this door for many nights. It is not there. There is blood, and fear, and the sour of the bag on the stand. There is the other place, on the skin, fading. Under all of that there is a thing that is going on living, stubbornly, the way a root does.'),
  HN('He would know. He has never been wrong about it.'),
  HN('The tall one comes down in the night. He comes without noise, in the old way, and he has the room-under on him: steel, and soda, and the thing that he carries in his collar. He smells of a hand that is about to do something. The old hound has smelled that many times, and each time something on the table stopped.'),
  HN('The old hound gets up.'),
  HN('It takes him a long while. The back leg will not come under him. He gets it there. He stands in front of the door, all four feet on the stone, between it and the tall one, and he does not lower his head.'),
  HN('He has never stood against the tall one. He would not know how to bite him. He is only in the way. He is a very large thing to have in the way.'),
  HN('The tall one stops. They look at each other. The hound can smell the hand change: the steel going out of it, and the other thing coming, the sick, sour one, that the tall one has smelled of at this door every night.'),
  HN('The tall one sits down on the floor of the passage. He puts his face in his hands.'),
  HN('He was never going to. The old hound knew it on the first night, before the tall one did; it was in the way that he carried the small one, with the hands held as they are held under a thing that might spill. But the tall one needs to come down the stair and find out, each time. So each time the old hound will get up.'),
  HN('He lowers himself again, a joint at a time, across the foot of the door, and puts his chin in the gap.')],
 /* 6 · the old hound, again */
 ()=>[
  HN('The handle goes down from the inside.'),
  HN('All four of them hear it. The grey hound is on her feet first. The black hound stays where he is, with his nose to the door, and it opens over him.'),
  HN('The small one is standing in it. It has a hand on the frame, and a thing on a wheeled stand that comes with it, and it is the first time that any of them has seen it upright. It is not much taller standing than the old hound is at the shoulder.'),
  HN('It smells different. The sour of the bag is nearly gone. The other place is nearly gone. What is there now is soap, and anger, and the small one itself, which the old hound has had in his nose since a night at the kennel gate when a hand came through the bars with meat in it.'),
  HN('It looks at them. It says something. It is one short sound, pushed out, like a bark: the sort of noise that is made on purpose to startle.'),
  HN('At the far end of the passage the tall one has stopped dead. He has a jug in his hands. The old hound hears his heart from there. It is going as it went on the night of the stair, and there is no steel in the smell at all.'),
  HN('The tall one bends, and sets the jug down on the stone, very carefully, with both hands, like something that he has only just been trusted with.'),
  HN('The small one takes a step. Its legs are bad; the old hound knows about bad legs. It takes another. The grey hound goes to one side of it and the pale hound to the other, not touching, close enough to be leaned on if it should choose.'),
  HN('The old hound gets up. It is easier this morning. He walks in front, slowly, at the pace that his hip sets, which is the pace that the small one can keep.'),
  HN('He does not know where they are going. Up, he thinks. There is a room up there with a way out of it on every side. The tall one chose it days ago and has been airing it.'),
  HN('Behind them, the tall one picks up the jug and follows, four steps back. He has always walked in front of them. The old hound does not look round. He has both of them in his nose, the one before and the one behind, and for the first time since the rain there is nothing between the two smells that needs him to lie down in it.')]];

/* ===================================== DELIVERY ===================================== */
function k96Next(){try{if(!S||!S.f||!K96()||dlg||typeof kdMed!=='function'||!kdMed())return null;const f=S.f,slot=S.slot||0,cur=S.day+'/'+slot;
 if(slot>1||f.e2l96Slot===cur)return null;const n=f.e2l96||0;if(n>=K96_S.length)return null;
 if(n===K96_S.length-1){const m=S.kd.med;if(!((m.clar||0)>=2||(m.d||0)>=2))return null}
 return cb=>{f.e2l96=n+1;f.e2l96Slot=cur;f.e2l80Slot=cur;save();
  go({draw(){rect(0,0,W,H,'#020203');const t=(typeof T==='number'?T:0);rect(100,112,120,1,'rgba(200,184,144,'+(0.3+0.12*Math.sin(t/37))+')');rect(100,113,120,3,'rgba(200,184,144,.05)');
   txt(K96_T[n],160,74,'#b9b0a4',14,'center');txt('the kennel passage',160,92,'rgba(185,176,164,.4)',8,'center')}});
  say(K96_S[n](),cb)}}catch(e){return null}}
const _hub96=hub;hub=function(){const a=arguments,self=this;try{const s=k96Next();if(s)return s(()=>_hub96.apply(self,a))}catch(e){}return _hub96.apply(self,a)};

/* ===================================== ENDINGS ===================================== */
const _xe96=extraEnding;extraEnding=function(){const L=_xe96();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const n=S.f.e2l96||0;
 if(n>=5)L.push('The old hound stood between V and the infirmary door one night, on a bad hip, with his head up. He had known since the first evening that V would not do it. He got up each time anyway.');
 if(n>=6)L.push('When Misaki walked out of the infirmary, the old hound went in front, at the pace his hip allows, and V followed four steps behind. He had always walked ahead of them.')}catch(e){}return L};
/* ===KC96-END=== */

/* ===KC107-BEGIN=== */
/* ===================== THE WAR: OF COURSE (kc107) =====================
   More angst during the delusion, at the author's direction, with the characterization taken from the author's
   text samples (docs/voice_sample.md). Needs kc73, kc76–kc106.
   Sixteen scenes in kc85's player-opened pool (now 91). Misaki believes that the tall one is K9, who has bought
   them and means to kill them; they never warm to him. The samples give each of them their working voice, and here
   the voices are turned on the room:
     Misaki: the job done in numbered steps (“One… Two… Three, and this they will believe wholeheartedly”), “Life
       can be so unfair”, “et cetera, whatever”, the fear that runs “bam-bam-bam” under it, and “(They have to.)”
     V: the table, “merely… crude, but serviceable”; “Justice,” with the twitch of a smile; “I find that your kind
       say that about me, often”; “Now, shall we get to work?”; a fine platter for his animals; some deaths must be
       long-suffering. Each of these is now something that Misaki has heard about, and fears, and V hears himself say.
     Angel: “None of them can say they didn’t have it coming.” Ronin: “This one’s mine to kill.”
       Misaki overhears both, through a wall, and takes them for themselves.
   Same text under both aftermath settings: nothing touches the hours, and the doctor does not appear.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via M2 and they/them.
   Notes: docs/notes_kc107.md. Tested in tools/k86_test.js and tools/k107_test.js. */
const K107=()=>{try{return typeof K106==='function'&&K106()}catch(e){return false}};

/* ===================================== MISAKI, CELL ===================================== */
k86('p7_job','m',null,'cell','Treat it like a job',[
 N('Oh, fuck. You have really gone and done it this time.'),
 N('You have expected all sorts of shit in your line of work. Bomb threats. A chainsaw that cuts out halfway down a throat. Clients who pay in chickens. Et cetera, whatever. Being bought, at a discount, by the one man in the city who has your name in ink, is a new one.'),
 M2('(ok. inhale. exhale. u can do this. it’s a job. jobs are cut and dry)','(ok. inhale. exhale. you can do this. it’s a job. jobs are cut and dry)'),
 M2('(one: find the door. two: find the hand that opens it. three, and this u believe wholeheartedly: the guy’s got it coming)','(one: find the door. two: find the hand that opens it. three, and this you believe wholeheartedly: the guy has it coming)'),
 N('It is something so small. It is only a matter of getting out of one room. You have got out of worse rooms. It is muscle memory.'),
 N('And then it is not small at all. Then it is your life on the line, and you are fucking terrified, heart-in-throat, bam-bam-bam, and it is all fear: what if he comes back, what if the door, what if you never, what if —'),
 M2('(this is no different. this is NO different)','(this is no different. this is no different)'),
 N('You try the job anyway. You get as far as two. The hand that opens the door is his, and it is the only hand in the building, and it brings you soup.'),
 M2('(three. three. what’s three. three was the part where u win)','(three. three. what is three? three was the part where you win)'),
 N('There is no three. You lie there with one and two and the bam-bam-bam, and nothing after it, for an hour, which is the longest you have ever gone without a plan.'),
 N('It is different. You lie there with your one hand flat on the blanket and know it. On every other job you were the one with the rifle.')]);
k86('p7_unfair','m',null,'cell','Life can be so unfair',[
 N('Life can be so unfair. Seriously.'),
 N('You go through it, lying there, like a client going through an invoice. What did you do? You shot a man at a dinner. You shot a doorman, which was his own fault for standing there. You put a round through a glass in a billionaire’s hand. Fine. Fine! You did things.'),
 M2('(but the van guys didn’t take me for the DOORMAN. they took me bc i was carrying tins. they took me bc i was THERE)','(but the van men didn’t take me for the doorman. they took me because i was carrying tins. they took me because i was there)'),
 N('You can do pain. What gets you is that nobody in that building gave a single shit what you had done. They did not read your file. They did not have a reason.'),
 N('He has a reason. He has a whole ledger of reasons. Of all the people who could have ended up with you, you got the one man who will read the charges out first.'),
 N('You think about the man on his step on a Tuesday, with his daughter holding his hand. He did not know why either. You never told him. You never told any of them.'),
 M2('(so that’s what it’s like. ok. ok. that’s what i did to them. i was the van)','(so that’s what it is like. ok. ok. that’s what i did to them. i was the van)'),
 M2('(lucky me. totally. that’s me, the luckiest person in the city. gets to know WHY)','(lucky me. totally. that’s me, the luckiest person in the city. gets to know why)')]);
k86('p7_justice','m',null,'cell','Ask him what he gets out of it',[
 N('You have to know. It has been eating you for four days, under everything else.'),
 Ms('what the fuck do u get out of this','What the fuck do you get out of this?','You point at him, and the room, and the drip, and the bed, and spread your good hand: why? What for?'),
 N('He looks at you for a moment. Then he says it. One word, low, with a smile that twitches at the corner of his mouth and does not finish.'),
 K76V('Justice.'),
 N('Everybody in the server has heard about that word. Ronin told it as a story at the bowling alley, doing the voice, and you laughed so hard you choked on a chip. It is what he says to the things on his table. It is the last word they hear.'),
 M2('(oh. oh, that’s me. i’m the thing on the table. i’m the aberration in his little story)','(oh. oh, that’s me. i’m the thing on the table. i am the aberration in his little story)'),
 N('You think of the things he says it to. You have seen the pictures; Ronin had one on his phone, and passed it round, and you looked. Cubes. Neat. A man who had kept children in a container.'),
 M2('(i’m in the same column as HIM. the container guy. that’s the column i’m in)','(i’m in the same column as him. the container man. that’s the column i’m in)'),
 N('He picks up the tray and goes. You lie there and try to laugh at it the way you laughed at the bowling alley, and what comes out is not a laugh.')]);
k86('p7_kind','m',null,'cell','Tell him he is insane',[
 N('You decide to say it to his face. Why not. He is going to do whatever he does anyway.'),
 Ms('ur fucking insane','You’re fucking insane.','You tap your temple with your good hand and point at him, hard, three times.'),
 K76V('I find that your kind say that about me, often.'),
 N('He does not even look up from the drip. He says it the way a man says a thing he has said a hundred times, to a hundred people, on their backs.'),
 M2('(my KIND. i’m a kind now. i’ve been sorted. there’s a whole kind and i’m in it and they all end up the same)','(my kind. i’m a kind now. i have been sorted. there is a whole kind, and i’m in it, and they all end up the same)'),
 N('He says it without any heat at all, the way a clerk says a file number.'),
 N('You have been a lot of things to a lot of people. Contractor. Kid. Scalper. Babe, once, to somebody, for about a month. You have never been a kind. You lie there being one, and it is the loneliest thing that has ever been said to you.')]);
k86('p7_work','m',null,'cell','“Now, shall we get to work?”',[
 N('He comes in with the tray of dressings, and the scissors, and the bowl, and sets them down on the steel, and pulls on the gloves.'),
 K76V('Now. Shall we get to work?'),
 N('You know that sentence. Everybody knows that sentence. It is the one that comes before. Ronin said it at the bowling alley in his voice, deep and posh, and Angel did a little scream.'),
 M2('(one: don’t scream. two: DON’T scream. three: oh fuck, oh fuck, he said the line, he said the LINE)','(one: don’t scream. two: don’t scream. three: oh, fuck. oh, fuck. he said the line. he said the line)'),
 N('Everything you have ever heard about him comes up at once, in Ronin’s voice, doing the impression, and the bowling alley laughing, and you laughing loudest.'),
 N('Your whole body goes flat to the mattress. You stop breathing. You look at the scissors.'),
 M2('(this is it. this is it. it’s the hand first, it’s always the hand first, ronin said)','(this is it. this is it. it’s the hand first. it’s always the hand first, ronin said)'),
 N('He does the dressings. The wrists, the hand, the strapping, in order, quick and exact. Then he takes the gloves off and goes. You lie there for an hour waiting for the rest of the sentence, and it never comes, and that does not help at all.')]);
k86('p7_platter','m',null,'cell','A fine platter',[
 N('You know what he does with them, after. Everybody does. Pretty cubed pieces, stacked one on another, for his animals. Waste not, want not. He is proud of it.'),
 N('You lie there at feeding time and do the sum. You are not big. You have never been big; there was not enough food, for years, to be big.'),
 M2('(eighteen kilos, maybe, of anything worth cubing. that’s what, two days for four dogs. three if they’re dainty. they are not dainty)','(eighteen kilos, maybe, of anything worth cubing. that’s what, two days for four dogs? three, if they’re dainty. they are not dainty)'),
 N('You are going to be two days of dog food. That is the total. You were going to be a pilot once. You were third at regionals. You are going to be stacked on a plate in pretty pieces and the old hound is going to eat you on a Thursday and lick the bowl.'),
 N('Nobody will know. That is the part that sits on your chest. There will not be a body. There will not be a funeral, or a stone, or a line in the paper. Angel will never find out which Thursday.'),
 M2('(at least he’ll be careful with the cuts. at least it’ll be NEAT. great. that’s what i wanted out of life. to be neat)','(at least he’ll be careful with the cuts. at least it’ll be neat. great. that is what i wanted out of life. to be neat)'),
 N('Through the wall something heavy lies down against the stone and sighs, full. You turn your face away from the wall.')]);
k86('p7_coming','m',null,'cell','They had it coming',[
 N('There are voices on the other side of the wall. The passage. A man, low, and a woman, higher, sweet, a voice you would know anywhere, with a camera voice on top of it and something underneath.'),
 N('Angel. It is Angel. She is out there, in this building, talking to him.'),
 N('You cannot make out most of it. You get one sentence, very clear, because she says it in the voice she keeps for the ones she means.'),
 N('“None of them can say they didn’t have it coming.”'),
 M2('(none of them. none of WHO. me? is it me? is she talking about me)','(none of them. none of who? me? is she talking about me?)'),
 N('She is in on it. She has always been in on it. She sat at the bowling alley and did your nails and laughed at your jokes and the whole time she was keeping a list, and you were on it, with a line under you.'),
 M2('(no. no. that’s angel. she wouldn’t. she — she totally would. that’s the whole thing about angel. she totally would if u had it coming)','(no. no. that’s angel. she wouldn’t. she — she totally would. that is the whole thing about angel. she totally would, if you had it coming)'),
 N('You think of her at the bowling alley with your hand in hers, doing the nails, black, and blowing on them. You think of every time she said “babe”.'),
 M2('(she was counting. she was counting the whole time. i’d have counted too)','(she was counting. she was counting the whole time. i would have counted too)'),
 N('You lie there all night going through every time you were rude to her. There are a lot. You never once thought that she was counting.')]);
k86('p7_mine','m',null,'cell','“This one’s mine”',[
 N('Ronin. That is Ronin’s voice in the passage. You would know it in a stadium. He is arguing with the tall one, and losing, and swearing about it.'),
 N('Then, very clear, through the door, in the voice he uses when he means it: “This one’s mine to kill.”'),
 N('Your heart goes. Bam-bam-bam. You have heard him say that before. In a warehouse, about a man with a crowbar round his neck. He said it close, so close that the man was the only one who heard it.'),
 M2('(he’s here for me. he’s fighting k9 for the right to do me. that’s so — that’s so RONIN. i’m being fought OVER)','(he’s here for me. he’s fighting k9 for the right to do me. that’s so — that’s so ronin. i am being fought over)'),
 N('Then it stops being funny. Ronin is the one who would come. Ronin was the whole plan. If Ronin is out there arguing for a turn, there is nobody left in the city on your side of the door.'),
 N('You lie there and do not know whether to be insulted or flattered. You go back and forth all night. Both of them want you dead, and they are arguing about whose.'),
 N('(He means the four. He means the man with the boot. You will not find that out for a week, and when you do, you will not tell him that you thought it, ever.)')]);
k86('p7_dumpling','m',null,'cell','Nobody’s sugar honey dumpling',[
 N('You used to have a name for the person you would save. You never got to use it on anybody for very long. Sugar honey dumpling. You said it with a straight face, and it made people laugh, and then it made them stay.'),
 N('You try to think who would come for you now. The way you would go for them: rooftop, machine gun, chainsaw first, a double-tap because it never hurts.'),
 M2('(angel. maybe. if she’s not on HIS side. ronin. if he’s not fighting for a turn. nobody else. there was never really an anybody else)','(angel. maybe. if she isn’t on his side. ronin. if he isn’t fighting for a turn. nobody else. there was never really an anybody else)'),
 N('You were always the one who came. That was the job. Somebody you liked got stuck, and you went in shot-for-shot and chopped the long limp body up and undid the knots, and they laughed, and you laughed.'),
 N('You lie and think about the last person you said it to. They left. Everybody does, after about a month; you have never minded. You mind now. You mind so much that you have to put the good hand over your mouth.'),
 N('Nobody is coming to undo your knots. Nobody is going to call you anything at all. You lie there, nobody’s sugar honey dumpling, and say it to the ceiling once, in your own voice, just to hear it.'),
 M2('(they’ll save me. they have to. …they have to?)','(they’ll save me. they have to. …they have to?)')]);
k86('p7_whatever','m',null,'cell','Et cetera, whatever',[
 N('You decide to be cool about it. If he is going to do it, he is going to do it, and you are not going to give him a scene.'),
 N('You rehearse. You lie there and practise it, the way you would practise a delivery to a client. Flat voice. Shrug. Something devastating as a last line.'),
 M2('(“yeah, whatever. et cetera. go nuts, ur honour.” no. too long. “whatever.” better. shrug on the whatever)','(“yeah, whatever. et cetera. go nuts, your honour.” no. too long. “whatever.” better. shrug on the whatever)'),
 N('You say it out loud, to the ceiling. “Whatever.” It comes out cracked. You try again. It cracks again, in a different place.'),
 M2('(come ON. u’ve been cool in front of a guy with a nail gun. u can be cool for a rich man in his shirtsleeves)','(come on. you have been cool in front of a man with a nail gun. you can be cool for a rich man in shirtsleeves)'),
 N('Because it is not whatever. That is the problem. You are twenty-something and you have a truck and a cactus and a list of things you were going to do, and none of it is whatever, and you cannot make your voice pretend that it is.'),
 N('You practise until three in the morning. You cannot get through the one word without your voice going. In the end you lie there with your mouth shut, because that is the only way you can make sure that nothing comes out of it that is not cool.')]);

/* ===================================== V ===================================== */
k86('v7_table','v',null,null,'Merely a room',[
 N('You look at the infirmary from the door, as you would look at any room you had built.'),
 N('It is merely a room. Tile, a drain, a lamp on an arm, a bed with rails. It is crude, but serviceable. It is all that you need.'),
 N('You stop. You have said those words before, in your head, in that order, about another room, under this one. You have said them about the table.'),
 K76V('(Merely made of metal. Crude, but serviceable. Equipped with straps and drains.)'),
 N('The bed has rails. You chose them; a fevered thing falls. The floor has a drain; you chose that too; things are spilled. You built this room with the same hand, the same eye, the same small pride in a thing that does its job.'),
 K76V('(I took pride in it. I stood in the door on the first night and was pleased with the lamp.)'),
 N('Inside it, a person who knows what you are lies on their side and watches the door. You see the room for a moment as they see it: exactly the same as the other one, with a bed where the table should be. You do not have an answer for them. You built it.')]);
k86('v7_justice','v',null,null,'“Justice”',[
 N('“What the fuck do you get out of this?”'),
 N('Every one of them asks. You have been asked on your table perhaps forty times, by things with their stomachs open, in that exact order of words. You have the answer ready. You have always had the answer ready.'),
 K76V('Justice.'),
 N('It comes out of your mouth with the little twitch at the corner that it always has. You feel the smile arrive. It is the smile you give a thing on the table at the end, because there is a perverse pleasure in it, and you have never pretended that there is not.'),
 N('You see their face. They have heard about the smile. Everybody has. You watch them understand that they are the thing on the table.'),
 K76V('(It was habit. I gave them my last word for the wicked, with my last face for the wicked, because they asked in the words that the wicked use.)'),
 N('They do not look away. They look at the smile until it has gone, as if to remember it, and then they turn their face to the wall, slowly, as the things on the table never can.'),
 N('You pick up the tray and go. In the passage you put your hand over your mouth, to feel what it is doing, and it has stopped, and you are not sure that you can trust it again.')]);
k86('v7_kind','v',null,null,'“Your kind”',[
 N('“You’re fucking insane.”'),
 K76V('I find that your kind say that about me, often.'),
 N('It is out before you have looked at who said it. It is the line. You have said it to men with their guts on the steel, as a courtesy; they are owed a little conversation at the end.'),
 N('You look round. It is them, on their back, with the drip in their arm, tapping their temple at you.'),
 K76V('(I have sorted them. Into the kind. With the man who kept children in a container and the man who sold cut medicine. I did it without thinking, as one sorts post.)'),
 N('They do not answer you. They take their hand down from their temple and put it under the blanket, and lie still, and you understand that they have just been filed, and that they know it, and that you did it in your table voice.'),
 N('You finish with the drip. You go up to the study and open their page, MISAKI, WANTON, COLLATERAL: SEVERAL, and look at it until the lamp hums, and do not know what kind they are, and that is the first time in eleven years that the ledger has not been able to tell you.')]);
k86('v7_work','v',null,null,'Before the dressings',[
 N('You set out the tray. Scissors, gauze, the bowl, the tape. You pull on the gloves, and before you have thought about it, as you have said it every time for eleven years before a piece of work:'),
 K76V('Now. Shall we get to work?'),
 N('They go flat. The whole body, at once, to the mattress. They stop breathing. Their eyes go to the scissors and stay there.'),
 K76V('(The line. I have said the line. They have heard of the line. Of course they have; Ronin does an impression of it.)'),
 N('You do the dressings. Quickly, exactly, in order, and you say nothing else, because anything else would be the second half of that sentence.'),
 N('When you take the gloves off, their eyes follow your hands all the way to the bin, and stay on the bin, as if the gloves might come back.'),
 N('Afterwards you stand in the scullery with the gloves still on. You have said those words before every piece of work you have ever done. You will need new words, for everything, now. You cannot think of any.')]);
k86('v7_platter','v',null,null,'The four, cubed',[
 N('You cube the meat for the hounds at the kitchen table, as you do every Thursday. It is beef. It will be beef for some weeks.'),
 N('You think about the four while you do it. You think about them in detail, with pleasure, which you have never pretended is anything else.'),
 K76V('(A quick death is merciful. It puts a dark thing down. Some do not deserve one. Some deaths must be long, in proportion to the hurt.)'),
 N('You have the four pages ready. The bald one first: he laughed. You know how long that will take, and what he will say at the end, because they always say it, and what you will say back. Then there will be a fine platter, and the hounds will have deserved it.'),
 K76V('(It is beef. I could tell them so. In that room it would be the most frightening sentence I have ever said.)'),
 N('Through the floor you hear them breathing, quick, the way they breathe at feeding time. They think the platter is them. They have thought so all week.'),
 N('You put the knife down. The one person you most want to tell about the four is lying downstairs, sure that they are on the menu.')]);
k86('v7_hearts','v',null,null,'Angel’s stream',[
 N('Angel streams from your kitchen at midnight, because she cannot sleep, with the camera on her face and nothing else in the frame.'),
 N('She asks for leads. She has asked every night. Hearts and shocked faces tunnel up the side of the screen, and the comments fill with sightings: a van, a man, a place by the river. She reads every one aloud in Maria’s soft, practised voice.'),
 N('When it ends she sits with the phone face down. She does not have Maria’s face on any more.'),
 [AN,'forty thousand people looked for them. you know how many are going to visit.'],
 K76V('None.'),
 [AN,'none. because none of them knew who i was talking about. just “my friend”. they didn’t even get a name.'],
 N('Angel goes home at four without her coat. You find it on the chair in the morning. In the pocket there is a list of every hospital in the city with a line through each, and at the bottom, in eyeliner, because she had no pen: “not dead. not dead. not dead.”'),
 N('You know what is downstairs, lying awake, sure that nobody is looking. You cannot tell them about the forty thousand. In that room it would be one more thing that the man with the tray says.')]);

/* ===================================== ENDINGS ===================================== */
const _xe107=extraEnding;extraEnding=function(){const L=_xe107();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const F=S.f.e2l85||{};
 if(F.p7_justice||F.v7_justice)L.push('In the infirmary Misaki asked V what he got out of it. He said “Justice,” with the smile, out of habit, and it was the worst thing he has ever said to them.');
 if(F.p7_work||F.v7_work)L.push('V no longer says “Now, shall we get to work?” He has not found new words.');
 if(F.p7_coming)L.push('Through a wall, Misaki heard Angel say that none of them could say they did not have it coming, and thought for a week that it was about them.');
 if(F.p7_mine)L.push('“This one’s mine to kill.” Ronin meant the man with the boot. Misaki has never told him what they thought he meant.')}catch(e){}return L};
/* ===KC107-END=== */

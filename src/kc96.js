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
k86('q_case','m',null,'cell','Case the room',[
 N('You do it as you would do it for a job, because it is the only way you know of looking at a room.'),
 N('One door, opening in. A glass panel, so he can look before he enters. A lamp on a jointed arm, bolted down. A counter, with drawers; you have heard metal in them. No window. A light in the ceiling, green, that does not go off.'),
 N('And a drain. It is in the middle of the floor, with a brass cover, and the tiles all run down to it.'),
 M2('(there’s a DRAIN. u know what kind of room has a drain)','(there’s a drain. you know what kind of room has a drain)'),
 N('You do know. You have used one. A man hires a unit with a drain when he means to be some time about it and wants to hose down after.'),
 N('It is good work, and you cannot get round it. Everything is where a careful person would put it. Nothing in reach of the bed would go through a shirt. He walks loudly, so you never have the half-second of hearing him late. Whoever set this room up has done it before, often, and has thought about you in particular.'),
 M2('(ok. he’s good. i HATE that he’s good. i had him down as a rich guy with a hobby)','(ok. he’s good. i hate that he’s good. i had him down as a rich guy with a hobby)'),
 N('You give it marks, as you would a rival’s job. Eight out of ten. You take off two for the toothbrush on the counter, which has a frog on it. That is just sick.')]);
k86('q_alive','m',null,'cell','Why you are not dead',[
 N('It is the professional question, and you are a professional. He swore it in April. He has had you for days. You are flat on your back with one hand. So why is there still a you?'),
 M2('(one: he wants something. names, money, whatever. two: he likes it slow)','(one: he wants something. names, money, whatever. two: he likes it slow)'),
 N('You have read about him. Everybody has. Some of his go quickly, and some of them he keeps a while, and the papers say that the difference is what they did. You go through what you did. It is not a short list. It has a doorman on it.'),
 M2('(three: …oh. oh, fuck. three)','(three: …oh. oh, fuck. three)'),
 N('He said it once, in the server, as if it were something to be proud of. He has never killed a thing that was not well.'),
 N('So that is what the soup is for, and the thread, and the lamp, and the bag on the stand. He is getting you ready. He wants you on your feet, with both hands, able to know what is happening and why, and then he will do it properly.'),
 M2('(he’s FATTENING me. i’m a goose. i’m a goose in a basement)','(he’s fattening me. i’m a goose. i’m a goose in a basement)'),
 N('It is nearly funny. You would laugh, if the ribs allowed. You decide to be a bad goose. When he looks at the hand you let it lie there like a dead fish. When he asks about the pain you give him a nine. You can stay sick for as long as it takes to think of something.'),
 N('He writes down nine. He looks at you over his glasses for a second longer than he needs to. You have a bad feeling that he has had a goose try this before.')]);
k86('q_collar','m',null,'cell','Where he keeps it',[
 N('You watch his hands. It is the first thing you learned and the last thing you will give up.'),
 N('They are big, and very clean, and they do not shake. He ties off a dressing as some people shuffle cards. You have seen what those hands do; he sent you forty minutes of it once, at three in the morning, to make a point.'),
 N('Today he leans over to see to the bag, and his collar comes open an inch, and you see it. A flat steel handle, lying along the inside of the collar, on the left. That is where it lives. He would draw it with the right, across.'),
 M2('(got u. left side. cross-draw. that’s a full second, ur honour. i can do a lot in a second)','(got you. left side. cross-draw. that’s a full second, your honour. i can do a lot in a second)'),
 N('You file it. You have a list now: four steps from the door to the bed; the lamp arm, which would come off its bolts with enough weight; the collar. It is a plan with no hands in it yet, but you have been in worse shape with less.'),
 N('He straightens up. He does up the collar button, without hurry, looking at the bag and not at you.'),
 M2('(he saw me look. he SAW me. and he just did up the button. like u’d shut a drawer)','(he saw me look. he saw me. and he just did up the button, like you’d shut a drawer)'),
 N('A man who is afraid of you moves the knife. He left it where it was.')]);
k86('q_charge','m',null,'cell','Make him say what it is for',[
 N('He does not gloat. That is wrong. You have known men who had somebody in a room, and you have been one, and there is always a speech.'),
 N('You want the speech. You know where you stand with a speech. So when he comes with the tray, you ask for it.'),
 Ms('the doorman. that’s what this is for. right','The doorman. That’s what this is for, right?','You make the shape of a door with your good hand, and a man standing in it. Then a finger across your own throat, and you raise your eyebrows at him.'),
 N('He puts the tray down. He looks at the bad hand, on the blanket, for some time.'),
 N('He says that this is for the hand. He says that the doorman is a separate account, and that it will keep.'),
 M2('(liar. it’s ALWAYS for something. nobody does all this for free)','(liar. it’s always for something. nobody does all this for free)'),
 N('Then you hear what you have just thought, and you go cold from the neck down.'),
 N('He does. He does everything for free. It is the whole of what is wrong with him. He does not have a client to answer to, or a price that somebody could beat, or a job that is over when the money clears. There is nobody you can ring. He is doing this because he thinks it is right, and you have never in your life been able to talk a man out of that.'),
 M2('(i can’t even BRIBE him. what kind of sicko can’t be bribed)','(i can’t even bribe him. what kind of sicko can’t be bribed?)')]);
k86('q_free','m',null,'cell','What you would have fetched',[
 N('You do the sum, because sums are yours and nobody can get into them.'),
 N('A contractor, mid-career, no dependants, known to carry. If a client had come to you wanting somebody like you done, you would have quoted six thousand, and asked for half up front on account of the risk.'),
 N('Nobody has paid six thousand. Nobody has paid anything. You are going to be killed in a basement by a volunteer.'),
 M2('(i’m getting done for FREE. i charge nine hundred for a card man and i’m going for NOTHING)','(i’m being done for free. i charge nine hundred for a card man, and i’m going for nothing)'),
 N('It is an insult, apart from everything else. Somebody ought to have wanted it enough to pay. You have left men in car parks who had three different people chipping in.'),
 M2('(life is so unfair. seriously. i’d have paid more than that to do HIM)','(life is so unfair. seriously. i would have paid more than that to do him)'),
 N('You hold on to that for as long as you can, because while you are angry about the money you are not doing the other thing. Then the light changes under the door, and there are the shoes in the passage, and you are doing the other thing.'),
 M2('(one: breathe. two: hands where he can see. three: he hasn’t done it yet. four: he hasn’t done it YET)','(one: breathe. two: hands where he can see them. three: he hasn’t done it yet. four: he hasn’t done it yet)')]);

/* ===================================== MISAKI: THE ROOM IS A ROOM ===================================== */
k86('q_rep','m',null,'clear','You have a reputation',[
 N('You have had time to go over it. All of it. The good voice, and the hands on the blanket, and at least once the word “please.”'),
 M2('hey. ur honour. c’mere','hey. your honour. come here'),
 N('He comes to four steps and stops, as he does.'),
 M2('u tell ANYONE i said please, and i’ll do u in ur own kitchen. i’ve got a reputation. i’ve got CLIENTS','if you tell anybody that i said please, i’ll do you in your own kitchen. i’ve got a reputation. i’ve got clients'),
 K76V('I have told nobody. It is evidence of nothing but injury.'),
 M2('don’t be DECENT about it. i hate when ur decent, it’s creepy. u had me in a room for a week going yes sir no sir. that’s the best blackmail in the city and ur just SITTING on it','don’t be decent about it. i hate it when you’re decent, it’s creepy. you had me in a room for a week saying yes sir, no sir. that’s the best blackmail in the city, and you’re just sitting on it'),
 K76V('I do not blackmail. I kill. You are confusing me with some other profession.'),
 M2('…ok that’s more like it','…ok. that’s more like it'),
 N('You lie back. Your ribs hurt from shouting. He is still standing there, looking at you as he looks at a thing that he means to deal with later, and it is the first time in a week that anybody has looked at you as if you were dangerous.'),
 M2('what r u staring at. go kill a landlord','what are you staring at? go and kill a landlord'),
 K76V('I am the landlord.'),
 M2('I KNOW. get OUT','I KNOW. get out')]);
k86('q_book','m',null,'clear','Ronin has brought the book',[
 N('Ronin has a notebook with a rubber band round it. It is the book. He has been running it since April, on which of you does the other first, so that he does not have to drive over and find out.'),
 [RN,'You wanna know your odds?'],
 M2('no. …yeah','no. …yeah'),
 [RN,'You were six-to-four on. Kid with a rifle versus an old guy with a hobby, I liked you. Then you went an’ got yourself grabbed by amateurs. You’re eleven-to-one.'],
 M2('ELEVEN','ELEVEN?'),
 [RN,'You got one hand an’ you’re in his basement. I’m bein’ generous.'],
 M2('put ninety on me','put ninety on me'),
 [RN,'You got ninety bucks?'],
 M2('i’ve got exactly ninety bucks. it’s in my boot. he took my boots. tell him i want my boot','i’ve got exactly ninety bucks. it’s in my boot. he took my boots. tell him that i want my boot'),
 N('He goes out. There is some talk in the passage. He comes back with the boot, and you get the notes out of the lining with your teeth, and count them onto the blanket.'),
 [RN,'Ninety at elevens. That’s a thousand bucks if you kill my friend.'],
 M2('nine ninety. plus the stake back. don’t rob me','nine ninety. plus the stake back. don’t rob me'),
 [RN,'Fuck me, the hand’s broke an’ the math ain’t.'],
 N('He writes it in. He is grinning with all of his teeth. He has just taken your last ninety dollars against the life of the man upstairs, and you are grinning back.')]);
k86('q_four','m',null,'clear','Who gets the four',[
 N('Angel has not sat down. She has a list on her phone, and her other hand is on the strap of a long bag that you know the shape of.'),
 [AN,'four of them. i’ve got names for three. i’m not asking, babe. i’ve got a shotgun and a free afternoon.'],
 M2('they’re MINE','they’re mine'),
 [AN,'you’ve got one hand.'],
 M2('so i’ll do them SLOW. they’re mine, angel, i was THERE','so i’ll do them slowly. they’re mine, angel. i was there'),
 [RN,'I want the one with the boot. I already said. I called it Tuesday.'],
 N('V is in the door. Nobody heard him, which means that he wished to be heard and you were shouting.'),
 K76V('They are mine. They took a debtor of mine out of my hands and damaged it. By any law that I keep, the claim is prior.'),
 M2('i’m not ur DEBTOR, i’m the — ok i am. but that’s OUR thing. u don’t get them off the back of it','i’m not your debtor, i’m the — ok, i am. but that’s our thing. you don’t get them off the back of it'),
 [AN,'i’ll take the driver. nobody’s claimed the driver.'],
 N('It takes twenty minutes. You do it on the back of your chart. Ronin gets the boot. Angel gets the driver and anybody who runs. V gets the one who kept the books, because he wants to ask questions. You get the bald one, when you can hold the rifle, and nobody is to touch him before.'),
 M2('and if any of u does mine i’ll do u. that’s not a joke. write it down','and if any of you does mine, i’ll do you. that’s not a joke. write it down'),
 N('V writes it down. Angel kisses the top of your head and goes to buy shells. You have not felt so well looked after in your life, and every one of them is talking about murder.')]);
k86('q_owe','m',null,'clear','What you owe him',[
 N('It has been sitting on your chest since you got your head back. He carried you out. You do not know a way round that. You have never owed anybody, and you have shot people who owed less.'),
 M2('ok. the river. what do i owe','ok. the river. what do i owe?'),
 K76V('Nothing.'),
 M2('don’t do that. everything’s got a price. one free job. anyone u want. no questions','don’t do that. everything has a price. one free job. anybody you want. no questions'),
 K76V('I do not hire. And I should want the questions.'),
 M2('then MONEY. i’ll get it. give me a year','then money. i’ll get it. give me a year'),
 K76V('You cannot afford me. Nobody can. It is why I do not charge.'),
 N('He says it flat, as a thing about himself that he finds tiresome. You stare at him. You are trying to pay the man and he will not hold still for it.'),
 M2('fine. then it wasn’t a rescue. u came bc i’m urs to kill and u don’t like people touching ur stuff. that’s not saving someone. that’s stock-taking','fine. then it wasn’t a rescue. you came because i’m yours to kill, and you don’t like people touching your stuff. that’s not saving somebody. that’s stock-taking'),
 K76V('Precisely. I came to recover my own. You owe me nothing whatever.'),
 M2('GOOD','GOOD'),
 N('It is not good. You know when you have been let off. He has given you the one account of it under which you are still his enemy and not his charity case, and he had it ready, and you cannot work out whether that was contempt or manners.'),
 M2('ur soup’s shit, by the way','your soup’s shit, by the way'),
 K76V('So I am told.')]);

/* ===================================== V ===================================== */
k86('q_thread','v',null,null,'Eleven o’clock, and one o’clock',[
 N('At eleven you are in the cold room. The thing on the table sold cut medicine to a children’s ward. You are some while over it. You are not obliged to be quick, and you are not.'),
 N('At one you are in the room marked LAUNDRY, changing a dressing on a person who shot a doorman.'),
 N('You wash between. You are particular about it: the nails, the wrists, a fresh apron. It is the same soap. It is, you notice, the same thread. You had the one reel out for both.'),
 K76V('(By my own book they belong on the same table. Wanton. No inquiry made. I have written it myself, and I have not altered a word.)'),
 N('You look at the two of them, in your mind, side by side. The one downstairs explained itself for an hour and it came to money. The one in the bed would explain itself in a breath, and it would come to rent. There is not a clause in your law which puts them in different rooms.'),
 N('You have, all the same. You carried one of them up a river bank and you are feeding the other to your animals. A stranger, shown the two files with the names struck out, could not tell you which was which.'),
 K76V('(It is that they are hurt. I do not kill a thing that is not well. That is the whole of the distinction, and it will last for precisely as long as the ribs do.)'),
 N('You tie off. It is neat. The person in the bed opens one eye, and looks at your hands, and at the apron, and you see them recognise the hour at which a man changes his apron.'),
 N('You finish the dressing. Upstairs the hounds have begun to ask for their dinner. It was a good clean platter tonight, and you are sorry that you cannot take the credit for both pieces of work in the same breath.')]);
k86('q_botched','v',null,null,'Bad work',[
 N('You go over the injuries again, with the films on the box. You have done it each night, and there is nothing left in them to treat. You are assessing the work.'),
 N('It is very poor. There is no method in it. A rib here, a finger there, the same place gone over twice out of what can only have been boredom. Nothing was asked that needed asking. Nothing was matched to anything that the subject had done. They had four days and they learned nothing, and they proved nothing, and they left a living witness.'),
 K76V('(Amateurs. They hurt a thing because it was in front of them. It is what the worst of mine say of themselves, on the table, when they have run out of other reasons.)'),
 N('You know how it ought to be done. One does not lay a hand upon a creature except in answer to something, and in proportion to it, and having told it why. Otherwise it is merely appetite. You have spent eleven years on that distinction.'),
 N('And they did it to yours. That is the part which you turn over longest. The name was in your ledger. The debt was to you. Four men from a river took it upon themselves to collect on your account, in the wrong coin, for no reason, and to do it badly.'),
 K76V('(I am angry on behalf of the doorman. I should like that understood. They have beaten a person for nothing who ought to have been killed for something.)'),
 N('You rule four pages in the book. You do not yet have all the names. You head each one with what you do have: the boot, the books, the driver, a bald man. There is a small smile on your face. You have not looked forward to a piece of work so much in years.')]);
k86('q_asleep','v',null,null,'What they call you, asleep',[
 N('They talk when the bag has been changed. It is not addressed to anybody. You sit at the counter with the chart, and you take it down, since you take everything down.'),
 N('“rich.” That is the first. “smug.” Then something about a foundation, and a word that you will have to ask Ronin about. “nobody asked him.” “kills poor people in a basement.”'),
 K76V('It is a cellar. The basement is where you are.'),
 N('You say it quite quietly. They do not hear. It does not matter; the correction is for the record.'),
 N('“thinks he’s a judge.”'),
 K76V('I think nothing of the kind. A judge may be mistaken, and is paid.'),
 N('“moneybags.”'),
 N('You put the pen down. They are drugged to the eyes, with a fever, in a room that they believe to be a cell. They do not know their own name with any confidence. And they have kept hold of every item of the case against you, in order, and are reading it out to the ceiling.'),
 K76V('(I had thought that the four men took everything. They did not get that. It is all still there.)'),
 N('You are glad. You examine it, and it is gladness. You had rather be hated in that room by the person you swore to kill than thanked in it by whatever the river sent back. You write the charges out, fair, at the back of the chart: “Rich. Smug. Nobody asked.” You initial them as received.')]);
k86('q_share','v',null,null,'Ronin wants to hold the lamp',[
 [RN,'When you get the first one. I wanna be there.'],
 K76V('You talk.'),
 [RN,'I’ll shut up. I’ll bring a chair. I’ll hold the fuckin’ lamp.'],
 K76V('You have never in your life held anything steady for an hour. And you would wish to use the crowbar.'),
 [RN,'’Course I’d wanna use the crowbar. Have you seen the kid’s hand?'],
 N('You have seen it. You set it. You do not say so. He is walking up and down your kennel passage with his rings going against the brick, and the black hound is watching him as it watches weather.'),
 K76V('It is not a thing that one does for relief. If you want relief, there is a punchbag in the hall. Upon my table they are asked what they did, and they answer, and what follows is in proportion.'),
 [RN,'Proportion. Kid can’t hold a spoon.'],
 K76V('Then the one who did it will not hold one either. That is what the word means.'),
 N('He stops walking. He looks at you with his head on one side, and then he laughs, the big one, that sets all four hounds off.'),
 [RN,'You sick old fuck. Okay. Okay, I like that. I get the one with the boot, though. I called it.'],
 K76V('You may have what is left of him when I have finished asking.'),
 [RN,'That ain’t the same.'],
 K76V('It is what is on offer. You may bring the chair.')]);
k86('q_cactus','v',null,null,'Fetch their things',[
 N('They will want their own things. You take the spare key that you had cut in April, for another purpose, and you drive to lot fourteen.'),
 N('You have been in the trailer once before, at four in the morning, with a roll of sheeting. You had not then the leisure to look.'),
 N('It is all here. The rifle, on its pegs. A list on the refrigerator, held by a magnet shaped like a frog, of every client they have: names, sums, what was wanted. Three notebooks. A go-bag. You are standing in the whole of your enemy’s business, with the door shut and the owner in your basement on a drip.'),
 K76V('(I could end it this afternoon. The list to Hale. The rifle in the river. They would come out of that room with nothing.)'),
 N('You do not touch the list. You intend to beat them, and this would not be that. One does not win a war by going through the other side’s pockets while it is unconscious.'),
 N('You take the cereal, of which there are four boxes. You take the socks with frogs on. You take the cactus from the windowsill, since it is dry, and at home you give it a good half pint.'),
 N('It is the cactus that they notice. They are scarcely able to lift their head, and they see it on the counter, and the soil is dark.'),
 Ms('u WATERED him','You watered him?','They point at the pot, and at you. Then they draw one finger slowly across their throat.'),
 N('You gather that one does not. You pour the saucer off. You have had the run of their trailer, their rifle and the name of every man who pays them, and what you are to be killed for is half a pint of water.')]);

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

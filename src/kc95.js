/* ===KC95-BEGIN=== */
/* ===================== THE WAR: THE QUARREL (kc95) =====================
   Replaces three withdrawn expansions (the earlier kc95 and kc96, and an unpushed kc97–kc98), at the author's
   direction: truer to the characters, and more about the two of them as enemies. Needs kc73, kc76–kc94.
   What the two actually disagree about, from docs/notes_kc73.md: V kills by a law, for nothing, and holds that
   Misaki is wanton (no code, kills for rent, leaves collateral). Misaki holds that V is a rich man with a hobby who
   calls it law, and that the landlord does not take morals. Neither stops believing it. This module keeps that
   argument running through every stretch of the route, in things that they do to each other. They enjoy the work
   and they are good at it; the scenes are about that, and not about how either of them feels.
   One free ⚔ side entry, an ordered sequence by stage, one scene a day:
     war    the normal phase, before the river                    five each way  (S.f.e2l95.war)
     bed    the infirmary (Misaki once clear; V throughout)       three each way (.bed)
     up     out of the infirmary, until the corridor              five each way  (.up)
     cold   after the corridor, until the boat                    one each way   (.cold)
   Choices: S.f.e2l95Driver wait|car (Misaki, war 3); S.f.e2l95Mit struck|stands (V, up 3).
   A YEAR ON (kc83's epilogue menu): three more, lovers and rivals: what you called him; a job; the charges.
   MISAKI'S NAMES FOR V, redone in the same round across kc73–kc94: “grandpa” is gone. In the war it is “ur
   honour” (and “moneybags”), which is the quarrel in two words. Pet names are what Misaki gives a lover
   (docs/voice_sample.md), so none is used on V until the year-on scene, where one gets out.
   Rules: unnamed city, hounds unnamed, no new named characters, V never contracts, Misaki via MV and they/them.
   Notes: docs/notes_kc95.md. Test: node tools/k95_test.js */
const K95=()=>{try{return typeof K94==='function'&&K94()}catch(e){return false}};
const k95Me=()=>S.pov==='v'?'K9':'hitmeuppp';
const X95=(a,b)=>K76MV('(text) '+a,'(text) '+a,'(text) '+b,'(text) '+b);
const V95=t=>K76V('(text) '+t);

/* ===================================== MISAKI: THE WAR ===================================== */
const K95_M={war:[
 /* 1 · table six */
 cb=>say([
  N('The contract is four thousand, for a man who imports shellfish and has annoyed somebody. You do not ask who. You do it in his wine cellar on a Thursday, with the chainsaw, because the client wanted it loud.'),
  N('It is afterwards, going through the jacket for the proof, that you find the card. Thick cream paper. The foundation thanks him for his generous support of the winter shelters. Table six.'),
  M2('(oh this is PERFECT. this is the best thing that’s ever happened to me)','(oh, this is perfect. this is the best thing that has ever happened to me)'),
  N('You prop the card on what is left of his chest, where the police photographer cannot miss it, and you send K9 a picture from the stairs.'),
  X95('one of urs. table six. do u vet these guys or just cash the cheque','one of yours. table six. do you vet these guys or just cash the cheque?'),
  V95('He was on my list for the spring. He kept eleven men in a container at the docks.'),
  X95('cool. didn’t ask. got paid','cool. didn’t ask. got paid'),
  V95('You have killed a guilty man by accident, for money, without once inquiring what he had done. I do not know that I have read a sentence which describes you so exactly.'),
  X95('dead’s dead, ur honour. u want a receipt?','dead’s dead, your honour. do you want a receipt?'),
  N('He does not answer for an hour. Then he does. He had wanted the man to explain himself first, on the table, and you have cost him that.'),
  N('You laugh so hard on the cellar stairs that you have to sit down in somebody’s Burgundy. You have robbed a billionaire of the one thing that he cannot buy another of.'),
  M2('(he’s mad i got there first. he’s mad i did it for RENT. life is so unfair. to HIM. for once)','(he’s angry that i got there first. he’s angry that i did it for rent. life is so unfair. to him, for once)')],cb),
 /* 2 · the landlord */
 cb=>say([
  N('The rent is four hundred, on the first, to a man who comes round in a van.'),
  N('On the first he does not come. There is a letter, on good paper. The lot has changed hands. Rent is to be paid to a holding company at an address uptown. You know the address. Everybody does. It has a foundation in it.'),
  X95('u BOUGHT my LOT','you BOUGHT my LOT'),
  V95('I bought the land. Your lease is unaltered. A man ought to know where his debtor lives, and that the roof will keep.'),
  X95('ur my LANDLORD. i kill people so i can pay the landlord. and now the landlord’s the guy who says i shouldn’t','you’re my LANDLORD. i kill people so that i can pay the landlord. and now the landlord is the guy who says i shouldn’t'),
  V95('Yes. I thought that you would notice that.'),
  N('You have said it a hundred times: the landlord does not take morals. He has gone and made himself the landlord, so that he can.'),
  N('You pay it. You pay it in person, at his gate, at four in the morning, in quarters, through the bars, one at a time, onto his gravel. Sixteen hundred of them. The hounds sit and watch. It takes fifty minutes, and your arm is dead.'),
  X95('count it','count it'),
  V95('I have. You are a quarter short.'),
  N('You are not a quarter short. You came third at regionals. You go back and stand at his gate at five in the morning, in the rain, and argue about twenty-five cents with a man in a dressing-gown who has you in a book to be killed.'),
  M2('check ur GRAVEL, moneybags','check your gravel, moneybags'),
  K76V('I do not kneel on gravel.'),
  N('He sends the black hound to look. It finds the quarter in about a second and brings it to you, not to him. You put it through the bars. He writes you a receipt.')],cb),
 /* 3 · the driver */
 cb=>say([
  N('The mark runs three betting shops. He will be in the back of a grey saloon at the lights on the ring road at ten past nine. The contract is for the car. It says nothing about who else is in it.'),
  N('There is a driver. There is always a driver. This one has the window down and is eating chips out of a paper.'),
  N('Your phone goes. It is K9. He has never rung you. You pick up, because the lights are red and you have forty seconds.'),
  K76V('The driver has two children and a bad knee. I mention it for the record.'),
  M2('r u WATCHING me','are you WATCHING me?'),
  K76V('From the car park opposite. I wish to see what you do. It will go in the file either way.'),
  M2('(he’s doing it on purpose. he wants me to do the driver so he can write it down. or he wants me to NOT, so he can say he made me)','(he’s doing it on purpose. he wants me to do the driver so that he can write it down. or he wants me not to, so that he can say he made me)'),
  N('The bazooka does the car. That is what it is for. The rifle would do the back seat by itself, through the rear window, if the mark sat up. He is lying down, asleep.')],()=>ask(k95Me(),'<span class="hint">the lights are still red · he is writing either way</span>',[
   {t:'Wait for the mark to get out',sub:'forty minutes, and the bonus goes',fn:()=>{S.f.e2l95Driver='wait';save();say([
     N('You wait. Forty minutes, on a roof, in the wind, with a rocket launcher across your knees, for a bookmaker to wake up and want a piss. You lose the punctuality bonus. That is six hundred.'),
     N('He gets out at a garage. You do him at the pumps with the rifle: one, through the hat. The driver drops his chips and runs, on the bad knee. You watch him go, through the scope, and you do nothing about him.'),
     X95('that wasn’t for u. the angle was better','that wasn’t for you. the angle was better'),
     V95('Of course. I have written “the angle was better.”'),
     X95('i hate u. u owe me six hundred','i hate you. you owe me six hundred')],cb)}},
   {t:'The contract says the car',sub:'on time, in full',fn:()=>{S.f.e2l95Driver='car';save();say([
     N('You do the car. It goes up like a bin. That is the job. It was on time, and the bonus clears by ten.'),
     N('Across the road a pair of headlamps comes on, and a long black car pulls out of the car park, in no hurry.'),
     V95('COLLATERAL: SEVERAL. I have amended the figure. I had hoped, for about forty seconds, that I should not need to.'),
     X95('hope’s free, moneybags. i charge','hope’s free, moneybags. i charge'),
     N('You eat on the bonus for a week. There is a chip paper in the gutter at the lights for three days, and you take the long way round.')],cb)}}])),
 /* 4 · the invoice */
 cb=>say([
  N('Your best client stops answering. He was good for a job a month: debts, mostly, and once a brother-in-law.'),
  N('Then there is a parcel on your step. It is a steel dish, of the kind that a dog eats from, licked clean. There is a card in it. “He hired eleven men killed in six years. He will hire no more. —K9.”'),
  M2('(he ate my CLIENT. he fed my client to a DOG. that’s four grand a month!)','(he ate my client. he fed my client to a dog. that’s four grand a month!)'),
  N('You do not grieve. You do sums. Twelve months at four thousand, less expenses. You type it up at the library, with a letterhead, and you send it to the foundation, for the attention of the chair.'),
  N('INVOICE. Loss of earnings: $48,000 per annum. Emotional distress: $5. One dish: returned, unwashed.'),
  N('It comes back in two days, in a cream envelope. He has gone through it in red ink. He has corrected “recieved.” He has queried the five dollars. At the bottom, in fountain pen: “Your arithmetic is sound and your premise is not. Nothing is owed for the loss of a man who paid you to kill. I enclose the five dollars.”'),
  N('There is a five-dollar note in it. You pin it to the trailer wall with a knife. It is the first money that you have ever got out of a billionaire, and you got it for emotional distress.'),
  X95('i’m framing it','i’m framing it'),
  V95('Spend it. It is the only honest money that you have had this year.'),
  X95('says the guy with a FOUNDATION','says the guy with a foundation')],cb),
 /* 5 · his shelter */
 cb=>say([
  N('You go to see what the money does. It is the cold week in February. You put your hood up and stand in the queue at one of his winter shelters, with a hundred and forty other people, for the soup.'),
  N('Nobody asks you for a name. There is a bed, with a blanket that has been washed. There is a nurse on the door who looks at your knuckles and says nothing. There is a notice about dogs being welcome.'),
  M2('(it’s REAL. i wanted it to be a tax thing. i wanted there to be like four beds and a plaque)','(it’s real. i wanted it to be a tax thing. i wanted there to be about four beds and a plaque)'),
  N('There is no plaque. You look. His name is not on the building, or the blankets, or the bowls. You know two of the men in the queue. One of them owes you sixty dollars. The other is the brother of a job.'),
  N('You eat the soup. It is his recipe; you would know it anywhere. It is terrible.'),
  X95('went to ur shelter. beds r fine. soup’s shit','went to your shelter. the beds are fine. the soup’s shit'),
  V95('I am told so. Were you cold?'),
  X95('none of ur business. u know that’s all blood money right. u built that out of dead guys','none of your business. you know that’s all blood money, right? you built that out of dead guys'),
  V95('It is built out of shipping. The dead contribute nothing. Your trailer, however, is paid for precisely as you describe.'),
  N('You have no answer to that which is not a swear word, so you send him eleven of those. On your way out you collect the sixty dollars from the man in the queue. Then you stand on the step in the cold, and go back in, and give him twenty of it for the bus.'),
  M2('(that’s not charity. that’s customer retention)','(that isn’t charity. that’s customer retention)')],cb)],

/* ===================================== MISAKI: THE INFIRMARY, ONCE CLEAR ===================================== */
 bed:[
 /* 1 · a hospital in his basement */
 cb=>say([
  N('Now that you can see straight, you take a proper look at the room. There is a lamp on an arm that must have cost what your truck did. There is a machine that takes films of your bones. There are four kinds of thread.'),
  M2('u have a HOSPITAL. in ur BASEMENT','you have a HOSPITAL. in your BASEMENT'),
  K76V('It is an infirmary. It was built for the hounds.'),
  M2('for the DOGS. oh my god. that’s WORSE','for the DOGS. oh my god. that’s worse'),
  N('You were stitched at eleven by a boy who was failing veterinary college, on a kitchen table, for twenty dollars. You have a scar from it like a zip. This man has four kinds of thread under his house, for dogs.'),
  M2('do u know what a real one costs. i’ve SEEN the bill. i left out the window before they could hand it to me','do you know what a real one costs? i’ve seen the bill. i left by the window before they could hand it to me'),
  K76V('There is no bill.'),
  M2('there’s ALWAYS a bill. what do i owe','there’s always a bill. what do i owe?'),
  K76V('Nothing that money would settle. You are in the ledger. It is all there.'),
  N('That shuts you up for about four seconds. You had forgotten. You are lying in his thread, under his lamp, being mended like something valuable, and upstairs there is a book that says what happens when it is done.'),
  M2('so ur fixing me up to kill me','so you’re fixing me up to kill me'),
  K76V('I am mending you because you are hurt. I shall kill you because of what you have done. They are separate accounts. I do not see why you should find that hard. You keep two sets of books yourself.'),
  M2('mine are for TAX','mine are for tax'),
  N('He goes out. You shout after him that the lamp is ugly. It is a beautiful lamp.')],cb),
 /* 2 · how many */
 cb=>say([
  M2('how many. u. total','how many? you. total'),
  K76V('Forty-one.'),
  M2('that’s IT? in eleven years? that’s like four a year. that’s a HOBBY','that’s it? in eleven years? that’s about four a year. that’s a hobby'),
  K76V('Each of them could tell you why.'),
  M2('each of mine could tell u who paid. same thing','each of mine could tell you who paid. same thing'),
  K76V('It is not the same thing.'),
  M2('they’re all just as dead! urs don’t get up again bc u had a REASON','they’re all just as dead! yours don’t get up again because you had a reason'),
  K76V('Mine had done something.'),
  M2('EVERYONE’S done something. u want me to go thru ur board of directors?','everybody has done something. do you want me to go through your board of directors?'),
  N('He considers it. You watch him go down the table in his head, chair by chair.'),
  K76V('Two of them. I am aware of it. They are for the autumn.'),
  M2('(he’s got his OWN BOARD on the list. ok. that’s kind of metal. do NOT tell him that)','(he has his own board on the list. ok. that’s kind of metal. do not tell him that)'),
  M2('ok so what’s the difference. u and me. real quick','ok, so what’s the difference? you and me. real quick'),
  K76V('I should do it if nobody paid me. Would you?'),
  N('You open your mouth. You have an answer. You have always had an answer. It does not come out, and you blame the drip.'),
  M2('get out. i’m sick','get out. i’m sick')],cb),
 /* 3 · a job comes in */
 cb=>say([
  N('Your phone is on the counter, where somebody has put it on to charge. It buzzes. You know that buzz. It is the work number.'),
  N('Four thousand. A dentist, in the north end, by Friday. You read it with one eye, and you are already working out the roof.'),
  K76V('You will not take contracts from my infirmary.'),
  M2('watch me, ur honour','watch me, your honour'),
  K76V('Who is it?'),
  M2('i don’t ask who. that’s ur whole problem with me, remember','i don’t ask who. that’s your whole problem with me, remember?'),
  N('He takes the phone out of your hand. You have one arm and a drip, and he is quick for a man of his size. He reads the name. He stands there for a moment, and you can see him turning pages.'),
  K76V('He is a dentist. He has a wife who wishes to be a widow. He has done nothing.'),
  M2('he’s done something to SOMEONE. someone’s paying four grand','he’s done something to somebody. somebody is paying four grand'),
  K76V('That is not the same.'),
  M2('it’s the same to my landlord. oh wait. that’s u','it’s the same to my landlord. oh, wait. that’s you'),
  N('He gives the phone back. He does not block the number, or break it, or put it in his pocket. He stands with his hands behind him and waits to see what you do, which is worse.'),
  N('You try to make a fist with the left. It gets halfway. You could not hold a rifle on a dentist at twenty metres.'),
  X95('can’t. hand’s fucked. ask me in a month','can’t. the hand’s fucked. ask me in a month'),
  M2('that’s bc of the HAND. not bc of u. write that down','that’s because of the hand. not because of you. write that down'),
  K76V('I have written “the hand.”')],cb)],

/* ===================================== MISAKI: UPSTAIRS ===================================== */
 up:[
 /* 1 · back to work */
 cb=>say([
  N('The first job back is a man who sells bad cement. Three thousand. It is four hundred metres, which is nothing. You have done it in your sleep. Your left hand will not hold the fore-end still.'),
  N('You are on your second try at a rest made out of your own jacket when a voice comes from the next roof along.'),
  K76V('Wind is left to right, at about four. He will come out by the side door. You are low.'),
  N('He is sitting on an air vent, in his coat, with a pair of field glasses, like a man at the races.'),
  M2('what the FUCK are u doing here','what the FUCK are you doing here?'),
  K76V('You have a bad hand and a poor rest. If you miss, you will hit the woman at the bus stop. I am here to see that you do not.'),
  M2('u don’t even APPROVE of this','you don’t even approve of this'),
  K76V('I do not. I have looked him up. The cement was in a school. Left to right, four. Now.'),
  N('You fire. The man who sells bad cement sits down in his own doorway.'),
  M2('(he looked him up. he checked my guy deserved it BEFORE he helped. he AUDITED my job)','(he looked him up. he checked that my guy deserved it before he helped. he audited my job)'),
  M2('i’m not splitting it','i’m not splitting it'),
  K76V('I do not take money for it.'),
  M2('that’s what’s WRONG with u. that’s the whole thing that’s wrong with u','that’s what is wrong with you. that’s the whole thing that’s wrong with you'),
  N('You pack up. On the stairs you work out that if the cement had been fine, he would have sat on that vent and let you miss. He would have written it down.')],cb),
 /* 2 · the loin */
 cb=>say([
  N('It is one of his. A man who drowned dogs for a fighting ring. You would have done that one for nothing, and you say so, and he says that you may hold the lamp.'),
  N('You do not hold the lamp. You have brought the chainsaw.'),
  K76V('No.'),
  M2('cmon. one go. it’s RIGHT there','come on. one go. it’s right there'),
  K76V('It is an abattoir tool. It tears. I shall have nothing left that I can use.'),
  M2('ohhh. right. the dogs. ok so which bits do they like','ohh. right. the dogs. ok, so which bits do they like?'),
  N('He shows you. He is exact about it, with the scalpel, like a man going over a map: this, and this, and never this. The thing on the table is making a noise. Neither of you is listening to it.'),
  N('He lets you do the legs. It is the best fun that you have had since the river. There is a bloom of red up the tiles. It goes in his hair. He stands there dripping, in his apron, looking at what you have done to the loin.'),
  K76V('You have destroyed it. That was two days of meat.'),
  M2('he’s DEAD tho. look how dead he is','he’s dead, though. look how dead he is'),
  K76V('He was to have been dead in an hour, neatly, having understood why.'),
  M2('he understood! i TOLD him! i said “this is for the dogs, asshole”','he understood! i told him! i said “this is for the dogs, asshole”'),
  K76V('That is not a statement of the charge.'),
  M2('it was to HIM','it was to him'),
  N('The old hound eats what there is, off the floor, and looks at you as if you had invented dinner. V watches him do it. He has blood on his glasses.'),
  K76V('You may not use that in this room again.'),
  M2('so i can come back','so i can come back'),
  N('He does not answer that. He hands you the mop.')],cb),
 /* 3 · say it to my face */
 cb=>say([
  N('It starts over the salt. By the time the plates are cold, it is about everything.'),
  K76V('You are the best shot in this city, and you let it by the hour to men who want an inheritance. I have watched you do a thing at six hundred metres that I could not do at sixty. You did it for somebody’s brother, for rent.'),
  M2('and ur a rich guy who kills broke psychos in a basement and calls it LAW. nobody elected u! nobody ASKED! u just had the money for a table with drains!','and you’re a rich guy who kills broke psychos in a basement and calls it law. nobody elected you! nobody asked! you just had the money for a table with drains!'),
  K76V('Every one of them had done it.'),
  M2('every one of mine had a guy who wanted them gone. somebody ALWAYS thinks u deserve it. u just cut out the client and hired urself','every one of mine had somebody who wanted them gone. somebody always thinks you deserve it. you just cut out the client and hired yourself'),
  N('That one goes in. You see it go in. He puts his knife and fork together.'),
  K76V('I do not choose them to my own advantage.'),
  M2('no, u choose them bc it feels GOOD. i’ve seen ur face. u LIKE it. at least i’m honest. i do it for four hundred a month and a cactus','no, you choose them because it feels good. i’ve seen your face. you like it. at least i’m honest. i do it for four hundred a month and a cactus'),
  K76V('A doorman, Misaki.'),
  N('Your name, in that voice. It is a dirty shot, and it lands just under the ribs, where the others got you.'),
  M2('u don’t get to say — u weren’t THERE. i’ve got to live with that guy. u just get to write him down','you don’t get to say — you weren’t there. i have to live with that guy. you just get to write him down'),
  N('You throw the peaches at him. The dish; the peaches go with it. He does not duck. It breaks on the wall an inch from his ear, which is where you put things when you mean them.'),
  K76V('An inch.'),
  M2('i can do closer','i can do closer'),
  K76V('I know that you can. It is in the file.'),
  N('You both sit there, breathing. There are peaches coming down his wallpaper. Nobody has taken anything back.')],cb),
 /* 4 · the price list */
 cb=>say([
  M2('u know what i’d charge. for u','you know what i’d charge? for you'),
  K76V('I should be interested.'),
  N('You have a list. It is in your head, and it is exact. Nine hundred for a card man. Four thousand for anybody with a door that locks. Eight for a politician; twelve if he keeps a dog.'),
  M2('april, u were nine hundred. u were a rich idiot with a hobby and i’d have done u off the laundromat roof','in april you were nine hundred. you were a rich idiot with a hobby, and i’d have done you off the laundromat roof'),
  K76V('And now?'),
  M2('now i know the house. the stair. the three and a half hours. ur EASY now. i should be knocking money OFF','now i know the house. the stair. the three and a half hours. you’re easy now. i should be knocking money off'),
  N('You do the sum out loud, as you would for a client. The house: less. The hounds: less, since they like you. The four seconds every night when he turns his back for the kettle.'),
  M2('…two million','…two million'),
  K76V('That is a considerable advance upon nine hundred.'),
  M2('yeah well. it got harder. idk why. u got EASIER and the price went UP. that’s not how prices work','yeah, well. it got harder. i don’t know why. you got easier and the price went up. that isn’t how prices work'),
  K76V('Nobody who wishes me dead has two million dollars.'),
  M2('u do','you do'),
  N('It is out before you have looked at it. He puts the kettle down.'),
  K76V('I do not wish myself dead.'),
  M2('no, i mean u could AFFORD — forget it. it was a money joke','no, i mean that you could afford — forget it. it was a money joke'),
  N('It was not quite a money joke. You go up on the roof and do integrals until the figure stops going round.')],cb),
 /* 5 · four dollars */
 cb=>say([
  N('The Mimic’s man is in a lock-up behind the fish market, and there is a night watchman between you and him. An old boy, with a flask and a radio, sitting on a crate in the one place that the shot has to pass.'),
  N('V is beside you on the roof, with the glasses. He does not say anything about the watchman. He does not need to. You can hear him not saying it.'),
  M2('i can go thru him. it’d still do the guy behind','i can go through him. it would still do the guy behind'),
  K76V('I know that you can.'),
  N('He leaves it there. He has his pen out. You would like to push him off the roof.'),
  N('You put the first round through the old boy’s radio. It jumps off the crate in bits. He looks at it, and at his hand, and he is gone down the alley faster than you would have believed of him. You put the second where he was sitting, and the Mimic’s man folds up behind it.'),
  K76V('Two rounds.'),
  M2('yeah. TWO. u know what those cost? two bucks each. that’s four dollars. u owe me four dollars','yeah. two. do you know what those cost? two bucks each. that’s four dollars. you owe me four dollars'),
  N('He takes out his notecase, on a roof, at one in the morning, and counts four dollars into your hand. He does it without a word, and then he writes something on the page.'),
  M2('what’d u put','what did you put?'),
  K76V('“A watchman. Not shot.”'),
  M2('put “bc of the radio.” it was a really annoying radio','put “because of the radio.” it was a really annoying radio'),
  K76V('I have put what occurred.')],cb)],

/* ===================================== MISAKI: APART ===================================== */
 cold:[
 cb=>say([
  N('Three jobs in nine days. You are working angry, which is how the rent gets in early.'),
  N('The third is a man who owns a laundry. Two thousand. You have him in the scope at eleven in the morning, folding sheets, and your finger is where it goes, and a voice in your head says: what did he do?'),
  M2('(who cares. who CARES. two grand)','(who cares? who cares? two grand)'),
  N('It is a dry voice. It does not use contractions.'),
  N('You have never asked. It is the whole point of you. You are cheap and fast and you do not ask, and that is why the phone rings. If you start wanting reasons, you are just him with less money.'),
  N('You come off the scope. You ring the client. You have never in your life rung a client in the middle of a job.'),
  M2('hey. quick one. what’d he do','hey. quick one. what did he do?'),
  N('There is a silence. Then the client says that he was told you did not ask.'),
  M2('i don’t. i’m asking','i don’t. i’m asking'),
  N('He owes money. That is all of it. Eleven hundred dollars, and he has been rude.'),
  M2('(that’s nothing. that’s — i’ve shot guys for that. i shot a guy for that LAST MONTH)','(that’s nothing. that’s — i have shot guys for that. i shot a guy for that last month)'),
  N('You take the shot. Of course you take it; it is two thousand dollars. He goes down into the sheets. But you asked first, and you got an answer, and it is going to be in the trailer with you tonight.'),
  N('You type it to K9 and delete it. You type it again.'),
  X95('u BROKE it. i used to just get PAID','you broke it. i used to just get paid'),
  N('You delete that as well. You eat cereal out of the box, with the laundry man, and both bolts on.')],cb)]};

/* ===================================== V: THE WAR ===================================== */
const K95_V={war:[
 /* 1 · the rate */
 cb=>say([
  N('The thing on the table kept a gambling ring. It broke the hands of people who could not pay. It has been talking for an hour, as they do, and in the course of it, it mentions that it once had a rival removed.'),
  K76V('By whom?'),
  N('By a contractor. Cheap, and quick. A thin loud creature with a rifle, who turned up on a motor scooter and wanted paying in cash.'),
  K76V('What was the sum?'),
  N('Nine hundred. It says so with some satisfaction. It had beaten them down from twelve.'),
  N('You put the knife down. You have been at this work for eleven years, and you have an exact notion of what a life weighs. You have just been told the going rate.'),
  K76V('And what had he done? The rival.'),
  N('It does not understand the question. He was a rival. He had the shops on the east side.'),
  K76V('(Nine hundred. They did not ask. A man was alive on the Monday and was not on the Tuesday, and the whole of the reason was that somebody had nine hundred dollars and they had rent due.)'),
  N('You finish. It takes a further hour, and you are not so neat as you like to be. Afterwards you wash, and you write it on their page, under the rest. “Rate: $900. No inquiry made.”'),
  V95('You killed a man for nine hundred dollars.'),
  X95('which one','which one?'),
  V95('That you must ask is the charge.'),
  X95('900 was a DISCOUNT. he was a repeat customer. how is he btw','900 was a discount. he was a repeat customer. how is he, by the way?'),
  V95('He is in four buckets.'),
  X95('ok so u do it for FREE. and i’m the sick one','ok, so you do it for free. and i’m the sick one')],cb),
 /* 2 · six hundred and forty metres */
 cb=>say([
  N('You watch them work, for the file. You have a room rented across from the roof that they have chosen, and field glasses, and a flask.'),
  N('It is six hundred and forty metres, over a river, in a crosswind that is lifting the washing on the barges. The mark is behind glass, in a moving lift. You would not attempt it. You do not know anybody who would.'),
  N('They lie there for three hours without shifting. They are eating something out of a bag. Then they stop eating. There is one shot, and across the water a lift stops between floors.'),
  K76V('(Through the glass, and the gap between the doors. In that wind.)'),
  N('You have known surgeons of thirty years’ standing who had not that hand. It belongs to somebody who left school at thirteen and learned the mathematics in the cab of a truck. And it was used for a man who wished to inherit sooner.'),
  N('You take out the file. Under SKILL you have written “adequate.” You cross it through. You sit for some time with the pen. You are an honest bookkeeper, and you write: “The best that I have seen.” Then, since it must be said: “Sold by the hour.”'),
  N('When you raise the glasses again they are standing on the parapet, looking straight at your window. They wave. Then they turn round and do something with their trousers that the file need not record.')],cb),
 /* 3 · what Tuesday cost */
 cb=>say([
  N('Among the charges on their page there is a man shot on his own front step, on a Tuesday, with his daughter holding his hand. The contract specified Tuesday. On a Wednesday the child would have been at school.'),
  N('The girl is nine. The foundation pays her fees, and the woman who sits with her at night. It is done through four accounts, and she will never learn by whom.'),
  N('Once a term the school sends an account. This term you put it in an envelope and have it left on the step of a trailer in lot fourteen. You add nothing. It has the child’s year on it, and a line about her progress in arithmetic.'),
  X95('what’s this','what’s this?'),
  V95('It is what Tuesday cost. I pay it. I thought that you should see the figure.'),
  X95('i didn’t know she’d be there','i didn’t know that she’d be there'),
  V95('You did not ask.'),
  N('There is nothing for two days. On the third the bursar telephones, in some confusion. A person in a hooded top has been to the school office and left forty-one dollars, in ones, towards the account of that pupil. There was a note. The bursar reads it to you.'),
  N('“this doesn’t mean anything. she’s good at maths tho. tell her to do the competitions, they give u a trophy u can pawn.”'),
  K76V('(Forty-one dollars. They have ninety to their name; it is in the file.)'),
  N('You do not enter it. There is no heading in the book under which it would go. You tell the bursar to put the child in for the competitions.')],cb),
 /* 4 · discharged */
 cb=>say([
  N('They collect, as well as kill. There is a list of small debtors, bled monthly: a man with a kebab van, a widow with a weakness for slot machines, a boy who bought a motorcycle. It is forty dollars here and sixty there. It is what they eat on.'),
  N('You pay all of it. It takes one afternoon, and your lawyer. Eleven debts, in full, with the interest, by banker’s draft to a post office box in their name. It comes to three thousand and ninety dollars. You have spent more on a hound’s teeth.'),
  X95('WHAT DID U DO','WHAT DID YOU DO'),
  V95('Your debtors are discharged. You have been paid what you were owed.'),
  X95('u can’t just PAY it. that’s not how it WORKS. they’re supposed to be SCARED','you can’t just pay it. that’s not how it works. they’re supposed to be scared'),
  V95('I can. It is what money is for.'),
  X95('that was my MONTHLY. what am i supposed to live on','that was my monthly. what am i supposed to live on?'),
  V95('You have three thousand and ninety dollars. I suggest that you live upon that, and frighten nobody for a month. Regard it as an experiment.'),
  N('They spend it in a week. You have it from the file: a scope, the rent, and a cactus.'),
  N('On the eighth day the man with the kebab van owes them forty dollars again. They lent it to him themselves, that morning, at the window of the van, in order to have it to collect.'),
  K76V('(I am told that the kebab was free. I have written “incorrigible”, and underlined it.)')],cb),
 /* 5 · a letter to the inspector */
 cb=>say([
  N('There is a lawful way. You have considered it, as you consider everything.'),
  N('You have the file. Seven that can be proved. A cartridge case from the revolving door, with a thumb upon it. A photograph of a scooter. You draft the letter to Inspector Hale at your desk, in fair copy: the dates, the roofs, where the rifle is kept. It would hang anybody.'),
  N('You read it through. It is complete. You have only to put it in the post, and a wanton killer is off the streets of this city by the end of the week, and nobody need lie on your table.'),
  K76V('(Fifteen years. Out in nine. They would do well in there; they have been in worse rooms. And they would come out owing nothing, having paid a debt to the wrong creditor.)'),
  N('A prison is not justice. It is storage. The doorman is not paid by it, nor the driver, nor a child of nine. You have always held so, and it is why there is a room under your house.'),
  N('There is also the other matter, and you are honest enough to set it down. You swore it. Before witnesses, in a bowling alley. You do not want Hale to have them. You do not want anybody to have them.'),
  K76V('(They are mine to kill. I find that I should take it very ill if somebody else were to do it, even the State.)'),
  N('You do not post the letter. You put it in the desk, sealed, with the cartridge case. You tell yourself that it is held in reserve. You are aware that a man keeps a thing in reserve when he does not mean to use it.'),
  X95('hale was at the laundromat today. asking about a scooter. that u?','hale was at the laundromat today, asking about a scooter. was that you?'),
  V95('No. If I wanted you taken, I should not send a policeman.'),
  X95('aw. u say the sweetest things, ur honour','aw. you say the sweetest things, your honour')],cb)],

/* ===================================== V: THE INFIRMARY ===================================== */
 bed:[
 /* 1 · the hand that did it */
 cb=>say([
  N('You dress the hand at eight. It is the left: three fingers, set and pinned. You have done it with a great deal of care.'),
  N('You know what the hand is for. It goes under the fore-end of a rifle. It steadied the shot that took a doorman through a revolving door, because he was standing where the mark had stood a moment before. He had kept that door for twenty-six years. It is on the page.'),
  K76V('(I am restoring the instrument. I have every pin where it should be. When I have finished, it will do that again for anybody with nine hundred dollars.)'),
  N('They are awake, and watching you work. They are clear today, which is to say that they are insufferable.'),
  K76MV('ur thinking about the doorman','you’re thinking about the doorman','You’re thinking about the doorman.','You’re thinking about the doorman. I can tell.'),
  K76V('I am.'),
  K76MV('he was in the WAY','he was in the way','He was in the way.','He was in the way. That’s all.'),
  K76V('He was at his work.'),
  K76MV('so was i!','so was i!','So was I!','So was I!'),
  N('You draw the dressing a little tighter than is needed. They yelp, and call you a name that you are obliged to have explained to you afterwards by Ronin.'),
  K76V('You will have the full use of it in six weeks. I should like you to consider, in that time, what you propose to do with it.'),
  K76MV('shoot u','shoot you','Shoot you.','Shoot you. Obviously.'),
  K76V('That is the one use of it to which I have no objection.')],cb),
 /* 2 · four to one */
 cb=>say([
  [RN,'So lemme get this straight. You carried ’em outta there. You been down here four nights. An’ you’re still gonna kill ’em.'],
  K76V('When they are well.'),
  [RN,'When they’re well.'],
  K76V('I have altered nothing. The charges are what they were. A beating does not discharge a debt. If it did, I should keep a shorter book.'),
  [RN,'You’re a fuckin’ lunatic. I got twelve hundred bucks ridin’ on you two an’ I can’t figure what I’m bettin’ on no more.'],
  K76V('What are the odds?'),
  [RN,'On you doin’ it? Was evens. Went to four-to-one when you bought the kid a toothbrush.'],
  K76V('It was a medical necessity.'),
  [RN,'It’s got a frog on it.'],
  N('You have nothing to say to that. It has a frog on it. It was the only one in the shop that they would not have thrown at your head.'),
  [RN,'I’m just sayin’. You’re gonna do it, do it ’fore I get used to the idea you ain’t. ’Cause I’ll take it personal.'],
  K76V('You would attempt to prevent me.'),
  [RN,'Nah. I’d let you. Then I’d kill you. Kid’s mine t’—'],
  N('He stops, and looks at the door marked LAUNDRY, and picks at a ring.'),
  [RN,'Forget it. Four-to-one. Go make me some money, asshole.']],cb),
 /* 3 · marks out of ten */
 cb=>say([
  K76MV('ok. the forty-one. go. what’d they do','ok. the forty-one. go on. what did they do?','Ok. The forty-one. Go on. What did they do?','Ok. The forty-one. Go on, what did they do?'),
  K76V('A man who sold his sister’s children.'),
  K76MV('ok yeah. fuck that guy','ok, yeah. fuck that guy','Ok, yeah. Fuck that guy.','Ok, yeah. Fuck that guy.'),
  K76V('A physician who operated drunk, eleven times, and was protected.'),
  K76MV('six out of ten. could’ve just broken his hands','six out of ten. you could have just broken his hands','Six out of ten. You could have just broken his hands.','Six out of ten. You could have just broken his hands.'),
  K76V('I did that first.'),
  K76MV('OK. eight','ok. eight','Ok. Eight.','Ok, fine. Eight.'),
  K76V('A woman who kept a home for the old, and let them lie in it.'),
  K76MV('ugh. ten. i’d have done that one free','ugh. ten. i’d have done that one free','Ugh. Ten. I’d have done that one free.','Ugh. Ten. I’d have done that one for free.'),
  N('They are scoring them. They are lying in your infirmary with a drain in their side, awarding marks to the work of your life as if it were a diving competition.'),
  K76V('Then you understand. You have just agreed with me three times.'),
  K76MV('no i just don’t like those guys. that’s not a LAW. that’s just having eyes','no, i just don’t like those guys. that’s not a law. that’s just having eyes','No, I just don’t like those guys. That’s not a law. That’s just having eyes.','No, I just don’t like those guys. That’s not a law, that’s just having eyes.'),
  K76V('It is precisely a law. You have one. You decline to use it when there is money on the table.'),
  K76MV('yeah bc i need the MONEY. u don’t get to have principles for me. principles are for people with a fridge that works','yeah, because i need the money. you don’t get to have principles for me. principles are for people with a fridge that works','Yeah, because I need the money. You don’t get to have principles for me. Principles are for people with a fridge that works.','Yeah, because I need the money. You don’t get to have principles for me. Principles are for people with a fridge that works.'),
  N('It is a remark about refrigerators. You find that you have no reply ready, and you have had forty-one occasions on which to prepare one.'),
  K76MV('do me. my page. i wanna hear what i score','do me. my page. i want to hear what i score','Do me. My page. I want to hear what I score.','Now do me. My page. I want to hear what I score.'),
  K76V('A driver. A doorman. A man upon his own step, on a Tuesday.'),
  N('They do not award it a mark. They look at the ceiling. After a while they inform you that your ceiling is a six.')],cb)],

/* ===================================== V: UPSTAIRS ===================================== */
 up:[
 /* 1 · you audit the dead */
 cb=>say([
  N('They have gone back to work. You knew that they would. On Thursday they are out from nine until two, with the rifle case, and on Friday there is a man in the newspaper.'),
  N('He dealt in used cars. He was shot at his desk, through a window, from a multi-storey car park. There is no file on him. You have never heard the name.'),
  N('You open one. You have a clerk at the registry and a man at the bank, and by Saturday night the whole of a dead car dealer is on your desk: his accounts, his three convictions, a matter of an odometer and a family of five.'),
  K76V('(He sold a car without brakes to a man with four children. Two of them are in the cemetery. It would have sufficed. I should have had him myself in a year or two.)'),
  N('You sit back. You find that you have let out a breath.'),
  N('Then you see what you have done with your Saturday. Nobody asked you to try a dead man. They shot him for three thousand dollars and knew nothing of the brakes. You have been through his whole life with a lamp, hoping to find that he deserved it, in order that you need not add a line to their page.'),
  K76V('(I was looking for an acquittal. For them. In eleven years I have never gone looking for one.)'),
  N('You add the line. “A car dealer. Guilty, as it happens. Not known to the contractor.” You look for some time at “as it happens.” It is the nearest thing to a kind word in the ledger. You are ashamed of it, and you leave it in.')],cb),
 /* 2 · a contract on K9 */
 cb=>say([
  N('A man comes to the gate who wishes to speak with your lodger. He will not say upon what business. You have him shown into the kitchen, and you stand in the pantry with the door ajar. It is your house.'),
  N('He represents some people from the docks. They have lost eleven men and a container, and they have formed a view as to who is responsible. They understand that the contractor is living upon the premises. It could hardly be more convenient. Two hundred and fifty thousand dollars; half now.'),
  N('There is a case on your kitchen island, open. You can see the half from where you stand.'),
  N('They do not answer at once. You watch them look at it. They have ninety dollars and a broken hand, and they kill for whoever pays. It is the first line upon their page.'),
  K76MV('that’s a LOT of money. like. i could buy the whole lot. i could buy a PLANE','that’s a lot of money. like, i could buy the whole lot. i could buy a plane','That’s a lot of money. Like, I could buy the whole lot. I could buy a plane.','That’s a lot of money. Like, I could buy the whole lot. I could buy a plane.'),
  N('Your hand is on the scalpel. You are not certain what you mean to do with it.'),
  K76MV('no. can’t. conflict of interest','no. can’t. conflict of interest','No. Can’t. Conflict of interest.','No. Can’t do it. Conflict of interest.'),
  K76MV('i already swore i’d do him. for FREE. in front of people. i take money for it now, that’s double-dipping. i’ve got a reputation','i already swore that i’d do him. for free. in front of people. if i take money for it now, that’s double-dipping. i’ve got a reputation','I already swore that I’d do him. For free. In front of people. If I take money for it now, that’s double-dipping. I’ve got a reputation.','I already swore that I’d do him. For free, in front of people. If I take money for it now, that’s double-dipping, and I’ve got a reputation.'),
  N('The man says that his principals will go to three hundred.'),
  K76MV('buddy. i’m not selling u something i’m giving away. get out of his kitchen, he’s gonna feed u to a dog','buddy. i’m not selling you something that i’m giving away. get out of his kitchen, he’s going to feed you to a dog','Buddy. I’m not selling you something that I’m giving away. Get out of his kitchen, he’s going to feed you to a dog.','Buddy. I’m not selling you something that I’m giving away. Now get out of his kitchen, he’s going to feed you to a dog.'),
  N('He goes. They sit and look at the place on the marble where the case was. Then, without turning round:'),
  K76MV('u can come out of the cupboard, moneybags. i could hear u breathing','you can come out of the cupboard, moneybags. i could hear you breathing','You can come out of the cupboard, moneybags. I could hear you breathing.','You can come out of the cupboard, moneybags. I could hear you breathing.'),
  K76V('You refused a quarter of a million dollars.'),
  K76MV('not for U. don’t get weird. it’s a pride thing','not for you. don’t get weird. it’s a pride thing','Not for you. Don’t get weird. It’s a pride thing.','Not for you. Don’t get weird about it. It’s a pride thing.'),
  K76V('(They kill for whoever pays. I have it in ink. I shall have to amend the first line, and I do not know to what.)')],cb),
 /* 3 · in mitigation */
 cb=>say([
  N('You bring the page up to date. It is a long page now. You have had to gum a second leaf to it.'),
  N('Under the charges there is the column for the total, which is blank. Beside it, tonight, you find that you have ruled another. You have headed it IN MITIGATION.'),
  N('There has never been such a column in the book. You do not hold with it. You have had men on the table with childhoods that would turn the stomach. You heard them out, and it altered nothing. A starved dog that bites has still bitten.'),
  N('You know what would go in it. It is all in the file. No certificate of birth. Sold, or lost, before the age of nine. At school until thirteen. Rent at sixteen. A trophy pawned for a dinner.'),
  K76V('(None of it is a defence. I have killed for less than they have done, and those had worse to plead. If I allow it to them, then I have wronged forty-one others.)')],()=>ask(k95Me(),'<span class="hint">the pen is in your hand</span>',[
   {t:'Strike the column out',sub:'the book is the book',fn:()=>{S.f.e2l95Mit='struck';save();say([
     N('You rule it through, twice. The page is as it was. It is correct.'),
     N('You put the book away. You do not sleep. At four you go down and stand outside the spare room and listen to them snore, which they do like a small engine, and you are very angry with them for having been nine.')],cb)}},
   {t:'Leave it, and leave it empty',sub:'you have not the nerve for either',fn:()=>{S.f.e2l95Mit='stands';save();say([
     N('You leave the column. You write nothing in it. It stands at the edge of the page with its heading and no entry, and it is the first dishonest thing in the book.'),
     K76V('(They would laugh at it. They would say that I had invented a tax relief.)'),
     N('They find it within the week, since they read your ledger whenever your back is turned. They write in it, in biro. “was hungry. still am. where’s dinner.”')],cb)}}])),
 /* 4 · a parcel */
 cb=>say([
  N('There is a parcel in the door of the cold room. It is a large parcel. It has been wrapped in a shower curtain with fish on it, and tied with what you take to be bootlaces, in a bow.'),
  N('Inside is the proprietor of a home for the aged, who was on your page for October. He is in six pieces. The cuts are torn. Half of him is fit for nothing.'),
  N('There is a card, with a cactus on it. “happy early birthday or whatever. he was on ur list. i did it FREE. no client. no money. just bc he sucked. happy now???”'),
  K76V('(No client. They did it for nothing, on account of what he had done. It is the first time. It is the precise thing that I have said they could not do.)'),
  N('You stand over a shower curtain full of ruined meat, and you are pleased. You are so pleased that you are obliged to take off your glasses.'),
  N('Then you read the card again. “Happy now.” They did not do it for the old people in that home. They did it at you. It is a present, or else it is an argument, and either way it is a person with a chainsaw scoring a point.'),
  V95('He was to have been asked eleven questions. You have spoiled the loin, and the principle.'),
  X95('UR WELCOME','YOU’RE WELCOME'),
  V95('Thank you.'),
  X95('wait what','wait, what?'),
  N('You do not reply further. You salvage what you can for the hounds, and it is not much. The grey hound sits and looks at the shower curtain with the fish on it, and then at you, as if to ask who is keeping this house.')],cb),
 /* 5 · their file on you */
 cb=>say([
  N('They keep a file upon you. You had assumed as much. You had not seen it until this morning, when it fell out of the spare-room bed as you stripped it.'),
  N('It is written on the back of a cereal box, opened flat. You read it standing, with the linen over your arm.'),
  N('“K9. tall (annoying). sleeps 3.5 hrs, 1 to 4:30. back stair: step on the RIGHT. scalpel = collar, left side. glasses: 4 pairs, blind without. turns his back for the kettle, 4 secs. LIKES: dogs. being right. peaches (pretends they’re for me). WEAK SPOT: being right.”'),
  K76V('(It is accurate. It is a good deal more accurate than mine was at the same stage.)'),
  N('There is one error. They have you at forty-one, and it is forty-two since Wednesday. You take the red pen from your pocket. You correct the figure in the margin, and you initial the correction.'),
  N('Then you see what is written at the bottom, smaller, squeezed in at a later date with a different pen. “dont do it in the kitchen. hounds eat in there.”'),
  N('You read that line several times. It is a note upon where you are to be killed, and it has been made with some consideration for your animals.'),
  N('You put the box back under the mattress, where it was. At dinner they look at you, and at the red on your finger, and they go the colour of the tablecloth.'),
  K76MV('u went thru my STUFF','you went through my stuff','You went through my stuff.','You went through my stuff!'),
  K76V('I changed your sheets. You are out by one. I have corrected it.'),
  K76MV('u CORRECTED my — that’s a MURDER PLAN, u psycho, u don’t PROOFREAD it','you corrected my — that’s a murder plan, you psycho. you don’t proofread it','You corrected my — that’s a murder plan, you psycho. You don’t proofread it.','You corrected my — that’s a murder plan, you psycho! You don’t proofread it!'),
  K76V('It ought at least to be right. I do not eat peaches for my own pleasure. I should like that amended also.'),
  K76MV('no. that one stays','no. that one stays','No. That one stays.','No. That one stays in.')],cb)],

/* ===================================== V: APART ===================================== */
 cold:[
 cb=>say([
  N('You work alone again. The spare room is empty, and the list is no shorter for your having had company.'),
  N('Tonight’s is a thing that lent money to widows. It is on the table, in the straps, and it has reached the stage at which they ask.'),
  N('“What the fuck do you get out of this?”'),
  N('You lean close. You have an answer. You have given it forty-three times, with the smallest of smiles, and you have meant it upon every occasion.'),
  K76V('Justice.'),
  N('“and ur a rich guy who kills broke psychos in a basement.” You hear it as plainly as if they were sitting on the counter with their boots on the steel, eating your cereal out of the box.'),
  N('The smile does not arrive. The thing on the table sees that it has not, and for a moment it hopes.'),
  K76V('(Nobody elected me. Nobody asked. I had the money for a table with drains.)'),
  N('You do it regardless. It lent at forty percent and took the houses; you have the deeds. The work is sound. The cuts are clean. There is a fine platter for Thursday.'),
  N('But you did not enjoy it, and you have always enjoyed it. They told you so across your own table: that they had seen your face. You wash your hands for a long while. Then you go up to write the entry, and under REASON your pen stops, and you look at the word as if somebody else had ruled the column.')],cb)]};

/* ===================================== DELIVERY ===================================== */
const k95St=()=>{try{if(!K95()||S.f.e2lEnd)return null;if(S.phase==='normal')return 'war';
 if(typeof kdMed==='function'&&kdMed())return (S.pov==='v'||kdClar()>=2)?'bed':null;
 if(['after','act2','act3'].includes(S.phase)&&k73Done('e2l_door'))return k73Done('e2l_row')?'cold':'up';return null}catch(e){return null}};
const K95_T={m:{war:['A man who imports shellfish','The rent: a letter on good paper','The lights on the ring road, ten past nine','A parcel on your step','The queue at his shelter'],bed:['Take a proper look at the room','Ask him how many','The work phone'],up:['The first job back','One of his, and you have brought the chainsaw','It starts over the salt','What you would charge for him','A night watchman, with a radio'],cold:['A man who owns a laundry']},
 v:{war:['The thing on the table mentions a contractor','Watch them work, for the file','The school sends its account','Their debtors','A letter to Inspector Hale'],bed:['Dress the hand','Ronin, and the odds','They want to hear the forty-one'],up:['A man in the newspaper','A visitor for your lodger','Bring the page up to date','A parcel in the cold-room door','Tuesday: the linen'],cold:['Alone, at the table']}};
const k95Next=()=>{const st=k95St();if(!st)return null;const f=S.f;if(f.e2l95Day===S.day)return null;const F=f.e2l95||{},p=S.pov==='v'?'v':'m',A=(p==='v'?K95_V:K95_M)[st],i=F[st]||0;
 return i<A.length?{fn:A[i],st,i,p}:null};
function k95Run(){const e=k95Next();if(!e)return hub();const f=S.f;f.e2l95=f.e2l95||{};f.e2l95[e.st]=e.i+1;f.e2l95Day=S.day;save();go(cutBg(e.st==='bed'?'#141a18':e.st==='war'?'#0b0a0d':'#0e0c0a'));e.fn(hub)}
const _sh95=sideHub;sideHub=function(late){const o=_sh95(late);try{if(S){const e=k95Next();if(e)o.push({t:'⚔ '+K95_T[e.p][e.st][e.i],sub:'free · the quarrel · '+(e.st==='war'?'he has a law, they have rent':e.st==='bed'?'it does not stop for a drip':e.st==='up'?'under one roof':'apart'),fn:k95Run})}}catch(e){}return o};

/* ===================================== A YEAR ON: THREE MORE ===================================== */
if(typeof K83E!=='undefined'){
 K83E.pet={t:()=>'What you called him',lov:m=>[
   N(m?'It comes out at breakfast. You are not thinking. You want the jam.':'It is said at breakfast. They are not attending. They want the jam.'),
   K76MV('pass the jam, sugar honey dumpling','pass the jam, sugar honey dumpling','Pass the jam, sugar honey dumpling.','Pass the jam, sugar honey dumpling.'),
   N(m?'The kitchen goes quiet. You hear what you said. In a year he has been “ur honour”, and “moneybags”, and once, in the dark, a thing that you will take to the grave. Never that one. That one you were keeping.':'The kitchen is silent. In a year you have been “ur honour”, and “moneybags”, and upon one occasion something that you do not repeat. You have not been that.'),
   K76V('I beg your pardon?'),
   K76MV('nothing. jam','nothing. the jam','Nothing. The jam.','Nothing. Pass the jam.'),
   K76V('You said —'),
   K76MV('i KNOW what i said. it’s a figure of speech. i call everyone that','i know what i said. it’s a figure of speech. i call everybody that','I know what I said. It’s a figure of speech. I call everybody that.','I know what I said! It’s a figure of speech. I call everybody that.'),
   K76V('You have never called Ronin that.'),
   K76MV('…no. shut up','…no. shut up','…No. Shut up.','…No, I haven’t. Shut up.'),
   N(m?'He passes the jam. He is very careful with it. He does not smile; he is not a man who does. But he has to look out of the window for a while, and that evening you catch him writing it in the ledger, on your page, under the doorman, with the date.':'You pass the jam. You find that you must look out of the window for some time. That evening you enter it in the ledger, upon their page, beneath the doorman, with the date. It is not a charge. You have no other book.')],
  riv:m=>[
   N('War Day, at the bowling alley. Four lanes between you, as the terms require.'),
   K76MV('nice shoes, ur honour','nice shoes, your honour','Nice shoes, your honour.','Nice shoes, your honour. Very you.'),
   K76V('They are hired.'),
   N(m?'His ball comes back up the return. You see it before he does.':'Your ball comes back up the return. They see it before you do.'),
   K76MV('ur up, babe','you’re up, babe','You’re up, babe.','You’re up, babe.'),
   N(m?'It is out and across four lanes before you can get a hand on it. Angel’s head comes round like an owl’s.':'It crosses four lanes. Angel’s head comes round like an owl’s.'),
   [AN,'did you just —'],
   K76MV('NO','NO','No!','No! I did not!'),
   [RN,'They called him babe. I heard it. I’m changin’ the fuckin’ odds.'],
   K76V('It is a term of abuse. I have had worse from them.'),
   N(m?'He bowls. It is a strike. He does not look at you. You owe him one in the neck, and now you owe him for that as well.':'You bowl. It is a strike. You do not look at them. It was not a term of abuse. You know every one of theirs, and you have them in the file, and that was not among them.')]};
 K83E.work={t:()=>'A job',lov:m=>[
   N(m?'You work together, some nights. It is his list. You bring the rifle, and he brings the reason.':'They work with you, some nights. It is your list. They bring the rifle, and you bring the reason.'),
   K76MV('i still want paying','i still want paying','I still want paying.','I still want paying. I don’t work for free.'),
   K76V('There is nobody to pay you. There is no client.'),
   K76MV('then ur the client. nine hundred','then you’re the client. nine hundred','Then you’re the client. Nine hundred.','Then you’re the client. Nine hundred, same as the card man.'),
   N(m?'He pays it. Nine hundred, in an envelope, on the kitchen island, every time, and he writes it in the book under EXPENSES. You have told him that this makes him a man who hires killers. He went quite pale. He pays it anyway.':'You pay it. Nine hundred dollars, in an envelope, upon the kitchen island, and you enter it under EXPENSES. They have pointed out that this makes you a man who hires killers. It does. You have looked at the entry from every side, and it does, and you pay it.'),
   K76MV('what’d this one do','what did this one do?','What did this one do?','So what did this one do?'),
   N(m?'You ask every time now. You make out that it is to annoy him. Tonight it is a man who sold bad insulin, and you do him at five hundred metres through a bathroom window, and V says “left, two” from the next roof, and you both enjoy it very much.':'They ask every time now. They give out that it is to annoy you. Tonight it is a man who sold bad insulin. They take him at five hundred metres, through a bathroom window, on your call of the wind, and you both enjoy it very much.')],
  riv:m=>[
   N('There is a man who runs a care agency. He is on V’s page for the spring. He is also worth six thousand dollars to a nephew.'),
   N(m?'You are on the east roof. There is a long black car on the west side. You see each other at the same moment, and then you both look at the man in the middle.':'You are in the car, on the west side. They are on the east roof. You see one another at the same moment, and then you both look at the man between.'),
   X95('mine. i’ve got a client','mine. i’ve got a client'),
   V95('Mine. I have a reason.'),
   X95('race u','race you'),
   N(m?'You get him at the kerb. V reaches him forty seconds later, with the boot open, and stands over what you have left, and looks up at your roof.':'They take him at the kerb while you are still crossing the road. You stand over him with the boot open, and look up at the roof.'),
   V95('You have shot him through the liver.'),
   X95('6-4 to me this year','6-4 to me this year'),
   V95('Five. The pharmacist was mine by any fair reckoning.'),
   N('Ronin keeps the score on his fridge, under THE WAR. Neither of you has asked him to stop.')]};
 K83E.charges={t:()=>'The charges',lov:m=>[
   N(m?'The page is still in the ledger. He has not struck out a line of it. You checked in the first week that you slept in his bed, and you check on the first of every month.':'The page is in the ledger still. You have not struck out a line. They look, upon the first of each month. You leave the book where they will find it.'),
   K76V('A driver. A doorman. A man upon his own step, on a Tuesday. They are as they were.'),
   K76MV('good. i’d think u’d gone soft','good. i’d think you had gone soft','Good. I’d think you had gone soft.','Good. If you’d crossed them out I’d think you had gone soft.'),
   N(m?'What you have done is add to it. There is a facing page now, in his book, in your writing, in biro. K9. RICH. SMUG. HYPOCRITE. NOBODY ASKED HIM. FORTY-THREE, AND LIKES IT. TO BE KILLED (SOMEWHERE STUPID).':'What they have done is add to it. There is a facing page now, in your ledger, in biro. K9. RICH. SMUG. HYPOCRITE. NOBODY ASKED HIM. FORTY-THREE, AND LIKES IT. TO BE KILLED (SOMEWHERE STUPID).'),
   K76V('You have spelled “hypocrite” correctly.'),
   K76MV('angel helped','angel helped','Angel helped.','Angel helped. She had opinions.'),
   N(m?'Neither page has a date. You both believe every word of both. He turns the lamp out, and you put your cold feet on him.':'Neither page bears a date. Each of you believes every word of both. You put out the lamp, and they put their feet on you, and the feet are like ice.')],
  riv:m=>[
   N('The terms say that the charges are to be read aloud, once a year, on War Day, each to the other, with witnesses.'),
   K76V('Wanton. No inquiry made. A driver. A doorman. A man upon his own step, on a Tuesday. Rate: nine hundred dollars.'),
   N(m?'You have yours on a napkin.':'They have theirs upon a napkin.'),
   K76MV('rich. smug. nobody asked him. forty-three and likes it. bought my LOT','rich. smug. nobody asked him. forty-three, and likes it. bought my lot','Rich. Smug. Nobody asked him. Forty-three, and likes it. Bought my lot.','Rich. Smug. Nobody asked him. Forty-three, and he likes it. Also he bought my lot.'),
   [AN,'do either of you want to withdraw anything.'],
   K76V('No.'),
   K76MV('no','no','No.','No. Not a word.'),
   [RN,'This is the worst fuckin’ wedding I ever been to.'],
   K76V('It is not a wedding.'),
   K76MV('it’s NOT a wedding','it’s NOT a wedding','It’s not a wedding!','It is not a wedding!'),
   N(m?'You said it at the same time. Ronin writes something on his hand. You bowl a strike out of spite.':'It was said in the same breath. Ronin writes something upon his hand. You bowl, and it is a strike, and so is theirs.')]}}

/* ===================================== ENDINGS ===================================== */
const _xe95=extraEnding;extraEnding=function(){const L=_xe95();try{if(!S||!S.f||S.f.e2l!==1||S.rom||S.vrom||S.f.k28pair)return L;const f=S.f,F=f.e2l95||{},E=f.e2l83||{},m=S.pov!=='v';
 if(m&&(F.war||0)>=2)L.push('V bought the trailer lot, so that the landlord would take morals. Misaki paid the first month in quarters, through his gate, onto the gravel.');
 if(!m&&(F.war||0)>=1)L.push('On Misaki’s page, in V’s hand: “Rate: $900. No inquiry made.” Further down: “The best that I have seen. Sold by the hour.”');
 if(f.e2l95Driver==='wait')L.push('Misaki waited forty minutes for a bookmaker to get out of a car, and lost the bonus. The driver ran. “the angle was better.”');
 if(f.e2l95Driver==='car')L.push('The contract said the car. Misaki did the car. V amended a figure.');
 if(!m&&(F.war||0)>=3)L.push('Somebody in a hooded top left forty-one dollars at a school office, in ones. V did not enter it in the book.');
 if((F.bed||0)>=2)L.push(m?'“I should do it if nobody paid me. Would you?” Misaki blamed the drip.':'Ronin had it at four-to-one once V bought the toothbrush with the frog on it.');
 if(m&&(F.up||0)>=3)L.push('There were peaches on V’s wallpaper for a week. Nobody took anything back.');
 if(!m&&(F.up||0)>=2)L.push('Misaki turned down a quarter of a million dollars to kill V, on the ground that they had already sworn to do it for free.');
 if(f.e2l95Mit==='struck')L.push('V ruled a column headed IN MITIGATION on Misaki’s page, and struck it out.');
 if(f.e2l95Mit==='stands')L.push('There is a column on Misaki’s page headed IN MITIGATION. The only entry is theirs, in biro: “was hungry. still am. where’s dinner.”');
 if((F.cold||0)>=1)L.push(m?'Misaki rang a client in the middle of a job to ask what the mark had done. They had never asked before.':'A thing on V’s table asked what he got out of it. He said “Justice,” and for the first time the smile did not come.');
 if(E.pet&&f.e2lEnd==='lovers')L.push('In a year V was “ur honour” and “moneybags”. Then, at breakfast, over the jam, he was something else. He wrote it in the ledger with the date.');
 if(E.charges)L.push(f.e2lEnd==='lovers'?'Neither of them has withdrawn a charge. Misaki’s are in his ledger now, on the facing page, in biro.':'“This is the worst fuckin’ wedding I ever been to.” “It is not a wedding.” “it’s NOT a wedding”')}catch(e){}return L};
/* ===KC95-END=== */

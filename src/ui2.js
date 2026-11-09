/* ===================== UI 2: HUD, BAG, DIALOGUE, MENU, NOTIFICATIONS =====================
   One-row HUD with a time track and contextual stats; a Bag (inventory) with tabs, pixel icons, a detail pane,
   gift tastes that reveal as you give, eat/give/inspect, sorting and keyboard/gamepad control; numbered dialogue
   choices, dimmed already-picked choices, Skip that only skips read lines and stops at choices; a stacked
   notification feed; a sectioned pause menu. */
(function(){const st=document.createElement('style');st.textContent=`
#hud{display:flex;align-items:center;gap:8px;flex-wrap:nowrap;overflow-x:auto;font-size:17px;min-height:30px;padding:2px 0}
#hud .hx{display:flex;align-items:center;gap:6px;background:linear-gradient(180deg,#1c1724,#120e18);border:1px solid var(--dim);border-radius:3px;padding:2px 8px;white-space:nowrap;line-height:1.1}
#hud .hx.btn{cursor:pointer;position:relative}#hud .hx.btn:hover{border-color:var(--blood)}#hud .hx.menu{border-color:var(--blood);color:#fff}
#hud .day{font-size:20px;color:#fff;letter-spacing:1px}#hud .pips{display:flex;gap:3px}#hud .pips i{width:9px;height:9px;border:1px solid #6a5f78;display:block;transform:rotate(45deg)}#hud .pips i.on{background:#f2d24a;border-color:#f2d24a;box-shadow:0 0 6px #f2d24a}#hud .pips i.past{background:#4a4058}
#hud .ph{color:#ffb0b8;font-size:.85em;border:1px solid var(--blood);padding:0 4px}
#hud .st{display:flex;flex-direction:column;gap:1px;min-width:52px}#hud .st small{font-size:12px;opacity:.75;letter-spacing:.5px;text-transform:uppercase}
#hud .bar{height:6px;background:#2e2638;position:relative;overflow:hidden}#hud .bar i{position:absolute;inset:0 auto 0 0;display:block}
#hud .money{color:#f2d24a}#hud .grow{flex:1 0 4px}#hud .badge2{position:absolute;top:-6px;right:-6px;background:var(--blood);color:#fff;font-size:12px;line-height:14px;min-width:14px;text-align:center;border-radius:7px;padding:0 3px}
#hud .tier{color:var(--teal)}#hud kbd{font-family:inherit;font-size:12px;opacity:.55;border:1px solid #4a4058;padding:0 3px;margin-left:2px}
#wrap>.hint{font-size:14px;opacity:.5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#wrap>.hint br{display:none}
.feed{position:absolute;top:calc(9% + 4px);right:8px;display:flex;flex-direction:column;gap:4px;align-items:flex-end;pointer-events:none;z-index:7;max-width:60%}
.feed .fi{display:flex;align-items:center;gap:8px;background:rgba(16,12,22,.95);border:1px solid var(--dim);border-left:3px solid var(--blood);padding:2px 10px 2px 6px;font-size:clamp(14px,2vw,19px);box-shadow:0 4px 12px rgba(0,0,0,.5);animation:fin .2s ease-out}
.feed .fi.out{opacity:0;transform:translateX(16px);transition:.3s}.feed .fi img{width:24px;height:24px;image-rendering:pixelated}.feed .fi.got{border-left-color:#f2d24a}.feed .fi.ach{border-left-color:#5fd4c4}
@keyframes fin{from{opacity:0;transform:translateX(20px)}}
.toast{display:none!important}
.dlg{border-left:4px solid var(--sp,var(--paper))!important}.dlg .who{color:var(--sp,inherit)}

.opt.seen{opacity:.6}.opt.seen::after{content:' ✓';color:#7a6f88;font-size:.8em}
.dbtn span[data-d=skip].on{border-color:#f2d24a;color:#f2d24a}
.bag{position:absolute;inset:4% 3%;z-index:8;display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:10px;background:linear-gradient(180deg,rgba(22,16,28,.98),rgba(10,8,14,.98));box-shadow:0 0 0 2px var(--paper),0 0 0 4px #000,0 14px 40px rgba(0,0,0,.7);padding:10px 12px;animation:fi .15s}
.bag h2{margin:0;font-weight:normal;color:var(--blood);font-size:clamp(20px,3.2vw,30px);display:flex;gap:10px;align-items:baseline}.bag h2 small{color:#a99fb6;font-size:.55em}
.bag .left{display:flex;flex-direction:column;min-height:0;gap:6px}.bag .tabs2{display:flex;gap:4px;flex-wrap:wrap}.bag .tabs2 span{border:1px solid var(--dim);padding:0 8px;cursor:pointer;opacity:.65;font-size:.85em}.bag .tabs2 span.on{opacity:1;border-color:var(--blood);color:#fff;background:rgba(208,40,63,.25)}.bag .tabs2 kbd{font-family:inherit;font-size:.75em;opacity:.6;margin-right:3px}
.bag .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(54px,1fr));gap:5px;overflow:auto;align-content:start;padding:2px;flex:1;min-height:0}
.bag .slot{position:relative;aspect-ratio:1;background:#16121e;border:1px solid #2e2638;display:flex;align-items:center;justify-content:center;cursor:pointer}.bag .slot img{width:70%;height:70%;image-rendering:pixelated}
.bag .slot.sel{border-color:#f2d24a;box-shadow:inset 0 0 0 1px #f2d24a,0 0 10px rgba(242,210,74,.3)}.bag .slot .n{position:absolute;right:3px;bottom:0;font-size:.75em;color:#fff;text-shadow:1px 1px 0 #000}.bag .slot .nw{position:absolute;left:3px;top:1px;width:6px;height:6px;background:var(--blood);border-radius:50%}
.bag .slot.ks{background:#1a1626;border-color:#3a3050}.bag .empty{opacity:.55;padding:12px;grid-column:1/-1}
.bag .det{display:flex;flex-direction:column;gap:6px;border-left:1px solid #2e2638;padding-left:10px;min-height:0;overflow:auto}
.bag .det .big{display:flex;gap:10px;align-items:center}.bag .det .big img{width:64px;height:64px;image-rendering:pixelated;background:#16121e;border:1px solid #2e2638;padding:4px}
.bag .det .nm{font-size:clamp(18px,2.6vw,26px);color:#fff;line-height:1}.bag .det .cat{font-size:.75em;letter-spacing:2px;text-transform:uppercase;color:var(--teal)}
.bag .det p{margin:0;line-height:1.15;font-size:.9em}.bag .det .likes{display:flex;flex-direction:column;gap:2px;font-size:.85em}.bag .det .likes b{font-weight:normal}
.bag .det .th{font-style:italic;color:#cfc4d8;border-left:2px solid #6a5f78;padding-left:8px}
.bag .acts{display:flex;gap:6px;flex-wrap:wrap;margin-top:auto}.bag .acts button{font-family:inherit;font-size:clamp(15px,2vw,19px);background:#1a1422;color:#ece4da;border:1px solid var(--dim);padding:2px 12px;cursor:pointer}.bag .acts button.sel{border-color:var(--blood);background:rgba(208,40,63,.3);color:#fff}.bag .acts button:disabled{opacity:.35;cursor:default}
.bag .foot{font-size:.7em;opacity:.55}.bag .x{position:absolute;top:4px;right:8px;cursor:pointer;opacity:.7}
@media (max-width:640px){.bag{grid-template-columns:1fr;grid-template-rows:minmax(0,1fr) auto}.bag .det{border-left:0;border-top:1px solid #2e2638;padding:6px 0 0;max-height:46%}}
.pausebox .pm{min-width:min(560px,92%);background:linear-gradient(180deg,#16101c,#0d0a12);box-shadow:0 0 0 2px var(--paper),0 0 0 4px #000}.pausebox .pm h2{border-bottom:2px solid var(--blood);display:inline-block;padding-right:16px}
.pausebox .pm{min-width:min(720px,94%);padding:10px 16px}.pausebox .pm h2{font-size:clamp(20px,3vw,28px)}.pbtns{grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:4px}.pbtns button{padding:3px 8px;font-size:clamp(14px,1.9vw,18px)}.pbtns button{display:flex;justify-content:space-between;gap:8px;align-items:center}.pbtns button kbd{font-family:inherit;font-size:.75em;opacity:.55;border:1px solid #4a4058;padding:0 4px}
.pbtns button[data-p=resume],.pbtns button[data-u=bag]{border-color:var(--blood)}.pbtns .ph2{grid-column:1/-1;text-transform:uppercase;letter-spacing:2px;font-size:.75em;color:var(--teal);border-bottom:1px solid var(--dim);margin-top:4px}
`;document.head.appendChild(st)})();
/* ---------- item data ---------- */
const IDESC={lavender:'A sprig from somebody’s window box. Smells like sleep.',sticker:'A sheet of knife-heart stickers. Eleven left. There were twelve.',onigiri:'A corner-store egg sandwich. The wrapper never opens cleanly.',sketch:'A page torn out of V’s sketchbook. One of the hounds, drawn from the inside: the muscle, the plates in the skull, the old sutures, each one labelled.',latte:'A latte lifted from V’s machine. Still warm, technically.',dogphoto:'A photo of one of V’s hounds. It is looking straight down the lens. Nobody remembers taking it.',plush:'A claw-machine dog plushie. Nothing like the real ones.',ramen:'Fancy instant ramen, the kind with the little oil packet.',pumpkin:'A small pumpkin from the greenhouse planter.',vinyl:'A record with a hand-drawn sleeve. Ronin’s handwriting on the label.',lipstick:'A lipstick in a colour called “Crime Scene.”',scarf:'A hand-knit scarf. One end is tighter than the other.',socks:'Hand-knit socks. Mismatched on purpose.',beanie:'A hand-knit beanie with a pompom that won’t sit straight.',bracelet:'A beaded friendship bracelet. The letters spell something rude.',dorayaki:'Two pancakes with jam pressed between them. Sticky.',mug:'A mug. “WORLD’S OKAYEST” something. The rest is chipped.',etonmess:'Eton mess in a takeaway tub. It is, as promised, a mess.',novel:'A paperback with the cover torn off. Somebody underlined things.',strawberry:'A punnet of strawberries. Half are already gone.',mango:'A ripe mango. Messy. Worth it.',dragonfruit:'Dragonfruit. Pink outside, speckled inside, tastes like almost nothing.',papaya:'A papaya. Ronin says it’s a fruit for people with patience.',amigurumi:'A tiny crocheted dog. The only dog in this city anybody would call cute.',poison:'A lab vial, stoppered, unlabelled on purpose.'};
const IEAT={onigiri:12,latte:8,ramen:15,dorayaki:10,strawberry:5,mango:6,dragonfruit:5,papaya:6,etonmess:12,pumpkin:0};
const IICON={lavender:['flower','#9a7ad0'],sticker:['sheet','#c2253a'],onigiri:['onigiri'],sketch:['paper'],latte:['cup','#c8a070'],dogphoto:['photo','#c98a3a'],plush:['plush','#8a6a4a'],ramen:['bowl','#e0c070'],pumpkin:['gourd','#e07a2a'],vinyl:['disc','#c2253a'],lipstick:['lip','#a01a2a'],scarf:['yarn','#5fd4c4'],socks:['yarn','#ff8ab0'],beanie:['yarn','#f2d24a'],bracelet:['ring','#ff8ab0'],dorayaki:['dora'],mug:['cup','#f4f0ea'],etonmess:['bowl','#f4c0d0'],novel:['book','#2a3a5a'],strawberry:['fruit','#d02a3a'],mango:['fruit','#f0a030'],dragonfruit:['fruit','#e050a0'],papaya:['fruit','#f08040'],amigurumi:['plush','#c98a3a'],poison:['vial','#7fe08a']};
const icat=k=>k==='poison'?'tools':k.startsWith('dish_')||IEAT[k]!==undefined?'food':'gift';
const irec=k=>k.startsWith('dish_')&&typeof RECIPES!=='undefined'?RECIPES.find(r=>'dish_'+r.id===k):null;
function iname(k){return ITEMS[k]||k}
function idesc(k){const r=irec(k);if(r)return r.note||'Home-cooked. Still warm, if you’re quick.';return IDESC[k]||'Something you picked up and kept, for reasons.'}
function ieat(k){const r=irec(k);if(r)return r.eff||{energy:15};const e=IEAT[k];return e?{energy:e}:null}
/* ---------- pixel icons (16x16), cached as data URLs ---------- */
const ICONC={};
function iconURL(spec){const key=spec.join('|');if(ICONC[key])return ICONC[key];const o=document.createElement('canvas');o.width=o.height=16;const g=o.getContext('2d');if(!g)return'';
 const r=(x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(x,y,w,h)};const [s,a='#c2253a',b2]=spec;const dk='#141014',wh='#f4f0ea';
 const S={flower:()=>{r(7,6,2,9,'#3f8a46');for(let i=0;i<5;i++){r(5+(i%2)*4,1+i*2,3,2,a)}r(9,9,3,2,'#3f8a46')},sheet:()=>{r(3,2,10,12,wh);r(3,2,10,1,'#d8d0c0');r(5,5,2,2,a);r(7,5,2,2,a);r(5,7,4,1,a);r(6,8,2,1,a);r(9,10,2,2,a);r(10,11,1,1,wh)},
  onigiri:()=>{for(let i=0;i<7;i++)r(8-i,3+i,2*i+1,1,'#e8c890');r(3,10,11,3,'#e8c890');r(4,8,9,2,'#f2d24a');r(5,7,7,1,'#f4f0ea');r(7,2,2,1,'#c89a60')},paper:()=>{r(3,2,10,12,'#e8dcc8');r(3,13,3,1,'#c8bca8');r(9,13,4,1,'#c8bca8');r(5,5,6,1,'#7a6a5a');r(5,8,4,3,'#c98a3a');r(9,9,2,1,'#7a6a5a')},
  cup:()=>{r(3,5,8,9,a);r(11,7,3,4,a);r(12,8,1,2,'#00000000');r(4,6,6,1,'rgba(255,255,255,.4)');r(5,1,1,3,'rgba(255,255,255,.5)');r(8,2,1,2,'rgba(255,255,255,.5)')},photo:()=>{r(2,3,12,10,wh);r(3,4,10,7,'#5a7a9a');r(5,7,5,3,a);r(9,6,2,2,a);r(4,12,8,1,'#c8c0b0')},
  plush:()=>{r(4,5,8,8,a);r(3,3,3,4,a);r(10,3,3,4,a);r(6,8,1,1,dk);r(9,8,1,1,dk);r(7,10,2,1,dk);r(5,11,6,2,'rgba(255,255,255,.15)')},bowl:()=>{r(2,8,12,2,'#c8c0b0');r(3,10,10,2,'#a8a090');r(5,12,6,2,'#888078');r(3,6,10,2,a);r(5,2,1,3,'rgba(255,255,255,.4)');r(9,1,1,4,'rgba(255,255,255,.4)')},
  gourd:()=>{r(3,6,10,8,a);r(2,8,12,4,a);r(7,6,1,8,'rgba(0,0,0,.2)');r(7,3,2,3,'#3a5a2a')},disc:()=>{r(2,2,12,12,dk);r(3,1,10,14,dk);r(1,3,14,10,dk);r(6,6,4,4,a);r(7,7,2,2,wh);r(4,4,2,1,'rgba(255,255,255,.2)')},
  lip:()=>{r(6,8,5,7,'#2a2a30');r(6,8,5,1,'#c9a050');r(7,3,3,5,a);r(7,2,2,1,a)},yarn:()=>{r(4,4,8,8,a);r(3,5,10,6,a);r(5,3,6,10,a);r(4,6,8,1,'rgba(0,0,0,.2)');r(5,9,7,1,'rgba(0,0,0,.2)');r(12,12,3,1,a)},
  ring:()=>{for(let i=0;i<8;i++){const t=i/8*6.283;r(7+Math.round(Math.cos(t)*5),7+Math.round(Math.sin(t)*5),2,2,[a,'#f2d24a','#8ad4ff'][i%3])}},dora:()=>{r(2,4,12,3,'#b8743a');r(2,7,12,2,'#5a2a2a');r(2,9,12,3,'#b8743a');r(3,4,10,1,'#d8945a')},
  book:()=>{r(3,2,10,12,a);r(3,2,2,12,'#141a2a');r(6,5,5,1,'#c9a050');r(12,3,1,10,wh)},fruit:()=>{r(4,5,8,8,a);r(3,6,10,6,a);r(5,6,2,2,'rgba(255,255,255,.35)');r(7,2,2,3,'#3a7a3a');r(9,3,3,2,'#4a9a4a')},
  vial:()=>{r(6,1,4,3,'#8a6a40');r(5,4,6,10,'rgba(200,240,220,.5)');r(5,8,6,6,a);r(6,5,1,6,'rgba(255,255,255,.5)')},box:()=>{r(2,5,12,9,a);r(7,5,2,9,'#f2d24a');r(2,8,12,2,'#f2d24a');r(5,2,3,3,'#f2d24a');r(8,2,3,3,'#f2d24a')},
  can:()=>{r(5,4,6,10,'#6a6a72');r(5,4,6,2,'#8a8a92');r(7,2,2,2,'#3a3a42');r(6,8,4,2,a)},tube:()=>{r(1,6,14,4,'#3a3a42');r(1,6,14,1,'#6a6a72');r(3,7,1,2,'#141018');r(6,7,1,2,'#141018');r(9,7,1,2,'#141018')},pick:()=>{r(2,7,9,2,'#b8b8c0');r(11,6,3,4,'#6a6a72');r(2,6,2,1,'#b8b8c0');r(4,9,2,1,'#b8b8c0')},
  card:()=>{r(2,4,12,8,'#141418');r(2,6,12,2,'#5fd4c4');r(4,9,4,1,'#8a8a92')},bone:()=>{r(4,7,8,2,'#e8d8b0');r(2,5,3,3,'#e8d8b0');r(2,8,3,3,'#e8d8b0');r(11,5,3,3,'#e8d8b0');r(11,8,3,3,'#e8d8b0')},
  star:()=>{r(7,1,2,14,a);r(1,7,14,2,a);r(4,4,8,8,a);r(6,6,4,4,'#fff')},ticket:()=>{r(1,4,14,8,'#e8dcc8');r(4,4,1,8,'#a89a88');r(6,6,7,1,'#5a4a3a');r(6,9,5,1,'#5a4a3a');r(13,4,2,2,'#00000000')},
  letter:()=>{r(1,3,14,10,'#f4f0ea');r(1,3,14,1,'#c8c0b0');for(let i=0;i<7;i++){r(1+i,4+i,1,1,'#c8c0b0');r(14-i,4+i,1,1,'#c8c0b0')}r(10,9,3,3,a)},bike:()=>{r(1,9,5,5,'#141018');r(10,9,5,5,'#141018');r(2,10,3,3,'#2a2a30');r(11,10,3,3,'#2a2a30');r(4,7,8,2,a);r(7,5,2,4,a);r(11,5,3,1,'#6a6a72')},
  list:()=>{r(3,1,10,14,'#f4f0ea');for(let i=0;i<5;i++)r(5,3+i*2,6-(i%2)*2,1,'#5a5a6a');r(5,13,3,1,a)},clip:()=>{r(3,7,10,2,'#8a8a92');for(let i=0;i<5;i++)r(8,2,1,12,'#00000000');r(6,2,4,4,'#f2d24a');r(5,3,6,2,'#f2d24a');r(7,1,2,6,'#f2d24a')}};
 (S[s]||S.box)();return ICONC[key]=o.toDataURL()}
function iicon(k){if(IICON[k])return iconURL(IICON[k]);if(k.startsWith('dish_'))return iconURL(['bowl',['#e0c070','#c2603a','#f4f0ea','#7a4a2a','#e8a0b0'][Math.abs([...k].reduce((a,c)=>a+c.charCodeAt(0),0))%5]]);return iconURL(['box','#c2253a'])}
/* ---------- gear and keepsakes (not in S.inv) ---------- */
function gearList(){const L=[];const add=(id,n,d,ic,c)=>L.push({id,n,d,ic,c,tool:1});
 if(S.smoke)add('smoke','Smoke grenade',`Pop one, lose them in it. ×${S.smoke}`,['can','#8a8a92'],S.smoke);if(S.sup)add('sup','Suppressor','Quiet is a kind of manners.',['tube']);if(S.pick)add('pick','Boot lockpick','Lives in the left boot. Has opened worse.',['pick']);
 if(S.key)add('key','Vault keycard','Found on the old hound’s collar. It let you take it. That is the frightening part.',['card']);if(S.treat)add('treat','Raw meat, wrapped','For the hounds. V weighs every portion.',['bone']);return L}
function keepList(){const t=(S.td&&S.td.f)||{};const L=[];const add=(id,n,d,ic)=>L.push({id,n,d,ic,keep:1});
 if(t.stars)add('k_stars','49.8','Glow stars on the trailer ceiling. Fastest girl in the prefecture, one summer.',['star','#b8ffc0']);
 if(t.drawerDone)add('k_ticket','A one-way ticket','The train ticket she left home on. On the back: “you’re allowed.”',['ticket']);
 if(t.coach)add('k_coach','A card to Coach','Eight years late. “still fast. different track.”',['letter','#f2d24a']);
 if(t.clip)add('k_clip','The lost star clip','Day three, the rooftop. V has carried it ever since.',['clip']);
 if(t.book)add('k_book','“Half agony, half hope”','The line V underlined in Persuasion, traced until the pencil shone.',['book','#5a3a2a']);
 if(t.opLetters)add('k_stay','“Stay.”','The one word that survived the eraser.',['letter','#c2253a']);
 if(t.bike)add('k_bike','A bike with stabilisers','Navy blue, name scratched off. In the garage, behind the crates.',['bike','#2a4a7a']);
 if(t.keepList)add('k_keep','The keep-list','THINGS SHE HAS SAID THAT I WANT TO KEEP. The bottom is blank on purpose.',['list']);
 if(S.f&&S.f.motherPhoto)add('k_maman','“Maman. New Year.”','A photo from under the floorboard. A woman mid-song with a wooden spoon.',['photo','#c9a050']);
 if(S.photos&&S.photos.length)add('k_photos',`Photos (${S.photos.length})`,'Snapshots you took. Press C in any room to take another.',['photo','#5fd4c4']);
 return L}
/* ---------- who can take a gift right now ---------- */
function giftTargets(){const L=[];const has=k=>L.push(k);
 if(scene&&scene.td&&scene.npcList)scene.npcList.forEach(n=>{if(['v','m','a','r'].includes(n.k)&&Math.hypot(n.x-scene.p.x,n.y-scene.p.y)<90)has(n.k)});
 else if(scene&&scene.isRoom&&typeof partnerHere==='function'&&ROOMS[S.room]){const p=partnerHere(S.room);if(p)has(p)}
 const me=ME2()==='K9'?'v':'m';return L.filter((k,i)=>L.indexOf(k)===i&&k!==me)}
const WHO={v:'V',m:'Misaki',a:'Angelic',r:'Ronin'};
/* ---------- the Bag ---------- */
const BAG={tab:'all',sel:0,sort:'new',mode:'grid',act:0,el:null,prev:null,thought:'',seen:null};
const BTABS=[['all','All'],['gift','Gifts'],['food','Food'],['tools','Tools'],['keep','Keepsakes']];
function bagItems(){const inv=Object.keys(S.inv||{}).filter(k=>S.inv[k]>0).map(k=>({id:k,n:iname(k),c:S.inv[k],cat:icat(k)}));
 let L=BAG.tab==='all'?inv.concat(gearList().map(g=>Object.assign({cat:'tools'},g))):BAG.tab==='keep'?keepList():BAG.tab==='tools'?inv.filter(i=>i.cat==='tools').concat(gearList()):inv.filter(i=>i.cat===BAG.tab);
 if(BAG.sort==='az')L=L.slice().sort((a,b)=>a.n.localeCompare(b.n));if(BAG.sort==='count')L=L.slice().sort((a,b)=>(b.c||0)-(a.c||0));return L}
function bagOpen(tab){if(!S||dlg||PAUSED||BAG.el)return;if(document.querySelector('.logbox'))return;BAG.prev=ctrl;if(tab)BAG.tab=tab;BAG.sel=0;BAG.mode='grid';BAG.thought='';BAG.seen=BAG.seen||Object.assign({},S.f.bagSeen||{});
 const el=document.createElement('div');el.className='bag';ui.appendChild(el);BAG.el=el;ctrl=BAG.C;sfx('sel');bagRender()}
function bagClose(){if(!BAG.el)return;BAG.el.remove();BAG.el=null;S.f.bagSeen=BAG.seen;save();ctrl=BAG.prev&&document.body.contains(BAG.prev.box||ui)?BAG.prev:null;BAG.prev=null;if(ctrl===BAG.C)ctrl=null;drawHud()}
function bagActs(it){if(!it)return[];if(it.keep)return[{t:'Remember',fn:()=>{BAG.thought=it.d}}];if(it.tool)return[{t:'Inspect',fn:()=>{BAG.thought=it.d}}];
 const A=[];const eat=ieat(it.id);if(eat)A.push({t:'Eat',fn:()=>bagEat(it)});
 giftTargets().forEach(w=>A.push({t:'Give to '+WHO[w],fn:()=>bagGive(it,w)}));
 A.push({t:'Inspect',fn:()=>{BAG.thought=bagThink(it)}});return A}
function bagThink(it){const v=ME2()==='K9';const k=it.id;const pv=S.f['pref_v'+k]&&PREF.v[k],pm=S.f['pref_m'+k]&&PREF.m[k];
 if(v)return pm?`She ${pm[0]>=6?'loved':pm[0]>=3?'liked':'tolerated'} this. I keep a note.`:it.cat==='food'?'Food. I should eat it, or give it to someone who forgets to.':'I am not sure who this is for yet. Someone will tell me.';
 return pv?`he ${pv[0]>=6?'loved':pv[0]>=3?'liked':'was polite about'} this one. noted. obviously.`:it.cat==='food'?'snack. or a gift. or a snack.':'who’s this for. i’ll know when i see their face.'}
function bagEat(it){const e=ieat(it.id);S.inv[it.id]--;apply(e);sfx('chime');if(S.dark&&typeof calm==='function')calm(2);
 BAG.thought=ME2()==='K9'?pk(['He eats standing up, the way he always does. Then sits down, because she would tell him to.','Good. Fuel. ...Very good, actually.']):pk(['nom. ok. better.','ate it. feel like a person again. a small one.','that hit the spot. the spot was empty.']);toast(fx(e)||'Ate it');bagRender()}
function bagGive(it,w){bagClose();const back=()=>{if(scene&&scene.isRoom)toRoom(S.room,S.roomPos||scene.pos())};
 if(w==='a'||w==='r'){friendGift(w,back)}else giftMenu(w,back);
 setTimeout(()=>{const o=[...document.querySelectorAll('.dlg .opt')].find(e=>e.textContent.replace(/^\d+\s*/,'').startsWith(iname(it.id)));if(o)o.click()},30)}
function bagRender(){const el=BAG.el;if(!el)return;const L=bagItems();BAG.sel=clamp(BAG.sel,0,Math.max(0,L.length-1));const it=L[BAG.sel];const A=bagActs(it);BAG.act=clamp(BAG.act,0,Math.max(0,A.length-1));
 const total=Object.values(S.inv||{}).reduce((a,b)=>a+Math.max(0,b),0)+(typeof gearList==='function'?gearList().length:0);const cashTxt=isM()&&S.pov!=='v'?money(S.yen):`$${S.funds}k`;
 const likes=it&&!it.tool&&!it.keep?['v','m','a','r'].map(w=>{const P=w==='v'||w==='m'?PREF[w][it.id]:(typeof FPREF!=='undefined'&&FPREF[w]&&FPREF[w][it.id]);const known=w==='v'||w==='m'?S.f['pref_'+w+it.id]:null;if(w==='a'||w==='r')return null;return`<b style="color:${NCOL[w]}">${WHO[w]}</b> · ${known&&P?(P[0]>=6?'♥ loved it':P[0]>=3?'liked it':'meh'):'<span style="opacity:.55">? not given yet</span>'}`}).filter(Boolean):[];
 const thought=BAG.thought?`<p class="th">${esc2(BAG.thought)}</p>`:'';
 el.innerHTML=`<span class="x" data-b="x">✕</span><div class="left"><h2>${ME2()==='K9'?'Pockets':'Bag'} <small>${total} item${total===1?'':'s'} · ${cashTxt}</small></h2>
 <div class="tabs2">${BTABS.map((t,i)=>`<span class="${t[0]===BAG.tab?'on':''}" data-t="${t[0]}">${t[1]}</span>`).join('')}<span data-b="sort" style="margin-left:auto">sort: ${{new:'newest',az:'A–Z',count:'count'}[BAG.sort]}</span></div>
 <div class="grid">${L.length?L.map((x,i)=>`<div class="slot${i===BAG.sel?' sel':''}${x.keep?' ks':''}" data-i="${i}" title="${esc2(x.n)}"><img alt="" src="${x.ic?iconURL(x.ic):iicon(x.id)}">${x.c>1?`<span class="n">${x.c}</span>`:''}${!BAG.seen[x.id]?'<span class="nw"></span>':''}</div>`).join(''):`<div class="empty">${BAG.tab==='keep'?'Nothing yet. Things you find in the trailer and the house end up here.':'Empty. Shops, the corner store, cooking and the claw machine fill it.'}</div>`}</div>
 <div class="foot">←→↑↓ choose · E use · Shift next tab · Esc close</div></div>
 <div class="det">${it?`<div class="big"><img alt="" src="${it.ic?iconURL(it.ic):iicon(it.id)}"><div><div class="nm">${esc2(it.n)}</div><div class="cat">${it.keep?'keepsake':it.tool?'gear':it.cat}${it.c>1?' · ×'+it.c:''}</div></div></div>
  <p>${esc2(it.keep||it.tool?it.d:idesc(it.id))}</p>${(()=>{const e=!it.keep&&!it.tool&&ieat(it.id);return e?`<p style="color:#7fe08a">Eat: ${fx(e)}</p>`:''})()}
  ${likes.length?`<div class="likes">${likes.map(l=>`<span>${l}</span>`).join('')}</div>`:''}${thought}
  <div class="acts">${A.map((a,i)=>`<button type="button" data-a="${i}" class="${BAG.mode==='act'&&i===BAG.act?'sel':''}">${a.t}</button>`).join('')}</div>`:'<p class="th">Pick something on the left.</p>'}</div>`;
 if(it&&!BAG.seen[it.id]){BAG.seen[it.id]=1}
 el.onclick=e=>{const t=e.target.closest('[data-t],[data-i],[data-a],[data-b]');if(!t)return;if(t.dataset.t){BAG.tab=t.dataset.t;BAG.sel=0;BAG.thought='';BAG.mode='grid'}else if(t.dataset.i!==undefined){const i=+t.dataset.i;if(i===BAG.sel&&BAG.lastClick&&Date.now()-BAG.lastClick<350&&A[0])A[0].fn();BAG.sel=i;BAG.lastClick=Date.now();BAG.thought='';BAG.mode='grid'}
  else if(t.dataset.a!==undefined){const a=bagActs(bagItems()[BAG.sel])[+t.dataset.a];if(a)a.fn();if(!BAG.el)return}else if(t.dataset.b==='x'){bagClose();return}else if(t.dataset.b==='sort'){BAG.sort={new:'az',az:'count',count:'new'}[BAG.sort]}sfx('blip');bagRender()};
 const s=el.querySelector('.slot.sel');if(s&&s.scrollIntoView)s.scrollIntoView({block:'nearest'})}
function esc2(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
BAG.C={box:null,update(){if(!BAG.el)return;const L=bagItems();const g=BAG.el.querySelector('.grid');const cols=g?Math.max(1,getComputedStyle(g).gridTemplateColumns.split(' ').length):6;let ch=false;
 if(BAG.mode==='act'){const A=bagActs(L[BAG.sel]);if(hit('left')){BAG.act=(BAG.act-1+A.length)%A.length;ch=true}if(hit('right')){BAG.act=(BAG.act+1)%A.length;ch=true}if(hit('act')&&A[BAG.act]){A[BAG.act].fn();if(!BAG.el)return;BAG.mode='grid';ch=true}if(hit('back')||hit('up')){BAG.mode='grid';ch=true}if(ch){sfx('blip');bagRender()}return}
 if(hit('left')){BAG.sel=Math.max(0,BAG.sel-1);ch=true}if(hit('right')){BAG.sel=Math.min(L.length-1,BAG.sel+1);ch=true}if(hit('up')){BAG.sel=Math.max(0,BAG.sel-cols);ch=true}if(hit('down')){BAG.sel=Math.min(L.length-1,BAG.sel+cols);ch=true}
 if(hit('alt')){const i=BTABS.findIndex(t=>t[0]===BAG.tab);BAG.tab=BTABS[(i+1)%BTABS.length][0];BAG.sel=0;ch=true}
 if(hit('act')&&L[BAG.sel]){const A=bagActs(L[BAG.sel]);if(A.length===1){A[0].fn();if(!BAG.el)return}else{BAG.mode='act';BAG.act=0}ch=true}
 if(hit('back')){bagClose();return}if(ch){BAG.thought=BAG.mode==='act'?BAG.thought:'';sfx('blip');bagRender()}}};
if(typeof window!=='undefined')addEventListener('keydown',e=>{const k=e.key;if(BAG.el){if(k.toLowerCase()==='i'){bagClose()}return}
 if(k.toLowerCase()==='i'&&S&&!dlg&&!PAUSED&&!e.ctrlKey&&!e.metaKey&&!(document.activeElement&&/INPUT|TEXTAREA/.test(document.activeElement.tagName))&&(!ctrl||document.querySelector('.panel'))&&!(typeof OV!=='undefined'&&OV))bagOpen()});
/* ---------- HUD ---------- */
const _dhUI=drawHud;drawHud=function(){_dhUI();if(!S||!hud)return;const v=S.pov==='v'&&!isM()?1:0;const meM=isM()&&S.pov!=='v';
 const bar=(lab,val,col,tip)=>`<span class="st" title="${tip||lab}: ${Math.round(val)}"><small>${lab}</small><span class="bar"><i style="width:${clamp(val)}%;background:${col}"></i></span></span>`;
 const pips=SLOTS.map((n,i)=>`<i class="${i===Math.min(S.slot,3)?'on':i<S.slot?'past':''}" title="${n}"></i>`).join('');
 const ph=S.phase==='taken'?'<span class="ph">TAKEN</span>':S.phase==='after'?'<span class="ph">after</span>':S.phase==='act2'?'<span class="ph">Act II</span>':S.phase==='act3'?'<span class="ph">Act III</span>':S.phase==='epilogue'?'<span class="ph">epilogue</span>':'';
 let stats='';if(isM()){stats+=`<span class="hx"><span class="money">${money(S.yen)}</span>${S.paid<2&&rentDue()?`<small style="opacity:.75" title="Rent ${money(S.rent)} due day ${rentDue()}">rent ${S.paid}/2 · d${rentDue()}</small>`:''}</span><span class="hx">${bar('energy',S.energy,'#5fd4c4')}${bar('heat',S.heat,'#d0283f')}${bar('edge',S.edge,'#8a5aaa')}</span>`}
 if(isV())stats+=`<span class="hx"><span class="money">$${S.funds}k</span></span><span class="hx">${bar('rep',S.rep,'#c9c39a','reputation')}${bar('conscience',S.heart,'#7fb0ff')}</span>`;
 if(S.dark&&S.comp!==undefined)stats+=`<span class="hx">${bar('steady',S.comp,'#f2a0b8','composure')}</span>`;if(isLone()&&S.hold!==undefined)stats+=`<span class="hx">${bar('holding on',S.hold,'#c9c39a')}</span>`;
 const bond=isLone()?'':`<span class="hx" title="trust ${S.trust} · tension ${S.tension} · server morale ${S.morale}">♥ ${bar(TIERS[tier()],S.aff,'#ff6b8a','bond')}</span>`;
 const inv=Object.values(S.inv||{}).reduce((a,b)=>a+Math.max(0,b),0);const newI=Object.keys(S.inv||{}).filter(k=>S.inv[k]>0&&!(S.f.bagSeen||{})[k]).length;
 hud.innerHTML=`<span class="hx btn menu" data-h="menu" title="Menu (Tab)">☰</span><span class="hx" title="${SLOTS[Math.min(S.slot,3)]}"><span class="day">DAY ${S.day}</span><span class="pips">${pips}</span>${ph}</span>${stats}${bond}<span class="grow"></span>
  <span class="hx btn" data-h="bag" title="Bag (I)">🎒<kbd>I</kbd>${newI?`<span class="badge2">${newI}</span>`:''}</span><span class="hx btn" data-h="snap" title="Photo (C)">📷</span><span class="hx btn" data-h="saves" title="Saves">💾</span><span class="hx btn" data-h="help" title="Controls (H)">?</span>`};
if(typeof document!=='undefined'&&hud.addEventListener)hud.addEventListener('click',e=>{const p=e.target.closest&&e.target.closest('[data-h]');if(p&&p.dataset.h==='bag'){if(BAG.el)bagClose();else bagOpen()}});
if(typeof document!=='undefined'){const h=document.querySelector('#wrap>.hint');if(h)h.innerHTML='Walk to things and press E (or tap them) · Tab menu · I bag · P or the phone in the corner · Esc back · hold Ctrl to skip read lines · H all controls'}
/* ---------- notifications feed ---------- */
toast=function(s){if(!ui)return;let f=ui.querySelector('.feed');if(!f){f=document.createElement('div');f.className='feed';ui.appendChild(f)}const t=document.createElement('div');s=String(s);
 const got=s.match(/^Got: (.*)$/);let ic='';if(got){const k=Object.keys(ITEMS).find(k=>ITEMS[k]===got[1]);if(k)ic=`<img alt="" src="${iicon(k)}">`;t.className='fi got'}else t.className='fi'+(/^(★|Achievement)/.test(s)?' ach':'');
 t.innerHTML=ic+'<span>'+esc2(s)+'</span>';f.appendChild(t);while(f.children.length>4)f.firstChild.remove();setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),320)},2700)};
const _goUI=go;go=function(s){const f=ui&&ui.querySelector('.feed');_goUI(s);if(f&&!ui.contains(f))ui.appendChild(f);if(BAG.el&&!ui.contains(BAG.el)){BAG.el=null;BAG.prev=null}};
/* ---------- dialogue: numbered choices, seen choices, skip ---------- */
META.seenL=META.seenL||{};META.seenO=META.seenO||{};let SKIP=false,CTRLH=false,seenDirty=0;
const uh=s=>{let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return(h>>>0).toString(36)};
function seenSave(){if(++seenDirty%12===0){const kL=Object.keys(META.seenL);if(kL.length>16000)kL.slice(0,4000).forEach(k=>delete META.seenL[k]);const kO=Object.keys(META.seenO);if(kO.length>6000)kO.slice(0,1500).forEach(k=>delete META.seenO[k]);saveMeta()}}
const _ocUI=optsCtrl;optsCtrl=function(box,opts,done){const C=_ocUI(box,opts,done);C.box=box;const inDlg=box&&box.closest&&box.closest('.dlg');
 [...box.children].forEach((el,i)=>{const o=opts[i];if(!o||o.h||o.dis||!inDlg)return;const h=uh((o.t||'')+(o.sub||''));if(META.seenO[h]&&!/never mind|not now|stay|back|leave/i.test(o.t||''))el.classList.add('seen');const oc=el.onclick;if(oc)el.onclick=ev=>{META.seenO[h]=1;seenSave();return oc(ev)}});
 SKIP=false;updSkipBtn();return C};
if(typeof window!=='undefined'){addEventListener('keydown',e=>{if(e.key==='Control')CTRLH=true});addEventListener('keyup',e=>{if(e.key==='Control')CTRLH=false});addEventListener('blur',()=>{CTRLH=false})}
const _showUI=showL;showL=function(){if(dlg&&dlg.lines&&dlg.lines[dlg.i]){const L=dlg.lines[dlg.i];const h=uh((L[0]||'')+'|'+L[1]);dlg.wasSeen=!!META.seenL[h];META.seenL[h]=1;seenSave()}const r=_showUI.apply(this,arguments);
 if(dlg&&dlg.el){const k=dlg.k;dlg.el.style.setProperty('--sp',k&&NCOL[k]?NCOL[k]:'#a99fb6');const d=dlg.el.querySelector('.dbtn');if(d&&!d.querySelector('[data-d=skip]')){const s=document.createElement('span');s.dataset.d='skip';s.textContent='SKIP';s.title='Skip lines you have already read (or hold Ctrl)';s.onclick=ev=>{ev.stopPropagation();SKIP=!SKIP;updSkipBtn()};d.appendChild(s)}updSkipBtn()}return r};
function updSkipBtn(){document.querySelectorAll('.dbtn [data-d=skip]').forEach(s=>s.classList.toggle('on',SKIP))}
const _tickUI=dlgTick;dlgTick=function(){_tickUI();if(!dlg){if(ctrl&&SKIP){SKIP=false;updSkipBtn()}return}if(!(SKIP||CTRLH))return;
 if(dlg.wasSeen){if((T&1)===0){if(dlg.n<dlg.full.length){dlg.n=dlg.full.length;if(dlg.tx)dlg.tx.textContent=dlg.full}adv()}}else if(SKIP){SKIP=false;updSkipBtn();toast('Skip stopped: a line you haven’t read')}};
/* ---------- pause menu: bag + key hints ---------- */
const _pmUI=pauseMenu;pauseMenu=function(){_pmUI();const box=document.querySelector('.pausebox .pbtns');if(!box||!S)return;const res=box.querySelector('[data-p=resume]');
 const b=document.createElement('button');b.dataset.u='bag';b.innerHTML='🎒 Bag <kbd>I</kbd>';b.onclick=e=>{e.stopPropagation();closePause();bagOpen()};if(res)res.after(b);else box.prepend(b);
 const kb={resume:'Tab',phone:'P',help:'H',fs:'F'};box.querySelectorAll('button[data-p]').forEach(x=>{const k=kb[x.dataset.p];if(k&&!x.querySelector('kbd'))x.insertAdjacentHTML('beforeend',`<kbd>${k}</kbd>`)});
 const all=[...box.children];const isSet=x=>!/^(resume|phone|saves|title|help)$/.test(x.dataset.p||'')&&!x.dataset.u&&x.tagName==='BUTTON';const quit=all.filter(x=>x.dataset.p==='title');const set=all.filter(isSet);const core=all.filter(x=>!isSet(x)&&x.dataset.p!=='title');
 const hdr=t=>{const d=document.createElement('div');d.className='ph2';d.textContent=t;return d};box.innerHTML='';box.append(hdr('Play'),...core,hdr('Settings'),...set,...(quit.length?[hdr('Leave'),...quit]:[]))};

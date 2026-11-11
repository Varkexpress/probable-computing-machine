/* ===================== MORNING EVENTS: a fairer picker =====================
   The pool grew past thirty, so one-a-morning picked at random meant whole scenes (the wrong hotel door, the wet roof,
   the 4am video) often never came up in a run. Now: every eligible event gains weight for each morning it is passed
   over, the original story vignettes count double, repeating ones (drift texts, the dog bowls) count for less, and a big
   pool sometimes gives a second scene the same morning. */
/* events that can only happen before the kidnapping have a short window, so they jump the queue */
const EV_LIMC={};const EV_LIM=e=>EV_LIMC[e.id]!==undefined?EV_LIMC[e.id]:(EV_LIMC[e.id]=/phase===.normal./.test(String(e.when)));
const EV_REPEAT=new Set(['drift_txt','v_bowls']);
function evPick(pool){S.evAge=S.evAge||{};for(const e of pool)S.evAge[e.id]=(S.evAge[e.id]||0)+1;
 const w=e=>(1+S.evAge[e.id]*1.5)*(EV_ORIG.has(e.id)?2:1)*(/^x_/.test(e.id)?2:1)*(EV_LIM(e)?2:1)*(EV_REPEAT.has(e.id)?.35:1);
 let tot=0;for(const e of pool)tot+=w(e);let r=Math.random()*tot;for(const e of pool){r-=w(e);if(r<=0)return e}return pool[pool.length-1]}
function evRun(pool,done){const e=evPick(pool);S.seen[e.id]=1;S.evAge[e.id]=0;save();
 e.run(()=>{if(!S||pool.length<12||S.evTwo===S.day||Math.random()<.5)return done();S.evTwo=S.day;
  const p2=EVENTS.filter(x=>{try{return x.id!==e.id&&!S.seen[x.id]&&!EV_REPEAT.has(x.id)&&x.when()}catch(err){return false}});if(!p2.length)return done();
  const e2=evPick(p2);S.seen[e2.id]=1;S.evAge[e2.id]=0;save();e2.run(done)})}

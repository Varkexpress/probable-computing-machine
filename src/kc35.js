/* ===================== THE SCHEDULER FOR THE AFTERMATH (kc35) =====================
   The scenes that follow the kidnapping (kdEv / kdEv2 in kc27–kc34) used to wait in the general morning pool, where
   one scene is drawn at random per morning. With dozens of them and a few days to show them in, most never appeared.
   Now, once she is out of the infirmary: the next due scene plays every morning before the ordinary morning scene,
   and again the first time the day planner opens in the afternoon, the evening and at night. Order is KD_ORDER; a
   scene still has to meet its own conditions (day count, earlier scenes, closeness). */
const KD_ORDER=['kd_discharge','kd_book','kd_count','kd_card','kd_ask','kd_math','kd_konbini','kd_window','kd_cup','kd_bodymap','kd_blank','kd_photos','kd_angelsees','kd_wrists','kd_clothes','kd_exam','kd_practice','kd_recount','kd_photodeny','kd_home','kd_results','kd_vtable','kd_vdoc','kd_last','kd_told_box','kd_kitgone','kd_pins','kd_wash','kd_smell','kd_notask','kd_vknows','kd_slip','kd_sleeptalk','kd_parcel','kd_roncrow','kd_vod','kd_bank','kd_jacket','kd_shop','kd_round','kd_knock1','kd_knock2','kd_knock3','kd_ronradio','kd_ronmad','kd_cast','kd_bookout','kd_van','kd_hara','kd_dentist','kd_told_dentist','kd_told_sleep','kd_later','kd_crash','kd_crash2','kd_march','kd_checkup','kd_epi'];
function kdNext(){if(!S||!kdPost())return null;const rank=e=>{const i=KD_ORDER.indexOf(e.id);return i<0?999:i};const L=EVENTS.filter(e=>e.kd&&!S.seen[e.id]).sort((a,b)=>rank(a)-rank(b));
 KD_RUN=1;try{for(const e of L){let w=false;try{w=e.when()}catch(x){}if(w)return e}}finally{KD_RUN=0}return null}
function kdDue(){return kdNext()}
const _meKD9=morningEvent;morningEvent=function(done){let e=null;try{e=kdNext()}catch(x){}if(!e)return _meKD9(done);S.seen[e.id]=1;S.kd.sk=S.day+'/0';save();e.run(()=>_meKD9(done))};
const _hubKD9=hub;hub=function(){const a=arguments,self=this;try{if(S&&S.kd&&kdPost()&&!dlg&&S.slot>=1&&S.kd.sk!==S.day+'/'+S.slot){S.kd.sk=S.day+'/'+S.slot;const e=kdNext();if(e){S.seen[e.id]=1;save();go(cutBg('#05040a'));return e.run(()=>_hubKD9.apply(self,a))}save()}}catch(x){}return _hubKD9.apply(self,a)};

/* ===================== SMALL REFINEMENTS ===================== */
/* help covers what was added since it was written */
const _helpR=helpPanel;helpPanel=function(){_helpR();const lb=document.querySelector('.logbox');if(!lb)return;[
 'Phone → Messages: texts arrive a little later, some wait for a reply, and waiting too long is an answer too. Calls can be declined. Each choice is remembered.',
 'Late night: people are asleep where they sleep. You can let them be, or not.',
 'G — enhanced / classic graphics · Shift — sprint (forest chase).'].forEach(t=>{const p=document.createElement('p');p.textContent=t;lb.appendChild(p)})};
/* a nudge before a message goes unanswered, and a one-time pointer to where replies live */
const _txTickR=txTick;txTick=function(){_txTickR();if(!S||!S.tx)return;const P=S.tx,n=phNow();for(const id in P.run){const r=P.run[id];if(r.await&&r.exp&&r.exp-n<=1&&!r.warned){r.warned=1;toast('⏳ '+PNM[TXS[id].with]+' is still waiting on a reply');save();break}}};
const _phDelR=phDeliver;phDeliver=function(){const before=S&&S.tx?Object.values(S.tx.un).reduce((a,b)=>a+(b||0),0):0;_phDelR();if(!S||!S.tx)return;const after=Object.values(S.tx.un).reduce((a,b)=>a+(b||0),0);if(after>before&&!META.txHint){META.txHint=1;saveMeta();setTimeout(()=>toast('Phone → Messages to read and reply'),1400)}};

import {dist,clamp} from './math.js';import {at,blocked,snapWalkable} from './world.js';
export const STORY=[
 {name:'01 · Velkommen til Viborg',goal:'Tal med arkivaren ved Gammeltorv.',type:'talk',target:'archivist'},
 {name:'02 · Tre glemte tegn',goal:'Find de tre lysende runefragmenter.',type:'collect',target:'shard'},
 {name:'03 · Haven ved volden',goal:'Find parkvogteren ved Borgvold.',type:'talk',target:'gardener'},
 {name:'04 · De tre segl',goal:'Slå de tre mystiske segl i stykker med F.',type:'break',target:'seal'},
 {name:'05 · Den sidste lås',goal:'Vend tilbage og undersøg skattekisten.',type:'open',target:'chest'},
 {name:'EPILOG',goal:'Byens hemmelighed er blevet afsløret. Udforsk videre.',type:'done'}
];
const rawEntities=[
 {id:'archivist',name:'Arkivaren',kind:'npc',place:'gammeltorv',dx:0,dz:2,color:[.25,.49,.66],text:['Du er ikke herfra, vel? Det kan jeg se på, at du kigger op.','Der er tre tegn spredt gennem byens ældste gader. Find dem, før nogen andre gør.']},
 {id:'merchant',name:'Den omrejsende',kind:'npc',place:'gammeltorv',dx:-19,dz:10,color:[.71,.4,.29],text:['Ingen vil købe mit kompas. Det peger kun mod ting, der er forsvundet.','Det er ærligt talt dårligt for forretningen.']},
 {id:'gardener',name:'Parkvogteren',kind:'npc',place:'borgvold',dx:-17,dz:16,color:[.36,.64,.44],text:['Du har fundet tegnene. Så ved du nok allerede, at de ikke bare er sten.','Tre segl holder den gamle kiste lukket. Du må selv finde ud af, hvordan de går i stykker.']},
 {id:'shard1',name:'Runefragment I',kind:'shard',place:'gammeltorv',dx:18,dz:20,color:[.9,.78,.32],y:1.4},
 {id:'shard2',name:'Runefragment II',kind:'shard',place:'sctmogens',dx:-17,dz:-12,color:[.9,.78,.32],y:1.4},
 {id:'shard3',name:'Runefragment III',kind:'shard',place:'domkirke',dx:44,dz:-25,color:[.9,.78,.32],y:1.4},
 {id:'seal1',name:'Første segl',kind:'seal',place:'borgvold',dx:15,dz:0,color:[.91,.39,.36],y:1.6},
 {id:'seal2',name:'Andet segl',kind:'seal',place:'borgvold',dx:40,dz:35,color:[.91,.39,.36],y:1.6},
 {id:'seal3',name:'Tredje segl',kind:'seal',place:'borgvold',dx:0,dz:53,color:[.91,.39,.36],y:1.6},
 {id:'chest',name:'Den gamle kiste',kind:'chest',place:'gammeltorv',dx:18,dz:-15,color:[.71,.52,.25]}
];
export class Game{
 constructor(world,save={}){this.world=world;this.quests=STORY;this.quest=clamp(Number(save.quest)||0,0,5);this.collected=new Set(save.collected||[]);this.broken=new Set(save.broken||[]);this.ended=!!save.ended;this.camera={yaw:0,top:false};this.player={...snapWalkable(save.player||at('gammeltorv',-15,15),world),y:0,vy:0,heading:0};this.entities=rawEntities.map(e=>{let pt=snapWalkable(at(e.place,e.dx,e.dz),world);return {...e,...pt}});this.dialogue=null;this.onChange=()=>{};this.onWin=()=>{};this.notice='';this.noticeEnd=0;this.time=0;}
 get goal(){return STORY[this.quest]}
 persist(){try{localStorage.setItem('viborg96-save',JSON.stringify({quest:this.quest,collected:[...this.collected],broken:[...this.broken],ended:this.ended,player:{x:this.player.x,z:this.player.z}}))}catch(e){console.warn('Save unavailable',e)}}
 near(radius=8){let shown=this.entities.filter(e=>!(e.kind==='shard'&&this.collected.has(e.id))&&!(e.kind==='seal'&&this.broken.has(e.id))&&dist(e,this.player)<radius);shown.sort((a,b)=>dist(a,this.player)-dist(b,this.player));return shown[0]}
 objective(){let remaining=this.entities.filter(e=>{if(this.quest===0)return e.id==='archivist';if(this.quest===1)return e.kind==='shard'&&!this.collected.has(e.id);if(this.quest===2)return e.id==='gardener';if(this.quest===3)return e.kind==='seal'&&!this.broken.has(e.id);if(this.quest===4)return e.id==='chest';return e.kind==='npc'});return remaining.reduce((best,e)=>!best||dist(e,this.player)<dist(best,this.player)?e:best,null)}
 step(dt,keys){this.time+=dt;const p=this.player;let fx=-Math.sin(this.camera.yaw),fz=-Math.cos(this.camera.yaw),sx=Math.cos(this.camera.yaw),sz=-Math.sin(this.camera.yaw),forward=(keys.w||keys.ArrowUp?1:0)-(keys.s||keys.ArrowDown?1:0),strafe=(keys.d||keys.ArrowRight?1:0)-(keys.a||keys.ArrowLeft?1:0);if(this.camera.top){fx=0;fz=-1;sx=1;sz=0}let mx=fx*forward+sx*strafe,mz=fz*forward+sz*strafe,l=Math.hypot(mx,mz);if(l>0){mx/=l;mz/=l;p.heading=Math.atan2(mx,mz);let speed=keys.Shift?14.8:8.9;let next={x:p.x+mx*speed*dt,z:p.z+mz*speed*dt};if(!blocked(next,this.world)){p.x=next.x;p.z=next.z}else{if(!blocked({x:next.x,z:p.z},this.world))p.x=next.x;if(!blocked({x:p.x,z:next.z},this.world))p.z=next.z}}if((keys[' ']||keys.space)&&p.y<=.01){p.vy=11.8;}p.vy-=26*dt;p.y=Math.max(0,p.y+p.vy*dt);if(!p.y)p.vy=0;}
 advance(n){this.quest=Math.max(this.quest,n);this.persist();this.onChange();}
 interact(){let e=this.near();if(!e){this.say('Der er ingen at tale med eller samle op her.');return}
 if(e.kind==='npc'){let extra;if(e.id==='archivist'&&this.quest===0){this.advance(1);extra='[QUEST FULDFØRT] Find de tre runefragmenter.'}else if(e.id==='gardener'&&this.quest===2){this.advance(3);extra='[QUEST FULDFØRT] Knus de tre segl.'}this.dialogue={name:e.name,text:e.text.join(' ')+(extra?'\n\n'+extra:'')};this.onChange();return}
 if(e.kind==='shard'){if(this.quest<1){this.say('Det lysende tegn reagerer ikke endnu.');return}this.collected.add(e.id);this.say('RUNESTYKKE FUNDET · '+this.collected.size+'/3');if(this.collected.size===3)this.advance(2);this.persist();this.onChange();return}
 if(e.kind==='chest'){if(this.quest!==4){this.say('Kisten er forseglet med tre låse.');return}this.advance(5);this.ended=true;this.persist();this.onWin();return}
 if(e.kind==='seal')this.say('Seglet skal knuses. Tryk F.')}
 attack(){let e=this.near(10);if(e?.kind==='seal'&&!this.broken.has(e.id)){if(this.quest!==3){this.say('Seglet gløder, men du ved ikke hvorfor endnu.');return}this.broken.add(e.id);this.say('SEGL KNUST · '+this.broken.size+'/3');if(this.broken.size===3)this.advance(4);this.persist();this.onChange();return}this.say('Du svinger mod luften. Den tager det pænt.')}
 say(s){this.notice=s;this.noticeEnd=this.time+3;this.onChange()}
 getCounts(){return {shards:this.collected.size,seals:this.broken.size}}
}
export function getSave(){try{return JSON.parse(localStorage.getItem('viborg96-save')||'{}')}catch{return {}}}
export function clearSave(){try{localStorage.removeItem('viborg96-save')}catch{}}
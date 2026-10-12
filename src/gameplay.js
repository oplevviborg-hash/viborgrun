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
 {id:'lamplighter',name:'Lygtemageren',kind:'npc',place:'sctmogens',dx:-21,dz:61,color:[.67,.53,.26],text:['Jeg har tabt min messinglygte ved Gammeltorv.']},
 {id:'lostlantern',name:'Den bortkomne messinglygte',kind:'questitem',place:'gammeltorv',dx:-35,dz:-21,color:[.97,.78,.38]},
 {id:'keeper',name:'Kirkens kortlæser',kind:'npc',place:'domkirke',dx:-52,dz:-16,color:[.45,.43,.68],text:['Jeg har et kortkompas. Men du får det ikke uden at vise, at du kender byen.']},
 {id:'bookbinder',name:'Bogbinderen',kind:'npc',place:'sctmogens',dx:12,dz:55,color:[.63,.38,.3],text:['Der er gamle historier gemt i gadens facader.','Se efter lyset i vinduerne, når du går forbi.']},
 {id:'walker',name:'Byvandreren',kind:'npc',place:'borgvold',dx:-52,dz:-34,color:[.36,.57,.64],text:['Borgvold og søen har altid været mine yndlingssteder.','Hold øje med stierne: De fører dig rundt om bebyggelsen.']},
 {id:'gardener',name:'Parkvogteren',kind:'npc',place:'borgvold',dx:-17,dz:16,color:[.36,.64,.44],text:['Du har fundet tegnene. Så ved du nok allerede, at de ikke bare er sten.','Tre segl holder den gamle kiste lukket. Du må selv finde ud af, hvordan de går i stykker.']},
 {id:'routemaster',name:'Gadehistorikeren',kind:'npc',place:'gammeltorv',dx:-12,dz:32,color:[.58,.43,.31],text:['Tre steder har hver sit ord. De danner en sætning, hvis du besøger dem i den rigtige rækkefølge.']},
 {id:'clue-dom',name:'Spor ved Domkirken',kind:'clue',place:'domkirke',dx:55,dz:31,word:'TID',color:[.87,.76,.4]},
 {id:'clue-mogens',name:'Spor ved Sct. Mogens Gade',kind:'clue',place:'sctmogens',dx:23,dz:-34,word:'ÅBNER',color:[.87,.76,.4]},
 {id:'clue-borg',name:'Spor ved Borgvold',kind:'clue',place:'borgvold',dx:-44,dz:24,word:'VEJEN',color:[.87,.76,.4]},
 {id:'mason',name:'Stenmesterens lærling',kind:'npc',place:'sctmogens',dx:24,dz:72,color:[.56,.48,.39],text:['De gamle stenmure holder på mere end jord.']},
 {id:'chronicle',name:'Kronikøren',kind:'npc',place:'domkirke',dx:62,dz:-24,color:[.39,.48,.66],text:['I arkivet står både datoer og mysterier.']},
 {id:'shard1',name:'Runefragment I',kind:'shard',place:'gammeltorv',dx:18,dz:20,color:[.9,.78,.32],y:1.4},
 {id:'shard2',name:'Runefragment II',kind:'shard',place:'sctmogens',dx:-17,dz:-12,color:[.9,.78,.32],y:1.4},
 {id:'shard3',name:'Runefragment III',kind:'shard',place:'domkirke',dx:44,dz:-25,color:[.9,.78,.32],y:1.4},
 {id:'seal1',name:'Første segl',kind:'seal',place:'borgvold',dx:15,dz:0,color:[.91,.39,.36],y:1.6},
 {id:'seal2',name:'Andet segl',kind:'seal',place:'borgvold',dx:40,dz:35,color:[.91,.39,.36],y:1.6},
 {id:'seal3',name:'Tredje segl',kind:'seal',place:'borgvold',dx:0,dz:53,color:[.91,.39,.36],y:1.6},
 {id:'chest',name:'Den gamle kiste',kind:'chest',place:'gammeltorv',dx:18,dz:-15,color:[.71,.52,.25]}
];
export class Game{
 constructor(world,save={}){this.world=world;this.quests=STORY;this.quest=clamp(Number(save.quest)||0,0,5);this.collected=new Set(save.collected||[]);this.broken=new Set(save.broken||[]);this.ended=!!save.ended;this.puzzleSolved=!!save.puzzleSolved;this.items=new Set(save.items||[]);this.trailStarted=!!save.trailStarted;this.trailFound=new Set((save.trailFound||[]).filter(id=>['clue-dom','clue-mogens','clue-borg'].includes(id)));this.trailSolved=!!save.trailSolved;this.lanternQuest=!!save.lanternQuest;this.lanternFound=!!save.lanternFound;this.lanternSolved=!!save.lanternSolved;this.lanternUntil=0;this.masonSolved=!!save.masonSolved;this.chronicleSolved=!!save.chronicleSolved;this.jumpHeld=false;this.camera={yaw:0,top:false,binoculars:false};this.player={...snapWalkable(save.player||at('gammeltorv',-15,15),world),y:0,vy:0,vx:0,vz:0,heading:0};this.entities=rawEntities.map(e=>{let pt=snapWalkable(at(e.place,e.dx,e.dz),world);return {...e,...pt}});this.dialogue=null;this.onChange=()=>{};this.onWin=()=>{};this.notice='';this.noticeEnd=0;this.time=0;}
 get goal(){return STORY[this.quest]}
 persist(){try{localStorage.setItem('viborg96-save',JSON.stringify({quest:this.quest,collected:[...this.collected],broken:[...this.broken],ended:this.ended,puzzleSolved:this.puzzleSolved,items:[...this.items],trailStarted:this.trailStarted,trailFound:[...this.trailFound],trailSolved:this.trailSolved,lanternQuest:this.lanternQuest,lanternFound:this.lanternFound,lanternSolved:this.lanternSolved,masonSolved:this.masonSolved,chronicleSolved:this.chronicleSolved,player:{x:this.player.x,z:this.player.z}}))}catch(e){console.warn('Save unavailable',e)}}
 hidden(e){return e.kind==='shard'&&this.collected.has(e.id)||e.kind==='seal'&&this.broken.has(e.id)||e.kind==='clue'&&this.trailFound.has(e.id)||e.id==='lostlantern'&&this.lanternFound}
 near(radius=8){let shown=this.entities.filter(e=>!this.hidden(e)&&dist(e,this.player)<radius);shown.sort((a,b)=>dist(a,this.player)-dist(b,this.player));return shown[0]}
 objective(){let remaining=this.entities.filter(e=>{if(this.quest===0)return e.id==='archivist';if(this.quest===1)return e.kind==='shard'&&!this.collected.has(e.id);if(this.quest===2)return e.id==='gardener';if(this.quest===3)return e.kind==='seal'&&!this.broken.has(e.id);if(this.quest===4)return e.id==='chest';return e.kind==='npc'});return remaining.reduce((best,e)=>!best||dist(e,this.player)<dist(best,this.player)?e:best,null)}
 step(dt,keys){
  dt=clamp(dt,0,.05);this.time+=dt;const p=this.player;
  const desired=this.camera.targetYaw??this.camera.yaw;
  const error=Math.atan2(Math.sin(desired-this.camera.yaw),Math.cos(desired-this.camera.yaw));
  this.camera.yaw+=error*(1-Math.exp(-Math.max(0,dt)*13));
  let fx=-Math.sin(this.camera.yaw),fz=-Math.cos(this.camera.yaw),sx=Math.cos(this.camera.yaw),sz=-Math.sin(this.camera.yaw);
  let forward=Number(!!(keys.w||keys.ArrowUp))-Number(!!(keys.s||keys.ArrowDown));
  let strafe=Number(!!(keys.d||keys.ArrowRight))-Number(!!(keys.a||keys.ArrowLeft));
  if(this.camera.top){fx=0;fz=-1;sx=1;sz=0}
  let mx=fx*forward+sx*strafe,mz=fz*forward+sz*strafe,L=Math.hypot(mx,mz);
  if(L>0){mx/=L;mz/=L;p.heading=Math.atan2(mx,mz)}
  // Acceleration and friction are frame-rate independent.
  const speed=(keys.Shift?14.8:8.9)*(this.items.has('vandrestoevler')?1.16:1),blend=1-Math.exp(-(L?13:18)*dt);
  p.vx=(p.vx||0)+(mx*speed-(p.vx||0))*blend;
  p.vz=(p.vz||0)+(mz*speed-(p.vz||0))*blend;
  if(Math.hypot(p.vx,p.vz)<.015){p.vx=0;p.vz=0}
  // Swept movement avoids clipping through walls at low FPS.
  const steps=Math.max(1,Math.ceil(Math.hypot(p.vx,p.vz)*dt/.35));
  for(let i=0;i<steps;i++){
   const dx=p.vx*dt/steps,dz=p.vz*dt/steps;
   if(!blocked({x:p.x+dx,z:p.z+dz},this.world)){p.x+=dx;p.z+=dz}
   else{if(!blocked({x:p.x+dx,z:p.z},this.world))p.x+=dx;else p.vx=0;
        if(!blocked({x:p.x,z:p.z+dz},this.world))p.z+=dz;else p.vz=0}
  }
  const jump=!!(keys[' ']||keys.space);if(jump&&!this.jumpHeld&&p.y<=.01)p.vy=this.items.has('fjederstoevler')?13.6:11.8;this.jumpHeld=jump;
  p.vy-=26*dt;p.y=Math.max(0,p.y+p.vy*dt);if(!p.y)p.vy=0;
 }
 answerTrail(answer){
  if(!this.trailStarted||this.trailFound.size!==3||this.trailSolved)return false;
  if(answer==='tid-aabner-vejen'){
   this.trailSolved=true;this.items.add('vandrestoevler');this.persist();
   this.dialogue={name:'Gadehistorikeren',text:'TID ÅBNER VEJEN. Du har fundet den rigtige rækkefølge! Du får et par vandrestøvler. De øger din fart med 16 %, også når du sprinter.'};
  }else this.dialogue={name:'Gadehistorikeren',text:'Ordene er rigtige, men rækkefølgen er forkert. Tænk på ruten: Domkirken, Sct. Mogens Gade, Borgvold.'};
  this.onChange();return this.trailSolved;
 }
 answerMason(answer){
  if(this.masonSolved)return false;
  if(answer==='stoettemur'){
   this.masonSolved=true;this.items.add('fjederstoevler');this.persist();
   this.dialogue={name:'Stenmesterens lærling',text:'Korrekt! En støttemur holder jord tilbage ved terrænspring. Du får fjederstøvler, som giver højere hop.'};
  }else this.dialogue={name:'Stenmesterens lærling',text:'Prøv igen. Hvad holder den højere jord på plads langs vejen?'};
  this.onChange();return this.masonSolved;
 }
 answerChronicle(answer){
  if(this.chronicleSolved)return false;
  if(answer==='120'){
   this.chronicleSolved=true;this.items.add('kikkert');this.persist();
   this.dialogue={name:'Kronikøren',text:'1876 til 1996 er 120 år. Du får en kikkert! Tryk B for at zoome tæt på og B igen for at vende tilbage.'};
  }else this.dialogue={name:'Kronikøren',text:'Regn efter: 1996 minus 1876. Du kan prøve igen.'};
  this.onChange();return this.chronicleSolved;
 }
 answerPuzzle(answer){
  if(this.dialogue?.puzzle==='mason')return this.answerMason(answer);
  if(this.dialogue?.puzzle==='chronicle')return this.answerChronicle(answer);
  if(this.puzzleSolved)return false;
  if(answer==='borgvold'){
   this.puzzleSolved=true;this.items.add('kompas');this.persist();
   this.dialogue={name:'Kirkens kortlæser',text:'Korrekt. Borgvold ligger mod øst. Du har fået et kortkompas! Tryk C, når du vil vide retning og afstand til dit næste mål.'};
  }else this.dialogue={name:'Kirkens kortlæser',text:'Ikke helt. Se på bykortet med M, og kom tilbage med et nyt svar.'};
  this.onChange();return this.puzzleSolved;
 }
 useLantern(){if(!this.items.has('lanterne')){this.say('Spørg lygtemageren på Sct. Mogens Gade.');return false}this.lanternUntil=this.time+16;this.say('LYGTE TÆNDT · Missionsspor lyser i 16 sekunder.');return true}
 useBinoculars(){
  if(!this.items.has('kikkert')){this.say('Kronikøren ved Domkirken har en gåde og en kikkert.');return false}
  if(this.camera.top)this.camera.top=false;
  this.camera.binoculars=!this.camera.binoculars;
  this.say(this.camera.binoculars?'KIKKERT AKTIV · B: normal visning':'KIKKERT LUKKET');
  return this.camera.binoculars;
 }
 useCompass(){
  if(!this.items.has('kompas')){this.say('Find kortlæseren ved Domkirken for at låse kortkompasset op.');return}
  const e=this.objective();if(!e){this.say('Alle hovedmissioner er løst. Brug kortet til at udforske frit.');return}
  const dx=e.x-this.player.x,dz=e.z-this.player.z;
  const angle=Math.atan2(dx,-dz),oct=['nord','nordøst','øst','sydøst','syd','sydvest','vest','nordvest'];
  const direction=oct[(Math.round((angle+Math.PI*2)/(Math.PI/4)))%8];
  this.say('KOMPAS: '+e.name+' · '+Math.round(Math.hypot(dx,dz))+' m mod '+direction);
 }
 advance(n){this.quest=Math.max(this.quest,n);this.persist();this.onChange();}
 interact(){let e=this.near();if(!e){this.say('Der er ingen at tale med eller samle op her.');return}
 if(e.kind==='npc'){
  if(e.id==='chronicle'){
   this.dialogue=this.chronicleSolved?{name:e.name,text:'Kikkerten er din. Tryk B for at undersøge byen tættere på.'}:{name:e.name,text:'Viborg Domkirke blev genindviet i 1876. I vores eventyr er året 1996. Hvor mange år er der gået? (Historisk årstal: Viborg Museum.)',choices:[
    {label:'100 år',value:'100'},{label:'120 år',value:'120'},{label:'140 år',value:'140'}],puzzle:'chronicle'};
   this.onChange();return;
  }
  if(e.id==='mason'){
   this.dialogue=this.masonSolved?{name:e.name,text:'Støttemuren holder jorden på plads. Dine fjederstøvler giver højere hop.'}:{name:e.name,text:'Langs Sct. Mogens Gade er der gamle stenmure ved terrænspring. Hvad er en støttemurs vigtigste opgave?',choices:[
    {label:'At holde jord tilbage',value:'stoettemur'},{label:'At lede regn fra taget',value:'tagrende'},{label:'At lave en fontæne',value:'fontaene'}],puzzle:'mason'};
   this.onChange();return;
  }
  if(e.id==='lamplighter'){
   if(this.lanternSolved)this.dialogue={name:e.name,text:'Lygten er din. Tryk L for at fremhæve missionernes spor.'};
   else if(this.lanternFound){this.lanternSolved=true;this.items.add('lanterne');this.persist();this.dialogue={name:e.name,text:'Du fandt den! Nu er lygten tændt. Tryk L for at vise missionernes spor i 16 sekunder.'};}
   else if(this.lanternQuest)this.dialogue={name:e.name,text:'Jeg tabte den på vestsiden af Gammeltorv. Kom tilbage med den.'};
   else{this.lanternQuest=true;this.persist();this.dialogue={name:e.name,text:'Vil du finde min messinglygte ved Gammeltorv? Jeg belønner dig med en lygte, der kan vise spor.'};}
   this.onChange();return;
  }
  if(e.id==='routemaster'){
   if(!this.trailStarted){this.trailStarted=true;this.persist();this.dialogue={name:e.name,text:'En ny byrute! Find tre skilte i rækkefølgen Domkirken → Sct. Mogens Gade → Borgvold. Hvert skilt har et ord. Vend tilbage og saml ordene til én sætning.'};}
   else if(this.trailSolved)this.dialogue={name:e.name,text:'Du løste byruten. Dine vandrestøvler hjælper dig rundt i byen.'};
   else if(this.trailFound.size<3)this.dialogue={name:e.name,text:'Du har fundet '+this.trailFound.size+' af 3 skilte. Kig efter små blå-gule skilte ved Domkirken, Sct. Mogens Gade og Borgvold.'};
   else this.dialogue={name:e.name,text:'Saml de tre ord i rækkefølgen Domkirken → Sct. Mogens Gade → Borgvold. Hvilken sætning får du?',choices:[
    {label:'TID ÅBNER VEJEN',value:'tid-aabner-vejen'},{label:'VEJEN ÅBNER TID',value:'vejen-aabner-tid'},{label:'ÅBNER TID VEJEN',value:'aabner-tid-vejen'}],puzzle:'trail'};
   this.onChange();return;
  }
  if(e.id==='keeper'&&!this.puzzleSolved){
   this.dialogue={name:e.name,text:'Kortlæserens gåde: Hvilket af disse steder ligger øst for Viborg Domkirke? Vælg det rigtige sted, så får du et kompas, der kan hjælpe dig med missionerne.',choices:[
    {label:'Borgvold',value:'borgvold'},{label:'Gammeltorv',value:'gammeltorv'},{label:'Sct. Mogens Gade',value:'sctmogens'}]};
   this.onChange();return;
  }
  let extra;if(e.id==='archivist'&&this.quest===0){this.advance(1);extra='[QUEST FULDFØRT] Find de tre runefragmenter.'}else if(e.id==='gardener'&&this.quest===2){this.advance(3);extra='[QUEST FULDFØRT] Knus de tre segl.'}this.dialogue={name:e.name,text:e.text.join(' ')+(extra?'\n\n'+extra:'')};this.onChange();return}
 if(e.kind==='questitem'){
  if(!this.lanternQuest){this.say('En gammel messinglygte. Hvem ejer den?');return}
  this.lanternFound=true;this.items.add('mistet-lygte');this.persist();
  this.dialogue={name:e.name,text:'Du fandt lygten. Returnér den til lygtemageren på Sct. Mogens Gade.'};this.onChange();return;
 }
 if(e.kind==='clue'){
  if(!this.trailStarted){this.say('Et skilt med en mærkelig rune. Spørg gadehistorikeren på Gammeltorv.');return}
  if(this.trailFound.has(e.id))return;
  this.trailFound.add(e.id);this.persist();
  this.dialogue={name:e.name,text:'Du finder ordet: '+e.word+'. ('+this.trailFound.size+'/3 spor).'+(this.trailFound.size===3?' Alle spor fundet! Vend tilbage til gadehistorikeren.':'')};
  this.onChange();return;
 }
 if(e.kind==='shard'){if(this.quest<1){this.say('Det lysende tegn reagerer ikke endnu.');return}this.collected.add(e.id);this.say('RUNESTYKKE FUNDET · '+this.collected.size+'/3');if(this.collected.size===3)this.advance(2);this.persist();this.onChange();return}
 if(e.kind==='chest'){if(this.quest!==4){this.say('Kisten er forseglet med tre låse.');return}this.advance(5);this.ended=true;this.persist();this.onWin();return}
 if(e.kind==='seal')this.say('Seglet skal knuses. Tryk F.')}
 attack(){let e=this.near(10);if(e?.kind==='seal'&&!this.broken.has(e.id)){if(this.quest!==3){this.say('Seglet gløder, men du ved ikke hvorfor endnu.');return}this.broken.add(e.id);this.say('SEGL KNUST · '+this.broken.size+'/3');if(this.broken.size===3)this.advance(4);this.persist();this.onChange();return}this.say('Du svinger mod luften. Den tager det pænt.')}
 say(s){this.notice=s;this.noticeEnd=this.time+3;this.onChange()}
 getCounts(){return {shards:this.collected.size,seals:this.broken.size}}
}
export function getSave(){try{return JSON.parse(localStorage.getItem('viborg96-save')||'{}')}catch{return {}}}
export function clearSave(){try{localStorage.removeItem('viborg96-save')}catch{}}
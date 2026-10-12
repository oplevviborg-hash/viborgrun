import {Renderer,Mesh,makeCityMesh} from './renderer.js';
import {Game,getSave,clearSave,STORY} from './gameplay.js';
import {loadWorld,at,PLACES,blocked,nearestNamedRoad} from './world.js';
import {dist,clamp,pointInPoly,hash} from './math.js';
const $=id=>document.getElementById(id);const ui={overlay:$('overlay'),panel:$('panel'),quest:$('quest'),hint:$('hint'),status:$('status'),source:$('mapSource'),coins:$('coins'),minimap:$('minimap')};
const canvas=$('game');const keys={};let game=null,renderer=null,screen='intro',mapData=null,last=0,frame=0,streetLabel='';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function modal(html,name){screen=name;ui.panel.innerHTML=html;ui.overlay.classList.add('show');document.exitPointerLock?.();document.querySelectorAll('[data-hold]').forEach(b=>b.blur());for(const k of Object.keys(keys))keys[k]=false;}
function close(){screen='play';ui.overlay.classList.remove('show');game.dialogue=null;}
function intro(){modal(`<div class="eyebrow">EN NY HISTORIE I EN GAMMEL BY · 2016 EDITION</div><h1>VIBORG 96</h1><h2>BYENS HEMMELIGHED</h2><p>En by, du kender. En historie, du ikke kender. Udforsk Viborg i tredimensionel retrostil, tal med borgerne, find tre runefragmenter, løs kortlæserens gåde, smadr tre segl og åbn den låste kiste.</p><p>Gå rundt med <strong>WASD</strong>, drej kamera med musen, hop med <strong>mellemrum</strong>, undersøg med <strong>E</strong>, slå med <strong>F</strong> og skift til fugleperspektiv med <strong>V</strong>.</p><div class="buttons"><button data-action="start">▶ START EVENTYR</button><button class="secondary" data-action="help">? OM SPILLET</button></div><p class="mini">Ingen konto, ingen installation. Fremskridt gemmes lokalt i din browser. Kortkilden fremgår nederst på skærmen.</p>`, 'intro')}
function pause(){modal(`<div class="eyebrow">SPILLET ER SAT PÅ PAUSE</div><h2>PAUSE</h2><p>${esc(game.goal.name)} · ${esc(game.goal.goal)}</p><div class="buttons"><button data-action="resume">▶ FORTSÆT</button><button class="secondary" data-action="inventory">◈ TASKE</button><button class="secondary" data-action="map">▧ VERDENSKORT</button><button class="secondary" data-action="help">? HJÆLP</button><button class="secondary" data-action="reset">NYT SPIL</button></div>`, 'pause')}
function inventory(){let c=game.getCounts();const compass=game.items.has('kompas');modal(`<div class="eyebrow">DINE FUNDE</div><h2>TASKEN</h2><div class="slot"><span>◆ Lysende runefragmenter</span><b>${c.shards} / 3</b></div><div class="slot"><span>◈ Brudte segl</span><b>${c.seals} / 3</b></div><div class="slot"><span>◆ Historiske spor</span><b>${game.quest} / 5</b></div><div class="slot"><span>⌖ Kortkompas</span><b>${compass?'FUNDET · C':'LÅST'}</b></div><div class="slot"><span>▣ Gadehistorikerens spor</span><b>${game.trailFound.size}/3</b></div><div class="slot"><span>◈ Vandrestøvler (+16 % fart)</span><b>${game.items.has('vandrestoevler')?'FUNDET':'LÅST'}</b></div>${compass?'<p>Tryk C i spillet for at finde retningen til nærmeste missionsmål.</p>':'<p>Kirkens kortlæser har en gåde til dig ved Domkirken.</p>'}<p>Gadehistorikeren ved Gammeltorv giver dig en ekstra byrute med tre ord. Løs den for at få hurtigere støvler.</p><p>Du samler ting op ved at gå tæt på dem og trykke E. Større fund og nye opgaver gemmes automatisk.</p><div class="buttons"><button data-action="resume">◀ TILBAGE</button></div>`,'inventory')}
function help(){modal(`<div class="eyebrow">SPILMANUAL / 2016</div><h2>SÅDAN SPILLER DU</h2><p><b>W A S D</b> eller piletaster: løb · <b>SHIFT</b>: sprint · <b>MUSEHJUL</b>: zoom · <b>MELLEMRUM</b>: hop · <b>E</b>: tal / undersøg / saml · <b>F</b>: slå på segl · <b>V</b>: skift mellem tredje person og fugleperspektiv · <b>I</b>: taske · <b>C</b>: brug kortkompas (efter gåden) · <b>M</b>: stort kort · <b>ESC</b>: pause. På mobil findes skærmknapper, også LØB og KOMPAS.</p><p>Kortet bruger OpenStreetMap, når et opdateret kort er blevet genereret via projektets GitHub-workflow. Det medfølgende demokort er <b>ikke</b> en opmålt gengivelse af byens vejnet eller bygninger. OSM er desuden ikke i sig selv en fuldstændigt verificeret 3D-model.</p><p>Markører og quests er fiktive, og virkelige steder bruges som ramme. Ingen historiske påstande ligger gemt i gåderne.</p><div class="buttons"><button data-action="resume">◀ TILBAGE TIL SPILLET</button></div>`,'help')}
function dialogue(){const d=game.dialogue;if(!d)return;
 const choices=d.choices?.map(c=>`<button class="secondary" data-answer="${esc(c.value)}">${esc(c.label)}</button>`).join('')||'';
 modal(`<div class="eyebrow">SAMTALE</div><h2>${esc(d.name)}</h2><p style="white-space:pre-line">${esc(d.text)}</p><div class="buttons">${choices}<button data-action="resume">${d.choices?'FORLAD SAMTALE':'FORTSÆT ▶'}</button></div>`,'dialogue')}
function win(){modal(`<div class="eyebrow">EPILOG · HISTORIEN ER FULDFØRT</div><h1>VIBORG 96</h1><h2>BYENS HEMMELIGHED</h2><p>Kisten åbner sig. Indeni ligger ikke guld, men en blank side med ét ord: <strong>FORTSÆTTES.</strong></p><p>Du har gennemført prototypens fem kapitler. Du kan fortsat gå rundt i byen, udforske gaderne og tale med dens indbyggere.</p><div class="buttons"><button data-action="resume">▶ UDFORSK VIDERE</button><button class="secondary" data-action="reset">NYT EVENTYR</button></div>`,'win')}
function worldMap(){let o=game.objective();let labels=Object.values(PLACES).map(v=>`<div class="slot"><span>${esc(v.name)}</span><span>${v.verified?'REFERENCESPUNKT':'POSITION FORELØBIG'}</span></div>`).join('');modal(`<div class="eyebrow">KORT · MIDTJYLLAND</div><h2>VIBORG BY</h2><p>Du befinder dig ved koordinaterne <b>${Math.round(game.player.x)} m øst</b> og <b>${Math.round(-game.player.z)} m nord</b> for Domkirkens referencepunkt.</p><p class="mainQuest">Nuværende mission: ${esc(game.goal.goal)} ${o?' · '+Math.round(dist(game.player,o))+' m til nærmeste mål':''}</p>${labels}${mapData.source==='osm'&&Array.isArray(mapData.landmarks)?'<h3>Navngivne steder fra OpenStreetMap</h3>'+mapData.landmarks.filter(v=>v.position&&v.name).sort((a,b)=>dist(a.position,game.player)-dist(b.position,game.player)).slice(0,8).map(v=>`<div class="slot"><span>${esc(v.name)}</span><span>${Math.round(dist(v.position,game.player))} m · OSM</span></div>`).join(''):''}<p class="mini">Placeringerne i den offentlige kortdatabase er ikke ensbetydende med opmålte, komplette 3D-modeller.</p><div class="buttons"><button data-action="resume">◀ TILBAGE</button></div>`,'map')}
ui.overlay.addEventListener('click',e=>{const ans=e.target.closest('button[data-answer]');if(ans&&game){(game.dialogue?.puzzle==='trail'?game.answerTrail(ans.dataset.answer):game.answerPuzzle(ans.dataset.answer));return}const b=e.target.closest('button[data-action]');if(!b)return;const a=b.dataset.action;if(a==='start'||a==='resume')close();else if(a==='compass'){close();game.useCompass()}else if(a==='inventory')inventory();else if(a==='help')help();else if(a==='map')worldMap();else if(a==='reset'){if(confirm('Vil du slette dit gemte eventyr og starte forfra?')){clearSave();game=new Game(mapData,{});connectGame();close();}}});
function connectGame(){game.onChange=()=>{updateHud();if(game.dialogue)dialogue()};game.onWin=win;updateHud()}
function updateHud(){if(!game)return;const q=game.goal;ui.quest.innerHTML=`<strong>${esc(q.name)}</strong>${esc(q.goal)}`;const c=game.getCounts();ui.coins.textContent=`◆ ${c.shards}/3  ◈ ${c.seals}/3`;}
function drawMini(){if(!game)return;const c=ui.minimap,ctx=c.getContext('2d'),w=c.width,h=c.height,s=.38,p=game.player;ctx.fillStyle='#172e31';ctx.fillRect(0,0,w,h);ctx.save();ctx.translate(w/2,h/2);ctx.scale(s,s);ctx.translate(-p.x,-p.z);ctx.lineCap='round';for(const area of mapData.areas){if(!area.points?.length)continue;ctx.fillStyle=area.type==='water'?'#29596c':'#416746';ctx.beginPath();area.points.forEach((v,i)=>i?ctx.lineTo(v.x,v.z):ctx.moveTo(v.x,v.z));ctx.closePath();ctx.fill()}ctx.strokeStyle='#738581';for(const road of mapData.roads){ctx.lineWidth=road.width||6;ctx.beginPath();road.points.forEach((v,i)=>i?ctx.lineTo(v.x,v.z):ctx.moveTo(v.x,v.z));ctx.stroke()}ctx.fillStyle='#c88d6c';for(const b of mapData.buildings){ctx.beginPath();b.points.forEach((v,i)=>i?ctx.lineTo(v.x,v.z):ctx.moveTo(v.x,v.z));ctx.closePath();ctx.fill()}for(const e of game.entities){if(e.kind==='shard'&&game.collected.has(e.id)||e.kind==='seal'&&game.broken.has(e.id)||e.kind==='clue'&&game.trailFound.has(e.id))continue;ctx.fillStyle=e.kind==='npc'?'#aee4e8':e.kind==='shard'?'#ffe37f':e.kind==='clue'?'#f8e5a0':'#f28b81';ctx.beginPath();ctx.arc(e.x,e.z,6,0,Math.PI*2);ctx.fill()}ctx.restore();const target=game.objective();if(target){let x=w/2+(target.x-p.x)*s,y=h/2+(target.z-p.z)*s;let dx=x-w/2,dy=y-h/2,L=Math.hypot(dx,dy);if(L>75){x=w/2+dx/L*75;y=h/2+dy/L*75}ctx.fillStyle='#fbe29c';ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill()}ctx.save();ctx.translate(w/2,h/2);ctx.rotate(game.camera.top?0:-game.camera.yaw);ctx.fillStyle='#fffef0';ctx.beginPath();ctx.moveTo(0,-8);ctx.lineTo(-6,7);ctx.lineTo(6,7);ctx.fill();ctx.restore();ctx.strokeStyle='#91aa9c';ctx.strokeRect(.5,.5,w-1,h-1)}
function addCharacter(m,x,z,legs,col,phase=0,scale=1){const y=legs,step=Math.sin(phase)*.45*scale;m.box(x,y,z,.8*scale,1.2*scale,.65*scale,[.18,.19,.25]);m.box(x,y+1.2*scale,z,1.6*scale,1.7*scale,.9*scale,col);m.box(x,y+2.9*scale,z,1.05*scale,1.05*scale,1.05*scale,[.89,.72,.56]);m.box(x-.48*scale,y+3.45*scale,z-.5*scale,.18*scale,.18*scale,.13*scale,[.16,.17,.16]);m.box(x+.3*scale,y+3.45*scale,z-.5*scale,.18*scale,.18*scale,.13*scale,[.16,.17,.16]);m.box(x-.35*scale,y,z+.1*scale+step,.45*scale,.95*scale,.5*scale,[.22,.27,.31]);m.box(x+.35*scale,y,z+.1*scale-step,.45*scale,.95*scale,.5*scale,[.24,.27,.32]);m.box(x-1.03*scale,y+1.3*scale,z,.45*scale,1.65*scale,.6*scale,col);m.box(x+1.03*scale,y+1.3*scale,z,.45*scale,1.65*scale,.6*scale,col)}
function addOSMStreetFurniture(m){
 // All landmarks and roads remain derived from OSM; these are only decorative, unsurveyed props.
 let lamps=0,trees=0,benches=0;
 for(const road of mapData.roads){
  if(lamps>=42)break;
  if(!road.name||!/(mogens|domkirke|gammeltorv|sct\.|sankt|skovgaard)/i.test(road.name))continue;
  const ps=road.points||[];
  for(let i=1;i<ps.length&&lamps<42;i++){
   const a=ps[i-1],b=ps[i],length=Math.hypot(b.x-a.x,b.z-a.z);
   if(length<15)continue;
   const nx=-(b.z-a.z)/length,nz=(b.x-a.x)/length;
   for(let t=18;t<length;t+=36){
    const x=a.x+(b.x-a.x)*t/length+nx*((road.width||5)/2+2.0);
    const z=a.z+(b.z-a.z)*t/length+nz*((road.width||5)/2+2.0);
    if(Math.hypot(x,z)>485||blocked({x,z},mapData))continue;
    m.box(x,0,z,.6,7,.6,[.24,.28,.29]);m.box(x,7,z,2,1.1,2,[.98,.79,.49],[.99,.88,.63]);lamps++;
   }
  }
 }
 for(const a of mapData.areas||[]){
  if((a.type!=='park')||!a.points?.length||trees>=75)continue;
  const xs=a.points.map(v=>v.x),zs=a.points.map(v=>v.z);
  const minx=Math.min(...xs),maxx=Math.max(...xs),minz=Math.min(...zs),maxz=Math.max(...zs);
  if(maxx-minx<18||maxz-minz<18)continue;
  for(let i=0;i<45&&trees<75;i++){
   const seed=hash(String(a.id||'park')+':'+i);
   const x=minx+((seed%997)/997)*(maxx-minx),z=minz+(((seed>>>11)%991)/991)*(maxz-minz);
   if(Math.hypot(x,z)>485||!pointInPoly({x,z},a.points)||blocked({x,z},mapData))continue;
   const h=6+seed%4;
   m.box(x,0,z,.85,h,.85,[.36,.25,.17]);
   m.box(x,h,z,5.8+(seed%3),5.5,5.8+(seed%3),[.2,.4+(seed%3)*.035,.24],[.31,.56,.31]);trees++;
   if(i%4===0&&benches<16){
    const bx=x+5,bz=z+3;
    if(pointInPoly({x:bx,z:bz},a.points)&&!blocked({x:bx,z:bz},mapData)){
     m.box(bx,.65,bz,3,.5,1.2,[.49,.33,.21],[.68,.48,.29]);
     m.box(bx,1.15,bz+.45,3,1.2,.3,[.49,.33,.21]);benches++;
    }
   }
  }
 }
}
function addProps(m){
 if(mapData.source==='osm'){addOSMStreetFurniture(m);return}
 const b=at('borgvold'),q=at('gammeltorv'),d=at('domkirke'),s=at('sctmogens');
 // Borgvold trees
 for(let i=0;i<18;i++){let a=i*2.05,r=34+16*(i%4),x=b.x-24+Math.cos(a)*r,z=b.z-8+Math.sin(a)*r;m.box(x,0,z,1,8+(i%3),1,[.36,.25,.18]);m.box(x,8+(i%3),z,8,6,8,[.18,.39+(i%3)*.035,.24],[.31,.56,.33])}
 // Lamps and small market stalls around Gammeltorv
 for(let i=0;i<6;i++){let x=q.x+i*18-44,z=q.z+30;m.box(x,0,z,1,8,1,[.24,.26,.27]);m.box(x,8,z,3,1.5,3,[.98,.77,.38])}
 for(let i=0;i<3;i++){let x=q.x-22+i*22,z=q.z-15;m.box(x,0,z,9,3.4,5,[.55,.34,.18],[.86,.77,.46]);m.box(x,3.4,z,10,1.1,6,[.8,.2+.08*i,.16+.05*i],[.92,.86,.62])}
 // Small stepping route near the park for platforming
 for(let i=0;i<5;i++){let x=b.x+18+i*8,z=b.z+64;m.box(x,1.6+i*.58,z,6,1.2,6,[.44,.33,.22],[.67,.49,.26])}
 // Cathedral and plaza accents
 m.box(d.x,0,d.z-86,34,1.2,16,[.58,.56,.54],[.68,.66,.62]);
 m.box(d.x,0,d.z+62,58,1,24,[.59,.57,.54],[.68,.66,.62]);
 for(const dx of [-13,13]){m.box(d.x+dx,34,d.z-60,12,12,12,[.71,.68,.59]);m.box(d.x+dx,46,d.z-60,7,10,7,[.42,.42,.45],[.26,.27,.32])}
 m.box(d.x,24,d.z+12,30,8,78,[.73,.7,.62],[.79,.76,.69]);
 m.box(d.x,18,d.z+6,72,6,18,[.74,.71,.63],[.78,.75,.68]);
 // Fountain / monument on the square
 m.box(q.x+6,0,q.z+2,8,1.4,8,[.53,.57,.6],[.69,.73,.75]);
 m.box(q.x+6,1.4,q.z+2,3,5,3,[.58,.62,.66],[.84,.88,.92]);
 // Stylised bridge toward Borgvold water edge
 m.box(b.x+102,0,b.z-86,44,1.2,10,[.47,.36,.24],[.61,.47,.31]);
 for(const off of [-18,-6,6,18])m.box(b.x+102+off,1.2,b.z-86,2,4,2,[.36,.25,.18]);
 // A few coloured facades along Sct. Mogens Gade to strengthen the street feeling.
 for(let i=0;i<5;i++){let z=-84+i*46;m.box(s.x-34,0,z,14,11,14,[.82,.68-.04*i,.53],[.55,.23,.16]);m.box(s.x+34,0,z+8,13,10,13,[.74,.63,.56],[.45,.28,.22])}
}
function dynamicMesh(){const m=new Mesh(),p=game.player,t=game.time,near=260;const moving=Object.keys(keys).some(k=>keys[k]&&'wasdArrowUpArrowDownArrowLeftArrowRight'.includes(k));addCharacter(m,p.x,p.z,p.y,[.84,.31,.26],moving?t*11:0,1);for(const e of game.entities){if(dist(p,e)>near||e.kind==='shard'&&game.collected.has(e.id)||e.kind==='seal'&&game.broken.has(e.id)||e.kind==='clue'&&game.trailFound.has(e.id))continue;let bounce=Math.sin(t*2.8+e.x)*.35;if(e.kind==='npc'){addCharacter(m,e.x,e.z,0,e.color,t+e.x,1);m.box(e.x,5.4+bounce,e.z,1.6,1.5,1.6,[.98,.85,.38])}if(e.kind==='clue'){m.box(e.x,0,e.z,.7,3.4,.7,[.35,.27,.2]);m.box(e.x,3.4+bounce*.18,e.z,3.5,2.5,.65,[.24,.42,.56],[.94,.77,.38]);m.box(e.x,4.15+bounce*.18,e.z-.4,2.1,.4,.25,[.99,.87,.52])}if(e.kind==='shard'){let y=1.1+bounce;m.box(e.x,y,e.z,1.65,2.5,1.65,[.96,.73,.26],[.99,.92,.55]);m.box(e.x,y+2.4,e.z,2.1,.5,2.1,[.99,.94,.75])}if(e.kind==='seal'){m.box(e.x,0,e.z,4,3.8,4,[.36,.33,.37],[.72,.32,.37]);m.box(e.x,3.8+bounce,e.z,2,1.2,2,[.95,.34,.33])}if(e.kind==='chest'){m.box(e.x,0,e.z,4,2.4,3,[.45,.29,.12],[.77,.55,.21]);m.box(e.x,2.4,e.z,4.5,1,3.5,[.91,.68,.33])}}
 return m.v}
function interact(){if(screen!=='play')return;game.interact()};function attack(){if(screen!=='play')return;game.attack()};function switchCam(){if(!game)return;game.camera.top=!game.camera.top};
function keyAction(key){if(!game)return;if(key==='e')interact();else if(key==='f')attack();else if(key==='v')switchCam();else if(key==='c'&&screen==='play')game.useCompass();else if(key==='i')screen==='play'?inventory():close();else if(key==='m')screen==='play'?worldMap():close();else if(key==='Escape')screen==='play'?pause():close()}
window.addEventListener('keydown',e=>{let k=e.key.length===1?e.key.toLowerCase():e.key;if([' ','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))e.preventDefault();if(!keys[k]&&!e.repeat)keyAction(k);keys[k]=true});window.addEventListener('keyup',e=>keys[e.key.length===1?e.key.toLowerCase():e.key]=false);window.addEventListener('blur',()=>{for(let k in keys)keys[k]=false});
$('viewButton').addEventListener('click',switchCam);$('menuButton').addEventListener('click',()=>screen==='play'?pause():close());let dragging=false,lastX=0;canvas.addEventListener('pointerdown',e=>{dragging=true;lastX=e.clientX;canvas.setPointerCapture(e.pointerId)});canvas.addEventListener('pointermove',e=>{if(dragging&&game&&!game.camera.top)game.camera.yaw+=(e.clientX-lastX)*.007;lastX=e.clientX});canvas.addEventListener('pointerup',()=>dragging=false);canvas.addEventListener('pointercancel',()=>dragging=false);canvas.addEventListener('lostpointercapture',()=>dragging=false);canvas.addEventListener('wheel',e=>{if(!game||game.camera.top)return;e.preventDefault();game.camera.zoom=clamp((game.camera.zoom||31)+Math.sign(e.deltaY)*3,16,65)},{passive:false});
for(const b of document.querySelectorAll('[data-hold]')){const k=b.dataset.hold;b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);keys[k]=true});for(const evt of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(evt,()=>keys[k]=false)}
for(const b of document.querySelectorAll('[data-tap]'))b.addEventListener('click',()=>{let k=b.dataset.tap;if(k==='space'){keys[' ']=true;setTimeout(()=>keys[' ']=false,150)}else keyAction(k)});
function frameLoop(ts){requestAnimationFrame(frameLoop);if(!game||!renderer)return;let dt=Math.min(.05,Math.max(0,(ts-last)/1000));last=ts;if(screen==='play'){game.step(dt,keys);if(game.dialogue){dialogue();}let e=game.near();ui.hint.textContent=e?`${e.name}  ·  ${e.kind==='seal'?'F: SLÅ':'E: UNDERSØG'}`:'';if(frame%18===0){const road=nearestNamedRoad(mapData.roads,game.player);streetLabel=road?road.name:''}ui.status.textContent=game.time<game.noticeEnd?game.notice:`${mapData.source==='osm'?'OSM-KORT':'SKEMATISK DEMO'} · ${Math.round(game.player.x)} E / ${Math.round(-game.player.z)} N · ${streetLabel?streetLabel+' · ':''}${Math.round(1/dt||0)} FPS`;}const m=dynamicMesh();renderer.render(m,game.player,game.camera,dt);if(++frame%9===0)drawMini()}
async function boot(){try{renderer=new Renderer(canvas);ui.status.textContent='Indlæser byen…';mapData=await loadWorld();let m=new Mesh();m.v=makeCityMesh(mapData);addProps(m);renderer.setWorld(m.v);game=new Game(mapData,getSave());connectGame();ui.source.textContent=mapData.source==='osm'?'| OSM-DATA · '+(mapData.generated||'ukendt dato'):'| SKEMATISK DEMOKORT · IKKE OPMÅLT';intro();requestAnimationFrame(frameLoop);if(mapData.source==='demo')ui.status.textContent='Demokort: Github-workflowet kan hente OSM-geometri til udgivelsen.';}catch(err){console.error(err);modal(`<h2>SPILLET KUNNE IKKE STARTE</h2><p>${esc(err.message)}</p><p>Kontrollér at browseren understøtter WebGL.</p>`,'error')}}boot();
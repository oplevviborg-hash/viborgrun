import {test} from 'node:test';import assert from 'node:assert/strict';
import {fromGeo,toGeo,pointInPoly,lookAt,mul,perspective} from '../src/math.js';
import {createDemo,PLACES,blocked,at,snapWalkable,nearestNamedRoad} from '../src/world.js';
import {Game,STORY} from '../src/gameplay.js';
import {Mesh,triangulate,makeCityMesh} from '../src/renderer.js';
import fs from 'node:fs';
const world=JSON.parse(fs.readFileSync(new URL('../assets/map/city.json',import.meta.url),'utf8'));
global.localStorage={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};
test('world source is explicit and source data has geometry',()=>{assert.ok(['osm','demo'].includes(world.source));assert.ok(world.roads.length>5);assert.ok(world.buildings.length>5)});
test('roundtrip WGS84 coordinates near Domkirke',()=>{for(const p of [{lat:56.45051,lon:9.41248},{lat:56.45122,lon:9.41803}]){const xy=fromGeo(p.lat,p.lon),g=toGeo(xy.x,xy.z);assert.ok(Math.abs(p.lat-g.lat)<1e-8);assert.ok(Math.abs(p.lon-g.lon)<1e-8)}});
test('point in polygon supports interior exterior',()=>{let p=[{x:0,z:0},{x:9,z:0},{x:9,z:9},{x:0,z:9}];assert.equal(pointInPoly({x:4,z:4},p),true);assert.equal(pointInPoly({x:10,z:10},p),false)});
test('all quest anchor positions can be snapped onto walkable space',()=>{let game=new Game(world,{});assert.ok(game.entities.length>=10);for(const e of game.entities)assert.equal(blocked(e,world),false,'unwalkable '+e.id)});
test('player begins outside buildings and water',()=>{let g=new Game(world,{});assert.equal(blocked(g.player,world),false)});
test('quest flow and inventory can progress through all five missions',()=>{let g=new Game(world,{});g.player={...g.entities.find(e=>e.id==='archivist'),y:0,vy:0};g.interact();assert.equal(g.quest,1);g.dialogue=null;for(const e of g.entities.filter(e=>e.kind==='shard')){g.player={...e,y:0,vy:0};g.interact()}assert.equal(g.collected.size,3);assert.equal(g.quest,2);g.player={...g.entities.find(e=>e.id==='gardener'),y:0,vy:0};g.interact();assert.equal(g.quest,3);g.dialogue=null;for(const e of g.entities.filter(e=>e.kind==='seal')){g.player={...e,y:0,vy:0};g.attack()}assert.equal(g.broken.size,3);assert.equal(g.quest,4);g.player={...g.entities.find(e=>e.id==='chest'),y:0,vy:0};g.interact();assert.equal(g.quest,5);assert.equal(g.ended,true)});
test('triangulation covers concave polygon correctly',()=>{let poly=[{x:0,z:0},{x:10,z:0},{x:10,z:4},{x:4,z:4},{x:4,z:10},{x:0,z:10}];assert.equal(triangulate(poly).length,4)});
test('WebGL mesh contains valid packed 9 floats per vertex',()=>{const m=new Mesh();m.box(0,0,0,3,4,5,[1,0,0]);assert.equal(m.v.length%9,0);assert.ok(m.v.length>0);assert.ok([...m.v].every(Number.isFinite))});
test('static world geometry compiles without NaNs',()=>{const a=makeCityMesh(world);assert.ok(a.length>1000);assert.equal(a.length%9,0);assert.ok(a.every(Number.isFinite))});
test('view projection finite and 4x4',()=>{const p=perspective(1,1.8,.1,1700),v=lookAt([0,20,30],[0,0,0],[0,1,0]);const m=mul(p,v);assert.equal(m.length,16);assert.ok(m.every(Number.isFinite))});

test('side quest: wrong answer is repeatable and correct geographic answer awards usable compass',()=>{
 const g=new Game(world,{});
 const keeper=g.entities.find(e=>e.id==='keeper');
 assert.ok(keeper);
 g.player={x:keeper.x,z:keeper.z,y:0,vy:0,vx:0,vz:0};
 g.interact();assert.ok(g.dialogue?.choices?.length===3);
 g.answerPuzzle('gammeltorv');assert.equal(g.puzzleSolved,false);assert.equal(g.items.has('kompas'),false);
 g.interact();g.answerPuzzle('borgvold');
 assert.equal(g.puzzleSolved,true);assert.equal(g.items.has('kompas'),true);
 g.useCompass();assert.match(g.notice,/KOMPAS:/);
 const copy=new Game(world,{puzzleSolved:g.puzzleSolved,items:[...g.items]});
 assert.equal(copy.items.has('kompas'),true);
});
test('swept collision prevents sprinting through a narrow building',()=>{
 const wall={id:'test',height:10,points:[{x:0,z:-7},{x:1,z:-7},{x:1,z:7},{x:0,z:7}]};
 const tiny={buildings:[wall],roads:[],areas:[]};
 const g=new Game(tiny,{});g.camera.top=true;
 g.player={x:-5,z:0,y:0,vy:0,vx:0,vz:0,heading:0};
 for(let i=0;i<55;i++)g.step(.05,{d:true,Shift:true});
 assert.ok(g.player.x<-.5,'player must stop before wall; x='+g.player.x);
 assert.equal(blocked(g.player,tiny),false);
});
test('decorated roof and windows produce finite triangle data',()=>{
 const m=new Mesh();const p=[{x:0,z:0},{x:18,z:0},{x:18,z:12},{x:0,z:12}];
 m.polygonBuilding(p,15,[.8,.7,.6],[.6,.3,.2],{detail:true,roofShape:'gabled',material:'brick'});
 assert.ok(m.v.length>9*36);assert.ok(m.v.every(Number.isFinite));
});


test('side route has three readable clues, a retryable word-order puzzle and persistent speed boots',()=>{
 const g=new Game(world,{quest:2,collected:['shard1']});
 const npc=g.entities.find(e=>e.id==='routemaster');
 g.player={...npc,y:0,vy:0,vx:0,vz:0};g.interact();
 assert.equal(g.trailStarted,true);g.dialogue=null;
 for(const e of g.entities.filter(e=>e.kind==='clue')){
  g.player={...e,y:0,vy:0,vx:0,vz:0};g.interact();
  assert.ok(g.trailFound.has(e.id),'missing '+e.id);g.dialogue=null;
 }
 assert.equal(g.trailFound.size,3);
 g.player={...npc,y:0,vy:0,vx:0,vz:0};g.interact();
 assert.equal(g.dialogue.puzzle,'trail');
 assert.equal(g.answerTrail('vejen-aabner-tid'),false);
 assert.equal(g.answerTrail('tid-aabner-vejen'),true);
 assert.equal(g.items.has('vandrestoevler'),true);
 assert.equal(g.quest,2,'side quest must not overwrite main quest');
 const restored=new Game(world,{quest:g.quest,collected:[...g.collected],trailStarted:g.trailStarted,trailFound:[...g.trailFound],trailSolved:g.trailSolved,items:[...g.items]});
 assert.equal(restored.trailSolved,true);
 assert.equal(restored.trailFound.size,3);
 assert.equal(restored.items.has('vandrestoevler'),true);
});
test('nearest road is chosen by actual segment distance, not arbitrary point',()=>{
 const roads=[{name:'Langgade',points:[{x:0,z:0},{x:100,z:0}]},{name:'Tværvej',points:[{x:60,z:50},{x:60,z:80}]}];
 assert.equal(nearestNamedRoad(roads,{x:50,z:4}).name,'Langgade');
 assert.equal(nearestNamedRoad(roads,{x:50,z:4}).distance,4);
 assert.equal(nearestNamedRoad(roads,{x:200,z:200}),null);
});
test('new map surfaces and walkable roof geometry remain finite',()=>{
 const map={buildings:[],areas:[{type:'square',points:[{x:0,z:0},{x:12,z:0},{x:12,z:12},{x:0,z:12}]}],roads:[{kind:'pedestrian',surface:'paving_stones',width:7,points:[{x:0,z:0},{x:50,z:0}]},{kind:'primary',width:10,points:[{x:0,z:20},{x:90,z:20}]}]};
 const verts=makeCityMesh(map);assert.ok(verts.length>300);assert.equal(verts.length%9,0);assert.ok(verts.every(Number.isFinite));
});

test('lygte sidequest rewards persistent equipment and no repeated pickup',()=>{
 const g=new Game(world,{}),npc=g.entities.find(e=>e.id==='lamplighter'),item=g.entities.find(e=>e.id==='lostlantern');
 assert.ok(npc&&item);
 g.player={...npc,y:0,vy:0,vx:0,vz:0};g.interact();assert.equal(g.lanternQuest,true);
 g.dialogue=null;g.player={...item,y:0,vy:0,vx:0,vz:0};g.interact();assert.equal(g.lanternFound,true);
 g.dialogue=null;g.player={...npc,y:0,vy:0,vx:0,vz:0};g.interact();
 assert.equal(g.lanternSolved,true);assert.equal(g.items.has('lanterne'),true);
 assert.equal(g.useLantern(),true);assert.ok(g.lanternUntil>g.time);
 const copy=new Game(world,{items:[...g.items],lanternQuest:g.lanternQuest,lanternFound:g.lanternFound,lanternSolved:g.lanternSolved});
 copy.player={...item,y:0,vy:0,vx:0,vz:0};assert.notEqual(copy.near()?.id,'lostlantern');
});

test('manual map anchors are never labelled as verified OSM geometry',()=>{
 for(const place of Object.values(PLACES))assert.equal(place.verified,false);
});
test('photo-study wall has demo collision without changing OSM navigation',async()=>{
 const {demoStoneWall}=await import('../src/world.js');
 const wall=demoStoneWall(),pos={x:wall.x,z:(wall.z0+wall.z1)/2};
 assert.equal(wall.source,'photo-inspired-approximation');
 assert.equal(blocked(pos,world),true);
 assert.equal(blocked(pos,{source:'osm',buildings:[],areas:[],roads:[]}),false);
});
test('mason NPC offers a real puzzle with a persistent jump upgrade',()=>{
 const g=new Game(world,{quest:2,items:['kompas']});
 const npc=g.entities.find(e=>e.id==='mason');assert.ok(npc);
 g.player={...npc,y:0,vy:0,vx:0,vz:0};g.interact();
 assert.equal(g.dialogue.puzzle,'mason');assert.equal(g.dialogue.choices.length,3);
 assert.equal(g.answerPuzzle('tagrende'),false);assert.equal(g.masonSolved,false);
 g.interact();assert.equal(g.answerPuzzle('stoettemur'),true);
 assert.equal(g.items.has('fjederstoevler'),true);assert.equal(g.quest,2);
 const saved=new Game(world,{quest:g.quest,items:[...g.items],masonSolved:g.masonSolved});
 assert.equal(saved.masonSolved,true);assert.equal(saved.items.has('kompas'),true);
 saved.step(.016,{' ':true});assert.ok(saved.player.vy>12);
});
test('holding jump does not auto-bunny-hop on landing',()=>{
 const g=new Game(world,{});for(let i=0;i<160;i++)g.step(.016,{' ':true});
 assert.equal(g.player.y,0);assert.equal(g.player.vy,0);
 g.step(.016,{});g.step(.016,{' ':true});assert.ok(g.player.y>0);
});
test('retaining wall and trimmed trees add finite retro geometry',async()=>{
 const {addMogensPhotoStudy}=await import('../src/landmarks.js');
 const m=new Mesh();addMogensPhotoStudy(m);
 assert.ok(m.v.length>1000);assert.equal(m.v.length%9,0);assert.ok(m.v.every(Number.isFinite));
});

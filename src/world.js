import {fromGeo,hash,pointInPoly,dist} from './math.js';
export const PLACES={
 domkirke:{name:'Viborg Domkirke',lat:56.45051,lon:9.41248,verified:false},
 borgvold:{name:'Borgvold',lat:56.45122,lon:9.41803,verified:false},
 gammeltorv:{name:'Gammeltorv',lat:56.45051,lon:9.41120,verified:false},
 sctmogens:{name:'Sct. Mogens Gade',lat:56.45126,lon:9.41140,verified:false}
};
export function at(place,dx=0,dz=0){let p=PLACES[place],v=fromGeo(p.lat,p.lon);return {x:v.x+dx,z:v.z+dz}}

function rect(cx,cz,w,d){return [{x:cx-w/2,z:cz-d/2},{x:cx+w/2,z:cz-d/2},{x:cx+w/2,z:cz+d/2},{x:cx-w/2,z:cz+d/2}]}
function polyCenter(points){let x=0,z=0;for(const p of points){x+=p.x;z+=p.z}return {x:x/points.length,z:z/points.length}}
function addBuilding(list,id,cx,cz,w,d,h){list.push({id,height:h,points:rect(cx,cz,w,d)})}
function addRow(list,prefix,cx,cz,count,spacing,w,d,baseHeight,axis='x'){
 for(let i=0;i<count;i++){
  const seed=hash(prefix+':'+i),h=baseHeight+seed%8;
  const x=axis==='x'?cx+(i-(count-1)/2)*spacing:cx+(seed%5-2)*1.4;
  const z=axis==='z'?cz+(i-(count-1)/2)*spacing:cz+((seed>>3)%5-2)*1.4;
  addBuilding(list,`${prefix}-${i}`,x,z,w+(seed%3),d+((seed>>4)%3),h)
 }
}
export function createDemo(){
 let roads=[],buildings=[],areas=[];const p=(x,z)=>({x,z});
 const d=at('domkirke'),b=at('borgvold'),g=at('gammeltorv'),s=at('sctmogens');
 // Key landscape masses approximating central Viborg: old town core, Borgvold park and eastern water.
 areas.push({type:'park',points:[p(b.x-145,b.z-130),p(b.x+92,b.z-146),p(b.x+110,b.z+56),p(b.x-88,b.z+104),p(b.x-156,b.z+12)]});
 areas.push({type:'water',points:[p(b.x+58,b.z-208),p(720,b.z-212),p(720,b.z+168),p(b.x+128,b.z+176),p(b.x+92,b.z+88),p(b.x+42,b.z-16)]});
 areas.push({type:'square',points:[p(g.x-42,g.z-38),p(g.x+40,g.z-38),p(g.x+52,g.z+34),p(g.x-46,g.z+42)]});
 areas.push({type:'square',points:[p(d.x-48,d.z-50),p(d.x+48,d.z-50),p(d.x+58,d.z+54),p(d.x-52,d.z+60)]});
 areas.push({type:'green',points:[p(d.x-120,d.z-118),p(d.x+130,d.z-120),p(d.x+144,d.z+124),p(d.x-132,d.z+132)]});
 // Main streets and paths.
 roads.push({name:'Sct Mogens Gade',width:11,points:[p(s.x-8,-270),p(s.x-5,-170),p(s.x-2,-90),p(s.x,0),p(s.x+6,92),p(s.x+10,182),p(s.x+12,262)]});
 roads.push({name:'Gammeltorv øst-vest',width:12,points:[p(g.x-180,g.z+4),p(g.x-78,g.z+1),p(g.x,g.z),p(d.x+30,g.z+4),p(d.x+116,g.z+8),p(b.x-26,g.z+28)]});
 roads.push({name:'Domkirke-strøg',width:10,points:[p(d.x-18,-146),p(d.x-6,-70),p(d.x,0),p(d.x+10,74),p(d.x+20,140)]});
 roads.push({name:'Borgvold adgang',width:9,points:[p(d.x+78,g.z+18),p(b.x-74,b.z-22),p(b.x-30,b.z+8),p(b.x+26,b.z+12)]});
 roads.push({name:'Søpromenade',width:8,points:[p(b.x+18,b.z-76),p(b.x+82,b.z-106),p(b.x+152,b.z-94),p(b.x+226,b.z-56),p(b.x+284,b.z+16),p(b.x+302,b.z+82)]});
 roads.push({name:'Nordlig forbindelse',width:8,points:[p(g.x-132,-160),p(g.x-64,-122),p(d.x+8,-102),p(d.x+102,-92)]});
 roads.push({name:'Vestlig forbindelse',width:8,points:[p(g.x-170,112),p(g.x-90,64),p(g.x-26,18),p(g.x+30,-18)]});
 roads.push({name:'Torvegade syd',width:8,points:[p(g.x-12,44),p(g.x-20,112),p(g.x-26,178),p(g.x-30,250)]});
 roads.push({name:'Domkirkekvarter nord',width:7,points:[p(d.x-96,-54),p(d.x-48,-40),p(d.x+10,-36),p(d.x+74,-32),p(d.x+130,-28)]});
 roads.push({name:'Parksti nord',width:6,points:[p(b.x-118,b.z-58),p(b.x-78,b.z-18),p(b.x-24,b.z+10),p(b.x+34,b.z+24)]});
 roads.push({name:'Parksti syd',width:6,points:[p(b.x-96,b.z+48),p(b.x-42,b.z+34),p(b.x+16,b.z+28),p(b.x+72,b.z+44)]});
 // Cathedral complex
 buildings.push({id:'domkirke-nave',height:24,points:[p(d.x-18,d.z-42),p(d.x+18,d.z-42),p(d.x+18,d.z+54),p(d.x-18,d.z+54)]});
 buildings.push({id:'domkirke-transept',height:18,points:[p(d.x-44,d.z-4),p(d.x+44,d.z-4),p(d.x+44,d.z+18),p(d.x-44,d.z+18)]});
 buildings.push({id:'domkirke-west-tower',height:34,points:[p(d.x-20,d.z-72),p(d.x-6,d.z-72),p(d.x-6,d.z-48),p(d.x-20,d.z-48)]});
 buildings.push({id:'domkirke-east-tower',height:34,points:[p(d.x+6,d.z-72),p(d.x+20,d.z-72),p(d.x+20,d.z-48),p(d.x+6,d.z-48)]});
 // Old town blocks around Gammeltorv and Sct. Mogens Gade.
 addRow(buildings,'gammeltorv-north',g.x,g.z-78,5,34,22,18,11,'x');
 addRow(buildings,'gammeltorv-south',g.x+8,g.z+88,5,34,24,16,10,'x');
 addRow(buildings,'mogens-west',s.x-42,18,7,42,18,24,11,'z');
 addRow(buildings,'mogens-east',s.x+42,10,7,42,18,22,11,'z');
 addRow(buildings,'domkirke-west',d.x-102,-8,5,40,24,22,12,'z');
 addRow(buildings,'domkirke-east',d.x+102,-6,5,40,22,20,12,'z');
 addRow(buildings,'domkirke-north',d.x,-118,6,38,22,18,11,'x');
 addRow(buildings,'domkirke-south',d.x+6,132,6,38,22,18,10,'x');
 addRow(buildings,'west-entry',g.x-136,-18,4,40,22,20,11,'z');
 addRow(buildings,'west-entry-2',g.x-152,116,3,40,22,20,10,'z');
 // Irregular landmark-ish blocks.
 addBuilding(buildings,'raadhus-karré',g.x-82,g.z+6,28,46,17);
 addBuilding(buildings,'latinerskole',d.x+84,d.z+86,28,54,18);
 addBuilding(buildings,'bibliotek',g.x+104,g.z+90,34,22,14);
 addBuilding(buildings,'apotek',g.x+72,g.z-86,28,24,14);
 addBuilding(buildings,'merchant-house-a',g.x-102,g.z-82,18,32,12);
 addBuilding(buildings,'merchant-house-b',g.x-108,g.z+92,18,30,11);
 addBuilding(buildings,'merchant-house-c',g.x+102,g.z-96,18,32,13);
 addBuilding(buildings,'merchant-house-d',g.x+118,g.z+96,20,34,13);
 addBuilding(buildings,'borgvold-kiosk',b.x-26,b.z-32,18,16,9);
 addBuilding(buildings,'museum-edge',b.x-92,b.z-118,28,18,10);
 // Fill eastern edge with detached houses, but avoid the lake.
 for(let i=0;i<10;i++){
  const seed=hash('east:'+i),cx=d.x+180+(i%2)*34+((seed>>4)%8),cz=-110+i*44+(seed%6); 
  addBuilding(buildings,`east-house-${i}`,cx,cz,18+(seed%6),16+((seed>>3)%6),9+((seed>>2)%8));
 }
 // Compute centers for collision fast-path.
 for(const bld of buildings){const c=polyCenter(bld.points);bld.cx=c.x;bld.cz=c.z}
 return {source:'demo',label:'VIBORG-INSPIRERET DEMOKORT (STADIG IKKE GEO-VERIFICERET)',buildings,roads,areas,generated:'2026-10-12'}
}
export async function loadWorld(){try{const res=await fetch('./assets/map/city.json',{cache:'no-cache'});if(!res.ok)throw Error('Kortfil mangler');const data=await res.json();if(!['osm','demo'].includes(data.source)||!Array.isArray(data.buildings)||!Array.isArray(data.roads))throw Error('Kortdata ugyldig');return data}catch(e){console.warn('Map fallback:',e);return createDemo()}}
// Photo-inspired, manually placed demo scenery. Not surveyed OSM or elevation data.
export function demoStoneWall(){const s=at('sctmogens');return {x:s.x+16,z0:s.z+12,z1:s.z+98,width:2.4,source:'photo-inspired-approximation'}}
function footprintBounds(poly){
 let minx=Infinity,maxx=-Infinity,minz=Infinity,maxz=-Infinity;
 for(const p of poly){minx=Math.min(minx,p.x);maxx=Math.max(maxx,p.x);minz=Math.min(minz,p.z);maxz=Math.max(maxz,p.z)}
 return {minx,maxx,minz,maxz};
}
function segmentDistanceSquared(p,a,b){
 const dx=b.x-a.x,dz=b.z-a.z,den=dx*dx+dz*dz;
 const t=den>0?Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/den)):0;
 const ex=p.x-a.x-t*dx,ez=p.z-a.z-t*dz;
 return ex*ex+ez*ez;
}
function hitPolygon(pos,poly,bounds,radius){
 if(!poly?.length)return false;
 if(pos.x+radius<bounds.minx||pos.x-radius>bounds.maxx||pos.z+radius<bounds.minz||pos.z-radius>bounds.maxz)return false;
 if(pointInPoly(pos,poly))return true;
 // Exact circle-to-edge test catches diagonal strips missed by discrete samples.
 for(let i=0;i<poly.length;i++)if(segmentDistanceSquared(pos,poly[i],poly[(i+1)%poly.length])<=radius*radius)return true;
 return false;
}
export function blocked(pos,data,radius=.65){
 if(data.source==='demo'){
  const wall=demoStoneWall();
  if(Math.abs(pos.x-wall.x)<wall.width/2+radius&&pos.z>wall.z0-radius&&pos.z<wall.z1+radius)return true;
 }
 if(Math.abs(pos.x)>740-radius||Math.abs(pos.z)>740-radius)return true;
 for(const b of data.buildings){
  if(!b._bounds)b._bounds=footprintBounds(b.points);
  if(hitPolygon(pos,b.points,b._bounds,radius))return true;
 }
 for(const a of data.areas){
  if(a.type!=='water')continue;
  if(!a._bounds)a._bounds=footprintBounds(a.points);
  if(hitPolygon(pos,a.points,a._bounds,radius))return true;
 }
 return false;
}
export function nearestNamedRoad(roads,pos,maxDistance=42){
 let best=null,bestDistance=maxDistance;
 for(const road of roads||[]){
  if(!road.name||!Array.isArray(road.points))continue;
  for(let i=1;i<road.points.length;i++){
   const a=road.points[i-1],b=road.points[i],dx=b.x-a.x,dz=b.z-a.z,den=dx*dx+dz*dz;
   if(den<.001)continue;
   const t=Math.max(0,Math.min(1,((pos.x-a.x)*dx+(pos.z-a.z)*dz)/den));
   const distance=Math.hypot(pos.x-a.x-dx*t,pos.z-a.z-dz*t);
   if(distance<bestDistance){bestDistance=distance;best={name:road.name,kind:road.kind||'',distance:Math.round(distance)}}
  }
 }
 return best;
}
export function snapWalkable(pos,data){if(!blocked(pos,data))return pos;for(let r=5;r<65;r+=5)for(let a=0;a<16;a++){let t=a*Math.PI/8,test={x:pos.x+Math.cos(t)*r,z:pos.z+Math.sin(t)*r};if(!blocked(test,data))return test}return pos}
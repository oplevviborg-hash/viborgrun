import {fromGeo,hash,pointInPoly,dist} from './math.js';
export const PLACES={
 domkirke:{name:'Viborg Domkirke',lat:56.45051,lon:9.41248,verified:true},
 borgvold:{name:'Borgvold',lat:56.45122,lon:9.41803,verified:true},
 gammeltorv:{name:'Gammeltorv',lat:56.45051,lon:9.41120,verified:false},
 sctmogens:{name:'Sct. Mogens Gade',lat:56.45126,lon:9.41140,verified:true}
};
export function at(place,dx=0,dz=0){let p=PLACES[place],v=fromGeo(p.lat,p.lon);return {x:v.x+dx,z:v.z+dz}}
export function createDemo(){let roads=[],buildings=[],areas=[];const p=(x,z)=>({x,z});
 for(let x=-650;x<=650;x+=80)roads.push({points:[p(x,-650),p(x,650)],width:x%160===0?10:6});
 for(let z=-650;z<=650;z+=80)roads.push({points:[p(-650,z),p(650,z)],width:z%160===0?9:6});
 let base=at('borgvold');areas.push({type:'park',points:[p(base.x-65,base.z-65),p(base.x+115,base.z-65),p(base.x+115,base.z+100),p(base.x-65,base.z+100)]});
 areas.push({type:'water',points:[p(base.x+112,-520),p(630,-520),p(630,420),p(base.x+130,420),p(base.x+120,120)]});
 for(let gx=-6;gx<6;gx++)for(let gz=-6;gz<6;gz++){let x=gx*80+37,z=gz*80+33,seed=hash(gx+':'+gz),w=26+seed%19,d=28+(seed>>4)%21;if(Math.hypot(x,z)<43||Math.hypot(x-base.x,z-base.z)<115||x>base.x+100)continue;buildings.push({id:'demo-'+gx+'-'+gz,height:8+seed%17,points:[p(x-w/2,z-d/2),p(x+w/2,z-d/2),p(x+w/2,z+d/2),p(x-w/2,z+d/2)]})}
 // Den håndtegnede kirke i demoen er bevidst en symbolsk model, ikke en opmåling.
 buildings.push({id:'demo-domkirke',height:21,points:[p(-21,-30),p(21,-30),p(21,30),p(-21,30)]});
 return {source:'demo',label:'SKEMATISK DEMOKORT (IKKE GEO-VERIFICERET)',buildings,roads,areas,generated:'2026-10-12'}
}
export async function loadWorld(){try{const res=await fetch('./assets/map/city.json',{cache:'no-cache'});if(!res.ok)throw Error('Kortfil mangler');const data=await res.json();if(!['osm','demo'].includes(data.source)||!Array.isArray(data.buildings)||!Array.isArray(data.roads))throw Error('Kortdata ugyldig');return data}catch(e){console.warn('Map fallback:',e);return createDemo()}}
export function blocked(pos,data){if(Math.abs(pos.x)>740||Math.abs(pos.z)>740)return true;for(const b of data.buildings){if(Math.abs((b.cx??(b.points[0]?.x||0))-pos.x)>140&&b.cx!==undefined)continue;if(pointInPoly(pos,b.points))return true}for(const a of data.areas){if(a.type==='water'&&pointInPoly(pos,a.points))return true}return false}
export function snapWalkable(pos,data){if(!blocked(pos,data))return pos;for(let r=5;r<65;r+=5)for(let a=0;a<16;a++){let t=a*Math.PI/8,test={x:pos.x+Math.cos(t)*r,z:pos.z+Math.sin(t)*r};if(!blocked(test,data))return test}return pos}

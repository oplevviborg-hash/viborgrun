import {demoStoneWall} from './world.js';
// Artist's approximation of the stone wall near Sct. Mogens Gade.
// DEMO ONLY: not an OSM surveyed wall, not measured elevation data.
export function addMogensPhotoStudy(mesh){
 const w=demoStoneWall(),length=w.z1-w.z0;
 mesh.box(w.x,0,(w.z0+w.z1)/2,w.width,2.8,length,[.48,.46,.42],[.72,.69,.62]);
 for(let row=0;row<3;row++)for(let i=0;i<Math.ceil(length/3.4);i++){
  const z=w.z0+1.7+i*3.4+(row%2?1.1:0);
  if(z>w.z1-.4)continue;
  mesh.box(w.x-.18-(i%3)*.045,.77+row*.78,z,w.width+.3,.62,2.7,[.62,.59,.51],[.76,.72,.63]);
 }
 mesh.box(w.x,2.8,(w.z0+w.z1)/2,w.width+.8,.35,length,[.7,.67,.6]);
 for(let i=0;i<5;i++){
  const z=w.z0+10+i*16,x=w.x+8;
  mesh.box(x,0,z,1.05,5.5,1.05,[.38,.28,.19]);
  mesh.box(x,5.3,z,6.7,4.1,6.7,[.24,.44,.25],[.31,.54,.29]);
  mesh.box(x,9,z,5.3,1.3,5.3,[.27,.48,.28]);
 }
 const bz=w.z0+39,bx=w.x+6;
 mesh.box(bx,.65,bz,3.6,.36,1.2,[.52,.35,.23]);
 mesh.box(bx,1.03,bz+.48,3.6,1.3,.28,[.54,.36,.24]);
 for(const off of [-1.3,1.3])mesh.box(bx+off,0,bz,.25,.8,.9,[.31,.31,.29]);
}

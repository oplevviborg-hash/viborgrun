import {demoStoneWall,at} from './world.js';
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

// NON-SURVEYED, photo/history-inspired facade; only used in the demo map.
export function addCathedralStudy(mesh){
 const d=at('domkirke'),stone=[.68,.67,.62],light=[.81,.79,.71],shadow=[.27,.31,.34];
 mesh.box(d.x,0,d.z-73.2,10.8,13,.7,stone);
 mesh.box(d.x,0,d.z-73.7,5.2,8,.65,shadow);
 for(const x of [-3.25,3.25])mesh.box(d.x+x,0,d.z-74,1.05,9,.9,light);
 mesh.box(d.x,8.2,d.z-74,7.7,1.2,.9,light);
 mesh.box(d.x,10.2,d.z-73.95,5.5,.65,.8,[.54,.52,.47]);
 // Photo-referenced west silhouette: triangular central gable and steep tower pyramids.
 // Dimensions and placement are artistic demo approximations, NOT surveyed OSM heights.
 const front=d.z-74.35;
 mesh.tri([d.x-6.7,13,front],[d.x+6.7,13,front],[d.x,19.8,front],stone);
 // Recessed rose-window impression, framed in stone (low-poly square approximation).
 mesh.box(d.x,15.7,front-.12,2.15,2.15,.16,shadow);
 mesh.box(d.x,15.9,front-.25,1.3,1.3,.12,[.43,.43,.42]);
 for(const dx of [-13,13]){
  const x=d.x+dx,z=d.z-60;
  // Tower caps use four triangular planes instead of a generic gabled roof.
  const e=6.7,y=34.3,tip=[x,43,z];
  mesh.tri([x-e,y,z-e],[x+e,y,z-e],tip,[.33,.38,.43]);
  mesh.tri([x+e,y,z-e],[x+e,y,z+e],tip,[.38,.42,.47]);
  mesh.tri([x+e,y,z+e],[x-e,y,z+e],tip,[.29,.34,.39]);
  mesh.tri([x-e,y,z+e],[x-e,y,z-e],tip,[.36,.40,.45]);
  mesh.box(x,43,z,.18,1.65,.18,[.72,.69,.59]);
  mesh.box(x,44.05,z,.9,.15,.15,[.72,.69,.59]);
 }
 for(const dx of [-13,13]){
  mesh.box(d.x+dx,23,d.z-72.6,13.2,1.1,1.2,light);
  for(const offset of [-2.35,2.35]){
   mesh.box(d.x+dx+offset,26,d.z-73.1,2.5,5.8,.55,shadow);
   mesh.box(d.x+dx+offset,31.7,d.z-73.2,3.3,.65,.8,light);
  }
  for(const edge of [-6.25,6.25])mesh.box(d.x+dx+edge,0,d.z-72.7,.9,33.6,.9,light);
 }
 for(const side of [-1,1])for(let i=0;i<6;i++){
  const z=d.z-34+i*14,x=d.x+side*18.4;
  mesh.box(x,12.5,z,.6,5.7,2.3,shadow);
  mesh.box(x+side*.18,18.4,z,.9,.8,3.2,light);
  mesh.box(x,0,z+5,.85,13,1.4,stone);
 }
}

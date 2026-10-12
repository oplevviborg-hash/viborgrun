import {perspective,lookAt,mul,clamp,hash} from './math.js';
import {addMogensPhotoStudy} from './landmarks.js';
const vs=`attribute vec3 aPos;attribute vec3 aCol;attribute vec3 aNorm;uniform mat4 uVP;varying vec3 vCol;varying vec3 vNorm;varying float vDepth;varying float vHeight;void main(){vec4 q=uVP*vec4(aPos,1.);gl_Position=q;vCol=aCol;vNorm=aNorm;vDepth=q.w;vHeight=aPos.y;}`;
const fs=`precision mediump float;varying vec3 vCol;varying vec3 vNorm;varying float vDepth;varying float vHeight;void main(){vec3 n=normalize(vNorm);vec3 sun=normalize(vec3(-.55,1.15,.25));vec3 sky=normalize(vec3(.2,1.,-.4));float sunShade=max(dot(n,sun),0.0);float skyShade=max(dot(n,sky),0.0);float bounce=max(dot(n,normalize(vec3(.0,-1.,.0))),0.0);float shade=.36+sunShade*.52+skyShade*.14+bounce*.06;shade=floor(shade*5.)/5.;vec3 lit=vCol*shade;float h=clamp(vHeight/42.,0.,1.);lit=mix(lit,lit+vec3(.035,.02,.0),h*.18);vec3 fog=vec3(.66,.78,.82);float f=clamp((vDepth-175.)/700.,0.,.78);gl_FragColor=vec4(mix(lit,fog,f),1.);}`;
function shader(gl,type,source){const sh=gl.createShader(type);gl.shaderSource(sh,source);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(sh));return sh}
export class Renderer{
 constructor(canvas){this.canvas=canvas;const gl=canvas.getContext('webgl',{antialias:true,alpha:false,depth:true,powerPreference:'high-performance'});if(!gl)throw Error('WebGL er ikke tilgængelig.');this.gl=gl;const p=gl.createProgram();gl.attachShader(p,shader(gl,gl.VERTEX_SHADER,vs));gl.attachShader(p,shader(gl,gl.FRAGMENT_SHADER,fs));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));this.program=p;gl.useProgram(p);this.loc={pos:gl.getAttribLocation(p,'aPos'),col:gl.getAttribLocation(p,'aCol'),norm:gl.getAttribLocation(p,'aNorm'),vp:gl.getUniformLocation(p,'uVP')};gl.enable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);this.staticMesh=null;this.dynamicMesh=null;this.resize();window.addEventListener('resize',()=>this.resize());}
 resize(){let scale=Math.max(1,Math.min(1.85,window.devicePixelRatio||1));const w=window.innerWidth,h=window.innerHeight;this.canvas.width=Math.max(320,Math.floor(w*.72*scale));this.canvas.height=Math.max(220,Math.floor(h*.72*scale));this.gl.viewport(0,0,this.canvas.width,this.canvas.height)}
 upload(vertices,old,usage){let gl=this.gl,m=old||{buffer:gl.createBuffer()};gl.bindBuffer(gl.ARRAY_BUFFER,m.buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),usage);m.count=vertices.length/9;return m}
 setWorld(vertices){this.staticMesh=this.upload(vertices,this.staticMesh,this.gl.STATIC_DRAW)}
 render(verts,player,camera,dt=1/60){const gl=this.gl;gl.clearColor(.63,.77,.83,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(this.program);const aspect=this.canvas.width/this.canvas.height;let eye,at,up;if(camera.top){eye=[player.x,240,player.z+.01];at=[player.x,0,player.z];up=[0,0,-1]}else{const d=clamp(camera.zoom||31,16,65),camYaw=camera.yaw;eye=[player.x+Math.sin(camYaw)*d,24+player.y*.45,player.z+Math.cos(camYaw)*d];at=[player.x,4.2+player.y*.6,player.z];up=[0,1,0]}// Spring-follow camera without judder; snap immediately on view-mode changes.
  if(!this.followEye||this.followTop!==camera.top){
   this.followEye=eye.slice();this.followAt=at.slice();this.followTop=camera.top;
  }else{
   const follow=1-Math.exp(-Math.max(0,Math.min(dt,.06))*9.5);
   for(let i=0;i<3;i++){this.followEye[i]+=(eye[i]-this.followEye[i])*follow;this.followAt[i]+=(at[i]-this.followAt[i])*follow}
  }
  let vp=mul(perspective((camera.top?34:60)*Math.PI/180,aspect,.5,1750),lookAt(this.followEye,this.followAt,up));gl.uniformMatrix4fv(this.loc.vp,false,new Float32Array(vp));this.draw(this.staticMesh);this.dynamicMesh=this.upload(verts,this.dynamicMesh,gl.DYNAMIC_DRAW);this.draw(this.dynamicMesh)}
 draw(mesh){if(!mesh||!mesh.count)return;const gl=this.gl,loc=this.loc;gl.bindBuffer(gl.ARRAY_BUFFER,mesh.buffer);gl.vertexAttribPointer(loc.pos,3,gl.FLOAT,false,36,0);gl.vertexAttribPointer(loc.col,3,gl.FLOAT,false,36,12);gl.vertexAttribPointer(loc.norm,3,gl.FLOAT,false,36,24);gl.enableVertexAttribArray(loc.pos);gl.enableVertexAttribArray(loc.col);gl.enableVertexAttribArray(loc.norm);gl.drawArrays(gl.TRIANGLES,0,mesh.count)}
}
export class Mesh{
 constructor(){this.v=[]}
 tri(a,b,c,color){let ux=b[0]-a[0],uy=b[1]-a[1],uz=b[2]-a[2],vx=c[0]-a[0],vy=c[1]-a[1],vz=c[2]-a[2],n=[uy*vz-uz*vy,uz*vx-ux*vz,ux*vy-uy*vx],l=Math.hypot(...n)||1;for(const p of [a,b,c])this.v.push(...p,...color,...n.map(t=>t/l));return this}
 quad(a,b,c,d,color){this.tri(a,b,c,color);this.tri(a,c,d,color);return this}
 box(x,y,z,w,h,d,col,topCol){let x0=x-w/2,x1=x+w/2,y0=y,y1=y+h,z0=z-d/2,z1=z+d/2;let a=[x0,y0,z0],b=[x1,y0,z0],c=[x1,y0,z1],dd=[x0,y0,z1],e=[x0,y1,z0],f=[x1,y1,z0],g=[x1,y1,z1],t=[x0,y1,z1];this.quad(a,b,f,e,col).quad(b,c,g,f,col).quad(c,dd,t,g,col).quad(dd,a,e,t,col).quad(e,f,g,t,topCol||col);return this}
 line(ax,az,bx,bz,width,col,y=.12){let dx=bx-ax,dz=bz-az,L=Math.hypot(dx,dz);if(L<.01)return this;let nx=-dz/L*width*.5,nz=dx/L*width*.5;return this.quad([ax+nx,y,az+nz],[bx+nx,y,bz+nz],[bx-nx,y,bz-nz],[ax-nx,y,az-nz],col)}
 polygonFlat(points,col,y=.1){if(points.length<3)return;for(const tri of triangulate(points))this.tri([tri[0].x,y,tri[0].z],[tri[1].x,y,tri[1].z],[tri[2].x,y,tri[2].z],col);return this}
 polygonBuilding(points,height,col,roof,options={}){
  if(points.length<3)return this;
  const n=points.length,area=points.reduce((v,p,i)=>v+p.x*points[(i+1)%n].z-points[(i+1)%n].x*p.z,0);
  const side=area>=0?1:-1;
  for(let i=0;i<n;i++){
   const a=points[i],b=points[(i+1)%n],dx=b.x-a.x,dz=b.z-a.z,length=Math.hypot(dx,dz);
   this.quad([a.x,0,a.z],[b.x,0,b.z],[b.x,height,b.z],[a.x,height,a.z],col);
   if(!options.detail||length<7||height<6)continue;
   const nx=side*dz/(length||1)*.065,nz=-side*dx/(length||1)*.065;
   const floors=Math.min(3,Math.floor((height-1)/3.5)),count=Math.min(4,Math.max(1,Math.floor(length/5)));
   const frame=options.material==='brick'?[.34,.26,.21]:[.88,.85,.75];
   const glass=[.24,.37,.42],gx=nx*.22,gz=nz*.22;
   for(let row=0;row<floors;row++)for(let k=0;k<count;k++){
    let t=(k+1)/(count+1),cx=a.x+dx*t+nx,cz=a.z+dz*t+nz,y=2.15+row*3.5,halfW=Math.min(1.05,length/(count+1)*.25);
    const xx=dx/length*halfW,zz=dz/length*halfW;
    this.quad([cx-xx,y-.85,cz-zz],[cx+xx,y-.85,cz+zz],[cx+xx,y+.85,cz+zz],[cx-xx,y+.85,cz-zz],frame);
    this.quad([cx-xx*.8+gx,y-.64,cz-zz*.8+gz],[cx+xx*.8+gx,y-.64,cz+zz*.8+gz],[cx+xx*.8+gx,y+.64,cz+zz*.8+gz],[cx-xx*.8+gx,y+.64,cz-zz*.8+gz],glass);
   }
  }
  const slope=Math.min(3.8,Math.max(1.2,height*.19));
  if(n===4&&options.roofShape!=='flat'){
   // Simple pitched roof; the surveyed polygon is untouched, roof rise is artistic.
   const lengths=points.map((p,i)=>Math.hypot(points[(i+1)%4].x-p.x,points[(i+1)%4].z-p.z));
   let p=points;
   if(lengths[0]<lengths[1])p=[points[1],points[2],points[3],points[0]];
   const r1=[(p[0].x+p[3].x)/2,height+slope,(p[0].z+p[3].z)/2];
   const r2=[(p[1].x+p[2].x)/2,height+slope,(p[1].z+p[2].z)/2];
   this.quad([p[0].x,height,p[0].z],[p[1].x,height,p[1].z],r2,r1,roof);
   this.quad([p[3].x,height,p[3].z],[p[2].x,height,p[2].z],r2,r1,roof);
   this.tri([p[0].x,height,p[0].z],r1,[p[3].x,height,p[3].z],col);
   this.tri([p[1].x,height,p[1].z],[p[2].x,height,p[2].z],r2,col);
  }else{
   for(const tri of triangulate(points))this.tri([tri[0].x,height,tri[0].z],[tri[1].x,height,tri[1].z],[tri[2].x,height,tri[2].z],roof);
   if(options.roofShape!=='flat'&&n<=8){
    const cx=points.reduce((a,p)=>a+p.x,0)/n,cz=points.reduce((a,p)=>a+p.z,0)/n;
    for(let i=0;i<n;i++){
     const a=points[i],b=points[(i+1)%n];
     this.tri([a.x,height+.03,a.z],[b.x,height+.03,b.z],[cx,height+slope,cz],roof)
    }
   }
  }
  return this
 }
}
export function triangulate(poly){if(poly.length<3)return [];let a=poly.slice();if(a.length>3&&a[0].x===a[a.length-1].x&&a[0].z===a[a.length-1].z)a.pop();if(a.length<3)return [];let area=0;for(let i=0;i<a.length;i++){const p=a[i],q=a[(i+1)%a.length];area+=p.x*q.z-q.x*p.z}let dir=area>=0?1:-1,inds=a.map((_,i)=>i),out=[],iter=0;function cross(u,v,w){return (v.x-u.x)*(w.z-u.z)-(v.z-u.z)*(w.x-u.x)}function inside(p,u,v,w){let p1=cross(u,v,p)*dir,p2=cross(v,w,p)*dir,p3=cross(w,u,p)*dir;return p1>=0&&p2>=0&&p3>=0}while(inds.length>3&&iter++<a.length*a.length){let done=false;for(let i=0;i<inds.length;i++){let i0=inds[(i+inds.length-1)%inds.length],i1=inds[i],i2=inds[(i+1)%inds.length],u=a[i0],v=a[i1],w=a[i2];if(cross(u,v,w)*dir<=.00001)continue;let has=false;for(const k of inds){if(k!==i0&&k!==i1&&k!==i2&&inside(a[k],u,v,w)){has=true;break}}if(has)continue;out.push([u,v,w]);inds.splice(i,1);done=true;break}if(!done)break}if(inds.length===3)out.push([a[inds[0]],a[inds[1]],a[inds[2]]]);return out}
export function palette(id){const colors=[[.74,.6,.5],[.82,.76,.62],[.66,.58,.54],[.7,.68,.58],[.86,.76,.68],[.72,.61,.52]],r=[[.56,.26,.18],[.71,.34,.22],[.43,.36,.38],[.46,.29,.24]];return {walls:colors[hash(id)%colors.length],roof:r[hash(id+17)%r.length]}}
export function makeCityMesh(data){const m=new Mesh();m.box(0,-2,0,2100,2,2100,[.39,.56,.39],[.51,.65,.47]);const roads=data.roads||[],areas=data.areas||[],buildings=data.buildings||[];
 for(const area of areas){let col=area.type==='water'?[.22,.5,.64]:area.type==='park'?[.3,.59,.34]:area.type==='square'?[.56,.51,.45]:area.type==='green'?[.43,.58,.39]:[.37,.53,.36];m.polygonFlat(area.points,col,area.type==='water'?.1:.07)}
 let marks=0;
 for(const road of roads){
  const width=road.width||5,walk=['footway','pedestrian','path','steps','cycleway'].includes(road.kind);
  const paved=/paving_stones|sett|cobblestone|unhewn_cobblestone|bricks/i.test(road.surface||'');
  const roadColor=walk||paved?[.66,.61,.52]:width>=11?[.4,.41,.4]:width>=9?[.45,.45,.43]:[.49,.48,.45];
  for(let i=1;i<road.points.length;i++){
   const a=road.points[i-1],b=road.points[i],length=Math.hypot(b.x-a.x,b.z-a.z);
   if(length<.01)continue;
   if(!walk&&width>=5)m.line(a.x,a.z,b.x,b.z,width+2.1,[.67,.65,.59],.115);
   m.line(a.x,a.z,b.x,b.z,width,roadColor,.16);
   if((paved||road.kind==='pedestrian')&&Math.hypot(a.x,a.z)<350&&Math.hypot(b.x,b.z)<350){const dx=b.x-a.x,dz=b.z-a.z,nx=-dz/length,nz=dx/length;for(const side of [-1,1])m.line(a.x+nx*width*.47*side,a.z+nz*width*.47*side,b.x+nx*width*.47*side,b.z+nz*width*.47*side,.18,[.81,.75,.63],.19)}
   if(!walk&&width>=8&&marks<1400){
    for(let t=7;t<length-3&&marks<1400;t+=15){
     const t2=Math.min(length-1,t+3),x1=a.x+(b.x-a.x)*t/length,z1=a.z+(b.z-a.z)*t/length,x2=a.x+(b.x-a.x)*t2/length,z2=a.z+(b.z-a.z)*t2/length;
     m.line(x1,z1,x2,z2,.22,[.83,.78,.61],.18);marks++;
    }
   }
  }
 }
 for(const b of buildings){
  const c=palette(b.id),centre=b.cx!==undefined?{x:b.cx,z:b.cz}:{x:b.points.reduce((a,p)=>a+p.x,0)/b.points.length,z:b.points.reduce((a,p)=>a+p.z,0)/b.points.length};
  const detailed=Math.hypot(centre.x,centre.z)<340;
  // Honour available OSM material information. Otherwise use a stable low-poly palette.
  const walls=b.material==='brick'?[.61,.35,.29]:b.material==='stone'?[.67,.66,.61]:b.material==='wood'?[.69,.49,.34]:c.walls;
  m.polygonBuilding(b.points,b.height,walls,c.roof,{detail:detailed,material:b.material,roofShape:b.roofShape});
 }
 if(data.source==='demo')addMogensPhotoStudy(m);
 return m.v}
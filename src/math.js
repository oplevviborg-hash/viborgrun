export const ORIGIN={lat:56.45051,lon:9.41248};
const MX=111320*Math.cos(ORIGIN.lat*Math.PI/180), MZ=111320;
export function fromGeo(lat,lon){return {x:(lon-ORIGIN.lon)*MX,z:(ORIGIN.lat-lat)*MZ}}
export function toGeo(x,z){return {lat:ORIGIN.lat-z/MZ,lon:ORIGIN.lon+x/MX}}
export function clamp(x,a,b){return Math.max(a,Math.min(b,x))}
export function dist(a,b){return Math.hypot(a.x-b.x,a.z-b.z)}
export function pointInPoly(p,poly){let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a.z>p.z)!==(b.z>p.z)&&p.x<(b.x-a.x)*(p.z-a.z)/(b.z-a.z)+a.x)inside=!inside}return inside}
export function hash(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
export function perspective(fov,asp,near,far){let f=1/Math.tan(fov/2),nf=1/(near-far);return [f/asp,0,0,0,0,f,0,0,0,0,(far+near)*nf,-1,0,0,2*far*near*nf,0]}
export function lookAt(eye,center,up){let z=norm(sub(eye,center)),x=norm(cross(up,z)),y=cross(z,x);return [x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,eye),-dot(y,eye),-dot(z,eye),1]}
export function mul(a,b){let c=new Array(16).fill(0);for(let j=0;j<4;j++)for(let i=0;i<4;i++)for(let k=0;k<4;k++)c[i+j*4]+=a[i+k*4]*b[k+j*4];return c}
function dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]}function sub(a,b){return a.map((v,i)=>v-b[i])}function cross(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]}function norm(a){let d=Math.hypot(...a)||1;return a.map(v=>v/d)}

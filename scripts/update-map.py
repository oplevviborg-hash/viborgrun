#!/usr/bin/env python3
"""Fetch reproducible OSM geometry in central Viborg into assets/map/city.json.
No paid API key; run on GitHub Actions. If unavailable, retain schematic demo.
Licensing: OpenStreetMap ODbL (www.openstreetmap.org/copyright).
"""
import json, os, pathlib, time, urllib.parse, urllib.request, datetime, math, sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
DEST=ROOT/'assets'/'map'/'city.json'
# Limit initial gameplay extent to the 1.3 x 1.3 km historical core and park.
# Future area expansion: split into spatial tiles, don't expand one Overpass query indefinitely.
S,W,N,E = 56.4455,9.4010,56.4570,9.4255
LAT0,LON0=56.45051,9.41248
XM=111320*math.cos(math.radians(LAT0));ZM=111320
QUERY=f'''[out:json][timeout:80];(
 way["building"]({S},{W},{N},{E});
 way["highway"]({S},{W},{N},{E});
 way["natural"="water"]({S},{W},{N},{E});
 way["waterway"="riverbank"]({S},{W},{N},{E});
 way["leisure"="park"]({S},{W},{N},{E});
 way["landuse"~"grass|forest|meadow"]({S},{W},{N},{E});
);out geom;'''
ENDPOINTS=['https://overpass.kumi.systems/api/interpreter','https://overpass.nchc.org.tw/api/interpreter','https://overpass-api.de/api/interpreter']
def fetch():
    for endpoint in ENDPOINTS:
        try:
            print('Trying OSM:',endpoint,flush=True)
            data=urllib.parse.urlencode({'data':QUERY}).encode()
            req=urllib.request.Request(endpoint,data=data,headers={'User-Agent':'Viborg96-educational-game/0.1 (github-pages; OSM-ODbL)','Accept':'application/json'})
            with urllib.request.urlopen(req,timeout=105) as r:
                if r.status!=200: raise ValueError(f'HTTP {r.status}')
                res=r.read(32_000_000)
            obj=json.loads(res)
            if len(obj.get('elements',[]))<20: raise ValueError('Unexpectedly few features')
            return obj
        except Exception as exc:print('Fetch failed:',exc,file=sys.stderr,flush=True)
    raise RuntimeError('All OSM endpoints failed; keeping fallback demo')
def xy(c):return {'x':round((c['lon']-LON0)*XM,2),'z':round((LAT0-c['lat'])*ZM,2)}
def points(elem):
    arr=[xy(p) for p in elem.get('geometry',[])]
    return [p for i,p in enumerate(arr) if not i or p!=arr[i-1]]
def meters_height(tags,ident):
    try:
        v=tags.get('height','').split(' ')[0].replace('m','').replace(',','.')
        n=float(v)
        if 2<n<90:return n
    except ValueError:pass
    try:
        n=float(tags.get('building:levels',''))*3.15+1.1
        if 2<n<90:return n
    except ValueError:pass
    return 7+(ident%14)
def main():
    osm=fetch();buildings=[];roads=[];areas=[]
    for e in osm['elements']:
        if e['type']!='way':continue
        tags=e.get('tags',{});pts=points(e)
        if len(pts)<2:continue
        ident=e['id']
        if 'building' in tags and len(pts)>=4:
            if pts[0]==pts[-1]:pts=pts[:-1]
            if len(pts)>90:pts=pts[::max(1,len(pts)//90)]
            buildings.append({'id':str(ident),'height':round(meters_height(tags,ident),1),'points':pts,
            'cx':round(sum(p['x'] for p in pts)/len(pts),1),'cz':round(sum(p['z'] for p in pts)/len(pts),1),
            'name':tags.get('name',''), 'material':tags.get('building:material','').lower(),
            'roofShape':tags.get('roof:shape','').lower(), 'heightSource':'tagged' if tags.get('height') or tags.get('building:levels') else 'estimated'})
        elif 'highway' in tags:
            t=tags['highway'];width={'motorway':14,'trunk':12,'primary':11,'secondary':9,'tertiary':8,'residential':6,'unclassified':6,'service':4,'living_street':6,'pedestrian':8,'footway':2.3,'path':2,'cycleway':2,'steps':2.5}.get(t,4)
            roads.append({'id':str(ident),'width':width,'points':pts,'kind':t,'name':tags.get('name','')})
        elif len(pts)>=4 and any(k in tags for k in ('natural','leisure','landuse','waterway')):
            if pts[0]!=pts[-1]:continue
            pts=pts[:-1];kind='water' if tags.get('natural')=='water' or tags.get('waterway')=='riverbank' else 'park'
            if len(pts)>250:pts=pts[::max(1,len(pts)//250)]
            areas.append({'id':str(ident),'type':kind,'name':tags.get('name',''),'points':pts})
    result={'source':'osm','label':'OpenStreetMap-geometri, ikke komplet 3D-verificeret',
        'generated':datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d UTC'),
        'bbox':[S,W,N,E], 'attribution':'© OpenStreetMap contributors · ODbL',
        'buildings':buildings,'roads':roads,'areas':areas}
    if not buildings or not roads:raise RuntimeError('No buildings or roads downloaded; keeping demo')
    DEST.parent.mkdir(parents=True,exist_ok=True)
    DEST.write_text(json.dumps(result,ensure_ascii=False,separators=(',',':')),encoding='utf8')
    print(f'Written {DEST}: buildings={len(buildings)}, roads={len(roads)}, areas={len(areas)}; {DEST.stat().st_size/1e6:.1f} MB')
if __name__=='__main__':main()

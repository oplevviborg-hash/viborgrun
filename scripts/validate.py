#!/usr/bin/env python3
"""Static contract checks for a GitHub Pages deploy; stdlib only."""
from pathlib import Path
import json,sys,subprocess
root=Path(__file__).resolve().parents[1]
required=['index.html','src/main.js','src/gameplay.js','src/renderer.js','src/world.js','src/math.js','src/style.css','assets/map/city.json','.github/workflows/pages.yml','.nojekyll']
errors=[]
for rel in required:
 if not (root/rel).exists():errors.append('MISSING '+rel)
p=root/'assets/map/city.json'
if p.exists():
 try:
  d=json.loads(p.read_text(encoding='utf8'))
  if d.get('source') not in ('demo','osm'):errors.append('Wrong map source')
  for key in ('buildings','roads','areas'):
   if not isinstance(d.get(key),list):errors.append('Missing '+key)
  for obj in d.get('buildings',[]):
   if len(obj.get('points',[]))<3:errors.append('Short footprint '+str(obj.get('id')))
   if not isinstance(obj.get('height'),(int,float)) or obj['height']<=0:errors.append('Bad building height')
  for obj in d.get('roads',[]):
   if len(obj.get('points',[]))<2:errors.append('Short road')
  print('Map:',d.get('source'),'buildings',len(d.get('buildings',[])),'roads',len(d.get('roads',[])),'areas',len(d.get('areas',[])))
 except Exception as e:errors.append('JSON parse error '+str(e))
# Run the offline OSM importer contract as part of both pre- and post-import CI validation.
offline=root/'tests/map_import.py'
if offline.exists():
 try:
  check=subprocess.run([sys.executable,str(offline)],capture_output=True,text=True,timeout=25)
  if check.returncode:errors.append('Offline OSM import: '+(check.stderr or check.stdout).strip())
  else:print(check.stdout.strip())
 except Exception as e:errors.append('Offline OSM import failed: '+str(e))
print('VALIDATION:', 'PASS' if not errors else 'FAIL\n'+'\n'.join(errors))
sys.exit(bool(errors))

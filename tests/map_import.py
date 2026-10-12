"""Offline test of Overpass-to-JSON transformation, without network."""
import importlib.util, pathlib, tempfile, json
p=pathlib.Path(__file__).resolve().parents[1]/'scripts'/'update-map.py'
spec=importlib.util.spec_from_file_location('viborg_map_import',p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
geom=[{'lat':56.4504,'lon':9.4111},{'lat':56.4504,'lon':9.4112},{'lat':56.4505,'lon':9.4112},{'lat':56.4504,'lon':9.4111}]
mock={'elements':[{'type':'way','id':123,'tags':{'building':'yes','building:levels':'3','name':'Testbygning'},'geometry':geom},{'type':'way','id':456,'tags':{'highway':'residential','name':'Testgade','surface':'paving_stones','width':'7.5'},'geometry':geom[:3]},{'type':'node','id':789,'tags':{'historic':'memorial','name':'Prøvemindesmærke'},'lat':56.4506,'lon':9.4123}]}
mock['elements'].extend([
 {'type':'way','id':124,'tags':{'building':'yes','height':'0','building:levels':'n/a'},'geometry':geom},
 {'type':'way','id':125,'tags':{'leisure':'park','name':'Testparken'},'geometry':geom}
])
m.fetch=lambda:mock
with tempfile.TemporaryDirectory() as d:
 m.DEST=pathlib.Path(d)/'city.json';m.main();result=json.loads(m.DEST.read_text());assert result['source']=='osm';assert len(result['buildings'])==2;assert len(result['roads'])==1;assert result['buildings'][0]['height']>9;assert result['buildings'][0]['heightSource']=='levels-estimate';assert result['buildings'][1]['heightSource']=='artistic-estimate';assert result['roads'][0]['width']==7.5;assert result['roads'][0]['widthSource']=='osm-width-tag';assert result['roads'][0]['geometrySource']=='osm-way';assert result['roads'][0]['surface']=='paving_stones';assert result['buildings'][0]['geometrySource']=='osm-way';assert any(x['name']=='Testbygning' and x['source']=='osm-way-centroid' for x in result['landmarks']);assert any(x['name']=='Prøvemindesmærke' and x['source']=='osm-node' for x in result['landmarks']);assert any(x['name']=='Testparken' and x['source']=='osm-way-centroid' for x in result['landmarks']);assert all(a['geometrySource']=='osm-way' for a in result['areas'])
print('OFFLINE MAP IMPORT: PASS')

# 03 · Teknisk arkitektur og systemkontrakter

## Teknologivalg

**Prototype:** HTML5, CSS, ECMAScript-moduler, WebGL 1, Canvas 2D, Python 3.12 kun i GitHub Actions. Ingen runtime npm-pakker, ingen private API-nøgler og ingen server. Assets er GeoJSON-lignende komprimerbar JSON, som GitHub Pages kan hoste direkte.

**Produktionsretning:** Behold den data- og content-drevne model. Evaluér en erfaren WebGL-spilmotor (fx Three.js eller Babylon.js) på faktiske benchmarkdata, inden teamet binder 20 mennesker til et nyt rendererfundament. Prototypens egen renderer er lille og uddannelsesegnet, men mangler instancing, skygger, occlusion, animationssystem, scene graph og kamera-collision. Et bevidst fremtidigt engineskifte er tilladt bag adapterinterfacet `WorldRenderer`.

**Arkitektur**

```text
                  GitHub repository (versionsstyret)
                        |
               GitHub Actions på push
                        |
    scripts/update-map.py -- OSM Overpass API
                        |
             assets/map/city.json [OSM eller DEMO]
                        |
                  GitHub Pages (CDN)
                        |
              https://.../index.html
                        |
                  ECMAScript-moduler
       +----------------+----------------+
       |                |                |
      Game            World            Renderer
   quests/save   positions/collision    WebGL 3D
       |                |                |
      UI ---------------+-------------- minimap
```

## Vigtige filkontrakter

- `src/main.js`: input, UI, tidsloop og WebGL-kald. Må ikke eje geografiske koordinater.
- `src/math.js`: geo→meter, matrix, vektorer. Positionens z-akse går mod syd, x-akse mod øst. Byens lokale nulpunkt er Domkirkens referencekoordinat `lat=56.45051, lon=9.41248`.
- `src/world.js`: geodatakilde, bevægelsesblokering, fallback, navngivne steder. Alle positions- og collisionfunktioner går gennem dette lag.
- `src/gameplay.js`: questtilstand og entitetsinteraktion. Ingen DOM, WebGL eller kort-API-kald her.
- `src/renderer.js`: GL-shaders og dynamiske/statiske meshes. Må ikke kende questlogik eller geodatalicens.
- `assets/map/city.json`: statisk geometri. Skal altid have `source`, `buildings`, `roads`, `areas`; OSM-kilde får metadata.
- `scripts/update-map.py`: build-only netværksklient. Ingen browser-overpasskald for at undgå tredjeparts-CORS og usikre kvoter under gameplay.

## Geografisk koordinatsystem

Indlæs WGS84-koordinater fra kilden. Konvertér **før** rendering fra geografiske grader til lokale meter via lokal tangentplan-approksimation:

```
x = (lon - lon0) * 111320 * cos(lat0 * π/180)
z = (lat0 - lat) * 111320
y = terrænhøjde(m) + lokal højde(m)
```

Approksimationen er acceptabel som prototype omkring bymidten, men ikke som formel landmålertransformering på tværs af hele byen. I produktion konverteres datasæt til ensartet projektion, fx ETRS89 / UTM zone 32N (EPSG:25832), med dokumenteret pipeline og præcisionskontrol. Rendermotoren bruger lokale chunks med forskudt origin for at begrænse flydekommafejl. Enheden i fysikmotoren er meter.

## Datamodel, aktuel prototype

```json
{
  "source": "osm",
  "generated": "YYYY-MM-DD UTC",
  "bbox": [56.4455, 9.401, 56.457, 9.4255],
  "attribution": "© OpenStreetMap contributors · ODbL",
  "buildings": [
    {"id":"osm-way-id", "height":11.2, "cx":32, "cz":-6,
     "points":[{"x":1,"z":2},{"x":11,"z":2},{"x":11,"z":12}]}
  ],
  "roads": [
    {"id":"osm-way-id", "kind":"residential", "name":"Navn", "width":6,
     "points":[{"x":1,"z":2},{"x":15,"z":20}]}
  ],
  "areas": [{"id":"osm-way-id", "type":"park", "points":[{"x":1,"z":2}]}]
}
```

**Vigtigt:** OSM-bygningspolygoner kan omfatte gårde/huller, multipolygonrelationer, broer og komplekse områder. MVP-parseren håndterer kun simple ways og simple polygoner. Parserens resultat er derfor **ikke** en fuld korrekt geometridatabase.

## Spilcontent: version 1 for produktion

```json
{
  "id":"Q_MAIN_011",
  "title":"De tre klokkeslag",
  "district_id":"D_CATHEDRAL",
  "required_flags":["Q_MAIN_010.complete"],
  "steps":[{"verb":"interact","target_id":"BELL_NORTH","count":1}],
  "rewards":[{"type":"flag","id":"heard_bell_north"}],
  "strings":{"da":{"brief":"Find klokken i nord."}},
  "hints":["Hør efter klangen.","Se ved murene."],
  "fallback_target_id":"BELL_BACKUP",
  "qa":{"walkable":true,"restartable":true,"no_deadlock":true}
}
```

Data skemavalideres i CI. Alle content-ID'er er stabile og må ikke genbruges. Dialogtekst må aldrig skjule gameplaylogik i fritekst; den udløser deklarerede events.

## Renderpipeline i produktion

1. Geo import fra godkendte kilder.
2. Vejkorridorer, bygningspolygoner, terræn, vand, træer og fortove normaliseres.
3. Chunk-inddeling: anbefalet 128×128 eller 256×256 m efter benchmarks.
4. Hver chunk opdeles i LOD0/LOD1/LOD2 plus collision mesh. OSM-geometri caches som binære meshes med versioneret format.
5. Instancér ensartede detaljer, tegn kun det synlige kamerafelt, cull skjulte bagflader, lod komplekse facader ned.
6. Udpeg scene-specifikke lyszoner og dynamiske figurer. Bevar retro-udtryk med nearest-neighbor low-res render target og quantized light.
7. Vand som flad/bølgende shader, korrekt afgrænset; trapper og broer som selvstændig passability-klasse.

MVP'en har hverken chunks, LOD, culling, avanceret collision eller højdemodel. De er konkrete produktionsopgaver, ikke implementerede funktioner.

## Fysik og navigation i produktion

Fast simuleringsstep 60 Hz. Capsule-controller (radius ca. 0,35 m, højde 1,7 m), kontakt med terræn, step-up 0,3 m, begrænset skråning, collision med arkitektur. Dynamiske objekter håndteres som egne bodies. Brug navigation mesh pr. chunk med eksplicitte links for trapper, døre, spring og ensrettede passager. NPC'er behøver ikke løse fuld ruteplanlægning gennem hele byen på én gang; gadegraph og lokalt navmesh kombineres.

**Quest-sikkerhed:** Ingen obligatorisk trigger eller NPC må placeres, hvor den kan ligge inden i mur, vand eller ikke-spilbar privat gård. Content-build skal beregne walkable nærmeste position og generere QA-fejl ved uoverensstemmelser, ikke flytte placeringen stiltiende uden rapport.

## Statusmodel

`BOOT → MENU → PLAY → PAUSE / DIALOG / INVENTORY / MAP → PLAY → EPILOG`.

- `Gameplay` er autoritativ tilstand. UI læser den, ændrer den ikke uautoriseret.
- Status transitions er atomiske og bør logges i udviklerværktøjer.
- Checkpoints er versionerede og testes imod migrationsrutiner.
- Ved korrupt save skal game kunne reparere eller tilbyde at starte på ny uden blank skærm.

## Browser- og enhedskrav

Mål: de seneste to hovedversioner af Chrome, Firefox, Edge og Safari, desktop og mobil. WebGL-context-lost skal håndteres ved genstart af shader-ressourcer. Reduced-motion og UI-skala skal understøttes. Graphics quality Auto/Low/Medium/High. Memory og performance skal måles på en almindelig midrange-laptop og en 3-4 år gammel telefon, ikke kun udviklernes stærke maskiner.

## Sikkerhed, drift og privatliv

Ingen konto, analytics eller cookies som standard. Kun `localStorage` til gemmefiler; det er lokal lagring, og der skal informeres tydeligt om dens formål. Ingen følsomme persondata nødvendige. Brug restriktiv CSP hvis eksterne ressourcer tillades. Ingen brugerinput bør evalueres som kode. Remote content fra geodatatjenester skal valideres før publicering. OSM-tekst skal HTML-escapes ved visning. GitHub Pages kan udgives offentligt også fra visse private repositories: læg aldrig hemmeligheder i kildekode eller statiske assets.

## Bygge- og releasekontrakt

På `push main`: hent OSM, valider JSON, generér artefakt, deploy. Hvis OSM fejler, må CI ikke udgive *stiltiende som sand kortdata*. MVP falder tydeligt tilbage til DEMO. Fuldt spil må derimod kræve en allerede godkendt og versioneret seneste kortpakke, så et netværksnedbrud ikke skifter hele bykortet til en skematisk fantasiby.

## Tekniske risici

- **Datahuller:** OSM dækker ikke alle byggehøjder og niveauer. Mitigation: GeoDanmark/terrændata, særskilte manuelle overrides og stikprøveaudits.
- **Store geometrier:** Hele byen som ét mesh kan fryse browseren. Mitigation: streaming og LOD, først implementeret i produktionsfasen.
- **Overpass-tilgængelighed:** Tjenesten er en ekstern best-effort kilde. Mitigation: versioneret kortpakke i repository, flere endpoints og checksums.
- **WebGL-kontekst:** Mobilen kan afbryde context. Mitigation: geninitialisering, reduceret RAM-brug, flyt ressourcer til GPU batches.
- **Kamera i tætte gader:** Kamera kan befinde sig i en mur. Mitigation: sweep mod collisionmesh, alternative vinkler og auto-zoom.
- **Licens:** Uklart ejerskab til facader og foto. Mitigation: kun originale modeller og godkendte kilder; licensregister for samtlige assets.

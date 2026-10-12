# VIBORG 96 · KOMPLET PROJEKTBESKRIVELSE

**Projektvision, design, udviklingsspecifikation, geodata, produktionsplan, kvalitet og udgivelse.**  
**Arbejdsgrundlag for 20-personers team · Version 0.1 · 12. oktober 2026.**

Dette dokument samler alle design- og tekniske dokumenter. Spilkoden leveres separat i samme ZIP-projekt. Prototypen er spilbar som en browserapp, men den fulde by, realtidsvalideret 3D-model, højdeopmåling og de fleste quests er endnu ikke produceret. OSM-geometri skal importeres i en online GitHub Actions-kørsel; ved fejl viser programmet en eksplicit skematisk demo.

## Indhold

1. 01-VISION-OG-KRAV
2. 02-GAME-DESIGN-DOCUMENT
3. 03-TEKNISK-ARKITEKTUR
4. 04-GEODATA-OG-VALIDERING
5. 05-WORLD-BIBLE-OG-QUESTS
6. 06-ART-BIBLE
7. 07-PRODUKTIONSPLAN
8. 08-TEST-OG-RELEASE
9. 09-KILDER-OG-BESLUTNINGER

---

# 01 · Vision, produktkrav og afgrænsning

**Arbejdstitel:** VIBORG 96: Byens hemmelighed  
**Kreativ præmis:** Et 90'er-inspireret 3D-action-adventure, der *ser ud*, som om det blev genudgivet på nettet i 2016.  
**Målgruppe:** 10+ år, lokale og ikke-lokale, casual eventyrspillere, retrospillere, nysgerrige borgere; senere mulighed for museums- og skoleforløb, men undervisning er ikke kerneproduktet.

## Elevatorpitch

Viborg er en åben spilverden. Man kan genkende de rigtige gader og torve, men opdage en hemmelig fortælling gennem mærkelige opgaver, levende borgere, morsomme skjulesteder og krævende små gåder. Spilleren udforsker byen i 3D som i et klassisk platform-adventure, og skifter ubesværet til et top-down-kort, når navigation og planlægning er vigtigere end spring. Grafikken er bevidst enkel, men verden skal være sammenhængende, levende, morsom og overraskende.

## Designpiller (skal aldrig ofres)

**1. Den ægte by.** Viborgs veje og bygningsplaceringer stammer fra verificerbare geodata. Hvert spilobjekt har en entydig placering og en angiven sandhedsgrad. Et torv må gøres mere *læsbart* med tydelig tekstur og kontrast, men den geografiske topologi må ikke manipuleres i »kortkorrekt tilstand«.

**2. Sjov ved hvert hjørne.** Inden for 30 sekunders udforskning skal spilleren se noget, der vækker nysgerrighed: en NPC, et samleobjekt, et sted, man kan hoppe op, en skjult genvej, en samtale, en gåde eller en belønning. Tomme kilometer er ikke en dyd i et computerspil.

**3. Gennemskuelig retrofysik.** Enkle inputs med præcise regler. Spilleren lærer selv bevægelse, spring, angreb og interaktion inden for de første fem minutter.

**4. Frihed uden forvirring.** Spilleren kan frit afvige fra hovedhistorien, men altid gense næste mål i HUD, kort og journal. Questlog må aldrig være nødvendig for at forstå basal navigation.

**5. Fair spil og fair historiefortælling.** Hovedhistorien er fiktiv. Virkelige historiske fakta skal faktatjekkes og mærkes som fakta, mens sagn og fortællinger identificeres som netop det.

## Hvad der skal leveres

### A. Spilbar teknisk prototype (medfølger ZIP)
- Start- og pausemenu, 3D-kamera, top-down-kamera, collision, hop, angreb, karakter, NPC-dialog, samleobjekter, quests, inventar, minikort, auto-save.
- Kortimport for aktuelle OSM-veje og bygningskonturer i et afgrænset midtbyområde.
- Fallback-scenarie, der er brugbart til kontroltest, men **ikke** fremstilles som kortkorrekt.
- Direkte GitHub Pages-udgivelse, uden lokale byggeprogrammer.

### B. Vertical slice (første betalte produktionsmilepæl)
- 400 × 600 m af Domkirkekvarteret i kvalitet svarende til final release.
- Verificerede veje, bygningskonturer, facader for de vigtigste 20 bygninger, terræn, trapper og gennemgange.
- 8-12 NPC'er; 3-5 quests; 2 nye interaktive systemer; komplet audio; 20 minutters konsekvent god gameplay.
- 2 kameraer; keyboard, gamepad og mobilstyring; QA-testet; skærmlæsbar brugerflade.

### C. Fuldt spil (team på 20)
- Byens sammenhængende spilbare område klart fastlagt ved grænsepolygon og data-version.
- 6 distrikter, 1 hovedfortælling i 5 akter, 30+ håndlavede quests, 60+ mindre fund/hemmeligheder, 35+ NPC'er og 6-8 timers primær spilletid.
- Gennemspilbar start til slut uden deadlocks, interaktions-, kæmpe- og puzzle-system, velfungerende lyd og grafik.
- Kortdata klarer særskilt nøjagtighedsgodkendelse; performancekrav; fuld testpakke.

## Definition af »hele Viborg«

Indtil produktansvarlig har godkendt en geografisk polygon og en præcis tidsreference, betyder »hele byen« **ikke en teknisk specifikation**. For et team skal det være et målbart scope. Forslag til faser:

- **Spilleverden A:** Historisk midtby, Domkirken, Gammeltorv, Nytorv, Sct. Mogens Gade, Borgvold og relevante forbindelser.
- **Spilleverden B:** De sammenhængende ruter langs Nørresø og Søndersø samt byområder omkring centrum, verificeret i en ny polygon.
- **Spilleverden C:** Hele sammenhængende Viborg byområde, defineret ved officiel byafgrænsning, og eventuelt ekspansion til opland senere.

Dette må ikke hemmeligt reduceres til fire gader. Hvis fuldbyens geografiske omfang vedtages, skal teamet have ressourcer til streaming, tile-inddeling, landmåling, bygninger og navigation i tilsvarende skala.

## Produktkrav (nummererede og testbare)

| ID | Prioritet | Krav | Godkendelsestest |
|---|---|---|---|
| P-01 | MUST | Spillet indlæses via HTTPS på GitHub Pages | Åbn URL i Chrome, Firefox, Safari |
| P-02 | MUST | 3D-verden med x, y, z og dybdetest | Spilleren kan ses bag/foran bygningsdele |
| P-03 | MUST | Top-down bruger samme verdenskoordinater | Skift under bevægelse uden teleport |
| P-04 | MUST | Geografi stammer fra versionerede data | Enhver vej kan spores til geodata-ID |
| P-05 | MUST | Lokal gemmefunktion | Luk og genåbn: queststatus bevares |
| P-06 | MUST | Keyboardstyring uden mus | Gennemfør hovedquest via tastatur |
| P-07 | MUST | Fungerer på mobil | Test på repræsentative 2024-2026 mobilmodeller |
| P-08 | MUST | OSM-attribution og ODbL-link | Kildekredit synlig i spil |
| P-09 | MUST | Collision med byggemasse og vand | Ingen væg-gennemtrængning ved almindelig bevægelse |
| P-10 | MUST | Feedback på alle interaktioner | Tastetryk giver relevant svar |
| P-11 | MUST | Quests kan afsluttes i korrekt rækkefølge | Automatiseret tilstandstest |
| P-12 | SHOULD | 6+ timer samlet indhold | Testspilleres gennemførselstid |
| P-13 | SHOULD | 30+ unikke quests | Questregister + spillede testforløb |
| P-14 | SHOULD | Gamepad-understøttelse | Xbox/PlayStation-controller QA |
| P-15 | SHOULD | Fuldt verificeret byterræn | Geodata-kontroller og ruteaudits |
| P-16 | COULD | Valgfri historisk geodataversion 2016 | Sammenligning af snapshot/versionsdata |

## Ikke-mål

- Multiplayer, abonnement, økonomi, lootbox, reklamer eller konto.
- Vold mod realistiske borgere. Slag bruges på ufarlige fantasyobjekter og mekaniske forhindringer.
- En bilsimulator eller GTA-kopi.
- Generativ AI-dialog i produktion: dialog skal være skrevet, testet og lokaliserbar.
- Fotorealisme. Den ville undergrave både retrotonen og browserkravene.

## Succesdefinition

En lokal spiller kan uden instruktion genkende udvalgte byrum, forstå bevægelse på under 2 minutter, gennemføre første quest på under 5 minutter og frivilligt gå uden for hovedruten. En ikke-lokal spiller kan finde vej uden kendskab til Viborg. Testpaneler forstår forskellen mellem virkelige steder og fiktive spilbegivenheder.


---

# 02 · Game Design Document (GDD)

## Genre og kameramodel

Tredjepersons action-adventure / platformspil / narrativt puzzle-spil. Inspirationsfamilie: Super Mario 64, Banjo-Kazooie, Zelda: Ocarina of Time, tidlige PlayStation-adventures, men **ingen** genbrug af beskyttede figurer, lyde, level-layouts eller branding.

Kameratilstand 1: Tredjeperson med lavt kamera, 25-40 m fra figurens referencepunkt i den fulde produktion, smidig auto-rotation og manuel justering. Kameraet kolliderer med verden og undgår husmure. Kameratilstand 2: Top-down, der peger mod nord, med frit zoom i defineret højdeinterval. Begge styres af samme spillerfysik og questlogik. Skift knappen `V` er øjeblikkeligt, men interpoleret over 250 ms i fuld udgave.

## Spillerens verbs

`Løb` (3-7 m/s), `sprint` (7-10 m/s, ingen stamina i første udgave), `hop` (tydelig bue), `dobbelt-hop` (måske, ikke standard), `kravl op` (markerede opgange), `interagér`, `skub`, `bær`, `kast`, `slå`, `undersøg`, `kombinér ting`, `tal`, `vis genstand`, `lyt`, `aktivér`, `læse`.

**Fælles logik:** Spilleren skal intuitivt forstå, hvad der kan påvirkes. Gule genstande kan samles, grønne kan tale, røde glimt kan ødelægges/aktiveres, blå markører kan undersøges. Farve må ikke være eneste signal: form, symbol og lyd skal også skelne.

## Bevægelse og fysik

| Parameter | Prototype | Mål i fuldt spil |
|---|---:|---:|
| Løbehastighed | 6,7 m/s | 5,5 m/s standard, justeres via test |
| Sprint | 11 m/s | 8,0 m/s |
| Gravitation | 25 m/s² | 22 m/s² |
| Hop | 10,5 m/s vertikal impuls | 9,0 m/s |
| Interaktionsradius | 8 m | 2,5 m, med konisk måludvælgelse |
| Slagradius | 10 m | 2,0 m og fremadrettet kegle |
| Kamera | Fast chase / top-down | Dæmpet follow, vægge og fri zoom |
| Fysikstep | Variable delta clampet 50 ms | Fast 60 Hz simulation, interpoleret render |

Prototypeværdierne er bevidst gavmilde, så et skematisk kort kan testes. Før produktionsmilepæl kalibreres alle værdier. Ingen quest må afhænge af ustabile frame-timing-spring.

## Core loop

1. Spilleren opdager visuelt et mærkeligt sted, en figur eller en questmarkør.
2. Spilleren bevæger sig gennem virkelig bygeografi, med relevante genveje og terrænhøjder.
3. Spilleren observerer, spørger, samler eller løser en konkret mekanisk gåde.
4. Spillet reagerer direkte med animation, lyd, genstand, dialog og ændret verdenstilstand.
5. Belønningen afslører et nyt mysterium eller en ny mulighed for udforskning.

Ideel cyklus: 1-5 minutter; et distrikt indeholder korte aktiviteter og længere forbindende opgaver. Side quests skal ikke blot være »hent syv ting« i forskellige farver.

## Fortællingen: BYENS HEMMELIGHED

**Logline:** Da byen begynder at miste sine minder, må en nyankommet spiller samle brudstykker af historierne i Viborgs gader, før den sidste side af byens fortælling bliver slettet.

Konceptet er magisk realisme i en genkendelig by, ikke en historisk dokumentar. Den underliggende skurk er *Stilheden*, en fiktiv kraft, der gør steder og mennesker udviskede. Spilleren opdager, at et »arkiv« ikke bare er papir, men summen af de historier, mennesker fortsat fortæller.

**Akt I: Det første spor.** Spilleren møder arkivaren og lærer basismekanikker. Tre tegn viser sig i den gamle by. Stederne genkendes, men hændelserne er fiktive.

**Akt II: Byens masker.** Dagligdags borgere husker de samme begivenheder forskelligt. Spilleren vælger dialogspor, undersøger miljø og får adgang til nye mekanikker.

**Akt III: Vandets ekko.** Søerne, stierne og bakkerne fungerer som naturlige puzzles, der bygger på højde, lyd, vand og udsyn.

**Akt IV: Det åbne arkiv.** Tråde fra alle distrikter mødes. Spilleren kombinerer fysiske spor, information og ruter frem for at slås mod en menneskelig fjende.

**Akt V: Stemmerne vender tilbage.** Spillerens valg påvirker, hvilke historier arkivet bevarer. Slutningen handler om fælles hukommelse, ikke om at erobre byen.

## Figur og progression

Spilleren er navnløs ved starten, med enkel customisering (farver, hår, silhuet). Ingen udvikling gennem blodige kampe. Fremskridt er **evner og viden:** adgang til et kompas, en lygte, et forstørrelsesglas, en bærbar magnet og en særlig notesbog. Forbedringer åbner genveje og ekstra gåder, ikke bare højere skade.

Ved 0 min: løbe, hoppe, tale. Ved 20 min: slå på fantasyobjekter, finde og kombinere. Ved 60 min: skubbe og flytte ting. Ved 90 min: bruge lygten og se skjulte tegn. Senere: lydpuzzle og mekaniske kædepuzzles.

## NPC-system

En NPC har en tidsplan (simpel lokal spilklokke), et hjemområde, et samtaletræ og tilstande, der påvirkes af quests. NPC'er skal være individuelle og tydelige på få replikker. Hver NPC har: unik 3D-silhuet, 3-5 animationsloops, et auditivt motiv, en hemmelighed, én hverdagsting og en relation til mindst ét andet sted i byen.

Vigtige roller: Arkivaren, Parkvogteren, Nattevagten, Urmageren, Boghandleren, Den omrejsende, Konditoren, Stenforskeren, Musikeren, Postbuddet, Gartneren, Søvandreren og Brobyggeren. **Alle er fiktive figurer; ingen private Viborgborgere modelleres.**

## Questformat

Hvert quest indeholder: ID, fiktionel introduktion, sted-ID, adgangsbetingelser, mål, handlingsverb, åbenbar feedback, fejlfeedback, exit-betingelse, belønning, journaltekst, testcases og en alternativ løsning ved utilgængelighed. Ingen usynlige obligatoriske søgeopgaver uden spor.

Skel mellem obligatoriske missionskæder (max 2 afhængigheder i rækkefølge), frivillige fund, distriktshistorier og udfordringer. Opgaver bliver aldrig utilgængelige på grund af, at spilleren samlede en genstand "for tidligt". I produktionsudgaven gemmes dette som præ-fremskridt.

## Puzzlebibliotek og afveksling

1. Miljøobservation: opdage små afvigelser.
2. Rumlig logik: skubbe tre statuer til bestemte pladser.
3. Lydhukommelse: gentage en enkel klokkesekvens.
4. Timing: hoppe over bevægelige mekaniske barrierer.
5. Perspektiv: gå til et udsigtspunkt for at aflæse en figur.
6. Kortlæsning: navigere en sekvens af kryds uden kompas.
7. Samtale: sammenholde to personers udsagn.
8. Inventarkombination: forstå fysisk brug af to genstande.
9. Rytme: aktivere lys i en enkel takt.
10. Sekvens: udlede nummerfølge af genstandes placering.
11. Lys og skygge: ændre lyskilder i et rum.
12. Mekanik: tandhjul, løftestænger og trykplader.
13. Højdeforskel: nå objekter gennem spring og ruter.
14. Samling: genskabe et knust mønster.
15. Afkodning: forstå et symbolsystem gennem eksempler.

Regel: To hovedquests efter hinanden må ikke bruge det samme puzzleformat. Alle logiske løsninger skal kunne findes i spillet uden søgning på internettet.

## Kamp og fare

Spilleren kan slå på **fiktive, livløse objekter** (krystaller, låse, træningsdukker, mekaniske automater). Der findes fjendtlige fantasivæsener, men ikke vold mod realistisk identificerbare personer. Hjertesystem og respawn kan vente til post-vertical-slice. Fejl straffes med et kort tilbageslag, ikke med tab af lang tids fremskridt. Sværhedsgrader: Historie, Normal, Udfordring. Hjælp tilbyder hints i tre trin uden at afsløre hele løsningen med det samme.

## Navigation og byens geografi

- Hovedruter følger virkelige offentligt tilgængelige gader og stier.
- Ægte afspærringer, broer og trapper skal modelleres, før en sti aktiveres.
- Kamera og karakter må ikke igennem faste bygninger.
- Hvis et realistisk sted er kedeligt som platformbane, tilføj **fantasyobjekter inde i det virkelige rum**, eller flyt quest til et andet korrekt sted. Flyt ikke gaden.
- Højdedata afgør, om spilleren står over eller under en bro. 2D-fodaftryk alene må ikke bruges som collisions for niveauopdelte passager.

## Spillets tone

Kloge, tørre og korte dialoger. Ikke dansk turistbrochure; ikke en reklame for kommunen. Hverken for meget ironisk afstand eller tung fantasyprosa. Spilleren skal opleve, at nogen har skrevet hver replik med et formål. Humor kommer fra figurer, der er overbeviste om mærkelige ting.

## Sample dialog, originalt indhold

**Arkivaren:** »Du kigger på domkirken, som om den skylder dig et svar.«  
**Spilleren:** »Gør den det?«  
**Arkivaren:** »Det kommer an på, hvilket spørgsmål du har mistet.«

**Parkvogteren:** »Jeg har passet de her stier i tredive år. De er begyndt at flytte på sig.«  
**Spilleren:** »Hvordan?«  
**Parkvogteren:** »Ikke når jeg ser på dem. Det er det irriterende.«

## Belønningsøkonomi

Ingen køb for rigtige penge. Ingen tilfældige lootboxes. Lokale spilvalutaer: **spor** (questprogression, ikke spendable), **mønter** (små minispilsbonusser) og **samleblad** (lore og achievements). Max 5 typer genstande pr. nyt kvarter og højst 1 ny central mekanik hver 20-40 minutters spil.

## Detaljeret onboarding: første 15 minutter

**00:00-01:00**: Start ved Gammeltorv. Udviklerstyring: HUD inviterer til WASD; tre oplagte passager; ingen pop-up-tutorial. Spiller ser kirkens silhuet som pejlemærke.

**01:00-03:00**: Arkivaren står synligt i naturlig gåafstand. Interaktionssymbol fremkommer. Kort og mission vises, hvis spilleren tøver.

**03:00-06:00**: Find første lysende tegn. Et lille spring og en enkel miljøobservation viser platformelementer.

**06:00-10:00**: To andre tegn er placeret, så spilleren møder et gadeforløb og lærer top-down-visning. En NPC giver et valgfrit hint.

**10:00-15:00**: Nyt mål: Borgvold, parkvogter, nyt lys og klart skift fra tætte gader til grønne byrum.

Ingen cutscene længere end 20 sekunder i starten. Interaktion skal have respons senest 150 ms efter input i målsystemet.

## Save og tilbagevenden

Auto-save ved queststart, questslut, områdeskift og hvert 60. sekund; versioneret JSON, med migration af gamle feltversioner. Produktion skal kunne importere og eksportere save som brugerfil. Nuværende prototype gemmer mere enkelt i browserens `localStorage`, uden versionsmigration.


---

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


---

# 04 · Geodata, sandhedsgrad, 2016 og verificering

## Hvorfor »100 % korrekt« ikke kan loves af en kortimport

Et centralt bykort kan hente veje og mange bygningsaftryk fra OpenStreetMap. Det fortæller ikke altid, hvor høje husene er, hvilke trapper der findes, hvilke stier der er private, eller om en passage ligger på en bro eller under en vej. Fotogrammetri, højdedata, manuelle bygningsmodeller og lokale kontrolbesøg er nødvendige. Derfor må 100 % geografisk korrekthed optræde som **projektets kvalitetsmål**, ikke som en allerede opnået status.

## Datakildehierarki

1. **Autoritative danske geodata** til terræn, vejkanter, bygningsgeometri, adgang og administrative afgrænsninger, under den konkrete licens som er gældende for datasættet. Vurder fx GeoDanmark og offentlige terrænmodeller gennem relevante danske geoportaler.
2. **OpenStreetMap** til vejnet, stier, adgangstags, park- og vandkonturer samt sekundære interessesteder. OSM er bidragyderdata og skal kvalitetsmåles.
3. **Viborg Kommune, museum og offentlige kilder** til navne, kendte byrum, historie og udvikling, efter afklaring af ophavsret.
4. **Originale spilmodeller** fremstillet af teamet til alle synlige 3D-facader og fantasyobjekter.
5. **Manuel feltkontrol** af 100 % af kritiske quest-lokaliteter, trapper, broer og niveauskift samt en systematisk stikprøve af den øvrige by.

## Kontrolniveauer

| Klasse | Hvad er påkrævet? | Må det kaldes »korrekt«? |
|---|---|---|
| G0 · Fiction | Håndtegnet placeholder/fantasy | Nej |
| G1 · Geo-forankret | Verificeret koordinat, men omgivelser skematiske | Kun punktposition |
| G2 · OSM-model | OSM-veje og bygningers footprints, uverificeret højde | Kun kildetro gengivelse af OSM |
| G3 · Krydskontrolleret | Afvigelser målt mod autoritative data | Ja, inden for angivet målt tolerance |
| G4 · Feltkontrolleret | Kritiske steder verificeret manuelt | Ja, for de verificerede elementer |

**MVP:** G0, med G2 når GitHub Actions henter kortet. **Mål:** G3 for hele spilområdet og G4 for alle gameplaykritiske steder.

## Godkendelseskriterier for geografisk nøjagtighed (forslag)

- Objekters planplacering: p95-afvigelse højst 1,5 meter på udvalgte, verificerede bygningshjørner, forudsat kildegrundlag kan understøtte målingen. Ellers rapporteres faktisk afvigelse og kvalitet åbent.
- Bygningsfootprints: mindst 99 % af referencebygninger i den godkendte polygon skal være til stede; falsk positiv-rate registreres særskilt.
- Stier, broer og passager: **100 %** af hovedquestens obligatoriske ruter felt- eller kildekontrolleret, så de kan passeres.
- Højder: fejlgrænser vedtages separat for terræn og bygninger (f.eks. ±0,5 m for kritisk terræn og ±2 m for uvigtige hustage, betinget af kilder og test). Ingen tilfældige byggemål må godkendes.
- Korttopologi: 100 % af missionernes ind- og udgange valideres af pathfinding-test.
- 2016-kort: der kræves en separat datatidslinje, hvis 2016 skal være *spilverdenens faktiske år* i stedet for blot retropræsentation.

## Vigtigt om 2016

Projektets navn og visuelle »udgivelse i 2016« fortolkes som en **fiktiv retro-pakning**: spillet ligner et 90'er-spil, som nogen ville have udgivet i en browser i 2016. **Det er ikke det samme som Viborgs faktiske bybillede i 2016.**

En historisk korrekt 2016-version kræver tidsfæstede geodata og verificering mod arkivmateriale; en moderne OSM-import må ikke kaldes 2016-korrekt. Historiske OSM-snapshots kan i princippet udtrækkes via specialiseret historikværktøj som ohsome, men kvaliteten i 2016 kan være ringere end nutidige data, og dette projekt har ikke indhentet et sådan snapshot. Spilproduktion skal derfor have to adskilte felter: `release_presentation_year=2016` og `world_reference_date=YYYY-MM-DD`.

## Foreløbige geografiske ankre (WGS84)

| Sted | Lat | Lon | Kilde | Status |
|---|---:|---:|---|---|
| Viborg Domkirke | 56.45051 | 9.41248 | Nationalmuseet | G1 verificeret punkt |
| Borgvold | 56.45122 | 9.41803 | OSM-afledt stedskort (Mapcarta) | G1 reference |
| Sct. Mogens Gade 8 (gadeanker) | 56.4512588 | 9.4113998 | DinGeo-adressens offentlige reference | G1 adresse |
| Gammeltorv, gameplay-spawn | 56.45051 | 9.41120 | Designafledt *omtrentlig* placering | G0, **SKAL verificeres** |

En referencekoordinat er ikke en vejledende tilladelse til at gå ind på private arealer. Områdernes tilgængelighed skal undersøges, og niveauet af virkelige passerbare stier må ikke forveksles med fantasyspillets adgang til bygninger.

## Importpipeline i fuld produktion

1. Fastlæg AOI-polygon i versionsstyring: `/data/geo/area_of_interest.geojson`.
2. Vælg `world_reference_date` og datakildeversion. Gem rådata uændret med checksums og licensmetadata.
3. Transformér alle kilder til EPSG:25832. Kontrollér projektion, enhed og højdedatum.
4. Deduplicér overlap, luk polygoner, ret selvskæringer, håndtér bygningers indre gårde og multipolygoner.
5. Berig bygninger med bygningshøjde fra valide kilder; ukendte værdier får `height_verified=false`, aldrig en tilfældig permanent højde.
6. Byg terrænmesh og topologisk rutenet, bro-/tunnel-/trappeforbindelser og adgangstags.
7. Generér QA-rapporter: geometri, topologi, dækning, udgange, nøglesteder, fejlklasse.
8. Lås en versioneret release-kortpakke. Manuelle rettelser ligger i et separat korrektionslag med kilde og begrundelse.
9. Byg streambare chunk-assets og optimer til browser.
10. Verificér manuelt 100 % af kritiske quests og ruteforløb.

## Visuel sandhed kontra gameplay

Tilladt: mere kontrast på trapper, subtil farveadskillelse af murer, en fiktiv skattekiste ved et rigtigt torv, guidende lys, NPC'er og fugle, originale vindues- og dørdekorationer, hvis de ikke fremstilles som faktiske historiske detaljer.

Ikke tilladt i »korrekt kort«: rykke en bygning, udvide et torv, opfinde en offentlig vej, lukke en reel gennemgang uden gameplayforklaring, lade et bibliotek stå et andet sted eller skjule en kildemismatch bag tilfældig geometri.

## OSM-licens (ODbL)

Vis synlig kredit, fx »Kortdata © OpenStreetMap-bidragydere«, med link til https://www.openstreetmap.org/copyright. Gem kilde og licensinfo sammen med data. Hvis en database bliver til en afledt database efter ODbL, skal delingsforpligtelserne håndteres. Skeln mellem selve de afledte geografiske data og spillets originale kode/grafik, som ikke automatisk bliver ODbL-licenserede. En releaseansvarlig foretager konkret juridisk kontrol.

## QA-måling og bugtyper

Hvert geodata-afvigelsesissue dokumenteres med: kildetype, koordinat, foto/ortofoto-referencelicens, forventet placering, faktisk placering, delta i meter, prioritet og godkender. Prioritet P0 hvis quest blokeres; P1 hvis en hovedrute eller kendt seværdighed er forkert; P2 ved sekundære footprints; P3 ved kosmetisk detalje.

## Kildespor

- Viborg Domkirke, Nationalmuseet: https://samlinger.natmus.dk/dmr/asset/193170
- Borgvold, OpenStreetMap-afledt: https://mapcarta.com/W93883847
- Sct. Mogens Gade 8, adressekoordinat: https://dingeo.dk/adresse/8800-viborg/sct.-mogens-gade-8/
- Viborg Kommunes Domkirkekvarter: https://viborg.dk/demokrati-og-indflydelse/udvikling-og-planer/udvikling/vi-udvikler-byerne/domkirkekvarteret-viborg/
- OSM copyright: https://www.openstreetmap.org/copyright
- OSM Foundation guidelines: https://osmfoundation.org/wiki/Attribution_Guidelines
- Historiske data, ohsome: https://docs.ohsome.org/ohsome-api/development/endpoints.html


---

# 05 · World Bible, distrikter, NPC'er og missionskatalog

Dette er **designindhold** for fuldt spil, ikke påstand om allerede implementerede funktioner. Lokationsnavne refererer til virkelige byrum, men opgaver og historier er opdigtede. Præcise questpunkter skal verificeres mod geodata og gameplay-navmesh.

## Spilområder

**D1. Domkirkekvarteret: Byens hukommelse.** Funktion: start, navigation, observation og dialog. Visuelt: granit, brosten, smalle gader, skiftende taglinjer og højdeforskelle. Gameplay: hemmelige passager, små indgange, mønstre, klokker, skygger. Historie: Den første side er slettet fra Arkivet.

**D2. Handelsbyen: De mange fortællinger.** Funktion: sociale gåder, inventory, skubbe, bytte, finde små objekter. Relevante byrum: Sct. Mathias Gade, Hjultorvet, Nytorv, nærliggende byrum, efter kontrol af offentlig adgang. Visuelt: varme facader, farveglade butikker, skiltning som originale spilassets. Historie: Hvad er sandheden, når alle fortæller noget forskelligt?

**D3. Borgvold: Det grønne ekko.** Funktion: spring og platformelementer, lys/mørke, mekaniske objekter, vertikale stier. Visuelt: park, træer, skråninger, vandnære passager. Historie: Glemte stemmer forsvinder mellem stierne.

**D4. Søerne: Vandets sprog.** Funktion: rytme, refleksion, retning og kortbaserede mønstre. Relevante områder: Nørresø, Søndersø og godkendte offentlige stiforløb. Visuelt: bølget low-poly-vand, siv, fugle, lys og horisont. Historie: En besked kan kun læses, når man ser den fra den anden side.

**D5. De gamle gader: De skjulte rum.** Funktion: højde og udforskning, arkitektur, spring, historiske referencer efter research. Relevante steder: Sct. Mogens Gade, Latinerhaven og tilknyttede byrum. Visuelt: 90'er-farvet himmel mellem huse, mørke portåbninger og haver. Historie: Tavshed findes ikke kun under jorden.

**D6. Den moderne by: Hvad vi vælger at huske.** Funktion: finale, kombinationsgåder, mange ruter, tilbagevenden til gamle steder. Præcis AOI må besluttes på baggrund af fuldby-afgrænsning. Historie: Fællesskab og erindring, ikke en »hemmelig magisk forklaring på virkelig Viborghistorie«.

## Basal distriktsskabelon

Hvert distrikt skal mindst have: 1 indgang med tydeligt visuelt pejlemærke, 1 kort hovedquest-kæde (3-6 trin), 2 frie sidequests, 6-12 mindre hemmeligheder, 1 unik mekanik, 1 stærk NPC, 2 genveje, 1 belønning, 1 miljøfortælling, 1 efterfølgende ændring af verden, 1 checkpoint. Fuldbyens geografi afgør overgangene, ikke omvendt.

## Den fulde questliste, første planversion

| ID | Distrikt | Questnavn | Hovedmekanik | Type | Belønning |
|---|---|---|---|---|---|
| M01 | D1 | Arkivaren ved torvet | Introduktion / samtale | Hoved | Journal |
| M02 | D1 | Tre glemte tegn | Udforsk / samle | Hoved | Første bogstav |
| M03 | D3 | Haven ved volden | Navigere til NPC | Hoved | Seglens forklaring |
| M04 | D3 | Tre låse | Slå fiktive segl | Hoved | Kistesymbol |
| M05 | D1 | Den sidste lås | Vend tilbage / åbne | Hoved | Prologens slutning |
| M06 | D2 | Stedet der mangler | Spor efter markeringer | Hoved | Kortværktøj |
| M07 | D2 | Urmagerens fire tider | Synkronisering | Hoved | Nøgletandhjul |
| M08 | D5 | Huset uden nummer | Detaljeobservation | Hoved | Nyt spor |
| M09 | D1 | Klokker i forkert rækkefølge | Lydsekvens | Hoved | Arkivnøgle I |
| M10 | D4 | Vandets modsvar | Refleksion / perspektiv | Hoved | Arkivnøgle II |
| M11 | D3 | Træet med to skygger | Lysvinkel | Hoved | Arkivnøgle III |
| M12 | D2 | Den ulæselige kvittering | Dialogbeviser | Hoved | Den anden side |
| M13 | D5 | Murens hukommelse | Puslesamling | Hoved | Arkivstempel |
| M14 | D4 | Over den tavse sø | Rute / navigation | Hoved | Mønsternøgle |
| M15 | D6 | Arkivets dør | Kombinér alle spor | Hoved | Akt IV afsluttes |
| M16 | D6 | Den sidste stemme | Finalt konsekvensvalg | Hoved | Epilog |
| S01 | D1 | Fem mærkelige skilte | Opsøg fem spor | Side | Samleblad |
| S02 | D1 | Sten efter sten | Spring i sekvens | Side | Mønter |
| S03 | D1 | Arkivarens uorden | Sorteringslogik | Side | Ekstra dialog |
| S04 | D2 | Den forkerte levering | Samtale / deduktion | Side | Nyt kortpunkt |
| S05 | D2 | Brødkrummerne | Diskret sporjagt | Side | Mønter |
| S06 | D2 | Butikken der ikke sælger | Sociale valg | Side | Samleblad |
| S07 | D2 | Mønten med to sider | Perspektiv | Side | Ekstra lore |
| S08 | D3 | Den runde sti | Rute / minikort | Side | Platformgenvej |
| S09 | D3 | Gartnerens gåde | Farver og rækkefølge | Side | Samleblad |
| S10 | D3 | Lygterne slukkes | Timing | Side | Lygtefarve |
| S11 | D3 | Trappen der tæller | Antalslogik | Side | Mønter |
| S12 | D4 | Den forsvundne melodi | Lyd | Side | Særligt lydspor |
| S13 | D4 | Syd eller nord? | Retningsgåder | Side | Kompasdetalje |
| S14 | D4 | Tre refleksioner | Vinkel / rumlig logik | Side | Samleblad |
| S15 | D5 | En helt almindelig dør | Humorpuzzle | Side | Dragtfarve |
| S16 | D5 | Spor i muren | Opdag mønster | Side | Samleblad |
| S17 | D5 | Brevene uden modtager | Indholds- og logikgåder | Side | Ny NPC-historie |
| S18 | D6 | Det sidste kort | Krydsdistrict-samling | Side | Arkivillustration |
| S19 | D6 | Den trofaste post | Lang distance + valg | Side | Journalepilog |
| S20 | D6 | Byen vågner | Finale-efterquest | Side | Dekorativ titel |

Minimum: 16 hovedmissionsafsnit og 20 sidequests = **36** katalogiserede quests, hvor kun **M01-M05** har en kort teknisk prototyperepræsentation i spillet. Produktionen skal revidere og kvalitetsgodkende hvert quest med rigtig koordinat, varighed, dialog, logik og test.

## Den skjulte samlerute

Placér 60-90 frivillige hemmeligheder gennem byen med unikke kombinationer af plads og mekanik. Ikke alle er gule mønter. 25 % observationsfund, 25 % mobilitet, 20 % dialog, 20 % samling, 10 % svære slutspilshemmeligheder. Spilleren må ikke skulle slå nogen egentlig borger for at samle dem. Hvert fund bliver logget i en samlebog med illustration og originaltekst.

## NPC-register, v1 (arbejdsnavne)

| ID | Rolle | Føles sådan | Skjult motivation | Relation |
|---|---|---|---|---|
| N01 | Arkivaren | Præcis og gådefuld | Frygter at blive glemt | Kender nattevagten |
| N02 | Parkvogteren | Tør og jordnær | Vil holde stierne normale | Kender gartneren |
| N03 | Nattevagten | Nervøs og pligtopfyldende | Har set noget umuligt | Lytter til urmageren |
| N04 | Urmageren | Stædig, systematisk | Tiden passer ikke | Uven med musikeren |
| N05 | Boghandleren | Detaljeorienteret | Mærker manglende sider | Kender arkivaren |
| N06 | Den omrejsende | Købmand uden kunder | Kompasset er sandt | Kender postbuddet |
| N07 | Konditoren | Praktisk optimist | Den samme ordre gentages | Kender byrådets bud |
| N08 | Stenforskeren | Besat af mønstre | Har målt noget forkert | Kender museumsværten |
| N09 | Musikeren | Næsten irriterende glad | Hører skjulte klange | Uven med urmageren |
| N10 | Postbuddet | Hurtig, underspillet | Har usendte breve | Kender alle |
| N11 | Gartneren | Omhyggelig, forsigtig | En plante flytter sig | Hjælper parkvogteren |
| N12 | Søvandreren | Rolig, direkte | Prøver at forstå et ekko | Møder musikeren |
| N13 | Brobyggeren | Rationel og tavs | Har fundet et hul | Kender stenforskeren |
| N14 | Museumsværten | Videnshungrende | Samler fejl i historier | Kender boghandleren |
| N15 | Korttegneren | Meget selvsikker | Kortet ændrer sig | Møder arkivaren |
| N16 | Brevskriveren | Genert men stærk | Vil sige sandheden | Kender postbuddet |
| N17 | Gartnerens elev | Nysgerrig | Har fundet spor | Kender parkvogteren |
| N18 | Solnedgangsmaleren | Observerende | Ser nye skygger | Kender søvandreren |
| N19 | En gæst | Direkte og ny i byen | Ser det åbenlyse | Møder spilleren |
| N20 | Arkivets vogter | Nøgtern | Vil sikre alle stemmer | Afslutter historien |

Resterende 15-20 NPC'er produceres først, når distrikters rumlighed og samspil er testet. Figuren skal ikke optræde, bare fordi vi har plads til den.

## Detaljeret quest-skabelon (eksempel M09)

**Titel:** Klokker i forkert rækkefølge.  
**Forudsætning:** Spilleren har fuldført M08 og har fået evnen til at afkode grundsymboler.  
**Lokation:** Et offentligt tilgængeligt og geovalideret område i D1, ikke inde i den faktiske kirke uden aftale.  
**Start:** Nattevagten fortæller om tre lydspor, der ikke længere kommer i rigtig rækkefølge.  
**Spillerhandling:** Tryk 3 separate fantasy-klokkesten i den rækkefølge, man kan udlede af spor på stedet.  
**Feedback:** Hver korrekt tone får et særpræget lyssymbol; forkert sekvens genstarter uden straf.  
**Hinttrappe:** 1. »Lydene er ikke ens«; 2. »Tænk fra lys til mørke«; 3. Vis den første rigtige klokke i ét sekund.  
**Exit:** Rækkefølge verificeret, questflag sættes, checkpoint gemmes, ny dialog og waypoint aktiveres.  
**Fejltest:** Spilleren kan gå sin vej, lave missionen igen, pause, genindlæse, aktivere forkert rækkefølge og gennemføre med kun tastatur.  
**Tidsbudget:** 5-9 minutter for en ny spiller, efter at have nået stedet.  
**Historisk disclaimer:** Alle lydmekaniske objekter er fantasyobjekter.

## Regler for at bruge virkelige steder

Virkelige butiks- og beboernavne er ikke medtaget i den aktuelle fiktion. Hvis en kommerciel institution skal optræde identificerbart, indgås eksplicit aftale. Deling af billeder fra kommunale sider er ikke automatisk fri licens. Ingen identificerbare privatpersoner kopieres som karakterer eller tillægges fiktive handlinger. Byens faktuelle historie får kilde og særskilt fact-check, mens det overnaturlige udelukkende er spilhistorie.


---

# 06 · Art Bible: 1990'er-spil, tænkt udgivet i 2016

## Målet med stilen

Genkendelig Viborg med begrænset polygonantal og synligt kantede silhuetter. Resultatet skal ligne en kærligt produceret 3D-verden fra den tidlige konsolperiode, ikke en generisk »retrofilter«-effekt over et moderne spil. Spillets kildeår *2016* fortæller om indpakningen, ikke om faktisk geografi på datoen.

## Grafikbibliotek

- Geometri: simple, læselige 3D-former; tættere silhuetter for centrale bygninger, stærkt reduceret geometri på afstand.
- Renderopløsning: basismål 640 × 360, brugerindstilling 480p/720p; CSS opskalerer med nearest-neighbor.
- Farver: grønne og grå granittoner, mørk blågrøn atmosfære, rødbrune tage, varme vinduesgule lyspunkter og sparsom orange/gul quest-fremhævning.
- Lys: maksimal firetrins-lyskvantificering, ingen tung fysisk korrekt path tracing; højtideligt om aftenen, lyst og mundret om dagen.
- Teksturer: håndmalede 64×64 til 128×128 atlas for mindre genstande; maksimalt 256×256 for hero-facadeelementer, med tydelige retrolavopløsningsdetaljer.
- Polygonmål: NPC 200-650 trekanter ved nær LOD, hero-bygning 400-1200, baggrundsbygning 20-70, lille prop 8-50. Forslag skal benchmarkes mod devices.
- Outlines: kun kontrolleret omkring interaktive objekter. Ingen konstant tyk sort tegneserieoutline på hele byen.
- Sky: todelte atmosfærefarver, gradvise skybånd, ingen dyr volumetrisk sky-rendering.

## Grundpalette (hex, vejledende)

| Betydning | Farve |
|---|---|
| Dyb baggrund | `#14282E` |
| Natteblå | `#203942` |
| Flad granit | `#A9A291` |
| Solvarm kalk | `#D2BA9B` |
| Tagterracotta | `#B45A42` |
| Grønt bladværk | `#588355` |
| Søvand | `#347486` |
| Questguld | `#F2D081` |
| Fare / segl | `#D8685E` |
| Lys UI-flade | `#F4EDDB` |

## Arkitektur: produktionsstandard

Hver central historisk bygning oprettes som en **original model på et geovalideret footprint**, med et »building manifest«: bygnings-ID, footprint-kilde, fotos med licens, modelbygger, version, polygonbudget, LOD, højde-kilde, mulig collision, farvevejledning og godkendelsesdato.

**Katedral:** To genkendelige tårne, en passende tung stenstruktur og særskilt silhuet. Antal tårne, tagform og geometri baseres på verificeret reference, ikke fri fantasi. Frit samspil uden at give indtryk af, at virkelige dele kan gennembrydes eller bestiges på måder, der ikke eksisterer.

**Boligbebyggelse:** Varierende husbredder, lavt opløste vinduer, puds og mursten med paletter udledt af godkendte fotos. Undgå mekanisk identiske bygninger.

**Træer:** 3-5 bladmasse-varianter, 3 stammevarianter, løvfarve pr. årstid. Uden dyre partikeleffekter.

**Vej og fortov:** Stærkt forskellige materialer for vej, brosten, stier og græs. Kilder afgør hvor materialerne faktisk ligger; spillet må ikke påstå, at enhver OSM-vej er brostensbelagt.

## Animation

Figur: idle 6-10 fps, walk 12 fps, run 12 fps, hop start 6 fps, air 8 fps, land 6 fps, punch 8 fps, turn 8 fps, interact 8 fps. Animeret i 3D keyframes, bevare kantet timing. Løb skal kunne aflæses i et overordnet billede uden detaljer.

NPC'er: 2-3 karakteristiske loops og 1 samtaleidle hver; ikke alle skal vinke eller hoppe. Questmarkører bruger rolig bobbing plus et tydeligt symbol, som også fungerer i farveblindhedsindstillinger.

## Kamerafortælling

Tredjepersonsvisning bruger smalle gader og høj taglinje til at skabe opdagelse. Top-down er et aktivt værktøj i gåderne; perspektivskift må ikke sabotere puzzle-logik. Kamera flyder gennem overgang på 0,2-0,35 sekunder; ved kollision med bygning flyttes kameraet frem til fri linje, ikke gennem muren.

## UI

Retro-computerpaneler: brudte kanter, let offset shadow, maks. to skrifttyper og tydelig hierarkisk størrelse. HUD viser ét hovedmål ad gangen. Inventar max 12 synlige felter pr. side. Målvisning skal virke for både farveblinde og spillere med lavt syn. Stor skrift skal have plads uden at overlappe game-canvas. Ingen blink over 3 Hz. Undertekst for alle vigtige lydsignaler og mulighed for at slukke kamerarystelser.

## Lyd

Originalt komponerede, korte melodiske loops med synth og samples af fiktive klokker; diskret ambient fra gader og parker. 4-6 distriktsmotiver der kan klinge sammen, 1 tema for mysteriet, 1 for sejr, 1 for pause/menus. Stil: charmerende, lidt mystisk, højstemt i små doser. Undgå kommercielt beskyttede melodier. Brug webaudio til lyd, med mute og separat volumen for musik/effekter. Ingen autoplay før første spillerinteraktion.

## Lydprincipper for tilgængelighed

Lyd er aldrig eneste information, når det gælder obligatoriske quests. Musikpuzzles kan spille med synlig rytmegrafik, kombineret med valgfri synkroniseret haptik. Undertekster viser »lys klokke«, »dyb klokke« osv. Hørbarhed må ikke afhænge af kraftig bas.

## Godkendelse

Art director kontrollerer alle kritiske rum ud fra: 1) geotroværdighed, 2) genkendelig stedssilhuet, 3) retro-konsistens, 4) mekanisk tydelighed, 5) performance. Intet enkelt punkt kan ignoreres. Et objekt, der ligner Viborg perfekt men får spillet til at hakke, er ikke færdigt. Et hurtigt objekt på det forkerte sted er heller ikke færdigt.


---

# 07 · Produktionsplan for 20-personers team

## Styringsmodel

Produktejer godkender værdien af spillets omfang, geografi og budget. Game director ejer spiloplevelse og prioritet, tech lead ejer teknisk implementering, geo lead ejer sandhedsgrad, art director ejer stil og assetkvalitet, QA lead ejer verificering. Ingen rolle kan alene godkende sit eget arbejde på kritiske punkter. Alle acceptkriterier knyttes til et issue og et versionsnummer.

## Team på præcis 20

| Nr. | Rolle | Kerneansvar | Leverancer |
|---|---|---|---|
| 1 | Game director / creative lead | Spilvision, kritik, scope | GDD, endelige designbeslutninger |
| 2 | Producer / project manager | Tid, risiko, budget, releases | Roadmap, burn-up, risikolog |
| 3 | Technical director / architect | Platform, kodestruktur, standarder | Arkitektur, reviews, API-kontrakter |
| 4 | Senior rendering engineer | WebGL, shaders, kamera, optimering | Renderer, profildata |
| 5 | Gameplay programmer | Bevægelse, interaktion, kamp | Controller, animation, physics |
| 6 | Systems programmer | Quests, inventory, saves, UI logic | Data- og save-systemer |
| 7 | Tools / build engineer | GitHub, data-build, assetpipeline | CI/CD, scripts, editorintegration |
| 8 | Geodata engineer | Geoimport, terræn, projections | Versionerede geodata, QC |
| 9 | Level designer (center) | Quests og rumligt design | Område D1/D2 |
| 10 | Level designer (natur/by) | Ruter, hop og puzzle-rum | Område D3-D6 |
| 11 | Narrative designer / writer | Historie, dialog, questlogik | Dialogdatabase, scripts |
| 12 | Environment artist lead | Kritiske bygninger og art-review | Hero assets, standards |
| 13 | 3D environment artist | Facader, byrum og props | LOD-facader og små assets |
| 14 | Character artist / animator | Karakterer og animation | Figurer, rigging, animationer |
| 15 | Technical artist | Materials, shaders, sceneopsætning | Asset-optimering og VFX |
| 16 | UI/UX designer | HUD, kort, inventar, mobil | Wireframes og prototyper |
| 17 | Audio composer / designer | Musik, lyd, miksning | Originale musikspor og SFX |
| 18 | QA lead | Teststrategi, release gates | Testplan og bugtriage |
| 19 | QA / automation engineer | Regressions- og autotest | Browsermatrix, smoke, performance |
| 20 | Accessibility / localization / research specialist | Tilgængelighed, dansk tekst, faktatjek | Tilgængelighedsaudit og research |

**Eksterne delopgaver:** juridisk licensgennemgang, feltfotografering, geodesi, historisk research og spiltestpanel. Kan købes separat, uden at fjerne ejerskab fra kerneholdet. Rollen #20 kan ikke realistisk alene udføre alle disse specialfunktioner; der skal være underleverandørbudget.

## Rollefordeling / RACI

| Beslutning | Accountable | Responsible | Consulted |
|---|---|---|---|
| Godkendt AOI / tidsreference | Produktejer | Producer + Geo lead | Game director, kommune/fagekspert |
| Gameplay loop | Game director | Gameplay + level designer | Narrative, QA |
| Kortets rigtighed | Geo lead | Geodata engineer | Level designer, lokal kontrol |
| Releasebranch og webpublicering | Technical director | Tools engineer | QA lead |
| Stil og facader | Art director (rolle 12) | Environment/character artists | Geo lead |
| Historiske forhold | Narrative lead + producer | Research specialist | Museum / fagkilder |
| Performance release gate | Technical director | Rendering engineer | QA lead |
| Test-godkendelse | QA lead | QA-team | Hele teamet |

## Tidsplan: 40 uger, 10 udviklingsmåneder (planforudsætning)

**Fase 0 – Afklaring (uge 1-2):** Fastlæg AOI for release, world reference date, licensstrategi, platform, målenheder, minimum devices, budget. Godkend kriterier før featureudvikling. Output: godkendt Product Requirements Document, arkitekturspike, prioriteret backlog.

**Fase 1 – Teknisk fundament (uge 3-8):** Geoimport, enkel terrænmodel, streamingprototype, player-controller, kamera, navmesh, assetpipeline, quests, save, CI og testkørsel. Første benchmark på billige enheder. **Gate G1:** En verificeret 250×250 m zone kan navigeres uden at gå gennem vægge; stabilt 30 FPS på basismobil.

**Fase 2 – Vertical slice (uge 9-16):** 400×600 m Domkirkekvarteret, 3-5 komplette quests, 8-12 NPC'er, 20 hero assets, animation, lyd, tilgængeligt UI. **Gate G2:** 20-30 minutters intern playtest uden vejledning; ingen P0/P1 bugs; end-to-end save virker.

**Fase 3 – Core produktion (uge 17-28):** 6 distrikter, 70 % af quests, alle baseline-kampsystemer/puzzles, 2 kameraer, kortstreaming, rigtige højder, stedforankrede assets. **Gate G3:** Den fulde release-AOI kan gennemløbes; gameplay-værktøjer låst; performance inden for budget.

**Fase 4 – Content complete (uge 29-34):** 100 % planlagte quests, lokaliseret tekst, alle centrale NPC'er, musik, audio, alle endings, tilgængelighed, faktagennemgang, 100 % hovedrutens geo-audit. **Gate G4:** Feature freeze; kun rettelser og optimering.

**Fase 5 – Beta og certificering (uge 35-38):** 100+ testforløb fordelt på målgrupper, platforms- og memorytest, recovery-test, QA-kontroller, privacy/licens. **Gate G5:** Ingen P0/P1, mindst 95 % completion uden indgreb.

**Fase 6 – Release og efterfølgende (uge 39-40):** Release candidate, udgivelse, dokumentation, support, audit, retrospektiv, plan for evt. DLC/åben værktøjskæde. **Gate G6:** GitHub Pages fungerer offentligt, alle kildekrediteringer er gyldige.

**Risiko for tidsforlængelse:** Hvis »hele Viborg« inkluderer samtlige bygninger og korrekt detaljegrad uden procedural level art, er 40 uger sandsynligvis utilstrækkeligt. G0 må ikke godkende et scope, der åbenlyst ikke kan produceres.

## Sprintplan (to uger per sprint)

Sprint 1: kildevalg, baseline-geosnapshot, 3D-bevægelse.  
Sprint 2: rendererbenchmark, import/triangulation, collider.  
Sprint 3: terræn, højde, trapper, kamera.  
Sprint 4: save, quests, NPC-state, interaktionssystem.  
Sprint 5: gameplay-tilgængelighed, kort og hjælp.  
Sprint 6: hero buildings D1, dialog, lyd.  
Sprint 7: tre komplette quests, bossløs puzzle.  
Sprint 8: vertical-slice QA, fejllukning, playtest.  
Sprint 9-10: handelsbyen og gamle gader.  
Sprint 11-12: Borgvold, søerne og terrænlinks.  
Sprint 13-14: D6 og mellemområder, mekanisk variation.  
Sprint 15-16: missionsslutning, indholdslås, tilgængelighed.  
Sprint 17-18: beta, performance, geo-qa og kompatibilitet.  
Sprint 19: release candidate, dokumentation, licens.  
Sprint 20: release, hotfixplan og telemetryfri fejlmelding.

## Estimering

**Brutto kapacitet:** 20 personer × 40 uger × 37 timer = 29.600 arbejdstimer. Derfra fratrækkes ferie, sygdom, teammøder, rekruttering og uforudsete forhold. Planlæg med **24.000-26.000 reelle projektimer** til hele holdet som udgangspunkt, og justér efter ansættelsesform og ferieplan.

**Budgetscenarier (illustrative, ikke pristilbud):** Ved samlet intern timeløn/overhead på 500-950 DKK giver 25.000 reelle timer ca. 12,5-23,75 mio. DKK, **før** evt. større købte datalicenser, rejser, specialmålinger, udstyr og buffer. Lille hobbybudget + 100 % komplet by i 3D er uforenelige krav. Et mere realistisk lille team bør vælge en kort og færdig vertical slice.

## Tre niveauer af indsats

**Solo (8-12 uger fritid):** Forbedr denne prototype: OSM import, 2-3 verificerede lokationer, originalt UI og 20 minutters eventyr. Mål: offentligt spilbart proof-of-concept. Ikke 100 % kortkorrekt.

**Team 4-6 (4-6 måneder):** Domkirkekvarter med terræn, flere quests, bedre kamera og dialog, basistest. Mål: kvalitetsvertical slice.

**Team 20 (10+ måneder):** Fuldt planlagt produkt for en præcist afgrænset by-AOI. Mål: 6-8 timers professionelt indhold og datafidelitet efter verificerbare kvalitetsmål.

## Change control

Enhver ønsket feature angiver: hvorfor, hvem der får værdi, målbart acceptkriterium, QA-omkostning, ydelsespåvirkning, teknisk risiko, estimeret tid og hvad der fjernes fra planen. Ingen ændring direkte i produktion uden review. Kortdata-revisioner behandles som indholdsændringer, fordi de kan bryde collision og alle tilknyttede quests.

## Ugentlig drift

Mandag: 30 min blokeringer, beslutninger og prioritering.  
Daglig: 10 min synkronisering, resten asynkron.  
Onsdag: 30 min geo/content-review for næste delområde.  
Torsdag: 45 min byggemøde om performance, QA og udviklingshastighed.  
Fredag: spilbar build og 30 min kritik af den faktiske spiloplevelse.  
Hver anden fredag: demo, retrospektiv, ændringsgodkendelse og ny sprint.

## Ansvar for afslutning

Et issue lukkes først når kode, asset, test, dokumentation, kildeangivelse, browserkompatibilitet og geosporebarhed er opfyldt. Kritiske områder kræver to godkendere (fagansvarlig + QA/geo efter relevans). »Det virker på min computer« er ikke et acceptkriterium.


---

# 08 · Teststrategi, acceptkriterier og GitHub-release

## Testpyramiden

**Enhedstest (CI):** Koordinattransformering round-trip, polygonkollision, triangulering, quest-state transitions, save-migration, datafeltskema, objekt-ID-entydighed, sanitization af bruger- og korttekster.

**Integration (CI):** Kortimport → tiles → world props → collisions; questmarkører skal have walkable plads; gemt tilstand genindlæses; URL med subfoldersti på GitHub Pages virker; kortdata har ODbL-attribution.

**Browser end-to-end:** Start → bevæg → tal med arkivar → find 3 objekter → tal med parkvogter → knus 3 segl → åbn kiste → epilog. Gentag med pause, topdown, reload og mobilknapper. Fejlrapport indeholder video, browser, GPU, steps og versionsnummer.

**Felt- og geotest:** Referencepunkter, kritiske passager, navmesh, terræn, trapper, rettigheder og stedgenkendelighed. Der er kun grønt releaseflag, når geo lead har signeret QA-rapporten.

## Acceptmål for fuldt spil

| Kategori | Gate (forslag) |
|---|---|
| Desktop FPS | Median ≥ 60 i repræsentative scener, p1 ≥ 30 |
| Mobil FPS | Median ≥ 30 på godkendt baseline-enhed |
| Første indlæsning | Interaktiv på ≤ 8 sekunder ved 10 Mbps og varm CDN-cache |
| Gengivet initial asset-size | ≤ 15 MB komprimeret initialt; stream derefter |
| Hukommelse desktop | ≤ 500 MB mål, måles per browser |
| Hukommelse mobil | ≤ 250 MB mål, måles per browser |
| Input | Spilleren reagerer inden for 100 ms under normal FPS |
| Deadlocks | 0 kendte i primær fortælling |
| Save | 100 % af testede checkpoints kan indlæses |
| Retvisende kilder | Attribution vises, metadata lagres, geoudtræk tilgængeligt |
| Geo-kritiske ruter | 100 % manuelt/automatisk kontrolleret |
| Tilgængelighed | Tastaturnavigation, tekstskala, lydalternative spor, reduceret bevægelse |

Ingen FPS eller loadtider er målt for denne prototype i brugerens browser, og ovenstående er **mål**, ikke observerede resultater.

## Vigtige testcases (uddrag)

- TC01: `index.html` kan indlæses på en case-sensitive GitHub Pages-sti.
- TC02: WebGL initialisering virker uden ekstern JS-afhængighed; manglende WebGL giver læsbar fejl.
- TC03: `V` skifter kamera uden ændring af player x/z/y.
- TC04: Pause fryser gameplay-state; musik og animationer følger indstilling.
- TC05: Player kan ikke gå gennem G3/G4-verificerede bygninger.
- TC06: Player kan ikke bevæge sig over vand uden defineret bro eller evne.
- TC07: Alle hovedquest-objekter kan nås; genstart/reload giver ingen deadlock.
- TC08: Forkerte puzzleforsøg nulstiller lokalt uden at fjerne fremskridt.
- TC09: Skift til M/topdown efterlod ingen NPC-triggers i forkert koordinatsystem.
- TC10: Alle centrale lydsignaler har visuelt alternativ.
- TC11: På mobil blokerer touch-buttons ikke nødvendige quests.
- TC12: Source `demo` udløser tydelig »ikke korrekt kort«-mærkning.
- TC13: Source `osm` udløser OSM-attribution samt data-version.
- TC14: Når Overpass fejler, publiceres ingen fejlagtig påstand om nyt korrekt kort.
- TC15: Når en ny kortversion flytter en vej, detekterer regressionstesten brudte questlokationer.
- TC16: Spillet viser ikke eksakte koordinater på private personer eller deres ejendele.
- TC17: UI er forståelig uden dansk lokalkendskab (via senere tekstoversættelse).
- TC18: `localStorage` blokeret → spillet fortsætter uden crash og viser begrænsningen.

## Release og rollback

**Dev:** udviklingsbrancher, automatiske checks, preview builds.  
**Staging:** kun release candidates; snapshot af geodata er låst.  
**Production:** tag `v1.0.0`, CI deploy til GitHub Pages.  
**Rollback:** re-deploy tidligere godkendt Git-tag; geodata og content rulles tilbage **samlet**, da questobjekter ellers kan lande i mure.  
**Hotfix:** bugfixbranch, lille testmatrix, tag `v1.0.1`, dokumenteret årsag.

## GitHub Pages, trin for trin

1. Opret repository på GitHub, standardbranch `main`.
2. Upload de udpakkede spilfiler **med mappestruktur intakt**. Filen `index.html` skal ligge i roden.
3. Sørg for, at `.github/workflows/pages.yml` findes. Dot-mapper skal også overføres; hvis ZIP-uploaderen ikke tager dem, opret workflowet direkte på GitHub.
4. `Settings → Pages → Source → GitHub Actions`. En engangsindstilling. Kan ikke udlades med sikkerhed ved et nyt repository.
5. `Actions → Build and publish Viborg 96` kører normalt ved push, eller start `Run workflow` manuelt.
6. Workflowet forsøger Overpass-download af OSM-geometri til `assets/map/city.json`, før siden bliver uploadet til Pages. Hvis tjenesten fejler, vises prototypens **skematisk mærkede demokort**.
7. Klik Pages-URL. Kontrollér med HUD-kildeteksten, om der står »OSM« eller »SKEMATISK DEMOKORT«.
8. Gå gennem de fem prototypequests og test kamera på både desktop og mobil.

Denne specifikation kræver ingen lokal installering, men GitHub tilbyder ikke en garanti for, at en ekstern Overpass-tjeneste svarer på en given deployment. Workflow og offentlig URL er ikke live-testet her; det er derfor forkert at kalde det garanteret funktionelt i enhver browser.

## Brug af aktuelle vs. godkendte kortdata

Prototype-workflowet henter **aktuelle** data ved hvert push. Et seriøst fuldt spil bør ikke bruge denne model ukritisk: kildedata kan ændre sig og flytte en væg ind over et quest. Gå i stedet over til låste godkendte map-bundles med checksums og automatiske diff-rapporter, så det kun er bevidste kortopdateringer, der når produktion.

## QA-rapportskabelon

```text
Build ID:
Kilde snapshot / dato:
Browser og version:
OS / GPU / RAM:
Testcase:
Forventet resultat:
Faktisk resultat:
Screenshot eller video:
Severity (P0-P3):
Reproducerbarhed:
Geo-koordinat og geometri-ID (hvis relevant):
Reviewer:
Beslutning og lukket dato:
```


---

# 09 · Kildefortegnelse, licenser, risiko og beslutninger

## Kontrollerede eksterne referencer (pr. 12. oktober 2026)

1. [Viborg Kommune: Domkirkekvarteret](https://viborg.dk/demokrati-og-indflydelse/udvikling-og-planer/udvikling/vi-udvikler-byerne/domkirkekvarteret-viborg/): offentlig stedskontekst og udvikling.
2. [Viborg Kommune: Rammeplan for Domkirkekvarteret (PDF)](https://viborg.dk/media/wegjrwh5/domkirkekvarteret_rammeplan_2018.pdf): byrum og sammenhæng, herunder Gammeltorv, Nytorv, Latinerhaven, Sct. Mogens Gade og Borgvold. Planmateriale kan indeholde fremtidsprojekter og er ikke et færdigt opmålt kort.
3. [Nationalmuseet: Viborg Domkirke](https://samlinger.natmus.dk/dmr/asset/193170): referencekoordinat 56.45051, 9.41248.
4. [OpenStreetMap-afledt Borgvold-referenceramme](https://mapcarta.com/W93883847): referencekoordinat 56.45122, 9.41803, OSM-way 93883847.
5. [Sct. Mogens Gade 8, offentlig adresse-reference](https://dingeo.dk/adresse/8800-viborg/sct.-mogens-gade-8/): geografisk gadeanker. **Må ikke bruges til at fremstille privatpersoner i spillet.**
6. [OpenStreetMap: Ophavsret](https://www.openstreetmap.org/copyright): ODbL, kildeangivelse.
7. [OSM Foundation: Attribution Guidelines](https://osmfoundation.org/wiki/Attribution_Guidelines): spil og interaktive kort skal kreditere korrekt.
8. [GitHub Docs: Udgiv fra branch/Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site): engangsopsætning.
9. [GitHub Docs: Opret GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site): statiske filer og entrypoint.
10. [ohsome API: Historisk OSM](https://docs.ohsome.org/ohsome-api/development/endpoints.html): mulighed for tidsstemplede dataudtræk; **ikke brugt i prototypen**.

## Licensregister, før release

| Aktiv | Kilde | Licens/brug | Status |
|---|---|---|---|
| OSM footprint og vejdata | OpenStreetMap | ODbL, attribution og deling af afledte databaser | Kildekreditering i prototype |
| JS/CSS/HTML-kode i denne leverance | Originalt fremstillet | Licens vælges af ejeren før ekstern genbrug | Ingen tredjepartsbiblioteker |
| Retro-farveflader/modeller i prototype | Procedurelt genereret original kode | Ejer kontrollerer licens | Ingen købte assets |
| Original spilmusik | Fremtidig komposition | Skriftlig rettighedsoverdragelse/licens | Ikke produceret |
| Facadefotos | Skal indsamles lovligt | Fotograflicens individuelt | Ikke inkluderet |
| Kommunale planer og referencebilleder | Offentlige websites | Ikke automatisk fri brug | Linket, ikke kopieret |
| 2016 historisk kortudtræk | Evt. historikdatakilde | Vilkår kontrolleres særskilt | Ikke indhentet |

## Risikoregister

| Risiko | Sandsynlighed | Konsekvens | Ejer | Håndtering |
|---|---|---|---|---|
| OSM-mangler eller fejl | Høj | Høj | Geo lead | Krydskontroller og feltmålinger |
| »Hele byen« uden afgrænsning | Høj | Kritisk | Producer | AOI godkendes på G0 |
| Scope vokser med 20 udviklere | Høj | Høj | Game director | Backlog, vertical slice før fuld skala |
| Netbaseret build fejer | Mellem | Mellem | Build engineer | Låst map-bundle + tydelig fallback |
| Browserperformance | Mellem | Høj | Rendering engineer | Profilering og LOD fra uge 2 |
| Forventning om 2016-snapshot | Høj | Mellem | Product owner | Adskil æstetik og historisk tidsreference |
| Ophavsret ved facader/fotos | Mellem | Høj | Producer | Assetregister og licensgennemgang |
| Quest på privat / uegnet sted | Mellem | Høj | Level + geo lead | Access-tag + feltkontrol |
| QA-rutekæde brydes af ny kortversion | Mellem | Kritisk | Geo + QA | Snapshot-lock og routetest |
| Utilgængeligt gameplay | Mellem | Høj | UX/QA | Tidlige tilgængelighedstests |

## Beslutningslog

**ADR-001. Browser først.** Valgt: statisk GitHub Pages, ECMAScript-moduler, WebGL. Begrundelse: nul lokal installation og lav distributionsfriktion.

**ADR-002. Retro er stil, ikke løgn om historien.** Valgt: fiktiv 2016-udgivelsesindpakning. Datakort har egen tidsreference.

**ADR-003. Verden er ikke et løst inspireret bykort.** Valgt: kildesporbare footprints og veje. Unøjagtigheder må ikke skjules.

**ADR-004. Ingen serverbackend ved MVP.** Valgt: lokal gemmefil i browseren, kun statiske filer og publicering via Github.

**ADR-005. Fallback skal kunne afvikles uden OSM.** Valgt: tydeligt navngivet skematisk kort; må ikke forveksles med verificeret Viborg.

**ADR-006. Spillet må godt være fantasifuldt, geografi skal være ærlig.** Valgt: originale NPC'er og fantasyobjekter lægges ovenpå virkelige byrum.

## Åbne beslutninger, som kun ejer/produktion kan træffe

1. Skal hele Viborgs sammenhængende byareal være release-scope, eller er det et langvarigt mål med første release i centrum?
2. Skal den faktiske spilverdens bygninger og vejnet repræsentere **2016**, eller er 2016 alene udgivelsesindpakning?
3. Hvilke underområder skal bygningsmodelleres med manuel nøjagtighed i første udgivelse?
4. Hvilke licenser ønsker produktejeren til original spilcode og grafik?
5. Skal fremtidig fuldproduktion fortsætte på custom WebGL-renderer eller migrere til en moden sceneengine efter benchmark?
6. Skal spillet publiceres under projektets egen GitHub Pages-URL eller et selvstændigt domæne?
7. Hvilken geografisk tolerance er acceptabel, og hvem godkender den fagligt?

Intet svar på disse spørgsmål er stiltiende forudsat i denne leverance.


---


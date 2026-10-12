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

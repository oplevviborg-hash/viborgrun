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

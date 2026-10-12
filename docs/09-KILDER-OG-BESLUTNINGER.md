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

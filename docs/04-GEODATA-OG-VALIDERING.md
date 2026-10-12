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

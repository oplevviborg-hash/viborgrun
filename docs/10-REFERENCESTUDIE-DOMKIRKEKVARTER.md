# VIBORG 96: kilde- og referencejournal, Domkirkekvarteret

Dato: 12. oktober 2026.

## To klart adskilte datalag

**OSM-geometri:** `scripts/update-map.py` henter OpenStreetMap-way-geometri for veje, bygninger og arealer. Ved OSM-udgivelse står `source: "osm"` i `city.json`. OSM-way-ID, koordinater og navne bevares, når de findes. Bygningshøjde er **estimeret**, medmindre et relevant højde- eller etage-tag er til stede. Et tag er ikke en uafhængig opmåling.

**Kunstnerisk rekonstruktion:** Den medfølgende `city.json` er stadig et **demokort** (`source: "demo"`). Dets gadeforløb og bygningsomrids må ikke betegnes som verificerede OSM-geometrier. `PLACES` er håndplacerede ankre og mærkes nu som foreløbige. Spillets NPC'er, gåder, runer og genstande er fiktion.

## Reference: Sct. Mogens Gade, juni 2025

De indsendte Street View-skærmbilleder viser stensat støttemur, niveauforskel mellem gade og have, klippede træer, bænke, brostenspræg og kig mod Viborg Domkirkes to tårne. Det er **visuelle referencer**, ikke målfast fotogrammetri. Denne udviklingsrunde tilføjer en lavpoly-model af stenmuren, stenforbandt, klippede træer og bænk til **demokortet**. Placering, længde og højde er bevidst foreløbige. Muren får sammenfaldende kollision i demoen; den tilføjes ikke til OSM-kortet som en påstået opmålt mur.

Der er endnu **ikke** etableret en verificeret digital terrænmodel eller faktiske højdekoter. Den visuelle mur viser et terrænspring, men spilverdenens bevægelsesplan er stadig fladt. Dette er en kendt begrænsning og skal ikke forveksles med implementeret højdegeometri.

## Kilder og rettigheder

- OpenStreetMap: https://www.openstreetmap.org/copyright (ODbL; © OpenStreetMap-bidragydere).
- Viborg Kommunes projektoversigt: https://viborg.dk/demokrati-og-indflydelse/udvikling-og-planer/udvikling/vi-udvikler-byerne/domkirkekvarteret-viborg/projektomraader/
- Visuelle referencebilleder: brugerleverede Street View-skærmbilleder dateret juni 2025. Skærmbillederne distribueres **ikke** i spillet eller repositoryet.

## Næste validering

Kontrollér domkirkens faktiske bygningsomrids, tårnenes retning, stenmurens placering og højdekoter mod særskilte, lovligt anvendelige datakilder. Uden sådanne data er dekorative placeringer altid mærket som approximationer.

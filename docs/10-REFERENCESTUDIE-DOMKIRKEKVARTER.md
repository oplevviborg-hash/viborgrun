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

## Runde 12. oktober: kildebaseret gåde, bydetaljer og styring

- **Historisk kilde:** Viborg Domkirke blev genindviet den 10. september 1876 (Viborg Museum: https://viborgmuseum.dk/leksikon/v/viborg-domkirke). Den fiktive kronikør spørger om antal år frem til spilåret 1996 (120 år).
- **OSM-proveniens:** OSM-way-geometri bevares for veje, arealer og bygninger. Et højde-tag mærkes `osm-height-tag`, etagebaseret højde er `levels-estimate`, og fallback er `artistic-estimate`. Vejbredde mærkes som OSM-tag eller skøn. Navngivne områders midtpunkter er afledte OSM-way-centroider, **ikke** opmålte punkter.
- **Facade:** Vestportal, tårnvinduer, pilastre og skibsvinduer vises kun i demokortet. Placering, højde og terræn er fortsat kunstneriske approximationer.
- **Styring:** Kollision bruger eksakt cirkel-mod-kant afstand. Musebevægelse sætter mål-yaw, som spillet interpolerer. Kikkerten er et redskab (B), ikke en ændring af verdensgeometrien.
- **Gemte spil:** Eksisterende save-felter bevares; `chronicleSolved` er nyt og valgfrit, og `kikkert` ligger i det eksisterende inventar.


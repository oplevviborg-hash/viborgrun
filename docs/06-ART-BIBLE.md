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

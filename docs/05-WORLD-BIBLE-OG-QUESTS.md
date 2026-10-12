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

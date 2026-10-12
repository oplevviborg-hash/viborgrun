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

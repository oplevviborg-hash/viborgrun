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

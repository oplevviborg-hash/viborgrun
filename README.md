# VIBORG 96 · Byens hemmelighed

**Spilbar browserprototype + komplet udviklingsgrundlag for et større low-poly 3D-eventyr i Viborg.**

> STATUS 0.1, 12. oktober 2026. Koden er en prototype med ét kortudsnit og én sammenhængende missionskæde. Den er **ikke** et færdigproduceret 100 % geografisk korrekt spil. At beskrive den som sådan ville være forkert.

## Hurtig start på GitHub Pages

1. Opret et nyt GitHub-repository, fx `viborg96`. Brug `main` som standardgren.
2. Udpak ZIP-filen og upload **indholdet af mappen**, så `index.html` ligger i repositoryets rod. Upload også `.github/workflows/pages.yml` og `.nojekyll`. Brug fx **Add file → Upload files** eller GitHubs webeditor.
3. Gå til **Settings → Pages → Build and deployment → Source → GitHub Actions**. Denne førstegangsindstilling er nødvendig. Hvis upload i browseren skjuler filer eller mapper, skal `.github/workflows/pages.yml` oprettes manuelt i GitHubs webeditor.
4. Åbn **Actions → Build and publish Viborg 96**. Workflowet kører ved push til `main`. Kontrollér, at deploy-trinnet er grønt. Under **Settings → Pages** finder du URL'en.

**Ingen lokal Node, Python eller spilengine er nødvendig.** Kun browser, GitHub og repositoryets standardindstillinger. Alternativt kan man vælge `Deploy from a branch / main / root` for at publicere prototypen uden GitHub Actions, men så bruges den medfølgende **skematiske demoverden** i stedet for OSM-hentningen.

### Hvad virker nu?

- Ægte 3D-rendering med browserens WebGL 1, skaleret ned til en low-res retrostil.
- Tredjepersonskamera og fugleperspektiv (`V`).
- WASD/piletaster, sprint, hop, interaktion, slag og mobilknapper.
- NPC-samtaler, tre samleobjekter, tre destruerbare segl, skattekiste, én missionskæde i fem trin, epilog.
- Minikort og oversigtsmenu, pause, inventar og automatisk lagring i `localStorage`.
- Automatisk OSM-hentning ved GitHub Actions-deploy, hvis Overpass-serverne svarer. OSM-vejforløb, bygningskonturer, områder og grove højder sættes ind i 3D.
- Offline inkluderet skematisk demokort som fallback, tydeligt mærket **ikke geografisk korrekt**.

### Hvad virker ikke endnu / er ufærdigt?

- Den fulde by er **ikke** modelleret. Kun centrum i et afgrænset MVP-område kan hentes. Der mangler blandt andet søer uden for området, opland, indendørs rum og alle individuelt modellerede facader.
- Terrænet er fladt. Højdeforskelle, trapper, forbindelser, undergange og brogeometri er ikke etableret endnu.
- Alle bygningshøjder er ikke verificerede. Manglende OSM-højder erstattes midlertidigt af pseudo-tilfældige højder.
- Gåderne er korte prototypemekanikker. Det fulde quest-design findes i `docs/` men er ikke kodet.
- Enkelte quest-positioner er dramaturgiske positioner omkring verificerede stedspunkter, ikke landmålerverificerede placeringer.
- Test af en fuld GitHub Actions-deploy og faktisk OSM-download er **ikke** foretaget i dette miljø. Workflowet kan fejle pga. ekstern tjeneste, rettigheder eller netværk.
- 2016 er en bevidst *fiktiv udgivelsesæstetik*, ikke en dokumenteret rekonstruktion af Viborgs bygningsbestand i 2016. Se geodatadokumentet.

## Kontroller

| Funktion | Tastatur | Mobil |
|---|---|---|
| Bevæg | WASD / piletaster | Retningspad |
| Sprint | Shift | Ikke endnu |
| Hop | Mellemrum | HOP |
| Tal, saml, undersøg | E | TAL |
| Slå | F | SLÅ |
| Skift kamera | V | KAMERA |
| Inventar | I | Pausemenu |
| Oversigtskort | M | Pausemenu |
| Pause | Escape | ☰ |
| Drej tredjepersonskamera | Træk mus hen over spillet | Træk på spilfladen |

## Mappestruktur

```text
index.html                  browserens startfil
src/main.js                 game loop, input, UI, render-afvikling
src/gameplay.js             quests, tilstand, NPC og gameplay
src/world.js                verdensdata, geografi, kollision, demo
src/renderer.js             egen dependency-free WebGL 1-renderer
src/math.js                 koordinater, kamera, triangulering-hjælp
src/style.css               HUD, pixelstil og responsiv opsætning
assets/map/city.json        medfølgende SKEMATISK fallbackverden
scripts/update-map.py       hent aktuelle OSM-contours via Overpass
.github/workflows/pages.yml GitHub Pages CI/CD
scripts/validate.py         statiske data- og filkontroller
tests/smoke.mjs             gameplay-smoketests
/docs/                      design, kortlægning, produktion, QA og release
```

## Designprincipper

1. **Korrekt placering, spilbar bearbejdning.** En mur må ikke flyttes for at opfylde et quest. Flyt questmarkøren i stedet.
2. **Retfærdig omtale af kortkilden.** OSM krediteres, og afledte data skal håndteres i overensstemmelse med ODbL.
3. **100 % browserstatisk publicering.** Ingen backend, ingen konto, intet ekstra lokalt buildtrin for spilleren.
4. **Konsistent datamodel.** Verdenskort, gameplay og minimap bruger de samme meterkoordinater og objekt-ID'er.
5. **Et færdigt spil kræver produktion.** MVP'en her er en teknisk base, ikke substitut for et 20-personers udviklingsteams arbejde.

## Læs dokumenterne i denne rækkefølge

1. [Vision, scope og produktkrav](docs/01-VISION-OG-KRAV.md)
2. [Game Design Document](docs/02-GAME-DESIGN-DOCUMENT.md)
3. [Teknisk arkitektur](docs/03-TEKNISK-ARKITEKTUR.md)
4. [Geodata og geografisk sandhed](docs/04-GEODATA-OG-VALIDERING.md)
5. [Verden og missionskatalog](docs/05-WORLD-BIBLE-OG-QUESTS.md)
6. [Art Bible og lyd](docs/06-ART-BIBLE.md)
7. [Produktion med 20 udviklere](docs/07-PRODUKTIONSPLAN.md)
8. [Kvalitet, tests og release](docs/08-TEST-OG-RELEASE.md)
9. [Kildeoversigt, licenser og beslutninger](docs/09-KILDER-OG-BESLUTNINGER.md)

**Licensnote:** Spilkoden og originalt spilindhold kan licenseres selvstændigt efter ejers beslutning. Kortdata fra OSM er omfattet af ODbL. Licens til spillets øvrige indhold er ikke valgt eller påstået vedlagt.

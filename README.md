# Hobbre — wachtlijst-landingspagina

Statische landingspagina voor Hobbre, het deelplatform voor hobby's. Gebaseerd
op de "stickerboek"-stijl van Slush (pastelbanden, opgeblazen 3D-lint,
uitgesneden stickers, zwarte lijnen), aangepast aan Hobbre-oranje `#F5561A`.

## Lokaal draaien

```bash
python3 -m http.server 5173
```

Open daarna http://localhost:5173.

## Hero-varianten

- `hero-varianten.html` toont alle hero's onder elkaar om te vergelijken.
  Bovenaan staan 6 en 7: buurtfeed (variant 4) met de straat (variant 2)
  eronder en een scroll-effect.
  - **6 · Opblazen:** de straat blijft staan, de lucht kleurt blauw en de
    huisjes blazen zich één voor één op, met een label erboven.
  - **7 · Naar huis:** op schermen vanaf 1000×700 blijft de hele hero staan en
    vliegt elk kaartje uit de feed naar zijn eigen huisje. Kleinere schermen
    krijgen opblazende huisjes onder de feed.
  - Op mobiel is de straat breder dan het scherm en schuift hij mee.
- **`index.html` gebruikt variant 7 als hero.** Met `index.html?hero=1` (t/m `6`)
  zet je ter vergelijking een andere variant bovenaan de echte pagina.
- De losse huisjes staan in `assets/img/houses/`. De scroll-logica staat in
  `main.js` onder "Street scenes".

Opruimen als de keuze definitief is: `hero-varianten.html`, het `?hero=`-blok
bovenin `main.js` en de opmaak van varianten 1–6 in `heroes.css` kunnen dan weg.

## Categorieën (Hobby's ontdekken)

- `categorie-varianten.html` toont drie varianten van de categoriesectie:
  **1 · Stickerkaarten**, **2 · Menukaart** en **3 · Scrollrij**.
- **`index.html` gebruikt variant 3 (Scrollrij)** op een perzikkleurige band.
  Bekijk de andere in de pagina met `index.html?cats=1#hobbys` of `?cats=2#hobbys`.
- De laatste kaart van de rij, "Jouw hobby hier?", laat bezoekers zelf een
  hobby voorstellen. Voorstellen gaan naar hetzelfde `WAITLIST_ENDPOINT` met
  `kind: "suggestion"` en worden tot die tijd lokaal bewaard in
  `localStorage` onder `hobbre-suggestions`.
- De categorieën (namen, aantallen, voorbeeldhobby's) staan direct in de HTML
  van elke variant.

## Footer

**Merkregel: het Hobbre-logo staat nooit op een zwarte achtergrond.**

- `footer-varianten.html` toont drie footers: **1 · Straat** (lichtblauw, huisjes
  die opblazen op de stoep), **2 · Stickervel** (wit vel op geel, linkkolommen)
  en **3 · Poster** (perzik, kernwaarde groot, logo over de volle breedte).
- `index.html` en `bedrijven.html` gebruiken variant 1. Bekijk de andere met
  `index.html?footer=2#site-footer` of `?footer=3#site-footer`.
- De opmaak staat in `footers.css`.

## Bedrijvenpagina (Hobbre Honk)

- `bedrijven.html` + `bedrijven.css`: de pagina waarop zaken zich aanmelden als
  **Hobbre Honk** (honk = thuisbasis, clubhuis).
- Het formulier bewaart aanmeldingen net als de wachtlijst (zie hieronder), met
  `kind: "business"` en velden voor zaak, soort, plaats, aanbod en pakket.
- Pakketprijzen (€ 99,99 / € 199,99 per maand, 20% korting per jaar) en de 20%
  servicekosten komen uit het ondernemingsplan. De inhoud van de pakketten is
  een voorstel.

## Bestanden

| Pad | Wat |
|-----|-----|
| `index.html` | De pagina en alle teksten (Nederlands) |
| `hero-varianten.html` | Alle hero-varianten (1–7) |
| `categorie-varianten.html` | De drie categorie-varianten |
| `bedrijven.html` | Pagina voor bedrijven: Hobbre Honk |
| `categories.css` | Opmaak van de categoriesecties |
| `bedrijven.css` | Opmaak van de bedrijvenpagina |
| `footer-varianten.html` | De drie footer-varianten |
| `footers.css` | Opmaak van de footers |
| `styles.css` | Designtokens (bovenaan) en alle stijlen |
| `heroes.css` | Opmaak per hero-variant en de vergelijkingspagina |
| `main.js` | Wachtlijstformulieren, parallax, mobiel menu, video, hero-wissel |
| `assets/img/` | Webbeelden (WebP), logo, favicon, deelafbeelding |
| `assets/img/cut/` | Hobby-stickers met uitgesneden witte rand |
| `assets/video/` | Loopende video van de hobbymaatjes (WebM + MP4) |
| `design-source/` | Originelen op volle resolutie uit Higgsfield. Niet nodig voor livegang en staat daarom niet in git (zie `.gitignore`) |

## Na een wijziging in CSS of JavaScript

De links naar de stylesheets en `main.js` hebben een versienummer
(`styles.css?v=…`). Verhoog dat nummer in alle HTML-bestanden na een wijziging,
anders kan een browser nog een oude versie uit de cache laden. Een harde
refresh (Cmd+Shift+R) werkt ook.

## Wachtlijst koppelen

Aanmeldingen worden nu alleen in de browser van de bezoeker bewaard
(`localStorage`). Zet `WAITLIST_ENDPOINT` bovenin `main.js` op een URL die een
JSON-`POST` accepteert (Formspree, Mailchimp via een kleine functie, Supabase):

```json
{ "email": "...", "name": "...", "city": "...", "roles": ["lend", "business"], "source": "aanmelden", "createdAt": "..." }
```

`roles` kan bevatten: `discover`, `borrow`, `lend`, `skills`, `buddies`, `business`.

## Nog checken voor livegang

- De voordelen "Badge voor pioniers", "Praat mee" en "Voorsprong als
  verhuurder" zijn voorstellen. Houd alleen wat je echt gaat waarmaken.
- De afstanden in variant 4 (150 m, 300 m …) zijn illustratief.
- Het cijfer van 46 uur vrije tijd per week komt van het SCP (12+), zoals in
  het ondernemingsplan.
- Voeg social links toe in de footer zodra de accountnamen vaststaan.

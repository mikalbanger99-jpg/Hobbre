# Hobbre — wachtlijst-landingspagina

Statische landingspagina voor Hobbre, het deelplatform voor hobby's. Gebaseerd
op de "stickerboek"-stijl van Slush (pastelbanden, opgeblazen 3D-lint,
uitgesneden stickers, zwarte lijnen), aangepast aan Hobbre-oranje `#F5561A`.

## Lokaal draaien

```bash
python3 -m http.server 5173
```

Open daarna http://localhost:5173.

## Hero

- Bovenaan staat de buurtfeed: titel, ondertitel en aanmeldformulier links,
  kaartjes uit "jouw straat" rechts.
- Op schermen vanaf 1000×700 blijft de hero staan terwijl je scrolt: de straat
  komt omhoog en elk kaartje uit de feed vliegt naar zijn eigen huisje.
  Kleinere schermen krijgen opblazende huisjes onder de feed.
- Op mobiel is de straat breder dan het scherm en schuift hij mee.
- De losse huisjes staan in `assets/img/houses/`. De scroll-logica staat in
  `main.js` onder "Street scenes".

## Categorieën (Hobby's ontdekken)

- De categorieën staan als scrollrij op een perzikkleurige band. Op brede
  schermen schuiven de kaarten opzij terwijl je naar beneden scrolt; op mobiel
  swipe je ze.
- De laatste kaart van de rij, "Jouw hobby hier?", laat bezoekers zelf een
  hobby voorstellen. Voorstellen gaan naar hetzelfde `WAITLIST_ENDPOINT` met
  `kind: "suggestion"` en worden tot die tijd lokaal bewaard in
  `localStorage` onder `hobbre-suggestions`.
- De categorieën (namen, aantallen, voorbeeldhobby's) staan direct in
  `index.html`.

## Footer

**Merkregel: het Hobbre-logo staat nooit op een zwarte achtergrond.**

- `index.html` en `bedrijven.html` gebruiken de footer **Straat**: lichtblauw,
  het logo groot in beeld en huisjes die opblazen op de stoep.
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
| `bedrijven.html` | Pagina voor bedrijven: Hobbre Honk |
| `categories.css` | Opmaak van de categorie-scrollrij |
| `bedrijven.css` | Opmaak van de bedrijvenpagina |
| `footers.css` | Opmaak van de footer |
| `styles.css` | Designtokens (bovenaan) en alle stijlen |
| `heroes.css` | Opmaak van de hero: buurtfeed, straat en scroll-scène |
| `main.js` | Wachtlijstformulieren, parallax, mobiel menu, video, scroll-scènes |
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
- De afstanden in de buurtfeed (150 m, 300 m …) zijn illustratief.
- Het cijfer van 46 uur vrije tijd per week komt van het SCP (12+), zoals in
  het ondernemingsplan.
- Voeg social links toe in de footer zodra de accountnamen vaststaan.

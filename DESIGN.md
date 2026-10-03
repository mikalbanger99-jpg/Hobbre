# Hobbre Design System — DESIGN.md

> **Inflatable sticker book on pastel paper.** Huge crushed display type, a velvety 3D tube in Hobbre orange, a rainbow of die-cut 3D stickers, and every component outlined in 1px black like it was cut out by hand. No shadows, no gradients: depth comes from colour bands, outlines, slight rotations and springy motion.

Use this document to restyle any existing website so it looks exactly like hobbre.com. Every value below is taken from the live CSS (`styles.css`, `heroes.css`, `categories.css`, `footers.css`, `bedrijven.css`, `main.js`). Where this file and your old site disagree, this file wins.

---

## 0. How to use this document

1. Read **§1 Non-negotiable rules** first. Breaking one of these is what makes a page look "off-brand".
2. Paste the **§2 tokens** and the **§11 starter CSS** into your site.
3. Map every existing component to the matching spec in **§6 Components**.
4. Replace imagery following **§7 Imagery**.
5. Add motion from **§8 Motion**, and respect reduced motion.
6. Rewrite copy using **§9 Voice**.
7. Run the **§12 Restyle checklist** before you ship.

If you hand this to an AI coding agent, use the prompt in **§13**.

---

## 1. Non-negotiable rules

| # | Rule | Why |
|---|------|-----|
| 1 | **The Hobbre logo never sits on a black background.** Allowed backgrounds: `--paper`, `--peach`, `--sky`, `--mist`. In a nav, put the logo inside a white outlined pill. | Brand rule from the founders. |
| 2 | **No gradients anywhere.** Not on backgrounds, buttons, text or underlines. Flat fills only. | The 3D stickers and ribbon carry all dimensionality. |
| 3 | **No box-shadows or drop-shadows.** Separation comes from 1px `--ink` outlines, colour bands and rotation. | Sticker-book, printed feel. |
| 4 | **Every interactive element and card has a 1px solid `--ink` outline.** | The hand-cut sticker outline is the signature. |
| 5 | **Pills are fully round** (`border-radius: 1600px`). Cards are 20–40px. Nothing sharp-cornered. | Softness is the default. |
| 6 | **Primary CTA = solid black pill with white text.** Orange is a brand/surface colour, never the CTA fill. | Orange stays the "brand" hit, black stays the "action". |
| 7 | **Text on orange is always `--ink`, never white.** White on `#F5561A` fails contrast (≈3.4:1). | Accessibility. |
| 8 | **Display headlines are uppercase, 800 weight, condensed, `line-height: .8`.** Never loosen the leading. | The crushed type is sculptural, not typographic. |
| 9 | **Images are 3D inflatable objects with a white die-cut border**, never stock photography. | See §7. |
| 10 | **Every display headline has company:** a sticker, badge, ribbon or scene nearby. Display type never sits alone on an empty band. | Collage composition. |
| 11 | **Pages alternate full-bleed colour bands.** No dividers between sections; the colour change is the divider. | Scroll rhythm. |
| 12 | **Motion is springy and optional.** All animation stops under `prefers-reduced-motion: reduce`. | Accessibility. |

---

## 2. Design tokens

Copy this block as-is.

```css
:root {
  /* Core */
  --ink: #0d0c0b;           /* text, outlines, primary buttons, ticker */
  --paper: #ffffff;         /* page, cards, pills, fields */
  --orange: #f5561a;        /* Hobbre orange: logo, brand band, ribbon, accents */

  /* Section washes (pastel bands) */
  --peach: #ffe4d4;
  --sky: #dceeff;
  --lavender: #e9ccff;
  --mist: #f4efeb;          /* subtle chip/hover fill */

  /* Sticker palette (card fills, badges, icon circles) */
  --sun: #ffd731;
  --mint: #55db9c;
  --blue: #4da2ff;
  --violet: #5c4ade;        /* use white text on violet */
  --pink: #ff9fcf;

  /* Type */
  --font-display: "Bricolage Grotesque", "Arial Narrow", "Helvetica Neue Condensed", Impact, sans-serif;
  --font-ui: "Figtree", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

  --text-caption: 12px;
  --text-body: 16px;
  --text-body-lg: 18px;
  --text-sub: clamp(20px, 1.9vw, 26px);
  --text-h3: clamp(22px, 2vw, 28px);

  /* Shape */
  --line: 1px solid var(--ink);
  --r-card: 20px;
  --r-card-lg: 40px;
  --r-pill: 1600px;

  /* Layout */
  --gutter: clamp(16px, 4vw, 48px);
  --max: 1440px;
  --band-pad: clamp(72px, 10vw, 144px);

  color-scheme: light;
}
```

### 2.1 Colour roles

| Token | Hex | Role | Text colour on it |
|-------|-----|------|-------------------|
| `--ink` | `#0D0C0B` | Body text, all outlines, solid CTA, ticker band | `--paper` |
| `--paper` | `#FFFFFF` | Page background, cards, pills, fields | `--ink` |
| `--orange` | `#F5561A` | Logo, one brand band per page, ribbon, numerals, eyebrow dot, progress fill | `--ink` only |
| `--peach` | `#FFE4D4` | Warm band (hero pavement, categories, FAQ), badge core bg alt | `--ink` |
| `--sky` | `#DCEEFF` | Cool band (how it works, street sky, footer) | `--ink` |
| `--lavender` | `#E9CCFF` | Soft band (signup section, business hero), card fill | `--ink` |
| `--mist` | `#F4EFEB` | Hover fill for chips and role pills, small type labels | `--ink` |
| `--sun` | `#FFD731` | Hover state of pills and ghost buttons, badges, "selected" chips, stat sticker | `--ink` |
| `--mint` | `#55DB9C` | Card fill, success-ish dot (decorative only, not a status colour) | `--ink` |
| `--blue` | `#4DA2FF` | Card fill, video card background | `--ink` |
| `--violet` | `#5C4ADE` | Business accents, "premium" card, business signup band | `--paper` |
| `--pink` | `#FF9FCF` | Card fill (category "Sociaal & Community") | `--ink` |

### 2.2 Secondary neutrals (use exactly these)

| Hex | Use |
|-----|-----|
| `#4D4640` | Muted text (form subtitles, fine print, footer legal) |
| `#6B625B` | "(optional)" labels, small column headings |
| `#8A817A` | Input placeholder |
| `#2E2925` | FAQ answer text |
| `#5C534C` | Small uppercase hints on peach |
| `#2A2724` | Solid button hover |
| `#B8360A` | Form error text |
| `#FFF1EC` | Invalid field background (border turns `--orange`) |
| `#FFFDF8` | Focused field background |

### 2.3 Contrast (measured)

- `--ink` on every pastel and on `--orange`, `--blue`, `--mint`, `--sun`, `--pink`: passes AA (orange ≈ 6.2:1, blue ≈ 7.3:1).
- `--paper` on `--violet` ≈ 6.0:1: passes. `--ink` on `--violet`: fails, so never do it.
- Logo orange on paper ≈ 3.4:1, on peach ≈ 2.8:1, on sky ≈ 2.9:1: fine for a large graphic. **Do not** place the logo on lavender, sun, mint, blue, violet, orange or ink.

---

## 3. Typography

### 3.1 Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Figtree:wght@500;600;700;800&display=swap">
```

| Role | Family | Weights | Notes |
|------|--------|---------|-------|
| Display (headlines, numerals, big words) | **Bricolage Grotesque** (variable) | 800 only | Always `font-variation-settings: "wdth" 75, "opsz" 96;` + `font-stretch: 75%`, uppercase. |
| UI / body / labels / buttons | **Figtree** | 500 body, 600 emphasis, 700 labels/buttons, 800 card titles | Body letter-spacing `-0.01em`. |

### 3.2 Display style (the signature)

```css
.display {
  font-family: var(--font-display);
  font-weight: 800;
  font-stretch: 75%;
  font-variation-settings: "wdth" 75, "opsz" 96;
  text-transform: uppercase;
  line-height: 0.8;          /* never above 0.85 */
  letter-spacing: -0.005em;
}
.display > span { display: block; }   /* one <span> per intended line */
```

Break headlines into deliberate lines with `<span>`s, e.g. `<span>Jouw straat</span><span>heeft een</span><span>kajak.</span>`. Always end with a full stop or question mark.

### 3.3 Type scale

| Name | Size | Line height | Weight | Used for |
|------|------|-------------|--------|----------|
| Hero title | `clamp(56px, 8.2vw, 134px)` (split layout) / `clamp(56px, 10vw, 160px)` (centred) | .8 | 800 display | Page H1 |
| `display--xxl` | `clamp(80px, 15vw, 240px)` | .8 | 800 display | Closing headline ("Tot snel in je straat.") |
| `display--xl` | `clamp(72px, 11.5vw, 190px)` | .8 | 800 display | Statement band ("Schermtijd / Mensentijd.") |
| `display--lg` | `clamp(64px, 10vw, 160px)` | .8 | 800 display | Section headings (H2) |
| Rail heading | `clamp(48px, 6.4vw, 104px)` | .8 | 800 display | Compact H2 next to content |
| Big word marquee | `clamp(56px, 8vw, 128px)` | .8 | 800 display | Scrolling hobby words |
| Numerals | `clamp(120px, 12vw, 180px)`, orange fill + `-webkit-text-stroke: 1px var(--ink)` | .75 | 800 display | Step numbers |
| Sub / lede | `var(--text-sub)` = `clamp(20px, 1.9vw, 26px)` | 1.3 | 500 | Intro paragraph under H2, max `34ch` |
| Hero lede | `clamp(20px, 2.1vw, 28px)` | 1.25 | 600 | Paragraph under H1, max `38ch` |
| H3 (card titles) | `var(--text-h3)` = `clamp(22px, 2vw, 28px)` | 1.05 | 800 | Card titles, `letter-spacing: -0.02em`, max `12ch` |
| Body | 16px | 1.5 | 500 | Everything else, `letter-spacing: -0.01em` |
| Small body | 15px | 1.45 | 500–600 | Card copy, notes |
| Label | 12px | 1 | 700–800 | Uppercase, `letter-spacing: 0.032em` (nav, buttons, eyebrows, tags, form labels) |
| Micro label | 10–11px | 1.15 | 800 | Uppercase, `letter-spacing: 0.04em` (count badges, listing type) |

Rules:
- `h2, h3 { text-wrap: balance; }` and `p { text-wrap: pretty; }`.
- Headline copy is short. If a headline wraps to four lines on desktop, cut words, don't shrink the type.
- Mobile display sizing: Bricolage at `wdth 75` is ≈ **0.39em per character**. An 11-character line ("JOUW STRAAT") fills a 375px phone at `font-size: 20vw`. Size mobile titles with `vw` so the longest line fills the width.

---

## 4. Layout

| Token / rule | Value |
|--------------|-------|
| Max content width | `--max: 1440px`, centred |
| Side gutter | `--gutter: clamp(16px, 4vw, 48px)` on a `.wrap` |
| Band vertical padding | `--band-pad: clamp(72px, 10vw, 144px)` |
| Section head bottom margin | `clamp(48px, 6vw, 88px)` |
| Card grid gap | `clamp(14px, 1.6vw, 24px)` |
| Split grid (copy + visual) | `grid-template-columns: minmax(0,1.05fr) minmax(0,.95fr)`, gap `clamp(32px, 4vw, 72px)`, `align-items: center` |
| Every band | `position: relative; overflow-x: clip;` so stickers can poke out vertically but never cause sideways scroll |

```css
.wrap { width: 100%; max-width: var(--max); margin-inline: auto; padding-inline: var(--gutter); }
.band { position: relative; padding-block: var(--band-pad); overflow-x: clip; }
.section-head { display: flex; flex-direction: column; align-items: flex-start; gap: 24px; margin-bottom: clamp(48px, 6vw, 88px); }
.section-head--center { align-items: center; text-align: center; }
```

### 4.1 Section anatomy

Every content section follows: **eyebrow pill → display H2 → lede (optional) → content**. Left-aligned by default; centre only for step/process sections and closing sections.

### 4.2 Band rhythm (page recipe)

Alternate warm and cool; never put two identical bands next to each other.

| Order | Section | Band |
|-------|---------|------|
| 1 | Announcement ticker | `--ink` (the only black band; no logo on it) |
| 2 | Sticky nav | transparent, floating white pills |
| 3 | Hero | `--paper`, turning `--sky` as you scroll, `--peach` pavement strip at the bottom |
| 4 | Big-word marquee | `--paper` with `--ink` top and bottom borders |
| 5 | Intro / features | `--paper` |
| 6 | Categories rail | `--peach` |
| 7 | Statement band | `--orange` (one per page) |
| 8 | How it works | `--sky` |
| 9 | Signup | `--lavender` |
| 10 | FAQ | `--peach` |
| 11 | Closing headline + form | `--paper` with ribbon |
| 12 | Footer | `--sky` + `--peach` pavement |

### 4.3 Breakpoints

| Width | Change |
|-------|--------|
| ≤ 1180px | Nav links collapse into the "+" drawer |
| ≤ 1100px | 4-column card grids → 2 columns |
| ≤ 1000px | Signup split → 1 column; pinned scroll scenes turn off (also below 700px height) |
| ≤ 900px | All split layouts stack; FAQ heading stops being sticky |
| ≤ 720px | Mobile hero sizing (`20vw` titles), smaller stickers |
| ≤ 620px / 560px | Card grids → 1 column, field rows stack |
| ≤ 520px | Inline signup (input + button) stacks |
| ≤ 480px | Nav CTA hidden (the drawer has it) |

### 4.4 Z-index scale

`stickers 4` · `badge 5` · `hero copy 6` · `nav 50` · `skip link 100`. Inside scroll scenes: `clouds 1` · `street 2` · `caption 3` · `copy layer 4` · `flying cards 5`.

---

## 5. Shape, outline and tilt

| Element | Radius |
|---------|--------|
| Pills: buttons, nav links, tags, chips, eyebrows, inline signup | `1600px` |
| Text fields | `14px` (or pill `1600px` inside the inline signup) |
| Small cards: FAQ items, perks, note card, nav drawer | `20px` (`--r-card`) |
| Listing cards | `22px` |
| Category cards | `32px` |
| Offer cards, rail cards | `36px` |
| Large cards: feature pillars, steps, signup card, video card, plans | `40px` (`--r-card-lg`) |
| Circles: badges, icon circles, "+" toggles, count stickers | `50%` |

**Outline:** always `border: 1px solid var(--ink)` (`var(--line)`). Inside an outlined card, sub-parts separate with the same line (e.g. listing card media: `border-bottom: var(--line)`).

**Tilt:** cards in a row alternate `rotate(-1.2deg)` / `rotate(1.2deg)`, and even items also drop `translateY(18px)`. Stickers are rotated between −18° and +18°. Hover straightens the card (`rotate(0)`) and lifts it (`translateY(-8px)`). Small cards and notes: `rotate(-1deg)`; video card: `rotate(3deg)`.

---

## 6. Components

All class names match the Hobbre source so you can copy from the repo.

### 6.1 Announcement ticker

Black strip above the nav, uppercase 12px/700 white text, orange `✦` separators, endless scroll.

```html
<div class="ticker" role="marquee" aria-label="Wachtlijst nu open. We starten in Utrecht.">
  <div class="ticker__track" aria-hidden="true">
    <div class="ticker__group"><span>Wachtlijst nu open</span><i>✦</i><span>We starten in Utrecht</span><i>✦</i></div>
    <div class="ticker__group"><!-- exact duplicate for the seamless loop --></div>
  </div>
</div>
```

```css
.ticker { background: var(--ink); color: var(--paper); overflow: hidden; font-size: 12px; font-weight: 700; letter-spacing: .032em; text-transform: uppercase; }
.ticker__track { display: flex; width: max-content; animation: slide 38s linear infinite; }
.ticker__group { display: flex; align-items: center; gap: 18px; padding: 10px 9px; }
.ticker__group i { font-style: normal; color: var(--orange); }
@keyframes slide { to { transform: translateX(-50%); } }
```

### 6.2 Navigation

A sticky bar with **no background**. Items float as white outlined pills: the logo pill left, link pills centre, a solid CTA and a round "+" toggle right.

```css
.nav { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 50; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 12px; padding: 14px var(--gutter); pointer-events: none; }
.nav > * { pointer-events: auto; }
.nav__brand { justify-self: start; display: inline-flex; padding: 9px 18px; border: var(--line); border-radius: var(--r-pill); background: var(--paper); transition: transform .2s cubic-bezier(.3,1.6,.6,1); }
.nav__brand:hover { transform: rotate(-3deg); }
.nav__brand img { height: 26px; width: auto; }
.nav__links { display: flex; gap: 4px; }
.nav__toggle { display: none; width: 44px; height: 44px; border: var(--line); border-radius: 50%; background: var(--paper); font: 700 26px/1 var(--font-ui); transition: transform .25s cubic-bezier(.3,1.6,.6,1); }
.nav__toggle[aria-expanded="true"] { transform: rotate(45deg); background: var(--sun); }  /* "+" becomes "×" */
.nav__drawer { grid-column: 1 / -1; display: flex; flex-direction: column; gap: 6px; padding: 12px; border: var(--line); border-radius: var(--r-card); background: var(--paper); }
```

On a page whose first band is coloured, give `body` that colour so the strip behind the transparent nav blends in.

### 6.3 Buttons

| Variant | Fill | Text | Hover |
|---------|------|------|-------|
| `.btn--solid` (primary) | `--ink` | `--paper` | fill `#2A2724` |
| `.btn--ghost` (secondary) | `--paper` | `--ink` | fill `--sun` |
| `.btn--light` (on dark or violet) | `--paper` | `--ink` | fill `--sun` |

```css
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 18px; border: var(--line); border-radius: var(--r-pill); background: var(--btn-bg, var(--paper)); color: var(--btn-fg, var(--ink)); font: 700 13px/1 var(--font-ui); letter-spacing: .032em; text-transform: uppercase; text-decoration: none; white-space: nowrap; cursor: pointer; transition: transform .18s cubic-bezier(.3,1.6,.6,1), background-color .18s, color .18s; }
.btn:hover  { transform: translateY(-2px) rotate(-1.5deg); }
.btn:active { transform: translateY(0) scale(.97); }
.btn--solid { --btn-bg: var(--ink); --btn-fg: var(--paper); }
.btn--solid:hover { --btn-bg: #2a2724; }
.btn--ghost:hover, .btn--light:hover { --btn-bg: var(--sun); }
.btn--lg { padding: 18px 26px; font-size: 14px; }
.btn--block { width: 100%; }
```

Button copy is a short verb phrase: "Meld je aan", "Stel voor", "Kies Honk".

### 6.4 Pill link (nav and footer links)

```css
.pill { display: inline-flex; align-items: center; padding: 12px 16px; border: var(--line); border-radius: var(--r-pill); background: var(--paper); font-size: 12px; font-weight: 700; letter-spacing: .032em; text-transform: uppercase; text-decoration: none; white-space: nowrap; transition: background-color .18s, transform .18s cubic-bezier(.3,1.6,.6,1); }
.pill:hover { background: var(--sun); transform: rotate(-2deg); }
```

### 6.5 Eyebrow, tag, chips, dot

```css
/* Section label above every H2: white pill with a small orange dot */
.eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; border: var(--line); border-radius: var(--r-pill); background: var(--paper); color: var(--ink); font-size: 12px; font-weight: 700; letter-spacing: .032em; text-transform: uppercase; }
.eyebrow::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--orange); border: var(--line); }

/* Category label inside a card */
.tag { display: inline-block; padding: 6px 12px; border: var(--line); border-radius: var(--r-pill); background: var(--paper); color: var(--ink); font-size: 12px; font-weight: 700; letter-spacing: .032em; text-transform: uppercase; }

/* Example chips at the bottom of a card (sentence case, not uppercase) */
.chips { display: flex; flex-wrap: wrap; gap: 6px; margin: auto 0 0; padding: 8px 0 0; list-style: none; }
.chips li { padding: 6px 11px; border: var(--line); border-radius: var(--r-pill); background: var(--paper); color: var(--ink); font-size: 13px; font-weight: 600; }
.chips .chips__more { background: var(--ink); color: var(--paper); }   /* "+5" */

.dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; border: var(--line); background: var(--mint); }
```

Eyebrows and tags always set `color: var(--ink)` explicitly. They sit on white, so they must not inherit white text from a violet or dark parent.

### 6.6 Form fields

```css
.field { width: 100%; min-width: 0; padding: 14px 16px; border: var(--line); border-radius: 14px; background: var(--paper); color: var(--ink); font: 500 16px/1.2 var(--font-ui); letter-spacing: -.01em; }
.field::placeholder { color: #8a817a; }
.field:focus { outline: 2px solid var(--ink); outline-offset: 1px; background: #fffdf8; }
.field--pill { border-radius: var(--r-pill); padding: 18px 22px; }
.field[aria-invalid="true"] { background: #fff1ec; border-color: var(--orange); }
.field-group { display: flex; flex-direction: column; gap: 6px; }
.field-group label { font-size: 12px; font-weight: 800; letter-spacing: .032em; text-transform: uppercase; }
.optional { font-weight: 600; text-transform: none; letter-spacing: 0; color: #6b625b; }
.field-error { font-size: 13px; font-weight: 700; color: #b8360a; }
```

**Inline signup** (hero and closing section): one white outlined pill containing a borderless pill input and a solid button. It stacks below 520px.

```css
.quick-signup { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 6px; max-width: 540px; padding: 6px; border: var(--line); border-radius: var(--r-pill); background: var(--paper); }
.quick-signup .field--pill { border-color: transparent; padding-block: 14px; }
```

**Choice chips** (checkbox pills): white pill with a "+" in front; checked state is `--sun`, a "✓", and a `rotate(-2deg)` tilt.

```css
.role span { display: inline-flex; gap: 6px; padding: 9px 14px; border: var(--line); border-radius: var(--r-pill); background: var(--paper); font-size: 14px; font-weight: 600; transition: background-color .15s, transform .2s cubic-bezier(.3,1.6,.6,1); }
.role span::before { content: "+"; font-weight: 800; width: 12px; text-align: center; }
.role:hover span { background: var(--mist); }
.role input:checked + span { background: var(--sun); transform: rotate(-2deg); }
.role input:checked + span::before { content: "✓"; }
```

**Selects** use `appearance: none` with an inline SVG chevron (stroke `#0d0c0b`, width 2.5) at `right 14px center / 16px`.

### 6.7 Cards

All cards: coloured or white fill, `var(--line)` outline, large radius, no shadow.

**Feature card (pillar):** coloured fill, a sticker that overflows the top-right corner, a tag, an 800-weight title and chips at the bottom.

```css
.pillar { position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 14px; padding: 28px 26px 26px; border: var(--line); border-radius: 40px; transition: transform .35s cubic-bezier(.3,1.5,.5,1); }
.pillar:nth-child(odd)  { transform: rotate(-1.2deg); }
.pillar:nth-child(even) { transform: rotate(1.2deg) translateY(18px); }
.pillar:hover { transform: rotate(0) translateY(-8px); }
.pillar__sticker { position: absolute; top: -56px; right: -8px; width: 116px; transform: rotate(10deg); transition: transform .4s cubic-bezier(.3,1.6,.5,1); }
.pillar:hover .pillar__sticker { transform: rotate(-4deg) scale(1.08); }
```

Fills in order: lavender, mint, sun, blue. Leave `padding-top: 40px` on the grid so the stickers have room.

**Step card:** white, 40px radius, a huge orange outlined numeral top-left and a sticker top-right. Numbering is only for real sequences.

```css
.step__num { font-family: var(--font-display); font-weight: 800; font-variation-settings: "wdth" 75, "opsz" 96; font-size: clamp(120px,12vw,180px); line-height: .75; color: var(--orange); -webkit-text-stroke: 1px var(--ink); }
```

**Listing card** (product preview, "Kajak · Te leen · 150 m"): white, 22px radius, `overflow: hidden`; a coloured media area (`aspect-ratio: 1/.8`, `border-bottom: var(--line)`, sticker at 72% width tilted −6°); body with an 800/16px title, a micro type pill (`--mist`, 10px uppercase) and a distance in tabular numbers. An end card in `--ink` with a display-type label ("En nog veel meer") and a pin sticker closes the grid.

**Rail card** (categories): `width: clamp(250px, 24vw, 340px)`, `aspect-ratio: 3/4`, 36px radius, coloured fill, content bottom-aligned, sticker at 60% width top-centre tilted −8°, a round white count badge top-right (`74px`, rotated 12°, display-type number over a micro label), a display-type title `clamp(32px, 2.8vw, 44px)` and chips. Cards tilt individually (`--tilt` from −2° to +2°).

**Small cards** (perk, FAQ item, note): white, 20px radius. A perk has a 44px coloured icon circle with a 22px stroke icon (stroke 2, `--ink`, round caps).

**Plan card** (pricing): white, 40px radius. The premium variant is `--violet` with white text and a sticker overlapping the top-right. The price uses display type `clamp(48px, 5vw, 72px)` between two 1px rules; the feature list uses round 22px check bullets (mint, or sun on violet).

**Dictionary card** (defining a term): sun fill, 40px radius, `rotate(1.5deg)`, a giant display word, an italic "word (de; m)" line and a numbered sense list.

### 6.8 Badge (rotating stamp)

A sun-yellow circle with an outline and a spinning text ring around an orange core. Use it for "Wachtlijst open" or "Vroege toegang".

```html
<div class="badge" aria-hidden="true">
  <svg viewBox="0 0 200 200" class="badge__ring">
    <defs><path id="badge-circle" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"/></defs>
    <text><textPath href="#badge-circle" textLength="440" lengthAdjust="spacing">Wachtlijst open ✦ Wachtlijst open ✦</textPath></text>
  </svg>
  <span class="badge__core">Vroege<br>toegang</span>
</div>
```

```css
.badge { position: absolute; width: clamp(92px, 11vw, 160px); aspect-ratio: 1; display: grid; place-items: center; border: var(--line); border-radius: 50%; background: var(--sun); transform: rotate(-10deg); }
.badge__ring { position: absolute; inset: 0; width: 100%; height: 100%; animation: spin 18s linear infinite; }
.badge__ring text { font: 800 17px var(--font-ui); letter-spacing: .1em; text-transform: uppercase; fill: var(--ink); }
.badge__core { width: 52%; aspect-ratio: 1; display: grid; place-items: center; border: var(--line); border-radius: 50%; background: var(--orange); font-family: var(--font-display); font-weight: 800; font-variation-settings: "wdth" 75, "opsz" 96; font-size: clamp(13px, 1.5vw, 21px); line-height: .85; text-align: center; text-transform: uppercase; }
@keyframes spin { to { transform: rotate(360deg); } }
```

Keep the ring text to about 30 characters and always set `textLength="440"` so it closes the circle exactly.

### 6.9 Stat sticker

A sun circle (`clamp(130px, 13vw, 180px)`, `rotate(-12deg)`) with a display number `clamp(56px, 6vw, 84px)` over an 11px/800 uppercase unit. Always add a footnote with the source (e.g. "*SCP, Nederlanders van 12 jaar en ouder."). Never invent statistics.

### 6.10 Display strikethrough

For "old way → new way" statements: the old word gets a thick white bar with an ink outline, rotated −4°.

```css
.strike { position: relative; width: fit-content; }
.strike::after { content: ""; position: absolute; left: -3%; right: -3%; top: 44%; height: .1em; border-radius: var(--r-pill); background: var(--paper); border: var(--line); transform: rotate(-4deg); }
```

### 6.11 Video card

Outlined, 40px radius, `overflow: hidden`, `rotate(3deg)`, square `object-fit: cover` video (autoplay, muted, loop, playsinline, poster), and a white pill label bottom-left. Pause the video when it's off-screen or the tab is hidden.

### 6.12 FAQ accordion

Native `<details>`: white, 20px radius, outlined. The summary is 700 weight at `clamp(17px, 1.5vw, 20px)` with a 34px round "+" (peach fill) that rotates 45° into "×" and turns sun when open. The answer is `#2E2925`, max `60ch`. On desktop the section heading column is `position: sticky; top: 110px`.

### 6.13 Big-word marquee (reel)

Full-bleed white strip with ink top and bottom borders. Display words `clamp(56px, 8vw, 128px)` alternate with stickers `clamp(60px, 8vw, 124px)` tall, rotated −9° and +8°. 90s linear loop, paused on hover. Provide an `.sr-only` sentence with the same words.

### 6.14 Street scene

A row of inflatable Dutch canal houses standing on a peach "pavement" strip:

```css
.street { display: flex; align-items: flex-end; justify-content: space-between; width: min(94vw, 1320px, calc(54vh * 3.033)); margin-inline: auto; }
.house { flex: none; width: var(--hw); }            /* each house: its source width / total row width */
.house img { width: 100%; transform-origin: 50% 100%; }
.scene__pavement { height: clamp(28px, 4.5vh, 52px); background: var(--peach); border-top: var(--line); }
```

Houses sit on the pavement's top border. On phones the street is `250vw` wide and pans sideways as you scroll.

### 6.15 Footer ("Straat")

Sky band with the logo large and centred (`width: min(100%, 760px)`), the core line in 700 weight, pill links with a solid CTA, a contact line, then a row of six small houses (`clamp(120px, 15vw, 210px)` tall) that inflate when the footer scrolls into view, standing on a peach pavement that holds the legal line (13px/600, `#4D4640`). The logo is on sky, never on black.

---

## 7. Imagery

### 7.1 Principles

- **Only 3D inflatable objects.** Every illustration is a chunky, puffy, balloon-like object with a matte, grainy, soft-touch surface, like a pool toy, lit softly from the front.
- **One dominant palette colour per object**, with small black and white details. Colours come from §2 only.
- **Die-cut sticker border** on all stickers: 16px white plus 4px ink outline at 640px image size (see §7.4). Houses and ribbons have **no** border.
- **Composition is collage-like:** stickers overlap card edges and headline corners, rotated between −18° and +18°, never grid-aligned.
- **No photography, no flat icons, no emoji.** Small UI icons (perks) are simple 2px stroke line icons.

### 7.2 Asset types

| Asset | Look | Where |
|-------|------|-------|
| Hobby stickers | Inflatable object + die-cut border, transparent WebP ≤ 640px | Card corners, marquee, listing media, around headlines |
| Ribbon | One continuous thick velvety tube in `#F5561A`, looping | Behind headlines and card groups, max ~56% of the container width; small (≤ 20vw) as a "cloud". Never covers text. |
| Houses | Quilted inflatable Dutch canal houses, one pastel colour each, each holding a hobby object | Street scenes, footer |
| Shop house | Same style, wider, violet facade, striped orange and white awning, hobby gear in the window | Business pages |
| Video loop | Two inflatable smiley balloon "buddies" bouncing on flat `#4DA2FF`, 5s seamless loop | Video card |

### 7.3 Generation prompts (Higgsfield · GPT Image 2)

Settings for stickers: model `gpt_image_2`, `background: transparent`, `quality: high`, `resolution: 1k` (`2k` for hero objects), `aspect_ratio: 1:1`.

**Sticker template:**

```
A cute chunky 3D inflatable {OBJECT}, puffy balloon-like rounded forms as if pumped full of air,
matte grainy soft-touch texture, {COLOURS}, soft diffused studio lighting, playful toy-like
collectible sticker object, three-quarter view slightly tilted. Isolated on a fully transparent
background, no floor, no drop shadow, no text.
```

`{COLOURS}` examples used on the site:

| Object | Colours |
|--------|---------|
| Acoustic guitar | main colour sunflower yellow #FFD731 with small black and white details |
| Vintage 35mm film camera | electric blue #4DA2FF with black lens and small white details |
| Camping dome tent | mint green #55DB9C with small black and white details |
| Painter's palette + brush | soft lavender #E9CCFF, paint blobs orange #F5561A, blue #4DA2FF, yellow #FFD731, black brush handle |
| Skateboard | deck violet #5C4ADE, sunflower yellow #FFD731 wheels, black grip |
| Cordless drill | vivid orange #F5561A with black grip and battery |
| Potted monstera | leaves mint green #55DB9C, pot vivid orange #F5561A |
| Padel racket + ball | racket electric blue #4DA2FF, black handle, ball sunflower yellow #FFD731 |
| Ball of yarn + needles | yarn soft lavender #E9CCFF, needles violet #5C4ADE with yellow tips |
| Magnifying glass | handle and rim sunflower yellow #FFD731, pale blue lens |
| Two smiley balloon friends | one vivid orange #F5561A, one sunflower yellow #FFD731, simple black faces |
| Map pin with heart | vivid orange #F5561A with a white heart |
| Paint roller | roller mint green #55DB9C, handle violet #5C4ADE |
| Kayak + paddle | hull sunflower yellow #FFD731, black seat, paddle violet #5C4ADE |
| Sewing machine + spool | soft lavender #E9CCFF, violet #5C4ADE details, orange #F5561A spool |
| Telescope on tripod | tube electric blue #4DA2FF, black tripod, yellow details |
| Carabiner + coiled rope | carabiner vivid orange #F5561A, rope mint green #55DB9C with violet flecks |
| Pair of dice | one electric blue #4DA2FF, one sunflower yellow #FFD731, white and black pips |
| Theatre masks | happy mask yellow #FFD731, sad mask orange #F5561A, violet ribbon |
| Stack of books + pencil | lavender, blue and mint books, yellow pencil |
| City bicycle | frame vivid orange #F5561A, black tyres, mint green basket and saddle |

**Ribbon** (16:9, 2k, transparent):

```
One single continuous thick inflatable 3D tube, vivid orange color exactly #F5561A, swooping across
the frame in a big playful looping curve with one loop and one twist, like a giant inflated
pool-noodle sculpture. Matte soft-touch surface with fine grainy, slightly fuzzy velvet texture,
soft diffused studio lighting, gentle soft shading in darker orange, no gloss, no reflections.
Isolated object on a fully transparent background, no floor, no drop shadow, no text.
```

(Knot variant: "tied in one big loose playful knot with a large open loop, both ends curling upward, diagonal composition".)

**Houses** (21:9, 2k, transparent). Keep the gaps so each house can be cut out:

```
Six separate narrow Dutch canal houses standing in one row on the same flat baseline, with a clear
gap of empty space between every house so that no house touches another and nothing crosses the
gaps. Each house is a chunky 3D inflatable balloon-like form with a matte grainy soft-touch texture,
stepped or bell gable, white window frames and a black door, straight front view. From left to
right: 1) soft peach house #FFC9A8 with a sunflower-yellow kayak leaning upright against its facade,
2) mint green house #55DB9C with a lavender sewing machine visible in its large ground-floor window,
3) soft lavender house #E9CCFF with a blue telescope on its small balcony, 4) electric blue house
#4DA2FF with a yellow acoustic guitar leaning next to its front door, 5) sunflower yellow house
#FFD731 with a coiled mint climbing rope and an orange carabiner hanging beside its door, 6) vivid
orange house #F5561A with a small bicycle parked in front of it. Playful toy-like diorama, soft
diffused studio lighting. Isolated on a fully transparent background, no ground, no sky, no shadows,
no text.
```

To add a building in the same style, pass an existing house as an image reference and start the prompt with "in exactly the same quilted, puffy inflatable style, texture and lighting as the reference house".

**Video loop** (Kling 3.0, pro, 5s, 1:1, sound off, same image as start and end frame): place the subject at about 66% of the frame on flat `#4DA2FF`. Prompt: "…bounce happily in place with squishy, springy inflatable motion… Static locked-off camera, the flat solid blue background stays perfectly clean and unchanged, no new objects, smooth seamless loop." Export 720×720 H.264 MP4 (CRF 24, faststart) and VP9 WebM (CRF 36), plus a JPG poster from frame 0.

### 7.4 Die-cut border (Python / Pillow)

```python
from PIL import Image, ImageFilter

def dilate(mask, r):
    m = mask.filter(ImageFilter.GaussianBlur(r / 2))
    return m.point(lambda v: 255 if v > 6 else 0).filter(ImageFilter.GaussianBlur(0.8))

def die_cut(src, dst, maxw=640, W=16, B=4):
    im = Image.open(src).convert("RGBA")
    im = im.crop(im.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox())
    im.thumbnail((maxw, maxw), Image.LANCZOS)
    s = maxw / 640; W = round(W * s); B = max(3, round(B * s))
    pad = W + B + 10
    c = Image.new("RGBA", (im.width + 2 * pad, im.height + 2 * pad), (0, 0, 0, 0))
    c.alpha_composite(im, (pad, pad))
    a = c.getchannel("A").point(lambda v: 255 if v > 40 else 0)
    white = dilate(a, W); black = dilate(white, B)
    out = Image.new("RGBA", c.size, (0, 0, 0, 0))
    out.paste((13, 12, 11, 255), mask=black)      # ink outline #0D0C0B
    out.paste((255, 255, 255, 255), mask=white)   # white sticker border
    out.alpha_composite(c)
    out.crop(out.getchannel("A").getbbox()).save(dst, "WEBP", quality=86, method=6)
```

Delivery: WebP with alpha, quality 84–86. Stickers ≤ 640px (hero objects ≤ 960px), ribbons ≤ 2400px wide, houses at native cut-out size (~350–400px wide). Always set `width` and `height` attributes. Decorative images get `alt=""`.

---

## 8. Motion

Motion is **springy, toy-like and never required to read the page.**

### 8.1 Easing and durations

| Name | Curve | Duration | Use |
|------|-------|----------|-----|
| Spring hover | `cubic-bezier(.3,1.6,.6,1)` | .18–.25s | Buttons, pills, logo pill, toggles |
| Card lift | `cubic-bezier(.3,1.5,.5,1)` | .35s | Cards straighten and lift on hover |
| Sticker wiggle | `cubic-bezier(.3,1.6,.5,1)` | .4s | Sticker inside a hovered card: `rotate(-4…-6deg) scale(1.08)` |
| Pop-in | `cubic-bezier(.2,1.5,.4,1)` | .8s | Stickers and badges appearing: `scale .2 → 1` |
| Inflate | `cubic-bezier(.3,1.25,.5,1)` | .95s | Houses on load or on view, staggered 110–120ms |

### 8.2 Keyframes

```css
@keyframes slide   { to { transform: translateX(-50%); } }                        /* ticker 38s, reel 90s, linear */
@keyframes bob     { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-4%) rotate(3deg); } }  /* 7s ease-in-out, floating stickers */
@keyframes pop     { 0% { scale: .2; opacity: 0; } 60% { opacity: 1; } 100% { scale: 1; opacity: 1; } }
@keyframes spin    { to { transform: rotate(360deg); } }                          /* badge ring 18s linear */
@keyframes inflate {
  0%   { transform: scale(.55, .04); opacity: 0; }
  12%  { opacity: 1; }
  55%  { transform: scale(1.03, 1.08); }
  78%  { transform: scale(.99, .97); }
  100% { transform: none; opacity: 1; }
}                                                                                  /* transform-origin: 50% 100% */
@keyframes cue-bounce { 0%,100% { transform: translateY(-2px); } 50% { transform: translateY(3px); } }  /* 1.6s, scroll hint arrow */
```

### 8.3 Scroll-driven scenes

Build them with a tall wrapper, a `position: sticky; top: 0; height: 100vh` stage, and JavaScript that maps scroll progress `p` (0 → 1) to CSS custom properties. No scroll libraries.

```js
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const seg = (p, a, b) => clamp01((p - a) / (b - a));            // progress within a window
const easeOutBack = (t) => 1 + 2.4 * (t - 1) ** 3 + 1.4 * (t - 1) ** 2;
const easeInOut = (t) => (t < .5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

// Inflate an image from a flat puddle to full size, with a wobble
function inflate(img, t) {
  if (t <= 0) { img.style.opacity = "0"; img.style.transform = "scale(0.55, 0.04)"; return; }
  if (t >= 1) { img.style.opacity = "1"; img.style.transform = "none"; return; }
  const sx = 0.55 + 0.45 * easeOutBack(Math.min(1, t * 1.2));
  const sy = 0.04 + 0.96 * easeOutBack(t);
  img.style.opacity = String(Math.min(1, t * 5));
  img.style.transform = `scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;
}
// pinned progress: p = clamp01(-rect.top / (rect.height - innerHeight))
```

**Hero "cards fly home"** (wrapper 290vh; pinned only when ≥ 1000×700):

| Progress window | What happens |
|-----------------|--------------|
| 0–0.05 | Scroll hint fades out |
| 0.02–0.20 | Copy fades and moves up 70px |
| 0.05–0.35 | Background `--paper` → `--sky` (`color-mix` with `--sky-mix`) |
| 0.04–0.36 | Street rises from `translateY(110%)` to 0 |
| 0.28 + i·0.07 (window 0.14) | House *i* inflates |
| 0.22 + i·0.07 (window 0.26) | Card *i* flies to above house *i*: translate + scale to ≤ 0.7 + a −60px sine hop, rotation settles at ±4° |
| 0.80–0.94 | Closing caption ("Allemaal in jouw straat.") fades in just above the landed cards |

**Horizontal rail** (categories): wrapper height = track overflow + 100vh; pinned stage; `translateX(-overflow × p)`; a pill progress bar fills with `scaleX(p)`. Below 1000px it becomes native horizontal swipe with `scroll-snap-type: x mandatory`.

**Parallax:** elements with `data-depth` get `--py = (elementCenter − viewportCenter) × depth` (depth −0.08 … 0.28; negative = slower background). Hero stickers may also drift sideways with the pointer: `--px = (pointerX / stageWidth − 0.5) × amount`, with an amount between −26 and 26, so at most ±13px (`pointer: fine` only).

**On view:** street rows start at `scale(.55,.04); opacity: 0` (class `is-waiting`) and run `inflate` when an IntersectionObserver reports 25% visible.

### 8.4 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
  .ticker__track, .reel__track { animation: none; }
  .ticker, .reel { overflow-x: auto; }
}
```

In JavaScript, skip all scroll scenes and parallax, and show final states: houses visible, cards in their grid, no pinning.

---

## 9. Voice and copy

- **Language:** Dutch, informal *je/jij*. Warm, direct, a little cheeky.
- **Short sentences.** No asides between em-dashes, no "not X but Y" constructions, no stacked adjectives.
- **Headlines** are complete short sentences ending in a full stop or question mark, set in display type:
  "Jouw straat heeft een kajak." · "Wat wil je vandaag uitproberen?" · "Kies het. Vind het. Doe het." · "Wees er vroeg bij." · "Goede vragen." · "Tot snel in je straat."
- **Eyebrows** name the section: "Wat is Hobbre?", "Hoe het werkt", "Vragen".
- **Buttons** are verb phrases: "Meld je aan", "Stel voor", "Meld je bedrijf aan".
- **Ticker items** are 2–6 words: "Wachtlijst nu open ✦ We starten in Utrecht ✦ Lenen in plaats van kopen".
- **Errors** say what's wrong and how to fix it: "Dat e-mailadres klopt niet helemaal. Check het even en probeer het opnieuw."
- **Success messages** confirm and offer a next step: "Je staat op de lijst! Vertel ons waar je van houdt →".
- **Honesty:** no fake testimonials, user counts or stats. Every number has a source line. Mark illustrative data as examples ("Voorbeeld").
- **Core line:** "Ruil schermtijd in voor mensentijd."

---

## 10. Accessibility

- Visible focus everywhere: `:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }`.
- Skip link as the first element (black pill, appears at `top: 12px` on focus).
- Marquees: `role="marquee"` with an `aria-label`, the moving copy `aria-hidden="true"`, plus an `.sr-only` text version.
- Decorative stickers, ribbons and houses: `alt=""` / `aria-hidden="true"`. Illustrative scenes get one `role="img"` with a descriptive `aria-label`.
- Forms: real `<label>`s, `aria-invalid` plus an `aria-describedby` error, `role="status"` / `aria-live="polite"` for results.
- Pinned scenes move keyboard focus into view (scroll the page to the card that received focus).
- `[hidden] { display: none !important; }` so components with `display: flex` still hide.
- Test at 375px, 1024×768 and 1440×900 and a tall 1920×1010 screen. The page body never scrolls sideways.

---

## 11. Starter CSS

Paste after the tokens in §2 to give any site the Hobbre foundation. Component CSS is in §6.

```css
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 96px; }
body {
  margin: 0; background: var(--paper); color: var(--ink);
  font-family: var(--font-ui); font-weight: 500; font-size: var(--text-body);
  line-height: 1.5; letter-spacing: -0.01em;
  -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; overflow-x: clip;
}
img, video { display: block; max-width: 100%; height: auto; }
[hidden] { display: none !important; }
a { color: inherit; }
h1, h2, h3, h4, p { margin: 0; }
h2, h3 { text-wrap: balance; }
p { text-wrap: pretty; }
:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
.sr-only { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }

.wrap { width: 100%; max-width: var(--max); margin-inline: auto; padding-inline: var(--gutter); }
.band { position: relative; padding-block: var(--band-pad); overflow-x: clip; }
.band--peach { background: var(--peach); } .band--white { background: var(--paper); }
.band--orange { background: var(--orange); } .band--sky { background: var(--sky); }
.band--lavender { background: var(--lavender); } .band--violet { background: var(--violet); color: var(--paper); }

.display { font-family: var(--font-display); font-weight: 800; font-stretch: 75%; font-variation-settings: "wdth" 75, "opsz" 96; text-transform: uppercase; line-height: .8; letter-spacing: -.005em; }
.display > span { display: block; }
.display--lg { font-size: clamp(64px, 10vw, 160px); }
.display--xl { font-size: clamp(72px, 11.5vw, 190px); }
.display--xxl { font-size: clamp(80px, 15vw, 240px); }
.lede { font-size: var(--text-sub); line-height: 1.3; max-width: 34ch; }

.section-head { display: flex; flex-direction: column; align-items: flex-start; gap: 24px; margin-bottom: clamp(48px, 6vw, 88px); }
.section-head--center { align-items: center; text-align: center; }

.card { position: relative; padding: 28px 26px 26px; border: var(--line); border-radius: var(--r-card-lg); background: var(--paper); transition: transform .35s cubic-bezier(.3,1.5,.5,1); }
.card:hover { transform: rotate(0) translateY(-8px); }
.cards { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(14px, 1.6vw, 24px); padding-top: 40px; }
.cards > :nth-child(odd)  { transform: rotate(-1.2deg); }
.cards > :nth-child(even) { transform: rotate(1.2deg) translateY(18px); }
@media (max-width: 1100px) { .cards { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 72px; } }
@media (max-width: 620px)  { .cards { grid-template-columns: 1fr; row-gap: 64px; } .cards > :nth-child(even) { transform: rotate(1.2deg); } }

.sticker { position: absolute; left: var(--x); top: var(--y); width: var(--w); z-index: 4; transform: translate3d(var(--px, 0px), var(--py, 0px), 0) rotate(var(--r, 0deg)); pointer-events: none; }
.sticker img { width: 100%; animation: bob 7s ease-in-out infinite; }
```

---

## 12. Restyle checklist

Go through this list when converting an existing site.

**Foundation**
- [ ] Google Fonts link added; `--font-display` and `--font-ui` applied.
- [ ] §2 tokens pasted; old brand colours mapped to tokens (no stray hex values).
- [ ] All `box-shadow`, `drop-shadow` and gradients removed.
- [ ] `body` background set explicitly; no sideways scroll at 375px.

**Structure**
- [ ] Sections converted to full-bleed bands following §4.2; no dividers or `<hr>` between sections.
- [ ] Each section starts with an eyebrow pill + display H2.
- [ ] Content in `.wrap` (max 1440px, fluid gutter).

**Components**
- [ ] Nav: transparent sticky bar with white outlined pills; logo inside a white pill; "+" drawer below 1180px.
- [ ] Buttons: pills with a 1px ink outline; primary is black; hover springs and tilts.
- [ ] Cards: 1px ink outline, 20–40px radius, pastel or sticker-colour fills, alternating ±1.2° tilt, sticker poking out of a corner.
- [ ] Inputs: 14px radius or pill, 1px outline, uppercase 12px labels.
- [ ] FAQ: `<details>` cards with the rotating "+".
- [ ] Footer: light band (sky or peach) with the logo; never black.

**Imagery**
- [ ] Photos and icons replaced by inflatable 3D stickers with the die-cut border.
- [ ] One ribbon max per section, behind content, never over text.
- [ ] Every display headline has a sticker, badge or ribbon near it.

**Motion and accessibility**
- [ ] Hover springs, pop-ins and the marquee in place; scroll scenes optional.
- [ ] `prefers-reduced-motion` stops everything.
- [ ] Focus rings visible; decorative images `alt=""`; contrast per §2.3.

**Copy**
- [ ] Dutch, *je/jij*, short sentences, uppercase labels, no invented numbers.

---

## 13. Prompt for an AI coding agent

```
Restyle this website to match the attached DESIGN.md exactly (Hobbre "inflatable sticker book"
style). Follow §1 non-negotiable rules strictly: logo never on black, no gradients, no shadows,
1px #0D0C0B outlines on all cards and controls, pill-shaped buttons with a black primary CTA,
uppercase condensed display headlines (Bricolage Grotesque 800, wdth 75, opsz 96, line-height 0.8)
and Figtree for UI. Paste the §2 tokens and §11 starter CSS, convert sections into full-bleed
colour bands in the §4.2 order, rebuild components per §6, replace imagery with 3D inflatable
die-cut stickers per §7, add the §8 motion with reduced-motion support, and rewrite copy per §9.
Keep all existing content and functionality. Finish by running the §12 checklist and report any
item you could not meet.
```

---

## 14. Source files in this repository

| File | Contains |
|------|----------|
| `styles.css` | Tokens, base, type, buttons, fields, ticker, nav, bands, stickers, cards, FAQ, signup |
| `heroes.css` | Hero layouts, listing cards, street scene and scroll-scene styles |
| `categories.css` | Category colours and the category rail |
| `footers.css` | Footer variants ("Straat" is live) |
| `bedrijven.css` | Business page: inflating street hero, dictionary card, offers, plans |
| `main.js` | Forms, parallax, scroll scenes, rail, inflate-on-view, reduced motion |
| `assets/img/cut/` | Die-cut stickers |
| `assets/img/houses/` | House cut-outs and the Honk shop |

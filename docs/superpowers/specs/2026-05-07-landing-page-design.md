# Design Spec: Landing Page Praxis Schleich — ADHS-Diagnostik

**Datum:** 2026-05-07
**Auftraggeber:** Yves Schleich (Tech + Marketing)
**Für:** Dipl.-Psych. Katarina Schleich (Praxis Frankfurt-Westend, Rappstr. 7-9)
**Zweck:** Marketing-getriebene Hauptseite für das ADHS-Diagnostik-Angebot
**Begleitdokumente:** [MARKET-RESEARCH.md](../../../MARKET-RESEARCH.md), [STRATEGY-DOSSIER.md](../../../STRATEGY-DOSSIER.md)

---

## 1. Ziel und Erfolgskriterien

### 1.1 Ziel
Eine eigenständige Landing Page (`/adhs` oder `/`), die qualifizierten Traffic in zwei messbare Conversions führt: **(a) ASRS-Selbsttest gestartet** und **(b) Diagnostik-Termin gebucht**. Die Seite ist explizit **marketing-getrieben** strukturiert: Sektionsreihenfolge folgt Conversion-Logik, nicht Praxis-Konvention. Design folgt funktionaler Conversion-Mechanik (siehe Abschnitt 4) — die Marketing-Referenz ist GAM Medical (gam-medical.de), HVL (psychotherapie-hvl.de) wurde im Brainstorming als ästhetische Referenz erwogen, aber zugunsten der GAM-orientierten „Modern Clinical"-Sprache verworfen.

### 1.2 Erfolgskriterien
- **Funktional:** Seite lädt unter 1s auf 4G, vollständig responsive ab 360px Breite, lighthouse-Performance ≥ 95, A11y-Score ≥ 95.
- **SEO-technisch:** sauberes semantisches HTML, JSON-LD `MedicalClinic` + `Person` Schema, Meta + OpenGraph komplett.
- **Marketing-Validation:** Annahme A9 (ASRS-Test → Booking ≥ 3%) und A11.1 (Hauptseite vs. Frauen-Cluster) sollen über diese Seite und ihre Schwester-LP testbar werden.
- **Compliance:** HWG-konform (kein Heilversprechen, kein Garantieanspruch), DSGVO-sauber (keine Tracking-Cookies ohne Consent, ASRS-Test ohne E-Mail-Pflicht), MDR-Schwellwert eingehalten (ASRS als Screening, nicht Diagnose).

### 1.3 Out of Scope für diese Spec
- Buchungssystem-Implementierung (separate Komponente, eigener Phase)
- Frauen-Cluster-LP `/spaetdiagnose-frauen` (eigene Spec, baut auf dieser auf)
- Backend für E-Mail-Capture (separater Phase)
- Sample-Gutachten-Anonymisierung (Content-Aufgabe für Kata, nicht Tech)

---

## 2. Strategische Entscheidungen (gelockt im Brainstorming)

| Entscheidung | Wahl | Begründung |
|---|---|---|
| Hero-Botschaft | **Wartezeit-Pain (B) + Hybrid-Position (C) sekundär** | Wartezeit-Pain ist universell anschlussfähig und nutzt den stärksten strukturellen Treiber (Hessen 13 Mo.). Frauen-Fokus geht auf separate LP, weil A11.1 unvalidiert. |
| Lead-Magnet-Strategie | **ASRS-6 + USP-getriebene Ergebnis-Seite** | Test ist Marktstandard. Ergebnis-Seite ist die Marketing-Bühne — dort kommuniziert die Seite den Anschluss-USP im Pain-Peak. |
| Trust-Aufbau | **Kata als Person + Frankfurt-Westend-Verankerung** | GAM ist anonym + ortlos. Mensch + Ort sind Anti-GAM-Hebel mit größtem Asymmetrie-Vorteil. |
| Anschluss-USP-Position | **Mid-Section mit weicher Sprache** | HWG-sicher (kein Garantieversprechen), robust gegen Validation-Plan E1. |
| Design-Sprache | **Modern Clinical (B)** — Sans-Serif, Pills, Trust-Items sichtbar | Marketing-Funktion vor Ästhetik. Wärme kommt über Inhalt (Kata-Foto, Tonalität), nicht über Typografie. |
| Tech-Stack | **Static HTML + Vanilla CSS, keine Frameworks** | User-Präferenz aus Memory: keine React, kein Tailwind CDN, keine Build-Pipeline für die Seite selbst. |
| Frauen-Cluster | **Separate Landingpage** `/spaetdiagnose-frauen` | Strategy-Dossier Annahme A11.1 wird mit eigener LP getestet (E3, Wo. 4–7). Nicht Teil dieser Hauptseite. |

---

## 3. Informationsarchitektur — Sektionsstruktur

12 Sektionen in 6 Funktionsgruppen, in dieser Reihenfolge gelockt:

### Gruppe 1 — Hook (sofort klar, was es bringt)
**Sektion 1: Hero · Wartezeit-Pain**
- Headline: „13 Monate auf einen Diagnostik-Termin warten? Muss nicht sein."
- Sub: „Frankfurter ADHS-Diagnostik. Online flexibel, mit echter Therapeutin in Frankfurt-Westend. Klarheit in Wochen, nicht Monaten."
- Pill (über H1): „⚡ Termine in 1–2 Wochen"
- CTA primary: „Selbsttest starten"
- CTA secondary: „Termin buchen →"
- Trust-Row unter CTAs: ✓ Festpreis ab 650 € · ✓ Approbierte Therapeutin · ✓ DSGVO-konform
- Visual rechts: Foto Kata oder Praxis-Innenraum (4/5 Aspect Ratio)

**Sektion 2: 3-Spalten-Hybrid-Wertversprechen**
- Section-Titel: „Was uns von reinen Online-Kliniken unterscheidet"
- Drei Spalten mit Icon + 1-Satz-Headline + 2-Satz-Erklärung:
  - ⚡ **Online flexibel** — Diagnostik-Module per Videosprechstunde, du bestimmst Tempo und Ort.
  - 🏛 **Echte Praxis Frankfurt** — Persönliches Erstgespräch in unserer Praxis im Westend, wenn du willst.
  - 🤝 **Anschluss mitgedacht** — Wir denken über die Diagnose hinaus. Therapie bei freier Kapazität direkt bei uns.

### Gruppe 2 — Lead-Magnet (den größten Hebel ziehen)
**Sektion 3: ASRS-Selbsttest**
- Section-Titel: „Liegt es an dir oder ist es ADHS?"
- Sub: „6 Fragen, 3 Minuten, sofort eine Einschätzung. Wissenschaftlich validiert (WHO ASRS-v1.1)."
- Disclaimer in kleiner Schrift: „Dieser Selbsttest ist ein Screening und ersetzt keine Diagnose. Bei Auffälligkeiten empfehlen wir eine professionelle Abklärung."
- Test-Komponente: Inline auf Seite, 6 Items mit 5-Stufen-Likert-Skala (nie/selten/manchmal/oft/sehr oft), Progressbar, sofortiges Ergebnis nach Submit.
- **Ergebnis-Seite (kritisch — eigene Sub-Sektion oder separate Route):**
  - Score-Anzeige (z.B. „4 von 6 Fragen mit erhöhter Auffälligkeit")
  - Kontextualisierung: „Das ist ein Hinweis, kein Urteil."
  - **USP-Pitch direkt im Pain-Peak:** „Bei uns ist Diagnostik nicht das Ende — wir denken Therapie schon mit. [Wie das funktioniert →]"
  - CTA: „Diagnostik-Termin buchen"
  - Optional E-Mail: „PDF mit deinem Ergebnis und nächsten Schritten" (separate Einwilligung, kein Hard-Gate)

### Gruppe 3 — Pain → Solution gestaffelt
**Sektion 4: Spätdiagnose-Realität**
- Headline: „Vielleicht ist es nicht ‚zu sensibel'. Vielleicht ist es ADHS."
- 3–4 Pain-Statements als Liste oder Karten:
  - „Du hast jahrelang kompensiert — und bist erschöpft."
  - „Konzentration kostet dich mehr als andere — auch wenn keiner es sieht."
  - „Du hast selbst angefangen zu zweifeln, ob da wirklich was ist."
  - „Du bist über TikTok oder eine Bekannte darauf gestoßen — und es hat dich getroffen."
- Empathische Tonalität, kein Marketing-Sprech. Brücke zur `/spaetdiagnose-frauen`-LP via dezentem Link unten („Mehr zu ADHS bei Frauen →").

**Sektion 5: Wie läuft Diagnostik ab**
- Headline: „Vier Termine. Ein klares Gutachten. Kein Rätselraten."
- 4-Schritt-Prozess als horizontale Stepper-Komponente:
  - **1. Vorgespräch (60 Min)** — Anliegen, Vorgeschichte, Erwartungen klären. Wahlweise vor Ort oder online.
  - **2. Anamnese & Tests (90 Min)** — Strukturierte Anamnese, ASRS-Vollversion, WURS-K, ggf. weitere Verfahren.
  - **3. Differenzialdiagnostik (60 Min)** — Komorbiditäten ausschließen oder einordnen (Depression, Angst, Trauma).
  - **4. Rückgabegespräch + Gutachten (60 Min)** — Ausführlicher Befund schriftlich, gemeinsame Besprechung der nächsten Schritte.
- Hinweis: „Festpreis. Mindestens ein Termin in Präsenz. Du entscheidest, ob die übrigen online oder vor Ort stattfinden."

### Gruppe 4 — USP (Whitespace #1)
**Sektion 6: Anschluss · Was nach der Diagnose passiert**
- Headline: „Wir denken Therapie schon mit."
- Body (3 Absätze, weiche Sprache):
  - „Bei den meisten Anbietern endet die Begleitung mit dem Gutachten. Bei uns nicht."
  - „Bei freier Kapazität setzen wir die Therapie direkt bei Kata fort. Wenn keine Kapazität frei ist, übergeben wir kuratiert ans FFM-Therapeut:innen-Netzwerk — du bekommst keine Liste, sondern eine begründete Empfehlung."
  - „Optional: Unser **Erste-90-Tage-Modul** (3–6 Termine, 350 €) als Brücke — Psychoedukation, Strategie-Entwicklung, Übergangsentscheidung."
- Kein Garantieversprechen explizit — Text endet auf: „Was im Einzelfall geht, klären wir im Vorgespräch transparent."

### Gruppe 5 — Trust (Mensch & Ort)
**Sektion 7: Therapeutin · Kata als Person**
- Layout: Großes Porträt-Foto links, Bio rechts.
- Bio-Inhalt:
  - Name + Approbation: „Dipl.-Psych. Katarina Schleich · Approbierte Psychologische Psychotherapeutin"
  - Schwerpunkte: „Verhaltenstherapie, Schematherapie, ADHS bei Erwachsenen"
  - Eine persönliche Note (1–2 Sätze, von Kata zu schreiben — Platzhalter in Spec)
  - Meta-Items: „Praxis seit 20XX · Kassensitz + Selbstzahler · Frankfurt-Westend"
- Tonalität: persönlich, nicht-CV-haft.

**Sektion 8: Praxis · Lokale Verankerung**
- Layout: Praxis-Foto + Adress-Karte.
- Inhalt:
  - „Praxis Schleich · Rappstr. 7-9 · 60318 Frankfurt am Main"
  - Karte (statisch, OpenStreetMap-Bild oder vergleichbar — kein Google Maps wegen DSGVO-Einbettung)
  - „Persönliches Erstgespräch wahlweise vor Ort oder online — du entscheidest."
  - Anfahrt-Hinweis: „5 Min. von der U-Bahn Westend, Parkplätze in der Rappstraße"

### Gruppe 6 — Conversion (Preis & Aktion)
**Sektion 9: Pricing**
- Headline: „Klare Preise. Kein Rechentrick."
- Zwei Preis-Karten side-by-side:
  - **Online-Kompakt — 650 €**
    - 4 Termine, davon 2 online möglich
    - Inkl. allen Tests, Gutachten, Rückgabegespräch
    - Mind. 1 Termin vor Ort
    - Geeignet für: überregional, online-bevorzugt
  - **Hybrid-Standard — 750 €** (als „Beliebt" markiert)
    - 4 Termine, mind. 2 in Präsenz
    - Inkl. allen Tests, Gutachten, Rückgabegespräch
    - Beziehung über mehrere Termine aufbauen
    - Geeignet für: FFM-lokal, persönliche Vorlieben
- Add-on darunter klein: „**Erste 90 Tage** als Anschluss-Modul: 350 € (3–6 Termine, optional)"
- Hinweis: „Selbstzahler-Leistung. Bei PKV/Beihilfe in vielen Fällen erstattungsfähig — wir stellen GOÄ-konforme Rechnung."

**Sektion 10: FAQ**
- Headline: „Häufige Fragen"
- 8–10 Q&A als Accordion (HTML `<details>`/`<summary>`, kein JS):
  1. Wer kommt zu euch in die Diagnostik?
  2. Was kostet die Diagnostik genau, gibt es versteckte Posten?
  3. Erstattet meine Krankenkasse / PKV / Beihilfe?
  4. Wie schnell bekomme ich einen Termin?
  5. Kann ich die Diagnostik komplett online machen?
  6. Was passiert nach der Diagnose, wenn ich Therapie brauche?
  7. Welche Tests setzt ihr ein?
  8. Wird die Diagnose von Ärzt:innen / Arbeitgeber:innen anerkannt?
  9. Was unterscheidet euch von Online-Kliniken wie GAM Medical?
  10. Was, wenn ich am Ende keine ADHS-Diagnose bekomme?

**Sektion 11: Final CTA**
- Headline: „Bereit für Klarheit?"
- Sub: „Zwei Wege, die nächsten Schritte zu gehen."
- Zwei CTAs side-by-side:
  - „Selbsttest starten" (für Unentschlossene → Sektion 3)
  - „Direkt Termin buchen" (für Entschlossene → externe Buchungs-Strecke)

**Sektion 12: Footer**
- Impressum · Datenschutz · HWG-Hinweise · Approbation · Kontakt
- Interne Links: `/spaetdiagnose-frauen` (für SEO-Cluster), Blog-Cluster (Phase 2)

---

## 4. Design-System

### 4.1 Design-Sprache: Modern Clinical
Funktionale, conversion-orientierte Ästhetik. GAM-ähnliche Klarheit, aber ohne SaaS-Anmutung — Wärme entsteht durch echte Fotos (Kata, Praxis), nicht durch Typografie-Spielereien.

### 4.2 Tokens

**Farben:**
- `--bg`: `#ffffff` (Primary background)
- `--bg-soft`: `#f8fafb` (Section alternate)
- `--text`: `#0a0a0a` (Headlines)
- `--text-body`: `#444444` (Body)
- `--text-muted`: `#777777` (Meta, captions)
- `--accent`: `#1a56db` (CTA, links, highlights)
- `--accent-soft`: `#e8f0fe` (Pill background)
- `--accent-highlight`: `#ffe066` (Hero highlight underline)
- `--border`: `#e5e7eb`
- `--success`: `#16a34a` (Trust-Items „✓")

**Typografie:**
- Font Stack: `system-ui, -apple-system, "Inter", "Helvetica Neue", Arial, sans-serif` (kein Web-Font-Loading, Performance-First)
- Skala: 13 / 14 / 15 / 16 / 18 / 22 / 28 / 36 / 48 (px, mobile responsive scale-down)
- Headlines: `font-weight: 700`, `letter-spacing: -0.02em`, `line-height: 1.15`
- Body: `font-weight: 400`, `line-height: 1.6`
- Hero H1: 48px desktop / 32px mobile

**Spacing:**
- Base unit: 4px
- Section padding vertical: 96px desktop / 56px mobile
- Container max-width: 1120px, gutter 24px

**Komponenten:**
- **Button primary:** `bg: --accent`, `color: #fff`, `padding: 14px 24px`, `border-radius: 8px`, `font-weight: 600`
- **Button secondary:** `bg: transparent`, `color: --accent`, `border: 1px solid --accent`, sonst gleich
- **Pill:** `bg: --accent-soft`, `color: --accent`, `padding: 5px 12px`, `border-radius: 999px`, `font-size: 13px`
- **Card:** `bg: --bg`, `border: 1px solid --border`, `border-radius: 12px`, `padding: 28px`
- **Highlight (Hero):** `<span class="hl">…</span>` mit `background: linear-gradient(180deg, transparent 60%, var(--accent-highlight) 60%)`

### 4.3 Layout
- Mobile-first, 1-column.
- Desktop ab 768px: 2-Spalten-Hero, 3-Spalten-Wertversprechen, 4-Spalten-Process-Stepper.
- Container immer zentriert mit max-width.

### 4.4 Bilder
- Hero: Foto Kata oder Praxis (Aspect 4:5), WebP mit JPEG-Fallback, `srcset` für Retina.
- Sektion 7: Porträt Kata (Aspect 1:1, 600×600px).
- Sektion 8: Praxis-Foto (Aspect 16:9 oder 4:3).
- Karte Sektion 8: statisches OSM-Bild, kein iframe (DSGVO).
- Lazy-Loading via `loading="lazy"` ab Sektion 4.

---

## 5. Technische Architektur

### 5.1 Stack
- **HTML:** Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<details>`)
- **CSS:** Eine vanilla CSS-Datei, mobile-first, max ~400 Zeilen.
- **JS:** Minimal. Inline-Vanilla-JS nur für: ASRS-Test-Logik, Smooth-Scroll-Anchor-Links. Keine Frameworks, keine npm-Dependencies für die Seite selbst.
- **Hosting:** Coolify auf eigenem Server (DSGVO-sauber, schon erprobt für Path to AI)
- **Build:** Optional Astro für SEO-Boilerplate (Meta, Sitemap, Schema), aber Output ist reines HTML/CSS. Wenn Build zu schwer, fallback auf reines HTML.

### 5.2 Komponenten-Aufteilung
Wenn Astro: jede Sektion eine eigene `.astro`-Datei in `src/components/landing/`. Wenn reines HTML: ein Hauptdokument `index.html`, klar kommentiert mit Sektions-Trennern.

```
adhd-landing/
├── index.html                    # Hauptseite
├── styles.css                    # Vanilla CSS
├── asrs-test.js                  # ASRS-Test-Logik (inline möglich)
├── images/
│   ├── kata-portrait.webp
│   ├── praxis-westend.webp
│   ├── praxis-map.png            # statisches OSM
│   └── og-image.jpg
└── /spaetdiagnose-frauen.html    # Schwester-LP (eigene Spec)
```

### 5.3 ASRS-Test-Komponente
- 6 Items aus ASRS-v1.1 Screener (WHO Public Domain).
- 5-Stufen-Likert-Skala.
- Score-Schwellwert: 4 oder mehr Items in den oberen 2 Stufen → „erhöhte Auffälligkeit".
- Output ist *Hinweis*, niemals „Sie haben ADHS" (MDR-Schwellwert).
- Ergebnis ohne E-Mail-Pflicht direkt sichtbar (DSGVO).
- Optional E-Mail-Eingabe nach Ergebnis für PDF-Versand mit separater Einwilligung.

### 5.4 SEO
- `<title>`: „ADHS-Diagnostik Frankfurt — Praxis Schleich · Online + Westend"
- `<meta description>`: „Klare ADHS-Diagnostik in Frankfurt-Westend. Online flexibel, mit Anschluss-Therapie aus einer Hand. Festpreis, Termine in 1–2 Wochen."
- JSON-LD: `MedicalClinic` für die Praxis, `Person` für Kata, `FAQPage` für Sektion 10.
- Canonical URL gesetzt.
- Sitemap.xml + robots.txt am Root.
- OpenGraph + Twitter Card Tags.
- Hauptkeyword im Title, H1, ersten 100 Wörtern: „ADHS Diagnostik Frankfurt".

### 5.5 Performance
- Kein Web-Font-Loading.
- Bilder als WebP mit Fallback, `loading="lazy"` ab Sektion 4.
- Inline-CSS für Above-the-Fold (Hero) optional, externe CSS für Rest.
- Kein JS für Hero (keine Hydration-Wartezeit).
- Plausible-Analytics (DSGVO-konform, kein Cookie-Banner nötig).

### 5.6 Compliance
- **HWG:** Keine Heilversprechen. Keine Garantie für Anschlusstherapie. Disclaimers an: ASRS-Test, Diagnose-Outcome („nicht jede Diagnostik führt zu ADHS-Diagnose").
- **DSGVO:** Plausible (cookieless). Kein Google Maps Embed (statisches OSM stattdessen). E-Mail-Capture immer optional, Double-Opt-In, getrennte Newsletter-Liste.
- **MDR:** ASRS-Test als Screening klar deklariert, kein Diagnose-Output.
- **Berufsrecht:** Hinweis auf mind. 1 Termin in Präsenz.
- **Impressum/Datenschutz:** Pflicht, im Footer verlinkt.

---

## 6. Conversion-Mechanik (Marketing-Kern)

### 6.1 Primärer Conversion-Pfad
1. Hero CTA „Selbsttest starten" → smooth scroll zu Sektion 3
2. ASRS-Test absolvieren (~3 Min)
3. Ergebnis-Sektion zeigt USP („Wir denken Therapie schon mit") + CTA „Termin buchen"
4. Externe Buchungs-Strecke (TBD — Cal.com self-hosted oder vergleichbar)

### 6.2 Sekundärer Pfad
1. Hero CTA „Termin buchen" → direkt zur Buchungs-Strecke (für Entschlossene)

### 6.3 Tertiärer Pfad
1. Patient liest die Seite, kommt nicht zum Test
2. Sektion 11 Final CTA fängt ab → entweder Selbsttest oder Buchung

### 6.4 E-Mail-Capture-Pfad
1. Nach ASRS-Ergebnis: optionales E-Mail-Feld „PDF mit deinem Ergebnis und nächsten Schritten"
2. Double-Opt-In
3. 3–5 E-Mails über 2 Wochen mit Aufklärung + sanftem Booking-CTA (separater Phase, nicht Teil dieser Spec)

---

## 7. Tonalität und Copy-Prinzipien

- **Direkt, aber nicht aggressiv.** „Du" durchgehend (nicht „Sie"), weil ADHS-Zielgruppe jüngerer und Marktstandard.
- **Empathisch, nicht therapeutisch belehrend.** „Vielleicht ist es nicht ‚zu sensibel'" statt „Erkennen Sie sich wieder?".
- **Konkret, nicht vage.** „13 Monate" statt „lange Wartezeit". „650 €" statt „faire Preise". „Vier Termine" statt „mehrere Termine".
- **Kein Heilversprechen.** „Klarheit" ist okay, „Heilung" nicht. „Anschluss mitgedacht" ist okay, „garantierte Therapie" nicht.
- **Anti-GAM-Differenzierung explizit, aber nicht namentlich.** Nicht „besser als GAM", sondern „bei reinen Online-Kliniken endet die Begleitung mit dem Gutachten". Patient verbindet selbst.
- **Kein Marketing-Slang.** Kein „Game-Changer", kein „revolutionär", kein „einzigartig".

---

## 8. Was diese Spec nicht entscheidet (Folge-Phasen)

| Offen | Phase / Entscheider |
|---|---|
| Final-Copy für jede Sektion (Headlines stehen, Body teilweise Platzhalter) | Eigene Copy-Phase nach Spec-Approval, mit Kata gegenchecken |
| Auswahl Buchungssystem | Tooling-Recherche Yves |
| ASRS-PDF-Versand-Backend | Eigene Phase nach Test-Funnel-Validation |
| Sample-Gutachten anonymisieren | Content-Aufgabe Kata |
| Frauen-Cluster-LP `/spaetdiagnose-frauen` | Eigene Spec, baut auf dieser auf |
| Blog-Cluster für SEO | Phase 2 nach Launch |
| Trustpilot/Google-Reviews-Strategie | ab Monat 6 nach Launch (nach 5 ersten Diagnosen) |

---

## 9. Akzeptanzkriterien

Eine Implementation gilt als „ready to ship", wenn:

1. Alle 12 Sektionen vorhanden, in der spezifizierten Reihenfolge.
2. ASRS-Test funktioniert end-to-end: 6 Items beantwortbar, Score wird berechnet, Ergebnis-Seite zeigt USP-Pitch + CTA.
3. Lighthouse-Scores ≥ 95 in allen vier Kategorien.
4. Mobile-Responsive ab 360px, getestet auf iOS Safari + Android Chrome.
5. Alle CTAs funktionieren (Smooth-Scroll oder externe URL).
6. JSON-LD-Schema validiert (Google Rich Results Test).
7. HWG/DSGVO/MDR-Compliance-Checkliste in Sektion 5.6 abgehakt.
8. Impressum + Datenschutzerklärung verlinkt und nicht-leer (Platzhalter okay, finaler Text Kata-Aufgabe).
9. Echte Fotos von Kata + Praxis platziert (keine Stock-Bilder).
10. Plausible-Analytics-Integration verifiziert.

---

## Versionsstand

- **v0.1 — 2026-05-07** — Erstausgabe nach Brainstorming-Session. Strategische Entscheidungen alle gelockt. Implementation-Plan ausstehend.

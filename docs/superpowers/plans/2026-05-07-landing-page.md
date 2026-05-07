# Landing Page Praxis Schleich Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a marketing-driven, conversion-focused static landing page for Praxis Schleich's ADHS-Diagnostik offering at Frankfurt-Westend, including an ASRS self-assessment tool that funnels users into the practice's USP-driven booking path.

**Architecture:** Single-page static HTML site with vanilla CSS and a small vanilla JS file for the ASRS test. Mobile-first responsive design, semantic HTML5 with JSON-LD schema, no frameworks, no build step. Page lives at `index.html`, styles at `styles.css`, ASRS logic at `asrs-test.js`. Images in `images/`. No backend — booking links to a placeholder anchor for now (booking system is a follow-up phase).

**Tech Stack:** HTML5, vanilla CSS (CSS custom properties for tokens), vanilla JS (ES2020), no frameworks, no npm dependencies, no build step. Deployment target: Coolify (static file hosting). Analytics: Plausible (deferred — script tag stub only). Spec reference: `docs/superpowers/specs/2026-05-07-landing-page-design.md`.

---

## File Structure

```
adhd/
├── index.html                    # Main landing page (12 sections)
├── styles.css                    # Vanilla CSS, mobile-first
├── asrs-test.js                  # ASRS-6 test logic + results render
├── impressum.html                # Legal page (placeholder content)
├── datenschutz.html              # Legal page (placeholder content)
├── images/
│   ├── kata-portrait.jpg         # Section 7 photo (placeholder)
│   ├── praxis-westend.jpg        # Section 8 photo (placeholder)
│   ├── praxis-map.png            # Section 8 OSM static map (placeholder)
│   ├── og-image.jpg              # OpenGraph image (placeholder)
│   └── README.md                 # Image asset specs for Kata
├── robots.txt                    # SEO
├── sitemap.xml                   # SEO
└── .gitignore                    # Ignore .superpowers/, OS junk
```

**File responsibilities:**
- `index.html` — All 12 marketing sections + JSON-LD schema + meta tags. One file because YAGNI; if it grows past ~600 lines we revisit.
- `styles.css` — All visual styling, organized as: tokens → reset → layout → components → sections → media queries.
- `asrs-test.js` — Self-contained: 6 questions array, render function, scoring function, results render. No global state, no dependencies.
- `impressum.html` / `datenschutz.html` — Boilerplate scaffolds for HWG/DSGVO compliance. Final content is Kata's task.
- `images/README.md` — Tells Kata exactly which photos to provide, what aspect ratios, what resolutions, what's in each shot.

---

## Conventions

**Git:** Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`). Commit after every passing task. No squashing during the plan.

**HTML:** Semantic elements (`<header>`, `<main>`, `<section>` with `aria-labelledby`, `<article>`, `<details>`/`<summary>` for FAQ, `<nav>`, `<footer>`). Use `id` for anchor scrolling, never inline `style` attribute except for `srcset`/`sizes`.

**CSS:** Mobile-first. CSS custom properties (`--token-name`) for the design system. Class naming: BEM-light (`.section-hero`, `.section-hero__title`, `.btn--primary`). No `!important` except in defensive overrides — none expected.

**JS:** Vanilla ES2020. No bundler. One file (`asrs-test.js`), loaded with `<script defer>`. Use `data-` attributes for binding, no inline `onclick`. Functions, not classes.

**Testing strategy:** This is a static HTML/CSS/JS landing page — no test framework, no automated unit tests. Verification is manual + tooling-driven:
- After each task: visually verify in browser, run Lighthouse, validate HTML.
- For ASRS-test JS: a short test script (`asrs-test.test.html`) that asserts scoring logic in the browser console — keep it simple.
- Final task includes a verification checklist run against the spec's section 9 acceptance criteria.

**Why no test framework:** Adding a test runner (Vitest, Jest, Playwright) would mean adding npm/build tooling, which the spec explicitly forbids ("no Build-Pipeline für die Seite selbst"). For a single-file vanilla-JS function, an inline browser test page is enough.

---

## Task 0: Project Bootstrap

**Files:**
- Create: `.gitignore`, `README.md`

- [ ] **Step 1: Initialize git repo**

```bash
cd "/Users/yschleich/Developer/Psychotherapie Schleich/adhd"
git init
git config user.email "yves.schleich@gmail.com"
git config user.name "Yves Schleich"
```

Expected: `Initialized empty Git repository in .../adhd/.git/`

- [ ] **Step 2: Create `.gitignore`**

```gitignore
.DS_Store
.superpowers/
*.log
node_modules/
.env
.env.local
.idea/
.vscode/
```

- [ ] **Step 3: Create minimal `README.md`**

```markdown
# Praxis Schleich — ADHS-Diagnostik Landing Page

Static landing page for Praxis Schleich's ADHS-Diagnostik offering.

- **Spec:** [docs/superpowers/specs/2026-05-07-landing-page-design.md](docs/superpowers/specs/2026-05-07-landing-page-design.md)
- **Plan:** [docs/superpowers/plans/2026-05-07-landing-page.md](docs/superpowers/plans/2026-05-07-landing-page.md)
- **Market research:** [MARKET-RESEARCH.md](MARKET-RESEARCH.md)
- **Strategy:** [STRATEGY-DOSSIER.md](STRATEGY-DOSSIER.md)

## Local development

Open `index.html` directly in a browser, or serve with:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deployment

Static files. Deploy to Coolify or any static host.
```

- [ ] **Step 4: Verify and commit**

```bash
git status
git add .gitignore README.md MARKET-RESEARCH.md STRATEGY-DOSSIER.md docs/
git commit -m "chore: initialize project with planning docs"
```

Expected: clean working tree after commit.

---

## Task 1: Design Tokens (CSS Foundation)

**Files:**
- Create: `styles.css`

This task establishes the design system from spec section 4. All later sections consume these tokens.

- [ ] **Step 1: Create `styles.css` with tokens, reset, and base typography**

```css
/* ===== Praxis Schleich Landing Page === Tokens === */
:root {
  /* Colors (spec 4.2) */
  --bg: #ffffff;
  --bg-soft: #f8fafb;
  --text: #0a0a0a;
  --text-body: #444444;
  --text-muted: #777777;
  --accent: #1a56db;
  --accent-soft: #e8f0fe;
  --accent-highlight: #ffe066;
  --border: #e5e7eb;
  --success: #16a34a;

  /* Type scale */
  --fs-xs: 13px;
  --fs-sm: 14px;
  --fs-base: 16px;
  --fs-md: 18px;
  --fs-lg: 22px;
  --fs-xl: 28px;
  --fs-2xl: 36px;
  --fs-3xl: 48px;

  /* Spacing (4px base) */
  --sp-1: 4px;
  --sp-2: 8px;
  --sp-3: 12px;
  --sp-4: 16px;
  --sp-6: 24px;
  --sp-8: 32px;
  --sp-12: 48px;
  --sp-16: 64px;
  --sp-20: 80px;
  --sp-24: 96px;

  /* Layout */
  --container: 1120px;
  --gutter: 24px;

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 999px;

  /* Section padding */
  --section-py: 56px;
}

@media (min-width: 768px) {
  :root {
    --section-py: 96px;
  }
}

/* ===== Reset / base ===== */
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  font-family: system-ui, -apple-system, "Inter", "Helvetica Neue", Arial, sans-serif;
  font-size: var(--fs-base);
  line-height: 1.6;
  color: var(--text-body);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4, h5, h6 {
  margin: 0 0 var(--sp-4) 0;
  color: var(--text);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
}
h1 { font-size: var(--fs-2xl); }
h2 { font-size: var(--fs-xl); }
h3 { font-size: var(--fs-lg); }
@media (min-width: 768px) {
  h1 { font-size: var(--fs-3xl); }
  h2 { font-size: var(--fs-2xl); }
}
p { margin: 0 0 var(--sp-4) 0; }
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
img { max-width: 100%; height: auto; display: block; }
button { font: inherit; cursor: pointer; }
ul, ol { padding-left: var(--sp-6); margin: 0 0 var(--sp-4) 0; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

/* ===== Layout primitives ===== */
.container {
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--gutter);
}
.section {
  padding: var(--section-py) 0;
}
.section--soft {
  background: var(--bg-soft);
}
```

- [ ] **Step 2: Verify CSS loads (no consumer yet, but check syntax)**

Run: `npx --yes csslint styles.css || echo "skipped"` — if csslint not available, `cat styles.css | head -5` to confirm file exists.

Or simply open in editor and confirm no syntax errors.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat(css): add design tokens, reset, and layout primitives"
```

---

## Task 2: HTML Skeleton with Meta + JSON-LD

**Files:**
- Create: `index.html`

This is the empty shell with `<head>` configured (meta tags, OpenGraph, JSON-LD schema). Sections come in later tasks.

- [ ] **Step 1: Create `index.html` with full head**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ADHS-Diagnostik Frankfurt — Praxis Schleich · Online + Westend</title>
  <meta name="description" content="Klare ADHS-Diagnostik in Frankfurt-Westend. Online flexibel, mit Anschluss-Therapie aus einer Hand. Festpreis, Termine in 1–2 Wochen.">
  <link rel="canonical" href="https://psychotherapie-schleich.de/">

  <!-- OpenGraph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="ADHS-Diagnostik Frankfurt — Praxis Schleich">
  <meta property="og:description" content="Klare ADHS-Diagnostik in Frankfurt-Westend. Online flexibel, mit Anschluss-Therapie aus einer Hand.">
  <meta property="og:image" content="https://psychotherapie-schleich.de/images/og-image.jpg">
  <meta property="og:url" content="https://psychotherapie-schleich.de/">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="ADHS-Diagnostik Frankfurt — Praxis Schleich">
  <meta name="twitter:description" content="Klare ADHS-Diagnostik in Frankfurt-Westend. Online flexibel, mit Anschluss-Therapie aus einer Hand.">

  <!-- Favicon (placeholder) -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧠</text></svg>">

  <!-- Stylesheet -->
  <link rel="stylesheet" href="styles.css">

  <!-- JSON-LD: MedicalClinic -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Praxis Katarina Schleich",
    "description": "Psychotherapeutische Praxis mit Schwerpunkt ADHS-Diagnostik bei Erwachsenen in Frankfurt-Westend.",
    "url": "https://psychotherapie-schleich.de/",
    "telephone": "+49-69-XXXXXXX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rappstr. 7-9",
      "addressLocality": "Frankfurt am Main",
      "postalCode": "60318",
      "addressCountry": "DE"
    },
    "medicalSpecialty": ["Psychiatric", "ClinicalPsychology"]
  }
  </script>

  <!-- JSON-LD: Person (Therapist) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Katarina Schleich",
    "jobTitle": "Approbierte Psychologische Psychotherapeutin",
    "worksFor": {
      "@type": "MedicalClinic",
      "name": "Praxis Katarina Schleich"
    },
    "knowsAbout": ["ADHS", "Verhaltenstherapie", "Schematherapie"]
  }
  </script>

  <!-- ASRS test script (deferred) -->
  <script defer src="asrs-test.js"></script>
</head>
<body>
  <main>
    <!-- Sections will be added in subsequent tasks -->
    <p class="container" style="padding: 96px 24px;">Implementation in progress.</p>
  </main>
</body>
</html>
```

- [ ] **Step 2: Verify HTML in browser**

Run: `python3 -m http.server 8000` in another terminal, then open `http://localhost:8000/`.
Expected: Browser shows „Implementation in progress." with no console errors. Stop server with Ctrl+C.

- [ ] **Step 3: Validate JSON-LD**

Open the file in browser, view source, copy each `<script type="application/ld+json">` block, paste into https://search.google.com/test/rich-results (manual). Skip if offline — JSON syntax check is sufficient:

Run: `python3 -c "import json; html=open('index.html').read(); import re; blocks=re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', html, re.DOTALL); [json.loads(b) for b in blocks]; print(f'Valid: {len(blocks)} JSON-LD blocks')"`
Expected: `Valid: 2 JSON-LD blocks`

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat(html): add page skeleton with meta tags and JSON-LD schema"
```

---

## Task 3: Section 1 — Hero (Wartezeit-Pain)

**Files:**
- Modify: `index.html` — replace placeholder `<main>` content
- Modify: `styles.css` — add hero section styles

This is the most important section. Refer to spec section 3, Sektion 1.

- [ ] **Step 1: Add hero CSS to `styles.css`**

Append:

```css
/* ===== Components: buttons ===== */
.btn {
  display: inline-block;
  padding: 14px 24px;
  border-radius: var(--radius-md);
  font-size: var(--fs-sm);
  font-weight: 600;
  letter-spacing: 0.2px;
  text-align: center;
  border: 1px solid transparent;
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.btn:hover { text-decoration: none; opacity: 0.92; }
.btn:active { transform: translateY(1px); }
.btn--primary {
  background: var(--accent);
  color: #fff;
}
.btn--secondary {
  background: transparent;
  color: var(--accent);
  border-color: var(--accent);
}

/* ===== Components: pill ===== */
.pill {
  display: inline-block;
  background: var(--accent-soft);
  color: var(--accent);
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  font-size: var(--fs-xs);
  font-weight: 600;
  margin-bottom: var(--sp-3);
}

/* ===== Components: highlight (hero underline) ===== */
.hl {
  background: linear-gradient(180deg, transparent 60%, var(--accent-highlight) 60%);
  padding: 0 4px;
}

/* ===== Section: Hero ===== */
.section-hero {
  padding: var(--sp-12) 0 var(--sp-16);
}
@media (min-width: 768px) {
  .section-hero { padding: var(--sp-20) 0; }
}
.section-hero__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-8);
  align-items: center;
}
@media (min-width: 768px) {
  .section-hero__grid {
    grid-template-columns: 1.1fr 1fr;
    gap: var(--sp-12);
  }
}
.section-hero__title {
  margin-bottom: var(--sp-4);
}
.section-hero__lead {
  font-size: var(--fs-md);
  color: var(--text-body);
  margin-bottom: var(--sp-6);
  max-width: 540px;
}
.section-hero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-3);
  margin-bottom: var(--sp-6);
}
.section-hero__trust {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-4);
  padding-top: var(--sp-4);
  border-top: 1px solid var(--border);
  font-size: var(--fs-xs);
  color: var(--text-muted);
}
.section-hero__trust span::before {
  content: "✓ ";
  color: var(--success);
  font-weight: 700;
}
.section-hero__photo {
  aspect-ratio: 4/5;
  background: linear-gradient(135deg, #c5d8f0 0%, #8da9c4 100%);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: flex-end;
  padding: var(--sp-4);
  color: #fff;
  font-size: var(--fs-xs);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-weight: 600;
}
```

- [ ] **Step 2: Replace placeholder in `index.html`**

Replace:
```html
    <p class="container" style="padding: 96px 24px;">Implementation in progress.</p>
```

With:
```html
    <section class="section section-hero" aria-labelledby="hero-title">
      <div class="container">
        <div class="section-hero__grid">
          <div>
            <span class="pill">⚡ Termine in 1–2 Wochen</span>
            <h1 id="hero-title" class="section-hero__title">13 Monate auf einen Diagnostik-Termin warten? <span class="hl">Muss nicht sein.</span></h1>
            <p class="section-hero__lead">Frankfurter ADHS-Diagnostik. Online flexibel, mit echter Therapeutin in Frankfurt-Westend. Klarheit in Wochen, nicht Monaten.</p>
            <div class="section-hero__ctas">
              <a href="#selbsttest" class="btn btn--primary">Selbsttest starten</a>
              <a href="#termin" class="btn btn--secondary">Termin buchen →</a>
            </div>
            <div class="section-hero__trust">
              <span>Festpreis ab 650 €</span>
              <span>Approbierte Therapeutin</span>
              <span>DSGVO-konform</span>
            </div>
          </div>
          <div class="section-hero__photo" aria-hidden="true">
            <span>Foto: Praxis Westend</span>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: Verify in browser**

Run: `python3 -m http.server 8000` and visit `http://localhost:8000/`.
Manual check:
- Hero headline visible with yellow highlight on "Muss nicht sein."
- Pill „⚡ Termine in 1–2 Wochen" above headline
- Two CTAs render (primary blue + secondary outlined)
- Three trust items below CTAs with green checkmarks
- Resize browser to 360px width — layout stacks to single column
- No console errors

Stop server.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat(hero): add Section 1 with wait-time-pain hook"
```

---

## Task 4: Section 2 — Hybrid Value Proposition (3 columns)

**Files:**
- Modify: `index.html`, `styles.css`

- [ ] **Step 1: Add CSS for 3-column section**

Append to `styles.css`:

```css
/* ===== Section: Value Prop (3 columns) ===== */
.section-value__title {
  text-align: center;
  margin-bottom: var(--sp-12);
}
.section-value__cols {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-8);
}
@media (min-width: 768px) {
  .section-value__cols {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--sp-12);
  }
}
.section-value__col {
  text-align: left;
}
.section-value__icon {
  font-size: var(--fs-xl);
  margin-bottom: var(--sp-3);
  display: block;
}
.section-value__col h3 {
  font-size: var(--fs-md);
  margin-bottom: var(--sp-2);
}
```

- [ ] **Step 2: Add Section 2 to `index.html`**

Append after the hero `</section>`:

```html
    <section class="section section--soft" aria-labelledby="value-title">
      <div class="container">
        <h2 id="value-title" class="section-value__title">Was uns von reinen Online-Kliniken unterscheidet</h2>
        <div class="section-value__cols">
          <div class="section-value__col">
            <span class="section-value__icon" aria-hidden="true">⚡</span>
            <h3>Online flexibel</h3>
            <p>Diagnostik-Module per Videosprechstunde — du bestimmst Tempo und Ort.</p>
          </div>
          <div class="section-value__col">
            <span class="section-value__icon" aria-hidden="true">🏛</span>
            <h3>Echte Praxis Frankfurt</h3>
            <p>Persönliches Erstgespräch in unserer Praxis im Westend, wenn du willst.</p>
          </div>
          <div class="section-value__col">
            <span class="section-value__icon" aria-hidden="true">🤝</span>
            <h3>Anschluss mitgedacht</h3>
            <p>Wir denken über die Diagnose hinaus. Therapie bei freier Kapazität direkt bei uns.</p>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: Verify in browser**

Visit page. Confirm:
- Section background is `--bg-soft` (slightly off-white)
- Three columns on desktop, stack on mobile
- Icons render correctly
- Titles bold, body text readable

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat(value-prop): add Section 2 with 3-column hybrid USP"
```

---

## Task 5: ASRS Test Component (JS Foundation)

**Files:**
- Create: `asrs-test.js`
- Create: `asrs-test.test.html` (manual browser test)

This is the only non-trivial JS in the project. Build it isolated first, integrate in next task.

- [ ] **Step 1: Create `asrs-test.js`**

```javascript
/**
 * ASRS-v1.1 Adult ADHD Self-Report Scale (6-Item Screener)
 * Source: WHO public domain. Used for screening only — not a diagnostic tool.
 *
 * Scoring rule: 4 or more items in the upper 2 response categories
 * (varies per item — see SCORING_THRESHOLDS) indicates likely ADHD.
 */

const ASRS_QUESTIONS = [
  "Wie oft fällt es Ihnen schwer, die letzten Details bei einer Aufgabe zu erledigen, wenn die schwierigen Teile schon gemacht sind?",
  "Wie oft haben Sie Schwierigkeiten, Dinge zu organisieren, wenn Sie eine Aufgabe erledigen müssen, die Organisation erfordert?",
  "Wie oft haben Sie Probleme, sich an Termine oder Verpflichtungen zu erinnern?",
  "Wenn Sie eine Aufgabe haben, die viel Konzentration erfordert: Wie oft schieben Sie diese auf oder vermeiden, sie anzufangen?",
  "Wie oft zappeln Sie mit Händen oder Füßen, wenn Sie längere Zeit sitzen müssen?",
  "Wie oft fühlen Sie sich überaktiv und drangvoll, etwas tun zu müssen, als ob Sie von einem Motor angetrieben würden?"
];

const RESPONSE_LABELS = ["nie", "selten", "manchmal", "oft", "sehr oft"];

/**
 * Per-item scoring threshold per official ASRS-v1.1 scoring rules.
 * For items 1-3: scores in "oft" or "sehr oft" (indices 3, 4) count as positive.
 * For items 4-6: scores in "manchmal", "oft", or "sehr oft" (indices 2, 3, 4) count as positive.
 */
const SCORING_THRESHOLDS = [3, 3, 3, 2, 2, 2];

/** Calculate score: count of items meeting their threshold. Returns 0-6. */
function calculateScore(answers) {
  if (!Array.isArray(answers) || answers.length !== 6) {
    throw new Error("answers must be an array of 6 numbers");
  }
  return answers.reduce((count, answer, i) => {
    return count + (answer >= SCORING_THRESHOLDS[i] ? 1 : 0);
  }, 0);
}

/** Score >= 4 indicates likely ADHD per ASRS-v1.1. */
function isPositiveScreen(score) {
  return score >= 4;
}

/** Build the test UI inside the given container element. */
function renderTest(container, onComplete) {
  const answers = new Array(6).fill(null);
  let currentItem = 0;

  function render() {
    if (currentItem >= 6) {
      const score = calculateScore(answers);
      onComplete(score, answers);
      return;
    }

    const q = ASRS_QUESTIONS[currentItem];
    const progress = Math.round((currentItem / 6) * 100);

    container.innerHTML = `
      <div class="asrs__progress" aria-label="Fortschritt">
        <div class="asrs__progress-bar" style="width: ${progress}%"></div>
        <span class="asrs__progress-label">Frage ${currentItem + 1} von 6</span>
      </div>
      <fieldset class="asrs__question">
        <legend class="asrs__question-text">${q}</legend>
        <div class="asrs__options" role="radiogroup">
          ${RESPONSE_LABELS.map((label, i) => `
            <button type="button" class="asrs__option" data-value="${i}">
              <span class="asrs__option-letter">${i + 1}</span>
              <span class="asrs__option-label">${label}</span>
            </button>
          `).join("")}
        </div>
      </fieldset>
    `;

    container.querySelectorAll(".asrs__option").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const value = parseInt(e.currentTarget.dataset.value, 10);
        answers[currentItem] = value;
        currentItem++;
        render();
      });
    });
  }

  render();
}

/** Render the result screen with USP pitch. */
function renderResult(container, score, ctaUrl) {
  const positive = isPositiveScreen(score);
  const headline = positive
    ? `Dein Ergebnis: ${score} von 6 — Hinweise auf ADHS`
    : `Dein Ergebnis: ${score} von 6 — wenig Hinweise auf ADHS`;

  const explanation = positive
    ? "Das ist ein Hinweis, kein Urteil. Mehrere Symptome deuten auf eine professionelle Abklärung hin — eine Diagnose kann nur eine fachliche Einschätzung treffen."
    : "Das ist ein Hinweis, kein Urteil. Wenn du trotz dieses Ergebnisses einen Verdacht hast, ist eine fachliche Abklärung der nächste sinnvolle Schritt.";

  container.innerHTML = `
    <div class="asrs-result">
      <h3 class="asrs-result__headline">${headline}</h3>
      <p class="asrs-result__explanation">${explanation}</p>
      <div class="asrs-result__usp">
        <h4>Bei uns ist Diagnostik nicht das Ende.</h4>
        <p>Wir denken Therapie schon mit. Bei freier Kapazität setzen wir die Behandlung direkt bei uns fort, sonst übergeben wir kuratiert an unser FFM-Therapeut:innen-Netzwerk.</p>
        <a href="#anschluss" class="asrs-result__link">Wie das funktioniert →</a>
      </div>
      <a href="${ctaUrl}" class="btn btn--primary asrs-result__cta">Diagnostik-Termin buchen</a>
    </div>
  `;
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("asrs-test");
  if (!container) return;

  renderTest(container, (score) => {
    renderResult(container, score, "#termin");
  });
});

// Expose for tests
if (typeof window !== "undefined") {
  window.__ASRS = { calculateScore, isPositiveScreen, ASRS_QUESTIONS, SCORING_THRESHOLDS };
}
```

- [ ] **Step 2: Create test page `asrs-test.test.html`**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>ASRS Test Suite</title>
  <style>
    body { font-family: system-ui; padding: 24px; max-width: 640px; }
    .pass { color: green; font-weight: 600; }
    .fail { color: red; font-weight: 600; }
  </style>
  <script src="asrs-test.js"></script>
</head>
<body>
  <h1>ASRS Scoring Tests</h1>
  <ol id="results"></ol>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const { calculateScore, isPositiveScreen } = window.__ASRS;
      const results = document.getElementById("results");

      const cases = [
        { name: "all zeros → score 0", input: [0,0,0,0,0,0], expectedScore: 0, expectedPositive: false },
        { name: "all max → score 6", input: [4,4,4,4,4,4], expectedScore: 6, expectedPositive: true },
        { name: "items 1-3 at 'oft' (3) only → 3 (Q4-6 at 0)", input: [3,3,3,0,0,0], expectedScore: 3, expectedPositive: false },
        { name: "items 4-6 at 'manchmal' (2) only → 3 (Q1-3 at 0)", input: [0,0,0,2,2,2], expectedScore: 3, expectedPositive: false },
        { name: "items 1-3 at 'manchmal' (2) → 0 (below threshold)", input: [2,2,2,0,0,0], expectedScore: 0, expectedPositive: false },
        { name: "borderline positive: 4 of 6", input: [3,3,0,2,2,0], expectedScore: 4, expectedPositive: true },
        { name: "Q1-3 at 'sehr oft', Q4-6 at 'oft' → 6", input: [4,4,4,3,3,3], expectedScore: 6, expectedPositive: true },
        { name: "throws on wrong length", input: [1,2,3], expectedThrow: true }
      ];

      for (const c of cases) {
        const li = document.createElement("li");
        try {
          const score = calculateScore(c.input);
          if (c.expectedThrow) {
            li.innerHTML = `<span class="fail">FAIL</span> ${c.name}: expected throw, got score ${score}`;
          } else {
            const positive = isPositiveScreen(score);
            const ok = score === c.expectedScore && positive === c.expectedPositive;
            li.innerHTML = ok
              ? `<span class="pass">PASS</span> ${c.name} (score=${score}, positive=${positive})`
              : `<span class="fail">FAIL</span> ${c.name}: expected score=${c.expectedScore}/positive=${c.expectedPositive}, got score=${score}/positive=${positive}`;
          }
        } catch (e) {
          if (c.expectedThrow) {
            li.innerHTML = `<span class="pass">PASS</span> ${c.name} (threw: ${e.message})`;
          } else {
            li.innerHTML = `<span class="fail">FAIL</span> ${c.name}: unexpected throw: ${e.message}`;
          }
        }
        results.appendChild(li);
      }
    });
  </script>
</body>
</html>
```

- [ ] **Step 3: Run the test page**

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/asrs-test.test.html`. Expected: All 8 test cases show `PASS` in green.

If any FAIL: re-read scoring logic vs. ASRS-v1.1 spec, fix `SCORING_THRESHOLDS` or `calculateScore`, rerun.

Stop server.

- [ ] **Step 4: Commit**

```bash
git add asrs-test.js asrs-test.test.html
git commit -m "feat(asrs): add WHO ASRS-v1.1 6-item screener with scoring tests"
```

---

## Task 6: Section 3 — ASRS Test Integration

**Files:**
- Modify: `index.html`, `styles.css`

- [ ] **Step 1: Add CSS for ASRS test UI**

Append to `styles.css`:

```css
/* ===== Section: ASRS Test ===== */
.section-asrs {
  background: var(--bg-soft);
}
.section-asrs__intro {
  text-align: center;
  max-width: 640px;
  margin: 0 auto var(--sp-8);
}
.section-asrs__title {
  margin-bottom: var(--sp-3);
}
.section-asrs__sub {
  color: var(--text-body);
  font-size: var(--fs-md);
  margin-bottom: var(--sp-4);
}
.section-asrs__disclaimer {
  font-size: var(--fs-xs);
  color: var(--text-muted);
  font-style: italic;
}
.asrs {
  max-width: 720px;
  margin: 0 auto;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--sp-8);
  min-height: 380px;
}
@media (min-width: 768px) {
  .asrs { padding: var(--sp-12); }
}
.asrs__progress {
  position: relative;
  height: 6px;
  background: var(--border);
  border-radius: var(--radius-pill);
  margin-bottom: var(--sp-8);
  overflow: visible;
}
.asrs__progress-bar {
  height: 100%;
  background: var(--accent);
  border-radius: var(--radius-pill);
  transition: width 0.3s ease;
}
.asrs__progress-label {
  position: absolute;
  top: -24px;
  right: 0;
  font-size: var(--fs-xs);
  color: var(--text-muted);
}
.asrs__question {
  border: 0;
  padding: 0;
  margin: 0;
}
.asrs__question-text {
  display: block;
  font-size: var(--fs-md);
  font-weight: 600;
  color: var(--text);
  margin-bottom: var(--sp-6);
  padding: 0;
}
.asrs__options {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-2);
}
.asrs__option {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-4);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  text-align: left;
  font-size: var(--fs-base);
  color: var(--text);
  transition: all 0.15s ease;
}
.asrs__option:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
}
.asrs__option-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--bg-soft);
  border-radius: var(--radius-pill);
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--text-muted);
  flex-shrink: 0;
}
.asrs__option:hover .asrs__option-letter {
  background: var(--accent);
  color: #fff;
}

/* Result screen */
.asrs-result__headline {
  margin-bottom: var(--sp-3);
}
.asrs-result__explanation {
  color: var(--text-body);
  margin-bottom: var(--sp-6);
}
.asrs-result__usp {
  background: var(--accent-soft);
  border-left: 4px solid var(--accent);
  padding: var(--sp-6);
  border-radius: var(--radius-md);
  margin-bottom: var(--sp-6);
}
.asrs-result__usp h4 {
  margin-bottom: var(--sp-2);
  font-size: var(--fs-md);
}
.asrs-result__link {
  font-weight: 600;
}
.asrs-result__cta {
  display: inline-block;
}
```

- [ ] **Step 2: Add Section 3 to `index.html`**

Append after the value-prop section:

```html
    <section id="selbsttest" class="section section-asrs" aria-labelledby="asrs-title">
      <div class="container">
        <div class="section-asrs__intro">
          <h2 id="asrs-title" class="section-asrs__title">Liegt es an dir oder ist es ADHS?</h2>
          <p class="section-asrs__sub">6 Fragen, 3 Minuten, sofort eine Einschätzung. Wissenschaftlich validiert (WHO ASRS-v1.1).</p>
          <p class="section-asrs__disclaimer">Dieser Selbsttest ist ein Screening und ersetzt keine Diagnose. Bei Auffälligkeiten empfehlen wir eine professionelle Abklärung.</p>
        </div>
        <div id="asrs-test" class="asrs"></div>
      </div>
    </section>
```

- [ ] **Step 3: Verify ASRS flow end-to-end**

Run: `python3 -m http.server 8000`. Visit `http://localhost:8000/`.
Click "Selbsttest starten" in hero → page should smooth-scroll to test.
Click through all 6 questions → result screen appears with score, USP block, "Diagnostik-Termin buchen" button.
Try clicking with different answer patterns (all "nie", all "sehr oft", mixed) — different result wording for positive vs. negative screen.
Console: no errors.

Stop server.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat(asrs): integrate ASRS test into Section 3 with USP-driven result"
```

---

## Task 7: Sections 4 + 5 — Spätdiagnose-Realität and Process

**Files:**
- Modify: `index.html`, `styles.css`

Bundled because both are content-heavy but visually simple (text-only / list).

- [ ] **Step 1: Add CSS for sections 4 + 5**

Append to `styles.css`:

```css
/* ===== Section: Spätdiagnose ===== */
.section-pain__title {
  text-align: center;
  max-width: 720px;
  margin: 0 auto var(--sp-8);
}
.section-pain__list {
  max-width: 720px;
  margin: 0 auto;
  display: grid;
  gap: var(--sp-4);
  list-style: none;
  padding: 0;
}
.section-pain__item {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--sp-6);
  font-size: var(--fs-md);
  color: var(--text);
}
.section-pain__bridge {
  text-align: center;
  margin-top: var(--sp-8);
}

/* ===== Section: Process ===== */
.section-process__title {
  text-align: center;
  margin-bottom: var(--sp-12);
}
.section-process__steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-6);
  counter-reset: step;
}
@media (min-width: 768px) {
  .section-process__steps {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--sp-6);
  }
}
.section-process__step {
  position: relative;
  padding: var(--sp-6);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  counter-increment: step;
}
.section-process__step::before {
  content: counter(step);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--accent);
  color: #fff;
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: var(--fs-sm);
  margin-bottom: var(--sp-3);
}
.section-process__step h3 {
  font-size: var(--fs-md);
  margin-bottom: var(--sp-2);
}
.section-process__step .duration {
  display: block;
  font-size: var(--fs-xs);
  color: var(--text-muted);
  margin-bottom: var(--sp-2);
}
.section-process__note {
  text-align: center;
  margin-top: var(--sp-8);
  font-size: var(--fs-sm);
  color: var(--text-muted);
}
```

- [ ] **Step 2: Add sections 4 + 5 to `index.html`**

Append after the ASRS section:

```html
    <section class="section" aria-labelledby="pain-title">
      <div class="container">
        <h2 id="pain-title" class="section-pain__title">Vielleicht ist es nicht „zu sensibel". Vielleicht ist es ADHS.</h2>
        <ul class="section-pain__list">
          <li class="section-pain__item">Du hast jahrelang kompensiert — und bist erschöpft.</li>
          <li class="section-pain__item">Konzentration kostet dich mehr als andere — auch wenn keiner es sieht.</li>
          <li class="section-pain__item">Du hast selbst angefangen zu zweifeln, ob da wirklich was ist.</li>
          <li class="section-pain__item">Du bist über TikTok oder eine Bekannte darauf gestoßen — und es hat dich getroffen.</li>
        </ul>
        <p class="section-pain__bridge"><a href="/spaetdiagnose-frauen.html">Mehr zu ADHS bei Frauen →</a></p>
      </div>
    </section>

    <section class="section section--soft" aria-labelledby="process-title">
      <div class="container">
        <h2 id="process-title" class="section-process__title">Vier Termine. Ein klares Gutachten. Kein Rätselraten.</h2>
        <div class="section-process__steps">
          <article class="section-process__step">
            <h3>Vorgespräch</h3>
            <span class="duration">60 Min</span>
            <p>Anliegen, Vorgeschichte, Erwartungen klären. Wahlweise vor Ort oder online.</p>
          </article>
          <article class="section-process__step">
            <h3>Anamnese & Tests</h3>
            <span class="duration">90 Min</span>
            <p>Strukturierte Anamnese, ASRS-Vollversion, WURS-K, ggf. weitere Verfahren.</p>
          </article>
          <article class="section-process__step">
            <h3>Differenzialdiagnostik</h3>
            <span class="duration">60 Min</span>
            <p>Komorbiditäten ausschließen oder einordnen (Depression, Angst, Trauma).</p>
          </article>
          <article class="section-process__step">
            <h3>Rückgabegespräch</h3>
            <span class="duration">60 Min</span>
            <p>Ausführlicher Befund schriftlich, gemeinsame Besprechung der nächsten Schritte.</p>
          </article>
        </div>
        <p class="section-process__note">Festpreis. Mindestens ein Termin in Präsenz. Du entscheidest, ob die übrigen online oder vor Ort stattfinden.</p>
      </div>
    </section>
```

- [ ] **Step 3: Verify**

Run server, visit page, scroll through. Expected:
- Pain section: 4 cards stacked or in 1 column, with empathic copy
- Bridge link „Mehr zu ADHS bei Frauen →" visible (will 404 for now — that's expected)
- Process section: 4-step horizontal stepper on desktop, vertical on mobile
- Numbered circles `1 2 3 4` styled with accent color

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat(content): add Sections 4-5 (Spätdiagnose pain + 4-step process)"
```

---

## Task 8: Section 6 — Anschluss USP (Mid-Section Soft)

**Files:**
- Modify: `index.html`, `styles.css`

This is the strategic Whitespace #1 section. Soft language, no guarantees.

- [ ] **Step 1: Add CSS**

Append to `styles.css`:

```css
/* ===== Section: Anschluss ===== */
.section-anschluss {
  background: var(--text);
  color: #fff;
}
.section-anschluss h2,
.section-anschluss h3 {
  color: #fff;
}
.section-anschluss__inner {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}
.section-anschluss__title {
  margin-bottom: var(--sp-6);
}
.section-anschluss__body {
  font-size: var(--fs-md);
  color: rgba(255,255,255,0.85);
  margin-bottom: var(--sp-4);
  text-align: left;
}
.section-anschluss__body strong {
  color: #fff;
}
.section-anschluss__close {
  font-style: italic;
  color: rgba(255,255,255,0.7);
  font-size: var(--fs-sm);
  margin-top: var(--sp-6);
}
```

- [ ] **Step 2: Add Section 6 to `index.html`**

Append:

```html
    <section id="anschluss" class="section section-anschluss" aria-labelledby="anschluss-title">
      <div class="container">
        <div class="section-anschluss__inner">
          <h2 id="anschluss-title" class="section-anschluss__title">Wir denken Therapie schon mit.</h2>
          <p class="section-anschluss__body">Bei den meisten Anbietern endet die Begleitung mit dem Gutachten. Bei uns nicht.</p>
          <p class="section-anschluss__body">Bei freier Kapazität setzen wir die Therapie direkt bei Kata fort. Wenn keine Kapazität frei ist, übergeben wir kuratiert ans FFM-Therapeut:innen-Netzwerk — du bekommst keine Liste, sondern eine begründete Empfehlung.</p>
          <p class="section-anschluss__body">Optional: Unser <strong>Erste-90-Tage-Modul</strong> (3–6 Termine, 350 €) als Brücke — Psychoedukation, Strategie-Entwicklung, Übergangsentscheidung.</p>
          <p class="section-anschluss__close">Was im Einzelfall geht, klären wir im Vorgespräch transparent.</p>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: Verify**

Confirm:
- Dark section (near-black background)
- White text, large readable headline
- Three paragraphs, last one italic and slightly muted
- Smooth scroll from ASRS result `[Wie das funktioniert →]` link works (clicks land here)

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat(usp): add Section 6 Anschluss USP with soft HWG-safe language"
```

---

## Task 9: Sections 7 + 8 — Therapeutin and Praxis (Trust)

**Files:**
- Modify: `index.html`, `styles.css`
- Create: `images/README.md`, placeholder `images/kata-portrait.jpg`, `images/praxis-westend.jpg`, `images/praxis-map.png`

- [ ] **Step 1: Create `images/README.md` for Kata**

```markdown
# Bilder für die Landing Page

Diese Dateien müssen mit echten Fotos ersetzt werden, bevor die Seite live geht. Aktuell sind Platzhalter eingebunden.

| Datei | Verwendung | Aspect Ratio | Empfohlene Größe | Inhalt |
|---|---|---|---|---|
| `kata-portrait.jpg` | Sektion 7 (Therapeutin) | 1:1 | 800×800 px | Porträtfoto Kata, freundlich, Praxis-Hintergrund oder neutraler Hintergrund. Format: JPEG, optimiert. |
| `praxis-westend.jpg` | Sektion 8 (Praxis) | 16:9 oder 4:3 | 1200×800 px | Praxis-Innenraum oder Eingangs-Außenaufnahme Rappstr. 7-9. Hell, einladend. |
| `praxis-map.png` | Sektion 8 (Adresse) | 4:3 | 800×600 px | Statisches Kartenbild über OpenStreetMap (siehe https://staticmap.openstreetmap.de/). Kein Google Maps Embed (DSGVO). Standort: Rappstr. 7-9, 60318 Frankfurt am Main. |
| `og-image.jpg` | OpenGraph (Social Sharing) | 1.91:1 | 1200×630 px | Hero-Visual mit Logo + Headline „ADHS-Diagnostik Frankfurt — Praxis Schleich". |

## Optimierung

Vor dem Live-Gang alle Bilder durch ein Tool wie [Squoosh](https://squoosh.app) komprimieren (WebP wenn möglich, JPEG-Fallback). Ziel: jede Datei < 200 KB.
```

- [ ] **Step 2: Create placeholder images**

We need real files (not just empty ones) so browsers don't show broken-image icons. Use Python to write valid 1×1 PNG/JPEG bytes:

```bash
mkdir -p images

# 1×1 transparent PNG (smallest valid PNG, 67 bytes)
python3 -c "open('images/kata-portrait.jpg','wb').write(bytes.fromhex('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c489000000094944415478da63000000000500017363fbe70000000049454e44ae426082'))"

# Copy the same valid bytes to the other placeholder paths
cp images/kata-portrait.jpg images/praxis-westend.jpg
cp images/kata-portrait.jpg images/praxis-map.png
```

The CSS sets `aspect-ratio` and `background: var(--bg-soft)` on these `<img>` elements, so even if a browser refuses the bytes the layout holds. Real photos replace these per `images/README.md` before launch (see Task 15 Step 6 reminder list).

- [ ] **Step 3: Add CSS for sections 7 + 8**

Append to `styles.css`:

```css
/* ===== Section: Therapeutin ===== */
.section-therapeut__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-8);
  align-items: center;
  max-width: 960px;
  margin: 0 auto;
}
@media (min-width: 768px) {
  .section-therapeut__grid {
    grid-template-columns: 1fr 1.4fr;
    gap: var(--sp-12);
  }
}
.section-therapeut__photo {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: var(--radius-lg);
  background: var(--bg-soft);
}
.section-therapeut__title {
  margin-bottom: var(--sp-2);
}
.section-therapeut__role {
  display: block;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  margin-bottom: var(--sp-4);
}
.section-therapeut__meta {
  list-style: none;
  padding: 0;
  margin: var(--sp-4) 0 0;
  font-size: var(--fs-sm);
  color: var(--text-muted);
  display: grid;
  gap: var(--sp-2);
}

/* ===== Section: Praxis ===== */
.section-praxis__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-6);
  max-width: 960px;
  margin: 0 auto;
}
@media (min-width: 768px) {
  .section-praxis__grid {
    grid-template-columns: 1.2fr 1fr;
  }
}
.section-praxis__photo,
.section-praxis__map {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: var(--radius-md);
  background: var(--bg-soft);
}
.section-praxis__address {
  font-style: normal;
  margin-top: var(--sp-4);
  font-size: var(--fs-md);
}
```

- [ ] **Step 4: Add Sections 7 + 8 to `index.html`**

Append:

```html
    <section class="section" aria-labelledby="therapeut-title">
      <div class="container">
        <div class="section-therapeut__grid">
          <img src="images/kata-portrait.jpg" alt="Dipl.-Psych. Katarina Schleich" class="section-therapeut__photo" loading="lazy">
          <div>
            <h2 id="therapeut-title" class="section-therapeut__title">Wer dich begleitet</h2>
            <span class="section-therapeut__role">Dipl.-Psych. Katarina Schleich · Approbierte Psychologische Psychotherapeutin</span>
            <p>Schwerpunkte: Verhaltenstherapie, Schematherapie, ADHS bei Erwachsenen.</p>
            <p><em>[Persönliche Note von Kata — Platzhalter, wird vor Launch ersetzt.]</em></p>
            <ul class="section-therapeut__meta">
              <li>Praxis seit 20XX</li>
              <li>Kassensitz + Selbstzahler</li>
              <li>Frankfurt-Westend</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--soft" aria-labelledby="praxis-title">
      <div class="container">
        <h2 id="praxis-title" style="text-align:center; margin-bottom: var(--sp-8);">Praxis Frankfurt-Westend</h2>
        <div class="section-praxis__grid">
          <img src="images/praxis-westend.jpg" alt="Praxis Schleich, Innenansicht" class="section-praxis__photo" loading="lazy">
          <div>
            <img src="images/praxis-map.png" alt="Karte: Rappstr. 7-9, Frankfurt-Westend" class="section-praxis__map" loading="lazy">
            <address class="section-praxis__address">
              <strong>Praxis Schleich</strong><br>
              Rappstr. 7-9<br>
              60318 Frankfurt am Main
            </address>
            <p style="margin-top: var(--sp-3); font-size: var(--fs-sm); color: var(--text-muted);">5 Min. von der U-Bahn Westend, Parkplätze in der Rappstraße. Persönliches Erstgespräch wahlweise vor Ort oder online — du entscheidest.</p>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 5: Verify**

Visit page. Expected: Both sections render with placeholder images (gray boxes are fine). Layout is 2-column on desktop, stacks on mobile. Address visible.

- [ ] **Step 6: Commit**

```bash
git add index.html styles.css images/
git commit -m "feat(trust): add Sections 7-8 (Therapeutin + Praxis) with image placeholders"
```

---

## Task 10: Section 9 — Pricing (2 Cards)

**Files:**
- Modify: `index.html`, `styles.css`

- [ ] **Step 1: Add CSS**

Append to `styles.css`:

```css
/* ===== Section: Pricing ===== */
.section-pricing__title {
  text-align: center;
  margin-bottom: var(--sp-12);
}
.section-pricing__cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-6);
  max-width: 880px;
  margin: 0 auto;
}
@media (min-width: 768px) {
  .section-pricing__cards {
    grid-template-columns: 1fr 1fr;
  }
}
.pricing-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--sp-8);
  position: relative;
}
.pricing-card--featured {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
}
.pricing-card__badge {
  position: absolute;
  top: -12px;
  right: var(--sp-6);
  background: var(--accent);
  color: #fff;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  font-size: var(--fs-xs);
  font-weight: 600;
}
.pricing-card__name {
  font-size: var(--fs-md);
  margin-bottom: var(--sp-2);
}
.pricing-card__price {
  font-size: var(--fs-2xl);
  font-weight: 700;
  color: var(--text);
  margin-bottom: var(--sp-4);
}
.pricing-card__list {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--sp-6);
}
.pricing-card__list li {
  padding: var(--sp-2) 0;
  font-size: var(--fs-sm);
  color: var(--text-body);
  border-bottom: 1px solid var(--border);
}
.pricing-card__list li::before {
  content: "✓";
  color: var(--success);
  font-weight: 700;
  margin-right: var(--sp-2);
}
.pricing-card__target {
  font-size: var(--fs-xs);
  color: var(--text-muted);
  font-style: italic;
}
.section-pricing__addon {
  max-width: 880px;
  margin: var(--sp-8) auto 0;
  padding: var(--sp-4) var(--sp-6);
  background: var(--bg-soft);
  border-radius: var(--radius-md);
  font-size: var(--fs-sm);
  color: var(--text-body);
  text-align: center;
}
.section-pricing__note {
  max-width: 720px;
  margin: var(--sp-6) auto 0;
  text-align: center;
  font-size: var(--fs-xs);
  color: var(--text-muted);
}
```

- [ ] **Step 2: Add Section 9 to `index.html`**

Append:

```html
    <section class="section" aria-labelledby="pricing-title">
      <div class="container">
        <h2 id="pricing-title" class="section-pricing__title">Klare Preise. Kein Rechentrick.</h2>
        <div class="section-pricing__cards">
          <article class="pricing-card">
            <h3 class="pricing-card__name">Online-Kompakt</h3>
            <div class="pricing-card__price">650 €</div>
            <ul class="pricing-card__list">
              <li>4 Termine, davon 2 online möglich</li>
              <li>Inkl. allen Tests, Gutachten, Rückgabegespräch</li>
              <li>Mindestens 1 Termin vor Ort</li>
            </ul>
            <p class="pricing-card__target">Geeignet für: überregional, online-bevorzugt</p>
          </article>
          <article class="pricing-card pricing-card--featured">
            <span class="pricing-card__badge">Beliebt</span>
            <h3 class="pricing-card__name">Hybrid-Standard</h3>
            <div class="pricing-card__price">750 €</div>
            <ul class="pricing-card__list">
              <li>4 Termine, mind. 2 in Präsenz</li>
              <li>Inkl. allen Tests, Gutachten, Rückgabegespräch</li>
              <li>Beziehung über mehrere Termine aufbauen</li>
            </ul>
            <p class="pricing-card__target">Geeignet für: FFM-lokal, persönliche Vorlieben</p>
          </article>
        </div>
        <p class="section-pricing__addon">
          <strong>Erste 90 Tage</strong> als Anschluss-Modul: 350 € (3–6 Termine, optional)
        </p>
        <p class="section-pricing__note">Selbstzahler-Leistung. Bei PKV/Beihilfe in vielen Fällen erstattungsfähig — wir stellen GOÄ-konforme Rechnung.</p>
      </div>
    </section>
```

- [ ] **Step 3: Verify**

Both cards visible side-by-side on desktop, stack on mobile. „Beliebt"-Badge sits on Hybrid card. Add-on note styled subtly.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat(pricing): add Section 9 with two-tier pricing cards"
```

---

## Task 11: Section 10 — FAQ (Accordion)

**Files:**
- Modify: `index.html`, `styles.css`

Pure CSS accordion using native `<details>` — no JS.

- [ ] **Step 1: Add CSS**

Append to `styles.css`:

```css
/* ===== Section: FAQ ===== */
.section-faq__title {
  text-align: center;
  margin-bottom: var(--sp-8);
}
.section-faq__list {
  max-width: 720px;
  margin: 0 auto;
}
.faq-item {
  border-bottom: 1px solid var(--border);
  padding: var(--sp-3) 0;
}
.faq-item summary {
  cursor: pointer;
  list-style: none;
  font-size: var(--fs-md);
  font-weight: 600;
  color: var(--text);
  padding: var(--sp-3) 0;
  position: relative;
  padding-right: var(--sp-8);
}
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary::after {
  content: "+";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--fs-lg);
  color: var(--accent);
  font-weight: 400;
}
.faq-item[open] summary::after { content: "−"; }
.faq-item__body {
  padding: 0 0 var(--sp-3);
  color: var(--text-body);
}
```

- [ ] **Step 2: Add Section 10 + JSON-LD FAQPage schema**

Append before `</body>` in `<head>` after the existing JSON-LD blocks (insert just before the `<script defer>` for asrs):

```html
  <!-- JSON-LD: FAQPage -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Wer kommt zu euch in die Diagnostik?", "acceptedAnswer": { "@type": "Answer", "text": "Erwachsene mit ADHS-Verdacht, die ohne lange Wartezeit Klarheit suchen — Selbstzahler:innen und Privatversicherte." }},
      { "@type": "Question", "name": "Was kostet die Diagnostik genau?", "acceptedAnswer": { "@type": "Answer", "text": "Festpreis: 650 € (Online-Kompakt) oder 750 € (Hybrid-Standard). Keine versteckten Posten." }},
      { "@type": "Question", "name": "Erstattet meine Krankenkasse?", "acceptedAnswer": { "@type": "Answer", "text": "Die ADHS-Diagnostik ist eine Selbstzahler-Leistung. Bei PKV und Beihilfe ist eine Erstattung in vielen Fällen möglich — wir stellen GOÄ-konforme Rechnung." }},
      { "@type": "Question", "name": "Wie schnell bekomme ich einen Termin?", "acceptedAnswer": { "@type": "Answer", "text": "In der Regel innerhalb von 1–2 Wochen — deutlich schneller als die durchschnittlichen 13 Monate Wartezeit im Kassensystem in Hessen." }},
      { "@type": "Question", "name": "Kann ich die Diagnostik komplett online machen?", "acceptedAnswer": { "@type": "Answer", "text": "Mindestens ein Termin findet vor Ort in der Praxis Frankfurt-Westend statt — aus berufsrechtlichen und qualitativen Gründen. Die übrigen Termine kannst du flexibel online wahrnehmen." }},
      { "@type": "Question", "name": "Was passiert nach der Diagnose?", "acceptedAnswer": { "@type": "Answer", "text": "Bei freier Kapazität setzen wir die Therapie direkt bei uns fort. Wenn keine Kapazität frei ist, übergeben wir kuratiert ans FFM-Therapeut:innen-Netzwerk. Optional bieten wir das „Erste-90-Tage-Modul" als Brücke an." }},
      { "@type": "Question", "name": "Welche Tests setzt ihr ein?", "acceptedAnswer": { "@type": "Answer", "text": "Strukturierte Anamnese, ASRS-v1.1 Vollversion, WURS-K (Kindheits-Anamnese), und je nach Fragestellung weitere validierte Verfahren zur Differenzialdiagnostik." }},
      { "@type": "Question", "name": "Wird die Diagnose anerkannt?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Das Gutachten wird von einer approbierten Psychologischen Psychotherapeutin erstellt und ist im medizinischen wie behördlichen Kontext anerkannt." }},
      { "@type": "Question", "name": "Was unterscheidet euch von Online-Kliniken?", "acceptedAnswer": { "@type": "Answer", "text": "Wir sind eine echte Praxis in Frankfurt mit persönlicher Therapeutin — keine anonyme Online-Klinik. Außerdem denken wir die Anschlusstherapie schon mit der Diagnostik mit." }},
      { "@type": "Question", "name": "Was, wenn ich keine ADHS-Diagnose bekomme?", "acceptedAnswer": { "@type": "Answer", "text": "Die Diagnostik klärt zuverlässig — Ergebnis offen. Wenn ADHS ausgeschlossen wird, bekommst du dennoch ein ausführliches Gutachten und wir besprechen, was alternativ relevant sein könnte." }}
    ]
  }
  </script>
```

Then append the visible section to `<main>`:

```html
    <section class="section section--soft" aria-labelledby="faq-title">
      <div class="container">
        <h2 id="faq-title" class="section-faq__title">Häufige Fragen</h2>
        <div class="section-faq__list">
          <details class="faq-item">
            <summary>Wer kommt zu euch in die Diagnostik?</summary>
            <p class="faq-item__body">Erwachsene mit ADHS-Verdacht, die ohne lange Wartezeit Klarheit suchen — Selbstzahler:innen und Privatversicherte. Häufig sind es Menschen, die schon lange den Verdacht haben oder über Bekannte / Social Media darauf gestoßen sind.</p>
          </details>
          <details class="faq-item">
            <summary>Was kostet die Diagnostik genau, gibt es versteckte Posten?</summary>
            <p class="faq-item__body">Festpreis. 650 € für das Online-Kompakt-Paket oder 750 € für den Hybrid-Standard. Beides inkludiert alle Termine, Tests und das schriftliche Gutachten. Keine versteckten Posten.</p>
          </details>
          <details class="faq-item">
            <summary>Erstattet meine Krankenkasse / PKV / Beihilfe?</summary>
            <p class="faq-item__body">Die ADHS-Diagnostik ist eine Selbstzahler-Leistung. Bei PKV und Beihilfe ist eine Erstattung in vielen Fällen möglich — wir stellen eine GOÄ-konforme Rechnung. Bei gesetzlichen Kassen ist keine Erstattung üblich.</p>
          </details>
          <details class="faq-item">
            <summary>Wie schnell bekomme ich einen Termin?</summary>
            <p class="faq-item__body">In der Regel innerhalb von 1–2 Wochen. Zum Vergleich: Die durchschnittliche Wartezeit auf einen Diagnostik-Termin im Kassensystem in Hessen liegt bei 13 Monaten.</p>
          </details>
          <details class="faq-item">
            <summary>Kann ich die Diagnostik komplett online machen?</summary>
            <p class="faq-item__body">Mindestens ein Termin findet vor Ort in der Praxis Frankfurt-Westend statt — aus berufsrechtlichen und qualitativen Gründen. Die übrigen Termine kannst du flexibel online wahrnehmen.</p>
          </details>
          <details class="faq-item">
            <summary>Was passiert nach der Diagnose, wenn ich Therapie brauche?</summary>
            <p class="faq-item__body">Bei freier Kapazität setzen wir die Therapie direkt bei Kata fort. Wenn keine Kapazität frei ist, übergeben wir kuratiert ans FFM-Therapeut:innen-Netzwerk. Optional gibt es unser „Erste-90-Tage-Modul" als Brücke (3–6 Termine, 350 €).</p>
          </details>
          <details class="faq-item">
            <summary>Welche Tests setzt ihr ein?</summary>
            <p class="faq-item__body">Strukturierte Anamnese, ASRS-v1.1 Vollversion, WURS-K (Kindheits-Anamnese), und je nach Fragestellung weitere validierte Verfahren zur Differenzialdiagnostik (Komorbiditäten wie Depression, Angst, Trauma).</p>
          </details>
          <details class="faq-item">
            <summary>Wird die Diagnose von Ärzt:innen / Arbeitgeber:innen anerkannt?</summary>
            <p class="faq-item__body">Ja. Das Gutachten wird von einer approbierten Psychologischen Psychotherapeutin erstellt und ist im medizinischen wie behördlichen Kontext anerkannt.</p>
          </details>
          <details class="faq-item">
            <summary>Was unterscheidet euch von Online-Kliniken wie GAM Medical?</summary>
            <p class="faq-item__body">Wir sind eine echte Praxis in Frankfurt mit einer persönlichen Therapeutin — keine anonyme Online-Klinik. Außerdem denken wir die Anschlusstherapie schon mit der Diagnostik mit, statt dich nach dem Gutachten alleine zu lassen.</p>
          </details>
          <details class="faq-item">
            <summary>Was, wenn ich am Ende keine ADHS-Diagnose bekomme?</summary>
            <p class="faq-item__body">Die Diagnostik klärt zuverlässig — Ergebnis offen. Wenn ADHS ausgeschlossen wird, bekommst du dennoch ein ausführliches Gutachten, und wir besprechen, was alternativ relevant sein könnte.</p>
          </details>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: Verify**

- Click each FAQ item — opens/closes smoothly.
- Plus-icon switches to minus-icon on open.
- Keyboard navigation works: Tab focuses summary, Enter toggles.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat(faq): add Section 10 FAQ accordion with FAQPage schema"
```

---

## Task 12: Sections 11 + 12 — Final CTA + Footer

**Files:**
- Modify: `index.html`, `styles.css`
- Create: `impressum.html`, `datenschutz.html`

- [ ] **Step 1: Add CSS**

Append to `styles.css`:

```css
/* ===== Section: Final CTA ===== */
.section-cta {
  background: var(--accent);
  color: #fff;
  text-align: center;
}
.section-cta h2 {
  color: #fff;
  margin-bottom: var(--sp-3);
}
.section-cta__sub {
  color: rgba(255,255,255,0.85);
  font-size: var(--fs-md);
  margin-bottom: var(--sp-8);
}
.section-cta__buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--sp-3);
}
.section-cta .btn--primary {
  background: #fff;
  color: var(--accent);
}
.section-cta .btn--secondary {
  border-color: #fff;
  color: #fff;
}

/* ===== Footer ===== */
.site-footer {
  background: var(--text);
  color: rgba(255,255,255,0.7);
  padding: var(--sp-8) 0;
  font-size: var(--fs-sm);
}
.site-footer a { color: rgba(255,255,255,0.85); }
.site-footer a:hover { color: #fff; }
.site-footer__grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-6);
  justify-content: space-between;
  align-items: start;
}
.site-footer__nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-4);
}
.site-footer__legal {
  font-size: var(--fs-xs);
  color: rgba(255,255,255,0.5);
}
```

- [ ] **Step 2: Add Sections 11 + 12 to `index.html`**

Append:

```html
    <section id="termin" class="section section-cta" aria-labelledby="cta-title">
      <div class="container">
        <h2 id="cta-title">Bereit für Klarheit?</h2>
        <p class="section-cta__sub">Zwei Wege, die nächsten Schritte zu gehen.</p>
        <div class="section-cta__buttons">
          <a href="#selbsttest" class="btn btn--primary">Selbsttest starten</a>
          <a href="mailto:termin@psychotherapie-schleich.de?subject=ADHS-Diagnostik%20Termin" class="btn btn--secondary">Direkt Termin buchen</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__grid">
        <div>
          <strong style="color: #fff;">Praxis Schleich</strong><br>
          Rappstr. 7-9 · 60318 Frankfurt am Main
        </div>
        <nav class="site-footer__nav" aria-label="Footer">
          <a href="/impressum.html">Impressum</a>
          <a href="/datenschutz.html">Datenschutz</a>
          <a href="/spaetdiagnose-frauen.html">ADHS bei Frauen</a>
          <a href="mailto:kontakt@psychotherapie-schleich.de">Kontakt</a>
        </nav>
      </div>
      <p class="site-footer__legal" style="margin-top: var(--sp-6);">© 2026 Praxis Katarina Schleich · Approbierte Psychologische Psychotherapeutin · Diagnostik ist eine Selbstzahler-Leistung. Kein Heilversprechen.</p>
    </div>
  </footer>
```

Note: The buchungs-link is a `mailto:` for now — replaces the previous `#termin` anchor target since this section IS `#termin`. The booking system is a follow-up phase per spec section 1.3.

- [ ] **Step 3: Create `impressum.html`**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Impressum — Praxis Schleich</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="container" style="padding: var(--sp-16) var(--gutter); max-width: 720px;">
    <h1>Impressum</h1>
    <p><em>Platzhalter — der finale Inhalt wird von Kata vor Launch ergänzt.</em></p>
    <h2>Angaben gemäß § 5 TMG</h2>
    <address style="font-style: normal;">
      Dipl.-Psych. Katarina Schleich<br>
      Approbierte Psychologische Psychotherapeutin<br>
      Rappstr. 7-9<br>
      60318 Frankfurt am Main<br>
      <br>
      Telefon: [TBD]<br>
      E-Mail: kontakt@psychotherapie-schleich.de
    </address>
    <h2>Aufsichtsbehörde</h2>
    <p>[Landesärztekammer / Psychotherapeutenkammer Hessen — TBD]</p>
    <h2>Berufsrechtliche Regelungen</h2>
    <p>Berufsbezeichnung: Psychologische Psychotherapeutin (verliehen in Deutschland)<br>
    Zuständige Kammer: Landesvereinigung Psychotherapeutenkammer Hessen</p>
    <p style="margin-top: var(--sp-8);"><a href="/">← Zurück zur Startseite</a></p>
  </main>
</body>
</html>
```

- [ ] **Step 4: Create `datenschutz.html`**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Datenschutz — Praxis Schleich</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="container" style="padding: var(--sp-16) var(--gutter); max-width: 720px;">
    <h1>Datenschutzerklärung</h1>
    <p><em>Platzhalter — der finale Inhalt wird von Kata in Abstimmung mit Datenschutz-Berater:in vor Launch ergänzt.</em></p>
    <h2>Verantwortlicher</h2>
    <p>Dipl.-Psych. Katarina Schleich, Rappstr. 7-9, 60318 Frankfurt am Main.</p>
    <h2>Erhobene Daten</h2>
    <p>Diese Webseite erhebt:</p>
    <ul>
      <li>Anonyme Nutzungsstatistik via Plausible Analytics (cookieless, DSGVO-konform).</li>
      <li>ASRS-Selbsttest: lokal im Browser ausgeführt, keine Übertragung von Antworten an unseren Server.</li>
      <li>E-Mail-Adresse nur, wenn freiwillig im Kontext des Selbsttest-PDFs angegeben (Double-Opt-In).</li>
    </ul>
    <h2>Schweigepflicht</h2>
    <p>Im Rahmen der Diagnostik und Behandlung erhobene Daten unterliegen der Schweigepflicht nach § 203 StGB.</p>
    <p style="margin-top: var(--sp-8);"><a href="/">← Zurück zur Startseite</a></p>
  </main>
</body>
</html>
```

- [ ] **Step 5: Verify**

Visit page. Final CTA section is the second-to-last (before footer), full-width blue background, white text, two CTAs. Footer is dark with two nav links visible. Click „Impressum" → loads placeholder page. Click „Datenschutz" → loads placeholder page. Click „Zurück zur Startseite" from each → back to main.

- [ ] **Step 6: Commit**

```bash
git add index.html styles.css impressum.html datenschutz.html
git commit -m "feat(footer): add Sections 11-12 (final CTA + footer + legal placeholders)"
```

---

## Task 13: SEO Files (robots.txt + sitemap.xml)

**Files:**
- Create: `robots.txt`, `sitemap.xml`

- [ ] **Step 1: Create `robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://psychotherapie-schleich.de/sitemap.xml
```

- [ ] **Step 2: Create `sitemap.xml`**

Note: We only list pages that actually exist after this build. The sister LP `/spaetdiagnose-frauen.html` is a separate phase — its sitemap entry will be added when that page ships.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://psychotherapie-schleich.de/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://psychotherapie-schleich.de/impressum.html</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://psychotherapie-schleich.de/datenschutz.html</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <!-- TODO: add /spaetdiagnose-frauen.html when sister LP ships -->
</urlset>
```

- [ ] **Step 3: Verify XML**

Run: `python3 -c "import xml.etree.ElementTree as ET; ET.parse('sitemap.xml'); print('Sitemap valid')"`
Expected: `Sitemap valid`

- [ ] **Step 4: Commit**

```bash
git add robots.txt sitemap.xml
git commit -m "feat(seo): add robots.txt and sitemap.xml"
```

---

## Task 14: Smooth-Scroll for Anchor Links

**Files:**
- Modify: `styles.css`

The hero CTAs link to `#selbsttest` and `#termin`. Browsers default to instant jump — smooth scroll is more polished.

- [ ] **Step 1: Add CSS rule**

Append to `styles.css` (top, right after the `:root` block):

```css
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

(Find a logical place — under the `:root { ... }` close.)

- [ ] **Step 2: Verify**

Visit page, click hero "Selbsttest starten" → smooth scroll to ASRS section. Click "Termin buchen →" → smooth scroll to final CTA.
For users with motion-reduce preference: instant jump (verify by toggling system setting if accessible, or trust the media query).

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat(ux): add smooth-scroll with prefers-reduced-motion fallback"
```

---

## Task 15: Final Verification Pass (Acceptance Criteria from Spec Section 9)

This is the gate before declaring the page ready.

- [ ] **Step 1: Run local server and visual smoke test**

```bash
python3 -m http.server 8000
```

Visit `http://localhost:8000/` and walk top-to-bottom:
1. Hero with pill, headline (highlight visible), sub, two CTAs, three trust items, photo placeholder
2. Hybrid 3-column value-prop
3. ASRS test (run it once with mixed answers — verify result screen with USP)
4. Spätdiagnose pain section with 4 statements + bridge link
5. 4-step process stepper
6. Anschluss section (dark, USP soft language)
7. Therapeutin section (photo + bio placeholder)
8. Praxis section (photo + map + address)
9. Pricing (2 cards + addon + note)
10. FAQ (10 items, click a few — accordion works)
11. Final CTA (blue full-width)
12. Footer (dark, nav links work)

Resize browser to 360px → all sections stack cleanly, no horizontal scroll. Resize to 1440px → everything centered with max-width.

- [ ] **Step 2: Lighthouse audit**

In Chrome DevTools, open Lighthouse, run for Mobile, all categories.
Expected (per spec section 1.2 + 9):
- Performance ≥ 95
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

If any score is below: read the report, identify quick fixes (missing `alt` text? missing `lang`? bad contrast?), apply fixes, retest.

- [ ] **Step 3: HTML validation**

Run: `npx --yes html-validate index.html impressum.html datenschutz.html || true`
If issues: fix structural HTML errors. (Warnings are okay; errors should be fixed.)

Alternatively: paste each HTML into https://validator.w3.org/.

- [ ] **Step 4: JSON-LD validation**

Run: `python3 -c "import json, re; html=open('index.html').read(); blocks=re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', html, re.DOTALL); [json.loads(b) for b in blocks]; print(f'{len(blocks)} JSON-LD blocks valid')"`
Expected: `3 JSON-LD blocks valid` (MedicalClinic, Person, FAQPage)

Optional: paste each into https://search.google.com/test/rich-results.

- [ ] **Step 5: Acceptance checklist (spec section 9)**

Verify each criterion from spec section 9:

| # | Criterion | Pass? |
|---|---|---|
| 1 | All 12 sections present in correct order | [ ] |
| 2 | ASRS test works end-to-end (6 items → score → result with USP + CTA) | [ ] |
| 3 | Lighthouse ≥ 95 in all four categories | [ ] |
| 4 | Mobile responsive ab 360px (iOS Safari + Android Chrome — at minimum DevTools mobile emulation) | [ ] |
| 5 | All CTAs functional (smooth-scroll OR mailto) | [ ] |
| 6 | JSON-LD validates (Rich Results test) | [ ] |
| 7 | HWG/DSGVO/MDR compliance: no Heilversprechen, ASRS labeled as Screening, Plausible cookieless (script not yet wired), no Google Maps embed | [ ] |
| 8 | Impressum + Datenschutz linked, non-empty (placeholder content explicit) | [ ] |
| 9 | Real photos: PLACEHOLDER ONLY — Kata to provide, see images/README.md | [ ] (deferred — known) |
| 10 | Plausible Analytics: NOT YET WIRED (deferred to follow-up — spec lists it but stub script not added since it requires deployment) | [ ] (deferred) |

Items 9 and 10 are explicitly deferred to follow-up phases per spec section 1.3 / 8 — they are not blockers for the build phase.

- [ ] **Step 6: Document remaining manual tasks for Kata in `README.md`**

Append to `README.md`:

```markdown

## Vor Live-Gang noch zu erledigen (Kata)

- [ ] Echte Fotos in `images/` einbinden (siehe [images/README.md](images/README.md))
- [ ] Persönliche Note in Sektion 7 ausformulieren (Platzhalter im HTML markiert)
- [ ] Praxis-Geburtsjahr in Sektion 7 einsetzen (aktuell „Praxis seit 20XX")
- [ ] Telefon-Nummer in `impressum.html` und JSON-LD ergänzen
- [ ] Datenschutzerklärung mit Datenschutz-Berater:in finalisieren
- [ ] Aufsichtsbehörde in `impressum.html` ergänzen
- [ ] Plausible Analytics einbinden (nach Deployment)
- [ ] Buchungs-System ersetzen (`mailto:` → echte Buchungs-Strecke)
```

- [ ] **Step 7: Final commit**

```bash
git add README.md
git commit -m "chore: document outstanding manual tasks for Kata before launch"
git log --oneline
```

Expected: clean commit history with 14+ atomic commits, each task on its own commit.

---

## Done

The landing page is structurally complete and matches the spec. Remaining items are content (Kata's photos, copy refinements, legal review) and deployment (Coolify + Plausible wiring), which are explicit follow-up phases.

**Verify via spec section 9 acceptance criteria** — items 1–8 should pass, items 9–10 are knowingly deferred.

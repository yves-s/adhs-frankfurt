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
      <div class="asrs__progress">
        <div class="asrs__progress-bar"
             role="progressbar"
             aria-label="Fortschritt"
             aria-valuenow="${currentItem}"
             aria-valuemin="0"
             aria-valuemax="6"
             style="width: ${progress}%"></div>
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

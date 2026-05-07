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

## Vor Live-Gang noch zu erledigen (Kata)

- [ ] Echte Fotos in `images/` einbinden (siehe [images/README.md](images/README.md))
- [ ] Persönliche Note in Sektion 7 ausformulieren (Platzhalter im HTML markiert)
- [ ] Praxis-Geburtsjahr in Sektion 7 einsetzen (aktuell „Praxis seit 20XX")
- [ ] Telefon-Nummer in `impressum.html` und JSON-LD ergänzen
- [ ] Datenschutzerklärung mit Datenschutz-Berater:in finalisieren
- [ ] Aufsichtsbehörde in `impressum.html` ergänzen
- [ ] Plausible Analytics einbinden (nach Deployment)
- [ ] Buchungs-System ersetzen (`mailto:` → echte Buchungs-Strecke)

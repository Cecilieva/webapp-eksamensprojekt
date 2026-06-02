import "./FilterPanel.css";

import { MATCHSCORE_OPTIONS } from "../lib/filterOptions";
// Importerer de faste matchscore-valgmuligheder

export default function FilterMatchscore({ value, onChange }) {
  return (
    <div
      className="matchscore-options"
      role="radiogroup"
      aria-label="Matchscore"
    >
      {/* Wrapper for radiogruppe med matchscore-valg */}

      {MATCHSCORE_OPTIONS.map((item) => {
        const checked = value === item;
        // Tjekker om dette item er det valgte

        return (
          <label
            key={item}
            className={`matchscore-option ${checked ? "is-selected" : ""}`}
          >
            {/* Hver valgmulighed — får 'is-selected' når den er valgt */}

            <input
              type="radio"
              name="matchscore"
              value={item}
              checked={checked}
              onChange={(e) => onChange(e.target.value)}
            />
            {/* Selve radio-inputtet — opdaterer matchscore ved klik */}

            <p className="option-marker" aria-hidden="true" />
            {/* Visuel markør (den lille boks) — skjules for skærmlæsere */}

            <p className="option-label">{item}</p>
            {/* Tekstlabel for matchscore-værdien */}
          </label>
        );
      })}
    </div>
  );
}

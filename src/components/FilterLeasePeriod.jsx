import { LEASE_PERIOD_OPTIONS } from "../lib/filterOptions"; // Importerer de faste valgmuligheder for lejeperiode

import "./FilterPanel.css";
// Styling til lejeperiode-sektionen

export default function FilterLeasePeriod({ value, onChange }) {
  return (
    <div className="lease-options" role="radiogroup" aria-label="Lejeperiode">
      {/* Wrapper for radiogruppe med lejeperiode-valg */}

      {LEASE_PERIOD_OPTIONS.map((option) => {
        const checked = value === option.value;
        // Tjekker om denne valgmulighed er den valgte

        return (
          <label
            key={option.value}
            className={`option-row lease-option ${checked ? "is-selected" : ""}`}
          >
            {/* Hver valgmulighed — får 'is-selected' når den er aktiv */}

            <input
              type="radio"
              name="leasePeriod"
              value={option.value}
              checked={checked}
              onChange={(e) => onChange(e.target.value)}
            />
            {/* Radio-input — opdaterer lejeperioden ved klik */}

            <p className="option-marker" aria-hidden="true" />
            {/* Visuel markør (den lille cirkel) — skjules for skærmlæsere */}

            <p className="option-label">{option.label}</p>
            {/* Tekstlabel for lejeperiode (fx '3 mdr', '6 mdr', '12 mdr') */}
          </label>
        );
      })}
    </div>
  );
}

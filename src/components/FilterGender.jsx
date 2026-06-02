
import { GENDER_OPTIONS } from "../lib/filterOptions"; // Importerer de faste kønsvalg
import "./FilterPanel.css";

export default function FilterGender({ value, onChange }) {
  return (
    <div className="gender-options" role="radiogroup" aria-label="Køn">
      {/* Radiogruppe for valg af køn */}

      {GENDER_OPTIONS.map((option) => {
        const checked = value === option.value;
        // Tjekker om denne valgmulighed er den valgte

        return (
          <label
            key={option.value}
            className={`option-row gender-option ${checked ? "is-selected" : ""}`}
          >
            {/* En enkelt kønsvalgmulighed */}

            <input
              type="radio"
              name="gender"
              value={option.value}
              checked={checked}
              onChange={(e) => onChange(e.target.value)}
            />
            {/* Radio-input — opdaterer køn ved klik */}

            <p className="option-marker" aria-hidden="true" />
            {/* Visuel markør — skjules for skærmlæsere */}

            <p className="option-label">{option.label}</p>
            {/* Tekstlabel for kønsvalget */}
          </label>
        );
      })}
    </div>
  );
}

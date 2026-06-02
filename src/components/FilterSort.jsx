import { SORT_OPTIONS } from "../lib/filterOptions"; // Importerer sorteringsmuligheder fra en ekstern fil

import "./FilterPanel.css";

export default function FilterSort({ value, onChange }) {
  // Komponent modtager den aktuelle sorteringsværdi og en onChange-handler
  return (
    <div className="sort-options" role="radiogroup" aria-label="Sortér">
      {/* Wrapper for sorteringsmulighederne, bruger ARIA for tilgængelighed */}
      {SORT_OPTIONS.map((option) => {
        const checked = value === option.value;
        // Tjekker om denne mulighed er valgt

        return (
          <label
            key={option.value}
            className={`option-row sort-option ${checked ? "is-selected" : ""}`}
            // Tilføjer en klasse hvis valgt
          >
            <input
              type="radio"
              name="sort"
              value={option.value}
              checked={checked}
              onChange={(event) => onChange(event.target.value)}
              // Opdaterer sorteringsvalg ved ændring
            />

            <p className="option-marker" aria-hidden="true" />
            {/* Visuelt markeringsfelt, skjult for skærmlæsere */}
            <p className="option-label">{option.label}</p>
            {/* Viser label for sorteringsmuligheden */}
          </label>
        );
      })}
    </div>
  );
}

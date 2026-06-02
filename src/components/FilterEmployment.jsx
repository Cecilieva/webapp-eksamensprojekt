import { OCCUPATION_OPTIONS } from "../lib/FilterOptions"; // Importerer listen over beskæftigelsesmuligheder

import "./FilterPanel.css";

export default function FilterOccupation({ values, onToggle }) {
  return (
    <div className="checklist" role="group" aria-label="Beskæftigelse">
      {/* Gruppe af checkboxe for beskæftigelsestyper */}

      {OCCUPATION_OPTIONS.map((item) => (
        <label
          key={item}
          className={`checklist-option ${values[item] ? "is-selected" : ""}`}
        >
          {/* En enkelt beskæftigelsesmulighed — markeres som valgt hvis true */}

          <input
            type="checkbox"
            checked={!!values[item]} // Sikrer at værdien altid er boolean
            onChange={() => onToggle("occupation", item)}
          />
          {/* Checkbox — toggler beskæftigelsen i filter-state */}

          <p className="option-marker checklist-marker" aria-hidden="true" />
          {/* Visuel markør — skjules for skærmlæsere */}

          <p className="option-label">{item}</p>
          {/* Tekstlabel for beskæftigelsestypen */}
        </label>
      ))}
    </div>
  );
}

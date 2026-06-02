import { FACILITIES } from "../lib/FilterOptions";// Importerer listen over mulige boligfaciliteter

import "./FilterPanel.css";

export default function FilterFacilities({ values, onToggle }) {
  return (
    <div className="checklist" role="group" aria-label="Bolig faciliteter">
      {/* Gruppe af checkboxe for boligfaciliteter */}

      {FACILITIES.map((item) => (
        <label
          key={item}
          className={`checklist-option ${values[item] ? "is-selected" : ""}`}
        >
          {/* En enkelt facilitet — markeres som valgt hvis værdien er true */}

          <input
            type="checkbox"
            checked={values[item]}
            onChange={() => onToggle("facilities", item)}
          />
          {/* Checkbox — toggler faciliteten i filter-state */}

          <p className="option-marker checklist-marker" aria-hidden="true" />
          {/* Visuel markør — skjules for skærmlæsere */}

          <p className="option-label">{item}</p>
          {/* Navnet på faciliteten */}
        </label>
      ))}
    </div>
  );
}

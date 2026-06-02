import arrowDown from "../assets/dropdown-arrow-icon.svg"; // Importerer det custom dropdown‑ikon

import "./FilterPanel.css";

export default function SelectField({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Vælg...",
  ariaLabel,
  className = "",
}) {
  return (
    <label className={`selectField ${className}`}>
      {/* Wrapper for hele select‑feltet */}

      {label && <p className="selectField-label">{label}</p>}
      {/* Viser label hvis det er angivet */}

      <select
        aria-label={ariaLabel || label}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="selectField-select"
      >
        {/* Selve dropdown‑elementet */}

        <option value="">{placeholder}</option>
        {/* Placeholder‑option når ingen værdi er valgt */}

        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
        {/* Mapper alle valgmuligheder — understøtter både simple strings og {label, value} objekter */}
      </select>

      {/* Custom ikon — vises visuelt men ignoreres af skærmlæsere */}
      <img
        src={arrowDown}
        alt=""
        className="selectField-icon"
        aria-hidden="true"
      />
    </label>
  );
}

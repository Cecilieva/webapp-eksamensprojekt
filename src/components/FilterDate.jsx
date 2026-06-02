export default function FilterDate({ value, onChange, ariaLabel }) {
  return (
    <label className="date-field">
      {/* Wrapper for dato-inputfeltet */}

      <input
        type="date"
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {/* Dato‑vælger — opdaterer værdien når brugeren vælger en dato */}
    </label>
  );
}

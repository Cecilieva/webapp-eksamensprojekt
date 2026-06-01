import "./ChatFilters.css";

/* Tilgængelige filtre */
const FILTERS = [
  ["alle", "Alle"],
  ["ulæst", "Ulæst"],
  ["grupper", "Grupper"],
  ["anmodninger", "(3) Anmodninger"],
];

export default function ChatFilters({ activeFilter, onChange }) {
  return (
    /* Filter-knapper */
    <nav className="chat-filters" aria-label="Filtre">
      {FILTERS.map(([value, label]) => (
        <button
          key={value}
          type="button"
          className={`chat-chip ${activeFilter === value ? "is-active" : ""}`}
          onClick={() => onChange(value)}
        >
          {/* Filter-navn */}
          <small>{label}</small>
        </button>
      ))}
    </nav>
  );
}

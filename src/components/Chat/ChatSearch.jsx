import "./ChatSearch.css";

export default function ChatSearch({ value, onChange }) {
  return (
    /* Søgefelt til filtrering af beskeder */
    <label className="chat-search">
      <input
        type="search"
        placeholder="Søg..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

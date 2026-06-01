export default function ChatSearch({ value, onChange }) {
  return (
    <label className="chat-search">
      <span className="sr-only">Søg i beskeder</span>
      <input
        type="search"
        placeholder="Søg..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

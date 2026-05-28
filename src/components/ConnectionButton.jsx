import "./ConnectionButton.css";

export default function ConnectionButton({ enabled = true }) {
  if (!enabled) return null;

  return (
    <button className="connection-button">
      <h4>Anmod om forbindelse</h4>
    </button>
  );
}

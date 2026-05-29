import "./ConnectionButton.css";

export default function ConnectionButton({ enabled = true }) {
  /* Skjul knappen helt hvis den ikke er aktiveret */
  if (!enabled) return null;

  return (
    <button className="connection-button">
      <h4>Anmod om forbindelse</h4>
    </button>
  );
}

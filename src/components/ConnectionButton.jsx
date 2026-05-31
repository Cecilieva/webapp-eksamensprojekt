import "./ConnectionButton.css";

export default function ConnectionButton({ enabled = true, onOpenOverlay }) {
  /* Skjul knappen helt hvis den ikke er aktiveret */
  if (!enabled) return null;

  return (
    <button className="connection-button" onClick={onOpenOverlay}>
      <h4>Anmod om forbindelse</h4>
    </button>
  );
}

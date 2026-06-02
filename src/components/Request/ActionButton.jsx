import { useState } from "react";

/* Genanvendelig knap med forskellige varianter */
function ActionButton({ variant, label, onClick }) {
  /* Holder styr på om knappen er trykket ned */
  const [down, setDown] = useState(false);

  /* Vælger CSS-klasse ud fra knaptype */
  const variantClass =
    variant === "lime"
      ? "request-btn--lime"
      : variant === "beige"
        ? "request-btn--beige"
        : variant === "ghost"
          ? "request-btn--ghost"
          : "";

  return (
    <button
      type="button"
      className={`request-btn ${variantClass} ${down ? "is-down" : ""}`}
      /* Tilføjer pressed-state på desktop */
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      onMouseLeave={() => setDown(false)}
      /* Tilføjer pressed-state på touch-enheder */
      onTouchStart={() => setDown(true)}
      onTouchEnd={() => setDown(false)}
      /* Udfører handling ved klik */
      onClick={onClick}
    >
      <small>{label}</small>
    </button>
  );
}

export default ActionButton;

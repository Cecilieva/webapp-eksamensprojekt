import { useState } from "react";

function ActionButton({ variant, label, onClick }) {
  const [down, setDown] = useState(false);

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
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      onMouseLeave={() => setDown(false)}
      onTouchStart={() => setDown(true)}
      onTouchEnd={() => setDown(false)}
      onClick={onClick}
    >
      <small>{label}</small>
    </button>
  );
}

export default ActionButton;

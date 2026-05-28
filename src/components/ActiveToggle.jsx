import { useState } from "react";
import "./ActiveToggle.css";

export default function ActiveToggle({
  enabled = true,
  defaultValue = true,
  onChange,
}) {
  const [active, setActive] = useState(defaultValue);

  if (!enabled) return null;

  function toggle() {
    const next = !active;
    setActive(next);
    onChange?.(next);
  }

  return (
    <button
      type="button"
      className={`active-toggle ${active ? "is-active" : "is-inactive"}`}
      onClick={toggle}
    >
      <p className="toggle-label">{active ? "Aktiv" : "Inaktiv"}</p>
      <span className="toggle-knob" />
    </button>
  );
}

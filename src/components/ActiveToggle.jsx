import { useState } from "react";
import "./ActiveToggle.css";

export default function ActiveToggle({
  enabled = true,       // Om togglen overhovedet skal vises
  defaultValue = true,  // Starttilstand (aktiv/inaktiv)
  onChange,             // Callback når værdien ændres
}) {
  // Intern state der styrer om togglen er aktiv eller ej
  const [active, setActive] = useState(defaultValue);

  // Hvis komponenten er slået fra, renderes den slet ikke
  if (!enabled) return null;

  // Skifter mellem aktiv og inaktiv tilstand
  function toggle() {
    const next = !active;   // Beregn næste tilstand
    setActive(next);        // Opdater intern state
    onChange?.(next);       // Informér parent-komponent hvis callback findes
  }

  return (
    <button
      type="button"
      className={`active-toggle ${active ? "is-active" : "is-inactive"}`}
      onClick={toggle}
    >
      {/* Tekstlabel der viser aktuel tilstand (aktiv/inaktiv) */}
      <p className="toggle-label">{active ? "Aktiv" : "Inaktiv"}</p>

      {/* Visuel knob der flytter sig afhængigt af aktiv state */}
      <span className="toggle-knob" />
    </button>
  );
}

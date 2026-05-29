import { useNavigate } from "react-router-dom";
import "./MatchButton.css";

export default function MatchButton({ enabled = true }) {
  const navigate = useNavigate();

  /* Skjul knappen helt hvis den ikke er aktiveret */
  if (!enabled) return null;

  return (
    <button
      type="button"
      className="match-button"
      onClick={() => navigate("/notfound")}
    >
      {/* CTA til at ændre/redigere match-svar */}
      <h4>Ret match svar</h4>
    </button>
  );
}

import { useNavigate } from "react-router-dom";
import "./MatchButton.css";

export default function MatchButton({ enabled = true }) {
  const navigate = useNavigate();

  if (!enabled) return null;

  return (
    <button
      type="button"
      className="match-button"
      onClick={() => navigate("/notfound")}
    >
      <h4>Ret match svar</h4>
    </button>
  );
}

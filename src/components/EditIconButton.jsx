/* Reusable icon-button til redigering og gem-funktion */
import ProfileIcon from "./ProfileIcon";
import "./EditIconButton.css";

export default function EditIconButton({
  enabled = true,
  editing = false,
  onClick,
}) {
  /* Skjul knappen helt hvis den ikke er aktiveret */
  if (!enabled) return null;

  return (
    <button type="button" className="edit-icon-button" onClick={onClick}>
      
      {/* Skifter ikon afhængigt af om vi er i edit-tilstand */}
      <ProfileIcon name={editing ? "checkmark-icon.svg" : "edit-icon.svg"} />
    </button>
  );
}

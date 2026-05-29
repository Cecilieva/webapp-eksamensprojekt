/* Reusable edit icon button */
import ProfileIcon from "./ProfileIcon";
import "./EditIconButton.css";

export default function EditIconButton({
  enabled = true,
  editing = false,
  onClick,
}) {
  if (!enabled) return null;

  return (
    <button type="button" className="edit-icon-button" onClick={onClick}>
      <ProfileIcon name={editing ? "checkmark-icon.svg" : "edit-icon.svg"} />
    </button>
  );
}

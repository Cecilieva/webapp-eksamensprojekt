/* Genanvendelig række til visning og redigering af profiloplysninger */
import EditIconButton from "./EditIconButton";

export default function ProfileInfoRow({
  icon,
  value,
  field,
  editing,
  editValue,
  setEditValue,
  onEdit,
  onSave,
  editable = true,
}) {
  // Tjekker om det aktuelle felt er i redigeringstilstand
  const isEditing = editing === field;

  return (
    <div className="info-row">
      {/* Ikon for profiloplysningen */}
      <span className="info-icon">{icon}</span>

      {/* Viser inputfelt ved redigering, ellers vises værdien */}
      {isEditing ? (
        <p className="info-input-wrapper">
          <input
            className="info-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
        </p>
      ) : (
        <p>{value}</p>
      )}

      {/* Knap til redigering eller gemning */}
      <EditIconButton
        enabled={editable}
        editing={isEditing}
        onClick={isEditing ? onSave : onEdit}
      />
    </div>
  );
}

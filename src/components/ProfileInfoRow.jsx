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
  const isEditing = editing === field;

  return (
    <div className="info-row">
      <span className="info-icon">{icon}</span>

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

      <EditIconButton
        enabled={editable}
        editing={isEditing}
        onClick={isEditing ? onSave : onEdit}
      />
    </div>
  );
}

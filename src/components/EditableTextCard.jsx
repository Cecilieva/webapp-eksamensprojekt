import { useEffect, useRef } from "react";
import EditIconButton from "./EditIconButton";
import "./EditableTextCard.css";

export default function EditableTextCard({
  children,
  editing,
  value,
  setValue,
  editable = true,
  onEdit,
  onSave,
}) {
  const textareaRef = useRef(null);

  /* Auto-resize textarea når den går i edit-mode eller indhold ændres */
  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [editing, value]);

  return (
    <div className="white-card editable-card">
      {/* Skifter mellem visning og redigering baseret på editing-state */}
      {editing ? (
        <textarea
          ref={textareaRef}
          className="card-input"
          value={value}
          onChange={(e) => {
            /* Opdaterer state i parent */
            setValue(e.target.value);

            /* Dynamisk højde så textarea vokser med indhold */
            e.target.style.height = "0px";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
      ) : (
        /* Read-only visning */
        <p>{children}</p>
      )}

      {/* Knap der skifter mellem edit og save afhængigt af state */}
      <EditIconButton
        enabled={editable}
        editing={editing}
        onClick={editing ? onSave : onEdit}
      />
    </div>
  );
}

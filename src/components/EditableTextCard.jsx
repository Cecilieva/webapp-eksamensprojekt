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

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [editing, value]);

  return (
    <div className="white-card editable-card">
      {editing ? (
        <textarea
          ref={textareaRef}
          className="card-input"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);

            e.target.style.height = "0px";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
      ) : (
        <p>{children}</p>
      )}

      <EditIconButton
        enabled={editable}
        editing={editing}
        onClick={editing ? onSave : onEdit}
      />
    </div>
  );
}

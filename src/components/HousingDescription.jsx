import { useState } from "react";
import EditableTextCard from "./EditableTextCard";

// Komponent til at vise og redigere beskrivelse af bolig
export default function HousingDescription({
  text,
  editable = false,
  onSaveDescription,
}) {
  // State til om der redigeres
  const [editing, setEditing] = useState(false);
  // State til lokal værdi
  const [value, setValue] = useState(text ?? "");

  // Sync lokal draft når ikke-redigerende og prop ændres
  if (!editing && value !== (text ?? "")) {
    setValue(text ?? "");
  }

  // Gem beskrivelse
  const save = async () => {
    if (onSaveDescription) await onSaveDescription(value);
    setEditing(false);
  };

  // Render editable text card
  return (
    <EditableTextCard
      editing={editing}
      value={value}
      setValue={setValue}
      editable={editable}
      onEdit={() => setEditing(true)}
      onSave={save}
    >
      <span className="housing-description">{text}</span>
    </EditableTextCard>
  );
}

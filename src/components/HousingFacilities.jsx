import { useEffect, useRef, useState } from "react";

import "./TagList.css";

import addIcon from "../assets/add-icon.svg";
import blackCheckmark from "../assets/black-checkmark-icon.svg";
import closeIcon from "../assets/close-icon.svg";

export default function HousingFacilities({
  facilities = [],
  editable = false,
  onAdd,
  onRemove,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newValue, setNewValue] = useState("");

  const addRef = useRef(null);

  // Luk input hvis man klikker udenfor
  useEffect(() => {
    function handleClickOutside(e) {
      if (addRef.current && !addRef.current.contains(e.target)) {
        setIsAdding(false);
        setNewValue("");
      }
    }

    if (isAdding) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAdding]);

  async function handleSave() {
    const value = newValue.trim();
    if (!value) {
      setIsAdding(false);
      setNewValue("");
      return;
    }

    if (onAdd) await onAdd(value);

    setNewValue("");
    setIsAdding(false);
  }

  return (
    <div className="tag-list">
      {/* Eksisterende faciliteter */}
      {facilities.map((item) => (
        <div className="tag-pill" key={item}>
          <small>{item}</small>

          {editable && (
            <img src={closeIcon} alt="Fjern" onClick={() => onRemove?.(item)} />
          )}
        </div>
      ))}

      {/* Tilføj-knap */}
      {editable && !isAdding && (
        <button
          type="button"
          className="tag-add-button"
          onClick={() => setIsAdding(true)}
        >
          <small>Tilføj</small>
          <img src={addIcon} alt="Tilføj" />
        </button>
      )}

      {/* Inline input */}
      {editable && isAdding && (
        <small className="tag-add-inline" ref={addRef}>
          <input
            className="tag-add-input"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Skriv her..."
            autoFocus
          />

          <button type="button" onClick={handleSave}>
            <img src={blackCheckmark} alt="Gem" />
          </button>
        </small>
      )}
    </div>
  );
}

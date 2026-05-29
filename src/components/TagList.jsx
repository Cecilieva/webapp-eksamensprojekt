/* Genanvendelig komponent til visning og redigering af tags */
import { useEffect, useRef, useState } from "react";
import "./TagList.css";
import addIcon from "../assets/add-icon.svg";
import blackCheckmark from "../assets/black-checkmark-icon.svg";
import closeIcon from "../assets/close-icon.svg";

export default function TagList({
  items = [],
  editable = true,
  removable = true,
  onAdd,
  onRemove,
}) {
  // State til håndtering af tilføjelse af nye tags
  const [isAdding, setIsAdding] = useState(false);
  const [newValue, setNewValue] = useState("");

  // Reference til inputfeltet ved oprettelse af nyt tag
  const addRef = useRef(null);

  // Lukker inputfeltet hvis brugeren klikker udenfor
  useEffect(() => {
    function handleClickOutside(event) {
      if (addRef.current && !addRef.current.contains(event.target)) {
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

  // Gemmer et nyt tag
  async function handleSave() {
    const value = newValue.trim();

    if (!value) {
      setIsAdding(false);
      setNewValue("");
      return;
    }

    if (onAdd) {
      await onAdd(value);
    }

    setNewValue("");
    setIsAdding(false);
  }

  return (
    <div className="tag-list">
      {/* Liste over eksisterende tags */}
      {items.map((item) => (
        <div className="tag-pill" key={item}>
          <small>{item}</small>

          {editable && removable && (
            <img src={closeIcon} alt="Fjern" onClick={() => onRemove(item)} />
          )}
        </div>
      ))}

      {/* Knap til tilføjelse af nyt tag */}
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

      {/* Inputfelt til oprettelse af nyt tag */}
      {editable && isAdding && (
        <div className="tag-add-inline" ref={addRef}>
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
        </div>
      )}
    </div>
  );
}

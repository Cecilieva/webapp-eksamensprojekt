import { useMemo, useState } from "react";

// Importer ikoner
import squareFeetIcon from "../assets/square-feet-icon.svg";
import roomsIcon from "../assets/rooms-icon.svg";
import rentIcon from "../assets/rent-icon.svg";
import movingDateIcon from "../assets/moving-date-icon.svg";
import depositIcon from "../assets/deposit-icon.svg";
import acontoIcon from "../assets/aconto-icon.svg";
import editIconCircle from "../assets/edit-icon-circle.svg";

// Komponent til at vise og evt. redigere bolig-info
export default function HousingInfoScroller({
  housing,
  editable = false,
  onSaveField,
}) {
  // State til redigering
  const [editingKey, setEditingKey] = useState(null);
  const [draftValue, setDraftValue] = useState("");

  // Formatter tal (returnerer kun tal hvis det er gyldigt)
  const formatNumber = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  };

  // Formatter dato til dansk format
  const formatDate = (value) => {
    if (!value) return null;
    // Hvis Supabase returnerer ISO-date, så vis en kort dansk dato
    const d = new Date(value);
    if (!Number.isFinite(d.getTime())) return String(value);
    return d.toLocaleDateString("da-DK", {
      day: "2-digit",
      month: "short",
    });
  };

  // Udregn felter der skal vises i scrolleren
  const items = useMemo(() => {
    // Udtræk og formatter værdier fra housing-objektet
    const squareMeters = formatNumber(housing.square_meters);
    const rooms = formatNumber(housing.rooms);
    const rent = formatNumber(housing.rent);
    const aconto = formatNumber(housing.aconto);
    const deposit = formatNumber(housing.deposit);
    const moveIn = formatDate(housing.move_in_date);

    // Returnér array af felter med label, værdi, ikon osv.
    return [
      {
        key: "square_meters",
        label: "Kvadratmeter",
        value: squareMeters !== null ? `${squareMeters} m²` : "-",
        rawValue: housing.square_meters,
        iconSrc: squareFeetIcon,
        inputType: "number",
      },
      {
        key: "rooms",
        label: "Antal værelser",
        value: rooms !== null ? `${rooms} værelser` : "-",
        rawValue: housing.rooms,
        iconSrc: roomsIcon,
        inputType: "select",
        options: Array.from({ length: 8 }, (_, i) => String(i + 1)),
      },
      {
        key: "move_in_date",
        label: "Overtagelse",
        value: moveIn ?? "-",
        rawValue: housing.move_in_date,
        iconSrc: movingDateIcon,
        inputType: "date",
      },
      {
        key: "rent",
        label: "Husleje",
        value: rent !== null ? `${rent.toLocaleString("da-DK")} kr./md` : "-",
        rawValue: housing.rent,
        iconSrc: rentIcon,
        inputType: "number",
      },
      {
        key: "aconto",
        label: "Aconto",
        value:
          aconto !== null ? `${aconto.toLocaleString("da-DK")} kr./md` : "-",
        rawValue: housing.aconto,
        iconSrc: acontoIcon,
        inputType: "number",
      },
      {
        key: "deposit",
        label: "Depositum",
        value:
          deposit !== null ? `${deposit.toLocaleString("da-DK")} kr.` : "-",
        rawValue: housing.deposit,
        iconSrc: depositIcon,
        inputType: "number",
      },
    ];
  }, [housing]);

  // Start redigering af felt
  const startEdit = (item) => {
    if (!editable) return;
    setEditingKey(item.key);
    setDraftValue(item.rawValue ?? "");
  };

  // Annuller redigering
  const cancelEdit = () => {
    setEditingKey(null);
    setDraftValue("");
  };

  // Gem redigering og kald evt. callback
  const saveEdit = async () => {
    if (!editingKey) return;
    if (!onSaveField) {
      cancelEdit();
      return;
    }

    await onSaveField(editingKey, draftValue);
    cancelEdit();
  };

  // Render scroller med felter
  return (
    <div className="housing-info-scroller" role="list">
      {items.map((item) => {
        const isEditing = editingKey === item.key;

        return (
          <div key={item.key} className="housing-info-box" role="listitem">
            {/* Ikon og evt. redigér-knap */}
            <button
              type="button"
              className="housing-info-box-icon"
              onClick={() => (editable ? startEdit(item) : null)}
              aria-label={editable ? `Redigér ${item.label}` : item.label}
            >
              <img
                src={editable ? editIconCircle : item.iconSrc}
                alt=""
                aria-hidden="true"
              />
            </button>

            <div className="housing-info-box-text">
              {/* Label for feltet */}
              <h5 className="housing-info-box-label">{item.label}</h5>

              {/* Værdi eller input-felt hvis redigering */}
              {isEditing ? (
                <p className="housing-info-box-value text-small">
                  {item.inputType === "select" ? (
                    <select
                      className="housing-info-box-input"
                      value={draftValue}
                      onChange={async (e) => {
                        const next = e.target.value;
                        setDraftValue(next);
                        await onSaveField?.(item.key, next);
                        cancelEdit();
                      }}
                      onBlur={cancelEdit}
                      autoFocus
                    >
                      <option value="">-</option>
                      {item.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="housing-info-box-input"
                      type={item.inputType}
                      value={draftValue}
                      onChange={(e) => setDraftValue(e.target.value)}
                      onBlur={saveEdit}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit();
                        if (e.key === "Escape") cancelEdit();
                      }}
                      autoFocus
                    />
                  )}
                </p>
              ) : (
                <p className="housing-info-box-value text-small">
                  {item.value}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

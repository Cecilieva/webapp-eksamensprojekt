import "./FilterPanel.css";

export default function FilterLocation({
  city,
  postalCode,
  onCityChange,
  onPostalChange,
}) {
  return (
    <div className="location-fields">
      {/* Wrapper for by- og postnummerfelterne */}

      <label className="location-inputField">
        <input
          type="text"
          placeholder="By"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
        />
        {/* Inputfelt for by — opdaterer city-filteret */}
      </label>

      <label className="location-inputField">
        <input
          type="text"
          placeholder="Postnummer"
          value={postalCode}
          onChange={(e) => onPostalChange(e.target.value)}
        />
        {/* Inputfelt for postnummer — opdaterer postalCode-filteret */}
      </label>
    </div>
  );
}

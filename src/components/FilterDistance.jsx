import "./FilterPanel.css";

export default function FilterDistance({ value, onChange }) {
  return (
    <>
      <div className="distance-header">
        <p className="distance-value">{value} km</p>
        {/* Viser den aktuelle afstand i kilometer */}
      </div>

      <input
        className="distance-slider"
        type="range"
        min="0"
        max="20"
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Afstand i kilometer"
      />
      {/* Range‑slider — opdaterer afstanden når brugeren trækker i den */}
    </>
  );
}

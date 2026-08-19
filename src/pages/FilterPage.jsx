import { useNavigate } from "react-router-dom";
import useFilterState from "../lib/useFilterState";
import FilterPanel from "../components/FilterPanel";
import "./FilterPage.css";

export default function FilterPage() {
  // Hook til navigation mellem sider
  const navigate = useNavigate();

  // Henter filter state og funktioner fra custom hook
  const {
    filters,
    updateFilter,
    updateNestedFilter,
    toggleNestedFilter,
    resetFilters,
  } = useFilterState();

  // Lukker filter-siden og går tilbage til forsiden
  const handleClose = () => {
    navigate("/");
  };

  // Samler valgte filtre og navigerer til forsiden med dem som query params
  const handleSearch = () => {
    const cleaned = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        // Fx employment eller facilities: samler alle valgte værdier
        const selected = Object.entries(value)
          .filter(([, v]) => v === true)
          .map(([k]) => k);

        if (selected.length > 0) {
          cleaned[key] = selected.join(",");
        }
      } else if (value !== undefined && value !== "" && value !== null) {
        cleaned[key] = value;
      }
    });

    navigate(`/?${new URLSearchParams(cleaned).toString()}`);
  };

  // Nulstiller alle filtre og bliver på filter-siden
  const handleReset = () => {
    resetFilters();
    navigate("/filter", { replace: true });
  };

  return (
    <div className="filter-page">
      <header className="filter-topbar">
        {/* Luk-knap */}
        <button className="filter-topbarAction" onClick={handleClose}>
          <p>Luk</p>
        </button>

        <h2 className="filter-title">Filtrer</h2>

        {/* Nulstil-knap */}
        <button className="filter-topbarAction" onClick={handleReset}>
          <p>Nulstil</p>
        </button>
      </header>

      <div className="filter-content">
        {/* FilterPanel viser alle filtre og håndterer ændringer */}
        <FilterPanel
          filters={filters}
          updateFilter={updateFilter}
          updateNestedFilter={updateNestedFilter}
          toggleNestedFilter={toggleNestedFilter}
          resetFilters={resetFilters}
          onSearch={handleSearch}
        />
      </div>

      <div className="filter-bottom-bar">
        {/* Knap til at vise resultater med valgte filtre */}
        <button className="filter-bottom-button" onClick={handleSearch}>
          <h4>Vis resultater</h4>
        </button>
      </div>
    </div>
  );
}








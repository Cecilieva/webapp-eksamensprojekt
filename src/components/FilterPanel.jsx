import { AGE_RANGES, PRICE_RANGES } from "../lib/filterOptions";
// Importerer faste valgmuligheder til alder og pris

import FilterSection from "./FilterSection";
import SelectField from "./FilterDropdown";
import FilterSort from "./FilterSort";
import FilterDate from "./FilterDate";
import FilterLeasePeriod from "./FilterLeasePeriod";
import FilterLocation from "./FilterLocation";
import FilterDistance from "./FilterDistance";
import FilterGender from "./FilterGender";
import FilterRoomies from "./FilterRoomies";
import FilterFacilities from "./FilterFacilities";
import FilterOccupation from "./FilterEmployment";
import FilterMatchscore from "./FilterMatchscore";
// Importerer alle filterkomponenter der bruges i panelet

import ageIcon from "../assets/age-icon.svg";
import sortIcon from "../assets/filter-sorting.svg";
import budgetIcon from "../assets/budget-icon.svg";
import calendarIcon from "../assets/calendar-icon.svg";
import leaseIcon from "../assets/filter-lease-icon.svg";
import locationIcon from "../assets/filter-location-icon.svg";
import genderIcon from "../assets/gender-icon.svg";
import RoomieCounterIcon from "../assets/roomie-count-icon.svg";
import FacilitiesIcon from "../assets/facilities-icon.svg";
import occupationIcon from "../assets/occupation-icon.svg";
import matchscoreIcon from "../assets/matchscoreikon.svg";
// Importerer ikoner til de enkelte sektioner

import "./FilterPanel.css";
// Styling til hele filterpanelet

export default function FilterPanel({
  filters,
  updateFilter,
  toggleNestedFilter,
}) {
  // Modtager hele filter-state, en update-funktion og en toggle-funktion til nested filters

  return (
    <div className="filter-panel">
      {/* Sortering */}
      <FilterSection title="Sortér" icon={sortIcon}>
        <FilterSort
          value={filters.sort}
          onChange={(value) => updateFilter("sort", value)}
          // Opdaterer sorteringsfeltet
        />
      </FilterSection>

      {/* Alder */}
      <FilterSection icon={ageIcon} title="Alder">
        <div className="dual-select-grid">
          {/* To dropdowns: min og max alder */}
          <SelectField
            label=""
            value={filters.ageMin}
            onChange={(v) => updateFilter("ageMin", v)}
            options={AGE_RANGES}
            placeholder="Min. alder"
            ariaLabel="Minimum alder"
          />

          <SelectField
            label=""
            value={filters.ageMax}
            onChange={(v) => updateFilter("ageMax", v)}
            options={AGE_RANGES}
            placeholder="Maks. alder"
            ariaLabel="Maksimum alder"
          />
        </div>
      </FilterSection>

      {/* Budget */}
      <FilterSection
        icon={budgetIcon}
        title="Budget"
        subtitle="(pr. md.)"
        className="budget-section"
      >
        <div className="dual-select-grid">
          {/* Min og max pris */}
          <SelectField
            label=""
            value={filters.budgetMin}
            onChange={(v) => updateFilter("budgetMin", v)}
            options={PRICE_RANGES}
            placeholder="Min. pris"
            ariaLabel="Minimum pris"
          />

          <SelectField
            label=""
            value={filters.budgetMax}
            onChange={(v) => updateFilter("budgetMax", v)}
            options={PRICE_RANGES}
            placeholder="Maks. pris"
            ariaLabel="Maksimum pris"
          />
        </div>

        <div className="budget-bottom-row">
          {/* Aconto toggle */}
          <label className="aconto-toggle">
            <input
              type="checkbox"
              checked={filters.includeAconto}
              onChange={(e) => updateFilter("includeAconto", e.target.checked)}
            />
            <span className="aconto-toggleBox" aria-hidden="true" />
            <p className="aconto-toggleLabel">Inkl. Aconto</p>
          </label>
        </div>
      </FilterSection>

      {/* Overtagelsesdato */}
      <FilterSection icon={calendarIcon} title="Seneste overtagelsesdato">
        <FilterDate
          value={filters.takeoverDate}
          onChange={(v) => updateFilter("takeoverDate", v)}
          ariaLabel="Seneste overtagelsesdato"
          // Dato-picker til seneste ønskede indflytning
        />
      </FilterSection>

      {/* Lejeperiode */}
      <FilterSection icon={leaseIcon} title="Lejeperiode">
        <FilterLeasePeriod
          value={filters.leasePeriod}
          onChange={(v) => updateFilter("leasePeriod", v)}
          // Valg af minimum lejeperiode
        />
      </FilterSection>

      {/* Lokation */}
      <FilterSection
        icon={locationIcon}
        title="Lokation"
        className="large-icon-section"
      >
        <FilterLocation
          city={filters.city}
          postalCode={filters.postalCode}
          onCityChange={(v) => updateFilter("city", v)}
          onPostalChange={(v) => updateFilter("postalCode", v)}
          // By + postnummer inputfelter
        />
      </FilterSection>

      {/* Distance */}
      <FilterSection title="Afstand">
        <FilterDistance
          value={filters.distance}
          onChange={(v) => updateFilter("distance", v)}
          // Slider til max afstand fra valgt lokation
        />
      </FilterSection>

      {/* Køn */}
      <FilterSection
        icon={genderIcon}
        title="Køn"
        className="large-icon-section"
      >
        <FilterGender
          value={filters.gender}
          onChange={(v) => updateFilter("gender", v)}
          // Valg af foretrukket køn for roomies
        />
      </FilterSection>

      {/* Antal roomies */}
      <FilterSection
        icon={RoomieCounterIcon}
        title="Antal"
        className="large-icon-section"
      >
        <FilterRoomies
          value={filters.roomiesCount}
          onChange={(v) => updateFilter("roomiesCount", v)}
          // Stepper til antal roomies
        />
      </FilterSection>

      {/* Faciliteter */}
      <FilterSection
        icon={FacilitiesIcon}
        title="Bolig faciliteter"
        className="large-icon-section"
      >
        <FilterFacilities
          values={filters.facilities}
          onToggle={toggleNestedFilter}
          // Checkbox-liste for boligfaciliteter
        />
      </FilterSection>

      {/* Beskæftigelse */}
      <FilterSection
        icon={occupationIcon}
        title="Beskæftigelse"
        className="large-icon-section"
      >
        <FilterOccupation
          values={filters.occupation}
          onToggle={toggleNestedFilter}
          // Checkbox-liste for beskæftigelsestyper
        />
      </FilterSection>

      {/* Matchscore */}
      <FilterSection
        icon={matchscoreIcon}
        title="Matchscore"
        className="large-icon-section"
      >
        <FilterMatchscore
          value={filters.matchScore}
          onChange={(v) => updateFilter("matchScore", v)}
          // Slider til minimum matchscore
        />
      </FilterSection>
    </div>
  );
}

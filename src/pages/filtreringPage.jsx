import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import sortIcon from "../assets/filteruden.svg";
import ageIcon from "../assets/mand.svg";
import budgetIcon from "../assets/budget-icon.svg";
import locationIcon from "../assets/location-icon-pc.svg";
import genderIcon from "../assets/gender-icon.svg";
import peopleIcon from "../assets/personer.svg";
import occupationIcon from "../assets/occupation-icon.svg";
import matchscoreIcon from "../assets/matchscoreikon.svg";
import leaseIcon from "../assets/ur.svg";
import "./filtreringPage.css";

const SORT_OPTIONS = [
  { value: "a-z", label: "A - Å" },
  { value: "z-a", label: "Å - A" },
  { value: "new-old", label: "Nyeste - Ældste" },
  { value: "old-new", label: "Ældste - Nyeste" },
];

const AGE_RANGES = [
  "18 - 20 år",
  "20 - 22 år",
  "22 - 24 år",
  "24 - 26 år",
  "26 - 28 år",
  "28 - 30 år",
  "30 - 32 år",
];

const PRICE_RANGES = [
  "1.000 kr.",
  "2.000 kr.",
  "3.000 kr.",
  "4.000 kr.",
  "5.000 kr.",
  "6.000 kr.",
  "7.000 kr.",
  "8.000 kr.",
  "9.000 kr.",
  "10.000 kr.",
];

const LEASE_PERIOD_OPTIONS = [
  { value: "all", label: "Alle har interesse" },
  { value: "1-11", label: "1-11 måneder" },
  { value: "12-23", label: "12-23 måneder" },
  { value: "24plus", label: "24+ måneder" },
  { value: "unlimited", label: "Ubegrænset" },
];

const GENDER_OPTIONS = [
  { value: "mand", label: "Mand" },
  { value: "kvinde", label: "Kvinde" },
  { value: "andet", label: "Andet" },
  { value: "ingen-preference", label: "Ingen præference" },
];

const FACILITIES = [
  "Opvaskemaskine",
  "Vaskemaskine",
  "Tørretumbler",
  "Parkering",
  "Altan",
];

const EMPLOYMENT_OPTIONS = [
  "Studerende",
  "Fuldtidsarbejde",
  "Deltidsarbejde",
  "Jobsøgende",
  "Andet",
];

const MATCHSCORE_OPTIONS = ["70+", "80+", "90+"];

function normalizeDateInput(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    return trimmed;
  }

  const dkMatch = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (dkMatch) {
    const [, day, month, year] = dkMatch;
    const date = new Date(
      Date.UTC(Number(year), Number(month) - 1, Number(day)),
    );

    return Number.isNaN(date.getTime()) ? "" : date.toISOString();
  }

  return "";
}

function FilterSection({ icon, title, subtitle, children, className = "" }) {
  return (
    <fieldset className={`filter-section ${className}`.trim()}>
      <legend className="filter-section-title">
        {icon ? <img src={icon} alt="" aria-hidden="true" /> : null}
        <span className="filter-section-titleText">{title}</span>
        {subtitle ? (
          <span className="filter-section-subtitle">{subtitle}</span>
        ) : null}
      </legend>
      {children}
    </fieldset>
  );
}

function SelectField({ value, onChange, options, placeholder, ariaLabel }) {
  return (
    <label className="selectField">
      <select aria-label={ariaLabel} value={value} onChange={onChange}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function toggleSelection(currentValues, value, setter) {
  setter(
    currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value],
  );
}

export default function Filtrering() {
  const navigate = useNavigate();

  const [sort, setSort] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [includeDeposit, setIncludeDeposit] = useState(true);
  const [availableDate, setAvailableDate] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [distance, setDistance] = useState(5);
  const [gender, setGender] = useState("");
  const [roomiesCount, setRoomiesCount] = useState(2);
  const [facilities, setFacilities] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [matchscore, setMatchscore] = useState("");
  const [leasePeriod, setLeasePeriod] = useState("all");
  const [resultCount, setResultCount] = useState(null);
  const [loading, setLoading] = useState(false);

  const buildFilters = useCallback(
    (overrides = {}) => ({
      sort,
      ageMin,
      ageMax,
      priceMin,
      priceMax,
      includeDeposit,
      availableDate: normalizeDateInput(availableDate),
      city,
      postalCode,
      distance,
      gender,
      roomiesCount,
      facilities,
      employment,
      matchscore,
      leasePeriod,
      ...overrides,
    }),
    [
      sort,
      ageMin,
      ageMax,
      priceMin,
      priceMax,
      includeDeposit,
      availableDate,
      city,
      postalCode,
      distance,
      gender,
      roomiesCount,
      facilities,
      employment,
      matchscore,
      leasePeriod,
    ],
  );

  const refreshResultCount = useCallback(
    async (nextFilters = buildFilters()) => {
      try {
        const data = await api.getPostsFiltered(nextFilters);
        setResultCount(Array.isArray(data) ? data.length : 0);
      } catch {
        setResultCount(0);
      }
    },
    [buildFilters],
  );

  function resetFilters() {
    setSort("");
    setAgeMin("");
    setAgeMax("");
    setPriceMin("");
    setPriceMax("");
    setIncludeDeposit(true);
    setAvailableDate("");
    setCity("");
    setPostalCode("");
    setDistance(5);
    setGender("");
    setRoomiesCount(2);
    setFacilities([]);
    setEmployment([]);
    setMatchscore("");
    setLeasePeriod("all");
  }

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void refreshResultCount();
    }, 0);

    function onReset() {
      resetFilters();
      void refreshResultCount({
        sort: "",
        ageMin: "",
        ageMax: "",
        priceMin: "",
        priceMax: "",
        includeDeposit: true,
        availableDate: "",
        city: "",
        postalCode: "",
        distance: 5,
        gender: "",
        roomiesCount: 2,
        facilities: [],
        employment: [],
        matchscore: "",
        leasePeriod: "all",
      });
    }

    window.addEventListener("resetFilters", onReset);
    return () => {
      window.clearTimeout(timerId);
      window.removeEventListener("resetFilters", onReset);
    };
  }, [refreshResultCount]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    await refreshResultCount();
    setLoading(false);
  }

  function handleClose() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  }

  const buttonLabel =
    resultCount === null ? "Vis resultater" : `Vis ${resultCount} resultater`;

  return (
    <main className="app filtrering-page">
      <section className="filter-sheet">
        <header className="filter-topbar">
          <button
            type="button"
            className="filter-topbarAction"
            onClick={handleClose}
          >
            Luk
          </button>
          <h1 className="filter-title">Filtrer</h1>
          <button
            type="button"
            className="filter-topbarAction"
            onClick={resetFilters}
          >
            Nulstil
          </button>
        </header>

        <form className="filter-form" onSubmit={handleSubmit}>
          <FilterSection icon={sortIcon} title="Sortér">
            <div className="sort-options" role="radiogroup" aria-label="Sortér">
              {SORT_OPTIONS.map((option) => {
                const checked = sort === option.value;

                return (
                  <label
                    key={option.value}
                    className={`option-row sort-option ${checked ? "is-selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={checked}
                      onChange={(event) => setSort(event.target.value)}
                    />
                    <span className="option-marker" aria-hidden="true" />
                    <span className="option-label">{option.label}</span>
                  </label>
                );
              })}
            </div>
          </FilterSection>

          <FilterSection icon={ageIcon} title="Alder">
            <div className="dual-select-grid">
              <SelectField
                value={ageMin}
                onChange={(event) => setAgeMin(event.target.value)}
                options={AGE_RANGES}
                placeholder="Min. alder"
                ariaLabel="Minimum alder"
              />
              <SelectField
                value={ageMax}
                onChange={(event) => setAgeMax(event.target.value)}
                options={AGE_RANGES}
                placeholder="Maks. alder"
                ariaLabel="Maksimum alder"
              />
            </div>
          </FilterSection>

          <FilterSection
            icon={budgetIcon}
            title="Budget"
            subtitle="(pr. md.)"
            className="budget-section"
          >
            <div className="dual-select-grid">
              <SelectField
                value={priceMin}
                onChange={(event) => setPriceMin(event.target.value)}
                options={PRICE_RANGES}
                placeholder="Min. pris"
                ariaLabel="Minimum pris"
              />
              <SelectField
                value={priceMax}
                onChange={(event) => setPriceMax(event.target.value)}
                options={PRICE_RANGES}
                placeholder="Maks. pris"
                ariaLabel="Maksimum pris"
              />
            </div>

            <label className="deposit-toggle">
              <input
                type="checkbox"
                checked={includeDeposit}
                onChange={(event) => setIncludeDeposit(event.target.checked)}
              />
              <span className="deposit-toggleBox" aria-hidden="true" />
              <span className="deposit-toggleLabel">Inkl. acconto</span>
            </label>
          </FilterSection>

          <FilterSection title="Seneste overtagelsesdato">
            <label className="date-field">
              <input
                type="date"
                aria-label="Seneste overtagelsesdato"
                value={availableDate}
                onChange={(event) => setAvailableDate(event.target.value)}
              />
            </label>
          </FilterSection>

          <FilterSection icon={leaseIcon} title="Lejeperiode">
            <div
              className="lease-options"
              role="radiogroup"
              aria-label="Lejeperiode"
            >
              {LEASE_PERIOD_OPTIONS.map((option) => {
                const checked = leasePeriod === option.value;

                return (
                  <label
                    key={option.value}
                    className={`option-row lease-option ${checked ? "is-selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="leasePeriod"
                      value={option.value}
                      checked={checked}
                      onChange={(event) => setLeasePeriod(event.target.value)}
                    />
                    <span className="option-marker" aria-hidden="true" />
                    <span className="option-label">{option.label}</span>
                  </label>
                );
              })}
            </div>
          </FilterSection>

          <FilterSection
            icon={locationIcon}
            title="Lokation"
            className="large-icon-section"
          >
            <div className="location-fields">
              <label className="location-inputField">
                <input
                  type="text"
                  placeholder="By"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </label>
              <label className="location-inputField">
                <input
                  type="text"
                  placeholder="Postnummer"
                  value={postalCode}
                  onChange={(event) => setPostalCode(event.target.value)}
                />
              </label>
            </div>
          </FilterSection>

          <FilterSection title="Afstand">
            <div className="distance-header">
              <span className="distance-value">{distance} km</span>
            </div>
            <input
              className="distance-slider"
              type="range"
              min="0"
              max="20"
              step="1"
              value={distance}
              onChange={(event) => setDistance(Number(event.target.value))}
              aria-label="Afstand i kilometer"
            />
          </FilterSection>

          <FilterSection
            icon={genderIcon}
            title="Køn"
            className="large-icon-section"
          >
            <div className="gender-options" role="radiogroup" aria-label="Køn">
              {GENDER_OPTIONS.map((option) => {
                const checked = gender === option.value;

                return (
                  <label
                    key={option.value}
                    className={`option-row gender-option ${checked ? "is-selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={option.value}
                      checked={checked}
                      onChange={(event) => setGender(event.target.value)}
                    />
                    <span className="option-marker" aria-hidden="true" />
                    <span className="option-label">{option.label}</span>
                  </label>
                );
              })}
            </div>
          </FilterSection>

          <FilterSection
            icon={peopleIcon}
            title="Antal"
            className="large-icon-section"
          >
            <div className="count-row">
              <span className="count-label">Antal roomies</span>
              <div className="count-stepper" aria-label="Antal roomies">
                <button
                  type="button"
                  className="count-stepperButton"
                  aria-label="Reducer antal roomies"
                  onClick={() =>
                    setRoomiesCount((count) => Math.max(1, count - 1))
                  }
                >
                  −
                </button>
                <span className="count-stepperValue">{roomiesCount}</span>
                <button
                  type="button"
                  className="count-stepperButton"
                  aria-label="Forøg antal roomies"
                  onClick={() =>
                    setRoomiesCount((count) => Math.min(10, count + 1))
                  }
                >
                  +
                </button>
              </div>
            </div>
          </FilterSection>

          <FilterSection
            icon={peopleIcon}
            title="Bolig faciliteter"
            className="large-icon-section"
          >
            <div
              className="checklist"
              role="group"
              aria-label="Bolig faciliteter"
            >
              {FACILITIES.map((item) => (
                <label key={item} className="checklist-option">
                  <input
                    type="checkbox"
                    checked={facilities.includes(item)}
                    onChange={() =>
                      toggleSelection(facilities, item, setFacilities)
                    }
                  />
                  <span
                    className="option-marker checklist-marker"
                    aria-hidden="true"
                  />
                  <span className="option-label">{item}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection
            icon={occupationIcon}
            title="Beskæftigelse"
            className="large-icon-section"
          >
            <div className="checklist" role="group" aria-label="Beskæftigelse">
              {EMPLOYMENT_OPTIONS.map((item) => (
                <label key={item} className="checklist-option">
                  <input
                    type="checkbox"
                    checked={employment.includes(item)}
                    onChange={() =>
                      toggleSelection(employment, item, setEmployment)
                    }
                  />
                  <span
                    className="option-marker checklist-marker"
                    aria-hidden="true"
                  />
                  <span className="option-label">{item}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection
            icon={matchscoreIcon}
            title="Matchscore"
            className="large-icon-section"
          >
            <div
              className="matchscore-options"
              role="radiogroup"
              aria-label="Matchscore"
            >
              {MATCHSCORE_OPTIONS.map((item) => {
                const checked = matchscore === item;

                return (
                  <label
                    key={item}
                    className={`option-row matchscore-option ${checked ? "is-selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="matchscore"
                      value={item}
                      checked={checked}
                      onChange={(event) => setMatchscore(event.target.value)}
                    />
                    <span className="option-marker" aria-hidden="true" />
                    <span className="option-label">{item}</span>
                  </label>
                );
              })}
            </div>
          </FilterSection>

          <button type="submit" className="filter-submit" disabled={loading}>
            {loading ? "Viser…" : buttonLabel}
          </button>
        </form>
      </section>
    </main>
  );
}

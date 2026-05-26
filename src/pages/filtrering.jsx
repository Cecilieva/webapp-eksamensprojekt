import { useState, useRef, useEffect } from "react";
import api from "../lib/api";
import { Link } from "react-router-dom";
import mandIcon from "../assets/mand.svg";
import prismaerkeIcon from "../assets/prismaerke.svg";
import urIcon from "../assets/ur.svg";
import mapIcon from "../assets/mapikonsort.svg";
import statusbarIcon from "../assets/Status bar.svg";
import usersIcon from "../assets/users.svg";
import employmentIcon from "../assets/Beskæftigelse-ikon.svg";
import matchscoreIcon from "../assets/matchscoreikon.svg";

function AgeDropdown({ label, options = [], value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="dropdown" ref={ref}>
      <button
        type="button"
        className="dropdown-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
      >
        <span className="dropdown-label">{value || label}</span>
        <span className="dropdown-caret">▾</span>
      </button>

      {open && (
        <ul className="dropdown-list" role="listbox">
          {options.map((opt) => (
            <li
              key={opt}
              role="option"
              aria-selected={value === opt}
              className={`dropdown-item ${value === opt ? "selected" : ""}`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Filtrering() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [sort, setSort] = useState("a-z");
  const [gender, setGender] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [distance, setDistance] = useState(5);
  const [leasePeriod, setLeasePeriod] = useState("all");
  const [includeDeposit, setIncludeDeposit] = useState(false);
  const [availableDate, setAvailableDate] = useState("");
  const [roomiesCount, setRoomiesCount] = useState(2);
  const [facilities, setFacilities] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [matchscore, setMatchscore] = useState("");

  useEffect(() => {
    function onReset() {
      setSort("a-z");
      setGender("");
      setAgeMin("");
      setAgeMax("");
      setPriceMin("");
      setPriceMax("");
      setCity("");
      setPostalCode("");
      setDistance(5);
      setLeasePeriod("all");
      setIncludeDeposit(false);
      setAvailableDate("");
      setRoomiesCount(2);
      setFacilities([]);
      setEmployment([]);
      setMatchscore("");
      setPosts([]);
    }
    window.addEventListener("resetFilters", onReset);
    return () => window.removeEventListener("resetFilters", onReset);
  }, []);

  // age ranges used in the dropdowns
  const AGE_RANGES = [
    "18 - 20 år",
    "20 - 22 år",
    "22 - 24 år",
    "24 - 26 år",
    "26 - 28 år",
    "28 - 30 år",
    "30 - 32 år",
  ];

  // price ranges used in the budget dropdowns
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

  function toggleSelection(currentValues, value, setter) {
    setter(
      currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value],
    );
  }

  async function handleApply(e) {
    e?.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await api.getPostsFiltered({
        sort,
        gender,
        ageMin,
        ageMax,
        priceMin,
        priceMax,
        city,
        postalCode,
        distance,
        leasePeriod,
        includeDeposit,
        availableDate,
        roomiesCount,
        facilities,
        employment,
        matchscore,
      });
      setPosts(data || []);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app filtrering">
      <div className="statusbar-wrap">
        <img src={statusbarIcon} alt="status bar" className="statusbar-image" />
      </div>
      <h1 className="page-title">Filtrer</h1>

      <form className="filter-panel" onSubmit={handleApply}>
        <div className="form-field">
          <label>Sortér</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="a-z">A - Å</option>
            <option value="z-a">Å - A</option>
            <option value="new-old">Nyeste - Ældste</option>
            <option value="old-new">Ældste - Nyeste</option>
          </select>
        </div>

        <fieldset className="form-row">
          <legend className="section-legend">
            <img
              src={mandIcon}
              alt=""
              aria-hidden="true"
              className="section-legend-icon"
            />
            <span className="section-legend-main">Alder</span>
          </legend>
          <div className="age-dropdowns">
            <AgeDropdown
              label="Min. alder"
              options={AGE_RANGES}
              value={ageMin}
              onChange={setAgeMin}
            />

            <AgeDropdown
              label="Maks. alder"
              options={AGE_RANGES}
              value={ageMax}
              onChange={setAgeMax}
            />
          </div>
        </fieldset>

        <fieldset className="form-row">
          <legend className="section-legend">
            <img
              src={prismaerkeIcon}
              alt=""
              aria-hidden="true"
              className="section-legend-icon"
            />
            <span className="section-legend-main">Budget</span>
            <span className="section-legend-subtext">(pr. md.)</span>
          </legend>
          <div className="age-dropdowns">
            <AgeDropdown
              label="Min. pris"
              options={PRICE_RANGES}
              value={priceMin}
              onChange={setPriceMin}
            />

            <AgeDropdown
              label="Maks. pris"
              options={PRICE_RANGES}
              value={priceMax}
              onChange={setPriceMax}
            />
          </div>
        </fieldset>

        <div className="form-field">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={includeDeposit}
              onChange={(e) => setIncludeDeposit(e.target.checked)}
            />
            Inkl. acconto
          </label>
        </div>

        <div className="form-field">
          <label>Seneste overtagelsesdato</label>
          <input
            type="date"
            value={availableDate}
            onChange={(e) => setAvailableDate(e.target.value)}
          />
        </div>

        <fieldset className="form-row form-row--stacked">
          <legend className="section-legend">
            <img
              src={urIcon}
              alt=""
              aria-hidden="true"
              className="section-legend-icon"
            />
            <span className="section-legend-main">Lejeperiode</span>
          </legend>
          <div className="lease-period-options">
            <label className="lease-period-option">
              <input
                type="radio"
                name="leasePeriod"
                value="all"
                checked={leasePeriod === "all"}
                onChange={(e) => setLeasePeriod(e.target.value)}
              />
              <span>Alle har interesse</span>
            </label>

            <label className="lease-period-option">
              <input
                type="radio"
                name="leasePeriod"
                value="1-11"
                checked={leasePeriod === "1-11"}
                onChange={(e) => setLeasePeriod(e.target.value)}
              />
              <span>1-11 måneder</span>
            </label>

            <label className="lease-period-option">
              <input
                type="radio"
                name="leasePeriod"
                value="12-23"
                checked={leasePeriod === "12-23"}
                onChange={(e) => setLeasePeriod(e.target.value)}
              />
              <span>12-23 måneder</span>
            </label>

            <label className="lease-period-option">
              <input
                type="radio"
                name="leasePeriod"
                value="24plus"
                checked={leasePeriod === "24plus"}
                onChange={(e) => setLeasePeriod(e.target.value)}
              />
              <span>24+ måneder</span>
            </label>

            <label className="lease-period-option">
              <input
                type="radio"
                name="leasePeriod"
                value="unlimited"
                checked={leasePeriod === "unlimited"}
                onChange={(e) => setLeasePeriod(e.target.value)}
              />
              <span>Ubegrænset</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="form-row form-row--stacked location-section">
          <legend className="section-legend">
            <img
              src={mapIcon}
              alt=""
              aria-hidden="true"
              className="section-legend-icon"
            />
            <span className="section-legend-main">Lokation</span>
          </legend>
          <div className="location-fields">
            <input
              className="location-input"
              type="text"
              placeholder="By"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              className="location-input"
              type="text"
              placeholder="Postnummer"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </fieldset>

        <fieldset className="form-row form-row--stacked distance-section">
          <legend className="section-legend section-legend--stacked">
            <span className="section-legend-main">Afstand</span>
            <span className="distance-value">{distance} km</span>
          </legend>
          <input
            className="distance-slider"
            type="range"
            min="0"
            max="20"
            step="1"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            aria-label="Afstand i kilometer"
          />
        </fieldset>

        <fieldset className="form-row form-row--stacked gender-section">
          <legend className="section-legend">
            <img
              src={mandIcon}
              alt=""
              aria-hidden="true"
              className="section-legend-icon"
            />
            <span className="section-legend-main">Køn</span>
          </legend>

          <div className="gender-options" role="radiogroup" aria-label="Køn">
            <label className="gender-option">
              <input
                type="radio"
                name="gender"
                value="mand"
                checked={gender === "mand"}
                onChange={(e) => setGender(e.target.value)}
              />
              <span>Mand</span>
            </label>

            <label className="gender-option">
              <input
                type="radio"
                name="gender"
                value="kvinde"
                checked={gender === "kvinde"}
                onChange={(e) => setGender(e.target.value)}
              />
              <span>Kvinde</span>
            </label>

            <label className="gender-option">
              <input
                type="radio"
                name="gender"
                value="andet"
                checked={gender === "andet"}
                onChange={(e) => setGender(e.target.value)}
              />
              <span>Andet</span>
            </label>

            <label className="gender-option">
              <input
                type="radio"
                name="gender"
                value="ingen-preference"
                checked={gender === "ingen-preference"}
                onChange={(e) => setGender(e.target.value)}
              />
              <span>Ingen præference</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="form-row form-row--stacked count-section">
          <legend className="section-legend">
            <img
              src={usersIcon}
              alt=""
              aria-hidden="true"
              className="section-legend-icon"
            />
            <span className="section-legend-main">Antal</span>
          </legend>

          <div className="count-row">
            <span className="count-label">Antal roomies</span>
            <div className="count-stepper" aria-label="Antal roomies">
              <button
                type="button"
                className="count-stepper-button"
                aria-label="Reducer antal roomies"
                onClick={() =>
                  setRoomiesCount((count) => Math.max(1, count - 1))
                }
              >
                −
              </button>
              <span className="count-stepper-value">{roomiesCount}</span>
              <button
                type="button"
                className="count-stepper-button"
                aria-label="Forøg antal roomies"
                onClick={() =>
                  setRoomiesCount((count) => Math.min(10, count + 1))
                }
              >
                +
              </button>
            </div>
          </div>
        </fieldset>

        <fieldset className="form-row form-row--stacked checklist-section">
          <legend className="section-legend">
            <img
              src={usersIcon}
              alt=""
              aria-hidden="true"
              className="section-legend-icon"
            />
            <span className="section-legend-main">Bolig faciliteter</span>
          </legend>

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
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="form-row form-row--stacked checklist-section employment-section">
          <legend className="section-legend">
            <img
              src={employmentIcon}
              alt=""
              aria-hidden="true"
              className="section-legend-icon"
            />
            <span className="section-legend-main">Beskæftigelse</span>
          </legend>

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
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="form-row form-row--stacked checklist-section matchscore-section">
          <legend className="section-legend">
            <img
              src={matchscoreIcon}
              alt=""
              aria-hidden="true"
              className="section-legend-icon"
            />
            <span className="section-legend-main">Matchscore</span>
          </legend>

          <div
            className="matchscore-options"
            role="radiogroup"
            aria-label="Matchscore"
          >
            {MATCHSCORE_OPTIONS.map((item) => (
              <label key={item} className="matchscore-option">
                <input
                  type="radio"
                  name="matchscore"
                  value={item}
                  checked={matchscore === item}
                  onChange={(e) => setMatchscore(e.target.value)}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="form-actions">
          <button className="btn btn-primary fixed-width" disabled={loading}>
            {loading ? "Søger…" : `Vis ${posts.length} resultater`}
          </button>
        </div>
      </form>

      <section className="post-grid">
        {loading && <p>Loading…</p>}
        {error && <p className="note">Error: {error}</p>}
        {!loading && posts.length === 0 && <p>Ingen resultater</p>}
        {posts.map((post) => (
          <article key={post.id} className="post-card">
            {post.image && <img src={post.image} alt={post.caption} />}
            <div className="post-card-body">
              <p className="post-card-id">Post #{post.id}</p>
              <h2>{post.caption}</h2>
              <Link to={`/posts/${post.id}`} className="btn">
                View
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import supabase from "../lib/supabaseClient";
import buildFilterQuery from "../lib/buildFilterQuery";
import filterIcon from "../assets/filteruden.svg";
import "./HomePage.css";

export default function HomePage({
  favoriteProfiles = [],
  toggleFavoriteProfile = () => {},
}) {
  // State til top-toggles og profilfeed
  const [activeIcon, setActiveIcon] = useState(null);
  const [profiles, setProfiles] = useState([]);

  // Refs til top-toggles
  const containerRef = useRef(null);
  const btn12Ref = useRef(null);
  const btn15Ref = useRef(null);

  // Styling til top-bar
  const fillStyle = { opacity: 0 };
  // Loader og fejl-state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ID for hovedprofilen (bruges til at udelukke egen profil og matche score)
  const MAIN_PROFILE_ID = 14;

  // Læs URL-parametre
  const { search } = useLocation();

  useEffect(() => {
    // Parse URL-parametre til filter-objekt
    const params = new URLSearchParams(search);
    const filters = Object.fromEntries(params.entries());

    // Parse facilities fra JSON-string til objekt
    if (filters.facilities) {
      try {
        filters.facilities = JSON.parse(filters.facilities);
      } catch {
        filters.facilities = {};
      }
    }
    // Parse occupation fra JSON-string eller streng til objekt
    if (filters.occupation) {
      try {
        // Hvis occupation allerede er et objekt, behold det
        if (typeof filters.occupation === "object") {
          // do nothing
        } else if (typeof filters.occupation === "string") {
          // Prøv at parse som JSON
          try {
            filters.occupation = JSON.parse(filters.occupation);
          } catch {
            // Hvis det bare er en streng (fx "Studerende"), lav det om til objekt
            filters.occupation = { [filters.occupation]: true };
          }
        }
      } catch {
        filters.occupation = {};
      }
      // Debug-log
      console.log("DEBUG occupation:", filters.occupation);
    }

    async function loadData() {
      setLoading(true);
      setError("");

      // Byg Supabase-query baseret på filtre
      const query = buildFilterQuery(filters);
      const { data: filteredData, error: filterError } = await query;

      if (filterError) {
        setError(filterError.message);
        setLoading(false);
        return;
      }

      // Hent matchscore for hovedprofilen
      const { data: matchData, error: matchError } = await supabase
        .from("matchscore")
        .select("*")
        .eq("profile_a", MAIN_PROFILE_ID);

      if (matchError) {
        setError(matchError.message);
        setLoading(false);
        return;
      }

      // Kombinér profiler med deres matchscore
      const profilesWithScore = (filteredData ?? []).map((p) => {
        const match = (matchData ?? []).find((m) => m.profile_b === p.id);
        return {
          ...p,
          score: match?.score ?? null,
        };
      });

      // Fjern hovedprofilen fra feedet
      let feedProfiles = profilesWithScore.filter(
        (p) => p.id !== MAIN_PROFILE_ID,
      );

      // Find minimum matchscore fra filtre
      const minScore = parseInt(filters.matchScore?.replace(/\D/g, ""), 10);

      // Filtrér på matchscore hvis valgt
      if (!isNaN(minScore)) {
        feedProfiles = feedProfiles.filter(
          (p) => typeof p.score === "number" && p.score >= minScore,
        );
      }

      // Top-toggles: filtrér på søger roomie/bolig
      if (activeIcon === "c12") {
        feedProfiles = feedProfiles.filter(
          (p) =>
            !!p.seeking_roomie_boolean_default_false &&
            !p.seeking_housing_boolean_default_false,
        );
      } else if (activeIcon === "c15") {
        feedProfiles = feedProfiles.filter(
          (p) =>
            !!p.seeking_roomie_boolean_default_false &&
            !!p.seeking_housing_boolean_default_false,
        );
      }

      // Sortér efter matchscore hvis brugeren ikke har valgt sortering
      if (!filters.sort) {
        feedProfiles.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
      }

      setProfiles(feedProfiles);
      setLoading(false);
    }

    // Debug-log
    console.log("FILTERS LOADED:", filters);
    loadData();
  }, [search, activeIcon]);

  // Loader og fejlvisning
  if (loading) return <main className="app"></main>;
  if (error) return <main className="app">Error: {error}</main>;

  return (
    <div className="home">
      {/* Top filter toggles */}
      <div className="home-top-icons" ref={containerRef}>
        <div className="home-top-fill" style={fillStyle} />

        <button
          ref={btn12Ref}
          type="button"
          className={`home-top-toggle ${activeIcon === "c12" ? "active" : ""}`}
          aria-pressed={activeIcon === "c12"}
          onClick={() => setActiveIcon(activeIcon === "c12" ? null : "c12")}
        >
          <p className="text-small">Søger roomie</p>
        </button>

        <button
          ref={btn15Ref}
          type="button"
          className={`home-top-toggle ${activeIcon === "c15" ? "active" : ""}`}
          aria-pressed={activeIcon === "c15"}
          onClick={() => setActiveIcon(activeIcon === "c15" ? null : "c15")}
        >
          <p className="text-small">Søger roomie & bolig</p>
        </button>
      </div>

      {/* Link til filtreringsside */}
      <div className="home-filter-row">
        <Link
          to="/filter"
          className="home-filter-button"
          aria-label="Åbn filtre"
        >
          <img
            src={filterIcon}
            alt=""
            aria-hidden="true"
            className="home-filter-icon"
          />
        </Link>
      </div>

      {/* Profil feed */}
      <section className="profile-grid" aria-label="Profiler">
        {profiles.length === 0 && (
          <h2 className="profile-grid-empty">Ingen profiler fundet</h2>
        )}

        {profiles.map((p) => (
          <Link
            key={p.id}
            className="profile-card-link"
            to={`/profiles/${p.id}`}
            state={{ score: p.score }}
          >
            <ProfileCard
              id={p.id}
              name={p.name}
              age={p.age}
              city={p.city}
              images={p.images}
              caption={p.caption}
              gender={p.gender}
              occupation={p.occupation}
              budget={p.budget}
              maxRent={p.max_rent}
              seekingRoomie={p.seeking_roomie_boolean_default_false}
              seekingHousing={p.seeking_housing_boolean_default_false}
              hasHousing={p.has_housing_boolean_default_false}
              aboutMe={p.about_me}
              profileDescription={p.profile_description}
              roomiePreference={p.roomie_preference}
              interests={p.interests}
              score={p.score}
              liked={favoriteProfiles.some((fav) => fav.id === p.id)}
              onToggleFavorite={toggleFavoriteProfile}
            />
          </Link>
        ))}
      </section>
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import { supabase } from "../lib/supabaseClient";
import filterIcon from "../assets/filteruden.svg";
import "./HomePage.css";

export default function HomePage({
  favoriteProfiles = [],
  toggleFavoriteProfile = () => {},
  onOpenConnectionOverlay,
}) {
  const [activeIcon, setActiveIcon] = useState(null);
  const [profiles, setProfiles] = useState([]);

  const containerRef = useRef(null);
  const btn12Ref = useRef(null);
  const btn15Ref = useRef(null);

  const fillStyle = { opacity: 0 };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const MAIN_PROFILE_ID = 14;

  useEffect(() => {
    async function loadData() {
      /* 1. Hent alle profiler fra Supabase */
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("*");

      if (profilesError) {
        setError(profilesError.message);
        setLoading(false);
        return;
      }

      // 2. Hent matchscore for Ida (id = 14)
      const { data: matchData, error: matchError } = await supabase
        .from("matchscore")
        .select("*")
        .eq("profile_a", MAIN_PROFILE_ID);

      if (matchError) {
        setError(matchError.message);
        setLoading(false);
        return;
      }

      /* 3. Kombinér profiler med deres matchscore */
      const profilesWithScore = (profilesData ?? []).map((p) => {
        const match = (matchData ?? []).find((m) => m.profile_b === p.id);
        return {
          ...p,
          score: match?.score ?? null,
        };
      });

      // 4. Fjern hovedprofilen fra feedet
      const feedProfiles = profilesWithScore.filter(
        (p) => p.id !== MAIN_PROFILE_ID,
      );

      setProfiles(feedProfiles);
      setLoading(false);
    }

    loadData();
  }, []);

  /* Filtrering baseret på aktiv top-toggle */
  /* c12: kun brugere der søger roomie */
  /* c15: brugere der søger både roomie + bolig */
  const filteredProfiles = profiles.filter((p) => {
    if (activeIcon === "c12") {
      return (
        !!p.seeking_roomie_boolean_default_false &&
        !p.seeking_housing_boolean_default_false
      );
    }
    if (activeIcon === "c15") {
      return (
        !!p.seeking_roomie_boolean_default_false &&
        !!p.seeking_housing_boolean_default_false
      );
    }
    return true;
  });

  /* Loading state (viser tom skærm mens data hentes) */
  if (loading) return <main className="app"></main>;

  /* Error state fra Supabase */
  if (error) return <main className="app">Error: {error}</main>;

  return (
    <div className="home">
      {/* Top filter toggles */}
      <div className="home-top-icons" ref={containerRef}>
        <div className="home-top-fill" style={fillStyle} />

        {/* Toggle: kun roomie-søgende */}
        <button
          ref={btn12Ref}
          type="button"
          className={`home-top-toggle ${activeIcon === "c12" ? "active" : ""}`}
          aria-pressed={activeIcon === "c12"}
          onClick={() => setActiveIcon(activeIcon === "c12" ? null : "c12")}
        >
          <small>Søger roomie</small>
        </button>

        {/* Toggle: roomie + bolig */}
        <button
          ref={btn15Ref}
          type="button"
          className={`home-top-toggle ${activeIcon === "c15" ? "active" : ""}`}
          aria-pressed={activeIcon === "c15"}
          onClick={() => setActiveIcon(activeIcon === "c15" ? null : "c15")}
        >
          <small>Søger roomie & bolig</small>
        </button>
      </div>

      {/* Link til filtreringsside */}
      <div className="home-filter-row">
        <Link
          to="/filtrering"
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
        {filteredProfiles.length === 0 && (
          <p className="profile-grid-empty">Ingen profiler fundet</p>
        )}

        {/* Render profiler som kort */}
        {filteredProfiles.map((p) => (
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
              onOpenConnectionOverlay={onOpenConnectionOverlay}
            />
          </Link>
        ))}
      </section>
    </div>
  );
}

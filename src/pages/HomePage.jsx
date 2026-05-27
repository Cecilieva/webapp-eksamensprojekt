import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import { supabase } from "../lib/supabaseClient";
import filterIcon from "../assets/filteruden.svg";
import Component12 from "../assets/Component 12.svg";
import Component15 from "../assets/Component 15.svg";
import "./HomePage.css";

export default function HomePage({ favoriteProfiles, toggleFavoriteProfile }) {
  const [activeIcon, setActiveIcon] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const containerRef = useRef(null);
  const btn12Ref = useRef(null);
  const btn15Ref = useRef(null);
  const [fillStyle, setFillStyle] = useState({ opacity: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const MAIN_PROFILE_ID = 14;

  useEffect(() => {
    async function loadData() {
      // 1. Hent profiler
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

      // 3. Join profiler + matchscore
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

  // move and mask the fill when activeIcon changes
  useEffect(() => {
    if (!containerRef.current) return;

    if (!activeIcon) {
      setFillStyle((s) => ({ ...s, opacity: 0 }));
      return;
    }

    const btn = activeIcon === "c12" ? btn12Ref.current : btn15Ref.current;
    if (!btn) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const left = btnRect.left - containerRect.left;
    const width = btnRect.width;
    const svgUrl = activeIcon === "c12" ? Component12 : Component15;

    setFillStyle({
      left: `${left}px`,
      width: `${width}px`,
      top: `0px`,
      height: `100%`,
      WebkitMaskImage: `url(${svgUrl})`,
      maskImage: `url(${svgUrl})`,
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      backgroundColor: "#4B0129",
      opacity: 1,
      transition:
        "left 280ms cubic-bezier(.25,.8,.25,1), width 280ms cubic-bezier(.25,.8,.25,1), opacity 180ms ease",
    });
  }, [activeIcon]);

  // watch for overlay-active body class so we can switch to white SVGs
  const [overlayActive, setOverlayActive] = useState(
    document?.body?.classList?.contains("overlay-active") || false,
  );

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setOverlayActive(document.body.classList.contains("overlay-active"));
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  if (loading) return <main className="app">Loading…</main>;
  if (error) return <main className="app">Error: {error}</main>;

  return (
    <div className="home">
      <div className="home-top-icons" ref={containerRef}>
        <div className="home-top-fill" style={fillStyle} />

        <button
          ref={btn12Ref}
          type="button"
          className={`home-top-icon-btn ${activeIcon === "c12" ? "active" : ""}`}
          aria-pressed={activeIcon === "c12"}
          aria-label="Vis komponent 12"
          onClick={() => setActiveIcon(activeIcon === "c12" ? null : "c12")}
        >
          <img src={Component12} alt="" className="home-top-icon-img" />
        </button>

        <button
          ref={btn15Ref}
          type="button"
          className={`home-top-icon-btn ${activeIcon === "c15" ? "active" : ""}`}
          aria-pressed={activeIcon === "c15"}
          aria-label="Vis komponent 15"
          onClick={() => setActiveIcon(activeIcon === "c15" ? null : "c15")}
        >
          <img src={Component15} alt="" className="home-top-icon-img" />
        </button>
      </div>

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

      <section className="profile-grid" aria-label="Profiler">
        {profiles.length === 0 && (
          <p className="profile-grid-empty">Ingen profiler fundet</p>
        )}

        {profiles.map((p) => (
          <ProfileCard
            key={p.id}
            id={p.id}
            name={p.name}
            age={p.age}
            city={p.city}
            image={p.image}
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
        ))}
      </section>
    </div>
  );
}

import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import { supabase } from "../lib/supabaseClient";
import "./HomePage.css";

export default function HomePage({ favoriteProfiles, toggleFavoriteProfile }) {
  const [profiles, setProfiles] = useState([]);
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

  if (loading) return <main className="app">Loading…</main>;
  if (error) return <main className="app">Error: {error}</main>;

  return (
    <div className="home">
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

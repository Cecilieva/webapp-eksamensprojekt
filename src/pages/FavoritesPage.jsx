/* Side der viser brugerens gemte favoritprofiler */
import "./FavoritesPage.css";
import "./HomePage.css";
import ResponsivtLogo from "../assets/responsivtlogo.svg";
import ProfileCard from "../components/ProfileCard";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage({
  favoriteProfiles = [],
  toggleFavoriteProfile,
}) {
  // Bruges til navigation til profilens detaljeside
  const navigate = useNavigate();

  return (
    <main className="favorites-page">
      {/* Sidehoved med logo og titel */}
      <div className="under-header">
        <img src={ResponsivtLogo} alt="Logo" />
        <h2>Favoritter</h2>
      </div>

      {/* Liste over brugerens favoritprofiler */}
      <section className="favorite-grid">
        {favoriteProfiles.map((profile) => (
          <div
            key={profile.id}
            className="profile-card-link"
            onClick={() =>
              navigate(`/profiles/${profile.id}`, {
                state: { score: profile.score },
              })
            }
          >
            <ProfileCard
              {...profile}
              liked={true}
              onToggleFavorite={toggleFavoriteProfile}
            />
          </div>
        ))}
      </section>
    </main>
  );
}

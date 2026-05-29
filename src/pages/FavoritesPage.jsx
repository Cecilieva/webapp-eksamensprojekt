import "./FavoritesPage.css";
import "./HomePage.css";
import ResponsivtLogo from "../assets/responsivtlogo.svg";
import ProfileCard from "../components/ProfileCard";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage({
  favoriteProfiles = [],
  toggleFavoriteProfile,
}) {
  const navigate = useNavigate();

  return (
    <main className="favorites-page">
      <div className="under-header">
        <img src={ResponsivtLogo} alt="Logo" />
        <h2>Favoritter</h2>
      </div>

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

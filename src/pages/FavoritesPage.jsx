import "./FavoritesPage.css";
import "./HomePage.css";
import ResponsivtLogo from "../assets/responsivtlogo.svg";
import ProfileCard from "../components/ProfileCard";

export default function FavoritesPage({
  favoriteProfiles = [],
  toggleFavoriteProfile,
}) {
  return (
    <main className="favorites-page">
      <div className="under-header">
        <img src={ResponsivtLogo} alt="Logo" />
        <h2>Favoritter</h2>
      </div>

      <section className="favorite-grid">
        {favoriteProfiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            {...profile}
            liked={true}
            onToggleFavorite={toggleFavoriteProfile}
          />
        ))}
      </section>
    </main>
  );
}

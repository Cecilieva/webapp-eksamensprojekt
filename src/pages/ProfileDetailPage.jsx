/* Side til visning af en valgt profils detaljer */
import { useLocation, useParams } from "react-router-dom";
import ProfileDetailCard from "../components/ProfileDetailCard";

export default function ProfileDetailPage({
  favoriteProfiles = [],
  toggleFavoriteProfile,
  onOpenConnectionOverlay,
}) {
  // Henter profil-ID fra URL'en
  const { id } = useParams();
  // Henter data sendt med navigationen
  const location = useLocation();
  const profileId = Number(id);
  const score = location.state?.score;

  return (
    <ProfileDetailCard
      profileId={profileId}
      score={score}
      canEdit={false}
      showActiveToggle={false}
      showMatchButton={false}
      showConnectionButton={true}
      showLikeButton={true}
      showBackButton={true}
      showMatchscore={true}
      // Tjekker om profilen er markeret som favorit
      liked={favoriteProfiles.some((fav) => fav.id === profileId)}
      // Håndterer tilføjelse eller fjernelse af favoritprofil
      onToggleFavorite={toggleFavoriteProfile}
      onOpenConnectionOverlay={onOpenConnectionOverlay}
    />
  );
}

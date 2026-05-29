import { useLocation, useParams } from "react-router-dom";
import ProfileDetailCard from "../components/ProfileDetailCard";

export default function ProfileDetailPage({
  favoriteProfiles = [],
  toggleFavoriteProfile,
}) {
  const { id } = useParams();
  const location = useLocation();
  const profileId = Number(id);
  const score = location.state?.score;

  return (
    <ProfileDetailCard
      profileId={id}
      score={score}
      canEdit={false}
      showActiveToggle={false}
      showMatchButton={false}
      showConnectionButton={true}
      showLikeButton={true}
      showBackButton={true}
      liked={favoriteProfiles.some((fav) => fav.id === profileId)}
      onToggleFavorite={toggleFavoriteProfile}
    />
  );
}

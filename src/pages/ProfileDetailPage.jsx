import { useParams } from "react-router-dom";
import ProfileDetailCard from "../components/ProfileDetailCard";

export default function ProfileDetailPage() {
  const { id } = useParams();

  return (
    <ProfileDetailCard
      profileId={id}
      canEdit={false}
      showActiveToggle={false}
      showMatchButton={false}
      showConnectionButton={true}
      showLikeButton={true}
      showBackButton={true}
    />
  );
}

import ProfileDetailCard from "../components/ProfileDetailCard";

export default function ProfilePage() {
  return (
    <ProfileDetailCard
      profileId={14}
      canEdit={true}
      showActiveToggle={true}
      showMatchButton={true}
      showBackButton={false}
      showConnectionButton={false}
      showLikeButton={false}
    />
  );
}

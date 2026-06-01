/* Profilside som viser den aktive brugers profil */
import ProfileDetailCard from "../components/ProfileDetailCard";

export default function ProfilePage() {
  return (
    <ProfileDetailCard
      profileId={14} // ID på den profil der skal vises
      canEdit={true} // Brugeren kan redigere sin profil
      showActiveToggle={true} // Viser mulighed for at aktivere/deaktivere profilen
      showMatchButton={true} // Viser knap til at se matches
      showBackButton={false} // Viser tilbage-knap
      showConnectionButton={false} // Viser forbindelse-knap
      showLikeButton={false} // Viser like-knap
      showMatchscore={false} // Viser ikke matchscore
    />
  );
}

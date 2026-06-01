/* Side til visning af en valgt boligs detaljer */
import { useLocation, useParams } from "react-router-dom";
import HousingDetailCard from "../components/HousingDetailCard";

export default function HousingDetailPage() {
  const { id } = useParams();
  const location = useLocation();

  // id i URL'en er profile_id i jeres setup
  const profileId = Number(id);
  const score = location.state?.score;

  return (
    <HousingDetailCard
      profileId={profileId}
      score={score}
      // Kun profile_id=14 må redigere (uanset housing_id)
      canEdit={profileId === 14}
      showBackButton={true}
    />
  );
}

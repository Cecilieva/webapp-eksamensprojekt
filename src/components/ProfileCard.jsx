import "./ProfileCard.css";
import LikeButton from "./LikeButton";
import locationIconPc from "../assets/location-icon-pc.svg";
import occupationIconPc from "../assets/occupation-icon-pc.svg";
import personIconPc from "../assets/person-icon-pc.svg";
import verifiedIconPc from "../assets/verified-icon.svg";
import MatchScore from "../components/MatchScore";

export default function ProfileCard({
  id,
  name,
  age,
  city,
  images = [],
  caption,
  occupation,
  interests,
  score,
  liked,
  onToggleFavorite,
  onOpenConnectionOverlay,
}) {
  const safeImages = Array.isArray(images) ? images : [];

  /* Første billede bruges som profilbillede */
  const profileImage = safeImages[0] || "/placeholder.jpg";

  return (
    <div className="profile-card">
      {/* Profilbillede + overlays */}
      <div className="profile-image-wrapper">
        <div className="profile-top-ikoner">
          {/* Like/favorite handling */}
          <div className="profile-like">
            <LikeButton
              liked={liked}
              onToggle={() =>
                onToggleFavorite({
                  id,
                  name,
                  age,
                  city,
                  images,
                  caption,
                  occupation,
                  interests,
                  score,
                })
              }
              label="Like profile"
              className="profile-card-like-button"
              size={44}
            />
          </div>

          {/* Match score badge */}
          <div className="profile-score">
            <MatchScore score={score} />
          </div>
        </div>

        <img src={profileImage} alt={name} className="profile-img" />
      </div>

      {/* Profilinformation */}
      <div className="profile-info-wrapper">
        <div className="profile-info">
          {/* Navn + verificeret badge */}
          <div className="profile-name-row">
            <h4 className="profile-name">
              {name}, {age} år
            </h4>
            <img
              src={verifiedIconPc}
              alt="verificeret"
              className="verified-icon-small"
            />
          </div>

          {/* Lokation */}
          <small className="profile-city">
            <img
              src={locationIconPc}
              alt="Lokation"
              className="location-icon"
            />
            <span>{city}</span>
          </small>

          {/* Occupation vises kun hvis data findes */}
          {occupation && (
            <small className="profile-occupation">
              <img
                src={occupationIconPc}
                alt="Beskæftigelse"
                className="occupation-icon"
              />
              <span>{occupation}</span>
            </small>
          )}

          {/* Kort profiltekst */}
          {caption && (
            <small className="profile-caption">
              <img
                src={personIconPc}
                alt="Profiltekst"
                className="person-icon"
              />
              <span>{caption}</span>
            </small>
          )}

          {/* Interesse-tags */}
          {interests && interests.length > 0 && (
            <div className="profile-interests">
              {interests.map((txt, i) => (
                <small key={i} className="interest-badge">
                  {txt}
                </small>
              ))}
            </div>
          )}

          {/* CTA-knap */}
          <button
            className="connect-btn"
            onClick={(e) => {
              e.preventDefault();
              /* Forhindrer card navigation når der klikkes på knappen */
              e.stopPropagation();
              onOpenConnectionOverlay();
            }}
          >
            Forbind
          </button>
        </div>
      </div>
    </div>
  );
}

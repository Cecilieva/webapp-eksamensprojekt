import "./ProfileCard.css";
import { useState } from "react";
import LikeButton from "./LikeButton";
import locationIconPc from "../assets/location-icon-pc.svg";
import occupationIconPc from "../assets/occupation-icon-pc.svg";
import personIconPc from "../assets/person-icon-pc.svg";
import verifiedIconPc from "../assets/verified-icon.svg";
import MatchScore from "../components/MatchScore";

export default function ProfileCard({
  name,
  age,
  city,
  image,
  caption,
  occupation,
  interests,
  score,
}) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="profile-card">
      {/* Billede */}
      <div className="profile-image-wrapper">
        <div className="profile-top-ikoner">
          <div className="profile-like">
            <LikeButton
              liked={liked}
              onToggle={() => setLiked((v) => !v)}
              label="Like profile"
              size={44}
            />
          </div>
          <div className="profile-score">
            <MatchScore score={score} />
          </div>
        </div>

        <img
          src={image || "/placeholder.jpg"}
          alt={name}
          className="profile-image"
        />
      </div>

      {/* Grundinfo */}
      <div className="profile-info-wrapper">
        <div className="profile-info">
          <div className="profile-name-row">
            <h4 className="profile-name">
              {name}, {age} år
            </h4>
            <img
              src={verifiedIconPc}
              alt="verificeret"
              className="verified-icon"
            />
          </div>

          <div className="profile-city text-small">
            <img
              src={locationIconPc}
              alt="Lokation"
              className="location-icon"
            />
            <span>{city}</span>
          </div>

          {occupation && (
            <div className="profile-occupation text-small">
              <img
                src={occupationIconPc}
                alt="Beskæftigelse"
                className="occupation-icon"
              />
              <span>{occupation}</span>
            </div>
          )}

          {caption && (
            <div className="profile-caption text-small">
              <img
                src={personIconPc}
                alt="Profiltekst"
                className="person-icon"
              />
              <span>{caption}</span>
            </div>
          )}
          {/* Badges */}
          {interests && interests.length > 0 && (
            <div className="profile-interests">
              {interests.map((txt, i) => (
                <p key={i} className="interest-badge text-small">
                  {txt}
                </p>
              ))}
            </div>
          )}
          <button className="connect-btn">Forbind</button>
        </div>
      </div>
    </div>
  );
}

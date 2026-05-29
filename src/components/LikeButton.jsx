import "./LikeButton.css";

import heartOutlineOrange from "../assets/heart-outline-orange.svg";
import heartFilledOrange from "../assets/heart-filled-orange.svg";

/* Genbrugelig like-knap med toggle-state */
export default function LikeButton({
  liked = false,
  onToggle,
  label = "Like",
  className = "",
}) {
  /* Vælg ikon baseret på liked state */
  const iconSrc = liked ? heartFilledOrange : heartOutlineOrange;

  /* Accessibility label der beskriver tilstand */
  const ariaLabel = liked ? `${label} (liked)` : `${label} (not liked)`;

  return (
    <button
      type="button"
      className={`like-button ${liked ? "is-liked" : ""} ${className}`}
      onClick={(e) => {
        /* Forhindrer navigation hvis knappen ligger i et link/card */
        e.preventDefault();
        e.stopPropagation();

        /* Trigger parent toggle hvis den findes */
        if (onToggle) {
          onToggle();
        }
      }}
      aria-pressed={liked}
      aria-label={ariaLabel}
    >
      {/* Ikon (alt tekst er tom da aria-label allerede beskriver funktion) */}
      <img className="like-button-icon" src={iconSrc} alt="" />
    </button>
  );
}

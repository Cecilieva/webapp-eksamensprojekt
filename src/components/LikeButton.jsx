import "./LikeButton.css";

import heartOutlineOrange from "../assets/heart-outline-orange.svg";
import heartFilledOrange from "../assets/heart-filled-orange.svg";

/**
 * Reusable like button.
 * Props:
 * - liked: boolean
 * - onToggle: () => void
 * - label: string (optional)
 * - className: string (optional)
 */
export default function LikeButton({
  liked = false,
  onToggle,
  label = "Like",
  className = "",
}) {
  const iconSrc = liked ? heartFilledOrange : heartOutlineOrange;
  const ariaLabel = liked ? `${label} (liked)` : `${label} (not liked)`;

  return (
    <button
      type="button"
      className={`like-button ${liked ? "is-liked" : ""} ${className}`}
      onClick={onToggle}
      aria-pressed={liked}
      aria-label={ariaLabel}
    >
      <img className="like-button-icon" src={iconSrc} alt="" />
    </button>
  );
}

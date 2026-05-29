import BigVerifiedIcon from "../assets/big-verified-icon.svg";
import BudgetIcon from "../assets/budget-icon.svg";
import CaptionIcon from "../assets/caption-icon.svg";
import CityIcon from "../assets/city-icon.svg";
import EditIcon from "../assets/edit-icon.svg";
import GenderIcon from "../assets/gender-icon.svg";
import OccupationIcon from "../assets/occupation-icon.svg";
import CheckmarkIcon from "../assets/checkmark-icon.svg";

/* Icon registry (gør det muligt at vælge ikon dynamisk via string navn) */
const icons = {
  "big-verified-icon.svg": BigVerifiedIcon,
  "budget-icon.svg": BudgetIcon,
  "caption-icon.svg": CaptionIcon,
  "city-icon.svg": CityIcon,
  "edit-icon.svg": EditIcon,
  "gender-icon.svg": GenderIcon,
  "occupation-icon.svg": OccupationIcon,
  "checkmark-icon.svg": CheckmarkIcon,
};

export default function ProfileIcon({ name, className = "" }) {
  return (
    <img
      /* Dynamisk ikon lookup */
      src={icons[name]}
      /* Dekorativt ikon (skjules for screen readers) */
      alt=""
      aria-hidden="true"
      className={`profile-icon ${className}`}
    />
  );
}

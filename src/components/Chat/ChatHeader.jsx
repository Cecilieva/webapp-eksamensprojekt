import EditMessageIcon from "../../assets/edit-message-icon.svg";
import "./ChatHeader.css";
import { Link } from "react-router-dom";

export default function ChatHeader({ brandMark }) {
  return (
    /* Header med logo, titel og ny besked-knap */
    <header className="chat-header">
      {/* Logo leder tilbage til forsiden */}
      <Link to="/">
        <img src={brandMark} alt="Rumly" className="chat-brand" />
      </Link>

      {/* Sidetitel */}
      <h2>Beskeder</h2>

      {/* Knap til ny besked */}
      <button type="button" className="chat-compose" aria-label="Ny besked">
        <img src={EditMessageIcon} alt="" aria-hidden="true" />
      </button>
    </header>
  );
}

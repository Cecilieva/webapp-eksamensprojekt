import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import BurgerIcon from "../assets/burger-menu-icon.svg";
import CloseIcon from "../assets/close-icon.svg";
import HeartIcon from "../assets/heart-icon.svg";
import HeartFilledIcon from "../assets/heart-filled-icon.svg";
import NotificationsIcon from "../assets/notifications-icon.svg";
import NotificationsFilledIcon from "../assets/notifications-filled-icon.svg";
import "./Header.css";

export default function Header() {
  // preserve existing nav links and add burger + overlay
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // determine active state from current route
  const isOnNotifications = location.pathname === "/notifications";
  const isOnFavorites = location.pathname === "/favorites";

  function close() {
    setOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-left">
          <button
            className="burger-btn"
            onClick={() => setOpen(true)}
            aria-label="Åbn menu"
          >
            <img src={BurgerIcon} alt="Menu" className="burger-icon" />
          </button>

          <nav className="site-nav" aria-label="Main navigation">
            <h1 className="logo">
              <NavLink to="/" className="nav-link">
                Rumly
              </NavLink>
            </h1>
          </nav>
        </div>

        <div className="header-right">
          <button
            type="button"
            className={`icon-btn ${isOnNotifications ? "active" : ""}`}
            aria-label="Notifikationer"
            aria-pressed={isOnNotifications}
            onClick={() => navigate("/notifications")}
          >
            <img
              src={
                isOnNotifications ? NotificationsFilledIcon : NotificationsIcon
              }
              alt="Notifikationer"
              className="header-icon"
            />
          </button>

          <button
            type="button"
            className={`icon-btn ${isOnFavorites ? "active" : ""}`}
            aria-label="Favoritter"
            aria-pressed={isOnFavorites}
            onClick={() => navigate("/favorites")}
          >
            <img
              src={isOnFavorites ? HeartFilledIcon : HeartIcon}
              alt="Favoritter"
              className="header-icon"
            />
          </button>
        </div>
      </div>

      {open && (
        <div
          className="overlay"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <div className="overlay-header">
              <h2 className="overlay-title">Menu</h2>
              <button
                className="overlay-close"
                onClick={close}
                aria-label="Luk menu"
              >
                <img src={CloseIcon} alt="Luk" className="close-icon" />
              </button>
            </div>

            <div className="overlay-list">
              <p>Privatlivspolitik</p>
              <p>Om Rumly</p>
              <p>Indstillinger</p>
              <p>Hjælp og support</p>
              <p>Abonnementer</p>
              <p>Log ud</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

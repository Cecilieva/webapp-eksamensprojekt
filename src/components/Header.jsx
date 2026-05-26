import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isFilterPage = location.pathname === "/filtrering";

  function handleReset() {
    window.dispatchEvent(new CustomEvent("resetFilters"));
  }

  return (
    <header
      className={`site-header${isFilterPage ? " site-header-filter" : ""}`}
    >
      {isFilterPage && (
        <button
          type="button"
          className="header-btn header-btn-left"
          onClick={() => navigate(-1)}
        >
          Luk
        </button>
      )}

      {!isFilterPage && (
        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/create" className="nav-link">
            Create Post
          </NavLink>
        </nav>
      )}

      {isFilterPage && (
        <button
          type="button"
          className="header-btn header-btn-right"
          onClick={handleReset}
        >
          Nulstil
        </button>
      )}
    </header>
  );
}

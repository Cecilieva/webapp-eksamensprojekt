import "./LoginPage.css";
import BigLogo from "../assets/big-logo.svg";

export default function LoginPage({ onCreateAccount }) {
  return (
    <div className="login-page">
      <img className="big-logo" src={BigLogo} alt="Rumly logo" />

      <div className="login-page-text">
        <h3>Klar til at finde dit</h3>
        <h2>missing piece?</h2>
      </div>

      <div className="login-page-bottom">
        <small>
          Ved at trykke på "Opret konto" eller "Log ind" accepterer du vores{" "}
          <span className="text-link">vilkår</span>. Læs mere om, hvordan vi
          behandler dine data, i vores{" "}
          <span className="text-link">privatlivspolitik</span> og{" "}
          <span className="text-link">cookiepolitik</span>.
        </small>

        <button className="primary-btn" onClick={onCreateAccount}>
          <h4>Opret konto</h4>
        </button>

        <button className="secondary-btn" onClick={onCreateAccount}>
          <h4>Log ind</h4>
        </button>

        <button className="guest-link" type="button" onClick={onCreateAccount}>
          <p>Fortsæt som gæst</p>
        </button>
      </div>
    </div>
  );
}

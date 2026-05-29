/* Login-side hvor brugeren kan oprette konto, logge ind eller fortsætte som gæst */
import "./LoginPage.css";
import BigLogo from "../assets/big-logo.svg";

export default function LoginPage({ onCreateAccount, onOpeningPage }) {
  return (
    <div className="login-page">
      {/* Appens logo */}
      <img className="big-logo" src={BigLogo} alt="Rumly logo" />

      {/* Velkomsttekst */}
      <div className="login-page-text">
        <h3>Klar til at finde dit</h3>
        <h2>missing piece?</h2>
      </div>

      <div className="login-page-bottom">
        {/* Information om vilkår og privatlivspolitik */}
        <small>
          Ved at trykke på "Opret konto" eller "Log ind" accepterer du vores{" "}
          <span className="text-link">vilkår</span>. Læs mere om, hvordan vi
          behandler dine data, i vores{" "}
          <span className="text-link">privatlivspolitik</span> og{" "}
          <span className="text-link">cookiepolitik</span>.
        </small>

        {/* Knap til oprettelse af konto */}
        <button className="primary-btn" onClick={onCreateAccount}>
          <h4>Opret konto</h4>
        </button>

        {/* Knap til login */}
        <button className="secondary-btn" onClick={onOpeningPage}>
          <h4>Log ind</h4>
        </button>

        {/* Fortsæt uden brugerprofil */}
        <button className="guest-link" type="button" onClick={onOpeningPage}>
          <p>Fortsæt som gæst</p>
        </button>
      </div>
    </div>
  );
}

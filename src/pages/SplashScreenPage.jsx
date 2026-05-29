import Lottie from "lottie-react";
import animationData from "../assets/animation-open-app.json";
import "./SplashScreenPage.css";

export default function SplashScreenPage({ onFinish }) {
  return (
    <div className="splash-screen">
      {/* Afspiller splash-animationen ved app-start */}
      <Lottie
        animationData={animationData}
        loop={false} // Animationen skal kun afspilles én gang
        autoplay={true} // Starter automatisk ved render
        onComplete={onFinish} // Navigerer videre, når animationen er færdig
        style={{ width: "14rem" }}
      />
      {/* Introtekst til brugeren */}
      <div className="splash-screen-text">
        <h3>Er du klar til at finde dit</h3>
        <h2>missing piece?</h2>
      </div>
    </div>
  );
}

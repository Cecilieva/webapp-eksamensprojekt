import Lottie from "lottie-react";
import animationData from "../assets/animation-open-app.json";
import "./SplashScreenPage.css";

export default function SplashScreenPage({ onFinish }) {
  return (
    <div className="splash-screen">
      <Lottie
        animationData={animationData}
        loop={false}
        autoplay={true}
        onComplete={onFinish}
        style={{ width: "14rem" }}
      />
      <div className="splash-screen-text">
        <h3>Er du klar til at finde dit</h3>
        <h2>missing piece?</h2>
      </div>
    </div>
  );
}

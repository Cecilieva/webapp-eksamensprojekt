import Lottie from "lottie-react";
import animationData from "../assets/animation-eyeroll.json";
import "./EmptyForbindelse.css";

export default function EmptyForbindelse() {
  return (
    <div className="empty-forbindelse">
      <h2>Ingen forbindelser</h2>

      <p>Lige nu har du ingen forbindelser. Like dine forbindelser</p>

      <Lottie
        animationData={animationData}
        loop
        className="empty-forbindelse-animation"
      />
    </div>
  );
}

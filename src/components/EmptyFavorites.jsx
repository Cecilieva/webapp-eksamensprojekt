import Lottie from "lottie-react";
import animationData from "../assets/animation-eyeroll.json";
import "./EmptyFavorites.css";

export default function EmptyFavorites() {
  return (
    <div className="empty-favorites">
      <h2>Ingen favoritter</h2>

      <p>Lige nu har du ingen favoritter. Like dine favoritter</p>

      <Lottie
        animationData={animationData}
        loop
        className="empty-favorites-animation"
      />
    </div>
  );
}

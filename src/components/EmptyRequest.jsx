import Lottie from "lottie-react";
import animationData from "../assets/animation-eyeroll.json";
import "./EmptyRequest.css"; 

/* EMPTY REQUEST - Vises når brugeren ikke har nogen anmodninger */
export default function EmptyRequest() {
  return (
    <div className="empty-request">
      <h2>Ingen anmodninger</h2>

      <p>Lige nu har du ingen anmodninger. Like dine anmodninger</p>

      <Lottie
        animationData={animationData}
        loop
        className="empty-request-animation"
      />
    </div>
  );
}

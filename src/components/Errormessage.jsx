import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation-eyeroll.json";
import "./Errormessage.css";

export default function ErrorMessage({
  code = "404",
  title = "fejl",
  headline = "Hov, der skete en fejl…",
  subline = "Prøv igen eller kom tilbage senere.",
}) {
  return (
    /* Accessible error container (læses af screen readers) */
    <div className="error-page" role="alert" aria-live="polite">
      {/* Error kode + titel (visuel statusoverskrift) */}
      <h1 className="error-code">
        {code} <span className="error-title">{title}</span>
      </h1>

      {/* Primær fejlbesked */}
      <p className="error-headline">{headline}</p>

      {/* Supplerende forklaring / guidance */}
      <p className="error-subline">{subline}</p>

      {/* Lottie animation som visuel feedback */}
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}

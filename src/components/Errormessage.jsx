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
    <div className="error-page" role="alert" aria-live="polite">
      <h1 className="error-code">
        {code} <span className="error-title">{title}</span>
      </h1>
      <p className="error-headline">{headline}</p>
      <p className="error-subline">{subline}</p>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}

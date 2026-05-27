import { useState } from "react";
import "./OnboardingPage.css";

export default function OnboardingPage({ onFinish, onBack }) {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: <h3>Find roomies, der passer til dig og dine vaner</h3>,
      button: "Videre",
    },

    {
      title: <h3>Vi matcher dig på det, der betyder noget</h3>,
      button: "Videre",
    },

    {
      title: <h3>Skab en forbindelse med dine roomie matches</h3>,
      button: "Videre",
    },

    {
      title: <h3>Chat, lav gruppechats og find roomies</h3>,
      button: "Videre",
    },

    {
      title: <h3>Øg dine chancer for gode matches</h3>,
      button: "Kom i gang",
    },
  ];

  function handleNext() {
    if (slide < 4) {
      setSlide(slide + 1);
    } else {
      onFinish();
    }
  }

  function handleBack() {
    if (slide > 0) {
      setSlide(slide - 1);
    } else {
      onBack();
    }
  }

  return (
    <section className="onboarding-page">
      <button className="back-button" onClick={handleBack}>
        <p>Tilbage</p>
      </button>

      <div className="onboarding-content">
        <div className="onboarding-header">
          {slides[slide].title}

          {slides[slide].text && <>{slides[slide].text}</>}
        </div>

        <div className="onboarding-card">
          <h2>{slide + 1}/5</h2>
        </div>
      </div>

      <div className="onboarding-dots">
        <div className={slide === 0 ? "dot active" : "dot"}></div>
        <div className={slide === 1 ? "dot active" : "dot"}></div>
        <div className={slide === 2 ? "dot active" : "dot"}></div>
        <div className={slide === 3 ? "dot active" : "dot"}></div>
        <div className={slide === 4 ? "dot active" : "dot"}></div>
      </div>

      <button className="onboarding-next" onClick={handleNext}>
        <h4>{slides[slide].button}</h4>
      </button>
    </section>
  );
}

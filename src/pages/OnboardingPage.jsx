/* Onboardingforløb der introducerer appens funktioner */
import { useState } from "react";
import "./OnboardingPage.css";
import Lottie from "lottie-react";
import onboardingTryk from "../assets/onboardingTryk.json";
import onboardingMatch from "../assets/onboardingMatch.json";
import onboardingChat from "../assets/onboardingChat.json";
import ForbindelseOprettetKonfetti from "../assets/ForbindelseOprettetKonfetti.json";
import ForbindelseOprettetMatch from "../assets/ForbindelseOprettetMatch.json";

export default function OnboardingPage({ onFinish, onBack }) {
  // Holder styr på hvilket onboarding-slide der vises
  const [slide, setSlide] = useState(0);

  // Indhold til onboarding-slides
  const slides = [
    {
      title: <h3>Find roomies, der passer til dig og dine vaner</h3>,
      button: "Videre",
      animation: onboardingTryk,
    },

    {
      title: <h3>Vi matcher dig på det, der betyder noget</h3>,
      button: "Videre",
      animation: onboardingMatch,
    },

    {
      title: <h3>Skab en forbindelse med dine roomie matches</h3>,
      button: "Videre",
      animation: onboardingChat,
    },

    {
      title: <h3>Chat, lav gruppechats og find roomies</h3>,
      button: "Kom i gang",
      animation: onboardingChat,
    },
  ];

  // Går videre til næste slide eller afslutter onboarding
  function handleNext() {
    if (slide < 3) {
      setSlide(slide + 1);
    } else {
      onFinish();
    }
  }

  // Går tilbage til forrige slide eller tilbage til forrige side
  function handleBack() {
    if (slide > 0) {
      setSlide(slide - 1);
    } else {
      onBack();
    }
  }

  return (
    <section className="onboarding-page">
      {/* Knap til at navigere tilbage */}
      <button className="back-button" onClick={handleBack}>
        <p>Tilbage</p>
      </button>

      {/* Titel og indhold for det aktive slide */}
      <div className="onboarding-content">
        <div className="onboarding-header">
          {slides[slide].title}

          {slides[slide].text && <>{slides[slide].text}</>}
        </div>

        {/* Viser animation eller forbindelseseksempel afhængigt af slide */}
        <div className="onboarding-card">
          {slide === 2 ? (
            <div className="connection-slide">
              <Lottie
                animationData={ForbindelseOprettetKonfetti}
                loop
                className="lottie-top"
                style={{ width: "10rem" }}
              />

              <h2>Forbindelse oprettet!</h2>
              <p>Du kan nu skrive med din nye forbindelse.</p>

              <Lottie
                animationData={ForbindelseOprettetMatch}
                loop={true}
                className="lottie-bottom"
                style={{ width: "20rem" }}
              />
            </div>
          ) : (
            <Lottie
              animationData={slides[slide].animation}
              loop={true}
              className="onboarding-lottie"
              style={{ width: "14rem" }}
            />
          )}
        </div>
      </div>

      {/* Indikator for hvilket slide brugeren er på */}
      <div className="onboarding-dots">
        <div className={slide === 0 ? "dot active" : "dot"}></div>
        <div className={slide === 1 ? "dot active" : "dot"}></div>
        <div className={slide === 2 ? "dot active" : "dot"}></div>
        <div className={slide === 3 ? "dot active" : "dot"}></div>
      </div>

      {/* Knap til næste slide */}
      <button className="onboarding-next" onClick={handleNext}>
        <h4>{slides[slide].button}</h4>
      </button>
    </section>
  );
}

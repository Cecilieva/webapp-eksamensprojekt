import { useState } from "react";
import "./ConnectionRequestOverlay.css";

export default function ConnectionRequestOverlay({ open, onClose }) {
  const [step, setStep] = useState("request");

  // Lukker overlay og resetter step
  const handleClose = () => {
    setStep("request");
    onClose();
  };

  // Skifter til success overlay
  const handleRequestWithoutMessage = () => {
    setStep("success");
  };

  // Hvis overlay ikke er åbent
  if (!open) return null;

  return (
    <div className="connection-overlayBackdrop" onClick={handleClose}>
      <div
        className="connection-overlayCard"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP BAR */}
        <div className="connection-overlayHandle"></div>

        {/* STEP 1 */}
        {step === "request" && (
          <div className="connection-overlayContent">
            <h2 className="connection-overlayTitle">
              Du er ved at oprette forbindelse
            </h2>

            <p className="connection-overlayText">
              Personen skal acceptere forbindelsen for at kunne svare på
              beskeder.
            </p>

            <button className="connection-overlayBtn connection-overlayBtn--lime">
              <p>Anmod om forbindelse med besked</p>
            </button>

            <button
              className="connection-overlayBtn connection-overlayBtn--outline"
              onClick={handleRequestWithoutMessage}
            >
              <p>Anmod om forbindelse uden besked</p>
            </button>

            <button className="connection-overlayCancel" onClick={handleClose}>
              <small>Annuller</small>
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === "success" && (
          <div className="connection-overlayContent">
            <div className="connection-successIcon">✓</div>

            <h2 className="connection-overlayTitle">Fedt!</h2>

            <p className="connection-overlayText">
              Du har sendt en anmodning om en forbindelse
            </p>

            <button
              className="connection-overlayBtn connection-overlayBtn--lime"
              onClick={handleClose}
            >
              <h4>Fortsæt</h4>
            </button>

            <button className="connection-overlayCancel" onClick={handleClose}>
              <small>Fortryd</small>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

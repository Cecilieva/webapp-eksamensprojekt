import { useEffect } from "react";
import "./OpeningPage.css";

export default function OpeningPage({ onFinish }) {
  // Skifter automatisk videre efter 1 sekund
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 1000);

    // Rydder timeren hvis komponenten fjernes
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <section className="opening-page">
      <h1>Rumly</h1>
    </section>
  );
}

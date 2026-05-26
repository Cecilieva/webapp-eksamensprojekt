import { useEffect } from "react";
import "./OpeningPage.css";

export default function OpeningPage({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <section className="opening-page">
      <h1>Rumly</h1>
    </section>
  );
}

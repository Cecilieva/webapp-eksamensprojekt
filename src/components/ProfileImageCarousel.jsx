import { useState } from "react";
import "./ProfileImageCarousel.css";

export default function ProfileImageCarousel({
  images = [],
  fallback = "/placeholder.jpg",
  alt = "Profilbillede",
  className = "",
}) {
  /* Holder styr på hvilket billede der vises */
  const [imageIndex, setImageIndex] = useState(0);

  /* Gemmer startposition til swipe detection */
  const [startX, setStartX] = useState(null);

  /* Fallback hvis der ikke findes billeder */
  const imageList = images.length > 0 ? images : [fallback];

  function nextImage(e) {
    /* Forhindrer click bubbling til parent cards/links */
    e?.stopPropagation();

    /* Loop tilbage til første billede når slutningen nås */
    setImageIndex((prev) => (prev + 1) % imageList.length);
  }

  function prevImage(e) {
    /* Forhindrer click bubbling */
    e?.stopPropagation();

    /* Loop tilbage til sidste billede hvis man går baglæns fra index 0 */
    setImageIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  }

  /* Gemmer pointerens startposition */
  function handlePointerDown(e) {
    setStartX(e.clientX);
  }

  /* Beregner swipe-retning ud fra forskellen mellem start/slut */
  function handlePointerUp(e) {
    if (startX === null) return;

    const diff = e.clientX - startX;

    /* Swipe mod højre */
    if (diff > 40) {
      prevImage(e);
    }

    /* Swipe mod venstre */
    if (diff < -40) {
      nextImage(e);
    }

    /* Reset swipe state */
    setStartX(null);
  }

  return (
    <div
      className={`profile-image-carousel ${className}`}
      /* Click navigerer til næste billede */
      onClick={nextImage}
      /* Pointer events bruges til swipe support */
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <img src={imageList[imageIndex]} alt={alt} />

      {/* Pagination indicators */}
      <div className="image-dots">
        {imageList.map((_, index) => (
          <span key={index} className={index === imageIndex ? "active" : ""} />
        ))}
      </div>
    </div>
  );
}

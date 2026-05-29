import { useState } from "react";
import "./ProfileImageCarousel.css";

export default function ProfileImageCarousel({
  images = [],
  fallback = "/placeholder.jpg",
  alt = "Profilbillede",
  className = "",
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const [startX, setStartX] = useState(null);

  const imageList = images.length > 0 ? images : [fallback];

  function nextImage(e) {
    e?.stopPropagation();

    setImageIndex((prev) => (prev + 1) % imageList.length);
  }

  function prevImage(e) {
    e?.stopPropagation();

    setImageIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  }

  function handlePointerDown(e) {
    setStartX(e.clientX);
  }

  function handlePointerUp(e) {
    if (startX === null) return;

    const diff = e.clientX - startX;

    if (diff > 40) {
      prevImage(e);
    }

    if (diff < -40) {
      nextImage(e);
    }

    setStartX(null);
  }

  return (
    <div
      className={`profile-image-carousel ${className}`}
      onClick={nextImage}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <img src={imageList[imageIndex]} alt={alt} />

      <div className="image-dots">
        {imageList.map((_, index) => (
          <span key={index} className={index === imageIndex ? "active" : ""} />
        ))}
      </div>
    </div>
  );
}

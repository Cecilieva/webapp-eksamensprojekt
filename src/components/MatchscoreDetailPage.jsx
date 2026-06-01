import React from "react";
import Lottie from "lottie-react";
import animation from "../assets/MatchDetailPage.json";

export default function MatchscoreDetailPage() {
  return (
    <Lottie
      animationData={animation}
      loop={true}
      autoplay={true}
      style={{ width: "100%", height: 250 }}
    />
  );
}

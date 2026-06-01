import React from "react";
import Lottie from "lottie-react";
import animation from "../assets/MatchDetail.json";

export default function MatchscoreDetail() {
  return (
    <Lottie
      animationData={animation}
      loop
      autoplay
      className="matchscore-lottie"
    />
  );
}

import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

/* Fullscreen loading state med centreret animation */
export default function Loading() {
  return (
    <div style={styles.container}>
      {/* Lottie animation som visuel loading feedback */}
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        style={{ width: "12rem", height: "12rem" }}
      />
    </div>
  );
}

/* Inline styles til centreret loading layout */
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

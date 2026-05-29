import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

export default function Loading() {
  return (
    <div style={styles.container}>
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        style={{ width: "12rem", height: "12rem" }}
      />
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

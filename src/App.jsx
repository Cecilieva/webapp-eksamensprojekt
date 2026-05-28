import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import SplashScreenPage from "./pages/SplashScreenPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import OpeningPage from "./pages/OpeningPage";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import NotificationsPage from "./pages/NotificationsPage";

import CreatePage from "./pages/CreatePage";
import PostDetailPage from "./pages/PostDetailPage";
import UpdatePage from "./pages/UpdatePage";
import ConnectionsPage from "./pages/ConnectionsPage";
import ProfilePage from "./pages/ProfilePage";
import Filtrering from "./pages/filtreringPage";
import Botnav from "./components/Botnav";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [step, setStep] = useState("splash");
  const [favoriteProfiles, setFavoriteProfiles] = useState([]);

  const toggleFavoriteProfile = (profile) => {
    const exists = favoriteProfiles.some((fav) => fav.name === profile.name);

    if (exists) {
      setFavoriteProfiles((prev) =>
        prev.filter((fav) => fav.name !== profile.name),
      );
    } else {
      setFavoriteProfiles((prev) => [...prev, profile]);
    }
  };

  if (step === "splash") {
    return <SplashScreenPage onFinish={() => setStep("login")} />;
  }

  if (step === "login") {
    return <LoginPage onCreateAccount={() => setStep("onboarding")} />;
  }

  if (step === "onboarding") {
    return (
      <OnboardingPage
        onFinish={() => setStep("opening")}
        onBack={() => setStep("login")}
      />
    );
  }

  if (step === "opening") {
    return <OpeningPage onFinish={() => setStep("app")} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomePage
                favoriteProfiles={favoriteProfiles}
                toggleFavoriteProfile={toggleFavoriteProfile}
              />
              <Botnav />
            </>
          }
        />
        <Route
          path="/favorites"
          element={
            <>
              <FavoritesPage
                favoriteProfiles={favoriteProfiles}
                toggleFavoriteProfile={toggleFavoriteProfile}
              />
              <Botnav />
            </>
          }
        />

        <Route
          path="/notifications"
          element={
            <>
              <NotificationsPage />
              <Botnav />
            </>
          }
        />
        <Route
          path="/create"
          element={
            <>
              <Header />
              <CreatePage />
              <Botnav />
            </>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <>
              <Header />
              <PostDetailPage />
              <Botnav />
            </>
          }
        />
        <Route
          path="/posts/:id/update"
          element={
            <>
              <Header />
              <UpdatePage />
              <Botnav />
            </>
          }
        />
        <Route
          path="/connections"
          element={
            <>
              <Header />
              <ConnectionsPage />
              <Botnav />
            </>
          }
        />
        <Route
          path="/map"
          element={
            <>
              <Header />
              <NotFoundPage />
              <Botnav />
            </>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              <Header />
              <NotFoundPage />
              <Botnav />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <ProfilePage />
              <Botnav />
            </>
          }
        />
        <Route path="/filtrering" element={<Filtrering />} />
        <Route
          path="*"
          element={
            <>
              <Header />
              <HomePage />
              <NotFoundPage />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

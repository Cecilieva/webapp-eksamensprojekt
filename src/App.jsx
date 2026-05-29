import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import SplashScreenPage from "./pages/SplashScreenPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import OpeningPage from "./pages/OpeningPage";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import NotificationsPage from "./pages/NotificationsPage";

import PostDetailPage from "./pages/PostDetailPage";
import RequestPage from "./pages/RequestPage";
import ProfilePage from "./pages/ProfilePage";
import Filtrering from "./pages/filtreringPage";
import Botnav from "./components/Botnav";
import NotFoundPage from "./pages/NotFoundPage";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState("splash");
  const [favoriteProfiles, setFavoriteProfiles] = useState([]);

  // ⏳ loading ved reload
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // SHOW LOADING FØRST
  if (loading) {
    return <Loading />;
  }

  const toggleFavoriteProfile = (profile) => {
    const exists = favoriteProfiles.some((fav) => fav.id === profile.id);

    if (exists) {
      setFavoriteProfiles((prev) =>
        prev.filter((fav) => fav.id !== profile.id),
      );
    } else {
      setFavoriteProfiles((prev) => [...prev, profile]);
    }
  };

  if (step === "splash") {
    return <SplashScreenPage onFinish={() => setStep("login")} />;
  }

  if (step === "login") {
    return (
      <LoginPage
        onCreateAccount={() => setStep("onboarding")}
        onOpeningPage={() => setStep("opening")}
      />
    );
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
    return (
      <OpeningPage
        onFinish={() => {
          window.history.pushState({}, "", "/");
          setStep("app");
        }}
      />
    );
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
          path="/requests"
          element={
            <>
              <RequestPage />
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
        <Route
          path="/profiles/:id"
          element={
            <>
              <ProfileDetailPage
                favoriteProfiles={favoriteProfiles}
                toggleFavoriteProfile={toggleFavoriteProfile}
              />
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

/* React Router imports */
import { BrowserRouter, Routes, Route } from "react-router-dom";
/* React hooks */
import { useState, useEffect } from "react";

/* Intro / auth pages */
import SplashScreenPage from "./pages/SplashScreenPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import OpeningPage from "./pages/OpeningPage";

/* Shared components */
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import NotificationsPage from "./pages/NotificationsPage";

/* Main app pages */
import PostDetailPage from "./pages/PostDetailPage";
import RequestPage from "./pages/RequestPage";
import ProfilePage from "./pages/ProfilePage";
import Filtrering from "./pages/filtreringPage";
import Botnav from "./components/Botnav";
import NotFoundPage from "./pages/NotFoundPage";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import Loading from "./components/Loading";
import HousingDetailPage from "./pages/HousingDetailPage";

function App() {
  /* Loading state ved app reload */
  const [loading, setLoading] = useState(true);

  /* Styrer onboarding/auth flow */
  const [step, setStep] = useState("splash");

  /* Gemmer favorit profiler */
  const [favoriteProfiles, setFavoriteProfiles] = useState([]);

  /* Simulerer loading screen */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    /* Cleanup */
    return () => clearTimeout(timer);
  }, []);

  /* Viser loading animation først */
  if (loading) {
    return <Loading />;
  }

  /* Tilføjer/fjerner favorit profiler */
  const toggleFavoriteProfile = (profile) => {
    /* Tjekker om profil allerede findes */
    const exists = favoriteProfiles.some((fav) => fav.id === profile.id);

    /* Fjern favorit */
    if (exists) {
      setFavoriteProfiles((prev) =>
        prev.filter((fav) => fav.id !== profile.id),
      );
    } else {
      /* Tilføj favorit */
      setFavoriteProfiles((prev) => [...prev, profile]);
    }
  };

  /* Splash screen */
  if (step === "splash") {
    return <SplashScreenPage onFinish={() => setStep("login")} />;
  }

  /* Login screen */
  if (step === "login") {
    return (
      <LoginPage
        onCreateAccount={() => setStep("onboarding")}
        onOpeningPage={() => setStep("opening")}
      />
    );
  }

  /* Onboarding flow */
  if (step === "onboarding") {
    return (
      <OnboardingPage
        onFinish={() => setStep("opening")}
        onBack={() => setStep("login")}
      />
    );
  }

  /* Intro/opening page */
  if (step === "opening") {
    return (
      <OpeningPage
        onFinish={() => {
          /* Opdaterer browser URL */
          window.history.pushState({}, "", "/");
          setStep("app");
        }}
      />
    );
  }

  /* Main app */
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page */}
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

        {/* Favorites */}
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

        {/* Notifications */}
        <Route
          path="/notifications"
          element={
            <>
              <NotificationsPage />
              <Botnav />
            </>
          }
        />

        {/* Post details */}
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

        {/* Requests */}
        <Route
          path="/requests"
          element={
            <>
              <RequestPage />
              <Botnav />
            </>
          }
        />

        {/* Map page */}
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

        {/* Chat page */}
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

        {/* Chat page (midlertidig) */}
        <Route
          path="/chat/:id"
          element={
            <>
              <Header />
              <NotFoundPage />
              <Botnav />
            </>
          }
        />

        {/* Own profile */}
        <Route
          path="/profile"
          element={
            <>
              <ProfilePage />
              <Botnav />
            </>
          }
        />

        {/* Profile details */}
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

        {/* Filter page */}
        <Route path="/filtrering" element={<Filtrering />} />

        {/* Housing details */}
        <Route
          path="/housing/:id"
          element={
            <>
              <HousingDetailPage />
              <Botnav />
            </>
          }
        />

        {/* Fallback route */}
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

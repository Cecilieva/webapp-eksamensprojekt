import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import PostDetailPage from "./pages/PostDetailPage";
import UpdatePage from "./pages/UpdatePage";
import ConnectionsPage from "./pages/ConnectionsPage";
import ProfilePage from "./pages/ProfilePage";
import Botnav from "./components/Botnav";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts/:id/update" element={<UpdatePage />} />
        <Route path="/connections" element={<ConnectionsPage />} />
        <Route path="/map" element={<NotFound />} />
        <Route path="/chat" element={<NotFound />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Botnav />
    </BrowserRouter>
  );
}

export default App;

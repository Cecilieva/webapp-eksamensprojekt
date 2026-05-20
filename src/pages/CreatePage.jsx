import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function CreatePage() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.createPost({ image: image.trim(), caption: caption.trim() });
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <h1 className="page-title">Create</h1>
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Image URL</label>
          <input value={image} onChange={(e) => setImage(e.target.value)} />
        </div>

        <div className="form-field">
          <label>Caption</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Saving…" : "Save"}
          </button>
          {error && <p className="note">Error: {error}</p>}
        </div>
      </form>
    </main>
  );
}

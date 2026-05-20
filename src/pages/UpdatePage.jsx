import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/api";

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await api.getPost(id);
        if (mounted && data && data[0]) {
          setImage(data[0].image || "");
          setCaption(data[0].caption || "");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.updatePost(id, {
        image: image.trim(),
        caption: caption.trim(),
      });
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <main className="app">Loading…</main>;
  if (error) return <main className="app">Error: {error}</main>;

  return (
    <main className="app">
      <h1 className="page-title">Update</h1>
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
          <button className="btn btn-primary">Save</button>
          {error && <p className="note">Error: {error}</p>}
        </div>
      </form>
    </main>
  );
}

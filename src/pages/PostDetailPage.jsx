/* Side til visning af en enkelt post */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/api";

export default function PostDetailPage() {
  // Henter post-ID fra URL'en
  const { id } = useParams();

  // Bruges til navigation mellem sider
  const navigate = useNavigate();

  // State til postdata, loading og fejlmeddelelser
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Henter den valgte post ved indlæsning af siden
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await api.getPost(id);
        if (mounted) setPost((data && data[0]) || null);
      } catch (err) {
        setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();

    // Forhindrer state-opdatering efter unmount
    return () => (mounted = false);
  }, [id]);

  // Sletter posten og navigerer tilbage til forsiden
  async function handleDelete() {
    if (!window.confirm("Hovsa!?")) return;
    try {
      await api.deletePost(id);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }
  // Viser loading-state mens data hentes
  if (loading) return <main className="app">Loading…</main>;

  // Viser fejlmeddelelse hvis noget gik galt
  if (error) return <main className="app">404 fejl: {error}</main>;

  // Vises hvis posten ikke findes
  if (!post) return <main className="app">Ingen resultater.</main>;

  return (
    <main className="app">
      <h1 className="page-title">{post.caption || "Post"}</h1>
      {/* Viser billede hvis posten indeholder et */}
      {post.image && <img src={post.image} alt={post.caption} />}
      <div className="post-detail-body">
        <p className="post-meta">Post #{post.id}</p>
        <p className="post-detail-caption">{post.caption}</p>

        {/* Knapper til redigering og sletning af posten */}
        <div className="post-detail-actions">
          <Link to={`/posts/${id}/update`} className="btn btn-primary">
            Edit
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </main>
  );
}

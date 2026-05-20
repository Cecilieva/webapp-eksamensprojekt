import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/api";

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    return () => (mounted = false);
  }, [id]);

  async function handleDelete() {
    if (!window.confirm("Delete this post?")) return;
    try {
      await api.deletePost(id);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <main className="app">Loading…</main>;
  if (error) return <main className="app">Error: {error}</main>;
  if (!post) return <main className="app">Post not found.</main>;

  return (
    <main className="app">
      <h1 className="page-title">{post.caption || "Post"}</h1>
      {post.image && <img src={post.image} alt={post.caption} />}
      <div className="post-detail-body">
        <p className="post-meta">Post #{post.id}</p>
        <p className="post-detail-caption">{post.caption}</p>
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

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await api.getPosts();
        if (mounted) setPosts(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, []);

  if (loading) return <main className="app">Loading…</main>;
  if (error) return <main className="app">Error: {error}</main>;

  return (
    <main className="app">
      <h1 className="page-title">Home</h1>
      <Link to="/create" className="btn btn-primary">
        Create
      </Link>

      <section className="post-grid">
        {posts.length === 0 && <p>Ingen resultater</p>}
        {posts.map((post) => (
          <article key={post.id} className="post-card">
            {post.image && <img src={post.image} alt={post.caption} />}
            <div className="post-card-body">
              <p className="post-card-id">Post #{post.id}</p>
              <h2>{post.caption}</h2>
              <Link to={`/posts/${post.id}`} className="btn">
                View
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

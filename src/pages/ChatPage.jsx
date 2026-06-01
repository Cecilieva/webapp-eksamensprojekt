import { useParams } from "react-router-dom";

export default function ChatPage() {
  const { id } = useParams();

  return (
    <main className="app">
      <section className="chat-page">
        <h1>Beskeder</h1>
        {id ? (
          <p>Skriv til bruger {id}.</p>
        ) : (
          <p>Vælg en forbindelse for at starte en chat.</p>
        )}
      </section>
    </main>
  );
}

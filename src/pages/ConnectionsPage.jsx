import React from "react";
import ConnectionCard from "../components/ConnectionCard";
import profileIcon from "../assets/profile-icon.svg";

const SAMPLE = [
  { id: 1, name: "Cecilia", picture: profileIcon, score: 93 },
  { id: 2, name: "Ella", picture: profileIcon, score: 83 },
];

export default function ConnectionsPage() {
  const handleMessage = (id) => alert(`Send besked til ${id}`);
  const handleRemove = (id) => alert(`Fjern ${id}`);

  return (
    <main className="app">
      <h1 className="page-title">Forbindelser</h1>

      <section className="connections-list" role="list">
        {SAMPLE.map((p) => (
          <ConnectionCard
            key={p.id}
            id={p.id}
            name={p.name}
            picture={p.picture}
            score={p.score}
            onMessage={handleMessage}
            onRemove={handleRemove}
          />
        ))}
      </section>
    </main>
  );
}

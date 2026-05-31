// Tjek om der er en titel
export default function HousingSection({ title, children }) {
  const hasTitle = Boolean(title);

  return (
    <section className={`housing-section ${hasTitle ? "" : "no-title"}`.trim()}>
      {/* Vis titel hvis den findes */}
      {hasTitle ? <h4 className="housing-section-title">{title}</h4> : null}
      <div className="housing-section-content">{children}</div>
    </section>
  );
}

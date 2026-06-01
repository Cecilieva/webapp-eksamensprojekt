function EmptyState({ title, subtitle, logo }) {
  return (
    <div className="request-empty">
      <h3 className="request-emptyTitle">{title}</h3>
      <p className="request-emptySubtitle">{subtitle}</p>
      {logo && (
        <img src={logo} alt="Rumly logo" className="request-emptyLogo" />
      )}
    </div>
  );
}

export default EmptyState;

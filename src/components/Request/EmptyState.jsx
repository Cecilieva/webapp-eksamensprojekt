/* Viser en tom tilstand når der ikke er noget indhold at vise */
function EmptyState({ title, subtitle, logo }) {
  return (
    <div className="request-empty">
      {/* Overskrift */}
      <h3 className="request-emptyTitle">{title}</h3>

      {/* Beskrivende tekst */}
      <p className="request-emptySubtitle">{subtitle}</p>

      {/* Viser logo hvis det er sendt med som prop */}
      {logo && (
        <img src={logo} alt="Rumly logo" className="request-emptyLogo" />
      )}
    </div>
  );
}

export default EmptyState;

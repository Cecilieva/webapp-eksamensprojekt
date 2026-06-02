import "./FilterPanel.css";

export default function FilterSection({
  icon,
  title,
  subtitle,
  children,
  className = "",
}) {
  // Modtager props: ikon, titel, undertitel, indhold og ekstra CSS‑klasser

  return (
    <fieldset className={`filter-section ${className}`.trim()}>
      {/* Wrapper for hele filtersektionen — fieldset giver bedre semantik */}

      <div className="filter-section-title">
        {/* Container til ikon, titel og undertitel */}

        {icon && <img src={icon} alt="" aria-hidden="true" />}
        {/* Viser ikon hvis det findes — skjules for skærmlæsere */}

        <h4 className="filter-section-titleText">{title}</h4>
        {/* Selve sektionens titel */}

        {subtitle && (
          <p className="filter-section-subtitle">{subtitle}</p>
          // Viser undertitel hvis den er angivet
        )}
      </div>

      {children}
      {/* Renderer alt indhold der bliver sendt ind i komponenten */}
    </fieldset>
  );
}

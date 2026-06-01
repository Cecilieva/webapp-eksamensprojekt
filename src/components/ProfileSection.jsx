/* Genanvendelig sektion til visning af profiloplysninger */
import EditIconButton from "./EditIconButton";

export default function ProfileSection({
  title,
  children,
  onEdit,
  editable = false,
  className = "",
}) {
  return (
    <section className={`profile-section ${className}`}>
      {/* Sektionens titel og redigeringsknap */}
      <div className="section-title">
        <h4>{title}</h4>
        <EditIconButton enabled={editable} onClick={onEdit} />
      </div>

      {/* Indhold i sektionen */}
      {children}
    </section>
  );
}

import EditIconButton from "./EditIconButton";

export default function ProfileSection({
  title,
  children,
  onEdit,
  editable = false,
}) {
  return (
    <section className="profile-section">
      <div className="section-title">
        <h4>{title}</h4>
        <EditIconButton enabled={editable} onClick={onEdit} />
      </div>

      {children}
    </section>
  );
}

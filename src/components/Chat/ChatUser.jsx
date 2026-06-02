import "./ChatUser.css";

/* Danner initialer ud fra brugerens navn */
function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/* billede med profilbillede eller initialer */
export default function ChatUser({ name, user, size = "thread" }) {
  return (
    <div className={`chat-avatar chat-avatar--${size}`}>
      {/* Viser profilbillede hvis det findes, ellers initialer */}
      {user ? <img src={user} alt={name} /> : <span>{initials(name)}</span>}
    </div>
  );
}

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function ChatUser({
  name,
  user,
  size = "thread",
  color = "#e4d64b",
}) {
  return (
    <div
      className={`chat-avatar chat-avatar--${size}`}
      style={{ "--avatar-bg": color }}
    >
      {user ? <img src={user} alt={name} /> : <span>{initials(name)}</span>}
    </div>
  );
}

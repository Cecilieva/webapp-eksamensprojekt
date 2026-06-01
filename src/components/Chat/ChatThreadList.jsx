import ChatUser from "./ChatUser.jsx";
import "./ChatThreadList.css";

/* En enkelt chattråd */
function ChatThreadItem({ thread, active }) {
  return (
    <button
      type="button"
      className={`chat-thread ${active ? "is-active" : ""}`}
    >
      {/* Profilbillede eller gruppeavatar */}
      <div className="chat-threadAvatarWrap">
        {thread.isGroup ? (
          <>
            <ChatUser
              name={thread.name.split(",")[0]}
              user={thread.primaryUser}
              color="var(--bordeaux10)"
              size="groupA"
            />
            <ChatUser
              name={thread.name.split(",")[1]?.trim() ?? thread.name}
              user={thread.secondaryUser}
              color="var(--bordeaux10)"
              size="groupB"
            />
          </>
        ) : (
          <ChatUser name={thread.name} user={thread.user} size="thread" />
        )}
      </div>

      {/* Indhold i chattråden */}
      <div className="chat-threadContent">
        <div className="chat-threadTop">
          <p>{thread.name}</p>
          <small>{thread.time}</small>
        </div>
        <div className="chat-threadBottom">
          {thread.isUnreadMessage ? (
            <h5>{thread.preview}</h5>
          ) : (
            <small>{thread.preview}</small>
          )}
          {/* Ulæst indikator */}
          {thread.unread && (
            <span className="chat-unreadDot" aria-hidden="true" />
          )}
        </div>
      </div>
    </button>
  );
}

/* Liste med chattråde */
export default function ChatThreadList({ threads, activeThreadId }) {
  return (
    <div className="chat-list">
      {threads.map((thread) => (
        <ChatThreadItem
          key={thread.id}
          thread={thread}
          active={String(thread.id) === String(activeThreadId)}
        />
      ))}
    </div>
  );
}

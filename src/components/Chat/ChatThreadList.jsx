import ChatUser from "./ChatUser.jsx";

function ChatThreadItem({ thread, active, onOpen }) {
  return (
    <button
      type="button"
      className={`chat-thread ${active ? "is-active" : ""}`}
      onClick={() => onOpen(thread)}
    >
      <div className="chat-threadAvatarWrap">
        {thread.isGroup ? (
          <>
            <ChatUser
              name={thread.name.split(",")[0]}
              user={thread.primaryUser}
              color="#d8c56c"
              size="groupA"
            />
            <ChatUser
              name={thread.name.split(",")[1]?.trim() ?? thread.name}
              user={thread.secondaryUser}
              color="#e4d64b"
              size="groupB"
            />
          </>
        ) : (
          <ChatUser name={thread.name} user={thread.user} size="thread" />
        )}
      </div>

      <div className="chat-threadContent">
        <div className="chat-threadTop">
          <h3>{thread.name}</h3>
          <span>{thread.time}</span>
        </div>
        <div className="chat-threadBottom">
          <p className={thread.unread ? "is-bold" : ""}>{thread.preview}</p>
          {thread.unread && (
            <span className="chat-unreadDot" aria-hidden="true" />
          )}
        </div>
      </div>
    </button>
  );
}

export default function ChatThreadList({ threads, activeThreadId, onOpen }) {
  return (
    <div className="chat-list">
      {threads.map((thread) => (
        <ChatThreadItem
          key={thread.id}
          thread={thread}
          active={String(thread.id) === String(activeThreadId)}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

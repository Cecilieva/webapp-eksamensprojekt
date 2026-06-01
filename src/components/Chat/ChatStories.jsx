import ChatUser from "./ChatUser.jsx";

export default function ChatStories({ stories }) {
  return (
    <div className="chat-stories" aria-label="Hurtige kontakter">
      {stories.map((story) => (
        <button key={story.id} type="button" className="chat-story">
          <div className="chat-storyAvatar">
            <ChatUser
              name={story.name}
              color={story.color}
              user={story.user}
              size="story"
            />
            <span className="chat-storyDot" aria-hidden="true" />
          </div>
          <span className="chat-storyName">{story.name}</span>
        </button>
      ))}
    </div>
  );
}

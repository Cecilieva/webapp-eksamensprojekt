import ChatUser from "./ChatUser.jsx";
import "./ChatStories.css";

export default function ChatStories({ stories }) {
  return (
    /* Liste med hurtige kontakter */
    <div className="chat-stories" aria-label="Hurtige kontakter">
      {stories.map((story) => (
        /* En enkelt kontakt */
        <button key={story.id} type="button" className="chat-story">
          {/* Profilbillede */}
          <div className="chat-storyAvatar">
            <ChatUser name={story.name} user={story.user} size="story" />
          </div>

          {/* Navn og online-indikator */}
          <small className="chat-storyName">
            <span className="chat-storyDot" aria-hidden="true" />
            {story.name}
          </small>
        </button>
      ))}
    </div>
  );
}

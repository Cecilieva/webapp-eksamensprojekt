export default function ChatHeader({ brandMark, composeIcon, onCompose }) {
  return (
    <header className="chat-header">
      <img src={brandMark} alt="Rumly" className="chat-brand" />
      <h1>Beskeder</h1>
      <button
        type="button"
        className="chat-compose"
        aria-label="Ny besked"
        onClick={onCompose}
      >
        <img src={composeIcon} alt="" aria-hidden="true" />
      </button>
    </header>
  );
}

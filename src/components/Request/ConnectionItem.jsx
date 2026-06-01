import Avatar from "./Avatar";
import ActionButton from "./Actionbutton";

function ConnectionItem({ person, onShowRemove, onSendMessage }) {
  return (
    <div className="request-item">
      <Avatar
        initials={person.initials}
        color={person.color}
        imageUrl={person.imageUrl}
        name={person.name}
      />
      <div className="request-info">
        <p className="request-name">{person.name}</p>
        <div className="request-btnRow">
          <ActionButton
            variant="beige"
            label="Send besked"
            onClick={() => onSendMessage(person)}
          />
          <ActionButton
            variant="ghost"
            label="Fjern"
            onClick={() => onShowRemove(person)}
          />
        </div>
      </div>
      <h2 className="request-pct">{person.match}%</h2>
    </div>
  );
}
export default ConnectionItem;

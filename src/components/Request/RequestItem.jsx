import Avatar from "./Avatar";
import ActionButton from "./Actionbutton";

function RequestItem({ person, onAccept, onShowRemove }) {
  return (
    <div className="request-item">
      <Avatar
        initials={person.initials}
        color={person.color}
        imageUrl={person.imageUrl}
        name={person.name}
      />
      <div className="request-info">
        <div className="request-name">{person.name}</div>
        <div className="request-btnRow">
          <ActionButton
            variant="lime"
            label="Accepter"
            onClick={() => onAccept(person)}
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
export default RequestItem;

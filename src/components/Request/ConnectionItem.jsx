import Avatar from "./Avatar";
import ActionButton from "./ActionButton";

/* Viser én forbindelse med avatar, navn, matchprocent og handlinger */
function ConnectionItem({ person, onShowRemove, onSendMessage }) {
  return (
    <div className="request-item">
      {/* Personens "avatar" */}
      <Avatar
        initials={person.initials}
        color={person.color}
        imageUrl={person.imageUrl}
        name={person.name}
      />

      <div className="request-info">
        {/* Personens navn */}
        <p className="request-name">{person.name}</p>

        {/* Handlingsknapper */}
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

      {/* Matchprocent */}
      <h2 className="request-pct">{person.match}%</h2>
    </div>
  );
}

export default ConnectionItem;

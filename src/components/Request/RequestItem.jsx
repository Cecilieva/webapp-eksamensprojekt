import Avatar from "./Avatar";
import ActionButton from "./ActionButton";

/* Viser én beskedanmodning med "avatar", navn, matchprocent og handlinger */
function RequestItem({ person, onAccept, onShowRemove }) {
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
        <div className="request-name">{person.name}</div>

        {/* Handlingsknapper */}
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

      {/* Matchprocent */}
      <h2 className="request-pct">{person.match}%</h2>
    </div>
  );
}

export default RequestItem;

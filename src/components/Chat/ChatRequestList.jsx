import ChatUser from "./ChatUser.jsx";
import "./ChatRequestList.css";

export default function ChatRequestList({ requests }) {
  return (
    /* Liste med beskedanmodninger */
    <div className="chat-requests">
      {requests.map((request) => (
        /* En enkelt beskedanmodning */
        <div key={request.id} className="chat-request">
          {/* Profilbillede */}
          <ChatUser name={request.name} user={request.user} size="thread" />

          {/* Indhold ved siden af profilbilledet */}
          <div className="chat-requestContent">
            <p>{request.name}</p>
            <small>{request.text}</small>

            {/* Handlingsknapper */}
            <div className="chat-requestActions">
              <button type="button" className="chat-requestAccept">
                <small>Accepter</small>
              </button>

              <button type="button" className="chat-requestRemove">
                <small>Fjern</small>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

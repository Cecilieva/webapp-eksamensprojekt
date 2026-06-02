/* "Avatar" med profilbillede eller initialer */
function Avatar({ initials, color, imageUrl, name }) {
  return (
    <div className="request-avatar" style={{ "--avatar-bg": color }}>
      {/* Viser profilbillede hvis det findes */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name ? `${name} profilbillede` : "Profilbillede"}
          className="request-avatarImg"
          loading="lazy"
        />
      ) : (
        /* Viser initialer hvis der ikke findes et billede */
        initials
      )}
    </div>
  );
}

export default Avatar;

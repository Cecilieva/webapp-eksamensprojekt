function Avatar({ initials, color, imageUrl, name }) {
  return (
    <div className="request-avatar" style={{ "--avatar-bg": color }}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name ? `${name} profilbillede` : "Profilbillede"}
          className="request-avatarImg"
          loading="lazy"
        />
      ) : (
        initials
      )}
    </div>
  );
}

export default Avatar;

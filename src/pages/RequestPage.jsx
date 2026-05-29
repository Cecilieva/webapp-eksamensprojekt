import { useEffect, useMemo, useState } from "react";
import Lottie from "lottie-react";
import { supabase } from "../lib/supabaseClient";
import HovsaOverlay from "../assets/Hovsa-overlay.svg";
import CTA from "../assets/CTA.svg";
import Annuller from "../assets/Annuller.svg";
import connectionConfetti from "../assets/forbindelse-oprettet-konfetti.json";
import "./RequestPage.css";

const MAIN_PROFILE_ID = 14;

function getOtherProfileId(connection) {
  if (!connection) return null;

  if (connection.sender_id === MAIN_PROFILE_ID) {
    return connection.receiver_id;
  }

  if (connection.receiver_id === MAIN_PROFILE_ID) {
    return connection.sender_id;
  }

  return null;
}

function getInitials(profile) {
  if (profile.initials) return profile.initials;

  const nameParts = (profile.name ?? "").trim().split(/\s+/).filter(Boolean);
  if (nameParts.length === 0) return "??";

  return nameParts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function getColor(profile, fallback) {
  return profile.color ?? fallback;
}

function getAvatarImageUrl(profile) {
  const images = profile?.images;
  if (!images) return null;

  const first = Array.isArray(images) ? images[0] : null;
  return typeof first === "string" && first.trim() ? first : null;
}

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

function ActionButton({ variant, label, onClick }) {
  const [down, setDown] = useState(false);

  const variantClass =
    variant === "lime"
      ? "request-btn--lime"
      : variant === "beige"
        ? "request-btn--beige"
        : variant === "ghost"
          ? "request-btn--ghost"
          : "";

  return (
    <button
      type="button"
      className={`request-btn ${variantClass} ${down ? "is-down" : ""}`}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      onMouseLeave={() => setDown(false)}
      onTouchStart={() => setDown(true)}
      onTouchEnd={() => setDown(false)}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

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

function ConnectionItem({ person, onShowRemove }) {
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
            onClick={() => {}}
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

function EmptyState({ icon, text }) {
  return (
    <div className="request-empty">
      <div className="request-emptyIcon">{icon}</div>
      {text}
    </div>
  );
}

export default function RequestPage() {
  const [activeTab, setActiveTab] = useState("anmodninger");
  const [profiles, setProfiles] = useState([]);
  const [matchscores, setMatchscores] = useState([]);
  const [connections, setConnections] = useState([]);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayTarget, setOverlayTarget] = useState(null); // { id, name, mode: 'request'|'connection' }
  const [acceptedOverlayOpen, setAcceptedOverlayOpen] = useState(false);
  const [acceptedOverlayName, setAcceptedOverlayName] = useState("");
  const [dismissedProfileIds, setDismissedProfileIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      setLoading(true);
      setError("");

      const [profilesResult, matchscoresResult, connectionsResult] =
        await Promise.all([
          supabase
            .from("profiles")
            .select("*")
            .order("id", { ascending: true }),
          supabase
            .from("matchscore")
            .select("*")
            .eq("profile_a", MAIN_PROFILE_ID),
          supabase.from("connections").select("*"),
        ]);

      const firstError =
        profilesResult.error ||
        matchscoresResult.error ||
        connectionsResult.error;

      if (ignore) return;

      if (firstError) {
        setError(firstError.message);
        setLoading(false);
        return;
      }

      setProfiles(profilesResult.data ?? []);
      setMatchscores(matchscoresResult.data ?? []);
      setConnections(connectionsResult.data ?? []);
      setLoading(false);
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  const scoreByProfileId = useMemo(() => {
    const map = new Map();

    for (const item of matchscores) {
      map.set(item.profile_b, item.score);
    }

    return map;
  }, [matchscores]);

  const acceptedConnections = useMemo(() => {
    return connections.filter(
      (connection) =>
        connection.status === "accepted" &&
        (connection.sender_id === MAIN_PROFILE_ID ||
          connection.receiver_id === MAIN_PROFILE_ID),
    );
  }, [connections]);

  const connectedProfileIds = useMemo(() => {
    const ids = new Set();

    for (const row of acceptedConnections) {
      const otherProfileId = getOtherProfileId(row);
      if (otherProfileId != null && otherProfileId !== MAIN_PROFILE_ID) {
        ids.add(otherProfileId);
      }
    }

    return ids;
  }, [acceptedConnections]);

  const scoreByProfileIdWithFallback = scoreByProfileId;

  const connectionPeople = useMemo(() => {
    return profiles
      .filter((profile) => connectedProfileIds.has(profile.id))
      .map((profile) => ({
        id: profile.id,
        name: profile.name,
        match: scoreByProfileIdWithFallback.get(profile.id) ?? 0,
        initials: getInitials(profile),
        color: getColor(profile, "#8a9e8c"),
        imageUrl: getAvatarImageUrl(profile),
      }));
  }, [connectedProfileIds, profiles, scoreByProfileIdWithFallback]);

  const requestPeople = useMemo(() => {
    return profiles
      .filter(
        (profile) =>
          profile.id !== MAIN_PROFILE_ID &&
          !connectedProfileIds.has(profile.id) &&
          !dismissedProfileIds.includes(profile.id),
      )
      .map((profile) => ({
        id: profile.id,
        name: profile.name,
        match: scoreByProfileIdWithFallback.get(profile.id) ?? 0,
        initials: getInitials(profile),
        color: getColor(profile, "#c9a882"),
        imageUrl: getAvatarImageUrl(profile),
      }))
      .sort((a, b) => b.match - a.match);
  }, [
    connectedProfileIds,
    dismissedProfileIds,
    profiles,
    scoreByProfileIdWithFallback,
  ]);

  const isConnections = activeTab === "forbindelser";
  const pageTitle = isConnections ? "Forbindelser" : "Anmodninger";

  const handleAccept = async (person) => {
    const id = person.id;
    const existingRequest = connections.find(
      (connection) =>
        connection.status === "pending" && connection.sender_id === id,
    );

    if (existingRequest) {
      const { error: updateError } = await supabase
        .from("connections")
        .update({ status: "accepted" })
        .eq("id", existingRequest.id);

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setConnections((prev) =>
        prev.map((connection) =>
          connection.id === existingRequest.id
            ? { ...connection, status: "accepted" }
            : connection,
        ),
      );
    } else {
      const { error: insertError } = await supabase.from("connections").insert({
        sender_id: id,
        receiver_id: MAIN_PROFILE_ID,
        status: "accepted",
      });

      if (insertError) {
        setError(insertError.message);
        return;
      }

      setConnections((prev) => [
        ...prev,
        {
          sender_id: id,
          receiver_id: MAIN_PROFILE_ID,
          status: "accepted",
        },
      ]);
    }

    setDismissedProfileIds((prev) =>
      prev.filter((profileId) => profileId !== id),
    );

    setError("");
    setAcceptedOverlayName(person.name);
    setAcceptedOverlayOpen(true);
  };

  const handleReject = async (id) => {
    const request = connections.find(
      (connection) =>
        connection.status === "pending" && connection.sender_id === id,
    );

    if (request) {
      const { error: deleteError } = await supabase
        .from("connections")
        .delete()
        .eq("id", request.id);

      if (deleteError) {
        setError(deleteError.message);
        return;
      }
    }

    setDismissedProfileIds((prev) =>
      prev.includes(id) ? prev : [...prev, id],
    );
    setError("");
  };

  const handleRemove = async (id) => {
    const connection = acceptedConnections.find(
      (item) => getOtherProfileId(item) === id,
    );

    if (!connection) return;

    setConnections((prev) => prev.filter((item) => item.id !== connection.id));

    const { error: deleteError } = await supabase
      .from("connections")
      .delete()
      .eq("id", connection.id);

    if (deleteError) {
      setError(deleteError.message);
    }
  };

  const showRemoveOverlay = (person, mode) => {
    setOverlayTarget({ id: person.id, name: person.name, mode });
    setOverlayOpen(true);
  };

  const closeOverlay = () => {
    setOverlayOpen(false);
    setOverlayTarget(null);
  };

  const confirmRemove = async () => {
    if (!overlayTarget) return;
    const { id, mode } = overlayTarget;

    if (mode === "request") {
      await handleReject(id);
    } else {
      await handleRemove(id);
    }

    closeOverlay();
  };

  if (loading) return <main className="app"></main>;

  if (error) {
    return (
      <div className="request-root">
        <div className="request-header">
          <span className="request-title">Anmodninger</span>
        </div>
        <EmptyState icon="⚠️" text={`Error: ${error}`} />
      </div>
    );
  }

  return (
    <div className="request-root">
      <div className="request-header">
        <h2 className="request-title">{pageTitle}</h2>
      </div>

      <div className="request-tabBar">
        <button
          className={`request-tab ${activeTab === "anmodninger" ? "is-on" : "is-off"}`}
          onClick={() => setActiveTab("anmodninger")}
        >
          Anmodninger
        </button>
        <button
          className={`request-tab ${activeTab === "forbindelser" ? "is-on" : "is-off"}`}
          onClick={() => setActiveTab("forbindelser")}
        >
          Forbindelser
        </button>
      </div>

      {!isConnections && (
        <div className="request-banner">
          Opret en forbindelse, så i kan skrive sammen
        </div>
      )}

      <div className="request-list">
        {isConnections ? (
          connectionPeople.length === 0 ? (
            <EmptyState icon="🤝" text="Ingen forbindelser endnu" />
          ) : (
            connectionPeople.map((person) => (
              <ConnectionItem
                key={person.id}
                person={person}
                onShowRemove={(p) => showRemoveOverlay(p, "connection")}
              />
            ))
          )
        ) : requestPeople.length === 0 ? (
          <EmptyState icon="🎉" text="Ingen nye anmodninger" />
        ) : (
          requestPeople.map((person) => (
            <RequestItem
              key={person.id}
              person={person}
              onAccept={handleAccept}
              onShowRemove={(p) => showRemoveOverlay(p, "request")}
            />
          ))
        )}
      </div>

      {overlayOpen && (
        <div
          className="request-overlayBackdrop"
          onClick={closeOverlay}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="request-overlayCard"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={HovsaOverlay}
              alt=""
              className="request-overlayBackground"
            />
            <div className="request-overlayContent">
              {overlayTarget?.mode === "request" ? (
                <>
                  <h2 className="request-overlayTitle">Hovsa!</h2>
                  <p className="request-overlayText">
                    Er du sikker på, at du vil fjerne denne anmodning?
                  </p>
                </>
              ) : (
                <>
                  <h2 className="request-overlayTitle">Hovsa!</h2>
                  <p className="request-overlayText">
                    Er du sikker på, at du vil fjerne forbindelsen?
                  </p>
                </>
              )}

              <div className="request-overlayCTAWrap">
                <button
                  type="button"
                  onClick={confirmRemove}
                  className="request-overlayBtn request-textBtn request-textBtn--danger"
                >
                  <p className="text-small">Fjern</p>
                </button>

                <button
                  type="button"
                  onClick={closeOverlay}
                  className="request-overlayBtn request-textBtn request-textBtn--cancel"
                >
                  <p className="text-small">Annuller</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {acceptedOverlayOpen && (
        <div
          className="request-overlayBackdrop"
          onClick={() => setAcceptedOverlayOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="request-overlayCard"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="request-overlayContent">
              <div className="request-overlayFrame" aria-hidden="true">
                <Lottie
                  animationData={connectionConfetti}
                  loop={false}
                  autoplay={true}
                  className="request-overlayLottie"
                />
              </div>
              <div className="request-overlayTitle">Tillykke!</div>
              <div className="request-overlayText">
                Du har nu accepteret {acceptedOverlayName}
              </div>

              <div className="request-overlayCTAWrap">
                <button
                  type="button"
                  onClick={() => setAcceptedOverlayOpen(false)}
                  className="request-overlayBtn"
                >
                  <img src={CTA} alt="Fortsæt" className="request-cta" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

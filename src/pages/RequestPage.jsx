import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

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

const styles = {
  root: {
    backgroundColor: "#FAF5EC",
    minHeight: "100vh",
    maxWidth: 390,
    margin: "0 auto",
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "20px 20px 6px",
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontFamily: "'Otomanopee One', sans-serif",
    fontSize: 27,
    fontWeight: 400,
    color: "#1a1a1a",
  },
  tabBar: {
    display: "flex",
    margin: "10px 16px 16px",
    backgroundColor: "#e2d9d0",
    borderRadius: 50,
    padding: 4,
    gap: 2,
  },
  tab: {
    flex: 1,
    padding: "10px 0",
    border: "none",
    borderRadius: 50,
    fontSize: 14,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  tabOn: { backgroundColor: "#6b1f3a", color: "#fff" },
  tabOff: { backgroundColor: "transparent", color: "#8a7d74" },
  banner: {
    margin: "0 16px 18px",
    backgroundColor: "#ece4dc",
    borderRadius: 16,
    padding: "18px 22px",
    textAlign: "center",
    fontSize: 15,
    color: "#7a6e65",
    lineHeight: 1.45,
    fontWeight: 400,
  },
  list: {
    flex: 1,
    overflowY: "auto",
  },
  item: {
    display: "flex",
    alignItems: "center",
    padding: "13px 18px",
    gap: 13,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 17,
    fontWeight: 700,
    color: "#fff",
    flexShrink: 0,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 17,
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: 7,
  },
  btnRow: {
    display: "flex",
    gap: 8,
  },
  pct: {
    fontSize: 23,
    fontWeight: 800,
    color: "#d97b1a",
    minWidth: 54,
    textAlign: "right",
    flexShrink: 0,
  },
  btn: {
    border: "none",
    borderRadius: 50,
    padding: "7px 18px",
    fontSize: 14,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    cursor: "pointer",
    transition: "transform 0.1s",
    whiteSpace: "nowrap",
  },
  lime: { backgroundColor: "#c8d84e", color: "#3a4800", border: "none" },
  beige: { backgroundColor: "#e5ddd4", color: "#3a3228", border: "none" },
  ghost: {
    backgroundColor: "transparent",
    color: "#555",
    border: "1.5px solid #c8bfb5",
  },
  empty: {
    textAlign: "center",
    padding: "48px 24px",
    color: "#999",
    fontSize: 15,
  },
};

function Avatar({ initials, color }) {
  return (
    <div style={{ ...styles.avatar, backgroundColor: color }}>{initials}</div>
  );
}

function ActionButton({ variant, label, onClick }) {
  const [down, setDown] = useState(false);

  return (
    <button
      type="button"
      style={{
        ...styles.btn,
        ...styles[variant],
        transform: down ? "scale(0.96)" : "scale(1)",
      }}
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

function RequestItem({ person, onAccept, onReject }) {
  return (
    <div style={styles.item}>
      <Avatar initials={person.initials} color={person.color} />
      <div style={styles.info}>
        <div style={styles.name}>{person.name}</div>
        <div style={styles.btnRow}>
          <ActionButton
            variant="lime"
            label="Accepter"
            onClick={() => onAccept(person.id)}
          />
          <ActionButton
            variant="ghost"
            label="Fjern"
            onClick={() => onReject(person.id)}
          />
        </div>
      </div>
      <div style={styles.pct}>{person.match}%</div>
    </div>
  );
}

function ConnectionItem({ person, onRemove }) {
  return (
    <div style={styles.item}>
      <Avatar initials={person.initials} color={person.color} />
      <div style={styles.info}>
        <div style={styles.name}>{person.name}</div>
        <div style={styles.btnRow}>
          <ActionButton
            variant="beige"
            label="Send besked"
            onClick={() => {}}
          />
          <ActionButton
            variant="ghost"
            label="Fjern"
            onClick={() => onRemove(person.id)}
          />
        </div>
      </div>
      <div style={styles.pct}>{person.match}%</div>
    </div>
  );
}

function EmptyState({ icon, text }) {
  return (
    <div style={styles.empty}>
      <div style={{ fontSize: 38, marginBottom: 10 }}>{icon}</div>
      {text}
    </div>
  );
}

export default function RequestPage() {
  const [activeTab, setActiveTab] = useState("anmodninger");
  const [profiles, setProfiles] = useState([]);
  const [matchscores, setMatchscores] = useState([]);
  const [connections, setConnections] = useState([]);
  const [dismissedProfileIds, setDismissedProfileIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Otomanopee+One&family=Poppins:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

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

  const connectionPeople = useMemo(() => {
    return profiles
      .filter((profile) => connectedProfileIds.has(profile.id))
      .map((profile) => ({
        id: profile.id,
        name: profile.name,
        match: scoreByProfileId.get(profile.id) ?? 0,
        initials: getInitials(profile),
        color: getColor(profile, "#8a9e8c"),
      }));
  }, [connectedProfileIds, profiles, scoreByProfileId]);

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
        match: scoreByProfileId.get(profile.id) ?? 0,
        initials: getInitials(profile),
        color: getColor(profile, "#c9a882"),
      }))
      .sort((a, b) => b.match - a.match);
  }, [connectedProfileIds, dismissedProfileIds, profiles, scoreByProfileId]);

  const isConnections = activeTab === "forbindelser";
  const pageTitle = isConnections ? "Forbindelser" : "Anmodninger";

  const handleAccept = async (id) => {
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

  if (loading) {
    return (
      <div style={styles.root}>
        <div style={styles.header}>
          <span style={styles.title}>Anmodninger</span>
        </div>
        <EmptyState icon="⏳" text="Henter data fra Supabase..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.root}>
        <div style={styles.header}>
          <span style={styles.title}>Anmodninger</span>
        </div>
        <EmptyState icon="⚠️" text={`Error: ${error}`} />
      </div>
    );
  }

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <span style={styles.title}>{pageTitle}</span>
      </div>

      <div style={styles.tabBar}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === "anmodninger" ? styles.tabOn : styles.tabOff),
          }}
          onClick={() => setActiveTab("anmodninger")}
        >
          Anmodninger
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === "forbindelser" ? styles.tabOn : styles.tabOff),
          }}
          onClick={() => setActiveTab("forbindelser")}
        >
          Forbindelser
        </button>
      </div>

      {!isConnections && (
        <div style={styles.banner}>
          Opret en forbindelse, så i kan skrive sammen
        </div>
      )}

      <div style={styles.list}>
        {isConnections ? (
          connectionPeople.length === 0 ? (
            <EmptyState icon="🤝" text="Ingen forbindelser endnu" />
          ) : (
            connectionPeople.map((person) => (
              <ConnectionItem
                key={person.id}
                person={person}
                onRemove={handleRemove}
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
              onReject={handleReject}
            />
          ))
        )}
      </div>
    </div>
  );
}

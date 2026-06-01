import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import BrandMark from "../assets/responsivtlogo.svg";
import ComposeIcon from "../assets/edit-icon.svg";
import "./ChatPage.css";

const STORIES = [
  { id: 1, name: "Sarah", color: "#e4d64b" },
  { id: 2, name: "Karoline", color: "#e4d64b" },
  { id: 3, name: "Ella", color: "#8f8a44" },
  { id: 4, name: "Emil", color: "#d8c56c" },
  { id: 5, name: "Mads", color: "#c7b96a" },
];

const THREADS = [
  {
    id: 15,
    name: "Karoline",
    preview: "Dig: Enig! Skal vi tage en kaffe...",
    time: "nu",
    unread: false,
  },
  {
    id: 16,
    name: "Emil",
    preview: "Den sidste roomie jeg havde...",
    time: "17:04",
    unread: true,
  },
  {
    id: 17,
    name: "Sarah",
    preview: "Dig: Ved ikke helt om jeg kan...",
    time: "14:39",
    unread: false,
  },
  {
    id: "group-1",
    name: "Emil, Sarah",
    preview: "Emil: Hey, synes din profil st...",
    time: "17:04",
    unread: true,
    isGroup: true,
  },
  {
    id: 18,
    name: "Ella",
    preview: "Har du set den nye bolig?",
    time: "I går",
    unread: false,
  },
];

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function getAvatarImageUrl(profile) {
  const images = profile?.images;
  if (!images) return null;

  const first = Array.isArray(images) ? images[0] : null;
  return typeof first === "string" && first.trim() ? first : null;
}

function Avatar({ name, avatar, size = "thread", color = "#e4d64b" }) {
  return (
    <div
      className={`chat-avatar chat-avatar--${size}`}
      style={{ "--avatar-bg": color }}
    >
      {avatar ? <img src={avatar} alt={name} /> : <span>{initials(name)}</span>}
    </div>
  );
}

function Story({ name, color, avatar }) {
  return (
    <button type="button" className="chat-story">
      <div className="chat-storyAvatar">
        <Avatar name={name} color={color} avatar={avatar} size="story" />
        <span className="chat-storyDot" aria-hidden="true" />
      </div>
      <span className="chat-storyName">{name}</span>
    </button>
  );
}

function ThreadItem({ thread, active, onOpen }) {
  return (
    <button
      type="button"
      className={`chat-thread ${active ? "is-active" : ""}`}
      onClick={() => onOpen(thread)}
    >
      <div className="chat-threadAvatarWrap">
        {thread.isGroup ? (
          <>
            <Avatar
              name={thread.name.split(",")[0]}
              avatar={thread.primaryAvatar}
              color="#d8c56c"
              size="groupA"
            />
            <Avatar
              name={thread.name.split(",")[1]?.trim() ?? thread.name}
              avatar={thread.secondaryAvatar}
              color="#e4d64b"
              size="groupB"
            />
          </>
        ) : (
          <Avatar name={thread.name} avatar={thread.avatar} size="thread" />
        )}
      </div>

      <div className="chat-threadContent">
        <div className="chat-threadTop">
          <h3>{thread.name}</h3>
          <span>{thread.time}</span>
        </div>
        <div className="chat-threadBottom">
          <p className={thread.unread ? "is-bold" : ""}>{thread.preview}</p>
          {thread.unread && (
            <span className="chat-unreadDot" aria-hidden="true" />
          )}
        </div>
      </div>
    </button>
  );
}

export default function ChatPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("alle");
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function loadProfiles() {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .order("id", { ascending: true });

      if (!ignore) {
        setProfiles(data ?? []);
      }
    }

    loadProfiles();

    return () => {
      ignore = true;
    };
  }, []);

  const profileByName = useMemo(() => {
    const map = new Map();

    for (const profile of profiles) {
      if (profile?.name) {
        map.set(profile.name.toLowerCase(), profile);
      }
    }

    return map;
  }, [profiles]);

  const activeThread = useMemo(() => {
    return THREADS.find((thread) => String(thread.id) === String(id));
  }, [id]);

  const enrichedStories = useMemo(() => {
    return STORIES.map((story) => {
      const profile = profileByName.get(story.name.toLowerCase());

      return {
        ...story,
        avatar: getAvatarImageUrl(profile),
      };
    });
  }, [profileByName]);

  const enrichedThreads = useMemo(() => {
    return THREADS.map((thread) => {
      if (thread.isGroup) {
        const [firstName, secondName] = thread.name
          .split(",")
          .map((namePart) => namePart.trim());
        const firstProfile = profileByName.get(firstName?.toLowerCase() ?? "");
        const secondProfile = profileByName.get(
          secondName?.toLowerCase() ?? "",
        );

        return {
          ...thread,
          primaryAvatar: getAvatarImageUrl(firstProfile),
          secondaryAvatar: getAvatarImageUrl(secondProfile),
        };
      }

      const profile = profileByName.get(thread.name.toLowerCase());

      return {
        ...thread,
        avatar: getAvatarImageUrl(profile),
      };
    });
  }, [profileByName]);

  const filteredThreads = useMemo(() => {
    const search = query.trim().toLowerCase();

    return enrichedThreads.filter((thread) => {
      const matchesSearch =
        !search ||
        thread.name.toLowerCase().includes(search) ||
        thread.preview.toLowerCase().includes(search);

      const matchesFilter =
        activeFilter === "alle" ||
        (activeFilter === "ulæst" && thread.unread) ||
        (activeFilter === "grupper" && thread.isGroup) ||
        (activeFilter === "anmodninger" ? false : true);

      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, enrichedThreads, query]);

  return (
    <main className="app chat-pageShell">
      <section className="chat-page" aria-label="Beskeder">
        <header className="chat-header">
          <img src={BrandMark} alt="Rumly" className="chat-brand" />
          <h1>Beskeder</h1>
          <button
            type="button"
            className="chat-compose"
            aria-label="Ny besked"
            onClick={() => navigate("/requests")}
          >
            <img src={ComposeIcon} alt="" aria-hidden="true" />
          </button>
        </header>

        <label className="chat-search">
          <span className="sr-only">Søg i beskeder</span>
          <input
            type="search"
            placeholder="Søg..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="chat-stories" aria-label="Hurtige kontakter">
          {enrichedStories.map((story) => (
            <Story
              key={story.id}
              name={story.name}
              color={story.color}
              avatar={story.avatar}
            />
          ))}
        </div>

        <div className="chat-filters" aria-label="Filtre">
          {[
            ["alle", "Alle"],
            ["ulæst", "Ulæst"],
            ["grupper", "Grupper"],
            ["anmodninger", "(3) Anmodninger"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={`chat-chip ${activeFilter === value ? "is-active" : ""}`}
              onClick={() => setActiveFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>

        {activeThread && (
          <p className="chat-selected">Åbnet: {activeThread.name}</p>
        )}

        <div className="chat-list">
          {filteredThreads.map((thread) => (
            <ThreadItem
              key={thread.id}
              thread={thread}
              active={String(thread.id) === String(id)}
              onOpen={(nextThread) => navigate(`/chat/${nextThread.id}`)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

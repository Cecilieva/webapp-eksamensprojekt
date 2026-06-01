import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import BrandMark from "../assets/responsivtlogo.svg";
import ComposeIcon from "../assets/edit-icon.svg";
import ChatHeader from "../components/Chat/ChatHeader.jsx";
import ChatSearch from "../components/Chat/ChatSearch.jsx";
import ChatStories from "../components/Chat/ChatStories.jsx";
import ChatFilters from "../components/Chat/ChatFilters.jsx";
import ChatThreadList from "../components/Chat/ChatThreadList.jsx";
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

function getUserImageUrl(profile) {
  const images = profile?.images;
  if (!images) return null;

  const first = Array.isArray(images) ? images[0] : null;
  return typeof first === "string" && first.trim() ? first : null;
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
        user: getUserImageUrl(profile),
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
          primaryUser: getUserImageUrl(firstProfile),
          secondaryUser: getUserImageUrl(secondProfile),
        };
      }

      const profile = profileByName.get(thread.name.toLowerCase());

      return {
        ...thread,
        user: getUserImageUrl(profile),
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
        <ChatHeader
          brandMark={BrandMark}
          composeIcon={ComposeIcon}
          onCompose={() => navigate("/requests")}
        />

        <ChatSearch value={query} onChange={setQuery} />

        <ChatStories stories={enrichedStories} />

        <ChatFilters activeFilter={activeFilter} onChange={setActiveFilter} />

        {activeThread && (
          <p className="chat-selected">Åbnet: {activeThread.name}</p>
        )}

        <ChatThreadList
          threads={filteredThreads}
          activeThreadId={id}
          onOpen={(nextThread) => navigate(`/chat/${nextThread.id}`)}
        />
      </section>
    </main>
  );
}

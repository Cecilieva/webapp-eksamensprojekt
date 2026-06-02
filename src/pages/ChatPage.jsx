import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../lib/supabaseClient";
import BrandMark from "../assets/responsivtlogo.svg";
import ChatHeader from "../components/Chat/ChatHeader.jsx";
import ChatSearch from "../components/Chat/ChatSearch.jsx";
import ChatStories from "../components/Chat/ChatStories.jsx";
import ChatFilters from "../components/Chat/ChatFilters.jsx";
import ChatThreadList from "../components/Chat/ChatThreadList.jsx";
import ChatRequestList from "../components/Chat/ChatRequestList.jsx";
import "./ChatPage.css";

/* Midlertidige chattråde ved vores tidlige prototype */
const THREADS = [
  {
    profileName: "Karoline",
    preview: "Dig: Enig! Skal vi tage en kaffe...",
    time: "nu",
    unread: false,
  },
  {
    profileName: "Emil",
    preview: "Den sidste roomie jeg havde...",
    time: "17:04",
    unread: true,
    isUnreadMessage: true,
  },
  {
    profileName: "Sarah",
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
    isUnreadMessage: true,
  },
  {
    profileName: "Ella",
    preview: "Har du set den nye bolig?",
    time: "I går",
    unread: false,
  },
];

/* Midlertidige beskedanmodninger ved vores tidlige prototype */
const REQUESTS = [
  { profileName: "Cecilia", text: "Har sendt dig en besked!" },
  { profileName: "Bastian", text: "Har sendt dig en besked!" },
  { profileName: "Lea", text: "Har sendt dig en besked!" },
];

/* Henter første profilbillede fra en profil */
function getUserImageUrl(profile) {
  const images = profile?.images;
  if (!images) return null;

  const first = Array.isArray(images) ? images[0] : null;
  return typeof first === "string" && first.trim() ? first : null;
}

export default function ChatPage() {
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("alle");
  const [profiles, setProfiles] = useState([]);

  /* Henter profiler fra Supabase */
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

  /* Opretter opslagstabel med profiler baseret på navn */
  const profileByName = useMemo(() => {
    const map = new Map();

    for (const profile of profiles) {
      if (profile?.name) {
        map.set(profile.name.toLowerCase(), profile);
      }
    }

    return map;
  }, [profiles]);

  /* profilbilleder med navne i scroll */
  const enrichedStories = useMemo(() => {
    return profiles.slice(0, 5).map((profile) => ({
      id: profile.id,
      name: profile.name,
      user: getUserImageUrl(profile),
    }));
  }, [profiles]);

  /* Chattråde koblet sammen med profiler */
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

      const profile = profileByName.get(thread.profileName?.toLowerCase());

      return {
        ...thread,
        id: profile?.id ?? thread.profileName,
        name: profile?.name ?? thread.profileName,
        user: getUserImageUrl(profile),
      };
    });
  }, [profileByName]);

  /* Beskedanmodninger koblet sammen med profiler */
  const enrichedRequests = useMemo(() => {
    return REQUESTS.map((request) => {
      const profile = profileByName.get(request.profileName.toLowerCase());

      return {
        ...request,
        id: profile?.id ?? request.profileName,
        name: profile?.name ?? request.profileName,
        user: getUserImageUrl(profile),
      };
    });
  }, [profileByName]);

  /* Filtrerer chats ud fra søgning og valgt filter */
  const filteredThreads = useMemo(() => {
    const search = query.trim().toLowerCase();

    return enrichedThreads.filter((thread) => {
      const matchesSearch =
        !search ||
        thread.name.toLowerCase().includes(search) ||
        thread.preview.toLowerCase().includes(search);

      let matchesFilter = true;

      if (activeFilter === "ulæst") {
        matchesFilter = thread.unread === true;
      }

      if (activeFilter === "grupper") {
        matchesFilter = thread.isGroup === true;
      }

      if (activeFilter === "anmodninger") {
        matchesFilter = false;
      }

      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, enrichedThreads, query]);

  return (
    <main className="app chat-pageShell">
      <section className="chat-page" aria-label="Beskeder">
        {/* Sidehoved */}
        <ChatHeader brandMark={BrandMark} />

        {/* Søgefelt */}
        <ChatSearch value={query} onChange={setQuery} />

        {/* Hurtige kontakter */}
        <ChatStories stories={enrichedStories} />

        {/* Filterknapper */}
        <ChatFilters activeFilter={activeFilter} onChange={setActiveFilter} />

        {/* Chattråde */}
        {activeFilter !== "anmodninger" && (
          <ChatThreadList threads={filteredThreads} activeThreadId={id} />
        )}

        {/* Beskedanmodninger */}
        {activeFilter === "anmodninger" && (
          <ChatRequestList requests={enrichedRequests} />
        )}
      </section>
    </main>
  );
}

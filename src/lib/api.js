/* Base URL til Supabase REST endpoint */
const URL = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/profiles`;

/* API key fra environment variables */
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_APIKEY;

/* Standard headers til alle requests */
const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",

  /* Returnerer opdaterede records efter POST/PATCH */
  Prefer: "return=representation",
};

/* håndterer API svar */
async function handleResponse(res) {
  /* Fejl håndtering */
  if (!res.ok) {
    const text = await res.text().catch(() => "");

    throw new Error(`Request failed: ${res.status} ${res.statusText} ${text}`);
  }

  /* Tjekker om svaret er JSON */
  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return res.json();
  }

  return null;
}

/* henter alle profiler */
export async function getProfiles() {
  const res = await fetch(URL, {
    headers,
  });

  return handleResponse(res);
}

/* Henter profiler baseret på filtre */
export async function getPostsFiltered(filters = {}) {
  const params = [];
  const currentYear = new Date().getFullYear();

  /* sortering */
  if (filters.sort) {
    if (filters.sort === "a-z") {
      params.push("order=caption.asc");
    }

    if (filters.sort === "z-a") {
      params.push("order=caption.desc");
    }

    if (filters.sort === "new-old") {
      params.push("order=created_at.desc");
    }

    if (filters.sort === "old-new") {
      params.push("order=created_at.asc");
    }
  }

  /* alder minimum */
  if (filters.ageMin) {
    const n = Number(filters.ageMin);

    if (!Number.isNaN(n)) {
      /* Konverterer alder til fødselsår */
      params.push(`year=lte.${currentYear - n}`);
    } else {
      /* Fallback hvis databasen bruger age felt */
      params.push(`age=gte.${filters.ageMin}`);
    }
  }

  /* Alder maksimum */
  if (filters.ageMax) {
    const n = Number(filters.ageMax);

    if (!Number.isNaN(n)) {
      params.push(`year=gte.${currentYear - n}`);
    } else {
      params.push(`age=lte.${filters.ageMax}`);
    }
  }

  /* Minimum pris */
  if (filters.priceMin) {
    const n = Number(filters.priceMin);

    if (!Number.isNaN(n)) {
      params.push(`price=gte.${n}`);
    }
  }

  /* Maksimum pris */
  if (filters.priceMax) {
    const n = Number(filters.priceMax);

    if (!Number.isNaN(n)) {
      params.push(`price=lte.${n}`);
    }
  }

  /* Søger efter depositum/acconto keywords */
  if (filters.includeDeposit) {
    const q = encodeURIComponent(
      "or=(caption.ilike.*acconto*,caption.ilike.*deposit*,caption.ilike.*depositum*,caption.ilike.*forudbetaling*)",
    );

    params.push(q);
  }

  /* Ledig fra dato */
  if (filters.availableDate) {
    const d = new Date(filters.availableDate).toISOString();

    params.push(`available_date=gte.${d}`);
  }

  /* Bygger query string dynamisk */
  const query = params.length ? `?${params.join("&")}` : "";

  const res = await fetch(`${URL}${query}`, {
    headers,
  });

  return handleResponse(res);
}

/* henter enkelt profil */
export async function getProfile(id) {
  const res = await fetch(`${URL}?id=eq.${id}&select=*`, {
    headers,
  });

  const data = await handleResponse(res);

  /* Supabase returnerer arrays selv ved enkelt match */
  return Array.isArray(data) ? data[0] || null : data;
}

/* henter enkelt post */
export async function getPost(id) {
  const res = await fetch(`${URL}?id=eq.${id}&select=*`, {
    headers,
  });

  const data = await handleResponse(res);

  return Array.isArray(data) ? data[0] || null : data;
}

/* henter profiler ud fra id */
export async function getProfilesById(id) {
  const res = await fetch(`${URL}?id=eq.${id}&select=*`, {
    headers,
  });

  return handleResponse(res);
}

/* opretter ny profil */
export async function createProfile(payload) {
  const res = await fetch(URL, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  const data = await handleResponse(res);

  return Array.isArray(data) ? data[0] || null : data;
}

/* opdaterer profil */
export async function updateProfile(id, payload) {
  const res = await fetch(`${URL}?id=eq.${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(payload),
  });

  const data = await handleResponse(res);

  return Array.isArray(data) ? data[0] || null : data;
}

/* sletter profil */
export async function deleteProfile(id) {
  const res = await fetch(`${URL}?id=eq.${id}`, {
    method: "DELETE",
    headers,
  });

  return handleResponse(res);
}

/* Samlet API export */
export default {
  getProfiles,
  getPostsFiltered,
  getProfile,
  getPost,
  getProfilesById,
  createProfile,
  updateProfile,
  deleteProfile,
};

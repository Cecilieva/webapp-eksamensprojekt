const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.",
  );
}

// Supabase PostgREST base URL
const REST_BASE = `${supabaseUrl.replace(/\/$/, "")}/rest/v1`;

// 👉 Brug den rigtige tabel
const TABLE = "user";
const URL = `${REST_BASE}/${TABLE}`;

const headers = {
  apikey: supabaseKey,
  Authorization: `Bearer ${supabaseKey}`,
  "Content-Type": "application/json",
};

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed: ${res.status} ${res.statusText} ${text}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return null;
}

// ⭐ Hent ALLE brugere
export async function getUsers() {
  const res = await fetch(`${URL}?select=*`, { headers });
  return handleResponse(res);
}

// ⭐ Hent én bruger
export async function getUser(id) {
  const res = await fetch(`${URL}?select=*&id=eq.${id}`, { headers });
  return handleResponse(res);
}

// ⭐ Opret bruger (hvis du får brug for det)
export async function createUser(payload) {
  const res = await fetch(URL, {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// ⭐ Opdater bruger
export async function updateUser(id, payload) {
  const res = await fetch(`${URL}?id=eq.${id}`, {
    method: "PATCH",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// ⭐ Slet bruger
export async function deleteUser(id) {
  const res = await fetch(`${URL}?id=eq.${id}`, {
    method: "DELETE",
    headers,
  });
  return handleResponse(res);
}

export default { getUsers, getUser, createUser, updateUser, deleteUser };

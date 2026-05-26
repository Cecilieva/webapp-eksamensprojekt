const URL = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/profiles`;

const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
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

export async function getProfiles() {
  const res = await fetch(URL, { headers });
  return handleResponse(res);
}

export async function getProfilesById(id) {
  const res = await fetch(`${URL}?id=eq.${id}`, { headers });
  return handleResponse(res);
}

export async function createProfile(payload) {
  const res = await fetch(URL, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function updateProfile(id, payload) {
  const res = await fetch(`${URL}?id=eq.${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function deleteProfile(id) {
  const res = await fetch(`${URL}?id=eq.${id}`, {
    method: "DELETE",
    headers,
  });
  return handleResponse(res);
}

export default { getProfiles, getProfilesById, createProfile, updateProfile, deleteProfile };

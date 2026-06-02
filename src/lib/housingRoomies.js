import supabase from "./supabaseClient";

// Hent alle roomies tilknyttet et housingId
export async function getRoomiesByHousingId(housingId) {
  // Returnér tomt array hvis housingId ikke er gyldigt
  if (!Number.isFinite(housingId)) return [];

  // Hent alle links mellem housing og roomies
  const { data: links, error: linksError } = await supabase
    .from("housing_roomies")
    .select("profile_id")
    .eq("housing_id", housingId);

  if (linksError) throw linksError;

  // Udtræk alle profile_ids
  const profileIds = (links || [])
    .map((x) => x?.profile_id)
    .filter((x) => Number.isFinite(Number(x)));

  // Hvis ingen roomies, returnér tomt array
  if (profileIds.length === 0) return [];

  // Hent profiler for alle roomies
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, name, age, occupation, images")
    .in("id", profileIds);

  if (profilesError) throw profilesError;

  // Map profiler på id for at bevare rækkefølge
  const byId = new Map((profiles || []).map((p) => [p.id, p]));

  // Returnér roomies i samme rækkefølge som profileIds
  return profileIds.map((id) => byId.get(id)).filter(Boolean);
}

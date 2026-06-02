/**
 * housing.js
 * - Wrapper-funktioner til Supabase opslag af boligdata.
 * - Finder housing_id via housing_roomies (profile_id -> housing_id).
 * - Henter bolig-info fra housing_listings (kun felter der bruges til kort).
 * - Returnerer et simpelt "card"-objekt til UI (id/title/first image + rent/rooms/square_meters).
 */

import supabase from "./supabaseClient";

// Slår en boligrelation op: profile_id -> housing_id
export async function getHousingIdForProfile(profileId) {
  // Guard: ingen profil => ingen bolig
  if (!profileId) return null;

  // maybeSingle(): 0 rows er OK (returnerer null) i stedet for at kaste fejl som .single()
  const { data, error } = await supabase
    .from("housing_roomies")
    .select("housing_id")
    .eq("profile_id", profileId)
    .maybeSingle();

  if (error) {
    console.error("Error in getHousingIdForProfile:", error);
    return null;
  }

  return data?.housing_id ?? null;
}

// Henter en boliglisting ud fra housingId
export async function getHousingById(housingId) {
  // Guard: ingen id => ingen listing
  if (!housingId) return null;

  const { data, error } = await supabase
    .from("housing_listings")
    .select(
      "id, title, images, rent, rooms, square_meters, city, description, facilities, seeking_roomies, aconto, deposit, move_in_date",
    )
    .eq("id", housingId)
    .maybeSingle();

  if (error) {
    console.error("Error in getHousingById:", error);
    return null;
  }

  if (!data) return null;

  // Normaliser data, så UI altid får forventede typer
  return {
    id: data.id,
    title: data.title ?? "",
    images: Array.isArray(data.images) ? data.images : [],
    rent: data.rent ?? null,
    rooms: data.rooms ?? null,
    square_meters: data.square_meters ?? null,
    city: data.city ?? "",
    description: data.description ?? "",
    facilities: Array.isArray(data.facilities) ? data.facilities : [],
    seeking_roomies: data.seeking_roomies ?? null,
    aconto: data.aconto ?? null,
    deposit: data.deposit ?? null,
    move_in_date: data.move_in_date ?? null,
  };
}

// Opdater boligopslag på id
export async function updateHousing(id, updates) {
  const { data, error } = await supabase
    .from("housing_listings")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

// Convenience: alt UI-data til boligkortet ud fra en profileId
export async function getHousingCardForProfile(profileId) {
  // 1) find relation i housing_roomies
  const housingId = await getHousingIdForProfile(profileId);
  if (!housingId) return null;

  // 2) hent data i housing_listings
  const listing = await getHousingById(housingId);
  if (!listing) return null;

  // 3) map til et kompakt UI-objekt (første billede bruges som thumbnail)
  return {
    id: listing.id,
    title: listing.title,
    image: listing.images[0] ?? null,
    rent: listing.rent,
    rooms: listing.rooms,
    square_meters: listing.square_meters,
  };
}

// Slå housing_id op ud fra profile_id via housing_roomies
export async function getHousingIdByProfileId(profileId) {
  const { data, error } = await supabase
    .from("housing_roomies")
    .select("housing_id")
    .eq("profile_id", profileId)
    .single();

  if (error) throw error;
  if (!data?.housing_id)
    throw new Error("Ingen housing_id fundet for profilen.");
  return data.housing_id;
}

// Opretter et nyt boligopslag
export async function createHousing(payload) {
  // Her normaliserer du facilities til stort forbogstav
  const facilities = payload.facilities.map(
    (f) => f.charAt(0).toUpperCase() + f.slice(1).toLowerCase(),
  );

  // Gem i Supabase
  const { data, error } = await supabase
    .from("housing_listings")
    .insert([{ ...payload, facilities }]);

  return { data, error };
}

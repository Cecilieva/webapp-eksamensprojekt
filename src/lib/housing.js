/**
 * housing.js
 * - Wrapper-funktioner til Supabase opslag af boligdata.
 * - Finder housing_id via housing_roomies (profile_id -> housing_id).
 * - Henter bolig-info fra housing_listings (kun felter der bruges til kort).
 * - Returnerer et simpelt "card"-objekt til UI (id/title/first image + rent/rooms/square_meters).
 */

import { supabase } from "./supabaseClient";

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

// Henter en boliglisting ud fra housingId (kun felter der bruges i boligkortet)
export async function getHousingById(housingId) {
  // Guard: ingen id => ingen listing
  if (!housingId) return null;

  const { data, error } = await supabase
    .from("housing_listings")
    .select("id, title, images, rent, rooms, square_meters")
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
  };
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

import supabase from "./supabaseClient";
import buildFilterQuery from "../lib/buildFilterQuery";

//
// PROFILER
//

export async function getProfiles() {
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) throw error;
  return data;
}

export async function getProfile(id) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createProfile(payload) {
  const { data, error } = await supabase
    .from("profiles")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(id, payload) {
  const { data, error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProfile(id) {
  const { error } = await supabase.from("profiles").delete().eq("id", id);

  if (error) throw error;
  return true;
}

//
// FILTRERING (kører via buildFilterQuery)
//

export async function getProfilesFiltered(filters) {
  const query = buildFilterQuery(filters);
  const { data, error } = await query;

  if (error) throw error;
  return data;
}

//
// Samlet export
//

export default {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  getProfilesFiltered,
};

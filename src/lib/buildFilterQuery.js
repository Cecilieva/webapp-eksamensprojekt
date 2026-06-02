import supabase from "./supabaseClient";
import { OCCUPATION_DB_MAP, GENDER_DB_MAP } from "./filterOptions";

// Bygger en Supabase-query baseret på de valgte filtre
const viewerId = 14;

export default function buildFilterQuery(filters) {
  // Starter queryen på 'profiles' og joiner relevante tabeller
  let query = supabase
    .from("profiles")
    .select(
      `
      *,
      housing_roomies (
        *,
        housing_listings (*)
      ),
      matchscore!matchscore_profile_b_fkey (
        score,
        profile_a,
        profile_b
      )
    `,
    )
    .eq("matchscore.profile_a", viewerId);

  // SORTERING
  if (filters.sort === "a-z") query = query.order("name", { ascending: true });
  if (filters.sort === "z-a") query = query.order("name", { ascending: false });
  if (filters.sort === "new-old")
    query = query.order("created_at", { ascending: false });
  if (filters.sort === "old-new")
    query = query.order("created_at", { ascending: true });

  // ALDER
  if (filters.ageMin) {
    const min = parseInt(filters.ageMin, 10);
    if (!isNaN(min)) query = query.gte("age", min);
  }
  if (filters.ageMax) {
    const max = parseInt(filters.ageMax, 10);
    if (!isNaN(max)) query = query.lte("age", max);
  }

  // BUDGET
  if (filters.budgetMin) {
    const min = parseInt(filters.budgetMin, 10);
    if (!isNaN(min)) query = query.gte("budget", min);
  }
  if (filters.budgetMax) {
    const max = parseInt(filters.budgetMax, 10);
    if (!isNaN(max)) query = query.lte("budget", max);
  }

  // KØN
  if (filters.gender && filters.gender !== "ingen-preference") {
    const allowed = GENDER_DB_MAP[filters.gender];
    if (allowed?.length > 0) {
      query = query.in("gender", allowed);
    }
  }

  // BY
  if (filters.city) {
    query = query.ilike("city", `%${filters.city}%`);
  }

  // BESKÆFTIGELSE
  if (filters.occupation) {
    const selected = Object.entries(filters.occupation)
      .filter(([, v]) => v)
      .map(([key]) => key);

    let dbValues = [];
    selected.forEach((option) => {
      dbValues = dbValues.concat(OCCUPATION_DB_MAP[option] || []);
    });

    dbValues = [...new Set(dbValues)];

    console.log("DEBUG occupation selected:", selected);
    console.log("DEBUG occupation dbValues:", dbValues);

    if (dbValues.length > 0) {
      query = query.in("occupation", dbValues);
    }
  }

  // FACILITIES
  if (filters.facilities) {
    const selected = Object.entries(filters.facilities)
      .filter(([, v]) => v)
      .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1).toLowerCase());

    if (selected.length > 0) {
      query = query.contains(
        "housing_roomies.housing_listings.facilities",
        selected,
      );
    }
  }

  // MATCHSCORE
  if (filters.matchScore) {
    const minScore = parseInt(filters.matchScore.replace(/\D/g, ""), 10);
    if (!isNaN(minScore)) {
      query = query
        .gte("matchscore.score", minScore)
        .not("matchscore.score", "is", null);
    }
  }

  return query;
}

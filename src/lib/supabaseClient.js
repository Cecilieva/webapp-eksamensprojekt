import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.",
  );
}

// Helpful diagnostics (dev only)
if (import.meta.env.DEV) {
  console.log("[supabase] url =", supabaseUrl);
  console.log(
    "[supabase] anon key looks like JWT =",
    supabaseKey.split(".").length === 3,
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

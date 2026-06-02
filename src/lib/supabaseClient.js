import { createClient } from "@supabase/supabase-js";

/* Henter environment variables fra Vite */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_APIKEY;

/* Tjekker at nødvendige env vars findes */
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase env vars");
}

/* Logger URL i development til debugging */
console.log("[supabase] url =", supabaseUrl);

/* Opretter og eksporterer Supabase client */
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

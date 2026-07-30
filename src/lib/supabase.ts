import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Check your .env.local file (see .env.example).",
  );
}

// This uses the anon/publishable key, which is safe to expose in client-side code.
// It only allows what our Row Level Security policies permit (insert-only on `leads`).
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

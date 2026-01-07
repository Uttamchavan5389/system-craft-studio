import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

// These are public (publishable) values required for the frontend to talk to the backend.
// We still prefer env vars, but keep a safe fallback to avoid "supabaseUrl is required" runtime crashes.
const FALLBACK_SUPABASE_URL = "https://moctswvgbhgxbjjwigqo.supabase.co";
const FALLBACK_SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vY3Rzd3ZnYmhneGJqandpZ3FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODMxNDMsImV4cCI6MjA4MjQ1OTE0M30.td2BzYSYYiPVdUEkk1eIQraU-T5rxJ-lGyDqTl--BgM";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? FALLBACK_SUPABASE_URL;
const supabaseKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ??
  FALLBACK_SUPABASE_PUBLISHABLE_KEY;

let client: SupabaseClient<Database> | null = null;

export const backendHttp = {
  url: supabaseUrl,
  apikey: supabaseKey,
};

export function getBackendClient() {
  if (client) return client;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Backend configuration missing");
  }

  client = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      storage: window.localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return client;
}

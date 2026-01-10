import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

let client: SupabaseClient<Database> | null = null;

function resolveBackendConfig() {
  const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? "";
  const key = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ?? "";
  const projectId = (import.meta.env.VITE_SUPABASE_PROJECT_ID as string | undefined) ?? "";

  const resolvedUrl = url || (projectId ? `https://${projectId}.supabase.co` : "");

  return {
    url: resolvedUrl,
    apikey: key,
  };
}

// Wrap so callers can call getBackendClient() like a function
export function getBackendClient() {
  if (client) return client;

  const cfg = resolveBackendConfig();
  if (!cfg.url) throw new Error("Backend URL is missing. Please check configuration.");
  if (!cfg.apikey) throw new Error("Backend publishable key is missing. Please check configuration.");

  client = createClient<Database>(cfg.url, cfg.apikey, {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return client;
}

// Expose url & key for fetch-based calls (backend function invoke)
export const backendHttp = resolveBackendConfig();


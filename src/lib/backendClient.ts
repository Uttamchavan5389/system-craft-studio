// Re-export the auto-generated Lovable Cloud client
import { supabase } from "@/integrations/supabase/client";

// Wrap so callers can call getBackendClient() like a function
export function getBackendClient() {
  return supabase;
}

// Expose url & key for fetch-based calls (edge function invoke)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

export const backendHttp = {
  url: SUPABASE_URL,
  apikey: SUPABASE_KEY,
};

export { supabase };

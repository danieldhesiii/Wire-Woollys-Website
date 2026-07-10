import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Supabase is used when its env vars are present; otherwise the app falls back
// to a local file store (see store.ts) so the demo runs with zero setup.
//
// .env.local:
//   NEXT_PUBLIC_SUPABASE_URL=...
//   SUPABASE_SERVICE_ROLE_KEY=...   (server-only; never expose to the client)

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasSupabase = Boolean(url && serviceKey);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!hasSupabase) return null;
  if (!client) {
    client = createClient(url as string, serviceKey as string, {
      auth: { persistSession: false },
    });
  }
  return client;
}

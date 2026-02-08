import { createClient } from "@supabase/supabase-js";

export function createSupabaseServerClient() {
  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL; // fallback

  const serviceRole =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE;

  if (!url) throw new Error("SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) is missing.");
  if (!serviceRole) throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing.");

  return createClient(url, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
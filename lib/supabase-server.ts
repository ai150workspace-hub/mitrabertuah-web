// Satu-satunya cara project ini bicara ke Supabase — service role, server-only.
//
// Tidak ada lib/supabase-client.ts di project ini. Landing page tidak pernah
// memanggil Supabase dari browser (tidak ada login, tidak ada area member),
// jadi anon key tidak dibutuhkan sama sekali — lihat §5.1 build spec.
// SUPABASE_SERVICE_ROLE_KEY dan SUPABASE_URL SENGAJA tanpa prefix
// NEXT_PUBLIC_ supaya tidak pernah ikut ke bundel klien. Jangan pernah
// mengimpor file ini dari Client Component.
import { createClient } from "@supabase/supabase-js";

export function createServiceRoleClient() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

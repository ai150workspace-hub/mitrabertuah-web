// Rate limit per IP lewat tabel Supabase, BUKAN memory/edge config — lihat
// komentar di migrasi 0013_web_rate_limit.sql untuk alasannya (Vercel
// stateless multi-instance, Aturan Mutlak #11).
import { createHash } from "node:crypto";
import { createServiceRoleClient } from "@/lib/supabase-server";

const MAX_SUBMIT_PER_HOUR = 3;

// IP mentah tidak pernah disimpan — hanya hash-nya, konsisten dengan
// kolom web_lead_submissions.ip_hash.
export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

// true = masih di bawah batas, boleh lanjut. false = tolak.
export async function checkRateLimit(ipHash: string): Promise<boolean> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.rpc("check_rate_limit", {
    p_bucket_key: `lead-submit:${ipHash}`,
    p_max_per_window: MAX_SUBMIT_PER_HOUR,
    p_window_minutes: 60,
  });

  if (error) {
    // Infrastruktur rate limit bermasalah bukan sinyal bahwa pengirim
    // bot — jangan sampai lead yang sah hilang karena ini. Catat saja.
    console.error("[rate-limit] gagal memeriksa rate limit:", error.message);
    return true;
  }

  return data === true;
}

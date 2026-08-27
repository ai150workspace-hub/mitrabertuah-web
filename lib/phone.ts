// Normalisasi nomor HP ke format lokal '0812...' — HARUS sama persis dengan
// lib/import/phone-local.ts di bertuah-crm dan normalisasi di dalam fungsi
// intake_web_lead() (migrasi 0012). Salah format = dedup gagal diam-diam,
// karena contacts.no_hp menyimpan format lokal, bukan format '628...' yang
// dipakai telephony. Diport, bukan diimpor lintas-repo — project ini
// terpisah dari bertuah-crm.
export function normalizePhoneLocal(input: string | null | undefined): string | null {
  if (!input) return null;

  let d = String(input).replace(/\D/g, "");
  if (!d) return null;

  if (d.startsWith("620")) d = "0" + d.slice(3);
  else if (d.startsWith("62")) d = "0" + d.slice(2);
  else if (d.startsWith("8")) d = "0" + d;

  if (!d.startsWith("0")) return null;
  if (d.length < 10 || d.length > 14) return null;

  return d;
}

// Format internasional tanpa '+', untuk tautan wa.me (§8.1) — beda dari
// format lokal '0812...' yang dipakai contacts.no_hp.
export function toWhatsAppFormat(localPhone: string): string {
  return "62" + localPhone.replace(/^0/, "");
}

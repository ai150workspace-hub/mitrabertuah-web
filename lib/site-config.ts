// Satu sumber untuk identitas bisnis di seluruh situs — Aturan Mutlak #9:
// jangan hardcode nomor WA, alamat, atau nama badan usaha di komponen.
//
// officeAddress dan businessEntity SENGAJA placeholder: keduanya
// keputusan terbuka pemilik yang memblokir publish (§1 nomor 1 dan 4
// build spec), bukan sesuatu yang boleh ditebak. Ganti begitu owner
// mengonfirmasi.
export const siteConfig = {
  brandName: "Mitra Bertuah",
  domain: "mitrabertuah.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  officeAddress: "[TUNGGU KONFIRMASI OWNER]",
  businessEntity: "[TUNGGU KONFIRMASI OWNER]",
  legalDisclaimer: "[TUNGGU KONFIRMASI OWNER]",
  // Tidak menyebut nama/logo mitra leasing mana pun — Aturan Mutlak #7,
  // sampai ada izin tertulis (§1 nomor 5).
  partnerDescription: "beberapa perusahaan pembiayaan berizin OJK",
  partnerCount: 5,
} as const;

const PLACEHOLDER = "[TUNGGU KONFIRMASI OWNER]";

/** True kalau field itu masih placeholder — dipakai untuk menyembunyikan
 *  field dari JSON-LD (§11) daripada menerbitkan data terstruktur palsu. */
export function isPendingConfirmation(value: string): boolean {
  return value === PLACEHOLDER;
}

// Satu-satunya kalimat disclaimer yang sudah final (§13.3 build spec,
// bukan karangan) — dipakai DisclosureBar.tsx (wajib di atas artikel)
// DAN sebagai fallback footer (bukan menulis kalimat baru). Beda dengan
// siteConfig.legalDisclaimer yang masih genuinely menunggu owner.
export const APPROVED_DISCLOSURE_TEXT =
  "Mitra Bertuah adalah mitra pemasaran perusahaan pembiayaan berizin OJK. " +
  "Komisi kami dibayar oleh perusahaan pembiayaan, bukan oleh Anda.";

// Redesign brief §5: placeholder TIDAK BOLEH tampil ke pengunjung, tapi
// section-nya juga tidak boleh dihapus. Solusinya: tampilkan fallback
// netral yang jelas-jelas aman (bukan karangan/klaim baru) sampai owner
// mengonfirmasi versi asli — situs tetap noindex sepanjang itu.
// TODO: menunggu teks final dari owner untuk officeAddress, businessEntity,
// legalDisclaimer (lihat §1 build spec nomor 1, 2, 4).
export function displayOfficeAddress(): string {
  return isPendingConfirmation(siteConfig.officeAddress) ? "Pekanbaru, Riau" : siteConfig.officeAddress;
}

export function displayBusinessEntity(): string {
  return isPendingConfirmation(siteConfig.businessEntity)
    ? "Mitra pemasaran resmi perusahaan pembiayaan berizin OJK"
    : siteConfig.businessEntity;
}

export function displayLegalDisclaimer(): string {
  return isPendingConfirmation(siteConfig.legalDisclaimer) ? APPROVED_DISCLOSURE_TEXT : siteConfig.legalDisclaimer;
}

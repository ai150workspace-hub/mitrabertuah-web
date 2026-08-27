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

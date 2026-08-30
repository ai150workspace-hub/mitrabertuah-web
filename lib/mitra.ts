// Data mitra pembiayaan untuk section logo di homepage (lihat
// PROMPT_LOGO_MITRA_mitrabertuah.md) — INI PENGECUALIAN eksplisit dari
// "Aturan Mutlak #7" (nama/logo mitra tidak ditampilkan tanpa izin
// tertulis, lihat lib/site-config.ts) untuk section homepage ini saja.
// Halaman /[kota] (lib/kota.ts) dan kalkulator kelayakan
// (lib/kelayakan-kendaraan.ts) TETAP tidak menyebut nama mitra — itu
// keputusan desain terpisah, bukan bagian dari izin ini.

export interface MitraPembiayaan {
  id: string;
  /** Nama badan hukum resmi — dipakai sebagai alt text gambar logo. */
  namaResmi: string;
  /** Nama pendek untuk caption bila perlu. */
  namaTampil: string;
  /** Path di /public/logo-mitra/. */
  logoFile: string;
  /** Dari mana file logo ini didapat — untuk rujukan enam bulan ke depan. */
  sumberFile: string;
  /** Dasar kerja sama / status keagenan. */
  catatan: string;
}

export const MITRA: MitraPembiayaan[] = [
  {
    id: "bfi",
    namaResmi: "PT BFI Finance Indonesia Tbk",
    namaTampil: "BFI Finance",
    logoFile: "/logo-mitra/bfi.png",
    sumberFile:
      "Diunduh dari https://www.bfi.co.id/static/images/logo-bfi.png (logo header situs resmi) pada 2026-08-30. " +
      "Catatan: resolusi asli cuma 70x70px — itu satu-satunya versi yang tersedia di situs resmi mereka, ganti " +
      "kalau owner punya file resolusi lebih tinggi.",
    catatan: "Agen resmi terdaftar; sudah bertemu perwakilan BFI.",
  },
  {
    id: "adira",
    namaResmi: "PT Adira Dinamika Multi Finance Tbk",
    namaTampil: "Adira Finance",
    logoFile: "/logo-mitra/adira.png",
    sumberFile: "Diunduh dari https://www.adira.co.id/logo-adira-header.png (logo header situs resmi) pada 2026-08-30.",
    catatan: "Agen resmi terdaftar; sudah bertemu perwakilan Adira Finance.",
  },
  {
    id: "muf",
    namaResmi: "PT Mandiri Utama Finance",
    namaTampil: "Mandiri Utama Finance",
    logoFile: "/logo-mitra/muf.png",
    sumberFile: "Diunduh dari logo footer situs resmi muf.co.id pada 2026-08-30.",
    catatan:
      "Agen resmi terdaftar; MUF secara eksplisit menginstruksikan agennya memasarkan lewat website dan " +
      "menampilkan citra sebagai \"Mitra MUF\" — lihat materi sosialisasi program mitra MUF 2026, slide 6.",
  },
  {
    id: "taf",
    namaResmi: "PT Toyota Astra Financial Services",
    namaTampil: "TAF",
    logoFile: "/logo-mitra/taf.svg",
    sumberFile: "Diunduh dari https://taf.co.id/files/site/logo-taff.svg (logo header situs resmi) pada 2026-08-30.",
    catatan: "Agen resmi terdaftar; sudah bertemu perwakilan TAF.",
  },
  {
    id: "acc",
    namaResmi: "PT Astra Sedaya Finance (ACC)",
    namaTampil: "ACC",
    logoFile: "/logo-mitra/acc.png",
    sumberFile:
      "Diunduh dari logo footer situs resmi acc.co.id pada 2026-08-30. Catatan: logo maskot lama (100x124px) " +
      "tapi masih aktif dipakai di footer situs resmi mereka saat ini.",
    catatan: "Agen resmi terdaftar; sudah bertemu perwakilan ACC.",
  },
];

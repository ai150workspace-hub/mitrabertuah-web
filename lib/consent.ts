// Teks persetujuan checkbox form (§10.1). Redesign brief §5 eksplisit
// mengizinkan (beda dari larangan blanket Aturan Mutlak #6 build awal):
// placeholder mentah TIDAK BOLEH tampil ke pengunjung, jadi dipakai teks
// netral minimum yang jelas-jelas aman — bukan klaim hukum baru, cuma
// menyatakan data dipakai untuk proses pengajuan & dihubungi soal itu.
// Situs tetap noindex sampai owner konfirmasi versi final.
// TODO: menunggu teks final dari owner — ganti CONSENT_TEXT dan naikkan
// CONSENT_TEXT_VERSION lagi saat itu terjadi; versi lama tetap valid
// untuk baris yang sudah tersimpan.
export const CONSENT_TEXT_VERSION = "draft-2";

export const CONSENT_TEXT =
  "Saya menyetujui data pada formulir ini digunakan untuk proses pengajuan pembiayaan " +
  "dan dihubungi terkait pengajuan saya, sesuai";

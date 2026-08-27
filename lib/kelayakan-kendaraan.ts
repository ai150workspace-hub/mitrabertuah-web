// Aturan kelayakan & LTV kendaraan per mitra — §7.1. HANYA BFI yang
// terverifikasi (dari rate card resmi yang dikonfirmasi pemilik langsung).
// Adira, MUF, TAF, ACC masih KOSONG sampai kriteria mereka dikonfirmasi —
// JANGAN mengarang angka untuk mitra yang belum terisi.
//
// Kode mitra di sini HANYA untuk logika internal (routing kelayakan).
// TIDAK PERNAH ditampilkan ke pengunjung situs — lihat Aturan Mutlak #7.
//
// Sampai kriteria mitra lain lengkap: kalkulator memakai aturan BFI
// sebagai batas paling longgar, dan form TETAP menerima semua pengajuan
// yang lolos batas itu. Jangan menolak otomatis berdasarkan satu mitra.

export type KategoriKendaraan = "Sedan/Jeep/Minibus" | "Pickup/Truck";

interface BandUsiaLtv {
  /** Umur kendaraan (tahun ini - tahun kendaraan), inclusive. */
  umurMin: number;
  umurMax: number;
  /** Kat A/B dari rate card BFI — beda profil risiko, form publik tidak
   *  mengumpulkan info untuk membedakan keduanya, jadi Kat B (lebih
   *  konservatif) dipakai sebagai default kalkulator publik. */
  ltvKatA: number;
  ltvKatB?: number;
  /** Syarat tambahan di luar usia, mis. Paket Klasik mensyaratkan bukti
   *  kepemilikan rumah dan tenor dibatasi 1-2 tahun. */
  catatan?: string;
}

// Sumber: rate card resmi BFI — Paket X-Tra & Standar, dan Paket Klasik
// untuk kendaraan lebih tua. Paket Take Over Agency SENGAJA tidak dipakai
// di sini — itu produk refinancing dari leasing lain, beda dari gadai
// BPKB langsung yang jadi fokus situs ini.
const TABEL_LTV: Record<KategoriKendaraan, BandUsiaLtv[]> = {
  "Sedan/Jeep/Minibus": [
    { umurMin: 0, umurMax: 5, ltvKatA: 0.85, ltvKatB: 0.75 },
    { umurMin: 6, umurMax: 10, ltvKatA: 0.85, ltvKatB: 0.7 },
    { umurMin: 11, umurMax: 15, ltvKatA: 0.75, ltvKatB: 0.6 },
    {
      umurMin: 16,
      umurMax: 20,
      ltvKatA: 0.75,
      catatan:
        "Untuk usia ini, tenor pembiayaan maksimal 1-2 tahun dan wajib ada bukti kepemilikan rumah.",
    },
  ],
  "Pickup/Truck": [
    { umurMin: 6, umurMax: 10, ltvKatA: 0.75, ltvKatB: 0.6 },
    {
      umurMin: 11,
      umurMax: 15,
      ltvKatA: 0.7,
      catatan:
        "Untuk usia ini, tenor pembiayaan maksimal 1-2 tahun dan wajib ada bukti kepemilikan rumah.",
    },
  ],
};

export interface HasilKelayakanUsia {
  layak: boolean;
  /** LTV konservatif (Kat B kalau ada, kalau tidak Kat A) untuk band usia ini. */
  ltv?: number;
  catatan?: string;
}

/**
 * Form publik (§8) hanya mengumpulkan jenisKendaraan "Mobil"/"Motor",
 * belum ada field kategori bodi (Sedan/Jeep/Minibus vs Pickup/Truck).
 * Default "Mobil" -> "Sedan/Jeep/Minibus" (kasus paling umum). Kalau
 * form nanti menambah field kategori, teruskan lewat parameter ketiga.
 */
export function cekKelayakanUsia(
  jenisKendaraan: "Mobil" | "Motor",
  tahunKendaraan: number,
  kategoriKendaraan: KategoriKendaraan = "Sedan/Jeep/Minibus"
): HasilKelayakanUsia {
  if (jenisKendaraan === "Motor") {
    // Tidak ada satu pun mitra dengan kriteria usia & LTV motor
    // terverifikasi. Jangan menolak tanpa dasar.
    return {
      layak: true,
      catatan:
        "Kriteria khusus motor belum kami verifikasi ke semua mitra — tetap bisa diajukan, kelayakan akhir dicek saat survei.",
    };
  }

  const umur = new Date().getFullYear() - tahunKendaraan;
  const band = TABEL_LTV[kategoriKendaraan].find((b) => umur >= b.umurMin && umur <= b.umurMax);

  if (!band) {
    const tertua = Math.max(...TABEL_LTV[kategoriKendaraan].map((b) => b.umurMax));
    if (umur > tertua) {
      return {
        layak: false,
        catatan: `Kendaraan di atas ${tertua} tahun belum ada kriteria yang terverifikasi dari mitra kami. Tetap hubungi kami — bisa jadi ada opsi lain di luar batas ini.`,
      };
    }
    return { layak: true }; // umur di bawah rentang termuda yang tercatat (tidak mungkin terjadi untuk kendaraan baru, tapi aman)
  }

  return { layak: true, ltv: band.ltvKatB ?? band.ltvKatA, catatan: band.catatan };
}

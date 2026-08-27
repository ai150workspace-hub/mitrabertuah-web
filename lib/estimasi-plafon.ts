// Estimasi kasar untuk halaman publik (§7). Berkas ini TIDAK mengimpor
// apa pun dari bertuah-crm — bukan salinan lib/loan-simulator.ts.
// TIDAK menghitung bunga. TIDAK menghitung angsuran. TIDAK menghitung
// komisi. Angka final ditentukan perusahaan pembiayaan setelah survei.
//
// Persentase LTV dikonfirmasi langsung oleh pemilik dari rate card resmi
// (bukan ditebak) — lihat lib/kelayakan-kendaraan.ts untuk tabelnya.
// Dipakai sebagai batas ATAS SAJA: pemilik mengonfirmasi tidak ada
// persentase batas bawah terpisah, jadi hasilnya "estimasi hingga Rp X",
// bukan rentang bawah-atas.
import { cekKelayakanUsia, type KategoriKendaraan } from "./kelayakan-kendaraan";

export interface InputEstimasi {
  jenisKendaraan: "Mobil" | "Motor";
  tahunKendaraan: number;
  estimasiNilaiKendaraan: number;
  /** Body type mobil kalau diketahui form nanti. Default kasus paling umum. */
  kategoriKendaraan?: KategoriKendaraan;
}

export interface HasilEstimasi {
  layak: boolean;
  alasanTidakLayak?: string;
  /** Info tambahan meski layak, mis. LTV belum tersedia untuk kombinasi ini. */
  catatan?: string;
  plafonBawah?: number;
  plafonAtas?: number;
}

export function estimasiPlafon(input: InputEstimasi): HasilEstimasi {
  const { jenisKendaraan, tahunKendaraan, estimasiNilaiKendaraan, kategoriKendaraan } = input;

  const kelayakan = cekKelayakanUsia(jenisKendaraan, tahunKendaraan, kategoriKendaraan);

  if (!kelayakan.layak) {
    return { layak: false, alasanTidakLayak: kelayakan.catatan };
  }

  if (kelayakan.ltv === undefined || estimasiNilaiKendaraan <= 0) {
    // Usia lolos, tapi belum ada LTV terverifikasi untuk kombinasi ini
    // (mis. jenis Motor) — tetap layak, tidak menampilkan angka.
    return { layak: true, catatan: kelayakan.catatan };
  }

  const plafonAtas = Math.round(estimasiNilaiKendaraan * kelayakan.ltv);
  return { layak: true, catatan: kelayakan.catatan, plafonAtas };
}

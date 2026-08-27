// Serah-terima nilai dari JourneyKelayakan ke LeadForm lewat sessionStorage
// — pola yang sama persis dengan lib/attribution.ts. Journey TIDAK
// menyimpan apa pun ke database (§ redesign brief) — cuma ngisi
// defaultValues form supaya orang tidak perlu mengisi ulang.
const KEYS = {
  jenisKendaraan: "mb_journey_jenis_kendaraan",
  tahunKendaraan: "mb_journey_tahun_kendaraan",
  estimasiNilaiKendaraan: "mb_journey_nilai_kendaraan",
} as const;

export interface JourneyHandoff {
  jenisKendaraan?: "Mobil" | "Motor";
  tahunKendaraan?: number;
  estimasiNilaiKendaraan?: number;
}

export const JOURNEY_HANDOFF_EVENT = "mb:journey-handoff";

/**
 * Sisi TULIS — dipanggil JourneyKelayakan saat "Lanjutkan Pengajuan".
 * Menyalakan CustomEvent karena LeadForm sudah ter-mount di halaman yang
 * sama SEBELUM journey selesai diisi — defaultValues react-hook-form
 * cuma dibaca sekali saat mount, jadi tidak akan menangkap nilai yang
 * ditulis belakangan tanpa event ini.
 */
export function setJourneyHandoff(data: JourneyHandoff): void {
  if (typeof window === "undefined") return;
  if (data.jenisKendaraan) window.sessionStorage.setItem(KEYS.jenisKendaraan, data.jenisKendaraan);
  if (data.tahunKendaraan) window.sessionStorage.setItem(KEYS.tahunKendaraan, String(data.tahunKendaraan));
  if (data.estimasiNilaiKendaraan)
    window.sessionStorage.setItem(KEYS.estimasiNilaiKendaraan, String(data.estimasiNilaiKendaraan));
  window.dispatchEvent(new CustomEvent(JOURNEY_HANDOFF_EVENT));
}

/** Sisi BACA — dipakai LeadForm saat mount untuk defaultValues tambahan. */
export function getJourneyHandoff(): JourneyHandoff {
  if (typeof window === "undefined") return {};

  const jenisKendaraan = window.sessionStorage.getItem(KEYS.jenisKendaraan);
  const tahunKendaraan = window.sessionStorage.getItem(KEYS.tahunKendaraan);
  const estimasiNilaiKendaraan = window.sessionStorage.getItem(KEYS.estimasiNilaiKendaraan);

  return {
    jenisKendaraan: jenisKendaraan === "Mobil" || jenisKendaraan === "Motor" ? jenisKendaraan : undefined,
    tahunKendaraan: tahunKendaraan ? parseInt(tahunKendaraan, 10) : undefined,
    estimasiNilaiKendaraan: estimasiNilaiKendaraan ? parseInt(estimasiNilaiKendaraan, 10) : undefined,
  };
}

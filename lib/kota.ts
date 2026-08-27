// Whitelist halaman kota (§12.3) — HANYA kota yang cabang mitra-nya
// benar-benar terverifikasi (§12.1). Jangan menambah kota di sini tanpa
// verifikasi cabang terlebih dulu — lihat "Yang harus ditanyakan, jangan
// ditebak" di prompt build.
//
// Pekanbaru TIDAK ada di daftar ini — itu halaman utama (§12.3 prioritas
// 1: "Halaman utama"), bukan halaman /[kota] terpisah.
//
// Kelima kota di bawah hanya punya SATU mitra terverifikasi (BFI —
// nama mitra tidak pernah disebut di halaman publik, Aturan Mutlak #7).
// Copy-nya karena itu HARUS beda dari homepage: bukan "kami bandingkan
// ke 5 mitra", tapi "kami mitra resmi, cabangnya ada di sini" (§12.3).
export interface KotaInfo {
  slug: string;
  nama: string;
  prioritas: number;
}

export const KOTA_WHITELIST: KotaInfo[] = [
  { slug: "dumai", nama: "Dumai", prioritas: 2 },
  { slug: "pangkalan-kerinci", nama: "Pangkalan Kerinci", prioritas: 3 },
  { slug: "ujung-batu", nama: "Ujung Batu", prioritas: 4 },
  { slug: "air-molek", nama: "Air Molek", prioritas: 5 },
  { slug: "siak-hulu", nama: "Siak Hulu", prioritas: 5 },
];

export function getKotaBySlug(slug: string): KotaInfo | undefined {
  return KOTA_WHITELIST.find((k) => k.slug === slug);
}

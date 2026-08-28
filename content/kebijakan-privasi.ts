// Kebijakan Privasi — versi ringkas & ramah pengguna, disetujui manajemen
// Mitra Bertuah 2026-08-28 (menggantikan draf legal panjang sebelumnya,
// yang sumbernya PROMPT_PRIVASI_mitrabertuah.md / KEBIJAKAN_PRIVASI_draft_v0.1.md
// di C:\CRM). Semua fakta di sini adalah keputusan resmi manajemen, bukan
// karangan Claude Code — termasuk kalimat lokasi penyimpanan data, yang
// sengaja jujur (menyebut ada pemrosesan di luar Indonesia) tanpa
// menyebut negara spesifik, atas permintaan eksplisit manajemen.

export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "lines"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export interface PolicySection {
  id: string;
  title: string;
  blocks: PolicyBlock[];
}

export const INTRO_TEXT =
  "Mitra Bertuah berkomitmen menjaga privasi dan keamanan data pribadi Anda. Berikut penjelasan singkatnya.";

export const PRIVACY_SECTIONS: PolicySection[] = [
  {
    id: "1-data-yang-kami-kumpulkan",
    title: "1. Data yang Kami Kumpulkan",
    blocks: [
      {
        type: "p",
        text: "Kami hanya mengumpulkan data yang Anda isikan di formulir pengajuan: nama, nomor WhatsApp, lokasi domisili, dan detail kendaraan. Kami **tidak pernah** meminta foto KTP atau BPKB lewat website ini.",
      },
    ],
  },
  {
    id: "2-penggunaan-data",
    title: "2. Penggunaan Data",
    blocks: [
      { type: "p", text: "Data Anda dipakai untuk:" },
      {
        type: "list",
        items: [
          "Menindaklanjuti dan memproses pengajuan pembiayaan Anda.",
          "Meneruskan pengajuan ke perusahaan pembiayaan (multifinance) mitra resmi berizin OJK — kami beri tahu dulu perusahaan mana sebelum data diteruskan.",
        ],
      },
      {
        type: "p",
        text: "Kami juga menggunakan sejumlah layanan teknologi tepercaya (Google Analytics dan Google reCAPTCHA) untuk memahami kunjungan situs dan mencegah pengisian formulir oleh robot.",
      },
    ],
  },
  {
    id: "3-keamanan-lokasi-penyimpanan",
    title: "3. Keamanan & Lokasi Penyimpanan",
    blocks: [
      {
        type: "p",
        text: "Data Anda disimpan pada layanan cloud tepercaya (Supabase dan Vercel) yang terenkripsi dan berstandar internasional.",
      },
      {
        type: "p",
        text: "Data dapat disimpan atau diproses menggunakan infrastruktur teknologi dan penyedia layanan yang berlokasi di Indonesia maupun di luar Indonesia. Kami menerapkan langkah perlindungan yang sesuai untuk menjaga keamanan dan kerahasiaan Data Pribadi serta memenuhi kewajiban yang berlaku berdasarkan peraturan perundang-undangan.",
      },
      {
        type: "p",
        text: "Kami tidak pernah menjual data Anda. Data pengajuan yang tidak berlanjut kami simpan 12 bulan sejak kontak terakhir; yang disetujui, kami simpan selama masa pembiayaan berjalan ditambah 6 bulan untuk keperluan arsip.",
      },
    ],
  },
  {
    id: "4-hak-dan-kontak-anda",
    title: "4. Hak dan Kontak Anda",
    blocks: [
      {
        type: "p",
        text: "Anda berhak mengetahui, memperbaiki, atau meminta penghapusan data Anda, serta menarik persetujuan kapan saja. Kami menanggapi permintaan Anda paling lambat 3x24 jam kerja. Kalau terjadi kebocoran data, kami berkomitmen memberi tahu Anda dan pihak berwenang paling lambat 3x24 jam.",
      },
      { type: "p", text: "Hubungi kami:" },
      {
        type: "lines",
        items: [
          "WhatsApp: 08136806248",
          "Email: mitrabertuah.id@gmail.com",
          "Alamat: Jl. Rajawali Sakti No. 2, Kel. Tobek Godang, Kec. Binawidya, Kota Pekanbaru, Riau",
        ],
      },
    ],
  },
];

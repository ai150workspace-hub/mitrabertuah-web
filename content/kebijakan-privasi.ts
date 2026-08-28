// Sumber teks: PROMPT_PRIVASI_mitrabertuah.md + KEBIJAKAN_PRIVASI_draft_v0.1.md
// (C:\CRM). Isi di bawah adalah transkripsi APA ADANYA dari dokumen sumber —
// tidak diringkas, tidak ditambah, tidak "diperbaiki". Penanda berkurung-dua
// (ISI: ... / TANYA PENGACARA: ...) SENGAJA dibiarkan utuh di dalam string
// data — lib/privacy-policy.ts memindainya dan mengunci halaman
// /kebijakan-privasi selama masih ada satu pun tersisa. Jangan mengisi
// penanda ini di sini — itu keputusan owner dan penasihat hukum, bukan
// Claude Code.
//
// Lampiran A (teks persetujuan checkbox) hidup di lib/consent.ts, bukan di
// sini — dipakai di tempat berbeda (form), bukan bagian isi kebijakan.
// Lampiran B (daftar periksa internal sebelum tayang) sengaja tidak
// ditranskripsi ke sini — itu checklist untuk owner/pengacara, bukan konten
// yang ditujukan untuk pengunjung situs.

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

export const RINGKASAN_SINGKAT: string[] = [
  "**Kami tidak meminta foto KTP atau BPKB di website ini.** Cukup nama, nomor HP, dan data kendaraan.",
  "**Kami tidak menjual data Anda.** Data Anda dipakai untuk satu hal: menindaklanjuti pengajuan Anda.",
  "**Kami meneruskannya ke perusahaan pembiayaan** yang berizin dan diawasi OJK — dan kami memberi tahu Anda perusahaan mana sebelum meneruskannya.",
  "**Anda bisa minta data Anda dihapus kapan saja**, cukup kirim pesan ke kami.",
  "**Kalau Anda minta berhenti dihubungi, kami simpan nomor Anda** justru supaya kami tidak menghubungi Anda lagi.",
];

export const PRIVACY_SECTIONS: PolicySection[] = [
  {
    id: "1-siapa-kami",
    title: "1. Siapa kami",
    blocks: [
      {
        type: "lines",
        items: [
          "Mitra Bertuah",
          "Alamat: Jl. Rajawali Sakti No. 2, Kel. Toek Godang, Kec. Binawidya, Kota Pekanbaru, Riau",
          "WhatsApp: 08136806248",
          "Email: mitrabertuah.id@gmail.com",
        ],
      },
      {
        type: "p",
        text: "Kami bertindak sebagai **pengendali data pribadi** atas informasi yang Anda berikan melalui situs ini, sebagaimana dimaksud dalam Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.",
      },
      {
        type: "p",
        text: "Mitra Bertuah **bukan** perusahaan pembiayaan dan **bukan** pemberi pinjaman. Kami adalah mitra pemasaran yang meneruskan pengajuan kepada perusahaan pembiayaan berizin dan diawasi Otoritas Jasa Keuangan.",
      },
      {
        type: "p",
        text: "Layanan ini ditujukan untuk orang dewasa. Kami tidak dengan sengaja mengumpulkan data pribadi anak.",
      },
    ],
  },
  {
    id: "2-data-yang-kami-kumpulkan",
    title: "2. Data yang kami kumpulkan",
    blocks: [
      { type: "p", text: "**Yang Anda isi sendiri di formulir:**" },
      {
        type: "list",
        items: [
          "Nama lengkap",
          "Nomor handphone / WhatsApp",
          "Jenis kendaraan, tahun kendaraan, merek dan tipe",
          "Kota dan kecamatan domisili",
          "Keperluan dana dan catatan tambahan, jika Anda mengisinya",
        ],
      },
      {
        type: "p",
        text: "Kami **tidak** meminta dan **tidak** menerima foto KTP, BPKB, STNK, atau nomor identitas melalui situs ini. Dokumen hanya diserahkan lewat WhatsApp atau langsung di kantor, setelah pengajuan Anda ditindaklanjuti.",
      },
      { type: "p", text: "**Yang terekam otomatis saat Anda mengisi formulir:**" },
      {
        type: "list",
        items: [
          "Sumber kunjungan Anda (misalnya dari pencarian Google atau iklan), termasuk parameter penanda kampanye",
          "Halaman yang Anda buka sebelum mengisi formulir",
          "Jenis perangkat dan peramban yang Anda pakai",
          "Bentuk teracak dari alamat IP Anda, untuk mencegah penyalahgunaan formulir",
          "Catatan bahwa Anda memberi persetujuan, beserta waktu dan versi teks persetujuannya",
        ],
      },
      { type: "p", text: "**Yang dikumpulkan layanan pihak ketiga:** lihat bagian 6." },
    ],
  },
  {
    id: "3-untuk-apa-data-anda-dipakai",
    title: "3. Untuk apa data Anda dipakai",
    blocks: [
      {
        type: "list",
        items: [
          "Menilai kelayakan awal kendaraan Anda untuk diajukan ke perusahaan pembiayaan.",
          "Menghubungi Anda kembali untuk menindaklanjuti pengajuan.",
          "Meneruskan pengajuan Anda kepada perusahaan pembiayaan mitra.",
          "Memahami dari mana pengunjung situs kami berasal, agar layanan kami lebih tepat sasaran.",
          "Mencegah penyalahgunaan formulir, seperti pengiriman otomatis oleh robot.",
        ],
      },
      {
        type: "p",
        text: "**Dasar hukum pemrosesan:** persetujuan yang Anda berikan saat mencentang kotak persetujuan di formulir.",
      },
      {
        type: "p",
        text: "[[TANYA PENGACARA: apakah persetujuan cukup sebagai satu-satunya dasar hukum untuk seluruh tujuan di atas, atau sebagian lebih tepat memakai dasar lain seperti kepentingan yang sah — khususnya untuk pencegahan penyalahgunaan dan untuk daftar jangan-hubungi di bagian 5?]]",
      },
    ],
  },
  {
    id: "4-kepada-siapa-data-anda-diberikan",
    title: "4. Kepada siapa data Anda diberikan",
    blocks: [
      {
        type: "p",
        text: "**a. Perusahaan pembiayaan mitra.** Pengajuan Anda diteruskan kepada satu atau lebih perusahaan pembiayaan yang berizin dan diawasi OJK, dipilih berdasarkan kecocokan kendaraan dan wilayah Anda. Sebelum meneruskan, kami memberi tahu Anda perusahaan mana yang dituju.",
      },
      {
        type: "p",
        text: "Setelah data Anda berada di tangan mereka, pemrosesan selanjutnya tunduk pada kebijakan privasi masing-masing perusahaan tersebut.",
      },
      {
        type: "p",
        text: "[[TANYA PENGACARA: apakah nama-nama perusahaan pembiayaan mitra wajib dicantumkan di kebijakan ini, atau cukup diberitahukan kepada calon nasabah sebelum data diteruskan? Kami belum memiliki izin tertulis dari mitra untuk mencantumkan nama mereka di materi pemasaran.]]",
      },
      {
        type: "p",
        text: "**b. Penyedia layanan teknis yang kami gunakan.** Mereka memproses data atas nama kami, bukan untuk kepentingan mereka sendiri:",
      },
      {
        type: "table",
        headers: ["Penyedia", "Untuk apa"],
        rows: [
          ["Supabase", "penyimpanan basis data"],
          ["Vercel", "tempat situs ini dijalankan"],
          ["Google Analytics", "statistik kunjungan situs"],
          ["Google reCAPTCHA", "mencegah pengiriman formulir oleh robot"],
          [
            "[[ISI: penyedia notifikasi WhatsApp atau email, kalau sudah dipakai]]",
            "mengirim pemberitahuan lead baru kepada tim kami",
          ],
        ],
      },
      {
        type: "p",
        text: "**c. Kami tidak menjual data Anda**, dan tidak membagikannya kepada pihak lain di luar yang disebut di atas, kecuali diwajibkan oleh hukum atau permintaan resmi dari otoritas yang berwenang.",
      },
      { type: "p", text: "**d. Penyimpanan di luar wilayah Indonesia.**" },
      {
        type: "p",
        text: "[[ISI: cek region project Supabase dan Vercel. Kalau berada di luar Indonesia — Singapura adalah pengaturan bawaan yang paling umum — tulis terus terang bahwa data disimpan di negara tersebut.]]",
      },
      {
        type: "p",
        text: "[[TANYA PENGACARA: apa yang harus kami penuhi berdasarkan ketentuan transfer data lintas negara dalam UU PDP, dan bagaimana kalimatnya harus ditulis di sini?]]",
      },
    ],
  },
  {
    id: "5-berapa-lama-data-disimpan",
    title: "5. Berapa lama data disimpan",
    blocks: [
      {
        type: "table",
        headers: ["Jenis data", "Lama penyimpanan"],
        rows: [
          [
            "Pengajuan yang tidak dilanjutkan atau tidak disetujui",
            "12 bulan sejak kontak terakhir",
          ],
          [
            "Pengajuan yang diteruskan dan disetujui",
            "Selama masa pembiayaan berjalan, ditambah [[TANYA PENGACARA: berapa lama setelahnya yang wajar dan sesuai ketentuan, untuk keperluan koordinasi dan penyelesaian sengketa?]]",
          ],
          [
            "Nomor yang meminta untuk tidak dihubungi lagi",
            "Disimpan tanpa batas waktu, **khusus** agar kami tidak menghubungi Anda kembali",
          ],
          ["Catatan persetujuan", "Selama data pokoknya masih disimpan"],
        ],
      },
      {
        type: "p",
        text: "**Tentang daftar jangan-hubungi.** Kalau Anda meminta untuk tidak dihubungi lagi, kami menyimpan nomor Anda **justru untuk menghormati permintaan itu**. Tanpa catatan tersebut, nomor Anda bisa masuk kembali ke sistem kami dan Anda dihubungi lagi. Yang kami simpan hanya nomor telepon dan alasan permintaannya, tidak lebih.",
      },
      {
        type: "p",
        text: "**Data statistik agregat.** Setelah data pribadi Anda dihapus, kami dapat tetap menyimpan angka statistik gabungan — misalnya berapa persen pengajuan yang tidak memenuhi syarat karena usia kendaraan. Data seperti ini **tidak lagi dapat digunakan untuk mengenali Anda**.",
      },
    ],
  },
  {
    id: "6-cookie-dan-layanan-analitik",
    title: "6. Cookie dan layanan analitik",
    blocks: [
      {
        type: "p",
        text: "Situs ini menggunakan Google Analytics untuk memahami jumlah dan asal pengunjung, serta Google reCAPTCHA untuk mencegah pengiriman formulir oleh robot. Keduanya dapat menempatkan penanda di peramban Anda dan menerima informasi teknis mengenai kunjungan Anda.",
      },
      {
        type: "p",
        text: "Anda dapat menonaktifkan cookie melalui pengaturan peramban. Menonaktifkannya tidak menghalangi Anda menggunakan situs ini.",
      },
      {
        type: "p",
        text: "[[TANYA PENGACARA: apakah UU PDP mewajibkan kami meminta persetujuan terpisah sebelum mengaktifkan Google Analytics dan reCAPTCHA — yaitu banner cookie — atau cukup pemberitahuan seperti di atas?]]",
      },
    ],
  },
  {
    id: "7-hak-anda",
    title: "7. Hak Anda",
    blocks: [
      { type: "p", text: "Berdasarkan UU PDP, Anda berhak untuk:" },
      {
        type: "list",
        items: [
          "mengetahui data apa yang kami simpan tentang Anda, dan memperoleh salinannya;",
          "memperbaiki data yang keliru atau tidak lengkap;",
          "meminta data Anda dihapus;",
          "menarik persetujuan yang pernah Anda berikan, kapan saja;",
          "membatasi atau menolak pemrosesan tertentu;",
          "mengajukan keberatan atau keluhan.",
        ],
      },
      {
        type: "p",
        text: "[[TANYA PENGACARA: apakah daftar hak di atas sudah lengkap dan sesuai rumusan UU PDP, dan adakah hak lain yang wajib disebut?]]",
      },
      {
        type: "p",
        text: "**Menarik persetujuan tidak berlaku surut** terhadap pemrosesan yang sudah terjadi sebelumnya. Kalau pengajuan Anda sudah diteruskan ke perusahaan pembiayaan, Anda perlu menghubungi mereka secara terpisah untuk data yang ada di sisi mereka.",
      },
    ],
  },
  {
    id: "8-cara-menggunakan-hak-anda",
    title: "8. Cara menggunakan hak Anda",
    blocks: [
      { type: "p", text: "Hubungi kami melalui:" },
      {
        type: "list",
        items: ["Email: mitrabertuah.id@gmail.com", "WhatsApp: 08136806248"],
      },
      {
        type: "p",
        text: "Kami akan menanggapi paling lambat [[TANYA PENGACARA: UU PDP mengatur batas waktu tanggapan atas permintaan subjek data. Berapa batas itu, dan pastikan angka yang kami tulis di sini tidak lebih lama daripada yang diwajibkan.]] sejak permintaan kami terima dan identitas Anda dapat kami pastikan.",
      },
      {
        type: "p",
        text: "Kami mungkin meminta Anda memastikan identitas terlebih dahulu, agar data Anda tidak dihapus atau dibuka oleh orang lain.",
      },
    ],
  },
  {
    id: "9-keamanan-data",
    title: "9. Keamanan data",
    blocks: [
      {
        type: "p",
        text: "Akses ke basis data kami dibatasi hanya untuk petugas yang berwenang dan dilindungi kata sandi. Data dikirim melalui koneksi terenkripsi. Formulir di situs ini tidak menerima unggahan dokumen identitas.",
      },
      {
        type: "p",
        text: "Tidak ada sistem yang sepenuhnya kebal. Kalau terjadi kebocoran data pribadi, kami akan memberitahukan Anda dan pihak berwenang sesuai ketentuan yang berlaku.",
      },
      {
        type: "p",
        text: "[[TANYA PENGACARA: apa kewajiban pemberitahuan kebocoran data menurut UU PDP — kepada siapa, dalam berapa lama — dan bagaimana kalimatnya sebaiknya ditulis?]]",
      },
    ],
  },
  {
    id: "10-perubahan-kebijakan-ini",
    title: "10. Perubahan kebijakan ini",
    blocks: [
      {
        type: "p",
        text: "Kebijakan ini dapat kami perbarui. Setiap versi memiliki nomor dan tanggal berlaku yang tercantum di bagian atas halaman. Perubahan yang bersifat mendasar akan kami beritahukan melalui situs ini.",
      },
    ],
  },
];

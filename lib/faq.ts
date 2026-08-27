// Data FAQ terpisah dari komponen tampilannya supaya JSON-LD FAQPage
// (Fase 5) bisa memakai teks yang PERSIS SAMA — §11 mewajibkan itu.
//
// Enam pertanyaan pertama bukan tebakan: itu daftar yang dipasang
// kompetitor nasional (taktis.co.id), berarti sudah tervalidasi sebagai
// keberatan nyata pembeli (§6.6). Item "Siapa kami?" memakai fallback
// netral (bukan placeholder mentah) sampai identitas & status badan
// usaha dikonfirmasi pemilik (§1) — redesign brief §5: placeholder
// tidak boleh tampil ke pengunjung.
import { siteConfig, displayOfficeAddress, displayBusinessEntity } from "@/lib/site-config";

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Apakah kendaraan saya masih bisa dipakai setelah BPKB dijaminkan?",
    answer:
      "Bisa. Yang dijaminkan hanya dokumen BPKB-nya — kendaraan tetap ada di tangan Anda dan bisa dipakai seperti biasa selama masa pembiayaan berjalan.",
  },
  {
    question: "Berapa dana yang bisa saya terima?",
    answer:
      "Besarannya ditentukan dari taksiran perusahaan pembiayaan atas kondisi kendaraan Anda, bukan dari harga pasaran (mis. harga di OLX). Taksiran leasing biasanya lebih konservatif — kami jelaskan perkiraan rentangnya sebelum Anda memutuskan lanjut.",
  },
  {
    question: "Dokumen apa yang dibutuhkan?",
    answer:
      "Umumnya KTP, Kartu Keluarga, BPKB asli, dan STNK aktif. Dokumen tambahan bisa diminta tergantung kebijakan perusahaan pembiayaan. Dokumen tidak diunggah lewat website — semua diserahkan langsung lewat WhatsApp atau tatap muka setelah Anda lolos kualifikasi awal.",
  },
  {
    question: "Berapa lama prosesnya?",
    answer:
      "Yang bisa kami janjikan hanya bagian yang kami kendalikan: berkas Anda kami teruskan ke perusahaan pembiayaan di hari yang sama. Lama proses setelah itu — survei, verifikasi, sampai pencairan — sepenuhnya di tangan perusahaan pembiayaan, jadi kami tidak menjanjikan tanggal cair.",
  },
  {
    question: "Apa itu pembiayaan multiguna jaminan BPKB?",
    answer:
      "Pembiayaan multiguna jaminan BPKB adalah pinjaman dana dari perusahaan pembiayaan berizin OJK dengan jaminan berupa BPKB kendaraan bermotor (mobil atau motor). Kendaraannya sendiri tetap dipakai pemiliknya — berbeda dengan gadai barang pada umumnya.",
  },
  {
    question: "Siapa kami?",
    answer: `${siteConfig.brandName} — ${displayBusinessEntity()}. Kantor kami di ${displayOfficeAddress()}.`,
  },
  {
    question: "Apakah saya dikenakan biaya?",
    answer:
      "Tidak. Komisi kami dibayar oleh perusahaan pembiayaan, bukan oleh Anda.",
  },
  {
    question: "Bagaimana kalau pengajuan saya ditolak?",
    answer:
      "Penyebab paling umum pengajuan tidak lolos: BPKB masih dalam status kredit/belum lunas, BPKB bukan atas nama sendiri atau keluarga, kendaraan terlalu tua untuk kategori yang diajukan, atau pajak kendaraan mati. Kami cek dulu kondisi ini di awal supaya Anda tidak kehilangan waktu untuk pengajuan yang kemungkinan besar tidak lolos.",
  },
  {
    question: "Wilayah mana saja yang dilayani?",
    answer:
      "Layanan utama kami Pekanbaru dan sekitarnya. Untuk wilayah lain di Riau, hubungi kami dulu untuk mengecek ketersediaan survei di lokasi Anda.",
  },
];

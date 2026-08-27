// Teks persetujuan checkbox form — diambil APA ADANYA dari Lampiran A,
// PROMPT_PRIVASI_mitrabertuah.md / KEBIJAKAN_PRIVASI_draft_v0.1.md (C:\CRM).
// "Kebijakan Privasi" di Lampiran A adalah tautan, bukan bagian kalimat —
// dirender terpisah di LeadForm.tsx, bukan digabung ke string ini, supaya
// teks yang tersimpan sebagai consent_text_version tetap persis satu
// kalimat sesuai aturan Lampiran A ("jangan menambah klausul").
// Kalau kalimat ini berubah lagi nanti (mis. setelah penasihat hukum
// menjawab pertanyaan soal kecukupan kalimat ini di dokumen sumber),
// versinya WAJIB naik — baris yang sudah tersimpan di database tetap
// memakai versi lama, itu sebabnya riwayatnya tidak pernah ditimpa.
export const CONSENT_TEXT_VERSION = "1.0";

export const CONSENT_TEXT =
  "Saya setuju data saya digunakan untuk menindaklanjuti pengajuan ini dan " +
  "diteruskan ke perusahaan pembiayaan mitra.";

// Nomor versi & tanggal berlaku DOKUMEN kebijakan privasi (bukan versi teks
// checkbox di atas — dua hal berbeda, lihat Lampiran A). Satu-satunya
// tempat nilai ini didefinisikan; app/kebijakan-privasi/page.tsx membaca
// dari sini, tidak menulis ulang. POLICY_EFFECTIVE_DATE sengaja dibiarkan
// sebagai placeholder berkurung-dua — lib/privacy-policy.ts memindai nilai
// ini juga, jadi halaman tidak akan tayang selama owner belum mengisi
// tanggal publikasi sungguhan.
export const POLICY_VERSION = "1.0";
export const POLICY_EFFECTIVE_DATE = "[[ISI: tanggal publikasi]]";

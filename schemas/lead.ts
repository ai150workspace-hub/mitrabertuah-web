import { z } from "zod";
import { normalizePhoneLocal } from "@/lib/phone";

// Opsi ini dipakai dua tempat: grid ikon "kebutuhan dana untuk apa" (§6.3)
// dan dropdown di form (§8) — supaya keduanya selalu sinkron.
export const KEPERLUAN_DANA_OPTIONS = [
  "Modal usaha",
  "Biaya pendidikan",
  "Renovasi rumah",
  "Kebutuhan mendesak",
] as const;

const TAHUN_MIN = 1990;
const TAHUN_MAX = 2030; // sama dengan check constraint contacts.tahun di bertuah-crm

// Skema form pengajuan (§8). Dipakai di klien (react-hook-form) dan
// divalidasi ulang di server action — jangan pernah percaya validasi
// klien saja, request bisa dikirim langsung tanpa lewat form.
export const leadFormSchema = z.object({
  nama: z.string().trim().min(3, "Nama minimal 3 karakter").max(120),
  noHp: z
    .string()
    .trim()
    .min(9, "Nomor HP tidak valid")
    .refine((v) => normalizePhoneLocal(v) !== null, "Nomor HP tidak valid"),
  jenisKendaraan: z.enum(["Mobil", "Motor"], {
    message: "Pilih jenis kendaraan",
  }),
  tahunKendaraan: z.coerce
    .number()
    .int()
    .min(TAHUN_MIN, `Tahun minimal ${TAHUN_MIN}`)
    .max(TAHUN_MAX, `Tahun maksimal ${TAHUN_MAX}`),
  merkTipe: z.string().trim().max(120).optional().or(z.literal("")),
  domisiliKota: z.string().trim().min(2, "Kota wajib diisi").max(120).default("Pekanbaru"),
  kecamatan: z.string().trim().max(120).optional().or(z.literal("")),
  keperluanDana: z.enum(KEPERLUAN_DANA_OPTIONS).optional(),
  catatan: z.string().trim().max(1000).optional().or(z.literal("")),
  // Hasil kalkulator (§7), kalau pengunjung memakainya sebelum mengisi
  // form. Tidak wajib — kalkulator dan form dua interaksi terpisah.
  estimasiNilaiKendaraan: z.coerce.number().int().positive().optional(),
  tenorDimintaBulan: z.coerce.number().int().positive().optional(),
  // boolean (bukan z.literal(true)) supaya tipe input mentah tetap
  // menerima `false` sebagai nilai awal checkbox yang belum dicentang.
  consentGiven: z.boolean().refine((v) => v === true, {
    message: "Anda harus menyetujui penggunaan data untuk melanjutkan",
  }),
  // Honeypot — field tersembunyi di UI, bot yang mengisi form otomatis
  // biasanya mengisi semua field yang ada di DOM. SENGAJA tidak dibatasi
  // panjangnya di sini: kalau divalidasi ketat, bot yang mengisinya dapat
  // pesan error zod yang membocorkan bahwa field ini "dipagari" — bukan
  // balasan sukses palsu yang diam-diam. Pengecekan isi field ini
  // dilakukan di server action (submitLead), bukan di skema. Lihat §9.
  website: z.string().optional(),
});

// Tipe MENTAH (sebelum z.coerce mengubah string jadi number) — dipakai
// react-hook-form dan sebagai bentuk yang benar-benar dikirim ke server
// action. Validasi ulang di server (leadFormSchema.safeParse) yang
// menghasilkan tipe ter-coerce, bukan tipe form itu sendiri.
export type LeadFormInput = z.input<typeof leadFormSchema>;

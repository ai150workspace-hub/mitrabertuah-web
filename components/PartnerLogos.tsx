import Image from "next/image";
import { MITRA } from "@/lib/mitra";

// Section ini PENGECUALIAN eksplisit dari "Aturan Mutlak #7" (lihat
// lib/mitra.ts) — nama & logo mitra sengaja DITAMPILKAN di sini atas
// izin owner. Judul & teks kecil di bawah baris logo pakai kata-kata
// PERSIS dari PROMPT_LOGO_MITRA_mitrabertuah.md §4 — jangan diparafrase,
// itu yang membedakan "kami agen mereka" dari kesan "mereka mitra kami".
export function PartnerLogos() {
  if (MITRA.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center">
        Kami mitra pemasaran resmi dari perusahaan pembiayaan berikut
      </h2>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {MITRA.map((m) => (
          // Rasio tiap logo beda-beda (Adira lebar ~2.7:1, BFI persegi,
          // ACC malah lebih tinggi dari lebar) - pakai `fill` + object-contain
          // di dalam box tinggi tetap, bukan width/height tetap di Image itu
          // sendiri, supaya tidak ada yang gepeng/melar.
          <div key={m.id} className="relative h-8 w-32 sm:h-10 sm:w-40">
            <Image src={m.logoFile} alt={m.namaResmi} fill sizes="160px" className="object-contain" />
          </div>
        ))}
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground">
        Logo dan merek di atas milik masing-masing perusahaan. Mitra Bertuah adalah mitra
        pemasaran terdaftar — bukan cabang, perwakilan, atau bagian dari perusahaan-perusahaan
        tersebut.
      </p>
    </section>
  );
}

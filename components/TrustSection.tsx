import Link from "next/link";
import { ShieldCheck, MapPin, BadgeCheck, ImageOff } from "lucide-react";
import { displayOfficeAddress, displayBusinessEntity } from "@/lib/site-config";

// Alamat & status badan usaha asli SENGAJA menunggu owner (§1) — yang
// tampil di bawah adalah fallback netral (lib/site-config.ts), bukan
// karangan. Jangan ganti tanpa konfirmasi eksplisit.
// TODO: menunggu teks final dari owner (alamat lengkap, status badan usaha).
export function TrustSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center">Kepercayaan &amp; Transparansi</h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
          <ShieldCheck className="size-7 text-primary" />
          <p className="mt-4 font-medium">
            Kami tidak memungut biaya apa pun dari Anda. Komisi kami dibayar oleh
            perusahaan pembiayaan.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md p-6">
          <MapPin className="size-7 text-primary" />
          <p className="mt-4 font-medium">Kantor kami di Pekanbaru</p>
          <p className="mt-1 text-sm text-muted-foreground">{displayOfficeAddress()}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md p-6">
          <BadgeCheck className="size-7 text-primary" />
          <p className="mt-4 font-medium">Status keagenan resmi</p>
          <p className="mt-1 text-sm text-muted-foreground">{displayBusinessEntity()}</p>
        </div>
      </div>

      {/* Slot foto kantor/tim — TODO: ganti dengan foto asli begitu ada.
          SENGAJA bukan foto stok orang lain (redesign brief: itu jenis
          kepalsuan yang sama dengan testimoni palsu). */}
      <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-10 text-center">
        <ImageOff className="size-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Foto kantor &amp; tim segera hadir</p>
      </div>

      <div className="mt-8 space-y-2 text-center">
        <p className="text-sm text-muted-foreground">
          Mitra Bertuah bukan perusahaan pembiayaan dan bukan pemberi pinjaman. Keputusan
          akhir persetujuan dan besaran pencairan sepenuhnya ada pada perusahaan
          pembiayaan.
        </p>
        <Link href="/kebijakan-privasi" className="inline-block text-sm font-medium text-primary hover:underline">
          Baca Kebijakan Privasi
        </Link>
      </div>
    </section>
  );
}

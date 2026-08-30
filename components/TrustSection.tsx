import Link from "next/link";
import { ShieldCheck, MapPin, BadgeCheck } from "lucide-react";
import { displayOfficeAddress, displayBusinessEntity } from "@/lib/site-config";
import { MapEmbed } from "@/components/MapEmbed";

// Status badan usaha resmi (bentuk CV/PT/perorangan) SENGAJA masih
// menunggu owner (§1) — displayBusinessEntity() sudah punya fallback
// netral sendiri. Alamat kantor sudah dikonfirmasi (lib/site-config.ts).
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
          {/* PROMPT_NARASI_KANTOR §3 — alamat tetap tampil sebagai bukti
              bisnis ini nyata, bukan ajakan datang. Kalimat ini yang
              mengubah alamat dari sekadar info jadi alasan percaya. */}
          <p className="mt-3 text-sm text-muted-foreground">
            Anda tidak perlu datang ke kantor kami — survei dilakukan di rumah
            atau tempat usaha Anda oleh petugas perusahaan pembiayaan. Alamat
            ini kami cantumkan supaya Anda bisa memastikan bahwa kami nyata
            dan bisa dihubungi.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md p-6">
          <BadgeCheck className="size-7 text-primary" />
          <p className="mt-4 font-medium">Status keagenan resmi</p>
          <p className="mt-1 text-sm text-muted-foreground">{displayBusinessEntity()}</p>
        </div>
      </div>

      {/* Peta lokasi kantor (PROMPT_PETA_mitrabertuah.md) — menggantikan
          placeholder "Foto kantor & tim segera hadir". Alamat teks di
          kartu kedua grid di atas TETAP ada — peta melengkapi, bukan
          menggantikan. */}
      <MapEmbed />

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

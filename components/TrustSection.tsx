import { ShieldCheck, MapPin, BadgeCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

// Alamat, status badan usaha, dan kalimat status keagenan resmi
// SENGAJA placeholder — keputusan terbuka pemilik (§1), lihat
// lib/site-config.ts. Jangan ganti tanpa konfirmasi eksplisit.
export function TrustSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center">Kenapa Percaya Kami</h2>

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
          <p className="mt-1 text-sm text-muted-foreground">{siteConfig.officeAddress}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md p-6">
          <BadgeCheck className="size-7 text-primary" />
          <p className="mt-4 font-medium">Status keagenan resmi</p>
          <p className="mt-1 text-sm text-muted-foreground">{siteConfig.businessEntity}</p>
        </div>
      </div>
    </section>
  );
}

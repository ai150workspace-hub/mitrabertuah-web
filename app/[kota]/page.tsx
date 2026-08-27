import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { KOTA_WHITELIST, getKotaBySlug } from "@/lib/kota";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { TrustSection } from "@/components/TrustSection";
import { LeadFormSection } from "@/components/LeadFormSection";
import { FaqSection } from "@/components/FaqSection";
import { FaqJsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";

// dynamicParams = false MENGUNCI whitelist ini secara teknis, bukan cuma
// dokumentasi — kota di luar daftar akan 404, TIDAK dirender dinamis.
// Lihat §12.3: halaman kota hanya untuk cabang yang terverifikasi.
export function generateStaticParams() {
  return KOTA_WHITELIST.map((k) => ({ kota: k.slug }));
}
export const dynamicParams = false;

type Params = Promise<{ kota: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { kota } = await params;
  const info = getKotaBySlug(kota);
  if (!info) return {};

  return {
    title: `Gadai BPKB Mobil & Motor di ${info.nama} — ${siteConfig.brandName}`,
    description: `Pengajuan pembiayaan jaminan BPKB mobil dan motor di ${info.nama}, diproses lewat mitra resmi perusahaan pembiayaan berizin OJK.`,
  };
}

export default async function KotaPage({ params }: { params: Params }) {
  const { kota } = await params;
  const info = getKotaBySlug(kota);
  if (!info) notFound();

  return (
    <>
      <FaqJsonLd />
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/8 via-primary/5 to-background">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-balance">
            Gadai BPKB Mobil &amp; Motor di {info.nama}
          </h1>

          {/* "kami mitra resmi, cabangnya ada di sini" — BUKAN pitch
              perbandingan 5 mitra ala homepage. Kota ini baru punya SATU
              mitra terverifikasi (§12.3). Nama mitra tidak disebut (Aturan
              Mutlak #7). */}
          <p className="mt-6 text-lg text-muted-foreground text-balance">
            Kami mitra resmi salah satu perusahaan pembiayaan berizin OJK yang
            cabangnya melayani {info.nama}. Tim kami di Pekanbaru mendampingi
            Anda sampai proses survei kendaraan selesai.
          </p>

          <div className="mt-8 flex justify-center">
            <WhatsAppButton
              positionCode={`[WEB-KOTA-${info.slug.toUpperCase()}]`}
              label="Chat WhatsApp Sekarang"
            />
          </div>

          <div className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            Melayani {info.nama} dan sekitarnya
          </div>
        </div>
      </section>

      <TrustSection />
      <LeadFormSection defaultKota={info.nama} />
      <FaqSection />
    </>
  );
}

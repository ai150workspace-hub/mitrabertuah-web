import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/HeroSection";
import { ProcessSteps } from "@/components/ProcessSteps";
import { KenapaMitraBertuah } from "@/components/KenapaMitraBertuah";
import { PartnerLogos } from "@/components/PartnerLogos";
import { TrustSection } from "@/components/TrustSection";
import { LeadFormSection } from "@/components/LeadFormSection";
import { FaqSection } from "@/components/FaqSection";
import { CtaPenutup } from "@/components/CtaPenutup";
import { RecentArticles } from "@/components/RecentArticles";
import { FaqJsonLd } from "@/components/JsonLd";

// JourneyKelayakan di-code-split (bukan di-nonaktifkan SSR-nya — tetap
// server-rendered untuk konten & SEO, cuma JS-nya dipecah jadi chunk
// terpisah) supaya tidak ikut membengkakkan bundle JS yang wajib
// dieksekusi sebelum halaman interaktif. Ditemukan lewat pengukuran
// Lighthouse production sungguhan (skor turun 84->66 sebelum perbaikan
// ini), bukan dugaan.
// PROMPT_CANONICAL_mitrabertuah.md — path relatif, dilengkapi jadi URL
// absolut oleh metadataBase (app/layout.tsx).
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const JourneyKelayakan = dynamic(() =>
  import("@/components/JourneyKelayakan").then((m) => m.JourneyKelayakan)
);

// Arsitektur informasi redesign brief: Hero -> Journey -> CaraKerjanya ->
// KenapaMitraBertuah -> PartnerLogos -> Kepercayaan (di atas form) -> Form ->
// FAQ -> CtaPenutup -> RecentArticles (tetap ada, otomatis kosong sampai
// artikel pertama terbit). NeedsSection dihapus — di luar IA baru.
// PartnerLogos ditambahkan sesuai PROMPT_LOGO_MITRA_mitrabertuah.md —
// posisinya persis di antara KenapaMitraBertuah dan Kepercayaan (§3).
export default function HomePage() {
  return (
    <>
      <FaqJsonLd />
      <HeroSection />
      <JourneyKelayakan />
      <ProcessSteps />
      <KenapaMitraBertuah />
      <PartnerLogos />
      <TrustSection />
      <LeadFormSection />
      <FaqSection />
      <CtaPenutup />
      <RecentArticles />
    </>
  );
}

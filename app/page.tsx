import dynamic from "next/dynamic";
import { HeroSection } from "@/components/HeroSection";
import { ProcessSteps } from "@/components/ProcessSteps";
import { KenapaMitraBertuah } from "@/components/KenapaMitraBertuah";
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
const JourneyKelayakan = dynamic(() =>
  import("@/components/JourneyKelayakan").then((m) => m.JourneyKelayakan)
);

// Arsitektur informasi redesign brief: Hero -> Journey -> CaraKerjanya ->
// KenapaMitraBertuah -> Kepercayaan (di atas form) -> Form -> FAQ ->
// CtaPenutup -> RecentArticles (tetap ada, otomatis kosong sampai artikel
// pertama terbit). NeedsSection dihapus — di luar IA baru.
export default function HomePage() {
  return (
    <>
      <FaqJsonLd />
      <HeroSection />
      <JourneyKelayakan />
      <ProcessSteps />
      <KenapaMitraBertuah />
      <TrustSection />
      <LeadFormSection />
      <FaqSection />
      <CtaPenutup />
      <RecentArticles />
    </>
  );
}

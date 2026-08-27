import { HeroSection } from "@/components/HeroSection";
import { JourneyKelayakan } from "@/components/JourneyKelayakan";
import { ProcessSteps } from "@/components/ProcessSteps";
import { KenapaMitraBertuah } from "@/components/KenapaMitraBertuah";
import { TrustSection } from "@/components/TrustSection";
import { LeadFormSection } from "@/components/LeadFormSection";
import { FaqSection } from "@/components/FaqSection";
import { CtaPenutup } from "@/components/CtaPenutup";
import { RecentArticles } from "@/components/RecentArticles";
import { FaqJsonLd } from "@/components/JsonLd";

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

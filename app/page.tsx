import { HeroSection } from "@/components/HeroSection";
import { EstimasiPlafon } from "@/components/EstimasiPlafon";
import { LeadFormSection } from "@/components/LeadFormSection";
import { NeedsSection } from "@/components/NeedsSection";
import { ProcessSteps } from "@/components/ProcessSteps";
import { TrustSection } from "@/components/TrustSection";
import { FaqSection } from "@/components/FaqSection";
import { RecentArticles } from "@/components/RecentArticles";
import { FaqJsonLd } from "@/components/JsonLd";

export default function HomePage() {
  return (
    <>
      <FaqJsonLd />
      <HeroSection />
      <EstimasiPlafon />
      <LeadFormSection />
      <NeedsSection />
      <ProcessSteps />
      <TrustSection />
      <FaqSection />
      <RecentArticles />
    </>
  );
}

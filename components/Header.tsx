import Link from "next/link";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/lib/site-config";

// Navbar sticky ala Carmoola: wordmark brand di kiri, CTA utama di kanan.
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-heading text-xl font-extrabold text-primary">
          {siteConfig.brandName}
        </Link>

        <WhatsAppButton
          positionCode="[WEB-NAVBAR]"
          label="Chat WhatsApp"
          size="default"
          className="hidden sm:inline-flex"
        />
      </div>
    </header>
  );
}

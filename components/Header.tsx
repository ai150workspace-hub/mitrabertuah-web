import Link from "next/link";
import Image from "next/image";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/lib/site-config";

// Navbar sticky ala Carmoola: logo + wordmark brand di kiri, CTA utama di
// kanan.
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="" width={32} height={32} className="size-8 rounded-lg" />
          <span className="font-heading text-xl font-extrabold text-primary">
            {siteConfig.brandName}
          </span>
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

import { MapPin, Users } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { HeroIllustration } from "@/components/HeroIllustration";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/8 via-primary/5 to-background">
      {/* Blob dekoratif lembut — kehangatan visual ala Carmoola/AutoPay,
          tanpa foto tim/kantor yang belum ada (§6.5, belum ada papan nama). */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-whatsapp/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-balance">
            Gadai BPKB Mobil &amp; Motor di Pekanbaru — Pengajuan ke
            Multifinance Berizin OJK
          </h1>

          <p className="mt-6 text-lg text-muted-foreground text-balance">
            Kantor kami ada di Pekanbaru — bisa didatangi langsung, dan kami
            dampingi Anda sampai proses survei kendaraan selesai.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            <Users className="size-4 text-primary" />
            Pengajuan Anda kami bandingkan ke {siteConfig.partnerCount} perusahaan
            pembiayaan berizin OJK dari kelompok berbeda sekaligus, supaya peluang
            disetujui lebih besar.
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <WhatsAppButton positionCode="[WEB-HERO]" label="Chat WhatsApp Sekarang" />
            <a href="#pengajuan" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}>
              Isi Form Pengajuan
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground lg:justify-start">
            <MapPin className="size-4" />
            Melayani Pekanbaru dan sekitarnya
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}

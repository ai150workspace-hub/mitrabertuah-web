import { MapPin, ShieldCheck, Car, Users } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

// Layout editorial, bukan grid kartu kecil (redesign brief) — 4 poin
// diferensiator dari brief §"APA YANG SEBENARNYA KITA JUAL". Poin 1 & 2
// dapat porsi visual terbesar — itu yang membedakan kami dari agregator
// nasional (kehadiran lokal, tanpa biaya di muka).
export function KenapaMitraBertuah() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="font-heading text-2xl font-bold sm:text-3xl">Kenapa Mitra Bertuah</h2>

      <div className="mt-10 space-y-8">
        <div className="flex items-start gap-4">
          <MapPin className="mt-1 size-8 shrink-0 text-primary" />
          <p className="font-heading text-2xl font-bold sm:text-3xl">
            Kami di Pekanbaru, bukan agen jarak jauh. Survei datang ke Anda,
            bukan sebaliknya.
          </p>
        </div>

        <div className="flex items-start gap-4">
          <ShieldCheck className="mt-1 size-8 shrink-0 text-primary" />
          <p className="font-heading text-2xl font-bold sm:text-3xl">
            Kami tidak memungut biaya apa pun dari Anda.
          </p>
        </div>

        <div className="flex items-start gap-3 border-t border-border pt-8">
          <Car className="mt-1 size-6 shrink-0 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">
            Kendaraan Anda tetap dipakai — hanya BPKB yang dijaminkan.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Users className="mt-1 size-6 shrink-0 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">
            Kami bandingkan ke {siteConfig.partnerCount} perusahaan pembiayaan berizin OJK,
            supaya pengajuan diarahkan ke yang paling mungkin cocok.
          </p>
        </div>
      </div>
    </section>
  );
}

import { Briefcase, GraduationCap, Home, AlertCircle } from "lucide-react";
import { KEPERLUAN_DANA_OPTIONS } from "@/schemas/lead";

// Ikon dan deskripsi harus tetap sinkron urutannya dengan
// KEPERLUAN_DANA_OPTIONS di schemas/lead.ts — daftar itu juga jadi opsi
// dropdown di form (§8), supaya kebutuhan yang dipilih pengunjung terekam
// sebagai data.
const NEEDS = [
  { icon: Briefcase, label: KEPERLUAN_DANA_OPTIONS[0], desc: "Tambahan modal untuk usaha yang sedang berjalan" },
  { icon: GraduationCap, label: KEPERLUAN_DANA_OPTIONS[1], desc: "Uang sekolah, kuliah, atau kebutuhan pendidikan lain" },
  { icon: Home, label: KEPERLUAN_DANA_OPTIONS[2], desc: "Perbaikan atau renovasi tempat tinggal" },
  { icon: AlertCircle, label: KEPERLUAN_DANA_OPTIONS[3], desc: "Nikah, umroh/haji, kesehatan, atau keperluan lain yang tidak bisa ditunda" },
] as const;

export function NeedsSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center">
        Dana Bisa Dipakai untuk Apa Saja
      </h2>
      <p className="mt-2 text-center text-muted-foreground">
        Kendaraan Anda tetap dipakai seperti biasa, hanya BPKB yang dijaminkan.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {NEEDS.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md p-5 text-center"
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
              <Icon className="size-6 text-primary" />
            </div>
            <div className="font-medium">{label}</div>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

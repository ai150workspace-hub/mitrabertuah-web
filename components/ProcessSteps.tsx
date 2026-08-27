import { PhoneCall, ClipboardCheck, FileCheck, Wallet } from "lucide-react";

const STEPS = [
  { icon: PhoneCall, title: "Hubungi Kami / Isi Form", desc: "Ceritakan kendaraan dan kebutuhan dana Anda" },
  { icon: ClipboardCheck, title: "Survei & Verifikasi Data", desc: "Tim kami menyurvei kendaraan dan memverifikasi data Anda" },
  { icon: FileCheck, title: "Validasi BPKB & Kendaraan", desc: "Berkas diteruskan ke perusahaan pembiayaan di hari yang sama" },
  { icon: Wallet, title: "Dana Cair ke Rekening", desc: "Setelah disetujui, dana ditransfer perusahaan pembiayaan" },
] as const;

export function ProcessSteps() {
  return (
    <section className="bg-muted/40">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center">Proses Pengajuan</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="relative rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  {i + 1}
                </div>
                <Icon className="size-6 text-primary" />
              </div>
              <h3 className="mt-4 font-medium">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Keputusan akhir persetujuan dan besaran pencairan sepenuhnya ditentukan oleh
          perusahaan pembiayaan, bukan oleh kami.
        </p>
      </div>
    </section>
  );
}

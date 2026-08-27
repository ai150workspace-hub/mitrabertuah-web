import { LeadForm } from "@/components/LeadForm";

export function LeadFormSection({ defaultKota }: { defaultKota?: string }) {
  return (
    <section id="pengajuan" className="mx-auto max-w-2xl scroll-mt-20 px-4 py-16">
      <h2 className="font-heading text-center text-2xl font-bold sm:text-3xl">
        Isi Form Pengajuan
      </h2>
      <p className="mt-2 text-center text-muted-foreground">
        Data Anda tersimpan lebih dulu, baru kami lanjutkan lewat WhatsApp.
      </p>

      <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <LeadForm defaultKota={defaultKota} />
      </div>
    </section>
  );
}

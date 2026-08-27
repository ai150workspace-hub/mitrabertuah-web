import { WhatsAppButton } from "@/components/WhatsAppButton";

// Kode baru, konsisten dengan pola bracket yang sudah ada — TIDAK
// mengubah 8 positionCode lama yang sudah dipakai atribusi CRM.
export function CtaPenutup() {
  return (
    <section className="bg-primary/5">
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl text-balance">
          Kami tidak memungut biaya apa pun dari Anda.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Ceritakan kendaraan Anda, dan tim kami di Pekanbaru akan membantu dari sana.
        </p>
        <div className="mt-6 flex justify-center">
          <WhatsAppButton positionCode="[WEB-CTA-PENUTUP]" label="Chat WhatsApp Sekarang" />
        </div>
      </div>
    </section>
  );
}

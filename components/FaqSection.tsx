import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FAQ_ITEMS } from "@/lib/faq";

// Server Component sengaja — jawaban HARUS ada di HTML awal (view-source),
// bukan dimuat lewat JavaScript setelah klik. Lihat §6.6 dan §17 DoD.
export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center">
        Pertanyaan yang Sering Ditanyakan
      </h2>

      <Accordion className="mt-8 space-y-3" defaultValue={[FAQ_ITEMS[0].question]}>
        {FAQ_ITEMS.map((item) => (
          <AccordionItem
            key={item.question}
            value={item.question}
            className="rounded-2xl border border-border bg-card px-5 not-last:border-b-0"
          >
            <AccordionTrigger className="text-base font-medium py-4">{item.question}</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">Masih ada pertanyaan lain?</p>
        <WhatsAppButton
          positionCode="[WEB-FAQ]"
          message="Halo, saya ada pertanyaan soal gadai BPKB."
          label="Tanya Lewat WhatsApp"
          variant="outline"
          className="mt-3"
        />
      </div>
    </section>
  );
}

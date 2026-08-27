import { DisclosureBar } from "@/components/DisclosureBar";

// Disclosure WAJIB di atas setiap artikel, bukan di footer (§13.3).
// Dipasang lewat layout, bukan diminta tiap penulis artikel menyertakan
// sendiri di file MDX-nya — supaya tidak mungkin terlewat.
export default function ArtikelSlugLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <DisclosureBar />
      <article className="mt-8">{children}</article>
    </main>
  );
}

import type { Metadata } from "next";
import { Fragment } from "react";
import { PRIVACY_SECTIONS, INTRO_TEXT, type PolicyBlock } from "@/content/kebijakan-privasi";
import { isPolicyReadyToPublish, findUnresolvedPlaceholders } from "@/lib/privacy-policy";
import { POLICY_VERSION, POLICY_EFFECTIVE_DATE } from "@/lib/consent";
import { siteConfig } from "@/lib/site-config";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// noindex wajib terlepas dari status gate di bawah (§11.7 / aturan
// PROMPT_PRIVASI §"yang tidak boleh kamu lakukan": jangan lepas noindex
// dari halaman mana pun).
export const metadata: Metadata = {
  title: `Kebijakan Privasi — ${siteConfig.brandName}`,
  robots: { index: false, follow: false },
};

// Rendering **bold** minimal, tanpa library markdown — konten sumber cuma
// pakai bold, tidak ada elemen inline lain (link, italic, kode) di isi
// kebijakan sungguhan (lihat content/kebijakan-privasi.ts).
function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter((p) => p !== "");
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

function PolicyBlockView({ block }: { block: PolicyBlock }) {
  if (block.type === "p") {
    return (
      <p>
        <InlineText text={block.text} />
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="list-disc space-y-1 pl-5">
        {block.items.map((item, i) => (
          <li key={i}>
            <InlineText text={item} />
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "lines") {
    return (
      <div className="space-y-0.5">
        {block.items.map((item, i) => (
          <p key={i}>
            <InlineText text={item} />
          </p>
        ))}
      </div>
    );
  }

  // table — bisa digulir sendiri secara horizontal, tanpa membuat
  // halaman ikut menggulir ke samping (Langkah 2 brief).
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            {block.headers.map((h, i) => (
              <th key={i} className="px-3 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 align-top">
                  <InlineText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function KebijakanPrivasiPage() {
  if (!isPolicyReadyToPublish()) {
    // Log internal (server-side saja, tidak dikirim ke klien) — supaya
    // gampang dicek lewat log Vercel apa saja yang masih menahan halaman
    // ini tayang, tanpa membocorkan daftar itu ke pengunjung.
    console.warn(
      `[kebijakan-privasi] Halaman belum tayang — ${findUnresolvedPlaceholders().length} placeholder [[ ]] belum diisi.`
    );

    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-heading text-2xl font-bold">Kebijakan Privasi</h1>
        <p className="mt-4 text-muted-foreground">
          Halaman ini masih dalam penyusunan dan menunggu konfirmasi resmi dari pemilik{" "}
          {siteConfig.brandName} sebelum diterbitkan.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Untuk pertanyaan seputar data Anda, hubungi kami langsung lewat WhatsApp.
        </p>
        <div className="mt-6 flex justify-center">
          <WhatsAppButton positionCode="[WEB-PRIVASI]" label="Chat WhatsApp" />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-heading text-2xl font-bold sm:text-3xl">Kebijakan Privasi</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Versi {POLICY_VERSION} — berlaku sejak {POLICY_EFFECTIVE_DATE}
      </p>

      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        <InlineText text={INTRO_TEXT} />
      </p>

      <nav aria-label="Daftar isi" className="mt-8 rounded-xl border border-border p-4">
        <p className="text-sm font-semibold">Daftar isi</p>
        <ol className="mt-2 space-y-1 text-sm">
          {PRIVACY_SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-primary underline-offset-2 hover:underline">
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-8 space-y-10">
        {PRIVACY_SECTIONS.map((s) => (
          <section id={s.id} key={s.id} className="scroll-mt-20">
            <h2 className="font-heading text-lg font-bold sm:text-xl">{s.title}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {s.blocks.map((block, i) => (
                <PolicyBlockView key={i} block={block} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 border-t border-border pt-6 text-center">
        <p className="text-sm text-muted-foreground">Ada pertanyaan seputar data Anda?</p>
        <WhatsAppButton positionCode="[WEB-PRIVASI]" label="Chat WhatsApp" className="mt-3" />
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

// noindex wajib (§11.7). Isi lengkap kebijakan privasi (data yang
// dikumpulkan, tujuan, dibagikan ke siapa, retensi, cara menarik
// persetujuan) BELUM ditulis — itu klaim hukum, tunduk aturan yang sama
// dengan disclaimer footer (§10.1, Aturan Mutlak #6). Kerangka bagiannya
// sudah sesuai §10.1, kontennya menunggu konfirmasi owner.
export const metadata: Metadata = {
  title: `Kebijakan Privasi — ${siteConfig.brandName}`,
  robots: { index: false, follow: false },
};

const SECTIONS = [
  "Data apa yang kami kumpulkan",
  "Untuk apa data itu dipakai",
  "Dibagikan ke siapa",
  "Berapa lama data disimpan",
  "Cara menarik persetujuan Anda",
];

export default function KebijakanPrivasiPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-semibold">Kebijakan Privasi</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Halaman ini masih dalam penyusunan dan menunggu konfirmasi resmi dari pemilik
        {" "}{siteConfig.brandName} sebelum diterbitkan.
      </p>

      <div className="mt-8 space-y-6">
        {SECTIONS.map((title) => (
          <section key={title}>
            <h2 className="font-medium">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">[TUNGGU KONFIRMASI OWNER]</p>
          </section>
        ))}
      </div>
    </main>
  );
}

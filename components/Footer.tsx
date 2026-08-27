import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

// Kalimat disclaimer legal di sini SENGAJA placeholder — §10.3, blocker
// publish §1 nomor 2. Jangan diisi tanpa konfirmasi eksplisit owner.
export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="font-semibold text-lg">{siteConfig.brandName}</div>
            <p className="mt-2 text-sm text-muted-foreground">{siteConfig.officeAddress}</p>
          </div>

          <div>
            <div className="font-medium text-sm">Tautan</div>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>
                <Link href="/artikel" className="hover:text-foreground hover:underline">
                  Artikel
                </Link>
              </li>
              <li>
                <Link href="/kebijakan-privasi" className="hover:text-foreground hover:underline">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-medium text-sm">Status</div>
            <p className="mt-2 text-sm text-muted-foreground">{siteConfig.businessEntity}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>{siteConfig.legalDisclaimer}</p>
          <p className="mt-2">
            © {new Date().getFullYear()} {siteConfig.brandName}. Kami bekerja sama
            dengan {siteConfig.partnerDescription} — bukan perusahaan pembiayaan atau
            pemberi pinjaman.
          </p>
        </div>
      </div>
    </footer>
  );
}

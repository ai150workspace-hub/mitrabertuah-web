import { Info } from "lucide-react";

// Teks ini PERSIS dari §13.3 build spec — bukan disclaimer yang saya
// tulis sendiri (beda dengan siteConfig.legalDisclaimer yang masih
// menunggu konfirmasi owner, §1). Wajib tampil di ATAS setiap artikel,
// bukan di footer.
export function DisclosureBar() {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
      <Info className="mt-0.5 size-4 shrink-0 text-primary" />
      <p>
        Mitra Bertuah adalah mitra pemasaran perusahaan pembiayaan berizin OJK.
        Komisi kami dibayar oleh perusahaan pembiayaan, bukan oleh Anda.
      </p>
    </div>
  );
}

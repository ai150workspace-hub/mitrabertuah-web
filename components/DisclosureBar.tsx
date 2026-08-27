import { Info } from "lucide-react";
import { APPROVED_DISCLOSURE_TEXT } from "@/lib/site-config";

// Wajib tampil di ATAS setiap artikel, bukan di footer (§13.3). Teksnya
// sudah final — lihat APPROVED_DISCLOSURE_TEXT di lib/site-config.ts,
// dipakai ulang juga sebagai fallback footer saat legalDisclaimer belum
// dikonfirmasi owner.
export function DisclosureBar() {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
      <Info className="mt-0.5 size-4 shrink-0 text-primary" />
      <p>{APPROVED_DISCLOSURE_TEXT}</p>
    </div>
  );
}

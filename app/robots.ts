import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Pasangan dari app/layout.tsx metadata.robots — diizinkan terindeks
// sejak 2026-08-28 atas instruksi eksplisit owner. /kebijakan-privasi
// tidak dikecualikan di sini karena kontennya sendiri sudah tayang
// (lihat app/kebijakan-privasi/page.tsx) — tetap tidak dimasukkan ke
// sitemap.ts, itu keputusan terpisah dan tidak berubah oleh ini.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}

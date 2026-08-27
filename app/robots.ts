import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// NOINDEX SITUS PENUH — pasangan dari app/layout.tsx metadata.robots.
// Lepas HANYA kalau owner memberi instruksi eksplisit bahwa situs siap
// publish. Sitemap tetap disertakan (tidak masalah tersedia meski
// disallow — Google tetap butuh tahu URL-nya kalau nanti dibuka).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}

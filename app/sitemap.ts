import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllArticles } from "@/lib/articles";
import { KOTA_WHITELIST } from "@/lib/kota";

// /kebijakan-privasi SENGAJA tidak pernah masuk sini — noindex permanen
// (PROMPT_SITEMAP_NOINDEX_mitrabertuah.md §1), halaman kepatuhan bukan
// halaman yang perlu diperingkatkan, terlepas dari status kontennya.
//
// /artikel bersyarat pada jumlah artikel yang benar-benar terbit (§2) —
// getAllArticles() sumber yang sama dipakai app/artikel/page.tsx untuk
// generateMetadata-nya dan untuk membangun URL tiap artikel di bawah
// (§3, otomatis — bukan ditulis manual satu per satu, dan draft:true
// sudah difilter di dalam getAllArticles() sendiri).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  return [
    {
      url: siteConfig.siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...(articles.length > 0
      ? [{ url: `${siteConfig.siteUrl}/artikel`, changeFrequency: "weekly" as const, priority: 0.7 }]
      : []),
    ...KOTA_WHITELIST.map((kota) => ({
      url: `${siteConfig.siteUrl}/${kota.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      url: `${siteConfig.siteUrl}/artikel/${article.slug}`,
      lastModified: article.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

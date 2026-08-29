import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllArticles } from "@/lib/articles";
import { KOTA_WHITELIST } from "@/lib/kota";
import { isPolicyReadyToPublish } from "@/lib/privacy-policy";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  return [
    {
      url: siteConfig.siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.siteUrl}/artikel`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // Sama seperti generateMetadata di app/kebijakan-privasi/page.tsx —
    // ikut gate isi halamannya, bukan dimasukkan tanpa syarat.
    ...(isPolicyReadyToPublish()
      ? [{ url: `${siteConfig.siteUrl}/kebijakan-privasi`, changeFrequency: "yearly" as const, priority: 0.3 }]
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

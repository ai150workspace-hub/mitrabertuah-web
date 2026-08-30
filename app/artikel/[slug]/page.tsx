import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllArticles, getArticleSlugs } from "@/lib/articles";
import { ArticleReadTracker } from "@/components/ArticleReadTracker";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/lib/site-config";

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}
export const dynamicParams = false;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getAllArticles();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} — ${siteConfig.brandName}`,
    description: article.excerpt,
    alternates: { canonical: `/artikel/${slug}` },
  };
}

export default async function ArtikelPage({ params }: { params: Params }) {
  const { slug } = await params;
  const articles = await getAllArticles();
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  // Import dinamis — pola resmi Next.js untuk MDX per-slug (bukan
  // file-based routing biasa), lihat docs/app/guides/mdx.md.
  const { default: ArticleContent } = await import(`@/content/artikel/${slug}.mdx`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { "@type": "Organization", name: siteConfig.brandName },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleReadTracker slug={slug} />

      <ArticleContent />

      <div className="mt-12 rounded-2xl border border-border bg-muted/30 p-6 text-center">
        <p className="text-sm text-muted-foreground">Ada pertanyaan soal artikel ini?</p>
        <WhatsAppButton
          positionCode={`[WEB-ARTIKEL-${slug}]`}
          label="Tanya Lewat WhatsApp"
          className="mt-3"
        />
        <Link href="/" className="mt-4 block text-sm font-medium text-primary hover:underline">
          Kembali ke halaman utama
        </Link>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Artikel — ${siteConfig.brandName}`,
  description: "Panduan seputar gadai BPKB mobil dan motor di Pekanbaru dan sekitarnya.",
  alternates: { canonical: "/artikel" },
};

export default async function ArtikelIndexPage() {
  const articles = await getAllArticles();

  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-center">Artikel</h1>
      <p className="mt-3 text-center text-muted-foreground">
        Panduan seputar gadai BPKB mobil dan motor di Pekanbaru dan sekitarnya.
      </p>

      {articles.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">Belum ada artikel yang terbit.</p>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </main>
  );
}

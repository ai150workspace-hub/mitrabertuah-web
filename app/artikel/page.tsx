import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { siteConfig } from "@/lib/site-config";

// Bersyarat pada jumlah artikel yang benar-benar terbit
// (PROMPT_SITEMAP_NOINDEX_mitrabertuah.md §2) — dibaca dari getAllArticles(),
// sumber yang sama dipakai komponen halaman di bawah untuk menampilkan
// daftarnya. Satu penghitung, bukan dua yang bisa berbeda. Nol artikel:
// noindex (halaman kosong, tidak perlu diperingkatkan) dan dikeluarkan
// dari sitemap.ts (logika sama di sana). Begitu artikel pertama terbit,
// keduanya otomatis balik jadi index tanpa siapa pun perlu ingat
// mengubahnya manual.
export async function generateMetadata(): Promise<Metadata> {
  const articles = await getAllArticles();

  return {
    title: `Artikel — ${siteConfig.brandName}`,
    description: "Panduan seputar gadai BPKB mobil dan motor di Pekanbaru dan sekitarnya.",
    alternates: { canonical: "/artikel" },
    ...(articles.length === 0 ? { robots: { index: false, follow: true } } : {}),
  };
}

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

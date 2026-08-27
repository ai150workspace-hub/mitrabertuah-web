import Link from "next/link";
import { getRecentArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleCard";

// Menghubungkan halaman utama ke mesin konten (§6.7). Sembunyikan section
// kalau belum ada artikel — sengaja begitu, bukan render kosong. Sistem
// artikel sungguhan dibangun di Fase 6; section ini otomatis terisi begitu
// artikel pertama terbit, tanpa perubahan kode di sini.
export async function RecentArticles() {
  const articles = await getRecentArticles(3);
  if (articles.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold">Artikel Terbaru</h2>
        <Link href="/artikel" className="text-sm font-medium text-primary hover:underline">
          Lihat semua
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}

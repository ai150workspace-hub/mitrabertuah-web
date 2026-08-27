// Sistem artikel MDX sungguhan (Fase 6). Isi artikel ditulis manusia
// pakai data CRM asli (§13.2-§13.3) — Aturan Mutlak #10 melarang saya
// menulis isi artikel, jadi hanya ada satu contoh MDX berisi placeholder
// di content/artikel/.
import path from "node:path";
import { readdirSync } from "node:fs";

export interface ArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
}

const ARTICLES_DIR = path.join(process.cwd(), "content", "artikel");

export async function getAllArticles(): Promise<ArticleMeta[]> {
  let files: string[];
  try {
    files = readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"));
  } catch {
    return []; // direktori belum ada / kosong — bukan error
  }

  const articles = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const mod = await import(`@/content/artikel/${slug}.mdx`);
      const meta = mod.metadata as (Partial<ArticleMeta> & { draft?: boolean }) | undefined;
      return {
        slug,
        title: meta?.title ?? slug,
        excerpt: meta?.excerpt ?? "",
        publishedAt: meta?.publishedAt ?? "",
        draft: meta?.draft ?? false,
      };
    })
  );

  // draft:true (dipakai contoh-artikel-placeholder.mdx) TIDAK boleh
  // muncul di index/sitemap/routing sungguhan — itu contoh struktur
  // buat penulis manusia, bukan konten yang siap dilihat pengunjung.
  return articles
    .filter((a) => !a.draft)
    .map(({ draft: _draft, ...rest }) => rest)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getRecentArticles(limit = 3): Promise<ArticleMeta[]> {
  const all = await getAllArticles();
  return all.slice(0, limit);
}

export async function getArticleSlugs(): Promise<string[]> {
  const all = await getAllArticles();
  return all.map((a) => a.slug);
}

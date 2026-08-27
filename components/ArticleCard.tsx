import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ArticleMeta } from "@/lib/articles";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/artikel/${article.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md p-5 transition-colors hover:border-primary/50"
    >
      <h3 className="font-medium group-hover:text-primary">{article.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{article.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
        Baca selengkapnya <ArrowRight className="size-3.5" />
      </span>
    </Link>
  );
}

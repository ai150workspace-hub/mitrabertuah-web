"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

// article_read (§14) — sekali per kunjungan, saat pengunjung mencapai
// 75% panjang artikel. Tidak merender apa pun.
export function ArticleReadTracker({ slug }: { slug: string }) {
  const tracked = useRef(false);

  useEffect(() => {
    function handleScroll() {
      if (tracked.current) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total >= 0.75) {
        tracked.current = true;
        trackEvent("article_read", { slug });
        window.removeEventListener("scroll", handleScroll);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  return null;
}

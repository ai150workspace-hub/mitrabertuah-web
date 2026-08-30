"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig, displayOfficeAddress } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

// Klik-untuk-memuat (PROMPT_PETA_mitrabertuah.md) — sebelum diklik, TIDAK
// ADA permintaan jaringan ke Google sama sekali (bukan cuma iframe
// disembunyikan lewat CSS, iframe-nya betul-betul belum ada di DOM).
// Dua alasan: performa (skor Lighthouse mobile situs ini baru diperbaiki
// susah payah ke 71, iframe Maps yang memuat otomatis akan menurunkannya
// lagi) dan privasi (iframe Maps mengirim IP pengunjung + cookie ke
// Google walau petanya tidak pernah dilihat — kebijakan privasi kita
// belum mencantumkan itu sebagai hal yang selalu terjadi).
//
// Tanpa API key, tanpa dependensi peta baru — URL sematan publik Google
// Maps (`/maps?q=...&output=embed`).
export function MapEmbed() {
  const [showMap, setShowMap] = useState(false);
  const address = displayOfficeAddress();
  const encodedAddress = encodeURIComponent(address);

  const embedSrc = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  const openMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

  return (
    <div className="mt-6">
      {/* aspect-ratio dikunci sejak awal (state tombol maupun iframe)
          supaya tidak ada pergeseran layout saat peta muncul. */}
      <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-muted/30 sm:aspect-[21/9]">
        {showMap ? (
          <iframe
            src={embedSrc}
            title={`Peta lokasi kantor ${siteConfig.brandName}`}
            className="size-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <button
            type="button"
            onClick={() => setShowMap(true)}
            className="flex size-full flex-col items-center justify-center gap-3 px-6 text-center transition-colors hover:bg-muted/60"
          >
            <MapPin className="size-7 text-primary" />
            <div>
              <p className="font-medium">{siteConfig.brandName}</p>
              <p className="mt-1 text-sm text-muted-foreground">{address}</p>
            </div>
            <span className={cn(buttonVariants({ size: "sm" }), "rounded-full")}>Lihat Peta</span>
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm">
        <a
          href={openMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("map_open")}
          className="font-medium text-primary hover:underline"
        >
          Buka di Google Maps
        </a>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("map_directions")}
          className="font-medium text-primary hover:underline"
        >
          Petunjuk arah
        </a>
      </div>
    </div>
  );
}

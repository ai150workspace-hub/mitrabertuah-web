import { siteConfig, isPendingConfirmation } from "@/lib/site-config";
import { FAQ_ITEMS } from "@/lib/faq";
import { toWhatsAppFormat } from "@/lib/phone";
import { KOTA_WHITELIST } from "@/lib/kota";

function jsonLdScript(data: object, key?: string) {
  return (
    <script
      key={key}
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// areaServed diambil dari daftar halaman kota (lib/kota.ts) + Pekanbaru
// (homepage) — satu sumber, bukan diketik ulang terpisah di sini.
// PROMPT_JSONLD_mitrabertuah.md §4: sebelumnya cuma "Pekanbaru", padahal
// situs punya 5 halaman kota lain — kontradiksi dengan konten yang benar-
// benar diterbitkan.
const AREA_SERVED = [
  { "@type": "City", name: "Pekanbaru" },
  ...KOTA_WHITELIST.map((k) => ({ "@type": "City", name: k.nama })),
];

// LocalBusiness: field yang masih placeholder (alamat, dst — §1) SENGAJA
// dihilangkan dari JSON-LD, bukan diisi teks placeholder. Data terstruktur
// palsu lebih buruk daripada tidak lengkap — Google bisa salah
// mengindeks alamat yang belum benar. Field muncul otomatis begitu
// siteConfig diisi data asli. Dipasang di root layout — berlaku untuk
// seluruh situs, bukan konten per-halaman. SATU blok untuk seluruh situs
// (bukan per halaman kota) — ini satu bisnis satu kantor yang melayani
// beberapa wilayah, bukan enam cabang (PROMPT_JSONLD §"Batas").
export function LocalBusinessJsonLd() {
  const business: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.siteUrl}/#business`,
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    areaServed: AREA_SERVED,
  };

  if (!isPendingConfirmation(siteConfig.officeAddress)) {
    business.address = {
      "@type": "PostalAddress",
      streetAddress: siteConfig.officeAddress,
      addressLocality: "Pekanbaru",
      addressRegion: "Riau",
      addressCountry: "ID",
    };
    // Koordinat, bukan pencarian teks alamat — gedung kantor berbagi
    // dengan usaha lain (PROMPT_GEO_mitrabertuah.md §3).
    business.geo = {
      "@type": "GeoCoordinates",
      latitude: siteConfig.officeCoordinates.latitude,
      longitude: siteConfig.officeCoordinates.longitude,
    };
    business.hasMap = `https://www.google.com/maps?q=${siteConfig.officeCoordinates.latitude},${siteConfig.officeCoordinates.longitude}`;
  }

  if (siteConfig.whatsappNumber) {
    business.telephone = `+${toWhatsAppFormat(siteConfig.whatsappNumber)}`;
  }

  return jsonLdScript(business);
}

// FAQPage: HARUS identik dengan teks yang tampil (§11) — dan HANYA
// dipasang di halaman yang benar-benar merender <FaqSection> (homepage,
// halaman kota). Structured data yang tidak match konten visible di
// halaman itu melanggar pedoman Google, bukan cuma soal kerapian.
export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return jsonLdScript(data);
}

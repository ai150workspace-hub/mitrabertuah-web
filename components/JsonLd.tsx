import { siteConfig, isPendingConfirmation } from "@/lib/site-config";
import { FAQ_ITEMS } from "@/lib/faq";
import { toWhatsAppFormat } from "@/lib/phone";

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

// LocalBusiness: field yang masih placeholder (alamat, dst — §1) SENGAJA
// dihilangkan dari JSON-LD, bukan diisi teks placeholder. Data terstruktur
// palsu lebih buruk daripada tidak lengkap — Google bisa salah
// mengindeks alamat yang belum benar. Field muncul otomatis begitu
// siteConfig diisi data asli. Dipasang di root layout — berlaku untuk
// seluruh situs, bukan konten per-halaman.
export function LocalBusinessJsonLd() {
  const business: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    areaServed: "Pekanbaru",
  };

  if (!isPendingConfirmation(siteConfig.officeAddress)) {
    business.address = {
      "@type": "PostalAddress",
      streetAddress: siteConfig.officeAddress,
      addressLocality: "Pekanbaru",
      addressRegion: "Riau",
      addressCountry: "ID",
    };
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

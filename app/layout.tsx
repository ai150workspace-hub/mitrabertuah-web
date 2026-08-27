import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Baloo_2, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { AttributionCapture } from "@/components/AttributionCapture";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

// Plus Jakarta Sans untuk body/UI — rounded tapi tetap terbaca di ukuran
// kecil. Baloo 2 untuk headline besar (h1/h2, dipakai lewat class
// `font-heading`) — bulat dan tebal, paling dekat dengan font custom
// "Cosmica" milik Carmoola di antara font Google Fonts yang tersedia.
const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

const baloo2 = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${siteConfig.brandName} — Gadai BPKB Mobil & Motor di Pekanbaru`;
const description =
  "Pengajuan pembiayaan jaminan BPKB mobil dan motor ke multifinance berizin OJK, dengan kantor di Pekanbaru dan pendampingan sampai survei.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.brandName,
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${jakartaSans.variable} ${baloo2.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocalBusinessJsonLd />
        <AttributionCapture />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

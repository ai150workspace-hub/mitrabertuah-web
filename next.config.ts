import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Domain resmi mitrabertuah.id sudah dipasang (2026-08-28), tapi Vercel
  // tetap melayani konten yang sama di subdomain *.vercel.app bawaannya
  // secara paralel — tidak ada toggle dashboard/CLI untuk mematikannya.
  // Redirect 308 di sini yang memastikan itu, supaya Google/pengguna
  // lama tidak pernah melihat dua URL berbeda untuk konten yang sama.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "mitrabertuah-web.vercel.app" }],
        destination: "https://www.mitrabertuah.id/:path*",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);

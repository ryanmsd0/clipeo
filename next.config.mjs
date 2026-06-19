/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Formats modernes pour next/image (meilleur Core Web Vitals)
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // En-têtes de sécurité = signaux de confiance SEO
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;

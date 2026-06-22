/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Formats modernes pour next/image (meilleur Core Web Vitals)
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Les 3 anciennes sous-pages services fusionnées en une seule page /services
  async redirects() {
    return [
      { source: "/services/campagne-managee", destination: "/services", permanent: true },
      { source: "/services/production-de-clips", destination: "/services", permanent: true },
      { source: "/services/distribution-tracking", destination: "/services", permanent: true },
      // Page « tous les univers » supprimée → section « Pour qui » de la home
      { source: "/pour-qui", destination: "/#pour-qui", permanent: true },
      // Page « tout le blog » supprimée → section « Blog » de la home (les articles gardent leur page)
      { source: "/blog", destination: "/#blog", permanent: true },
    ];
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

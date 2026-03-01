import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@sparticuz/chromium-min"],
  async redirects() {
    return [
      { source: "/contacto", destination: "/#contacto", permanent: false },
      { source: "/faq", destination: "/", permanent: false },
      { source: "/pricing", destination: "/#precios", permanent: false },
      { source: "/acta", destination: "/generar-acta", permanent: false },
      { source: "/design-system", destination: "/", permanent: false },
      { source: "/comunidades/:path*", destination: "/", permanent: false },
      { source: "/privacidad", destination: "/", permanent: false },
      { source: "/terminos", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;

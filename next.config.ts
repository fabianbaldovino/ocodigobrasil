import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gera HTML estático puro — compatível com Cloudflare Pages, sem adapter
  output: "export",
  // Dev local: proxy /api para o emulador do Hosting (rewrites do firebase.json).
  // Só em dev — no build de export as rewrites ficam de fora.
  ...(process.env.NODE_ENV === "development"
    ? {
        async rewrites() {
          return [
            {
              source: "/api/:path*",
              destination: "http://127.0.0.1:5000/api/:path*",
            },
          ];
        },
      }
    : {}),
  // Garante URLs com trailing slash para compatibilidade com Cloudflare Pages
  trailingSlash: true,
  images: {
    // Export estático não tem servidor de otimização — serve original
    unoptimized: true,
  },
};

export default nextConfig;

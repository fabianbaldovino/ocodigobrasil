import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gera HTML estático puro, publicado no Firebase Hosting (pasta out/)
  output: "export",
  // URLs com barra final (/conteudo/slug/), as canônicas do site
  trailingSlash: true,
  images: {
    // Export estático não tem servidor de otimização — serve original
    unoptimized: true,
  },
};

export default nextConfig;

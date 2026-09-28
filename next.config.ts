import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gera HTML estático puro — compatível com Cloudflare Pages, sem adapter
  output: "export",
  // Garante URLs com trailing slash para compatibilidade com Cloudflare Pages
  trailingSlash: true,
};

export default nextConfig;

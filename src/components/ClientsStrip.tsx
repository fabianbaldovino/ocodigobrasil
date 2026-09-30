"use client";

import Image from "next/image";

// Ordem de importancia: marcas de maior porte corporativo primeiro
const clients = [
  { name: "Copelmi", src: "/marcas/logo_copelmi_rio_grande_do_sul.png", invert: true, heightClass: "h-[120px]", widthClass: "w-[240px]", extraClass: "-translate-y-2" },
  { name: "Termolar", src: "/marcas/termolar_porto_alegre_rio_grande_do_sul_fabian_baldovino_producao_audiovisual.png", invert: true, heightClass: "h-[70px]", widthClass: "w-[180px]" },
  { name: "PUC RS", src: "/marcas/logo_puc_rs.png", invert: true, heightClass: "h-[120px]", widthClass: "w-[240px]" },
  { name: "Quick House", src: "/marcas/logo_quick_house_canoas_rio_grande_do_sul.png", heightClass: "h-[140px]", widthClass: "w-[260px]" },
  { name: "Fábrica de Suplementos", src: "/marcas/FABIRCA_DE_SUPLEMENTOS.png", heightClass: "h-[120px]", widthClass: "w-[240px]" },
  { name: "Kolosh", src: "/marcas/kolosh_porto_alegre_producao_audiovisual_fabian_baldovino.png", invert: true, widthClass: "w-[160px]" },
  { name: "Seival Sul Mineração", src: "/marcas/logo_seival_sul_mineracao_rs.png", invert: true, widthClass: "w-[180px]" },
  { name: "Prefeitura de Canoas RS", src: "/marcas/logo_Prefeitura_de_canoas_rio_grande_do_sul.png", invert: true, widthClass: "w-[180px]" },
  { name: "Mercato", src: "/marcas/logo_mercato_rio_grande_do_sul.png", invert: true, heightClass: "h-[70px]", widthClass: "w-[160px]" },
  { name: "Wedy Nutrition", src: "/marcas/logo_wedy_nutrition_brasil.png", widthClass: "w-[140px]" },
  { name: "BPM Society", src: "/marcas/logo_bpmsociety_brasil.png", invert: true, widthClass: "w-[140px]" },
  { name: "Vita Minimalista", src: "/marcas/vita_minimalista_brasil_fabian_baldovino_producao_audiovisual.png", invert: true, heightClass: "h-[65px]", widthClass: "w-[140px]" }
];

const doubled = [...clients, ...clients];

export default function ClientsStrip() {
  return (
    <div
      className="w-full bg-card rounded-[20px] py-4 overflow-hidden relative"
      
      
      
      aria-label="Marcas que confiam em Fabian Baldovino"
    >
      <p className="sr-only">Clientes atendidos por Fabian Baldovino — Brand Filmmaking Porto Alegre</p>

      {/* Keyframes inline: no build Linux da Vercel o minifier descarta @keyframes nao referenciados dentro do CSS (a referencia mora no style do JSX) — manter a definicao no HTML garante a animacao em qualquer pipeline. */}
      <style>{`@keyframes marquee-scroll{0%{transform:translate(0)}100%{transform:translate(-50%)}}`}</style>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-card to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-card to-transparent" />

      <div
        className="marquee-track flex items-center gap-12 w-max h-[50px]"
        style={{ animation: "marquee-scroll 36s linear infinite" }}
      >
        {doubled.map((client, idx) => (
          <div
            key={`${client.name}-${idx}`}
            aria-hidden={idx >= clients.length ? "true" : undefined}
            className={`flex items-center justify-center flex-shrink-0 transition-all duration-300 ${client.widthClass || "w-[140px]"} ${client.heightClass || "h-[50px]"} ${
              client.invert
                ? "opacity-70 hover:opacity-100 brightness-0 invert"
                : "opacity-60 hover:opacity-100 grayscale hover:grayscale-0 mix-blend-screen"
            }`}
          >
            <Image
              src={client.src}
              alt={`${client.name} — cliente Fabian Baldovino Brand Filmmaking`}
              width={300}
              height={150}
              className={`w-auto h-full object-contain ${client.extraClass || ""}`}
              loading="eager"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

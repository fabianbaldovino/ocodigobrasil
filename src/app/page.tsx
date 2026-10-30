import { Newsreader, Archivo } from "next/font/google";
import { faqData } from "@/lib/faqData";
import { JsonLd } from "@/components/JsonLd";
import { generateWebSite, generatePerson, generateOrganization, generateCreativeWork, generateFAQPage, buildGraph } from "@/lib/jsonld";
import HomeJourney from "@/components/home/HomeJourney";
import HomeSections from "@/components/home/HomeSections";
import "./home.css";

// Tipografia da home: Newsreader (voz editorial, com eixo óptico) e Archivo (rótulos e botões)
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-newsreader",
});
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

export default function Home() {
  const metaDescription = "O marketing no Brasil está errado. Nós consumimos por pertencimento, não por lógica. Leia o manifesto sobre a reação primária do consumidor brasileiro.";
  const jsonLdData = buildGraph([
    generateWebSite(),
    generateOrganization(),
    generatePerson(),
    generateCreativeWork(metaDescription),
    generateFAQPage(faqData)
  ]);

  return (
    <main className={`cb-home ${newsreader.variable} ${archivo.variable}`}>
      <JsonLd data={jsonLdData} />
      <HomeJourney />
      <HomeSections />
    </main>
  );
}

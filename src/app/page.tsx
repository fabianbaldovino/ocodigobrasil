import { faqData } from "@/lib/faqData";
import { JsonLd } from "@/components/JsonLd";
import { generateWebSite, generatePerson, generateOrganization, generateCreativeWork, generateFAQPage, buildGraph } from "@/lib/jsonld";
import HomeJourney from "@/components/home/HomeJourney";
import HomeSections from "@/components/home/HomeSections";
import "./home.css";

export default function Home() {
  const metaDescription = "O marketing no Brasil esqueceu do brasileiro. Nós consumimos por pertencimento, não por lógica. Leia o manifesto sobre a reação primária do consumidor.";
  const jsonLdData = buildGraph([
    generateWebSite(),
    generateOrganization(),
    generatePerson(),
    generateCreativeWork(metaDescription),
    generateFAQPage(faqData)
  ]);

  return (
    <main className="cb-home">
      <JsonLd data={jsonLdData} />
      <HomeJourney />
      <HomeSections />
    </main>
  );
}

import Image from "next/image";

import { faqData } from "@/lib/faqData";
import { JsonLd } from "@/components/JsonLd";
import { generateWebSite, generatePerson, generateOrganization, generateCreativeWork, generateFAQPage, buildGraph } from "@/lib/jsonld";
import AuthorBio from "@/components/AuthorBio";
import ProductDetails from "@/components/ProductDetails";
import Testimonials from "@/components/Testimonials";


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
    <main>
      <JsonLd data={jsonLdData} />

      {/* Hero Section */}
      <section className="section container hero-wrapper">
        <div className="hero-grid">
          <div className="hero-header">
            <div className="badge-luxury" style={{ marginBottom: '1.25rem' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Manifesto de Neuromarketing
            </div>

            <h1 className="text-huge">
              <span>O CÓDIGO</span>{' '}<br />
              <span className="logo-accent">BRASIL</span>
            </h1>

            <p className="text-subtitle" style={{ marginTop: '1rem', color: 'var(--accent)' }}>
              O segredo para vender no mercado mais emocional do mundo.
            </p>
          </div>

          <div className="hero-visual">
            <div className="hero-book-wrap">
              <Image 
                src="/capa_manifesto_o_codigo_brasil_fabian_baldovino.webp" 
                alt="Livro O Código Brasil — manifesto sobre o consumo brasileiro de Fabian Baldovino" 
                width={360} 
                height={480} 
                priority 
                className="hero-book" 
              />
            </div>
          </div>

          <div className="hero-action">
            <p className="text-body" style={{ fontSize: '1.125rem' }}>
              Esqueça as regras americanas de marketing. Descubra por que o brasileiro não compra o &quot;melhor produto&quot;, mas sim a marca que o faz se sentir protegido e em casa.
            </p>

            <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '380px' }}>
              <a 
                href="https://pay.hotmart.com/C107804167U" 
                className="btn-hero"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Quero o manifesto: checkout seguro na Hotmart"
              >
                <span>Quero o manifesto</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', textAlign: 'center', margin: 0 }}>
                🔒 Acesso Digital Imediato • 7 Dias de Garantia Incondicional
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Thesis / Vision Section */}
      <section id="tese" className="section container">
        <div className="card-surface">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div className="badge-luxury" style={{ marginBottom: '1rem' }}>
              Diagnóstico Cultural
            </div>
            <h2 className="text-title" style={{ margin: '0 auto 1.25rem' }}>
              Por Que Você Está Perdendo Vendas?
            </h2>
            <p className="text-body" style={{ margin: '0 auto', fontSize: '1.125rem' }}>
              Você já percebeu que ter o produto tecnicamente superior ou o menor preço muitas vezes <strong>não garante a venda no Brasil</strong>?
            </p>
            <p className="text-body" style={{ margin: '1rem auto 0', color: 'var(--text-muted)' }}>
              Para a nossa reação primária, o ambiente de consumo se divide em dois universos inconciliáveis: a <strong>RUA</strong> (a frieza, a burocracia e o medo de ser enganado) e a <strong>CASA</strong> (o afeto, a proximidade e a segurança).
            </p>
          </div>

          <div className="casa-rua-grid">
            <div className="dual-card dual-card--rua">
              <span className="dual-card__tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                A Rua (O Erro Comum)
              </span>
              <h3 className="dual-card__title">Sistemas Frios e Impessoais</h3>
              <p className="dual-card__desc">
                Marketing baseado em manuais importados, vocabulário complexo, menus burocráticos e respostas robotizadas. O cliente sente hostilidade digital e abandona a compra com receio de ser desamparado.
              </p>
            </div>

            <div className="dual-card dual-card--casa">
              <span className="dual-card__tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2 2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                A Casa (O Nosso Método)
              </span>
              <h3 className="dual-card__title">O Porto Seguro Emocional</h3>
              <p className="dual-card__desc">
                A marca atua como fiadora e protetora (&quot;o padrinho&quot;). Linguagem acolhedora, clareza absoluta, pontes humanas pelo WhatsApp e a certeza inegociável de que o cliente jamais estará sozinho.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quem decodificou o Brasil? (Autoridade) */}
      <section id="autoridade" className="section container">
        <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
          
          {/* Foto de Autoridade */}
          <div className="media-card">
            <a href="https://www.fabian.art.br/sobre" target="_blank" rel="noopener noreferrer" style={{ display: 'block' }} aria-label="Saiba mais sobre Fabian Baldovino">
              <Image 
                src="/fabian_baldovino_producao_audiovisual_porto_alegre.webp" 
                alt="Fabian Baldovino — Autor de O Código Brasil" 
                width={1080} 
                height={1021} 
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
              />
            </a>
            <div className="media-caption">
              Fabian Baldovino • Autor e Estrategista Visual
            </div>
          </div>
          
          {/* Bio e Marcas */}
          <div className="flex-col gap-md">
            <div>
              <div className="badge-luxury" style={{ marginBottom: '0.75rem' }}>
                Autoridade & Prática
              </div>
              <h2 className="text-title" style={{ margin: 0 }}>Fabian Baldovino</h2>
              <p style={{ margin: '0.35rem 0 0', color: 'var(--accent)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Autor & Estrategista de Percepção
              </p>
            </div>
            
            <div className="flex-col gap-sm">
              <p className="text-body" style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
                Com um rigoroso estudo autodidata nas áreas de Ciências Sociais, Filosofia e Pedagogia, Fabian atua como a retaguarda invisível de grandes negócios, dominando a arquitetura de percepção que blinda marcas no mercado nacional.
              </p>
              <p className="text-body" style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
                Além de orquestrar estratégias narrativas para o setor privado, atuou na educação: o projeto Curta nas Escolas, que ajudou a criar em 2011, foi noticiado pelo <strong>Correio do Povo</strong>, pelo <strong>Jornal da Capital</strong>, pela <strong>Prefeitura de Porto Alegre</strong> e pela <strong>Câmara Municipal de Porto Alegre</strong>, e Fabian foi palestrante na <strong>UFRGS</strong>.
              </p>
              <p className="text-body" style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
                Essa vivência direta com o cotidiano do consumidor brasileiro permitiu decodificar os gatilhos de lealdade e os medos que movem o mercado mais passional do mundo.
              </p>
            </div>

          </div>
          
        </div>

        {/* Marcas Parceiras - Agora horizontal e comprida sob a foto */}
        <div className="flex-col" style={{ gap: '1rem', marginTop: '4rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center' }}>
            Marcas e Instituições Conectadas
          </span>
          <div className="brand-grid">
            {[
              { name: "Copelmi", src: "/marcas/logo_copelmi_rio_grande_do_sul.webp", scale: 1.35 },
              { name: "Termolar", src: "/marcas/termolar_porto_alegre_rio_grande_do_sul_fabian_baldovino_producao_audiovisual.webp" },
              { name: "PUC RS", src: "/marcas/logo_puc_rs.webp", scale: 1.4 },
              { name: "Quick House", src: "/marcas/logo_quick_house_canoas_rio_grande_do_sul.webp", scale: 1.25 },
              { name: "Fábrica de Suplementos", src: "/marcas/FABIRCA_DE_SUPLEMENTOS.webp", scale: 1.2 },
              { name: "Kolosh", src: "/marcas/logo_kolosh_poa_rs.webp", scale: 0.75 },
              { name: "Seival Sul Mineração", src: "/marcas/logo_seival_sul_mineracao_rs.webp", scale: 0.8 },
              { name: "Prefeitura de Canoas", src: "/marcas/logo_Prefeitura_de_canoas_rio_grande_do_sul.webp" },
              { name: "Mercato", src: "/marcas/logo_mercato_rio_grande_do_sul.webp" },
              { name: "Wedy Nutrition", src: "/marcas/logo_wedy_nutrition_brasil.webp", scale: 0.7 },
              { name: "BPM Society", src: "/marcas/logo_bpmsociety_brasil.png", scale: 0.7 },
              { name: "Vita Minimalista", src: "/marcas/logo_vita_minimalista_porto_alegre_rs.webp" }
            ].map((client) => (
              <div key={client.name} className="brand-item">
                <Image 
                  src={client.src} 
                  alt={`${client.name}: Empresa atendida pela metodologia O Código Brasil`} 
                  width={200}
                  height={100}
                  style={{ '--logo-scale': client.scale || 1 } as React.CSSProperties}
                  className="brand-grid__logo"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fundamental Principles */}
      <section id="manifesto" className="section container">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
          <div className="badge-luxury" style={{ marginBottom: '1rem' }}>
            Os 4 Pilares do Método
          </div>
          <h2 className="text-title" style={{ margin: 0 }}>O Que Você Vai Descobrir</h2>
          <p className="text-body" style={{ margin: '0.75rem auto 0', color: 'var(--text-muted)' }}>
            Princípios práticos para remodelar a comunicação e o posicionamento da sua empresa no mercado brasileiro.
          </p>
        </div>
        
        <div className="pillars-grid">
          <div className="pillar-card">
            <span className="pillar-num">01</span>
            <h3 className="pillar-title">O Fim da Frieza</h3>
            <p className="pillar-desc">
              Como parar de vender atributos técnicos (lógica pura) e começar a entregar a resolução afetiva que o cliente realmente busca (o alívio).
            </p>
          </div>

          <div className="pillar-card">
            <span className="pillar-num">02</span>
            <h3 className="pillar-title">O Efeito WhatsApp</h3>
            <p className="pillar-desc">
              Por que o consumidor brasileiro escolhe conversar com um atendente real antes de passar o cartão em um formulário automatizado perfeito.
            </p>
          </div>

          <div className="pillar-card">
            <span className="pillar-num">03</span>
            <h3 className="pillar-title">A Marca &quot;Padrinho&quot;</h3>
            <p className="pillar-desc">
              A transição do discurso egocêntrico para a postura de guardião da jornada do cliente, gerando lealdade inabalável.
            </p>
          </div>

          <div className="pillar-card">
            <span className="pillar-num">04</span>
            <h3 className="pillar-title">O Design de Confiança</h3>
            <p className="pillar-desc">
              Como cores, botões, micro-interações e espaçamento informam ao cérebro inconsciente, em 50 milissegundos, se o seu site é acolhedor ou perigoso.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ / Quebra de Objeções */}
      <section id="faq" className="section container">
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="badge-luxury" style={{ marginBottom: '0.75rem' }}>
              Transparência
            </div>
            <h2 className="text-title" style={{ margin: 0 }}>Perguntas Frequentes</h2>
          </div>

          <div className="faq-list">
            {faqData.map((faq, index) => (
              <details key={index} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <AuthorBio />


      <ProductDetails />
      <Testimonials />

      {/* Call to Action Final */}
      <section id="comprar" className="section container" style={{ paddingTop: '2rem' }}>
        <div className="conversion-box">
          <div className="badge-luxury" style={{ marginBottom: '1.25rem' }}>
            Acesso ao Documento Oficial
          </div>

          <h2 className="text-title" style={{ maxWidth: '650px', margin: '0 auto' }}>
            Entenda o Código do Consumo Brasileiro
          </h2>

          <p className="text-body" style={{ margin: '1.25rem auto 2.25rem', maxWidth: '640px', color: 'var(--text-muted)' }}>
            Adquira o manifesto e aplique a tese que transforma a hostilidade da rua no conforto acolhedor da casa, convertendo empatia em faturamento sustentável.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%', maxWidth: '380px' }}>
            <a 
              href="https://pay.hotmart.com/C107804167U" 
              className="btn-hero"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Quero o manifesto: checkout seguro na Hotmart"
            >
              <span>Quero o manifesto</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                🔒 Pagamento Criptografado
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>•</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                7 Dias de Garantia
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

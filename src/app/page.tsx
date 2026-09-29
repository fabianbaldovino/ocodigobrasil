export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "O Código Brasil — Manifesto",
            "image": "/o_codigo_brasil.png",
            "brand": { "@type": "Brand", "name": "O Código Brasil" },
            "offers": { "@type": "Offer", "priceCurrency": "BRL", "url": "https://pay.hotmart.com/C107804167U" }
          })
        }}
      />
      {/* Hero Section */}
      <section className="section container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div className="flex-col hero-text-col">
            <h1 className="text-huge" style={{ margin: '0', display: 'flex', flexDirection: 'column' }}>
              <span>O CÓDIGO</span>
              <span style={{ fontSize: '1.35em', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.02em', color: 'var(--accent)' }}>BRASIL</span>
            </h1>
            <p className="text-subtitle" style={{ marginTop: '2rem', color: 'var(--accent)' }}>
              O segredo para vender no mercado mais emocional do mundo.
            </p>
            <p className="text-body" style={{ marginTop: '2rem', fontSize: '1.25rem' }}>
              Esqueça as regras americanas de marketing. Descubra por que o brasileiro não compra o &quot;melhor produto&quot;, mas sim a marca que faz ele se sentir protegido e em casa.
            </p>
            <div style={{ marginTop: '3rem' }}>
              <a href="#contato" className="btn-hero" aria-label="Rolar para a seção de contato e destravar o código">
                QUERO DESTRAVAR O CÓDIGO AGORA
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/o_codigo_brasil.png" alt="Livro O Código Brasil — manifesto sobre o consumo brasileiro" width={400} height={533} fetchPriority="high" decoding="async" className="hero-book" />
          </div>
        </div>
      </section>

      {/* The Thesis / Vision Section */}
      <section id="tese" className="section container">
        <div className="grid-2">
          <div className="flex-col">
            <h2 className="text-title">POR QUE VOCÊ ESTÁ PERDENDO VENDAS?</h2>
            <div style={{ width: '100%', height: '400px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginTop: '2rem', boxShadow: 'var(--shadow-1)' }}>
              <img 
                src="/fabian_baldovino_producao_poa_rs.jpg" 
                alt="Fabian Baldovino Produção" 
                width={800} height={400}
                loading="lazy" decoding="async"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  filter: 'grayscale(20%)'
                }} 
              />
            </div>
          </div>
          <div className="flex-col gap-md">
            <p style={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.4, color: 'var(--foreground)', letterSpacing: '-0.01em' }}>
              Você já percebeu que ter o melhor produto ou o menor preço muitas vezes não garante a venda no Brasil?
            </p>
            <p className="text-body" style={{ fontSize: '1.125rem', opacity: 0.85, lineHeight: 1.7 }}>
              Isso acontece por um motivo simples: o brasileiro morre de medo de ser enganado por &quot;sistemas frios&quot; ou empresas impessoais. Para se proteger, ele só dá o seu dinheiro para marcas que agem como um parceiro de confiança.
            </p>
            <p className="text-body" style={{ fontSize: '1.125rem', opacity: 0.85, lineHeight: 1.7 }}>
              Se o seu marketing tenta ser &quot;chique&quot;, difícil e cheio de palavras técnicas, o cliente foge. Ele quer clareza, sorriso e a certeza de que você não vai abandoná-lo depois da compra.
            </p>
            <div style={{ borderLeft: '4px solid var(--accent)', paddingLeft: '1.5rem', marginTop: '1rem' }}>
              <p className="text-body" style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--foreground)' }}>
                O brasileiro compra proximidade, história e confiança. Se a sua marca não se posiciona como o verdadeiro &apos;padrinho&apos; da jornada dele, você continuará perdendo vendas para concorrentes piores, mas que sabem fazer o cliente se sentir em casa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" aria-hidden="true" />
      </div>

      {/* Quem decodificou o Brasil? */}
      <section id="autoridade" className="section container">
        <div className="grid-2" style={{ alignItems: 'stretch', gap: '4rem' }}>
          
          {/* Foto de Autoridade (50%) */}
          <div style={{ width: '100%', position: 'relative' }}>
            <img src="/fabian_baldovino_producao_audiovisual_porto_alegre.png" alt="Fabian Baldovino" width={600} height={800} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-lg)', objectFit: 'cover', objectPosition: 'center', boxShadow: 'var(--shadow-1)' }} />
          </div>
          
          {/* Bio e Marcas (50%) */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <h2 className="text-title" style={{ margin: 0, fontSize: '2.5rem', lineHeight: 1 }}>Fabian Baldovino</h2>
              <p style={{ margin: 0, color: 'var(--accent)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Autor & Estrategista Visual
              </p>
            </div>
            
            <div className="flex-col gap-sm">
              <p className="text-body" style={{ color: 'var(--foreground)', fontSize: '1rem', lineHeight: 1.6, opacity: 0.9, margin: 0 }}>
                Com sólida base em Ciências Sociais, Filosofia e Pedagogia, Fabian atua como a retaguarda invisível de grandes negócios, dominando a arquitetura de percepção que blinda marcas no mercado.
              </p>
              <p className="text-body" style={{ color: 'var(--foreground)', fontSize: '1rem', lineHeight: 1.6, opacity: 0.9, margin: 0 }}>
                Além de orquestrar estratégias cinematográficas e narrativas para o setor privado, Fabian possui um profundo histórico de impacto social e elaboração de políticas públicas. Seus trabalhos contam com o reconhecimento ostensivo da grande mídia – chancelados por veículos como <strong>Zero Hora</strong>, <strong>Carta Capital</strong> e <strong>Correio do Povo</strong> –, e com atuações de destaque junto à <strong>Prefeitura de Porto Alegre</strong>, <strong>Câmara Municipal</strong> e na esfera acadêmica como palestrante na <strong>UFRGS</strong>.
              </p>
              <p className="text-body" style={{ color: 'var(--foreground)', fontSize: '1rem', lineHeight: 1.6, opacity: 0.9, margin: 0 }}>
                Foi essa vivência íntima e irrestrita com a realidade popular que o permitiu decodificar a emoção de compra e os medos do povo brasileiro como ninguém. Hoje, ele ajuda marcas a abandonarem os sistemas frios para se tornarem líderes incontestáveis.
              </p>
            </div>

            {/* Marcas - Grid de Logos (Premium Monocromático) */}
            <div className="flex-col" style={{ gap: '1.5rem', marginTop: '1rem' }}>
              <h3 className="text-title" style={{ fontSize: '0.875rem', margin: 0, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Marcas Parceiras
              </h3>
              <div className="brand-grid">
                {[
                  { name: "Fábrica de Suplementos", src: "/marcas/FABIRCA_DE_SUPLEMENTOS.png" },
                  { name: "Prefeitura de Canoas", src: "/marcas/logo_Prefeitura_de_canoas_rio_grande_do_sul.png" },
                  { name: "BPM Society", src: "/marcas/logo_bpmsociety_brasil.png" },
                  { name: "Copelmi", src: "/marcas/logo_copelmi_rio_grande_do_sul.png" },
                  { name: "Kolosh", src: "/marcas/logo_kolosh_poa_rs.png" },
                  { name: "Mercato", src: "/marcas/logo_mercato_rio_grande_do_sul.png" },
                  { name: "PUC RS", src: "/marcas/logo_puc_rs.png" },
                  { name: "Quick House", src: "/marcas/logo_quick_house_canoas_rio_grande_do_sul.png" },
                  { name: "Seival Sul Mineração", src: "/marcas/logo_seival_sul_mineracao_rs.png" },
                  { name: "Vita Minimalista", src: "/marcas/logo_vita_minimalista_porto_alegre_rs.png" },
                  { name: "Wedy Nutrition", src: "/marcas/logo_wedy_nutrition_brasil.png" }
                ].map((client) => (
                  <img 
                    key={client.name}
                    src={client.src} 
                    alt={`Logo da marca parceira ${client.name}`} 
                    width={90}
                    height={30}
                    loading="lazy"
                    decoding="async"
                    className="brand-grid__logo"
                  />
                ))}
              </div>
            </div>

          </div>
          
        </div>
      </section>

      <div className="container">
        <hr className="divider" aria-hidden="true" />
      </div>

      {/* Fundamental Principles */}
      <section id="manifesto" className="section container">
        <h2 className="text-title" style={{ marginBottom: '4rem', textAlign: 'center' }}>O QUE VOCÊ VAI DESCOBRIR</h2>
        
        <div className="grid-2" style={{ gap: '4rem 6rem' }}>
          <div style={{ borderTop: '2px solid rgba(0,0,0,0.1)', paddingTop: '2rem' }}>
            <h3 className="text-title" style={{ fontSize: '2.5rem', margin: 0, color: 'var(--accent)' }}>01</h3>
            <p style={{ fontWeight: 900, fontSize: '1.25rem', marginTop: '1rem', textTransform: 'uppercase' }}>O Fim da Frieza</p>
            <p className="text-body" style={{ fontSize: '1.125rem', marginTop: '0.5rem', opacity: 0.85, lineHeight: 1.6 }}>Como parar de tentar vender características chatas (a lógica) e começar a vender a resolução emocional do seu cliente (o alívio).</p>
          </div>
          <div style={{ borderTop: '2px solid rgba(0,0,0,0.1)', paddingTop: '2rem' }}>
            <h3 className="text-title" style={{ fontSize: '2.5rem', margin: 0, color: 'var(--accent)' }}>02</h3>
            <p style={{ fontWeight: 900, fontSize: '1.25rem', marginTop: '1rem', textTransform: 'uppercase' }}>O Efeito WhatsApp</p>
            <p className="text-body" style={{ fontSize: '1.125rem', marginTop: '0.5rem', opacity: 0.85, lineHeight: 1.6 }}>Por que as pessoas no Brasil preferem muito mais falar com um humano no WhatsApp do que usar um sistema automático perfeito.</p>
          </div>
          <div style={{ borderTop: '2px solid rgba(0,0,0,0.1)', paddingTop: '2rem' }}>
            <h3 className="text-title" style={{ fontSize: '2.5rem', margin: 0, color: 'var(--accent)' }}>03</h3>
            <p style={{ fontWeight: 900, fontSize: '1.25rem', marginTop: '1rem', textTransform: 'uppercase' }}>A Marca &quot;Padrinho&quot;</p>
            <p className="text-body" style={{ fontSize: '1.125rem', marginTop: '0.5rem', opacity: 0.85, lineHeight: 1.6 }}>A técnica para parar de focar no seu próprio umbigo e se tornar o verdadeiro guia e protetor da história do cliente.</p>
          </div>
          <div style={{ borderTop: '2px solid rgba(0,0,0,0.1)', paddingTop: '2rem' }}>
            <h3 className="text-title" style={{ fontSize: '2.5rem', margin: 0, color: 'var(--accent)' }}>04</h3>
            <p style={{ fontWeight: 900, fontSize: '1.25rem', marginTop: '1rem', textTransform: 'uppercase' }}>O Design de Confiança</p>
            <p className="text-body" style={{ fontSize: '1.125rem', marginTop: '0.5rem', opacity: 0.85, lineHeight: 1.6 }}>Como as cores, os botões e até a fonte do seu site dizem ao cliente, em milissegundos, se você é amigo ou inimigo.</p>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" aria-hidden="true" />
      </div>

      {/* FAQ / Quebra de Objeções */}
      <section id="faq" className="section container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="text-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>PERGUNTAS FREQUENTES</h2>
          <div className="flex-col gap-sm">
            <details className="faq-item">
              <summary>
                Isso serve para negócios físicos e serviços?
              </summary>
              <p className="text-body" style={{ marginTop: '1rem', opacity: 0.85 }}>
                Sim. Seja você dono de uma loja física, de uma clínica, ou prestador de serviços online, o comportamento emocional do consumidor brasileiro é o mesmo. O manifesto ensina como adaptar essa conexão para o seu cenário específico.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                Como recebo o manifesto?
              </summary>
              <p className="text-body" style={{ marginTop: '1rem', opacity: 0.85 }}>
                Logo após a confirmação do pagamento, você receberá o acesso imediato ao material completo diretamente no seu e-mail, podendo ler no celular, tablet ou computador.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                E se eu não gostar?
              </summary>
              <p className="text-body" style={{ marginTop: '1rem', opacity: 0.85 }}>
                Você está protegido pela nossa garantia blindada. Se o conteúdo não explodir a sua cabeça ou você achar que não serve para o seu momento, basta nos enviar um e-mail em até 7 dias que devolvemos 100% do seu investimento.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="contato" className="section container flex-col" style={{ alignItems: 'center', textAlign: 'center', padding: '8rem 0' }}>
        <img src="/o_codigo_brasil.png" alt="Livro O Código Brasil" style={{ width: '100%', maxWidth: '250px', height: 'auto', borderRadius: '12px', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.1))', marginBottom: '3rem' }} />
        <h2 className="text-title">DESTRAVE O CÓDIGO DA SUA MARCA</h2>
        <p className="text-body" style={{ margin: '2rem 0', maxWidth: '800px' }}>
          Tenha acesso ao livro digital completo e descubra o método exato para transformar a sua marca no lugar mais seguro e lucrativo para o seu cliente.
        </p>
        
        {/* Bonus / Anchoring (Ocultado Temporariamente) 
        <div style={{ background: 'var(--surface)', padding: '1.5rem 2.5rem', borderRadius: '8px', marginBottom: '2.5rem', display: 'inline-flex', alignItems: 'center', gap: '1rem', border: '1px solid rgba(194, 48, 26, 0.2)' }}>
          <div style={{ width: '24px', height: '24px', background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '0.8rem' }}>✓</div>
          <p style={{ margin: 0, fontWeight: 600, color: 'var(--foreground)' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 900 }}>BÔNUS EXCLUSIVO:</span> Garanta hoje e receba também o Mapa Visual do 'Efeito WhatsApp'.
          </p>
        </div>
        */}

        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="https://pay.hotmart.com/C107804167U" className="btn-hero" aria-label="Prosseguir para o checkout seguro na Hotmart e comprar o manifesto agora">
            COMPRAR O MANIFESTO AGORA
          </a>
        </div>
        <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          🔒 Pagamento 100% Seguro. Acesso Imediato.
        </p>
      </section>
    </main>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { faqData } from '@/lib/faqData';

/** Capítulos 10 e 11 da nova home: o Código na cultura, quem decodificou o Código e as perguntas frequentes. */

const ARTIGOS = [
  { slug: 'o-case-havaianas', titulo: 'O Case Havaianas', texto: 'Como a borracha virou ouro hackeando o inconsciente brasileiro.' },
  { slug: 'o-fenomeno-nubank', titulo: 'O Fenômeno Nubank', texto: 'Ele transformou a pior experiência da Rua no acolhimento da Casa.' },
  { slug: 'o-fenomeno-carmed-fini', titulo: 'A histeria da Carmed Fini', texto: 'O brasileiro não comprou hidratação labial: comprou o pertencimento.' },
  { slug: 'o-que-a-festa-significa-para-o-brasileiro', titulo: 'O que a festa significa', texto: 'A festa é o lugar onde a Rua vira Casa.' },
  { slug: 'culto-do-suor-crossfit', titulo: 'O Culto do Suor', texto: 'Quem pratica CrossFit não compra saúde: compra uma tribo.' },
  { slug: 'politica-e-eleicoes-2026', titulo: 'Política e Eleições 2026', texto: 'Tratamos o futuro do país como um clássico de domingo.' },
];

// escala visual de cada logo (compensa o respiro que cada arquivo traz); "pal" = logo claro, feito para fundo escuro
const MARCAS: { nome: string; src: string; escala: number; pal?: boolean }[] = [
  { nome: 'Copelmi', src: 'logo_copelmi_rio_grande_do_sul.webp', escala: 1.35 },
  { nome: 'Termolar', src: 'termolar_porto_alegre_rio_grande_do_sul_fabian_baldovino_producao_audiovisual.webp', escala: 1 },
  { nome: 'PUC RS', src: 'logo_puc_rs.webp', escala: 1.4 },
  { nome: 'Quick House', src: 'logo_quick_house_canoas_rio_grande_do_sul.webp', escala: 1.25, pal: true },
  { nome: 'Fábrica de Suplementos', src: 'FABIRCA_DE_SUPLEMENTOS.webp', escala: 1.2, pal: true },
  { nome: 'Kolosh', src: 'logo_kolosh_poa_rs.webp', escala: 0.85 },
  { nome: 'Seival Sul Mineração', src: 'logo_seival_sul_mineracao_rs.webp', escala: 0.9 },
  { nome: 'Prefeitura de Canoas', src: 'logo_Prefeitura_de_canoas_rio_grande_do_sul.webp', escala: 1 },
  { nome: 'Mercato', src: 'logo_mercato_rio_grande_do_sul.webp', escala: 1, pal: true },
  { nome: 'Wedy Nutrition', src: 'logo_wedy_nutrition_brasil.webp', escala: 0.8, pal: true },
  { nome: 'BPM Society', src: 'logo_bpmsociety_brasil.png', escala: 0.8, pal: true },
  { nome: 'Vita Minimalista', src: 'logo_vita_minimalista_porto_alegre_rs.webp', escala: 1 },
];

const BIO =
  'Fabian Baldovino é uruguaio e vive em Porto Alegre (RS). Autodidata, estuda por conta própria Ciências Sociais, Filosofia e Pedagogia. ' +
  'Começou na educação: em 2011 ajudou a criar o projeto Curta nas Escolas, em que alunos de escolas municipais produziram curtas-metragens, e foi palestrante na UFRGS. ' +
  'Depois migrou para o audiovisual e dirigiu a edição de três programas de TV em uma emissora afiliada da Rede Globo. ' +
  'Hoje é brand filmmaker e autor do manifesto O Código Brasil, que nasceu da vivência direta com o cotidiano do consumidor brasileiro.';

export default function HomeSections() {
  return (
    <>
      <section className="cb-fim" id="cultura" aria-labelledby="cultura-titulo">
        <div className="cb-w cb-wide">
          <p className="cb-rot">O Código na cultura</p>
          <h2 id="cultura-titulo">A mesma tese, em marcas e fenômenos que você conhece.</h2>
          <div className="cb-cards">
            {ARTIGOS.map((a) => (
              <Link key={a.slug} className="cb-card" href={`/conteudo/${a.slug}/`}>
                <h3>{a.titulo}</h3>
                <p>{a.texto}</p>
                <span>Ler o artigo →</span>
              </Link>
            ))}
          </div>
          <p className="cb-dica" aria-hidden="true">Deslize para ver mais artigos <span>→</span></p>
        </div>
      </section>

      <section className="cb-fim cb-claro" id="autor" aria-labelledby="autor-titulo">
        <div className="cb-w cb-wide">
          <p className="cb-rot">Quem decodificou o Código</p>
          <div className="cb-autor-grid">
            <div className="cb-a1">
              <div className="cb-autor">
                <Image className="cb-foto" src="/home/fabian-480.webp" alt="Fabian Baldovino" width={112} height={112} />
                <div>
                  <h2 id="autor-titulo">Fabian Baldovino</h2>
                  <p className="cb-papel">Brand filmmaker · Autor do manifesto</p>
                </div>
              </div>
              <p>{BIO}</p>
              <p className="cb-links">
                <a href="https://www.fabian.art.br/sobre" target="_blank" rel="noopener noreferrer">Conheça o trabalho<span className="sr-only"> (abre em nova aba)</span></a>
                {' · '}
                <a href="https://www.linkedin.com/in/fabianbaldovino/" target="_blank" rel="me noopener noreferrer">LinkedIn</a>
                {' · '}
                <a href="https://www.fabian.art.br" target="_blank" rel="noopener noreferrer">fabian.art.br</a>
              </p>
            </div>
            <div className="cb-a2">
              <p className="cb-rot cb-pequeno">Marcas e instituições conectadas</p>
              <div className="cb-marcas">
                {MARCAS.map((m) => (
                  <span key={m.nome} className="cb-m">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={m.pal ? 'cb-pal' : undefined}
                      src={`/marcas/${m.src}`}
                      alt={m.nome}
                      style={{ '--s': m.escala } as React.CSSProperties}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cb-fim cb-claro" id="faq" aria-labelledby="faq-titulo">
        <div className="cb-w cb-wide">
          <p className="cb-rot">Perguntas frequentes</p>
          <h2 id="faq-titulo">O que as pessoas perguntam antes de baixar.</h2>
          <div className="cb-faq">
            {faqData.map((f) => (
              <details key={f.question}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

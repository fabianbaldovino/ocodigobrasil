import Link from 'next/link';
import Image from 'next/image';
import { faqData } from '@/lib/faqData';
import { linkWhatsapp } from '@/data/produto';

/** Depois da travessia: o Diagnóstico com Fabian, a trajetória, as perguntas frequentes e o Código na cultura. */

const ENTREGAS = [
  {
    titulo: 'Diagnóstico & Auditoria Casa × Rua',
    texto: 'Leitura profunda da comunicação e da percepção pública da sua marca.',
    itens: [
      ['Pesquisa de reputação real', 'conflitos e dores em canais públicos (Reclame Aqui, redes) lidos como códigos culturais feridos.'],
      ['Termômetro da comunicação', 'frase a frase, onde a sua narrativa soa fria (Rua) ou acolhedora (Casa).'],
      ['Mapa da jornada', 'os pontos de atrito e hostilidade, da descoberta ao pós-venda.'],
    ],
  },
  {
    titulo: 'Dossiê Estratégico & Tom de Voz',
    texto: 'A sua marca posicionada como porto seguro, com diretrizes narrativas claras.',
    itens: [
      ['Papel da marca e promessa', 'a empresa como fiadora do cliente: o padrinho.'],
      ['Matriz "Diga / Evite"', 'o vocabulário que tira a burocracia e a desconfiança da sua fala.'],
      ['Riscos e plano', 'apresentação executiva com prioridades de 30, 90 e 180 dias e cuidados de CONAR e CDC.'],
    ],
  },
  {
    titulo: 'Estúdio de Peças & Roteiros',
    texto: 'Scripts e peças prontos para vendas, atendimento e marketing.',
    itens: [
      ['Vendas e WhatsApp', 'mensagens comerciais no tom da Casa, sem a frieza de script de robô.'],
      ['Design do perdão no SAC', 'como acolher o cliente no erro e na reclamação, e transformar atrito em lealdade.'],
      ['Vídeo e anúncios', 'fichas de produção audiovisual e variações de anúncio Fazer × Pertencer.'],
    ],
  },
];

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
  'Uruguaio, vive em Porto Alegre (RS). Começou na educação, passou pela TV e hoje faz filmes de marca; ' +
  'O Código Brasil nasceu dessa vivência direta com o cotidiano do consumidor brasileiro.';

const PROVAS = [
  'Ajudou a criar o projeto Curta nas Escolas (2011), noticiado pelo Correio do Povo, pela Prefeitura e pela Câmara Municipal de Porto Alegre.',
  'Palestrante na UFRGS.',
  'Dirigiu a edição de três programas de TV em uma afiliada da Rede Globo e fez a série de filmes Ele não vai embora, para a Termolar.',
];

export default function HomeSections() {
  return (
    <>
      <section className="cb-fim cb-diag" id="diagnostico" aria-labelledby="diagnostico-titulo">
        <div className="cb-w cb-wide cb-diag-grid">
          <div className="cb-diag-voz">
            <h2 id="diagnostico-titulo">Diagnóstico Casa × Rua</h2>
            <blockquote className="cb-diag-frase">
              <p>
                Eu olho a sua marca com os olhos do seu cliente e mostro onde ela soa Rua e onde ela já é <em>Casa</em>.
                A primeira conversa é por minha conta.
              </p>
            </blockquote>
            <div className="cb-autor">
              <Image className="cb-foto" src="/home/fabian-480.webp" alt="Fabian Baldovino" width={112} height={112} />
              <div>
                <p className="cb-nome">Fabian Baldovino</p>
                <p className="cb-papel">Consultor de marca · Autor do Código Brasil</p>
              </div>
            </div>
            <div className="cb-diag-acao">
              <a className="cb-btn cb-grande" href={linkWhatsapp()} target="_blank" rel="noopener noreferrer">
                Conversar com Fabian no WhatsApp<span className="sr-only"> (abre em nova aba)</span>
              </a>
              <p className="cb-diag-nota">A primeira conversa é gratuita e sem compromisso. Você fala direto comigo, sem robô.</p>
            </div>
          </div>

          <ul className="cb-entregas" aria-label="O que a consultoria entrega">
            {ENTREGAS.map((e) => (
              <li key={e.titulo}>
                <details>
                  <summary>
                    <h3>{e.titulo}</h3>
                    <span className="cb-e-texto">{e.texto}</span>
                    <span className="cb-e-mais" aria-hidden="true" />
                  </summary>
                  <ul>
                    {e.itens.map(([nome, desc]) => (
                      <li key={nome}><strong>{nome}:</strong> {desc}</li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cb-fim cb-claro" id="autor" aria-labelledby="autor-titulo">
        <div className="cb-w cb-wide">
          <div className="cb-autor-grid">
            <div className="cb-a1">
              <h2 id="autor-titulo">A trajetória por trás do método</h2>
              <p>{BIO}</p>
              <ul className="cb-provas">
                {PROVAS.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <p className="cb-links">
                <a href="https://www.fabian.art.br/sobre" target="_blank" rel="noopener noreferrer">Conheça o trabalho<span className="sr-only"> (abre em nova aba)</span></a>
                {' · '}
                <a href="https://www.linkedin.com/in/fabianbaldovino/" target="_blank" rel="me noopener noreferrer">LinkedIn</a>
                {' · '}
                <a href="https://www.fabian.art.br" target="_blank" rel="noopener noreferrer">fabian.art.br</a>
              </p>
            </div>
            <div className="cb-a2">
              <p className="cb-rot cb-pequeno">Marcas atendidas no audiovisual</p>
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
          <h2 id="faq-titulo">Antes de baixar ou de conversar.</h2>
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

      <section className="cb-fim cb-claro" id="cultura" aria-labelledby="cultura-titulo">
        <div className="cb-w cb-wide">
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
    </>
  );
}

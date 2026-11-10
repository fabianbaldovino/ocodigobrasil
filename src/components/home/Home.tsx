import Link from 'next/link';
import { faqData } from '@/lib/faqData';
import { linkWhatsapp, produto } from '@/data/produto';
import { MANIFESTO_PDF } from '@/lib/site';
import CasaRuaSlider from './CasaRuaSlider';
import Pilares from './Pilares';
import Reveal from './Reveal';

/**
 * Home: a tese do Código Brasil primeiro (problema, Casa × Rua, fundamentos, pilares),
 * depois a consultoria, o manifesto, os artigos e, só no fim, o autor.
 */

const SINAIS = [
  ['O cliente some depois do orçamento', 'Ele pediu preço, recebeu um PDF e nunca mais respondeu. Faltou alguém do outro lado.'],
  ['Você é comparado só por preço', 'Quando a marca não transmite vínculo, sobra a planilha. E na planilha sempre existe alguém mais barato.'],
  ['O concorrente "mais simpático" leva a venda', 'Mesmo com produto inferior. Ele não venceu na técnica: venceu na confiança.'],
];

const TRADUCOES = [
  {
    onde: 'No atendimento',
    rua: 'Seu protocolo é 48213. O prazo de resposta é de 5 dias úteis.',
    casa: 'Oi, Marina, aqui é o João. Já vi o que aconteceu e resolvo isso hoje.',
  },
  {
    onde: 'Na oferta',
    rua: 'Aço inox, 12 meses de garantia, frete grátis.',
    casa: 'Você não vai precisar pensar nisso de novo. Se der problema, é comigo.',
  },
  {
    onde: 'No erro',
    rua: 'Erro crítico. Senha inválida.',
    casa: 'Ops, a senha não bateu. Quer tentar de novo ou prefere receber um link de acesso?',
  },
  {
    onde: 'No pós-venda',
    rua: 'Pedido concluído. Avalie nosso atendimento de 0 a 10.',
    casa: 'Chegou direitinho? Qualquer coisa, é só me chamar por aqui.',
  },
];

const FUNDAMENTOS = [
  {
    autor: 'Roberto DaMatta',
    obra: 'A Casa & a Rua',
    ideia: 'A Rua é o lugar do indivíduo anônimo, da regra e da fila. A Casa é o lugar da pessoa, do nome e do afeto. O brasileiro vive tentando levar uma para dentro da outra.',
  },
  {
    autor: 'Sérgio Buarque de Holanda',
    obra: 'Raízes do Brasil',
    ideia: 'O homem cordial decide pelo coração (cordis, em latim). Rejeita a impessoalidade e confia em quem constrói vínculo antes de falar de negócio.',
  },
  {
    autor: 'Clotaire Rapaille',
    obra: 'O Código Cultural',
    ideia: 'A primeira reação a uma marca é instintiva e aprendida na cultura. A lógica chega depois, só para justificar o que o instinto já decidiu.',
  },
];

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

const PASSOS = [
  ['Primeira conversa', 'Gratuita e sem compromisso, por mensagens no WhatsApp, direto com Fabian. Serve para entender o seu negócio.'],
  ['Proposta', 'Se fizer sentido para os dois, você recebe uma proposta desenhada para a sua empresa.'],
  ['Trabalho', 'O diagnóstico, o dossiê e as peças são conduzidos pessoalmente por Fabian, do início ao fim.'],
];

const ARTIGOS = [
  { slug: 'o-case-havaianas', titulo: 'O Case Havaianas', texto: 'Como a borracha virou ouro hackeando o inconsciente brasileiro.' },
  { slug: 'o-fenomeno-nubank', titulo: 'O Fenômeno Nubank', texto: 'Ele transformou a pior experiência da Rua no acolhimento da Casa.' },
  { slug: 'o-fenomeno-carmed-fini', titulo: 'A histeria da Carmed Fini', texto: 'O brasileiro não comprou hidratação labial: comprou o pertencimento.' },
  { slug: 'o-que-a-festa-significa-para-o-brasileiro', titulo: 'O que a festa significa', texto: 'A festa é o lugar onde a Rua vira Casa.' },
  { slug: 'culto-do-suor-crossfit', titulo: 'O Culto do Suor', texto: 'Quem pratica CrossFit não compra saúde: compra uma tribo.' },
  { slug: 'politica-e-eleicoes-2026', titulo: 'Política e Eleições 2026', texto: 'Tratamos o futuro do país como um clássico de domingo.' },
];

// logos em silhueta, já recortados (public/marcas-mono); "ar" = proporção largura/altura, usada para dar a todos o mesmo peso visual
const MARCAS: { nome: string; src: string; ar: number }[] = [
  { nome: 'Copelmi', src: 'logo_copelmi_rio_grande_do_sul.webp', ar: 3.23 },
  { nome: 'Termolar', src: 'termolar_porto_alegre_rio_grande_do_sul_fabian_baldovino_producao_audiovisual.webp', ar: 1.69 },
  { nome: 'PUCRS', src: 'logo_puc_rs.webp', ar: 3.92 },
  { nome: 'Quick House', src: 'logo_quick_house_canoas_rio_grande_do_sul.webp', ar: 4.54 },
  { nome: 'Fábrica de Suplementos', src: 'FABIRCA_DE_SUPLEMENTOS.webp', ar: 1.7 },
  { nome: 'Kolosh', src: 'logo_kolosh_poa_rs.webp', ar: 2.51 },
  { nome: 'Seival Sul Mineração', src: 'logo_seival_sul_mineracao_rs.webp', ar: 1.86 },
  { nome: 'Prefeitura de Canoas', src: 'logo_Prefeitura_de_canoas_rio_grande_do_sul.webp', ar: 2.53 },
  { nome: 'Mercato', src: 'logo_mercato_rio_grande_do_sul.webp', ar: 6.76 },
  { nome: 'Wedy Nutrition', src: 'logo_wedy_nutrition_brasil.webp', ar: 2.01 },
  { nome: 'BPM Society', src: 'logo_bpmsociety_brasil.webp', ar: 1.3 },
  { nome: 'Vita Minimalista', src: 'logo_vita_minimalista_porto_alegre_rs.webp', ar: 5.11 },
];

const PROVAS = [
  ['2011', 'Ajudou a criar o projeto Curta nas Escolas, noticiado pelo Correio do Povo, pela Prefeitura e pela Câmara Municipal de Porto Alegre.'],
  ['UFRGS', 'Palestrante na Universidade Federal do Rio Grande do Sul.'],
  ['TV', 'Dirigiu a edição de três programas em uma emissora afiliada da Rede Globo.'],
  ['Marcas', 'Dirigiu a série de filmes Ele não vai embora, para a Termolar, entre outros filmes de marca.'],
];

function Seta() {
  return (
    <svg className="cb-seta" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function BotaoConversa({ children = 'Conversar com Fabian no WhatsApp' }: { children?: React.ReactNode }) {
  return (
    <a className="cb-btn cb-btn--primario" href={linkWhatsapp()} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
      <Seta />
    </a>
  );
}

function Cabeca({ num, rotulo }: { num: string; rotulo: string }) {
  return (
    <p className="cb-rotulo"><span className="cb-num">{num}</span>{rotulo}</p>
  );
}

export default function Home() {
  return (
    <>
      <Reveal />

      {/* Abertura */}
      <section className="cb-hero" aria-labelledby="hero-titulo">
        <div className="cb-w">
          <p className="cb-rotulo cb-rotulo--solto">Consultoria de marca para o mercado brasileiro</p>
          <h1 id="hero-titulo">
            O brasileiro não compra o melhor produto. Compra de quem o faz <em>sentir em casa.</em>
          </h1>
          <div className="cb-hero-base">
            <p className="cb-lead">
              O Código Brasil é um método de leitura cultural do consumidor brasileiro. Com ele, Fabian Baldovino mostra onde a
              sua marca soa fria e distante, e reposiciona a comunicação para gerar confiança, preferência e lealdade.
            </p>
            <div className="cb-hero-acoes">
              <BotaoConversa>Pedir o Diagnóstico Casa × Rua</BotaoConversa>
              <a className="cb-btn cb-btn--linha" href={MANIFESTO_PDF} download>
                Baixar o manifesto <span className="cb-btn-meta">PDF grátis</span>
              </a>
              <p className="cb-nota">A primeira conversa é gratuita e sem compromisso, direto com Fabian.</p>
            </div>
          </div>
        </div>
        <div className="cb-w cb-w--larga">
          <CasaRuaSlider />
        </div>
      </section>

      {/* 01 · O problema */}
      <section className="cb-sec" id="problema" aria-labelledby="problema-titulo">
        <div className="cb-w cb-grade">
          <Cabeca num="01" rotulo="O problema" />
          <div className="cb-corpo">
            <h2 id="problema-titulo" data-reveal>Melhor produto. Menor preço.<br /><em>E mesmo assim, não vende.</em></h2>
            <p className="cb-lead" data-reveal>
              Os manuais de marketing que usamos foram escritos para culturas que decidem por eficiência. No Brasil, a decisão
              vem antes da razão: em milissegundos, o cliente sente se a sua marca é ameaça ou abrigo. Só depois ele procura
              argumentos.
            </p>
            <ol className="cb-sinais">
              {SINAIS.map(([titulo, texto], i) => (
                <li key={titulo} data-reveal>
                  <span className="cb-num">{String.fromCharCode(97 + i)}</span>
                  <h3>{titulo}</h3>
                  <p>{texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 02 · A tese */}
      <section className="cb-sec cb-noite" id="metodo" aria-labelledby="tese-titulo">
        <div className="cb-w cb-grade">
          <Cabeca num="02" rotulo="A tese" />
          <div className="cb-corpo">
            <blockquote className="cb-tese" data-reveal>
              <p id="tese-titulo">
                Todo ato de consumo no Brasil é uma tentativa de trocar a frieza da <span className="cb-rua">Rua</span> pela
                segurança da <em>Casa.</em>
              </p>
            </blockquote>
            <div className="cb-duas" data-reveal>
              <p>
                <strong>Na Rua</strong> somos indivíduos: senha, fila, regra, protocolo. É o ambiente em que ninguém nos
                conhece e onde é prudente desconfiar.
              </p>
              <p>
                <strong>Na Casa</strong> somos pessoas: nome, afeto, palavra dada. É onde relaxamos, confiamos e voltamos.
                A marca que consegue ser Casa deixa de disputar preço.
              </p>
            </div>

            <div className="cb-tradutor" data-reveal>
              <div className="cb-tradutor-topo" aria-hidden="true">
                <span />
                <span className="cb-t-rua">Como soa na Rua</span>
                <span className="cb-t-casa">Como soa na Casa</span>
              </div>
              {TRADUCOES.map((t) => (
                <div className="cb-tradutor-linha" key={t.onde}>
                  <h3>{t.onde}</h3>
                  <p className="cb-t-rua"><span className="sr-only">Na Rua: </span>{t.rua}</p>
                  <p className="cb-t-casa"><span className="sr-only">Na Casa: </span>{t.casa}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 · Fundamentos */}
      <section className="cb-sec" id="fundamentos" aria-labelledby="fundamentos-titulo">
        <div className="cb-w cb-grade">
          <Cabeca num="03" rotulo="Fundamentos" />
          <div className="cb-corpo">
            <h2 id="fundamentos-titulo" data-reveal>Um método com base, <em>não um palpite.</em></h2>
            <p className="cb-lead" data-reveal>
              O Código Brasil cruza a antropologia do consumo com a prática de quem dirige comunicação de marca todos os dias.
              Três leituras sustentam a tese.
            </p>
            <div className="cb-fundamentos">
              {FUNDAMENTOS.map((f) => (
                <article key={f.autor} data-reveal>
                  <h3>{f.autor}</h3>
                  <p className="cb-obra">{f.obra}</p>
                  <p>{f.ideia}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 · Os quatro pilares */}
      <section className="cb-sec cb-sec--faixa" id="pilares" aria-labelledby="pilares-titulo">
        <div className="cb-w cb-grade">
          <Cabeca num="04" rotulo="Os quatro pilares" />
          <div className="cb-corpo">
            <h2 id="pilares-titulo" data-reveal>Como a tese vira <em>decisão de marca.</em></h2>
          </div>
        </div>
        <div className="cb-w" data-reveal>
          <Pilares />
        </div>
      </section>

      {/* 05 · A consultoria */}
      <section className="cb-sec" id="consultoria" aria-labelledby="consultoria-titulo">
        <span id="diagnostico" className="cb-ancora" />
        <div className="cb-w cb-grade">
          <Cabeca num="05" rotulo="A consultoria" />
          <div className="cb-corpo">
            <h2 id="consultoria-titulo" data-reveal>Diagnóstico Casa × Rua: da leitura da marca <em>à peça pronta.</em></h2>
            <p className="cb-lead" data-reveal>
              Para donos de clínicas, lojas, indústrias e empresas de serviço que sentem que perdem vendas mesmo entregando
              mais. O trabalho acontece em três entregas, conduzidas diretamente por Fabian.
            </p>
          </div>
        </div>
        <div className="cb-w">
          <ol className="cb-entregas">
            {ENTREGAS.map((e, i) => (
              <li key={e.titulo} data-reveal>
                <span className="cb-num">0{i + 1}</span>
                <h3>{e.titulo}</h3>
                <p className="cb-entrega-texto">{e.texto}</p>
                <ul>
                  {e.itens.map(([nome, desc]) => (
                    <li key={nome}><strong>{nome}</strong> {desc}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="cb-comeco" data-reveal>
            <div className="cb-comeco-texto">
              <h3>Como começa</h3>
              <ol>
                {PASSOS.map(([titulo, texto]) => (
                  <li key={titulo}><strong>{titulo}.</strong> {texto}</li>
                ))}
              </ol>
            </div>
            <div className="cb-comeco-acao">
              <BotaoConversa />
              <p className="cb-nota">Você fala direto com Fabian, sem robô e sem formulário.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 · O manifesto */}
      <section className="cb-sec cb-sec--faixa" id="manifesto" aria-labelledby="manifesto-titulo">
        <span id="baixar" className="cb-ancora" />
        <div className="cb-w cb-grade">
          <Cabeca num="06" rotulo="O manifesto" />
          <div className="cb-corpo cb-manifesto" data-reveal>
            <div className="cb-manifesto-capa">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/capa_manifesto_o_codigo_brasil_fabian_baldovino.webp"
                alt="Capa do manifesto O Código Brasil, de Fabian Baldovino"
                width={720}
                height={960}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div>
              <h2 id="manifesto-titulo">Leia a tese completa <em>antes de decidir.</em></h2>
              <p className="cb-lead">
                O manifesto O Código Brasil reúne o diagnóstico cultural e os quatro pilares do método. É a melhor forma de
                avaliar a tese com calma.
              </p>
              <dl className="cb-ficha">
                <div><dt>Formato</dt><dd>{produto.formato}</dd></div>
                <div><dt>Extensão</dt><dd>{produto.paginas}</dd></div>
                <div><dt>Leitura</dt><dd>{produto.tempoDeLeitura}</dd></div>
                <div><dt>Acesso</dt><dd>Gratuito, sem cadastro</dd></div>
              </dl>
              <a
                className="cb-btn cb-btn--escuro"
                href={MANIFESTO_PDF}
                download
                aria-label="Baixar o manifesto O Código Brasil gratuitamente (PDF)"
              >
                Baixar o manifesto
                <svg className="cb-seta" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4v13M6 12l6 6 6-6M5 21h14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 07 · O Código na cultura */}
      <section className="cb-sec" id="cultura" aria-labelledby="cultura-titulo">
        <div className="cb-w cb-grade">
          <Cabeca num="07" rotulo="O Código na cultura" />
          <div className="cb-corpo">
            <h2 id="cultura-titulo" data-reveal>A mesma tese, em marcas e fenômenos <em>que você conhece.</em></h2>
            <ul className="cb-artigos">
              {ARTIGOS.map((a) => (
                <li key={a.slug} data-reveal>
                  <Link href={`/conteudo/${a.slug}/`}>
                    <h3>{a.titulo}</h3>
                    <p>{a.texto}</p>
                    <Seta />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="cb-mais" data-reveal>
              <Link href="/conteudo/">Ver todos os artigos <Seta /></Link>
            </p>
          </div>
        </div>
      </section>

      {/* 08 · Quem conduz */}
      <section className="cb-sec cb-sec--faixa" id="autor" aria-labelledby="autor-titulo">
        <div className="cb-w cb-grade">
          <Cabeca num="08" rotulo="Quem conduz" />
          <div className="cb-corpo cb-autor">
            <div className="cb-autor-foto" data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/home/fabian-1000.webp" alt="Retrato de Fabian Baldovino" width={1000} height={1000} loading="lazy" decoding="async" />
            </div>
            <div className="cb-autor-texto" data-reveal>
              <h2 id="autor-titulo">Fabian Baldovino</h2>
              <p className="cb-autor-papel">Consultor de marca, brand filmmaker e autor de O Código Brasil</p>
              <p>
                Uruguaio, vive em Porto Alegre (RS). Começou na educação, passou pela televisão e hoje dirige filmes de marca.
                O Código Brasil nasceu dessa vivência direta com o cotidiano do consumidor brasileiro, vista com o olhar de
                quem veio de fora.
              </p>
              <dl className="cb-provas">
                {PROVAS.map(([quando, o]) => (
                  <div key={quando}><dt>{quando}</dt><dd>{o}</dd></div>
                ))}
              </dl>
              <p className="cb-links">
                <a href="https://www.fabian.art.br/sobre" target="_blank" rel="noopener noreferrer">Trajetória completa<span className="sr-only"> (abre em nova aba)</span></a>
                <a href="https://www.fabian.art.br" target="_blank" rel="noopener noreferrer">Portfólio<span className="sr-only"> (abre em nova aba)</span></a>
                <a href="https://www.linkedin.com/in/fabianbaldovino/" target="_blank" rel="me noopener noreferrer">LinkedIn<span className="sr-only"> (abre em nova aba)</span></a>
              </p>
            </div>
          </div>
        </div>
        <div className="cb-w cb-marcas-bloco" data-reveal>
          <p className="cb-rotulo cb-rotulo--solto">Marcas e instituições atendidas no audiovisual</p>
          <ul className="cb-marcas">
            {MARCAS.map((m) => (
              <li key={m.nome}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/marcas-mono/${m.src}`}
                  alt={m.nome}
                  style={{ '--k': Math.sqrt(m.ar).toFixed(3) } as React.CSSProperties}
                  loading="lazy"
                  decoding="async"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 09 · Perguntas frequentes */}
      <section className="cb-sec" id="faq" aria-labelledby="faq-titulo">
        <div className="cb-w cb-grade">
          <Cabeca num="09" rotulo="Perguntas frequentes" />
          <div className="cb-corpo">
            <h2 id="faq-titulo" data-reveal>Antes de conversar.</h2>
            <div className="cb-faq">
              {faqData.map((f) => (
                <details key={f.question}>
                  <summary>{f.question}</summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Convite final */}
      <section className="cb-sec cb-noite cb-final" aria-labelledby="final-titulo">
        <div className="cb-w">
          <h2 id="final-titulo" data-reveal>Vamos descobrir onde a sua marca ainda é Rua, <em>e abrir a Casa?</em></h2>
          <div className="cb-final-acoes" data-reveal>
            <BotaoConversa />
            <a className="cb-btn cb-btn--linha" href={MANIFESTO_PDF} download>
              Baixar o manifesto <span className="cb-btn-meta">PDF grátis</span>
            </a>
          </div>
          <p className="cb-nota" data-reveal>A primeira conversa é gratuita e sem compromisso, por mensagens no WhatsApp.</p>
        </div>
      </section>
    </>
  );
}

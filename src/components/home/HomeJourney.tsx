'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { MANIFESTO_PDF } from '@/lib/site';

/**
 * A travessia da Rua para a Casa: capítulos 0 a 9 da nova home.
 * Cada capítulo é uma "câmera presa" (sticky) com texto por cima. Cada fase do texto é um ponto de
 * parada do navegador (scroll-snap), então um gesto, por forte que seja, avança só uma fase.
 * Todo o texto continua como texto de verdade no HTML; as imagens são só imagens.
 */

type Chapter = {
  id: string;
  label: string;
  img: string;
  alt: string;
  hook?: 'ms' | 'cortina';
  priority?: boolean;
  steps: ReactNode[];
};

function Picture({ name, alt, priority }: { name: string; alt: string; priority?: boolean }) {
  return (
    <picture>
      <source media="(max-width:700px)" srcSet={`/home/${name}_9x16.webp`} />
      <img
        src={`/home/${name}_16x9.webp`}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
      />
    </picture>
  );
}

const CHAPTERS: Chapter[] = [
  {
    id: 'cap0',
    label: 'Abertura',
    img: '0',
    alt: 'Rua brasileira à noite, chuva, asfalto molhado e luz de poste, pessoas passando de guarda-chuva',
    priority: true,
    steps: [
      <h1 key="a">O marketing no Brasil está errado.</h1>,
      <div key="b">
        <p className="cb-big">
          Nós não compramos por lógica.<br />
          <em>Compramos por pertencimento.</em>
        </p>
        <div className="cb-acoes">
          <a className="cb-btn" href={MANIFESTO_PDF} download>Baixar o manifesto (PDF)</a>
          <span className="cb-seta" aria-hidden="true">Desça <span>↓</span></span>
        </div>
      </div>,
    ],
  },
  {
    id: 'cap1',
    label: 'O diagnóstico',
    img: '1',
    alt: 'Sala de espera com painel de senha 247, guichê de vidro e cadeiras de plástico azuis',
    steps: [
      <div key="a"><p className="cb-eyebrow">O diagnóstico</p><h2>Por que o produto melhor perde?</h2></div>,
      <p key="b" className="cb-big">Melhor produto.</p>,
      <p key="c" className="cb-big">Menor preço.</p>,
      <p key="d" className="cb-big"><em>E mesmo assim, não vende.</em></p>,
    ],
  },
  {
    id: 'cap2',
    label: 'A Rua e a Casa',
    img: '2a',
    alt: 'Portão de grade fechado de uma casa brasileira à noite',
    hook: 'cortina',
    steps: [
      <div key="a"><p className="cb-eyebrow">Roberto DaMatta</p><h2>A Rua e a Casa.</h2></div>,
      <p key="b" className="cb-big">
        Na Rua, somos <em style={{ color: '#9fb6cc' }}>indivíduos</em>: senha, fila, regra.<br />
        Na Casa, somos <em>pessoas</em>: nome, afeto, confiança.
      </p>,
      <blockquote key="c" className="cb-big cb-tese" style={{ margin: 0 }}>
        Todo ato de consumo no Brasil é uma tentativa de transformar a frieza da Rua na segurança da Casa.
        <cite>A tese do Código</cite>
      </blockquote>,
    ],
  },
  {
    id: 'cap3',
    label: 'A Reação Primária',
    img: '3',
    alt: 'Retrato de uma mulher com o olhar firme de quem acabou de decidir',
    hook: 'ms',
    steps: [
      <div key="a"><p className="cb-eyebrow">A Reação Primária</p><h2>Quem decide a compra não é a lógica.</h2></div>,
      <p key="b" className="cb-big">A lógica só explica a compra <em>no dia seguinte.</em></p>,
      <p key="c" className="cb-big">
        Quem decide é o instinto, em <em><span data-role="ms">0</span> milissegundos.</em>
      </p>,
    ],
  },
  {
    id: 'cap4',
    label: 'O Homem Cordial',
    img: '4',
    alt: 'Balcão de padaria com o caderno de fiado aberto e o padeiro com a mão no ombro do cliente',
    steps: [
      <div key="a"><p className="cb-eyebrow">O Homem Cordial</p><h2>Cordial não é ser educado.</h2></div>,
      <p key="b" className="cb-big">A palavra vem de <em>cordis</em>.</p>,
      <p key="c" className="cb-big">
        Cordis quer dizer <em>coração.</em><br />
        O brasileiro compra de quem lhe toca o coração.
      </p>,
    ],
  },
  {
    id: 'cap5',
    label: 'Pilar 1: O Fim da Frieza',
    img: '5',
    alt: 'Duas mãos ao redor de uma xícara branca com vapor',
    steps: [
      <div key="a"><p className="cb-eyebrow">Pilar 1 · O Fim da Frieza</p><h2>Pare de listar características.</h2></div>,
      <p key="b" className="cb-big cb-fria">Aço inox<br />12 meses de garantia<br />Frete grátis</p>,
      <p key="c" className="cb-big">O mercado acha que compra produtos.<br />Ele compra <em>alívio.</em></p>,
    ],
  },
  {
    id: 'cap6',
    label: 'Pilar 2: O Efeito WhatsApp',
    img: '6',
    alt: 'Celular sobre a mesa branca da cozinha, tela acesa com uma conversa',
    steps: [
      <div key="a"><p className="cb-eyebrow">Pilar 2 · O Efeito WhatsApp</p><h2>O WhatsApp é a Casa dentro do celular.</h2></div>,
      <div key="b">
        <p className="cb-big">Na Rua, você é um número de protocolo.</p>
        <div className="cb-chat"><div className="cb-bolha cb-form">Formulário · Protocolo nº 48213</div></div>
      </div>,
      <div key="c">
        <p className="cb-big">Na Casa, alguém responde.</p>
        <div className="cb-chat"><div className="cb-bolha">digitando…</div></div>
      </div>,
      <div key="d" className="cb-chat">
        <div className="cb-bolha">▶ ▁▂▃▅▃▂▁▂▄▂▁ 0:14</div>
        <div className="cb-bolha cb-eu">Oi! Aqui é o João. Já separei o seu pedido 🙂</div>
      </div>,
    ],
  },
  {
    id: 'cap7',
    label: 'Pilar 3: A Marca Padrinho',
    img: '7',
    alt: 'Um adulto ao lado de uma criança de capacete, segurando o banco da bicicleta',
    steps: [
      <div key="a"><p className="cb-eyebrow">Pilar 3 · A Marca Padrinho</p><h2>Não seja o herói. Seja o padrinho.</h2></div>,
      <p key="b" className="cb-big">Todo cliente pensa: se der problema, <em>com quem eu falo?</em></p>,
      <p key="c" className="cb-big">Seja esse alguém.<br />Segure o banco até ele <em>aprender a pedalar.</em></p>,
    ],
  },
  {
    id: 'cap8',
    label: 'Pilar 4: O Design de Confiança',
    img: '8',
    alt: 'Soleira de uma casa com a porta aberta e luz dourada saindo de dentro',
    steps: [
      <div key="a"><p className="cb-eyebrow">Pilar 4 · O Design de Confiança</p><h2>O design fala antes das palavras.</h2></div>,
      <div key="b">
        <p className="cb-big">Na Rua, o erro é punido.</p>
        <div className="cb-chat"><div className="cb-bolha cb-erro">Erro crítico.<br />Senha inválida.</div></div>
      </div>,
      <div key="c">
        <p className="cb-big">Na Casa, o erro é perdoado.</p>
        <div className="cb-chat"><div className="cb-bolha">Ops, a senha não bateu. Quer tentar de novo ou prefere receber um link de acesso?</div></div>
      </div>,
    ],
  },
  {
    id: 'baixar',
    label: 'Convite: baixar o manifesto',
    img: '9',
    alt: 'Família e amigos rindo ao redor de uma mesa posta com toalha branca',
    steps: [
      <div key="a"><p className="cb-eyebrow">A casa é sua</p><h2>Baixe o manifesto.</h2></div>,
      <div key="b">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="cb-capa" src="/capa_manifesto_o_codigo_brasil_fabian_baldovino.webp" alt="Capa do manifesto O Código Brasil" loading="lazy" decoding="async" />
        <p className="cb-big">O mapa para transformar a frieza da Rua na segurança da Casa.</p>
        <div className="cb-acoes">
          <a className="cb-btn cb-grande" href={MANIFESTO_PDF} download aria-label="Baixar o manifesto O Código Brasil gratuitamente (PDF)">
            Baixar o manifesto (PDF)
          </a>
        </div>
      </div>,
    ],
  },
];

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const stageHeight = (n: number) => `calc(${n} * (100svh - var(--cb-hh, 0px)))`;

export default function HomeJourney() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const home = root.closest('.cb-home') as HTMLElement | null;
    const doc = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const caps = Array.from(root.querySelectorAll<HTMLElement>('.cb-cap'));
    const lastCap = caps[caps.length - 1];
    const pular = root.querySelector<HTMLAnchorElement>('.cb-pular');
    const ms = root.querySelector<HTMLElement>('[data-role="ms"]');
    const cortina = root.querySelector<HTMLElement>('[data-role="cortina"]');
    const fio = root.querySelector<HTMLElement>('[data-role="fio"]');
    const header = document.querySelector<HTMLElement>('.site-header');

    // altura do cabeçalho fixo do site: as imagens ocupam o resto da tela
    const setHeader = () => doc.style.setProperty('--cb-hh', `${header ? header.offsetHeight : 0}px`);
    setHeader();
    if (!reduce) doc.classList.add('cb-snap');

    const showPular = () => {
      if (!pular || !lastCap) return;
      const depois = window.scrollY > window.innerHeight * 1.2;
      const antes = lastCap.getBoundingClientRect().top > window.innerHeight * 0.5;
      pular.classList.toggle('cb-on', depois && antes);
    };

    let ticking = false;
    const frame = () => {
      ticking = false;
      const hh = header ? header.offsetHeight : 0;
      const stageH = window.innerHeight - hh;
      caps.forEach((cap, ci) => {
        const rc = cap.getBoundingClientRect();
        const total = cap.offsetHeight - stageH;
        const p = total > 0 ? clamp((hh - rc.top) / total) : 0;

        // fusão entre capítulos: a imagem entra e sai passando pelo escuro (a última não sai)
        let f = clamp(1 - (rc.top - hh) / stageH);
        if (cap !== lastCap) f = Math.min(f, clamp((rc.bottom - hh) / stageH));
        f = f * f * (3 - 2 * f);
        cap.querySelectorAll<HTMLElement>('.cb-plate').forEach((pl) => { pl.style.opacity = f.toFixed(3); });

        const steps = cap.querySelectorAll<HTMLElement>('.cb-step');
        const n = steps.length;
        const idx = n > 1 ? Math.round(p * (n - 1)) : 0;
        if (cap.dataset.hook === 'cortina' && cortina && fio) {
          cortina.style.setProperty('--c', p.toFixed(4));
          fio.style.setProperty('--c', p.toFixed(4));
          fio.style.setProperty('--done', p >= 1 || p <= 0 ? '1' : '0');
        }
        steps.forEach((s, i) => s.classList.toggle('cb-on', i === idx));
        if (cap.dataset.hook === 'ms' && ms) ms.textContent = String(Math.round(50 * clamp((p - 0.5) / 0.5)));
        void ci;
      });
      // temperatura geral da página: do azul da Rua ao âmbar da Casa
      const lastTop = lastCap.getBoundingClientRect().top + window.scrollY;
      const g = clamp(window.scrollY / Math.max(1, lastTop + lastCap.offsetHeight - window.innerHeight));
      home?.style.setProperty('--warm', (g * g).toFixed(3));
      showPular();
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(frame); }
    };
    const onResize = () => { setHeader(); onScroll(); };

    const onPularClick = (e: Event) => {
      e.preventDefault();
      lastCap.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    };
    pular?.addEventListener('click', onPularClick);

    if (reduce) {
      // sem animação: tudo visível, uma cena por vez, sem câmera presa
      if (ms) ms.textContent = '50';
      if (cortina) cortina.style.setProperty('--c', '1');
      window.addEventListener('scroll', showPular, { passive: true });
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);
      frame();
    }

    return () => {
      doc.classList.remove('cb-snap');
      doc.style.removeProperty('--cb-hh');
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', showPular);
      window.removeEventListener('resize', onResize);
      pular?.removeEventListener('click', onPularClick);
    };
  }, []);

  return (
    <div className="cb-journey" ref={rootRef}>
      <div className="cb-veu" aria-hidden="true" />
      <a className="cb-pular" href="#baixar" aria-label="Pular para o convite e baixar o manifesto">
        Ir ao convite <span aria-hidden="true">↓</span>
      </a>

      {CHAPTERS.map((c) => {
        const n = c.steps.length;
        const isCortina = c.hook === 'cortina';
        return (
          <section
            key={c.id}
            id={c.id === 'baixar' ? 'baixar' : c.id}
            className={`cb-cap ${c.id === 'cap0' ? '' : 'cb-dim'}`}
            data-hook={c.hook}
            style={{ height: stageHeight(n) }}
            aria-label={c.label}
          >
            <div className="cb-stage">
              <div className="cb-plate">
                <Picture name={c.img} alt={c.alt} priority={c.priority} />
                <div className="cb-grain" />
              </div>
              {isCortina && (
                <>
                  <div className="cb-cortina" data-role="cortina">
                    <div className="cb-plate">
                      <Picture name="2b" alt="A mesma casa, porta entreaberta, luz amarela de cozinha e café no fogão" />
                      <div className="cb-grain" />
                    </div>
                  </div>
                  <div className="cb-fio" data-role="fio" aria-hidden="true" />
                </>
              )}
              <div className="cb-texto">
                {c.steps.map((s, i) => (
                  <div key={i} className={`cb-step${i === 0 ? ' cb-on' : ''}`}>{s}</div>
                ))}
              </div>
              {isCortina && (
                <div className="cb-rotulos" aria-hidden="true"><span className="cb-r">Rua</span><span className="cb-c">Casa</span></div>
              )}
            </div>
            {Array.from({ length: n }).map((_, i) => (
              <div key={i} className="cb-snap" aria-hidden="true" style={{ top: `calc(${i} * (100svh - var(--cb-hh, 0px)))` }} />
            ))}
          </section>
        );
      })}
    </div>
  );
}

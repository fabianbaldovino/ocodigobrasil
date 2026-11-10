'use client';

import { useId, useState, type KeyboardEvent } from 'react';

const PILARES = [
  {
    nome: 'O Fim da Frieza',
    frase: 'Pare de listar características. O cliente não compra o produto: compra alívio.',
    texto:
      'Ficha técnica, garantia e frete falam com a razão, e a razão chega atrasada. O que decide é a sensação de que o problema dele finalmente tem dono.',
    pratica: 'Trocar o discurso de atributos pela resolução que o cliente realmente busca.',
    img: '5',
    alt: 'Duas mãos ao redor de uma xícara branca com vapor',
  },
  {
    nome: 'O Efeito WhatsApp',
    frase: 'O WhatsApp é a Casa dentro do celular.',
    texto:
      'O brasileiro prefere conversar com alguém antes de passar o cartão em um formulário perfeito. No protocolo ele é um número; na conversa ele tem nome.',
    pratica: 'Colocar pontes humanas exatamente nos pontos em que a decisão acontece.',
    img: '6',
    alt: 'Celular sobre a mesa da cozinha com uma conversa aberta e a família ao fundo',
  },
  {
    nome: 'A Marca Padrinho',
    frase: 'Não seja o herói. Seja o padrinho.',
    texto:
      'Todo cliente pensa: se der problema, com quem eu falo? A marca que responde a essa pergunta antes da venda deixa de ser fornecedora e passa a ser fiadora.',
    pratica: 'Assumir o papel de protetora da jornada, do primeiro contato ao pós-venda.',
    img: '7',
    alt: 'Um adulto segura o banco da bicicleta de uma criança que aprende a pedalar',
  },
  {
    nome: 'O Design de Confiança',
    frase: 'O design fala antes das palavras.',
    texto:
      'Em 50 milissegundos, cor, forma e tom dizem ao instinto se aquele ambiente é abrigo ou ameaça. Na Rua o erro é punido; na Casa o erro é perdoado.',
    pratica: 'Desenhar telas, mensagens e processos que acolhem em vez de intimidar.',
    img: '8',
    alt: 'Soleira de uma casa com a porta aberta e luz quente vindo de dentro',
  },
];

/** Os quatro pilares: abas no desktop; no celular (e sem JavaScript) todos aparecem empilhados. */
export default function Pilares() {
  const [ativo, setAtivo] = useState(0);
  const base = useId();

  const aoTeclar = (e: KeyboardEvent<HTMLButtonElement>) => {
    const delta = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const proximo = (ativo + delta + PILARES.length) % PILARES.length;
    setAtivo(proximo);
    document.getElementById(`${base}-aba-${proximo}`)?.focus();
  };

  return (
    <div className="cb-pilares">
      <div className="cb-pilares-abas" role="tablist" aria-label="Os quatro pilares" aria-orientation="vertical">
        {PILARES.map((p, i) => (
          <button
            key={p.nome}
            type="button"
            role="tab"
            id={`${base}-aba-${i}`}
            aria-selected={ativo === i}
            aria-controls={`${base}-painel-${i}`}
            tabIndex={ativo === i ? 0 : -1}
            className="cb-pilares-aba"
            onClick={() => setAtivo(i)}
            onKeyDown={aoTeclar}
          >
            <span className="cb-num">0{i + 1}</span>
            <span>{p.nome}</span>
          </button>
        ))}
      </div>
      <div className="cb-pilares-paineis">
        {PILARES.map((p, i) => (
          <article
            key={p.nome}
            role="tabpanel"
            id={`${base}-painel-${i}`}
            aria-labelledby={`${base}-aba-${i}`}
            className={`cb-pilar${ativo === i ? ' is-ativo' : ''}`}
          >
            <div className="cb-pilar-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/home/${p.img}_1280.webp`} alt={p.alt} width={1280} height={715} loading="lazy" decoding="async" />
            </div>
            <div className="cb-pilar-texto">
              <p className="cb-pilar-nome"><span className="cb-num">0{i + 1}</span> {p.nome}</p>
              <h3>{p.frase}</h3>
              <p>{p.texto}</p>
              <p className="cb-pilar-pratica"><span>Na prática</span>{p.pratica}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

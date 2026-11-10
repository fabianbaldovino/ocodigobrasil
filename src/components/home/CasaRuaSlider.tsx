'use client';

import { useState, type CSSProperties } from 'react';

/**
 * A mesma casa vista da Rua (portão fechado) e de dentro (porta aberta).
 * Um controle deslizante nativo, invisível por cima da imagem, move a divisória:
 * funciona com mouse, toque e teclado sem código de arraste.
 */
export default function CasaRuaSlider() {
  const [pos, setPos] = useState(58);

  return (
    <figure className="cb-compara" style={{ '--pos': `${pos}%` } as CSSProperties}>
      <div className="cb-compara-palco">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/home/2b_16x9.webp"
          srcSet="/home/2b_1400.webp 1400w, /home/2b_16x9.webp 2400w"
          sizes="(max-width: 700px) 180vw, 100vw"
          alt="A mesma casa com a porta entreaberta e a luz da cozinha acesa"
          width={2400}
          height={1340}
          fetchPriority="high"
          decoding="async"
        />
        <div className="cb-compara-rua">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/home/2a_16x9.webp"
            srcSet="/home/2a_1400.webp 1400w, /home/2a_16x9.webp 2400w"
            sizes="(max-width: 700px) 180vw, 100vw"
            alt="Portão de grade fechado de uma casa brasileira à noite"
            width={2400}
            height={1340}
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <span className="cb-compara-rotulo cb-compara-rotulo--rua" aria-hidden="true">Rua</span>
        <span className="cb-compara-rotulo cb-compara-rotulo--casa" aria-hidden="true">Casa</span>
        <span className="cb-compara-fio" aria-hidden="true">
          <span className="cb-compara-pega">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </span>
        <input
          className="cb-compara-controle"
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Arraste para comparar a Rua com a Casa"
          aria-valuetext={`${pos}% Rua, ${100 - pos}% Casa`}
        />
      </div>
      <figcaption>
        <span>Arraste para atravessar.</span> O mesmo endereço, visto de fora e de dentro: é essa a distância entre uma marca que
        atende e uma marca que acolhe.
      </figcaption>
    </figure>
  );
}

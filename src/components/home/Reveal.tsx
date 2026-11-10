'use client';

import { useEffect } from 'react';

/**
 * Entrada suave dos blocos marcados com data-reveal conforme chegam à tela.
 * Só esconde o que ainda está abaixo da dobra, então nada pisca no carregamento;
 * sem JavaScript ou com movimento reduzido, tudo fica visível desde o início.
 */
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    const itens = Array.from(document.querySelectorAll<HTMLElement>('.cb-home [data-reveal]'));
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.remove('cb-espera');
          io.unobserve(e.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    itens.forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
        el.classList.add('cb-espera');
        io.observe(el);
      }
    });
    return () => {
      io.disconnect();
      itens.forEach((el) => el.classList.remove('cb-espera'));
    };
  }, []);

  return null;
}

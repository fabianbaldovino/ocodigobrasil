---
name: O Código Brasil
description: Consultoria de marca com voz editorial. Papel, tinta e um acento terracota; a Rua aparece em noite, a Casa em luz de dia.
colors:
  papel: "#f4f1eb"
  papel-2: "#ebe7de"
  card: "#fbfaf7"
  tinta: "#14161a"
  tinta-2: "#565b64"
  acento: "#a8401f"
  acento-botao: "#b4472a"
  acento-botao-hover: "#983a20"
  noite: "#101317"
  papel-noite: "#f1eee8"
  tinta-2-noite: "#a9aeb7"
  acento-noite: "#f0906f"
  azul-rua: "#8fa6bd"
typography:
  display:
    fontFamily: "Instrument Sans, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.5rem, 1.1rem + 5.9vw, 6rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Instrument Sans, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2rem, 1.2rem + 3.1vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  enfase:
    fontFamily: "Newsreader, Georgia, 'Times New Roman', serif"
    fontStyle: italic
    fontWeight: 400
  body:
    fontFamily: "Inter, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.08em"
rounded:
  botao: "4px"
  midia: "6px"
---

# Design System: O Código Brasil

## Overview

**Norte criativo: "Consultoria com voz editorial".**

O site vende a consultoria de marca de Fabian Baldovino para donos de empresa. Ele precisa parecer um escritório de estratégia sério, que pensa com clareza e escreve bem: muito espaço, tipografia grande, linhas finas, uma cor de acento e nenhuma decoração. A página rola livre (sem rolagem travada nem slides) e pode ser lida em diagonal em um minuto.

A tese Casa × Rua continua sendo o fio condutor, mas agora como conteúdo, não como efeito: a Rua aparece nas seções em noite (`.cb-noite`), em azul frio e fonte de protocolo; a Casa aparece no papel claro, na serifa em itálico e no acento terracota.

Os tokens vivem em `src/app/globals.css` (`--cb-*`) e valem para o cabeçalho, o rodapé, a home (`src/app/home.css`, escopo `.cb-home`) e os artigos (escopo `.cb-artigo`). O miolo das páginas legais (termos, privacidade, reembolso) ainda usa o visual antigo (Playfair, mogno): é dívida de migração.

## Colors

- **Papel** (`--cb-papel`) e **Papel 2** (`--cb-papel-2`): fundo das seções, alternando para dar ritmo. Neutro quente, nunca amarelo.
- **Tinta** (`--cb-tinta`) e **Tinta 2** (`--cb-tinta-2`): texto principal e texto de apoio.
- **Acento terracota** (`--cb-acento` para texto, `--cb-acento-btn` para botão com texto branco): a única cor. Marca a ênfase em itálico, os números de seção e o botão da conversa.
- **Noite** (`--cb-noite-fundo`): as seções da Rua, o convite final e o rodapé. Dentro delas o texto é papel e o acento clareia para `#f0906f`.
- **Azul da Rua** (`#8fa6bd`): só dentro da noite, na palavra "Rua" e nas frases de protocolo.

No tema escuro os mesmos tokens invertem (papel vira noite), então nenhum componente tem cor própria.

**Regras**
- Um botão cheio em terracota por dobra, e ele é sempre a conversa com Fabian. O manifesto é botão de contorno ou botão tinta.
- Nada de amarelo, creme amarelado, verde-amarelo ou gradiente.

## Typography

- **Instrument Sans** (títulos, marca, botões, abas): peso 500, espaçamento bem fechado, tamanhos grandes.
- **Newsreader itálico** (ênfase): a última parte de cada título vai em serifa itálica na cor de acento. É a "voz da Casa". Também é a fonte de leitura dos artigos.
- **Inter** (texto corrido, rótulos em caixa-alta com 0,08em).
- **Monoespaçada do sistema**: só para as frases "como soa na Rua".

**Regras**
- Cada título tem no máximo um trecho em itálico, sempre no fim.
- Rótulos de seção são numerados ("01 O problema") e ficam na coluna da esquerda no desktop.

## Layout

Coluna de 78rem com margens de 20 a 56px. No desktop cada seção usa uma grade 3/9: rótulo numerado à esquerda, conteúdo à direita. Seções separadas por um fio de 1px e por 4,5 a 9rem de respiro. Listas e tabelas são feitas de linhas finas, não de cards; o único card é o bloco "Como começa".

Ordem da home: abertura (com o comparador Rua × Casa), o problema, a tese, fundamentos, os quatro pilares, a consultoria, o manifesto, artigos, quem conduz (autor e marcas), perguntas frequentes, convite final. O conhecimento vem primeiro; o autor aparece só no fim.

## Components

- **Botões** (`.cb-btn`): 56px de altura, raio de 4px. `--primario` (terracota, conversa), `--escuro` (tinta, download), `--linha` (contorno).
- **Comparador Rua × Casa** (`CasaRuaSlider.tsx`): duas fotos do mesmo endereço e um `input range` invisível por cima; funciona com mouse, toque e teclado.
- **Tradutor Rua → Casa**: tabela de três colunas (onde, Rua, Casa); no celular vira pares empilhados.
- **Pilares** (`Pilares.tsx`): abas verticais no desktop; no celular os quatro aparecem empilhados.
- **Parede de logos**: silhuetas em uma tinta só (`public/marcas-mono`), com largura proporcional à raiz da proporção para todos pesarem igual.
- **FAQ**: `<details>` nativo com linhas finas e sinal de mais.

## Motion

Só entrada suave dos blocos ao chegarem à tela (`Reveal.tsx`) e transições curtas de hover. Com `prefers-reduced-motion` tudo aparece parado.

## Do's and Don'ts

**Do**
- Manter todo o texto como HTML real e a página legível sem JavaScript.
- Usar fotografia com parcimônia e sempre em moldura (raio de 6px), nunca como fundo de texto.
- Deixar claro, em toda dobra, qual é o próximo passo: conversar com Fabian.

**Don't**
- Não travar a rolagem, não usar slides de tela cheia nem botões flutuantes sobre o conteúdo.
- Não inventar prova: nada de depoimento, número de resultado ou cliente de consultoria que não exista. As marcas listadas são do audiovisual e são rotuladas assim.
- Não parecer landing de infoproduto (contador, selo, "últimas vagas") nem SaaS genérico (gradiente roxo, vidro, ícones de biblioteca).

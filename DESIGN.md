---
name: O Código Brasil
description: A travessia da Rua fria para a Casa acolhedora, contada como cinema.
colors:
  rua: "#0d141c"
  rua-2: "#1b2733"
  rua-azul: "#9fb6cc"
  poste: "#e08a3c"
  ambar: "#ffc94a"
  ambar-tinta: "#7a5d00"
  casa: "#fff6dc"
  papel: "#f5f3ee"
  papel-2: "#b8bcc6"
  tinta: "#181b26"
  tinta-2: "#3a3f52"
  cinza-guiche: "#3b4350"
  borda-casa: "#e6e1cf"
  branco: "#ffffff"
typography:
  display:
    fontFamily: "Newsreader, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.75rem, 1.6rem + 4.6vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Newsreader, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.5rem, 1.5rem + 3.6vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Newsreader, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.875rem, 1.25rem + 2.3vw, 3.1rem)"
    fontWeight: 500
    lineHeight: 1.16
    letterSpacing: "-0.01em"
  section:
    fontFamily: "Newsreader, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.12
  body:
    fontFamily: "Newsreader, Georgia, 'Times New Roman', serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.16em"
    fontVariation: "'wdth' 85"
rounded:
  guiche: "2px"
  logo: "10px"
  details: "12px"
  card: "14px"
  bolha: "16px"
  pill: "999px"
spacing:
  s1: "0.5rem"
  s2: "1rem"
  s3: "1.5rem"
  s4: "2rem"
  s5: "3rem"
  s6: "4.5rem"
  s7: "7rem"
components:
  button-rua:
    backgroundColor: "rgba(13,20,28,.35)"
    textColor: "{colors.papel}"
    typography: "{typography.label}"
    rounded: "{rounded.guiche}"
    padding: "12px 18px"
  button-casa:
    backgroundColor: "{colors.ambar}"
    textColor: "{colors.rua}"
    typography: "{typography.label}"
    rounded: "{rounded.guiche}"
    padding: "18px 28px"
  header-cta:
    backgroundColor: "{colors.ambar}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.guiche}"
    padding: "8px 16px"
  card-casa:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.card}"
    padding: "2rem"
  faq-item:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.details}"
    padding: "1rem 1.5rem"
  bolha-casa:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.bolha}"
    padding: "0.75rem 1rem"
  bolha-rua:
    backgroundColor: "{colors.cinza-guiche}"
    textColor: "#9aa3b0"
    rounded: "0"
    padding: "0.75rem 1rem"
---

# Design System: O Código Brasil

## Overview

**Creative North Star: "A Travessia"**

Toda tela anda da Rua para a Casa. A Rua é noite azulada, asfalto molhado, guichê, senha, formulário: frio, quadrado, impessoal. A Casa é a porta entreaberta, a luz âmbar da cozinha, a mesa posta: quente, arredondada, com nome e voz. O site não *descreve* o método Casa × Rua; ele faz o visitante atravessá-lo. A temperatura da página inteira acompanha a rolagem (um véu azul que vira âmbar), e cada capítulo é um plano de cinema com o texto por cima como legenda.

O tom é **cinematográfico e quente**: fotografia de cinema em tela cheia, grão de película, uma frase por vez, muito silêncio em volta. A densidade é baixa de propósito: um corte por ideia. Depois da travessia, a página "entra em casa": fundo creme, cards brancos, leitura calma.

A identidade oficial é a da home nova (`src/app/home.css`, escopo `.cb-home`), e o cabeçalho e o rodapé já seguem ela. O miolo das outras páginas (artigos e páginas legais) ainda usa o visual anterior, marfim/mogno/vermelho-pimenta com Playfair Display + Inter (`src/app/globals.css`). Isso é dívida de migração, não uma segunda identidade: trabalho novo nessas páginas deve caminhar para este sistema.

**Key Characteristics:**
- Fotografia de cinema em tela cheia (16:9 no desktop, 9:16 no celular) com grão e texto sobreposto.
- Gradiente de temperatura: azul da Rua → âmbar da Casa, ligado ao progresso da leitura.
- Serifa editorial (Newsreader) para a voz; Archivo condensada em caixa-alta para rótulos e botões.
- Âmbar como a única cor de ação, guardado para o convite.
- Movimento só para revelar a próxima frase; tudo legível e estático com movimento reduzido.

## Colors

Duas temperaturas em oposição: azuis noturnos e cinzas de guichê para a Rua, creme e âmbar para a Casa.

### Primary
- **Âmbar da Cozinha** (`ambar`): a luz que sai de dentro da casa. Itálicos de ênfase sobre a fotografia, o botão do convite final, o CTA do cabeçalho, o fio de luz da cortina Rua/Casa e a bolha de mensagem "minha" no chat.
- **Âmbar Queimado** (`ambar-tinta`): a versão de texto do âmbar sobre fundo claro (links "Ler o artigo →" nos cards), legível onde o âmbar puro não é.

### Secondary
- **Luz de Poste** (`poste`): laranja de sódio da rua à noite. Só detalhe: filete lateral de proveniência e brilhos de cena. Nunca botão.
- **Azul da Rua** (`rua-azul`): a palavra "indivíduos", o rótulo "Rua", a lista fria de características. É a cor da frieza falando.

### Neutral
- **Noite da Rua** (`rua`, `rua-2`): fundo da travessia, por trás das fotos.
- **Papel** (`papel`): texto principal sobre a fotografia; bolhas de conversa.
- **Papel Apagado** (`papel-2`): textos secundários sobre o escuro (citação, "Desça ↓").
- **Creme da Casa** (`casa`): fundo das seções depois da travessia (artigos, autor, FAQ).
- **Tinta** (`tinta`) e **Tinta Suave** (`tinta-2`): texto sobre o creme e sobre os cards.
- **Cinza Guichê** (`cinza-guiche`): formulário, protocolo e erro; a burocracia em forma de cor.
- **Borda da Casa** (`borda-casa`) e **Branco** (`branco`): cards, FAQ e ladrilhos de logo.

### Named Rules
**The Porta Fechada Rule.** O âmbar não aparece em superfícies da Rua como cor de fundo. Na Rua ele só existe como palavra em itálico ou luz entrando; o botão âmbar sólido é o prêmio da Casa.

**The Guichê Rule.** Cinza-guichê, cantos retos e caixa-alta são a linguagem do que *não* queremos ser. Use para encenar a Rua, nunca para componentes reais da marca.

## Typography

**Display Font:** Newsreader (com Georgia, "Times New Roman"), com eixo óptico e itálico.
**Label Font:** Archivo (com "Helvetica Neue", Arial), largura condensada (80–90%).

**Character:** Newsreader fala como um narrador de documentário, culto e próximo; o itálico âmbar é a voz da Casa. A Archivo condensada é a placa de sinalização: curta, espaçada, em caixa-alta.

### Hierarchy
- **Display** (500, até 5,5rem, 1,04): só a frase de abertura sobre a fotografia.
- **Headline** (500, até 4,5rem, 1,06): o título de cada capítulo da travessia.
- **Title** (500, até 3,1rem, 1,16): as frases grandes (`cb-big`) e a tese em citação; uma ideia por fase.
- **Section** (400, até 2,75rem, 1,12): títulos das seções creme depois da travessia.
- **Body** (400, 1,125rem, 1,6, máx. 62ch): bio, respostas do FAQ, textos de card.
- **Label** (600, 0,8125rem, 0,16–0,18em, caixa-alta): eyebrows, rótulos de seção, botões, "Rua"/"Casa".

### Named Rules
**The Uma Frase Rule.** Sobre a fotografia, cada fase mostra uma frase só, centralizada, com quebra equilibrada (`text-wrap: balance`). Se precisar de duas ideias, são duas fases.

**The Itálico É a Casa Rule.** A ênfase é sempre itálico em âmbar, nunca negrito nem sublinhado.

## Layout

A travessia é uma sequência de capítulos. Cada capítulo é um palco fixo (`position: sticky`) da altura da tela menos o cabeçalho, e a altura da seção é `n × (100svh − cabeçalho)`, uma tela por fase. A rolagem tem scroll-snap obrigatório em cada fase, então um gesto avança uma frase. O texto fica centralizado numa coluna de até 64rem, com a frase limitada a 13–20em. Entre capítulos, a imagem entra e sai passando pelo escuro.

Depois da travessia vêm seções creme com padding vertical de `clamp(3.5rem, 8vw, 7rem)`, coluna de 46rem para texto e 68rem para grades. Os cards de artigo rolam na horizontal no celular (com dica "Deslize") e viram grade de 3 colunas a partir de 900px. Autor e logos ficam empilhados no celular e lado a lado (1,1fr / 0,9fr) a partir de 900px. Margens laterais respeitam `safe-area-inset`, com mínimo de 20px.

Breakpoints observados: 700px (troca de imagem 16:9 → 9:16 e cortina vertical) e 900px (grades).

## Elevation & Depth

Profundidade vem da fotografia e da luz, não de sombras de interface. Os planos têm grão de película, um degradê escuro embaixo para o texto e uma vinheta radial atrás da frase. O véu de temperatura (`mix-blend-mode: soft-light`) cobre a página toda. Texto sobre foto usa sombra dupla (`0 1px 2px` + `0 2px 22px`) para leitura. Na Casa as superfícies são planas: cards brancos com borda fina, sem sombra. A única sombra estrutural é a da capa do manifesto no convite (`0 10px 40px rgba(0,0,0,.5)`).

**The Luz, Não Sombra Rule.** Para destacar algo, acenda (âmbar, brilho do fio, vinheta), não levante (box-shadow).

## Shapes

A forma conta a história. A Rua é quase reta: botões com 2px de raio, formulário e erro com canto zero. A Casa arredonda: cards com 14px, FAQ com 12px, ladrilhos de logo com 10px, bolhas de conversa com 16px e o canto do remetente fechado em 4px, CTA do cabeçalho e "Ir ao convite" em pílula, foto do autor em círculo. A transição entre os dois é literal na cortina do capítulo 2: um fio de luz âmbar abre a Casa sobre a Rua (horizontal no desktop, vertical no celular).

## Components

### Buttons
Discretos até a Casa.
- **Botão da Rua** (`button-rua`): contorno fino de papel a 50%, fundo noite translúcido, label condensada. Usado no download dentro da travessia: presente, mas sem gritar.
- **Botão da Casa** (`button-casa`): âmbar sólido com texto noite, maior (18px 28px, 15px). Só no convite final "Baixar o manifesto".
- **CTA do cabeçalho** (`header-cta`): âmbar com texto tinta e o mesmo canto de 2px do botão da Casa, "Baixar grátis" ("Baixar" em telas estreitas).
- **Foco:** contorno de 2px na cor papel, com afastamento de 3px.

### Cards / Containers
- **Card de artigo** (`card-casa`): branco, borda `borda-casa`, 14px, sem sombra. Título em Newsreader 1,375rem, resumo em tinta suave e "Ler o artigo →" em label âmbar-tinta.
- **Ladrilho de logo:** branco, 10px, altura de 4,25rem, logo em escala de cinza a 85%. Logos claros recebem `brightness(.5) contrast(1.6)` para aparecer no branco.

### FAQ
`<details>` nativo branco, 12px, pergunta em Newsreader 600 e resposta em corpo de 1rem.

### Chat (signature component)
Bolhas que encenam o método dentro da travessia. **Casa:** bolha papel com cauda à esquerda e bolha "minha" âmbar-claro (`#ffe38a`) à direita. **Rua:** caixa cinza-guichê reta, para protocolo e "Erro crítico" (vermelho-salmão `#ff9c92` em caixa-alta).

### Navigation
Cabeçalho fixo sobre o creme da Casa (escurece para a noite da Rua no tema escuro). A marca é uma placa em Archivo condensada, caixa-alta e espaçada, com "BRASIL" em âmbar queimado. Os links (Manifesto, Artigos, Diagnóstico) usam a mesma placa e ganham um sublinhado âmbar no hover e na página ativa. No celular fica numa linha só: "Manifesto" some até 640px, "Diagnóstico" até 460px e todos os links até 400px, sobrando marca, CTA e tema. Um botão flutuante "Ir ao convite ↓" aparece durante a travessia.

### Footer
A última luz da Casa (`#fff1c4`; noite da Rua no tema escuro). Três colunas a partir de 900px: marca e frase; a conversa em primeiro plano ("Fale com Fabian no WhatsApp" em Newsreader com sublinhado âmbar, número em algarismos tabulares e a nota da conversa gratuita); links em placa e o copyright. No celular tudo empilha alinhado à esquerda. Na home o rodapé encosta direto na última seção creme.

## Do's and Don'ts

### Do:
- **Do** tratar cada capítulo como um plano de cinema: foto real em tela cheia (versões 16:9 e 9:16), grão, uma frase por fase.
- **Do** guardar o âmbar sólido para a ação da Casa (convite, CTA do cabeçalho) e usar itálico âmbar para a ênfase na fala.
- **Do** encenar a Rua com cinza-guichê, cantos retos e Archivo em caixa-alta, e a Casa com creme, curvas e Newsreader.
- **Do** manter tudo legível como texto real no HTML e garantir uma versão estática e completa com `prefers-reduced-motion`.
- **Do** migrar artigos e páginas legais para Newsreader/Archivo e para a paleta Casa quando forem tocados.

### Don't:
- **Don't** parecer landing de infoproduto: nada de contador regressivo, seta piscando, selo falso ou "últimas vagas".
- **Don't** parecer SaaS gringo frio: nada de gradiente roxo, card de vidro ou ícone genérico de biblioteca. Isso é a própria Rua.
- **Don't** usar verde-amarelo, bandeira, Copa ou carnaval como decoração.
- **Don't** parecer corporativo engessado: nada de azul-marinho institucional nem foto de banco de imagem com aperto de mão.
- **Don't** usar box-shadow para dar importância; acenda com luz e cor.
- **Don't** colocar duas frases grandes na mesma fase da travessia.

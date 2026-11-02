# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Donos de negócio brasileiros — empresários e donos de PME (clínica, loja física, indústria, serviços) — que sentem que perdem vendas mesmo tendo produto tecnicamente melhor ou preço menor. Eles decidem sozinhos e chegam ao site por artigos, redes ou indicação. O trabalho deles aqui: entender por que o cliente brasileiro não compra "o melhor produto" e decidir se vale conversar com Fabian sobre a própria marca.

Profissionais de marketing, agências e estudantes também leem os artigos, mas não são o leitor que o site precisa convencer.

## Product Purpose

O site ocodigobrasil.com.br existe para vender a consultoria de marca de Fabian Baldovino sob a ótica do Código Brasil. O manifesto em PDF, gratuito, é só uma isca consistente: faz o empresário aprender o método (Casa × Rua, a marca "padrinho", o efeito WhatsApp, o design de confiança) e passar a confiar no autor.

Sucesso = o empresário pede o Diagnóstico Estratégico pelo WhatsApp. O download do manifesto e a leitura dos artigos são etapas intermediárias, não o objetivo final.

## Positioning

Uma leitura cultural do consumidor brasileiro, não um manual de marketing importado: o brasileiro compra por pertencimento e proteção, não por lógica. O método divide a experiência de consumo em **Rua** (frieza, burocracia, medo de ser enganado) e **Casa** (afeto, proximidade, segurança) e reposiciona a marca como fiadora e protetora do cliente.

O Código Brasil é a porta de entrada: é a marca do site, do manifesto e do método. **O Código das Américas** é o nome da metodologia mais ampla por trás da consultoria (catálogo de códigos culturais das Américas cruzando DaMatta, Freyre, Hofstede, GLOBE e PESB). No site ele aparece subordinado ao Código Brasil, nunca como marca paralela.

## Operating Context

- Site estático (Next.js 16, `output: "export"`, `trailingSlash: true`) publicado no Firebase Hosting a partir de `out/`; CSP restritiva em `firebase.json` (scripts só do próprio domínio e do Google Tag Manager, fontes só locais).
- Rotas: `/` (página do manifesto e da consultoria), `/conteudo/` e `/conteudo/[slug]/` (artigos em Markdown em `content/artigos/`), `/termos/`, `/privacidade/`, `/reembolso/`.
- A home (`src/components/home/HomeJourney.tsx` + `HomeSections.tsx`) é uma travessia em capítulos da Rua para a Casa, com rolagem por fases (scroll-snap). Ela termina no convite para baixar o PDF e depois traz artigos, autor e FAQ.
- Conversão: download direto do PDF (`/o-codigo-brasil-manifesto-fabian-baldovino.pdf`, sem cadastro). O card da consultoria com o botão de WhatsApp pré-preenchido existe em `ProductDetails.tsx`, mas **não aparece na home atual**: hoje o único caminho para o WhatsApp é o número no rodapé. O GA4 registra cliques no WhatsApp.
- Comentários em artigos (Firestore) existem no código, mas estão desligados (`FEATURE_COMMENTS_ENABLED = false`).
- Tema claro por padrão, com alternância para escuro guardada em `localStorage`.
- Comando de dev: `npm run dev` (Next.js, porta 3000).

## Capabilities and Constraints

- **Manifesto:** PDF gratuito, 24 páginas, cerca de 25 minutos de leitura, download imediato sem cadastro (`src/data/produto.ts`).
- **Consultoria:** Diagnóstico & Auditoria Casa × Rua, Dossiê Estratégico & Tom de Voz e Estúdio de Peças & Roteiros, conduzidos diretamente por Fabian. Contato só pelo WhatsApp; sem preço publicado. A primeira conversa é gratuita e sem compromisso, para entender o negócio; depois vem a proposta.
- **Não há produto pago.** Não existe livro à venda nem checkout na Hotmart. A página `/reembolso/` (garantia de 7 dias na Hotmart) e o rastreamento de `pay.hotmart.com` em `Analytics.tsx` são resquícios e não devem orientar trabalho novo.
- Terminologia do método: Casa, Rua, reação primária, marca "padrinho", efeito WhatsApp, design de confiança, Sistema 1 × Sistema 2, imprint, cliente-herói, "dar um jeitinho" (verbo de Rapaille para o Brasil).
- Dados de exemplo só aparecem com `NEXT_PUBLIC_SHOW_SAMPLE=1` e nunca vão para produção.

## Brand Commitments

- Nome: **O Código Brasil**; autor **Fabian Baldovino** — uruguaio, vive em Porto Alegre (RS), brand filmmaker.
- Voz: português do Brasil, direta e provocadora ("O marketing no Brasil está errado"), em segunda pessoa para o empresário, com o vocabulário Casa × Rua.
- Assets: capa do manifesto (`public/capa_manifesto_o_codigo_brasil_fabian_baldovino.*`), fotos do autor (`public/fabian*.webp`), PDF do manifesto. Material-fonte do livro (capas, roteiros, PDF `O_CODIGO_BRASIL_001.pdf`) fica fora do repositório, em `E:\O CODIGO BRASIL`.

## Evidence on Hand

- **Trajetória do autor, verificável:** projeto Curta nas Escolas (2011), noticiado por Correio do Povo, Jornal da Capital, Prefeitura de Porto Alegre e Câmara Municipal de Porto Alegre; palestra na UFRGS; matérias em `bio/` (incluindo Carta Capital e Zero Hora). Edição de três programas de TV em afiliada da Rede Globo; filmes de marca como a série *Ele não vai embora* (Termolar) e campanhas para Wedy Nutrition e Ristorante Fontana.
- **Logos em `public/marcas/`** (Copelmi, Termolar, PUC RS, Quick House, Fábrica de Suplementos, Kolosh, Seival Sul Mineração, Prefeitura de Canoas, Mercato, Wedy Nutrition, BPM Society, Vita Minimalista) são **clientes do trabalho audiovisual** de Fabian. Não podem ser apresentadas como clientes da consultoria nem da metodologia O Código Brasil.- **Artigos publicados** em `content/artigos/` (Havaianas, Nubank, Carmed Fini, CrossFit, festa, política e eleições 2026, mini dicionário, "como a Rua destrói suas vendas").
- **Ausências que não podem ser inventadas:** depoimentos (lista vazia de propósito), cases de resultado da consultoria, números de clientes ou de faturamento, preço da consultoria, imprensa sobre o livro.

## Product Principles

1. **O site é a Casa que ele prega.** Cada tela tem que provar o método: clara, acolhedora, sem burocracia, com uma pessoa real do outro lado.
2. **A consultoria é o destino; o manifesto é a ponte.** Toda página deve levar o empresário a confiar em Fabian e a abrir a conversa no WhatsApp, sem esconder o PDF gratuito.
3. **Prova real ou nenhuma.** Só aparece o que existe e pode ser verificado; nada de depoimento, número ou cliente inventado, e cliente audiovisual não vira cliente do método.
4. **Código Brasil na frente, Código das Américas por trás.** Uma marca para o empresário; a metodologia ampla dá profundidade à consultoria.
5. **Falar com o dono do negócio.** Linguagem de quem perde vendas, não de quem estuda marketing.

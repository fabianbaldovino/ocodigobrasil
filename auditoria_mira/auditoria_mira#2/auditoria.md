# AUDITORIA COMPLETA E ABSOLUTA - MIRA.AI
**Alvo:** `http://localhost:3000/` (O Código Brasil)
**Auditor:** Especialista em Conversão, Branding e UX (15+ anos de mercado)

Após uma análise técnica e visual meticulosa do código, estrutura CSS e copys (textos) do site, apresento o diagnóstico crítico para maximizar a autoridade e as taxas de conversão do Manifesto.

---

### 1. O QUE É NECESSÁRIO E URGENTE MUDAR
- **Presença e Tamanho da Autoridade (Foto):** A foto atual de `100x100px` arredondada e escondida na seção de bio diminui drasticamente a sua autoridade. Você está ensinando sobre "A Marca Padrinho" e "O Efeito WhatsApp" (humanização), logo, o rosto do padrinho/especialista precisa estar muito mais presente e imponente.
- **Botões de Chamada de Ação (CTAs) em Desarmonia:** O botão primário do Hero (`.btn-hero`) está utilizando um tom de verde (`#278c4a`) que é completamente incompatível com a paleta de luxo e proximidade que você criou (Marfim Quente, Espresso e Vermelho Cardeal). Ele empobrece a percepção estética da primeira dobra.
- **Espaçamento de Marca (Title):** O título principal "O CÓDIGOBRASIL" sem espaço parece um erro tipográfico. Precisamos respirar o texto para conferir elegância.

---

### 2. CORES A SEREM TROCADAS
**O Botão de Ação Hero (`.btn-hero`):**
- **Cor Atual:** Verde genérico (`#278c4a`).
- **Cor Nova:** Substitua urgente para o **Vermelho Cardeal** (`#C2301A`) – que já é sua variável `--accent` – ou para a cor **Espresso** (`#381A14`) com texto branco. 
- **Por que?** O Vermelho Cardeal (`#C2301A`) desperta atenção e se integra harmonicamente com o Marfim Quente do fundo (`#FCFBF8`).
- **No código (`src/app/globals.css`):**
  Altere na classe `.btn-hero` de `background-color: #278c4a;` para `background-color: var(--accent);`.

---

### 3. TEXTOS A SEREM INCLUÍDOS / MUDADOS
1. **O Título Principal:**
   - *Atual:* "O CÓDIGOBRASIL"
   - *Mudar para:* "**O CÓDIGO BRASIL**" (com espaço, ou usando pesos diferentes na fonte).
2. **A Chamada de Ação Principal (Hero):**
   - *Atual:* "QUERO DESCOBRIR O CÓDIGO"
   - *Mudar para:* "**QUERO DESTRAVAR O CÓDIGO AGORA**" (mais ação imediata).
3. **Inclusão Estratégica (Na seção "POR QUE VOCÊ ESTÁ PERDENDO VENDAS?"):**
   Adicione o seguinte parágrafo ao final da seção para amarrar a emoção à dor:
   > *"O brasileiro compra proximidade, história e confiança. Se a sua marca não se posiciona como o verdadeiro 'padrinho' da jornada dele, você continuará perdendo vendas para concorrentes piores, mas que sabem fazer o cliente se sentir em casa."*

---

### 4. FOTOS DO AUTOR (Necessidade de Substituição)
**Sim, é crucial mudar a foto atual.** 
O site de um Estrategista Visual precisa de impacto fotográfico. Uma bolinha de 100px não gera o peso necessário para vender um "Manifesto de Autoridade".

- **As Escolhas da Auditoria (Diretório `E:\SITES\Fabian_melhor\FOTOS`):**
  Recomendo fortemente utilizar a foto **`_MG_0806.png`** ou **`3.png`**.
- **Ação:** Remova o contêiner arredondado de 100x100px na seção `#autoridade`. No lugar, faça uma divisão 50/50 na tela: de um lado o texto da sua Bio, e do outro a sua foto escolhida, recortada (fundo transparente) de corpo até a cintura, em tamanho grande. Isso instaura imediatamente o "Design de Confiança" nos milissegundos iniciais de rolagem.

---

### 5. BIO DO AUTOR (A Nova Retaguarda)
A sua bio atual foca na sua formação acadêmica, mas esconde a sua gigantesca prova social e inserção nas bases da cultura popular brasileira (políticas públicas e reconhecimento da grande mídia). Precisamos expor esses artefatos para comprovar que você decodificou a alma do Brasil de verdade.

**Substitua a bio atual por este novo texto (baseado no diretório `bio` e referências extras):**

> *"Com sólida base em Ciências Sociais, Filosofia e Pedagogia, Fabian atua como a retaguarda invisível de grandes negócios, dominando a arquitetura de percepção que blinda marcas no mercado.* 
> 
> *Além de orquestrar estratégias cinematográficas e narrativas para o setor privado, Fabian possui um profundo histórico de impacto social e elaboração de políticas públicas. Seus trabalhos contam com o reconhecimento ostensivo da grande mídia – chancelados por veículos como **Zero Hora**, **Carta Capital** e **Correio do Povo** –, e com atuações de destaque junto à **Prefeitura de Porto Alegre**, **Câmara Municipal** e na esfera acadêmica como palestrante na **UFRGS**.*
> 
> *Foi essa vivência íntima e irrestrita com a realidade popular que o permitiu decodificar a emoção de compra e os medos do povo brasileiro como ninguém. Hoje, ele ajuda marcas a abandonarem os sistemas frios para se tornarem líderes incontestáveis."*

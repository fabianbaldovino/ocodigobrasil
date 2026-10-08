export interface Depoimento {
  id: string;
  nome: string;
  cargo: string;
  texto: string;
}

export interface ProdutoInfo {
  formato: string;
  paginas: string;
  tempoDeLeitura: string;
  formaDeAcesso: string;
  preco: string;
  whatsapp: string;
  depoimentos: Depoimento[];
}

export const produto: ProdutoInfo = {
  formato: "TODO_DADO: Formato do material (ex: PDF otimizado para leitura em tela)",
  paginas: "TODO_DADO: Número de páginas",
  tempoDeLeitura: "TODO_DADO: Tempo estimado de leitura",
  formaDeAcesso: "TODO_DADO: Forma de acesso (ex: Download imediato via Hotmart)",
  preco: "TODO_DADO: Preço do produto",
  whatsapp: "TODO_DADO: Número do WhatsApp apenas dígitos com DDI (ex: 555199999999)",
  depoimentos: []
};

// Injeção de dados de exemplo para visualização prévia (guardada pela env var)
if (process.env.NEXT_PUBLIC_SHOW_SAMPLE === '1') {
  produto.formato = "PDF interativo (modo escuro e claro)";
  produto.paginas = "120 páginas de conteúdo condensado";
  produto.tempoDeLeitura = "2 horas de leitura fluida";
  produto.formaDeAcesso = "Acesso imediato via Hotmart";
  produto.preco = "R$ 97,00";
  produto.whatsapp = "5551999999999";
  produto.depoimentos = [
    {
      id: "1",
      nome: "João Silva",
      cargo: "CMO na TechBrasil",
      texto: "Muda completamente a forma como vemos as conversões no mercado nacional. Brilhante."
    }
  ];
}

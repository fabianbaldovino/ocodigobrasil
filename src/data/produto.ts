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
  whatsapp: string;
  email?: string;
  depoimentos: Depoimento[];
}

export const produto: ProdutoInfo = {
  formato: "PDF",
  paginas: "24 páginas",
  tempoDeLeitura: "Cerca de 25 minutos",
  formaDeAcesso: "Download gratuito e imediato, sem cadastro",
  whatsapp: "5551999654160",
  email: "fbpaciel@gmail.com",
  depoimentos: []
};

// Injeção de dados de exemplo para visualização prévia (guardada pela env var)
if (process.env.NEXT_PUBLIC_SHOW_SAMPLE === '1') {
  produto.formato = "PDF interativo (modo escuro e claro)";
  produto.paginas = "120 páginas de conteúdo condensado";
  produto.tempoDeLeitura = "2 horas de leitura fluida";
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

import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Política de Reembolso | O Código Brasil',
  description: 'Política de garantia incondicional e procedimentos de reembolso.',
  alternates: {
    canonical: `${SITE_URL}/reembolso/`,
  },
};

export default function Reembolso() {
  return (
    <div className="container section flex-col" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
      {/* RASCUNHO: revisão jurídica pendente */}
      <h1 className="text-title" style={{ marginBottom: '2rem' }}>Política de Reembolso</h1>
      
      <div className="markdown-content text-body">
        <p>
          O Código Brasil confia integralmente no valor e na capacidade de transformação do nosso manifesto. Por isso, oferecemos uma <strong>garantia incondicional de 7 (sete) dias</strong> a partir da data de confirmação do pagamento.
        </p>
        
        <h2>Condições da Garantia</h2>
        <p>
          Se dentro do prazo estipulado de 7 dias você considerar que o conteúdo não agregou valor ao seu negócio ou não atendeu às suas expectativas, você tem o direito de solicitar a devolução integral do valor investido.
        </p>
        
        <h2>Como Solicitar</h2>
        <p>
          O processamento do seu pedido de reembolso deve ser feito diretamente através da plataforma Hotmart, que gerencia os pagamentos de forma segura e automatizada.
        </p>
        <p>
          Para acionar a sua garantia, basta seguir as instruções enviadas no seu e-mail de confirmação de compra ou acessar o suporte oficial da Hotmart e realizar a solicitação. A devolução do valor seguirá os prazos estipulados pela operadora do seu cartão de crédito ou pelo método de pagamento escolhido.
        </p>

        <h2>Contato</h2>
        <p>
          Em caso de dúvidas operacionais, nossa equipe está à disposição:
        </p>
        <ul>
          <li>E-mail: <strong>TODO_DADO: E-mail de suporte</strong></li>
          <li>WhatsApp: <strong>TODO_DADO: WhatsApp</strong></li>
        </ul>
      </div>
    </div>
  );
}

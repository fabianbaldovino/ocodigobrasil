import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Política de Privacidade | O Código Brasil',
  description: 'Como protegemos e tratamos os seus dados no acesso ao nosso conteúdo.',
  alternates: {
    canonical: `${SITE_URL}/privacidade/`,
  },
};

export default function Privacidade() {
  return (
    <div className="container section flex-col" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
      {/* RASCUNHO: revisão jurídica pendente */}
      <h1 className="text-title" style={{ marginBottom: '2rem' }}>Política de Privacidade</h1>
      
      <div className="markdown-content text-body">
        <h2>1. Quem Somos</h2>
        <p>
          Esta Política de Privacidade descreve como a empresa <strong>TODO_DADO: Razão social</strong>, inscrita sob o CNPJ <strong>TODO_DADO: CNPJ</strong>, coleta, utiliza e protege os seus dados pessoais durante a sua navegação e interação com o site oficial do &quot;O Código Brasil&quot;.
        </p>

        <h2>2. Dados Coletados</h2>
        <p>Nosso compromisso é com o minimalismo na coleta de dados. Coletamos e tratamos apenas os seguintes dados:</p>
        <ul>
          <li><strong>Dados fornecidos diretamente por você:</strong> Nome e endereço de e-mail ao preencher o formulário de comentários nos nossos artigos.</li>
          <li><strong>Armazenamento Local (Local Storage):</strong> Utilizamos o armazenamento local do seu navegador estritamente para fins <strong>funcionais</strong> (identificação anônima do dispositivo para evitar votos e interações duplicadas em nossos artigos). <strong>Não utilizamos</strong> cookies de rastreamento agressivo (como pixels de publicidade ou ferramentas de análise de terceiros em nossa aplicação).</li>
        </ul>

        <h2>3. Finalidade e Base Legal</h2>
        <p>
          O tratamento do seu nome e e-mail nos comentários baseia-se no seu <strong>consentimento expresso</strong> (Art. 7º, I, LGPD). A finalidade exclusiva é a publicação da sua interação, manutenção de histórico e possível contato referente à sua mensagem.
        </p>

        <h2>4. Compartilhamento de Dados</h2>
        <p>
          Não vendemos ou repassamos seus dados pessoais. Todas as transações financeiras e coletas de dados de pagamento para a aquisição do manifesto são realizadas integralmente no ambiente seguro da <strong>Hotmart</strong>, que atua como operadora de pagamento. Nenhum dado bancário transita ou é armazenado em nossos servidores.
        </p>

        <h2>5. Direitos do Titular (LGPD)</h2>
        <p>
          De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você possui o direito de:
        </p>
        <ul>
          <li>Confirmar a existência de tratamento de dados;</li>
          <li>Acessar, corrigir ou atualizar os seus dados;</li>
          <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
          <li>Revogar o seu consentimento a qualquer momento.</li>
        </ul>

        <h2>6. Contato do Encarregado</h2>
        <p>
          Para exercer qualquer direito ou esclarecer dúvidas sobre o tratamento de dados, entre em contato com o nosso Encarregado de Proteção de Dados (DPO):
        </p>
        <ul>
          <li><strong>TODO_DADO: Nome do Encarregado / DPO</strong></li>
          <li>E-mail: <strong>TODO_DADO: E-mail de suporte</strong></li>
        </ul>
      </div>
    </div>
  );
}

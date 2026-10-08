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
          <li><strong>Dados fornecidos diretamente por você:</strong> Apenas o <strong>Nome</strong> e o <strong>Comentário</strong> inseridos nos formulários de artigos. Não coletamos seu e-mail ou dados de navegação no envio. Não armazenamos o endereço IP em nosso banco de dados. A infraestrutura do Google (Firebase Hosting e Firestore), que processa as requisições, pode registrar dados técnicos de conexão, como o IP, conforme as políticas do Google.</li>
          <li><strong>Armazenamento Local (Local Storage):</strong> Utilizamos o armazenamento local do seu navegador estritamente para fins <strong>funcionais</strong> (geração de um identificador pseudonimizado <code>ocb_device</code> para evitar votos duplicados em nossos artigos). Esse identificador é gravado no banco de dados junto com a nota atribuída. <strong>Não utilizamos</strong> cookies de rastreamento agressivo, pixels de publicidade ou ferramentas de análise de terceiros. A aplicação inicializa exclusivamente o serviço de banco de dados (Firestore), sem habilitar o Firebase Analytics ou Auth.</li>
        </ul>

        <h2>3. Finalidade, Moderação e Retenção</h2>
        <p>
          O tratamento do seu nome e comentário baseia-se no seu <strong>consentimento</strong>, manifestado ao enviar o formulário, após aviso visível na interface. Todos os comentários passam por um filtro de <strong>moderação prévia</strong> (revisão manual <strong>TODO_DADO: por quem aprova</strong>) e são registrados inicialmente como &quot;pendentes&quot; antes de serem publicados.
        </p>
        <p>
          Os comentários aprovados e as notas (estrelas) são mantidos por prazo indeterminado (<strong>TODO_DADO: Prazo de guarda, caso exista um limite definido</strong>) como parte do acervo de discussões do site.
        </p>

        <h2>4. Compartilhamento e Transferência Internacional de Dados</h2>
        <p>
          Não vendemos ou repassamos seus dados pessoais. Todas as transações financeiras e coletas de dados de pagamento para a aquisição do manifesto são realizadas integralmente no ambiente seguro da <strong>Hotmart</strong>, que atua como operadora de pagamento. Nenhum dado bancário transita ou é armazenado em nossos servidores.
        </p>
        <p>
          Os dados armazenados no Firebase (Firestore) podem estar sujeitos a transferência internacional, dependendo da infraestrutura do Google (Região: <strong>TODO_DADO: Região do Firestore</strong>).
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

        <h2>6. Contato e Exclusão de Dados</h2>
        <p>
          Como o nosso formulário não exige login, não possuímos uma funcionalidade automatizada de exclusão de comentários. Caso deseje remover um comentário publicado com o seu nome, ou exercer qualquer outro direito sob a LGPD, entre em contato conosco através do e-mail abaixo informando o link do artigo:
        </p>
        <ul>
          <li><strong>TODO_DADO: Nome do Encarregado / DPO</strong></li>
          <li>E-mail para solicitações de exclusão: <strong>TODO_DADO: E-mail de suporte</strong></li>
        </ul>

        <p style={{ marginTop: '3rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Última atualização: <strong>TODO_DADO: data</strong>
        </p>
      </div>
    </div>
  );
}

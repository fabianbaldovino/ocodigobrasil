import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como o site O Código Brasil trata dados pessoais: registros de acesso, contato por e-mail ou WhatsApp e pagamento pela Hotmart.',
  alternates: {
    canonical: `${SITE_URL}/privacidade/`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'O Código Brasil',
    url: `${SITE_URL}/privacidade/`,
    title: 'Política de Privacidade | O Código Brasil',
    description: 'Como o site O Código Brasil trata dados pessoais: registros de acesso, contato por e-mail ou WhatsApp e pagamento pela Hotmart.',
    images: [{ url: '/capa_manifesto_o_codigo_brasil_fabian_baldovino.png', width: 1200, height: 630, alt: 'Capa do manifesto O Código Brasil, de Fabian Baldovino' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Política de Privacidade | O Código Brasil',
    description: 'Como o site O Código Brasil trata dados pessoais: registros de acesso, contato por e-mail ou WhatsApp e pagamento pela Hotmart.',
    images: ['/capa_manifesto_o_codigo_brasil_fabian_baldovino.png'],
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
          Esta Política de Privacidade descreve como <strong>57.974.931 Fabian Alexis Baldovino Paciel</strong> (CNPJ: 57.974.931/0001-08), responsável pelo site O Código Brasil, trata os dados pessoais de quem o visita.
        </p>

        <h2>2. Dados Tratados</h2>
        <p>Nosso compromisso é com o mínimo de dados possível. Hoje, o site não possui comentários, notas, cadastro ou login, e não usa cookies de publicidade nem ferramentas de análise de terceiros. O que pode ser tratado:</p>
        <ul>
          <li><strong>Registros técnicos de acesso:</strong> o site é hospedado no Firebase Hosting (Google), que pode registrar dados técnicos de conexão, como endereço IP e tipo de navegador, conforme as políticas do Google.</li>
          <li><strong>Contato:</strong> se você nos escrever por e-mail ou clicar no botão de WhatsApp, usaremos as informações que você enviar (como nome, e-mail ou telefone) apenas para responder à sua mensagem. O WhatsApp é operado pela Meta, sob as políticas dela.</li>
          <li><strong>Compra:</strong> o pagamento e a entrega do manifesto acontecem no ambiente da <strong>Hotmart</strong>, que atua como operadora de pagamento e coleta os dados necessários à compra. Nenhum dado bancário passa ou é armazenado em nossos servidores.</li>
        </ul>

        <h2>3. Finalidade e Compartilhamento</h2>
        <p>
          Usamos os dados apenas para manter o site funcionando, responder a contatos e viabilizar a compra. Não vendemos seus dados pessoais. Os dados tratados por Google, Meta e Hotmart seguem as políticas de cada empresa e podem envolver transferência internacional de dados.
        </p>

        <h2>4. Direitos do Titular (LGPD)</h2>
        <p>
          De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode:
        </p>
        <ul>
          <li>Confirmar a existência de tratamento de dados;</li>
          <li>Acessar, corrigir ou atualizar os seus dados;</li>
          <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
          <li>Revogar o seu consentimento a qualquer momento, quando o tratamento se basear nele.</li>
        </ul>

        <h2>5. Contato e Encarregado (DPO)</h2>
        <p>
          O encarregado pelo tratamento de dados é o próprio responsável pelo site. Para exercer qualquer direito, escreva para:
        </p>
        <ul>
          <li><strong>Fabian Alexis Baldovino Paciel</strong></li>
          <li>E-mail: <strong>fbpaciel@gmail.com</strong></li>
        </ul>

        <p style={{ marginTop: '3rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Última atualização: <strong>08 de outubro de 2026</strong>
        </p>
      </div>
    </div>
  );
}

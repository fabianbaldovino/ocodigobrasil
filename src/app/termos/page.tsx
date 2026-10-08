import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de uso do site e do manifesto O Código Brasil: acesso ao conteúdo digital, propriedade intelectual e limitação de responsabilidade.',
  alternates: {
    canonical: `${SITE_URL}/termos/`,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'O Código Brasil',
    url: `${SITE_URL}/termos/`,
    title: 'Termos de Uso | O Código Brasil',
    description: 'Termos de uso do site e do manifesto O Código Brasil: acesso ao conteúdo digital, propriedade intelectual e limitação de responsabilidade.',
    images: [{ url: '/capa_manifesto_o_codigo_brasil_fabian_baldovino.png', width: 1200, height: 630, alt: 'Capa do manifesto O Código Brasil, de Fabian Baldovino' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Termos de Uso | O Código Brasil',
    description: 'Termos de uso do site e do manifesto O Código Brasil: acesso ao conteúdo digital, propriedade intelectual e limitação de responsabilidade.',
    images: ['/capa_manifesto_o_codigo_brasil_fabian_baldovino.png'],
  },
};

export default function Termos() {
  return (
    <div className="container section flex-col" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
      {/* RASCUNHO: revisão jurídica pendente */}
      <h1 className="text-title" style={{ marginBottom: '2rem' }}>Termos de Uso</h1>
      
      <div className="markdown-content text-body">
        <h2>1. Objeto</h2>
        <p>
          Os presentes Termos de Uso regulam o acesso e a utilização dos conteúdos digitais e serviços oferecidos pelo O Código Brasil, gerido por <strong>Fabian Alexis Baldovino Paciel</strong>, pessoa física (CNPJ: não se aplica).
        </p>
        
        <h2>2. Acesso ao Conteúdo Digital</h2>
        <p>
          A aquisição do manifesto garante o acesso digital ao material nos termos estabelecidos no momento da compra. O processamento do pagamento e a entrega do acesso são operacionalizados pela plataforma terceira (Hotmart). O acesso ao material é de uso pessoal e intransferível.
        </p>

        <h2>3. Propriedade Intelectual</h2>
        <p>
          Todo o conteúdo presente no site e no manifesto, incluindo textos, artigos, teses metodológicas, imagens, logotipos e códigos, é protegido pela Lei de Direitos Autorais e pertence integralmente e com exclusividade a <strong>Fabian Alexis Baldovino Paciel</strong>. É expressamente proibida a reprodução, distribuição, revenda ou modificação sem a devida autorização prévia por escrito.
        </p>

        <h2>4. Limitação de Responsabilidade</h2>
        <p>
          As teses e estratégias apresentadas no manifesto O Código Brasil possuem caráter estritamente educativo e analítico. Não garantimos resultados financeiros específicos, aumento de faturamento imediato ou conversões padronizadas, visto que a performance de qualquer estratégia comercial depende de fatores individuais, operacionais e conjunturais do negócio de cada leitor.
        </p>

        <h2>5. Modificações e Atualizações</h2>
        <p>
          Reservamo-nos o direito de alterar, a qualquer momento e sem aviso prévio, os presentes Termos de Uso. Recomendamos que os usuários os verifiquem periodicamente.
        </p>

        <h2>6. Foro de Eleição</h2>
        <p>
          Para dirimir quaisquer controvérsias oriundas destes Termos de Uso, as partes elegem o foro da Comarca de <strong>Porto Alegre</strong>, renunciando expressamente a qualquer outro, por mais privilegiado que seja, ressalvado o direito do consumidor de propor ação no foro do seu domicílio.
        </p>

        <p style={{ marginTop: '3rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Última atualização: <strong>08 de outubro de 2026</strong>
        </p>
      </div>
    </div>
  );
}

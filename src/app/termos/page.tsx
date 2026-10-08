import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Termos de Uso | O Código Brasil',
  description: 'Regras de utilização, direitos de propriedade intelectual e responsabilidades.',
  alternates: {
    canonical: `${SITE_URL}/termos/`,
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
          Os presentes Termos de Uso regulam o acesso e a utilização dos conteúdos digitais e serviços oferecidos pelo &quot;O Código Brasil&quot;, gerido por <strong>TODO_DADO: Razão social</strong>, CNPJ <strong>TODO_DADO: CNPJ</strong>.
        </p>
        
        <h2>2. Acesso ao Conteúdo Digital</h2>
        <p>
          A aquisição do manifesto garante o acesso digital ao material nos termos estabelecidos no momento da compra. O processamento do pagamento e a entrega do acesso são operacionalizados pela plataforma terceira (Hotmart). O acesso ao material é de uso pessoal e intransferível.
        </p>

        <h2>3. Propriedade Intelectual</h2>
        <p>
          Todo o conteúdo presente no site e no manifesto, incluindo textos, artigos, teses metodológicas, imagens, logotipos e códigos, é protegido pela Lei de Direitos Autorais e pertence integralmente e com exclusividade à <strong>TODO_DADO: Razão social</strong> ou aos seus respectivos idealizadores. É expressamente proibida a reprodução, distribuição, revenda ou modificação sem a devida autorização prévia por escrito.
        </p>

        <h2>4. Limitação de Responsabilidade</h2>
        <p>
          As teses e estratégias apresentadas no manifesto &quot;O Código Brasil&quot; possuem caráter estritamente educativo e analítico. Não garantimos resultados financeiros específicos, aumento de faturamento imediato ou conversões padronizadas, visto que a performance de qualquer estratégia comercial depende de fatores individuais, operacionais e conjunturais do negócio de cada leitor.
        </p>

        <h2>5. Modificações e Atualizações</h2>
        <p>
          Reservamo-nos o direito de alterar, a qualquer momento e sem aviso prévio, os presentes Termos de Uso. Recomendamos que os usuários os verifiquem periodicamente.
        </p>

        <h2>6. Foro de Eleição</h2>
        <p>
          Para dirimir quaisquer controvérsias oriundas destes Termos de Uso, as partes elegem o foro da Comarca de <strong>TODO_DADO: Foro da cidade/estado</strong>, renunciando expressamente a qualquer outro, por mais privilegiado que seja.
        </p>
      </div>
    </div>
  );
}

import Image from "next/image";

type AuthorBioProps = {
  /** Texto da bio. Enquanto o dono não aprovar, permanece TODO_DADO. */
  text?: string;
  /** Exibe a foto do autor. */
  showPhoto?: boolean;
};

const AUTHOR_NAME = "Fabian Baldovino";
const AUTHOR_ROLE = "Brand Filmmaker";
const ABOUT_URL = "https://www.fabian.art.br/sobre";
const DEFAULT_TEXT = "Fabian Baldovino é uruguaio, vive em Porto Alegre (RS) e trabalha como brand filmmaker. Autodidata, começou na educação: em 2011, como educador social da Fundação de Educação e Cultura do Sport Club Internacional, desenvolveu com Eduardo Textor o projeto Curta nas Escolas, em que alunos de escolas municipais produziram curtas-metragens, e foi palestrante na UFRGS. Depois migrou para o audiovisual profissional: dirigiu a edição de três programas de TV em uma emissora afiliada da Rede Globo e atuou em agências e produtoras. Hoje faz filmes de marca, como a série Ele não vai embora (Termolar) e campanhas para Wedy Nutrition e Ristorante Fontana, a partir da leitura do código cultural. É autor do manifesto O Código Brasil.";

export default function AuthorBio({ text = DEFAULT_TEXT, showPhoto = true }: AuthorBioProps) {
  return (
    <aside aria-label="Sobre o autor" className="author-bio container">
      {showPhoto && (
        <Image
          src="/fabian.webp"
          alt={AUTHOR_NAME}
          width={120}
          height={120}
          className="author-bio__photo"
        />
      )}
      <div className="author-bio__body">
        <p className="author-bio__name">{AUTHOR_NAME}</p>
        <p className="author-bio__role">{AUTHOR_ROLE}</p>
        <p className="author-bio__text">{text}</p>
        <a
          className="author-bio__link"
          href={ABOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Conheça o trabalho de Fabian<span className="sr-only"> (abre em nova aba)</span>
        </a>
      </div>
    </aside>
  );
}

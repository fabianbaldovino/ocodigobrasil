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
const DEFAULT_TEXT = "TODO_DADO: texto da bio (aprovação do dono)";

export default function AuthorBio({ text = DEFAULT_TEXT, showPhoto = true }: AuthorBioProps) {
  return (
    <aside aria-label="Sobre o autor" className="author-bio container">
      {showPhoto && (
        <Image
          src="/fabian.jpg"
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

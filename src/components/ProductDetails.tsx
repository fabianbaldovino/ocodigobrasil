import React from 'react';
import { produto } from '@/data/produto';

const isTodo = (value: string) => value.startsWith('TODO_DADO');

export default function ProductDetails() {
  const isSample = process.env.NEXT_PUBLIC_SHOW_SAMPLE === '1';
  
  const showFormato = !isTodo(produto.formato);
  const showPaginas = !isTodo(produto.paginas);
  const showTempo = !isTodo(produto.tempoDeLeitura);
  const showAcesso = !isTodo(produto.formaDeAcesso);
  const showWhatsapp = !isTodo(produto.whatsapp);

  const hasAnyDetail = showFormato || showPaginas || showTempo || showAcesso;
  
  if (!hasAnyDetail && !showWhatsapp) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%', maxWidth: '1080px', margin: '0 auto' }}>
      
      {hasAnyDetail && (
        <section aria-labelledby="details-heading" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', maxWidth: '780px', margin: '0 auto', width: '100%' }}>
          {isSample && <div className="sample-banner" style={{ background: 'var(--accent)', color: 'white', padding: '0.25rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem', borderRadius: '4px' }}>EXEMPLO (somente prévia)</div>}
          <h2 id="details-heading" style={{ fontSize: 'var(--fs-h3)', marginBottom: '1.5rem', color: 'var(--foreground)' }}>Detalhes do Manifesto</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {showFormato && <li style={{ color: 'var(--text-muted)' }}><strong>Formato:</strong> {produto.formato}</li>}
            {showPaginas && <li style={{ color: 'var(--text-muted)' }}><strong>Páginas:</strong> {produto.paginas}</li>}
            {showTempo && <li style={{ color: 'var(--text-muted)' }}><strong>Tempo de leitura:</strong> {produto.tempoDeLeitura}</li>}
            {showAcesso && <li style={{ color: 'var(--text-muted)' }}><strong>Acesso:</strong> {produto.formaDeAcesso}</li>}
          </ul>
        </section>
      )}

      {showWhatsapp && (
        <section 
          aria-labelledby="diagnostico-heading" 
          className="consultoria-card"
        >
          {isSample && (
            <div className="sample-banner" style={{ background: 'var(--accent)', color: 'white', padding: '0.25rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem', borderRadius: '4px' }}>
              EXEMPLO (somente prévia)
            </div>
          )}

          <div className="consultoria-card__header">
            <span className="consultoria-card__eyebrow">Consultoria Estratégica &amp; Diagnóstico Cultural</span>
            <h2 id="diagnostico-heading" className="consultoria-card__title">
              Aplique a inteligência d&apos;O Código das Américas na sua empresa
            </h2>
            <p className="consultoria-card__desc">
              Uma imersão estratégica conduzida diretamente por <strong>Fabian Baldovino</strong> para decodificar a reputação, a comunicação e a jornada da sua marca sob os olhos do consumidor brasileiro — transformando desconfiança e frieza em acolhimento e conversão sustentável.
            </p>
          </div>

          <div className="consultoria-card__deliverables">
            {/* Bloco 1: Auditoria & Diagnóstico Casa × Rua */}
            <article className="consultoria-deliverable">
              <div className="consultoria-deliverable__head">
                <div className="consultoria-deliverable__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <path d="M11 8v6" />
                    <path d="M8 11h6" />
                  </svg>
                </div>
                <h3 className="consultoria-deliverable__title">Diagnóstico &amp; Auditoria Casa × Rua</h3>
                <p className="consultoria-deliverable__lead">
                  Leitura profunda da comunicação e da percepção pública da sua marca.
                </p>
              </div>

              <ul className="consultoria-deliverable__list">
                <li className="consultoria-deliverable__item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Pesquisa de Reputação Real:</strong> Varredura de conflitos e dores em canais públicos (Reclame Aqui, redes) por códigos culturais feridos.</span>
                </li>
                <li className="consultoria-deliverable__item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Termômetro da Comunicação:</strong> Diagnóstico frase a frase revelando onde a narrativa soa fria (&quot;Rua&quot;) ou acolhedora (&quot;Casa&quot;).</span>
                </li>
                <li className="consultoria-deliverable__item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Mapa da Jornada:</strong> Identificação cirúrgica de pontos de atrito e hostilidade da descoberta ao pós-venda.</span>
                </li>
              </ul>
            </article>

            {/* Bloco 2: Dossiê Estratégico & Posicionamento */}
            <article className="consultoria-deliverable">
              <div className="consultoria-deliverable__head">
                <div className="consultoria-deliverable__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="consultoria-deliverable__title">Dossiê Estratégico &amp; Tom de Voz</h3>
                <p className="consultoria-deliverable__lead">
                  Posicionamento como porto seguro e diretrizes narrativas blindadas.
                </p>
              </div>

              <ul className="consultoria-deliverable__list">
                <li className="consultoria-deliverable__item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Papel da Marca &amp; Promessa:</strong> Posicionamento da empresa como fiadora e porto seguro (&quot;o padrinho&quot;) perante o consumidor.</span>
                </li>
                <li className="consultoria-deliverable__item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Matriz &quot;Diga / Evite&quot;:</strong> Guia prático de vocabulário eliminando expressões burocráticas que acionam desconfiança.</span>
                </li>
                <li className="consultoria-deliverable__item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Auditoria de Riscos &amp; Plano:</strong> Apresentação executiva em PDF (16:9) com prioridades de 30, 90 e 180 dias e blindagem CONAR/CDC.</span>
                </li>
              </ul>
            </article>

            {/* Bloco 3: Estúdio de Aplicação Prática */}
            <article className="consultoria-deliverable">
              <div className="consultoria-deliverable__head">
                <div className="consultoria-deliverable__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M7 4v4" />
                    <path d="M12 4v4" />
                    <path d="M17 4v4" />
                    <path d="M2 8h20" />
                    <polyline points="9 13 12 16 16 12" />
                  </svg>
                </div>
                <h3 className="consultoria-deliverable__title">Estúdio de Peças &amp; Roteiros Prontos</h3>
                <p className="consultoria-deliverable__lead">
                  Scripts e peças acionáveis para a equipe de vendas, atendimento e marketing.
                </p>
              </div>

              <ul className="consultoria-deliverable__list">
                <li className="consultoria-deliverable__item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Roteiros de Vendas &amp; WhatsApp:</strong> Mensagens comerciais humanizadas no tom &quot;Casa&quot;, sem a frieza de scripts robotizados.</span>
                </li>
                <li className="consultoria-deliverable__item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Design do Perdão no SAC:</strong> Protocolos de acolhimento para momentos de erro ou reclamação, revertendo atritos em lealdade.</span>
                </li>
                <li className="consultoria-deliverable__item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Roteiros de Vídeo &amp; Copies:</strong> Fichas de produção audiovisual (elenco, cenas, falas) e variações de anúncios Fazer vs. Pertencer.</span>
                </li>
              </ul>
            </article>
          </div>

          <div className="consultoria-card__methodology">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <circle cx="12" cy="12" r="10" />
              <polygon points="12 8 8 12 12 16 16 12 12 8" />
            </svg>
            <span>
              Metodologia proprietária fundamentada no catálogo de 224 códigos culturais das Américas e no método O Código Brasil (cruzando DaMatta, Freyre, Hofstede, GLOBE e PESB).
            </span>
          </div>

          <div className="consultoria-card__action">
            <a 
              href={`https://wa.me/${produto.whatsapp}?text=${encodeURIComponent('Olá Fabian, li o manifesto O Código Brasil e gostaria de conversar sobre o Diagnóstico Cultural do Código das Américas para a minha empresa.')}`}
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Solicitar Diagnóstico Estratégico pelo WhatsApp com Fabian Baldovino (abre em nova aba)"
              className="btn-whatsapp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              <span>Solicitar Diagnóstico Estratégico pelo WhatsApp</span>
            </a>
            <p className="consultoria-card__footnote">
              Conversa direta e confidencial com Fabian Baldovino • Sem intermediários ou robôs
            </p>
          </div>
        </section>
      )}

    </div>
  );
}


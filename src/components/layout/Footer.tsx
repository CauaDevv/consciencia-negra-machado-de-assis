import { creditosImagens, fontes } from '@/data/content'

export function Footer() {
  return (
    <footer className="footer" id="fontes" aria-labelledby="fontes-titulo">
      <div className="container">
        <div className="footer__topo">
          <h2 id="fontes-titulo" className="footer__titulo">Fontes <em>e créditos</em></h2>
          <p>Todas as informações desta página podem ser conferidas. Os números entre colchetes, ao longo do texto, levam a esta lista.</p>
        </div>

        <ol className="fontes">
          {fontes.map((f) => (
            <li key={f.n} id={`fonte-${f.n}`}>
              <span className="fontes__n">{String(f.n).padStart(2, '0')}</span>
              {f.url ? <a href={f.url} target="_blank" rel="noopener noreferrer">{f.rotulo}<span className="sr-only"> (abre em nova aba)</span></a> : <span>{f.rotulo}</span>}
            </li>
          ))}
        </ol>

        <div className="footer__colunas">
          <div>
            <h3>Imagens</h3>
            <p>Fotografias e documentos de Machado de Assis em <strong>domínio público</strong>, obtidos no Wikimedia Commons. Sem alterações além de recorte, tamanho e conversão.</p>
            <ul>
              {creditosImagens.map((c) => (
                <li key={c.url}><a href={c.url} target="_blank" rel="noopener noreferrer">{c.rotulo}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Sobre o trabalho</h3>
            <p>Página escolar feita para o <strong>Dia Nacional de Zumbi e da Consciência Negra</strong>, 20 de novembro de 2026. Os textos são autorais, escritos a partir das fontes acima.</p>
            <p className="footer__nota">Nota de rigor: biógrafos divergem sobre alguns detalhes da família de Machado (como a profissão da mãe). Adotamos a Academia Brasileira de Letras como referência principal.</p>
          </div>
          <div>
            <h3>Tecnologia</h3>
            <p>React, Motion, Lenis e OGL. A aurora do início é um shader do <a href="https://reactbits.dev/backgrounds/aurora" target="_blank" rel="noopener noreferrer">React Bits</a>. Fontes: Fraunces, Source Serif 4 e JetBrains Mono.</p>
          </div>
        </div>

        <p className="footer__assinatura" aria-hidden="true">Consciência negra o ano inteiro.</p>
      </div>
    </footer>
  )
}

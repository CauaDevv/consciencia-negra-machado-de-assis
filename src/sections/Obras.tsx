import { Reveal } from '@/components/motion/Reveal'
import { StaggerText } from '@/components/motion/StaggerText'
import { BordaLuminosa } from '@/components/ui/BordaLuminosa'
import { Refs } from '@/components/ui/Refs'
import { obras, type Obra } from '@/data/content'
import { dimensoes, imagens, type ChaveImagem } from '@/data/imagens'

/** Capas desenhadas em CSS quando não há imagem de domínio público da capa original. */
function Capa({ obra }: { obra: Obra }) {
  if (obra.capa) {
    return (
      <div className="capa capa--foto">
        <img src={imagens[obra.capa as ChaveImagem]} width={dimensoes[obra.capa as ChaveImagem][0]} height={dimensoes[obra.capa as ChaveImagem][1]} alt={`Capa da primeira edição de Relíquias de Casa Velha (1906), livro que traz o conto ${obra.titulo}.`} loading="lazy" decoding="async" />
      </div>
    )
  }
  if (obra.tipo === 'jornal') {
    return (
      <div className="capa capa--jornal" aria-hidden="true">
        <span className="capa__mastro">Gazeta de Notícias</span>
        <span className="capa__data">Rio de Janeiro · 1888</span>
        <strong>Bons Dias!</strong>
        <i /><i /><i /><i />
      </div>
    )
  }
  return (
    <div className="capa capa--livro" aria-hidden="true">
      <span className="capa__filete" />
      <strong>Memórias Póstumas<br />de Brás Cubas</strong>
      <span className="capa__autor">Machado de Assis</span>
      <span className="capa__filete" />
    </div>
  )
}

export function Obras() {
  return (
    <section id="obras" className="sec sec--paper obras" aria-labelledby="obras-titulo">
      <div className="container">
        <div className="sec__head">
          <p className="eyebrow">03 · O escritor</p>
          <h2 id="obras-titulo" className="sec__title">
            <StaggerText text="Machado olhou" /> <StaggerText text="para a" delay={0.1} /> <StaggerText text="escravidão." delay={0.18} className="acento" />
          </h2>
          <Reveal as="p" className="sec__lead" delay={0.15}>
            Machado quase nunca escreveu panfletos. Escreveu ironia. Muitos estudiosos leem nas páginas dele uma crítica afiada à sociedade escravista, e três textos mostram isso.
          </Reveal>
        </div>

        <ul className="obras__grade">
          {obras.map((o, i) => (
            <Reveal as="li" key={o.titulo} kind="card" delay={i * 0.12} amount={0.12} className="obras__item">
              <BordaLuminosa as="article" className="obra" raio={26}>
                <Capa obra={o} />
                <div className="obra__corpo">
                  <p className="obra__meta"><span>{o.tipo === 'livro' ? 'Literatura' : 'Crônica'}</span><span>{o.ano}</span></p>
                  <h3 className="obra__titulo">{o.titulo}</h3>
                  <p className="obra__sub">{o.subtitulo}</p>
                  {o.trecho && <blockquote className="obra__trecho">{o.trecho}</blockquote>}
                  <p>{o.texto}</p>
                  <p className="obra__leitura">{o.leitura}<Refs ids={o.ref} /></p>
                </div>
              </BordaLuminosa>
            </Reveal>
          ))}
        </ul>

        <Reveal className="obras__dica">
          <p><strong>Para ler:</strong> “Pai contra Mãe” é um conto curto e está em domínio público, ou seja, pode ser lido de graça. Depois, conte para alguém o que você sentiu.</p>
        </Reveal>
      </div>
    </section>
  )
}

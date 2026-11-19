import { Reveal } from '@/components/motion/Reveal'
import { StaggerText } from '@/components/motion/StaggerText'
import { FallingTags } from '@/components/motion/FallingTags'
import { BordaLuminosa } from '@/components/ui/BordaLuminosa'
import { Icon } from '@/components/ui/Icon'
import { Refs } from '@/components/ui/Refs'
import { comoAgir, leis, tagsLei } from '@/data/content'

/** "Racismo é crime": tags que caem, o que a lei diz, como agir e o Disque 100. */
export function Direitos() {
  return (
    <>
      <section id="direitos" className="sec sec--ink direitos" aria-labelledby="direitos-titulo">
        <div className="container">
          <div className="sec__head">
            <p className="eyebrow">06 · Enfrentar o racismo</p>
            <h2 id="direitos-titulo" className="sec__title">
              <StaggerText text="Racismo" /> <StaggerText text="é" delay={0.1} /> <StaggerText text="crime." delay={0.18} className="acento" />
            </h2>
            <Reveal as="p" className="sec__lead" delay={0.15}>
              Lembrar de Zumbi e de Machado é importante. Mas a consciência negra só vira mudança quando a gente sabe o que a lei diz e o que fazer quando o racismo aparece.
            </Reveal>
          </div>

          <FallingTags items={tagsLei} />
        </div>
      </section>

      <section id="leis" data-nav="direitos" className="sec sec--ink direitos leis-sec" aria-label="O que a lei diz">
        <div className="container">
          <ul className="leis">
            {leis.map((l, i) => (
              <Reveal as="li" key={l.sigla} kind="card" delay={i * 0.08} className="leis__item">
                <BordaLuminosa as="article" className="lei" cor="var(--red)" raio={20}>
                  <span className="lei__sigla">{l.sigla}</span>
                  <h3>{l.titulo}</h3>
                  <p>{l.texto}<Refs ids={l.ref} /></p>
                </BordaLuminosa>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="agir" data-nav="direitos" className="sec sec--ink direitos agir-sec" aria-labelledby="agir-titulo">
        <div className="container">
          <div className="agir">
            <Reveal className="agir__cabeca">
              <h2 id="agir-titulo" className="agir__titulo">E se acontecer <em>com você ou perto de você?</em></h2>
            </Reveal>
            <ol className="agir__passos">
              {comoAgir.map((a, i) => (
                <Reveal as="li" key={a.titulo} delay={i * 0.07} className="agir__passo">
                  <span className="agir__n" aria-hidden="true">{i + 1}</span>
                  <h3>{a.titulo}</h3>
                  <p>{a.texto}{i === 3 && <Refs ids={[15]} />}</p>
                </Reveal>
              ))}
            </ol>

            <Reveal kind="scale" className="disque">
              <div className="disque__num" aria-hidden="true">100</div>
              <div className="disque__texto">
                <p className="disque__titulo">Disque Direitos Humanos</p>
                <p>Gratuito, funciona 24 horas, inclusive em feriados, e a denúncia pode ser anônima. Você recebe um número de protocolo para acompanhar.</p>
                <a className="disque__ligar" href="tel:100"><Icon name="phone" /> Ligar para o 100</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

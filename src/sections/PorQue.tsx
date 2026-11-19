import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { CountUp } from '@/components/motion/CountUp'
import { Reveal } from '@/components/motion/Reveal'
import { ScrollTextReveal } from '@/components/motion/ScrollTextReveal'
import { BordaLuminosa } from '@/components/ui/BordaLuminosa'
import { Refs } from '@/components/ui/Refs'
import { manifesto, marcos, numeros } from '@/data/content'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function LinhaDoTempo() {
  const ref = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 72%', 'end 58%'] })
  const fio = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  return (
    <ol ref={ref} className="tempo">
      <li className="tempo__trilho" aria-hidden="true">
        <motion.span className="tempo__fio" style={{ scaleY: reduced ? 1 : fio }} />
      </li>
      {marcos.map((m, i) => (
        <Reveal as="li" key={m.ano} className="tempo__item" kind={i % 2 ? 'right' : 'left'} amount={0.3}>
          <span className="tempo__ponto" aria-hidden="true" />
          <div className="tempo__cartao">
            <span className="tempo__ano">{m.ano}</span>
            <h3>{m.titulo}</h3>
            <p>{m.texto}<Refs ids={m.ref} /></p>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}

/** "A data": o manifesto fica parado na tela (sticky) enquanto as palavras se revelam com a rolagem; depois, as datas e os números. */
export function PorQue() {
  return (
    <>
      <section id="data" className="sec sec--paper porque" aria-labelledby="manifesto">
        <div className="container">
          <p className="eyebrow porque__eyebrow">01 · A data</p>
        </div>
        <ScrollTextReveal id="manifesto">{manifesto}</ScrollTextReveal>
      </section>

      <section id="marcos" data-nav="data" className="sec sec--paper marcos" aria-labelledby="marcos-titulo">
        <div className="container">
          <Reveal className="sec__head porque__titulo-tempo">
            <h2 id="marcos-titulo" className="sec__title porque__h3">Cinco datas que <em>explicam o feriado</em></h2>
            <p className="sec__lead">O 20 de novembro não nasceu por acaso. É resultado de uma luta de séculos, que continua.</p>
          </Reveal>

          <LinhaDoTempo />
        </div>
      </section>

      <section id="numeros" data-nav="data" className="sec sec--paper numeros-sec" aria-label="Números que ajudam a entender o Brasil">
        <div className="container">
          <ul className="numeros">
            {numeros.map((n) => (
              <Reveal as="li" key={n.rotulo} kind="card" className="numeros__item">
                <BordaLuminosa className="numero">
                  <strong className="numero__valor"><CountUp to={n.valor} decimals={n.decimais} suffix={n.sufixo} agrupar={n.agrupar} /></strong>
                  <span className="numero__rotulo">{n.rotulo}</span>
                  <small className="numero__nota">{n.nota}<Refs ids={n.ref} /></small>
                </BordaLuminosa>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

import { Reveal } from '@/components/motion/Reveal'
import { StaggerText } from '@/components/motion/StaggerText'
import { ComparadorImagem } from '@/components/ui/ComparadorImagem'
import { Refs } from '@/components/ui/Refs'
import { apagamento } from '@/data/content'
import { imagens } from '@/data/imagens'

export function Apagamento() {
  return (
    <section id="apagamento" className="sec sec--ink2 apagamento" aria-labelledby="apagamento-titulo">
      <div className="container apagamento__grade">
        <div className="apagamento__texto">
          <p className="eyebrow">04 · O apagamento</p>
          <h2 id="apagamento-titulo" className="sec__title">
            <StaggerText text="Tentaram" /> <StaggerText text="clarear" delay={0.1} className="acento" /> <StaggerText text="Machado." delay={0.2} />
          </h2>

          {apagamento.paragrafos.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 0.08}>
              {p}
              {i === 0 && <Refs ids={[2]} />}
              {i === 1 && <Refs ids={[2]} />}
              {i === 2 && <Refs ids={[3, 4]} />}
            </Reveal>
          ))}

          <Reveal as="blockquote" className="apagamento__fecho" delay={0.1}>{apagamento.fecho}</Reveal>
        </div>

        <Reveal kind="scale" duration={1} className="apagamento__visual">
          <ComparadorImagem
            esquerda={imagens.compararClara}
            direita={imagens.compararEscura}
            altEsquerda="Retrato de Machado de Assis de cabelo curto, bigode e pincenê, em uma reprodução de tons bem claros."
            altDireita="O mesmo retrato de Machado de Assis, em uma reprodução de tons mais escuros."
            rotuloEsquerda="Reprodução clara"
            rotuloDireita="Reprodução escura"
          />
          <p className="apagamento__nota">{apagamento.comparadorNota}</p>
        </Reveal>
      </div>
    </section>
  )
}

import { Reveal } from '@/components/motion/Reveal'
import { TracoAssinatura } from '@/components/motion/TracoAssinatura'
import { StaggerText } from '@/components/motion/StaggerText'
import { FlowLink } from '@/components/ui/FlowButton'

export function Fecho() {
  return (
    <section className="sec sec--ink fecho" aria-labelledby="fecho-titulo">
      <div className="fecho__brilho" aria-hidden="true" />
      <div className="container fecho__miolo">
        <h2 id="fecho-titulo" className="fecho__titulo">
          <StaggerText text="Consciência" /> <StaggerText text="negra" delay={0.1} /> <br className="br-desk" />
          <StaggerText text="não cabe" delay={0.2} className="acento" /> <StaggerText text="em um dia." delay={0.3} className="acento" />
        </h2>

        <Reveal as="p" className="fecho__texto" delay={0.2}>
          Leia Machado. Lembre de Zumbi. Chame o racismo pelo nome. E faça do 20 de novembro o primeiro dia de um ano inteiro de respeito.
        </Reveal>

        <div className="fecho__assinatura">
          <TracoAssinatura />
          <p>Machado de Assis (1839–1908)</p>
        </div>

        <Reveal className="fecho__acoes" delay={0.1}>
          <FlowLink href="#topo">Voltar ao início</FlowLink>
          <FlowLink href="#fontes" variante="escuro">Ver as fontes</FlowLink>
        </Reveal>
      </div>
    </section>
  )
}

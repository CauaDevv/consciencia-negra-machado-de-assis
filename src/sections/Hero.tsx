import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { HeroAurora } from '@/components/motion/HeroAurora'
import { Entra } from '@/components/motion/Reveal'
import { StaggerText } from '@/components/motion/StaggerText'
import { TextReveal } from '@/components/motion/TextReveal'
import { FlowLink } from '@/components/ui/FlowButton'
import { Refs } from '@/components/ui/Refs'
import { hero } from '@/data/content'
import { imagens } from '@/data/imagens'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIntroPronta } from '@/lib/intro'

/**
 * Tese visual (hero-art-direction): "o retrato que a história tentou clarear, devolvido em
 * toda a sua força". Protagonista: o retrato de 1904 dentro de um arco (portal do Rio colonial),
 * com o nome gigante atrás e uma aurora dourada e vermelha. A foto NÃO recebe filtro que
 * clareie a pele: só escala de cinza e um leve tom de papel.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const pronta = useIntroPronta()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const gigante = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const retratoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.3])
  const textoY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  return (
    <section id="topo" ref={ref} className="hero sec sec--ink" aria-labelledby="hero-titulo">
      <div className="hero__fundo" aria-hidden="true">
        <div className="hero__brilho" />
        <HeroAurora />
      </div>

      <motion.div className="hero__gigante" aria-hidden="true" style={{ x: reduced ? 0 : gigante }}>
        <span>Machado</span>
      </motion.div>

      <div className="container hero__grade">
        <motion.div className="hero__texto" style={{ y: reduced ? 0 : textoY }}>
          <Entra><p className="eyebrow">{hero.eyebrow}</p></Entra>

          <h1 id="hero-titulo" className="hero__titulo">
            <StaggerText load text="Machado de Assis" delay={0.05} />{' '}
            <StaggerText load text="era" delay={0.28} />{' '}
            <StaggerText load text="negro." delay={0.42} className="acento" />
          </h1>

          <p className="hero__lead">
            <TextReveal as="span" per="word" preset="fade-in-blur" trigger={pronta} delay={0.6} speedReveal={1.4}>{hero.lead}</TextReveal>
            <Refs ids={hero.ref} />
          </p>

          <Entra delay={1.2} className="hero__ctas">
            <FlowLink href="#data">Entenda o 20 de novembro</FlowLink>
            <FlowLink href="#quiz" variante="escuro">Faça o quiz</FlowLink>
          </Entra>
        </motion.div>

        <motion.figure className="hero__retrato" style={{ y: reduced ? 0 : retratoY }}>
          <motion.div
            className="arco"
            initial={reduced ? false : { clipPath: 'inset(100% 0 0 0 round 999px 999px 28px 28px)' }}
            animate={pronta ? { clipPath: 'inset(0% 0 0 0 round 999px 999px 28px 28px)' } : undefined}
            transition={{ duration: 1.3, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.img
              src={imagens.foto1904}
              alt="Retrato de Machado de Assis, de perfil, já idoso, de cabelos e barba grisalhos e pincenê, fotografado por volta de 1904."
              width={1000}
              height={1299}
              fetchPriority="high"
              decoding="async"
              style={{ scale: reduced ? 1.04 : imgScale }}
            />
            <span className="arco__sombra" />
            <span className="corner corner--tl" style={{ opacity: 1 }} />
            <span className="corner corner--br" style={{ opacity: 1 }} />
          </motion.div>

          <Entra delay={1.0} className="selo-wrap" y={0}>
            <div className="selo" aria-hidden="true">
              <svg viewBox="0 0 200 200">
                <defs><path id="selo-circulo" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" /></defs>
                <text><textPath href="#selo-circulo" startOffset="0">20 de novembro · Consciência Negra · Zumbi vive · </textPath></text>
              </svg>
              <span className="selo__num">20<small>/11</small></span>
            </div>
          </Entra>

          <ul className="chips" aria-label="Quem foi Machado de Assis">
            {hero.chips.map((c, i) => (
              <motion.li
                key={c}
                className={`chip chip--${i + 1}`}
                initial={reduced ? false : { opacity: 0, scale: 0.6, y: -40 }}
                animate={pronta ? { opacity: 1, scale: 1, y: 0 } : undefined}
                transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 1.1 + i * 0.12 }}
              >
                <span>{c}</span>
              </motion.li>
            ))}
          </ul>

          <figcaption>Machado de Assis, c. 1904 · Arquivo Nacional (domínio público)</figcaption>
        </motion.figure>
      </div>

      <a className="hero__rolar" href="#data" aria-label="Rolar para a próxima seção">
        <span>Role</span><i aria-hidden="true" />
      </a>
    </section>
  )
}

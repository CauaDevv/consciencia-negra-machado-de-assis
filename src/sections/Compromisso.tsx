import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { StaggerText } from '@/components/motion/StaggerText'
import { Icon } from '@/components/ui/Icon'
import { compromissos } from '@/data/content'

const R = 54
const CIRC = 2 * Math.PI * R

/** Compromisso da turma: nada é enviado nem guardado, é um gesto pessoal. */
export function Compromisso() {
  const [marcados, setMarcados] = useState<boolean[]>(() => compromissos.map(() => false))
  const uid = useId()
  const feitos = marcados.filter(Boolean).length
  const total = compromissos.length
  const completo = feitos === total

  return (
    <section id="compromisso" className="sec sec--paper compromisso" aria-labelledby="compromisso-titulo">
      <div className="container compromisso__grade">
        <div className="compromisso__texto">
          <p className="eyebrow">07 · Sua vez</p>
          <h2 id="compromisso-titulo" className="sec__title">
            <StaggerText text="Assuma" /> <StaggerText text="o" delay={0.08} /> <StaggerText text="compromisso." delay={0.14} className="acento" />
          </h2>
          <Reveal as="p" className="sec__lead" delay={0.15}>
            Consciência negra não é só saber. É fazer. Marque o que você se compromete a fazer a partir de hoje.
          </Reveal>

          <div className="anel" role="img" aria-label={`${feitos} de ${total} compromissos marcados`}>
            <svg viewBox="0 0 132 132" aria-hidden="true">
              <circle cx="66" cy="66" r={R} className="anel__trilho" />
              <motion.circle
                cx="66" cy="66" r={R} className="anel__fio"
                strokeDasharray={CIRC}
                animate={{ strokeDashoffset: CIRC * (1 - feitos / total) }}
                transition={{ type: 'spring', stiffness: 90, damping: 18 }}
                transform="rotate(-90 66 66)"
              />
            </svg>
            <span className="anel__num"><strong>{feitos}</strong>/{total}</span>
          </div>
        </div>

        <fieldset className="compromisso__lista">
          <legend className="sr-only">Meus compromissos</legend>
          {compromissos.map((c, i) => {
            const id = `${uid}-${i}`
            return (
              <Reveal as="p" key={c} delay={i * 0.06} amount={0.4} className="compromisso__linha">
                <input id={id} type="checkbox" checked={marcados[i]} onChange={() => setMarcados((m) => m.map((v, j) => (j === i ? !v : v)))} />
                <label htmlFor={id}>
                  <span className="caixa" aria-hidden="true"><Icon name="check" /></span>
                  <span>{c}</span>
                </label>
              </Reveal>
            )
          })}

          <div className="compromisso__selo-area" aria-live="polite">
            <AnimatePresence>
              {completo && (
                <motion.div
                  className="selo-compromisso"
                  initial={{ opacity: 0, scale: 0.4, rotate: -24 }}
                  animate={{ opacity: 1, scale: 1, rotate: -6 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 12 }}
                >
                  <strong>Compromisso assumido</strong>
                  <span>20 · 11 · 2026</span>
                </motion.div>
              )}
            </AnimatePresence>
            {!completo && <p className="compromisso__dica">Marque todos para receber o seu selo.</p>}
          </div>
        </fieldset>
      </div>
    </section>
  )
}

import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { nomeTraco } from '@/data/traco'

const DURACAO_MS = 3500

/**
 * Abertura: o nome é riscado à pena (contorno) e depois preenchido.
 * Técnica de traço animado: fonte convertida em contornos SVG +
 * pathLength. Quem pede menos movimento não vê a abertura.
 */
export function IntroTraco({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion()
  const [aberta, setAberta] = useState(true)
  const finalizada = useRef(false)

  const encerrar = useCallback(() => {
    if (finalizada.current) return
    finalizada.current = true
    setAberta(false)
    window.setTimeout(onDone, 380) // o hero começa a entrar enquanto a cortina sobe
  }, [onDone])

  useEffect(() => {
    if (reduced) { encerrar(); return }
    const root = document.documentElement
    root.classList.add('intro-ativa')
    const timer = window.setTimeout(encerrar, DURACAO_MS)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') encerrar() }
    window.addEventListener('keydown', onKey)
    return () => { window.clearTimeout(timer); window.removeEventListener('keydown', onKey); root.classList.remove('intro-ativa') }
  }, [reduced, encerrar])

  return (
    <AnimatePresence onExitComplete={() => document.documentElement.classList.remove('intro-ativa')}>
      {aberta && !reduced && (
        <motion.div
          className="intro"
          role="status"
          aria-label="Carregando a página sobre Machado de Assis"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] } }}
          onClick={encerrar}
        >
          <motion.p className="intro__kicker" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            20 de novembro · Consciência Negra
          </motion.p>

          <svg className="intro__nome" viewBox={nomeTraco.viewBox} fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
            {nomeTraco.letras.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke="var(--gold)"
                strokeWidth={3.2}
                strokeLinejoin="round"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0, fillOpacity: 0, fill: 'rgb(242 232 212)' }}
                animate={{ pathLength: 1, opacity: 1, fillOpacity: 1 }}
                transition={{
                  opacity: { duration: 0.01, delay: 0.25 + i * 0.07 },
                  pathLength: { duration: 1.15, delay: 0.25 + i * 0.07, ease: 'easeInOut' },
                  fillOpacity: { duration: 0.55, delay: 1.55 + i * 0.03, ease: 'easeOut' },
                }}
              />
            ))}
          </svg>

          <motion.span className="intro__barra" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: DURACAO_MS / 1000 - 0.3, ease: 'linear' }} />
          <button type="button" className="intro__pular" onClick={encerrar}>Pular abertura</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

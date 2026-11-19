import { motion, type Easing } from 'motion/react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIntroPronta } from '@/lib/intro'

export const easeOut: Easing = [0.22, 1, 0.36, 1]

type Kind = 'rise' | 'scale' | 'card' | 'left' | 'right'

/** Aparece quando entra na tela. */
export function Reveal({
  children, className, duration = 0.8, delay = 0, kind = 'rise', as = 'div', amount = 0.15,
}: {
  children: ReactNode
  className?: string
  duration?: number
  delay?: number
  kind?: Kind
  as?: 'div' | 'li' | 'article' | 'section' | 'p' | 'blockquote'
  amount?: number
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as]
  const hidden =
    kind === 'scale' ? { opacity: 0, scale: 0.86 }
    : kind === 'card' ? { opacity: 0, y: 44, rotate: 2.5 }
    : kind === 'left' ? { opacity: 0, x: -48 }
    : kind === 'right' ? { opacity: 0, x: 48 }
    : { opacity: 0, y: 36 }
  const shown =
    kind === 'scale' ? { opacity: 1, scale: 1 }
    : kind === 'card' ? { opacity: 1, y: 0, rotate: 0 }
    : kind === 'left' || kind === 'right' ? { opacity: 1, x: 0 }
    : { opacity: 1, y: 0 }
  return (
    <MotionTag
      className={className}
      initial={reduced ? false : hidden}
      whileInView={shown}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: easeOut }}
    >
      {children}
    </MotionTag>
  )
}

/** Entra quando a abertura termina (para o conteúdo do hero). */
export function Entra({ children, className, delay = 0, y = 28 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const reduced = useReducedMotion()
  const pronta = useIntroPronta()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      animate={pronta ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}

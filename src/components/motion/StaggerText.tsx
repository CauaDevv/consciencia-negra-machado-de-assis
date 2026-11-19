import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIntroPronta } from '@/lib/intro'
import { easeOut } from './Reveal'

/** Palavra por palavra, subindo de uma máscara. */
export function StaggerText({
  text, className, delay = 0, duration = 0.7, load = false,
}: { text: string; className?: string; delay?: number; duration?: number; load?: boolean }) {
  const reduced = useReducedMotion()
  const pronta = useIntroPronta()
  // O gatilho é o contêiner, que não se move: a palavra começa fora da máscara (overflow hidden)
  // e, se fosse ela a observada, o IntersectionObserver nunca a veria entrar.
  const raiz = useRef<HTMLSpanElement>(null)
  const visivel = useInView(raiz, { once: true, amount: 0.4 })
  const words = text.split(' ')
  const shown = { y: '0%', opacity: 1, rotate: 0 }
  return (
    <span ref={raiz} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span className="word-mask" key={`${i}-${word}`}>
            <motion.span
              className="animated-word"
              initial={reduced ? false : { y: '105%', opacity: 0, rotate: 5 }}
              animate={(load ? pronta : visivel) ? shown : undefined}
              transition={{ duration, delay: delay + i * 0.06, ease: easeOut }}
            >
              {word}{i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  )
}

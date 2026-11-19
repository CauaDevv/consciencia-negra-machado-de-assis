import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { easeOut } from './Reveal'

// posições (em %) dentro do palco; cada etiqueta cai e assenta com uma inclinação própria
const POSICOES = [
  { x: 3, y: 8, r: -7 }, { x: 36, y: 4, r: 5 }, { x: 62, y: 10, r: -4 },
  { x: 14, y: 30, r: 6 }, { x: 46, y: 27, r: -6 }, { x: 74, y: 33, r: 4 },
  { x: 2, y: 54, r: -3 }, { x: 33, y: 52, r: 7 }, { x: 56, y: 57, r: -7 },
  { x: 3, y: 77, r: 5 }, { x: 70, y: 80, r: -4 }, { x: 26, y: 78, r: 6 },
] // as etiquetas mais longas ficam com x ≤ 60% para não passar da borda


/** Etiquetas que despencam e assentam quando o palco entra na tela. */
export function FallingTags({ items }: { items: readonly string[] }) {
  const reduced = useReducedMotion()
  const palco = useRef<HTMLDivElement>(null)
  // as etiquetas começam acima do palco (recortado por overflow); quem observa é o palco
  const visivel = useInView(palco, { once: true, amount: 0.25 })
  return (
    <div ref={palco} className="falling-tags" aria-hidden="true">
      {items.map((text, i) => {
        const p = POSICOES[i % POSICOES.length]
        return (
          <motion.span
            key={text}
            className={`falling-tag tone-${i % 4}`}
            style={{ left: `${p.x}%`, top: `${p.y}%`, rotate: reduced ? p.r : undefined }}
            initial={reduced ? { opacity: 0 } : { y: -420 - (i % 3) * 80, rotate: p.r - 50, opacity: 0 }}
            animate={visivel ? (reduced ? { opacity: 1 } : { y: [-(420 + (i % 3) * 80), 0, -10, 0], rotate: [p.r - 50, p.r + 8, p.r - 3, p.r], opacity: [0, 1, 1, 1] }) : undefined}
            transition={{ duration: reduced ? 0.15 : 1.5, delay: reduced ? 0 : i * 0.08, ease: easeOut }}
          >
            {text}
          </motion.span>
        )
      })}
    </div>
  )
}

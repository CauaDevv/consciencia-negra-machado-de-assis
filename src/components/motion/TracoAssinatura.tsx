import { motion } from 'motion/react'
import { useMemo } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { assinaturaTraco } from '@/data/traco'

const primeiroX = (d: string) => Number(d.match(/M\s*([\d.]+)/)?.[1] ?? 0)

/**
 * Assinatura de Machado de Assis (autógrafo em domínio público, Wikimedia Commons),
 * vetorizada e riscada da esquerda para a direita quando entra na tela.
 */
export function TracoAssinatura({ className }: { className?: string }) {
  const reduced = useReducedMotion()
  const caminhos = useMemo(() => [...assinaturaTraco.caminhos].sort((a, b) => primeiroX(a) - primeiroX(b)), [])
  const n = caminhos.length
  return (
    <motion.svg
      className={className}
      viewBox={assinaturaTraco.viewBox}
      fill="none"
      role="img"
      aria-label="Assinatura de Machado de Assis"
      initial="parado"
      whileInView="animando"
      viewport={{ once: true, amount: 0.5 }}
    >
      {caminhos.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="var(--gold)"
          strokeWidth={2.2}
          strokeLinejoin="round"
          strokeLinecap="round"
          variants={{
            parado: reduced ? { pathLength: 1, fillOpacity: 1, fill: 'rgb(242 232 212)' } : { pathLength: 0, fillOpacity: 0, fill: 'rgb(242 232 212)' },
            animando: {
              pathLength: 1,
              fillOpacity: 1,
              transition: {
                pathLength: { duration: 1.1, delay: (i / n) * 1.9, ease: 'easeInOut' },
                fillOpacity: { duration: 0.6, delay: 1.2 + (i / n) * 1.9, ease: 'easeOut' },
              },
            },
          }}
        />
      ))}
    </motion.svg>
  )
}

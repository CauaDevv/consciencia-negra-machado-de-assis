import { motion, useScroll, useSpring } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function Barra() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.25 })
  return <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX, transformOrigin: 'left' }} />
}

/** Barra de progresso de leitura no topo. */
export function ScrollProgress() {
  return useReducedMotion() ? null : <Barra />
}

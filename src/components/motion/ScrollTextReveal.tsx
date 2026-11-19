import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type ScrollWordProps = {
  progress: MotionValue<number>
  index: number
  total: number
  children: string
}

function ScrollWord({ progress, index, total, children }: ScrollWordProps) {
  const start = total <= 1 ? 0 : (index / total) * 0.84
  const end = Math.min(start + Math.max(0.12, 1 / total), 1)
  const localProgress = useTransform(progress, (value) => Math.max(0, Math.min(1, (value - start) / (end - start))))
  const opacity = localProgress
  const y = useTransform(localProgress, [0, 1], [20, 0])
  const filter = useTransform(localProgress, [0, 1], ['blur(12px)', 'blur(0px)'])

  return <motion.span className="text-reveal__segment" style={{ filter, opacity, y }}>{children}</motion.span>
}

export function ScrollTextReveal({ id, children, className = '' }: { id: string; children: string; className?: string }) {
  const track = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ['start start', 'end end'],
  })
  const parts = children.split(/(\s+)/)
  const words = parts.filter((part) => part.trim()).length
  let wordIndex = 0

  return (
    <div ref={track} className="scroll-text-reveal">
      <div className="scroll-text-reveal__stage">
        <h2 className={`${className} scroll-text-reveal__ghost`.trim()} aria-hidden="true">{children}</h2>
        <h2 id={id} className={className}>
          {parts.map((part, index) => {
            if (!part.trim()) return <span key={`space-${index}`}>{part}</span>
            const current = wordIndex++
            return reducedMotion
              ? <span className="text-reveal__segment" key={`word-${index}`}>{part}</span>
              : <ScrollWord progress={scrollYProgress} index={current} total={words} key={`word-${index}`}>{part}</ScrollWord>
          })}
        </h2>
      </div>
    </div>
  )
}

import { motion, useAnimationFrame, useInView, useMotionValue, useScroll, useTransform, useVelocity } from 'motion/react'
import { useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function Estrela() {
  return (
    <svg className="marquee__star" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M12 0c.6 6.6 4.9 11.4 12 12-7.1.6-11.4 5.4-12 12-.6-6.6-4.9-11.4-12-12 7.1-.6 11.4-5.400 12-12Z" fill="currentColor" />
    </svg>
  )
}

/**
 * Faixa de texto que corre e ACELERA com a velocidade da rolagem.
 * Para ao passar o mouse, tem botão de pausa e respeita "menos movimento".
 */
export function Marquee({
  items, className = '', duration = 30, decorative = false, reverse = false,
}: { items: readonly string[]; className?: string; duration?: number; decorative?: boolean; reverse?: boolean }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.05 })
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const progress = useMotionValue(0)
  const x = useTransform(progress, (v) => `${v}%`)
  const speed = useRef(1)

  useAnimationFrame((_t, delta) => {
    if (reduced || paused || hovered || !inView) return
    const target = 1 + Math.min(Math.abs(velocity.get()) / 1200, 4)
    speed.current += (target - speed.current) * Math.min(delta / 180, 1)
    const step = (Math.min(delta, 64) * 50) / (Math.max(1, duration) * 1000) * speed.current
    const next = reverse ? progress.get() + step : progress.get() - step
    progress.set(reverse ? (next > 0 ? next - 50 : next) : (next <= -50 ? next + 50 : next))
  })

  return (
    <div
      ref={ref}
      className={`marquee ${className}`.trim()}
      aria-hidden={decorative || undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!decorative && <p className="sr-only">{items.join('. ')}</p>}
      <motion.div className="marquee__track" aria-hidden="true" style={{ x: reduced ? 0 : x }}>
        {[0, 1].map((copy) => (
          <div className="marquee__copy" key={copy}>
            {items.map((item, i) => (
              <span key={`${i}-${item}`} className={i % 2 === 1 ? 'is-outline' : undefined}>
                <span>{item}</span>
                <Estrela />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
      {!decorative && !reduced && (
        <button type="button" className="marquee__pause" onClick={() => setPaused((v) => !v)} aria-pressed={paused} aria-label={paused ? 'Retomar faixa animada' : 'Pausar faixa animada'}>
          {paused ? '▶' : '❚❚'}
        </button>
      )}
    </div>
  )
}

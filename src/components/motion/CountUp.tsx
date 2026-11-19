import { animate, useInView } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** Número que "sobe" até o valor quando aparece na tela. */
export function CountUp({
  to, decimals = 0, duration = 1.8, prefix = '', suffix = '', agrupar = true,
}: { to: number; decimals?: number; duration?: number; prefix?: string; suffix?: string; agrupar?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()
  const fmt = (v: number) => prefix + v.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: agrupar }) + suffix

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced || !inView) { if (reduced) el.textContent = fmt(to); return }
    const controls = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => { el.textContent = fmt(v) } })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, to, duration, decimals, prefix, suffix, agrupar])

  return <span ref={ref} aria-label={fmt(to)}>{fmt(reduced ? to : 0)}</span>
}

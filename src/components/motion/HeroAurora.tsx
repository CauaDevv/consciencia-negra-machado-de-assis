import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** Decorative React Bits shader. Copy and CTAs never depend on WebGL. */
export function HeroAurora() {
  const container = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [lit, setLit] = useState(false)

  /* A superfície do hero aparece primeiro; a luz é acesa logo em seguida,
     sem recriar o canvas nem tocar nos buffers durante a rolagem. */
  useEffect(() => {
    if (reduced) return
    const timer = window.setTimeout(() => setLit(true), 420)
    return () => window.clearTimeout(timer)
  }, [reduced])

  useEffect(() => {
    const node = container.current
    if (!node || reduced) return

    let cancelled = false
    let dispose: (() => void) | undefined
    // O gradiente CSS já pinta a primeira dobra. O WebGL entra só quando o
    // navegador termina a carga crítica, sem disputar CPU com hidratação.
    const iniciar = () => {
      void import('./aurora-renderer').then(({ mountAurora }) => {
        if (!cancelled) dispose = mountAurora(node)
      }).catch(() => {
        if (!cancelled) node.dataset.renderer = 'fallback'
      })
    }
    const idleWindow = window as unknown as {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
      cancelIdleCallback?: (handle: number) => void
    }
    const usarIdle = typeof idleWindow.requestIdleCallback === 'function'
    const idle = usarIdle
      ? idleWindow.requestIdleCallback!(iniciar, { timeout: 1800 })
      : window.setTimeout(iniciar, 900)

    return () => {
      cancelled = true
      if (usarIdle) idleWindow.cancelIdleCallback?.(idle)
      else window.clearTimeout(idle)
      dispose?.()
    }
  }, [reduced])

  return <div ref={container} className="hero__aurora" data-lit={reduced || lit || undefined} aria-hidden="true" />
}

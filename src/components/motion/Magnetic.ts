import { useRef, type PointerEvent } from 'react'

/** Só com mouse: o botão "puxa" um pouquinho para o cursor. Teclado e toque ficam estáveis. */
export function useMagnetic() {
  const bounds = useRef<DOMRect | null>(null)
  const reset = (el: HTMLElement) => {
    el.style.removeProperty('--magnetic-x')
    el.style.removeProperty('--magnetic-y')
    bounds.current = null
  }
  return {
    onPointerMove(e: PointerEvent<HTMLElement>) {
      const el = e.currentTarget
      if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { reset(el); return }
      const box = bounds.current ?? (bounds.current = el.getBoundingClientRect())
      const x = Math.max(-8, Math.min(8, (e.clientX - box.left - box.width / 2) * 0.14))
      const y = Math.max(-6, Math.min(6, (e.clientY - box.top - box.height / 2) * 0.18))
      el.style.setProperty('--magnetic-x', `${x}px`)
      el.style.setProperty('--magnetic-y', `${y}px`)
    },
    onPointerLeave(e: PointerEvent<HTMLElement>) { reset(e.currentTarget) },
    onPointerCancel(e: PointerEvent<HTMLElement>) { reset(e.currentTarget) },
  }
}

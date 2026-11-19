import { useEffect } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from './useReducedMotion'
import { bindImmediateScroll } from '@/lib/scroll'

/**
 * Rolagem suave (Lenis).
 * - Quem pede menos movimento, ou usa toque, fica com a rolagem nativa.
 * - Âncoras (#secao) passam pelo Lenis, e o foco vai para o destino (teclado e leitor de tela).
 */
export function useSmoothScroll() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 0.85,
      smoothWheel: true,
      syncTouch: false,
    })
    // navegação explícita (ex.: botões do rail) cancela a interpolação em andamento
    const unbind = bindImmediateScroll((top) => lenis.scrollTo(top, { immediate: true }))

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector(href) as HTMLElement | null
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target, {
        offset: 0,
        onComplete: () => {
          if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
          target.focus({ preventScroll: true })
          history.replaceState?.(null, '', href)
        },
      })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(frame)
      unbind()
      lenis.destroy()
    }
  }, [reduced])
}

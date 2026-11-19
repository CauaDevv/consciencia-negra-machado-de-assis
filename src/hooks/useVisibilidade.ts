import { useEffect, useState, type RefObject } from 'react'

/** true enquanto o elemento está (pelo menos em parte) na tela. */
export function useVisibilidade(ref: RefObject<Element | null>, margem = '0px') {
  const [visivel, setVisivel] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { rootMargin: margem })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, margem])
  return visivel
}

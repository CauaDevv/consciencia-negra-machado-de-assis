import { forwardRef } from 'react'
import type { CSSProperties, HTMLAttributes, PointerEvent } from 'react'

export interface BordaLuminosaProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'li'
  /** Cor do brilho que segue o cursor. */
  cor?: string
  /** Raio da borda em px. */
  raio?: number
}

/**
 * Borda dos cards: um brilho radial acompanha o cursor (e o toque).
 * Não cria foco nem clique no contêiner;
 * use links/botões dentro dele.
 */
export const BordaLuminosa = forwardRef<HTMLElement, BordaLuminosaProps>(function BordaLuminosa(
  { as = 'div', cor, raio = 22, className = '', style, children, onPointerMove, onPointerDown, onPointerUp, onPointerCancel, onPointerLeave, ...rest },
  ref,
) {
  const Tag = as as 'div'
  function mover(e: PointerEvent<HTMLElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = e.currentTarget
    const b = el.getBoundingClientRect()
    if (!b.width || !b.height) return
    el.style.setProperty('--luz-x', `${((e.clientX - b.left) * el.offsetWidth) / b.width}px`)
    el.style.setProperty('--luz-y', `${((e.clientY - b.top) * el.offsetHeight) / b.height}px`)
  }
  return (
    <Tag
      {...rest}
      ref={ref as never}
      className={`borda-luminosa ${className}`.trim()}
      style={{ '--luz-cor': cor ?? 'var(--gold)', '--luz-raio': `${raio}px`, ...style } as CSSProperties}
      onPointerMove={(e: PointerEvent<HTMLElement>) => { onPointerMove?.(e as never); mover(e) }}
      onPointerDown={(e: PointerEvent<HTMLElement>) => { onPointerDown?.(e as never); e.currentTarget.setAttribute('data-pressionado', ''); mover(e) }}
      onPointerUp={(e: PointerEvent<HTMLElement>) => { e.currentTarget.removeAttribute('data-pressionado'); onPointerUp?.(e as never) }}
      onPointerCancel={(e: PointerEvent<HTMLElement>) => { e.currentTarget.removeAttribute('data-pressionado'); onPointerCancel?.(e as never) }}
      onPointerLeave={(e: PointerEvent<HTMLElement>) => { e.currentTarget.removeAttribute('data-pressionado'); onPointerLeave?.(e as never) }}
    >
      {children}
    </Tag>
  )
})

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useVisibilidade } from '@/hooks/useVisibilidade'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export type ItemGaleria = { id: string; titulo: string; categoria: string; src: string; alt: string; legenda?: string; posicao?: string }

/**
 * Galeria elástica (21st.dev), adaptada do componente original:
 * o painel ativo ocupa 4 partes do espaço e os outros 1; os inativos mostram o título na vertical.
 * Cada painel é um botão (setas do teclado), o avanço automático para ao interagir e
 * não roda com "menos movimento".
 */
export function ElasticGallery({ itens, autoplayMs = 6500, rotulo = 'Galeria' }: { itens: readonly ItemGaleria[]; autoplayMs?: number; rotulo?: string }) {
  const [ativo, setAtivo] = useState(0)
  const [pausado, setPausado] = useState(false)
  const [tocou, setTocou] = useState(false)
  const raiz = useRef<HTMLDivElement>(null)
  const visivel = useVisibilidade(raiz)
  const reduzido = useReducedMotion()
  const avancar = visivel && !tocou && !pausado && !reduzido && itens.length > 1

  useEffect(() => {
    if (!avancar) return
    const t = window.setTimeout(() => setAtivo((a) => (a + 1) % itens.length), autoplayMs)
    return () => window.clearTimeout(t)
  }, [ativo, avancar, itens.length, autoplayMs])

  const escolher = (i: number) => { setTocou(true); setAtivo(i) }
  const ultimo = useRef({ x: -1, y: -1 })
  const apontar = (i: number, x: number, y: number) => {
    const u = ultimo.current
    const moveu = x !== u.x || y !== u.y
    ultimo.current = { x, y }
    if (!moveu || i === ativo) return
    escolher(i)
  }
  const teclas = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const destino = ({ ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: itens.length - 1 } as Record<string, number>)[e.key]
    if (destino == null) return
    e.preventDefault()
    const n = (destino + itens.length) % itens.length
    escolher(n)
    raiz.current?.querySelectorAll<HTMLButtonElement>('.eg-item')[n]?.focus()
  }

  return (
    <div
      ref={raiz}
      className={`eg${pausado || tocou ? ' is-paused' : ''}`}
      role="group"
      aria-label={rotulo}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      {itens.map((item, i) => {
        const on = i === ativo
        return (
          <button
            key={item.id}
            type="button"
            className={`eg-item${on ? ' is-active' : ''}`}
            aria-pressed={on}
            aria-label={`${item.categoria}: ${item.titulo}. ${item.alt}`}
            onPointerMove={(e) => { if (e.pointerType === 'mouse') apontar(i, e.clientX, e.clientY) }}
            onClick={() => escolher(i)}
            onFocus={() => setAtivo(i)}
            onKeyDown={(e) => teclas(e, i)}
          >
            <span className="eg-media" aria-hidden="true">
              <img src={item.src} alt="" loading="lazy" decoding="async" style={{ objectPosition: item.posicao ?? '50% 30%' }} />
              <span className="eg-shade" />
            </span>
            {on && avancar && <span className="eg-progress" style={{ animationDuration: `${autoplayMs}ms` }} aria-hidden="true" key={`p-${ativo}`} />}
            <span className="eg-content" aria-hidden="true">
              <span className="eg-active">
                <span className="eg-tag">{item.categoria}</span>
                <span className="eg-title">{item.titulo}</span>
                {item.legenda && <span className="eg-caption">{item.legenda}</span>}
              </span>
              <span className="eg-idle">
                <span className="eg-vertical">{item.titulo}</span>
                <span className="eg-short">{item.id}</span>
              </span>
            </span>
            <span className="corner corner--tl" aria-hidden="true" />
            <span className="corner corner--br" aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}

import { useRef, useState, type PointerEvent } from 'react'

/**
 * Comparador "antes / depois" (arraste ou use as setas do teclado).
 * Aqui compara duas reproduções do MESMO retrato de Machado (c. 1896), com tratamentos
 * de imagem diferentes. Nenhuma das duas foi alterada por nós além do recorte e do tamanho.
 */
export function ComparadorImagem({
  esquerda, direita, altEsquerda, altDireita, rotuloEsquerda, rotuloDireita,
}: { esquerda: string; direita: string; altEsquerda: string; altDireita: string; rotuloEsquerda: string; rotuloDireita: string }) {
  const [pos, setPos] = useState(50)
  const [arrastando, setArrastando] = useState(false)
  const caixa = useRef<HTMLDivElement>(null)

  const mover = (clientX: number) => {
    const b = caixa.current?.getBoundingClientRect()
    if (!b) return
    setPos(Math.max(0, Math.min(100, ((clientX - b.left) / b.width) * 100)))
  }
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    setArrastando(true)
    e.currentTarget.setPointerCapture(e.pointerId)
    mover(e.clientX)
  }

  return (
    <div
      ref={caixa}
      className={`comparador${arrastando ? ' is-dragging' : ''}`}
      onPointerDown={onDown}
      onPointerMove={(e) => { if (arrastando) mover(e.clientX) }}
      onPointerUp={() => setArrastando(false)}
      onPointerCancel={() => setArrastando(false)}
      style={{ ['--pos' as string]: `${pos}%` }}
    >
      <img className="comparador__img" src={direita} alt={altDireita} width={1100} height={901} draggable={false} />
      <img className="comparador__img comparador__img--topo" src={esquerda} alt={altEsquerda} width={1100} height={901} draggable={false} />
      <span className="comparador__rotulo comparador__rotulo--e">{rotuloEsquerda}</span>
      <span className="comparador__rotulo comparador__rotulo--d">{rotuloDireita}</span>
      <span className="comparador__linha" aria-hidden="true"><span className="comparador__puxador">‹ ›</span></span>
      <input
        className="comparador__range"
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Arraste para comparar as duas reproduções do mesmo retrato"
      />
    </div>
  )
}

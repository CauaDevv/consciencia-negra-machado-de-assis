/** Números que levam à lista de fontes no rodapé: cada afirmação pode ser conferida. */
export function Refs({ ids }: { ids: readonly number[] }) {
  return (
    <span className="refs">
      {ids.map((n) => (
        <a key={n} href={`#fonte-${n}`} aria-label={`Ver fonte ${n}`}>[{n}]</a>
      ))}
    </span>
  )
}

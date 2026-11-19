import { Marquee } from '@/components/motion/Marquee'
import { faixaItens } from '@/data/content'

/** Duas faixas cruzadas, uma dourada e outra escura, que aceleram quando a página rola. */
export function Faixa() {
  return (
    <div className="faixas" aria-label="Palavras-chave da página">
      <div className="faixas__a"><Marquee items={faixaItens} duration={34} /></div>
      <div className="faixas__b"><Marquee items={[...faixaItens].reverse()} duration={42} reverse decorative /></div>
    </div>
  )
}

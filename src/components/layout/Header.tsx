import { useEffect, useState } from 'react'
import { Icon } from '@/components/ui/Icon'

const LINKS = [
  { id: 'data', rotulo: 'A data' },
  { id: 'machado', rotulo: 'Machado' },
  { id: 'obras', rotulo: 'Obras' },
  { id: 'apagamento', rotulo: 'Apagamento' },
  { id: 'quiz', rotulo: 'Quiz' },
  { id: 'direitos', rotulo: 'Racismo é crime' },
] as const

export function Header() {
  const [rolou, setRolou] = useState(false)
  const [menu, setMenu] = useState(false)
  const [ativo, setAtivo] = useState<string>('')

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // destaca o link da seção que está ocupando o meio da tela (seções divididas usam data-nav)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setAtivo((e.target as HTMLElement).dataset.nav ?? e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('main > section[id]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-aberto', menu)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false) }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.documentElement.classList.remove('menu-aberto') }
  }, [menu])

  return (
    <header className={`header${rolou ? ' is-scrolled' : ''}${menu ? ' is-open' : ''}`}>
      <div className="header__inner">
        <a className="marca" href="#topo" aria-label="Voltar ao início" onClick={() => setMenu(false)}>
          <span className="marca__selo" aria-hidden="true">M</span>
          <span className="marca__texto"><strong>Consciência Negra</strong><small>20 de novembro</small></span>
        </a>

        <nav className="header__nav" aria-label="Seções da página">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={ativo === l.id ? 'is-active' : undefined} aria-current={ativo === l.id ? 'true' : undefined}>{l.rotulo}</a>
          ))}
        </nav>

        <a className="header__cta" href="#compromisso">Assuma o compromisso</a>

        <button type="button" className="header__menu" aria-expanded={menu} aria-controls="menu-mobile" onClick={() => setMenu((v) => !v)}>
          <span className="sr-only">{menu ? 'Fechar menu' : 'Abrir menu'}</span>
          <Icon name={menu ? 'close' : 'menu'} />
        </button>
      </div>

      <nav id="menu-mobile" className="menu-mobile" aria-label="Menu" hidden={!menu}>
        {LINKS.map((l, i) => (
          <a key={l.id} href={`#${l.id}`} onClick={() => setMenu(false)} style={{ ['--i' as string]: i }}>
            <small>{String(i + 1).padStart(2, '0')}</small>{l.rotulo}
          </a>
        ))}
        <a href="#compromisso" onClick={() => setMenu(false)} style={{ ['--i' as string]: LINKS.length }} className="is-cta"><small>→</small>Assuma o compromisso</a>
      </nav>
    </header>
  )
}

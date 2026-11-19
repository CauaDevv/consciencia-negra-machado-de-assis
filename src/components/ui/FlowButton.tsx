import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode, Ref } from 'react'
import { Icon } from './Icon'
import { useMagnetic } from '@/components/motion/Magnetic'

type Comum = { children: ReactNode; variante?: 'ouro' | 'escuro' }

function Miolo({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="flow-button__arrow flow-button__arrow--in" aria-hidden="true"><Icon name="arrow" /></span>
      <span className="flow-button__text">{children}</span>
      <span className="flow-button__circle" aria-hidden="true" />
      <span className="flow-button__arrow flow-button__arrow--out" aria-hidden="true"><Icon name="arrow" /></span>
    </>
  )
}

/** Link com o visual do FlowButton (círculo que preenche + seta que troca de lado). */
export function FlowLink({ children, variante = 'ouro', className = '', ...rest }: Comum & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const magnetic = useMagnetic()
  return (
    <a {...magnetic} {...rest} className={`flow-button flow-button--${variante} ${className}`.trim()}>
      <Miolo>{children}</Miolo>
    </a>
  )
}

export function FlowButton({ children, variante = 'ouro', className = '', type = 'button', ...rest }: Comum & ButtonHTMLAttributes<HTMLButtonElement> & { ref?: Ref<HTMLButtonElement> }) {
  const magnetic = useMagnetic()
  return (
    <button {...magnetic} type={type} {...rest} className={`flow-button flow-button--${variante} ${className}`.trim()}>
      <Miolo>{children}</Miolo>
    </button>
  )
}

import type { SVGProps } from 'react'

type Name = 'arrow' | 'check' | 'close' | 'phone' | 'scale' | 'book' | 'shield' | 'menu' | 'up'

const PATHS: Record<Name, string> = {
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  check: 'm5 12.5 4.500 4.500L19 7.500',
  close: 'M6 6l12 12M18 6 6 18',
  phone: 'M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z',
  scale: 'M12 3v18M7 21h10M5 7l7-3 7 3M5 7l-2.500 7a3.500 3.500 0 0 0 5 0L5 7Zm14 0-2.500 7a3.500 3.500 0 0 0 5 0L19 7Z',
  book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Zm2 14h13v2H6',
  shield: 'M12 3 4 6v6c0 4.500 3.200 8 8 9 4.800-1 8-4.500 8-9V6l-8-3Z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  up: 'M12 19V5m-6 6 6-6 6 6',
}

export function Icon({ name, ...props }: { name: Name } & SVGProps<SVGSVGElement>) {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d={PATHS[name]} />
    </svg>
  )
}

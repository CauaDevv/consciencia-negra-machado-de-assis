import { Children, useEffect, useId, useRef, type FocusEvent, type KeyboardEvent, type ReactNode } from 'react'
import { Icon } from '@/components/ui/Icon'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { onScrollFrame, scrollImmediately } from '@/lib/scroll'
import '@/styles/horizontal-rail.css'

type HorizontalRailProps = {
  children: ReactNode
  label: string
  title?: ReactNode
  className?: string
  id?: string
  /** Total track height in viewport units; defaults to 100vh per card. */
  trackVh?: number
}

// A 1366×640 notebook must receive the same horizontal story as a tall monitor.
// Geometry below, not a large-screen breakpoint, decides whether content fits.
const PIN_QUERY = '(min-width: 768px) and (min-height: 520px)'
const clamp = (value: number, max = 1) => Math.max(0, Math.min(max, value))

/** Vertical scrolling carries the first centered card through to the last.
 * Without enhancement, small screens and reduced motion use a complete list. */
export function HorizontalRail({ children, label, title, className = '', id, trackVh }: HorizontalRailProps) {
  const items = Children.toArray(children)
  const count = items.length
  const generatedId = useId()
  const listId = id ? id + '-items' : 'rail-' + generatedId
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const strip = useRef<HTMLDivElement>(null)
  const progressBar = useRef<HTMLSpanElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const previousButton = useRef<HTMLButtonElement>(null)
  const nextButton = useRef<HTMLButtonElement>(null)
  const current = useRef(0)
  const pinned = useRef(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const rootEl = root.current
    const trackEl = track.current
    const stageEl = stage.current
    const viewportEl = viewport.current
    const stripEl = strip.current
    if (!rootEl || !trackEl || !stageEl || !viewportEl || !stripEl) return
    const cards = Array.from(stripEl.querySelectorAll<HTMLElement>(':scope > .horizontal-rail__item'))
    const media = window.matchMedia(PIN_QUERY)
    let width = 0
    let height = 0
    let travel = 0
    let disposed = false
    const requestedHeight = typeof trackVh === 'number' && Number.isFinite(trackVh)
      ? Math.max(200, trackVh) : Math.max(count, 2) * 100
    rootEl.style.setProperty('--rail-track-height', requestedHeight + 'vh')

    function measure(force = false) {
      if (!force && width === window.innerWidth && height === window.innerHeight) return
      width = window.innerWidth
      height = window.innerHeight
      rootEl!.style.setProperty('--rail-stage-height', height + 'px')
      pinned.current = media.matches && !reducedMotion && count > 1
      rootEl!.dataset.pinned = String(pinned.current)
      stripEl!.style.transform = ''
      // Browser zoom or long captions must not crop content in a fixed stage.
      if (pinned.current && stageEl!.scrollHeight > height + 2) {
        pinned.current = false
        rootEl!.dataset.pinned = 'false'
      }
      if (pinned.current) trackEl!.setAttribute('data-rail', '')
      else trackEl!.removeAttribute('data-rail')
      viewportEl!.tabIndex = pinned.current ? 0 : -1
      travel = pinned.current && cards.length > 1
        ? cards[cards.length - 1].offsetLeft - cards[0].offsetLeft : 0
    }

    function update() {
      measure()
      if (!pinned.current) return
      const rect = trackEl!.getBoundingClientRect()
      const distance = rect.height - height
      const progress = distance > 0 ? clamp(-rect.top / distance) : 0
      stripEl!.style.transform = 'translate3d(' + (-travel * progress).toFixed(2) + 'px, 0, 0)'
      trackEl!.style.setProperty('--rail-progress', progress.toFixed(4))
      if (progressBar.current) progressBar.current.style.transform = 'scaleX(' + progress.toFixed(4) + ')'
      const index = Math.round(progress * (count - 1))
      if (index !== current.current || !rootEl!.hasAttribute('data-active')) {
        current.current = index
        rootEl!.dataset.active = String(index)
        if (counter.current) counter.current.textContent = String(index + 1).padStart(2, '0')
        previousButton.current?.setAttribute('aria-disabled', String(index === 0))
        nextButton.current?.setAttribute('aria-disabled', String(index === count - 1))
      }
    }

    const stop = onScrollFrame(update)
    void document.fonts.ready.then(() => {
      if (disposed) return
      measure(true)
      update()
    })
    const observer = !reducedMotion && typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const element = entry.target as HTMLElement
          element.dataset.entered = 'true'
          observer?.unobserve(entry.target)
        }
      }, { threshold: 0.04 }) : null
    cards.forEach((card) => observer?.observe(card))

    return () => {
      disposed = true
      stop()
      observer?.disconnect()
      pinned.current = false
      rootEl.dataset.pinned = 'false'
      trackEl.removeAttribute('data-rail')
      stripEl.style.transform = ''
      viewportEl.tabIndex = -1
    }
  }, [count, reducedMotion, trackVh])

  function goTo(index: number) {
    const destination = clamp(index, count - 1)
    const trackEl = track.current
    if (!trackEl || !pinned.current) return
    const start = window.scrollY + trackEl.getBoundingClientRect().top
    const distance = trackEl.offsetHeight - window.innerHeight
    // No second interpolation loop competing with Lenis. Wheel scrolling
    // retains the site's motion; explicit card selection is immediate.
    scrollImmediately(start + distance * destination / Math.max(1, count - 1))
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || !pinned.current) return
    const destination = event.key === 'ArrowRight' ? current.current + 1
      : event.key === 'ArrowLeft' ? current.current - 1
        : event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : null
    if (destination === null) return
    event.preventDefault()
    goTo(destination)
  }

  function onFocusCapture(event: FocusEvent<HTMLDivElement>) {
    if (!pinned.current) return
    const card = (event.target as HTMLElement).closest<HTMLElement>('[data-rail-index]')
    if (card) goTo(Number(card.dataset.railIndex))
  }

  return (
    <div className={'horizontal-rail ' + className} id={id} ref={root}>
      {title && <div className="container horizontal-rail__heading">{title}</div>}
      <div className="horizontal-rail__track" ref={track} data-rail-count={count}>
        <div className="horizontal-rail__stage" ref={stage}>
          <div className="horizontal-rail__viewport" ref={viewport} role="region" aria-label={label} tabIndex={-1} onKeyDown={onKeyDown} onFocusCapture={onFocusCapture}>
            <div className="horizontal-rail__strip" id={listId} ref={strip} role="list">
              {items.map((item, index) => (
                <div className="horizontal-rail__item" data-rail-index={index} key={typeof item === 'object' && 'key' in item ? item.key : index} role="listitem">
                  <div className="horizontal-rail__entry">{item}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="horizontal-rail__controls">
            <span className="horizontal-rail__count" aria-hidden="true"><span ref={counter}>01</span><span> / {String(count).padStart(2, '0')}</span></span>
            <div className="horizontal-rail__progress" aria-hidden="true"><span ref={progressBar} /></div>
            <button ref={previousButton} type="button" aria-label="Ver cartão anterior" aria-controls={listId} aria-disabled="true" onClick={() => goTo(current.current - 1)}><Icon name="arrow" /></button>
            <button ref={nextButton} type="button" aria-label="Ver próximo cartão" aria-controls={listId} onClick={() => goTo(current.current + 1)}><Icon name="arrow" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

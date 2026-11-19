import { createElement, useEffect, useId, useState, type CSSProperties, type ElementType } from 'react'
import type React from 'react'

export type TextRevealPreset = 'blur' | 'fade-in-blur' | 'scale' | 'fade' | 'slide'
export type TextRevealPer = 'word' | 'char' | 'line'

export type TextRevealProps = {
  children: string
  per?: TextRevealPer
  as?: keyof React.JSX.IntrinsicElements
  className?: string
  id?: string
  preset?: TextRevealPreset
  delay?: number
  speedReveal?: number
  speedSegment?: number
  trigger?: boolean
  revealOnView?: boolean
  onAnimationComplete?: () => void
  onAnimationStart?: () => void
  segmentWrapperClassName?: string
  style?: CSSProperties
}

const stagger: Record<TextRevealPer, number> = { char: .03, line: .1, word: .05 }

function splitText(text: string, per: TextRevealPer) {
  if (per === 'line') return text.split('\n')
  return text.split(/(\s+)/)
}

/** Reveal por CSS e IntersectionObserver; nenhum runtime de animação no bundle inicial. */
export function TextReveal({
  children,
  per = 'word',
  as = 'p',
  className,
  id,
  preset = 'fade',
  delay = 0,
  speedReveal = 1,
  speedSegment = 1,
  trigger = true,
  revealOnView = false,
  onAnimationComplete,
  onAnimationStart,
  segmentWrapperClassName,
  style,
}: TextRevealProps) {
  const revealKey = useId()
  const [revealed, setRevealed] = useState(false)
  const segments = splitText(children, per)

  useEffect(() => {
    document.documentElement.dataset.textReveal = 'true'
    if (!trigger) return

    let timer = 0
    const show = () => {
      onAnimationStart?.()
      setRevealed(true)
      const duration = Math.ceil((delay + (segments.length * stagger[per]) / speedReveal + .3 / speedSegment) * 1000)
      if (onAnimationComplete) timer = window.setTimeout(onAnimationComplete, duration)
    }

    if (!revealOnView || typeof IntersectionObserver === 'undefined') {
      const frame = window.requestAnimationFrame(show)
      return () => { window.cancelAnimationFrame(frame); window.clearTimeout(timer) }
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      show()
    }, { threshold: .2 })
    const node = document.querySelector<HTMLElement>(`[data-reveal-key="${revealKey}"]`)
    if (node) observer.observe(node)
    return () => { observer.disconnect(); window.clearTimeout(timer) }
  }, [delay, onAnimationComplete, onAnimationStart, per, revealKey, revealOnView, segments.length, speedReveal, speedSegment, trigger])

  const tag = as as ElementType
  const props = {
    id,
    className: `text-reveal ${className ?? ''}`.trim(),
    'data-preset': preset,
    'data-revealed': revealed || !trigger ? 'true' : 'false',
    'data-reveal-key': revealKey,
    style,
  }

  const content = per === 'char'
    ? [<span className="sr-only" key="screen-reader">{children}</span>, ...children.split('').map((character, index) => (
      <span aria-hidden="true" className={`text-reveal__segment ${segmentWrapperClassName ?? ''}`.trim()} style={{ '--text-reveal-delay': `${delay + index * stagger.char / speedReveal}s`, '--text-reveal-duration': `${.3 / speedSegment}s` } as CSSProperties} key={`${character}-${index}`}>{character}</span>
    ))]
    : segments.map((segment, index) => {
      if (!segment.trim()) return segment
      return <span className={`${per === 'line' ? 'text-reveal__line' : 'text-reveal__segment'} ${segmentWrapperClassName ?? ''}`.trim()} style={{ '--text-reveal-delay': `${delay + index * stagger[per] / speedReveal}s`, '--text-reveal-duration': `${.3 / speedSegment}s` } as CSSProperties} key={`${segment}-${index}`}>{segment}</span>
    })

  return createElement(tag, props, content)
}

export default TextReveal

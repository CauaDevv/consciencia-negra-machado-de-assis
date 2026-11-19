import { Color, Mesh, Program, Renderer, Triangle } from 'ogl'
import { auroraFragment, auroraVertex } from './aurora-shader'

const INTRO_MS = 2800
const FRAME_MS = 1000 / 24

/** Imperative GPU island: no React renders on animation/pointer frames. */
export function mountAurora(container: HTMLDivElement): () => void {
  const canvas = document.createElement('canvas')
  const contextOptions = { alpha: true, antialias: false, depth: false, stencil: false, premultipliedAlpha: false, powerPreference: 'low-power' as const }
  const gl = canvas.getContext('webgl', contextOptions) as WebGLRenderingContext | null
  const noop = () => {}
  if (!gl) {
    container.dataset.renderer = 'fallback'
    return noop
  }

  let renderer: Renderer
  let geometry: Triangle | undefined
  let program: Program | undefined
  const release = () => {
    geometry?.remove()
    program?.remove()
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    canvas.remove()
    delete container.dataset.renderer
  }

  try {
    renderer = new Renderer({ canvas, ...contextOptions, webgl: 1, dpr: 1 })
    geometry = new Triangle(renderer.gl)
    const styles = getComputedStyle(container)
    const colors = ['--aurora-1', '--aurora-2', '--aurora-3'].map((token) => new Color(styles.getPropertyValue(token).trim()))
    program = new Program(renderer.gl, {
      vertex: auroraVertex,
      fragment: auroraFragment,
      uniforms: {
        uTime: { value: 0.6 },
        uResolution: { value: [1, 1] },
        uMouse: { value: [0.5, 0.35] },
        uColorStops: { value: colors },
        uAmplitude: { value: 1.2 },
        uBlend: { value: 0.75 },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    })
    if (!gl.getProgramParameter(program.program, gl.LINK_STATUS)) throw new Error('Shader unavailable')
  } catch {
    release()
    container.dataset.renderer = 'fallback'
    return noop
  }

  const mesh = new Mesh(renderer.gl, { geometry, program })
  const uniforms = program.uniforms
  const hero = container.parentElement!
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)')
  let visible = false
  let disposed = false
  let contextLost = false
  let frame = 0
  let elapsed = 0
  let previousFrame = 0
  let lastDraw = 0
  let pointerX = 0.5
  let pointerY = 0.35
  let targetX = pointerX
  let targetY = pointerY

  canvas.setAttribute('aria-hidden', 'true')
  container.appendChild(canvas)

  function stop() {
    cancelAnimationFrame(frame)
    frame = 0
    previousFrame = 0
  }

  function schedule() {
    if (!frame && !disposed && !contextLost && visible && !document.hidden) {
      frame = requestAnimationFrame(draw)
    }
  }

  function draw(now: number) {
    frame = 0
    if (disposed || contextLost || !visible || document.hidden) return
    if (now - lastDraw < FRAME_MS) {
      schedule()
      return
    }
    const delta = previousFrame ? now - previousFrame : 0
    previousFrame = now
    lastDraw = now
    elapsed = Math.min(INTRO_MS, elapsed + delta)
    pointerX += (targetX - pointerX) * 0.15
    pointerY += (targetY - pointerY) * 0.15
    // Ease the automatic introduction to a stop before five seconds.
    // Afterwards only the pointer updates the lighting. Scrolling moves the
    // already-painted surface, never the shader's clock or backing buffer.
    const progress = elapsed / INTRO_MS
    uniforms.uTime.value = 0.6 + (1 - (1 - progress) ** 2) * 2.4
    uniforms.uMouse.value[0] = pointerX
    uniforms.uMouse.value[1] = pointerY
    renderer.render({ scene: mesh })
    const followingPointer = Math.abs(targetX - pointerX) + Math.abs(targetY - pointerY) > 0.0005
    if (elapsed < INTRO_MS || followingPointer) schedule()
    else previousFrame = 0
  }

  function resize() {
    if (disposed || contextLost) return
    const { clientWidth: width, clientHeight: height } = container
    if (!width || !height) return
    // Cap the backing buffer even on high-DPR phones / wide monitors.
    const dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1 : 1.25, 1600 / width, 1400 / height)
    if (renderer.width === width && renderer.height === height && renderer.dpr === dpr) return
    renderer.dpr = dpr
    renderer.setSize(width, height)
    uniforms.uResolution.value = [canvas.width, canvas.height]
    // setSize clears WebGL even when assigning an unchanged canvas dimension.
    // Paint real resizes in the same task, before a blank frame can be shown.
    // The 30fps animation throttle must not defer this replacement.
    renderer.render({ scene: mesh })
    container.dataset.renderer = 'webgl'
    schedule()
  }

  function move(event: PointerEvent) {
    if (!finePointer.matches || event.pointerType === 'touch' || !visible) return
    const rect = container.getBoundingClientRect()
    targetX = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
    targetY = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))
    schedule()
  }

  function leave() {
    targetX = 0.5
    targetY = 0.35
    schedule()
  }

  function visibilityChange() {
    if (document.hidden) stop()
    else schedule()
  }

  function loseContext(event: Event) {
    event.preventDefault()
    contextLost = true
    stop()
    // No retry loop: leave the CSS fallback in place until the next mount.
    container.dataset.renderer = 'fallback'
  }

  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) schedule()
    else stop()
  })
  const observer = new ResizeObserver(resize)
  intersection.observe(container)
  observer.observe(container)
  hero.addEventListener('pointermove', move, { passive: true })
  hero.addEventListener('pointerleave', leave, { passive: true })
  document.addEventListener('visibilitychange', visibilityChange)
  canvas.addEventListener('webglcontextlost', loseContext)
  resize()

  return () => {
    disposed = true
    stop()
    intersection.disconnect()
    observer.disconnect()
    hero.removeEventListener('pointermove', move)
    hero.removeEventListener('pointerleave', leave)
    document.removeEventListener('visibilitychange', visibilityChange)
    canvas.removeEventListener('webglcontextlost', loseContext)
    release()
  }
}

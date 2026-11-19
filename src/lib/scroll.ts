type Subscriber = () => void

let immediateScroller: ((top: number) => void) | null = null

/** Explicit navigation cancels any active smooth-scroll interpolation. */
export function bindImmediateScroll(run: (top: number) => void) {
  immediateScroller = run
  return () => { if (immediateScroller === run) immediateScroller = null }
}

export function scrollImmediately(top: number) {
  if (immediateScroller) immediateScroller(top)
  else window.scrollTo({ top, behavior: 'instant' })
}

const subscribers = new Set<Subscriber>()
let frame: number | null = null
let listening = false

function flush() {
  frame = null
  for (const run of subscribers) run()
}

function schedule() {
  if (frame !== null) return
  frame = requestAnimationFrame(flush)
}

/**
 * Um único ouvinte de rolagem para a página inteira.
 *
 * O plano de batalha pede "um observador compartilhado em vez de múltiplos
 * listeners de scroll", e a razão é medível: cada `addEventListener('scroll')`
 * separado que chama `getBoundingClientRect` força seu próprio recálculo de
 * layout. Com um cabeçalho, um manifesto e uma linha do tempo assinando por
 * conta própria, um quadro de rolagem faria três leituras forçadas em vez de
 * uma rodada agrupada.
 *
 * Aqui todos os assinantes rodam dentro do MESMO requestAnimationFrame, então o
 * navegador resolve o layout uma vez e entrega a todos. O ouvinte de `scroll`
 * só existe enquanto houver alguém inscrito.
 */
export function onScrollFrame(run: Subscriber): () => void {
  subscribers.add(run)

  if (!listening) {
    listening = true
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
  }

  // Os efeitos de montagem escrevem vários atributos antes de medir a página.
  // Agendar todos os assinantes no mesmo quadro evita que cada inscrição force
  // um layout completo entre essas escritas, sem mudar o quadro exibido.
  schedule()

  return () => {
    subscribers.delete(run)
    if (subscribers.size === 0 && listening) {
      listening = false
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame !== null) {
        cancelAnimationFrame(frame)
        frame = null
      }
    }
  }
}

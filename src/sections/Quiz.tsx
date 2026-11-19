import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { StaggerText } from '@/components/motion/StaggerText'
import { FlowButton } from '@/components/ui/FlowButton'
import { Icon } from '@/components/ui/Icon'
import { Refs } from '@/components/ui/Refs'
import { perguntas, resultadosQuiz } from '@/data/content'

function Confete() {
  const pecas = useMemo(
    () => Array.from({ length: 34 }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.9,
      dur: 2.4 + Math.random() * 1.8,
      cor: ['var(--ink)', 'var(--paper)', 'var(--red)', 'var(--gold-300)'][i % 4],
      rot: Math.round(Math.random() * 360),
      w: 6 + Math.round(Math.random() * 8),
    })),
    [],
  )
  return (
    <div className="confete" aria-hidden="true">
      {pecas.map((p, i) => (
        <i key={i} style={{ left: `${p.left}%`, width: p.w, height: p.w * 1.6, background: p.cor, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, rotate: `${p.rot}deg` }} />
      ))}
    </div>
  )
}

/** Mito ou verdade: sete afirmações, cada uma com explicação e fonte. */
export function Quiz() {
  const [idx, setIdx] = useState(0)
  const [resposta, setResposta] = useState<boolean | null>(null)
  const [acertos, setAcertos] = useState(0)
  const [fim, setFim] = useState(false)
  const proximo = useRef<HTMLButtonElement>(null)
  const raiz = useRef<HTMLDivElement>(null)

  const p = perguntas[idx]
  const acertou = resposta !== null && resposta === p.verdade
  const total = perguntas.length

  useEffect(() => { if (resposta !== null) proximo.current?.focus({ preventScroll: true }) }, [resposta])

  const responder = (v: boolean) => {
    if (resposta !== null) return
    setResposta(v)
    if (v === p.verdade) setAcertos((a) => a + 1)
  }
  const avancar = () => {
    if (idx + 1 >= total) setFim(true)
    else { setIdx((i) => i + 1); setResposta(null) }
  }
  const recomecar = () => { setIdx(0); setResposta(null); setAcertos(0); setFim(false); raiz.current?.scrollIntoView({ block: 'center' }) }

  const tier = resultadosQuiz.find((r) => acertos <= r.ate) ?? resultadosQuiz[resultadosQuiz.length - 1]

  return (
    <section id="quiz" className="sec sec--gold quiz" aria-labelledby="quiz-titulo">
      <div className="container quiz__grade">
        <div className="quiz__intro">
          <p className="eyebrow">05 · Hora de testar</p>
          <h2 id="quiz-titulo" className="sec__title">
            <StaggerText text="Mito" /> <StaggerText text="ou" delay={0.08} /> <StaggerText text="verdade?" delay={0.16} />
          </h2>
          <Reveal as="p" className="sec__lead" delay={0.15}>
            Sete afirmações sobre Machado, o 20 de novembro e o racismo. Escolha, descubra a resposta e veja de onde ela vem.
          </Reveal>
        </div>

        <div className="quiz__cartao" ref={raiz}>
          <AnimatePresence mode="wait">
            {!fim ? (
              <motion.div
                key={idx}
                className="quiz__corpo"
                initial={{ opacity: 0, x: 40, rotate: 1.5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: -40, rotate: -1.5 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="quiz__topo">
                  <span className="quiz__contagem">Pergunta {idx + 1} de {total}</span>
                  <span className="quiz__barra" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={idx + (resposta !== null ? 1 : 0)} aria-label="Progresso do quiz">
                    <i style={{ width: `${((idx + (resposta !== null ? 1 : 0)) / total) * 100}%` }} />
                  </span>
                </div>

                <p className="quiz__afirmacao" id="quiz-afirmacao">“{p.afirmacao}”</p>

                <div className="quiz__opcoes" role="group" aria-labelledby="quiz-afirmacao">
                  {[false, true].map((v) => {
                    const escolhida = resposta === v
                    const certa = resposta !== null && v === p.verdade
                    return (
                      <button
                        key={String(v)}
                        type="button"
                        className={`quiz__opcao${escolhida ? ' is-escolhida' : ''}${resposta !== null ? (certa ? ' is-certa' : ' is-errada') : ''}`}
                        disabled={resposta !== null}
                        aria-pressed={escolhida}
                        onClick={() => responder(v)}
                      >
                        <Icon name={v ? 'check' : 'close'} />
                        {v ? 'Verdade' : 'Mito'}
                      </button>
                    )
                  })}
                </div>

                <div className="quiz__retorno" role="status" aria-live="polite">
                  {resposta !== null && (
                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                      <p className={`quiz__veredito ${acertou ? 'is-certo' : 'is-erro'}`}>
                        {acertou ? 'Acertou!' : 'Não foi dessa vez.'} <span>É {p.verdade ? 'verdade' : 'mito'}.</span>
                      </p>
                      <p className="quiz__explicacao">{p.explicacao}<Refs ids={p.ref} /></p>
                      <FlowButton ref={proximo} variante="escuro" className="quiz__proximo" onClick={avancar}>
                        {idx + 1 >= total ? 'Ver meu resultado' : 'Próxima'}
                      </FlowButton>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div key="fim" className="quiz__corpo quiz__fim" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                {acertos >= 5 && <Confete />}
                <p className="quiz__contagem">Seu resultado</p>
                <p className="quiz__placar" aria-label={`${acertos} acertos em ${total}`}><strong>{acertos}</strong><span>/{total}</span></p>
                <h3 className="quiz__fim-titulo">{tier.titulo}</h3>
                <p className="quiz__explicacao">{tier.texto}</p>
                <div className="quiz__fim-acoes">
                  <FlowButton variante="escuro" onClick={recomecar}>Jogar de novo</FlowButton>
                  <a className="quiz__link" href="#direitos">Ver o que fazer contra o racismo →</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

import { useCallback, useState } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { IntroTraco } from '@/components/motion/IntroTraco'
import { ScrollProgress } from '@/components/motion/ScrollProgress'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { IntroContext } from '@/lib/intro'
import { Apagamento } from '@/sections/Apagamento'
import { Compromisso } from '@/sections/Compromisso'
import { Direitos } from '@/sections/Direitos'
import { Faixa } from '@/sections/Faixa'
import { Fecho } from '@/sections/Fecho'
import { Hero } from '@/sections/Hero'
import { Machado } from '@/sections/Machado'
import { Obras } from '@/sections/Obras'
import { PorQue } from '@/sections/PorQue'
import { Quiz } from '@/sections/Quiz'

export default function App() {
  const [pronta, setPronta] = useState(false)
  const aoTerminarIntro = useCallback(() => setPronta(true), [])
  useSmoothScroll()

  return (
    <IntroContext.Provider value={pronta}>
      <IntroTraco onDone={aoTerminarIntro} />
      <ScrollProgress />
      <a className="skip" href="#conteudo">Ir para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Faixa />
        <PorQue />
        <Machado />
        <Obras />
        <Apagamento />
        <Quiz />
        <Direitos />
        <Compromisso />
        <Fecho />
      </main>
      <Footer />
    </IntroContext.Provider>
  )
}

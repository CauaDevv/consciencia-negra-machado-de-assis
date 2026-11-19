import { createContext, useContext } from 'react'

/** false enquanto a abertura (nome sendo riscado) ainda cobre a página. */
export const IntroContext = createContext(true)
export const useIntroPronta = () => useContext(IntroContext)

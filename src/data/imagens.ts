import ferrez from '@/assets/img/ferrez.webp'
import aos57 from '@/assets/img/aos57.webp'
import foto1904 from '@/assets/img/foto1904.webp'
import compararClara from '@/assets/img/comparar-clara.webp'
import compararEscura from '@/assets/img/comparar-escura.webp'
import morro from '@/assets/img/morro.webp'
import imprensa from '@/assets/img/imprensa.webp'
import capaReliquias from '@/assets/img/capa-reliquias.webp'

export const imagens = { ferrez, aos57, foto1904, compararClara, compararEscura, morro, imprensa, capaReliquias } as const
export type ChaveImagem = keyof typeof imagens

/** Tamanho intrínseco de cada arquivo, em px (conferido com os arquivos de src/assets/img). */
export const dimensoes: Record<ChaveImagem, readonly [largura: number, altura: number]> = {
  ferrez: [1000, 1348],
  aos57: [1100, 901],
  foto1904: [1000, 1299],
  compararClara: [1100, 901],
  compararEscura: [1100, 901],
  morro: [397, 299],
  imprensa: [380, 236],
  capaReliquias: [560, 798],
}

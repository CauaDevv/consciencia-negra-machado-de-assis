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

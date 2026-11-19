// Otimiza as fotos de domínio público (Wikimedia Commons) para a web.
// Uso: npm run imagens   (lê _originais/, grava em src/assets/img/)
import sharp from 'sharp'
import { mkdirSync, statSync } from 'node:fs'

mkdirSync('src/assets/img', { recursive: true })
const WEBP = { quality: 80, effort: 5 }
const saida = (nome) => `src/assets/img/${nome}.webp`

const tarefas = [
  // retratos
  ['ferrez', () => sharp('_originais/ferrez1890.jpg').resize({ width: 1000 })],
  ['aos57', () => sharp('_originais/aos57.jpg').resize({ width: 1100 })],
  ['foto1904', () => sharp('_originais/foto1904.jpg').resize({ width: 1000 })],
  // comparador: mesmo retrato (c. 1896), duas reproduções. A clara é recortada para casar com a escura
  // (recorte encontrado por correlação de bordas em scripts/alinhar-busca.mjs).
  ['comparar-clara', () => sharp('_originais/foto1896.jpg').extract({ left: 56, top: 114, width: 1600, height: 1310 }).resize({ width: 1100, height: 901 })],
  ['comparar-escura', () => sharp('_originais/aos57.jpg').resize({ width: 1100, height: 901 })],
  // lugares e livros
  ['morro', () => sharp('_originais/morro.jpg')],
  ['imprensa', () => sharp('_originais/imprensa.jpg')],
  ['capa-reliquias', () => sharp('_originais/capa-reliquias.jpg').resize({ width: 560 })],
]

for (const [nome, fazer] of tarefas) {
  await fazer().webp(WEBP).toFile(saida(nome))
  console.log(nome.padEnd(18), (statSync(saida(nome)).size / 1024).toFixed(0).padStart(5), 'KB')
}

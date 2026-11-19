// Gera os dados da animação "traço animado" (técnica de traço animado):
//  1) o nome "Machado de Assis" convertido de fonte em contornos SVG (fonte não vira traço; vira contorno);
//  2) a assinatura de Machado (domínio público, Wikimedia Commons) vetorizada a partir da imagem.
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import opentype from 'opentype.js'
import sharp from 'sharp'

const require = createRequire(import.meta.url)
const ImageTracer = require('imagetracerjs')

// ---------- 1) nome em contornos ----------
const fonte = opentype.parse(readFileSync('node_modules/@fontsource/fraunces/files/fraunces-latin-800-italic.woff').buffer.slice(0))
// opentype.js lê WOFF direto; se vier ArrayBuffer compartilhado, fatiamos acima.
const texto = 'Machado de Assis'
const tamanho = 220
const x0 = 0, y0 = 0
// Alguns glifos da fonte trazem um ponto NaN; troca pela média dos pontos vizinhos (imperceptível).
function corrigirNaN(d) {
  if (!d.includes('NaN')) return d
  const tokens = d.match(/[MLQCZ]|-?\d*\.?\d+|NaN/g)
  const idxNums = tokens.map((t, i) => (/^[MLQCZ]$/.test(t) ? -1 : i)).filter((i) => i >= 0)
  idxNums.forEach((ti, k) => {
    if (tokens[ti] !== 'NaN') return
    const a = Number(tokens[idxNums[k - 2]]), b = Number(tokens[idxNums[k + 2]])
    tokens[ti] = String(Number.isFinite(a) && Number.isFinite(b) ? ((a + b) / 2).toFixed(1) : Number.isFinite(a) ? a : b)
  })
  return tokens.join(' ')
}
const paths = fonte.getPaths(texto, x0, y0, tamanho, { kerning: true })
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
const letras = []
paths.forEach((p, i) => {
  const d = corrigirNaN(p.toPathData(1))
  if (!d) return
  const b = p.getBoundingBox()
  minX = Math.min(minX, b.x1); minY = Math.min(minY, b.y1); maxX = Math.max(maxX, b.x2); maxY = Math.max(maxY, b.y2)
  letras.push({ d, i })
})
const pad = 14
const nome = { viewBox: `${(minX - pad).toFixed(1)} ${(minY - pad).toFixed(1)} ${(maxX - minX + pad * 2).toFixed(1)} ${(maxY - minY + pad * 2).toFixed(1)}`, letras: letras.map((l) => l.d) }

// ---------- 2) assinatura vetorizada ----------
const cinza = await sharp('_originais/assinatura.png').flatten({ background: '#fff' }).resize({ width: 1100 }).greyscale().threshold(150).raw().toBuffer({ resolveWithObject: true })
// imagetracerjs pede RGBA: expandimos o cinza (1 canal) para 4 canais
const info = cinza.info
const data = Buffer.alloc(info.width * info.height * 4)
for (let i = 0; i < info.width * info.height; i++) { const v = cinza.data[i]; data[i * 4] = v; data[i * 4 + 1] = v; data[i * 4 + 2] = v; data[i * 4 + 3] = 255 }
const svg = ImageTracer.imagedataToSVG(
  { width: info.width, height: info.height, data },
  { numberofcolors: 2, colorsampling: 0, pal: [{ r: 255, g: 255, b: 255, a: 255 }, { r: 0, g: 0, b: 0, a: 255 }], ltres: 1, qtres: 1, pathomit: 14, blurradius: 0, scale: 1, roundcoords: 1 },
)
const caminhos = [...svg.matchAll(/<path[^>]*fill="rgb\((\d+),(\d+),(\d+)\)"[^>]*d="([^"]+)"/g)]
  .filter((m) => +m[1] < 100) // só o traço escuro; descarta o fundo branco
  .map((m) => m[4])
const assinatura = { viewBox: `0 0 ${info.width} ${info.height}`, caminhos }

writeFileSync(
  'src/data/traco.ts',
  `// ARQUIVO GERADO por scripts/gerar-traco.mjs — não editar à mão.\n` +
  `export const nomeTraco = ${JSON.stringify(nome)} as const\n` +
  `export const assinaturaTraco = ${JSON.stringify(assinatura)} as const\n`,
)
console.log('nome:', letras.length, 'letras · viewBox', nome.viewBox)
console.log('assinatura:', caminhos.length, 'caminho(s) ·', caminhos.reduce((n, c) => n + c.length, 0), 'bytes')

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { fileURLToPath, URL } from 'node:url'
import type { Plugin } from 'vite'

/** No arquivo único as fontes já estão embutidas: o pré-carregamento (útil só na versão web) apontaria para arquivos inexistentes. */
const semPreloadDeFonte: Plugin = {
  name: 'sem-preload-de-fonte',
  transformIndexHtml: { order: 'pre', handler: (html) => html.replace(/\s*<link rel="preload" as="font"[^>]*>/g, '') },
}

/**
 * Dois jeitos de gerar a página:
 *  - `npm run build`        → dist/ com arquivos separados (para a web: cache, carga em paralelo,
 *                             imagens preguiçosas e a aurora WebGL carregada só depois do primeiro desenho).
 *  - `npm run build:unico`  → dist-unico/index.html, tudo embutido em um único arquivo que abre com dois cliques.
 * `base: './'` deixa os caminhos relativos: funciona na raiz, em subpasta (GitHub Pages) e no file://.
 */
export default defineConfig(({ mode }) => {
  const unico = mode === 'unico'
  return {
    base: './',
    plugins: [react(), ...(unico ? [viteSingleFile(), semPreloadDeFonte] : [])],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    build: unico
      ? { target: 'es2020', outDir: 'dist-unico', chunkSizeWarningLimit: 6000, assetsInlineLimit: 100_000_000 }
      : { target: 'es2020', chunkSizeWarningLimit: 800 },
  }
})

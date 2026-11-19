import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { fileURLToPath, URL } from 'node:url'

// Tudo (JS, CSS, fontes e imagens) é embutido em um único index.html:
// dá para abrir o arquivo com dois cliques, mandar por e-mail ou entregar no pen drive.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: { target: 'es2020', chunkSizeWarningLimit: 6000, assetsInlineLimit: 100_000_000 },
})

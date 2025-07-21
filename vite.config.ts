import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ command }) => {
  const base = command === 'build' ? '/repos-explorer/' : '/'

  return {
    plugins: [
      react(),
      svgr()
    ],
    base: base,
    build: {
      outDir: 'dist',
      sourcemap: true,
    }
  }
})

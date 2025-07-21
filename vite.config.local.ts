import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

/**
 * Vite config for LOCAL TESTING ONLY
 *
 * This config is used for testing production builds locally without the GitHub Pages base path.
 * GitHub Actions will still use the default vite.config.ts for deployment.
 *
 * Usage:
 * - yarn build:local
 * - yarn preview:local
 */
export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
})

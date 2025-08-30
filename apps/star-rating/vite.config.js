import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/react-components/star-rating/',
  build: {
    outDir: '../../.dist/star-rating',
    emptyOutDir: false
  }
})
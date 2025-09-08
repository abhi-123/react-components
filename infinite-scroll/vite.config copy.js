import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/react-components/infinite-scroll/',
  build: {
    outDir: '../../.dist/infinite-scroll',
    emptyOutDir: false
  }
})
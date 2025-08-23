import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/react-components/search-filter/',
  build: {
    outDir: '../../.dist/search-filter',
    emptyOutDir: false
  }
})
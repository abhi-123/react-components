import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/react-components/file-explorer/',
  build: {
    outDir: '../../.dist/file-explorer',
    emptyOutDir: false
  }
})
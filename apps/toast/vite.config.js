import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/react-components/toast/',
  build: {
    outDir: '../../.dist/toast',
    emptyOutDir: false
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/react-components/stepper-component/',
  build: {
    outDir: '../../.dist/stepper-component',
    emptyOutDir: false
  }
})
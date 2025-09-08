import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/react-components/react-form-demo/',
  build: {
    outDir: '../../.dist/react-form-demo',
    emptyOutDir: false
  }
})
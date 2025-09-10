import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/react-components/auth-otp/',
  build: {
    outDir: '../../.dist/auth-otp',
    emptyOutDir: false
  }
})
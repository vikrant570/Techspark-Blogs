import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    proxy: {
      '/blogspot': {
        target: 'http://localhost:7000',
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
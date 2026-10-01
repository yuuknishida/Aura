import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '^/(processes|chat|metrics)': {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false
      }
    }
  }
})

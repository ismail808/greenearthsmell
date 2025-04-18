import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
      'firebase/storage': '@firebase/storage'
    }
  },
  optimizeDeps: {
    include: [
      'firebase/app',
      'firebase/firestore',
      '@firebase/storage'
    ]
  }
})
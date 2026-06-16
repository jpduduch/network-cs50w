import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../network/static/network/react',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/main.jsx'),
      output: {
        entryFileNames: 'main.js',
        chunkFileNames: 'chunk.js',
        assetFileNames: 'main.[ext]',
      }
    }
  },
  base: '/static/network/react/',
})
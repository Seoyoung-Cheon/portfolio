import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // 빌드 최적화 설정
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Public 폴더 파일들이 제대로 복사되도록 보장
  publicDir: 'public',
})

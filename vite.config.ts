import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  base: '/agenda-contatos/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://glaubermag.dev.br/test/agenda/api.php')
  }
})
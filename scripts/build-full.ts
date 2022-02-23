import { defineConfig } from 'vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'salmon-ui': path.resolve(__dirname, '../src/packages')
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, '..', 'src/index.ts'),
      name: 'SalmonUI',
      fileName: (format) => `salmon-ui.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'vue'
        }
      }
    }
  }
})
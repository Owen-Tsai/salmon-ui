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
      entry: path.resolve(__dirname, '../src/index.ts'),
      formats: ['umd', 'es'],
      fileName: (f) => `salmon-ui.${f}.js`,
      name: 'SalmonUI'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named'
      }
    }
  }
})
import { defineConfig } from 'vite'
import { getBuildEntryPoints } from './utils'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'salmon-ui': path.resolve(__dirname, './src/packages')
    }
  },
  build: {
    rollupOptions: {
      input: getBuildEntryPoints(),
      external: ['vue'],
      output: {
        globals: {
          vue: 'vue'
        },
        dir: 'dist',
        entryFileNames: '[name].js'
      }
    }
  }
})

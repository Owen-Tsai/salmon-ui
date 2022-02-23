import { defineConfig } from 'vite'
import { getBuildEntryPoints } from './utils'

export default defineConfig({
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

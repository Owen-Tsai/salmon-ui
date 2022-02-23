import { defineConfig } from 'vite'
import * as path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/packages/index.ts'),
      name: '@salmon-ui/core',
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
import type { Config } from '@jest/types'

export default {
  moduleFileExtensions: [
    'js', 'ts', 'json', 'vue'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest'
  }
} as Config.InitialOptions

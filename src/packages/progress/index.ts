import { App } from 'vue'
import Progress from './Progress.vue'

Progress.install = (app: App) => {
  app.component(Progress.name, Progress)
}

export default Progress

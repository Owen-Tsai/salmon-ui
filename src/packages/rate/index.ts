import { App } from 'vue'
import Rate from './Rate.vue'

Rate.install = (app: App) => {
  app.component(Rate.name, Rate)
}

export default Rate

import { App } from 'vue'
import Accordion from './Accordion.vue'

Accordion.install = (app: App) => {
  app.component(Accordion.name, Accordion)
}

export default Accordion

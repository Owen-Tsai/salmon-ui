import { App } from 'vue'
import Checkbox from './Checkbox.vue'

Checkbox.install = (app: App) => {
  app.component(Checkbox.name, Checkbox)
}

export default Checkbox

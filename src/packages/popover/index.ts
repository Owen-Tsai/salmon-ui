import { App } from 'vue'
import Popover from './Popover.vue'

Popover.install = (app: App) => {
  app.component(Popover.name, Popover)
}

export default Popover

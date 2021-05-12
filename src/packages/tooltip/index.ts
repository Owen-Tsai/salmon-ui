import { App } from 'vue'
import Tooltip from './Tooltip.vue'

Tooltip.install = (app: App) => {
  app.component(Tooltip.name, Tooltip)
}

export default Tooltip

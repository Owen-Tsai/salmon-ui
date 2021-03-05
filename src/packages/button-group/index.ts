import { App } from 'vue'
import SButtonGroup from './ButtonGroup.vue'

SButtonGroup.install = (app: App) => {
  app.component(SButtonGroup.name, SButtonGroup)
}

export default SButtonGroup

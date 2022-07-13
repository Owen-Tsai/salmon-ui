import { App, Plugin } from 'vue'
import ButtonGroup from './ButtonGroup.vue'

ButtonGroup.install = (app: App) => {
  app.component('SButtonGroup', ButtonGroup)
}

export default ButtonGroup as typeof ButtonGroup & Plugin

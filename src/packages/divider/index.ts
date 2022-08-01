import { App, Plugin } from 'vue'
import Divider from './Divider.vue'

Divider.install = (app: App) => {
  app.component('SDivider', Divider)
}

export default Divider as typeof Divider & Plugin

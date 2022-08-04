import { App, Plugin } from 'vue'
import Link from './Link.vue'

Link.install = (app: App) => {
  app.component('SLink', Link)
}

export default Link as typeof Link & Plugin

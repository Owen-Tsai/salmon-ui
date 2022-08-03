import { App, Plugin } from 'vue'
import Badge from './Badge.vue'

Badge.install = (app: App) => {
  app.component('SBadge', Badge)
}

export default Badge as typeof Badge & Plugin

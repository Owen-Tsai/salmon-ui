import { App } from 'vue'
import SBadge from './Badge.vue'

SBadge.install = (app: App) => {
  app.component(SBadge.name, SBadge)
}

export default SBadge

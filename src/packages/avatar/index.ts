import { App } from 'vue'
import SAvatar from './Avatar.vue'

SAvatar.install = (app: App) => {
  app.component(SAvatar.name, SAvatar)
}

export default SAvatar

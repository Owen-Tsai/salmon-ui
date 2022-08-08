import { App, Plugin } from 'vue'
import AvatarGroup from './AvatarGroup.vue'

AvatarGroup.install = (app: App) => {
  app.component('SAvatarGroup', AvatarGroup)
}

export default AvatarGroup as typeof AvatarGroup & Plugin

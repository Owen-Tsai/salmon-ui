import { App, Plugin } from 'vue'
import Avatar from './Avatar.vue'

Avatar.install = (app: App) => {
  app.component('SAvatar', Avatar)
}

export default Avatar as typeof Avatar & Plugin

import { App, Plugin } from 'vue'
import Alert from './Alert.vue'

Alert.install = (app: App) => {
  app.component('SAlert', Alert)
}

export default Alert as typeof Alert & Plugin

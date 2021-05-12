import { App } from 'vue'
import Alert from './Alert.vue'

Alert.install = (app: App) => {
  app.component(Alert.name, Alert)
}

export default Alert

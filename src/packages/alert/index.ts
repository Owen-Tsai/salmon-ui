import { App } from 'vue'
import Alert from './Alert.vue'

Alert.install = (app: App): void => {
  app.component(Alert.name, Alert)
}

export default Alert

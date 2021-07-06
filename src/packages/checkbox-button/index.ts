import CheckboxButton from './CheckboxButton.vue'
import { App } from 'vue'

CheckboxButton.install = (app: App) => {
  app.component(CheckboxButton.name, CheckboxButton)
}

export default CheckboxButton

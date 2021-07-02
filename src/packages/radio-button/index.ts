import RadioButton from './RadioButton.vue'
import { App } from 'vue'

RadioButton.install = (app: App) => {
  app.component(RadioButton.name, RadioButton)
}

export default RadioButton

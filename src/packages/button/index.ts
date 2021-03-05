import { App } from 'vue'
import SButton from './Button.vue'

SButton.install = (app: App) => {
  app.component(SButton.name, SButton)
}

export default SButton

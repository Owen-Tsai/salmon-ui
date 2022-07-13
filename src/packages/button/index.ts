import { App, Plugin } from 'vue'
import Button from './Button.vue'

Button.install = (app: App) => {
  app.component('SButton', Button)
}

export default Button as typeof Button & Plugin
